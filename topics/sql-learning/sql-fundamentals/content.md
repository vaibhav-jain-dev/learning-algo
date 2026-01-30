# SQL Fundamentals

## Overview

SQL (Structured Query Language) is the universal language for interacting with relational databases. It enables developers to query, insert, update, and delete data with precision and efficiency. SQL has been the backbone of data management for over four decades, and mastering its fundamentals is essential for anyone working with data-driven applications, analytics, or backend systems.

This comprehensive guide covers the core building blocks of SQL, from basic SELECT statements to complex aggregations and filtering. Understanding these fundamentals provides the foundation for advanced topics like joins, subqueries, window functions, and query optimization.

---

## Why It Matters

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border-left: 4px solid #3b82f6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
<div style="color: #1e40af; font-weight: bold; font-size: 16px; margin-bottom: 12px;">Industry Relevance</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; font-size: 14px; line-height: 1.8;">
<li>Powers 90%+ of business applications worldwide</li>
<li>Essential for data analysis and business intelligence</li>
<li>Required skill for backend and full-stack development</li>
<li>Foundation for data engineering and ETL pipelines</li>
<li>Critical for DevOps and infrastructure monitoring</li>
</ul>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border-left: 4px solid #10b981; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
<div style="color: #047857; font-weight: bold; font-size: 16px; margin-bottom: 12px;">Interview Importance</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; font-size: 14px; line-height: 1.8;">
<li>Asked in 95%+ of backend developer interviews</li>
<li>Core requirement for data analyst positions</li>
<li>Essential for data scientist technical screens</li>
<li>Tested in full-stack and DevOps roles</li>
<li>Common in system design discussions</li>
</ul>
</div>
</div>
</div>

Understanding SQL fundamentals opens doors across the entire technology industry. Whether you are building web applications, analyzing business data, or designing data pipelines, SQL proficiency is a skill that compounds in value throughout your career.

---

## Query Execution Order

One of the most important concepts to understand is how SQL actually processes your queries. The logical execution order differs from how you write the query.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 24px 0; text-align: center; font-size: 18px;">SQL QUERY EXECUTION ORDER</h4>
<div style="display: flex; flex-direction: column; gap: 12px; max-width: 650px; margin: 0 auto;">
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #3b82f6; color: #ffffff; padding: 12px 24px; border-radius: 10px; min-width: 160px; text-align: center; font-weight: bold; font-size: 14px;">1. FROM / JOIN</div>
<span style="color: #475569; font-size: 14px;">Tables are identified and joined together</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 24px;">&#8595;</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #8b5cf6; color: #ffffff; padding: 12px 24px; border-radius: 10px; min-width: 160px; text-align: center; font-weight: bold; font-size: 14px;">2. WHERE</div>
<span style="color: #475569; font-size: 14px;">Individual rows are filtered (before grouping)</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 24px;">&#8595;</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #ec4899; color: #ffffff; padding: 12px 24px; border-radius: 10px; min-width: 160px; text-align: center; font-weight: bold; font-size: 14px;">3. GROUP BY</div>
<span style="color: #475569; font-size: 14px;">Rows are organized into groups</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 24px;">&#8595;</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f59e0b; color: #ffffff; padding: 12px 24px; border-radius: 10px; min-width: 160px; text-align: center; font-weight: bold; font-size: 14px;">4. HAVING</div>
<span style="color: #475569; font-size: 14px;">Groups are filtered (after aggregation)</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 24px;">&#8595;</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #10b981; color: #ffffff; padding: 12px 24px; border-radius: 10px; min-width: 160px; text-align: center; font-weight: bold; font-size: 14px;">5. SELECT</div>
<span style="color: #475569; font-size: 14px;">Columns are selected and expressions computed</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 24px;">&#8595;</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #06b6d4; color: #ffffff; padding: 12px 24px; border-radius: 10px; min-width: 160px; text-align: center; font-weight: bold; font-size: 14px;">6. DISTINCT</div>
<span style="color: #475569; font-size: 14px;">Duplicate rows are removed</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 24px;">&#8595;</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #6366f1; color: #ffffff; padding: 12px 24px; border-radius: 10px; min-width: 160px; text-align: center; font-weight: bold; font-size: 14px;">7. ORDER BY</div>
<span style="color: #475569; font-size: 14px;">Results are sorted</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 24px;">&#8595;</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #64748b; color: #ffffff; padding: 12px 24px; border-radius: 10px; min-width: 160px; text-align: center; font-weight: bold; font-size: 14px;">8. LIMIT / OFFSET</div>
<span style="color: #475569; font-size: 14px;">Result set is limited and paginated</span>
</div>
</div>
</div>

This execution order explains many SQL behaviors. For example, you cannot use a column alias defined in SELECT within your WHERE clause, because WHERE is processed before SELECT.

---

## Sample Data

For all examples in this guide, we will use the following tables:

```sql
-- Customers table
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    country VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10,2),
    stock INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active'
);

-- Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    total_amount DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sample data
INSERT INTO customers (id, name, email, country) VALUES
    (1, 'Alice Johnson', 'alice@example.com', 'USA'),
    (2, 'Bob Smith', 'bob@example.com', 'Canada'),
    (3, 'Charlie Brown', 'charlie@example.com', 'USA'),
    (4, 'Diana Prince', 'diana@example.com', 'UK'),
    (5, 'Eve Wilson', NULL, 'Australia');

INSERT INTO products (id, name, category, price, stock, status) VALUES
    (1, 'Laptop Pro', 'Electronics', 1299.99, 50, 'active'),
    (2, 'Wireless Mouse', 'Electronics', 29.99, 200, 'active'),
    (3, 'Coffee Maker', 'Appliances', 79.99, 75, 'active'),
    (4, 'Desk Lamp', 'Furniture', 45.00, 0, 'discontinued'),
    (5, 'Notebook Set', 'Stationery', 12.99, 500, 'active');

INSERT INTO orders (id, customer_id, total_amount, status, created_at) VALUES
    (101, 1, 1329.98, 'completed', '2024-01-15'),
    (102, 1, 79.99, 'completed', '2024-02-20'),
    (103, 2, 29.99, 'pending', '2024-03-10'),
    (104, 3, 1299.99, 'completed', '2024-03-15'),
    (105, NULL, 45.00, 'cancelled', '2024-03-20');
```

---

## The SELECT Statement

The SELECT statement is the foundation of SQL queries. It retrieves data from one or more tables.

### Basic Selection

```sql
-- Select all columns (avoid in production)
SELECT * FROM customers;

-- Select specific columns
SELECT id, name, email FROM customers;

-- Select with column aliases
SELECT
    id AS customer_id,
    name AS customer_name,
    email AS contact_email
FROM customers;
```

### Computed Columns and Expressions

```sql
-- Arithmetic expressions
SELECT
    name,
    price,
    price * 1.1 AS price_with_tax,
    price * 0.9 AS discounted_price,
    stock * price AS inventory_value
FROM products;

-- String concatenation
SELECT
    name || ' (' || country || ')' AS customer_location
FROM customers;

-- CASE expressions for conditional logic
SELECT
    name,
    price,
    CASE
        WHEN price < 50 THEN 'Budget'
        WHEN price < 200 THEN 'Standard'
        WHEN price < 1000 THEN 'Premium'
        ELSE 'Luxury'
    END AS price_tier
FROM products;
```

---

## Filtering with WHERE

The WHERE clause filters rows before any grouping or aggregation occurs.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center; font-size: 16px;">COMPARISON OPERATORS</h4>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
<div style="background: #ffffff; border-radius: 10px; padding: 16px; text-align: center; border: 1px solid #e2e8f0;">
<code style="color: #1e293b; font-size: 18px; font-weight: bold;">=</code>
<div style="color: #64748b; font-size: 12px; margin-top: 8px;">Equal to</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; text-align: center; border: 1px solid #e2e8f0;">
<code style="color: #1e293b; font-size: 18px; font-weight: bold;"><> or !=</code>
<div style="color: #64748b; font-size: 12px; margin-top: 8px;">Not equal to</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; text-align: center; border: 1px solid #e2e8f0;">
<code style="color: #1e293b; font-size: 18px; font-weight: bold;">< ></code>
<div style="color: #64748b; font-size: 12px; margin-top: 8px;">Less/Greater than</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; text-align: center; border: 1px solid #e2e8f0;">
<code style="color: #1e293b; font-size: 18px; font-weight: bold;"><= >=</code>
<div style="color: #64748b; font-size: 12px; margin-top: 8px;">Less/Greater or equal</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; text-align: center; border: 1px solid #e2e8f0;">
<code style="color: #1e293b; font-size: 18px; font-weight: bold;">BETWEEN</code>
<div style="color: #64748b; font-size: 12px; margin-top: 8px;">Range (inclusive)</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; text-align: center; border: 1px solid #e2e8f0;">
<code style="color: #1e293b; font-size: 18px; font-weight: bold;">IN</code>
<div style="color: #64748b; font-size: 12px; margin-top: 8px;">Match any in list</div>
</div>
</div>
</div>

### Comparison Operators

```sql
-- Basic comparisons
SELECT * FROM products WHERE price > 50;
SELECT * FROM products WHERE stock = 0;
SELECT * FROM customers WHERE country != 'USA';

-- BETWEEN for ranges (inclusive on both ends)
SELECT * FROM products
WHERE price BETWEEN 20 AND 100;

-- IN for matching multiple values
SELECT * FROM customers
WHERE country IN ('USA', 'Canada', 'UK');

-- NOT IN for exclusion
SELECT * FROM products
WHERE category NOT IN ('Electronics', 'Furniture');
```

### Pattern Matching with LIKE

```sql
-- Starts with 'A'
SELECT * FROM customers WHERE name LIKE 'A%';

-- Ends with '@example.com'
SELECT * FROM customers WHERE email LIKE '%@example.com';

-- Contains 'son'
SELECT * FROM customers WHERE name LIKE '%son%';

-- Single character wildcard
SELECT * FROM products WHERE name LIKE 'Laptop___';  -- 3 chars after Laptop

-- Case-insensitive matching (PostgreSQL)
SELECT * FROM customers WHERE name ILIKE '%brown%';
```

### NULL Handling

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%); border: 2px solid #fcd34d; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="color: #92400e; font-weight: bold; font-size: 14px; margin-bottom: 8px;">Important: NULL Comparisons</div>
<div style="color: #78350f; font-size: 14px;">NULL represents missing or unknown data. You cannot compare NULL using = or !=. Always use IS NULL or IS NOT NULL.</div>
</div>

```sql
-- WRONG: This will not work!
SELECT * FROM customers WHERE email = NULL;

-- CORRECT: Use IS NULL
SELECT * FROM customers WHERE email IS NULL;

-- Find customers WITH email addresses
SELECT * FROM customers WHERE email IS NOT NULL;

-- COALESCE provides a default for NULL values
SELECT
    name,
    COALESCE(email, 'No email provided') AS contact
FROM customers;
```

### Combining Conditions

```sql
-- AND: Both conditions must be true
SELECT * FROM products
WHERE category = 'Electronics' AND price < 100;

-- OR: Either condition can be true
SELECT * FROM orders
WHERE status = 'pending' OR status = 'processing';

-- Complex combinations with parentheses
SELECT * FROM products
WHERE (category = 'Electronics' OR category = 'Appliances')
  AND price < 100
  AND stock > 0;

-- NOT: Negates a condition
SELECT * FROM products
WHERE NOT (status = 'discontinued' OR stock = 0);
```

---

## Aggregation Functions

Aggregate functions perform calculations across multiple rows and return a single result.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center; font-size: 16px;">AGGREGATE FUNCTIONS</h4>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #3b82f6;">
<code style="color: #1e40af; font-weight: bold;">COUNT(*)</code>
<div style="color: #475569; font-size: 13px; margin-top: 8px;">Counts all rows including NULLs</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #10b981;">
<code style="color: #047857; font-weight: bold;">COUNT(column)</code>
<div style="color: #475569; font-size: 13px; margin-top: 8px;">Counts non-NULL values in column</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #8b5cf6;">
<code style="color: #6d28d9; font-weight: bold;">SUM(column)</code>
<div style="color: #475569; font-size: 13px; margin-top: 8px;">Adds up all numeric values</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #f59e0b;">
<code style="color: #b45309; font-weight: bold;">AVG(column)</code>
<div style="color: #475569; font-size: 13px; margin-top: 8px;">Calculates arithmetic mean</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #ec4899;">
<code style="color: #be185d; font-weight: bold;">MIN(column)</code>
<div style="color: #475569; font-size: 13px; margin-top: 8px;">Finds smallest value</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #06b6d4;">
<code style="color: #0891b2; font-weight: bold;">MAX(column)</code>
<div style="color: #475569; font-size: 13px; margin-top: 8px;">Finds largest value</div>
</div>
</div>
</div>

```sql
-- Basic aggregations
SELECT
    COUNT(*) AS total_products,
    COUNT(DISTINCT category) AS unique_categories,
    SUM(stock) AS total_inventory,
    AVG(price) AS average_price,
    MIN(price) AS cheapest_product,
    MAX(price) AS most_expensive
FROM products
WHERE status = 'active';

-- Conditional aggregation
SELECT
    COUNT(*) AS total_orders,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) AS completed_orders,
    COUNT(CASE WHEN status = 'pending' THEN 1 END) AS pending_orders,
    SUM(CASE WHEN status = 'completed' THEN total_amount ELSE 0 END) AS completed_revenue
FROM orders;
```

---

## GROUP BY and HAVING

GROUP BY organizes rows into groups for aggregate calculations. HAVING filters groups after aggregation.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center; font-size: 16px;">WHERE vs HAVING</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; font-size: 16px; margin-bottom: 12px;">WHERE</div>
<div style="color: #475569; font-size: 14px; margin-bottom: 16px;">Filters individual rows BEFORE grouping</div>
<div style="background: #f1f5f9; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 12px; color: #1e293b;">
SELECT category, COUNT(*)<br/>
FROM products<br/>
<span style="color: #3b82f6; font-weight: bold;">WHERE price > 50</span><br/>
GROUP BY category;
</div>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #f59e0b;">
<div style="color: #b45309; font-weight: bold; font-size: 16px; margin-bottom: 12px;">HAVING</div>
<div style="color: #475569; font-size: 14px; margin-bottom: 16px;">Filters groups AFTER aggregation</div>
<div style="background: #f1f5f9; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 12px; color: #1e293b;">
SELECT category, COUNT(*)<br/>
FROM products<br/>
GROUP BY category<br/>
<span style="color: #f59e0b; font-weight: bold;">HAVING COUNT(*) >= 2</span>;
</div>
</div>
</div>
</div>

```sql
-- Group by single column
SELECT
    country,
    COUNT(*) AS customer_count
FROM customers
GROUP BY country
ORDER BY customer_count DESC;

-- Group by multiple columns
SELECT
    category,
    status,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price
FROM products
GROUP BY category, status;

-- Using HAVING to filter groups
SELECT
    customer_id,
    COUNT(*) AS order_count,
    SUM(total_amount) AS total_spent
FROM orders
WHERE status = 'completed'
GROUP BY customer_id
HAVING SUM(total_amount) > 100
ORDER BY total_spent DESC;
```

---

## Sorting and Limiting Results

### ORDER BY

```sql
-- Sort ascending (default)
SELECT * FROM products ORDER BY price;

-- Sort descending
SELECT * FROM products ORDER BY price DESC;

-- Multiple sort columns
SELECT * FROM products
ORDER BY category ASC, price DESC;

-- Sort by expression
SELECT
    name,
    stock * price AS inventory_value
FROM products
ORDER BY stock * price DESC;

-- Sort by column position (not recommended)
SELECT name, price FROM products ORDER BY 2 DESC;

-- NULL handling in sorts
SELECT * FROM customers
ORDER BY email NULLS LAST;  -- PostgreSQL specific
```

### LIMIT and OFFSET

```sql
-- Get first 10 rows
SELECT * FROM products
ORDER BY created_at DESC
LIMIT 10;

-- Pagination: Skip first 20, get next 10
SELECT * FROM products
ORDER BY id
LIMIT 10 OFFSET 20;

-- PostgreSQL alternative syntax
SELECT * FROM products
ORDER BY id
OFFSET 20 ROWS
FETCH NEXT 10 ROWS ONLY;
```

---

## Query Patterns

### Finding Duplicates

```sql
-- Find duplicate email addresses
SELECT email, COUNT(*) AS count
FROM customers
WHERE email IS NOT NULL
GROUP BY email
HAVING COUNT(*) > 1;

-- Find and display all duplicate records
SELECT c1.*
FROM customers c1
WHERE email IN (
    SELECT email
    FROM customers
    GROUP BY email
    HAVING COUNT(*) > 1
);
```

### Top-N Queries

```sql
-- Top 5 most expensive products
SELECT name, price
FROM products
ORDER BY price DESC
LIMIT 5;

-- Top 3 customers by total spending
SELECT
    c.name,
    SUM(o.total_amount) AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.status = 'completed'
GROUP BY c.id, c.name
ORDER BY total_spent DESC
LIMIT 3;
```

### Date and Time Queries

```sql
-- Orders from the last 30 days
SELECT * FROM orders
WHERE created_at >= NOW() - INTERVAL '30 days';

-- Group by month
SELECT
    DATE_TRUNC('month', created_at) AS month,
    COUNT(*) AS order_count,
    SUM(total_amount) AS monthly_revenue
FROM orders
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month;

-- Extract parts of dates
SELECT
    EXTRACT(YEAR FROM created_at) AS year,
    EXTRACT(MONTH FROM created_at) AS month,
    COUNT(*) AS orders
FROM orders
GROUP BY EXTRACT(YEAR FROM created_at), EXTRACT(MONTH FROM created_at);
```

---

## Performance Tips

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0;">Performance Best Practices</h4>
<div style="display: grid; gap: 16px;">
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #10b981;">
<div style="color: #047857; font-weight: bold; margin-bottom: 8px;">1. Avoid SELECT *</div>
<div style="color: #475569; font-size: 14px;">Specify only the columns you need. This reduces I/O, memory usage, and network transfer.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 8px;">2. Index Your WHERE Columns</div>
<div style="color: #475569; font-size: 14px;">Create indexes on columns frequently used in WHERE, ORDER BY, and GROUP BY clauses.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #f59e0b;">
<div style="color: #b45309; font-weight: bold; margin-bottom: 8px;">3. Avoid Functions on Indexed Columns</div>
<div style="color: #475569; font-size: 14px;">WHERE YEAR(created_at) = 2024 cannot use an index. Use: WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #ec4899;">
<div style="color: #be185d; font-weight: bold; margin-bottom: 8px;">4. Use LIMIT for Large Results</div>
<div style="color: #475569; font-size: 14px;">Always paginate large result sets. For better performance, use keyset pagination over OFFSET.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #8b5cf6;">
<div style="color: #6d28d9; font-weight: bold; margin-bottom: 8px;">5. Use EXPLAIN ANALYZE</div>
<div style="color: #475569; font-size: 14px;">Always analyze your query execution plans to understand how the database processes your queries.</div>
</div>
</div>
</div>

```sql
-- Use EXPLAIN ANALYZE to understand query performance
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE customer_id = 1
ORDER BY created_at DESC;

-- Index-friendly query patterns
SELECT * FROM orders
WHERE created_at >= '2024-01-01' AND created_at < '2024-02-01';  -- Good

-- vs index-unfriendly patterns
SELECT * FROM orders
WHERE EXTRACT(MONTH FROM created_at) = 1;  -- Bad: function prevents index use
```

---

## Interview Questions

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="margin-bottom: 24px;">
<div style="background: #dcfce7; color: #166534; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px;">Easy</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; line-height: 2;">
<li><strong>What is the difference between WHERE and HAVING?</strong><br/>
<span style="color: #475569;">WHERE filters rows before grouping; HAVING filters groups after aggregation.</span></li>
<li><strong>How do you find NULL values?</strong><br/>
<span style="color: #475569;">Use IS NULL or IS NOT NULL. You cannot use = NULL.</span></li>
<li><strong>What does COUNT(*) vs COUNT(column) return?</strong><br/>
<span style="color: #475569;">COUNT(*) counts all rows; COUNT(column) counts non-NULL values.</span></li>
</ul>
</div>

<div style="margin-bottom: 24px;">
<div style="background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px;">Medium</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; line-height: 2;">
<li><strong>Why can not you use a column alias in WHERE?</strong><br/>
<span style="color: #475569;">Because WHERE executes before SELECT in the logical query order.</span></li>
<li><strong>How do you find duplicate records?</strong><br/>
<span style="color: #475569;">Use GROUP BY with HAVING COUNT(*) > 1.</span></li>
<li><strong>What is the difference between UNION and UNION ALL?</strong><br/>
<span style="color: #475569;">UNION removes duplicates (slower); UNION ALL keeps all rows (faster).</span></li>
</ul>
</div>

<div>
<div style="background: #fee2e2; color: #991b1b; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px;">Hard</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; line-height: 2;">
<li><strong>How do you find the second highest salary?</strong><br/>
<span style="color: #475569;">Use DISTINCT with LIMIT/OFFSET: <code>SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1</code>. Alternatively, use a subquery: <code>SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees)</code>.</span></li>
<li><strong>What happens with NOT IN when the subquery contains NULL?</strong><br/>
<span style="color: #475569;">It returns no results. Use NOT EXISTS instead for safety.</span></li>
<li><strong>How would you optimize a slow GROUP BY query?</strong><br/>
<span style="color: #475569;">Add indexes on GROUP BY columns. Filter rows with WHERE before grouping. Avoid SELECT * and only select needed columns. Consider using HAVING only when filtering on aggregates is required. Analyze the query plan with EXPLAIN ANALYZE.</span></li>
</ul>
</div>
</div>

---

## Practice Problems

### Problem 1: Customer Summary Report

```sql
-- Create a report showing each country with:
-- - Number of customers
-- - Number of customers with email
-- - Number of customers without email

SELECT
    country,
    COUNT(*) AS total_customers,
    COUNT(email) AS with_email,
    COUNT(*) - COUNT(email) AS without_email
FROM customers
GROUP BY country
ORDER BY total_customers DESC;
```

### Problem 2: Product Price Tiers

```sql
-- Categorize products into price tiers and show statistics

SELECT
    CASE
        WHEN price < 50 THEN 'Budget'
        WHEN price < 200 THEN 'Standard'
        WHEN price < 1000 THEN 'Premium'
        ELSE 'Luxury'
    END AS price_tier,
    COUNT(*) AS product_count,
    MIN(price) AS min_price,
    MAX(price) AS max_price,
    ROUND(AVG(price), 2) AS avg_price,
    SUM(stock) AS total_stock
FROM products
WHERE status = 'active'
GROUP BY
    CASE
        WHEN price < 50 THEN 'Budget'
        WHEN price < 200 THEN 'Standard'
        WHEN price < 1000 THEN 'Premium'
        ELSE 'Luxury'
    END
ORDER BY avg_price;
```

### Problem 3: Second Highest Value

```sql
-- Find the second highest price
-- Method 1: Using OFFSET
SELECT DISTINCT price
FROM products
ORDER BY price DESC
LIMIT 1 OFFSET 1;

-- Method 2: Using subquery
SELECT MAX(price) AS second_highest
FROM products
WHERE price < (SELECT MAX(price) FROM products);
```

### Problem 4: Percentage of Total

```sql
-- Show each category's percentage of total revenue potential

SELECT
    category,
    SUM(price * stock) AS category_value,
    ROUND(
        100.0 * SUM(price * stock) /
        (SELECT SUM(price * stock) FROM products WHERE status = 'active'),
        2
    ) AS percentage
FROM products
WHERE status = 'active'
GROUP BY category
ORDER BY percentage DESC;
```

### Problem 5: Consecutive Analysis

```sql
-- Find customers who placed orders in consecutive months
-- This requires understanding date operations

WITH monthly_orders AS (
    SELECT
        customer_id,
        DATE_TRUNC('month', created_at) AS order_month
    FROM orders
    WHERE customer_id IS NOT NULL
    GROUP BY customer_id, DATE_TRUNC('month', created_at)
)
SELECT DISTINCT m1.customer_id
FROM monthly_orders m1
JOIN monthly_orders m2
    ON m1.customer_id = m2.customer_id
    AND m2.order_month = m1.order_month + INTERVAL '1 month';
```

---

## Quick Reference

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
<h4 style="color: #1e293b; margin: 0 0 12px 0;">Query Structure</h4>
<div style="background: #ffffff; padding: 16px; border-radius: 10px; font-family: monospace; font-size: 13px; color: #1e293b; line-height: 1.8;">
SELECT columns<br/>
FROM table<br/>
WHERE row_conditions<br/>
GROUP BY columns<br/>
HAVING group_conditions<br/>
ORDER BY columns<br/>
LIMIT n OFFSET m;
</div>
</div>
<div>
<h4 style="color: #1e293b; margin: 0 0 12px 0;">Common Operators</h4>
<div style="background: #ffffff; padding: 16px; border-radius: 10px; font-size: 13px; color: #1e293b; line-height: 1.8;">
<code>=, !=, <>, <, >, <=, >=</code><br/>
<code>AND, OR, NOT</code><br/>
<code>IN (list), NOT IN (list)</code><br/>
<code>BETWEEN a AND b</code><br/>
<code>LIKE pattern, ILIKE pattern</code><br/>
<code>IS NULL, IS NOT NULL</code>
</div>
</div>
<div>
<h4 style="color: #1e293b; margin: 0 0 12px 0;">Aggregate Functions</h4>
<div style="background: #ffffff; padding: 16px; border-radius: 10px; font-size: 13px; color: #1e293b; line-height: 1.8;">
<code>COUNT(*), COUNT(col)</code><br/>
<code>COUNT(DISTINCT col)</code><br/>
<code>SUM(col), AVG(col)</code><br/>
<code>MIN(col), MAX(col)</code><br/>
<code>STRING_AGG(col, delimiter)</code>
</div>
</div>
<div>
<h4 style="color: #1e293b; margin: 0 0 12px 0;">NULL Functions</h4>
<div style="background: #ffffff; padding: 16px; border-radius: 10px; font-size: 13px; color: #1e293b; line-height: 1.8;">
<code>COALESCE(a, b, c)</code> - First non-null<br/>
<code>NULLIF(a, b)</code> - NULL if a = b<br/>
<code>IS NULL</code> - Check for NULL<br/>
<code>IS NOT NULL</code> - Check for non-NULL
</div>
</div>
</div>
</div>

---

## Related Topics

- [Joins Mastery](/topic/sql-learning/joins-mastery) - Combine data from multiple tables
- [Subqueries and CTEs](/topic/sql-learning/subqueries-ctes) - Write modular, complex queries
- [Window Functions](/topic/sql-learning/window-functions) - Advanced analytics without grouping
- [Database Indexing](/topic/sql-learning/indexing-deep-dive) - Optimize query performance
- [Query Optimization](/topic/sql-learning/query-optimization) - Make your queries faster
