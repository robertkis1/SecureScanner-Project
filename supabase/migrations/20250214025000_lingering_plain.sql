/*
  # Fix Schedule Details Migration

  1. Changes
    - Drop existing columns and constraints that might conflict
    - Re-add schedule details columns with proper validation
    - Update trigger function for schedule validation
    - Add proper indexes and constraints

  2. Security
    - Maintains existing RLS policies
    - No changes to permissions required
*/

-- Drop existing columns and constraints if they exist
DO $$ 
BEGIN
  -- Drop columns if they exist
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'scan_schedules' AND column_name = 'schedule_time') THEN
    ALTER TABLE scan_schedules DROP COLUMN schedule_time;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'scan_schedules' AND column_name = 'schedule_day') THEN
    ALTER TABLE scan_schedules DROP COLUMN schedule_day;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'scan_schedules' AND column_name = 'schedule_date') THEN
    ALTER TABLE scan_schedules DROP COLUMN schedule_date;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'scan_schedules' AND column_name = 'last_run') THEN
    ALTER TABLE scan_schedules DROP COLUMN last_run;
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'scan_schedules' AND column_name = 'status') THEN
    ALTER TABLE scan_schedules DROP COLUMN status;
  END IF;

  -- Drop existing trigger if it exists
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'validate_schedule_details_trigger') THEN
    DROP TRIGGER validate_schedule_details_trigger ON scan_schedules;
  END IF;

  -- Drop existing function if it exists
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'validate_schedule_details') THEN
    DROP FUNCTION validate_schedule_details;
  END IF;
END $$;

-- Add new columns with proper validation
ALTER TABLE scan_schedules
  ADD COLUMN execution_time time NOT NULL DEFAULT '00:00:00',
  ADD COLUMN execution_day text CHECK (
    frequency != 'weekly' OR 
    execution_day IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')
  ),
  ADD COLUMN execution_date integer CHECK (
    frequency != 'monthly' OR 
    (execution_date >= 1 AND execution_date <= 31)
  ),
  ADD COLUMN last_execution timestamptz,
  ADD COLUMN schedule_status text NOT NULL DEFAULT 'active' CHECK (schedule_status IN ('active', 'paused', 'error'));

-- Create improved validation function
CREATE OR REPLACE FUNCTION validate_schedule_details()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate execution_day for weekly frequency
  IF NEW.frequency = 'weekly' AND NEW.execution_day IS NULL THEN
    RAISE EXCEPTION 'Weekly scans require an execution day';
  END IF;

  -- Validate execution_date for monthly frequency
  IF NEW.frequency = 'monthly' AND NEW.execution_date IS NULL THEN
    RAISE EXCEPTION 'Monthly scans require an execution date';
  END IF;

  -- Clear irrelevant fields based on frequency
  IF NEW.frequency = 'daily' THEN
    NEW.execution_day := NULL;
    NEW.execution_date := NULL;
  ELSIF NEW.frequency = 'weekly' THEN
    NEW.execution_date := NULL;
  END IF;

  -- Calculate next_run based on frequency and execution details
  NEW.next_run := CASE
    WHEN NEW.frequency = 'daily' THEN
      date_trunc('day', NOW()) + NEW.execution_time::interval + 
      CASE 
        WHEN NEW.execution_time <= NOW()::time THEN interval '1 day'
        ELSE interval '0'
      END
    WHEN NEW.frequency = 'weekly' THEN
      date_trunc('day', NOW()) + NEW.execution_time::interval +
      ((7 + (extract(dow from NOW() + interval '1 day')::int - 
        extract(dow from date_trunc('day', NOW()) + 
        CASE NEW.execution_day
          WHEN 'monday' THEN interval '0 days'
          WHEN 'tuesday' THEN interval '1 days'
          WHEN 'wednesday' THEN interval '2 days'
          WHEN 'thursday' THEN interval '3 days'
          WHEN 'friday' THEN interval '4 days'
          WHEN 'saturday' THEN interval '5 days'
          WHEN 'sunday' THEN interval '6 days'
        END)::int)) % 7) * interval '1 day'
    WHEN NEW.frequency = 'monthly' THEN
      date_trunc('month', NOW()) + 
      ((NEW.execution_date - 1) * interval '1 day') +
      NEW.execution_time::interval +
      CASE 
        WHEN (date_trunc('month', NOW()) + ((NEW.execution_date - 1) * interval '1 day') + NEW.execution_time::interval) <= NOW()
        THEN interval '1 month'
        ELSE interval '0'
      END
    ELSE NOW()
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for schedule validation
CREATE TRIGGER validate_schedule_details_trigger
  BEFORE INSERT OR UPDATE ON scan_schedules
  FOR EACH ROW
  EXECUTE FUNCTION validate_schedule_details();

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_scan_schedules_status ON scan_schedules(schedule_status);
CREATE INDEX IF NOT EXISTS idx_scan_schedules_last_execution ON scan_schedules(last_execution);

-- Update existing schedules with default values
UPDATE scan_schedules
SET 
  execution_time = '00:00:00',
  execution_day = CASE frequency
    WHEN 'weekly' THEN 'monday'
    ELSE NULL
  END,
  execution_date = CASE frequency
    WHEN 'monthly' THEN 1
    ELSE NULL
  END,
  schedule_status = 'active';

-- Add constraints after updating existing data
ALTER TABLE scan_schedules
  ALTER COLUMN execution_time SET NOT NULL,
  ADD CONSTRAINT execution_day_required CHECK (
    frequency != 'weekly' OR execution_day IS NOT NULL
  ),
  ADD CONSTRAINT execution_date_required CHECK (
    frequency != 'monthly' OR execution_date IS NOT NULL
  );

-- Add helpful comments
COMMENT ON COLUMN scan_schedules.execution_time IS 'Time of day to run the scan (HH:MM:SS)';
COMMENT ON COLUMN scan_schedules.execution_day IS 'Day of week for weekly scans';
COMMENT ON COLUMN scan_schedules.execution_date IS 'Day of month for monthly scans (1-31)';
COMMENT ON COLUMN scan_schedules.last_execution IS 'Timestamp of the last successful scan';
COMMENT ON COLUMN scan_schedules.schedule_status IS 'Current status of the schedule (active/paused/error)';