/*
  # Fix RLS policies for profile creation

  1. Changes
    - Drop existing policies
    - Create new policies that properly handle profile creation
    - Add policy for authenticated users to create their own profile
    - Add policy for service role to manage all profiles
    - Ensure proper access control for profile management

  2. Security
    - Enable RLS on profiles table
    - Add policies for read, insert, and update operations
    - Maintain strict access control while allowing necessary operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable update for users and admins" ON profiles;
DROP POLICY IF EXISTS "Enable all actions for service role" ON profiles;

-- Create new policies with proper permissions
CREATE POLICY "Allow users to read profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow users to create their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = id
  );

CREATE POLICY "Allow users to update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  )
  WITH CHECK (
    CASE 
      WHEN auth.uid() = id THEN true
      WHEN EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role = 'admin'
      ) THEN true
      ELSE false
    END
  );

-- Add service role policy with full access
CREATE POLICY "Service role has full access"
  ON profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;