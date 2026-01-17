# CAP Theorem

## Overview

The CAP theorem, proposed by Eric Brewer in 2000, states that a distributed data store can provide only two of the following three guarantees simultaneously:

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">
- **Consistency**: Every read receives the most recent write
- **Availability**: Every request receives a response (success or failure)
- **Partition Tolerance**: System continues to operate despite network partitions
</div>

## Key Concepts

### The CAP Triangle

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">THE CAP THEOREM</h3>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
    <!-- Triangle visualization -->
    <div style="position: relative; width: 300px; height: 260px;">
      <!-- Top vertex - Consistency -->
      <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); text-align: center;">
        <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); color: white; padding: 12px 20px; border-radius: 8px; font-weight: 600;">CONSISTENCY</div>
      </div>
      <!-- Triangle shape with labels -->
      <div style="position: absolute; top: 60px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 130px solid transparent; border-right: 130px solid transparent; border-bottom: 180px solid rgba(88, 166, 255, 0.1);"></div>
      <!-- CP label -->
      <div style="position: absolute; top: 100px; left: 50%; transform: translateX(-50%); text-align: center;">
        <div style="color: #7ee787; font-weight: 600; font-size: 14px;">CP</div>
        <div style="color: #8b949e; font-size: 11px; margin-top: 4px;">MongoDB, HBase<br>Zookeeper</div>
      </div>
      <!-- CA label (left) -->
      <div style="position: absolute; top: 140px; left: 10px; text-align: center;">
        <div style="color: #f0883e; font-weight: 600; font-size: 12px;">CA</div>
        <div style="color: #8b949e; font-size: 10px;">(Single Node)</div>
      </div>
      <!-- AP label (right) -->
      <div style="position: absolute; top: 140px; right: 10px; text-align: center;">
        <div style="color: #a371f7; font-weight: 600; font-size: 12px;">AP</div>
        <div style="color: #8b949e; font-size: 10px;">Cassandra<br>DynamoDB</div>
      </div>
      <!-- Center label -->
      <div style="position: absolute; top: 150px; left: 50%; transform: translateX(-50%); background: rgba(248, 81, 73, 0.2); border: 1px solid #f85149; padding: 6px 12px; border-radius: 6px;">
        <span style="color: #f85149; font-weight: 600; font-size: 13px;">PICK TWO!</span>
      </div>
      <!-- Bottom vertices -->
      <div style="position: absolute; bottom: 0; left: 0; text-align: center;">
        <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); color: white; padding: 12px 16px; border-radius: 8px; font-weight: 600; font-size: 13px;">AVAILABILITY</div>
      </div>
      <div style="position: absolute; bottom: 0; right: 0; text-align: center;">
        <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); color: white; padding: 12px 16px; border-radius: 8px; font-weight: 600; font-size: 13px;">PARTITION<br>TOLERANCE</div>
      </div>
    </div>
    <!-- Warning note -->
    <div style="background: rgba(248, 81, 73, 0.1); border: 1px solid rgba(248, 81, 73, 0.4); border-radius: 8px; padding: 16px; margin-top: 16px; max-width: 500px;">
      <div style="color: #f85149; font-weight: 600; margin-bottom: 8px;">⚠️ In distributed systems, P is mandatory!</div>
      <div style="color: #8b949e; font-size: 14px;">Network partitions WILL happen. So you really choose between C and A.</div>
    </div>
  </div>
</div>

### The Three Properties

#### Consistency (C)

All nodes see the same data at the same time. After a write completes, all subsequent reads return that value.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">CONSISTENCY</h3>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
    <!-- Client write action -->
    <div style="color: #c9d1d9; font-size: 14px;">Client writes <span style="color: #7ee787; font-weight: 600;">X=5</span></div>
    <div style="color: #58a6ff; font-size: 20px;">↓</div>
    <!-- Nodes with replication -->
    <div style="display: flex; align-items: center; gap: 40px;">
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 20px 30px; border-radius: 12px; text-align: center;">
        <div style="color: white; font-weight: 600; margin-bottom: 8px;">Node A</div>
        <div style="color: rgba(255,255,255,0.9); font-size: 14px;">X=5</div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
        <div style="color: #58a6ff; font-size: 24px;">→→→</div>
        <div style="color: #8b949e; font-size: 12px;">Replicate</div>
      </div>
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 20px 30px; border-radius: 12px; text-align: center;">
        <div style="color: white; font-weight: 600; margin-bottom: 8px;">Node B</div>
        <div style="color: rgba(255,255,255,0.9); font-size: 14px;">X=5</div>
      </div>
    </div>
    <!-- Read results -->
    <div style="display: flex; gap: 80px; margin-top: 8px;">
      <div style="text-align: center;">
        <div style="color: #58a6ff; font-size: 16px; margin-bottom: 4px;">↓</div>
        <div style="color: #7ee787;">Read X → 5 ✓</div>
      </div>
      <div style="text-align: center;">
        <div style="color: #58a6ff; font-size: 16px; margin-bottom: 4px;">↓</div>
        <div style="color: #7ee787;">Read X → 5 ✓</div>
      </div>
    </div>
    <!-- Success note -->
    <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.4); border-radius: 8px; padding: 12px 20px; margin-top: 8px;">
      <span style="color: #7ee787; font-weight: 600;">✓ CONSISTENT:</span>
      <span style="color: #c9d1d9;"> Both nodes return same value</span>
    </div>
  </div>
</div>

#### Availability (A)

Every request to a non-failing node returns a response. The system remains operational.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">AVAILABILITY</h3>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <!-- Client 1 -->
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 12px 20px; border-radius: 8px; min-width: 100px; text-align: center;">
        <span style="color: white; font-weight: 600;">Client 1</span>
      </div>
      <span style="color: #58a6ff; font-size: 20px;">→</span>
      <div style="background: #21262d; padding: 10px 16px; border-radius: 8px; border: 1px solid #30363d;">
        <span style="color: #c9d1d9;">Node A</span>
      </div>
      <span style="color: #58a6ff; font-size: 20px;">→</span>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="color: #7ee787; font-weight: 600;">Response ✓</span>
        <span style="color: #8b949e; font-size: 12px;">(within timeout)</span>
      </div>
    </div>
    <!-- Client 2 -->
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 12px 20px; border-radius: 8px; min-width: 100px; text-align: center;">
        <span style="color: white; font-weight: 600;">Client 2</span>
      </div>
      <span style="color: #58a6ff; font-size: 20px;">→</span>
      <div style="background: #21262d; padding: 10px 16px; border-radius: 8px; border: 1px solid #30363d;">
        <span style="color: #c9d1d9;">Node B</span>
      </div>
      <span style="color: #58a6ff; font-size: 20px;">→</span>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="color: #7ee787; font-weight: 600;">Response ✓</span>
        <span style="color: #8b949e; font-size: 12px;">(within timeout)</span>
      </div>
    </div>
    <!-- Client 3 -->
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 12px 20px; border-radius: 8px; min-width: 100px; text-align: center;">
        <span style="color: white; font-weight: 600;">Client 3</span>
      </div>
      <span style="color: #58a6ff; font-size: 20px;">→</span>
      <div style="background: #21262d; padding: 10px 16px; border-radius: 8px; border: 1px solid #30363d;">
        <span style="color: #c9d1d9;">Node C</span>
      </div>
      <span style="color: #58a6ff; font-size: 20px;">→</span>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="color: #7ee787; font-weight: 600;">Response ✓</span>
        <span style="color: #8b949e; font-size: 12px;">(within timeout)</span>
      </div>
    </div>
    <!-- Success note -->
    <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.4); border-radius: 8px; padding: 12px 20px; margin-top: 8px;">
      <span style="color: #7ee787; font-weight: 600;">✓ AVAILABLE:</span>
      <span style="color: #c9d1d9;"> Every request gets a response (even if data is stale)</span>
    </div>
  </div>
</div>

#### Partition Tolerance (P)

The system continues to function despite network partitions (communication breaks between nodes).

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">PARTITION TOLERANCE</h3>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <!-- Normal operation -->
    <div>
      <div style="color: #8b949e; font-size: 13px; margin-bottom: 12px;">Normal operation:</div>
      <div style="display: flex; align-items: center; justify-content: center; gap: 24px;">
        <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 16px 24px; border-radius: 10px; text-align: center;">
          <span style="color: white; font-weight: 600;">Node A</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <span style="color: #7ee787; font-size: 20px;">← → → →</span>
          <span style="color: #7ee787; font-size: 12px; margin-top: 4px;">Network OK</span>
        </div>
        <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 16px 24px; border-radius: 10px; text-align: center;">
          <span style="color: white; font-weight: 600;">Node B</span>
        </div>
      </div>
    </div>
    <!-- Partition scenario -->
    <div>
      <div style="color: #8b949e; font-size: 13px; margin-bottom: 12px;">Network Partition (cable cut, router failure, etc.):</div>
      <div style="display: flex; align-items: center; justify-content: center; gap: 24px;">
        <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 16px 24px; border-radius: 10px; text-align: center;">
          <span style="color: white; font-weight: 600;">Node A</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="background: rgba(248, 81, 73, 0.2); border: 2px dashed #f85149; padding: 8px 16px; border-radius: 8px;">
            <span style="color: #f85149; font-weight: 600; font-size: 14px;">X X X PARTITION! X X X</span>
          </div>
        </div>
        <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 16px 24px; border-radius: 10px; text-align: center;">
          <span style="color: white; font-weight: 600;">Node B</span>
        </div>
      </div>
      <!-- Still serving -->
      <div style="display: flex; justify-content: center; gap: 120px; margin-top: 16px;">
        <div style="text-align: center;">
          <div style="color: #58a6ff; font-size: 16px;">↓</div>
          <div style="color: #7ee787; font-weight: 600;">Still serves clients! ✓</div>
        </div>
        <div style="text-align: center;">
          <div style="color: #58a6ff; font-size: 16px;">↓</div>
          <div style="color: #7ee787; font-weight: 600;">Still serves clients! ✓</div>
        </div>
      </div>
    </div>
    <!-- Success note -->
    <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.4); border-radius: 8px; padding: 12px 20px;">
      <span style="color: #7ee787; font-weight: 600;">✓ PARTITION TOLERANT:</span>
      <span style="color: #c9d1d9;"> System keeps working despite network failure</span>
    </div>
  </div>
</div>

### Why Only Two?

In a distributed system, network partitions are inevitable. When a partition occurs, you must choose:

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">THE PARTITION DILEMMA</h3>
  <!-- Scenario -->
  <div style="margin-bottom: 24px;">
    <div style="color: #8b949e; font-size: 13px; margin-bottom: 16px;">Scenario: Network partition occurs</div>
    <div style="display: flex; align-items: center; justify-content: center; gap: 24px;">
      <div style="text-align: center;">
        <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 16px 24px; border-radius: 10px; margin-bottom: 8px;">
          <div style="color: white; font-weight: 600;">Node A</div>
          <div style="color: rgba(255,255,255,0.8); font-size: 13px;">X = 5</div>
        </div>
        <div style="color: #8b949e; font-size: 12px;">Client 1<br><span style="color: #f0883e;">writes X=10</span></div>
      </div>
      <div style="background: rgba(248, 81, 73, 0.2); border: 2px dashed #f85149; padding: 8px 16px; border-radius: 8px;">
        <span style="color: #f85149; font-weight: 600; font-size: 13px;">PARTITION!</span>
      </div>
      <div style="text-align: center;">
        <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 16px 24px; border-radius: 10px; margin-bottom: 8px;">
          <div style="color: white; font-weight: 600;">Node B</div>
          <div style="color: rgba(255,255,255,0.8); font-size: 13px;">X = 5</div>
        </div>
        <div style="color: #8b949e; font-size: 12px;">Client 2<br><span style="color: #58a6ff;">reads X</span></div>
      </div>
    </div>
  </div>
  <!-- Options grid -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
    <!-- Option 1: CP -->
    <div style="background: rgba(35, 134, 54, 0.1); border: 1px solid rgba(35, 134, 54, 0.3); border-radius: 12px; padding: 20px;">
      <div style="color: #7ee787; font-weight: 600; margin-bottom: 12px;">OPTION 1: CHOOSE CONSISTENCY (CP)</div>
      <div style="color: #c9d1d9; font-size: 13px; margin-bottom: 12px;">
        Node A: "Can't confirm B received update..."<br>
        <span style="color: #f85149; font-weight: 600;">"REJECT the write!" X</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px; font-size: 13px;">
        <span style="color: #7ee787;">✓ Consistent: No stale reads</span>
        <span style="color: #f85149;">X Not Available: Write rejected</span>
      </div>
    </div>
    <!-- Option 2: AP -->
    <div style="background: rgba(31, 111, 235, 0.1); border: 1px solid rgba(31, 111, 235, 0.3); border-radius: 12px; padding: 20px;">
      <div style="color: #58a6ff; font-weight: 600; margin-bottom: 12px;">OPTION 2: CHOOSE AVAILABILITY (AP)</div>
      <div style="color: #c9d1d9; font-size: 13px; margin-bottom: 12px;">
        Node A: <span style="color: #7ee787;">"Accept write X=10" ✓</span><br>
        Node B: <span style="color: #7ee787;">"Return X=5 (stale)" ✓</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px; font-size: 13px;">
        <span style="color: #7ee787;">✓ Available: Both requests succeed</span>
        <span style="color: #f85149;">X Not Consistent: Different values!</span>
      </div>
    </div>
  </div>
</div>

## CAP Trade-offs

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">CAP TRADE-OFF COMPARISON</h3>
  <div style="display: grid; gap: 12px;">
    <!-- Header -->
    <div style="display: grid; grid-template-columns: 60px 1fr 1fr 1fr; gap: 12px; padding: 12px 16px; background: rgba(88, 166, 255, 0.1); border-radius: 8px;">
      <div style="color: #58a6ff; font-weight: 600; font-size: 13px;">Type</div>
      <div style="color: #58a6ff; font-weight: 600; font-size: 13px;">During Partition</div>
      <div style="color: #58a6ff; font-weight: 600; font-size: 13px;">Examples</div>
      <div style="color: #58a6ff; font-weight: 600; font-size: 13px;">Best For</div>
    </div>
    <!-- CP Row -->
    <div style="display: grid; grid-template-columns: 60px 1fr 1fr 1fr; gap: 12px; padding: 16px; background: rgba(35, 134, 54, 0.1); border: 1px solid rgba(35, 134, 54, 0.3); border-radius: 8px;">
      <div style="color: #7ee787; font-weight: 700; font-size: 16px;">CP</div>
      <div style="color: #c9d1d9; font-size: 13px;">Reject requests to maintain consistency</div>
      <div style="color: #8b949e; font-size: 13px;">MongoDB, Zookeeper, HBase, Redis Cluster</div>
      <div style="color: #c9d1d9; font-size: 13px;">Banking, Config, Inventory</div>
    </div>
    <!-- AP Row -->
    <div style="display: grid; grid-template-columns: 60px 1fr 1fr 1fr; gap: 12px; padding: 16px; background: rgba(31, 111, 235, 0.1); border: 1px solid rgba(31, 111, 235, 0.3); border-radius: 8px;">
      <div style="color: #58a6ff; font-weight: 700; font-size: 16px;">AP</div>
      <div style="color: #c9d1d9; font-size: 13px;">Accept requests, may return stale data</div>
      <div style="color: #8b949e; font-size: 13px;">Cassandra, DynamoDB, CouchDB, Riak</div>
      <div style="color: #c9d1d9; font-size: 13px;">Social feeds, Shopping carts</div>
    </div>
    <!-- CA Row -->
    <div style="display: grid; grid-template-columns: 60px 1fr 1fr 1fr; gap: 12px; padding: 16px; background: rgba(240, 136, 62, 0.1); border: 1px solid rgba(240, 136, 62, 0.3); border-radius: 8px;">
      <div style="color: #f0883e; font-weight: 700; font-size: 16px;">CA</div>
      <div style="color: #c9d1d9; font-size: 13px;">N/A (no partition)<br><span style="color: #8b949e; font-size: 11px;">Not truly distributed!</span></div>
      <div style="color: #8b949e; font-size: 13px;">Single-node RDBMS, PostgreSQL, MySQL</div>
      <div style="color: #c9d1d9; font-size: 13px;">Not distributed</div>
    </div>
  </div>
</div>

### CP Systems (Consistency + Partition Tolerance)

Sacrifices availability during partitions.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">CP SYSTEM: QUORUM-BASED</h3>
  <div style="color: #8b949e; text-align: center; margin-bottom: 24px; font-size: 14px;">3 nodes, quorum = 2 (majority)</div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <!-- Write succeeds -->
    <div style="background: rgba(35, 134, 54, 0.1); border: 1px solid rgba(35, 134, 54, 0.3); border-radius: 12px; padding: 20px;">
      <div style="color: #7ee787; font-weight: 600; margin-bottom: 16px;">WRITE: "SET X=5"</div>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="color: #8b949e;">→</span>
          <span style="color: #c9d1d9;">Node A:</span>
          <span style="color: #7ee787; font-weight: 600;">ACK ✓</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="color: #8b949e;">→</span>
          <span style="color: #c9d1d9;">Node B:</span>
          <span style="color: #7ee787; font-weight: 600;">ACK ✓</span>
          <span style="color: #58a6ff; font-size: 12px; margin-left: 8px;">← 2 ACKs = quorum!</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="color: #8b949e;">→</span>
          <span style="color: #c9d1d9;">Node C:</span>
          <span style="color: #f85149; font-weight: 600;">TIMEOUT X</span>
        </div>
      </div>
      <div style="background: rgba(126, 231, 135, 0.2); padding: 10px 14px; border-radius: 6px;">
        <span style="color: #7ee787; font-weight: 600;">Result: Write succeeds (2/3 = quorum)</span>
      </div>
    </div>
    <!-- During partition -->
    <div style="background: rgba(248, 81, 73, 0.1); border: 1px solid rgba(248, 81, 73, 0.3); border-radius: 12px; padding: 20px;">
      <div style="color: #f85149; font-weight: 600; margin-bottom: 16px;">DURING PARTITION (only 1 node reachable)</div>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="color: #8b949e;">→</span>
          <span style="color: #c9d1d9;">Node A:</span>
          <span style="color: #7ee787; font-weight: 600;">ACK ✓</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="color: #8b949e;">→</span>
          <span style="color: #c9d1d9;">Node B:</span>
          <span style="color: #f85149; font-weight: 600;">UNREACHABLE X</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="color: #8b949e;">→</span>
          <span style="color: #c9d1d9;">Node C:</span>
          <span style="color: #f85149; font-weight: 600;">UNREACHABLE X</span>
        </div>
      </div>
      <div style="background: rgba(248, 81, 73, 0.2); padding: 10px 14px; border-radius: 6px;">
        <span style="color: #f85149; font-weight: 600;">Result: Write FAILS! (1/3 &lt; quorum)</span>
      </div>
    </div>
  </div>
  <!-- Summary -->
  <div style="display: flex; gap: 16px; margin-top: 20px;">
    <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.4); border-radius: 8px; padding: 10px 16px; flex: 1;">
      <span style="color: #7ee787;">✓ Consistent: Never return stale data</span>
    </div>
    <div style="background: rgba(248, 81, 73, 0.1); border: 1px solid rgba(248, 81, 73, 0.4); border-radius: 8px; padding: 10px 16px; flex: 1;">
      <span style="color: #f85149;">X Not Available: Requests fail during partition</span>
    </div>
  </div>
</div>

```python
class CPDatabase:
    def __init__(self, nodes):
        self.nodes = nodes
        self.quorum = len(nodes) // 2 + 1

    def write(self, key, value):
        # Must reach quorum to succeed
        acks = 0
        for node in self.nodes:
            try:
                node.write(key, value)
                acks += 1
            except NetworkError:
                pass

        if acks < self.quorum:
            raise UnavailableError("Cannot reach quorum")

        return True

    def read(self, key):
        # Read from quorum and return most recent
        responses = []
        for node in self.nodes:
            try:
                responses.append(node.read(key))
            except NetworkError:
                pass

        if len(responses) < self.quorum:
            raise UnavailableError("Cannot reach quorum")

        return max(responses, key=lambda r: r.version)
```

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #4ecdc4;">
**Examples**: MongoDB (default), HBase, Redis Cluster, Zookeeper
**Use Cases**: Financial transactions, inventory management, configuration management
</div>

### AP Systems (Availability + Partition Tolerance)

Sacrifices consistency during partitions. May return stale data.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">AP SYSTEM: ALWAYS AVAILABLE</h3>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <!-- During Partition -->
    <div>
      <div style="color: #f0883e; font-weight: 600; margin-bottom: 16px;">DURING PARTITION:</div>
      <!-- Nodes with partition -->
      <div style="display: flex; align-items: center; justify-content: center; gap: 24px; margin-bottom: 16px;">
        <div style="text-align: center;">
          <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 16px 24px; border-radius: 10px;">
            <div style="color: white; font-weight: 600;">Node A</div>
            <div style="color: rgba(255,255,255,0.8); font-size: 13px;">X = 5</div>
          </div>
        </div>
        <div style="background: rgba(248, 81, 73, 0.2); border: 2px dashed #f85149; padding: 8px 16px; border-radius: 8px;">
          <span style="color: #f85149; font-weight: 600; font-size: 13px;">PARTITION!</span>
        </div>
        <div style="text-align: center;">
          <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 16px 24px; border-radius: 10px;">
            <div style="color: white; font-weight: 600;">Node B</div>
            <div style="color: rgba(255,255,255,0.8); font-size: 13px;">X = 5</div>
          </div>
        </div>
      </div>
      <!-- Client actions -->
      <div style="display: flex; justify-content: center; gap: 80px; margin-bottom: 16px;">
        <div style="text-align: center;">
          <div style="color: #58a6ff;">↓</div>
          <div style="color: #c9d1d9; font-size: 13px;">Client writes</div>
          <div style="color: #7ee787; font-weight: 600;">X = 10 ✓</div>
        </div>
        <div style="text-align: center;">
          <div style="color: #58a6ff;">↓</div>
          <div style="color: #c9d1d9; font-size: 13px;">Client reads</div>
          <div style="color: #f0883e; font-weight: 600;">X = 5 (stale!) ✓</div>
        </div>
      </div>
      <!-- Result nodes -->
      <div style="display: flex; align-items: center; justify-content: center; gap: 60px;">
        <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 12px 20px; border-radius: 8px; text-align: center;">
          <div style="color: white; font-weight: 600; font-size: 13px;">Node A</div>
          <div style="color: white; font-size: 13px;">X = 10</div>
        </div>
        <div style="background: rgba(248, 81, 73, 0.2); padding: 12px 20px; border-radius: 8px; text-align: center; border: 1px solid #f85149;">
          <div style="color: #f85149; font-weight: 600; font-size: 13px;">Node B</div>
          <div style="color: #f85149; font-size: 13px;">X = 5 ← INCONSISTENT!</div>
        </div>
      </div>
    </div>
    <!-- After partition heals -->
    <div>
      <div style="color: #7ee787; font-weight: 600; margin-bottom: 16px;">AFTER PARTITION HEALS:</div>
      <div style="display: flex; align-items: center; justify-content: center; gap: 24px;">
        <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 16px 24px; border-radius: 10px; text-align: center;">
          <div style="color: white; font-weight: 600;">Node A</div>
          <div style="color: white; font-size: 13px;">X = 10</div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <span style="color: #7ee787; font-size: 18px;">← → → →</span>
          <span style="color: #7ee787; font-size: 12px;">Sync & Merge</span>
        </div>
        <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 16px 24px; border-radius: 10px; text-align: center;">
          <div style="color: white; font-weight: 600;">Node B</div>
          <div style="color: white; font-size: 13px;">X = 10 ← Eventually consistent</div>
        </div>
      </div>
    </div>
    <!-- Summary -->
    <div style="display: flex; gap: 16px;">
      <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.4); border-radius: 8px; padding: 10px 16px; flex: 1;">
        <span style="color: #7ee787;">✓ Available: All requests succeed</span>
      </div>
      <div style="background: rgba(248, 81, 73, 0.1); border: 1px solid rgba(248, 81, 73, 0.4); border-radius: 8px; padding: 10px 16px; flex: 1;">
        <span style="color: #f85149;">X Not Consistent: Temporary stale reads</span>
      </div>
    </div>
  </div>
</div>

```python
class APDatabase:
    def __init__(self, nodes):
        self.nodes = nodes

    def write(self, key, value):
        # Write to any available node
        for node in self.nodes:
            try:
                node.write(key, value)
                return True
            except NetworkError:
                continue

        raise AllNodesDown()

    def read(self, key):
        # Read from any available node
        for node in self.nodes:
            try:
                return node.read(key)  # May be stale
            except NetworkError:
                continue

        raise AllNodesDown()
```

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #4ecdc4;">
**Examples**: Cassandra, DynamoDB, CouchDB, Riak
**Use Cases**: Social media feeds, shopping carts, session storage
</div>

### CA Systems (Consistency + Availability)

Only possible when there are no partitions (single node or reliable network).

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ff6b6b;">
⚠️ **Note**: In practice, network partitions happen, so CA systems are not truly distributed. A single-node PostgreSQL is CA but not distributed!
</div>

**Examples**: Traditional RDBMS (PostgreSQL, MySQL) on single node

## Consistency Models

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">CONSISTENCY SPECTRUM</h3>
  <!-- Spectrum bar -->
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
    <span style="color: #7ee787; font-weight: 600; font-size: 13px;">Strongest</span>
    <span style="color: #f85149; font-weight: 600; font-size: 13px;">Weakest</span>
  </div>
  <div style="background: linear-gradient(90deg, #238636 0%, #1f6feb 25%, #8957e5 50%, #f0883e 75%, #f85149 100%); height: 8px; border-radius: 4px; margin-bottom: 20px;"></div>
  <!-- Consistency levels -->
  <div style="display: flex; justify-content: space-between; gap: 8px; margin-bottom: 24px; flex-wrap: wrap;">
    <div style="background: rgba(35, 134, 54, 0.2); border: 1px solid #238636; padding: 8px 12px; border-radius: 6px; text-align: center;">
      <span style="color: #7ee787; font-size: 12px; font-weight: 600;">Linearizable</span>
    </div>
    <div style="color: #8b949e; font-size: 16px; align-self: center;">→</div>
    <div style="background: rgba(31, 111, 235, 0.2); border: 1px solid #1f6feb; padding: 8px 12px; border-radius: 6px; text-align: center;">
      <span style="color: #58a6ff; font-size: 12px; font-weight: 600;">Sequential</span>
    </div>
    <div style="color: #8b949e; font-size: 16px; align-self: center;">→</div>
    <div style="background: rgba(137, 87, 229, 0.2); border: 1px solid #8957e5; padding: 8px 12px; border-radius: 6px; text-align: center;">
      <span style="color: #a371f7; font-size: 12px; font-weight: 600;">Causal</span>
    </div>
    <div style="color: #8b949e; font-size: 16px; align-self: center;">→</div>
    <div style="background: rgba(240, 136, 62, 0.2); border: 1px solid #f0883e; padding: 8px 12px; border-radius: 6px; text-align: center;">
      <span style="color: #f0883e; font-size: 12px; font-weight: 600;">Read-Your-Writes</span>
    </div>
    <div style="color: #8b949e; font-size: 16px; align-self: center;">→</div>
    <div style="background: rgba(240, 136, 62, 0.2); border: 1px solid #f0883e; padding: 8px 12px; border-radius: 6px; text-align: center;">
      <span style="color: #f0883e; font-size: 12px; font-weight: 600;">Monotonic</span>
    </div>
    <div style="color: #8b949e; font-size: 16px; align-self: center;">→</div>
    <div style="background: rgba(248, 81, 73, 0.2); border: 1px solid #f85149; padding: 8px 12px; border-radius: 6px; text-align: center;">
      <span style="color: #f85149; font-size: 12px; font-weight: 600;">Eventual</span>
    </div>
  </div>
  <!-- Trade-off note -->
  <div style="background: rgba(88, 166, 255, 0.1); border: 1px solid rgba(88, 166, 255, 0.4); border-radius: 8px; padding: 14px 20px; text-align: center;">
    <span style="color: #58a6ff; font-weight: 600;">Trade-off:</span>
    <span style="color: #c9d1d9;"> Stronger consistency = Higher latency + Lower availability</span>
  </div>
</div>

### Strong Consistency (Linearizability)

All reads return the most recent write. As if there's only one copy of data.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">STRONG CONSISTENCY</h3>
  <!-- Timeline -->
  <div style="margin-bottom: 24px;">
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
      <span style="color: #8b949e; font-size: 13px;">Timeline:</span>
      <div style="flex: 1; height: 2px; background: linear-gradient(90deg, #58a6ff, #58a6ff); position: relative;">
        <span style="position: absolute; right: -8px; top: -4px; color: #58a6ff;">→</span>
      </div>
    </div>
    <div style="display: flex; justify-content: space-between; padding: 0 20px;">
      <span style="color: #8b949e; font-size: 11px;">t=0</span>
      <span style="color: #8b949e; font-size: 11px;">t=1</span>
      <span style="color: #8b949e; font-size: 11px;">t=2</span>
      <span style="color: #8b949e; font-size: 11px;">t=3</span>
      <span style="color: #8b949e; font-size: 11px;">t=4</span>
    </div>
  </div>
  <!-- Client A action -->
  <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
    <div style="min-width: 100px; color: #58a6ff; font-weight: 600;">Client A:</div>
    <div style="flex: 1; display: flex; align-items: center;">
      <div style="width: 20%;"></div>
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 8px 16px; border-radius: 6px;">
        <span style="color: white; font-size: 13px; font-weight: 600;">Write(X=1)</span>
      </div>
    </div>
  </div>
  <!-- All Nodes -->
  <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
    <div style="min-width: 100px; color: #c9d1d9; font-weight: 600;">All Nodes:</div>
    <div style="flex: 1; display: flex; align-items: center; gap: 8px;">
      <div style="background: rgba(248, 81, 73, 0.2); border: 1px solid #f85149; padding: 6px 12px; border-radius: 6px;">
        <span style="color: #f85149; font-size: 12px;">X=0</span>
      </div>
      <span style="color: #7ee787;">→</span>
      <div style="background: rgba(126, 231, 135, 0.2); border: 1px solid #7ee787; padding: 6px 12px; border-radius: 6px;">
        <span style="color: #7ee787; font-size: 12px;">X=1</span>
      </div>
      <div style="flex: 1; height: 2px; background: #7ee787;"></div>
      <span style="color: #7ee787;">→</span>
    </div>
  </div>
  <!-- Client B action -->
  <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
    <div style="min-width: 100px; color: #a371f7; font-weight: 600;">Client B:</div>
    <div style="flex: 1; display: flex; align-items: center;">
      <div style="width: 60%;"></div>
      <div style="background: rgba(126, 231, 135, 0.2); border: 1px solid #7ee787; padding: 8px 16px; border-radius: 6px;">
        <span style="color: #7ee787; font-size: 13px; font-weight: 600;">Read(X) = 1 ✓</span>
      </div>
    </div>
  </div>
  <!-- Success notes -->
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.4); border-radius: 8px; padding: 10px 16px;">
      <span style="color: #7ee787;">✓ After write completes, ALL subsequent reads return new value</span>
    </div>
    <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.4); border-radius: 8px; padding: 10px 16px;">
      <span style="color: #7ee787;">✓ Behaves like a single-server system</span>
    </div>
  </div>
</div>

### Eventual Consistency

Reads may return stale data, but will eventually return the most recent write.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">EVENTUAL CONSISTENCY</h3>
  <!-- Timeline -->
  <div style="margin-bottom: 24px;">
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
      <span style="color: #8b949e; font-size: 13px;">Timeline:</span>
      <div style="flex: 1; height: 2px; background: linear-gradient(90deg, #58a6ff, #58a6ff); position: relative;">
        <span style="position: absolute; right: -8px; top: -4px; color: #58a6ff;">→</span>
      </div>
    </div>
    <div style="display: flex; justify-content: space-between; padding: 0 20px;">
      <span style="color: #8b949e; font-size: 11px;">t=0</span>
      <span style="color: #8b949e; font-size: 11px;">t=1</span>
      <span style="color: #8b949e; font-size: 11px;">t=2</span>
      <span style="color: #8b949e; font-size: 11px;">t=3</span>
      <span style="color: #8b949e; font-size: 11px;">t=4</span>
    </div>
  </div>
  <!-- Client A -->
  <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
    <div style="min-width: 80px; color: #58a6ff; font-weight: 600; font-size: 13px;">Client A:</div>
    <div style="flex: 1; display: flex; align-items: center;">
      <div style="width: 20%;"></div>
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 6px 12px; border-radius: 6px;">
        <span style="color: white; font-size: 12px; font-weight: 600;">Write(X=1)</span>
      </div>
    </div>
  </div>
  <!-- Node A -->
  <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
    <div style="min-width: 80px; color: #7ee787; font-weight: 600; font-size: 13px;">Node A:</div>
    <div style="flex: 1; display: flex; align-items: center; gap: 6px;">
      <div style="background: rgba(248, 81, 73, 0.2); border: 1px solid #f85149; padding: 4px 10px; border-radius: 4px;">
        <span style="color: #f85149; font-size: 11px;">X=0</span>
      </div>
      <span style="color: #7ee787; font-size: 12px;">→</span>
      <div style="background: rgba(126, 231, 135, 0.2); border: 1px solid #7ee787; padding: 4px 10px; border-radius: 4px;">
        <span style="color: #7ee787; font-size: 11px;">X=1</span>
      </div>
      <div style="flex: 1; height: 2px; background: #7ee787;"></div>
    </div>
  </div>
  <!-- Async replicate indicator -->
  <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
    <div style="min-width: 80px;"></div>
    <div style="flex: 1; display: flex; align-items: center;">
      <div style="width: 30%;"></div>
      <div style="color: #f0883e; font-size: 12px; font-style: italic;">↘ Async replicate</div>
    </div>
  </div>
  <!-- Node B -->
  <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 12px;">
    <div style="min-width: 80px; color: #a371f7; font-weight: 600; font-size: 13px;">Node B:</div>
    <div style="flex: 1; display: flex; align-items: center; gap: 6px;">
      <div style="background: rgba(248, 81, 73, 0.2); border: 1px solid #f85149; padding: 4px 10px; border-radius: 4px;">
        <span style="color: #f85149; font-size: 11px;">X=0</span>
      </div>
      <div style="width: 15%; height: 2px; background: #f85149;"></div>
      <div style="background: rgba(248, 81, 73, 0.2); border: 1px solid #f85149; padding: 4px 10px; border-radius: 4px;">
        <span style="color: #f85149; font-size: 11px;">X=0</span>
      </div>
      <span style="color: #7ee787; font-size: 12px;">→</span>
      <div style="background: rgba(126, 231, 135, 0.2); border: 1px solid #7ee787; padding: 4px 10px; border-radius: 4px;">
        <span style="color: #7ee787; font-size: 11px;">X=1</span>
      </div>
      <div style="flex: 1; height: 2px; background: #7ee787;"></div>
    </div>
  </div>
  <!-- Client B reads -->
  <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
    <div style="min-width: 80px; color: #c9d1d9; font-weight: 600; font-size: 13px;">Client B:</div>
    <div style="flex: 1; display: flex; align-items: center; gap: 16px;">
      <div style="width: 35%;"></div>
      <div style="background: rgba(248, 81, 73, 0.2); border: 1px solid #f85149; padding: 4px 10px; border-radius: 4px;">
        <span style="color: #f85149; font-size: 11px;">Read(X)=0 (stale!)</span>
      </div>
      <div style="background: rgba(126, 231, 135, 0.2); border: 1px solid #7ee787; padding: 4px 10px; border-radius: 4px;">
        <span style="color: #7ee787; font-size: 11px;">Read(X)=1</span>
      </div>
    </div>
  </div>
  <!-- Notes -->
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <div style="background: rgba(240, 136, 62, 0.1); border: 1px solid rgba(240, 136, 62, 0.4); border-radius: 8px; padding: 10px 16px;">
      <span style="color: #f0883e;">⚠️ Temporary inconsistency window (t=1 to t=3)</span>
    </div>
    <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.4); border-radius: 8px; padding: 10px 16px;">
      <span style="color: #7ee787;">✓ Eventually all reads return correct value</span>
    </div>
  </div>
</div>

### Causal Consistency

Causally related operations are seen in order.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
  <h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">CAUSAL CONSISTENCY</h3>
  <!-- Client A flow -->
  <div style="margin-bottom: 24px;">
    <div style="color: #58a6ff; font-weight: 600; margin-bottom: 16px;">Client A:</div>
    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 10px 16px; border-radius: 8px;">
        <span style="color: white; font-size: 13px;">Write(post="Hello")</span>
      </div>
      <span style="color: #58a6ff; font-size: 18px;">→</span>
      <div style="background: rgba(88, 166, 255, 0.2); border: 1px solid #58a6ff; padding: 10px 16px; border-radius: 8px;">
        <span style="color: #58a6ff; font-size: 13px;">Read(post="Hello")</span>
      </div>
      <span style="color: #58a6ff; font-size: 18px;">→</span>
      <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 10px 16px; border-radius: 8px;">
        <span style="color: white; font-size: 13px;">Write(comment="Hi!")</span>
      </div>
    </div>
    <div style="color: #8b949e; font-size: 12px; margin-top: 8px; margin-left: 280px; font-style: italic;">↑ comment depends on post</div>
  </div>
  <!-- Client B -->
  <div style="margin-bottom: 24px;">
    <div style="color: #a371f7; font-weight: 600; margin-bottom: 12px;">Client B:</div>
    <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.4); border-radius: 8px; padding: 14px 20px;">
      <span style="color: #c9d1d9;">If sees </span>
      <span style="color: #a371f7; font-weight: 600;">comment="Hi!"</span>
      <span style="color: #c9d1d9;">, MUST also see </span>
      <span style="color: #7ee787; font-weight: 600;">post="Hello"</span>
    </div>
  </div>
  <!-- Causal chain explanation -->
  <div style="background: rgba(88, 166, 255, 0.1); border: 1px solid rgba(88, 166, 255, 0.4); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
    <div style="color: #58a6ff; font-weight: 600; margin-bottom: 12px;">Causal chain:</div>
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <div style="background: #238636; padding: 6px 12px; border-radius: 6px;">
        <span style="color: white; font-size: 12px;">post</span>
      </div>
      <span style="color: #8b949e;">→</span>
      <div style="background: #1f6feb; padding: 6px 12px; border-radius: 6px;">
        <span style="color: white; font-size: 12px;">read</span>
      </div>
      <span style="color: #8b949e;">→</span>
      <div style="background: #8957e5; padding: 6px 12px; border-radius: 6px;">
        <span style="color: white; font-size: 12px;">comment</span>
      </div>
    </div>
    <div style="color: #c9d1d9; font-size: 13px;">B cannot see effect (comment) without seeing cause (post)</div>
  </div>
  <!-- Summary notes -->
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.4); border-radius: 8px; padding: 10px 16px;">
      <span style="color: #7ee787;">✓ Preserves cause-effect relationships</span>
    </div>
    <div style="background: rgba(126, 231, 135, 0.1); border: 1px solid rgba(126, 231, 135, 0.4); border-radius: 8px; padding: 10px 16px;">
      <span style="color: #7ee787;">✓ Concurrent (unrelated) operations may be seen in any order</span>
    </div>
  </div>
</div>

### Read-Your-Writes Consistency

A client always sees its own writes.

```python
class ReadYourWritesConsistency:
    def __init__(self):
        self.local_cache = {}
        self.remote_db = RemoteDB()

    def write(self, key, value):
        self.local_cache[key] = value
        self.remote_db.write(key, value)

    def read(self, key):
        # Check local cache first
        if key in self.local_cache:
            return self.local_cache[key]
        return self.remote_db.read(key)
```

## PACELC Theorem

An extension of CAP that addresses behavior when there's NO partition:

**If Partition (P)**: Choose between Availability (A) and Consistency (C)
**Else (E)**: Choose between Latency (L) and Consistency (C)

```
System Classification:
- PA/EL: High availability, low latency (Cassandra, DynamoDB)
- PA/EC: High availability, strong consistency when possible (MongoDB)
- PC/EL: Strong consistency, low latency (PNUTS)
- PC/EC: Strong consistency always (traditional RDBMS)
```

## Implementation Example

### Go - Quorum-Based Consistency

```go
package main

import (
	"context"
	"errors"
	"sync"
	"time"
)

type VersionedValue struct {
	Value   string
	Version int64
}

type Node struct {
	id    string
	data  map[string]VersionedValue
	mu    sync.RWMutex
	alive bool
}

func (n *Node) Write(key, value string, version int64) error {
	if !n.alive {
		return errors.New("node unavailable")
	}

	n.mu.Lock()
	defer n.mu.Unlock()

	current, exists := n.data[key]
	if exists && current.Version >= version {
		return nil // Already have newer version
	}

	n.data[key] = VersionedValue{Value: value, Version: version}
	return nil
}

func (n *Node) Read(key string) (VersionedValue, error) {
	if !n.alive {
		return VersionedValue{}, errors.New("node unavailable")
	}

	n.mu.RLock()
	defer n.mu.RUnlock()

	value, exists := n.data[key]
	if !exists {
		return VersionedValue{}, errors.New("not found")
	}
	return value, nil
}

type QuorumStore struct {
	nodes       []*Node
	readQuorum  int
	writeQuorum int
}

func NewQuorumStore(n, r, w int) *QuorumStore {
	nodes := make([]*Node, n)
	for i := 0; i < n; i++ {
		nodes[i] = &Node{
			id:    string(rune('A' + i)),
			data:  make(map[string]VersionedValue),
			alive: true,
		}
	}

	return &QuorumStore{
		nodes:       nodes,
		readQuorum:  r,
		writeQuorum: w,
	}
}

func (qs *QuorumStore) Write(ctx context.Context, key, value string) error {
	version := time.Now().UnixNano()

	var wg sync.WaitGroup
	var mu sync.Mutex
	successes := 0

	for _, node := range qs.nodes {
		wg.Add(1)
		go func(n *Node) {
			defer wg.Done()
			if err := n.Write(key, value, version); err == nil {
				mu.Lock()
				successes++
				mu.Unlock()
			}
		}(node)
	}

	wg.Wait()

	if successes < qs.writeQuorum {
		return errors.New("failed to reach write quorum")
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
			if val, err := n.Read(key); err == nil {
				mu.Lock()
				responses = append(responses, val)
				mu.Unlock()
			}
		}(node)
	}

	wg.Wait()

	if len(responses) < qs.readQuorum {
		return "", errors.New("failed to reach read quorum")
	}

	// Return highest version
	var latest VersionedValue
	for _, r := range responses {
		if r.Version > latest.Version {
			latest = r
		}
	}

	return latest.Value, nil
}

func main() {
	// R + W > N ensures strong consistency
	// N=3, R=2, W=2 means we need majority for both reads and writes
	store := NewQuorumStore(3, 2, 2)

	ctx := context.Background()

	// Write
	if err := store.Write(ctx, "user:1", "Alice"); err != nil {
		println("Write failed:", err.Error())
		return
	}
	println("Write succeeded")

	// Read
	value, err := store.Read(ctx, "user:1")
	if err != nil {
		println("Read failed:", err.Error())
		return
	}
	println("Read value:", value)

	// Simulate partition (node failure)
	store.nodes[0].alive = false
	println("Node A failed")

	// Still works with 2/3 nodes
	value, err = store.Read(ctx, "user:1")
	if err != nil {
		println("Read failed:", err.Error())
	} else {
		println("Read after partition:", value)
	}
}
```

### Python - Eventual Consistency with Conflict Resolution

```python
import time
from typing import Dict, List, Optional
from dataclasses import dataclass
from enum import Enum

class ConflictResolution(Enum):
    LAST_WRITE_WINS = "lww"
    MERGE = "merge"

@dataclass
class VectorClock:
    clocks: Dict[str, int]

    def increment(self, node_id: str):
        self.clocks[node_id] = self.clocks.get(node_id, 0) + 1

    def merge(self, other: 'VectorClock'):
        for node_id, count in other.clocks.items():
            self.clocks[node_id] = max(self.clocks.get(node_id, 0), count)

    def happens_before(self, other: 'VectorClock') -> bool:
        """Returns True if self happened before other"""
        dominated = False
        for node_id in set(self.clocks.keys()) | set(other.clocks.keys()):
            self_count = self.clocks.get(node_id, 0)
            other_count = other.clocks.get(node_id, 0)

            if self_count > other_count:
                return False
            if self_count < other_count:
                dominated = True

        return dominated

    def concurrent(self, other: 'VectorClock') -> bool:
        """Returns True if events are concurrent (conflict)"""
        return not self.happens_before(other) and not other.happens_before(self)

@dataclass
class Value:
    data: str
    timestamp: float
    clock: VectorClock

class EventuallyConsistentStore:
    def __init__(self, node_id: str, resolution: ConflictResolution = ConflictResolution.LAST_WRITE_WINS):
        self.node_id = node_id
        self.data: Dict[str, List[Value]] = {}  # Key -> list of conflicting values
        self.clock = VectorClock({})
        self.resolution = resolution
        self.pending_sync: List[tuple] = []

    def write(self, key: str, value: str):
        self.clock.increment(self.node_id)

        new_value = Value(
            data=value,
            timestamp=time.time(),
            clock=VectorClock(dict(self.clock.clocks))
        )

        if key not in self.data:
            self.data[key] = [new_value]
        else:
            # Remove values that this write supersedes
            self.data[key] = [
                v for v in self.data[key]
                if not new_value.clock.happens_before(v.clock)
            ]
            self.data[key].append(new_value)

        self.pending_sync.append((key, new_value))

    def read(self, key: str) -> Optional[str]:
        if key not in self.data:
            return None

        values = self.data[key]

        if len(values) == 1:
            return values[0].data

        # Multiple concurrent values - resolve conflict
        if self.resolution == ConflictResolution.LAST_WRITE_WINS:
            latest = max(values, key=lambda v: v.timestamp)
            return latest.data
        else:
            # Return all values for client to merge
            return [v.data for v in values]

    def receive_sync(self, key: str, value: Value):
        """Receive synced value from another node"""
        self.clock.merge(value.clock)

        if key not in self.data:
            self.data[key] = [value]
            return

        # Filter out values that this one supersedes
        new_values = []
        should_add = True

        for existing in self.data[key]:
            if value.clock.happens_before(existing.clock):
                # Existing is newer, don't add incoming
                should_add = False
                new_values.append(existing)
            elif existing.clock.happens_before(value.clock):
                # Incoming is newer, skip existing
                continue
            else:
                # Concurrent - keep both (conflict)
                new_values.append(existing)

        if should_add:
            new_values.append(value)

        self.data[key] = new_values


# Demo
node_a = EventuallyConsistentStore("A")
node_b = EventuallyConsistentStore("B")

# Concurrent writes (simulating partition)
node_a.write("x", "value_from_A")
node_b.write("x", "value_from_B")

print(f"Node A sees: {node_a.read('x')}")
print(f"Node B sees: {node_b.read('x')}")

# Sync after partition heals
for key, value in node_a.pending_sync:
    node_b.receive_sync(key, value)

for key, value in node_b.pending_sync:
    node_a.receive_sync(key, value)

print(f"After sync - Node A sees: {node_a.read('x')}")
print(f"After sync - Node B sees: {node_b.read('x')}")
```

## Database CAP Classifications

<div style="background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
| Database | Category | Notes |
|----------|----------|-------|
| PostgreSQL | CA (single) | CP with streaming replication |
| MySQL | CA (single) | CP with Galera Cluster |
| MongoDB | CP | Configurable, uses replica sets |
| Cassandra | AP | Tunable consistency levels |
| DynamoDB | AP | Eventual consistency default |
| Redis Cluster | CP | Uses Raft consensus |
| CockroachDB | CP | Serializable isolation |
| Spanner | CP | TrueTime for consistency |
</div>

## Common Interview Questions

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
1. **Why can't we have all three (CAP)?**
   - Network partitions are unavoidable
   - During partition, must choose: reject requests (CP) or allow divergence (AP)
2. **How do AP systems handle conflicts?**
   - Last-write-wins (timestamp)
   - Vector clocks
   - Application-level merge (CRDTs)
3. **What is the difference between ACID and CAP?**
   - ACID: Transaction guarantees (single database)
   - CAP: Distributed system trade-offs
4. **How do you choose between CP and AP?**
   - CP: When consistency is critical (banking, inventory)
   - AP: When availability is more important (social feeds, shopping carts)
</div>

## Best Practices

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
1. **Understand your requirements** - Which guarantee matters most?
2. **Design for partition tolerance** - It will happen
3. **Use tunable consistency** - Many databases offer per-query settings
4. **Implement conflict resolution** - For AP systems
5. **Monitor replication lag** - Track staleness in AP systems
6. **Test failure scenarios** - Chaos engineering
</div>

## Related Topics

- [Database Sharding](/topic/system-design/database-sharding)
- [Database Replication](/topic/system-design/database-replication)
- [Consensus Algorithms](/topic/system-design/consensus-algorithms)
