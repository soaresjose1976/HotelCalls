/*
  # Add Luxembourgish language support

  1. Changes
    - Add language validation for Luxembourgish
    - Create default templates for Luxembourgish conversations
*/

-- Add check constraint to ensure 'lb' is a valid language code
ALTER TABLE voice_agents 
DROP CONSTRAINT IF EXISTS valid_languages;

ALTER TABLE voice_agents
ADD CONSTRAINT valid_languages 
CHECK (lang_code IN ('ar', 'bn', 'cs', 'da', 'de', 'el', 'en', 'es', 'fi', 'fr', 'hi', 'hu', 'id', 'it', 'ja', 'ko', 'lb', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sk', 'sv', 'th', 'tr', 'uk', 'ur', 'vi', 'zh'));
