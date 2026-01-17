# Subqueries and CTEs

## Overview

Subqueries and Common Table Expressions (CTEs) allow you to write modular, readable SQL queries by breaking complex logic into smaller parts.

**Tags:** SQL, Subqueries, CTE, Advanced

---

## Types of Subqueries

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">SUBQUERY TYPES</h4>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 12px;">Scalar Subquery</div>
<div style="color: #8b949e; font-size: 13px; margin-bottom: 12px;">Returns single value</div>
<code style="color: #c9d1d9; font-size: 12px;">SELECT name, (SELECT MAX(sal) FROM emp)</code>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Row Subquery</div>
<div style="color: #8b949e; font-size: 13px; margin-bottom: 12px;">Returns single row</div>
<code style="color: #c9d1d9; font-size: 12px;">WHERE (dept, job) = (SELECT ...)</code>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 12px;">Table Subquery</div>
<div style="color: #8b949e; font-size: 13px; margin-bottom: 12px;">Returns multiple rows/columns</div>
<code style="color: #c9d1d9; font-size: 12px;">FROM (SELECT ...) AS subq</code>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 12px;">Correlated Subquery</div>
<div style="color: #8b949e; font-size: 13px; margin-bottom: 12px;">References outer query</div>
<code style="color: #c9d1d9; font-size: 12px;">WHERE sal > (SELECT AVG(sal) FROM emp e2 WHERE e2.dept = e1.dept)</code>
</div>
</div>
</div>

---

## Scalar Subqueries

Returns a single value - used where a single value is expected.

### In SELECT

```sql
-- Compare each employee's salary to company average
SELECT
    name,
    salary,
    (SELECT AVG(salary) FROM employees) as company_avg,
    salary - (SELECT AVG(salary) FROM employees) as diff_from_avg
FROM employees;
```

### In WHERE

```sql
-- Find employees earning more than average
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Find the most recent order for a customer
SELECT *
FROM orders
WHERE created_at = (
    SELECT MAX(created_at)
    FROM orders
    WHERE customer_id = 123
);
```

---

## Table Subqueries

Returns multiple rows/columns - used in FROM clause or with IN/EXISTS.

### Subquery in FROM (Derived Table)

```sql
-- Calculate stats per department, then filter
SELECT *
FROM (
    SELECT
        department,
        COUNT(*) as emp_count,
        AVG(salary) as avg_salary
    FROM employees
    GROUP BY department
) AS dept_stats
WHERE emp_count > 10 AND avg_salary > 50000;
```

### Subquery with IN

```sql
-- Find customers who have placed orders
SELECT name, email
FROM customers
WHERE id IN (
    SELECT DISTINCT customer_id
    FROM orders
    WHERE created_at > '2024-01-01'
);

-- Find products never ordered
SELECT name, price
FROM products
WHERE id NOT IN (
    SELECT DISTINCT product_id
    FROM order_items
    WHERE product_id IS NOT NULL  -- Important! NULL breaks NOT IN
);
```

<div style="background: rgba(248,81,73,0.1); border-left: 4px solid #f85149; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #f85149;">Warning:</strong> NOT IN returns no rows if subquery contains NULL. Use NOT EXISTS instead!
</div>

---

## Correlated Subqueries

References columns from outer query - executed once per outer row.

```sql
-- Find employees earning more than their department average
SELECT e1.name, e1.department, e1.salary
FROM employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department = e1.department  -- References outer query
);
```

```sql
-- Find latest order for each customer
SELECT *
FROM orders o1
WHERE o1.created_at = (
    SELECT MAX(o2.created_at)
    FROM orders o2
    WHERE o2.customer_id = o1.customer_id
);
```

---

## EXISTS vs IN

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">EXISTS vs IN COMPARISON</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 20px; border: 1px solid rgba(126,231,135,0.3);">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 12px;">EXISTS</div>
<ul style="margin: 0; padding-left: 20px; color: #c9d1d9; font-size: 13px;">
<li>Returns TRUE/FALSE</li>
<li>Stops at first match</li>
<li>Better for large subqueries</li>
<li>Handles NULL properly</li>
<li>Correlated by nature</li>
</ul>
</div>
<div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 20px; border: 1px solid rgba(88,166,255,0.3);">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">IN</div>
<ul style="margin: 0; padding-left: 20px; color: #c9d1d9; font-size: 13px;">
<li>Compares values</li>
<li>Checks all values</li>
<li>Better for small lists</li>
<li>NOT IN fails with NULL</li>
<li>Can be non-correlated</li>
</ul>
</div>
</div>
</div>

```sql
-- EXISTS example
SELECT c.name
FROM customers c
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.id
    AND o.amount > 1000
);

-- NOT EXISTS (safer than NOT IN)
SELECT p.name
FROM products p
WHERE NOT EXISTS (
    SELECT 1
    FROM order_items oi
    WHERE oi.product_id = p.id
);
```

---

## Common Table Expressions (CTEs)

CTEs make queries more readable by naming subqueries.

### Basic CTE Syntax

```sql
WITH cte_name AS (
    SELECT ...
)
SELECT * FROM cte_name;
```

### Simple CTE Example

```sql
WITH high_value_customers AS (
    SELECT
        customer_id,
        SUM(amount) as total_spent
    FROM orders
    GROUP BY customer_id
    HAVING SUM(amount) > 10000
)
SELECT
    c.name,
    c.email,
    hvc.total_spent
FROM customers c
JOIN high_value_customers hvc ON c.id = hvc.customer_id;
```

### Multiple CTEs

```sql
WITH
monthly_sales AS (
    SELECT
        DATE_TRUNC('month', created_at) as month,
        SUM(amount) as total
    FROM orders
    GROUP BY DATE_TRUNC('month', created_at)
),
monthly_avg AS (
    SELECT AVG(total) as avg_monthly
    FROM monthly_sales
)
SELECT
    ms.month,
    ms.total,
    ma.avg_monthly,
    ms.total - ma.avg_monthly as diff_from_avg
FROM monthly_sales ms
CROSS JOIN monthly_avg ma
ORDER BY ms.month;
```

---

## Recursive CTEs

Process hierarchical or graph data.

### Basic Recursive Structure

```sql
WITH RECURSIVE cte_name AS (
    -- Base case (non-recursive term)
    SELECT ...

    UNION ALL

    -- Recursive case (references cte_name)
    SELECT ...
    FROM cte_name
    WHERE ... -- termination condition
)
SELECT * FROM cte_name;
```

### Organization Hierarchy

```sql
WITH RECURSIVE org_tree AS (
    -- Base case: top-level employees (no manager)
    SELECT
        id,
        name,
        manager_id,
        1 as level,
        name as path
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive case: find employees of each manager
    SELECT
        e.id,
        e.name,
        e.manager_id,
        ot.level + 1,
        ot.path || ' > ' || e.name
    FROM employees e
    JOIN org_tree ot ON e.manager_id = ot.id
)
SELECT * FROM org_tree
ORDER BY path;
```

**Result:**
| id | name    | manager_id | level | path                        |
|----|---------|------------|-------|------------------------------|
| 1  | CEO     | NULL       | 1     | CEO                         |
| 2  | CTO     | 1          | 2     | CEO > CTO                   |
| 5  | Dev     | 2          | 3     | CEO > CTO > Dev             |
| 3  | CFO     | 1          | 2     | CEO > CFO                   |

### Generate Number Series

```sql
WITH RECURSIVE numbers AS (
    SELECT 1 as n
    UNION ALL
    SELECT n + 1 FROM numbers WHERE n < 100
)
SELECT n FROM numbers;
```

### Date Series

```sql
WITH RECURSIVE dates AS (
    SELECT DATE '2024-01-01' as date
    UNION ALL
    SELECT date + INTERVAL '1 day'
    FROM dates
    WHERE date < '2024-12-31'
)
SELECT date FROM dates;
```

---

## CTE vs Subquery

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">WHEN TO USE CTE vs SUBQUERY</h4>
<div style="display: grid; gap: 16px;">
<div style="background: #21262d; border-radius: 12px; padding: 20px; border-left: 4px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 8px;">Use CTE When:</div>
<ul style="margin: 0; padding-left: 20px; color: #c9d1d9; font-size: 13px;">
<li>Query is referenced multiple times</li>
<li>Complex query needs to be broken down</li>
<li>Recursive query is needed</li>
<li>Readability is priority</li>
</ul>
</div>
<div style="background: #21262d; border-radius: 12px; padding: 20px; border-left: 4px solid #58a6ff;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 8px;">Use Subquery When:</div>
<ul style="margin: 0; padding-left: 20px; color: #c9d1d9; font-size: 13px;">
<li>Simple, one-time use</li>
<li>Scalar value needed</li>
<li>EXISTS/IN check</li>
<li>Legacy database compatibility</li>
</ul>
</div>
</div>
</div>

---

## Practical Examples

### Top N per Category

```sql
WITH ranked_products AS (
    SELECT
        category,
        name,
        sales,
        ROW_NUMBER() OVER (
            PARTITION BY category
            ORDER BY sales DESC
        ) as rank
    FROM products
)
SELECT category, name, sales
FROM ranked_products
WHERE rank <= 3;
```

### Running Totals with Reset

```sql
WITH daily_totals AS (
    SELECT
        date,
        amount,
        SUM(amount) OVER (ORDER BY date) as running_total
    FROM transactions
)
SELECT
    date,
    amount,
    running_total,
    CASE
        WHEN running_total > 10000 THEN 'Budget exceeded'
        ELSE 'Within budget'
    END as status
FROM daily_totals;
```

### Customer Segmentation

```sql
WITH customer_stats AS (
    SELECT
        customer_id,
        COUNT(*) as order_count,
        SUM(amount) as total_spent,
        MAX(created_at) as last_order
    FROM orders
    GROUP BY customer_id
),
segments AS (
    SELECT
        customer_id,
        order_count,
        total_spent,
        last_order,
        CASE
            WHEN total_spent > 10000 AND order_count > 20 THEN 'VIP'
            WHEN total_spent > 5000 OR order_count > 10 THEN 'Regular'
            WHEN last_order < NOW() - INTERVAL '6 months' THEN 'Churned'
            ELSE 'New'
        END as segment
    FROM customer_stats
)
SELECT
    c.name,
    c.email,
    s.segment,
    s.total_spent,
    s.order_count
FROM customers c
JOIN segments s ON c.id = s.customer_id
ORDER BY s.total_spent DESC;
```

---

## Performance Considerations

```sql
-- CTEs are optimization fences in some databases
-- If CTE is used once, it may be inlined
-- If used multiple times, it may be materialized

-- PostgreSQL: CTE is materialized by default (pre-12)
-- PostgreSQL 12+: Use MATERIALIZED or NOT MATERIALIZED

WITH stats AS MATERIALIZED (
    -- Force materialization
    SELECT ...
)

WITH stats AS NOT MATERIALIZED (
    -- Allow inlining
    SELECT ...
)
```

<div style="background: rgba(88,166,255,0.1); border-left: 4px solid #58a6ff; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #58a6ff;">Tip:</strong> Always check execution plans with EXPLAIN ANALYZE to understand actual performance.
</div>

---

## Interview Tips

1. **Know the difference** - Subquery vs CTE vs Derived Table
2. **NULL handling** - Understand NOT IN with NULL issue
3. **EXISTS vs IN** - When to use each
4. **Recursive CTEs** - Know hierarchy traversal pattern
5. **Readability** - CTEs often win for complex queries

---

## Related Topics

- [SQL Fundamentals](/topic/sql-learning/sql-fundamentals)
- [Joins Mastery](/topic/sql-learning/joins-mastery)
- [Window Functions](/topic/sql-learning/window-functions)
- [Query Optimization](/topic/sql-learning/query-optimization)
