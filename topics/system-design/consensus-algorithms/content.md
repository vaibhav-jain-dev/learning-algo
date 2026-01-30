# Consensus Algorithms

## Overview

**Simple Explanation**: <span style="color:#16a34a;">Consensus algorithms</span> help multiple computers agree on a single value or decision, even when some computers fail or the network has issues. Think of it like getting a group of friends to agree on where to eat dinner - even if some friends can't hear well or leave early, the group still needs to reach a decision everyone follows.

In distributed systems, consensus is the foundation for building reliable databases, [[leader election]](/topic/system-design/distributed-locking), and configuration management. Without consensus, you can't guarantee that all nodes in a cluster see the same data in the same order. It's tightly coupled with [[CAP theorem]](/topic/system-design/cap-theorem) trade-offs and [[database replication]](/topic/system-design/database-replication) strategies.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
<div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">THE CONSENSUS PROBLEM</div>
<div style="text-align: center; color: #475569; margin-bottom: 20px;">Multiple nodes must agree on a single value:</div>
<div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-bottom: 20px;">
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 16px; min-width: 110px; text-align: center; border: 1px solid #93c5fd;">
<div style="color: #1e40af; font-weight: 600;">Node A</div>
<div style="color: #3b82f6; font-size: 12px; margin-top: 4px;">proposes X</div>
</div>
<div style="background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%); border-radius: 12px; padding: 16px; min-width: 110px; text-align: center; border: 1px solid #f87171;">
<div style="color: #991b1b; font-weight: 600;">Node B</div>
<div style="color: #dc2626; font-size: 12px; margin-top: 4px;">proposes Y</div>
</div>
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 16px; min-width: 110px; text-align: center; border: 1px solid #93c5fd;">
<div style="color: #1e40af; font-weight: 600;">Node C</div>
<div style="color: #3b82f6; font-size: 12px; margin-top: 4px;">proposes X</div>
</div>
</div>
<div style="text-align: center; color: #6366f1; font-size: 24px; margin-bottom: 16px;">consensus protocol</div>
<div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-bottom: 20px;">
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 16px; min-width: 110px; text-align: center; border: 1px solid #86efac;">
<div style="color: #166534; font-weight: 600;">Node A</div>
<div style="color: #22c55e; font-size: 12px; margin-top: 4px;">decides: X</div>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 16px; min-width: 110px; text-align: center; border: 1px solid #86efac;">
<div style="color: #166534; font-weight: 600;">Node B</div>
<div style="color: #22c55e; font-size: 12px; margin-top: 4px;">decides: X</div>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 16px; min-width: 110px; text-align: center; border: 1px solid #86efac;">
<div style="color: #166534; font-weight: 600;">Node C</div>
<div style="color: #22c55e; font-size: 12px; margin-top: 4px;">decides: X</div>
</div>
</div>
<div style="text-align: center; background: rgba(34, 197, 94, 0.15); border: 1px solid #22c55e; border-radius: 8px; padding: 12px;">
<span style="color: #166534;">All nodes agree on X (could have been Y, but MUST be same value)</span>
</div>
</div>

## Why It Matters: Real Company Examples

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

**Google Spanner** uses <span style="color:#16a34a;">Paxos</span> to achieve global consistency across data centers. Every write goes through Paxos consensus, enabling Google to offer externally-consistent reads worldwide - something previously thought impossible at scale.

**CockroachDB and TiDB** use <span style="color:#16a34a;">Raft</span> for distributed SQL transactions. When you run a distributed transaction, Raft ensures all replicas agree on the commit order, preventing data inconsistencies.

  **Apache Kafka** uses Zab (similar to Raft) in ZooKeeper for controller election and configuration management. When a Kafka broker fails, consensus determines which broker becomes the new partition leader. See [[message queues]](/topic/system-design/message-queues).

**Ethereum 2.0** switched from Proof-of-Work to a <span style="color:#16a34a;">BFT-style consensus</span> (Casper) to secure $400B+ in assets while reducing energy consumption by 99.95%.

  **etcd (Kubernetes)** uses Raft for cluster coordination. Every Kubernetes control plane operation depends on etcd's consensus to maintain cluster state consistency.

</div>

## Properties of Consensus

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #6366f1;">

1. **<span style="color:#16a34a;">Agreement</span>**: All correct nodes decide on the same value
2. **<span style="color:#16a34a;">Validity</span>**: The decided value was proposed by some node
3. **<span style="color:#16a34a;">Termination</span>**: All correct nodes eventually decide
4. **<span style="color:#16a34a;">Integrity</span>**: Each node decides at most once

</div>

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">

  **The FLP Impossibility Theorem (1985)**: In an asynchronous system with even one faulty node, no deterministic consensus algorithm can guarantee all three properties simultaneously. Practical algorithms use **timeouts** to work around this limitation - they sacrifice pure liveness for practical termination.

</div>

---

## Quorum: The Foundation of Consensus

<span style="color:#16a34a;">Quorum</span> is the minimum number of nodes that must participate in an operation for it to be valid. Understanding quorum is essential for all consensus algorithms.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
<div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">QUORUM MATHEMATICS</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 24px;">
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 20px; border: 1px solid #93c5fd;">
<div style="color: #1e40af; font-weight: 600; margin-bottom: 12px;">Crash Fault Tolerance</div>
<div style="background: #fff; border-radius: 8px; padding: 16px; text-align: center;">
<div style="font-size: 24px; color: #3b82f6; font-weight: 700;">n = 2f + 1</div>
<div style="color: #64748b; font-size: 13px; margin-top: 8px;">f = max failures tolerated</div>
</div>
<div style="margin-top: 12px; font-size: 13px; color: #1e40af;">
<div>5 nodes: tolerates 2 failures</div>
<div>3 nodes: tolerates 1 failure</div>
<div>Quorum = majority = (n/2)+1</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%); border-radius: 12px; padding: 20px; border: 1px solid #f87171;">
<div style="color: #991b1b; font-weight: 600; margin-bottom: 12px;">Byzantine Fault Tolerance</div>
<div style="background: #fff; border-radius: 8px; padding: 16px; text-align: center;">
<div style="font-size: 24px; color: #dc2626; font-weight: 700;">n = 3f + 1</div>
<div style="color: #64748b; font-size: 13px; margin-top: 8px;">f = max Byzantine failures</div>
</div>
<div style="margin-top: 12px; font-size: 13px; color: #991b1b;">
<div>7 nodes: tolerates 2 Byzantine</div>
<div>4 nodes: tolerates 1 Byzantine</div>
<div>Quorum = 2f+1 (super-majority)</div>
</div>
</div>
</div>

<div style="background: rgba(99, 102, 241, 0.1); border-radius: 10px; padding: 16px; border: 1px solid #a5b4fc;">
<div style="color: #4338ca; font-weight: 600; margin-bottom: 8px;">Why These Numbers?</div>
<div style="color: #475569; font-size: 14px; line-height: 1.8;">
<div><strong>Crash (2f+1):</strong> Need overlapping majorities - any two majorities share at least one node</div>
<div><strong>Byzantine (3f+1):</strong> Need 2f+1 honest responses out of 3f+1 total to outvote f liars</div>
</div>
</div>
</div>

### Quorum Intersection Property

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
<div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">QUORUM INTERSECTION ENSURES CONSISTENCY</div>

<div style="display: flex; justify-content: center; align-items: center; gap: 40px; flex-wrap: wrap; margin-bottom: 24px;">
<div style="position: relative; width: 200px; height: 150px;">
<div style="position: absolute; left: 0; top: 20px; width: 120px; height: 120px; background: rgba(59, 130, 246, 0.2); border: 2px solid #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
<span style="color: #1e40af; font-size: 12px; position: absolute; left: 15px;">Write<br/>Quorum</span>
</div>
<div style="position: absolute; right: 0; top: 20px; width: 120px; height: 120px; background: rgba(34, 197, 94, 0.2); border: 2px solid #22c55e; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
<span style="color: #166534; font-size: 12px; position: absolute; right: 15px;">Read<br/>Quorum</span>
</div>
<div style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
<span style="color: #92400e; font-size: 10px; text-align: center;">Shared<br/>Node</span>
</div>
</div>

<div style="background: rgba(34, 197, 94, 0.15); border-radius: 10px; padding: 16px; max-width: 280px;">
<div style="color: #166534; font-weight: 600; margin-bottom: 8px;">The Key Insight</div>
<div style="color: #475569; font-size: 13px; line-height: 1.6;">
        If W + R > N, any read quorum overlaps with any write quorum. The shared node(s) have the latest write, ensuring reads see fresh data.
</div>
</div>
</div>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; text-align: center;">
<div style="background: #fff; border-radius: 8px; padding: 12px; border: 1px solid #e2e8f0;">
<div style="color: #3b82f6; font-weight: 600;">W=3, R=3, N=5</div>
<div style="color: #64748b; font-size: 12px;">Strong consistency</div>
</div>
<div style="background: #fff; border-radius: 8px; padding: 12px; border: 1px solid #e2e8f0;">
<div style="color: #f59e0b; font-weight: 600;">W=1, R=5, N=5</div>
<div style="color: #64748b; font-size: 12px;">Fast writes, slow reads</div>
</div>
<div style="background: #fff; border-radius: 8px; padding: 12px; border: 1px solid #e2e8f0;">
<div style="color: #22c55e; font-weight: 600;">W=5, R=1, N=5</div>
<div style="color: #64748b; font-size: 12px;">Slow writes, fast reads</div>
</div>
</div>
</div>

---

## Algorithm Comparison

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
<div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">CONSENSUS ALGORITHM COMPARISON</div>
<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <thead>
<tr style="border-bottom: 2px solid #cbd5e1;">
<th style="padding: 12px; text-align: left; color: #1e40af;">Algorithm</th>
<th style="padding: 12px; text-align: center; color: #1e40af;">Fault Model</th>
<th style="padding: 12px; text-align: center; color: #1e40af;">Nodes for f faults</th>
<th style="padding: 12px; text-align: center; color: #1e40af;">Message Complexity</th>
<th style="padding: 12px; text-align: left; color: #1e40af;">Used In</th>
</tr>
      </thead>
      <tbody>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b; font-weight: 500;">Paxos</td>
<td style="padding: 12px; text-align: center;"><span style="color: #16a34a;">Crash</span></td>
<td style="padding: 12px; text-align: center; color: #d97706;">2f + 1</td>
<td style="padding: 12px; text-align: center; color: #1e293b;">O(n)</td>
<td style="padding: 12px; color: #64748b;">Chubby, Spanner, Megastore</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b; font-weight: 500;">Multi-Paxos</td>
<td style="padding: 12px; text-align: center;"><span style="color: #16a34a;">Crash</span></td>
<td style="padding: 12px; text-align: center; color: #d97706;">2f + 1</td>
<td style="padding: 12px; text-align: center; color: #1e293b;">O(n) amortized</td>
<td style="padding: 12px; color: #64748b;">Spanner, Chubby</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b; font-weight: 500;">Raft</td>
<td style="padding: 12px; text-align: center;"><span style="color: #16a34a;">Crash</span></td>
<td style="padding: 12px; text-align: center; color: #d97706;">2f + 1</td>
<td style="padding: 12px; text-align: center; color: #1e293b;">O(n)</td>
<td style="padding: 12px; color: #64748b;">etcd, CockroachDB, Consul, TiKV</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b; font-weight: 500;">PBFT</td>
<td style="padding: 12px; text-align: center;"><span style="color: #dc2626;">Byzantine</span></td>
<td style="padding: 12px; text-align: center; color: #d97706;">3f + 1</td>
<td style="padding: 12px; text-align: center; color: #1e293b;">O(n^2)</td>
<td style="padding: 12px; color: #64748b;">Hyperledger Fabric</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b; font-weight: 500;">Zab</td>
<td style="padding: 12px; text-align: center;"><span style="color: #16a34a;">Crash</span></td>
<td style="padding: 12px; text-align: center; color: #d97706;">2f + 1</td>
<td style="padding: 12px; text-align: center; color: #1e293b;">O(n)</td>
<td style="padding: 12px; color: #64748b;">ZooKeeper, Kafka</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b; font-weight: 500;">Viewstamped Replication</td>
<td style="padding: 12px; text-align: center;"><span style="color: #16a34a;">Crash</span></td>
<td style="padding: 12px; text-align: center; color: #d97706;">2f + 1</td>
<td style="padding: 12px; text-align: center; color: #1e293b;">O(n)</td>
<td style="padding: 12px; color: #64748b;">PBFT basis</td>
</tr>
      </tbody>
</table>
</div>
<div style="margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
<div style="background: rgba(34, 197, 94, 0.15); border-radius: 8px; padding: 12px;">
<span style="color: #166534; font-weight: 600;">Crash fault:</span>
<span style="color: #1e293b;"> Node stops responding (fail-stop model)</span>
</div>
<div style="background: rgba(239, 68, 68, 0.15); border-radius: 8px; padding: 12px;">
<span style="color: #991b1b; font-weight: 600;">Byzantine:</span>
<span style="color: #1e293b;"> Node may behave maliciously or arbitrarily</span>
</div>
</div>
</div>

---

## Paxos: The Foundation

<span style="color:#16a34a;">Paxos</span> was introduced by Leslie Lamport in 1989 and is the theoretical foundation for most consensus algorithms. Understanding Paxos is crucial for interviews, even though Raft is more commonly implemented.

### Paxos Roles

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
<div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">PAXOS ROLES</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 20px; border: 1px solid #93c5fd;">
<div style="color: #1e40af; font-weight: 700; font-size: 16px; margin-bottom: 12px;">Proposer</div>
<div style="color: #475569; font-size: 13px; line-height: 1.6;">
<div>Proposes values to be agreed upon</div>
<div style="margin-top: 8px; background: rgba(255,255,255,0.7); padding: 8px; border-radius: 6px;">
<strong>Actions:</strong> Prepare, Propose
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 20px; border: 1px solid #86efac;">
<div style="color: #166534; font-weight: 700; font-size: 16px; margin-bottom: 12px;">Acceptor</div>
<div style="color: #475569; font-size: 13px; line-height: 1.6;">
<div>Votes on proposals (the "memory")</div>
<div style="margin-top: 8px; background: rgba(255,255,255,0.7); padding: 8px; border-radius: 6px;">
<strong>Actions:</strong> Promise, Accept
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; border: 1px solid #fcd34d;">
<div style="color: #92400e; font-weight: 700; font-size: 16px; margin-bottom: 12px;">Learner</div>
<div style="color: #475569; font-size: 13px; line-height: 1.6;">
<div>Learns the decided value</div>
<div style="margin-top: 8px; background: rgba(255,255,255,0.7); padding: 8px; border-radius: 6px;">
<strong>Actions:</strong> Learn accepted value
</div>
</div>
</div>
</div>

<div style="margin-top: 20px; background: rgba(99, 102, 241, 0.1); border-radius: 10px; padding: 16px; border: 1px solid #a5b4fc;">
<div style="color: #4338ca; font-size: 13px;">
<strong>Note:</strong> In practice, a single node often plays all three roles simultaneously. The separation is conceptual.
</div>
</div>
</div>

### Basic Paxos: Two Phases

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
<div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">BASIC PAXOS PROTOCOL</div>

<div style="margin-bottom: 32px;">
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 10px; padding: 16px; margin-bottom: 16px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; margin-bottom: 12px;">Phase 1: Prepare</div>
<div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
<div style="background: #fff; border-radius: 8px; padding: 12px; min-width: 100px; text-align: center; border: 1px solid #93c5fd;">
<div style="color: #1e40af; font-weight: 600;">Proposer</div>
<div style="color: #64748b; font-size: 11px;">n = 1</div>
</div>
<div style="display: flex; flex-direction: column; gap: 4px;">
<div style="color: #3b82f6; font-size: 13px;">Prepare(n=1)</div>
<div style="color: #3b82f6;">---------------></div>
</div>
<div style="display: flex; gap: 8px;">
<div style="background: #fff; border-radius: 8px; padding: 8px; text-align: center; border: 1px solid #86efac;">
<div style="color: #166534; font-size: 12px;">A1</div>
</div>
<div style="background: #fff; border-radius: 8px; padding: 8px; text-align: center; border: 1px solid #86efac;">
<div style="color: #166534; font-size: 12px;">A2</div>
</div>
<div style="background: #fff; border-radius: 8px; padding: 8px; text-align: center; border: 1px solid #86efac;">
<div style="color: #166534; font-size: 12px;">A3</div>
</div>
</div>
</div>
<div style="margin-top: 12px; color: #475569; font-size: 13px; line-height: 1.6;">
<strong>Acceptor response:</strong> Promise to not accept proposals &lt; n. Return any previously accepted (n', v').
</div>
</div>

<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 10px; padding: 16px; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: 700; margin-bottom: 12px;">Phase 2: Accept</div>
<div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
<div style="background: #fff; border-radius: 8px; padding: 12px; min-width: 100px; text-align: center; border: 1px solid #93c5fd;">
<div style="color: #1e40af; font-weight: 600;">Proposer</div>
<div style="color: #64748b; font-size: 11px;">v = "X"</div>
</div>
<div style="display: flex; flex-direction: column; gap: 4px;">
<div style="color: #22c55e; font-size: 13px;">Accept(n=1, v="X")</div>
<div style="color: #22c55e;">---------------></div>
</div>
<div style="display: flex; gap: 8px;">
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 8px; padding: 8px; text-align: center; border: 1px solid #86efac;">
<div style="color: #166534; font-size: 12px;">A1: X</div>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 8px; padding: 8px; text-align: center; border: 1px solid #86efac;">
<div style="color: #166534; font-size: 12px;">A2: X</div>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 8px; padding: 8px; text-align: center; border: 1px solid #86efac;">
<div style="color: #166534; font-size: 12px;">A3: X</div>
</div>
</div>
</div>
<div style="margin-top: 12px; color: #475569; font-size: 13px; line-height: 1.6;">
<strong>Acceptor response:</strong> Accept if no promise to higher proposal. Value "X" is now <span style="color:#16a34a;">chosen</span> (majority accepted).
</div>
</div>
</div>

<div style="background: rgba(239, 68, 68, 0.1); border-radius: 10px; padding: 16px; border: 1px solid #fca5a5;">
<div style="color: #991b1b; font-weight: 600; margin-bottom: 8px;">Critical Rule: Value Selection</div>
<div style="color: #475569; font-size: 13px;">
If any acceptor returns a previously accepted value in Phase 1, the proposer <strong>MUST</strong> propose that value (with highest proposal number) in Phase 2. This ensures safety even with concurrent proposers.
</div>
</div>
</div>

### Multi-Paxos Optimization

Basic Paxos requires two round trips per value. <span style="color:#16a34a;">Multi-Paxos</span> optimizes this by establishing a stable leader.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
<div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">MULTI-PAXOS: AMORTIZED CONSENSUS</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
<div style="background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%); border-radius: 12px; padding: 20px; border: 1px solid #f87171;">
<div style="color: #991b1b; font-weight: 700; margin-bottom: 12px;">Basic Paxos (per value)</div>
<div style="background: #fff; border-radius: 8px; padding: 12px;">
<div style="color: #475569; font-size: 13px; line-height: 1.8;">
<div>1. Prepare -> Promises</div>
<div>2. Accept -> Accepted</div>
<div style="color: #dc2626; font-weight: 600; margin-top: 8px;">4 message delays per value</div>
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 20px; border: 1px solid #86efac;">
<div style="color: #166534; font-weight: 700; margin-bottom: 12px;">Multi-Paxos (amortized)</div>
<div style="background: #fff; border-radius: 8px; padding: 12px;">
<div style="color: #475569; font-size: 13px; line-height: 1.8;">
<div>1. Prepare (once per leader)</div>
<div>2. Accept -> Accepted (per value)</div>
<div style="color: #16a34a; font-weight: 600; margin-top: 8px;">2 message delays per value</div>
</div>
</div>
</div>
</div>

<div style="margin-top: 20px; background: rgba(99, 102, 241, 0.1); border-radius: 10px; padding: 16px; border: 1px solid #a5b4fc;">
<div style="color: #4338ca; font-size: 13px;">
<strong>Leader lease:</strong> The leader "owns" a range of proposal numbers. Until it fails or a higher proposal appears, it skips Phase 1 for subsequent values.
</div>
</div>
</div>

---

## Raft: The Understandable Consensus

<span style="color:#16a34a;">Raft</span> was designed by Diego Ongaro and John Ousterhout specifically to be easier to understand than Paxos while providing equivalent guarantees.

### Raft's Three Sub-Problems

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
<div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">RAFT DECOMPOSITION</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; border: 2px solid #f59e0b; text-align: center;">
<div style="font-size: 32px; margin-bottom: 8px;">1</div>
<div style="color: #92400e; font-weight: 700; font-size: 16px;">Leader Election</div>
<div style="color: #78350f; font-size: 12px; margin-top: 8px;">Choose one leader among nodes</div>
</div>

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 20px; border: 2px solid #3b82f6; text-align: center;">
<div style="font-size: 32px; margin-bottom: 8px;">2</div>
<div style="color: #1e40af; font-weight: 700; font-size: 16px;">Log Replication</div>
<div style="color: #1e3a8a; font-size: 12px; margin-top: 8px;">Leader replicates log to followers</div>
</div>

<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 20px; border: 2px solid #22c55e; text-align: center;">
<div style="font-size: 32px; margin-bottom: 8px;">3</div>
<div style="color: #166534; font-weight: 700; font-size: 16px;">Safety</div>
<div style="color: #14532d; font-size: 12px; margin-top: 8px;">Guarantees for correctness</div>
</div>
</div>
</div>

### Leader Election Deep Dive

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
<div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">RAFT LEADER ELECTION STATE MACHINE</div>

<div style="display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap; margin-bottom: 24px;">
<div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 50%; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; border: 3px solid #64748b; flex-direction: column;">
<div style="color: #475569; font-weight: 700;">FOLLOWER</div>
<div style="color: #94a3b8; font-size: 10px;">default state</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
<div style="color: #f59e0b; font-size: 11px;">timeout</div>
<div style="color: #f59e0b; font-size: 20px;">---></div>
</div>

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 50%; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; border: 3px solid #f59e0b; flex-direction: column;">
<div style="color: #92400e; font-weight: 700;">CANDIDATE</div>
<div style="color: #b45309; font-size: 10px;">seeking votes</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
<div style="color: #22c55e; font-size: 11px;">majority</div>
<div style="color: #22c55e; font-size: 20px;">---></div>
</div>

<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 50%; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; border: 3px solid #22c55e; flex-direction: column;">
<div style="color: #166534; font-weight: 700;">LEADER</div>
<div style="color: #15803d; font-size: 10px;">sends heartbeats</div>
</div>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 20px;">
<div style="background: rgba(239, 68, 68, 0.1); border-radius: 8px; padding: 12px; border: 1px solid #fca5a5;">
<div style="color: #991b1b; font-size: 12px; font-weight: 600;">Candidate -> Follower</div>
<div style="color: #475569; font-size: 11px;">Higher term discovered</div>
</div>
<div style="background: rgba(239, 68, 68, 0.1); border-radius: 8px; padding: 12px; border: 1px solid #fca5a5;">
<div style="color: #991b1b; font-size: 12px; font-weight: 600;">Leader -> Follower</div>
<div style="color: #475569; font-size: 11px;">Higher term discovered</div>
</div>
<div style="background: rgba(249, 115, 22, 0.1); border-radius: 8px; padding: 12px; border: 1px solid #fdba74;">
<div style="color: #c2410c; font-size: 12px; font-weight: 600;">Candidate -> Candidate</div>
<div style="color: #475569; font-size: 11px;">Split vote timeout</div>
</div>
</div>

<div style="background: rgba(34, 197, 94, 0.15); border-radius: 10px; padding: 16px;">
<div style="color: #166534; font-weight: 600; margin-bottom: 8px;">Election Timeout Randomization</div>
<div style="color: #475569; font-size: 13px;">
Timeouts are randomized (e.g., 150-300ms) to prevent <span style="color:#16a34a;">split votes</span>. If all nodes had identical timeouts, they'd all become candidates simultaneously.
</div>
</div>
</div>

### Raft Terms and Log Structure

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
<div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">RAFT TERM AND LOG CONCEPTS</div>

<div style="margin-bottom: 24px;">
<div style="color: #1e40af; font-weight: 600; margin-bottom: 12px;">Terms: Logical Clock</div>
<div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 12px;">
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 6px; padding: 12px 24px; text-align: center; border: 1px solid #93c5fd;">
<div style="color: #64748b; font-size: 10px;">Term 1</div>
<div style="color: #1e40af; font-size: 14px; font-weight: 600;">Leader A</div>
</div>
<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 6px; padding: 12px 24px; text-align: center; border: 1px solid #fcd34d;">
<div style="color: #64748b; font-size: 10px;">Term 2</div>
<div style="color: #92400e; font-size: 14px; font-weight: 600;">Election</div>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 6px; padding: 12px 24px; text-align: center; border: 1px solid #86efac;">
<div style="color: #64748b; font-size: 10px;">Term 3</div>
<div style="color: #166534; font-size: 14px; font-weight: 600;">Leader B</div>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 6px; padding: 12px 24px; text-align: center; border: 1px solid #86efac;">
<div style="color: #64748b; font-size: 10px;">Term 3</div>
<div style="color: #166534; font-size: 14px; font-weight: 600;">...</div>
</div>
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 6px; padding: 12px 24px; text-align: center; border: 1px solid #93c5fd;">
<div style="color: #64748b; font-size: 10px;">Term 4</div>
<div style="color: #1e40af; font-size: 14px; font-weight: 600;">Leader C</div>
</div>
</div>
<div style="color: #64748b; font-size: 13px;">Each term has at most one leader. Terms act as a logical clock to detect stale information.</div>
</div>

<div>
<div style="color: #166534; font-weight: 600; margin-bottom: 12px;">Log Structure</div>
<div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 12px;">
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 6px; padding: 10px 16px; text-align: center; border: 1px solid #93c5fd;">
<div style="color: #64748b; font-size: 10px;">idx 1</div>
<div style="color: #1e40af; font-size: 12px;">t1: x=1</div>
</div>
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 6px; padding: 10px 16px; text-align: center; border: 1px solid #93c5fd;">
<div style="color: #64748b; font-size: 10px;">idx 2</div>
<div style="color: #1e40af; font-size: 12px;">t1: y=2</div>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 6px; padding: 10px 16px; text-align: center; border: 1px solid #86efac;">
<div style="color: #64748b; font-size: 10px;">idx 3</div>
<div style="color: #166534; font-size: 12px;">t3: x=3</div>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 6px; padding: 10px 16px; text-align: center; border: 1px solid #86efac;">
<div style="color: #64748b; font-size: 10px;">idx 4</div>
<div style="color: #166534; font-size: 12px;">t3: z=5</div>
</div>
<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 6px; padding: 10px 16px; text-align: center; border: 1px solid #fcd34d;">
<div style="color: #64748b; font-size: 10px;">idx 5</div>
<div style="color: #92400e; font-size: 12px;">t4: y=7</div>
</div>
</div>
<div style="color: #16a34a; font-size: 12px;">^ commitIndex = 4</div>
</div>

<div style="margin-top: 20px; background: rgba(99, 102, 241, 0.1); border-radius: 10px; padding: 16px; border: 1px solid #a5b4fc;">
<div style="color: #4338ca; font-weight: 600; margin-bottom: 8px;">Log Matching Property</div>
<div style="color: #475569; font-size: 13px; line-height: 1.6;">
      If two logs contain an entry with the same index and term, then:
      <br/>1. They store the same command
      <br/>2. All preceding entries are identical
</div>
</div>
</div>

### Log Replication Flow

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
<div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">RAFT LOG REPLICATION</div>

<div style="display: flex; flex-direction: column; gap: 16px;">
<div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%); border-radius: 8px; padding: 12px 20px; border: 1px solid #a5b4fc;">
<div style="color: #4338ca; font-weight: 600;">Client</div>
</div>
<div style="color: #6366f1;">--- SET x=5 ---></div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 8px; padding: 12px 20px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 600;">Leader</div>
<div style="color: #15803d; font-size: 11px;">appends to log</div>
</div>
</div>

<div style="display: flex; align-items: flex-start; gap: 16px; flex-wrap: wrap; margin-left: 180px;">
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="display: flex; align-items: center; gap: 12px;">
<div style="color: #3b82f6; font-size: 12px;">AppendEntries</div>
<div style="color: #3b82f6;">----></div>
<div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 8px; padding: 8px 16px; border: 1px solid #cbd5e1;">
<div style="color: #475569; font-size: 12px;">Follower 1</div>
<div style="color: #22c55e; font-size: 11px;">ACK</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="color: #3b82f6; font-size: 12px;">AppendEntries</div>
<div style="color: #3b82f6;">----></div>
<div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 8px; padding: 8px 16px; border: 1px solid #cbd5e1;">
<div style="color: #475569; font-size: 12px;">Follower 2</div>
<div style="color: #22c55e; font-size: 11px;">ACK</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="color: #3b82f6; font-size: 12px;">AppendEntries</div>
<div style="color: #3b82f6;">----></div>
<div style="background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%); border-radius: 8px; padding: 8px 16px; border: 1px solid #f87171;">
<div style="color: #991b1b; font-size: 12px;">Follower 3</div>
<div style="color: #dc2626; font-size: 11px;">TIMEOUT</div>
</div>
</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 8px; padding: 12px 20px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 600;">Leader</div>
<div style="color: #15803d; font-size: 11px;">2/3 ACKs = majority</div>
</div>
<div style="color: #22c55e; font-weight: 600;">COMMIT!</div>
<div style="color: #6366f1;"><--- OK ---</div>
<div style="background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%); border-radius: 8px; padding: 12px 20px; border: 1px solid #a5b4fc;">
<div style="color: #4338ca; font-weight: 600;">Client</div>
</div>
</div>
</div>

<div style="margin-top: 24px; background: rgba(34, 197, 94, 0.15); border-radius: 10px; padding: 16px;">
<div style="color: #166534; font-weight: 600; margin-bottom: 8px;">Commit vs Applied</div>
<div style="color: #475569; font-size: 13px; line-height: 1.6;">
<strong>Committed:</strong> Entry replicated on majority - guaranteed durable<br/>
<strong>Applied:</strong> Entry executed by state machine - produces side effects
</div>
</div>
</div>

---

## Split-Brain Problem

<span style="color:#16a34a;">Split-brain</span> occurs when a network partition causes nodes to form multiple independent clusters, each believing it's the primary. This can lead to data inconsistency and corruption.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
<div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">SPLIT-BRAIN SCENARIO</div>

<div style="display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; margin-bottom: 24px;">
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 20px; border: 2px solid #3b82f6; flex: 1; min-width: 150px;">
<div style="color: #1e40af; font-weight: 700; text-align: center; margin-bottom: 12px;">Partition A</div>
<div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
<div style="background: #fff; border-radius: 8px; padding: 8px 12px; border: 1px solid #93c5fd;">
<div style="color: #166534; font-weight: 600; font-size: 12px;">Leader</div>
</div>
<div style="background: #fff; border-radius: 8px; padding: 8px 12px; border: 1px solid #93c5fd;">
<div style="color: #475569; font-size: 12px;">Node 2</div>
</div>
</div>
<div style="color: #1e40af; font-size: 11px; text-align: center; margin-top: 8px;">2 nodes (minority)</div>
</div>

<div style="background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%); border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #991b1b; font-weight: 700;">NETWORK</div>
<div style="color: #dc2626; font-size: 12px;">PARTITION</div>
<div style="color: #dc2626; font-size: 20px;">X</div>
</div>

<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 20px; border: 2px solid #22c55e; flex: 1; min-width: 150px;">
<div style="color: #166534; font-weight: 700; text-align: center; margin-bottom: 12px;">Partition B</div>
<div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
<div style="background: #fff; border-radius: 8px; padding: 8px 12px; border: 1px solid #86efac;">
<div style="color: #475569; font-size: 12px;">Node 3</div>
</div>
<div style="background: #fff; border-radius: 8px; padding: 8px 12px; border: 1px solid #86efac;">
<div style="color: #475569; font-size: 12px;">Node 4</div>
</div>
<div style="background: #fff; border-radius: 8px; padding: 8px 12px; border: 1px solid #86efac;">
<div style="color: #475569; font-size: 12px;">Node 5</div>
</div>
</div>
<div style="color: #166534; font-size: 11px; text-align: center; margin-top: 8px;">3 nodes (majority)</div>
</div>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: rgba(239, 68, 68, 0.1); border-radius: 10px; padding: 16px; border: 1px solid #fca5a5;">
<div style="color: #991b1b; font-weight: 600; margin-bottom: 8px;">Partition A (Old Leader)</div>
<div style="color: #475569; font-size: 13px; line-height: 1.6;">
        Cannot commit new entries (no quorum)<br/>
Existing leader becomes <strong>read-only</strong><br/>
        Eventually steps down when term increases
</div>
</div>

<div style="background: rgba(34, 197, 94, 0.1); border-radius: 10px; padding: 16px; border: 1px solid #86efac;">
<div style="color: #166534; font-weight: 600; margin-bottom: 8px;">Partition B (New Leader)</div>
<div style="color: #475569; font-size: 13px; line-height: 1.6;">
        Election timeout triggers new election<br/>
        New leader elected with higher term<br/>
        Continues accepting writes normally
</div>
</div>
</div>

<div style="margin-top: 20px; background: rgba(99, 102, 241, 0.1); border-radius: 10px; padding: 16px; border: 1px solid #a5b4fc;">
<div style="color: #4338ca; font-weight: 600; margin-bottom: 8px;">How Consensus Prevents Split-Brain</div>
<div style="color: #475569; font-size: 13px;">
<strong>Quorum requirement:</strong> Leader needs majority to commit. With 5 nodes, both partitions cannot have 3+ nodes.<br/>
<strong>Term numbers:</strong> Old leader's stale term is rejected when partition heals.
</div>
</div>
</div>

### Split-Brain Prevention Strategies

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

1. **<span style="color:#16a34a;">Quorum-based writes</span>**: Require majority acknowledgment before committing
2. **<span style="color:#16a34a;">Fencing tokens</span>**: Monotonically increasing tokens to detect stale leaders
3. **<span style="color:#16a34a;">Leader leases</span>**: Time-bounded leadership with clock synchronization (see [[distributed locking]](/topic/system-design/distributed-locking))
4. **<span style="color:#16a34a;">STONITH</span>**: "Shoot The Other Node In The Head" - forcibly kill uncertain nodes
5. **<span style="color:#16a34a;">Witness nodes</span>**: Odd-numbered quorum helpers that don't store data

</div>

---

## Byzantine Fault Tolerance (BFT)

<span style="color:#16a34a;">Byzantine faults</span> are the most general class of failures where nodes can behave arbitrarily - including lying, sending conflicting information, or colluding maliciously.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
<div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">BYZANTINE GENERALS PROBLEM</div>

<div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-bottom: 24px;">
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 16px; text-align: center; border: 2px solid #22c55e;">
<div style="font-size: 24px;">General A</div>
<div style="color: #166534; font-weight: 600;">ATTACK</div>
<div style="color: #22c55e; font-size: 12px;">Loyal</div>
</div>
<div style="background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%); border-radius: 12px; padding: 16px; text-align: center; border: 2px solid #ef4444;">
<div style="font-size: 24px;">General B</div>
<div style="color: #991b1b; font-weight: 600;">RETREAT?</div>
<div style="color: #dc2626; font-size: 12px;">Traitor</div>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 16px; text-align: center; border: 2px solid #22c55e;">
<div style="font-size: 24px;">General C</div>
<div style="color: #166534; font-weight: 600;">ATTACK</div>
<div style="color: #22c55e; font-size: 12px;">Loyal</div>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 16px; text-align: center; border: 2px solid #22c55e;">
<div style="font-size: 24px;">General D</div>
<div style="color: #166534; font-weight: 600;">ATTACK</div>
<div style="color: #22c55e; font-size: 12px;">Loyal</div>
</div>
</div>

<div style="background: rgba(239, 68, 68, 0.1); border-radius: 10px; padding: 16px; margin-bottom: 20px; border: 1px solid #fca5a5;">
<div style="color: #991b1b; font-weight: 600; margin-bottom: 8px;">The Problem</div>
<div style="color: #475569; font-size: 13px;">
      Traitor B tells A "I'll attack" but tells C "I'll retreat". How can loyal generals agree?
</div>
</div>

<div style="background: rgba(34, 197, 94, 0.1); border-radius: 10px; padding: 16px; border: 1px solid #86efac;">
<div style="color: #166534; font-weight: 600; margin-bottom: 8px;">BFT Solution (3f+1 nodes)</div>
<div style="color: #475569; font-size: 13px;">
      With 4 generals and 1 traitor: A, C, D share messages. Even if B lies differently to each, the 3 loyal generals see majority "ATTACK" and agree.
</div>
</div>
</div>

### Practical BFT (PBFT)

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
<div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">PBFT THREE-PHASE PROTOCOL</div>

<div style="display: flex; flex-direction: column; gap: 16px;">
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 10px; padding: 16px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; margin-bottom: 8px;">Phase 1: Pre-prepare</div>
<div style="color: #475569; font-size: 13px;">
        Primary (leader) broadcasts request to all replicas with sequence number
</div>
<div style="margin-top: 8px; font-family: monospace; font-size: 12px; color: #3b82f6;">
        Primary -> All: PRE-PREPARE(view, seq, request)
</div>
</div>

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 10px; padding: 16px; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: 700; margin-bottom: 8px;">Phase 2: Prepare</div>
<div style="color: #475569; font-size: 13px;">
        Each replica broadcasts PREPARE to all others. Wait for 2f+1 matching prepares.
</div>
<div style="margin-top: 8px; font-family: monospace; font-size: 12px; color: #b45309;">
        Replica i -> All: PREPARE(view, seq, digest, i)
</div>
</div>

<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 10px; padding: 16px; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: 700; margin-bottom: 8px;">Phase 3: Commit</div>
<div style="color: #475569; font-size: 13px;">
        Each replica broadcasts COMMIT. Wait for 2f+1 matching commits, then execute.
</div>
<div style="margin-top: 8px; font-family: monospace; font-size: 12px; color: #15803d;">
        Replica i -> All: COMMIT(view, seq, i)
</div>
</div>
</div>

<div style="margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: rgba(239, 68, 68, 0.1); border-radius: 10px; padding: 16px; border: 1px solid #fca5a5;">
<div style="color: #991b1b; font-weight: 600; margin-bottom: 8px;">Cost</div>
<div style="color: #475569; font-size: 13px;">
        O(n^2) messages per consensus<br/>
        Limited to ~20-100 nodes<br/>
        Higher latency than Raft/Paxos
</div>
</div>
<div style="background: rgba(34, 197, 94, 0.1); border-radius: 10px; padding: 16px; border: 1px solid #86efac;">
<div style="color: #166534; font-weight: 600; margin-bottom: 8px;">Benefit</div>
<div style="color: #475569; font-size: 13px;">
        Tolerates malicious nodes<br/>
        Essential for blockchains<br/>
        Cryptographic guarantees
</div>
</div>
</div>
</div>

### When to Use BFT vs CFT

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
<div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">BFT vs CFT DECISION MATRIX</div>

<div style="overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <thead>
<tr style="border-bottom: 2px solid #cbd5e1;">
<th style="padding: 12px; text-align: left; color: #1e40af;">Scenario</th>
<th style="padding: 12px; text-align: center; color: #1e40af;">Recommendation</th>
<th style="padding: 12px; text-align: left; color: #1e40af;">Why</th>
</tr>
      </thead>
      <tbody>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b;">Internal microservices</td>
<td style="padding: 12px; text-align: center;"><span style="background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 4px;">CFT (Raft)</span></td>
<td style="padding: 12px; color: #64748b;">Trust boundary within org</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b;">Public blockchain</td>
<td style="padding: 12px; text-align: center;"><span style="background: #fee2e2; color: #991b1b; padding: 4px 8px; border-radius: 4px;">BFT</span></td>
<td style="padding: 12px; color: #64748b;">Untrusted participants</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b;">Consortium blockchain</td>
<td style="padding: 12px; text-align: center;"><span style="background: #fee2e2; color: #991b1b; padding: 4px 8px; border-radius: 4px;">BFT</span></td>
<td style="padding: 12px; color: #64748b;">Partial trust between orgs</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; color: #1e293b;">Database replication</td>
<td style="padding: 12px; text-align: center;"><span style="background: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 4px;">CFT (Raft)</span></td>
<td style="padding: 12px; color: #64748b;">Performance critical, trusted</td>
</tr>
<tr>
<td style="padding: 12px; color: #1e293b;">Financial settlement</td>
<td style="padding: 12px; text-align: center;"><span style="background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px;">BFT or CFT+Audit</span></td>
<td style="padding: 12px; color: #64748b;">Depends on trust model</td>
</tr>
      </tbody>
</table>
</div>
</div>

---

## Code Examples

### Python - Simplified Raft Node

```python
from enum import Enum
from dataclasses import dataclass, field
from typing import List, Optional, Dict, Any
import random
import threading
import time

class NodeState(Enum):
    FOLLOWER = "follower"
    CANDIDATE = "candidate"
    LEADER = "leader"

@dataclass
class LogEntry:
    term: int
    command: Any
    index: int

@dataclass
class RaftNode:
    node_id: str
    peers: List[str]

    # Persistent state (survives restarts)
    current_term: int = 0
    voted_for: Optional[str] = None
    log: List[LogEntry] = field(default_factory=list)

    # Volatile state
    state: NodeState = NodeState.FOLLOWER
    commit_index: int = 0
    last_applied: int = 0

    # Leader state (reinitialized after election)
    next_index: Dict[str, int] = field(default_factory=dict)
    match_index: Dict[str, int] = field(default_factory=dict)

    # Timing
    election_timeout: float = 0
    last_heartbeat: float = 0

    def __post_init__(self):
        self.reset_election_timeout()
        self.lock = threading.Lock()

    def reset_election_timeout(self):
        # Random timeout between 150-300ms prevents split votes
        self.election_timeout = random.uniform(150, 300) / 1000
        self.last_heartbeat = time.time()

    def should_start_election(self) -> bool:
        return time.time() - self.last_heartbeat > self.election_timeout

    def start_election(self):
        """Start leader election when timeout expires."""
        with self.lock:
            self.state = NodeState.CANDIDATE
            self.current_term += 1
            self.voted_for = self.node_id  # Vote for self
            self.reset_election_timeout()

        votes = 1  # Already voted for self

        last_log_index = len(self.log)
        last_log_term = self.log[-1].term if self.log else 0

        # Request votes from all peers in parallel
        for peer in self.peers:
            vote_granted = self.request_vote(
                peer,
                self.current_term,
                last_log_index,
                last_log_term
            )
            if vote_granted:
                votes += 1

        # Need majority to win
        quorum = (len(self.peers) + 1) // 2 + 1
        if votes >= quorum:
            self.become_leader()

    def become_leader(self):
        """Transition to leader state."""
        with self.lock:
            self.state = NodeState.LEADER

            # Initialize leader state for each follower
            next_idx = len(self.log) + 1
            for peer in self.peers:
                self.next_index[peer] = next_idx
                self.match_index[peer] = 0

        # Immediately send heartbeats to establish authority
        self.send_heartbeats()

    def receive_vote_request(self, candidate_id: str, term: int,
                             last_log_index: int, last_log_term: int) -> bool:
        """Handle RequestVote RPC from candidate."""
        with self.lock:
            # Reject if candidate's term is old
            if term < self.current_term:
                return False

            # Step down if we see a newer term
            if term > self.current_term:
                self.current_term = term
                self.state = NodeState.FOLLOWER
                self.voted_for = None

            # Check if candidate's log is at least as up-to-date
            my_last_term = self.log[-1].term if self.log else 0
            my_last_index = len(self.log)

            log_ok = (last_log_term > my_last_term or
                     (last_log_term == my_last_term and
                      last_log_index >= my_last_index))

            # Grant vote if we haven't voted yet and log is ok
            if (self.voted_for is None or
                self.voted_for == candidate_id) and log_ok:
                self.voted_for = candidate_id
                self.reset_election_timeout()
                return True

            return False

    def append_entries(self, term: int, leader_id: str,
                       prev_log_index: int, prev_log_term: int,
                       entries: List[LogEntry], leader_commit: int) -> bool:
        """Handle AppendEntries RPC (heartbeat or log replication)."""
        with self.lock:
            if term < self.current_term:
                return False

            self.reset_election_timeout()  # Leader is alive

            if term > self.current_term:
                self.current_term = term
                self.state = NodeState.FOLLOWER

            # Log consistency check
            if prev_log_index > 0:
                if len(self.log) < prev_log_index:
                    return False  # Log too short
                if self.log[prev_log_index - 1].term != prev_log_term:
                    return False  # Term mismatch

            # Append new entries (overwriting conflicts)
            for i, entry in enumerate(entries):
                idx = prev_log_index + i
                if idx < len(self.log):
                    if self.log[idx].term != entry.term:
                        self.log = self.log[:idx]  # Remove conflicting entries
                        self.log.append(entry)
                else:
                    self.log.append(entry)

            # Update commit index
            if leader_commit > self.commit_index:
                self.commit_index = min(leader_commit, len(self.log))

            return True

    def request_vote(self, peer: str, term: int,
                     last_log_index: int, last_log_term: int) -> bool:
        """Send RequestVote RPC to peer (stub for actual network call)."""
        # In real implementation, this would be an RPC call
        return True

    def send_heartbeats(self):
        """Send empty AppendEntries to all followers."""
        # In real implementation, this would send RPCs
        pass
```

### Go - Raft Leader Election

```go
package raft

import (
    "math/rand"
    "sync"
    "time"
)

type NodeState int

const (
    Follower NodeState = iota
    Candidate
    Leader
)

type LogEntry struct {
    Term    int
    Command interface{}
}

type RaftNode struct {
    mu sync.Mutex

    id    int
    peers []int

    // Persistent state
    currentTerm int
    votedFor    int
    log         []LogEntry

    // Volatile state
    state       NodeState
    commitIndex int
    lastApplied int

    // Leader state
    nextIndex  map[int]int
    matchIndex map[int]int

    // Channels for communication
    heartbeatCh chan struct{}
    voteCh      chan bool
}

func NewRaftNode(id int, peers []int) *RaftNode {
    node := &RaftNode{
        id:          id,
        peers:       peers,
        currentTerm: 0,
        votedFor:    -1,
        log:         make([]LogEntry, 0),
        state:       Follower,
        commitIndex: 0,
        lastApplied: 0,
        nextIndex:   make(map[int]int),
        matchIndex:  make(map[int]int),
        heartbeatCh: make(chan struct{}, 100),
        voteCh:      make(chan bool, 100),
    }

    go node.run()
    return node
}

func (n *RaftNode) run() {
    for {
        switch n.getState() {
        case Follower:
            n.runFollower()
        case Candidate:
            n.runCandidate()
        case Leader:
            n.runLeader()
        }
    }
}

func (n *RaftNode) runFollower() {
    timeout := time.Duration(150+rand.Intn(150)) * time.Millisecond
    timer := time.NewTimer(timeout)
    defer timer.Stop()

    select {
    case <-n.heartbeatCh:
        // Reset timer on heartbeat
        return
    case <-timer.C:
        // Election timeout - become candidate
        n.mu.Lock()
        n.state = Candidate
        n.mu.Unlock()
    }
}

func (n *RaftNode) runCandidate() {
    n.mu.Lock()
    n.currentTerm++
    n.votedFor = n.id
    term := n.currentTerm
    n.mu.Unlock()

    votes := 1 // Vote for self

    // Request votes from peers
    var wg sync.WaitGroup
    var voteMu sync.Mutex

    for _, peer := range n.peers {
        wg.Add(1)
        go func(peerId int) {
            defer wg.Done()
            if n.requestVote(peerId, term) {
                voteMu.Lock()
                votes++
                voteMu.Unlock()
            }
        }(peer)
    }

    wg.Wait()

    quorum := (len(n.peers)+1)/2 + 1
    n.mu.Lock()
    defer n.mu.Unlock()

    if n.state != Candidate || n.currentTerm != term {
        return // State changed during election
    }

    if votes >= quorum {
        n.state = Leader
        // Initialize leader state
        for _, peer := range n.peers {
            n.nextIndex[peer] = len(n.log) + 1
            n.matchIndex[peer] = 0
        }
    }
}

func (n *RaftNode) runLeader() {
    // Send heartbeats every 50ms
    ticker := time.NewTicker(50 * time.Millisecond)
    defer ticker.Stop()

    for range ticker.C {
        if n.getState() != Leader {
            return
        }
        n.sendHeartbeats()
    }
}

func (n *RaftNode) getState() NodeState {
    n.mu.Lock()
    defer n.mu.Unlock()
    return n.state
}

func (n *RaftNode) requestVote(peer int, term int) bool {
    // In real implementation, this would be an RPC call
    return true
}

func (n *RaftNode) sendHeartbeats() {
    // In real implementation, send AppendEntries RPCs to all peers
}
```

---

## Common Pitfalls

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">

  ### 1. Split Brain During Network Partitions
  **Problem**: Two leaders elected in different partitions.
**Solution**: Require majority <span style="color:#16a34a;">quorum</span> for all operations. Minority partition becomes read-only.

  ### 2. Forgetting to Persist State
  **Problem**: Node restarts and loses voted_for, causing double-voting.
  **Solution**: Always fsync currentTerm and votedFor before responding to RPCs.

  ### 3. Election Timeout Too Short
  **Problem**: Constant elections during high latency, no progress.
  **Solution**: Set timeout to at least 10x your p99 network latency.

  ### 4. Not Handling Stale Leaders
  **Problem**: Old leader continues accepting writes after partition heals.
  **Solution**: Check term in every operation; step down if stale.

  ### 5. Log Divergence
  **Problem**: Followers have conflicting log entries after leader failure.
  **Solution**: Always overwrite conflicting entries (Raft's Log Matching property).

  ### 6. Committing Entries from Previous Terms
  **Problem**: Leader commits old-term entries that might be overwritten.
  **Solution**: Only commit entries from current term; previous entries commit indirectly.

  ### 7. Ignoring Pre-Vote Optimization
  **Problem**: Isolated nodes rejoin and disrupt cluster with stale elections.
  **Solution**: Implement pre-vote: candidates check if they could win before incrementing term.

</div>

---

## Interview Questions - 3-Level Deep Dive

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

  ### Q1: Why is Raft preferred over Paxos in practice?

**Answer**: Raft is preferred because it was explicitly designed for understandability. It decomposes consensus into three independent sub-problems (<span style="color:#16a34a;">leader election</span>, <span style="color:#16a34a;">log replication</span>, <span style="color:#16a34a;">safety</span>), uses a strong leader model, and has clear state transitions. Paxos, while theoretically elegant, is notoriously difficult to implement correctly.

<div style="background: rgba(99, 102, 241, 0.1); border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 3px solid #6366f1;">

    **Follow-up 1.1: What are the practical differences in implementation complexity?**

    Paxos requires handling concurrent proposers with proposal number conflicts, implementing the "adopt highest-numbered accepted value" rule correctly, and managing the conceptual separation of proposers, acceptors, and learners. Raft simplifies this by having a single leader that handles all client requests, eliminating proposal conflicts. The leader election in Raft uses simple term numbers and majority voting, while Paxos leader election (Multi-Paxos) requires running a full Paxos round.

<div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 12px; margin: 12px 0; border-left: 3px solid #8b5cf6;">

      **Follow-up 1.1.1: Can Paxos outperform Raft in any scenario?**

      Yes, in scenarios with multiple concurrent proposers or geo-distributed systems. Paxos doesn't require a stable leader, so it can make progress during leader churn. Multi-Paxos can also pipeline proposals more aggressively. Google Spanner uses Paxos partially because their geo-distributed setup benefits from its flexibility in leader placement and the ability to handle multiple data centers as first-class participants.

</div>
</div>

<div style="background: rgba(99, 102, 241, 0.1); border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 3px solid #6366f1;">

    **Follow-up 1.2: How does Raft's strong leader model affect availability?**

    The strong leader is a single point of failure for write availability. When the leader fails, the cluster cannot accept writes until a new leader is elected (typically 150-300ms). This is acceptable for most applications but problematic for systems requiring continuous write availability. Multi-leader approaches sacrifice some consistency guarantees for better write availability.

<div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 12px; margin: 12px 0; border-left: 3px solid #8b5cf6;">

      **Follow-up 1.2.1: How do production systems mitigate leader failure impact?**

Production systems use several techniques: (1) <span style="color:#16a34a;">Pre-vote optimization</span> to prevent disruptive elections, (2) <span style="color:#16a34a;">Leader stickiness</span> with lease-based leadership to reduce unnecessary elections, (3) <span style="color:#16a34a;">Client-side retries</span> with exponential backoff during elections, (4) <span style="color:#16a34a;">Multi-Raft</span> where data is sharded across multiple Raft groups (used by CockroachDB, TiKV) so leader failures affect only one shard.

</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

  ### Q2: How does Raft handle network partitions?

  **Answer**: During a partition, the minority side cannot elect a leader (lacks quorum) and becomes read-only. The majority side continues operating with a new leader if needed. When the partition heals, nodes in the minority catch up from the leader's log, and any stale leader steps down upon seeing a higher term.

<div style="background: rgba(99, 102, 241, 0.1); border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 3px solid #6366f1;">

    **Follow-up 2.1: What happens to in-flight client requests during a partition?**

    Requests to the old leader in the minority partition will timeout (leader can't get quorum for commits). Requests to the new leader succeed normally. After partition heals, clients connected to the old leader discover it's no longer leader (via error response or redirection) and must retry with the new leader. This is why clients need proper retry logic and leader discovery mechanisms.

<div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 12px; margin: 12px 0; border-left: 3px solid #8b5cf6;">

      **Follow-up 2.1.1: How do you prevent data loss for uncommitted entries?**

Uncommitted entries on the old leader may be lost. This is by design - Raft only guarantees durability for <span style="color:#16a34a;">committed</span> entries (replicated to majority). Clients should not consider a write successful until receiving confirmation. For critical operations, use application-level acknowledgment (e.g., read-your-writes by reading back). Some systems implement "sticky sessions" to ensure clients always talk to the same replica until explicitly redirected.

</div>
</div>

<div style="background: rgba(99, 102, 241, 0.1); border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 3px solid #6366f1;">

    **Follow-up 2.2: Can you have linearizable reads during a partition?**

    The minority partition cannot provide linearizable reads because it might be stale. The majority partition can provide linearizable reads through the leader (with a ReadIndex optimization or lease-based reads). Followers in the majority can serve linearizable reads if they confirm the leader's lease is still valid or wait for a heartbeat round.

<div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 12px; margin: 12px 0; border-left: 3px solid #8b5cf6;">

      **Follow-up 2.2.1: Explain the ReadIndex optimization in detail.**

      ReadIndex allows linearizable reads without writing to the log: (1) Leader records current commitIndex as readIndex, (2) Leader sends heartbeat to confirm it's still leader, (3) Leader waits until appliedIndex >= readIndex, (4) Leader executes read. This avoids log writes for reads while maintaining linearizability. For follower reads, the follower asks the leader for the current commitIndex, then waits locally until it has applied that index. See [[database replication]](/topic/system-design/database-replication) for more on read consistency models.

</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

  ### Q3: What's the difference between crash and Byzantine failures?

**Answer**: <span style="color:#16a34a;">Crash failures</span> assume nodes fail by stopping (fail-stop model) - they either work correctly or don't respond. <span style="color:#16a34a;">Byzantine failures</span> assume nodes can behave arbitrarily - lying, sending conflicting messages, or colluding. Crash-fault tolerant systems need 2f+1 nodes for f failures; Byzantine-fault tolerant systems need 3f+1.

<div style="background: rgba(99, 102, 241, 0.1); border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 3px solid #6366f1;">

    **Follow-up 3.1: Why does BFT require 3f+1 nodes instead of 2f+1?**

    With Byzantine faults, you need 2f+1 honest nodes to outvote f Byzantine nodes, but you also need f extra nodes because Byzantine nodes might not respond (mimicking crash). So you need n - f >= 2f+1, which gives n >= 3f+1. Additionally, in BFT, you can't trust any single response - you need a quorum of 2f+1 matching responses to be sure at least f+1 are from honest nodes.

<div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 12px; margin: 12px 0; border-left: 3px solid #8b5cf6;">

      **Follow-up 3.1.1: How does PBFT achieve consensus with malicious nodes?**

PBFT uses three phases with all-to-all communication: (1) <span style="color:#16a34a;">Pre-prepare</span>: leader broadcasts request, (2) <span style="color:#16a34a;">Prepare</span>: each node broadcasts to all others, waits for 2f+1 matching prepares, (3) <span style="color:#16a34a;">Commit</span>: each node broadcasts commit, waits for 2f+1 matching commits. The redundant communication (O(n^2) messages) ensures that even if Byzantine nodes send conflicting messages, honest nodes see consistent quorums. Cryptographic signatures prevent message forgery.

</div>
</div>

<div style="background: rgba(99, 102, 241, 0.1); border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 3px solid #6366f1;">

    **Follow-up 3.2: When would you use BFT in a non-blockchain context?**

    BFT is useful when you can't trust all participants: (1) Multi-organization systems where participants might cheat, (2) Systems with untrusted hardware (protecting against compromised servers), (3) Highly regulated environments requiring tamper-evident audit logs, (4) Supply chain tracking across competing companies. The overhead is significant, so it's only justified when the trust assumption is genuinely required.

<div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 12px; margin: 12px 0; border-left: 3px solid #8b5cf6;">

      **Follow-up 3.2.1: What are modern BFT optimizations for better performance?**

Modern BFT systems use several optimizations: (1) <span style="color:#16a34a;">Speculative execution</span>: execute before full consensus, rollback if needed (Zyzzyva), (2) <span style="color:#16a34a;">Threshold signatures</span>: aggregate signatures to reduce message size, (3) <span style="color:#16a34a;">Trusted execution environments (TEE)</span>: use hardware enclaves to reduce Byzantine assumptions (CCF), (4) <span style="color:#16a34a;">HotStuff</span>: linear message complexity through pipelining and leader rotation, used by Facebook's Diem/Libra.

</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

  ### Q4: How many failures can a 5-node Raft cluster tolerate?

  **Answer**: A 5-node cluster can tolerate 2 failures. With 5 nodes, the quorum (majority) is 3. As long as 3 nodes are alive, the cluster can elect a leader and commit entries. The formula is: with n nodes, tolerates (n-1)/2 failures.

<div style="background: rgba(99, 102, 241, 0.1); border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 3px solid #6366f1;">

    **Follow-up 4.1: Why use 5 nodes instead of 4 or 6?**

    5 nodes is often optimal because: (1) 4 and 5 nodes both tolerate 2 failures (quorum is 3 for both), so 5th node costs money without improving fault tolerance, (2) 6 nodes tolerates 2 failures (quorum is 4), same as 5, (3) Odd numbers prevent ties in voting. Going from 5 to 7 nodes increases fault tolerance to 3 failures. Choose based on your failure domain analysis and cost constraints.

<div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 12px; margin: 12px 0; border-left: 3px solid #8b5cf6;">

      **Follow-up 4.1.1: How do you handle multi-datacenter deployments with Raft?**

Multi-DC deployments face a tradeoff: (1) <span style="color:#16a34a;">Quorum within single DC</span>: fast commits but vulnerable to DC failure, (2) <span style="color:#16a34a;">Quorum across DCs</span>: DC-failure tolerant but high latency (cross-DC round trips). Solutions include: (a) Witness nodes in third DC (just vote, don't store data), (b) Flexible Paxos with asymmetric quorums, (c) Multi-Raft with strategic shard placement. CockroachDB lets you configure "localities" to prefer same-region replicas. See [[availability]](/topic/system-design/availability) for more on multi-DC patterns.

</div>
</div>

<div style="background: rgba(99, 102, 241, 0.1); border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 3px solid #6366f1;">

    **Follow-up 4.2: What happens when exactly half the nodes fail (2 of 4)?**

    With 2 of 4 nodes remaining, you cannot reach quorum (need 3). The cluster becomes unavailable for writes and linearizable reads. This is why even-numbered clusters are discouraged - you pay for an extra node but get no additional fault tolerance. With 4 nodes, you might as well use 3 and save costs, or use 5 and gain one more failure tolerance.

<div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 12px; margin: 12px 0; border-left: 3px solid #8b5cf6;">

      **Follow-up 4.2.1: Can you recover from loss of quorum without data loss?**

      If logs are intact on disk, yes - you can manually force a new configuration with the surviving nodes. This is an operational procedure, not automatic. etcd provides `--force-new-cluster` for this. CockroachDB has similar recovery procedures. The key insight is that Raft's safety guarantees are for the algorithm's operation - manual intervention with operational tools can bypass normal quorum requirements when necessary, but you must ensure no concurrent operations.

</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

  ### Q5: Explain the difference between committed and applied in Raft.

**Answer**: <span style="color:#16a34a;">Committed</span> means an entry is replicated on a majority of nodes and is guaranteed durable - it will never be lost or overwritten. <span style="color:#16a34a;">Applied</span> means the entry has been executed by the state machine, producing side effects (e.g., updating a database). Committed entries must be applied in order, but there's often a lag between commit and apply.

<div style="background: rgba(99, 102, 241, 0.1); border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 3px solid #6366f1;">

    **Follow-up 5.1: Why is this distinction important for client responses?**

    A client should receive a success response only after the entry is committed (durable), not just when received by the leader. However, the client doesn't need to wait for apply - the commit guarantees the operation will eventually be applied. Some systems return immediately after commit; others wait for apply if the response depends on execution (e.g., a read-after-write). Understanding this helps design proper [[API design]](/topic/system-design/api-design) semantics.

<div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 12px; margin: 12px 0; border-left: 3px solid #8b5cf6;">

      **Follow-up 5.1.1: How do you handle slow state machine apply?**

If the state machine apply is slow (e.g., complex database operations), committed entries can queue up. Solutions: (1) <span style="color:#16a34a;">Async apply</span>: respond to client after commit, apply asynchronously (but track what's applied for reads), (2) <span style="color:#16a34a;">Batch apply</span>: group multiple entries into single state machine operation, (3) <span style="color:#16a34a;">Separate commit and apply threads</span>: parallelize the two operations, (4) <span style="color:#16a34a;">Snapshot-based recovery</span>: if too far behind, restore from snapshot instead of replaying log.

</div>
</div>

<div style="background: rgba(99, 102, 241, 0.1); border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 3px solid #6366f1;">

    **Follow-up 5.2: What's lastApplied used for in Raft?**

    lastApplied tracks the highest log index applied to the state machine. It's used for: (1) Ensuring entries are applied in order (only apply when commitIndex > lastApplied), (2) Read consistency checks (can serve read when lastApplied >= readIndex), (3) Snapshot creation (snapshot represents state at lastApplied), (4) Recovery after restart (don't re-apply already-applied entries).

<div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 12px; margin: 12px 0; border-left: 3px solid #8b5cf6;">

      **Follow-up 5.2.1: How do snapshots interact with log compaction?**

      Snapshots capture state machine state at a point in time (lastApplied). Once snapshotted, log entries before that index can be discarded. When a follower is very behind, the leader sends the snapshot instead of replaying the entire log. Key considerations: (1) Snapshot must be consistent (atomic point-in-time capture), (2) Include Raft metadata (term, index) in snapshot, (3) Handle partial snapshot transfers gracefully, (4) Don't discard entries that uncommitted followers still need.

</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

  ### Q6: How does Raft prevent split-brain with an even number of nodes?

  **Answer**: Majority requires (n/2)+1 nodes. With 4 nodes, you need 3 to agree. Even in a perfect 2-2 split, neither side has 3 nodes, so neither can elect a leader. The cluster becomes unavailable rather than risking inconsistency. This is the [[CAP theorem]](/topic/system-design/cap-theorem) in action - Raft chooses consistency over availability during partitions.

<div style="background: rgba(99, 102, 241, 0.1); border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 3px solid #6366f1;">

    **Follow-up 6.1: What are witness nodes and when should you use them?**

<span style="color:#16a34a;">Witness nodes</span> (or arbiters) participate in voting but don't store data. They're useful for: (1) Breaking ties in even-numbered clusters across 2 DCs (put witness in 3rd location), (2) Reducing storage costs (don't replicate data to witness), (3) Cross-DC quorum with lower latency (witness is lightweight). CockroachDB, MongoDB, and etcd all support witness-like configurations.

<div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 12px; margin: 12px 0; border-left: 3px solid #8b5cf6;">

      **Follow-up 6.1.1: How do witnesses affect read scalability and recovery?**

      Witnesses can vote for leader election but cannot serve reads (no data). They can't become leader in most implementations. For recovery after majority loss, witnesses don't help - you need actual data nodes. In split-brain prevention, witnesses are valuable, but for data durability, you still need sufficient data-bearing replicas. Design your witness placement based on failure domain analysis, not just node count.

</div>
</div>

<div style="background: rgba(99, 102, 241, 0.1); border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 3px solid #6366f1;">

    **Follow-up 6.2: Can flexible quorums help with the even-node problem?**

<span style="color:#16a34a;">Flexible Paxos</span> allows asymmetric quorums: write quorum + read quorum > n (instead of both being majority). With 4 nodes, you could use write quorum of 3 and read quorum of 2. This still prevents split-brain (3+2 > 4 ensures overlap) but allows more flexibility. However, Raft's standard implementation uses symmetric majority quorums.

<div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 12px; margin: 12px 0; border-left: 3px solid #8b5cf6;">

      **Follow-up 6.2.1: What's the practical use case for flexible quorums?**

      Flexible quorums shine in geo-distributed systems. Example: 5 nodes across 3 DCs (2+2+1). With standard quorum (3), every write requires cross-DC round trip. With flexible quorum: write quorum of 3 (can be satisfied within single DC if you have 3 there), read quorum of 3 (ensures seeing latest write). You optimize for the common case (writes within DC) while maintaining safety. This is how Google Spanner achieves low latency despite global distribution.

</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

  ### Q7: What happens if a leader commits an entry but crashes before notifying followers?

  **Answer**: The entry is safe because it was replicated to a majority before commit. The new leader will necessarily have that entry (leader election requires the most up-to-date log). The new leader includes it in subsequent AppendEntries, and followers will commit it when they see the leader's higher commitIndex.

<div style="background: rgba(99, 102, 241, 0.1); border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 3px solid #6366f1;">

    **Follow-up 7.1: How does the "up-to-date log" requirement work in leader election?**

    In Raft, voters reject candidates with logs less up-to-date than their own. "Up-to-date" means: (1) Higher last log term wins, (2) If terms equal, longer log wins. This ensures the new leader has all committed entries. Since committed entries are on majority, and candidate needs majority votes, at least one voter has the committed entry and will reject candidates without it.

<div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 12px; margin: 12px 0; border-left: 3px solid #8b5cf6;">

      **Follow-up 7.1.1: What about uncommitted entries from the old leader's current term?**

      Uncommitted entries from the old leader's term might be lost if they weren't on a majority. The new leader might have different entries at those indices. This is safe because the client never received confirmation. However, there's a subtle issue: a new leader cannot immediately commit entries from previous terms by counting replicas. It must first commit an entry from its own term, which then indirectly commits all prior entries. This prevents the "figure 8" scenario in the Raft paper.

</div>
</div>

<div style="background: rgba(99, 102, 241, 0.1); border-radius: 8px; padding: 16px; margin: 12px 0; border-left: 3px solid #6366f1;">

    **Follow-up 7.2: How do clients know their request succeeded if the leader crashed?**

Clients should use <span style="color:#16a34a;">idempotent requests</span> with unique IDs. After timeout, client retries with same ID. If the original request was committed, the new leader's state machine returns cached result. If not committed, it's safe to re-execute. Systems like etcd store request IDs and results in the state machine. This also requires client session management for lease-based duplicate detection.

<div style="background: rgba(139, 92, 246, 0.1); border-radius: 8px; padding: 12px; margin: 12px 0; border-left: 3px solid #8b5cf6;">

      **Follow-up 7.2.1: How long should you keep client request IDs to prevent duplicates?**

      This depends on your client timeout and retry policy. Typically: (1) Use client sessions with TTL (e.g., 30 seconds), (2) Store request ID -> response mapping in state machine, (3) Clean up entries when session expires or client explicitly ends session. For exactly-once semantics, you need persistent storage of request IDs. Some systems (like etcd) bound this by limiting concurrent client requests and using sequence numbers per session.

</div>
</div>
</div>

</div>

---

## Best Practices

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

  1. **Use odd number of nodes** - Maximizes fault tolerance per dollar spent

  2. **Monitor leader elections** - Frequent elections indicate network or configuration issues. Track election count, term progression, and leader tenure.

  3. **Tune timeouts carefully** - Election timeout should be >> heartbeat interval (typically 10x). Consider your p99 network latency.

  4. **Implement proper persistence** - Log and voted state must survive restarts. Use fsync before responding to RPCs.

  5. **Test failure scenarios** - Use chaos engineering to validate behavior. Simulate network partitions, slow disks, and clock skew.

  6. **Consider read scalability** - Linearizable reads require leader involvement. Use [[caching]](/topic/system-design/caching) or relaxed consistency for read-heavy workloads.

  7. **Pre-vote optimization** - Prevents disruption from isolated nodes rejoining with stale elections.

  8. **Implement log compaction** - Without snapshots, logs grow unbounded. Schedule regular compaction.

  9. **Use Multi-Raft for large datasets** - Single Raft group limits throughput. Shard data across multiple groups.

  10. **Plan for operational scenarios** - Membership changes, node replacement, and disaster recovery need documented procedures.

</div>

---

## Related Topics

- [[CAP Theorem]](/topic/system-design/cap-theorem) - Fundamental trade-offs in distributed systems
- [[Database Replication]](/topic/system-design/database-replication) - Replication strategies and consistency models
- [[Distributed Locking]](/topic/system-design/distributed-locking) - Leader election and coordination
- [[Availability]](/topic/system-design/availability) - High availability patterns
- [[Message Queues]](/topic/system-design/message-queues) - Kafka and ZooKeeper use cases
- [[Event Sourcing]](/topic/system-design/event-sourcing) - Log-based architectures
