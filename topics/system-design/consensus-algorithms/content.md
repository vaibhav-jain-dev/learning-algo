# Consensus Algorithms

## Overview

Consensus algorithms enable distributed systems to agree on a single value or state despite failures and network partitions. They are fundamental to building reliable distributed databases, configuration management, and coordination services.

## Key Concepts

### The Consensus Problem

```
Multiple nodes must agree on a single value:

Node A proposes: X
Node B proposes: Y
Node C proposes: X
                 ↓
All nodes agree: X (or Y, but same value)
```

### Properties of Consensus

1. **Agreement**: All correct nodes decide on the same value
2. **Validity**: The decided value was proposed by some node
3. **Termination**: All correct nodes eventually decide
4. **Integrity**: Each node decides at most once

### FLP Impossibility

In an asynchronous system with even one faulty node, no deterministic consensus algorithm can guarantee all three properties. Practical algorithms use timeouts to work around this.

## Common Consensus Algorithms

### 1. Paxos

The classic consensus algorithm, known for being difficult to understand but foundational.

```python
from enum import Enum
from dataclasses import dataclass
from typing import Optional, Dict, Any
import threading

class MessageType(Enum):
    PREPARE = "prepare"
    PROMISE = "promise"
    ACCEPT = "accept"
    ACCEPTED = "accepted"

@dataclass
class Proposal:
    number: int
    value: Any

class PaxosNode:
    def __init__(self, node_id: int, peers: list):
        self.node_id = node_id
        self.peers = peers

        # Acceptor state
        self.promised_number = 0
        self.accepted_proposal: Optional[Proposal] = None

        # Proposer state
        self.proposal_number = node_id  # Unique starting point
        self.quorum = (len(peers) + 1) // 2 + 1

        self.lock = threading.Lock()

    def propose(self, value: Any) -> bool:
        """Phase 1: Prepare"""
        with self.lock:
            self.proposal_number += len(self.peers) + 1

        # Send prepare to all acceptors
        promises = []
        for peer in self.peers + [self]:
            response = peer.receive_prepare(self.proposal_number)
            if response:
                promises.append(response)

        if len(promises) < self.quorum:
            return False

        # Use value from highest-numbered accepted proposal
        highest_accepted = max(
            [p for p in promises if p.get('accepted')],
            key=lambda p: p['accepted']['number'],
            default=None
        )

        if highest_accepted:
            value = highest_accepted['accepted']['value']

        """Phase 2: Accept"""
        accepted_count = 0
        for peer in self.peers + [self]:
            if peer.receive_accept(self.proposal_number, value):
                accepted_count += 1

        return accepted_count >= self.quorum

    def receive_prepare(self, proposal_number: int) -> Optional[Dict]:
        with self.lock:
            if proposal_number > self.promised_number:
                self.promised_number = proposal_number

                response = {'promised': proposal_number}
                if self.accepted_proposal:
                    response['accepted'] = {
                        'number': self.accepted_proposal.number,
                        'value': self.accepted_proposal.value
                    }
                return response

            return None

    def receive_accept(self, proposal_number: int, value: Any) -> bool:
        with self.lock:
            if proposal_number >= self.promised_number:
                self.promised_number = proposal_number
                self.accepted_proposal = Proposal(proposal_number, value)
                return True

            return False
```

### 2. Raft

Designed for understandability, widely used in practice.

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

    # Persistent state
    current_term: int = 0
    voted_for: Optional[str] = None
    log: List[LogEntry] = field(default_factory=list)

    # Volatile state
    state: NodeState = NodeState.FOLLOWER
    commit_index: int = 0
    last_applied: int = 0

    # Leader state
    next_index: dict = field(default_factory=dict)
    match_index: dict = field(default_factory=dict)

    # Timing
    election_timeout: float = 0
    last_heartbeat: float = 0

    def __post_init__(self):
        self.reset_election_timeout()
        self.lock = threading.Lock()

    def reset_election_timeout(self):
        self.election_timeout = random.uniform(150, 300) / 1000  # 150-300ms
        self.last_heartbeat = time.time()

    def should_start_election(self) -> bool:
        return time.time() - self.last_heartbeat > self.election_timeout

    def start_election(self):
        with self.lock:
            self.state = NodeState.CANDIDATE
            self.current_term += 1
            self.voted_for = self.node_id
            self.reset_election_timeout()

        votes = 1  # Vote for self

        last_log_index = len(self.log)
        last_log_term = self.log[-1].term if self.log else 0

        for peer in self.peers:
            vote_granted = self.request_vote(
                peer,
                self.current_term,
                last_log_index,
                last_log_term
            )
            if vote_granted:
                votes += 1

        quorum = (len(self.peers) + 1) // 2 + 1
        if votes >= quorum:
            self.become_leader()

    def become_leader(self):
        with self.lock:
            self.state = NodeState.LEADER

            # Initialize leader state
            next_idx = len(self.log) + 1
            for peer in self.peers:
                self.next_index[peer] = next_idx
                self.match_index[peer] = 0

        # Start sending heartbeats
        self.send_heartbeats()

    def request_vote(self, peer: str, term: int, last_log_index: int, last_log_term: int) -> bool:
        # Simulated RPC - in real implementation, this would be network call
        return True  # Simplified

    def receive_vote_request(self, candidate_id: str, term: int,
                             last_log_index: int, last_log_term: int) -> bool:
        with self.lock:
            if term < self.current_term:
                return False

            if term > self.current_term:
                self.current_term = term
                self.state = NodeState.FOLLOWER
                self.voted_for = None

            # Check if candidate's log is at least as up-to-date
            my_last_term = self.log[-1].term if self.log else 0
            my_last_index = len(self.log)

            log_ok = (last_log_term > my_last_term or
                     (last_log_term == my_last_term and last_log_index >= my_last_index))

            if (self.voted_for is None or self.voted_for == candidate_id) and log_ok:
                self.voted_for = candidate_id
                self.reset_election_timeout()
                return True

            return False

    def append_entries(self, term: int, leader_id: str, prev_log_index: int,
                       prev_log_term: int, entries: List[LogEntry],
                       leader_commit: int) -> bool:
        with self.lock:
            if term < self.current_term:
                return False

            self.reset_election_timeout()

            if term > self.current_term:
                self.current_term = term
                self.state = NodeState.FOLLOWER

            # Check log consistency
            if prev_log_index > 0:
                if len(self.log) < prev_log_index:
                    return False
                if self.log[prev_log_index - 1].term != prev_log_term:
                    return False

            # Append new entries
            for i, entry in enumerate(entries):
                idx = prev_log_index + i
                if idx < len(self.log):
                    if self.log[idx].term != entry.term:
                        self.log = self.log[:idx]
                        self.log.append(entry)
                else:
                    self.log.append(entry)

            # Update commit index
            if leader_commit > self.commit_index:
                self.commit_index = min(leader_commit, len(self.log))

            return True

    def send_heartbeats(self):
        if self.state != NodeState.LEADER:
            return

        for peer in self.peers:
            prev_log_index = self.next_index[peer] - 1
            prev_log_term = self.log[prev_log_index - 1].term if prev_log_index > 0 else 0

            entries = self.log[prev_log_index:]

            success = self.send_append_entries(
                peer,
                self.current_term,
                prev_log_index,
                prev_log_term,
                entries,
                self.commit_index
            )

            if success:
                self.next_index[peer] = len(self.log) + 1
                self.match_index[peer] = len(self.log)
            else:
                self.next_index[peer] = max(1, self.next_index[peer] - 1)

    def send_append_entries(self, peer: str, term: int, prev_log_index: int,
                            prev_log_term: int, entries: List, commit_index: int) -> bool:
        # Simulated RPC
        return True
```

### 3. PBFT (Practical Byzantine Fault Tolerance)

Handles Byzantine (malicious) failures.

```python
from dataclasses import dataclass
from typing import Dict, Set
from enum import Enum

class Phase(Enum):
    PRE_PREPARE = 1
    PREPARE = 2
    COMMIT = 3

@dataclass
class PBFTMessage:
    phase: Phase
    view: int
    sequence: int
    digest: str
    node_id: str

class PBFTNode:
    def __init__(self, node_id: str, nodes: list, f: int):
        self.node_id = node_id
        self.nodes = nodes
        self.f = f  # Max Byzantine failures (need 3f+1 nodes)
        self.view = 0
        self.sequence = 0

        self.pre_prepare_log: Dict[tuple, str] = {}
        self.prepare_log: Dict[tuple, Set[str]] = {}
        self.commit_log: Dict[tuple, Set[str]] = {}
        self.executed: Set[int] = set()

    def is_primary(self) -> bool:
        return self.nodes[self.view % len(self.nodes)] == self.node_id

    def request(self, operation: str) -> bool:
        if not self.is_primary():
            return False

        self.sequence += 1
        digest = hash(operation)

        # Send pre-prepare to all
        msg = PBFTMessage(
            phase=Phase.PRE_PREPARE,
            view=self.view,
            sequence=self.sequence,
            digest=str(digest),
            node_id=self.node_id
        )

        for node in self.nodes:
            self.send(node, msg, operation)

        return True

    def receive_pre_prepare(self, msg: PBFTMessage, operation: str):
        key = (msg.view, msg.sequence)

        # Verify message
        if key in self.pre_prepare_log:
            return  # Already received

        if str(hash(operation)) != msg.digest:
            return  # Invalid digest

        self.pre_prepare_log[key] = msg.digest

        # Send prepare
        prepare_msg = PBFTMessage(
            phase=Phase.PREPARE,
            view=msg.view,
            sequence=msg.sequence,
            digest=msg.digest,
            node_id=self.node_id
        )

        for node in self.nodes:
            self.send(node, prepare_msg)

    def receive_prepare(self, msg: PBFTMessage):
        key = (msg.view, msg.sequence)

        if key not in self.prepare_log:
            self.prepare_log[key] = set()

        self.prepare_log[key].add(msg.node_id)

        # Check if we have 2f prepares
        if len(self.prepare_log[key]) >= 2 * self.f:
            # Send commit
            commit_msg = PBFTMessage(
                phase=Phase.COMMIT,
                view=msg.view,
                sequence=msg.sequence,
                digest=msg.digest,
                node_id=self.node_id
            )

            for node in self.nodes:
                self.send(node, commit_msg)

    def receive_commit(self, msg: PBFTMessage):
        key = (msg.view, msg.sequence)

        if key not in self.commit_log:
            self.commit_log[key] = set()

        self.commit_log[key].add(msg.node_id)

        # Check if we have 2f+1 commits
        if len(self.commit_log[key]) >= 2 * self.f + 1:
            if msg.sequence not in self.executed:
                self.execute(msg.sequence)
                self.executed.add(msg.sequence)

    def send(self, node: str, msg: PBFTMessage, operation: str = None):
        # Simulated network send
        pass

    def execute(self, sequence: int):
        print(f"Executing operation {sequence}")
```

## Implementation Example

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

	// Channels
	appendEntriesCh chan AppendEntriesArgs
	requestVoteCh   chan RequestVoteArgs
	heartbeatTimer  *time.Timer
	electionTimer   *time.Timer
}

type RequestVoteArgs struct {
	Term         int
	CandidateId  int
	LastLogIndex int
	LastLogTerm  int
	ReplyCh      chan RequestVoteReply
}

type RequestVoteReply struct {
	Term        int
	VoteGranted bool
}

type AppendEntriesArgs struct {
	Term         int
	LeaderId     int
	PrevLogIndex int
	PrevLogTerm  int
	Entries      []LogEntry
	LeaderCommit int
	ReplyCh      chan AppendEntriesReply
}

type AppendEntriesReply struct {
	Term    int
	Success bool
}

func NewRaftNode(id int, peers []int) *RaftNode {
	node := &RaftNode{
		id:              id,
		peers:           peers,
		currentTerm:     0,
		votedFor:        -1,
		log:             make([]LogEntry, 0),
		state:           Follower,
		commitIndex:     0,
		lastApplied:     0,
		nextIndex:       make(map[int]int),
		matchIndex:      make(map[int]int),
		appendEntriesCh: make(chan AppendEntriesArgs, 100),
		requestVoteCh:   make(chan RequestVoteArgs, 100),
	}

	node.resetElectionTimer()

	go node.run()

	return node
}

func (n *RaftNode) resetElectionTimer() {
	timeout := time.Duration(150+rand.Intn(150)) * time.Millisecond

	if n.electionTimer != nil {
		n.electionTimer.Stop()
	}

	n.electionTimer = time.AfterFunc(timeout, func() {
		n.startElection()
	})
}

func (n *RaftNode) run() {
	for {
		select {
		case args := <-n.requestVoteCh:
			reply := n.handleRequestVote(args)
			args.ReplyCh <- reply

		case args := <-n.appendEntriesCh:
			reply := n.handleAppendEntries(args)
			args.ReplyCh <- reply
		}
	}
}

func (n *RaftNode) startElection() {
	n.mu.Lock()
	n.state = Candidate
	n.currentTerm++
	n.votedFor = n.id
	term := n.currentTerm
	lastLogIndex := len(n.log)
	lastLogTerm := 0
	if lastLogIndex > 0 {
		lastLogTerm = n.log[lastLogIndex-1].Term
	}
	n.mu.Unlock()

	votes := 1 // Vote for self

	var voteMu sync.Mutex
	var wg sync.WaitGroup

	for _, peer := range n.peers {
		wg.Add(1)
		go func(peerId int) {
			defer wg.Done()

			replyCh := make(chan RequestVoteReply, 1)

			// Send request vote RPC (simulated)
			args := RequestVoteArgs{
				Term:         term,
				CandidateId:  n.id,
				LastLogIndex: lastLogIndex,
				LastLogTerm:  lastLogTerm,
				ReplyCh:      replyCh,
			}

			// In real implementation, send over network
			select {
			case <-time.After(50 * time.Millisecond):
				return // Timeout
			case reply := <-replyCh:
				if reply.VoteGranted {
					voteMu.Lock()
					votes++
					voteMu.Unlock()
				}
			}
		}(peer)
	}

	wg.Wait()

	n.mu.Lock()
	defer n.mu.Unlock()

	if n.state != Candidate || n.currentTerm != term {
		return // State changed
	}

	quorum := (len(n.peers)+1)/2 + 1
	if votes >= quorum {
		n.becomeLeader()
	} else {
		n.resetElectionTimer()
	}
}

func (n *RaftNode) becomeLeader() {
	n.state = Leader

	// Initialize leader state
	for _, peer := range n.peers {
		n.nextIndex[peer] = len(n.log) + 1
		n.matchIndex[peer] = 0
	}

	// Start heartbeat timer
	n.heartbeatTimer = time.AfterFunc(50*time.Millisecond, func() {
		n.sendHeartbeats()
	})
}

func (n *RaftNode) sendHeartbeats() {
	n.mu.Lock()
	if n.state != Leader {
		n.mu.Unlock()
		return
	}
	term := n.currentTerm
	n.mu.Unlock()

	for _, peer := range n.peers {
		go func(peerId int) {
			n.mu.Lock()
			prevLogIndex := n.nextIndex[peerId] - 1
			prevLogTerm := 0
			if prevLogIndex > 0 && prevLogIndex <= len(n.log) {
				prevLogTerm = n.log[prevLogIndex-1].Term
			}
			entries := n.log[n.nextIndex[peerId]-1:]
			n.mu.Unlock()

			args := AppendEntriesArgs{
				Term:         term,
				LeaderId:     n.id,
				PrevLogIndex: prevLogIndex,
				PrevLogTerm:  prevLogTerm,
				Entries:      entries,
				LeaderCommit: n.commitIndex,
			}

			// Send AppendEntries RPC (simulated)
			_ = args
		}(peer)
	}

	// Schedule next heartbeat
	n.heartbeatTimer.Reset(50 * time.Millisecond)
}

func (n *RaftNode) handleRequestVote(args RequestVoteArgs) RequestVoteReply {
	n.mu.Lock()
	defer n.mu.Unlock()

	reply := RequestVoteReply{Term: n.currentTerm}

	if args.Term < n.currentTerm {
		return reply
	}

	if args.Term > n.currentTerm {
		n.currentTerm = args.Term
		n.state = Follower
		n.votedFor = -1
	}

	// Check if candidate's log is up-to-date
	lastLogIndex := len(n.log)
	lastLogTerm := 0
	if lastLogIndex > 0 {
		lastLogTerm = n.log[lastLogIndex-1].Term
	}

	logOk := args.LastLogTerm > lastLogTerm ||
		(args.LastLogTerm == lastLogTerm && args.LastLogIndex >= lastLogIndex)

	if (n.votedFor == -1 || n.votedFor == args.CandidateId) && logOk {
		n.votedFor = args.CandidateId
		reply.VoteGranted = true
		n.resetElectionTimer()
	}

	return reply
}

func (n *RaftNode) handleAppendEntries(args AppendEntriesArgs) AppendEntriesReply {
	n.mu.Lock()
	defer n.mu.Unlock()

	reply := AppendEntriesReply{Term: n.currentTerm}

	if args.Term < n.currentTerm {
		return reply
	}

	n.resetElectionTimer()

	if args.Term > n.currentTerm {
		n.currentTerm = args.Term
		n.state = Follower
		n.votedFor = -1
	}

	// Check log consistency
	if args.PrevLogIndex > 0 {
		if len(n.log) < args.PrevLogIndex {
			return reply
		}
		if n.log[args.PrevLogIndex-1].Term != args.PrevLogTerm {
			return reply
		}
	}

	// Append entries
	for i, entry := range args.Entries {
		idx := args.PrevLogIndex + i
		if idx < len(n.log) {
			if n.log[idx].Term != entry.Term {
				n.log = n.log[:idx]
				n.log = append(n.log, entry)
			}
		} else {
			n.log = append(n.log, entry)
		}
	}

	// Update commit index
	if args.LeaderCommit > n.commitIndex {
		if args.LeaderCommit < len(n.log) {
			n.commitIndex = args.LeaderCommit
		} else {
			n.commitIndex = len(n.log)
		}
	}

	reply.Success = true
	return reply
}

func main() {
	// Create a cluster of 3 nodes
	peers := []int{0, 1, 2}

	nodes := make([]*RaftNode, 3)
	for i := 0; i < 3; i++ {
		otherPeers := make([]int, 0)
		for _, p := range peers {
			if p != i {
				otherPeers = append(otherPeers, p)
			}
		}
		nodes[i] = NewRaftNode(i, otherPeers)
	}

	time.Sleep(5 * time.Second)
}
```

## Comparison of Algorithms

| Algorithm | Fault Model | Nodes Needed | Latency | Complexity |
|-----------|-------------|--------------|---------|------------|
| Paxos | Crash | 2f+1 | 2 RTT | High |
| Raft | Crash | 2f+1 | 2 RTT | Medium |
| PBFT | Byzantine | 3f+1 | 3 RTT | High |
| Zab | Crash | 2f+1 | 2 RTT | Medium |

## Common Interview Questions

1. **Why is Raft preferred over Paxos in practice?**
   - Easier to understand and implement
   - Better documentation
   - Clear leader election process

2. **How does Raft handle network partitions?**
   - Minority partition cannot elect leader (no quorum)
   - Majority partition continues operating
   - After partition heals, minority catches up

3. **What's the difference between crash and Byzantine failures?**
   - Crash: Node stops responding
   - Byzantine: Node may behave arbitrarily (malicious)

4. **How many failures can Raft tolerate?**
   - With n nodes: tolerates (n-1)/2 failures
   - 3 nodes: 1 failure
   - 5 nodes: 2 failures

## Best Practices

1. **Use odd number of nodes** - Avoid ties in voting
2. **Monitor leader elections** - Frequent elections indicate issues
3. **Tune timeouts carefully** - Balance between availability and stability
4. **Implement proper persistence** - Log and state must survive restarts
5. **Test failure scenarios** - Chaos engineering
6. **Consider read scalability** - Linearizable reads have overhead

## Related Topics

- [CAP Theorem](/topic/system-design/cap-theorem)
- [Database Replication](/topic/system-design/database-replication)
- [Distributed Systems](/topic/system-design/microservices)
