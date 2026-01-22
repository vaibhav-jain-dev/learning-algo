# Consensus Algorithms

## Overview

**Simple Explanation**: Consensus algorithms help multiple computers agree on a single value or decision, even when some computers fail or the network has issues. Think of it like getting a group of friends to agree on where to eat dinner - even if some friends can't hear well or leave early, the group still needs to reach a decision everyone follows.

In distributed systems, consensus is the foundation for building reliable databases, leader election, and configuration management. Without consensus, you can't guarantee that all nodes in a cluster see the same data in the same order.

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

**Google Spanner** uses Paxos to achieve global consistency across data centers. Every write goes through Paxos consensus, enabling Google to offer externally-consistent reads worldwide - something previously thought impossible at scale.

**CockroachDB and TiDB** use Raft for distributed SQL transactions. When you run a distributed transaction, Raft ensures all replicas agree on the commit order, preventing data inconsistencies.

**Apache Kafka** uses Zab (similar to Raft) in ZooKeeper for controller election and configuration management. When a Kafka broker fails, consensus determines which broker becomes the new partition leader.

**Ethereum 2.0** switched from Proof-of-Work to a BFT-style consensus (Casper) to secure $400B+ in assets while reducing energy consumption by 99.95%.

</div>

## Properties of Consensus

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #6366f1;">

1. **Agreement**: All correct nodes decide on the same value
2. **Validity**: The decided value was proposed by some node
3. **Termination**: All correct nodes eventually decide
4. **Integrity**: Each node decides at most once

</div>

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">

**The FLP Impossibility Theorem (1985)**: In an asynchronous system with even one faulty node, no deterministic consensus algorithm can guarantee all three properties simultaneously. Practical algorithms use **timeouts** to work around this limitation.

</div>

## How It Works

### Algorithm Comparison

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">CONSENSUS ALGORITHM COMPARISON</div>
  <div style="overflow-x: auto;">
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <thead>
        <tr style="border-bottom: 2px solid #cbd5e1;">
          <th style="padding: 12px; text-align: left; color: #1e40af;">Algorithm</th>
          <th style="padding: 12px; text-align: center; color: #1e40af;">Fault Model</th>
          <th style="padding: 12px; text-align: center; color: #1e40af;">Nodes for f faults</th>
          <th style="padding: 12px; text-align: center; color: #1e40af;">Rounds</th>
          <th style="padding: 12px; text-align: left; color: #1e40af;">Used In</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px; color: #1e293b; font-weight: 500;">Paxos</td>
          <td style="padding: 12px; text-align: center;"><span style="color: #16a34a;">Crash</span></td>
          <td style="padding: 12px; text-align: center; color: #d97706;">2f + 1</td>
          <td style="padding: 12px; text-align: center; color: #1e293b;">2</td>
          <td style="padding: 12px; color: #64748b;">Chubby, Spanner</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px; color: #1e293b; font-weight: 500;">Raft</td>
          <td style="padding: 12px; text-align: center;"><span style="color: #16a34a;">Crash</span></td>
          <td style="padding: 12px; text-align: center; color: #d97706;">2f + 1</td>
          <td style="padding: 12px; text-align: center; color: #1e293b;">2</td>
          <td style="padding: 12px; color: #64748b;">etcd, CockroachDB, Consul</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px; color: #1e293b; font-weight: 500;">PBFT</td>
          <td style="padding: 12px; text-align: center;"><span style="color: #dc2626;">Byzantine</span></td>
          <td style="padding: 12px; text-align: center; color: #d97706;">3f + 1</td>
          <td style="padding: 12px; text-align: center; color: #1e293b;">3</td>
          <td style="padding: 12px; color: #64748b;">Hyperledger Fabric</td>
        </tr>
        <tr>
          <td style="padding: 12px; color: #1e293b; font-weight: 500;">Zab</td>
          <td style="padding: 12px; text-align: center;"><span style="color: #16a34a;">Crash</span></td>
          <td style="padding: 12px; text-align: center; color: #d97706;">2f + 1</td>
          <td style="padding: 12px; text-align: center; color: #1e293b;">2</td>
          <td style="padding: 12px; color: #64748b;">ZooKeeper</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
    <div style="background: rgba(34, 197, 94, 0.15); border-radius: 8px; padding: 12px;">
      <span style="color: #166534; font-weight: 600;">Crash fault:</span>
      <span style="color: #1e293b;"> Node stops responding</span>
    </div>
    <div style="background: rgba(239, 68, 68, 0.15); border-radius: 8px; padding: 12px;">
      <span style="color: #991b1b; font-weight: 600;">Byzantine:</span>
      <span style="color: #1e293b;"> Node may behave maliciously</span>
    </div>
  </div>
</div>

### Raft: The Most Understandable Consensus

Raft was designed specifically to be easier to understand than Paxos while providing equivalent guarantees.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">RAFT LEADER ELECTION</div>
  <div style="text-align: center; margin-bottom: 24px;">
    <span style="color: #64748b;">Three states:</span>
    <span style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); color: #475569; padding: 4px 12px; border-radius: 6px; margin: 0 8px; border: 1px solid #cbd5e1;">FOLLOWER</span>
    <span style="color: #6366f1;">-></span>
    <span style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); color: #92400e; padding: 4px 12px; border-radius: 6px; margin: 0 8px; border: 1px solid #fcd34d;">CANDIDATE</span>
    <span style="color: #6366f1;">-></span>
    <span style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); color: #166534; padding: 4px 12px; border-radius: 6px; margin: 0 8px; border: 1px solid #86efac;">LEADER</span>
  </div>
  <div style="margin-bottom: 24px;">
    <div style="color: #d97706; font-weight: 600; margin-bottom: 12px;">Step 1: Election timeout (no heartbeat from leader)</div>
    <div style="display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 8px;">
      <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 10px; padding: 14px; min-width: 100px; text-align: center; border: 1px solid #cbd5e1;">
        <div style="color: #475569; font-weight: 500;">Follower</div>
        <div style="color: #64748b; font-size: 12px;">Node A</div>
      </div>
      <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 10px; padding: 14px; min-width: 100px; text-align: center; border: 1px solid #cbd5e1;">
        <div style="color: #475569; font-weight: 500;">Follower</div>
        <div style="color: #64748b; font-size: 12px;">Node B</div>
      </div>
      <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 10px; padding: 14px; min-width: 100px; text-align: center; border: 1px solid #cbd5e1;">
        <div style="color: #475569; font-weight: 500;">Follower</div>
        <div style="color: #64748b; font-size: 12px;">Node C</div>
      </div>
    </div>
    <div style="color: #dc2626; font-size: 14px; margin-left: 10px;">timeout triggers election!</div>
  </div>
  <div style="margin-bottom: 24px;">
    <div style="color: #d97706; font-weight: 600; margin-bottom: 12px;">Step 2: Node A becomes candidate, requests votes</div>
    <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 10px; padding: 14px; min-width: 100px; text-align: center; border: 1px solid #fcd34d;">
        <div style="color: #92400e; font-weight: 600;">Candidate</div>
        <div style="color: #b45309; font-size: 12px;">Node A</div>
        <div style="color: #b45309; font-size: 11px; margin-top: 4px;">term++, votes for self</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="color: #3b82f6;">RequestVote -></span>
          <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 8px; padding: 10px; text-align: center; border: 1px solid #cbd5e1;">
            <div style="color: #475569; font-size: 13px;">Node B</div>
            <div style="color: #16a34a; font-size: 12px;">vote: YES</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="color: #3b82f6;">RequestVote -></span>
          <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 8px; padding: 10px; text-align: center; border: 1px solid #cbd5e1;">
            <div style="color: #475569; font-size: 13px;">Node C</div>
            <div style="color: #16a34a; font-size: 12px;">vote: YES</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div style="color: #16a34a; font-weight: 600; margin-bottom: 12px;">Step 3: Wins election (got majority: 3/3 votes)</div>
    <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 10px; padding: 16px; width: fit-content; text-align: center; border: 2px solid #22c55e; box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);">
      <div style="color: #166534; font-weight: 600; font-size: 16px;">LEADER</div>
      <div style="color: #15803d; font-size: 12px;">Node A</div>
      <div style="color: #15803d; font-size: 11px; margin-top: 4px;">sends heartbeats to all followers</div>
    </div>
  </div>
</div>

### Raft Log Replication

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border: 1px solid #cbd5e1;">
  <div style="text-align: center; color: #1e293b; font-size: 18px; font-weight: 600; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #cbd5e1;">RAFT LOG REPLICATION</div>
  <div style="text-align: center; color: #64748b; margin-bottom: 20px;">Client sends command <span style="color: #3b82f6; font-family: monospace;">"SET X=5"</span> to Leader</div>
  <div style="margin-bottom: 24px;">
    <div style="color: #3b82f6; font-weight: 600; margin-bottom: 12px;">Leader's Log:</div>
    <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 8px;">
      <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 6px; padding: 10px 16px; text-align: center; border: 1px solid #cbd5e1;">
        <div style="color: #64748b; font-size: 11px;">1</div>
        <div style="color: #475569; font-size: 12px;">T1:A</div>
      </div>
      <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 6px; padding: 10px 16px; text-align: center; border: 1px solid #cbd5e1;">
        <div style="color: #64748b; font-size: 11px;">2</div>
        <div style="color: #475569; font-size: 12px;">T1:B</div>
      </div>
      <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 6px; padding: 10px 16px; text-align: center; border: 1px solid #cbd5e1;">
        <div style="color: #64748b; font-size: 11px;">3</div>
        <div style="color: #475569; font-size: 12px;">T2:C</div>
      </div>
      <div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 6px; padding: 10px 16px; text-align: center; border: 1px solid #86efac;">
        <div style="color: #15803d; font-size: 11px;">4</div>
        <div style="color: #166534; font-size: 12px;">T3:D</div>
      </div>
      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 6px; padding: 10px 16px; text-align: center; border: 1px solid #fcd34d;">
        <div style="color: #92400e; font-size: 11px;">5</div>
        <div style="color: #92400e; font-size: 12px;">T3:X</div>
      </div>
    </div>
    <div style="color: #16a34a; font-size: 12px; margin-left: 180px;">^ commitIndex</div>
  </div>
  <div style="background: rgba(59, 130, 246, 0.1); border-radius: 10px; padding: 16px; margin-bottom: 24px; border: 1px solid #93c5fd;">
    <div style="color: #1e40af; font-size: 13px; line-height: 1.8;">
      <div>1. Leader appends entry to log</div>
      <div>2. Leader sends AppendEntries RPC to followers</div>
      <div>3. Followers append to their logs and ACK</div>
      <div>4. When majority ACK -> Leader commits entry</div>
      <div>5. Leader notifies followers of commit in next heartbeat</div>
    </div>
  </div>
</div>

## Code Examples

### Python - Simplified Raft Node

```python
from enum import Enum
from dataclasses import dataclass, field
from typing import List, Optional
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
    command: any
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
    next_index: dict = field(default_factory=dict)
    match_index: dict = field(default_factory=dict)

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
```

### Go - Raft Leader Election

```go
package main

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

## Common Pitfalls

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">

### 1. Split Brain During Network Partitions
**Problem**: Two leaders elected in different partitions.
**Solution**: Require majority quorum for all operations. Minority partition becomes read-only.

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

</div>

## Interview Questions

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

### Fundamental Questions

1. **Why is Raft preferred over Paxos in practice?**
   - Easier to understand and implement correctly
   - Clear separation of leader election, log replication, and safety
   - Better documentation and educational materials
   - Single leader simplifies reasoning about consistency

2. **How does Raft handle network partitions?**
   - Minority partition cannot elect a leader (no quorum)
   - Majority partition continues operating normally
   - After partition heals, minority catches up from leader's log
   - Stale leaders step down when they see higher terms

3. **What's the difference between crash and Byzantine failures?**
   - Crash: Node stops responding (fail-stop)
   - Byzantine: Node may behave arbitrarily (lie, corrupt data, collude)
   - Crash-fault tolerant: 2f+1 nodes for f failures
   - Byzantine-fault tolerant: 3f+1 nodes for f failures

4. **How many failures can a 5-node Raft cluster tolerate?**
   - Can tolerate 2 failures (need majority = 3 nodes alive)
   - Formula: With n nodes, tolerates (n-1)/2 failures

### Advanced Questions

5. **Explain the difference between committed and applied in Raft.**
   - Committed: Entry is replicated on majority of nodes
   - Applied: Entry has been executed by state machine
   - Committed entries are guaranteed durable; applied entries produce results

6. **How does Raft prevent split-brain with an even number of nodes?**
   - Majority requires (n/2)+1 nodes to agree
   - With 4 nodes, need 3 to agree - can't have two majorities
   - Recommendation: Always use odd number of nodes to maximize fault tolerance per node

7. **What happens if a leader commits an entry but crashes before notifying followers?**
   - New leader will have that entry (it was on majority)
   - New leader includes it in its log replication
   - Entry remains committed and will be applied on all nodes

</div>

## Best Practices

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">

1. **Use odd number of nodes** - Maximizes fault tolerance per dollar spent
2. **Monitor leader elections** - Frequent elections indicate network or configuration issues
3. **Tune timeouts carefully** - Election timeout should be >> heartbeat interval
4. **Implement proper persistence** - Log and voted state must survive restarts
5. **Test failure scenarios** - Use chaos engineering to validate behavior
6. **Consider read scalability** - Linearizable reads require leader; relaxed reads can use followers
7. **Pre-vote optimization** - Prevents disruption from isolated nodes rejoining

</div>

## Related Topics

- [CAP Theorem](/topic/system-design/cap-theorem)
- [Database Replication](/topic/system-design/database-replication)
- [Distributed Locking](/topic/system-design/distributed-locking)
