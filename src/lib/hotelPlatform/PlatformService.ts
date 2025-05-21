import { supabase } from '../supabase';
import { BookingAdapter } from './adapters/BookingAdapter';
import { ExpediaAdapter } from './adapters/ExpediaAdapter';
import { AirbnbAdapter } from './adapters/AirbnbAdapter';
import { HotelsAdapter } from './adapters/HotelsAdapter';
import type {
  HotelPlatform,
  PlatformAccount,
  PlatformListing,
  PlatformBooking
} from './types';

export interface PlatformAdapter {
  authenticate(): Promise<void>;
  syncListings(): Promise<void>;
  syncBookings(): Promise<void>;
  updateAvailability(listingId: string, dates: { start: Date; end: Date }[]): Promise<void>;
  updatePricing(listingId: string, prices: { date: Date; price: number }[]): Promise<void>;
  createListing(listing: Partial<PlatformListing>): Promise<PlatformListing>;
  updateListing(listing: PlatformListing): Promise<PlatformListing>;
  getBooking(bookingId: string): Promise<PlatformBooking>;
  confirmBooking(bookingId: string): Promise<void>;
  cancelBooking(bookingId: string, reason: string): Promise<void>;
}

export class PlatformService {
  private static instance: PlatformService;
  private adapters: Map<string, PlatformAdapter> = new Map();

  private constructor() {}

  static getInstance(): PlatformService {
    if (!PlatformService.instance) {
      PlatformService.instance = new PlatformService();
    }
    return PlatformService.instance;
  }

  private getAdapter(account: PlatformAccount): PlatformAdapter {
    if (this.adapters.has(account.id)) {
      return this.adapters.get(account.id)!;
    }

    let adapter: PlatformAdapter;
    
    switch (account.platform_id) {
      case 'booking':
        adapter = new BookingAdapter(account);
        break;
      case 'expedia':
        adapter = new ExpediaAdapter(account);
        break;
      case 'airbnb':
        adapter = new AirbnbAdapter(account);
        break;
      case 'hotels':
        adapter = new HotelsAdapter(account);
        break;
      default:
        throw new Error(`Plateforme non supportée: ${account.platform_id}`);
    }

    this.adapters.set(account.id, adapter);
    return adapter;
  }

  async syncAccount(accountId: string): Promise<void> {
    const { data: account } = await supabase
      .from('platform_accounts')
      .select('*')
      .eq('id', accountId)
      .single();

    if (!account) {
      throw new Error('Compte plateforme non trouvé');
    }

    const adapter = this.getAdapter(account);
    
    try {
      await this.startSyncLog(accountId);
      await adapter.syncListings();
      await adapter.syncBookings();
      await this.completeSyncLog(accountId, true);
    } catch (error) {
      await this.completeSyncLog(accountId, false, error);
      throw error;
    }
  }

  async updateAvailability(
    listingId: string,
    dates: { start: Date; end: Date }[]
  ): Promise<void> {
    const { data: listing } = await supabase
      .from('platform_listings')
      .select('*, platform_accounts(*)')
      .eq('id', listingId)
      .single();

    if (!listing) {
      throw new Error('Annonce non trouvée');
    }

    const adapter = this.getAdapter(listing.platform_accounts);
    await adapter.updateAvailability(listing.external_listing_id, dates);
  }

  async updatePricing(
    listingId: string,
    prices: { date: Date; price: number }[]
  ): Promise<void> {
    const { data: listing } = await supabase
      .from('platform_listings')
      .select('*, platform_accounts(*)')
      .eq('id', listingId)
      .single();

    if (!listing) {
      throw new Error('Annonce non trouvée');
    }

    const adapter = this.getAdapter(listing.platform_accounts);
    await adapter.updatePricing(listing.external_listing_id, prices);
  }

  private async startSyncLog(accountId: string): Promise<void> {
    await supabase.from('platform_sync_logs').insert({
      account_id: accountId,
      sync_type: 'full',
      started_at: new Date().toISOString()
    });
  }

  private async completeSyncLog(
    accountId: string,
    success: boolean,
    error?: any
  ): Promise<void> {
    const updates: any = {
      completed_at: new Date().toISOString(),
      success
    };

    if (error) {
      updates.error_details = [{
        type: error.name || 'Error',
        message: error.message,
        data: error.data
      }];
      updates.errors_count = 1;
    }

    await supabase
      .from('platform_sync_logs')
      .update(updates)
      .eq('account_id', accountId)
      .is('completed_at', null);
  }
}

export const platformService = PlatformService.getInstance();
