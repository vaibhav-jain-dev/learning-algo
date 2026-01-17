# SQL Window Functions

## Overview

Window functions perform calculations across a set of table rows that are related to the current row. Unlike GROUP BY, window functions don't collapse rows - you keep all rows while adding computed values.

**Tags:** SQL, Analytics, Window Functions, Advanced

---

## Window Function Anatomy

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">WINDOW FUNCTION SYNTAX</h4>

<div style="background: #21262d; border-radius: 12px; padding: 20px; font-family: monospace;">
<div style="margin-bottom: 16px;">
<span style="color: #7ee787;">function</span><span style="color: #c9d1d9;">(</span><span style="color: #ffa657;">column</span><span style="color: #c9d1d9;">) </span>
<span style="color: #ff7b72;">OVER</span><span style="color: #c9d1d9;"> (</span>
</div>
<div style="margin-left: 20px; margin-bottom: 8px;">
<span style="color: #ff7b72;">PARTITION BY</span> <span style="color: #ffa657;">partition_column</span>
<span style="color: #8b949e;"> -- Groups rows (like GROUP BY)</span>
</div>
<div style="margin-left: 20px; margin-bottom: 8px;">
<span style="color: #ff7b72;">ORDER BY</span> <span style="color: #ffa657;">order_column</span>
<span style="color: #8b949e;"> -- Sorts within partition</span>
</div>
<div style="margin-left: 20px; margin-bottom: 8px;">
<span style="color: #ff7b72;">ROWS/RANGE</span> <span style="color: #ffa657;">frame_clause</span>
<span style="color: #8b949e;"> -- Defines window frame</span>
</div>
<div style="color: #c9d1d9;">)</div>
</div>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 20px;">
<div style="background: rgba(126,231,135,0.1); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px;">PARTITION BY</div>
<div style="color: #8b949e; font-size: 11px;">Divides result into groups</div>
</div>
<div style="background: rgba(88,166,255,0.1); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: #58a6ff; font-weight: bold; font-size: 12px;">ORDER BY</div>
<div style="color: #8b949e; font-size: 11px;">Sorts rows within partition</div>
</div>
<div style="background: rgba(163,113,247,0.1); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: #a371f7; font-weight: bold; font-size: 12px;">FRAME</div>
<div style="color: #8b949e; font-size: 11px;">Defines calculation window</div>
</div>
</div>
</div>

---

## Ranking Functions

### ROW_NUMBER()

Assigns a unique sequential number to each row.

```sql
SELECT
    name,
    department,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) as salary_rank
FROM employees;
```

| name    | department | salary | salary_rank |
|---------|------------|--------|-------------|
| Alice   | Sales      | 90000  | 1           |
| Bob     | IT         | 85000  | 2           |
| Charlie | Sales      | 80000  | 3           |

```sql
-- Row number within each department
SELECT
    name,
    department,
    salary,
    ROW_NUMBER() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) as dept_rank
FROM employees;
```

### RANK() and DENSE_RANK()

```sql
SELECT
    name,
    score,
    RANK() OVER (ORDER BY score DESC) as rank,
    DENSE_RANK() OVER (ORDER BY score DESC) as dense_rank
FROM students;
```

| name    | score | rank | dense_rank |
|---------|-------|------|------------|
| Alice   | 95    | 1    | 1          |
| Bob     | 95    | 1    | 1          |
| Charlie | 90    | 3    | 2          |
| David   | 85    | 4    | 3          |

<div style="background: rgba(88,166,255,0.1); border-left: 4px solid #58a6ff; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #58a6ff;">Difference:</strong>
<ul style="margin: 8px 0 0 0; color: #c9d1d9;">
<li><strong>RANK:</strong> Skips numbers after ties (1,1,3,4)</li>
<li><strong>DENSE_RANK:</strong> No gaps after ties (1,1,2,3)</li>
</ul>
</div>

### NTILE()

Divides rows into N buckets:

```sql
SELECT
    name,
    salary,
    NTILE(4) OVER (ORDER BY salary DESC) as quartile
FROM employees;
```

---

## Aggregate Window Functions

Use aggregate functions as window functions to calculate running totals, averages, etc.

### Running Total

```sql
SELECT
    date,
    amount,
    SUM(amount) OVER (ORDER BY date) as running_total
FROM transactions;
```

| date       | amount | running_total |
|------------|--------|---------------|
| 2024-01-01 | 100    | 100           |
| 2024-01-02 | 150    | 250           |
| 2024-01-03 | 75     | 325           |
| 2024-01-04 | 200    | 525           |

### Running Total per Group

```sql
SELECT
    department,
    date,
    amount,
    SUM(amount) OVER (
        PARTITION BY department
        ORDER BY date
    ) as dept_running_total
FROM expenses;
```

### Moving Averages

```sql
-- 7-day moving average
SELECT
    date,
    sales,
    AVG(sales) OVER (
        ORDER BY date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as moving_avg_7day
FROM daily_sales;
```

---

## Value Functions

### LAG() and LEAD()

Access values from previous or next rows:

```sql
SELECT
    date,
    price,
    LAG(price, 1) OVER (ORDER BY date) as prev_price,
    LEAD(price, 1) OVER (ORDER BY date) as next_price,
    price - LAG(price, 1) OVER (ORDER BY date) as price_change
FROM stock_prices;
```

| date       | price | prev_price | next_price | price_change |
|------------|-------|------------|------------|--------------|
| 2024-01-01 | 100   | NULL       | 105        | NULL         |
| 2024-01-02 | 105   | 100        | 103        | 5            |
| 2024-01-03 | 103   | 105        | 110        | -2           |

```sql
-- Calculate month-over-month growth
SELECT
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) as prev_month,
    ROUND(
        (revenue - LAG(revenue) OVER (ORDER BY month))
        / LAG(revenue) OVER (ORDER BY month) * 100,
        2
    ) as growth_pct
FROM monthly_sales;
```

### FIRST_VALUE() and LAST_VALUE()

```sql
SELECT
    employee,
    department,
    salary,
    FIRST_VALUE(salary) OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) as highest_in_dept,
    salary - FIRST_VALUE(salary) OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) as diff_from_highest
FROM employees;
```

<div style="background: rgba(248,81,73,0.1); border-left: 4px solid #f85149; padding: 16px; margin: 16px 0; border-radius: 0 8px 8px 0;">
<strong style="color: #f85149;">Warning:</strong> LAST_VALUE() requires proper frame specification!
<pre style="margin: 8px 0 0 0; background: #0d1117; padding: 8px; border-radius: 4px;"><code style="color: #c9d1d9;">LAST_VALUE(salary) OVER (
    PARTITION BY department
    ORDER BY salary DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
)</code></pre>
</div>

### NTH_VALUE()

```sql
-- Get 2nd highest salary per department
SELECT
    employee,
    department,
    salary,
    NTH_VALUE(salary, 2) OVER (
        PARTITION BY department
        ORDER BY salary DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) as second_highest
FROM employees;
```

---

## Window Frames

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">WINDOW FRAME OPTIONS</h4>

<div style="display: grid; gap: 16px;">

<div style="background: #21262d; border-radius: 8px; padding: 16px;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 12px;">ROWS BETWEEN ... AND ...</div>
<div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px;">
<code style="background: #161b22; padding: 4px 8px; border-radius: 4px; color: #ffa657; font-size: 12px;">UNBOUNDED PRECEDING</code>
<code style="background: #161b22; padding: 4px 8px; border-radius: 4px; color: #ffa657; font-size: 12px;">n PRECEDING</code>
<code style="background: #161b22; padding: 4px 8px; border-radius: 4px; color: #ffa657; font-size: 12px;">CURRENT ROW</code>
<code style="background: #161b22; padding: 4px 8px; border-radius: 4px; color: #ffa657; font-size: 12px;">n FOLLOWING</code>
<code style="background: #161b22; padding: 4px 8px; border-radius: 4px; color: #ffa657; font-size: 12px;">UNBOUNDED FOLLOWING</code>
</div>
</div>

<div style="background: #21262d; border-radius: 8px; padding: 16px;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Common Frame Examples</div>
<div style="font-size: 13px; color: #c9d1d9;">
<div style="margin-bottom: 8px;"><code style="color: #7ee787;">ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code> - Running total (default)</div>
<div style="margin-bottom: 8px;"><code style="color: #7ee787;">ROWS BETWEEN 3 PRECEDING AND CURRENT ROW</code> - Last 4 rows including current</div>
<div style="margin-bottom: 8px;"><code style="color: #7ee787;">ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING</code> - Current row ± 1</div>
<div><code style="color: #7ee787;">ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code> - Entire partition</div>
</div>
</div>

</div>
</div>

### Frame Examples

```sql
-- Running total (default behavior)
SUM(amount) OVER (ORDER BY date)

-- Equivalent to:
SUM(amount) OVER (
    ORDER BY date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
)

-- 3-row moving average (current + 2 previous)
AVG(amount) OVER (
    ORDER BY date
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
)

-- Centered moving average
AVG(amount) OVER (
    ORDER BY date
    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
)

-- Total for entire partition
SUM(amount) OVER (
    PARTITION BY category
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
)
```

---

## Practical Examples

### Top N per Group

```sql
-- Top 3 products per category by sales
WITH ranked AS (
    SELECT
        category,
        product_name,
        total_sales,
        ROW_NUMBER() OVER (
            PARTITION BY category
            ORDER BY total_sales DESC
        ) as rank
    FROM products
)
SELECT * FROM ranked WHERE rank <= 3;
```

### Percentile Ranking

```sql
SELECT
    employee,
    salary,
    PERCENT_RANK() OVER (ORDER BY salary) as percentile,
    CUME_DIST() OVER (ORDER BY salary) as cumulative_dist
FROM employees;
```

### Year-over-Year Comparison

```sql
SELECT
    year,
    month,
    revenue,
    LAG(revenue, 12) OVER (ORDER BY year, month) as revenue_last_year,
    ROUND(
        (revenue - LAG(revenue, 12) OVER (ORDER BY year, month))
        / LAG(revenue, 12) OVER (ORDER BY year, month) * 100,
        1
    ) as yoy_growth
FROM monthly_revenue;
```

### Session Analysis

```sql
-- Calculate time between events
SELECT
    user_id,
    event_time,
    event_type,
    event_time - LAG(event_time) OVER (
        PARTITION BY user_id
        ORDER BY event_time
    ) as time_since_last_event
FROM events;
```

### Running Percentage

```sql
SELECT
    date,
    category,
    sales,
    SUM(sales) OVER (PARTITION BY category ORDER BY date) as running_sales,
    ROUND(
        100.0 * SUM(sales) OVER (PARTITION BY category ORDER BY date)
        / SUM(sales) OVER (PARTITION BY category),
        2
    ) as running_pct
FROM daily_sales;
```

---

## Window vs GROUP BY

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center;">WINDOW FUNCTION vs GROUP BY</h4>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">

<div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 20px; border: 1px solid rgba(126,231,135,0.3);">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 12px;">GROUP BY</div>
<div style="font-size: 13px; color: #c9d1d9; margin-bottom: 12px;">Collapses rows into groups</div>
<pre style="background: #0d1117; padding: 10px; border-radius: 6px; font-size: 11px; margin: 0;"><code style="color: #c9d1d9;">SELECT dept, SUM(sal)
FROM employees
GROUP BY dept;

-- Result: 3 rows
| dept | sum   |
|------|-------|
| IT   | 50000 |
| HR   | 40000 |
| Sales| 60000 |</code></pre>
</div>

<div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 20px; border: 1px solid rgba(88,166,255,0.3);">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">WINDOW FUNCTION</div>
<div style="font-size: 13px; color: #c9d1d9; margin-bottom: 12px;">Keeps all rows, adds computed column</div>
<pre style="background: #0d1117; padding: 10px; border-radius: 6px; font-size: 11px; margin: 0;"><code style="color: #c9d1d9;">SELECT name, dept, sal,
  SUM(sal) OVER(PARTITION BY dept)
FROM employees;

-- Result: All 10 rows
| name  | dept | sal  | sum   |
|-------|------|------|-------|
| Alice | IT   | 5000 | 50000 |
| Bob   | IT   | 4500 | 50000 |</code></pre>
</div>

</div>
</div>

---

## Performance Tips

1. **Limit partitions** - Large number of distinct partition values can slow queries
2. **Use appropriate indexes** - Index columns in PARTITION BY and ORDER BY
3. **Be careful with frames** - Complex frame clauses increase computation
4. **Consider materialization** - For repeated window calculations, materialize intermediate results
5. **Check execution plans** - Use EXPLAIN to understand performance

---

## Interview Tips

1. **Know the difference** - Between ROW_NUMBER, RANK, and DENSE_RANK
2. **Explain frames** - Understand ROWS vs RANGE frame specifications
3. **Running totals** - Very common interview question
4. **Top-N per group** - Classic window function use case
5. **LAG/LEAD** - Know how to calculate period-over-period changes

---

## Related Topics

- [SQL Fundamentals](/topic/sql-learning/sql-fundamentals)
- [Subqueries and CTEs](/topic/sql-learning/subqueries-ctes)
- [Query Optimization](/topic/sql-learning/query-optimization)
