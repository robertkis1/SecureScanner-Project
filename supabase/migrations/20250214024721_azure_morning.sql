/*
  # Add Schedule Details

  1. Changes
    - Add schedule_time column for daily scans (time of day)
    - Add schedule_day column for weekly scans (day of week)
    - Add schedule_date column for monthly scans (day of month)
    - Add last_run column to track execution history
    - Add status column to track schedule state

  2. Security
    - Maintains existing RLS policies
    - No changes to permissions required
*/

-- Add new columns to scan_schedules
ALTER TABLE scan_schedules
  ADD COLUMN schedule_time time NOT NULL DEFAULT '00:00:00',
  ADD COLUMN schedule_day text CHECK (
    frequency != 'weekly' OR 
    schedule_day IN ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')
  ),
  ADD COLUMN schedule_date integer CHECK (
    frequency != 'monthly' OR 
    (schedule_date >= 1 AND schedule_date <= 31)
  ),
  ADD COLUMN last_run timestamptz,
  ADD COLUMN status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'error'));

-- Add validation trigger for schedule details
CREATE OR REPLACE FUNCTION validate_schedule_details()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate schedule_day for weekly frequency
  IF NEW.frequency = 'weekly' AND NEW.schedule_day IS NULL THEN
    RAISE EXCEPTION 'Weekly scans require a schedule_day';
  END IF;

  -- Validate schedule_date for monthly frequency
  IF NEW.frequency = 'monthly' AND NEW.schedule_date IS NULL THEN
    RAISE EXCEPTION 'Monthly scans require a schedule_date';
  END IF;

  -- Clear irrelevant fields based on frequency
  IF NEW.frequency = 'daily' THEN
    NEW.schedule_day := NULL;
    NEW.schedule_date := NULL;
  ELSIF NEW.frequency = 'weekly' THEN
    NEW.schedule_date := NULL;
  END IF;

  -- Calculate next_run based on frequency and schedule details
  NEW.next_run := CASE
    WHEN NEW.frequency = 'daily' THEN
      date_trunc('day', NOW()) + NEW.schedule_time::interval + 
      CASE 
        WHEN NEW.schedule_time <= NOW()::time THEN interval '1 day'
        ELSE interval '0'
      END
    WHEN NEW.frequency = 'weekly' THEN
      date_trunc('day', NOW()) + NEW.schedule_time::interval +
      ((7 + (extract(dow from NOW() + interval '1 day')::int - 
        extract(dow from date_trunc('day', NOW()) + 
        CASE NEW.schedule_day
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
      ((NEW.schedule_date - 1) * interval '1 day') +
      NEW.schedule_time::interval +
      CASE 
        WHEN (date_trunc('month', NOW()) + ((NEW.schedule_date - 1) * interval '1 day') + NEW.schedule_time::interval) <= NOW()
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

-- Add index for status
CREATE INDEX idx_scan_schedules_status ON scan_schedules(status);

-- Update existing schedules with default values
UPDATE scan_schedules
SET 
  schedule_time = '00:00:00',
  schedule_day = CASE frequency
    WHEN 'weekly' THEN 'monday'
    ELSE NULL
  END,
  schedule_date = CASE frequency
    WHEN 'monthly' THEN 1
    ELSE NULL
  END,
  status = 'active';

-- Add constraints after updating existing data
ALTER TABLE scan_schedules
  ALTER COLUMN schedule_time SET NOT NULL,
  ADD CONSTRAINT schedule_day_required CHECK (
    frequency != 'weekly' OR schedule_day IS NOT NULL
  ),
  ADD CONSTRAINT schedule_date_required CHECK (
    frequency != 'monthly' OR schedule_date IS NOT NULL
  );

COMMENT ON COLUMN scan_schedules.schedule_time IS 'Time of day to run the scan (HH:MM:SS)';
COMMENT ON COLUMN scan_schedules.schedule_day IS 'Day of week for weekly scans';
COMMENT ON COLUMN scan_schedules.schedule_date IS 'Day of month for monthly scans (1-31)';
COMMENT ON COLUMN scan_schedules.last_run IS 'Timestamp of the last successful scan';
COMMENT ON COLUMN scan_schedules.status IS 'Current status of the schedule (active/paused/error)';