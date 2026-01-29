# Pub-Sub System

## Problem Statement

Design a publish-subscribe messaging system that enables asynchronous, decoupled communication between publishers and subscribers through topic-based routing, with guarantees around message delivery, ordering, and flow control.

---

## Core Concepts and Mental Model

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

**The Pub-Sub Pattern Fundamentally Solves Three Problems:**

1. **Temporal Decoupling**: Publishers and subscribers do not need to be active simultaneously
2. **Spatial Decoupling**: Publishers do not need to know subscriber locations or identities
3. **Synchronization Decoupling**: Publishers are not blocked waiting for subscriber processing

**Key Insight**: Unlike [[message-queues]](/topics/system-design/message-queues) where each message has one consumer, pub-sub delivers each message to ALL matching subscribers. This is the fan-out pattern.

</div>

---

## Section 1: Topic-Based Routing

### 1.1 The Routing Problem

Topic-based routing determines which subscribers receive which messages. This seemingly simple problem hides significant complexity in pattern matching, subscription management, and routing efficiency.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 16px;">Topic Hierarchy and Pattern Matching</h4>

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="background: #21262d; padding: 20px; border-radius: 10px;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 12px;">Hierarchical Topic Namespace</div>
<div style="display: flex; gap: 12px; flex-wrap: wrap;">
<div style="background: #238636; padding: 8px 14px; border-radius: 6px;">
<span style="color: #fff; font-size: 12px;">orders.us.created</span>
</div>
<div style="background: #238636; padding: 8px 14px; border-radius: 6px;">
<span style="color: #fff; font-size: 12px;">orders.eu.created</span>
</div>
<div style="background: #1f6feb; padding: 8px 14px; border-radius: 6px;">
<span style="color: #fff; font-size: 12px;">orders.us.shipped</span>
</div>
<div style="background: #8957e5; padding: 8px 14px; border-radius: 6px;">
<span style="color: #fff; font-size: 12px;">payments.processed</span>
</div>
</div>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #ffa657; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Single-Level Wildcard (*)</div>
<div style="color: #c9d1d9; font-size: 11px;">
<code>orders.*.created</code> matches:<br/>
- orders.us.created<br/>
- orders.eu.created<br/>
Does NOT match: orders.us.west.created
</div>
</div>
<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #f78166; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Multi-Level Wildcard (#)</div>
<div style="color: #c9d1d9; font-size: 11px;">
<code>orders.#</code> matches:<br/>
- orders.us.created<br/>
- orders.eu.shipped.confirmed<br/>
- orders (the topic itself)
</div>
</div>
</div>

</div>
</div>

### 1.2 Routing Data Structures

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4ecdc4;">

**Critical Design Decision: How to Store and Match Subscriptions**

| Approach | Publish Complexity | Subscribe Complexity | Memory | Best For |
|----------|-------------------|---------------------|--------|----------|
| **Linear Scan** | O(S) per message | O(1) | O(S) | Small subscription counts |
| **Trie-Based** | O(L) topic length | O(L) | O(S * L) | Hierarchical topics |
| **Inverted Index** | O(1) exact, O(S) wildcard | O(T) topics | O(S * T) | Exact match dominant |
| **Bloom Filter + Trie** | O(L) with fast rejection | O(L) | O(S * L + B) | High-volume, sparse matches |

**Assumption**: Most production systems use Trie-based routing because topic hierarchies naturally map to tree structures, enabling O(L) matching where L is topic depth.

</div>

```python
class TrieNode:
    """Trie node for efficient topic pattern matching."""
    def __init__(self):
        self.children: Dict[str, 'TrieNode'] = {}
        self.subscriptions: Set[str] = set()  # Subscriber IDs at this node
        self.wildcard_single: Optional['TrieNode'] = None   # '*' matches
        self.wildcard_multi: Set[str] = set()  # '#' subscriptions (terminal)

class TopicTrie:
    def __init__(self):
        self.root = TrieNode()

    def subscribe(self, pattern: str, subscriber_id: str) -> None:
        """
        Insert subscription pattern into trie.

        Time: O(L) where L is pattern depth
        Space: O(L) for new path nodes
        """
        parts = pattern.split('.')
        node = self.root

        for i, part in enumerate(parts):
            if part == '#':
                # Multi-level wildcard - matches everything below
                # MUST be the last segment
                node.wildcard_multi.add(subscriber_id)
                return
            elif part == '*':
                # Single-level wildcard
                if node.wildcard_single is None:
                    node.wildcard_single = TrieNode()
                node = node.wildcard_single
            else:
                if part not in node.children:
                    node.children[part] = TrieNode()
                node = node.children[part]

        node.subscriptions.add(subscriber_id)

    def match(self, topic: str) -> Set[str]:
        """
        Find all subscribers matching this topic.

        Key insight: Must traverse ALL possible paths including wildcards.

        Time: O(2^L) worst case with wildcards at every level
        Amortized: O(L) for typical hierarchical topics
        """
        parts = topic.split('.')
        subscribers = set()

        def traverse(node: TrieNode, depth: int):
            # Collect multi-level wildcard matches at any depth
            subscribers.update(node.wildcard_multi)

            if depth == len(parts):
                # Reached end of topic - collect exact matches
                subscribers.update(node.subscriptions)
                return

            part = parts[depth]

            # Exact match path
            if part in node.children:
                traverse(node.children[part], depth + 1)

            # Single-level wildcard path
            if node.wildcard_single:
                traverse(node.wildcard_single, depth + 1)

        traverse(self.root, 0)
        return subscribers
```

### 1.3 Interview Deep-Dive: Topic-Based Routing

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

**Level 1: How does topic pattern matching work?**

The broker maintains a mapping from topic patterns to subscribers. When a message arrives for topic "orders.us.created":
1. Parse the topic into segments: ["orders", "us", "created"]
2. Traverse the subscription trie, following exact matches and wildcard branches
3. Collect all subscriber IDs encountered at terminal nodes or '#' wildcards
4. Deduplicate and return the union of all matching subscribers

**Level 2: How do you handle the explosion of wildcard combinations efficiently?**

The naive approach of checking every pattern against every message is O(S) per message. Optimizations include:

1. **Reverse Matching**: Instead of checking if pattern matches topic, build a structure where topics "announce" to patterns. Use a trie where we traverse based on the MESSAGE topic, but the trie stores PATTERN subscriptions at nodes.

2. **Subscription Caching**: Cache the result of `match("orders.us.created")` since the same topic often receives many messages. Invalidate cache entries when subscriptions change for matching patterns.

3. **Bloom Filter Pre-filtering**: Before expensive trie traversal, check a bloom filter containing all subscribed topic prefixes. False positives are acceptable (we do the real match), but true negatives save work.

```python
class CachedTopicMatcher:
    def __init__(self, trie: TopicTrie, cache_size: int = 10000):
        self.trie = trie
        self.cache = OrderedDict()  # LRU cache
        self.cache_size = cache_size
        self.cache_version = 0
        self.subscription_version = 0

    def match(self, topic: str) -> Set[str]:
        # Check if cache is stale
        if self.cache_version != self.subscription_version:
            self.cache.clear()
            self.cache_version = self.subscription_version

        if topic in self.cache:
            self.cache.move_to_end(topic)
            return self.cache[topic]

        result = self.trie.match(topic)

        if len(self.cache) >= self.cache_size:
            self.cache.popitem(last=False)
        self.cache[topic] = result

        return result

    def invalidate_on_subscription_change(self):
        self.subscription_version += 1
```

**Level 3: What happens when you have millions of subscription patterns with overlapping wildcards?**

This is a real problem at scale (e.g., IoT platforms with device-specific subscriptions). Solutions:

1. **Subscription Grouping**: Instead of per-subscriber patterns, create "subscription groups" where many subscribers share the same pattern. The match returns group IDs, and a secondary lookup maps groups to individual subscribers.

2. **Hierarchical Sharding**: Partition the topic namespace across multiple matcher instances. Topic "orders.us.*" routes to shard based on hash("orders"). Each shard handles a subset of the topic hierarchy.

3. **Lazy Evaluation with Iterators**: Don't materialize the full subscriber set. Return an iterator that lazily traverses the trie, allowing early termination and streaming delivery.

4. **Hardware Acceleration**: Some high-frequency trading systems use FPGA-based pattern matchers for sub-microsecond routing decisions.

**Trade-off**: More sophisticated routing increases latency variance. A simple linear scan has predictable O(S) time, while trie traversal with caching has best-case O(1) but worst-case O(S) on cache misses during subscription churn.

</div>

---

## Section 2: Message Ordering Guarantees

### 2.1 The Ordering Problem

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

**Why Ordering Matters**: Consider an e-commerce system:
- Message 1: "Order 123 created"
- Message 2: "Order 123 shipped"
- Message 3: "Order 123 delivered"

If subscribers receive these out of order, they might process "delivered" before "created", causing data inconsistencies, failed foreign key constraints, or incorrect business logic execution.

**The Fundamental Trade-off**: Strong ordering guarantees reduce parallelism and throughput. Weak ordering enables high throughput but complicates application logic.

</div>

### 2.2 Ordering Semantics Spectrum

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 16px;">Message Ordering Guarantees</h4>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 20px; border-radius: 10px;">
<div style="color: #fff; font-weight: bold; margin-bottom: 12px;">No Ordering (Best Effort)</div>
<div style="color: rgba(255,255,255,0.9); font-size: 12px; line-height: 1.6;">
Messages may arrive in any order. Simplest to implement, highest throughput.<br/><br/>
<strong>Use case</strong>: Logging, metrics, notifications where order doesn't matter.
</div>
</div>

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 20px; border-radius: 10px;">
<div style="color: #fff; font-weight: bold; margin-bottom: 12px;">Per-Publisher Ordering</div>
<div style="color: rgba(255,255,255,0.9); font-size: 12px; line-height: 1.6;">
Messages from the same publisher arrive in send order. Different publishers' messages may interleave.<br/><br/>
<strong>Use case</strong>: User activity streams where each user's events must be ordered.
</div>
</div>

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 20px; border-radius: 10px;">
<div style="color: #fff; font-weight: bold; margin-bottom: 12px;">Per-Key Ordering</div>
<div style="color: rgba(255,255,255,0.9); font-size: 12px; line-height: 1.6;">
Messages with the same partition key arrive in order. Keys typically map to business entities.<br/><br/>
<strong>Use case</strong>: Order processing where all events for Order-123 must be sequential.
</div>
</div>

<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); padding: 20px; border-radius: 10px;">
<div style="color: #fff; font-weight: bold; margin-bottom: 12px;">Total Ordering</div>
<div style="color: rgba(255,255,255,0.9); font-size: 12px; line-height: 1.6;">
ALL messages across ALL publishers arrive in a single global order. Requires coordination.<br/><br/>
<strong>Use case</strong>: Financial transactions, distributed consensus.
</div>
</div>

</div>
</div>

### 2.3 Implementation Strategies

```python
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Callable
from collections import defaultdict
from threading import Lock
import heapq
import time

@dataclass
class Message:
    topic: str
    payload: Any
    message_id: str
    sequence_number: int              # Per-publisher or global sequence
    partition_key: Optional[str]      # For per-key ordering
    publisher_id: str
    timestamp: float = field(default_factory=time.time)

class SequenceTracker:
    """
    Tracks and enforces message ordering per partition key.

    Key insight: We must handle gaps in sequence numbers due to:
    1. Network reordering
    2. Publisher retries with same sequence
    3. Messages lost before reaching broker
    """
    def __init__(self, gap_timeout_seconds: float = 30.0):
        self.expected_sequence: Dict[str, int] = defaultdict(int)
        self.pending_messages: Dict[str, List[tuple]] = defaultdict(list)  # min-heap
        self.gap_timeout = gap_timeout_seconds
        self.gap_timestamps: Dict[str, float] = {}
        self.lock = Lock()

    def process_message(
        self,
        message: Message,
        deliver_callback: Callable[[Message], None]
    ) -> None:
        """
        Process message respecting ordering constraints.

        Algorithm:
        1. If message.sequence == expected: deliver immediately, advance expected
        2. If message.sequence > expected: buffer until gap fills or times out
        3. If message.sequence < expected: duplicate, discard
        """
        key = message.partition_key or message.publisher_id

        with self.lock:
            expected = self.expected_sequence[key]

            if message.sequence_number < expected:
                # Duplicate or already-processed message
                return

            if message.sequence_number == expected:
                # In-order message - deliver immediately
                self._deliver_and_drain(key, message, deliver_callback)
            else:
                # Out-of-order - buffer it
                heapq.heappush(
                    self.pending_messages[key],
                    (message.sequence_number, message)
                )

                # Start gap timer if not already running
                if key not in self.gap_timestamps:
                    self.gap_timestamps[key] = time.time()

    def _deliver_and_drain(
        self,
        key: str,
        message: Message,
        deliver_callback: Callable[[Message], None]
    ) -> None:
        """Deliver message and drain any now-deliverable buffered messages."""
        deliver_callback(message)
        self.expected_sequence[key] = message.sequence_number + 1

        # Clear gap timer since we made progress
        self.gap_timestamps.pop(key, None)

        # Drain buffered messages that are now in-order
        pending = self.pending_messages[key]
        while pending and pending[0][0] == self.expected_sequence[key]:
            _, buffered_msg = heapq.heappop(pending)
            deliver_callback(buffered_msg)
            self.expected_sequence[key] = buffered_msg.sequence_number + 1

    def check_gap_timeouts(
        self,
        deliver_callback: Callable[[Message], None]
    ) -> None:
        """
        Called periodically to handle gaps that won't be filled.

        Trade-off: Longer timeout = better ordering, higher latency
                   Shorter timeout = lower latency, possible reordering
        """
        now = time.time()

        with self.lock:
            for key, gap_start in list(self.gap_timestamps.items()):
                if now - gap_start > self.gap_timeout:
                    # Gap timed out - deliver buffered messages, skip the gap
                    pending = self.pending_messages[key]
                    if pending:
                        # Jump to the lowest buffered sequence
                        _, next_msg = heapq.heappop(pending)
                        self.expected_sequence[key] = next_msg.sequence_number
                        self._deliver_and_drain(key, next_msg, deliver_callback)
```

### 2.4 Interview Deep-Dive: Message Ordering

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

**Level 1: How do you maintain message order in a distributed pub-sub system?**

The key mechanism is **partitioning with affinity**:

1. Assign each message a partition key (e.g., order_id, user_id)
2. Hash the partition key to determine which broker partition handles it
3. Within a partition, messages are strictly ordered by sequence number
4. Each subscriber consumes from partitions in order

This provides per-key ordering while allowing parallelism across keys.

**Level 2: What happens when a subscriber is slower than the publish rate for its partitions?**

This creates backlog, but ordering is preserved because:

1. The broker maintains a per-partition, per-subscriber offset (like [[kafka]](/topics/system-design/message-queues))
2. The subscriber reads sequentially from its offset
3. Even if the subscriber restarts, it resumes from its last committed offset

However, problems arise with **fan-out to multiple subscribers**:
- Subscriber A might be at offset 1000
- Subscriber B might be at offset 500
- Both see messages in order, but at different points in time

If B queries A's state, there's temporal inconsistency. Solutions:
- Causal consistency with vector clocks
- Read-your-writes consistency through subscriber coordination
- Accepting eventual consistency for read paths

**Level 3: How do you handle ordering when messages span multiple topics that must be processed atomically?**

This is the **saga ordering** problem. Example:
- Topic "payments": PaymentReceived for Order-123
- Topic "inventory": ItemReserved for Order-123
- Business rule: Must process PaymentReceived before ItemReserved

Solutions:

1. **Single Topic with Message Types**: Collapse related messages into one topic, use message type field. Ordering within topic is guaranteed.

2. **Choreography with Causality Tokens**: Each message carries a causal dependency list. Subscribers buffer messages until dependencies are satisfied.

```python
@dataclass
class CausalMessage:
    message_id: str
    causal_dependencies: List[str]  # Message IDs that must be processed first
    payload: Any

class CausalOrderer:
    def __init__(self):
        self.processed: Set[str] = set()
        self.pending: Dict[str, CausalMessage] = {}

    def receive(self, msg: CausalMessage, deliver: Callable):
        if all(dep in self.processed for dep in msg.causal_dependencies):
            deliver(msg)
            self.processed.add(msg.message_id)
            self._try_deliver_pending(deliver)
        else:
            self.pending[msg.message_id] = msg

    def _try_deliver_pending(self, deliver: Callable):
        made_progress = True
        while made_progress:
            made_progress = False
            for msg_id, msg in list(self.pending.items()):
                if all(dep in self.processed for dep in msg.causal_dependencies):
                    deliver(msg)
                    self.processed.add(msg_id)
                    del self.pending[msg_id]
                    made_progress = True
```

3. **Orchestrator Pattern**: A central coordinator receives from multiple topics and emits ordered commands to a single execution topic.

**Trade-off**: Causal ordering adds latency (buffering) and complexity (dependency tracking). Many systems accept weaker guarantees and handle inconsistencies in application logic with idempotency and compensation.

</div>

---

## Section 3: At-Least-Once Delivery

### 3.1 Delivery Guarantee Spectrum

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

**The Three Delivery Guarantees:**

| Guarantee | Description | Failure Handling | Duplicates? |
|-----------|-------------|------------------|-------------|
| **At-Most-Once** | Fire and forget | No retry | No |
| **At-Least-Once** | Retry until acknowledged | Retry on failure/timeout | Yes |
| **Exactly-Once** | At-least-once + deduplication | Retry + idempotent processing | No |

**Critical Insight**: "Exactly-once" is often a misnomer. True exactly-once requires:
1. Idempotent message production (producer dedup)
2. Atomic commit of processing + acknowledgment
3. Idempotent side effects (consumer dedup)

Most systems implement "effectively exactly-once" through at-least-once delivery combined with idempotent consumers.

</div>

### 3.2 At-Least-Once Implementation Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 16px;">At-Least-Once Delivery Flow</h4>

<div style="display: flex; flex-direction: column; gap: 24px;">

<div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 16px 24px; border-radius: 10px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 13px;">Publisher</div>
<div style="color: rgba(255,255,255,0.8); font-size: 10px; margin-top: 4px;">Send + Await ACK</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #7ee787; font-size: 11px;">1. Publish</div>
<div style="color: #7ee787; font-size: 24px;">---></div>
</div>

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 16px 24px; border-radius: 10px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 13px;">Broker</div>
<div style="color: rgba(255,255,255,0.8); font-size: 10px; margin-top: 4px;">Persist + Track</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #ffa657; font-size: 11px;">2. Deliver</div>
<div style="color: #ffa657; font-size: 24px;">---></div>
</div>

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 16px 24px; border-radius: 10px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 13px;">Subscriber</div>
<div style="color: rgba(255,255,255,0.8); font-size: 10px; margin-top: 4px;">Process + ACK</div>
</div>
</div>

<div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
<div style="width: 120px;"></div>
<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #f78166; font-size: 24px;"><---</div>
<div style="color: #f78166; font-size: 11px;">3. Broker ACK</div>
</div>
<div style="width: 140px;"></div>
<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #f78166; font-size: 24px;"><---</div>
<div style="color: #f78166; font-size: 11px;">4. Consumer ACK</div>
</div>
</div>

<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #c9d1d9; font-size: 12px; line-height: 1.8;">
<strong style="color: #7ee787;">On timeout/failure at any step:</strong><br/>
- Step 1 fails: Publisher retries (may cause duplicate at broker)<br/>
- Step 2 fails: Broker retries delivery (subscriber sees duplicate)<br/>
- Step 4 fails: Broker retries delivery (subscriber sees duplicate)<br/>
<strong style="color: #ffa657;">All paths lead to potential duplicates - consumers MUST be idempotent</strong>
</div>
</div>

</div>
</div>

### 3.3 Core Implementation

```python
from enum import Enum
from dataclasses import dataclass, field
from typing import Dict, Set, Callable, Optional
from collections import defaultdict
import threading
import time
import uuid

class AckStatus(Enum):
    PENDING = "pending"
    ACKNOWLEDGED = "acknowledged"
    FAILED = "failed"
    EXPIRED = "expired"

@dataclass
class DeliveryAttempt:
    message_id: str
    subscriber_id: str
    attempt_number: int
    status: AckStatus
    delivered_at: float
    acked_at: Optional[float] = None
    error: Optional[str] = None

@dataclass
class PersistentMessage:
    """Message with delivery tracking state."""
    message_id: str
    topic: str
    payload: Any
    created_at: float
    delivery_attempts: Dict[str, DeliveryAttempt] = field(default_factory=dict)

    # Delivery configuration
    max_retries: int = 3
    retry_delay_seconds: float = 5.0
    ack_timeout_seconds: float = 30.0

class AtLeastOnceDeliveryManager:
    """
    Manages at-least-once delivery with acknowledgments and retries.

    Key invariants:
    1. Messages are persisted BEFORE delivery attempt
    2. Messages are only removed after ALL subscribers acknowledge
    3. Unacknowledged messages are retried with exponential backoff
    """

    def __init__(
        self,
        storage: 'MessageStorage',
        max_inflight_per_subscriber: int = 100
    ):
        self.storage = storage
        self.max_inflight = max_inflight_per_subscriber

        # Track in-flight deliveries awaiting acknowledgment
        self.inflight: Dict[str, Dict[str, DeliveryAttempt]] = defaultdict(dict)
        self.inflight_lock = threading.Lock()

        # Subscriber callbacks
        self.subscribers: Dict[str, Callable[[PersistentMessage], None]] = {}

        # Retry scheduling
        self.retry_queue: List[tuple] = []  # (retry_time, message_id, subscriber_id)
        self.retry_lock = threading.Lock()

        # Background threads
        self.running = False
        self.ack_checker_thread = None
        self.retry_thread = None

    def deliver(
        self,
        message: PersistentMessage,
        subscriber_ids: Set[str]
    ) -> Dict[str, str]:
        """
        Initiate delivery to all matching subscribers.

        Returns: Dict mapping subscriber_id -> delivery_attempt_id
        """
        delivery_ids = {}

        for sub_id in subscriber_ids:
            if sub_id not in self.subscribers:
                continue

            # Check inflight limit (backpressure)
            with self.inflight_lock:
                if len(self.inflight[sub_id]) >= self.max_inflight:
                    # Cannot deliver now - will be picked up by retry loop
                    continue

                attempt = DeliveryAttempt(
                    message_id=message.message_id,
                    subscriber_id=sub_id,
                    attempt_number=1,
                    status=AckStatus.PENDING,
                    delivered_at=time.time()
                )

                self.inflight[sub_id][message.message_id] = attempt
                message.delivery_attempts[sub_id] = attempt

            # Persist delivery state BEFORE calling subscriber
            self.storage.save_delivery_attempt(attempt)

            # Deliver asynchronously
            try:
                callback = self.subscribers[sub_id]
                # In production, this would be dispatched to a worker pool
                callback(message)
                delivery_ids[sub_id] = message.message_id
            except Exception as e:
                # Mark as failed for retry
                with self.inflight_lock:
                    attempt.status = AckStatus.FAILED
                    attempt.error = str(e)
                self._schedule_retry(message.message_id, sub_id, attempt.attempt_number)

        return delivery_ids

    def acknowledge(self, message_id: str, subscriber_id: str) -> bool:
        """
        Subscriber acknowledges successful processing.

        Returns: True if ack was valid, False if message unknown/already acked
        """
        with self.inflight_lock:
            if subscriber_id not in self.inflight:
                return False

            if message_id not in self.inflight[subscriber_id]:
                return False

            attempt = self.inflight[subscriber_id][message_id]
            attempt.status = AckStatus.ACKNOWLEDGED
            attempt.acked_at = time.time()

            # Remove from inflight
            del self.inflight[subscriber_id][message_id]

        # Persist ack state
        self.storage.save_delivery_attempt(attempt)

        # Check if all subscribers have acked - if so, message can be deleted
        self._try_complete_message(message_id)

        return True

    def negative_acknowledge(
        self,
        message_id: str,
        subscriber_id: str,
        error: Optional[str] = None,
        requeue: bool = True
    ) -> bool:
        """
        Subscriber indicates processing failed.

        If requeue=True, message will be retried.
        If requeue=False, message is dead-lettered.
        """
        with self.inflight_lock:
            if subscriber_id not in self.inflight:
                return False

            if message_id not in self.inflight[subscriber_id]:
                return False

            attempt = self.inflight[subscriber_id][message_id]
            attempt.status = AckStatus.FAILED
            attempt.error = error

            # Remove from inflight
            del self.inflight[subscriber_id][message_id]

        if requeue:
            self._schedule_retry(message_id, subscriber_id, attempt.attempt_number)
        else:
            self._dead_letter(message_id, subscriber_id, error)

        return True

    def _schedule_retry(
        self,
        message_id: str,
        subscriber_id: str,
        attempt_number: int
    ) -> None:
        """Schedule message for retry with exponential backoff."""
        message = self.storage.get_message(message_id)
        if not message:
            return

        if attempt_number >= message.max_retries:
            self._dead_letter(message_id, subscriber_id, "Max retries exceeded")
            return

        # Exponential backoff: delay * 2^attempt
        delay = message.retry_delay_seconds * (2 ** attempt_number)
        retry_time = time.time() + delay

        with self.retry_lock:
            heapq.heappush(
                self.retry_queue,
                (retry_time, message_id, subscriber_id, attempt_number + 1)
            )

    def _dead_letter(
        self,
        message_id: str,
        subscriber_id: str,
        reason: str
    ) -> None:
        """Move message to dead-letter queue for manual inspection."""
        message = self.storage.get_message(message_id)
        if message:
            self.storage.save_to_dead_letter(message, subscriber_id, reason)

    def _check_ack_timeouts(self) -> None:
        """Background thread: Check for timed-out deliveries."""
        while self.running:
            now = time.time()

            with self.inflight_lock:
                for sub_id, attempts in self.inflight.items():
                    for msg_id, attempt in list(attempts.items()):
                        message = self.storage.get_message(msg_id)
                        if not message:
                            continue

                        if now - attempt.delivered_at > message.ack_timeout_seconds:
                            attempt.status = AckStatus.EXPIRED
                            del attempts[msg_id]
                            self._schedule_retry(msg_id, sub_id, attempt.attempt_number)

            time.sleep(1.0)

    def _process_retries(self) -> None:
        """Background thread: Process scheduled retries."""
        while self.running:
            now = time.time()

            with self.retry_lock:
                while self.retry_queue and self.retry_queue[0][0] <= now:
                    _, msg_id, sub_id, attempt_num = heapq.heappop(self.retry_queue)

                    message = self.storage.get_message(msg_id)
                    if message and sub_id in self.subscribers:
                        # Re-deliver
                        self.deliver(message, {sub_id})

            time.sleep(0.5)
```

### 3.4 Interview Deep-Dive: At-Least-Once Delivery

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

**Level 1: How does at-least-once delivery work?**

The broker tracks delivery state for each message-subscriber pair:

1. **Persist**: Store message durably before acknowledging to publisher
2. **Deliver**: Send to subscriber, start ack timeout timer
3. **Track**: Mark as "in-flight" until subscriber acknowledges
4. **Retry**: If no ack within timeout, redeliver (increment attempt counter)
5. **Complete**: Remove from storage only after subscriber acknowledges

The "at-least-once" comes from: if anything fails after step 1, the message survives and will be retried. The subscriber might receive the same message multiple times.

**Level 2: How do you handle the "infinite retry" problem where a poison message crashes subscribers repeatedly?**

Poison messages (messages that cause subscriber failures) can create retry loops. Solutions:

1. **Retry Limits with Dead-Letter Queue (DLQ)**:
```python
MAX_RETRIES = 3

def handle_delivery_failure(message, error, attempt_count):
    if attempt_count >= MAX_RETRIES:
        dead_letter_queue.publish(message, error_reason=str(error))
        # Alert operations team
        alert(f"Message {message.id} dead-lettered after {MAX_RETRIES} attempts")
    else:
        schedule_retry(message, delay=exponential_backoff(attempt_count))
```

2. **Circuit Breaker Pattern**: If subscriber has high failure rate, pause delivery temporarily:
```python
class SubscriberCircuitBreaker:
    def __init__(self, failure_threshold=5, recovery_timeout=60):
        self.failure_count = 0
        self.last_failure_time = None
        self.state = "CLOSED"  # CLOSED, OPEN, HALF_OPEN

    def record_failure(self):
        self.failure_count += 1
        self.last_failure_time = time.time()
        if self.failure_count >= self.failure_threshold:
            self.state = "OPEN"

    def can_deliver(self) -> bool:
        if self.state == "CLOSED":
            return True
        if self.state == "OPEN":
            if time.time() - self.last_failure_time > self.recovery_timeout:
                self.state = "HALF_OPEN"
                return True  # Allow one probe request
            return False
        return True  # HALF_OPEN
```

3. **Message TTL**: Messages expire after a maximum age, preventing indefinite retry of stale data.

**Level 3: How do you achieve "exactly-once" processing semantics on top of at-least-once delivery?**

True exactly-once requires making the entire process idempotent. Strategies:

1. **Idempotency Keys with Deduplication**:
```python
class IdempotentProcessor:
    def __init__(self, dedup_store: 'DeduplicationStore'):
        self.dedup_store = dedup_store

    def process(self, message: Message) -> bool:
        # Check if already processed
        if self.dedup_store.contains(message.message_id):
            # Duplicate - acknowledge without reprocessing
            return True

        try:
            # Process message
            result = self._do_process(message)

            # ATOMICALLY: mark as processed + commit side effects
            # This is the hard part - requires transactional outbox or 2PC
            self.dedup_store.mark_processed(message.message_id)

            return True
        except Exception:
            # Don't mark as processed - will be retried
            return False
```

2. **Transactional Outbox Pattern** (for database + messaging):
```python
def process_order(order_message):
    with database.transaction():
        # 1. Update business state
        order = Order.create(order_message.payload)

        # 2. Write outgoing messages to outbox TABLE (same transaction)
        Outbox.insert(
            message_id=order_message.id,
            topic="order.created",
            payload=order.to_dict()
        )

        # 3. Mark input message as processed
        ProcessedMessages.insert(message_id=order_message.id)

    # Separate process polls outbox and publishes to broker
    # If crash between commit and publish, outbox entry survives
```

3. **Log-Based Processing** (like [[event-sourcing]](/topics/system-design/event-sourcing)):
- Consumer maintains its own offset/checkpoint
- Processing is deterministic
- On restart, replay from checkpoint
- Duplicates are automatically handled by replaying to same state

**Key Trade-off**: Exactly-once requires coordination between messaging and state storage, which adds latency and complexity. Many systems accept idempotent-at-application-level as sufficient.

</div>

---

## Section 4: Backpressure Handling

### 4.1 The Backpressure Problem

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

**Backpressure occurs when**: The rate of message production exceeds the rate of consumption.

Without proper handling, backpressure leads to:
- Unbounded memory growth (messages queue up)
- Increased latency (messages wait longer)
- Cascading failures (overwhelmed components crash)
- Message loss (buffers overflow)

**The fundamental choice**: When overwhelmed, do you slow down producers, drop messages, or crash?

</div>

### 4.2 Backpressure Strategies

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 16px;">Backpressure Handling Strategies</h4>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">

<div style="background: #21262d; padding: 20px; border-radius: 10px; border-left: 4px solid #238636;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 12px;">Buffering</div>
<div style="color: #c9d1d9; font-size: 11px; line-height: 1.6;">
Queue messages until consumer catches up. Works for temporary spikes.<br/><br/>
<strong>Risk</strong>: Unbounded growth causes OOM
</div>
</div>

<div style="background: #21262d; padding: 20px; border-radius: 10px; border-left: 4px solid #1f6feb;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Dropping</div>
<div style="color: #c9d1d9; font-size: 11px; line-height: 1.6;">
Discard messages when buffer full. Preserves system stability.<br/><br/>
<strong>Variants</strong>: Drop oldest, drop newest, sample
</div>
</div>

<div style="background: #21262d; padding: 20px; border-radius: 10px; border-left: 4px solid #8957e5;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 12px;">Throttling</div>
<div style="color: #c9d1d9; font-size: 11px; line-height: 1.6;">
Slow down producers via rate limiting or blocking.<br/><br/>
<strong>Methods</strong>: Token bucket, reject with 429, block until space
</div>
</div>

<div style="background: #21262d; padding: 20px; border-radius: 10px; border-left: 4px solid #f78166;">
<div style="color: #ffa657; font-weight: bold; margin-bottom: 12px;">Load Shedding</div>
<div style="color: #c9d1d9; font-size: 11px; line-height: 1.6;">
Intelligently reject low-priority work to preserve high-priority.<br/><br/>
<strong>Requires</strong>: Message priority classification
</div>
</div>

</div>
</div>

### 4.3 Implementation with Flow Control

```python
from dataclasses import dataclass
from typing import Dict, Optional, Callable
from collections import deque
from threading import Lock, Condition, Event
import time

@dataclass
class BackpressureConfig:
    """Configuration for backpressure handling."""
    # Buffer limits
    max_buffer_size: int = 10000
    high_watermark: float = 0.8   # Start backpressure at 80% full
    low_watermark: float = 0.5    # Release backpressure at 50% full

    # Dropping policy
    drop_policy: str = "newest"  # "oldest", "newest", "random", "priority"

    # Rate limiting
    max_publish_rate: Optional[float] = None  # messages per second

    # Blocking behavior
    block_on_full: bool = False
    block_timeout_seconds: float = 5.0

class BackpressureController:
    """
    Manages backpressure with multiple strategies.

    Implements reactive streams semantics where consumers signal demand
    and producers respect capacity.
    """

    def __init__(self, config: BackpressureConfig):
        self.config = config

        # Message buffer
        self.buffer: deque = deque(maxlen=config.max_buffer_size if config.drop_policy == "oldest" else None)
        self.buffer_lock = Lock()
        self.not_full = Condition(self.buffer_lock)
        self.not_empty = Condition(self.buffer_lock)

        # Backpressure state
        self.backpressure_active = Event()

        # Rate limiting state
        self.token_bucket = TokenBucket(config.max_publish_rate) if config.max_publish_rate else None

        # Metrics
        self.messages_accepted = 0
        self.messages_dropped = 0
        self.backpressure_activations = 0
        self.current_publish_rate = 0.0

        # Subscriber demand tracking (for pull-based flow control)
        self.subscriber_demand: Dict[str, int] = {}

    def try_enqueue(self, message: Any, priority: int = 0) -> bool:
        """
        Attempt to enqueue a message.

        Returns: True if accepted, False if rejected due to backpressure
        """
        # Check rate limit first
        if self.token_bucket and not self.token_bucket.try_acquire():
            self.messages_dropped += 1
            return False

        with self.buffer_lock:
            # Check buffer capacity
            if len(self.buffer) >= self.config.max_buffer_size:
                if self.config.block_on_full:
                    # Block until space available
                    success = self.not_full.wait(self.config.block_timeout_seconds)
                    if not success or len(self.buffer) >= self.config.max_buffer_size:
                        self.messages_dropped += 1
                        return False
                else:
                    # Apply drop policy
                    dropped = self._apply_drop_policy(message, priority)
                    if dropped:
                        self.messages_dropped += 1
                        return False

            # Enqueue message
            self.buffer.append((priority, time.time(), message))
            self.messages_accepted += 1

            # Check watermarks
            fill_ratio = len(self.buffer) / self.config.max_buffer_size
            if fill_ratio >= self.config.high_watermark:
                if not self.backpressure_active.is_set():
                    self.backpressure_active.set()
                    self.backpressure_activations += 1
                    self._notify_publishers_slow_down()

            self.not_empty.notify()
            return True

    def dequeue(self, timeout: float = None) -> Optional[Any]:
        """
        Dequeue a message for processing.

        Returns: Message or None if timeout
        """
        with self.buffer_lock:
            while len(self.buffer) == 0:
                success = self.not_empty.wait(timeout)
                if not success:
                    return None

            _, _, message = self.buffer.popleft()

            # Check low watermark
            fill_ratio = len(self.buffer) / self.config.max_buffer_size
            if fill_ratio <= self.config.low_watermark:
                if self.backpressure_active.is_set():
                    self.backpressure_active.clear()
                    self._notify_publishers_resume()

            self.not_full.notify()
            return message

    def _apply_drop_policy(self, new_message: Any, new_priority: int) -> bool:
        """
        Apply drop policy when buffer is full.

        Returns: True if new message was dropped, False if existing message dropped
        """
        policy = self.config.drop_policy

        if policy == "newest":
            # Drop the new message
            return True

        elif policy == "oldest":
            # Drop oldest - handled by deque maxlen
            return False

        elif policy == "priority":
            # Drop lowest priority message
            # Find lowest priority in buffer
            if self.buffer:
                min_idx = 0
                min_priority = self.buffer[0][0]
                for i, (p, _, _) in enumerate(self.buffer):
                    if p < min_priority:
                        min_priority = p
                        min_idx = i

                if new_priority > min_priority:
                    # Drop the lower priority existing message
                    del self.buffer[min_idx]
                    return False
            return True

        return True

    def _notify_publishers_slow_down(self) -> None:
        """Signal to publishers that they should reduce rate."""
        # Implementation depends on protocol:
        # - TCP: Stop reading from socket (OS-level backpressure)
        # - HTTP: Return 429 Too Many Requests
        # - gRPC: Use flow control window
        # - Custom: Emit backpressure event
        pass

    def _notify_publishers_resume(self) -> None:
        """Signal to publishers that normal rate can resume."""
        pass

    # Pull-based flow control (Reactive Streams pattern)
    def request_demand(self, subscriber_id: str, count: int) -> None:
        """
        Subscriber signals how many messages it can accept.

        This is the "reactive pull" pattern - consumers control flow.
        """
        with self.buffer_lock:
            current_demand = self.subscriber_demand.get(subscriber_id, 0)
            self.subscriber_demand[subscriber_id] = current_demand + count

    def get_available_demand(self, subscriber_id: str) -> int:
        """Check how many messages subscriber can accept."""
        with self.buffer_lock:
            return self.subscriber_demand.get(subscriber_id, 0)

    def consume_demand(self, subscriber_id: str) -> bool:
        """Decrement demand when delivering a message."""
        with self.buffer_lock:
            demand = self.subscriber_demand.get(subscriber_id, 0)
            if demand > 0:
                self.subscriber_demand[subscriber_id] = demand - 1
                return True
            return False


class TokenBucket:
    """
    Token bucket rate limiter.

    See [[rate-limiting]](/topics/system-design/rate-limiting) for detailed analysis.
    """
    def __init__(self, rate: float, burst: int = None):
        self.rate = rate
        self.burst = burst or int(rate)
        self.tokens = self.burst
        self.last_update = time.time()
        self.lock = Lock()

    def try_acquire(self) -> bool:
        with self.lock:
            now = time.time()
            # Replenish tokens
            elapsed = now - self.last_update
            self.tokens = min(self.burst, self.tokens + elapsed * self.rate)
            self.last_update = now

            if self.tokens >= 1:
                self.tokens -= 1
                return True
            return False
```

### 4.4 Interview Deep-Dive: Backpressure Handling

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

**Level 1: What is backpressure and why does it matter?**

Backpressure is resistance in data flow when a downstream component cannot keep up with upstream production rate. Without handling it:

1. **Memory exhaustion**: Unbounded queues grow until OOM
2. **Latency explosion**: Messages wait in ever-growing queues
3. **Cascading failures**: One slow consumer impacts the entire system

The broker must choose: buffer, drop, or signal producers to slow down.

**Level 2: How do you propagate backpressure across a distributed system?**

Backpressure must flow "upstream" from slow consumers to fast producers:

1. **TCP-level**: Stop reading from socket. TCP's flow control reduces sender's window size, naturally throttling publishers.

2. **Application-level**:
   - **Push-back**: Return "busy" errors (HTTP 429, gRPC RESOURCE_EXHAUSTED)
   - **Credits/Demand**: Consumers explicitly request N messages (like AMQP's `basic.qos`)

3. **Queue-based**: Monitor queue depth. When approaching limits:
   - Reject new publishes
   - Enable flow control on connections
   - Trigger auto-scaling

```python
class DistributedBackpressure:
    """Propagate backpressure through multi-stage pipeline."""

    def __init__(self):
        self.stages: List['Stage'] = []
        self.pressure_levels: Dict[str, float] = {}

    def propagate_pressure(self, stage_id: str, pressure: float):
        """
        When a stage is under pressure, propagate upstream.

        Pressure is a value 0.0-1.0 indicating load level.
        """
        self.pressure_levels[stage_id] = pressure

        # Find upstream stages and apply multiplicative backpressure
        stage_idx = self._find_stage_index(stage_id)
        if stage_idx > 0:
            upstream_pressure = min(1.0, pressure * 1.5)  # Amplify upstream
            upstream_stage = self.stages[stage_idx - 1]
            upstream_stage.apply_pressure(upstream_pressure)

            # Recursively propagate
            self.propagate_pressure(upstream_stage.id, upstream_pressure)
```

**Level 3: How do you handle backpressure fairly across multiple subscribers with different processing speeds?**

This is the "fast consumer / slow consumer" problem. A slow subscriber shouldn't impact fast ones.

**Strategy 1: Per-Subscriber Queues**
```python
class FairBackpressureBroker:
    def __init__(self, max_queue_per_subscriber: int = 1000):
        self.subscriber_queues: Dict[str, deque] = {}
        self.max_queue = max_queue_per_subscriber

    def deliver(self, message: Message, subscriber_ids: Set[str]):
        for sub_id in subscriber_ids:
            queue = self.subscriber_queues[sub_id]

            if len(queue) >= self.max_queue:
                # This subscriber is slow - apply individual backpressure
                if self._subscriber_is_critical(sub_id):
                    # Critical subscribers get blocking delivery
                    self._block_until_space(sub_id, message)
                else:
                    # Non-critical subscribers get messages dropped
                    self._drop_for_subscriber(sub_id, message)
            else:
                queue.append(message)
```

**Strategy 2: Subscriber Groups with Shared Quotas**

Group subscribers by importance/SLA. Each group has a quota of the total buffer.

**Strategy 3: Adaptive Sampling for Slow Consumers**

When a subscriber falls behind, switch to sampling mode - deliver every Nth message plus summaries. Useful for analytics/monitoring subscribers.

```python
class AdaptiveSampler:
    def __init__(self):
        self.lag_threshold = 1000  # messages
        self.sample_rate = 1.0     # 1.0 = all messages

    def adjust_for_lag(self, current_lag: int):
        if current_lag > self.lag_threshold:
            # Increase sampling (deliver fewer messages)
            self.sample_rate = max(0.01, self.lag_threshold / current_lag)
        else:
            self.sample_rate = 1.0

    def should_deliver(self, message: Message) -> bool:
        if self.sample_rate >= 1.0:
            return True
        # Deterministic sampling based on message ID for consistency
        hash_val = hash(message.message_id) % 10000
        return hash_val < (self.sample_rate * 10000)
```

**Trade-off**: Per-subscriber isolation increases memory usage (N queues instead of 1). Sampling trades completeness for timeliness. The right choice depends on subscriber SLAs and message criticality.

</div>

---

## Section 5: Production Implementation

### Complete Python Implementation

```python
"""
Production-Ready Pub-Sub System

Features:
- Topic-based routing with wildcard support
- Per-key message ordering
- At-least-once delivery with acknowledgments
- Backpressure handling with multiple strategies
- Dead-letter queue for poison messages
- Metrics and observability
"""

import threading
import queue
import time
import uuid
import heapq
from typing import Callable, Dict, List, Set, Optional, Any
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from collections import defaultdict, OrderedDict
from abc import ABC, abstractmethod
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# ============================================================================
# Core Data Structures
# ============================================================================

@dataclass
class Message:
    """Immutable message with routing and ordering metadata."""
    topic: str
    payload: Any
    message_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    partition_key: Optional[str] = None  # For per-key ordering
    sequence_number: Optional[int] = None
    publisher_id: Optional[str] = None
    timestamp: float = field(default_factory=time.time)
    headers: Dict[str, str] = field(default_factory=dict)
    priority: int = 0  # Higher = more important
    ttl_seconds: Optional[float] = None

    def is_expired(self) -> bool:
        if self.ttl_seconds is None:
            return False
        return time.time() - self.timestamp > self.ttl_seconds

    def __repr__(self):
        return f"Message(id={self.message_id[:8]}, topic={self.topic})"


class DeliveryGuarantee(Enum):
    AT_MOST_ONCE = "at_most_once"
    AT_LEAST_ONCE = "at_least_once"


@dataclass
class Subscription:
    """Subscription configuration and state."""
    subscriber_id: str
    topic_pattern: str
    callback: Callable[[Message], None]
    filter_func: Optional[Callable[[Message], bool]] = None
    delivery_guarantee: DeliveryGuarantee = DeliveryGuarantee.AT_LEAST_ONCE
    max_inflight: int = 100
    ack_timeout_seconds: float = 30.0
    max_retries: int = 3
    created_at: float = field(default_factory=time.time)


# ============================================================================
# Topic Routing with Trie
# ============================================================================

class TrieNode:
    """Node in topic matching trie."""
    def __init__(self):
        self.children: Dict[str, 'TrieNode'] = {}
        self.subscriptions: Set[str] = set()
        self.wildcard_single: Optional['TrieNode'] = None
        self.wildcard_multi: Set[str] = set()


class TopicMatcher:
    """
    Efficient topic pattern matching using trie structure.

    Supports:
    - Exact match: "orders.created"
    - Single-level wildcard: "orders.*.created"
    - Multi-level wildcard: "orders.#"
    """

    def __init__(self):
        self.root = TrieNode()
        self.lock = threading.RLock()

        # Cache for frequently matched topics
        self.match_cache: OrderedDict = OrderedDict()
        self.cache_size = 10000
        self.cache_version = 0

    def subscribe(self, pattern: str, subscriber_id: str) -> None:
        """Add subscription pattern to trie."""
        with self.lock:
            parts = pattern.split('.')
            node = self.root

            for part in parts:
                if part == '#':
                    node.wildcard_multi.add(subscriber_id)
                    self.cache_version += 1
                    return
                elif part == '*':
                    if node.wildcard_single is None:
                        node.wildcard_single = TrieNode()
                    node = node.wildcard_single
                else:
                    if part not in node.children:
                        node.children[part] = TrieNode()
                    node = node.children[part]

            node.subscriptions.add(subscriber_id)
            self.cache_version += 1

    def unsubscribe(self, pattern: str, subscriber_id: str) -> None:
        """Remove subscription pattern from trie."""
        with self.lock:
            parts = pattern.split('.')
            node = self.root

            for part in parts:
                if part == '#':
                    node.wildcard_multi.discard(subscriber_id)
                    self.cache_version += 1
                    return
                elif part == '*':
                    if node.wildcard_single is None:
                        return
                    node = node.wildcard_single
                else:
                    if part not in node.children:
                        return
                    node = node.children[part]

            node.subscriptions.discard(subscriber_id)
            self.cache_version += 1

    def match(self, topic: str) -> Set[str]:
        """Find all subscribers matching this topic."""
        with self.lock:
            # Check cache
            cache_key = (topic, self.cache_version)
            if topic in self.match_cache:
                cached_version, result = self.match_cache[topic]
                if cached_version == self.cache_version:
                    self.match_cache.move_to_end(topic)
                    return result.copy()

            # Perform trie traversal
            subscribers = set()
            parts = topic.split('.')

            def traverse(node: TrieNode, depth: int):
                subscribers.update(node.wildcard_multi)

                if depth == len(parts):
                    subscribers.update(node.subscriptions)
                    return

                part = parts[depth]

                if part in node.children:
                    traverse(node.children[part], depth + 1)

                if node.wildcard_single:
                    traverse(node.wildcard_single, depth + 1)

            traverse(self.root, 0)

            # Update cache
            if len(self.match_cache) >= self.cache_size:
                self.match_cache.popitem(last=False)
            self.match_cache[topic] = (self.cache_version, subscribers.copy())

            return subscribers


# ============================================================================
# Message Ordering
# ============================================================================

class MessageOrderer:
    """
    Ensures per-key message ordering with gap handling.

    Messages with the same partition_key are delivered in sequence order.
    """

    def __init__(self, gap_timeout_seconds: float = 30.0):
        self.expected_sequence: Dict[str, int] = defaultdict(int)
        self.pending: Dict[str, List[tuple]] = defaultdict(list)
        self.gap_timestamps: Dict[str, float] = {}
        self.gap_timeout = gap_timeout_seconds
        self.lock = threading.Lock()

    def process(
        self,
        message: Message,
        deliver_callback: Callable[[Message], None]
    ) -> None:
        """Process message respecting ordering constraints."""
        key = message.partition_key or message.publisher_id or "default"

        # Messages without sequence numbers are delivered immediately
        if message.sequence_number is None:
            deliver_callback(message)
            return

        with self.lock:
            expected = self.expected_sequence[key]

            if message.sequence_number < expected:
                # Duplicate, ignore
                logger.debug(f"Dropping duplicate message {message.message_id}")
                return

            if message.sequence_number == expected:
                self._deliver_and_drain(key, message, deliver_callback)
            else:
                # Out of order, buffer
                heapq.heappush(
                    self.pending[key],
                    (message.sequence_number, message)
                )
                if key not in self.gap_timestamps:
                    self.gap_timestamps[key] = time.time()

    def _deliver_and_drain(
        self,
        key: str,
        message: Message,
        deliver_callback: Callable[[Message], None]
    ) -> None:
        """Deliver message and any buffered in-order messages."""
        deliver_callback(message)
        self.expected_sequence[key] = message.sequence_number + 1
        self.gap_timestamps.pop(key, None)

        pending = self.pending[key]
        while pending and pending[0][0] == self.expected_sequence[key]:
            _, buffered_msg = heapq.heappop(pending)
            deliver_callback(buffered_msg)
            self.expected_sequence[key] = buffered_msg.sequence_number + 1

    def check_timeouts(self, deliver_callback: Callable[[Message], None]) -> None:
        """Handle gaps that won't be filled."""
        now = time.time()

        with self.lock:
            for key, gap_start in list(self.gap_timestamps.items()):
                if now - gap_start > self.gap_timeout:
                    pending = self.pending[key]
                    if pending:
                        _, next_msg = heapq.heappop(pending)
                        self.expected_sequence[key] = next_msg.sequence_number
                        self._deliver_and_drain(key, next_msg, deliver_callback)


# ============================================================================
# Backpressure Controller
# ============================================================================

@dataclass
class BackpressureConfig:
    max_buffer_size: int = 10000
    high_watermark: float = 0.8
    low_watermark: float = 0.5
    drop_policy: str = "newest"  # "oldest", "newest", "priority"
    block_on_full: bool = False
    block_timeout_seconds: float = 5.0


class BackpressureController:
    """Manages message buffering with backpressure signals."""

    def __init__(self, config: BackpressureConfig):
        self.config = config
        self.buffer: List[tuple] = []  # (priority, timestamp, message)
        self.lock = threading.Lock()
        self.not_full = threading.Condition(self.lock)
        self.not_empty = threading.Condition(self.lock)
        self.backpressure_active = threading.Event()

        # Metrics
        self.accepted = 0
        self.dropped = 0

    def enqueue(self, message: Message) -> bool:
        """Attempt to enqueue message. Returns False if dropped."""
        with self.lock:
            if len(self.buffer) >= self.config.max_buffer_size:
                if self.config.block_on_full:
                    success = self.not_full.wait(self.config.block_timeout_seconds)
                    if not success or len(self.buffer) >= self.config.max_buffer_size:
                        self.dropped += 1
                        return False
                else:
                    if not self._apply_drop_policy(message):
                        self.dropped += 1
                        return False

            heapq.heappush(
                self.buffer,
                (-message.priority, message.timestamp, message)
            )
            self.accepted += 1

            fill_ratio = len(self.buffer) / self.config.max_buffer_size
            if fill_ratio >= self.config.high_watermark:
                self.backpressure_active.set()

            self.not_empty.notify()
            return True

    def dequeue(self, timeout: float = 1.0) -> Optional[Message]:
        """Dequeue highest priority message."""
        with self.lock:
            while not self.buffer:
                success = self.not_empty.wait(timeout)
                if not success:
                    return None

            _, _, message = heapq.heappop(self.buffer)

            fill_ratio = len(self.buffer) / self.config.max_buffer_size
            if fill_ratio <= self.config.low_watermark:
                self.backpressure_active.clear()

            self.not_full.notify()
            return message

    def _apply_drop_policy(self, new_message: Message) -> bool:
        """Apply drop policy. Returns True if new message should be kept."""
        if self.config.drop_policy == "newest":
            return False
        elif self.config.drop_policy == "oldest":
            heapq.heappop(self.buffer)
            return True
        elif self.config.drop_policy == "priority":
            # Find lowest priority (highest value since we negate)
            if self.buffer:
                lowest_priority = max(self.buffer, key=lambda x: x[0])
                if -new_message.priority < lowest_priority[0]:
                    self.buffer.remove(lowest_priority)
                    heapq.heapify(self.buffer)
                    return True
            return False
        return False

    def is_backpressured(self) -> bool:
        return self.backpressure_active.is_set()


# ============================================================================
# Delivery Manager (At-Least-Once)
# ============================================================================

@dataclass
class DeliveryState:
    message: Message
    subscriber_id: str
    attempts: int = 0
    last_attempt: float = 0
    status: str = "pending"  # pending, delivered, acked, failed


class DeliveryManager:
    """
    Manages at-least-once delivery with acks and retries.
    """

    def __init__(self, default_ack_timeout: float = 30.0, max_retries: int = 3):
        self.default_ack_timeout = default_ack_timeout
        self.max_retries = max_retries

        # In-flight deliveries: (message_id, subscriber_id) -> DeliveryState
        self.inflight: Dict[tuple, DeliveryState] = {}
        self.lock = threading.Lock()

        # Retry queue: (retry_time, message_id, subscriber_id)
        self.retry_queue: List[tuple] = []

        # Dead letter storage
        self.dead_letters: List[tuple] = []

    def track_delivery(
        self,
        message: Message,
        subscriber_id: str
    ) -> None:
        """Track a new delivery attempt."""
        key = (message.message_id, subscriber_id)

        with self.lock:
            if key in self.inflight:
                state = self.inflight[key]
                state.attempts += 1
                state.last_attempt = time.time()
                state.status = "delivered"
            else:
                state = DeliveryState(
                    message=message,
                    subscriber_id=subscriber_id,
                    attempts=1,
                    last_attempt=time.time(),
                    status="delivered"
                )
                self.inflight[key] = state

    def acknowledge(self, message_id: str, subscriber_id: str) -> bool:
        """Mark message as successfully processed."""
        key = (message_id, subscriber_id)

        with self.lock:
            if key in self.inflight:
                del self.inflight[key]
                return True
            return False

    def negative_acknowledge(
        self,
        message_id: str,
        subscriber_id: str,
        requeue: bool = True
    ) -> bool:
        """Mark message processing as failed."""
        key = (message_id, subscriber_id)

        with self.lock:
            if key not in self.inflight:
                return False

            state = self.inflight.pop(key)

            if requeue and state.attempts < self.max_retries:
                # Schedule retry with exponential backoff
                delay = 5.0 * (2 ** state.attempts)
                retry_time = time.time() + delay
                heapq.heappush(
                    self.retry_queue,
                    (retry_time, state.message, subscriber_id)
                )
            else:
                # Dead letter
                self.dead_letters.append((
                    state.message,
                    subscriber_id,
                    f"Max retries ({state.attempts}) exceeded"
                ))

            return True

    def get_due_retries(self) -> List[tuple]:
        """Get messages due for retry."""
        now = time.time()
        due = []

        with self.lock:
            while self.retry_queue and self.retry_queue[0][0] <= now:
                _, message, subscriber_id = heapq.heappop(self.retry_queue)
                due.append((message, subscriber_id))

        return due

    def check_timeouts(self) -> List[tuple]:
        """Find deliveries that have timed out."""
        now = time.time()
        timed_out = []

        with self.lock:
            for key, state in list(self.inflight.items()):
                if now - state.last_attempt > self.default_ack_timeout:
                    timed_out.append((state.message, state.subscriber_id))
                    del self.inflight[key]

        return timed_out


# ============================================================================
# Main Broker
# ============================================================================

class PubSubBroker:
    """
    Production pub-sub broker with:
    - Topic-based routing
    - Message ordering
    - At-least-once delivery
    - Backpressure handling
    """

    def __init__(
        self,
        num_workers: int = 4,
        backpressure_config: BackpressureConfig = None
    ):
        # Core components
        self.topic_matcher = TopicMatcher()
        self.orderer = MessageOrderer()
        self.backpressure = BackpressureController(
            backpressure_config or BackpressureConfig()
        )
        self.delivery_manager = DeliveryManager()

        # Subscription registry
        self.subscriptions: Dict[str, Subscription] = {}
        self.sub_lock = threading.Lock()

        # Worker pool
        self.num_workers = num_workers
        self.workers: List[threading.Thread] = []
        self.running = False

        # Background tasks
        self.maintenance_thread: Optional[threading.Thread] = None

        # Metrics
        self.metrics = {
            'published': 0,
            'delivered': 0,
            'acked': 0,
            'dropped': 0,
            'dead_lettered': 0
        }
        self.metrics_lock = threading.Lock()

    def subscribe(
        self,
        subscriber_id: str,
        topic_pattern: str,
        callback: Callable[[Message], None],
        **kwargs
    ) -> str:
        """Register a subscription."""
        subscription = Subscription(
            subscriber_id=subscriber_id,
            topic_pattern=topic_pattern,
            callback=callback,
            **kwargs
        )

        with self.sub_lock:
            self.subscriptions[subscriber_id] = subscription

        self.topic_matcher.subscribe(topic_pattern, subscriber_id)
        logger.info(f"Subscriber {subscriber_id} subscribed to {topic_pattern}")

        return subscriber_id

    def unsubscribe(self, subscriber_id: str) -> bool:
        """Remove a subscription."""
        with self.sub_lock:
            if subscriber_id not in self.subscriptions:
                return False

            subscription = self.subscriptions.pop(subscriber_id)

        self.topic_matcher.unsubscribe(subscription.topic_pattern, subscriber_id)
        logger.info(f"Subscriber {subscriber_id} unsubscribed")

        return True

    def publish(
        self,
        topic: str,
        payload: Any,
        partition_key: str = None,
        priority: int = 0,
        headers: Dict[str, str] = None
    ) -> Optional[Message]:
        """
        Publish a message to a topic.

        Returns: Message if accepted, None if dropped due to backpressure
        """
        message = Message(
            topic=topic,
            payload=payload,
            partition_key=partition_key,
            priority=priority,
            headers=headers or {}
        )

        if self.backpressure.enqueue(message):
            with self.metrics_lock:
                self.metrics['published'] += 1
            return message
        else:
            with self.metrics_lock:
                self.metrics['dropped'] += 1
            logger.warning(f"Message dropped due to backpressure: {message.message_id}")
            return None

    def acknowledge(self, message_id: str, subscriber_id: str) -> bool:
        """Acknowledge successful message processing."""
        success = self.delivery_manager.acknowledge(message_id, subscriber_id)
        if success:
            with self.metrics_lock:
                self.metrics['acked'] += 1
        return success

    def negative_acknowledge(
        self,
        message_id: str,
        subscriber_id: str,
        requeue: bool = True
    ) -> bool:
        """Report failed message processing."""
        return self.delivery_manager.negative_acknowledge(
            message_id, subscriber_id, requeue
        )

    def _worker(self, worker_id: int) -> None:
        """Worker thread for message delivery."""
        logger.info(f"Worker {worker_id} started")

        while self.running:
            message = self.backpressure.dequeue(timeout=0.5)
            if message is None:
                continue

            if message.is_expired():
                logger.debug(f"Dropping expired message: {message.message_id}")
                continue

            # Route through orderer
            self.orderer.process(
                message,
                lambda m: self._deliver_to_subscribers(m)
            )

        logger.info(f"Worker {worker_id} stopped")

    def _deliver_to_subscribers(self, message: Message) -> None:
        """Deliver message to all matching subscribers."""
        subscriber_ids = self.topic_matcher.match(message.topic)

        with self.sub_lock:
            for sub_id in subscriber_ids:
                if sub_id not in self.subscriptions:
                    continue

                subscription = self.subscriptions[sub_id]

                # Apply filter
                if subscription.filter_func:
                    try:
                        if not subscription.filter_func(message):
                            continue
                    except Exception as e:
                        logger.error(f"Filter error for {sub_id}: {e}")
                        continue

                # Track delivery
                if subscription.delivery_guarantee == DeliveryGuarantee.AT_LEAST_ONCE:
                    self.delivery_manager.track_delivery(message, sub_id)

                # Deliver
                try:
                    subscription.callback(message)
                    with self.metrics_lock:
                        self.metrics['delivered'] += 1
                except Exception as e:
                    logger.error(f"Delivery error to {sub_id}: {e}")
                    if subscription.delivery_guarantee == DeliveryGuarantee.AT_LEAST_ONCE:
                        self.delivery_manager.negative_acknowledge(
                            message.message_id, sub_id, requeue=True
                        )

    def _maintenance_loop(self) -> None:
        """Background maintenance tasks."""
        while self.running:
            # Check ordering gaps
            self.orderer.check_timeouts(self._deliver_to_subscribers)

            # Check ack timeouts
            timed_out = self.delivery_manager.check_timeouts()
            for message, subscriber_id in timed_out:
                logger.warning(f"Delivery timeout for {message.message_id} to {subscriber_id}")
                # Re-enqueue for retry
                self.backpressure.enqueue(message)

            # Process retries
            due_retries = self.delivery_manager.get_due_retries()
            for message, subscriber_id in due_retries:
                self.backpressure.enqueue(message)

            time.sleep(1.0)

    def start(self) -> None:
        """Start the broker."""
        self.running = True

        # Start workers
        for i in range(self.num_workers):
            worker = threading.Thread(
                target=self._worker,
                args=(i,),
                name=f"PubSub-Worker-{i}",
                daemon=True
            )
            worker.start()
            self.workers.append(worker)

        # Start maintenance
        self.maintenance_thread = threading.Thread(
            target=self._maintenance_loop,
            name="PubSub-Maintenance",
            daemon=True
        )
        self.maintenance_thread.start()

        logger.info(f"PubSub Broker started with {self.num_workers} workers")

    def stop(self, timeout: float = 5.0) -> None:
        """Stop the broker gracefully."""
        self.running = False

        for worker in self.workers:
            worker.join(timeout=timeout)

        if self.maintenance_thread:
            self.maintenance_thread.join(timeout=timeout)

        logger.info("PubSub Broker stopped")

    def get_metrics(self) -> Dict[str, Any]:
        """Get broker metrics."""
        with self.metrics_lock:
            return {
                **self.metrics,
                'buffer_size': len(self.backpressure.buffer),
                'backpressure_active': self.backpressure.is_backpressured(),
                'subscriptions': len(self.subscriptions),
                'inflight': len(self.delivery_manager.inflight),
                'dead_letters': len(self.delivery_manager.dead_letters)
            }


# ============================================================================
# Usage Example
# ============================================================================

if __name__ == "__main__":
    # Create broker
    broker = PubSubBroker(
        num_workers=2,
        backpressure_config=BackpressureConfig(
            max_buffer_size=1000,
            high_watermark=0.8,
            drop_policy="priority"
        )
    )
    broker.start()

    # Track received messages for demo
    received = []

    def order_handler(msg: Message):
        print(f"[Order Service] {msg.topic}: {msg.payload}")
        received.append(msg)
        # Simulate processing and ack
        broker.acknowledge(msg.message_id, "order-service")

    def analytics_handler(msg: Message):
        print(f"[Analytics] {msg.topic}: {msg.payload}")
        broker.acknowledge(msg.message_id, "analytics")

    def notification_handler(msg: Message):
        print(f"[Notifications] {msg.topic}: {msg.payload}")
        broker.acknowledge(msg.message_id, "notification-service")

    # Subscribe
    broker.subscribe(
        "order-service",
        "orders.#",  # All order events
        order_handler
    )

    broker.subscribe(
        "analytics",
        "orders.*",  # Top-level order events only
        analytics_handler,
        filter_func=lambda m: m.payload.get('amount', 0) > 100
    )

    broker.subscribe(
        "notification-service",
        "notifications.*",
        notification_handler
    )

    # Publish messages
    print("\n--- Publishing Messages ---\n")

    broker.publish("orders.created", {"order_id": "001", "amount": 150}, partition_key="001", priority=1)
    broker.publish("orders.created", {"order_id": "002", "amount": 50}, partition_key="002")
    broker.publish("orders.shipped", {"order_id": "001"}, partition_key="001")
    broker.publish("orders.us.created", {"order_id": "003", "amount": 200}, partition_key="003", priority=2)
    broker.publish("notifications.email", {"to": "user@example.com", "subject": "Order shipped"})

    # Wait for processing
    time.sleep(2)

    # Print metrics
    print(f"\n--- Metrics ---")
    for key, value in broker.get_metrics().items():
        print(f"  {key}: {value}")

    broker.stop()
```

---

## Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| `publish()` | O(1) enqueue | O(1) |
| `subscribe()` | O(L) topic depth | O(L) |
| `unsubscribe()` | O(L) topic depth | O(1) |
| `topic_match()` | O(L) best, O(2^L) worst with wildcards | O(S) result set |
| `deliver()` | O(S) matching subscribers | O(1) |
| `acknowledge()` | O(1) | O(1) |
| **Total Space** | - | O(M + S*L + B) messages, subscriptions, buffer |

Where:
- L = topic hierarchy depth
- S = number of subscriptions
- M = messages in buffer
- B = backpressure buffer size

---

## Real-World Systems Comparison

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 16px;">Production Pub-Sub Systems</h4>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">

<div style="background: #21262d; padding: 20px; border-radius: 10px;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 12px;">Apache Kafka</div>
<div style="color: #c9d1d9; font-size: 11px; line-height: 1.6;">
<strong>Ordering</strong>: Per-partition<br/>
<strong>Delivery</strong>: At-least-once (exactly-once with transactions)<br/>
<strong>Backpressure</strong>: Consumer-controlled via poll<br/>
<strong>Best for</strong>: High-throughput event streaming
</div>
</div>

<div style="background: #21262d; padding: 20px; border-radius: 10px;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">RabbitMQ</div>
<div style="color: #c9d1d9; font-size: 11px; line-height: 1.6;">
<strong>Ordering</strong>: Per-queue (FIFO)<br/>
<strong>Delivery</strong>: All three modes<br/>
<strong>Backpressure</strong>: Connection-level credit<br/>
<strong>Best for</strong>: Traditional messaging patterns
</div>
</div>

<div style="background: #21262d; padding: 20px; border-radius: 10px;">
<div style="color: #a371f7; font-weight: bold; margin-bottom: 12px;">Google Pub/Sub</div>
<div style="color: #c9d1d9; font-size: 11px; line-height: 1.6;">
<strong>Ordering</strong>: Optional per-key<br/>
<strong>Delivery</strong>: At-least-once<br/>
<strong>Backpressure</strong>: Auto-scaling + flow control<br/>
<strong>Best for</strong>: Cloud-native, serverless
</div>
</div>

<div style="background: #21262d; padding: 20px; border-radius: 10px;">
<div style="color: #ffa657; font-weight: bold; margin-bottom: 12px;">Redis Streams</div>
<div style="color: #c9d1d9; font-size: 11px; line-height: 1.6;">
<strong>Ordering</strong>: Per-stream<br/>
<strong>Delivery</strong>: At-least-once with consumer groups<br/>
<strong>Backpressure</strong>: MAXLEN trim<br/>
<strong>Best for</strong>: Low-latency, in-memory
</div>
</div>

</div>
</div>

---

## Cross-References

- [[message-queues]](/topics/system-design/message-queues) - Point-to-point vs pub-sub patterns
- [[event-sourcing]](/topics/system-design/event-sourcing) - Event-driven architecture foundations
- [[rate-limiting]](/topics/system-design/rate-limiting) - Token bucket for publish rate control
- [[distributed-locking]](/topics/system-design/distributed-locking) - Coordination for exactly-once
- [[kafka-architecture]](/topics/system-design/kafka-architecture) - Production pub-sub at scale

---

## Interview Checklist

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #7ee787;">

**Key Points to Cover:**

1. **Topic Routing**: Explain trie-based matching, wildcard semantics, caching for hot topics
2. **Ordering**: Distinguish per-key vs total ordering, discuss sequence gaps and timeouts
3. **Delivery Guarantees**: At-least-once requires idempotent consumers, explain retry and DLQ
4. **Backpressure**: Know multiple strategies (buffer, drop, throttle), when to use each
5. **Trade-offs**: Always discuss throughput vs latency vs durability triangle

**Common Follow-up Questions:**
- "How would you scale this to millions of subscribers?"
- "What happens if a subscriber is down for hours?"
- "How do you handle message replay for debugging?"
- "What's your strategy for schema evolution in messages?"

</div>
