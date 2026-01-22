# Availability

## Overview

Availability measures the percentage of time a system is operational and accessible to users. In simple terms, it answers the question: **"When I try to use this system, will it work?"**

Think of availability like a store's operating hours, but instead of closing at night, we aim to be open 24/7/365. The challenge is that unlike a store, software systems have countless components that can fail - servers, networks, databases, and code itself.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">The Availability Formula</h4>
  <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; text-align: center; font-size: 18px;">
    <strong style="color: #1e293b;">Availability = Uptime / (Uptime + Downtime) x 100%</strong>
  </div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px;">
    <div style="background: #f0fdf4; padding: 12px 16px; border-radius: 8px; border: 1px solid #bbf7d0;">
      <strong style="color: #166534;">Uptime</strong>
      <p style="color: #15803d; margin: 4px 0 0 0; font-size: 14px;">Time system is operational and serving requests correctly</p>
    </div>
    <div style="background: #fef2f2; padding: 12px 16px; border-radius: 8px; border: 1px solid #fecaca;">
      <strong style="color: #991b1b;">Downtime</strong>
      <p style="color: #b91c1c; margin: 4px 0 0 0; font-size: 14px;">Time system is unavailable, degraded, or failing to meet SLA</p>
    </div>
  </div>
</div>

---

## Why This Matters

### The Cost of Downtime

**Amazon** loses approximately $220,000 per minute during an outage. During Prime Day, this could exceed $1 million per minute.

**Meta (Facebook)** experienced a 6-hour outage in October 2021 that cost an estimated $100 million in lost advertising revenue, plus immeasurable reputation damage.

**Robinhood** went down during a historic market rally in 2020, preventing users from trading. This led to class-action lawsuits and Congressional hearings.

**Delta Airlines** suffered a 5-hour outage in 2016 that cost $150 million and stranded thousands of passengers.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">The "Nines" of Availability</h4>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <tr style="background: #f1f5f9;">
      <th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Availability</th>
      <th style="padding: 12px; text-align: center; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Nines</th>
      <th style="padding: 12px; text-align: center; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Downtime/Year</th>
      <th style="padding: 12px; text-align: center; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Downtime/Month</th>
      <th style="padding: 12px; text-align: left; color: #1e293b; border-bottom: 2px solid #e2e8f0;">Example Use Case</th>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 12px; color: #475569;">99%</td>
      <td style="padding: 12px; text-align: center; color: #dc2626;">2 nines</td>
      <td style="padding: 12px; text-align: center; color: #dc2626;">3.65 days</td>
      <td style="padding: 12px; text-align: center; color: #dc2626;">7.2 hours</td>
      <td style="padding: 12px; color: #475569;">Internal tools</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 12px; color: #475569;">99.9%</td>
      <td style="padding: 12px; text-align: center; color: #f59e0b;">3 nines</td>
      <td style="padding: 12px; text-align: center; color: #f59e0b;">8.76 hours</td>
      <td style="padding: 12px; text-align: center; color: #f59e0b;">43.8 min</td>
      <td style="padding: 12px; color: #475569;">Business applications</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 12px; color: #475569;">99.99%</td>
      <td style="padding: 12px; text-align: center; color: #16a34a;">4 nines</td>
      <td style="padding: 12px; text-align: center; color: #16a34a;">52.6 min</td>
      <td style="padding: 12px; text-align: center; color: #16a34a;">4.38 min</td>
      <td style="padding: 12px; color: #475569;">E-commerce, SaaS</td>
    </tr>
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 12px; color: #475569;">99.999%</td>
      <td style="padding: 12px; text-align: center; color: #0ea5e9;">5 nines</td>
      <td style="padding: 12px; text-align: center; color: #0ea5e9;">5.26 min</td>
      <td style="padding: 12px; text-align: center; color: #0ea5e9;">26.3 sec</td>
      <td style="padding: 12px; color: #475569;">Financial systems</td>
    </tr>
    <tr>
      <td style="padding: 12px; color: #475569;">99.9999%</td>
      <td style="padding: 12px; text-align: center; color: #7c3aed;">6 nines</td>
      <td style="padding: 12px; text-align: center; color: #7c3aed;">31.5 sec</td>
      <td style="padding: 12px; text-align: center; color: #7c3aed;">2.63 sec</td>
      <td style="padding: 12px; color: #475569;">Critical infrastructure</td>
    </tr>
  </table>
  <p style="color: #64748b; font-size: 13px; margin: 12px 0 0 0; text-align: center;">Each additional "nine" is exponentially harder and more expensive to achieve</p>
</div>

---

## How It Works

### SLA, SLO, and SLI - The Availability Framework

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">The Three Pillars</h4>
  <div style="display: grid; gap: 16px;">
    <div style="background: #eff6ff; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <strong style="color: #1e293b;">SLI - Service Level Indicator</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;"><strong>What you measure.</strong> Quantitative metrics like request latency (P99 < 200ms), error rate (< 0.1%), or uptime percentage.</p>
    </div>
    <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <strong style="color: #1e293b;">SLO - Service Level Objective</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;"><strong>Your internal target.</strong> The goal you set for each SLI. Always stricter than your SLA to give you buffer.</p>
    </div>
    <div style="background: #fce7f3; padding: 16px; border-radius: 8px; border-left: 4px solid #ec4899;">
      <strong style="color: #1e293b;">SLA - Service Level Agreement</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;"><strong>Your external promise.</strong> Legal contract with customers that includes penalties for violations.</p>
    </div>
  </div>
</div>

### Error Budget

The error budget is a powerful concept: **Error Budget = 100% - SLO Target**

If your SLO is 99.9%, your error budget is 0.1% = **43.8 minutes of downtime per month**.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Error Budget in Practice</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
    <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; border: 1px solid #bbf7d0;">
      <strong style="color: #166534;">Budget Available</strong>
      <ul style="color: #15803d; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
        <li>Deploy new features</li>
        <li>Run experiments</li>
        <li>Make risky changes</li>
        <li>Focus on velocity</li>
      </ul>
    </div>
    <div style="background: #fef2f2; padding: 16px; border-radius: 8px; border: 1px solid #fecaca;">
      <strong style="color: #991b1b;">Budget Exhausted</strong>
      <ul style="color: #b91c1c; margin: 8px 0 0 0; padding-left: 20px; font-size: 14px;">
        <li>Stop feature deployments</li>
        <li>Focus on reliability fixes</li>
        <li>Review recent changes</li>
        <li>All hands on stability</li>
      </ul>
    </div>
  </div>
</div>

### Calculating System Availability

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Availability Math</h4>

  <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
    <strong style="color: #1e293b;">Components in Series (ALL must work)</strong>
    <div style="display: flex; align-items: center; gap: 8px; margin: 12px 0;">
      <div style="background: #3b82f6; color: white; padding: 8px 16px; border-radius: 4px;">A: 99.9%</div>
      <span style="color: #64748b;">-></span>
      <div style="background: #3b82f6; color: white; padding: 8px 16px; border-radius: 4px;">B: 99.9%</div>
      <span style="color: #64748b;">-></span>
      <div style="background: #3b82f6; color: white; padding: 8px 16px; border-radius: 4px;">C: 99.9%</div>
    </div>
    <code style="color: #1e293b; font-size: 14px;">Total = A x B x C = 0.999 x 0.999 x 0.999 = <strong style="color: #dc2626;">99.7%</strong></code>
  </div>

  <div style="background: #f1f5f9; padding: 16px; border-radius: 8px;">
    <strong style="color: #1e293b;">Components in Parallel (ANY can work)</strong>
    <div style="display: flex; align-items: center; gap: 16px; margin: 12px 0;">
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <div style="background: #10b981; color: white; padding: 8px 16px; border-radius: 4px;">A: 99%</div>
        <div style="background: #10b981; color: white; padding: 8px 16px; border-radius: 4px;">B: 99%</div>
      </div>
      <span style="color: #64748b;">Either can serve</span>
    </div>
    <code style="color: #1e293b; font-size: 14px;">Total = 1 - (1-A) x (1-B) = 1 - 0.01 x 0.01 = <strong style="color: #16a34a;">99.99%</strong></code>
  </div>
</div>

### Redundancy Patterns

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Active-Passive vs Active-Active</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div>
      <strong style="color: #334155;">Active-Passive (Standby)</strong>
      <div style="display: flex; align-items: center; gap: 12px; margin: 12px 0;">
        <div style="background: #16a34a; color: white; padding: 12px 20px; border-radius: 8px; text-align: center;">
          <strong>Primary</strong><br><span style="font-size: 12px;">Active</span>
        </div>
        <span style="color: #64748b;">heartbeat</span>
        <div style="background: #94a3b8; color: white; padding: 12px 20px; border-radius: 8px; text-align: center;">
          <strong>Secondary</strong><br><span style="font-size: 12px;">Standby</span>
        </div>
      </div>
      <p style="color: #64748b; font-size: 13px; margin: 0;">Standby takes over on primary failure. Simple but wastes resources.</p>
    </div>
    <div>
      <strong style="color: #334155;">Active-Active (Load Balanced)</strong>
      <div style="display: flex; align-items: center; gap: 8px; margin: 12px 0;">
        <div style="background: #16a34a; color: white; padding: 12px 16px; border-radius: 8px; text-align: center;">
          <strong>Node 1</strong><br><span style="font-size: 12px;">Active</span>
        </div>
        <div style="background: #16a34a; color: white; padding: 12px 16px; border-radius: 8px; text-align: center;">
          <strong>Node 2</strong><br><span style="font-size: 12px;">Active</span>
        </div>
        <div style="background: #16a34a; color: white; padding: 12px 16px; border-radius: 8px; text-align: center;">
          <strong>Node 3</strong><br><span style="font-size: 12px;">Active</span>
        </div>
      </div>
      <p style="color: #64748b; font-size: 13px; margin: 0;">All nodes serve traffic. Better resource utilization and performance.</p>
    </div>
  </div>
</div>

---

## Real-Life Failure Story

### The AWS S3 Outage (2017)

**What Happened:** On February 28, 2017, a large portion of the internet went down because Amazon S3 (Simple Storage Service) in the US-EAST-1 region became unavailable for nearly 4 hours.

**The Timeline:**
1. An engineer was debugging an issue with the S3 billing system
2. They ran a command to remove a small number of servers
3. Due to a typo, they accidentally removed a much larger set of servers
4. These servers were part of the S3 index subsystem - the "brain" of S3
5. S3 couldn't find where data was stored, causing cascading failures
6. Hundreds of other AWS services that depended on S3 failed
7. Major websites including Slack, Trello, and even parts of AWS's own dashboard went down

**Root Cause:** A human error (typo) combined with insufficient safeguards.

**How They Fixed It:**
1. **Immediate:** Manually added capacity back, but recovery took hours due to the index needing to rebuild
2. **Short-term:** Added safeguards to prevent removing too many servers at once
3. **Long-term:** Improved automation, added rate limiting on infrastructure changes, improved recovery procedures

**The Irony:** AWS's own status dashboard went down because it depended on S3, so customers couldn't even check if AWS was having issues.

<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #92400e; margin-top: 0;">Key Lessons</h4>
  <ul style="color: #78350f; margin: 0; padding-left: 20px;">
    <li>A single region failure can cascade to many services</li>
    <li>Your monitoring system shouldn't depend on the system being monitored</li>
    <li>Human error is inevitable - build safeguards</li>
    <li>Recovery time matters as much as failure prevention</li>
  </ul>
</div>

---

## Implementation

### Python - High Availability System Components

```python
import time
import threading
import random
from dataclasses import dataclass, field
from typing import List, Dict, Callable, Optional
from enum import Enum
from collections import deque
import logging

logger = logging.getLogger(__name__)


class HealthStatus(Enum):
    HEALTHY = "healthy"
    DEGRADED = "degraded"
    UNHEALTHY = "unhealthy"


@dataclass
class HealthCheck:
    """Health check configuration and state."""
    name: str
    check_function: Callable[[], bool]
    interval_seconds: float = 10.0
    timeout_seconds: float = 5.0
    healthy_threshold: int = 2  # Consecutive successes to be healthy
    unhealthy_threshold: int = 3  # Consecutive failures to be unhealthy

    # State
    consecutive_successes: int = 0
    consecutive_failures: int = 0
    last_check_time: float = 0
    last_status: HealthStatus = HealthStatus.HEALTHY


class CircuitBreaker:
    """
    Circuit breaker pattern for fault tolerance.

    States:
    - CLOSED: Normal operation, requests pass through
    - OPEN: Failing fast, requests rejected immediately
    - HALF_OPEN: Testing recovery, allows limited requests
    """

    def __init__(self,
                 failure_threshold: int = 5,
                 recovery_timeout: float = 30.0,
                 half_open_max_calls: int = 3):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.half_open_max_calls = half_open_max_calls

        self.failure_count = 0
        self.success_count = 0
        self.last_failure_time = 0
        self.state = "closed"
        self.half_open_calls = 0
        self._lock = threading.Lock()

    def can_execute(self) -> bool:
        """Check if request should be allowed."""
        with self._lock:
            if self.state == "closed":
                return True

            if self.state == "open":
                # Check if recovery timeout has passed
                if time.time() - self.last_failure_time >= self.recovery_timeout:
                    self.state = "half_open"
                    self.half_open_calls = 0
                    logger.info("Circuit breaker entering half-open state")
                    return True
                return False

            # Half-open: allow limited calls
            if self.half_open_calls < self.half_open_max_calls:
                self.half_open_calls += 1
                return True
            return False

    def record_success(self):
        """Record a successful call."""
        with self._lock:
            if self.state == "half_open":
                self.success_count += 1
                if self.success_count >= self.half_open_max_calls:
                    self.state = "closed"
                    self.failure_count = 0
                    self.success_count = 0
                    logger.info("Circuit breaker closed - service recovered")
            else:
                self.failure_count = 0

    def record_failure(self):
        """Record a failed call."""
        with self._lock:
            self.failure_count += 1
            self.last_failure_time = time.time()

            if self.state == "half_open":
                self.state = "open"
                self.success_count = 0
                logger.warning("Circuit breaker opened from half-open state")
            elif self.failure_count >= self.failure_threshold:
                self.state = "open"
                logger.warning(f"Circuit breaker opened after {self.failure_count} failures")


class RetryWithBackoff:
    """Retry logic with exponential backoff."""

    def __init__(self,
                 max_retries: int = 3,
                 base_delay: float = 1.0,
                 max_delay: float = 30.0,
                 exponential_base: float = 2.0,
                 jitter: bool = True):
        self.max_retries = max_retries
        self.base_delay = base_delay
        self.max_delay = max_delay
        self.exponential_base = exponential_base
        self.jitter = jitter

    def execute(self,
                func: Callable,
                *args,
                retry_on: tuple = (Exception,),
                **kwargs):
        """Execute function with retry logic."""
        last_exception = None

        for attempt in range(self.max_retries + 1):
            try:
                return func(*args, **kwargs)
            except retry_on as e:
                last_exception = e

                if attempt == self.max_retries:
                    logger.error(f"All {self.max_retries} retries exhausted")
                    raise

                delay = self._calculate_delay(attempt)
                logger.warning(f"Attempt {attempt + 1} failed, retrying in {delay:.2f}s: {e}")
                time.sleep(delay)

        raise last_exception

    def _calculate_delay(self, attempt: int) -> float:
        """Calculate delay with exponential backoff and optional jitter."""
        delay = self.base_delay * (self.exponential_base ** attempt)
        delay = min(delay, self.max_delay)

        if self.jitter:
            # Add random jitter (0-100% of delay)
            delay = delay * (0.5 + random.random())

        return delay


class HealthMonitor:
    """
    Monitor system health and manage health checks.

    Implements liveness, readiness, and deep health checks.
    """

    def __init__(self):
        self.checks: Dict[str, HealthCheck] = {}
        self.running = False
        self._thread: Optional[threading.Thread] = None

    def register_check(self, check: HealthCheck):
        """Register a health check."""
        self.checks[check.name] = check

    def start(self):
        """Start health monitoring in background thread."""
        self.running = True
        self._thread = threading.Thread(target=self._monitor_loop, daemon=True)
        self._thread.start()

    def stop(self):
        """Stop health monitoring."""
        self.running = False
        if self._thread:
            self._thread.join(timeout=5)

    def _monitor_loop(self):
        """Background loop that runs health checks."""
        while self.running:
            for name, check in self.checks.items():
                if time.time() - check.last_check_time >= check.interval_seconds:
                    self._run_check(check)
            time.sleep(1)

    def _run_check(self, check: HealthCheck):
        """Run a single health check."""
        check.last_check_time = time.time()

        try:
            # Run check with timeout
            result = check.check_function()

            if result:
                check.consecutive_successes += 1
                check.consecutive_failures = 0

                if check.consecutive_successes >= check.healthy_threshold:
                    check.last_status = HealthStatus.HEALTHY
            else:
                check.consecutive_failures += 1
                check.consecutive_successes = 0

                if check.consecutive_failures >= check.unhealthy_threshold:
                    check.last_status = HealthStatus.UNHEALTHY
                elif check.consecutive_failures > 0:
                    check.last_status = HealthStatus.DEGRADED

        except Exception as e:
            logger.error(f"Health check {check.name} failed with exception: {e}")
            check.consecutive_failures += 1
            check.consecutive_successes = 0

            if check.consecutive_failures >= check.unhealthy_threshold:
                check.last_status = HealthStatus.UNHEALTHY

    def get_status(self) -> Dict[str, any]:
        """Get overall health status."""
        statuses = {name: check.last_status.value for name, check in self.checks.items()}

        # Overall status is worst individual status
        if any(s == HealthStatus.UNHEALTHY.value for s in statuses.values()):
            overall = HealthStatus.UNHEALTHY
        elif any(s == HealthStatus.DEGRADED.value for s in statuses.values()):
            overall = HealthStatus.DEGRADED
        else:
            overall = HealthStatus.HEALTHY

        return {
            "status": overall.value,
            "checks": statuses,
            "timestamp": time.time()
        }

    def is_ready(self) -> bool:
        """Check if service is ready to receive traffic."""
        status = self.get_status()
        return status["status"] != HealthStatus.UNHEALTHY.value

    def is_live(self) -> bool:
        """Check if service is alive (should not be killed)."""
        # Liveness is simpler - just check if process is responsive
        return True


class Failover:
    """
    Manage failover between primary and backup services.
    """

    def __init__(self,
                 primary_endpoint: str,
                 backup_endpoints: List[str],
                 health_check_interval: float = 5.0):
        self.primary = primary_endpoint
        self.backups = backup_endpoints
        self.health_check_interval = health_check_interval

        self.current_endpoint = primary_endpoint
        self.endpoint_health: Dict[str, bool] = {
            primary_endpoint: True,
            **{ep: True for ep in backup_endpoints}
        }
        self._lock = threading.Lock()

    def get_endpoint(self) -> str:
        """Get current healthy endpoint."""
        with self._lock:
            if self.endpoint_health.get(self.current_endpoint, False):
                return self.current_endpoint

            # Current endpoint unhealthy, try to find healthy one
            # Prefer primary if healthy
            if self.endpoint_health.get(self.primary, False):
                self.current_endpoint = self.primary
                logger.info(f"Failing back to primary: {self.primary}")
                return self.current_endpoint

            # Try backups in order
            for backup in self.backups:
                if self.endpoint_health.get(backup, False):
                    self.current_endpoint = backup
                    logger.info(f"Failing over to backup: {backup}")
                    return self.current_endpoint

            # All endpoints unhealthy, return primary anyway
            logger.error("All endpoints unhealthy, returning primary")
            return self.primary

    def mark_healthy(self, endpoint: str):
        """Mark an endpoint as healthy."""
        with self._lock:
            self.endpoint_health[endpoint] = True

    def mark_unhealthy(self, endpoint: str):
        """Mark an endpoint as unhealthy."""
        with self._lock:
            was_current = endpoint == self.current_endpoint
            self.endpoint_health[endpoint] = False

            if was_current:
                logger.warning(f"Current endpoint {endpoint} marked unhealthy")


@dataclass
class SLOTracker:
    """
    Track SLO metrics and error budget.
    """
    slo_target: float = 0.999  # 99.9%
    window_seconds: int = 2592000  # 30 days

    # Metrics
    total_requests: int = 0
    successful_requests: int = 0
    request_history: deque = field(default_factory=lambda: deque(maxlen=10000))

    def record_request(self, success: bool):
        """Record a request result."""
        self.total_requests += 1
        if success:
            self.successful_requests += 1

        self.request_history.append({
            "timestamp": time.time(),
            "success": success
        })

    def get_current_availability(self) -> float:
        """Calculate current availability percentage."""
        if self.total_requests == 0:
            return 1.0
        return self.successful_requests / self.total_requests

    def get_error_budget_remaining(self) -> float:
        """
        Calculate remaining error budget as percentage.

        Returns value between 0 and 1.
        0 = budget exhausted, 1 = full budget available
        """
        current = self.get_current_availability()
        max_allowed_errors = 1 - self.slo_target
        actual_errors = 1 - current

        if actual_errors >= max_allowed_errors:
            return 0.0

        return (max_allowed_errors - actual_errors) / max_allowed_errors

    def can_deploy(self) -> bool:
        """Check if error budget allows risky changes."""
        return self.get_error_budget_remaining() > 0.2  # 20% buffer


# Example usage
def create_high_availability_service():
    """Create a service with high availability components."""

    # Health monitor with checks
    health_monitor = HealthMonitor()

    def check_database():
        # Simulate database health check
        return True  # Would actually query DB

    def check_cache():
        # Simulate cache health check
        return True  # Would actually ping cache

    health_monitor.register_check(HealthCheck(
        name="database",
        check_function=check_database,
        interval_seconds=10,
        unhealthy_threshold=3
    ))

    health_monitor.register_check(HealthCheck(
        name="cache",
        check_function=check_cache,
        interval_seconds=5,
        unhealthy_threshold=2
    ))

    # Circuit breaker for external service calls
    circuit_breaker = CircuitBreaker(
        failure_threshold=5,
        recovery_timeout=30
    )

    # Retry logic
    retry = RetryWithBackoff(
        max_retries=3,
        base_delay=1.0,
        max_delay=10.0
    )

    # Failover for backend services
    failover = Failover(
        primary_endpoint="http://primary:8080",
        backup_endpoints=["http://backup1:8080", "http://backup2:8080"]
    )

    # SLO tracking
    slo_tracker = SLOTracker(slo_target=0.999)

    return {
        "health_monitor": health_monitor,
        "circuit_breaker": circuit_breaker,
        "retry": retry,
        "failover": failover,
        "slo_tracker": slo_tracker
    }
```

---

## Interview Questions

### Q1: How do you achieve 99.99% (4 nines) availability?

**Answer:**
1. **Eliminate single points of failure**: Redundancy at every layer (servers, databases, network, regions)
2. **Fast failure detection**: Health checks every few seconds, not minutes
3. **Automated recovery**: Auto-scaling, self-healing infrastructure
4. **Graceful degradation**: Return cached data or reduced functionality instead of errors
5. **Multi-region deployment**: Survive entire datacenter failures
6. **Chaos engineering**: Regularly test failure scenarios

At 99.99%, you only have 52 minutes of downtime per year. This requires automated failover that completes in under a minute.

### Q2: What's the difference between RTO and RPO?

**Answer:**
- **RTO (Recovery Time Objective)**: How quickly must you recover? "We need to be back online within 15 minutes"
- **RPO (Recovery Point Objective)**: How much data can you lose? "We can't lose more than 5 minutes of transactions"

Example: Banking system might have RTO=5 minutes, RPO=0 (no data loss acceptable). Blog site might have RTO=4 hours, RPO=24 hours.

### Q3: Explain the trade-offs between availability and consistency.

**Answer:**
CAP theorem states you can only have 2 of 3: Consistency, Availability, Partition tolerance.

In practice (since partitions happen):
- **CP systems** (like traditional databases): During partition, reject writes to maintain consistency. Sacrifices availability.
- **AP systems** (like Cassandra): During partition, accept writes on both sides, resolve conflicts later. Sacrifices consistency.

For most web applications, eventual consistency with high availability is preferable. For banking, strong consistency is required even at the cost of availability.

### Q4: How do you handle cascading failures?

**Answer:**
1. **Circuit breakers**: Stop calling a failing service, fail fast
2. **Bulkheads**: Isolate failure domains (separate thread pools, connection pools)
3. **Timeouts**: Don't wait forever for slow services
4. **Load shedding**: Reject some requests when overloaded rather than slow down all
5. **Back-pressure**: Tell upstream services to slow down
6. **Fallbacks**: Return cached data or default responses

### Q5: What's the difference between failover types (cold, warm, hot)?

**Answer:**
- **Cold failover**: Backup is off. Start it when primary fails. RTO: minutes to hours. Cheapest.
- **Warm failover**: Backup is running but not serving. Data synced. RTO: seconds to minutes.
- **Hot failover**: Multiple actives serving traffic. Instant failover. RTO: sub-second. Most expensive.

Financial systems typically need hot failover. Internal tools might be fine with cold failover.

---

## Common Mistakes

<div style="background: #fef2f2; border: 2px solid #fecaca; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #991b1b; margin-top: 0;">Mistakes to Avoid</h4>
  <div style="display: grid; gap: 12px;">
    <div style="background: white; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">Not testing failover regularly</strong>
      <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">Failover mechanisms often break silently. Test monthly at minimum.</p>
    </div>
    <div style="background: white; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">Monitoring depends on monitored system</strong>
      <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">If your alerts go through the same path as your app, they'll fail together.</p>
    </div>
    <div style="background: white; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">Single region deployment</strong>
      <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">Even cloud regions have complete outages. Multi-region is required for high availability.</p>
    </div>
    <div style="background: white; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">No graceful degradation</strong>
      <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">Complete failure when one component fails. Design for partial functionality.</p>
    </div>
    <div style="background: white; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
      <strong style="color: #1e293b;">Ignoring correlated failures</strong>
      <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">Two servers in the same rack share power and network. Spread across failure domains.</p>
    </div>
  </div>
</div>

---

## Quick Reference Card

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Availability Cheat Sheet</h4>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <div>
      <h5 style="color: #334155; margin-bottom: 8px;">Key Formulas</h5>
      <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px;">
        <li>Series: A1 x A2 x A3</li>
        <li>Parallel: 1 - (1-A1)(1-A2)</li>
        <li>Error Budget: 100% - SLO</li>
        <li>MTBF = Uptime / Failures</li>
        <li>MTTR = Downtime / Failures</li>
      </ul>
    </div>
    <div>
      <h5 style="color: #334155; margin-bottom: 8px;">Resilience Patterns</h5>
      <ul style="color: #475569; margin: 0; padding-left: 20px; font-size: 14px;">
        <li>Circuit breaker</li>
        <li>Retry with backoff</li>
        <li>Timeout</li>
        <li>Bulkhead</li>
        <li>Fallback</li>
      </ul>
    </div>
  </div>

  <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
    <h5 style="color: #334155; margin-bottom: 8px;">Health Check Types</h5>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; font-size: 13px;">
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px;">
        <strong style="color: #1e293b;">Liveness</strong><br>
        <span style="color: #64748b;">Is process running?</span>
      </div>
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px;">
        <strong style="color: #1e293b;">Readiness</strong><br>
        <span style="color: #64748b;">Can serve traffic?</span>
      </div>
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px;">
        <strong style="color: #1e293b;">Deep</strong><br>
        <span style="color: #64748b;">All dependencies OK?</span>
      </div>
    </div>
  </div>

  <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
    <h5 style="color: #334155; margin-bottom: 8px;">Availability Targets by Use Case</h5>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 13px;">
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px;">
        <span style="color: #64748b;">Internal tools:</span> <strong style="color: #1e293b;">99%</strong>
      </div>
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px;">
        <span style="color: #64748b;">Business apps:</span> <strong style="color: #1e293b;">99.9%</strong>
      </div>
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px;">
        <span style="color: #64748b;">E-commerce:</span> <strong style="color: #1e293b;">99.99%</strong>
      </div>
      <div style="background: #f1f5f9; padding: 8px; border-radius: 4px;">
        <span style="color: #64748b;">Financial:</span> <strong style="color: #1e293b;">99.999%</strong>
      </div>
    </div>
  </div>
</div>

---

## Related Topics

- [Load Balancing](/topic/system-design/load-balancing)
- [Database Replication](/topic/system-design/database-replication)
- [Disaster Recovery](/topic/system-design/disaster-recovery)
- [Circuit Breaker](/topic/design-patterns/circuit-breaker)
