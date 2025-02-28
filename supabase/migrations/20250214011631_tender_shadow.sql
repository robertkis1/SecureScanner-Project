/*
  # Add scan reports table and relationships

  1. New Tables
    - `scan_reports`
      - `id` (uuid, primary key)
      - `url` (text)
      - `scan_type` (text)
      - `start_time` (timestamptz)
      - `end_time` (timestamptz)
      - `status` (text)
      - `results` (jsonb)
      - `user_id` (uuid, foreign key)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for users to read their own reports
    - Add policies for admins to read all reports
*/

-- Create scan_reports table
CREATE TABLE IF NOT EXISTS scan_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  scan_type text NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('completed', 'failed', 'in-progress')),
  results jsonb NOT NULL DEFAULT '[]'::jsonb,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE scan_reports ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON scan_reports TO service_role;
GRANT SELECT, INSERT ON scan_reports TO authenticated;

-- Create policies
CREATE POLICY "Users can read own scan reports"
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

CREATE POLICY "Users can create scan reports"
  ON scan_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_scan_reports_user_id ON scan_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_scan_reports_created_at ON scan_reports(created_at DESC);