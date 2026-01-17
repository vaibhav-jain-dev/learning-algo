# Availability

## Introduction

Availability measures the percentage of time a system is operational and accessible. In distributed systems, achieving high availability is critical for user experience, business continuity, and meeting contractual obligations. This topic covers availability concepts, measurement, and strategies for building highly available systems.

---

## What is Availability?

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #0f3460;">
<h4 style="color: #e94560; margin-top: 0;">Availability Formula</h4>
<div style="text-align: center; padding: 20px;">
<div style="background: rgba(0,0,0,0.3); display: inline-block; padding: 25px 50px; border-radius: 10px;">
<span style="color: #e94560; font-size: 1.3em; font-family: monospace;">
<strong>Availability = Uptime / (Uptime + Downtime)</strong>
</span>
</div>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; font-size: 0.9em;">
<div style="text-align: center; background: rgba(39, 174, 96, 0.2); padding: 15px; border-radius: 8px;">
<strong style="color: #27ae60;">Uptime</strong><br>
<span style="color: #a0a0a0;">Time system is operational and serving requests correctly</span>
</div>
<div style="text-align: center; background: rgba(231, 76, 60, 0.2); padding: 15px; border-radius: 8px;">
<strong style="color: #e74c3c;">Downtime</strong><br>
<span style="color: #a0a0a0;">Time system is unavailable, degraded, or not meeting SLA</span>
</div>
</div>
</div>

### The "Nines" of Availability

<div style="background: linear-gradient(135deg, #0c2461 0%, #1e3799 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #3867d6;">
<h4 style="color: #fed330; margin-top: 0;">Availability Levels</h4>
<table style="width: 100%; border-collapse: collapse; font-size: 0.85em;">
<tr style="background: rgba(254, 211, 48, 0.2);">
<th style="padding: 12px; color: #fed330; text-align: left; border-bottom: 2px solid #fed330;">Availability</th>
<th style="padding: 12px; color: #fed330; text-align: center; border-bottom: 2px solid #fed330;">Nines</th>
<th style="padding: 12px; color: #fed330; text-align: center; border-bottom: 2px solid #fed330;">Downtime/Year</th>
<th style="padding: 12px; color: #fed330; text-align: center; border-bottom: 2px solid #fed330;">Downtime/Month</th>
<th style="padding: 12px; color: #fed330; text-align: left; border-bottom: 2px solid #fed330;">Example</th>
</tr>
<tr style="border-bottom: 1px solid #3867d6;">
<td style="padding: 12px; color: #ecf0f1;">90%</td>
<td style="padding: 12px; color: #ff7675; text-align: center;">1 nine</td>
<td style="padding: 12px; color: #ff7675; text-align: center;">36.5 days</td>
<td style="padding: 12px; color: #ff7675; text-align: center;">72 hours</td>
<td style="padding: 12px; color: #a0a0a0;">Internal tools</td>
</tr>
<tr style="border-bottom: 1px solid #3867d6;">
<td style="padding: 12px; color: #ecf0f1;">99%</td>
<td style="padding: 12px; color: #fab1a0; text-align: center;">2 nines</td>
<td style="padding: 12px; color: #fab1a0; text-align: center;">3.65 days</td>
<td style="padding: 12px; color: #fab1a0; text-align: center;">7.2 hours</td>
<td style="padding: 12px; color: #a0a0a0;">Basic services</td>
</tr>
<tr style="border-bottom: 1px solid #3867d6;">
<td style="padding: 12px; color: #ecf0f1;">99.9%</td>
<td style="padding: 12px; color: #ffeaa7; text-align: center;">3 nines</td>
<td style="padding: 12px; color: #ffeaa7; text-align: center;">8.76 hours</td>
<td style="padding: 12px; color: #ffeaa7; text-align: center;">43.8 min</td>
<td style="padding: 12px; color: #a0a0a0;">Business apps</td>
</tr>
<tr style="border-bottom: 1px solid #3867d6;">
<td style="padding: 12px; color: #ecf0f1;">99.99%</td>
<td style="padding: 12px; color: #55efc4; text-align: center;">4 nines</td>
<td style="padding: 12px; color: #55efc4; text-align: center;">52.6 min</td>
<td style="padding: 12px; color: #55efc4; text-align: center;">4.38 min</td>
<td style="padding: 12px; color: #a0a0a0;">E-commerce, SaaS</td>
</tr>
<tr style="border-bottom: 1px solid #3867d6;">
<td style="padding: 12px; color: #ecf0f1;">99.999%</td>
<td style="padding: 12px; color: #00cec9; text-align: center;">5 nines</td>
<td style="padding: 12px; color: #00cec9; text-align: center;">5.26 min</td>
<td style="padding: 12px; color: #00cec9; text-align: center;">26.3 sec</td>
<td style="padding: 12px; color: #a0a0a0;">Financial, telecom</td>
</tr>
<tr>
<td style="padding: 12px; color: #ecf0f1;">99.9999%</td>
<td style="padding: 12px; color: #74b9ff; text-align: center;">6 nines</td>
<td style="padding: 12px; color: #74b9ff; text-align: center;">31.5 sec</td>
<td style="padding: 12px; color: #74b9ff; text-align: center;">2.63 sec</td>
<td style="padding: 12px; color: #a0a0a0;">Critical infrastructure</td>
</tr>
</table>
<p style="color: #a0a0a0; margin-top: 15px; font-size: 0.85em; text-align: center;">
Each additional "nine" is exponentially harder and more expensive to achieve
</p>
</div>

---

## SLA, SLO, and SLI

<div style="background: linear-gradient(135deg, #2d3436 0%, #000000 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #636e72;">
<h4 style="color: #74b9ff; margin-top: 0;">Service Level Concepts</h4>
<div style="display: grid; gap: 15px;">
<div style="background: rgba(116, 185, 255, 0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #74b9ff;">
<h5 style="color: #74b9ff; margin: 0 0 10px 0;">SLI - Service Level Indicator</h5>
<p style="color: #dfe6e9; margin: 0; font-size: 0.9em;">
<strong>What you measure</strong> - Quantitative metrics that reflect system health<br>
<span style="color: #a0a0a0;">Examples: Request latency, error rate, throughput, availability percentage</span>
</p>
</div>
<div style="background: rgba(253, 203, 110, 0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #fdcb6e;">
<h5 style="color: #fdcb6e; margin: 0 0 10px 0;">SLO - Service Level Objective</h5>
<p style="color: #dfe6e9; margin: 0; font-size: 0.9em;">
<strong>Internal target</strong> - The goal you set for each SLI<br>
<span style="color: #a0a0a0;">Examples: P99 latency < 200ms, Error rate < 0.1%, Availability > 99.9%</span>
</p>
</div>
<div style="background: rgba(232, 67, 147, 0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #e84393;">
<h5 style="color: #e84393; margin: 0 0 10px 0;">SLA - Service Level Agreement</h5>
<p style="color: #dfe6e9; margin: 0; font-size: 0.9em;">
<strong>External contract</strong> - Legal agreement with customers including penalties<br>
<span style="color: #a0a0a0;">Examples: 99.95% monthly uptime or credits issued, support response within 4 hours</span>
</p>
</div>
</div>
</div>

### Relationship Between SLA, SLO, SLI

<div style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #3498db;">
<h4 style="color: #f39c12; margin-top: 0;">SLA → SLO → SLI Hierarchy</h4>
<div style="display: flex; flex-direction: column; align-items: center; gap: 15px; padding: 20px;">
<div style="background: #e84393; color: white; padding: 15px 40px; border-radius: 8px; text-align: center; width: 70%;">
<strong>SLA</strong>: "99.9% monthly uptime guaranteed"<br>
<span style="font-size: 0.8em; opacity: 0.8;">External promise to customers</span>
</div>
<div style="color: #f39c12; font-size: 1.5em;">↑</div>
<div style="background: #fdcb6e; color: #2d3436; padding: 15px 40px; border-radius: 8px; text-align: center; width: 80%;">
<strong>SLO</strong>: "99.95% uptime target" (stricter than SLA)<br>
<span style="font-size: 0.8em;">Internal buffer to catch issues before SLA breach</span>
</div>
<div style="color: #f39c12; font-size: 1.5em;">↑</div>
<div style="background: #74b9ff; color: #2d3436; padding: 15px 40px; border-radius: 8px; text-align: center; width: 90%;">
<strong>SLIs</strong>: Successful requests / Total requests × 100<br>
<span style="font-size: 0.8em;">Actual measurements from monitoring systems</span>
</div>
</div>
</div>

### Error Budget

<div style="background: linear-gradient(135deg, #134e5e 0%, #71b280 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #27ae60;">
<h4 style="color: #f1c40f; margin-top: 0;">Error Budget Concept</h4>
<div style="text-align: center; padding: 15px;">
<div style="background: rgba(0,0,0,0.3); display: inline-block; padding: 20px 40px; border-radius: 10px;">
<span style="color: #f1c40f; font-size: 1.2em; font-family: monospace;">
Error Budget = 100% - SLO Target
</span>
</div>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px; margin-top: 15px;">
<strong style="color: #f1c40f;">Example with 99.9% SLO:</strong>
<div style="color: #b2bec3; font-size: 0.9em; margin-top: 10px;">
<p>Error Budget = 0.1% = <strong>43.8 minutes/month</strong></p>
<p style="margin-bottom: 0;">If you've used 30 minutes of downtime this month, you have 13.8 minutes left for deployments, experiments, or unexpected issues.</p>
</div>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px; font-size: 0.85em;">
<div style="background: rgba(39, 174, 96, 0.2); padding: 12px; border-radius: 6px; text-align: center;">
<strong style="color: #27ae60;">Budget Available</strong><br>
<span style="color: #b2bec3;">Deploy features, run experiments</span>
</div>
<div style="background: rgba(231, 76, 60, 0.2); padding: 12px; border-radius: 6px; text-align: center;">
<strong style="color: #e74c3c;">Budget Exhausted</strong><br>
<span style="color: #b2bec3;">Focus on reliability only</span>
</div>
</div>
</div>

---

## Availability Patterns

### Redundancy

<div style="background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #7f8c8d;">
<h4 style="color: #1abc9c; margin-top: 0;">Types of Redundancy</h4>
<div style="display: grid; gap: 15px;">
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
<h5 style="color: #3498db; margin: 0 0 10px 0;">Active-Passive (Standby)</h5>
<div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
<div style="background: #27ae60; color: white; padding: 15px 25px; border-radius: 8px; text-align: center;">
<strong>Primary</strong><br>
<span style="font-size: 0.8em;">Active</span>
</div>
<div style="color: #f39c12;">→ Heartbeat →</div>
<div style="background: #7f8c8d; color: white; padding: 15px 25px; border-radius: 8px; text-align: center;">
<strong>Secondary</strong><br>
<span style="font-size: 0.8em;">Standby</span>
</div>
</div>
<p style="color: #95a5a6; font-size: 0.85em; margin: 10px 0 0 0;">
Standby takes over on primary failure. Data sync via replication.
</p>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
<h5 style="color: #e74c3c; margin: 0 0 10px 0;">Active-Active (Load Balanced)</h5>
<div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
<div style="background: #27ae60; color: white; padding: 15px 25px; border-radius: 8px; text-align: center;">
<strong>Node 1</strong><br>
<span style="font-size: 0.8em;">Active</span>
</div>
<div style="color: #f39c12;">⟷</div>
<div style="background: #27ae60; color: white; padding: 15px 25px; border-radius: 8px; text-align: center;">
<strong>Node 2</strong><br>
<span style="font-size: 0.8em;">Active</span>
</div>
<div style="color: #f39c12;">⟷</div>
<div style="background: #27ae60; color: white; padding: 15px 25px; border-radius: 8px; text-align: center;">
<strong>Node 3</strong><br>
<span style="font-size: 0.8em;">Active</span>
</div>
</div>
<p style="color: #95a5a6; font-size: 0.85em; margin: 10px 0 0 0;">
All nodes serve traffic. Load balancer distributes requests. Better resource utilization.
</p>
</div>
</div>
</div>

### Calculating System Availability

<div style="background: linear-gradient(135deg, #0a3d62 0%, #1e5f74 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #3c6382;">
<h4 style="color: #f8c291; margin-top: 0;">Availability Math</h4>
<div style="display: grid; gap: 20px;">
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
<h5 style="color: #74b9ff; margin: 0 0 10px 0;">Components in Series (All Must Work)</h5>
<div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 10px;">
<div style="background: #3498db; color: white; padding: 10px 15px; border-radius: 6px;">A: 99.9%</div>
<span style="color: #dfe6e9;">→</span>
<div style="background: #3498db; color: white; padding: 10px 15px; border-radius: 6px;">B: 99.9%</div>
<span style="color: #dfe6e9;">→</span>
<div style="background: #3498db; color: white; padding: 10px 15px; border-radius: 6px;">C: 99.9%</div>
</div>
<div style="color: #dfe6e9; font-family: monospace; font-size: 0.9em;">
Total = A × B × C = 0.999 × 0.999 × 0.999 = <strong style="color: #ff7675;">99.7%</strong>
</div>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
<h5 style="color: #55efc4; margin: 0 0 10px 0;">Components in Parallel (Any Can Work)</h5>
<div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap; margin-bottom: 10px;">
<div style="display: flex; flex-direction: column; gap: 5px;">
<div style="background: #27ae60; color: white; padding: 8px 15px; border-radius: 6px;">A: 99%</div>
<div style="background: #27ae60; color: white; padding: 8px 15px; border-radius: 6px;">B: 99%</div>
</div>
<span style="color: #dfe6e9; font-size: 0.9em;">Either can serve requests</span>
</div>
<div style="color: #dfe6e9; font-family: monospace; font-size: 0.9em;">
Total = 1 - (1-A) × (1-B) = 1 - 0.01 × 0.01 = <strong style="color: #55efc4;">99.99%</strong>
</div>
</div>
</div>
</div>

---

## Failover Strategies

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #0f3460;">
<h4 style="color: #e94560; margin-top: 0;">Failover Types</h4>
<div style="display: grid; gap: 15px;">
<div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border-left: 4px solid #e74c3c;">
<h5 style="color: #e74c3c; margin: 0 0 8px 0;">Cold Failover</h5>
<p style="color: #a0a0a0; margin: 0; font-size: 0.9em;">
Standby system is off. Started on primary failure. <strong>Slowest</strong> (minutes).<br>
<span style="color: #636e72;">Use case: Cost-sensitive, non-critical systems</span>
</p>
</div>
<div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border-left: 4px solid #f39c12;">
<h5 style="color: #f39c12; margin: 0 0 8px 0;">Warm Failover</h5>
<p style="color: #a0a0a0; margin: 0; font-size: 0.9em;">
Standby is running but not serving. Data synced. <strong>Moderate</strong> (seconds to minutes).<br>
<span style="color: #636e72;">Use case: Business applications, databases</span>
</p>
</div>
<div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border-left: 4px solid #27ae60;">
<h5 style="color: #27ae60; margin: 0 0 8px 0;">Hot Failover</h5>
<p style="color: #a0a0a0; margin: 0; font-size: 0.9em;">
Multiple actives serving traffic. Instant failover. <strong>Fastest</strong> (sub-second).<br>
<span style="color: #636e72;">Use case: Critical systems, financial applications</span>
</p>
</div>
</div>
</div>

### Failover Challenges

<div style="background: linear-gradient(135deg, #b71540 0%, #e74c3c 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #c0392b;">
<h4 style="color: #f1c40f; margin-top: 0;">Common Failover Issues</h4>
<div style="color: #fadbd8; font-size: 0.9em;">
<div style="display: grid; gap: 12px;">
<div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 6px;">
<strong style="color: #f1c40f;">Split Brain:</strong> Both nodes think they're primary. Can cause data corruption.<br>
<span style="color: #d5a6a6;">Solution: Quorum-based consensus, fencing, STONITH</span>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 6px;">
<strong style="color: #f1c40f;">Data Loss:</strong> Async replication may lose recent writes.<br>
<span style="color: #d5a6a6;">Solution: Sync replication (slower), log shipping, point-in-time recovery</span>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 6px;">
<strong style="color: #f1c40f;">Cascading Failures:</strong> Failover triggers overload on remaining nodes.<br>
<span style="color: #d5a6a6;">Solution: Circuit breakers, load shedding, proper capacity planning</span>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 6px;">
<strong style="color: #f1c40f;">False Positives:</strong> Network partition misinterpreted as failure.<br>
<span style="color: #d5a6a6;">Solution: Multiple health checks, heartbeats, timeout tuning</span>
</div>
</div>
</div>
</div>

---

## Multi-Region Architecture

<div style="background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #5b4e8d;">
<h4 style="color: #00d9ff; margin-top: 0;">Geographic Distribution</h4>
<div style="display: flex; justify-content: center; align-items: center; gap: 30px; flex-wrap: wrap; padding: 20px;">
<div style="text-align: center;">
<div style="background: #e74c3c; color: white; padding: 20px; border-radius: 8px; margin-bottom: 10px;">
<strong>US-East</strong><br>
<span style="font-size: 0.8em;">Primary</span>
</div>
<div style="font-size: 0.8em; color: #a0a0a0;">Virginia</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
<span style="color: #00d9ff; font-size: 0.8em;">Sync/Async</span>
<span style="color: #00d9ff;">⟷⟷⟷</span>
<span style="color: #00d9ff; font-size: 0.8em;">Replication</span>
</div>
<div style="text-align: center;">
<div style="background: #3498db; color: white; padding: 20px; border-radius: 8px; margin-bottom: 10px;">
<strong>EU-West</strong><br>
<span style="font-size: 0.8em;">Secondary</span>
</div>
<div style="font-size: 0.8em; color: #a0a0a0;">Ireland</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
<span style="color: #00d9ff; font-size: 0.8em;">Sync/Async</span>
<span style="color: #00d9ff;">⟷⟷⟷</span>
<span style="color: #00d9ff; font-size: 0.8em;">Replication</span>
</div>
<div style="text-align: center;">
<div style="background: #27ae60; color: white; padding: 20px; border-radius: 8px; margin-bottom: 10px;">
<strong>AP-Tokyo</strong><br>
<span style="font-size: 0.8em;">Secondary</span>
</div>
<div style="font-size: 0.8em; color: #a0a0a0;">Japan</div>
</div>
</div>
<div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin-top: 10px;">
<div style="color: #a0a0a0; font-size: 0.85em;">
<strong style="color: #00d9ff;">Benefits:</strong> Disaster recovery, reduced latency for global users, regulatory compliance<br>
<strong style="color: #00d9ff;">Challenges:</strong> Data consistency, increased complexity, higher costs
</div>
</div>
</div>

### Disaster Recovery Patterns

<div style="background: linear-gradient(135deg, #232526 0%, #414345 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #636e72;">
<h4 style="color: #00cec9; margin-top: 0;">DR Strategies (RPO/RTO Trade-offs)</h4>
<table style="width: 100%; border-collapse: collapse; font-size: 0.85em;">
<tr style="background: rgba(0, 206, 201, 0.2);">
<th style="padding: 12px; color: #00cec9; text-align: left; border-bottom: 2px solid #00cec9;">Strategy</th>
<th style="padding: 12px; color: #00cec9; text-align: center; border-bottom: 2px solid #00cec9;">RPO</th>
<th style="padding: 12px; color: #00cec9; text-align: center; border-bottom: 2px solid #00cec9;">RTO</th>
<th style="padding: 12px; color: #00cec9; text-align: center; border-bottom: 2px solid #00cec9;">Cost</th>
</tr>
<tr style="border-bottom: 1px solid #444;">
<td style="padding: 12px; color: #dfe6e9;"><strong>Backup & Restore</strong></td>
<td style="padding: 12px; color: #ff7675; text-align: center;">Hours</td>
<td style="padding: 12px; color: #ff7675; text-align: center;">Hours-Days</td>
<td style="padding: 12px; color: #55efc4; text-align: center;">$</td>
</tr>
<tr style="border-bottom: 1px solid #444;">
<td style="padding: 12px; color: #dfe6e9;"><strong>Pilot Light</strong></td>
<td style="padding: 12px; color: #ffeaa7; text-align: center;">Minutes</td>
<td style="padding: 12px; color: #ffeaa7; text-align: center;">Hours</td>
<td style="padding: 12px; color: #ffeaa7; text-align: center;">$$</td>
</tr>
<tr style="border-bottom: 1px solid #444;">
<td style="padding: 12px; color: #dfe6e9;"><strong>Warm Standby</strong></td>
<td style="padding: 12px; color: #55efc4; text-align: center;">Seconds</td>
<td style="padding: 12px; color: #ffeaa7; text-align: center;">Minutes</td>
<td style="padding: 12px; color: #fab1a0; text-align: center;">$$$</td>
</tr>
<tr>
<td style="padding: 12px; color: #dfe6e9;"><strong>Multi-Site Active</strong></td>
<td style="padding: 12px; color: #55efc4; text-align: center;">~Zero</td>
<td style="padding: 12px; color: #55efc4; text-align: center;">~Zero</td>
<td style="padding: 12px; color: #ff7675; text-align: center;">$$$$</td>
</tr>
</table>
<div style="margin-top: 15px; padding: 10px; background: rgba(0,0,0,0.2); border-radius: 6px; font-size: 0.85em;">
<strong style="color: #fdcb6e;">RPO</strong> (Recovery Point Objective): How much data can you afford to lose?<br>
<strong style="color: #fdcb6e;">RTO</strong> (Recovery Time Objective): How quickly must you recover?
</div>
</div>

---

## Health Checks and Monitoring

### Types of Health Checks

<div style="background: linear-gradient(135deg, #5b2c6f 0%, #8e44ad 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #9b59b6;">
<h4 style="color: #f5b041; margin-top: 0;">Health Check Patterns</h4>
<div style="display: grid; gap: 12px;">
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
<h5 style="color: #f5b041; margin: 0 0 8px 0;">Liveness Probe</h5>
<p style="color: #d7bde2; margin: 0; font-size: 0.9em;">
"Is the process running?" - Restart if unhealthy<br>
<code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px; color: #ecf0f1;">GET /health → 200 OK</code>
</p>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
<h5 style="color: #f5b041; margin: 0 0 8px 0;">Readiness Probe</h5>
<p style="color: #d7bde2; margin: 0; font-size: 0.9em;">
"Can it serve traffic?" - Remove from load balancer if not ready<br>
<code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px; color: #ecf0f1;">GET /ready → 200 OK (DB connected, caches warm)</code>
</p>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
<h5 style="color: #f5b041; margin: 0 0 8px 0;">Startup Probe</h5>
<p style="color: #d7bde2; margin: 0; font-size: 0.9em;">
"Has the app finished starting?" - Prevents premature liveness checks<br>
<code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px; color: #ecf0f1;">GET /startup → 200 OK (initialization complete)</code>
</p>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
<h5 style="color: #f5b041; margin: 0 0 8px 0;">Deep Health Check</h5>
<p style="color: #d7bde2; margin: 0; font-size: 0.9em;">
Checks all dependencies (DB, cache, external services)<br>
<code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px; color: #ecf0f1;">GET /health/deep → {db: ok, cache: ok, api: ok}</code>
</p>
</div>
</div>
</div>

### Monitoring for Availability

<div style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #3498db;">
<h4 style="color: #f39c12; margin-top: 0;">Key Metrics to Monitor</h4>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px; text-align: center;">
<div style="font-size: 2em; color: #55efc4;">📊</div>
<strong style="color: #ecf0f1;">Error Rate</strong><br>
<span style="color: #a0a0a0; font-size: 0.85em;">5xx errors / total requests</span>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px; text-align: center;">
<div style="font-size: 2em; color: #74b9ff;">⏱️</div>
<strong style="color: #ecf0f1;">Latency</strong><br>
<span style="color: #a0a0a0; font-size: 0.85em;">P50, P95, P99 response times</span>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px; text-align: center;">
<div style="font-size: 2em; color: #fdcb6e;">📈</div>
<strong style="color: #ecf0f1;">Throughput</strong><br>
<span style="color: #a0a0a0; font-size: 0.85em;">Requests per second</span>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px; text-align: center;">
<div style="font-size: 2em; color: #e17055;">💾</div>
<strong style="color: #ecf0f1;">Saturation</strong><br>
<span style="color: #a0a0a0; font-size: 0.85em;">CPU, memory, disk, connections</span>
</div>
</div>
</div>

---

## Resilience Patterns

### Circuit Breaker

<div style="background: linear-gradient(135deg, #0a3d62 0%, #1e5f74 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #3c6382;">
<h4 style="color: #f8c291; margin-top: 0;">Circuit Breaker States</h4>
<div style="display: flex; justify-content: center; align-items: center; gap: 20px; flex-wrap: wrap; padding: 20px;">
<div style="text-align: center;">
<div style="background: #27ae60; color: white; padding: 20px; border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
<strong>CLOSED</strong>
</div>
<div style="color: #a0a0a0; font-size: 0.8em; margin-top: 10px;">Normal operation</div>
</div>
<div style="color: #f8c291;">
<div>Failures exceed threshold</div>
<div style="font-size: 1.5em;">→→→</div>
</div>
<div style="text-align: center;">
<div style="background: #e74c3c; color: white; padding: 20px; border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
<strong>OPEN</strong>
</div>
<div style="color: #a0a0a0; font-size: 0.8em; margin-top: 10px;">Fail fast</div>
</div>
<div style="color: #f8c291;">
<div>Timeout expires</div>
<div style="font-size: 1.5em;">→→→</div>
</div>
<div style="text-align: center;">
<div style="background: #f39c12; color: white; padding: 20px; border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
<strong>HALF</strong>
</div>
<div style="color: #a0a0a0; font-size: 0.8em; margin-top: 10px;">Test recovery</div>
</div>
</div>
</div>

### Other Resilience Patterns

<div style="background: linear-gradient(135deg, #2d3436 0%, #636e72 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #b2bec3;">
<h4 style="color: #00b894; margin-top: 0;">Fault Tolerance Patterns</h4>
<div style="display: grid; gap: 12px; font-size: 0.9em;">
<div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px; display: flex; align-items: center; gap: 15px;">
<div style="background: #00b894; color: white; padding: 8px 12px; border-radius: 6px; min-width: 100px; text-align: center;">Retry</div>
<div style="color: #dfe6e9;">Automatic retry with exponential backoff for transient failures</div>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px; display: flex; align-items: center; gap: 15px;">
<div style="background: #0984e3; color: white; padding: 8px 12px; border-radius: 6px; min-width: 100px; text-align: center;">Timeout</div>
<div style="color: #dfe6e9;">Limit wait time for responses to prevent thread exhaustion</div>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px; display: flex; align-items: center; gap: 15px;">
<div style="background: #6c5ce7; color: white; padding: 8px 12px; border-radius: 6px; min-width: 100px; text-align: center;">Bulkhead</div>
<div style="color: #dfe6e9;">Isolate components so one failure doesn't cascade</div>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px; display: flex; align-items: center; gap: 15px;">
<div style="background: #fdcb6e; color: #2d3436; padding: 8px 12px; border-radius: 6px; min-width: 100px; text-align: center;">Fallback</div>
<div style="color: #dfe6e9;">Return cached or default response when primary fails</div>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px; display: flex; align-items: center; gap: 15px;">
<div style="background: #e17055; color: white; padding: 8px 12px; border-radius: 6px; min-width: 100px; text-align: center;">Rate Limit</div>
<div style="color: #dfe6e9;">Protect services from being overwhelmed by requests</div>
</div>
</div>
</div>

---

## Summary

<div style="background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #5b4e8d;">
<h4 style="color: #00d9ff; margin-top: 0;">Key Takeaways</h4>
<div style="display: grid; gap: 10px; color: #a0a0a0;">
<div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px;">
<strong style="color: #00d9ff;">Availability:</strong> Measured in "nines" - each nine is 10x harder to achieve
</div>
<div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px;">
<strong style="color: #00d9ff;">SLA/SLO/SLI:</strong> SLI measures, SLO targets, SLA promises (with penalties)
</div>
<div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px;">
<strong style="color: #00d9ff;">Redundancy:</strong> Active-passive for simplicity, active-active for performance
</div>
<div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px;">
<strong style="color: #00d9ff;">Failover:</strong> Cold (slow/cheap) → Warm → Hot (fast/expensive)
</div>
<div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px;">
<strong style="color: #00d9ff;">Resilience:</strong> Circuit breakers, retries, timeouts, bulkheads, fallbacks
</div>
<div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px;">
<strong style="color: #00d9ff;">Error Budget:</strong> 100% - SLO = allowable downtime for experimentation
</div>
</div>
</div>
