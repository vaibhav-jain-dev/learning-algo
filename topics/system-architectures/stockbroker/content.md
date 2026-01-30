# Design a Stockbroker System

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

## Problem Statement

Design a real-time electronic trading platform that enables order execution, market data distribution, trade settlement, and regulatory compliance at institutional scale. This system must handle millions of orders daily with sub-millisecond latency while maintaining absolute consistency for financial transactions.

### Core Technical Challenges
- **Order matching** with price-time priority and deterministic execution
- **Market data distribution** to hundreds of thousands of concurrent subscribers
- **Trade settlement** with T+1/T+2 cycles and counterparty risk management
- **Ultra-low latency** execution paths for competitive advantage
- **Regulatory compliance** with SEC, FINRA, MiFID II audit requirements

</div>

---

## Section 1: Order Matching Engine

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Core Concept: The Heart of Every Exchange

The order matching engine is the central component that receives orders, maintains the order book, and executes trades when buy and sell orders cross. It must be **deterministic** (same inputs always produce same outputs), **fair** (first-in-first-out at each price level), and **fast** (sub-microsecond for competitive exchanges).

<div style="background: rgba(248, 81, 73, 0.1); border: 2px solid #f85149; border-radius: 12px; padding: 20px; margin: 20px 0;">

#### Assumption: Price-Time Priority
The matching engine assumes **price-time priority** (also called FIFO): orders are matched first by best price, then by arrival time at that price level. This is the standard for most regulated exchanges, but alternative models exist (pro-rata for options, size-time for some dark pools).

**Trade-off**: Price-time priority rewards speed, creating an "arms race" for lower latency. This benefits sophisticated traders but may disadvantage retail investors.

</div>

### Internal Mechanism: Order Book Data Structure

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">

<div style="background: rgba(126, 231, 135, 0.1); border: 2px solid #7ee787; border-radius: 12px; padding: 20px;">
<div style="color: #7ee787; font-weight: 700; text-align: center; margin-bottom: 16px;">BID SIDE (Buyers)</div>
<div style="font-family: monospace; font-size: 13px; color: #475569;">
<div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(126, 231, 135, 0.2); border-radius: 4px; margin-bottom: 4px;">
<span>$182.50</span><span>15,000 shares</span><span style="color: #7ee787;">Best Bid</span>
</div>
<div style="display: flex; justify-content: space-between; padding: 8px; margin-bottom: 4px;">
<span>$182.45</span><span>8,200 shares</span><span style="color: #8b949e;">Level 2</span>
</div>
<div style="display: flex; justify-content: space-between; padding: 8px; margin-bottom: 4px;">
<span>$182.40</span><span>25,100 shares</span><span style="color: #8b949e;">Level 3</span>
</div>
<div style="display: flex; justify-content: space-between; padding: 8px;">
<span>$182.35</span><span>12,000 shares</span><span style="color: #8b949e;">Level 4</span>
</div>
</div>
<div style="color: #8b949e; font-size: 12px; margin-top: 12px; text-align: center;">Sorted DESC by price</div>
</div>

<div style="background: rgba(248, 81, 73, 0.1); border: 2px solid #f85149; border-radius: 12px; padding: 20px;">
<div style="color: #f85149; font-weight: 700; text-align: center; margin-bottom: 16px;">ASK SIDE (Sellers)</div>
<div style="font-family: monospace; font-size: 13px; color: #475569;">
<div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(248, 81, 73, 0.2); border-radius: 4px; margin-bottom: 4px;">
<span>$182.55</span><span>10,500 shares</span><span style="color: #f85149;">Best Ask</span>
</div>
<div style="display: flex; justify-content: space-between; padding: 8px; margin-bottom: 4px;">
<span>$182.60</span><span>20,300 shares</span><span style="color: #8b949e;">Level 2</span>
</div>
<div style="display: flex; justify-content: space-between; padding: 8px; margin-bottom: 4px;">
<span>$182.65</span><span>5,800 shares</span><span style="color: #8b949e;">Level 3</span>
</div>
<div style="display: flex; justify-content: space-between; padding: 8px;">
<span>$182.70</span><span>18,200 shares</span><span style="color: #8b949e;">Level 4</span>
</div>
</div>
<div style="color: #8b949e; font-size: 12px; margin-top: 12px; text-align: center;">Sorted ASC by price</div>
</div>

</div>

<div style="text-align: center; margin-top: 20px; padding: 16px; background: rgba(137, 87, 229, 0.1); border-radius: 8px;">
<span style="color: #a371f7; font-weight: 600;">Spread: $0.05 (Best Ask - Best Bid)</span>
</div>

</div>

### Implementation: Optimal Data Structures

The choice of data structure directly impacts matching latency. See [[data-structures]](/topics/data-structures) for fundamentals.

<div style="background: #21262d; border-radius: 12px; padding: 20px; margin: 20px 0;">

**For each price level:**
- **Red-Black Tree / AVL Tree**: O(log n) insert, delete, lookup for price levels
- At each node: **Doubly-linked list** of orders (FIFO queue) for time priority

**Why not a hash map?**
We need **sorted iteration** to find best bid/ask and to match across multiple price levels. Hash maps are O(n) for finding minimum/maximum.

**Why not a sorted array?**
Insert/delete is O(n) due to shifting elements. With 10,000 price levels and 100,000 operations/second, this becomes a bottleneck.

```python
# Conceptual structure (not production code)
class OrderBook:
    def __init__(self):
        self.bids = RedBlackTree()  # Key: -price (negative for DESC sort)
        self.asks = RedBlackTree()  # Key: price (ASC sort)

    def add_order(self, order):
        tree = self.bids if order.side == BUY else self.asks
        price_level = tree.get_or_create(order.price)
        price_level.queue.append(order)  # O(1) append to linked list

    def match(self):
        while self.bids.max() and self.asks.min():
            best_bid = self.bids.max()
            best_ask = self.asks.min()
            if best_bid.price >= best_ask.price:
                execute_trade(best_bid.queue[0], best_ask.queue[0])
            else:
                break  # No crossing orders
```

</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 2px solid #f0883e; border-radius: 12px; padding: 20px; margin: 20px 0;">

#### Design Choice: In-Memory vs Persistent Order Book

**Production systems keep the order book entirely in memory** for two reasons:

1. **Latency**: Memory access is ~100ns, SSD is ~100,000ns, spinning disk is ~10,000,000ns
2. **Volatility**: Orders are cancelled or filled within seconds; persisting each state change would overwhelm any storage system

**Durability is achieved through [[event-sourcing]](/topics/system-design/event-sourcing)**: Every order add/cancel/modify is logged to a [[write-ahead-log]](/topics/databases/wal) (WAL). On restart, replay the log to rebuild order book state.

</div>

### Edge Cases in Order Matching

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 20px 0;">

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 16px;">
<div style="color: #f85149; font-weight: 600; margin-bottom: 8px;">Self-Trade Prevention</div>
<div style="color: #8b949e; font-size: 13px;">When the same firm has orders on both sides that would match, the system must prevent this (wash trading is illegal). Options: cancel newest order, cancel oldest order, or cancel both.</div>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 16px;">
<div style="color: #7ee787; font-weight: 600; margin-bottom: 8px;">Odd Lot Handling</div>
<div style="color: #8b949e; font-size: 13px;">Orders below the standard lot size (typically 100 shares) may have different matching priority. Some exchanges don't display them in the public order book.</div>
</div>

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 16px;">
<div style="color: #a371f7; font-weight: 600; margin-bottom: 8px;">Minimum Execution Quantity</div>
<div style="color: #8b949e; font-size: 13px;">Some orders specify "fill at least 500 shares or nothing." The engine must check if sufficient liquidity exists before partially filling.</div>
</div>

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 16px;">
<div style="color: #58a6ff; font-weight: 600; margin-bottom: 8px;">Price Improvement</div>
<div style="color: #8b949e; font-size: 13px;">A market buy order might get filled at a better price than expected if a new sell order arrives at a lower price during processing. Must handle atomically.</div>
</div>

</div>

### 3-Level Recursive Interview Questions: Matching Engine

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f85149;">

#### Level 1: "How does an order matching engine work?"

**Expected Answer**: The matching engine maintains an order book with bids sorted descending by price and asks sorted ascending. When a new order arrives, it checks if the order can match (buy price >= best ask, or sell price <= best bid). If so, it executes trades at the passive order's price, removing filled orders from the book. Unmatched portions are added to the book.

<div style="background: rgba(88, 166, 255, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

##### Level 2: "What happens when a market order arrives that exceeds available liquidity?"

**Expected Answer**: The order "walks the book," filling against multiple price levels until either:
1. The order is completely filled
2. The book is exhausted (no more contra-side orders)
3. A price limit is reached (some market orders have hidden price collars)

For case 2, the remaining quantity is typically cancelled (not added to book, since it has no price). This can cause significant price impact during low liquidity periods.

<div style="background: rgba(137, 87, 229, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

###### Level 3: "How do you prevent a single large market order from crashing the price?"

**Expected Answer**: Multiple mechanisms:

1. **Circuit breakers**: Halt trading if price moves >X% in Y minutes (see [[circuit-breakers]](/topics/system-design/circuit-breaker))
2. **Limit-up/Limit-down (LULD)**: Orders outside price bands are rejected
3. **Volatility auctions**: Switch from continuous matching to periodic auction mode
4. **Order collars**: Silently convert market orders to limit orders at X% from last trade

**Real-world example**: The May 6, 2010 "Flash Crash" caused Accenture to trade at $0.01 because market orders exhausted the book. This led to SEC Rule 201 (circuit breakers) and LULD implementation.

</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #58a6ff;">

#### Level 1: "Why use a Red-Black tree instead of other data structures?"

**Expected Answer**: Red-Black trees provide O(log n) insert, delete, and lookup while maintaining sorted order. We need sorted order to find best bid/ask (O(1) with pointer to min/max) and to iterate through price levels during matching.

<div style="background: rgba(88, 166, 255, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

##### Level 2: "NASDAQ's matching engine reportedly achieves sub-microsecond latency. How is that possible with O(log n) operations?"

**Expected Answer**: Several optimizations:

1. **Fixed price levels**: For heavily traded symbols, pre-allocate array slots for each tick (e.g., $0.01 increments from $0-$10,000). This converts O(log n) tree lookup to O(1) array index.
2. **LMAX Disruptor pattern**: Lock-free ring buffer with single-writer principle eliminates mutex overhead
3. **Kernel bypass**: DPDK or RDMA to receive network packets directly in user space
4. **CPU pinning**: Dedicate specific CPU cores to matching thread, disable hyperthreading

<div style="background: rgba(137, 87, 229, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

###### Level 3: "What is 'mechanical sympathy' and how does it apply to matching engine design?"

**Expected Answer**: Mechanical sympathy means designing software that works harmoniously with hardware characteristics:

1. **Cache line alignment**: Order structs are 64 bytes (one cache line) to prevent false sharing
2. **Sequential access**: Process orders in ring buffer order; CPU prefetcher predicts next access
3. **Branch prediction**: Matching logic has predictable branches; avoid data-dependent conditionals
4. **Memory allocation**: Pre-allocate all memory at startup; avoid malloc/free during trading
5. **NUMA awareness**: Keep data on same NUMA node as processing thread

**Concrete impact**: A cache miss costs ~100 cycles. At 3GHz, that's 33ns per miss. With 100K orders/second, cache misses alone could add 3.3 seconds of cumulative delay per second if not optimized.

</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #7ee787;">

#### Level 1: "How do you handle matching engine failures?"

**Expected Answer**: Use [[event-sourcing]](/topics/system-design/event-sourcing) where every order is written to a durable log before acknowledgment. On failure, a standby engine replays the log to rebuild state. Failover typically takes 1-5 seconds.

<div style="background: rgba(88, 166, 255, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

##### Level 2: "What is the consistency model during failover? Can orders be lost or duplicated?"

**Expected Answer**:

**Lost orders**: Possible if using async replication. Solution: Synchronous replication to standby before acknowledging to client (increases latency by ~1ms but guarantees durability).

**Duplicate execution**: Prevented through idempotency keys. Each order has a unique ID; before processing, check if this ID was already processed. Use a bloom filter for fast negative lookups, with full database check on positive hits.

<div style="background: rgba(137, 87, 229, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

###### Level 3: "How does your matching engine maintain deterministic ordering across failover when orders arrive from multiple network paths?"

**Expected Answer**: This is the **sequence number gap** problem. Solution:

1. **Gateway sequencer**: Single point that assigns global sequence numbers to all orders before forwarding to matching engine
2. **Lamport timestamps**: Logical clocks that establish happened-before relationship
3. **Hybrid approach**: Use wall-clock time as primary sort, sequence number as tiebreaker

**Critical insight**: The gateway sequencer becomes a single point of failure. Use [[Raft]](/topics/system-design/raft-consensus) or [[Paxos]](/topics/system-design/paxos) for leader election with sub-second failover. Accept that during leader election (~500ms), no new orders can be accepted.

**Trade-off accepted**: Brief unavailability is acceptable; inconsistent matching is not. This is a CP system in [[CAP theorem]](/topics/system-design/cap-theorem) terms.

</div>
</div>
</div>

</div>

---

## Section 2: Market Data Feeds

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Core Concept: Publishing Price Information

Market data feeds distribute real-time price information to subscribers. This includes:
- **Level 1 (L1)**: Best bid, best ask, last trade price
- **Level 2 (L2)**: Top N price levels with aggregate quantities
- **Level 3 (L3)**: Full order book with individual order details

<div style="background: rgba(137, 87, 229, 0.1); border: 2px solid #a371f7; border-radius: 12px; padding: 20px; margin: 20px 0;">

#### Assumption: Eventual Consistency is Acceptable
Unlike order execution (which requires strong consistency), market data display can tolerate brief inconsistency. If a user sees a price that's 50ms stale, it's acceptable. This assumption enables aggressive caching and [[eventual-consistency]](/topics/system-design/eventual-consistency) patterns.

**Trade-off**: Traders may submit orders based on stale prices, leading to rejections or unexpected fills. Mitigated by requiring limit prices on all orders.

</div>

### Internal Mechanism: Multicast Distribution

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="display: flex; align-items: center; gap: 20px;">
<div style="background: #f85149; min-width: 120px; padding: 16px; border-radius: 8px; text-align: center;">
<div style="color: white; font-weight: 700;">Matching Engine</div>
</div>
<div style="color: #58a6ff; font-size: 24px;">&#8594;</div>
<div style="background: #8957e5; min-width: 140px; padding: 16px; border-radius: 8px; text-align: center;">
<div style="color: white; font-weight: 700;">Market Data Gateway</div>
<div style="color: rgba(255,255,255,0.7); font-size: 11px;">Normalizes, sequences</div>
</div>
</div>

<div style="display: flex; justify-content: center;">
<div style="color: #a371f7; font-size: 24px;">&#8595;</div>
</div>

<div style="display: flex; justify-content: center;">
<div style="background: rgba(137, 87, 229, 0.2); border: 2px solid #a371f7; padding: 16px 40px; border-radius: 8px; text-align: center;">
<div style="color: #a371f7; font-weight: 700;">UDP Multicast</div>
<div style="color: #8b949e; font-size: 12px;">239.255.0.0/16</div>
</div>
</div>

<div style="display: flex; justify-content: center; gap: 20px;">
<div style="color: #a371f7; font-size: 24px;">&#8601;</div>
<div style="color: #a371f7; font-size: 24px;">&#8595;</div>
<div style="color: #a371f7; font-size: 24px;">&#8600;</div>
</div>

<div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
<div style="background: #21262d; border: 2px solid #7ee787; padding: 16px; border-radius: 8px; text-align: center; min-width: 100px;">
<div style="color: #7ee787; font-weight: 600;">Subscriber 1</div>
<div style="color: #8b949e; font-size: 11px;">HFT Firm</div>
</div>
<div style="background: #21262d; border: 2px solid #58a6ff; padding: 16px; border-radius: 8px; text-align: center; min-width: 100px;">
<div style="color: #58a6ff; font-weight: 600;">Subscriber 2</div>
<div style="color: #8b949e; font-size: 11px;">Retail Broker</div>
</div>
<div style="background: #21262d; border: 2px solid #f0883e; padding: 16px; border-radius: 8px; text-align: center; min-width: 100px;">
<div style="color: #f0883e; font-weight: 600;">Subscriber 3</div>
<div style="color: #8b949e; font-size: 11px;">Data Vendor</div>
</div>
</div>

</div>

</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 2px solid #f0883e; border-radius: 12px; padding: 20px; margin: 20px 0;">

#### Design Choice: UDP Multicast vs WebSocket

| Aspect | UDP Multicast | WebSocket |
|--------|--------------|-----------|
| **Latency** | ~10 microseconds | ~1-10 milliseconds |
| **Scalability** | 1 packet serves unlimited subscribers | 1 connection per subscriber |
| **Reliability** | None (must implement own) | TCP guarantees delivery |
| **Use case** | Co-located HFT firms | Retail web clients |

**Production systems use both**: UDP multicast for professional traders in the same data center, WebSocket (via [[api-gateway]](/topics/system-design/api-gateway)) for retail clients over the internet.

</div>

### Handling Packet Loss in UDP Feeds

UDP is unreliable by design. Market data systems implement their own reliability layer:

<div style="background: #21262d; border-radius: 12px; padding: 20px; margin: 20px 0;">

```python
class MarketDataReceiver:
    def __init__(self):
        self.expected_seq = 0
        self.buffer = {}  # Out-of-order buffer
        self.gap_start = None

    def on_packet(self, packet):
        if packet.seq == self.expected_seq:
            self.process(packet)
            self.expected_seq += 1
            self.drain_buffer()
        elif packet.seq > self.expected_seq:
            # Gap detected - buffer this packet
            self.buffer[packet.seq] = packet
            if not self.gap_start:
                self.gap_start = time.now()
                self.request_retransmit(self.expected_seq, packet.seq - 1)
        # packet.seq < expected_seq: duplicate, ignore

    def drain_buffer(self):
        while self.expected_seq in self.buffer:
            self.process(self.buffer.pop(self.expected_seq))
            self.expected_seq += 1
        if not self.buffer:
            self.gap_start = None
```

**Gap recovery**: Subscriber sends unicast request to exchange for missing sequence numbers. Exchange maintains a **retransmission buffer** (typically 30-60 seconds of messages).

</div>

### 3-Level Recursive Interview Questions: Market Data

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f85149;">

#### Level 1: "How would you design a system to distribute market data to 100,000 concurrent users?"

**Expected Answer**: Use a tiered architecture. Matching engine publishes to market data gateway. Gateway fans out via UDP multicast for co-located clients and Kafka for geographic distribution. Regional servers subscribe to Kafka and maintain WebSocket connections to end users. Use [[pub-sub]](/topics/system-design/pub-sub) pattern.

<div style="background: rgba(88, 166, 255, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

##### Level 2: "What happens during a market open when every stock's price updates simultaneously?"

**Expected Answer**: This is the **thundering herd** problem. At 9:30 AM market open:
- ~8,000 stocks have opening auctions
- Each produces 10-100 messages (trades, quote updates)
- Total: 800,000+ messages in the first second

**Solutions**:
1. **Batching**: Aggregate multiple updates into single network packet (up to MTU ~1500 bytes)
2. **Conflation**: If symbol updates twice before subscriber processes first update, send only latest
3. **Subscription filtering**: Client subscribes only to symbols they care about; server filters at source
4. **Throttling**: Rate limit per-subscriber updates (e.g., 10 updates/second for retail)

<div style="background: rgba(137, 87, 229, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

###### Level 3: "How do you ensure market data fairness when some subscribers are faster than others?"

**Expected Answer**: This is a regulatory requirement (SEC Regulation NMS, MiFID II). Solutions:

1. **Intentional latency (speed bumps)**: IEX adds 350 microsecond delay to all orders, negating speed advantages
2. **Synchronized release**: Hold messages until wall-clock time X, then release simultaneously
3. **Randomized delays**: Add random 0-100 microsecond delay to prevent systematic advantage
4. **Physical distance parity**: Ensure all co-located cabinets have equal cable length to exchange

**The ethical dilemma**: Exchanges profit from selling co-location and low-latency feeds to HFT firms. Strict fairness would eliminate this revenue. Regulators have allowed "fair access" (everyone CAN buy the fast feed) rather than "equal access" (everyone gets the same speed).

</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #58a6ff;">

#### Level 1: "Why do exchanges charge for market data?"

**Expected Answer**: Market data is a significant revenue source. NYSE made $533M in market data revenue in 2022. They charge for access (connection fees), bandwidth (messages/second), and depth (L1 vs L2 vs L3). This creates a tiered system where professional traders pay more.

<div style="background: rgba(88, 166, 255, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

##### Level 2: "How does the consolidated tape (SIP) work and why does it exist?"

**Expected Answer**: A stock like AAPL trades on 16+ exchanges simultaneously. The Securities Information Processor (SIP) consolidates quotes from all exchanges into a single feed showing the National Best Bid and Offer (NBBO).

**Why it exists**: Regulation NMS requires brokers to execute at the best price across ALL exchanges. Without SIP, each broker would need direct feeds from all 16 exchanges.

**Latency implication**: SIP adds ~500 microseconds of latency. HFT firms subscribe to all direct feeds AND the SIP, using the direct feeds for trading and SIP for compliance documentation.

<div style="background: rgba(137, 87, 229, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

###### Level 3: "What is latency arbitrage and how do market data delays enable it?"

**Expected Answer**: Latency arbitrage exploits the time difference between when a price change occurs and when different participants learn about it.

**Example**:
- 10:00:00.000000: AAPL bid on NYSE changes from $182.50 to $182.55
- 10:00:00.000050: HFT firm sees this via direct feed
- 10:00:00.000500: SIP reflects the change
- 10:00:00.000500: Retail broker sees new price

During that 450-microsecond window, the HFT firm can:
1. Buy at $182.50 on NASDAQ (which hasn't updated yet)
2. Immediately sell at $182.55 on NYSE
3. Profit: $0.05/share, risk-free

**Scale**: With millions of such opportunities daily, this adds up to significant profits extracted from slower participants. Critics call it a "tax" on retail investors.

</div>
</div>
</div>

</div>

---

## Section 3: Trade Settlement

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Core Concept: From Trade to Transfer

Settlement is the process of transferring ownership of securities and cash between buyer and seller after a trade executes. In the US, equities settle T+1 (trade date plus one business day). This delay exists for operational and risk management reasons.

<div style="background: rgba(248, 81, 73, 0.1); border: 2px solid #f85149; border-radius: 12px; padding: 20px; margin: 20px 0;">

#### Assumption: Central Counterparty (CCP) Clearing
Modern settlement assumes a central clearing house (like DTCC in the US) acts as counterparty to both sides of every trade. Buyer sees CCP as seller; seller sees CCP as buyer. This **novation** eliminates bilateral counterparty risk.

**Trade-off**: CCP concentration creates systemic risk. If the CCP fails, the entire market freezes. Mitigated through massive capital requirements and government backing.

</div>

### Internal Mechanism: Settlement Lifecycle

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

<div style="display: flex; flex-direction: column; gap: 12px;">

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #238636; min-width: 80px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
<span style="color: white; font-weight: 700;">T</span>
</div>
<div style="flex: 1; background: rgba(35, 134, 54, 0.2); border-radius: 8px; padding: 12px;">
<div style="color: #7ee787; font-weight: 600;">Trade Execution</div>
<div style="color: #8b949e; font-size: 13px;">Matching engine executes trade. Both parties receive execution report. Trade is "locked in" but not yet settled.</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #1f6feb; min-width: 80px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
<span style="color: white; font-weight: 700;">T+0</span>
</div>
<div style="flex: 1; background: rgba(31, 111, 235, 0.2); border-radius: 8px; padding: 12px;">
<div style="color: #58a6ff; font-weight: 600;">Trade Capture & Matching</div>
<div style="color: #8b949e; font-size: 13px;">Both brokers submit trade details to clearing house. System validates both sides agree on terms (symbol, quantity, price). Discrepancies flagged for manual resolution.</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #8957e5; min-width: 80px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
<span style="color: white; font-weight: 700;">T+0</span>
</div>
<div style="flex: 1; background: rgba(137, 87, 229, 0.2); border-radius: 8px; padding: 12px;">
<div style="color: #a371f7; font-weight: 600;">Novation</div>
<div style="color: #8b949e; font-size: 13px;">CCP becomes counterparty. Original trade (Broker A ↔ Broker B) becomes two trades: (Broker A ↔ CCP) and (CCP ↔ Broker B).</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f0883e; min-width: 80px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
<span style="color: white; font-weight: 700;">T+0</span>
</div>
<div style="flex: 1; background: rgba(240, 136, 62, 0.2); border-radius: 8px; padding: 12px;">
<div style="color: #f0883e; font-weight: 600;">Netting</div>
<div style="color: #8b949e; font-size: 13px;">If Broker A bought 1000 AAPL and sold 800 AAPL today, net obligation is receive 200 AAPL. Reduces settlement volume by ~98%.</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f85149; min-width: 80px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
<span style="color: white; font-weight: 700;">T+1</span>
</div>
<div style="flex: 1; background: rgba(248, 81, 73, 0.2); border-radius: 8px; padding: 12px;">
<div style="color: #f85149; font-weight: 600;">Settlement</div>
<div style="color: #8b949e; font-size: 13px;">DVP (Delivery vs Payment): Securities and cash move simultaneously. Buyer's account credited with shares, debited cash. Seller opposite. This is the moment of legal ownership transfer.</div>
</div>
</div>

</div>

</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 2px solid #f0883e; border-radius: 12px; padding: 20px; margin: 20px 0;">

#### Design Choice: Why Not Settle Instantly?

Theoretically, blockchain-based systems could enable T+0 settlement. Why doesn't the industry adopt this?

1. **Netting efficiency**: T+1 allows end-of-day netting, reducing actual transfers by 98%. Instant settlement means every trade moves full amounts.
2. **Funding requirements**: Brokers need cash/securities on hand before trade, not after. This requires 10x more capital.
3. **Error correction**: 24-hour window allows catching and fixing errors before finality
4. **Time zone differences**: Global participants need time to fund accounts from different banking systems
5. **Legacy integration**: 50+ years of infrastructure assumes T+1; changing would require coordinated global effort

</div>

### Failure Scenarios in Settlement

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 20px 0;">

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 16px;">
<div style="color: #f85149; font-weight: 600; margin-bottom: 8px;">Fail to Deliver (FTD)</div>
<div style="color: #8b949e; font-size: 13px;">Seller doesn't have securities to deliver. CCP may: (1) buy shares in market and charge seller, (2) defer settlement with penalty interest, (3) initiate buy-in procedure forcing delivery.</div>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 16px;">
<div style="color: #7ee787; font-weight: 600; margin-bottom: 8px;">Fail to Pay</div>
<div style="color: #8b949e; font-size: 13px;">Buyer doesn't have cash. Similar remedies apply. CCP's guarantee fund covers shortfall initially; defaulting party pays penalties and may lose membership.</div>
</div>

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 16px;">
<div style="color: #a371f7; font-weight: 600; margin-bottom: 8px;">Corporate Action During Settlement</div>
<div style="color: #8b949e; font-size: 13px;">Stock splits or dividends between trade and settlement dates create complexity. "Ex-date" rules determine who receives the benefit.</div>
</div>

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 16px;">
<div style="color: #58a6ff; font-weight: 600; margin-bottom: 8px;">Broker Default</div>
<div style="color: #8b949e; font-size: 13px;">If a broker becomes insolvent mid-settlement, customer assets are protected (SIPC insurance up to $500K), but settlement may be delayed while positions are transferred to another broker.</div>
</div>

</div>

### 3-Level Recursive Interview Questions: Settlement

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f85149;">

#### Level 1: "What is T+1 settlement and why does it exist?"

**Expected Answer**: T+1 means trades settle one business day after execution. It exists to allow time for trade matching, netting, error correction, and funding. The industry recently moved from T+2 to T+1 (May 2024 in US) to reduce counterparty risk.

<div style="background: rgba(88, 166, 255, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

##### Level 2: "How does netting reduce settlement risk and what's the efficiency gain?"

**Expected Answer**: Netting offsets opposing obligations. Example:
- Broker trades 10M shares total in a day
- After netting: only 200K shares actually need to move
- Efficiency: 98% reduction in settlement volume

**Types of netting**:
1. **Bilateral**: Between two specific parties
2. **Multilateral**: Across all participants via CCP
3. **Payment netting**: Only net cash flows
4. **Close-out netting**: In default scenarios, all positions reduced to single payment

Risk reduction: Instead of $10M in gross exposure, only $200K in net exposure needs collateralization.

<div style="background: rgba(137, 87, 229, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

###### Level 3: "What happens to pending settlements if a major broker defaults?"

**Expected Answer**: This is the **Lehman moment** scenario. CCP has multiple layers of protection:

1. **Defaulter's margin**: Collateral already posted by the failing member
2. **Defaulter's guarantee fund contribution**: Pre-funded loss absorption
3. **CCP's own capital**: "Skin in the game"
4. **Non-defaulting members' guarantee fund**: Mutualized loss sharing
5. **Additional assessments**: CCP can demand more from surviving members
6. **Central bank support**: In extreme scenarios, government backstop

**Real example**: When Lehman Brothers failed in 2008, LCH.Clearnet (the CCP) managed to close out $9 trillion in positions within 3 weeks using these mechanisms. No non-defaulting member lost money.

**The systemic risk concern**: All risk concentrates in CCPs. If a CCP fails, the entire financial system locks up. This is why CCPs are designated as "Systemically Important Financial Market Utilities" and subject to enhanced regulation.

</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #58a6ff;">

#### Level 1: "What is DVP and why is it important?"

**Expected Answer**: Delivery versus Payment (DVP) means securities and cash move simultaneously and conditionally. Neither party is exposed to the risk of delivering their side without receiving the other. This is the fundamental principle preventing settlement failures.

<div style="background: rgba(88, 166, 255, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

##### Level 2: "How would you implement DVP in a distributed system?"

**Expected Answer**: This is a [[two-phase commit]](/topics/system-design/2pc) problem:

**Phase 1 (Prepare)**:
- Lock buyer's cash account (verify funds, prevent withdrawal)
- Lock seller's security account (verify shares, prevent transfer)
- Both systems respond "ready" or "abort"

**Phase 2 (Commit)**:
- If both ready: execute both transfers atomically
- If either aborts: release both locks, transaction fails

**Challenge**: Cross-system atomicity. Cash might be at one bank, securities at another depository. Solution: Use a trusted coordinator (the CCP) that has authority over both systems.

<div style="background: rgba(137, 87, 229, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

###### Level 3: "What are the CAP theorem implications for settlement systems?"

**Expected Answer**: Settlement systems are **CP** (Consistent, Partition-tolerant, sacrificing Availability):

**Consistency is non-negotiable**: Double-spending or phantom securities would destroy market integrity. Every participant must see the same state.

**Availability is sacrificed**: If connectivity to the CCP is lost, new settlements cannot occur. This is acceptable because:
1. Settlement happens in batch windows, not real-time
2. Brief delays (minutes to hours) don't affect already-executed trades
3. Human operators can intervene during extended outages

**Partition handling**: During network partition, the system halts rather than risking inconsistency. This is why settlement has fixed "cutoff times" - the window is defined, and anything outside the window waits for the next day.

**Alternative view**: Some argue settlement should be **AP** during the day (allow optimistic settlement) and reconcile to **CP** at end of day. This increases throughput but requires robust error correction.

</div>
</div>
</div>

</div>

---

## Section 4: Latency Optimization

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Core Concept: The Speed Arms Race

In electronic trading, latency directly translates to profitability. A 1-millisecond advantage can mean capturing favorable prices before competitors. Modern HFT systems target single-digit microsecond latency.

<div style="background: rgba(248, 81, 73, 0.1); border: 2px solid #f85149; border-radius: 12px; padding: 20px; margin: 20px 0;">

#### Assumption: Latency Investment Has Diminishing Returns
Each microsecond of improvement costs exponentially more to achieve. Going from 1ms to 100us might cost $1M; going from 100us to 10us might cost $10M. At some point, the edge is too small to recoup the investment.

**Trade-off**: Resources spent on latency could be spent on better trading strategies. The optimal allocation depends on the competitive landscape.

</div>

### Latency Breakdown by Component

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

<div style="display: flex; flex-direction: column; gap: 8px;">

<div style="display: grid; grid-template-columns: 200px 100px 1fr; align-items: center; gap: 16px; padding: 12px; background: rgba(248, 81, 73, 0.1); border-radius: 8px;">
<div style="color: #f85149; font-weight: 600;">Network (cross-country)</div>
<div style="color: #f85149; font-weight: 700;">~20,000 us</div>
<div style="height: 8px; background: #f85149; border-radius: 4px;"></div>
</div>

<div style="display: grid; grid-template-columns: 200px 100px 1fr; align-items: center; gap: 16px; padding: 12px; background: rgba(240, 136, 62, 0.1); border-radius: 8px;">
<div style="color: #f0883e; font-weight: 600;">Network (co-located)</div>
<div style="color: #f0883e; font-weight: 700;">~5-50 us</div>
<div style="height: 8px; background: #f0883e; border-radius: 4px; width: 2%;"></div>
</div>

<div style="display: grid; grid-template-columns: 200px 100px 1fr; align-items: center; gap: 16px; padding: 12px; background: rgba(137, 87, 229, 0.1); border-radius: 8px;">
<div style="color: #a371f7; font-weight: 600;">Kernel network stack</div>
<div style="color: #a371f7; font-weight: 700;">~10-50 us</div>
<div style="height: 8px; background: #a371f7; border-radius: 4px; width: 2%;"></div>
</div>

<div style="display: grid; grid-template-columns: 200px 100px 1fr; align-items: center; gap: 16px; padding: 12px; background: rgba(88, 166, 255, 0.1); border-radius: 8px;">
<div style="color: #58a6ff; font-weight: 600;">Application processing</div>
<div style="color: #58a6ff; font-weight: 700;">~1-10 us</div>
<div style="height: 8px; background: #58a6ff; border-radius: 4px; width: 0.5%;"></div>
</div>

<div style="display: grid; grid-template-columns: 200px 100px 1fr; align-items: center; gap: 16px; padding: 12px; background: rgba(126, 231, 135, 0.1); border-radius: 8px;">
<div style="color: #7ee787; font-weight: 600;">Memory access (cache hit)</div>
<div style="color: #7ee787; font-weight: 700;">~0.0004 us</div>
<div style="height: 8px; background: #7ee787; border-radius: 4px; width: 0.01%;"></div>
</div>

</div>

<div style="text-align: center; margin-top: 20px; padding: 16px; background: rgba(248, 81, 73, 0.1); border-radius: 8px;">
<span style="color: #f85149; font-weight: 600;">Key Insight: Network is the dominant factor. Co-location eliminates the biggest variable.</span>
</div>

</div>

### Optimization Techniques by Layer

<div style="background: #21262d; border-radius: 12px; padding: 20px; margin: 20px 0;">

**1. Physical Layer**
- **Co-location**: Rent rack space in exchange's data center (~$10K-$100K/month)
- **Cross-connects**: Direct fiber to exchange's matching engine (eliminate public internet)
- **Microwave/Laser**: For cross-data-center links (speed of light in air > fiber)

**2. Network Layer**
- **DPDK (Data Plane Development Kit)**: Bypass kernel, poll NIC directly in user space
- **RDMA**: Remote Direct Memory Access for zero-copy network transfers
- **Solarflare/Mellanox NICs**: Hardware timestamping, kernel bypass support
- **FPGA-based NICs**: Implement trading logic directly in network card

**3. Operating System**
- **CPU isolation**: `isolcpus` kernel parameter to prevent scheduler interference
- **NUMA pinning**: Keep process and its memory on same CPU socket
- **Huge pages**: 2MB pages reduce TLB misses
- **Disable hyperthreading**: Prevents cache thrashing between siblings

**4. Application**
- **Lock-free data structures**: [[CAS]](/topics/concurrency/compare-and-swap) operations instead of mutexes
- **Object pooling**: Pre-allocate all objects; never malloc during trading
- **Busy polling**: Spin on CPU rather than blocking on I/O
- **JIT warmup**: For Java/JVM, pre-warm code paths before market open

</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 2px solid #f0883e; border-radius: 12px; padding: 20px; margin: 20px 0;">

#### Design Choice: FPGA vs Software

| Aspect | FPGA | Software (C++) |
|--------|------|----------------|
| **Latency** | ~1 microsecond | ~10 microseconds |
| **Development cost** | $1M+ per strategy | $100K+ per strategy |
| **Flexibility** | Weeks to change | Hours to change |
| **Expertise needed** | Hardware engineers | Software engineers |
| **Power consumption** | ~50W | ~200W |

**When FPGA wins**: High-frequency strategies where being first matters (market making, arbitrage). The 9us advantage is worth the development cost.

**When software wins**: Complex strategies with many conditional branches, frequent updates, or where 10us is "fast enough" (most institutional trading).

</div>

### 3-Level Recursive Interview Questions: Latency

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f85149;">

#### Level 1: "How would you reduce order submission latency from 10ms to 1ms?"

**Expected Answer**: Profile to find bottlenecks. Typically:
1. Move to co-located servers (eliminates network transit time)
2. Use persistent connections (avoid TCP handshake per request)
3. Switch from JSON to binary protocol (FIX or custom)
4. Use connection pooling for database
5. Cache frequently accessed data in memory

<div style="background: rgba(88, 166, 255, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

##### Level 2: "We're already co-located but competitors are 5us faster. What's left to optimize?"

**Expected Answer**: At this level, focus shifts to determinism over raw speed:

1. **Kernel bypass**: DPDK eliminates ~30us of kernel networking overhead
2. **CPU pinning + isolation**: Guarantees your thread runs without interruption
3. **Memory pre-touching**: Access all data structures before market open to load into cache
4. **Disable NUMA balancing**: Prevent kernel from migrating memory between sockets
5. **Use TSC for timing**: CPU timestamp counter is faster than gettimeofday()

**Critical insight**: At microsecond scale, variance matters as much as mean. A system with 5us mean and 1us stddev beats one with 4us mean and 5us stddev, because the latter occasionally hits 20us outliers.

<div style="background: rgba(137, 87, 229, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

###### Level 3: "How do you measure and attribute latency when your target is sub-microsecond?"

**Expected Answer**: Standard profiling tools (gprof, perf) have overhead that distorts measurements at this scale. Instead:

1. **Hardware timestamping**: NIC records packet arrival time in hardware with nanosecond precision
2. **CPU cycle counting**: `RDTSC` instruction reads CPU cycle counter; convert to time via known frequency
3. **EBPF probes**: Kernel-level tracing with minimal overhead
4. **Statistical sampling**: Measure every Nth event to reduce overhead

**Attribution methodology**:
```
Total latency = T_network_in + T_deserialize + T_validate + T_match + T_serialize + T_network_out
```

Measure each segment independently. The segment with highest variance is often more important than the one with highest mean (variance indicates contention or resource starvation).

**The "coordinated omission" trap**: If your load generator pauses during slow responses, you undercount those responses in percentile calculations. Use [[HDR Histogram]](/topics/observability/metrics) or similar to capture full latency distribution accurately.

</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #58a6ff;">

#### Level 1: "Why is Java used in trading systems despite being 'slow'?"

**Expected Answer**: JVM performance has improved dramatically. With proper tuning (G1GC or ZGC, JIT warmup, off-heap memory), Java achieves single-digit microsecond latency. Benefits: developer productivity, rich ecosystem, easier to hire. LMAX Exchange processes 6M transactions/second in Java.

<div style="background: rgba(88, 166, 255, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

##### Level 2: "How do you prevent GC pauses from causing latency spikes?"

**Expected Answer**: Multiple strategies:

1. **Object pooling**: Reuse objects instead of creating new ones; no garbage = no collection
2. **Off-heap memory**: Store large data structures outside JVM heap using `Unsafe` or memory-mapped files
3. **Concurrent collectors**: G1GC or ZGC pause for ~1-10ms vs 100ms+ for old collectors
4. **GC tuning**: `-XX:MaxGCPauseMillis=10` sets target pause time
5. **Heap sizing**: Make heap large enough that collections are infrequent

**The "GC-free" path**: LMAX Disruptor achieves millions of operations per second without GC by pre-allocating all ring buffer entries and mutating in place rather than creating new objects.

<div style="background: rgba(137, 87, 229, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

###### Level 3: "What is the LMAX Disruptor pattern and why is it faster than traditional queues?"

**Expected Answer**: The Disruptor is a lock-free, bounded, pre-allocated ring buffer that achieves ~6M ops/second single-threaded.

**Key innovations**:

1. **Mechanical sympathy**: Ring buffer entries are cache-line aligned (64 bytes). Sequential access pattern allows CPU prefetcher to predict next access.

2. **Single-writer principle**: Only one thread writes to any variable. Eliminates need for memory barriers on writes.

3. **Sequence barriers**: Instead of locks, consumers track a sequence number. Compare-and-swap only on sequence increment.

4. **Batching**: Producer can publish multiple events with single barrier. Consumer can process multiple events before updating its sequence.

**Why faster than BlockingQueue**:
- `ArrayBlockingQueue.put()`: Lock acquisition (~100ns when contested), notify waiting thread (~10us context switch)
- Disruptor: Increment sequence (single CPU instruction), consumer is busy-polling (no wakeup needed)

**The trade-off**: Disruptor trades CPU cycles (busy polling) for latency predictability. In a trading system, burning a core to spin is cheaper than a single slow order.

</div>
</div>
</div>

</div>

---

## Section 5: Regulatory Compliance

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Core Concept: The Rules of Engagement

Financial markets are heavily regulated to ensure fairness, prevent fraud, and maintain systemic stability. Key regulations affecting stockbroker systems:

- **SEC (US)**: Registration, best execution, trade reporting
- **FINRA (US)**: Broker-dealer supervision, market manipulation rules
- **MiFID II (EU)**: Transaction reporting, algorithmic trading controls
- **MAR (EU)**: Market abuse detection and reporting

<div style="background: rgba(248, 81, 73, 0.1); border: 2px solid #f85149; border-radius: 12px; padding: 20px; margin: 20px 0;">

#### Assumption: Audit Trail Immutability
Regulators assume that once a record is written to the audit trail, it cannot be modified or deleted. Systems must be designed to make tampering technically difficult and detectable.

**Trade-off**: True immutability conflicts with data correction needs. Solution: Never delete; append correction records that reference the original.

</div>

### Key Compliance Requirements

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 20px 0;">

<div style="background: rgba(126, 231, 135, 0.1); border: 2px solid #7ee787; border-radius: 12px; padding: 20px;">
<div style="color: #7ee787; font-weight: 700; margin-bottom: 12px;">Best Execution (Reg NMS / MiFID II)</div>
<div style="color: #8b949e; font-size: 13px;">
<p>Brokers must execute client orders at the best available price across all exchanges. Requires:</p>
<ul style="margin: 8px 0; padding-left: 20px;">
<li>Real-time connectivity to all lit venues</li>
<li>Order routing logic to compare prices</li>
<li>Documentation of execution quality</li>
<li>Periodic best execution reports to clients</li>
</ul>
</div>
</div>

<div style="background: rgba(88, 166, 255, 0.1); border: 2px solid #58a6ff; border-radius: 12px; padding: 20px;">
<div style="color: #58a6ff; font-weight: 700; margin-bottom: 12px;">Order Audit Trail (CAT / MIFIR)</div>
<div style="color: #8b949e; font-size: 13px;">
<p>Every order must be logged with precise timing and attribution:</p>
<ul style="margin: 8px 0; padding-left: 20px;">
<li>Timestamp to millisecond (US) or microsecond (EU)</li>
<li>Customer ID (anonymized in CAT)</li>
<li>Order details (symbol, side, quantity, price, type)</li>
<li>All modifications and final status</li>
</ul>
</div>
</div>

<div style="background: rgba(137, 87, 229, 0.1); border: 2px solid #a371f7; border-radius: 12px; padding: 20px;">
<div style="color: #a371f7; font-weight: 700; margin-bottom: 12px;">Market Manipulation Detection</div>
<div style="color: #8b949e; font-size: 13px;">
<p>Systems must detect and report suspicious patterns:</p>
<ul style="margin: 8px 0; padding-left: 20px;">
<li>Spoofing: Placing orders with intent to cancel</li>
<li>Layering: Multiple orders at different prices to create false depth</li>
<li>Wash trading: Trading with yourself to inflate volume</li>
<li>Pump and dump: Coordinated price manipulation</li>
</ul>
</div>
</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 2px solid #f0883e; border-radius: 12px; padding: 20px;">
<div style="color: #f0883e; font-weight: 700; margin-bottom: 12px;">Risk Controls (SEC Rule 15c3-5)</div>
<div style="color: #8b949e; font-size: 13px;">
<p>Pre-trade risk checks must be implemented:</p>
<ul style="margin: 8px 0; padding-left: 20px;">
<li>Credit limits per customer and aggregate</li>
<li>Position limits per security</li>
<li>Order size limits (no "fat finger" trades)</li>
<li>Price collars (reject orders far from market)</li>
</ul>
</div>
</div>

</div>

### Internal Mechanism: Audit Trail Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
<div style="background: #58a6ff; min-width: 150px; padding: 16px; border-radius: 8px; text-align: center;">
<div style="color: white; font-weight: 700;">Trading System</div>
</div>
<div style="color: #58a6ff; font-size: 24px;">&#8594;</div>
<div style="background: #a371f7; min-width: 150px; padding: 16px; border-radius: 8px; text-align: center;">
<div style="color: white; font-weight: 700;">Event Stream</div>
<div style="color: rgba(255,255,255,0.7); font-size: 11px;">Kafka (immutable log)</div>
</div>
</div>

<div style="display: flex; justify-content: center; gap: 40px;">
<div style="color: #a371f7; font-size: 24px;">&#8601;</div>
<div style="color: #a371f7; font-size: 24px;">&#8595;</div>
<div style="color: #a371f7; font-size: 24px;">&#8600;</div>
</div>

<div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
<div style="background: #21262d; border: 2px solid #7ee787; padding: 16px; border-radius: 8px; text-align: center; min-width: 140px;">
<div style="color: #7ee787; font-weight: 600;">Hot Storage</div>
<div style="color: #8b949e; font-size: 11px;">TimescaleDB</div>
<div style="color: #8b949e; font-size: 11px;">90 days online</div>
</div>
<div style="background: #21262d; border: 2px solid #f0883e; padding: 16px; border-radius: 8px; text-align: center; min-width: 140px;">
<div style="color: #f0883e; font-weight: 600;">Warm Storage</div>
<div style="color: #8b949e; font-size: 11px;">S3 + Athena</div>
<div style="color: #8b949e; font-size: 11px;">7 years queryable</div>
</div>
<div style="background: #21262d; border: 2px solid #f85149; padding: 16px; border-radius: 8px; text-align: center; min-width: 140px;">
<div style="color: #f85149; font-weight: 600;">Cold Archive</div>
<div style="color: #8b949e; font-size: 11px;">Glacier Deep Archive</div>
<div style="color: #8b949e; font-size: 11px;">Permanent retention</div>
</div>
</div>

</div>

</div>

<div style="background: #21262d; border-radius: 12px; padding: 20px; margin: 20px 0;">

**Audit Record Schema (simplified)**:

```json
{
  "event_id": "uuid-v7-with-embedded-timestamp",
  "event_type": "ORDER_PLACED",
  "timestamp_received": "2024-01-15T14:30:00.123456Z",
  "timestamp_processed": "2024-01-15T14:30:00.123789Z",
  "order_id": "ORD-2024-0115-12345",
  "client_id_hash": "sha256(client_id + daily_salt)",
  "symbol": "AAPL",
  "side": "BUY",
  "quantity": 100,
  "price": "182.50",
  "order_type": "LIMIT",
  "time_in_force": "DAY",
  "routing_decision": {
    "selected_venue": "NYSE",
    "reason": "BEST_PRICE",
    "alternatives_considered": ["NASDAQ", "BATS"],
    "prices_at_decision": {"NYSE": "182.50", "NASDAQ": "182.51", "BATS": "182.52"}
  },
  "system_metadata": {
    "server_id": "trade-server-prod-03",
    "version": "2.14.3",
    "request_trace_id": "trace-abc123"
  }
}
```

**Key design decisions**:
- UUID v7 includes timestamp, enabling chronological sorting without secondary index
- Client ID is hashed to protect privacy while maintaining traceability
- Routing decision includes full context to demonstrate best execution
- System metadata enables forensic debugging

</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 2px solid #f0883e; border-radius: 12px; padding: 20px; margin: 20px 0;">

#### Design Choice: Time Synchronization

Regulatory timestamps must be accurate to prevent disputes and enable cross-system correlation. Options:

| Method | Accuracy | Cost | Complexity |
|--------|----------|------|------------|
| NTP | ~10ms | Free | Low |
| PTP (IEEE 1588) | ~1us | $10K+ per server | Medium |
| GPS disciplined oscillator | ~100ns | $50K+ per server | High |
| Atomic clock | ~1ns | $100K+ | Very High |

**Production choice**: PTP for trading servers (satisfies microsecond requirement), NTP for support systems. All servers sync to same grandmaster clock to ensure consistency across the fleet.

**The GPS vulnerability**: GPS-based timing can be spoofed. Defense: Multiple independent time sources with anomaly detection. See [[distributed-clocks]](/topics/distributed-systems/clocks).

</div>

### 3-Level Recursive Interview Questions: Compliance

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f85149;">

#### Level 1: "How do you ensure audit trail integrity?"

**Expected Answer**: Write to append-only storage (Kafka with compaction disabled), replicate to multiple locations, calculate checksums for each record, and use WORM (Write Once Read Many) storage for long-term archives. Regular integrity verification compares checksums.

<div style="background: rgba(88, 166, 255, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

##### Level 2: "A regulator requests all orders for client X from 3 years ago. How do you retrieve them efficiently?"

**Expected Answer**: Multi-tier storage architecture:

1. **Recent data (90 days)**: Query TimescaleDB directly, indexed by client_id_hash and timestamp
2. **Older data (90 days - 7 years)**: Query via Athena against Parquet files in S3, partitioned by date
3. **Very old data (7+ years)**: Restore from Glacier to S3, then query via Athena

**Optimization for regulatory queries**:
- Pre-aggregate daily summaries (order counts, volumes) for quick filtering
- Maintain client-level indexes even in cold storage
- Regulatory query service with query cost estimation before execution

**Timeline**: Hot query returns in seconds; warm query in minutes; cold query may take hours (Glacier restore time).

<div style="background: rgba(137, 87, 229, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

###### Level 3: "How do you handle GDPR 'right to be forgotten' requests while maintaining regulatory audit trails?"

**Expected Answer**: This is a genuine conflict between privacy law (GDPR) and financial regulation (MiFID II, SEC rules). Resolution:

**Legal position**: Financial regulations typically have carve-outs for records required by other laws. Audit trail retention is a legal obligation that supersedes GDPR deletion rights.

**Technical implementation**:
1. **Pseudonymization**: Client PII stored separately from audit records. Audit records contain only client_id_hash.
2. **Key deletion**: For GDPR deletion, delete the key that maps client_id_hash to real identity. Audit records remain but become anonymous.
3. **Regulatory access**: Maintain a "break glass" capability for regulators to request mapping recovery (from encrypted backup) with proper authorization.

**The uncomfortable truth**: True deletion is impossible in an event-sourced system. The system is designed for immutability. GDPR compliance is achieved through anonymization, not deletion.

</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #58a6ff;">

#### Level 1: "What is market manipulation and how do you detect it?"

**Expected Answer**: Market manipulation is intentionally creating artificial prices or trading activity. Detection involves pattern recognition: high order-to-trade ratios (spoofing), coordinated trading across accounts (wash trading), or unusual position building before news (insider trading). Systems use both rules-based alerts and ML anomaly detection.

<div style="background: rgba(88, 166, 255, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

##### Level 2: "How do you distinguish between legitimate algorithmic trading and spoofing?"

**Expected Answer**: Spoofing involves placing orders you intend to cancel to manipulate prices. Legitimate algorithms also cancel orders (responding to market changes).

**Key differentiators**:
1. **Cancel-to-fill ratio**: Spoofers have >95% cancellation; legitimate algos typically <80%
2. **Time in book**: Spoof orders exist for milliseconds; legitimate orders persist longer
3. **Price aggressiveness**: Spoof orders are placed away from touch; legitimate orders are at or near best bid/ask
4. **Pattern after cancel**: Spoofers trade in opposite direction immediately after cancel; legitimate algos don't

**Implementation challenge**: These are probabilistic signals, not proof. Alert for human review; don't auto-block.

<div style="background: rgba(137, 87, 229, 0.1); border-radius: 8px; padding: 16px; margin: 16px 0;">

###### Level 3: "How do you build a real-time surveillance system that processes millions of orders to detect manipulation patterns?"

**Expected Answer**: Stream processing architecture using [[Kafka Streams]](/topics/system-design/kafka-streams) or [[Flink]](/topics/system-design/apache-flink):

**Architecture**:
```
Orders → Kafka → Flink Jobs → Alerts → Investigation Queue
                    ↓
              State Store (per-account metrics)
```

**Per-account state maintained**:
- Rolling 1-minute order/cancel/fill counts
- Position changes over multiple windows
- Historical pattern baseline

**Detection jobs**:
1. **Spoofing detector**: Windowed aggregation of order lifecycle events; alert if cancel_ratio > threshold AND orders were on opposite side of subsequent fill
2. **Layering detector**: Multiple orders at different price levels cancelled together
3. **Wash trade detector**: Graph analysis of order flow between related accounts (shared IP, similar patterns)

**Scale considerations**:
- Partition by symbol for parallel processing
- Use RocksDB state backend for large state
- Checkpoint every 10 seconds for fault tolerance
- Alert deduplication to prevent flood of similar alerts

**The ML angle**: Train models on confirmed manipulation cases. Features include order book imbalance before/after, price impact, temporal patterns. Challenge: very few positive examples (manipulation is rare and often undetected).

</div>
</div>
</div>

</div>

---

## Cross-Cutting Concerns

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Distributed Systems Patterns Applied

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 20px;">
<div style="color: #58a6ff; font-weight: 700; margin-bottom: 12px;">Event Sourcing</div>
<div style="color: #8b949e; font-size: 13px;">
All state changes are stored as immutable events. Current state is derived by replaying events. Enables audit trail, debugging, and recovery. See [[event-sourcing]](/topics/system-design/event-sourcing).
</div>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 20px;">
<div style="color: #7ee787; font-weight: 700; margin-bottom: 12px;">CQRS</div>
<div style="color: #8b949e; font-size: 13px;">
Separate write path (order submission) from read path (portfolio queries). Allows independent scaling and optimization. See [[cqrs]](/topics/system-design/cqrs).
</div>
</div>

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 20px;">
<div style="color: #a371f7; font-weight: 700; margin-bottom: 12px;">Saga Pattern</div>
<div style="color: #8b949e; font-size: 13px;">
Multi-step transactions (order → risk check → match → settle) implemented as sequence of local transactions with compensating actions. See [[saga-pattern]](/topics/system-design/saga-pattern).
</div>
</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 20px;">
<div style="color: #f0883e; font-weight: 700; margin-bottom: 12px;">Circuit Breaker</div>
<div style="color: #8b949e; font-size: 13px;">
External dependencies (exchange connections, payment gateways) wrapped in circuit breakers. Fail fast rather than queue indefinitely. See [[circuit-breaker]](/topics/system-design/circuit-breaker).
</div>
</div>

</div>

### Technology Stack Summary

<div style="background: #21262d; border-radius: 12px; padding: 20px; margin: 20px 0;">

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Order Book** | Redis Sorted Sets | O(log n) operations, sub-ms latency |
| **Event Store** | Apache Kafka | Durability, ordering, replay capability |
| **Hot Data** | TimescaleDB | Time-series optimized, SQL compatible |
| **Cold Archive** | S3 + Glacier | Cost-effective long-term retention |
| **Compute** | EKS / Kubernetes | Auto-scaling, standardized deployment |
| **Caching** | Redis Cluster | Session state, rate limiting, hot data |
| **Search** | Elasticsearch | Full-text search on audit logs |
| **Monitoring** | Prometheus + Grafana | Metrics, alerting, dashboards |

</div>

### Final Interview Synthesis Question

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

#### "Walk me through what happens when a user clicks 'Buy 100 AAPL at Market' on their phone."

**Expected comprehensive answer covering all five sections:**

**1. Order Submission (Latency)**
- Mobile app sends HTTPS request to API gateway (50-200ms mobile network)
- Gateway authenticates via JWT, rate limits, routes to order service
- Order service validates: account exists, not restricted, sufficient buying power

**2. Risk Check (Compliance)**
- Pre-trade risk engine checks position limits, credit limits, price reasonableness
- Audit log entry created with timestamp, decision, and reasoning

**3. Order Routing (Market Data)**
- Smart order router checks NBBO from all exchanges
- Determines NYSE has best ask at $182.50
- Routes order to NYSE (co-located server, ~5us network)

**4. Matching (Matching Engine)**
- Order enters NYSE matching engine queue
- Matches against resting sell orders at $182.50
- Execution report generated within ~10us

**5. Post-Trade (Settlement)**
- Execution report sent back to broker (~50us)
- Portfolio updated in real-time
- Trade queued for T+1 settlement
- DTCC receives trade details for clearing
- Next business day: Cash debited, shares credited
- Audit record finalized with settlement status

**Total user-visible latency**: ~300ms (dominated by mobile network)
**Exchange latency**: ~50 microseconds
**Settlement finality**: T+1 (next business day)

</div>

</div>

---

## Related Topics

- [[order-types]](/topics/trading/order-types) - Market, limit, stop orders explained
- [[market-microstructure]](/topics/trading/market-microstructure) - How markets work at the millisecond level
- [[high-frequency-trading]](/topics/trading/hft) - Algorithmic trading strategies
- [[distributed-transactions]](/topics/system-design/distributed-transactions) - 2PC, Saga, and compensation
- [[event-sourcing]](/topics/system-design/event-sourcing) - Immutable event logs
- [[cap-theorem]](/topics/system-design/cap-theorem) - Consistency vs availability trade-offs
- [[kafka]](/topics/system-design/kafka) - Distributed event streaming
- [[redis]](/topics/databases/redis) - In-memory data structures
