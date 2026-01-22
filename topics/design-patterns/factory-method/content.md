# Factory Method Pattern

## Overview

The Factory Method pattern defines an interface for creating objects, but lets subclasses decide which class to instantiate. It promotes loose coupling by eliminating the need to bind application-specific classes into your code.

**Difficulty:** Intermediate
**Category:** Creational Pattern
**First Documented:** GoF (1994)

---

## Simple Explanation: The Restaurant Analogy

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h3 style="color: #1e293b; margin-top: 0; font-size: 1.3rem;">Think of a Restaurant Franchise</h3>

<p style="color: #334155; font-size: 1rem; line-height: 1.7;">
Imagine you own a burger franchise with locations in New York, Texas, and California. Each location serves burgers, but with regional variations:
</p>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 20px 0;">
<div style="background: #dbeafe; padding: 16px; border-radius: 12px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700;">New York</div>
<div style="color: #1e3a8a; font-size: 0.9rem;">Classic thin patty with deli pickles</div>
</div>
<div style="background: #dcfce7; padding: 16px; border-radius: 12px; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: 700;">Texas</div>
<div style="color: #14532d; font-size: 0.9rem;">Thick patty with jalapenos and BBQ</div>
</div>
<div style="background: #fef3c7; padding: 16px; border-radius: 12px; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: 700;">California</div>
<div style="color: #78350f; font-size: 0.9rem;">Plant-based option with avocado</div>
</div>
</div>

<p style="color: #334155; font-size: 1rem; line-height: 1.7;">
<strong>The headquarters (Creator)</strong> defines WHAT a burger is and the general process (take order, make burger, serve).
<strong>Each location (ConcreteCreator)</strong> decides HOW to make the burger by implementing <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">createBurger()</code>.
</p>

<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 16px;">
<strong style="color: #0f172a;">The Key Insight:</strong>
<span style="color: #334155;"> The franchise system works without headquarters knowing the specific burger recipe each location uses. They just know they'll get a Burger object back.</span>
</div>
</div>

---

## Real Company Usage

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">

| Company | How They Use Factory Method |
|---------|----------------------------|
| **Netflix** | Creates different video encoders based on device type (mobile, TV, web) |
| **Stripe** | Payment processor factory creates region-specific handlers (US, EU, APAC) |
| **AWS SDK** | Service client factories create appropriate clients for each AWS service |
| **Django** | Form field factories create different input widgets based on field type |
| **React** | createElement is essentially a factory method for creating components |
| **Kubernetes** | Controller factories create appropriate controllers for different resource types |

</div>

---

## Pattern Structure

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h4 style="color: #1e293b; margin-top: 0; text-align: center; font-size: 1.1rem;">Factory Method Pattern Structure</h4>

<div style="display: flex; justify-content: center; gap: 60px; flex-wrap: wrap; margin: 24px 0;">

<!-- Creator Side -->
<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; width: 200px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);">
<div style="background: #3b82f6; color: white; padding: 12px; font-weight: 700; text-align: center; border-radius: 10px 10px 0 0;">Creator</div>
<div style="padding: 16px; color: #1e3a8a; font-size: 0.9rem;">
<code>+ factoryMethod()</code><br>
<code>+ someOperation()</code>
</div>
</div>

<div style="color: #3b82f6; font-size: 1.5rem;">&#9651;</div>

<div style="background: #f1f5f9; border: 2px solid #64748b; border-radius: 12px; width: 200px;">
<div style="background: #64748b; color: white; padding: 12px; font-weight: 700; text-align: center; border-radius: 10px 10px 0 0;">ConcreteCreatorA</div>
<div style="padding: 16px; color: #334155; font-size: 0.9rem;">
<code>+ factoryMethod()</code>
</div>
</div>
</div>

<!-- Arrow -->
<div style="display: flex; align-items: center; color: #64748b; font-size: 2rem; padding-top: 20px;">
&#8594;
<span style="font-size: 0.7rem; margin-left: 8px;">creates</span>
</div>

<!-- Product Side -->
<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
<div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; width: 180px; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15);">
<div style="background: #22c55e; color: white; padding: 12px; font-weight: 700; text-align: center; border-radius: 10px 10px 0 0;">Product</div>
<div style="padding: 16px; color: #166534; font-size: 0.9rem;">
<code>+ operation()</code>
</div>
</div>

<div style="color: #22c55e; font-size: 1.5rem;">&#9651;</div>

<div style="display: flex; gap: 12px;">
<div style="background: #f0fdf4; border: 2px solid #86efac; border-radius: 10px; padding: 12px 16px; color: #166534; font-size: 0.85rem; text-align: center;">
ProductA
</div>
<div style="background: #f0fdf4; border: 2px solid #86efac; border-radius: 10px; padding: 12px 16px; color: #166534; font-size: 0.85rem; text-align: center;">
ProductB
</div>
</div>
</div>

</div>

<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 16px;">
<strong style="color: #0f172a;">Flow:</strong>
<span style="color: #334155;"> Client calls <code>someOperation()</code> on Creator, which internally calls <code>factoryMethod()</code> to get a Product, then uses that Product.</span>
</div>
</div>

---

## When to Use Factory Method

<div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">

### Good Use Cases

1. **Framework/Library Development** - Your code defines the algorithm, users extend to provide implementations
2. **Plugin Systems** - Core system doesn't know what plugins exist at compile time
3. **Cross-Platform Applications** - Same logic, different platform-specific implementations
4. **Testing Infrastructure** - Production factory creates real services, test factory creates mocks
5. **Database Connections** - Create appropriate connection objects based on database type

</div>

---

## Anti-Patterns: When NOT to Use

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">

### Common Mistakes

1. **Over-Engineering** - Using factory method when you only have ONE concrete class
2. **Hiding Simple Construction** - Using factory just to avoid the `new` keyword
3. **When DI is Available** - If your DI container handles creation, don't duplicate logic
4. **Data Objects** - Factory method is for objects with behavior, not plain data transfer objects
5. **Confusing with Simple Factory** - A static method that returns objects is NOT the Factory Method pattern

</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">

### The YAGNI Trap

```python
# BAD: Over-engineering with factory method for single type
class ButtonFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button:
        pass

class WebButtonFactory(ButtonFactory):  # Only implementation!
    def create_button(self) -> Button:
        return WebButton()

# GOOD: Just create the object directly
button = WebButton()

# Use factory method ONLY when you genuinely have multiple types
```

</div>

---

## Python Implementation

### Basic Factory Method

```python
from abc import ABC, abstractmethod
from typing import Dict, Any


# Product interface - what all products must implement
class Notification(ABC):
    @abstractmethod
    def send(self, recipient: str, message: str) -> bool:
        """Send notification and return success status."""
        pass

    @abstractmethod
    def get_cost(self) -> float:
        """Return cost per notification."""
        pass


# Concrete Products
class EmailNotification(Notification):
    def __init__(self, smtp_server: str = "smtp.gmail.com"):
        self.smtp_server = smtp_server

    def send(self, recipient: str, message: str) -> bool:
        print(f"Sending EMAIL to {recipient}: {message}")
        return True

    def get_cost(self) -> float:
        return 0.001  # Very cheap


class SMSNotification(Notification):
    def __init__(self, gateway: str = "twilio"):
        self.gateway = gateway

    def send(self, recipient: str, message: str) -> bool:
        print(f"Sending SMS via {self.gateway} to {recipient}: {message}")
        return True

    def get_cost(self) -> float:
        return 0.05  # More expensive


class PushNotification(Notification):
    def __init__(self, service: str = "firebase"):
        self.service = service

    def send(self, recipient: str, message: str) -> bool:
        print(f"Sending PUSH via {self.service} to {recipient}: {message}")
        return True

    def get_cost(self) -> float:
        return 0.0  # Free


# Creator - defines the factory method
class NotificationService(ABC):
    @abstractmethod
    def create_notification(self) -> Notification:
        """Factory method - subclasses decide what to create."""
        pass

    def notify_user(self, user_id: str, message: str) -> Dict[str, Any]:
        """
        Template method that uses the factory method.
        This is where the real power of factory method lies.
        """
        notification = self.create_notification()

        # Business logic that works with any notification type
        success = notification.send(user_id, message)
        cost = notification.get_cost()

        return {
            "success": success,
            "cost": cost,
            "type": type(notification).__name__
        }


# Concrete Creators
class EmailNotificationService(NotificationService):
    def __init__(self, smtp_server: str = "smtp.gmail.com"):
        self.smtp_server = smtp_server

    def create_notification(self) -> Notification:
        return EmailNotification(self.smtp_server)


class SMSNotificationService(NotificationService):
    def __init__(self, gateway: str = "twilio"):
        self.gateway = gateway

    def create_notification(self) -> Notification:
        return SMSNotification(self.gateway)


class PushNotificationService(NotificationService):
    def create_notification(self) -> Notification:
        return PushNotification()


# Usage - client code works with creator interface
def send_alert(service: NotificationService, user: str, message: str):
    """Client code doesn't know which notification type will be used."""
    result = service.notify_user(user, message)
    print(f"Sent: {result}")
    return result


# Runtime selection
email_service = EmailNotificationService()
sms_service = SMSNotificationService()
push_service = PushNotificationService()

send_alert(email_service, "user@example.com", "Your order shipped!")
send_alert(sms_service, "+1234567890", "Your code is 123456")
send_alert(push_service, "device_token_abc", "New message received")
```

### Production-Grade Factory with Registry

```python
from abc import ABC, abstractmethod
from typing import Dict, Type, Callable, Optional, Any
from dataclasses import dataclass
from enum import Enum
import logging

logger = logging.getLogger(__name__)


class PaymentStatus(Enum):
    SUCCESS = "success"
    FAILED = "failed"
    PENDING = "pending"


@dataclass
class PaymentResult:
    status: PaymentStatus
    transaction_id: str
    amount: float
    provider: str
    metadata: Dict[str, Any] = None


# Product interface
class PaymentProcessor(ABC):
    @abstractmethod
    def process(self, amount: float, currency: str) -> PaymentResult:
        pass

    @abstractmethod
    def refund(self, transaction_id: str, amount: float) -> PaymentResult:
        pass

    @abstractmethod
    def health_check(self) -> bool:
        pass


# Concrete Products
class StripeProcessor(PaymentProcessor):
    def __init__(self, api_key: str):
        self.api_key = api_key

    def process(self, amount: float, currency: str) -> PaymentResult:
        # In production: actual Stripe API call
        return PaymentResult(
            status=PaymentStatus.SUCCESS,
            transaction_id=f"stripe_{amount}",
            amount=amount,
            provider="stripe"
        )

    def refund(self, transaction_id: str, amount: float) -> PaymentResult:
        return PaymentResult(
            status=PaymentStatus.SUCCESS,
            transaction_id=f"refund_{transaction_id}",
            amount=amount,
            provider="stripe"
        )

    def health_check(self) -> bool:
        return True


class PayPalProcessor(PaymentProcessor):
    def __init__(self, client_id: str, client_secret: str):
        self.client_id = client_id
        self.client_secret = client_secret

    def process(self, amount: float, currency: str) -> PaymentResult:
        return PaymentResult(
            status=PaymentStatus.SUCCESS,
            transaction_id=f"paypal_{amount}",
            amount=amount,
            provider="paypal"
        )

    def refund(self, transaction_id: str, amount: float) -> PaymentResult:
        return PaymentResult(
            status=PaymentStatus.SUCCESS,
            transaction_id=f"refund_{transaction_id}",
            amount=amount,
            provider="paypal"
        )

    def health_check(self) -> bool:
        return True


# Factory with Registry Pattern
class PaymentProcessorFactory:
    """
    Production-grade factory with:
    - Dynamic registration
    - Health checks
    - Fallback handling
    - Metrics tracking
    """

    _registry: Dict[str, Callable[[], PaymentProcessor]] = {}
    _instances: Dict[str, PaymentProcessor] = {}
    _fallback: Optional[str] = None

    @classmethod
    def register(
        cls,
        name: str,
        creator: Callable[[], PaymentProcessor],
        is_fallback: bool = False
    ):
        """Register a payment processor creator."""
        cls._registry[name.lower()] = creator
        if is_fallback:
            cls._fallback = name.lower()
        logger.info(f"Registered processor: {name}")

    @classmethod
    def create(cls, name: str) -> PaymentProcessor:
        """Create or return cached processor instance."""
        name = name.lower()

        # Return cached instance if exists
        if name in cls._instances:
            return cls._instances[name]

        # Try to create from registry
        creator = cls._registry.get(name)

        if not creator and cls._fallback:
            logger.warning(f"Unknown processor '{name}', using fallback")
            creator = cls._registry.get(cls._fallback)
            name = cls._fallback

        if not creator:
            raise ValueError(
                f"Unknown processor: {name}. "
                f"Available: {list(cls._registry.keys())}"
            )

        # Create and validate
        instance = creator()
        if not instance.health_check():
            raise RuntimeError(f"Processor '{name}' failed health check")

        # Cache and return
        cls._instances[name] = instance
        return instance

    @classmethod
    def list_processors(cls) -> list:
        return list(cls._registry.keys())


# Registration (usually done at startup)
PaymentProcessorFactory.register(
    "stripe",
    lambda: StripeProcessor("sk_live_xxx"),
    is_fallback=True
)

PaymentProcessorFactory.register(
    "paypal",
    lambda: PayPalProcessor("client_id", "secret")
)


# Usage
processor = PaymentProcessorFactory.create("stripe")
result = processor.process(99.99, "USD")
print(f"Payment: {result}")
```

---

## Factory Method vs Related Patterns

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">

<div style="background: #dbeafe; padding: 20px; border-radius: 12px; border-top: 4px solid #3b82f6;">
<h4 style="color: #1e40af; margin-top: 0;">Simple Factory</h4>
<p style="color: #1e3a8a; font-size: 0.9rem; margin-bottom: 12px;">Just a function/method that creates objects. NOT a GoF pattern.</p>
<pre style="background: #eff6ff; padding: 12px; border-radius: 6px; font-size: 0.8rem; overflow-x: auto;"><code style="color: #1e3a8a;">def create_button(type):
    if type == "windows":
        return WindowsButton()
    return WebButton()</code></pre>
<p style="color: #3b82f6; font-size: 0.85rem; margin-bottom: 0;"><strong>When:</strong> One-off creation without extension</p>
</div>

<div style="background: #dcfce7; padding: 20px; border-radius: 12px; border-top: 4px solid #22c55e;">
<h4 style="color: #166534; margin-top: 0;">Factory Method</h4>
<p style="color: #14532d; font-size: 0.9rem; margin-bottom: 12px;">Subclasses decide what to create. Uses inheritance.</p>
<pre style="background: #f0fdf4; padding: 12px; border-radius: 6px; font-size: 0.8rem; overflow-x: auto;"><code style="color: #166534;">class Dialog(ABC):
    @abstractmethod
    def create_button(self): pass

    def render(self):
        btn = self.create_button()
        return btn.render()</code></pre>
<p style="color: #22c55e; font-size: 0.85rem; margin-bottom: 0;"><strong>When:</strong> Algorithm fixed, creation varies</p>
</div>

<div style="background: #fef3c7; padding: 20px; border-radius: 12px; border-top: 4px solid #f59e0b;">
<h4 style="color: #92400e; margin-top: 0;">Abstract Factory</h4>
<p style="color: #78350f; font-size: 0.9rem; margin-bottom: 12px;">Creates families of related objects. Uses composition.</p>
<pre style="background: #fffbeb; padding: 12px; border-radius: 6px; font-size: 0.8rem; overflow-x: auto;"><code style="color: #78350f;">class GUIFactory(ABC):
    def create_button(self): pass
    def create_checkbox(self): pass
    def create_input(self): pass</code></pre>
<p style="color: #f59e0b; font-size: 0.85rem; margin-bottom: 0;"><strong>When:</strong> Multiple related products</p>
</div>

</div>
</div>

---

## Interview Questions

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">

### Conceptual Questions

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q1: What's the difference between Factory Method and Simple Factory?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
<strong>Simple Factory:</strong> A single method/function that creates objects based on parameters. It's not a GoF pattern - just a good practice.
<br><br>
<strong>Factory Method:</strong> Uses inheritance where subclasses override the creation method. The key is that the superclass defines an algorithm that uses the factory method, and subclasses customize what gets created.
<br><br>
<strong>Key difference:</strong> Factory Method involves polymorphism and is extensible without modifying existing code (Open/Closed Principle).
</div>
</details>

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q2: Why is Factory Method often used with Template Method?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
Factory Method provides the "hook" for Template Method. The superclass defines an algorithm (template) that includes creating objects. The factory method is the step that subclasses customize.
<br><br>
<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px; margin-top: 8px;">
def process_order(self):           # Template Method
    item = self.create_item()       # Factory Method
    self.validate(item)             # Fixed step
    self.ship(item)                 # Fixed step
</pre>
</div>
</details>

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q3: How does Factory Method relate to Dependency Injection?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
Both solve the problem of decoupling object creation from usage, but differently:
<br><br>
<strong>Factory Method:</strong> Uses inheritance - subclasses decide what to create at compile time.
<br><br>
<strong>DI:</strong> Uses composition - an external container injects dependencies at runtime.
<br><br>
<strong>Modern preference:</strong> DI is often preferred because it's more flexible and testable. Use Factory Method when you specifically need the inheritance-based extension mechanism.
</div>
</details>

### Coding Questions

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q4: Implement a document parser factory that handles PDF, Word, and Excel files</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px; overflow-x: auto;">
from abc import ABC, abstractmethod

class DocumentParser(ABC):
    @abstractmethod
    def parse(self, content: bytes) -> dict:
        pass

class PDFParser(DocumentParser):
    def parse(self, content: bytes) -> dict:
        return {"type": "pdf", "pages": 10}

class ParserFactory(ABC):
    @abstractmethod
    def create_parser(self) -> DocumentParser:
        pass

    def process_document(self, content: bytes) -> dict:
        parser = self.create_parser()
        return parser.parse(content)

class PDFParserFactory(ParserFactory):
    def create_parser(self) -> DocumentParser:
        return PDFParser()
</pre>
</div>
</details>

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q5: What would you change to make this factory thread-safe?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
Key considerations:
<ul>
<li>Use thread-safe data structures (e.g., threading.Lock in Python)</li>
<li>Consider double-checked locking for singleton instances</li>
<li>Make factory methods idempotent</li>
<li>Use atomic operations for registry updates</li>
</ul>
<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px;">
import threading

class ThreadSafeFactory:
    _lock = threading.Lock()
    _instances = {}

    @classmethod
    def create(cls, name: str):
        with cls._lock:
            if name not in cls._instances:
                cls._instances[name] = cls._create_new(name)
            return cls._instances[name]
</pre>
</div>
</details>

</div>

---

## Common Mistakes

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #fecaca;">

### Mistake 1: Factory That Does Too Much

```python
# BAD: Factory has business logic
class OrderFactory:
    def create_order(self, customer_id: str) -> Order:
        customer = self.db.get(customer_id)  # Fetching data!
        if customer.is_premium:              # Business logic!
            discount = self.calc_discount()  # More logic!
            return PremiumOrder(discount=discount)
        return StandardOrder()

# GOOD: Factory only creates
class OrderFactory:
    def create_order(self, order_type: str, **kwargs) -> Order:
        return self._creators[order_type](**kwargs)
```

### Mistake 2: Returning Different Interfaces

```python
# BAD: Products don't share interface
class AnimalFactory:
    def create(self, type: str):
        if type == "dog":
            return Dog()   # Has bark()
        return Fish()      # Has swim() - different!

# GOOD: All products implement same interface
class AnimalFactory:
    def create(self, type: str) -> Animal:
        return self._creators[type]()  # All have make_sound()
```

</div>

---

## Key Takeaways

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #93c5fd;">

1. **Factory Method = Inheritance + Template Method** - The superclass defines the algorithm, subclasses customize creation

2. **Not just about hiding `new`** - The pattern is about deferring instantiation decisions to subclasses

3. **Know when NOT to use it** - If you have only one concrete type, just create it directly

4. **Consider DI first** - In modern applications, dependency injection often provides more flexibility

5. **Products must share interface** - All created objects must be usable through the same abstraction

</div>

---

## Related Patterns

- [Abstract Factory](/topic/design-patterns/abstract-factory) - Creates families of products
- [Builder](/topic/design-patterns/builder) - Complex object construction
- [Prototype](/topic/design-patterns/prototype) - Clone existing instances
- [Singleton](/topic/design-patterns/singleton) - Often combined with Factory
