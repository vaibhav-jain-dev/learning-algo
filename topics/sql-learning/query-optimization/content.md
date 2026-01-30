# SQL Query Optimization

## Overview

<span style="color:#22c55e; font-weight:bold;">Query optimization</span> is the art and science of writing SQL that executes with minimal resource consumption and maximum speed. It encompasses understanding the query planner's decision-making process, leveraging indexes effectively, rewriting queries for efficiency, and diagnosing performance bottlenecks through execution plan analysis.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: #1e293b;">
  <h4 style="margin-top: 0; color: #f8fafc; font-size: 18px;">Core Equation</h4>
  <div style="font-family: 'Courier New', monospace; font-size: 16px; background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px; text-align: center;">
    Query Performance = (Rows Scanned x Cost Per Row) + (Joins x Join Cost) + (Sort/Aggregate Cost) + Network I/O
  </div>
</div>

**Critical Assumption**: The query optimizer assumes statistics are accurate. Stale statistics lead to suboptimal execution plans. Always run `ANALYZE` after bulk operations.

**Key Trade-off**: Read optimization vs. Write overhead. Every index speeds up reads but slows down writes. The optimal indexing strategy depends on your read/write ratio.

**Tags:** SQL, Performance, Optimization, EXPLAIN, Indexing, Query Plans

---

## Section 1: Query Execution Pipeline

Understanding how databases process queries is fundamental to optimization. The <span style="color:#22c55e; font-weight:bold;">query execution pipeline</span> transforms SQL text into actual results through multiple stages.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 24px 0; text-align: center;">QUERY EXECUTION PIPELINE</h4>
<div style="display: flex; flex-wrap: wrap; gap: 24px; justify-content: center;">
  <div style="flex: 1; min-width: 280px; max-width: 350px;">
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: linear-gradient(90deg, #238636, #2ea043); color: #fff; padding: 12px 20px; border-radius: 8px; font-weight: bold;">
        1. Parser
        <div style="font-weight: normal; font-size: 12px; margin-top: 4px;">SQL text to AST</div>
      </div>
      <div style="text-align: center; color: #1e40af; font-size: 18px;">|</div>
      <div style="background: linear-gradient(90deg, #1f6feb, #388bfd); color: #fff; padding: 12px 20px; border-radius: 8px; font-weight: bold;">
        2. Analyzer
        <div style="font-weight: normal; font-size: 12px; margin-top: 4px;">Semantic validation, resolve names</div>
      </div>
      <div style="text-align: center; color: #1e40af; font-size: 18px;">|</div>
      <div style="background: linear-gradient(90deg, #8957e5, #a371f7); color: #fff; padding: 12px 20px; border-radius: 8px; font-weight: bold;">
        3. Rewriter
        <div style="font-weight: normal; font-size: 12px; margin-top: 4px;">View expansion, rule application</div>
      </div>
    </div>
  </div>
  <div style="flex: 1; min-width: 280px; max-width: 350px;">
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div style="background: linear-gradient(90deg, #f0883e, #d29922); color: #fff; padding: 12px 20px; border-radius: 8px; font-weight: bold;">
        4. Planner/Optimizer
        <div style="font-weight: normal; font-size: 12px; margin-top: 4px;">Generate & choose execution plan</div>
      </div>
      <div style="text-align: center; color: #1e40af; font-size: 18px;">|</div>
      <div style="background: linear-gradient(90deg, #da3633, #f85149); color: #fff; padding: 12px 20px; border-radius: 8px; font-weight: bold;">
        5. Executor
        <div style="font-weight: normal; font-size: 12px; margin-top: 4px;">Execute plan, fetch data</div>
      </div>
      <div style="text-align: center; color: #1e40af; font-size: 18px;">|</div>
      <div style="background: linear-gradient(90deg, #7ee787, #56d364); color: #0d1117; padding: 12px 20px; border-radius: 8px; font-weight: bold;">
        6. Result Set
        <div style="font-weight: normal; font-size: 12px; margin-top: 4px;">Return rows to client</div>
      </div>
    </div>
  </div>
</div>
</div>

### Logical vs Physical Query Order

The <span style="color:#22c55e; font-weight:bold;">logical execution order</span> differs from how you write SQL. Understanding this is crucial for optimization.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 24px 0; text-align: center;">LOGICAL EXECUTION ORDER</h4>
<div style="display: flex; flex-direction: column; gap: 8px; max-width: 600px; margin: 0 auto;">
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #238636; color: #fff; padding: 10px 20px; border-radius: 6px; min-width: 140px; text-align: center; font-size: 14px; font-weight: bold;">1. FROM / JOIN</div>
<span style="color: #64748b; font-size: 13px;">Identify source tables, apply joins, create working set</span>
</div>
<div style="text-align: center; color: #1e40af;">|</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #1f6feb; color: #fff; padding: 10px 20px; border-radius: 6px; min-width: 140px; text-align: center; font-size: 14px; font-weight: bold;">2. WHERE</div>
<span style="color: #64748b; font-size: 13px;">Filter rows (before grouping, cannot use aliases)</span>
</div>
<div style="text-align: center; color: #1e40af;">|</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #8957e5; color: #fff; padding: 10px 20px; border-radius: 6px; min-width: 140px; text-align: center; font-size: 14px; font-weight: bold;">3. GROUP BY</div>
<span style="color: #64748b; font-size: 13px;">Aggregate rows into groups</span>
</div>
<div style="text-align: center; color: #1e40af;">|</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #f0883e; color: #fff; padding: 10px 20px; border-radius: 6px; min-width: 140px; text-align: center; font-size: 14px; font-weight: bold;">4. HAVING</div>
<span style="color: #64748b; font-size: 13px;">Filter groups (after grouping, can use aggregates)</span>
</div>
<div style="text-align: center; color: #1e40af;">|</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #da3633; color: #fff; padding: 10px 20px; border-radius: 6px; min-width: 140px; text-align: center; font-size: 14px; font-weight: bold;">5. SELECT</div>
<span style="color: #64748b; font-size: 13px;">Compute expressions, create column aliases</span>
</div>
<div style="text-align: center; color: #1e40af;">|</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #7ee787; color: #0d1117; padding: 10px 20px; border-radius: 6px; min-width: 140px; text-align: center; font-size: 14px; font-weight: bold;">6. DISTINCT</div>
<span style="color: #64748b; font-size: 13px;">Remove duplicate rows</span>
</div>
<div style="text-align: center; color: #1e40af;">|</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #a371f7; color: #fff; padding: 10px 20px; border-radius: 6px; min-width: 140px; text-align: center; font-size: 14px; font-weight: bold;">7. ORDER BY</div>
<span style="color: #64748b; font-size: 13px;">Sort results (can use aliases, column positions)</span>
</div>
<div style="text-align: center; color: #1e40af;">|</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #ffffff; color: #475569; padding: 10px 20px; border-radius: 6px; min-width: 140px; text-align: center; font-size: 14px; border: 2px solid #e2e8f0; font-weight: bold;">8. LIMIT/OFFSET</div>
<span style="color: #64748b; font-size: 13px;">Restrict output rows</span>
</div>
</div>
</div>

**Why This Matters**: You cannot use a column alias defined in SELECT within WHERE because WHERE executes before SELECT. This explains errors like "column alias not found."

---

## Section 2: EXPLAIN Plans Deep Dive

The <span style="color:#22c55e; font-weight:bold;">EXPLAIN command</span> reveals the query optimizer's execution strategy. Mastering EXPLAIN output is essential for diagnosing and fixing performance issues.

### EXPLAIN Variants

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #e2e8f0;">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
<div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 8px;">EXPLAIN</div>
<div style="color: #475569; font-size: 13px;">Shows estimated plan without executing. Fast but may differ from actual execution.</div>
<div style="background: #f1f5f9; padding: 8px; border-radius: 4px; margin-top: 8px; font-family: monospace; font-size: 12px; color: #64748b;">EXPLAIN SELECT * FROM users;</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #58a6ff;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 8px;">EXPLAIN ANALYZE</div>
<div style="color: #475569; font-size: 13px;">Executes query and shows actual timings. Essential for production debugging.</div>
<div style="background: #f1f5f9; padding: 8px; border-radius: 4px; margin-top: 8px; font-family: monospace; font-size: 12px; color: #64748b;">EXPLAIN ANALYZE SELECT * FROM users;</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #f0883e;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 8px;">EXPLAIN (BUFFERS)</div>
<div style="color: #475569; font-size: 13px;">Shows buffer usage (cache hits/misses). Critical for I/O optimization.</div>
<div style="background: #f1f5f9; padding: 8px; border-radius: 4px; margin-top: 8px; font-family: monospace; font-size: 12px; color: #64748b;">EXPLAIN (ANALYZE, BUFFERS) SELECT ...;</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 4px solid #a371f7;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 8px;">EXPLAIN (FORMAT JSON)</div>
<div style="color: #475569; font-size: 13px;">Machine-readable output for tooling and visualization platforms.</div>
<div style="background: #f1f5f9; padding: 8px; border-radius: 4px; margin-top: 8px; font-family: monospace; font-size: 12px; color: #64748b;">EXPLAIN (FORMAT JSON) SELECT ...;</div>
</div>
</div>
</div>

### Interpreting EXPLAIN Output

```sql
EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.status = 'active'
GROUP BY u.id, u.name
ORDER BY order_count DESC
LIMIT 10;
```

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 2px solid #e2e8f0; font-family: monospace; font-size: 13px; overflow-x: auto;">
<pre style="margin: 0; color: #475569; white-space: pre-wrap;">
<span style="color: #f85149;">Limit</span>  (cost=1285.32..1285.35 rows=10 width=44) (actual time=12.456..12.461 rows=10 loops=1)
  ->  <span style="color: #f0883e;">Sort</span>  (cost=1285.32..1287.89 rows=1028 width=44) (actual time=12.454..12.457 rows=10 loops=1)
        Sort Key: (count(o.id)) DESC
        Sort Method: <span style="color: #7ee787;">top-N heapsort</span>  Memory: 25kB
        ->  <span style="color: #1e40af;">HashAggregate</span>  (cost=1256.42..1266.70 rows=1028 width=44) (actual time=11.234..11.890 rows=1028 loops=1)
              Group Key: u.id
              Batches: 1  Memory Usage: 209kB
              ->  <span style="color: #a371f7;">Hash Right Join</span>  (cost=42.36..1180.92 rows=15100 width=40) (actual time=0.892..8.234 rows=15234 loops=1)
                    Hash Cond: (o.user_id = u.id)
                    ->  <span style="color: #7ee787;">Seq Scan on orders o</span>  (cost=0.00..963.00 rows=50000 width=8) (actual time=0.012..3.456 rows=50000 loops=1)
                    ->  <span style="color: #1e40af;">Hash</span>  (cost=29.78..29.78 rows=1006 width=36) (actual time=0.867..0.868 rows=1028 loops=1)
                          Buckets: 2048  Batches: 1  Memory Usage: 73kB
                          ->  <span style="color: #7ee787;">Index Scan using idx_users_status on users u</span>  (cost=0.28..29.78 rows=1006 width=36) (actual time=0.021..0.534 rows=1028 loops=1)
                                Index Cond: (status = 'active'::text)
Planning Time: 0.456 ms
Execution Time: 12.567 ms
</pre>
</div>

### Key EXPLAIN Metrics Decoded

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #e2e8f0;">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;">
<div style="background: #ffffff; border-radius: 8px; padding: 16px;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 8px;">cost=startup..total</div>
<div style="color: #64748b; font-size: 13px; margin-bottom: 8px;">Estimated cost in arbitrary units (not milliseconds)</div>
<div style="color: #475569; font-size: 12px;"><strong>Startup:</strong> Cost before first row returned<br><strong>Total:</strong> Cost to return all rows</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 8px;">rows=N</div>
<div style="color: #64748b; font-size: 13px; margin-bottom: 8px;">Estimated row count (planner estimate)</div>
<div style="color: #475569; font-size: 12px;"><strong>Red Flag:</strong> If estimated << actual, statistics are stale. Run ANALYZE.</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 8px;">actual time=start..end</div>
<div style="color: #64748b; font-size: 13px; margin-bottom: 8px;">Real execution time in milliseconds</div>
<div style="color: #475569; font-size: 12px;"><strong>Per loop:</strong> Multiply by loops for total time in that node</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px;">
<div style="color: #f0883e; font-weight: bold; margin-bottom: 8px;">loops=N</div>
<div style="color: #64748b; font-size: 13px; margin-bottom: 8px;">How many times this node was executed</div>
<div style="color: #475569; font-size: 12px;"><strong>High loops:</strong> Common in nested loop joins; multiply time by loops</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 8px;">Buffers: shared hit/read</div>
<div style="color: #64748b; font-size: 13px; margin-bottom: 8px;">Buffer cache usage (with BUFFERS option)</div>
<div style="color: #475569; font-size: 12px;"><strong>hit:</strong> From cache (fast)<br><strong>read:</strong> From disk (slow)</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 8px;">width=N</div>
<div style="color: #64748b; font-size: 13px; margin-bottom: 8px;">Average row width in bytes</div>
<div style="color: #475569; font-size: 12px;"><strong>Optimization:</strong> SELECT fewer columns to reduce width and memory usage</div>
</div>
</div>
</div>

### Scan Types: Performance Hierarchy

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 20px 0; text-align: center;">SCAN TYPES (Best to Worst for Selective Queries)</h4>
<div style="display: flex; flex-direction: column; gap: 12px; max-width: 700px; margin: 0 auto;">
<div style="display: flex; align-items: stretch; gap: 12px;">
<div style="background: linear-gradient(135deg, #238636, #2ea043); color: #fff; padding: 16px; border-radius: 8px; min-width: 180px; display: flex; flex-direction: column; justify-content: center;">
<div style="font-weight: bold;">Index Only Scan</div>
<div style="font-size: 11px; opacity: 0.9; margin-top: 4px;">O(log n) + no heap access</div>
</div>
<div style="background: #ffffff; padding: 12px; border-radius: 8px; flex: 1; color: #475569; font-size: 13px;">All required columns in index. No table access needed. Fastest possible scan.</div>
</div>
<div style="display: flex; align-items: stretch; gap: 12px;">
<div style="background: linear-gradient(135deg, #1f6feb, #388bfd); color: #fff; padding: 16px; border-radius: 8px; min-width: 180px; display: flex; flex-direction: column; justify-content: center;">
<div style="font-weight: bold;">Index Scan</div>
<div style="font-size: 11px; opacity: 0.9; margin-top: 4px;">O(log n) + heap fetch</div>
</div>
<div style="background: #ffffff; padding: 12px; border-radius: 8px; flex: 1; color: #475569; font-size: 13px;">Uses index to find rows, then fetches full row from table. Good for selective queries.</div>
</div>
<div style="display: flex; align-items: stretch; gap: 12px;">
<div style="background: linear-gradient(135deg, #f0883e, #d29922); color: #fff; padding: 16px; border-radius: 8px; min-width: 180px; display: flex; flex-direction: column; justify-content: center;">
<div style="font-weight: bold;">Bitmap Index Scan</div>
<div style="font-size: 11px; opacity: 0.9; margin-top: 4px;">O(log n) + bitmap + heap</div>
</div>
<div style="background: #ffffff; padding: 12px; border-radius: 8px; flex: 1; color: #475569; font-size: 13px;">Builds bitmap of matching rows, then fetches. Efficient for multiple index conditions (AND/OR).</div>
</div>
<div style="display: flex; align-items: stretch; gap: 12px;">
<div style="background: linear-gradient(135deg, #da3633, #f85149); color: #fff; padding: 16px; border-radius: 8px; min-width: 180px; display: flex; flex-direction: column; justify-content: center;">
<div style="font-weight: bold;">Sequential Scan</div>
<div style="font-size: 11px; opacity: 0.9; margin-top: 4px;">O(n) full table scan</div>
</div>
<div style="background: #ffffff; padding: 12px; border-radius: 8px; flex: 1; color: #475569; font-size: 13px;">Reads every row. May be optimal for small tables or when fetching >10-15% of rows.</div>
</div>
</div>
</div>

### EXPLAIN Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: What does EXPLAIN ANALYZE show that regular EXPLAIN does not?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Regular EXPLAIN shows the <span style="color:#22c55e; font-weight:bold;">estimated execution plan</span> - the optimizer's prediction of how it will execute the query. EXPLAIN ANALYZE actually <span style="color:#22c55e; font-weight:bold;">executes the query</span> and reports actual timings, row counts, and buffer usage alongside estimates. This reveals plan accuracy issues where estimates diverge from reality, indicating stale statistics or optimizer limitations.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: When would you see a dramatic difference between estimated and actual row counts, and how do you fix it?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Major estimate-actual divergence occurs in several scenarios: (1) <span style="color:#22c55e; font-weight:bold;">Stale statistics</span> - table changed significantly since last ANALYZE. (2) <span style="color:#22c55e; font-weight:bold;">Correlated columns</span> - optimizer assumes column independence, but columns are related (e.g., city and zip code). (3) <span style="color:#22c55e; font-weight:bold;">Skewed data distribution</span> - most_common_vals in pg_stats misses your query values. (4) <span style="color:#22c55e; font-weight:bold;">Complex expressions</span> - optimizer cannot estimate function results. Fix by running ANALYZE, increasing statistics target for problematic columns (`ALTER TABLE ... ALTER COLUMN ... SET STATISTICS 1000`), or using extended statistics for correlated columns in PostgreSQL 10+.</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: How would you debug a query where EXPLAIN shows optimal index usage but EXPLAIN ANALYZE reveals poor performance due to buffer read patterns?</h6>

      <p style="color: #334155; line-height: 1.7;"><strong>Answer:</strong> This indicates <span style="color:#22c55e; font-weight:bold;">random I/O problems</span>. Use EXPLAIN (ANALYZE, BUFFERS) to see hit/read ratio. High "shared read" with low "shared hit" means data isn't cached and disk seeks dominate. Root causes: (1) <span style="color:#22c55e; font-weight:bold;">Index correlation</span> - index order doesn't match heap order, causing random access. Check `correlation` in pg_stats. (2) <span style="color:#22c55e; font-weight:bold;">Working set exceeds buffer cache</span> - shared_buffers too small for query's data needs. (3) <span style="color:#22c55e; font-weight:bold;">Sequential scan might be faster</span> - for wide table scans, sequential I/O beats random even with more rows. Solutions: CLUSTER table on frequently-used index, increase shared_buffers, use covering indexes to enable index-only scans, or pre-warm buffers with pg_prewarm for critical queries.</p>
    </div>
  </div>
</div>

---

## Section 3: Join Optimization

<span style="color:#22c55e; font-weight:bold;">Join operations</span> are often the most expensive part of query execution. Understanding join algorithms and optimization techniques is critical for performance. See [[Joins Mastery]](/topics/sql-learning/joins-mastery) for foundational join concepts.

### Join Algorithm Types

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 20px 0; text-align: center;">JOIN ALGORITHMS COMPARISON</h4>
<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; color: #475569; font-size: 13px;">
<tr style="background: #ffffff;">
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0; color: #1e40af;">Algorithm</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0; color: #1e40af;">Complexity</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0; color: #1e40af;">Best For</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0; color: #1e40af;">Memory</th>
</tr>
<tr style="background: #f1f5f9;">
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;"><span style="color: #f85149; font-weight: bold;">Nested Loop</span></td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">O(n * m)</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Small outer table, indexed inner table</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Low</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;"><span style="color: #1e40af; font-weight: bold;">Hash Join</span></td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">O(n + m)</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Equality joins, medium-large tables</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">High (hash table)</td>
</tr>
<tr style="background: #f1f5f9;">
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;"><span style="color: #7ee787; font-weight: bold;">Merge Join</span></td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">O(n log n + m log m)</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Pre-sorted data, range joins</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Low-Medium</td>
</tr>
</table>
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 24px 0; text-align: center;">JOIN ALGORITHM DECISION TREE</h4>
<div style="display: flex; flex-direction: column; gap: 16px; max-width: 700px; margin: 0 auto;">
  <div style="text-align: center;">
    <div style="background: #8957e5; color: #fff; padding: 16px 24px; border-radius: 8px; display: inline-block; font-weight: bold;">
      Is one table very small? (<100 rows)
    </div>
  </div>
  <div style="display: flex; justify-content: center; gap: 40px;">
    <div style="text-align: center;">
      <div style="color: #7ee787; font-size: 14px; margin-bottom: 8px;">YES</div>
      <div style="background: #238636; color: #fff; padding: 12px 20px; border-radius: 8px; font-weight: bold;">
        Nested Loop Join
      </div>
      <div style="color: #64748b; font-size: 12px; margin-top: 8px;">Small build, many lookups</div>
    </div>
    <div style="text-align: center;">
      <div style="color: #f0883e; font-size: 14px; margin-bottom: 8px;">NO</div>
      <div style="color: #1e40af; font-size: 24px;">|</div>
    </div>
  </div>
  <div style="text-align: center;">
    <div style="background: #8957e5; color: #fff; padding: 16px 24px; border-radius: 8px; display: inline-block; font-weight: bold;">
      Is join on equality (=)?
    </div>
  </div>
  <div style="display: flex; justify-content: center; gap: 40px;">
    <div style="text-align: center;">
      <div style="color: #7ee787; font-size: 14px; margin-bottom: 8px;">YES</div>
      <div style="background: #1f6feb; color: #fff; padding: 12px 20px; border-radius: 8px; font-weight: bold;">
        Hash Join
      </div>
      <div style="color: #64748b; font-size: 12px; margin-top: 8px;">Build hash, probe O(1)</div>
    </div>
    <div style="text-align: center;">
      <div style="color: #f0883e; font-size: 14px; margin-bottom: 8px;">NO (range/inequality)</div>
      <div style="background: #7ee787; color: #0d1117; padding: 12px 20px; border-radius: 8px; font-weight: bold;">
        Merge Join
      </div>
      <div style="color: #64748b; font-size: 12px; margin-top: 8px;">Sort both, merge scan</div>
    </div>
  </div>
</div>
</div>

### Join Optimization Strategies

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #166534; margin-top: 0;">Critical Join Optimization Rules</h4>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
      <strong style="color: #166534;">1. Always Index Join Columns</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Foreign keys should always have indexes. Missing FK indexes are the most common join performance killer.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #16a34a;">
      <strong style="color: #166534;">2. Filter Before Joining</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Apply WHERE conditions to reduce row count before join. Use CTEs or subqueries to pre-filter large tables.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #15803d;">
      <strong style="color: #166534;">3. Join Order Matters</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Start with most selective filter. Reduce intermediate result set size early. Modern optimizers reorder, but hints help.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #14532d;">
      <strong style="color: #166534;">4. Avoid Joining on Expressions</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;"><code>JOIN ON LOWER(a.name) = LOWER(b.name)</code> prevents index usage. Normalize data or use expression indexes.</p>
    </div>
  </div>
</div>

```sql
-- BAD: No filter before join, scans entire orders table
SELECT c.name, o.total
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE c.status = 'vip';

-- GOOD: Filter customers first using CTE, then join
WITH vip_customers AS (
    SELECT id, name
    FROM customers
    WHERE status = 'vip'  -- Index on status used here
)
SELECT vc.name, o.total
FROM vip_customers vc
JOIN orders o ON vc.id = o.customer_id;

-- ALSO GOOD: Optimizer usually handles this, but explicit is clearer
SELECT c.name, o.total
FROM customers c
JOIN orders o ON c.id = o.customer_id
    AND c.status = 'vip'  -- Pushdown to customers table
;
```

### Join Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: Why would a query slow down significantly when you add a new JOIN?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Adding a JOIN multiplies complexity in several ways: (1) <span style="color:#22c55e; font-weight:bold;">Missing index on join column</span> forces nested loop scans. (2) <span style="color:#22c55e; font-weight:bold;">Cardinality explosion</span> when joining produces more rows than either input (many-to-many relationships). (3) <span style="color:#22c55e; font-weight:bold;">Memory pressure</span> from hash join building large hash tables, potentially spilling to disk. (4) <span style="color:#22c55e; font-weight:bold;">Join order</span> places large table in outer position of nested loop. First step: run EXPLAIN ANALYZE to identify which join is expensive and what algorithm is used.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you optimize a query joining 6 tables where the optimizer consistently picks a suboptimal join order?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> With n tables, there are n! possible join orders. For 6 tables, that's 720 possibilities. When the optimizer fails: (1) <span style="color:#22c55e; font-weight:bold;">Update statistics</span> - most wrong orders stem from cardinality misestimation. (2) <span style="color:#22c55e; font-weight:bold;">Use CTEs strategically</span> - in PostgreSQL, CTEs historically acted as optimization fences (before v12), forcing materialization in specific order. (3) <span style="color:#22c55e; font-weight:bold;">Join hints</span> - MySQL supports STRAIGHT_JOIN, PostgreSQL has join_collapse_limit. (4) <span style="color:#22c55e; font-weight:bold;">Reduce join_collapse_limit</span> - setting it to 4-6 reduces planner search space, using query-written order. (5) <span style="color:#22c55e; font-weight:bold;">Extended statistics</span> - for correlated columns affecting join selectivity.</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: Design an approach for a query joining a 100M row fact table with 5 dimension tables where hash join memory usage is causing OOM errors.</h6>

      <p style="color: #334155; line-height: 1.7;"><strong>Answer:</strong> This is a classic <span style="color:#22c55e; font-weight:bold;">data warehouse join problem</span>. Multi-pronged approach: (1) <span style="color:#22c55e; font-weight:bold;">Increase work_mem</span> carefully - but this risks system-wide memory issues with concurrent queries. (2) <span style="color:#22c55e; font-weight:bold;">Force nested loop joins</span> for small dimension tables using `SET enable_hashjoin = off` or per-query hints, keeping hash join only for largest dimension. (3) <span style="color:#22c55e; font-weight:bold;">Partition the fact table</span> by date/region and query single partitions. (4) <span style="color:#22c55e; font-weight:bold;">Pre-aggregate</span> if queries are analytical - materialized views with common dimension rollups. (5) <span style="color:#22c55e; font-weight:bold;">Batch processing</span> - process in chunks using keyset pagination on fact table. (6) <span style="color:#22c55e; font-weight:bold;">Columnstore indexes</span> (if using SQL Server/PostgreSQL extensions) - dramatically reduce I/O for analytical patterns. (7) <span style="color:#22c55e; font-weight:bold;">Bitmap heap scans</span> - for dimension filtering, build bitmap from each dimension, AND them, then fetch. PostgreSQL does this automatically but you can encourage it with proper indexing.</p>
    </div>
  </div>
</div>

---

## Section 4: Subquery vs JOIN

Understanding when to use <span style="color:#22c55e; font-weight:bold;">subqueries</span> versus <span style="color:#22c55e; font-weight:bold;">JOINs</span> is crucial for query optimization. Modern optimizers can often transform between them, but explicit optimization still matters.

### Subquery Types and Performance

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #e2e8f0;">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
<div style="background: #ffffff; border-radius: 8px; padding: 16px; border-top: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 8px;">Scalar Subquery</div>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">Returns single value. Used in SELECT, WHERE.</div>
<div style="background: #f1f5f9; padding: 8px; border-radius: 4px; font-family: monospace; font-size: 11px; color: #64748b;">SELECT (SELECT MAX(salary) FROM employees)</div>
<div style="color: #f0883e; font-size: 11px; margin-top: 8px;">Cached if non-correlated</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; border-top: 3px solid #f85149;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 8px;">Correlated Subquery</div>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">References outer query. Re-executes per row.</div>
<div style="background: #f1f5f9; padding: 8px; border-radius: 4px; font-family: monospace; font-size: 11px; color: #64748b;">WHERE salary > (SELECT AVG(salary) FROM emp WHERE dept = e.dept)</div>
<div style="color: #f85149; font-size: 11px; margin-top: 8px;">O(n * subquery_cost) - Often slow!</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; border-top: 3px solid #58a6ff;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 8px;">EXISTS Subquery</div>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">Tests existence. Short-circuits on first match.</div>
<div style="background: #f1f5f9; padding: 8px; border-radius: 4px; font-family: monospace; font-size: 11px; color: #64748b;">WHERE EXISTS (SELECT 1 FROM orders WHERE user_id = u.id)</div>
<div style="color: #7ee787; font-size: 11px; margin-top: 8px;">Often optimal for existence checks</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; border-top: 3px solid #a371f7;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 8px;">IN Subquery</div>
<div style="color: #475569; font-size: 13px; margin-bottom: 12px;">Tests membership in result set.</div>
<div style="background: #f1f5f9; padding: 8px; border-radius: 4px; font-family: monospace; font-size: 11px; color: #64748b;">WHERE user_id IN (SELECT id FROM premium_users)</div>
<div style="color: #f0883e; font-size: 11px; margin-top: 8px;">Usually transformed to semi-join</div>
</div>
</div>
</div>

### When to Use Subquery vs JOIN

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 20px 0; text-align: center;">DECISION MATRIX</h4>
<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; color: #475569; font-size: 13px;">
<tr style="background: #ffffff;">
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0; color: #1e40af;">Scenario</th>
<th style="padding: 12px; text-align: center; border-bottom: 2px solid #e2e8f0; color: #7ee787;">Use JOIN</th>
<th style="padding: 12px; text-align: center; border-bottom: 2px solid #e2e8f0; color: #a371f7;">Use Subquery</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0; color: #f0883e;">Why</th>
</tr>
<tr style="background: #f1f5f9;">
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Need columns from both tables</td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #7ee787;">Preferred</td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0;">-</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Subquery in SELECT is scalar, can't return multiple columns</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Existence check only</td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0;">-</td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #a371f7;">EXISTS</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Short-circuits on first match, no duplicate risk</td>
</tr>
<tr style="background: #f1f5f9;">
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Aggregate comparison per row</td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #7ee787;">With derived table</td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0;">-</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Pre-compute aggregates, avoid correlated re-execution</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Anti-join (NOT IN/NOT EXISTS)</td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0;">-</td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #a371f7;">NOT EXISTS</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">NOT IN has NULL trap; NOT EXISTS handles NULLs correctly</td>
</tr>
<tr style="background: #f1f5f9;">
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Row deduplication needed</td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0;">DISTINCT or</td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0; color: #a371f7;">EXISTS</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">JOIN can multiply rows; EXISTS returns one row per outer</td>
</tr>
</table>
</div>
</div>

### Transforming Correlated Subqueries

```sql
-- BAD: Correlated subquery - runs subquery once per employee
SELECT e.name, e.salary
FROM employees e
WHERE e.salary > (
    SELECT AVG(salary)
    FROM employees
    WHERE department_id = e.department_id  -- Correlation!
);

-- GOOD: Pre-compute aggregates, then join
SELECT e.name, e.salary
FROM employees e
JOIN (
    SELECT department_id, AVG(salary) as dept_avg
    FROM employees
    GROUP BY department_id
) dept_stats ON e.department_id = dept_stats.department_id
WHERE e.salary > dept_stats.dept_avg;

-- ALSO GOOD: Using window function (single pass)
SELECT name, salary
FROM (
    SELECT name, salary, department_id,
           AVG(salary) OVER (PARTITION BY department_id) as dept_avg
    FROM employees
) e
WHERE salary > dept_avg;
```

See [[Window Functions]](/topics/sql-learning/window-functions) for more on analytical functions.

### The NOT IN NULL Trap

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #92400e; margin-top: 0;">Critical: NOT IN vs NOT EXISTS with NULLs</h4>
  <p style="color: #1e293b; line-height: 1.7;"><code>NOT IN</code> returns no rows if the subquery contains ANY NULL value. This is a common production bug.</p>

```sql
-- Table: orders has some NULL customer_id values

-- BROKEN: Returns ZERO rows if any order.customer_id is NULL!
SELECT * FROM customers
WHERE id NOT IN (SELECT customer_id FROM orders);

-- SAFE: Handles NULLs correctly
SELECT * FROM customers c
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.id
);

-- ALSO SAFE: Explicit NULL filter
SELECT * FROM customers
WHERE id NOT IN (
    SELECT customer_id FROM orders WHERE customer_id IS NOT NULL
);
```
</div>

### Subquery vs JOIN Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: Is a JOIN always faster than a subquery?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> No. Modern query optimizers often transform subqueries into equivalent joins automatically (subquery flattening). Performance depends on the <span style="color:#22c55e; font-weight:bold;">type of subquery</span>: (1) Non-correlated scalar subqueries are computed once and cached. (2) EXISTS subqueries can short-circuit and be faster than JOIN for existence checks. (3) Correlated subqueries without optimizer transformation are the problematic case, executing once per outer row. Use EXPLAIN to see if the optimizer has converted your subquery to a join.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: Why might a correlated subquery in the SELECT clause be acceptable sometimes?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> When: (1) <span style="color:#22c55e; font-weight:bold;">Result set is small</span> - if outer query returns 10 rows, subquery runs 10 times, which may be acceptable. (2) <span style="color:#22c55e; font-weight:bold;">Subquery is indexed and selective</span> - each execution is O(log n) and returns immediately. (3) <span style="color:#22c55e; font-weight:bold;">Query is clearer</span> - sometimes the correlated form expresses intent better than a complex outer join with COALESCE for missing values. (4) <span style="color:#22c55e; font-weight:bold;">LATERAL joins aren't available</span> - in older MySQL versions, correlated subquery was the only way to reference outer table in a derived table. Always validate with EXPLAIN ANALYZE on realistic data volumes.</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: How would you rewrite a triple-nested correlated subquery for a report that must run in under 2 seconds on 50M rows?</h6>

      <p style="color: #334155; line-height: 1.7;"><strong>Answer:</strong> Systematic approach: (1) <span style="color:#22c55e; font-weight:bold;">Flatten innermost first</span> - identify the deepest correlation and convert to a derived table with GROUP BY, joining on the correlation key. (2) <span style="color:#22c55e; font-weight:bold;">Use window functions</span> - many nested aggregations can become window functions with appropriate PARTITION BY. (3) <span style="color:#22c55e; font-weight:bold;">Pre-materialize in CTE</span> - PostgreSQL 12+ can inline CTEs, but explicit materialization (`WITH ... AS MATERIALIZED`) helps when reused. (4) <span style="color:#22c55e; font-weight:bold;">Index for the join pattern</span> - after flattening, ensure composite indexes match the join + filter pattern. (5) <span style="color:#22c55e; font-weight:bold;">Consider materialized view</span> - if this report runs frequently, pre-compute base aggregations. (6) <span style="color:#22c55e; font-weight:bold;">Batch by date range</span> - partition data and query recent partitions only. (7) <span style="color:#22c55e; font-weight:bold;">Profile each layer</span> - wrap intermediate steps in EXPLAIN ANALYZE via CTEs to find the bottleneck. For 50M rows in 2s, you need approximately 25M rows/second throughput, achievable only with proper indexing and parallelism.</p>
    </div>
  </div>
</div>

---

## Section 5: The N+1 Query Problem

The <span style="color:#22c55e; font-weight:bold;">N+1 problem</span> is one of the most common performance issues in applications using ORMs. It occurs when code executes 1 query to fetch N parent records, then N additional queries to fetch related data for each parent.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #f85149; margin: 0 0 24px 0; text-align: center;">N+1 QUERY PROBLEM VISUALIZED</h4>
<div style="display: flex; flex-wrap: wrap; gap: 24px; justify-content: center;">
  <div style="flex: 1; min-width: 280px; max-width: 350px;">
    <div style="color: #f85149; font-weight: bold; margin-bottom: 12px; text-align: center;">BAD: N+1 Queries (101 queries)</div>
    <div style="background: #ffffff; border-radius: 8px; padding: 16px; margin-bottom: 8px; border-left: 3px solid #f85149;">
      <div style="color: #475569; font-size: 12px; font-family: monospace;">SELECT * FROM users LIMIT 100;</div>
      <div style="color: #64748b; font-size: 11px; margin-top: 4px;">Query 1: Fetch all users</div>
    </div>
    <div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 3px solid #f85149;">
      <div style="color: #475569; font-size: 12px; font-family: monospace;">SELECT * FROM orders WHERE user_id = 1;</div>
      <div style="color: #475569; font-size: 12px; font-family: monospace;">SELECT * FROM orders WHERE user_id = 2;</div>
      <div style="color: #475569; font-size: 12px; font-family: monospace;">SELECT * FROM orders WHERE user_id = 3;</div>
      <div style="color: #64748b; font-size: 11px; margin-top: 4px;">... repeated 100 times!</div>
    </div>
  </div>
  <div style="flex: 1; min-width: 280px; max-width: 350px;">
    <div style="color: #7ee787; font-weight: bold; margin-bottom: 12px; text-align: center;">GOOD: 2 Queries Total</div>
    <div style="background: #ffffff; border-radius: 8px; padding: 16px; margin-bottom: 8px; border-left: 3px solid #7ee787;">
      <div style="color: #475569; font-size: 12px; font-family: monospace;">SELECT * FROM users LIMIT 100;</div>
      <div style="color: #64748b; font-size: 11px; margin-top: 4px;">Query 1: Fetch all users</div>
    </div>
    <div style="background: #ffffff; border-radius: 8px; padding: 16px; border-left: 3px solid #7ee787;">
      <div style="color: #475569; font-size: 12px; font-family: monospace;">SELECT * FROM orders WHERE user_id IN (1,2,3,...,100);</div>
      <div style="color: #64748b; font-size: 11px; margin-top: 4px;">Query 2: Fetch ALL orders in one query</div>
    </div>
  </div>
</div>
<div style="text-align: center; margin-top: 20px; padding: 16px; background: #ffffff; border-radius: 8px;">
  <span style="color: #f85149;">101 queries x 5ms = 505ms</span>
  <span style="color: #64748b; margin: 0 16px;">vs</span>
  <span style="color: #7ee787;">2 queries x 5ms = 10ms</span>
  <span style="color: #64748b; margin-left: 16px;">(50x faster)</span>
</div>
</div>

### Solutions to N+1 Problem

```python
# Python/SQLAlchemy Example

# BAD: N+1 - each user.orders triggers a new query
users = session.query(User).limit(100).all()
for user in users:
    print(user.orders)  # SELECT * FROM orders WHERE user_id = ? (100 times!)

# GOOD: Eager loading with joinedload (single query with JOIN)
from sqlalchemy.orm import joinedload
users = session.query(User).options(joinedload(User.orders)).limit(100).all()

# GOOD: Eager loading with subqueryload (2 queries, no cartesian)
from sqlalchemy.orm import subqueryload
users = session.query(User).options(subqueryload(User.orders)).limit(100).all()

# GOOD: selectinload (2 queries using IN clause - often fastest)
from sqlalchemy.orm import selectinload
users = session.query(User).options(selectinload(User.orders)).limit(100).all()
```

### N+1 in Raw SQL Context

```sql
-- Instead of application-level loop with individual queries:
-- for each user_id: SELECT * FROM orders WHERE user_id = ?

-- Use a single query with JOIN
SELECT u.id, u.name, o.id as order_id, o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01';

-- Or use IN clause for batch loading
SELECT * FROM orders
WHERE user_id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

-- For large IN lists, use VALUES table or temp table
SELECT o.*
FROM orders o
JOIN (VALUES (1), (2), (3), (4), (5)) AS t(user_id)
ON o.user_id = t.user_id;
```

### Detecting N+1 in Production

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #166534; margin-top: 0;">N+1 Detection Strategies</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
      <strong style="color: #166534;">Query Logging</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Enable query logging and look for repeated similar queries with different parameters.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #16a34a;">
      <strong style="color: #166534;">APM Tools</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">New Relic, Datadog, Scout show query counts per request. Flag >50 queries.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #15803d;">
      <strong style="color: #166534;">Development Gems/Packages</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">bullet (Rails), nplusone (Django), sqlalchemy-collectd-logger</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #14532d;">
      <strong style="color: #166534;">pg_stat_statements</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Look for queries with high calls count but low rows-per-call ratio.</p>
    </div>
  </div>
</div>

### N+1 Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: What is the N+1 query problem and how do you solve it?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> The N+1 problem occurs when code fetches N records, then issues a separate query for each record's related data, resulting in N+1 total queries instead of 1-2. Example: fetching 100 users, then 100 separate queries for their orders. Solutions: (1) <span style="color:#22c55e; font-weight:bold;">Eager loading</span> in ORMs (joinedload, include, with). (2) <span style="color:#22c55e; font-weight:bold;">Batch loading</span> with IN clauses. (3) <span style="color:#22c55e; font-weight:bold;">DataLoader pattern</span> for GraphQL/batched APIs. (4) <span style="color:#22c55e; font-weight:bold;">JOINs</span> in raw SQL to fetch everything at once.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: When might N+1 queries actually be acceptable or even preferable?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> N+1 can be acceptable when: (1) <span style="color:#22c55e; font-weight:bold;">N is very small</span> (5-10 items) - overhead is negligible. (2) <span style="color:#22c55e; font-weight:bold;">Lazy loading with caching</span> - if Redis caches most lookups, actual DB hits are few. (3) <span style="color:#22c55e; font-weight:bold;">Avoiding cartesian explosion</span> - JOINing many-to-many relationships can create huge result sets; separate queries may transfer less data. (4) <span style="color:#22c55e; font-weight:bold;">Conditional loading</span> - only load related data when needed (user clicks expand). (5) <span style="color:#22c55e; font-weight:bold;">Connection pool exhaustion</span> - a single massive JOIN might hold a connection longer than N small fast queries from a pool. The key is measuring actual performance, not dogmatically avoiding a pattern.</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: Design a solution for a GraphQL API where N+1 queries emerge from arbitrary client query shapes, with nested relations 4 levels deep.</h6>

      <p style="color: #334155; line-height: 1.7;"><strong>Answer:</strong> This requires a <span style="color:#22c55e; font-weight:bold;">DataLoader pattern</span> with sophisticated batching: (1) <span style="color:#22c55e; font-weight:bold;">Request-scoped DataLoaders</span> - one per entity type, accumulate keys within single request tick, batch-load all at once. (2) <span style="color:#22c55e; font-weight:bold;">Query complexity analysis</span> - before execution, analyze AST and reject queries exceeding depth/complexity limits (e.g., max depth 4, max complexity 1000). (3) <span style="color:#22c55e; font-weight:bold;">Persistent queries</span> - client sends query hash, server uses pre-analyzed, pre-optimized query plan. (4) <span style="color:#22c55e; font-weight:bold;">Join Monster / Hasura approach</span> - compile GraphQL to optimized SQL with JOINs, avoiding ORM layer entirely. (5) <span style="color:#22c55e; font-weight:bold;">@defer directive</span> - stream nested data in chunks, allowing frontend to render incrementally. (6) <span style="color:#22c55e; font-weight:bold;">Query result caching</span> - cache entire response for common query shapes. (7) <span style="color:#22c55e; font-weight:bold;">Rate limiting by complexity</span> - charge "query points" based on estimated DB work, not just request count.</p>
    </div>
  </div>
</div>

---

## Section 6: Pagination Strategies

<span style="color:#22c55e; font-weight:bold;">Pagination</span> is essential for handling large result sets, but naive OFFSET-based pagination degrades as offset grows. Understanding pagination trade-offs is critical for APIs and data-heavy applications.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 24px 0; text-align: center;">PAGINATION STRATEGIES COMPARISON</h4>
<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; color: #475569; font-size: 13px;">
<tr style="background: #ffffff;">
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0; color: #1e40af;">Strategy</th>
<th style="padding: 12px; text-align: center; border-bottom: 2px solid #e2e8f0; color: #1e40af;">Performance</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0; color: #1e40af;">Pros</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0; color: #1e40af;">Cons</th>
</tr>
<tr style="background: #f1f5f9;">
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;"><span style="color: #f85149; font-weight: bold;">OFFSET/LIMIT</span></td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0;"><span style="color: #f85149;">O(offset + limit)</span></td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Simple, random page access</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Slow for large offsets, inconsistent with concurrent writes</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;"><span style="color: #7ee787; font-weight: bold;">Keyset/Cursor</span></td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0;"><span style="color: #7ee787;">O(log n + limit)</span></td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Constant time, stable pagination</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">No random page access, complex for multi-column sort</td>
</tr>
<tr style="background: #f1f5f9;">
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;"><span style="color: #1e40af; font-weight: bold;">Seek Method</span></td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0;"><span style="color: #7ee787;">O(log n + limit)</span></td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Handles ties, multi-column keys</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Requires unique tiebreaker column</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;"><span style="color: #a371f7; font-weight: bold;">Deferred Join</span></td>
<td style="padding: 12px; text-align: center; border-bottom: 1px solid #e2e8f0;"><span style="color: #f0883e;">O(offset) on index only</span></td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Works with OFFSET, faster than naive</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Still linear, requires covering index</td>
</tr>
</table>
</div>
</div>

### OFFSET/LIMIT Problem

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #f85149; margin: 0 0 16px 0;">Why OFFSET Gets Slower</h4>
<div style="display: flex; flex-wrap: wrap; gap: 16px;">
<div style="flex: 1; min-width: 280px; background: #ffffff; border-radius: 8px; padding: 16px;">
<div style="color: #f85149; font-size: 14px; font-weight: bold; margin-bottom: 8px;">Page 1: OFFSET 0</div>
<div style="font-family: monospace; font-size: 12px; color: #64748b;">Scan 20 rows, return 20</div>
<div style="color: #7ee787; font-size: 12px;">Time: 2ms</div>
</div>
<div style="flex: 1; min-width: 280px; background: #ffffff; border-radius: 8px; padding: 16px;">
<div style="color: #f0883e; font-size: 14px; font-weight: bold; margin-bottom: 8px;">Page 500: OFFSET 10000</div>
<div style="font-family: monospace; font-size: 12px; color: #64748b;">Scan 10020 rows, discard 10000, return 20</div>
<div style="color: #f0883e; font-size: 12px;">Time: 150ms</div>
</div>
<div style="flex: 1; min-width: 280px; background: #ffffff; border-radius: 8px; padding: 16px;">
<div style="color: #f85149; font-size: 14px; font-weight: bold; margin-bottom: 8px;">Page 5000: OFFSET 100000</div>
<div style="font-family: monospace; font-size: 12px; color: #64748b;">Scan 100020 rows, discard 100000, return 20</div>
<div style="color: #f85149; font-size: 12px;">Time: 1500ms</div>
</div>
</div>
</div>

```sql
-- BAD: OFFSET scans and discards rows
SELECT * FROM products
ORDER BY created_at DESC
LIMIT 20 OFFSET 100000;  -- Scans 100,020 rows!

-- EXPLAIN shows:
-- Limit (cost=12847.82..12850.37 rows=20)
--   -> Index Scan Backward using idx_created_at (cost=0.43..128478.23 rows=1000000)
```

### Keyset (Cursor) Pagination

```sql
-- GOOD: Keyset pagination - uses index efficiently
-- Page 1
SELECT id, name, created_at
FROM products
ORDER BY created_at DESC, id DESC
LIMIT 20;

-- Returns last row: created_at = '2024-01-15 10:30:00', id = 12345

-- Page 2 (and beyond) - always O(log n + limit)
SELECT id, name, created_at
FROM products
WHERE (created_at, id) < ('2024-01-15 10:30:00', 12345)
ORDER BY created_at DESC, id DESC
LIMIT 20;

-- EXPLAIN shows: Index Scan with condition (constant time seek)
```

### Seek Method for Multi-Column Ordering

```sql
-- For ORDER BY created_at DESC, priority ASC, id DESC
-- Need row value comparison for correct ordering

-- Using ROW() comparison (PostgreSQL)
SELECT * FROM tasks
WHERE (created_at, priority, id) < (
    '2024-01-15', 2, 999
)
ORDER BY created_at DESC, priority ASC, id DESC
LIMIT 20;

-- Alternative with explicit conditions (more portable)
SELECT * FROM tasks
WHERE created_at < '2024-01-15'
   OR (created_at = '2024-01-15' AND priority > 2)
   OR (created_at = '2024-01-15' AND priority = 2 AND id < 999)
ORDER BY created_at DESC, priority ASC, id DESC
LIMIT 20;
```

### Deferred Join Pattern

```sql
-- When you must support OFFSET but want better performance
-- Works when sorting column has a covering index

-- BAD: Scans wide rows
SELECT * FROM products
ORDER BY created_at DESC
LIMIT 20 OFFSET 100000;

-- BETTER: Deferred join - scan only index, then fetch full rows
SELECT p.*
FROM products p
JOIN (
    SELECT id
    FROM products
    ORDER BY created_at DESC
    LIMIT 20 OFFSET 100000
) AS page_ids ON p.id = page_ids.id
ORDER BY p.created_at DESC;

-- Inner query uses index-only scan (id is in the index)
-- Only 20 full row fetches instead of 100,020
```

### Pagination with Total Count

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #92400e; margin-top: 0;">Warning: COUNT(*) Can Be Expensive</h4>
  <p style="color: #1e293b; line-height: 1.7;">Getting total count requires scanning all matching rows, even if you only return 20. For tables with millions of rows, this can take seconds.</p>

```sql
-- SLOW: Full count on every page request
SELECT COUNT(*) FROM products WHERE category_id = 5;
SELECT * FROM products WHERE category_id = 5 ORDER BY id LIMIT 20 OFFSET 100;

-- BETTER: Approximate count (PostgreSQL)
SELECT reltuples::bigint AS estimate
FROM pg_class WHERE relname = 'products';

-- BETTER: Cache counts or use EXPLAIN estimate
EXPLAIN SELECT * FROM products WHERE category_id = 5;
-- Parse "rows=X" from output for approximate count

-- BEST: Don't show total pages - use "Load More" / infinite scroll
-- Only show "Page 1 of many" or "1000+ results"
```
</div>

### Pagination Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: Why does OFFSET-based pagination get slower for later pages?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> OFFSET requires the database to <span style="color:#22c55e; font-weight:bold;">scan and discard rows</span> before returning results. For OFFSET 10000, LIMIT 20, the database scans 10,020 rows, throws away 10,000, and returns 20. This is O(offset + limit) complexity. Even with an index, each row must be accessed to determine sort order. The solution is <span style="color:#22c55e; font-weight:bold;">keyset pagination</span>, which uses a WHERE clause on the sort columns, allowing the index to seek directly to the starting position in O(log n) time.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you implement stable pagination when rows are being inserted/deleted concurrently?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> OFFSET pagination is inherently unstable - inserting a row shifts all subsequent pages. Solutions: (1) <span style="color:#22c55e; font-weight:bold;">Keyset pagination on immutable column</span> - use auto-increment ID or creation timestamp that never changes. New inserts don't affect cursor position. (2) <span style="color:#22c55e; font-weight:bold;">Snapshot isolation</span> - PostgreSQL's REPEATABLE READ or SERIALIZABLE ensures consistent view within transaction. (3) <span style="color:#22c55e; font-weight:bold;">Point-in-time pagination</span> - filter by `created_at < @request_start_time` to exclude new rows. (4) <span style="color:#22c55e; font-weight:bold;">Opaque cursor tokens</span> - encode timestamp + ID + filter hash; validate cursor matches current filters. (5) <span style="color:#22c55e; font-weight:bold;">Accept eventual consistency</span> - for non-critical listings, document that pages may shift.</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: Design a pagination system for a search feature with arbitrary sort orders (price ASC, rating DESC, name ASC, etc.) on 100M products.</h6>

      <p style="color: #334155; line-height: 1.7;"><strong>Answer:</strong> Multi-sort keyset pagination is complex because you need an index per sort combination. Approach: (1) <span style="color:#22c55e; font-weight:bold;">Limit sort options</span> - offer 5-10 preset combinations, create composite indexes for each (price_id, rating_id, name_id). (2) <span style="color:#22c55e; font-weight:bold;">Row value comparison</span> - use tuple comparison `(col1, col2, id) < (val1, val2, cursor_id)` for multi-column keyset. (3) <span style="color:#22c55e; font-weight:bold;">Search engine offloading</span> - Elasticsearch/Solr have native cursor support with search_after; delegate complex sorting there. (4) <span style="color:#22c55e; font-weight:bold;">Materialized rankings</span> - pre-compute rank columns for common sorts, store as materialized columns or views. (5) <span style="color:#22c55e; font-weight:bold;">Deferred join fallback</span> - for rare sort combinations, use covering index on (sort_key, id), deferred join for full rows. (6) <span style="color:#22c55e; font-weight:bold;">Result set caching</span> - cache first N pages of popular sorts in Redis with TTL. (7) <span style="color:#22c55e; font-weight:bold;">Hybrid approach</span> - keyset for first 50 pages, degrade to "jump to end" for extreme pages. Document that accessing page 50000 of 100000 is expensive.</p>
    </div>
  </div>
</div>

---

## Section 7: Query Rewriting Techniques

<span style="color:#22c55e; font-weight:bold;">Query rewriting</span> transforms inefficient SQL into optimized equivalents. While modern optimizers handle many cases automatically, explicit rewriting often yields better plans.

### Index-Friendly Rewrites

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #166534; margin-top: 0;">Patterns for Index Usage</h4>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #166534;">Avoid Functions on Indexed Columns</strong>

```sql
-- BAD: Index on created_at won't be used
WHERE YEAR(created_at) = 2024
WHERE DATE(created_at) = '2024-01-15'
WHERE LOWER(email) = 'test@example.com'

-- GOOD: SARGable predicates (Search ARGument ABLE)
WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'
WHERE created_at >= '2024-01-15' AND created_at < '2024-01-16'
WHERE email = 'test@example.com'  -- with case-insensitive collation
-- Or create expression index: CREATE INDEX idx ON users(LOWER(email))
```
</div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #166534;">Avoid Implicit Type Conversion</strong>

```sql
-- BAD: user_id is INT, forces type conversion
WHERE user_id = '123'
WHERE phone_number = 5551234567  -- phone is VARCHAR

-- GOOD: Match types exactly
WHERE user_id = 123
WHERE phone_number = '5551234567'
```
</div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #166534;">Avoid Leading Wildcards</strong>

```sql
-- BAD: Cannot use index
WHERE email LIKE '%@gmail.com'
WHERE name LIKE '%smith%'

-- GOOD: Prefix wildcards can use index
WHERE email LIKE 'john%'

-- ALTERNATIVE: Trigram index (PostgreSQL)
CREATE INDEX idx_name_trgm ON users USING gin(name gin_trgm_ops);
WHERE name LIKE '%smith%'  -- Now uses trigram index

-- ALTERNATIVE: Reverse index for suffix search
CREATE INDEX idx_email_rev ON users(REVERSE(email));
WHERE REVERSE(email) LIKE REVERSE('%@gmail.com')
```
</div>
  </div>
</div>

### EXISTS vs IN vs JOIN

```sql
-- Finding users who have placed orders

-- EXISTS: Short-circuits on first match, often fastest
SELECT * FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id
);

-- IN: May be rewritten to semi-join by optimizer
SELECT * FROM users
WHERE id IN (SELECT user_id FROM orders);

-- JOIN: Can return duplicates if relationship is 1:many
SELECT DISTINCT u.*  -- DISTINCT adds overhead
FROM users u
JOIN orders o ON u.id = o.user_id;

-- For anti-join (users WITHOUT orders):

-- NOT EXISTS: Handles NULLs correctly, usually optimal
SELECT * FROM users u
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id
);

-- NOT IN: DANGEROUS if subquery can return NULL
SELECT * FROM users
WHERE id NOT IN (SELECT user_id FROM orders);  -- Returns 0 rows if any NULL!

-- LEFT JOIN with NULL check: Alternative to NOT EXISTS
SELECT u.*
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;
```

### Aggregate Optimization

```sql
-- Checking existence vs counting

-- BAD: Counts all rows
SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END
FROM orders WHERE user_id = 123;

-- GOOD: Stops at first match
SELECT EXISTS(
    SELECT 1 FROM orders WHERE user_id = 123
);

-- BAD: Counts then filters
SELECT * FROM users
WHERE (SELECT COUNT(*) FROM orders WHERE user_id = users.id) > 5;

-- GOOD: Pre-aggregate then join
SELECT u.*
FROM users u
JOIN (
    SELECT user_id, COUNT(*) as order_count
    FROM orders
    GROUP BY user_id
    HAVING COUNT(*) > 5
) active_users ON u.id = active_users.user_id;
```

### Batch Operations

```sql
-- BAD: Many small updates (N round trips)
UPDATE users SET last_seen = NOW() WHERE id = 1;
UPDATE users SET last_seen = NOW() WHERE id = 2;
UPDATE users SET last_seen = NOW() WHERE id = 3;
-- ... repeated 1000 times

-- GOOD: Single batch update
UPDATE users
SET last_seen = NOW()
WHERE id IN (1, 2, 3, 4, 5, ... 1000);

-- GOOD: Batch with different values using VALUES
UPDATE users u
SET balance = u.balance + v.amount
FROM (VALUES
    (1, 100.00),
    (2, 50.00),
    (3, 75.50)
) AS v(user_id, amount)
WHERE u.id = v.user_id;

-- GOOD: Batch INSERT with ON CONFLICT (upsert)
INSERT INTO user_stats (user_id, login_count, last_login)
VALUES
    (1, 1, NOW()),
    (2, 1, NOW()),
    (3, 1, NOW())
ON CONFLICT (user_id) DO UPDATE
SET login_count = user_stats.login_count + 1,
    last_login = EXCLUDED.last_login;
```

See [[Connection Pooling]](/topics/system-design/connection-pooling) for managing database connections efficiently.

---

## Section 8: Advanced Optimization Techniques

### Covering Indexes (Index-Only Scans)

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 16px 0;">Covering Index Explained</h4>
<div style="display: flex; flex-wrap: wrap; gap: 16px;">
<div style="flex: 1; min-width: 280px;">
<div style="color: #f85149; font-weight: bold; margin-bottom: 8px;">Regular Index Scan</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="background: #ffffff; padding: 12px; border-radius: 6px; font-size: 12px;">1. Scan index (find row pointers)</div>
<div style="text-align: center; color: #1e40af;">|</div>
<div style="background: #ffffff; padding: 12px; border-radius: 6px; font-size: 12px;">2. Heap fetch (read full row from disk)</div>
<div style="text-align: center; color: #1e40af;">|</div>
<div style="background: #ffffff; padding: 12px; border-radius: 6px; font-size: 12px;">3. Return columns</div>
</div>
<div style="color: #f85149; font-size: 12px; margin-top: 8px;">Random I/O to table</div>
</div>
<div style="flex: 1; min-width: 280px;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 8px;">Index-Only Scan</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="background: #238636; padding: 12px; border-radius: 6px; font-size: 12px; color: #fff;">1. Scan index (all data in index)</div>
<div style="text-align: center; color: #1e40af;">|</div>
<div style="background: #238636; padding: 12px; border-radius: 6px; font-size: 12px; color: #fff;">2. Return columns directly</div>
</div>
<div style="color: #7ee787; font-size: 12px; margin-top: 8px;">No table access needed!</div>
</div>
</div>
</div>

```sql
-- Create covering index with INCLUDE (PostgreSQL 11+)
CREATE INDEX idx_users_email_covering
ON users(email)
INCLUDE (name, created_at);

-- This query uses index-only scan:
SELECT name, created_at
FROM users
WHERE email = 'test@example.com';

-- EXPLAIN shows: Index Only Scan

-- MySQL equivalent: Include columns in index
CREATE INDEX idx_users_covering
ON users(email, name, created_at);
```

See [[Indexing Deep Dive]](/topics/sql-learning/indexing-deep-dive) for comprehensive index strategies.

### Partial Indexes

```sql
-- Index only relevant subset of data

-- Instead of full index (10M rows):
CREATE INDEX idx_orders_status ON orders(status);

-- Partial index (only 100K active orders):
CREATE INDEX idx_orders_active
ON orders(status, created_at)
WHERE status IN ('pending', 'processing');

-- Useful for soft-delete patterns:
CREATE INDEX idx_users_active_email
ON users(email)
WHERE deleted_at IS NULL;

-- Query must match the WHERE clause:
SELECT * FROM users WHERE email = 'x@y.com' AND deleted_at IS NULL;
-- Uses partial index!
```

### Expression Indexes

```sql
-- Index on computed expressions

-- For case-insensitive email lookups:
CREATE INDEX idx_users_email_lower
ON users(LOWER(email));

SELECT * FROM users WHERE LOWER(email) = 'test@example.com';

-- For JSONB field access:
CREATE INDEX idx_settings_theme
ON user_settings((settings->>'theme'));

SELECT * FROM user_settings WHERE settings->>'theme' = 'dark';

-- For date extraction:
CREATE INDEX idx_orders_year_month
ON orders(EXTRACT(YEAR FROM created_at), EXTRACT(MONTH FROM created_at));
```

### Materialized Views

```sql
-- Pre-compute expensive aggregations

CREATE MATERIALIZED VIEW monthly_sales_summary AS
SELECT
    DATE_TRUNC('month', order_date) as month,
    product_category,
    COUNT(*) as order_count,
    SUM(total_amount) as total_sales,
    AVG(total_amount) as avg_order_value
FROM orders o
JOIN products p ON o.product_id = p.id
GROUP BY 1, 2;

-- Create index on materialized view
CREATE INDEX idx_sales_summary_month
ON monthly_sales_summary(month);

-- Query the view (instant instead of aggregating millions of rows)
SELECT * FROM monthly_sales_summary
WHERE month >= '2024-01-01';

-- Refresh when data changes (can be scheduled)
REFRESH MATERIALIZED VIEW monthly_sales_summary;

-- Concurrent refresh (allows queries during refresh)
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales_summary;
```

---

## Section 9: Monitoring and Diagnostics

### PostgreSQL Performance Views

```sql
-- Find slowest queries (requires pg_stat_statements extension)
SELECT
    query,
    calls,
    round(total_exec_time::numeric, 2) as total_ms,
    round(mean_exec_time::numeric, 2) as avg_ms,
    round((100 * total_exec_time / sum(total_exec_time) OVER ())::numeric, 2) as pct
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;

-- Find queries with high execution time variance
SELECT
    query,
    calls,
    round(stddev_exec_time::numeric, 2) as stddev_ms,
    round(mean_exec_time::numeric, 2) as avg_ms,
    round(max_exec_time::numeric, 2) as max_ms
FROM pg_stat_statements
WHERE calls > 100
ORDER BY stddev_exec_time DESC
LIMIT 10;

-- Identify unused indexes
SELECT
    schemaname || '.' || relname as table,
    indexrelname as index,
    pg_size_pretty(pg_relation_size(i.indexrelid)) as size,
    idx_scan as scans
FROM pg_stat_user_indexes i
JOIN pg_index USING (indexrelid)
WHERE idx_scan = 0
AND NOT indisprimary
AND NOT indisunique
ORDER BY pg_relation_size(i.indexrelid) DESC;

-- Table bloat estimation
SELECT
    schemaname || '.' || relname as table,
    n_dead_tup as dead_rows,
    n_live_tup as live_rows,
    round(100 * n_dead_tup::numeric / NULLIF(n_live_tup + n_dead_tup, 0), 2) as dead_pct,
    last_vacuum,
    last_autovacuum
FROM pg_stat_user_tables
WHERE n_dead_tup > 10000
ORDER BY n_dead_tup DESC;
```

### MySQL Performance Schema

```sql
-- Enable performance schema (if not enabled)
-- my.cnf: performance_schema = ON

-- Find slow queries
SELECT
    DIGEST_TEXT as query,
    COUNT_STAR as calls,
    ROUND(SUM_TIMER_WAIT/1000000000000, 3) as total_sec,
    ROUND(AVG_TIMER_WAIT/1000000000, 3) as avg_ms
FROM performance_schema.events_statements_summary_by_digest
ORDER BY SUM_TIMER_WAIT DESC
LIMIT 10;

-- Check index usage
SELECT
    object_schema,
    object_name,
    index_name,
    count_read,
    count_fetch,
    count_insert,
    count_update,
    count_delete
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE index_name IS NOT NULL
ORDER BY count_read + count_fetch DESC
LIMIT 20;

-- Show current running queries
SELECT
    id,
    user,
    host,
    db,
    command,
    time,
    state,
    LEFT(info, 100) as query
FROM information_schema.processlist
WHERE command != 'Sleep'
ORDER BY time DESC;
```

### Key Metrics to Track

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 20px 0;">Database Health Indicators</h4>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
<div style="background: #ffffff; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #7ee787; font-size: 24px; font-weight: bold;">< 50ms</div>
<div style="color: #64748b; font-size: 12px;">P95 Query Latency</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #7ee787; font-size: 24px; font-weight: bold;">> 99%</div>
<div style="color: #64748b; font-size: 12px;">Buffer Cache Hit Ratio</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #f0883e; font-size: 24px; font-weight: bold;">< 20%</div>
<div style="color: #64748b; font-size: 12px;">Table Bloat</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #f85149; font-size: 24px; font-weight: bold;">0</div>
<div style="color: #64748b; font-size: 12px;">Lock Wait Timeouts</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #1e40af; font-size: 24px; font-weight: bold;">< 80%</div>
<div style="color: #64748b; font-size: 12px;">Connection Pool Usage</div>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #a371f7; font-size: 24px; font-weight: bold;">> 1</div>
<div style="color: #64748b; font-size: 12px;">Index Scans per Seq Scan</div>
</div>
</div>
</div>

---

## Quick Reference

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #e2e8f0;">
<h4 style="color: #1e40af; margin: 0 0 20px 0; text-align: center;">Query Optimization Checklist</h4>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
<div>
<div style="color: #7ee787; font-weight: bold; margin-bottom: 12px;">DO</div>
<ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 13px; line-height: 1.8;">
<li>Run EXPLAIN ANALYZE on slow queries</li>
<li>Index columns used in WHERE, JOIN, ORDER BY</li>
<li>Select only needed columns</li>
<li>Use keyset pagination for large datasets</li>
<li>Batch operations (inserts, updates)</li>
<li>Use EXISTS for existence checks</li>
<li>Pre-aggregate in subqueries before joining</li>
<li>Keep statistics updated (ANALYZE)</li>
<li>Use covering indexes for hot queries</li>
<li>Monitor slow query logs</li>
</ul>
</div>
<div>
<div style="color: #f85149; font-weight: bold; margin-bottom: 12px;">AVOID</div>
<ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 13px; line-height: 1.8;">
<li>SELECT * in production code</li>
<li>Functions on indexed columns in WHERE</li>
<li>Leading wildcards in LIKE patterns</li>
<li>Large OFFSET values for pagination</li>
<li>Correlated subqueries (rewrite to JOIN)</li>
<li>NOT IN with NULLable columns</li>
<li>Missing indexes on foreign keys</li>
<li>Type mismatches in comparisons</li>
<li>N+1 query patterns in loops</li>
<li>Ignoring EXPLAIN estimated vs actual rows</li>
</ul>
</div>
</div>
</div>

---

## Interview Preparation Summary

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #166534; margin-top: 0;">Key Topics to Master</h4>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
      <strong style="color: #166534;">EXPLAIN Plans</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Read scan types, understand cost model, interpret buffer usage, identify plan problems</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #16a34a;">
      <strong style="color: #166534;">Index Strategy</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Composite index column order, covering indexes, partial indexes, when NOT to index</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #15803d;">
      <strong style="color: #166534;">Join Optimization</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Algorithm selection, join order, filter pushdown, handling many-table joins</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #14532d;">
      <strong style="color: #166534;">Query Patterns</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Subquery vs JOIN trade-offs, N+1 problem, pagination strategies, batch operations</p>
    </div>
  </div>
</div>

---

## Related Topics

- [[Indexing Deep Dive]](/topics/sql-learning/indexing-deep-dive) - Comprehensive index strategies and B-tree internals
- [[SQL Fundamentals]](/topics/sql-learning/sql-fundamentals) - Core SQL concepts and syntax
- [[Joins Mastery]](/topics/sql-learning/joins-mastery) - Join types and advanced join patterns
- [[Window Functions]](/topics/sql-learning/window-functions) - Analytical functions for complex queries
- [[Subqueries and CTEs]](/topics/sql-learning/subqueries-ctes) - Common table expressions and subquery patterns
- [[Connection Pooling]](/topics/system-design/connection-pooling) - Managing database connections efficiently
- [[Rate Limiting]](/topics/system-design/rate-limiting) - Protecting databases from overload
- [[Latency and Throughput]](/topics/system-design/latency-throughput) - Understanding performance metrics
