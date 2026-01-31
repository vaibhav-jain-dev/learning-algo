# Caching

## Table of Contents {#toc}

<div class="diagram-container" style="padding: 20px;">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; width: 100%;">
<div style="background: var(--color-bg-primary, #ffffff); border-radius: 8px; padding: 16px; border-left: 4px solid #3b82f6;">
<div style="font-weight: 600; color: var(--color-text-primary, #1e293b); margin-bottom: 8px;">Fundamentals</div>
<ul style="margin: 0; padding-left: 16px; font-size: 14px; color: var(--color-text-secondary, #475569);">
<li><a href="#overview">Overview</a></li>
<li><a href="#why-this-matters">Why This Matters</a></li>
<li><a href="#core-concepts">Core Concepts</a></li>
</ul>
</div>
<div style="background: var(--color-bg-primary, #ffffff); border-radius: 8px; padding: 16px; border-left: 4px solid #8b5cf6;">
<div style="font-weight: 600; color: var(--color-text-primary, #1e293b); margin-bottom: 8px;">Implementation</div>
<ul style="margin: 0; padding-left: 16px; font-size: 14px; color: var(--color-text-secondary, #475569);">
<li><a href="#how-it-works">How It Works</a></li>
<li><a href="#cache-strategies">Cache Strategies</a></li>
<li><a href="#eviction-policies">Eviction Policies</a></li>
</ul>
</div>
<div style="background: var(--color-bg-primary, #ffffff); border-radius: 8px; padding: 16px; border-left: 4px solid #f59e0b;">
<div style="font-weight: 600; color: var(--color-text-primary, #1e293b); margin-bottom: 8px;">Production</div>
<ul style="margin: 0; padding-left: 16px; font-size: 14px; color: var(--color-text-secondary, #475569);">
<li><a href="#edge-cases-failure-modes">Edge Cases & Failures</a></li>
<li><a href="#real-life-failure-story">Failure Story</a></li>
<li><a href="#what-to-watch-out-for">Common Pitfalls</a></li>
</ul>
</div>
<div style="background: var(--color-bg-primary, #ffffff); border-radius: 8px; padding: 16px; border-left: 4px solid #22c55e;">
<div style="font-weight: 600; color: var(--color-text-primary, #1e293b); margin-bottom: 8px;">Deep Dive</div>
<ul style="margin: 0; padding-left: 16px; font-size: 14px; color: var(--color-text-secondary, #475569);">
<li><a href="#interview-deep-dive">Interview Questions</a></li>
<li><a href="#code-implementation">Code Examples</a></li>
<li><a href="#quick-reference-card">Quick Reference</a></li>
</ul>
</div>
</div>
</div>

---

## Overview {#overview}

Caching is a technique that stores copies of frequently accessed data in a faster storage layer (like memory) to reduce latency and decrease load on the primary data source. Think of it as keeping your most-used tools on your desk instead of walking to the storage room every time you need them.

---

## Why This Matters {#why-this-matters}

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin: 0 0 16px 0; font-size: 16px;">Real Company Examples</h4>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
<div style="color: #0f172a; font-weight: 600; margin-bottom: 8px;">Netflix</div>
<div style="color: #475569; font-size: 14px;">Caches movie metadata and thumbnails at edge servers. Reduced origin requests by 95% and serves 200+ million users globally.</div>
</div>
<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
<div style="color: #0f172a; font-weight: 600; margin-bottom: 8px;">Facebook</div>
<div style="color: #475569; font-size: 14px;">Uses Memcached clusters caching 75% of all reads. Handles billions of requests per second with sub-millisecond latency.</div>
</div>
<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
<div style="color: #0f172a; font-weight: 600; margin-bottom: 8px;">Amazon</div>
<div style="color: #475569; font-size: 14px;">Every 100ms of latency costs 1% in sales. Caching product pages and recommendations saves millions in revenue.</div>
</div>
</div>
</div>

**Why caching is essential:**
- **Speed**: Memory access is ~100x faster than disk, ~1000x faster than network
- **Cost Reduction**: Serve more requests with fewer database servers
- **Scalability**: Handle traffic spikes without scaling expensive backend resources
- **User Experience**: Users abandon sites that take more than 3 seconds to load

---

## Core Concepts {#core-concepts}

### The Library Analogy {#library-analogy}

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<div style="color: #1e293b; font-size: 15px; line-height: 1.7;">
<p>Imagine a <strong>university library</strong>:</p>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 16px;">
<div style="background: #ffffff; border-radius: 8px; padding: 16px; border: 1px solid #cbd5e1;">
<div style="color: #dc2626; font-weight: 600; margin-bottom: 8px;">Without Caching</div>
<ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px;">
<li>Every student walks to the archive basement</li>
<li>Finds the book in the catalog</li>
<li>Retrieves it from storage</li>
<li>Walks back to their desk</li>
<li><strong>Time: 10 minutes per book</strong></li>
</ul>
</div>
<div style="background: #ffffff; border-radius: 8px; padding: 16px; border: 1px solid #cbd5e1;">
<div style="color: #16a34a; font-weight: 600; margin-bottom: 8px;">With Caching</div>
<ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px;">
<li>Popular books kept on a "reserve shelf" near entrance</li>
<li>Students check reserve shelf first</li>
<li>If found (cache hit): grab and go</li>
<li>If not found (cache miss): go to archive</li>
<li><strong>Time: 30 seconds (hit) or 10 min (miss)</strong></li>
</ul>
</div>
</div>
</div>
</div>

### Cache Terminology {#cache-terminology}

| Term | Library Analogy | Technical Meaning |
|------|-----------------|-------------------|
| **Cache Hit** | Book found on reserve shelf | Data found in cache |
| **Cache Miss** | Book not on shelf, go to archive | Data not in cache, fetch from source |
| **TTL** | Books returned to archive after 7 days | Time before cached data expires |
| **Eviction** | Remove least-used books when shelf is full | Remove data when cache is full |
| **Invalidation** | Remove outdated edition when new one arrives | Remove stale data after update |

---

## How It Works {#how-it-works}

### Cache Hierarchy {#cache-hierarchy}

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; margin-bottom: 16px; font-weight: 600; color: var(--color-text-primary, #1e293b);">THE CACHING PYRAMID</div>
<div class="flow-box success" style="width: 140px;">
<div class="flow-box-title">Browser</div>
<div class="flow-box-subtitle">~0ms</div>
</div>
<div class="flow-arrow vertical">&#8595;</div>
<div class="flow-box primary" style="width: 180px;">
<div class="flow-box-title">CDN Edge</div>
<div class="flow-box-subtitle">~20ms</div>
</div>
<div class="flow-arrow vertical">&#8595;</div>
<div class="flow-box purple" style="width: 220px;">
<div class="flow-box-title">Application Cache</div>
<div class="flow-box-subtitle">Redis ~1ms</div>
</div>
<div class="flow-arrow vertical">&#8595;</div>
<div class="flow-box warning" style="width: 260px;">
<div class="flow-box-title">Database Query Cache</div>
<div class="flow-box-subtitle">~10ms</div>
</div>
<div class="flow-arrow vertical">&#8595;</div>
<div class="flow-box error" style="width: 300px;">
<div class="flow-box-title">Database (Disk)</div>
<div class="flow-box-subtitle">~50-100ms</div>
</div>
<div style="text-align: center; margin-top: 16px; color: var(--color-text-muted, #64748b); font-size: 13px;">
    Faster at top, more capacity at bottom
</div>
</div>
</div>

---

## Cache Strategies {#cache-strategies}

### Cache-Aside (Lazy Loading) {#cache-aside}

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; margin-bottom: 16px; font-weight: 600; color: var(--color-text-primary, #1e293b);">CACHE-ASIDE PATTERN</div>
<div class="flow-row">
<div class="flow-box primary">
<div class="flow-box-title">Application</div>
<div class="flow-box-subtitle">Requests Data</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box purple">
<div class="flow-box-title">Cache</div>
<div class="flow-box-subtitle">Check First</div>
</div>
</div>
<div class="flow-row" style="margin-top: 16px;">
<div style="display: flex; gap: 32px; flex-wrap: wrap; justify-content: center;">
<div style="text-align: center;">
<div class="flow-box success" style="margin-bottom: 8px;">
<div class="flow-box-title">Hit!</div>
<div class="flow-box-subtitle">Return Data</div>
</div>
<div style="font-size: 12px; color: var(--color-success, #10b981);">Fast Path</div>
</div>
<div style="text-align: center;">
<div class="flow-box warning" style="margin-bottom: 8px;">
<div class="flow-box-title">Miss</div>
<div class="flow-box-subtitle">Query DB</div>
</div>
<div class="flow-arrow vertical">&#8595;</div>
<div class="flow-box info" style="margin-top: 8px;">
<div class="flow-box-title">Store</div>
<div class="flow-box-subtitle">Update Cache</div>
</div>
</div>
</div>
</div>
</div>
</div>

### Write-Through Strategy {#write-through}

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; margin-bottom: 16px; font-weight: 600; color: var(--color-text-primary, #1e293b);">WRITE-THROUGH: Synchronous Write to Both</div>
<div class="flow-row">
<div class="flow-box primary">
<div class="flow-box-title">Application</div>
<div class="flow-box-subtitle">Write Request</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box purple">
<div class="flow-box-title">Cache</div>
<div class="flow-box-subtitle">Write First</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box warning">
<div class="flow-box-title">Database</div>
<div class="flow-box-subtitle">Write Second</div>
</div>
</div>
<div style="margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px;">
<div style="background: var(--color-success-bg, rgba(16, 185, 129, 0.1)); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: var(--color-success, #10b981); font-weight: 600; font-size: 13px;">Strong Consistency</div>
<div style="font-size: 12px; color: var(--color-text-muted, #64748b);">Cache always fresh</div>
</div>
<div style="background: var(--color-error-bg, rgba(239, 68, 68, 0.1)); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: var(--color-error, #ef4444); font-weight: 600; font-size: 13px;">Higher Latency</div>
<div style="font-size: 12px; color: var(--color-text-muted, #64748b);">Wait for both writes</div>
</div>
<div style="background: var(--color-info-bg, rgba(59, 130, 246, 0.1)); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: var(--color-info, #3b82f6); font-weight: 600; font-size: 13px;">Best For</div>
<div style="font-size: 12px; color: var(--color-text-muted, #64748b);">Financial data</div>
</div>
</div>
</div>
</div>

### Write-Back (Write-Behind) Strategy {#write-back}

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; margin-bottom: 16px; font-weight: 600; color: var(--color-text-primary, #1e293b);">WRITE-BACK: Async Write to Database</div>
<div class="flow-row">
<div class="flow-box primary">
<div class="flow-box-title">Application</div>
<div class="flow-box-subtitle">Write Request</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box success">
<div class="flow-box-title">Cache</div>
<div class="flow-box-subtitle">Write & ACK</div>
</div>
</div>
<div class="flow-arrow vertical" style="margin: 12px 0;">&#8595;</div>
<div style="text-align: center; color: var(--color-text-muted, #64748b); font-size: 12px; margin-bottom: 8px;">Async (Background)</div>
<div class="flow-row">
<div class="flow-box neutral">
<div class="flow-box-title">Queue</div>
<div class="flow-box-subtitle">Batch Writes</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box warning">
<div class="flow-box-title">Database</div>
<div class="flow-box-subtitle">Persist Later</div>
</div>
</div>
<div style="margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px;">
<div style="background: var(--color-success-bg, rgba(16, 185, 129, 0.1)); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: var(--color-success, #10b981); font-weight: 600; font-size: 13px;">Low Latency</div>
<div style="font-size: 12px; color: var(--color-text-muted, #64748b);">Immediate response</div>
</div>
<div style="background: var(--color-error-bg, rgba(239, 68, 68, 0.1)); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: var(--color-error, #ef4444); font-weight: 600; font-size: 13px;">Data Loss Risk</div>
<div style="font-size: 12px; color: var(--color-text-muted, #64748b);">If cache crashes</div>
</div>
<div style="background: var(--color-info-bg, rgba(59, 130, 246, 0.1)); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: var(--color-info, #3b82f6); font-weight: 600; font-size: 13px;">Best For</div>
<div style="font-size: 12px; color: var(--color-text-muted, #64748b);">Write-heavy apps</div>
</div>
</div>
</div>
</div>

### Write-Around Strategy {#write-around}

<div class="diagram-container">
<div class="flow-diagram">
<div style="text-align: center; margin-bottom: 16px; font-weight: 600; color: var(--color-text-primary, #1e293b);">WRITE-AROUND: Bypass Cache on Write</div>
<div class="flow-row">
<div class="flow-box primary">
<div class="flow-box-title">Application</div>
<div class="flow-box-subtitle">Write Request</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box warning">
<div class="flow-box-title">Database</div>
<div class="flow-box-subtitle">Write Directly</div>
</div>
</div>
<div style="margin-top: 16px; text-align: center;">
<div style="display: inline-block; padding: 8px 16px; background: var(--color-bg-tertiary, #f1f5f9); border-radius: 20px; font-size: 12px; color: var(--color-text-muted, #64748b);">Cache is NOT updated on write</div>
</div>
<div class="flow-row" style="margin-top: 16px;">
<div class="flow-box info">
<div class="flow-box-title">Read Request</div>
<div class="flow-box-subtitle">Cache Miss</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box purple">
<div class="flow-box-title">Fetch & Cache</div>
<div class="flow-box-subtitle">On Demand</div>
</div>
</div>
<div style="margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px;">
<div style="background: var(--color-success-bg, rgba(16, 185, 129, 0.1)); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: var(--color-success, #10b981); font-weight: 600; font-size: 13px;">No Cache Churn</div>
<div style="font-size: 12px; color: var(--color-text-muted, #64748b);">Write once, read never</div>
</div>
<div style="background: var(--color-error-bg, rgba(239, 68, 68, 0.1)); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: var(--color-error, #ef4444); font-weight: 600; font-size: 13px;">Initial Miss</div>
<div style="font-size: 12px; color: var(--color-text-muted, #64748b);">First read is slow</div>
</div>
<div style="background: var(--color-info-bg, rgba(59, 130, 246, 0.1)); padding: 12px; border-radius: 8px; text-align: center;">
<div style="color: var(--color-info, #3b82f6); font-weight: 600; font-size: 13px;">Best For</div>
<div style="font-size: 12px; color: var(--color-text-muted, #64748b);">Infrequent reads</div>
</div>
</div>
</div>
</div>

### Strategy Comparison {#strategy-comparison}

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; color: #1e293b; font-size: 14px;">
  <thead>
<tr style="background: #e2e8f0;">
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Strategy</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Read Path</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Write Path</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Best For</th>
</tr>
  </thead>
  <tbody>
<tr style="background: #ffffff;">
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Cache-Aside</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">App checks cache, then DB</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Update DB, invalidate cache</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">General purpose</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Write-Through</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Read from cache</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Write to cache AND DB together</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Strong consistency needed</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Write-Back</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Read from cache</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Write to cache, async DB write</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Write-heavy workloads</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600;">Write-Around</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">App checks cache, then DB</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Write directly to DB only</td>
<td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">Write-once, rarely-read data</td>
</tr>
<tr style="background: #ffffff;">
<td style="padding: 12px; font-weight: 600;">Read-Through</td>
<td style="padding: 12px;">Cache fetches from DB on miss</td>
<td style="padding: 12px;">N/A</td>
<td style="padding: 12px;">Simplified read logic</td>
</tr>
  </tbody>
</table>
</div>
</div>

---

## Eviction Policies {#eviction-policies}

<div class="diagram-container">
<div style="text-align: center; margin-bottom: 20px; font-weight: 600; color: var(--color-text-primary, #1e293b);">WHEN THE CACHE IS FULL, WHO GETS EVICTED?</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; width: 100%;">
<div class="data-card data-card-accent success">
<div class="data-card-content">
<div class="data-card-title">LRU (Least Recently Used)</div>
<div class="data-card-description">Evict item not accessed longest. Most popular choice.</div>
<div style="color: var(--color-text-muted, #64748b); font-size: 12px; margin-top: 8px; font-style: italic;">"Haven't used this in ages? Out!"</div>
</div>
</div>
<div class="data-card data-card-accent info">
<div class="data-card-content">
<div class="data-card-title">LFU (Least Frequently Used)</div>
<div class="data-card-description">Evict item accessed fewest times overall.</div>
<div style="color: var(--color-text-muted, #64748b); font-size: 12px; margin-top: 8px; font-style: italic;">"Only used twice ever? Goodbye!"</div>
</div>
</div>
<div class="data-card data-card-accent warning">
<div class="data-card-content">
<div class="data-card-title">FIFO (First In First Out)</div>
<div class="data-card-description">Evict oldest item regardless of usage.</div>
<div style="color: var(--color-text-muted, #64748b); font-size: 12px; margin-top: 8px; font-style: italic;">"You were here first, now leave first."</div>
</div>
</div>
<div class="data-card data-card-accent purple">
<div class="data-card-content">
<div class="data-card-title">TTL (Time To Live)</div>
<div class="data-card-description">Items expire after set time period.</div>
<div style="color: var(--color-text-muted, #64748b); font-size: 12px; margin-top: 8px; font-style: italic;">"Your time is up!"</div>
</div>
</div>
</div>
</div>

---

## Edge Cases & Failure Modes {#edge-cases-failure-modes}

<div class="diagram-container" style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-color: #fecaca;">
<div style="width: 100%;">
<h4 style="color: #991b1b; margin: 0 0 20px 0; text-align: center;">Critical Failure Modes to Handle</h4>

<div style="display: grid; gap: 20px;">

<!-- Cache Stampede -->
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border-left: 4px solid #ef4444;">
<h5 style="color: #1e293b; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
<span style="background: #fef2f2; color: #ef4444; padding: 4px 8px; border-radius: 4px; font-size: 12px;">CRITICAL</span>
Cache Stampede (Thundering Herd)
</h5>
<div class="flow-diagram" style="padding: 16px; background: #f8fafc; border-radius: 8px; margin-bottom: 12px;">
<div class="flow-row">
<div class="flow-box warning" style="min-width: 100px;">
<div class="flow-box-title">TTL Expires</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box error" style="min-width: 120px;">
<div class="flow-box-title">1000 Requests</div>
<div class="flow-box-subtitle">All Miss</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box error" style="min-width: 100px;">
<div class="flow-box-title">DB Crash</div>
</div>
</div>
</div>
<div style="font-size: 14px; color: #475569; margin-bottom: 12px;">
<strong>Problem:</strong> When a popular cache key expires, hundreds of concurrent requests simultaneously query the database, potentially crashing it.
</div>
<div style="background: #f0fdf4; padding: 12px; border-radius: 8px;">
<div style="font-weight: 600; color: #166534; margin-bottom: 8px;">Solutions:</div>
<ul style="margin: 0; padding-left: 20px; color: #166534; font-size: 13px;">
<li><strong>Locking:</strong> Only one request regenerates cache, others wait or get stale data</li>
<li><strong>Probabilistic Early Expiration:</strong> Randomly refresh before TTL hits</li>
<li><strong>Jittered TTLs:</strong> Add random variance (e.g., 3600s +/- 300s)</li>
<li><strong>Stale-While-Revalidate:</strong> Serve stale data while refreshing in background</li>
</ul>
</div>
</div>

<!-- Stale Data -->
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b;">
<h5 style="color: #1e293b; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
<span style="background: #fefce8; color: #854d0e; padding: 4px 8px; border-radius: 4px; font-size: 12px;">HIGH</span>
Stale Data & Inconsistency
</h5>
<div class="flow-diagram" style="padding: 16px; background: #f8fafc; border-radius: 8px; margin-bottom: 12px;">
<div class="flow-row">
<div class="flow-box primary" style="min-width: 100px;">
<div class="flow-box-title">DB Update</div>
<div class="flow-box-subtitle">price = $99</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; color: var(--color-text-muted, #64748b);">
<span style="font-size: 11px;">Cache not invalidated</span>
<span>&#8594;</span>
</div>
<div class="flow-box warning" style="min-width: 100px;">
<div class="flow-box-title">Cache</div>
<div class="flow-box-subtitle">price = $149</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box error" style="min-width: 100px;">
<div class="flow-box-title">User Sees</div>
<div class="flow-box-subtitle">Wrong Price!</div>
</div>
</div>
</div>
<div style="font-size: 14px; color: #475569; margin-bottom: 12px;">
<strong>Problem:</strong> Cache shows outdated information after database updates, leading to incorrect data being served to users.
</div>
<div style="background: #f0fdf4; padding: 12px; border-radius: 8px;">
<div style="font-weight: 600; color: #166534; margin-bottom: 8px;">Solutions:</div>
<ul style="margin: 0; padding-left: 20px; color: #166534; font-size: 13px;">
<li><strong>Event-Driven Invalidation:</strong> Publish cache invalidation events via Kafka/Redis Pub-Sub</li>
<li><strong>Write-Through:</strong> Update cache and DB together synchronously</li>
<li><strong>Short TTLs:</strong> Accept brief staleness with quick expiration</li>
<li><strong>Version Keys:</strong> Include version number in cache key, increment on update</li>
</ul>
</div>
</div>

<!-- Cache Penetration -->
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border-left: 4px solid #8b5cf6;">
<h5 style="color: #1e293b; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
<span style="background: #f3e8ff; color: #7c3aed; padding: 4px 8px; border-radius: 4px; font-size: 12px;">MEDIUM</span>
Cache Penetration
</h5>
<div class="flow-diagram" style="padding: 16px; background: #f8fafc; border-radius: 8px; margin-bottom: 12px;">
<div class="flow-row">
<div class="flow-box error" style="min-width: 120px;">
<div class="flow-box-title">user_id=99999</div>
<div class="flow-box-subtitle">Does not exist</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box warning" style="min-width: 100px;">
<div class="flow-box-title">Cache Miss</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box warning" style="min-width: 100px;">
<div class="flow-box-title">DB Miss</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box error" style="min-width: 80px;">
<div class="flow-box-title">Repeat</div>
</div>
</div>
</div>
<div style="font-size: 14px; color: #475569; margin-bottom: 12px;">
<strong>Problem:</strong> Queries for non-existent data always miss cache and hit database. Attackers can exploit this with fake IDs.
</div>
<div style="background: #f0fdf4; padding: 12px; border-radius: 8px;">
<div style="font-weight: 600; color: #166534; margin-bottom: 8px;">Solutions:</div>
<ul style="margin: 0; padding-left: 20px; color: #166534; font-size: 13px;">
<li><strong>Cache Negative Results:</strong> Store "null" or empty result with short TTL</li>
<li><strong>Bloom Filter:</strong> Pre-check if key could exist before querying</li>
<li><strong>Input Validation:</strong> Reject obviously invalid IDs before cache lookup</li>
</ul>
</div>
</div>

<!-- Hot Key Problem -->
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border-left: 4px solid #3b82f6;">
<h5 style="color: #1e293b; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
<span style="background: #eff6ff; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 12px;">MEDIUM</span>
Hot Key Problem
</h5>
<div class="flow-diagram" style="padding: 16px; background: #f8fafc; border-radius: 8px; margin-bottom: 12px;">
<div class="flow-row">
<div class="flow-box primary" style="min-width: 120px;">
<div class="flow-box-title">Viral Tweet</div>
<div class="flow-box-subtitle">1M requests/sec</div>
</div>
<div class="flow-arrow">&#8594;</div>
<div class="flow-box error" style="min-width: 120px;">
<div class="flow-box-title">Single Shard</div>
<div class="flow-box-subtitle">Overwhelmed</div>
</div>
</div>
</div>
<div style="font-size: 14px; color: #475569; margin-bottom: 12px;">
<strong>Problem:</strong> One extremely popular key (viral content, celebrity profile) receives disproportionate traffic, overwhelming a single cache node.
</div>
<div style="background: #f0fdf4; padding: 12px; border-radius: 8px;">
<div style="font-weight: 600; color: #166534; margin-bottom: 8px;">Solutions:</div>
<ul style="margin: 0; padding-left: 20px; color: #166534; font-size: 13px;">
<li><strong>Key Replication:</strong> Store same key on multiple shards with suffix (key_1, key_2, ...)</li>
<li><strong>Local Caching:</strong> Add in-process cache layer for hot keys</li>
<li><strong>Read Replicas:</strong> Distribute reads across replica nodes</li>
</ul>
</div>
</div>

<!-- Eviction Storm -->
<div style="background: #ffffff; border-radius: 12px; padding: 20px; border-left: 4px solid #22c55e;">
<h5 style="color: #1e293b; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
<span style="background: #f0fdf4; color: #166534; padding: 4px 8px; border-radius: 4px; font-size: 12px;">LOW</span>
Memory Pressure & Eviction Storm
</h5>
<div style="font-size: 14px; color: #475569; margin-bottom: 12px;">
<strong>Problem:</strong> Cache memory fills up, causing frequent evictions. Useful data gets evicted, hit rate drops, database load spikes.
</div>
<div style="background: #f0fdf4; padding: 12px; border-radius: 8px;">
<div style="font-weight: 600; color: #166534; margin-bottom: 8px;">Solutions:</div>
<ul style="margin: 0; padding-left: 20px; color: #166534; font-size: 13px;">
<li><strong>Monitor Memory Usage:</strong> Alert when cache exceeds 80% capacity</li>
<li><strong>Right-size Cache:</strong> Provision based on working set size, not total data</li>
<li><strong>Tiered Caching:</strong> Use multiple cache layers (L1: hot data, L2: warm data)</li>
<li><strong>Set Max-Memory Policies:</strong> Configure Redis maxmemory-policy appropriately</li>
</ul>
</div>
</div>

</div>
</div>
</div>

---

## Real-Life Failure Story {#real-life-failure-story}

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 2px solid #fecaca; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #991b1b; margin: 0 0 16px 0; font-size: 16px;">The Facebook Cache Stampede (2010)</h4>

<div style="color: #1e293b; font-size: 14px; line-height: 1.7;">
<p><strong>What Happened:</strong> Facebook experienced a major outage when a bug caused their entire Memcached cluster to invalidate simultaneously. When cache entries expired at the same time:</p>

<ol style="color: #475569; margin: 12px 0;">
<li>Millions of requests found empty caches (cache miss)</li>
<li>All requests hit the database simultaneously</li>
<li>Database servers were overwhelmed and crashed</li>
<li>Even after restart, the stampede repeated</li>
</ol>

<p><strong>The Fix:</strong></p>
<ul style="color: #475569; margin: 12px 0;">
<li><strong>Jittered TTLs:</strong> Added random variation to expiration times (e.g., 3600s +/- 300s)</li>
<li><strong>Locking:</strong> Only one request regenerates cache, others wait</li>
<li><strong>Stale-while-revalidate:</strong> Serve stale data while refreshing in background</li>
</ul>

<p><strong>Lesson:</strong> Never let cache entries expire at the same time. Add randomization to everything in distributed systems.</p>
</div>
</div>

---

## What to Watch Out For {#what-to-watch-out-for}

<div class="diagram-container">
<h4 style="color: var(--color-text-primary, #1e293b); margin: 0 0 16px 0; text-align: center;">Common Pitfalls</h4>
<div style="display: grid; gap: 12px; width: 100%;">
<div class="data-card data-card-accent error">
<div class="data-card-content">
<div class="data-card-title">Cache Stampede</div>
<div class="data-card-description">Many requests hit database when cache expires. Use locking or jittered TTLs.</div>
</div>
</div>
<div class="data-card data-card-accent warning">
<div class="data-card-content">
<div class="data-card-title">Stale Data</div>
<div class="data-card-description">Cache shows outdated information. Implement proper invalidation or use short TTLs.</div>
</div>
</div>
<div class="data-card data-card-accent purple">
<div class="data-card-content">
<div class="data-card-title">Cache Penetration</div>
<div class="data-card-description">Queries for non-existent data always miss cache. Cache negative results too.</div>
</div>
</div>
<div class="data-card data-card-accent info">
<div class="data-card-content">
<div class="data-card-title">Hot Key Problem</div>
<div class="data-card-description">One popular key overwhelms a single cache node. Replicate hot keys or use local caching.</div>
</div>
</div>
<div class="data-card data-card-accent success">
<div class="data-card-content">
<div class="data-card-title">Memory Pressure</div>
<div class="data-card-description">Cache grows unbounded. Set memory limits and monitor eviction rates.</div>
</div>
</div>
</div>
</div>

---

## Interview Deep Dive {#interview-deep-dive}

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin: 0 0 16px 0; font-size: 16px;">Common Interview Questions</h4>

<div style="margin-bottom: 20px;">
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Q: How do you handle cache invalidation in a distributed system?</div>
<div style="color: #475569; font-size: 14px; background: #ffffff; padding: 12px; border-radius: 6px;">
<strong>A:</strong> Multiple approaches: (1) <strong>TTL-based</strong> - set expiration, accept some staleness. (2) <strong>Event-driven</strong> - publish invalidation events via Kafka/Redis Pub-Sub when data changes. (3) <strong>Version-based</strong> - include version in cache key, increment on updates. For strong consistency, use write-through with distributed locks.
</div>
</div>

<div style="margin-bottom: 20px;">
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Q: Redis vs Memcached - when would you choose each?</div>
<div style="color: #475569; font-size: 14px; background: #ffffff; padding: 12px; border-radius: 6px;">
<strong>A:</strong> <strong>Redis</strong> when you need: data structures (lists, sets, sorted sets), persistence, pub/sub, Lua scripting, replication. <strong>Memcached</strong> when you need: simple key-value, multi-threaded performance, less memory overhead per key, or already have it in your stack. Redis is more versatile; Memcached is simpler and slightly faster for basic operations.
</div>
</div>

<div style="margin-bottom: 20px;">
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Q: How do you prevent cache stampede?</div>
<div style="color: #475569; font-size: 14px; background: #ffffff; padding: 12px; border-radius: 6px;">
<strong>A:</strong> (1) <strong>Locking</strong> - only one request regenerates, others wait or return stale. (2) <strong>Probabilistic early expiration</strong> - randomly refresh before TTL. (3) <strong>Background refresh</strong> - async job refreshes popular keys. (4) <strong>Jittered TTLs</strong> - add randomness to prevent synchronized expiry.
</div>
</div>

<div>
<div style="color: #1e293b; font-weight: 600; margin-bottom: 8px;">Q: When should you NOT use caching?</div>
<div style="color: #475569; font-size: 14px; background: #ffffff; padding: 12px; border-radius: 6px;">
<strong>A:</strong> (1) <strong>Highly dynamic data</strong> that changes every request. (2) <strong>Strong consistency requirements</strong> where stale reads are unacceptable (financial transactions). (3) <strong>Low-traffic endpoints</strong> where cache hit rate would be low. (4) <strong>Large, unique datasets</strong> that don't fit in memory. (5) <strong>Security-sensitive data</strong> that shouldn't persist outside the database.
</div>
</div>
</div>

---

## Code Implementation {#code-implementation}

### Python - Production Cache with Stampede Prevention {#python-production-cache}

```python
import time
import threading
import hashlib
import random
from typing import Optional, Callable, Any
from dataclasses import dataclass

@dataclass
class CacheEntry:
    value: Any
    expires_at: float
    created_at: float

class ProductionCache:
    """
    Production-ready cache with:
    - TTL with jitter (prevents stampede)
    - Locking for cache regeneration
    - Stale-while-revalidate
    - Cache statistics
    """

    def __init__(self, max_size: int = 10000, default_ttl: int = 3600):
        self.cache: dict[str, CacheEntry] = {}
        self.max_size = max_size
        self.default_ttl = default_ttl
        self.locks: dict[str, threading.Lock] = {}
        self.lock_mutex = threading.Lock()

        # Statistics
        self.hits = 0
        self.misses = 0

    def _get_lock(self, key: str) -> threading.Lock:
        """Get or create a lock for a specific key."""
        with self.lock_mutex:
            if key not in self.locks:
                self.locks[key] = threading.Lock()
            return self.locks[key]

    def _add_jitter(self, ttl: int) -> float:
        """Add 10% random jitter to TTL."""
        jitter = ttl * 0.1 * random.random()
        return ttl + jitter

    def get(self, key: str) -> Optional[Any]:
        """Get value from cache."""
        entry = self.cache.get(key)

        if entry is None:
            self.misses += 1
            return None

        if time.time() > entry.expires_at:
            self.misses += 1
            return None

        self.hits += 1
        return entry.value

    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> None:
        """Set value in cache with jittered TTL."""
        ttl = ttl or self.default_ttl
        jittered_ttl = self._add_jitter(ttl)

        # Evict if at capacity (simple LRU would be better)
        if len(self.cache) >= self.max_size:
            oldest_key = min(self.cache, key=lambda k: self.cache[k].created_at)
            del self.cache[oldest_key]

        self.cache[key] = CacheEntry(
            value=value,
            expires_at=time.time() + jittered_ttl,
            created_at=time.time()
        )

    def get_or_set(
        self,
        key: str,
        loader: Callable[[], Any],
        ttl: Optional[int] = None,
        stale_ttl: int = 60
    ) -> Any:
        """
        Get from cache or load with stampede prevention.

        Uses locking to ensure only one request loads data.
        Others wait or return stale data.
        """
        entry = self.cache.get(key)
        now = time.time()

        # Fresh cache hit
        if entry and now < entry.expires_at:
            self.hits += 1
            return entry.value

        # Stale data available?
        stale_value = entry.value if entry else None
        stale_available = entry and now < entry.expires_at + stale_ttl

        # Try to acquire lock
        lock = self._get_lock(key)
        acquired = lock.acquire(blocking=not stale_available)

        if not acquired:
            # Couldn't get lock, return stale if available
            self.hits += 1  # Serving stale
            return stale_value

        try:
            # Double-check after acquiring lock
            entry = self.cache.get(key)
            if entry and time.time() < entry.expires_at:
                return entry.value

            # Load fresh data
            self.misses += 1
            value = loader()
            self.set(key, value, ttl)
            return value
        finally:
            lock.release()

    def invalidate(self, key: str) -> bool:
        """Remove key from cache."""
        if key in self.cache:
            del self.cache[key]
            return True
        return False

    def invalidate_pattern(self, pattern: str) -> int:
        """Invalidate all keys matching pattern (simple prefix match)."""
        keys_to_delete = [k for k in self.cache if k.startswith(pattern)]
        for key in keys_to_delete:
            del self.cache[key]
        return len(keys_to_delete)

    def stats(self) -> dict:
        """Get cache statistics."""
        total = self.hits + self.misses
        return {
            "hits": self.hits,
            "misses": self.misses,
            "hit_rate": self.hits / total if total > 0 else 0,
            "size": len(self.cache),
            "max_size": self.max_size
        }


# Usage Example
cache = ProductionCache(max_size=10000, default_ttl=3600)

def get_user(user_id: int) -> dict:
    """Get user with caching."""
    cache_key = f"user:{user_id}"

    def load_from_db():
        # Simulate database query
        return {"id": user_id, "name": f"User {user_id}"}

    return cache.get_or_set(cache_key, load_from_db, ttl=300)

# First call - cache miss, loads from DB
user = get_user(123)

# Second call - cache hit
user = get_user(123)

# Check stats
print(cache.stats())
# {'hits': 1, 'misses': 1, 'hit_rate': 0.5, 'size': 1, 'max_size': 10000}
```

### Python - Distributed Cache with Redis {#python-redis-cache}

```python
import redis
import json
import time
from typing import Optional, Any, Callable

class RedisCache:
    """Redis-backed distributed cache."""

    def __init__(self, host: str = 'localhost', port: int = 6379, db: int = 0):
        self.client = redis.Redis(host=host, port=port, db=db, decode_responses=True)
        self.default_ttl = 3600

    def get(self, key: str) -> Optional[Any]:
        """Get value from Redis."""
        value = self.client.get(key)
        if value:
            return json.loads(value)
        return None

    def set(self, key: str, value: Any, ttl: Optional[int] = None) -> None:
        """Set value in Redis with TTL."""
        ttl = ttl or self.default_ttl
        self.client.setex(key, ttl, json.dumps(value))

    def get_or_set(
        self,
        key: str,
        loader: Callable[[], Any],
        ttl: Optional[int] = None
    ) -> Any:
        """Get from cache or load with distributed locking."""
        # Try cache first
        value = self.get(key)
        if value is not None:
            return value

        # Distributed lock using SETNX
        lock_key = f"lock:{key}"
        lock_acquired = self.client.setnx(lock_key, "1")

        if lock_acquired:
            self.client.expire(lock_key, 30)  # Lock timeout
            try:
                value = loader()
                self.set(key, value, ttl)
                return value
            finally:
                self.client.delete(lock_key)
        else:
            # Wait and retry
            time.sleep(0.1)
            return self.get(key) or loader()

    def invalidate(self, key: str) -> bool:
        """Delete key from Redis."""
        return self.client.delete(key) > 0

    def invalidate_pattern(self, pattern: str) -> int:
        """Delete keys matching pattern."""
        keys = self.client.keys(pattern)
        if keys:
            return self.client.delete(*keys)
        return 0
```

---

## Quick Reference Card {#quick-reference-card}

<div class="diagram-container">
<h4 style="color: var(--color-text-primary, #1e293b); text-align: center; margin: 0 0 20px 0;">CACHING CHEAT SHEET</h4>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; width: 100%;">
<div style="background: var(--color-bg-primary, #ffffff); border-radius: 8px; padding: 16px;">
<div style="color: var(--color-text-primary, #1e293b); font-weight: 600; margin-bottom: 8px; border-bottom: 1px solid var(--color-border, #e2e8f0); padding-bottom: 8px;">When to Cache</div>
<ul style="color: var(--color-text-secondary, #475569); font-size: 13px; margin: 0; padding-left: 16px;">
<li>Read-heavy workloads (read:write > 10:1)</li>
<li>Expensive computations</li>
<li>Slow external API calls</li>
<li>Database query results</li>
<li>Session data</li>
</ul>
</div>

<div style="background: var(--color-bg-primary, #ffffff); border-radius: 8px; padding: 16px;">
<div style="color: var(--color-text-primary, #1e293b); font-weight: 600; margin-bottom: 8px; border-bottom: 1px solid var(--color-border, #e2e8f0); padding-bottom: 8px;">When NOT to Cache</div>
<ul style="color: var(--color-text-secondary, #475569); font-size: 13px; margin: 0; padding-left: 16px;">
<li>Rapidly changing data</li>
<li>Write-heavy workloads</li>
<li>Unique queries (low hit rate)</li>
<li>Sensitive financial data</li>
<li>Real-time requirements</li>
</ul>
</div>

<div style="background: var(--color-bg-primary, #ffffff); border-radius: 8px; padding: 16px;">
<div style="color: var(--color-text-primary, #1e293b); font-weight: 600; margin-bottom: 8px; border-bottom: 1px solid var(--color-border, #e2e8f0); padding-bottom: 8px;">TTL Guidelines</div>
<ul style="color: var(--color-text-secondary, #475569); font-size: 13px; margin: 0; padding-left: 16px;">
<li>Static assets: 1 year</li>
<li>User profiles: 1 hour</li>
<li>API responses: 5-15 minutes</li>
<li>Search results: 1-5 minutes</li>
<li>Real-time data: 10-30 seconds</li>
</ul>
</div>

<div style="background: var(--color-bg-primary, #ffffff); border-radius: 8px; padding: 16px;">
<div style="color: var(--color-text-primary, #1e293b); font-weight: 600; margin-bottom: 8px; border-bottom: 1px solid var(--color-border, #e2e8f0); padding-bottom: 8px;">Key Metrics</div>
<ul style="color: var(--color-text-secondary, #475569); font-size: 13px; margin: 0; padding-left: 16px;">
<li>Hit rate > 90% (for hot data)</li>
<li>Latency p99 < 10ms</li>
<li>Memory usage < 80%</li>
<li>Eviction rate (should be low)</li>
<li>Connection count</li>
</ul>
</div>
</div>

<div style="margin-top: 16px; padding: 12px; background: var(--color-bg-primary, #ffffff); border-radius: 8px; text-align: center;">
<code style="color: var(--color-text-primary, #1e293b); font-size: 13px;">Cache Rule: "Cache data that is read often, written rarely, and can tolerate some staleness"</code>
</div>
</div>

---

## Related Topics {#related-topics}

- [CDN](/topic/system-design/cdn) - Edge caching for static content
- [Database Replication](/topic/system-design/database-replication) - Data redundancy
- [Load Balancing](/topic/system-design/load-balancing) - Request distribution
- [Redis](/topic/system-design/redis) - Popular caching solution
