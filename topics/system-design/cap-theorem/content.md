# CAP Theorem

## Overview

The CAP Theorem is one of the most fundamental concepts in distributed systems design. Proposed by computer scientist Eric Brewer in 2000 and later proven by Seth Gilbert and Nancy Lynch, it states that a distributed data store can only provide two out of three guarantees simultaneously: **Consistency**, **Availability**, and **Partition Tolerance**.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 20px; font-weight: 600;">THE CAP THEOREM</h3>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
    <div style="display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;">
      <div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 140px;">
        <div style="color: #166534; font-weight: 700; font-size: 16px;">Consistency</div>
        <div style="color: #15803d; font-size: 12px; margin-top: 4px;">Every read gets latest write</div>
      </div>
      <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 140px;">
        <div style="color: #1e40af; font-weight: 700; font-size: 16px;">Availability</div>
        <div style="color: #1d4ed8; font-size: 12px; margin-top: 4px;">Every request gets response</div>
      </div>
      <div style="background: #f3e8ff; border: 2px solid #a855f7; border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 140px;">
        <div style="color: #6b21a8; font-weight: 700; font-size: 16px;">Partition Tolerance</div>
        <div style="color: #7c3aed; font-size: 12px; margin-top: 4px;">Works despite network splits</div>
      </div>
    </div>
    <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 12px 24px; margin-top: 8px;">
      <span style="color: #92400e; font-weight: 600;">Key Insight: You can only pick TWO!</span>
    </div>
  </div>
</div>

**The Deep Explanation**: The theorem isn't just about picking two properties—it's about understanding <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">what happens when the network fails</span>. In any real distributed system, network partitions **will** occur (cables get cut, routers fail, data centers lose connectivity). When this happens, you face an impossible choice: either refuse requests to maintain consistency, or accept requests but risk serving stale data.

The mathematical proof by Gilbert and Lynch (2002) formalized this impossibility. They showed that <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">no algorithm can guarantee both safety (consistency) and liveness (availability) in an asynchronous network that can lose messages</span>. This is not a limitation of current technology—it's a fundamental theorem about distributed computation.

---

## Why It Matters: Real Company Examples

Understanding CAP Theorem is crucial because it drives fundamental architecture decisions at every major tech company:

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">REAL-WORLD CAP DECISIONS</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
    <div style="background: #ecfdf5; border-radius: 12px; padding: 20px; border-left: 4px solid #10b981;">
      <div style="color: #065f46; font-weight: 700; margin-bottom: 8px;">Amazon DynamoDB (AP)</div>
      <div style="color: #047857; font-size: 13px;">Shopping carts prioritize availability - a customer should always be able to add items, even if it means briefly seeing stale inventory counts.</div>
    </div>
    <div style="background: #eff6ff; border-radius: 12px; padding: 20px; border-left: 4px solid #3b82f6;">
      <div style="color: #1e40af; font-weight: 700; margin-bottom: 8px;">Google Spanner (CP)</div>
      <div style="color: #1d4ed8; font-size: 13px;">Bank transactions require strong consistency - you can never show incorrect balance, even if it means briefly rejecting requests.</div>
    </div>
    <div style="background: #fef3c7; border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 700; margin-bottom: 8px;">Netflix (AP)</div>
      <div style="color: #b45309; font-size: 13px;">Video recommendations can be stale for a few seconds - availability matters more than showing the absolutely latest suggestions.</div>
    </div>
    <div style="background: #fce7f3; border-radius: 12px; padding: 20px; border-left: 4px solid #ec4899;">
      <div style="color: #9d174d; font-weight: 700; margin-bottom: 8px;">Stripe (CP)</div>
      <div style="color: #be185d; font-size: 13px;">Payment processing demands consistency - double-charging a customer is unacceptable, so reject requests if uncertain.</div>
    </div>
  </div>
</div>

**Interview Insight**: Companies often ask "how would you design X?" The CAP theorem is usually the first design decision you need to articulate. Should your system prioritize never losing data (CP) or always being responsive (AP)?

---

## How It Works: The Three Guarantees In Depth

### Consistency (C)

All nodes see the same data at the same time. After a successful write, every subsequent read from any node returns that value. This is also called **linearizability** or **strong consistency**.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 16px; font-weight: 600;">STRONG CONSISTENCY</h3>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
    <div style="color: #1e293b; font-size: 14px;">Client writes <span style="color: #16a34a; font-weight: 600;">balance = $100</span></div>
    <div style="color: #64748b; font-size: 24px;">↓</div>
    <div style="display: flex; align-items: center; gap: 32px; flex-wrap: wrap; justify-content: center;">
      <div style="background: #dcfce7; padding: 16px 24px; border-radius: 10px; text-align: center; border: 2px solid #22c55e;">
        <div style="color: #166534; font-weight: 600;">Node A</div>
        <div style="color: #15803d; font-size: 14px;">$100</div>
      </div>
      <div style="color: #3b82f6; font-size: 14px;">← sync →</div>
      <div style="background: #dcfce7; padding: 16px 24px; border-radius: 10px; text-align: center; border: 2px solid #22c55e;">
        <div style="color: #166534; font-weight: 600;">Node B</div>
        <div style="color: #15803d; font-size: 14px;">$100</div>
      </div>
      <div style="color: #3b82f6; font-size: 14px;">← sync →</div>
      <div style="background: #dcfce7; padding: 16px 24px; border-radius: 10px; text-align: center; border: 2px solid #22c55e;">
        <div style="color: #166534; font-weight: 600;">Node C</div>
        <div style="color: #15803d; font-size: 14px;">$100</div>
      </div>
    </div>
    <div style="background: #dcfce7; border-radius: 8px; padding: 12px 20px; margin-top: 8px;">
      <span style="color: #166534; font-weight: 600;">Result: Any node you read from shows $100</span>
    </div>
  </div>
</div>

**Deep Dive**: <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">CAP consistency is NOT the same as ACID consistency</span>. ACID consistency means data satisfies integrity constraints (foreign keys, unique constraints). CAP consistency means all replicas have the same value at any point in time. A system can be CAP-consistent but violate ACID constraints, and vice versa.

**Internal Mechanism**: Achieving strong consistency typically requires a [[consensus-algorithms]](/topic/system-design/consensus-algorithms) like Paxos or Raft. These protocols ensure that <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">a majority of nodes agree on every write before acknowledging it</span>. This coordination adds latency (typically 1-2 network round trips) but guarantees that any subsequent read will see that write.

### Availability (A)

Every request to a non-failing node receives a response (success or failure), without guarantee that it contains the most recent write.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 16px; font-weight: 600;">HIGH AVAILABILITY</h3>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 500px; margin: 0 auto;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="background: #dbeafe; padding: 10px 16px; border-radius: 8px; color: #1e40af; font-weight: 600; min-width: 80px;">Client 1</div>
      <div style="color: #64748b;">→</div>
      <div style="background: #f1f5f9; padding: 10px 16px; border-radius: 8px; color: #475569;">Node A</div>
      <div style="color: #64748b;">→</div>
      <div style="background: #dcfce7; padding: 10px 16px; border-radius: 8px; color: #166534; font-weight: 600;">Response OK</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="background: #dbeafe; padding: 10px 16px; border-radius: 8px; color: #1e40af; font-weight: 600; min-width: 80px;">Client 2</div>
      <div style="color: #64748b;">→</div>
      <div style="background: #f1f5f9; padding: 10px 16px; border-radius: 8px; color: #475569;">Node B</div>
      <div style="color: #64748b;">→</div>
      <div style="background: #dcfce7; padding: 10px 16px; border-radius: 8px; color: #166534; font-weight: 600;">Response OK</div>
    </div>
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="background: #dbeafe; padding: 10px 16px; border-radius: 8px; color: #1e40af; font-weight: 600; min-width: 80px;">Client 3</div>
      <div style="color: #64748b;">→</div>
      <div style="background: #f1f5f9; padding: 10px 16px; border-radius: 8px; color: #475569;">Node C</div>
      <div style="color: #64748b;">→</div>
      <div style="background: #dcfce7; padding: 10px 16px; border-radius: 8px; color: #166534; font-weight: 600;">Response OK</div>
    </div>
  </div>
  <div style="background: #dbeafe; border-radius: 8px; padding: 12px 20px; margin-top: 16px; text-align: center;">
    <span style="color: #1e40af; font-weight: 600;">Result: Every request gets a response (may be stale)</span>
  </div>
</div>

**Deep Dive**: <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">CAP availability is stricter than practical availability metrics</span>. In CAP terms, availability means **every** request to a non-failing node must succeed. In practice, we measure availability as a percentage (99.99% uptime). A CP system might have 99.99% availability in practice because partitions are rare, even though it's not "available" in CAP terms during partitions.

**Internal Mechanism**: Highly available systems typically use [[database-replication]](/topic/system-design/database-replication) with asynchronous writes. When a write comes in, the primary node acknowledges immediately and replicates in the background. This means <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">reads from replicas may return stale data during the replication window</span>.

### Partition Tolerance (P)

The system continues to operate despite arbitrary message loss or failure of part of the system. Network partitions are inevitable in distributed systems.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 16px; font-weight: 600;">NETWORK PARTITION</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap;">
    <div style="background: #dbeafe; padding: 20px 28px; border-radius: 12px; text-align: center; border: 2px solid #3b82f6;">
      <div style="color: #1e40af; font-weight: 700;">Data Center A</div>
      <div style="color: #3b82f6; font-size: 13px;">Nodes 1, 2, 3</div>
    </div>
    <div style="background: #fef2f2; border: 2px dashed #ef4444; padding: 12px 20px; border-radius: 8px;">
      <div style="color: #dc2626; font-weight: 700; font-size: 14px;">NETWORK SPLIT</div>
      <div style="color: #b91c1c; font-size: 11px;">Cannot communicate</div>
    </div>
    <div style="background: #f3e8ff; padding: 20px 28px; border-radius: 12px; text-align: center; border: 2px solid #a855f7;">
      <div style="color: #6b21a8; font-weight: 700;">Data Center B</div>
      <div style="color: #7c3aed; font-size: 13px;">Nodes 4, 5, 6</div>
    </div>
  </div>
  <div style="background: #fef3c7; border-radius: 8px; padding: 12px 20px; margin-top: 20px; text-align: center;">
    <span style="color: #92400e; font-weight: 600;">Partition Tolerant: Both sides keep serving requests</span>
  </div>
</div>

**Deep Dive**: <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Partition tolerance is not optional in distributed systems</span>. The "CAP theorem" is sometimes better understood as "during a partition, choose C or A." In practice, every distributed system must handle partitions, so the real choice is between CP and AP behavior during failures.

**Internal Mechanism**: Partitions can occur at many levels:
- **Network layer**: Router failures, cable cuts, BGP misconfigurations
- **Application layer**: Overloaded services dropping connections
- **Process level**: GC pauses making a node appear unresponsive

<span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">A partition doesn't require complete network failure—even asymmetric partitions (A can reach B, but B can't reach A) or partial partitions create the same dilemma</span>.

---

## The Trade-off: Why You Must Choose

In a distributed system, network partitions WILL happen. When they do, you face an impossible choice:

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">THE PARTITION DILEMMA</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
    <div style="background: #ecfdf5; border-radius: 12px; padding: 24px; border: 2px solid #10b981;">
      <div style="color: #065f46; font-weight: 700; font-size: 16px; margin-bottom: 12px;">OPTION 1: Choose Consistency (CP)</div>
      <div style="color: #047857; font-size: 14px; margin-bottom: 16px;">
        "I cannot confirm the other data center received this update..."<br><br>
        <span style="font-weight: 600;">"REJECT the request to avoid inconsistency!"</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px; font-size: 13px;">
        <span style="color: #166534;">✓ Data always consistent</span>
        <span style="color: #dc2626;">✗ Some requests fail</span>
      </div>
    </div>
    <div style="background: #eff6ff; border-radius: 12px; padding: 24px; border: 2px solid #3b82f6;">
      <div style="color: #1e40af; font-weight: 700; font-size: 16px; margin-bottom: 12px;">OPTION 2: Choose Availability (AP)</div>
      <div style="color: #1d4ed8; font-size: 14px; margin-bottom: 16px;">
        "I'll accept the write locally and sync later..."<br><br>
        <span style="font-weight: 600;">"ACCEPT the request, deal with conflicts later!"</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px; font-size: 13px;">
        <span style="color: #166534;">✓ All requests succeed</span>
        <span style="color: #dc2626;">✗ May return stale data</span>
      </div>
    </div>
  </div>
</div>

---

## System Classifications

### CP Systems (Consistency + Partition Tolerance)

These systems sacrifice availability during partitions. They use techniques like [[consensus-algorithms]](/topic/system-design/consensus-algorithms) to ensure data consistency.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">CP SYSTEM: QUORUM CONSENSUS</h3>
  <div style="color: #64748b; text-align: center; margin-bottom: 20px; font-size: 13px;">5 nodes, quorum = 3 (majority required)</div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div style="background: #dcfce7; border-radius: 10px; padding: 20px;">
      <div style="color: #166534; font-weight: 600; margin-bottom: 12px;">Normal Operation</div>
      <div style="font-size: 13px; color: #15803d;">
        Write to Node A: ACK ✓<br>
        Write to Node B: ACK ✓<br>
        Write to Node C: ACK ✓<br>
        <span style="font-weight: 600;">3/5 = Quorum reached = SUCCESS</span>
      </div>
    </div>
    <div style="background: #fef2f2; border-radius: 10px; padding: 20px;">
      <div style="color: #dc2626; font-weight: 600; margin-bottom: 12px;">During Partition</div>
      <div style="font-size: 13px; color: #b91c1c;">
        Write to Node A: ACK ✓<br>
        Write to Node B: UNREACHABLE ✗<br>
        Write to Node C: UNREACHABLE ✗<br>
        <span style="font-weight: 600;">1/5 &lt; Quorum = REQUEST REJECTED</span>
      </div>
    </div>
  </div>
</div>

**Examples**: MongoDB (default config), HBase, Redis Cluster, Zookeeper, etcd, Consul

**Use Cases**: Banking transactions, inventory management, configuration management, leader election

### AP Systems (Availability + Partition Tolerance)

These systems sacrifice consistency during partitions. They accept writes on any available node and reconcile later using [[eventual-consistency]](/topic/system-design/eventual-consistency) techniques.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">AP SYSTEM: EVENTUAL CONSISTENCY</h3>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <div style="color: #f59e0b; font-weight: 600; margin-bottom: 12px;">During Partition:</div>
      <div style="display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap;">
        <div style="text-align: center;">
          <div style="background: #dbeafe; padding: 14px 20px; border-radius: 8px; border: 2px solid #3b82f6;">
            <div style="color: #1e40af; font-weight: 600;">Node A</div>
            <div style="color: #3b82f6; font-size: 13px;">X = 10</div>
          </div>
          <div style="color: #166534; font-size: 12px; margin-top: 4px;">Write accepted!</div>
        </div>
        <div style="background: #fef2f2; border: 2px dashed #ef4444; padding: 8px 16px; border-radius: 6px;">
          <span style="color: #dc2626; font-weight: 600; font-size: 12px;">PARTITION</span>
        </div>
        <div style="text-align: center;">
          <div style="background: #fef2f2; padding: 14px 20px; border-radius: 8px; border: 2px solid #ef4444;">
            <div style="color: #dc2626; font-weight: 600;">Node B</div>
            <div style="color: #b91c1c; font-size: 13px;">X = 5 (stale)</div>
          </div>
          <div style="color: #b91c1c; font-size: 12px; margin-top: 4px;">Returns old value</div>
        </div>
      </div>
    </div>
    <div>
      <div style="color: #16a34a; font-weight: 600; margin-bottom: 12px;">After Partition Heals:</div>
      <div style="display: flex; align-items: center; justify-content: center; gap: 24px;">
        <div style="background: #dcfce7; padding: 14px 20px; border-radius: 8px; border: 2px solid #22c55e;">
          <div style="color: #166534; font-weight: 600;">Node A</div>
          <div style="color: #15803d; font-size: 13px;">X = 10</div>
        </div>
        <div style="color: #22c55e; font-size: 14px;">← sync →</div>
        <div style="background: #dcfce7; padding: 14px 20px; border-radius: 8px; border: 2px solid #22c55e;">
          <div style="color: #166534; font-weight: 600;">Node B</div>
          <div style="color: #15803d; font-size: 13px;">X = 10</div>
        </div>
      </div>
    </div>
  </div>
</div>

**Examples**: Cassandra, DynamoDB, CouchDB, Riak, Amazon S3

**Use Cases**: Shopping carts, social media feeds, session storage, analytics

---

## Common Pitfalls

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">1. Thinking CA is Possible in Distributed Systems</div>
  <div style="color: #7f1d1d; font-size: 14px;">Network partitions WILL happen. Any truly distributed system must be partition-tolerant. "CA systems" like single-node PostgreSQL are not distributed - they have no partitions because there is no network between nodes.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">2. Confusing CAP Consistency with ACID Consistency</div>
  <div style="color: #7f1d1d; font-size: 14px;">CAP consistency means all nodes see the same data. ACID consistency means data satisfies integrity constraints. A CP system can still have ACID violations if transactions are not properly implemented.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">3. Treating CAP as Binary</div>
  <div style="color: #7f1d1d; font-size: 14px;">Real systems exist on a spectrum. Many databases offer tunable consistency - you can choose different consistency levels per operation. DynamoDB, Cassandra, and MongoDB all offer this flexibility.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">4. Ignoring Latency (PACELC)</div>
  <div style="color: #7f1d1d; font-size: 14px;">CAP only describes behavior during partitions. The PACELC theorem extends this: even when no partition exists, you must choose between latency and consistency. Strong consistency requires coordination, which adds latency.</div>
</div>

---

## Deep Interview Questions - Level 1

### Q1: Why can't a distributed system detect and recover from partitions instantly to achieve all three CAP properties?

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #bbf7d0;">

**Deep Answer:**

This question reveals a fundamental misunderstanding about distributed systems. <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">The impossibility isn't about detection speed—it's about the fundamental uncertainty in asynchronous networks</span>.

**The Core Problem - Asynchronous Networks:**
In any real network, there's no way to distinguish between:
1. A node that is slow to respond
2. A node that has crashed
3. A network partition isolating that node

This is known as the **FLP Impossibility** (Fischer, Lynch, Patterson, 1985). In an asynchronous system with even one faulty process, <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">no deterministic consensus algorithm can guarantee termination</span>.

**Why Detection Doesn't Help:**
Even if you could detect a partition instantly:
- During the partition, you still face the C vs A choice
- "Instant recovery" is impossible because network repair is physical
- The partition might last milliseconds or hours—you can't know

**The Timeout Dilemma:**
- Set timeout too short → false positives (healthy nodes declared dead)
- Set timeout too long → slow failure detection, poor availability
- <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">There is no "correct" timeout because network latency is unbounded</span>

**Real-World Implication:**
Google Spanner "cheats" by using atomic clocks (TrueTime) to bound uncertainty, but even then they accept ~7ms of unavailability during synchronization. They didn't solve CAP—they made a different trade-off.

</div>

#### Level 2 Follow-ups:

**Q1.1: How does Google Spanner claim to be "effectively CA" while CAP says it's impossible?**

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border: 1px solid #bbf7d0;">

Spanner doesn't violate CAP—it makes clever engineering trade-offs:

1. **TrueTime API**: Uses GPS and atomic clocks to provide globally synchronized time with bounded uncertainty (typically 1-7ms). This enables [[consensus-algorithms]](/topic/system-design/consensus-algorithms) with known wait times.

2. **Commit Wait**: <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">After a write, Spanner waits for the TrueTime uncertainty interval before acknowledging</span>. This ensures any subsequent read will see the write.

3. **Trade-off**: They trade latency for consistency. Every write has a minimum latency equal to the TrueTime uncertainty (~7ms average). During partitions, <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">the minority partition becomes unavailable</span>—classic CP behavior.

**Level 3 Follow-ups:**

**Q1.1.1: What happens if Spanner's TrueTime assumptions are violated?**

The system would exhibit **split-brain** behavior. If clocks drift beyond the assumed bounds, two nodes might both believe they're the leader, accepting conflicting writes. Google invests heavily in clock synchronization infrastructure specifically to prevent this. <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">The correctness guarantee is only as strong as the clock synchronization</span>.

**Q1.1.2: Could you implement Spanner-like guarantees without specialized hardware?**

Yes, but with worse performance. CockroachDB implements similar semantics using NTP-synchronized clocks. However, NTP uncertainty is typically 100-250ms vs Spanner's 7ms, so commit wait latency is much higher. Some deployments use hybrid logical clocks (HLC) which provide causality guarantees without wall-clock synchronization, but sacrifice real-time ordering.

**Q1.1.3: Why doesn't every distributed database use TrueTime?**

Cost and complexity. TrueTime requires GPS receivers and atomic clocks in every data center, plus the software infrastructure to expose accurate time bounds. For most applications, the consistency guarantees of Raft/Paxos with standard NTP are sufficient. <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">TrueTime is only valuable when you need global strong consistency AND low latency</span>—a rare combination.

</div>

**Q1.2: What is the relationship between CAP and the FLP impossibility result?**

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border: 1px solid #bbf7d0;">

FLP and CAP are related but distinct impossibility results:

**FLP (1985)**: In an asynchronous system with at least one faulty process, <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">no deterministic consensus protocol can guarantee both safety and liveness</span>.

**CAP (2000/2002)**: In a distributed system with network partitions, you cannot simultaneously guarantee consistency and availability.

**The Connection:**
- Both stem from uncertainty in asynchronous networks
- FLP focuses on consensus (agreement among nodes)
- CAP focuses on data consistency across replicas
- Strong consistency requires consensus, so FLP's limits apply

**Practical Workarounds:**
Both theorems have practical workarounds that weaken their assumptions:
- **Randomization**: Paxos and Raft use leader election with randomized timeouts
- **Partial Synchrony**: Assume the network is eventually synchronous
- **Failure Detectors**: Abstract away the timing assumptions

**Level 3 Follow-ups:**

**Q1.2.1: How do consensus algorithms like Raft work around FLP?**

Raft assumes **partial synchrony**—the network is asynchronous but eventually becomes synchronous long enough to make progress. During asynchronous periods, Raft might not elect a leader (violating liveness), but it never elects two leaders (preserving safety). <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">The randomized election timeout makes it probabilistically unlikely to be stuck forever</span>.

**Q1.2.2: What's the difference between safety and liveness in distributed systems?**

**Safety**: "Nothing bad ever happens" (e.g., no two nodes disagree, no data corruption). Safety properties can be verified by examining finite execution prefixes.

**Liveness**: "Something good eventually happens" (e.g., requests eventually complete, consensus is reached). Liveness requires examining infinite executions.

FLP proves you can't guarantee both. <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Practical systems prioritize safety and use timeouts/retries for liveness</span>.

**Q1.2.3: Can a blockchain be considered through the CAP lens?**

Yes! Bitcoin is an AP system. During a network partition, both sides continue mining (availability). When the partition heals, the longest chain wins and shorter chains are orphaned (eventual consistency). <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">The "6 confirmation" rule is essentially a probabilistic consistency guarantee</span>—after 6 blocks, reorg probability is negligible.

</div>

**Q1.3: If partitions are rare, why not build a CA system and handle partitions as exceptions?**

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border: 1px solid #bbf7d0;">

This approach is dangerous and fundamentally misunderstands the problem:

**Partitions Are More Common Than You Think:**
- GC pauses can make a node appear partitioned (stop-the-world collections)
- Network switches fail, causing asymmetric connectivity
- Cloud providers have regular inter-AZ latency spikes
- <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Even "rare" events happen constantly at scale</span>—if you have 10,000 servers and 0.1% partition probability per day, you'll see partitions daily

**The "Exception Handling" Fallacy:**
When you discover a partition:
- Data may already be inconsistent
- You don't know which writes succeeded where
- "Handling" the exception means choosing C or A—you've just deferred the decision

**Real-World Disasters:**
GitHub's 2018 outage: A 43-second network partition between data centers caused MySQL to fail over. When connectivity restored, they had divergent writes. <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Recovery took 24+ hours because they hadn't designed for this "rare" case</span>.

**Level 3 Follow-ups:**

**Q1.3.1: How should a system architect think about "rare" failure modes?**

Apply the **Failure Mode and Effects Analysis (FMEA)** approach: multiply probability × impact. A 0.01% probability event that causes complete data loss is more critical than a 10% probability event that causes brief latency spikes. <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Design your consistency model for the failure modes you can't recover from</span>, not the ones you expect.

**Q1.3.2: What's the difference between fail-fast and fail-safe in the context of CAP?**

**Fail-fast (CP)**: When uncertain, reject the request immediately. Better to return an error than potentially corrupt data. Example: A payment system refusing a transaction if it can't confirm the balance.

**Fail-safe (AP)**: When uncertain, proceed with a reasonable default. Better to serve stale data than nothing. Example: A news feed showing cached content during a database outage.

Neither is universally better—<span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">the choice depends on the business impact of inconsistency vs unavailability</span>.

**Q1.3.3: How do you test for partition tolerance before going to production?**

**Chaos Engineering**: Tools like Netflix's Chaos Monkey, Jepsen (by Kyle Kingsbury), and Gremlin inject failures systematically:
- Network partitions between services
- Asymmetric partitions (A→B works, B→A doesn't)
- Partial partitions (some nodes isolated)
- Clock skew
- Process pauses (simulating GC)

<span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Jepsen has found consistency bugs in nearly every distributed database it has tested</span>, including MongoDB, Cassandra, and Redis Cluster.

</div>

---

### Q2: How do you design a system that needs strong consistency for some operations and high availability for others?

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #bbf7d0;">

**Deep Answer:**

This is one of the most practical CAP questions because <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">real systems rarely need uniform consistency across all operations</span>. The pattern is called **Tunable Consistency** or **Per-Operation Consistency Levels**.

**Architecture Pattern: Polyglot Persistence**

Use different storage systems for different consistency requirements:

```
┌─────────────────────────────────────────────────────────────┐
│                        Application                          │
├─────────────────────────────────────────────────────────────┤
│  Payment Service    │  User Profile    │  Activity Feed     │
│  (Strong: Spanner)  │  (Session: Redis)│  (Eventual: Cass.) │
└─────────────────────────────────────────────────────────────┘
```

**Within a Single Database: Tunable Consistency**

Many modern databases support per-query consistency levels:

**Cassandra:**
```sql
-- Strong consistency (quorum read + quorum write)
SELECT * FROM accounts WHERE id = 123 USING CONSISTENCY QUORUM;

-- High availability (any replica can respond)
SELECT * FROM recommendations USING CONSISTENCY ONE;
```

**DynamoDB:**
```python
# Strong consistency
response = table.get_item(Key={'pk': '123'}, ConsistentRead=True)

# Eventual consistency (2x throughput, lower latency)
response = table.get_item(Key={'pk': '123'}, ConsistentRead=False)
```

**Design Pattern: CQRS (Command Query Responsibility Segregation)**

Separate read and write paths with different consistency guarantees:

- **Commands (writes)**: Go through CP system, strong consistency
- **Queries (reads)**: Served from AP read replicas, eventual consistency

<span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">This works when reads vastly outnumber writes (common in most applications)</span>.

</div>

#### Level 2 Follow-ups:

**Q2.1: How do you prevent developers from accidentally using the wrong consistency level?**

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border: 1px solid #bbf7d0;">

This is a critical operational concern. Strategies:

**1. Domain-Driven Abstractions:**
Don't expose raw consistency levels. Wrap them in domain-meaningful APIs:

```python
class PaymentRepository:
    def get_balance(self, account_id):
        # Always strong consistency - developers can't override
        return self.db.query(
            "SELECT balance FROM accounts WHERE id = ?",
            consistency=STRONG
        )

class RecommendationRepository:
    def get_recommendations(self, user_id):
        # Always eventual - clearly documented
        return self.cache.get(f"recs:{user_id}") or []
```

**2. Static Analysis / Linters:**
Flag direct database calls outside repository classes. Require consistency level to be explicit in code review.

**3. Service Boundaries:**
<span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Enforce consistency at the service level, not the query level</span>. The "payment service" always uses strong consistency; the "feed service" always uses eventual.

**Level 3 Follow-ups:**

**Q2.1.1: How do you handle operations that span multiple consistency domains?**

This is the distributed transaction problem. Options:
- **Saga Pattern**: Chain of local transactions with compensating actions
- **Two-Phase Commit**: Coordinate across systems (high latency, blocks on failures)
- **Outbox Pattern**: Write to local DB + outbox table atomically, async process outbox

<span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Generally avoid cross-consistency-domain transactions by redesigning boundaries</span>.

**Q2.1.2: What happens if a strong-consistency operation depends on eventually-consistent data?**

The strong guarantee is only as strong as its weakest input. If you read a user's email from an eventually-consistent cache and use it for a payment receipt, the receipt might go to the wrong address. <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Trace data flow through your system to identify these "consistency leaks"</span>.

**Q2.1.3: How do you monitor for consistency violations in production?**

- **Reconciliation jobs**: Periodically compare replicas, flag divergence
- **Read-your-writes tracking**: Log write timestamps, compare with read results
- **Linearizability checkers**: Tools like Jepsen can run against production-like workloads
- **Business metrics**: Unexpected patterns (duplicate charges, missing records) often indicate consistency issues

</div>

**Q2.2: What is the PACELC theorem and how does it extend CAP?**

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border: 1px solid #bbf7d0;">

PACELC (proposed by Daniel Abadi, 2012) addresses CAP's blind spot: <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">what happens when there is NO partition?</span>

**The PACELC Statement:**
- **P**artition → choose **A**vailability or **C**onsistency
- **E**lse (no partition) → choose **L**atency or **C**onsistency

```
If Partition:
    Choose A or C
Else:
    Choose L or C
```

**Why This Matters:**
CAP only applies during partitions, which are (hopefully) rare. Most of the time, your system operates normally—but you still face trade-offs. <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Strong consistency requires coordination, which means waiting for network round-trips</span>.

**System Classifications Under PACELC:**

| System | Partition | Normal |
|--------|-----------|--------|
| DynamoDB | PA | EL (eventual, low latency) |
| Cassandra | PA | EL |
| MongoDB | PC | EC (consistent, higher latency) |
| Spanner | PC | EC |
| PNUTS | PA | EC (interesting hybrid) |

**Level 3 Follow-ups:**

**Q2.2.1: Can a system change its PACELC behavior dynamically?**

Yes, this is increasingly common. DynamoDB's DAX (caching layer) provides EL reads, while direct DynamoDB provides EC reads. <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Applications can choose per-request based on the operation's requirements</span>.

**Q2.2.2: How does PACELC apply to multi-region deployments?**

Multi-region amplifies the L vs C trade-off. Cross-region latency is typically 50-200ms. A strongly consistent write to 3 regions requires 2 round-trips = 100-400ms. <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Many systems choose strong consistency within a region, eventual consistency across regions</span>.

**Q2.2.3: What's the relationship between PACELC and consensus protocol choice?**

Consensus protocols have different latency profiles:
- **Paxos/Raft**: 2 round-trips minimum, leader-based
- **EPaxos**: 1 round-trip in the fast path (no conflicts)
- **CRDT-based**: 0 round-trips (local writes, async sync)

The protocol choice determines where you sit on the L-C spectrum during normal operation.

</div>

**Q2.3: How does eventual consistency actually work? What guarantees do you get?**

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border: 1px solid #bbf7d0;">

"Eventual consistency" is often misunderstood. <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">It's not "anything goes"—there are precise guarantees and convergence properties</span>.

**The Formal Definition:**
If no new updates are made to an object, eventually all reads will return the last updated value. The system guarantees convergence given sufficient time without updates.

**What You DON'T Get:**
- Reads may return stale data
- Reads may return different values on retry
- The order of updates may not be preserved
- You may read your own writes from a different replica

**Stronger Eventual Consistency Models:**

1. **Read-Your-Writes**: You always see your own writes
2. **Monotonic Reads**: You never see older values than you've already seen
3. **Monotonic Writes**: Your writes are applied in order
4. **Causal Consistency**: If A causes B, anyone who sees B also sees A

<span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Most AP systems provide some combination of these "session guarantees"</span>.

**Conflict Resolution Strategies:**

When replicas diverge, how do you reconcile?

- **Last-Write-Wins (LWW)**: Highest timestamp wins. Simple but loses data.
- **Vector Clocks**: Track causality, detect concurrent writes, merge or flag for resolution.
- **CRDTs**: Data structures designed to merge automatically (counters, sets, registers).

**Level 3 Follow-ups:**

**Q2.3.1: How do vector clocks work and why are they better than timestamps?**

Vector clocks track causality, not time. Each node maintains a vector of logical clocks:

```
Node A writes: [A:1, B:0, C:0]
Node B writes: [A:0, B:1, C:0]
```

If all elements of V1 ≤ V2, then V1 happened-before V2. If neither dominates, the writes are concurrent (conflict).

<span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Unlike timestamps, vector clocks are immune to clock skew and definitively identify concurrent writes</span>.

**Q2.3.2: What are CRDTs and when should you use them?**

Conflict-free Replicated Data Types are data structures that can be merged without coordination:

- **G-Counter**: Grow-only counter (sum all node contributions)
- **PN-Counter**: Increment and decrement (two G-Counters)
- **LWW-Register**: Last-write-wins value
- **OR-Set**: Observed-Remove set (add and remove elements)

Use CRDTs when: concurrent updates are common, merge semantics are well-defined, and you need high availability. <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Don't use for: operations requiring global ordering, transactions, or when "correct" merge behavior is undefined</span>.

**Q2.3.3: How does DynamoDB achieve "strong eventual consistency"?**

DynamoDB uses a variant called **anti-entropy**:
1. Writes go to a quorum of replicas
2. Background process continuously syncs replicas
3. Merkle trees identify divergent data efficiently
4. Hinted handoff handles temporarily unavailable nodes

For strong consistency, use `ConsistentRead=True`—this reads from the leader replica which always has the latest data.

</div>

---

### Q3: A system claims to be both "strongly consistent" and "highly available." How do you evaluate this claim?

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #bbf7d0;">

**Deep Answer:**

This is a red flag that requires careful investigation. <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Either they're not truly distributed, they're redefining terms, or they're hiding trade-offs</span>.

**Questions to Ask:**

1. **"What happens during a network partition?"**
   - If they reject requests → CP (not highly available during partitions)
   - If they serve stale data → AP (not strongly consistent)
   - If they say "partitions don't happen" → not truly distributed

2. **"How do you define 'strongly consistent'?"**
   - Linearizability? Sequential consistency? Causal consistency?
   - Per-partition? Per-key? Global?
   - <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Many vendors use "consistent" loosely</span>

3. **"How do you define 'highly available'?"**
   - 99.99% SLA ≠ CAP availability
   - "Available" might mean "available for reads" (writes may fail)
   - Check if their SLA excludes partition scenarios

4. **"What's the latency distribution?"**
   - Strong consistency adds coordination latency
   - If p99 latency is low, they may have sacrificed something else

**Common Ways Claims Are Misleading:**

| Claim | Reality |
|-------|---------|
| "Strongly consistent" | ...within a single region/datacenter |
| "Highly available" | ...except during partitions (which we don't count in SLA) |
| "Always consistent" | ...but reads may be stale |
| "Zero downtime" | ...for reads; writes may block |

</div>

#### Level 2 Follow-ups:

**Q3.1: How do cloud providers like AWS achieve high availability for their strongly consistent services?**

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border: 1px solid #bbf7d0;">

They don't violate CAP—they make partitions extremely rare through engineering:

**Physical Infrastructure:**
- Redundant network paths within and between AZs
- Multiple fiber routes between data centers
- In-house network hardware with custom firmware
- <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Each AZ is in a separate physical building with independent power/cooling</span>

**Software Infrastructure:**
- Paxos/Raft with 3 or 5 replicas across AZs
- Sub-second failure detection
- Automatic leader election
- Pre-provisioned capacity for failover

**The Hidden Trade-off:**
During real partitions, AWS services DO become unavailable. The 99.99% SLA is an average—specific partitions may cause longer outages. <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">The "high availability" comes from making partitions rare, not from avoiding the CAP trade-off</span>.

**Level 3 Follow-ups:**

**Q3.1.1: What happened during the AWS us-east-1 outage in 2017?**

A typo in a command removed more S3 servers than intended. The system couldn't recover because the subsystem for tracking server state was itself stored on the removed servers. Many AWS services (Lambda, ECS, etc.) depend on S3 for internal operations.

Key lesson: <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Distributed system failures are often cascading. Dependencies between services create unexpected failure modes</span>.

**Q3.1.2: How do multi-region architectures handle consistency?**

Options:
- **Active-Passive**: One region handles writes, others serve reads. Simple but failover is complex.
- **Active-Active**: All regions accept writes, conflict resolution needed. Complex but no single point of failure.
- **Region-Local**: Each region is independent, eventual consistency between them. Best for global latency.

<span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Cross-region latency (50-200ms) makes strong consistency expensive</span>. Most global services use eventual consistency between regions.

**Q3.1.3: How does Aurora Global Database handle CAP?**

Aurora Global uses storage-level replication:
- Primary region: strongly consistent (synchronous)
- Secondary regions: eventual consistency (~1 second lag typical)
- During failover, secondary is promoted, accepting potential data loss

<span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">RPO (Recovery Point Objective) is ~1 second—you might lose up to 1 second of writes</span>. This is a CP system that accepts some availability loss during region failures.

</div>

**Q3.2: What's the difference between linearizability, sequential consistency, and causal consistency?**

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border: 1px solid #bbf7d0;">

These are different points on the consistency spectrum, each with different costs:

**Linearizability (Strongest):**
- Operations appear to execute atomically at some point between invocation and response
- <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">If operation A completes before B starts, A's effect must be visible to B</span>
- Real-time ordering is preserved
- Cost: Requires coordination, ~2 RTT latency

**Sequential Consistency:**
- Operations appear in some sequential order
- Each client's operations appear in program order
- <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">But real-time ordering may not be preserved across clients</span>
- Cost: Less than linearizability, still requires some coordination

**Causal Consistency:**
- If A causally precedes B (A→B), everyone sees A before B
- Concurrent operations may be seen in different orders by different clients
- <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">No coordination needed for non-conflicting operations</span>
- Cost: Can be implemented without blocking

**Example:**
```
Client 1: Write X=1
Client 1: Write X=2
Client 2: Read X → ?
```

- Linearizable: Must return 2 (if read starts after write completes)
- Sequentially consistent: Could return 1 or 2 (depends on interleaving)
- Causally consistent: Could return 1 or 2 (no causal relationship with Client 1)

**Level 3 Follow-ups:**

**Q3.2.1: Why is linearizability so expensive to implement?**

Linearizability requires knowing the global order of operations across all nodes. This requires:
1. A leader that serializes all operations, OR
2. Coordination between nodes for every operation

<span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Both approaches require network round-trips that add latency and create availability dependencies</span>.

**Q3.2.2: When is causal consistency sufficient?**

When operations have natural causality (A causes B) but no global ordering requirement:
- Social media: A comment on a post should appear after the post
- Collaborative editing: Edits should appear in causal order
- Messaging: Messages in a thread should be ordered

<span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Causal consistency is the strongest model achievable with always-available systems</span>.

**Q3.2.3: How do you implement causal consistency?**

Track causality using:
- **Version vectors**: Each client tracks the latest version it has seen from each node
- **Lamport timestamps**: Logical clocks that capture happens-before relationships
- **Explicit dependencies**: Each operation declares which operations it depends on

On read, only return data if all causal dependencies are satisfied.

</div>

**Q3.3: Can you give an example of a subtle CAP violation in a real system?**

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border: 1px solid #bbf7d0;">

**MongoDB "Rollback" Issue (Pre-4.0):**

MongoDB replicates from a primary to secondaries asynchronously. If the primary fails before replication completes:

1. Secondaries elect a new primary
2. Old primary recovers and sees it has writes the new primary doesn't have
3. <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">MongoDB "rolls back" these writes to a file—they're effectively lost unless manually recovered</span>

This means acknowledged writes (`w:1`) could disappear! Even `w:majority` has edge cases where the acknowledged majority could fail simultaneously.

**Cassandra Timestamp Collision:**

Cassandra uses last-write-wins based on client-provided timestamps. If two clients have clock skew:

1. Client A (clock slightly behind): writes X=1 at timestamp T
2. Client B (clock slightly ahead): writes X=2 at timestamp T+1
3. Client A's write might win even though it happened "after" from an external observer's perspective

<span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">This violates intuitive "most recent write wins" because clocks aren't perfectly synchronized</span>.

**Redis Cluster Split-Brain:**

Redis Cluster uses asynchronous replication for performance. During a partition:

1. Master in partition A accepts writes
2. Cluster promotes a replica in partition B to master
3. Now you have two masters accepting writes
4. When partition heals, data from one side is lost

<span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Redis explicitly documents this as a trade-off for high performance</span>.

**Level 3 Follow-ups:**

**Q3.3.1: How do you test for these subtle consistency violations?**

**Jepsen Testing Framework:**
- Simulates network partitions, clock skew, process crashes
- Runs concurrent operations with known expected outcomes
- Checks if results violate consistency guarantees
- <span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Has found bugs in almost every database it has tested</span>

**Q3.3.2: How did MongoDB address the rollback issue?**

MongoDB 4.0+ introduced:
- Retryable writes (client-side)
- Causal consistency sessions
- Change streams for observing rollbacks

MongoDB 5.0 introduced **speculative majority reads** that avoid reading data that might roll back.

**Q3.3.3: How should application developers handle these edge cases?**

1. **Idempotent operations**: Design so retries are safe
2. **Optimistic locking**: Use version numbers to detect conflicts
3. **Compensation**: Detect inconsistencies and fix them (reconciliation)
4. **Accept and document**: Some applications can tolerate rare inconsistencies

<span style="background: linear-gradient(to bottom, transparent 60%, #86efac 60%);">Never assume the database handles everything—design your application for partial failures</span>.

</div>

---

## Code Examples

### Python - CP System with Quorum

```python
from typing import List, Optional, Any
from dataclasses import dataclass
import time

@dataclass
class VersionedValue:
    value: Any
    version: int
    timestamp: float

class CPDatabase:
    """
    Consistency + Partition Tolerance database simulation.

    Key insight: This sacrifices availability during partitions.
    When quorum cannot be reached, requests FAIL rather than
    return potentially stale data.
    """

    def __init__(self, nodes: List['Node'], quorum_size: int = None):
        self.nodes = nodes
        # Quorum = majority ensures overlap between any two quorums
        self.quorum = quorum_size or (len(nodes) // 2 + 1)

    def write(self, key: str, value: Any) -> bool:
        """
        Write requires quorum acknowledgment.

        Trade-off: Higher latency (wait for quorum) but guaranteed
        that any subsequent quorum read will see this write.
        """
        version = int(time.time() * 1000)
        acks = 0

        for node in self.nodes:
            try:
                if node.write(key, value, version):
                    acks += 1
            except NetworkError:
                continue  # Node unreachable - partition or failure

        if acks < self.quorum:
            # CP choice: fail the request rather than accept inconsistency
            raise UnavailableError(
                f"Cannot reach quorum: {acks}/{self.quorum} nodes responded"
            )
        return True

    def read(self, key: str) -> Any:
        """
        Read from quorum and return most recent value.

        Why quorum read + quorum write works:
        With N=5, Q=3: write quorum and read quorum must overlap
        by at least one node, so we always see the latest write.
        """
        responses = []

        for node in self.nodes:
            try:
                response = node.read(key)
                if response:
                    responses.append(response)
            except NetworkError:
                continue

        if len(responses) < self.quorum:
            raise UnavailableError("Cannot reach read quorum")

        # Return value with highest version (most recent)
        latest = max(responses, key=lambda r: r.version)
        return latest.value
```

### Python - AP System with Eventual Consistency

```python
from dataclasses import dataclass, field
from typing import Dict, List, Any
import time

@dataclass
class VectorClock:
    """
    Track causality for conflict resolution.

    Why vector clocks instead of timestamps?
    - Immune to clock skew between nodes
    - Can definitively identify concurrent vs sequential writes
    - Enable causal consistency guarantees
    """
    clocks: Dict[str, int] = field(default_factory=dict)

    def increment(self, node_id: str):
        self.clocks[node_id] = self.clocks.get(node_id, 0) + 1

    def merge(self, other: 'VectorClock'):
        """Take element-wise maximum - the "join" operation."""
        for node_id, count in other.clocks.items():
            self.clocks[node_id] = max(
                self.clocks.get(node_id, 0), count
            )

    def dominates(self, other: 'VectorClock') -> bool:
        """True if self happened-after other (all elements >=, at least one >)."""
        dominated = False
        for node_id in set(self.clocks) | set(other.clocks):
            if self.clocks.get(node_id, 0) < other.clocks.get(node_id, 0):
                return False
            if self.clocks.get(node_id, 0) > other.clocks.get(node_id, 0):
                dominated = True
        return dominated

class APDatabase:
    """
    Availability + Partition Tolerance database simulation.

    Key insight: ALWAYS accepts writes locally, even during partitions.
    Trade-off: May serve stale data, requires conflict resolution.
    """

    def __init__(self, node_id: str):
        self.node_id = node_id
        self.data: Dict[str, tuple] = {}  # key -> (value, vector_clock)
        self.clock = VectorClock()
        self.sync_queue: List[tuple] = []

    def write(self, key: str, value: Any) -> bool:
        """
        Always accept writes locally.

        AP choice: Never fail a write request. Accept locally
        and sync later, even if it creates conflicts.
        """
        self.clock.increment(self.node_id)
        clock_copy = VectorClock(dict(self.clock.clocks))
        self.data[key] = (value, clock_copy)
        self.sync_queue.append((key, value, clock_copy))
        return True  # Always succeeds!

    def read(self, key: str) -> Any:
        """
        Always return local value (may be stale).

        AP choice: Respond immediately with local data rather
        than coordinating with other nodes.
        """
        if key in self.data:
            return self.data[key][0]
        return None  # Always responds!

    def receive_sync(self, key: str, value: Any, remote_clock: VectorClock):
        """
        Receive update from another node after partition heals.

        Conflict resolution strategy: Last-write-wins using vector clock sum.
        Alternative: Return both values to application for resolution.
        """
        self.clock.merge(remote_clock)

        if key not in self.data:
            self.data[key] = (value, remote_clock)
            return

        local_value, local_clock = self.data[key]

        # Check for concurrent writes (neither dominates)
        if not remote_clock.dominates(local_clock) and not local_clock.dominates(remote_clock):
            # CONFLICT! Both writes happened concurrently
            # Strategy: Use vector clock sum as tiebreaker (simple LWW)
            # Better: Return both values to application
            pass

        if remote_clock.dominates(local_clock):
            self.data[key] = (value, remote_clock)
```

### Go - Quorum-Based Read/Write

```go
package cap

import (
    "context"
    "errors"
    "sync"
    "time"
)

var ErrQuorumNotReached = errors.New("quorum not reached")

// QuorumStore implements a CP system using quorum consensus.
// Trade-off: Requests fail during partitions, but data is always consistent.
type QuorumStore struct {
    nodes       []*Node
    readQuorum  int
    writeQuorum int
}

func NewQuorumStore(nodes []*Node) *QuorumStore {
    n := len(nodes)
    return &QuorumStore{
        nodes:       nodes,
        // Majority quorum ensures read and write quorums overlap
        readQuorum:  n/2 + 1,
        writeQuorum: n/2 + 1,
    }
}

func (qs *QuorumStore) Write(ctx context.Context, key, value string) error {
    version := time.Now().UnixNano()

    var wg sync.WaitGroup
    var mu sync.Mutex
    acks := 0

    // Fan out writes to all nodes concurrently
    for _, node := range qs.nodes {
        wg.Add(1)
        go func(n *Node) {
            defer wg.Done()
            if err := n.Write(ctx, key, value, version); err == nil {
                mu.Lock()
                acks++
                mu.Unlock()
            }
        }(node)
    }

    wg.Wait()

    // CP choice: fail if we can't reach quorum
    if acks < qs.writeQuorum {
        return ErrQuorumNotReached
    }
    return nil
}

func (qs *QuorumStore) Read(ctx context.Context, key string) (string, error) {
    var wg sync.WaitGroup
    var mu sync.Mutex
    var responses []VersionedValue

    for _, node := range qs.nodes {
        wg.Add(1)
        go func(n *Node) {
            defer wg.Done()
            if val, err := n.Read(ctx, key); err == nil {
                mu.Lock()
                responses = append(responses, val)
                mu.Unlock()
            }
        }(node)
    }

    wg.Wait()

    if len(responses) < qs.readQuorum {
        return "", ErrQuorumNotReached
    }

    // Return highest version - guaranteed to be latest due to quorum overlap
    var latest VersionedValue
    for _, r := range responses {
        if r.Version > latest.Version {
            latest = r
        }
    }

    return latest.Value, nil
}
```

---

## Database CAP Classifications

| Database | Type | Partition Behavior | Normal Behavior | Notes |
|----------|------|-------------------|-----------------|-------|
| PostgreSQL (single) | CA* | N/A | Strongly consistent | *Not distributed |
| MongoDB | CP | Minority unavailable | Strong (w:majority) | Tunable |
| Cassandra | AP | All accept writes | Eventual by default | Tunable |
| DynamoDB | AP | Accept writes | Eventual default | Strong read option |
| Redis Cluster | CP | Minority unavailable | Strong | Async replication risk |
| CockroachDB | CP | Minority unavailable | Serializable | Raft-based |
| Spanner | CP | Minority unavailable | Linearizable | TrueTime |
| Riak | AP | Accept writes | Eventual | CRDTs supported |
| etcd | CP | Minority unavailable | Linearizable | Raft-based |
| ScyllaDB | AP | Accept writes | Eventual | Cassandra-compatible |

---

## Related Topics

- [[consensus-algorithms]](/topic/system-design/consensus-algorithms) - How CP systems achieve agreement
- [[database-replication]](/topic/system-design/database-replication) - Synchronous vs asynchronous replication
- [[eventual-consistency]](/topic/system-design/eventual-consistency) - AP system consistency models
- [[database-sharding]](/topic/system-design/database-sharding) - Partitioning data across nodes
- [[distributed-locking]](/topic/system-design/distributed-locking) - Coordination primitives
