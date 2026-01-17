# Caching

## Overview

Caching is a technique that stores copies of frequently accessed data in a faster storage layer to reduce latency, database load, and improve application performance. It's one of the most effective ways to scale systems.

## Key Concepts

### Why Caching?

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">
1. **Reduced Latency**: Memory access is ~100x faster than disk, ~1000x faster than network
2. **Lower Database Load**: Fewer queries hit the primary database
3. **Cost Efficiency**: Serve more requests with fewer resources
4. **Improved User Experience**: Faster response times
</div>

### Cache Layers Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">CACHE HIERARCHY</h3>
  <!-- Flow diagram -->
  <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; margin-bottom: 24px;">
    <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 16px 20px; border-radius: 10px; text-align: center;">
      <div style="color: white; font-weight: 600; font-size: 13px;">Client Browser</div>
    </div>
    <span style="color: #58a6ff; font-size: 20px;">→</span>
    <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 16px 20px; border-radius: 10px; text-align: center;">
      <div style="color: white; font-weight: 600; font-size: 13px;">CDN (Edge)</div>
    </div>
    <span style="color: #58a6ff; font-size: 20px;">→</span>
    <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 16px 20px; border-radius: 10px; text-align: center;">
      <div style="color: white; font-weight: 600; font-size: 13px;">App Cache</div>
    </div>
    <span style="color: #58a6ff; font-size: 20px;">→</span>
    <div style="background: linear-gradient(135deg, #f0883e 0%, #f0883e 100%); padding: 16px 20px; border-radius: 10px; text-align: center;">
      <div style="color: white; font-weight: 600; font-size: 13px;">Database</div>
    </div>
  </div>
  <!-- Cache types -->
  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px;">
    <div style="background: rgba(31, 111, 235, 0.1); border: 1px solid rgba(31, 111, 235, 0.3); border-radius: 8px; padding: 12px; text-align: center;">
      <div style="color: #58a6ff; font-weight: 600; font-size: 12px; margin-bottom: 4px;">Browser Cache</div>
      <div style="color: #7ee787; font-size: 11px;">~100ms</div>
    </div>
    <div style="background: rgba(35, 134, 54, 0.1); border: 1px solid rgba(35, 134, 54, 0.3); border-radius: 8px; padding: 12px; text-align: center;">
      <div style="color: #7ee787; font-weight: 600; font-size: 12px; margin-bottom: 4px;">Static Assets</div>
      <div style="color: #7ee787; font-size: 11px;">~50ms</div>
    </div>
    <div style="background: rgba(137, 87, 229, 0.1); border: 1px solid rgba(137, 87, 229, 0.3); border-radius: 8px; padding: 12px; text-align: center;">
      <div style="color: #a371f7; font-weight: 600; font-size: 12px; margin-bottom: 4px;">In-Memory (Redis)</div>
      <div style="color: #7ee787; font-size: 11px;">~1ms</div>
    </div>
    <div style="background: rgba(240, 136, 62, 0.1); border: 1px solid rgba(240, 136, 62, 0.3); border-radius: 8px; padding: 12px; text-align: center;">
      <div style="color: #f0883e; font-weight: 600; font-size: 12px; margin-bottom: 4px;">Query Cache</div>
      <div style="color: #7ee787; font-size: 11px;">~10ms</div>
    </div>
  </div>
  <!-- Latency spectrum -->
  <div style="margin-bottom: 16px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
      <span style="color: #7ee787; font-size: 12px; font-weight: 600;">Fastest</span>
      <span style="color: #f85149; font-size: 12px; font-weight: 600;">Slowest</span>
    </div>
    <div style="background: linear-gradient(90deg, #238636 0%, #1f6feb 25%, #8957e5 50%, #f0883e 75%, #f85149 100%); height: 6px; border-radius: 3px;"></div>
  </div>
  <!-- Latency table -->
  <div style="background: #21262d; border-radius: 8px; padding: 16px;">
    <div style="color: #8b949e; font-size: 12px; margin-bottom: 12px;">Typical latencies:</div>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 12px;">
      <div><span style="color: #7ee787;">L1 Cache:</span> <span style="color: #c9d1d9;">~1 ns</span></div>
      <div><span style="color: #7ee787;">L2 Cache:</span> <span style="color: #c9d1d9;">~10 ns</span></div>
      <div><span style="color: #58a6ff;">RAM:</span> <span style="color: #c9d1d9;">~100 ns</span></div>
      <div><span style="color: #a371f7;">Redis:</span> <span style="color: #c9d1d9;">~1 ms</span></div>
      <div><span style="color: #f0883e;">SSD:</span> <span style="color: #c9d1d9;">~100 us</span></div>
      <div><span style="color: #f0883e;">HDD:</span> <span style="color: #c9d1d9;">~10 ms</span></div>
      <div><span style="color: #f85149;">Network:</span> <span style="color: #c9d1d9;">~100 ms (cross-region)</span></div>
    </div>
  </div>
</div>

---

## Caching Strategies

### Strategy Comparison

<div style="background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
| Strategy | Read Path | Write Path | Consistency | Best For |
|----------|-----------|------------|-------------|----------|
| **Cache-Aside** | App checks cache → DB on miss | App updates DB, invalidates cache | Eventual | General purpose |
| **Read-Through** | Cache fetches from DB on miss | N/A | Eventual | Read-heavy |
| **Write-Through** | Same as cache-aside | Write to cache + DB together | Strong | Read-heavy + consistency |
| **Write-Behind** | Same as cache-aside | Write to cache, async DB | Eventual | Write-heavy |
| **Refresh-Ahead** | Proactive refresh before expiry | N/A | Fresh data | Predictable access |
</div>

### 1. Cache-Aside (Lazy Loading)

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">CACHE-ASIDE PATTERN</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <!-- Read Flow -->
    <div>
      <div style="color: #7ee787; font-weight: 600; margin-bottom: 16px;">READ FLOW:</div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
        <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 12px 24px; border-radius: 8px;">
          <span style="color: white; font-weight: 600; font-size: 13px;">Application</span>
        </div>
        <div style="color: #58a6ff; font-size: 12px;">↓ 1. Check cache</div>
        <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 12px 24px; border-radius: 8px;">
          <span style="color: white; font-weight: 600; font-size: 13px;">Cache</span>
        </div>
        <div style="display: flex; gap: 32px; align-items: center;">
          <div style="text-align: center;">
            <div style="color: #7ee787; font-size: 12px;">HIT?</div>
            <div style="color: #7ee787; font-size: 11px;">YES → Return data</div>
          </div>
          <div style="text-align: center;">
            <div style="color: #f85149; font-size: 12px;">MISS?</div>
            <div style="color: #f85149; font-size: 11px;">↓</div>
          </div>
        </div>
        <div style="color: #58a6ff; font-size: 12px;">2. Query database</div>
        <div style="background: linear-gradient(135deg, #f0883e 0%, #f0883e 100%); padding: 12px 24px; border-radius: 8px;">
          <span style="color: white; font-weight: 600; font-size: 13px;">Database</span>
        </div>
        <div style="color: #58a6ff; font-size: 12px;">↓ 3. Store in cache</div>
        <div style="color: #7ee787; font-size: 12px;">↓ 4. Return data</div>
      </div>
    </div>
    <!-- Write Flow -->
    <div>
      <div style="color: #f0883e; font-weight: 600; margin-bottom: 16px;">WRITE FLOW:</div>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 10px 16px; border-radius: 8px;">
            <span style="color: white; font-size: 12px;">Application</span>
          </div>
          <span style="color: #58a6ff;">→</span>
          <div style="background: linear-gradient(135deg, #f0883e 0%, #f0883e 100%); padding: 10px 16px; border-radius: 8px;">
            <span style="color: white; font-size: 12px;">Update DB</span>
          </div>
          <span style="color: #58a6ff;">→</span>
          <div style="background: rgba(248, 81, 73, 0.2); border: 1px solid #f85149; padding: 10px 16px; border-radius: 8px;">
            <span style="color: #f85149; font-size: 12px;">Invalidate Cache</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 20px;">
**Pros**
- Only caches what's needed
- Cache failures don't break system
- Simple to implement
</div>
<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px;">
**Cons**
- Initial requests are slow (cache miss)
- Potential for stale data
- Cache stampede on expiry
</div>
</div>

### 2. Write-Through

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">WRITE-THROUGH PATTERN</h3>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
    <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 14px 28px; border-radius: 10px;">
      <span style="color: white; font-weight: 600;">Application</span>
    </div>
    <div style="color: #58a6ff; font-size: 13px;">↓ Write request</div>
    <div style="display: flex; align-items: center; gap: 24px;">
      <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 14px 28px; border-radius: 10px;">
        <span style="color: white; font-weight: 600;">Cache</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center;">
        <span style="color: #7ee787; font-size: 18px;">← → → →</span>
        <span style="color: #7ee787; font-size: 11px;">Synchronous</span>
      </div>
      <div style="background: linear-gradient(135deg, #f0883e 0%, #f0883e 100%); padding: 14px 28px; border-radius: 10px;">
        <span style="color: white; font-weight: 600;">Database</span>
      </div>
    </div>
    <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.4); border-radius: 8px; padding: 12px 24px; text-align: center;">
      <div style="color: #7ee787; font-weight: 600;">Both updated atomically</div>
    </div>
    <div style="color: #58a6ff; font-size: 13px;">↓</div>
    <div style="color: #7ee787; font-weight: 600;">Return success</div>
    <div style="background: rgba(88, 166, 255, 0.1); border: 1px solid rgba(88, 166, 255, 0.4); border-radius: 8px; padding: 12px 20px; margin-top: 8px;">
      <span style="color: #58a6ff; font-weight: 600;">Result:</span>
      <span style="color: #c9d1d9;"> Cache always consistent with database</span>
    </div>
  </div>
</div>

**Pros**: Cache always consistent with database
**Cons**: Higher write latency, cache may store unused data

### 3. Write-Behind (Write-Back)

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">WRITE-BEHIND PATTERN</h3>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
    <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 14px 28px; border-radius: 10px;">
      <span style="color: white; font-weight: 600;">Application</span>
    </div>
    <div style="color: #58a6ff; font-size: 13px;">↓ 1. Write request</div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 14px 28px; border-radius: 10px;">
        <span style="color: white; font-weight: 600;">Cache</span>
      </div>
      <div style="background: rgba(126, 231, 135, 0.2); border: 1px solid #7ee787; padding: 8px 16px; border-radius: 6px;">
        <span style="color: #7ee787; font-size: 12px;">← Return immediately (fast!)</span>
      </div>
    </div>
    <div style="color: #58a6ff; font-size: 13px;">↓ 2. Queue write</div>
    <div style="background: #21262d; border: 2px solid #30363d; border-radius: 10px; padding: 16px; text-align: center;">
      <div style="color: #c9d1d9; font-size: 13px; margin-bottom: 8px;">Write Queue</div>
      <div style="display: flex; gap: 8px; justify-content: center;">
        <span style="background: #f0883e; color: white; padding: 6px 14px; border-radius: 4px; font-size: 12px;">A</span>
        <span style="background: #f0883e; color: white; padding: 6px 14px; border-radius: 4px; font-size: 12px;">B</span>
        <span style="background: #f0883e; color: white; padding: 6px 14px; border-radius: 4px; font-size: 12px;">C</span>
      </div>
      <div style="color: #8b949e; font-size: 11px; margin-top: 6px;">← Pending writes</div>
    </div>
    <div style="color: #58a6ff; font-size: 13px;">↓ 3. Async batch write</div>
    <div style="background: linear-gradient(135deg, #f0883e 0%, #f0883e 100%); padding: 14px 28px; border-radius: 10px;">
      <span style="color: white; font-weight: 600;">Database</span>
    </div>
    <div style="background: rgba(248, 81, 73, 0.1); border: 1px solid rgba(248, 81, 73, 0.4); border-radius: 8px; padding: 12px 20px; margin-top: 8px;">
      <span style="color: #f85149; font-weight: 600;">⚠️ Risk:</span>
      <span style="color: #f85149;"> Data loss if cache fails before flush!</span>
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ff6b6b;">
**Pros**: Very fast writes, reduced database load, batch optimization
**Cons**: Risk of data loss if cache fails before flush, complexity
</div>

### 4. Read-Through

Cache automatically fetches from database on miss.

### 5. Refresh-Ahead

Proactively refresh cache before expiration - prevents cache miss latency for predictable access patterns.

---

## Cache Eviction Policies

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">CACHE EVICTION POLICIES</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <!-- LRU -->
    <div style="background: rgba(35, 134, 54, 0.1); border: 1px solid rgba(35, 134, 54, 0.3); border-radius: 12px; padding: 16px;">
      <div style="color: #7ee787; font-weight: 600; margin-bottom: 12px;">1. LRU (Least Recently Used)</div>
      <div style="display: flex; gap: 4px; justify-content: center; margin-bottom: 8px;">
        <span style="background: #f85149; color: white; padding: 6px 12px; border-radius: 4px; font-size: 12px;">E</span>
        <span style="background: #f0883e; color: white; padding: 6px 12px; border-radius: 4px; font-size: 12px;">D</span>
        <span style="background: #58a6ff; color: white; padding: 6px 12px; border-radius: 4px; font-size: 12px;">C</span>
        <span style="background: #8957e5; color: white; padding: 6px 12px; border-radius: 4px; font-size: 12px;">B</span>
        <span style="background: #238636; color: white; padding: 6px 12px; border-radius: 4px; font-size: 12px;">A</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 11px;">
        <span style="color: #f85149;">↑ Evict first</span>
        <span style="color: #7ee787;">Most recent ↑</span>
      </div>
      <div style="color: #8b949e; font-size: 11px; margin-top: 6px; text-align: center;">Access A → A moves to front</div>
    </div>
    <!-- LFU -->
    <div style="background: rgba(31, 111, 235, 0.1); border: 1px solid rgba(31, 111, 235, 0.3); border-radius: 12px; padding: 16px;">
      <div style="color: #58a6ff; font-weight: 600; margin-bottom: 12px;">2. LFU (Least Frequently Used)</div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <div style="display: flex; justify-content: space-between; background: rgba(35, 134, 54, 0.2); padding: 6px 12px; border-radius: 4px;">
          <span style="color: #7ee787; font-size: 12px;">A</span>
          <span style="color: #7ee787; font-size: 12px;">freq: 5 ← Keep (popular)</span>
        </div>
        <div style="display: flex; justify-content: space-between; background: rgba(88, 166, 255, 0.2); padding: 6px 12px; border-radius: 4px;">
          <span style="color: #58a6ff; font-size: 12px;">B</span>
          <span style="color: #58a6ff; font-size: 12px;">freq: 2</span>
        </div>
        <div style="display: flex; justify-content: space-between; background: rgba(248, 81, 73, 0.2); padding: 6px 12px; border-radius: 4px;">
          <span style="color: #f85149; font-size: 12px;">C</span>
          <span style="color: #f85149; font-size: 12px;">freq: 1 ← Evict first</span>
        </div>
      </div>
    </div>
    <!-- TTL -->
    <div style="background: rgba(137, 87, 229, 0.1); border: 1px solid rgba(137, 87, 229, 0.3); border-radius: 12px; padding: 16px;">
      <div style="color: #a371f7; font-weight: 600; margin-bottom: 12px;">3. TTL (Time To Live)</div>
      <div style="background: #21262d; border-radius: 6px; padding: 10px; font-size: 12px;">
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 4px;">
          <span style="color: #8b949e;">Key</span>
          <span style="color: #8b949e;">Expires At</span>
          <span style="color: #a371f7;">A</span>
          <span style="color: #c9d1d9;">2024-01-15 10:30:00</span>
        </div>
      </div>
      <div style="color: #8b949e; font-size: 11px; margin-top: 8px;">← Auto-expire after TTL</div>
    </div>
    <!-- FIFO & Random -->
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div style="background: rgba(240, 136, 62, 0.1); border: 1px solid rgba(240, 136, 62, 0.3); border-radius: 12px; padding: 12px;">
        <div style="color: #f0883e; font-weight: 600; font-size: 13px; margin-bottom: 4px;">4. FIFO (First In First Out)</div>
        <div style="color: #8b949e; font-size: 12px;">Evict oldest entries regardless of access pattern</div>
      </div>
      <div style="background: rgba(248, 81, 73, 0.1); border: 1px solid rgba(248, 81, 73, 0.3); border-radius: 12px; padding: 12px;">
        <div style="color: #f85149; font-weight: 600; font-size: 13px; margin-bottom: 4px;">5. Random</div>
        <div style="color: #8b949e; font-size: 12px;">Randomly select items to evict (simple but unpredictable)</div>
      </div>
    </div>
  </div>
</div>

---

## Cache Invalidation

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4ecdc4;">
> "There are only two hard things in Computer Science: cache invalidation and naming things." - Phil Karlton
</div>

### Strategies

<div style="background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
| Strategy | How It Works | Best For |
|----------|--------------|----------|
| **TTL-based** | Set expiration time | Tolerant of staleness |
| **Event-based** | Invalidate on data changes | Strong consistency needs |
| **Version-based** | Include version in cache key | Config, static data |
</div>

### Cache Stampede Prevention

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">CACHE STAMPEDE PROBLEM</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <!-- Problem -->
    <div style="background: rgba(248, 81, 73, 0.1); border: 1px solid rgba(248, 81, 73, 0.3); border-radius: 12px; padding: 20px;">
      <div style="color: #f85149; font-weight: 600; margin-bottom: 16px;">THE PROBLEM</div>
      <div style="color: #8b949e; font-size: 12px; margin-bottom: 12px;">Cache expires at T=0</div>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
          <span style="color: #8b949e;">T=0.001</span>
          <span style="color: #58a6ff;">Req 1</span>
          <span style="color: #8b949e;">→</span>
          <span style="color: #f85149;">Cache MISS</span>
          <span style="color: #8b949e;">→</span>
          <span style="color: #f0883e;">Query DB</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
          <span style="color: #8b949e;">T=0.002</span>
          <span style="color: #58a6ff;">Req 2</span>
          <span style="color: #8b949e;">→</span>
          <span style="color: #f85149;">Cache MISS</span>
          <span style="color: #8b949e;">→</span>
          <span style="color: #f0883e;">Query DB</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
          <span style="color: #8b949e;">T=0.003</span>
          <span style="color: #58a6ff;">Req 3</span>
          <span style="color: #8b949e;">→</span>
          <span style="color: #f85149;">Cache MISS</span>
          <span style="color: #8b949e;">→</span>
          <span style="color: #f0883e;">Query DB</span>
        </div>
        <div style="color: #8b949e; font-size: 12px; text-align: center;">...</div>
      </div>
      <div style="background: rgba(248, 81, 73, 0.2); padding: 10px 14px; border-radius: 8px; text-align: center;">
        <span style="color: #f85149; font-weight: 600;">Result: Database overwhelmed!</span>
      </div>
    </div>
    <!-- Solution -->
    <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.3); border-radius: 12px; padding: 20px;">
      <div style="color: #7ee787; font-weight: 600; margin-bottom: 16px;">SOLUTION: Lock-based approach</div>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;">
          <span style="color: #8b949e;">T=0.001</span>
          <span style="color: #58a6ff;">Req 1</span>
          <span style="color: #8b949e;">→</span>
          <span style="color: #f85149;">MISS</span>
          <span style="color: #8b949e;">→</span>
          <span style="color: #7ee787;">Lock</span>
          <span style="color: #8b949e;">→</span>
          <span style="color: #f0883e;">Query DB</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;">
          <span style="color: #8b949e;">T=0.002</span>
          <span style="color: #58a6ff;">Req 2</span>
          <span style="color: #8b949e;">→</span>
          <span style="color: #f85149;">MISS</span>
          <span style="color: #8b949e;">→</span>
          <span style="color: #f0883e;">Wait for lock...</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;">
          <span style="color: #8b949e;">T=0.003</span>
          <span style="color: #58a6ff;">Req 3</span>
          <span style="color: #8b949e;">→</span>
          <span style="color: #f85149;">MISS</span>
          <span style="color: #8b949e;">→</span>
          <span style="color: #f0883e;">Wait for lock...</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;">
          <span style="color: #8b949e;">T=0.050</span>
          <span style="color: #58a6ff;">Req 1</span>
          <span style="color: #8b949e;">→</span>
          <span style="color: #7ee787;">Update cache → Release</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;">
          <span style="color: #8b949e;">T=0.051</span>
          <span style="color: #58a6ff;">Req 2</span>
          <span style="color: #8b949e;">→</span>
          <span style="color: #7ee787;">Cache HIT! ✓</span>
        </div>
        <div style="display: flex; align-items: center; gap: 6px; font-size: 11px;">
          <span style="color: #8b949e;">T=0.052</span>
          <span style="color: #58a6ff;">Req 3</span>
          <span style="color: #8b949e;">→</span>
          <span style="color: #7ee787;">Cache HIT! ✓</span>
        </div>
      </div>
      <div style="background: rgba(126, 231, 135, 0.2); padding: 10px 14px; border-radius: 8px; text-align: center;">
        <span style="color: #7ee787; font-weight: 600;">Result: Only ONE database query! ✓</span>
      </div>
    </div>
  </div>
</div>

---

## Distributed Caching

### Consistent Hashing

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">CONSISTENT HASHING FOR CACHE</h3>
  <div style="display: flex; gap: 40px; align-items: flex-start; flex-wrap: wrap; justify-content: center;">
    <!-- Ring visualization -->
    <div style="position: relative; width: 200px; height: 200px;">
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; border: 3px solid #30363d; border-radius: 50%;"></div>
      <!-- Markers -->
      <div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); color: #8b949e; font-size: 11px;">0</div>
      <div style="position: absolute; top: 50%; right: -35px; transform: translateY(-50%); color: #8b949e; font-size: 11px;">2^32*3/4</div>
      <div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); color: #8b949e; font-size: 11px;">2^32/2</div>
      <div style="position: absolute; top: 50%; left: -25px; transform: translateY(-50%); color: #8b949e; font-size: 11px;">2^32/4</div>
      <!-- Nodes -->
      <div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); background: #238636; width: 14px; height: 14px; border-radius: 50%;"></div>
      <div style="position: absolute; top: 10px; left: 50%; transform: translateX(20px); color: #7ee787; font-size: 11px;">Node A</div>
      <div style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: #1f6feb; width: 14px; height: 14px; border-radius: 50%;"></div>
      <div style="position: absolute; top: 50%; right: -50px; transform: translateY(-50%); color: #58a6ff; font-size: 11px;">Node B</div>
      <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); background: #8957e5; width: 14px; height: 14px; border-radius: 50%;"></div>
      <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(20px); color: #a371f7; font-size: 11px;">Node C</div>
      <div style="position: absolute; top: 50%; left: 10px; transform: translateY(-50%); background: #f0883e; width: 14px; height: 14px; border-radius: 50%;"></div>
      <div style="position: absolute; top: 50%; left: -50px; transform: translateY(-50%); color: #f0883e; font-size: 11px;">Node D</div>
    </div>
    <!-- Explanation -->
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 320px;">
      <!-- Key routing -->
      <div style="background: rgba(88, 166, 255, 0.1); border: 1px solid rgba(88, 166, 255, 0.3); border-radius: 8px; padding: 12px 16px;">
        <div style="color: #58a6ff; font-weight: 600; font-size: 13px; margin-bottom: 8px;">Key Routing:</div>
        <div style="color: #c9d1d9; font-size: 12px;">
          Key <span style="color: #f0883e;">"user:123"</span> → hash() = X<br>
          → Find next node clockwise<br>
          → <span style="color: #58a6ff; font-weight: 600;">Routes to Node B</span>
        </div>
      </div>
      <!-- When node fails -->
      <div style="background: rgba(248, 81, 73, 0.1); border: 1px solid rgba(248, 81, 73, 0.3); border-radius: 8px; padding: 12px 16px;">
        <div style="color: #f85149; font-weight: 600; font-size: 13px; margin-bottom: 8px;">When Node B fails:</div>
        <div style="color: #c9d1d9; font-size: 12px;">
          - Only keys between A and B move to C<br>
          - <span style="color: #7ee787;">Keys on other nodes stay put!</span>
        </div>
      </div>
      <!-- Virtual nodes -->
      <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.3); border-radius: 8px; padding: 12px 16px;">
        <div style="color: #7ee787; font-weight: 600; font-size: 13px; margin-bottom: 4px;">Virtual Nodes:</div>
        <div style="color: #c9d1d9; font-size: 12px;">Each physical node gets multiple positions for better distribution</div>
      </div>
    </div>
  </div>
</div>

---

## Common Interview Questions

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
1. **How do you handle cache invalidation in a distributed system?**
   - Use pub/sub for cache invalidation events
   - Version-based keys
   - Short TTLs with refresh-ahead
2. **What's the difference between Redis and Memcached?**
   - Redis: Data structures, persistence, replication, Lua scripting
   - Memcached: Simpler, multi-threaded, slightly faster for simple use cases
3. **How do you prevent cache stampede?**
   - Locking/mutex
   - Probabilistic early expiration
   - Background refresh
4. **When should you NOT use caching?**
   - Highly dynamic data
   - Write-heavy workloads
   - When consistency is critical
</div>

---

## Best Practices

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
1. **Set appropriate TTLs** - Balance freshness vs. hit rate
2. **Monitor cache hit rates** - Target 90%+ for frequently accessed data
3. **Use cache warming** - Pre-populate cache on startup
4. **Handle cache failures gracefully** - Fall back to database
5. **Avoid caching sensitive data** - Or encrypt if necessary
6. **Use consistent hashing** - For distributed caches
</div>

---

## Related Topics

- [Load Balancing](/topic/system-design/load-balancing)
- [CDN](/topic/system-design/cdn)
- [Database Replication](/topic/system-design/database-replication)

---

## Implementation

### Python - Cache-Aside Pattern

```python
def get_user(user_id):
    # Try cache first
    user = cache.get(f"user:{user_id}")
    if user:
        return user

    # Cache miss - fetch from database
    user = database.query(f"SELECT * FROM users WHERE id = {user_id}")

    # Store in cache for future requests
    cache.set(f"user:{user_id}", user, ttl=3600)
    return user
```

### Python - Write-Through Pattern

```python
def update_user(user_id, data):
    # Write to database
    database.update("users", user_id, data)

    # Write to cache
    cache.set(f"user:{user_id}", data, ttl=3600)
```

### Python - Write-Behind Pattern

```python
def update_user(user_id, data):
    # Write to cache only
    cache.set(f"user:{user_id}", data)

    # Queue async database write
    write_queue.push({"table": "users", "id": user_id, "data": data})

# Background worker
def flush_writes():
    while True:
        item = write_queue.pop()
        database.update(item["table"], item["id"], item["data"])
```

### Python - Read-Through Cache

```python
class ReadThroughCache:
    def get(self, key, loader_func):
        value = self.cache.get(key)
        if value is None:
            value = loader_func()
            self.cache.set(key, value)
        return value

# Usage
user = cache.get(f"user:{user_id}", lambda: database.get_user(user_id))
```

### Python - Refresh-Ahead

```python
def get_with_refresh(key, ttl, refresh_threshold=0.8):
    value, remaining_ttl = cache.get_with_ttl(key)

    if remaining_ttl < ttl * (1 - refresh_threshold):
        # Async refresh in background
        background_refresh(key)

    return value
```

### Python - LRU Cache with OrderedDict

```python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return None
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)
```

### Python - Consistent Hashing

```python
import hashlib

class ConsistentHash:
    def __init__(self, nodes, virtual_nodes=100):
        self.ring = {}
        self.sorted_keys = []

        for node in nodes:
            for i in range(virtual_nodes):
                key = self._hash(f"{node}:{i}")
                self.ring[key] = node
                self.sorted_keys.append(key)

        self.sorted_keys.sort()

    def _hash(self, key):
        return int(hashlib.md5(key.encode()).hexdigest(), 16)

    def get_node(self, key):
        if not self.ring:
            return None

        hash_key = self._hash(key)
        for ring_key in self.sorted_keys:
            if hash_key <= ring_key:
                return self.ring[ring_key]
        return self.ring[self.sorted_keys[0]]
```

### Python - Cache Stampede Prevention

```python
import threading

locks = {}

def get_with_lock(key, loader_func, ttl):
    value = cache.get(key)
    if value:
        return value

    # Acquire lock for this key
    lock = locks.setdefault(key, threading.Lock())
    with lock:
        # Double-check after acquiring lock
        value = cache.get(key)
        if value:
            return value

        value = loader_func()
        cache.set(key, value, ttl)
        return value
```

### Python - Redis Cluster Example

```python
import redis

class DistributedCache:
    def __init__(self, nodes):
        self.cluster = redis.RedisCluster(
            startup_nodes=nodes,
            decode_responses=True
        )

    def get(self, key):
        return self.cluster.get(key)

    def set(self, key, value, ttl=3600):
        self.cluster.setex(key, ttl, value)

    def delete(self, key):
        self.cluster.delete(key)
```

### Go - Thread-Safe LRU Cache

```go
package main

import (
	"container/list"
	"sync"
	"time"
)

type CacheItem struct {
	Key       string
	Value     interface{}
	ExpiresAt time.Time
}

type LRUCache struct {
	capacity int
	items    map[string]*list.Element
	order    *list.List
	mu       sync.RWMutex
}

func NewLRUCache(capacity int) *LRUCache {
	return &LRUCache{
		capacity: capacity,
		items:    make(map[string]*list.Element),
		order:    list.New(),
	}
}

func (c *LRUCache) Get(key string) (interface{}, bool) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if elem, ok := c.items[key]; ok {
		item := elem.Value.(*CacheItem)
		if time.Now().Before(item.ExpiresAt) {
			c.order.MoveToFront(elem)
			return item.Value, true
		}
		// Expired - remove it
		c.removeElement(elem)
	}
	return nil, false
}

func (c *LRUCache) Set(key string, value interface{}, ttl time.Duration) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if elem, ok := c.items[key]; ok {
		c.order.MoveToFront(elem)
		item := elem.Value.(*CacheItem)
		item.Value = value
		item.ExpiresAt = time.Now().Add(ttl)
		return
	}

	// Evict if at capacity
	for c.order.Len() >= c.capacity {
		c.removeOldest()
	}

	item := &CacheItem{
		Key:       key,
		Value:     value,
		ExpiresAt: time.Now().Add(ttl),
	}
	elem := c.order.PushFront(item)
	c.items[key] = elem
}

func (c *LRUCache) removeOldest() {
	elem := c.order.Back()
	if elem != nil {
		c.removeElement(elem)
	}
}

func (c *LRUCache) removeElement(elem *list.Element) {
	c.order.Remove(elem)
	item := elem.Value.(*CacheItem)
	delete(c.items, item.Key)
}

func main() {
	cache := NewLRUCache(100)

	cache.Set("user:1", map[string]string{"name": "Alice"}, 5*time.Minute)

	if value, ok := cache.Get("user:1"); ok {
		println("Found:", value.(map[string]string)["name"])
	}
}
```
