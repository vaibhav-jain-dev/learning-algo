# Concurrency Patterns

## Overview

Concurrency patterns are battle-tested solutions for coordinating multiple execution contexts competing for shared resources. Understanding these patterns at a deep level is essential for designing systems that are correct under all interleavings, performant under load, and debuggable when things go wrong.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #cbd5e1;">
<div style="color: #1e293b; font-size: 18px; font-weight: 700; margin-bottom: 20px; text-align: center;">The Fundamental Tension in Concurrent Systems</div>
<div style="display: flex; flex-wrap: wrap; gap: 20px;">
<div style="background: #eff6ff; border-radius: 12px; padding: 20px; border: 2px solid #3b82f6; flex: 1; min-width: 180px;">
<div style="color: #1e40af; font-weight: 600; font-size: 15px; margin-bottom: 8px;">Safety</div>
<div style="color: #475569; font-size: 13px; line-height: 1.6;">Nothing bad ever happens. No race conditions, no data corruption, no invariant violations.</div>
</div>
<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; border: 2px solid #22c55e; flex: 1; min-width: 180px;">
<div style="color: #166534; font-weight: 600; font-size: 15px; margin-bottom: 8px;">Liveness</div>
<div style="color: #475569; font-size: 13px; line-height: 1.6;">Something good eventually happens. No deadlocks, no starvation, progress is always made.</div>
</div>
<div style="background: #fff7ed; border-radius: 12px; padding: 20px; border: 2px solid #f97316; flex: 1; min-width: 180px;">
<div style="color: #c2410c; font-weight: 600; font-size: 15px; margin-bottom: 8px;">Performance</div>
<div style="color: #475569; font-size: 13px; line-height: 1.6;">Good things happen quickly. Low latency, high throughput, efficient resource utilization.</div>
</div>
</div>
<div style="color: #64748b; font-size: 13px; text-align: center; margin-top: 16px; font-style: italic;">Every concurrency design decision involves trading off between these three properties.</div>
</div>

<div style="background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #eab308;">
<div style="color: #a16207; font-weight: 700; margin-bottom: 8px;">Critical Assumption</div>
<div style="color: #713f12; font-size: 14px; line-height: 1.7;">Concurrency bugs are non-deterministic. A program may run correctly thousands of times and fail on the thousand-and-first due to a specific thread interleaving. Testing alone cannot prove correctness. You must reason about all possible interleavings, use formal verification techniques where possible, and design defensively.</div>
</div>

---

## Thread Pools

### Internal Architecture and Mechanisms

A thread pool maintains a collection of pre-created worker threads that pull tasks from a shared work queue. This amortizes thread creation overhead across many tasks and bounds resource consumption.

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #bfdbfe;">
<div style="color: #1e40af; font-size: 16px; font-weight: 700; margin-bottom: 20px; text-align: center;">Thread Pool Internal Components</div>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
<div style="background: white; border-radius: 12px; padding: 16px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 600; margin-bottom: 8px;">Work Queue</div>
<div style="color: #334155; font-size: 13px; line-height: 1.6;">Holds pending tasks. Can be bounded (blocking on full) or unbounded (risk of OOM). Implementation choices: LinkedBlockingQueue, ArrayBlockingQueue, SynchronousQueue (direct handoff).</div>
</div>
<div style="background: white; border-radius: 12px; padding: 16px; border: 2px solid #8b5cf6;">
<div style="color: #5b21b6; font-weight: 600; margin-bottom: 8px;">Worker Threads</div>
<div style="color: #334155; font-size: 13px; line-height: 1.6;">Long-running threads in a loop: dequeue task, execute, repeat. Park when queue empty. Core threads stay alive; excess threads may terminate after idle timeout.</div>
</div>
<div style="background: white; border-radius: 12px; padding: 16px; border: 2px solid #10b981;">
<div style="color: #059669; font-weight: 600; margin-bottom: 8px;">Thread Factory</div>
<div style="color: #334155; font-size: 13px; line-height: 1.6;">Creates worker threads with proper naming (for debugging), daemon status, priority, and uncaught exception handlers. Critical for observability.</div>
</div>
<div style="background: white; border-radius: 12px; padding: 16px; border: 2px solid #f59e0b;">
<div style="color: #d97706; font-weight: 600; margin-bottom: 8px;">Rejection Handler</div>
<div style="color: #334155; font-size: 13px; line-height: 1.6;">Invoked when queue is full and max threads reached. Policies: AbortPolicy (throw), CallerRunsPolicy (execute in submitting thread), DiscardPolicy, DiscardOldestPolicy.</div>
</div>
</div>
</div>

### Thread Pool Sizing: The Science

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">
<div style="color: #1e293b; font-size: 16px; font-weight: 700; margin-bottom: 16px;">Optimal Thread Count Formulas</div>

<div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
<div style="color: #1e40af; font-weight: 600; margin-bottom: 12px;">CPU-Bound Workloads</div>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 15px; color: #1e293b; text-align: center; margin-bottom: 12px;">
      N<sub>threads</sub> = N<sub>cpu</sub> + 1
</div>
<div style="color: #64748b; font-size: 13px;">The +1 accounts for occasional page faults or other stalls. More threads cause context switching overhead that degrades performance.</div>
</div>

<div style="background: white; border-radius: 12px; padding: 20px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
<div style="color: #059669; font-weight: 600; margin-bottom: 12px;">I/O-Bound Workloads (Little's Law Derivation)</div>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 15px; color: #1e293b; text-align: center; margin-bottom: 12px;">
      N<sub>threads</sub> = N<sub>cpu</sub> x U<sub>target</sub> x (1 + W/C)
</div>
<div style="color: #64748b; font-size: 13px;">
<strong>U<sub>target</sub></strong> = target CPU utilization (0.0-1.0, typically 0.8)<br/>
<strong>W</strong> = average wait time (blocking on I/O)<br/>
<strong>C</strong> = average compute time<br/>
      Example: 8 cores, 80% target utilization, 100ms wait, 10ms compute = 8 x 0.8 x (1 + 10) = 70 threads
</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 16px; border: 1px solid #fecaca;">
<div style="color: #991b1b; font-weight: 600; margin-bottom: 8px;">Critical Edge Case: Blocking Inside Tasks</div>
<div style="color: #7f1d1d; font-size: 13px;">If tasks make synchronous calls to other services/databases, the W/C ratio can spike unexpectedly. A downstream service degradation can exhaust your thread pool. Solution: Use separate pools for different latency tiers, or use async I/O.</div>
</div>
</div>

### Work Stealing: Advanced Thread Pool Optimization

Work stealing improves load balancing when tasks have variable execution times. Each worker maintains a local deque (double-ended queue). Workers push/pop from their own deque's tail (LIFO for cache locality), but steal from other workers' heads (FIFO for fairness).

<div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e9d5ff;">
<div style="color: #7c3aed; font-size: 16px; font-weight: 700; margin-bottom: 16px; text-align: center;">Work Stealing Mechanics</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
<div style="background: white; border-radius: 12px; padding: 16px; border-left: 4px solid #8b5cf6;">
<div style="color: #5b21b6; font-weight: 600; font-size: 14px; margin-bottom: 8px;">Local Execution</div>
<div style="color: #64748b; font-size: 12px;">Worker pops from own deque tail. LIFO order keeps hot data in cache. No contention with other threads.</div>
</div>
<div style="background: white; border-radius: 12px; padding: 16px; border-left: 4px solid #8b5cf6;">
<div style="color: #5b21b6; font-weight: 600; font-size: 14px; margin-bottom: 8px;">Stealing</div>
<div style="color: #64748b; font-size: 12px;">Idle worker steals from random victim's head. FIFO order steals oldest (largest) tasks. Uses CAS for lock-free operation.</div>
</div>
<div style="background: white; border-radius: 12px; padding: 16px; border-left: 4px solid #8b5cf6;">
<div style="color: #5b21b6; font-weight: 600; font-size: 14px; margin-bottom: 8px;">Fork-Join Pattern</div>
<div style="color: #64748b; font-size: 12px;">Parent task forks children to local deque. Children may be stolen. Parent joins by helping execute if not done.</div>
</div>
</div>
</div>

### Thread Pool Interview Questions (3-Level Deep)

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #bbf7d0;">
<div style="color: #166534; font-size: 16px; font-weight: 700; margin-bottom: 20px;">Level 1: How does a thread pool work?</div>

<div style="background: white; border-radius: 12px; padding: 16px; margin-bottom: 16px; border: 1px solid #86efac;">
<div style="color: #166534; font-weight: 600; margin-bottom: 8px;">Expected Answer:</div>
<div style="color: #334155; font-size: 14px; line-height: 1.7;">A thread pool maintains a fixed set of worker threads and a queue of pending tasks. Instead of creating a new thread for each task (expensive: ~1MB stack allocation, OS scheduling overhead), tasks are submitted to the queue. Worker threads continuously pull tasks from the queue and execute them. This amortizes creation cost and bounds resource usage.</div>
</div>

<div style="background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%); border-radius: 12px; padding: 20px; margin-left: 24px; margin-bottom: 16px; border: 1px solid #fde68a;">
<div style="color: #a16207; font-size: 15px; font-weight: 700; margin-bottom: 16px;">Level 2: What happens when tasks are submitted faster than workers can process them?</div>

<div style="background: white; border-radius: 12px; padding: 16px; margin-bottom: 16px; border: 1px solid #fcd34d;">
<div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Expected Answer:</div>
<div style="color: #334155; font-size: 14px; line-height: 1.7;">Tasks accumulate in the queue. With an unbounded queue, memory grows until OOM. With a bounded queue, behavior depends on the rejection policy: block the submitter, throw exception, discard the task, or run in the caller's thread. The CallerRunsPolicy provides natural backpressure by slowing down the producer when consumers are overwhelmed.</div>
</div>

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 20px; margin-left: 24px; border: 1px solid #fecaca;">
<div style="color: #991b1b; font-size: 14px; font-weight: 700; margin-bottom: 16px;">Level 3: How would you design a thread pool that handles both CPU-bound and I/O-bound tasks without one starving the other?</div>

<div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #f87171;">
<div style="color: #b91c1c; font-weight: 600; margin-bottom: 8px;">Expected Answer:</div>
<div style="color: #334155; font-size: 14px; line-height: 1.7;">
<strong>Option 1: Separate pools.</strong> Dedicate N<sub>cpu</sub> threads for CPU work, larger pool for I/O. Requires task classification at submission time.<br/><br/>
<strong>Option 2: Managed blocking.</strong> Like ForkJoinPool's ManagedBlocker: before blocking, signal the pool to compensate by temporarily adding a thread. Prevents throughput collapse during blocking operations.<br/><br/>
<strong>Option 3: Async I/O.</strong> Convert I/O-bound work to non-blocking (CompletableFuture, coroutines). Single pool handles CPU work; I/O completion triggers continuations without blocking threads.<br/><br/>
<strong>Trade-off:</strong> Separate pools waste resources when workload mix changes. Managed blocking adds complexity. Async requires rewriting blocking code. Netflix uses separate pools per dependency to isolate failure domains (see [[bulkhead-pattern]](/topic/system-design/bulkhead-pattern)).
</div>
</div>
</div>
</div>
</div>

---

## Producer-Consumer Pattern

### Internal Mechanisms

The producer-consumer pattern decouples task generation from task processing using a shared buffer. Producers add items; consumers remove them. The buffer absorbs temporary rate mismatches between production and consumption.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">
<div style="color: #1e293b; font-size: 16px; font-weight: 700; margin-bottom: 20px; text-align: center;">Producer-Consumer Synchronization</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
<div style="background: #dbeafe; border-radius: 12px; padding: 20px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; margin-bottom: 12px;">Producer Logic</div>
<div style="font-family: 'Courier New', monospace; font-size: 12px; color: #1e293b; line-height: 1.8; background: white; padding: 12px; border-radius: 8px;">
        acquire(mutex)<br/>
        while (count == BUFFER_SIZE):<br/>
        &nbsp;&nbsp;wait(not_full, mutex)<br/>
        buffer[in] = item<br/>
        in = (in + 1) % BUFFER_SIZE<br/>
        count++<br/>
        signal(not_empty)<br/>
        release(mutex)
</div>
</div>
<div style="background: #dcfce7; border-radius: 12px; padding: 20px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 700; margin-bottom: 12px;">Consumer Logic</div>
<div style="font-family: 'Courier New', monospace; font-size: 12px; color: #1e293b; line-height: 1.8; background: white; padding: 12px; border-radius: 8px;">
        acquire(mutex)<br/>
        while (count == 0):<br/>
        &nbsp;&nbsp;wait(not_empty, mutex)<br/>
        item = buffer[out]<br/>
        out = (out + 1) % BUFFER_SIZE<br/>
        count--<br/>
        signal(not_full)<br/>
        release(mutex)
</div>
</div>
</div>

<div style="background: #fef3c7; border-radius: 12px; padding: 16px; border: 1px solid #fcd34d;">
<div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Why "while" instead of "if"? (Spurious Wakeups)</div>
<div style="color: #78350f; font-size: 13px; line-height: 1.6;">Condition variables can wake spuriously (no signal occurred) or wake multiple threads when only one can proceed. The while loop re-checks the condition after waking, ensuring correctness. This is a POSIX requirement and occurs in practice due to OS scheduler implementation details.</div>
</div>
</div>

### Buffer Implementation Choices

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
<div style="background: white; border-radius: 12px; padding: 20px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; margin-bottom: 12px;">Bounded Buffer (Ring Buffer)</div>
<div style="color: #334155; font-size: 13px; line-height: 1.7; margin-bottom: 12px;">
        Fixed-size circular array. O(1) enqueue/dequeue. Provides natural backpressure. Memory bounded.
</div>
<div style="background: #eff6ff; padding: 12px; border-radius: 8px;">
<div style="color: #1e40af; font-weight: 600; font-size: 12px; margin-bottom: 4px;">Use When:</div>
<div style="color: #334155; font-size: 12px;">Memory is constrained; you want automatic flow control; producer can afford to block or reject.</div>
</div>
</div>
<div style="background: white; border-radius: 12px; padding: 20px; border: 2px solid #8b5cf6;">
<div style="color: #5b21b6; font-weight: 700; margin-bottom: 12px;">Unbounded Buffer (Linked List)</div>
<div style="color: #334155; font-size: 13px; line-height: 1.7; margin-bottom: 12px;">
        Grows dynamically. Producer never blocks. Risk of memory exhaustion if consumer falls behind.
</div>
<div style="background: #faf5ff; padding: 12px; border-radius: 8px;">
<div style="color: #5b21b6; font-weight: 600; font-size: 12px; margin-bottom: 4px;">Use When:</div>
<div style="color: #334155; font-size: 12px;">Bursty traffic with eventual catch-up; producer latency is critical; you have memory headroom and monitoring.</div>
</div>
</div>
</div>
</div>

### Lock-Free Alternatives: LMAX Disruptor Pattern

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 2px solid #cbd5e1;">
<div style="color: #1e293b; font-size: 16px; font-weight: 700; margin-bottom: 16px;">The Disruptor: Mechanical Sympathy in Action</div>
<div style="color: #475569; font-size: 14px; line-height: 1.7; margin-bottom: 16px;">
    The LMAX Disruptor achieves millions of operations per second through:
</div>
<div style="display: flex; flex-wrap: wrap; gap: 16px;">
<div style="background: #eff6ff; border-radius: 12px; padding: 16px; border: 2px solid #3b82f6; flex: 1; min-width: 200px;">
<div style="color: #1e40af; font-weight: 600; margin-bottom: 8px;">Pre-allocated Ring Buffer</div>
<div style="color: #475569; font-size: 12px;">All entries pre-allocated. No GC pressure. Entries overwritten, not deallocated.</div>
</div>
<div style="background: #f0fdf4; border-radius: 12px; padding: 16px; border: 2px solid #22c55e; flex: 1; min-width: 200px;">
<div style="color: #166534; font-weight: 600; margin-bottom: 8px;">Cache-Line Padding</div>
<div style="color: #475569; font-size: 12px;">Sequences padded to avoid false sharing. Each sequence on its own cache line (64 bytes).</div>
</div>
<div style="background: #fff7ed; border-radius: 12px; padding: 16px; border: 2px solid #f97316; flex: 1; min-width: 200px;">
<div style="color: #c2410c; font-weight: 600; margin-bottom: 8px;">Memory Barriers</div>
<div style="color: #475569; font-size: 12px;">Volatile writes for sequence numbers. Consumers spin-wait on sequence, avoiding kernel transitions.</div>
</div>
<div style="background: #f5f3ff; border-radius: 12px; padding: 16px; border: 2px solid #8b5cf6; flex: 1; min-width: 200px;">
<div style="color: #5b21b6; font-weight: 600; margin-bottom: 8px;">Batching</div>
<div style="color: #475569; font-size: 12px;">Consumer can process all available entries in one batch. Amortizes synchronization overhead.</div>
</div>
</div>
</div>

### Producer-Consumer Interview Questions (3-Level Deep)

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #bbf7d0;">
<div style="color: #166534; font-size: 16px; font-weight: 700; margin-bottom: 20px;">Level 1: What is the producer-consumer pattern and why is it useful?</div>

<div style="background: white; border-radius: 12px; padding: 16px; margin-bottom: 16px; border: 1px solid #86efac;">
<div style="color: #166534; font-weight: 600; margin-bottom: 8px;">Expected Answer:</div>
<div style="color: #334155; font-size: 14px; line-height: 1.7;">Producer-consumer decouples components that generate work from those that process it using a shared queue. Benefits: (1) Rate decoupling: producers and consumers can operate at different speeds. (2) Load balancing: multiple consumers share work. (3) Fault isolation: consumer crash doesn't affect producer. Used in message queues, logging systems, request processing pipelines.</div>
</div>

<div style="background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%); border-radius: 12px; padding: 20px; margin-left: 24px; margin-bottom: 16px; border: 1px solid #fde68a;">
<div style="color: #a16207; font-size: 15px; font-weight: 700; margin-bottom: 16px;">Level 2: How do you prevent the producer from overwhelming the consumer?</div>

<div style="background: white; border-radius: 12px; padding: 16px; margin-bottom: 16px; border: 1px solid #fcd34d;">
<div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Expected Answer:</div>
<div style="color: #334155; font-size: 14px; line-height: 1.7;">
<strong>Backpressure mechanisms:</strong><br/>
        1. <strong>Bounded queue + blocking:</strong> Producer blocks when queue full. Simple but can cause upstream latency spikes.<br/>
        2. <strong>Rejection with retry:</strong> Return error to producer; it retries with exponential backoff.<br/>
        3. <strong>Rate limiting:</strong> Token bucket at producer limits submission rate.<br/>
        4. <strong>Reactive streams:</strong> Consumer signals demand; producer only sends what's requested (pull-based).<br/>
        5. <strong>Sampling/dropping:</strong> For metrics/logs where completeness isn't critical, drop entries under pressure.
</div>
</div>

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 20px; margin-left: 24px; border: 1px solid #fecaca;">
<div style="color: #991b1b; font-size: 14px; font-weight: 700; margin-bottom: 16px;">Level 3: Your producer-consumer system has 100ms p99 latency requirements. During peak load, you see latency spikes to 5 seconds. How do you diagnose and fix this?</div>

<div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #f87171;">
<div style="color: #b91c1c; font-weight: 600; margin-bottom: 8px;">Expected Answer:</div>
<div style="color: #334155; font-size: 14px; line-height: 1.7;">
<strong>Diagnosis:</strong><br/>
      1. <strong>Queue depth monitoring:</strong> If queue grows unboundedly, consumers can't keep up. Check consumer processing rate vs producer submission rate.<br/>
      2. <strong>Consumer profiling:</strong> Are consumers blocked on downstream calls? Check for lock contention, GC pauses, I/O waits.<br/>
      3. <strong>Coordination overhead:</strong> Lock contention on the queue itself? Profile time spent acquiring locks vs doing work.<br/><br/>

<strong>Solutions (depending on root cause):</strong><br/>
      1. <strong>Queue saturation:</strong> Add consumers, increase queue size with alerting, implement load shedding (drop low-priority items).<br/>
      2. <strong>Slow consumers:</strong> Profile and optimize hot paths, add caching, parallelize independent work within consumer.<br/>
      3. <strong>Lock contention:</strong> Use lock-free queue (ConcurrentLinkedQueue, Disruptor), shard into multiple queues, batch submissions to reduce coordination frequency.<br/>
      4. <strong>Head-of-line blocking:</strong> If one slow item blocks queue, use multiple queues with priority levels or task stealing.<br/><br/>

<strong>Architectural change:</strong> If spikes are bursty, consider async processing with acknowledgment (message broker like [[message-queues]](/topic/system-design/message-queues)), accepting higher latency but better throughput.
</div>
</div>
</div>
</div>
</div>

---

## Readers-Writers Problem

### The Core Dilemma

Multiple readers can safely access shared data simultaneously (reads don't conflict), but writers need exclusive access (writes conflict with both reads and other writes). The readers-writers lock optimizes for read-heavy workloads.

<div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e9d5ff;">
<div style="color: #7c3aed; font-size: 16px; font-weight: 700; margin-bottom: 20px; text-align: center;">Access Compatibility Matrix</div>
<div style="display: flex; justify-content: center;">
<table style="border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
<tr style="background: #8b5cf6; color: white;">
<th style="padding: 16px 24px; text-align: center;"></th>
<th style="padding: 16px 24px; text-align: center;">Reader Holding</th>
<th style="padding: 16px 24px; text-align: center;">Writer Holding</th>
</tr>
<tr style="border-bottom: 1px solid #e9d5ff;">
<td style="padding: 16px 24px; font-weight: 600; background: #f3e8ff;">Reader Wants</td>
<td style="padding: 16px 24px; text-align: center; color: #16a34a; font-weight: 600;">ALLOWED</td>
<td style="padding: 16px 24px; text-align: center; color: #dc2626; font-weight: 600;">BLOCKED</td>
</tr>
<tr>
<td style="padding: 16px 24px; font-weight: 600; background: #f3e8ff;">Writer Wants</td>
<td style="padding: 16px 24px; text-align: center; color: #dc2626; font-weight: 600;">BLOCKED</td>
<td style="padding: 16px 24px; text-align: center; color: #dc2626; font-weight: 600;">BLOCKED</td>
</tr>
</table>
</div>
</div>

### Preference Policies and Starvation

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
<div style="background: white; border-radius: 12px; padding: 20px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; margin-bottom: 12px;">Reader-Preference</div>
<div style="color: #334155; font-size: 13px; line-height: 1.7; margin-bottom: 12px;">
        New readers can acquire lock even if writer is waiting. Maximizes read throughput.
</div>
<div style="background: #fee2e2; padding: 12px; border-radius: 8px;">
<div style="color: #991b1b; font-weight: 600; font-size: 12px;">Risk:</div>
<div style="color: #7f1d1d; font-size: 12px;">Writer starvation. Continuous reader stream means writer never executes.</div>
</div>
</div>
<div style="background: white; border-radius: 12px; padding: 20px; border: 2px solid #f59e0b;">
<div style="color: #d97706; font-weight: 700; margin-bottom: 12px;">Writer-Preference</div>
<div style="color: #334155; font-size: 13px; line-height: 1.7; margin-bottom: 12px;">
        Once writer is waiting, no new readers admitted. Writer gets lock when current readers finish.
</div>
<div style="background: #fee2e2; padding: 12px; border-radius: 8px;">
<div style="color: #991b1b; font-weight: 600; font-size: 12px;">Risk:</div>
<div style="color: #7f1d1d; font-size: 12px;">Reader starvation. Continuous writer stream means readers queue indefinitely.</div>
</div>
</div>
<div style="background: white; border-radius: 12px; padding: 20px; border: 2px solid #10b981;">
<div style="color: #059669; font-weight: 700; margin-bottom: 12px;">Fair (FIFO)</div>
<div style="color: #334155; font-size: 13px; line-height: 1.7; margin-bottom: 12px;">
        Service requests in arrival order. No starvation for either party.
</div>
<div style="background: #fef3c7; padding: 12px; border-radius: 8px;">
<div style="color: #92400e; font-weight: 600; font-size: 12px;">Trade-off:</div>
<div style="color: #78350f; font-size: 12px;">Lower throughput than preference policies. Writer arrival stops admitting new readers.</div>
</div>
</div>
</div>
</div>

### Implementation Deep Dive

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 2px solid #cbd5e1;">
<div style="color: #1e293b; font-size: 16px; font-weight: 700; margin-bottom: 16px;">Writer-Preference RWLock Implementation</div>
<div style="font-family: 'Courier New', monospace; font-size: 12px; color: #1e293b; line-height: 1.8; background: #f1f5f9; padding: 20px; border-radius: 12px; overflow-x: auto; border: 1px solid #cbd5e1;">
<span style="color: #94a3b8;">// State variables</span><br/>
    int readers = 0;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #94a3b8;">// Active readers</span><br/>
    int writers_waiting = 0;&nbsp;<span style="color: #94a3b8;">// Writers in queue</span><br/>
    bool writer_active = false;<br/>
    Mutex mutex;<br/>
    CondVar can_read, can_write;<br/><br/>

<span style="color: #60a5fa;">read_lock():</span><br/>
    &nbsp;&nbsp;lock(mutex)<br/>
    &nbsp;&nbsp;<span style="color: #fbbf24;">while</span> (writer_active || writers_waiting > 0):<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;wait(can_read, mutex)&nbsp;&nbsp;<span style="color: #94a3b8;">// Block if writer active OR waiting</span><br/>
    &nbsp;&nbsp;readers++<br/>
    &nbsp;&nbsp;unlock(mutex)<br/><br/>

<span style="color: #60a5fa;">read_unlock():</span><br/>
    &nbsp;&nbsp;lock(mutex)<br/>
    &nbsp;&nbsp;readers--<br/>
    &nbsp;&nbsp;<span style="color: #fbbf24;">if</span> (readers == 0):<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;signal(can_write)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #94a3b8;">// Wake one waiting writer</span><br/>
    &nbsp;&nbsp;unlock(mutex)<br/><br/>

<span style="color: #60a5fa;">write_lock():</span><br/>
    &nbsp;&nbsp;lock(mutex)<br/>
    &nbsp;&nbsp;writers_waiting++<br/>
    &nbsp;&nbsp;<span style="color: #fbbf24;">while</span> (writer_active || readers > 0):<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;wait(can_write, mutex)<br/>
    &nbsp;&nbsp;writers_waiting--<br/>
    &nbsp;&nbsp;writer_active = true<br/>
    &nbsp;&nbsp;unlock(mutex)<br/><br/>

<span style="color: #60a5fa;">write_unlock():</span><br/>
    &nbsp;&nbsp;lock(mutex)<br/>
    &nbsp;&nbsp;writer_active = false<br/>
    &nbsp;&nbsp;<span style="color: #fbbf24;">if</span> (writers_waiting > 0):<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;signal(can_write)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #94a3b8;">// Prioritize next writer</span><br/>
    &nbsp;&nbsp;<span style="color: #fbbf24;">else</span>:<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;broadcast(can_read)&nbsp;&nbsp;&nbsp;<span style="color: #94a3b8;">// Wake all waiting readers</span><br/>
    &nbsp;&nbsp;unlock(mutex)
</div>
</div>

### Readers-Writers Interview Questions (3-Level Deep)

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #bbf7d0;">
<div style="color: #166534; font-size: 16px; font-weight: 700; margin-bottom: 20px;">Level 1: When would you use a readers-writers lock instead of a mutex?</div>

<div style="background: white; border-radius: 12px; padding: 16px; margin-bottom: 16px; border: 1px solid #86efac;">
<div style="color: #166534; font-weight: 600; margin-bottom: 8px;">Expected Answer:</div>
<div style="color: #334155; font-size: 14px; line-height: 1.7;">When you have read-heavy workloads (many more reads than writes) and reads are long enough that the overhead of the more complex RWLock is justified. Examples: configuration caches (read constantly, updated rarely), in-memory databases with mostly SELECT queries, routing tables. For short critical sections or balanced read/write ratios, a simple mutex may actually be faster due to lower overhead.</div>
</div>

<div style="background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%); border-radius: 12px; padding: 20px; margin-left: 24px; margin-bottom: 16px; border: 1px solid #fde68a;">
<div style="color: #a16207; font-size: 15px; font-weight: 700; margin-bottom: 16px;">Level 2: Your RWLock-protected cache shows 99th percentile read latency of 500ms despite reads being fast (1ms). What's wrong?</div>

<div style="background: white; border-radius: 12px; padding: 16px; margin-bottom: 16px; border: 1px solid #fcd34d;">
<div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Expected Answer:</div>
<div style="color: #334155; font-size: 14px; line-height: 1.7;">
        Likely writer starvation causing reader starvation:<br/>
        1. <strong>Writer-preference lock + frequent writes:</strong> Each write request blocks new readers. If writes arrive at high rate, readers queue behind each writer.<br/>
        2. <strong>Long-running writer:</strong> A slow write (e.g., full cache refresh) blocks all readers for its duration.<br/><br/>
<strong>Diagnosis:</strong> Track lock acquisition wait times separately from operation time. Check writer frequency and duration. Monitor queue lengths for read vs write waiters.<br/><br/>
<strong>Solutions:</strong> (1) Switch to fair lock if writes are frequent. (2) Batch writes to reduce acquisition frequency. (3) Use copy-on-write: writers build new version, atomically swap pointer, readers never block.
</div>
</div>

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 20px; margin-left: 24px; border: 1px solid #fecaca;">
<div style="color: #991b1b; font-size: 14px; font-weight: 700; margin-bottom: 16px;">Level 3: Design a readers-writers solution that provides bounded wait times for both readers and writers, regardless of workload mix.</div>

<div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #f87171;">
<div style="color: #b91c1c; font-weight: 600; margin-bottom: 8px;">Expected Answer:</div>
<div style="color: #334155; font-size: 14px; line-height: 1.7;">
<strong>Phase-Fair RWLock:</strong><br/>
      Divide time into "read phases" and "write phases". During a read phase, only readers are admitted (up to a limit or time bound). Then switch to write phase where queued writers execute. This provides bounded wait: readers wait at most one write phase, writers wait at most one read phase.<br/><br/>

<strong>Ticket-Based Fairness:</strong><br/>
      Each request gets a ticket number. Service in ticket order, but batch consecutive readers together. Writer ticket N waits only for readers with tickets less than N. Provides FIFO guarantees while still allowing reader concurrency.<br/><br/>

<strong>Optimistic Concurrency (Best for Read-Heavy):</strong><br/>
      Readers proceed without locking using a sequence counter. Read start: save sequence. Read end: check if sequence changed (writer intervened). If changed, retry. Writers increment sequence before and after. Readers never block writers; worst case is reader retry. See [[seqlocks]](/topic/system-design/seqlocks).<br/><br/>

<strong>Trade-off:</strong> Phase-fair adds complexity and may reduce throughput vs simpler policies. Optimistic concurrency requires idempotent reads and has retry overhead under write contention.
</div>
</div>
</div>
</div>
</div>

---

## Mutex vs Semaphore

### Fundamental Differences

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">
<div style="color: #1e293b; font-size: 16px; font-weight: 700; margin-bottom: 20px; text-align: center;">Mutex vs Semaphore Comparison</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
<div style="background: #dbeafe; border-radius: 12px; padding: 20px; border: 2px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; font-size: 16px; margin-bottom: 16px; text-align: center;">Mutex (Mutual Exclusion)</div>
<div style="color: #334155; font-size: 13px; line-height: 1.8;">
<div style="margin-bottom: 8px;"><strong>State:</strong> Binary (locked/unlocked)</div>
<div style="margin-bottom: 8px;"><strong>Ownership:</strong> Yes. Only the locking thread can unlock.</div>
<div style="margin-bottom: 8px;"><strong>Semantics:</strong> Protects a critical section. Acquire-use-release pattern.</div>
<div style="margin-bottom: 8px;"><strong>Priority Inheritance:</strong> Supported (prevents priority inversion)</div>
<div><strong>Use Case:</strong> Protecting shared data from concurrent access</div>
</div>
</div>
<div style="background: #dcfce7; border-radius: 12px; padding: 20px; border: 2px solid #22c55e;">
<div style="color: #166534; font-weight: 700; font-size: 16px; margin-bottom: 16px; text-align: center;">Semaphore</div>
<div style="color: #334155; font-size: 13px; line-height: 1.8;">
<div style="margin-bottom: 8px;"><strong>State:</strong> Counter (0 to N)</div>
<div style="margin-bottom: 8px;"><strong>Ownership:</strong> No. Any thread can signal/wait.</div>
<div style="margin-bottom: 8px;"><strong>Semantics:</strong> Resource counting. P (wait/decrement) and V (signal/increment).</div>
<div style="margin-bottom: 8px;"><strong>Priority Inheritance:</strong> Not applicable (no ownership)</div>
<div><strong>Use Case:</strong> Limiting concurrent access, signaling between threads</div>
</div>
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #eab308;">
<div style="color: #a16207; font-weight: 700; margin-bottom: 8px;">Critical Distinction: Ownership</div>
<div style="color: #713f12; font-size: 14px; line-height: 1.7;">A mutex has an owner (the thread that locked it). This enables: (1) <strong>Recursive locking:</strong> Same thread can acquire multiple times without deadlock. (2) <strong>Priority inheritance:</strong> If high-priority thread waits for mutex held by low-priority thread, the holder's priority is boosted. (3) <strong>Debugging:</strong> Can identify which thread holds a contended lock. Semaphores have no owner, so none of these apply.</div>
</div>

### Binary Semaphore vs Mutex: A Common Misconception

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #fecaca;">
<div style="color: #991b1b; font-size: 16px; font-weight: 700; margin-bottom: 16px;">A Binary Semaphore is NOT a Mutex</div>

<div style="color: #7f1d1d; font-size: 14px; line-height: 1.7; margin-bottom: 16px;">
    A binary semaphore (count = 1) and mutex both provide mutual exclusion, but they differ semantically:
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #fca5a5;">
<div style="color: #b91c1c; font-weight: 600; margin-bottom: 8px;">Bug with Binary Semaphore</div>
<div style="font-family: 'Courier New', monospace; font-size: 11px; color: #1e293b; line-height: 1.6; background: #fef2f2; padding: 12px; border-radius: 8px;">
        sem = Semaphore(1)<br/><br/>
<span style="color: #64748b;">// Thread A</span><br/>
        sem.wait()<br/>
        critical_section()<br/>
<span style="color: #64748b;">// Forgets to signal!</span><br/><br/>
<span style="color: #64748b;">// Thread B accidentally</span><br/>
        sem.signal()&nbsp;<span style="color: #64748b;">// "Unlocks" for Thread A!</span>
</div>
</div>
<div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #86efac;">
<div style="color: #166534; font-weight: 600; margin-bottom: 8px;">Mutex Prevents This</div>
<div style="font-family: 'Courier New', monospace; font-size: 11px; color: #1e293b; line-height: 1.6; background: #f0fdf4; padding: 12px; border-radius: 8px;">
        mtx = Mutex()<br/><br/>
<span style="color: #64748b;">// Thread A</span><br/>
        mtx.lock()<br/>
        critical_section()<br/>
<span style="color: #64748b;">// Forgets to unlock!</span><br/><br/>
<span style="color: #64748b;">// Thread B</span><br/>
        mtx.unlock()&nbsp;<span style="color: #64748b;">// ERROR: Not owner!</span>
</div>
</div>
</div>
</div>

### Semaphore Use Cases

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
<div style="background: white; border-radius: 12px; padding: 20px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700; margin-bottom: 12px;">Resource Pool Limiting</div>
<div style="color: #334155; font-size: 13px; line-height: 1.6; margin-bottom: 12px;">
        Limit concurrent access to N identical resources (database connections, file handles).
</div>
<div style="font-family: 'Courier New', monospace; font-size: 11px; background: #f1f5f9; padding: 12px; border-radius: 8px;">
        pool_sem = Semaphore(MAX_CONNECTIONS)<br/>
        pool_sem.wait()&nbsp;&nbsp;<span style="color: #64748b;">// Blocks if pool empty</span><br/>
        conn = pool.get()<br/>
        use(conn)<br/>
        pool.release(conn)<br/>
        pool_sem.signal()
</div>
</div>
<div style="background: white; border-radius: 12px; padding: 20px; border-left: 4px solid #8b5cf6;">
<div style="color: #5b21b6; font-weight: 700; margin-bottom: 12px;">Event Signaling</div>
<div style="color: #334155; font-size: 13px; line-height: 1.6; margin-bottom: 12px;">
        One thread signals completion to another. No shared data, just coordination.
</div>
<div style="font-family: 'Courier New', monospace; font-size: 11px; background: #f1f5f9; padding: 12px; border-radius: 8px;">
        ready = Semaphore(0)<br/><br/>
<span style="color: #64748b;">// Producer</span><br/>
        prepare_data()<br/>
        ready.signal()<br/><br/>
<span style="color: #64748b;">// Consumer</span><br/>
        ready.wait()<br/>
        use_data()
</div>
</div>
</div>
</div>

### Mutex vs Semaphore Interview Questions (3-Level Deep)

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #bbf7d0;">
<div style="color: #166534; font-size: 16px; font-weight: 700; margin-bottom: 20px;">Level 1: When would you use a semaphore instead of a mutex?</div>

<div style="background: white; border-radius: 12px; padding: 16px; margin-bottom: 16px; border: 1px solid #86efac;">
<div style="color: #166534; font-weight: 600; margin-bottom: 8px;">Expected Answer:</div>
<div style="color: #334155; font-size: 14px; line-height: 1.7;">
      Use semaphore when: (1) You need to limit access to N resources (counting semaphore for connection pools). (2) You need signaling between threads without protecting shared data. (3) The thread that acquires doesn't need to be the one that releases.<br/><br/>
      Use mutex when: (1) Protecting a critical section with shared state. (2) You need ownership semantics (recursive locking, priority inheritance). (3) You want enforcement that only the holder can release.
</div>
</div>

<div style="background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%); border-radius: 12px; padding: 20px; margin-left: 24px; margin-bottom: 16px; border: 1px solid #fde68a;">
<div style="color: #a16207; font-size: 15px; font-weight: 700; margin-bottom: 16px;">Level 2: What is priority inversion and how do mutexes help?</div>

<div style="background: white; border-radius: 12px; padding: 16px; margin-bottom: 16px; border: 1px solid #fcd34d;">
<div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Expected Answer:</div>
<div style="color: #334155; font-size: 14px; line-height: 1.7;">
<strong>Priority inversion:</strong> High-priority thread H waits for mutex held by low-priority thread L. Medium-priority thread M preempts L. Now H is effectively blocked by M, inverting priorities. Famous case: Mars Pathfinder mission (1997) had system resets due to this.<br/><br/>
<strong>Solution: Priority Inheritance Protocol.</strong> When H blocks on mutex held by L, L temporarily inherits H's priority. L can't be preempted by M, finishes quickly, releases mutex, H proceeds. Requires ownership tracking (hence mutex, not semaphore).<br/><br/>
<strong>Alternative: Priority Ceiling Protocol.</strong> Each mutex has a ceiling (highest priority of any thread that might use it). Thread holding mutex runs at ceiling priority. Prevents priority inversion and deadlock but requires knowing all potential users upfront.
</div>
</div>

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 20px; margin-left: 24px; border: 1px solid #fecaca;">
<div style="color: #991b1b; font-size: 14px; font-weight: 700; margin-bottom: 16px;">Level 3: Design a rate limiter using semaphores that allows N requests per second with burst capability.</div>

<div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #f87171;">
<div style="color: #b91c1c; font-weight: 600; margin-bottom: 8px;">Expected Answer:</div>
<div style="color: #334155; font-size: 14px; line-height: 1.7;">
<strong>Token Bucket with Semaphore:</strong><br/>
      Initialize semaphore with burst capacity B. A refiller thread adds tokens at rate N/sec (signals semaphore) up to max B. Requests wait on semaphore.<br/><br/>

<strong>Implementation:</strong><br/>
<code>tokens = Semaphore(BURST_CAPACITY)</code><br/>
<code>refiller: every (1/N) seconds: if count < BURST: signal(tokens)</code><br/>
<code>request: tokens.wait(timeout); process(); // No need to signal back</code><br/><br/>

<strong>Edge cases:</strong><br/>
      1. <strong>Refiller precision:</strong> OS timer resolution limits rate accuracy. Batch refills (add 10 tokens every 10/N seconds) for better precision.<br/>
      2. <strong>Graceful degradation:</strong> Use timed wait so requests get "rejected" response rather than blocking forever.<br/>
      3. <strong>Distributed version:</strong> Replace semaphore with Redis INCR + TTL or distributed rate limiter. See [[rate-limiting]](/topic/system-design/rate-limiting).<br/><br/>

<strong>Why semaphore fits:</strong> Token "producer" (refiller) and "consumer" (requests) are different threads. No ownership needed. Counting semantics match token counting.
</div>
</div>
</div>
</div>
</div>

---

## Deadlock Prevention

### The Four Coffman Conditions

Deadlock requires ALL four conditions to hold simultaneously. Preventing any one condition prevents deadlock.

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #fecaca;">
<div style="color: #991b1b; font-size: 16px; font-weight: 700; margin-bottom: 20px; text-align: center;">The Four Coffman Conditions for Deadlock</div>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
<div style="background: white; border-radius: 12px; padding: 20px; border: 2px solid #f87171;">
<div style="color: #b91c1c; font-weight: 700; margin-bottom: 8px;">1. Mutual Exclusion</div>
<div style="color: #334155; font-size: 13px; line-height: 1.6; margin-bottom: 12px;">At least one resource must be held in non-shareable mode.</div>
<div style="background: #dcfce7; padding: 12px; border-radius: 8px;">
<div style="color: #166534; font-weight: 600; font-size: 12px;">Prevention:</div>
<div style="color: #14532d; font-size: 12px;">Make resources shareable where possible (readers-writers, copy-on-write).</div>
</div>
</div>
<div style="background: white; border-radius: 12px; padding: 20px; border: 2px solid #f87171;">
<div style="color: #b91c1c; font-weight: 700; margin-bottom: 8px;">2. Hold and Wait</div>
<div style="color: #334155; font-size: 13px; line-height: 1.6; margin-bottom: 12px;">Thread holds resources while waiting for additional resources.</div>
<div style="background: #dcfce7; padding: 12px; border-radius: 8px;">
<div style="color: #166534; font-weight: 600; font-size: 12px;">Prevention:</div>
<div style="color: #14532d; font-size: 12px;">Acquire all resources atomically upfront, or release held resources before requesting new ones.</div>
</div>
</div>
<div style="background: white; border-radius: 12px; padding: 20px; border: 2px solid #f87171;">
<div style="color: #b91c1c; font-weight: 700; margin-bottom: 8px;">3. No Preemption</div>
<div style="color: #334155; font-size: 13px; line-height: 1.6; margin-bottom: 12px;">Resources cannot be forcibly taken from threads holding them.</div>
<div style="background: #dcfce7; padding: 12px; border-radius: 8px;">
<div style="color: #166534; font-weight: 600; font-size: 12px;">Prevention:</div>
<div style="color: #14532d; font-size: 12px;">Allow preemption: if request fails, release all held resources and retry. Requires rollback capability.</div>
</div>
</div>
<div style="background: white; border-radius: 12px; padding: 20px; border: 2px solid #f87171;">
<div style="color: #b91c1c; font-weight: 700; margin-bottom: 8px;">4. Circular Wait</div>
<div style="color: #334155; font-size: 13px; line-height: 1.6; margin-bottom: 12px;">Circular chain of threads, each waiting for resource held by next.</div>
<div style="background: #dcfce7; padding: 12px; border-radius: 8px;">
<div style="color: #166534; font-weight: 600; font-size: 12px;">Prevention:</div>
<div style="color: #14532d; font-size: 12px;">Impose total ordering on resource acquisition. Always acquire in same order (e.g., by address, by ID).</div>
</div>
</div>
</div>
</div>

### Lock Ordering: The Most Common Prevention Strategy

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #bbf7d0;">
<div style="color: #166534; font-size: 16px; font-weight: 700; margin-bottom: 16px;">Establishing Lock Hierarchy</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
<div style="background: #fee2e2; border-radius: 12px; padding: 20px; border: 2px solid #fca5a5;">
<div style="color: #991b1b; font-weight: 700; margin-bottom: 12px;">Deadlock Prone</div>
<div style="font-family: 'Courier New', monospace; font-size: 11px; color: #1e293b; line-height: 1.8; background: white; padding: 12px; border-radius: 8px;">
<span style="color: #64748b;">// Thread 1</span><br/>
        lock(account_A)<br/>
        lock(account_B)&nbsp;&nbsp;<span style="color: #ef4444;">// Waits if Thread 2 holds B</span><br/>
        transfer(A, B)<br/>
        unlock(B); unlock(A)<br/><br/>
<span style="color: #64748b;">// Thread 2</span><br/>
        lock(account_B)<br/>
        lock(account_A)&nbsp;&nbsp;<span style="color: #ef4444;">// Waits if Thread 1 holds A</span><br/>
        transfer(B, A)<br/>
        unlock(A); unlock(B)
</div>
</div>
<div style="background: #dcfce7; border-radius: 12px; padding: 20px; border: 2px solid #86efac;">
<div style="color: #166534; font-weight: 700; margin-bottom: 12px;">Deadlock Free (Ordered)</div>
<div style="font-family: 'Courier New', monospace; font-size: 11px; color: #1e293b; line-height: 1.8; background: white; padding: 12px; border-radius: 8px;">
<span style="color: #64748b;">// Both threads use same order</span><br/>
<span style="color: #22c55e;">first = min(A.id, B.id)</span><br/>
<span style="color: #22c55e;">second = max(A.id, B.id)</span><br/><br/>
        lock(first)<br/>
        lock(second)<br/>
        transfer(from, to)<br/>
        unlock(second)<br/>
        unlock(first)
</div>
</div>
</div>

<div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #86efac;">
<div style="color: #166534; font-weight: 600; margin-bottom: 8px;">Implementation Strategies:</div>
<div style="color: #334155; font-size: 13px; line-height: 1.7;">
<strong>By ID:</strong> Sort resources by unique identifier. Works for any resource with comparable ID.<br/>
<strong>By Address:</strong> Use memory address as ordering key. Language-dependent (stable in C/C++, not Java).<br/>
<strong>By Hierarchy Level:</strong> Assign levels to lock types. Only acquire locks at higher levels than currently held.
</div>
</div>
</div>

### Timeout-Based Deadlock Avoidance

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">
<div style="color: #1e293b; font-size: 16px; font-weight: 700; margin-bottom: 16px;">Try-Lock with Backoff</div>

<div style="font-family: 'Courier New', monospace; font-size: 12px; color: #1e293b; line-height: 1.8; background: white; padding: 20px; border-radius: 12px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
<span style="color: #64748b;">// Acquire multiple locks without deadlock risk</span><br/>
    def acquire_locks(lock_a, lock_b, max_retries=10):<br/>
    &nbsp;&nbsp;for attempt in range(max_retries):<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;if lock_a.try_lock(timeout=50ms):<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if lock_b.try_lock(timeout=50ms):<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return True&nbsp;&nbsp;<span style="color: #64748b;">// Success!</span><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lock_a.unlock()&nbsp;&nbsp;<span style="color: #64748b;">// Release and retry</span><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #64748b;">// Exponential backoff with jitter</span><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;sleep(random(0, 2^attempt * 10ms))<br/>
    &nbsp;&nbsp;<br/>
    &nbsp;&nbsp;return False&nbsp;&nbsp;<span style="color: #64748b;">// Failed after retries</span>
</div>

<div style="background: #fef3c7; border-radius: 12px; padding: 16px; border: 1px solid #fcd34d;">
<div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Trade-offs:</div>
<div style="color: #78350f; font-size: 13px; line-height: 1.6;">
<strong>Pros:</strong> No global coordination needed. Works when lock order can't be predetermined.<br/>
<strong>Cons:</strong> Livelock risk (threads keep releasing and retrying forever). Wasted work if transaction rolled back. Timeout tuning is workload-dependent.
</div>
</div>
</div>

### Deadlock Detection and Recovery

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 2px solid #cbd5e1;">
<div style="color: #1e293b; font-size: 16px; font-weight: 700; margin-bottom: 16px;">Wait-For Graph (Runtime Detection)</div>
<div style="color: #475569; font-size: 14px; line-height: 1.7; margin-bottom: 16px;">
    Maintain a directed graph: edge from T1 to T2 if T1 waits for resource held by T2. Cycle in graph = deadlock.
</div>
<div style="display: flex; flex-wrap: wrap; gap: 16px;">
<div style="background: #eff6ff; border-radius: 12px; padding: 16px; border: 2px solid #3b82f6; flex: 1; min-width: 200px;">
<div style="color: #1e40af; font-weight: 600; margin-bottom: 8px;">Detection Algorithm</div>
<div style="color: #475569; font-size: 12px; line-height: 1.6;">
        Periodically run cycle detection (DFS). Frequency trade-off: too often wastes CPU, too rare delays recovery. Typical: every few seconds or on wait timeout.
</div>
</div>
<div style="background: #fef2f2; border-radius: 12px; padding: 16px; border: 2px solid #ef4444; flex: 1; min-width: 200px;">
<div style="color: #dc2626; font-weight: 600; margin-bottom: 8px;">Recovery Options</div>
<div style="color: #475569; font-size: 12px; line-height: 1.6;">
        1. <strong>Victim selection:</strong> Abort one thread in cycle (choose by age, priority, work done).<br/>
        2. <strong>Resource preemption:</strong> Forcibly take resource, rollback holder's transaction.<br/>
        3. <strong>Process termination:</strong> Kill deadlocked processes (last resort).
</div>
</div>
</div>
</div>

### Deadlock Prevention Interview Questions (3-Level Deep)

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #bbf7d0;">
<div style="color: #166534; font-size: 16px; font-weight: 700; margin-bottom: 20px;">Level 1: What is a deadlock and how do you prevent it?</div>

<div style="background: white; border-radius: 12px; padding: 16px; margin-bottom: 16px; border: 1px solid #86efac;">
<div style="color: #166534; font-weight: 600; margin-bottom: 8px;">Expected Answer:</div>
<div style="color: #334155; font-size: 14px; line-height: 1.7;">Deadlock is when two or more threads are permanently blocked, each waiting for a resource held by another. Classic example: Thread A holds Lock1 and waits for Lock2; Thread B holds Lock2 and waits for Lock1. Prevention: (1) Always acquire locks in a consistent global order. (2) Use timeouts with try-lock and backoff. (3) Acquire all needed locks atomically upfront. (4) Design to minimize lock requirements.</div>
</div>

<div style="background: linear-gradient(135deg, #fefce8 0%, #fef9c3 100%); border-radius: 12px; padding: 20px; margin-left: 24px; margin-bottom: 16px; border: 1px solid #fde68a;">
<div style="color: #a16207; font-size: 15px; font-weight: 700; margin-bottom: 16px;">Level 2: You've implemented lock ordering but still see occasional hangs. What could be wrong?</div>

<div style="background: white; border-radius: 12px; padding: 16px; margin-bottom: 16px; border: 1px solid #fcd34d;">
<div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Expected Answer:</div>
<div style="color: #334155; font-size: 14px; line-height: 1.7;">
<strong>Possible causes:</strong><br/>
        1. <strong>Incomplete ordering:</strong> Some code path acquires locks in different order. Use static analysis tools (e.g., ThreadSanitizer, Java's jstack) to detect.<br/>
        2. <strong>Hidden locks:</strong> Library code or callbacks acquire locks you don't control. Calling unknown code while holding lock is dangerous.<br/>
        3. <strong>Lock-order inversion via callbacks:</strong> Thread A: lock(X) -> callback -> lock(Y). Thread B: lock(Y) -> calls into A's code -> lock(X). Callback creates hidden dependency.<br/>
        4. <strong>Database deadlocks:</strong> Application-level ordering doesn't help if database rows are locked in different orders.<br/>
        5. <strong>Distributed deadlock:</strong> Lock ordering works within one process, but distributed locks across services need global coordination.<br/><br/>
<strong>Debugging:</strong> Get thread dumps during hang. Analyze wait-for relationships. Add lock acquisition logging with timestamps.
</div>
</div>

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 20px; margin-left: 24px; border: 1px solid #fecaca;">
<div style="color: #991b1b; font-size: 14px; font-weight: 700; margin-bottom: 16px;">Level 3: Design a distributed transaction system that prevents deadlocks across multiple database shards.</div>

<div style="background: white; border-radius: 12px; padding: 16px; border: 1px solid #f87171;">
<div style="color: #b91c1c; font-weight: 600; margin-bottom: 8px;">Expected Answer:</div>
<div style="color: #334155; font-size: 14px; line-height: 1.7;">
<strong>Option 1: Global Lock Ordering</strong><br/>
      Assign global IDs to all lockable resources across shards. Sort and acquire in ID order. Challenge: requires knowing all resources upfront, adds latency for sorted acquisition.<br/><br/>

<strong>Option 2: Wound-Wait or Wait-Die (Timestamp-Based)</strong><br/>
      Assign timestamps to transactions at start. When T1 wants lock held by T2:<br/>
      - <strong>Wound-Wait:</strong> If T1 older, wound (abort) T2. If T1 younger, T1 waits.<br/>
      - <strong>Wait-Die:</strong> If T1 older, T1 waits. If T1 younger, T1 dies (aborts).<br/>
      No cycles possible since younger transactions never wait for older ones. Used in Google Spanner.<br/><br/>

<strong>Option 3: Optimistic Concurrency Control</strong><br/>
      Don't acquire locks during transaction. At commit time, validate no conflicts. If conflict, abort and retry. No locks = no deadlocks. Works well for low-contention workloads. See [[distributed-transactions]](/topic/system-design/distributed-transactions).<br/><br/>

<strong>Option 4: Two-Phase Locking with Timeout</strong><br/>
      Standard 2PL but with lock timeout. On timeout, abort transaction and retry with exponential backoff. Simple but may cause high abort rates under contention.<br/><br/>

<strong>Trade-offs:</strong> Global ordering adds coordination latency. Timestamp methods may abort viable transactions. OCC has high abort rates under contention. Timeout wastes work on aborted transactions. Choice depends on workload: read-heavy favors OCC, write-heavy favors timestamp ordering.
</div>
</div>
</div>
</div>
</div>

---

## Code Implementation

### Production-Ready Thread Pool

```python
import threading
import queue
import time
import logging
from dataclasses import dataclass, field
from typing import Callable, Any, Optional, List, Dict
from contextlib import contextmanager
from enum import Enum
import random

logger = logging.getLogger(__name__)


class RejectionPolicy(Enum):
    """Policy when queue is full and max threads reached."""
    ABORT = "abort"           # Raise exception
    CALLER_RUNS = "caller"    # Execute in calling thread (backpressure)
    DISCARD = "discard"       # Silently drop
    DISCARD_OLDEST = "oldest" # Drop oldest in queue


@dataclass
class Task:
    """Represents a unit of work with metadata for observability."""
    func: Callable
    args: tuple = ()
    kwargs: dict = field(default_factory=dict)
    callback: Optional[Callable[[Any], None]] = None
    error_callback: Optional[Callable[[Exception], None]] = None
    priority: int = 0
    created_at: float = field(default_factory=time.time)
    task_id: str = field(default_factory=lambda: f"task-{random.randint(0, 999999):06d}")

    def __lt__(self, other: 'Task') -> bool:
        # Lower priority number = higher priority
        # Tie-break by creation time (FIFO within same priority)
        if self.priority != other.priority:
            return self.priority < other.priority
        return self.created_at < other.created_at


class ThreadPoolMetrics:
    """Thread-safe metrics collection for the pool."""

    def __init__(self):
        self._lock = threading.Lock()
        self.tasks_submitted = 0
        self.tasks_completed = 0
        self.tasks_failed = 0
        self.tasks_rejected = 0
        self.total_wait_time_ms = 0.0
        self.total_execution_time_ms = 0.0

    def record_submission(self):
        with self._lock:
            self.tasks_submitted += 1

    def record_completion(self, wait_ms: float, exec_ms: float):
        with self._lock:
            self.tasks_completed += 1
            self.total_wait_time_ms += wait_ms
            self.total_execution_time_ms += exec_ms

    def record_failure(self):
        with self._lock:
            self.tasks_failed += 1

    def record_rejection(self):
        with self._lock:
            self.tasks_rejected += 1

    def snapshot(self) -> Dict[str, Any]:
        with self._lock:
            avg_wait = (self.total_wait_time_ms / self.tasks_completed
                       if self.tasks_completed > 0 else 0)
            avg_exec = (self.total_execution_time_ms / self.tasks_completed
                       if self.tasks_completed > 0 else 0)
            return {
                "tasks_submitted": self.tasks_submitted,
                "tasks_completed": self.tasks_completed,
                "tasks_failed": self.tasks_failed,
                "tasks_rejected": self.tasks_rejected,
                "avg_wait_time_ms": round(avg_wait, 2),
                "avg_execution_time_ms": round(avg_exec, 2),
            }


class ThreadPool:
    """
    Production-ready thread pool with:
    - Priority queue with configurable capacity
    - Graceful shutdown with timeout
    - Comprehensive metrics
    - Configurable rejection policies
    - Auto-scaling between min and max workers
    """

    def __init__(
        self,
        name: str = "pool",
        min_workers: int = 2,
        max_workers: int = 10,
        queue_size: int = 1000,
        rejection_policy: RejectionPolicy = RejectionPolicy.ABORT,
        idle_timeout_seconds: float = 60.0
    ):
        if min_workers < 1:
            raise ValueError("min_workers must be >= 1")
        if max_workers < min_workers:
            raise ValueError("max_workers must be >= min_workers")

        self.name = name
        self.min_workers = min_workers
        self.max_workers = max_workers
        self.rejection_policy = rejection_policy
        self.idle_timeout = idle_timeout_seconds

        # Use PriorityQueue for task ordering
        self._task_queue: queue.PriorityQueue = queue.PriorityQueue(maxsize=queue_size)
        self._workers: List[threading.Thread] = []
        self._active_count = 0
        self._active_lock = threading.Lock()

        self._shutdown_event = threading.Event()
        self._pool_lock = threading.Lock()

        self.metrics = ThreadPoolMetrics()

        # Start minimum workers
        for i in range(min_workers):
            self._spawn_worker(core=True)

        logger.info(f"ThreadPool '{name}' started with {min_workers} workers")

    def _spawn_worker(self, core: bool = False):
        """Spawn a new worker thread."""
        worker_id = len(self._workers)
        worker = threading.Thread(
            target=self._worker_loop,
            args=(worker_id, core),
            daemon=True,
            name=f"{self.name}-worker-{worker_id}"
        )
        self._workers.append(worker)
        worker.start()

    def _worker_loop(self, worker_id: int, is_core: bool):
        """
        Main worker loop. Core workers never terminate;
        non-core workers terminate after idle timeout.
        """
        idle_since: Optional[float] = None

        while not self._shutdown_event.is_set():
            try:
                # Shorter timeout for non-core workers to check idle status
                timeout = 1.0 if is_core else min(1.0, self.idle_timeout / 10)
                priority, task = self._task_queue.get(timeout=timeout)
                idle_since = None  # Reset idle timer

            except queue.Empty:
                # Check if non-core worker should terminate
                if not is_core:
                    if idle_since is None:
                        idle_since = time.time()
                    elif time.time() - idle_since > self.idle_timeout:
                        logger.debug(f"Worker {worker_id} terminating due to idle timeout")
                        return
                continue

            # Track timing
            wait_time_ms = (time.time() - task.created_at) * 1000
            exec_start = time.time()

            with self._active_lock:
                self._active_count += 1

            try:
                result = task.func(*task.args, **task.kwargs)
                exec_time_ms = (time.time() - exec_start) * 1000
                self.metrics.record_completion(wait_time_ms, exec_time_ms)

                if task.callback:
                    try:
                        task.callback(result)
                    except Exception as cb_err:
                        logger.error(f"Callback error for {task.task_id}: {cb_err}")

            except Exception as e:
                self.metrics.record_failure()
                logger.error(f"Task {task.task_id} failed: {e}", exc_info=True)

                if task.error_callback:
                    try:
                        task.error_callback(e)
                    except Exception as cb_err:
                        logger.error(f"Error callback failed: {cb_err}")
            finally:
                with self._active_lock:
                    self._active_count -= 1
                self._task_queue.task_done()

    def submit(
        self,
        func: Callable,
        *args,
        priority: int = 0,
        callback: Optional[Callable[[Any], None]] = None,
        error_callback: Optional[Callable[[Exception], None]] = None,
        **kwargs
    ) -> Optional[str]:
        """
        Submit a task to the pool.
        Returns task_id if queued, None if rejected.
        Raises RuntimeError if pool is shutdown.
        """
        if self._shutdown_event.is_set():
            raise RuntimeError(f"ThreadPool '{self.name}' is shut down")

        task = Task(
            func=func,
            args=args,
            kwargs=kwargs,
            callback=callback,
            error_callback=error_callback,
            priority=priority
        )

        # Try to queue the task
        try:
            self._task_queue.put_nowait((priority, task))
            self.metrics.record_submission()

            # Consider scaling up
            self._maybe_scale_up()

            return task.task_id

        except queue.Full:
            return self._handle_rejection(task)

    def _maybe_scale_up(self):
        """Spawn additional worker if needed and allowed."""
        with self._pool_lock:
            queue_depth = self._task_queue.qsize()
            worker_count = len([w for w in self._workers if w.is_alive()])

            # Scale up if queue is building and we haven't hit max
            if queue_depth > worker_count and worker_count < self.max_workers:
                self._spawn_worker(core=False)
                logger.debug(f"Scaled up to {worker_count + 1} workers")

    def _handle_rejection(self, task: Task) -> Optional[str]:
        """Handle task when queue is full."""
        self.metrics.record_rejection()

        if self.rejection_policy == RejectionPolicy.ABORT:
            raise queue.Full(f"Task queue full, task {task.task_id} rejected")

        elif self.rejection_policy == RejectionPolicy.CALLER_RUNS:
            # Execute in calling thread - provides natural backpressure
            logger.warning(f"Queue full, executing {task.task_id} in caller thread")
            try:
                result = task.func(*task.args, **task.kwargs)
                if task.callback:
                    task.callback(result)
            except Exception as e:
                if task.error_callback:
                    task.error_callback(e)
            return task.task_id

        elif self.rejection_policy == RejectionPolicy.DISCARD:
            logger.warning(f"Discarding task {task.task_id} due to full queue")
            return None

        elif self.rejection_policy == RejectionPolicy.DISCARD_OLDEST:
            try:
                _, oldest = self._task_queue.get_nowait()
                logger.warning(f"Discarding oldest task {oldest.task_id}")
                self._task_queue.put_nowait((task.priority, task))
                return task.task_id
            except queue.Empty:
                return None

        return None

    def get_stats(self) -> Dict[str, Any]:
        """Get current pool statistics."""
        with self._active_lock:
            active = self._active_count

        alive_workers = len([w for w in self._workers if w.is_alive()])

        return {
            "name": self.name,
            "workers_alive": alive_workers,
            "workers_active": active,
            "workers_idle": alive_workers - active,
            "queue_depth": self._task_queue.qsize(),
            "shutdown": self._shutdown_event.is_set(),
            **self.metrics.snapshot()
        }

    def shutdown(self, wait: bool = True, timeout: float = 30.0):
        """
        Initiate graceful shutdown.
        If wait=True, blocks until workers finish or timeout expires.
        """
        logger.info(f"Shutting down ThreadPool '{self.name}'...")
        self._shutdown_event.set()

        if wait:
            deadline = time.time() + timeout
            for worker in self._workers:
                remaining = max(0, deadline - time.time())
                worker.join(timeout=remaining)
                if worker.is_alive():
                    logger.warning(f"Worker {worker.name} did not terminate in time")

        logger.info(f"ThreadPool '{self.name}' shutdown complete")


class ReadWriteLock:
    """
    Readers-writers lock with writer preference.
    Multiple readers can hold the lock simultaneously.
    Writers get exclusive access and priority over waiting readers.
    """

    def __init__(self):
        self._lock = threading.Lock()
        self._readers_ok = threading.Condition(self._lock)
        self._writers_ok = threading.Condition(self._lock)

        self._readers = 0
        self._writers_waiting = 0
        self._writer_active = False

    @contextmanager
    def read_lock(self):
        """Acquire read lock (shared access)."""
        with self._lock:
            # Wait if writer is active or writers are waiting (writer preference)
            while self._writer_active or self._writers_waiting > 0:
                self._readers_ok.wait()
            self._readers += 1

        try:
            yield
        finally:
            with self._lock:
                self._readers -= 1
                # If last reader and writers waiting, signal one writer
                if self._readers == 0 and self._writers_waiting > 0:
                    self._writers_ok.notify()

    @contextmanager
    def write_lock(self):
        """Acquire write lock (exclusive access)."""
        with self._lock:
            self._writers_waiting += 1
            try:
                # Wait until no readers and no active writer
                while self._readers > 0 or self._writer_active:
                    self._writers_ok.wait()
                self._writer_active = True
            finally:
                self._writers_waiting -= 1

        try:
            yield
        finally:
            with self._lock:
                self._writer_active = False
                # Prefer writers; if none waiting, wake all readers
                if self._writers_waiting > 0:
                    self._writers_ok.notify()
                else:
                    self._readers_ok.notify_all()


class BoundedSemaphore:
    """
    Counting semaphore with upper bound.
    Useful for resource pools where you want to detect over-release bugs.
    """

    def __init__(self, value: int):
        if value < 0:
            raise ValueError("Semaphore value must be >= 0")
        self._value = value
        self._max_value = value
        self._lock = threading.Lock()
        self._not_zero = threading.Condition(self._lock)

    def acquire(self, blocking: bool = True, timeout: Optional[float] = None) -> bool:
        """
        Acquire the semaphore (decrement counter).
        Returns True if acquired, False if timeout expired.
        """
        with self._not_zero:
            if not blocking:
                if self._value <= 0:
                    return False
                self._value -= 1
                return True

            deadline = time.time() + timeout if timeout else None

            while self._value <= 0:
                remaining = None
                if deadline:
                    remaining = deadline - time.time()
                    if remaining <= 0:
                        return False

                if not self._not_zero.wait(timeout=remaining):
                    return False  # Timeout

            self._value -= 1
            return True

    def release(self):
        """
        Release the semaphore (increment counter).
        Raises ValueError if releasing would exceed initial value.
        """
        with self._not_zero:
            if self._value >= self._max_value:
                raise ValueError("Semaphore released too many times")
            self._value += 1
            self._not_zero.notify()

    @property
    def available(self) -> int:
        with self._lock:
            return self._value

    def __enter__(self):
        self.acquire()
        return self

    def __exit__(self, *args):
        self.release()


def acquire_locks_safely(*locks, timeout: float = 5.0, max_retries: int = 10) -> bool:
    """
    Acquire multiple locks without deadlock using timeout and backoff.

    Args:
        *locks: Locks to acquire (must support acquire(timeout=...))
        timeout: Timeout for each lock acquisition attempt
        max_retries: Maximum retry attempts

    Returns:
        True if all locks acquired, False otherwise.
        Caller must release locks if True is returned.
    """
    acquired = []

    for attempt in range(max_retries):
        acquired.clear()
        success = True

        for lock in locks:
            if hasattr(lock, 'acquire'):
                if lock.acquire(timeout=timeout / len(locks)):
                    acquired.append(lock)
                else:
                    success = False
                    break
            else:
                # Assume it's a context manager style lock
                raise TypeError(f"Lock {lock} doesn't support timeout-based acquire")

        if success:
            return True

        # Release any acquired locks
        for lock in reversed(acquired):
            lock.release()

        # Exponential backoff with jitter
        backoff = min(1.0, (2 ** attempt) * 0.01)
        jitter = random.uniform(0, backoff)
        time.sleep(backoff + jitter)

    return False


# === Usage Examples ===

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)

    # Thread pool example
    pool = ThreadPool(
        name="example",
        min_workers=2,
        max_workers=8,
        queue_size=100,
        rejection_policy=RejectionPolicy.CALLER_RUNS
    )

    def work(x):
        time.sleep(0.1)
        return x * 2

    results = []

    for i in range(20):
        pool.submit(
            work, i,
            callback=lambda r: results.append(r),
            priority=i % 3  # Mix of priorities
        )

    time.sleep(3)
    print(f"Results: {sorted(results)}")
    print(f"Stats: {pool.get_stats()}")
    pool.shutdown()

    # ReadWriteLock example
    rwlock = ReadWriteLock()
    shared_data = {"value": 0}

    def reader(reader_id):
        with rwlock.read_lock():
            print(f"Reader {reader_id} sees: {shared_data['value']}")
            time.sleep(0.1)

    def writer(writer_id, new_value):
        with rwlock.write_lock():
            shared_data['value'] = new_value
            print(f"Writer {writer_id} set: {new_value}")
            time.sleep(0.2)

    threads = []
    for i in range(5):
        threads.append(threading.Thread(target=reader, args=(i,)))
    threads.append(threading.Thread(target=writer, args=(0, 42)))
    for i in range(5, 8):
        threads.append(threading.Thread(target=reader, args=(i,)))

    for t in threads:
        t.start()
    for t in threads:
        t.join()
```

---

## Quick Reference Card

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 2px solid #cbd5e1;">
<div style="color: #1e293b; font-size: 18px; font-weight: 700; margin-bottom: 20px; text-align: center;">Concurrency Patterns Cheat Sheet</div>

<div style="display: flex; flex-wrap: wrap; gap: 16px;">
<div style="background: #eff6ff; border-radius: 12px; padding: 16px; border: 2px solid #3b82f6; flex: 1; min-width: 200px;">
<div style="color: #1e40af; font-weight: 700; margin-bottom: 12px;">Thread Pool Sizing</div>
<div style="color: #475569; font-size: 12px; line-height: 1.8;">
<strong>CPU-bound:</strong> N = cores + 1<br/>
<strong>I/O-bound:</strong> N = cores x (1 + W/C)<br/>
<strong>Mixed:</strong> Separate pools or managed blocking<br/>
<strong>Start:</strong> 2x cores, then benchmark
</div>
</div>
<div style="background: #f0fdf4; border-radius: 12px; padding: 16px; border: 2px solid #22c55e; flex: 1; min-width: 200px;">
<div style="color: #166534; font-weight: 700; margin-bottom: 12px;">Deadlock Prevention</div>
<div style="color: #475569; font-size: 12px; line-height: 1.8;">
        1. Lock ordering (by ID/address)<br/>
        2. Timeout + exponential backoff<br/>
        3. Lock hierarchy levels<br/>
        4. Acquire all upfront or none
</div>
</div>
<div style="background: #fff7ed; border-radius: 12px; padding: 16px; border: 2px solid #f97316; flex: 1; min-width: 200px;">
<div style="color: #c2410c; font-weight: 700; margin-bottom: 12px;">When to Use What</div>
<div style="color: #475569; font-size: 12px; line-height: 1.8;">
<strong>Mutex:</strong> Protecting shared state<br/>
<strong>Semaphore:</strong> Resource counting, signaling<br/>
<strong>RWLock:</strong> Read-heavy, long reads<br/>
<strong>Condition:</strong> Wait for state change
</div>
</div>
<div style="background: #f5f3ff; border-radius: 12px; padding: 16px; border: 2px solid #8b5cf6; flex: 1; min-width: 200px;">
<div style="color: #5b21b6; font-weight: 700; margin-bottom: 12px;">Common Pitfalls</div>
<div style="color: #475569; font-size: 12px; line-height: 1.8;">
        - if instead of while (spurious wakeup)<br/>
        - Unbounded queue = OOM risk<br/>
        - Calling unknown code holding lock<br/>
        - Binary semaphore != mutex
</div>
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">
<div style="color: #1e293b; font-size: 16px; font-weight: 700; margin-bottom: 16px;">Coffman Conditions Summary</div>
<table style="width: 100%; border-collapse: collapse; font-size: 13px;">
<tr style="background: #e2e8f0;">
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Condition</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Description</th>
<th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Prevention</th>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; font-weight: 600;">Mutual Exclusion</td>
<td style="padding: 12px;">Resource held exclusively</td>
<td style="padding: 12px;">Make shareable (RWLock, COW)</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; font-weight: 600;">Hold and Wait</td>
<td style="padding: 12px;">Hold while waiting for more</td>
<td style="padding: 12px;">Acquire all or none upfront</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 12px; font-weight: 600;">No Preemption</td>
<td style="padding: 12px;">Can't forcibly take resource</td>
<td style="padding: 12px;">Release on failure, retry</td>
</tr>
<tr>
<td style="padding: 12px; font-weight: 600;">Circular Wait</td>
<td style="padding: 12px;">Cycle in wait graph</td>
<td style="padding: 12px;">Total ordering on acquisition</td>
</tr>
</table>
</div>

---

## Related Topics

- [[distributed-locking]](/topic/system-design/distributed-locking) - Coordination across processes and machines
- [[message-queues]](/topic/system-design/message-queues) - Asynchronous producer-consumer at scale
- [[rate-limiting]](/topic/system-design/rate-limiting) - Controlling throughput with token buckets and semaphores
- [[connection-pooling]](/topic/system-design/connection-pooling) - Resource pool management
- [[bulkhead-pattern]](/topic/system-design/bulkhead-pattern) - Isolation to prevent cascade failures
- [[distributed-transactions]](/topic/system-design/distributed-transactions) - Coordinating transactions across services
