/*
  # Update security history schema
  
  1. Changes
    - Add check_categories field to security_history table to store counts by category
  
  2. Security
    - Maintains existing RLS policies
    - No changes to permissions
*/

ALTER TABLE security_history
ADD COLUMN check_categories jsonb NOT NULL DEFAULT '{
  "network": {"secure": 0, "warning": 0, "error": 0},
  "privacy": {"secure": 0, "warning": 0, "error": 0},
  "system": {"secure": 0, "warning": 0, "error": 0},
  "authentication": {"secure": 0, "warning": 0, "error": 0}
}'::jsonb;