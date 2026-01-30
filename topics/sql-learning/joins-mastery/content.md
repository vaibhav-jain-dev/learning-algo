# SQL Joins Mastery

## Overview

Joins are the cornerstone of relational database queries, allowing you to combine data from multiple tables based on related columns. Understanding joins is essential for working with normalized databases where data is distributed across tables to eliminate redundancy and maintain data integrity.

This comprehensive guide covers all types of SQL joins, from basic INNER JOINs to complex self-joins and multi-table queries. You will learn not just the syntax, but the mental models needed to choose the right join for every situation, along with performance considerations that separate novice from expert SQL developers.

---

## Why It Matters

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border-left: 4px solid #3b82f6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
<div style="color: #1e40af; font-weight: bold; font-size: 16px; margin-bottom: 12px;">Real-World Applications</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; font-size: 14px; line-height: 1.8;">
<li>Combining customer data with their orders</li>
<li>Building comprehensive reports from multiple tables</li>
<li>Finding missing or orphaned records</li>
<li>Creating data warehousing transformations</li>
<li>Building complex analytics dashboards</li>
</ul>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border-left: 4px solid #10b981; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
<div style="color: #047857; font-weight: bold; font-size: 16px; margin-bottom: 12px;">Interview Significance</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; font-size: 14px; line-height: 1.8;">
<li>Most common SQL interview topic</li>
<li>Tests understanding of relational concepts</li>
<li>Differentiates candidates by depth of knowledge</li>
<li>Often combined with aggregation questions</li>
<li>Performance optimization frequently discussed</li>
</ul>
</div>
</div>
</div>

Joins transform isolated tables into meaningful business insights. Without them, relational databases would be nothing more than collections of disconnected spreadsheets. Mastering joins is the gateway to becoming proficient in SQL.

---

## Visual Guide to Joins

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 28px 0; font-size: 18px; text-align: center;">SQL JOIN TYPES VISUALIZED</h4>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
<div style="background: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0;">
<div style="color: #10b981; font-weight: bold; font-size: 15px; margin-bottom: 16px; text-align: center;">INNER JOIN</div>
<div style="display: flex; align-items: center; justify-content: center; position: relative; height: 80px;">
<div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(59,130,246,0.2); border: 3px solid #3b82f6; position: absolute; left: calc(50% - 50px);"></div>
<div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(16,185,129,0.2); border: 3px solid #10b981; position: absolute; left: calc(50% - 20px);"></div>
<div style="width: 30px; height: 50px; background: #475569; border-radius: 8px; position: absolute; left: calc(50% - 15px); opacity: 0.6;"></div>
</div>
<div style="text-align: center; margin-top: 16px; font-size: 13px; color: #475569;">Returns only matching rows from both tables</div>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0;">
<div style="color: #3b82f6; font-weight: bold; font-size: 15px; margin-bottom: 16px; text-align: center;">LEFT JOIN</div>
<div style="display: flex; align-items: center; justify-content: center; position: relative; height: 80px;">
<div style="width: 70px; height: 70px; border-radius: 50%; background: #3b82f6; border: 3px solid #3b82f6; position: absolute; left: calc(50% - 50px);"></div>
<div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(16,185,129,0.2); border: 3px solid #10b981; position: absolute; left: calc(50% - 20px);"></div>
</div>
<div style="text-align: center; margin-top: 16px; font-size: 13px; color: #475569;">All from left table + matching from right</div>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0;">
<div style="color: #f59e0b; font-weight: bold; font-size: 15px; margin-bottom: 16px; text-align: center;">RIGHT JOIN</div>
<div style="display: flex; align-items: center; justify-content: center; position: relative; height: 80px;">
<div style="width: 70px; height: 70px; border-radius: 50%; background: rgba(59,130,246,0.2); border: 3px solid #3b82f6; position: absolute; left: calc(50% - 50px);"></div>
<div style="width: 70px; height: 70px; border-radius: 50%; background: #10b981; border: 3px solid #10b981; position: absolute; left: calc(50% - 20px);"></div>
</div>
<div style="text-align: center; margin-top: 16px; font-size: 13px; color: #475569;">Matching from left + all from right table</div>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0;">
<div style="color: #8b5cf6; font-weight: bold; font-size: 15px; margin-bottom: 16px; text-align: center;">FULL OUTER JOIN</div>
<div style="display: flex; align-items: center; justify-content: center; position: relative; height: 80px;">
<div style="width: 70px; height: 70px; border-radius: 50%; background: #3b82f6; border: 3px solid #3b82f6; position: absolute; left: calc(50% - 50px);"></div>
<div style="width: 70px; height: 70px; border-radius: 50%; background: #10b981; border: 3px solid #10b981; position: absolute; left: calc(50% - 20px);"></div>
</div>
<div style="text-align: center; margin-top: 16px; font-size: 13px; color: #475569;">All rows from both tables combined</div>
</div>
</div>
</div>

---

## Sample Data

For all examples, we will use the following tables representing an e-commerce system:

```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    city VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10,2)
);

-- Order items table (junction table)
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER,
    unit_price DECIMAL(10,2)
);

-- Sample data
INSERT INTO users (id, name, email, city) VALUES
    (1, 'Alice', 'alice@example.com', 'New York'),
    (2, 'Bob', 'bob@example.com', 'Los Angeles'),
    (3, 'Charlie', 'charlie@example.com', 'New York'),
    (4, 'Diana', 'diana@example.com', 'Chicago');

INSERT INTO orders (id, user_id, total_amount, status, created_at) VALUES
    (101, 1, 299.99, 'completed', '2024-01-15'),
    (102, 1, 149.50, 'completed', '2024-02-20'),
    (103, 2, 89.99, 'pending', '2024-03-10'),
    (104, NULL, 50.00, 'cancelled', '2024-03-22');

INSERT INTO products (id, name, category, price) VALUES
    (1, 'Laptop', 'Electronics', 999.99),
    (2, 'Mouse', 'Electronics', 29.99),
    (3, 'Desk', 'Furniture', 299.99),
    (4, 'Chair', 'Furniture', 199.99);
```

---

## INNER JOIN

INNER JOIN returns only rows where there is a match in both tables. This is the most common type of join.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin: 0 0 16px 0;">INNER JOIN Behavior</h4>
<div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center;">
<div style="background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
<div style="color: #3b82f6; font-weight: bold; margin-bottom: 8px;">Users Table</div>
<div style="font-size: 12px; color: #475569;">Alice (id: 1)<br/>Bob (id: 2)<br/>Charlie (id: 3)<br/>Diana (id: 4)</div>
</div>
<div style="color: #10b981; font-weight: bold; font-size: 24px;">+</div>
<div style="background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
<div style="color: #10b981; font-weight: bold; margin-bottom: 8px;">Orders Table</div>
<div style="font-size: 12px; color: #475569;">Order 101 (user_id: 1)<br/>Order 102 (user_id: 1)<br/>Order 103 (user_id: 2)<br/>Order 104 (user_id: NULL)</div>
</div>
</div>
<div style="text-align: center; margin-top: 16px; padding: 12px; background: #dcfce7; border-radius: 8px; color: #166534; font-size: 14px;">
Result: 3 rows (Alice with 2 orders, Bob with 1 order). Charlie, Diana, and Order 104 excluded.
</div>
</div>

```sql
-- Basic INNER JOIN
SELECT
    users.name,
    users.email,
    orders.id AS order_id,
    orders.total_amount,
    orders.status
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- Result:
-- | name  | email             | order_id | total_amount | status    |
-- |-------|-------------------|----------|--------------|-----------|
-- | Alice | alice@example.com | 101      | 299.99       | completed |
-- | Alice | alice@example.com | 102      | 149.50       | completed |
-- | Bob   | bob@example.com   | 103      | 89.99        | pending   |

-- Using table aliases (preferred for readability)
SELECT
    u.name,
    u.email,
    o.id AS order_id,
    o.total_amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed';
```

### When to Use INNER JOIN

- When you only want records that exist in both tables
- When NULL foreign keys should be excluded from results
- For creating reports where incomplete data is not useful

---

## LEFT JOIN (LEFT OUTER JOIN)

LEFT JOIN returns all rows from the left table and matching rows from the right table. Non-matching rows get NULL for right table columns.

```sql
-- LEFT JOIN shows all users, even those without orders
SELECT
    u.name,
    u.email,
    o.id AS order_id,
    o.total_amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- Result:
-- | name    | email               | order_id | total_amount |
-- |---------|---------------------|----------|--------------|
-- | Alice   | alice@example.com   | 101      | 299.99       |
-- | Alice   | alice@example.com   | 102      | 149.50       |
-- | Bob     | bob@example.com     | 103      | 89.99        |
-- | Charlie | charlie@example.com | NULL     | NULL         |
-- | Diana   | diana@example.com   | NULL     | NULL         |
```

### Finding Non-Matching Records (Anti-Join Pattern)

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%); border: 2px solid #fcd34d; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="color: #92400e; font-weight: bold; font-size: 14px; margin-bottom: 8px;">Anti-Join: Finding Missing Records</div>
<div style="color: #78350f; font-size: 14px;">LEFT JOIN + WHERE NULL is a powerful pattern to find records in one table that have no corresponding records in another.</div>
</div>

```sql
-- Find users who have NEVER placed an order
SELECT
    u.id,
    u.name,
    u.email
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;

-- Result:
-- | id | name    | email               |
-- |----|---------|---------------------|
-- | 3  | Charlie | charlie@example.com |
-- | 4  | Diana   | diana@example.com   |

-- Find products that have never been ordered
SELECT p.id, p.name
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.id IS NULL;
```

---

## RIGHT JOIN (RIGHT OUTER JOIN)

RIGHT JOIN returns all rows from the right table and matching rows from the left table. It is essentially the mirror of LEFT JOIN.

```sql
-- RIGHT JOIN shows all orders, even those without users
SELECT
    u.name,
    o.id AS order_id,
    o.total_amount,
    o.status
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- Result:
-- | name  | order_id | total_amount | status    |
-- |-------|----------|--------------|-----------|
-- | Alice | 101      | 299.99       | completed |
-- | Alice | 102      | 149.50       | completed |
-- | Bob   | 103      | 89.99        | pending   |
-- | NULL  | 104      | 50.00        | cancelled |
```

<div style="background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%); border: 2px solid #93c5fd; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="color: #1e40af; font-weight: bold; font-size: 14px; margin-bottom: 8px;">Pro Tip: RIGHT JOIN Equivalence</div>
<div style="color: #1e3a8a; font-size: 14px;">RIGHT JOIN is rarely used in practice. You can always rewrite it as LEFT JOIN by swapping the table order. Most developers prefer LEFT JOIN for consistency and readability.</div>
</div>

```sql
-- These two queries produce identical results:

-- Using RIGHT JOIN
SELECT u.name, o.total_amount
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- Equivalent LEFT JOIN (preferred)
SELECT u.name, o.total_amount
FROM orders o
LEFT JOIN users u ON u.id = o.user_id;
```

---

## FULL OUTER JOIN

FULL OUTER JOIN returns all rows from both tables. Rows without a match get NULL for columns from the other table.

```sql
-- FULL OUTER JOIN shows all users and all orders
SELECT
    u.name,
    o.id AS order_id,
    o.total_amount
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;

-- Result:
-- | name    | order_id | total_amount |
-- |---------|----------|--------------|
-- | Alice   | 101      | 299.99       |
-- | Alice   | 102      | 149.50       |
-- | Bob     | 103      | 89.99        |
-- | Charlie | NULL     | NULL         |
-- | Diana   | NULL     | NULL         |
-- | NULL    | 104      | 50.00        |

-- Find ALL unmatched records from both tables
SELECT
    u.name,
    o.id AS order_id
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id
WHERE u.id IS NULL OR o.user_id IS NULL;
```

---

## CROSS JOIN

CROSS JOIN produces the Cartesian product - every possible combination of rows from both tables.

<div style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border: 2px solid #f87171; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="color: #991b1b; font-weight: bold; font-size: 14px; margin-bottom: 8px;">Warning: Cartesian Products</div>
<div style="color: #7f1d1d; font-size: 14px;">CROSS JOIN multiplies the row counts. Joining tables with 1,000 and 1,000 rows produces 1,000,000 result rows! Use with extreme caution.</div>
</div>

```sql
-- Create all combinations of sizes and colors
CREATE TABLE sizes (name VARCHAR(20));
CREATE TABLE colors (name VARCHAR(20));

INSERT INTO sizes VALUES ('Small'), ('Medium'), ('Large');
INSERT INTO colors VALUES ('Red'), ('Blue'), ('Green');

SELECT
    s.name AS size,
    c.name AS color
FROM sizes s
CROSS JOIN colors c;

-- Result: 9 rows (3 sizes x 3 colors)
-- | size   | color |
-- |--------|-------|
-- | Small  | Red   |
-- | Small  | Blue  |
-- | Small  | Green |
-- | Medium | Red   |
-- | Medium | Blue  |
-- | Medium | Green |
-- | Large  | Red   |
-- | Large  | Blue  |
-- | Large  | Green |

-- Practical use: Generate a date calendar
SELECT
    generate_series('2024-01-01'::date, '2024-12-31'::date, '1 day') AS date
CROSS JOIN (SELECT DISTINCT category FROM products) categories;
```

---

## SELF JOIN

A self join joins a table with itself. This is useful for hierarchical data or comparing rows within the same table.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">Self Join Use Cases</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 8px;">Organizational Hierarchies</div>
<div style="color: #475569; font-size: 14px;">Connect employees to their managers in the same table</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #10b981;">
<div style="color: #047857; font-weight: bold; margin-bottom: 8px;">Comparing Rows</div>
<div style="color: #475569; font-size: 14px;">Find users from the same city or products in the same price range</div>
</div>
</div>
</div>

```sql
-- Employees and their managers (hierarchical data)
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    manager_id INTEGER REFERENCES employees(id)
);

INSERT INTO employees (id, name, manager_id) VALUES
    (1, 'CEO', NULL),
    (2, 'CTO', 1),
    (3, 'CFO', 1),
    (4, 'Dev Lead', 2),
    (5, 'Developer', 4);

-- Find employees with their manager names
SELECT
    e.name AS employee,
    m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- Result:
-- | employee  | manager  |
-- |-----------|----------|
-- | CEO       | NULL     |
-- | CTO       | CEO      |
-- | CFO       | CEO      |
-- | Dev Lead  | CTO      |
-- | Developer | Dev Lead |

-- Find pairs of users from the same city
SELECT
    u1.name AS user1,
    u2.name AS user2,
    u1.city
FROM users u1
JOIN users u2 ON u1.city = u2.city AND u1.id < u2.id;

-- Note: u1.id < u2.id prevents duplicate pairs and self-matching
```

---

## Multiple Table Joins

Real-world queries often join three or more tables together.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">Join Chain Visualization</h4>
<div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #3b82f6; padding: 12px 20px; border-radius: 8px; color: #fff; font-weight: bold; font-size: 14px;">users</div>
<span style="color: #10b981; font-weight: bold; font-size: 18px;">---JOIN---</span>
<div style="background: #10b981; padding: 12px 20px; border-radius: 8px; color: #fff; font-weight: bold; font-size: 14px;">orders</div>
<span style="color: #f59e0b; font-weight: bold; font-size: 18px;">---JOIN---</span>
<div style="background: #f59e0b; padding: 12px 20px; border-radius: 8px; color: #fff; font-weight: bold; font-size: 14px;">order_items</div>
<span style="color: #8b5cf6; font-weight: bold; font-size: 18px;">---JOIN---</span>
<div style="background: #8b5cf6; padding: 12px 20px; border-radius: 8px; color: #fff; font-weight: bold; font-size: 14px;">products</div>
</div>
</div>

```sql
-- Complete order details with user, items, and product info
SELECT
    u.name AS customer,
    o.id AS order_id,
    o.created_at AS order_date,
    p.name AS product,
    oi.quantity,
    oi.unit_price,
    (oi.quantity * oi.unit_price) AS line_total
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.status = 'completed'
ORDER BY o.created_at DESC, u.name;

-- Sales report by category with user info
SELECT
    p.category,
    COUNT(DISTINCT u.id) AS unique_customers,
    COUNT(DISTINCT o.id) AS total_orders,
    SUM(oi.quantity) AS units_sold,
    SUM(oi.quantity * oi.unit_price) AS total_revenue
FROM products p
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
JOIN users u ON o.user_id = u.id
WHERE o.status = 'completed'
GROUP BY p.category
ORDER BY total_revenue DESC;
```

---

## Join Conditions: ON vs WHERE

Understanding when to put conditions in ON vs WHERE is crucial, especially with outer joins.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">ON vs WHERE with LEFT JOIN</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; font-size: 15px; margin-bottom: 12px;">Condition in ON</div>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">Filters right table BEFORE joining. Left table rows still appear with NULL.</div>
<div style="background: #f1f5f9; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 11px; color: #1e293b;">
SELECT u.name, o.total<br/>
FROM users u<br/>
LEFT JOIN orders o<br/>
  <span style="color: #3b82f6;">ON u.id = o.user_id</span><br/>
  <span style="color: #3b82f6;">AND o.total > 100</span>;
</div>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #f59e0b;">
<div style="color: #b45309; font-weight: bold; font-size: 15px; margin-bottom: 12px;">Condition in WHERE</div>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">Filters final result AFTER joining. Removes rows that do not match.</div>
<div style="background: #f1f5f9; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 11px; color: #1e293b;">
SELECT u.name, o.total<br/>
FROM users u<br/>
LEFT JOIN orders o<br/>
  ON u.id = o.user_id<br/>
<span style="color: #f59e0b;">WHERE o.total > 100</span>;
</div>
</div>
</div>
</div>

```sql
-- Condition in ON: Shows ALL users, but only orders > 100
SELECT u.name, o.id AS order_id, o.total_amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.total_amount > 100;

-- Result includes users without qualifying orders (NULL values)
-- | name    | order_id | total_amount |
-- |---------|----------|--------------|
-- | Alice   | 101      | 299.99       |
-- | Alice   | 102      | 149.50       |
-- | Bob     | NULL     | NULL         |  -- Bob's order was < 100
-- | Charlie | NULL     | NULL         |
-- | Diana   | NULL     | NULL         |

-- Condition in WHERE: Excludes users without orders > 100
SELECT u.name, o.id AS order_id, o.total_amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.total_amount > 100;

-- Result excludes non-matching users
-- | name  | order_id | total_amount |
-- |-------|----------|--------------|
-- | Alice | 101      | 299.99       |
-- | Alice | 102      | 149.50       |
```

---

## Query Patterns

### Find Orphaned Records

```sql
-- Orders that reference non-existent users (data integrity check)
SELECT o.*
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
WHERE o.user_id IS NOT NULL AND u.id IS NULL;

-- Products never ordered
SELECT p.id, p.name, p.category
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.id IS NULL;
```

### Aggregate with Joins

```sql
-- Total spent per customer (including those with $0)
SELECT
    u.id,
    u.name,
    COUNT(o.id) AS order_count,
    COALESCE(SUM(o.total_amount), 0) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'completed'
GROUP BY u.id, u.name
ORDER BY total_spent DESC;

-- Category performance with product details
SELECT
    p.category,
    COUNT(DISTINCT p.id) AS products,
    COUNT(oi.id) AS times_ordered,
    COALESCE(SUM(oi.quantity * oi.unit_price), 0) AS revenue
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status = 'completed'
GROUP BY p.category;
```

### Latest Record per Group

```sql
-- Latest order for each user using subquery
SELECT u.name, o.*
FROM users u
JOIN orders o ON o.id = (
    SELECT o2.id
    FROM orders o2
    WHERE o2.user_id = u.id
    ORDER BY o2.created_at DESC
    LIMIT 1
);

-- Alternative using ROW_NUMBER (often more efficient)
WITH ranked_orders AS (
    SELECT
        o.*,
        ROW_NUMBER() OVER (
            PARTITION BY user_id
            ORDER BY created_at DESC
        ) AS rn
    FROM orders o
)
SELECT u.name, ro.*
FROM users u
JOIN ranked_orders ro ON u.id = ro.user_id AND ro.rn = 1;
```

---

## Performance Tips

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0;">Join Performance Optimization</h4>
<div style="display: grid; gap: 16px;">
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #10b981;">
<div style="color: #047857; font-weight: bold; margin-bottom: 8px;">1. Always Index Join Columns</div>
<div style="color: #475569; font-size: 14px;">Foreign keys should always have indexes. This is the most important join optimization.</div>
<code style="background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 12px; display: inline-block; margin-top: 8px;">CREATE INDEX idx_orders_user_id ON orders(user_id);</code>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 8px;">2. Filter Early, Join Later</div>
<div style="color: #475569; font-size: 14px;">Use subqueries or CTEs to filter data before joining to reduce the number of rows processed.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #f59e0b;">
<div style="color: #b45309; font-weight: bold; margin-bottom: 8px;">3. Select Only Needed Columns</div>
<div style="color: #475569; font-size: 14px;">Avoid SELECT * in production. Specify exact columns to reduce memory and I/O.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #8b5cf6;">
<div style="color: #6d28d9; font-weight: bold; margin-bottom: 8px;">4. Use EXPLAIN ANALYZE</div>
<div style="color: #475569; font-size: 14px;">Always verify your join strategy with execution plans. Look for Nested Loop vs Hash Join vs Merge Join.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #ec4899;">
<div style="color: #be185d; font-weight: bold; margin-bottom: 8px;">5. Avoid Joining on Functions</div>
<div style="color: #475569; font-size: 14px;">Joining on LOWER(email) or DATE(created_at) prevents index usage. Pre-compute or use expression indexes.</div>
</div>
</div>
</div>

```sql
-- Filter before joining (more efficient)
SELECT u.name, filtered_orders.total_amount
FROM users u
JOIN (
    SELECT user_id, total_amount
    FROM orders
    WHERE status = 'completed'
      AND created_at > '2024-01-01'
) filtered_orders ON u.id = filtered_orders.user_id;

-- Check execution plan
EXPLAIN ANALYZE
SELECT u.name, o.total_amount
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed';
```

---

## Interview Questions

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="margin-bottom: 24px;">
<div style="background: #dcfce7; color: #166534; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px;">Easy</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; line-height: 2;">
<li><strong>What is the difference between INNER JOIN and LEFT JOIN?</strong><br/>
<span style="color: #475569;">INNER JOIN returns only matching rows; LEFT JOIN returns all left table rows plus matches.</span></li>
<li><strong>Can you draw a Venn diagram for each join type?</strong><br/>
<span style="color: #475569;">Be prepared to visualize INNER, LEFT, RIGHT, and FULL OUTER joins.</span></li>
<li><strong>What happens to NULL values in join conditions?</strong><br/>
<span style="color: #475569;">NULL never equals anything, so NULL foreign keys will not match.</span></li>
</ul>
</div>

<div style="margin-bottom: 24px;">
<div style="background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px;">Medium</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; line-height: 2;">
<li><strong>How do you find records with no match using LEFT JOIN?</strong><br/>
<span style="color: #475569;">LEFT JOIN + WHERE right_table.pk IS NULL</span></li>
<li><strong>When would you put a condition in ON vs WHERE with LEFT JOIN?</strong><br/>
<span style="color: #475569;">ON filters before join (preserves left rows); WHERE filters after (removes rows).</span></li>
<li><strong>What is a self join and when would you use it?</strong><br/>
<span style="color: #475569;">Joining a table to itself, used for hierarchies or comparing rows.</span></li>
</ul>
</div>

<div>
<div style="background: #fee2e2; color: #991b1b; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px;">Hard</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; line-height: 2;">
<li><strong>How do you get the latest record per group using joins?</strong><br/>
<span style="color: #475569;">Use a self-join with a subquery: <code>SELECT t1.* FROM table t1 JOIN (SELECT group_col, MAX(date_col) AS max_date FROM table GROUP BY group_col) t2 ON t1.group_col = t2.group_col AND t1.date_col = t2.max_date</code>. Alternatively, use ROW_NUMBER() window function with a CTE.</span></li>
<li><strong>Explain Hash Join vs Nested Loop Join vs Merge Join.</strong><br/>
<span style="color: #475569;">Nested Loop: O(n*m), best for small tables or indexed inner table. Hash Join: O(n+m), builds hash table on smaller table, best for equality joins on medium-large tables. Merge Join: O(n log n + m log m), requires sorted input, efficient for pre-sorted data or range joins.</span></li>
<li><strong>How would you optimize a query joining 5+ tables?</strong><br/>
<span style="color: #475569;">Ensure all join columns are indexed. Filter rows early with WHERE before joins. Check statistics are up to date (run ANALYZE). Consider join order - start with most selective filters. Use EXPLAIN ANALYZE to identify slow join operations. Consider denormalization or materialized views for frequently run queries.</span></li>
</ul>
</div>
</div>

---

## Practice Problems

### Problem 1: Customer Order Summary

```sql
-- For each user, show: name, total orders, total spent, average order value
-- Include users with no orders (show 0s)

SELECT
    u.name,
    COUNT(o.id) AS total_orders,
    COALESCE(SUM(o.total_amount), 0) AS total_spent,
    COALESCE(ROUND(AVG(o.total_amount), 2), 0) AS avg_order_value
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'completed'
GROUP BY u.id, u.name
ORDER BY total_spent DESC;
```

### Problem 2: Products Never Ordered

```sql
-- Find all products that have never been ordered

SELECT p.id, p.name, p.category, p.price
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.id IS NULL
ORDER BY p.category, p.name;
```

### Problem 3: Users From Same City

```sql
-- Find all pairs of users who live in the same city
-- Avoid duplicates (Alice-Bob should not appear as Bob-Alice too)

SELECT
    u1.name AS user1,
    u2.name AS user2,
    u1.city
FROM users u1
JOIN users u2 ON u1.city = u2.city AND u1.id < u2.id
ORDER BY u1.city, u1.name;
```

### Problem 4: Complete Order Details

```sql
-- Show complete order details: customer name, order date,
-- product name, quantity, unit price, line total, order total

SELECT
    u.name AS customer,
    o.id AS order_id,
    o.created_at::date AS order_date,
    p.name AS product,
    oi.quantity,
    oi.unit_price,
    (oi.quantity * oi.unit_price) AS line_total,
    o.total_amount AS order_total
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
ORDER BY o.created_at DESC, u.name, p.name;
```

### Problem 5: Category Performance Report

```sql
-- For each category, show:
-- - Number of products
-- - Number of orders containing products from this category
-- - Total units sold
-- - Total revenue
-- - Average order value for this category

SELECT
    p.category,
    COUNT(DISTINCT p.id) AS num_products,
    COUNT(DISTINCT o.id) AS num_orders,
    COALESCE(SUM(oi.quantity), 0) AS total_units,
    COALESCE(SUM(oi.quantity * oi.unit_price), 0) AS total_revenue,
    COALESCE(
        ROUND(AVG(oi.quantity * oi.unit_price), 2),
        0
    ) AS avg_line_total
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status = 'completed'
GROUP BY p.category
ORDER BY total_revenue DESC;
```

---

## Quick Reference

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
<h4 style="color: #1e293b; margin: 0 0 12px 0;">Join Types</h4>
<div style="background: #ffffff; padding: 16px; border-radius: 10px; font-size: 13px; color: #1e293b; line-height: 1.8;">
<strong>INNER JOIN</strong> - Only matching rows<br/>
<strong>LEFT JOIN</strong> - All left + matching right<br/>
<strong>RIGHT JOIN</strong> - Matching left + all right<br/>
<strong>FULL OUTER</strong> - All rows from both<br/>
<strong>CROSS JOIN</strong> - Cartesian product<br/>
<strong>SELF JOIN</strong> - Table joined to itself
</div>
</div>
<div>
<h4 style="color: #1e293b; margin: 0 0 12px 0;">Common Patterns</h4>
<div style="background: #ffffff; padding: 16px; border-radius: 10px; font-size: 13px; color: #1e293b; line-height: 1.8;">
<strong>Anti-join:</strong> LEFT JOIN + WHERE pk IS NULL<br/>
<strong>Semi-join:</strong> EXISTS with correlated subquery<br/>
<strong>Latest per group:</strong> ROW_NUMBER + join<br/>
<strong>Hierarchy:</strong> Self join with parent_id<br/>
<strong>Filter early:</strong> Subquery then join
</div>
</div>
</div>
</div>

---

## Related Topics

- [SQL Fundamentals](/topic/sql-learning/sql-fundamentals) - SELECT, WHERE, GROUP BY basics
- [Subqueries and CTEs](/topic/sql-learning/subqueries-ctes) - Modular query composition
- [Window Functions](/topic/sql-learning/window-functions) - Analytics without grouping
- [Database Indexing](/topic/sql-learning/indexing-deep-dive) - Optimize join performance
- [Query Optimization](/topic/sql-learning/query-optimization) - Make joins faster
