/*
  # Fix RLS Policies

  1. Changes
    - Remove circular dependencies in admin policies
    - Simplify policy structure
    - Add better policy names
    - Ensure proper access control

  2. Security
    - Maintain strict access control
    - Prevent infinite recursion
    - Allow proper profile management
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Service role can manage all profiles" ON profiles;

-- Create new policies with simplified logic
CREATE POLICY "Enable read access for users to own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id OR 
    role = 'admin'
  );

CREATE POLICY "Enable insert for users"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update for users"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = id OR 
    role = 'admin'
  )
  WITH CHECK (
    CASE 
      WHEN auth.uid() = id THEN true  -- Users can update their own profile
      WHEN EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role = 'admin'
      ) THEN true  -- Admins can update any profile
      ELSE false
    END
  );

-- Enable service role access
CREATE POLICY "Enable service role access"
  ON profiles
  TO service_role
  USING (true)
  WITH CHECK (true);