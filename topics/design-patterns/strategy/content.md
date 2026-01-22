# Strategy Pattern

## Overview

The Strategy pattern defines a family of algorithms, encapsulates each one in a separate class, and makes them interchangeable. This allows the algorithm to vary independently from clients that use it, enabling runtime selection of behavior without modifying the code that uses it.

**Difficulty:** Beginner to Intermediate
**Category:** Behavioral Pattern
**Also Known As:** Policy Pattern

---

## The GPS Navigation Analogy

Think about using Google Maps or Waze for directions. When you enter a destination, the app asks you: "How do you want to get there?"

- **Fastest route** - Minimize travel time (even if longer distance)
- **Shortest route** - Minimize distance (even if slower)
- **Avoid tolls** - Stay on free roads
- **Avoid highways** - Use local streets only
- **Scenic route** - Prioritize views over speed

The navigation app (Context) doesn't care HOW the route is calculated. It just asks the current routing strategy to compute directions. You can switch strategies mid-trip without the app's core code changing at all.

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;">
  <div style="color: #1e293b; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.75rem;">GPS Navigation Strategy Mapping</div>
  <div style="display: flex; flex-direction: column; gap: 0.75rem;">
    <div style="display: flex; gap: 1rem; align-items: center;">
      <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600; min-width: 150px;">Navigation App</span>
      <span style="color: #64748b;">maps to</span>
      <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600;">Context</span>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600; min-width: 150px;">Route Calculator</span>
      <span style="color: #64748b;">maps to</span>
      <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600;">Strategy Interface</span>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600; min-width: 150px;">Fastest/Shortest/etc</span>
      <span style="color: #64748b;">maps to</span>
      <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600;">Concrete Strategies</span>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600; min-width: 150px;">User selects mode</span>
      <span style="color: #64748b;">maps to</span>
      <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600;">setStrategy()</span>
    </div>
  </div>
</div>

---

## Real-World Company Usage

### Stripe - Payment Processing
Stripe uses strategy pattern for payment methods. Each payment type (credit card, ACH, SEPA, cryptocurrency) is a strategy with different validation, processing, and fee calculation logic. New payment methods can be added without modifying existing code.

### Netflix - Encoding Strategies
Video encoding uses different strategies based on content type, target device, and network conditions. A sports broadcast needs different encoding than a dialogue-heavy drama. The streaming service selects strategies dynamically.

### Amazon - Shipping Calculations
Shipping cost calculation uses strategies for ground, express, same-day, and prime delivery. Each strategy accounts for weight, dimensions, distance, and service level differently.

### Uber - Pricing Algorithms
Surge pricing, base fare calculation, and route pricing all use strategies. Different strategies apply for UberX, UberXL, UberBlack, or Pool rides, each with its own pricing algorithm.

### Slack - Notification Delivery
Messages can be delivered via push notification, email, SMS, or desktop alert. Each delivery mechanism is a strategy that can be selected based on user preferences and message urgency.

---

## Pattern Structure

<div style="background: #f8fafc; border-radius: 12px; padding: 2rem; margin: 2rem 0; border: 1px solid #e2e8f0;">
  <div style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
    <div style="background: #dbeafe; border-radius: 10px; padding: 1.25rem 2rem; text-align: center; border: 2px solid #3b82f6;">
      <div style="font-weight: 700; font-size: 1.1rem; color: #1e40af; margin-bottom: 0.5rem;">Context</div>
      <div style="font-size: 0.85rem; color: #1e40af; border-top: 1px solid #93c5fd; padding-top: 0.5rem;">
        - strategy: Strategy<br>
        + setStrategy(strategy)<br>
        + executeStrategy()
      </div>
    </div>
    <div style="color: #3b82f6; font-size: 1.25rem;">|<br>uses<br>v</div>
    <div style="background: #dcfce7; border: 2px dashed #22c55e; border-radius: 10px; padding: 1rem 1.5rem; text-align: center;">
      <div style="font-weight: 600; color: #166534;">Strategy (interface)</div>
      <div style="font-size: 0.8rem; color: #166534; margin-top: 0.25rem;">+ execute(data)</div>
    </div>
    <div style="color: #22c55e; font-size: 1.25rem;">^<br>implements</div>
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center;">
      <div style="background: #fef3c7; border-radius: 8px; padding: 0.75rem 1.25rem; text-align: center; border: 1px solid #f59e0b;">
        <div style="font-weight: 600; color: #92400e;">StrategyA</div>
      </div>
      <div style="background: #fce7f3; border-radius: 8px; padding: 0.75rem 1.25rem; text-align: center; border: 1px solid #ec4899;">
        <div style="font-weight: 600; color: #9d174d;">StrategyB</div>
      </div>
      <div style="background: #e0e7ff; border-radius: 8px; padding: 0.75rem 1.25rem; text-align: center; border: 1px solid #6366f1;">
        <div style="font-weight: 600; color: #3730a3;">StrategyC</div>
      </div>
    </div>
  </div>
</div>

---

## When to Use Strategy Pattern

<div style="background: #dcfce7; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #86efac;">
  <div style="color: #166534; font-weight: 700; margin-bottom: 1rem;">Use Strategy Pattern When:</div>
  <ul style="color: #166534; margin: 0; padding-left: 1.5rem; line-height: 1.8;">
    <li><strong>Multiple algorithms exist</strong> - Same problem has different solutions</li>
    <li><strong>Runtime algorithm selection</strong> - User preference, A/B tests, feature flags</li>
    <li><strong>Avoiding conditionals</strong> - Replace if/else chains for algorithm selection</li>
    <li><strong>Algorithm isolation</strong> - Keep complex algorithms separate from business logic</li>
    <li><strong>Testing flexibility</strong> - Easy to mock/stub strategies in tests</li>
    <li><strong>Plugin systems</strong> - Third parties can provide their own strategies</li>
  </ul>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #fecaca;">
  <div style="color: #991b1b; font-weight: 700; margin-bottom: 1rem;">Anti-Patterns to Avoid:</div>
  <ul style="color: #991b1b; margin: 0; padding-left: 1.5rem; line-height: 1.8;">
    <li><strong>Single algorithm</strong> - YAGNI, just use the algorithm directly</li>
    <li><strong>Simple conditionals</strong> - 2-3 line if/else is cleaner than Strategy classes</li>
    <li><strong>Algorithm never changes</strong> - No benefit to abstracting static behavior</li>
    <li><strong>Strategies share lots of code</strong> - Template Method might be better</li>
    <li><strong>Performance critical paths</strong> - Virtual dispatch adds overhead</li>
    <li><strong>God strategies</strong> - Strategies that do too much or have too many methods</li>
  </ul>
</div>

---

## Strategy vs State Pattern

This is a classic interview question. They look structurally identical but serve different purposes:

<div style="display: flex; gap: 1.5rem; margin: 1.5rem 0; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 280px; background: #dbeafe; border-radius: 12px; padding: 1.25rem; border: 1px solid #93c5fd;">
    <div style="font-weight: 700; font-size: 1.1rem; color: #1e40af; margin-bottom: 1rem; text-align: center; border-bottom: 1px solid #93c5fd; padding-bottom: 0.75rem;">STRATEGY PATTERN</div>
    <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; line-height: 1.6; color: #1e40af;">
      <li><strong>Client chooses</strong> the strategy</li>
      <li>Strategies are <strong>interchangeable</strong></li>
      <li>Strategies are <strong>independent</strong> algorithms</li>
      <li>Answers: <strong>"How to do X?"</strong></li>
      <li>Strategies <strong>don't know</strong> about each other</li>
    </ul>
    <div style="background: #bfdbfe; border-radius: 8px; padding: 0.75rem; margin-top: 1rem; font-size: 0.85rem; color: #1e40af;">
      <strong>Example:</strong> Compression<br>
      GZip, LZ4, Snappy (user picks best)
    </div>
  </div>
  <div style="flex: 1; min-width: 280px; background: #dcfce7; border-radius: 12px; padding: 1.25rem; border: 1px solid #86efac;">
    <div style="font-weight: 700; font-size: 1.1rem; color: #166534; margin-bottom: 1rem; text-align: center; border-bottom: 1px solid #86efac; padding-bottom: 0.75rem;">STATE PATTERN</div>
    <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; line-height: 1.6; color: #166534;">
      <li><strong>Object changes</strong> its own state</li>
      <li>States <strong>transition</strong> to each other</li>
      <li>States are part of object <strong>lifecycle</strong></li>
      <li>Answers: <strong>"What can I do now?"</strong></li>
      <li>States <strong>know about</strong> transitions</li>
    </ul>
    <div style="background: #bbf7d0; border-radius: 8px; padding: 0.75rem; margin-top: 1rem; font-size: 0.85rem; color: #166534;">
      <strong>Example:</strong> Order lifecycle<br>
      Pending -> Paid -> Shipped -> Done
    </div>
  </div>
</div>

---

## Python Implementation - Discount System

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from decimal import Decimal
from typing import Dict, Any, Optional, List
from datetime import datetime, date
from enum import Enum


class DiscountStrategy(ABC):
    """Abstract base class for discount strategies."""

    @property
    @abstractmethod
    def name(self) -> str:
        """Human-readable name for display."""
        pass

    @abstractmethod
    def calculate_discount(self, subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
        """Calculate discount amount (not percentage)."""
        pass

    def is_applicable(self, context: Dict[str, Any]) -> bool:
        """Check if this strategy can be applied. Override for custom rules."""
        return True

    def get_description(self, discount_amount: Decimal) -> str:
        """Return description for receipt."""
        return f"{self.name}: -${discount_amount:.2f}"


class NoDiscountStrategy(DiscountStrategy):
    """Default strategy - no discount applied."""

    @property
    def name(self) -> str:
        return "Standard Pricing"

    def calculate_discount(self, subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
        return Decimal("0")


class PercentageDiscountStrategy(DiscountStrategy):
    """Fixed percentage off the subtotal."""

    def __init__(self, percent: Decimal, promo_name: str = "Percentage Discount"):
        self._percent = percent
        self._promo_name = promo_name

    @property
    def name(self) -> str:
        return f"{self._promo_name} ({self._percent}% off)"

    def calculate_discount(self, subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
        return subtotal * (self._percent / Decimal("100"))


class FixedAmountDiscountStrategy(DiscountStrategy):
    """Fixed dollar amount off."""

    def __init__(self, amount: Decimal, min_purchase: Decimal = Decimal("0")):
        self._amount = amount
        self._min_purchase = min_purchase

    @property
    def name(self) -> str:
        return f"${self._amount} Off"

    def is_applicable(self, context: Dict[str, Any]) -> bool:
        subtotal = context.get("subtotal", Decimal("0"))
        return subtotal >= self._min_purchase

    def calculate_discount(self, subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
        # Don't discount more than the subtotal
        return min(self._amount, subtotal)


class TieredDiscountStrategy(DiscountStrategy):
    """Volume-based discount tiers."""

    def __init__(self, tiers: List[Dict[str, Any]]):
        """
        tiers = [
            {"min_amount": 0, "max_amount": 50, "percent": 0},
            {"min_amount": 50, "max_amount": 100, "percent": 5},
            {"min_amount": 100, "max_amount": 200, "percent": 10},
            {"min_amount": 200, "max_amount": None, "percent": 15},
        ]
        """
        self._tiers = sorted(tiers, key=lambda t: t["min_amount"])

    @property
    def name(self) -> str:
        return "Volume Discount"

    def calculate_discount(self, subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
        for tier in reversed(self._tiers):
            max_amt = tier.get("max_amount") or float("inf")
            if tier["min_amount"] <= float(subtotal) <= max_amt:
                percent = Decimal(str(tier["percent"]))
                return subtotal * (percent / Decimal("100"))
        return Decimal("0")


class LoyaltyDiscountStrategy(DiscountStrategy):
    """Discount based on customer loyalty tier."""

    TIER_DISCOUNTS = {
        "bronze": Decimal("5"),
        "silver": Decimal("10"),
        "gold": Decimal("15"),
        "platinum": Decimal("20"),
    }

    @property
    def name(self) -> str:
        return "Loyalty Member Discount"

    def is_applicable(self, context: Dict[str, Any]) -> bool:
        return "loyalty_tier" in context

    def calculate_discount(self, subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
        tier = context.get("loyalty_tier", "").lower()
        percent = self.TIER_DISCOUNTS.get(tier, Decimal("0"))
        return subtotal * (percent / Decimal("100"))

    def get_description(self, discount_amount: Decimal) -> str:
        return f"Loyalty Reward: -${discount_amount:.2f}"


class FirstPurchaseDiscountStrategy(DiscountStrategy):
    """Special discount for first-time customers."""

    def __init__(self, percent: Decimal = Decimal("20")):
        self._percent = percent

    @property
    def name(self) -> str:
        return f"Welcome Discount ({self._percent}% off)"

    def is_applicable(self, context: Dict[str, Any]) -> bool:
        return context.get("is_first_purchase", False)

    def calculate_discount(self, subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
        return subtotal * (self._percent / Decimal("100"))


class SeasonalDiscountStrategy(DiscountStrategy):
    """Time-based seasonal discounts."""

    def __init__(
        self,
        percent: Decimal,
        start_date: date,
        end_date: date,
        campaign_name: str = "Seasonal Sale"
    ):
        self._percent = percent
        self._start_date = start_date
        self._end_date = end_date
        self._campaign_name = campaign_name

    @property
    def name(self) -> str:
        return f"{self._campaign_name} ({self._percent}% off)"

    def is_applicable(self, context: Dict[str, Any]) -> bool:
        today = context.get("current_date", date.today())
        return self._start_date <= today <= self._end_date

    def calculate_discount(self, subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
        return subtotal * (self._percent / Decimal("100"))


class BundleDiscountStrategy(DiscountStrategy):
    """Discount when buying specific product combinations."""

    def __init__(
        self,
        required_categories: List[str],
        percent: Decimal,
        bundle_name: str = "Bundle Deal"
    ):
        self._required_categories = set(required_categories)
        self._percent = percent
        self._bundle_name = bundle_name

    @property
    def name(self) -> str:
        return self._bundle_name

    def is_applicable(self, context: Dict[str, Any]) -> bool:
        cart_categories = set(context.get("cart_categories", []))
        return self._required_categories.issubset(cart_categories)

    def calculate_discount(self, subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
        return subtotal * (self._percent / Decimal("100"))


# Strategy Selector - Best discount wins
class BestDiscountSelector:
    """Selects the strategy that gives the customer the best deal."""

    def __init__(self):
        self._strategies: List[DiscountStrategy] = []

    def register(self, strategy: DiscountStrategy) -> 'BestDiscountSelector':
        self._strategies.append(strategy)
        return self

    def select_best(
        self,
        subtotal: Decimal,
        context: Dict[str, Any]
    ) -> DiscountStrategy:
        """Find the strategy that provides the maximum discount."""
        context["subtotal"] = subtotal
        best_strategy = NoDiscountStrategy()
        best_discount = Decimal("0")

        for strategy in self._strategies:
            if strategy.is_applicable(context):
                discount = strategy.calculate_discount(subtotal, context)
                if discount > best_discount:
                    best_discount = discount
                    best_strategy = strategy

        return best_strategy


@dataclass
class CartItem:
    name: str
    price: Decimal
    quantity: int
    category: str

    @property
    def total(self) -> Decimal:
        return self.price * self.quantity


class ShoppingCart:
    """Context class that uses discount strategies."""

    def __init__(self, discount_selector: Optional[BestDiscountSelector] = None):
        self._items: List[CartItem] = []
        self._discount_strategy: DiscountStrategy = NoDiscountStrategy()
        self._discount_selector = discount_selector
        self._customer_context: Dict[str, Any] = {}

    def add_item(self, item: CartItem) -> None:
        self._items.append(item)

    def set_customer_context(self, **kwargs) -> None:
        """Set customer-specific context for discount calculation."""
        self._customer_context.update(kwargs)

    def set_strategy(self, strategy: DiscountStrategy) -> None:
        """Manually set a discount strategy."""
        self._discount_strategy = strategy

    def auto_select_best_discount(self) -> None:
        """Automatically select the best discount strategy."""
        if self._discount_selector:
            context = self._build_context()
            self._discount_strategy = self._discount_selector.select_best(
                self.subtotal, context
            )

    def _build_context(self) -> Dict[str, Any]:
        return {
            **self._customer_context,
            "subtotal": self.subtotal,
            "item_count": sum(item.quantity for item in self._items),
            "cart_categories": list(set(item.category for item in self._items)),
            "current_date": date.today(),
        }

    @property
    def subtotal(self) -> Decimal:
        return sum(item.total for item in self._items)

    @property
    def discount(self) -> Decimal:
        context = self._build_context()
        if self._discount_strategy.is_applicable(context):
            return self._discount_strategy.calculate_discount(self.subtotal, context)
        return Decimal("0")

    @property
    def total(self) -> Decimal:
        return self.subtotal - self.discount

    def print_receipt(self) -> None:
        print("\n" + "=" * 50)
        print("RECEIPT")
        print("=" * 50)

        for item in self._items:
            print(f"{item.name} x{item.quantity}: ${item.total:.2f}")

        print("-" * 50)
        print(f"Subtotal: ${self.subtotal:.2f}")

        if self.discount > 0:
            desc = self._discount_strategy.get_description(self.discount)
            print(f"{desc}")

        print("-" * 50)
        print(f"TOTAL: ${self.total:.2f}")
        print("=" * 50)


# Usage demonstration
def main():
    # Set up discount selector with all available strategies
    selector = BestDiscountSelector()
    selector.register(TieredDiscountStrategy([
        {"min_amount": 0, "max_amount": 50, "percent": 0},
        {"min_amount": 50, "max_amount": 100, "percent": 5},
        {"min_amount": 100, "max_amount": 200, "percent": 10},
        {"min_amount": 200, "max_amount": None, "percent": 15},
    ]))
    selector.register(LoyaltyDiscountStrategy())
    selector.register(FirstPurchaseDiscountStrategy(Decimal("20")))
    selector.register(SeasonalDiscountStrategy(
        percent=Decimal("25"),
        start_date=date(2024, 11, 25),
        end_date=date(2024, 12, 2),
        campaign_name="Black Friday"
    ))
    selector.register(BundleDiscountStrategy(
        required_categories=["electronics", "accessories"],
        percent=Decimal("12"),
        bundle_name="Tech Bundle Deal"
    ))

    # Example 1: Regular customer, small order
    print("\n" + "=" * 60)
    print("EXAMPLE 1: Regular Customer, Small Order")
    print("=" * 60)

    cart1 = ShoppingCart(selector)
    cart1.add_item(CartItem("Book", Decimal("15.99"), 1, "books"))
    cart1.add_item(CartItem("Pen Set", Decimal("8.99"), 2, "stationery"))
    cart1.auto_select_best_discount()
    cart1.print_receipt()

    # Example 2: Gold loyalty member
    print("\n" + "=" * 60)
    print("EXAMPLE 2: Gold Loyalty Member")
    print("=" * 60)

    cart2 = ShoppingCart(selector)
    cart2.add_item(CartItem("Headphones", Decimal("79.99"), 1, "electronics"))
    cart2.add_item(CartItem("Phone Case", Decimal("29.99"), 1, "accessories"))
    cart2.set_customer_context(loyalty_tier="gold")
    cart2.auto_select_best_discount()
    cart2.print_receipt()

    # Example 3: First-time customer
    print("\n" + "=" * 60)
    print("EXAMPLE 3: First-Time Customer")
    print("=" * 60)

    cart3 = ShoppingCart(selector)
    cart3.add_item(CartItem("Laptop Stand", Decimal("45.00"), 1, "electronics"))
    cart3.add_item(CartItem("Webcam", Decimal("65.00"), 1, "electronics"))
    cart3.set_customer_context(is_first_purchase=True)
    cart3.auto_select_best_discount()
    cart3.print_receipt()

    # Example 4: Manual strategy override
    print("\n" + "=" * 60)
    print("EXAMPLE 4: Manual Promo Code")
    print("=" * 60)

    cart4 = ShoppingCart()
    cart4.add_item(CartItem("Gaming Mouse", Decimal("59.99"), 1, "electronics"))
    cart4.set_strategy(PercentageDiscountStrategy(Decimal("30"), "SUMMER30"))
    cart4.print_receipt()


if __name__ == "__main__":
    main()
```

---

## Strategy Composition Patterns

### Composite Strategy - Stack Multiple Discounts

```python
class CompositeDiscountStrategy(DiscountStrategy):
    """Combines multiple strategies (discounts stack)."""

    def __init__(self, strategies: List[DiscountStrategy], name: str = "Combined Discounts"):
        self._strategies = strategies
        self._name = name

    @property
    def name(self) -> str:
        return self._name

    def calculate_discount(self, subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
        total_discount = Decimal("0")
        remaining = subtotal

        for strategy in self._strategies:
            if strategy.is_applicable(context):
                discount = strategy.calculate_discount(remaining, context)
                total_discount += discount
                remaining -= discount  # Each subsequent discount on reduced amount

        return total_discount


# Stack loyalty + seasonal discount
stacked = CompositeDiscountStrategy([
    LoyaltyDiscountStrategy(),
    SeasonalDiscountStrategy(Decimal("10"), date.today(), date.today())
])
```

### Decorator Strategy - Add Cross-Cutting Concerns

```python
class LoggingStrategyDecorator(DiscountStrategy):
    """Adds logging to any strategy."""

    def __init__(self, wrapped: DiscountStrategy, logger):
        self._wrapped = wrapped
        self._logger = logger

    @property
    def name(self) -> str:
        return self._wrapped.name

    def calculate_discount(self, subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
        discount = self._wrapped.calculate_discount(subtotal, context)
        self._logger.info(f"Strategy {self.name}: {subtotal} -> discount {discount}")
        return discount

    def is_applicable(self, context: Dict[str, Any]) -> bool:
        return self._wrapped.is_applicable(context)


class CappedDiscountDecorator(DiscountStrategy):
    """Caps the maximum discount amount."""

    def __init__(self, wrapped: DiscountStrategy, max_discount: Decimal):
        self._wrapped = wrapped
        self._max_discount = max_discount

    @property
    def name(self) -> str:
        return f"{self._wrapped.name} (max ${self._max_discount})"

    def calculate_discount(self, subtotal: Decimal, context: Dict[str, Any]) -> Decimal:
        discount = self._wrapped.calculate_discount(subtotal, context)
        return min(discount, self._max_discount)
```

---

## Interview Questions

### Basic Level

**Q: What is the Strategy pattern and when would you use it?**
A: Strategy encapsulates a family of algorithms in separate classes, making them interchangeable. Use it when you have multiple ways to do something and want to select the approach at runtime without modifying client code.

**Q: What are the main components of Strategy pattern?**
A: Context (uses a strategy), Strategy interface (defines the algorithm contract), Concrete Strategies (implement specific algorithms). The context delegates work to the current strategy.

### Intermediate Level

**Q: How do you choose between Strategy and Template Method?**
A: Use Strategy when algorithms are completely different and interchangeable (composition). Use Template Method when algorithms share structure but differ in specific steps (inheritance). Strategy is more flexible; Template Method ensures structure consistency.

**Q: How would you implement A/B testing with Strategy pattern?**
A: Create an ABTestStrategy that wraps two strategies and routes to one based on user cohort:
```python
class ABTestStrategy(DiscountStrategy):
    def __init__(self, control: Strategy, variant: Strategy, variant_percent: int):
        self._control = control
        self._variant = variant
        self._variant_pct = variant_percent

    def calculate_discount(self, subtotal, context):
        user_bucket = hash(context["user_id"]) % 100
        strategy = self._variant if user_bucket < self._variant_pct else self._control
        return strategy.calculate_discount(subtotal, context)
```

### Advanced Level

**Q: How do you handle strategy selection from a database or config file?**
A: Use Factory pattern with Strategy. Store strategy type and parameters in DB, then reconstruct:
```python
def from_config(config: dict) -> DiscountStrategy:
    strategy_type = config["type"]
    if strategy_type == "percentage":
        return PercentageDiscountStrategy(Decimal(config["percent"]))
    elif strategy_type == "tiered":
        return TieredDiscountStrategy(config["tiers"])
    # ... more types
```

**Q: What are the performance implications of Strategy pattern?**
A: Virtual dispatch (interface calls) adds slight overhead. For hot paths called millions of times, consider inlining or caching strategy selection. However, premature optimization is rarely warranted - the flexibility usually outweighs the microseconds.

**Q: How do you version strategies for backward compatibility?**
A: Include version in strategy metadata. Maintain a registry mapping version to implementation. Old calculations can use old strategy versions while new ones use updated logic.

---

## Common Mistakes

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #fecaca;">
  <div style="color: #991b1b; font-weight: 700; margin-bottom: 1rem;">Common Implementation Mistakes</div>

  <div style="margin-bottom: 1rem;">
    <div style="font-weight: 600; color: #991b1b;">1. Strategy knowing about Context internals</div>
    <div style="color: #7f1d1d; font-size: 0.9rem;">Strategies should receive only what they need via parameters, not reach into Context.</div>
  </div>

  <div style="margin-bottom: 1rem;">
    <div style="font-weight: 600; color: #991b1b;">2. Too many strategies (class explosion)</div>
    <div style="color: #7f1d1d; font-size: 0.9rem;">Parameterize strategies instead of creating Discount5Strategy, Discount10Strategy, etc.</div>
  </div>

  <div style="margin-bottom: 1rem;">
    <div style="font-weight: 600; color: #991b1b;">3. Selection logic in wrong place</div>
    <div style="color: #7f1d1d; font-size: 0.9rem;">Don't put complex if/else for strategy selection in client code. Use a selector/factory.</div>
  </div>

  <div>
    <div style="font-weight: 600; color: #991b1b;">4. Stateful strategies</div>
    <div style="color: #7f1d1d; font-size: 0.9rem;">Strategies should typically be stateless. If state is needed, pass it via context or make it explicit.</div>
  </div>
</div>

---

## Best Practices

1. **Keep strategies focused** - One algorithm per strategy, single responsibility
2. **Use dependency injection** - Pass strategies to Context via constructor or setter
3. **Parameterize over proliferate** - Use constructor parameters instead of many subclasses
4. **Consider null object** - NoOpStrategy instead of null checks
5. **Document selection criteria** - When is each strategy appropriate?
6. **Make strategies immutable** - Stateless strategies can be shared safely
7. **Use descriptive names** - FastestRouteStrategy beats StrategyA

---

## Related Patterns

- **[State](/topic/design-patterns/state)** - Object changes behavior based on internal state
- **[Template Method](/topic/design-patterns/template-method)** - Algorithm skeleton with customizable steps
- **[Factory Method](/topic/design-patterns/factory-method)** - Create strategies dynamically
- **[Decorator](/topic/design-patterns/decorator)** - Add behavior to strategies
- **[Command](/topic/design-patterns/command)** - Encapsulate requests as objects
