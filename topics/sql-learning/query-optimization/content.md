# SQL Query Optimization

## Overview

Query optimization is about writing efficient SQL that executes quickly and uses minimal resources. This guide covers key techniques for improving query performance.

**Tags:** SQL, Performance, Optimization, EXPLAIN

---

## Understanding Query Execution

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">QUERY EXECUTION ORDER</h4>
<div style="display: flex; flex-direction: column; gap: 8px; max-width: 500px; margin: 0 auto;">
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #238636; color: #fff; padding: 8px 16px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 13px;">1. FROM</div>
<span style="color: #8b949e; font-size: 12px;">Tables are identified and joined</span>
</div>
<div style="text-align: center; color: #58a6ff;">↓</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #1f6feb; color: #fff; padding: 8px 16px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 13px;">2. WHERE</div>
<span style="color: #8b949e; font-size: 12px;">Rows are filtered</span>
</div>
<div style="text-align: center; color: #58a6ff;">↓</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #8957e5; color: #fff; padding: 8px 16px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 13px;">3. GROUP BY</div>
<span style="color: #8b949e; font-size: 12px;">Rows are grouped</span>
</div>
<div style="text-align: center; color: #58a6ff;">↓</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #f0883e; color: #fff; padding: 8px 16px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 13px;">4. HAVING</div>
<span style="color: #8b949e; font-size: 12px;">Groups are filtered</span>
</div>
<div style="text-align: center; color: #58a6ff;">↓</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #da3633; color: #fff; padding: 8px 16px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 13px;">5. SELECT</div>
<span style="color: #8b949e; font-size: 12px;">Columns are selected</span>
</div>
<div style="text-align: center; color: #58a6ff;">↓</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #7ee787; color: #0d1117; padding: 8px 16px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 13px;">6. ORDER BY</div>
<span style="color: #8b949e; font-size: 12px;">Results are sorted</span>
</div>
<div style="text-align: center; color: #58a6ff;">↓</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #21262d; color: #c9d1d9; padding: 8px 16px; border-radius: 6px; min-width: 120px; text-align: center; font-size: 13px; border: 1px solid #30363d;">7. LIMIT</div>
<span style="color: #8b949e; font-size: 12px;">Result set is limited</span>
</div>
</div>
</div>

---

## Using EXPLAIN

EXPLAIN shows how the database plans to execute your query.

### Basic EXPLAIN

```sql
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';
```

### EXPLAIN ANALYZE (with actual execution)

```sql
EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;
```

### Key Metrics to Watch

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
<div style="background: #21262d; border-radius: 8px; padding: 16px;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 8px;">Seq Scan</div>
<div style="color: #8b949e; font-size: 13px;">Full table scan - may need index</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 8px;">Index Scan</div>
<div style="color: #8b949e; font-size: 13px;">Using index - usually good</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 8px;">Nested Loop</div>
<div style="color: #8b949e; font-size: 13px;">For each row in A, scan B - slow for large tables</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 8px;">Hash Join</div>
<div style="color: #8b949e; font-size: 13px;">Build hash table, probe - efficient for equality joins</div>
</div>
</div>
</div>

---

## Index Optimization

### When to Add Indexes

```sql
-- Index columns used in:
-- 1. WHERE clauses
CREATE INDEX idx_users_email ON users(email);

-- 2. JOIN conditions
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- 3. ORDER BY clauses
CREATE INDEX idx_products_created ON products(created_at DESC);

-- 4. GROUP BY columns
CREATE INDEX idx_sales_category ON sales(category);
```

### Composite Indexes

```sql
-- Order matters! Index on (a, b, c) supports:
-- ✓ WHERE a = 1
-- ✓ WHERE a = 1 AND b = 2
-- ✓ WHERE a = 1 AND b = 2 AND c = 3
-- ✗ WHERE b = 2 (can't skip first column)
-- ✗ WHERE c = 3

CREATE INDEX idx_orders_user_status_date
ON orders(user_id, status, created_at);
```

### Covering Indexes

```sql
-- Include columns needed in SELECT to avoid table lookup
CREATE INDEX idx_users_email_name
ON users(email) INCLUDE (name, created_at);

-- Query can be satisfied entirely from index:
SELECT name, created_at
FROM users
WHERE email = 'test@example.com';
```

---

## Common Anti-Patterns

### 1. Functions on Indexed Columns

```sql
-- BAD: Index on created_at won't be used
SELECT * FROM orders
WHERE YEAR(created_at) = 2024;

-- GOOD: Range query uses index
SELECT * FROM orders
WHERE created_at >= '2024-01-01'
  AND created_at < '2025-01-01';
```

### 2. Implicit Type Conversion

```sql
-- BAD: user_id is INT, but comparing to string
SELECT * FROM orders WHERE user_id = '123';

-- GOOD: Match types
SELECT * FROM orders WHERE user_id = 123;
```

### 3. Leading Wildcards

```sql
-- BAD: Full scan required
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- GOOD: Can use index
SELECT * FROM users WHERE email LIKE 'john%';

-- Alternative for suffix search: reverse index
-- Or use full-text search
```

### 4. OR Conditions

```sql
-- BAD: May not use indexes efficiently
SELECT * FROM orders
WHERE customer_id = 1 OR product_id = 5;

-- GOOD: UNION can use separate indexes
SELECT * FROM orders WHERE customer_id = 1
UNION
SELECT * FROM orders WHERE product_id = 5;
```

### 5. SELECT *

```sql
-- BAD: Fetches all columns
SELECT * FROM users WHERE id = 1;

-- GOOD: Only fetch needed columns
SELECT name, email FROM users WHERE id = 1;
```

---

## Query Rewriting Techniques

### Use EXISTS Instead of COUNT

```sql
-- BAD: Counts all matching rows
SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END
FROM orders WHERE user_id = 123;

-- GOOD: Stops at first match
SELECT EXISTS(SELECT 1 FROM orders WHERE user_id = 123);
```

### Batch Operations

```sql
-- BAD: Many small queries
FOR each user_id:
    UPDATE users SET last_seen = NOW() WHERE id = user_id;

-- GOOD: Single batch update
UPDATE users
SET last_seen = NOW()
WHERE id IN (1, 2, 3, 4, 5);

-- Or with VALUES
UPDATE users AS u
SET last_seen = v.timestamp
FROM (VALUES
    (1, '2024-01-01'),
    (2, '2024-01-02'),
    (3, '2024-01-03')
) AS v(id, timestamp)
WHERE u.id = v.id;
```

### Pagination Optimization

```sql
-- BAD: OFFSET becomes slow for large values
SELECT * FROM products
ORDER BY created_at DESC
LIMIT 20 OFFSET 10000;  -- Scans 10,020 rows

-- GOOD: Keyset/cursor pagination
SELECT * FROM products
WHERE created_at < '2024-01-15 10:30:00'
ORDER BY created_at DESC
LIMIT 20;
```

---

## Join Optimization

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0;">Join Performance Tips</h4>
<div style="display: grid; gap: 12px;">
<div style="background: #21262d; border-radius: 8px; padding: 16px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 8px;">1. Index Join Columns</div>
<div style="color: #c9d1d9; font-size: 13px;">Foreign keys should always be indexed</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px; border-left: 3px solid #58a6ff;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 8px;">2. Filter Before Joining</div>
<div style="color: #c9d1d9; font-size: 13px;">Reduce rows in subquery before join</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px; border-left: 3px solid #f0883e;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 8px;">3. Start with Smallest Table</div>
<div style="color: #c9d1d9; font-size: 13px;">Put smaller/filtered table first in join order</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px; border-left: 3px solid #a371f7;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 8px;">4. Avoid Unnecessary Joins</div>
<div style="color: #c9d1d9; font-size: 13px;">Only join tables you actually need</div>
</div>
</div>
</div>

```sql
-- Filter early example
SELECT o.id, o.amount, c.name
FROM orders o
JOIN (
    SELECT id, name
    FROM customers
    WHERE status = 'active'  -- Filter first
) c ON o.customer_id = c.id
WHERE o.created_at > '2024-01-01';
```

---

## Subquery Optimization

### Correlated vs Non-Correlated

```sql
-- BAD: Correlated subquery runs once per row
SELECT *
FROM employees e
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
    WHERE department = e.department  -- Correlated
);

-- GOOD: Join with pre-calculated aggregates
SELECT e.*
FROM employees e
JOIN (
    SELECT department, AVG(salary) as avg_sal
    FROM employees
    GROUP BY department
) dept_avg ON e.department = dept_avg.department
WHERE e.salary > dept_avg.avg_sal;
```

---

## Monitoring and Diagnostics

### PostgreSQL Performance Views

```sql
-- Slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- Index usage
SELECT
    relname as table,
    indexrelname as index,
    idx_scan as scans,
    idx_tup_read as tuples_read
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Unused indexes
SELECT
    relname as table,
    indexrelname as index
FROM pg_stat_user_indexes
WHERE idx_scan = 0
AND indexrelname NOT LIKE '%pkey';
```

### MySQL Performance

```sql
-- Show slow query log
SHOW VARIABLES LIKE 'slow_query%';

-- Query cache status
SHOW STATUS LIKE 'Qcache%';

-- Index usage
SHOW INDEX FROM orders;
```

---

## Quick Reference

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0;">Optimization Checklist</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div>
<div style="color: #7ee787; font-weight: bold; margin-bottom: 12px;">✓ DO</div>
<ul style="margin: 0; padding-left: 20px; color: #c9d1d9; font-size: 13px;">
<li>Use EXPLAIN ANALYZE</li>
<li>Index WHERE, JOIN, ORDER BY columns</li>
<li>Select only needed columns</li>
<li>Use LIMIT for large results</li>
<li>Batch operations</li>
<li>Use EXISTS for existence checks</li>
<li>Monitor query performance</li>
</ul>
</div>
<div>
<div style="color: #f85149; font-weight: bold; margin-bottom: 12px;">✗ AVOID</div>
<ul style="margin: 0; padding-left: 20px; color: #c9d1d9; font-size: 13px;">
<li>SELECT * in production</li>
<li>Functions on indexed columns</li>
<li>Leading wildcards in LIKE</li>
<li>Large OFFSET values</li>
<li>Correlated subqueries</li>
<li>Missing indexes on FKs</li>
<li>Type mismatches in WHERE</li>
</ul>
</div>
</div>
</div>

---

## Interview Tips

1. **Know EXPLAIN** - Be able to read and interpret execution plans
2. **Index strategy** - Know when and what to index
3. **Query rewriting** - Show alternative approaches
4. **Trade-offs** - Indexes help reads but slow writes
5. **Monitoring** - Know how to find slow queries

---

## Related Topics

- [Database Indexing Deep Dive](/topic/sql-learning/indexing-deep-dive)
- [SQL Fundamentals](/topic/sql-learning/sql-fundamentals)
- [Joins Mastery](/topic/sql-learning/joins-mastery)
