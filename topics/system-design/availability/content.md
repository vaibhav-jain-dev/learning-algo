# Availability

## Overview

Availability measures the percentage of time a system is operational and accessible to users. In simple terms, it answers the question: **"When I try to use this system, will it work?"**

Think of availability like a store's operating hours, but instead of closing at night, we aim to be open 24/7/365. The challenge is that unlike a store, software systems have countless components that can fail - servers, networks, databases, and code itself.

<div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: #f8fafc; font-size: 18px;">Core Availability Equations</h4>
  <div style="display: grid; gap: 16px;">
    <div style="font-family: 'Courier New', monospace; font-size: 15px; background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px; text-align: center;">
      <strong>Availability = Uptime / (Uptime + Downtime) x 100%</strong>
    </div>
    <div style="font-family: 'Courier New', monospace; font-size: 15px; background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px; text-align: center;">
      <strong>Availability = MTBF / (MTBF + MTTR)</strong>
    </div>
  </div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px;">
    <div style="background: rgba(34, 197, 94, 0.2); padding: 12px 16px; border-radius: 8px; border: 1px solid rgba(34, 197, 94, 0.4);">
      <strong style="color: #86efac;">MTBF (Mean Time Between Failures)</strong>
      <p style="color: #bbf7d0; margin: 4px 0 0 0; font-size: 13px;">Average time system operates without failure</p>
    </div>
    <div style="background: rgba(239, 68, 68, 0.2); padding: 12px 16px; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.4);">
      <strong style="color: #fca5a5;">MTTR (Mean Time To Recovery)</strong>
      <p style="color: #fecaca; margin: 4px 0 0 0; font-size: 13px;">Average time to restore service after failure</p>
    </div>
  </div>
</div>

**Critical Insight**: <span style="color: #22c55e; font-weight: 600;">You can improve availability by either increasing MTBF (preventing failures) or decreasing MTTR (recovering faster)</span>. In practice, reducing MTTR is often more cost-effective than preventing every possible failure.

**Key Trade-off**: Higher availability costs exponentially more. Each additional "nine" requires roughly 10x the engineering investment. Design for the availability level your business actually needs, not what sounds impressive.

---

## Section 1: The Nines of Availability

### Deep Mechanics

The "nines" notation provides a standardized way to express availability targets. Each additional nine represents a 10x reduction in allowed downtime, making it exponentially harder to achieve.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Availability Levels Explained</h4>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <tr style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%);">
      <th style="padding: 14px; text-align: left; color: white; border-bottom: 2px solid #e2e8f0;">Availability</th>
      <th style="padding: 14px; text-align: center; color: white; border-bottom: 2px solid #e2e8f0;">Nines</th>
      <th style="padding: 14px; text-align: center; color: white; border-bottom: 2px solid #e2e8f0;">Downtime/Year</th>
      <th style="padding: 14px; text-align: center; color: white; border-bottom: 2px solid #e2e8f0;">Downtime/Month</th>
      <th style="padding: 14px; text-align: left; color: white; border-bottom: 2px solid #e2e8f0;">Requirements</th>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 14px; color: #475569;">99%</td>
      <td style="padding: 14px; text-align: center;"><span style="background: #fee2e2; color: #dc2626; padding: 4px 10px; border-radius: 12px; font-weight: 600;">2 nines</span></td>
      <td style="padding: 14px; text-align: center; color: #dc2626; font-weight: 600;">3.65 days</td>
      <td style="padding: 14px; text-align: center; color: #dc2626;">7.2 hours</td>
      <td style="padding: 14px; color: #475569;">Basic redundancy, manual recovery</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
      <td style="padding: 14px; color: #475569;">99.9%</td>
      <td style="padding: 14px; text-align: center;"><span style="background: #fef3c7; color: #d97706; padding: 4px 10px; border-radius: 12px; font-weight: 600;">3 nines</span></td>
      <td style="padding: 14px; text-align: center; color: #d97706; font-weight: 600;">8.76 hours</td>
      <td style="padding: 14px; text-align: center; color: #d97706;">43.8 min</td>
      <td style="padding: 14px; color: #475569;">Load balancing, health checks, automated alerts</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 14px; color: #475569;">99.99%</td>
      <td style="padding: 14px; text-align: center;"><span style="background: #dcfce7; color: #16a34a; padding: 4px 10px; border-radius: 12px; font-weight: 600;">4 nines</span></td>
      <td style="padding: 14px; text-align: center; color: #16a34a; font-weight: 600;">52.6 min</td>
      <td style="padding: 14px; text-align: center; color: #16a34a;">4.38 min</td>
      <td style="padding: 14px; color: #475569;">Automated failover, multi-AZ, zero-downtime deployments</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
      <td style="padding: 14px; color: #475569;">99.999%</td>
      <td style="padding: 14px; text-align: center;"><span style="background: #dbeafe; color: #2563eb; padding: 4px 10px; border-radius: 12px; font-weight: 600;">5 nines</span></td>
      <td style="padding: 14px; text-align: center; color: #2563eb; font-weight: 600;">5.26 min</td>
      <td style="padding: 14px; text-align: center; color: #2563eb;">26.3 sec</td>
      <td style="padding: 14px; color: #475569;">Multi-region, active-active, chaos engineering</td>
    </tr>
    <tr>
      <td style="padding: 14px; color: #475569;">99.9999%</td>
      <td style="padding: 14px; text-align: center;"><span style="background: #f3e8ff; color: #7c3aed; padding: 4px 10px; border-radius: 12px; font-weight: 600;">6 nines</span></td>
      <td style="padding: 14px; text-align: center; color: #7c3aed; font-weight: 600;">31.5 sec</td>
      <td style="padding: 14px; text-align: center; color: #7c3aed;">2.63 sec</td>
      <td style="padding: 14px; color: #475569;">Hot standby everywhere, real-time replication, specialized hardware</td>
    </tr>
  </table>
</div>

### Calculating Composite System Availability

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #166534; margin-top: 0;">Availability Mathematics</h4>

  <div style="display: grid; gap: 20px;">
    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #22c55e;">
      <strong style="color: #166534; font-size: 16px;">Components in Series (ALL must work)</strong>
      <p style="color: #475569; margin: 12px 0; font-size: 14px;">When components are chained together, failures multiply. This is why microservices architectures are harder to keep available.</p>
      <div style="display: flex; align-items: center; gap: 12px; margin: 16px 0; flex-wrap: wrap;">
        <div style="background: #3b82f6; color: white; padding: 12px 20px; border-radius: 8px; text-align: center;">
          <strong>Web Server</strong><br><span style="font-size: 12px;">99.9%</span>
        </div>
        <span style="color: #64748b; font-size: 20px;">→</span>
        <div style="background: #3b82f6; color: white; padding: 12px 20px; border-radius: 8px; text-align: center;">
          <strong>App Server</strong><br><span style="font-size: 12px;">99.9%</span>
        </div>
        <span style="color: #64748b; font-size: 20px;">→</span>
        <div style="background: #3b82f6; color: white; padding: 12px 20px; border-radius: 8px; text-align: center;">
          <strong>Database</strong><br><span style="font-size: 12px;">99.9%</span>
        </div>
      </div>
      <div style="background: #f1f5f9; padding: 12px 16px; border-radius: 6px; font-family: monospace;">
        Total = 0.999 × 0.999 × 0.999 = <strong style="color: #dc2626;">99.7%</strong> (not 99.9%!)
      </div>
      <p style="color: #64748b; margin: 8px 0 0 0; font-size: 13px;">Three 3-nines components in series give you less than 3 nines total.</p>
    </div>

    <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #16a34a;">
      <strong style="color: #166534; font-size: 16px;">Components in Parallel (ANY can work)</strong>
      <p style="color: #475569; margin: 12px 0; font-size: 14px;">Redundancy dramatically improves availability. Two unreliable components together can be more reliable than one excellent component.</p>
      <div style="display: flex; align-items: center; gap: 16px; margin: 16px 0;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="background: #10b981; color: white; padding: 12px 20px; border-radius: 8px; text-align: center;">
            <strong>Server A</strong><br><span style="font-size: 12px;">99%</span>
          </div>
          <div style="background: #10b981; color: white; padding: 12px 20px; border-radius: 8px; text-align: center;">
            <strong>Server B</strong><br><span style="font-size: 12px;">99%</span>
          </div>
        </div>
        <span style="color: #64748b;">Either can handle the request</span>
      </div>
      <div style="background: #f1f5f9; padding: 12px 16px; border-radius: 6px; font-family: monospace;">
        Total = 1 - (1-0.99) × (1-0.99) = 1 - 0.0001 = <strong style="color: #16a34a;">99.99%</strong>
      </div>
      <p style="color: #64748b; margin: 8px 0 0 0; font-size: 13px;">Two 2-nines servers in parallel give you 4 nines!</p>
    </div>
  </div>
</div>

### Interview Questions: Nines of Availability (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: What does "five nines" availability mean and why is it so hard to achieve?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> <span style="color: #22c55e; font-weight: 600;">Five nines (99.999%) means only 5.26 minutes of downtime per year</span>. This is extremely difficult because: (1) Every component in the request path must be redundant - a single point of failure destroys your SLA. (2) Planned maintenance counts as downtime, so you need zero-downtime deployments. (3) You need automated failover that completes in seconds, not minutes. (4) Human response time is too slow - everything must be automated. (5) You need multi-region deployment to survive datacenter failures. Most companies claiming 5 nines actually measure differently (excluding planned maintenance, only counting certain endpoints, etc.).</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: How do dependencies affect system availability? If your payment provider has 99.9% availability, can your checkout ever exceed that?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Dependencies create an <span style="color: #22c55e; font-weight: 600;">availability ceiling</span> - you cannot exceed your least available critical dependency. However, you can design around this: (1) <strong>Graceful degradation</strong>: If payment fails, queue the order and process asynchronously, showing "payment pending" instead of failing. (2) <strong>Multi-provider failover</strong>: Use Stripe as primary, PayPal as backup - combined availability exceeds either alone. (3) <strong>Caching</strong>: Cache authorization responses to handle temporary provider outages. (4) <strong>Circuit breakers</strong>: Fail fast and show cached prices if pricing service is down. (5) <strong>Async processing</strong>: Decouple critical path from non-critical dependencies using message queues. The key insight: <span style="color: #22c55e; font-weight: 600;">design so dependency failures cause degradation, not total outage</span>. See [[circuit-breaker]](/topic/design-patterns/circuit-breaker) for implementation patterns.</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: Your system has 10 microservices in the critical path, each with 99.9% availability. The product owner demands 99.99% system availability. How do you achieve this?</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> With 10 services at 99.9% in series, current availability is 0.999^10 = 99.0%. To reach 99.99%, you need a multi-pronged approach: (1) <strong>Reduce critical path length</strong>: Analyze if all 10 services truly need to be synchronous. Move audit logging, notifications to async queues. Target &lt;5 services in critical path. (2) <strong>Add redundancy per service</strong>: Each service needs multiple instances behind load balancers. Two instances at 99.9% each give 99.9999% per service. (3) <strong>Implement caching layers</strong>: Cache responses from stable services (product catalog, user profiles). Cache hit = no dependency call. (4) <strong>Use timeouts + retries with different instances</strong>: If instance A fails, retry to instance B. Combined with fast health checks, this catches transient failures. (5) <strong>Circuit breakers with fallbacks</strong>: When service degrades, return cached/default data instead of failing. (6) <strong>Multi-AZ deployment</strong>: Each service runs in 3 availability zones. AZ failure doesn't take down service. (7) <strong>Measure at the right granularity</strong>: Define SLOs per user journey, not per service. "Add to cart" might tolerate recommendations service being down. Math validation: If you reduce to 5 critical services, each with 2 redundant instances at 99.9% (giving 99.9999% per service), system availability = 0.999999^5 = 99.9995%. This exceeds 99.99% target with margin for error budget. Related: [[load-balancing]](/topic/system-design/load-balancing), [[caching]](/topic/system-design/caching).</p>
    </div>
  </div>
</div>

---

## Section 2: MTBF and MTTR Deep Dive

### Deep Mechanics

<span style="color: #22c55e; font-weight: 600;">MTBF (Mean Time Between Failures)</span> and <span style="color: #22c55e; font-weight: 600;">MTTR (Mean Time To Recovery)</span> are the two fundamental levers for improving availability. Understanding their relationship is crucial for making informed architecture decisions.

<div style="background: linear-gradient(135deg, #059669 0%, #34d399 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: white; font-size: 18px;">MTBF vs MTTR Trade-offs</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 16px;">
    <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 12px;">
      <strong style="color: white; font-size: 16px;">Increase MTBF (Prevent Failures)</strong>
      <ul style="color: #a7f3d0; margin: 12px 0 0 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
        <li>Higher quality hardware</li>
        <li>Extensive testing</li>
        <li>Code reviews</li>
        <li>Gradual rollouts</li>
        <li>Redundant components</li>
      </ul>
      <p style="color: #bbf7d0; margin: 12px 0 0 0; font-size: 13px; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 12px;"><strong>Cost:</strong> High upfront investment, diminishing returns</p>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 12px;">
      <strong style="color: white; font-size: 16px;">Decrease MTTR (Recover Faster)</strong>
      <ul style="color: #a7f3d0; margin: 12px 0 0 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
        <li>Automated monitoring</li>
        <li>Fast rollback mechanisms</li>
        <li>Runbooks and playbooks</li>
        <li>Auto-scaling/healing</li>
        <li>Chaos engineering practice</li>
      </ul>
      <p style="color: #bbf7d0; margin: 12px 0 0 0; font-size: 13px; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 12px;"><strong>Cost:</strong> Ongoing operational investment, high leverage</p>
    </div>
  </div>
</div>

### MTTR Breakdown

MTTR is composed of multiple phases, each of which can be optimized:

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Components of MTTR</h4>

  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #ef4444; color: white; min-width: 120px; padding: 16px; border-radius: 8px; text-align: center;">
        <strong style="font-size: 14px;">MTTD</strong>
        <p style="margin: 4px 0 0 0; font-size: 11px;">Time to Detect</p>
      </div>
      <div style="flex: 1; background: #fef2f2; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
        <p style="margin: 0; color: #475569; font-size: 14px;"><strong style="color: #991b1b;">How long until you know there's a problem?</strong> Reduce with: real-time monitoring, synthetic transactions, user error tracking, anomaly detection. Target: &lt;1 minute.</p>
      </div>
    </div>

    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #f59e0b; color: white; min-width: 120px; padding: 16px; border-radius: 8px; text-align: center;">
        <strong style="font-size: 14px;">MTTI</strong>
        <p style="margin: 4px 0 0 0; font-size: 11px;">Time to Identify</p>
      </div>
      <div style="flex: 1; background: #fffbeb; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b;">
        <p style="margin: 0; color: #475569; font-size: 14px;"><strong style="color: #92400e;">How long to find the root cause?</strong> Reduce with: distributed tracing, centralized logging, dashboards, runbooks, AI-assisted diagnosis. Target: &lt;5 minutes.</p>
      </div>
    </div>

    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #3b82f6; color: white; min-width: 120px; padding: 16px; border-radius: 8px; text-align: center;">
        <strong style="font-size: 14px;">MTTF</strong>
        <p style="margin: 4px 0 0 0; font-size: 11px;">Time to Fix</p>
      </div>
      <div style="flex: 1; background: #eff6ff; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
        <p style="margin: 0; color: #475569; font-size: 14px;"><strong style="color: #1e40af;">How long to implement the fix?</strong> Reduce with: automated rollback, feature flags, pre-built recovery scripts, auto-scaling. Target: &lt;5 minutes for known issues.</p>
      </div>
    </div>

    <div style="display: flex; align-items: center; gap: 16px;">
      <div style="background: #22c55e; color: white; min-width: 120px; padding: 16px; border-radius: 8px; text-align: center;">
        <strong style="font-size: 14px;">MTTV</strong>
        <p style="margin: 4px 0 0 0; font-size: 11px;">Time to Verify</p>
      </div>
      <div style="flex: 1; background: #f0fdf4; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
        <p style="margin: 0; color: #475569; font-size: 14px;"><strong style="color: #166534;">How long to confirm the fix worked?</strong> Reduce with: automated smoke tests, real-time metrics, canary deployments. Target: &lt;2 minutes.</p>
      </div>
    </div>
  </div>

  <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 16px; text-align: center;">
    <strong style="color: #1e293b;">MTTR = MTTD + MTTI + MTTF + MTTV</strong>
  </div>
</div>

### MTBF and MTTR Calculations

```python
from dataclasses import dataclass
from typing import List
from datetime import datetime, timedelta
import statistics


@dataclass
class Incident:
    """Record of a system failure incident."""
    start_time: datetime
    detection_time: datetime
    identification_time: datetime
    fix_deployed_time: datetime
    verified_time: datetime

    @property
    def mttd(self) -> timedelta:
        """Mean Time To Detect"""
        return self.detection_time - self.start_time

    @property
    def mtti(self) -> timedelta:
        """Mean Time To Identify (from detection)"""
        return self.identification_time - self.detection_time

    @property
    def mttf(self) -> timedelta:
        """Mean Time To Fix (from identification)"""
        return self.fix_deployed_time - self.identification_time

    @property
    def mttv(self) -> timedelta:
        """Mean Time To Verify (from fix)"""
        return self.verified_time - self.fix_deployed_time

    @property
    def total_mttr(self) -> timedelta:
        """Total Mean Time To Recovery"""
        return self.verified_time - self.start_time


class AvailabilityMetrics:
    """
    Calculate and track availability metrics.

    Key insight: Availability can be improved by either:
    1. Increasing MTBF (harder, more expensive)
    2. Decreasing MTTR (often more practical)

    Example:
    - Current: MTBF=720 hours, MTTR=2 hours -> 99.72% availability
    - Option A: Double MTBF to 1440 hours -> 99.86%
    - Option B: Halve MTTR to 1 hour -> 99.86%

    Same result, but Option B is usually easier!
    """

    def __init__(self, incidents: List[Incident], observation_period: timedelta):
        self.incidents = sorted(incidents, key=lambda i: i.start_time)
        self.observation_period = observation_period

    def calculate_mtbf(self) -> timedelta:
        """
        Calculate Mean Time Between Failures.

        MTBF = Total Uptime / Number of Failures

        Note: Only meaningful with sufficient data points.
        With <10 incidents, confidence interval is wide.
        """
        if len(self.incidents) < 2:
            return self.observation_period  # Not enough data

        total_uptime = self.observation_period - self.calculate_total_downtime()
        return total_uptime / len(self.incidents)

    def calculate_mttr(self) -> timedelta:
        """
        Calculate Mean Time To Recovery.

        MTTR = Total Downtime / Number of Failures

        This is the metric you should focus on improving.
        """
        if not self.incidents:
            return timedelta(0)

        total_downtime = sum(
            (i.total_mttr for i in self.incidents),
            timedelta(0)
        )
        return total_downtime / len(self.incidents)

    def calculate_total_downtime(self) -> timedelta:
        """Sum of all incident durations."""
        return sum(
            (i.total_mttr for i in self.incidents),
            timedelta(0)
        )

    def calculate_availability(self) -> float:
        """
        Calculate availability percentage.

        Availability = MTBF / (MTBF + MTTR)
                    = Uptime / (Uptime + Downtime)
        """
        total_seconds = self.observation_period.total_seconds()
        downtime_seconds = self.calculate_total_downtime().total_seconds()
        uptime_seconds = total_seconds - downtime_seconds

        return uptime_seconds / total_seconds

    def get_mttr_breakdown(self) -> dict:
        """
        Break down MTTR into components to identify improvement areas.

        Common findings:
        - Detection is slow -> Improve monitoring
        - Identification is slow -> Better observability, runbooks
        - Fix is slow -> Automation, rollback procedures
        - Verification is slow -> Better testing, canaries
        """
        if not self.incidents:
            return {}

        return {
            "mttd_avg": statistics.mean(i.mttd.total_seconds() for i in self.incidents),
            "mtti_avg": statistics.mean(i.mtti.total_seconds() for i in self.incidents),
            "mttf_avg": statistics.mean(i.mttf.total_seconds() for i in self.incidents),
            "mttv_avg": statistics.mean(i.mttv.total_seconds() for i in self.incidents),
            "mttd_p95": self._percentile([i.mttd.total_seconds() for i in self.incidents], 95),
            "mtti_p95": self._percentile([i.mtti.total_seconds() for i in self.incidents], 95),
            "mttf_p95": self._percentile([i.mttf.total_seconds() for i in self.incidents], 95),
            "mttv_p95": self._percentile([i.mttv.total_seconds() for i in self.incidents], 95),
        }

    def _percentile(self, data: List[float], p: int) -> float:
        """Calculate percentile of data."""
        sorted_data = sorted(data)
        k = (len(sorted_data) - 1) * (p / 100)
        f = int(k)
        c = f + 1 if f + 1 < len(sorted_data) else f
        return sorted_data[f] + (k - f) * (sorted_data[c] - sorted_data[f])

    def project_availability_improvement(
        self,
        mttr_reduction_percent: float
    ) -> float:
        """
        Project availability if MTTR is reduced by given percentage.

        This helps justify investment in operational improvements.

        Example:
        - Current: 99.9% availability, 30 min MTTR
        - If MTTR reduced by 50% (to 15 min)
        - Projected: 99.95% availability
        """
        current_mttr = self.calculate_mttr()
        new_mttr = current_mttr * (1 - mttr_reduction_percent / 100)

        mtbf = self.calculate_mtbf()

        return mtbf.total_seconds() / (mtbf.total_seconds() + new_mttr.total_seconds())


def calculate_required_availability_per_component(
    target_availability: float,
    num_components_in_series: int
) -> float:
    """
    Calculate required per-component availability to achieve target.

    For n components in series:
    target = component_availability ^ n
    component_availability = target ^ (1/n)

    Example:
    - Target: 99.99% (4 nines)
    - Components: 5 services in series
    - Each needs: 99.998% availability (almost 5 nines each!)

    This shows why microservices architectures need careful design.
    """
    return target_availability ** (1 / num_components_in_series)
```

### Interview Questions: MTBF and MTTR (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: What's the relationship between MTBF, MTTR, and availability?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Availability = MTBF / (MTBF + MTTR). <span style="color: #22c55e; font-weight: 600;">MTBF (Mean Time Between Failures)</span> is how long the system runs before failing. <span style="color: #22c55e; font-weight: 600;">MTTR (Mean Time To Recovery)</span> is how long it takes to restore service. To improve availability, either increase MTBF (prevent failures) or decrease MTTR (recover faster). For example, with MTBF=1000 hours and MTTR=1 hour, availability = 1000/1001 = 99.9%.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: Why is reducing MTTR often more effective than increasing MTBF? When would you prioritize MTBF instead?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Reducing MTTR is often more cost-effective because: (1) <strong>Failures are inevitable</strong> - complex systems will fail regardless of prevention efforts. (2) <strong>Diminishing returns</strong> - after basic hardening, preventing the next failure gets exponentially expensive. (3) <strong>Compound benefits</strong> - MTTR improvements help with ALL failure types, not just anticipated ones. (4) <strong>Practice makes perfect</strong> - teams that recover frequently get better at it. However, <span style="color: #22c55e; font-weight: 600;">prioritize MTBF when</span>: (a) Failures have catastrophic consequences (data loss, safety-critical systems). (b) Recovery is inherently slow (hardware replacement, data corruption). (c) Reputation damage exceeds operational cost (payment processing, healthcare). (d) Regulatory requirements mandate prevention (financial services). The optimal strategy is usually a balance - see [[fault-tolerance]](/topic/system-design/fault-tolerance).</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: Your team's MTTR is 45 minutes, mostly spent on identification (30 min). The CTO wants 99.99% availability which requires MTTR under 5 minutes. How do you achieve this?</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> This requires a systematic approach to slash MTTI from 30 minutes to under 2 minutes: (1) <strong>Automated anomaly detection</strong>: Don't wait for alerts - use ML-based anomaly detection on golden signals (latency, traffic, errors, saturation) to identify issues before impact spreads. (2) <strong>Service dependency mapping</strong>: Automatically correlate failures across services. If Service A and B fail, but B depends on A, root cause is likely A. Tools: distributed tracing with Jaeger/Zipkin. (3) <strong>Pre-built hypotheses</strong>: For each alert, provide likely root causes ranked by historical probability. "High latency on checkout" -> "70% database slow queries, 20% payment provider, 10% network." (4) <strong>One-click investigation</strong>: Dashboard that shows all relevant data for a service: recent deployments, error logs, resource utilization, dependency status. No manual searching. (5) <strong>ChatOps integration</strong>: Bot that responds to incidents with relevant context. "What changed?" shows recent deploys. "Who owns X?" routes to right team. (6) <strong>Chaos engineering</strong>: Regularly inject failures so team recognizes patterns. When real failure occurs, it matches a practiced scenario. (7) <strong>Automated remediation for known issues</strong>: If detection identifies "pod OOMKilled", automatically restart and scale up. Human verifies, doesn't investigate. Target breakdown: MTTD < 30 seconds (automated monitoring), MTTI < 2 minutes (automated correlation + runbooks), MTTF < 1 minute (one-click rollback or auto-remediation), MTTV < 1 minute (automated health checks). Total: < 5 minutes. Related: [[observability]](/topic/system-design/observability), [[chaos-engineering]](/topic/system-design/chaos-engineering).</p>
    </div>
  </div>
</div>

---

## Section 3: Failover Strategies

### Deep Mechanics

<span style="color: #22c55e; font-weight: 600;">Failover</span> is the process of switching to a redundant system when the primary system fails. The failover strategy you choose dramatically affects both availability and cost.

<div style="background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: white; font-size: 18px;">Failover Types Spectrum</h4>
  <div style="display: flex; justify-content: space-between; margin: 20px 0; padding: 0 20px;">
    <span style="color: #c4b5fd;">Cheaper</span>
    <span style="color: #c4b5fd;">← Cost →</span>
    <span style="color: #c4b5fd;">Expensive</span>
  </div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 20px; padding: 0 20px;">
    <span style="color: #c4b5fd;">Slower</span>
    <span style="color: #c4b5fd;">← Recovery Time →</span>
    <span style="color: #c4b5fd;">Faster</span>
  </div>
  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
    <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 12px; text-align: center;">
      <div style="background: #60a5fa; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 24px;">❄️</span>
      </div>
      <strong style="color: white; font-size: 16px;">Cold Standby</strong>
      <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 13px;">Backup is OFF</p>
      <p style="color: #c4b5fd; margin: 8px 0 0 0; font-size: 12px;">RTO: Minutes to Hours</p>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 12px; text-align: center;">
      <div style="background: #f59e0b; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 24px;">🌤️</span>
      </div>
      <strong style="color: white; font-size: 16px;">Warm Standby</strong>
      <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 13px;">Backup is RUNNING (reduced capacity)</p>
      <p style="color: #c4b5fd; margin: 8px 0 0 0; font-size: 12px;">RTO: Seconds to Minutes</p>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 12px; text-align: center;">
      <div style="background: #22c55e; width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 24px;">🔥</span>
      </div>
      <strong style="color: white; font-size: 16px;">Hot Standby</strong>
      <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 13px;">Backup is ACTIVE (full capacity)</p>
      <p style="color: #c4b5fd; margin: 8px 0 0 0; font-size: 12px;">RTO: Sub-second</p>
    </div>
  </div>
</div>

### Detailed Failover Comparison

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Failover Strategy Deep Dive</h4>

  <div style="display: grid; gap: 20px;">
    <div style="background: #eff6ff; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6;">
      <h5 style="color: #1e40af; margin-top: 0;">Cold Standby (Backup/Restore)</h5>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div>
          <strong style="color: #334155;">How it Works:</strong>
          <ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
            <li>Backup systems are powered off</li>
            <li>Data is backed up periodically (hourly/daily)</li>
            <li>On failure: provision new infrastructure</li>
            <li>Restore data from backup</li>
            <li>Update DNS/load balancer</li>
          </ul>
        </div>
        <div>
          <strong style="color: #334155;">Best For:</strong>
          <ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
            <li>Non-critical internal tools</li>
            <li>Development/staging environments</li>
            <li>Cost-sensitive applications</li>
            <li>Systems with high RPO tolerance</li>
          </ul>
          <p style="color: #64748b; margin: 12px 0 0 0; font-size: 13px;"><strong>RTO:</strong> 1-24 hours | <strong>RPO:</strong> Hours of data loss</p>
        </div>
      </div>
    </div>

    <div style="background: #fffbeb; padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b;">
      <h5 style="color: #92400e; margin-top: 0;">Warm Standby (Pilot Light)</h5>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div>
          <strong style="color: #334155;">How it Works:</strong>
          <ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
            <li>Core infrastructure always running</li>
            <li>Database replication active (async)</li>
            <li>Minimal compute resources (scaled down)</li>
            <li>On failure: scale up compute</li>
            <li>Promote replica to primary</li>
          </ul>
        </div>
        <div>
          <strong style="color: #334155;">Best For:</strong>
          <ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
            <li>Business applications</li>
            <li>E-commerce (non-peak hours)</li>
            <li>SaaS products</li>
            <li>Balanced cost/recovery needs</li>
          </ul>
          <p style="color: #64748b; margin: 12px 0 0 0; font-size: 13px;"><strong>RTO:</strong> 10-30 minutes | <strong>RPO:</strong> Minutes of data loss</p>
        </div>
      </div>
    </div>

    <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; border-left: 4px solid #22c55e;">
      <h5 style="color: #166534; margin-top: 0;">Hot Standby (Active-Passive)</h5>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div>
          <strong style="color: #334155;">How it Works:</strong>
          <ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
            <li>Full replica running continuously</li>
            <li>Synchronous data replication</li>
            <li>Health checks every few seconds</li>
            <li>On failure: automatic DNS/LB switch</li>
            <li>No manual intervention needed</li>
          </ul>
        </div>
        <div>
          <strong style="color: #334155;">Best For:</strong>
          <ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
            <li>Financial systems</li>
            <li>Healthcare applications</li>
            <li>Real-time trading platforms</li>
            <li>Mission-critical services</li>
          </ul>
          <p style="color: #64748b; margin: 12px 0 0 0; font-size: 13px;"><strong>RTO:</strong> Seconds | <strong>RPO:</strong> Zero to seconds</p>
        </div>
      </div>
    </div>
  </div>
</div>

### Failover Implementation

```python
from enum import Enum
from dataclasses import dataclass
from typing import Optional, Callable, List
import threading
import time
import logging

logger = logging.getLogger(__name__)


class FailoverState(Enum):
    PRIMARY_ACTIVE = "primary_active"
    FAILOVER_IN_PROGRESS = "failover_in_progress"
    SECONDARY_ACTIVE = "secondary_active"
    FAILBACK_IN_PROGRESS = "failback_in_progress"


@dataclass
class Endpoint:
    """Service endpoint configuration."""
    name: str
    url: str
    is_primary: bool
    health_check_path: str = "/health"
    weight: int = 100


class FailoverManager:
    """
    Manages failover between primary and secondary endpoints.

    Key Decisions:
    1. When to failover: consecutive health check failures
    2. When to failback: primary recovery + stability period
    3. How to failover: DNS update, load balancer config, or client-side

    Failure Modes to Handle:
    - Split brain: Both think they're primary
    - Flapping: Rapid failover/failback cycles
    - Partial failure: Primary degraded but not dead
    """

    def __init__(
        self,
        primary: Endpoint,
        secondary: Endpoint,
        health_check_interval: float = 5.0,
        failure_threshold: int = 3,
        recovery_threshold: int = 5,
        failback_delay: float = 300.0,  # 5 minutes
    ):
        self.primary = primary
        self.secondary = secondary
        self.health_check_interval = health_check_interval
        self.failure_threshold = failure_threshold
        self.recovery_threshold = recovery_threshold
        self.failback_delay = failback_delay

        self.state = FailoverState.PRIMARY_ACTIVE
        self.active_endpoint = primary

        self.primary_failures = 0
        self.primary_successes = 0
        self.secondary_failures = 0

        self.last_failover_time: Optional[float] = None
        self.failover_count = 0

        self._lock = threading.Lock()
        self._running = False
        self._health_thread: Optional[threading.Thread] = None

        # Callbacks for integration with load balancers, DNS, etc.
        self.on_failover: Optional[Callable[[Endpoint, Endpoint], None]] = None
        self.on_failback: Optional[Callable[[Endpoint, Endpoint], None]] = None

    def start(self):
        """Start health monitoring."""
        self._running = True
        self._health_thread = threading.Thread(target=self._health_loop, daemon=True)
        self._health_thread.start()
        logger.info("Failover manager started")

    def stop(self):
        """Stop health monitoring."""
        self._running = False
        if self._health_thread:
            self._health_thread.join(timeout=10)

    def get_active_endpoint(self) -> Endpoint:
        """Get currently active endpoint for routing."""
        with self._lock:
            return self.active_endpoint

    def _health_loop(self):
        """Background health check loop."""
        while self._running:
            try:
                self._check_health()
            except Exception as e:
                logger.error(f"Health check error: {e}")
            time.sleep(self.health_check_interval)

    def _check_health(self):
        """
        Check health and manage failover state.

        State Machine:
        PRIMARY_ACTIVE:
          - Primary fails N times -> FAILOVER_IN_PROGRESS
        FAILOVER_IN_PROGRESS:
          - Switch to secondary -> SECONDARY_ACTIVE
        SECONDARY_ACTIVE:
          - Primary recovers N times + delay passed -> FAILBACK_IN_PROGRESS
        FAILBACK_IN_PROGRESS:
          - Switch to primary -> PRIMARY_ACTIVE
        """
        primary_healthy = self._is_healthy(self.primary)
        secondary_healthy = self._is_healthy(self.secondary)

        with self._lock:
            if self.state == FailoverState.PRIMARY_ACTIVE:
                if primary_healthy:
                    self.primary_failures = 0
                else:
                    self.primary_failures += 1
                    logger.warning(
                        f"Primary health check failed ({self.primary_failures}/{self.failure_threshold})"
                    )

                    if self.primary_failures >= self.failure_threshold:
                        self._initiate_failover()

            elif self.state == FailoverState.SECONDARY_ACTIVE:
                # Check if primary has recovered
                if primary_healthy:
                    self.primary_successes += 1

                    if (self.primary_successes >= self.recovery_threshold and
                        self._failback_delay_passed()):
                        self._initiate_failback()
                else:
                    self.primary_successes = 0

                # Also monitor secondary health
                if not secondary_healthy:
                    self.secondary_failures += 1
                    logger.error(
                        f"Secondary unhealthy while active ({self.secondary_failures} failures)"
                    )

    def _is_healthy(self, endpoint: Endpoint) -> bool:
        """
        Check endpoint health.

        Production considerations:
        - Use HTTP health check, not just TCP connect
        - Check response time, not just success
        - Consider deep health checks (dependencies)
        """
        try:
            import requests
            response = requests.get(
                f"{endpoint.url}{endpoint.health_check_path}",
                timeout=3.0
            )
            return response.status_code == 200
        except Exception:
            return False

    def _initiate_failover(self):
        """
        Switch from primary to secondary.

        Critical: This must be atomic from client perspective.
        - Update routing before marking state change
        - Log extensively for post-incident analysis
        """
        logger.warning(f"Initiating failover from {self.primary.name} to {self.secondary.name}")

        self.state = FailoverState.FAILOVER_IN_PROGRESS

        # Execute failover callback (update LB, DNS, etc.)
        if self.on_failover:
            try:
                self.on_failover(self.primary, self.secondary)
            except Exception as e:
                logger.error(f"Failover callback failed: {e}")

        self.active_endpoint = self.secondary
        self.state = FailoverState.SECONDARY_ACTIVE
        self.last_failover_time = time.time()
        self.failover_count += 1
        self.primary_failures = 0

        logger.warning(
            f"Failover complete. Secondary {self.secondary.name} is now active. "
            f"Total failovers: {self.failover_count}"
        )

    def _initiate_failback(self):
        """
        Switch back from secondary to primary.

        Failback is optional and should be conservative:
        - Primary must be stable (not flapping)
        - Delay prevents rapid failover/failback cycles
        - Some teams prefer manual failback
        """
        logger.info(f"Initiating failback from {self.secondary.name} to {self.primary.name}")

        self.state = FailoverState.FAILBACK_IN_PROGRESS

        # Execute failback callback
        if self.on_failback:
            try:
                self.on_failback(self.secondary, self.primary)
            except Exception as e:
                logger.error(f"Failback callback failed: {e}")

        self.active_endpoint = self.primary
        self.state = FailoverState.PRIMARY_ACTIVE
        self.primary_successes = 0

        logger.info(f"Failback complete. Primary {self.primary.name} is now active.")

    def _failback_delay_passed(self) -> bool:
        """
        Check if enough time has passed since failover.

        This prevents flapping when primary is unstable.
        """
        if self.last_failover_time is None:
            return True
        return time.time() - self.last_failover_time >= self.failback_delay

    def force_failover(self):
        """
        Manually trigger failover.

        Use case: Planned maintenance, chaos testing
        """
        with self._lock:
            if self.state == FailoverState.PRIMARY_ACTIVE:
                logger.info("Manual failover initiated")
                self._initiate_failover()

    def force_failback(self):
        """
        Manually trigger failback.

        Use case: After primary is confirmed stable
        """
        with self._lock:
            if self.state == FailoverState.SECONDARY_ACTIVE:
                logger.info("Manual failback initiated")
                self._initiate_failback()
```

### Interview Questions: Failover Strategies (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: What's the difference between cold, warm, and hot failover?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> <span style="color: #22c55e; font-weight: 600;">Cold failover</span>: Backup system is off. On failure, you provision new infrastructure and restore from backup. RTO: hours. Cheapest but slowest. <span style="color: #22c55e; font-weight: 600;">Warm failover</span>: Backup system is running at reduced capacity with data replication. On failure, scale up and promote replica. RTO: minutes. Balanced cost/speed. <span style="color: #22c55e; font-weight: 600;">Hot failover</span>: Backup system is fully running with real-time sync. On failure, automatic switchover. RTO: seconds. Most expensive but fastest. Choose based on your RTO requirements and budget.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you prevent split-brain scenarios during failover where both primary and secondary think they're active?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Split-brain is catastrophic for stateful systems - both nodes accepting writes leads to data divergence. Prevention strategies: (1) <strong>Quorum-based fencing</strong>: Nodes must obtain majority vote before becoming primary. With 3 nodes, need 2/3 agreement. Prevents both sides of network partition from going active. (2) <strong>STONITH (Shoot The Other Node In The Head)</strong>: Before becoming primary, ensure old primary is definitely dead. Use out-of-band power control (IPMI, cloud APIs) to force shutdown. (3) <strong>Lease-based leadership</strong>: Primary must periodically renew lease. If network partition prevents renewal, primary demotes itself. Secondary only promotes after lease expires. (4) <strong>Witness/tiebreaker node</strong>: Third node in different failure domain casts deciding vote. (5) <strong>Application-level detection</strong>: Writes include fencing token. Storage rejects writes with old tokens. Related: [[distributed-consensus]](/topic/system-design/consensus), [[database-replication]](/topic/system-design/database-replication).</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: Design a multi-region failover system for a payment processing platform that must maintain exactly-once semantics even during region failure.</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> Payment processing requires zero data loss and exactly-once processing - harder than typical high availability. Architecture: (1) <strong>Synchronous multi-region writes</strong>: Every transaction writes to 2+ regions before acknowledging. Use Raft/Paxos for consensus. Accept latency hit (50-100ms cross-region) for consistency. (2) <strong>Idempotency keys</strong>: Every payment request includes client-generated UUID. Store processed keys in distributed cache with 24-hour TTL. Reject duplicates at API gateway before processing. (3) <strong>Transaction state machine</strong>: States: PENDING -> AUTHORIZED -> CAPTURED -> SETTLED. Each transition is idempotent. Replaying authorization on already-authorized transaction is safe. (4) <strong>Regional failover process</strong>: (a) Detect region failure via cross-region health checks (b) Quorum of healthy regions agrees on failover (c) Promote secondary to primary via consensus (d) Update global DNS/anycast routing (e) Drain in-flight requests with timeout (f) Resume processing - idempotency keys prevent duplicates. (5) <strong>Data reconciliation</strong>: After region recovery, compare transaction logs. Any divergent transactions (rare with sync replication) go to manual review queue. (6) <strong>Testing</strong>: Monthly failover drills. Chaos engineering to verify idempotency. Shadow mode for new regions. Target metrics: RTO &lt;30 seconds, RPO = 0 (sync replication), exactly-once guarantee. Trade-off: ~100ms added latency per transaction for sync writes vs eventual consistency alternatives. Related: [[payment-processing]](/topic/system-architectures/payment-systems), [[consensus-algorithms]](/topic/system-design/distributed-consensus).</p>
    </div>
  </div>
</div>

---

## Section 4: Redundancy Patterns

### Active-Passive vs Active-Active

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px; margin: 24px 0;">
  <h4 style="color: #1e293b; margin-top: 0; font-size: 20px;">Redundancy Architecture Patterns</h4>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 20px;">
    <div style="background: #eff6ff; padding: 24px; border-radius: 12px; border: 2px solid #3b82f6;">
      <h5 style="color: #1e40af; margin-top: 0; text-align: center;">Active-Passive</h5>

      <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; margin: 20px 0;">
        <div style="background: #22c55e; color: white; padding: 16px 32px; border-radius: 8px; text-align: center; width: 140px;">
          <strong>PRIMARY</strong>
          <p style="margin: 4px 0 0 0; font-size: 12px;">Handles all traffic</p>
        </div>
        <div style="color: #64748b; font-size: 13px;">↓ heartbeat ↓</div>
        <div style="background: #94a3b8; color: white; padding: 16px 32px; border-radius: 8px; text-align: center; width: 140px;">
          <strong>STANDBY</strong>
          <p style="margin: 4px 0 0 0; font-size: 12px;">Idle until failover</p>
        </div>
      </div>

      <div style="background: white; padding: 16px; border-radius: 8px; margin-top: 16px;">
        <strong style="color: #166534;">Pros:</strong>
        <ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
          <li>Simpler to implement</li>
          <li>No data sync conflicts</li>
          <li>Clear ownership model</li>
        </ul>
        <strong style="color: #dc2626; margin-top: 12px; display: block;">Cons:</strong>
        <ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
          <li>Standby resources underutilized</li>
          <li>Failover causes brief outage</li>
          <li>Standby may be "cold" (not warmed up)</li>
        </ul>
      </div>
    </div>

    <div style="background: #f0fdf4; padding: 24px; border-radius: 12px; border: 2px solid #22c55e;">
      <h5 style="color: #166534; margin-top: 0; text-align: center;">Active-Active</h5>

      <div style="display: flex; flex-direction: column; align-items: center; gap: 12px; margin: 20px 0;">
        <div style="display: flex; gap: 16px;">
          <div style="background: #22c55e; color: white; padding: 16px 20px; border-radius: 8px; text-align: center;">
            <strong>NODE 1</strong>
            <p style="margin: 4px 0 0 0; font-size: 12px;">Active</p>
          </div>
          <div style="background: #22c55e; color: white; padding: 16px 20px; border-radius: 8px; text-align: center;">
            <strong>NODE 2</strong>
            <p style="margin: 4px 0 0 0; font-size: 12px;">Active</p>
          </div>
          <div style="background: #22c55e; color: white; padding: 16px 20px; border-radius: 8px; text-align: center;">
            <strong>NODE 3</strong>
            <p style="margin: 4px 0 0 0; font-size: 12px;">Active</p>
          </div>
        </div>
        <div style="color: #64748b; font-size: 13px;">← All serving traffic →</div>
      </div>

      <div style="background: white; padding: 16px; border-radius: 8px; margin-top: 16px;">
        <strong style="color: #166534;">Pros:</strong>
        <ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
          <li>Full resource utilization</li>
          <li>No failover delay</li>
          <li>Better performance (distributed load)</li>
        </ul>
        <strong style="color: #dc2626; margin-top: 12px; display: block;">Cons:</strong>
        <ul style="color: #475569; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
          <li>Complex data synchronization</li>
          <li>Potential for conflicts</li>
          <li>Harder to reason about state</li>
        </ul>
      </div>
    </div>
  </div>
</div>

### Multi-Region Active-Active Architecture

<div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: #f8fafc; font-size: 18px;">Global Active-Active Deployment</h4>

  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 20px;">
    <div style="background: rgba(34, 197, 94, 0.2); padding: 20px; border-radius: 12px; border: 2px solid rgba(34, 197, 94, 0.5);">
      <strong style="color: #86efac; font-size: 14px;">US-EAST</strong>
      <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; margin-top: 12px;">
        <div style="color: #a7f3d0; font-size: 13px;">App Servers: 10</div>
        <div style="color: #a7f3d0; font-size: 13px;">DB: Primary (writes)</div>
        <div style="color: #a7f3d0; font-size: 13px;">Cache: Local</div>
      </div>
    </div>
    <div style="background: rgba(34, 197, 94, 0.2); padding: 20px; border-radius: 12px; border: 2px solid rgba(34, 197, 94, 0.5);">
      <strong style="color: #86efac; font-size: 14px;">EU-WEST</strong>
      <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; margin-top: 12px;">
        <div style="color: #a7f3d0; font-size: 13px;">App Servers: 8</div>
        <div style="color: #a7f3d0; font-size: 13px;">DB: Replica (reads)</div>
        <div style="color: #a7f3d0; font-size: 13px;">Cache: Local</div>
      </div>
    </div>
    <div style="background: rgba(34, 197, 94, 0.2); padding: 20px; border-radius: 12px; border: 2px solid rgba(34, 197, 94, 0.5);">
      <strong style="color: #86efac; font-size: 14px;">AP-SOUTH</strong>
      <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; margin-top: 12px;">
        <div style="color: #a7f3d0; font-size: 13px;">App Servers: 6</div>
        <div style="color: #a7f3d0; font-size: 13px;">DB: Replica (reads)</div>
        <div style="color: #a7f3d0; font-size: 13px;">Cache: Local</div>
      </div>
    </div>
  </div>

  <div style="display: flex; justify-content: center; gap: 32px; margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
    <div style="text-align: center;">
      <div style="color: #fbbf24; font-size: 24px; font-weight: bold;">50ms</div>
      <div style="color: #94a3b8; font-size: 12px;">Cross-region latency</div>
    </div>
    <div style="text-align: center;">
      <div style="color: #fbbf24; font-size: 24px; font-weight: bold;">&lt;5s</div>
      <div style="color: #94a3b8; font-size: 12px;">Replication lag</div>
    </div>
    <div style="text-align: center;">
      <div style="color: #fbbf24; font-size: 24px; font-weight: bold;">99.99%</div>
      <div style="color: #94a3b8; font-size: 12px;">Target availability</div>
    </div>
  </div>
</div>

### Redundancy Implementation Patterns

```python
from enum import Enum
from typing import List, Optional, Dict, Callable
from dataclasses import dataclass
import threading
import random
import time
import hashlib


class RedundancyMode(Enum):
    ACTIVE_PASSIVE = "active_passive"
    ACTIVE_ACTIVE = "active_active"
    ACTIVE_ACTIVE_GEO = "active_active_geo"


@dataclass
class Node:
    """A node in the redundant cluster."""
    id: str
    region: str
    endpoint: str
    weight: int = 100
    is_healthy: bool = True
    active_connections: int = 0

    def __hash__(self):
        return hash(self.id)


class ActiveActiveCluster:
    """
    Manages active-active redundancy with intelligent request routing.

    Strategies:
    1. Round-robin: Even distribution
    2. Weighted: Respect node capacity
    3. Least-connections: Route to least busy
    4. Geo-aware: Route to nearest region
    5. Consistent hashing: Same user -> same node (for caching)
    """

    def __init__(
        self,
        nodes: List[Node],
        mode: RedundancyMode = RedundancyMode.ACTIVE_ACTIVE
    ):
        self.nodes = {node.id: node for node in nodes}
        self.mode = mode
        self._round_robin_idx = 0
        self._lock = threading.Lock()

        # For consistent hashing
        self._hash_ring: List[tuple] = []
        self._build_hash_ring()

    def get_node(
        self,
        strategy: str = "round_robin",
        client_ip: Optional[str] = None,
        session_key: Optional[str] = None,
        client_region: Optional[str] = None
    ) -> Optional[Node]:
        """
        Select a healthy node based on strategy.

        Strategy selection guide:
        - round_robin: Default for stateless services
        - weighted: When nodes have different capacities
        - least_connections: For long-lived connections
        - geo: For latency-sensitive global services
        - consistent_hash: For session affinity or caching
        """
        healthy_nodes = [n for n in self.nodes.values() if n.is_healthy]

        if not healthy_nodes:
            return None

        if strategy == "round_robin":
            return self._round_robin(healthy_nodes)
        elif strategy == "weighted":
            return self._weighted_random(healthy_nodes)
        elif strategy == "least_connections":
            return self._least_connections(healthy_nodes)
        elif strategy == "geo":
            return self._geo_aware(healthy_nodes, client_region)
        elif strategy == "consistent_hash":
            return self._consistent_hash(healthy_nodes, session_key or client_ip)
        else:
            return random.choice(healthy_nodes)

    def _round_robin(self, nodes: List[Node]) -> Node:
        """Simple round-robin selection."""
        with self._lock:
            node = nodes[self._round_robin_idx % len(nodes)]
            self._round_robin_idx += 1
            return node

    def _weighted_random(self, nodes: List[Node]) -> Node:
        """
        Weighted random selection based on node capacity.

        Use case: Node A has 2x the CPU of Node B,
        give A weight=200, B weight=100.
        A receives 2/3 of traffic.
        """
        total_weight = sum(n.weight for n in nodes)
        r = random.randint(1, total_weight)

        cumulative = 0
        for node in nodes:
            cumulative += node.weight
            if r <= cumulative:
                return node

        return nodes[-1]

    def _least_connections(self, nodes: List[Node]) -> Node:
        """
        Route to node with fewest active connections.

        Good for: Long-running requests, WebSocket connections
        Requires: Tracking active connections per node
        """
        return min(nodes, key=lambda n: n.active_connections)

    def _geo_aware(
        self,
        nodes: List[Node],
        client_region: Optional[str]
    ) -> Node:
        """
        Route to geographically nearest node.

        Region proximity heuristic (simplified):
        - Same region: priority 1
        - Same continent: priority 2
        - Different continent: priority 3
        """
        if not client_region:
            return random.choice(nodes)

        # Prefer nodes in same region
        same_region = [n for n in nodes if n.region == client_region]
        if same_region:
            return random.choice(same_region)

        # Fall back to any healthy node
        return random.choice(nodes)

    def _consistent_hash(
        self,
        nodes: List[Node],
        key: Optional[str]
    ) -> Node:
        """
        Consistent hashing for session affinity.

        Benefits:
        - Same key always routes to same node
        - When nodes added/removed, only 1/n keys remap
        - Good for caching, stateful services

        Implementation: Jump consistent hash for simplicity
        """
        if not key:
            return random.choice(nodes)

        # Filter hash ring to healthy nodes only
        healthy_ids = {n.id for n in nodes}
        available_ring = [(h, nid) for h, nid in self._hash_ring if nid in healthy_ids]

        if not available_ring:
            return random.choice(nodes)

        key_hash = int(hashlib.md5(key.encode()).hexdigest(), 16)

        # Binary search for position in ring
        for ring_hash, node_id in available_ring:
            if key_hash <= ring_hash:
                return self.nodes[node_id]

        # Wrap around to first node
        return self.nodes[available_ring[0][1]]

    def _build_hash_ring(self, virtual_nodes: int = 150):
        """
        Build consistent hash ring with virtual nodes.

        Virtual nodes ensure even distribution even with few physical nodes.
        More virtual nodes = more even distribution, more memory.
        150 is a good balance.
        """
        self._hash_ring = []

        for node in self.nodes.values():
            for i in range(virtual_nodes):
                key = f"{node.id}:{i}"
                hash_val = int(hashlib.md5(key.encode()).hexdigest(), 16)
                self._hash_ring.append((hash_val, node.id))

        self._hash_ring.sort(key=lambda x: x[0])

    def mark_unhealthy(self, node_id: str):
        """Mark a node as unhealthy (remove from rotation)."""
        if node_id in self.nodes:
            self.nodes[node_id].is_healthy = False

    def mark_healthy(self, node_id: str):
        """Mark a node as healthy (add back to rotation)."""
        if node_id in self.nodes:
            self.nodes[node_id].is_healthy = True

    def add_node(self, node: Node):
        """
        Add a new node to the cluster.

        For consistent hashing, this remaps ~1/n keys.
        Other strategies adjust immediately.
        """
        self.nodes[node.id] = node
        self._build_hash_ring()

    def remove_node(self, node_id: str):
        """Remove a node from the cluster."""
        if node_id in self.nodes:
            del self.nodes[node_id]
            self._build_hash_ring()


class GeoRoutingManager:
    """
    Manages global active-active routing with region awareness.

    Key considerations:
    1. Route reads locally, writes to primary
    2. Handle region failures gracefully
    3. Consider replication lag for read-after-write
    """

    def __init__(
        self,
        regions: Dict[str, ActiveActiveCluster],
        write_region: str,
        max_replication_lag_ms: int = 5000
    ):
        self.regions = regions
        self.write_region = write_region
        self.max_replication_lag_ms = max_replication_lag_ms

        # Track replication lag per region
        self.replication_lag: Dict[str, float] = {r: 0 for r in regions}

    def route_read(
        self,
        client_region: str,
        require_strong_consistency: bool = False
    ) -> Optional[Node]:
        """
        Route read request to appropriate region.

        For strong consistency: Route to write region
        For eventual consistency: Route to nearest region
        """
        if require_strong_consistency:
            return self._route_to_write_region()

        # Prefer client's region
        if client_region in self.regions:
            cluster = self.regions[client_region]
            node = cluster.get_node(strategy="geo", client_region=client_region)
            if node:
                return node

        # Fall back to any healthy region
        for region, cluster in self.regions.items():
            node = cluster.get_node()
            if node:
                return node

        return None

    def route_write(self) -> Optional[Node]:
        """
        Route write request to primary region.

        Writes must go to primary to maintain consistency.
        Primary can then replicate to other regions.
        """
        return self._route_to_write_region()

    def _route_to_write_region(self) -> Optional[Node]:
        """Get a node from the write region."""
        if self.write_region in self.regions:
            return self.regions[self.write_region].get_node()
        return None

    def handle_region_failure(self, failed_region: str):
        """
        Handle a region failure.

        Actions:
        1. Mark all nodes in region unhealthy
        2. If write region failed, promote new primary
        3. Update DNS/routing
        """
        if failed_region in self.regions:
            cluster = self.regions[failed_region]
            for node_id in cluster.nodes:
                cluster.mark_unhealthy(node_id)

        if failed_region == self.write_region:
            # Promote new write region
            for region in self.regions:
                if region != failed_region:
                    self.write_region = region
                    break
```

### Interview Questions: Redundancy Patterns (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: When would you choose active-passive over active-active redundancy?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Choose <span style="color: #22c55e; font-weight: 600;">active-passive</span> when: (1) Strong consistency is required - only one node writes, no conflict resolution needed. (2) Cost constraints - standby uses minimal resources. (3) Simple workloads where failover delay is acceptable. (4) Legacy systems that can't handle concurrent access. Choose <span style="color: #22c55e; font-weight: 600;">active-active</span> when: (1) High availability is critical - no failover delay. (2) High throughput needed - distribute load across nodes. (3) Global users - serve from nearest region. (4) You can handle eventual consistency or implement conflict resolution.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you handle write conflicts in an active-active multi-region database setup?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Write conflicts occur when the same record is updated in multiple regions simultaneously. Resolution strategies: (1) <strong>Last-write-wins (LWW)</strong>: Use synchronized timestamps or vector clocks. Simple but can lose data. (2) <strong>Application-level merge</strong>: Define merge rules per field. E.g., for shopping cart: union of items. (3) <strong>Conflict-free Replicated Data Types (CRDTs)</strong>: Data structures that merge automatically (counters, sets, registers). No conflicts by design. (4) <strong>Operational transforms</strong>: Transform concurrent operations to commute (like Google Docs). (5) <strong>Single leader per partition</strong>: Partition data by region/user. Each partition has one write leader. (6) <strong>Explicit conflict resolution</strong>: Surface conflicts to users or queue for manual review. Best practice: Avoid conflicts by design - route all writes for a given entity to the same region using consistent hashing. See [[database-replication]](/topic/system-design/database-replication), [[eventual-consistency]](/topic/system-design/eventual-consistency).</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: Design an active-active architecture for a social media feed that must handle 1M writes/second globally while maintaining read-your-writes consistency.</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> This requires combining multiple patterns: (1) <strong>Write path - geo-sharding</strong>: Partition posts by author_id. Each user's posts go to their "home" region determined by consistent hash. 1M writes across 5 regions = 200K/region, manageable. (2) <strong>Async replication</strong>: Posts replicate to all regions asynchronously (100-500ms lag). Use Kafka for reliable cross-region streaming. (3) <strong>Read-your-writes consistency</strong>: After posting, include post_timestamp in subsequent requests via cookie/header. Read path checks: if local replica has post (comparing timestamps), serve locally; else route to home region. (4) <strong>Feed aggregation</strong>: User follows span regions. For timeline: query each friend's home region in parallel, merge client-side with pagination tokens. Cache assembled feeds aggressively (5-minute TTL). (5) <strong>Fan-out optimization</strong>: For celebrities (>1M followers), use pull-based feed assembly. For normal users, push to followers' pre-computed feeds. (6) <strong>Data model</strong>: Posts table sharded by author_id. Followers table sharded by follower_id. Timeline cache sharded by viewer_id. (7) <strong>Conflict handling</strong>: Posts are immutable (no conflicts). Likes/comments use CRDT counters per region, merge periodically. (8) <strong>Metrics</strong>: P99 write latency <50ms (local), P99 read latency <200ms (may cross regions), read-your-writes delay <1 second. Trade-offs: Higher read latency for users following people in distant regions. Storage costs 5x for full replication. Eventual consistency for follower counts. Related: [[news-feed-design]](/topic/system-architectures/facebook-newsfeed), [[global-data-distribution]](/topic/system-design/data-distribution).</p>
    </div>
  </div>
</div>

---

## Section 5: SLA, SLO, and SLI Framework

### Deep Mechanics

<div style="background: linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: white; font-size: 18px;">The Availability Measurement Hierarchy</h4>
  <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 16px;">
    <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 12px; display: flex; gap: 20px; align-items: center;">
      <div style="background: #1e40af; padding: 12px 20px; border-radius: 8px; min-width: 80px; text-align: center;">
        <strong style="font-size: 18px;">SLI</strong>
      </div>
      <div>
        <strong style="color: white;">Service Level Indicator - What you MEASURE</strong>
        <p style="color: #bae6fd; margin: 8px 0 0 0; font-size: 14px;">Quantitative metrics: request latency (P99 < 200ms), error rate (< 0.1%), availability (> 99.9%)</p>
      </div>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 12px; display: flex; gap: 20px; align-items: center;">
      <div style="background: #7c3aed; padding: 12px 20px; border-radius: 8px; min-width: 80px; text-align: center;">
        <strong style="font-size: 18px;">SLO</strong>
      </div>
      <div>
        <strong style="color: white;">Service Level Objective - What you TARGET</strong>
        <p style="color: #bae6fd; margin: 8px 0 0 0; font-size: 14px;">Internal goals for each SLI. Set stricter than SLA to provide buffer. "P99 latency < 150ms"</p>
      </div>
    </div>
    <div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 12px; display: flex; gap: 20px; align-items: center;">
      <div style="background: #dc2626; padding: 12px 20px; border-radius: 8px; min-width: 80px; text-align: center;">
        <strong style="font-size: 18px;">SLA</strong>
      </div>
      <div>
        <strong style="color: white;">Service Level Agreement - What you PROMISE</strong>
        <p style="color: #bae6fd; margin: 8px 0 0 0; font-size: 14px;">Legal contract with customers including penalties. "99.9% uptime or service credits"</p>
      </div>
    </div>
  </div>
</div>

### Error Budget

<div style="background: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #166534; margin-top: 0;">Error Budget: Balancing Reliability and Velocity</h4>

  <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 16px;">
    <div style="text-align: center; margin-bottom: 16px;">
      <strong style="color: #1e293b; font-size: 18px;">Error Budget = 100% - SLO Target</strong>
    </div>
    <p style="color: #475569; margin: 0;">If your SLO is 99.9% availability, your error budget is 0.1% = <strong>43.8 minutes of downtime per month</strong>. This budget is "spent" on deployments, experiments, and incidents.</p>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
    <div style="background: #dcfce7; padding: 16px; border-radius: 8px; border: 1px solid #86efac;">
      <strong style="color: #166534;">Budget Remaining: Ship Fast</strong>
      <ul style="color: #15803d; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
        <li>Deploy new features aggressively</li>
        <li>Run A/B experiments</li>
        <li>Try risky performance optimizations</li>
        <li>Refactor high-debt code</li>
      </ul>
    </div>
    <div style="background: #fee2e2; padding: 16px; border-radius: 8px; border: 1px solid #fecaca;">
      <strong style="color: #991b1b;">Budget Exhausted: Stabilize</strong>
      <ul style="color: #b91c1c; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
        <li>Freeze non-critical deployments</li>
        <li>Focus on reliability improvements</li>
        <li>Review and fix recent changes</li>
        <li>Add monitoring and alerting</li>
      </ul>
    </div>
  </div>
</div>

### Interview Questions: SLA/SLO/SLI (3 Levels Deep)

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: What's the difference between SLA, SLO, and SLI? Why have all three?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> <span style="color: #22c55e; font-weight: 600;">SLI (Indicator)</span> is what you measure (e.g., P99 latency). <span style="color: #22c55e; font-weight: 600;">SLO (Objective)</span> is your internal target for that metric (e.g., P99 < 150ms). <span style="color: #22c55e; font-weight: 600;">SLA (Agreement)</span> is the external promise with legal consequences (e.g., P99 < 200ms or refund). You need all three because: SLAs should be conservative (you need buffer for unexpected issues), SLOs should be stricter than SLAs (early warning before breach), and SLIs should be objectively measurable (no ambiguity in whether you met your goal).</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: How do you choose the right SLOs? What happens if you set them too high or too low?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> SLOs should balance user expectations, business needs, and engineering reality. <strong>Too high SLOs</strong>: Development velocity grinds to halt. Every feature needs extensive reliability engineering. Small incidents burn error budget. Team lives in constant fear of breach. <strong>Too low SLOs</strong>: Users experience poor service. Support tickets increase. Churn rises. Engineering has no reliability pressure. <strong>How to choose</strong>: (1) Measure current performance as baseline. (2) Understand user tolerance - how much downtime/latency before users complain or churn? (3) Consider business impact - revenue loss per minute of downtime. (4) Factor in dependencies - can't exceed your lowest dependency's SLA. (5) Start with achievable targets, tighten over time. Example: If you're currently at 99.5%, don't immediately target 99.99%. Target 99.9% first, build capability, then increase. Related: [[error-budget]](/topic/system-design/error-budget).</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: Your company has a 99.9% SLO but product management keeps pushing features that increase risk. Engineering wants to slow down. How do you use error budgets to resolve this conflict?</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> Error budgets transform the reliability vs. velocity debate from opinion to data. Implementation: (1) <strong>Quantify the budget</strong>: 99.9% SLO = 43.2 minutes/month error budget. Track consumption in real-time dashboard visible to all stakeholders. (2) <strong>Attribute consumption</strong>: Categorize every incident by cause: deployment issues, infrastructure, dependencies, etc. "Feature X deployment caused 15 minutes of errors" is concrete. (3) <strong>Define spending rules</strong>: With PM and engineering leadership, agree on policy: >50% budget remaining = full velocity, 25-50% = only low-risk deploys, <25% = reliability work only. (4) <strong>Make trade-offs explicit</strong>: "Launching Feature Y has estimated 5% chance of 20-minute outage. That would consume 46% of remaining budget. Worth it?" Now it's a business decision, not a fight. (5) <strong>Post-incident review</strong>: After incidents, calculate budget impact. "We used 60% of monthly budget on this incident. To stay within SLO, we need 2 weeks of stability focus." (6) <strong>Reward efficiency</strong>: Teams that ship reliably earn more budget trust. Teams that cause incidents get more scrutiny. (7) <strong>Escalation path</strong>: If PM insists on risky launch with low budget, escalate to executive who can approve SLO reduction with its business consequences. Key insight: <span style="color: #22c55e; font-weight: 600;">Error budgets make reliability a shared responsibility</span>, not just engineering's burden. PM owns velocity, engineering owns reliability, both own the SLO. Related: [[site-reliability-engineering]](/topic/system-design/sre-practices).</p>
    </div>
  </div>
</div>

---

## Real-Life Failure Story

### The AWS S3 Outage (February 28, 2017)

<div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: #fbbf24; font-size: 18px;">The Day the Internet Broke</h4>

  <p style="color: #cbd5e1; line-height: 1.7;">On February 28, 2017, a large portion of the internet went down because Amazon S3 in US-EAST-1 became unavailable for nearly 4 hours. This single outage affected thousands of websites and services globally.</p>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
    <div>
      <h5 style="color: #f87171; margin-bottom: 12px;">What Went Wrong</h5>
      <ol style="color: #e2e8f0; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
        <li>Engineer debugging billing system slowdown</li>
        <li>Ran command to remove small set of servers</li>
        <li><strong style="color: #fbbf24;">Typo removed far more servers than intended</strong></li>
        <li>Removed servers were S3's index subsystem</li>
        <li>S3 couldn't locate any stored data</li>
        <li>Cascading failures across dependent services</li>
        <li>AWS's own status dashboard went down (it used S3)</li>
      </ol>
    </div>
    <div>
      <h5 style="color: #34d399; margin-bottom: 12px;">Root Causes</h5>
      <ul style="color: #e2e8f0; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
        <li>No safeguards on destructive commands</li>
        <li>Single region dependency for critical systems</li>
        <li>Monitoring depended on monitored system</li>
        <li>Index rebuild took hours (unexpected)</li>
        <li>No runbook for this failure scenario</li>
      </ul>
    </div>
  </div>

  <div style="background: rgba(239, 68, 68, 0.2); border-radius: 8px; padding: 16px; margin-top: 20px; border: 1px solid rgba(239, 68, 68, 0.3);">
    <strong style="color: #fca5a5;">The Irony:</strong>
    <span style="color: #fecaca;"> Customers couldn't even check if AWS was having issues because the AWS status dashboard was hosted on S3. This violates the principle that monitoring systems should be independent of the systems they monitor.</span>
  </div>
</div>

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #92400e; margin-top: 0;">Key Lessons for System Design</h4>
  <div style="display: grid; gap: 12px;">
    <div style="background: white; padding: 12px 16px; border-radius: 8px; display: flex; gap: 12px;">
      <span style="color: #f59e0b; font-size: 20px;">1</span>
      <div>
        <strong style="color: #1e293b;">Add safeguards to destructive operations</strong>
        <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">Rate-limit infrastructure changes. Require confirmation for removing more than N resources.</p>
      </div>
    </div>
    <div style="background: white; padding: 12px 16px; border-radius: 8px; display: flex; gap: 12px;">
      <span style="color: #f59e0b; font-size: 20px;">2</span>
      <div>
        <strong style="color: #1e293b;">Monitoring must be independent</strong>
        <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">If your alerting goes down with your system, you're blind during the worst moments.</p>
      </div>
    </div>
    <div style="background: white; padding: 12px 16px; border-radius: 8px; display: flex; gap: 12px;">
      <span style="color: #f59e0b; font-size: 20px;">3</span>
      <div>
        <strong style="color: #1e293b;">Multi-region is not optional for critical systems</strong>
        <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">Single region failures will happen. Design for it.</p>
      </div>
    </div>
    <div style="background: white; padding: 12px 16px; border-radius: 8px; display: flex; gap: 12px;">
      <span style="color: #f59e0b; font-size: 20px;">4</span>
      <div>
        <strong style="color: #1e293b;">Recovery time matters as much as failure prevention</strong>
        <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">The index rebuild taking hours was unexpected. Test recovery procedures regularly.</p>
      </div>
    </div>
  </div>
</div>

---

## Common Mistakes

<div style="background: #fef2f2; border: 2px solid #fecaca; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #991b1b; margin-top: 0;">Availability Anti-Patterns</h4>
  <div style="display: grid; gap: 12px;">
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">Not testing failover regularly</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Failover mechanisms break silently. That "backup" you haven't tested in 6 months? It probably doesn't work. Schedule monthly failover tests.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">Monitoring depends on monitored system</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">If your alerts route through the same infrastructure as your app, both fail together. Use independent monitoring paths.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">Ignoring correlated failures</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Two servers on the same rack share power, network, and physical security. "Redundant" servers in the same failure domain aren't redundant.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">No graceful degradation</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">System goes from 100% to 0% when one component fails. Design for partial functionality - show cached data, disable non-critical features.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">Treating availability as purely technical</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Availability is a business decision. Don't engineer for 99.99% when 99.9% meets business needs - you'll spend 10x the resources for marginal benefit.</p>
    </div>
  </div>
</div>

---

## Quick Reference Card

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Availability Cheat Sheet</h4>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div>
      <h5 style="color: #334155; margin-bottom: 12px;">Key Formulas</h5>
      <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
        <li><strong>Availability</strong> = MTBF / (MTBF + MTTR)</li>
        <li><strong>Series</strong>: A<sub>total</sub> = A<sub>1</sub> × A<sub>2</sub> × A<sub>3</sub></li>
        <li><strong>Parallel</strong>: A<sub>total</sub> = 1 - (1-A<sub>1</sub>)(1-A<sub>2</sub>)</li>
        <li><strong>Error Budget</strong> = 100% - SLO Target</li>
        <li><strong>MTBF</strong> = Total Uptime / Number of Failures</li>
        <li><strong>MTTR</strong> = Total Downtime / Number of Failures</li>
      </ul>
    </div>
    <div>
      <h5 style="color: #334155; margin-bottom: 12px;">Failover Types</h5>
      <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8;">
        <li><strong>Cold</strong>: Backup off, RTO: hours</li>
        <li><strong>Warm</strong>: Backup idle, RTO: minutes</li>
        <li><strong>Hot</strong>: Backup active, RTO: seconds</li>
        <li><strong>Active-Passive</strong>: One serves, one waits</li>
        <li><strong>Active-Active</strong>: All serve traffic</li>
      </ul>
    </div>
  </div>

  <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
    <h5 style="color: #334155; margin-bottom: 12px;">Availability Targets by Use Case</h5>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; font-size: 13px;">
      <div style="background: #fee2e2; padding: 12px; border-radius: 8px; text-align: center;">
        <div style="color: #64748b; font-size: 12px;">Internal Tools</div>
        <strong style="color: #dc2626; font-size: 18px;">99%</strong>
        <div style="color: #94a3b8; font-size: 11px;">3.65 days/year</div>
      </div>
      <div style="background: #fef3c7; padding: 12px; border-radius: 8px; text-align: center;">
        <div style="color: #64748b; font-size: 12px;">Business Apps</div>
        <strong style="color: #d97706; font-size: 18px;">99.9%</strong>
        <div style="color: #94a3b8; font-size: 11px;">8.76 hours/year</div>
      </div>
      <div style="background: #dcfce7; padding: 12px; border-radius: 8px; text-align: center;">
        <div style="color: #64748b; font-size: 12px;">E-commerce</div>
        <strong style="color: #16a34a; font-size: 18px;">99.99%</strong>
        <div style="color: #94a3b8; font-size: 11px;">52.6 min/year</div>
      </div>
      <div style="background: #dbeafe; padding: 12px; border-radius: 8px; text-align: center;">
        <div style="color: #64748b; font-size: 12px;">Financial</div>
        <strong style="color: #2563eb; font-size: 18px;">99.999%</strong>
        <div style="color: #94a3b8; font-size: 11px;">5.26 min/year</div>
      </div>
    </div>
  </div>

  <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
    <h5 style="color: #334155; margin-bottom: 12px;">MTTR Components</h5>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; font-size: 13px;">
      <div style="background: #fef2f2; padding: 10px; border-radius: 6px; text-align: center;">
        <strong style="color: #991b1b;">MTTD</strong>
        <div style="color: #64748b; font-size: 11px;">Time to Detect</div>
      </div>
      <div style="background: #fffbeb; padding: 10px; border-radius: 6px; text-align: center;">
        <strong style="color: #92400e;">MTTI</strong>
        <div style="color: #64748b; font-size: 11px;">Time to Identify</div>
      </div>
      <div style="background: #eff6ff; padding: 10px; border-radius: 6px; text-align: center;">
        <strong style="color: #1e40af;">MTTF</strong>
        <div style="color: #64748b; font-size: 11px;">Time to Fix</div>
      </div>
      <div style="background: #f0fdf4; padding: 10px; border-radius: 6px; text-align: center;">
        <strong style="color: #166534;">MTTV</strong>
        <div style="color: #64748b; font-size: 11px;">Time to Verify</div>
      </div>
    </div>
  </div>
</div>

---

## Related Topics

- [[load-balancing]](/topic/system-design/load-balancing) - Distributing traffic across redundant instances
- [[database-replication]](/topic/system-design/database-replication) - Keeping data synchronized across replicas
- [[circuit-breaker]](/topic/design-patterns/circuit-breaker) - Preventing cascading failures
- [[disaster-recovery]](/topic/system-design/disaster-recovery) - Planning for catastrophic failures
- [[chaos-engineering]](/topic/system-design/chaos-engineering) - Testing resilience through controlled failures
- [[distributed-consensus]](/topic/system-design/consensus) - Coordination for split-brain prevention
- [[caching]](/topic/system-design/caching) - Improving availability through redundant data
- [[observability]](/topic/system-design/observability) - Detecting and diagnosing failures quickly
