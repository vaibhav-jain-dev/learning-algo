# Flyweight Pattern

## Overview

The Flyweight pattern is a structural design pattern that achieves massive memory optimization by **sharing common state across multiple objects** rather than duplicating it. The pattern separates object state into two categories: **intrinsic state** (shared, immutable) and **extrinsic state** (unique, context-dependent). This separation allows thousands or millions of conceptual objects to share a handful of actual instances.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-left: 4px solid #e94560; padding: 20px; border-radius: 8px; margin: 20px 0;">
<h4 style="color: #e94560; margin-top: 0;">Core Insight</h4>
<p style="color: #eee; margin-bottom: 0;">The Flyweight pattern trades <strong>computational complexity</strong> for <strong>memory efficiency</strong>. Instead of storing data with each object, you store it once and compute lookups at runtime. This is only beneficial when: (1) you have many objects, (2) storage costs are significant, and (3) most state can be externalized.</p>
</div>

### Pattern Classification

| Aspect | Classification |
|--------|----------------|
| **Type** | Structural Pattern |
| **Intent** | Share fine-grained objects efficiently |
| **Problem Solved** | Memory exhaustion from object proliferation |
| **Key Mechanism** | State separation + object pooling |

---

## Intrinsic vs Extrinsic State

The most critical decision in implementing Flyweight is correctly partitioning state. This partitioning determines the pattern's effectiveness and correctness.

### Intrinsic State (Shared)

Intrinsic state represents the **context-independent, immutable properties** that can be shared across all uses of a flyweight. This state is stored inside the flyweight object itself.

<div style="background: #0d1117; border: 1px solid #30363d; border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #58a6ff; margin-top: 0;">Characteristics of Intrinsic State</h4>
<ul style="color: #c9d1d9;">
<li><strong>Immutable</strong>: Cannot change after flyweight creation (enables safe sharing)</li>
<li><strong>Context-Free</strong>: Same value regardless of where/how the flyweight is used</li>
<li><strong>Identity-Defining</strong>: Uniquely identifies the flyweight type</li>
<li><strong>Memory-Heavy</strong>: Typically the expensive data (textures, fonts, compiled regex)</li>
</ul>
</div>

**Examples of Intrinsic State:**
- Character font family, size, weight in a text editor
- Sprite texture, animation frames in a game
- Tree species mesh data, bark texture in a forest simulation
- Compiled regex pattern in a validation framework

### Extrinsic State (Unique)

Extrinsic state represents the **context-dependent, variable properties** that differ for each logical use of a flyweight. This state is NOT stored in the flyweight; instead, it is passed to flyweight methods by the client.

<div style="background: #0d1117; border: 1px solid #30363d; border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #f0883e; margin-top: 0;">Characteristics of Extrinsic State</h4>
<ul style="color: #c9d1d9;">
<li><strong>Mutable</strong>: Can change independently for each usage context</li>
<li><strong>Context-Dependent</strong>: Different values for different usages</li>
<li><strong>Lightweight</strong>: Typically simple values (coordinates, indices, timestamps)</li>
<li><strong>Client-Managed</strong>: Client code is responsible for storing and passing this state</li>
</ul>
</div>

**Examples of Extrinsic State:**
- Character position (x, y) in a text editor
- Enemy position, health, current animation frame in a game
- Tree position, current growth stage, wind sway offset in a forest
- Input string to validate against a compiled regex

### State Partitioning Decision Framework

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #7dd3fc; margin-top: 0;">Decision Criteria</h4>
<table style="width: 100%; color: #e2e8f0; border-collapse: collapse;">
<tr style="border-bottom: 1px solid #475569;">
<th style="text-align: left; padding: 8px;">Question</th>
<th style="text-align: left; padding: 8px;">If Yes</th>
<th style="text-align: left; padding: 8px;">If No</th>
</tr>
<tr style="border-bottom: 1px solid #334155;">
<td style="padding: 8px;">Is the value the same across all usages?</td>
<td style="padding: 8px;">Intrinsic</td>
<td style="padding: 8px;">Extrinsic</td>
</tr>
<tr style="border-bottom: 1px solid #334155;">
<td style="padding: 8px;">Does the value change over time?</td>
<td style="padding: 8px;">Extrinsic</td>
<td style="padding: 8px;">Possibly Intrinsic</td>
</tr>
<tr style="border-bottom: 1px solid #334155;">
<td style="padding: 8px;">Is the value expensive to store?</td>
<td style="padding: 8px;">Prioritize as Intrinsic</td>
<td style="padding: 8px;">Either (low impact)</td>
</tr>
<tr>
<td style="padding: 8px;">Can the value be computed from context?</td>
<td style="padding: 8px;">Extrinsic candidate</td>
<td style="padding: 8px;">Intrinsic candidate</td>
</tr>
</table>
</div>

### Interview Questions: Intrinsic vs Extrinsic State

<div style="background: #1a1a2e; border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #ffd700; margin-top: 0;">Level 1: Conceptual Understanding</h4>
<p style="color: #ccc;"><strong>Q: What happens if you accidentally include mutable state in the intrinsic portion?</strong></p>
<p style="color: #9ca3af; font-style: italic;">A: This creates a race condition/data corruption bug. Since flyweights are shared, mutating intrinsic state affects ALL contexts using that flyweight simultaneously. For example, if "current animation frame" were intrinsic, advancing one enemy's animation would advance ALL enemies of that type.</p>

<h4 style="color: #ff6b6b; margin-top: 15px;">Level 2: Design Trade-offs</h4>
<p style="color: #ccc;"><strong>Q: A game has 10,000 trees. Each tree has: species (Oak/Pine/Birch), mesh data (10MB), position (x,y,z), and "health" that decreases when hit. An artist wants different "damage textures" at health thresholds 100%, 75%, 50%, 25%. How do you partition state?</strong></p>
<p style="color: #9ca3af; font-style: italic;">A: Intrinsic: species + damage-level creates composite key. Create flyweights for (Oak, 100%), (Oak, 75%), etc. = 3 species x 4 damage levels = 12 flyweights storing mesh variations. Extrinsic: position (x,y,z), exact health value. When health crosses threshold, client switches flyweight reference. Trade-off: 12 flyweights x 10MB = 120MB vs naive 10,000 x 10MB = 100GB.</p>

<h4 style="color: #a855f7; margin-top: 15px;">Level 3: System Architecture</h4>
<p style="color: #ccc;"><strong>Q: You're building a distributed text editor where multiple users edit simultaneously. Document characters use Flyweight for styling. How do you handle: (1) style conflicts when users edit same region, (2) undo/redo with flyweights, (3) syncing flyweight pools across nodes?</strong></p>
<p style="color: #9ca3af; font-style: italic;">A: (1) Style conflicts: Flyweights are immutable, so no conflict on intrinsic state. Conflict is on extrinsic mapping (which char has which style). Use [[CRDT]](/topic/distributed-systems/crdt) or OT for character-to-style-reference mapping. (2) Undo/redo: Store operation log of (position, old_flyweight_ref, new_flyweight_ref). Flyweights themselves never undo - just swap references. (3) Pool sync: Don't sync pools directly. Each node maintains local pool. Sync style-keys (font, size, color tuples), not objects. Nodes lazily create flyweights on first local use of a key. Pool convergence is eventual and doesn't affect correctness since flyweights with same intrinsic state are semantically identical.</p>
</div>

---

## The Flyweight Factory

The Flyweight Factory is the centralized component responsible for **creating, caching, and dispensing flyweight instances**. It ensures that flyweights are shared properly and that duplicate flyweights are never created.

### Factory Responsibilities

1. **Identity Management**: Map unique keys to flyweight instances
2. **Lazy Creation**: Create flyweights on first request, not upfront
3. **Cache Maintenance**: Store and retrieve existing flyweights
4. **Thread Safety**: Ensure correct behavior under concurrent access

### Implementation Patterns

<div style="background: linear-gradient(135deg, #064e3b 0%, #065f46 100%); border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #6ee7b7; margin-top: 0;">Factory Implementation Strategies</h4>
<table style="width: 100%; color: #d1fae5; border-collapse: collapse;">
<tr style="border-bottom: 1px solid #10b981;">
<th style="text-align: left; padding: 8px;">Strategy</th>
<th style="text-align: left; padding: 8px;">Pros</th>
<th style="text-align: left; padding: 8px;">Cons</th>
</tr>
<tr style="border-bottom: 1px solid #059669;">
<td style="padding: 8px;"><strong>HashMap + Lazy Init</strong></td>
<td style="padding: 8px;">Simple, memory-efficient</td>
<td style="padding: 8px;">Requires synchronization</td>
</tr>
<tr style="border-bottom: 1px solid #059669;">
<td style="padding: 8px;"><strong>Enum-based (finite set)</strong></td>
<td style="padding: 8px;">Type-safe, no factory needed</td>
<td style="padding: 8px;">Only for bounded flyweight sets</td>
</tr>
<tr style="border-bottom: 1px solid #059669;">
<td style="padding: 8px;"><strong>Weak References</strong></td>
<td style="padding: 8px;">Auto-eviction when unused</td>
<td style="padding: 8px;">Non-deterministic, GC pressure</td>
</tr>
<tr>
<td style="padding: 8px;"><strong>LRU Cache</strong></td>
<td style="padding: 8px;">Bounded memory, eviction policy</td>
<td style="padding: 8px;">May recreate evicted flyweights</td>
</tr>
</table>
</div>

### Thread-Safe Factory Implementation

```python
from threading import Lock
from typing import Dict, Tuple, Optional
import weakref


class CharacterStyle:
    """Flyweight: Immutable shared character styling."""

    __slots__ = ('font', 'size', 'color', 'bold', '_hash')

    def __init__(self, font: str, size: int, color: str, bold: bool = False):
        # All attributes set once during construction - immutability enforced
        object.__setattr__(self, 'font', font)
        object.__setattr__(self, 'size', size)
        object.__setattr__(self, 'color', color)
        object.__setattr__(self, 'bold', bold)
        # Pre-compute hash for efficient factory lookups
        object.__setattr__(self, '_hash', hash((font, size, color, bold)))

    def __setattr__(self, name, value):
        raise AttributeError("CharacterStyle is immutable")

    def __hash__(self):
        return self._hash

    def __eq__(self, other):
        if not isinstance(other, CharacterStyle):
            return False
        return (self.font == other.font and self.size == other.size and
                self.color == other.color and self.bold == other.bold)

    def render(self, char: str, x: int, y: int) -> str:
        """Apply styling to character at position (extrinsic state passed in)."""
        weight = "bold " if self.bold else ""
        return f"'{char}' at ({x},{y}) in {weight}{self.font} {self.size}pt {self.color}"


class StyleFactory:
    """
    Thread-safe Flyweight Factory with multiple eviction strategies.

    Design decisions:
    - Double-checked locking for performance
    - Composite key avoids string concatenation overhead
    - Optional weak references for automatic cleanup
    """

    _instance: Optional['StyleFactory'] = None
    _instance_lock = Lock()

    def __new__(cls):
        # Singleton factory - single source of truth for flyweights
        if cls._instance is None:
            with cls._instance_lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self._styles: Dict[Tuple, CharacterStyle] = {}
        self._lock = Lock()
        self._stats = {'hits': 0, 'misses': 0}
        self._initialized = True

    def get_style(self, font: str, size: int, color: str,
                  bold: bool = False) -> CharacterStyle:
        """
        Get or create a flyweight for the given style parameters.

        Time Complexity: O(1) amortized (hash lookup)
        Space Complexity: O(unique styles) for entire factory
        """
        key = (font, size, color, bold)

        # Fast path: check without lock (safe due to immutability)
        style = self._styles.get(key)
        if style is not None:
            self._stats['hits'] += 1
            return style

        # Slow path: acquire lock and create if needed
        with self._lock:
            # Double-check after acquiring lock
            if key not in self._styles:
                self._styles[key] = CharacterStyle(font, size, color, bold)
                self._stats['misses'] += 1
            else:
                self._stats['hits'] += 1
            return self._styles[key]

    def get_stats(self) -> Dict:
        """Return cache statistics for monitoring."""
        total = self._stats['hits'] + self._stats['misses']
        hit_rate = self._stats['hits'] / total if total > 0 else 0
        return {
            'unique_styles': len(self._styles),
            'cache_hits': self._stats['hits'],
            'cache_misses': self._stats['misses'],
            'hit_rate': f"{hit_rate:.2%}"
        }

    def clear(self):
        """Clear factory - use with caution in production."""
        with self._lock:
            self._styles.clear()
            self._stats = {'hits': 0, 'misses': 0}


class WeakStyleFactory:
    """
    Alternative factory using weak references.
    Flyweights are garbage collected when no client holds strong references.

    Trade-off: Memory efficiency vs potential re-creation overhead.
    """

    def __init__(self):
        self._styles: weakref.WeakValueDictionary = weakref.WeakValueDictionary()
        self._lock = Lock()

    def get_style(self, font: str, size: int, color: str,
                  bold: bool = False) -> CharacterStyle:
        key = (font, size, color, bold)

        with self._lock:
            style = self._styles.get(key)
            if style is None:
                style = CharacterStyle(font, size, color, bold)
                self._styles[key] = style
            return style
```

### Interview Questions: Flyweight Factory

<div style="background: #1a1a2e; border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #ffd700; margin-top: 0;">Level 1: Implementation Details</h4>
<p style="color: #ccc;"><strong>Q: Why is double-checked locking used in the factory's get_style method?</strong></p>
<p style="color: #9ca3af; font-style: italic;">A: Double-checked locking optimizes for the common case (cache hit) by avoiding lock acquisition. First check is lock-free and fast. If miss, acquire lock and check again because another thread may have created the flyweight between the first check and lock acquisition. This reduces contention while maintaining correctness. The pattern is safe here because flyweights are immutable - a partial read still yields correct data.</p>

<h4 style="color: #ff6b6b; margin-top: 15px;">Level 2: Architectural Decisions</h4>
<p style="color: #ccc;"><strong>Q: When would you choose WeakValueDictionary over a regular dict for the flyweight cache? What are the risks?</strong></p>
<p style="color: #9ca3af; font-style: italic;">A: Use weak references when: (1) flyweight set is unbounded/unknown, (2) flyweights may become unused and you want automatic cleanup, (3) memory pressure is a concern. Risks: (1) Non-deterministic eviction - flyweight may be GC'd between get_style calls, requiring recreation. (2) GC overhead from weak reference bookkeeping. (3) Potential "thrashing" if flyweights are briefly released then immediately needed again. (4) Harder to debug - cache contents depend on GC timing. Mitigation: Use LRU cache with explicit size limit for predictable behavior.</p>

<h4 style="color: #a855f7; margin-top: 15px;">Level 3: Production Systems</h4>
<p style="color: #ccc;"><strong>Q: You're operating a flyweight factory in a high-throughput system (100K requests/sec). Profiling shows lock contention on the factory. How do you scale it?</strong></p>
<p style="color: #9ca3af; font-style: italic;">A: Multiple strategies: (1) <strong>Sharded factories</strong>: Partition keyspace (e.g., by hash of key % N) across N independent factories, each with its own lock. Reduces contention by N. (2) <strong>Lock-free ConcurrentHashMap</strong>: Languages like Java offer ConcurrentHashMap with fine-grained locking or lock-free operations. (3) <strong>Read-write lock</strong>: Allow multiple concurrent readers; only block for writes (new flyweights). Most operations are reads after warmup. (4) <strong>Pre-population</strong>: If flyweight set is known/bounded, create all flyweights at startup. Factory becomes read-only, eliminating write locks entirely. (5) <strong>Thread-local caching</strong>: Each thread maintains local cache of recently used flyweights, reducing factory access. Trade-off: memory duplication if sets diverge. Best approach often combines pre-population (for known flyweights) with sharded lazy creation (for dynamic ones).</p>
</div>

---

## String Interning: Flyweight in Language Runtimes

String interning is the **canonical example of Flyweight** implemented at the language/runtime level. It demonstrates how the pattern can be applied transparently to achieve memory optimization without explicit programmer intervention.

### How String Interning Works

<div style="background: linear-gradient(135deg, #4a1d6b 0%, #6b21a8 100%); border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #e9d5ff; margin-top: 0;">String Pool Mechanics</h4>
<p style="color: #ddd;">When a string is interned, the runtime:</p>
<ol style="color: #ddd;">
<li>Computes a hash of the string content</li>
<li>Looks up the hash in a global string pool (hash table)</li>
<li>If found: returns reference to existing string (flyweight reuse)</li>
<li>If not found: adds string to pool, returns reference to new entry</li>
</ol>
<p style="color: #ddd; margin-bottom: 0;"><strong>Result</strong>: All references to the same string content point to the same object in memory. Equality comparison becomes O(1) pointer comparison instead of O(n) character comparison.</p>
</div>

### Language-Specific Implementations

```python
import sys

# Python automatically interns:
# 1. String literals
# 2. Strings that look like identifiers
# 3. Keys in dictionaries (implementation detail)

a = "hello"
b = "hello"
c = "hel" + "lo"  # Computed at compile time - interned
d = "".join(['h', 'e', 'l', 'l', 'o'])  # Runtime computation - NOT interned

print(f"a is b: {a is b}")  # True - same object
print(f"a is c: {a is c}")  # True - compile-time constant folding
print(f"a is d: {a is d}")  # False - runtime string not interned
print(f"a == d: {a == d}")  # True - equal content

# Manual interning
d_interned = sys.intern(d)
print(f"a is d_interned: {a is d_interned}")  # True

# Memory impact demonstration
strings_normal = [f"user_{i}" for i in range(10000)]
strings_interned = [sys.intern(f"user_{i % 100}") for i in range(10000)]

# strings_interned has only 100 unique string objects
# strings_normal has 10000 unique string objects
```

```go
package main

import (
    "fmt"
    "sync"
)

// Go doesn't have built-in string interning, but we can implement it.
// Note: Go strings are already immutable, making them safe for flyweight use.

type StringInterner struct {
    pool map[string]string
    mu   sync.RWMutex
}

func NewStringInterner() *StringInterner {
    return &StringInterner{
        pool: make(map[string]string),
    }
}

func (si *StringInterner) Intern(s string) string {
    // Fast path: read lock only
    si.mu.RLock()
    if interned, exists := si.pool[s]; exists {
        si.mu.RUnlock()
        return interned
    }
    si.mu.RUnlock()

    // Slow path: write lock
    si.mu.Lock()
    defer si.mu.Unlock()

    // Double-check after acquiring write lock
    if interned, exists := si.pool[s]; exists {
        return interned
    }

    si.pool[s] = s
    return s
}

func (si *StringInterner) Size() int {
    si.mu.RLock()
    defer si.mu.RUnlock()
    return len(si.pool)
}

func main() {
    interner := NewStringInterner()

    // Simulate processing log entries with repeated strings
    logLevels := []string{"INFO", "WARN", "ERROR", "DEBUG"}

    var internedLevels []string
    for i := 0; i < 10000; i++ {
        level := logLevels[i%4]
        // Without interning: each iteration might allocate new string
        // With interning: reuses existing string object
        internedLevels = append(internedLevels, interner.Intern(level))
    }

    fmt.Printf("Processed %d log entries\n", len(internedLevels))
    fmt.Printf("Unique interned strings: %d\n", interner.Size())

    // Pointer comparison now works for equality
    a := interner.Intern("ERROR")
    b := interner.Intern("ERROR")
    fmt.Printf("Same pointer: %v\n", &a == &b) // Note: this checks slice header, not string data
}
```

### Interning Trade-offs

<div style="background: #1e293b; border: 1px solid #475569; border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #f472b6; margin-top: 0;">When to Use Manual Interning</h4>
<table style="width: 100%; color: #e2e8f0; border-collapse: collapse;">
<tr style="border-bottom: 1px solid #475569;">
<th style="text-align: left; padding: 8px; color: #22c55e;">Good Candidates</th>
<th style="text-align: left; padding: 8px; color: #ef4444;">Poor Candidates</th>
</tr>
<tr>
<td style="padding: 8px; vertical-align: top;">
<ul style="margin: 0; padding-left: 20px;">
<li>Repeated enum-like strings (status codes, log levels)</li>
<li>Dictionary keys used millions of times</li>
<li>User IDs, session tokens with high reuse</li>
<li>XML/JSON field names during parsing</li>
<li>Database column names in ORM</li>
</ul>
</td>
<td style="padding: 8px; vertical-align: top;">
<ul style="margin: 0; padding-left: 20px;">
<li>Unique strings (UUIDs, timestamps)</li>
<li>User-generated content (comments, messages)</li>
<li>Large strings (documents, base64 data)</li>
<li>Short-lived strings in hot loops</li>
<li>Strings from untrusted input (DoS vector)</li>
</ul>
</td>
</tr>
</table>
</div>

### Interview Questions: String Interning

<div style="background: #1a1a2e; border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #ffd700; margin-top: 0;">Level 1: Language Behavior</h4>
<p style="color: #ccc;"><strong>Q: In Java, what's the difference between String.intern() and the string pool for literals?</strong></p>
<p style="color: #9ca3af; font-style: italic;">A: String literals are automatically added to the string pool at class loading time (stored in PermGen/Metaspace). String.intern() explicitly adds a runtime-created string to the pool if not present, returning the canonical reference. Key difference: literals are pooled at compile/load time (cheap), intern() is runtime operation (hash lookup cost). Pre-Java 7, intern() added to PermGen (fixed size, could cause OOM). Post-Java 7, pool moved to heap, reducing OOM risk but increasing GC pressure.</p>

<h4 style="color: #ff6b6b; margin-top: 15px;">Level 2: Security Implications</h4>
<p style="color: #ccc;"><strong>Q: Why can string interning from untrusted input be a denial-of-service vector?</strong></p>
<p style="color: #9ca3af; font-style: italic;">A: If you intern all strings from user input, an attacker can: (1) <strong>Memory exhaustion</strong>: Send millions of unique strings, filling the intern pool. Pool entries typically aren't garbage collected (or have weak references in some implementations). (2) <strong>Hash collision attack</strong>: Craft strings with identical hash codes, degrading hash table to O(n) linked list, making each intern() call O(n). With n malicious strings, total time becomes O(n^2). Mitigation: Never intern untrusted input. Use bounded LRU cache instead of unbounded pool. Use cryptographic hash or randomized hash seed.</p>

<h4 style="color: #a855f7; margin-top: 15px;">Level 3: System Design</h4>
<p style="color: #ccc;"><strong>Q: Design a distributed string interning system for a log aggregation service processing 1TB/day. Requirements: deduplication across nodes, bounded memory, support for string expiration.</strong></p>
<p style="color: #9ca3af; font-style: italic;">A: Architecture: (1) <strong>Local tier</strong>: Each node has LRU intern cache (bounded, e.g., 100K entries). Handles high-frequency strings locally. (2) <strong>Shared tier</strong>: [[Redis]](/topic/databases/redis) cluster with string content -> canonical ID mapping. Use SETNX for atomic intern-or-get. (3) <strong>Storage optimization</strong>: Instead of storing strings, store (hash, length, content) tuples. Use consistent hashing to partition keyspace across Redis nodes. (4) <strong>Expiration</strong>: Redis TTL on entries (e.g., 24h). Local cache uses access-time-based LRU. (5) <strong>Flow</strong>: Check local cache -> if miss, check Redis -> if miss, SETNX to Redis with TTL, update local cache. (6) <strong>Memory bound</strong>: Monitor Redis memory. If approaching limit, reduce TTL or switch to approximate dedup (bloom filter to skip known-unique strings). Trade-off: Some strings may be re-interned after expiration, but memory stays bounded. See also: [[Bloom Filters]](/topic/data-structures/bloom-filter) for approximate membership.</p>
</div>

---

## Game Character System: Complete Implementation

The game character/sprite system is the **quintessential Flyweight example** because it perfectly illustrates the memory savings when rendering thousands of entities with shared visual assets.

### Architecture Overview

<div style="background: linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%); border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #7dd3fc; margin-top: 0;">Game Flyweight Architecture</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; color: #e0f2fe;">
<div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 6px;">
<h5 style="color: #38bdf8; margin-top: 0;">Intrinsic (Shared)</h5>
<ul style="margin: 0; padding-left: 20px;">
<li>Sprite texture (10-50 MB)</li>
<li>Animation frame data</li>
<li>Sound effects</li>
<li>Base stats template</li>
<li>Collision mesh</li>
<li>AI behavior tree</li>
</ul>
</div>
<div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 6px;">
<h5 style="color: #fb923c; margin-top: 0;">Extrinsic (Per-Instance)</h5>
<ul style="margin: 0; padding-left: 20px;">
<li>Position (x, y, z)</li>
<li>Current health/mana</li>
<li>Current animation frame</li>
<li>Velocity, rotation</li>
<li>Active status effects</li>
<li>Instance-specific state</li>
</ul>
</div>
</div>
</div>

### Production-Grade Implementation

```python
from __future__ import annotations
from dataclasses import dataclass, field
from typing import Dict, List, Tuple, Optional, Protocol
from enum import Enum, auto
from abc import ABC, abstractmethod
import time
import weakref


class AnimationState(Enum):
    IDLE = auto()
    WALK = auto()
    RUN = auto()
    ATTACK = auto()
    HURT = auto()
    DIE = auto()


class CharacterClass(Enum):
    WARRIOR = "warrior"
    MAGE = "mage"
    ARCHER = "archer"
    HEALER = "healer"


@dataclass(frozen=True)  # Immutable - safe for sharing
class AnimationData:
    """Represents a single animation sequence."""
    name: str
    frame_count: int
    frame_duration_ms: int
    texture_coords: Tuple[Tuple[int, int, int, int], ...]  # (x, y, w, h) per frame

    def get_frame(self, elapsed_ms: int) -> int:
        """Calculate current frame based on elapsed time."""
        cycle_duration = self.frame_count * self.frame_duration_ms
        position_in_cycle = elapsed_ms % cycle_duration
        return position_in_cycle // self.frame_duration_ms


@dataclass(frozen=True)
class CharacterStats:
    """Base stats template - shared across all instances of a class."""
    max_health: int
    max_mana: int
    base_damage: int
    base_armor: int
    movement_speed: float


class CharacterType:
    """
    FLYWEIGHT: Shared character data.

    This object is LARGE (textures, animations, sounds) but SHARED
    across all instances of the same character type.

    Memory: ~50MB per type (textures, audio)
    Without Flyweight: 1000 warriors = 50GB
    With Flyweight: 1000 warriors = 50MB + 1000 * ~200 bytes
    """

    __slots__ = (
        'character_class', 'name', 'texture_path', '_texture_data',
        'animations', 'sound_effects', 'base_stats', 'collision_radius',
        'ai_behavior_tree', '_instance_count'
    )

    def __init__(
        self,
        character_class: CharacterClass,
        name: str,
        texture_path: str,
        animations: Dict[AnimationState, AnimationData],
        sound_effects: Dict[str, str],
        base_stats: CharacterStats,
        collision_radius: float,
        ai_behavior_tree: Optional[str] = None
    ):
        self.character_class = character_class
        self.name = name
        self.texture_path = texture_path
        self._texture_data = self._load_texture(texture_path)  # Expensive!
        self.animations = animations
        self.sound_effects = sound_effects
        self.base_stats = base_stats
        self.collision_radius = collision_radius
        self.ai_behavior_tree = ai_behavior_tree
        self._instance_count = 0  # Track how many instances use this flyweight

    def _load_texture(self, path: str) -> bytes:
        """Simulate loading large texture data."""
        # In real implementation, this loads actual GPU texture
        # Simulating 10MB texture
        return b"[TEXTURE DATA]" * 1000

    def get_animation_frame(
        self,
        state: AnimationState,
        animation_start_time: float
    ) -> Tuple[int, int, int, int]:
        """
        Get texture coordinates for current animation frame.

        Note: animation_start_time is EXTRINSIC - passed in by instance.
        """
        animation = self.animations.get(state)
        if not animation:
            animation = self.animations[AnimationState.IDLE]

        elapsed_ms = int((time.time() - animation_start_time) * 1000)
        frame_idx = animation.get_frame(elapsed_ms)
        return animation.texture_coords[frame_idx]

    def render(
        self,
        x: float, y: float, z: float,
        rotation: float,
        scale: float,
        animation_state: AnimationState,
        animation_start_time: float,
        alpha: float = 1.0
    ) -> Dict:
        """
        Render character at position with current animation.

        ALL parameters are EXTRINSIC - unique per instance.
        Method returns render command, doesn't store any state.
        """
        frame_coords = self.get_animation_frame(animation_state, animation_start_time)

        return {
            'texture': self.texture_path,
            'src_rect': frame_coords,
            'dst_position': (x, y, z),
            'rotation': rotation,
            'scale': scale,
            'alpha': alpha,
            'collision_radius': self.collision_radius * scale
        }

    def __repr__(self):
        return f"CharacterType({self.name}, instances={self._instance_count})"


class CharacterTypeFactory:
    """
    Flyweight Factory: Manages creation and caching of CharacterTypes.

    Design choices:
    - Singleton pattern ensures single factory instance
    - Lazy loading: types created on first request
    - Registration system for extensibility
    """

    _instance: Optional[CharacterTypeFactory] = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return

        self._types: Dict[str, CharacterType] = {}
        self._type_configs: Dict[str, dict] = {}
        self._register_default_types()
        self._initialized = True

    def _register_default_types(self):
        """Register built-in character type configurations."""

        # Warrior configuration
        self._type_configs["warrior"] = {
            'character_class': CharacterClass.WARRIOR,
            'name': 'Warrior',
            'texture_path': 'assets/characters/warrior.png',
            'animations': {
                AnimationState.IDLE: AnimationData(
                    "idle", 4, 200,
                    ((0, 0, 64, 64), (64, 0, 64, 64),
                     (128, 0, 64, 64), (192, 0, 64, 64))
                ),
                AnimationState.WALK: AnimationData(
                    "walk", 8, 100,
                    tuple((i * 64, 64, 64, 64) for i in range(8))
                ),
                AnimationState.ATTACK: AnimationData(
                    "attack", 6, 80,
                    tuple((i * 64, 128, 64, 64) for i in range(6))
                ),
            },
            'sound_effects': {
                'attack': 'assets/sounds/sword_swing.wav',
                'hurt': 'assets/sounds/warrior_hurt.wav',
                'die': 'assets/sounds/warrior_die.wav',
            },
            'base_stats': CharacterStats(
                max_health=150,
                max_mana=50,
                base_damage=25,
                base_armor=15,
                movement_speed=3.0
            ),
            'collision_radius': 0.5,
        }

        # Mage configuration
        self._type_configs["mage"] = {
            'character_class': CharacterClass.MAGE,
            'name': 'Mage',
            'texture_path': 'assets/characters/mage.png',
            'animations': {
                AnimationState.IDLE: AnimationData(
                    "idle", 4, 250,
                    ((0, 0, 64, 64), (64, 0, 64, 64),
                     (128, 0, 64, 64), (192, 0, 64, 64))
                ),
                AnimationState.ATTACK: AnimationData(
                    "cast", 8, 60,
                    tuple((i * 64, 64, 64, 64) for i in range(8))
                ),
            },
            'sound_effects': {
                'attack': 'assets/sounds/spell_cast.wav',
                'hurt': 'assets/sounds/mage_hurt.wav',
            },
            'base_stats': CharacterStats(
                max_health=80,
                max_mana=150,
                base_damage=40,
                base_armor=5,
                movement_speed=2.5
            ),
            'collision_radius': 0.4,
        }

    def register_type(self, type_id: str, config: dict):
        """Register a new character type configuration."""
        self._type_configs[type_id] = config

    def get_type(self, type_id: str) -> CharacterType:
        """
        Get or create a CharacterType flyweight.

        Lazy loading: heavy texture loading only happens on first access.
        """
        if type_id not in self._types:
            if type_id not in self._type_configs:
                raise ValueError(f"Unknown character type: {type_id}")

            config = self._type_configs[type_id]
            self._types[type_id] = CharacterType(**config)

        return self._types[type_id]

    def preload_types(self, type_ids: List[str]):
        """Preload specified types during loading screen."""
        for type_id in type_ids:
            self.get_type(type_id)

    def get_memory_stats(self) -> Dict:
        """Return memory usage statistics."""
        return {
            'loaded_types': len(self._types),
            'registered_types': len(self._type_configs),
            'type_details': {
                name: {'instances': t._instance_count}
                for name, t in self._types.items()
            }
        }


@dataclass
class CharacterInstance:
    """
    CONTEXT: Per-instance character data.

    This object is SMALL (just state) and UNIQUE per game entity.
    It holds a REFERENCE to a shared CharacterType flyweight.
    """

    # Reference to flyweight (shared)
    character_type: CharacterType

    # Extrinsic state (unique per instance)
    x: float
    y: float
    z: float = 0.0
    rotation: float = 0.0
    scale: float = 1.0

    # Instance-specific state
    current_health: int = field(default=0)
    current_mana: int = field(default=0)
    animation_state: AnimationState = AnimationState.IDLE
    animation_start_time: float = field(default_factory=time.time)

    velocity_x: float = 0.0
    velocity_y: float = 0.0

    is_alive: bool = True
    status_effects: List[str] = field(default_factory=list)

    def __post_init__(self):
        # Initialize health/mana from base stats
        if self.current_health == 0:
            self.current_health = self.character_type.base_stats.max_health
        if self.current_mana == 0:
            self.current_mana = self.character_type.base_stats.max_mana

        # Track instance count on flyweight
        self.character_type._instance_count += 1

    def take_damage(self, amount: int):
        """Apply damage, accounting for armor."""
        armor = self.character_type.base_stats.base_armor
        actual_damage = max(1, amount - armor)
        self.current_health -= actual_damage

        if self.current_health <= 0:
            self.current_health = 0
            self.is_alive = False
            self.set_animation(AnimationState.DIE)
        else:
            self.set_animation(AnimationState.HURT)

    def set_animation(self, state: AnimationState):
        """Change animation state, resetting timer."""
        if self.animation_state != state:
            self.animation_state = state
            self.animation_start_time = time.time()

    def update(self, delta_time: float):
        """Update instance state."""
        if not self.is_alive:
            return

        # Apply velocity
        speed = self.character_type.base_stats.movement_speed
        self.x += self.velocity_x * speed * delta_time
        self.y += self.velocity_y * speed * delta_time

        # Update animation based on movement
        if self.velocity_x != 0 or self.velocity_y != 0:
            if abs(self.velocity_x) > 0.5 or abs(self.velocity_y) > 0.5:
                self.set_animation(AnimationState.RUN)
            else:
                self.set_animation(AnimationState.WALK)
        elif self.animation_state in (AnimationState.WALK, AnimationState.RUN):
            self.set_animation(AnimationState.IDLE)

    def render(self) -> Dict:
        """Delegate rendering to flyweight with extrinsic state."""
        return self.character_type.render(
            x=self.x,
            y=self.y,
            z=self.z,
            rotation=self.rotation,
            scale=self.scale,
            animation_state=self.animation_state,
            animation_start_time=self.animation_start_time,
            alpha=1.0 if self.is_alive else 0.5
        )


class GameWorld:
    """Game world managing character instances."""

    def __init__(self):
        self.characters: List[CharacterInstance] = []
        self.factory = CharacterTypeFactory()

    def spawn_character(
        self,
        type_id: str,
        x: float,
        y: float
    ) -> CharacterInstance:
        """Spawn a new character instance."""
        character_type = self.factory.get_type(type_id)
        instance = CharacterInstance(
            character_type=character_type,
            x=x,
            y=y
        )
        self.characters.append(instance)
        return instance

    def spawn_army(
        self,
        type_id: str,
        positions: List[Tuple[float, float]]
    ) -> List[CharacterInstance]:
        """Efficiently spawn multiple characters of same type."""
        # Single flyweight lookup for entire army
        character_type = self.factory.get_type(type_id)

        instances = [
            CharacterInstance(character_type=character_type, x=x, y=y)
            for x, y in positions
        ]
        self.characters.extend(instances)
        return instances

    def update(self, delta_time: float):
        """Update all characters."""
        for char in self.characters:
            char.update(delta_time)

        # Remove dead characters (optional cleanup)
        self.characters = [c for c in self.characters if c.is_alive]

    def render_all(self) -> List[Dict]:
        """Generate render commands for all characters."""
        return [char.render() for char in self.characters]

    def get_memory_analysis(self) -> Dict:
        """Analyze memory savings from flyweight pattern."""
        # Estimate sizes (simplified)
        flyweight_size_mb = 50  # Texture + audio per type
        instance_size_bytes = 200  # Position, state, etc.

        num_instances = len(self.characters)
        num_types = len(self.factory._types)

        without_flyweight_mb = num_instances * flyweight_size_mb
        with_flyweight_mb = (
            num_types * flyweight_size_mb +
            num_instances * instance_size_bytes / (1024 * 1024)
        )

        return {
            'total_instances': num_instances,
            'unique_types': num_types,
            'without_flyweight_mb': without_flyweight_mb,
            'with_flyweight_mb': round(with_flyweight_mb, 2),
            'memory_saved_mb': round(without_flyweight_mb - with_flyweight_mb, 2),
            'savings_percent': f"{(1 - with_flyweight_mb/without_flyweight_mb)*100:.1f}%"
        }


# Usage demonstration
if __name__ == "__main__":
    world = GameWorld()

    # Spawn diverse army
    import random

    # 500 warriors, 300 mages at random positions
    warrior_positions = [(random.uniform(0, 1000), random.uniform(0, 1000))
                         for _ in range(500)]
    mage_positions = [(random.uniform(0, 1000), random.uniform(0, 1000))
                      for _ in range(300)]

    world.spawn_army("warrior", warrior_positions)
    world.spawn_army("mage", mage_positions)

    print("Memory Analysis:")
    for key, value in world.get_memory_analysis().items():
        print(f"  {key}: {value}")

    print("\nFactory Stats:")
    for key, value in world.factory.get_memory_stats().items():
        print(f"  {key}: {value}")
```

### Interview Questions: Game Character System

<div style="background: #1a1a2e; border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #ffd700; margin-top: 0;">Level 1: Pattern Recognition</h4>
<p style="color: #ccc;"><strong>Q: In the game character implementation, why is animation_start_time extrinsic rather than storing "current_frame" directly?</strong></p>
<p style="color: #9ca3af; font-style: italic;">A: Storing animation_start_time and computing current_frame is more efficient because: (1) No update loop needed - frame is computed on-demand during render. (2) Automatic frame progression - time naturally advances. (3) Smaller state - single float vs tracking frame + accumulator. (4) Synchronization-free - no need to call update() at exact intervals. The flyweight's get_animation_frame() does pure computation from (animation_start_time, current_time) -> frame_index. Trade-off: slightly more computation per render call, but eliminates update overhead.</p>

<h4 style="color: #ff6b6b; margin-top: 15px;">Level 2: Performance Optimization</h4>
<p style="color: #ccc;"><strong>Q: The game needs to render 10,000 characters at 60 FPS. Each render() call creates a new Dict. How would you optimize this?</strong></p>
<p style="color: #9ca3af; font-style: italic;">A: Multiple optimizations: (1) <strong>Object pooling for render commands</strong>: Pre-allocate render command objects, reuse instead of creating new dicts each frame. (2) <strong>Batch by type</strong>: Group characters by CharacterType, issue single batched draw call per type (instanced rendering). GPU draws all warriors in one call. (3) <strong>Spatial culling</strong>: Use [[quadtree]](/topic/data-structures/quadtree) or [[spatial hash]](/topic/algorithms/spatial-hashing) to skip off-screen characters. (4) <strong>LOD (Level of Detail)</strong>: Distant characters use simpler flyweights with lower-res textures. (5) <strong>Struct of Arrays</strong>: Instead of List[CharacterInstance], store positions as separate float arrays. Better cache locality, enables SIMD. (6) <strong>Frame budgeting</strong>: If over budget, render subset of characters (prioritize nearby/important).</p>

<h4 style="color: #a855f7; margin-top: 15px;">Level 3: Architectural Extension</h4>
<p style="color: #ccc;"><strong>Q: Design an extension where players can customize character appearance (different armor colors, weapon skins) while maintaining flyweight benefits. Customizations are purchased and persistent.</strong></p>
<p style="color: #9ca3af; font-style: italic;">A: Use composite flyweight architecture: (1) <strong>Base flyweight layer</strong>: CharacterType stays as-is (mesh, animation, base texture). (2) <strong>Customization flyweights</strong>: New flyweight category for customizations. ArmorTint(color), WeaponSkin(texture_id) are separate flyweights. Limited set (e.g., 20 colors, 50 skins) = manageable pool. (3) <strong>Instance composition</strong>: CharacterInstance holds references to [base_type, armor_tint, weapon_skin]. (4) <strong>Render pipeline</strong>: Shader applies customizations as overlays/tints. base_texture + tint_color + skin_texture combined at render time. (5) <strong>Database design</strong>: User purchases stored as (user_id, customization_type_id). Customization flyweights loaded from config, not per-user. (6) <strong>Memory math</strong>: 1M players with customizations = 1M * 3 references (24 bytes) + shared flyweight pool. Without flyweight: 1M * full texture data = impossible. Key insight: Flyweight pattern composes - multiple flyweight pools can work together.</p>
</div>

---

## Related Patterns and Integration

The Flyweight pattern often works alongside other patterns to create robust architectures.

<div style="background: linear-gradient(135deg, #3f0d0d 0%, #5c1a1a 100%); border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #fca5a5; margin-top: 0;">Pattern Relationships</h4>
<table style="width: 100%; color: #fecaca; border-collapse: collapse;">
<tr style="border-bottom: 1px solid #dc2626;">
<th style="text-align: left; padding: 10px;">Pattern</th>
<th style="text-align: left; padding: 10px;">Relationship with Flyweight</th>
</tr>
<tr style="border-bottom: 1px solid #991b1b;">
<td style="padding: 10px;"><strong>[[Factory Method]](/topic/design-patterns/factory-method)</strong></td>
<td style="padding: 10px;">Factory creates and manages flyweight pool. Encapsulates creation logic and caching.</td>
</tr>
<tr style="border-bottom: 1px solid #991b1b;">
<td style="padding: 10px;"><strong>[[Singleton]](/topic/design-patterns/singleton)</strong></td>
<td style="padding: 10px;">Factory is often singleton to ensure single source of truth for flyweight instances.</td>
</tr>
<tr style="border-bottom: 1px solid #991b1b;">
<td style="padding: 10px;"><strong>[[Composite]](/topic/design-patterns/composite)</strong></td>
<td style="padding: 10px;">Leaf nodes in composite structures often use flyweights (e.g., characters in GUI tree).</td>
</tr>
<tr style="border-bottom: 1px solid #991b1b;">
<td style="padding: 10px;"><strong>[[State]](/topic/design-patterns/state)</strong></td>
<td style="padding: 10px;">State objects can be flyweights when they're stateless (pure behavior, no instance data).</td>
</tr>
<tr style="border-bottom: 1px solid #991b1b;">
<td style="padding: 10px;"><strong>[[Object Pool]](/topic/design-patterns/object-pool)</strong></td>
<td style="padding: 10px;">Related but different: Pool reuses mutable objects; Flyweight shares immutable objects.</td>
</tr>
<tr>
<td style="padding: 10px;"><strong>[[Prototype]](/topic/design-patterns/prototype)</strong></td>
<td style="padding: 10px;">Alternative approach: clone template objects vs share flyweights. Prototype for mutable needs.</td>
</tr>
</table>
</div>

---

## Common Pitfalls and Anti-Patterns

<div style="background: #1c1917; border: 2px solid #dc2626; border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #ef4444; margin-top: 0;">Pitfalls to Avoid</h4>

<div style="margin-bottom: 20px;">
<h5 style="color: #fbbf24;">1. Mutable Intrinsic State</h5>
<p style="color: #d6d3d1;">Making flyweight state mutable corrupts all clients simultaneously. Always use frozen/immutable objects.</p>
<pre style="background: #292524; padding: 10px; border-radius: 4px; color: #a8a29e; overflow-x: auto;">
# WRONG: Mutable flyweight
class CharStyle:
    def __init__(self, color):
        self.color = color  # Can be changed!

# One client changes color - affects ALL users of this flyweight
style.color = "red"  # Bug: every character using this style turns red
</pre>
</div>

<div style="margin-bottom: 20px;">
<h5 style="color: #fbbf24;">2. Identity Confusion</h5>
<p style="color: #d6d3d1;">Flyweights must not be used where object identity matters. Two "different" characters share the same flyweight - they're not distinguishable by flyweight identity.</p>
<pre style="background: #292524; padding: 10px; border-radius: 4px; color: #a8a29e; overflow-x: auto;">
# WRONG: Using flyweight for identity
if character1.type is character2.type:
    print("Same character!")  # Bug: just same TYPE, not same instance
</pre>
</div>

<div style="margin-bottom: 20px;">
<h5 style="color: #fbbf24;">3. Premature Optimization</h5>
<p style="color: #d6d3d1;">Applying Flyweight when object count is low adds complexity without benefit. Profile first.</p>
</div>

<div>
  <h5 style="color: #fbbf24;">4. Unbounded Factory Growth</h5>
  <p style="color: #d6d3d1;">If flyweight keys come from user input, the factory can grow unbounded. Use LRU eviction or validate keys against a known set.</p>
</div>
</div>

---

## When to Use Flyweight

<div style="background: linear-gradient(135deg, #14532d 0%, #166534 100%); border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #86efac; margin-top: 0;">Use Flyweight When</h4>
<ul style="color: #dcfce7;">
<li>Application uses a <strong>large number of objects</strong> (thousands+)</li>
<li>Storage costs are <strong>high due to object quantity</strong></li>
<li>Most object state can be made <strong>extrinsic</strong></li>
<li>Many groups of objects can be <strong>replaced by fewer shared objects</strong></li>
<li>Application doesn't depend on <strong>object identity</strong></li>
</ul>
</div>

<div style="background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%); border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #fecaca; margin-top: 0;">Avoid Flyweight When</h4>
<ul style="color: #fee2e2;">
<li>Object count is <strong>small</strong> (overhead exceeds savings)</li>
<li>Most state is <strong>intrinsically unique</strong> per object</li>
<li>State separation would <strong>complicate code significantly</strong></li>
<li>Objects require <strong>mutable shared state</strong></li>
<li>Object <strong>identity</strong> is important for application logic</li>
</ul>
</div>

---

## Summary

The Flyweight pattern achieves memory efficiency through **careful state separation and object sharing**. The key insight is that what appears to be thousands of objects can often be represented as a small pool of shared flyweights plus lightweight per-instance data.

**Key Takeaways:**
- **Intrinsic state** is immutable, shared, and stored in flyweights
- **Extrinsic state** is context-dependent and passed to flyweight methods
- The **factory** manages flyweight creation and caching
- String interning is the **canonical runtime example** of Flyweight
- Game systems demonstrate **massive memory savings** (GB to MB)
- **Immutability is essential** for safe sharing
- Always **measure before applying** - the pattern adds complexity

**Complexity Analysis:**
| Operation | Time | Space |
|-----------|------|-------|
| Get flyweight | O(1) amortized | O(1) |
| Factory total | - | O(unique flyweights) |
| Without Flyweight | - | O(n * size_per_object) |
| With Flyweight | - | O(types * size_per_type + n * size_extrinsic) |

Related concepts: [[Object Pool]](/topic/design-patterns/object-pool), [[Prototype]](/topic/design-patterns/prototype), [[Caching]](/topic/system-design/caching), [[Memory Management]](/topic/systems/memory-management)
