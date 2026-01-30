# Database Indexing Deep Dive

## Overview

Database indexing is the <span style="color: #22c55e; font-weight: 600;">single most important optimization technique</span> for query performance. An index is a separate data structure that maintains a sorted reference to rows in a table, enabling the database to locate data without scanning every row. Understanding index internals—B-tree structure, selectivity, covering indexes, and query planner behavior—is essential for designing performant database schemas.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #e2e8f0;">
  <h4 style="margin-top: 0; color: #1e293b; font-size: 18px;">Core Performance Equation</h4>
  <div style="font-family: 'Courier New', monospace; font-size: 15px; background: #ffffff; padding: 16px; border-radius: 8px; text-align: center; color: #1e293b; border: 1px solid #e2e8f0;">
    Query Time = (Disk I/O x Pages Read) + (CPU x Rows Processed) + (Network x Result Size)
  </div>
  <p style="color: #475569; margin: 16px 0 0 0; font-size: 14px; text-align: center;">Indexes minimize disk I/O by reducing pages read from O(n) to O(log n)</p>
</div>

**Critical Assumption**: Indexes assume that <span style="color: #22c55e; font-weight: 600;">selective queries</span> (returning small percentage of rows) are the common case. For queries returning most rows, a full table scan is often faster than index lookups.

**Key Trade-off**: Read performance vs. Write overhead. Every index must be updated on INSERT/UPDATE/DELETE operations. More indexes means faster reads but slower writes.

---

## Section 1: B-Tree Index Architecture

### Deep Mechanics

The <span style="color: #22c55e; font-weight: 600;">B-Tree (Balanced Tree)</span> is the default and most versatile index type in virtually all relational databases. It maintains sorted data in a tree structure where all leaf nodes are at the same depth, guaranteeing O(log n) lookup time regardless of data distribution.

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #166534; margin-top: 0;">B-Tree Properties</h4>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
      <strong style="color: #166534;">Self-Balancing</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Insertions and deletions automatically rebalance the tree. No manual maintenance required for balance. Height remains O(log n) regardless of insertion order.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #16a34a;">
      <strong style="color: #166534;">High Fan-Out</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Each node contains many keys (typically 100-500). A 3-level B-tree with fan-out 100 can index 100³ = 1 million rows. Most queries require only 3-4 disk reads.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #15803d;">
      <strong style="color: #166534;">Sequential Leaf Access</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Leaf nodes are linked in sorted order. Range queries traverse leaves sequentially without returning to internal nodes. Enables efficient ORDER BY and BETWEEN operations.</p>
    </div>
  </div>
</div>

### B-Tree Structure Visualization

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
  <h4 style="color: #1e293b; margin-top: 0; text-align: center;">B-Tree Index Internal Structure</h4>

  <div style="display: flex; flex-direction: column; align-items: center; gap: 20px; margin-top: 20px;">
    <!-- Root Node -->
    <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px 32px; border-radius: 12px; text-align: center;">
      <div style="font-size: 12px; opacity: 0.9;">ROOT NODE</div>
      <div style="font-size: 18px; font-weight: bold; margin-top: 4px;">[ 50 ]</div>
    </div>

    <!-- Arrows down -->
    <div style="display: flex; gap: 200px; color: #64748b;">
      <span>↙</span>
      <span>↘</span>
    </div>

    <!-- Internal Nodes -->
    <div style="display: flex; gap: 80px;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 14px 24px; border-radius: 10px; text-align: center;">
        <div style="font-size: 11px; opacity: 0.9;">INTERNAL</div>
        <div style="font-size: 16px; font-weight: bold;">[ 20 | 35 ]</div>
      </div>
      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 14px 24px; border-radius: 10px; text-align: center;">
        <div style="font-size: 11px; opacity: 0.9;">INTERNAL</div>
        <div style="font-size: 16px; font-weight: bold;">[ 70 | 85 ]</div>
      </div>
    </div>

    <!-- Arrows to leaves -->
    <div style="display: flex; gap: 40px; color: #64748b; font-size: 14px;">
      <span>↙</span><span>↓</span><span>↘</span>
      <span style="margin-left: 60px;">↙</span><span>↓</span><span>↘</span>
    </div>

    <!-- Leaf Nodes with horizontal links -->
    <div style="display: flex; align-items: center; gap: 8px;">
      <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 10px 14px; border-radius: 8px; text-align: center;">
        <div style="font-size: 10px; color: #92400e;">LEAF</div>
        <div style="font-size: 13px; font-weight: bold; color: #78350f;">10,15,18</div>
        <div style="font-size: 10px; color: #92400e;">→RowIDs</div>
      </div>
      <span style="color: #f59e0b;">⟷</span>
      <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 10px 14px; border-radius: 8px; text-align: center;">
        <div style="font-size: 10px; color: #92400e;">LEAF</div>
        <div style="font-size: 13px; font-weight: bold; color: #78350f;">22,28,33</div>
        <div style="font-size: 10px; color: #92400e;">→RowIDs</div>
      </div>
      <span style="color: #f59e0b;">⟷</span>
      <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 10px 14px; border-radius: 8px; text-align: center;">
        <div style="font-size: 10px; color: #92400e;">LEAF</div>
        <div style="font-size: 13px; font-weight: bold; color: #78350f;">37,42,48</div>
        <div style="font-size: 10px; color: #92400e;">→RowIDs</div>
      </div>
      <span style="color: #f59e0b;">⟷</span>
      <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 10px 14px; border-radius: 8px; text-align: center;">
        <div style="font-size: 10px; color: #92400e;">LEAF</div>
        <div style="font-size: 13px; font-weight: bold; color: #78350f;">55,62,68</div>
        <div style="font-size: 10px; color: #92400e;">→RowIDs</div>
      </div>
      <span style="color: #f59e0b;">⟷</span>
      <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 10px 14px; border-radius: 8px; text-align: center;">
        <div style="font-size: 10px; color: #92400e;">LEAF</div>
        <div style="font-size: 13px; font-weight: bold; color: #78350f;">73,78,82</div>
        <div style="font-size: 10px; color: #92400e;">→RowIDs</div>
      </div>
      <span style="color: #f59e0b;">⟷</span>
      <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 10px 14px; border-radius: 8px; text-align: center;">
        <div style="font-size: 10px; color: #92400e;">LEAF</div>
        <div style="font-size: 13px; font-weight: bold; color: #78350f;">88,92,97</div>
        <div style="font-size: 10px; color: #92400e;">→RowIDs</div>
      </div>
    </div>
  </div>

  <div style="background: #e0f2fe; padding: 16px; border-radius: 8px; margin-top: 24px;">
    <strong style="color: #0369a1;">Key Insight:</strong>
    <span style="color: #0c4a6e;"> Leaf nodes contain actual row pointers and are doubly-linked for efficient range scans. Finding value 62: Root(50) → Right → Internal(70,85) → Left → Leaf(55,62,68) = 3 disk reads.</span>
  </div>
</div>

### B-Tree vs B+Tree

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">B-Tree Variants Comparison</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div>
      <div style="background: #dbeafe; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
        <strong style="color: #1e40af;">B-Tree (Original)</strong>
        <ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
          <li>Data stored in all nodes</li>
          <li>Faster single-key lookup (may find in internal node)</li>
          <li>Less efficient range scans</li>
          <li>Lower fan-out (data takes space)</li>
        </ul>
      </div>
    </div>
    <div>
      <div style="background: #dcfce7; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
        <strong style="color: #166534;">B+Tree (Used in Databases)</strong>
        <ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
          <li>Data only in leaf nodes</li>
          <li>Internal nodes store only keys</li>
          <li>Excellent range scans (linked leaves)</li>
          <li>Higher fan-out, shallower tree</li>
        </ul>
      </div>
    </div>
  </div>
  <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin-top: 16px;">
    <strong style="color: #92400e;">Interview Note:</strong>
    <p style="color: #78350f; margin: 8px 0 0 0; font-size: 14px;">When interviews mention "B-Tree indexes," they typically mean B+Tree. PostgreSQL, MySQL InnoDB, Oracle, and SQL Server all use B+Tree variants. The distinction matters for understanding why range queries are efficient.</p>
  </div>
</div>

### B-Tree Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: Why do databases use B-Trees instead of binary search trees or hash tables for indexes?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> B-Trees are optimized for <span style="color: #22c55e; font-weight: 600;">disk-based storage</span>. Binary trees have O(log₂ n) height, meaning many disk seeks for large datasets. B-Trees have high fan-out (hundreds of keys per node), reducing height to typically 3-4 levels even for billions of rows. Unlike hash tables, B-Trees maintain sorted order, enabling efficient range queries (BETWEEN, ORDER BY) and prefix searches (LIKE 'abc%'). Each B-Tree node is sized to match disk page size (typically 8KB), maximizing data read per I/O operation.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: How does B-Tree node splitting work during insertion, and what is its impact on write performance?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> When inserting into a full node, the B-Tree performs a <span style="color: #22c55e; font-weight: 600;">node split</span>: (1) Allocate new node, (2) Move half the keys to new node, (3) Promote middle key to parent, (4) Update parent pointers. If parent is also full, splitting cascades upward—potentially creating a new root level. Write amplification factor is typically 2-3x: each logical insert may write multiple pages. To mitigate: (a) Use <span style="color: #22c55e; font-weight: 600;">fill factor</span> below 100% (e.g., 90%) to leave room for inserts, (b) Batch inserts in sorted order when possible, (c) Use append-only structures (LSM-trees) for write-heavy workloads. PostgreSQL FILLFACTOR, MySQL innodb_page_size affect this behavior.</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: Explain B-Tree index fragmentation. How do you detect it and what are the trade-offs of REINDEX vs VACUUM in PostgreSQL?</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> <span style="color: #22c55e; font-weight: 600;">Index fragmentation</span> occurs when: (1) <strong>Internal fragmentation</strong>: pages are partially filled due to splits/deletes, wasting space; (2) <strong>External fragmentation</strong>: logical order differs from physical order on disk, causing random I/O during scans. Detection: In PostgreSQL, query <code>pgstattuple('index_name')</code> to see dead tuples and fragmentation ratio. <code>pg_stat_user_indexes</code> shows index bloat. <strong>VACUUM</strong>: Marks dead tuples as reusable but doesn't compact; low overhead, online operation. <strong>REINDEX</strong>: Rebuilds entire index from scratch; creates new compact structure but requires exclusive lock (blocking writes). <strong>REINDEX CONCURRENTLY</strong> (PostgreSQL 12+): Builds new index alongside old, swaps atomically; requires 2x space temporarily but doesn't block writes. Trade-off: VACUUM is maintenance, REINDEX is repair. For highly bloated indexes (>30% dead space), REINDEX CONCURRENTLY is preferred. Monitor with [[query-optimization]](/topic/sql-learning/query-optimization) techniques.</p>
    </div>
  </div>
</div>

---

## Section 2: Hash Indexes

### Deep Mechanics

<span style="color: #22c55e; font-weight: 600;">Hash indexes</span> use a hash function to map keys directly to bucket locations, providing O(1) average-case lookup time. However, they have significant limitations compared to B-Trees.

<div style="background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: #f8fafc;">Hash Index Characteristics</h4>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 16px;">
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: #f8fafc;">O(1) Equality Lookup</strong>
      <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 13px;">Single hash computation + bucket access. Fastest possible for exact match queries like WHERE id = 12345.</p>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: #f8fafc;">No Range Support</strong>
      <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 13px;">Hash destroys ordering. Cannot support <, >, BETWEEN, ORDER BY, or LIKE 'prefix%' queries.</p>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: #f8fafc;">Collision Handling</strong>
      <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 13px;">Multiple keys may hash to same bucket. Uses chaining or open addressing. Degrades with poor hash function.</p>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: #f8fafc;">Resize Operations</strong>
      <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 13px;">When load factor exceeds threshold, entire hash table must be rebuilt. Expensive operation that can cause latency spikes.</p>
    </div>
  </div>
</div>

### Hash Index Structure

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
  <h4 style="color: #1e293b; margin-top: 0; text-align: center;">Hash Index Lookup Process</h4>

  <div style="display: flex; align-items: center; justify-content: center; gap: 20px; margin-top: 24px; flex-wrap: wrap;">
    <!-- Input Key -->
    <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px 24px; border-radius: 12px; text-align: center;">
      <div style="font-size: 11px; opacity: 0.9;">INPUT KEY</div>
      <div style="font-size: 18px; font-weight: bold;">'user@email.com'</div>
    </div>

    <!-- Arrow -->
    <div style="font-size: 24px; color: #64748b;">→</div>

    <!-- Hash Function -->
    <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 16px 24px; border-radius: 12px; text-align: center;">
      <div style="font-size: 11px; opacity: 0.9;">HASH FUNCTION</div>
      <div style="font-size: 14px; font-weight: bold; font-family: monospace;">hash(key) % buckets</div>
    </div>

    <!-- Arrow -->
    <div style="font-size: 24px; color: #64748b;">→</div>

    <!-- Bucket Number -->
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 16px 24px; border-radius: 12px; text-align: center;">
      <div style="font-size: 11px; opacity: 0.9;">BUCKET #</div>
      <div style="font-size: 18px; font-weight: bold;">42</div>
    </div>
  </div>

  <!-- Bucket Array -->
  <div style="margin-top: 32px;">
    <div style="display: flex; justify-content: center; gap: 4px;">
      <div style="background: #e2e8f0; padding: 8px 12px; border-radius: 4px; font-size: 12px; color: #64748b;">0</div>
      <div style="background: #e2e8f0; padding: 8px 12px; border-radius: 4px; font-size: 12px; color: #64748b;">1</div>
      <div style="background: #e2e8f0; padding: 8px 12px; border-radius: 4px; font-size: 12px; color: #64748b;">...</div>
      <div style="background: #fef3c7; padding: 8px 12px; border-radius: 4px; font-size: 12px; color: #92400e; border: 2px solid #f59e0b;">41</div>
      <div style="background: #dcfce7; padding: 8px 12px; border-radius: 4px; font-size: 12px; color: #166534; border: 2px solid #22c55e; font-weight: bold;">42</div>
      <div style="background: #fef3c7; padding: 8px 12px; border-radius: 4px; font-size: 12px; color: #92400e; border: 2px solid #f59e0b;">43</div>
      <div style="background: #e2e8f0; padding: 8px 12px; border-radius: 4px; font-size: 12px; color: #64748b;">...</div>
      <div style="background: #e2e8f0; padding: 8px 12px; border-radius: 4px; font-size: 12px; color: #64748b;">n</div>
    </div>
    <div style="text-align: center; margin-top: 8px; color: #64748b; font-size: 13px;">Bucket Array (Direct Access)</div>
  </div>

  <!-- Bucket Contents -->
  <div style="display: flex; justify-content: center; margin-top: 16px;">
    <div style="background: #dcfce7; border: 2px solid #22c55e; padding: 16px; border-radius: 8px;">
      <div style="font-size: 12px; color: #166534; font-weight: bold;">Bucket 42 Contents:</div>
      <div style="font-size: 13px; color: #166534; margin-top: 8px; font-family: monospace;">
        'user@email.com' → Row 1847<br>
        'test@mail.com' → Row 3921<br>
        <span style="color: #92400e;">(collision chain)</span>
      </div>
    </div>
  </div>
</div>

### When to Use Hash Indexes

```sql
-- Hash indexes are useful for exact equality on high-cardinality columns
-- PostgreSQL example:
CREATE INDEX idx_users_email_hash ON users USING HASH (email);

-- Good use case: exact match lookups
SELECT * FROM users WHERE email = 'john@example.com';  -- O(1)

-- Hash index CANNOT help with:
SELECT * FROM users WHERE email LIKE 'john%';     -- Range/prefix
SELECT * FROM users WHERE email > 'a@example.com'; -- Range
SELECT * FROM users ORDER BY email;               -- Sorting
```

<div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #991b1b; margin-top: 0;">Hash Index Limitations in Production</h4>
  <div style="display: grid; gap: 12px;">
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #991b1b;">PostgreSQL < 10</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Hash indexes were not crash-safe (not WAL-logged). NEVER use hash indexes on PostgreSQL versions before 10. PostgreSQL 10+ fixed this, but B-Tree is still preferred in most cases.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #991b1b;">MySQL InnoDB</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">InnoDB does not support hash indexes directly. The "Adaptive Hash Index" is an internal optimization that InnoDB creates automatically for frequently accessed B-Tree pages.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #991b1b;">Memory Tables Only</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">In MySQL MEMORY engine, hash indexes are default and very fast. But data is lost on restart. Use for session tables or caches only.</p>
    </div>
  </div>
</div>

### Hash Index Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: When would you choose a hash index over a B-Tree index?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Hash indexes excel at <span style="color: #22c55e; font-weight: 600;">pure equality lookups</span> on high-cardinality columns where you never need range queries, sorting, or prefix matching. Classic examples: lookup by UUID, session token validation, API key authentication. The O(1) vs O(log n) difference matters at extreme scale—millions of lookups per second. However, B-Trees are so well-optimized that the practical difference is often negligible, while B-Trees provide much more flexibility.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: How does hash collision affect index performance, and how do databases handle it?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> <span style="color: #22c55e; font-weight: 600;">Hash collisions</span> occur when different keys map to the same bucket. Databases use two strategies: (1) <strong>Chaining</strong>: Each bucket contains a linked list of colliding entries—lookup becomes O(k) where k is chain length. (2) <strong>Open addressing</strong>: Probe to next available slot using linear/quadratic probing or double hashing. PostgreSQL uses chaining with overflow pages. Performance degrades when load factor (entries/buckets) exceeds ~0.7. Worst case with poor hash function or adversarial input: all keys hash to same bucket, degenerating to O(n). Mitigations: cryptographic hash functions, load factor monitoring, automatic resizing.</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: Explain how extensible hashing works and why PostgreSQL adopted it for hash indexes in version 10.</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> <span style="color: #22c55e; font-weight: 600;">Extensible hashing</span> allows the hash table to grow incrementally without rehashing all entries. It uses a directory that maps hash prefixes to buckets. When a bucket overflows, only that bucket splits—the directory doubles but only one bucket is redistributed. This avoids the traditional hash table problem where resize rehashes everything. PostgreSQL 10 reimplemented hash indexes using extensible hashing with: (1) WAL logging for crash safety, (2) Incremental bucket splits avoiding long locks, (3) Better concurrency with page-level locking. Key insight: directory depth increases logarithmically with data size. A hash index with 2^20 buckets needs only 20 bits of directory, regardless of total entries. Trade-off: directory lookup adds indirection, but enables online growth. This makes hash indexes viable for OLTP workloads where tables grow continuously.</p>
    </div>
  </div>
</div>

---

## Section 3: Composite (Multi-Column) Indexes

### Deep Mechanics

A <span style="color: #22c55e; font-weight: 600;">composite index</span> indexes multiple columns together, stored as concatenated keys in the B-Tree. The <span style="color: #22c55e; font-weight: 600;">leftmost prefix rule</span> determines which queries can use the index.

<div style="background: linear-gradient(135deg, #059669 0%, #34d399 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: white;">Composite Index Key Structure</h4>
  <div style="font-family: 'Courier New', monospace; font-size: 15px; background: rgba(255,255,255,0.15); padding: 20px; border-radius: 8px; margin-top: 16px;">
    <div style="margin-bottom: 12px;">INDEX ON (country, city, postal_code)</div>
    <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13px;">
      <div style="background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 4px;">Key: "USA|New York|10001" → RowID: 1847</div>
      <div style="background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 4px;">Key: "USA|New York|10002" → RowID: 2391</div>
      <div style="background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 4px;">Key: "USA|Los Angeles|90001" → RowID: 847</div>
      <div style="background: rgba(255,255,255,0.1); padding: 8px 12px; border-radius: 4px;">Key: "UK|London|EC1A" → RowID: 5123</div>
    </div>
  </div>
  <p style="color: #a7f3d0; margin: 16px 0 0 0; font-size: 14px;">Keys are sorted lexicographically by concatenated values. Think of it like a phone book sorted by (LastName, FirstName).</p>
</div>

### Leftmost Prefix Rule Visualization

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
  <h4 style="color: #1e293b; margin-top: 0; text-align: center;">Composite Index: (A, B, C)</h4>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px;">
    <!-- Can Use Index -->
    <div>
      <h5 style="color: #166534; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
        <span style="background: #22c55e; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 14px;">✓</span>
        CAN Use Index
      </h5>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="background: #dcfce7; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
          <code style="color: #166534; font-size: 13px;">WHERE A = 1</code>
          <div style="font-size: 12px; color: #15803d; margin-top: 4px;">Uses first column</div>
        </div>
        <div style="background: #dcfce7; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
          <code style="color: #166534; font-size: 13px;">WHERE A = 1 AND B = 2</code>
          <div style="font-size: 12px; color: #15803d; margin-top: 4px;">Uses first two columns</div>
        </div>
        <div style="background: #dcfce7; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
          <code style="color: #166534; font-size: 13px;">WHERE A = 1 AND B = 2 AND C = 3</code>
          <div style="font-size: 12px; color: #15803d; margin-top: 4px;">Uses all columns (best)</div>
        </div>
        <div style="background: #dcfce7; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
          <code style="color: #166534; font-size: 13px;">WHERE A = 1 AND B > 5</code>
          <div style="font-size: 12px; color: #15803d; margin-top: 4px;">Range on B after equality on A</div>
        </div>
        <div style="background: #dcfce7; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
          <code style="color: #166534; font-size: 13px;">WHERE A = 1 ORDER BY B</code>
          <div style="font-size: 12px; color: #15803d; margin-top: 4px;">Index provides sort order</div>
        </div>
      </div>
    </div>

    <!-- Cannot Use Index -->
    <div>
      <h5 style="color: #991b1b; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
        <span style="background: #ef4444; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 14px;">✗</span>
        CANNOT Use Index Efficiently
      </h5>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="background: #fef2f2; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
          <code style="color: #991b1b; font-size: 13px;">WHERE B = 2</code>
          <div style="font-size: 12px; color: #b91c1c; margin-top: 4px;">Skips first column A</div>
        </div>
        <div style="background: #fef2f2; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
          <code style="color: #991b1b; font-size: 13px;">WHERE C = 3</code>
          <div style="font-size: 12px; color: #b91c1c; margin-top: 4px;">Skips first two columns</div>
        </div>
        <div style="background: #fef2f2; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
          <code style="color: #991b1b; font-size: 13px;">WHERE B = 2 AND C = 3</code>
          <div style="font-size: 12px; color: #b91c1c; margin-top: 4px;">Still skips A</div>
        </div>
        <div style="background: #fef2f2; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
          <code style="color: #991b1b; font-size: 13px;">WHERE A > 1 AND B = 2</code>
          <div style="font-size: 12px; color: #b91c1c; margin-top: 4px;">Range on A breaks B usage</div>
        </div>
        <div style="background: #fef2f2; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
          <code style="color: #991b1b; font-size: 13px;">WHERE A = 1 OR B = 2</code>
          <div style="font-size: 12px; color: #b91c1c; margin-top: 4px;">OR typically prevents index use</div>
        </div>
      </div>
    </div>
  </div>

  <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin-top: 24px;">
    <strong style="color: #92400e;">Critical Rule:</strong>
    <span style="color: #78350f;"> Range conditions (>, <, BETWEEN, LIKE 'prefix%') can only use the index up to and including that column. Subsequent columns in the index cannot be used for filtering—only for sorting within matched rows.</span>
  </div>
</div>

### Column Order Strategy

```sql
-- WRONG: Low selectivity column first
CREATE INDEX idx_orders_status_user ON orders(status, user_id);
-- status has few distinct values (pending, completed, cancelled)
-- Matches millions of rows before filtering by user_id

-- RIGHT: High selectivity column first
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
-- user_id is highly selective (one user among millions)
-- Quickly narrows to user's orders, then filters by status

-- Check column cardinality:
SELECT
    COUNT(DISTINCT user_id) as user_cardinality,    -- High (millions)
    COUNT(DISTINCT status) as status_cardinality    -- Low (3-5)
FROM orders;
```

### Composite Index Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: Why does column order matter in a composite index?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Composite indexes store keys as concatenated values, sorted lexicographically. The index can only be used starting from the <span style="color: #22c55e; font-weight: 600;">leftmost column</span>. An index on (A, B, C) is like a phone book sorted by (LastName, FirstName)—you can't efficiently look up by FirstName alone because entries aren't grouped that way. Column order determines which query patterns the index supports: put equality columns first, range columns after, and the most selective (highest cardinality) columns earliest for best performance.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: Given queries WHERE status = 'active' AND created_at > '2024-01-01' AND user_id = 123, what's the optimal composite index?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> The optimal index is <code>CREATE INDEX idx ON orders(user_id, status, created_at)</code>. Strategy: (1) <span style="color: #22c55e; font-weight: 600;">Equality conditions first</span>: user_id and status both use equality (=). (2) <span style="color: #22c55e; font-weight: 600;">Most selective equality first</span>: user_id has higher cardinality than status, so it goes first—filters millions down to hundreds immediately. (3) <span style="color: #22c55e; font-weight: 600;">Range condition last</span>: created_at uses range (>), so it must come after all equality columns. This index: finds user_id=123 entries (very few), within those finds status='active' (even fewer), then scans created_at range. If created_at were earlier in the index, it would break the ability to filter on status. See [[query-optimization]](/topic/sql-learning/query-optimization) for EXPLAIN analysis.</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: How do you design indexes when your application has multiple query patterns that conflict (e.g., some filter by A then B, others by B then A)?</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> This is an <span style="color: #22c55e; font-weight: 600;">index merging vs. multiple indexes</span> trade-off. Options: (1) <strong>Multiple single-column indexes</strong>: Database can use bitmap index scan to combine them. Works for OR conditions but less efficient than composite for AND. (2) <strong>Multiple composite indexes</strong>: Create (A, B) and (B, A). Doubles storage and write overhead but optimal for both patterns. (3) <strong>Prioritize by frequency</strong>: Analyze query logs with pg_stat_statements or slow query log. Index for the 80% case; accept slower performance for edge cases. (4) <strong>Covering indexes with INCLUDE</strong>: If queries differ only in SELECT columns, one covering index may serve both. (5) <strong>Index skip scan</strong> (PostgreSQL 13+): Can sometimes use composite index (A, B) for queries on B alone by scanning each A value—less efficient but better than full scan. Decision matrix: measure storage cost (pg_relation_size), write amplification (inserts/sec × index count), and read latency for each query pattern. Related: [[connection-pooling]](/topic/system-design/connection-pooling) considerations for write-heavy workloads.</p>
    </div>
  </div>
</div>

---

## Section 4: Covering Indexes and Index-Only Scans

### Deep Mechanics

A <span style="color: #22c55e; font-weight: 600;">covering index</span> contains all columns needed by a query, eliminating the need to access the heap (table data). This enables an <span style="color: #22c55e; font-weight: 600;">index-only scan</span>—the fastest possible query execution path.

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #166534; margin-top: 0;">Why Covering Indexes Matter</h4>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #fef2f2; border: 2px solid #ef4444; padding: 16px; border-radius: 8px; flex: 1;">
        <strong style="color: #991b1b;">Regular Index Scan (2 I/O operations)</strong>
        <div style="font-size: 13px; color: #78350f; margin-top: 8px;">
          1. Read index → Find row pointer<br>
          2. Read table page → Get column values<br>
          <span style="color: #991b1b; font-style: italic;">Random I/O to heap = expensive</span>
        </div>
      </div>
      <div style="background: #dcfce7; border: 2px solid #22c55e; padding: 16px; border-radius: 8px; flex: 1;">
        <strong style="color: #166534;">Index-Only Scan (1 I/O operation)</strong>
        <div style="font-size: 13px; color: #15803d; margin-top: 8px;">
          1. Read index → Get all column values directly<br>
          <span style="color: #166534; font-style: italic;">No heap access = much faster</span>
        </div>
      </div>
    </div>
  </div>
</div>

### Index-Only Scan Flow

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
  <h4 style="color: #1e293b; margin-top: 0; text-align: center;">Index-Only Scan vs Regular Index Scan</h4>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 24px;">
    <!-- Regular Index Scan -->
    <div>
      <h5 style="color: #991b1b; text-align: center; margin-bottom: 16px;">Regular Index Scan</h5>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
        <div style="background: #3b82f6; color: white; padding: 12px 20px; border-radius: 8px; width: 140px; text-align: center;">
          <div style="font-size: 11px;">Query</div>
          <div style="font-size: 12px; font-weight: bold;">SELECT name, email</div>
        </div>
        <div style="color: #64748b;">↓</div>
        <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 12px 20px; border-radius: 8px; width: 140px; text-align: center;">
          <div style="font-size: 11px; color: #92400e;">INDEX</div>
          <div style="font-size: 12px; color: #78350f;">idx(id) → RowID</div>
        </div>
        <div style="color: #ef4444; font-weight: bold;">↓ Heap Lookup</div>
        <div style="background: #fef2f2; border: 2px solid #ef4444; padding: 12px 20px; border-radius: 8px; width: 140px; text-align: center;">
          <div style="font-size: 11px; color: #991b1b;">TABLE (Heap)</div>
          <div style="font-size: 12px; color: #b91c1c;">Read name, email</div>
        </div>
        <div style="color: #64748b;">↓</div>
        <div style="background: #10b981; color: white; padding: 12px 20px; border-radius: 8px; width: 140px; text-align: center;">
          <div style="font-size: 12px; font-weight: bold;">Result</div>
        </div>
      </div>
    </div>

    <!-- Index-Only Scan -->
    <div>
      <h5 style="color: #166534; text-align: center; margin-bottom: 16px;">Index-Only Scan</h5>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
        <div style="background: #3b82f6; color: white; padding: 12px 20px; border-radius: 8px; width: 160px; text-align: center;">
          <div style="font-size: 11px;">Query</div>
          <div style="font-size: 12px; font-weight: bold;">SELECT name, email</div>
        </div>
        <div style="color: #22c55e; font-weight: bold;">↓ Direct</div>
        <div style="background: #dcfce7; border: 2px solid #22c55e; padding: 12px 20px; border-radius: 8px; width: 160px; text-align: center;">
          <div style="font-size: 11px; color: #166534;">COVERING INDEX</div>
          <div style="font-size: 12px; color: #15803d;">idx(id) INCLUDE(name, email)</div>
        </div>
        <div style="color: #22c55e; font-weight: bold;">↓ No Heap Access!</div>
        <div style="background: #10b981; color: white; padding: 12px 20px; border-radius: 8px; width: 160px; text-align: center;">
          <div style="font-size: 12px; font-weight: bold;">Result</div>
        </div>
        <div style="background: #dcfce7; padding: 12px; border-radius: 6px; margin-top: 8px;">
          <span style="color: #166534; font-size: 12px; font-weight: bold;">50-90% faster!</span>
        </div>
      </div>
    </div>
  </div>
</div>

### Creating Covering Indexes

```sql
-- PostgreSQL 11+ syntax with INCLUDE
CREATE INDEX idx_orders_covering ON orders(status)
INCLUDE (order_number, amount, created_at);

-- Query satisfied entirely from index:
SELECT order_number, amount, created_at
FROM orders
WHERE status = 'pending';
-- EXPLAIN shows: Index Only Scan

-- Alternative: All columns in the index key (older approach)
CREATE INDEX idx_orders_all ON orders(status, order_number, amount, created_at);
-- Works but: larger index, unnecessary sorting overhead

-- When INCLUDE is better:
-- 1. INCLUDE columns don't need to be searchable/sortable
-- 2. Smaller index keys = more keys per page = shallower tree
-- 3. No overhead maintaining sort order for INCLUDE columns
```

### Visibility Map and Index-Only Scans

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #92400e; margin-top: 0;">PostgreSQL Visibility Map Requirement</h4>
  <p style="color: #78350f; margin: 8px 0 0 0; font-size: 14px;">
    Index-only scans require checking the <span style="color: #22c55e; font-weight: 600;">visibility map</span> to confirm rows are visible to the transaction. If a page is not "all-visible" (recently modified), PostgreSQL must access the heap to check tuple visibility.
  </p>
  <div style="background: white; padding: 16px; border-radius: 8px; margin-top: 16px;">
    <strong style="color: #92400e;">Implication:</strong>
    <span style="color: #78350f;"> Tables with heavy UPDATE/DELETE activity may not benefit from covering indexes until VACUUM marks pages as all-visible. Monitor with: </span>
    <code style="background: #fef3c7; padding: 2px 6px; border-radius: 4px; font-size: 13px;">SELECT relname, n_tup_upd, n_tup_del FROM pg_stat_user_tables;</code>
  </div>
</div>

### Covering Index Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: What is a covering index and when should you use one?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> A covering index contains all columns needed by a query—both the filter columns (in WHERE) and the projected columns (in SELECT). This enables an <span style="color: #22c55e; font-weight: 600;">index-only scan</span> where the database reads only the index without accessing the main table. Use covering indexes for frequently executed queries where heap access is the bottleneck. They're especially valuable for: aggregation queries (COUNT, SUM on indexed columns), high-selectivity lookups returning few columns, and read-heavy workloads where increased index size is acceptable.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: Why does PostgreSQL use INCLUDE columns instead of just adding all columns to the index key?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> The INCLUDE clause adds columns to the <span style="color: #22c55e; font-weight: 600;">leaf level only</span>, not to internal nodes. Benefits: (1) <strong>Smaller internal nodes</strong>: Higher fan-out means shallower tree and fewer I/O operations to reach leaves. (2) <strong>No sort overhead</strong>: INCLUDE columns aren't sorted, reducing insert/update cost. (3) <strong>No uniqueness impact</strong>: INCLUDE columns don't affect UNIQUE constraints—useful for adding payload to unique indexes. (4) <strong>Wider applicability</strong>: Can include columns with non-indexable types. Trade-off: INCLUDE columns can't be used for WHERE, ORDER BY, or as the basis for index seek—only for avoiding heap lookup.</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: Your EXPLAIN shows "Index Only Scan" but "Heap Fetches: 50000" is high. Diagnose and fix this.</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> High heap fetches during index-only scan indicates the <span style="color: #22c55e; font-weight: 600;">visibility map</span> is stale—many pages aren't marked "all-visible." Diagnosis: (1) Check <code>pg_stat_user_tables.n_dead_tup</code>—high dead tuple count suggests pending VACUUM. (2) Check <code>pg_visibility</code> extension: <code>SELECT * FROM pg_visibility_map_summary('tablename')</code> shows all-visible vs total pages. (3) Check autovacuum settings—table may be vacuumed infrequently. Fixes: (1) Run <code>VACUUM tablename</code> to mark all-visible pages—heap fetches will drop dramatically. (2) Tune autovacuum: lower <code>autovacuum_vacuum_scale_factor</code> for this table (e.g., 0.01 instead of default 0.2) so VACUUM runs more frequently. (3) For very high-update tables, consider <code>VACUUM (INDEX_CLEANUP OFF)</code> for faster visibility map updates. (4) If updates concentrate on specific rows, those pages will never be all-visible—evaluate if covering index is appropriate. Monitor: <code>pg_stat_user_indexes.idx_tup_fetch</code> (heap fetches) vs <code>idx_tup_read</code> (index entries read).</p>
    </div>
  </div>
</div>

---

## Section 5: Index Selectivity

### Deep Mechanics

<span style="color: #22c55e; font-weight: 600;">Index selectivity</span> measures how effectively an index filters rows. It's calculated as the ratio of distinct values to total rows: `selectivity = cardinality / total_rows`. A selectivity of 1.0 means every value is unique (perfect for indexing); near 0 means many duplicates (poor for indexing).

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #e2e8f0;">
  <h4 style="margin-top: 0; color: #1e293b; font-size: 18px;">Selectivity Formula</h4>
  <div style="font-family: 'Courier New', monospace; font-size: 16px; background: #ffffff; padding: 20px; border-radius: 8px; text-align: center; color: #1e293b; border: 1px solid #e2e8f0;">
    Selectivity = COUNT(DISTINCT column) / COUNT(*)<br><br>
    <span style="font-size: 14px; color: #475569;">Higher selectivity = Better index candidate</span>
  </div>
</div>

### Selectivity Examples

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
  <h4 style="color: #1e293b; margin-top: 0; text-align: center;">Selectivity Spectrum</h4>

  <div style="display: flex; align-items: stretch; margin-top: 24px; border-radius: 12px; overflow: hidden;">
    <!-- Poor selectivity -->
    <div style="background: linear-gradient(to bottom, #fef2f2, #fee2e2); flex: 1; padding: 20px; text-align: center; border-right: 2px solid white;">
      <div style="font-size: 12px; color: #991b1b; font-weight: bold;">POOR SELECTIVITY</div>
      <div style="font-size: 32px; font-weight: bold; color: #ef4444; margin: 12px 0;">~0.00001</div>
      <div style="font-size: 14px; color: #b91c1c; font-weight: bold;">status, is_active</div>
      <div style="font-size: 12px; color: #991b1b; margin-top: 8px;">3-5 distinct values<br>in millions of rows</div>
      <div style="background: white; border-radius: 6px; padding: 8px; margin-top: 12px; font-size: 11px; color: #78350f;">Index often ignored by planner</div>
    </div>

    <!-- Medium selectivity -->
    <div style="background: linear-gradient(to bottom, #fef3c7, #fde68a); flex: 1; padding: 20px; text-align: center; border-right: 2px solid white;">
      <div style="font-size: 12px; color: #92400e; font-weight: bold;">MEDIUM SELECTIVITY</div>
      <div style="font-size: 32px; font-weight: bold; color: #f59e0b; margin: 12px 0;">~0.001</div>
      <div style="font-size: 14px; color: #b45309; font-weight: bold;">category, country</div>
      <div style="font-size: 12px; color: #92400e; margin-top: 8px;">100-1000 distinct values<br>in millions of rows</div>
      <div style="background: white; border-radius: 6px; padding: 8px; margin-top: 12px; font-size: 11px; color: #78350f;">Useful with additional filters</div>
    </div>

    <!-- Good selectivity -->
    <div style="background: linear-gradient(to bottom, #d1fae5, #a7f3d0); flex: 1; padding: 20px; text-align: center; border-right: 2px solid white;">
      <div style="font-size: 12px; color: #166534; font-weight: bold;">GOOD SELECTIVITY</div>
      <div style="font-size: 32px; font-weight: bold; color: #22c55e; margin: 12px 0;">~0.1</div>
      <div style="font-size: 14px; color: #15803d; font-weight: bold;">user_id, date</div>
      <div style="font-size: 12px; color: #166534; margin-top: 8px;">10% of table is distinct</div>
      <div style="background: white; border-radius: 6px; padding: 8px; margin-top: 12px; font-size: 11px; color: #15803d;">Index likely to be used</div>
    </div>

    <!-- Perfect selectivity -->
    <div style="background: linear-gradient(to bottom, #dbeafe, #bfdbfe); flex: 1; padding: 20px; text-align: center;">
      <div style="font-size: 12px; color: #1e40af; font-weight: bold;">PERFECT SELECTIVITY</div>
      <div style="font-size: 32px; font-weight: bold; color: #3b82f6; margin: 12px 0;">1.0</div>
      <div style="font-size: 14px; color: #1d4ed8; font-weight: bold;">email, uuid, pk</div>
      <div style="font-size: 12px; color: #1e40af; margin-top: 8px;">Every value unique</div>
      <div style="background: white; border-radius: 6px; padding: 8px; margin-top: 12px; font-size: 11px; color: #1e40af;">Always use index (if queried)</div>
    </div>
  </div>
</div>

### Calculating Selectivity

```sql
-- Calculate selectivity for all columns in a table
SELECT
    column_name,
    n_distinct,
    CASE
        WHEN n_distinct < 0 THEN ABS(n_distinct)  -- Negative means fraction
        ELSE n_distinct / (SELECT reltuples FROM pg_class WHERE relname = 'orders')
    END as selectivity
FROM pg_stats
WHERE tablename = 'orders'
ORDER BY selectivity DESC;

-- Manual calculation
SELECT
    'email' as column_name,
    COUNT(DISTINCT email)::float / COUNT(*)::float as selectivity
FROM users;
-- Result: 0.9999 (nearly unique)

SELECT
    'status' as column_name,
    COUNT(DISTINCT status)::float / COUNT(*)::float as selectivity
FROM orders;
-- Result: 0.000003 (only 3 values in 1M rows)
```

### Why Low-Selectivity Indexes Are Problematic

<div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #991b1b; margin-top: 0;">The Math Behind Selectivity Decisions</h4>
  <div style="color: #78350f; font-size: 14px; line-height: 1.8;">
    <p><strong>Table: 1,000,000 rows, 8KB pages, 100 rows/page = 10,000 pages</strong></p>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 16px;">
      <div style="background: white; padding: 16px; border-radius: 8px;">
        <strong style="color: #166534;">High Selectivity Query (1 row)</strong>
        <ul style="margin: 8px 0 0 0; padding-left: 20px;">
          <li>Index lookup: ~3-4 page reads</li>
          <li>Heap fetch: 1 page read</li>
          <li><strong>Total: ~5 page reads</strong></li>
        </ul>
      </div>
      <div style="background: white; padding: 16px; border-radius: 8px;">
        <strong style="color: #991b1b;">Low Selectivity Query (300,000 rows)</strong>
        <ul style="margin: 8px 0 0 0; padding-left: 20px;">
          <li>Index scan: read 30% of index</li>
          <li>Random heap fetches: ~300,000 random reads!</li>
          <li>Sequential scan: 10,000 sequential reads</li>
          <li><strong>Sequential scan is 30x faster!</strong></li>
        </ul>
      </div>
    </div>

    <p style="margin-top: 16px; background: #fef3c7; padding: 12px; border-radius: 8px;">
      <strong>Rule of thumb:</strong> If query returns more than ~10-15% of table rows, sequential scan is usually faster than index scan due to random I/O overhead.
    </p>
  </div>
</div>

### Selectivity Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: What is index selectivity and why does it matter for query performance?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> <span style="color: #22c55e; font-weight: 600;">Index selectivity</span> measures how well an index discriminates between rows—calculated as distinct values divided by total rows. High selectivity (close to 1.0) means the index quickly narrows down to few rows, making index scans efficient. Low selectivity (close to 0) means many rows match each distinct value, causing excessive random I/O when fetching rows from the heap. The query planner uses selectivity statistics to decide whether to use an index or perform a sequential scan.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: Your query on a boolean column (is_active) has an index but EXPLAIN shows sequential scan. Why and how do you fix it?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Boolean columns have <span style="color: #22c55e; font-weight: 600;">selectivity of 0.5 at best</span> (two values). If 50% of rows are active, an index scan would need random I/O to half the table—slower than sequential scan. Fixes: (1) <strong>Partial index</strong>: <code>CREATE INDEX idx_active ON users(id) WHERE is_active = true</code>—only indexes the minority of rows you actually query. (2) <strong>Composite index</strong>: Combine with a selective column: <code>(user_type, is_active)</code> where user_type has high cardinality. (3) <strong>Covering index</strong>: If query selects few columns, add them to index to enable index-only scan—avoids heap random I/O entirely. (4) <strong>Rethink the query</strong>: If you always filter by is_active=true, consider archiving inactive rows to separate table. Related: [[query-optimization]](/topic/sql-learning/query-optimization).</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: How do statistics collection and histogram buckets affect the query planner's selectivity estimates, and how do you diagnose incorrect estimates?</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> PostgreSQL stores statistics in <code>pg_statistic</code> (accessed via <code>pg_stats</code> view). Key components: (1) <strong>n_distinct</strong>: Estimated distinct values. Positive = absolute count; negative = fraction of rows. (2) <strong>most_common_vals/most_common_freqs</strong>: Top N values and their frequencies for skewed distributions. (3) <strong>histogram_bounds</strong>: Bucket boundaries for non-MCV values. Statistics affect selectivity estimates: For <code>WHERE status = 'pending'</code>, planner checks if 'pending' is in MCV list; if yes, uses stored frequency; otherwise estimates from histogram. <strong>Diagnosing bad estimates</strong>: Run <code>EXPLAIN ANALYZE</code>—compare "estimated rows" vs "actual rows". If off by 10x+, statistics are stale or <code>default_statistics_target</code> is too low. Fixes: (1) <code>ANALYZE tablename</code> to refresh stats. (2) Increase <code>ALTER TABLE t ALTER COLUMN c SET STATISTICS 1000</code> for columns with many distinct values or skewed distributions. (3) For correlated columns where combined selectivity differs from independent assumption, consider extended statistics (PostgreSQL 10+): <code>CREATE STATISTICS stat_name (dependencies) ON col1, col2 FROM table</code>. Monitor with <code>pg_stat_user_tables.last_analyze</code>.</p>
    </div>
  </div>
</div>

---

## Section 6: Query Planner and Optimizer

### Deep Mechanics

The <span style="color: #22c55e; font-weight: 600;">query planner</span> (optimizer) analyzes SQL queries and generates an execution plan that minimizes estimated cost. It evaluates multiple strategies (index scan vs. sequential scan, join algorithms, join order) and selects the plan with lowest cost based on statistics.

<div style="background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: white;">Query Planner Cost Model</h4>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 16px;">
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: white;">seq_page_cost = 1.0</strong>
      <p style="color: #fed7aa; margin: 8px 0 0 0; font-size: 13px;">Cost of reading one page sequentially. Baseline cost unit. Sequential reads are efficient (OS readahead).</p>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: white;">random_page_cost = 4.0</strong>
      <p style="color: #fed7aa; margin: 8px 0 0 0; font-size: 13px;">Cost of random page read. 4x sequential by default. On SSD, reduce to 1.1-1.5 (random ~= sequential).</p>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: white;">cpu_tuple_cost = 0.01</strong>
      <p style="color: #fed7aa; margin: 8px 0 0 0; font-size: 13px;">Cost of processing one row (evaluating conditions, projecting columns). Much cheaper than I/O.</p>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 16px; border-radius: 8px;">
      <strong style="color: white;">cpu_index_tuple_cost = 0.005</strong>
      <p style="color: #fed7aa; margin: 8px 0 0 0; font-size: 13px;">Cost of processing one index entry. Lower than heap tuple because index entries are smaller.</p>
    </div>
  </div>
</div>

### Understanding EXPLAIN Output

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Anatomy of EXPLAIN ANALYZE</h4>

```sql
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT u.name, COUNT(o.id)
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.name;
```

  <div style="background: #f8fafc; color: #1e293b; padding: 20px; border-radius: 8px; margin-top: 16px; font-family: monospace; font-size: 13px; line-height: 1.8; overflow-x: auto; border: 1px solid #e2e8f0;">
    <div><span style="color: #b45309;">HashAggregate</span> (cost=1234.56..1240.00 rows=100 width=40) <span style="color: #047857;">(actual time=15.2..15.8 rows=95 loops=1)</span></div>
    <div style="padding-left: 20px;">Group Key: u.id, u.name</div>
    <div style="padding-left: 20px; color: #64748b;">Buffers: shared hit=45 read=12</div>
    <div style="padding-left: 20px;">-> <span style="color: #1e40af;">Hash Left Join</span> (cost=200.00..1200.00 rows=5000 width=32) <span style="color: #047857;">(actual time=2.1..12.5 rows=4850 loops=1)</span></div>
    <div style="padding-left: 40px;">Hash Cond: (u.id = o.user_id)</div>
    <div style="padding-left: 40px; color: #64748b;">Buffers: shared hit=40 read=10</div>
    <div style="padding-left: 40px;">-> <span style="color: #6d28d9;">Index Scan</span> using idx_users_created on users u (cost=0.42..50.00 rows=100 width=24) <span style="color: #047857;">(actual time=0.02..0.5 rows=95 loops=1)</span></div>
    <div style="padding-left: 60px;">Index Cond: (created_at > '2024-01-01')</div>
    <div style="padding-left: 60px; color: #64748b;">Buffers: shared hit=5</div>
    <div style="padding-left: 40px;">-> <span style="color: #047857;">Hash</span> (cost=150.00..150.00 rows=5000 width=12) <span style="color: #047857;">(actual time=1.8..1.8 rows=4850 loops=1)</span></div>
    <div style="padding-left: 60px;">Buckets: 8192 Batches: 1 Memory Usage: 250kB</div>
    <div style="padding-left: 60px;">-> <span style="color: #dc2626;">Seq Scan</span> on orders o (cost=0.00..150.00 rows=5000 width=12) <span style="color: #047857;">(actual time=0.01..1.2 rows=4850 loops=1)</span></div>
    <div style="padding-left: 80px; color: #64748b;">Buffers: shared hit=35 read=10</div>
    <div style="margin-top: 8px; color: #64748b;">Planning Time: 0.25 ms</div>
    <div style="color: #047857;">Execution Time: 16.1 ms</div>
  </div>

  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 20px;">
    <div style="background: #dcfce7; padding: 16px; border-radius: 8px;">
      <strong style="color: #166534;">Good Signs</strong>
      <ul style="color: #15803d; margin: 8px 0 0 0; padding-left: 20px; font-size: 13px;">
        <li>Index Scan on filtered columns</li>
        <li>Estimated rows ≈ actual rows</li>
        <li>shared hit >> shared read</li>
        <li>Hash Join for equality joins</li>
      </ul>
    </div>
    <div style="background: #fef2f2; padding: 16px; border-radius: 8px;">
      <strong style="color: #991b1b;">Warning Signs</strong>
      <ul style="color: #b91c1c; margin: 8px 0 0 0; padding-left: 20px; font-size: 13px;">
        <li>Seq Scan on large filtered tables</li>
        <li>Nested Loop with high row counts</li>
        <li>rows=X estimated vs rows=Y actual (10x+ diff)</li>
        <li>Sort with external merge (spilled to disk)</li>
      </ul>
    </div>
  </div>
</div>

### Scan Types Hierarchy

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
  <h4 style="color: #1e293b; margin-top: 0; text-align: center;">Scan Types: Best to Worst (for selective queries)</h4>

  <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 24px;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #22c55e; color: white; padding: 12px 20px; border-radius: 8px; min-width: 180px; text-align: center; font-weight: bold;">Index Only Scan</div>
      <div style="flex: 1; background: #dcfce7; padding: 12px 16px; border-radius: 8px; color: #166534; font-size: 14px;">
        All data from index. No heap access. Fastest possible. Requires covering index + visibility map.
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; padding: 12px 20px; border-radius: 8px; min-width: 180px; text-align: center; font-weight: bold;">Index Scan</div>
      <div style="flex: 1; background: #dbeafe; padding: 12px 16px; border-radius: 8px; color: #1e40af; font-size: 14px;">
        Find rows via index, fetch from heap. Good for selective queries. Random I/O to heap.
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #f59e0b; color: white; padding: 12px 20px; border-radius: 8px; min-width: 180px; text-align: center; font-weight: bold;">Bitmap Index Scan</div>
      <div style="flex: 1; background: #fef3c7; padding: 12px 16px; border-radius: 8px; color: #92400e; font-size: 14px;">
        Build bitmap of matching rows, then fetch. Reduces random I/O. Good for OR conditions, medium selectivity.
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #ef4444; color: white; padding: 12px 20px; border-radius: 8px; min-width: 180px; text-align: center; font-weight: bold;">Sequential Scan</div>
      <div style="flex: 1; background: #fef2f2; padding: 12px 16px; border-radius: 8px; color: #991b1b; font-size: 14px;">
        Read entire table. Fast for small tables or low selectivity. Benefits from OS readahead.
      </div>
    </div>
  </div>
</div>

### Query Planner Interview Questions (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: How does the query planner decide between using an index scan vs. sequential scan?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> The planner <span style="color: #22c55e; font-weight: 600;">estimates the total cost</span> of each approach using statistics. For index scan: cost = (index pages read × random_page_cost) + (heap pages read × random_page_cost) + (rows processed × cpu_tuple_cost). For sequential scan: cost = (table pages × seq_page_cost) + (all rows × cpu_tuple_cost). If the query returns few rows (high selectivity), index scan wins because it reads fewer pages. If query returns many rows, sequential scan wins because sequential I/O is cheaper than random I/O, and reading everything once beats random heap fetches.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: The planner chose sequential scan even though an index exists. How do you diagnose and potentially fix this?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Diagnosis steps: (1) <strong>Check statistics</strong>: Run <code>ANALYZE tablename</code>—stale stats cause bad estimates. (2) <strong>Check selectivity</strong>: If query matches >10-15% of rows, seq scan may be correct choice. (3) <strong>Check cost parameters</strong>: On SSD, <code>random_page_cost</code> should be 1.1-1.5, not 4.0. (4) <strong>Check EXPLAIN estimates vs. actuals</strong>: Large discrepancy indicates statistics problem. (5) <strong>Check for function on column</strong>: <code>WHERE LOWER(email) = 'x'</code> can't use index on email—need expression index. Fixes: (a) Update statistics, (b) Create more selective composite index, (c) Use <span style="color: #22c55e; font-weight: 600;">partial index</span> if query always filters on constant, (d) Adjust <code>random_page_cost</code> for SSD. Forcing index: <code>SET enable_seqscan = off</code> for testing only—never in production.</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: Explain how PostgreSQL handles join ordering for multi-table queries, and what happens when the planner's estimate is wildly wrong?</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> PostgreSQL uses <span style="color: #22c55e; font-weight: 600;">dynamic programming</span> for join ordering up to <code>geqo_threshold</code> (default 12) tables—evaluating all permutations for optimal plan. Beyond that, it uses GEQO (Genetic Query Optimizer) for heuristic search. Join order matters because it determines intermediate result sizes: joining 1000-row table first, then filtering, is cheaper than starting with 1M-row table. When estimates are wrong, cascade effects occur: underestimated intermediate results → nested loop chosen (expecting few rows) → actually millions of iterations → query takes hours. <strong>Diagnosing</strong>: <code>EXPLAIN ANALYZE</code> shows "estimated rows=100" vs "actual rows=500000". <strong>Fixes</strong>: (1) <code>ANALYZE</code> to refresh stats. (2) Increase <code>default_statistics_target</code> for columns with complex distributions. (3) Create <span style="color: #22c55e; font-weight: 600;">extended statistics</span> for correlated columns: <code>CREATE STATISTICS stat1 (dependencies) ON col1, col2 FROM table</code>. (4) For known-problematic queries, use CTEs with <code>MATERIALIZED</code> hint to force intermediate result calculation, creating optimization fence. (5) Consider pg_hint_plan extension for explicit join hints in production-critical queries. Monitor with [[query-optimization]](/topic/sql-learning/query-optimization) and auto_explain for catching regression.</p>
    </div>
  </div>
</div>

---

## Section 7: Index Types Comparison

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
  <h4 style="color: #1e293b; margin-top: 0; text-align: center;">Complete Index Types Reference</h4>

  <div style="overflow-x: auto;">
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
      <thead>
        <tr style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white;">
          <th style="padding: 12px; text-align: left; border: 1px solid #2563eb;">Index Type</th>
          <th style="padding: 12px; text-align: left; border: 1px solid #2563eb;">Best For</th>
          <th style="padding: 12px; text-align: left; border: 1px solid #2563eb;">Operations</th>
          <th style="padding: 12px; text-align: left; border: 1px solid #2563eb;">Example</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background: #f0fdf4;">
          <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong style="color: #166534;">B-Tree</strong></td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;">General purpose, most queries</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;">=, <, >, <=, >=, BETWEEN, IN, LIKE 'prefix%', ORDER BY</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;"><code>CREATE INDEX idx ON t(col)</code></td>
        </tr>
        <tr style="background: #f5f3ff;">
          <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong style="color: #6d28d9;">Hash</strong></td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;">Equality only, high cardinality</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;">= only</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;"><code>CREATE INDEX idx ON t USING HASH(col)</code></td>
        </tr>
        <tr style="background: #fef3c7;">
          <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong style="color: #92400e;">GIN</strong></td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;">Arrays, JSONB, full-text</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;">@>, <@, &&, @@ (containment, overlap, text search)</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;"><code>CREATE INDEX idx ON t USING GIN(tags)</code></td>
        </tr>
        <tr style="background: #fef2f2;">
          <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong style="color: #991b1b;">GiST</strong></td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;">Geometric, range types, full-text</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;"><<, >>, &<, &>, @>, <@, &&, ~= (spatial operations)</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;"><code>CREATE INDEX idx ON t USING GIST(location)</code></td>
        </tr>
        <tr style="background: #ecfeff;">
          <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong style="color: #0891b2;">BRIN</strong></td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;">Large, naturally ordered data (time-series)</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;"><, >, BETWEEN on correlated data</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;"><code>CREATE INDEX idx ON t USING BRIN(created_at)</code></td>
        </tr>
        <tr style="background: #f8fafc;">
          <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong style="color: #475569;">SP-GiST</strong></td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;">Non-balanced structures (IP addresses, phone numbers)</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;">Similar to GiST, prefix-based</td>
          <td style="padding: 12px; border: 1px solid #e2e8f0;"><code>CREATE INDEX idx ON t USING SPGIST(ip_addr)</code></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

---

## Section 8: Index Maintenance and Monitoring

### Monitoring Index Health

```sql
-- Index size and usage statistics
SELECT
    schemaname,
    relname as table_name,
    indexrelname as index_name,
    pg_size_pretty(pg_relation_size(indexrelid)) as index_size,
    idx_scan as number_of_scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
ORDER BY pg_relation_size(indexrelid) DESC
LIMIT 20;

-- Find unused indexes (candidates for removal)
SELECT
    schemaname || '.' || relname as table,
    indexrelname as index,
    pg_size_pretty(pg_relation_size(indexrelid)) as size,
    idx_scan as times_used
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND indexrelname NOT LIKE '%_pkey'
  AND indexrelname NOT LIKE '%_unique'
ORDER BY pg_relation_size(indexrelid) DESC;

-- Index bloat estimation
SELECT
    nspname || '.' || relname as table,
    pg_size_pretty(pg_relation_size(relid)) as table_size,
    pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) as total_index_size,
    round(100 * pg_total_relation_size(relid) / NULLIF(pg_relation_size(relid), 0)) as index_ratio_pct
FROM pg_stat_user_tables
JOIN pg_class ON pg_stat_user_tables.relid = pg_class.oid
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(relid) DESC;
```

### Index Rebuild Strategies

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #92400e; margin-top: 0;">When to Rebuild Indexes</h4>
  <div style="display: grid; gap: 12px;">
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #92400e;">Index Bloat > 30%</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Dead tuples accumulate from UPDATE/DELETE. Check with pgstattuple extension. REINDEX reclaims space.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #92400e;">After Large Data Changes</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Bulk imports, mass updates, or deletions can leave indexes unoptimized. REINDEX + ANALYZE refreshes structure and statistics.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px;">
      <strong style="color: #92400e;">PostgreSQL Major Upgrade</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">New versions may have improved index formats. REINDEX takes advantage of optimizations.</p>
    </div>
  </div>
</div>

```sql
-- Standard REINDEX (locks table for writes)
REINDEX INDEX idx_users_email;

-- Concurrent REINDEX (PostgreSQL 12+) - no lock, but uses more resources
REINDEX INDEX CONCURRENTLY idx_users_email;

-- Rebuild all indexes on a table
REINDEX TABLE users;

-- Alternative: CREATE INDEX CONCURRENTLY + DROP old index
-- More control, can rename to maintain same name
CREATE INDEX CONCURRENTLY idx_users_email_new ON users(email);
DROP INDEX idx_users_email;
ALTER INDEX idx_users_email_new RENAME TO idx_users_email;
```

---

## Best Practices Summary

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #e2e8f0;">
  <h4 style="margin-top: 0; color: #1e293b; font-size: 18px; text-align: center;">Index Design Checklist</h4>

  <div style="display: flex; flex-wrap: wrap; gap: 24px; margin-top: 24px;">
    <div style="flex: 1; min-width: 280px; background: #ffffff; padding: 20px; border-radius: 12px; border-left: 4px solid #22c55e;">
      <h5 style="color: #166534; margin-bottom: 16px; margin-top: 0;">DO</h5>
      <ul style="color: #475569; margin: 0; padding-left: 20px; line-height: 2;">
        <li>Index columns in WHERE, JOIN, ORDER BY</li>
        <li>Put equality columns before range columns</li>
        <li>Put high-selectivity columns first</li>
        <li>Use INCLUDE for covering indexes</li>
        <li>Create partial indexes for filtered queries</li>
        <li>Monitor index usage with pg_stat_user_indexes</li>
        <li>ANALYZE after large data changes</li>
        <li>Test with EXPLAIN ANALYZE</li>
      </ul>
    </div>
    <div style="flex: 1; min-width: 280px; background: #ffffff; padding: 20px; border-radius: 12px; border-left: 4px solid #ef4444;">
      <h5 style="color: #991b1b; margin-bottom: 16px; margin-top: 0;">AVOID</h5>
      <ul style="color: #475569; margin: 0; padding-left: 20px; line-height: 2;">
        <li>Indexing low-selectivity columns alone</li>
        <li>Too many indexes on write-heavy tables</li>
        <li>Functions on indexed columns in WHERE</li>
        <li>Unused indexes (check pg_stat_user_indexes)</li>
        <li>Over-indexing (maintain index sprawl)</li>
        <li>Ignoring index bloat in OLTP systems</li>
        <li>Forcing index hints in production</li>
        <li>Indexing without analyzing query patterns</li>
      </ul>
    </div>
  </div>
</div>

---

## Related Topics

- [[query-optimization]](/topic/sql-learning/query-optimization) - EXPLAIN analysis and query rewriting
- [[joins-mastery]](/topic/sql-learning/joins-mastery) - Join algorithms and optimization
- [[sql-fundamentals]](/topic/sql-learning/sql-fundamentals) - SQL basics and syntax
- [[database-sharding]](/topic/system-design/database-sharding) - Horizontal scaling strategies
- [[database-replication]](/topic/system-design/database-replication) - Read replicas for query distribution
- [[caching]](/topic/system-design/caching) - Reducing database load with caching layers
- [[connection-pooling]](/topic/system-design/connection-pooling) - Managing database connections efficiently
