# SQL Learning

## Overview

Master SQL from fundamentals to advanced optimization techniques. This comprehensive guide covers everything you need to excel in technical interviews and real-world database work, from basic SELECT statements to complex window functions and query optimization.

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 24px 0;">
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 20px; text-align: center;">
<div style="font-size: 32px; margin-bottom: 8px;">6</div>
<h4 style="color: #1e40af; margin: 0 0 8px 0;">Modules</h4>
<p style="color: #475569; font-size: 13px; margin: 0;">Comprehensive coverage</p>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 20px; text-align: center;">
<div style="font-size: 32px; margin-bottom: 8px;">95%</div>
<h4 style="color: #166534; margin: 0 0 8px 0;">Interview Rate</h4>
<p style="color: #475569; font-size: 13px; margin: 0;">Asked in backend roles</p>
</div>
<div style="background: linear-gradient(135deg, #fae8ff 0%, #f5d0fe 100%); border-radius: 12px; padding: 20px; text-align: center;">
<div style="font-size: 32px; margin-bottom: 8px;">Real</div>
<h4 style="color: #7c3aed; margin: 0 0 8px 0;">Examples</h4>
<p style="color: #475569; font-size: 13px; margin: 0;">Production queries</p>
</div>
</div>

---

## Learning Path

### Fundamentals (Start Here)

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 20px; margin: 16px 0; display: flex; flex-direction: column; gap: 8px;">
<a href="/topic/sql-learning/sql-fundamentals" style="color: #1e40af; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>SQL Fundamentals</strong> - SELECT, WHERE, ORDER BY, GROUP BY, HAVING, and basic aggregations
</a>
</div>

### Intermediate Concepts

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 20px; margin: 16px 0; display: flex; flex-direction: column; gap: 8px;">
<a href="/topic/sql-learning/joins-mastery" style="color: #166534; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Joins Mastery</strong> - INNER, LEFT, RIGHT, FULL, CROSS joins with visual explanations
</a>
<a href="/topic/sql-learning/subqueries-ctes" style="color: #166534; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Subqueries & CTEs</strong> - Correlated subqueries, WITH clauses, recursive CTEs
</a>
</div>

### Advanced Topics

<div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 12px; padding: 20px; margin: 16px 0; display: flex; flex-direction: column; gap: 8px;">
<a href="/topic/sql-learning/window-functions" style="color: #7c3aed; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Window Functions</strong> - ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, running totals
</a>
<a href="/topic/sql-learning/indexing-deep-dive" style="color: #7c3aed; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Indexing Deep Dive</strong> - B-trees, covering indexes, composite indexes, index selectivity
</a>
<a href="/topic/sql-learning/query-optimization" style="color: #7c3aed; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Query Optimization</strong> - EXPLAIN plans, query rewriting, avoiding full table scans
</a>
</div>

---

## SQL Execution Order

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">QUERY EXECUTION ORDER (NOT SYNTAX ORDER)</h3>

<div style="display: flex; flex-direction: column; gap: 8px; max-width: 500px; margin: 0 auto;">
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #3b82f6; color: #ffffff; padding: 8px 16px; border-radius: 8px; min-width: 120px; text-align: center; font-weight: bold; font-size: 13px;">1. FROM</div>
<span style="color: #475569; font-size: 13px;">Tables identified and joined</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 18px;">|</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #8b5cf6; color: #ffffff; padding: 8px 16px; border-radius: 8px; min-width: 120px; text-align: center; font-weight: bold; font-size: 13px;">2. WHERE</div>
<span style="color: #475569; font-size: 13px;">Rows filtered (before grouping)</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 18px;">|</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #ec4899; color: #ffffff; padding: 8px 16px; border-radius: 8px; min-width: 120px; text-align: center; font-weight: bold; font-size: 13px;">3. GROUP BY</div>
<span style="color: #475569; font-size: 13px;">Rows grouped</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 18px;">|</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f59e0b; color: #ffffff; padding: 8px 16px; border-radius: 8px; min-width: 120px; text-align: center; font-weight: bold; font-size: 13px;">4. HAVING</div>
<span style="color: #475569; font-size: 13px;">Groups filtered (after aggregation)</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 18px;">|</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #10b981; color: #ffffff; padding: 8px 16px; border-radius: 8px; min-width: 120px; text-align: center; font-weight: bold; font-size: 13px;">5. SELECT</div>
<span style="color: #475569; font-size: 13px;">Columns selected, expressions computed</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 18px;">|</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #6366f1; color: #ffffff; padding: 8px 16px; border-radius: 8px; min-width: 120px; text-align: center; font-weight: bold; font-size: 13px;">6. ORDER BY</div>
<span style="color: #475569; font-size: 13px;">Results sorted</span>
</div>
<div style="text-align: center; color: #3b82f6; font-size: 18px;">|</div>
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #64748b; color: #ffffff; padding: 8px 16px; border-radius: 8px; min-width: 120px; text-align: center; font-weight: bold; font-size: 13px;">7. LIMIT</div>
<span style="color: #475569; font-size: 13px;">Results paginated</span>
</div>
</div>
</div>

---

## Join Types Reference

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

| Join Type | Returns | Use Case |
|-----------|---------|----------|
| **INNER JOIN** | Only matching rows from both tables | Find customers with orders |
| **LEFT JOIN** | All left rows + matching right | Find all customers, with orders if any |
| **RIGHT JOIN** | Matching left + all right rows | Find all orders, with customer if exists |
| **FULL OUTER JOIN** | All rows from both tables | Find all customers and all orders |
| **CROSS JOIN** | Cartesian product (all combinations) | Generate combinations |
| **SELF JOIN** | Table joined with itself | Find related rows within same table |

</div>

---

## Interview Topics Checklist

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">

<div style="background: rgba(35, 134, 54, 0.1); border: 1px solid rgba(35, 134, 54, 0.3); border-radius: 12px; padding: 20px;">
<h4 style="color: #16a34a; margin: 0 0 12px 0;">Frequently Asked</h4>
<ul style="color: #475569; font-size: 13px; margin: 0; padding-left: 20px; line-height: 2;">
<li>Second highest salary</li>
<li>Duplicate emails</li>
<li>Employee vs Manager salary</li>
<li>Running totals</li>
<li>Ranking within groups</li>
</ul>
</div>

<div style="background: rgba(31, 111, 235, 0.1); border: 1px solid rgba(31, 111, 235, 0.3); border-radius: 12px; padding: 20px;">
<h4 style="color: #1d4ed8; margin: 0 0 12px 0;">Advanced Topics</h4>
<ul style="color: #475569; font-size: 13px; margin: 0; padding-left: 20px; line-height: 2;">
<li>Recursive CTEs</li>
<li>EXPLAIN plan analysis</li>
<li>Index optimization</li>
<li>Deadlock prevention</li>
<li>Transaction isolation</li>
</ul>
</div>

</div>
</div>

---

## Content Format

All SQL learning materials use a hybrid Markdown + inline HTML approach:

- **Visual Diagrams**: Join visualizations, execution flow
- **Executable Examples**: Sample data with expected outputs
- **Performance Tips**: Query optimization hints
- **Interview Questions**: Progressive L1/L2/L3 difficulty levels
