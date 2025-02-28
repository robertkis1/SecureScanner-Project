/*
  # Fix scan_reports RLS policies

  1. Changes
    - Drop existing policies
    - Create new simplified policies with proper access controls
    - Add service role policy
    - Enable RLS
  
  2. Security
    - Users can read their own scan reports
    - Users can create scan reports for themselves
    - Admins can read all scan reports
    - Service role has full access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own scan reports" ON scan_reports;
DROP POLICY IF EXISTS "Users can create scan reports" ON scan_reports;

-- Reset RLS
ALTER TABLE scan_reports DISABLE ROW LEVEL SECURITY;
ALTER TABLE scan_reports ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON scan_reports TO service_role;
GRANT SELECT, INSERT ON scan_reports TO authenticated;

-- Create policy for service role with full access
CREATE POLICY "service_role_access"
  ON scan_reports
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policy for reading scan reports
CREATE POLICY "read_scan_reports"
  ON scan_reports
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  );

-- Create policy for inserting scan reports
CREATE POLICY "insert_scan_reports"
  ON scan_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_scan_reports_user_id ON scan_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_scan_reports_created_at ON scan_reports(created_at DESC);