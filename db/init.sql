-- Naming convention: Snake case for table and column names, use plural for table names
-- Data types: Use appropriate data types (e.g., UUID for IDs, TEXT for strings, DECIMAL for prices)
-- Default values: Set sensible default values where applicable
-- Constraints: Add NOT NULL constraints to essential fields
-- JSONB: Use JSONB for flexible data structures like toppings
-- Arrays: Use arrays for fields that can have multiple values like ingredients, campaigns, and dietaries

-- Create a simple product table for CRUD testing
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  ingredients TEXT[],
  toppings JSONB,
  img_url TEXT,
  enabled BOOLEAN DEFAULT TRUE,
  campaigns TEXT[],
  category INT NOT NULL,
  dietaries INT[]
);

--TODO: why is /migrations not found by postgrator?

