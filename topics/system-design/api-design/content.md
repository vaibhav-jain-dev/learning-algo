# API Design

## Overview

API Design is the discipline of creating programmatic interfaces that enable software systems to communicate reliably, evolve gracefully, and scale predictably. A well-designed API is not merely a technical specification but a contract that shapes developer experience, system architecture, and business outcomes for years. The decisions made during API design ripple through every layer of integration, from mobile clients handling intermittent connectivity to distributed microservices processing millions of requests per second.

This guide provides interview-depth coverage of the critical dimensions of API design: architectural paradigms (REST vs GraphQL), data retrieval patterns (pagination), evolution strategies (versioning), reliability guarantees (idempotency), failure communication (error handling), and long-term sustainability (backward compatibility).

## REST vs GraphQL

### Foundational Architecture

**REST (Representational State Transfer)** models APIs around resources with standardized HTTP semantics. Each resource has a canonical URL, and operations map to HTTP methods. The server dictates response structure.

**GraphQL** models APIs around a typed schema with a single endpoint. Clients specify exactly what data they need through queries. The client dictates response structure.

<div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #f8fafc; margin: 0 0 20px 0; text-align: center;">REST vs GraphQL: Request Flow Comparison</h4>
  <div style="display: flex; flex-wrap: wrap; gap: 24px;">
    <div style="flex: 1; min-width: 300px;">
      <div style="background: #3b82f6; color: white; padding: 8px 16px; border-radius: 8px 8px 0 0; font-weight: 600;">REST: Multiple Round Trips</div>
      <div style="background: #1e3a5f; padding: 16px; border-radius: 0 0 8px 8px;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="background: #dbeafe; color: #1e40af; padding: 8px 12px; border-radius: 4px; font-size: 13px;">
            <strong>Request 1:</strong> GET /users/123
          </div>
          <div style="background: #dcfce7; color: #166534; padding: 8px 12px; border-radius: 4px; font-size: 13px;">
            Response: {id, name, email}
          </div>
          <div style="background: #dbeafe; color: #1e40af; padding: 8px 12px; border-radius: 4px; font-size: 13px;">
            <strong>Request 2:</strong> GET /users/123/orders
          </div>
          <div style="background: #dcfce7; color: #166534; padding: 8px 12px; border-radius: 4px; font-size: 13px;">
            Response: [{orderId, total, items}...]
          </div>
          <div style="background: #dbeafe; color: #1e40af; padding: 8px 12px; border-radius: 4px; font-size: 13px;">
            <strong>Request 3:</strong> GET /products/456
          </div>
          <div style="background: #dcfce7; color: #166534; padding: 8px 12px; border-radius: 4px; font-size: 13px;">
            Response: {productId, name, price}
          </div>
        </div>
        <div style="color: #fbbf24; font-size: 12px; margin-top: 12px; text-align: center;">3 round trips, potential over-fetching</div>
      </div>
    </div>
    <div style="flex: 1; min-width: 300px;">
      <div style="background: #e11d48; color: white; padding: 8px 16px; border-radius: 8px 8px 0 0; font-weight: 600;">GraphQL: Single Request</div>
      <div style="background: #4c1d2e; padding: 16px; border-radius: 0 0 8px 8px;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="background: #fce7f3; color: #9d174d; padding: 8px 12px; border-radius: 4px; font-size: 12px; font-family: monospace; white-space: pre;">query {
  user(id: "123") {
    name
    orders(first: 5) {
      total
      items { productName }
    }
  }
}</div>
          <div style="background: #dcfce7; color: #166534; padding: 8px 12px; border-radius: 4px; font-size: 12px; font-family: monospace; white-space: pre;">{
  "user": {
    "name": "Alice",
    "orders": [...]
  }
}</div>
        </div>
        <div style="color: #4ade80; font-size: 12px; margin-top: 12px; text-align: center;">1 round trip, exact data requested</div>
      </div>
    </div>
  </div>
</div>

### Internal Mechanisms

#### REST Caching Architecture

REST leverages HTTP's native caching infrastructure through a layered system:

1. **Browser Cache**: `Cache-Control: max-age=3600` allows clients to skip requests entirely
2. **CDN Cache**: Reverse proxies like Cloudflare cache responses at edge locations
3. **Surrogate Keys**: `Surrogate-Key: user-123` enables targeted cache invalidation
4. **ETags**: Content-based hashes enable conditional requests with `If-None-Match`

```
Client -> CDN (HIT) -> Response (no origin contact)
Client -> CDN (MISS) -> Origin -> Response -> CDN stores -> Client
Client -> CDN (STALE) -> Origin (If-None-Match) -> 304 Not Modified
```

**Critical Assumption**: REST caching assumes resources are independently cacheable. When user data depends on authentication state, naive caching leaks data between users.

#### GraphQL Execution Engine

GraphQL processes queries through a multi-phase pipeline:

1. **Parsing**: Query string to AST (Abstract Syntax Tree)
2. **Validation**: AST checked against schema for type correctness
3. **Execution**: Resolvers invoked depth-first, field-by-field
4. **Serialization**: Results assembled into JSON response

The **DataLoader pattern** batches resolver calls to prevent N+1 queries:

```javascript
// Without DataLoader: N+1 queries
// Query for 10 users triggers 10 separate DB calls for orders

// With DataLoader: Batched
// Query for 10 users triggers 1 batched call: SELECT * FROM orders WHERE user_id IN (1,2,3...)
const orderLoader = new DataLoader(async (userIds) => {
  const orders = await db.query('SELECT * FROM orders WHERE user_id = ANY($1)', [userIds]);
  return userIds.map(id => orders.filter(o => o.userId === id));
});
```

### Trade-offs Deep Dive

<div style="background: linear-gradient(135deg, #fefce8 0%, #fef3c7 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #92400e; margin: 0 0 16px 0;">Critical Trade-off: Query Complexity Control</h4>
  <div style="color: #1e293b; font-size: 14px; line-height: 1.6;">
    <p><strong>The Problem:</strong> GraphQL allows arbitrarily deep queries. A malicious or naive client can request:</p>
    <pre style="background: #1e293b; color: #f8fafc; padding: 12px; border-radius: 8px; font-size: 12px; overflow-x: auto;">query Evil {
  user(id: "1") {
    friends { friends { friends { friends { friends {
      posts { comments { author { posts { comments { ... } } } } }
    } } } } }
  }
}</pre>
    <p style="margin-top: 12px;"><strong>Mitigation Strategies:</strong></p>
    <ul style="margin: 8px 0; padding-left: 20px;">
      <li><strong>Query Depth Limiting:</strong> Reject queries exceeding N levels (typically 7-10)</li>
      <li><strong>Query Cost Analysis:</strong> Assign weights to fields, reject queries exceeding budget</li>
      <li><strong>Persistent Queries:</strong> Only allow pre-registered query hashes in production</li>
      <li><strong>Timeout Enforcement:</strong> Kill long-running resolvers</li>
    </ul>
  </div>
</div>

| Dimension | REST | GraphQL |
|-----------|------|---------|
| **Caching** | Native HTTP caching, CDN-friendly | Requires application-level caching (Apollo Cache, Relay Store) |
| **Versioning** | URL-based (/v1/, /v2/) straightforward | Schema evolution through deprecation, no explicit versions |
| **Tooling** | Mature ecosystem, OpenAPI/Swagger | Introspection-powered tools, GraphiQL, type generation |
| **Error Handling** | HTTP status codes semantic | Always 200, errors in response body |
| **File Upload** | Native multipart/form-data | Requires spec extensions (graphql-upload) |
| **Real-time** | Requires separate WebSocket setup | Subscriptions built into spec |

### When to Choose Each

**Choose REST when:**
- Public API with diverse, unknown clients
- Heavy reliance on HTTP caching (CDNs, browser cache)
- Simple CRUD operations with predictable access patterns
- Team has limited GraphQL experience
- Regulatory requirements mandate audit trails per endpoint

**Choose GraphQL when:**
- Mobile apps with varied data needs and bandwidth constraints
- Rapid frontend iteration requiring backend flexibility
- Complex, interconnected data models
- Multiple client platforms with different data requirements
- Internal APIs with trusted consumers

### Interview Questions: REST vs GraphQL

#### Level 1: Conceptual Understanding

**Q: What are the fundamental differences between REST and GraphQL?**

REST models APIs around resources with multiple endpoints using HTTP verbs for semantics. The server determines response structure. GraphQL exposes a single endpoint with a typed schema where clients specify exact data needs through queries. REST leverages HTTP caching natively; GraphQL requires application-level caching. REST uses HTTP status codes for errors; GraphQL returns 200 with errors in the response body.

#### Level 2: Implementation Depth

**Q: How would you implement efficient data fetching in GraphQL to prevent N+1 queries?**

The N+1 problem occurs when fetching a list of N items triggers N additional queries for related data. In GraphQL, this happens because resolvers execute independently.

**Solution: DataLoader Pattern**

DataLoader collects all keys requested during a single tick of the event loop, then executes a single batched query:

```javascript
// 1. Create loader with batch function
const userLoader = new DataLoader(async (ids) => {
  const users = await db.query('SELECT * FROM users WHERE id = ANY($1)', [ids]);
  // CRITICAL: Return in same order as input ids
  const userMap = new Map(users.map(u => [u.id, u]));
  return ids.map(id => userMap.get(id) || null);
});

// 2. Use in resolver
const resolvers = {
  Post: {
    author: (post, args, context) => context.loaders.user.load(post.authorId)
  }
};

// 3. Create fresh loader per request (loaders cache within request)
app.use((req, res, next) => {
  req.loaders = { user: new DataLoader(batchUsers) };
  next();
});
```

**Critical Implementation Details:**
- Loaders must be request-scoped to prevent cross-request data leakage
- Batch function must return results in same order as input keys
- Consider `maxBatchSize` to prevent oversized IN clauses
- Use `.prime()` to pre-populate cache from mutations

#### Level 3: Architecture and Edge Cases

**Q: How would you design a hybrid REST/GraphQL architecture for a system transitioning from REST to GraphQL while maintaining backward compatibility?**

**Architecture Approach:**

1. **Gateway Layer**: Deploy GraphQL as a facade over existing REST services
```
Client -> GraphQL Gateway -> REST Services -> Database
```

2. **Resolver Implementation**: GraphQL resolvers call REST endpoints internally
```javascript
const resolvers = {
  Query: {
    user: async (_, { id }, { restClient }) => {
      // GraphQL delegates to existing REST endpoint
      const response = await restClient.get(`/v1/users/${id}`);
      return transformToGraphQLShape(response.data);
    }
  }
};
```

3. **Incremental Migration Path:**
   - Phase 1: GraphQL wraps 100% REST (no new functionality)
   - Phase 2: New features built GraphQL-native with direct DB access
   - Phase 3: High-traffic resolvers migrated from REST-delegation to direct DB
   - Phase 4: Deprecate REST endpoints with sunset headers

4. **Maintaining Backward Compatibility:**
   - Keep REST endpoints operational with `Sunset` and `Deprecation` headers
   - GraphQL schema uses `@deprecated` directive for transitioning fields
   - Both APIs share authentication/authorization middleware
   - Shared rate limiting pool prevents gaming the system

5. **Edge Cases to Handle:**
   - **Caching Divergence**: REST responses cached at CDN; GraphQL needs Apollo Cache or persisted queries
   - **Error Translation**: Map REST 4xx/5xx to GraphQL error extensions
   - **Partial Failures**: GraphQL can return partial data with errors; REST typically fails atomically
   - **Monitoring Parity**: Ensure GraphQL field-level metrics match REST endpoint metrics

**Trade-off**: This approach adds latency (extra hop) but enables gradual migration without breaking existing integrations.

---

## Pagination Strategies

### The Fundamental Problem

Pagination solves the challenge of efficiently retrieving large datasets in manageable chunks. The naive approach of "give me everything" fails at scale due to:

- **Memory exhaustion**: Loading 10M rows into memory crashes servers
- **Network saturation**: Transferring gigabytes over mobile connections
- **Timeout failures**: Queries exceeding connection timeouts
- **Poor UX**: Users waiting minutes for data loads

### Pagination Approaches

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin: 0 0 20px 0; text-align: center;">Pagination Strategy Comparison</h4>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="background: #fee2e2; border-left: 4px solid #ef4444; padding: 16px; border-radius: 0 8px 8px 0;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <div>
          <div style="color: #b91c1c; font-weight: 600; font-size: 16px;">Offset Pagination</div>
          <code style="background: #1e293b; color: #f8fafc; padding: 4px 8px; border-radius: 4px; font-size: 12px;">SELECT * FROM items LIMIT 20 OFFSET 1000</code>
        </div>
        <div style="text-align: right;">
          <div style="color: #b91c1c; font-weight: 600;">O(offset + limit)</div>
          <div style="color: #64748b; font-size: 12px;">Performance degrades with offset</div>
        </div>
      </div>
      <div style="color: #1e293b; font-size: 13px; margin-top: 8px;">Database must scan and discard offset rows. At offset 1M, DB reads 1M rows to return 20.</div>
    </div>
    <div style="background: #dcfce7; border-left: 4px solid #22c55e; padding: 16px; border-radius: 0 8px 8px 0;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <div>
          <div style="color: #15803d; font-weight: 600; font-size: 16px;">Cursor/Keyset Pagination</div>
          <code style="background: #1e293b; color: #f8fafc; padding: 4px 8px; border-radius: 4px; font-size: 12px;">SELECT * FROM items WHERE id > 1000 LIMIT 20</code>
        </div>
        <div style="text-align: right;">
          <div style="color: #15803d; font-weight: 600;">O(limit)</div>
          <div style="color: #64748b; font-size: 12px;">Constant time regardless of position</div>
        </div>
      </div>
      <div style="color: #1e293b; font-size: 13px; margin-top: 8px;">Uses indexed column for positioning. Index seek directly to starting row. Consistent performance.</div>
    </div>
    <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 0 8px 8px 0;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <div>
          <div style="color: #1e40af; font-weight: 600; font-size: 16px;">Seek Pagination (Composite Keys)</div>
          <code style="background: #1e293b; color: #f8fafc; padding: 4px 8px; border-radius: 4px; font-size: 12px;">WHERE (date, id) > ('2024-01-15', 500) LIMIT 20</code>
        </div>
        <div style="text-align: right;">
          <div style="color: #1e40af; font-weight: 600;">O(limit)</div>
          <div style="color: #64748b; font-size: 12px;">Supports complex sort orders</div>
        </div>
      </div>
      <div style="color: #1e293b; font-size: 13px; margin-top: 8px;">Row value comparison on composite index. Enables pagination on non-unique columns with tiebreaker.</div>
    </div>
  </div>
</div>

### Internal Mechanisms: Cursor Implementation

A robust cursor encodes the position state needed to resume pagination:

```javascript
// Cursor structure for multi-column sort
const cursorData = {
  // Values of the sort columns for the last item
  sortValues: {
    createdAt: '2024-01-15T10:30:00Z',
    id: 'item_abc123'  // Tiebreaker for stable sort
  },
  // Direction: 'next' or 'prev' for bidirectional pagination
  direction: 'next',
  // Version for cursor format evolution
  v: 2
};

// Encode: Make URL-safe and tamper-evident
function encodeCursor(data) {
  const json = JSON.stringify(data);
  const signature = crypto.createHmac('sha256', SECRET).update(json).digest('hex').slice(0, 8);
  return Buffer.from(`${json}|${signature}`).toString('base64url');
}

// Decode: Validate signature before use
function decodeCursor(cursor) {
  const decoded = Buffer.from(cursor, 'base64url').toString();
  const [json, signature] = decoded.split('|');
  const expected = crypto.createHmac('sha256', SECRET).update(json).digest('hex').slice(0, 8);
  if (signature !== expected) throw new Error('Invalid cursor');
  return JSON.parse(json);
}
```

**Critical Assumption**: Cursor pagination assumes stable sort order. If `created_at` has duplicates, results become unpredictable without a tiebreaker (typically the unique `id`).

### Edge Cases and Failure Modes

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 2px solid #ef4444; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #b91c1c; margin: 0 0 16px 0;">Pagination Pitfalls</h4>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="background: white; padding: 12px; border-radius: 8px; border-left: 3px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 600;">Page Drift (Offset Pagination)</div>
      <div style="color: #1e293b; font-size: 13px;">User on page 5. New item inserted. Page 6 request shows item already seen on page 5 (duplicate) while another item is skipped entirely.</div>
    </div>
    <div style="background: white; padding: 12px; border-radius: 8px; border-left: 3px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 600;">Cursor Invalidation</div>
      <div style="color: #1e293b; font-size: 13px;">Cursor references item_123. Item deleted. Next page query fails or returns unexpected results. Must handle gracefully with "cursor expired" error.</div>
    </div>
    <div style="background: white; padding: 12px; border-radius: 8px; border-left: 3px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 600;">Non-Unique Sort Column</div>
      <div style="color: #1e293b; font-size: 13px;">Sorting by created_at where 1000 items share same timestamp. Keyset pagination with WHERE created_at > X either skips items or returns duplicates.</div>
    </div>
    <div style="background: white; padding: 12px; border-radius: 8px; border-left: 3px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 600;">Backward Pagination Complexity</div>
      <div style="color: #1e293b; font-size: 13px;">Moving backward requires reversing sort order, then reversing results. Edge: first page has no "previous" cursor; must handle client-side.</div>
    </div>
  </div>
</div>

### Real-World Implementation Pattern

```sql
-- Keyset pagination with composite key for stable ordering
-- Supports: created_at DESC, id DESC (newest first with tiebreaker)

SELECT id, title, created_at
FROM posts
WHERE user_id = $1
  AND (created_at, id) < ($2, $3)  -- Cursor position
ORDER BY created_at DESC, id DESC
LIMIT $4 + 1;  -- Fetch one extra to detect has_more

-- Required index for performance:
CREATE INDEX idx_posts_user_timeline
ON posts (user_id, created_at DESC, id DESC);
```

### Interview Questions: Pagination

#### Level 1: Conceptual Understanding

**Q: Why is offset pagination problematic for large datasets?**

Offset pagination requires the database to scan and discard `offset` rows before returning `limit` rows. At `OFFSET 1000000`, the database reads 1,000,020 rows to return 20. This causes:

1. **Linear time degradation**: O(offset + limit) per query
2. **Wasted I/O**: Reading data only to discard it
3. **Lock contention**: Large scans hold locks longer
4. **Memory pressure**: Intermediate results consume buffer pool

Additionally, offset pagination suffers from "page drift" - when data changes between page fetches, items can be duplicated or skipped. This is particularly problematic for real-time feeds.

#### Level 2: Implementation Depth

**Q: How would you implement bidirectional cursor pagination that supports both forward and backward navigation?**

Bidirectional pagination requires encoding direction in the cursor and adjusting query logic:

```javascript
async function paginate({ cursor, limit = 20, direction = 'forward' }) {
  let query = db('posts').where('user_id', userId);
  let decoded = cursor ? decodeCursor(cursor) : null;

  if (decoded) {
    const { created_at, id } = decoded.position;
    if (direction === 'forward') {
      // Forward: get items AFTER cursor position
      query = query.where(function() {
        this.where('created_at', '<', created_at)
            .orWhere(function() {
              this.where('created_at', '=', created_at)
                  .where('id', '<', id);
            });
      });
      query = query.orderBy('created_at', 'desc').orderBy('id', 'desc');
    } else {
      // Backward: get items BEFORE cursor position (reverse everything)
      query = query.where(function() {
        this.where('created_at', '>', created_at)
            .orWhere(function() {
              this.where('created_at', '=', created_at)
                  .where('id', '>', id);
            });
      });
      query = query.orderBy('created_at', 'asc').orderBy('id', 'asc');
    }
  } else {
    query = query.orderBy('created_at', 'desc').orderBy('id', 'desc');
  }

  const items = await query.limit(limit + 1);
  const hasMore = items.length > limit;
  const results = items.slice(0, limit);

  // Reverse results if we queried backward
  if (direction === 'backward') results.reverse();

  // Build cursors
  const firstItem = results[0];
  const lastItem = results[results.length - 1];

  return {
    data: results,
    pageInfo: {
      hasNextPage: direction === 'forward' ? hasMore : cursor !== null,
      hasPreviousPage: direction === 'forward' ? cursor !== null : hasMore,
      startCursor: firstItem ? encodeCursor({ position: pick(firstItem, ['created_at', 'id']) }) : null,
      endCursor: lastItem ? encodeCursor({ position: pick(lastItem, ['created_at', 'id']) }) : null
    }
  };
}
```

**Edge Cases Handled:**
- First page has no previous cursor
- Empty results return null cursors
- Backward navigation reverses query AND results
- Row value comparison handles timestamp collisions

#### Level 3: Architecture and Edge Cases

**Q: Design a pagination system for a distributed database where data is sharded across multiple nodes and sort columns may have clock skew.**

**Challenge Analysis:**
- Data distributed across N shards
- Each shard has independent clock (potential skew)
- Sort by `created_at` means items with "same" timestamp may have different values across shards
- Must return globally consistent page

**Solution Architecture:**

1. **Hybrid ID with Logical Clock:**
```javascript
// Use a hybrid logical clock (HLC) for ordering
// Format: physical_timestamp + logical_counter + node_id
const hlcId = `${Date.now()}-${logicalCounter.increment()}-${nodeId}`;
// Example: 1705320000000-00042-shard3
// Totally ordered even with clock skew
```

2. **Scatter-Gather with Merge:**
```javascript
async function paginateDistributed(cursor, limit) {
  // 1. Parse cursor to get per-shard positions
  const shardCursors = cursor ? decodeDistributedCursor(cursor) : {};

  // 2. Query all shards in parallel, fetch limit+1 from each
  const shardResults = await Promise.all(
    shards.map(shard =>
      shard.query({
        after: shardCursors[shard.id],
        limit: limit + 1,
        orderBy: 'hlc_id'
      })
    )
  );

  // 3. Merge-sort across shards using heap
  const heap = new MinHeap((a, b) => compareHLC(a.hlc_id, b.hlc_id));
  const shardIterators = shardResults.map((results, idx) => ({
    shardId: shards[idx].id,
    items: results,
    index: 0
  }));

  // Initialize heap with first item from each shard
  for (const iter of shardIterators) {
    if (iter.items.length > 0) {
      heap.push({ ...iter.items[0], _shardId: iter.shardId, _iter: iter });
    }
  }

  // 4. Extract limit items globally sorted
  const results = [];
  const lastPositions = {};

  while (results.length < limit && heap.size() > 0) {
    const item = heap.pop();
    results.push(item);
    lastPositions[item._shardId] = item.hlc_id;

    // Advance that shard's iterator
    const iter = item._iter;
    iter.index++;
    if (iter.index < iter.items.length) {
      const next = iter.items[iter.index];
      heap.push({ ...next, _shardId: iter.shardId, _iter: iter });
    }
  }

  // 5. Build distributed cursor with per-shard positions
  return {
    data: results,
    cursor: encodeDistributedCursor(lastPositions),
    hasMore: heap.size() > 0 || shardResults.some(r => r.length > limit)
  };
}
```

3. **Handling Clock Skew:**
- HLC ensures items from same node are ordered by wall clock
- Items across nodes ordered by HLC which bounds skew
- If wall clock skew exceeds threshold, HLC logical counter ensures unique ordering
- Worst case: items ordered by node_id when timestamps equal

4. **Optimization - Shard Elimination:**
```javascript
// If cursor indicates shard3 is exhausted, skip querying it
const activeShards = shards.filter(s =>
  !shardCursors[s.id]?.exhausted
);
```

**Trade-offs:**
- Latency: P99 dominated by slowest shard
- Complexity: Cursor encodes N shard positions
- Consistency: May miss items if shard unavailable during query

See also: [[distributed-systems]](/topics/system-design/distributed-systems), [[consistency-models]](/topics/system-design/consistency)

---

## API Versioning

### Why Versioning Matters

APIs are contracts. Once clients integrate, any breaking change causes production failures. Versioning provides escape hatches for evolution while maintaining backward compatibility.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin: 0 0 20px 0; text-align: center;">Versioning Strategy Comparison</h4>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <div style="flex: 1; min-width: 220px; background: #dcfce7; padding: 16px; border-radius: 8px;">
      <div style="color: #15803d; font-weight: 600; margin-bottom: 8px;">URL Path Versioning</div>
      <code style="background: #166534; color: white; padding: 6px 10px; border-radius: 4px; font-size: 12px; display: block;">/v1/users/123</code>
      <div style="color: #1e293b; font-size: 12px; margin-top: 12px;">
        <strong>Pros:</strong> Explicit, cacheable, easy routing<br>
        <strong>Cons:</strong> URL pollution, version lock-in<br>
        <strong>Used by:</strong> Stripe, GitHub, Twitter
      </div>
    </div>
    <div style="flex: 1; min-width: 220px; background: #dbeafe; padding: 16px; border-radius: 8px;">
      <div style="color: #1e40af; font-weight: 600; margin-bottom: 8px;">Header Versioning</div>
      <code style="background: #1e40af; color: white; padding: 6px 10px; border-radius: 4px; font-size: 12px; display: block;">Accept: application/vnd.api.v2+json</code>
      <div style="color: #1e293b; font-size: 12px; margin-top: 12px;">
        <strong>Pros:</strong> Clean URLs, content negotiation<br>
        <strong>Cons:</strong> Hidden, harder to test<br>
        <strong>Used by:</strong> GitHub (also), Azure
      </div>
    </div>
    <div style="flex: 1; min-width: 220px; background: #fef3c7; padding: 16px; border-radius: 8px;">
      <div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Query Parameter</div>
      <code style="background: #92400e; color: white; padding: 6px 10px; border-radius: 4px; font-size: 12px; display: block;">/users/123?api-version=2024-01</code>
      <div style="color: #1e293b; font-size: 12px; margin-top: 12px;">
        <strong>Pros:</strong> Optional, gradual adoption<br>
        <strong>Cons:</strong> Easy to forget, cache key issues<br>
        <strong>Used by:</strong> AWS, Google Cloud
      </div>
    </div>
    <div style="flex: 1; min-width: 220px; background: #f3e8ff; padding: 16px; border-radius: 8px;">
      <div style="color: #7c3aed; font-weight: 600; margin-bottom: 8px;">Date-Based Versioning</div>
      <code style="background: #7c3aed; color: white; padding: 6px 10px; border-radius: 4px; font-size: 12px; display: block;">Stripe-Version: 2024-01-15</code>
      <div style="color: #1e293b; font-size: 12px; margin-top: 12px;">
        <strong>Pros:</strong> Fine-grained, self-documenting<br>
        <strong>Cons:</strong> Complex support matrix<br>
        <strong>Used by:</strong> Stripe
      </div>
    </div>
  </div>
</div>

### Internal Implementation: Version Resolution

A production versioning system requires sophisticated routing:

```javascript
// Version resolution middleware
function resolveVersion(req, res, next) {
  // Priority: Header > Query > URL Path > Default
  let version = req.headers['api-version']
    || req.query['api-version']
    || extractPathVersion(req.path)
    || config.defaultVersion;

  // Validate version format and support status
  const versionInfo = supportedVersions.get(version);
  if (!versionInfo) {
    return res.status(400).json({
      error: 'UNSUPPORTED_VERSION',
      message: `Version ${version} is not supported`,
      supported: Array.from(supportedVersions.keys())
    });
  }

  // Warn if version is deprecated
  if (versionInfo.status === 'deprecated') {
    res.set('Deprecation', versionInfo.deprecationDate);
    res.set('Sunset', versionInfo.sunsetDate);
    res.set('Link', `<${versionInfo.migrationGuide}>; rel="deprecation"`);
  }

  req.apiVersion = version;
  req.versionConfig = versionInfo;
  next();
}

// Version-aware response transformation
function transformResponse(data, version) {
  // Apply transformations for older versions
  let result = { ...data };

  for (const [v, transform] of versionTransforms) {
    if (semver.lt(version, v)) {
      result = transform(result);
    }
  }

  return result;
}

// Example: Field renamed in v2
versionTransforms.set('2.0.0', (data) => ({
  ...data,
  // v1 clients expect 'userName', v2+ use 'username'
  userName: data.username,
}));
```

### Breaking vs Non-Breaking Changes

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin: 0 0 16px 0;">Change Classification</h4>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <div style="flex: 1; min-width: 280px;">
      <div style="background: #dcfce7; padding: 12px; border-radius: 8px 8px 0 0; color: #15803d; font-weight: 600;">Non-Breaking (Safe)</div>
      <div style="background: #f0fdf4; padding: 16px; border-radius: 0 0 8px 8px; font-size: 13px;">
        <ul style="margin: 0; padding-left: 20px; color: #1e293b;">
          <li>Adding new optional fields to responses</li>
          <li>Adding new optional request parameters</li>
          <li>Adding new endpoints</li>
          <li>Adding new enum values (if client ignores unknown)</li>
          <li>Relaxing validation (accepting more input)</li>
          <li>Adding new HTTP methods to existing resources</li>
        </ul>
      </div>
    </div>
    <div style="flex: 1; min-width: 280px;">
      <div style="background: #fee2e2; padding: 12px; border-radius: 8px 8px 0 0; color: #b91c1c; font-weight: 600;">Breaking (Requires New Version)</div>
      <div style="background: #fef2f2; padding: 16px; border-radius: 0 0 8px 8px; font-size: 13px;">
        <ul style="margin: 0; padding-left: 20px; color: #1e293b;">
          <li>Removing or renaming fields</li>
          <li>Changing field types (int to string)</li>
          <li>Changing response structure</li>
          <li>Adding required request parameters</li>
          <li>Removing endpoints</li>
          <li>Tightening validation</li>
          <li>Changing error codes/formats</li>
          <li>Changing authentication requirements</li>
        </ul>
      </div>
    </div>
  </div>
</div>

### Deprecation Lifecycle

```
Active -> Deprecated -> Sunset -> Removed
   |          |           |         |
   |     +Warnings    +Errors   Complete
   |     +Sunset      +Grace     removal
   |     headers      period     from code
   |          |           |
   v          v           v
6+ months   3+ months   1+ month
 notice      notice     (optional)
```

**Deprecation Response Headers:**
```http
HTTP/1.1 200 OK
Deprecation: Sun, 01 Jan 2025 00:00:00 GMT
Sunset: Mon, 01 Jul 2025 00:00:00 GMT
Link: </docs/migration/v1-to-v2>; rel="deprecation"
X-API-Warn: "This endpoint is deprecated. Migrate to /v2/users"
```

### Interview Questions: Versioning

#### Level 1: Conceptual Understanding

**Q: What is the difference between URL path versioning and header versioning, and when would you choose each?**

**URL path versioning** (`/v1/users`) embeds the version in the URL. It's explicit, visible in logs and documentation, easily cacheable by CDNs, and simple to route at load balancers. However, it creates URL proliferation and makes version changes feel like endpoint changes.

**Header versioning** (`Accept: application/vnd.api.v2+json`) keeps URLs clean and follows content negotiation principles. It's less visible, harder to test in browsers, and requires infrastructure awareness of headers for routing.

**Choose URL path when:**
- Building public APIs with diverse clients
- CDN caching is critical
- Operations team routes at load balancer level
- API consumers have varying technical sophistication

**Choose header versioning when:**
- URLs represent true resource identity (HATEOAS)
- Clients are sophisticated (SDKs, internal services)
- Gradual version rollout is needed per-client
- Multiple representations of same version (JSON, XML)

#### Level 2: Implementation Depth

**Q: How would you implement Stripe-style date-based API versioning that allows hundreds of version points?**

Stripe's versioning uses dates (`2024-01-15`) as version identifiers, with each date representing a consistent API snapshot. Changes are captured as discrete transformations applied in sequence.

**Implementation Approach:**

```javascript
// 1. Define changes as dated, reversible transformations
const apiChanges = [
  {
    date: '2024-01-15',
    description: 'Renamed user.userName to user.username',
    forward: (data) => {
      if (data.userName) {
        data.username = data.userName;
        delete data.userName;
      }
      return data;
    },
    backward: (data) => {
      if (data.username) {
        data.userName = data.username;
        delete data.username;
      }
      return data;
    }
  },
  {
    date: '2024-02-01',
    description: 'Changed amount from cents (int) to dollars (string)',
    forward: (data) => {
      if (typeof data.amount === 'number') {
        data.amount = (data.amount / 100).toFixed(2);
      }
      return data;
    },
    backward: (data) => {
      if (typeof data.amount === 'string') {
        data.amount = Math.round(parseFloat(data.amount) * 100);
      }
      return data;
    }
  }
];

// 2. Transform response based on client version
function transformForVersion(data, clientVersion, currentVersion) {
  let result = structuredClone(data);

  // Find changes between client version and current
  const applicableChanges = apiChanges
    .filter(c => c.date > clientVersion && c.date <= currentVersion)
    .sort((a, b) => b.date.localeCompare(a.date)); // Newest first

  // Apply backward transforms to make data compatible with older version
  for (const change of applicableChanges) {
    result = change.backward(result);
  }

  return result;
}

// 3. Middleware integration
function versionMiddleware(req, res, next) {
  const clientVersion = req.headers['stripe-version'] || defaultVersion;
  const originalJson = res.json.bind(res);

  res.json = (data) => {
    const transformed = transformForVersion(data, clientVersion, currentVersion);
    originalJson(transformed);
  };

  next();
}
```

**Key Implementation Details:**
- Changes are bidirectional (forward for migration, backward for compatibility)
- Transformations are composable and ordered by date
- New code runs on latest version; transformations applied at response time
- Each change is independently testable

#### Level 3: Architecture and Edge Cases

**Q: Design a version management system for a microservices architecture where services evolve independently but expose a unified API.**

**Challenge Analysis:**
- N microservices, each with independent release cycles
- Gateway exposes unified API version (e.g., v2)
- Service A might be on internal v3, Service B on internal v5
- Client specifies gateway version; gateway must translate to each service's version

**Solution Architecture:**

<div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #f8fafc; margin: 0 0 20px 0; text-align: center;">Version Translation Architecture</h4>
  <div style="display: flex; flex-direction: column; gap: 12px; align-items: center;">
    <div style="background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-align: center;">
      <div style="font-weight: 600;">Client Request</div>
      <div style="font-size: 12px; opacity: 0.9;">API-Version: 2024-01</div>
    </div>
    <div style="color: #64748b;">|</div>
    <div style="background: #8b5cf6; color: white; padding: 16px 24px; border-radius: 8px; text-align: center; width: 80%; max-width: 400px;">
      <div style="font-weight: 600;">API Gateway</div>
      <div style="font-size: 12px; opacity: 0.9; margin-top: 4px;">Version Registry + Transform Engine</div>
    </div>
    <div style="display: flex; gap: 24px; color: #64748b;">
      <span>|</span>
      <span>|</span>
      <span>|</span>
    </div>
    <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
      <div style="background: #22c55e; color: white; padding: 12px 16px; border-radius: 8px; text-align: center;">
        <div style="font-weight: 600; font-size: 14px;">User Service</div>
        <div style="font-size: 11px; opacity: 0.9;">Internal v3.2</div>
      </div>
      <div style="background: #f59e0b; color: white; padding: 12px 16px; border-radius: 8px; text-align: center;">
        <div style="font-weight: 600; font-size: 14px;">Order Service</div>
        <div style="font-size: 11px; opacity: 0.9;">Internal v2.1</div>
      </div>
      <div style="background: #ef4444; color: white; padding: 12px 16px; border-radius: 8px; text-align: center;">
        <div style="font-weight: 600; font-size: 14px;">Payment Service</div>
        <div style="font-size: 11px; opacity: 0.9;">Internal v4.0</div>
      </div>
    </div>
  </div>
</div>

**Implementation Components:**

1. **Version Registry:**
```javascript
const versionRegistry = {
  // Public API version -> internal service versions
  '2024-01': {
    userService: { version: '3.0', transforms: ['v3_user_compat'] },
    orderService: { version: '2.0', transforms: [] },
    paymentService: { version: '3.5', transforms: ['v3.5_payment_compat'] }
  },
  '2024-06': {
    userService: { version: '3.2', transforms: [] },
    orderService: { version: '2.1', transforms: [] },
    paymentService: { version: '4.0', transforms: [] }
  }
};
```

2. **Gateway Transform Layer:**
```javascript
async function handleRequest(req) {
  const publicVersion = req.headers['api-version'] || '2024-06';
  const serviceMapping = versionRegistry[publicVersion];

  // Route to appropriate service with version header
  const serviceConfig = serviceMapping[targetService];
  const response = await callService(targetService, {
    ...req,
    headers: {
      ...req.headers,
      'X-Internal-Version': serviceConfig.version
    }
  });

  // Apply backward-compatibility transforms
  let transformed = response.data;
  for (const transformName of serviceConfig.transforms) {
    transformed = transforms[transformName](transformed);
  }

  return transformed;
}
```

3. **Service Contract Testing:**
```javascript
// Each service maintains contract tests for supported versions
describe('User Service v3.0 Contract', () => {
  it('returns user in v3.0 format', async () => {
    const response = await request(app)
      .get('/internal/users/123')
      .set('X-Internal-Version', '3.0');

    expect(response.body).toMatchSchema(userSchemaV3);
  });
});
```

4. **Version Compatibility Matrix:**
- Automated tests verify gateway + all service version combinations
- CI blocks deployments that break compatibility
- Dashboard shows which public versions depend on which service versions

**Edge Cases:**
- **Service Rollback**: If Order Service rolls back v2.1 -> v2.0, gateway must detect and route 2024-06 clients to error or fallback
- **Partial Availability**: If Payment Service v4.0 is down, can gateway serve 2024-06 requests using v3.5 + transforms?
- **Transform Chains**: Some transforms depend on others; must validate DAG has no cycles

See also: [[api-gateway]](/topics/system-design/api-gateway), [[microservices]](/topics/system-design/microservices)

---

## Idempotency

### The Problem Idempotency Solves

In distributed systems, requests can fail at any point:

```
Client -> Server: POST /payments (create $100 charge)
Server: Processes charge successfully
Server -> Client: 200 OK [NETWORK FAILURE - response lost]
Client: Timeout! Did payment go through?
Client -> Server: POST /payments (retry)
Server: Processes charge again
Result: Customer charged $200 instead of $100
```

**Idempotency** ensures that performing the same operation multiple times produces the same result as performing it once.

### Mathematical Definition

An operation `f` is idempotent if: `f(f(x)) = f(x)`

For APIs: Replaying a request with the same idempotency key returns the same response without re-executing side effects.

### Implementation Architecture

<div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #f8fafc; margin: 0 0 20px 0; text-align: center;">Idempotency Request Flow</h4>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="background: #3b82f6; color: white; padding: 8px 16px; border-radius: 8px; min-width: 120px; text-align: center;">Request + Key</div>
      <div style="color: #64748b;">--></div>
      <div style="background: #8b5cf6; color: white; padding: 8px 16px; border-radius: 8px; flex: 1;">
        <strong>1. Check Store</strong>: Key exists?
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; margin-left: 150px;">
      <div style="background: #22c55e; color: white; padding: 8px 16px; border-radius: 8px; flex: 1;">
        <strong>YES</strong>: Return cached response (no side effects)
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; margin-left: 150px;">
      <div style="background: #f59e0b; color: white; padding: 8px 16px; border-radius: 8px; flex: 1;">
        <strong>NO</strong>: Acquire lock, process request
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; margin-left: 150px;">
      <div style="color: #64748b;">--></div>
      <div style="background: #8b5cf6; color: white; padding: 8px 16px; border-radius: 8px; flex: 1;">
        <strong>2. Execute</strong>: Run business logic
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; margin-left: 150px;">
      <div style="color: #64748b;">--></div>
      <div style="background: #8b5cf6; color: white; padding: 8px 16px; border-radius: 8px; flex: 1;">
        <strong>3. Store</strong>: Save response with key (TTL: 24h)
      </div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px; margin-left: 150px;">
      <div style="color: #64748b;">--></div>
      <div style="background: #8b5cf6; color: white; padding: 8px 16px; border-radius: 8px; flex: 1;">
        <strong>4. Release</strong>: Unlock, return response
      </div>
    </div>
  </div>
</div>

### Production Implementation

```python
import hashlib
import json
from functools import wraps
from redis import Redis
from contextlib import contextmanager

class IdempotencyService:
    """
    Production-grade idempotency implementation.

    Key Design Decisions:
    - Redis for distributed lock + storage (single source of truth)
    - Request fingerprint validation prevents key reuse with different payloads
    - Locking prevents concurrent duplicate processing
    - TTL ensures eventual cleanup (24h default)
    """

    def __init__(self, redis: Redis, ttl: int = 86400):
        self.redis = redis
        self.ttl = ttl

    def _fingerprint(self, request_body: dict) -> str:
        """
        Generate deterministic hash of request body.
        Critical: Prevents reusing idempotency key with different payload.
        """
        canonical = json.dumps(request_body, sort_keys=True, separators=(',', ':'))
        return hashlib.sha256(canonical.encode()).hexdigest()[:16]

    @contextmanager
    def acquire_lock(self, key: str, timeout: int = 30):
        """
        Distributed lock to prevent concurrent processing of same key.

        Trade-off: Lock timeout must balance between:
        - Too short: Long requests release lock prematurely
        - Too long: Crashed processes hold lock, blocking retries
        """
        lock_key = f"idempotency:lock:{key}"
        lock_acquired = self.redis.set(lock_key, "1", nx=True, ex=timeout)

        if not lock_acquired:
            raise ConcurrentRequestError(f"Request with key {key} is already processing")

        try:
            yield
        finally:
            self.redis.delete(lock_key)

    def get_cached_response(self, key: str, fingerprint: str):
        """
        Retrieve cached response, validating fingerprint matches.
        """
        data = self.redis.hgetall(f"idempotency:response:{key}")
        if not data:
            return None

        stored_fingerprint = data.get(b'fingerprint', b'').decode()
        if stored_fingerprint != fingerprint:
            raise FingerprintMismatchError(
                f"Idempotency key {key} was used with a different request body"
            )

        return {
            'status_code': int(data[b'status_code']),
            'body': json.loads(data[b'body']),
            'replayed': True
        }

    def cache_response(self, key: str, fingerprint: str, status_code: int, body: dict):
        """
        Store response with fingerprint for future replay.

        Note: We store even error responses. If the first attempt returned 400,
        retries should also get 400 (idempotent behavior).
        """
        cache_key = f"idempotency:response:{key}"
        self.redis.hset(cache_key, mapping={
            'fingerprint': fingerprint,
            'status_code': status_code,
            'body': json.dumps(body),
            'created_at': datetime.utcnow().isoformat()
        })
        self.redis.expire(cache_key, self.ttl)


def idempotent(service: IdempotencyService):
    """Decorator for idempotent endpoints."""
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            request = get_current_request()
            key = request.headers.get('Idempotency-Key')

            if not key:
                return error_response(400, 'IDEMPOTENCY_KEY_REQUIRED',
                    'Idempotency-Key header is required for this endpoint')

            fingerprint = service._fingerprint(request.json or {})

            # Check for cached response
            cached = service.get_cached_response(key, fingerprint)
            if cached:
                response = jsonify(cached['body'])
                response.status_code = cached['status_code']
                response.headers['Idempotent-Replayed'] = 'true'
                return response

            # Process with lock
            with service.acquire_lock(key):
                # Double-check after acquiring lock (another request may have completed)
                cached = service.get_cached_response(key, fingerprint)
                if cached:
                    response = jsonify(cached['body'])
                    response.status_code = cached['status_code']
                    response.headers['Idempotent-Replayed'] = 'true'
                    return response

                # Execute the actual handler
                result, status_code = f(*args, **kwargs)

                # Cache the response
                service.cache_response(key, fingerprint, status_code, result)

                return jsonify(result), status_code

        return wrapper
    return decorator
```

### Edge Cases and Failure Modes

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 2px solid #ef4444; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #b91c1c; margin: 0 0 16px 0;">Idempotency Edge Cases</h4>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="background: white; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
      <div style="color: #b91c1c; font-weight: 600;">Key Reuse with Different Payload</div>
      <div style="color: #1e293b; font-size: 13px;">Client uses same key for different requests. Without fingerprint validation, second request returns first response (wrong data). <strong>Solution:</strong> Store and validate request hash.</div>
    </div>
    <div style="background: white; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
      <div style="color: #b91c1c; font-weight: 600;">Partial Execution Failure</div>
      <div style="color: #1e293b; font-size: 13px;">Request processed payment but crashed before caching response. Retry will charge again. <strong>Solution:</strong> Use database transactions that include idempotency record.</div>
    </div>
    <div style="background: white; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
      <div style="color: #b91c1c; font-weight: 600;">Redis Failure During Lock</div>
      <div style="color: #1e293b; font-size: 13px;">Lock acquired, Redis fails, lock never released. Retries blocked. <strong>Solution:</strong> Use lock TTL, implement circuit breaker.</div>
    </div>
    <div style="background: white; padding: 12px; border-radius: 8px; border-left: 3px solid #ef4444;">
      <div style="color: #b91c1c; font-weight: 600;">Non-Deterministic Operations</div>
      <div style="color: #1e293b; font-size: 13px;">Endpoint uses current timestamp or random values. Replayed response has stale data. <strong>Solution:</strong> Accept these values as input, not server-generated.</div>
    </div>
  </div>
</div>

### Interview Questions: Idempotency

#### Level 1: Conceptual Understanding

**Q: Why is idempotency important for payment APIs?**

Payment APIs involve irreversible financial operations. Network failures are common - the client might not receive the response even when the server processed successfully. Without idempotency:

1. **Double charges**: Client retries, payment processes twice
2. **Lost refunds**: Refund request lost, customer never credited
3. **Inventory oversell**: Order placed twice, stock goes negative

Idempotency ensures that retrying a failed (or timed-out) request is safe. The first request is processed; subsequent requests with the same idempotency key return the cached result without re-executing the payment.

**Key insight**: Idempotency shifts the burden from "prevent retries" (impossible) to "make retries safe" (achievable).

#### Level 2: Implementation Depth

**Q: How would you implement idempotency that survives both application and database crashes?**

The core challenge is atomicity: the business logic and idempotency record must be committed together.

**Solution: Database Transaction with Idempotency Record**

```python
from contextlib import contextmanager

@contextmanager
def idempotent_transaction(db, idempotency_key: str, request_hash: str):
    """
    Atomic idempotency using database transactions.

    The idempotency record lives in the SAME database as business data,
    committed in the SAME transaction. This ensures:
    - If business logic commits, idempotency record exists
    - If crash before commit, both are rolled back
    """
    with db.transaction() as tx:
        # Check for existing idempotency record
        existing = tx.query("""
            SELECT response_body, status_code
            FROM idempotency_keys
            WHERE key = %s FOR UPDATE
        """, [idempotency_key])

        if existing:
            # Validate request hash matches
            if existing.request_hash != request_hash:
                raise ValueError("Idempotency key used with different request")

            yield {'cached': True, 'response': existing.response_body}
            return

        # Insert pending record (prevents concurrent processing)
        tx.execute("""
            INSERT INTO idempotency_keys (key, request_hash, status)
            VALUES (%s, %s, 'processing')
        """, [idempotency_key, request_hash])

        # Yield control to business logic
        result = {'cached': False, 'response': None}
        yield result

        # Update with response (same transaction as business logic)
        tx.execute("""
            UPDATE idempotency_keys
            SET status = 'completed',
                response_body = %s,
                status_code = %s,
                completed_at = NOW()
            WHERE key = %s
        """, [json.dumps(result['response']), result['status_code'], idempotency_key])


# Usage in handler
@app.route('/payments', methods=['POST'])
def create_payment():
    key = request.headers['Idempotency-Key']
    request_hash = hash_request(request.json)

    with idempotent_transaction(db, key, request_hash) as ctx:
        if ctx['cached']:
            return jsonify(ctx['response']), 200

        # Business logic in same transaction
        payment = Payment(
            amount=request.json['amount'],
            customer_id=request.json['customer_id']
        )
        db.add(payment)

        # Charge payment processor
        charge_result = payment_processor.charge(payment)

        ctx['response'] = {'payment_id': payment.id, 'status': 'completed'}
        ctx['status_code'] = 201

    return jsonify(ctx['response']), 201
```

**Critical Implementation Detail**: The idempotency record uses `FOR UPDATE` to acquire a row-level lock, preventing concurrent requests with the same key.

#### Level 3: Architecture and Edge Cases

**Q: Design an idempotency system for a distributed microservices architecture where a single API call triggers operations across multiple services.**

**Challenge Analysis:**
- Single idempotency key covers saga spanning multiple services
- Each service has independent database
- Partial failures leave system in inconsistent state
- Need to ensure entire saga is idempotent, not just individual calls

**Solution: Orchestrated Saga with Per-Step Idempotency**

<div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #f8fafc; margin: 0 0 20px 0; text-align: center;">Distributed Idempotency Architecture</h4>
  <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
    <div style="background: #3b82f6; color: white; padding: 12px 24px; border-radius: 8px; text-align: center;">
      <div style="font-weight: 600;">API Gateway</div>
      <div style="font-size: 11px;">Idempotency-Key: order_abc123</div>
    </div>
    <div style="color: #64748b;">|</div>
    <div style="background: #8b5cf6; color: white; padding: 16px 24px; border-radius: 8px; width: 80%; max-width: 400px;">
      <div style="font-weight: 600; text-align: center;">Saga Orchestrator</div>
      <div style="font-size: 12px; margin-top: 8px; text-align: center;">Tracks saga state + step completion</div>
    </div>
    <div style="display: flex; gap: 8px; color: #64748b;">
      <span>|</span>
      <span>|</span>
      <span>|</span>
    </div>
    <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
      <div style="background: #22c55e; color: white; padding: 12px; border-radius: 8px; text-align: center; min-width: 100px;">
        <div style="font-weight: 600; font-size: 13px;">Step 1</div>
        <div style="font-size: 11px;">Reserve Inventory</div>
        <div style="font-size: 10px; opacity: 0.8;">key: order_abc123_inv</div>
      </div>
      <div style="background: #f59e0b; color: white; padding: 12px; border-radius: 8px; text-align: center; min-width: 100px;">
        <div style="font-weight: 600; font-size: 13px;">Step 2</div>
        <div style="font-size: 11px;">Charge Payment</div>
        <div style="font-size: 10px; opacity: 0.8;">key: order_abc123_pay</div>
      </div>
      <div style="background: #ef4444; color: white; padding: 12px; border-radius: 8px; text-align: center; min-width: 100px;">
        <div style="font-weight: 600; font-size: 13px;">Step 3</div>
        <div style="font-size: 11px;">Create Shipment</div>
        <div style="font-size: 10px; opacity: 0.8;">key: order_abc123_ship</div>
      </div>
    </div>
  </div>
</div>

**Implementation:**

```python
class SagaOrchestrator:
    """
    Orchestrates multi-service saga with per-step idempotency.

    Design Decisions:
    - Each step has derived idempotency key (parent_key + step_name)
    - Saga state persisted for resume-on-crash
    - Compensating actions for rollback
    """

    def __init__(self, db, services):
        self.db = db
        self.services = services

    async def execute_order_saga(self, idempotency_key: str, order_data: dict):
        # Load or create saga state
        saga = await self.get_or_create_saga(idempotency_key, order_data)

        if saga.status == 'completed':
            return saga.result

        if saga.status == 'failed':
            return saga.error

        steps = [
            ('reserve_inventory', self.services.inventory.reserve,
             self.services.inventory.release),  # compensating action
            ('charge_payment', self.services.payment.charge,
             self.services.payment.refund),
            ('create_shipment', self.services.shipping.create,
             self.services.shipping.cancel),
        ]

        try:
            for step_name, execute_fn, compensate_fn in steps:
                if step_name in saga.completed_steps:
                    continue  # Already done (idempotent resume)

                # Derive step-specific idempotency key
                step_key = f"{idempotency_key}_{step_name}"

                try:
                    result = await execute_fn(
                        idempotency_key=step_key,
                        data=self._prepare_step_data(step_name, order_data, saga)
                    )

                    # Record step completion
                    saga.completed_steps[step_name] = result
                    await self.save_saga(saga)

                except Exception as e:
                    # Step failed - trigger compensation
                    await self._compensate(saga, steps, step_name)
                    saga.status = 'failed'
                    saga.error = str(e)
                    await self.save_saga(saga)
                    raise

            saga.status = 'completed'
            saga.result = self._build_result(saga)
            await self.save_saga(saga)
            return saga.result

        except Exception as e:
            # Saga failed, compensation handled above
            raise

    async def _compensate(self, saga, steps, failed_step):
        """
        Execute compensating actions for completed steps in reverse order.

        Each compensation is also idempotent - safe to retry compensation.
        """
        completed = list(saga.completed_steps.keys())
        for step_name, _, compensate_fn in reversed(steps):
            if step_name in completed:
                comp_key = f"{saga.idempotency_key}_{step_name}_compensate"
                try:
                    await compensate_fn(
                        idempotency_key=comp_key,
                        data=saga.completed_steps[step_name]
                    )
                except Exception as e:
                    # Log but continue - compensations should be retried
                    logger.error(f"Compensation failed: {step_name}", exc_info=e)
```

**Key Design Decisions:**
1. **Derived Keys**: `order_abc123_reserve_inventory` ensures each step is independently idempotent
2. **Persistent Saga State**: Crash-safe resume from any point
3. **Compensating Actions**: Each forward action has a reverse
4. **Compensation Idempotency**: Compensations also have idempotency keys

**Edge Cases:**
- **Compensation Failure**: Log and queue for retry; alert for manual intervention
- **Timeout During Step**: Saga remains in `processing`; next attempt resumes
- **Service Returns Error**: Different from timeout; may not need compensation if step never executed

See also: [[distributed-transactions]](/topics/system-design/distributed-transactions), [[saga-pattern]](/topics/system-design/saga-pattern)

---

## Error Handling

### Error Design Philosophy

API errors serve two audiences with different needs:

1. **Developers**: Need enough detail to debug integration issues
2. **End Users**: Need actionable messages without security-sensitive details

Well-designed errors balance these needs while maintaining consistency across the API.

### Error Response Structure

```json
{
  "error": {
    "code": "PAYMENT_DECLINED",
    "message": "The card was declined by the issuing bank",
    "type": "payment_error",
    "param": "card_number",
    "details": {
      "decline_code": "insufficient_funds",
      "merchant_message": "The customer's bank declined the transaction"
    },
    "request_id": "req_8xKj2Mn4Pq",
    "doc_url": "https://api.example.com/docs/errors#payment_declined"
  }
}
```

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin: 0 0 16px 0;">Error Field Purposes</h4>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <tr style="background: #e2e8f0;">
      <th style="padding: 12px; text-align: left; color: #1e293b;">Field</th>
      <th style="padding: 12px; text-align: left; color: #1e293b;">Purpose</th>
      <th style="padding: 12px; text-align: left; color: #1e293b;">Example</th>
    </tr>
    <tr style="background: #f8fafc;">
      <td style="padding: 12px; color: #1e293b;"><code>code</code></td>
      <td style="padding: 12px; color: #1e293b;">Machine-readable identifier for programmatic handling</td>
      <td style="padding: 12px; color: #1e293b;"><code>PAYMENT_DECLINED</code></td>
    </tr>
    <tr style="background: #ffffff;">
      <td style="padding: 12px; color: #1e293b;"><code>message</code></td>
      <td style="padding: 12px; color: #1e293b;">Human-readable description for developers</td>
      <td style="padding: 12px; color: #1e293b;">"The card was declined"</td>
    </tr>
    <tr style="background: #f8fafc;">
      <td style="padding: 12px; color: #1e293b;"><code>type</code></td>
      <td style="padding: 12px; color: #1e293b;">Error category for broad handling logic</td>
      <td style="padding: 12px; color: #1e293b;"><code>validation_error</code>, <code>authentication_error</code></td>
    </tr>
    <tr style="background: #ffffff;">
      <td style="padding: 12px; color: #1e293b;"><code>param</code></td>
      <td style="padding: 12px; color: #1e293b;">Specific field that caused the error</td>
      <td style="padding: 12px; color: #1e293b;"><code>email</code>, <code>card_number</code></td>
    </tr>
    <tr style="background: #f8fafc;">
      <td style="padding: 12px; color: #1e293b;"><code>request_id</code></td>
      <td style="padding: 12px; color: #1e293b;">Correlation ID for support and debugging</td>
      <td style="padding: 12px; color: #1e293b;"><code>req_8xKj2Mn4Pq</code></td>
    </tr>
    <tr style="background: #ffffff;">
      <td style="padding: 12px; color: #1e293b;"><code>doc_url</code></td>
      <td style="padding: 12px; color: #1e293b;">Link to detailed documentation</td>
      <td style="padding: 12px; color: #1e293b;"><code>https://docs.api.com/errors#...</code></td>
    </tr>
  </table>
</div>

### HTTP Status Code Semantics

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin: 0 0 16px 0;">Status Code Decision Tree</h4>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <div style="background: #dcfce7; padding: 12px; border-radius: 8px; border-left: 4px solid #22c55e;">
      <strong style="color: #15803d;">2xx - Success</strong>
      <div style="font-size: 13px; color: #1e293b; margin-top: 4px;">
        <code>200</code> GET/PUT/PATCH success | <code>201</code> POST created | <code>204</code> DELETE success (no body)
      </div>
    </div>
    <div style="background: #fef3c7; padding: 12px; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <strong style="color: #92400e;">4xx - Client Error (Don't Retry)</strong>
      <div style="font-size: 13px; color: #1e293b; margin-top: 4px;">
        <code>400</code> Malformed request | <code>401</code> Auth missing | <code>403</code> Auth valid, no permission | <code>404</code> Resource not found | <code>409</code> Conflict/duplicate | <code>422</code> Semantic error | <code>429</code> Rate limited (retry with backoff)
      </div>
    </div>
    <div style="background: #fee2e2; padding: 12px; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #b91c1c;">5xx - Server Error (Safe to Retry)</strong>
      <div style="font-size: 13px; color: #1e293b; margin-top: 4px;">
        <code>500</code> Internal error | <code>502</code> Bad gateway | <code>503</code> Service unavailable | <code>504</code> Gateway timeout
      </div>
    </div>
  </div>
</div>

### Error Categories Implementation

```python
from enum import Enum
from dataclasses import dataclass
from typing import Optional, Dict, Any

class ErrorType(Enum):
    VALIDATION_ERROR = "validation_error"
    AUTHENTICATION_ERROR = "authentication_error"
    AUTHORIZATION_ERROR = "authorization_error"
    NOT_FOUND_ERROR = "not_found_error"
    CONFLICT_ERROR = "conflict_error"
    RATE_LIMIT_ERROR = "rate_limit_error"
    PAYMENT_ERROR = "payment_error"
    INTERNAL_ERROR = "internal_error"

@dataclass
class APIError(Exception):
    """
    Base API error with structured fields.

    Design Decision: Errors are data, not just exceptions.
    This allows consistent serialization and handling.
    """
    code: str
    message: str
    error_type: ErrorType
    status_code: int
    param: Optional[str] = None
    details: Optional[Dict[str, Any]] = None

    def to_dict(self, request_id: str) -> dict:
        """Serialize for API response."""
        result = {
            "error": {
                "code": self.code,
                "message": self.message,
                "type": self.error_type.value,
                "request_id": request_id,
            }
        }
        if self.param:
            result["error"]["param"] = self.param
        if self.details:
            result["error"]["details"] = self.details
        return result


# Specific error classes for type safety
class ValidationError(APIError):
    def __init__(self, message: str, param: str, details: dict = None):
        super().__init__(
            code="VALIDATION_ERROR",
            message=message,
            error_type=ErrorType.VALIDATION_ERROR,
            status_code=400,
            param=param,
            details=details
        )

class NotFoundError(APIError):
    def __init__(self, resource_type: str, resource_id: str):
        super().__init__(
            code=f"{resource_type.upper()}_NOT_FOUND",
            message=f"{resource_type.title()} with ID {resource_id} not found",
            error_type=ErrorType.NOT_FOUND_ERROR,
            status_code=404
        )

class RateLimitError(APIError):
    def __init__(self, retry_after: int):
        super().__init__(
            code="RATE_LIMIT_EXCEEDED",
            message=f"Rate limit exceeded. Retry after {retry_after} seconds",
            error_type=ErrorType.RATE_LIMIT_ERROR,
            status_code=429,
            details={"retry_after": retry_after}
        )


# Global error handler
@app.errorhandler(APIError)
def handle_api_error(error: APIError):
    request_id = request.headers.get('X-Request-ID', str(uuid.uuid4()))
    response = jsonify(error.to_dict(request_id))
    response.status_code = error.status_code

    # Add retry header for rate limits
    if isinstance(error, RateLimitError):
        response.headers['Retry-After'] = str(error.details['retry_after'])

    return response

# Catch unexpected errors
@app.errorhandler(Exception)
def handle_unexpected_error(error: Exception):
    """
    Critical: Never expose internal error details to clients.
    Log full stack trace, return generic message.
    """
    request_id = request.headers.get('X-Request-ID', str(uuid.uuid4()))

    # Log full details for debugging
    logger.exception(f"Unexpected error [request_id={request_id}]", exc_info=error)

    # Return sanitized response
    return jsonify({
        "error": {
            "code": "INTERNAL_ERROR",
            "message": "An unexpected error occurred. Please try again.",
            "type": "internal_error",
            "request_id": request_id
        }
    }), 500
```

### Security Considerations

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 2px solid #ef4444; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #b91c1c; margin: 0 0 16px 0;">Error Information Leakage Risks</h4>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="background: white; padding: 12px; border-radius: 8px;">
      <div style="color: #b91c1c; font-weight: 600;">Stack Traces</div>
      <div style="color: #1e293b; font-size: 13px;">Revealing framework, library versions, file paths enables targeted attacks.</div>
      <div style="color: #15803d; font-size: 12px; margin-top: 4px;">Fix: Log internally, return generic message externally.</div>
    </div>
    <div style="background: white; padding: 12px; border-radius: 8px;">
      <div style="color: #b91c1c; font-weight: 600;">SQL Errors</div>
      <div style="color: #1e293b; font-size: 13px;">"Column 'password_hash' not found" reveals schema details.</div>
      <div style="color: #15803d; font-size: 12px; margin-top: 4px;">Fix: Catch all DB errors, return "database error" generically.</div>
    </div>
    <div style="background: white; padding: 12px; border-radius: 8px;">
      <div style="color: #b91c1c; font-weight: 600;">User Enumeration</div>
      <div style="color: #1e293b; font-size: 13px;">"User not found" vs "Invalid password" reveals which emails exist.</div>
      <div style="color: #15803d; font-size: 12px; margin-top: 4px;">Fix: Return "Invalid credentials" for both cases.</div>
    </div>
    <div style="background: white; padding: 12px; border-radius: 8px;">
      <div style="color: #b91c1c; font-weight: 600;">Rate Limit Details</div>
      <div style="color: #1e293b; font-size: 13px;">"User 123 has 5 requests remaining" confirms user existence.</div>
      <div style="color: #15803d; font-size: 12px; margin-top: 4px;">Fix: Generic "rate limited" without user-specific details.</div>
    </div>
  </div>
</div>

### Interview Questions: Error Handling

#### Level 1: Conceptual Understanding

**Q: What's the difference between HTTP 400, 401, 403, and 404, and when should each be used?**

- **400 Bad Request**: The request syntax is malformed or contains invalid parameters. The client made an error that must be fixed before retrying. Examples: invalid JSON, missing required field, wrong data type.

- **401 Unauthorized**: Authentication is missing or invalid. The client hasn't proven their identity. Examples: missing token, expired token, invalid signature. Client should re-authenticate.

- **403 Forbidden**: Authentication succeeded but the user lacks permission. The client proved who they are, but they can't access this resource. Examples: user trying to access another user's data, free tier accessing premium features.

- **404 Not Found**: The resource doesn't exist (or the client shouldn't know it exists). Use when: resource genuinely missing, OR user lacks permission and you don't want to reveal existence.

**Key insight**: 401 vs 403 is about whether identity is established. 403 vs 404 depends on whether revealing resource existence is a security concern.

#### Level 2: Implementation Depth

**Q: How would you design a validation error response that handles both single field errors and complex multi-field validation?**

```python
class ValidationErrorResponse:
    """
    Validation error structure supporting:
    - Single field errors: one field failed
    - Multiple field errors: several fields failed independently
    - Cross-field errors: combination of fields is invalid
    - Nested object errors: errors in nested structures
    """

    def __init__(self):
        self.errors = []

    def add_field_error(self, field: str, code: str, message: str):
        """Single field validation error."""
        self.errors.append({
            "field": field,
            "code": code,
            "message": message
        })

    def add_nested_error(self, path: str, code: str, message: str):
        """
        Error in nested object.
        path uses dot notation: "address.zip_code"
        """
        self.errors.append({
            "field": path,
            "code": code,
            "message": message
        })

    def add_cross_field_error(self, fields: list, code: str, message: str):
        """
        Error involving multiple fields together.
        Example: start_date must be before end_date
        """
        self.errors.append({
            "fields": fields,
            "code": code,
            "message": message
        })

    def to_response(self, request_id: str):
        return {
            "error": {
                "code": "VALIDATION_ERROR",
                "message": f"Validation failed with {len(self.errors)} error(s)",
                "type": "validation_error",
                "request_id": request_id,
                "errors": self.errors
            }
        }, 400


# Example usage
def validate_order(data: dict) -> ValidationErrorResponse:
    errors = ValidationErrorResponse()

    # Single field validation
    if not data.get('email'):
        errors.add_field_error('email', 'REQUIRED', 'Email is required')
    elif not is_valid_email(data['email']):
        errors.add_field_error('email', 'INVALID_FORMAT',
            'Email must be a valid email address')

    # Nested object validation
    address = data.get('shipping_address', {})
    if address and not address.get('zip_code'):
        errors.add_nested_error('shipping_address.zip_code', 'REQUIRED',
            'Zip code is required for shipping address')

    # Cross-field validation
    if data.get('start_date') and data.get('end_date'):
        if data['start_date'] > data['end_date']:
            errors.add_cross_field_error(
                ['start_date', 'end_date'],
                'INVALID_DATE_RANGE',
                'Start date must be before end date'
            )

    return errors


# Example response
{
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Validation failed with 3 error(s)",
        "type": "validation_error",
        "request_id": "req_abc123",
        "errors": [
            {
                "field": "email",
                "code": "INVALID_FORMAT",
                "message": "Email must be a valid email address"
            },
            {
                "field": "shipping_address.zip_code",
                "code": "REQUIRED",
                "message": "Zip code is required for shipping address"
            },
            {
                "fields": ["start_date", "end_date"],
                "code": "INVALID_DATE_RANGE",
                "message": "Start date must be before end date"
            }
        ]
    }
}
```

#### Level 3: Architecture and Edge Cases

**Q: Design an error handling system for a public API that needs to support i18n, A/B testing of error messages, and gradual error format migration.**

**Requirements Analysis:**
- Multiple languages for error messages
- Test different message phrasings for conversion impact
- Migrate from legacy error format without breaking clients

**Solution Architecture:**

```python
class ErrorMessageRegistry:
    """
    Centralized error message management supporting:
    - Internationalization (i18n)
    - A/B testing of message variants
    - Format versioning for migration
    """

    def __init__(self, db, cache, ab_test_service):
        self.db = db
        self.cache = cache
        self.ab = ab_test_service

    def get_message(self, code: str, locale: str, user_id: str = None,
                    format_version: str = 'v2') -> dict:
        """
        Resolve error message considering all factors.

        Priority:
        1. A/B test variant (if user in experiment)
        2. Locale-specific message
        3. Default (en-US) message
        """
        # Check A/B test enrollment
        variant = None
        if user_id:
            experiment = self.ab.get_experiment(f"error_msg_{code}")
            if experiment:
                variant = self.ab.get_variant(experiment, user_id)

        # Build cache key
        cache_key = f"error:{code}:{locale}:{variant or 'default'}:{format_version}"

        cached = self.cache.get(cache_key)
        if cached:
            return cached

        # Fetch from database
        message_data = self.db.query("""
            SELECT message, details_template
            FROM error_messages
            WHERE code = %s
              AND locale = %s
              AND (variant = %s OR variant IS NULL)
              AND format_version = %s
            ORDER BY variant DESC NULLS LAST
            LIMIT 1
        """, [code, locale, variant, format_version])

        if not message_data:
            # Fallback to default locale
            message_data = self.db.query("""
                SELECT message, details_template
                FROM error_messages
                WHERE code = %s AND locale = 'en-US' AND format_version = %s
                LIMIT 1
            """, [code, format_version])

        result = {
            'message': message_data.message,
            'template': message_data.details_template,
            'variant': variant
        }

        self.cache.set(cache_key, result, ttl=3600)
        return result


class ErrorResponseBuilder:
    """
    Builds error responses supporting multiple format versions.

    Format v1 (legacy):
    {"error": "message", "code": 123}

    Format v2 (current):
    {"error": {"code": "...", "message": "...", ...}}
    """

    def __init__(self, registry: ErrorMessageRegistry):
        self.registry = registry

    def build(self, error: APIError, request) -> dict:
        # Determine format version from Accept header or client version
        format_version = self._resolve_format_version(request)

        # Get user context
        user_id = getattr(request, 'user_id', None)
        locale = request.headers.get('Accept-Language', 'en-US').split(',')[0]

        # Fetch localized message
        msg_data = self.registry.get_message(
            error.code, locale, user_id, format_version
        )

        # Interpolate template with error details
        message = msg_data['message']
        if error.details and msg_data['template']:
            message = msg_data['template'].format(**error.details)

        # Track A/B test exposure
        if msg_data['variant']:
            self.ab.track_exposure(
                user_id, f"error_msg_{error.code}", msg_data['variant']
            )

        # Build response based on format version
        if format_version == 'v1':
            return self._build_v1(error, message)
        else:
            return self._build_v2(error, message, request)

    def _resolve_format_version(self, request) -> str:
        """
        Determine format version from request context.

        Sources (priority order):
        1. Explicit header: X-Error-Format: v2
        2. Client SDK version header (SDK < 2.0 gets v1)
        3. Account settings (for gradual migration)
        4. Default to v2
        """
        explicit = request.headers.get('X-Error-Format')
        if explicit in ('v1', 'v2'):
            return explicit

        sdk_version = request.headers.get('X-SDK-Version')
        if sdk_version and parse_version(sdk_version) < parse_version('2.0.0'):
            return 'v1'

        if hasattr(request, 'account'):
            return request.account.error_format or 'v2'

        return 'v2'

    def _build_v1(self, error: APIError, message: str) -> tuple:
        """Legacy format for backward compatibility."""
        return {
            "error": message,
            "code": self._legacy_code_mapping.get(error.code, 0)
        }, error.status_code

    def _build_v2(self, error: APIError, message: str, request) -> tuple:
        """Current format with full details."""
        return {
            "error": {
                "code": error.code,
                "message": message,
                "type": error.error_type.value,
                "param": error.param,
                "request_id": request.request_id,
                "doc_url": f"https://api.example.com/docs/errors#{error.code.lower()}"
            }
        }, error.status_code
```

**Migration Strategy:**
1. Deploy with both formats supported
2. New clients default to v2
3. Track v1 usage through metrics
4. Notify v1 clients of deprecation timeline
5. Eventually sunset v1

See also: [[observability]](/topics/system-design/observability), [[rate-limiting]](/topics/system-design/rate-limiting)

---

## Backward Compatibility

### The Compatibility Contract

Once an API is published, external developers write code that depends on its behavior. Breaking that behavior costs money:

- **Integration failures**: Production apps stop working
- **Developer time**: Rewriting integrations
- **Trust erosion**: Developers hesitate to adopt your API
- **Support costs**: Increased tickets during transition

**Rule of thumb**: Assume any visible behavior is depended upon by someone.

### Types of Breaking Changes

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin: 0 0 16px 0;">Breaking Change Categories</h4>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <div style="flex: 1; min-width: 280px;">
      <div style="background: #fee2e2; padding: 12px; border-radius: 8px 8px 0 0; color: #b91c1c; font-weight: 600;">Syntactic Breaking Changes</div>
      <div style="background: #fef2f2; padding: 16px; border-radius: 0 0 8px 8px; font-size: 13px;">
        <ul style="margin: 0; padding-left: 20px; color: #1e293b;">
          <li>Removing endpoints</li>
          <li>Removing or renaming fields</li>
          <li>Changing field types</li>
          <li>Changing URL structure</li>
          <li>Changing HTTP methods</li>
          <li>Adding required parameters</li>
        </ul>
        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #fecaca; color: #b91c1c; font-size: 12px;">
          Detected by schema validation
        </div>
      </div>
    </div>
    <div style="flex: 1; min-width: 280px;">
      <div style="background: #fef3c7; padding: 12px; border-radius: 8px 8px 0 0; color: #92400e; font-weight: 600;">Semantic Breaking Changes</div>
      <div style="background: #fffbeb; padding: 16px; border-radius: 0 0 8px 8px; font-size: 13px;">
        <ul style="margin: 0; padding-left: 20px; color: #1e293b;">
          <li>Changing field meaning/units</li>
          <li>Changing error codes</li>
          <li>Changing rate limits</li>
          <li>Changing authentication</li>
          <li>Changing side effects</li>
          <li>Changing default values</li>
        </ul>
        <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #fde68a; color: #92400e; font-size: 12px;">
          Often undetected until production failure
        </div>
      </div>
    </div>
  </div>
</div>

### Compatibility Strategies

#### 1. Additive Changes Only

```python
# Original response (v1)
{
    "user_id": 123,
    "name": "Alice"
}

# Safe addition (still v1 compatible)
{
    "user_id": 123,
    "name": "Alice",
    "email": "alice@example.com",  # New optional field
    "created_at": "2024-01-15T10:00:00Z"  # New optional field
}
```

**Assumption**: Clients must ignore unknown fields. Document this expectation.

#### 2. Field Evolution Pattern

```python
# Need to change user_id from int to string UUID

# Step 1: Add new field alongside old
{
    "user_id": 123,           # Deprecated (int)
    "id": "usr_abc123",       # New format (string)
    "name": "Alice"
}

# Step 2: Document deprecation, give timeline
# Step 3: After sunset period, remove user_id in next major version
```

#### 3. Response Envelope Versioning

```python
# Include version in response for client detection
{
    "_meta": {
        "api_version": "2024-01",
        "deprecated_fields": ["user_id"],
        "warnings": ["Field 'user_id' deprecated, use 'id' instead"]
    },
    "data": {
        "id": "usr_abc123",
        "user_id": 123,
        "name": "Alice"
    }
}
```

### Contract Testing

```python
import pytest
from pact import Consumer, Provider

class TestAPIContract:
    """
    Contract tests ensure backward compatibility.
    Run against all supported versions before deployment.
    """

    @pytest.fixture
    def pact(self):
        return Consumer('WebApp').has_pact_with(
            Provider('UserAPI'),
            pact_dir='./pacts'
        )

    def test_get_user_v1_contract(self, pact):
        """V1 clients expect user_id as integer."""
        expected = {
            'user_id': 123,
            'name': 'Alice'
        }

        pact.given('user 123 exists') \
            .upon_receiving('a request for user 123 (v1)') \
            .with_request('GET', '/v1/users/123') \
            .will_respond_with(200, body=expected)

        with pact:
            result = api_client_v1.get_user(123)
            assert result['user_id'] == 123

    def test_get_user_v2_contract(self, pact):
        """V2 clients expect id as string UUID."""
        expected = {
            'id': 'usr_abc123',
            'user_id': 123,  # Still present for transition
            'name': 'Alice'
        }

        pact.given('user 123 exists') \
            .upon_receiving('a request for user 123 (v2)') \
            .with_request('GET', '/v2/users/123') \
            .will_respond_with(200, body=expected)

        with pact:
            result = api_client_v2.get_user(123)
            assert result['id'] == 'usr_abc123'
```

### Interview Questions: Backward Compatibility

#### Level 1: Conceptual Understanding

**Q: What makes a change "breaking" and how do you identify breaking changes before deployment?**

A breaking change is any modification that causes correctly-written client code to fail or behave differently. This includes:

**Syntactic breaks** (easily detected):
- Removing fields, endpoints, or parameters
- Changing types (int to string)
- Adding required parameters

**Semantic breaks** (harder to detect):
- Changing what a field means (amount in cents vs dollars)
- Changing error responses
- Changing rate limits or auth requirements

**Detection strategies:**
1. **Schema diff tools**: Compare OpenAPI specs between versions
2. **Contract tests**: Run consumer contracts against new version
3. **Shadow traffic**: Replay production requests, compare responses
4. **Canary deployment**: Release to 1% of traffic, monitor error rates
5. **Client SDK tests**: Run all SDK version test suites against new API

#### Level 2: Implementation Depth

**Q: How would you implement a deprecation system that gives clients adequate warning and tracks migration progress?**

```python
from datetime import datetime, timedelta
from dataclasses import dataclass
from typing import Optional
import logging

@dataclass
class DeprecationPolicy:
    """
    Deprecation tracking and enforcement.

    Lifecycle:
    1. Deprecated: Feature still works, warnings added
    2. Sunset: Feature returns errors for new clients
    3. Removed: Feature removed from codebase
    """
    feature_id: str
    deprecated_date: datetime
    sunset_date: datetime
    removal_date: datetime
    replacement: Optional[str]
    documentation_url: str

class DeprecationMiddleware:
    def __init__(self, policy_store, metrics, notification_service):
        self.policies = policy_store
        self.metrics = metrics
        self.notifications = notification_service

    def process_request(self, request, response):
        """Add deprecation headers and track usage."""

        # Check if request uses deprecated features
        deprecations = self.check_deprecations(request)

        for dep in deprecations:
            # Add standard deprecation headers
            response.headers['Deprecation'] = dep.deprecated_date.isoformat()
            response.headers['Sunset'] = dep.sunset_date.isoformat()
            response.headers['Link'] = f'<{dep.documentation_url}>; rel="deprecation"'

            # Add custom warning header
            response.headers.append('X-API-Warn',
                f'{dep.feature_id} is deprecated. {dep.replacement or "See docs for migration."}')

            # Track usage for migration monitoring
            self.metrics.increment('deprecated_feature_usage', tags={
                'feature': dep.feature_id,
                'client_id': request.client_id,
                'api_version': request.api_version
            })

            # Proactive notification for heavy users
            self._maybe_notify_client(request.client_id, dep)

    def check_deprecations(self, request) -> list:
        """Identify deprecated features in request."""
        deprecations = []

        # Check endpoint deprecation
        endpoint_policy = self.policies.get_endpoint_policy(request.path)
        if endpoint_policy:
            deprecations.append(endpoint_policy)

        # Check parameter deprecation
        for param in request.params:
            param_policy = self.policies.get_param_policy(request.path, param)
            if param_policy:
                deprecations.append(param_policy)

        # Check header deprecation (e.g., old auth scheme)
        for header in request.headers:
            header_policy = self.policies.get_header_policy(header)
            if header_policy:
                deprecations.append(header_policy)

        return deprecations

    def _maybe_notify_client(self, client_id: str, dep: DeprecationPolicy):
        """
        Send proactive notification to heavy users of deprecated features.

        Conditions for notification:
        - Client used feature 100+ times in past week
        - Haven't been notified in past 30 days
        - Sunset date is within 60 days
        """
        usage_count = self.metrics.get_weekly_usage(client_id, dep.feature_id)
        last_notified = self.notifications.get_last_notification(client_id, dep.feature_id)
        days_to_sunset = (dep.sunset_date - datetime.utcnow()).days

        if (usage_count >= 100 and
            days_to_sunset <= 60 and
            (not last_notified or (datetime.utcnow() - last_notified).days >= 30)):

            self.notifications.send_deprecation_notice(
                client_id=client_id,
                feature=dep.feature_id,
                sunset_date=dep.sunset_date,
                migration_guide=dep.documentation_url,
                usage_count=usage_count
            )


# Dashboard query for migration tracking
"""
SELECT
    feature_id,
    COUNT(DISTINCT client_id) as active_clients,
    SUM(request_count) as total_requests,
    MIN(first_seen) as earliest_usage,
    MAX(last_seen) as latest_usage,
    sunset_date,
    DATEDIFF(sunset_date, NOW()) as days_remaining
FROM deprecated_feature_usage
JOIN deprecation_policies USING (feature_id)
WHERE last_seen > DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY feature_id
ORDER BY days_remaining ASC;
"""
```

#### Level 3: Architecture and Edge Cases

**Q: Design a system for safely rolling out breaking changes to an API used by thousands of external developers, minimizing disruption while ensuring eventual migration.**

**Challenge Analysis:**
- Thousands of integrations with varying activity levels
- Some clients actively maintained, others abandoned
- Breaking change unavoidable (e.g., security fix, legal requirement)
- Must balance migration timeline with client disruption

**Solution: Multi-Phase Migration with Escape Hatches**

<div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #f8fafc; margin: 0 0 20px 0; text-align: center;">Breaking Change Migration Phases</h4>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 200px; background: #22c55e; color: white; padding: 16px; border-radius: 8px;">
        <div style="font-weight: 600;">Phase 1: Announcement</div>
        <div style="font-size: 12px; margin-top: 8px;">T-180 days</div>
        <div style="font-size: 11px; opacity: 0.9; margin-top: 4px;">Documentation, blog, email to all devs</div>
      </div>
      <div style="flex: 1; min-width: 200px; background: #3b82f6; color: white; padding: 16px; border-radius: 8px;">
        <div style="font-weight: 600;">Phase 2: Soft Warnings</div>
        <div style="font-size: 12px; margin-top: 8px;">T-120 days</div>
        <div style="font-size: 11px; opacity: 0.9; margin-top: 4px;">Deprecation headers, dashboard alerts</div>
      </div>
      <div style="flex: 1; min-width: 200px; background: #f59e0b; color: white; padding: 16px; border-radius: 8px;">
        <div style="font-weight: 600;">Phase 3: Hard Warnings</div>
        <div style="font-size: 12px; margin-top: 8px;">T-60 days</div>
        <div style="font-size: 11px; opacity: 0.9; margin-top: 4px;">Targeted emails, support outreach</div>
      </div>
      <div style="flex: 1; min-width: 200px; background: #ef4444; color: white; padding: 16px; border-radius: 8px;">
        <div style="font-weight: 600;">Phase 4: Enforcement</div>
        <div style="font-size: 12px; margin-top: 8px;">T-0</div>
        <div style="font-size: 11px; opacity: 0.9; margin-top: 4px;">Gradual rollout, extension requests</div>
      </div>
    </div>
  </div>
</div>

**Implementation:**

```python
class BreakingChangeMigration:
    """
    Orchestrates breaking change rollout with safety mechanisms.
    """

    def __init__(self, config, db, metrics, notification_service):
        self.config = config
        self.db = db
        self.metrics = metrics
        self.notifications = notification_service

    def get_enforcement_status(self, client_id: str) -> dict:
        """
        Determine if client should see old or new behavior.

        Factors:
        - Global rollout percentage
        - Client tier (enterprise gets more time)
        - Extension granted
        - Emergency bypass
        """
        migration = self.db.get_migration_status(self.config.migration_id, client_id)

        # Check for extension
        if migration.extension_granted:
            if datetime.utcnow() < migration.extension_until:
                return {
                    'enforce': False,
                    'reason': 'extension_active',
                    'expires': migration.extension_until
                }

        # Check global rollout percentage
        rollout_pct = self.config.get_rollout_percentage()
        client_bucket = self._hash_to_bucket(client_id)

        if client_bucket > rollout_pct:
            return {
                'enforce': False,
                'reason': 'gradual_rollout',
                'rollout_percentage': rollout_pct
            }

        # Client is in enforcement cohort
        return {
            'enforce': True,
            'reason': 'in_rollout_cohort'
        }

    def request_extension(self, client_id: str, reason: str) -> dict:
        """
        Allow clients to request migration extension.

        Policy:
        - First extension: 30 days, auto-approved
        - Second extension: 14 days, requires review
        - Third+: Denied, offer migration support
        """
        existing = self.db.get_extensions(client_id, self.config.migration_id)
        extension_count = len(existing)

        if extension_count == 0:
            # First extension auto-approved
            extension_until = datetime.utcnow() + timedelta(days=30)
            self.db.grant_extension(client_id, self.config.migration_id,
                                    extension_until, auto_approved=True)
            return {
                'granted': True,
                'until': extension_until,
                'message': 'First extension granted automatically'
            }

        elif extension_count == 1:
            # Second extension requires review
            self.db.create_extension_request(client_id, self.config.migration_id,
                                             reason=reason)
            self.notifications.alert_support(
                f"Extension request: {client_id} for {self.config.migration_id}"
            )
            return {
                'granted': False,
                'pending_review': True,
                'message': 'Extension request submitted for review'
            }

        else:
            # No more extensions
            return {
                'granted': False,
                'message': 'Maximum extensions reached. Contact support for migration assistance.',
                'support_link': 'https://support.api.com/migration-help'
            }

    def handle_request(self, request, handler):
        """
        Middleware to route request based on migration status.
        """
        status = self.get_enforcement_status(request.client_id)

        if status['enforce']:
            # New behavior
            response = handler.new_behavior(request)
        else:
            # Old behavior with warnings
            response = handler.old_behavior(request)

            # Add migration headers
            response.headers['X-Migration-Status'] = 'pending'
            response.headers['X-Migration-Deadline'] = self.config.deadline.isoformat()
            response.headers['X-Migration-Guide'] = self.config.documentation_url

        # Track for dashboard
        self.metrics.record_migration_request(
            migration_id=self.config.migration_id,
            client_id=request.client_id,
            used_new_behavior=status['enforce']
        )

        return response

    def rollback_if_needed(self):
        """
        Automatic rollback if error rates spike during rollout.

        Monitors:
        - 5xx error rate
        - Client-reported issues
        - Support ticket volume
        """
        current_pct = self.config.get_rollout_percentage()
        error_rate = self.metrics.get_error_rate_delta(
            self.config.migration_id,
            window_minutes=15
        )

        if error_rate > 0.05:  # >5% increase in errors
            new_pct = max(0, current_pct - 10)  # Roll back 10%
            self.config.set_rollout_percentage(new_pct)

            self.notifications.alert_oncall(
                f"Migration {self.config.migration_id} rolled back "
                f"from {current_pct}% to {new_pct}% due to error spike"
            )

            return True
        return False
```

**Edge Cases:**

1. **Abandoned Integrations**: Clients that haven't made requests in months suddenly break when they return. Solution: "Resurrection grace period" - if client was inactive during migration period, grant automatic extension on first request.

2. **Cascading Failures**: Partner A uses Partner B's integration which uses our API. Partner B migrates, Partner A breaks. Solution: Allow extensions to be requested by downstream dependents.

3. **Emergency Bypass**: Critical partner discovers issue day before deadline. Solution: 24/7 on-call can grant emergency extensions with CTO approval.

4. **Compliance Requirements**: Some industries require change approval processes that exceed our timeline. Solution: Enterprise tier with custom migration schedules.

See also: [[feature-flags]](/topics/system-design/feature-flags), [[deployment-strategies]](/topics/system-design/deployment)

---

## Quick Reference

### HTTP Methods and Idempotency

| Method | Purpose | Idempotent | Safe | Cacheable |
|--------|---------|------------|------|-----------|
| GET | Read | Yes | Yes | Yes |
| HEAD | Headers only | Yes | Yes | Yes |
| POST | Create | No* | No | No |
| PUT | Replace | Yes | No | No |
| PATCH | Update | No | No | No |
| DELETE | Remove | Yes | No | No |
| OPTIONS | Capabilities | Yes | Yes | No |

*POST can be made idempotent with idempotency keys

### Status Code Quick Reference

```
2xx Success
  200 OK - General success
  201 Created - POST success
  204 No Content - DELETE success

4xx Client Error (don't auto-retry)
  400 Bad Request - Validation failed
  401 Unauthorized - Auth required
  403 Forbidden - Auth OK, no permission
  404 Not Found - Resource missing
  409 Conflict - State conflict
  422 Unprocessable - Semantic error
  429 Too Many Requests - Rate limited

5xx Server Error (safe to retry)
  500 Internal Error - Bug
  502 Bad Gateway - Upstream failed
  503 Unavailable - Overloaded
  504 Timeout - Upstream slow
```

### Pagination Response Template

```json
{
  "data": [...],
  "pagination": {
    "next_cursor": "eyJpZCI6MTAwfQ==",
    "prev_cursor": "eyJpZCI6ODF9",
    "has_next": true,
    "has_prev": true
  },
  "meta": {
    "total_count": 1000,
    "returned_count": 20
  }
}
```

### Error Response Template

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email format is invalid",
    "type": "validation_error",
    "param": "email",
    "request_id": "req_8xKj2Mn4Pq",
    "doc_url": "https://api.example.com/docs/errors#validation_error"
  }
}
```

### Essential Headers

```http
# Request
Authorization: Bearer <token>
Content-Type: application/json
Idempotency-Key: <client-generated-uuid>
X-Request-ID: <client-generated-uuid>
Accept-Language: en-US

# Response
Content-Type: application/json
X-Request-ID: <echoed-or-generated>
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640000000
Deprecation: Sun, 01 Jan 2025 00:00:00 GMT
Sunset: Mon, 01 Jul 2025 00:00:00 GMT
```

## Cross-References

- [[api-gateway]](/topics/system-design/api-gateway) - Gateway patterns, routing, aggregation
- [[rate-limiting]](/topics/system-design/rate-limiting) - Token bucket, sliding window algorithms
- [[authentication]](/topics/system-design/authentication) - OAuth, JWT, API keys
- [[distributed-systems]](/topics/system-design/distributed-systems) - CAP theorem, consistency models
- [[caching]](/topics/system-design/caching) - Cache strategies, invalidation patterns
- [[microservices]](/topics/system-design/microservices) - Service communication patterns
