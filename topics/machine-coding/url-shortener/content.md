# URL Shortener: Deep Dive for System Design Interviews

## Problem Statement

Design a <span style="color:#22c55e;font-weight:bold">URL shortening service</span> (like bit.ly or TinyURL) that converts long URLs into compact, shareable codes while enabling redirection, <span style="color:#22c55e;font-weight:bold">analytics tracking</span>, and <span style="color:#22c55e;font-weight:bold">high availability</span> at scale.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

**Core Challenge**: This seemingly simple problem masks profound distributed systems challenges - deterministic ID generation without coordination, collision-free encoding at scale, cache coherence across geographies, and real-time analytics without sacrificing redirect latency.

</div>

---

## Section 1: Base62 Encoding Deep Dive

### The Mathematics Behind Short Codes

<span style="color:#22c55e;font-weight:bold">Base62 encoding</span> transforms numeric identifiers into alphanumeric strings using a 62-character alphabet: `a-z`, `A-Z`, `0-9`. This choice is deliberate and reveals important trade-offs in [[information density]](/topics/system-design/data-encoding) versus URL compatibility.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d;">

**Why Base62 Specifically?**

| Base | Characters | URL-Safe? | 7-char Capacity | Notes |
|------|------------|-----------|-----------------|-------|
| Base16 | 0-9, a-f | Yes | 268M | Too long for short URLs |
| Base36 | 0-9, a-z | Yes | 78B | Case-insensitive, mobile-friendly |
| Base62 | 0-9, a-z, A-Z | Yes | 3.5T | Optimal density |
| Base64 | +62 chars + `/` | No | 4.4T | Requires URL encoding |

**Key Insight**: Base62 maximizes information density while remaining URL-safe without encoding. The `+` and `/` in Base64 require percent-encoding, making URLs longer and uglier.

</div>

### Internal Mechanism: Conversion Algorithm

```python
BASE62_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

def encode_base62(num: int) -> str:
    """
    Convert integer to base62 string.

    Critical insight: This is essentially converting from base-10 to base-62,
    identical to how we'd convert decimal to binary, but with 62 symbols.

    Time: O(log_62(n)) - number of digits in base62 representation
    Space: O(log_62(n)) - for the result string
    """
    if num == 0:
        return BASE62_ALPHABET[0]

    result = []
    while num > 0:
        remainder = num % 62
        result.append(BASE62_ALPHABET[remainder])
        num //= 62

    return ''.join(reversed(result))

def decode_base62(code: str) -> int:
    """
    Convert base62 string back to integer.

    This is Horner's method for polynomial evaluation:
    "abc" = a*62^2 + b*62^1 + c*62^0
    Computed as: ((a * 62) + b) * 62 + c
    """
    num = 0
    for char in code:
        num = num * 62 + BASE62_ALPHABET.index(char)
    return num
```

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #a855f7;">

**Assumption**: The alphabet ordering affects generated codes. Starting with digits (`0-9`) means small numbers produce digit-only codes, potentially revealing ID patterns. Some systems shuffle the alphabet for obfuscation.

**Trade-off**: Shuffled alphabets prevent enumeration attacks but complicate debugging and make codes less memorable.

</div>

### Edge Cases in Base62 Encoding

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">

**Edge Case 1: Leading Zeros**
- Number `0` should encode to `"0"`, not empty string
- Number `62` encodes to `"10"` - the leading `1` must be preserved
- Decoding `"00abc"` differs from `"abc"` (if your system allows leading zeros)

**Edge Case 2: Case Sensitivity**
- `"abc"` and `"ABC"` and `"aBc"` are three different codes
- Problem: Email clients sometimes lowercase URLs
- Solution: Some services use Base36 (case-insensitive) for robustness

**Edge Case 3: Confusing Characters**
- `0` vs `O` vs `o` - visually similar
- `1` vs `l` vs `I` - commonly confused
- Some services exclude these (Base58 in Bitcoin addresses)

</div>

### Code Length Capacity Planning

```
Length | Unique Codes      | URLs/Second for 10 Years | Storage at 500B/URL
-------|-------------------|--------------------------|--------------------
   6   | 62^6 = 56.8B      | 180 writes/sec           | 28.4 TB
   7   | 62^7 = 3.52T      | 11,177 writes/sec        | 1.76 PB
   8   | 62^8 = 218T       | 693,000 writes/sec       | 109 PB
```

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

**Design Choice**: 7 characters provides the sweet spot - short enough to be memorable, large enough keyspace to avoid collisions for decades at massive scale.

**Real-world validation**: bit.ly uses 7 characters, TinyURL uses 7-8, Twitter's t.co uses 10 (includes error detection).

</div>

### Interview Questions: Base62 Encoding (3 Levels Deep)

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #334155;">

**Level 1**: Why use Base62 instead of Base64 for URL shortening?

**Level 2**: If we use Base62, how would you handle the "confusing characters" problem (0/O, 1/l/I) while maintaining maximum keyspace efficiency? What's the mathematical trade-off?

**Level 3**: You've implemented Base58 (excluding confusing characters). Now your analytics team reports that 0.1% of URLs are being typed incorrectly. How would you design an error-correction scheme that detects and potentially corrects single-character errors without significantly increasing code length? Consider the trade-off between code length, error detection capability, and computational overhead.

</div>

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #334155;">

**Level 1**: Explain the time complexity of base62 encoding/decoding.

**Level 2**: The `index()` operation in decoding is O(62) per character. How would you optimize this for high-throughput systems processing millions of redirects per second?

**Level 3**: You've created a lookup table for O(1) character-to-index mapping. Now imagine you need to support multiple encoding schemes (Base62, Base58, custom alphabets per customer) with minimal memory overhead across 1000 servers. Design a solution that balances memory efficiency, cache locality, and configuration flexibility.

</div>

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #334155;">

**Level 1**: What happens if someone guesses short codes sequentially?

**Level 2**: How would you make codes non-sequential while still using an auto-incrementing counter? What are the security vs. performance trade-offs?

**Level 3**: You've implemented alphabet shuffling with a secret seed. An attacker has collected 10,000 sequential short codes created over time. Can they reverse-engineer your alphabet order? Design a scheme that prevents this attack while maintaining O(1) encoding and supporting counter-based generation.

</div>

---

## Section 2: Collision Handling Strategies

### Understanding Collision Probability

<span style="color:#22c55e;font-weight:bold">Hash collisions</span> occur when two different inputs produce the same short code. The probability follows the [[birthday paradox]](/topics/probability/birthday-paradox) mathematics, a fundamental concept in [[cryptography]](/topics/security/cryptographic-foundations) and [[distributed systems]](/topics/system-design/distributed-systems-fundamentals).

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

**Birthday Paradox Applied to URL Shortening**

For a hash space of size N and k insertions, collision probability approximates:

```
P(collision) ≈ 1 - e^(-k²/2N)
```

For 7-character Base62 (N = 3.5 trillion):
- At 1 million URLs: P ≈ 0.00014% (negligible)
- At 100 million URLs: P ≈ 1.4% (concerning)
- At 1 billion URLs: P ≈ 14% (critical)
- At 10 billion URLs: P ≈ 76% (guaranteed issues)

**Key Insight**: You'll hit collisions far sooner than exhausting the keyspace.

</div>

### Strategy 1: Counter-Based (Collision-Free by Design)

```python
class CounterBasedShortener:
    """
    Uses auto-incrementing counter - guarantees uniqueness.

    Assumption: Single point of ID generation OR coordinated distributed counters.
    """
    def __init__(self):
        self.counter = 100000000  # Start at 100M for consistent 6-char codes
        self._lock = threading.Lock()

    def generate_code(self, url: str) -> str:
        with self._lock:
            code = encode_base62(self.counter)
            self.counter += 1
            return code
```

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">

**Trade-off Analysis**:

| Aspect | Counter-Based | Impact |
|--------|---------------|--------|
| Uniqueness | Guaranteed | No collision handling needed |
| Predictability | Sequential codes | Security concern - enumeration attacks |
| Distribution | Requires coordination | Bottleneck at scale |
| Code appearance | Incremental | Reveals creation order |

</div>

### Strategy 2: Hash-Based with Collision Resolution

```python
import hashlib
from typing import Optional

class HashBasedShortener:
    """
    Uses cryptographic hash truncation with collision resolution.

    Design choice: MD5 is fast but cryptographically broken.
    For URL shortening, cryptographic strength is irrelevant -
    we only need uniform distribution.
    """

    def __init__(self, storage: KeyValueStore):
        self.storage = storage
        self.max_retries = 10

    def generate_code(self, url: str) -> str:
        # Primary attempt: hash the URL directly
        base_hash = hashlib.md5(url.encode()).hexdigest()
        code = self._hash_to_base62(base_hash)[:7]

        if not self.storage.exists(code):
            return code

        # Collision resolution: append counter and rehash
        for attempt in range(1, self.max_retries + 1):
            salted_input = f"{url}:{attempt}"
            new_hash = hashlib.md5(salted_input.encode()).hexdigest()
            code = self._hash_to_base62(new_hash)[:7]

            if not self.storage.exists(code):
                return code

        # Fallback: use random generation
        return self._generate_random_code()

    def _hash_to_base62(self, hex_hash: str) -> str:
        """Convert hex hash to base62."""
        num = int(hex_hash[:15], 16)  # Use 60 bits
        return encode_base62(num)

    def _generate_random_code(self) -> str:
        """Last resort: cryptographically random code."""
        import secrets
        while True:
            code = ''.join(secrets.choice(BASE62_ALPHABET) for _ in range(7))
            if not self.storage.exists(code):
                return code
```

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #a855f7;">

**Assumption**: Hash-based approach assumes same URL should map to same short code (idempotency). This is a business decision - some services intentionally create different codes for the same URL to track different campaigns.

**Real-world implication**: If you hash `url + user_id`, different users sharing the same long URL get different short codes, enabling per-user analytics.

</div>

### Strategy 3: Bloom Filter Pre-Check

```python
from pybloom_live import ScalableBloomFilter

class BloomOptimizedShortener:
    """
    Uses Bloom filter to reduce database lookups for collision checking.

    Trade-off: Bloom filters have false positives (saying code exists when it doesn't)
    but never false negatives. This means we might regenerate unnecessarily,
    but we'll never overwrite existing URLs.
    """

    def __init__(self, storage: KeyValueStore):
        self.storage = storage
        # Initial capacity 10M, error rate 0.1%
        self.bloom = ScalableBloomFilter(
            initial_capacity=10_000_000,
            error_rate=0.001,
            mode=ScalableBloomFilter.LARGE_SET_GROWTH
        )
        self._warm_bloom_filter()

    def _warm_bloom_filter(self):
        """Load existing codes into Bloom filter on startup."""
        for code in self.storage.scan_all_codes():
            self.bloom.add(code)

    def generate_code(self, url: str) -> str:
        code = self._compute_code(url)

        # Fast path: Bloom filter says definitely not exists
        if code not in self.bloom:
            self.bloom.add(code)
            return code

        # Slow path: Bloom filter says maybe exists, verify with DB
        if not self.storage.exists(code):
            # False positive from Bloom filter
            self.bloom.add(code)
            return code

        # True collision: resolve
        return self._resolve_collision(url)
```

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

**Performance Impact**:

| Scenario | Without Bloom | With Bloom (0.1% FP) |
|----------|---------------|----------------------|
| New code (99% case) | 1 DB read | 0 DB reads (99.9%) |
| Collision (1% case) | 1+ DB reads | 1+ DB reads |
| Memory overhead | 0 | ~1.2 bytes per code |

At 1 billion codes: Bloom filter uses ~1.2GB RAM, saves billions of DB lookups.

</div>

### Collision Resolution: Linear Probing vs. Chaining

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">

<div style="color: #58a6ff; font-weight: bold; font-size: 16px; margin-bottom: 20px; text-align: center;">Collision Resolution Strategies</div>

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 20px; border-radius: 12px; flex: 1; min-width: 280px;">
<div style="color: #fff; font-weight: bold; margin-bottom: 12px;">Linear Probing (Rehash)</div>
<div style="color: #d1f5d3; font-size: 13px; line-height: 1.6;">
<div>hash(url) -> collision</div>
<div>hash(url + "1") -> collision</div>
<div>hash(url + "2") -> success</div>
</div>
<div style="color: #fff; font-size: 12px; margin-top: 12px;">
Pros: Simple, deterministic<br/>
Cons: Clustering, predictable
</div>
</div>

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 20px; border-radius: 12px; flex: 1; min-width: 280px;">
<div style="color: #fff; font-weight: bold; margin-bottom: 12px;">Random Probing</div>
<div style="color: #dbeafe; font-size: 13px; line-height: 1.6;">
<div>hash(url) -> collision</div>
<div>random_code() -> collision</div>
<div>random_code() -> success</div>
</div>
<div style="color: #fff; font-size: 12px; margin-top: 12px;">
Pros: No clustering, unpredictable<br/>
Cons: Non-deterministic, can't dedupe
</div>
</div>

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 20px; border-radius: 12px; flex: 1; min-width: 280px;">
<div style="color: #fff; font-weight: bold; margin-bottom: 12px;">Hierarchical Fallback</div>
<div style="color: #e9d5ff; font-size: 13px; line-height: 1.6;">
<div>7-char hash -> collision</div>
<div>8-char hash -> success</div>
<div>(increases code length)</div>
</div>
<div style="color: #fff; font-size: 12px; margin-top: 12px;">
Pros: Eventually succeeds<br/>
Cons: Inconsistent code lengths
</div>
</div>

</div>
</div>

### Interview Questions: Collision Handling (3 Levels Deep)

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #334155;">

**Level 1**: How would you handle hash collisions in a URL shortener?

**Level 2**: Your collision resolution uses linear probing (appending "1", "2", etc.). An attacker discovers this and pre-registers `hash(victim_url + "1")` through `hash(victim_url + "100")`. How does this attack work, and how would you defend against it?

**Level 3**: Design a collision resolution system that is (a) deterministic for the same input, (b) resistant to pre-registration attacks, (c) doesn't leak information about existing codes, and (d) maintains O(1) average-case performance. Prove that your solution meets all requirements.

</div>

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #334155;">

**Level 1**: What's the probability of collision at 100 million URLs with 7-character codes?

**Level 2**: You need 99.99% confidence that no collisions occur for the first 1 billion URLs. What minimum code length is required? Show your mathematical derivation.

**Level 3**: Your system must handle 1 billion URLs with code length 6 (only 56B keyspace). Design a hybrid encoding scheme that maintains 6-character codes for most URLs while gracefully handling the mathematical certainty of collisions. Consider the user experience, backwards compatibility, and operational complexity.

</div>

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #334155;">

**Level 1**: How does a Bloom filter help with collision checking?

**Level 2**: Your Bloom filter has a 0.1% false positive rate. As you scale to 10 billion URLs, the false positive rate degrades. How would you handle Bloom filter maintenance in a distributed system with 100 write servers?

**Level 3**: Design a distributed Bloom filter architecture that (a) provides consistent false positive rates as data grows, (b) handles server failures without losing accuracy, (c) supports efficient rebuilding, and (d) minimizes network overhead for cross-server coordination. Analyze the CAP theorem implications of your design.

</div>

---

## Section 3: Distributed ID Generation

### The Coordination Problem

In a <span style="color:#22c55e;font-weight:bold">distributed system</span>, generating unique IDs without coordination is one of the hardest problems. Each approach trades off between <span style="color:#22c55e;font-weight:bold">uniqueness guarantees</span>, <span style="color:#22c55e;font-weight:bold">latency</span>, and operational complexity. This relates closely to [[consensus protocols]](/topics/system-design/consensus-algorithms) and [[distributed coordination]](/topics/system-design/distributed-locking).

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

**The Fundamental Trade-off**:

Without coordination: Risk duplicate IDs (correctness issue)
With coordination: Add latency and single point of failure (availability issue)

This is a manifestation of the [[CAP theorem]](/topics/system-design/cap-theorem) - you cannot have both strong consistency (unique IDs) and high availability (no coordination) under network partitions.

</div>

### Strategy 1: Twitter Snowflake IDs

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">

<div style="color: #58a6ff; font-weight: bold; font-size: 16px; margin-bottom: 20px; text-align: center;">Snowflake ID Structure (64 bits)</div>

<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 4px; margin-bottom: 20px;">
<div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 16px 12px; border-radius: 8px; text-align: center; flex: 0 0 auto;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">Sign</div>
<div style="color: #e0e7ff; font-size: 10px;">1 bit</div>
<div style="color: #c7d2fe; font-size: 9px; margin-top: 4px;">Always 0</div>
</div>
<div style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); padding: 16px 12px; border-radius: 8px; text-align: center; flex: 1 1 200px;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">Timestamp</div>
<div style="color: #fef3c7; font-size: 10px;">41 bits</div>
<div style="color: #fde68a; font-size: 9px; margin-top: 4px;">~69 years from epoch</div>
</div>
<div style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%); padding: 16px 12px; border-radius: 8px; text-align: center; flex: 0 0 auto;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">Datacenter</div>
<div style="color: #d1fae5; font-size: 10px;">5 bits</div>
<div style="color: #a7f3d0; font-size: 9px; margin-top: 4px;">32 DCs</div>
</div>
<div style="background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%); padding: 16px 12px; border-radius: 8px; text-align: center; flex: 0 0 auto;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">Worker</div>
<div style="color: #dbeafe; font-size: 10px;">5 bits</div>
<div style="color: #bfdbfe; font-size: 9px; margin-top: 4px;">32/DC</div>
</div>
<div style="background: linear-gradient(135deg, #ec4899 0%, #f472b6 100%); padding: 16px 12px; border-radius: 8px; text-align: center; flex: 0 0 auto;">
<div style="color: #fff; font-weight: bold; font-size: 11px;">Sequence</div>
<div style="color: #fce7f3; font-size: 10px;">12 bits</div>
<div style="color: #fbcfe8; font-size: 9px; margin-top: 4px;">4096/ms</div>
</div>
</div>

<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Capacity Analysis:</div>
<div style="color: #c9d1d9; font-size: 12px;">
<div>32 datacenters x 32 workers = 1,024 total ID generators</div>
<div>4,096 IDs per millisecond per worker = 4.1M IDs/sec per worker</div>
<div>Total system capacity: 4.2 billion IDs per second</div>
</div>
</div>

</div>

```python
import time
import threading

class SnowflakeGenerator:
    """
    Distributed unique ID generator inspired by Twitter Snowflake.

    Critical assumption: System clocks across machines are synchronized
    within a reasonable bound (typically using NTP).

    Clock skew handling is the most challenging aspect.
    """

    # Bit allocation
    TIMESTAMP_BITS = 41
    DATACENTER_BITS = 5
    WORKER_BITS = 5
    SEQUENCE_BITS = 12

    # Maximum values
    MAX_DATACENTER_ID = (1 << DATACENTER_BITS) - 1  # 31
    MAX_WORKER_ID = (1 << WORKER_BITS) - 1          # 31
    MAX_SEQUENCE = (1 << SEQUENCE_BITS) - 1         # 4095

    # Bit shifts
    TIMESTAMP_SHIFT = DATACENTER_BITS + WORKER_BITS + SEQUENCE_BITS  # 22
    DATACENTER_SHIFT = WORKER_BITS + SEQUENCE_BITS                    # 17
    WORKER_SHIFT = SEQUENCE_BITS                                       # 12

    # Custom epoch (2020-01-01 00:00:00 UTC)
    EPOCH = 1577836800000

    def __init__(self, datacenter_id: int, worker_id: int):
        if not (0 <= datacenter_id <= self.MAX_DATACENTER_ID):
            raise ValueError(f"Datacenter ID must be 0-{self.MAX_DATACENTER_ID}")
        if not (0 <= worker_id <= self.MAX_WORKER_ID):
            raise ValueError(f"Worker ID must be 0-{self.MAX_WORKER_ID}")

        self.datacenter_id = datacenter_id
        self.worker_id = worker_id
        self.sequence = 0
        self.last_timestamp = -1
        self._lock = threading.Lock()

    def _current_millis(self) -> int:
        return int(time.time() * 1000)

    def _wait_for_next_millis(self, last_timestamp: int) -> int:
        """Block until clock advances. Handles same-millisecond exhaustion."""
        timestamp = self._current_millis()
        while timestamp <= last_timestamp:
            timestamp = self._current_millis()
        return timestamp

    def next_id(self) -> int:
        with self._lock:
            timestamp = self._current_millis()

            # Clock moved backwards - critical error!
            if timestamp < self.last_timestamp:
                # Option 1: Raise exception (fail-fast)
                # Option 2: Wait for clock to catch up
                # Option 3: Use last_timestamp + 1 (dangerous)
                raise RuntimeError(
                    f"Clock moved backwards by {self.last_timestamp - timestamp}ms. "
                    "Refusing to generate ID to prevent duplicates."
                )

            if timestamp == self.last_timestamp:
                # Same millisecond: increment sequence
                self.sequence = (self.sequence + 1) & self.MAX_SEQUENCE

                if self.sequence == 0:
                    # Sequence exhausted (4096 IDs this millisecond)
                    timestamp = self._wait_for_next_millis(self.last_timestamp)
            else:
                # New millisecond: reset sequence
                self.sequence = 0

            self.last_timestamp = timestamp

            # Compose the ID
            id = ((timestamp - self.EPOCH) << self.TIMESTAMP_SHIFT) | \
                 (self.datacenter_id << self.DATACENTER_SHIFT) | \
                 (self.worker_id << self.WORKER_SHIFT) | \
                 self.sequence

            return id

    def parse_id(self, snowflake_id: int) -> dict:
        """Decompose ID back into components - useful for debugging."""
        timestamp = (snowflake_id >> self.TIMESTAMP_SHIFT) + self.EPOCH
        datacenter = (snowflake_id >> self.DATACENTER_SHIFT) & self.MAX_DATACENTER_ID
        worker = (snowflake_id >> self.WORKER_SHIFT) & self.MAX_WORKER_ID
        sequence = snowflake_id & self.MAX_SEQUENCE

        return {
            'timestamp': timestamp,
            'datetime': time.strftime('%Y-%m-%d %H:%M:%S', time.gmtime(timestamp/1000)),
            'datacenter_id': datacenter,
            'worker_id': worker,
            'sequence': sequence
        }
```

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">

**Clock Skew Problem**:

If Server A's clock is 5ms behind Server B, and both generate IDs for different requests:
- Server A (actual time T): generates ID with timestamp T-5
- Server B (actual time T): generates ID with timestamp T

If A's clock later jumps forward (NTP correction), it might generate duplicate timestamps with previously used sequences.

**Real-world solutions**:
1. **Detect and halt**: Refuse to generate IDs if clock goes backward
2. **Wait**: Block until clock catches up (adds latency)
3. **Use logical clocks**: Hybrid Logical Clocks (HLC) combine physical and logical time

</div>

### Strategy 2: Range-Based Allocation with Zookeeper

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">

<div style="color: #7ee787; font-weight: bold; font-size: 16px; margin-bottom: 20px; text-align: center;">Range Allocation Architecture</div>

<div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 20px 40px; border-radius: 12px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 14px;">Zookeeper Cluster</div>
<div style="color: #e9d5ff; font-size: 11px; margin-top: 8px;">Maintains: next_range_start = 5,000,000</div>
</div>

<div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
<div style="color: #7ee787; font-size: 24px;">|</div>
</div>

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 16px 24px; border-radius: 10px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 12px;">Server A</div>
<div style="color: #d1f5d3; font-size: 10px; margin-top: 8px;">Range: 1M - 2M</div>
<div style="color: #a7f3d0; font-size: 9px;">Current: 1,847,293</div>
</div>

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 16px 24px; border-radius: 10px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 12px;">Server B</div>
<div style="color: #dbeafe; font-size: 10px; margin-top: 8px;">Range: 2M - 3M</div>
<div style="color: #bfdbfe; font-size: 9px;">Current: 2,124,891</div>
</div>

<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); padding: 16px 24px; border-radius: 10px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 12px;">Server C</div>
<div style="color: #fed7aa; font-size: 10px; margin-top: 8px;">Range: 3M - 4M</div>
<div style="color: #fdba74; font-size: 9px;">Current: 3,999,102</div>
</div>

</div>

<div style="background: #21262d; padding: 12px 20px; border-radius: 8px; margin-top: 12px;">
<div style="color: #ffa657; font-size: 11px;">Server C nearly exhausted - requesting new range 5M-6M</div>
</div>

</div>
</div>

```python
from kazoo.client import KazooClient
from kazoo.recipe.lock import Lock
import threading

class RangeAllocator:
    """
    Allocates ID ranges from Zookeeper for local generation.

    Trade-off: Larger ranges = fewer ZK calls but more waste on restart
    Smaller ranges = more ZK calls but less waste
    """

    def __init__(self, zk_hosts: str, range_size: int = 1_000_000):
        self.zk = KazooClient(hosts=zk_hosts)
        self.zk.start()

        self.range_size = range_size
        self.current_id = 0
        self.range_end = 0
        self._lock = threading.Lock()

        # Ensure ZK path exists
        self.zk.ensure_path("/url_shortener/counter")

    def _allocate_range(self) -> tuple:
        """
        Atomically allocate a new range from Zookeeper.

        Uses ZK's atomic compare-and-set semantics.
        """
        lock = Lock(self.zk, "/url_shortener/counter_lock")

        with lock:
            data, stat = self.zk.get("/url_shortener/counter")
            current_counter = int(data.decode()) if data else 0

            range_start = current_counter
            range_end = current_counter + self.range_size

            # Atomically update counter
            self.zk.set(
                "/url_shortener/counter",
                str(range_end).encode(),
                version=stat.version
            )

            return range_start, range_end

    def next_id(self) -> int:
        with self._lock:
            if self.current_id >= self.range_end:
                # Range exhausted, allocate new one
                self.current_id, self.range_end = self._allocate_range()

            id = self.current_id
            self.current_id += 1
            return id

    def shutdown(self):
        """
        Clean shutdown - log wasted IDs for monitoring.

        Real-world consideration: If server crashes, the remaining
        IDs in its range are "lost" (never used). This is acceptable
        with a large keyspace.
        """
        wasted = self.range_end - self.current_id
        print(f"Shutdown: {wasted} IDs unused in current range")
        self.zk.stop()
```

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #a855f7;">

**Design Choice: Range Size**

| Range Size | ZK Calls/Day (at 1000 URLs/sec) | Wasted on Restart | Recovery Time |
|------------|----------------------------------|-------------------|---------------|
| 10,000 | 8,640 calls | ~5,000 avg | Milliseconds |
| 100,000 | 864 calls | ~50,000 avg | Milliseconds |
| 1,000,000 | 86 calls | ~500,000 avg | Milliseconds |

**Assumption**: Lost IDs are acceptable. With 3.5 trillion possible 7-char codes, losing millions per day is negligible.

</div>

### Strategy 3: ULID (Universally Unique Lexicographically Sortable Identifier)

```python
import os
import time

class ULIDGenerator:
    """
    ULID: 128-bit identifier that is:
    - Lexicographically sortable (by creation time)
    - Monotonic within same millisecond
    - URL-safe (Crockford's Base32)

    Structure: 48-bit timestamp + 80-bit randomness = 26 characters

    For URL shortening, we can truncate to 7-10 characters with some
    collision risk.
    """

    # Crockford's Base32 (excludes I, L, O, U to avoid confusion)
    ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ"

    def __init__(self):
        self.last_time = 0
        self.last_random = 0

    def generate(self) -> str:
        now = int(time.time() * 1000)

        if now == self.last_time:
            # Same millisecond: increment random portion
            self.last_random += 1
            if self.last_random > (1 << 80) - 1:
                # Overflow: wait for next millisecond
                while int(time.time() * 1000) == now:
                    pass
                now = int(time.time() * 1000)
                self.last_random = int.from_bytes(os.urandom(10), 'big')
        else:
            # New millisecond: fresh random
            self.last_random = int.from_bytes(os.urandom(10), 'big')

        self.last_time = now

        # Encode timestamp (10 chars) + random (16 chars) = 26 chars
        return self._encode_time(now) + self._encode_random(self.last_random)

    def _encode_time(self, timestamp: int) -> str:
        """Encode 48-bit timestamp to 10 characters."""
        result = []
        for _ in range(10):
            result.append(self.ENCODING[timestamp & 0x1F])
            timestamp >>= 5
        return ''.join(reversed(result))

    def _encode_random(self, random_bits: int) -> str:
        """Encode 80-bit random to 16 characters."""
        result = []
        for _ in range(16):
            result.append(self.ENCODING[random_bits & 0x1F])
            random_bits >>= 5
        return ''.join(reversed(result))

    def generate_short(self, length: int = 7) -> str:
        """
        Generate truncated ULID for URL shortening.

        Warning: Truncation significantly increases collision probability.
        7 chars of Base32 = 32^7 = 34 billion combinations
        """
        return self.generate()[:length]
```

### Comparison of Distributed ID Strategies

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d;">

| Strategy | Coordination | Sortable | Uniqueness | Complexity | Best For |
|----------|--------------|----------|------------|------------|----------|
| **Snowflake** | Machine ID assignment | By time | Guaranteed | Medium | Twitter-scale, time-ordered |
| **Range Alloc** | Per-range (ZK) | By range | Guaranteed | High | Legacy systems, simple IDs |
| **ULID** | None | By time | Probabilistic | Low | Serverless, distributed |
| **UUID v4** | None | No | Probabilistic | Lowest | Simple apps, no ordering |
| **UUID v7** | None | By time | Probabilistic | Low | Modern apps, time-ordered |

</div>

### Interview Questions: Distributed ID Generation (3 Levels Deep)

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #334155;">

**Level 1**: How does Snowflake ID ensure uniqueness across distributed servers?

**Level 2**: A Snowflake server experiences a clock jump backward of 100ms due to NTP correction. What happens, and how would you handle it without losing those 100ms of ID generation capacity?

**Level 3**: Design a modified Snowflake that tolerates clock skew up to 500ms while (a) maintaining strict ordering guarantees within a single server, (b) providing probabilistic ordering across servers, (c) never producing duplicate IDs, and (d) not blocking ID generation during clock corrections. Analyze the theoretical maximum skew your system can tolerate.

</div>

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #334155;">

**Level 1**: Explain the trade-off between range size in Zookeeper-based ID allocation.

**Level 2**: Your Zookeeper cluster becomes unavailable for 30 seconds. How would you design the system to continue generating IDs during this outage while preventing duplicates when ZK recovers?

**Level 3**: Design a multi-region ID allocation system where (a) each region has its own ZK cluster, (b) IDs must be globally unique across regions, (c) regions should operate independently during network partitions, and (d) you want to minimize ID "waste" while maximizing availability. How would you handle the scenario where a region is partitioned for a week and then reconnects?

</div>

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #334155;">

**Level 1**: Why might you choose ULID over UUID for a URL shortener?

**Level 2**: ULID's randomness portion is monotonically incremented within the same millisecond. What happens if you receive 2^80 requests in one millisecond? How would you handle this practically?

**Level 3**: You're building a URL shortener that must work in a serverless environment (AWS Lambda) where (a) instances have no persistent state, (b) multiple instances run concurrently, (c) you cannot use external coordination services, and (d) you need sub-millisecond ID generation latency. Design an ID generation scheme that provides acceptably low collision probability while meeting all constraints. Quantify "acceptably low" for a system expecting 10 billion URLs over 5 years.

</div>

---

## Section 4: Custom Aliases (Vanity URLs)

### The Business Case for Custom Aliases

<span style="color:#22c55e;font-weight:bold">Custom aliases</span> (also called vanity URLs) allow users to choose memorable, branded short codes instead of auto-generated ones. This feature transforms a utility into a premium product.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

**Business Value of Custom Aliases**:

- **Brand recognition**: `short.url/nike-sale` vs `short.url/7x9Kp2m`
- **Memorability**: Users can recall and type custom URLs
- **Trust signals**: Branded URLs have higher click-through rates
- **Premium feature**: Monetization opportunity (paid plans)

**Real-world pricing**: bit.ly charges $35/month for custom back-halves, Rebrandly's business plan at $69/month includes vanity URLs.

</div>

### Design Challenges for Custom Aliases

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">

<div style="color: #58a6ff; font-weight: bold; font-size: 16px; margin-bottom: 20px; text-align: center;">Custom Alias Design Considerations</div>

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">

<div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 20px; border-radius: 12px; flex: 1; min-width: 200px;">
<div style="color: #fff; font-weight: bold; margin-bottom: 12px;">Namespace Collision</div>
<div style="color: #fee2e2; font-size: 12px; line-height: 1.6;">
<div>Custom codes may conflict with auto-generated codes</div>
<div>Reserved words (admin, api, help)</div>
<div>Offensive/inappropriate words</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 20px; border-radius: 12px; flex: 1; min-width: 200px;">
<div style="color: #fff; font-weight: bold; margin-bottom: 12px;">Squatting Prevention</div>
<div style="color: #fef3c7; font-size: 12px; line-height: 1.6;">
<div>Users registering valuable names speculatively</div>
<div>Trademark infringement risks</div>
<div>Resource exhaustion attacks</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; border-radius: 12px; flex: 1; min-width: 200px;">
<div style="color: #fff; font-weight: bold; margin-bottom: 12px;">Validation Complexity</div>
<div style="color: #d1fae5; font-size: 12px; line-height: 1.6;">
<div>Character restrictions (URL-safe only)</div>
<div>Length limits and minimums</div>
<div>Case sensitivity decisions</div>
</div>
</div>

</div>
</div>

### Implementation: Custom Alias Validator

```python
import re
from typing import Optional, Tuple
from dataclasses import dataclass
from enum import Enum

class AliasValidationError(Enum):
    TOO_SHORT = "Alias must be at least 4 characters"
    TOO_LONG = "Alias cannot exceed 50 characters"
    INVALID_CHARS = "Alias can only contain letters, numbers, hyphens, and underscores"
    RESERVED_WORD = "This alias is reserved"
    OFFENSIVE = "This alias contains prohibited content"
    ALREADY_EXISTS = "This alias is already taken"
    STARTS_WITH_HYPHEN = "Alias cannot start or end with a hyphen"
    CONSECUTIVE_HYPHENS = "Alias cannot contain consecutive hyphens"

@dataclass
class AliasValidationResult:
    is_valid: bool
    error: Optional[AliasValidationError] = None
    normalized_alias: Optional[str] = None

class CustomAliasValidator:
    """
    Validates and normalizes custom aliases with multiple rule layers.

    Design choices:
    1. Case-insensitive storage (normalize to lowercase)
    2. Allow hyphens and underscores for readability
    3. Minimum 4 chars to prevent exhaustion attacks
    4. Block offensive content proactively
    """

    # Reserved words that conflict with system routes or are misleading
    RESERVED_WORDS = frozenset({
        'admin', 'api', 'www', 'app', 'help', 'support', 'about',
        'terms', 'privacy', 'login', 'logout', 'signup', 'register',
        'dashboard', 'settings', 'profile', 'account', 'billing',
        'status', 'health', 'metrics', 'favicon', 'robots', 'sitemap',
        'null', 'undefined', 'true', 'false', 'none'
    })

    # Pattern for valid alias characters
    VALID_PATTERN = re.compile(r'^[a-zA-Z0-9][a-zA-Z0-9_-]*[a-zA-Z0-9]$|^[a-zA-Z0-9]$')
    CONSECUTIVE_HYPHENS = re.compile(r'[-_]{2,}')

    def __init__(
        self,
        min_length: int = 4,
        max_length: int = 50,
        offensive_word_list: Optional[set] = None,
        storage_checker = None
    ):
        self.min_length = min_length
        self.max_length = max_length
        self.offensive_words = offensive_word_list or set()
        self.storage_checker = storage_checker  # Async function to check DB

    async def validate(self, alias: str) -> AliasValidationResult:
        """
        Validate a custom alias through multiple rule layers.

        Order of checks optimized for fast rejection:
        1. Length checks (O(1), no external calls)
        2. Character validation (O(n), regex)
        3. Reserved word check (O(1), hash lookup)
        4. Offensive content check (O(k), where k = offensive words)
        5. Existence check (O(1) amortized, but requires DB/cache call)
        """
        # Normalize: lowercase, strip whitespace
        normalized = alias.strip().lower()

        # Length validation
        if len(normalized) < self.min_length:
            return AliasValidationResult(False, AliasValidationError.TOO_SHORT)

        if len(normalized) > self.max_length:
            return AliasValidationResult(False, AliasValidationError.TOO_LONG)

        # Character validation
        if not self.VALID_PATTERN.match(normalized):
            if normalized.startswith('-') or normalized.endswith('-'):
                return AliasValidationResult(False, AliasValidationError.STARTS_WITH_HYPHEN)
            return AliasValidationResult(False, AliasValidationError.INVALID_CHARS)

        # Consecutive special characters
        if self.CONSECUTIVE_HYPHENS.search(normalized):
            return AliasValidationResult(False, AliasValidationError.CONSECUTIVE_HYPHENS)

        # Reserved word check
        if normalized in self.RESERVED_WORDS:
            return AliasValidationResult(False, AliasValidationError.RESERVED_WORD)

        # Offensive content check (substring matching)
        if self._contains_offensive_content(normalized):
            return AliasValidationResult(False, AliasValidationError.OFFENSIVE)

        # Existence check (most expensive, do last)
        if self.storage_checker:
            exists = await self.storage_checker(normalized)
            if exists:
                return AliasValidationResult(False, AliasValidationError.ALREADY_EXISTS)

        return AliasValidationResult(True, normalized_alias=normalized)

    def _contains_offensive_content(self, alias: str) -> bool:
        """
        Check for offensive content using multiple strategies.

        Real-world implementation would use:
        1. Bloom filter for fast negative check
        2. ML-based toxicity detection
        3. Levenshtein distance for obfuscation attempts (l33t speak)
        """
        # Simple substring check (production: use more sophisticated NLP)
        for word in self.offensive_words:
            if word in alias:
                return True
        return False
```

### Namespace Separation Strategy

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #a855f7;">

**The Namespace Problem**:

If auto-generated codes use Base62 and produce `abc123`, but a user wants custom alias `abc123`, you have a collision. Three strategies to resolve this:

</div>

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">

<div style="color: #58a6ff; font-weight: bold; font-size: 16px; margin-bottom: 20px; text-align: center;">Namespace Separation Approaches</div>

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 20px; border-radius: 12px;">
<div style="color: #fff; font-weight: bold; margin-bottom: 8px;">Strategy 1: Prefix Differentiation</div>
<div style="color: #d1f5d3; font-size: 13px; line-height: 1.6;">
<div><code>short.url/~abc123</code> (custom, prefix ~)</div>
<div><code>short.url/7x9Kp2m</code> (auto-generated, no prefix)</div>
<div style="margin-top: 8px; font-size: 11px;">Pros: Clear separation, simple lookup</div>
<div style="font-size: 11px;">Cons: URLs look different, ~ needs encoding</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 20px; border-radius: 12px;">
<div style="color: #fff; font-weight: bold; margin-bottom: 8px;">Strategy 2: Length Differentiation</div>
<div style="color: #dbeafe; font-size: 13px; line-height: 1.6;">
<div><code>short.url/my-custom-alias</code> (custom, 4+ chars with hyphens)</div>
<div><code>short.url/7x9Kp2</code> (auto-generated, exactly 6 alphanumeric)</div>
<div style="margin-top: 8px; font-size: 11px;">Pros: Natural URLs, implicit separation</div>
<div style="font-size: 11px;">Cons: Limits auto-generated code format</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 20px; border-radius: 12px;">
<div style="color: #fff; font-weight: bold; margin-bottom: 8px;">Strategy 3: Unified Namespace with Blocking</div>
<div style="color: #e9d5ff; font-size: 13px; line-height: 1.6;">
<div>Block custom aliases that could be auto-generated</div>
<div>Reserve auto-generated keyspace from custom use</div>
<div style="margin-top: 8px; font-size: 11px;">Pros: Cleanest URLs, single lookup</div>
<div style="font-size: 11px;">Cons: Complex validation, keyspace waste</div>
</div>
</div>

</div>
</div>

```python
class NamespaceManager:
    """
    Manages unified namespace with collision prevention.

    Strategy: Auto-generated codes are always 7 alphanumeric chars.
    Custom aliases must be 4+ chars AND contain at least one
    hyphen/underscore OR be longer than 7 chars.

    This ensures no overlap between namespaces.
    """

    AUTO_GENERATED_PATTERN = re.compile(r'^[a-zA-Z0-9]{7}$')

    def is_auto_generated_format(self, code: str) -> bool:
        """Check if code matches auto-generated format."""
        return bool(self.AUTO_GENERATED_PATTERN.match(code))

    def validate_custom_alias_namespace(self, alias: str) -> bool:
        """
        Ensure custom alias doesn't conflict with auto-generated space.

        Rules:
        - If exactly 7 chars, must contain non-alphanumeric (hyphen/underscore)
        - If all alphanumeric, must be != 7 chars
        """
        normalized = alias.lower()

        # If it looks like auto-generated format, reject
        if self.is_auto_generated_format(normalized):
            return False

        return True

    async def resolve_code(
        self,
        code: str,
        custom_storage,
        auto_storage
    ) -> Optional[str]:
        """
        Resolve a short code to its original URL.

        Optimization: Check format to determine which storage to query first.
        """
        if self.is_auto_generated_format(code):
            # Likely auto-generated, check that storage first
            result = await auto_storage.get(code)
            if result:
                return result
            # Fallback: maybe it's a custom alias that looks like auto-generated
            # (from before namespace rules were enforced)
            return await custom_storage.get(code)
        else:
            # Must be custom alias
            return await custom_storage.get(code)
```

### Premium Feature: Custom Domain Integration

<span style="color:#22c55e;font-weight:bold">Custom domains</span> take vanity URLs to the next level, allowing enterprises to use their own domains (e.g., `go.nike.com/sale`) while the URL shortener handles everything.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">

<div style="color: #58a6ff; font-weight: bold; font-size: 16px; margin-bottom: 20px; text-align: center;">Custom Domain Architecture</div>

<div style="display: flex; flex-direction: column; gap: 20px;">

<div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; align-items: center;">
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 16px 20px; border-radius: 10px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 12px;">Customer Domain</div>
<div style="color: #dcfce7; font-size: 10px;">go.nike.com</div>
</div>
<div style="color: #7ee787; font-size: 20px;">-></div>
<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 16px 20px; border-radius: 10px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 12px;">DNS CNAME</div>
<div style="color: #dbeafe; font-size: 10px;">custom.shorturl.com</div>
</div>
<div style="color: #7ee787; font-size: 20px;">-></div>
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 16px 20px; border-radius: 10px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 12px;">Load Balancer</div>
<div style="color: #fef3c7; font-size: 10px;">SNI Routing</div>
</div>
<div style="color: #7ee787; font-size: 20px;">-></div>
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 16px 20px; border-radius: 10px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 12px;">URL Shortener</div>
<div style="color: #ede9fe; font-size: 10px;">Multi-tenant</div>
</div>
</div>

<div style="background: #21262d; padding: 16px; border-radius: 8px;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 8px;">SSL/TLS Considerations:</div>
<div style="color: #c9d1d9; font-size: 11px; line-height: 1.6;">
<div>1. Customer adds CNAME record pointing to your infrastructure</div>
<div>2. You provision SSL certificate for their domain (Let's Encrypt / ACM)</div>
<div>3. Load balancer uses SNI to route to correct certificate</div>
<div>4. Application identifies tenant by Host header</div>
</div>
</div>

</div>
</div>

```python
from dataclasses import dataclass
from typing import Dict, Optional
import ssl

@dataclass
class CustomDomain:
    domain: str
    organization_id: str
    ssl_certificate_arn: str
    verified: bool = False
    created_at: datetime = None

class CustomDomainManager:
    """
    Manages custom domain registration and SSL provisioning.

    Real-world considerations:
    1. DNS verification (TXT record) to prove domain ownership
    2. Automatic SSL certificate provisioning via ACME/Let's Encrypt
    3. Certificate renewal automation
    4. Multi-tenant isolation
    """

    def __init__(self, certificate_manager, dns_verifier):
        self.cert_manager = certificate_manager
        self.dns_verifier = dns_verifier
        self.domains: Dict[str, CustomDomain] = {}

    async def register_domain(
        self,
        domain: str,
        organization_id: str
    ) -> CustomDomain:
        """
        Start custom domain registration process.

        Returns domain record with verification instructions.
        """
        # Generate verification token
        verification_token = self._generate_verification_token(domain, organization_id)

        custom_domain = CustomDomain(
            domain=domain,
            organization_id=organization_id,
            ssl_certificate_arn="pending",
            verified=False,
            created_at=datetime.utcnow()
        )

        self.domains[domain] = custom_domain

        # Return instructions for DNS verification
        return custom_domain, {
            'verification_type': 'TXT',
            'record_name': f'_shorturl-verify.{domain}',
            'record_value': verification_token
        }

    async def verify_and_provision(self, domain: str) -> bool:
        """
        Verify DNS and provision SSL certificate.

        This is typically called via webhook or polling job.
        """
        custom_domain = self.domains.get(domain)
        if not custom_domain:
            return False

        # Verify DNS TXT record
        if not await self.dns_verifier.verify_txt_record(domain):
            return False

        # Provision SSL certificate
        cert_arn = await self.cert_manager.provision_certificate(domain)

        custom_domain.ssl_certificate_arn = cert_arn
        custom_domain.verified = True

        return True

    def get_organization_for_domain(self, host: str) -> Optional[str]:
        """
        Resolve Host header to organization.

        Used during request processing to identify tenant.
        """
        custom_domain = self.domains.get(host)
        if custom_domain and custom_domain.verified:
            return custom_domain.organization_id
        return None
```

### Interview Questions: Custom Aliases (3 Levels Deep)

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #334155;">

**Level 1**: How would you implement custom short code (vanity URL) support?

<details style="margin-top: 12px;">
<summary style="cursor: pointer; color: #60a5fa; font-weight: 500;">View Answer</summary>
<div style="margin-top: 12px; padding: 16px; background: #1e293b; border-radius: 8px; color: #e2e8f0; font-size: 14px; line-height: 1.7;">

Custom aliases require additional validation beyond auto-generated codes:

1. **Validation layer**: Check length (min 4 chars), allowed characters (alphanumeric, hyphens, underscores), reserved words, offensive content
2. **Namespace separation**: Ensure custom aliases don't conflict with auto-generated codes (e.g., require hyphens or different lengths)
3. **Uniqueness check**: Query database before creation, handle race conditions with unique constraints
4. **Normalization**: Convert to lowercase for case-insensitive matching

The key trade-off is between <span style="color:#22c55e;font-weight:bold">user flexibility</span> (allowing many formats) and <span style="color:#22c55e;font-weight:bold">system simplicity</span> (predictable URL structure).

</div>
</details>

**Level 2**: Your custom alias system allows users to create any alias. An attacker creates aliases like `login`, `admin`, `api` - all linking to phishing sites. How would you prevent this while maintaining a good user experience?

<details style="margin-top: 12px;">
<summary style="cursor: pointer; color: #60a5fa; font-weight: 500;">View Answer</summary>
<div style="margin-top: 12px; padding: 16px; background: #1e293b; border-radius: 8px; color: #e2e8f0; font-size: 14px; line-height: 1.7;">

Multi-layered defense strategy:

1. **Reserved word blocklist**: Maintain a comprehensive list of system routes, common phishing targets (`paypal`, `google`, `amazon`), and technical terms (`null`, `undefined`)

2. **Trademark protection**:
   - Partner with brand protection services
   - Require verification for brand names
   - Implement [[DMCA takedown process]](/topics/legal/dmca-compliance)

3. **Proactive scanning**:
   - Scan destination URLs against [[Safe Browsing API]](/topics/security/safe-browsing)
   - Monitor click patterns for phishing indicators
   - Machine learning on URL features

4. **Tiered access**:
   - Free users: limited to lowercase alphanumeric
   - Verified accounts: expanded character set
   - Enterprise: brand protection included

5. **Reputation system**: New accounts have alias restrictions lifted gradually based on behavior.

The trade-off: Too restrictive blocks legitimate use cases. Consider implementing an appeal process and manual review queue for edge cases.

</div>
</details>

**Level 3**: Design a custom alias system that (a) allows millions of users to create aliases concurrently, (b) prevents race conditions where two users try to claim the same alias simultaneously, (c) provides instant feedback on alias availability as users type, and (d) handles the case where a user's session crashes between checking availability and confirming creation. Consider the distributed systems implications across multiple data centers.

<details style="margin-top: 12px;">
<summary style="cursor: pointer; color: #60a5fa; font-weight: 500;">View Answer</summary>
<div style="margin-top: 12px; padding: 16px; background: #1e293b; border-radius: 8px; color: #e2e8f0; font-size: 14px; line-height: 1.7;">

**Architecture for concurrent alias creation at scale:**

1. **Real-time availability check (debounced, 200ms)**:
```
User types -> Debounce -> Check Bloom filter (local)
   -> If "maybe exists": check Redis (regional)
   -> If still uncertain: check DB (async, show "checking...")
```
   - Bloom filter provides instant negative ("definitely available")
   - Regional Redis cache reduces cross-region latency
   - Accept false positives (say unavailable when actually available) over false negatives

2. **Reservation system with TTL**:
```python
async def reserve_alias(alias: str, user_id: str) -> bool:
    # Atomic reservation with 5-minute TTL
    reserved = await redis.set(
        f"alias:reservation:{alias}",
        user_id,
        nx=True,  # Only if not exists
        ex=300    # 5-minute expiry
    )
    return reserved
```
   - User gets 5 minutes to complete signup/payment
   - Reservation auto-expires if abandoned
   - Prevents squatting during checkout flow

3. **Distributed race condition handling**:
```python
async def create_alias(alias: str, user_id: str, url: str) -> bool:
    # Check reservation ownership
    reservation = await redis.get(f"alias:reservation:{alias}")
    if reservation != user_id:
        return False  # Someone else reserved or reservation expired

    # Database insert with unique constraint
    try:
        await db.execute("""
            INSERT INTO aliases (alias, user_id, url, created_at)
            VALUES ($1, $2, $3, NOW())
        """, alias, user_id, url)
    except UniqueViolationError:
        return False  # Lost race to DB write

    # Clean up reservation
    await redis.delete(f"alias:reservation:{alias}")

    # Update Bloom filter (async, fire-and-forget)
    asyncio.create_task(bloom_filter.add(alias))

    return True
```

4. **Multi-region consistency**:
   - Use [[CRDTs]](/topics/system-design/crdts) for Bloom filter synchronization
   - Primary region owns alias creation (consistent hashing by first char)
   - [[Cross-region replication]](/topics/system-design/replication) with conflict resolution (first-write-wins based on vector clock)

5. **Session crash recovery**:
   - Reservation TTL ensures automatic cleanup
   - If user had completed payment but session crashed: reconciliation job checks for "orphaned payments" and completes registration
   - Idempotency keys prevent double-creation on retry

**Key insight**: The system is eventually consistent for reads (Bloom filter may lag) but strongly consistent for writes (database unique constraint is the source of truth). This matches user expectations: instant feedback is "best effort," but actual creation is guaranteed unique.

</div>
</details>

</div>

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #334155;">

**Level 1**: Should custom aliases be case-sensitive or case-insensitive?

<details style="margin-top: 12px;">
<summary style="cursor: pointer; color: #60a5fa; font-weight: 500;">View Answer</summary>
<div style="margin-top: 12px; padding: 16px; background: #1e293b; border-radius: 8px; color: #e2e8f0; font-size: 14px; line-height: 1.7;">

**Case-insensitive is the better choice** for custom aliases:

1. **User experience**: Users typing from memory often get case wrong
2. **Verbal sharing**: "go to short dot url slash My-Brand" - ambiguous capitalization
3. **Email clients**: Some lowercase all URLs
4. **Consistency**: `MyBrand`, `mybrand`, `MYBRAND` should all work

Implementation: Normalize to lowercase at creation time, store lowercase, query lowercase.

Trade-off: Reduces namespace by ~26x (since A-Z collapse to a-z), but for human-readable aliases this is acceptable.

</div>
</details>

**Level 2**: Your marketing team wants case-sensitivity preserved for display purposes (showing `MyBrand` in analytics) while maintaining case-insensitive matching. How would you implement this?

<details style="margin-top: 12px;">
<summary style="cursor: pointer; color: #60a5fa; font-weight: 500;">View Answer</summary>
<div style="margin-top: 12px; padding: 16px; background: #1e293b; border-radius: 8px; color: #e2e8f0; font-size: 14px; line-height: 1.7;">

**Dual-storage approach:**

```sql
CREATE TABLE custom_aliases (
    normalized_alias VARCHAR(50) PRIMARY KEY,  -- lowercase, for lookups
    display_alias VARCHAR(50) NOT NULL,        -- original case, for display
    original_url TEXT NOT NULL,
    user_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_aliases_user ON custom_aliases(user_id);
```

```python
class CasePreservingAliasStore:
    async def create(self, alias: str, url: str, user_id: str):
        normalized = alias.lower()
        await db.execute("""
            INSERT INTO custom_aliases
            (normalized_alias, display_alias, original_url, user_id)
            VALUES ($1, $2, $3, $4)
        """, normalized, alias, url, user_id)

    async def lookup(self, alias: str) -> Optional[dict]:
        # Always query with normalized form
        return await db.fetchone("""
            SELECT display_alias, original_url
            FROM custom_aliases
            WHERE normalized_alias = $1
        """, alias.lower())
```

Cache key uses normalized form; cache value includes display form for analytics.

</div>
</details>

**Level 3**: You've implemented case-insensitive custom aliases. Now a premium customer complains: they created `GitHub-Repo` but a competitor later created `github-repo` (normalized to same value) and your system rejected it. The competitor argues they should have access to the lowercase version. Design a policy and technical system that fairly resolves such conflicts, considers trademark implications, and scales to millions of aliases without requiring manual review for every case.

<details style="margin-top: 12px;">
<summary style="cursor: pointer; color: #60a5fa; font-weight: 500;">View Answer</summary>
<div style="margin-top: 12px; padding: 16px; background: #1e293b; border-radius: 8px; color: #e2e8f0; font-size: 14px; line-height: 1.7;">

**Policy Framework:**

1. **First-come-first-served for normalized form**: Whoever creates any case variant first owns the normalized namespace. This is simple, predictable, and legally defensible.

2. **Trademark override process**:
   - Trademark holder can file claim with documentation
   - System flags alias for review
   - If legitimate, transfer ownership (with notification to original creator)
   - Time limit: claims must be filed within 30 days of creation

3. **Preventive measures**:
   - Known trademark database check at creation time
   - Require verification for exact trademark matches
   - Warning message: "This alias may conflict with existing trademarks"

**Technical Implementation:**

```python
@dataclass
class AliasOwnership:
    normalized_alias: str
    owner_id: str
    created_at: datetime
    trademark_protected: bool = False
    trademark_claim_deadline: datetime = None

class AliasDisputeSystem:
    async def file_trademark_claim(
        self,
        alias: str,
        claimant_id: str,
        trademark_proof: str
    ) -> str:
        """
        File a trademark claim for an alias.
        Returns claim_id for tracking.
        """
        ownership = await self.get_ownership(alias.lower())

        if not ownership:
            return "ALIAS_NOT_FOUND"

        if ownership.owner_id == claimant_id:
            return "ALREADY_OWNER"

        # Check claim deadline
        if datetime.utcnow() > ownership.trademark_claim_deadline:
            return "CLAIM_PERIOD_EXPIRED"

        # Create claim record
        claim = await self.create_claim(
            alias=alias.lower(),
            claimant_id=claimant_id,
            current_owner_id=ownership.owner_id,
            proof=trademark_proof
        )

        # Notify current owner
        await self.notify_owner_of_claim(ownership.owner_id, claim)

        # Queue for review (ML-assisted prioritization)
        await self.queue_for_review(claim)

        return claim.id

    async def resolve_claim(
        self,
        claim_id: str,
        decision: str,
        reviewer_id: str
    ):
        """
        Resolve a trademark claim.
        decision: 'TRANSFER' | 'REJECT' | 'COEXIST'
        """
        claim = await self.get_claim(claim_id)

        if decision == 'TRANSFER':
            # Transfer ownership
            await self.transfer_ownership(
                claim.alias,
                new_owner=claim.claimant_id
            )
            # Mark as trademark protected (prevent future claims)
            await self.mark_trademark_protected(claim.alias)
            # Notify parties
            await self.notify_transfer(claim)

        elif decision == 'REJECT':
            await self.notify_rejection(claim)

        elif decision == 'COEXIST':
            # Both parties can use, but neither owns exclusively
            # Typically used for generic terms
            await self.mark_generic_term(claim.alias)
```

**ML-Assisted Review Queue:**
- Auto-approve: Exact match to registered trademark + claimant is trademark registrant
- Auto-reject: No trademark registration + alias existed 30+ days
- Human review: Everything else, prioritized by trademark class and alias popularity

**Scaling considerations:**
- 99% of aliases never disputed (auto-handled by first-come policy)
- ~0.9% rejected automatically (no trademark registration)
- ~0.1% require human review (O(thousands/year) at scale, manageable)

</div>
</details>

</div>

---

## Section 5: Analytics Tracking Architecture

### The 301 vs 302 Decision

Redirect status codes fundamentally affect your analytics capabilities.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">

<div style="color: #58a6ff; font-weight: bold; font-size: 16px; margin-bottom: 20px; text-align: center;">HTTP Redirect Behavior Comparison</div>

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 24px; border-radius: 12px; flex: 1; min-width: 280px;">
<div style="color: #fff; font-weight: bold; font-size: 14px; margin-bottom: 12px;">301 Moved Permanently</div>
<div style="color: #d1f5d3; font-size: 12px; line-height: 1.8;">
<div>Browser caches redirect</div>
<div>Future requests skip your server</div>
<div>SEO: Link juice transfers</div>
<div>Lower server load</div>
<div>Analytics: First click only</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); padding: 24px; border-radius: 12px; flex: 1; min-width: 280px;">
<div style="color: #fff; font-weight: bold; font-size: 14px; margin-bottom: 12px;">302 Found (Temporary)</div>
<div style="color: #fed7aa; font-size: 12px; line-height: 1.8;">
<div>Browser doesn't cache</div>
<div>Every request hits your server</div>
<div>SEO: Original URL retains value</div>
<div>Higher server load</div>
<div>Analytics: Every click tracked</div>
</div>
</div>

</div>

<div style="background: #21262d; padding: 16px; border-radius: 8px; margin-top: 20px;">
<div style="color: #ffa657; font-weight: bold; font-size: 12px; margin-bottom: 8px;">Real-World Choices:</div>
<div style="color: #c9d1d9; font-size: 11px;">
<div>bit.ly: 301 + tracking pixel (best of both worlds)</div>
<div>TinyURL: 301 (prioritizes performance)</div>
<div>Marketing platforms: 302 (prioritizes analytics)</div>
</div>
</div>

</div>

### Multi-Dimensional Analytics Data Model

```python
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional, List, Dict
from enum import Enum

class DeviceType(Enum):
    DESKTOP = "desktop"
    MOBILE = "mobile"
    TABLET = "tablet"
    BOT = "bot"
    UNKNOWN = "unknown"

@dataclass
class ClickEvent:
    """
    Individual click event - stored in time-series database.

    Design choice: Store raw events vs. pre-aggregated counters
    - Raw events: Flexible queries, storage-heavy
    - Pre-aggregated: Fast reads, loses granularity

    Hybrid approach: Store raw for recent data, aggregate older data.
    """
    short_code: str
    timestamp: datetime

    # User identification (privacy-conscious)
    visitor_id: str  # Hashed IP + User-Agent, not PII
    session_id: Optional[str] = None

    # Geographic data
    country: Optional[str] = None
    region: Optional[str] = None
    city: Optional[str] = None

    # Technical data
    ip_address: str = ""  # Consider not storing for GDPR
    user_agent: str = ""
    device_type: DeviceType = DeviceType.UNKNOWN
    browser: Optional[str] = None
    os: Optional[str] = None

    # Referrer tracking
    referrer: Optional[str] = None
    referrer_domain: Optional[str] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None

    # Performance
    response_time_ms: int = 0
    cache_hit: bool = False

@dataclass
class URLAnalytics:
    """
    Aggregated analytics for a short URL.

    Trade-off: Denormalization for read performance.
    These counters are updated asynchronously from click events.
    """
    short_code: str
    original_url: str
    created_at: datetime

    # Counters (eventually consistent)
    total_clicks: int = 0
    unique_visitors: int = 0  # Based on visitor_id

    # Time-based aggregations
    clicks_last_24h: int = 0
    clicks_last_7d: int = 0
    clicks_last_30d: int = 0

    # Top dimensions (pre-computed, top 10 each)
    top_countries: Dict[str, int] = field(default_factory=dict)
    top_referrers: Dict[str, int] = field(default_factory=dict)
    top_devices: Dict[str, int] = field(default_factory=dict)

    # Time series (hourly buckets for last 30 days)
    hourly_clicks: List[int] = field(default_factory=list)
```

### Real-Time vs. Batch Analytics Pipeline

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">

<div style="color: #58a6ff; font-weight: bold; font-size: 16px; margin-bottom: 20px; text-align: center;">Lambda Architecture for Analytics</div>

<div style="display: flex; flex-direction: column; gap: 20px;">

<div style="background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); padding: 20px; border-radius: 12px;">
<div style="color: #fff; font-weight: bold; margin-bottom: 12px;">Speed Layer (Real-Time)</div>
<div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
<div style="background: rgba(0,0,0,0.2); padding: 10px 16px; border-radius: 8px;">
<div style="color: #fff; font-size: 11px;">Click Event</div>
</div>
<div style="color: #fff;">-></div>
<div style="background: rgba(0,0,0,0.2); padding: 10px 16px; border-radius: 8px;">
<div style="color: #fff; font-size: 11px;">Kafka</div>
</div>
<div style="color: #fff;">-></div>
<div style="background: rgba(0,0,0,0.2); padding: 10px 16px; border-radius: 8px;">
<div style="color: #fff; font-size: 11px;">Flink/Spark Streaming</div>
</div>
<div style="color: #fff;">-></div>
<div style="background: rgba(0,0,0,0.2); padding: 10px 16px; border-radius: 8px;">
<div style="color: #fff; font-size: 11px;">Redis Counters</div>
</div>
</div>
<div style="color: #fef3c7; font-size: 11px; margin-top: 12px;">Latency: ~seconds | Accuracy: Approximate | Retention: Hours</div>
</div>

<div style="background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%); padding: 20px; border-radius: 12px;">
<div style="color: #fff; font-weight: bold; margin-bottom: 12px;">Batch Layer (Historical)</div>
<div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
<div style="background: rgba(0,0,0,0.2); padding: 10px 16px; border-radius: 8px;">
<div style="color: #fff; font-size: 11px;">Click Events</div>
</div>
<div style="color: #fff;">-></div>
<div style="background: rgba(0,0,0,0.2); padding: 10px 16px; border-radius: 8px;">
<div style="color: #fff; font-size: 11px;">S3/HDFS</div>
</div>
<div style="color: #fff;">-></div>
<div style="background: rgba(0,0,0,0.2); padding: 10px 16px; border-radius: 8px;">
<div style="color: #fff; font-size: 11px;">Spark Batch</div>
</div>
<div style="color: #fff;">-></div>
<div style="background: rgba(0,0,0,0.2); padding: 10px 16px; border-radius: 8px;">
<div style="color: #fff; font-size: 11px;">Data Warehouse</div>
</div>
</div>
<div style="color: #dbeafe; font-size: 11px; margin-top: 12px;">Latency: ~hours | Accuracy: Exact | Retention: Years</div>
</div>

<div style="background: linear-gradient(135deg, #10b981 0%, #34d399 100%); padding: 20px; border-radius: 12px;">
<div style="color: #fff; font-weight: bold; margin-bottom: 12px;">Serving Layer (Query)</div>
<div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
<div style="background: rgba(0,0,0,0.2); padding: 10px 16px; border-radius: 8px;">
<div style="color: #fff; font-size: 11px;">Real-time (Redis)</div>
</div>
<div style="color: #fff;">+</div>
<div style="background: rgba(0,0,0,0.2); padding: 10px 16px; border-radius: 8px;">
<div style="color: #fff; font-size: 11px;">Historical (Warehouse)</div>
</div>
<div style="color: #fff;">=</div>
<div style="background: rgba(0,0,0,0.2); padding: 10px 16px; border-radius: 8px;">
<div style="color: #fff; font-size: 11px;">Unified Dashboard</div>
</div>
</div>
<div style="color: #d1fae5; font-size: 11px; margin-top: 12px;">Merges speed + batch for complete, consistent view</div>
</div>

</div>
</div>

### Click Event Processing Pipeline

```python
import asyncio
from aiokafka import AIOKafkaProducer, AIOKafkaConsumer
import json
from user_agents import parse as parse_user_agent
import geoip2.database

class ClickProcessor:
    """
    Processes click events with minimal latency impact on redirects.

    Critical design: Analytics processing MUST NOT block redirects.
    Pattern: Fire-and-forget to Kafka, process asynchronously.
    """

    def __init__(self, kafka_brokers: str, geoip_db_path: str):
        self.producer = AIOKafkaProducer(
            bootstrap_servers=kafka_brokers,
            value_serializer=lambda v: json.dumps(v).encode()
        )
        self.geoip_reader = geoip2.database.Reader(geoip_db_path)
        self._started = False

    async def start(self):
        await self.producer.start()
        self._started = True

    async def record_click(
        self,
        short_code: str,
        ip_address: str,
        user_agent: str,
        referrer: str,
        response_time_ms: int,
        cache_hit: bool
    ):
        """
        Record click event - fire and forget.

        Must complete in < 1ms to not impact redirect latency.
        All enrichment happens in the consumer.
        """
        if not self._started:
            return

        event = {
            'short_code': short_code,
            'timestamp': datetime.utcnow().isoformat(),
            'ip_address': ip_address,
            'user_agent': user_agent,
            'referrer': referrer,
            'response_time_ms': response_time_ms,
            'cache_hit': cache_hit
        }

        # Fire and forget - don't await, don't block redirect
        asyncio.create_task(
            self.producer.send('click_events', event)
        )

class ClickEnricher:
    """
    Consumes raw click events, enriches with geo/device data,
    updates real-time counters, and forwards to data lake.
    """

    def __init__(
        self,
        kafka_brokers: str,
        geoip_db_path: str,
        redis_client,
        s3_client
    ):
        self.consumer = AIOKafkaConsumer(
            'click_events',
            bootstrap_servers=kafka_brokers,
            group_id='click_enricher',
            value_deserializer=lambda v: json.loads(v.decode())
        )
        self.geoip = geoip2.database.Reader(geoip_db_path)
        self.redis = redis_client
        self.s3 = s3_client

    async def process(self):
        await self.consumer.start()

        async for message in self.consumer:
            event = message.value

            # Enrich with geo data
            try:
                geo = self.geoip.city(event['ip_address'])
                event['country'] = geo.country.iso_code
                event['region'] = geo.subdivisions.most_specific.name
                event['city'] = geo.city.name
            except:
                pass

            # Enrich with device data
            ua = parse_user_agent(event['user_agent'])
            event['device_type'] = self._classify_device(ua)
            event['browser'] = ua.browser.family
            event['os'] = ua.os.family

            # Hash IP for privacy (don't store raw)
            event['visitor_id'] = self._hash_visitor(
                event['ip_address'],
                event['user_agent']
            )
            del event['ip_address']  # GDPR compliance

            # Update real-time counters
            await self._update_counters(event)

            # Forward to data lake
            await self._write_to_s3(event)

    async def _update_counters(self, event: dict):
        """
        Update Redis counters for real-time dashboard.

        Uses Redis MULTI for atomic counter updates.
        HyperLogLog for unique visitor counting.
        """
        code = event['short_code']
        pipe = self.redis.pipeline()

        # Total clicks (simple counter)
        pipe.incr(f"clicks:{code}:total")

        # Unique visitors (HyperLogLog - probabilistic, memory efficient)
        pipe.pfadd(f"clicks:{code}:visitors", event['visitor_id'])

        # Time-windowed counters (expire automatically)
        hour_key = datetime.utcnow().strftime("%Y%m%d%H")
        pipe.incr(f"clicks:{code}:hourly:{hour_key}")
        pipe.expire(f"clicks:{code}:hourly:{hour_key}", 86400 * 30)  # 30 days

        # Country breakdown
        if event.get('country'):
            pipe.zincrby(f"clicks:{code}:countries", 1, event['country'])

        await pipe.execute()
```

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #a855f7;">

**Trade-off: Accuracy vs. Memory**

| Counter Type | Memory | Accuracy | Use Case |
|--------------|--------|----------|----------|
| Exact counter | O(1) | 100% | Total clicks |
| [[HyperLogLog]](/topics/algorithms/hyperloglog) | 12KB fixed | ~0.81% error | Unique visitors |
| Count-Min Sketch | Configurable | Configurable | Heavy hitters |
| Sorted Set | O(n) | 100% | Top-N rankings |

bit.ly processes 10 billion+ clicks/month. Exact counting at this scale requires careful data structure choices.

</div>

### Interview Questions: Analytics Tracking (3 Levels Deep)

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #334155;">

**Level 1**: Why might you choose 302 redirects over 301 for a URL shortener with analytics?

**Level 2**: You want both fast redirects (301 cached) AND complete analytics. How would you design a system that achieves both? What are the privacy implications?

**Level 3**: Your tracking pixel approach works, but ad blockers are blocking it for 30% of users. Design a privacy-respecting analytics system that (a) works despite ad blockers, (b) complies with GDPR/CCPA, (c) still provides useful aggregate analytics, and (d) doesn't significantly impact page load time. Consider the ethical implications of circumventing user preferences.

</div>

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #334155;">

**Level 1**: How would you count unique visitors to a short URL?

**Level 2**: At 1 billion clicks/day, storing visitor IDs for exact unique counting is infeasible. How does HyperLogLog solve this, and what's the trade-off?

**Level 3**: You need to compute unique visitors across arbitrary time ranges (e.g., "unique visitors between March 15-22"). HyperLogLog supports union but not difference. Design a system that supports arbitrary time range queries with configurable accuracy-memory trade-offs. Consider the case where a user asks for uniqueness across a 2-year period.

</div>

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #334155;">

**Level 1**: Why use Kafka for click event processing instead of direct database writes?

**Level 2**: Your Kafka consumer falls behind, creating a growing backlog. How would you handle this without losing data or impacting real-time counters?

**Level 3**: Design a click processing pipeline that (a) guarantees exactly-once processing semantics, (b) handles out-of-order events (mobile clicks arriving late), (c) supports reprocessing historical data when you fix bugs, and (d) provides real-time counters with < 5 second lag. Address the tension between exactly-once semantics and real-time requirements.

</div>

---

## Section 5: Caching Strategy

### Cache Hierarchy Design

URL shorteners are extremely read-heavy (100:1 read:write ratio or higher), making caching critical for performance and cost.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">

<div style="color: #58a6ff; font-weight: bold; font-size: 16px; margin-bottom: 20px; text-align: center;">Multi-Layer Cache Architecture</div>

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 16px 24px; border-radius: 10px; min-width: 140px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 13px;">Browser</div>
<div style="color: #dcfce7; font-size: 10px; margin-top: 4px;">301 Cache</div>
</div>
<div style="color: #6b7280;">-></div>
<div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 16px 24px; border-radius: 10px; min-width: 140px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 13px;">CDN Edge</div>
<div style="color: #dbeafe; font-size: 10px; margin-top: 4px;">Global PoPs</div>
</div>
<div style="color: #6b7280;">-></div>
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 16px 24px; border-radius: 10px; min-width: 140px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 13px;">App Server</div>
<div style="color: #fef3c7; font-size: 10px; margin-top: 4px;">Local LRU</div>
</div>
<div style="color: #6b7280;">-></div>
<div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 16px 24px; border-radius: 10px; min-width: 140px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 13px;">Redis</div>
<div style="color: #fee2e2; font-size: 10px; margin-top: 4px;">Distributed</div>
</div>
<div style="color: #6b7280;">-></div>
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 16px 24px; border-radius: 10px; min-width: 140px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 13px;">Database</div>
<div style="color: #ede9fe; font-size: 10px; margin-top: 4px;">Source of Truth</div>
</div>
</div>

<div style="background: #21262d; padding: 16px; border-radius: 8px; margin-top: 8px;">
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px;">
<div>
<div style="color: #22c55e; font-weight: bold; font-size: 11px;">Browser Cache</div>
<div style="color: #9ca3af; font-size: 10px;">0ms latency</div>
<div style="color: #9ca3af; font-size: 10px;">No server cost</div>
</div>
<div>
<div style="color: #3b82f6; font-weight: bold; font-size: 11px;">CDN Edge</div>
<div style="color: #9ca3af; font-size: 10px;">5-20ms latency</div>
<div style="color: #9ca3af; font-size: 10px;">~80% hit rate</div>
</div>
<div>
<div style="color: #f59e0b; font-weight: bold; font-size: 11px;">Local LRU</div>
<div style="color: #9ca3af; font-size: 10px;">0.1ms latency</div>
<div style="color: #9ca3af; font-size: 10px;">~50% hit rate</div>
</div>
<div>
<div style="color: #ef4444; font-weight: bold; font-size: 11px;">Redis</div>
<div style="color: #9ca3af; font-size: 10px;">1-5ms latency</div>
<div style="color: #9ca3af; font-size: 10px;">~95% hit rate</div>
</div>
<div>
<div style="color: #8b5cf6; font-weight: bold; font-size: 11px;">Database</div>
<div style="color: #9ca3af; font-size: 10px;">10-50ms latency</div>
<div style="color: #9ca3af; font-size: 10px;">Always available</div>
</div>
</div>
</div>

</div>
</div>

### Cache Implementation with Write-Through Pattern

```python
import asyncio
from typing import Optional, Dict
from collections import OrderedDict
import redis.asyncio as redis
import time

class URLCache:
    """
    Multi-layer caching for URL lookups.

    Design choices:
    1. Write-through: Update cache on write (consistency)
    2. Read-through: Populate cache on miss (freshness)
    3. TTL-based expiration: Prevent stale data

    Trade-off: Write-through adds latency to writes but
    ensures cache consistency. For read-heavy workloads,
    this is acceptable.
    """

    def __init__(
        self,
        redis_client: redis.Redis,
        local_cache_size: int = 10000,
        redis_ttl: int = 3600,
        local_ttl: int = 300
    ):
        self.redis = redis_client
        self.redis_ttl = redis_ttl
        self.local_ttl = local_ttl

        # Local LRU cache for hot URLs
        self.local_cache: OrderedDict[str, tuple] = OrderedDict()
        self.local_cache_size = local_cache_size

        # Metrics
        self.metrics = {
            'local_hits': 0,
            'redis_hits': 0,
            'db_hits': 0,
            'total_lookups': 0
        }

    async def get(self, short_code: str) -> Optional[str]:
        """
        Look up URL with cascading cache checks.

        Returns original URL or None if not found.
        """
        self.metrics['total_lookups'] += 1

        # Layer 1: Local LRU cache
        cached = self._get_local(short_code)
        if cached is not None:
            self.metrics['local_hits'] += 1
            return cached

        # Layer 2: Redis distributed cache
        cached = await self._get_redis(short_code)
        if cached is not None:
            self.metrics['redis_hits'] += 1
            self._set_local(short_code, cached)
            return cached

        # Layer 3: Database (handled by caller)
        self.metrics['db_hits'] += 1
        return None

    def _get_local(self, short_code: str) -> Optional[str]:
        """Check local LRU cache with TTL validation."""
        if short_code not in self.local_cache:
            return None

        url, timestamp = self.local_cache[short_code]

        # Check TTL
        if time.time() - timestamp > self.local_ttl:
            del self.local_cache[short_code]
            return None

        # Move to end (LRU update)
        self.local_cache.move_to_end(short_code)
        return url

    def _set_local(self, short_code: str, url: str):
        """Add to local cache with LRU eviction."""
        # Evict oldest if at capacity
        while len(self.local_cache) >= self.local_cache_size:
            self.local_cache.popitem(last=False)

        self.local_cache[short_code] = (url, time.time())

    async def _get_redis(self, short_code: str) -> Optional[str]:
        """Check Redis distributed cache."""
        return await self.redis.get(f"url:{short_code}")

    async def set(self, short_code: str, url: str):
        """
        Write-through: Update both caches on write.

        Order matters: Update Redis first (distributed),
        then local (single server). On failure, at least
        Redis has the data.
        """
        # Update Redis
        await self.redis.setex(
            f"url:{short_code}",
            self.redis_ttl,
            url
        )

        # Update local
        self._set_local(short_code, url)

    async def invalidate(self, short_code: str):
        """
        Invalidate on URL deletion or expiration.

        Important: Must invalidate ALL layers to prevent
        serving stale data.
        """
        # Remove from Redis
        await self.redis.delete(f"url:{short_code}")

        # Remove from local
        self.local_cache.pop(short_code, None)

        # Note: Browser/CDN caches cannot be invalidated directly.
        # This is why we use TTLs and consider 301 vs 302 carefully.

    def get_hit_rates(self) -> Dict[str, float]:
        """Calculate cache hit rates for monitoring."""
        total = self.metrics['total_lookups'] or 1
        return {
            'local_hit_rate': self.metrics['local_hits'] / total,
            'redis_hit_rate': self.metrics['redis_hits'] / total,
            'db_hit_rate': self.metrics['db_hits'] / total,
            'overall_cache_hit_rate': (
                self.metrics['local_hits'] + self.metrics['redis_hits']
            ) / total
        }
```

### Handling Cache Stampede

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">

**Cache Stampede Problem**:

When a popular URL's cache expires, thousands of concurrent requests all miss the cache simultaneously and hit the database, potentially causing an outage.

**Scenario**: A viral short URL gets 10,000 requests/second. Cache TTL expires. All 10,000 requests simultaneously query the database.

</div>

```python
import asyncio
from typing import Optional, Dict
import redis.asyncio as redis
import time

class StampedeProtectedCache:
    """
    Cache with stampede protection using multiple strategies.
    """

    def __init__(self, redis_client: redis.Redis):
        self.redis = redis_client
        self._locks: Dict[str, asyncio.Lock] = {}

    async def get_with_single_flight(
        self,
        short_code: str,
        db_fetch_func
    ) -> Optional[str]:
        """
        Single-flight pattern: Only one request fetches from DB,
        others wait for the result.

        Trade-off: Adds latency for waiting requests but protects DB.
        """
        # Try cache first
        cached = await self.redis.get(f"url:{short_code}")
        if cached:
            return cached

        # Get or create lock for this key
        if short_code not in self._locks:
            self._locks[short_code] = asyncio.Lock()

        lock = self._locks[short_code]

        async with lock:
            # Double-check: another request might have populated cache
            cached = await self.redis.get(f"url:{short_code}")
            if cached:
                return cached

            # Fetch from database
            url = await db_fetch_func(short_code)

            if url:
                await self.redis.setex(f"url:{short_code}", 3600, url)

            return url

    async def get_with_probabilistic_refresh(
        self,
        short_code: str,
        db_fetch_func,
        ttl: int = 3600,
        beta: float = 1.0
    ) -> Optional[str]:
        """
        Probabilistic early expiration: Refresh cache before TTL
        to prevent stampede.

        Based on paper: "Optimal Probabilistic Cache Stampede Prevention"

        Formula: refresh if random() < beta * log(time_to_compute) * (1/remaining_ttl)

        As TTL approaches expiration, probability of refresh increases.
        """
        import random
        import math

        # Get value and TTL together
        pipe = self.redis.pipeline()
        pipe.get(f"url:{short_code}")
        pipe.ttl(f"url:{short_code}")
        cached, remaining_ttl = await pipe.execute()

        if cached and remaining_ttl > 0:
            # Probabilistic check for early refresh
            delta = 1.0  # Estimated fetch time in seconds

            if remaining_ttl > 0:
                # Probability increases as TTL decreases
                probability = beta * delta * math.log(random.random()) * -1

                if probability > remaining_ttl:
                    # Trigger early refresh (non-blocking)
                    asyncio.create_task(self._refresh(short_code, db_fetch_func, ttl))

            return cached

        # Cache miss: fetch from DB
        return await self._fetch_and_cache(short_code, db_fetch_func, ttl)

    async def get_with_stale_while_revalidate(
        self,
        short_code: str,
        db_fetch_func,
        fresh_ttl: int = 3600,
        stale_ttl: int = 86400
    ) -> Optional[str]:
        """
        Serve stale data while refreshing in background.

        Stores two TTLs:
        - Fresh TTL: Data is fresh, serve directly
        - Stale TTL: Data is stale but usable, serve while refreshing

        This is similar to HTTP's stale-while-revalidate directive.
        """
        # Check fresh cache
        cached = await self.redis.get(f"url:{short_code}:fresh")
        if cached:
            return cached

        # Check stale cache
        stale = await self.redis.get(f"url:{short_code}:stale")
        if stale:
            # Serve stale, refresh in background
            asyncio.create_task(
                self._refresh_both(short_code, db_fetch_func, fresh_ttl, stale_ttl)
            )
            return stale

        # Complete cache miss
        url = await db_fetch_func(short_code)
        if url:
            await self._set_both(short_code, url, fresh_ttl, stale_ttl)
        return url

    async def _refresh(self, short_code: str, db_fetch_func, ttl: int):
        url = await db_fetch_func(short_code)
        if url:
            await self.redis.setex(f"url:{short_code}", ttl, url)

    async def _fetch_and_cache(self, short_code: str, db_fetch_func, ttl: int):
        url = await db_fetch_func(short_code)
        if url:
            await self.redis.setex(f"url:{short_code}", ttl, url)
        return url

    async def _set_both(self, short_code: str, url: str, fresh_ttl: int, stale_ttl: int):
        pipe = self.redis.pipeline()
        pipe.setex(f"url:{short_code}:fresh", fresh_ttl, url)
        pipe.setex(f"url:{short_code}:stale", stale_ttl, url)
        await pipe.execute()

    async def _refresh_both(
        self,
        short_code: str,
        db_fetch_func,
        fresh_ttl: int,
        stale_ttl: int
    ):
        url = await db_fetch_func(short_code)
        if url:
            await self._set_both(short_code, url, fresh_ttl, stale_ttl)
```

### Cache Consistency in Distributed Systems

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #a855f7;">

**The Consistency Challenge**:

With multiple app servers each having local caches, plus a shared Redis layer:
1. Server A creates short URL, updates its local cache and Redis
2. Server B receives delete request, removes from Redis
3. Server A still has the URL in local cache and serves it

**Solutions**:

| Approach | Consistency | Latency | Complexity |
|----------|-------------|---------|------------|
| Short local TTL | Eventual (seconds) | Best | Low |
| Pub/Sub invalidation | Strong | Good | Medium |
| No local cache | Strong | Worst | Lowest |
| Versioned cache | Strong | Good | High |

</div>

```python
import asyncio
import redis.asyncio as redis

class ConsistentCache:
    """
    Cache with pub/sub invalidation for strong consistency.

    When any server invalidates a key, all servers are notified
    to invalidate their local caches.
    """

    def __init__(self, redis_client: redis.Redis, server_id: str):
        self.redis = redis_client
        self.server_id = server_id
        self.local_cache: Dict[str, str] = {}
        self.pubsub = None

    async def start(self):
        """Start listening for invalidation messages."""
        self.pubsub = self.redis.pubsub()
        await self.pubsub.subscribe('cache_invalidate')

        # Background task to process invalidation messages
        asyncio.create_task(self._process_invalidations())

    async def _process_invalidations(self):
        """Process cache invalidation messages from other servers."""
        async for message in self.pubsub.listen():
            if message['type'] == 'message':
                data = json.loads(message['data'])

                # Ignore messages from self
                if data['server_id'] == self.server_id:
                    continue

                # Invalidate local cache
                short_code = data['short_code']
                self.local_cache.pop(short_code, None)

    async def invalidate(self, short_code: str):
        """
        Invalidate key across all servers.

        Order of operations:
        1. Invalidate local cache
        2. Invalidate Redis
        3. Publish invalidation message

        Other servers will receive the message and invalidate
        their local caches.
        """
        # Local
        self.local_cache.pop(short_code, None)

        # Redis
        await self.redis.delete(f"url:{short_code}")

        # Broadcast to other servers
        await self.redis.publish(
            'cache_invalidate',
            json.dumps({
                'server_id': self.server_id,
                'short_code': short_code,
                'timestamp': time.time()
            })
        )
```

### Interview Questions: Caching Strategy (3 Levels Deep)

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #334155;">

**Level 1**: Why use multiple cache layers (local + Redis) instead of just Redis?

**Level 2**: With local caches on 100 app servers, how would you ensure cache consistency when a URL is deleted? What's the latency vs. consistency trade-off?

**Level 3**: Design a caching system where (a) delete operations are immediately consistent across all servers, (b) reads are as fast as local cache hits, (c) the system degrades gracefully if Redis pub/sub fails, and (d) you can verify consistency for debugging. Consider what happens during network partitions between app servers and Redis.

</div>

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #334155;">

**Level 1**: What is cache stampede and how would you prevent it?

**Level 2**: Your single-flight implementation uses in-memory locks. What happens when the server crashes while holding the lock? How would you make this distributed?

**Level 3**: Design a distributed single-flight implementation that (a) survives server crashes, (b) doesn't hold locks indefinitely, (c) handles the case where the flight leader dies mid-fetch, and (d) provides fair ordering when multiple requests are waiting. Analyze the failure modes and recovery mechanisms.

</div>

<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #334155;">

**Level 1**: How would you determine the optimal cache TTL for a URL shortener?

**Level 2**: Different URLs have different access patterns - some are viral (millions of accesses over 24 hours), some are steady (100/day for years), some are one-time (accessed once then never). How would you optimize caching for each pattern?

**Level 3**: Design an adaptive caching system that (a) automatically learns access patterns per URL, (b) adjusts TTLs dynamically to optimize hit rate vs. memory, (c) pre-warms cache for predictably viral URLs (e.g., shared by influencers), and (d) handles flash crowds without manual intervention. Quantify the memory-performance trade-offs in your design.

</div>

---

## System Architecture Overview

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">

<div style="color: #58a6ff; font-weight: bold; font-size: 18px; margin-bottom: 24px; text-align: center;">Complete URL Shortener Architecture</div>

<div style="display: flex; flex-direction: column; gap: 24px;">

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); padding: 20px; border-radius: 12px;">
<div style="color: #7ee787; font-weight: bold; margin-bottom: 16px;">Write Path (URL Creation)</div>
<div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
<div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 12px;">Client</div>
</div>
<div style="color: #7ee787;">-></div>
<div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 12px;">API Gateway</div>
<div style="color: #9ca3af; font-size: 10px;">Rate Limit</div>
</div>
<div style="color: #7ee787;">-></div>
<div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 12px;">App Server</div>
<div style="color: #9ca3af; font-size: 10px;">Validate + Generate</div>
</div>
<div style="color: #7ee787;">-></div>
<div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 12px;">ID Service</div>
<div style="color: #9ca3af; font-size: 10px;">Snowflake/ZK</div>
</div>
<div style="color: #7ee787;">-></div>
<div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 12px;">Database</div>
<div style="color: #9ca3af; font-size: 10px;">Cassandra</div>
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #3b1f5f 0%, #5a2d7b 100%); padding: 20px; border-radius: 12px;">
<div style="color: #a78bfa; font-weight: bold; margin-bottom: 16px;">Read Path (URL Redirect)</div>
<div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
<div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 12px;">Client</div>
</div>
<div style="color: #a78bfa;">-></div>
<div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 12px;">CDN Edge</div>
<div style="color: #9ca3af; font-size: 10px;">Global PoPs</div>
</div>
<div style="color: #a78bfa;">-></div>
<div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 12px;">Load Balancer</div>
<div style="color: #9ca3af; font-size: 10px;">Geo-routing</div>
</div>
<div style="color: #a78bfa;">-></div>
<div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 12px;">App Server</div>
<div style="color: #9ca3af; font-size: 10px;">Local LRU</div>
</div>
<div style="color: #a78bfa;">-></div>
<div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 12px;">Redis Cluster</div>
<div style="color: #9ca3af; font-size: 10px;">Distributed</div>
</div>
<div style="color: #a78bfa;">-></div>
<div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 12px;">Database</div>
<div style="color: #9ca3af; font-size: 10px;">Replica</div>
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #5f3b1f 0%, #7b5a2d 100%); padding: 20px; border-radius: 12px;">
<div style="color: #fbbf24; font-weight: bold; margin-bottom: 16px;">Analytics Path (Async)</div>
<div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
<div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 12px;">Click Event</div>
</div>
<div style="color: #fbbf24;">-></div>
<div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 12px;">Kafka</div>
<div style="color: #9ca3af; font-size: 10px;">Buffer</div>
</div>
<div style="color: #fbbf24;">-></div>
<div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 12px;">Flink</div>
<div style="color: #9ca3af; font-size: 10px;">Enrich + Aggregate</div>
</div>
<div style="color: #fbbf24;">-></div>
<div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 12px;">Redis</div>
<div style="color: #9ca3af; font-size: 10px;">Real-time</div>
</div>
<div style="color: #fbbf24;">+</div>
<div style="background: rgba(0,0,0,0.3); padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-size: 12px;">Data Lake</div>
<div style="color: #9ca3af; font-size: 10px;">Historical</div>
</div>
</div>
</div>

</div>
</div>

---

## Implementation Reference

### Complete URL Shortener Service

```python
"""
Production-grade URL Shortener Service

This implementation demonstrates key concepts:
1. Multiple ID generation strategies
2. Multi-layer caching with consistency
3. Async analytics tracking
4. Proper error handling and observability
"""

import asyncio
import hashlib
import time
import json
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Optional, Dict, List
from enum import Enum
import string
import threading
from abc import ABC, abstractmethod

# ============= Configuration =============

@dataclass
class Config:
    domain: str = "short.url"
    code_length: int = 7
    default_ttl_days: int = 365
    cache_ttl_seconds: int = 3600
    local_cache_size: int = 10000
    rate_limit_per_minute: int = 100

# ============= Base62 Encoding =============

BASE62_ALPHABET = string.digits + string.ascii_uppercase + string.ascii_lowercase

def encode_base62(num: int) -> str:
    """Encode integer to base62 string."""
    if num == 0:
        return BASE62_ALPHABET[0]

    result = []
    while num > 0:
        result.append(BASE62_ALPHABET[num % 62])
        num //= 62
    return ''.join(reversed(result))

def decode_base62(code: str) -> int:
    """Decode base62 string to integer."""
    num = 0
    for char in code:
        num = num * 62 + BASE62_ALPHABET.index(char)
    return num

# ============= ID Generation Strategies =============

class IDGenerator(ABC):
    @abstractmethod
    def generate(self) -> int:
        pass

class SnowflakeIDGenerator(IDGenerator):
    """Twitter Snowflake-inspired ID generator."""

    EPOCH = 1577836800000  # 2020-01-01
    TIMESTAMP_BITS = 41
    DATACENTER_BITS = 5
    WORKER_BITS = 5
    SEQUENCE_BITS = 12

    def __init__(self, datacenter_id: int, worker_id: int):
        self.datacenter_id = datacenter_id & ((1 << self.DATACENTER_BITS) - 1)
        self.worker_id = worker_id & ((1 << self.WORKER_BITS) - 1)
        self.sequence = 0
        self.last_timestamp = -1
        self._lock = threading.Lock()

    def generate(self) -> int:
        with self._lock:
            timestamp = int(time.time() * 1000)

            if timestamp < self.last_timestamp:
                raise RuntimeError("Clock moved backwards")

            if timestamp == self.last_timestamp:
                self.sequence = (self.sequence + 1) & ((1 << self.SEQUENCE_BITS) - 1)
                if self.sequence == 0:
                    while timestamp <= self.last_timestamp:
                        timestamp = int(time.time() * 1000)
            else:
                self.sequence = 0

            self.last_timestamp = timestamp

            return (
                ((timestamp - self.EPOCH) << (self.DATACENTER_BITS + self.WORKER_BITS + self.SEQUENCE_BITS)) |
                (self.datacenter_id << (self.WORKER_BITS + self.SEQUENCE_BITS)) |
                (self.worker_id << self.SEQUENCE_BITS) |
                self.sequence
            )

class CounterIDGenerator(IDGenerator):
    """Simple counter-based ID generator for single-server setups."""

    def __init__(self, start: int = 100000000):
        self.counter = start
        self._lock = threading.Lock()

    def generate(self) -> int:
        with self._lock:
            self.counter += 1
            return self.counter

# ============= Data Models =============

@dataclass
class URLEntry:
    short_code: str
    original_url: str
    created_at: datetime = field(default_factory=datetime.utcnow)
    expires_at: Optional[datetime] = None
    user_id: Optional[str] = None
    custom_code: bool = False

    def is_expired(self) -> bool:
        if self.expires_at is None:
            return False
        return datetime.utcnow() > self.expires_at

    def to_dict(self) -> dict:
        return {
            'short_code': self.short_code,
            'original_url': self.original_url,
            'created_at': self.created_at.isoformat(),
            'expires_at': self.expires_at.isoformat() if self.expires_at else None,
            'is_expired': self.is_expired()
        }

@dataclass
class ClickEvent:
    short_code: str
    timestamp: datetime
    ip_address: str
    user_agent: str
    referrer: Optional[str] = None

# ============= Storage Interface =============

class URLStorage(ABC):
    @abstractmethod
    async def save(self, entry: URLEntry) -> bool:
        pass

    @abstractmethod
    async def get(self, short_code: str) -> Optional[URLEntry]:
        pass

    @abstractmethod
    async def delete(self, short_code: str) -> bool:
        pass

    @abstractmethod
    async def exists(self, short_code: str) -> bool:
        pass

class InMemoryStorage(URLStorage):
    """In-memory storage for development/testing."""

    def __init__(self):
        self._store: Dict[str, URLEntry] = {}
        self._url_index: Dict[str, str] = {}  # original_url -> short_code

    async def save(self, entry: URLEntry) -> bool:
        self._store[entry.short_code] = entry
        self._url_index[entry.original_url] = entry.short_code
        return True

    async def get(self, short_code: str) -> Optional[URLEntry]:
        return self._store.get(short_code)

    async def delete(self, short_code: str) -> bool:
        entry = self._store.pop(short_code, None)
        if entry:
            self._url_index.pop(entry.original_url, None)
            return True
        return False

    async def exists(self, short_code: str) -> bool:
        return short_code in self._store

    async def get_by_url(self, original_url: str) -> Optional[str]:
        return self._url_index.get(original_url)

# ============= Cache Layer =============

class CacheLayer:
    """Multi-layer cache with LRU local cache."""

    def __init__(self, max_size: int = 10000, ttl_seconds: int = 3600):
        self._cache: Dict[str, tuple] = {}
        self._max_size = max_size
        self._ttl = ttl_seconds
        self._access_order: List[str] = []
        self._lock = threading.Lock()

    def get(self, key: str) -> Optional[str]:
        with self._lock:
            if key not in self._cache:
                return None

            value, timestamp = self._cache[key]

            if time.time() - timestamp > self._ttl:
                self._evict(key)
                return None

            # Update access order for LRU
            if key in self._access_order:
                self._access_order.remove(key)
            self._access_order.append(key)

            return value

    def set(self, key: str, value: str):
        with self._lock:
            # Evict if at capacity
            while len(self._cache) >= self._max_size:
                if self._access_order:
                    oldest = self._access_order.pop(0)
                    self._cache.pop(oldest, None)

            self._cache[key] = (value, time.time())
            self._access_order.append(key)

    def invalidate(self, key: str):
        with self._lock:
            self._evict(key)

    def _evict(self, key: str):
        self._cache.pop(key, None)
        if key in self._access_order:
            self._access_order.remove(key)

# ============= Analytics Collector =============

class AnalyticsCollector:
    """Async analytics collection with batching."""

    def __init__(self, batch_size: int = 100, flush_interval: float = 1.0):
        self._buffer: List[ClickEvent] = []
        self._batch_size = batch_size
        self._flush_interval = flush_interval
        self._lock = threading.Lock()
        self._counters: Dict[str, int] = {}

    def record_click(self, event: ClickEvent):
        """Record click event - non-blocking."""
        with self._lock:
            self._buffer.append(event)

            # Update real-time counter
            self._counters[event.short_code] = \
                self._counters.get(event.short_code, 0) + 1

            if len(self._buffer) >= self._batch_size:
                self._flush()

    def get_click_count(self, short_code: str) -> int:
        return self._counters.get(short_code, 0)

    def _flush(self):
        """Flush buffer to persistent storage."""
        events = self._buffer[:]
        self._buffer = []
        # In production: send to Kafka/data pipeline
        # For now, just log count
        pass

# ============= Main Service =============

class URLShortenerService:
    """
    Complete URL shortening service with all features.
    """

    def __init__(
        self,
        config: Config,
        id_generator: IDGenerator,
        storage: URLStorage,
        cache: CacheLayer,
        analytics: AnalyticsCollector
    ):
        self.config = config
        self.id_generator = id_generator
        self.storage = storage
        self.cache = cache
        self.analytics = analytics

    async def shorten(
        self,
        original_url: str,
        custom_code: Optional[str] = None,
        ttl_days: Optional[int] = None,
        user_id: Optional[str] = None
    ) -> str:
        """
        Create a short URL.

        Returns the full short URL (e.g., https://short.url/abc123)

        Raises ValueError if custom_code is taken.
        """
        # Validate URL
        if not self._is_valid_url(original_url):
            raise ValueError("Invalid URL format")

        # Check for existing mapping (optional deduplication)
        if isinstance(self.storage, InMemoryStorage):
            existing = await self.storage.get_by_url(original_url)
            if existing:
                return f"https://{self.config.domain}/{existing}"

        # Generate or validate code
        if custom_code:
            if await self.storage.exists(custom_code):
                raise ValueError(f"Code '{custom_code}' already exists")
            code = custom_code
        else:
            code = self._generate_code()
            # Handle collision (unlikely but possible)
            attempts = 0
            while await self.storage.exists(code) and attempts < 10:
                code = self._generate_code()
                attempts += 1

        # Calculate expiration
        expires_at = None
        if ttl_days:
            expires_at = datetime.utcnow() + timedelta(days=ttl_days)
        elif self.config.default_ttl_days:
            expires_at = datetime.utcnow() + timedelta(days=self.config.default_ttl_days)

        # Create entry
        entry = URLEntry(
            short_code=code,
            original_url=original_url,
            expires_at=expires_at,
            user_id=user_id,
            custom_code=custom_code is not None
        )

        # Store
        await self.storage.save(entry)

        # Update cache
        self.cache.set(code, original_url)

        return f"https://{self.config.domain}/{code}"

    async def expand(
        self,
        short_code: str,
        record_analytics: bool = True,
        client_ip: str = "",
        user_agent: str = "",
        referrer: str = ""
    ) -> Optional[str]:
        """
        Expand a short code to original URL.

        Returns None if code doesn't exist or is expired.
        """
        # Check cache first
        cached = self.cache.get(short_code)
        if cached:
            if record_analytics:
                self._record_click(short_code, client_ip, user_agent, referrer)
            return cached

        # Check storage
        entry = await self.storage.get(short_code)
        if not entry:
            return None

        # Check expiration
        if entry.is_expired():
            await self.storage.delete(short_code)
            self.cache.invalidate(short_code)
            return None

        # Update cache
        self.cache.set(short_code, entry.original_url)

        # Record analytics
        if record_analytics:
            self._record_click(short_code, client_ip, user_agent, referrer)

        return entry.original_url

    async def delete(self, short_code: str, user_id: Optional[str] = None) -> bool:
        """
        Delete a short URL.

        Returns True if deleted, False if not found.
        """
        entry = await self.storage.get(short_code)
        if not entry:
            return False

        # Authorization check (if user_id provided)
        if user_id and entry.user_id and entry.user_id != user_id:
            raise PermissionError("Not authorized to delete this URL")

        # Delete from storage
        await self.storage.delete(short_code)

        # Invalidate cache
        self.cache.invalidate(short_code)

        return True

    async def get_stats(self, short_code: str) -> Optional[dict]:
        """Get analytics for a short URL."""
        entry = await self.storage.get(short_code)
        if not entry:
            return None

        stats = entry.to_dict()
        stats['total_clicks'] = self.analytics.get_click_count(short_code)

        return stats

    def _generate_code(self) -> str:
        """Generate a new short code."""
        id = self.id_generator.generate()
        code = encode_base62(id)

        # Ensure minimum length
        while len(code) < self.config.code_length:
            code = BASE62_ALPHABET[0] + code

        # Truncate if too long
        return code[:self.config.code_length]

    def _is_valid_url(self, url: str) -> bool:
        """Basic URL validation."""
        return url.startswith(('http://', 'https://'))

    def _record_click(
        self,
        short_code: str,
        ip: str,
        user_agent: str,
        referrer: str
    ):
        """Record click event asynchronously."""
        event = ClickEvent(
            short_code=short_code,
            timestamp=datetime.utcnow(),
            ip_address=ip,
            user_agent=user_agent,
            referrer=referrer
        )
        self.analytics.record_click(event)

# ============= Factory Function =============

def create_url_shortener(
    domain: str = "short.url",
    datacenter_id: int = 0,
    worker_id: int = 0
) -> URLShortenerService:
    """
    Factory function to create a configured URL shortener.
    """
    config = Config(domain=domain)

    return URLShortenerService(
        config=config,
        id_generator=SnowflakeIDGenerator(datacenter_id, worker_id),
        storage=InMemoryStorage(),
        cache=CacheLayer(
            max_size=config.local_cache_size,
            ttl_seconds=config.cache_ttl_seconds
        ),
        analytics=AnalyticsCollector()
    )

# ============= Usage Example =============

async def main():
    # Create service
    service = create_url_shortener("tiny.url")

    # Shorten URLs
    url1 = await service.shorten("https://example.com/very/long/path/to/resource")
    url2 = await service.shorten("https://another.com/page", custom_code="mylink")
    url3 = await service.shorten("https://temp.com/promo", ttl_days=7)

    print(f"Short URL 1: {url1}")
    print(f"Short URL 2: {url2}")
    print(f"Short URL 3 (expires in 7 days): {url3}")

    # Expand URLs
    original = await service.expand("mylink")
    print(f"Original URL: {original}")

    # Get stats
    stats = await service.get_stats("mylink")
    print(f"Stats: {json.dumps(stats, indent=2)}")

if __name__ == "__main__":
    asyncio.run(main())
```

---

## Key Interview Takeaways

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

**What Interviewers Look For**:

1. **Scale estimation**: Start with numbers - 100M URLs, 100:1 read:write ratio, 7-character codes
2. **Trade-off articulation**: Every design choice has consequences - explain them
3. **Distributed systems awareness**: ID generation, cache consistency, analytics pipelines
4. **Edge case handling**: Collisions, clock skew, cache stampede, expiration
5. **Depth on demand**: Be ready to go 3 levels deep on any topic

</div>

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #a855f7;">

**Common Follow-up Questions**:

- How would you prevent malicious URLs? (URL scanning, [[reputation systems]](/topics/security/reputation-systems))
- How to implement [[rate limiting]](/topics/system-design/rate-limiting)? (Token bucket, sliding window)
- How to ensure high availability? ([[replication]](/topics/system-design/replication), [[failover]](/topics/system-design/failover))
- How would you handle a viral link? (Pre-warming, adaptive caching)
- GDPR compliance for analytics? (Anonymization, consent, right to deletion)

</div>

---

## Related Topics

- [[Distributed ID Generation]](/topics/system-design/distributed-id) - Snowflake, ULID, UUID comparison
- [[Caching Strategies]](/topics/system-design/caching) - Write-through, write-behind, cache-aside
- [[Consistent Hashing]](/topics/algorithms/consistent-hashing) - For distributed cache sharding
- [[HyperLogLog]](/topics/algorithms/hyperloglog) - Probabilistic counting for analytics
- [[Rate Limiting]](/topics/system-design/rate-limiting) - Protecting against abuse
- [[CAP Theorem]](/topics/system-design/cap-theorem) - Understanding consistency trade-offs
