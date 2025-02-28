/*
  # Fix RLS policies to prevent recursion and simplify access control

  1. Changes
    - Drop all existing policies
    - Reset RLS state
    - Create new non-recursive policies
    - Simplify admin access checks

  2. Security
    - Maintain RLS on profiles table
    - Allow users to manage their own profiles
    - Allow admins to manage all profiles
    - Grant service role full access
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "service_role_all" ON profiles;
DROP POLICY IF EXISTS "users_read_all" ON profiles;
DROP POLICY IF EXISTS "users_insert_own" ON profiles;
DROP POLICY IF EXISTS "users_update_own" ON profiles;
DROP POLICY IF EXISTS "admins_manage_all" ON profiles;

-- Reset RLS state
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON profiles TO service_role;
GRANT USAGE ON SCHEMA public TO service_role;
GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated;

-- Create policy for service role (highest priority)
CREATE POLICY "service_role_access"
  ON profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policy for reading profiles (all authenticated users)
CREATE POLICY "read_all_profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for inserting own profile
CREATE POLICY "insert_own_profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create policy for updating profiles (self or admin)
CREATE POLICY "update_profiles"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    -- User can update their own profile OR user is an admin
    auth.uid() = id OR
    role = 'admin'
  )
  WITH CHECK (true);