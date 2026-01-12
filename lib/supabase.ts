
/**
 * SUPABASE SETUP GUIDE (FIXED):
 * 1. Go to SQL Editor in your Supabase Dashboard.
 * 2. Run the following code to create the table and policies without errors:
 * 
 * CREATE TABLE IF NOT EXISTS site_configs (
 *   id TEXT PRIMARY KEY,
 *   data JSONB NOT NULL
 * );
 * 
 * ALTER TABLE site_configs ENABLE ROW LEVEL SECURITY;
 * 
 * DROP POLICY IF EXISTS "Allow public read" ON site_configs;
 * DROP POLICY IF EXISTS "Allow public insert" ON site_configs;
 * DROP POLICY IF EXISTS "Allow public update" ON site_configs;
 * 
 * CREATE POLICY "Allow public read" ON site_configs FOR SELECT USING (true);
 * CREATE POLICY "Allow public insert" ON site_configs FOR INSERT WITH CHECK (true);
 * CREATE POLICY "Allow public update" ON site_configs FOR UPDATE USING (true);
 * 
 * Note: This allows your Admin Panel to directly sync images and redirect URLs 
 * into a single row named 'main'.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sybezgliqtwkcsmsfhlg.supabase.co';
const supabaseKey = 'sb_publishable_D5wDGZ6CevFPrCmskT2twg_99F2Vrey';

export const supabase = createClient(supabaseUrl, supabaseKey);
