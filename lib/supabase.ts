
/**
 * FIXED SUPABASE SETUP INSTRUCTIONS:
 * 1. Go to your Supabase Project Dashboard -> SQL Editor.
 * 2. Run the following command (this fixes the "policy already exists" error):
 * 
 * CREATE TABLE IF NOT EXISTS site_configs (
 *   id TEXT PRIMARY KEY,
 *   data JSONB NOT NULL
 * );
 * ALTER TABLE site_configs ENABLE ROW LEVEL SECURITY;
 * 
 * DROP POLICY IF EXISTS "Allow public read" ON site_configs;
 * DROP POLICY IF EXISTS "Allow public insert" ON site_configs;
 * DROP POLICY IF EXISTS "Allow public update" ON site_configs;
 * 
 * CREATE POLICY "Allow public read" ON site_configs FOR SELECT USING (true);
 * CREATE POLICY "Allow public insert" ON site_configs FOR INSERT WITH CHECK (true);
 * CREATE POLICY "Allow public update" ON site_configs FOR UPDATE USING (true);
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sybezgliqtwkcsmsfhlg.supabase.co';
const supabaseKey = 'sb_publishable_D5wDGZ6CevFPrCmskT2twg_99F2Vrey';

export const supabase = createClient(supabaseUrl, supabaseKey);
