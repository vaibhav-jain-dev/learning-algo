# CAP Theorem

## Overview

The <span style="color: #16a34a; font-weight: 600;">CAP Theorem</span> is one of the most fundamental concepts in distributed systems design. Proposed by computer scientist Eric Brewer in 2000 and later proven by Seth Gilbert and Nancy Lynch, it states that a distributed data store can only provide two out of three guarantees simultaneously: <span style="color: #16a34a; font-weight: 600;">Consistency</span>, <span style="color: #16a34a; font-weight: 600;">Availability</span>, and <span style="color: #16a34a; font-weight: 600;">Partition Tolerance</span>.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 20px; font-weight: 600;">THE CAP THEOREM TRIANGLE</h3>
<div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
<div style="display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border: 2px solid #22c55e; border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 160px;">
<div style="color: #166534; font-weight: 700; font-size: 16px;">Consistency (C)</div>
<div style="color: #15803d; font-size: 12px; margin-top: 4px;">All nodes see same data</div>
<div style="color: #15803d; font-size: 11px; margin-top: 2px;">at the same time</div>
</div>
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 2px solid #3b82f6; border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 160px;">
<div style="color: #1e40af; font-weight: 700; font-size: 16px;">Availability (A)</div>
<div style="color: #1d4ed8; font-size: 12px; margin-top: 4px;">Every request receives</div>
<div style="color: #1d4ed8; font-size: 11px; margin-top: 2px;">a response</div>
</div>
<div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); border: 2px solid #a855f7; border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 160px;">
<div style="color: #6b21a8; font-weight: 700; font-size: 16px;">Partition Tolerance (P)</div>
<div style="color: #7c3aed; font-size: 12px; margin-top: 4px;">System works despite</div>
<div style="color: #7c3aed; font-size: 11px; margin-top: 2px;">network failures</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 8px; padding: 12px 24px; margin-top: 8px;">
<span style="color: #92400e; font-weight: 600;">Key Insight: In distributed systems, you can only guarantee TWO!</span>
</div>
</div>
</div>

**The Simple Explanation**: Imagine you have data stored on multiple servers across the world. When a network cable gets cut between two data centers (a <span style="color: #16a34a; font-weight: 600;">partition</span>), you face a choice: either refuse some requests to keep data consistent, or accept requests but risk serving stale data. You cannot have both perfect consistency AND perfect availability when networks fail.

---

## Why It Matters: Real Company Examples

Understanding CAP Theorem is crucial because it drives fundamental architecture decisions at every major tech company:

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">REAL-WORLD CAP DECISIONS</h3>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
<div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #10b981;">
<div style="color: #065f46; font-weight: 700; margin-bottom: 8px;">Amazon DynamoDB (AP)</div>
<div style="color: #047857; font-size: 13px;">Shopping carts prioritize availability - a customer should always be able to add items, even if it means briefly seeing stale inventory counts.</div>
</div>
<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; margin-bottom: 8px;">Google Spanner (CP)</div>
<div style="color: #1d4ed8; font-size: 13px;">Bank transactions require strong consistency - you can never show incorrect balance, even if it means briefly rejecting requests.</div>
</div>
<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: 700; margin-bottom: 8px;">Netflix (AP)</div>
<div style="color: #b45309; font-size: 13px;">Video recommendations can be stale for a few seconds - availability matters more than showing the absolutely latest suggestions.</div>
</div>
<div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-radius: 12px; padding: 20px; border-left: 4px solid #ec4899;">
<div style="color: #9d174d; font-weight: 700; margin-bottom: 8px;">Stripe (CP)</div>
<div style="color: #be185d; font-size: 13px;">Payment processing demands consistency - double-charging a customer is unacceptable, so reject requests if uncertain.</div>
</div>
</div>
</div>

**Interview Insight**: Companies often ask "how would you design X?" The CAP theorem is usually the first design decision you need to articulate. Should your system prioritize never losing data (CP) or always being responsive (AP)?

---

## How It Works: The Three Guarantees

### Consistency (C)

<span style="color: #16a34a; font-weight: 600;">Linearizable consistency</span> means all nodes see the same data at the same time. After a successful write, every subsequent read from any node returns that value. This is also called <span style="color: #16a34a; font-weight: 600;">strong consistency</span> or <span style="color: #16a34a; font-weight: 600;">atomic consistency</span>.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 16px; font-weight: 600;">STRONG CONSISTENCY IN ACTION</h3>
<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
<div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap; justify-content: center;">
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 12px 20px; border-radius: 10px; text-align: center; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 600;">Client</div>
<div style="color: #3b82f6; font-size: 12px;">writes balance = $100</div>
</div>
<div style="color: #6366f1; font-size: 20px;">--></div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 12px 20px; border-radius: 10px; text-align: center; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 600;">Primary</div>
<div style="color: #15803d; font-size: 12px;">$100</div>
</div>
</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 32px; flex-wrap: wrap;">
<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #6366f1; font-size: 14px;">sync</div>
<div style="color: #6366f1; font-size: 20px;">|</div>
<div style="color: #6366f1; font-size: 20px;">v</div>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 16px 24px; border-radius: 10px; text-align: center; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 600;">Node A</div>
<div style="color: #15803d; font-size: 14px;">$100</div>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 16px 24px; border-radius: 10px; text-align: center; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 600;">Node B</div>
<div style="color: #15803d; font-size: 14px;">$100</div>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 16px 24px; border-radius: 10px; text-align: center; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 600;">Node C</div>
<div style="color: #15803d; font-size: 14px;">$100</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 8px; padding: 12px 20px; margin-top: 8px; border: 1px solid #86efac;">
<span style="color: #166534; font-weight: 600;">Result: Any node you read from shows $100 immediately</span>
</div>
</div>
</div>

### Availability (A)

Every request to a non-failing node receives a response (success or failure), without guarantee that it contains the most recent write. The system is <span style="color: #16a34a; font-weight: 600;">always responsive</span>, even during network issues.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 16px; font-weight: 600;">HIGH AVAILABILITY PATTERN</h3>
<div style="display: flex; flex-direction: column; gap: 12px; max-width: 600px; margin: 0 auto;">
<div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 10px 16px; border-radius: 8px; color: #1e40af; font-weight: 600; min-width: 80px; text-align: center; border: 1px solid #93c5fd;">Client 1</div>
<div style="color: #6366f1;">--></div>
<div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 10px 16px; border-radius: 8px; color: #475569; border: 1px solid #cbd5e1;">Node A</div>
<div style="color: #6366f1;">--></div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 10px 16px; border-radius: 8px; color: #166534; font-weight: 600; border: 1px solid #86efac;">Response OK</div>
</div>
<div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 10px 16px; border-radius: 8px; color: #1e40af; font-weight: 600; min-width: 80px; text-align: center; border: 1px solid #93c5fd;">Client 2</div>
<div style="color: #6366f1;">--></div>
<div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 10px 16px; border-radius: 8px; color: #475569; border: 1px solid #cbd5e1;">Node B</div>
<div style="color: #6366f1;">--></div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 10px 16px; border-radius: 8px; color: #166534; font-weight: 600; border: 1px solid #86efac;">Response OK</div>
</div>
<div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 10px 16px; border-radius: 8px; color: #1e40af; font-weight: 600; min-width: 80px; text-align: center; border: 1px solid #93c5fd;">Client 3</div>
<div style="color: #6366f1;">--></div>
<div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 10px 16px; border-radius: 8px; color: #475569; border: 1px solid #cbd5e1;">Node C</div>
<div style="color: #6366f1;">--></div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 10px 16px; border-radius: 8px; color: #166534; font-weight: 600; border: 1px solid #86efac;">Response OK</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 8px; padding: 12px 20px; margin-top: 16px; text-align: center; border: 1px solid #93c5fd;">
<span style="color: #1e40af; font-weight: 600;">Result: Every request gets a response (may be stale data)</span>
</div>
</div>

### Partition Tolerance (P)

The system continues to operate despite arbitrary message loss or failure of part of the network. <span style="color: #16a34a; font-weight: 600;">Network partitions are inevitable</span> in distributed systems - cables get cut, routers fail, packets get lost.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 16px; font-weight: 600;">NETWORK PARTITION SCENARIO</h3>
<div style="display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 24px 32px; border-radius: 12px; text-align: center; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; font-size: 16px;">Data Center A</div>
<div style="color: #3b82f6; font-size: 13px; margin-top: 4px;">Nodes 1, 2, 3</div>
<div style="background: #eff6ff; border-radius: 6px; padding: 8px; margin-top: 12px;">
<div style="color: #1d4ed8; font-size: 12px;">3 healthy nodes</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%); border: 3px dashed #ef4444; padding: 16px 24px; border-radius: 8px;">
<div style="color: #dc2626; font-weight: 700; font-size: 14px;">NETWORK SPLIT</div>
<div style="color: #b91c1c; font-size: 11px; margin-top: 4px;">Cannot communicate</div>
<div style="color: #dc2626; font-size: 20px; margin-top: 8px;">X</div>
</div>
<div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); padding: 24px 32px; border-radius: 12px; text-align: center; border: 2px solid #a855f7;">
<div style="color: #6b21a8; font-weight: 700; font-size: 16px;">Data Center B</div>
<div style="color: #7c3aed; font-size: 13px; margin-top: 4px;">Nodes 4, 5, 6</div>
<div style="background: #faf5ff; border-radius: 6px; padding: 8px; margin-top: 12px;">
<div style="color: #7c3aed; font-size: 12px;">3 healthy nodes</div>
</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 8px; padding: 12px 20px; margin-top: 20px; text-align: center; border: 1px solid #fcd34d;">
<span style="color: #92400e; font-weight: 600;">Question: Should both sides keep serving requests?</span>
</div>
</div>

---

## The Trade-off: Why You Must Choose

In a distributed system, network partitions WILL happen. When they do, you face an impossible choice:

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">THE PARTITION DILEMMA</h3>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
<div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 12px; padding: 24px; border: 2px solid #10b981;">
<div style="color: #065f46; font-weight: 700; font-size: 16px; margin-bottom: 12px;">OPTION 1: Choose Consistency (CP)</div>
<div style="color: #047857; font-size: 14px; margin-bottom: 16px;">
        "I cannot confirm the other data center received this update..."<br><br>
<span style="font-weight: 600;">"REJECT the request to avoid inconsistency!"</span>
</div>
<div style="display: flex; flex-direction: column; gap: 6px; font-size: 13px;">
<span style="color: #166534;">+ Data always consistent across nodes</span>
<span style="color: #166534;">+ No stale reads or conflicts</span>
<span style="color: #dc2626;">- Some requests will fail during partition</span>
<span style="color: #dc2626;">- Higher latency for coordination</span>
</div>
</div>
<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; font-size: 16px; margin-bottom: 12px;">OPTION 2: Choose Availability (AP)</div>
<div style="color: #1d4ed8; font-size: 14px; margin-bottom: 16px;">
        "I'll accept the write locally and sync later..."<br><br>
<span style="font-weight: 600;">"ACCEPT the request, deal with conflicts later!"</span>
</div>
<div style="display: flex; flex-direction: column; gap: 6px; font-size: 13px;">
<span style="color: #166534;">+ All requests succeed (always responsive)</span>
<span style="color: #166534;">+ Lower latency, no coordination wait</span>
<span style="color: #dc2626;">- May return stale data</span>
<span style="color: #dc2626;">- Requires conflict resolution strategy</span>
</div>
</div>
</div>
</div>

---

## CP vs AP Systems: Deep Comparison

### CP Systems (Consistency + Partition Tolerance)

<span style="color: #16a34a; font-weight: 600;">CP systems</span> sacrifice availability during partitions. They use techniques like [[quorum consensus]](/topic/system-design/consensus-algorithms) to ensure data consistency, meaning some requests will be rejected when nodes cannot communicate.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">CP SYSTEM: QUORUM CONSENSUS</h3>
<div style="color: #64748b; text-align: center; margin-bottom: 20px; font-size: 13px;">5 nodes, quorum = 3 (majority required for any operation)</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 10px; padding: 20px; border: 1px solid #86efac;">
<div style="color: #166534; font-weight: 600; margin-bottom: 12px;">Normal Operation</div>
<div style="font-size: 13px; color: #15803d; line-height: 1.8;">
        Write to Node A: ACK<br>
        Write to Node B: ACK<br>
        Write to Node C: ACK<br>
<span style="font-weight: 600; background: rgba(34, 197, 94, 0.2); padding: 2px 6px; border-radius: 4px;">3/5 = Quorum reached = SUCCESS</span>
</div>
</div>
<div style="background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%); border-radius: 10px; padding: 20px; border: 1px solid #fca5a5;">
<div style="color: #dc2626; font-weight: 600; margin-bottom: 12px;">During Partition</div>
<div style="font-size: 13px; color: #b91c1c; line-height: 1.8;">
        Write to Node A: ACK<br>
        Write to Node B: UNREACHABLE<br>
        Write to Node C: UNREACHABLE<br>
<span style="font-weight: 600; background: rgba(239, 68, 68, 0.2); padding: 2px 6px; border-radius: 4px;">1/5 &lt; Quorum = REQUEST REJECTED</span>
</div>
</div>
</div>
</div>

**CP System Examples:**

| Database | Consistency Mechanism | Use Case |
|----------|----------------------|----------|
| **MongoDB** (default) | Majority write concern | Document storage, CMS |
| **HBase** | Strong consistency via ZooKeeper | Analytics, time-series |
| **Redis Cluster** | WAIT command for sync replication | Caching with consistency |
| **Zookeeper** | Zab consensus protocol | Coordination, leader election |
| **etcd** | Raft consensus | Kubernetes config, service discovery |
| **CockroachDB** | Serializable transactions | Financial applications |
| **Google Spanner** | TrueTime + Paxos | Global transactions |

### AP Systems (Availability + Partition Tolerance)

<span style="color: #16a34a; font-weight: 600;">AP systems</span> sacrifice consistency during partitions. They accept writes on any available node and reconcile later using [[eventual consistency]](/topic/system-design/event-sourcing) strategies.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">AP SYSTEM: EVENTUAL CONSISTENCY</h3>
<div style="display: flex; flex-direction: column; gap: 24px;">
<div>
  <div style="color: #f59e0b; font-weight: 600; margin-bottom: 12px;">During Partition (Divergent State):</div>
  <div style="display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap;">
  <div style="text-align: center;">
  <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 14px 20px; border-radius: 8px; border: 2px solid #3b82f6;">
  <div style="color: #1e40af; font-weight: 600;">Node A</div>
  <div style="color: #3b82f6; font-size: 13px;">X = 10</div>
</div>
<div style="color: #166534; font-size: 12px; margin-top: 4px;">Write accepted!</div>
</div>
<div style="background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%); border: 2px dashed #ef4444; padding: 8px 16px; border-radius: 6px;">
<span style="color: #dc2626; font-weight: 600; font-size: 12px;">PARTITION</span>
</div>
<div style="text-align: center;">
<div style="background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%); padding: 14px 20px; border-radius: 8px; border: 2px solid #ef4444;">
<div style="color: #dc2626; font-weight: 600;">Node B</div>
<div style="color: #b91c1c; font-size: 13px;">X = 5 (stale)</div>
</div>
<div style="color: #b91c1c; font-size: 12px; margin-top: 4px;">Returns old value</div>
</div>
</div>
</div>
<div>
  <div style="color: #16a34a; font-weight: 600; margin-bottom: 12px;">After Partition Heals (Convergent State):</div>
  <div style="display: flex; align-items: center; justify-content: center; gap: 24px;">
  <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 14px 20px; border-radius: 8px; border: 2px solid #22c55e;">
  <div style="color: #166534; font-weight: 600;">Node A</div>
  <div style="color: #15803d; font-size: 13px;">X = 10</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #22c55e; font-size: 14px;">anti-entropy</div>
<div style="color: #22c55e; font-size: 14px;">sync</div>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 14px 20px; border-radius: 8px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 600;">Node B</div>
<div style="color: #15803d; font-size: 13px;">X = 10</div>
</div>
</div>
</div>
</div>
</div>

**AP System Examples:**

| Database | Consistency Model | Use Case |
|----------|------------------|----------|
| **Cassandra** | Tunable consistency, eventual by default | Time-series, messaging |
| **DynamoDB** | Eventual consistency default | Shopping carts, sessions |
| **CouchDB** | MVCC, eventual consistency | Offline-first apps |
| **Riak** | Vector clocks, siblings | High availability storage |
| **Amazon S3** | Eventual consistency (now strong for PUTs) | Object storage |
| **Voldemort** | Vector clocks | LinkedIn's key-value store |

---

## PACELC Theorem: Beyond CAP

The <span style="color: #16a34a; font-weight: 600;">PACELC theorem</span> extends CAP by addressing what happens when there is NO partition. Proposed by Daniel Abadi in 2010, it states:

> **P**artition? **A**vailability vs **C**onsistency, **E**lse **L**atency vs **C**onsistency

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">PACELC THEOREM</h3>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
<div style="background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%); border-radius: 12px; padding: 20px; border: 2px solid #ef4444;">
<div style="color: #dc2626; font-weight: 700; font-size: 16px; margin-bottom: 12px; text-align: center;">IF PARTITION (P)</div>
<div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 12px;">
<div style="background: #fff; padding: 10px 16px; border-radius: 8px; text-align: center; border: 1px solid #fca5a5;">
<div style="color: #1e40af; font-weight: 600;">A</div>
<div style="color: #64748b; font-size: 11px;">Availability</div>
</div>
<div style="color: #dc2626; font-weight: 700; padding-top: 12px;">vs</div>
<div style="background: #fff; padding: 10px 16px; border-radius: 8px; text-align: center; border: 1px solid #fca5a5;">
<div style="color: #16a34a; font-weight: 600;">C</div>
<div style="color: #64748b; font-size: 11px;">Consistency</div>
</div>
</div>
<div style="color: #991b1b; font-size: 12px; text-align: center;">Same as CAP: choose A or C</div>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 20px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 700; font-size: 16px; margin-bottom: 12px; text-align: center;">ELSE (Normal Operation)</div>
<div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 12px;">
<div style="background: #fff; padding: 10px 16px; border-radius: 8px; text-align: center; border: 1px solid #86efac;">
<div style="color: #f59e0b; font-weight: 600;">L</div>
<div style="color: #64748b; font-size: 11px;">Latency</div>
</div>
<div style="color: #166534; font-weight: 700; padding-top: 12px;">vs</div>
<div style="background: #fff; padding: 10px 16px; border-radius: 8px; text-align: center; border: 1px solid #86efac;">
<div style="color: #16a34a; font-weight: 600;">C</div>
<div style="color: #64748b; font-size: 11px;">Consistency</div>
</div>
</div>
<div style="color: #166534; font-size: 12px; text-align: center;">New insight: coordination adds latency</div>
</div>
</div>
</div>

### PACELC Classifications

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

| System | During Partition (PAC) | Normal Operation (ELC) | Classification |
|--------|----------------------|----------------------|----------------|
| **DynamoDB** | A (Availability) | L (Latency) | PA/EL |
| **Cassandra** | A (Availability) | L (Latency) | PA/EL |
| **Riak** | A (Availability) | L (Latency) | PA/EL |
| **MongoDB** | C (Consistency) | L (Latency) | PC/EL |
| **PNUTS** | C (Consistency) | L (Latency) | PC/EL |
| **Spanner** | C (Consistency) | C (Consistency) | PC/EC |
| **VoltDB** | C (Consistency) | C (Consistency) | PC/EC |
| **CockroachDB** | C (Consistency) | C (Consistency) | PC/EC |

</div>

**Key Insight**: Even when the network is healthy, choosing strong consistency means waiting for coordination between nodes, adding latency. Systems like Spanner (PC/EC) prioritize consistency always, accepting higher latency as the cost.

---

## Partition Handling Strategies

When a network partition occurs, systems use various strategies to handle it:

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">PARTITION HANDLING STRATEGIES</h3>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 24px;">
<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 20px; border: 1px solid #93c5fd;">
<div style="color: #1e40af; font-weight: 700; margin-bottom: 12px;">1. Quorum-Based Decisions</div>
<div style="color: #1e293b; font-size: 13px; line-height: 1.6;">
        Majority side continues operating. Minority side rejects writes.
<div style="margin-top: 8px; padding: 8px; background: rgba(59, 130, 246, 0.1); border-radius: 6px;">
<span style="color: #1e40af; font-size: 12px;">Used by: Raft, Paxos, MongoDB</span>
</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 20px; border: 1px solid #86efac;">
<div style="color: #166534; font-weight: 700; margin-bottom: 12px;">2. Last-Write-Wins (LWW)</div>
<div style="color: #1e293b; font-size: 13px; line-height: 1.6;">
        Accept all writes, resolve conflicts using timestamps. Most recent timestamp wins.
<div style="margin-top: 8px; padding: 8px; background: rgba(34, 197, 94, 0.1); border-radius: 6px;">
<span style="color: #166534; font-size: 12px;">Used by: Cassandra, DynamoDB</span>
</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; border: 1px solid #fcd34d;">
<div style="color: #92400e; font-weight: 700; margin-bottom: 12px;">3. Vector Clocks</div>
<div style="color: #1e293b; font-size: 13px; line-height: 1.6;">
        Track causality to detect concurrent writes. Keep multiple versions (siblings) for manual resolution.
<div style="margin-top: 8px; padding: 8px; background: rgba(245, 158, 11, 0.1); border-radius: 6px;">
<span style="color: #92400e; font-size: 12px;">Used by: Riak, Voldemort</span>
</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-radius: 12px; padding: 20px; border: 1px solid #f9a8d4;">
<div style="color: #9d174d; font-weight: 700; margin-bottom: 12px;">4. CRDTs</div>
<div style="color: #1e293b; font-size: 13px; line-height: 1.6;">
        Conflict-free Replicated Data Types. Data structures that automatically merge without conflicts.
<div style="margin-top: 8px; padding: 8px; background: rgba(236, 72, 153, 0.1); border-radius: 6px;">
<span style="color: #9d174d; font-size: 12px;">Used by: Redis (CRDB), Riak</span>
</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); border-radius: 12px; padding: 20px; border: 1px solid #c4b5fd;">
<div style="color: #6b21a8; font-weight: 700; margin-bottom: 12px;">5. Sloppy Quorum + Hinted Handoff</div>
<div style="color: #1e293b; font-size: 13px; line-height: 1.6;">
        Write to any available nodes (even non-replica). Hand off to correct nodes when they recover.
<div style="margin-top: 8px; padding: 8px; background: rgba(139, 92, 246, 0.1); border-radius: 6px;">
<span style="color: #6b21a8; font-size: 12px;">Used by: DynamoDB, Cassandra</span>
</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%); border-radius: 12px; padding: 20px; border: 1px solid #fca5a5;">
<div style="color: #991b1b; font-weight: 700; margin-bottom: 12px;">6. Read Repair + Anti-Entropy</div>
<div style="color: #1e293b; font-size: 13px; line-height: 1.6;">
        On read, detect inconsistencies and repair them. Background process syncs all replicas.
<div style="margin-top: 8px; padding: 8px; background: rgba(239, 68, 68, 0.1); border-radius: 6px;">
<span style="color: #991b1b; font-size: 12px;">Used by: Cassandra, DynamoDB</span>
</div>
</div>
</div>
</div>
</div>

### Sloppy Quorum and Hinted Handoff Explained

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 16px; font-weight: 600;">SLOPPY QUORUM + HINTED HANDOFF</h3>
<div style="display: flex; flex-direction: column; gap: 24px;">
<div>
  <div style="color: #dc2626; font-weight: 600; margin-bottom: 12px;">Step 1: Partition occurs, preferred nodes unreachable</div>
  <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
  <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 12px 18px; border-radius: 8px; border: 2px solid #3b82f6;">
  <div style="color: #1e40af; font-weight: 600;">Client</div>
  <div style="color: #3b82f6; font-size: 11px;">write key=K</div>
</div>
<div style="color: #6366f1;">--></div>
<div style="opacity: 0.4; background: linear-gradient(135deg, #fecaca 0%, #fee2e2 100%); padding: 12px 18px; border-radius: 8px; border: 2px dashed #ef4444;">
<div style="color: #991b1b; font-weight: 600;">Node A</div>
<div style="color: #dc2626; font-size: 11px;">UNREACHABLE</div>
</div>
<div style="opacity: 0.4; background: linear-gradient(135deg, #fecaca 0%, #fee2e2 100%); padding: 12px 18px; border-radius: 8px; border: 2px dashed #ef4444;">
<div style="color: #991b1b; font-weight: 600;">Node B</div>
<div style="color: #dc2626; font-size: 11px;">UNREACHABLE</div>
</div>
</div>
</div>
<div>
  <div style="color: #f59e0b; font-weight: 600; margin-bottom: 12px;">Step 2: Write to available nodes with hint</div>
  <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
  <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 12px 18px; border-radius: 8px; border: 2px solid #22c55e;">
  <div style="color: #166534; font-weight: 600;">Node X</div>
  <div style="color: #15803d; font-size: 11px;">hint: "for Node A"</div>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 12px 18px; border-radius: 8px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 600;">Node Y</div>
<div style="color: #15803d; font-size: 11px;">hint: "for Node B"</div>
</div>
</div>
</div>
<div>
  <div style="color: #16a34a; font-weight: 600; margin-bottom: 12px;">Step 3: Partition heals, hints handed off</div>
  <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
  <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); padding: 12px 18px; border-radius: 8px; border: 1px solid #cbd5e1;">
  <div style="color: #475569; font-weight: 600;">Node X</div>
  <div style="color: #64748b; font-size: 11px;">sends to A</div>
</div>
<div style="color: #22c55e; font-weight: 600;">--></div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 12px 18px; border-radius: 8px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 600;">Node A</div>
<div style="color: #15803d; font-size: 11px;">data restored</div>
</div>
</div>
</div>
</div>
</div>

---

## Database CAP/PACELC Classifications

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

| Database | CAP | PACELC | Tunable | Notes |
|----------|-----|--------|---------|-------|
| **PostgreSQL** (single) | CA* | N/A | No | *Not distributed |
| **MongoDB** | CP | PC/EC | Yes | Write concern adjustable |
| **Cassandra** | AP | PA/EL | Yes | Consistency level per query |
| **DynamoDB** | AP | PA/EL | Yes | Eventually consistent default |
| **Redis Cluster** | CP | PC/EL | Limited | WAIT for sync |
| **CockroachDB** | CP | PC/EC | No | Serializable always |
| **Google Spanner** | CP | PC/EC | No | TrueTime enables global consistency |
| **Riak** | AP | PA/EL | Yes | Tunable N/R/W values |
| **etcd** | CP | PC/EC | No | Raft consensus |
| **Consul** | CP | PC/EC | No | Raft consensus |
| **CouchDB** | AP | PA/EL | No | Multi-master replication |
| **ScyllaDB** | AP | PA/EL | Yes | Cassandra-compatible |
| **TiDB** | CP | PC/EL | Yes | Raft + async replication |
| **YugabyteDB** | CP | PC/EC | Yes | Raft per tablet |

</div>

---

## Code Examples

### Python - CP System with Quorum

```python
from typing import List, Optional, Any
from dataclasses import dataclass
import time
import threading

@dataclass
class VersionedValue:
    value: Any
    version: int
    timestamp: float

class NetworkError(Exception):
    """Raised when a node is unreachable."""
    pass

class UnavailableError(Exception):
    """Raised when quorum cannot be reached."""
    pass

class CPDatabase:
    """
    Consistency + Partition Tolerance database simulation.

    Sacrifices availability during partitions - rejects requests
    when quorum cannot be reached.
    """

    def __init__(self, nodes: List['Node'], quorum_size: int = None):
        self.nodes = nodes
        # Default to majority quorum
        self.quorum = quorum_size or (len(nodes) // 2 + 1)
        self.lock = threading.Lock()

    def write(self, key: str, value: Any) -> bool:
        """
        Write requires quorum acknowledgment.

        Blocks until quorum is reached or raises UnavailableError.
        """
        version = int(time.time() * 1000)
        acks = 0
        errors = []

        for node in self.nodes:
            try:
                if node.write(key, value, version):
                    acks += 1
            except NetworkError as e:
                errors.append(str(e))
                continue  # Node unreachable due to partition

        if acks < self.quorum:
            raise UnavailableError(
                f"Cannot reach quorum: {acks}/{self.quorum} nodes responded. "
                f"Errors: {errors}"
            )
        return True

    def read(self, key: str) -> Any:
        """
        Read from quorum and return most recent value.

        Uses read-repair to fix stale replicas.
        """
        responses = []

        for node in self.nodes:
            try:
                response = node.read(key)
                if response:
                    responses.append((node, response))
            except NetworkError:
                continue

        if len(responses) < self.quorum:
            raise UnavailableError("Cannot reach read quorum")

        # Find the most recent value (highest version)
        latest = max(responses, key=lambda r: r[1].version)

        # Read repair: update stale nodes
        for node, response in responses:
            if response.version < latest[1].version:
                try:
                    node.write(key, latest[1].value, latest[1].version)
                except NetworkError:
                    pass  # Best effort repair

        return latest[1].value
```

### Python - AP System with Vector Clocks

```python
from dataclasses import dataclass, field
from typing import Dict, List, Any, Optional
import time
import copy

@dataclass
class VectorClock:
    """
    Track causality for conflict resolution.

    Vector clocks allow detecting concurrent writes that
    need application-level conflict resolution.
    """
    clocks: Dict[str, int] = field(default_factory=dict)

    def increment(self, node_id: str):
        """Increment this node's clock component."""
        self.clocks[node_id] = self.clocks.get(node_id, 0) + 1

    def merge(self, other: 'VectorClock'):
        """Merge with another vector clock (take max of each component)."""
        for node_id, count in other.clocks.items():
            self.clocks[node_id] = max(
                self.clocks.get(node_id, 0), count
            )

    def dominates(self, other: 'VectorClock') -> bool:
        """Check if this clock happened-after the other."""
        dominated = False
        for node_id in set(self.clocks.keys()) | set(other.clocks.keys()):
            my_count = self.clocks.get(node_id, 0)
            other_count = other.clocks.get(node_id, 0)
            if my_count < other_count:
                return False
            if my_count > other_count:
                dominated = True
        return dominated

    def concurrent_with(self, other: 'VectorClock') -> bool:
        """Check if two events are concurrent (neither dominates)."""
        return not self.dominates(other) and not other.dominates(self)

class APDatabase:
    """
    Availability + Partition Tolerance database simulation.

    Always accepts writes locally. Uses vector clocks to
    detect conflicts during sync.
    """

    def __init__(self, node_id: str):
        self.node_id = node_id
        self.data: Dict[str, List[tuple]] = {}  # key -> [(value, vector_clock)]
        self.clock = VectorClock()
        self.sync_queue: List[tuple] = []

    def write(self, key: str, value: Any) -> bool:
        """
        Always accept writes locally - never fails!

        Returns True immediately. Conflict resolution happens
        during reads or background sync.
        """
        self.clock.increment(self.node_id)
        clock_copy = VectorClock(dict(self.clock.clocks))

        # Store as new version (may create siblings)
        if key not in self.data:
            self.data[key] = []

        # Remove dominated versions, keep concurrent ones
        new_versions = []
        for existing_value, existing_clock in self.data[key]:
            if not clock_copy.dominates(existing_clock):
                new_versions.append((existing_value, existing_clock))

        new_versions.append((value, clock_copy))
        self.data[key] = new_versions

        # Queue for async replication
        self.sync_queue.append((key, value, clock_copy))
        return True  # Always succeeds!

    def read(self, key: str) -> Any:
        """
        Always return local value - never fails!

        May return multiple values (siblings) if there are
        unresolved conflicts.
        """
        if key not in self.data:
            return None

        versions = self.data[key]
        if len(versions) == 1:
            return versions[0][0]  # Single value, no conflict

        # Multiple concurrent versions - return all for resolution
        return [v[0] for v in versions]

    def resolve_conflicts(self, key: str, resolved_value: Any):
        """Application-level conflict resolution."""
        self.clock.increment(self.node_id)
        clock_copy = VectorClock(dict(self.clock.clocks))

        # Merge all existing clocks
        for _, existing_clock in self.data.get(key, []):
            clock_copy.merge(existing_clock)

        # Replace all versions with resolved value
        self.data[key] = [(resolved_value, clock_copy)]

    def receive_sync(self, key: str, value: Any, remote_clock: VectorClock):
        """
        Receive update from another node after partition heals.

        Merges with local state, potentially creating siblings.
        """
        self.clock.merge(remote_clock)

        if key not in self.data:
            self.data[key] = [(value, remote_clock)]
            return

        # Check relationship with existing versions
        new_versions = []
        is_dominated = False

        for existing_value, existing_clock in self.data[key]:
            if remote_clock.dominates(existing_clock):
                # Remote is newer, discard local
                continue
            elif existing_clock.dominates(remote_clock):
                # Local is newer, ignore remote
                is_dominated = True
                new_versions.append((existing_value, existing_clock))
            else:
                # Concurrent - keep both as siblings
                new_versions.append((existing_value, existing_clock))

        if not is_dominated:
            new_versions.append((value, remote_clock))

        self.data[key] = new_versions
```

### Go - CRDT Counter for AP Systems

```go
package cap

import (
    "sync"
)

// GCounter implements a grow-only counter CRDT.
// Multiple nodes can increment concurrently, and
// all counters automatically converge on merge.
type GCounter struct {
    nodeID string
    counts map[string]uint64
    mu     sync.RWMutex
}

func NewGCounter(nodeID string) *GCounter {
    return &GCounter{
        nodeID: nodeID,
        counts: make(map[string]uint64),
    }
}

// Increment adds to this node's counter.
// Can be called during partition - always succeeds.
func (gc *GCounter) Increment(delta uint64) {
    gc.mu.Lock()
    defer gc.mu.Unlock()
    gc.counts[gc.nodeID] += delta
}

// Value returns the total count across all nodes.
func (gc *GCounter) Value() uint64 {
    gc.mu.RLock()
    defer gc.mu.RUnlock()

    var total uint64
    for _, count := range gc.counts {
        total += count
    }
    return total
}

// Merge combines with another counter.
// Called when partition heals - automatically resolves conflicts.
func (gc *GCounter) Merge(other *GCounter) {
    gc.mu.Lock()
    defer gc.mu.Unlock()
    other.mu.RLock()
    defer other.mu.RUnlock()

    for nodeID, count := range other.counts {
        if existing, ok := gc.counts[nodeID]; !ok || count > existing {
            gc.counts[nodeID] = count
        }
    }
}

// PNCounter implements a positive-negative counter CRDT.
// Supports both increment and decrement operations.
type PNCounter struct {
    nodeID string
    pos    *GCounter
    neg    *GCounter
}

func NewPNCounter(nodeID string) *PNCounter {
    return &PNCounter{
        nodeID: nodeID,
        pos:    NewGCounter(nodeID),
        neg:    NewGCounter(nodeID),
    }
}

func (pn *PNCounter) Increment(delta uint64) {
    pn.pos.Increment(delta)
}

func (pn *PNCounter) Decrement(delta uint64) {
    pn.neg.Increment(delta)
}

func (pn *PNCounter) Value() int64 {
    return int64(pn.pos.Value()) - int64(pn.neg.Value())
}

func (pn *PNCounter) Merge(other *PNCounter) {
    pn.pos.Merge(other.pos)
    pn.neg.Merge(other.neg)
}
```

---

## Common Pitfalls

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
<div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">1. Thinking CA is Possible in Distributed Systems</div>
<div style="color: #7f1d1d; font-size: 14px;">Network partitions WILL happen. Any truly distributed system must be partition-tolerant. "CA systems" like single-node PostgreSQL are not distributed - they have no partitions because there is no network between nodes.</div>
</div>

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
<div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">2. Confusing CAP Consistency with ACID Consistency</div>
<div style="color: #7f1d1d; font-size: 14px;">CAP consistency means all nodes see the same data (linearizability). ACID consistency means data satisfies integrity constraints (foreign keys, check constraints). A CP system can still have ACID violations if transactions are not properly implemented.</div>
</div>

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
<div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">3. Treating CAP as Binary</div>
<div style="color: #7f1d1d; font-size: 14px;">Real systems exist on a spectrum. Many databases offer tunable consistency - you can choose different consistency levels per operation. DynamoDB, Cassandra, and MongoDB all offer this flexibility. You might use strong consistency for payments but eventual consistency for analytics.</div>
</div>

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
<div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">4. Ignoring Latency (PACELC)</div>
<div style="color: #7f1d1d; font-size: 14px;">CAP only describes behavior during partitions. The PACELC theorem extends this: even when no partition exists, you must choose between latency and consistency. Strong consistency requires coordination, which adds latency. A geo-distributed CP system might have 200ms write latency.</div>
</div>

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
<div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">5. Not Understanding What "Availability" Means in CAP</div>
<div style="color: #7f1d1d; font-size: 14px;">CAP availability is absolute: every non-failing node must respond. This is different from "five nines" availability (99.999% uptime). A CP system can have excellent uptime but sacrifice CAP availability during rare partitions.</div>
</div>

---

## Interview Questions: 3-Level Deep Dive

### Level 1: Conceptual Understanding

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

**Q1: Why can't we have all three CAP guarantees?**

A: During a <span style="color: #16a34a; font-weight: 600;">network partition</span>, nodes cannot communicate. If a write comes in, you must either:
- Accept it on available nodes (sacrificing consistency - other nodes have stale data)
- Reject it until partition heals (sacrificing availability)

You cannot both accept the write AND guarantee all nodes are consistent when they can't communicate.

<div style="background: rgba(59, 130, 246, 0.1); border-radius: 8px; padding: 16px; margin-top: 16px;">
<strong style="color: #1e40af;">Follow-up Q1.1: But what if partitions never happen?</strong>

A: This is the key insight of <span style="color: #16a34a; font-weight: 600;">PACELC theorem</span>. Even without partitions, you still face a tradeoff: Latency vs Consistency. Achieving strong consistency requires coordination between nodes (waiting for acknowledgments), which adds latency. You can't have both zero-latency AND strong consistency.

<div style="background: rgba(59, 130, 246, 0.15); border-radius: 6px; padding: 12px; margin-top: 12px;">
<strong style="color: #1e40af;">Follow-up Q1.1.1: How does Google Spanner achieve strong consistency with low latency?</strong>

A: Spanner uses <span style="color: #16a34a; font-weight: 600;">TrueTime</span> - GPS-synchronized atomic clocks in every data center that bound clock uncertainty to ~7ms. This allows Spanner to assign globally-ordered timestamps without cross-datacenter round trips for reads. But writes still require Paxos consensus, so write latency is still bounded by network latency between datacenters (typically 50-100ms for global deployments).
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

**Q2: Is MongoDB CP or AP?**

A: MongoDB is <span style="color: #16a34a; font-weight: 600;">CP by default</span> (requires majority acknowledgment for writes), but can be configured for AP behavior with `{w: 1, j: false}` settings. This is a great example of how modern databases offer <span style="color: #16a34a; font-weight: 600;">tunable consistency</span>.

<div style="background: rgba(59, 130, 246, 0.1); border-radius: 8px; padding: 16px; margin-top: 16px;">
<strong style="color: #1e40af;">Follow-up Q2.1: What happens to writes during a MongoDB replica set election?</strong>

A: Writes are rejected during election (typically 10-12 seconds). This is the CP trade-off - availability is sacrificed to maintain consistency. Clients receive a "not primary" error and must retry. The election timeout is configurable but lowering it risks split-brain scenarios.

<div style="background: rgba(59, 130, 246, 0.15); border-radius: 6px; padding: 12px; margin-top: 12px;">
<strong style="color: #1e40af;">Follow-up Q2.1.1: How can you minimize impact of elections on application availability?</strong>

A: Several strategies:
1. <span style="color: #16a34a; font-weight: 600;">Retryable writes</span>: MongoDB 3.6+ automatically retries failed writes on new primary
2. <span style="color: #16a34a; font-weight: 600;">Connection pooling with retry logic</span>: Application retries with exponential backoff
3. <span style="color: #16a34a; font-weight: 600;">Read preference configuration</span>: Route reads to secondaries during election
4. <span style="color: #16a34a; font-weight: 600;">Priority configuration</span>: Ensure preferred primary to reduce unexpected elections
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

**Q3: How do AP systems handle conflicts?**

A: Common strategies include:
- <span style="color: #16a34a; font-weight: 600;">Last-Write-Wins (LWW)</span>: Highest timestamp wins (simple but can lose data)
- <span style="color: #16a34a; font-weight: 600;">Vector Clocks</span>: Track causality, detect conflicts, keep siblings
- <span style="color: #16a34a; font-weight: 600;">CRDTs</span>: Data structures that automatically merge without conflicts
- <span style="color: #16a34a; font-weight: 600;">Application-level resolution</span>: Let users/application resolve conflicts

<div style="background: rgba(59, 130, 246, 0.1); border-radius: 8px; padding: 16px; margin-top: 16px;">
<strong style="color: #1e40af;">Follow-up Q3.1: What's wrong with Last-Write-Wins?</strong>

A: LWW can silently <span style="color: #16a34a; font-weight: 600;">lose data</span>. Example: User A adds item X to cart at T1, User B adds item Y at T2 (from different node). LWW would keep only item Y. The "lost update" problem. Clock skew between nodes makes this worse - a "later" write might have an earlier timestamp.

<div style="background: rgba(59, 130, 246, 0.15); border-radius: 6px; padding: 12px; margin-top: 12px;">
<strong style="color: #1e40af;">Follow-up Q3.1.1: How do CRDTs solve this without coordination?</strong>

A: CRDTs (Conflict-free Replicated Data Types) are mathematically designed to merge without conflicts. For a shopping cart:
- Use a <span style="color: #16a34a; font-weight: 600;">G-Set (Grow-only Set)</span>: Items can only be added, never removed. Merge = union.
- Use a <span style="color: #16a34a; font-weight: 600;">OR-Set (Observed-Remove Set)</span>: Track add/remove operations with unique tags. An item is present if any add tag has no corresponding remove.

Key insight: CRDTs trade expressiveness for automatic convergence. Not all operations can be expressed as CRDTs.
</div>
</div>
</div>

### Level 2: Design Questions

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

**Q4: "Design a shopping cart system - would you choose CP or AP?"**

A: <span style="color: #16a34a; font-weight: 600;">AP is typically better</span> for shopping carts because:
- Availability matters more - customers should always be able to add items
- Temporary inconsistency is acceptable - showing slightly stale cart is fine
- Conflicts are rare and can be merged (union of items added)
- Lost sales from unavailability > cost of occasional duplicate items

Amazon's DynamoDB was literally designed for this use case (Dynamo paper).

<div style="background: rgba(34, 197, 94, 0.1); border-radius: 8px; padding: 16px; margin-top: 16px;">
<strong style="color: #166534;">Follow-up Q4.1: How would you handle the inventory check - can you oversell?</strong>

A: This is where it gets nuanced. For the cart itself: AP. But for <span style="color: #16a34a; font-weight: 600;">inventory reservation at checkout</span>: you need CP. Strategy:
1. Cart operations (add/remove items): AP, eventual consistency
2. Checkout/payment: CP, require inventory lock
3. Compensating transaction: If inventory unavailable at checkout, notify user

This is the <span style="color: #16a34a; font-weight: 600;">"Saga pattern"</span> - long-running transactions with compensation.

<div style="background: rgba(34, 197, 94, 0.15); border-radius: 6px; padding: 12px; margin-top: 12px;">
<strong style="color: #166534;">Follow-up Q4.1.1: What if two users try to buy the last item simultaneously?</strong>

A: Several approaches:
1. <span style="color: #16a34a; font-weight: 600;">Optimistic locking</span>: Both try to decrement inventory. Second one fails, cart shows "item unavailable".
2. <span style="color: #16a34a; font-weight: 600;">Soft reservation</span>: Reserve inventory for X minutes during checkout. Expire if not completed.
3. <span style="color: #16a34a; font-weight: 600;">Accept oversell, handle operationally</span>: For high-volume items, brief oversell is acceptable. Notify customer, offer alternatives.

The key is matching business requirements to technical constraints. A flash sale needs stricter controls than regular inventory.
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

**Q5: "Design a banking system - CP or AP?"**

A: <span style="color: #16a34a; font-weight: 600;">CP is required</span> because:
- Incorrect balances are unacceptable (regulatory, trust)
- Double-spending must be prevented
- Regulatory compliance requires accurate records
- Users accept occasional "try again later" errors

Banks prefer rejecting transactions over showing wrong balances.

<div style="background: rgba(34, 197, 94, 0.1); border-radius: 8px; padding: 16px; margin-top: 16px;">
<strong style="color: #166534;">Follow-up Q5.1: But ATMs work offline - isn't that AP?</strong>

A: Great observation! ATMs use a hybrid approach:
1. <span style="color: #16a34a; font-weight: 600;">Offline limits</span>: ATMs have maximum offline withdrawal limits
2. <span style="color: #16a34a; font-weight: 600;">Risk-based decisions</span>: Known customer, small amount = allow offline
3. <span style="color: #16a34a; font-weight: 600;">Reconciliation</span>: Transactions queued and settled when online
4. <span style="color: #16a34a; font-weight: 600;">Fraud detection</span>: Patterns analyzed to detect abuse

This is AP with <span style="color: #16a34a; font-weight: 600;">bounded inconsistency</span> - accepting risk for availability.

<div style="background: rgba(34, 197, 94, 0.15); border-radius: 6px; padding: 12px; margin-top: 12px;">
<strong style="color: #166534;">Follow-up Q5.1.1: How do global banks handle cross-datacenter transactions?</strong>

A: Modern approaches:
1. <span style="color: #16a34a; font-weight: 600;">Google Spanner</span>: TrueTime + Paxos for globally consistent transactions (50-100ms latency)
2. <span style="color: #16a34a; font-weight: 600;">CockroachDB</span>: Raft consensus per range, serializable isolation
3. <span style="color: #16a34a; font-weight: 600;">Region affinity</span>: Most transactions stay in one region, cross-region only for global operations
4. <span style="color: #16a34a; font-weight: 600;">Async replication for reads</span>: Strong writes to primary region, eventual reads from local region

Key insight: Global strong consistency is expensive (latency). Design to minimize cross-region transactions.
</div>
</div>
</div>

### Level 3: Advanced/Edge Cases

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #f59e0b;">

**Q6: "What happens if a network partition lasts for days?"**

A: This reveals important system design considerations:
1. <span style="color: #16a34a; font-weight: 600;">CP systems</span>: Minority partition remains unavailable. May need manual intervention to prevent data divergence.
2. <span style="color: #16a34a; font-weight: 600;">AP systems</span>: Both sides accumulate writes. When partition heals, massive reconciliation needed.

<div style="background: rgba(245, 158, 11, 0.1); border-radius: 8px; padding: 16px; margin-top: 16px;">
<strong style="color: #92400e;">Follow-up Q6.1: How do you handle the reconciliation when an AP system heals after days?</strong>

A: Several challenges and solutions:
1. <span style="color: #16a34a; font-weight: 600;">Merkle trees</span>: Hash-based comparison to efficiently find divergent data (used by Cassandra, Dynamo)
2. <span style="color: #16a34a; font-weight: 600;">Incremental sync</span>: Stream changes since last known sync point
3. <span style="color: #16a34a; font-weight: 600;">Conflict queue</span>: Surface unresolvable conflicts for human review
4. <span style="color: #16a34a; font-weight: 600;">Rate limiting</span>: Throttle sync to prevent overwhelming the system

<div style="background: rgba(245, 158, 11, 0.15); border-radius: 6px; padding: 12px; margin-top: 12px;">
<strong style="color: #92400e;">Follow-up Q6.1.1: What if there are millions of conflicts?</strong>

A: This is where <span style="color: #16a34a; font-weight: 600;">semantic conflict resolution</span> becomes critical:
1. <span style="color: #16a34a; font-weight: 600;">Domain-specific rules</span>: "For user profiles, prefer newer update. For counters, sum both sides."
2. <span style="color: #16a34a; font-weight: 600;">Automated resolution</span>: 99% of conflicts can be auto-resolved with good heuristics
3. <span style="color: #16a34a; font-weight: 600;">Human escalation</span>: Flag truly ambiguous cases for review
4. <span style="color: #16a34a; font-weight: 600;">Audit log</span>: Keep full history for compliance and debugging

Real example: Git merge conflicts are "human escalation" - the system detects conflict, human resolves.
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #f59e0b;">

**Q7: "How would you implement tunable consistency in a distributed database?"**

A: Key mechanisms:
1. <span style="color: #16a34a; font-weight: 600;">Write concern</span>: How many nodes must acknowledge a write (W)
2. <span style="color: #16a34a; font-weight: 600;">Read concern</span>: How many nodes must agree on read (R)
3. <span style="color: #16a34a; font-weight: 600;">Quorum formula</span>: W + R > N ensures overlap, guaranteeing read sees latest write

<div style="background: rgba(245, 158, 11, 0.1); border-radius: 8px; padding: 16px; margin-top: 16px;">
<strong style="color: #92400e;">Follow-up Q7.1: What are the tradeoffs of different W/R configurations?</strong>

A: For N=3 nodes:
| W | R | Behavior |
|---|---|----------|
| 3 | 1 | Strong write, fast read. Write latency = slowest node. |
| 1 | 3 | Fast write, strong read. Read latency = slowest node. |
| 2 | 2 | Balanced. Tolerates 1 failure for both reads and writes. |
| 1 | 1 | Fastest but no consistency guarantee. May read stale. |

<div style="background: rgba(245, 158, 11, 0.15); border-radius: 6px; padding: 12px; margin-top: 12px;">
<strong style="color: #92400e;">Follow-up Q7.1.1: How does Cassandra's LOCAL_QUORUM work in multi-DC setups?</strong>

A: LOCAL_QUORUM provides quorum within the <span style="color: #16a34a; font-weight: 600;">local datacenter only</span>:
1. Write to local DC quorum (fast, low latency)
2. Async replicate to remote DCs (background)
3. Read from local DC quorum (fast)

Tradeoff: If local DC fails, you lose recent writes not yet replicated. EACH_QUORUM requires quorum in every DC (higher latency, better durability).

This is <span style="color: #16a34a; font-weight: 600;">PACELC in action</span>: During partition between DCs, you have local availability. During normal operation, you choose low latency over global consistency.
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #f59e0b;">

**Q8: "Explain split-brain in distributed systems and how to prevent it."**

A: <span style="color: #16a34a; font-weight: 600;">Split-brain</span> occurs when a partition causes both sides to believe they are the primary/leader, accepting conflicting writes.

Prevention strategies:
1. <span style="color: #16a34a; font-weight: 600;">Quorum-based election</span>: Require majority to elect leader
2. <span style="color: #16a34a; font-weight: 600;">Fencing tokens</span>: Monotonically increasing tokens invalidate stale leaders
3. <span style="color: #16a34a; font-weight: 600;">STONITH</span>: "Shoot The Other Node In The Head" - forcibly power off suspected failed node

<div style="background: rgba(245, 158, 11, 0.1); border-radius: 8px; padding: 16px; margin-top: 16px;">
<strong style="color: #92400e;">Follow-up Q8.1: How do fencing tokens work in practice?</strong>

A: Fencing tokens prevent stale leaders from corrupting data:
1. Lock service issues monotonically increasing <span style="color: #16a34a; font-weight: 600;">fencing token</span> with each lock grant
2. Client includes token in all storage requests
3. Storage rejects requests with tokens lower than previously seen
4. If old leader wakes up with stale token, its writes are rejected

<div style="background: rgba(245, 158, 11, 0.15); border-radius: 6px; padding: 12px; margin-top: 12px;">
<strong style="color: #92400e;">Follow-up Q8.1.1: What if the storage system doesn't support fencing tokens?</strong>

A: You have a dangerous gap. Mitigations:
1. <span style="color: #16a34a; font-weight: 600;">Lease with margin</span>: Set lock TTL > max clock skew + max GC pause + max network delay
2. <span style="color: #16a34a; font-weight: 600;">Double-check pattern</span>: Re-verify lock ownership before critical operations
3. <span style="color: #16a34a; font-weight: 600;">Idempotent operations</span>: Design operations so replay is safe
4. <span style="color: #16a34a; font-weight: 600;">Use storage with native fencing</span>: ZooKeeper's ephemeral nodes, etcd's leases

Key insight from Martin Kleppmann: <span style="color: #16a34a; font-weight: 600;">Distributed locks alone don't provide safety</span> - you need fencing for correctness.
</div>
</div>
</div>

---

## Best Practices

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

1. **Start with requirements, not technology** - Understand your consistency and availability needs before choosing a database
2. **Use tunable consistency wisely** - Strong consistency for critical paths (payments), eventual for others (analytics)
3. **Plan for partition recovery** - How will you reconcile divergent data? Test this!
4. **Monitor replication lag** - Even "consistent" systems have replication delays. Alert on high lag.
5. **Implement retry logic** - CP systems will reject requests during partitions. Clients must retry.
6. **Use idempotency keys** - Retries should be safe. Include unique request IDs.
7. **Document your consistency model** - Developers need to understand what guarantees they have
8. **Test failure scenarios** - Use chaos engineering to validate behavior during partitions

</div>

---

## Related Topics

- [[Database Replication]](/topic/system-design/database-replication) - How data is copied between nodes
- [[Consensus Algorithms]](/topic/system-design/consensus-algorithms) - Raft, Paxos for CP systems
- [[Distributed Locking]](/topic/system-design/distributed-locking) - Coordinating access across nodes
- [[Database Sharding]](/topic/system-design/database-sharding) - Horizontal partitioning strategies
- [[Event Sourcing]](/topic/system-design/event-sourcing) - Append-only logs for eventual consistency
- [[Rate Limiting]](/topic/system-design/rate-limiting) - Protecting systems during overload
