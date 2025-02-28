/*
  # Add scan reports table

  1. New Tables
    - `scan_reports`
      - `id` (uuid, primary key)
      - `url` (text)
      - `scan_type` (text)
      - `start_time` (timestamptz)
      - `end_time` (timestamptz)
      - `status` (text)
      - `results` (jsonb)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `scan_reports` table
    - Add policies for authenticated users to:
      - Read their own scan reports
      - Insert new scan reports
    - Add policy for admins to read all scan reports
*/

-- Create scan_reports table
CREATE TABLE scan_reports (
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

-- Create index for faster queries
CREATE INDEX scan_reports_user_id_idx ON scan_reports(user_id);
CREATE INDEX scan_reports_created_at_idx ON scan_reports(created_at DESC);