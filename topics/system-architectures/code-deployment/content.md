# Code Deployment Systems

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #58a6ff;">

**Code deployment** is the process of releasing software changes from development to production environments. Modern deployment systems must balance speed (deploying frequently) with safety (avoiding outages), while providing mechanisms for rapid recovery when failures occur.

This document covers the internal mechanisms, design trade-offs, and real-world implications of deployment strategies that are critical for system design interviews.

</div>

---

## Section 1: CI/CD Pipelines

### Core Mechanism

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">

**Continuous Integration (CI)** automates the building, testing, and validation of code changes. **Continuous Deployment (CD)** extends this to automatically deploy validated changes to production environments.

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 20px; margin: 16px 0;">

**Internal Architecture of a CI/CD Pipeline**

<div style="display: flex; flex-direction: column; gap: 12px; margin: 16px 0;">

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #238636; color: white; padding: 12px 20px; border-radius: 8px; font-weight: bold; min-width: 140px; text-align: center;">Source Trigger</div>
<div style="color: #8b949e; font-size: 13px;">Git webhook fires on push/merge. Controller validates signature, extracts commit SHA, branch, and author metadata.</div>
</div>

<div style="display: flex; justify-content: center;"><div style="width: 2px; height: 20px; background: #30363d;"></div></div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #1f6feb; color: white; padding: 12px 20px; border-radius: 8px; font-weight: bold; min-width: 140px; text-align: center;">Pipeline Parser</div>
<div style="color: #8b949e; font-size: 13px;">Reads pipeline definition (YAML/JSON), builds Directed Acyclic Graph (DAG) of stages, resolves variable interpolation.</div>
</div>

<div style="display: flex; justify-content: center;"><div style="width: 2px; height: 20px; background: #30363d;"></div></div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #8957e5; color: white; padding: 12px 20px; border-radius: 8px; font-weight: bold; min-width: 140px; text-align: center;">Job Scheduler</div>
<div style="color: #8b949e; font-size: 13px;">Topologically sorts DAG, queues ready jobs. Handles parallelism constraints, resource requests, and agent affinity rules.</div>
</div>

<div style="display: flex; justify-content: center;"><div style="width: 2px; height: 20px; background: #30363d;"></div></div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #f0883e; color: white; padding: 12px 20px; border-radius: 8px; font-weight: bold; min-width: 140px; text-align: center;">Build Agent</div>
<div style="color: #8b949e; font-size: 13px;">Ephemeral container/VM claims job from queue. Clones repo, restores cache, executes steps, streams logs, uploads artifacts.</div>
</div>

<div style="display: flex; justify-content: center;"><div style="width: 2px; height: 20px; background: #30363d;"></div></div>

<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #da3633; color: white; padding: 12px 20px; border-radius: 8px; font-weight: bold; min-width: 140px; text-align: center;">Result Handler</div>
<div style="color: #8b949e; font-size: 13px;">Updates pipeline state, triggers downstream jobs or deployment. Posts status to SCM, sends notifications.</div>
</div>

</div>

</div>

</div>

### Key Design Decisions

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #58a6ff; margin: 0 0 12px 0;">Pipeline as Code vs. UI Configuration</h4>

**Assumption**: Developers prefer version-controlled, reviewable configuration over GUI-based setup.

**Trade-off**: Pipeline-as-code provides auditability and reproducibility but has a steeper learning curve. UI configuration is faster for simple cases but creates "snowflake" pipelines that are hard to replicate.

**Design Choice**: Most modern systems use YAML/JSON files in the repository root, enabling pipeline changes to go through the same review process as code changes.

</div>

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #a371f7; margin: 0 0 12px 0;">Ephemeral vs. Persistent Build Agents</h4>

**Assumption**: Build isolation is more important than startup time for most workloads.

**Trade-off**: Ephemeral agents guarantee clean environments but incur startup overhead (10-60 seconds). Persistent agents are faster but risk cross-build contamination and state drift.

**Design Choice**: Production systems typically use ephemeral containers with aggressive caching layers to minimize cold-start penalty while maintaining isolation.

</div>

<div style="background: linear-gradient(135deg, #3d2e1f 0%, #5d4a3a 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #f0883e; margin: 0 0 12px 0;">Push vs. Pull Execution Model</h4>

**Assumption**: Build agents may be behind firewalls or in private networks.

**Trade-off**: Push model (controller sends jobs) requires network access to agents. Pull model (agents poll for work) allows agents in isolated networks but adds latency.

**Design Choice**: Most enterprise systems use pull-based models where agents long-poll a central queue, enabling hybrid cloud/on-premise agent pools.

</div>

<div style="background: linear-gradient(135deg, #1f3d2d 0%, #3a5d4a 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #7ee787; margin: 0 0 12px 0;">Monolithic vs. Stage-based Caching</h4>

**Assumption**: Dependency installation is the dominant time cost in most builds.

**Trade-off**: Monolithic cache (one big tarball) is simpler but invalidates entirely on any change. Layer-based caching (like Docker) enables fine-grained reuse but adds complexity.

**Design Choice**: Modern CI systems use content-addressable caching keyed on lockfile hashes, providing deterministic cache hits while avoiding stale dependencies.

</div>

</div>

### Edge Cases and Failure Modes

<div style="background: linear-gradient(135deg, #3d1f1f 0%, #5d3a3a 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #f85149;">

**Webhook Replay Attacks**: Malicious actors can capture and replay webhook payloads. Mitigation: Validate webhook signatures using HMAC-SHA256, include timestamp in signature, reject payloads older than 5 minutes.

**Cache Poisoning**: A compromised build could inject malicious artifacts into shared cache. Mitigation: Content-addressable storage (cache key includes hash of contents), separate cache namespaces per branch.

**Secret Exfiltration**: Build scripts could attempt to exfiltrate secrets. Mitigation: Mask secrets in logs, use short-lived credentials, restrict secret access to specific pipeline stages.

**DAG Cycles**: Circular dependencies in pipeline definition cause infinite scheduling loops. Mitigation: Validate DAG structure at parse time using Kahn's algorithm, reject cycles with clear error messages.

**Zombie Jobs**: Agent crashes mid-execution, leaving job in "running" state forever. Mitigation: Heartbeat mechanism with timeout, automatic job requeue after configurable TTL.

</div>

### 3-Level Interview Questions: CI/CD Pipelines

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f0883e;">

#### Level 1: "Explain how a CI/CD pipeline works internally."

**What they're probing**: Basic understanding of build automation concepts.

**Strong Answer**: "When code is pushed to a repository, a webhook notifies the CI server with the commit details. The server parses the pipeline configuration file to build a DAG of stages and jobs. A scheduler assigns jobs to available build agents based on resource requirements and dependencies. Each agent executes in an isolated environment, running the defined steps, streaming logs back to the server, and uploading artifacts on completion. The pipeline controller tracks state transitions and triggers downstream jobs when dependencies complete successfully."

---

#### Level 2: "How would you handle a scenario where pipeline execution order matters but you want maximum parallelism?"

**What they're probing**: Understanding of DAG scheduling and dependency management.

**Strong Answer**: "This is fundamentally a topological sort problem with parallelism optimization. I'd model the pipeline as a DAG where edges represent dependencies. At any point, all jobs with satisfied dependencies (no incoming edges from incomplete jobs) can run in parallel. The key insight is distinguishing between hard dependencies (job B needs artifact from job A) versus soft dependencies (job B should run after job A for resource reasons). For hard dependencies, the scheduler tracks artifact availability. For soft dependencies, I'd use priority queues with weights based on critical path analysis - prioritizing jobs that unblock the most downstream work."

**Follow-up considerations**:
- How do you handle diamond dependencies (A->B, A->C, B->D, C->D)?
- What happens if a parallelizable job fails - do you cancel siblings or let them complete?

---

#### Level 3: "Your CI system processes 100,000 builds/day across 500 repositories. Some pipelines take 2 hours. Design the job scheduling system to minimize queue wait time while ensuring fairness."

**What they're probing**: Distributed systems thinking, fairness algorithms, resource management at scale.

**Strong Answer**: "This requires a multi-level scheduling approach. First, I'd implement fair-share scheduling at the repository level using a weighted fair queue - each repo gets a quota proportional to its historical usage, preventing one team from monopolizing agents. Within each repo's allocation, jobs are prioritized by: (1) main branch builds over feature branches, (2) smaller estimated duration (using historical p50 as predictor), (3) queue arrival time as tiebreaker.

For long-running builds, I'd implement preemption with checkpointing - a 2-hour build blocking an agent can be suspended (state serialized to S3) when higher-priority work arrives. The key metric is weighted response time: sum of (wait_time + execution_time) weighted by job priority.

I'd also implement agent affinity with cache warming - builds from the same repo prefer agents that recently built that repo (hot cache). But affinity is soft - we'd rather run on a cold agent than wait more than 2 minutes for the preferred one.

Finally, autoscaling: monitor queue depth and wait times, scale agents up when average wait exceeds SLA (say, 30 seconds for high-priority, 5 minutes for low), scale down when agents are idle for more than cost threshold (typically 10-15 minutes for spot instances)."

**Critical edge cases to mention**:
- Starvation prevention: even low-priority jobs must eventually run (aging mechanism)
- Head-of-line blocking: one slow repo shouldn't block the shared queue
- Resource heterogeneity: some jobs need GPUs, some need ARM architecture

</div>

---

## Section 2: Blue-Green Deployments

### Core Mechanism

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">

**Blue-green deployment** maintains two identical production environments. At any time, one (e.g., "blue") serves live traffic while the other ("green") is idle or receiving new deployments. Releases happen by deploying to the idle environment and then switching traffic atomically.

<div style="background: rgba(31, 111, 235, 0.1); border: 1px solid #1f6feb; border-radius: 12px; padding: 20px; margin: 16px 0;">

**Blue-Green Traffic Switching Mechanism**

<div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 20px; margin: 16px 0; align-items: center;">

<div style="background: #1f6feb; border-radius: 12px; padding: 20px; text-align: center;">
<div style="color: white; font-weight: bold; font-size: 18px; margin-bottom: 8px;">BLUE Environment</div>
<div style="color: rgba(255,255,255,0.8); font-size: 13px;">Version 1.4.2</div>
<div style="background: #238636; color: white; padding: 4px 12px; border-radius: 4px; display: inline-block; margin-top: 8px; font-size: 12px;">LIVE TRAFFIC</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="background: #30363d; color: #8b949e; padding: 12px; border-radius: 8px; text-align: center; font-size: 12px;">
<div style="font-weight: bold; margin-bottom: 4px;">Load Balancer</div>
<div>DNS / L7 Proxy</div>
</div>
<div style="color: #f0883e; font-size: 24px;">&#8644;</div>
<div style="color: #8b949e; font-size: 11px; text-align: center;">Atomic switch<br/>via config update</div>
</div>

<div style="background: #238636; border-radius: 12px; padding: 20px; text-align: center;">
<div style="color: white; font-weight: bold; font-size: 18px; margin-bottom: 8px;">GREEN Environment</div>
<div style="color: rgba(255,255,255,0.8); font-size: 13px;">Version 1.5.0</div>
<div style="background: #f0883e; color: white; padding: 4px 12px; border-radius: 4px; display: inline-block; margin-top: 8px; font-size: 12px;">STAGED (IDLE)</div>
</div>

</div>

**Switching Mechanisms** (in order of switch speed):
1. **DNS-based**: Update DNS record to point to green's IP. Slow (TTL propagation: seconds to hours). Risk: some clients cache aggressively.
2. **Load balancer config**: Update LB backend pool. Fast (sub-second). Requires LB API or config reload.
3. **Service mesh routing**: Update virtual service weights. Instant. Requires Istio/Linkerd/similar.
4. **Kubernetes Service selector**: Change label selector to match green pods. Instant within cluster.

</div>

</div>

### Key Design Decisions

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 20px; margin: 20px 0;">

<h4 style="color: #58a6ff; margin: 0 0 16px 0;">The Database Problem in Blue-Green</h4>

**The fundamental challenge**: Both blue and green environments typically share a database. If green's code requires schema changes, blue (running old code) may break when the schema changes, and rolling back becomes impossible.

**Solutions with trade-offs**:

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 16px 0;">

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 8px; padding: 16px;">
<h5 style="color: #7ee787; margin: 0 0 8px 0;">Expand-Contract Migrations</h5>
<div style="color: #c9d1d9; font-size: 13px;">
Phase 1: Add new column (nullable), deploy code that writes to both.
Phase 2: Backfill old data to new column.
Phase 3: Deploy code reading from new column.
Phase 4: Drop old column.

**Trade-off**: Safe but slow - requires 4 deployments for one schema change.
</div>
</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 8px; padding: 16px;">
<h5 style="color: #f0883e; margin: 0 0 8px 0;">Separate Databases</h5>
<div style="color: #c9d1d9; font-size: 13px;">
Blue and green each have their own database. Data sync via CDC (Change Data Capture) or event sourcing.

**Trade-off**: True isolation but introduces replication lag and consistency challenges. Works well for eventually consistent systems, poorly for strong consistency needs.
</div>
</div>

</div>

**Design Choice**: Most teams use expand-contract for relational databases and accept the deployment overhead. For new systems, [[event-sourcing]](/topics/system-architectures/event-sourcing) patterns avoid this problem entirely by separating command and query models.

</div>

### Edge Cases and Failure Modes

<div style="background: linear-gradient(135deg, #3d1f1f 0%, #5d3a3a 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #f85149;">

**Session Affinity Breaking**: Users with sticky sessions to blue suddenly get routed to green mid-session. Mitigation: Externalize session state to [[distributed-cache]](/topics/system-architectures/caching) (Redis), or implement graceful session migration.

**In-Flight Request Failure**: Requests initiated before switch may complete after switch, hitting wrong environment. Mitigation: Connection draining - blue continues serving existing connections for grace period while green handles new connections.

**Green Environment Drift**: Idle green environment has stale container images, expired certificates, or failed health checks. Mitigation: Continuous health checks on idle environment, periodic synthetic traffic, automated certificate renewal.

**Rollback After Data Migration**: Green writes data in new format, rollback to blue can't read it. Mitigation: All schema changes must be backward-compatible for at least one release cycle.

**Cost Explosion**: Maintaining 2x infrastructure permanently doubles compute costs. Mitigation: Use for stateless web tier only, consider canary for non-critical services, scale down idle environment to minimum replicas.

</div>

### 3-Level Interview Questions: Blue-Green Deployments

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f0883e;">

#### Level 1: "What is blue-green deployment and when would you use it?"

**What they're probing**: Basic understanding of deployment strategies.

**Strong Answer**: "Blue-green deployment maintains two identical production environments. You deploy new code to the idle environment, verify it works, then switch all traffic atomically. The key benefit is instant rollback - if problems emerge, you switch back in seconds rather than waiting for a new deployment. I'd use it when: rollback speed is critical (payment systems, authentication), you need to test the exact production configuration before going live, or your application doesn't handle rolling deployments well (stateful services, long-lived connections). I wouldn't use it when infrastructure costs are constrained or when the complexity of maintaining two environments outweighs the rollback speed benefit."

---

#### Level 2: "How would you handle database schema changes in a blue-green deployment?"

**What they're probing**: Understanding of the fundamental complexity in blue-green patterns.

**Strong Answer**: "This is the hardest part of blue-green. Since both environments share a database, schema changes can break the inactive environment, making rollback impossible. I'd use expand-contract migrations: first deploy code that's compatible with both old and new schemas, then migrate the schema, then deploy code that uses only the new schema, finally clean up old columns. For example, renaming a column: (1) add new column, (2) deploy code writing to both, (3) backfill data, (4) deploy code reading from new, (5) drop old column. This requires more deployments but ensures either environment can run at any time. For teams doing this frequently, I'd consider separating databases with CDC replication, accepting eventual consistency, or moving toward event sourcing where schema changes don't affect read models directly."

**Key insight to mention**: "The principle is that database changes should be backward-compatible for at least N-1 code versions."

---

#### Level 3: "Design a blue-green deployment system for a globally distributed application serving 100M requests/day with strict consistency requirements. Traffic switching must complete worldwide within 30 seconds."

**What they're probing**: Distributed systems complexity, global traffic management, consistency under partition.

**Strong Answer**: "This is challenging because global DNS propagation takes minutes, not seconds, and different regions have different propagation characteristics.

**Architecture approach**: I'd use a two-tier routing system. The outer tier is anycast DNS pointing to regional edge nodes (Cloudflare/Fastly style) - this DNS never changes during deployments. The inner tier is L7 routing at each edge node, which reads routing configuration from a globally replicated datastore.

**Traffic switching mechanism**: When switching, I'd update routing config in a strongly consistent store (like Spanner or CockroachDB with global replication). Each edge node watches this config with a short polling interval (1s) or uses a push notification system. The edge node atomically switches its local routing table when it receives the update.

**30-second SLA**: To guarantee 30-second global propagation, I'd implement a two-phase commit style protocol. Phase 1: Push config to all regions, each region ACKs when ready to switch. Phase 2: Coordinator sends 'commit' signal, all regions switch simultaneously. If any region doesn't ACK within timeout, abort the deployment.

**Consistency under partition**: If a region is partitioned during switch, it should fail-safe to the last known good state (blue). When partition heals, it catches up to current config. This means during partition, one region might serve old version - acceptable given CAP constraints.

**Strict consistency caveat**: If the application requires strict consistency (not just the routing), we need to consider in-flight transactions. I'd implement request draining: stop sending new requests to blue (but let existing complete), wait for configurable drain period, then mark blue as inactive. This adds latency to the switch but ensures no request spans the transition."

**Critical points to address**:
- BGP/anycast propagation delays for true global DNS
- Clock skew between regions affecting coordinated switch
- Monitoring to verify all regions switched successfully

</div>

---

## Section 3: Canary Releases

### Core Mechanism

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">

**Canary releases** gradually shift traffic from the current version to the new version while monitoring for degradation. Unlike blue-green (instant full switch), canary allows validating new code with real production traffic at controlled risk levels.

<div style="background: rgba(163, 113, 247, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 20px; margin: 16px 0;">

**Canary Release Progression**

<div style="display: flex; flex-direction: column; gap: 16px; margin: 16px 0;">

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #30363d; padding: 8px 16px; border-radius: 8px; min-width: 100px; text-align: center; color: #8b949e; font-weight: bold;">Stage 0</div>
<div style="flex: 1; display: flex; gap: 4px;">
<div style="background: #1f6feb; flex: 100; height: 30px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">v1.4 (100%)</div>
</div>
<div style="color: #8b949e; font-size: 12px; min-width: 120px;">Initial state</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #30363d; padding: 8px 16px; border-radius: 8px; min-width: 100px; text-align: center; color: #8b949e; font-weight: bold;">Stage 1</div>
<div style="flex: 1; display: flex; gap: 4px;">
<div style="background: #1f6feb; flex: 95; height: 30px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">v1.4 (95%)</div>
<div style="background: #238636; flex: 5; height: 30px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">v1.5</div>
</div>
<div style="color: #8b949e; font-size: 12px; min-width: 120px;">5% canary, 10 min</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #30363d; padding: 8px 16px; border-radius: 8px; min-width: 100px; text-align: center; color: #8b949e; font-weight: bold;">Stage 2</div>
<div style="flex: 1; display: flex; gap: 4px;">
<div style="background: #1f6feb; flex: 75; height: 30px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">v1.4 (75%)</div>
<div style="background: #238636; flex: 25; height: 30px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">v1.5 (25%)</div>
</div>
<div style="color: #8b949e; font-size: 12px; min-width: 120px;">25% canary, 20 min</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #30363d; padding: 8px 16px; border-radius: 8px; min-width: 100px; text-align: center; color: #8b949e; font-weight: bold;">Stage 3</div>
<div style="flex: 1; display: flex; gap: 4px;">
<div style="background: #1f6feb; flex: 50; height: 30px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">v1.4 (50%)</div>
<div style="background: #238636; flex: 50; height: 30px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">v1.5 (50%)</div>
</div>
<div style="color: #8b949e; font-size: 12px; min-width: 120px;">50% canary, 30 min</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #238636; padding: 8px 16px; border-radius: 8px; min-width: 100px; text-align: center; color: white; font-weight: bold;">Complete</div>
<div style="flex: 1; display: flex; gap: 4px;">
<div style="background: #238636; flex: 100; height: 30px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">v1.5 (100%)</div>
</div>
<div style="color: #7ee787; font-size: 12px; min-width: 120px;">Full rollout</div>
</div>

</div>

</div>

**Traffic Splitting Implementations**:

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 16px 0;">

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 8px; padding: 12px;">
<h5 style="color: #58a6ff; margin: 0 0 8px 0; font-size: 13px;">Replica-based</h5>
<div style="color: #8b949e; font-size: 12px;">Run 19 v1.4 pods, 1 v1.5 pod behind same service. ~5% traffic to canary. Coarse-grained control.</div>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 8px; padding: 12px;">
<h5 style="color: #7ee787; margin: 0 0 8px 0; font-size: 13px;">Service Mesh</h5>
<div style="color: #8b949e; font-size: 12px;">Istio/Linkerd VirtualService with weight-based routing. Fine-grained percentages, header-based routing.</div>
</div>

<div style="background: rgba(163, 113, 247, 0.1); border: 1px solid #a371f7; border-radius: 8px; padding: 12px;">
<h5 style="color: #a371f7; margin: 0 0 8px 0; font-size: 13px;">Load Balancer</h5>
<div style="color: #8b949e; font-size: 12px;">ALB/Nginx weighted target groups. Infrastructure-level control, no app changes required.</div>
</div>

</div>

</div>

### Automated Canary Analysis

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 20px; margin: 20px 0;">

<h4 style="color: #58a6ff; margin: 0 0 16px 0;">The Canary Analysis Problem</h4>

**Core challenge**: How do you automatically determine if the canary is "healthy enough" to proceed?

**Metrics to compare** (canary vs. baseline):

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 16px 0;">

<div style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 16px;">
<h5 style="color: #7ee787; margin: 0 0 8px 0;">Golden Signals</h5>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li><strong>Latency</strong>: p50, p90, p99 request duration</li>
<li><strong>Error rate</strong>: 5xx responses / total responses</li>
<li><strong>Throughput</strong>: Requests per second</li>
<li><strong>Saturation</strong>: CPU, memory, connection pool utilization</li>
</ul>
</div>

<div style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 16px;">
<h5 style="color: #f0883e; margin: 0 0 8px 0;">Business Metrics</h5>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li><strong>Conversion rate</strong>: Checkout completions / cart views</li>
<li><strong>Engagement</strong>: Clicks, time on page, scroll depth</li>
<li><strong>Revenue</strong>: Orders, average order value</li>
<li><strong>User errors</strong>: Form validation failures, 4xx rates</li>
</ul>
</div>

</div>

**Statistical Analysis Methods**:

<div style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 16px; margin: 16px 0;">

**Mann-Whitney U Test**: Non-parametric test comparing two distributions. Null hypothesis: canary and baseline metrics come from same distribution. If p-value < threshold (0.05), distributions differ significantly.

**Problem**: A/A tests (baseline vs. baseline) should pass 95% of the time, but real systems often show higher false-positive rates due to temporal variation.

**Mitigation**: Run simultaneous baseline comparison (deploy identical code as "baseline canary"), compare canary vs. this baseline rather than historical data. If canary is significantly worse than contemporary baseline, fail.

</div>

**Automated Rollback Criteria**:

```
IF error_rate_canary > error_rate_baseline * 1.5 THEN rollback
IF p99_latency_canary > p99_latency_baseline * 1.3 THEN rollback
IF cpu_saturation_canary > 0.8 THEN rollback
IF (conversion_rate_baseline - conversion_rate_canary) / conversion_rate_baseline > 0.05 THEN rollback
```

</div>

### Edge Cases and Failure Modes

<div style="background: linear-gradient(135deg, #3d1f1f 0%, #5d3a3a 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #f85149;">

**Traffic Volume Insufficiency**: At 1% canary traffic, low-volume services might see only 10 requests in the analysis window - not enough for statistical significance. Mitigation: Define minimum sample size, extend analysis window for low-traffic services, or skip canary for <100 req/min services.

**Sticky Session Contamination**: User gets canary on first request, then baseline on subsequent requests, corrupting both metrics and user experience. Mitigation: Cookie-based or user-ID-based routing ensures same user always hits same version.

**Cascading Failure Masking**: Canary has a bug that causes failures in downstream service, but downstream service's errors are attributed to its own canary (also in progress). Mitigation: Coordinate canary deployments across dependency chain, or use distributed tracing to attribute errors to root cause version.

**Metric Lag**: Business metrics (conversion, revenue) take hours to materialize. Canary has already rolled out fully before you detect the problem. Mitigation: Use leading indicators (add-to-cart, checkout-initiated) that correlate with lagging metrics but are available immediately.

**Cold Start Penalty**: New canary pods have cold caches, JIT not warmed up. Initial metrics look terrible, triggering false rollback. Mitigation: Exclude first N minutes from analysis, or pre-warm canary instances before routing traffic.

</div>

### 3-Level Interview Questions: Canary Releases

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f0883e;">

#### Level 1: "How does canary deployment differ from blue-green?"

**What they're probing**: Understanding of gradual vs. atomic deployment strategies.

**Strong Answer**: "Blue-green switches 100% of traffic atomically between two complete environments. Canary gradually shifts traffic while monitoring for problems. The key trade-off: blue-green gives instant rollback but exposes all users to potential issues simultaneously. Canary limits blast radius (only 5% of users see a bad deploy) but rollback means waiting for traffic to drain. I'd choose blue-green when rollback speed is paramount and the cost of 2x infrastructure is acceptable. I'd choose canary when I want real traffic validation before full commitment, can tolerate slightly slower rollback, or when maintaining two complete environments is cost-prohibitive."

---

#### Level 2: "How would you implement automated canary analysis that decides whether to proceed or rollback?"

**What they're probing**: Understanding of statistical analysis in production systems.

**Strong Answer**: "The core problem is comparing canary metrics to baseline metrics and deciding if the difference is significant and negative. I'd implement it in three parts:

**Metric collection**: Instrument both canary and baseline with identical metrics - error rates, latency percentiles, saturation. Use labels/tags to distinguish versions in the [[monitoring]](/topics/system-architectures/monitoring) system.

**Statistical comparison**: For each metric, run a statistical test comparing distributions. Mann-Whitney U works well because it doesn't assume normal distribution. But there's a subtlety: comparing to historical baseline is noisy due to temporal variation (traffic patterns differ by hour). Better to run a 'baseline canary' - deploy the current version alongside the new version, compare new canary to contemporary baseline.

**Decision logic**: Define thresholds for each metric type. Error rate must be within 10% of baseline. P99 latency within 20%. If any metric fails threshold for more than 2 consecutive analysis windows (to filter transient spikes), trigger automatic rollback. If all metrics pass for the configured analysis period, promote to next canary stage."

**Key insight**: "The hardest part is determining appropriate thresholds. Too tight and you get false rollbacks from normal variance. Too loose and bad deploys slip through. I'd start with conservative thresholds and tune based on observing A/A test failure rates."

---

#### Level 3: "Design a canary system for a microservices architecture where service A calls service B. Both are deploying canaries simultaneously. How do you correctly attribute degradation and ensure the right service rolls back?"

**What they're probing**: Distributed systems causality, cross-service observability.

**Strong Answer**: "This is the distributed canary attribution problem. If A-canary calls B-canary and requests fail, which canary is at fault?

**Propagate version context**: Every request carries version headers through the call chain. When A-canary calls B, the request includes `X-Canary-Version: A=1.5,B=1.4`. When B-canary handles a request, it adds itself: `A=1.5,B=2.0`. This creates a version fingerprint for each request path.

**Metrics by version combination**: Record metrics not just by 'my version' but by 'upstream version combination'. B's metrics are bucketed by: (A-stable, B-stable), (A-stable, B-canary), (A-canary, B-stable), (A-canary, B-canary).

**Attribution analysis**: If only (A-canary, B-canary) shows degradation, could be either. If (A-canary, B-stable) also shows degradation, it's likely A. If (A-stable, B-canary) shows degradation, it's likely B. If only the combination fails, it's an interaction bug - need to investigate both.

**Coordination policy**: Ideally, avoid simultaneous canaries in tightly-coupled services. Implement a 'canary lock' - while A is canarying, B's deploys queue. If that's too slow, accept the attribution complexity and require manual investigation for ambiguous cases.

**Blast radius isolation**: Use [[service-mesh]](/topics/system-architectures/service-mesh) traffic policies to route A-canary traffic preferentially to B-stable, limiting the interaction combinations. Only after A-canary completes successfully, allow B-canary to receive A traffic."

**Implementation detail**: "In practice, I'd integrate this with distributed tracing. Jaeger/Zipkin traces already carry version info - extend the canary analyzer to query traces, not just aggregate metrics, for root cause analysis."

</div>

---

## Section 4: Rollback Strategies

### Core Mechanism

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">

**Rollback** is the process of reverting a deployment when problems are detected. The complexity of rollback is inversely proportional to how well you designed your deployment for reversibility.

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 20px; margin: 16px 0;">

**Rollback Decision Tree**

<div style="display: flex; flex-direction: column; gap: 12px; margin: 16px 0;">

<div style="background: #30363d; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: white; font-weight: bold;">Problem Detected in Production</div>
</div>

<div style="display: flex; justify-content: center; gap: 40px;">
<div style="display: flex; flex-direction: column; align-items: center;">
<div style="width: 2px; height: 20px; background: #238636;"></div>
<div style="background: #238636; color: white; padding: 8px 16px; border-radius: 8px; font-size: 13px;">Can fix forward quickly?</div>
<div style="display: flex; gap: 20px; margin-top: 12px;">
<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #7ee787; font-size: 12px; margin-bottom: 4px;">YES</div>
<div style="background: rgba(126, 231, 135, 0.2); border: 1px solid #7ee787; padding: 8px 12px; border-radius: 6px; font-size: 12px; color: #7ee787;">Hot-fix + redeploy</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #f85149; font-size: 12px; margin-bottom: 4px;">NO</div>
<div style="width: 2px; height: 20px; background: #f85149;"></div>
</div>
</div>
</div>
</div>

<div style="display: flex; justify-content: center;">
<div style="background: #f0883e; color: white; padding: 8px 16px; border-radius: 8px; font-size: 13px;">Data mutations involved?</div>
</div>

<div style="display: flex; justify-content: center; gap: 40px;">
<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #7ee787; font-size: 12px; margin-bottom: 4px;">NO - Stateless</div>
<div style="background: rgba(126, 231, 135, 0.2); border: 1px solid #7ee787; padding: 12px 16px; border-radius: 6px; font-size: 12px; color: #7ee787; text-align: center;">
<strong>Simple rollback</strong><br/>
kubectl rollout undo<br/>
Switch LB target
</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #f0883e; font-size: 12px; margin-bottom: 4px;">YES - Stateful</div>
<div style="background: rgba(240, 136, 62, 0.2); border: 1px solid #f0883e; padding: 12px 16px; border-radius: 6px; font-size: 12px; color: #f0883e; text-align: center;">
<strong>Complex rollback</strong><br/>
Code rollback +<br/>
Data migration rollback
</div>
</div>
</div>

</div>

</div>

</div>

### Rollback Mechanisms by Layer

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #58a6ff; margin: 0 0 12px 0;">Application Layer Rollback</h4>

**Mechanism**: Revert to previous container image/artifact version.

**Kubernetes**: `kubectl rollout undo deployment/myapp` - reverts to previous ReplicaSet.

**ECS**: Update task definition to previous revision, force new deployment.

**Serverless**: Point alias to previous function version.

**Time to rollback**: 30 seconds to 5 minutes (depending on startup time, health check intervals).

**Limitation**: Does not undo database changes, cache state, or external system integrations.

</div>

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #a371f7; margin: 0 0 12px 0;">Database Layer Rollback</h4>

**Challenge**: Schema changes and data migrations are often irreversible.

**Flyway/Liquibase**: Support down migrations but these must be manually written and tested.

**Point-in-time recovery**: Restore database to state before deployment. Data loss for all writes since deploy.

**Dual-write rollback**: If using expand-contract, old columns still have data. Rollback is just deploying old code.

**Time to rollback**: Minutes (dual-write) to hours (PITR restore).

**Limitation**: PITR loses all data since deployment; dual-write requires careful planning.

</div>

<div style="background: linear-gradient(135deg, #3d2e1f 0%, #5d4a3a 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #f0883e; margin: 0 0 12px 0;">Infrastructure Layer Rollback</h4>

**Mechanism**: Revert Terraform/Pulumi state to previous version.

**Challenge**: Some infrastructure changes are destructive (deleted resources can't be undeleted).

**Mitigation**: Use `prevent_destroy` lifecycle rules, implement soft-delete patterns.

**GitOps approach**: Revert git commit, let ArgoCD/Flux sync to previous state.

**Time to rollback**: Minutes for compute, potentially hours for databases (if snapshots needed).

**Limitation**: External integrations (DNS, certificates) may have propagation delays.

</div>

<div style="background: linear-gradient(135deg, #1f3d2d 0%, #3a5d4a 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #7ee787; margin: 0 0 12px 0;">Feature Layer Rollback</h4>

**Mechanism**: [[Feature flags]](#section-5-feature-flags) to disable problematic code paths without deployment.

**Advantage**: Instant (milliseconds), no deployment required, granular control.

**Implementation**: Toggle flag in feature flag service, all instances pick up change within TTL.

**Limitation**: Only works if the problematic code is behind a flag. Doesn't help with schema changes or fundamental bugs.

**Time to rollback**: Milliseconds to seconds.

</div>

</div>

### Key Design Decisions

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 20px; margin: 20px 0;">

<h4 style="color: #58a6ff; margin: 0 0 16px 0;">Rollback Velocity vs. Complexity Trade-off</h4>

<div style="overflow-x: auto; margin: 16px 0;">

| Strategy | Rollback Time | Complexity | Data Safety | Cost |
|----------|--------------|------------|-------------|------|
| Feature flags | Milliseconds | Low (if planned) | Full | Flag service cost |
| Blue-green switch | Seconds | Medium | Full (stateless) | 2x infrastructure |
| K8s rollout undo | 30s-5min | Low | Full (stateless) | None |
| Canary abort | 1-5min | Medium | Partial (some users affected) | None |
| DB point-in-time | 15min-hours | High | Data loss since deploy | Storage costs |
| Full environment restore | Hours | Very high | Depends on backup frequency | Backup storage |

</div>

**Design Principle**: Invest in fast rollback mechanisms proportional to change risk. High-risk changes (schema migrations, security changes) need multiple rollback paths tested before deployment.

</div>

### 3-Level Interview Questions: Rollback Strategies

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f0883e;">

#### Level 1: "How quickly should a production rollback take, and what factors affect this?"

**What they're probing**: Understanding of rollback as a critical operational capability.

**Strong Answer**: "A stateless application rollback should complete in under 60 seconds - this is the gold standard. The factors that affect this are: container image pull time (solved by keeping previous version cached), health check intervals (pods need to pass readiness before receiving traffic), connection draining (graceful termination of in-flight requests), and number of replicas (more replicas = more time for rolling restart). For stateful rollbacks involving databases, the time depends on whether you designed for it - expand-contract migrations enable instant code rollback, but traditional migrations might require hours of data restoration. The key principle is: design for rollback before you deploy, not during an incident."

---

#### Level 2: "A deployment introduces a bug that corrupts data for 2% of user requests over 30 minutes before detection. How do you approach this rollback?"

**What they're probing**: Understanding of the data dimension of rollbacks.

**Strong Answer**: "This is the hardest type of rollback because we're past the point where simply reverting code helps - data is already corrupted.

**Immediate actions**: (1) Roll back the code to stop ongoing corruption. (2) Identify affected users/records using logs and the 30-minute window. (3) Assess corruption scope - is it reversible, or is data permanently lost?

**Data remediation options**: If we have audit logs or [[event-sourcing]](/topics/system-architectures/event-sourcing), replay events to reconstruct correct state. If we have point-in-time recovery, selectively restore affected records from pre-deployment backup. If we have application-level backups (soft delete, version history), restore from those.

**The uncomfortable truth**: Some data corruption is unrecoverable. In that case, communicate with affected users, provide compensation if applicable, and document the incident.

**Prevention for next time**: Implement write-ahead logging for critical operations, use feature flags to test risky code paths with synthetic users first, add data validation that catches corruption patterns (anomaly detection on write patterns), and consider dual-write during risky migrations where writes go to both old and new schemas."

---

#### Level 3: "Design a rollback system that can handle partial failures across a microservices deployment where services A, B, and C were deployed together, but only B's deployment caused issues. A and C are fine but have dependencies on B."

**What they're probing**: Distributed systems rollback coordination, dependency management.

**Strong Answer**: "This is the distributed rollback coordination problem. The naive solution - roll back all three - is wasteful and potentially disruptive if A and C introduced valuable features.

**Dependency analysis first**: Map the service dependencies. If B is downstream of A and C (they call B), rolling back B alone might work if B's API is backward-compatible. If A or C depend on B's new features (added API endpoint, changed response format), rolling back B breaks them.

**Version compatibility matrix**: Maintain a matrix of which service versions are compatible. Before any deployment, run integration tests with the specific version combination. This matrix tells us: can A-new + C-new + B-old function correctly?

**Selective rollback implementation**:

If compatible: Roll back B only. Use [[distributed-locking]](/topics/system-architectures/distributed-locking) to prevent concurrent deploys during rollback. Update service registry/mesh to route traffic to B-old. Verify inter-service health checks pass.

If incompatible: We have a choice - roll back all to known-good state, or roll forward B to a fixed version. I'd prefer rolling forward if B's fix is straightforward because it preserves A and C's changes. But if B's issue is complex, roll back all three to last known-good checkpoint.

**Deployment atomicity pattern**: For tightly-coupled services, consider deploying them as a unit. Version them together (monorepo or coordinated release). This simplifies rollback - all or nothing - at the cost of deployment flexibility.

**Long-term solution**: Reduce inter-service coupling. Use API versioning so B-old can coexist with B-new. Implement [[contract-testing]](/topics/testing/contract-testing) to catch compatibility breaks before deployment. Design services to be backward-compatible for at least N-1 versions."

</div>

---

## Section 5: Feature Flags

### Core Mechanism

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">

**Feature flags** (also called feature toggles) are conditional statements in code that enable or disable functionality at runtime without deployment. They decouple deployment (shipping code) from release (enabling features for users).

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 20px; margin: 16px 0;">

**Feature Flag Evaluation Flow**

<div style="display: flex; flex-direction: column; gap: 16px; margin: 16px 0;">

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #1f6feb; color: white; padding: 12px 20px; border-radius: 8px; min-width: 150px; text-align: center; font-weight: bold;">Application Code</div>
<div style="color: #8b949e; font-size: 13px; flex: 1;">
`if (featureFlags.isEnabled("new-checkout", user)) { showNewCheckout(); }`
</div>
</div>

<div style="display: flex; justify-content: center;"><div style="width: 2px; height: 20px; background: #30363d;"></div></div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #238636; color: white; padding: 12px 20px; border-radius: 8px; min-width: 150px; text-align: center; font-weight: bold;">Local SDK Cache</div>
<div style="color: #8b949e; font-size: 13px; flex: 1;">
SDK caches flag rules locally. Cache TTL typically 30s-5min. Evaluation happens in-process, no network call per check.
</div>
</div>

<div style="display: flex; justify-content: center;"><div style="width: 2px; height: 20px; background: #30363d;"></div></div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #8957e5; color: white; padding: 12px 20px; border-radius: 8px; min-width: 150px; text-align: center; font-weight: bold;">Flag Service</div>
<div style="color: #8b949e; font-size: 13px; flex: 1;">
Central service stores flag configuration. SDK polls or receives push updates. Provides UI for flag management.
</div>
</div>

<div style="display: flex; justify-content: center;"><div style="width: 2px; height: 20px; background: #30363d;"></div></div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f0883e; color: white; padding: 12px 20px; border-radius: 8px; min-width: 150px; text-align: center; font-weight: bold;">Targeting Rules</div>
<div style="color: #8b949e; font-size: 13px; flex: 1;">
Rules evaluated in order: user ID match, segment membership, percentage rollout, default value.
</div>
</div>

</div>

</div>

</div>

### Types of Feature Flags

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #58a6ff; margin: 0 0 12px 0;">Release Flags</h4>

**Purpose**: Hide incomplete features until ready for release.

**Lifespan**: Days to weeks. Remove after feature is fully launched.

**Example**: `new-payment-flow` - Ship incrementally, enable when complete.

**Risk**: Long-lived release flags become tech debt. Enforce removal SLAs.

**Targeting**: Usually all-or-nothing, or internal users only during development.

</div>

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #a371f7; margin: 0 0 12px 0;">Experiment Flags</h4>

**Purpose**: A/B testing to measure impact of changes.

**Lifespan**: Weeks to months (until statistical significance reached).

**Example**: `checkout-button-color` - 50% see green, 50% see blue.

**Integration**: Must integrate with [[analytics]](/topics/system-architectures/analytics) to track conversion by variant.

**Targeting**: Percentage-based, user-bucketed (same user always sees same variant).

</div>

<div style="background: linear-gradient(135deg, #3d2e1f 0%, #5d4a3a 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #f0883e; margin: 0 0 12px 0;">Ops Flags (Kill Switches)</h4>

**Purpose**: Disable functionality during incidents without deployment.

**Lifespan**: Permanent (always present, usually enabled).

**Example**: `enable-recommendations` - Disable when recommendations service is overloaded.

**Design**: Default to degraded-but-functional behavior when disabled.

**Targeting**: Global toggle, possibly per-region for isolation.

</div>

<div style="background: linear-gradient(135deg, #1f3d2d 0%, #3a5d4a 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #7ee787; margin: 0 0 12px 0;">Permission Flags</h4>

**Purpose**: Enable features for specific user segments (beta users, paying customers).

**Lifespan**: Permanent or until feature becomes generally available.

**Example**: `premium-analytics` - Only enabled for enterprise tier.

**Relationship**: Often overlaps with [[authorization]](/topics/security/authorization) system.

**Targeting**: Segment-based (user attributes, subscription tier, organization).

</div>

</div>

### Key Design Decisions

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 20px; margin: 20px 0;">

<h4 style="color: #58a6ff; margin: 0 0 16px 0;">Server-side vs. Client-side Evaluation</h4>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 16px 0;">

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 8px; padding: 16px;">
<h5 style="color: #58a6ff; margin: 0 0 8px 0;">Server-side Evaluation</h5>

**How it works**: SDK fetches flag rules from service, evaluates locally on server. Only flag results (not rules) sent to client.

**Advantages**: Rules stay private (competitors can't see targeting logic). Lower latency (evaluation is local). Works for backend services.

**Disadvantages**: Can't react to client-only context (device type, browser) without server round-trip.

**Use for**: Backend services, sensitive targeting rules, performance-critical paths.

</div>

<div style="background: rgba(163, 113, 247, 0.1); border: 1px solid #a371f7; border-radius: 8px; padding: 16px;">
<h5 style="color: #a371f7; margin: 0 0 8px 0;">Client-side Evaluation</h5>

**How it works**: Client SDK fetches rules for specific user, evaluates in browser/app. Rules filtered to what client needs.

**Advantages**: Can use client context (viewport, device). No server round-trip for flag checks.

**Disadvantages**: Rules potentially visible to users (even if filtered). Larger payload to transfer rules.

**Use for**: Frontend feature toggles, A/B tests needing client context, mobile apps.

</div>

</div>

**Hybrid approach**: Server evaluates sensitive flags, passes results to client as bootstrap data. Client SDK handles UI-specific flags locally.

</div>

### Edge Cases and Failure Modes

<div style="background: linear-gradient(135deg, #3d1f1f 0%, #5d3a3a 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #f85149;">

**Flag Service Unavailability**: If the flag service is down, what happens?

**Design choice**: SDK must have sensible defaults. Options: (1) Fail closed - treat all flags as disabled, safest but feature degradation. (2) Fail open - treat all flags as enabled, risky for release flags. (3) Use cached values - best of both worlds but cache can be stale.

**Recommendation**: Cache with TTL, fail to cached values, alert on staleness.

**Inconsistent Evaluation Across Instances**: Different app instances have different cache states, causing flickering user experience.

**Mitigation**: Use consistent hashing on user ID for percentage rollouts. Same user always evaluates to same bucket regardless of which server handles request.

**Flag Explosion / Tech Debt**: Hundreds of flags accumulate, many stale, increasing code complexity.

**Mitigation**: Automated flag lifecycle management. Flags have expiration dates. Alerts when flags aren't used for N days. Automated PRs to remove dead flags.

**Flag Interdependencies**: Flag A depends on flag B. If B is disabled, A's behavior is undefined.

**Mitigation**: Model dependencies explicitly. Flag service validates that enabling A requires B. Or: avoid dependencies through code design - each flag should be independent.

**Evaluation Performance**: Checking 50 flags per request adds latency.

**Mitigation**: Batch evaluation at request start, store in request context. Optimize rule evaluation (pre-compile rules, index by user attributes).

</div>

### 3-Level Interview Questions: Feature Flags

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f0883e;">

#### Level 1: "What are feature flags and why would you use them instead of just deploying code?"

**What they're probing**: Basic understanding of deployment vs. release separation.

**Strong Answer**: "Feature flags let you deploy code to production but control whether users actually experience it. This separation provides three key benefits: First, safer deployments - you can ship code that's disabled by default, verify it's not causing errors, then gradually enable it. Second, instant rollback - if a feature causes problems, you toggle the flag off in seconds instead of waiting for a deployment. Third, controlled rollout - you can enable features for specific users (beta testers), percentages (canary), or segments (enterprise customers) without multiple codepaths in deployment config. The trade-off is code complexity - you have conditional branches that need to be maintained and eventually removed when the feature is fully launched."

---

#### Level 2: "How would you implement a feature flag system that needs to handle 100,000 evaluations per second with consistent bucketing for A/B tests?"

**What they're probing**: Understanding of performance and consistency requirements in flag systems.

**Strong Answer**: "At 100K evals/second, we can't make a network call per evaluation - that's the first constraint. So the architecture is: SDK caches flag rules locally, evaluations happen in-process.

**Cache strategy**: Poll-based updates every 30 seconds, or streaming updates via SSE/WebSocket for near-instant propagation. Cache is keyed by environment (prod, staging). Typical cache size is small - few hundred KB for thousands of flags.

**Consistent bucketing for A/B**: The user must always see the same variant, even across different servers. I'd use deterministic hashing: `hash(user_id + flag_key) % 100`. If result < rollout_percentage, user gets treatment. Same user always hashes to same bucket. The flag_key inclusion prevents all flags from bucketing the same users together.

**Evaluation performance**: Pre-parse rules at cache refresh time, not at evaluation time. Index rules by commonly-queried attributes. For complex targeting (hundreds of segments), consider rule compilation to efficient lookup structures.

**Consistency across services**: In a microservices architecture, all services must agree on flag values. Use a shared SDK with identical caching behavior. Or: centralized flag evaluation service that other services call (adds latency but guarantees consistency)."

---

#### Level 3: "Design a feature flag system for a global application where flag changes must propagate to all regions within 5 seconds, but the system must remain operational if the flag service experiences a complete outage for up to 1 hour."

**What they're probing**: Distributed systems resilience, eventual consistency, failure handling.

**Strong Answer**: "These requirements create tension: fast propagation suggests short cache TTL and push-based updates, but outage resilience suggests long-lived local state that survives service failures.

**Architecture**:

**Global flag service**: Deploy flag configuration to a globally replicated datastore (DynamoDB Global Tables, Spanner, or CockroachDB). Writes go to primary region, replicate to read replicas in each region within 1-2 seconds.

**Regional relay nodes**: Each region has relay nodes that subscribe to the global store. Relays push updates to local application instances via SSE or gRPC streaming. This achieves the 5-second propagation: 1-2s replication + 1-2s relay processing + 1s push to apps.

**Local SDK resilience**: The SDK maintains a persistent local cache (file-based or embedded database, not just in-memory). On startup, SDK reads from local cache first, then connects to regional relay. If relay is unavailable, SDK operates on cached values indefinitely.

**1-hour outage handling**: During outage, apps continue with cached flag values. They can't receive updates, but they function. When service recovers, SDK reconnects and receives delta updates.

**Cache warming at deploy time**: New application instances might not have warm cache. Bake current flag values into the deployment artifact (configuration file bundled at build time). This guarantees fresh-enough defaults even if flag service is down during initial boot.

**Monitoring and alerting**: Track cache staleness across fleet. Alert if any instance has cache older than threshold (e.g., 10 minutes). During planned outages, pre-propagate expected flag states.

**Trade-off acknowledged**: With 1-hour cache validity, a flag change during outage won't propagate. This is acceptable for release flags (wait 1 hour to release), but concerning for kill switches (can't disable feature during outage). Mitigation: ops flags also configurable via environment variable as backup."

</div>

---

## Cross-Cutting Concerns

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 24px; margin: 20px 0;">

### Security Considerations

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 16px 0;">

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 8px; padding: 16px;">
<h5 style="color: #f85149; margin: 0 0 8px 0;">CI/CD Security Risks</h5>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li><strong>Secret leakage</strong>: Secrets printed in logs, exfiltrated by malicious code</li>
<li><strong>Supply chain attacks</strong>: Compromised dependencies, malicious base images</li>
<li><strong>Pipeline injection</strong>: Attacker modifies pipeline config via PR</li>
<li><strong>Credential theft</strong>: Stolen deployment credentials enable production access</li>
</ul>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 8px; padding: 16px;">
<h5 style="color: #7ee787; margin: 0 0 8px 0;">Mitigations</h5>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li><strong>Secret masking</strong>: Redact secrets from logs automatically</li>
<li><strong>SBOM generation</strong>: Track all dependencies, scan for vulnerabilities</li>
<li><strong>Protected branches</strong>: Require review for pipeline config changes</li>
<li><strong>Short-lived credentials</strong>: OIDC tokens, assume roles, avoid static keys</li>
</ul>
</div>

</div>

### Observability Integration

Deployment systems must integrate with [[monitoring]](/topics/system-architectures/monitoring) and [[distributed-tracing]](/topics/system-architectures/distributed-tracing):

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 8px; padding: 16px; margin: 16px 0;">

**Deployment Events as Annotations**: Every deployment should create an annotation in your metrics/APM system. This enables: correlating metric changes with deployments, comparing before/after performance, and automatic anomaly detection tied to releases.

**Version Labels in Telemetry**: All logs, metrics, and traces should include application version. This enables: filtering dashboards by version during canary, querying traces for specific release behavior, and understanding version distribution across fleet.

**Deployment Metrics to Track**:
- Deployment frequency (DORA metric)
- Lead time for changes (commit to production)
- Change failure rate (deployments requiring rollback)
- Mean time to recovery (time to rollback or fix)

</div>

### Related Topics

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 16px 0;">

<div style="background: #30363d; border-radius: 8px; padding: 12px; text-align: center;">
<a href="/topics/system-architectures/container-orchestration" style="color: #58a6ff; text-decoration: none;">[[Container Orchestration]]</a>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">Kubernetes, ECS patterns</div>
</div>

<div style="background: #30363d; border-radius: 8px; padding: 12px; text-align: center;">
<a href="/topics/system-architectures/service-mesh" style="color: #58a6ff; text-decoration: none;">[[Service Mesh]]</a>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">Traffic management, canary routing</div>
</div>

<div style="background: #30363d; border-radius: 8px; padding: 12px; text-align: center;">
<a href="/topics/system-architectures/gitops" style="color: #58a6ff; text-decoration: none;">[[GitOps]]</a>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">Declarative deployment patterns</div>
</div>

<div style="background: #30363d; border-radius: 8px; padding: 12px; text-align: center;">
<a href="/topics/system-architectures/infrastructure-as-code" style="color: #58a6ff; text-decoration: none;">[[Infrastructure as Code]]</a>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">Terraform, Pulumi patterns</div>
</div>

<div style="background: #30363d; border-radius: 8px; padding: 12px; text-align: center;">
<a href="/topics/system-architectures/secrets-management" style="color: #58a6ff; text-decoration: none;">[[Secrets Management]]</a>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">Vault, credential rotation</div>
</div>

<div style="background: #30363d; border-radius: 8px; padding: 12px; text-align: center;">
<a href="/topics/system-architectures/chaos-engineering" style="color: #58a6ff; text-decoration: none;">[[Chaos Engineering]]</a>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">Testing deployment resilience</div>
</div>

</div>

</div>

---

## Summary: Deployment Strategy Decision Framework

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #58a6ff;">

<div style="overflow-x: auto; margin: 16px 0;">

| Factor | Rolling | Blue-Green | Canary | Feature Flag |
|--------|---------|------------|--------|--------------|
| **Rollback speed** | Minutes | Seconds | Minutes | Milliseconds |
| **Blast radius** | Gradual | All users | Controlled % | Controlled % |
| **Infrastructure cost** | 1x | 2x | 1.1x | 1x + flag service |
| **Complexity** | Low | Medium | High | Medium |
| **Data migration support** | Poor | Poor | Poor | N/A |
| **Best for** | Stateless services | Critical paths | Validating with real traffic | Decoupling deploy/release |

</div>

**Decision Process**:

1. **Default to rolling deployments** - They're simple, cost-effective, and work for most services.

2. **Add feature flags** when you need instant rollback or want to decouple deployment from release.

3. **Use canary** when you need real traffic validation before full rollout and can invest in automated analysis.

4. **Use blue-green** when instant full-environment rollback is critical and you can afford 2x infrastructure.

5. **Combine strategies**: Deploy with rolling, gate features with flags, validate critical paths with canary analysis.

</div>

---

## Interview Preparation Checklist

<div style="background: linear-gradient(135deg, #1f3d2d 0%, #3a5d4a 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #7ee787;">

**Concepts you must be able to explain**:
- [ ] How a CI/CD pipeline processes a commit from push to production
- [ ] DAG scheduling and topological sort for pipeline execution
- [ ] The database problem in blue-green deployments
- [ ] Statistical analysis methods for canary evaluation
- [ ] Consistent user bucketing for A/B experiments
- [ ] Feature flag evaluation performance at scale

**Trade-offs you should be able to discuss**:
- [ ] Ephemeral vs. persistent build agents
- [ ] Push vs. pull deployment models
- [ ] Server-side vs. client-side flag evaluation
- [ ] Instant rollback (blue-green) vs. controlled blast radius (canary)
- [ ] Deployment complexity vs. rollback speed

**Red flags to avoid saying**:
- "Kubernetes is always the right choice for deployment"
- "Feature flags have no downsides"
- "We don't need rollback capability if we have good tests"
- "Canary deployments are always better than rolling"

**Strong signal statements**:
- "The choice of deployment strategy depends on rollback speed requirements, infrastructure budget, and team expertise"
- "Feature flags are technical debt by design - they need lifecycle management and removal deadlines"
- "The hardest part of blue-green is database migrations, not the traffic switching"
- "Canary analysis requires understanding both golden signals and business metrics"

</div>
