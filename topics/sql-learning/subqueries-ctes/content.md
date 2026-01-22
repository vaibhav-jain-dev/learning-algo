# Subqueries and CTEs

## Overview

Subqueries and Common Table Expressions (CTEs) are powerful SQL features that allow you to break complex queries into manageable, modular pieces. A subquery is a query nested inside another query, while a CTE is a named temporary result set that exists for the duration of a single query.

These techniques transform SQL from a simple data retrieval language into a sophisticated tool for complex data manipulation and analysis. Understanding when to use subqueries vs CTEs, and how to structure them efficiently, is a hallmark of SQL expertise.

---

## Why It Matters

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border-left: 4px solid #3b82f6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
<div style="color: #1e40af; font-weight: bold; font-size: 16px; margin-bottom: 12px;">Real-World Applications</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; font-size: 14px; line-height: 1.8;">
<li>Building complex reports with multiple aggregation levels</li>
<li>Filtering based on calculated values</li>
<li>Comparing rows to aggregates (above/below average)</li>
<li>Hierarchical data traversal with recursive CTEs</li>
<li>Data transformation pipelines in ETL processes</li>
</ul>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border-left: 4px solid #10b981; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
<div style="color: #047857; font-weight: bold; font-size: 16px; margin-bottom: 12px;">Interview Significance</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; font-size: 14px; line-height: 1.8;">
<li>Tests understanding of query composition</li>
<li>Common in data engineering and analyst interviews</li>
<li>Recursive CTEs are advanced interview topics</li>
<li>NULL handling with NOT IN is a classic gotcha</li>
<li>Performance considerations differentiate levels</li>
</ul>
</div>
</div>
</div>

Subqueries and CTEs are essential for writing maintainable, readable SQL. They allow you to solve problems that would be impossible with simple SELECT statements and make complex queries understandable to other developers.

---

## Types of Subqueries

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 24px 0; font-size: 18px; text-align: center;">SUBQUERY CLASSIFICATION</h4>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #10b981; font-weight: bold; font-size: 15px; margin-bottom: 12px;">Scalar Subquery</div>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">Returns a single value (one row, one column)</div>
<code style="background: #f1f5f9; padding: 8px; border-radius: 6px; font-size: 11px; display: block; color: #1e293b;">SELECT name, (SELECT MAX(salary) FROM employees)</code>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #3b82f6; font-weight: bold; font-size: 15px; margin-bottom: 12px;">Row Subquery</div>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">Returns a single row with multiple columns</div>
<code style="background: #f1f5f9; padding: 8px; border-radius: 6px; font-size: 11px; display: block; color: #1e293b;">WHERE (dept, job) = (SELECT dept, job FROM ...)</code>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #f59e0b; font-weight: bold; font-size: 15px; margin-bottom: 12px;">Table Subquery</div>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">Returns multiple rows and columns (derived table)</div>
<code style="background: #f1f5f9; padding: 8px; border-radius: 6px; font-size: 11px; display: block; color: #1e293b;">FROM (SELECT ... GROUP BY ...) AS derived</code>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #8b5cf6; font-weight: bold; font-size: 15px; margin-bottom: 12px;">Correlated Subquery</div>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">References columns from the outer query</div>
<code style="background: #f1f5f9; padding: 8px; border-radius: 6px; font-size: 11px; display: block; color: #1e293b;">WHERE sal > (SELECT AVG(sal) WHERE dept = outer.dept)</code>
</div>
</div>
</div>

---

## Sample Data

For all examples, we will use the following tables:

```sql
-- Employees table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(50),
    salary DECIMAL(10,2),
    manager_id INTEGER REFERENCES employees(id),
    hire_date DATE
);

-- Customers table
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255),
    tier VARCHAR(20) DEFAULT 'standard'
);

-- Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    total_amount DECIMAL(10,2),
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sample data
INSERT INTO employees (id, name, department, salary, manager_id, hire_date) VALUES
    (1, 'Alice', 'Engineering', 95000, NULL, '2020-01-15'),
    (2, 'Bob', 'Engineering', 85000, 1, '2021-03-20'),
    (3, 'Charlie', 'Engineering', 75000, 1, '2022-06-10'),
    (4, 'Diana', 'Sales', 80000, NULL, '2019-08-01'),
    (5, 'Eve', 'Sales', 70000, 4, '2021-11-15'),
    (6, 'Frank', 'HR', 65000, NULL, '2020-04-22');

INSERT INTO customers (id, name, email, tier) VALUES
    (1, 'Acme Corp', 'acme@example.com', 'premium'),
    (2, 'Beta Inc', 'beta@example.com', 'standard'),
    (3, 'Gamma LLC', 'gamma@example.com', 'premium'),
    (4, 'Delta Co', 'delta@example.com', 'standard');

INSERT INTO orders (id, customer_id, total_amount, status, created_at) VALUES
    (101, 1, 5000.00, 'completed', '2024-01-15'),
    (102, 1, 3000.00, 'completed', '2024-02-20'),
    (103, 2, 1500.00, 'pending', '2024-03-10'),
    (104, 3, 8000.00, 'completed', '2024-03-15'),
    (105, NULL, 500.00, 'cancelled', '2024-03-22');
```

---

## Scalar Subqueries

A scalar subquery returns exactly one value and can be used anywhere a single value is expected.

### In SELECT Clause

```sql
-- Compare each employee's salary to company average
SELECT
    name,
    department,
    salary,
    (SELECT AVG(salary) FROM employees) AS company_avg,
    salary - (SELECT AVG(salary) FROM employees) AS diff_from_avg,
    ROUND(salary / (SELECT AVG(salary) FROM employees) * 100, 1) AS pct_of_avg
FROM employees
ORDER BY salary DESC;

-- Result:
-- | name    | department  | salary | company_avg | diff_from_avg | pct_of_avg |
-- |---------|-------------|--------|-------------|---------------|------------|
-- | Alice   | Engineering | 95000  | 78333.33    | 16666.67      | 121.3      |
-- | Bob     | Engineering | 85000  | 78333.33    | 6666.67       | 108.5      |
-- | Diana   | Sales       | 80000  | 78333.33    | 1666.67       | 102.1      |
```

### In WHERE Clause

```sql
-- Find employees earning more than company average
SELECT name, department, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Find the employee with the highest salary
SELECT name, salary
FROM employees
WHERE salary = (SELECT MAX(salary) FROM employees);

-- Find orders larger than the average order
SELECT *
FROM orders
WHERE total_amount > (SELECT AVG(total_amount) FROM orders WHERE status = 'completed');
```

---

## Table Subqueries (Derived Tables)

A table subquery returns multiple rows and columns and is used in the FROM clause like a table.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">Derived Table Flow</h4>
<div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #3b82f6; padding: 16px 24px; border-radius: 10px; color: #fff; font-weight: bold; font-size: 13px;">Inner Query<br/><span style="font-weight: normal; font-size: 11px;">SELECT ... GROUP BY ...</span></div>
<span style="color: #10b981; font-weight: bold; font-size: 24px;">&#8594;</span>
<div style="background: #10b981; padding: 16px 24px; border-radius: 10px; color: #fff; font-weight: bold; font-size: 13px;">Derived Table<br/><span style="font-weight: normal; font-size: 11px;">AS derived_name</span></div>
<span style="color: #f59e0b; font-weight: bold; font-size: 24px;">&#8594;</span>
<div style="background: #f59e0b; padding: 16px 24px; border-radius: 10px; color: #fff; font-weight: bold; font-size: 13px;">Outer Query<br/><span style="font-weight: normal; font-size: 11px;">SELECT ... FROM derived</span></div>
</div>
</div>

```sql
-- Calculate department stats, then filter
SELECT *
FROM (
    SELECT
        department,
        COUNT(*) AS emp_count,
        AVG(salary) AS avg_salary,
        MAX(salary) AS max_salary,
        MIN(salary) AS min_salary
    FROM employees
    GROUP BY department
) AS dept_stats
WHERE emp_count >= 2 AND avg_salary > 70000;

-- Find customers with above-average spending
SELECT
    c.name,
    c.tier,
    spending.total_spent,
    spending.order_count
FROM customers c
JOIN (
    SELECT
        customer_id,
        SUM(total_amount) AS total_spent,
        COUNT(*) AS order_count
    FROM orders
    WHERE status = 'completed'
    GROUP BY customer_id
) AS spending ON c.id = spending.customer_id
WHERE spending.total_spent > (
    SELECT AVG(total_amount) * 2 FROM orders WHERE status = 'completed'
);
```

---

## Subqueries with IN and NOT IN

IN checks if a value matches any value in a list or subquery result.

```sql
-- Find customers who have placed orders
SELECT name, email
FROM customers
WHERE id IN (
    SELECT DISTINCT customer_id
    FROM orders
    WHERE status = 'completed'
);

-- Find departments that have employees
SELECT DISTINCT department
FROM employees
WHERE department IN (
    SELECT department
    FROM employees
    WHERE salary > 80000
);
```

<div style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border: 2px solid #f87171; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="color: #991b1b; font-weight: bold; font-size: 15px; margin-bottom: 12px;">CRITICAL: NOT IN and NULL</div>
<div style="color: #7f1d1d; font-size: 14px; margin-bottom: 12px;">NOT IN returns NO ROWS if the subquery contains ANY NULL value. This is a common interview gotcha!</div>
<div style="background: #ffffff; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 12px; color: #1e293b;">
-- Subquery returns: [1, 2, NULL]<br/>
-- NOT IN (1, 2, NULL) = FALSE for ALL values!<br/>
-- Because: x != NULL is UNKNOWN, not TRUE
</div>
</div>

```sql
-- DANGEROUS: May return no results if subquery has NULL
SELECT name
FROM customers
WHERE id NOT IN (
    SELECT customer_id FROM orders  -- customer_id can be NULL!
);

-- SAFE: Filter out NULLs
SELECT name
FROM customers
WHERE id NOT IN (
    SELECT customer_id
    FROM orders
    WHERE customer_id IS NOT NULL
);

-- SAFEST: Use NOT EXISTS instead (recommended)
SELECT c.name
FROM customers c
WHERE NOT EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.id
);
```

---

## Correlated Subqueries

A correlated subquery references columns from the outer query, so it executes once per outer row.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">Correlated vs Non-Correlated Subquery</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #10b981;">
<div style="color: #047857; font-weight: bold; font-size: 15px; margin-bottom: 12px;">Non-Correlated</div>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">Executes once, result reused for all outer rows</div>
<div style="background: #f1f5f9; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 11px; color: #1e293b;">
WHERE salary > (<br/>
&nbsp;&nbsp;SELECT AVG(salary)<br/>
&nbsp;&nbsp;FROM employees<br/>
)
</div>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #f59e0b;">
<div style="color: #b45309; font-weight: bold; font-size: 15px; margin-bottom: 12px;">Correlated</div>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">Executes once per outer row (references outer table)</div>
<div style="background: #f1f5f9; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 11px; color: #1e293b;">
WHERE salary > (<br/>
&nbsp;&nbsp;SELECT AVG(salary)<br/>
&nbsp;&nbsp;FROM employees e2<br/>
&nbsp;&nbsp;<span style="color: #f59e0b;">WHERE e2.dept = e1.dept</span><br/>
)
</div>
</div>
</div>
</div>

```sql
-- Find employees earning more than their department average
SELECT e1.name, e1.department, e1.salary
FROM employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department = e1.department  -- Correlated!
);

-- Result:
-- | name  | department  | salary |
-- |-------|-------------|--------|
-- | Alice | Engineering | 95000  |  -- Eng avg: 85000
-- | Diana | Sales       | 80000  |  -- Sales avg: 75000

-- Get the most recent order for each customer
SELECT *
FROM orders o1
WHERE o1.created_at = (
    SELECT MAX(o2.created_at)
    FROM orders o2
    WHERE o2.customer_id = o1.customer_id
);

-- Count orders per customer using correlated subquery
SELECT
    c.name,
    (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) AS order_count
FROM customers c;
```

---

## EXISTS and NOT EXISTS

EXISTS returns TRUE if the subquery returns any rows, FALSE otherwise. It is often more efficient than IN for large datasets.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">EXISTS vs IN Comparison</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #dcfce7; border-radius: 12px; padding: 20px; border: 2px solid #86efac;">
<div style="color: #166534; font-weight: bold; font-size: 15px; margin-bottom: 12px;">EXISTS</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; font-size: 13px; line-height: 1.8;">
<li>Returns TRUE/FALSE</li>
<li>Stops at first match (efficient)</li>
<li>Better for large subquery results</li>
<li>Handles NULL correctly</li>
<li>Always correlated</li>
</ul>
</div>
<div style="background: #dbeafe; border-radius: 12px; padding: 20px; border: 2px solid #93c5fd;">
<div style="color: #1e40af; font-weight: bold; font-size: 15px; margin-bottom: 12px;">IN</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; font-size: 13px; line-height: 1.8;">
<li>Compares values</li>
<li>Processes all values</li>
<li>Better for small lists</li>
<li>NOT IN fails with NULL</li>
<li>Can be non-correlated</li>
</ul>
</div>
</div>
</div>

```sql
-- Find customers who have placed at least one order
SELECT c.name
FROM customers c
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.id
);

-- Find customers who have NEVER placed an order (safer than NOT IN)
SELECT c.name
FROM customers c
WHERE NOT EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.id
);

-- Find departments with at least one high earner
SELECT DISTINCT department
FROM employees e1
WHERE EXISTS (
    SELECT 1
    FROM employees e2
    WHERE e2.department = e1.department
      AND e2.salary > 90000
);

-- Check for order existence with additional conditions
SELECT c.name, c.tier
FROM customers c
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.id
      AND o.status = 'completed'
      AND o.total_amount > 5000
);
```

---

## Common Table Expressions (CTEs)

CTEs provide a way to name subqueries and reference them multiple times in a query. They make complex queries more readable and maintainable.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">CTE Syntax Structure</h4>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; font-family: monospace; font-size: 13px; color: #1e293b; line-height: 2;">
<span style="color: #8b5cf6; font-weight: bold;">WITH</span> cte_name <span style="color: #8b5cf6; font-weight: bold;">AS</span> (<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #475569;">-- Query definition</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #3b82f6;">SELECT</span> ... <span style="color: #3b82f6;">FROM</span> ... <span style="color: #3b82f6;">WHERE</span> ...<br/>
)<br/>
<span style="color: #3b82f6;">SELECT</span> * <span style="color: #3b82f6;">FROM</span> cte_name;
</div>
</div>

### Basic CTE

```sql
-- Simple CTE for high-value customers
WITH high_value_customers AS (
    SELECT
        customer_id,
        SUM(total_amount) AS total_spent,
        COUNT(*) AS order_count
    FROM orders
    WHERE status = 'completed'
    GROUP BY customer_id
    HAVING SUM(total_amount) > 5000
)
SELECT
    c.name,
    c.email,
    c.tier,
    hvc.total_spent,
    hvc.order_count
FROM customers c
JOIN high_value_customers hvc ON c.id = hvc.customer_id
ORDER BY hvc.total_spent DESC;
```

### Multiple CTEs

```sql
-- Chain multiple CTEs together
WITH
-- First CTE: Calculate department statistics
dept_stats AS (
    SELECT
        department,
        AVG(salary) AS avg_salary,
        COUNT(*) AS emp_count
    FROM employees
    GROUP BY department
),
-- Second CTE: Calculate company-wide statistics
company_stats AS (
    SELECT
        AVG(salary) AS company_avg,
        AVG(avg_salary) AS avg_dept_avg
    FROM employees, dept_stats
),
-- Third CTE: Identify departments above average
above_avg_depts AS (
    SELECT d.department, d.avg_salary, d.emp_count
    FROM dept_stats d, company_stats c
    WHERE d.avg_salary > c.company_avg
)
-- Final query using the CTEs
SELECT
    a.department,
    a.avg_salary,
    a.emp_count,
    c.company_avg,
    ROUND(a.avg_salary - c.company_avg, 2) AS above_company_avg
FROM above_avg_depts a
CROSS JOIN company_stats c
ORDER BY a.avg_salary DESC;
```

### CTEs Referenced Multiple Times

```sql
-- CTE can be referenced multiple times (a key advantage over subqueries)
WITH monthly_sales AS (
    SELECT
        DATE_TRUNC('month', created_at) AS month,
        SUM(total_amount) AS total
    FROM orders
    WHERE status = 'completed'
    GROUP BY DATE_TRUNC('month', created_at)
)
SELECT
    ms.month,
    ms.total,
    (SELECT AVG(total) FROM monthly_sales) AS avg_monthly,
    ms.total - (SELECT AVG(total) FROM monthly_sales) AS diff_from_avg,
    CASE
        WHEN ms.total > (SELECT AVG(total) FROM monthly_sales) THEN 'Above Average'
        ELSE 'Below Average'
    END AS performance
FROM monthly_sales ms
ORDER BY ms.month;
```

---

## Recursive CTEs

Recursive CTEs can reference themselves, enabling traversal of hierarchical or graph data structures.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">Recursive CTE Structure</h4>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; font-family: monospace; font-size: 12px; color: #1e293b; line-height: 1.8;">
<span style="color: #8b5cf6; font-weight: bold;">WITH RECURSIVE</span> cte_name <span style="color: #8b5cf6; font-weight: bold;">AS</span> (<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #10b981;">-- Base case (anchor member)</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #3b82f6;">SELECT</span> ... <span style="color: #3b82f6;">WHERE</span> starting_condition<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #8b5cf6; font-weight: bold;">UNION ALL</span><br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #f59e0b;">-- Recursive case (recursive member)</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #3b82f6;">SELECT</span> ... <span style="color: #3b82f6;">FROM</span> cte_name<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #3b82f6;">WHERE</span> termination_condition<br/>
)<br/>
<span style="color: #3b82f6;">SELECT</span> * <span style="color: #3b82f6;">FROM</span> cte_name;
</div>
</div>

### Organization Hierarchy Traversal

```sql
-- Build complete organization tree
WITH RECURSIVE org_tree AS (
    -- Base case: top-level employees (no manager)
    SELECT
        id,
        name,
        manager_id,
        1 AS level,
        name AS path,
        ARRAY[id] AS path_ids
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive case: find direct reports
    SELECT
        e.id,
        e.name,
        e.manager_id,
        ot.level + 1,
        ot.path || ' > ' || e.name,
        ot.path_ids || e.id
    FROM employees e
    JOIN org_tree ot ON e.manager_id = ot.id
)
SELECT
    id,
    name,
    level,
    path,
    REPEAT('  ', level - 1) || name AS indented_name
FROM org_tree
ORDER BY path_ids;

-- Result:
-- | id | name    | level | path                      | indented_name |
-- |----|---------|-------|---------------------------|---------------|
-- | 1  | Alice   | 1     | Alice                     | Alice         |
-- | 2  | Bob     | 2     | Alice > Bob               |   Bob         |
-- | 3  | Charlie | 2     | Alice > Charlie           |   Charlie     |
-- | 4  | Diana   | 1     | Diana                     | Diana         |
-- | 5  | Eve     | 2     | Diana > Eve               |   Eve         |
-- | 6  | Frank   | 1     | Frank                     | Frank         |
```

### Generate Number Series

```sql
-- Generate numbers 1 to 100
WITH RECURSIVE numbers AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM numbers WHERE n < 100
)
SELECT n FROM numbers;

-- Generate date series
WITH RECURSIVE dates AS (
    SELECT DATE '2024-01-01' AS date
    UNION ALL
    SELECT date + INTERVAL '1 day'
    FROM dates
    WHERE date < '2024-12-31'
)
SELECT date FROM dates;

-- Fibonacci sequence
WITH RECURSIVE fib AS (
    SELECT 1 AS n, 0::BIGINT AS fib_n, 1::BIGINT AS fib_next
    UNION ALL
    SELECT n + 1, fib_next, fib_n + fib_next
    FROM fib
    WHERE n < 20
)
SELECT n, fib_n AS fibonacci FROM fib;
```

### Finding All Descendants

```sql
-- Find all employees under a specific manager
WITH RECURSIVE reports AS (
    -- Base: direct reports of Alice (id=1)
    SELECT id, name, manager_id
    FROM employees
    WHERE manager_id = 1

    UNION ALL

    -- Recursive: reports of reports
    SELECT e.id, e.name, e.manager_id
    FROM employees e
    JOIN reports r ON e.manager_id = r.id
)
SELECT * FROM reports;
```

---

## CTE vs Subquery Decision Guide

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">When to Use Which</h4>
<div style="display: grid; gap: 16px;">
<div style="background: #dcfce7; border-radius: 10px; padding: 16px; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: bold; margin-bottom: 8px;">Use CTE When:</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; font-size: 14px;">
<li>Query needs to be referenced multiple times</li>
<li>Complex query needs to be broken into readable steps</li>
<li>Recursive traversal is required</li>
<li>Self-documenting code is a priority</li>
</ul>
</div>
<div style="background: #dbeafe; border-radius: 10px; padding: 16px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 8px;">Use Subquery When:</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; font-size: 14px;">
<li>Simple, one-time use case</li>
<li>Scalar value needed in SELECT or WHERE</li>
<li>EXISTS/IN check is sufficient</li>
<li>Database version does not support CTEs</li>
</ul>
</div>
</div>
</div>

---

## Query Patterns

### Top N Per Group

```sql
-- Top 2 highest paid employees per department using CTE
WITH ranked_employees AS (
    SELECT
        name,
        department,
        salary,
        ROW_NUMBER() OVER (
            PARTITION BY department
            ORDER BY salary DESC
        ) AS rank
    FROM employees
)
SELECT name, department, salary
FROM ranked_employees
WHERE rank <= 2
ORDER BY department, rank;
```

### Running Totals

```sql
-- Running total of orders by date
WITH daily_orders AS (
    SELECT
        DATE(created_at) AS order_date,
        SUM(total_amount) AS daily_total
    FROM orders
    WHERE status = 'completed'
    GROUP BY DATE(created_at)
)
SELECT
    order_date,
    daily_total,
    SUM(daily_total) OVER (ORDER BY order_date) AS running_total
FROM daily_orders
ORDER BY order_date;
```

### Customer Segmentation

```sql
-- Segment customers based on behavior
WITH customer_metrics AS (
    SELECT
        c.id,
        c.name,
        COUNT(o.id) AS order_count,
        COALESCE(SUM(o.total_amount), 0) AS total_spent,
        MAX(o.created_at) AS last_order
    FROM customers c
    LEFT JOIN orders o ON c.id = o.customer_id AND o.status = 'completed'
    GROUP BY c.id, c.name
),
segmented AS (
    SELECT
        *,
        CASE
            WHEN total_spent > 10000 AND order_count > 5 THEN 'VIP'
            WHEN total_spent > 5000 OR order_count > 3 THEN 'Regular'
            WHEN last_order < NOW() - INTERVAL '6 months' THEN 'At Risk'
            WHEN order_count = 0 THEN 'Never Ordered'
            ELSE 'New'
        END AS segment
    FROM customer_metrics
)
SELECT segment, COUNT(*) AS customer_count, SUM(total_spent) AS segment_revenue
FROM segmented
GROUP BY segment
ORDER BY segment_revenue DESC;
```

---

## Performance Tips

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0;">Subquery and CTE Optimization</h4>
<div style="display: grid; gap: 16px;">
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #10b981;">
<div style="color: #047857; font-weight: bold; margin-bottom: 8px;">1. Prefer EXISTS over IN for Large Datasets</div>
<div style="color: #475569; font-size: 14px;">EXISTS stops at first match; IN may process all values.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 8px;">2. Avoid Correlated Subqueries When Possible</div>
<div style="color: #475569; font-size: 14px;">Correlated subqueries execute once per row. Rewrite as JOINs or window functions.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #f59e0b;">
<div style="color: #b45309; font-weight: bold; margin-bottom: 8px;">3. CTE Materialization (PostgreSQL 12+)</div>
<div style="color: #475569; font-size: 14px;">Use MATERIALIZED to force CTE to compute once, or NOT MATERIALIZED to allow inlining.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #8b5cf6;">
<div style="color: #6d28d9; font-weight: bold; margin-bottom: 8px;">4. Always Check Execution Plans</div>
<div style="color: #475569; font-size: 14px;">Use EXPLAIN ANALYZE to understand if your subquery is being optimized correctly.</div>
</div>
</div>
</div>

```sql
-- Force CTE materialization (PostgreSQL 12+)
WITH MATERIALIZED customer_stats AS (
    SELECT customer_id, SUM(total_amount) AS total
    FROM orders
    GROUP BY customer_id
)
SELECT * FROM customer_stats WHERE total > 1000;

-- Allow CTE inlining (may optimize better)
WITH NOT MATERIALIZED active_customers AS (
    SELECT id, name FROM customers WHERE tier = 'premium'
)
SELECT * FROM active_customers;
```

---

## Interview Questions

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="margin-bottom: 24px;">
<div style="background: #dcfce7; color: #166534; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px;">Easy</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; line-height: 2;">
<li><strong>What is the difference between a subquery and a CTE?</strong><br/>
<span style="color: #475569;">CTEs are named, reusable; subqueries are inline. CTEs improve readability.</span></li>
<li><strong>What is a scalar subquery?</strong><br/>
<span style="color: #475569;">A subquery that returns exactly one value (one row, one column).</span></li>
<li><strong>When would you use EXISTS instead of IN?</strong><br/>
<span style="color: #475569;">For large datasets or when NULL handling is a concern.</span></li>
</ul>
</div>

<div style="margin-bottom: 24px;">
<div style="background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px;">Medium</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; line-height: 2;">
<li><strong>What happens with NOT IN when the subquery returns NULL?</strong><br/>
<span style="color: #475569;">Returns no rows. Use NOT EXISTS or filter NULLs.</span></li>
<li><strong>What is a correlated subquery and when is it evaluated?</strong><br/>
<span style="color: #475569;">References outer query; evaluated once per outer row.</span></li>
<li><strong>How can you rewrite a correlated subquery as a JOIN?</strong></li>
</ul>
</div>

<div>
<div style="background: #fee2e2; color: #991b1b; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px;">Hard</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; line-height: 2;">
<li><strong>Explain recursive CTE execution and termination.</strong></li>
<li><strong>How do CTEs affect query optimization?</strong></li>
<li><strong>Write a query to find employees who earn more than their department average.</strong></li>
</ul>
</div>
</div>

---

## Practice Problems

### Problem 1: Above Average Earners

```sql
-- Find employees earning more than the company average
-- Show how much more they earn

SELECT
    name,
    department,
    salary,
    salary - (SELECT AVG(salary) FROM employees) AS above_avg
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees)
ORDER BY above_avg DESC;
```

### Problem 2: Customers Without Orders (Safe)

```sql
-- Find customers who have never placed an order
-- Use the safe NOT EXISTS pattern

SELECT c.id, c.name, c.email
FROM customers c
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.id
);
```

### Problem 3: Department Ranking

```sql
-- For each department, show ranking of employees by salary

WITH ranked AS (
    SELECT
        name,
        department,
        salary,
        RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank,
        RANK() OVER (ORDER BY salary DESC) AS company_rank
    FROM employees
)
SELECT * FROM ranked
ORDER BY department, dept_rank;
```

### Problem 4: Recursive Hierarchy

```sql
-- Build complete employee hierarchy with levels

WITH RECURSIVE hierarchy AS (
    SELECT id, name, manager_id, 1 AS level
    FROM employees WHERE manager_id IS NULL

    UNION ALL

    SELECT e.id, e.name, e.manager_id, h.level + 1
    FROM employees e
    JOIN hierarchy h ON e.manager_id = h.id
)
SELECT
    level,
    REPEAT('--', level - 1) || name AS org_chart
FROM hierarchy
ORDER BY level, name;
```

### Problem 5: Complex Segmentation

```sql
-- Segment customers and show segment statistics

WITH customer_analysis AS (
    SELECT
        c.id,
        c.name,
        c.tier,
        COUNT(o.id) AS orders,
        COALESCE(SUM(o.total_amount), 0) AS revenue,
        COALESCE(AVG(o.total_amount), 0) AS avg_order
    FROM customers c
    LEFT JOIN orders o ON c.id = o.customer_id AND o.status = 'completed'
    GROUP BY c.id, c.name, c.tier
),
segments AS (
    SELECT *,
        CASE
            WHEN revenue > 7000 THEN 'High Value'
            WHEN revenue > 3000 THEN 'Medium Value'
            WHEN orders > 0 THEN 'Low Value'
            ELSE 'No Orders'
        END AS value_segment
    FROM customer_analysis
)
SELECT
    value_segment,
    COUNT(*) AS customers,
    SUM(revenue) AS total_revenue,
    ROUND(AVG(avg_order), 2) AS avg_order_value
FROM segments
GROUP BY value_segment
ORDER BY total_revenue DESC;
```

---

## Quick Reference

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
<h4 style="color: #1e293b; margin: 0 0 12px 0;">Subquery Types</h4>
<div style="background: #ffffff; padding: 16px; border-radius: 10px; font-size: 13px; color: #1e293b; line-height: 1.8;">
<strong>Scalar:</strong> Returns single value<br/>
<strong>Row:</strong> Returns single row<br/>
<strong>Table:</strong> Returns multiple rows<br/>
<strong>Correlated:</strong> References outer query
</div>
</div>
<div>
<h4 style="color: #1e293b; margin: 0 0 12px 0;">CTE Syntax</h4>
<div style="background: #ffffff; padding: 16px; border-radius: 10px; font-size: 13px; color: #1e293b; line-height: 1.8;">
<code>WITH name AS (SELECT ...)</code><br/>
<code>WITH RECURSIVE name AS (...)</code><br/>
<code>WITH a AS (...), b AS (...)</code>
</div>
</div>
<div>
<h4 style="color: #1e293b; margin: 0 0 12px 0;">Key Operators</h4>
<div style="background: #ffffff; padding: 16px; border-radius: 10px; font-size: 13px; color: #1e293b; line-height: 1.8;">
<code>IN / NOT IN</code> - Value in list<br/>
<code>EXISTS / NOT EXISTS</code> - Row exists<br/>
<code>ANY / ALL</code> - Compare to set
</div>
</div>
<div>
<h4 style="color: #1e293b; margin: 0 0 12px 0;">Important Notes</h4>
<div style="background: #ffffff; padding: 16px; border-radius: 10px; font-size: 13px; color: #1e293b; line-height: 1.8;">
<strong>NOT IN + NULL = No rows!</strong><br/>
EXISTS is often faster than IN<br/>
CTEs can be referenced multiple times
</div>
</div>
</div>
</div>

---

## Related Topics

- [SQL Fundamentals](/topic/sql-learning/sql-fundamentals) - Basic query building blocks
- [Joins Mastery](/topic/sql-learning/joins-mastery) - Combining tables
- [Window Functions](/topic/sql-learning/window-functions) - Analytics without grouping
- [Query Optimization](/topic/sql-learning/query-optimization) - Make queries faster
- [Database Indexing](/topic/sql-learning/indexing-deep-dive) - Performance fundamentals
