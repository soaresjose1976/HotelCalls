/*
  # Add language support to voice agents

  1. Changes
    - Add language column to voice_agents table
    - Set default language to 'fr'
    - Make language column required
*/

ALTER TABLE voice_agents
ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'fr';

-- Add index for faster language filtering
CREATE INDEX IF NOT EXISTS idx_voice_agents_language ON voice_agents(language);
