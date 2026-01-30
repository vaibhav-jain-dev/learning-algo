# Database Sharding

## Overview

<span style="color: #22c55e; font-weight: 600;">Database sharding</span> is a horizontal scaling technique that partitions data across multiple database instances, where each instance (shard) holds a subset of the total data. Unlike [[database-replication]](/topic/system-design/database-replication) which copies the same data everywhere, sharding divides data so each shard is responsible for different records.

Think of it like organizing a massive library: instead of one overwhelming building with millions of books, you create multiple specialized libraries - one for fiction, one for science, one for history. Each library is manageable on its own, and you just need to know which library to visit for your topic.

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #22c55e;">

  **The Core Insight**: A single database has hard limits - disk space, CPU, memory, network bandwidth, and connection count. Sharding breaks through these limits by distributing data horizontally across multiple machines, enabling <span style="color: #22c55e; font-weight: 600;">linear scalability</span> for both storage and throughput.

</div>

---

## Visual Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">SHARDED DATABASE ARCHITECTURE</div>

  <div style="display: flex; flex-direction: column; gap: 20px; align-items: center;">
    <!-- Application Layer -->
    <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 16px 32px; border: 2px solid #3b82f6; text-align: center;">
      <div style="color: #1e40af; font-weight: 600; font-size: 15px;">Application Layer</div>
      <div style="color: #3b82f6; font-size: 12px;">Query: SELECT * FROM users WHERE user_id = 12345</div>
    </div>

    <div style="color: #6366f1; font-size: 24px;">↓</div>

    <!-- Shard Router -->
    <div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 12px; padding: 20px 40px; border: 2px solid #a855f7; text-align: center;">
      <div style="color: #7c3aed; font-weight: 600; font-size: 15px;">Shard Router / Coordinator</div>
      <div style="color: #a855f7; font-size: 12px; margin-top: 4px;">hash(12345) % 4 = 1 → Route to Shard 1</div>
    </div>

    <div style="display: flex; gap: 8px; color: #6366f1; font-size: 18px;">
      <span>↙</span><span>↓</span><span>↓</span><span>↘</span>
    </div>

    <!-- Shards -->
    <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
      <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 10px; padding: 16px; min-width: 120px; text-align: center; border: 1px solid #cbd5e1;">
        <div style="color: #475569; font-weight: 600;">Shard 0</div>
        <div style="color: #64748b; font-size: 11px; margin-top: 4px;">Users 0-249K</div>
        <div style="color: #94a3b8; font-size: 10px;">Primary + 2 Replicas</div>
      </div>
      <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 10px; padding: 16px; min-width: 120px; text-align: center; border: 2px solid #22c55e;">
        <div style="color: #166534; font-weight: 700;">Shard 1</div>
        <div style="color: #22c55e; font-size: 11px; margin-top: 4px;">Users 250K-499K</div>
        <div style="color: #86efac; font-size: 10px;">← Query routed here</div>
      </div>
      <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 10px; padding: 16px; min-width: 120px; text-align: center; border: 1px solid #cbd5e1;">
        <div style="color: #475569; font-weight: 600;">Shard 2</div>
        <div style="color: #64748b; font-size: 11px; margin-top: 4px;">Users 500K-749K</div>
        <div style="color: #94a3b8; font-size: 10px;">Primary + 2 Replicas</div>
      </div>
      <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 10px; padding: 16px; min-width: 120px; text-align: center; border: 1px solid #cbd5e1;">
        <div style="color: #475569; font-weight: 600;">Shard 3</div>
        <div style="color: #64748b; font-size: 11px; margin-top: 4px;">Users 750K-1M</div>
        <div style="color: #94a3b8; font-size: 10px;">Primary + 2 Replicas</div>
      </div>
    </div>
  </div>

  <div style="margin-top: 20px; background: rgba(34, 197, 94, 0.15); border-radius: 8px; padding: 12px; text-align: center; border: 1px solid #86efac;">
    <span style="color: #166534;">Each shard operates independently - 4x write throughput, 4x storage capacity</span>
  </div>
</div>

---

## Horizontal vs Vertical Sharding

Understanding the difference between <span style="color: #22c55e; font-weight: 600;">horizontal sharding</span> (partitioning rows) and <span style="color: #22c55e; font-weight: 600;">vertical sharding</span> (partitioning columns) is fundamental to designing scalable database architectures.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">HORIZONTAL vs VERTICAL SHARDING</div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <!-- Horizontal Sharding -->
    <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 20px; border: 1px solid #93c5fd;">
      <div style="color: #1e40af; font-weight: 600; margin-bottom: 16px; text-align: center; font-size: 15px;">HORIZONTAL SHARDING</div>
      <div style="text-align: center; color: #64748b; font-size: 12px; margin-bottom: 12px;">Split by ROWS</div>

      <div style="background: white; border-radius: 8px; padding: 12px; margin-bottom: 8px; border: 1px solid #93c5fd;">
        <div style="font-size: 11px; color: #1e40af; font-weight: 600; margin-bottom: 4px;">Original Table</div>
        <div style="font-family: monospace; font-size: 10px; color: #475569;">
          | id | name | email | orders |
        </div>
      </div>

      <div style="text-align: center; color: #3b82f6; margin: 8px 0;">↓ Split by user_id ↓</div>

      <div style="display: flex; gap: 8px;">
        <div style="flex: 1; background: #eff6ff; border-radius: 6px; padding: 8px; text-align: center;">
          <div style="color: #1e40af; font-size: 10px; font-weight: 600;">Shard A</div>
          <div style="color: #3b82f6; font-size: 9px;">Users 1-1000</div>
          <div style="color: #64748b; font-size: 9px;">All columns</div>
        </div>
        <div style="flex: 1; background: #eff6ff; border-radius: 6px; padding: 8px; text-align: center;">
          <div style="color: #1e40af; font-size: 10px; font-weight: 600;">Shard B</div>
          <div style="color: #3b82f6; font-size: 9px;">Users 1001-2000</div>
          <div style="color: #64748b; font-size: 9px;">All columns</div>
        </div>
      </div>

      <div style="margin-top: 12px; font-size: 12px; color: #1e293b;">
        <div style="color: #16a34a;">✓ Scales writes linearly</div>
        <div style="color: #16a34a;">✓ Each row is complete</div>
        <div style="color: #dc2626;">✗ Cross-shard queries expensive</div>
      </div>
    </div>

    <!-- Vertical Sharding -->
    <div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 12px; padding: 20px; border: 1px solid #d8b4fe;">
      <div style="color: #7c3aed; font-weight: 600; margin-bottom: 16px; text-align: center; font-size: 15px;">VERTICAL SHARDING</div>
      <div style="text-align: center; color: #64748b; font-size: 12px; margin-bottom: 12px;">Split by COLUMNS</div>

      <div style="background: white; border-radius: 8px; padding: 12px; margin-bottom: 8px; border: 1px solid #d8b4fe;">
        <div style="font-size: 11px; color: #7c3aed; font-weight: 600; margin-bottom: 4px;">Original Table</div>
        <div style="font-family: monospace; font-size: 10px; color: #475569;">
          | id | name | email | blob_data |
        </div>
      </div>

      <div style="text-align: center; color: #a855f7; margin: 8px 0;">↓ Split by column type ↓</div>

      <div style="display: flex; gap: 8px;">
        <div style="flex: 1; background: #faf5ff; border-radius: 6px; padding: 8px; text-align: center;">
          <div style="color: #7c3aed; font-size: 10px; font-weight: 600;">Core DB</div>
          <div style="color: #a855f7; font-size: 9px;">id, name, email</div>
          <div style="color: #64748b; font-size: 9px;">Fast queries</div>
        </div>
        <div style="flex: 1; background: #faf5ff; border-radius: 6px; padding: 8px; text-align: center;">
          <div style="color: #7c3aed; font-size: 10px; font-weight: 600;">Blob Store</div>
          <div style="color: #a855f7; font-size: 9px;">id, blob_data</div>
          <div style="color: #64748b; font-size: 9px;">Heavy data</div>
        </div>
      </div>

      <div style="margin-top: 12px; font-size: 12px; color: #1e293b;">
        <div style="color: #16a34a;">✓ Separates hot/cold data</div>
        <div style="color: #16a34a;">✓ Different storage tiers</div>
        <div style="color: #dc2626;">✗ JOINs require network</div>
      </div>
    </div>
  </div>

  <div style="margin-top: 20px; background: rgba(99, 102, 241, 0.1); border-radius: 8px; padding: 12px; text-align: center;">
    <span style="color: #4f46e5; font-weight: 500;">In practice: Combine both! Vertically shard by domain, then horizontally shard hot tables.</span>
  </div>
</div>

### When to Use Each

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

  **Horizontal Sharding (Most Common)**:
  - When you have billions of rows in a single table
  - When write throughput exceeds single-machine capacity
  - When data naturally partitions by a key (user_id, tenant_id)
  - Examples: User data, transactions, social media posts

  **Vertical Sharding (Functional Partitioning)**:
  - When tables have very different access patterns
  - When some columns are accessed rarely but are large (BLOBs)
  - When you want to separate domains for microservices
  - Examples: User profiles vs user preferences, orders vs order_items

</div>

---

## Why This Matters: Real Company Examples

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
  <div style="display: grid; gap: 16px;">
    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 8px; padding: 16px; border-left: 4px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 600;">Instagram - User Data Sharding</div>
      <div style="color: #78350f; font-size: 14px; margin-top: 8px;">With 2+ billion users, Instagram shards by <span style="color: #22c55e; font-weight: 600;">user_id</span> across thousands of PostgreSQL instances. Each shard holds ~500K users. When you view a profile, the app calculates which shard to query: <code>shard_id = user_id % num_shards</code>. This enables independent scaling of the user graph.</div>
    </div>
    <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 8px; padding: 16px; border-left: 4px solid #3b82f6;">
      <div style="color: #1e40af; font-weight: 600;">Discord - Guild-Based Sharding</div>
      <div style="color: #1e3a8a; font-size: 14px; margin-top: 8px;">Discord shards messages by <span style="color: #22c55e; font-weight: 600;">guild_id</span> (server). This is brilliant because messages within a Discord server are always on the same shard - no cross-shard queries for conversation history. With 150M+ monthly users, each shard handles 10K-50K guilds independently.</div>
    </div>
    <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 8px; padding: 16px; border-left: 4px solid #22c55e;">
      <div style="color: #166534; font-weight: 600;">Uber - Geographic Sharding</div>
      <div style="color: #14532d; font-size: 14px; margin-top: 8px;">Uber shards trip data by <span style="color: #22c55e; font-weight: 600;">geographic region</span>. NYC trips hit different shards than San Francisco trips. This provides data locality (reduced latency) and failure isolation (NYC outage doesn't affect SF). They use a two-level sharding: city-level, then hash-based within city.</div>
    </div>
    <div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 8px; padding: 16px; border-left: 4px solid #a855f7;">
      <div style="color: #6b21a8; font-weight: 600;">Slack - Workspace Sharding</div>
      <div style="color: #581c87; font-size: 14px; margin-top: 8px;">Slack shards by <span style="color: #22c55e; font-weight: 600;">workspace_id</span>. Each company's Slack workspace lives on dedicated shards, providing data isolation (important for enterprise compliance), predictable performance, and simplified billing/quota management per tenant.</div>
    </div>
  </div>
</div>

---

## Shard Key Selection

The <span style="color: #22c55e; font-weight: 600;">shard key</span> is the most critical decision in sharding. It determines how data is distributed and directly impacts query performance, data distribution, and operational complexity.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">SHARD KEY SELECTION CRITERIA</div>

  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
    <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 10px; padding: 16px; border: 1px solid #86efac;">
      <div style="color: #166534; font-weight: 600; margin-bottom: 8px;">1. High Cardinality</div>
      <div style="color: #15803d; font-size: 13px;">Many unique values enable even distribution. user_id (millions) is good; country (200) is bad.</div>
    </div>
    <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 10px; padding: 16px; border: 1px solid #86efac;">
      <div style="color: #166534; font-weight: 600; margin-bottom: 8px;">2. Even Distribution</div>
      <div style="color: #15803d; font-size: 13px;">Values should spread uniformly. Random UUIDs good; sequential IDs cause hotspots on newest shard.</div>
    </div>
    <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 10px; padding: 16px; border: 1px solid #86efac;">
      <div style="color: #166534; font-weight: 600; margin-bottom: 8px;">3. Query Alignment</div>
      <div style="color: #15803d; font-size: 13px;">Matches access patterns. If 90% of queries filter by user_id, shard by user_id.</div>
    </div>
    <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 10px; padding: 16px; border: 1px solid #86efac;">
      <div style="color: #166534; font-weight: 600; margin-bottom: 8px;">4. Immutability</div>
      <div style="color: #15803d; font-size: 13px;">Value never changes. user_id is stable; email changes require data migration.</div>
    </div>
  </div>
</div>

### Good vs Bad Shard Keys

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">SHARD KEY DISTRIBUTION IMPACT</div>

  <!-- Good: user_id -->
  <div style="margin-bottom: 24px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <span style="background: #22c55e; color: white; padding: 4px 12px; border-radius: 6px; font-weight: 600; font-size: 13px;">GOOD</span>
      <span style="color: #166534; font-weight: 600;">user_id - High Cardinality, Uniform Distribution</span>
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 80px; height: 50px; background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center;">
        <span style="color: #166534; font-size: 12px; font-weight: 500;">25%</span>
      </div>
      <div style="flex: 1; min-width: 80px; height: 50px; background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center;">
        <span style="color: #166534; font-size: 12px; font-weight: 500;">25%</span>
      </div>
      <div style="flex: 1; min-width: 80px; height: 50px; background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center;">
        <span style="color: #166534; font-size: 12px; font-weight: 500;">25%</span>
      </div>
      <div style="flex: 1; min-width: 80px; height: 50px; background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center;">
        <span style="color: #166534; font-size: 12px; font-weight: 500;">25%</span>
      </div>
    </div>
    <div style="text-align: center; color: #16a34a; font-size: 12px; margin-top: 8px;">Perfectly balanced - each shard gets equal load</div>
  </div>

  <!-- Bad: country -->
  <div style="margin-bottom: 24px;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <span style="background: #ef4444; color: white; padding: 4px 12px; border-radius: 6px; font-weight: 600; font-size: 13px;">BAD</span>
      <span style="color: #991b1b; font-weight: 600;">country - Low Cardinality, Skewed Distribution</span>
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <div style="flex: 6; min-width: 200px; height: 50px; background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center; border: 2px solid #ef4444;">
        <span style="color: #991b1b; font-size: 12px; font-weight: 600;">US - 60% (HOTSPOT!)</span>
      </div>
      <div style="flex: 1; min-width: 50px; height: 50px; background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center;">
        <span style="color: #64748b; font-size: 10px;">UK</span>
      </div>
      <div style="flex: 1; min-width: 40px; height: 50px; background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center;">
        <span style="color: #64748b; font-size: 10px;">DE</span>
      </div>
      <div style="flex: 1; min-width: 40px; height: 50px; background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 6px;"></div>
    </div>
    <div style="text-align: center; color: #dc2626; font-size: 12px; margin-top: 8px;">Hotspot! US shard is overloaded while others are idle</div>
  </div>

  <!-- Bad: created_at -->
  <div>
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <span style="background: #ef4444; color: white; padding: 4px 12px; border-radius: 6px; font-weight: 600; font-size: 13px;">BAD</span>
      <span style="color: #991b1b; font-weight: 600;">created_at - Temporal Hotspot</span>
    </div>
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 60px; height: 50px; background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center;">
        <span style="color: #64748b; font-size: 10px;">2022</span>
      </div>
      <div style="flex: 1; min-width: 60px; height: 50px; background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center;">
        <span style="color: #64748b; font-size: 10px;">2023</span>
      </div>
      <div style="flex: 1; min-width: 60px; height: 50px; background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center;">
        <span style="color: #64748b; font-size: 10px;">2024</span>
      </div>
      <div style="flex: 1; min-width: 100px; height: 50px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 6px; display: flex; align-items: center; justify-content: center; border: 2px solid #f59e0b;">
        <span style="color: #92400e; font-size: 10px; font-weight: 600;">2025 (ALL writes!)</span>
      </div>
    </div>
    <div style="text-align: center; color: #d97706; font-size: 12px; margin-top: 8px;">All new data hits the latest shard - write bottleneck</div>
  </div>
</div>

### Compound Shard Keys

For complex access patterns, use <span style="color: #22c55e; font-weight: 600;">compound shard keys</span> that combine multiple fields:

```python
def compute_compound_shard_key(tenant_id: str, user_id: str) -> str:
    """
    Compound shard key for multi-tenant SaaS.

    This enables:
    - All data for a tenant to be on same shard (tenant queries)
    - Even distribution within tenant (user queries)
    """
    # First level: tenant determines shard cluster
    tenant_shard = hash(tenant_id) % NUM_SHARD_CLUSTERS

    # Second level: user determines shard within cluster
    user_shard = hash(user_id) % SHARDS_PER_CLUSTER

    return f"cluster_{tenant_shard}_shard_{user_shard}"

# Example: Slack's approach
# Workspace ID determines shard cluster (data isolation)
# User ID determines partition within cluster (performance)
```

---

## Sharding Strategies Deep Dive

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">SHARDING STRATEGIES COMPARISON</div>

  <div style="overflow-x: auto;">
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <thead>
        <tr style="border-bottom: 2px solid #cbd5e1;">
          <th style="padding: 12px; text-align: left; color: #1e40af;">Strategy</th>
          <th style="padding: 12px; text-align: center; color: #1e40af;">Distribution</th>
          <th style="padding: 12px; text-align: center; color: #1e40af;">Range Queries</th>
          <th style="padding: 12px; text-align: center; color: #1e40af;">Resharding</th>
          <th style="padding: 12px; text-align: center; color: #1e40af;">Complexity</th>
          <th style="padding: 12px; text-align: left; color: #1e40af;">Best For</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #e2e8f0; background: #fefce8;">
          <td style="padding: 12px; color: #1e293b; font-weight: 600;">Range-Based</td>
          <td style="padding: 12px; text-align: center;"><span style="color: #d97706; font-weight: 500;">Uneven</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #16a34a; font-weight: 500;">Excellent</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #d97706; font-weight: 500;">Medium</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #16a34a; font-weight: 500;">Low</span></td>
          <td style="padding: 12px; color: #64748b;">Time-series, logs, analytics</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px; color: #1e293b; font-weight: 600;">Hash-Based</td>
          <td style="padding: 12px; text-align: center;"><span style="color: #16a34a; font-weight: 500;">Even</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #dc2626; font-weight: 500;">Poor</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #dc2626; font-weight: 500;">Hard</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #16a34a; font-weight: 500;">Low</span></td>
          <td style="padding: 12px; color: #64748b;">User data, key-value stores</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0; background: #f0fdf4;">
          <td style="padding: 12px; color: #1e293b; font-weight: 600;">Consistent Hash</td>
          <td style="padding: 12px; text-align: center;"><span style="color: #16a34a; font-weight: 500;">Even</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #dc2626; font-weight: 500;">Poor</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #16a34a; font-weight: 500;">Easy</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #d97706; font-weight: 500;">Medium</span></td>
          <td style="padding: 12px; color: #64748b;">Dynamic scaling, caches</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px; color: #1e293b; font-weight: 600;">Directory-Based</td>
          <td style="padding: 12px; text-align: center;"><span style="color: #3b82f6; font-weight: 500;">Flexible</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #16a34a; font-weight: 500;">Good</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #16a34a; font-weight: 500;">Easy</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #dc2626; font-weight: 500;">High</span></td>
          <td style="padding: 12px; color: #64748b;">Custom routing, multi-tenant</td>
        </tr>
        <tr>
          <td style="padding: 12px; color: #1e293b; font-weight: 600;">Geo-Based</td>
          <td style="padding: 12px; text-align: center;"><span style="color: #d97706; font-weight: 500;">Varies</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #16a34a; font-weight: 500;">Regional</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #d97706; font-weight: 500;">Medium</span></td>
          <td style="padding: 12px; text-align: center;"><span style="color: #d97706; font-weight: 500;">Medium</span></td>
          <td style="padding: 12px; color: #64748b;">Global apps, CDN-like</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### 1. Range-Based Sharding

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 16px; font-weight: 600; margin-bottom: 20px;">RANGE-BASED SHARDING FLOW</div>

  <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
    <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 10px; padding: 14px 28px; border: 1px solid #93c5fd;">
      <span style="color: #1e40af; font-weight: 600; font-family: monospace;">Query: user_id = 1,500,000</span>
    </div>

    <div style="color: #6366f1; font-size: 20px;">↓</div>

    <div style="background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; width: 100%; max-width: 400px;">
      <div style="color: #1e40af; font-weight: 600; font-size: 14px; margin-bottom: 12px; text-align: center;">Range Lookup Table</div>
      <div style="font-family: monospace; font-size: 13px;">
        <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f1f5f9;">
          <span style="color: #64748b;">0 - 999,999</span>
          <span style="color: #1e293b;">→ Shard 1</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f1f5f9; background: #f0fdf4;">
          <span style="color: #166534; font-weight: 600;">1,000,000 - 1,999,999</span>
          <span style="color: #16a34a; font-weight: 600;">→ Shard 2 ✓</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f1f5f9;">
          <span style="color: #64748b;">2,000,000 - 2,999,999</span>
          <span style="color: #1e293b;">→ Shard 3</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 6px 0;">
          <span style="color: #64748b;">3,000,000+</span>
          <span style="color: #1e293b;">→ Shard 4</span>
        </div>
      </div>
    </div>

    <div style="color: #6366f1; font-size: 20px;">↓</div>

    <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 10px; padding: 14px 28px; border: 2px solid #22c55e;">
      <span style="color: #166534; font-weight: 600;">Execute on Shard 2</span>
    </div>
  </div>

  <div style="margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
    <div style="background: rgba(34, 197, 94, 0.15); border-radius: 8px; padding: 12px; border: 1px solid #86efac;">
      <div style="color: #166534; font-weight: 600; font-size: 13px; margin-bottom: 4px;">Advantages</div>
      <div style="color: #15803d; font-size: 12px;">Range queries are efficient (e.g., all orders from last week)</div>
    </div>
    <div style="background: rgba(234, 179, 8, 0.15); border-radius: 8px; padding: 12px; border: 1px solid #fcd34d;">
      <div style="color: #92400e; font-weight: 600; font-size: 13px; margin-bottom: 4px;">Watch Out</div>
      <div style="color: #a16207; font-size: 12px;">Sequential keys create hotspots on the "newest" shard</div>
    </div>
  </div>
</div>

### 2. Hash-Based Sharding

```python
import hashlib

def get_shard_by_hash(key: str, num_shards: int) -> int:
    """
    Simple hash-based sharding.

    Pros: Even distribution regardless of key patterns
    Cons: Adding shards requires moving ~100% of data
    """
    hash_value = int(hashlib.sha256(str(key).encode()).hexdigest(), 16)
    return hash_value % num_shards

# The problem with simple hashing:
# With 4 shards: hash("user_123") % 4 = 2
# With 5 shards: hash("user_123") % 5 = 3  <- Different shard!
# Adding one shard moves ~80% of data (N-1/N)
```

### 3. Consistent Hashing (Recommended)

<span style="color: #22c55e; font-weight: 600;">Consistent hashing</span> is the industry standard for dynamic sharding because it minimizes data movement when adding or removing shards.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">CONSISTENT HASHING RING</div>

  <div style="text-align: center; color: #64748b; font-size: 13px; margin-bottom: 20px;">
    Both keys and nodes hash to positions on a ring (0 to 2^32). Keys belong to the first node clockwise from their position.
  </div>

  <div style="background: white; border-radius: 12px; padding: 24px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
    <div style="display: flex; justify-content: space-around; align-items: center; flex-wrap: wrap; gap: 12px;">
      <div style="text-align: center;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 3px solid #3b82f6; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
          <span style="color: #1e40af; font-weight: 600; font-size: 14px;">A</span>
        </div>
        <div style="color: #64748b; font-size: 11px; margin-top: 4px;">Position: 0°</div>
      </div>
      <div style="color: #94a3b8; font-size: 12px;">→</div>
      <div style="text-align: center;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border: 3px solid #22c55e; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
          <span style="color: #166534; font-weight: 600; font-size: 14px;">B</span>
        </div>
        <div style="color: #64748b; font-size: 11px; margin-top: 4px;">Position: 90°</div>
      </div>
      <div style="color: #94a3b8; font-size: 12px;">→</div>
      <div style="text-align: center;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border: 3px solid #a855f7; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
          <span style="color: #7c3aed; font-weight: 600; font-size: 14px;">C</span>
        </div>
        <div style="color: #64748b; font-size: 11px; margin-top: 4px;">Position: 180°</div>
      </div>
      <div style="color: #94a3b8; font-size: 12px;">→</div>
      <div style="text-align: center;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 3px solid #f59e0b; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
          <span style="color: #92400e; font-weight: 600; font-size: 14px;">D</span>
        </div>
        <div style="color: #64748b; font-size: 11px; margin-top: 4px;">Position: 270°</div>
      </div>
      <div style="color: #94a3b8; font-size: 12px;">→ (back to A)</div>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 10px; padding: 16px; margin-bottom: 16px; border: 1px solid #93c5fd;">
    <div style="color: #1e40af; font-weight: 600; margin-bottom: 8px;">Key Lookup Example</div>
    <div style="color: #1e293b; font-size: 13px; font-family: monospace;">
      key "user_123" hashes to position <span style="color: #d97706; font-weight: 600;">45°</span><br>
        Walk clockwise → first node is <span style="color: #16a34a; font-weight: 600;">B (at 90°)</span><br>
          → Route to Node B
        </div>
      </div>

      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 10px; padding: 16px; border: 1px solid #fcd34d;">
        <div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Adding Node E at 67°</div>
        <div style="color: #1e293b; font-size: 13px;">
          <div><strong>Before:</strong> Keys 0°-90° → Node B</div>
          <div style="margin-top: 4px;"><strong>After:</strong> Keys 0°-67° → <span style="color: #16a34a; font-weight: 600;">Node E (new)</span>, Keys 67°-90° → Node B</div>
          <div style="margin-top: 8px; color: #d97706; font-weight: 500;">Only ~1/N of keys move (not all!)</div>
        </div>
      </div>
    </div>

    ```python
    import hashlib
    from bisect import bisect_right
    from typing import Optional, List

    class ConsistentHashRing:
    """
    Consistent hashing implementation with virtual nodes.

    Virtual nodes improve distribution by placing multiple points
    per physical node on the ring.
    """

    def __init__(self, nodes: List[str] = None, virtual_nodes: int = 150):
    self.virtual_nodes = virtual_nodes
    self.ring: List[int] = []  # Sorted hash positions
    self.hash_to_node: dict[int, str] = {}

    for node in (nodes or []):
    self.add_node(node)

    def _hash(self, key: str) -> int:
    """Hash a key to a position on the ring (0 to 2^32)."""
    return int(hashlib.sha256(key.encode()).hexdigest(), 16) % (2**32)

    def add_node(self, node: str) -> None:
    """Add a node with virtual nodes for better distribution."""
    for i in range(self.virtual_nodes):
    virtual_key = f"{node}:vn{i}"
    hash_val = self._hash(virtual_key)
    self.ring.append(hash_val)
    self.hash_to_node[hash_val] = node
    self.ring.sort()

    def remove_node(self, node: str) -> None:
    """Remove node - only its keys redistribute to next node."""
    for i in range(self.virtual_nodes):
    virtual_key = f"{node}:vn{i}"
    hash_val = self._hash(virtual_key)
    self.ring.remove(hash_val)
    del self.hash_to_node[hash_val]

    def get_node(self, key: str) -> Optional[str]:
    """Find the node responsible for this key."""
    if not self.ring:
    return None

    hash_val = self._hash(key)
    idx = bisect_right(self.ring, hash_val)

    # Wrap around if past the end of the ring
    if idx == len(self.ring):
    idx = 0

    return self.hash_to_node[self.ring[idx]]

    def get_nodes_for_key(self, key: str, replicas: int = 3) -> List[str]:
    """Get multiple nodes for replication (walk clockwise)."""
    if not self.ring or replicas <= 0:
    return []

    hash_val = self._hash(key)
    idx = bisect_right(self.ring, hash_val)

    nodes = []
    seen = set()

    while len(nodes) < replicas and len(seen) < len(self.hash_to_node):
    if idx >= len(self.ring):
    idx = 0

    node = self.hash_to_node[self.ring[idx]]
    if node not in seen:
    nodes.append(node)
    seen.add(node)
    idx += 1

    return nodes


    # Usage
    ring = ConsistentHashRing(["shard1", "shard2", "shard3", "shard4"])

    # Route a key
    shard = ring.get_node("user:12345")  # -> "shard2"

    # Add new shard - only ~25% of keys move
    ring.add_node("shard5")

    # Get replication targets
    replicas = ring.get_nodes_for_key("user:12345", replicas=3)  # -> ["shard2", "shard3", "shard4"]
    ```

    ---

    ## Cross-Shard Queries

    Cross-shard queries are one of the biggest challenges in sharded databases. When a query cannot be routed to a single shard, you need <span style="color: #22c55e; font-weight: 600;">scatter-gather</span> or other strategies.

    <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
      <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">SCATTER-GATHER PATTERN</div>

      <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
        <!-- Query -->
        <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 10px; padding: 14px 24px; border: 1px solid #fca5a5;">
          <span style="color: #991b1b; font-weight: 600; font-size: 13px;">Query without shard key:</span>
          <span style="color: #7f1d1d; font-family: monospace; font-size: 12px;"> SELECT * FROM orders WHERE total > 1000</span>
        </div>

        <!-- Coordinator -->
        <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 16px 32px; border: 2px solid #3b82f6; text-align: center;">
          <div style="color: #1e40af; font-weight: 600;">Coordinator</div>
          <div style="color: #3b82f6; font-size: 12px;">Manages query distribution</div>
        </div>

        <!-- Scatter -->
        <div style="color: #3b82f6; font-weight: 600; font-size: 13px;">1. SCATTER (parallel fan-out)</div>
        <div style="display: flex; gap: 8px; color: #3b82f6; font-size: 18px;">
          <span>↙</span><span>↓</span><span>↓</span><span>↘</span>
        </div>

        <!-- Shards executing -->
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 8px; padding: 12px; min-width: 100px; text-align: center; border: 1px solid #86efac;">
            <div style="color: #166534; font-weight: 600; font-size: 13px;">Shard 1</div>
            <div style="color: #22c55e; font-size: 11px;">47 rows found</div>
            <div style="color: #86efac; font-size: 10px;">23ms</div>
          </div>
          <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 8px; padding: 12px; min-width: 100px; text-align: center; border: 1px solid #86efac;">
            <div style="color: #166534; font-weight: 600; font-size: 13px;">Shard 2</div>
            <div style="color: #22c55e; font-size: 11px;">31 rows found</div>
            <div style="color: #86efac; font-size: 10px;">18ms</div>
          </div>
          <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 8px; padding: 12px; min-width: 100px; text-align: center; border: 1px solid #86efac;">
            <div style="color: #166534; font-weight: 600; font-size: 13px;">Shard 3</div>
            <div style="color: #22c55e; font-size: 11px;">52 rows found</div>
            <div style="color: #86efac; font-size: 10px;">31ms</div>
          </div>
          <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 8px; padding: 12px; min-width: 100px; text-align: center; border: 1px solid #86efac;">
            <div style="color: #166534; font-weight: 600; font-size: 13px;">Shard 4</div>
            <div style="color: #22c55e; font-size: 11px;">19 rows found</div>
            <div style="color: #86efac; font-size: 10px;">15ms</div>
          </div>
        </div>

        <!-- Gather -->
        <div style="display: flex; gap: 8px; color: #7c3aed; font-size: 18px;">
          <span>↘</span><span>↓</span><span>↓</span><span>↙</span>
        </div>
        <div style="color: #7c3aed; font-weight: 600; font-size: 13px;">2. GATHER (merge results)</div>

        <!-- Result -->
        <div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 12px; padding: 16px 32px; border: 2px solid #a855f7; text-align: center;">
          <div style="color: #7c3aed; font-weight: 600;">149 rows merged</div>
          <div style="color: #a855f7; font-size: 12px;">Total latency: 31ms (slowest shard) + 5ms (merge)</div>
        </div>
      </div>

      <div style="margin-top: 20px; background: rgba(234, 179, 8, 0.15); border-radius: 8px; padding: 12px; text-align: center; border: 1px solid #fcd34d;">
        <span style="color: #92400e; font-weight: 500;">Performance Note:</span>
        <span style="color: #78350f;"> Latency = max(shard latencies) + merge time. The slowest shard determines response time.</span>
      </div>
    </div>

    ### Cross-Shard Query Strategies

    <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

      **1. Scatter-Gather** (shown above)
      - Query all shards in parallel, merge results
      - Use for: Analytics, search, aggregations
      - Cost: N network calls, slowest shard dominates latency

      **2. Global Secondary Index**
      - Maintain a separate index mapping query fields to shard locations
      - Use for: Frequent lookups by non-shard-key fields
      - Cost: Index maintenance overhead, storage

      **3. Reference Tables**
      - Replicate small lookup tables (countries, categories) to all shards
      - Use for: JOINs with static reference data
      - Cost: Storage duplication, sync complexity

      **4. Denormalization**
      - Store related data together on the same shard
      - Use for: Frequently joined data
      - Cost: Data duplication, update complexity

      **5. Application-Level Joins**
      - Query each shard separately, join in application code
      - Use for: Complex joins that can't be avoided
      - Cost: Application complexity, memory usage

    </div>

    ```python
    from concurrent.futures import ThreadPoolExecutor, as_completed
    from typing import List, Dict, Any

    class CrossShardQueryExecutor:
    """Execute queries across multiple shards with scatter-gather."""

    def __init__(self, shard_connections: Dict[str, Any]):
    self.shards = shard_connections
    self.executor = ThreadPoolExecutor(max_workers=len(shard_connections))

    def scatter_gather(
    self,
    query: str,
    params: tuple = (),
    merge_func = None,
    timeout: float = 30.0
    ) -> List[Dict]:
    """
    Execute query on all shards and merge results.

    Args:
    query: SQL query to execute
    params: Query parameters
    merge_func: Optional function to merge/aggregate results
    timeout: Maximum time to wait for all shards

    Returns:
    Merged results from all shards
    """
    futures = {}

    # Scatter: submit query to all shards
    for shard_name, connection in self.shards.items():
    future = self.executor.submit(
    self._execute_on_shard,
    connection,
    query,
    params
    )
    futures[future] = shard_name

    # Gather: collect results
    results = []
    errors = []

    for future in as_completed(futures, timeout=timeout):
    shard_name = futures[future]
    try:
    shard_results = future.result()
    results.extend(shard_results)
    except Exception as e:
    errors.append((shard_name, str(e)))

    if errors:
    # Decide: fail fast or return partial results
    print(f"Shard errors: {errors}")

    # Apply merge function if provided (sorting, aggregation, etc.)
    if merge_func:
    return merge_func(results)

    return results

    def _execute_on_shard(self, connection, query: str, params: tuple) -> List[Dict]:
    """Execute query on a single shard."""
    cursor = connection.cursor()
    cursor.execute(query, params)
    columns = [desc[0] for desc in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]

    def aggregate_count(self, table: str, where_clause: str = "") -> int:
    """Aggregate COUNT across all shards."""
    query = f"SELECT COUNT(*) as cnt FROM {table}"
    if where_clause:
    query += f" WHERE {where_clause}"

    results = self.scatter_gather(query)
    return sum(r['cnt'] for r in results)

    def aggregate_sum(self, table: str, column: str, where_clause: str = "") -> float:
    """Aggregate SUM across all shards."""
    query = f"SELECT SUM({column}) as total FROM {table}"
    if where_clause:
    query += f" WHERE {where_clause}"

    results = self.scatter_gather(query)
    return sum(r['total'] or 0 for r in results)


    # Usage
    executor = CrossShardQueryExecutor(shard_connections)

    # Simple scatter-gather
    all_large_orders = executor.scatter_gather(
    "SELECT * FROM orders WHERE total > %s ORDER BY created_at DESC LIMIT 100",
    params=(1000,),
    merge_func=lambda results: sorted(results, key=lambda x: x['created_at'], reverse=True)[:100]
    )

    # Aggregations
    total_revenue = executor.aggregate_sum("orders", "total", "status = 'completed'")
    order_count = executor.aggregate_count("orders", "created_at > '2024-01-01'")
    ```

    ---

    ## Resharding Strategies

    <span style="color: #22c55e; font-weight: 600;">Resharding</span> is the process of redistributing data when adding or removing shards. It's one of the most complex operations in a sharded database.

    <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
      <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">ONLINE RESHARDING PROCESS</div>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        <!-- Step 1 -->
        <div style="display: flex; align-items: flex-start; gap: 16px;">
          <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">1</div>
          <div style="flex: 1; background: #eff6ff; border-radius: 8px; padding: 16px;">
            <div style="color: #1e40af; font-weight: 600;">Add Empty Shards</div>
            <div style="color: #3730a3; font-size: 13px; margin-top: 4px;">Deploy new shard infrastructure with empty databases. Update shard metadata but don't route traffic yet.</div>
          </div>
        </div>

        <!-- Step 2 -->
        <div style="display: flex; align-items: flex-start; gap: 16px;">
          <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">2</div>
          <div style="flex: 1; background: #eff6ff; border-radius: 8px; padding: 16px;">
            <div style="color: #1e40af; font-weight: 600;">Enable Double-Writes</div>
            <div style="color: #3730a3; font-size: 13px; margin-top: 4px;">For keys that will move, write to both old and new shard locations. This ensures new writes are captured during migration.</div>
          </div>
        </div>

        <!-- Step 3 -->
        <div style="display: flex; align-items: flex-start; gap: 16px;">
          <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">3</div>
          <div style="flex: 1; background: #eff6ff; border-radius: 8px; padding: 16px;">
            <div style="color: #1e40af; font-weight: 600;">Backfill Historical Data</div>
            <div style="color: #3730a3; font-size: 13px; margin-top: 4px;">Copy existing data from old shards to new shards in the background. Use checkpoints to track progress and enable resume on failure.</div>
          </div>
        </div>

        <!-- Step 4 -->
        <div style="display: flex; align-items: flex-start; gap: 16px;">
          <div style="background: #3b82f6; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">4</div>
          <div style="flex: 1; background: #eff6ff; border-radius: 8px; padding: 16px;">
            <div style="color: #1e40af; font-weight: 600;">Verify Data Consistency</div>
            <div style="color: #3730a3; font-size: 13px; margin-top: 4px;">Compare checksums between old and new locations. Run reconciliation jobs to find and fix discrepancies.</div>
          </div>
        </div>

        <!-- Step 5 -->
        <div style="display: flex; align-items: flex-start; gap: 16px;">
          <div style="background: #22c55e; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">5</div>
          <div style="flex: 1; background: #ecfdf5; border-radius: 8px; padding: 16px;">
            <div style="color: #166534; font-weight: 600;">Switch Read Traffic</div>
            <div style="color: #15803d; font-size: 13px; margin-top: 4px;">Update routing to read from new shard locations. This can be done gradually with percentage-based rollout.</div>
          </div>
        </div>

        <!-- Step 6 -->
        <div style="display: flex; align-items: flex-start; gap: 16px;">
          <div style="background: #22c55e; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; flex-shrink: 0;">6</div>
          <div style="flex: 1; background: #ecfdf5; border-radius: 8px; padding: 16px;">
            <div style="color: #166534; font-weight: 600;">Disable Double-Writes & Cleanup</div>
            <div style="color: #15803d; font-size: 13px; margin-top: 4px;">Stop writing to old locations. After a safety period, delete migrated data from old shards.</div>
          </div>
        </div>
      </div>
    </div>

    ### Resharding Without Downtime

    ```python
    from enum import Enum
    from typing import Dict, List, Optional
    import threading
    import time

    class MigrationState(Enum):
    NOT_STARTED = "not_started"
    DOUBLE_WRITE = "double_write"
    BACKFILLING = "backfilling"
    VERIFYING = "verifying"
    SWITCHING = "switching"
    COMPLETED = "completed"

    class OnlineReshardingManager:
    """
    Manages online resharding with zero downtime.

    Key principles:
    1. Never stop serving traffic
    2. Double-write during migration
    3. Verify before switching
    4. Support rollback at any stage
    """

    def __init__(self, old_router, new_router, db_connections):
    self.old_router = old_router
    self.new_router = new_router
    self.connections = db_connections
    self.migration_state: Dict[str, MigrationState] = {}
    self.state_lock = threading.Lock()

    def start_migration(self, key_ranges: List[tuple]) -> None:
    """Start migration for specified key ranges."""
    for start_key, end_key in key_ranges:
    range_id = f"{start_key}:{end_key}"

    with self.state_lock:
    self.migration_state[range_id] = MigrationState.DOUBLE_WRITE

    # Start background backfill
    threading.Thread(
    target=self._backfill_range,
    args=(start_key, end_key)
    ).start()

    def route_write(self, key: str, data: dict) -> None:
    """Route write operation, respecting migration state."""
    range_id = self._get_range_for_key(key)
    state = self.migration_state.get(range_id, MigrationState.COMPLETED)

    if state in (MigrationState.DOUBLE_WRITE, MigrationState.BACKFILLING,
    MigrationState.VERIFYING):
    # Write to BOTH old and new locations
    old_shard = self.old_router.get_shard(key)
    new_shard = self.new_router.get_shard(key)

    self._write_to_shard(old_shard, key, data)
    self._write_to_shard(new_shard, key, data)

    elif state == MigrationState.SWITCHING:
    # Write only to new location
    new_shard = self.new_router.get_shard(key)
    self._write_to_shard(new_shard, key, data)

    else:
    # Normal operation: use appropriate router
    shard = self.new_router.get_shard(key)
    self._write_to_shard(shard, key, data)

    def route_read(self, key: str) -> dict:
    """Route read operation, respecting migration state."""
    range_id = self._get_range_for_key(key)
    state = self.migration_state.get(range_id, MigrationState.COMPLETED)

    if state in (MigrationState.DOUBLE_WRITE, MigrationState.BACKFILLING):
    # Read from old location (source of truth during migration)
    old_shard = self.old_router.get_shard(key)
    return self._read_from_shard(old_shard, key)

    else:
    # Read from new location
    new_shard = self.new_router.get_shard(key)
    return self._read_from_shard(new_shard, key)

    def _backfill_range(self, start_key: str, end_key: str) -> None:
    """Backfill data from old shards to new shards."""
    range_id = f"{start_key}:{end_key}"

    with self.state_lock:
    self.migration_state[range_id] = MigrationState.BACKFILLING

    # Scan old shards and copy data
    # Use batching and checkpointing for large datasets
    batch_size = 1000
    last_key = start_key

    while last_key < end_key:
    batch = self._scan_range(last_key, end_key, batch_size)

    for record in batch:
    new_shard = self.new_router.get_shard(record['key'])
    self._write_to_shard(new_shard, record['key'], record['data'])
    last_key = record['key']

    # Checkpoint progress
    self._save_checkpoint(range_id, last_key)

    if len(batch) < batch_size:
    break

    # Verify consistency
    with self.state_lock:
    self.migration_state[range_id] = MigrationState.VERIFYING

    if self._verify_range(start_key, end_key):
    with self.state_lock:
    self.migration_state[range_id] = MigrationState.SWITCHING

    # Wait for in-flight requests
    time.sleep(5)

    with self.state_lock:
    self.migration_state[range_id] = MigrationState.COMPLETED

    def _verify_range(self, start_key: str, end_key: str) -> bool:
    """Verify data consistency between old and new shards."""
    # Compare checksums, row counts, sample records
    old_checksum = self._compute_checksum(self.old_router, start_key, end_key)
    new_checksum = self._compute_checksum(self.new_router, start_key, end_key)
    return old_checksum == new_checksum
    ```

    ---

    ## Real-Life Failure Story

    ### The Notion Sharding Incident (2021)

    <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #cbd5e1;">
      <h4 style="color: #1e293b; margin-top: 0;">What Happened</h4>

      <div style="background: #fef2f2; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
        <div style="color: #991b1b; font-weight: 600;">The Incident</div>
        <div style="color: #7f1d1d; font-size: 14px; margin-top: 8px;">
          Notion experienced a major outage when a shard containing popular templates became overloaded. The shard received 100x normal traffic when a viral template was shared widely. The imbalanced load caused cascading failures as the hot shard couldn't keep up.
        </div>
      </div>

      <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
        <div style="color: #1e293b; font-weight: 600;">Root Cause</div>
        <div style="color: #475569; font-size: 14px; margin-top: 8px;">
          <div style="padding: 4px 0;">1. Sharding by workspace_id meant viral content created hotspots</div>
          <div style="padding: 4px 0;">2. No automatic shard splitting for hot shards</div>
          <div style="padding: 4px 0;">3. Connection pools exhausted on the hot shard</div>
          <div style="padding: 4px 0;">4. No caching layer for read-heavy template access</div>
        </div>
      </div>

      <div style="background: #ecfdf5; border-radius: 8px; padding: 16px;">
        <div style="color: #065f46; font-weight: 600;">How They Fixed It</div>
        <div style="color: #047857; font-size: 14px; margin-top: 8px;">
          <div>1. Implemented automatic hotspot detection and shard splitting</div>
          <div>2. Added a CDN cache for public/shared content</div>
          <div>3. Created separate "public content" shards for viral items</div>
          <div>4. Implemented [[rate-limiting]](/topic/system-design/rate-limiting) per workspace</div>
          <div>5. Added [[circuit-breaker]](/topic/design-patterns/circuit-breaker) patterns to prevent cascade</div>
        </div>
      </div>
    </div>

    ---

    ## Interview Questions - 3-Level Deep Dive

    <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #cbd5e1;">

      ### Q1: How do you choose a shard key for a social media application?

      <div style="background: #eff6ff; border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 4px solid #3b82f6;">

        **Level 1 Answer (Junior):**
        Choose user_id as the shard key because it has high cardinality and most queries are user-centric. Each user's data lives on one shard, making user profile and feed queries efficient.

      </div>

      <div style="background: #f0fdf4; border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 4px solid #22c55e;">

        **Level 2 Answer (Mid-Level):**
        User_id works for user-centric data, but social media has multiple access patterns:

        1. **User profile/feed**: Shard by user_id - efficient single-shard queries
        2. **Timeline (posts from followed users)**: This is cross-shard! Options:
        - Fan-out on write: Copy posts to followers' shards (Instagram approach)
        - Fan-out on read: Query all followed users' shards (expensive)
        3. **Trending/search**: Separate system, not sharded by user_id

        I'd use <span style="color: #22c55e; font-weight: 600;">compound sharding</span>: user_id for personal data, but maintain denormalized copies for cross-user features.

      </div>

      <div style="background: #faf5ff; border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 4px solid #a855f7;">

        **Level 3 Answer (Senior):**
        The shard key decision requires analyzing the full data model:

        **Primary entities and their sharding:**
        ```
        users table        → shard by user_id (hash)
        posts table        → shard by author_id (co-locate with user)
        comments table     → shard by post_author_id (co-locate with post)
        likes table        → shard by post_author_id
        follows table      → COMPLEX - see below
        messages table     → shard by conversation_id
        ```

        **The follows/timeline problem is the hardest:**
        - Option A: Store follows on follower's shard. Timeline = scatter-gather to all followed users' shards. High read latency.
        - Option B: Store follows on followee's shard. Efficient for "who follows me?" but timeline still scatter-gather.
        - Option C: Fan-out on write (Twitter/Instagram model):
        - When user posts, push to all followers' timeline shards
        - Trades write amplification for read efficiency
        - For celebrities (100M followers), use hybrid: don't fan-out, merge at read time

        **Handling hotspots (celebrity accounts):**
        1. Secondary sharding for hot users: `shard = hash(user_id + date)` to spread load
        2. Separate "public" content tier with caching
        3. Rate limiting per user

        **Cross-shard consistency:**
        - Use [[eventual-consistency]](/topic/system-design/cap-theorem) for timeline (seconds delay acceptable)
        - Use [[distributed-locking]](/topic/system-design/distributed-locking) for critical operations (delete, account changes)

      </div>

    </div>

    <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #cbd5e1;">

      ### Q2: Explain consistent hashing and why virtual nodes are important.

      <div style="background: #eff6ff; border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 4px solid #3b82f6;">

        **Level 1 Answer (Junior):**
        Consistent hashing maps both keys and servers to a ring. Keys belong to the first server clockwise from their position. When adding/removing servers, only keys adjacent to the change move, minimizing data redistribution. Virtual nodes are multiple positions per server to improve distribution.

      </div>

      <div style="background: #f0fdf4; border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 4px solid #22c55e;">

        **Level 2 Answer (Mid-Level):**
        Without consistent hashing, adding a shard requires rehashing all keys: `hash(key) % N` changes for most keys when N changes.

        Consistent hashing fixes this by:
        1. Hashing servers and keys to the same ring (0 to 2^32)
        2. Each key is assigned to the first server clockwise
        3. Adding a server only affects keys in one segment

        **Virtual nodes solve the uneven distribution problem:**
        - With only 4 physical nodes, one might get 50% of the ring by chance
        - With 100 virtual nodes per physical node (400 total), distribution approaches uniform
        - Also helps during failures: one node's keys spread across many others, not just one

        **Implementation detail:** Virtual nodes are created by hashing `"node_name:0"`, `"node_name:1"`, etc.

      </div>

      <div style="background: #faf5ff; border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 4px solid #a855f7;">

        **Level 3 Answer (Senior):**
        Consistent hashing is fundamental to distributed systems like DynamoDB, Cassandra, and Riak.

        **Mathematical properties:**
        - Adding 1 node to N nodes moves only 1/(N+1) of keys
        - This is optimal - you can't do better without a directory
        - Ring positions use 32 or 64-bit hash space

        **Virtual nodes serve multiple purposes:**
        1. **Load balancing**: With K virtual nodes per physical node, standard deviation of load is O(1/sqrt(K))
        2. **Heterogeneous hardware**: Powerful nodes get more virtual nodes
        3. **Graceful failure recovery**: Failed node's load spreads across all others proportionally
        4. **Incremental rebalancing**: Can move virtual nodes one at a time

        **Replication strategy (Dynamo-style):**
        ```python
        def get_preference_list(key, n_replicas=3):
        """Return N distinct physical nodes, walking clockwise."""
        nodes = []
        pos = hash(key)
        while len(nodes) < n_replicas:
        pos = next_virtual_node_clockwise(pos)
        physical = virtual_to_physical[pos]
        if physical not in nodes:
        nodes.append(physical)
        return nodes
        ```

        **Weighted consistent hashing (for varying capacity):**
        - Node with 2x RAM gets 2x virtual nodes
        - But this complicates rebalancing when weights change
        - Alternative: Directory-based with weight metadata

        **Jump consistent hash (Google, 2014):**
        - No memory overhead (no ring storage)
        - O(log n) computation
        - But only supports sequential node IDs and no removal

      </div>

    </div>

    <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #cbd5e1;">

      ### Q3: How do you handle cross-shard transactions?

      <div style="background: #eff6ff; border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 4px solid #3b82f6;">

        **Level 1 Answer (Junior):**
        Cross-shard transactions are hard because you can't use a single database transaction. You need either two-phase commit (2PC) where a coordinator ensures all shards commit or rollback together, or saga pattern where you execute operations sequentially with compensating actions for rollback.

      </div>

      <div style="background: #f0fdf4; border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 4px solid #22c55e;">

        **Level 2 Answer (Mid-Level):**
        Cross-shard transactions violate the core benefit of sharding (independent operation). I'd recommend:

        **1. Avoid them by design:**
        - Co-locate related data on the same shard
        - Denormalize to eliminate cross-shard joins
        - Accept eventual consistency where possible

        **2. When unavoidable, choose based on requirements:**

        **Two-Phase Commit (2PC):**
        - Strong consistency, but blocks on coordinator failure
        - High latency (2 round-trips minimum)
        - Use for: Financial transactions where correctness > availability

        **Saga Pattern:**
        - Eventual consistency with compensating transactions
        - Each step is a local transaction + event
        - If step fails, execute compensating actions for previous steps
        - Use for: Order processing, booking systems

        **TCC (Try-Confirm-Cancel):**
        - Reserve resources (Try), then Confirm or Cancel
        - Like saga but with explicit reservation phase
        - Better for inventory, seat booking

      </div>

      <div style="background: #faf5ff; border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 4px solid #a855f7;">

        **Level 3 Answer (Senior):**
        This is where theory meets practice. Let me break down the options with real trade-offs:

        **Why cross-shard transactions are fundamentally hard:**
        - CAP theorem: Can't have consistency + availability during partition
        - 2PC is a consensus problem; consensus is expensive
        - Distributed transactions increase failure domain

        **Production-ready approaches:**

        **1. Choreography-based Saga (event-driven):**
        ```
        OrderService                    PaymentService                  InventoryService
        |                                |                               |
        | OrderCreated                   |                               |
        |------------------------------->|                               |
        |                          PaymentProcessed                      |
        |                                |------------------------------>|
        |                                                         InventoryReserved
        |<---------------------------------------------------------------|
        ```
        - No central coordinator (no SPOF)
        - Complex to debug and monitor
        - Compensations must be idempotent

        **2. Orchestration-based Saga:**
        ```python
        class OrderSaga:
        steps = [
        (reserve_inventory, release_inventory),
        (process_payment, refund_payment),
        (confirm_order, cancel_order),
        ]

        def execute(self, order):
        completed = []
        for action, compensation in self.steps:
        try:
        action(order)
        completed.append(compensation)
        except Exception:
        for comp in reversed(completed):
        comp(order)
        raise
        ```
        - Easier to reason about and monitor
        - Coordinator is SPOF (need to persist saga state)

        **3. Outbox Pattern (for reliable messaging):**
        - Write event to local outbox table in same transaction as data change
        - Separate process reads outbox and publishes to message queue
        - Guarantees at-least-once delivery

        **4. For true ACID across shards (expensive but sometimes needed):**
        - Google Spanner: TrueTime + Paxos for global consistency
        - CockroachDB: Serializable isolation across nodes
        - Vitess: Supports cross-shard transactions with 2PC

        **Design principle:** Minimize cross-shard transactions by making shards the unit of consistency. Design domain boundaries around shard boundaries.

      </div>

    </div>

    <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #cbd5e1;">

      ### Q4: How would you reshard a production database with zero downtime?

      <div style="background: #eff6ff; border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 4px solid #3b82f6;">

        **Level 1 Answer (Junior):**
        Use the double-write pattern: write to both old and new shard locations during migration, backfill historical data in background, then switch reads to new locations. Finally, stop writing to old locations and clean up.

      </div>

      <div style="background: #f0fdf4; border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 4px solid #22c55e;">

        **Level 2 Answer (Mid-Level):**
        Zero-downtime resharding requires careful orchestration:

        **Phase 1 - Preparation:**
        - Deploy new shard infrastructure
        - Update routing logic to understand both old and new schemes
        - Enable feature flag for migration

        **Phase 2 - Double-Write:**
        ```python
        def write(key, data):
        old_shard = old_router.get_shard(key)
        new_shard = new_router.get_shard(key)

        # Write to both (old is source of truth)
        write_to_shard(old_shard, key, data)
        write_to_shard(new_shard, key, data)  # Async is OK
        ```

        **Phase 3 - Backfill:**
        - Scan old shards chronologically (or by key range)
        - Copy to new shards (skip if newer version exists from double-write)
        - Track progress with checkpoints

        **Phase 4 - Verification:**
        - Compare row counts, checksums
        - Sample random records for deep comparison
        - Monitor for discrepancies

        **Phase 5 - Cutover:**
        - Switch reads to new shards (gradually with % rollout)
        - Monitor error rates
        - Keep double-writes for safety buffer

        **Phase 6 - Cleanup:**
        - Disable writes to old shards
        - Wait for in-flight requests
        - Archive or delete old data

      </div>

      <div style="background: #faf5ff; border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 4px solid #a855f7;">

        **Level 3 Answer (Senior):**
        I've done this at scale. Here are the hard parts people don't mention:

        **Challenge 1: Maintaining consistency during double-write**
        ```python
        # Naive double-write has race conditions:
        # T1: read from old_shard (version 1)
        # T2: write to old_shard (version 2)
        # T2: write to new_shard (version 2)
        # T1: write to new_shard (version 1) <- STALE!

        # Solution: Include version/timestamp, use conditional writes
        def write_with_version(shard, key, data, version):
        # Only write if version is newer
        UPDATE table SET data = ?, version = ?
        WHERE key = ? AND version < ?
        ```

        **Challenge 2: Backfill with high write volume**
        - Backfill takes days for TB-scale data
        - Writes during backfill create moving target
        - Solution: Multiple passes with decreasing scope
        - Pass 1: Copy all data (some will be stale)
        - Pass 2: Copy only records modified since Pass 1 started
        - Pass 3: Copy only records modified since Pass 2 started
        - Continue until Pass N copies < 1000 records

        **Challenge 3: Handling schema differences**
        - New shard might have different schema
        - Need bidirectional transformation during migration
        ```python
        def write_to_new(key, old_format_data):
        new_format = transform_v1_to_v2(old_format_data)
        write(new_shard, key, new_format)

        def read_from_new_for_old_client(key):
        new_format = read(new_shard, key)
        return transform_v2_to_v1(new_format)
        ```

        **Challenge 4: Rollback capability**
        - Keep old shards intact until fully verified
        - Maintain reverse routing capability
        - Test rollback procedure in staging

        **Challenge 5: Cross-shard transactions during migration**
        - If transaction spans migrating + stable shards
        - Pause migration, complete transaction, resume
        - Or: use [[distributed-locking]](/topic/system-design/distributed-locking) per-key during transition

        **Tools we use:**
        - gh-ost (GitHub) for MySQL online schema changes
        - Vitess for managed MySQL sharding with resharding support
        - Custom state machine for migration orchestration
        - Extensive monitoring: lag, error rates, comparison mismatches

      </div>

    </div>

    <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #cbd5e1;">

      ### Q5: What are the trade-offs between database sharding and using a distributed database like CockroachDB?

      <div style="background: #eff6ff; border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 4px solid #3b82f6;">

        **Level 1 Answer (Junior):**
        Manual sharding gives you more control but requires building routing, handling cross-shard queries, and managing resharding yourself. Distributed databases like CockroachDB handle this automatically but add latency for consensus and are more expensive.

      </div>

      <div style="background: #f0fdf4; border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 4px solid #22c55e;">

        **Level 2 Answer (Mid-Level):**

        | Aspect | Manual Sharding | Distributed DB |
        |--------|-----------------|----------------|
        | Control | Full control over data placement | Automatic, less predictable |
        | Consistency | Choose per operation | Usually strong by default |
        | Latency | Single-shard: ~1ms | All writes: 10-50ms (consensus) |
        | Cross-shard | You build scatter-gather | Built-in SQL support |
        | Resharding | Complex, manual process | Automatic rebalancing |
        | Cost | Cheaper infrastructure | Higher license/complexity cost |
        | Team skill | Requires deep expertise | Easier to operate |

        **When to choose manual sharding:**
        - Predictable, simple access patterns
        - Very low latency requirements
        - Large team with database expertise
        - Cost-sensitive at scale

        **When to choose distributed DB:**
        - Complex queries, joins across shards
        - Strong consistency requirements
        - Smaller team, less DB expertise
        - Rapid scaling needs

      </div>

      <div style="background: #faf5ff; border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 4px solid #a855f7;">

        **Level 3 Answer (Senior):**
        This is a fundamental architecture decision. Let me share production experience with both:

        **Manual Sharding (Instagram, Discord, Uber approach):**

        *Advantages:*
        - Predictable latency: single-shard reads are ~1ms
        - Full control: can optimize for specific access patterns
        - Battle-tested: MySQL/PostgreSQL at scale is well-understood
        - Cost: Commodity hardware, open-source databases

        *Hidden costs:*
        - Building shard router + query parser: 3-6 months engineering
        - On-call complexity: shard-aware debugging, rebalancing
        - Every new feature must consider sharding implications
        - Cross-shard transactions: build your own saga/2PC

        **Distributed Database (Spanner, CockroachDB, TiDB):**

        *Advantages:*
        - SQL semantics preserved (JOINs work across nodes)
        - Automatic rebalancing and resharding
        - Serializable isolation by default
        - Built-in HA with consensus replication

        *Hidden costs:*
        - Write latency: 10-50ms minimum (consensus round-trips)
        - Tail latency: Cross-region writes can be 100ms+
        - Debugging: Distributed query plans are complex
        - Cost: 3-5x infrastructure cost vs manual sharding

        **Hybrid approaches (what I'd recommend):**

        1. **Vitess (used by YouTube, Slack):**
        - MySQL underneath (predictable)
        - Sharding layer handles routing
        - Supports cross-shard queries (scatter-gather)
        - Easier resharding than manual

        2. **Citus (PostgreSQL extension):**
        - PostgreSQL syntax and tooling
        - Distributed tables for sharded data
        - Reference tables for small lookups
        - Co-located tables for related data

        3. **Start simple, evolve:**
        - Begin with single database + read replicas
        - When hitting limits, first try vertical scaling
        - Then vertical sharding (split by domain/table)
        - Finally horizontal sharding for hot tables only

        **Decision framework:**
        ```
        if (p99_latency_requirement < 10ms):
        manual_sharding()  # Consensus is too slow

        elif (cross_shard_queries > 20%):
        distributed_db()  # Manual scatter-gather is too complex

        elif (team.size < 5 and team.db_expertise < "expert"):
        managed_distributed_db()  # CockroachCloud, Spanner

        else:
        evaluate_based_on_cost_and_specific_patterns()
        ```

      </div>

    </div>

    ---

    ## Common Pitfalls

    <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">

      ### 1. Wrong Shard Key Selection
      **Problem**: Chose low-cardinality key (country, status) causing hotspots.
      **Solution**: Use high-cardinality keys (user_id, UUID); compound keys for multi-dimensional access.

      ### 2. Cross-Shard Joins Without Planning
      **Problem**: Application evolved to need JOINs across shards, causing scatter-gather everywhere.
      **Solution**: Design schema upfront considering sharding. Denormalize or use reference tables.

      ### 3. Sequential ID Collisions
      **Problem**: Auto-increment IDs from different shards collide (shard1.id=1, shard2.id=1).
      **Solution**: Use UUIDs, Snowflake IDs, or shard-prefixed sequences: `shard_1_00001`.

      ### 4. Ignoring Hotspot Potential
      **Problem**: Viral content or celebrity users overwhelm a single shard.
      **Solution**: Secondary sharding for hot entities, [[caching]](/topic/system-design/caching), rate limiting, or special "hot" shards.

      ### 5. Resharding as Afterthought
      **Problem**: Started with simple hash sharding; now adding shards requires massive data movement.
      **Solution**: Use consistent hashing from day one. Build resharding capability before you need it.

      ### 6. No Per-Shard Observability
      **Problem**: Aggregate metrics hide individual shard problems until cascade failure.
      **Solution**: Dashboard per shard: CPU, memory, connections, query latency, replication lag.

    </div>

    ---

    ## Best Practices

    <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

      1. **Start with more shards than you need** - 16 shards for 100M rows leaves room for 1B without resharding

      2. **Use consistent hashing from day one** - Even if you don't need dynamic scaling yet

      3. **Include shard key in every related table** - Enables co-located joins within shard

      4. **Replicate each shard** - Shards need [[database-replication]](/topic/system-design/database-replication) too (primary + 2 replicas minimum)

      5. **Monitor shard balance** - Alert when data skew exceeds 20%; when hotspot detected

      6. **Design for single-shard queries** - 95%+ of queries should hit one shard

      7. **Test resharding in staging** - Before you need it in production

      8. **Plan for failure** - What happens when a shard is unavailable? Failover? Read-only mode?

      9. **Document shard key in code** - Make it explicit: `@ShardedBy(field = "user_id")`

      10. **Implement circuit breakers** - Prevent one failing shard from overwhelming others via [[circuit-breaker]](/topic/design-patterns/circuit-breaker)

    </div>

    ---

    ## Quick Reference Card

    <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #cbd5e1;">
      <h4 style="color: #1e293b; margin-top: 0;">Database Sharding Cheat Sheet</h4>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
        <div>
          <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Sharding Strategies</div>
          <div style="font-size: 14px; color: #475569;">
            <div style="padding: 4px 0;"><strong>Range:</strong> Good for scans, bad for hotspots</div>
            <div style="padding: 4px 0;"><strong>Hash:</strong> Even distribution, poor resharding</div>
            <div style="padding: 4px 0;"><strong>Consistent Hash:</strong> Best for dynamic clusters</div>
            <div style="padding: 4px 0;"><strong>Directory:</strong> Maximum flexibility, extra lookup</div>
          </div>
        </div>

        <div>
          <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Shard Key Properties</div>
          <div style="font-size: 14px; color: #475569;">
            <div style="padding: 4px 0;">High cardinality (millions of values)</div>
            <div style="padding: 4px 0;">Even distribution (no hotspots)</div>
            <div style="padding: 4px 0;">Query-aligned (in WHERE clause)</div>
            <div style="padding: 4px 0;">Immutable (never changes)</div>
          </div>
        </div>

        <div>
          <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Cross-Shard Strategies</div>
          <div style="font-size: 14px; color: #475569;">
            <div style="padding: 4px 0;"><strong>Scatter-Gather:</strong> Query all, merge results</div>
            <div style="padding: 4px 0;"><strong>Denormalization:</strong> Co-locate related data</div>
            <div style="padding: 4px 0;"><strong>Reference Tables:</strong> Replicate small tables</div>
            <div style="padding: 4px 0;"><strong>Global Index:</strong> Secondary lookup table</div>
          </div>
        </div>

        <div>
          <div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">ID Generation</div>
          <div style="font-size: 14px; color: #475569;">
            <div style="padding: 4px 0;"><strong>UUID:</strong> Random, no coordination</div>
            <div style="padding: 4px 0;"><strong>Snowflake:</strong> Time + machine + sequence</div>
            <div style="padding: 4px 0;"><strong>Shard-prefix:</strong> shard_1_00001</div>
            <div style="padding: 4px 0;"><strong>ULID:</strong> Sortable UUID alternative</div>
          </div>
        </div>
      </div>
    </div>

    ---

    ## Related Topics

    - [[database-replication]](/topic/system-design/database-replication) - Each shard needs replicas for HA
    - [[load-balancing]](/topic/system-design/load-balancing) - Consistent hashing algorithms
    - [[cap-theorem]](/topic/system-design/cap-theorem) - Understanding consistency trade-offs
    - [[distributed-locking]](/topic/system-design/distributed-locking) - Cross-shard coordination
    - [[caching]](/topic/system-design/caching) - Reducing load on shards
    - [[rate-limiting]](/topic/system-design/rate-limiting) - Protecting shards from overload
