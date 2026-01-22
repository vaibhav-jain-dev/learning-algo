# Circuit Breaker Pattern

## Overview

The Circuit Breaker pattern is a stability pattern that prevents cascading failures in distributed systems. Like an electrical circuit breaker that trips to prevent house fires, a software circuit breaker stops making requests to a failing service, giving it time to recover while providing fallback responses.

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 20px; font-weight: 600;">CIRCUIT BREAKER STATES</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 24px; flex-wrap: wrap;">
    <div style="background: #dcfce7; padding: 20px 28px; border-radius: 12px; text-align: center; border: 2px solid #22c55e; min-width: 120px;">
      <div style="color: #166534; font-weight: 700; font-size: 16px;">CLOSED</div>
      <div style="color: #15803d; font-size: 12px; margin-top: 4px;">Normal operation</div>
      <div style="color: #16a34a; font-size: 11px;">Requests flow through</div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
      <div style="color: #64748b; font-size: 12px;">failures</div>
      <div style="color: #dc2626; font-size: 20px;">--></div>
    </div>
    <div style="background: #fef2f2; padding: 20px 28px; border-radius: 12px; text-align: center; border: 2px solid #ef4444; min-width: 120px;">
      <div style="color: #dc2626; font-weight: 700; font-size: 16px;">OPEN</div>
      <div style="color: #b91c1c; font-size: 12px; margin-top: 4px;">Circuit tripped</div>
      <div style="color: #dc2626; font-size: 11px;">Requests fail fast</div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
      <div style="color: #64748b; font-size: 12px;">timeout</div>
      <div style="color: #f59e0b; font-size: 20px;">--></div>
    </div>
    <div style="background: #fef3c7; padding: 20px 28px; border-radius: 12px; text-align: center; border: 2px solid #f59e0b; min-width: 120px;">
      <div style="color: #92400e; font-weight: 700; font-size: 16px;">HALF-OPEN</div>
      <div style="color: #b45309; font-size: 12px; margin-top: 4px;">Testing recovery</div>
      <div style="color: #f59e0b; font-size: 11px;">Limited requests</div>
    </div>
  </div>
  <div style="display: flex; justify-content: center; gap: 40px; margin-top: 20px; flex-wrap: wrap;">
    <div style="color: #16a34a; font-size: 13px;">success --> CLOSED</div>
    <div style="color: #dc2626; font-size: 13px;">failure --> OPEN</div>
  </div>
</div>

**The Simple Explanation**: When you call an external service and it starts failing, instead of repeatedly hammering it (which wastes resources and might make things worse), you "open the circuit" - immediately reject requests for a cooling-off period, then carefully test if the service has recovered.

---

## Why It Matters: Real Company Examples

Circuit breakers are essential infrastructure at companies with microservices architectures:

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">CIRCUIT BREAKERS IN PRODUCTION</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
    <div style="background: #fef2f2; border-radius: 12px; padding: 20px; border-left: 4px solid #ef4444;">
      <div style="color: #dc2626; font-weight: 700; margin-bottom: 8px;">Netflix (Hystrix)</div>
      <div style="color: #7f1d1d; font-size: 13px;">Pioneered circuit breakers in microservices. When their recommendations service fails, users still see content - just without personalized suggestions.</div>
    </div>
    <div style="background: #eff6ff; border-radius: 12px; padding: 20px; border-left: 4px solid #3b82f6;">
      <div style="color: #1e40af; font-weight: 700; margin-bottom: 8px;">Uber</div>
      <div style="color: #1d4ed8; font-size: 13px;">Uses circuit breakers between pricing, dispatch, and payment services. A payment outage cannot crash ride-hailing - rides continue, payment retries later.</div>
    </div>
    <div style="background: #ecfdf5; border-radius: 12px; padding: 20px; border-left: 4px solid #10b981;">
      <div style="color: #065f46; font-weight: 700; margin-bottom: 8px;">Twitter</div>
      <div style="color: #047857; font-size: 13px;">Circuit breakers protect the timeline service from cascading failures in mentions, trends, or recommendation services.</div>
    </div>
    <div style="background: #fef3c7; border-radius: 12px; padding: 20px; border-left: 4px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 700; margin-bottom: 8px;">Stripe</div>
      <div style="color: #b45309; font-size: 13px;">Protects payment processing from third-party fraud detection services. If fraud check times out, use cached risk score rather than failing the payment.</div>
    </div>
  </div>
</div>

**Interview Insight**: "What happens when Service B fails?" is a classic interview question. Circuit breakers demonstrate you understand fault tolerance beyond simple retries.

---

## How It Works: The Three States

### State 1: CLOSED (Normal Operation)

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">CLOSED STATE</h3>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 500px; margin: 0 auto;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="background: #dbeafe; padding: 8px 16px; border-radius: 6px; color: #1e40af; font-weight: 600;">Request</span>
      <span style="color: #64748b;">--></span>
      <span style="background: #dcfce7; padding: 8px 16px; border-radius: 6px; color: #166534; font-weight: 600;">Circuit Breaker</span>
      <span style="color: #64748b;">--></span>
      <span style="background: #f1f5f9; padding: 8px 16px; border-radius: 6px; color: #475569;">Service</span>
    </div>
    <div style="background: #dcfce7; border-radius: 8px; padding: 12px 16px; text-align: center;">
      <div style="color: #166534; font-size: 13px;">
        <div>Requests pass through normally</div>
        <div>Tracking: <span style="font-weight: 600;">failures = 0, success = 100</span></div>
      </div>
    </div>
  </div>
</div>

- All requests pass through to the downstream service
- The circuit breaker tracks success/failure counts
- If failures exceed threshold, circuit "trips" to OPEN

### State 2: OPEN (Failing Fast)

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">OPEN STATE</h3>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 500px; margin: 0 auto;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="background: #dbeafe; padding: 8px 16px; border-radius: 6px; color: #1e40af; font-weight: 600;">Request</span>
      <span style="color: #64748b;">--></span>
      <span style="background: #fef2f2; padding: 8px 16px; border-radius: 6px; color: #dc2626; font-weight: 600;">Circuit Breaker</span>
      <span style="color: #dc2626;">-X-></span>
      <span style="background: #f1f5f9; padding: 8px 16px; border-radius: 6px; color: #94a3b8; text-decoration: line-through;">Service</span>
    </div>
    <div style="background: #fef2f2; border-radius: 8px; padding: 12px 16px; text-align: center;">
      <div style="color: #dc2626; font-size: 13px;">
        <div>Requests immediately rejected</div>
        <div>Return <span style="font-weight: 600;">fallback response</span> or <span style="font-weight: 600;">error</span></div>
      </div>
    </div>
  </div>
</div>

- Requests immediately fail without calling the service
- No load on the failing service (gives it time to recover)
- After timeout, transitions to HALF-OPEN

### State 3: HALF-OPEN (Testing Recovery)

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">HALF-OPEN STATE</h3>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 500px; margin: 0 auto;">
    <div style="display: flex; align-items: center; gap: 12px;">
      <span style="background: #dbeafe; padding: 8px 16px; border-radius: 6px; color: #1e40af; font-weight: 600;">1 Request</span>
      <span style="color: #64748b;">--></span>
      <span style="background: #fef3c7; padding: 8px 16px; border-radius: 6px; color: #92400e; font-weight: 600;">Circuit Breaker</span>
      <span style="color: #f59e0b;">--?--></span>
      <span style="background: #f1f5f9; padding: 8px 16px; border-radius: 6px; color: #475569;">Service</span>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px;">
      <div style="background: #dcfce7; border-radius: 8px; padding: 12px; text-align: center;">
        <div style="color: #166534; font-weight: 600; font-size: 13px;">If Success</div>
        <div style="color: #15803d; font-size: 12px;">--> CLOSED</div>
      </div>
      <div style="background: #fef2f2; border-radius: 8px; padding: 12px; text-align: center;">
        <div style="color: #dc2626; font-weight: 600; font-size: 13px;">If Failure</div>
        <div style="color: #b91c1c; font-size: 12px;">--> OPEN</div>
      </div>
    </div>
  </div>
</div>

- Allows limited test requests through
- If request succeeds, circuit closes (back to normal)
- If request fails, circuit opens again (reset timer)

---

## Configuration Parameters

<div style="background: #f8fafc; border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 20px 0; font-size: 16px; font-weight: 600;">KEY CONFIGURATION OPTIONS</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
    <div style="background: #dbeafe; padding: 16px; border-radius: 8px;">
      <div style="color: #1e40af; font-weight: 600; margin-bottom: 8px;">Failure Threshold</div>
      <div style="color: #1d4ed8; font-size: 13px;">Number or percentage of failures before opening circuit (e.g., 5 failures or 50%)</div>
    </div>
    <div style="background: #dcfce7; padding: 16px; border-radius: 8px;">
      <div style="color: #166534; font-weight: 600; margin-bottom: 8px;">Success Threshold</div>
      <div style="color: #15803d; font-size: 13px;">Number of successes in half-open to close circuit (e.g., 3 consecutive)</div>
    </div>
    <div style="background: #fef3c7; padding: 16px; border-radius: 8px;">
      <div style="color: #92400e; font-weight: 600; margin-bottom: 8px;">Timeout Duration</div>
      <div style="color: #b45309; font-size: 13px;">How long to stay open before testing (e.g., 30 seconds)</div>
    </div>
    <div style="background: #f3e8ff; padding: 16px; border-radius: 8px;">
      <div style="color: #6b21a8; font-weight: 600; margin-bottom: 8px;">Sampling Window</div>
      <div style="color: #7c3aed; font-size: 13px;">Time window for counting failures (e.g., last 60 seconds)</div>
    </div>
    <div style="background: #fef2f2; padding: 16px; border-radius: 8px;">
      <div style="color: #dc2626; font-weight: 600; margin-bottom: 8px;">Half-Open Limit</div>
      <div style="color: #b91c1c; font-size: 13px;">Max concurrent requests in half-open state (e.g., 3 requests)</div>
    </div>
    <div style="background: #ecfdf5; padding: 16px; border-radius: 8px;">
      <div style="color: #065f46; font-weight: 600; margin-bottom: 8px;">Slow Call Threshold</div>
      <div style="color: #047857; font-size: 13px;">Response time that counts as "slow" (e.g., 5 seconds)</div>
    </div>
  </div>
</div>

---

## Code Examples

### Python - Complete Circuit Breaker Implementation

```python
import time
import threading
from enum import Enum
from dataclasses import dataclass, field
from typing import Callable, Any, Optional
from collections import deque
import functools

class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"

@dataclass
class CircuitBreakerConfig:
    """Circuit breaker configuration."""
    failure_threshold: int = 5           # Failures to trip circuit
    success_threshold: int = 3           # Successes to close from half-open
    timeout_seconds: float = 30.0        # Time in open state before half-open
    sampling_window_seconds: float = 60.0  # Window for counting failures
    half_open_max_calls: int = 3         # Max concurrent calls in half-open
    slow_call_threshold_seconds: float = 5.0  # Slow call threshold
    slow_call_rate_threshold: float = 0.5  # 50% slow calls trips circuit

@dataclass
class CircuitBreakerMetrics:
    """Track circuit breaker statistics."""
    total_calls: int = 0
    successful_calls: int = 0
    failed_calls: int = 0
    rejected_calls: int = 0
    state_changes: int = 0

class CircuitBreaker:
    """
    Production-grade circuit breaker implementation.

    Features:
    - Three states: closed, open, half-open
    - Sliding window for failure counting
    - Slow call detection
    - Thread-safe operation
    - Metrics collection
    """

    def __init__(self, name: str, config: CircuitBreakerConfig = None):
        self.name = name
        self.config = config or CircuitBreakerConfig()
        self.metrics = CircuitBreakerMetrics()

        self._state = CircuitState.CLOSED
        self._failure_timestamps: deque = deque()
        self._slow_call_timestamps: deque = deque()
        self._last_failure_time: float = 0
        self._half_open_calls: int = 0
        self._consecutive_successes: int = 0

        self._lock = threading.Lock()

    @property
    def state(self) -> CircuitState:
        with self._lock:
            self._maybe_transition_to_half_open()
            return self._state

    def _maybe_transition_to_half_open(self):
        """Check if we should move from OPEN to HALF_OPEN."""
        if self._state == CircuitState.OPEN:
            if time.time() - self._last_failure_time >= self.config.timeout_seconds:
                self._transition_to(CircuitState.HALF_OPEN)

    def _transition_to(self, new_state: CircuitState):
        """Transition to a new state."""
        if self._state != new_state:
            old_state = self._state
            self._state = new_state
            self.metrics.state_changes += 1

            if new_state == CircuitState.HALF_OPEN:
                self._half_open_calls = 0
                self._consecutive_successes = 0

            print(f"[CircuitBreaker:{self.name}] {old_state.value} -> {new_state.value}")

    def _record_success(self, duration: float):
        """Record a successful call."""
        self.metrics.successful_calls += 1

        # Check for slow call
        if duration >= self.config.slow_call_threshold_seconds:
            self._slow_call_timestamps.append(time.time())

        if self._state == CircuitState.HALF_OPEN:
            self._consecutive_successes += 1
            if self._consecutive_successes >= self.config.success_threshold:
                self._transition_to(CircuitState.CLOSED)
                self._failure_timestamps.clear()
                self._slow_call_timestamps.clear()

    def _record_failure(self):
        """Record a failed call."""
        now = time.time()
        self.metrics.failed_calls += 1
        self._failure_timestamps.append(now)
        self._last_failure_time = now

        # Clean old failures outside window
        cutoff = now - self.config.sampling_window_seconds
        while self._failure_timestamps and self._failure_timestamps[0] < cutoff:
            self._failure_timestamps.popleft()

        # Check if we should trip
        if self._state == CircuitState.CLOSED:
            if len(self._failure_timestamps) >= self.config.failure_threshold:
                self._transition_to(CircuitState.OPEN)
        elif self._state == CircuitState.HALF_OPEN:
            self._transition_to(CircuitState.OPEN)

    def allow_request(self) -> bool:
        """Check if a request should be allowed."""
        with self._lock:
            self._maybe_transition_to_half_open()

            if self._state == CircuitState.CLOSED:
                return True

            if self._state == CircuitState.OPEN:
                self.metrics.rejected_calls += 1
                return False

            # HALF_OPEN - allow limited requests
            if self._half_open_calls < self.config.half_open_max_calls:
                self._half_open_calls += 1
                return True

            self.metrics.rejected_calls += 1
            return False

    def record_result(self, success: bool, duration: float = 0):
        """Record the result of a call."""
        with self._lock:
            self.metrics.total_calls += 1
            if success:
                self._record_success(duration)
            else:
                self._record_failure()

    def call(self, func: Callable, *args, **kwargs) -> Any:
        """Execute function with circuit breaker protection."""
        if not self.allow_request():
            raise CircuitOpenError(f"Circuit {self.name} is OPEN")

        start_time = time.time()
        try:
            result = func(*args, **kwargs)
            duration = time.time() - start_time
            self.record_result(success=True, duration=duration)
            return result
        except Exception as e:
            self.record_result(success=False)
            raise

class CircuitOpenError(Exception):
    """Raised when circuit is open and request is rejected."""
    pass

# Decorator for easy use
def circuit_breaker(breaker: CircuitBreaker, fallback: Callable = None):
    """Decorator to apply circuit breaker to a function."""
    def decorator(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            try:
                return breaker.call(func, *args, **kwargs)
            except CircuitOpenError:
                if fallback:
                    return fallback(*args, **kwargs)
                raise
        return wrapper
    return decorator


# ============ Usage Examples ============

# Create circuit breaker
payment_circuit = CircuitBreaker(
    name="payment-service",
    config=CircuitBreakerConfig(
        failure_threshold=5,
        success_threshold=3,
        timeout_seconds=30,
    )
)

# Option 1: Manual usage
def process_payment(amount: float):
    if not payment_circuit.allow_request():
        return {"status": "queued", "message": "Payment queued for retry"}

    try:
        result = external_payment_api.charge(amount)
        payment_circuit.record_result(success=True)
        return result
    except Exception as e:
        payment_circuit.record_result(success=False)
        return {"status": "queued", "message": "Payment queued for retry"}


# Option 2: Using decorator
def payment_fallback(amount: float):
    return {"status": "queued", "message": "Payment will be processed shortly"}

@circuit_breaker(payment_circuit, fallback=payment_fallback)
def charge_customer(amount: float):
    return external_payment_api.charge(amount)
```

### Go - Circuit Breaker with Hystrix-like Features

```go
package circuitbreaker

import (
    "errors"
    "sync"
    "time"
)

type State int

const (
    StateClosed State = iota
    StateOpen
    StateHalfOpen
)

func (s State) String() string {
    switch s {
    case StateClosed:
        return "CLOSED"
    case StateOpen:
        return "OPEN"
    case StateHalfOpen:
        return "HALF_OPEN"
    }
    return "UNKNOWN"
}

var ErrCircuitOpen = errors.New("circuit breaker is open")

type Config struct {
    FailureThreshold    int
    SuccessThreshold    int
    TimeoutDuration     time.Duration
    SamplingWindow      time.Duration
    HalfOpenMaxCalls    int
}

func DefaultConfig() Config {
    return Config{
        FailureThreshold:    5,
        SuccessThreshold:    3,
        TimeoutDuration:     30 * time.Second,
        SamplingWindow:      60 * time.Second,
        HalfOpenMaxCalls:    3,
    }
}

type CircuitBreaker struct {
    name    string
    config  Config
    state   State

    failureTimestamps  []time.Time
    lastFailureTime    time.Time
    halfOpenCalls      int
    consecutiveSuccess int

    mu sync.Mutex
}

func New(name string, config Config) *CircuitBreaker {
    return &CircuitBreaker{
        name:              name,
        config:            config,
        state:             StateClosed,
        failureTimestamps: make([]time.Time, 0),
    }
}

func (cb *CircuitBreaker) AllowRequest() bool {
    cb.mu.Lock()
    defer cb.mu.Unlock()

    cb.maybeTransitionToHalfOpen()

    switch cb.state {
    case StateClosed:
        return true
    case StateOpen:
        return false
    case StateHalfOpen:
        if cb.halfOpenCalls < cb.config.HalfOpenMaxCalls {
            cb.halfOpenCalls++
            return true
        }
        return false
    }
    return false
}

func (cb *CircuitBreaker) RecordSuccess() {
    cb.mu.Lock()
    defer cb.mu.Unlock()

    if cb.state == StateHalfOpen {
        cb.consecutiveSuccess++
        if cb.consecutiveSuccess >= cb.config.SuccessThreshold {
            cb.transitionTo(StateClosed)
            cb.failureTimestamps = nil
        }
    }
}

func (cb *CircuitBreaker) RecordFailure() {
    cb.mu.Lock()
    defer cb.mu.Unlock()

    now := time.Now()
    cb.failureTimestamps = append(cb.failureTimestamps, now)
    cb.lastFailureTime = now

    // Clean old failures
    cutoff := now.Add(-cb.config.SamplingWindow)
    validFailures := cb.failureTimestamps[:0]
    for _, t := range cb.failureTimestamps {
        if t.After(cutoff) {
            validFailures = append(validFailures, t)
        }
    }
    cb.failureTimestamps = validFailures

    switch cb.state {
    case StateClosed:
        if len(cb.failureTimestamps) >= cb.config.FailureThreshold {
            cb.transitionTo(StateOpen)
        }
    case StateHalfOpen:
        cb.transitionTo(StateOpen)
    }
}

// Execute runs a function with circuit breaker protection
func (cb *CircuitBreaker) Execute(fn func() (interface{}, error)) (interface{}, error) {
    if !cb.AllowRequest() {
        return nil, ErrCircuitOpen
    }

    result, err := fn()

    if err != nil {
        cb.RecordFailure()
        return nil, err
    }

    cb.RecordSuccess()
    return result, nil
}

// ExecuteWithFallback runs with fallback on circuit open or error
func (cb *CircuitBreaker) ExecuteWithFallback(
    fn func() (interface{}, error),
    fallback func(error) (interface{}, error),
) (interface{}, error) {
    result, err := cb.Execute(fn)

    if err != nil {
        return fallback(err)
    }

    return result, nil
}
```

---

## Fallback Strategies

<div style="background: #f8fafc; border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">FALLBACK OPTIONS WHEN CIRCUIT IS OPEN</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
    <div style="background: #dcfce7; border-radius: 12px; padding: 20px; border: 2px solid #22c55e;">
      <div style="color: #166534; font-weight: 700; margin-bottom: 12px;">Return Cached Data</div>
      <div style="color: #15803d; font-size: 13px; margin-bottom: 12px;">Serve stale but acceptable data from cache when fresh data unavailable.</div>
      <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px; color: #166534;">
        return cache.get(key) or DEFAULT
      </div>
    </div>
    <div style="background: #dbeafe; border-radius: 12px; padding: 20px; border: 2px solid #3b82f6;">
      <div style="color: #1e40af; font-weight: 700; margin-bottom: 12px;">Queue for Later</div>
      <div style="color: #1d4ed8; font-size: 13px; margin-bottom: 12px;">Add request to a queue and process when service recovers.</div>
      <div style="background: #eff6ff; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px; color: #1e40af;">
        queue.add(request)<br>return "Processing soon"
      </div>
    </div>
    <div style="background: #fef3c7; border-radius: 12px; padding: 20px; border: 2px solid #f59e0b;">
      <div style="color: #92400e; font-weight: 700; margin-bottom: 12px;">Default Response</div>
      <div style="color: #b45309; font-size: 13px; margin-bottom: 12px;">Return a safe default that allows the user to continue.</div>
      <div style="background: #fefce8; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px; color: #92400e;">
        return {"recommendations": []}
      </div>
    </div>
    <div style="background: #f3e8ff; border-radius: 12px; padding: 20px; border: 2px solid #a855f7;">
      <div style="color: #6b21a8; font-weight: 700; margin-bottom: 12px;">Alternative Service</div>
      <div style="color: #7c3aed; font-size: 13px; margin-bottom: 12px;">Call a backup service or use degraded functionality.</div>
      <div style="background: #faf5ff; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 12px; color: #6b21a8;">
        return backup_service.call()
      </div>
    </div>
  </div>
</div>

```python
# Fallback strategy examples
class PaymentService:
    def __init__(self):
        self.circuit = CircuitBreaker("payment")
        self.cache = Cache()
        self.queue = MessageQueue()

    def process_payment(self, payment_id: str, amount: float) -> dict:
        try:
            return self.circuit.call(
                self._call_payment_api,
                payment_id, amount
            )
        except CircuitOpenError:
            # Strategy 1: Queue for later processing
            self.queue.push({
                "payment_id": payment_id,
                "amount": amount,
                "retry_at": time.time() + 60
            })
            return {
                "status": "pending",
                "message": "Payment queued for processing"
            }

    def get_user_profile(self, user_id: str) -> dict:
        try:
            profile = self.circuit.call(
                self._call_profile_api,
                user_id
            )
            self.cache.set(f"profile:{user_id}", profile, ttl=3600)
            return profile
        except CircuitOpenError:
            # Strategy 2: Return cached data
            cached = self.cache.get(f"profile:{user_id}")
            if cached:
                return {**cached, "_cached": True}

            # Strategy 3: Return minimal default
            return {
                "user_id": user_id,
                "name": "User",
                "_default": True
            }
```

---

## Common Pitfalls

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">1. Not Distinguishing Error Types</div>
  <div style="color: #7f1d1d; font-size: 14px;">Not all errors should trip the circuit. A 400 Bad Request is a client error, not a service failure. Only count 5xx errors and timeouts.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">2. Setting Thresholds Too Low</div>
  <div style="color: #7f1d1d; font-size: 14px;">A threshold of 2-3 failures can cause false trips during normal network jitter. Start with higher thresholds (5-10) and use percentage-based thresholds with minimum sample size.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">3. Forgetting the Fallback</div>
  <div style="color: #7f1d1d; font-size: 14px;">A circuit breaker without a fallback just converts slow failures to fast failures. Always provide a degraded experience - even "try again later" is better than a crash.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">4. One Circuit Per Service Instance</div>
  <div style="color: #7f1d1d; font-size: 14px;">If you have one circuit for "payment service" but 10 instances, one bad instance trips the circuit for all. Consider per-instance circuits or use service mesh features.</div>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px;">5. Not Monitoring Circuit State</div>
  <div style="color: #7f1d1d; font-size: 14px;">Circuit breakers should emit metrics. Alert when circuits open frequently - it indicates an underlying problem that needs investigation, not just protection.</div>
</div>

---

## Interview Questions

### Conceptual Questions

**Q1: Why use a circuit breaker instead of just retries?**

A: Retries keep hammering a failing service, potentially making things worse (adding load to an already struggling service). Circuit breakers:
- Stop all requests immediately, reducing load on failing service
- Fail fast, freeing up client resources
- Give the service time to recover
- Prevent cascading failures through the system

**Q2: What is the difference between circuit breaker and rate limiting?**

A: Rate limiting controls how many requests you SEND (protecting downstream). Circuit breaker controls whether you send requests based on FAILURES (protecting yourself from a failing dependency). They complement each other - you might rate limit healthy services and circuit break unhealthy ones.

**Q3: How do you test circuit breakers in production?**

A: Techniques include:
- **Chaos engineering**: Intentionally inject failures (Netflix Chaos Monkey)
- **Canary testing**: Route percentage of traffic through circuit-broken paths
- **Shadow traffic**: Duplicate production traffic to test instances
- **Fire drills**: Scheduled failover exercises

### Design Questions

**Q4: "Design a payment system. How would you use circuit breakers?"**

Key points:
- Separate circuits for each payment provider (Stripe, PayPal, etc.)
- Different thresholds for different operations (auth vs capture)
- Fallback to queue + retry for non-time-sensitive operations
- Alert operations team when circuit opens
- Consider backup payment provider as fallback

**Q5: "Your microservices are experiencing cascading failures. How do you prevent this?"**

Answer framework:
1. Add circuit breakers between all service-to-service calls
2. Implement timeouts on all external calls (prerequisite for circuits)
3. Use bulkheads to isolate failures (thread pools, connection pools)
4. Design meaningful fallbacks for each dependency
5. Add monitoring/alerting on circuit state changes
6. Consider service mesh (Istio, Linkerd) for automatic circuit breaking

---

## Monitoring and Alerting

```python
# Example Prometheus metrics for circuit breaker
CIRCUIT_STATE = Gauge(
    'circuit_breaker_state',
    'Current circuit state (0=closed, 1=open, 2=half-open)',
    ['circuit_name']
)

CIRCUIT_CALLS = Counter(
    'circuit_breaker_calls_total',
    'Total circuit breaker calls',
    ['circuit_name', 'result']  # result: success, failure, rejected
)

CIRCUIT_STATE_CHANGES = Counter(
    'circuit_breaker_state_changes_total',
    'Circuit breaker state transitions',
    ['circuit_name', 'from_state', 'to_state']
)

# Alert rules
"""
- alert: CircuitBreakerOpen
  expr: circuit_breaker_state == 1
  for: 1m
  labels:
    severity: warning
  annotations:
    summary: "Circuit {{ $labels.circuit_name }} is OPEN"

- alert: CircuitBreakerFlapping
  expr: increase(circuit_breaker_state_changes_total[5m]) > 5
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "Circuit {{ $labels.circuit_name }} is flapping"
"""
```

---

## Circuit Breaker vs Related Patterns

| Pattern | Purpose | When to Use |
|---------|---------|-------------|
| **Circuit Breaker** | Stop calls to failing service | Dependency failures |
| **Retry** | Try again on failure | Transient failures |
| **Timeout** | Limit wait time per call | Slow dependencies |
| **Bulkhead** | Isolate resources | Prevent resource exhaustion |
| **Rate Limiter** | Limit request rate | Protect downstream |

**Best Practice**: Use ALL of them together:

```
Request --> Rate Limiter --> Timeout --> Circuit Breaker --> Retry --> Service
```

---

## Related Topics

- [Retry Patterns](/topic/system-design/retry-patterns)
- [Bulkhead Pattern](/topic/system-design/bulkhead-pattern)
- [Timeout Patterns](/topic/system-design/timeouts)
- [Service Mesh](/topic/system-design/service-mesh)
- [Microservices](/topic/system-design/microservices)
