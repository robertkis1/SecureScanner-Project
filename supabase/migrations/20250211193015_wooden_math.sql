/*
  # Fix RLS policies for profile creation

  1. Changes
    - Drop existing policies
    - Create simplified policies that properly handle profile creation
    - Add explicit policy for profile creation during signup
    - Ensure service role has proper access

  2. Security
    - Maintain RLS on profiles table
    - Ensure authenticated users can only access appropriate data
    - Allow service role to manage profiles during auth flows
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow users to read profiles" ON profiles;
DROP POLICY IF EXISTS "Allow users to create their own profile" ON profiles;
DROP POLICY IF EXISTS "Allow users to update their own profile" ON profiles;
DROP POLICY IF EXISTS "Service role has full access" ON profiles;

-- Temporarily disable RLS to ensure clean state
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create simplified policies
CREATE POLICY "profiles_read_policy"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "profiles_insert_policy"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_policy"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id OR role = 'admin');

-- Add service role policy with unrestricted access
CREATE POLICY "profiles_service_role_policy"
  ON profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Grant necessary permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON profiles TO authenticated;

-- Grant all permissions to service role
GRANT ALL ON profiles TO service_role;