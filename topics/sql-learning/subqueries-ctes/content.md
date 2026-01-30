# Subqueries and CTEs

## Overview

<span style="color:#10b981; font-weight:bold;">Subqueries</span> and <span style="color:#10b981; font-weight:bold;">Common Table Expressions (CTEs)</span> are powerful SQL features that allow you to break complex queries into manageable, modular pieces. A subquery is a query nested inside another query, while a CTE is a named temporary result set that exists for the duration of a single query.

These techniques transform SQL from a simple data retrieval language into a sophisticated tool for complex data manipulation and analysis. Understanding when to use subqueries vs CTEs, and how to structure them efficiently, is a hallmark of SQL expertise and a common differentiator in [[technical interviews]](/topic/system-design/design-fundamentals).

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

Subqueries and CTEs are essential for writing maintainable, readable SQL. They allow you to solve problems that would be impossible with simple SELECT statements and make complex queries understandable to other developers. Understanding these patterns is crucial for [[query optimization]](/topic/sql-learning/query-optimization) and building efficient [[database systems]](/topic/system-design/storage-systems).

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

A <span style="color:#10b981; font-weight:bold;">scalar subquery</span> returns exactly one value and can be used anywhere a single value is expected.

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

A <span style="color:#10b981; font-weight:bold;">table subquery</span> (also called a derived table) returns multiple rows and columns and is used in the FROM clause like a table.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">Derived Table Execution Flow</h4>
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

<span style="color:#10b981; font-weight:bold;">IN</span> checks if a value matches any value in a list or subquery result.

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
<div style="color: #991b1b; font-weight: bold; font-size: 15px; margin-bottom: 12px;">CRITICAL: NOT IN and NULL - The Classic Interview Trap</div>
<div style="color: #7f1d1d; font-size: 14px; margin-bottom: 12px;"><span style="color:#10b981; font-weight:bold;">NOT IN</span> returns <strong>NO ROWS</strong> if the subquery contains ANY NULL value. This is one of the most common SQL interview gotchas!</div>
<div style="background: #ffffff; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 12px; color: #1e293b;">
-- Subquery returns: [1, 2, NULL]<br/>
-- NOT IN (1, 2, NULL) = FALSE for ALL values!<br/>
-- Why? Because: x != NULL evaluates to UNKNOWN (not TRUE)<br/>
-- SQL uses 3-valued logic: TRUE, FALSE, UNKNOWN
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

## Correlated Subqueries - Deep Dive

A <span style="color:#10b981; font-weight:bold;">correlated subquery</span> references columns from the outer query, so it executes once per outer row. This is fundamentally different from non-correlated subqueries which execute only once.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 24px 0; text-align: center;">CORRELATED SUBQUERY EXECUTION MODEL</h4>
<div style="display: flex; flex-direction: column; gap: 12px; max-width: 600px; margin: 0 auto;">
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #238636; color: #fff; padding: 12px 20px; border-radius: 8px; min-width: 180px; text-align: center; font-size: 13px; font-weight: bold;">Outer Query Row 1</div>
<span style="color: #f0883e; font-size: 20px;">&#8594;</span>
<div style="background: #1f6feb; color: #fff; padding: 12px 20px; border-radius: 8px; flex: 1; text-align: center; font-size: 12px;">Subquery executes with Row 1 context</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #238636; color: #fff; padding: 12px 20px; border-radius: 8px; min-width: 180px; text-align: center; font-size: 13px; font-weight: bold;">Outer Query Row 2</div>
<span style="color: #f0883e; font-size: 20px;">&#8594;</span>
<div style="background: #1f6feb; color: #fff; padding: 12px 20px; border-radius: 8px; flex: 1; text-align: center; font-size: 12px;">Subquery executes with Row 2 context</div>
</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #238636; color: #fff; padding: 12px 20px; border-radius: 8px; min-width: 180px; text-align: center; font-size: 13px; font-weight: bold;">Outer Query Row N</div>
<span style="color: #f0883e; font-size: 20px;">&#8594;</span>
<div style="background: #1f6feb; color: #fff; padding: 12px 20px; border-radius: 8px; flex: 1; text-align: center; font-size: 12px;">Subquery executes with Row N context</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; margin-top: 12px; border: 2px solid #e2e8f0;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 8px;">Performance Impact</div>
<div style="color: #64748b; font-size: 13px;">N outer rows = N subquery executions. For 10,000 rows, the subquery runs 10,000 times!</div>
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">Correlated vs Non-Correlated Comparison</h4>
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
<div style="margin-top: 12px; color: #10b981; font-size: 12px;">Complexity: O(1) subquery execution</div>
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
<div style="margin-top: 12px; color: #f59e0b; font-size: 12px;">Complexity: O(N) subquery executions</div>
</div>
</div>
</div>

### Examples of Correlated Subqueries

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

-- Count orders per customer using correlated subquery in SELECT
SELECT
    c.name,
    (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) AS order_count
FROM customers c;
```

### Rewriting Correlated Subqueries for Performance

Correlated subqueries can often be rewritten using [[JOINs]](/topic/sql-learning/joins-mastery) or [[window functions]](/topic/sql-learning/window-functions) for better performance:

```sql
-- BEFORE: Correlated subquery (slow for large tables)
SELECT e1.name, e1.department, e1.salary
FROM employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department = e1.department
);

-- AFTER: Rewritten with JOIN (typically faster)
SELECT e.name, e.department, e.salary
FROM employees e
JOIN (
    SELECT department, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department
) dept_avg ON e.department = dept_avg.department
WHERE e.salary > dept_avg.avg_salary;

-- AFTER: Rewritten with window function (often fastest)
SELECT name, department, salary
FROM (
    SELECT
        name,
        department,
        salary,
        AVG(salary) OVER (PARTITION BY department) AS dept_avg
    FROM employees
) sub
WHERE salary > dept_avg;
```

---

## EXISTS vs IN - Complete Analysis

Understanding the difference between <span style="color:#10b981; font-weight:bold;">EXISTS</span> and <span style="color:#10b981; font-weight:bold;">IN</span> is crucial for both performance optimization and correct handling of NULL values.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 24px 0; text-align: center;">EXISTS vs IN - EXECUTION BEHAVIOR</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #e2e8f0;">
<div style="color: #7ee787; font-weight: bold; font-size: 16px; margin-bottom: 16px; text-align: center;">EXISTS</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="background: #238636; color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 12px; text-align: center;">For each outer row...</div>
<div style="text-align: center; color: #1e40af;">&#8595;</div>
<div style="background: #1f6feb; color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 12px; text-align: center;">Execute correlated subquery</div>
<div style="text-align: center; color: #1e40af;">&#8595;</div>
<div style="background: #f0883e; color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 12px; text-align: center;">STOP at first match!</div>
<div style="text-align: center; color: #1e40af;">&#8595;</div>
<div style="background: #8957e5; color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 12px; text-align: center;">Return TRUE/FALSE</div>
</div>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #e2e8f0;">
<div style="color: #1e40af; font-weight: bold; font-size: 16px; margin-bottom: 16px; text-align: center;">IN</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="background: #238636; color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 12px; text-align: center;">Execute subquery once</div>
<div style="text-align: center; color: #1e40af;">&#8595;</div>
<div style="background: #1f6feb; color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 12px; text-align: center;">Build result set / hash table</div>
<div style="text-align: center; color: #1e40af;">&#8595;</div>
<div style="background: #f0883e; color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 12px; text-align: center;">Check each outer value</div>
<div style="text-align: center; color: #1e40af;">&#8595;</div>
<div style="background: #8957e5; color: #fff; padding: 8px 12px; border-radius: 6px; font-size: 12px; text-align: center;">Return match result</div>
</div>
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">Complete Comparison Matrix</h4>
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
<tr style="background: #e2e8f0;">
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Aspect</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">EXISTS</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">IN</th>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold;">Return Type</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Boolean (TRUE/FALSE)</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Value comparison</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold;">NULL Handling</td>
<td style="padding: 12px; border: 1px solid #cbd5e1; color: #10b981;">Safe - ignores NULLs</td>
<td style="padding: 12px; border: 1px solid #cbd5e1; color: #ef4444;">NOT IN fails with NULLs</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold;">Early Termination</td>
<td style="padding: 12px; border: 1px solid #cbd5e1; color: #10b981;">Yes - stops at first match</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">No - processes all values</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold;">Correlation</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Always correlated</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Can be non-correlated</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold;">Best For</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Large inner result sets</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Small static lists</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold;">Index Usage</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Uses index on inner table</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Uses index on outer table</td>
</tr>
</table>
</div>

### EXISTS Examples

```sql
-- Find customers who have placed at least one order
SELECT c.name
FROM customers c
WHERE EXISTS (
    SELECT 1  -- The column doesn't matter, only existence
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

### When to Use Which

<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border: 2px solid #86efac; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="color: #166534; font-weight: bold; font-size: 15px; margin-bottom: 12px;">Use EXISTS When:</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; line-height: 1.8;">
<li>Subquery returns many rows (EXISTS stops at first match)</li>
<li>NULL values might be in the subquery result</li>
<li>You only care about existence, not the actual values</li>
<li>The subquery is correlated with good index support on inner table</li>
</ul>
</div>

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 2px solid #93c5fd; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="color: #1e40af; font-weight: bold; font-size: 15px; margin-bottom: 12px;">Use IN When:</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; line-height: 1.8;">
<li>Subquery returns a small number of distinct values</li>
<li>You're checking against a static list of values</li>
<li>The inner query has no NULL values (or you filter them out)</li>
<li>Modern optimizer can convert to semi-join (often equivalent)</li>
</ul>
</div>

---

## Common Table Expressions (CTEs)

<span style="color:#10b981; font-weight:bold;">CTEs</span> provide a way to name subqueries and reference them multiple times in a query. They make complex queries more readable and maintainable.

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

## Recursive CTEs - Deep Dive

<span style="color:#10b981; font-weight:bold;">Recursive CTEs</span> can reference themselves, enabling traversal of hierarchical or graph data structures. They consist of two parts: the <span style="color:#10b981; font-weight:bold;">anchor member</span> (base case) and the <span style="color:#10b981; font-weight:bold;">recursive member</span>.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 24px 0; text-align: center;">RECURSIVE CTE EXECUTION MODEL</h4>
<div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px; margin: 0 auto;">
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #238636; color: #fff; padding: 16px 24px; border-radius: 8px; min-width: 160px; text-align: center;">
<div style="font-weight: bold; font-size: 14px;">Anchor Member</div>
<div style="font-size: 11px; opacity: 0.9;">Base case query</div>
</div>
<span style="color: #1e40af; font-size: 20px;">&#8594;</span>
<div style="background: #ffffff; color: #475569; padding: 16px 20px; border-radius: 8px; flex: 1; text-align: center; border: 2px solid #e2e8f0;">
<div style="font-size: 13px;">Result Set R0</div>
<div style="font-size: 11px; color: #64748b;">Initial rows</div>
</div>
</div>
<div style="text-align: center; color: #f0883e; font-size: 24px;">&#8595; UNION ALL</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #1f6feb; color: #fff; padding: 16px 24px; border-radius: 8px; min-width: 160px; text-align: center;">
<div style="font-weight: bold; font-size: 14px;">Recursive Member</div>
<div style="font-size: 11px; opacity: 0.9;">Joins with CTE itself</div>
</div>
<span style="color: #1e40af; font-size: 20px;">&#8594;</span>
<div style="background: #ffffff; color: #475569; padding: 16px 20px; border-radius: 8px; flex: 1; text-align: center; border: 2px solid #e2e8f0;">
<div style="font-size: 13px;">Result Set R1, R2, R3...</div>
<div style="font-size: 11px; color: #64748b;">Until empty</div>
</div>
</div>
<div style="text-align: center; color: #f0883e; font-size: 24px;">&#8595; Terminates when Rn is empty</div>
<div style="background: #8957e5; color: #fff; padding: 16px 24px; border-radius: 8px; text-align: center;">
<div style="font-weight: bold; font-size: 14px;">Final Result = R0 ∪ R1 ∪ R2 ∪ ... ∪ Rn</div>
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">Recursive CTE Structure</h4>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; font-family: monospace; font-size: 12px; color: #1e293b; line-height: 1.8;">
<span style="color: #8b5cf6; font-weight: bold;">WITH RECURSIVE</span> cte_name <span style="color: #8b5cf6; font-weight: bold;">AS</span> (<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #10b981;">-- Anchor member (base case) - executed once</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #3b82f6;">SELECT</span> ... <span style="color: #3b82f6;">WHERE</span> starting_condition<br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #8b5cf6; font-weight: bold;">UNION ALL</span><br/><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #f59e0b;">-- Recursive member - executed repeatedly</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #3b82f6;">SELECT</span> ... <span style="color: #3b82f6;">FROM</span> cte_name<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #3b82f6;">WHERE</span> continuation_condition<br/>
)<br/>
<span style="color: #3b82f6;">SELECT</span> * <span style="color: #3b82f6;">FROM</span> cte_name;
</div>
</div>

### Organization Hierarchy Traversal

```sql
-- Build complete organization tree
WITH RECURSIVE org_tree AS (
    -- Anchor: top-level employees (no manager)
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

    -- Recursive: find direct reports
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

### Cycle Detection and Prevention

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="color: #92400e; font-weight: bold; font-size: 15px; margin-bottom: 12px;">Warning: Infinite Loops</div>
<div style="color: #78350f; font-size: 14px;">Recursive CTEs can run forever if the data contains cycles. Always implement safeguards!</div>
</div>

```sql
-- Safe recursive CTE with cycle detection
WITH RECURSIVE org_tree AS (
    SELECT
        id,
        name,
        manager_id,
        1 AS level,
        ARRAY[id] AS visited,  -- Track visited nodes
        FALSE AS has_cycle
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    SELECT
        e.id,
        e.name,
        e.manager_id,
        ot.level + 1,
        ot.visited || e.id,
        e.id = ANY(ot.visited)  -- Detect cycle
    FROM employees e
    JOIN org_tree ot ON e.manager_id = ot.id
    WHERE NOT ot.has_cycle  -- Stop if cycle detected
      AND ot.level < 10      -- Maximum depth safeguard
)
SELECT * FROM org_tree WHERE NOT has_cycle;

-- PostgreSQL 14+ syntax for cycle detection
WITH RECURSIVE org_tree AS (
    SELECT id, name, manager_id, 1 AS level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    SELECT e.id, e.name, e.manager_id, ot.level + 1
    FROM employees e
    JOIN org_tree ot ON e.manager_id = ot.id
)
CYCLE id SET is_cycle USING path  -- Built-in cycle detection
SELECT * FROM org_tree WHERE NOT is_cycle;
```

### Common Recursive CTE Patterns

```sql
-- Generate number series
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

-- Find all descendants of a manager
WITH RECURSIVE reports AS (
    SELECT id, name, manager_id
    FROM employees
    WHERE manager_id = 1  -- Alice's ID

    UNION ALL

    SELECT e.id, e.name, e.manager_id
    FROM employees e
    JOIN reports r ON e.manager_id = r.id
)
SELECT * FROM reports;

-- Bill of Materials (BOM) explosion
WITH RECURSIVE bom AS (
    SELECT part_id, component_id, quantity, 1 AS level
    FROM parts_components
    WHERE part_id = 100  -- Top-level product

    UNION ALL

    SELECT pc.part_id, pc.component_id,
           pc.quantity * bom.quantity AS total_qty,
           bom.level + 1
    FROM parts_components pc
    JOIN bom ON pc.part_id = bom.component_id
)
SELECT * FROM bom;
```

---

## CTEs vs Temporary Tables

Understanding when to use <span style="color:#10b981; font-weight:bold;">CTEs</span> versus <span style="color:#10b981; font-weight:bold;">temporary tables</span> is an important architectural decision that affects performance, maintainability, and transaction behavior.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 24px 0; text-align: center;">CTE vs TEMP TABLE - LIFECYCLE COMPARISON</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #e2e8f0;">
<div style="color: #7ee787; font-weight: bold; font-size: 16px; margin-bottom: 16px; text-align: center;">CTE Lifecycle</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="background: #238636; color: #fff; padding: 10px; border-radius: 6px; font-size: 12px; text-align: center;">Query starts</div>
<div style="text-align: center; color: #1e40af;">&#8595;</div>
<div style="background: #1f6feb; color: #fff; padding: 10px; border-radius: 6px; font-size: 12px; text-align: center;">CTE defined & executed</div>
<div style="text-align: center; color: #1e40af;">&#8595;</div>
<div style="background: #8957e5; color: #fff; padding: 10px; border-radius: 6px; font-size: 12px; text-align: center;">Main query uses CTE</div>
<div style="text-align: center; color: #1e40af;">&#8595;</div>
<div style="background: #f85149; color: #fff; padding: 10px; border-radius: 6px; font-size: 12px; text-align: center;">Query ends = CTE gone</div>
</div>
<div style="color: #64748b; font-size: 12px; margin-top: 12px; text-align: center;">Scope: Single statement</div>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #e2e8f0;">
<div style="color: #f0883e; font-weight: bold; font-size: 16px; margin-bottom: 16px; text-align: center;">Temp Table Lifecycle</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="background: #238636; color: #fff; padding: 10px; border-radius: 6px; font-size: 12px; text-align: center;">CREATE TEMP TABLE</div>
<div style="text-align: center; color: #1e40af;">&#8595;</div>
<div style="background: #1f6feb; color: #fff; padding: 10px; border-radius: 6px; font-size: 12px; text-align: center;">INSERT data</div>
<div style="text-align: center; color: #1e40af;">&#8595;</div>
<div style="background: #8957e5; color: #fff; padding: 10px; border-radius: 6px; font-size: 12px; text-align: center;">Multiple queries can use</div>
<div style="text-align: center; color: #1e40af;">&#8595;</div>
<div style="background: #f0883e; color: #fff; padding: 10px; border-radius: 6px; font-size: 12px; text-align: center;">Session ends OR explicit DROP</div>
</div>
<div style="color: #64748b; font-size: 12px; margin-top: 12px; text-align: center;">Scope: Entire session</div>
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">Feature Comparison</h4>
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
<tr style="background: #e2e8f0;">
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Feature</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">CTE</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Temporary Table</th>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold;">Scope</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Single statement</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Entire session</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold;">Storage</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">In memory (usually)</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Disk or memory</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold;">Indexes</td>
<td style="padding: 12px; border: 1px solid #cbd5e1; color: #ef4444;">Cannot add indexes</td>
<td style="padding: 12px; border: 1px solid #cbd5e1; color: #10b981;">Can add indexes</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold;">Statistics</td>
<td style="padding: 12px; border: 1px solid #cbd5e1; color: #ef4444;">No statistics</td>
<td style="padding: 12px; border: 1px solid #cbd5e1; color: #10b981;">Has statistics</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold;">Reusability</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Within same query only</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Multiple queries</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold;">Modification</td>
<td style="padding: 12px; border: 1px solid #cbd5e1; color: #ef4444;">Read-only</td>
<td style="padding: 12px; border: 1px solid #cbd5e1; color: #10b981;">INSERT/UPDATE/DELETE</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold;">Recursion</td>
<td style="padding: 12px; border: 1px solid #cbd5e1; color: #10b981;">Supported</td>
<td style="padding: 12px; border: 1px solid #cbd5e1; color: #ef4444;">Not applicable</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #cbd5e1; font-weight: bold;">Transaction</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Part of main query</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Survives rollback (some DBs)</td>
</tr>
</table>
</div>

### When to Use Temporary Tables

```sql
-- Use temp table when you need to:
-- 1. Reuse results across multiple queries
-- 2. Add indexes for performance
-- 3. Modify the data

CREATE TEMP TABLE high_value_orders AS
SELECT
    customer_id,
    SUM(total_amount) AS total_spent,
    COUNT(*) AS order_count
FROM orders
WHERE status = 'completed'
GROUP BY customer_id
HAVING SUM(total_amount) > 5000;

-- Add index for repeated lookups
CREATE INDEX idx_hvo_customer ON high_value_orders(customer_id);

-- Use in multiple queries
SELECT c.name, h.total_spent
FROM customers c
JOIN high_value_orders h ON c.id = h.customer_id;

SELECT AVG(total_spent) FROM high_value_orders;

-- Clean up
DROP TABLE high_value_orders;
```

### When to Prefer CTEs

```sql
-- Use CTE when you need:
-- 1. Readable, self-documenting queries
-- 2. Recursive queries
-- 3. Single-statement operations

WITH high_value_orders AS (
    SELECT customer_id, SUM(total_amount) AS total_spent
    FROM orders
    WHERE status = 'completed'
    GROUP BY customer_id
    HAVING SUM(total_amount) > 5000
),
customer_tier AS (
    SELECT
        c.id,
        c.name,
        COALESCE(h.total_spent, 0) AS spending,
        CASE
            WHEN h.total_spent > 10000 THEN 'platinum'
            WHEN h.total_spent > 5000 THEN 'gold'
            ELSE 'standard'
        END AS calculated_tier
    FROM customers c
    LEFT JOIN high_value_orders h ON c.id = h.customer_id
)
SELECT * FROM customer_tier ORDER BY spending DESC;
```

---

## Query Optimization for Subqueries and CTEs

Understanding how the [[query optimizer]](/topic/sql-learning/query-optimization) handles subqueries and CTEs is crucial for writing performant SQL. Different approaches can yield dramatically different execution plans.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 24px 0; text-align: center;">OPTIMIZATION STRATEGIES BY DATABASE</h4>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #e2e8f0;">
<div style="color: #7ee787; font-weight: bold; font-size: 14px; margin-bottom: 12px; text-align: center;">PostgreSQL</div>
<ul style="margin: 0; padding-left: 16px; color: #475569; font-size: 12px; line-height: 1.8;">
<li>CTEs are optimization fences (< v12)</li>
<li>v12+ can inline non-recursive CTEs</li>
<li>Use MATERIALIZED/NOT MATERIALIZED</li>
<li>Excellent recursive CTE support</li>
</ul>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #e2e8f0;">
<div style="color: #1e40af; font-weight: bold; font-size: 14px; margin-bottom: 12px; text-align: center;">MySQL</div>
<ul style="margin: 0; padding-left: 16px; color: #475569; font-size: 12px; line-height: 1.8;">
<li>CTEs materialized as temp tables (v8+)</li>
<li>Recursive CTEs supported in v8+</li>
<li>Derived tables often merged</li>
<li>Subquery optimization varies</li>
</ul>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #e2e8f0;">
<div style="color: #f0883e; font-weight: bold; font-size: 14px; margin-bottom: 12px; text-align: center;">SQL Server</div>
<ul style="margin: 0; padding-left: 16px; color: #475569; font-size: 12px; line-height: 1.8;">
<li>CTEs not materialized by default</li>
<li>Can inline or spool as needed</li>
<li>OPTION (MAXRECURSION) for limits</li>
<li>Good subquery flattening</li>
</ul>
</div>
</div>
</div>

### CTE Materialization Control (PostgreSQL 12+)

```sql
-- Force CTE materialization (compute once, reuse result)
-- Use when CTE is expensive and referenced multiple times
WITH MATERIALIZED customer_stats AS (
    SELECT customer_id, SUM(total_amount) AS total
    FROM orders
    GROUP BY customer_id
)
SELECT * FROM customer_stats WHERE total > 1000
UNION ALL
SELECT * FROM customer_stats WHERE total < 100;

-- Allow CTE inlining (may optimize better with outer query)
-- Use when CTE is simple and optimizer can push down predicates
WITH NOT MATERIALIZED active_customers AS (
    SELECT id, name FROM customers WHERE tier = 'premium'
)
SELECT * FROM active_customers WHERE name LIKE 'A%';
```

### Subquery Optimization Techniques

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0;">Performance Optimization Checklist</h4>
<div style="display: grid; gap: 16px;">
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #10b981;">
<div style="color: #047857; font-weight: bold; margin-bottom: 8px;">1. Prefer EXISTS over IN for Large Datasets</div>
<div style="color: #475569; font-size: 14px;">EXISTS stops at first match; IN may process all values. Use [[EXPLAIN ANALYZE]](/topic/sql-learning/query-optimization) to verify.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 8px;">2. Rewrite Correlated Subqueries as JOINs</div>
<div style="color: #475569; font-size: 14px;">Correlated subqueries execute once per row. JOINs or [[window functions]](/topic/sql-learning/window-functions) often perform better.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #f59e0b;">
<div style="color: #b45309; font-weight: bold; margin-bottom: 8px;">3. Use Indexes on Subquery Join Columns</div>
<div style="color: #475569; font-size: 14px;">Ensure columns used in correlated subquery conditions are [[indexed]](/topic/sql-learning/indexing-deep-dive).</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #8b5cf6;">
<div style="color: #6d28d9; font-weight: bold; margin-bottom: 8px;">4. Limit Recursive CTE Depth</div>
<div style="color: #475569; font-size: 14px;">Always include termination conditions and consider MAX depth limits to prevent runaway queries.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #ec4899;">
<div style="color: #be185d; font-weight: bold; margin-bottom: 8px;">5. Check Execution Plans</div>
<div style="color: #475569; font-size: 14px;">Use EXPLAIN ANALYZE to understand if your subquery is being optimized correctly or causing nested loops.</div>
</div>
</div>
</div>

```sql
-- Example: Comparing execution plans
-- SLOW: Correlated subquery (N+1 pattern)
EXPLAIN ANALYZE
SELECT e.name, e.salary,
    (SELECT AVG(salary) FROM employees WHERE department = e.department)
FROM employees e;

-- FASTER: Window function approach
EXPLAIN ANALYZE
SELECT name, salary, AVG(salary) OVER (PARTITION BY department)
FROM employees;

-- Compare the "actual time" and "loops" in the output
```

---

## 3-Level Deep Interview Q&A

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 24px 0; text-align: center;">INTERVIEW DEEP DIVE: CORRELATED SUBQUERIES</h4>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 2px solid #e2e8f0;">
<div style="background: #238636; color: #fff; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 12px;">L1 - Basic</div>
<div style="color: #f0f6fc; font-weight: bold; margin-bottom: 8px;">Q: What is a correlated subquery?</div>
<div style="color: #64748b; font-size: 14px; line-height: 1.7;">
<strong style="color: #7ee787;">A:</strong> A <span style="color:#10b981; font-weight:bold;">correlated subquery</span> is a subquery that references columns from the outer query. Unlike a regular subquery that executes once, a correlated subquery executes once for each row processed by the outer query. For example: <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.department = e1.department)</code> - here <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">e1.department</code> references the outer query.
</div>
</div>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 2px solid #e2e8f0; margin-left: 24px;">
<div style="background: #f0883e; color: #fff; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 12px;">L2 - Follow-up</div>
<div style="color: #f0f6fc; font-weight: bold; margin-bottom: 8px;">Q: What are the performance implications? How would you optimize it?</div>
<div style="color: #64748b; font-size: 14px; line-height: 1.7;">
<strong style="color: #7ee787;">A:</strong> Correlated subqueries have O(N) execution complexity - they run once per outer row. For 100K rows, that's 100K subquery executions. Optimization strategies:<br/><br/>
<strong>1. Rewrite as JOIN:</strong> Pre-compute the aggregates and join back<br/>
<strong>2. Use window functions:</strong> <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">AVG(salary) OVER (PARTITION BY department)</code> computes all averages in a single pass<br/>
<strong>3. Index optimization:</strong> Ensure the correlated column (e.g., department) is indexed in the inner table<br/>
<strong>4. Use CTE with materialization:</strong> Pre-compute results once and join
</div>
</div>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #e2e8f0; margin-left: 48px;">
<div style="background: #f85149; color: #fff; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 12px;">L3 - Expert</div>
<div style="color: #f0f6fc; font-weight: bold; margin-bottom: 8px;">Q: Can modern query optimizers decorrelate subqueries? How does this work internally?</div>
<div style="color: #64748b; font-size: 14px; line-height: 1.7;">
<strong style="color: #7ee787;">A:</strong> Yes, modern optimizers can perform <span style="color:#10b981; font-weight:bold;">subquery decorrelation</span> (also called "unnesting"). The optimizer transforms the correlated subquery into an equivalent JOIN-based query plan internally:<br/><br/>
<strong>Process:</strong><br/>
1. Optimizer identifies the correlation predicate<br/>
2. Creates a derived table with the grouped aggregation<br/>
3. Converts to a LEFT JOIN (for scalar subqueries) or SEMI-JOIN (for EXISTS)<br/>
4. Pushes predicates through the join<br/><br/>
<strong>Example transformation:</strong><br/>
<code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">WHERE x > (SELECT AGG FROM t WHERE t.k = outer.k)</code><br/>
becomes<br/>
<code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">LEFT JOIN (SELECT k, AGG FROM t GROUP BY k) ON t.k = outer.k WHERE x > AGG</code><br/><br/>
PostgreSQL's EXPLAIN shows this as "SubPlan" vs "Hash Join" - always verify with EXPLAIN ANALYZE.
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 24px 0; text-align: center;">INTERVIEW DEEP DIVE: EXISTS vs IN</h4>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 2px solid #e2e8f0;">
<div style="background: #238636; color: #fff; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 12px;">L1 - Basic</div>
<div style="color: #f0f6fc; font-weight: bold; margin-bottom: 8px;">Q: What is the difference between EXISTS and IN?</div>
<div style="color: #64748b; font-size: 14px; line-height: 1.7;">
<strong style="color: #7ee787;">A:</strong> <span style="color:#10b981; font-weight:bold;">IN</span> compares a value against a list of values from a subquery and returns TRUE if there's a match. <span style="color:#10b981; font-weight:bold;">EXISTS</span> returns TRUE if the subquery returns ANY rows, regardless of the actual values. EXISTS is always correlated and stops at the first match, while IN builds a complete list for comparison.
</div>
</div>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 2px solid #e2e8f0; margin-left: 24px;">
<div style="background: #f0883e; color: #fff; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 12px;">L2 - Follow-up</div>
<div style="color: #f0f6fc; font-weight: bold; margin-bottom: 8px;">Q: Why does NOT IN return no rows when the subquery contains NULL?</div>
<div style="color: #64748b; font-size: 14px; line-height: 1.7;">
<strong style="color: #7ee787;">A:</strong> This is due to SQL's <span style="color:#10b981; font-weight:bold;">three-valued logic</span> (TRUE, FALSE, UNKNOWN):<br/><br/>
• <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">x NOT IN (1, 2, NULL)</code> expands to <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">x != 1 AND x != 2 AND x != NULL</code><br/>
• <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">x != NULL</code> evaluates to UNKNOWN (not FALSE)<br/>
• TRUE AND UNKNOWN = UNKNOWN<br/>
• WHERE clause only returns rows where condition is TRUE, not UNKNOWN<br/><br/>
This is why NOT EXISTS is safer - it only checks for row existence, not value comparison with NULLs.
</div>
</div>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #e2e8f0; margin-left: 48px;">
<div style="background: #f85149; color: #fff; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 12px;">L3 - Expert</div>
<div style="color: #f0f6fc; font-weight: bold; margin-bottom: 8px;">Q: How do modern optimizers handle IN vs EXISTS differently? When might IN outperform EXISTS?</div>
<div style="color: #64748b; font-size: 14px; line-height: 1.7;">
<strong style="color: #7ee787;">A:</strong> Modern optimizers often transform both to the same execution plan (<span style="color:#10b981; font-weight:bold;">semi-join</span>), but there are scenarios where they differ:<br/><br/>
<strong>IN may be faster when:</strong><br/>
• Subquery returns few distinct values that can be hashed<br/>
• Outer table is much larger than inner result<br/>
• Optimizer can use hash semi-join with in-memory hash table<br/><br/>
<strong>EXISTS may be faster when:</strong><br/>
• Subquery would return many rows (early termination helps)<br/>
• Index exists on the correlated column in inner table<br/>
• Complex conditions make hash building expensive<br/><br/>
<strong>Key insight:</strong> Check EXPLAIN plans! PostgreSQL shows "Hash Semi Join" for IN and "Nested Loop Semi Join" for EXISTS - either can be faster depending on data distribution and indexes. The optimizer's cardinality estimates determine the choice.
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 24px 0; text-align: center;">INTERVIEW DEEP DIVE: RECURSIVE CTEs</h4>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 2px solid #e2e8f0;">
<div style="background: #238636; color: #fff; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 12px;">L1 - Basic</div>
<div style="color: #f0f6fc; font-weight: bold; margin-bottom: 8px;">Q: What is a recursive CTE and when would you use one?</div>
<div style="color: #64748b; font-size: 14px; line-height: 1.7;">
<strong style="color: #7ee787;">A:</strong> A <span style="color:#10b981; font-weight:bold;">recursive CTE</span> is a CTE that references itself, enabling traversal of hierarchical or graph data. It has two parts: an anchor member (base case) and a recursive member joined with UNION ALL. Use cases include: organization hierarchies, bill of materials, tree traversal, path finding, and generating series.
</div>
</div>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 2px solid #e2e8f0; margin-left: 24px;">
<div style="background: #f0883e; color: #fff; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 12px;">L2 - Follow-up</div>
<div style="color: #f0f6fc; font-weight: bold; margin-bottom: 8px;">Q: How do you prevent infinite loops in recursive CTEs?</div>
<div style="color: #64748b; font-size: 14px; line-height: 1.7;">
<strong style="color: #7ee787;">A:</strong> Multiple strategies:<br/><br/>
<strong>1. Depth limiting:</strong> Add a level counter and filter: <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">WHERE level < 100</code><br/><br/>
<strong>2. Path tracking:</strong> Store visited nodes in an array, check before recursing: <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">WHERE NOT id = ANY(visited_array)</code><br/><br/>
<strong>3. PostgreSQL 14+ CYCLE clause:</strong> <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">CYCLE id SET is_cycle USING path</code><br/><br/>
<strong>4. Database limits:</strong> SQL Server's <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">OPTION (MAXRECURSION 100)</code><br/><br/>
Best practice: always include a termination condition in the WHERE clause of the recursive member.
</div>
</div>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #e2e8f0; margin-left: 48px;">
<div style="background: #f85149; color: #fff; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 12px;">L3 - Expert</div>
<div style="color: #f0f6fc; font-weight: bold; margin-bottom: 8px;">Q: Explain the execution model of recursive CTEs. What's the difference between linear and tree recursion?</div>
<div style="color: #64748b; font-size: 14px; line-height: 1.7;">
<strong style="color: #7ee787;">A:</strong> <span style="color:#10b981; font-weight:bold;">Execution model:</span><br/>
1. Execute anchor member → Result set R0 (working table)<br/>
2. Execute recursive member using R0 → R1<br/>
3. Replace working table with R1, repeat until empty<br/>
4. Final result = UNION ALL of all iterations<br/><br/>
<strong>Linear recursion:</strong> Each iteration produces at most one row per input row (e.g., date series, Fibonacci). Memory usage is O(depth).<br/><br/>
<strong>Tree recursion:</strong> Each iteration can produce multiple rows (e.g., org hierarchy where one manager has many reports). Memory usage can be O(branching_factor^depth) - exponential!<br/><br/>
<strong>Performance considerations:</strong><br/>
• Recursive CTEs are <span style="color:#10b981; font-weight:bold;">always materialized</span> - no predicate pushdown<br/>
• For deep hierarchies, consider adjacency list alternatives (nested sets, materialized paths)<br/>
• Index the join column in the recursive member (e.g., manager_id)
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 24px 0; text-align: center;">INTERVIEW DEEP DIVE: CTE vs TEMP TABLES</h4>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 2px solid #e2e8f0;">
<div style="background: #238636; color: #fff; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 12px;">L1 - Basic</div>
<div style="color: #f0f6fc; font-weight: bold; margin-bottom: 8px;">Q: What are the differences between CTEs and temporary tables?</div>
<div style="color: #64748b; font-size: 14px; line-height: 1.7;">
<strong style="color: #7ee787;">A:</strong> <span style="color:#10b981; font-weight:bold;">CTEs</span> exist only for the duration of a single query and cannot be indexed. <span style="color:#10b981; font-weight:bold;">Temporary tables</span> persist for the session, can have indexes and constraints, and can be modified with INSERT/UPDATE/DELETE. CTEs support recursion; temp tables don't. CTEs are part of the query's transaction; temp tables may survive rollbacks.
</div>
</div>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 2px solid #e2e8f0; margin-left: 24px;">
<div style="background: #f0883e; color: #fff; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 12px;">L2 - Follow-up</div>
<div style="color: #f0f6fc; font-weight: bold; margin-bottom: 8px;">Q: When would you choose a temp table over a CTE for performance?</div>
<div style="color: #64748b; font-size: 14px; line-height: 1.7;">
<strong style="color: #7ee787;">A:</strong> Choose temp table when:<br/><br/>
<strong>1. Complex intermediate results:</strong> Computing once and reusing across multiple queries is cheaper than recomputing<br/>
<strong>2. Index needed:</strong> If you'll do multiple lookups on the result, indexing the temp table speeds things up<br/>
<strong>3. Statistics matter:</strong> Temp tables have statistics; CTEs don't. For complex joins, optimizer makes better decisions with stats<br/>
<strong>4. Large result sets:</strong> Temp tables spill to disk gracefully; CTEs may cause memory pressure<br/>
<strong>5. Procedural logic:</strong> When you need to UPDATE rows in the intermediate result
</div>
</div>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #e2e8f0; margin-left: 48px;">
<div style="background: #f85149; color: #fff; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 12px;">L3 - Expert</div>
<div style="color: #f0f6fc; font-weight: bold; margin-bottom: 8px;">Q: How do CTE optimization fences affect query planning? How did PostgreSQL 12 change this?</div>
<div style="color: #64748b; font-size: 14px; line-height: 1.7;">
<strong style="color: #7ee787;">A:</strong> Before PostgreSQL 12, CTEs were <span style="color:#10b981; font-weight:bold;">optimization fences</span> - the optimizer couldn't push predicates into the CTE or inline it. This meant:<br/><br/>
• <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">WITH big_cte AS (SELECT * FROM million_rows) SELECT * FROM big_cte WHERE id = 1</code> would materialize ALL million rows before filtering<br/><br/>
<strong>PostgreSQL 12+ changes:</strong><br/>
• Non-recursive CTEs referenced once can be inlined (predicate pushdown works)<br/>
• CTEs referenced multiple times or with side effects are still materialized<br/>
• <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">MATERIALIZED</code> forces old behavior (optimization fence)<br/>
• <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">NOT MATERIALIZED</code> forces inlining even if referenced multiple times<br/><br/>
<strong>Practical impact:</strong> In older PostgreSQL, use derived tables (inline subqueries) when you want predicate pushdown. In v12+, CTEs are usually as efficient as derived tables.
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 24px 0; text-align: center;">INTERVIEW DEEP DIVE: QUERY OPTIMIZATION</h4>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 2px solid #e2e8f0;">
<div style="background: #238636; color: #fff; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 12px;">L1 - Basic</div>
<div style="color: #f0f6fc; font-weight: bold; margin-bottom: 8px;">Q: How do you optimize a slow subquery?</div>
<div style="color: #64748b; font-size: 14px; line-height: 1.7;">
<strong style="color: #7ee787;">A:</strong> Key optimization strategies:<br/>
1. Use EXPLAIN ANALYZE to understand current execution<br/>
2. Add indexes on columns used in subquery WHERE clauses<br/>
3. Convert correlated subqueries to JOINs or window functions<br/>
4. Use EXISTS instead of IN for large result sets<br/>
5. Ensure subquery returns minimal columns needed<br/>
6. Consider materializing results in a CTE if referenced multiple times
</div>
</div>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 2px solid #e2e8f0; margin-left: 24px;">
<div style="background: #f0883e; color: #fff; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 12px;">L2 - Follow-up</div>
<div style="color: #f0f6fc; font-weight: bold; margin-bottom: 8px;">Q: What patterns in EXPLAIN output indicate subquery problems?</div>
<div style="color: #64748b; font-size: 14px; line-height: 1.7;">
<strong style="color: #7ee787;">A:</strong> Red flags to watch for:<br/><br/>
<strong>1. "SubPlan" with high loops:</strong> Indicates correlated subquery executing many times<br/>
<strong>2. Nested Loop with large actual rows:</strong> O(N*M) complexity warning<br/>
<strong>3. Materialize with large rows:</strong> CTE is being fully materialized<br/>
<strong>4. Seq Scan inside SubPlan:</strong> Missing index on correlated column<br/>
<strong>5. Large "actual time" difference:</strong> Estimated vs actual row counts way off = bad stats<br/>
<strong>6. High "Sort" cost:</strong> Consider adding index that provides sort order
</div>
</div>

<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #e2e8f0; margin-left: 48px;">
<div style="background: #f85149; color: #fff; padding: 6px 12px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 12px;">L3 - Expert</div>
<div style="color: #f0f6fc; font-weight: bold; margin-bottom: 8px;">Q: How do you handle a query with multiple subqueries that can't all be optimized with indexes?</div>
<div style="color: #64748b; font-size: 14px; line-height: 1.7;">
<strong style="color: #7ee787;">A:</strong> Advanced strategies for complex multi-subquery optimization:<br/><br/>
<strong>1. Query rewriting:</strong> Combine multiple correlated subqueries into a single pass using window functions:<br/>
<code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; display: block; margin: 8px 0;">SELECT name, salary,
  AVG(salary) OVER (PARTITION BY dept),
  MAX(salary) OVER (PARTITION BY dept),
  RANK() OVER (PARTITION BY dept ORDER BY salary)
FROM employees;</code><br/>
<strong>2. Lateral joins:</strong> For row-dependent subqueries, LATERAL allows correlated evaluation with join semantics<br/>
<strong>3. Materialized intermediate results:</strong> Use temp tables with indexes for shared computations<br/>
<strong>4. Batch processing:</strong> If possible, restructure to process data in batches with explicit temp tables<br/>
<strong>5. Denormalization:</strong> For read-heavy workloads, pre-compute and store aggregates<br/>
<strong>6. Parallel query:</strong> Ensure work_mem and parallel settings allow parallel execution of independent subqueries
</div>
</div>
</div>

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
  <h4 style="color: #1e293b; margin: 0 0 12px 0;">Critical Gotchas</h4>
  <div style="background: #ffffff; padding: 16px; border-radius: 10px; font-size: 13px; color: #1e293b; line-height: 1.8;">
  <strong style="color: #ef4444;">NOT IN + NULL = No rows!</strong><br/>
  EXISTS is often faster than IN<br/>
  CTEs can be referenced multiple times<br/>
  Recursive CTEs need termination
</div>
</div>
</div>
</div>

---

## Key Takeaways

<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border: 2px solid #86efac; border-radius: 12px; padding: 24px; margin: 20px 0;">
<div style="display: grid; gap: 12px;">
<div style="display: flex; align-items: flex-start; gap: 12px;">
<span style="background: #166534; color: #fff; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 12px;">1</span>
<span style="color: #166534;"><strong>Correlated subqueries</strong> execute once per outer row - consider rewriting as JOINs or window functions for performance.</span>
</div>
<div style="display: flex; align-items: flex-start; gap: 12px;">
<span style="background: #166534; color: #fff; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 12px;">2</span>
<span style="color: #166534;"><strong>NOT IN with NULLs</strong> returns zero rows - always use NOT EXISTS or filter NULLs explicitly.</span>
</div>
<div style="display: flex; align-items: flex-start; gap: 12px;">
<span style="background: #166534; color: #fff; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 12px;">3</span>
<span style="color: #166534;"><strong>EXISTS</strong> stops at first match, making it efficient for large result sets.</span>
</div>
<div style="display: flex; align-items: flex-start; gap: 12px;">
<span style="background: #166534; color: #fff; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 12px;">4</span>
<span style="color: #166534;"><strong>Recursive CTEs</strong> need termination conditions - always include depth limits and cycle detection.</span>
</div>
<div style="display: flex; align-items: flex-start; gap: 12px;">
<span style="background: #166534; color: #fff; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 12px;">5</span>
<span style="color: #166534;"><strong>CTEs vs temp tables</strong>: CTEs for readability and recursion; temp tables for reuse, indexes, and statistics.</span>
</div>
<div style="display: flex; align-items: flex-start; gap: 12px;">
<span style="background: #166534; color: #fff; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 12px;">6</span>
<span style="color: #166534;"><strong>Always use EXPLAIN ANALYZE</strong> to verify optimizer behavior - modern databases may transform your query.</span>
</div>
</div>
</div>

---

## Related Topics

- [[SQL Fundamentals]](/topic/sql-learning/sql-fundamentals) - Basic query building blocks
- [[Joins Mastery]](/topic/sql-learning/joins-mastery) - Combining tables efficiently
- [[Window Functions]](/topic/sql-learning/window-functions) - Analytics without grouping
- [[Query Optimization]](/topic/sql-learning/query-optimization) - Make queries faster
- [[Database Indexing]](/topic/sql-learning/indexing-deep-dive) - Performance fundamentals
- [[Design Fundamentals]](/topic/system-design/design-fundamentals) - System design interview prep
