import axios from 'axios';

const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const API_URL = 'https://api.elevenlabs.io/v1';

export const elevenlabs = {
  async synthesizeSpeech(text: string, voiceId: string): Promise<ArrayBuffer> {
    const response = await axios.post(
      `${API_URL}/text-to-speech/${voiceId}`,
      { text },
      {
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );
    return response.data;
  },

  async getVoices() {
    const response = await axios.get(`${API_URL}/voices`, {
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
      },
    });
    return response.data.voices;
  }
};
