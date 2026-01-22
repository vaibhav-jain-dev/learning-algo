# SQL Fundamentals

## Overview

SQL (Structured Query Language) is the standard language for interacting with relational databases, enabling you to query, insert, update, and delete data. Mastering SQL fundamentals is essential for any developer working with data-driven applications and is a critical skill tested in technical interviews.

## Why This Matters

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 8px;">Real-World Importance</div>
<ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px;">
<li>Every web application uses databases</li>
<li>Data analysis and reporting depend on SQL</li>
<li>Backend development requires SQL proficiency</li>
<li>ETL pipelines and data engineering use SQL heavily</li>
</ul>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #10b981;">
<div style="color: #047857; font-weight: bold; margin-bottom: 8px;">Interview Frequency</div>
<ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px;">
<li>Asked in 90%+ of backend interviews</li>
<li>Common in data engineering roles</li>
<li>Tested in full-stack positions</li>
<li>Essential for data analyst interviews</li>
</ul>
</div>
</div>
</div>

## Core Concepts

### Query Execution Order

Understanding the logical order of SQL execution is crucial for writing correct queries:

```
FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT
```

This explains why you cannot use column aliases from SELECT in WHERE (WHERE executes before SELECT).

### The SELECT Statement

The SELECT statement retrieves data from tables.

```sql
-- Select specific columns
SELECT id, name, email FROM users;

-- Select with alias
SELECT
    id,
    name AS user_name,
    email AS user_email
FROM users;

-- Select with expressions
SELECT
    name,
    price,
    price * 0.9 AS discounted_price
FROM products;
```

### Filtering with WHERE

```sql
-- Basic comparison operators
SELECT * FROM users WHERE age >= 18;
SELECT * FROM users WHERE status != 'deleted';

-- NULL checking (common interview question!)
SELECT * FROM users WHERE phone IS NULL;
SELECT * FROM users WHERE phone IS NOT NULL;

-- Pattern matching with LIKE
SELECT * FROM users WHERE email LIKE '%@gmail.com';  -- ends with
SELECT * FROM users WHERE name LIKE 'John%';         -- starts with
SELECT * FROM users WHERE name LIKE '%son%';         -- contains

-- Range with BETWEEN (inclusive)
SELECT * FROM orders
WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31';

-- List with IN
SELECT * FROM users
WHERE country IN ('USA', 'Canada', 'UK');

-- Combining conditions
SELECT * FROM users
WHERE (status = 'active' OR status = 'pending')
  AND created_at > '2024-01-01';
```

### Aggregation Functions

```sql
-- COUNT, SUM, AVG, MIN, MAX
SELECT
    COUNT(*) as total_orders,
    COUNT(DISTINCT customer_id) as unique_customers,
    SUM(amount) as total_revenue,
    AVG(amount) as avg_order_value,
    MIN(amount) as smallest_order,
    MAX(amount) as largest_order
FROM orders
WHERE status = 'completed';
```

### GROUP BY and HAVING

```sql
-- Group by single column
SELECT country, COUNT(*) as user_count
FROM users
GROUP BY country;

-- Group by multiple columns
SELECT
    country,
    status,
    COUNT(*) as user_count
FROM users
GROUP BY country, status;

-- HAVING filters groups (after aggregation)
-- WHERE filters rows (before aggregation)
SELECT
    category,
    AVG(price) as avg_price
FROM products
WHERE status = 'active'     -- filters rows BEFORE grouping
GROUP BY category
HAVING AVG(price) > 50;     -- filters groups AFTER grouping
```

## Visual Explanation

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin: 0 0 20px 0; text-align: center;">SQL QUERY EXECUTION ORDER</h4>
<div style="display: flex; flex-direction: column; gap: 8px; max-width: 600px; margin: 0 auto;">
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #3b82f6; color: #fff; padding: 10px 20px; border-radius: 8px; min-width: 140px; text-align: center; font-weight: bold;">1. FROM</div>
<span style="color: #64748b; font-size: 14px;">Tables are identified and joined</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 20px;">&#8595;</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #8b5cf6; color: #fff; padding: 10px 20px; border-radius: 8px; min-width: 140px; text-align: center; font-weight: bold;">2. WHERE</div>
<span style="color: #64748b; font-size: 14px;">Individual rows are filtered</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 20px;">&#8595;</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #ec4899; color: #fff; padding: 10px 20px; border-radius: 8px; min-width: 140px; text-align: center; font-weight: bold;">3. GROUP BY</div>
<span style="color: #64748b; font-size: 14px;">Rows are organized into groups</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 20px;">&#8595;</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #f59e0b; color: #fff; padding: 10px 20px; border-radius: 8px; min-width: 140px; text-align: center; font-weight: bold;">4. HAVING</div>
<span style="color: #64748b; font-size: 14px;">Groups are filtered</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 20px;">&#8595;</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #10b981; color: #fff; padding: 10px 20px; border-radius: 8px; min-width: 140px; text-align: center; font-weight: bold;">5. SELECT</div>
<span style="color: #64748b; font-size: 14px;">Columns are selected and computed</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 20px;">&#8595;</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #06b6d4; color: #fff; padding: 10px 20px; border-radius: 8px; min-width: 140px; text-align: center; font-weight: bold;">6. ORDER BY</div>
<span style="color: #64748b; font-size: 14px;">Results are sorted</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 20px;">&#8595;</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #64748b; color: #fff; padding: 10px 20px; border-radius: 8px; min-width: 140px; text-align: center; font-weight: bold;">7. LIMIT</div>
<span style="color: #64748b; font-size: 14px;">Result set is limited</span>
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin: 0 0 20px 0; text-align: center;">WHERE vs HAVING</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #ffffff; border-radius: 8px; padding: 20px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; font-size: 16px; margin-bottom: 12px;">WHERE</div>
<div style="color: #475569; font-size: 14px; margin-bottom: 12px;">Filters individual rows BEFORE grouping</div>
<div style="background: #f1f5f9; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px;">
SELECT category, COUNT(*)<br/>
FROM products<br/>
<span style="color: #3b82f6; font-weight: bold;">WHERE price > 100</span><br/>
GROUP BY category;
</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 20px; border: 2px solid #f59e0b;">
<div style="color: #b45309; font-weight: bold; font-size: 16px; margin-bottom: 12px;">HAVING</div>
<div style="color: #475569; font-size: 14px; margin-bottom: 12px;">Filters groups AFTER aggregation</div>
<div style="background: #f1f5f9; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px;">
SELECT category, COUNT(*)<br/>
FROM products<br/>
GROUP BY category<br/>
<span style="color: #f59e0b; font-weight: bold;">HAVING COUNT(*) > 10</span>;
</div>
</div>
</div>
</div>

## SQL Examples

### Basic Level

```sql
-- 1. Simple SELECT with filtering
SELECT name, email, created_at
FROM users
WHERE status = 'active'
ORDER BY created_at DESC
LIMIT 10;

-- 2. Basic aggregation
SELECT COUNT(*) as total_users
FROM users
WHERE created_at >= '2024-01-01';

-- 3. GROUP BY basics
SELECT country, COUNT(*) as user_count
FROM users
GROUP BY country
ORDER BY user_count DESC;
```

### Intermediate Level

```sql
-- 4. Multiple aggregations with HAVING
SELECT
    category,
    COUNT(*) as product_count,
    AVG(price) as avg_price,
    SUM(stock) as total_stock
FROM products
WHERE status = 'active'
GROUP BY category
HAVING COUNT(*) >= 5
ORDER BY avg_price DESC;

-- 5. CASE expressions for conditional logic
SELECT
    name,
    price,
    CASE
        WHEN price < 10 THEN 'Budget'
        WHEN price < 50 THEN 'Standard'
        WHEN price < 100 THEN 'Premium'
        ELSE 'Luxury'
    END as price_tier
FROM products;

-- 6. Conditional aggregation
SELECT
    COUNT(*) as total_orders,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed,
    COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
    COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled
FROM orders;
```

### Advanced Level

```sql
-- 7. NULL handling with COALESCE
SELECT
    name,
    COALESCE(phone, email, 'No contact') as contact_info,
    COALESCE(discount_pct, 0) as discount
FROM customers;

-- 8. Complex filtering with subquery
SELECT *
FROM products
WHERE price > (SELECT AVG(price) FROM products)
  AND category IN (SELECT DISTINCT category FROM featured_products);

-- 9. Date operations and grouping
SELECT
    DATE_TRUNC('month', created_at) as month,
    COUNT(*) as order_count,
    SUM(amount) as total_revenue,
    AVG(amount) as avg_order_value
FROM orders
WHERE created_at >= NOW() - INTERVAL '12 months'
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month DESC;

-- 10. UPSERT (INSERT ON CONFLICT)
INSERT INTO user_metrics (user_id, login_count, last_login)
VALUES (123, 1, NOW())
ON CONFLICT (user_id)
DO UPDATE SET
    login_count = user_metrics.login_count + 1,
    last_login = NOW();
```

## Common Interview Questions

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<div style="margin-bottom: 24px;">
<div style="background: #dcfce7; color: #166534; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px;">Easy</div>
<ul style="margin: 0; padding-left: 20px; color: #334155;">
<li><strong>What is the difference between WHERE and HAVING?</strong><br/>
<em>WHERE filters rows before grouping, HAVING filters groups after aggregation.</em></li>
<li><strong>What is the difference between DELETE and TRUNCATE?</strong><br/>
<em>DELETE removes specific rows and can be rolled back; TRUNCATE removes all rows faster and resets auto-increment.</em></li>
<li><strong>How do you find duplicate records?</strong><br/>
<em>Use GROUP BY with HAVING COUNT(*) > 1.</em></li>
</ul>
</div>

<div style="margin-bottom: 24px;">
<div style="background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px;">Medium</div>
<ul style="margin: 0; padding-left: 20px; color: #334155;">
<li><strong>Why can't you use a column alias in WHERE clause?</strong><br/>
<em>Because WHERE executes before SELECT in the logical query order.</em></li>
<li><strong>What happens when comparing NULL with = operator?</strong><br/>
<em>Returns NULL (unknown), not TRUE or FALSE. Use IS NULL instead.</em></li>
<li><strong>Write a query to find the second highest salary.</strong></li>
</ul>
</div>

<div>
<div style="background: #fee2e2; color: #991b1b; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px;">Hard</div>
<ul style="margin: 0; padding-left: 20px; color: #334155;">
<li><strong>Explain query execution order and why it matters for optimization.</strong></li>
<li><strong>How would you handle NULL values in NOT IN subqueries?</strong><br/>
<em>NOT IN returns no results if subquery contains NULL. Use NOT EXISTS instead.</em></li>
<li><strong>Write a query to calculate running totals without window functions.</strong></li>
</ul>
</div>
</div>

## Performance Considerations

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin: 0 0 16px 0;">Optimization Tips</h4>
<div style="display: grid; gap: 12px;">
<div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #10b981;">
<div style="color: #047857; font-weight: bold; margin-bottom: 8px;">Select Only Needed Columns</div>
<div style="color: #475569; font-size: 14px;">Avoid SELECT * in production. Specify exact columns to reduce I/O and memory usage.</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 8px;">Use Indexes on WHERE Columns</div>
<div style="color: #475569; font-size: 14px;">Create indexes on columns used in WHERE, ORDER BY, and GROUP BY clauses.</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #f59e0b;">
<div style="color: #b45309; font-weight: bold; margin-bottom: 8px;">Avoid Functions on Indexed Columns</div>
<div style="color: #475569; font-size: 14px;">WHERE YEAR(date_col) = 2024 cannot use index. Use range: WHERE date_col >= '2024-01-01' AND date_col < '2025-01-01'</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #ec4899;">
<div style="color: #be185d; font-weight: bold; margin-bottom: 8px;">Use LIMIT for Large Results</div>
<div style="color: #475569; font-size: 14px;">Always paginate large result sets. Consider cursor-based pagination for better performance.</div>
</div>
</div>
</div>

### Indexing Implications

```sql
-- Index-friendly queries
SELECT * FROM users WHERE email = 'test@example.com';  -- Uses index on email
SELECT * FROM orders WHERE created_at > '2024-01-01' ORDER BY created_at;  -- Uses index

-- NOT index-friendly (avoid these patterns)
SELECT * FROM users WHERE LOWER(email) = 'test@example.com';  -- Function prevents index use
SELECT * FROM users WHERE email LIKE '%@gmail.com';  -- Leading wildcard cannot use index
SELECT * FROM orders WHERE YEAR(created_at) = 2024;  -- Function on indexed column
```

## Practice Problems

### Problem 1: Find Duplicate Emails
```sql
-- Given: users table with (id, name, email)
-- Find all duplicate email addresses

SELECT email, COUNT(*) as count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

### Problem 2: Second Highest Salary
```sql
-- Given: employees table with (id, name, salary)
-- Find the second highest salary

-- Solution 1: Using OFFSET
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;

-- Solution 2: Using subquery
SELECT MAX(salary) as second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);
```

### Problem 3: Calculate Percentage of Total
```sql
-- Given: sales table with (id, category, amount)
-- Show each category's percentage of total sales

SELECT
    category,
    SUM(amount) as category_total,
    ROUND(
        100.0 * SUM(amount) / (SELECT SUM(amount) FROM sales),
        2
    ) as percentage
FROM sales
GROUP BY category
ORDER BY percentage DESC;
```

### Problem 4: Find Customers with No Orders
```sql
-- Given: customers (id, name) and orders (id, customer_id, amount)
-- Find customers who have never placed an order

-- Solution 1: LEFT JOIN with NULL check
SELECT c.id, c.name
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;

-- Solution 2: NOT EXISTS (preferred)
SELECT c.id, c.name
FROM customers c
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.id
);
```

### Problem 5: Consecutive Date Analysis
```sql
-- Given: logins table with (user_id, login_date)
-- Find users who logged in for 3+ consecutive days

WITH login_groups AS (
    SELECT
        user_id,
        login_date,
        login_date - ROW_NUMBER() OVER (
            PARTITION BY user_id ORDER BY login_date
        )::int AS grp
    FROM (SELECT DISTINCT user_id, login_date FROM logins) t
)
SELECT DISTINCT user_id
FROM login_groups
GROUP BY user_id, grp
HAVING COUNT(*) >= 3;
```

## Quick Reference Card

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
<div>
<h4 style="color: #1e40af; margin: 0 0 12px 0;">Basic Syntax</h4>
<div style="background: #ffffff; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 12px;">
SELECT columns<br/>
FROM table<br/>
WHERE condition<br/>
GROUP BY columns<br/>
HAVING condition<br/>
ORDER BY columns<br/>
LIMIT n OFFSET m;
</div>
</div>
<div>
<h4 style="color: #1e40af; margin: 0 0 12px 0;">Common Operators</h4>
<div style="background: #ffffff; padding: 12px; border-radius: 8px; font-size: 13px;">
<code>=, !=, <>, <, >, <=, >=</code><br/>
<code>AND, OR, NOT</code><br/>
<code>IN, NOT IN</code><br/>
<code>BETWEEN ... AND ...</code><br/>
<code>LIKE, ILIKE</code><br/>
<code>IS NULL, IS NOT NULL</code>
</div>
</div>
<div>
<h4 style="color: #1e40af; margin: 0 0 12px 0;">Aggregate Functions</h4>
<div style="background: #ffffff; padding: 12px; border-radius: 8px; font-size: 13px;">
<code>COUNT(*), COUNT(col), COUNT(DISTINCT col)</code><br/>
<code>SUM(col), AVG(col)</code><br/>
<code>MIN(col), MAX(col)</code><br/>
<code>STRING_AGG(col, ',')</code>
</div>
</div>
<div>
<h4 style="color: #1e40af; margin: 0 0 12px 0;">NULL Handling</h4>
<div style="background: #ffffff; padding: 12px; border-radius: 8px; font-size: 13px;">
<code>COALESCE(a, b, c)</code> - First non-null<br/>
<code>NULLIF(a, b)</code> - NULL if a = b<br/>
<code>IS NULL / IS NOT NULL</code><br/>
<code>NULL = NULL</code> returns NULL!
</div>
</div>
</div>
</div>

---

## Related Topics

- [Joins Mastery](/topic/sql-learning/joins-mastery)
- [Subqueries and CTEs](/topic/sql-learning/subqueries-ctes)
- [Window Functions](/topic/sql-learning/window-functions)
- [Database Indexing](/topic/sql-learning/indexing-deep-dive)
- [Query Optimization](/topic/sql-learning/query-optimization)
