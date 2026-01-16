# Database Indexing Deep Dive

## What is an Index?

An index is a data structure that improves the speed of data retrieval operations on a database table. Think of it like an index in a book - instead of reading every page to find a topic, you look up the index to find the exact page.

### The Problem Without Indexes

Without an index, the database must perform a **sequential scan** (also called a full table scan), checking every row to find matches.

```
Table with 1,000,000 rows
Query: SELECT * FROM users WHERE email = 'john@example.com'

Without Index: Check all 1,000,000 rows = O(n) time
With Index:    Look up in B-Tree = O(log n) time ≈ 20 operations
```

---

## B-Tree Index (Default)

The B-Tree (Balanced Tree) is the most common index type. It maintains sorted data and allows for efficient:
- Equality searches (`=`)
- Range queries (`<`, `>`, `BETWEEN`)
- Sorting (`ORDER BY`)

### B-Tree Structure Visualization

```
                        [50]
                       /    \
               [20, 30]      [70, 80]
              /   |   \      /   |   \
          [10] [25,27] [35] [60,65] [75] [85,90]
           |      |      |     |      |     |
          ROW    ROW    ROW   ROW    ROW   ROW
         PTRS   PTRS   PTRS  PTRS   PTRS  PTRS
```

### How B-Tree Search Works

**Example: Find value 65**

1. Start at root [50]
2. 65 > 50, go right to [70, 80]
3. 65 < 70, go left to [60, 65]
4. Found! Return row pointer

**Total operations: 3 (vs potentially millions in sequential scan)**

<div id="btree-animation" class="visualization" data-viz-type="btree" data-viz-demo="demoBTreeSearch">
    <svg viewBox="0 0 800 400" style="width:100%; max-width:800px;">
        <!-- Root Node -->
        <g class="node" id="node-root">
            <rect x="375" y="20" width="50" height="30" fill="#4A90D9" rx="5"/>
            <text x="400" y="40" fill="white" text-anchor="middle" font-size="14">50</text>
        </g>

        <!-- Level 1 Nodes -->
        <g class="node" id="node-l1-left">
            <rect x="175" y="100" width="80" height="30" fill="#5BA55B" rx="5"/>
            <text x="215" y="120" fill="white" text-anchor="middle" font-size="14">20 | 30</text>
        </g>
        <g class="node" id="node-l1-right">
            <rect x="545" y="100" width="80" height="30" fill="#5BA55B" rx="5"/>
            <text x="585" y="120" fill="white" text-anchor="middle" font-size="14">70 | 80</text>
        </g>

        <!-- Level 2 Nodes (Leaf) -->
        <g class="node leaf" id="node-leaf-1">
            <rect x="50" y="180" width="50" height="30" fill="#888" rx="5"/>
            <text x="75" y="200" fill="white" text-anchor="middle" font-size="12">10</text>
        </g>
        <g class="node leaf" id="node-leaf-2">
            <rect x="130" y="180" width="70" height="30" fill="#888" rx="5"/>
            <text x="165" y="200" fill="white" text-anchor="middle" font-size="12">25 | 27</text>
        </g>
        <g class="node leaf" id="node-leaf-3">
            <rect x="230" y="180" width="50" height="30" fill="#888" rx="5"/>
            <text x="255" y="200" fill="white" text-anchor="middle" font-size="12">35</text>
        </g>
        <g class="node leaf" id="node-leaf-4">
            <rect x="470" y="180" width="70" height="30" fill="#888" rx="5"/>
            <text x="505" y="200" fill="white" text-anchor="middle" font-size="12">60 | 65</text>
        </g>
        <g class="node leaf" id="node-leaf-5">
            <rect x="570" y="180" width="50" height="30" fill="#888" rx="5"/>
            <text x="595" y="200" fill="white" text-anchor="middle" font-size="12">75</text>
        </g>
        <g class="node leaf" id="node-leaf-6">
            <rect x="650" y="180" width="70" height="30" fill="#888" rx="5"/>
            <text x="685" y="200" fill="white" text-anchor="middle" font-size="12">85 | 90</text>
        </g>

        <!-- Edges -->
        <line x1="400" y1="50" x2="215" y2="100" stroke="#ccc" stroke-width="2"/>
        <line x1="400" y1="50" x2="585" y2="100" stroke="#ccc" stroke-width="2"/>
        <line x1="195" y1="130" x2="75" y2="180" stroke="#ccc" stroke-width="2"/>
        <line x1="215" y1="130" x2="165" y2="180" stroke="#ccc" stroke-width="2"/>
        <line x1="235" y1="130" x2="255" y2="180" stroke="#ccc" stroke-width="2"/>
        <line x1="565" y1="130" x2="505" y2="180" stroke="#ccc" stroke-width="2"/>
        <line x1="585" y1="130" x2="595" y2="180" stroke="#ccc" stroke-width="2"/>
        <line x1="605" y1="130" x2="685" y2="180" stroke="#ccc" stroke-width="2"/>

        <!-- Search Path Indicator (animated) -->
        <circle id="search-indicator" cx="400" cy="35" r="8" fill="#FF6B6B" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite"/>
        </circle>

        <!-- Legend -->
        <text x="400" y="280" text-anchor="middle" font-size="14" fill="#666">
            B-Tree Index: O(log n) lookup time
        </text>
        <text x="400" y="300" text-anchor="middle" font-size="12" fill="#888">
            Searching for value 65: Root → Right Child → Leaf Node
        </text>
    </svg>
</div>

---

## Index Types Comparison

| Index Type | Best For | Example Use Case |
|------------|----------|------------------|
| **B-Tree** | Equality, Range, Sorting | `WHERE id = 5`, `WHERE date > '2024-01-01'` |
| **Hash** | Equality only | `WHERE email = 'user@example.com'` |
| **GIN** | Array/JSON containment | `WHERE tags @> ARRAY['sql']` |
| **GiST** | Geometric/Full-text | `WHERE point <@ box`, Full-text search |
| **BRIN** | Large, naturally ordered data | Time-series data |

---

## Creating Indexes

### Single Column Index
```sql
-- Basic index
CREATE INDEX idx_requests_status ON requests(status);

-- Verify index creation
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'requests';
```

### Composite Index
```sql
-- Index on multiple columns
CREATE INDEX idx_requests_user_status ON requests(user_ref_id, status);
```

**Important: Column Order Matters!**

```
Index on (A, B, C) can efficiently query:
✓ WHERE A = 1
✓ WHERE A = 1 AND B = 2
✓ WHERE A = 1 AND B = 2 AND C = 3
✗ WHERE B = 2 (cannot use index efficiently)
✗ WHERE C = 3 (cannot use index efficiently)
```

<div id="composite-index-diagram" class="visualization">
    <svg viewBox="0 0 600 250" style="width:100%; max-width:600px;">
        <!-- Column boxes -->
        <rect x="50" y="30" width="100" height="40" fill="#4A90D9" rx="5"/>
        <text x="100" y="55" fill="white" text-anchor="middle" font-weight="bold">Column A</text>

        <rect x="200" y="30" width="100" height="40" fill="#5BA55B" rx="5"/>
        <text x="250" y="55" fill="white" text-anchor="middle" font-weight="bold">Column B</text>

        <rect x="350" y="30" width="100" height="40" fill="#F5A623" rx="5"/>
        <text x="400" y="55" fill="white" text-anchor="middle" font-weight="bold">Column C</text>

        <!-- Arrows -->
        <text x="170" y="55" fill="#333" font-size="20">→</text>
        <text x="320" y="55" fill="#333" font-size="20">→</text>

        <!-- Usage examples -->
        <text x="50" y="110" fill="#28a745" font-size="14">✓ WHERE A = 1</text>
        <text x="50" y="135" fill="#28a745" font-size="14">✓ WHERE A = 1 AND B = 2</text>
        <text x="50" y="160" fill="#28a745" font-size="14">✓ WHERE A = 1 AND B = 2 AND C = 3</text>

        <text x="350" y="110" fill="#dc3545" font-size="14">✗ WHERE B = 2</text>
        <text x="350" y="135" fill="#dc3545" font-size="14">✗ WHERE C = 3</text>
        <text x="350" y="160" fill="#dc3545" font-size="14">✗ WHERE B = 2 AND C = 3</text>

        <!-- Note -->
        <text x="300" y="220" text-anchor="middle" font-size="12" fill="#666">
            Leftmost prefix rule: Index columns must be used from left to right
        </text>
    </svg>
</div>

---

## Partial Index

A partial index only indexes rows that meet a condition. Great for:
- Skipping NULL values
- Indexing only "active" records
- Reducing index size

```sql
-- Only index non-cancelled requests
CREATE INDEX idx_active_requests
ON requests(created_at)
WHERE status != 'cancelled';

-- Only index future slots
CREATE INDEX idx_future_slots
ON collection_slots(scheduled_date)
WHERE scheduled_date >= CURRENT_DATE;
```

---

## Expression Index

Index computed expressions instead of raw column values.

```sql
-- Index lowercase email for case-insensitive search
CREATE INDEX idx_users_email_lower
ON user_references(LOWER(cached_email));

-- Now this query uses the index:
SELECT * FROM user_references
WHERE LOWER(cached_email) = 'john@example.com';
```

---

## Covering Index (INCLUDE)

Include non-indexed columns to avoid table lookups.

```sql
-- Covering index: includes columns needed by query
CREATE INDEX idx_requests_status_covering
ON requests(status)
INCLUDE (request_number, final_amount, created_at);

-- This query can be answered entirely from the index:
SELECT request_number, final_amount, created_at
FROM requests
WHERE status = 'completed';
```

<div id="covering-index-diagram" class="visualization">
    <svg viewBox="0 0 700 200" style="width:100%; max-width:700px;">
        <!-- Without covering index -->
        <g>
            <text x="50" y="30" font-weight="bold" fill="#333">Without Covering Index:</text>
            <rect x="50" y="45" width="100" height="40" fill="#4A90D9" rx="5"/>
            <text x="100" y="70" fill="white" text-anchor="middle" font-size="12">Index Scan</text>

            <text x="170" y="70" fill="#333" font-size="20">→</text>

            <rect x="200" y="45" width="100" height="40" fill="#F5A623" rx="5"/>
            <text x="250" y="70" fill="white" text-anchor="middle" font-size="12">Table Lookup</text>

            <text x="320" y="70" fill="#333" font-size="20">→</text>

            <rect x="350" y="45" width="80" height="40" fill="#5BA55B" rx="5"/>
            <text x="390" y="70" fill="white" text-anchor="middle" font-size="12">Result</text>

            <text x="500" y="70" fill="#dc3545" font-size="14">2 operations</text>
        </g>

        <!-- With covering index -->
        <g>
            <text x="50" y="130" font-weight="bold" fill="#333">With Covering Index:</text>
            <rect x="50" y="145" width="150" height="40" fill="#4A90D9" rx="5"/>
            <text x="125" y="170" fill="white" text-anchor="middle" font-size="12">Index-Only Scan</text>

            <text x="220" y="170" fill="#333" font-size="20">→</text>

            <rect x="250" y="145" width="80" height="40" fill="#5BA55B" rx="5"/>
            <text x="290" y="170" fill="white" text-anchor="middle" font-size="12">Result</text>

            <text x="400" y="170" fill="#28a745" font-size="14">1 operation (faster!)</text>
        </g>
    </svg>
</div>

---

## EXPLAIN ANALYZE

Use `EXPLAIN ANALYZE` to understand how queries use indexes.

```sql
EXPLAIN ANALYZE
SELECT * FROM requests
WHERE status = 'completed';
```

### Understanding the Output

```
Index Scan using idx_requests_status on requests
    Index Cond: (status = 'completed')
    Rows Removed by Filter: 0
    Planning Time: 0.152 ms
    Execution Time: 0.089 ms
```

### Scan Types (Best to Worst for large tables)

| Scan Type | Description | When Used |
|-----------|-------------|-----------|
| **Index Only Scan** | Data retrieved entirely from index | Covering index available |
| **Index Scan** | Use index, then fetch rows | Selective query with index |
| **Bitmap Index Scan** | Batch lookup using bitmap | Multiple index conditions |
| **Sequential Scan** | Read entire table | No suitable index, small table |

---

## When NOT to Use Indexes

Indexes have overhead! Don't use them when:

1. **Table is small** (< 1000 rows)
   - Sequential scan is often faster

2. **High selectivity** (query returns most rows)
   - Full table scan is more efficient

3. **Frequently updated columns**
   - Index maintenance is expensive

4. **Write-heavy tables**
   - Each INSERT/UPDATE must update indexes

```sql
-- Check index usage statistics
SELECT
    schemaname,
    relname AS table_name,
    indexrelname AS index_name,
    idx_scan AS times_used,
    idx_tup_read AS tuples_read,
    idx_tup_fetch AS tuples_fetched
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

---

## Index Maintenance

### Check Index Size
```sql
SELECT
    indexrelname AS index_name,
    pg_size_pretty(pg_relation_size(indexrelid)) AS index_size
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY pg_relation_size(indexrelid) DESC;
```

### Find Unused Indexes
```sql
SELECT
    indexrelname AS index_name,
    idx_scan AS times_used
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND indexrelname NOT LIKE '%_pkey';
```

### Rebuild Bloated Indexes
```sql
-- Rebuild index (locks table)
REINDEX INDEX idx_requests_status;

-- Rebuild concurrently (no lock, PostgreSQL 12+)
REINDEX INDEX CONCURRENTLY idx_requests_status;
```

---

## Best Practices Summary

1. **Start with queries, not tables**
   - Analyze slow queries first
   - Create indexes for WHERE, JOIN, ORDER BY columns

2. **Use composite indexes wisely**
   - Order columns by selectivity (most selective first)
   - Consider column usage patterns

3. **Monitor index usage**
   - Remove unused indexes
   - Check for missing indexes

4. **Consider partial indexes**
   - Great for status flags, NULL values
   - Reduces index size significantly

5. **Use EXPLAIN ANALYZE**
   - Always verify index usage
   - Compare different approaches

---

## Interactive Exercise

Try these queries in the SQL Dashboard to see indexes in action:

```sql
-- 1. Check existing indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'requests';

-- 2. See query plan without index
EXPLAIN ANALYZE
SELECT * FROM blood_tests WHERE name LIKE 'Complete%';

-- 3. Create an expression index
CREATE INDEX idx_blood_tests_name_lower ON blood_tests(LOWER(name));

-- 4. See improved query plan
EXPLAIN ANALYZE
SELECT * FROM blood_tests WHERE LOWER(name) = 'complete blood count';
```
