import { supabase } from './supabase';
import { HotelRoom, HotelBooking, ServiceRequest } from '../types';

export const hotelService = {
  async checkRoomAvailability(
    checkIn: string,
    checkOut: string,
    roomType?: string
  ): Promise<HotelRoom[]> {
    const { data, error } = await supabase
      .from('hotel_rooms')
      .select(`
        *,
        hotel_bookings!inner(*)
      `)
      .eq('status', 'available')
      .eq(roomType ? 'type' : true, roomType || true)
      .not('hotel_bookings.status', 'in', ['cancelled', 'checked_out'])
      .or(`check_in.not.overlaps.[${checkIn},${checkOut}]`);

    if (error) throw error;
    return data;
  },

  async createBooking(booking: Partial<HotelBooking>): Promise<HotelBooking> {
    const { data, error } = await supabase
      .from('hotel_bookings')
      .insert([booking])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async requestService(request: Partial<ServiceRequest>): Promise<ServiceRequest> {
    const { data, error } = await supabase
      .from('service_requests')
      .insert([request])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateRoomStatus(roomId: string, status: HotelRoom['status']) {
    const { error } = await supabase
      .from('hotel_rooms')
      .update({ status })
      .eq('id', roomId);

    if (error) throw error;
  },

  async getGuestBooking(phoneNumber: string): Promise<HotelBooking | null> {
    const { data, error } = await supabase
      .from('hotel_bookings')
      .select('*, hotel_rooms(*)')
      .eq('guest_phone', phoneNumber)
      .eq('status', 'confirmed')
      .order('check_in', { ascending: true })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }
};
