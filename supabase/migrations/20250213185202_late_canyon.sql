/*
  # Add scan reports functionality

  1. Changes
    - Creates scan_reports table if it doesn't exist
    - Adds RLS policies for secure access
    - Creates indexes for performance optimization
    
  2. Security
    - Enables RLS on scan_reports table
    - Adds policies for user access control
    - Grants appropriate permissions to roles
*/

DO $$ 
BEGIN
  -- Create scan_reports table if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'scan_reports') THEN
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

    -- Create indexes for faster queries
    CREATE INDEX IF NOT EXISTS scan_reports_user_id_idx ON scan_reports(user_id);
    CREATE INDEX IF NOT EXISTS scan_reports_created_at_idx ON scan_reports(created_at DESC);
  END IF;
END $$;