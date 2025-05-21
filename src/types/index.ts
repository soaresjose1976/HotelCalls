// ... existing types ...

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  voiceId?: string;
}

export interface VoiceAgent {
  id: string;
  name: string;
  description: string;
  voice_id: string;
  personality: string;
  language: string;
  created_at?: string;
  user_id?: string;
}

export interface MultilingualMessage {
  key: string;
  translations: Record<string, string>;
}
