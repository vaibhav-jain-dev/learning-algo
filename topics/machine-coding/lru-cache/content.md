# LRU Cache

## Overview

An LRU (Least Recently Used) Cache is a bounded data structure that maintains a fixed number of entries, automatically evicting the least recently accessed item when capacity is exceeded. <span style="background: #dcfce7; padding: 2px 6px; border-radius: 4px; font-weight: 500;">The fundamental insight is combining a HashMap for O(1) key lookups with a Doubly Linked List for O(1) recency tracking, achieving constant-time operations for both `get` and `put`.</span>

This is among the most frequently asked machine coding problems because it tests the candidate's ability to compose data structures, understand pointer manipulation, and reason about time-space trade-offs under constraints.

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 20px 0;">
<div style="font-weight: 600; color: #92400e; margin-bottom: 8px;">Interview Frequency</div>
<div style="color: #78350f; font-size: 14px;">LeetCode #146. Asked at Amazon (weekly), Google, Meta, Microsoft, Netflix, Uber, and virtually every major tech company. Often the first question in machine coding rounds.</div>
</div>

---

## Why This Problem Matters

### Skills Tested

| Dimension | What Interviewers Evaluate |
|-----------|---------------------------|
| **Data Structure Composition** | Can you combine HashMap + LinkedList synergistically? |
| **Pointer Manipulation** | Correctness of doubly linked list operations |
| **API Design** | Clear, consistent interface with proper return semantics |
| **Edge Case Awareness** | Capacity boundaries, empty states, update semantics |
| **Systems Thinking** | Thread-safety, scalability, real-world deployment |
| **Code Organization** | Helper methods, separation of concerns, readability |

### Real-World Applications

- **Database Buffer Pools**: PostgreSQL, MySQL use LRU variants for page caching
- **Operating System Page Replacement**: Virtual memory management
- **CDN Edge Caching**: Cloudflare, Akamai cache frequently accessed content
- **Web Browser Caching**: Back/forward cache, resource caching
- **DNS Resolution Caching**: Local DNS resolvers
- **CPU Cache Eviction**: Hardware-level cache management approximates LRU

---

## Requirements Gathering

<span style="background: #dcfce7; padding: 2px 6px; border-radius: 4px; font-weight: 500;">Always clarify requirements before coding. Interviewers intentionally leave specifications ambiguous to test your requirement-gathering skills.</span>

### Questions to Ask the Interviewer

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
<div style="color: #059669; font-weight: 600; font-size: 14px; margin-bottom: 12px; border-bottom: 2px solid #10b981; padding-bottom: 8px;">Functional Requirements</div>
<ul style="margin: 0; padding-left: 18px; color: #374151; font-size: 13px; line-height: 1.8;">
<li>Which operations: get, put, delete, peek?</li>
<li>Does updating a key reset its recency?</li>
<li>Return value for missing keys: -1, null, Optional, throw?</li>
<li>Support for TTL (time-to-live) expiration?</li>
<li>Support for eviction callbacks/listeners?</li>
<li>Key/value type constraints (int only vs generic)?</li>
</ul>
</div>
<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
<div style="color: #7c3aed; font-weight: 600; font-size: 14px; margin-bottom: 12px; border-bottom: 2px solid #8b5cf6; padding-bottom: 8px;">Non-Functional Requirements</div>
<ul style="margin: 0; padding-left: 18px; color: #374151; font-size: 13px; line-height: 1.8;">
<li>Expected capacity range (hundreds vs millions)?</li>
<li>Thread-safety for concurrent access?</li>
<li>Single machine or distributed system?</li>
<li>Read/write ratio (90/10 vs 50/50)?</li>
<li>Memory constraints?</li>
<li>Latency requirements (p99)?</li>
</ul>
</div>
</div>
</div>

### Interview Questions: Requirements

<div style="background: #faf5ff; border: 1px solid #d8b4fe; border-radius: 8px; padding: 16px; margin: 16px 0;">
<div style="font-weight: 600; color: #6b21a8; margin-bottom: 8px;">L1: Why is requirements gathering important for LRU Cache?</div>
<div style="color: #581c87; font-size: 13px; margin-bottom: 12px;">It determines API design, thread-safety needs, and whether simple LRU suffices or if variants (LRU-K, ARC, LIRS) are needed.</div>

<div style="margin-left: 20px; border-left: 3px solid #c084fc; padding-left: 16px;">
<div style="font-weight: 600; color: #7c3aed; margin-bottom: 8px;">L2: How would TTL support change your implementation?</div>
<div style="color: #5b21b6; font-size: 13px; margin-bottom: 12px;">Requires storing timestamps per entry, periodic cleanup (background thread or lazy eviction on access), and potentially a separate data structure like a min-heap ordered by expiration time.</div>

<div style="margin-left: 20px; border-left: 3px solid #a78bfa; padding-left: 16px;">
<div style="font-weight: 600; color: #8b5cf6; margin-bottom: 8px;">L3: Compare lazy vs eager TTL eviction. When would you choose each?</div>
<div style="color: #6d28d9; font-size: 13px;">Lazy eviction (check on access) has no background overhead but may hold stale data and shows inconsistent memory usage. Eager eviction (background sweeper) maintains consistent memory but requires threading and adds latency spikes during cleanup. Choose lazy for simple cases, eager when memory predictability matters (e.g., embedded systems, strict SLAs).</div>
</div>
</div>
</div>

---

## Core Architecture

### The HashMap + Doubly Linked List Synergy

<span style="background: #dcfce7; padding: 2px 6px; border-radius: 4px; font-weight: 500;">The key architectural insight: HashMap provides O(1) lookup by key, while the doubly linked list maintains access order with O(1) insertion, deletion, and reordering when we have a direct node reference.</span>

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #334155; margin: 0 0 20px 0; text-align: center; font-size: 16px;">LRU Cache Internal Architecture</h4>

<div style="display: flex; flex-direction: column; gap: 20px;">
<div style="background: #ffffff; border: 2px solid #cbd5e1; border-radius: 8px; padding: 16px;">
<div style="color: #059669; font-weight: bold; font-size: 13px; margin-bottom: 12px;">HashMap: Key to Node Reference Mapping</div>
<div style="display: flex; gap: 12px; flex-wrap: wrap;">
<div style="background: #dcfce7; border: 1px solid #86efac; padding: 10px 16px; border-radius: 6px; text-align: center;">
<div style="color: #166534; font-weight: bold; font-size: 12px;">"user:123"</div>
<div style="color: #15803d; font-size: 10px;">ptr: 0x7f2a</div>
</div>
<div style="background: #dcfce7; border: 1px solid #86efac; padding: 10px 16px; border-radius: 6px; text-align: center;">
<div style="color: #166534; font-weight: bold; font-size: 12px;">"session:abc"</div>
<div style="color: #15803d; font-size: 10px;">ptr: 0x7f3b</div>
</div>
<div style="background: #dcfce7; border: 1px solid #86efac; padding: 10px 16px; border-radius: 6px; text-align: center;">
<div style="color: #166534; font-weight: bold; font-size: 12px;">"config:db"</div>
<div style="color: #15803d; font-size: 10px;">ptr: 0x7f4c</div>
</div>
</div>
<div style="color: #64748b; font-size: 11px; margin-top: 10px;">HashMap stores direct memory references to nodes, enabling O(1) node access without list traversal</div>
</div>

<div style="text-align: center; color: #6b7280; font-size: 12px;">
<div style="display: inline-block; background: #e5e7eb; padding: 4px 12px; border-radius: 4px;">Pointers reference nodes directly</div>
</div>

<div style="background: #ffffff; border: 2px solid #cbd5e1; border-radius: 8px; padding: 16px;">
<div style="color: #7c3aed; font-weight: bold; font-size: 13px; margin-bottom: 12px;">Doubly Linked List: Recency Order (Head = Most Recent)</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 6px; flex-wrap: wrap;">
<div style="background: #f1f5f9; border: 2px dashed #94a3b8; padding: 8px 12px; border-radius: 6px; text-align: center;">
<div style="color: #64748b; font-size: 10px; font-weight: 600;">HEAD</div>
<div style="color: #94a3b8; font-size: 9px;">sentinel</div>
</div>
<div style="color: #3b82f6; font-size: 16px;">&#8644;</div>
<div style="background: #dbeafe; border: 2px solid #3b82f6; padding: 8px 12px; border-radius: 6px; text-align: center;">
<div style="color: #1e40af; font-weight: bold; font-size: 10px;">0x7f2a</div>
<div style="color: #3b82f6; font-size: 9px;">"user:123"</div>
<div style="color: #059669; font-size: 8px; font-weight: 600;">MRU</div>
</div>
<div style="color: #3b82f6; font-size: 16px;">&#8644;</div>
<div style="background: #ede9fe; border: 2px solid #8b5cf6; padding: 8px 12px; border-radius: 6px; text-align: center;">
<div style="color: #5b21b6; font-weight: bold; font-size: 10px;">0x7f3b</div>
<div style="color: #7c3aed; font-size: 9px;">"session:abc"</div>
</div>
<div style="color: #3b82f6; font-size: 16px;">&#8644;</div>
<div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 8px 12px; border-radius: 6px; text-align: center;">
<div style="color: #92400e; font-weight: bold; font-size: 10px;">0x7f4c</div>
<div style="color: #d97706; font-size: 9px;">"config:db"</div>
<div style="color: #dc2626; font-size: 8px; font-weight: 600;">LRU</div>
</div>
<div style="color: #3b82f6; font-size: 16px;">&#8644;</div>
<div style="background: #f1f5f9; border: 2px dashed #94a3b8; padding: 8px 12px; border-radius: 6px; text-align: center;">
<div style="color: #64748b; font-size: 10px; font-weight: 600;">TAIL</div>
<div style="color: #94a3b8; font-size: 9px;">sentinel</div>
</div>
</div>
<div style="color: #64748b; font-size: 11px; margin-top: 10px; text-align: center;">Each node has prev/next pointers; sentinel nodes eliminate null checks</div>
</div>
</div>
</div>

### Why Doubly Linked List (Not Singly)?

<span style="background: #dcfce7; padding: 2px 6px; border-radius: 4px; font-weight: 500;">To remove a node from a singly linked list, you need its predecessor. Finding the predecessor requires O(n) traversal. With a doubly linked list, the predecessor is directly accessible via `node.prev`, enabling O(1) removal.</span>

| Operation | Singly Linked | Doubly Linked |
|-----------|--------------|---------------|
| Remove node (given pointer) | O(n) - must find prev | O(1) - prev directly available |
| Insert after node | O(1) | O(1) |
| Insert before node | O(n) | O(1) |
| Move to front | O(n) | O(1) |

### Why Sentinel Nodes?

Sentinel (dummy) head and tail nodes eliminate edge cases:

```python
# WITHOUT sentinels - many null checks needed
def remove(node):
    if node.prev:
        node.prev.next = node.next
    else:
        self.head = node.next  # Special case: removing head

    if node.next:
        node.next.prev = node.prev
    else:
        self.tail = node.prev  # Special case: removing tail

# WITH sentinels - clean, uniform code
def remove(node):
    node.prev.next = node.next
    node.next.prev = node.prev
    # Always works - sentinels are never null
```

### Class Structure

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<div style="display: flex; gap: 24px; flex-wrap: wrap; justify-content: center;">
<div style="background: #ffffff; border: 2px solid #3b82f6; border-radius: 8px; min-width: 200px; overflow: hidden;">
<div style="background: #3b82f6; color: white; padding: 10px; text-align: center; font-weight: 600; font-size: 14px;">Node</div>
<div style="padding: 12px;">
<div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 8px;">
<div style="color: #6b7280; font-size: 11px; font-weight: 600; margin-bottom: 4px;">Fields</div>
<div style="font-family: monospace; font-size: 12px; color: #1f2937;">
<div>- key: K</div>
<div>- value: V</div>
<div>- prev: Node</div>
<div>- next: Node</div>
</div>
</div>
</div>
</div>

<div style="display: flex; align-items: center; color: #6b7280; font-size: 24px;">&#8594;</div>

<div style="background: #ffffff; border: 2px solid #059669; border-radius: 8px; min-width: 240px; overflow: hidden;">
<div style="background: #059669; color: white; padding: 10px; text-align: center; font-weight: 600; font-size: 14px;">LRUCache</div>
<div style="padding: 12px;">
<div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 8px;">
<div style="color: #6b7280; font-size: 11px; font-weight: 600; margin-bottom: 4px;">Fields</div>
<div style="font-family: monospace; font-size: 12px; color: #1f2937;">
<div>- capacity: int</div>
<div>- size: int</div>
<div>- cache: HashMap&lt;K, Node&gt;</div>
<div>- head: Node (sentinel)</div>
<div>- tail: Node (sentinel)</div>
</div>
</div>
<div>
<div style="color: #6b7280; font-size: 11px; font-weight: 600; margin-bottom: 4px;">Methods</div>
<div style="font-family: monospace; font-size: 12px; color: #1f2937;">
<div>+ get(key): V</div>
<div>+ put(key, value): void</div>
<div>- addToFront(node): void</div>
<div>- removeNode(node): void</div>
<div>- moveToFront(node): void</div>
<div>- evictLRU(): void</div>
</div>
</div>
</div>
</div>
</div>
</div>

### Interview Questions: Architecture

<div style="background: #faf5ff; border: 1px solid #d8b4fe; border-radius: 8px; padding: 16px; margin: 16px 0;">
<div style="font-weight: 600; color: #6b21a8; margin-bottom: 8px;">L1: Why can't we use just a HashMap for LRU Cache?</div>
<div style="color: #581c87; font-size: 13px; margin-bottom: 12px;">HashMap provides O(1) lookup but has no inherent ordering. We need to track access recency, which requires a separate ordered structure. HashMap iteration order is either undefined or insertion-order (LinkedHashMap), not access-order.</div>

<div style="margin-left: 20px; border-left: 3px solid #c084fc; padding-left: 16px;">
<div style="font-weight: 600; color: #7c3aed; margin-bottom: 8px;">L2: Could we use a LinkedHashMap (access-order mode) instead of building from scratch?</div>
<div style="color: #5b21b6; font-size: 13px; margin-bottom: 12px;">Yes! Java's LinkedHashMap with accessOrder=true maintains access order. Override removeEldestEntry() to enforce capacity. However, interviewers want to see you implement the mechanism manually to demonstrate understanding.</div>

<div style="margin-left: 20px; border-left: 3px solid #a78bfa; padding-left: 16px;">
<div style="font-weight: 600; color: #8b5cf6; margin-bottom: 8px;">L3: What are the internal differences between your implementation and LinkedHashMap?</div>
<div style="color: #6d28d9; font-size: 13px;">LinkedHashMap uses a single doubly-linked list threaded through the HashMap entries themselves (each Entry has before/after pointers), avoiding separate node allocation. It also handles iteration, serialization, and has optimized memory layout. Our implementation is cleaner conceptually but less memory-efficient. LinkedHashMap also handles null keys/values with special treatment.</div>
</div>
</div>
</div>

  ---

## O(1) Operations: Deep Dive

### GET Operation

<div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 2px solid #6ee7b7; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="font-weight: 600; color: #047857; font-size: 15px; margin-bottom: 16px;">GET(key) - Retrieve value and update recency</div>

<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #059669; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px; flex-shrink: 0;">1</div>
<div style="background: white; border: 1px solid #a7f3d0; border-radius: 6px; padding: 10px 14px; flex: 1;">
<div style="color: #065f46; font-size: 13px;"><strong>HashMap Lookup:</strong> cache.get(key) - O(1) average</div>
<div style="color: #047857; font-size: 11px; margin-top: 4px;">Returns null/None if key doesn't exist, otherwise returns Node reference</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #059669; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px; flex-shrink: 0;">2</div>
<div style="background: white; border: 1px solid #a7f3d0; border-radius: 6px; padding: 10px 14px; flex: 1;">
<div style="color: #065f46; font-size: 13px;"><strong>Not Found Path:</strong> Return -1 (or throw, based on API contract)</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #059669; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px; flex-shrink: 0;">3</div>
<div style="background: white; border: 1px solid #a7f3d0; border-radius: 6px; padding: 10px 14px; flex: 1;">
<div style="color: #065f46; font-size: 13px;"><strong>Remove from Current Position:</strong> Unlink node by updating neighbor pointers - O(1)</div>
<div style="color: #047857; font-size: 11px; margin-top: 4px;">node.prev.next = node.next; node.next.prev = node.prev</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #059669; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px; flex-shrink: 0;">4</div>
<div style="background: white; border: 1px solid #a7f3d0; border-radius: 6px; padding: 10px 14px; flex: 1;">
<div style="color: #065f46; font-size: 13px;"><strong>Insert After Head:</strong> Add node as most recently used - O(1)</div>
<div style="color: #047857; font-size: 11px; margin-top: 4px;">Update 4 pointers: node.prev, node.next, head.next.prev, head.next</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #059669; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px; flex-shrink: 0;">5</div>
<div style="background: white; border: 1px solid #a7f3d0; border-radius: 6px; padding: 10px 14px; flex: 1;">
<div style="color: #065f46; font-size: 13px;"><strong>Return Value:</strong> Return node.value</div>
</div>
</div>
</div>
</div>

### PUT Operation

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 2px solid #93c5fd; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="font-weight: 600; color: #1d4ed8; font-size: 15px; margin-bottom: 16px;">PUT(key, value) - Insert or update entry</div>

<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="display: flex; align-items: flex-start; gap: 12px;">
<div style="background: #2563eb; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px; flex-shrink: 0;">1</div>
<div style="background: white; border: 1px solid #93c5fd; border-radius: 6px; padding: 10px 14px; flex: 1;">
<div style="color: #1e40af; font-size: 13px;"><strong>Check Existence:</strong> Does key already exist in cache?</div>
</div>
</div>

<div style="display: flex; gap: 16px; margin-left: 40px; flex-wrap: wrap;">
<div style="flex: 1; min-width: 250px; background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 14px;">
<div style="color: #166534; font-weight: 600; font-size: 12px; margin-bottom: 8px;">Key EXISTS (Update Path)</div>
<div style="color: #15803d; font-size: 12px; line-height: 1.7;">
  2a. Update node.value<br>
  2b. Move node to front (same as GET)<br>
  2c. Return
</div>
</div>

<div style="flex: 1; min-width: 250px; background: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; padding: 14px;">
<div style="color: #92400e; font-weight: 600; font-size: 12px; margin-bottom: 8px;">Key NOT EXISTS (Insert Path)</div>
<div style="color: #78350f; font-size: 12px; line-height: 1.7;">
  2a. If size == capacity: evict LRU<br>
  2b. Create new Node(key, value)<br>
  2c. Add to HashMap<br>
  2d. Insert after head<br>
  2e. Increment size
</div>
</div>
</div>

<div style="display: flex; align-items: flex-start; gap: 12px;">
<div style="background: #dc2626; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 13px; flex-shrink: 0;">!</div>
<div style="background: #fef2f2; border: 1px solid #fca5a5; border-radius: 6px; padding: 10px 14px; flex: 1;">
<div style="color: #991b1b; font-size: 13px;"><strong>Eviction:</strong> Remove tail.prev from list AND delete its key from HashMap</div>
<div style="color: #b91c1c; font-size: 11px; margin-top: 4px;">Common bug: forgetting to remove from HashMap causes memory leak and size mismatch</div>
</div>
</div>
</div>
</div>

### Pointer Update Sequence (Critical)

<span style="background: #dcfce7; padding: 2px 6px; border-radius: 4px; font-weight: 500;">The order of pointer updates matters! Updating in the wrong order can lose references.</span>

            ```python
            # CORRECT: Insert node after head
            def add_to_front(self, node):
            # First, set the new node's pointers (doesn't modify existing structure)
            node.prev = self.head
            node.next = self.head.next

            # Then, update existing nodes to point to new node
            self.head.next.prev = node  # Old first node points back to new node
            self.head.next = node       # Head points forward to new node

            # WRONG: If we do head.next = node first, we lose reference to old first node!
            def add_to_front_WRONG(self, node):
            self.head.next = node       # OOPS! Lost reference to old head.next
            node.prev = self.head
            node.next = ???             # Can't access old first node anymore!
            ```

### Interview Questions: O(1) Operations

<div style="background: #faf5ff; border: 1px solid #d8b4fe; border-radius: 8px; padding: 16px; margin: 16px 0;">
<div style="font-weight: 600; color: #6b21a8; margin-bottom: 8px;">L1: Walk me through what happens internally when we call get(key) on an existing key.</div>
<div style="color: #581c87; font-size: 13px; margin-bottom: 12px;">HashMap lookup returns node pointer (O(1)). Node is unlinked from current position by making its neighbors point to each other (O(1)). Node is then inserted right after head sentinel by updating 4 pointers (O(1)). Finally, return node.value.</div>

<div style="margin-left: 20px; border-left: 3px solid #c084fc; padding-left: 16px;">
<div style="font-weight: 600; color: #7c3aed; margin-bottom: 8px;">L2: Is HashMap lookup truly O(1)? When might it degrade?</div>
<div style="color: #5b21b6; font-size: 13px; margin-bottom: 12px;">HashMap is O(1) average case but O(n) worst case when all keys hash to the same bucket. This happens with pathological hash functions or adversarial inputs. Modern HashMaps (Java 8+) convert long chains to balanced trees (O(log n) worst case). Load factor and resizing also affect performance.</div>

<div style="margin-left: 20px; border-left: 3px solid #a78bfa; padding-left: 16px;">
<div style="font-weight: 600; color: #8b5cf6; margin-bottom: 8px;">L3: How does HashMap resizing interact with LRU Cache performance? What's the amortized complexity?</div>
<div style="color: #6d28d9; font-size: 13px;">HashMap resize is O(n) when triggered (rehash all entries). However, since resize doubles capacity and only triggers when load factor exceeded, each element is rehashed O(1) times amortized. For LRU Cache, resizes are rare after warmup since size is bounded by capacity. Initial puts might trigger resizes; consider initializing HashMap with expected capacity to avoid this. Amortized complexity remains O(1).</div>
</div>
</div>
</div>

  ---

## Code Implementation

### Python Implementation

            ```python
            from typing import Optional, Dict

            class Node:
            """
            Doubly linked list node storing key-value pair.

            Key is stored because we need it during eviction to remove
            from HashMap. Without the key in the node, we'd need O(n)
            HashMap traversal to find the entry to delete.
            """
            __slots__ = ['key', 'value', 'prev', 'next']  # Memory optimization

            def __init__(self, key: int = 0, value: int = 0):
            self.key = key
            self.value = value
            self.prev: Optional['Node'] = None
            self.next: Optional['Node'] = None


            class LRUCache:
            """
            LRU Cache with O(1) get and put operations.

            Architecture:
            - HashMap (dict): key -> Node reference for O(1) lookup
            - Doubly Linked List: maintains access order (head = MRU, tail = LRU)
            - Sentinel nodes: eliminate edge case handling

            Invariants:
            - len(cache) == number of data nodes in list
            - head.next is MRU, tail.prev is LRU
            - Every node in list has corresponding cache entry and vice versa

            Time: O(1) for get, put
            Space: O(capacity) for storage + O(1) per operation
            """

            def __init__(self, capacity: int):
            if capacity <= 0:
            raise ValueError("Capacity must be positive")

            self.capacity = capacity
            self.cache: Dict[int, Node] = {}

            # Sentinel nodes - never store data, just simplify logic
            self.head = Node()  # Dummy head (before MRU)
            self.tail = Node()  # Dummy tail (after LRU)
            self.head.next = self.tail
            self.tail.prev = self.head

            def _add_to_front(self, node: Node) -> None:
            """
            Insert node immediately after head sentinel.

            Before: head <-> A <-> ... <-> tail
            After:  head <-> node <-> A <-> ... <-> tail

            Pointer update order matters to avoid losing references!
            """
            node.prev = self.head
            node.next = self.head.next
            # Update existing nodes AFTER setting new node's pointers
            self.head.next.prev = node
            self.head.next = node

            def _remove_node(self, node: Node) -> None:
            """
            Remove node from its current position.

            Before: ... <-> A <-> node <-> B <-> ...
            After:  ... <-> A <-> B <-> ...

            Does not delete from HashMap - caller's responsibility.
            """
            prev_node = node.prev
            next_node = node.next
            prev_node.next = next_node
            next_node.prev = prev_node

            def _move_to_front(self, node: Node) -> None:
            """Move existing node to MRU position."""
            self._remove_node(node)
            self._add_to_front(node)

            def _evict_lru(self) -> None:
            """
            Remove least recently used entry (node before tail).

            Critical: Must remove from BOTH list AND HashMap.
            The node stores its key specifically for this operation.
            """
            lru_node = self.tail.prev
            self._remove_node(lru_node)
            del self.cache[lru_node.key]  # Don't forget this!

            def get(self, key: int) -> int:
            """
            Retrieve value by key, marking it as recently used.

            Returns -1 if key not found (per LeetCode convention).
            Consider returning Optional[int] or raising KeyError
            for production code.
            """
            if key not in self.cache:
            return -1

            node = self.cache[key]
            self._move_to_front(node)  # Mark as recently used
            return node.value

            def put(self, key: int, value: int) -> None:
            """
            Insert or update key-value pair.

            If key exists: update value and move to front.
            If key doesn't exist:
            - If at capacity: evict LRU first
            - Create new node and add to front
            """
            if key in self.cache:
            # Update existing
            node = self.cache[key]
            node.value = value
            self._move_to_front(node)
            else:
            # Insert new
            if len(self.cache) >= self.capacity:
            self._evict_lru()

            new_node = Node(key, value)
            self.cache[key] = new_node
            self._add_to_front(new_node)

            def delete(self, key: int) -> bool:
            """
            Explicitly remove a key (extension beyond LeetCode spec).
            Returns True if key existed and was removed.
            """
            if key not in self.cache:
            return False

            node = self.cache[key]
            self._remove_node(node)
            del self.cache[key]
            return True

            def peek(self, key: int) -> int:
            """
            Get value WITHOUT updating recency (extension).
            Useful for debugging or special access patterns.
            """
            if key not in self.cache:
            return -1
            return self.cache[key].value

            def __len__(self) -> int:
            return len(self.cache)

            def __contains__(self, key: int) -> bool:
            return key in self.cache

            def __repr__(self) -> str:
            """Debug representation showing order."""
            items = []
            curr = self.head.next
            while curr != self.tail:
            items.append(f"{curr.key}:{curr.value}")
            curr = curr.next
            return f"LRUCache({len(self)}/{self.capacity})[{' -> '.join(items)}]"


            # Verification
            if __name__ == "__main__":
            cache = LRUCache(2)

            cache.put(1, 1)
            cache.put(2, 2)
            print(f"Initial: {cache}")

            assert cache.get(1) == 1  # Returns 1, moves 1 to front
            print(f"After get(1): {cache}")

            cache.put(3, 3)  # Evicts key 2 (LRU)
            print(f"After put(3,3): {cache}")

            assert cache.get(2) == -1  # Returns -1 (not found)

            cache.put(4, 4)  # Evicts key 1
            print(f"After put(4,4): {cache}")

            assert cache.get(1) == -1
            assert cache.get(3) == 3
            assert cache.get(4) == 4

            print("All assertions passed!")
            ```

### Java Implementation (Thread-Safe Version)

            ```java
            import java.util.HashMap;
            import java.util.Map;
            import java.util.concurrent.locks.ReentrantReadWriteLock;

            /**
            * Thread-safe LRU Cache implementation.
            *
            * Uses ReentrantReadWriteLock for concurrent access:
            * - Multiple readers can access simultaneously
            * - Writers have exclusive access
            *
            * Note: get() requires write lock because it modifies recency order.
            * For read-heavy workloads, consider lock-free alternatives.
            */
            public class LRUCache<K, V> {

              private static class Node<K, V> {
                K key;
                V value;
                Node<K, V> prev, next;

                  Node(K key, V value) {
                  this.key = key;
                  this.value = value;
                  }

                  Node() {} // Sentinel constructor
                  }

                  private final int capacity;
                  private final Map<K, Node<K, V>> cache;
                    private final Node<K, V> head, tail;
                      private final ReentrantReadWriteLock lock;

                      public LRUCache(int capacity) {
                      if (capacity <= 0) {
                      throw new IllegalArgumentException("Capacity must be positive");
                      }

                      this.capacity = capacity;
                      this.cache = new HashMap<>(capacity, 1.0f); // Load factor 1.0, pre-sized
                      this.lock = new ReentrantReadWriteLock();

                      // Initialize sentinel nodes
                      this.head = new Node<>();
                      this.tail = new Node<>();
                      head.next = tail;
                      tail.prev = head;
                      }

                      private void addToFront(Node<K, V> node) {
                        node.prev = head;
                        node.next = head.next;
                        head.next.prev = node;
                        head.next = node;
                        }

                        private void removeNode(Node<K, V> node) {
                          node.prev.next = node.next;
                          node.next.prev = node.prev;
                          }

                          private void moveToFront(Node<K, V> node) {
                            removeNode(node);
                            addToFront(node);
                            }

                            private void evictLRU() {
                            Node<K, V> lru = tail.prev;
                              removeNode(lru);
                              cache.remove(lru.key);
                              }

                              /**
                              * Get value by key. Returns null if not found.
                              *
                              * Requires write lock because it modifies access order.
                              */
                              public V get(K key) {
                              lock.writeLock().lock();
                              try {
                              Node<K, V> node = cache.get(key);
                                if (node == null) {
                                return null;
                                }
                                moveToFront(node);
                                return node.value;
                                } finally {
                                lock.writeLock().unlock();
                                }
                                }

                                /**
                                * Peek at value without updating recency.
                                *
                                * Can use read lock since it doesn't modify structure.
                                */
                                public V peek(K key) {
                                lock.readLock().lock();
                                try {
                                Node<K, V> node = cache.get(key);
                                  return node != null ? node.value : null;
                                  } finally {
                                  lock.readLock().unlock();
                                  }
                                  }

                                  /**
                                  * Insert or update key-value pair.
                                  */
                                  public void put(K key, V value) {
                                  lock.writeLock().lock();
                                  try {
                                  Node<K, V> node = cache.get(key);

                                    if (node != null) {
                                    // Update existing
                                    node.value = value;
                                    moveToFront(node);
                                    } else {
                                    // Insert new
                                    if (cache.size() >= capacity) {
                                    evictLRU();
                                    }

                                    Node<K, V> newNode = new Node<>(key, value);
                                      cache.put(key, newNode);
                                      addToFront(newNode);
                                      }
                                      } finally {
                                      lock.writeLock().unlock();
                                      }
                                      }

                                      public int size() {
                                      lock.readLock().lock();
                                      try {
                                      return cache.size();
                                      } finally {
                                      lock.readLock().unlock();
                                      }
                                      }

                                      public boolean containsKey(K key) {
                                      lock.readLock().lock();
                                      try {
                                      return cache.containsKey(key);
                                      } finally {
                                      lock.readLock().unlock();
                                      }
                                      }
                                      }
                                      ```

### Go Implementation

                                      ```go
                                      package lru

                                      import (
                                      "container/list"
                                      "sync"
                                      )

                                      // entry stores key-value pair in the list
                                      // Key is needed to delete from map during eviction
                                      type entry[K comparable, V any] struct {
                                      key   K
                                      value V
                                      }

                                      // Cache is a thread-safe LRU cache with O(1) operations
                                      type Cache[K comparable, V any] struct {
                                      capacity int
                                      cache    map[K]*list.Element
                                      list     *list.List // Front = MRU, Back = LRU
                                      mu       sync.RWMutex
                                      zero     V // Zero value for type V
                                      }

                                      // New creates a new LRU Cache with given capacity
                                      func New[K comparable, V any](capacity int) *Cache[K, V] {
                                      if capacity <= 0 {
                                      panic("capacity must be positive")
                                      }
                                      return &Cache[K, V]{
                                      capacity: capacity,
                                      cache:    make(map[K]*list.Element, capacity),
                                      list:     list.New(),
                                      }
                                      }

                                      // Get retrieves value by key, returns (value, true) or (zero, false)
                                      func (c *Cache[K, V]) Get(key K) (V, bool) {
                                      c.mu.Lock()
                                      defer c.mu.Unlock()

                                      elem, ok := c.cache[key]
                                      if !ok {
                                      return c.zero, false
                                      }

                                      // Move to front (MRU position)
                                      c.list.MoveToFront(elem)
                                      return elem.Value.(*entry[K, V]).value, true
                                      }

                                      // Put inserts or updates key-value pair
                                      func (c *Cache[K, V]) Put(key K, value V) {
                                      c.mu.Lock()
                                      defer c.mu.Unlock()

                                      if elem, ok := c.cache[key]; ok {
                                      // Update existing
                                      elem.Value.(*entry[K, V]).value = value
                                      c.list.MoveToFront(elem)
                                      return
                                      }

                                      // Evict if at capacity
                                      if c.list.Len() >= c.capacity {
                                      c.evictLRU()
                                      }

                                      // Insert new
                                      ent := &entry[K, V]{key: key, value: value}
                                      elem := c.list.PushFront(ent)
                                      c.cache[key] = elem
                                      }

                                      // evictLRU removes least recently used entry (must hold lock)
                                      func (c *Cache[K, V]) evictLRU() {
                                      back := c.list.Back()
                                      if back == nil {
                                      return
                                      }

                                      ent := back.Value.(*entry[K, V])
                                      delete(c.cache, ent.key)
                                      c.list.Remove(back)
                                      }

                                      // Peek gets value without updating recency
                                      func (c *Cache[K, V]) Peek(key K) (V, bool) {
                                      c.mu.RLock()
                                      defer c.mu.RUnlock()

                                      elem, ok := c.cache[key]
                                      if !ok {
                                      return c.zero, false
                                      }
                                      return elem.Value.(*entry[K, V]).value, true
                                      }

                                      // Len returns current number of entries
                                      func (c *Cache[K, V]) Len() int {
                                      c.mu.RLock()
                                      defer c.mu.RUnlock()
                                      return c.list.Len()
                                      }

                                      // Delete removes a key from the cache
                                      func (c *Cache[K, V]) Delete(key K) bool {
                                      c.mu.Lock()
                                      defer c.mu.Unlock()

                                      elem, ok := c.cache[key]
                                      if !ok {
                                      return false
                                      }

                                      delete(c.cache, key)
                                      c.list.Remove(elem)
                                      return true
                                      }
                                      ```

  ---

## Thread Safety Deep Dive

### The Challenge

<span style="background: #dcfce7; padding: 2px 6px; border-radius: 4px; font-weight: 500;">LRU Cache operations appear to be simple reads (get) and writes (put), but get actually MUTATES the data structure by updating access order. This makes thread-safe implementation non-trivial.</span>

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 2px solid #fca5a5; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="font-weight: 600; color: #991b1b; font-size: 15px; margin-bottom: 12px;">Race Condition Example</div>

<div style="display: flex; gap: 20px; flex-wrap: wrap;">
<div style="flex: 1; min-width: 200px;">
<div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 6px; padding: 12px; margin-bottom: 8px;">
<div style="font-weight: 600; color: #92400e; font-size: 12px;">Thread A: get(key1)</div>
<div style="color: #78350f; font-size: 11px; font-family: monospace;">
  1. Read node from map<br>
  2. Remove node from list<br>
<span style="color: #dc2626;">--CONTEXT SWITCH--</span><br>
  3. Add node to front
</div>
</div>
</div>

<div style="flex: 1; min-width: 200px;">
<div style="background: #dbeafe; border: 1px solid #93c5fd; border-radius: 6px; padding: 12px; margin-bottom: 8px;">
<div style="font-weight: 600; color: #1e40af; font-size: 12px;">Thread B: put(key2)</div>
<div style="color: #1e3a8a; font-size: 11px; font-family: monospace;">
<span style="color: #dc2626;">--RUNS DURING SWITCH--</span><br>
  1. Check capacity (full)<br>
  2. Evict tail.prev<br>
<span style="color: #dc2626; font-weight: bold;">BUG: May evict wrong node!</span>
</div>
</div>
</div>
</div>

<div style="color: #7f1d1d; font-size: 13px; margin-top: 12px;">
<strong>Result:</strong> List structure is corrupted because Thread A left the node in a partially removed state.
</div>
</div>

### Synchronization Strategies

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">

<div style="background: #ffffff; border: 2px solid #f59e0b; border-radius: 8px; overflow: hidden;">
<div style="background: #f59e0b; color: white; padding: 12px; font-weight: 600;">1. Global Mutex (Simple)</div>
<div style="padding: 14px;">
<div style="color: #374151; font-size: 13px; margin-bottom: 10px;">Single lock protects all operations</div>
<div style="font-size: 12px;">
<div style="color: #059669; margin-bottom: 4px;">+ Simple to implement correctly</div>
<div style="color: #059669; margin-bottom: 4px;">+ No deadlock risk</div>
<div style="color: #dc2626; margin-bottom: 4px;">- No concurrent reads</div>
<div style="color: #dc2626;">- Bottleneck under high load</div>
</div>
</div>
</div>

<div style="background: #ffffff; border: 2px solid #3b82f6; border-radius: 8px; overflow: hidden;">
<div style="background: #3b82f6; color: white; padding: 12px; font-weight: 600;">2. Read-Write Lock</div>
<div style="padding: 14px;">
<div style="color: #374151; font-size: 13px; margin-bottom: 10px;">Readers share, writers exclusive</div>
<div style="font-size: 12px;">
<div style="color: #059669; margin-bottom: 4px;">+ Concurrent reads for peek()</div>
<div style="color: #dc2626; margin-bottom: 4px;">- get() needs write lock (updates order)</div>
<div style="color: #dc2626; margin-bottom: 4px;">- Limited benefit for LRU</div>
<div style="color: #6b7280;">See: Java ReentrantReadWriteLock</div>
</div>
</div>
</div>

<div style="background: #ffffff; border: 2px solid #059669; border-radius: 8px; overflow: hidden;">
<div style="background: #059669; color: white; padding: 12px; font-weight: 600;">3. Segmented/Striped Locks</div>
<div style="padding: 14px;">
<div style="color: #374151; font-size: 13px; margin-bottom: 10px;">Partition cache into segments, each with own lock</div>
<div style="font-size: 12px;">
<div style="color: #059669; margin-bottom: 4px;">+ Parallel access to different segments</div>
<div style="color: #059669; margin-bottom: 4px;">+ Used by ConcurrentHashMap</div>
<div style="color: #dc2626; margin-bottom: 4px;">- Per-segment LRU, not global</div>
<div style="color: #dc2626;">- Complex implementation</div>
</div>
</div>
</div>

<div style="background: #ffffff; border: 2px solid #7c3aed; border-radius: 8px; overflow: hidden;">
<div style="background: #7c3aed; color: white; padding: 12px; font-weight: 600;">4. Lock-Free (Advanced)</div>
<div style="padding: 14px;">
<div style="color: #374151; font-size: 13px; margin-bottom: 10px;">CAS operations, concurrent data structures</div>
<div style="font-size: 12px;">
<div style="color: #059669; margin-bottom: 4px;">+ Maximum throughput</div>
<div style="color: #059669; margin-bottom: 4px;">+ No blocking</div>
<div style="color: #dc2626; margin-bottom: 4px;">- Extremely complex</div>
<div style="color: #dc2626;">- Often approximate LRU</div>
</div>
</div>
</div>
</div>
</div>

### Production Approaches

**Caffeine (Java)** uses a sophisticated approach:
                                                  - Window TinyLFU admission policy (better than pure LRU)
                                                  - Concurrent hash table with compare-and-swap
                                                  - Buffer writes to avoid contention
                                                  - Background thread processes access order updates

**Guava Cache** uses:
                                                  - Segmented design (like ConcurrentHashMap)
                                                  - Each segment has its own LRU order
                                                  - Global LRU is approximated, not exact

<span style="background: #dcfce7; padding: 2px 6px; border-radius: 4px; font-weight: 500;">In interviews, implement simple global lock first, then discuss trade-offs. Mentioning Caffeine/Guava shows production awareness.</span>

### Interview Questions: Thread Safety

<div style="background: #faf5ff; border: 1px solid #d8b4fe; border-radius: 8px; padding: 16px; margin: 16px 0;">
<div style="font-weight: 600; color: #6b21a8; margin-bottom: 8px;">L1: Why does get() need a write lock in thread-safe LRU Cache?</div>
<div style="color: #581c87; font-size: 13px; margin-bottom: 12px;">Because get() modifies the data structure by moving the accessed node to the front of the list. This is a write operation on the linked list, even though it appears to be a "read" from the caller's perspective.</div>

<div style="margin-left: 20px; border-left: 3px solid #c084fc; padding-left: 16px;">
<div style="font-weight: 600; color: #7c3aed; margin-bottom: 8px;">L2: How would you optimize for a read-heavy workload?</div>
<div style="color: #5b21b6; font-size: 13px; margin-bottom: 12px;">Options: (1) Add peek() that doesn't update order (can use read lock). (2) Buffer access events and batch-update order periodically. (3) Use approximate LRU with probabilistic promotion (not every read moves to front). (4) Segmented cache where each segment has its own LRU. (5) Consider CLOCK algorithm which approximates LRU with less contention.</div>

<div style="margin-left: 20px; border-left: 3px solid #a78bfa; padding-left: 16px;">
<div style="font-weight: 600; color: #8b5cf6; margin-bottom: 8px;">L3: Explain the buffered writes approach used by Caffeine. What are the trade-offs?</div>
<div style="color: #6d28d9; font-size: 13px;">Caffeine uses read/write buffers backed by concurrent queues. Access events are appended to buffer (fast, non-blocking). A maintenance thread periodically drains buffers and updates the eviction policy. Trade-offs: (1) Access order is eventually consistent, not immediately reflected. (2) Memory overhead for buffers. (3) Under extreme write bursts, buffers may overflow (Caffeine drops oldest events). (4) Eviction decisions based on slightly stale information. This is acceptable because perfect LRU is often overkill - near-LRU with high throughput is better in practice.</div>
</div>
</div>
</div>

  ---

## Cache Eviction Policies Comparison

<span style="background: #dcfce7; padding: 2px 6px; border-radius: 4px; font-weight: 500;">LRU is just one eviction policy. Understanding alternatives shows depth and helps choose the right tool for specific workloads.</span>

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<table style="width: 100%; border-collapse: collapse; font-size: 13px;">
  <thead>
<tr style="background: #e2e8f0;">
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Policy</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Evicts</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Pros</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Cons</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Use Case</th>
</tr>
  </thead>
  <tbody>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #059669;">LRU</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Least recently accessed</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Simple, O(1), good locality</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Scan pollution, ignores frequency</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">General purpose, web caching</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #3b82f6;">LFU</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Least frequently accessed</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Keeps popular items</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Old popular items never evicted, O(log n) naive</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">CDN, long-running caches</td>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #7c3aed;">FIFO</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">First inserted</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Simplest, no access tracking</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Ignores actual usage</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Write buffers, simple queues</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #f59e0b;">CLOCK</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Approximates LRU</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Less metadata than LRU, fast</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Only approximation</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">OS page replacement</td>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #dc2626;">ARC</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Adaptive (recency + frequency)</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Self-tuning, scan-resistant</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">Complex, IBM patent (expired)</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">ZFS, databases</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; font-weight: 600; color: #0ea5e9;">TinyLFU</td>
<td style="padding: 12px;">Combines LRU window + LFU main</td>
<td style="padding: 12px;">Best hit rates, scan-resistant</td>
<td style="padding: 12px;">Complex, approximate</td>
<td style="padding: 12px;">Caffeine, modern caches</td>
</tr>
  </tbody>
</table>
</div>

### LRU Scan Pollution Problem

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 2px solid #fca5a5; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="font-weight: 600; color: #991b1b; font-size: 15px; margin-bottom: 12px;">Scan Pollution Example</div>
<div style="color: #7f1d1d; font-size: 13px; margin-bottom: 16px;">
  Consider a database with a hot set (frequently accessed) and a full table scan:
</div>

<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="background: white; border: 1px solid #fca5a5; border-radius: 6px; padding: 12px;">
<div style="font-weight: 600; color: #991b1b; font-size: 12px;">Before Scan</div>
<div style="color: #7f1d1d; font-size: 11px; font-family: monospace;">Cache: [A, B, C, D, E] (all hot, frequently accessed)</div>
</div>

<div style="background: white; border: 1px solid #fca5a5; border-radius: 6px; padding: 12px;">
<div style="font-weight: 600; color: #991b1b; font-size: 12px;">Full Table Scan Reads: X, Y, Z, W, V (each accessed once)</div>
<div style="color: #7f1d1d; font-size: 11px; font-family: monospace;">Cache: [X, Y, Z, W, V] (all cold, never accessed again!)</div>
</div>

<div style="background: white; border: 1px solid #fca5a5; border-radius: 6px; padding: 12px;">
<div style="font-weight: 600; color: #991b1b; font-size: 12px;">Result</div>
<div style="color: #7f1d1d; font-size: 11px;">Hot data evicted by one-time scan. Cache becomes useless until hot data reloaded.</div>
</div>
</div>
</div>

### LFU Implementation Insight

  See [[LFU Cache]](/topic/machine-coding/lfu-cache) for detailed implementation. Key difference: LFU uses frequency counts and requires O(1) access to minimum frequency bucket.

### Interview Questions: Eviction Policies

<div style="background: #faf5ff; border: 1px solid #d8b4fe; border-radius: 8px; padding: 16px; margin: 16px 0;">
<div style="font-weight: 600; color: #6b21a8; margin-bottom: 8px;">L1: When would LFU be better than LRU?</div>
<div style="color: #581c87; font-size: 13px; margin-bottom: 12px;">When access patterns have clear frequency differences. Example: A popular API endpoint called 1000x/sec should stay cached even if a batch job scans through rarely-accessed data. LRU would evict the popular endpoint; LFU keeps it.</div>

<div style="margin-left: 20px; border-left: 3px solid #c084fc; padding-left: 16px;">
<div style="font-weight: 600; color: #7c3aed; margin-bottom: 8px;">L2: What's the main problem with pure LFU?</div>
<div style="color: #5b21b6; font-size: 13px; margin-bottom: 12px;">Cache pollution from historical frequency. Items popular in the past but no longer relevant (e.g., yesterday's trending topic) can't be evicted because they accumulated high frequency counts. Solutions: decay frequency over time, use windowed LFU, or hybrid approaches like TinyLFU.</div>

<div style="margin-left: 20px; border-left: 3px solid #a78bfa; padding-left: 16px;">
<div style="font-weight: 600; color: #8b5cf6; margin-bottom: 8px;">L3: Explain how TinyLFU solves both LRU's scan pollution and LFU's history problem.</div>
<div style="color: #6d28d9; font-size: 13px;">TinyLFU uses a small LRU "window" (typically 1% of cache) as an admission filter. New items enter the window first. To enter the main cache, an item must "win" against a potential eviction victim by having higher estimated frequency. Frequency is tracked using a Count-Min Sketch (probabilistic, constant space) that's periodically halved (aging). The main cache uses Segmented LRU (protected + probationary segments). This combines recency (window), frequency (admission filter), and aging (sketch decay), achieving near-optimal hit rates while resisting both scan pollution and stale frequency.</div>
</div>
</div>
</div>

  ---

## Distributed Caching

<span style="background: #dcfce7; padding: 2px 6px; border-radius: 4px; font-weight: 500;">Scaling LRU Cache beyond a single machine introduces fundamental distributed systems challenges: consistency, partition tolerance, and coordination overhead.</span>

### Architecture Patterns

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">

<div style="background: #ffffff; border: 2px solid #3b82f6; border-radius: 8px; overflow: hidden;">
<div style="background: #3b82f6; color: white; padding: 12px; font-weight: 600; text-align: center;">Replicated Cache</div>
<div style="padding: 14px;">
<div style="text-align: center; margin-bottom: 12px;">
<div style="display: inline-flex; gap: 8px;">
<div style="background: #dbeafe; border: 1px solid #93c5fd; padding: 8px 12px; border-radius: 6px; font-size: 11px;">Node A<br><span style="font-size: 9px;">Full Copy</span></div>
<div style="background: #dbeafe; border: 1px solid #93c5fd; padding: 8px 12px; border-radius: 6px; font-size: 11px;">Node B<br><span style="font-size: 9px;">Full Copy</span></div>
<div style="background: #dbeafe; border: 1px solid #93c5fd; padding: 8px 12px; border-radius: 6px; font-size: 11px;">Node C<br><span style="font-size: 9px;">Full Copy</span></div>
</div>
</div>
<div style="font-size: 12px; color: #374151;">
<div style="color: #059669;">+ Fast reads (local)</div>
<div style="color: #059669;">+ High availability</div>
<div style="color: #dc2626;">- Write amplification</div>
<div style="color: #dc2626;">- Limited by smallest node</div>
</div>
</div>
</div>

<div style="background: #ffffff; border: 2px solid #059669; border-radius: 8px; overflow: hidden;">
<div style="background: #059669; color: white; padding: 12px; font-weight: 600; text-align: center;">Partitioned/Sharded Cache</div>
<div style="padding: 14px;">
<div style="text-align: center; margin-bottom: 12px;">
<div style="display: inline-flex; gap: 8px;">
<div style="background: #dcfce7; border: 1px solid #86efac; padding: 8px 12px; border-radius: 6px; font-size: 11px;">Node A<br><span style="font-size: 9px;">Keys 0-33%</span></div>
<div style="background: #dcfce7; border: 1px solid #86efac; padding: 8px 12px; border-radius: 6px; font-size: 11px;">Node B<br><span style="font-size: 9px;">Keys 34-66%</span></div>
<div style="background: #dcfce7; border: 1px solid #86efac; padding: 8px 12px; border-radius: 6px; font-size: 11px;">Node C<br><span style="font-size: 9px;">Keys 67-100%</span></div>
</div>
</div>
<div style="font-size: 12px; color: #374151;">
<div style="color: #059669;">+ Scales capacity linearly</div>
<div style="color: #059669;">+ Per-shard LRU works well</div>
<div style="color: #dc2626;">- Network hop for remote keys</div>
<div style="color: #dc2626;">- Rebalancing complexity</div>
</div>
</div>
</div>

<div style="background: #ffffff; border: 2px solid #7c3aed; border-radius: 8px; overflow: hidden;">
<div style="background: #7c3aed; color: white; padding: 12px; font-weight: 600; text-align: center;">Tiered Cache (L1 + L2)</div>
<div style="padding: 14px;">
<div style="text-align: center; margin-bottom: 12px;">
<div style="display: flex; flex-direction: column; gap: 4px; align-items: center;">
<div style="background: #ede9fe; border: 1px solid #c4b5fd; padding: 6px 10px; border-radius: 6px; font-size: 10px;">L1: Local (per-instance, small)</div>
<div style="color: #6b7280; font-size: 10px;">miss</div>
<div style="background: #f3e8ff; border: 1px solid #d8b4fe; padding: 6px 10px; border-radius: 6px; font-size: 10px;">L2: Distributed (shared, large)</div>
</div>
</div>
<div style="font-size: 12px; color: #374151;">
<div style="color: #059669;">+ Best latency for hot data</div>
<div style="color: #059669;">+ Reduces L2 load</div>
<div style="color: #dc2626;">- Consistency between tiers</div>
<div style="color: #dc2626;">- Cache invalidation complexity</div>
</div>
</div>
</div>
</div>
</div>

### Consistent Hashing for Sharding

<span style="background: #dcfce7; padding: 2px 6px; border-radius: 4px; font-weight: 500;">Consistent hashing minimizes key redistribution when nodes are added/removed. Instead of rehashing all keys, only keys in the affected range move.</span>

  See [[Consistent Hashing]](/topic/system-design/consistent-hashing) for detailed explanation.

  Key insight for LRU: Each shard maintains its own LRU order independently. There's no global LRU across the cluster - this is acceptable because:
  1. Global LRU would require cross-node coordination (slow)
  2. Per-shard LRU approximates global LRU well enough
  3. Hot keys naturally stay cached on their designated shards

### Cache Invalidation

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 20px 0;">
<div style="font-weight: 600; color: #92400e; margin-bottom: 8px;">"There are only two hard things in Computer Science: cache invalidation and naming things." - Phil Karlton</div>
</div>

**Invalidation Strategies:**

  | Strategy | Mechanism | Trade-off |
  |----------|-----------|-----------|
  | **TTL (Time-to-Live)** | Entries expire after fixed duration | Simple but may serve stale data |
  | **Write-Through** | Update cache on every write | Consistent but slower writes |
  | **Write-Behind** | Async cache update after write | Fast writes, brief inconsistency |
  | **Pub/Sub Invalidation** | Broadcast invalidation messages | Consistent, requires messaging infra |
  | **Version/ETag** | Check version on read | Reduces bandwidth, adds latency |

### Real-World Systems

**Redis:**
                                                              - Single-threaded (no lock contention)
                                                              - Approximates LRU with sampling (configurable sample size)
                                                              - `maxmemory-policy`: allkeys-lru, volatile-lru, allkeys-lfu, etc.
                                                              - Cluster mode: sharded by key hash slot

**Memcached:**
                                                              - LRU per slab class (items grouped by size)
                                                              - No native clustering (client-side sharding)
                                                              - Simple protocol, very fast

**Caffeine (JVM):**
                                                              - Window TinyLFU policy
                                                              - Near-optimal hit rates
                                                              - Async maintenance for high throughput

### Interview Questions: Distributed Caching

<div style="background: #faf5ff; border: 1px solid #d8b4fe; border-radius: 8px; padding: 16px; margin: 16px 0;">
<div style="font-weight: 600; color: #6b21a8; margin-bottom: 8px;">L1: How would you distribute an LRU cache across multiple servers?</div>
<div style="color: #581c87; font-size: 13px; margin-bottom: 12px;">Use consistent hashing to partition keys across nodes. Each node maintains its own LRU cache for its assigned keys. Clients hash the key to determine which node to contact. This scales capacity linearly with nodes.</div>

<div style="margin-left: 20px; border-left: 3px solid #c084fc; padding-left: 16px;">
<div style="font-weight: 600; color: #7c3aed; margin-bottom: 8px;">L2: What happens when a node fails or is added?</div>
<div style="color: #5b21b6; font-size: 13px; margin-bottom: 12px;">With consistent hashing, only keys mapped to the failed/new node are affected. For failure: those keys become cache misses until the node recovers or is replaced. For addition: some keys from neighboring nodes remap to the new node (cold start). Use virtual nodes to distribute load more evenly. Consider replication for high availability.</div>

<div style="margin-left: 20px; border-left: 3px solid #a78bfa; padding-left: 16px;">
<div style="font-weight: 600; color: #8b5cf6; margin-bottom: 8px;">L3: How do you handle cache stampede when a popular key expires or node fails?</div>
<div style="color: #6d28d9; font-size: 13px;">Cache stampede: multiple requests simultaneously try to recompute/fetch a missing popular key, overwhelming the backend. Solutions: (1) Locking - only one request recomputes, others wait or get stale data. (2) Probabilistic early expiration - randomly refresh before TTL to avoid synchronized expiration. (3) Background refresh - proactively refresh popular keys before expiration. (4) Request coalescing - combine identical in-flight requests. (5) Circuit breaker - limit concurrent backend requests. For node failure specifically, implement warm-up procedures to gradually restore the cache.</div>
</div>
</div>
</div>

  ---

## Edge Cases and Common Bugs

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 2px solid #fca5a5; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="font-weight: 600; color: #991b1b; font-size: 15px; margin-bottom: 16px;">Common Implementation Bugs</div>

<table style="width: 100%; border-collapse: collapse; font-size: 13px;">
  <thead>
<tr style="background: #fee2e2;">
<th style="padding: 10px; text-align: left; border-bottom: 2px solid #fca5a5;">Bug</th>
<th style="padding: 10px; text-align: left; border-bottom: 2px solid #fca5a5;">Symptom</th>
<th style="padding: 10px; text-align: left; border-bottom: 2px solid #fca5a5;">Fix</th>
</tr>
  </thead>
  <tbody>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #fecaca;">Forget to delete from HashMap on eviction</td>
<td style="padding: 10px; border-bottom: 1px solid #fecaca;">Memory leak, size never decreases</td>
<td style="padding: 10px; border-bottom: 1px solid #fecaca;">Always delete from both structures</td>
</tr>
<tr style="background: #fef2f2;">
<td style="padding: 10px; border-bottom: 1px solid #fecaca;">Update doesn't move to front</td>
<td style="padding: 10px; border-bottom: 1px solid #fecaca;">Updated items evicted unexpectedly</td>
<td style="padding: 10px; border-bottom: 1px solid #fecaca;">Call moveToFront on update</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #fecaca;">Wrong pointer update order</td>
<td style="padding: 10px; border-bottom: 1px solid #fecaca;">Corrupted list, lost nodes</td>
<td style="padding: 10px; border-bottom: 1px solid #fecaca;">Set new node pointers first</td>
</tr>
<tr style="background: #fef2f2;">
<td style="padding: 10px; border-bottom: 1px solid #fecaca;">Confuse sentinel with data nodes</td>
<td style="padding: 10px; border-bottom: 1px solid #fecaca;">Return dummy values, crash</td>
<td style="padding: 10px; border-bottom: 1px solid #fecaca;">Clear separation, never store data in sentinels</td>
</tr>
<tr>
<td style="padding: 10px; border-bottom: 1px solid #fecaca;">Capacity 0 not handled</td>
<td style="padding: 10px; border-bottom: 1px solid #fecaca;">Division by zero, infinite loop</td>
<td style="padding: 10px; border-bottom: 1px solid #fecaca;">Validate capacity > 0 in constructor</td>
</tr>
<tr style="background: #fef2f2;">
<td style="padding: 10px;">Node key not stored</td>
<td style="padding: 10px;">Can't remove from HashMap on evict</td>
<td style="padding: 10px;">Store key in Node class</td>
</tr>
  </tbody>
</table>
</div>

### Critical Edge Cases to Test

                                                              ```python
                                                              def test_edge_cases():
                                                              # Capacity 1 - every put after first evicts
                                                              cache = LRUCache(1)
                                                              cache.put(1, 1)
                                                              cache.put(2, 2)  # Evicts 1
                                                              assert cache.get(1) == -1
                                                              assert cache.get(2) == 2

                                                              # Update same key multiple times
                                                              cache = LRUCache(2)
                                                              cache.put(1, 1)
                                                              cache.put(1, 10)  # Update, not insert
                                                              cache.put(1, 100) # Update again
                                                              assert cache.get(1) == 100
                                                              assert len(cache.cache) == 1  # Still only 1 entry

                                                              # Get non-existent key shouldn't crash or modify state
                                                              cache = LRUCache(2)
                                                              assert cache.get(999) == -1
                                                              cache.put(1, 1)
                                                              assert cache.get(999) == -1
                                                              assert cache.get(1) == 1  # Original still works

                                                              # Access pattern affects eviction
                                                              cache = LRUCache(3)
                                                              cache.put(1, 1)
                                                              cache.put(2, 2)
                                                              cache.put(3, 3)
                                                              cache.get(1)      # 1 is now MRU
                                                              cache.put(4, 4)   # Evicts 2 (not 1!)
                                                              assert cache.get(2) == -1
                                                              assert cache.get(1) == 1

                                                              # Empty cache operations
                                                              cache = LRUCache(2)
                                                              assert cache.get(1) == -1  # No crash

                                                              # Large capacity
                                                              cache = LRUCache(10000)
                                                              for i in range(10000):
                                                              cache.put(i, i)
                                                              assert cache.get(0) == 0  # First item still there
                                                              cache.put(10000, 10000)   # Now evicts 1 (not 0, we just accessed 0)
                                                              assert cache.get(1) == -1
                                                              ```

  ---

## Interview Execution Guide

### 45-Minute Timeline

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<div style="display: flex; flex-direction: column; gap: 12px;">

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #059669; color: white; padding: 8px 14px; border-radius: 6px; font-weight: 600; font-size: 13px; min-width: 70px; text-align: center;">0-5 min</div>
<div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; flex: 1;">
<div style="font-weight: 600; color: #374151; font-size: 13px;">Clarify Requirements</div>
<div style="color: #6b7280; font-size: 12px;">Operations? Thread-safety? Capacity range? Return type for missing keys?</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #3b82f6; color: white; padding: 8px 14px; border-radius: 6px; font-weight: 600; font-size: 13px; min-width: 70px; text-align: center;">5-12 min</div>
<div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; flex: 1;">
<div style="font-weight: 600; color: #374151; font-size: 13px;">Design Discussion</div>
<div style="color: #6b7280; font-size: 12px;">Draw HashMap + Doubly Linked List. Explain why each is needed. Walk through get/put.</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #7c3aed; color: white; padding: 8px 14px; border-radius: 6px; font-weight: 600; font-size: 13px; min-width: 70px; text-align: center;">12-35 min</div>
<div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; flex: 1;">
<div style="font-weight: 600; color: #374151; font-size: 13px;">Implementation</div>
<div style="color: #6b7280; font-size: 12px;">Node class -> Helper methods (add, remove, move) -> get() -> put(). Comment as you go.</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #f59e0b; color: white; padding: 8px 14px; border-radius: 6px; font-weight: 600; font-size: 13px; min-width: 70px; text-align: center;">35-40 min</div>
<div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; flex: 1;">
<div style="font-weight: 600; color: #374151; font-size: 13px;">Testing & Verification</div>
<div style="color: #6b7280; font-size: 12px;">Dry run example. Trace through edge cases verbally. Check pointer updates.</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #dc2626; color: white; padding: 8px 14px; border-radius: 6px; font-weight: 600; font-size: 13px; min-width: 70px; text-align: center;">40-45 min</div>
<div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; flex: 1;">
<div style="font-weight: 600; color: #374151; font-size: 13px;">Extensions Discussion</div>
<div style="color: #6b7280; font-size: 12px;">Thread-safety approach. TTL addition. LRU vs LFU. Distributed caching.</div>
</div>
</div>
</div>
</div>

### What Differentiates Candidates

  | Level | Expectation |
  |-------|-------------|
  | **Junior** | Completes working solution with prompting, handles basic cases |
  | **Mid** | Clean code with helper methods, discusses trade-offs, handles edge cases |
  | **Senior** | Thread-safety discussion, production considerations, alternative algorithms |
  | **Staff+** | Distributed design, cache coherence, real-world system references |

### Follow-up Questions to Prepare

  1. **Thread-safety**: "How would you make this thread-safe?" (locks, concurrent data structures)
  2. **TTL**: "Add expiration support" (timestamp per entry, lazy vs eager eviction)
  3. **Delete operation**: "Add explicit delete" (trivial addition)
  4. **Distributed**: "Scale to multiple machines" (consistent hashing, per-shard LRU)
  5. **LFU comparison**: "When would LFU be better?" (frequency matters, scan resistance)
  6. **Memory**: "Reduce memory usage" (intrusive list, object pooling)
  7. **Generics**: "Support any key/value type" (generics, comparable keys)

  ---

## Time and Space Complexity

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
  <thead>
<tr style="background: #e2e8f0;">
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Operation</th>
<th style="padding: 12px; text-align: center; border-bottom: 2px solid #cbd5e1;">Time (Average)</th>
<th style="padding: 12px; text-align: center; border-bottom: 2px solid #cbd5e1;">Time (Worst)</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Notes</th>
</tr>
  </thead>
  <tbody>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">get(key)</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #059669; font-weight: 600;">O(1)</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #f59e0b;">O(n)*</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-size: 12px;">*HashMap worst case with collisions</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">put(key, value)</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #059669; font-weight: 600;">O(1)</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #f59e0b;">O(n)*</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-size: 12px;">*HashMap resize amortized O(1)</td>
</tr>
<tr>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">delete(key)</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #059669; font-weight: 600;">O(1)</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center; color: #f59e0b;">O(n)*</td>
<td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-size: 12px;">Same as get + unlink</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; font-weight: 600;">Space</td>
<td style="padding: 12px; text-align: center;" colspan="2"><span style="color: #059669; font-weight: 600;">O(capacity)</span></td>
<td style="padding: 12px; font-size: 12px;">HashMap + List nodes</td>
</tr>
  </tbody>
</table>
</div>

**Per-Entry Memory (approximate, 64-bit system):**
                                                              - HashMap entry: 32-48 bytes (key, value ref, hash, next)
                                                              - List node: 24-40 bytes (key copy, value, prev, next)
                                                              - Total: ~60-90 bytes per entry (varies by language/implementation)

  ---

## Related Topics

                                                              - [[Hash Map]](/topic/data-structures/hash-map) - Underlying lookup structure
                                                              - [[Doubly Linked List]](/topic/data-structures/doubly-linked-list) - Underlying order structure
                                                              - [[LFU Cache]](/topic/machine-coding/lfu-cache) - Frequency-based alternative
                                                              - [[Consistent Hashing]](/topic/system-design/consistent-hashing) - Distribution strategy
                                                              - [[Redis]](/topic/system-design/redis) - Production cache implementation
                                                              - [[Caching Strategies]](/topic/system-design/caching) - Broader caching patterns

  ---

## Summary

<div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 2px solid #6ee7b7; border-radius: 12px; padding: 20px; margin: 20px 0;">
<div style="font-weight: 600; color: #047857; font-size: 16px; margin-bottom: 12px;">Key Takeaways</div>
<ul style="margin: 0; padding-left: 20px; color: #065f46; line-height: 1.8;">
<li><strong>Architecture</strong>: HashMap (O(1) lookup) + Doubly Linked List (O(1) reorder) = O(1) for both operations</li>
<li><strong>Why doubly linked</strong>: Removal needs predecessor access; singly linked would be O(n)</li>
<li><strong>Sentinel nodes</strong>: Eliminate null checks, simplify edge cases</li>
<li><strong>Store key in node</strong>: Required to delete from HashMap during eviction</li>
<li><strong>Thread-safety</strong>: get() modifies structure, needs write lock; consider buffered writes for high throughput</li>
<li><strong>Distributed</strong>: Per-shard LRU with consistent hashing; no global LRU needed</li>
<li><strong>Alternatives</strong>: LFU for frequency-heavy workloads; TinyLFU for best hit rates</li>
</ul>
</div>
