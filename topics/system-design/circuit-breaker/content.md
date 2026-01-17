# Circuit Breaker Pattern

## Overview

The Circuit Breaker pattern prevents cascading failures in distributed systems by failing fast when a service is unavailable, rather than waiting for timeouts and consuming resources.

## The Intuitive Mental Model: Electrical Circuit Breaker

Think of your home's electrical circuit breaker:

<div class="diagram-section">
  <h3 style="margin-top: 1.5rem; margin-bottom: 1rem;">Your Home Electrical System</h3>
  <div class="circuit-diagram">
    <div class="diagram-row">
      <div class="diagram-box power-grid">
        <div class="box-icon">⚡</div>
        <div class="box-label">Power Grid</div>
      </div>
      <div class="diagram-arrow">→</div>
      <div class="diagram-box circuit-breaker">
        <div class="box-icon">🔌</div>
        <div class="box-label">Circuit Breaker</div>
      </div>
      <div class="diagram-arrow">→</div>
      <div class="diagram-box appliances">
        <div class="box-icon">🏠</div>
        <div class="box-label">Appliances</div>
      </div>
    </div>
    <div class="diagram-details">
      <div class="detail-column">
        <strong>Monitors:</strong>
        <ul>
          <li>Current too high?</li>
          <li>Short circuit?</li>
          <li>Overload detected?</li>
        </ul>
      </div>
      <div class="detail-column">
        <strong>When Triggered:</strong>
        <ul>
          <li>Cuts power flow</li>
          <li>Prevents fire</li>
          <li>Protects wiring</li>
        </ul>
      </div>
    </div>
  </div>

  <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Software Circuit Breaker Equivalent</h3>
  <div class="circuit-diagram">
    <div class="diagram-row">
      <div class="diagram-box service-a">
        <div class="box-icon">🔵</div>
        <div class="box-label">Service A</div>
      </div>
      <div class="diagram-arrow">→</div>
      <div class="diagram-box circuit-breaker">
        <div class="box-icon">🔌</div>
        <div class="box-label">Circuit Breaker</div>
      </div>
      <div class="diagram-arrow">→</div>
      <div class="diagram-box service-b">
        <div class="box-icon">🔵</div>
        <div class="box-label">Service B</div>
      </div>
    </div>
    <div class="diagram-details">
      <div class="detail-column">
        <strong>Monitors:</strong>
        <ul>
          <li>Failure rate high?</li>
          <li>Timeouts frequent?</li>
          <li>Error threshold?</li>
        </ul>
      </div>
      <div class="detail-column">
        <strong>When Triggered:</strong>
        <ul>
          <li>Fails fast</li>
          <li>Returns fallback</li>
          <li>Protects both sides</li>
        </ul>
      </div>
    </div>
  </div>
</div>

### Mapping the Metaphor

| Electrical System | Software System | Purpose |
|-------------------|-----------------|---------|
| Power surge | Request spike/failures | The problem being detected |
| Circuit breaker | CB component | The protection mechanism |
| Tripping | Opening the circuit | Stop the damage |
| Cooling off period | Open state timeout | Allow recovery time |
| Manual reset test | Half-open state | Probe for recovery |
| Full power restore | Closed state | Normal operation |

---

## 20-Year Insight: What Experience Teaches

### What Junior Developers Think:
> "If a service is down, just retry until it works."

### What Senior Developers Know:
> "Retrying a dead service doesn't revive it—it just kills your service too. The Circuit Breaker is an act of self-preservation that paradoxically helps the failing service recover faster."

### The Deeper Truth:
After 20+ years of operating distributed systems, here's what you learn:
1. **Failure is not binary** - Services degrade before they die
2. **Cascading failure kills systems** - One bad service takes down ten good ones
3. **Recovery needs space** - Hammering a struggling service prevents recovery
4. **Fast failure is kind failure** - Users prefer quick errors over hanging requests

---

## The Three States: Deep Dive

<div class="diagram-section">
  <div class="state-diagram">
    <div class="state-container">
      <div class="state-box state-closed">
        <div class="state-title">CLOSED</div>
        <div class="state-desc">Normal operation<br>Counting failures</div>
      </div>

      <div class="state-transition transition-failure">
        <div class="transition-label">Failure threshold reached</div>
      </div>

      <div class="state-box state-open">
        <div class="state-title">OPEN</div>
        <div class="state-desc">Failing fast<br>Requests blocked</div>
      </div>

      <div class="state-transition transition-timeout">
        <div class="transition-label">Timeout expires</div>
      </div>

      <div class="state-box state-half-open">
        <div class="state-title">HALF-OPEN</div>
        <div class="state-desc">Testing recovery<br>Limited requests</div>
      </div>
    </div>

    <div class="state-transitions">
      <div class="transition-row">
        <div class="transition-arrow success-arrow">↶ Success</div>
        <span class="transition-from">HALF-OPEN → CLOSED</span>
      </div>
      <div class="transition-row">
        <div class="transition-arrow failure-arrow">↷ Failure</div>
        <span class="transition-from">HALF-OPEN → OPEN</span>
      </div>
    </div>
  </div>
</div>

### State Transitions in Detail

```python
class CircuitState(Enum):
    CLOSED = "closed"       # Normal operation
    OPEN = "open"          # Failing fast
    HALF_OPEN = "half_open" # Testing recovery


# State Transition Table
TRANSITIONS = {
    # Current State → Event → New State
    (CircuitState.CLOSED, "failure_threshold_reached"): CircuitState.OPEN,
    (CircuitState.OPEN, "timeout_expired"): CircuitState.HALF_OPEN,
    (CircuitState.HALF_OPEN, "probe_success"): CircuitState.CLOSED,
    (CircuitState.HALF_OPEN, "probe_failure"): CircuitState.OPEN,
}
```

---

## Failure Detection Strategies

### 1. Count-Based (Simple)

```python
class CountBasedDetector:
    """Trip after N consecutive failures."""

    def __init__(self, threshold: int = 5):
        self.threshold = threshold
        self.consecutive_failures = 0

    def record_success(self):
        self.consecutive_failures = 0

    def record_failure(self):
        self.consecutive_failures += 1

    def should_trip(self) -> bool:
        return self.consecutive_failures >= self.threshold
```

**When to use**: Simple services, low traffic, clear failure modes.

**Limitation**: One success resets everything—a flaky service can stay "healthy" forever.

### 2. Percentage-Based (Sliding Window)

```python
class PercentageBasedDetector:
    """Trip when failure rate exceeds threshold in window."""

    def __init__(self,
                 failure_threshold: float = 0.5,  # 50%
                 window_size: int = 100,
                 min_calls: int = 20):
        self.failure_threshold = failure_threshold
        self.window_size = window_size
        self.min_calls = min_calls
        self.results = deque(maxlen=window_size)

    def record_result(self, success: bool):
        self.results.append(success)

    def should_trip(self) -> bool:
        if len(self.results) < self.min_calls:
            return False

        failures = sum(1 for r in self.results if not r)
        failure_rate = failures / len(self.results)
        return failure_rate >= self.failure_threshold

    def get_failure_rate(self) -> float:
        if not self.results:
            return 0.0
        failures = sum(1 for r in self.results if not r)
        return failures / len(self.results)
```

**When to use**: Production systems, high traffic, need statistical significance.

### 3. Time-Based (Sliding Window by Time)

```python
class TimeBasedDetector:
    """Trip when failure rate exceeds threshold in time window."""

    def __init__(self,
                 failure_threshold: float = 0.5,
                 window_seconds: int = 60,
                 min_calls: int = 10):
        self.failure_threshold = failure_threshold
        self.window_seconds = window_seconds
        self.min_calls = min_calls
        self.results: List[Tuple[float, bool]] = []
        self.lock = threading.Lock()

    def record_result(self, success: bool):
        now = time.time()
        with self.lock:
            self.results.append((now, success))
            self._cleanup(now)

    def _cleanup(self, now: float):
        cutoff = now - self.window_seconds
        self.results = [(t, s) for t, s in self.results if t > cutoff]

    def should_trip(self) -> bool:
        now = time.time()
        with self.lock:
            self._cleanup(now)

            if len(self.results) < self.min_calls:
                return False

            failures = sum(1 for _, s in self.results if not s)
            return failures / len(self.results) >= self.failure_threshold
```

**When to use**: Variable traffic patterns, need time-based recovery.

### 4. Slow Call Detection

```python
class SlowCallDetector:
    """Trip when slow calls exceed threshold—often better than failure detection."""

    def __init__(self,
                 slow_threshold_ms: int = 2000,
                 slow_rate_threshold: float = 0.5,
                 window_size: int = 100):
        self.slow_threshold_ms = slow_threshold_ms
        self.slow_rate_threshold = slow_rate_threshold
        self.response_times = deque(maxlen=window_size)

    def record_call(self, duration_ms: float):
        is_slow = duration_ms > self.slow_threshold_ms
        self.response_times.append(is_slow)

    def should_trip(self) -> bool:
        if len(self.response_times) < 10:
            return False

        slow_count = sum(self.response_times)
        return slow_count / len(self.response_times) >= self.slow_rate_threshold
```

**20-Year Insight**: Slow calls are often more dangerous than failures. A failing call returns in milliseconds; a slow call holds a thread for seconds.

---

## Production-Grade Implementation

### Python - Full Featured Circuit Breaker

```python
import time
import threading
import logging
from enum import Enum
from dataclasses import dataclass, field
from typing import Callable, Optional, Any, List, Tuple
from collections import deque
from functools import wraps
import random

logger = logging.getLogger(__name__)


class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"


@dataclass
class CircuitBreakerConfig:
    """Configuration for circuit breaker behavior."""
    failure_threshold: float = 0.5           # 50% failure rate to trip
    slow_call_threshold_ms: float = 2000     # Calls > 2s considered slow
    slow_call_rate_threshold: float = 0.5    # 50% slow calls to trip
    window_size: int = 100                   # Sliding window size
    min_calls: int = 20                      # Minimum calls before tripping
    open_timeout_seconds: float = 60         # Time in open state
    half_open_max_calls: int = 10            # Test calls in half-open
    half_open_success_threshold: float = 0.6 # Success rate to close


@dataclass
class CircuitBreakerMetrics:
    """Metrics for monitoring."""
    total_calls: int = 0
    successful_calls: int = 0
    failed_calls: int = 0
    slow_calls: int = 0
    rejected_calls: int = 0
    state_transitions: List[Tuple[float, str, str]] = field(default_factory=list)

    def record_transition(self, from_state: str, to_state: str):
        self.state_transitions.append((time.time(), from_state, to_state))


class CircuitBreaker:
    """
    Production-grade circuit breaker with:
    - Failure rate detection
    - Slow call detection
    - Configurable thresholds
    - Half-open probing
    - Comprehensive metrics
    - Thread safety
    """

    def __init__(self, name: str, config: CircuitBreakerConfig = None):
        self.name = name
        self.config = config or CircuitBreakerConfig()
        self.state = CircuitState.CLOSED
        self.metrics = CircuitBreakerMetrics()

        # Sliding window: (timestamp, success, duration_ms)
        self.results: deque = deque(maxlen=self.config.window_size)

        # Open state tracking
        self.opened_at: Optional[float] = None

        # Half-open tracking
        self.half_open_calls: int = 0
        self.half_open_successes: int = 0

        self.lock = threading.RLock()
        self.listeners: List[Callable] = []

    def add_listener(self, listener: Callable[[str, CircuitState, CircuitState], None]):
        """Add state change listener."""
        self.listeners.append(listener)

    def _notify_listeners(self, old_state: CircuitState, new_state: CircuitState):
        for listener in self.listeners:
            try:
                listener(self.name, old_state, new_state)
            except Exception as e:
                logger.warning(f"Listener error: {e}")

    def _transition_to(self, new_state: CircuitState):
        old_state = self.state
        if old_state == new_state:
            return

        self.state = new_state
        self.metrics.record_transition(old_state.value, new_state.value)

        logger.info(f"Circuit '{self.name}' transitioned: {old_state.value} → {new_state.value}")

        if new_state == CircuitState.OPEN:
            self.opened_at = time.time()
        elif new_state == CircuitState.HALF_OPEN:
            self.half_open_calls = 0
            self.half_open_successes = 0

        self._notify_listeners(old_state, new_state)

    def _should_trip(self) -> bool:
        """Determine if circuit should trip based on failure/slow call rates."""
        if len(self.results) < self.config.min_calls:
            return False

        failures = sum(1 for _, success, _ in self.results if not success)
        failure_rate = failures / len(self.results)

        slow_calls = sum(1 for _, _, duration in self.results
                        if duration > self.config.slow_call_threshold_ms)
        slow_rate = slow_calls / len(self.results)

        return (failure_rate >= self.config.failure_threshold or
                slow_rate >= self.config.slow_call_rate_threshold)

    def _should_close_from_half_open(self) -> bool:
        """Determine if enough half-open probes succeeded to close."""
        if self.half_open_calls < self.config.half_open_max_calls:
            return False

        success_rate = self.half_open_successes / self.half_open_calls
        return success_rate >= self.config.half_open_success_threshold

    def _is_open_timeout_expired(self) -> bool:
        """Check if we've been open long enough to try half-open."""
        if self.opened_at is None:
            return True
        return time.time() - self.opened_at >= self.config.open_timeout_seconds

    def allow_request(self) -> bool:
        """Check if a request should be allowed."""
        with self.lock:
            if self.state == CircuitState.CLOSED:
                return True

            if self.state == CircuitState.OPEN:
                if self._is_open_timeout_expired():
                    self._transition_to(CircuitState.HALF_OPEN)
                    return True
                return False

            # HALF_OPEN: Allow limited requests
            if self.half_open_calls < self.config.half_open_max_calls:
                return True
            return False

    def record_success(self, duration_ms: float):
        """Record a successful call."""
        with self.lock:
            self.metrics.total_calls += 1
            self.metrics.successful_calls += 1

            if duration_ms > self.config.slow_call_threshold_ms:
                self.metrics.slow_calls += 1

            if self.state == CircuitState.HALF_OPEN:
                self.half_open_calls += 1
                self.half_open_successes += 1

                if self._should_close_from_half_open():
                    self._transition_to(CircuitState.CLOSED)
                    self.results.clear()
            else:
                self.results.append((time.time(), True, duration_ms))

    def record_failure(self, duration_ms: float):
        """Record a failed call."""
        with self.lock:
            self.metrics.total_calls += 1
            self.metrics.failed_calls += 1

            if self.state == CircuitState.HALF_OPEN:
                self.half_open_calls += 1
                # Any failure in half-open → back to open
                self._transition_to(CircuitState.OPEN)
            else:
                self.results.append((time.time(), False, duration_ms))

                if self._should_trip():
                    self._transition_to(CircuitState.OPEN)

    def record_rejection(self):
        """Record a rejected call (circuit was open)."""
        self.metrics.rejected_calls += 1

    def get_state(self) -> CircuitState:
        """Get current state."""
        with self.lock:
            # Check if we should transition from OPEN to HALF_OPEN
            if self.state == CircuitState.OPEN and self._is_open_timeout_expired():
                self._transition_to(CircuitState.HALF_OPEN)
            return self.state

    def get_metrics(self) -> dict:
        """Get current metrics."""
        with self.lock:
            failure_rate = 0.0
            if self.results:
                failures = sum(1 for _, s, _ in self.results if not s)
                failure_rate = failures / len(self.results)

            return {
                "name": self.name,
                "state": self.state.value,
                "total_calls": self.metrics.total_calls,
                "successful_calls": self.metrics.successful_calls,
                "failed_calls": self.metrics.failed_calls,
                "slow_calls": self.metrics.slow_calls,
                "rejected_calls": self.metrics.rejected_calls,
                "current_failure_rate": failure_rate,
                "recent_transitions": self.metrics.state_transitions[-5:],
            }

    def force_open(self):
        """Manually open the circuit."""
        with self.lock:
            self._transition_to(CircuitState.OPEN)

    def force_close(self):
        """Manually close the circuit (use with caution)."""
        with self.lock:
            self._transition_to(CircuitState.CLOSED)
            self.results.clear()


class CircuitBreakerOpenError(Exception):
    """Raised when circuit is open and request is rejected."""
    pass


def circuit_breaker(cb: CircuitBreaker, fallback: Callable = None):
    """Decorator to wrap functions with circuit breaker."""

    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs) -> Any:
            if not cb.allow_request():
                cb.record_rejection()
                if fallback:
                    return fallback(*args, **kwargs)
                raise CircuitBreakerOpenError(
                    f"Circuit '{cb.name}' is open"
                )

            start = time.time()
            try:
                result = func(*args, **kwargs)
                duration_ms = (time.time() - start) * 1000
                cb.record_success(duration_ms)
                return result
            except Exception as e:
                duration_ms = (time.time() - start) * 1000
                cb.record_failure(duration_ms)
                raise

        return wrapper
    return decorator


# ============ Usage Example ============

class PaymentService:
    """Example service with circuit breaker protection."""

    def __init__(self):
        self.circuit_breaker = CircuitBreaker(
            "payment-service",
            CircuitBreakerConfig(
                failure_threshold=0.3,      # Trip at 30% failures
                slow_call_threshold_ms=1000, # 1s is slow
                slow_call_rate_threshold=0.5,
                window_size=50,
                min_calls=10,
                open_timeout_seconds=30,
            )
        )

        # Add monitoring
        self.circuit_breaker.add_listener(self._on_state_change)

    def _on_state_change(self, name: str, old: CircuitState, new: CircuitState):
        # Alert to PagerDuty, Slack, etc.
        if new == CircuitState.OPEN:
            logger.error(f"ALERT: Circuit {name} OPENED")
        elif new == CircuitState.CLOSED:
            logger.info(f"RECOVERED: Circuit {name} closed")

    @circuit_breaker(cb=None)  # Will be set after __init__
    def process_payment(self, amount: float) -> dict:
        """Process a payment with external gateway."""
        # Simulate external call
        import requests
        response = requests.post(
            "https://payment-gateway.example.com/charge",
            json={"amount": amount},
            timeout=5
        )
        response.raise_for_status()
        return response.json()

    def process_payment_safe(self, amount: float) -> dict:
        """Process payment with fallback."""
        if not self.circuit_breaker.allow_request():
            self.circuit_breaker.record_rejection()
            return self._fallback_payment(amount)

        start = time.time()
        try:
            result = self._call_payment_gateway(amount)
            duration_ms = (time.time() - start) * 1000
            self.circuit_breaker.record_success(duration_ms)
            return result
        except Exception as e:
            duration_ms = (time.time() - start) * 1000
            self.circuit_breaker.record_failure(duration_ms)
            return self._fallback_payment(amount)

    def _call_payment_gateway(self, amount: float) -> dict:
        # Actual payment gateway call
        pass

    def _fallback_payment(self, amount: float) -> dict:
        """Queue payment for later processing."""
        return {
            "status": "queued",
            "message": "Payment queued for processing",
            "amount": amount,
        }


# ============ Example with Multiple Backends ============

class ResilientApiClient:
    """API client with circuit breaker per backend."""

    def __init__(self, backends: List[str]):
        self.backends = backends
        self.circuit_breakers = {
            backend: CircuitBreaker(
                f"backend-{backend}",
                CircuitBreakerConfig(
                    failure_threshold=0.5,
                    open_timeout_seconds=30,
                )
            )
            for backend in backends
        }

    def call(self, endpoint: str) -> Any:
        """Call endpoint, trying backends with open circuits last."""
        # Sort backends: closed circuits first
        available_backends = sorted(
            self.backends,
            key=lambda b: 0 if self.circuit_breakers[b].get_state() == CircuitState.CLOSED else 1
        )

        last_error = None
        for backend in available_backends:
            cb = self.circuit_breakers[backend]

            if not cb.allow_request():
                cb.record_rejection()
                continue

            start = time.time()
            try:
                result = self._call_backend(backend, endpoint)
                cb.record_success((time.time() - start) * 1000)
                return result
            except Exception as e:
                cb.record_failure((time.time() - start) * 1000)
                last_error = e
                continue

        raise Exception(f"All backends failed: {last_error}")

    def _call_backend(self, backend: str, endpoint: str) -> Any:
        import requests
        return requests.get(f"http://{backend}/{endpoint}", timeout=5).json()
```

### Go - Production Circuit Breaker

```go
package circuitbreaker

import (
	"context"
	"errors"
	"fmt"
	"sync"
	"time"
)

// State represents circuit breaker state
type State int

const (
	StateClosed State = iota
	StateOpen
	StateHalfOpen
)

func (s State) String() string {
	switch s {
	case StateClosed:
		return "closed"
	case StateOpen:
		return "open"
	case StateHalfOpen:
		return "half-open"
	default:
		return "unknown"
	}
}

// ErrCircuitOpen is returned when circuit is open
var ErrCircuitOpen = errors.New("circuit breaker is open")

// Config holds circuit breaker configuration
type Config struct {
	FailureThreshold     float64       // Failure rate to trip (0.0-1.0)
	SlowCallThreshold    time.Duration // Duration considered slow
	SlowCallRateThreshold float64      // Slow call rate to trip
	WindowSize           int           // Sliding window size
	MinCalls             int           // Minimum calls before tripping
	OpenTimeout          time.Duration // Time to stay open
	HalfOpenMaxCalls     int           // Max probes in half-open
	HalfOpenSuccessRate  float64       // Success rate to close
}

// DefaultConfig returns sensible defaults
func DefaultConfig() Config {
	return Config{
		FailureThreshold:     0.5,
		SlowCallThreshold:    2 * time.Second,
		SlowCallRateThreshold: 0.5,
		WindowSize:           100,
		MinCalls:             20,
		OpenTimeout:          60 * time.Second,
		HalfOpenMaxCalls:     10,
		HalfOpenSuccessRate:  0.6,
	}
}

// CallResult represents a single call result
type CallResult struct {
	Timestamp time.Time
	Success   bool
	Duration  time.Duration
}

// Metrics holds circuit breaker metrics
type Metrics struct {
	TotalCalls      int64
	SuccessfulCalls int64
	FailedCalls     int64
	SlowCalls       int64
	RejectedCalls   int64
}

// CircuitBreaker implements the circuit breaker pattern
type CircuitBreaker struct {
	name    string
	config  Config
	state   State
	metrics Metrics

	results []CallResult

	openedAt         time.Time
	halfOpenCalls    int
	halfOpenSuccess  int

	listeners []func(name string, from, to State)
	mu        sync.RWMutex
}

// New creates a new circuit breaker
func New(name string, config Config) *CircuitBreaker {
	return &CircuitBreaker{
		name:    name,
		config:  config,
		state:   StateClosed,
		results: make([]CallResult, 0, config.WindowSize),
	}
}

// AddListener adds a state change listener
func (cb *CircuitBreaker) AddListener(fn func(name string, from, to State)) {
	cb.mu.Lock()
	defer cb.mu.Unlock()
	cb.listeners = append(cb.listeners, fn)
}

func (cb *CircuitBreaker) notifyListeners(from, to State) {
	for _, fn := range cb.listeners {
		go fn(cb.name, from, to)
	}
}

func (cb *CircuitBreaker) transitionTo(newState State) {
	if cb.state == newState {
		return
	}

	oldState := cb.state
	cb.state = newState

	switch newState {
	case StateOpen:
		cb.openedAt = time.Now()
	case StateHalfOpen:
		cb.halfOpenCalls = 0
		cb.halfOpenSuccess = 0
	}

	cb.notifyListeners(oldState, newState)
}

func (cb *CircuitBreaker) shouldTrip() bool {
	if len(cb.results) < cb.config.MinCalls {
		return false
	}

	var failures, slowCalls int
	for _, r := range cb.results {
		if !r.Success {
			failures++
		}
		if r.Duration > cb.config.SlowCallThreshold {
			slowCalls++
		}
	}

	failureRate := float64(failures) / float64(len(cb.results))
	slowRate := float64(slowCalls) / float64(len(cb.results))

	return failureRate >= cb.config.FailureThreshold ||
		slowRate >= cb.config.SlowCallRateThreshold
}

func (cb *CircuitBreaker) shouldCloseFromHalfOpen() bool {
	if cb.halfOpenCalls < cb.config.HalfOpenMaxCalls {
		return false
	}
	successRate := float64(cb.halfOpenSuccess) / float64(cb.halfOpenCalls)
	return successRate >= cb.config.HalfOpenSuccessRate
}

func (cb *CircuitBreaker) isOpenTimeoutExpired() bool {
	return time.Since(cb.openedAt) >= cb.config.OpenTimeout
}

// AllowRequest checks if a request should be allowed
func (cb *CircuitBreaker) AllowRequest() bool {
	cb.mu.Lock()
	defer cb.mu.Unlock()

	switch cb.state {
	case StateClosed:
		return true
	case StateOpen:
		if cb.isOpenTimeoutExpired() {
			cb.transitionTo(StateHalfOpen)
			return true
		}
		return false
	case StateHalfOpen:
		return cb.halfOpenCalls < cb.config.HalfOpenMaxCalls
	}
	return false
}

// RecordSuccess records a successful call
func (cb *CircuitBreaker) RecordSuccess(duration time.Duration) {
	cb.mu.Lock()
	defer cb.mu.Unlock()

	cb.metrics.TotalCalls++
	cb.metrics.SuccessfulCalls++
	if duration > cb.config.SlowCallThreshold {
		cb.metrics.SlowCalls++
	}

	if cb.state == StateHalfOpen {
		cb.halfOpenCalls++
		cb.halfOpenSuccess++
		if cb.shouldCloseFromHalfOpen() {
			cb.transitionTo(StateClosed)
			cb.results = cb.results[:0]
		}
	} else {
		cb.addResult(CallResult{
			Timestamp: time.Now(),
			Success:   true,
			Duration:  duration,
		})
	}
}

// RecordFailure records a failed call
func (cb *CircuitBreaker) RecordFailure(duration time.Duration) {
	cb.mu.Lock()
	defer cb.mu.Unlock()

	cb.metrics.TotalCalls++
	cb.metrics.FailedCalls++

	if cb.state == StateHalfOpen {
		cb.halfOpenCalls++
		cb.transitionTo(StateOpen)
	} else {
		cb.addResult(CallResult{
			Timestamp: time.Now(),
			Success:   false,
			Duration:  duration,
		})
		if cb.shouldTrip() {
			cb.transitionTo(StateOpen)
		}
	}
}

func (cb *CircuitBreaker) addResult(r CallResult) {
	if len(cb.results) >= cb.config.WindowSize {
		cb.results = cb.results[1:]
	}
	cb.results = append(cb.results, r)
}

// RecordRejection records a rejected call
func (cb *CircuitBreaker) RecordRejection() {
	cb.mu.Lock()
	defer cb.mu.Unlock()
	cb.metrics.RejectedCalls++
}

// GetState returns current state
func (cb *CircuitBreaker) GetState() State {
	cb.mu.RLock()
	defer cb.mu.RUnlock()
	return cb.state
}

// GetMetrics returns current metrics
func (cb *CircuitBreaker) GetMetrics() Metrics {
	cb.mu.RLock()
	defer cb.mu.RUnlock()
	return cb.metrics
}

// Execute wraps a function with circuit breaker protection
func (cb *CircuitBreaker) Execute(fn func() error) error {
	if !cb.AllowRequest() {
		cb.RecordRejection()
		return ErrCircuitOpen
	}

	start := time.Now()
	err := fn()
	duration := time.Since(start)

	if err != nil {
		cb.RecordFailure(duration)
		return err
	}

	cb.RecordSuccess(duration)
	return nil
}

// ExecuteWithFallback executes with fallback on circuit open
func (cb *CircuitBreaker) ExecuteWithFallback(
	fn func() (interface{}, error),
	fallback func(error) (interface{}, error),
) (interface{}, error) {
	if !cb.AllowRequest() {
		cb.RecordRejection()
		return fallback(ErrCircuitOpen)
	}

	start := time.Now()
	result, err := fn()
	duration := time.Since(start)

	if err != nil {
		cb.RecordFailure(duration)
		return fallback(err)
	}

	cb.RecordSuccess(duration)
	return result, nil
}

// ExecuteWithContext adds context support
func (cb *CircuitBreaker) ExecuteWithContext(
	ctx context.Context,
	fn func(context.Context) error,
) error {
	if !cb.AllowRequest() {
		cb.RecordRejection()
		return ErrCircuitOpen
	}

	start := time.Now()
	err := fn(ctx)
	duration := time.Since(start)

	if err != nil {
		cb.RecordFailure(duration)
		return err
	}

	cb.RecordSuccess(duration)
	return nil
}
```

---

## Circuit Breaker + Related Patterns

### 1. Circuit Breaker + Retry

```python
class RetryWithCircuitBreaker:
    """Combine retry logic with circuit breaker."""

    def __init__(self, circuit_breaker: CircuitBreaker, max_retries: int = 3):
        self.cb = circuit_breaker
        self.max_retries = max_retries

    def execute(self, func: Callable, *args, **kwargs):
        """Execute with retry, respecting circuit breaker."""
        last_error = None

        for attempt in range(self.max_retries):
            # Check circuit before each attempt
            if not self.cb.allow_request():
                self.cb.record_rejection()
                raise CircuitBreakerOpenError(f"Circuit {self.cb.name} is open")

            start = time.time()
            try:
                result = func(*args, **kwargs)
                self.cb.record_success((time.time() - start) * 1000)
                return result
            except Exception as e:
                self.cb.record_failure((time.time() - start) * 1000)
                last_error = e

                # Exponential backoff with jitter
                if attempt < self.max_retries - 1:
                    delay = (2 ** attempt) + random.uniform(0, 1)
                    time.sleep(delay)

        raise last_error
```

**Critical Insight**: Retry INSIDE the circuit breaker check. Retrying a failing service with an open circuit wastes resources.

### 2. Circuit Breaker + Bulkhead

```python
from concurrent.futures import ThreadPoolExecutor, TimeoutError
from threading import Semaphore

class BulkheadCircuitBreaker:
    """
    Bulkhead pattern limits concurrent calls.
    Circuit breaker protects against failures.
    Together: prevent resource exhaustion AND cascading failure.
    """

    def __init__(self,
                 circuit_breaker: CircuitBreaker,
                 max_concurrent: int = 10,
                 max_wait_seconds: float = 5):
        self.cb = circuit_breaker
        self.semaphore = Semaphore(max_concurrent)
        self.max_wait = max_wait_seconds
        self.executor = ThreadPoolExecutor(max_workers=max_concurrent)

    def execute(self, func: Callable, *args, **kwargs):
        """Execute with bulkhead and circuit breaker protection."""
        # First check circuit breaker (fast)
        if not self.cb.allow_request():
            self.cb.record_rejection()
            raise CircuitBreakerOpenError("Circuit is open")

        # Then check bulkhead
        acquired = self.semaphore.acquire(timeout=self.max_wait)
        if not acquired:
            raise TimeoutError("Bulkhead full - no available slots")

        start = time.time()
        try:
            result = func(*args, **kwargs)
            self.cb.record_success((time.time() - start) * 1000)
            return result
        except Exception as e:
            self.cb.record_failure((time.time() - start) * 1000)
            raise
        finally:
            self.semaphore.release()
```

### 3. Circuit Breaker + Timeout

```python
import signal

class TimeoutCircuitBreaker:
    """Circuit breaker with per-call timeout."""

    def __init__(self,
                 circuit_breaker: CircuitBreaker,
                 timeout_seconds: float = 5):
        self.cb = circuit_breaker
        self.timeout = timeout_seconds

    def execute(self, func: Callable, *args, **kwargs):
        """Execute with timeout, recording slow/failed calls."""
        if not self.cb.allow_request():
            self.cb.record_rejection()
            raise CircuitBreakerOpenError("Circuit is open")

        start = time.time()

        try:
            # Use threading timeout for cross-platform support
            from concurrent.futures import ThreadPoolExecutor, TimeoutError

            with ThreadPoolExecutor(max_workers=1) as executor:
                future = executor.submit(func, *args, **kwargs)
                try:
                    result = future.result(timeout=self.timeout)
                    duration_ms = (time.time() - start) * 1000
                    self.cb.record_success(duration_ms)
                    return result
                except TimeoutError:
                    duration_ms = (time.time() - start) * 1000
                    self.cb.record_failure(duration_ms)
                    raise TimeoutError(f"Call timed out after {self.timeout}s")
        except Exception as e:
            duration_ms = (time.time() - start) * 1000
            self.cb.record_failure(duration_ms)
            raise
```

---

## Production War Stories

### War Story 1: The Circuit That Never Opened

**The Scenario**:
A payment service had a circuit breaker with these settings:
- Failure threshold: 50%
- Window size: 100
- Min calls: 20

The service had extremely low traffic (5 calls/minute during quiet periods).

**What Happened**:
During an outage, the circuit never opened because:
1. Old successes from hours ago stayed in the window
2. The 50% threshold was never reached
3. Requests kept timing out for 30 minutes

**The Fix**:
```python
class TimeAwareCircuitBreaker(CircuitBreaker):
    """Circuit breaker that ages out old results."""

    def __init__(self, name: str, config: CircuitBreakerConfig,
                 max_result_age_seconds: float = 300):
        super().__init__(name, config)
        self.max_age = max_result_age_seconds

    def _cleanup_old_results(self):
        """Remove results older than max age."""
        now = time.time()
        cutoff = now - self.max_age
        self.results = deque(
            (t, s, d) for t, s, d in self.results if t > cutoff
        )

    def _should_trip(self) -> bool:
        self._cleanup_old_results()
        return super()._should_trip()
```

**20-Year Lesson**: Circuit breakers must account for traffic patterns. A time-based window prevents stale data from corrupting decisions.

---

### War Story 2: The Half-Open Thundering Herd

**The Scenario**:
A service with 100 instances all hit a database outage. All circuit breakers opened simultaneously. After 60 seconds, all 100 moved to half-open simultaneously.

**What Happened**:
1. All 100 instances sent probe requests at exactly the same time
2. The recovering database got 100 requests instantly
3. It failed again
4. All circuits opened again
5. This repeated forever

**The Fix**:
```python
class JitteredCircuitBreaker(CircuitBreaker):
    """Circuit breaker with jittered open timeout."""

    def __init__(self, name: str, config: CircuitBreakerConfig, jitter_ratio: float = 0.3):
        super().__init__(name, config)
        self.jitter_ratio = jitter_ratio

    def _get_open_timeout(self) -> float:
        """Get open timeout with jitter to prevent thundering herd."""
        base = self.config.open_timeout_seconds
        jitter = base * self.jitter_ratio * random.random()
        return base + jitter

    def _is_open_timeout_expired(self) -> bool:
        if self.opened_at is None:
            return True
        return time.time() - self.opened_at >= self._get_open_timeout()
```

**20-Year Lesson**: Any synchronized behavior in distributed systems will cause thundering herd. Add jitter everywhere.

---

### War Story 3: The Slow Call Ambush

**The Scenario**:
A circuit breaker only tracked failures, not slow calls. The database started responding slowly (5 seconds instead of 50ms) but never actually failed.

**What Happened**:
1. All requests took 5 seconds
2. Thread pools filled up
3. New requests queued indefinitely
4. The application became unresponsive
5. But the circuit breaker was happily CLOSED (no failures!)

**The Fix**:
```python
# From our implementation above - slow call detection
if duration_ms > self.config.slow_call_threshold_ms:
    self.metrics.slow_calls += 1

slow_calls = sum(1 for _, _, duration in self.results
                if duration > self.config.slow_call_threshold_ms)
slow_rate = slow_calls / len(self.results)

if slow_rate >= self.config.slow_call_rate_threshold:
    self._transition_to(CircuitState.OPEN)
```

**20-Year Lesson**: Slow calls are worse than failures. A failure frees resources instantly; a slow call holds them hostage.

---

### War Story 4: The Fallback That Wasn't

**The Scenario**:
Circuit breaker had a fallback that returned cached data. Seemed perfect. During an outage, the fallback was called.

**What Happened**:
1. The fallback method also called the same failing service
2. (It was calling the service to get cache metadata)
3. Infinite loop of failures
4. System crashed

**The Fix**:
```python
class SafeFallback:
    """Fallback that NEVER calls the protected service."""

    def __init__(self):
        # Fallback data must be completely independent
        self.static_fallback = {"status": "degraded", "data": []}
        self.local_cache = {}  # Cache updated by successful calls only

    def get_fallback(self, key: str):
        """Return fallback without any external calls."""
        if key in self.local_cache:
            return {"status": "cached", "data": self.local_cache[key]}
        return self.static_fallback

    def update_cache(self, key: str, data: Any):
        """Called only on successful primary calls."""
        self.local_cache[key] = data
```

**20-Year Lesson**: Your fallback must be completely independent of the failing system. Cache locally, use static defaults, or accept graceful degradation.

---

## Expert Configuration Guide

### Environment-Based Configuration

```python
CIRCUIT_BREAKER_CONFIGS = {
    "development": CircuitBreakerConfig(
        failure_threshold=0.8,      # Very tolerant
        open_timeout_seconds=10,    # Quick recovery
        min_calls=5,                # Trip quickly
    ),

    "staging": CircuitBreakerConfig(
        failure_threshold=0.5,
        open_timeout_seconds=30,
        min_calls=10,
    ),

    "production": CircuitBreakerConfig(
        failure_threshold=0.3,      # Sensitive to failures
        slow_call_threshold_ms=1000,
        slow_call_rate_threshold=0.4,
        window_size=100,
        min_calls=20,
        open_timeout_seconds=60,
        half_open_max_calls=10,
        half_open_success_threshold=0.7,
    ),
}
```

### Service-Type Based Configuration

| Service Type | Failure Threshold | Slow Call Threshold | Open Timeout | Rationale |
|-------------|-------------------|---------------------|--------------|-----------|
| Payment Gateway | 10% | 1s | 120s | Can't afford failures, slow recovery |
| Search Service | 50% | 500ms | 30s | Can degrade, fast recovery |
| Analytics | 70% | 5s | 10s | Best effort, very tolerant |
| Auth Service | 20% | 500ms | 60s | Critical but fast |
| Notification | 60% | 3s | 20s | Async, tolerant |

---

## Monitoring & Alerting

### Key Metrics to Track

```python
class CircuitBreakerMetricsExporter:
    """Export metrics to Prometheus/DataDog/etc."""

    def __init__(self, circuit_breaker: CircuitBreaker):
        self.cb = circuit_breaker

    def get_metrics(self) -> dict:
        """Get all metrics for export."""
        metrics = self.cb.get_metrics()

        return {
            # State gauge (0=closed, 1=open, 2=half-open)
            f"circuit_breaker_state{{name=\"{self.cb.name}\"}}":
                {CircuitState.CLOSED: 0, CircuitState.OPEN: 1,
                 CircuitState.HALF_OPEN: 2}[self.cb.state],

            # Call counters
            f"circuit_breaker_calls_total{{name=\"{self.cb.name}\",result=\"success\"}}":
                metrics["successful_calls"],
            f"circuit_breaker_calls_total{{name=\"{self.cb.name}\",result=\"failure\"}}":
                metrics["failed_calls"],
            f"circuit_breaker_calls_total{{name=\"{self.cb.name}\",result=\"rejected\"}}":
                metrics["rejected_calls"],

            # Failure rate gauge
            f"circuit_breaker_failure_rate{{name=\"{self.cb.name}\"}}":
                metrics["current_failure_rate"],
        }


# Alert rules (pseudo-config)
ALERT_RULES = """
- alert: CircuitBreakerOpen
  expr: circuit_breaker_state == 1
  for: 1m
  labels:
    severity: critical
  annotations:
    summary: "Circuit breaker {{ $labels.name }} is OPEN"

- alert: CircuitBreakerHighFailureRate
  expr: circuit_breaker_failure_rate > 0.3
  for: 5m
  labels:
    severity: warning
  annotations:
    summary: "High failure rate on {{ $labels.name }}"

- alert: CircuitBreakerHighRejections
  expr: rate(circuit_breaker_calls_total{result="rejected"}[5m]) > 10
  for: 2m
  labels:
    severity: warning
  annotations:
    summary: "High rejection rate on {{ $labels.name }}"
"""
```

---

## Common Mistakes

### 1. Circuit Breaker Per Request

❌ **Wrong**:
```python
def make_request():
    cb = CircuitBreaker("api")  # New instance every call!
    cb.execute(...)
```

✅ **Correct**:
```python
# Singleton per target service
circuit_breakers = {}

def get_circuit_breaker(service: str) -> CircuitBreaker:
    if service not in circuit_breakers:
        circuit_breakers[service] = CircuitBreaker(service, config)
    return circuit_breakers[service]
```

### 2. No Fallback Strategy

❌ **Wrong**:
```python
try:
    result = cb.execute(api_call)
except CircuitBreakerOpenError:
    raise  # User sees error
```

✅ **Correct**:
```python
try:
    result = cb.execute(api_call)
except CircuitBreakerOpenError:
    result = get_cached_response()  # Or queue for later
    log.warning("Serving cached response due to circuit open")
```

### 3. Too Tight Thresholds

❌ **Wrong**:
```python
config = CircuitBreakerConfig(
    failure_threshold=0.1,  # 10% - will trip constantly
    min_calls=5,            # Statistically insignificant
)
```

✅ **Correct**:
```python
config = CircuitBreakerConfig(
    failure_threshold=0.3,   # Tolerates some failures
    min_calls=20,            # Statistically meaningful
    window_size=100,         # Good sample size
)
```

### 4. Ignoring Slow Calls

❌ **Wrong**: Only tracking failures, ignoring response time.

✅ **Correct**: Track both failures AND slow calls.

---

## Expert FAQs

### Q: Should I use one circuit breaker per service or per endpoint?

**A**: It depends on failure correlation:
- **Per service**: When the entire service fails together (most common)
- **Per endpoint**: When endpoints fail independently (e.g., `/search` might fail while `/details` works)
- **Per operation type**: Group read vs write operations if they have different failure characteristics

```python
# Per-service (simple)
payment_cb = CircuitBreaker("payment-service")

# Per-endpoint (granular)
payment_charge_cb = CircuitBreaker("payment-service-charge")
payment_refund_cb = CircuitBreaker("payment-service-refund")

# Per-operation-type
payment_reads_cb = CircuitBreaker("payment-service-reads")
payment_writes_cb = CircuitBreaker("payment-service-writes")
```

### Q: What's the relationship between circuit breaker and timeout?

**A**: They solve different problems:
- **Timeout**: Limits how long you wait for ONE call
- **Circuit Breaker**: Decides whether to make the call at all

Use BOTH together:
```python
@timeout(seconds=5)  # Individual call protection
@circuit_breaker(cb=my_cb)  # Systemic failure protection
def call_service():
    ...
```

### Q: How do I test circuit breakers?

**A**:
```python
class TestCircuitBreaker(unittest.TestCase):
    def test_opens_on_failures(self):
        cb = CircuitBreaker("test", CircuitBreakerConfig(
            failure_threshold=0.5,
            min_calls=10,
            window_size=20,
        ))

        # 10 failures
        for _ in range(10):
            cb.record_failure(100)

        self.assertEqual(cb.get_state(), CircuitState.OPEN)

    def test_half_open_after_timeout(self):
        cb = CircuitBreaker("test", CircuitBreakerConfig(
            open_timeout_seconds=1,
        ))

        # Force open
        for _ in range(20):
            cb.record_failure(100)

        self.assertEqual(cb.get_state(), CircuitState.OPEN)

        # Wait for timeout
        time.sleep(1.1)

        # Should transition on next check
        cb.allow_request()
        self.assertEqual(cb.get_state(), CircuitState.HALF_OPEN)
```

### Q: Circuit breaker vs rate limiter?

**A**: Different purposes:
- **Circuit Breaker**: Protects your service from a failing dependency
- **Rate Limiter**: Protects a service from too many requests

Use both:
<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 20px; margin: 16px 0; border: 1px solid #30363d;">
<div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
<div style="background: #8957e5; padding: 8px 16px; border-radius: 8px; color: #fff; font-size: 12px;">Client</div>
<div style="color: #7ee787;">→</div>
<div style="background: #f0883e; padding: 8px 16px; border-radius: 8px; color: #fff; font-size: 12px;">Rate Limiter</div>
<div style="color: #7ee787;">→</div>
<div style="background: #1f6feb; padding: 8px 16px; border-radius: 8px; color: #fff; font-size: 12px;">Your Service</div>
<div style="color: #7ee787;">→</div>
<div style="background: #da3633; padding: 8px 16px; border-radius: 8px; color: #fff; font-size: 12px;">Circuit Breaker</div>
<div style="color: #7ee787;">→</div>
<div style="background: #238636; padding: 8px 16px; border-radius: 8px; color: #fff; font-size: 12px;">Dependency</div>
</div>
</div>

### Q: How do I handle circuit breakers in microservices?

**A**: Each service has its own circuit breakers for its dependencies:

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 24px; margin: 16px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0; text-align: center; font-size: 14px;">Circuit Breakers in Microservices</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">

<div style="background: #21262d; border-radius: 12px; padding: 16px;">
<div style="color: #58a6ff; font-weight: bold; margin-bottom: 12px;">Service A</div>
<div style="display: flex; flex-direction: column; gap: 8px; margin-left: 12px;">
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #8b949e;">├──</span>
<span style="background: #da3633; padding: 4px 8px; border-radius: 4px; color: #fff; font-size: 11px;">CB</span>
<span style="color: #7ee787;">→</span>
<span style="color: #d2a8ff;">Service B</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #8b949e;">├──</span>
<span style="background: #da3633; padding: 4px 8px; border-radius: 4px; color: #fff; font-size: 11px;">CB</span>
<span style="color: #7ee787;">→</span>
<span style="color: #d2a8ff;">Service C</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #8b949e;">└──</span>
<span style="background: #da3633; padding: 4px 8px; border-radius: 4px; color: #fff; font-size: 11px;">CB</span>
<span style="color: #7ee787;">→</span>
<span style="color: #f0883e;">Database</span>
</div>
</div>
</div>

<div style="background: #21262d; border-radius: 12px; padding: 16px;">
<div style="color: #d2a8ff; font-weight: bold; margin-bottom: 12px;">Service B</div>
<div style="display: flex; flex-direction: column; gap: 8px; margin-left: 12px;">
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #8b949e;">├──</span>
<span style="background: #da3633; padding: 4px 8px; border-radius: 4px; color: #fff; font-size: 11px;">CB</span>
<span style="color: #7ee787;">→</span>
<span style="color: #d2a8ff;">Service D</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #8b949e;">└──</span>
<span style="background: #da3633; padding: 4px 8px; border-radius: 4px; color: #fff; font-size: 11px;">CB</span>
<span style="color: #7ee787;">→</span>
<span style="color: #7ee787;">Cache</span>
</div>
</div>
</div>

</div>
<div style="color: #8b949e; font-size: 11px; text-align: center; margin-top: 12px;">CB = Circuit Breaker</div>
</div>

Consider a service mesh (Istio, Linkerd) for automatic circuit breaking at the infrastructure level.

---

## Related Topics

- [Load Balancing](/topic/system-design/load-balancing)
- [Rate Limiting](/topic/system-design/rate-limiting)
- [Retry Patterns](/topic/system-design/retry-patterns)
- [Bulkhead Pattern](/topic/design-patterns/bulkhead)
- [Microservices](/topic/system-design/microservices)
