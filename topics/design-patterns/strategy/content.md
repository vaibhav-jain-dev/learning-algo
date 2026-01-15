# Strategy Pattern

## Overview

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it. It's one of the most practical patterns for real-world applications.

**Difficulty:** Beginner to Intermediate (Easy to learn, nuanced to master)
**Category:** Behavioral Pattern
**Also Known As:** Policy Pattern

---

## Intuitive Understanding

<div class="metaphor-card">
  <div class="metaphor-icon">🗺️</div>
  <div class="metaphor-title">Think of GPS Navigation</div>
  <div class="metaphor-description">
    When you use a GPS app, you can choose different routing strategies:
    - Fastest route (minimize time)
    - Shortest route (minimize distance)
    - Avoid tolls
    - Scenic route
    - Avoid highways

    The GPS app (Context) doesn't care HOW the route is calculated. It just asks the current strategy for directions. You can switch strategies mid-trip without the app's core code changing.
  </div>
  <div class="metaphor-mapping">
    <div class="mapping-item">
      <span class="real">GPS Navigation App</span>
      <span class="arrow">→</span>
      <span class="concept">Context</span>
    </div>
    <div class="mapping-item">
      <span class="real">Routing algorithm interface</span>
      <span class="arrow">→</span>
      <span class="concept">Strategy interface</span>
    </div>
    <div class="mapping-item">
      <span class="real">"Fastest route" algorithm</span>
      <span class="arrow">→</span>
      <span class="concept">ConcreteStrategyA</span>
    </div>
    <div class="mapping-item">
      <span class="real">"Avoid tolls" algorithm</span>
      <span class="arrow">→</span>
      <span class="concept">ConcreteStrategyB</span>
    </div>
    <div class="mapping-item">
      <span class="real">Switching route preference</span>
      <span class="arrow">→</span>
      <span class="concept">setStrategy()</span>
    </div>
    <div class="mapping-item">
      <span class="real">"Navigate to destination"</span>
      <span class="arrow">→</span>
      <span class="concept">context.execute()</span>
    </div>
  </div>
</div>

### The 20-Year Insight

**Novice thinks:** "Strategy replaces if-else statements"

**Expert knows:** "Strategy is about **RUNTIME behavior composition**. The real power isn't just avoiding conditionals - it's that strategies can be:
- Loaded from configuration
- Selected based on user preferences
- A/B tested in production
- Hot-swapped without deployment
- Combined (composite strategies)
- Decorated with cross-cutting concerns"

```
┌──────────────────────────────────────────────────────────────────────┐
│  Evolution of Understanding Strategy Pattern                         │
│                                                                      │
│  Level 1 (Junior):                                                   │
│    "It's like switch/case but with objects"                          │
│                                                                      │
│  Level 2 (Mid):                                                      │
│    "It lets me add new algorithms without changing existing code"    │
│                                                                      │
│  Level 3 (Senior):                                                   │
│    "Strategies can be composed, decorated, and selected dynamically  │
│     based on runtime conditions"                                     │
│                                                                      │
│  Level 4 (Staff/Principal):                                          │
│    "Strategy enables A/B testing, feature flags, and gradual         │
│     rollouts at the algorithm level. Combined with Factory and       │
│     DI, it's the foundation of configurable business rules."         │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Mental Model: When to Reach for Strategy

### The Decision Matrix

| Situation | Use Strategy? | Why |
|-----------|--------------|-----|
| Multiple algorithms for same task | ✅ Yes | Classic use case |
| Algorithm selection at runtime | ✅ Yes | Runtime polymorphism |
| Complex conditional logic in method | ⚠️ Maybe | Might be over-engineering for simple cases |
| Algorithm differs per customer/tenant | ✅ Yes | Perfect for multi-tenant |
| Need to A/B test algorithms | ✅ Yes | Swap strategies per request |
| Algorithm uses different data types | ❌ No | Consider generics/templates |
| Behavior varies based on object state | ❌ No | Use State pattern |
| One-time algorithm selection at startup | ⚠️ Maybe | Simple factory might suffice |

### Strategy vs State

This is the most common confusion:

```
┌───────────────────────────────────────────────────────────────────┐
│  STRATEGY                        │  STATE                        │
├──────────────────────────────────┼───────────────────────────────┤
│  Client chooses the strategy     │  Object changes state itself  │
│  Strategies are interchangeable  │  States transition naturally  │
│  "How to do X"                   │  "What can I do now"          │
│  Algorithms are unrelated        │  States are related lifecycle │
│                                                                   │
│  Example:                        │  Example:                     │
│  CompressionStrategy             │  OrderState                   │
│  - GZip, LZ4, Snappy             │  - Pending→Paid→Shipped→Done  │
│  (client picks best for use)     │  (order transitions itself)   │
└───────────────────────────────────────────────────────────────────┘
```

---

## Key Concepts

### When to Use

1. **Multiple algorithms** - Same problem, different solutions
2. **Runtime selection** - User preference, A/B tests, feature flags
3. **Isolating complex algorithms** - Keep context clean
4. **Testing** - Easy to mock/stub strategies
5. **Plugin systems** - Third parties provide strategies

### When NOT to Use

<div class="warning-box">
  <div class="warning-title">⚠️ Over-Engineering Alert</div>
  <div class="warning-content">
    <ul>
      <li><strong>Only one algorithm:</strong> YAGNI - just use the algorithm directly</li>
      <li><strong>Simple conditionals:</strong> 2-3 line if/else is fine</li>
      <li><strong>Algorithm never changes:</strong> No benefit to abstracting</li>
      <li><strong>Strategies share lots of code:</strong> Template Method might be better</li>
      <li><strong>Performance critical:</strong> Virtual dispatch has overhead</li>
    </ul>
  </div>
</div>

### Structure

```
┌─────────────────────────┐
│        Context          │
├─────────────────────────┤
│ - strategy: Strategy    │
├─────────────────────────┤
│ + setStrategy(strategy) │
│ + execute()             │
└───────────┬─────────────┘
            │ uses
            ▼
┌─────────────────────────┐
│       Strategy          │
├─────────────────────────┤
│ + algorithm()           │
└─────────────────────────┘
            △
    ┌───────┴───────┐
┌───┴────┐     ┌───┴────┐
│StrategyA│    │StrategyB│
└─────────┘    └─────────┘
```

---

## Implementation

### Python - Payment Processing

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from decimal import Decimal
from typing import Optional

@dataclass
class PaymentResult:
    success: bool
    transaction_id: Optional[str]
    message: str
    fee: Decimal = Decimal("0")


class PaymentStrategy(ABC):
    @abstractmethod
    def pay(self, amount: Decimal) -> PaymentResult:
        pass

    @abstractmethod
    def validate(self) -> bool:
        pass

    @abstractmethod
    def get_fee(self, amount: Decimal) -> Decimal:
        pass


class CreditCardPayment(PaymentStrategy):
    def __init__(self, card_number: str, expiry: str, cvv: str):
        self.card_number = card_number
        self.expiry = expiry
        self.cvv = cvv

    def validate(self) -> bool:
        return len(self.card_number) == 16 and self.card_number.isdigit()

    def get_fee(self, amount: Decimal) -> Decimal:
        return amount * Decimal("0.029") + Decimal("0.30")

    def pay(self, amount: Decimal) -> PaymentResult:
        if not self.validate():
            return PaymentResult(False, None, "Invalid card details")

        fee = self.get_fee(amount)
        return PaymentResult(
            success=True,
            transaction_id=f"CC-{self.card_number[-4:]}-{amount}",
            message=f"Charged ${amount} to card ending in {self.card_number[-4:]}",
            fee=fee
        )


class PayPalPayment(PaymentStrategy):
    def __init__(self, email: str):
        self.email = email

    def validate(self) -> bool:
        return "@" in self.email

    def get_fee(self, amount: Decimal) -> Decimal:
        return amount * Decimal("0.034") + Decimal("0.49")

    def pay(self, amount: Decimal) -> PaymentResult:
        if not self.validate():
            return PaymentResult(False, None, "Invalid PayPal email")

        fee = self.get_fee(amount)
        return PaymentResult(
            success=True,
            transaction_id=f"PP-{hash(self.email)}-{amount}",
            message=f"Charged ${amount} to PayPal account {self.email}",
            fee=fee
        )


class CryptoPayment(PaymentStrategy):
    def __init__(self, wallet_address: str, currency: str = "BTC"):
        self.wallet_address = wallet_address
        self.currency = currency

    def validate(self) -> bool:
        return len(self.wallet_address) >= 26

    def get_fee(self, amount: Decimal) -> Decimal:
        return amount * Decimal("0.01")

    def pay(self, amount: Decimal) -> PaymentResult:
        if not self.validate():
            return PaymentResult(False, None, "Invalid wallet address")

        fee = self.get_fee(amount)
        return PaymentResult(
            success=True,
            transaction_id=f"CRYPTO-{self.wallet_address[:8]}",
            message=f"Sent {amount} {self.currency} to {self.wallet_address[:8]}...",
            fee=fee
        )


# Context
class PaymentProcessor:
    def __init__(self, strategy: PaymentStrategy = None):
        self._strategy = strategy

    def set_strategy(self, strategy: PaymentStrategy):
        self._strategy = strategy

    def process_payment(self, amount: Decimal) -> PaymentResult:
        if not self._strategy:
            return PaymentResult(False, None, "No payment method selected")

        return self._strategy.pay(amount)


# Usage
processor = PaymentProcessor()

processor.set_strategy(CreditCardPayment("4111111111111111", "12/25", "123"))
result = processor.process_payment(Decimal("99.99"))
print(result)

processor.set_strategy(PayPalPayment("user@example.com"))
result = processor.process_payment(Decimal("49.99"))
print(result)
```

### Python - Production-Grade Strategy with Selection Logic

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from decimal import Decimal
from typing import Dict, List, Any, Optional, Callable
from enum import Enum
import logging
import time

logger = logging.getLogger(__name__)


# ============================================================
# STRATEGY INTERFACE WITH METADATA
# ============================================================

@dataclass
class StrategyMetadata:
    """Metadata for strategy selection and monitoring."""
    name: str
    version: str
    description: str
    supported_countries: List[str] = field(default_factory=list)
    min_amount: Decimal = Decimal("0")
    max_amount: Decimal = Decimal("999999999")
    is_enabled: bool = True
    priority: int = 0  # Higher = preferred


class PricingStrategy(ABC):
    """Base strategy with metadata and lifecycle hooks."""

    @property
    @abstractmethod
    def metadata(self) -> StrategyMetadata:
        pass

    @abstractmethod
    def calculate_price(self, base_price: Decimal, context: Dict[str, Any]) -> Decimal:
        pass

    def can_handle(self, context: Dict[str, Any]) -> bool:
        """Override to add custom eligibility logic."""
        meta = self.metadata
        amount = context.get("base_price", Decimal("0"))

        if not meta.is_enabled:
            return False

        if meta.supported_countries:
            country = context.get("country", "")
            if country not in meta.supported_countries:
                return False

        if amount < meta.min_amount or amount > meta.max_amount:
            return False

        return True

    def before_calculate(self, context: Dict[str, Any]) -> None:
        """Hook called before calculation."""
        pass

    def after_calculate(self, result: Decimal, context: Dict[str, Any]) -> None:
        """Hook called after calculation."""
        pass


# ============================================================
# CONCRETE STRATEGIES
# ============================================================

class StandardPricingStrategy(PricingStrategy):
    """No discount - standard pricing."""

    @property
    def metadata(self) -> StrategyMetadata:
        return StrategyMetadata(
            name="standard",
            version="1.0",
            description="Standard pricing without discounts",
            priority=0,
        )

    def calculate_price(self, base_price: Decimal, context: Dict[str, Any]) -> Decimal:
        return base_price


class PercentageDiscountStrategy(PricingStrategy):
    """Percentage-based discount."""

    def __init__(self, discount_percent: Decimal, name: str = "percentage_discount"):
        self._discount = discount_percent
        self._name = name

    @property
    def metadata(self) -> StrategyMetadata:
        return StrategyMetadata(
            name=self._name,
            version="1.0",
            description=f"{self._discount}% discount",
            priority=10,
        )

    def calculate_price(self, base_price: Decimal, context: Dict[str, Any]) -> Decimal:
        discount_amount = base_price * (self._discount / Decimal("100"))
        return base_price - discount_amount


class TieredPricingStrategy(PricingStrategy):
    """Volume-based tiered pricing."""

    def __init__(self, tiers: List[Dict[str, Any]]):
        """
        tiers = [
            {"min_qty": 1, "max_qty": 10, "discount": 0},
            {"min_qty": 11, "max_qty": 50, "discount": 10},
            {"min_qty": 51, "max_qty": None, "discount": 20},
        ]
        """
        self._tiers = sorted(tiers, key=lambda t: t["min_qty"])

    @property
    def metadata(self) -> StrategyMetadata:
        return StrategyMetadata(
            name="tiered",
            version="2.0",
            description="Volume-based tiered discounts",
            priority=20,
        )

    def calculate_price(self, base_price: Decimal, context: Dict[str, Any]) -> Decimal:
        quantity = context.get("quantity", 1)

        discount_percent = Decimal("0")
        for tier in self._tiers:
            max_qty = tier.get("max_qty") or float("inf")
            if tier["min_qty"] <= quantity <= max_qty:
                discount_percent = Decimal(str(tier["discount"]))
                break

        discount_amount = base_price * (discount_percent / Decimal("100"))
        return base_price - discount_amount


class LoyaltyPricingStrategy(PricingStrategy):
    """Customer loyalty-based pricing."""

    LOYALTY_DISCOUNTS = {
        "bronze": Decimal("5"),
        "silver": Decimal("10"),
        "gold": Decimal("15"),
        "platinum": Decimal("20"),
    }

    @property
    def metadata(self) -> StrategyMetadata:
        return StrategyMetadata(
            name="loyalty",
            version="1.0",
            description="Loyalty tier-based discounts",
            priority=15,
        )

    def can_handle(self, context: Dict[str, Any]) -> bool:
        if not super().can_handle(context):
            return False
        # Only for logged-in customers with loyalty tier
        return "loyalty_tier" in context

    def calculate_price(self, base_price: Decimal, context: Dict[str, Any]) -> Decimal:
        tier = context.get("loyalty_tier", "").lower()
        discount_percent = self.LOYALTY_DISCOUNTS.get(tier, Decimal("0"))

        discount_amount = base_price * (discount_percent / Decimal("100"))
        return base_price - discount_amount


class ABTestPricingStrategy(PricingStrategy):
    """A/B test wrapper - delegates to variant strategies."""

    def __init__(
        self,
        control: PricingStrategy,
        variant: PricingStrategy,
        variant_percentage: int = 50
    ):
        self._control = control
        self._variant = variant
        self._variant_pct = variant_percentage

    @property
    def metadata(self) -> StrategyMetadata:
        return StrategyMetadata(
            name="ab_test",
            version="1.0",
            description=f"A/B test: {self._control.metadata.name} vs {self._variant.metadata.name}",
            priority=100,  # High priority - overrides others
        )

    def calculate_price(self, base_price: Decimal, context: Dict[str, Any]) -> Decimal:
        # Deterministic bucket based on user ID
        user_id = context.get("user_id", "anonymous")
        bucket = hash(user_id) % 100

        if bucket < self._variant_pct:
            strategy = self._variant
            context["_ab_variant"] = "variant"
        else:
            strategy = self._control
            context["_ab_variant"] = "control"

        return strategy.calculate_price(base_price, context)


# ============================================================
# STRATEGY SELECTOR (INTELLIGENT CONTEXT)
# ============================================================

class PricingEngine:
    """
    Production-grade pricing engine with:
    - Automatic strategy selection
    - Fallback chains
    - Metrics & logging
    - Strategy composition
    """

    def __init__(self, default_strategy: PricingStrategy = None):
        self._strategies: List[PricingStrategy] = []
        self._default = default_strategy or StandardPricingStrategy()
        self._metrics = {
            "calculations": 0,
            "strategy_usage": {},
            "avg_discount_percent": Decimal("0"),
        }

    def register(self, strategy: PricingStrategy) -> 'PricingEngine':
        """Register a strategy. Returns self for chaining."""
        self._strategies.append(strategy)
        # Sort by priority (highest first)
        self._strategies.sort(key=lambda s: s.metadata.priority, reverse=True)
        return self

    def calculate_price(
        self,
        base_price: Decimal,
        context: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """
        Calculate final price using best available strategy.

        Returns dict with:
        - final_price: The calculated price
        - base_price: Original price
        - discount: Amount discounted
        - strategy_used: Name of strategy applied
        - metadata: Additional info
        """
        context = context or {}
        context["base_price"] = base_price

        # Find best strategy
        selected_strategy = self._select_strategy(context)
        strategy_name = selected_strategy.metadata.name

        # Calculate
        start_time = time.perf_counter()
        selected_strategy.before_calculate(context)
        final_price = selected_strategy.calculate_price(base_price, context)
        selected_strategy.after_calculate(final_price, context)
        duration_ms = (time.perf_counter() - start_time) * 1000

        # Update metrics
        self._update_metrics(strategy_name, base_price, final_price)

        discount = base_price - final_price
        discount_percent = (discount / base_price * 100) if base_price > 0 else Decimal("0")

        logger.info(
            f"Pricing: {base_price} -> {final_price} "
            f"({discount_percent:.1f}% off) using {strategy_name}"
        )

        return {
            "final_price": final_price,
            "base_price": base_price,
            "discount": discount,
            "discount_percent": discount_percent,
            "strategy_used": strategy_name,
            "calculation_time_ms": duration_ms,
            "metadata": context.get("_ab_variant"),
        }

    def _select_strategy(self, context: Dict[str, Any]) -> PricingStrategy:
        """Select best strategy based on context and priority."""
        for strategy in self._strategies:
            if strategy.can_handle(context):
                logger.debug(f"Selected strategy: {strategy.metadata.name}")
                return strategy

        logger.debug(f"Using default strategy: {self._default.metadata.name}")
        return self._default

    def _update_metrics(
        self,
        strategy_name: str,
        base_price: Decimal,
        final_price: Decimal
    ):
        self._metrics["calculations"] += 1
        self._metrics["strategy_usage"][strategy_name] = \
            self._metrics["strategy_usage"].get(strategy_name, 0) + 1

    def get_metrics(self) -> Dict[str, Any]:
        return dict(self._metrics)

    def list_strategies(self) -> List[Dict[str, Any]]:
        """List all registered strategies with metadata."""
        return [
            {
                "name": s.metadata.name,
                "version": s.metadata.version,
                "description": s.metadata.description,
                "priority": s.metadata.priority,
                "enabled": s.metadata.is_enabled,
            }
            for s in self._strategies
        ]


# ============================================================
# USAGE
# ============================================================

def main():
    # Create pricing engine with strategies
    engine = PricingEngine()

    # Register strategies (order doesn't matter - sorted by priority)
    engine.register(PercentageDiscountStrategy(Decimal("25"), "black_friday"))
    engine.register(TieredPricingStrategy([
        {"min_qty": 1, "max_qty": 10, "discount": 0},
        {"min_qty": 11, "max_qty": 50, "discount": 10},
        {"min_qty": 51, "max_qty": None, "discount": 20},
    ]))
    engine.register(LoyaltyPricingStrategy())

    # A/B test: standard vs 15% discount
    engine.register(ABTestPricingStrategy(
        control=StandardPricingStrategy(),
        variant=PercentageDiscountStrategy(Decimal("15"), "test_discount"),
        variant_percentage=20,  # 20% of users get variant
    ))

    # Calculate prices with different contexts
    print("=== Standard User ===")
    result = engine.calculate_price(Decimal("100.00"), {"user_id": "user123"})
    print(f"Result: {result}")

    print("\n=== Gold Loyalty Member ===")
    result = engine.calculate_price(
        Decimal("100.00"),
        {"user_id": "gold_member", "loyalty_tier": "gold"}
    )
    print(f"Result: {result}")

    print("\n=== Bulk Order (25 items) ===")
    result = engine.calculate_price(
        Decimal("100.00"),
        {"user_id": "bulk_buyer", "quantity": 25}
    )
    print(f"Result: {result}")

    print("\n=== Metrics ===")
    print(engine.get_metrics())

    print("\n=== Registered Strategies ===")
    for s in engine.list_strategies():
        print(f"  {s['priority']:3d} | {s['name']}: {s['description']}")


if __name__ == "__main__":
    main()
```

### Go - Sorting Strategies

```go
package main

import (
	"fmt"
	"sort"
)

type SortStrategy interface {
	Sort(data []int) []int
	Name() string
}

// Bubble Sort
type BubbleSort struct{}

func (b *BubbleSort) Name() string { return "Bubble Sort" }

func (b *BubbleSort) Sort(data []int) []int {
	result := make([]int, len(data))
	copy(result, data)

	n := len(result)
	for i := 0; i < n-1; i++ {
		for j := 0; j < n-i-1; j++ {
			if result[j] > result[j+1] {
				result[j], result[j+1] = result[j+1], result[j]
			}
		}
	}
	return result
}

// Quick Sort
type QuickSort struct{}

func (q *QuickSort) Name() string { return "Quick Sort" }

func (q *QuickSort) Sort(data []int) []int {
	result := make([]int, len(data))
	copy(result, data)
	q.quickSort(result, 0, len(result)-1)
	return result
}

func (q *QuickSort) quickSort(arr []int, low, high int) {
	if low < high {
		pi := q.partition(arr, low, high)
		q.quickSort(arr, low, pi-1)
		q.quickSort(arr, pi+1, high)
	}
}

func (q *QuickSort) partition(arr []int, low, high int) int {
	pivot := arr[high]
	i := low - 1

	for j := low; j < high; j++ {
		if arr[j] < pivot {
			i++
			arr[i], arr[j] = arr[j], arr[i]
		}
	}
	arr[i+1], arr[high] = arr[high], arr[i+1]
	return i + 1
}

// Context
type Sorter struct {
	strategy SortStrategy
}

func NewSorter(strategy SortStrategy) *Sorter {
	return &Sorter{strategy: strategy}
}

func (s *Sorter) SetStrategy(strategy SortStrategy) {
	s.strategy = strategy
}

func (s *Sorter) Sort(data []int) []int {
	fmt.Printf("Sorting using %s\n", s.strategy.Name())
	return s.strategy.Sort(data)
}

func main() {
	data := []int{64, 34, 25, 12, 22, 11, 90}

	sorter := NewSorter(&QuickSort{})
	fmt.Println("Original:", data)
	fmt.Println("Sorted:", sorter.Sort(data))

	sorter.SetStrategy(&BubbleSort{})
	fmt.Println("Sorted:", sorter.Sort(data))
}
```

### Go - Production-Grade Strategy with Registry

```go
package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

// ============================================================
// PRODUCTION STRATEGY PATTERN IN GO
// Features: Registry, Metrics, Context-aware selection
// ============================================================

// Strategy metadata
type StrategyInfo struct {
	Name        string
	Version     string
	Description string
	Priority    int
	Enabled     bool
}

// Compression strategy interface
type CompressionStrategy interface {
	Compress(data []byte) ([]byte, error)
	Decompress(data []byte) ([]byte, error)
	Info() StrategyInfo
	CanHandle(ctx context.Context, dataSize int) bool
}

// ============================================================
// CONCRETE STRATEGIES
// ============================================================

type NoCompression struct{}

func (n *NoCompression) Info() StrategyInfo {
	return StrategyInfo{
		Name:        "none",
		Version:     "1.0",
		Description: "No compression (passthrough)",
		Priority:    0,
		Enabled:     true,
	}
}

func (n *NoCompression) Compress(data []byte) ([]byte, error) {
	return data, nil
}

func (n *NoCompression) Decompress(data []byte) ([]byte, error) {
	return data, nil
}

func (n *NoCompression) CanHandle(ctx context.Context, dataSize int) bool {
	return true // Always available as fallback
}

type GzipCompression struct {
	level int
}

func NewGzipCompression(level int) *GzipCompression {
	return &GzipCompression{level: level}
}

func (g *GzipCompression) Info() StrategyInfo {
	return StrategyInfo{
		Name:        fmt.Sprintf("gzip_level_%d", g.level),
		Version:     "1.0",
		Description: fmt.Sprintf("GZIP compression (level %d)", g.level),
		Priority:    10,
		Enabled:     true,
	}
}

func (g *GzipCompression) Compress(data []byte) ([]byte, error) {
	// Simulated compression
	return append([]byte("GZIP:"), data...), nil
}

func (g *GzipCompression) Decompress(data []byte) ([]byte, error) {
	if len(data) > 5 {
		return data[5:], nil
	}
	return data, nil
}

func (g *GzipCompression) CanHandle(ctx context.Context, dataSize int) bool {
	// GZIP is good for medium to large data
	return dataSize > 1024
}

type SnappyCompression struct{}

func (s *SnappyCompression) Info() StrategyInfo {
	return StrategyInfo{
		Name:        "snappy",
		Version:     "1.0",
		Description: "Snappy compression (fast, moderate ratio)",
		Priority:    20, // Higher priority when applicable
		Enabled:     true,
	}
}

func (s *SnappyCompression) Compress(data []byte) ([]byte, error) {
	return append([]byte("SNPY:"), data...), nil
}

func (s *SnappyCompression) Decompress(data []byte) ([]byte, error) {
	if len(data) > 5 {
		return data[5:], nil
	}
	return data, nil
}

func (s *SnappyCompression) CanHandle(ctx context.Context, dataSize int) bool {
	// Snappy is good for speed-critical scenarios
	deadline, hasDeadline := ctx.Deadline()
	if hasDeadline {
		// Use Snappy if we have tight deadline
		return time.Until(deadline) < 100*time.Millisecond
	}
	return dataSize > 512 // Good for smaller data than GZIP
}

// ============================================================
// STRATEGY REGISTRY & ENGINE
// ============================================================

type CompressionEngine struct {
	mu         sync.RWMutex
	strategies []CompressionStrategy
	fallback   CompressionStrategy
	metrics    struct {
		sync.Mutex
		compressions map[string]int64
		totalBytes   int64
	}
}

func NewCompressionEngine() *CompressionEngine {
	ce := &CompressionEngine{
		strategies: make([]CompressionStrategy, 0),
		fallback:   &NoCompression{},
	}
	ce.metrics.compressions = make(map[string]int64)
	return ce
}

func (ce *CompressionEngine) Register(strategy CompressionStrategy) *CompressionEngine {
	ce.mu.Lock()
	defer ce.mu.Unlock()

	ce.strategies = append(ce.strategies, strategy)
	// Sort by priority (highest first)
	sort.Slice(ce.strategies, func(i, j int) bool {
		return ce.strategies[i].Info().Priority > ce.strategies[j].Info().Priority
	})

	return ce
}

func (ce *CompressionEngine) Compress(ctx context.Context, data []byte) ([]byte, string, error) {
	strategy := ce.selectStrategy(ctx, len(data))
	info := strategy.Info()

	result, err := strategy.Compress(data)
	if err != nil {
		return nil, "", err
	}

	ce.recordMetric(info.Name, len(data))

	return result, info.Name, nil
}

func (ce *CompressionEngine) selectStrategy(ctx context.Context, dataSize int) CompressionStrategy {
	ce.mu.RLock()
	defer ce.mu.RUnlock()

	for _, strategy := range ce.strategies {
		info := strategy.Info()
		if !info.Enabled {
			continue
		}
		if strategy.CanHandle(ctx, dataSize) {
			return strategy
		}
	}

	return ce.fallback
}

func (ce *CompressionEngine) recordMetric(name string, bytes int) {
	ce.metrics.Lock()
	defer ce.metrics.Unlock()
	ce.metrics.compressions[name]++
	ce.metrics.totalBytes += int64(bytes)
}

func (ce *CompressionEngine) GetMetrics() map[string]interface{} {
	ce.metrics.Lock()
	defer ce.metrics.Unlock()

	return map[string]interface{}{
		"compressions_by_strategy": ce.metrics.compressions,
		"total_bytes_processed":    ce.metrics.totalBytes,
	}
}

func (ce *CompressionEngine) ListStrategies() []StrategyInfo {
	ce.mu.RLock()
	defer ce.mu.RUnlock()

	infos := make([]StrategyInfo, len(ce.strategies))
	for i, s := range ce.strategies {
		infos[i] = s.Info()
	}
	return infos
}

// ============================================================
// USAGE
// ============================================================

func main() {
	engine := NewCompressionEngine()

	// Register strategies
	engine.Register(&SnappyCompression{}).
		Register(NewGzipCompression(6)).
		Register(NewGzipCompression(9))

	fmt.Println("Registered strategies:")
	for _, info := range engine.ListStrategies() {
		fmt.Printf("  %d | %s: %s\n", info.Priority, info.Name, info.Description)
	}

	// Compress with different contexts
	fmt.Println("\n--- Normal compression (large data) ---")
	ctx := context.Background()
	largeData := make([]byte, 10000)
	result, strategyUsed, _ := engine.Compress(ctx, largeData)
	fmt.Printf("Used: %s, Result size: %d\n", strategyUsed, len(result))

	fmt.Println("\n--- Tight deadline compression ---")
	tightCtx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
	defer cancel()
	result, strategyUsed, _ = engine.Compress(tightCtx, largeData)
	fmt.Printf("Used: %s (deadline forced fast algorithm)\n", strategyUsed)

	fmt.Println("\n--- Small data compression ---")
	smallData := make([]byte, 100)
	result, strategyUsed, _ = engine.Compress(ctx, smallData)
	fmt.Printf("Used: %s (small data = no compression)\n", strategyUsed)

	fmt.Println("\n--- Metrics ---")
	fmt.Printf("%+v\n", engine.GetMetrics())
}
```

---

## Production War Stories

<div class="war-story">
  <div class="war-story-header">
    <span class="war-story-icon">💥</span>
    <span class="war-story-title">The Strategy That Broke During Black Friday</span>
  </div>
  <div class="war-story-content">
    <p><strong>Company:</strong> E-commerce platform</p>
    <p><strong>The Setup:</strong> Pricing engine with discount strategies. Black Friday had a 50% off strategy.</p>
    <p><strong>The Bug:</strong> The Black Friday strategy was registered with highest priority but its can_handle() always returned true. It was supposed to check the date!</p>
    <p><strong>The Impact:</strong> 50% discounts applied in October during testing. Lost ~$100K before caught.</p>

```python
# BEFORE: Bug - always applies
class BlackFridayStrategy(PricingStrategy):
    def can_handle(self, context):
        return True  # BUG: Should check date!

# AFTER: Fixed with proper date check
class BlackFridayStrategy(PricingStrategy):
    def __init__(self, start_date: datetime, end_date: datetime):
        self.start_date = start_date
        self.end_date = end_date

    def can_handle(self, context):
        now = datetime.now()
        return self.start_date <= now <= self.end_date
```

    <p><strong>Lesson:</strong> Always test strategy eligibility conditions. Use feature flags for time-based strategies.</p>
  </div>
</div>

<div class="war-story">
  <div class="war-story-header">
    <span class="war-story-icon">🔥</span>
    <span class="war-story-title">The Strategy Selection That Took 500ms</span>
  </div>
  <div class="war-story-content">
    <p><strong>The Setup:</strong> 50+ pricing strategies registered. Selection iterating through all to find match.</p>
    <p><strong>The Problem:</strong> Each strategy's can_handle() made database calls to check customer eligibility.</p>

```python
# BEFORE: N database calls per price calculation!
class LoyaltyStrategy:
    def can_handle(self, context):
        customer = self.db.get_customer(context["user_id"])  # DB call!
        return customer.loyalty_tier == "gold"

class PremiumStrategy:
    def can_handle(self, context):
        customer = self.db.get_customer(context["user_id"])  # Another DB call!
        return customer.is_premium

# Called for every strategy = 50 DB calls per price calculation!
```

    <p><strong>The Fix:</strong></p>

```python
# AFTER: Pre-fetch data, pass in context
def calculate_price(self, base_price, user_id):
    # One DB call, enrich context
    customer = self.db.get_customer(user_id)
    context = {
        "user_id": user_id,
        "base_price": base_price,
        "loyalty_tier": customer.loyalty_tier,
        "is_premium": customer.is_premium,
        # Pre-computed eligibility flags
    }

    return self.engine.calculate_price(base_price, context)

# Strategies now check in-memory context
class LoyaltyStrategy:
    def can_handle(self, context):
        return context.get("loyalty_tier") == "gold"  # No DB call!
```

    <p><strong>Lesson:</strong> Strategy selection must be O(1) per strategy. Pre-fetch data, pass in context.</p>
  </div>
</div>

---

## Deep Dive: Strategy Composition

### Combining Multiple Strategies

Sometimes you need to apply multiple strategies together:

```python
class CompositeStrategy(PricingStrategy):
    """Applies multiple strategies in sequence."""

    def __init__(self, strategies: List[PricingStrategy]):
        self._strategies = strategies

    def calculate_price(self, base_price: Decimal, context: Dict) -> Decimal:
        price = base_price
        for strategy in self._strategies:
            if strategy.can_handle(context):
                price = strategy.calculate_price(price, context)
        return price


# Usage: Stack loyalty discount on top of bulk discount
composite = CompositeStrategy([
    BulkDiscountStrategy(),    # 10% off for bulk
    LoyaltyDiscountStrategy(), # Additional 5% for gold members
])
# Result: 100 * 0.9 * 0.95 = 85.5
```

### Strategy Decorator Pattern

Add cross-cutting concerns to any strategy:

```python
class LoggingStrategyDecorator(PricingStrategy):
    """Adds logging to any pricing strategy."""

    def __init__(self, wrapped: PricingStrategy):
        self._wrapped = wrapped

    @property
    def metadata(self):
        return self._wrapped.metadata

    def calculate_price(self, base_price: Decimal, context: Dict) -> Decimal:
        logger.info(f"Strategy {self.metadata.name}: input={base_price}")
        result = self._wrapped.calculate_price(base_price, context)
        logger.info(f"Strategy {self.metadata.name}: output={result}")
        return result


class TimingStrategyDecorator(PricingStrategy):
    """Measures and records calculation time."""

    def __init__(self, wrapped: PricingStrategy, metrics_client):
        self._wrapped = wrapped
        self._metrics = metrics_client

    def calculate_price(self, base_price: Decimal, context: Dict) -> Decimal:
        start = time.perf_counter()
        result = self._wrapped.calculate_price(base_price, context)
        duration = time.perf_counter() - start
        self._metrics.record(f"pricing.{self.metadata.name}.duration", duration)
        return result


# Usage: Wrap any strategy
strategy = TimingStrategyDecorator(
    LoggingStrategyDecorator(
        LoyaltyDiscountStrategy()
    ),
    metrics_client
)
```

---

## Expert-Level FAQs

<details>
<summary><strong>Q: How do I unit test strategies effectively?</strong></summary>

**A:** Test strategies in isolation, then integration:

```python
# Unit test - strategy logic only
def test_percentage_discount_strategy():
    strategy = PercentageDiscountStrategy(Decimal("20"))

    result = strategy.calculate_price(Decimal("100"), {})

    assert result == Decimal("80")


# Parameterized tests for edge cases
@pytest.mark.parametrize("discount,input,expected", [
    (Decimal("0"), Decimal("100"), Decimal("100")),
    (Decimal("100"), Decimal("100"), Decimal("0")),
    (Decimal("50"), Decimal("0"), Decimal("0")),
])
def test_discount_edge_cases(discount, input, expected):
    strategy = PercentageDiscountStrategy(discount)
    assert strategy.calculate_price(input, {}) == expected


# Integration test - strategy selection
def test_engine_selects_loyalty_for_gold_member():
    engine = PricingEngine()
    engine.register(StandardPricingStrategy())
    engine.register(LoyaltyPricingStrategy())

    result = engine.calculate_price(
        Decimal("100"),
        {"loyalty_tier": "gold"}
    )

    assert result["strategy_used"] == "loyalty"
```
</details>

<details>
<summary><strong>Q: Strategy vs Command pattern?</strong></summary>

**A:** They look similar but serve different purposes:

| Aspect | Strategy | Command |
|--------|----------|---------|
| Purpose | HOW to do something | WHAT to do |
| Encapsulates | Algorithm | Request |
| Typical use | Calculation, validation | Actions, transactions |
| State | Usually stateless | Often has parameters |
| Undo support | Rare | Common |

```python
# Strategy: Different ways to calculate shipping
class ShippingStrategy:
    def calculate(self, order) -> Decimal: ...

class StandardShipping(ShippingStrategy): ...
class ExpressShipping(ShippingStrategy): ...

# Command: Different actions to perform
class Command:
    def execute(self): ...
    def undo(self): ...

class PlaceOrderCommand(Command):
    def __init__(self, order):
        self.order = order

    def execute(self):
        self.order.place()

    def undo(self):
        self.order.cancel()
```
</details>

<details>
<summary><strong>Q: How do I handle strategy versioning?</strong></summary>

**A:** Version strategies for backward compatibility and A/B testing:

```python
class StrategyRegistry:
    """Registry supporting multiple versions of same strategy."""

    def __init__(self):
        self._strategies: Dict[str, Dict[str, PricingStrategy]] = {}
        self._default_versions: Dict[str, str] = {}

    def register(self, strategy: PricingStrategy, is_default: bool = False):
        name = strategy.metadata.name
        version = strategy.metadata.version

        if name not in self._strategies:
            self._strategies[name] = {}

        self._strategies[name][version] = strategy

        if is_default or name not in self._default_versions:
            self._default_versions[name] = version

    def get(self, name: str, version: str = None) -> PricingStrategy:
        if name not in self._strategies:
            raise KeyError(f"Unknown strategy: {name}")

        version = version or self._default_versions[name]
        return self._strategies[name][version]


# Usage
registry = StrategyRegistry()
registry.register(LoyaltyStrategyV1(), is_default=False)
registry.register(LoyaltyStrategyV2(), is_default=True)

# Get specific version or default
strategy = registry.get("loyalty", version="1.0")  # V1
strategy = registry.get("loyalty")  # V2 (default)
```
</details>

<details>
<summary><strong>Q: How do I handle strategy configuration from database/config?</strong></summary>

**A:** Use Factory pattern to create strategies from config:

```python
class StrategyFactory:
    """Create strategies from configuration."""

    @staticmethod
    def from_config(config: Dict[str, Any]) -> PricingStrategy:
        strategy_type = config["type"]

        if strategy_type == "percentage":
            return PercentageDiscountStrategy(
                Decimal(config["discount"]),
                name=config.get("name", "percentage")
            )

        elif strategy_type == "tiered":
            return TieredPricingStrategy(config["tiers"])

        elif strategy_type == "composite":
            sub_strategies = [
                StrategyFactory.from_config(sub)
                for sub in config["strategies"]
            ]
            return CompositeStrategy(sub_strategies)

        raise ValueError(f"Unknown strategy type: {strategy_type}")


# Load from database/config file
config = {
    "type": "composite",
    "strategies": [
        {"type": "percentage", "discount": "10", "name": "summer_sale"},
        {"type": "tiered", "tiers": [
            {"min_qty": 10, "max_qty": None, "discount": 5}
        ]}
    ]
}

strategy = StrategyFactory.from_config(config)
```
</details>

---

## Common Mistakes and Anti-Patterns

### Mistake 1: Strategy That Knows About Context Internals

```python
# BAD: Strategy coupled to specific context structure
class DiscountStrategy:
    def calculate(self, context):
        # Reaches deep into context internals
        user = context.services.user_service.get_user(
            context.request.session.user_id
        )
        return self._calculate_for_user(user)

# GOOD: Strategy receives only what it needs
class DiscountStrategy:
    def calculate(self, base_price: Decimal, user_tier: str) -> Decimal:
        # Clean interface, no dependencies
        return base_price * self.TIER_DISCOUNTS[user_tier]
```

### Mistake 2: Too Many Strategies

```python
# BAD: One strategy per configuration value
class Discount5Strategy: ...
class Discount10Strategy: ...
class Discount15Strategy: ...
class Discount20Strategy: ...
# ... 100 more classes

# GOOD: Parameterized strategy
class PercentageDiscount:
    def __init__(self, percent: Decimal):
        self.percent = percent

# Create as needed
strategies = [
    PercentageDiscount(Decimal("5")),
    PercentageDiscount(Decimal("10")),
]
```

### Mistake 3: Strategy Selection in Wrong Place

```python
# BAD: Client code selects strategy based on business rules
class OrderService:
    def calculate_price(self, order, user):
        if user.is_premium and order.total > 1000:
            strategy = PremiumBulkDiscount()
        elif user.is_premium:
            strategy = PremiumDiscount()
        elif order.total > 1000:
            strategy = BulkDiscount()
        else:
            strategy = StandardPricing()

        return strategy.calculate(order.total)

# GOOD: Engine handles selection
class OrderService:
    def __init__(self, pricing_engine: PricingEngine):
        self.pricing_engine = pricing_engine

    def calculate_price(self, order, user):
        context = {
            "is_premium": user.is_premium,
            "total": order.total,
        }
        return self.pricing_engine.calculate(order.total, context)
```

---

## Interview Deep-Dive Questions

**For Senior/Staff Level:**

1. "How would you implement a pricing system that supports A/B testing different discount strategies per user cohort?"

2. "Describe a scenario where you combined Strategy with other patterns (Factory, Decorator, Composite). What were the tradeoffs?"

3. "How do you handle strategy selection that depends on data from multiple services? What about circular dependencies?"

4. "Walk me through implementing strategy hot-reloading without service restart."

5. "How would you design a strategy system that supports gradual rollout (1% → 10% → 50% → 100%)?"

---

## Related Patterns

- [State](/topic/design-patterns/state) - State-based behavior changes
- [Template Method](/topic/design-patterns/template-method) - Algorithm skeleton with overridable steps
- [Command](/topic/design-patterns/command) - Encapsulate requests as objects
- [Factory Method](/topic/design-patterns/factory-method) - Create strategies dynamically
- [Decorator](/topic/design-patterns/decorator) - Add behavior to strategies
