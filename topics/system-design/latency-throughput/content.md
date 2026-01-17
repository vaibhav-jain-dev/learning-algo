# Latency and Throughput

## Introduction

Latency and throughput are two fundamental performance metrics that determine how well a system responds to user requests and handles load. Understanding these concepts and the trade-offs between them is crucial for designing efficient distributed systems.

---

## Definitions

### Latency

**Latency** is the time it takes to complete a single operation or request. It's measured from the moment a request is initiated until the response is received.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #0f3460;">
<h4 style="color: #e94560; margin-top: 0;">Latency Visualization</h4>
<div style="font-family: monospace; font-size: 0.85em;">
<div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
<div style="background: #3498db; color: white; padding: 10px 15px; border-radius: 6px;">Client</div>
<div style="flex: 1; display: flex; align-items: center; position: relative;">
<div style="height: 2px; background: #f39c12; flex: 1;"></div>
<div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); color: #f39c12; font-size: 0.85em;">Request →</div>
</div>
<div style="background: #27ae60; color: white; padding: 10px 15px; border-radius: 6px;">Server</div>
</div>
<div style="display: flex; align-items: center; gap: 10px;">
<div style="background: #3498db; color: white; padding: 10px 15px; border-radius: 6px;">Client</div>
<div style="flex: 1; display: flex; align-items: center; position: relative;">
<div style="height: 2px; background: #00cec9; flex: 1;"></div>
<div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); color: #00cec9; font-size: 0.85em;">← Response</div>
</div>
<div style="background: #27ae60; color: white; padding: 10px 15px; border-radius: 6px;">Server</div>
</div>
</div>
<p style="color: #a0a0a0; margin-top: 15px; text-align: center; font-size: 0.9em;">
<strong style="color: #e94560;">Total Latency</strong> = Network (RTT) + Processing + Queuing + Serialization
</p>
</div>

### Throughput

**Throughput** is the number of operations or requests a system can handle per unit of time. It measures the system's capacity.

<div style="background: linear-gradient(135deg, #0a3d62 0%, #1e5f74 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #3c6382;">
<h4 style="color: #f8c291; margin-top: 0;">Throughput Visualization</h4>
<div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;">
<div style="text-align: center;">
<div style="display: flex; gap: 5px; margin-bottom: 10px;">
<div style="background: #74b9ff; width: 30px; height: 30px; border-radius: 4px;"></div>
<div style="background: #74b9ff; width: 30px; height: 30px; border-radius: 4px;"></div>
<div style="background: #74b9ff; width: 30px; height: 30px; border-radius: 4px;"></div>
<div style="background: #74b9ff; width: 30px; height: 30px; border-radius: 4px;"></div>
<div style="background: #74b9ff; width: 30px; height: 30px; border-radius: 4px;"></div>
</div>
<span style="color: #dfe6e9; font-size: 0.85em;">Incoming Requests</span>
</div>
<div style="color: #f8c291; font-size: 2em;">→</div>
<div style="background: #00b894; color: white; padding: 20px 30px; border-radius: 8px; text-align: center;">
<strong>System</strong><br>
<span style="font-size: 0.8em;">Processing</span>
</div>
<div style="color: #f8c291; font-size: 2em;">→</div>
<div style="text-align: center;">
<div style="display: flex; gap: 5px; margin-bottom: 10px;">
<div style="background: #55efc4; width: 30px; height: 30px; border-radius: 4px;"></div>
<div style="background: #55efc4; width: 30px; height: 30px; border-radius: 4px;"></div>
<div style="background: #55efc4; width: 30px; height: 30px; border-radius: 4px;"></div>
<div style="background: #55efc4; width: 30px; height: 30px; border-radius: 4px;"></div>
<div style="background: #55efc4; width: 30px; height: 30px; border-radius: 4px;"></div>
</div>
<span style="color: #dfe6e9; font-size: 0.85em;">Completed Responses</span>
</div>
</div>
<p style="color: #dfe6e9; margin-top: 15px; text-align: center; font-size: 0.9em;">
<strong style="color: #f8c291;">Throughput</strong> = 1000 requests/second (RPS)
</p>
</div>

---

## Key Latency Numbers

<div style="background: linear-gradient(135deg, #2d3436 0%, #000000 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #636e72;">
<h4 style="color: #74b9ff; margin-top: 0;">Latency Numbers Every Developer Should Know</h4>
<table style="width: 100%; border-collapse: collapse; font-size: 0.85em;">
<tr style="background: rgba(116, 185, 255, 0.2);">
<th style="padding: 12px; color: #74b9ff; text-align: left; border-bottom: 2px solid #74b9ff;">Operation</th>
<th style="padding: 12px; color: #74b9ff; text-align: right; border-bottom: 2px solid #74b9ff;">Latency</th>
<th style="padding: 12px; color: #74b9ff; text-align: left; border-bottom: 2px solid #74b9ff;">Comparison</th>
</tr>
<tr style="border-bottom: 1px solid #444;">
<td style="padding: 12px; color: #dfe6e9;">L1 cache reference</td>
<td style="padding: 12px; color: #55efc4; text-align: right;">0.5 ns</td>
<td style="padding: 12px; color: #636e72;">Instant</td>
</tr>
<tr style="border-bottom: 1px solid #444;">
<td style="padding: 12px; color: #dfe6e9;">L2 cache reference</td>
<td style="padding: 12px; color: #55efc4; text-align: right;">7 ns</td>
<td style="padding: 12px; color: #636e72;">14x L1</td>
</tr>
<tr style="border-bottom: 1px solid #444;">
<td style="padding: 12px; color: #dfe6e9;">Main memory (RAM)</td>
<td style="padding: 12px; color: #ffeaa7; text-align: right;">100 ns</td>
<td style="padding: 12px; color: #636e72;">200x L1</td>
</tr>
<tr style="border-bottom: 1px solid #444;">
<td style="padding: 12px; color: #dfe6e9;">SSD random read</td>
<td style="padding: 12px; color: #fab1a0; text-align: right;">150 μs</td>
<td style="padding: 12px; color: #636e72;">300,000x L1</td>
</tr>
<tr style="border-bottom: 1px solid #444;">
<td style="padding: 12px; color: #dfe6e9;">HDD seek</td>
<td style="padding: 12px; color: #ff7675; text-align: right;">10 ms</td>
<td style="padding: 12px; color: #636e72;">20,000,000x L1</td>
</tr>
<tr style="border-bottom: 1px solid #444;">
<td style="padding: 12px; color: #dfe6e9;">Same datacenter RTT</td>
<td style="padding: 12px; color: #fab1a0; text-align: right;">0.5 ms</td>
<td style="padding: 12px; color: #636e72;">1,000,000x L1</td>
</tr>
<tr style="border-bottom: 1px solid #444;">
<td style="padding: 12px; color: #dfe6e9;">California → Netherlands</td>
<td style="padding: 12px; color: #ff7675; text-align: right;">150 ms</td>
<td style="padding: 12px; color: #636e72;">300,000,000x L1</td>
</tr>
</table>
</div>

---

## Latency Components

<div style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #3498db;">
<h4 style="color: #f39c12; margin-top: 0;">Breaking Down Request Latency</h4>
<div style="display: flex; flex-direction: column; gap: 10px; font-family: monospace; font-size: 0.85em;">
<div style="display: flex; align-items: center; gap: 10px;">
<div style="background: #e74c3c; color: white; padding: 10px; border-radius: 6px; min-width: 150px; text-align: center;">DNS Lookup</div>
<div style="flex: 1; height: 20px; background: #e74c3c; border-radius: 4px; position: relative;">
<span style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: white; font-size: 0.8em;">~50ms (cached: 0ms)</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 10px;">
<div style="background: #f39c12; color: white; padding: 10px; border-radius: 6px; min-width: 150px; text-align: center;">TCP Handshake</div>
<div style="flex: 1; height: 20px; background: #f39c12; border-radius: 4px; position: relative;">
<span style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: white; font-size: 0.8em;">~1 RTT</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 10px;">
<div style="background: #9b59b6; color: white; padding: 10px; border-radius: 6px; min-width: 150px; text-align: center;">TLS Handshake</div>
<div style="flex: 1; height: 20px; background: #9b59b6; border-radius: 4px; position: relative;">
<span style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: white; font-size: 0.8em;">~1-2 RTT</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 10px;">
<div style="background: #3498db; color: white; padding: 10px; border-radius: 6px; min-width: 150px; text-align: center;">Request Transfer</div>
<div style="flex: 1; height: 20px; background: #3498db; border-radius: 4px; position: relative;">
<span style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: white; font-size: 0.8em;">size/bandwidth</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 10px;">
<div style="background: #27ae60; color: white; padding: 10px; border-radius: 6px; min-width: 150px; text-align: center;">Server Processing</div>
<div style="flex: 1; height: 20px; background: #27ae60; border-radius: 4px; position: relative;">
<span style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: white; font-size: 0.8em;">varies (10ms-1s+)</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 10px;">
<div style="background: #00cec9; color: white; padding: 10px; border-radius: 6px; min-width: 150px; text-align: center;">Response Transfer</div>
<div style="flex: 1; height: 20px; background: #00cec9; border-radius: 4px; position: relative;">
<span style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: white; font-size: 0.8em;">size/bandwidth</span>
</div>
</div>
</div>
</div>

### Types of Latency

| Type | Description | Example |
|------|-------------|---------|
| **Network Latency** | Time for data to travel across network | RTT between client and server |
| **Disk Latency** | Time to read/write from storage | SSD: 150μs, HDD: 10ms |
| **Processing Latency** | Time spent computing | CPU-bound algorithm execution |
| **Queuing Latency** | Time waiting in queue | Request waiting for available worker |
| **Propagation Latency** | Time based on distance | Speed of light in fiber (~5μs/km) |

---

## Latency Percentiles

<div style="background: linear-gradient(135deg, #0c2461 0%, #1e3799 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #3867d6;">
<h4 style="color: #fed330; margin-top: 0;">Understanding Percentiles (P50, P95, P99)</h4>
<div style="background: rgba(0,0,0,0.2); padding: 20px; border-radius: 8px;">
<div style="display: flex; align-items: flex-end; gap: 5px; height: 150px; margin-bottom: 20px;">
<div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
<div style="background: #55efc4; width: 100%; height: 30px; border-radius: 4px 4px 0 0;"></div>
<span style="color: #a0a0a0; font-size: 0.7em; margin-top: 5px;">10ms</span>
</div>
<div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
<div style="background: #55efc4; width: 100%; height: 80px; border-radius: 4px 4px 0 0;"></div>
<span style="color: #a0a0a0; font-size: 0.7em; margin-top: 5px;">15ms</span>
</div>
<div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
<div style="background: #55efc4; width: 100%; height: 130px; border-radius: 4px 4px 0 0;"></div>
<span style="color: #fed330; font-size: 0.7em; margin-top: 5px;">P50</span>
</div>
<div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
<div style="background: #55efc4; width: 100%; height: 100px; border-radius: 4px 4px 0 0;"></div>
<span style="color: #a0a0a0; font-size: 0.7em; margin-top: 5px;">25ms</span>
</div>
<div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
<div style="background: #ffeaa7; width: 100%; height: 60px; border-radius: 4px 4px 0 0;"></div>
<span style="color: #a0a0a0; font-size: 0.7em; margin-top: 5px;">50ms</span>
</div>
<div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
<div style="background: #fab1a0; width: 100%; height: 40px; border-radius: 4px 4px 0 0;"></div>
<span style="color: #fab1a0; font-size: 0.7em; margin-top: 5px;">P95</span>
</div>
<div style="flex: 1; display: flex; flex-direction: column; align-items: center;">
<div style="background: #ff7675; width: 100%; height: 20px; border-radius: 4px 4px 0 0;"></div>
<span style="color: #ff7675; font-size: 0.7em; margin-top: 5px;">P99</span>
</div>
</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; font-size: 0.85em;">
<div style="text-align: center; color: #fed330;">
<strong>P50 (Median)</strong><br>
<span style="color: #a0a0a0;">20ms</span><br>
<span style="font-size: 0.8em; color: #636e72;">50% of requests</span>
</div>
<div style="text-align: center; color: #fab1a0;">
<strong>P95</strong><br>
<span style="color: #a0a0a0;">100ms</span><br>
<span style="font-size: 0.8em; color: #636e72;">95% of requests</span>
</div>
<div style="text-align: center; color: #ff7675;">
<strong>P99</strong><br>
<span style="color: #a0a0a0;">500ms</span><br>
<span style="font-size: 0.8em; color: #636e72;">99% of requests</span>
</div>
</div>
</div>
<p style="color: #a0a0a0; margin-top: 15px; font-size: 0.85em;">
<strong>Why P99 matters:</strong> If you have 1M daily users, P99 = 500ms means 10,000 users experience half-second delays daily.
</p>
</div>

### Tail Latency Amplification

<div style="background: linear-gradient(135deg, #b71540 0%, #e74c3c 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #c0392b;">
<h4 style="color: #f1c40f; margin-top: 0;">The Tail at Scale Problem</h4>
<div style="color: #fadbd8; font-size: 0.9em;">
<p>When a request fans out to multiple services, the slowest service determines overall latency.</p>
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong style="color: #f1c40f;">Example: 100 parallel requests, each with P99 = 10ms</strong><br><br>
Probability ALL complete in 10ms = 0.99^100 = <strong style="color: #ff7675;">37%</strong><br>
Probability at least ONE exceeds 10ms = <strong style="color: #ff7675;">63%</strong>
</div>
<p><strong>Mitigation strategies:</strong></p>
<ul style="margin: 0; padding-left: 20px;">
<li>Hedged requests (send duplicate requests, use first response)</li>
<li>Tied requests (queue request, cancel others when one starts)</li>
<li>Selective replication (critical paths only)</li>
</ul>
</div>
</div>

---

## Throughput Patterns

### Little's Law

<div style="background: linear-gradient(135deg, #134e5e 0%, #71b280 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #27ae60;">
<h4 style="color: #f1c40f; margin-top: 0;">Little's Law</h4>
<div style="text-align: center; padding: 20px;">
<div style="background: rgba(0,0,0,0.3); display: inline-block; padding: 20px 40px; border-radius: 10px;">
<span style="color: #f1c40f; font-size: 1.5em; font-family: monospace;"><strong>L = λ × W</strong></span>
</div>
</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px; font-size: 0.9em;">
<div style="text-align: center; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
<strong style="color: #55efc4;">L</strong><br>
<span style="color: #b2bec3;">Average items in system</span><br>
<span style="font-size: 0.8em; color: #636e72;">(concurrent requests)</span>
</div>
<div style="text-align: center; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
<strong style="color: #55efc4;">λ (lambda)</strong><br>
<span style="color: #b2bec3;">Arrival rate</span><br>
<span style="font-size: 0.8em; color: #636e72;">(throughput)</span>
</div>
<div style="text-align: center; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
<strong style="color: #55efc4;">W</strong><br>
<span style="color: #b2bec3;">Average time in system</span><br>
<span style="font-size: 0.8em; color: #636e72;">(latency)</span>
</div>
</div>
<div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px; margin-top: 20px;">
<strong style="color: #f1c40f;">Example:</strong>
<span style="color: #b2bec3;">If you have 100 concurrent connections and 50ms average latency:</span><br>
<span style="color: #55efc4; font-family: monospace;">Throughput = 100 / 0.05s = 2,000 requests/second</span>
</div>
</div>

### Throughput Units

| Unit | Description | Use Case |
|------|-------------|----------|
| **RPS** | Requests per second | API servers |
| **QPS** | Queries per second | Databases |
| **TPS** | Transactions per second | Payment systems |
| **IOPS** | I/O operations per second | Storage systems |
| **Mbps/Gbps** | Megabits/Gigabits per second | Network bandwidth |

---

## Latency vs Throughput Trade-offs

<div style="background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #7f8c8d;">
<h4 style="color: #1abc9c; margin-top: 0;">The Latency-Throughput Curve</h4>
<div style="padding: 20px; text-align: center;">
<div style="display: inline-block; position: relative; width: 300px; height: 200px; border-left: 2px solid #95a5a6; border-bottom: 2px solid #95a5a6;">
<div style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); color: #95a5a6; font-size: 0.8em;">Throughput →</div>
<div style="position: absolute; left: -60px; top: 50%; transform: translateY(-50%) rotate(-90deg); color: #95a5a6; font-size: 0.8em;">Latency →</div>
<div style="position: absolute; bottom: 10px; left: 10px; width: 250px; height: 150px; border: 3px solid #1abc9c; border-radius: 0 0 100% 0; border-left: none; border-top: none;"></div>
<div style="position: absolute; bottom: 60px; left: 80px; color: #55efc4; font-size: 0.8em;">
Optimal<br>Zone
</div>
<div style="position: absolute; top: 20px; right: 20px; color: #ff7675; font-size: 0.8em;">
Saturated<br>(high latency)
</div>
</div>
</div>
<p style="color: #95a5a6; margin-top: 15px; text-align: center; font-size: 0.85em;">
As throughput approaches system capacity, latency increases exponentially
</p>
</div>

### Common Trade-off Scenarios

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #0f3460;">
<h4 style="color: #e94560; margin-top: 0;">Trade-off Examples</h4>
<div style="display: grid; gap: 15px;">
<div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border-left: 4px solid #3498db;">
<h5 style="color: #3498db; margin: 0 0 10px 0;">Batching</h5>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 0.85em;">
<div>
<span style="color: #55efc4;">↑ Higher Throughput</span><br>
<span style="color: #a0a0a0;">Process 100 items together</span>
</div>
<div>
<span style="color: #ff7675;">↑ Higher Latency</span><br>
<span style="color: #a0a0a0;">Wait for batch to fill</span>
</div>
</div>
</div>
<div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border-left: 4px solid #e74c3c;">
<h5 style="color: #e74c3c; margin: 0 0 10px 0;">Connection Pooling</h5>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 0.85em;">
<div>
<span style="color: #55efc4;">↑ Higher Throughput</span><br>
<span style="color: #a0a0a0;">Reuse connections</span>
</div>
<div>
<span style="color: #ffeaa7;">~ Same Latency</span><br>
<span style="color: #a0a0a0;">No connection setup</span>
</div>
</div>
</div>
<div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border-left: 4px solid #27ae60;">
<h5 style="color: #27ae60; margin: 0 0 10px 0;">Caching</h5>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 0.85em;">
<div>
<span style="color: #55efc4;">↑ Higher Throughput</span><br>
<span style="color: #a0a0a0;">Reduce backend load</span>
</div>
<div>
<span style="color: #55efc4;">↓ Lower Latency</span><br>
<span style="color: #a0a0a0;">Cache hits are fast</span>
</div>
</div>
</div>
<div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border-left: 4px solid #9b59b6;">
<h5 style="color: #9b59b6; margin: 0 0 10px 0;">Async Processing</h5>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 0.85em;">
<div>
<span style="color: #55efc4;">↑ Higher Throughput</span><br>
<span style="color: #a0a0a0;">Don't block on I/O</span>
</div>
<div>
<span style="color: #55efc4;">↓ Lower Latency</span><br>
<span style="color: #a0a0a0;">Immediate response</span>
</div>
</div>
</div>
</div>
</div>

---

## Optimization Techniques

### Reducing Latency

<div style="background: linear-gradient(135deg, #0a3d62 0%, #1e5f74 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #3c6382;">
<h4 style="color: #f8c291; margin-top: 0;">Latency Reduction Strategies</h4>
<div style="display: grid; gap: 12px; color: #dfe6e9; font-size: 0.9em;">
<div style="display: flex; align-items: center; gap: 15px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px;">
<div style="background: #00b894; color: white; padding: 8px 12px; border-radius: 6px; min-width: 40px; text-align: center;">1</div>
<div><strong>Caching</strong> - Store frequently accessed data in memory (Redis, Memcached)</div>
</div>
<div style="display: flex; align-items: center; gap: 15px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px;">
<div style="background: #00b894; color: white; padding: 8px 12px; border-radius: 6px; min-width: 40px; text-align: center;">2</div>
<div><strong>CDN</strong> - Serve static content from edge locations close to users</div>
</div>
<div style="display: flex; align-items: center; gap: 15px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px;">
<div style="background: #00b894; color: white; padding: 8px 12px; border-radius: 6px; min-width: 40px; text-align: center;">3</div>
<div><strong>Connection Pooling</strong> - Reuse database and HTTP connections</div>
</div>
<div style="display: flex; align-items: center; gap: 15px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px;">
<div style="background: #00b894; color: white; padding: 8px 12px; border-radius: 6px; min-width: 40px; text-align: center;">4</div>
<div><strong>Async I/O</strong> - Non-blocking operations (async/await, event loops)</div>
</div>
<div style="display: flex; align-items: center; gap: 15px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px;">
<div style="background: #00b894; color: white; padding: 8px 12px; border-radius: 6px; min-width: 40px; text-align: center;">5</div>
<div><strong>Precomputation</strong> - Calculate results ahead of time</div>
</div>
<div style="display: flex; align-items: center; gap: 15px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px;">
<div style="background: #00b894; color: white; padding: 8px 12px; border-radius: 6px; min-width: 40px; text-align: center;">6</div>
<div><strong>Protocol Optimization</strong> - HTTP/2, gRPC, connection keep-alive</div>
</div>
</div>
</div>

### Increasing Throughput

<div style="background: linear-gradient(135deg, #5b2c6f 0%, #8e44ad 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #9b59b6;">
<h4 style="color: #f5b041; margin-top: 0;">Throughput Improvement Strategies</h4>
<div style="display: grid; gap: 12px; color: #d7bde2; font-size: 0.9em;">
<div style="display: flex; align-items: center; gap: 15px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px;">
<div style="background: #f5b041; color: #2d3436; padding: 8px 12px; border-radius: 6px; min-width: 40px; text-align: center;">1</div>
<div><strong>Horizontal Scaling</strong> - Add more servers behind load balancer</div>
</div>
<div style="display: flex; align-items: center; gap: 15px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px;">
<div style="background: #f5b041; color: #2d3436; padding: 8px 12px; border-radius: 6px; min-width: 40px; text-align: center;">2</div>
<div><strong>Vertical Scaling</strong> - Bigger machines (more CPU, RAM)</div>
</div>
<div style="display: flex; align-items: center; gap: 15px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px;">
<div style="background: #f5b041; color: #2d3436; padding: 8px 12px; border-radius: 6px; min-width: 40px; text-align: center;">3</div>
<div><strong>Database Optimization</strong> - Indexing, query optimization, read replicas</div>
</div>
<div style="display: flex; align-items: center; gap: 15px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px;">
<div style="background: #f5b041; color: #2d3436; padding: 8px 12px; border-radius: 6px; min-width: 40px; text-align: center;">4</div>
<div><strong>Batching</strong> - Group operations to reduce overhead</div>
</div>
<div style="display: flex; align-items: center; gap: 15px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px;">
<div style="background: #f5b041; color: #2d3436; padding: 8px 12px; border-radius: 6px; min-width: 40px; text-align: center;">5</div>
<div><strong>Load Shedding</strong> - Reject requests during overload to protect system</div>
</div>
<div style="display: flex; align-items: center; gap: 15px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px;">
<div style="background: #f5b041; color: #2d3436; padding: 8px 12px; border-radius: 6px; min-width: 40px; text-align: center;">6</div>
<div><strong>Sharding</strong> - Distribute data across multiple databases</div>
</div>
</div>
</div>

---

## Real-World Benchmarks

<div style="background: linear-gradient(135deg, #232526 0%, #414345 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #636e72;">
<h4 style="color: #00cec9; margin-top: 0;">Industry Performance Targets</h4>
<table style="width: 100%; border-collapse: collapse; font-size: 0.85em;">
<tr style="background: rgba(0, 206, 201, 0.2);">
<th style="padding: 12px; color: #00cec9; text-align: left; border-bottom: 2px solid #00cec9;">Service Type</th>
<th style="padding: 12px; color: #00cec9; text-align: center; border-bottom: 2px solid #00cec9;">P50 Latency</th>
<th style="padding: 12px; color: #00cec9; text-align: center; border-bottom: 2px solid #00cec9;">P99 Latency</th>
<th style="padding: 12px; color: #00cec9; text-align: center; border-bottom: 2px solid #00cec9;">Throughput</th>
</tr>
<tr style="border-bottom: 1px solid #444;">
<td style="padding: 12px; color: #dfe6e9;">Web Page Load</td>
<td style="padding: 12px; color: #55efc4; text-align: center;">&lt; 200ms</td>
<td style="padding: 12px; color: #ffeaa7; text-align: center;">&lt; 1s</td>
<td style="padding: 12px; color: #a0a0a0; text-align: center;">-</td>
</tr>
<tr style="border-bottom: 1px solid #444;">
<td style="padding: 12px; color: #dfe6e9;">API Response</td>
<td style="padding: 12px; color: #55efc4; text-align: center;">&lt; 100ms</td>
<td style="padding: 12px; color: #ffeaa7; text-align: center;">&lt; 500ms</td>
<td style="padding: 12px; color: #a0a0a0; text-align: center;">1K-100K RPS</td>
</tr>
<tr style="border-bottom: 1px solid #444;">
<td style="padding: 12px; color: #dfe6e9;">Database Query</td>
<td style="padding: 12px; color: #55efc4; text-align: center;">&lt; 10ms</td>
<td style="padding: 12px; color: #ffeaa7; text-align: center;">&lt; 100ms</td>
<td style="padding: 12px; color: #a0a0a0; text-align: center;">10K-1M QPS</td>
</tr>
<tr style="border-bottom: 1px solid #444;">
<td style="padding: 12px; color: #dfe6e9;">Cache Hit</td>
<td style="padding: 12px; color: #55efc4; text-align: center;">&lt; 1ms</td>
<td style="padding: 12px; color: #ffeaa7; text-align: center;">&lt; 5ms</td>
<td style="padding: 12px; color: #a0a0a0; text-align: center;">100K-1M RPS</td>
</tr>
<tr>
<td style="padding: 12px; color: #dfe6e9;">Real-time Gaming</td>
<td style="padding: 12px; color: #55efc4; text-align: center;">&lt; 50ms</td>
<td style="padding: 12px; color: #ffeaa7; text-align: center;">&lt; 100ms</td>
<td style="padding: 12px; color: #a0a0a0; text-align: center;">Varies</td>
</tr>
</table>
</div>

---

## Summary

<div style="background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #5b4e8d;">
<h4 style="color: #00d9ff; margin-top: 0;">Key Takeaways</h4>
<div style="display: grid; gap: 10px; color: #a0a0a0;">
<div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px;">
<strong style="color: #00d9ff;">Latency:</strong> Time for one operation. Measure P50, P95, P99 - not just averages
</div>
<div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px;">
<strong style="color: #00d9ff;">Throughput:</strong> Operations per second. Use Little's Law: L = λ × W
</div>
<div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px;">
<strong style="color: #00d9ff;">Trade-offs:</strong> Batching increases throughput but adds latency; caching improves both
</div>
<div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px;">
<strong style="color: #00d9ff;">Tail Latency:</strong> P99 matters more than P50 for user experience at scale
</div>
<div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px;">
<strong style="color: #00d9ff;">Optimization:</strong> Cache, pool connections, use CDNs, scale horizontally
</div>
</div>
</div>
