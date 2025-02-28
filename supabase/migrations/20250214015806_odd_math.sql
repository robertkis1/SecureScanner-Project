-- Create password_test_reports table
CREATE TABLE password_test_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  total_passwords integer NOT NULL,
  weak_count integer NOT NULL,
  medium_count integer NOT NULL,
  strong_count integer NOT NULL,
  very_strong_count integer NOT NULL,
  results jsonb NOT NULL DEFAULT '[]'::jsonb
);

-- Enable RLS
ALTER TABLE password_test_reports ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON password_test_reports TO service_role;
GRANT SELECT, INSERT, DELETE ON password_test_reports TO authenticated;

-- Create policies
CREATE POLICY "Users can read own password reports"
  ON password_test_reports
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

CREATE POLICY "Users can create password reports"
  ON password_test_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own password reports"
  ON password_test_reports
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_password_reports_user_id ON password_test_reports(user_id);
CREATE INDEX idx_password_reports_created_at ON password_test_reports(created_at DESC);