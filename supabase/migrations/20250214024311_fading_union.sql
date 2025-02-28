-- Create scan_schedules table
CREATE TABLE scan_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  target_url text NOT NULL,
  scan_type text NOT NULL CHECK (scan_type IN ('web', 'password')),
  frequency text NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  next_run timestamptz NOT NULL,
  notifications boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE scan_schedules ENABLE ROW LEVEL SECURITY;

-- Grant permissions
GRANT ALL ON scan_schedules TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON scan_schedules TO authenticated;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_scan_schedules_updated_at
  BEFORE UPDATE ON scan_schedules
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create policies
CREATE POLICY "Users can read own scan schedules"
  ON scan_schedules
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

CREATE POLICY "Users can create scan schedules"
  ON scan_schedules
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scan schedules"
  ON scan_schedules
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own scan schedules"
  ON scan_schedules
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_scan_schedules_user_id ON scan_schedules(user_id);
CREATE INDEX idx_scan_schedules_next_run ON scan_schedules(next_run);
CREATE INDEX idx_scan_schedules_created_at ON scan_schedules(created_at DESC);