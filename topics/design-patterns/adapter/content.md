# Adapter Pattern

## Overview

The Adapter pattern converts the interface of a class into another interface that clients expect, enabling classes with incompatible interfaces to collaborate. <span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px; font-weight: 500;">Unlike simple interface wrapping, a true adapter performs semantic translation between fundamentally different interface paradigms while preserving behavioral equivalence.</span>

**Difficulty:** Intermediate-Advanced
**Category:** Structural Pattern
**First Documented:** GoF (1994)
**Also Known As:** Wrapper Pattern

---

## Foundational Mental Model

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h3 style="color: #1e293b; margin-top: 0; font-size: 1.3rem;">The Diplomatic Translator Analogy</h3>

<p style="color: #334155; font-size: 1rem; line-height: 1.7;">
Consider a diplomatic summit between nations speaking different languages. A translator does more than word-for-word conversion - they understand cultural nuances, idiomatic expressions, and contextual meaning. They ensure the <em>intent</em> is preserved, not just the words.
</p>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 20px 0;">
<div style="background: #dbeafe; padding: 16px; border-radius: 12px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700;">Client (Diplomat A)</div>
<div style="color: #1e3a8a; font-size: 0.9rem;">Speaks Language A, expects responses in Language A semantics</div>
</div>
<div style="background: #dcfce7; padding: 16px; border-radius: 12px; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: 700;">Adapter (Translator)</div>
<div style="color: #14532d; font-size: 0.9rem;">Converts not just words but meaning, idioms, and cultural context</div>
</div>
<div style="background: #fef3c7; padding: 16px; border-radius: 12px; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: 700;">Adaptee (Diplomat B)</div>
<div style="color: #78350f; font-size: 0.9rem;">Speaks Language B with different conceptual framework</div>
</div>
</div>

<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 16px;">
<strong style="color: #0f172a;">Critical Insight:</strong>
<span style="color: #334155;"> <span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px;">The adapter must understand both interfaces deeply enough to preserve semantic equivalence, not just syntactic compatibility.</span> A charge() call must produce the same business outcome whether routed through Stripe or PayPal, despite their radically different APIs.</span>
</div>
</div>

---

## Internal Architecture: How Adapters Actually Work

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h4 style="color: #1e293b; margin-top: 0; text-align: center; font-size: 1.1rem;">Adapter Pattern Internal Flow</h4>

<div style="display: flex; flex-direction: column; gap: 20px; margin: 24px 0;">

<div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; padding: 16px; min-width: 150px; text-align: center;">
<div style="color: #1e40af; font-weight: 700; font-size: 0.9rem;">Client Code</div>
<div style="color: #1e3a8a; font-size: 0.75rem; margin-top: 4px;">PaymentService</div>
</div>
<div style="color: #64748b; font-size: 1.2rem;">---(1) charge()---></div>
<div style="background: #f3e8ff; border: 2px solid #a855f7; border-radius: 12px; padding: 16px; min-width: 150px; text-align: center;">
<div style="color: #7c3aed; font-weight: 700; font-size: 0.9rem;">Target Interface</div>
<div style="color: #6b21a8; font-size: 0.75rem; margin-top: 4px;">PaymentGateway</div>
</div>
</div>

<div style="display: flex; align-items: center; justify-content: center;">
<div style="color: #a855f7; font-size: 0.9rem;">implements</div>
</div>

<div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; padding: 16px; min-width: 200px;">
<div style="color: #166534; font-weight: 700; text-align: center; font-size: 0.9rem;">Adapter</div>
<div style="color: #14532d; font-size: 0.75rem; padding: 8px; background: #f0fdf4; border-radius: 6px; margin-top: 8px;">
<strong>(2) Transform Request:</strong><br/>
- Convert Decimal to cents<br/>
- Map currency codes<br/>
- Restructure parameters
</div>
</div>
<div style="color: #64748b; font-size: 1.2rem;">---(3)---></div>
<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 16px; min-width: 180px; text-align: center;">
<div style="color: #92400e; font-weight: 700; font-size: 0.9rem;">Adaptee</div>
<div style="color: #78350f; font-size: 0.75rem; margin-top: 4px;">StripeClient.create_charge()</div>
</div>
</div>

<div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; padding: 16px; min-width: 200px;">
<div style="color: #14532d; font-size: 0.75rem; padding: 8px; background: #f0fdf4; border-radius: 6px;">
<strong>(5) Transform Response:</strong><br/>
- Convert cents to Decimal<br/>
- Normalize status codes<br/>
- Build PaymentResult
</div>
</div>
<div style="color: #64748b; font-size: 1.2rem;"><---(4)---</div>
<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 16px; min-width: 180px; text-align: center;">
<div style="color: #78350f; font-size: 0.75rem;">Raw Stripe Response</div>
</div>
</div>

</div>

<div style="background: #fef2f2; padding: 16px; border-radius: 8px; margin-top: 16px; border-left: 4px solid #ef4444;">
<strong style="color: #991b1b;">Critical Implementation Detail:</strong>
<span style="color: #7f1d1d;"> <span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px;">The adapter must handle bidirectional transformation - both request adaptation (client to adaptee) and response adaptation (adaptee to client).</span> Many implementations focus only on request transformation and break when adaptee responses differ from expected formats.</span>
</div>
</div>

### Interview Deep-Dive: Internal Mechanisms

<details style="margin-bottom: 12px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 16px;">Level 1: What are the core responsibilities of an adapter's transformation layer?</summary>
<div style="padding: 0 16px 16px 16px; color: #334155;">

The transformation layer handles four critical responsibilities:

**1. Type Conversion**: Converting between incompatible data types
```python
# Decimal dollars -> Integer cents
amount_cents = int(decimal_amount * 100)
```

**2. Structure Mapping**: Reorganizing data structures
```python
# Flat params -> Nested PayPal structure
purchase_units = [{"amount": {"value": str(amount), "currency_code": currency}}]
```

**3. Protocol Translation**: Converting between different interaction patterns
```python
# Single-call charge -> Two-phase PayPal flow
order = client.create_order(...)
capture = client.capture_order(order["id"])
```

**4. Error Normalization**: Converting provider-specific errors to unified format
```python
# Stripe error -> Unified PaymentError
if stripe_response.get("error"):
    raise PaymentError(code=map_error_code(stripe_response["error"]["code"]))
```

<details style="margin-top: 16px; background: #f1f5f9; border-radius: 6px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 12px;">Level 2: How do you handle lossy transformations where the adaptee has less capability than the target interface promises?</summary>
<div style="padding: 0 12px 12px 12px; color: #334155;">

This is a critical design challenge. <span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px;">Lossy adaptation occurs when the target interface contracts cannot be fully satisfied by the adaptee's capabilities.</span>

**Strategy 1: Capability Detection**
```python
class PaymentAdapter(PaymentGateway):
    def supports_partial_refund(self) -> bool:
        """Let clients query capabilities before attempting operations."""
        return self._adaptee_supports_partial_refund

    def refund(self, transaction_id: str, amount: Optional[Decimal] = None):
        if amount and not self.supports_partial_refund():
            raise UnsupportedOperationError("Partial refunds not supported")
        # ... proceed with refund
```

**Strategy 2: Best-Effort Emulation**
```python
def get_transaction_history(self, days: int) -> List[Transaction]:
    """Target promises date-range filtering, adaptee only returns last 100."""
    all_txns = self._adaptee.list_transactions(limit=100)
    cutoff = datetime.now() - timedelta(days=days)
    return [t for t in all_txns if t.created_at >= cutoff]  # Client-side filter
```

**Strategy 3: Fail-Fast with Clear Errors**
```python
def capture_authorization(self, auth_id: str):
    """Adaptee doesn't support auth/capture separation."""
    raise AdapterLimitationError(
        "This payment provider does not support separate authorization and capture. "
        "Use charge() for immediate payment."
    )
```

<details style="margin-top: 12px; background: #e2e8f0; border-radius: 6px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 12px;">Level 3: What are the implications for Liskov Substitution Principle when adapters cannot fully implement the target interface?</summary>
<div style="padding: 0 12px 12px 12px; color: #334155;">

<span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px;">This is where adapter pattern can technically violate LSP - if clients cannot substitute adapted implementations without behavioral changes.</span>

**The LSP Violation Pattern:**
```python
# Client code assumes all PaymentGateway implementations support refunds
def process_return(gateway: PaymentGateway, txn_id: str):
    gateway.refund(txn_id)  # Throws UnsupportedOperationError for some adapters!
```

**Architectural Solutions:**

**1. Interface Segregation (Preferred)**
```python
class Chargeable(ABC):
    @abstractmethod
    def charge(self, amount: Decimal) -> PaymentResult: pass

class Refundable(ABC):
    @abstractmethod
    def refund(self, txn_id: str) -> PaymentResult: pass

# Adapters implement only interfaces they can fulfill
class BitcoinAdapter(Chargeable):  # Not Refundable
    def charge(self, amount): ...
```

**2. Capability Interfaces**
```python
class PaymentGateway(ABC):
    @abstractmethod
    def get_capabilities(self) -> Set[PaymentCapability]:
        """Return set of supported capabilities."""
        pass

# Client code checks before calling
if PaymentCapability.PARTIAL_REFUND in gateway.get_capabilities():
    gateway.refund(txn_id, partial_amount)
```

**3. Null Object for Unsupported Operations**
```python
def refund(self, txn_id: str) -> PaymentResult:
    """Return a 'no-op' result rather than throwing."""
    return PaymentResult(
        success=False,
        error_code="UNSUPPORTED",
        message="Refunds not supported by this provider"
    )
```

The trade-off: <span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px;">Interface segregation provides compile-time safety but fragments the interface hierarchy. Capability checking provides runtime flexibility but shifts error handling to callers.</span>
</div>
</details>

</div>
</details>

</div>
</details>

---

## Class Adapter vs Object Adapter: Deep Comparison

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px;">

<div style="background: #dbeafe; padding: 24px; border-radius: 12px; border-top: 4px solid #3b82f6;">
<h4 style="color: #1e40af; margin-top: 0;">Object Adapter (Composition)</h4>
<p style="color: #1e3a8a; font-size: 0.9rem; margin-bottom: 16px;"><span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px;">The adapter HOLDS a reference to the adaptee and delegates calls to it.</span></p>

<pre style="background: #eff6ff; padding: 16px; border-radius: 8px; font-size: 0.8rem; overflow-x: auto;"><code style="color: #1e3a8a;">class StripeAdapter(PaymentGateway):
    """Object Adapter - uses composition."""

    def __init__(self, stripe_client: StripeClient):
        self._client = stripe_client  # Holds reference

    def charge(self, amount: Decimal, currency: str,
               token: str) -> PaymentResult:
        # Delegates to composed object
        response = self._client.create_charge(
            amount_cents=int(amount * 100),
            currency=currency,
            source=token
        )
        return self._transform_response(response)</code></pre>

<div style="margin-top: 16px;">
<div style="color: #166534; font-size: 0.85rem; margin-bottom: 8px;"><strong>Advantages:</strong></div>
<ul style="color: #1e3a8a; font-size: 0.85rem; margin: 0; padding-left: 20px;">
<li>Works with adaptee and ALL its subclasses</li>
<li>Adaptee can be injected (testability)</li>
<li>Adapter can wrap multiple adaptees</li>
<li>Runtime flexibility to swap adaptees</li>
<li>Works in languages without multiple inheritance</li>
</ul>
</div>

<div style="margin-top: 12px;">
<div style="color: #b91c1c; font-size: 0.85rem; margin-bottom: 8px;"><strong>Disadvantages:</strong></div>
<ul style="color: #1e3a8a; font-size: 0.85rem; margin: 0; padding-left: 20px;">
<li>Extra object allocation and indirection</li>
<li>Must delegate all adaptee method calls explicitly</li>
<li>Cannot override adaptee behavior directly</li>
</ul>
</div>
</div>

<div style="background: #dcfce7; padding: 24px; border-radius: 12px; border-top: 4px solid #22c55e;">
<h4 style="color: #166534; margin-top: 0;">Class Adapter (Inheritance)</h4>
<p style="color: #14532d; font-size: 0.9rem; margin-bottom: 16px;"><span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px;">The adapter INHERITS from both the target interface and the adaptee class.</span></p>

<pre style="background: #f0fdf4; padding: 16px; border-radius: 8px; font-size: 0.8rem; overflow-x: auto;"><code style="color: #166534;">class StripeAdapter(PaymentGateway, StripeClient):
    """Class Adapter - uses multiple inheritance."""

    def __init__(self, api_key: str):
        StripeClient.__init__(self, api_key)  # IS-A StripeClient

    def charge(self, amount: Decimal, currency: str,
               token: str) -> PaymentResult:
        # Direct access to inherited methods
        response = self.create_charge(  # No delegation!
            amount_cents=int(amount * 100),
            currency=currency,
            source=token
        )
        return self._transform_response(response)</code></pre>

<div style="margin-top: 16px;">
<div style="color: #166534; font-size: 0.85rem; margin-bottom: 8px;"><strong>Advantages:</strong></div>
<ul style="color: #14532d; font-size: 0.85rem; margin: 0; padding-left: 20px;">
<li>No extra object - direct method access</li>
<li>Can override adaptee behavior</li>
<li>Slightly better performance (no delegation)</li>
<li>Adapter IS-A adaptee (can be used where adaptee expected)</li>
</ul>
</div>

<div style="margin-top: 12px;">
<div style="color: #b91c1c; font-size: 0.85rem; margin-bottom: 8px;"><strong>Disadvantages:</strong></div>
<ul style="color: #14532d; font-size: 0.85rem; margin: 0; padding-left: 20px;">
<li>Requires multiple inheritance (not all languages)</li>
<li>Tied to ONE specific adaptee class</li>
<li>Cannot adapt adaptee subclasses</li>
<li>Diamond problem risks with method resolution</li>
<li>Tight coupling - harder to test</li>
</ul>
</div>
</div>

</div>

<div style="background: #fef3c7; padding: 20px; border-radius: 12px; margin-top: 20px; border-left: 4px solid #f59e0b;">
<strong style="color: #92400e;">When to Choose Which:</strong>
<div style="color: #78350f; margin-top: 8px;">
<p><strong>Use Object Adapter (95% of cases) when:</strong></p>
<ul style="margin: 8px 0; padding-left: 20px;">
<li>You need to adapt multiple related classes (inheritance hierarchies)</li>
<li>You want dependency injection for testing</li>
<li>Your language doesn't support multiple inheritance (Java, C#)</li>
<li>You might need to swap adaptees at runtime</li>
</ul>

<p><strong>Use Class Adapter when:</strong></p>
<ul style="margin: 8px 0; padding-left: 20px;">
<li>You need to override specific adaptee methods</li>
<li>Performance is critical and delegation overhead matters</li>
<li>You're in C++ or Python and comfortable with multiple inheritance</li>
<li>The adaptee is a final/sealed class you need to extend</li>
</ul>
</div>
</div>
</div>

### Interview Deep-Dive: Class vs Object Adapter

<details style="margin-bottom: 12px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 16px;">Level 1: Why is object adapter preferred in Java and C# but class adapter is valid in Python and C++?</summary>
<div style="padding: 0 16px 16px 16px; color: #334155;">

The key difference is **multiple inheritance support**:

**Java/C# Limitation:**
```java
// IMPOSSIBLE in Java - classes can only extend ONE class
class StripeAdapter extends PaymentGateway, StripeClient { } // Compilation error!

// Java workaround: Object adapter with interface
class StripeAdapter implements PaymentGateway {
    private StripeClient client;  // Composition
}
```

**Python/C++ - Multiple Inheritance Works:**
```python
# Python supports multiple inheritance
class StripeAdapter(PaymentGateway, StripeClient):
    def __init__(self, api_key: str):
        StripeClient.__init__(self, api_key)

    def charge(self, amount: Decimal, currency: str, token: str):
        return self.create_charge(...)  # Direct access via inheritance
```

**Python's MRO (Method Resolution Order):**
```python
# Python uses C3 linearization to resolve method conflicts
print(StripeAdapter.__mro__)
# (<class 'StripeAdapter'>, <class 'PaymentGateway'>, <class 'StripeClient'>, ...)
```

<details style="margin-top: 16px; background: #f1f5f9; border-radius: 6px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 12px;">Level 2: How does Python's MRO affect class adapter behavior, especially with diamond inheritance?</summary>
<div style="padding: 0 12px 12px 12px; color: #334155;">

<span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px;">Python's C3 linearization creates a deterministic but sometimes surprising method resolution order.</span>

```python
class Base:
    def operation(self):
        return "Base"

class Target(Base):
    def operation(self):
        return "Target"

class Adaptee(Base):
    def operation(self):
        return "Adaptee"

class Adapter(Target, Adaptee):
    pass

adapter = Adapter()
print(adapter.operation())  # "Target" - leftmost parent wins
print(Adapter.__mro__)
# (Adapter, Target, Adaptee, Base, object)
```

**The Diamond Problem Manifestation:**
```python
class PaymentInterface:
    def process(self):
        return "Interface default"

class ModernGateway(PaymentInterface):
    def process(self):
        return "Modern processing"

class LegacySystem(PaymentInterface):
    def process(self):
        return "Legacy processing"

class BridgeAdapter(ModernGateway, LegacySystem):
    """Which process() is called?"""
    pass

# MRO: BridgeAdapter -> ModernGateway -> LegacySystem -> PaymentInterface
BridgeAdapter().process()  # "Modern processing"
```

**Explicit Resolution:**
```python
class BridgeAdapter(ModernGateway, LegacySystem):
    def process(self):
        # Explicitly choose which parent's implementation
        legacy_result = LegacySystem.process(self)
        return f"Adapted from: {legacy_result}"
```

<details style="margin-top: 12px; background: #e2e8f0; border-radius: 6px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 12px;">Level 3: What are the memory and performance implications of class vs object adapter at scale?</summary>
<div style="padding: 0 12px 12px 12px; color: #334155;">

**Memory Footprint:**

```python
import sys

class Adaptee:
    def __init__(self):
        self.data = "adaptee_data"

class ObjectAdapter:
    def __init__(self, adaptee):
        self._adaptee = adaptee  # Reference to separate object

class ClassAdapter(Adaptee):
    pass  # Inherits adaptee's attributes directly

# Memory comparison
adaptee = Adaptee()
obj_adapter = ObjectAdapter(adaptee)
class_adapter = ClassAdapter()

# Object adapter: Two objects in memory
print(sys.getsizeof(adaptee) + sys.getsizeof(obj_adapter))  # ~100 bytes

# Class adapter: Single object
print(sys.getsizeof(class_adapter))  # ~56 bytes
```

**Performance Implications:**

```python
import timeit

class Adaptee:
    def heavy_operation(self):
        return sum(range(1000))

class ObjectAdapter:
    def __init__(self, adaptee):
        self._adaptee = adaptee

    def operation(self):
        return self._adaptee.heavy_operation()  # Delegation cost

class ClassAdapter(Adaptee):
    def operation(self):
        return self.heavy_operation()  # Direct call

# Benchmark (10 million calls)
obj_adapter = ObjectAdapter(Adaptee())
class_adapter = ClassAdapter()

# Object adapter: ~2.1 seconds (attribute lookup + delegation)
# Class adapter: ~1.9 seconds (direct method resolution)
# Difference: ~10% overhead from delegation
```

<span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px;">In practice, this overhead is negligible unless you're in a hot loop with millions of calls per second.</span> The flexibility benefits of object adapter almost always outweigh the minor performance cost.

**Real-World Trade-off Analysis:**

| Factor | Object Adapter | Class Adapter |
|--------|---------------|---------------|
| Memory per instance | +40-60 bytes | Baseline |
| Method call overhead | ~10% slower | Baseline |
| Testability | Excellent (DI) | Poor (tight coupling) |
| Flexibility | High | Low |
| Maintainability | Better | Worse |

<span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px;">The recommendation: Use object adapter unless profiling proves delegation overhead is a bottleneck in your specific use case.</span>

</div>
</details>

</div>
</details>

</div>
</details>

---

## Two-Way Adapters: Bidirectional Interface Translation

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h3 style="color: #1e293b; margin-top: 0; font-size: 1.2rem;">Understanding Two-Way Adapters</h3>

<p style="color: #334155; font-size: 1rem; line-height: 1.7;">
<span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px;">A two-way adapter implements BOTH interfaces, allowing either system to use the other transparently.</span> This is essential when two systems need mutual interoperability, not just one-way communication.
</p>

<div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; margin: 24px 0;">
<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; padding: 16px; min-width: 140px; text-align: center;">
<div style="color: #1e40af; font-weight: 700; font-size: 0.9rem;">System A</div>
<div style="color: #1e3a8a; font-size: 0.75rem;">Interface A methods</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="color: #64748b; font-size: 0.9rem;">---> calls A interface ---></div>
<div style="color: #64748b; font-size: 0.9rem;"><--- calls B interface <---</div>
</div>
<div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; padding: 16px; min-width: 180px; text-align: center;">
<div style="color: #166534; font-weight: 700; font-size: 0.9rem;">Two-Way Adapter</div>
<div style="color: #14532d; font-size: 0.75rem;">Implements BOTH A and B</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="color: #64748b; font-size: 0.9rem;">---> delegates to B ---></div>
<div style="color: #64748b; font-size: 0.9rem;"><--- delegates to A <---</div>
</div>
<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 16px; min-width: 140px; text-align: center;">
<div style="color: #92400e; font-weight: 700; font-size: 0.9rem;">System B</div>
<div style="color: #78350f; font-size: 0.75rem;">Interface B methods</div>
</div>
</div>
</div>

### Two-Way Adapter Implementation

```python
from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from dataclasses import dataclass
from enum import Enum

# =============================================================================
# TWO INCOMPATIBLE NOTIFICATION SYSTEMS
# =============================================================================

# System A: Event-based notification system (push model)
class EventType(Enum):
    USER_CREATED = "user_created"
    ORDER_PLACED = "order_placed"
    PAYMENT_RECEIVED = "payment_received"

@dataclass
class Event:
    event_type: EventType
    payload: Dict[str, Any]
    timestamp: float
    source: str

class EventPublisher(ABC):
    """System A's interface - push-based events."""

    @abstractmethod
    def publish(self, event: Event) -> bool:
        """Publish an event to subscribers."""
        pass

    @abstractmethod
    def subscribe(self, event_type: EventType, callback) -> str:
        """Subscribe to events of a specific type."""
        pass

# System B: Message queue system (pull model)
@dataclass
class Message:
    topic: str
    body: str
    headers: Dict[str, str]
    message_id: str

class MessageQueue(ABC):
    """System B's interface - pull-based message queue."""

    @abstractmethod
    def send(self, topic: str, message: Message) -> str:
        """Send message to a topic."""
        pass

    @abstractmethod
    def receive(self, topic: str, timeout: float = 5.0) -> Optional[Message]:
        """Receive message from a topic (blocking)."""
        pass

    @abstractmethod
    def acknowledge(self, message_id: str) -> bool:
        """Acknowledge message processing."""
        pass


# =============================================================================
# TWO-WAY ADAPTER
# =============================================================================

class EventMessageAdapter(EventPublisher, MessageQueue):
    """
    Two-way adapter that bridges event system and message queue.

    - Systems using EventPublisher can publish events that appear as messages
    - Systems using MessageQueue can send messages that appear as events
    """

    def __init__(self, event_system: EventPublisher, message_queue: MessageQueue):
        self._event_system = event_system
        self._message_queue = message_queue
        self._subscription_map: Dict[str, EventType] = {}
        self._pending_messages: Dict[str, Event] = {}

    # =========================================================================
    # EventPublisher interface -> MessageQueue delegation
    # =========================================================================

    def publish(self, event: Event) -> bool:
        """
        Publish an event by converting it to a message and sending to queue.

        Event System clients call this, it goes to Message Queue.
        """
        # Transform Event -> Message
        message = Message(
            topic=self._event_type_to_topic(event.event_type),
            body=self._serialize_payload(event.payload),
            headers={
                "X-Event-Type": event.event_type.value,
                "X-Event-Source": event.source,
                "X-Event-Timestamp": str(event.timestamp)
            },
            message_id=f"evt_{event.timestamp}_{event.event_type.value}"
        )

        # Delegate to message queue
        result = self._message_queue.send(message.topic, message)
        return result is not None

    def subscribe(self, event_type: EventType, callback) -> str:
        """
        Subscribe to events by setting up a message consumer.

        This is where two-way gets complex - we need to poll the queue
        and convert messages back to events for the callback.
        """
        topic = self._event_type_to_topic(event_type)
        subscription_id = f"sub_{topic}_{id(callback)}"
        self._subscription_map[subscription_id] = event_type

        # In a real implementation, this would start a consumer thread
        # that polls the queue and invokes the callback
        return subscription_id

    # =========================================================================
    # MessageQueue interface -> EventPublisher delegation
    # =========================================================================

    def send(self, topic: str, message: Message) -> str:
        """
        Send a message by converting it to an event and publishing.

        Message Queue clients call this, it goes to Event System.
        """
        # Transform Message -> Event
        event = Event(
            event_type=self._topic_to_event_type(topic),
            payload=self._deserialize_body(message.body),
            timestamp=float(message.headers.get("X-Event-Timestamp", "0")),
            source=message.headers.get("X-Event-Source", "message_queue")
        )

        # Store for acknowledgment tracking
        self._pending_messages[message.message_id] = event

        # Delegate to event system
        success = self._event_system.publish(event)
        return message.message_id if success else ""

    def receive(self, topic: str, timeout: float = 5.0) -> Optional[Message]:
        """
        Receive a message by listening for events and converting.

        This requires the adapter to buffer events as messages.
        """
        # In production: set up event subscription, buffer incoming events,
        # convert to messages, return from buffer
        # Simplified for demonstration
        pass

    def acknowledge(self, message_id: str) -> bool:
        """Acknowledge message by removing from pending tracking."""
        return self._pending_messages.pop(message_id, None) is not None

    # =========================================================================
    # Transformation helpers
    # =========================================================================

    def _event_type_to_topic(self, event_type: EventType) -> str:
        """Convert EventType enum to message queue topic string."""
        return f"events.{event_type.value}"

    def _topic_to_event_type(self, topic: str) -> EventType:
        """Convert message queue topic to EventType enum."""
        event_name = topic.replace("events.", "")
        return EventType(event_name)

    def _serialize_payload(self, payload: Dict[str, Any]) -> str:
        """Serialize event payload to message body."""
        import json
        return json.dumps(payload)

    def _deserialize_body(self, body: str) -> Dict[str, Any]:
        """Deserialize message body to event payload."""
        import json
        return json.loads(body)


# =============================================================================
# USAGE: Both systems can use the adapter transparently
# =============================================================================

# Concrete implementations (simplified)
class InMemoryEventSystem(EventPublisher):
    def __init__(self):
        self._subscribers = {}

    def publish(self, event: Event) -> bool:
        callbacks = self._subscribers.get(event.event_type, [])
        for cb in callbacks:
            cb(event)
        return True

    def subscribe(self, event_type: EventType, callback) -> str:
        if event_type not in self._subscribers:
            self._subscribers[event_type] = []
        self._subscribers[event_type].append(callback)
        return f"sub_{event_type.value}"

class InMemoryMessageQueue(MessageQueue):
    def __init__(self):
        self._queues: Dict[str, list] = {}

    def send(self, topic: str, message: Message) -> str:
        if topic not in self._queues:
            self._queues[topic] = []
        self._queues[topic].append(message)
        return message.message_id

    def receive(self, topic: str, timeout: float = 5.0) -> Optional[Message]:
        if topic in self._queues and self._queues[topic]:
            return self._queues[topic].pop(0)
        return None

    def acknowledge(self, message_id: str) -> bool:
        return True


# Create the two-way adapter
event_system = InMemoryEventSystem()
message_queue = InMemoryMessageQueue()
adapter = EventMessageAdapter(event_system, message_queue)

# Event-based client can use adapter as EventPublisher
event_client_view: EventPublisher = adapter
event_client_view.publish(Event(
    event_type=EventType.ORDER_PLACED,
    payload={"order_id": "12345", "amount": 99.99},
    timestamp=1234567890.0,
    source="order_service"
))

# Message-based client can use adapter as MessageQueue
queue_client_view: MessageQueue = adapter
queue_client_view.send("events.payment_received", Message(
    topic="events.payment_received",
    body='{"payment_id": "pay_123"}',
    headers={"X-Event-Timestamp": "1234567890.0"},
    message_id="msg_001"
))
```

### Interview Deep-Dive: Two-Way Adapters

<details style="margin-bottom: 12px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 16px;">Level 1: When would you need a two-way adapter instead of a regular one-way adapter?</summary>
<div style="padding: 0 16px 16px 16px; color: #334155;">

Two-way adapters are needed when:

**1. Bidirectional Integration:** Both systems need to initiate communication
```python
# E-commerce integrating with warehouse
# - E-commerce sends orders TO warehouse
# - Warehouse sends inventory updates TO e-commerce
class EcommerceWarehouseAdapter(EcommerceAPI, WarehouseAPI):
    pass
```

**2. Protocol Bridging:** Converting between fundamentally different communication models
```python
# REST API <-> GraphQL
# - REST clients can make requests that become GraphQL queries
# - GraphQL subscriptions can be exposed as REST webhooks
```

**3. System Migration:** Gradual transition where both old and new systems must coexist
```python
# During migration from Monolith to Microservices
# - Monolith calls appear as microservice events
# - Microservice events appear as monolith method calls
```

**4. Testing/Mocking:** Creating test doubles that work from both directions
```python
# Mock that can be used by either system under test
```

<details style="margin-top: 16px; background: #f1f5f9; border-radius: 6px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 12px;">Level 2: What are the synchronization challenges in two-way adapters when both systems can initiate state changes?</summary>
<div style="padding: 0 12px 12px 12px; color: #334155;">

<span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px;">The core challenge is maintaining consistency when both sides can modify shared state.</span>

**Challenge 1: Race Conditions**
```python
# System A sends: "Update inventory to 100"
# System B sends: "Update inventory to 50"
# Which one wins? Last-write-wins can lose data.

class TwoWayInventoryAdapter:
    def __init__(self):
        self._lock = threading.Lock()
        self._version = 0

    def update_from_a(self, quantity: int, expected_version: int):
        with self._lock:
            if self._version != expected_version:
                raise ConcurrentModificationError()
            self._version += 1
            # Apply update...
```

**Challenge 2: Event Loops / Infinite Recursion**
```python
# System A publishes event
# Adapter converts to System B message
# System B's handler publishes response event
# Adapter converts back to System A event
# System A's handler publishes another event...
# INFINITE LOOP!

class SafeTwoWayAdapter:
    def __init__(self):
        self._processing = threading.local()

    def forward_a_to_b(self, event):
        if getattr(self._processing, 'active', False):
            return  # Break the cycle

        self._processing.active = True
        try:
            self._system_b.send(self._transform(event))
        finally:
            self._processing.active = False
```

**Challenge 3: Transactional Consistency**
```python
# What if System A succeeds but System B fails?
class TransactionalTwoWayAdapter:
    def bidirectional_operation(self, data):
        # Start both transactions
        a_txn = self._system_a.begin_transaction()
        b_txn = self._system_b.begin_transaction()

        try:
            a_result = self._system_a.write(data, a_txn)
            b_result = self._system_b.write(self._transform(data), b_txn)

            # Two-phase commit
            self._system_a.prepare(a_txn)
            self._system_b.prepare(b_txn)

            self._system_a.commit(a_txn)
            self._system_b.commit(b_txn)
        except Exception:
            self._system_a.rollback(a_txn)
            self._system_b.rollback(b_txn)
            raise
```

<details style="margin-top: 12px; background: #e2e8f0; border-radius: 6px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 12px;">Level 3: How would you implement idempotency in a two-way adapter to handle duplicate messages from either direction?</summary>
<div style="padding: 0 12px 12px 12px; color: #334155;">

<span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px;">Idempotency requires tracking processed messages from BOTH directions and ensuring repeated processing produces the same result.</span>

```python
from typing import Dict, Set, Optional
from dataclasses import dataclass
from datetime import datetime, timedelta
import hashlib

@dataclass
class IdempotencyRecord:
    message_hash: str
    result: Any
    processed_at: datetime
    source: str  # 'system_a' or 'system_b'

class IdempotentTwoWayAdapter(SystemAInterface, SystemBInterface):
    """
    Two-way adapter with idempotency guarantees.
    """

    def __init__(self, system_a, system_b, ttl_hours: int = 24):
        self._system_a = system_a
        self._system_b = system_b
        self._idempotency_store: Dict[str, IdempotencyRecord] = {}
        self._ttl = timedelta(hours=ttl_hours)

    def _compute_message_hash(self, message: Any, source: str) -> str:
        """
        Create unique hash for message deduplication.
        Include source to allow same content from different origins.
        """
        content = f"{source}:{self._serialize(message)}"
        return hashlib.sha256(content.encode()).hexdigest()

    def _check_idempotency(self, message_hash: str) -> Optional[Any]:
        """Return cached result if message was already processed."""
        record = self._idempotency_store.get(message_hash)
        if record and datetime.now() - record.processed_at < self._ttl:
            return record.result
        return None

    def _record_processing(self, message_hash: str, result: Any, source: str):
        """Record that we processed this message."""
        self._idempotency_store[message_hash] = IdempotencyRecord(
            message_hash=message_hash,
            result=result,
            processed_at=datetime.now(),
            source=source
        )
        self._cleanup_expired_records()

    # System A -> System B direction
    def forward_from_a(self, message_a):
        msg_hash = self._compute_message_hash(message_a, 'system_a')

        # Check if already processed
        cached = self._check_idempotency(msg_hash)
        if cached is not None:
            return cached  # Return same result as before

        # Process and record
        message_b = self._transform_a_to_b(message_a)
        result = self._system_b.receive(message_b)

        self._record_processing(msg_hash, result, 'system_a')
        return result

    # System B -> System A direction
    def forward_from_b(self, message_b):
        msg_hash = self._compute_message_hash(message_b, 'system_b')

        cached = self._check_idempotency(msg_hash)
        if cached is not None:
            return cached

        message_a = self._transform_b_to_a(message_b)
        result = self._system_a.receive(message_a)

        self._record_processing(msg_hash, result, 'system_b')
        return result

    def _cleanup_expired_records(self):
        """Remove old idempotency records to prevent unbounded growth."""
        now = datetime.now()
        expired = [
            k for k, v in self._idempotency_store.items()
            if now - v.processed_at > self._ttl
        ]
        for key in expired:
            del self._idempotency_store[key]
```

**Production Considerations:**

1. **Distributed Idempotency Store:** Use Redis or a database instead of in-memory dict for multi-instance deployments

2. **Idempotency Key Strategy:**
```python
# Option 1: Client-provided idempotency key
def forward_from_a(self, message_a, idempotency_key: str = None):
    key = idempotency_key or self._compute_message_hash(message_a, 'a')

# Option 2: Content-based + timestamp window
def _compute_message_hash(self, message, source):
    # Round timestamp to 5-minute window
    time_bucket = int(message.timestamp / 300) * 300
    return hash(f"{source}:{message.content}:{time_bucket}")
```

3. **Handling Side Effects:**
```python
# If the forwarded operation has side effects, store them too
@dataclass
class IdempotencyRecord:
    result: Any
    side_effects: List[SideEffect]  # For replay if needed
    compensation_actions: List[Action]  # For rollback if needed
```

</div>
</details>

</div>
</details>

</div>
</details>

---

## Real-World API Adapter Examples

### Example 1: Multi-Cloud Storage Adapter

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import BinaryIO, Optional, Dict, List
from datetime import datetime
import hashlib

@dataclass
class StorageObject:
    """Unified storage object representation."""
    key: str
    size: int
    last_modified: datetime
    etag: str
    content_type: str
    metadata: Dict[str, str]

@dataclass
class UploadResult:
    """Unified upload result."""
    key: str
    etag: str
    version_id: Optional[str]
    provider: str

class CloudStorageGateway(ABC):
    """
    Target interface for unified cloud storage operations.

    This abstraction allows application code to work with any cloud provider
    without modification.
    """

    @abstractmethod
    def upload(self, key: str, data: BinaryIO,
               content_type: str = "application/octet-stream",
               metadata: Dict[str, str] = None) -> UploadResult:
        """Upload object to storage."""
        pass

    @abstractmethod
    def download(self, key: str) -> BinaryIO:
        """Download object from storage."""
        pass

    @abstractmethod
    def delete(self, key: str) -> bool:
        """Delete object from storage."""
        pass

    @abstractmethod
    def list_objects(self, prefix: str = "",
                     max_keys: int = 1000) -> List[StorageObject]:
        """List objects with optional prefix filter."""
        pass

    @abstractmethod
    def get_metadata(self, key: str) -> StorageObject:
        """Get object metadata without downloading content."""
        pass


# =============================================================================
# AWS S3 ADAPTER
# =============================================================================

class S3Adapter(CloudStorageGateway):
    """
    Adapts AWS S3 SDK to CloudStorageGateway interface.

    Key adaptations:
    - S3 uses 'Bucket' + 'Key', we use just 'key' (bucket configured)
    - S3 returns boto3 response dicts, we return dataclasses
    - S3 metadata keys are lowercased, we preserve original case
    """

    def __init__(self, bucket: str, region: str = "us-east-1"):
        import boto3
        self._bucket = bucket
        self._client = boto3.client("s3", region_name=region)

    def upload(self, key: str, data: BinaryIO,
               content_type: str = "application/octet-stream",
               metadata: Dict[str, str] = None) -> UploadResult:

        # S3-specific: metadata keys must be strings, values must be strings
        s3_metadata = {str(k): str(v) for k, v in (metadata or {}).items()}

        response = self._client.put_object(
            Bucket=self._bucket,
            Key=key,
            Body=data,
            ContentType=content_type,
            Metadata=s3_metadata
        )

        return UploadResult(
            key=key,
            etag=response["ETag"].strip('"'),  # S3 includes quotes
            version_id=response.get("VersionId"),
            provider="aws_s3"
        )

    def download(self, key: str) -> BinaryIO:
        response = self._client.get_object(
            Bucket=self._bucket,
            Key=key
        )
        return response["Body"]  # StreamingBody acts like BinaryIO

    def delete(self, key: str) -> bool:
        try:
            self._client.delete_object(Bucket=self._bucket, Key=key)
            return True
        except Exception:
            return False

    def list_objects(self, prefix: str = "",
                     max_keys: int = 1000) -> List[StorageObject]:
        response = self._client.list_objects_v2(
            Bucket=self._bucket,
            Prefix=prefix,
            MaxKeys=max_keys
        )

        return [
            StorageObject(
                key=obj["Key"],
                size=obj["Size"],
                last_modified=obj["LastModified"],
                etag=obj["ETag"].strip('"'),
                content_type="",  # Not returned by list
                metadata={}
            )
            for obj in response.get("Contents", [])
        ]

    def get_metadata(self, key: str) -> StorageObject:
        response = self._client.head_object(
            Bucket=self._bucket,
            Key=key
        )

        return StorageObject(
            key=key,
            size=response["ContentLength"],
            last_modified=response["LastModified"],
            etag=response["ETag"].strip('"'),
            content_type=response.get("ContentType", ""),
            metadata=response.get("Metadata", {})
        )


# =============================================================================
# GOOGLE CLOUD STORAGE ADAPTER
# =============================================================================

class GCSAdapter(CloudStorageGateway):
    """
    Adapts Google Cloud Storage SDK to CloudStorageGateway interface.

    Key adaptations:
    - GCS uses 'Blob' objects, we use dataclasses
    - GCS metadata is case-sensitive, S3 lowercases (we preserve)
    - GCS uses 'generation' instead of 'version_id'
    """

    def __init__(self, bucket: str, project: str = None):
        from google.cloud import storage
        self._client = storage.Client(project=project)
        self._bucket = self._client.bucket(bucket)

    def upload(self, key: str, data: BinaryIO,
               content_type: str = "application/octet-stream",
               metadata: Dict[str, str] = None) -> UploadResult:

        blob = self._bucket.blob(key)
        blob.metadata = metadata
        blob.upload_from_file(data, content_type=content_type)

        return UploadResult(
            key=key,
            etag=blob.etag,
            version_id=str(blob.generation) if blob.generation else None,
            provider="google_gcs"
        )

    def download(self, key: str) -> BinaryIO:
        from io import BytesIO
        blob = self._bucket.blob(key)
        buffer = BytesIO()
        blob.download_to_file(buffer)
        buffer.seek(0)
        return buffer

    def delete(self, key: str) -> bool:
        try:
            blob = self._bucket.blob(key)
            blob.delete()
            return True
        except Exception:
            return False

    def list_objects(self, prefix: str = "",
                     max_keys: int = 1000) -> List[StorageObject]:
        blobs = self._bucket.list_blobs(prefix=prefix, max_results=max_keys)

        return [
            StorageObject(
                key=blob.name,
                size=blob.size,
                last_modified=blob.updated,
                etag=blob.etag,
                content_type=blob.content_type or "",
                metadata=blob.metadata or {}
            )
            for blob in blobs
        ]

    def get_metadata(self, key: str) -> StorageObject:
        blob = self._bucket.blob(key)
        blob.reload()  # Fetch metadata from GCS

        return StorageObject(
            key=key,
            size=blob.size,
            last_modified=blob.updated,
            etag=blob.etag,
            content_type=blob.content_type or "",
            metadata=blob.metadata or {}
        )


# =============================================================================
# AZURE BLOB STORAGE ADAPTER
# =============================================================================

class AzureBlobAdapter(CloudStorageGateway):
    """
    Adapts Azure Blob Storage SDK to CloudStorageGateway interface.

    Key adaptations:
    - Azure uses 'container' + 'blob', we use just 'key'
    - Azure uses 'BlobProperties' objects with different attribute names
    - Azure metadata has size limits (8KB total)
    """

    def __init__(self, connection_string: str, container: str):
        from azure.storage.blob import BlobServiceClient
        self._service = BlobServiceClient.from_connection_string(connection_string)
        self._container = self._service.get_container_client(container)

    def upload(self, key: str, data: BinaryIO,
               content_type: str = "application/octet-stream",
               metadata: Dict[str, str] = None) -> UploadResult:

        from azure.storage.blob import ContentSettings

        blob_client = self._container.get_blob_client(key)

        response = blob_client.upload_blob(
            data,
            content_settings=ContentSettings(content_type=content_type),
            metadata=metadata,
            overwrite=True
        )

        return UploadResult(
            key=key,
            etag=response["etag"].strip('"'),
            version_id=response.get("version_id"),
            provider="azure_blob"
        )

    def download(self, key: str) -> BinaryIO:
        blob_client = self._container.get_blob_client(key)
        stream = blob_client.download_blob()
        return stream  # Acts as BinaryIO

    def delete(self, key: str) -> bool:
        try:
            blob_client = self._container.get_blob_client(key)
            blob_client.delete_blob()
            return True
        except Exception:
            return False

    def list_objects(self, prefix: str = "",
                     max_keys: int = 1000) -> List[StorageObject]:
        blobs = self._container.list_blobs(name_starts_with=prefix)

        results = []
        for i, blob in enumerate(blobs):
            if i >= max_keys:
                break
            results.append(StorageObject(
                key=blob.name,
                size=blob.size,
                last_modified=blob.last_modified,
                etag=blob.etag.strip('"') if blob.etag else "",
                content_type=blob.content_settings.content_type or "",
                metadata=blob.metadata or {}
            ))
        return results

    def get_metadata(self, key: str) -> StorageObject:
        blob_client = self._container.get_blob_client(key)
        props = blob_client.get_blob_properties()

        return StorageObject(
            key=key,
            size=props.size,
            last_modified=props.last_modified,
            etag=props.etag.strip('"') if props.etag else "",
            content_type=props.content_settings.content_type or "",
            metadata=props.metadata or {}
        )


# =============================================================================
# STORAGE FACTORY WITH ADAPTER SELECTION
# =============================================================================

class StorageFactory:
    """
    Factory for creating cloud storage adapters.

    Enables runtime selection of storage provider without changing client code.
    """

    @staticmethod
    def create(provider: str, **config) -> CloudStorageGateway:
        adapters = {
            "s3": lambda: S3Adapter(
                bucket=config["bucket"],
                region=config.get("region", "us-east-1")
            ),
            "gcs": lambda: GCSAdapter(
                bucket=config["bucket"],
                project=config.get("project")
            ),
            "azure": lambda: AzureBlobAdapter(
                connection_string=config["connection_string"],
                container=config["container"]
            )
        }

        factory_fn = adapters.get(provider.lower())
        if not factory_fn:
            raise ValueError(f"Unsupported provider: {provider}")

        return factory_fn()


# =============================================================================
# CLIENT CODE - PROVIDER AGNOSTIC
# =============================================================================

class DocumentService:
    """
    Application service that uses storage - completely provider-agnostic.
    """

    def __init__(self, storage: CloudStorageGateway):
        self._storage = storage

    def upload_document(self, doc_id: str, content: bytes,
                       doc_type: str) -> UploadResult:
        from io import BytesIO

        key = f"documents/{doc_type}/{doc_id}"
        data = BytesIO(content)

        return self._storage.upload(
            key=key,
            data=data,
            content_type="application/pdf",
            metadata={"doc_type": doc_type, "doc_id": doc_id}
        )

    def get_document(self, doc_id: str, doc_type: str) -> bytes:
        key = f"documents/{doc_type}/{doc_id}"
        stream = self._storage.download(key)
        return stream.read()


# Usage - switch providers with single config change
storage = StorageFactory.create("s3", bucket="my-documents", region="us-west-2")
# storage = StorageFactory.create("gcs", bucket="my-documents", project="my-project")
# storage = StorageFactory.create("azure", connection_string="...", container="docs")

doc_service = DocumentService(storage)
result = doc_service.upload_document("doc123", b"PDF content...", "invoices")
print(f"Uploaded to {result.provider}: {result.key}")
```

### Example 2: Payment Gateway Adapter with Retry and Circuit Breaker

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from decimal import Decimal
from typing import Optional, Dict, Any, Callable
from datetime import datetime, timedelta
from enum import Enum
import time
import threading

class PaymentStatus(Enum):
    SUCCESS = "success"
    FAILED = "failed"
    PENDING = "pending"
    REQUIRES_ACTION = "requires_action"

@dataclass
class PaymentResult:
    status: PaymentStatus
    transaction_id: str
    amount: Decimal
    currency: str
    provider: str
    error_code: Optional[str] = None
    error_message: Optional[str] = None
    requires_redirect: bool = False
    redirect_url: Optional[str] = None
    metadata: Dict[str, Any] = field(default_factory=dict)

class PaymentGateway(ABC):
    """Target interface for payment processing."""

    @abstractmethod
    def charge(self, amount: Decimal, currency: str,
               payment_method_token: str,
               idempotency_key: str) -> PaymentResult:
        pass

    @abstractmethod
    def refund(self, transaction_id: str,
               amount: Optional[Decimal] = None) -> PaymentResult:
        pass

    @abstractmethod
    def get_transaction(self, transaction_id: str) -> PaymentResult:
        pass


# =============================================================================
# CIRCUIT BREAKER FOR ADAPTER RESILIENCE
# =============================================================================

class CircuitState(Enum):
    CLOSED = "closed"  # Normal operation
    OPEN = "open"      # Failing, reject requests
    HALF_OPEN = "half_open"  # Testing if service recovered

class CircuitBreaker:
    """
    Circuit breaker pattern for adapter resilience.

    Prevents cascading failures when an adaptee service is down.
    """

    def __init__(self, failure_threshold: int = 5,
                 recovery_timeout: float = 30.0,
                 half_open_max_calls: int = 3):
        self._failure_threshold = failure_threshold
        self._recovery_timeout = recovery_timeout
        self._half_open_max_calls = half_open_max_calls

        self._state = CircuitState.CLOSED
        self._failure_count = 0
        self._last_failure_time: Optional[datetime] = None
        self._half_open_calls = 0
        self._lock = threading.Lock()

    def can_execute(self) -> bool:
        with self._lock:
            if self._state == CircuitState.CLOSED:
                return True

            if self._state == CircuitState.OPEN:
                if self._should_attempt_reset():
                    self._state = CircuitState.HALF_OPEN
                    self._half_open_calls = 0
                    return True
                return False

            # HALF_OPEN
            if self._half_open_calls < self._half_open_max_calls:
                self._half_open_calls += 1
                return True
            return False

    def record_success(self):
        with self._lock:
            if self._state == CircuitState.HALF_OPEN:
                self._state = CircuitState.CLOSED
            self._failure_count = 0

    def record_failure(self):
        with self._lock:
            self._failure_count += 1
            self._last_failure_time = datetime.now()

            if self._state == CircuitState.HALF_OPEN:
                self._state = CircuitState.OPEN
            elif self._failure_count >= self._failure_threshold:
                self._state = CircuitState.OPEN

    def _should_attempt_reset(self) -> bool:
        if self._last_failure_time is None:
            return True
        elapsed = (datetime.now() - self._last_failure_time).total_seconds()
        return elapsed >= self._recovery_timeout

    @property
    def state(self) -> CircuitState:
        return self._state


# =============================================================================
# RESILIENT STRIPE ADAPTER
# =============================================================================

class ResilientStripeAdapter(PaymentGateway):
    """
    Stripe adapter with built-in resilience patterns.

    Features:
    - Circuit breaker for failure isolation
    - Automatic retry with exponential backoff
    - Idempotency key support
    - Error normalization
    """

    # Stripe error codes that are retryable
    RETRYABLE_ERRORS = {
        "rate_limit_error",
        "api_connection_error",
        "api_error",  # 500 errors
    }

    def __init__(self, api_key: str,
                 max_retries: int = 3,
                 circuit_breaker: CircuitBreaker = None):
        self._api_key = api_key
        self._max_retries = max_retries
        self._circuit_breaker = circuit_breaker or CircuitBreaker()

        # In production, use actual Stripe SDK
        # import stripe
        # stripe.api_key = api_key

    def charge(self, amount: Decimal, currency: str,
               payment_method_token: str,
               idempotency_key: str) -> PaymentResult:

        def _execute():
            # Simulated Stripe API call
            return self._stripe_create_charge(
                amount_cents=int(amount * 100),
                currency=currency.lower(),
                source=payment_method_token,
                idempotency_key=idempotency_key
            )

        response = self._execute_with_resilience(_execute)
        return self._transform_charge_response(response, amount, currency)

    def _execute_with_resilience(self, operation: Callable) -> Dict:
        """Execute operation with circuit breaker and retry logic."""

        if not self._circuit_breaker.can_execute():
            raise ServiceUnavailableError(
                "Payment service temporarily unavailable (circuit open)"
            )

        last_error = None

        for attempt in range(self._max_retries + 1):
            try:
                result = operation()
                self._circuit_breaker.record_success()
                return result

            except StripeAPIError as e:
                last_error = e

                if not self._is_retryable(e):
                    self._circuit_breaker.record_failure()
                    raise

                if attempt < self._max_retries:
                    sleep_time = self._calculate_backoff(attempt)
                    time.sleep(sleep_time)
                else:
                    self._circuit_breaker.record_failure()
                    raise

        raise last_error

    def _is_retryable(self, error) -> bool:
        """Determine if error warrants retry."""
        return getattr(error, 'code', '') in self.RETRYABLE_ERRORS

    def _calculate_backoff(self, attempt: int) -> float:
        """Exponential backoff with jitter."""
        import random
        base_delay = 0.5 * (2 ** attempt)
        jitter = random.uniform(0, 0.5)
        return min(base_delay + jitter, 30.0)  # Cap at 30 seconds

    def _stripe_create_charge(self, amount_cents: int, currency: str,
                               source: str, idempotency_key: str) -> Dict:
        """Simulated Stripe API call."""
        # In production: stripe.Charge.create(...)
        return {
            "id": f"ch_{datetime.now().timestamp()}",
            "amount": amount_cents,
            "currency": currency,
            "status": "succeeded",
            "source": {"id": source},
            "created": int(datetime.now().timestamp())
        }

    def _transform_charge_response(self, response: Dict,
                                    original_amount: Decimal,
                                    original_currency: str) -> PaymentResult:
        """Transform Stripe response to unified PaymentResult."""

        status_map = {
            "succeeded": PaymentStatus.SUCCESS,
            "pending": PaymentStatus.PENDING,
            "failed": PaymentStatus.FAILED,
            "requires_action": PaymentStatus.REQUIRES_ACTION,
        }

        return PaymentResult(
            status=status_map.get(response["status"], PaymentStatus.FAILED),
            transaction_id=response["id"],
            amount=Decimal(response["amount"]) / 100,
            currency=response["currency"].upper(),
            provider="stripe",
            requires_redirect=response.get("status") == "requires_action",
            redirect_url=response.get("next_action", {}).get("redirect_to_url", {}).get("url"),
            metadata={
                "stripe_charge_id": response["id"],
                "created_at": response["created"]
            }
        )

    def refund(self, transaction_id: str,
               amount: Optional[Decimal] = None) -> PaymentResult:

        def _execute():
            return self._stripe_create_refund(
                charge_id=transaction_id,
                amount_cents=int(amount * 100) if amount else None
            )

        response = self._execute_with_resilience(_execute)
        return PaymentResult(
            status=PaymentStatus.SUCCESS if response["status"] == "succeeded" else PaymentStatus.FAILED,
            transaction_id=response["id"],
            amount=Decimal(response["amount"]) / 100,
            currency=response["currency"].upper(),
            provider="stripe"
        )

    def _stripe_create_refund(self, charge_id: str,
                               amount_cents: Optional[int]) -> Dict:
        """Simulated Stripe refund API call."""
        return {
            "id": f"re_{datetime.now().timestamp()}",
            "charge": charge_id,
            "amount": amount_cents or 1000,
            "currency": "usd",
            "status": "succeeded"
        }

    def get_transaction(self, transaction_id: str) -> PaymentResult:
        def _execute():
            return self._stripe_retrieve_charge(transaction_id)

        response = self._execute_with_resilience(_execute)
        return self._transform_charge_response(
            response,
            Decimal(response["amount"]) / 100,
            response["currency"]
        )

    def _stripe_retrieve_charge(self, charge_id: str) -> Dict:
        """Simulated Stripe retrieve API call."""
        return {
            "id": charge_id,
            "amount": 9999,
            "currency": "usd",
            "status": "succeeded",
            "created": int(datetime.now().timestamp())
        }


# Custom exceptions
class StripeAPIError(Exception):
    def __init__(self, message: str, code: str = ""):
        super().__init__(message)
        self.code = code

class ServiceUnavailableError(Exception):
    pass
```

### Interview Deep-Dive: Real-World API Adapters

<details style="margin-bottom: 12px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 16px;">Level 1: How do you handle API versioning when the adaptee releases breaking changes?</summary>
<div style="padding: 0 16px 16px 16px; color: #334155;">

<span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px;">API versioning in adapters requires a strategy that isolates version-specific logic while maintaining a stable interface for clients.</span>

**Strategy 1: Version-Specific Adapter Classes**
```python
class StripeAdapterV1(PaymentGateway):
    """Handles Stripe API v2020-08-01."""

    def charge(self, amount, currency, token):
        # Old API: source parameter
        return self._client.create_charge(source=token, ...)

class StripeAdapterV2(PaymentGateway):
    """Handles Stripe API v2023-10-01."""

    def charge(self, amount, currency, token):
        # New API: payment_method parameter, different response structure
        return self._client.create_payment_intent(payment_method=token, ...)

# Factory selects based on configuration
def get_stripe_adapter(api_version: str) -> PaymentGateway:
    adapters = {
        "2020-08-01": StripeAdapterV1,
        "2023-10-01": StripeAdapterV2,
    }
    return adapters[api_version](api_key)
```

**Strategy 2: Internal Version Handling**
```python
class StripeAdapter(PaymentGateway):
    def __init__(self, api_key: str, api_version: str = "2023-10-01"):
        self._api_version = api_version
        self._client = stripe.Client(api_key, api_version=api_version)

    def charge(self, amount, currency, token):
        if self._is_legacy_version():
            return self._charge_legacy(amount, currency, token)
        return self._charge_modern(amount, currency, token)

    def _is_legacy_version(self) -> bool:
        return self._api_version < "2022-01-01"
```

**Strategy 3: Adapter Composition**
```python
class VersionedStripeAdapter(PaymentGateway):
    """Composes version-specific handlers."""

    def __init__(self, api_key: str, api_version: str):
        self._charge_handler = self._get_charge_handler(api_version)
        self._refund_handler = self._get_refund_handler(api_version)

    def _get_charge_handler(self, version):
        handlers = {
            "v1": StripeChargeV1Handler,
            "v2": StripePaymentIntentHandler,
        }
        return handlers[self._version_family(version)]()
```

<details style="margin-top: 16px; background: #f1f5f9; border-radius: 6px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 12px;">Level 2: How do you implement graceful degradation when adaptee capabilities are reduced?</summary>
<div style="padding: 0 12px 12px 12px; color: #334155;">

<span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px;">Graceful degradation in adapters means providing reduced but functional service when the full capability isn't available.</span>

```python
class DegradableStorageAdapter(CloudStorageGateway):
    """
    Storage adapter that degrades gracefully when features unavailable.
    """

    def __init__(self, primary: CloudStorageGateway,
                 fallback: CloudStorageGateway = None,
                 feature_flags: Dict[str, bool] = None):
        self._primary = primary
        self._fallback = fallback
        self._features = feature_flags or {}
        self._degraded_mode = False

    def upload(self, key: str, data: BinaryIO, **kwargs) -> UploadResult:
        try:
            if self._supports_feature("versioning"):
                return self._upload_with_versioning(key, data, **kwargs)
            else:
                # Degraded: upload without versioning
                return self._primary.upload(key, data, **kwargs)

        except ServiceDegradedError:
            self._degraded_mode = True
            if self._fallback:
                # Further degradation: use fallback storage
                return self._fallback.upload(key, data, **kwargs)
            raise

    def _upload_with_versioning(self, key, data, **kwargs):
        """Full-featured upload with versioning."""
        # Check if previous version exists
        try:
            existing = self._primary.get_metadata(key)
            kwargs["metadata"] = kwargs.get("metadata", {})
            kwargs["metadata"]["previous_version"] = existing.etag
        except NotFoundError:
            pass

        return self._primary.upload(key, data, **kwargs)

    def get_metadata(self, key: str) -> StorageObject:
        """Degrade from detailed to basic metadata if needed."""
        try:
            return self._primary.get_metadata(key)
        except FeatureNotAvailableError:
            # Degraded: construct from list operation
            objects = self._primary.list_objects(prefix=key, max_keys=1)
            if objects and objects[0].key == key:
                return objects[0]
            raise NotFoundError(key)

    def _supports_feature(self, feature: str) -> bool:
        if self._degraded_mode:
            return False
        return self._features.get(feature, True)

    @property
    def service_status(self) -> Dict[str, Any]:
        """Report current service degradation status."""
        return {
            "degraded": self._degraded_mode,
            "using_fallback": self._degraded_mode and self._fallback is not None,
            "available_features": [
                f for f, enabled in self._features.items() if enabled
            ]
        }
```

<details style="margin-top: 12px; background: #e2e8f0; border-radius: 6px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 12px;">Level 3: How would you implement adapter telemetry to monitor adaptation overhead and detect adaptee drift?</summary>
<div style="padding: 0 12px 12px 12px; color: #334155;">

<span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px;">Adapter telemetry tracks both the translation overhead and detects when adaptee behavior changes unexpectedly (drift).</span>

```python
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Any
from datetime import datetime
import time
import statistics

@dataclass
class AdaptationMetrics:
    """Metrics for a single adaptation operation."""
    operation: str
    adaptee_latency_ms: float
    transformation_latency_ms: float
    total_latency_ms: float
    request_size_bytes: int
    response_size_bytes: int
    adaptee_response_schema_hash: str
    success: bool
    error_type: Optional[str] = None
    timestamp: datetime = field(default_factory=datetime.now)

class AdapterTelemetry:
    """
    Telemetry collector for adapter monitoring.

    Tracks:
    - Transformation overhead
    - Adaptee latency trends
    - Response schema drift detection
    - Error rate by operation
    """

    def __init__(self, adapter_name: str, window_size: int = 1000):
        self._adapter_name = adapter_name
        self._window_size = window_size
        self._metrics: List[AdaptationMetrics] = []
        self._schema_baselines: Dict[str, str] = {}
        self._drift_callbacks: List[callable] = []

    def record(self, metrics: AdaptationMetrics):
        """Record adaptation metrics."""
        self._metrics.append(metrics)

        # Maintain sliding window
        if len(self._metrics) > self._window_size:
            self._metrics = self._metrics[-self._window_size:]

        # Check for schema drift
        self._check_schema_drift(metrics)

    def _check_schema_drift(self, metrics: AdaptationMetrics):
        """Detect if adaptee response schema has changed."""
        key = metrics.operation
        current_hash = metrics.adaptee_response_schema_hash

        if key not in self._schema_baselines:
            self._schema_baselines[key] = current_hash
            return

        if self._schema_baselines[key] != current_hash:
            # Schema drift detected!
            self._notify_drift(
                operation=key,
                expected_hash=self._schema_baselines[key],
                actual_hash=current_hash
            )

    def _notify_drift(self, operation: str, expected_hash: str, actual_hash: str):
        """Alert on schema drift."""
        for callback in self._drift_callbacks:
            callback({
                "adapter": self._adapter_name,
                "operation": operation,
                "expected_schema": expected_hash,
                "actual_schema": actual_hash,
                "timestamp": datetime.now().isoformat()
            })

    def on_drift(self, callback: callable):
        """Register drift notification callback."""
        self._drift_callbacks.append(callback)

    def get_statistics(self) -> Dict[str, Any]:
        """Get aggregated statistics."""
        if not self._metrics:
            return {}

        successful = [m for m in self._metrics if m.success]

        return {
            "adapter": self._adapter_name,
            "total_operations": len(self._metrics),
            "success_rate": len(successful) / len(self._metrics),
            "transformation_overhead": {
                "mean_ms": statistics.mean(m.transformation_latency_ms for m in successful),
                "p50_ms": statistics.median(m.transformation_latency_ms for m in successful),
                "p99_ms": self._percentile([m.transformation_latency_ms for m in successful], 99),
            },
            "adaptee_latency": {
                "mean_ms": statistics.mean(m.adaptee_latency_ms for m in successful),
                "p50_ms": statistics.median(m.adaptee_latency_ms for m in successful),
                "p99_ms": self._percentile([m.adaptee_latency_ms for m in successful], 99),
            },
            "overhead_percentage": self._calculate_overhead_percentage(),
            "errors_by_type": self._count_errors_by_type(),
        }

    def _percentile(self, data: List[float], percentile: int) -> float:
        sorted_data = sorted(data)
        index = int(len(sorted_data) * percentile / 100)
        return sorted_data[min(index, len(sorted_data) - 1)]

    def _calculate_overhead_percentage(self) -> float:
        """Calculate transformation overhead as percentage of total time."""
        successful = [m for m in self._metrics if m.success]
        if not successful:
            return 0.0

        total_transform = sum(m.transformation_latency_ms for m in successful)
        total_time = sum(m.total_latency_ms for m in successful)

        return (total_transform / total_time * 100) if total_time > 0 else 0.0

    def _count_errors_by_type(self) -> Dict[str, int]:
        from collections import Counter
        failed = [m for m in self._metrics if not m.success]
        return dict(Counter(m.error_type for m in failed))


class InstrumentedAdapter(PaymentGateway):
    """
    Adapter wrapper that adds telemetry to any adapter.
    """

    def __init__(self, adapter: PaymentGateway, telemetry: AdapterTelemetry):
        self._adapter = adapter
        self._telemetry = telemetry

    def charge(self, amount: Decimal, currency: str,
               payment_method_token: str, idempotency_key: str) -> PaymentResult:

        start_time = time.perf_counter()

        # Measure request transformation
        transform_start = time.perf_counter()
        # (transformation happens inside adapter)
        transform_time = 0  # Would measure actual transformation

        try:
            # Measure adaptee call
            adaptee_start = time.perf_counter()
            result = self._adapter.charge(
                amount, currency, payment_method_token, idempotency_key
            )
            adaptee_time = (time.perf_counter() - adaptee_start) * 1000

            # Record metrics
            self._telemetry.record(AdaptationMetrics(
                operation="charge",
                adaptee_latency_ms=adaptee_time,
                transformation_latency_ms=transform_time,
                total_latency_ms=(time.perf_counter() - start_time) * 1000,
                request_size_bytes=len(str(amount) + currency + payment_method_token),
                response_size_bytes=len(str(result)),
                adaptee_response_schema_hash=self._hash_schema(result),
                success=result.status == PaymentStatus.SUCCESS
            ))

            return result

        except Exception as e:
            self._telemetry.record(AdaptationMetrics(
                operation="charge",
                adaptee_latency_ms=0,
                transformation_latency_ms=0,
                total_latency_ms=(time.perf_counter() - start_time) * 1000,
                request_size_bytes=0,
                response_size_bytes=0,
                adaptee_response_schema_hash="",
                success=False,
                error_type=type(e).__name__
            ))
            raise

    def _hash_schema(self, result: PaymentResult) -> str:
        """Hash the structure of the response for drift detection."""
        import hashlib
        schema = sorted(result.__dataclass_fields__.keys())
        return hashlib.md5(str(schema).encode()).hexdigest()[:8]

    # Implement other methods similarly...
    def refund(self, transaction_id: str, amount: Optional[Decimal] = None):
        return self._adapter.refund(transaction_id, amount)

    def get_transaction(self, transaction_id: str):
        return self._adapter.get_transaction(transaction_id)


# Usage
telemetry = AdapterTelemetry("stripe_adapter")
telemetry.on_drift(lambda info: print(f"ALERT: Schema drift detected: {info}"))

base_adapter = ResilientStripeAdapter(api_key="sk_test_xxx")
monitored_adapter = InstrumentedAdapter(base_adapter, telemetry)

# Use monitored adapter in application
result = monitored_adapter.charge(Decimal("99.99"), "USD", "tok_visa", "key_123")

# Check telemetry
stats = telemetry.get_statistics()
print(f"Transformation overhead: {stats['overhead_percentage']:.2f}%")
```

</div>
</details>

</div>
</details>

</div>
</details>

---

## Industry Usage and Production Patterns

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">

| Company/Framework | Adapter Implementation | Key Insight |
|-------------------|----------------------|-------------|
| **Django ORM** | Database backends (PostgreSQL, MySQL, SQLite) adapt to unified QuerySet interface | <span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px;">Adapters handle SQL dialect differences and type conversions</span> |
| **AWS SDK** | Service clients adapt HTTP responses to typed objects | Response parsing happens in adapter layer with retries |
| **Stripe** | Webhooks adapt external events to internal domain events | Signature verification + event normalization in adapter |
| **Kubernetes** | Container runtimes (Docker, containerd, CRI-O) adapt to CRI interface | Runtime-specific features gracefully degraded |
| **React Testing Library** | Adapts browser DOM APIs to testing interface | Same tests work with different renderers |
| **Apache Kafka Connect** | Source/Sink connectors adapt external systems to Kafka topics | Schema registry integration for format translation |
| **gRPC** | Protocol adapters convert between REST/gRPC/GraphQL | Transcoding happens at adapter boundary |

</div>

---

## Adapter vs Related Patterns: Decision Framework

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">

<div style="background: #dbeafe; padding: 20px; border-radius: 12px; border-top: 4px solid #3b82f6;">
<h4 style="color: #1e40af; margin-top: 0;">Adapter</h4>
<p style="color: #1e3a8a; font-size: 0.9rem; margin-bottom: 12px;">Makes existing incompatible interface work with expected interface.</p>
<div style="background: #eff6ff; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
<strong style="color: #1e40af;">Use when:</strong> <span style="color: #1e3a8a;">"I have ClassA but need InterfaceB"</span><br>
<strong style="color: #1e40af;">Changes:</strong> <span style="color: #1e3a8a;">Interface signature only</span><br>
<strong style="color: #1e40af;">Relationship:</strong> <span style="color: #1e3a8a;">Wraps ONE object</span>
</div>
</div>

<div style="background: #dcfce7; padding: 20px; border-radius: 12px; border-top: 4px solid #22c55e;">
<h4 style="color: #166534; margin-top: 0;">[[Decorator]](/topic/design-patterns/decorator)</h4>
<p style="color: #14532d; font-size: 0.9rem; margin-bottom: 12px;">Adds behavior to object without changing its interface.</p>
<div style="background: #f0fdf4; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
<strong style="color: #166534;">Use when:</strong> <span style="color: #14532d;">"Add logging to this service"</span><br>
<strong style="color: #166534;">Changes:</strong> <span style="color: #14532d;">Behavior, not interface</span><br>
<strong style="color: #166534;">Relationship:</strong> <span style="color: #14532d;">Same interface as wrapped</span>
</div>
</div>

<div style="background: #fef3c7; padding: 20px; border-radius: 12px; border-top: 4px solid #f59e0b;">
<h4 style="color: #92400e; margin-top: 0;">[[Facade]](/topic/design-patterns/facade)</h4>
<p style="color: #78350f; font-size: 0.9rem; margin-bottom: 12px;">Simplifies complex subsystem with unified interface.</p>
<div style="background: #fffbeb; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
<strong style="color: #92400e;">Use when:</strong> <span style="color: #78350f;">"Simplify these 10 services"</span><br>
<strong style="color: #92400e;">Changes:</strong> <span style="color: #78350f;">Complexity level</span><br>
<strong style="color: #92400e;">Relationship:</strong> <span style="color: #78350f;">Wraps MULTIPLE objects</span>
</div>
</div>

<div style="background: #f3e8ff; padding: 20px; border-radius: 12px; border-top: 4px solid #a855f7;">
<h4 style="color: #7c3aed; margin-top: 0;">[[Bridge]](/topic/design-patterns/bridge)</h4>
<p style="color: #6b21a8; font-size: 0.9rem; margin-bottom: 12px;">Separates abstraction from implementation for independent variation.</p>
<div style="background: #faf5ff; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
<strong style="color: #7c3aed;">Use when:</strong> <span style="color: #6b21a8;">"Both sides need to vary"</span><br>
<strong style="color: #7c3aed;">Changes:</strong> <span style="color: #6b21a8;">Decouples hierarchies</span><br>
<strong style="color: #7c3aed;">Relationship:</strong> <span style="color: #6b21a8;">Designed upfront</span>
</div>
</div>

<div style="background: #fce7f3; padding: 20px; border-radius: 12px; border-top: 4px solid #ec4899;">
<h4 style="color: #be185d; margin-top: 0;">[[Proxy]](/topic/design-patterns/proxy)</h4>
<p style="color: #9d174d; font-size: 0.9rem; margin-bottom: 12px;">Controls access to object with same interface.</p>
<div style="background: #fdf2f8; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
<strong style="color: #be185d;">Use when:</strong> <span style="color: #9d174d;">"Control access to this object"</span><br>
<strong style="color: #be185d;">Changes:</strong> <span style="color: #9d174d;">Access policy, not interface</span><br>
<strong style="color: #be185d;">Relationship:</strong> <span style="color: #9d174d;">Identical interface to subject</span>
</div>
</div>

</div>

<div style="background: #f1f5f9; padding: 20px; border-radius: 12px; margin-top: 24px;">
<h4 style="color: #0f172a; margin-top: 0;">Decision Tree</h4>
<div style="color: #334155; font-size: 0.95rem;">

```
Do you have an existing class with wrong interface?
├─ YES → Do you need to change the interface signature?
│        ├─ YES → ADAPTER (convert interface A to interface B)
│        └─ NO → Do you need to add behavior?
│                ├─ YES → DECORATOR (add logging, caching, etc.)
│                └─ NO → PROXY (add access control, lazy loading)
└─ NO → Are you simplifying a complex subsystem?
        ├─ YES → FACADE (unified simple interface over complexity)
        └─ NO → Do you need abstraction and implementation to vary independently?
                ├─ YES → BRIDGE (design for future flexibility)
                └─ NO → Consider if you need a pattern at all
```

</div>
</div>
</div>

---

## Common Anti-Patterns and Pitfalls

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #fecaca;">

### Anti-Pattern 1: Business Logic in Adapter

```python
# BAD: Adapter contains business rules
class PaymentAdapter(PaymentGateway):
    def charge(self, amount: Decimal, currency: str, token: str):
        # WRONG: Discount logic doesn't belong in adapter
        if self._is_premium_customer():
            amount = amount * Decimal("0.9")

        # WRONG: Fraud detection doesn't belong in adapter
        if self._fraud_score(token) > 0.8:
            raise FraudDetectedError()

        return self._adaptee.create_charge(int(amount * 100), currency, token)

# GOOD: Adapter only translates
class PaymentAdapter(PaymentGateway):
    def charge(self, amount: Decimal, currency: str, token: str):
        # Pure translation - no business logic
        response = self._adaptee.create_charge(
            amount_cents=int(amount * 100),
            currency=currency.lower(),
            source=token
        )
        return self._transform_response(response)

# Business logic belongs in service layer
class PaymentService:
    def __init__(self, gateway: PaymentGateway, fraud_detector: FraudDetector):
        self._gateway = gateway
        self._fraud_detector = fraud_detector

    def process_payment(self, amount: Decimal, currency: str,
                       token: str, customer: Customer):
        # Business logic HERE
        if customer.is_premium:
            amount = amount * Decimal("0.9")

        if self._fraud_detector.score(token) > 0.8:
            raise FraudDetectedError()

        return self._gateway.charge(amount, currency, token)
```

### Anti-Pattern 2: Adapter Chains (Adapting Adapters)

```python
# BAD: Stacked adapters create complexity and performance issues
class XMLParser:
    def parse(self, xml: str) -> XMLElement: ...

class XMLToJSONAdapter:
    def __init__(self, parser: XMLParser):
        self._parser = parser

    def to_json(self, xml: str) -> str:
        element = self._parser.parse(xml)
        return json.dumps(self._element_to_dict(element))

class JSONToDataFrameAdapter:
    def __init__(self, json_adapter: XMLToJSONAdapter):  # Wrapping adapter!
        self._json_adapter = json_adapter

    def to_dataframe(self, xml: str):
        json_str = self._json_adapter.to_json(xml)  # Double conversion!
        return pd.DataFrame(json.loads(json_str))

# GOOD: Direct adaptation
class XMLToDataFrameAdapter:
    def __init__(self, parser: XMLParser):
        self._parser = parser

    def to_dataframe(self, xml: str):
        element = self._parser.parse(xml)
        return self._element_to_dataframe(element)  # Direct conversion
```

### Anti-Pattern 3: Leaky Abstraction

```python
# BAD: Adapter exposes adaptee-specific details
class StripeAdapter(PaymentGateway):
    def charge(self, amount: Decimal, currency: str, token: str):
        try:
            return self._client.create_charge(...)
        except stripe.error.CardError as e:
            # LEAKY: Exposing Stripe-specific exception
            raise e  # Clients now depend on Stripe!

# GOOD: Normalize errors to domain exceptions
class StripeAdapter(PaymentGateway):
    def charge(self, amount: Decimal, currency: str, token: str):
        try:
            response = self._client.create_charge(...)
            return self._transform_response(response)
        except stripe.error.CardError as e:
            # Translate to domain exception
            raise PaymentDeclinedError(
                code=self._map_error_code(e.code),
                message=e.user_message,
                provider="stripe"
            )
        except stripe.error.RateLimitError:
            raise ServiceThrottledError(provider="stripe", retry_after=60)
```

### Anti-Pattern 4: Incomplete Interface Implementation

```python
# BAD: Partial implementation surprises callers
class MinimalPaymentAdapter(PaymentGateway):
    def charge(self, amount, currency, token):
        return self._adaptee.pay(amount)

    def refund(self, transaction_id, amount=None):
        raise NotImplementedError("This provider doesn't support refunds")

    def get_transaction(self, transaction_id):
        raise NotImplementedError("Transaction lookup not available")

# GOOD: Use interface segregation or explicit capability checking
class ChargeOnlyGateway(ABC):
    """Interface for providers that only support charging."""
    @abstractmethod
    def charge(self, amount, currency, token): pass

class FullGateway(ChargeOnlyGateway):
    """Interface for providers with full feature set."""
    @abstractmethod
    def refund(self, transaction_id, amount=None): pass

    @abstractmethod
    def get_transaction(self, transaction_id): pass

# Or use capability checking
class CapabilityAwareAdapter(PaymentGateway):
    @property
    def capabilities(self) -> Set[str]:
        return {"charge"}  # Explicitly declare what's supported

    def refund(self, transaction_id, amount=None):
        if "refund" not in self.capabilities:
            raise CapabilityNotSupportedError("refund", self.provider_name)
```

</div>

---

## Testing Adapters

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">

### Testing Strategy

```python
import pytest
from unittest.mock import Mock, patch
from decimal import Decimal

class TestStripeAdapter:
    """
    Adapter tests should verify:
    1. Correct transformation of inputs (request adaptation)
    2. Correct transformation of outputs (response adaptation)
    3. Error handling and normalization
    4. Edge cases in data conversion
    """

    @pytest.fixture
    def mock_stripe_client(self):
        """Create mock Stripe client."""
        client = Mock()
        client.create_charge.return_value = {
            "id": "ch_test123",
            "amount": 9999,
            "currency": "usd",
            "status": "succeeded",
            "created": 1234567890
        }
        return client

    @pytest.fixture
    def adapter(self, mock_stripe_client):
        """Create adapter with mocked client."""
        adapter = StripeAdapter.__new__(StripeAdapter)
        adapter._client = mock_stripe_client
        return adapter

    # =========================================================================
    # INPUT TRANSFORMATION TESTS
    # =========================================================================

    def test_converts_decimal_dollars_to_integer_cents(self, adapter, mock_stripe_client):
        """Verify $99.99 becomes 9999 cents."""
        adapter.charge(Decimal("99.99"), "USD", "tok_visa", "idem_key")

        mock_stripe_client.create_charge.assert_called_once()
        call_kwargs = mock_stripe_client.create_charge.call_args[1]
        assert call_kwargs["amount_cents"] == 9999

    def test_handles_currency_case_normalization(self, adapter, mock_stripe_client):
        """Verify currency codes are normalized."""
        adapter.charge(Decimal("10.00"), "usd", "tok_visa", "idem_key")

        call_kwargs = mock_stripe_client.create_charge.call_args[1]
        # Stripe expects lowercase
        assert call_kwargs["currency"] == "usd"

    def test_handles_fractional_cent_rounding(self, adapter, mock_stripe_client):
        """Verify amounts that don't convert cleanly to cents."""
        # $10.999 should become 1100 cents (banker's rounding)
        adapter.charge(Decimal("10.999"), "USD", "tok_visa", "idem_key")

        call_kwargs = mock_stripe_client.create_charge.call_args[1]
        assert call_kwargs["amount_cents"] == 1100  # Rounded

    # =========================================================================
    # OUTPUT TRANSFORMATION TESTS
    # =========================================================================

    def test_transforms_successful_response(self, adapter, mock_stripe_client):
        """Verify response transformation preserves data correctly."""
        result = adapter.charge(Decimal("99.99"), "USD", "tok_visa", "idem_key")

        assert result.status == PaymentStatus.SUCCESS
        assert result.transaction_id == "ch_test123"
        assert result.amount == Decimal("99.99")  # Converted back from cents
        assert result.currency == "USD"  # Uppercase for our system
        assert result.provider == "stripe"

    def test_transforms_failed_response(self, adapter, mock_stripe_client):
        """Verify failed responses are correctly identified."""
        mock_stripe_client.create_charge.return_value["status"] = "failed"

        result = adapter.charge(Decimal("10.00"), "USD", "tok_visa", "idem_key")

        assert result.status == PaymentStatus.FAILED

    # =========================================================================
    # ERROR HANDLING TESTS
    # =========================================================================

    def test_normalizes_stripe_card_error(self, adapter, mock_stripe_client):
        """Verify Stripe-specific errors become domain errors."""
        mock_stripe_client.create_charge.side_effect = StripeAPIError(
            "Card declined", code="card_declined"
        )

        with pytest.raises(PaymentDeclinedError) as exc_info:
            adapter.charge(Decimal("10.00"), "USD", "tok_visa", "idem_key")

        assert exc_info.value.provider == "stripe"
        assert "declined" in str(exc_info.value).lower()

    def test_normalizes_stripe_rate_limit_error(self, adapter, mock_stripe_client):
        """Verify rate limit errors become retryable errors."""
        mock_stripe_client.create_charge.side_effect = StripeAPIError(
            "Rate limited", code="rate_limit_error"
        )

        with pytest.raises(ServiceThrottledError):
            adapter.charge(Decimal("10.00"), "USD", "tok_visa", "idem_key")

    # =========================================================================
    # EDGE CASE TESTS
    # =========================================================================

    def test_handles_zero_amount(self, adapter, mock_stripe_client):
        """Verify $0.00 charges are handled (e.g., for card verification)."""
        adapter.charge(Decimal("0.00"), "USD", "tok_visa", "idem_key")

        call_kwargs = mock_stripe_client.create_charge.call_args[1]
        assert call_kwargs["amount_cents"] == 0

    def test_handles_very_large_amount(self, adapter, mock_stripe_client):
        """Verify large amounts don't overflow."""
        # $999,999.99
        adapter.charge(Decimal("999999.99"), "USD", "tok_visa", "idem_key")

        call_kwargs = mock_stripe_client.create_charge.call_args[1]
        assert call_kwargs["amount_cents"] == 99999999

    def test_handles_three_decimal_currencies(self, adapter, mock_stripe_client):
        """Verify currencies with 3 decimal places (e.g., KWD)."""
        # Kuwaiti Dinar has 3 decimal places
        # This is an edge case most adapters get wrong
        mock_stripe_client.create_charge.return_value["currency"] = "kwd"
        mock_stripe_client.create_charge.return_value["amount"] = 1000  # 1.000 KWD

        result = adapter.charge(Decimal("1.000"), "KWD", "tok_visa", "idem_key")
        # Adapter should know KWD uses fils (1/1000) not cents (1/100)
        # This test documents whether the adapter handles this correctly


# Integration test with real (sandbox) API
class TestStripeAdapterIntegration:
    """
    Integration tests using Stripe test mode.
    Run with: pytest -m integration
    """

    @pytest.mark.integration
    def test_real_charge_flow(self):
        """Test against actual Stripe test API."""
        adapter = StripeAdapter(api_key="sk_test_xxx")

        result = adapter.charge(
            amount=Decimal("10.00"),
            currency="USD",
            payment_method_token="tok_visa",  # Stripe test token
            idempotency_key=f"test_{time.time()}"
        )

        assert result.status == PaymentStatus.SUCCESS
        assert result.transaction_id.startswith("ch_")
```

</div>

---

## Key Takeaways

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #93c5fd;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">

<div>
  <h4 style="color: #1e40af; margin-top: 0;">Core Principles</h4>
  <ul style="color: #1e3a8a; margin: 0; padding-left: 20px;">
  <li><strong>Single Responsibility:</strong> Adapters ONLY translate interfaces</li>
  <li><strong>Bidirectional Translation:</strong> Transform both requests AND responses</li>
  <li><strong>Error Normalization:</strong> Convert provider errors to domain errors</li>
  <li><strong>Semantic Preservation:</strong> Maintain business meaning across interfaces</li>
</ul>
</div>

<div>
  <h4 style="color: #1e40af; margin-top: 0;">Design Decisions</h4>
  <ul style="color: #1e3a8a; margin: 0; padding-left: 20px;">
  <li><strong>Object over Class:</strong> Prefer composition for flexibility</li>
  <li><strong>Interface Segregation:</strong> Don't implement what you can't support</li>
  <li><strong>Capability Discovery:</strong> Let clients query supported features</li>
  <li><strong>Telemetry Built-in:</strong> Monitor adaptation overhead and drift</li>
</ul>
</div>

<div>
  <h4 style="color: #1e40af; margin-top: 0;">Production Concerns</h4>
  <ul style="color: #1e3a8a; margin: 0; padding-left: 20px;">
  <li><strong>Resilience:</strong> Circuit breakers and retry logic at adapter boundary</li>
  <li><strong>Idempotency:</strong> Handle duplicate requests from either side</li>
  <li><strong>Version Management:</strong> Strategy for adaptee API changes</li>
  <li><strong>Testing:</strong> Test transformations, errors, and edge cases separately</li>
</ul>
</div>

<div>
  <h4 style="color: #1e40af; margin-top: 0;">Common Pitfalls</h4>
  <ul style="color: #1e3a8a; margin: 0; padding-left: 20px;">
  <li><strong>Business Logic Creep:</strong> Keep adapters pure translators</li>
  <li><strong>Leaky Abstractions:</strong> Don't expose adaptee-specific types</li>
  <li><strong>Adapter Chains:</strong> Avoid adapting adapters</li>
  <li><strong>Incomplete Implementation:</strong> Better to refuse than half-implement</li>
</ul>
</div>

</div>

<div style="background: #eff6ff; padding: 20px; border-radius: 12px; margin-top: 20px; border-left: 4px solid #3b82f6;">
<strong style="color: #1e40af;">Interview Insight:</strong>
<span style="color: #1e3a8a;"> <span style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 2px 6px; border-radius: 4px;">The adapter pattern is deceptively simple in concept but complex in production implementation.</span> Interviewers often probe for understanding of edge cases (lossy adaptation, error handling), production concerns (resilience, monitoring), and design trade-offs (class vs object adapter, interface segregation). Demonstrating awareness of two-way adapters and real API integration challenges shows senior-level thinking.</span>
</div>

</div>

---

## Related Patterns

- [[Facade]](/topic/design-patterns/facade) - Simplifies complex subsystems; adapter makes incompatible interfaces work together
- [[Decorator]](/topic/design-patterns/decorator) - Adds behavior without changing interface; adapter changes interface
- [[Bridge]](/topic/design-patterns/bridge) - Designed upfront for abstraction/implementation separation; adapter retrofits compatibility
- [[Proxy]](/topic/design-patterns/proxy) - Same interface with controlled access; adapter changes interface
- [[Strategy]](/topic/design-patterns/strategy) - Interchangeable algorithms; often combined with adapter for algorithm selection
