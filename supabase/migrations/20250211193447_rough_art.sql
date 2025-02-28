/*
  # Fix RLS policies for profile creation

  1. Changes
    - Drop all existing policies
    - Reset RLS state
    - Create simplified policies
    - Ensure service role has proper access

  2. Security
    - Maintain RLS on profiles table
    - Allow service role full access
    - Allow users to read all profiles
    - Allow users to manage their own profiles
    - Allow admins to manage all profiles
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "service_role_access" ON profiles;
DROP POLICY IF EXISTS "read_all_profiles" ON profiles;
DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
DROP POLICY IF EXISTS "update_profiles" ON profiles;

-- Reset RLS state
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON profiles TO service_role;
GRANT USAGE ON SCHEMA public TO service_role;
GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated;

-- Create policy for service role with full access
CREATE POLICY "service_role_policy"
  ON profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policy for authenticated users to read all profiles
CREATE POLICY "read_policy"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for authenticated users to insert their own profile
CREATE POLICY "insert_policy"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = id OR
    EXISTS (
      SELECT 1
      FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'service_role'
    )
  );

-- Create policy for users to update their own profile or admins to update any profile
CREATE POLICY "update_policy"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = id OR
    role = 'admin' OR
    EXISTS (
      SELECT 1
      FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'service_role'
    )
  );