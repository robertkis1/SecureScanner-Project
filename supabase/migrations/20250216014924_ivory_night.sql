/*
  # Add Security-Related Tables

  1. New Tables
    - security_history: Stores historical security scan results
    - security_notifications: Stores user notifications
    - security_schedules: Stores automated scan schedules
    - security_feedback: Stores user feedback

  2. Security
    - Enable RLS on all tables
    - Add policies for user access
*/

-- Create security_history table
CREATE TABLE security_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  score integer NOT NULL,
  issues jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create security_notifications table
CREATE TABLE security_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  type text NOT NULL CHECK (type IN ('score_drop', 'critical_issue', 'warning')),
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create security_schedules table
CREATE TABLE security_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  enabled boolean DEFAULT false,
  frequency text NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  time text NOT NULL,
  last_run timestamptz,
  next_run timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create security_feedback table
CREATE TABLE security_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE security_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for security_history
CREATE POLICY "Users can read own security history"
  ON security_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create security history"
  ON security_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policies for security_notifications
CREATE POLICY "Users can read own notifications"
  ON security_notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create notifications"
  ON security_notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON security_notifications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for security_schedules
CREATE POLICY "Users can read own schedules"
  ON security_schedules
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own schedules"
  ON security_schedules
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policies for security_feedback
CREATE POLICY "Users can read own feedback"
  ON security_feedback
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create feedback"
  ON security_feedback
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_security_history_user_id ON security_history(user_id);
CREATE INDEX idx_security_history_created_at ON security_history(created_at);
CREATE INDEX idx_security_notifications_user_id ON security_notifications(user_id);
CREATE INDEX idx_security_notifications_created_at ON security_notifications(created_at);
CREATE INDEX idx_security_schedules_user_id ON security_schedules(user_id);
CREATE INDEX idx_security_schedules_next_run ON security_schedules(next_run);
CREATE INDEX idx_security_feedback_user_id ON security_feedback(user_id);
CREATE INDEX idx_security_feedback_created_at ON security_feedback(created_at);

-- Grant necessary permissions
GRANT ALL ON security_history TO authenticated;
GRANT ALL ON security_notifications TO authenticated;
GRANT ALL ON security_schedules TO authenticated;
GRANT ALL ON security_feedback TO authenticated;