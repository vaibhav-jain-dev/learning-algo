# SQL Fundamentals

## Overview

SQL (Structured Query Language) is the standard language for interacting with relational databases. This guide covers the core concepts from basic queries to advanced operations.

**Tags:** SQL, Database, Queries, CRUD

---

## The SELECT Statement

The SELECT statement retrieves data from one or more tables.

### Basic SELECT Syntax

```sql
-- Select all columns
SELECT * FROM users;

-- Select specific columns
SELECT id, name, email FROM users;

-- Select with alias
SELECT
    id,
    name AS user_name,
    email AS user_email
FROM users;
```

### Filtering with WHERE

```sql
-- Equal comparison
SELECT * FROM users WHERE status = 'active';

-- Multiple conditions (AND)
SELECT * FROM users
WHERE status = 'active' AND age >= 18;

-- Multiple conditions (OR)
SELECT * FROM users
WHERE role = 'admin' OR role = 'moderator';

-- NULL checking
SELECT * FROM users WHERE deleted_at IS NULL;
SELECT * FROM users WHERE phone IS NOT NULL;

-- Pattern matching with LIKE
SELECT * FROM users WHERE email LIKE '%@gmail.com';
SELECT * FROM users WHERE name LIKE 'John%';  -- starts with John
SELECT * FROM users WHERE name LIKE '%son';   -- ends with son

-- Range with BETWEEN
SELECT * FROM orders
WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31';

-- List with IN
SELECT * FROM users
WHERE country IN ('USA', 'Canada', 'UK');

-- NOT conditions
SELECT * FROM users WHERE status != 'deleted';
SELECT * FROM users WHERE role NOT IN ('banned', 'suspended');
```

### Ordering Results

```sql
-- Ascending order (default)
SELECT * FROM users ORDER BY created_at;

-- Descending order
SELECT * FROM users ORDER BY created_at DESC;

-- Multiple columns
SELECT * FROM users
ORDER BY status ASC, created_at DESC;

-- Using column position (not recommended)
SELECT name, age FROM users ORDER BY 2 DESC;
```

### Limiting Results

```sql
-- First N rows
SELECT * FROM users LIMIT 10;

-- Skip and take (pagination)
SELECT * FROM users LIMIT 10 OFFSET 20;

-- PostgreSQL alternative
SELECT * FROM users LIMIT 10 OFFSET 20;

-- MySQL alternative
SELECT * FROM users LIMIT 20, 10;  -- offset, limit
```

---

## Aggregation Functions

### COUNT, SUM, AVG, MIN, MAX

```sql
-- Count all rows
SELECT COUNT(*) FROM orders;

-- Count non-null values
SELECT COUNT(email) FROM users;

-- Count distinct values
SELECT COUNT(DISTINCT country) FROM users;

-- Sum
SELECT SUM(amount) FROM orders WHERE status = 'completed';

-- Average
SELECT AVG(age) FROM users;

-- Min and Max
SELECT MIN(price), MAX(price) FROM products;

-- Combined
SELECT
    COUNT(*) as total_orders,
    SUM(amount) as total_revenue,
    AVG(amount) as avg_order_value,
    MIN(amount) as min_order,
    MAX(amount) as max_order
FROM orders
WHERE status = 'completed';
```

### GROUP BY

```sql
-- Group by single column
SELECT country, COUNT(*) as user_count
FROM users
GROUP BY country;

-- Group by multiple columns
SELECT country, status, COUNT(*) as user_count
FROM users
GROUP BY country, status;

-- Group with aggregates
SELECT
    DATE(created_at) as order_date,
    COUNT(*) as order_count,
    SUM(amount) as daily_revenue
FROM orders
GROUP BY DATE(created_at)
ORDER BY order_date DESC;
```

### HAVING (filter groups)

```sql
-- Filter groups with HAVING
SELECT country, COUNT(*) as user_count
FROM users
GROUP BY country
HAVING COUNT(*) > 100;

-- HAVING with aggregate condition
SELECT
    customer_id,
    SUM(amount) as total_spent
FROM orders
GROUP BY customer_id
HAVING SUM(amount) > 1000
ORDER BY total_spent DESC;

-- WHERE vs HAVING
-- WHERE filters rows BEFORE grouping
-- HAVING filters groups AFTER grouping
SELECT
    category,
    AVG(price) as avg_price
FROM products
WHERE status = 'active'        -- filters rows
GROUP BY category
HAVING AVG(price) > 50;        -- filters groups
```

---

## INSERT, UPDATE, DELETE

### INSERT

```sql
-- Insert single row
INSERT INTO users (name, email, age)
VALUES ('John Doe', 'john@example.com', 25);

-- Insert multiple rows
INSERT INTO users (name, email, age) VALUES
    ('Jane Doe', 'jane@example.com', 28),
    ('Bob Smith', 'bob@example.com', 32),
    ('Alice Johnson', 'alice@example.com', 24);

-- Insert from SELECT
INSERT INTO archived_orders (id, customer_id, amount, created_at)
SELECT id, customer_id, amount, created_at
FROM orders
WHERE created_at < '2023-01-01';

-- Insert with RETURNING (PostgreSQL)
INSERT INTO users (name, email)
VALUES ('New User', 'new@example.com')
RETURNING id, name, created_at;
```

### UPDATE

```sql
-- Update single column
UPDATE users
SET status = 'inactive'
WHERE id = 123;

-- Update multiple columns
UPDATE users
SET
    status = 'verified',
    verified_at = NOW(),
    updated_at = NOW()
WHERE email_verified = true AND status = 'pending';

-- Update with calculation
UPDATE products
SET price = price * 1.1  -- 10% increase
WHERE category = 'electronics';

-- Update with subquery
UPDATE orders
SET customer_name = (
    SELECT name FROM customers WHERE customers.id = orders.customer_id
)
WHERE customer_name IS NULL;

-- Update with RETURNING (PostgreSQL)
UPDATE users
SET last_login = NOW()
WHERE id = 123
RETURNING id, name, last_login;
```

### DELETE

```sql
-- Delete specific rows
DELETE FROM users WHERE status = 'deleted';

-- Delete with subquery
DELETE FROM orders
WHERE customer_id IN (
    SELECT id FROM customers WHERE status = 'banned'
);

-- Delete all rows (careful!)
DELETE FROM temp_logs;

-- Truncate (faster for all rows, resets auto-increment)
TRUNCATE TABLE temp_logs;

-- Delete with RETURNING (PostgreSQL)
DELETE FROM sessions
WHERE expires_at < NOW()
RETURNING id, user_id;
```

---

## DISTINCT and CASE

### DISTINCT

```sql
-- Distinct single column
SELECT DISTINCT country FROM users;

-- Distinct multiple columns
SELECT DISTINCT country, city FROM users;

-- Distinct with ORDER BY
SELECT DISTINCT country
FROM users
ORDER BY country;

-- Count distinct
SELECT COUNT(DISTINCT email) FROM users;
```

### CASE Expressions

```sql
-- Simple CASE
SELECT
    name,
    status,
    CASE status
        WHEN 'active' THEN 'Active User'
        WHEN 'inactive' THEN 'Inactive User'
        WHEN 'pending' THEN 'Pending Verification'
        ELSE 'Unknown'
    END as status_label
FROM users;

-- Searched CASE (with conditions)
SELECT
    name,
    age,
    CASE
        WHEN age < 18 THEN 'Minor'
        WHEN age BETWEEN 18 AND 65 THEN 'Adult'
        ELSE 'Senior'
    END as age_group
FROM users;

-- CASE in aggregation
SELECT
    COUNT(CASE WHEN status = 'active' THEN 1 END) as active_count,
    COUNT(CASE WHEN status = 'inactive' THEN 1 END) as inactive_count,
    COUNT(*) as total
FROM users;

-- CASE in ORDER BY
SELECT * FROM orders
ORDER BY
    CASE status
        WHEN 'urgent' THEN 1
        WHEN 'high' THEN 2
        WHEN 'normal' THEN 3
        ELSE 4
    END;
```

---

## NULL Handling

### Understanding NULL

```sql
-- NULL is not equal to anything (even NULL)
SELECT * FROM users WHERE email = NULL;      -- Wrong! Returns nothing
SELECT * FROM users WHERE email IS NULL;     -- Correct

-- NULL in comparisons
SELECT * FROM users WHERE age > 18;  -- excludes NULL ages

-- NULL in math
SELECT 10 + NULL;  -- Returns NULL
SELECT NULL = NULL;  -- Returns NULL (not true!)
```

### COALESCE and NULLIF

```sql
-- COALESCE: first non-null value
SELECT
    name,
    COALESCE(nickname, name) as display_name
FROM users;

-- COALESCE with multiple fallbacks
SELECT
    COALESCE(phone_mobile, phone_home, phone_work, 'No phone') as phone
FROM contacts;

-- NULLIF: returns NULL if values equal
SELECT
    amount / NULLIF(quantity, 0) as unit_price  -- prevents division by zero
FROM order_items;

-- Practical example
SELECT
    name,
    COALESCE(
        NULLIF(bio, ''),  -- treat empty string as NULL
        'No bio provided'
    ) as bio
FROM users;
```

---

## String Functions

```sql
-- Concatenation
SELECT first_name || ' ' || last_name as full_name FROM users;  -- PostgreSQL
SELECT CONCAT(first_name, ' ', last_name) as full_name FROM users;  -- MySQL

-- Length
SELECT name, LENGTH(name) as name_length FROM users;

-- Case conversion
SELECT UPPER(name), LOWER(email) FROM users;

-- Trim whitespace
SELECT TRIM(name), LTRIM(name), RTRIM(name) FROM users;

-- Substring
SELECT SUBSTRING(phone, 1, 3) as area_code FROM users;

-- Replace
SELECT REPLACE(phone, '-', '') as clean_phone FROM users;

-- Position/Find
SELECT POSITION('@' IN email) as at_position FROM users;

-- Split (PostgreSQL)
SELECT SPLIT_PART(email, '@', 2) as domain FROM users;
```

---

## Date Functions

```sql
-- Current date/time
SELECT
    CURRENT_DATE,
    CURRENT_TIME,
    CURRENT_TIMESTAMP,
    NOW();

-- Extract parts
SELECT
    created_at,
    EXTRACT(YEAR FROM created_at) as year,
    EXTRACT(MONTH FROM created_at) as month,
    EXTRACT(DAY FROM created_at) as day,
    EXTRACT(HOUR FROM created_at) as hour
FROM orders;

-- Date arithmetic
SELECT
    created_at,
    created_at + INTERVAL '7 days' as one_week_later,
    created_at - INTERVAL '1 month' as one_month_ago
FROM orders;

-- Date difference
SELECT
    created_at,
    NOW() - created_at as age,
    EXTRACT(DAY FROM NOW() - created_at) as days_ago
FROM orders;

-- Formatting (PostgreSQL)
SELECT
    created_at,
    TO_CHAR(created_at, 'YYYY-MM-DD') as date_str,
    TO_CHAR(created_at, 'Month DD, YYYY') as formatted
FROM orders;

-- Truncate to date parts
SELECT
    DATE_TRUNC('month', created_at) as month_start,
    DATE_TRUNC('year', created_at) as year_start
FROM orders;
```

---

## Common Patterns

### Pagination

```sql
-- Basic pagination
SELECT * FROM products
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;   -- Page 1

SELECT * FROM products
ORDER BY created_at DESC
LIMIT 20 OFFSET 20;  -- Page 2

-- With total count
SELECT
    (SELECT COUNT(*) FROM products) as total,
    *
FROM products
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;

-- Cursor-based pagination (more efficient for large datasets)
SELECT * FROM products
WHERE id > 12345  -- last seen ID
ORDER BY id
LIMIT 20;
```

### Existence Checks

```sql
-- Check if row exists
SELECT EXISTS(SELECT 1 FROM users WHERE email = 'test@example.com');

-- Conditional insert
INSERT INTO users (email, name)
SELECT 'test@example.com', 'Test User'
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'test@example.com'
);

-- Upsert (INSERT ON CONFLICT - PostgreSQL)
INSERT INTO users (email, name, login_count)
VALUES ('test@example.com', 'Test User', 1)
ON CONFLICT (email)
DO UPDATE SET
    login_count = users.login_count + 1,
    last_login = NOW();
```

---

## Interview Tips

1. **Always use parameterized queries** - Never concatenate user input into SQL strings
2. **Understand execution order** - FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
3. **NULL awareness** - Remember NULL behavior in comparisons and aggregations
4. **Index awareness** - Know when your queries can use indexes
5. **Practice explaining** - Be ready to walk through how a complex query executes

---

## Related Topics

- [Joins Mastery](/topic/sql-learning/joins-mastery)
- [Subqueries and CTEs](/topic/sql-learning/subqueries-ctes)
- [Window Functions](/topic/sql-learning/window-functions)
- [Database Indexing](/topic/sql-learning/indexing-deep-dive)
