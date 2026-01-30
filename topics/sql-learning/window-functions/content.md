# SQL Window Functions

## Overview

Window functions perform calculations across a set of table rows that are related to the current row, without collapsing them into a single output row like GROUP BY does. They enable powerful analytics like running totals, rankings, moving averages, and row comparisons while keeping all original rows intact.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #e2e8f0;">
<h4 style="margin-top: 0; color: #1e293b; font-size: 18px;">Core Equation</h4>
<div style="font-family: 'Courier New', monospace; font-size: 16px; background: #ffffff; padding: 16px; border-radius: 8px; text-align: center; color: #1e293b; border: 1px solid #e2e8f0;">
    Window Function = Function(column) OVER (PARTITION BY grouping ORDER BY sorting FRAME specification)
</div>
</div>

Window functions are one of the most powerful features in modern SQL, transforming the language from simple data retrieval into a sophisticated analytical tool. The key insight is that <span style="color: #10b981; font-weight: 600;">window functions compute values across a "window" of rows related to the current row</span>, but unlike [[GROUP BY]](/topic/sql-learning/sql-fundamentals), they preserve all individual rows in the output.

**Critical Assumption**: Window functions assume the data fits in memory for sorting and partitioning. For extremely large datasets, ensure your database can handle the window size, or use [[query optimization]](/topic/sql-learning/query-optimization) techniques like filtering before windowing.

**Key Trade-off**: Expressiveness vs. Performance. Window functions enable complex analytics in a single query but require sorting and potentially multiple passes over data. This trade-off drives decisions about when to use window functions versus [[materialized views]](/topic/system-design/caching) or pre-computed aggregates.

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
<li>Deduplicate records keeping most recent</li>
</ul>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border-left: 4px solid #10b981; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
<div style="color: #047857; font-weight: bold; font-size: 16px; margin-bottom: 12px;">Interview Significance</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; font-size: 14px; line-height: 1.8;">
<li>Top N per group is a classic problem</li>
<li>Running totals demonstrate practical skills</li>
<li>Tests understanding of SQL execution order</li>
<li>ROW_NUMBER vs RANK is a common gotcha</li>
<li>Frame specifications separate seniors from juniors</li>
<li>Differentiates advanced from intermediate candidates</li>
</ul>
</div>
</div>
</div>

Window functions unlock analytical capabilities that would otherwise require complex [[self-joins]](/topic/sql-learning/joins-mastery), [[correlated subqueries]](/topic/sql-learning/subqueries-ctes), or application-level processing. They are essential for data analysts, business intelligence developers, and anyone working with time-series or ranked data.

---

## Section 1: Window Function Anatomy

### Deep Mechanics

Every window function consists of three components that work together: the <span style="color: #10b981; font-weight: 600;">function</span> (what calculation to perform), the <span style="color: #10b981; font-weight: 600;">OVER clause</span> (which rows to include), and optionally the <span style="color: #10b981; font-weight: 600;">frame specification</span> (which subset of the window to use).

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 24px 0; font-size: 18px; text-align: center;">WINDOW FUNCTION SYNTAX BREAKDOWN</h4>
<div style="background: #ffffff; border-radius: 12px; padding: 24px; font-family: monospace; font-size: 14px; color: #1e293b; line-height: 2.2;">
<span style="color: #10b981; font-weight: bold;">function_name</span>(<span style="color: #f59e0b;">expression</span>) <span style="color: #8b5cf6; font-weight: bold;">OVER</span> (<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #3b82f6; font-weight: bold;">PARTITION BY</span> <span style="color: #475569;">partition_columns</span> <span style="color: #94a3b8;">-- Divides data into groups</span><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #ec4899; font-weight: bold;">ORDER BY</span> <span style="color: #475569;">sort_columns</span> <span style="color: #94a3b8;">-- Defines row order within partition</span><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #06b6d4; font-weight: bold;">ROWS/RANGE BETWEEN</span> <span style="color: #475569;">start AND end</span> <span style="color: #94a3b8;">-- Frame specification</span><br/>
)
</div>
</div>

### Component Deep Dive

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
<div style="background: #dbeafe; padding: 20px; border-radius: 12px;">
<div style="color: #1e40af; font-weight: bold; font-size: 15px; margin-bottom: 12px;">PARTITION BY</div>
<div style="color: #475569; font-size: 13px; line-height: 1.6;">
<p style="margin: 0 0 8px 0;"><strong>Purpose:</strong> Divides rows into independent groups</p>
<p style="margin: 0 0 8px 0;"><strong>Analogy:</strong> Like GROUP BY but keeps all rows</p>
<p style="margin: 0 0 8px 0;"><strong>If omitted:</strong> Entire result set is one partition</p>
<p style="margin: 0;"><strong>Performance:</strong> Triggers sort or hash operation</p>
</div>
</div>
<div style="background: #fce7f3; padding: 20px; border-radius: 12px;">
<div style="color: #be185d; font-weight: bold; font-size: 15px; margin-bottom: 12px;">ORDER BY</div>
<div style="color: #475569; font-size: 13px; line-height: 1.6;">
<p style="margin: 0 0 8px 0;"><strong>Purpose:</strong> Defines logical row order</p>
<p style="margin: 0 0 8px 0;"><strong>Required for:</strong> Rankings, running totals, LAG/LEAD</p>
<p style="margin: 0 0 8px 0;"><strong>If omitted:</strong> Order is non-deterministic</p>
<p style="margin: 0;"><strong>Impact:</strong> Sets default frame to RANGE UNBOUNDED PRECEDING</p>
</div>
</div>
<div style="background: #cffafe; padding: 20px; border-radius: 12px;">
<div style="color: #0891b2; font-weight: bold; font-size: 15px; margin-bottom: 12px;">FRAME</div>
<div style="color: #475569; font-size: 13px; line-height: 1.6;">
<p style="margin: 0 0 8px 0;"><strong>Purpose:</strong> Limits rows for calculation</p>
<p style="margin: 0 0 8px 0;"><strong>Types:</strong> ROWS (physical) vs RANGE (logical)</p>
<p style="margin: 0 0 8px 0;"><strong>Default:</strong> Depends on ORDER BY presence</p>
<p style="margin: 0;"><strong>Use case:</strong> Moving averages, sliding windows</p>
</div>
</div>
</div>
</div>

### SQL Execution Order with Window Functions

Understanding <span style="color: #10b981; font-weight: 600;">when window functions execute</span> is critical for writing correct queries. Window functions execute after WHERE, GROUP BY, and HAVING, but before ORDER BY and LIMIT.

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 2px solid #22c55e; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #166534; margin: 0 0 20px 0; text-align: center;">SQL Logical Execution Order</h4>
<div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
<div style="background: #ffffff; padding: 12px 16px; border-radius: 8px; font-weight: bold; font-size: 12px; color: #475569; border: 2px solid #e2e8f0;">1. FROM/JOIN</div>
<span style="color: #22c55e; font-weight: bold; font-size: 18px;">→</span>
<div style="background: #ffffff; padding: 12px 16px; border-radius: 8px; font-weight: bold; font-size: 12px; color: #475569; border: 2px solid #e2e8f0;">2. WHERE</div>
<span style="color: #22c55e; font-weight: bold; font-size: 18px;">→</span>
<div style="background: #ffffff; padding: 12px 16px; border-radius: 8px; font-weight: bold; font-size: 12px; color: #475569; border: 2px solid #e2e8f0;">3. GROUP BY</div>
<span style="color: #22c55e; font-weight: bold; font-size: 18px;">→</span>
<div style="background: #ffffff; padding: 12px 16px; border-radius: 8px; font-weight: bold; font-size: 12px; color: #475569; border: 2px solid #e2e8f0;">4. HAVING</div>
<span style="color: #22c55e; font-weight: bold; font-size: 18px;">→</span>
<div style="background: #dcfce7; padding: 12px 16px; border-radius: 8px; font-weight: bold; font-size: 12px; color: #166534; border: 2px solid #22c55e;">5. WINDOW</div>
<span style="color: #22c55e; font-weight: bold; font-size: 18px;">→</span>
<div style="background: #ffffff; padding: 12px 16px; border-radius: 8px; font-weight: bold; font-size: 12px; color: #475569; border: 2px solid #e2e8f0;">6. SELECT</div>
<span style="color: #22c55e; font-weight: bold; font-size: 18px;">→</span>
<div style="background: #ffffff; padding: 12px 16px; border-radius: 8px; font-weight: bold; font-size: 12px; color: #475569; border: 2px solid #e2e8f0;">7. ORDER BY</div>
<span style="color: #22c55e; font-weight: bold; font-size: 18px;">→</span>
<div style="background: #ffffff; padding: 12px 16px; border-radius: 8px; font-weight: bold; font-size: 12px; color: #475569; border: 2px solid #e2e8f0;">8. LIMIT</div>
</div>
<div style="margin-top: 16px; background: #ffffff; padding: 16px; border-radius: 8px; text-align: center;">
<span style="color: #166534; font-weight: bold;">Key Insight:</span> <span style="color: #475569;">You cannot filter on window function results in WHERE. Use a [[CTE]](/topic/sql-learning/subqueries-ctes) or subquery instead.</span>
</div>
</div>

---

## Section 2: PARTITION BY Deep Dive

### Understanding Partitions

<span style="color: #10b981; font-weight: 600;">PARTITION BY</span> divides the result set into partitions (groups) where the window function is applied independently. Think of it as creating separate "windows" for each group.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">PARTITION BY Visualization</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; font-size: 14px; margin-bottom: 16px; text-align: center;">Without PARTITION BY</div>
<div style="background: #dbeafe; padding: 8px; border-radius: 6px; margin-bottom: 8px; font-size: 12px; text-align: center;">Engineering: Alice ($95K)</div>
<div style="background: #dbeafe; padding: 8px; border-radius: 6px; margin-bottom: 8px; font-size: 12px; text-align: center;">Engineering: Bob ($85K)</div>
<div style="background: #dbeafe; padding: 8px; border-radius: 6px; margin-bottom: 8px; font-size: 12px; text-align: center;">Sales: Diana ($80K)</div>
<div style="background: #dbeafe; padding: 8px; border-radius: 6px; margin-bottom: 8px; font-size: 12px; text-align: center;">Sales: Eve ($70K)</div>
<div style="background: #dbeafe; padding: 8px; border-radius: 6px; font-size: 12px; text-align: center;">HR: Frank ($65K)</div>
<div style="margin-top: 12px; text-align: center; color: #475569; font-size: 12px;">One window = entire result set</div>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #10b981;">
<div style="color: #047857; font-weight: bold; font-size: 14px; margin-bottom: 16px; text-align: center;">With PARTITION BY department</div>
<div style="background: #dcfce7; padding: 8px; border-radius: 6px; margin-bottom: 4px; font-size: 12px; text-align: center; border-left: 3px solid #22c55e;">Engineering: Alice ($95K)</div>
<div style="background: #dcfce7; padding: 8px; border-radius: 6px; margin-bottom: 12px; font-size: 12px; text-align: center; border-left: 3px solid #22c55e;">Engineering: Bob ($85K)</div>
<div style="background: #fef3c7; padding: 8px; border-radius: 6px; margin-bottom: 4px; font-size: 12px; text-align: center; border-left: 3px solid #f59e0b;">Sales: Diana ($80K)</div>
<div style="background: #fef3c7; padding: 8px; border-radius: 6px; margin-bottom: 12px; font-size: 12px; text-align: center; border-left: 3px solid #f59e0b;">Sales: Eve ($70K)</div>
<div style="background: #fce7f3; padding: 8px; border-radius: 6px; font-size: 12px; text-align: center; border-left: 3px solid #ec4899;">HR: Frank ($65K)</div>
<div style="margin-top: 12px; text-align: center; color: #475569; font-size: 12px;">Separate windows per department</div>
</div>
</div>
</div>

### PARTITION BY Examples

```sql
-- Sample data for all examples
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(50),
    salary DECIMAL(10,2),
    hire_date DATE
);

INSERT INTO employees (id, name, department, salary, hire_date) VALUES
    (1, 'Alice', 'Engineering', 95000, '2020-01-15'),
    (2, 'Bob', 'Engineering', 85000, '2021-03-20'),
    (3, 'Charlie', 'Engineering', 75000, '2022-06-10'),
    (4, 'Diana', 'Sales', 80000, '2019-08-01'),
    (5, 'Eve', 'Sales', 70000, '2021-11-15'),
    (6, 'Frank', 'HR', 65000, '2020-04-22'),
    (7, 'Grace', 'HR', 60000, '2023-01-10');
```

```sql
-- Compare salary to department average (preserving all rows)
SELECT
    name,
    department,
    salary,
    AVG(salary) OVER (PARTITION BY department) AS dept_avg,
    salary - AVG(salary) OVER (PARTITION BY department) AS diff_from_avg,
    ROUND(100.0 * salary / SUM(salary) OVER (PARTITION BY department), 2) AS pct_of_dept
FROM employees
ORDER BY department, salary DESC;

-- Result shows each row with its department context:
-- | name    | department  | salary | dept_avg | diff_from_avg | pct_of_dept |
-- |---------|-------------|--------|----------|---------------|-------------|
-- | Alice   | Engineering | 95000  | 85000.00 | 10000.00      | 37.25       |
-- | Bob     | Engineering | 85000  | 85000.00 | 0.00          | 33.33       |
-- | Charlie | Engineering | 75000  | 85000.00 | -10000.00     | 29.41       |
-- | Diana   | Sales       | 80000  | 75000.00 | 5000.00       | 53.33       |
-- | Eve     | Sales       | 70000  | 75000.00 | -5000.00      | 46.67       |
```

### Multiple PARTITION BY Columns

```sql
-- Partition by multiple columns for finer granularity
SELECT
    name,
    department,
    EXTRACT(YEAR FROM hire_date) AS hire_year,
    salary,
    ROW_NUMBER() OVER (
        PARTITION BY department, EXTRACT(YEAR FROM hire_date)
        ORDER BY salary DESC
    ) AS rank_in_dept_year
FROM employees;
```

### PARTITION BY Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: What does PARTITION BY do in a window function?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> <span style="color: #10b981; font-weight: 600;">PARTITION BY</span> divides the result set into groups (partitions) based on column values. The window function is then applied independently within each partition. Unlike GROUP BY, PARTITION BY preserves all individual rows in the output while still allowing aggregate calculations within each group.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: How does PARTITION BY differ from GROUP BY, and when would you use each?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> GROUP BY <span style="color: #10b981; font-weight: 600;">collapses</span> multiple rows into single summary rows, while PARTITION BY <span style="color: #10b981; font-weight: 600;">preserves</span> all rows and adds computed values as new columns. Use GROUP BY when you need one row per group (e.g., total sales per region). Use PARTITION BY when you need every row plus group-level context (e.g., each sale with its region's total). A key distinction: with GROUP BY, you can only SELECT grouped columns and aggregates; with PARTITION BY, you can SELECT any column.</p>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: What are the performance implications of PARTITION BY, and how does the database engine process partitions internally?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> PARTITION BY triggers a <span style="color: #10b981; font-weight: 600;">sort operation</span> on the partition columns (unless an existing index satisfies the order). The database engine processes partitions using one of two strategies: (1) <strong>Sort-based</strong>: sorts entire result set by partition keys, then streams through sorted data - O(n log n) time, memory-efficient for large data. (2) <strong>Hash-based</strong>: builds hash table grouping rows by partition key - O(n) time but requires memory proportional to number of distinct partition values. For optimal performance: create composite indexes matching (partition_cols, order_cols), minimize distinct partition values, and filter data with WHERE before windowing. Related: [[database indexing]](/topic/sql-learning/indexing-deep-dive) strategies for window function optimization.</p>
</div>
</div>
</div>

---

## Section 3: ORDER BY in Window Functions

### Understanding Window Ordering

<span style="color: #10b981; font-weight: 600;">ORDER BY within OVER()</span> serves two critical purposes: it defines the logical order of rows for ranking functions and LAG/LEAD, and it determines the default frame for aggregate functions.

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="color: #92400e; font-weight: bold; font-size: 15px; margin-bottom: 12px;">Critical Insight: ORDER BY Changes Default Frame</div>
<div style="color: #78350f; font-size: 14px; line-height: 1.7;">
    When ORDER BY is present in OVER(), the default frame changes from <code>RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code> (entire partition) to <code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code> (running calculation). This is why <code>SUM() OVER (ORDER BY date)</code> produces a running total, not a grand total!
</div>
</div>

### ORDER BY Behavior Demonstration

```sql
-- Same function, different behavior based on ORDER BY presence
SELECT
    sale_date,
    amount,
    -- No ORDER BY: entire partition (grand total)
    SUM(amount) OVER () AS grand_total,
    -- With ORDER BY: running total (default frame kicks in)
    SUM(amount) OVER (ORDER BY sale_date) AS running_total,
    -- Explicit full partition with ORDER BY
    SUM(amount) OVER (
        ORDER BY sale_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS explicit_grand_total
FROM sales
ORDER BY sale_date;

-- Result:
-- | sale_date  | amount | grand_total | running_total | explicit_grand_total |
-- |------------|--------|-------------|---------------|----------------------|
-- | 2024-01-15 | 5000   | 26000       | 5000          | 26000                |
-- | 2024-01-18 | 6000   | 26000       | 11000         | 26000                |
-- | 2024-01-22 | 3500   | 26000       | 14500         | 26000                |
```

### Multiple ORDER BY Columns

```sql
-- Order by multiple columns for deterministic results
SELECT
    name,
    department,
    salary,
    hire_date,
    ROW_NUMBER() OVER (
        PARTITION BY department
        ORDER BY salary DESC, hire_date ASC, id ASC  -- Tiebreakers!
    ) AS rank
FROM employees;
```

<div style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border: 2px solid #f87171; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="color: #991b1b; font-weight: bold; font-size: 14px; margin-bottom: 8px;">Interview Gotcha: Non-Deterministic Results</div>
<div style="color: #7f1d1d; font-size: 14px; line-height: 1.7;">If ORDER BY columns are not unique within a partition, <span style="color: #10b981; font-weight: 600;">ROW_NUMBER()</span> will assign arbitrary numbers to ties (different on each run!). Always include a unique column as the final tiebreaker for deterministic results.</div>
</div>

### ORDER BY Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: Why is ORDER BY important in window functions?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> ORDER BY defines the logical sequence of rows within each partition. It's <span style="color: #10b981; font-weight: 600;">required</span> for ranking functions (ROW_NUMBER, RANK, DENSE_RANK), offset functions (LAG, LEAD), and running calculations (running totals, moving averages). Without ORDER BY, these functions either error or produce undefined results.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: How does ORDER BY in OVER() affect the default frame for aggregate window functions?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> When ORDER BY is <span style="color: #10b981; font-weight: 600;">absent</span>, the default frame is the entire partition (RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING). When ORDER BY is <span style="color: #10b981; font-weight: 600;">present</span>, the default frame becomes RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW. This causes aggregates like SUM() to compute running totals instead of grand totals. For example, <code>SUM(amount) OVER ()</code> gives the same total for every row, while <code>SUM(amount) OVER (ORDER BY date)</code> gives an increasing running total.</p>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: Explain the difference between RANGE and ROWS for the default frame when ORDER BY has duplicate values.</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> The default frame uses <span style="color: #10b981; font-weight: 600;">RANGE</span> (not ROWS), which has crucial implications for duplicates. RANGE groups rows with equal ORDER BY values together - they're considered "peers" and included in the same frame. ROWS counts physical rows regardless of value equality. Example: with dates [Jan 1, Jan 1, Jan 2] ordered by date, <code>SUM() OVER (ORDER BY date RANGE CURRENT ROW)</code> at the first Jan 1 includes BOTH Jan 1 rows (sum of 2 rows), while <code>SUM() OVER (ORDER BY date ROWS CURRENT ROW)</code> includes only the current physical row (sum of 1 row). This explains why running totals may "jump" at duplicate values when using the RANGE default. For predictable behavior with duplicates, either add tiebreaker columns to ORDER BY or explicitly specify ROWS instead of RANGE.</p>
</div>
</div>
</div>

---

## Section 4: Ranking Functions

Ranking functions assign a position to each row based on the ORDER BY expression. Understanding the subtle differences between them is a <span style="color: #10b981; font-weight: 600;">common interview topic</span>.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">Ranking Function Comparison with Ties</h4>
<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 8px; overflow: hidden;">
<thead>
  <tr style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border: 2px solid #e2e8f0;">
  <th style="padding: 16px; text-align: left; font-weight: 600;">Name</th>
  <th style="padding: 16px; text-align: center; font-weight: 600;">Score</th>
  <th style="padding: 16px; text-align: center; font-weight: 600;">ROW_NUMBER()</th>
  <th style="padding: 16px; text-align: center; font-weight: 600;">RANK()</th>
  <th style="padding: 16px; text-align: center; font-weight: 600;">DENSE_RANK()</th>
  <th style="padding: 16px; text-align: center; font-weight: 600;">NTILE(3)</th>
  </tr>
</thead>
<tbody>
  <tr style="background: #f8fafc;">
  <td style="padding: 14px; border-bottom: 1px solid #e2e8f0;">Alice</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; font-weight: bold;">95</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #3b82f6; font-weight: bold;">1</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #10b981; font-weight: bold;">1</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #f59e0b; font-weight: bold;">1</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #8b5cf6; font-weight: bold;">1</td>
  </tr>
  <tr>
  <td style="padding: 14px; border-bottom: 1px solid #e2e8f0;">Bob</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; font-weight: bold;">95</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #3b82f6; font-weight: bold;">2</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #10b981; font-weight: bold;">1</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #f59e0b; font-weight: bold;">1</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #8b5cf6; font-weight: bold;">1</td>
  </tr>
  <tr style="background: #f8fafc;">
  <td style="padding: 14px; border-bottom: 1px solid #e2e8f0;">Charlie</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; font-weight: bold;">90</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #3b82f6; font-weight: bold;">3</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #10b981; font-weight: bold;">3 ⚠️</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #f59e0b; font-weight: bold;">2</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #8b5cf6; font-weight: bold;">2</td>
  </tr>
  <tr>
  <td style="padding: 14px; border-bottom: 1px solid #e2e8f0;">Diana</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; font-weight: bold;">85</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #3b82f6; font-weight: bold;">4</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #10b981; font-weight: bold;">4</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #f59e0b; font-weight: bold;">3</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #8b5cf6; font-weight: bold;">2</td>
  </tr>
  <tr style="background: #f8fafc;">
  <td style="padding: 14px; border-bottom: 1px solid #e2e8f0;">Eve</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; font-weight: bold;">85</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #3b82f6; font-weight: bold;">5</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #10b981; font-weight: bold;">4</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #f59e0b; font-weight: bold;">3</td>
  <td style="padding: 14px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #8b5cf6; font-weight: bold;">3</td>
  </tr>
  <tr>
  <td style="padding: 14px;">Frank</td>
  <td style="padding: 14px; text-align: center; font-weight: bold;">80</td>
  <td style="padding: 14px; text-align: center; color: #3b82f6; font-weight: bold;">6</td>
  <td style="padding: 14px; text-align: center; color: #10b981; font-weight: bold;">6 ⚠️</td>
  <td style="padding: 14px; text-align: center; color: #f59e0b; font-weight: bold;">4</td>
  <td style="padding: 14px; text-align: center; color: #8b5cf6; font-weight: bold;">3</td>
  </tr>
</tbody>
</table>
</div>
<div style="margin-top: 16px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
<div style="background: #dbeafe; padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: bold; font-size: 12px;">ROW_NUMBER</div>
<div style="color: #475569; font-size: 11px; margin-top: 4px;">Always unique (1,2,3,4,5,6)</div>
</div>
<div style="background: #dcfce7; padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: #166534; font-weight: bold; font-size: 12px;">RANK</div>
<div style="color: #475569; font-size: 11px; margin-top: 4px;">Ties share, gaps after (1,1,3)</div>
</div>
<div style="background: #fef3c7; padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: #92400e; font-weight: bold; font-size: 12px;">DENSE_RANK</div>
<div style="color: #475569; font-size: 11px; margin-top: 4px;">Ties share, no gaps (1,1,2)</div>
</div>
<div style="background: #ede9fe; padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: #5b21b6; font-weight: bold; font-size: 12px;">NTILE(n)</div>
<div style="color: #475569; font-size: 11px; margin-top: 4px;">Divides into n buckets</div>
</div>
</div>
</div>

### ROW_NUMBER() - Unique Sequential Numbers

```sql
-- Assign unique row numbers, handling ties arbitrarily
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

-- Classic pattern: Top N per group
WITH ranked AS (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY department
            ORDER BY salary DESC
        ) AS rn
    FROM employees
)
SELECT * FROM ranked WHERE rn <= 2;  -- Top 2 per department
```

### RANK() vs DENSE_RANK()

```sql
-- When to use which:
-- RANK: Sports rankings ("tied for 1st, next is 3rd")
-- DENSE_RANK: Top N values ("show me the 3 highest salaries")

SELECT
    name,
    salary,
    RANK() OVER (ORDER BY salary DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;

-- Get employees with the 3 highest distinct salaries
-- (DENSE_RANK ensures we get exactly 3 salary levels)
WITH ranked AS (
    SELECT *, DENSE_RANK() OVER (ORDER BY salary DESC) AS dr
    FROM employees
)
SELECT * FROM ranked WHERE dr <= 3;
```

### NTILE() - Percentile Buckets

```sql
-- Divide employees into quartiles by salary
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

-- Note: NTILE distributes as evenly as possible
-- With 7 employees and NTILE(4): buckets get 2,2,2,1 rows
```

### Ranking Functions Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: What is the difference between ROW_NUMBER, RANK, and DENSE_RANK?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> <span style="color: #10b981; font-weight: 600;">ROW_NUMBER</span> assigns unique sequential integers (1,2,3...) regardless of ties. <span style="color: #10b981; font-weight: 600;">RANK</span> gives ties the same rank but leaves gaps (1,1,3). <span style="color: #10b981; font-weight: 600;">DENSE_RANK</span> gives ties the same rank with no gaps (1,1,2). Use ROW_NUMBER for unique identification, RANK for competition-style rankings, DENSE_RANK when you need exactly N distinct rank values.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you get the top 3 employees by salary from each department, including ties for 3rd place?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Use <span style="color: #10b981; font-weight: 600;">DENSE_RANK()</span> instead of ROW_NUMBER() to handle ties correctly. With ROW_NUMBER, if two employees tie for 3rd, one is arbitrarily excluded. With RANK or DENSE_RANK, both are included. DENSE_RANK is preferred over RANK here because RANK might skip values (if there's a tie for 2nd, the next rank is 4, not 3).</p>

```sql
WITH ranked AS (
    SELECT *,
        DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dr
    FROM employees
)
SELECT * FROM ranked WHERE dr <= 3;
```

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: How would you implement a ranking that considers ties but also respects a maximum count limit (e.g., "top 5 employees, but if 7 people tie for 5th, include all 7")?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> This requires combining DENSE_RANK for tie handling with a conditional check on the last included rank. First, find the DENSE_RANK value at position N (the "cutoff rank"), then include all rows with rank <= that cutoff. This handles the edge case where the Nth position is part of a larger tie group.</p>

```sql
WITH ranked AS (
    SELECT *,
        DENSE_RANK() OVER (ORDER BY salary DESC) AS dr,
        ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn
    FROM employees
),
cutoff AS (
    -- Find the dense_rank of the 5th row (by row_number)
    SELECT dr AS cutoff_rank FROM ranked WHERE rn = 5
)
SELECT r.* FROM ranked r, cutoff c
WHERE r.dr <= c.cutoff_rank;
-- This returns all employees whose dense_rank is <= the rank of the 5th position
-- If rows 5,6,7 all tie, cutoff_rank captures that rank, including all 3
```

<p style="color: #1e293b; line-height: 1.7; font-size: 14px; margin-top: 12px;">Alternative approach using <code>PERCENT_RANK()</code> or <code>CUME_DIST()</code> for percentile-based cutoffs when dealing with statistical distributions.</p>
</div>
</div>
</div>

---

## Section 5: LAG and LEAD Functions

<span style="color: #10b981; font-weight: 600;">LAG and LEAD</span> are offset functions that access values from other rows relative to the current row. They're essential for comparing consecutive records, calculating changes, and analyzing time-series data.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">LAG and LEAD Visualization</h4>
<div style="display: flex; justify-content: center; gap: 40px; flex-wrap: wrap;">
<div style="text-align: center;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 12px;">LAG(value, n)</div>
<div style="display: flex; flex-direction: column; gap: 4px;">
<div style="background: #dbeafe; padding: 8px 24px; border-radius: 4px; font-size: 13px;">Row -2</div>
<div style="background: #93c5fd; padding: 8px 24px; border-radius: 4px; font-size: 13px;">Row -1 (LAG 1)</div>
<div style="background: #3b82f6; padding: 8px 24px; border-radius: 4px; font-size: 13px; border: 2px solid #e2e8f0; font-weight: bold;">Current Row</div>
<div style="background: #e2e8f0; padding: 8px 24px; border-radius: 4px; font-size: 13px; color: #94a3b8;">Row +1</div>
<div style="background: #e2e8f0; padding: 8px 24px; border-radius: 4px; font-size: 13px; color: #94a3b8;">Row +2</div>
</div>
<div style="color: #475569; font-size: 12px; margin-top: 8px;">Looks backward ⬆️</div>
</div>
<div style="text-align: center;">
<div style="color: #047857; font-weight: bold; margin-bottom: 12px;">LEAD(value, n)</div>
<div style="display: flex; flex-direction: column; gap: 4px;">
<div style="background: #e2e8f0; padding: 8px 24px; border-radius: 4px; font-size: 13px; color: #94a3b8;">Row -2</div>
<div style="background: #e2e8f0; padding: 8px 24px; border-radius: 4px; font-size: 13px; color: #94a3b8;">Row -1</div>
<div style="background: #10b981; padding: 8px 24px; border-radius: 4px; font-size: 13px; border: 2px solid #e2e8f0; font-weight: bold;">Current Row</div>
<div style="background: #6ee7b7; padding: 8px 24px; border-radius: 4px; font-size: 13px;">Row +1 (LEAD 1)</div>
<div style="background: #a7f3d0; padding: 8px 24px; border-radius: 4px; font-size: 13px;">Row +2</div>
</div>
<div style="color: #475569; font-size: 12px; margin-top: 8px;">Looks forward ⬇️</div>
</div>
</div>
</div>

### LAG() and LEAD() Syntax

```sql
-- Full syntax
LAG(column, offset, default_value) OVER (PARTITION BY ... ORDER BY ...)
LEAD(column, offset, default_value) OVER (PARTITION BY ... ORDER BY ...)

-- offset: number of rows back/forward (default 1)
-- default_value: returned when offset goes beyond partition bounds (default NULL)
```

### Practical Examples

```sql
-- Sales table for examples
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    salesperson VARCHAR(100),
    region VARCHAR(50),
    amount DECIMAL(10,2),
    sale_date DATE
);

INSERT INTO sales (salesperson, region, amount, sale_date) VALUES
    ('Diana', 'West', 5000, '2024-01-15'),
    ('Diana', 'West', 3500, '2024-01-22'),
    ('Diana', 'West', 4200, '2024-02-10'),
    ('Eve', 'East', 6000, '2024-01-18'),
    ('Eve', 'East', 2800, '2024-02-05'),
    ('Eve', 'East', 4500, '2024-02-20');
```

```sql
-- Compare each sale to previous sale
SELECT
    sale_date,
    salesperson,
    amount,
    LAG(amount) OVER (ORDER BY sale_date) AS prev_amount,
    amount - LAG(amount) OVER (ORDER BY sale_date) AS change,
    LEAD(amount) OVER (ORDER BY sale_date) AS next_amount
FROM sales
ORDER BY sale_date;

-- Result:
-- | sale_date  | salesperson | amount | prev_amount | change | next_amount |
-- |------------|-------------|--------|-------------|--------|-------------|
-- | 2024-01-15 | Diana       | 5000   | NULL        | NULL   | 6000        |
-- | 2024-01-18 | Eve         | 6000   | 5000        | 1000   | 3500        |
-- | 2024-01-22 | Diana       | 3500   | 6000        | -2500  | 2800        |
```

```sql
-- Compare within partition (each salesperson separately)
SELECT
    sale_date,
    salesperson,
    amount,
    LAG(amount) OVER (
        PARTITION BY salesperson
        ORDER BY sale_date
    ) AS prev_amount_same_person,
    LAG(amount, 1, 0) OVER (  -- Default to 0 for first row
        PARTITION BY salesperson
        ORDER BY sale_date
    ) AS prev_with_default
FROM sales
ORDER BY salesperson, sale_date;
```

### Month-over-Month and Year-over-Year Analysis

```sql
-- Calculate MoM and YoY growth
WITH monthly_sales AS (
    SELECT
        DATE_TRUNC('month', sale_date) AS month,
        SUM(amount) AS total
    FROM sales
    GROUP BY DATE_TRUNC('month', sale_date)
)
SELECT
    month,
    total,
    LAG(total, 1) OVER (ORDER BY month) AS prev_month,
    LAG(total, 12) OVER (ORDER BY month) AS same_month_last_year,
    ROUND(
        100.0 * (total - LAG(total, 1) OVER (ORDER BY month))
        / NULLIF(LAG(total, 1) OVER (ORDER BY month), 0),
        2
    ) AS mom_growth_pct,
    ROUND(
        100.0 * (total - LAG(total, 12) OVER (ORDER BY month))
        / NULLIF(LAG(total, 12) OVER (ORDER BY month), 0),
        2
    ) AS yoy_growth_pct
FROM monthly_sales
ORDER BY month;
```

### Gap Detection with LAG

```sql
-- Find gaps in daily data
SELECT
    sale_date,
    LAG(sale_date) OVER (ORDER BY sale_date) AS prev_date,
    sale_date - LAG(sale_date) OVER (ORDER BY sale_date) AS days_gap
FROM sales
WHERE sale_date - LAG(sale_date) OVER (ORDER BY sale_date) > 3;
-- Find gaps larger than 3 days
```

### LAG/LEAD Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: What do LAG and LEAD functions do?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> <span style="color: #10b981; font-weight: 600;">LAG</span> accesses a value from a previous row (looks backward), while <span style="color: #10b981; font-weight: 600;">LEAD</span> accesses a value from a subsequent row (looks forward). Both require ORDER BY to define the row sequence. Common use cases include calculating row-to-row differences, detecting changes, and comparing current values to previous/next periods.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you handle NULL values returned by LAG/LEAD at partition boundaries?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Three approaches: (1) Use the optional third parameter as a default value: <code>LAG(amount, 1, 0)</code> returns 0 instead of NULL for the first row. (2) Wrap in <code>COALESCE(LAG(...), default_value)</code> for more complex defaults. (3) Filter out NULLs in a [[CTE]](/topic/sql-learning/subqueries-ctes): <code>WHERE prev_amount IS NOT NULL</code>. The third parameter approach is most efficient as it avoids additional function calls.</p>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: How would you efficiently detect consecutive rows that meet a condition (e.g., 3 consecutive sales above $5000)?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> This is the "islands and gaps" problem. Use LAG to check if conditions are met in consecutive rows, then use a running count to identify streak lengths.</p>

```sql
WITH flagged AS (
    SELECT *,
        CASE WHEN amount > 5000 THEN 1 ELSE 0 END AS is_above,
        CASE WHEN LAG(amount) OVER (ORDER BY sale_date) > 5000
             AND amount > 5000 THEN 0 ELSE 1 END AS streak_start
    FROM sales
),
streaks AS (
    SELECT *,
        SUM(streak_start) OVER (ORDER BY sale_date) AS streak_id
    FROM flagged
    WHERE is_above = 1
)
SELECT streak_id, COUNT(*) AS streak_length, MIN(sale_date), MAX(sale_date)
FROM streaks
GROUP BY streak_id
HAVING COUNT(*) >= 3;  -- Find streaks of 3+ consecutive
```

<p style="color: #1e293b; line-height: 1.7; font-size: 14px; margin-top: 12px;">Alternative: Use <code>ROW_NUMBER() - DENSE_RANK()</code> to identify groups, or recursive [[CTEs]](/topic/sql-learning/subqueries-ctes) for complex multi-column streak detection.</p>
</div>
</div>
</div>

---

## Section 6: Running Totals and Cumulative Calculations

<span style="color: #10b981; font-weight: 600;">Running totals</span> (cumulative sums) are one of the most common window function patterns. They demonstrate the power of window functions over traditional GROUP BY approaches.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">Running Total Visualization</h4>
<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 8px; overflow: hidden;">
<thead>
  <tr style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border: 2px solid #e2e8f0;">
  <th style="padding: 14px; text-align: left;">Date</th>
  <th style="padding: 14px; text-align: right;">Amount</th>
  <th style="padding: 14px; text-align: right;">Running Total</th>
  <th style="padding: 14px; text-align: left;">Frame Used</th>
  </tr>
</thead>
<tbody>
  <tr style="background: #f0fdf4;">
  <td style="padding: 12px; border-bottom: 1px solid #d1fae5;">Jan 15</td>
  <td style="padding: 12px; text-align: right; border-bottom: 1px solid #d1fae5;">$5,000</td>
  <td style="padding: 12px; text-align: right; border-bottom: 1px solid #d1fae5; font-weight: bold; color: #059669;">$5,000</td>
  <td style="padding: 12px; border-bottom: 1px solid #d1fae5; font-size: 12px; color: #475569;">[Jan 15]</td>
  </tr>
  <tr>
  <td style="padding: 12px; border-bottom: 1px solid #d1fae5;">Jan 18</td>
  <td style="padding: 12px; text-align: right; border-bottom: 1px solid #d1fae5;">$6,000</td>
  <td style="padding: 12px; text-align: right; border-bottom: 1px solid #d1fae5; font-weight: bold; color: #059669;">$11,000</td>
  <td style="padding: 12px; border-bottom: 1px solid #d1fae5; font-size: 12px; color: #475569;">[Jan 15, Jan 18]</td>
  </tr>
  <tr style="background: #f0fdf4;">
  <td style="padding: 12px; border-bottom: 1px solid #d1fae5;">Jan 22</td>
  <td style="padding: 12px; text-align: right; border-bottom: 1px solid #d1fae5;">$3,500</td>
  <td style="padding: 12px; text-align: right; border-bottom: 1px solid #d1fae5; font-weight: bold; color: #059669;">$14,500</td>
  <td style="padding: 12px; border-bottom: 1px solid #d1fae5; font-size: 12px; color: #475569;">[Jan 15, Jan 18, Jan 22]</td>
  </tr>
  <tr>
  <td style="padding: 12px;">Feb 10</td>
  <td style="padding: 12px; text-align: right;">$4,200</td>
  <td style="padding: 12px; text-align: right; font-weight: bold; color: #059669;">$18,700</td>
  <td style="padding: 12px; font-size: 12px; color: #475569;">[Jan 15, Jan 18, Jan 22, Feb 10]</td>
  </tr>
</tbody>
</table>
</div>
</div>

### Running Total Patterns

```sql
-- Basic running total
SELECT
    sale_date,
    amount,
    SUM(amount) OVER (ORDER BY sale_date) AS running_total
FROM sales;

-- Running total per partition
SELECT
    salesperson,
    sale_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY salesperson
        ORDER BY sale_date
    ) AS person_running_total
FROM sales;

-- Running percentage of total
SELECT
    sale_date,
    amount,
    SUM(amount) OVER (ORDER BY sale_date) AS running_total,
    SUM(amount) OVER () AS grand_total,
    ROUND(
        100.0 * SUM(amount) OVER (ORDER BY sale_date) / SUM(amount) OVER (),
        2
    ) AS cumulative_pct
FROM sales;
```

### Moving Averages

```sql
-- 3-period moving average (current row + 2 preceding)
SELECT
    sale_date,
    amount,
    ROUND(AVG(amount) OVER (
        ORDER BY sale_date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ), 2) AS moving_avg_3,
    -- Centered moving average (smoother for trend analysis)
    ROUND(AVG(amount) OVER (
        ORDER BY sale_date
        ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
    ), 2) AS centered_avg_3
FROM sales;
```

### Cumulative Distribution

```sql
-- Cumulative distribution and percentiles
SELECT
    name,
    salary,
    CUME_DIST() OVER (ORDER BY salary) AS cumulative_dist,
    PERCENT_RANK() OVER (ORDER BY salary) AS percent_rank,
    NTILE(100) OVER (ORDER BY salary) AS percentile
FROM employees;
-- cumulative_dist: % of rows with value <= current
-- percent_rank: relative rank (0 to 1)
-- NTILE(100): approximate percentile bucket
```

### Running Totals Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: How do you calculate a running total in SQL?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Use <code>SUM(column) OVER (ORDER BY date_column)</code>. The ORDER BY triggers a default frame of UNBOUNDED PRECEDING to CURRENT ROW, which causes SUM to accumulate values from the start up to each row. This creates a running total that increases (or changes) as you move through the ordered rows.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you reset a running total at specific boundaries (e.g., per month or per customer)?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Add <span style="color: #10b981; font-weight: 600;">PARTITION BY</span> to create independent running totals per group. The sum resets to 0 at each partition boundary.</p>

```sql
-- Running total that resets each month
SUM(amount) OVER (
    PARTITION BY DATE_TRUNC('month', sale_date)
    ORDER BY sale_date
) AS monthly_running_total

-- Running total per customer
SUM(amount) OVER (
    PARTITION BY customer_id
    ORDER BY order_date
) AS customer_running_total
```

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: How would you calculate a "conditional" running total that only includes rows meeting certain criteria?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> Use a CASE expression inside the SUM to conditionally include values. This is more efficient than filtering and re-joining.</p>

```sql
-- Running total of only successful transactions
SELECT
    transaction_date,
    status,
    amount,
    SUM(CASE WHEN status = 'success' THEN amount ELSE 0 END) OVER (
        ORDER BY transaction_date
    ) AS running_success_total,
    SUM(amount) OVER (ORDER BY transaction_date) AS running_all_total
FROM transactions;
```

<p style="color: #1e293b; line-height: 1.7; font-size: 14px; margin-top: 12px;">For complex conditions spanning multiple rows (e.g., "running total excluding the 3 largest transactions"), use [[CTEs]](/topic/sql-learning/subqueries-ctes) to pre-flag rows, then apply the conditional sum.</p>
</div>
</div>
</div>

---

## Section 7: Frame Specifications

The <span style="color: #10b981; font-weight: 600;">frame specification</span> defines exactly which rows within a partition are included in the window function calculation. Mastering frames unlocks advanced patterns like sliding windows, centered averages, and partial aggregations.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">Frame Specification Syntax</h4>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; font-family: monospace; font-size: 14px; color: #1e293b; line-height: 2;">
<span style="color: #06b6d4; font-weight: bold;">ROWS</span> | <span style="color: #8b5cf6; font-weight: bold;">RANGE</span> | <span style="color: #f59e0b; font-weight: bold;">GROUPS</span><br/>
<span style="color: #10b981; font-weight: bold;">BETWEEN</span> <span style="color: #3b82f6;">frame_start</span> <span style="color: #10b981; font-weight: bold;">AND</span> <span style="color: #ec4899;">frame_end</span>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
<div style="background: #ffffff; padding: 16px; border-radius: 10px; border: 1px solid #e2e8f0;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 8px;">Frame Boundaries</div>
<ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 13px; line-height: 1.8;">
<li><code>UNBOUNDED PRECEDING</code> - partition start</li>
<li><code>n PRECEDING</code> - n rows/values before</li>
<li><code>CURRENT ROW</code> - current row</li>
<li><code>n FOLLOWING</code> - n rows/values after</li>
<li><code>UNBOUNDED FOLLOWING</code> - partition end</li>
</ul>
</div>
<div style="background: #ffffff; padding: 16px; border-radius: 10px; border: 1px solid #e2e8f0;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 8px;">Frame Types</div>
<ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 13px; line-height: 1.8;">
<li><strong>ROWS:</strong> Physical row count</li>
<li><strong>RANGE:</strong> Logical value range (peers grouped)</li>
<li><strong>GROUPS:</strong> Groups of peer rows (SQL:2011)</li>
</ul>
</div>
</div>
</div>

### Visual Frame Comparison

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; text-align: center;">ROWS vs RANGE with Duplicate Values</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; font-size: 14px; margin-bottom: 16px; text-align: center;">ROWS CURRENT ROW</div>
<div style="font-family: monospace; font-size: 12px;">
<div style="background: #e2e8f0; padding: 6px 12px; border-radius: 4px; margin-bottom: 4px;">Jan 1: $100</div>
<div style="background: #e2e8f0; padding: 6px 12px; border-radius: 4px; margin-bottom: 4px;">Jan 1: $200</div>
<div style="background: #3b82f6; padding: 6px 12px; border-radius: 4px; margin-bottom: 4px; border: 2px solid #e2e8f0;">Jan 1: $150 ← Current (sum = $150)</div>
<div style="background: #e2e8f0; padding: 6px 12px; border-radius: 4px; margin-bottom: 4px;">Jan 2: $300</div>
</div>
<div style="margin-top: 12px; color: #475569; font-size: 12px; text-align: center;">Only the physical current row</div>
</div>
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border: 2px solid #10b981;">
<div style="color: #047857; font-weight: bold; font-size: 14px; margin-bottom: 16px; text-align: center;">RANGE CURRENT ROW</div>
<div style="font-family: monospace; font-size: 12px;">
<div style="background: #dcfce7; padding: 6px 12px; border-radius: 4px; margin-bottom: 4px; border-left: 3px solid #10b981;">Jan 1: $100 (peer)</div>
<div style="background: #dcfce7; padding: 6px 12px; border-radius: 4px; margin-bottom: 4px; border-left: 3px solid #10b981;">Jan 1: $200 (peer)</div>
<div style="background: #10b981; padding: 6px 12px; border-radius: 4px; margin-bottom: 4px; border: 2px solid #e2e8f0;">Jan 1: $150 ← Current (sum = $450)</div>
<div style="background: #e2e8f0; padding: 6px 12px; border-radius: 4px; margin-bottom: 4px;">Jan 2: $300</div>
</div>
<div style="margin-top: 12px; color: #475569; font-size: 12px; text-align: center;">All rows with same ORDER BY value</div>
</div>
</div>
</div>

### Common Frame Patterns

```sql
-- Running total (from start to current)
SUM(amount) OVER (
    ORDER BY sale_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
)

-- Full partition (grand total regardless of position)
SUM(amount) OVER (
    ORDER BY sale_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
)

-- Moving average (last 3 rows including current)
AVG(amount) OVER (
    ORDER BY sale_date
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
)

-- Centered moving average (1 before, current, 1 after)
AVG(amount) OVER (
    ORDER BY sale_date
    ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
)

-- Future only (current and all following)
SUM(amount) OVER (
    ORDER BY sale_date
    ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING
)
```

### LAST_VALUE Gotcha

<div style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border: 2px solid #f87171; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="color: #991b1b; font-weight: bold; font-size: 14px; margin-bottom: 8px;">Common Bug: LAST_VALUE() Returns Current Row</div>
<div style="color: #7f1d1d; font-size: 14px; line-height: 1.7;">
<p style="margin: 0 0 12px 0;"><code>LAST_VALUE()</code> with ORDER BY uses the default frame ending at CURRENT ROW, so it returns the current row's value (not the last value in the partition)!</p>
<p style="margin: 0;"><strong>Fix:</strong> Always specify a frame that includes the entire partition:</p>
</div>
<code style="display: block; background: #ffffff; padding: 12px; border-radius: 8px; margin-top: 12px; font-size: 12px; color: #1e293b;">
  LAST_VALUE(salary) OVER (<br/>
  &nbsp;&nbsp;PARTITION BY department ORDER BY salary DESC<br/>
  &nbsp;&nbsp;<span style="color: #991b1b; font-weight: bold;">ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</span><br/>
)
</code>
</div>

```sql
-- FIRST_VALUE and LAST_VALUE correctly
SELECT
    name,
    department,
    salary,
    FIRST_VALUE(salary) OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS highest_in_dept,  -- Works correctly (first is always visible)
    LAST_VALUE(salary) OVER (
        PARTITION BY department
        ORDER BY salary DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS lowest_in_dept,  -- Needs explicit frame!
    salary - FIRST_VALUE(salary) OVER (
        PARTITION BY department ORDER BY salary DESC
    ) AS diff_from_highest
FROM employees;
```

### Frame Specification Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Level 1: What is a frame specification in window functions?</h4>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> A frame specification defines which rows within a partition are included in the window function calculation. It uses <span style="color: #10b981; font-weight: 600;">ROWS BETWEEN</span> or <span style="color: #10b981; font-weight: 600;">RANGE BETWEEN</span> with boundaries like UNBOUNDED PRECEDING, n PRECEDING, CURRENT ROW, n FOLLOWING, or UNBOUNDED FOLLOWING. This allows calculations like moving averages (last 3 rows), running totals (all preceding rows), or full partition sums.</p>

<div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e40af; margin-top: 0;">Level 2: What is the difference between ROWS and RANGE frame types?</h5>

<p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> <span style="color: #10b981; font-weight: 600;">ROWS</span> counts physical rows regardless of value: "2 PRECEDING" means exactly 2 rows back. <span style="color: #10b981; font-weight: 600;">RANGE</span> groups rows with equal ORDER BY values as "peers" and operates on logical value ranges. With RANGE, "CURRENT ROW" includes all peers, while with ROWS it includes only the single physical row. RANGE with numeric offsets (like RANGE BETWEEN 10 PRECEDING) means "values within 10 units of current value." ROWS is more predictable; RANGE handles duplicates but can produce unexpected results.</p>

<div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
<h6 style="color: #1e40af; margin-top: 0;">Level 3: How would you implement a 7-day rolling average where "7 days" means calendar days, not row count?</h6>

<p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> Use RANGE with an interval offset. This handles gaps in data correctly (days with no records are still within the range).</p>

```sql
-- PostgreSQL syntax
AVG(amount) OVER (
    ORDER BY sale_date
    RANGE BETWEEN INTERVAL '7 days' PRECEDING AND CURRENT ROW
)

-- Alternative for databases without interval RANGE:
-- Self-join or correlated subquery approach
SELECT s1.*,
    (SELECT AVG(s2.amount)
     FROM sales s2
     WHERE s2.sale_date BETWEEN s1.sale_date - INTERVAL '7 days' AND s1.sale_date
    ) AS rolling_7day_avg
FROM sales s1;
```

<p style="color: #1e293b; line-height: 1.7; font-size: 14px; margin-top: 12px;">Key consideration: RANGE with intervals requires a sortable type (date, timestamp, numeric). For strings or complex ordering, you must use ROWS with explicit gap handling via [[CTEs]](/topic/sql-learning/subqueries-ctes) to fill missing dates first.</p>
</div>
</div>
</div>

---

## Section 8: Advanced Patterns

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

-- Alternative: Keep first occurrence (oldest)
WITH ranked AS (
    SELECT *,
        ROW_NUMBER() OVER (
            PARTITION BY email
            ORDER BY created_at ASC
        ) AS rn
    FROM users
)
DELETE FROM users WHERE id IN (
    SELECT id FROM ranked WHERE rn > 1
);
```

### Islands and Gaps Problem

```sql
-- Find consecutive date ranges (islands)
WITH date_groups AS (
    SELECT
        user_id,
        login_date,
        login_date - (ROW_NUMBER() OVER (
            PARTITION BY user_id
            ORDER BY login_date
        ))::int AS grp
    FROM user_logins
)
SELECT
    user_id,
    MIN(login_date) AS streak_start,
    MAX(login_date) AS streak_end,
    COUNT(*) AS streak_length
FROM date_groups
GROUP BY user_id, grp
HAVING COUNT(*) >= 3  -- Streaks of 3+ days
ORDER BY user_id, streak_start;
```

### Sessionization (Grouping Events by Time Gap)

```sql
-- Group user events into sessions (30+ minute gap = new session)
WITH event_gaps AS (
    SELECT
        user_id,
        event_time,
        event_type,
        EXTRACT(EPOCH FROM (
            event_time - LAG(event_time) OVER (
                PARTITION BY user_id ORDER BY event_time
            )
        )) / 60 AS minutes_since_last
    FROM events
),
session_starts AS (
    SELECT *,
        CASE WHEN minutes_since_last > 30 OR minutes_since_last IS NULL
             THEN 1 ELSE 0 END AS is_session_start
    FROM event_gaps
),
sessions AS (
    SELECT *,
        SUM(is_session_start) OVER (
            PARTITION BY user_id ORDER BY event_time
        ) AS session_id
    FROM session_starts
)
SELECT
    user_id,
    session_id,
    MIN(event_time) AS session_start,
    MAX(event_time) AS session_end,
    COUNT(*) AS event_count
FROM sessions
GROUP BY user_id, session_id;
```

### Named Windows for Readability

```sql
-- Define window once, reuse multiple times
SELECT
    name,
    department,
    salary,
    ROW_NUMBER() OVER w AS row_num,
    RANK() OVER w AS rank,
    DENSE_RANK() OVER w AS dense_rank,
    SUM(salary) OVER w AS running_total,
    AVG(salary) OVER w AS running_avg
FROM employees
WINDOW w AS (PARTITION BY department ORDER BY salary DESC);
-- Much cleaner than repeating OVER (...) six times!
```

---

## Performance Considerations

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0;">Window Function Optimization Strategies</h4>
<div style="display: grid; gap: 16px;">
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #10b981;">
<div style="color: #047857; font-weight: bold; margin-bottom: 8px;">1. Index PARTITION BY and ORDER BY Columns</div>
<div style="color: #475569; font-size: 14px;">Create composite indexes matching (partition_cols, order_cols) to avoid sorts. The index order matters - partition columns first.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 8px;">2. Minimize Distinct Window Definitions</div>
<div style="color: #475569; font-size: 14px;">Each unique OVER() clause may require a separate sort. Use named windows (WINDOW clause) to share definitions and potentially share sorts.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #f59e0b;">
<div style="color: #b45309; font-weight: bold; margin-bottom: 8px;">3. Filter Before Windowing</div>
<div style="color: #475569; font-size: 14px;">Use WHERE to reduce rows before window calculations. Window functions execute after WHERE, so filtering first dramatically reduces computation.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #8b5cf6;">
<div style="color: #6d28d9; font-weight: bold; margin-bottom: 8px;">4. Consider Materialization</div>
<div style="color: #475569; font-size: 14px;">For frequently-used window calculations, consider [[materialized views]](/topic/system-design/caching) or pre-computed columns to avoid repeated computation.</div>
</div>
<div style="background: #ffffff; border-radius: 10px; padding: 16px; border-left: 4px solid #ec4899;">
<div style="color: #be185d; font-weight: bold; margin-bottom: 8px;">5. Check Execution Plans</div>
<div style="color: #475569; font-size: 14px;">Use EXPLAIN ANALYZE to verify window functions use indexes and understand sort operations. Look for "WindowAgg" nodes and their input sources.</div>
</div>
</div>
</div>

```sql
-- Optimal index for this query:
-- CREATE INDEX idx_sales_person_date ON sales(salesperson, sale_date);

SELECT
    salesperson,
    sale_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY salesperson
        ORDER BY sale_date
    ) AS running_total
FROM sales
WHERE sale_date >= '2024-01-01';  -- Filter first!
```

---

## Interview Questions Summary

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="margin-bottom: 24px;">
<div style="background: #dcfce7; color: #166534; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px;">Easy</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; line-height: 2.2;">
<li><strong>What is a window function?</strong><br/>
<span style="color: #475569;">A function that performs calculations across related rows without collapsing them, using the OVER() clause.</span></li>
<li><strong>What is the difference between ROW_NUMBER, RANK, and DENSE_RANK?</strong><br/>
<span style="color: #475569;">ROW_NUMBER: always unique. RANK: ties same, gaps after. DENSE_RANK: ties same, no gaps.</span></li>
<li><strong>How does PARTITION BY differ from GROUP BY?</strong><br/>
<span style="color: #475569;">PARTITION BY keeps all rows; GROUP BY collapses rows into summary rows.</span></li>
</ul>
</div>

<div style="margin-bottom: 24px;">
<div style="background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px;">Medium</div>
<ul style="margin: 0; padding-left: 20px; color: #1e293b; line-height: 2.2;">
<li><strong>How do you get the top N records per group?</strong><br/>
<span style="color: #475569;">Use ROW_NUMBER() OVER (PARTITION BY group ORDER BY value) in a CTE, then filter WHERE rn <= N.</span></li>
<li><strong>What is the default frame when ORDER BY is present?</strong><br/>
<span style="color: #475569;">RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW (running calculation).</span></li>
<li><strong>How do you calculate month-over-month growth?</strong><br/>
<span style="color: #475569;">Use LAG(value, 1) to get previous month, calculate (current - previous) / previous * 100.</span></li>
<li><strong>What happens if ORDER BY columns have duplicates with ROW_NUMBER?</strong><br/>
<span style="color: #475569;">Results are non-deterministic. Add a unique tiebreaker column.</span></li>
</ul>
</div>

<div>
  <div style="background: #fee2e2; color: #991b1b; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin-bottom: 12px;">Hard</div>
  <ul style="margin: 0; padding-left: 20px; color: #1e293b; line-height: 2.2;">
  <li><strong>Explain ROWS vs RANGE frame specification with duplicates.</strong><br/>
  <span style="color: #475569;">ROWS counts physical rows; RANGE groups peers with equal ORDER BY values together.</span></li>
  <li><strong>Why might LAST_VALUE() not return the expected value?</strong><br/>
  <span style="color: #475569;">Default frame ends at CURRENT ROW. Need explicit ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING.</span></li>
  <li><strong>How do you find consecutive sequences (islands) in data?</strong><br/>
  <span style="color: #475569;">Subtract ROW_NUMBER from the sequence value; consecutive values get the same difference.</span></li>
  <li><strong>How do you implement sessionization with window functions?</strong><br/>
  <span style="color: #475569;">Use LAG to find gaps, CASE to flag session starts, cumulative SUM of flags for session IDs.</span></li>
</ul>
</div>
</div>

---

## Practice Problems

### Problem 1: Department Salary Analysis

```sql
-- For each employee, show:
-- 1. Their rank within department (by salary)
-- 2. The department's highest salary
-- 3. How much less they earn than the top earner
-- 4. Their salary as percentage of department total

SELECT
    name,
    department,
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank,
    FIRST_VALUE(salary) OVER (
        PARTITION BY department ORDER BY salary DESC
    ) AS highest_in_dept,
    FIRST_VALUE(salary) OVER (
        PARTITION BY department ORDER BY salary DESC
    ) - salary AS diff_from_top,
    ROUND(100.0 * salary / SUM(salary) OVER (PARTITION BY department), 2) AS pct_of_dept
FROM employees
ORDER BY department, dept_rank;
```

### Problem 2: Sales Trend Analysis

```sql
-- For each sale, calculate:
-- 1. Running total (overall and per salesperson)
-- 2. 3-day moving average
-- 3. Change from previous sale
-- 4. Days since last sale

SELECT
    sale_date,
    salesperson,
    amount,
    SUM(amount) OVER (ORDER BY sale_date) AS overall_running,
    SUM(amount) OVER (
        PARTITION BY salesperson ORDER BY sale_date
    ) AS person_running,
    ROUND(AVG(amount) OVER (
        ORDER BY sale_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ), 2) AS moving_avg_3,
    amount - LAG(amount) OVER (ORDER BY sale_date) AS change_from_prev,
    sale_date - LAG(sale_date) OVER (ORDER BY sale_date) AS days_since_last
FROM sales
ORDER BY sale_date;
```

### Problem 3: Top 2 Per Department with Ties

```sql
-- Get top 2 salaries per department, including all ties for 2nd place

WITH ranked AS (
    SELECT
        name,
        department,
        salary,
        DENSE_RANK() OVER (
            PARTITION BY department ORDER BY salary DESC
        ) AS dr
    FROM employees
)
SELECT * FROM ranked WHERE dr <= 2
ORDER BY department, dr, name;
```

### Problem 4: Cumulative Distribution

```sql
-- Show salary percentiles and cumulative distribution

SELECT
    name,
    department,
    salary,
    NTILE(4) OVER (ORDER BY salary) AS quartile,
    ROUND(PERCENT_RANK() OVER (ORDER BY salary) * 100, 1) AS percentile_rank,
    ROUND(CUME_DIST() OVER (ORDER BY salary) * 100, 1) AS cumulative_pct,
    CASE NTILE(4) OVER (ORDER BY salary)
        WHEN 1 THEN 'Bottom 25%'
        WHEN 2 THEN 'Lower-Mid 25%'
        WHEN 3 THEN 'Upper-Mid 25%'
        WHEN 4 THEN 'Top 25%'
    END AS salary_band
FROM employees
ORDER BY salary DESC;
```

### Problem 5: Year-over-Year with Missing Months

```sql
-- Handle missing months in YoY comparison
WITH all_months AS (
    SELECT generate_series(
        '2023-01-01'::date,
        '2024-12-01'::date,
        '1 month'::interval
    )::date AS month
),
monthly_sales AS (
    SELECT
        DATE_TRUNC('month', sale_date)::date AS month,
        SUM(amount) AS total
    FROM sales
    GROUP BY DATE_TRUNC('month', sale_date)
),
complete_data AS (
    SELECT
        am.month,
        COALESCE(ms.total, 0) AS total
    FROM all_months am
    LEFT JOIN monthly_sales ms ON am.month = ms.month
)
SELECT
    month,
    total,
    LAG(total, 12) OVER (ORDER BY month) AS same_month_last_year,
    CASE
        WHEN LAG(total, 12) OVER (ORDER BY month) = 0 THEN NULL
        ELSE ROUND(
            100.0 * (total - LAG(total, 12) OVER (ORDER BY month))
            / LAG(total, 12) OVER (ORDER BY month),
            2
        )
    END AS yoy_growth
FROM complete_data
WHERE month >= '2024-01-01'
ORDER BY month;
```

---

## Quick Reference

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div>
  <h4 style="color: #1e293b; margin: 0 0 12px 0;">Ranking Functions</h4>
  <div style="background: #ffffff; padding: 16px; border-radius: 10px; font-size: 13px; color: #1e293b; line-height: 1.8;">
  <code>ROW_NUMBER()</code> - Unique sequential (1,2,3)<br/>
  <code>RANK()</code> - Ties same, gaps (1,1,3)<br/>
  <code>DENSE_RANK()</code> - Ties same, no gaps (1,1,2)<br/>
  <code>NTILE(n)</code> - Divide into n buckets<br/>
  <code>PERCENT_RANK()</code> - Relative rank (0-1)<br/>
  <code>CUME_DIST()</code> - Cumulative distribution
</div>
</div>
<div>
  <h4 style="color: #1e293b; margin: 0 0 12px 0;">Value Functions</h4>
  <div style="background: #ffffff; padding: 16px; border-radius: 10px; font-size: 13px; color: #1e293b; line-height: 1.8;">
  <code>LAG(col, n, default)</code> - n rows before<br/>
  <code>LEAD(col, n, default)</code> - n rows after<br/>
  <code>FIRST_VALUE(col)</code> - First in frame<br/>
  <code>LAST_VALUE(col)</code> - Last in frame*<br/>
  <code>NTH_VALUE(col, n)</code> - nth in frame<br/>
  <span style="font-size: 11px; color: #64748b;">*Requires explicit frame</span>
</div>
</div>
<div>
  <h4 style="color: #1e293b; margin: 0 0 12px 0;">Frame Boundaries</h4>
  <div style="background: #ffffff; padding: 16px; border-radius: 10px; font-size: 13px; color: #1e293b; line-height: 1.8;">
  <code>UNBOUNDED PRECEDING</code> - Start of partition<br/>
  <code>n PRECEDING</code> - n rows/values before<br/>
  <code>CURRENT ROW</code> - Current row<br/>
  <code>n FOLLOWING</code> - n rows/values after<br/>
  <code>UNBOUNDED FOLLOWING</code> - End of partition
</div>
</div>
<div>
  <h4 style="color: #1e293b; margin: 0 0 12px 0;">Common Patterns</h4>
  <div style="background: #ffffff; padding: 16px; border-radius: 10px; font-size: 13px; color: #1e293b; line-height: 1.8;">
  <strong>Running total:</strong> <code>SUM() OVER (ORDER BY)</code><br/>
  <strong>Moving avg:</strong> <code>AVG() OVER (ROWS n PRECEDING)</code><br/>
  <strong>Top N:</strong> <code>ROW_NUMBER() + WHERE rn <= N</code><br/>
  <strong>MoM growth:</strong> <code>LAG() for comparison</code><br/>
  <strong>Dedup:</strong> <code>ROW_NUMBER() + WHERE rn = 1</code>
</div>
</div>
</div>
</div>

---

## Related Topics

- [[SQL Fundamentals]](/topic/sql-learning/sql-fundamentals) - Basic query building blocks
- [[Subqueries and CTEs]](/topic/sql-learning/subqueries-ctes) - Modular query composition for filtering window results
- [[Joins Mastery]](/topic/sql-learning/joins-mastery) - Combining tables before applying window functions
- [[Query Optimization]](/topic/sql-learning/query-optimization) - Making window function queries faster
- [[Database Indexing]](/topic/sql-learning/indexing-deep-dive) - Indexing strategies for PARTITION BY and ORDER BY
- [[Caching]](/topic/system-design/caching) - Materialized views for pre-computed window calculations
