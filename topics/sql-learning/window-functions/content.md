# SQL Window Functions

## Overview

Window functions perform calculations across a set of table rows that are related to the current row, without collapsing them into a single output row like GROUP BY does. They enable powerful analytics like running totals, rankings, moving averages, and row comparisons while keeping all original rows intact.

Window functions are one of the most powerful features in modern SQL, transforming the language from simple data retrieval into a sophisticated analytical tool. Understanding window functions separates intermediate SQL users from advanced practitioners and is increasingly tested in technical interviews.

---

## Why It Matters

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border-left: 4px solid #3b82f6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
<div style="color: #1e40af; font-weight: bold; font-size: 16px; margin-bottom: 12px;">Real-World Applications</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; font-size: 14px; line-height: 1.8;">
<li>Calculate running totals and cumulative sums</li>
<li>Rank results within groups (top N per category)</li>
<li>Compute moving averages for trend analysis</li>
<li>Compare rows with previous/next records</li>
<li>Calculate period-over-period growth rates</li>
</ul>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border-left: 4px solid #10b981; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
<div style="color: #047857; font-weight: bold; font-size: 16px; margin-bottom: 12px;">Interview Significance</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; font-size: 14px; line-height: 1.8;">
<li>Increasingly common in technical interviews</li>
<li>Tests advanced SQL knowledge</li>
<li>Top N per group is a classic problem</li>
<li>Running totals demonstrate practical skills</li>
<li>Differentiates senior from junior candidates</li>
</ul>
</div>
</div>
</div>

Window functions unlock analytical capabilities that would otherwise require complex self-joins, correlated subqueries, or application-level processing. They are essential for data analysts, business intelligence developers, and anyone working with time-series or ranked data.

---

## Window Function Anatomy

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 24px 0; font-size: 18px; text-align: center;">WINDOW FUNCTION SYNTAX</h4>
<div style="background: #ffffff; border-radius: 12px; padding: 24px; font-family: monospace; font-size: 14px; color: #1e293b; line-height: 2;">
<span style="color: #10b981; font-weight: bold;">function_name</span>(<span style="color: #f59e0b;">expression</span>) <span style="color: #8b5cf6; font-weight: bold;">OVER</span> (<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #3b82f6; font-weight: bold;">PARTITION BY</span> <span style="color: #475569;">partition_columns</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ec4899; font-weight: bold;">ORDER BY</span> <span style="color: #475569;">sort_columns</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #06b6d4; font-weight: bold;">frame_clause</span><br/>
)
</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px;">
<div style="background: #dbeafe; padding: 16px; border-radius: 10px; text-align: center;">
<div style="color: #1e40af; font-weight: bold; font-size: 13px;">PARTITION BY</div>
<div style="color: #475569; font-size: 12px; margin-top: 8px;">Divides rows into groups<br/>(like GROUP BY but keeps rows)</div>
</div>
<div style="background: #fce7f3; padding: 16px; border-radius: 10px; text-align: center;">
<div style="color: #be185d; font-weight: bold; font-size: 13px;">ORDER BY</div>
<div style="color: #475569; font-size: 12px; margin-top: 8px;">Sorts rows within partition<br/>(required for ranking/running totals)</div>
</div>
<div style="background: #cffafe; padding: 16px; border-radius: 10px; text-align: center;">
<div style="color: #0891b2; font-weight: bold; font-size: 13px;">FRAME</div>
<div style="color: #475569; font-size: 12px; margin-top: 8px;">Defines which rows to include<br/>(for aggregates like SUM, AVG)</div>
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
    hire_date DATE
);

-- Sales table
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    salesperson VARCHAR(100),
    region VARCHAR(50),
    amount DECIMAL(10,2),
    sale_date DATE
);

-- Sample data
INSERT INTO employees (id, name, department, salary, hire_date) VALUES
    (1, 'Alice', 'Engineering', 95000, '2020-01-15'),
    (2, 'Bob', 'Engineering', 85000, '2021-03-20'),
    (3, 'Charlie', 'Engineering', 75000, '2022-06-10'),
    (4, 'Diana', 'Sales', 80000, '2019-08-01'),
    (5, 'Eve', 'Sales', 70000, '2021-11-15'),
    (6, 'Frank', 'HR', 65000, '2020-04-22'),
    (7, 'Grace', 'HR', 60000, '2023-01-10');

INSERT INTO sales (salesperson, region, amount, sale_date) VALUES
    ('Diana', 'West', 5000, '2024-01-15'),
    ('Diana', 'West', 3500, '2024-01-22'),
    ('Diana', 'West', 4200, '2024-02-10'),
    ('Eve', 'East', 6000, '2024-01-18'),
    ('Eve', 'East', 2800, '2024-02-05'),
    ('Eve', 'East', 4500, '2024-02-20');
```

---

## Ranking Functions

Ranking functions assign a rank or position to each row within a partition.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">Ranking Function Comparison</h4>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #3b82f6; font-weight: bold; font-size: 15px; margin-bottom: 12px;">ROW_NUMBER()</div>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">Unique sequential numbers</div>
<div style="background: #f1f5f9; padding: 10px; border-radius: 6px; font-family: monospace; font-size: 12px; color: #1e293b;">
1, 2, 3, 4, 5...
</div>
<div style="color: #64748b; font-size: 11px; margin-top: 8px;">Always unique, even for ties</div>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #10b981; font-weight: bold; font-size: 15px; margin-bottom: 12px;">RANK()</div>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">Same rank for ties, gaps after</div>
<div style="background: #f1f5f9; padding: 10px; border-radius: 6px; font-family: monospace; font-size: 12px; color: #1e293b;">
1, 1, 3, 4, 4, 6...
</div>
<div style="color: #64748b; font-size: 11px; margin-top: 8px;">Skips numbers after ties</div>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #f59e0b; font-weight: bold; font-size: 15px; margin-bottom: 12px;">DENSE_RANK()</div>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">Same rank for ties, no gaps</div>
<div style="background: #f1f5f9; padding: 10px; border-radius: 6px; font-family: monospace; font-size: 12px; color: #1e293b;">
1, 1, 2, 3, 3, 4...
</div>
<div style="color: #64748b; font-size: 11px; margin-top: 8px;">Consecutive numbers, ties share rank</div>
</div>
</div>
</div>

### ROW_NUMBER()

```sql
-- Assign unique row numbers by salary
SELECT
    name,
    department,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS overall_rank,
    ROW_NUMBER() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS dept_rank
FROM employees;

-- Result:
-- | name    | department  | salary | overall_rank | dept_rank |
-- |---------|-------------|--------|--------------|-----------|
-- | Alice   | Engineering | 95000  | 1            | 1         |
-- | Bob     | Engineering | 85000  | 2            | 2         |
-- | Diana   | Sales       | 80000  | 3            | 1         |
-- | Charlie | Engineering | 75000  | 4            | 3         |
-- | Eve     | Sales       | 70000  | 5            | 2         |
-- | Frank   | HR          | 65000  | 6            | 1         |
-- | Grace   | HR          | 60000  | 7            | 2         |
```

### RANK() vs DENSE_RANK()

```sql
-- Compare RANK and DENSE_RANK with ties
WITH scores AS (
    SELECT 'Alice' AS name, 95 AS score UNION ALL
    SELECT 'Bob', 95 UNION ALL
    SELECT 'Charlie', 90 UNION ALL
    SELECT 'Diana', 85 UNION ALL
    SELECT 'Eve', 85 UNION ALL
    SELECT 'Frank', 80
)
SELECT
    name,
    score,
    RANK() OVER (ORDER BY score DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY score DESC) AS dense_rank,
    ROW_NUMBER() OVER (ORDER BY score DESC) AS row_num
FROM scores;

-- Result:
-- | name    | score | rank | dense_rank | row_num |
-- |---------|-------|------|------------|---------|
-- | Alice   | 95    | 1    | 1          | 1       |
-- | Bob     | 95    | 1    | 1          | 2       |
-- | Charlie | 90    | 3    | 2          | 3       |   <- RANK skips 2
-- | Diana   | 85    | 4    | 3          | 4       |
-- | Eve     | 85    | 4    | 3          | 5       |
-- | Frank   | 80    | 6    | 4          | 6       |   <- RANK skips 5
```

### NTILE() - Divide into Buckets

```sql
-- Divide employees into salary quartiles
SELECT
    name,
    salary,
    NTILE(4) OVER (ORDER BY salary DESC) AS quartile,
    CASE NTILE(4) OVER (ORDER BY salary DESC)
        WHEN 1 THEN 'Top 25%'
        WHEN 2 THEN 'Upper Middle'
        WHEN 3 THEN 'Lower Middle'
        WHEN 4 THEN 'Bottom 25%'
    END AS salary_tier
FROM employees;

-- Useful for: percentile analysis, fair distribution, A/B testing groups
```

---

## Aggregate Window Functions

Standard aggregate functions (SUM, AVG, COUNT, MIN, MAX) can be used as window functions.

### Running Total

```sql
-- Running total of sales by date
SELECT
    sale_date,
    salesperson,
    amount,
    SUM(amount) OVER (ORDER BY sale_date) AS running_total,
    SUM(amount) OVER (
        PARTITION BY salesperson
        ORDER BY sale_date
    ) AS person_running_total
FROM sales
ORDER BY sale_date;

-- Result:
-- | sale_date  | salesperson | amount | running_total | person_running_total |
-- |------------|-------------|--------|---------------|---------------------|
-- | 2024-01-15 | Diana       | 5000   | 5000          | 5000                |
-- | 2024-01-18 | Eve         | 6000   | 11000         | 6000                |
-- | 2024-01-22 | Diana       | 3500   | 14500         | 8500                |
-- | 2024-02-05 | Eve         | 2800   | 17300         | 8800                |
-- | 2024-02-10 | Diana       | 4200   | 21500         | 12700               |
-- | 2024-02-20 | Eve         | 4500   | 26000         | 13300               |
```

### Moving Average

```sql
-- 3-period moving average
SELECT
    sale_date,
    amount,
    AVG(amount) OVER (
        ORDER BY sale_date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS moving_avg_3,
    AVG(amount) OVER (
        ORDER BY sale_date
        ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
    ) AS centered_avg_3
FROM sales
ORDER BY sale_date;
```

### Percentage of Total

```sql
-- Calculate each sale as percentage of total
SELECT
    salesperson,
    region,
    amount,
    SUM(amount) OVER () AS grand_total,
    ROUND(100.0 * amount / SUM(amount) OVER (), 2) AS pct_of_total,
    SUM(amount) OVER (PARTITION BY salesperson) AS person_total,
    ROUND(100.0 * amount / SUM(amount) OVER (PARTITION BY salesperson), 2) AS pct_of_person
FROM sales;
```

---

## Value Functions

Value functions access data from other rows relative to the current row.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">Value Functions Overview</h4>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #3b82f6; font-weight: bold; font-size: 15px; margin-bottom: 8px;">LAG(column, n, default)</div>
<div style="color: #475569; font-size: 13px;">Access value from n rows BEFORE current row</div>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #10b981; font-weight: bold; font-size: 15px; margin-bottom: 8px;">LEAD(column, n, default)</div>
<div style="color: #475569; font-size: 13px;">Access value from n rows AFTER current row</div>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #f59e0b; font-weight: bold; font-size: 15px; margin-bottom: 8px;">FIRST_VALUE(column)</div>
<div style="color: #475569; font-size: 13px;">First value in the window frame</div>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0;">
<div style="color: #8b5cf6; font-weight: bold; font-size: 15px; margin-bottom: 8px;">LAST_VALUE(column)</div>
<div style="color: #475569; font-size: 13px;">Last value in the window frame (requires frame spec)</div>
</div>
</div>
</div>

### LAG() and LEAD()

```sql
-- Compare each sale to previous and next sale
SELECT
    sale_date,
    salesperson,
    amount,
    LAG(amount, 1) OVER (ORDER BY sale_date) AS prev_amount,
    LEAD(amount, 1) OVER (ORDER BY sale_date) AS next_amount,
    amount - LAG(amount, 1) OVER (ORDER BY sale_date) AS change_from_prev
FROM sales
ORDER BY sale_date;

-- Result:
-- | sale_date  | salesperson | amount | prev_amount | next_amount | change |
-- |------------|-------------|--------|-------------|-------------|--------|
-- | 2024-01-15 | Diana       | 5000   | NULL        | 6000        | NULL   |
-- | 2024-01-18 | Eve         | 6000   | 5000        | 3500        | 1000   |
-- | 2024-01-22 | Diana       | 3500   | 6000        | 2800        | -2500  |

-- With default value for NULLs
SELECT
    sale_date,
    amount,
    LAG(amount, 1, 0) OVER (ORDER BY sale_date) AS prev_amount,
    amount - LAG(amount, 1, 0) OVER (ORDER BY sale_date) AS change
FROM sales;
```

### Month-over-Month Growth

```sql
-- Calculate MoM growth rate
WITH monthly_sales AS (
    SELECT
        DATE_TRUNC('month', sale_date) AS month,
        SUM(amount) AS monthly_total
    FROM sales
    GROUP BY DATE_TRUNC('month', sale_date)
)
SELECT
    month,
    monthly_total,
    LAG(monthly_total) OVER (ORDER BY month) AS prev_month,
    ROUND(
        100.0 * (monthly_total - LAG(monthly_total) OVER (ORDER BY month))
        / LAG(monthly_total) OVER (ORDER BY month),
        2
    ) AS mom_growth_pct
FROM monthly_sales;
```

### FIRST_VALUE() and LAST_VALUE()

```sql
-- Compare each employee's salary to highest and lowest in department
SELECT
    name,
    department,
    salary,
    FIRST_VALUE(salary) OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS highest_in_dept,
    salary - FIRST_VALUE(salary) OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS diff_from_highest,
    FIRST_VALUE(name) OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS highest_earner
FROM employees;
```

<div style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border: 2px solid #f87171; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="color: #991b1b; font-weight: bold; font-size: 14px; margin-bottom: 8px;">LAST_VALUE() Gotcha</div>
<div style="color: #7f1d1d; font-size: 14px;">LAST_VALUE() with default frame only sees up to current row! Use explicit frame:</div>
<code style="display: block; background: #ffffff; padding: 12px; border-radius: 8px; margin-top: 12px; font-size: 12px; color: #1e293b;">
LAST_VALUE(salary) OVER (<br/>
&nbsp;&nbsp;PARTITION BY department ORDER BY salary DESC<br/>
&nbsp;&nbsp;<span style="color: #991b1b;">ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</span><br/>
)
</code>
</div>

---

## Window Frame Specification

The frame clause defines which rows are included in the calculation relative to the current row.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">Frame Specification Options</h4>
<div style="background: #ffffff; border-radius: 12px; padding: 20px;">
<div style="font-family: monospace; font-size: 13px; color: #1e293b; margin-bottom: 16px;">
<span style="color: #8b5cf6; font-weight: bold;">ROWS/RANGE BETWEEN</span> <span style="color: #10b981;">start_point</span> <span style="color: #8b5cf6; font-weight: bold;">AND</span> <span style="color: #f59e0b;">end_point</span>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
<div>
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Frame Boundaries:</div>
<ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 13px; line-height: 2;">
<li><code>UNBOUNDED PRECEDING</code> - First row of partition</li>
<li><code>n PRECEDING</code> - n rows before current</li>
<li><code>CURRENT ROW</code> - The current row</li>
<li><code>n FOLLOWING</code> - n rows after current</li>
<li><code>UNBOUNDED FOLLOWING</code> - Last row of partition</li>
</ul>
</div>
<div>
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Common Frame Patterns:</div>
<ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 13px; line-height: 2;">
<li>Running total: <code>UNBOUNDED PRECEDING - CURRENT ROW</code></li>
<li>Moving avg (3): <code>2 PRECEDING - CURRENT ROW</code></li>
<li>Centered avg: <code>1 PRECEDING - 1 FOLLOWING</code></li>
<li>Full partition: <code>UNBOUNDED PRECEDING - UNBOUNDED FOLLOWING</code></li>
</ul>
</div>
</div>
</div>
</div>

### Frame Examples

```sql
-- Different frame specifications
SELECT
    sale_date,
    amount,
    -- Running total (default when ORDER BY is present)
    SUM(amount) OVER (
        ORDER BY sale_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total,

    -- Moving sum of last 3 rows
    SUM(amount) OVER (
        ORDER BY sale_date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS sum_last_3,

    -- Centered moving average
    AVG(amount) OVER (
        ORDER BY sale_date
        ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
    ) AS centered_avg,

    -- Full partition sum (no frame = entire partition)
    SUM(amount) OVER () AS total_sales
FROM sales
ORDER BY sale_date;
```

### ROWS vs RANGE

```sql
-- ROWS: Physical row count
-- RANGE: Logical value range (groups duplicates together)

WITH daily_totals AS (
    SELECT sale_date, SUM(amount) AS daily_total
    FROM sales
    GROUP BY sale_date
)
SELECT
    sale_date,
    daily_total,
    -- ROWS counts physical rows
    SUM(daily_total) OVER (
        ORDER BY sale_date
        ROWS BETWEEN 1 PRECEDING AND CURRENT ROW
    ) AS rows_sum,
    -- RANGE groups same values together
    SUM(daily_total) OVER (
        ORDER BY sale_date
        RANGE BETWEEN INTERVAL '1 day' PRECEDING AND CURRENT ROW
    ) AS range_sum
FROM daily_totals;
```

---

## Query Patterns

### Top N Per Group

```sql
-- Top 2 earners per department
WITH ranked AS (
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
FROM ranked
WHERE rank <= 2
ORDER BY department, rank;

-- Alternative: Using RANK to handle ties
WITH ranked AS (
    SELECT
        name,
        department,
        salary,
        DENSE_RANK() OVER (
            PARTITION BY department
            ORDER BY salary DESC
        ) AS rank
    FROM employees
)
SELECT name, department, salary
FROM ranked
WHERE rank <= 2;  -- May return more than 2 if ties exist
```

### Cumulative Percentage

```sql
-- Running percentage of total sales
SELECT
    sale_date,
    salesperson,
    amount,
    SUM(amount) OVER (ORDER BY sale_date) AS cumulative,
    SUM(amount) OVER () AS total,
    ROUND(
        100.0 * SUM(amount) OVER (ORDER BY sale_date) / SUM(amount) OVER (),
        2
    ) AS cumulative_pct
FROM sales
ORDER BY sale_date;
```

### Year-over-Year Comparison

```sql
-- Compare to same period last year
WITH monthly_revenue AS (
    SELECT
        DATE_TRUNC('month', sale_date) AS month,
        SUM(amount) AS revenue
    FROM sales
    GROUP BY DATE_TRUNC('month', sale_date)
)
SELECT
    month,
    revenue,
    LAG(revenue, 12) OVER (ORDER BY month) AS revenue_last_year,
    ROUND(
        100.0 * (revenue - LAG(revenue, 12) OVER (ORDER BY month))
        / NULLIF(LAG(revenue, 12) OVER (ORDER BY month), 0),
        2
    ) AS yoy_growth
FROM monthly_revenue;
```

### Gap Analysis

```sql
-- Find gaps in sequences
WITH numbered AS (
    SELECT
        id,
        sale_date,
        LAG(sale_date) OVER (ORDER BY sale_date) AS prev_date,
        sale_date - LAG(sale_date) OVER (ORDER BY sale_date) AS days_gap
    FROM sales
)
SELECT *
FROM numbered
WHERE days_gap > INTERVAL '7 days';
```

### Deduplication with ROW_NUMBER

```sql
-- Keep only the most recent record per customer
WITH ranked AS (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id
            ORDER BY updated_at DESC
        ) AS rn
    FROM customer_records
)
SELECT * FROM ranked WHERE rn = 1;
```

---

## Window Function vs GROUP BY

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">GROUP BY vs Window Functions</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #10b981;">
<div style="color: #047857; font-weight: bold; font-size: 15px; margin-bottom: 12px;">GROUP BY</div>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">Collapses rows into groups</div>
<div style="background: #f1f5f9; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 11px; color: #1e293b;">
SELECT dept, SUM(salary)<br/>
FROM employees<br/>
GROUP BY dept;<br/><br/>
-- 3 rows (one per dept)
</div>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; font-size: 15px; margin-bottom: 12px;">Window Function</div>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">Keeps all rows, adds computed column</div>
<div style="background: #f1f5f9; padding: 12px; border-radius: 8px; font-family: monospace; font-size: 11px; color: #1e293b;">
SELECT name, dept, salary,<br/>
&nbsp;&nbsp;SUM(salary) OVER(PARTITION BY dept)<br/>
FROM employees;<br/><br/>
-- 7 rows (all employees)
</div>
</div>
</div>
</div>

```sql
-- Combined example: detailed rows with group totals
SELECT
    name,
    department,
    salary,
    SUM(salary) OVER (PARTITION BY department) AS dept_total,
    COUNT(*) OVER (PARTITION BY department) AS dept_count,
    ROUND(salary / SUM(salary) OVER (PARTITION BY department) * 100, 2) AS pct_of_dept
FROM employees
ORDER BY department, salary DESC;
```

---

## Performance Tips

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0;">Window Function Optimization</h4>
<div style="display: grid; gap: 16px;">
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #10b981;">
<div style="color: #047857; font-weight: bold; margin-bottom: 8px;">1. Index PARTITION BY and ORDER BY Columns</div>
<div style="color: #475569; font-size: 14px;">Create indexes on columns used in PARTITION BY and ORDER BY clauses.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 8px;">2. Minimize Distinct Window Definitions</div>
<div style="color: #475569; font-size: 14px;">Reuse the same OVER() clause when possible. Different windows require separate passes.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #f59e0b;">
<div style="color: #b45309; font-weight: bold; margin-bottom: 8px;">3. Use Named Windows</div>
<div style="color: #475569; font-size: 14px;">Define window once with WINDOW clause, reference by name. Improves readability and may help optimizer.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #8b5cf6;">
<div style="color: #6d28d9; font-weight: bold; margin-bottom: 8px;">4. Filter Before Window Functions</div>
<div style="color: #475569; font-size: 14px;">Use WHERE to reduce rows before window calculations, not HAVING after.</div>
</div>
</div>
</div>

```sql
-- Named window (cleaner, potentially optimizable)
SELECT
    name,
    department,
    salary,
    ROW_NUMBER() OVER w AS row_num,
    RANK() OVER w AS rank,
    DENSE_RANK() OVER w AS dense_rank,
    SUM(salary) OVER w AS running_total
FROM employees
WINDOW w AS (PARTITION BY department ORDER BY salary DESC);
```

---

## Interview Questions

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="margin-bottom: 24px;">
<div style="background: #dcfce7; color: #166534; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px;">Easy</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; line-height: 2;">
<li><strong>What is the difference between ROW_NUMBER, RANK, and DENSE_RANK?</strong><br/>
<span style="color: #475569;">ROW_NUMBER: always unique. RANK: ties get same rank, gaps after. DENSE_RANK: ties get same rank, no gaps.</span></li>
<li><strong>How does a window function differ from GROUP BY?</strong><br/>
<span style="color: #475569;">Window functions keep all rows; GROUP BY collapses rows into groups.</span></li>
<li><strong>What does PARTITION BY do?</strong><br/>
<span style="color: #475569;">Divides rows into groups for separate window calculations (like GROUP BY but keeps rows).</span></li>
</ul>
</div>

<div style="margin-bottom: 24px;">
<div style="background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px;">Medium</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; line-height: 2;">
<li><strong>How do you get the top N records per group?</strong><br/>
<span style="color: #475569;">Use ROW_NUMBER() OVER (PARTITION BY group ORDER BY value) and filter where rank <= N.</span></li>
<li><strong>What is the default frame for aggregate window functions?</strong><br/>
<span style="color: #475569;">RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (when ORDER BY is present).</span></li>
<li><strong>How do you calculate month-over-month growth?</strong><br/>
<span style="color: #475569;">Use LAG() to get previous month value, then calculate (current - previous) / previous * 100.</span></li>
</ul>
</div>

<div>
<div style="background: #fee2e2; color: #991b1b; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px;">Hard</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; line-height: 2;">
<li><strong>Explain ROWS vs RANGE frame specification.</strong></li>
<li><strong>Why might LAST_VALUE() not return what you expect?</strong><br/>
<span style="color: #475569;">Default frame ends at current row. Need ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING.</span></li>
<li><strong>How would you find consecutive sequences in data?</strong></li>
</ul>
</div>
</div>

---

## Practice Problems

### Problem 1: Department Salary Rankings

```sql
-- Show each employee with their rank within department
-- and their salary compared to department average

SELECT
    name,
    department,
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank,
    ROUND(AVG(salary) OVER (PARTITION BY department), 2) AS dept_avg,
    salary - ROUND(AVG(salary) OVER (PARTITION BY department), 2) AS diff_from_avg
FROM employees
ORDER BY department, dept_rank;
```

### Problem 2: Running Sales with Gap Analysis

```sql
-- Show running total and days since previous sale

SELECT
    sale_date,
    salesperson,
    amount,
    SUM(amount) OVER (ORDER BY sale_date) AS running_total,
    LAG(sale_date) OVER (ORDER BY sale_date) AS prev_sale_date,
    sale_date - LAG(sale_date) OVER (ORDER BY sale_date) AS days_gap
FROM sales
ORDER BY sale_date;
```

### Problem 3: Percentile Distribution

```sql
-- Show salary percentile for each employee

SELECT
    name,
    department,
    salary,
    NTILE(100) OVER (ORDER BY salary) AS percentile,
    PERCENT_RANK() OVER (ORDER BY salary) AS pct_rank,
    CUME_DIST() OVER (ORDER BY salary) AS cumulative_dist
FROM employees
ORDER BY salary DESC;
```

### Problem 4: Moving Average Comparison

```sql
-- Compare current value to 3-period moving average

SELECT
    sale_date,
    amount,
    ROUND(AVG(amount) OVER (
        ORDER BY sale_date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ), 2) AS moving_avg_3,
    amount - AVG(amount) OVER (
        ORDER BY sale_date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS diff_from_ma,
    CASE
        WHEN amount > AVG(amount) OVER (
            ORDER BY sale_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
        ) THEN 'Above MA'
        ELSE 'Below MA'
    END AS trend
FROM sales
ORDER BY sale_date;
```

### Problem 5: Find Consecutive Increases

```sql
-- Find sales that were higher than the previous sale

WITH sales_comparison AS (
    SELECT
        sale_date,
        salesperson,
        amount,
        LAG(amount) OVER (ORDER BY sale_date) AS prev_amount,
        CASE
            WHEN amount > LAG(amount) OVER (ORDER BY sale_date) THEN 1
            ELSE 0
        END AS is_increase
    FROM sales
)
SELECT *
FROM sales_comparison
WHERE is_increase = 1;
```

---

## Quick Reference

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
<h4 style="color: #1e293b; margin: 0 0 12px 0;">Ranking Functions</h4>
<div style="background: #ffffff; padding: 16px; border-radius: 10px; font-size: 13px; color: #1e293b; line-height: 1.8;">
<code>ROW_NUMBER()</code> - Unique sequential<br/>
<code>RANK()</code> - Ties same, gaps after<br/>
<code>DENSE_RANK()</code> - Ties same, no gaps<br/>
<code>NTILE(n)</code> - Divide into n buckets
</div>
</div>
<div>
<h4 style="color: #1e293b; margin: 0 0 12px 0;">Value Functions</h4>
<div style="background: #ffffff; padding: 16px; border-radius: 10px; font-size: 13px; color: #1e293b; line-height: 1.8;">
<code>LAG(col, n)</code> - n rows before<br/>
<code>LEAD(col, n)</code> - n rows after<br/>
<code>FIRST_VALUE(col)</code> - First in frame<br/>
<code>LAST_VALUE(col)</code> - Last in frame<br/>
<code>NTH_VALUE(col, n)</code> - nth in frame
</div>
</div>
<div>
<h4 style="color: #1e293b; margin: 0 0 12px 0;">Frame Boundaries</h4>
<div style="background: #ffffff; padding: 16px; border-radius: 10px; font-size: 13px; color: #1e293b; line-height: 1.8;">
<code>UNBOUNDED PRECEDING</code><br/>
<code>n PRECEDING</code><br/>
<code>CURRENT ROW</code><br/>
<code>n FOLLOWING</code><br/>
<code>UNBOUNDED FOLLOWING</code>
</div>
</div>
<div>
<h4 style="color: #1e293b; margin: 0 0 12px 0;">Common Patterns</h4>
<div style="background: #ffffff; padding: 16px; border-radius: 10px; font-size: 13px; color: #1e293b; line-height: 1.8;">
Running total: <code>SUM() OVER (ORDER BY)</code><br/>
Moving avg: <code>AVG() OVER (ROWS n PRECEDING)</code><br/>
Top N: <code>ROW_NUMBER() + WHERE rank <= N</code><br/>
MoM growth: <code>LAG() for comparison</code>
</div>
</div>
</div>
</div>

---

## Related Topics

- [SQL Fundamentals](/topic/sql-learning/sql-fundamentals) - Basic query building blocks
- [Subqueries and CTEs](/topic/sql-learning/subqueries-ctes) - Modular query composition
- [Joins Mastery](/topic/sql-learning/joins-mastery) - Combining tables
- [Query Optimization](/topic/sql-learning/query-optimization) - Make queries faster
- [Database Indexing](/topic/sql-learning/indexing-deep-dive) - Performance fundamentals
