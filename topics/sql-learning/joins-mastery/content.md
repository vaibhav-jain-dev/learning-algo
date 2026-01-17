# SQL Joins Mastery

## Overview

Joins combine rows from two or more tables based on related columns. Understanding joins is essential for working with relational databases.

**Tags:** SQL, Joins, Relational, Tables

---

## Visual Guide to Joins

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 16px; text-align: center;">SQL JOIN TYPES</h4>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #7ee787; font-weight: bold; font-size: 14px; margin-bottom: 16px;">INNER JOIN</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
<div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(88,166,255,0.3); border: 2px solid #58a6ff; position: relative; left: 15px;"></div>
<div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(126,231,135,0.3); border: 2px solid #7ee787; position: relative; right: 15px;"></div>
</div>
<div style="text-align: center; margin-top: 12px; font-size: 12px; color: #8b949e;">Returns only matching rows</div>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 14px; margin-bottom: 16px;">LEFT JOIN</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
<div style="width: 60px; height: 60px; border-radius: 50%; background: #58a6ff; border: 2px solid #58a6ff; position: relative; left: 15px;"></div>
<div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(126,231,135,0.3); border: 2px solid #7ee787; position: relative; right: 15px;"></div>
</div>
<div style="text-align: center; margin-top: 12px; font-size: 12px; color: #8b949e;">All from left + matches from right</div>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #f0883e; font-weight: bold; font-size: 14px; margin-bottom: 16px;">RIGHT JOIN</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
<div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(88,166,255,0.3); border: 2px solid #58a6ff; position: relative; left: 15px;"></div>
<div style="width: 60px; height: 60px; border-radius: 50%; background: #7ee787; border: 2px solid #7ee787; position: relative; right: 15px;"></div>
</div>
<div style="text-align: center; margin-top: 12px; font-size: 12px; color: #8b949e;">Matches from left + all from right</div>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #a371f7; font-weight: bold; font-size: 14px; margin-bottom: 16px;">FULL OUTER JOIN</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
<div style="width: 60px; height: 60px; border-radius: 50%; background: #58a6ff; border: 2px solid #58a6ff; position: relative; left: 15px;"></div>
<div style="width: 60px; height: 60px; border-radius: 50%; background: #7ee787; border: 2px solid #7ee787; position: relative; right: 15px;"></div>
</div>
<div style="text-align: center; margin-top: 12px; font-size: 12px; color: #8b949e;">All rows from both tables</div>
</div>
</div>
</div>

---

## Sample Tables

For all examples, we'll use these tables:

```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255)
);

-- Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    amount DECIMAL(10,2),
    created_at TIMESTAMP
);

-- Sample data
INSERT INTO users (id, name, email) VALUES
    (1, 'Alice', 'alice@example.com'),
    (2, 'Bob', 'bob@example.com'),
    (3, 'Charlie', 'charlie@example.com');

INSERT INTO orders (id, user_id, amount, created_at) VALUES
    (101, 1, 99.99, '2024-01-15'),
    (102, 1, 149.99, '2024-01-20'),
    (103, 2, 75.00, '2024-01-18'),
    (104, NULL, 50.00, '2024-01-22');  -- order without user
```

---

## INNER JOIN

Returns only rows that have matching values in both tables.

```sql
SELECT
    users.name,
    users.email,
    orders.id as order_id,
    orders.amount
FROM users
INNER JOIN orders ON users.id = orders.user_id;
```

**Result:**
| name  | email             | order_id | amount |
|-------|-------------------|----------|--------|
| Alice | alice@example.com | 101      | 99.99  |
| Alice | alice@example.com | 102      | 149.99 |
| Bob   | bob@example.com   | 103      | 75.00  |

<div style="background: rgba(126,231,135,0.1); border-left: 4px solid #7ee787; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #7ee787;">Note:</strong> Charlie (no orders) and order 104 (no user) are NOT included
</div>

---

## LEFT JOIN (LEFT OUTER JOIN)

Returns all rows from the left table and matching rows from the right table. Non-matching rows get NULL.

```sql
SELECT
    users.name,
    users.email,
    orders.id as order_id,
    orders.amount
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
```

**Result:**
| name    | email               | order_id | amount |
|---------|---------------------|----------|--------|
| Alice   | alice@example.com   | 101      | 99.99  |
| Alice   | alice@example.com   | 102      | 149.99 |
| Bob     | bob@example.com     | 103      | 75.00  |
| Charlie | charlie@example.com | NULL     | NULL   |

<div style="background: rgba(88,166,255,0.1); border-left: 4px solid #58a6ff; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #58a6ff;">Use case:</strong> Find all users and their orders (including users without orders)
</div>

### Finding Non-Matches (LEFT JOIN with NULL check)

```sql
-- Find users who have never placed an order
SELECT
    users.name,
    users.email
FROM users
LEFT JOIN orders ON users.id = orders.user_id
WHERE orders.id IS NULL;
```

**Result:**
| name    | email               |
|---------|---------------------|
| Charlie | charlie@example.com |

---

## RIGHT JOIN (RIGHT OUTER JOIN)

Returns all rows from the right table and matching rows from the left table.

```sql
SELECT
    users.name,
    orders.id as order_id,
    orders.amount
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;
```

**Result:**
| name  | order_id | amount |
|-------|----------|--------|
| Alice | 101      | 99.99  |
| Alice | 102      | 149.99 |
| Bob   | 103      | 75.00  |
| NULL  | 104      | 50.00  |

<div style="background: rgba(240,136,62,0.1); border-left: 4px solid #f0883e; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #f0883e;">Tip:</strong> RIGHT JOIN is less common. You can usually rewrite it as LEFT JOIN by swapping table order.
</div>

---

## FULL OUTER JOIN

Returns all rows from both tables. Non-matching rows get NULL on the side without a match.

```sql
SELECT
    users.name,
    orders.id as order_id,
    orders.amount
FROM users
FULL OUTER JOIN orders ON users.id = orders.user_id;
```

**Result:**
| name    | order_id | amount |
|---------|----------|--------|
| Alice   | 101      | 99.99  |
| Alice   | 102      | 149.99 |
| Bob     | 103      | 75.00  |
| Charlie | NULL     | NULL   |
| NULL    | 104      | 50.00  |

---

## CROSS JOIN

Returns the Cartesian product - every combination of rows from both tables.

```sql
-- Get all combinations of sizes and colors
SELECT
    sizes.name as size,
    colors.name as color
FROM sizes
CROSS JOIN colors;

-- Same as:
SELECT sizes.name as size, colors.name as color
FROM sizes, colors;
```

If sizes has 3 rows and colors has 4 rows, result has 12 rows (3 × 4).

<div style="background: rgba(248,81,73,0.1); border-left: 4px solid #f85149; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #f85149;">Warning:</strong> CROSS JOIN can produce very large result sets. Use carefully!
</div>

---

## SELF JOIN

Joining a table with itself. Useful for hierarchical data or comparing rows.

```sql
-- Employees and their managers
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    manager_id INT REFERENCES employees(id)
);

-- Find employees with their manager names
SELECT
    e.name as employee,
    m.name as manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
```

```sql
-- Find pairs of users from the same city
SELECT
    u1.name as user1,
    u2.name as user2,
    u1.city
FROM users u1
JOIN users u2 ON u1.city = u2.city AND u1.id < u2.id;
```

---

## Multiple Joins

Join more than two tables:

```sql
-- Orders with user info and product details
SELECT
    u.name as customer,
    o.id as order_id,
    p.name as product,
    oi.quantity,
    oi.price
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.status = 'completed';
```

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 20px; margin: 16px 0;">
<h4 style="color: #58a6ff; margin: 0 0 16px 0; font-size: 14px;">Join Order Visualization</h4>
<div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
<div style="background: #1f6feb; padding: 8px 16px; border-radius: 6px; color: #fff; font-size: 12px;">orders</div>
<span style="color: #7ee787;">→ JOIN →</span>
<div style="background: #238636; padding: 8px 16px; border-radius: 6px; color: #fff; font-size: 12px;">users</div>
<span style="color: #7ee787;">→ JOIN →</span>
<div style="background: #8957e5; padding: 8px 16px; border-radius: 6px; color: #fff; font-size: 12px;">order_items</div>
<span style="color: #7ee787;">→ JOIN →</span>
<div style="background: #f0883e; padding: 8px 16px; border-radius: 6px; color: #fff; font-size: 12px;">products</div>
</div>
</div>

---

## Join Conditions

### ON vs WHERE

```sql
-- ON: defines how tables relate (join condition)
-- WHERE: filters the final result

-- Different behavior with LEFT JOIN:

-- This returns all users, with order info where amount > 100
SELECT u.name, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.amount > 100;

-- This filters out users without orders > 100
SELECT u.name, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.amount > 100;
```

### Multiple Join Conditions

```sql
SELECT *
FROM orders o
JOIN products p ON
    o.product_id = p.id AND
    p.status = 'active' AND
    p.category = o.category;
```

---

## Performance Tips

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0;">Join Performance Optimization</h4>
<div style="display: grid; gap: 16px;">
<div style="background: #21262d; border-radius: 8px; padding: 16px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 8px;">1. Index Join Columns</div>
<div style="color: #c9d1d9; font-size: 14px;">Always index foreign key columns used in JOIN conditions</div>
<code style="background: #161b22; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #8b949e;">CREATE INDEX idx_orders_user_id ON orders(user_id);</code>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px; border-left: 3px solid #58a6ff;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 8px;">2. Select Only Needed Columns</div>
<div style="color: #c9d1d9; font-size: 14px;">Avoid SELECT * - specify only columns you need</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px; border-left: 3px solid #f0883e;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 8px;">3. Filter Early</div>
<div style="color: #c9d1d9; font-size: 14px;">Apply WHERE conditions to reduce rows before joining</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px; border-left: 3px solid #a371f7;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 8px;">4. Use EXPLAIN</div>
<div style="color: #c9d1d9; font-size: 14px;">Analyze query plans to identify bottlenecks</div>
<code style="background: #161b22; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #8b949e;">EXPLAIN ANALYZE SELECT ...</code>
</div>
</div>
</div>

---

## Common Patterns

### Find Orphaned Records

```sql
-- Orders without valid users
SELECT o.*
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
WHERE u.id IS NULL;
```

### Aggregate with Joins

```sql
-- Total spent per user
SELECT
    u.name,
    COUNT(o.id) as order_count,
    COALESCE(SUM(o.amount), 0) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY total_spent DESC;
```

### Latest Record per Group

```sql
-- Latest order for each user
SELECT u.name, o.*
FROM users u
JOIN orders o ON o.id = (
    SELECT o2.id
    FROM orders o2
    WHERE o2.user_id = u.id
    ORDER BY o2.created_at DESC
    LIMIT 1
);
```

---

## Interview Tips

1. **Know your JOINs** - Be able to draw Venn diagrams and explain each type
2. **LEFT vs INNER** - Most common question: what's the difference?
3. **NULL handling** - Understand how NULLs work with different join types
4. **Performance** - Know that joins need indexes on join columns
5. **Rewriting** - Know that RIGHT JOIN can be rewritten as LEFT JOIN

---

## Related Topics

- [SQL Fundamentals](/topic/sql-learning/sql-fundamentals)
- [Subqueries and CTEs](/topic/sql-learning/subqueries-ctes)
- [Database Indexing](/topic/sql-learning/indexing-deep-dive)
