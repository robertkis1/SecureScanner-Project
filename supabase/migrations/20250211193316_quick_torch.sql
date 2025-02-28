/*
  # Fix RLS policies for profile creation and management

  1. Changes
    - Drop all existing policies
    - Disable and re-enable RLS for clean state
    - Create new simplified policies with proper permissions
    - Add explicit service role bypass
    - Grant necessary permissions to roles

  2. Security
    - Maintain RLS on profiles table
    - Allow authenticated users to manage their own profiles
    - Allow admins to manage all profiles
    - Grant service role full access for auth flows
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "profiles_select" ON profiles;
DROP POLICY IF EXISTS "service_role_all" ON profiles;
DROP POLICY IF EXISTS "users_manage_own" ON profiles;
DROP POLICY IF EXISTS "admins_manage_all" ON profiles;

-- Temporarily disable RLS
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Allow service role to bypass RLS
ALTER TABLE profiles FORCE ROW LEVEL SECURITY;

-- Grant full access to service role
GRANT ALL ON profiles TO service_role;
GRANT USAGE ON SCHEMA public TO service_role;

-- Grant necessary permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated;

-- Create policy for service role with full access
CREATE POLICY "service_role_all"
  ON profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create policy for authenticated users to read all profiles
CREATE POLICY "users_read_all"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for authenticated users to insert their own profile
CREATE POLICY "users_insert_own"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create policy for authenticated users to update their own profile
CREATE POLICY "users_update_own"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policy for admins to manage all profiles
CREATE POLICY "admins_manage_all"
  ON profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role = 'admin'
    )
  )
  WITH CHECK (true);