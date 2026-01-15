# Factory Method Pattern

## Overview

The Factory Method pattern defines an interface for creating objects, but lets subclasses decide which class to instantiate. It promotes loose coupling by eliminating the need to bind application-specific classes into your code.

**Difficulty:** Intermediate (Often misunderstood, frequently misused)
**Category:** Creational Pattern
**First Documented:** GoF (1994), but concept predates it

---

## Intuitive Understanding

<div class="metaphor-card">
  <div class="metaphor-icon">🍕</div>
  <div class="metaphor-title">Think of a Pizza Restaurant Franchise</div>
  <div class="metaphor-description">
    Imagine you own a pizza chain. Each location (NYC, Chicago, California) makes pizza differently.
    The headquarters defines WHAT a pizza is (dough, sauce, toppings) and the general process (prepare, bake, box).
    But each location DECIDES HOW to make it - NYC style thin crust, Chicago deep dish, California with avocado.

    The "Factory Method" is like telling each franchise: "You implement your own createPizza() - headquarters doesn't care HOW you make it, just that you deliver a Pizza object we can work with."
  </div>
  <div class="metaphor-mapping">
    <div class="mapping-item">
      <span class="real">Pizza HQ (abstract process)</span>
      <span class="arrow">→</span>
      <span class="concept">Creator interface</span>
    </div>
    <div class="mapping-item">
      <span class="real">NYC/Chicago store</span>
      <span class="arrow">→</span>
      <span class="concept">ConcreteCreator</span>
    </div>
    <div class="mapping-item">
      <span class="real">createPizza() at each store</span>
      <span class="arrow">→</span>
      <span class="concept">factoryMethod()</span>
    </div>
    <div class="mapping-item">
      <span class="real">The actual pizza made</span>
      <span class="arrow">→</span>
      <span class="concept">Product</span>
    </div>
  </div>
</div>

### The 20-Year Insight

After decades of building systems, here's what separates novice from expert understanding:

**Novice thinks:** "Factory Method creates objects so I don't have to use `new`"

**Expert knows:** "Factory Method is about **deferring instantiation decisions** to subclasses while maintaining a consistent algorithm in the superclass. The real power is in the **Template Method collaboration** - the superclass controls WHEN creation happens, subclasses control WHAT gets created."

```
┌─────────────────────────────────────────────────────────────────┐
│  Expert Mental Model: Factory Method is HALF of the story      │
│                                                                 │
│  Creator.someOperation() {        ← Template Method (fixed)     │
│      product = this.factoryMethod()   ← Factory Method (varies) │
│      product.doSomething()        ← Uses the product            │
│  }                                                              │
│                                                                 │
│  The COMBINATION of fixed algorithm + varying creation         │
│  is where the real power lies.                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Mental Model: When Your Brain Should Fire "Factory Method"

<div class="decision-flowchart">
  <div class="decision-node start">Do you need to create objects?</div>
  <div class="decision-branch">
    <div class="decision-node">Is the exact type unknown at compile time?</div>
    <div class="decision-branch">
      <div class="decision-node">Will subclasses need different types?</div>
      <div class="decision-branch">
        <div class="decision-node result yes">✅ Factory Method</div>
        <div class="decision-node result maybe">Maybe Simple Factory</div>
      </div>
    </div>
  </div>
</div>

### The Decision Matrix

| Situation | Use Factory Method? | Better Alternative |
|-----------|--------------------|--------------------|
| Need object creation in base class, type varies by subclass | ✅ Yes | - |
| Multiple related products need creation | ❌ No | Abstract Factory |
| Object requires complex multi-step construction | ❌ No | Builder |
| Need exact clone of existing object | ❌ No | Prototype |
| Just want to hide `new` keyword | ❌ No | Simple Factory function |
| Configuration-driven object selection | ⚠️ Maybe | Registry + Factory |
| DI container handles creation | ❌ No | Just use DI |

---

## Key Concepts

### When to Use (Real Scenarios)

1. **Framework/Library Development**
   - Your code defines the algorithm skeleton
   - Users extend to provide specific implementations
   - Example: Web frameworks where you override `createController()`

2. **Plugin Systems**
   - Core system doesn't know what plugins exist
   - Each plugin factory creates its own components

3. **Cross-Platform Applications**
   - Same logic, different platform-specific implementations
   - macOS creates Cocoa buttons, Windows creates Win32 buttons

4. **Testing Infrastructure**
   - Production factory creates real services
   - Test factory creates mocks

### When NOT to Use (The Traps)

<div class="warning-box">
  <div class="warning-title">⚠️ Over-Engineering Alert</div>
  <div class="warning-content">
    <p><strong>Don't use Factory Method when:</strong></p>
    <ul>
      <li>You only have ONE concrete class (YAGNI - You Ain't Gonna Need It)</li>
      <li>The "product" is just data, not behavior</li>
      <li>A simple function would suffice</li>
      <li>You're trying to hide constructors for no reason</li>
      <li>Your DI container already handles this</li>
    </ul>
  </div>
</div>

### Structure

```
┌────────────────────┐       ┌────────────────────┐
│     Creator        │       │      Product       │
├────────────────────┤       ├────────────────────┤
│ + factoryMethod()  │──────→│ + operation()      │
│ + someOperation()  │       └────────────────────┘
└────────────────────┘                 △
         △                             │
         │                    ┌────────┴────────┐
┌────────┴────────┐    ┌──────┴────┐    ┌───────┴─────┐
│ConcreteCreatorA │    │ProductA   │    │ProductB     │
├─────────────────┤    └───────────┘    └─────────────┘
│+ factoryMethod()│
└─────────────────┘
```

---

## Implementation

### Python - Basic Factory Method

```python
from abc import ABC, abstractmethod

# Product interface
class Button(ABC):
    @abstractmethod
    def render(self) -> str:
        pass

    @abstractmethod
    def on_click(self, callback) -> None:
        pass


# Concrete products
class WindowsButton(Button):
    def render(self) -> str:
        return "<button class='windows'>Click me</button>"

    def on_click(self, callback) -> None:
        print("Windows button clicked")
        callback()


class MacButton(Button):
    def render(self) -> str:
        return "<button class='mac'>Click me</button>"

    def on_click(self, callback) -> None:
        print("Mac button clicked")
        callback()


class WebButton(Button):
    def render(self) -> str:
        return "<button class='web'>Click me</button>"

    def on_click(self, callback) -> None:
        print("Web button clicked")
        callback()


# Creator interface
class Dialog(ABC):
    @abstractmethod
    def create_button(self) -> Button:
        pass

    def render(self) -> str:
        button = self.create_button()
        return f"<dialog>{button.render()}</dialog>"


# Concrete creators
class WindowsDialog(Dialog):
    def create_button(self) -> Button:
        return WindowsButton()


class MacDialog(Dialog):
    def create_button(self) -> Button:
        return MacButton()


class WebDialog(Dialog):
    def create_button(self) -> Button:
        return WebButton()


# Client code
def get_dialog(platform: str) -> Dialog:
    if platform == "windows":
        return WindowsDialog()
    elif platform == "mac":
        return MacDialog()
    else:
        return WebDialog()


# Usage
dialog = get_dialog("windows")
print(dialog.render())
# <dialog><button class='windows'>Click me</button></dialog>
```

### Python - Parameterized Factory with Registry

```python
from abc import ABC, abstractmethod
from typing import Dict, Type, Any, Callable
import logging

logger = logging.getLogger(__name__)


class Document(ABC):
    """Abstract product defining document interface."""

    @abstractmethod
    def open(self) -> str:
        pass

    @abstractmethod
    def save(self) -> str:
        pass

    @abstractmethod
    def export(self, format: str) -> bytes:
        pass


class PDFDocument(Document):
    def __init__(self, config: Dict[str, Any] = None):
        self.config = config or {}
        self._content = None

    def open(self) -> str:
        return "Opening PDF document"

    def save(self) -> str:
        return "Saving PDF document"

    def export(self, format: str) -> bytes:
        return f"PDF exported as {format}".encode()


class WordDocument(Document):
    def __init__(self, config: Dict[str, Any] = None):
        self.config = config or {}

    def open(self) -> str:
        return "Opening Word document"

    def save(self) -> str:
        return "Saving Word document"

    def export(self, format: str) -> bytes:
        return f"Word exported as {format}".encode()


class DocumentFactory:
    """
    Production-grade factory with:
    - Dynamic registration
    - Validation hooks
    - Logging
    - Graceful fallbacks
    """

    _creators: Dict[str, Type[Document]] = {}
    _validators: Dict[str, Callable[[Dict], bool]] = {}
    _default_type: str = None

    @classmethod
    def register(
        cls,
        doc_type: str,
        creator: Type[Document],
        validator: Callable[[Dict], bool] = None,
        is_default: bool = False
    ):
        """Register a document type with optional validator."""
        cls._creators[doc_type.lower()] = creator
        if validator:
            cls._validators[doc_type.lower()] = validator
        if is_default:
            cls._default_type = doc_type.lower()
        logger.info(f"Registered document type: {doc_type}")

    @classmethod
    def unregister(cls, doc_type: str) -> bool:
        """Remove a document type from registry."""
        doc_type = doc_type.lower()
        if doc_type in cls._creators:
            del cls._creators[doc_type]
            cls._validators.pop(doc_type, None)
            logger.info(f"Unregistered document type: {doc_type}")
            return True
        return False

    @classmethod
    def create(cls, doc_type: str, config: Dict[str, Any] = None) -> Document:
        """
        Create a document with validation and fallback.

        Raises:
            ValueError: If doc_type unknown and no default set
            ValidationError: If config fails validation
        """
        doc_type = doc_type.lower()
        config = config or {}

        # Try exact match first
        creator = cls._creators.get(doc_type)

        # Fall back to default if configured
        if not creator and cls._default_type:
            logger.warning(
                f"Unknown type '{doc_type}', falling back to '{cls._default_type}'"
            )
            creator = cls._creators.get(cls._default_type)
            doc_type = cls._default_type

        if not creator:
            available = list(cls._creators.keys())
            raise ValueError(
                f"Unknown document type: {doc_type}. "
                f"Available: {available}"
            )

        # Run validator if present
        validator = cls._validators.get(doc_type)
        if validator and not validator(config):
            raise ValueError(f"Invalid config for {doc_type}: {config}")

        logger.debug(f"Creating {doc_type} document with config: {config}")
        return creator(config)

    @classmethod
    def list_types(cls) -> list:
        """Return all registered document types."""
        return list(cls._creators.keys())


# Registration with validators
def validate_pdf_config(config: Dict) -> bool:
    """PDFs require encryption setting in production."""
    return True  # Simplified

DocumentFactory.register("pdf", PDFDocument, validate_pdf_config, is_default=True)
DocumentFactory.register("word", WordDocument)

# Usage
doc = DocumentFactory.create("pdf", {"encryption": "AES-256"})
print(doc.open())
```

### Go - Factory Method

```go
package main

import "fmt"

// Product interface
type Transport interface {
	Deliver() string
	GetCost() float64
}

// Concrete products
type Truck struct {
	capacity int
}

func (t *Truck) Deliver() string {
	return fmt.Sprintf("Delivering by truck (capacity: %d tons)", t.capacity)
}

func (t *Truck) GetCost() float64 {
	return 10.0 * float64(t.capacity)
}

type Ship struct {
	containers int
}

func (s *Ship) Deliver() string {
	return fmt.Sprintf("Delivering by ship (%d containers)", s.containers)
}

func (s *Ship) GetCost() float64 {
	return 50.0 * float64(s.containers)
}

type Plane struct {
	packages int
}

func (p *Plane) Deliver() string {
	return fmt.Sprintf("Delivering by plane (%d packages)", p.packages)
}

func (p *Plane) GetCost() float64 {
	return 100.0 * float64(p.packages)
}

// Creator interface
type Logistics interface {
	CreateTransport() Transport
	PlanDelivery() string
}

// Concrete creators
type RoadLogistics struct {
	capacity int
}

func (r *RoadLogistics) CreateTransport() Transport {
	return &Truck{capacity: r.capacity}
}

func (r *RoadLogistics) PlanDelivery() string {
	transport := r.CreateTransport()
	return fmt.Sprintf("Road delivery planned: %s, Cost: $%.2f",
		transport.Deliver(), transport.GetCost())
}

type SeaLogistics struct {
	containers int
}

func (s *SeaLogistics) CreateTransport() Transport {
	return &Ship{containers: s.containers}
}

func (s *SeaLogistics) PlanDelivery() string {
	transport := s.CreateTransport()
	return fmt.Sprintf("Sea delivery planned: %s, Cost: $%.2f",
		transport.Deliver(), transport.GetCost())
}

type AirLogistics struct {
	packages int
}

func (a *AirLogistics) CreateTransport() Transport {
	return &Plane{packages: a.packages}
}

func (a *AirLogistics) PlanDelivery() string {
	transport := a.CreateTransport()
	return fmt.Sprintf("Air delivery planned: %s, Cost: $%.2f",
		transport.Deliver(), transport.GetCost())
}

// Factory function
func GetLogistics(logType string, param int) Logistics {
	switch logType {
	case "road":
		return &RoadLogistics{capacity: param}
	case "sea":
		return &SeaLogistics{containers: param}
	case "air":
		return &AirLogistics{packages: param}
	default:
		return &RoadLogistics{capacity: param}
	}
}

func main() {
	logistics := GetLogistics("sea", 5)
	fmt.Println(logistics.PlanDelivery())
	// Sea delivery planned: Delivering by ship (5 containers), Cost: $250.00
}
```

### Go - Production-Grade Factory with Registration

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

// ============================================================
// PRODUCTION-GRADE FACTORY PATTERN
// Features:
// - Thread-safe registration
// - Metrics collection
// - Health checks
// - Graceful degradation
// ============================================================

// Product interface
type PaymentProcessor interface {
	Process(amount float64) (*PaymentResult, error)
	GetFee(amount float64) float64
	HealthCheck() bool
	Name() string
}

type PaymentResult struct {
	Success       bool
	TransactionID string
	Message       string
	ProcessedAt   time.Time
}

// Concrete products with production features
type CreditCardProcessor struct {
	apiKey    string
	timeout   time.Duration
	retries   int
}

func NewCreditCardProcessor(apiKey string) *CreditCardProcessor {
	return &CreditCardProcessor{
		apiKey:  apiKey,
		timeout: 30 * time.Second,
		retries: 3,
	}
}

func (c *CreditCardProcessor) Name() string { return "credit_card" }

func (c *CreditCardProcessor) Process(amount float64) (*PaymentResult, error) {
	// Production: Would include retry logic, circuit breaker, etc.
	return &PaymentResult{
		Success:       true,
		TransactionID: fmt.Sprintf("CC-%d", time.Now().UnixNano()),
		Message:       fmt.Sprintf("Charged $%.2f via Credit Card", amount),
		ProcessedAt:   time.Now(),
	}, nil
}

func (c *CreditCardProcessor) GetFee(amount float64) float64 {
	return amount*0.029 + 0.30 // 2.9% + $0.30
}

func (c *CreditCardProcessor) HealthCheck() bool {
	// Production: Would ping the payment gateway
	return true
}

type PayPalProcessor struct {
	clientID     string
	clientSecret string
}

func NewPayPalProcessor(clientID, clientSecret string) *PayPalProcessor {
	return &PayPalProcessor{clientID: clientID, clientSecret: clientSecret}
}

func (p *PayPalProcessor) Name() string { return "paypal" }

func (p *PayPalProcessor) Process(amount float64) (*PaymentResult, error) {
	return &PaymentResult{
		Success:       true,
		TransactionID: fmt.Sprintf("PP-%d", time.Now().UnixNano()),
		Message:       fmt.Sprintf("Charged $%.2f via PayPal", amount),
		ProcessedAt:   time.Now(),
	}, nil
}

func (p *PayPalProcessor) GetFee(amount float64) float64 {
	return amount*0.034 + 0.49
}

func (p *PayPalProcessor) HealthCheck() bool {
	return true
}

// ============================================================
// FACTORY WITH PRODUCTION FEATURES
// ============================================================

type ProcessorCreator func() PaymentProcessor

type PaymentFactory struct {
	mu           sync.RWMutex
	creators     map[string]ProcessorCreator
	instances    map[string]PaymentProcessor  // Singleton instances
	metrics      *FactoryMetrics
	fallbackName string
}

type FactoryMetrics struct {
	mu             sync.Mutex
	CreationCounts map[string]int64
	FailureCounts  map[string]int64
	LastHealthy    map[string]time.Time
}

func NewPaymentFactory() *PaymentFactory {
	return &PaymentFactory{
		creators:  make(map[string]ProcessorCreator),
		instances: make(map[string]PaymentProcessor),
		metrics: &FactoryMetrics{
			CreationCounts: make(map[string]int64),
			FailureCounts:  make(map[string]int64),
			LastHealthy:    make(map[string]time.Time),
		},
	}
}

func (f *PaymentFactory) Register(name string, creator ProcessorCreator) {
	f.mu.Lock()
	defer f.mu.Unlock()
	f.creators[name] = creator
}

func (f *PaymentFactory) SetFallback(name string) {
	f.mu.Lock()
	defer f.mu.Unlock()
	f.fallbackName = name
}

func (f *PaymentFactory) Create(name string) (PaymentProcessor, error) {
	f.mu.RLock()

	// Check for cached instance first (singleton behavior)
	if instance, exists := f.instances[name]; exists {
		f.mu.RUnlock()
		return instance, nil
	}

	creator, exists := f.creators[name]
	if !exists {
		// Try fallback
		if f.fallbackName != "" && f.fallbackName != name {
			creator, exists = f.creators[f.fallbackName]
			if exists {
				fmt.Printf("Warning: Unknown processor '%s', using fallback '%s'\n",
					name, f.fallbackName)
			}
		}
	}
	f.mu.RUnlock()

	if !exists {
		f.recordFailure(name)
		return nil, fmt.Errorf("unknown processor: %s", name)
	}

	// Create instance
	instance := creator()

	// Health check before returning
	if !instance.HealthCheck() {
		f.recordFailure(name)
		return nil, fmt.Errorf("processor '%s' failed health check", name)
	}

	// Cache the instance
	f.mu.Lock()
	f.instances[name] = instance
	f.mu.Unlock()

	f.recordCreation(name)
	return instance, nil
}

func (f *PaymentFactory) recordCreation(name string) {
	f.metrics.mu.Lock()
	defer f.metrics.mu.Unlock()
	f.metrics.CreationCounts[name]++
	f.metrics.LastHealthy[name] = time.Now()
}

func (f *PaymentFactory) recordFailure(name string) {
	f.metrics.mu.Lock()
	defer f.metrics.mu.Unlock()
	f.metrics.FailureCounts[name]++
}

func (f *PaymentFactory) GetMetrics() map[string]interface{} {
	f.metrics.mu.Lock()
	defer f.metrics.mu.Unlock()

	return map[string]interface{}{
		"creation_counts": f.metrics.CreationCounts,
		"failure_counts":  f.metrics.FailureCounts,
		"last_healthy":    f.metrics.LastHealthy,
	}
}

func (f *PaymentFactory) ListProcessors() []string {
	f.mu.RLock()
	defer f.mu.RUnlock()

	names := make([]string, 0, len(f.creators))
	for name := range f.creators {
		names = append(names, name)
	}
	return names
}

// ============================================================
// USAGE
// ============================================================

func main() {
	factory := NewPaymentFactory()

	// Register processors with lazy initialization
	factory.Register("credit_card", func() PaymentProcessor {
		return NewCreditCardProcessor("sk_live_xxx")
	})
	factory.Register("paypal", func() PaymentProcessor {
		return NewPayPalProcessor("client_id", "client_secret")
	})

	// Set fallback for graceful degradation
	factory.SetFallback("credit_card")

	// Use factory
	processor, err := factory.Create("credit_card")
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}

	result, _ := processor.Process(100.0)
	fmt.Printf("Result: %+v\n", result)
	fmt.Printf("Fee: $%.2f\n", processor.GetFee(100.0))

	// View metrics
	fmt.Printf("Metrics: %+v\n", factory.GetMetrics())
}
```

---

## Production War Stories

<div class="war-story">
  <div class="war-story-header">
    <span class="war-story-icon">💥</span>
    <span class="war-story-title">The $2M Factory Method Bug</span>
  </div>
  <div class="war-story-content">
    <p><strong>Company:</strong> Large e-commerce platform</p>
    <p><strong>The Setup:</strong> Payment processor factory selected processors based on order value. Orders over $10K used a "premium" processor with better rates.</p>
    <p><strong>The Bug:</strong> The factory checked <code>amount > 10000</code> but the amount was in cents, not dollars. So orders over $100 went to the premium processor which had higher minimums and rejected small orders.</p>
    <p><strong>The Impact:</strong> 3 hours of failed payments, ~$2M in abandoned carts</p>
    <p><strong>The Fix:</strong></p>

```python
# BEFORE (Bug)
def create_processor(amount: int) -> PaymentProcessor:
    if amount > 10000:  # BUG: amount is in cents!
        return PremiumProcessor()
    return StandardProcessor()

# AFTER (Fixed with explicit types)
@dataclass
class Money:
    cents: int

    @property
    def dollars(self) -> Decimal:
        return Decimal(self.cents) / 100

    def __gt__(self, other: 'Money') -> bool:
        return self.cents > other.cents

PREMIUM_THRESHOLD = Money(cents=1_000_000)  # $10,000

def create_processor(amount: Money) -> PaymentProcessor:
    if amount > PREMIUM_THRESHOLD:
        return PremiumProcessor()
    return StandardProcessor()
```

    <p><strong>Lesson:</strong> Never use primitive types for money. Use value objects with explicit units.</p>
  </div>
</div>

<div class="war-story">
  <div class="war-story-header">
    <span class="war-story-icon">🔥</span>
    <span class="war-story-title">The Memory Leak That Killed Black Friday</span>
  </div>
  <div class="war-story-content">
    <p><strong>The Setup:</strong> Factory created new database connection pools for each "type" of query.</p>
    <p><strong>The Problem:</strong> The "type" was accidentally derived from user input (query parameters), creating thousands of unique pools.</p>

```go
// PROBLEMATIC CODE
func (f *QueryFactory) GetPool(queryType string) *sql.DB {
    f.mu.Lock()
    defer f.mu.Unlock()

    if pool, exists := f.pools[queryType]; exists {
        return pool
    }

    // Creates new pool for EVERY unique queryType!
    pool := createPool()
    f.pools[queryType] = pool  // Memory leak: pools never cleaned up
    return pool
}

// Called with user input:
// queryType = request.URL.Query().Get("type")  // Oops!
```

    <p><strong>The Fix:</strong> Validate and normalize factory keys</p>

```go
var validQueryTypes = map[string]bool{
    "read": true, "write": true, "analytics": true,
}

func (f *QueryFactory) GetPool(queryType string) (*sql.DB, error) {
    // Validate input
    if !validQueryTypes[queryType] {
        return nil, fmt.Errorf("invalid query type: %s", queryType)
    }
    // ... rest of logic
}
```
  </div>
</div>

---

## Deep Dive: Factory Method vs Simple Factory vs Abstract Factory

This is the most common source of confusion. Here's the definitive breakdown:

### Simple Factory (Not a GoF Pattern)

```python
# Just a function that creates objects
def create_button(type: str) -> Button:
    if type == "windows":
        return WindowsButton()
    elif type == "mac":
        return MacButton()
    return WebButton()
```

**When to use:** When you need to centralize object creation but don't need subclass customization.

### Factory Method (This Pattern)

```python
class Dialog(ABC):
    @abstractmethod
    def create_button(self) -> Button:  # Subclasses decide
        pass

    def render(self):  # Template method uses the factory
        button = self.create_button()
        return button.render()

class WindowsDialog(Dialog):
    def create_button(self) -> Button:
        return WindowsButton()
```

**When to use:** When a superclass needs to delegate object creation to subclasses while maintaining the algorithm.

### Abstract Factory

```python
class GUIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button:
        pass

    @abstractmethod
    def create_checkbox(self) -> Checkbox:
        pass

    @abstractmethod
    def create_textfield(self) -> TextField:
        pass

class WindowsFactory(GUIFactory):
    def create_button(self) -> Button:
        return WindowsButton()

    def create_checkbox(self) -> Checkbox:
        return WindowsCheckbox()

    def create_textfield(self) -> TextField:
        return WindowsTextField()
```

**When to use:** When you need to create **families** of related objects that must be used together.

### The Relationship Diagram

```
                    Object Creation Patterns
                            │
            ┌───────────────┼───────────────┐
            │               │               │
      Simple Factory   Factory Method  Abstract Factory
            │               │               │
       (function)      (inheritance)   (composition)
            │               │               │
       One product    One product     Multiple products
       Centralized    Deferred to     Families of
       creation       subclasses      related products
```

---

## Expert-Level FAQs

<details>
<summary><strong>Q: How does Factory Method relate to Dependency Injection?</strong></summary>

**A:** They solve similar problems differently:

- **Factory Method:** Subclass decides what to create; compile-time polymorphism
- **DI:** External container decides what to inject; runtime configuration

**In modern apps, prefer DI** unless you specifically need the inheritance-based customization Factory Method provides.

```python
# Factory Method approach
class OrderService:
    def create_payment_processor(self) -> PaymentProcessor:
        raise NotImplementedError

class USOrderService(OrderService):
    def create_payment_processor(self) -> PaymentProcessor:
        return StripeProcessor()

# DI approach (usually better)
class OrderService:
    def __init__(self, payment_processor: PaymentProcessor):
        self.payment_processor = payment_processor

# Container configures what to inject
container.register(PaymentProcessor, StripeProcessor)
```
</details>

<details>
<summary><strong>Q: What's the performance impact of factories?</strong></summary>

**A:** Generally negligible, but be aware of:

1. **Reflection-based factories** can be 10-100x slower than direct construction
2. **Registry lookups** add HashMap overhead (usually O(1), but cache misses matter at scale)
3. **Object pooling** can turn factories into performance optimizations

```go
// Benchmark results (Go, Apple M1):
// Direct construction:      ~15ns/op
// Simple factory:           ~20ns/op  (+33%)
// Registry factory:         ~45ns/op  (+200%)
// Reflection factory:       ~500ns/op (+3200%)

// For hot paths, consider:
var cachedProcessor PaymentProcessor // Pre-create in init

func GetProcessor() PaymentProcessor {
    if cachedProcessor != nil {
        return cachedProcessor
    }
    return factory.Create("default")
}
```
</details>

<details>
<summary><strong>Q: How do I test code that uses Factory Method?</strong></summary>

**A:** Three approaches:

**1. Override in test subclass:**
```python
class TestableDialog(Dialog):
    def create_button(self) -> Button:
        return MockButton()

def test_dialog():
    dialog = TestableDialog()
    # Test with mock button
```

**2. Inject factory:**
```python
class Dialog:
    def __init__(self, button_factory: Callable[[], Button] = None):
        self._button_factory = button_factory or self._default_factory

    def _default_factory(self) -> Button:
        return RealButton()

def test_dialog():
    dialog = Dialog(button_factory=lambda: MockButton())
```

**3. Use test double of the factory itself:**
```python
def test_order_processing(mocker):
    mock_factory = mocker.patch('payments.ProcessorFactory')
    mock_factory.create.return_value = MockProcessor()
```
</details>

<details>
<summary><strong>Q: Factory Method in a microservices architecture?</strong></summary>

**A:** In microservices, Factory Method often appears in:

1. **Service client factories:** Create appropriate client based on target service
2. **Message handler factories:** Create handlers based on message type
3. **Strategy factories:** Select algorithms based on context

```python
class ServiceClientFactory:
    """
    Creates clients with appropriate:
    - Circuit breakers
    - Retry policies
    - Authentication
    - Metrics collection
    """

    def create_client(self, service_name: str) -> ServiceClient:
        config = self.get_config(service_name)

        client = HttpClient(
            base_url=config.url,
            timeout=config.timeout,
        )

        # Wrap with production concerns
        client = CircuitBreakerWrapper(client, config.circuit_breaker)
        client = RetryWrapper(client, config.retry_policy)
        client = MetricsWrapper(client, service_name)

        return client
```

**Caution:** Don't over-engineer. If you're creating simple HTTP clients, a function is fine. Use Factory Method when you need the inheritance-based extension point.
</details>

<details>
<summary><strong>Q: How do I version factories for backward compatibility?</strong></summary>

**A:** This is a real production concern. Strategies:

```python
class ProcessorFactory:
    """
    Versioned factory supporting backward compatibility.
    """

    def create(
        self,
        processor_type: str,
        version: str = "v2"
    ) -> PaymentProcessor:
        # Version-specific creation
        creator_key = f"{processor_type}_{version}"

        if creator_key in self._creators:
            return self._creators[creator_key]()

        # Fallback to latest if version unknown
        latest_key = f"{processor_type}_v2"
        if latest_key in self._creators:
            logger.warning(f"Unknown version {version}, using latest")
            return self._creators[latest_key]()

        raise ValueError(f"Unknown processor: {processor_type}")
```
</details>

---

## Common Mistakes and Anti-Patterns

### Mistake 1: Factory That Knows Too Much

```python
# BAD: Factory has business logic
class OrderFactory:
    def create_order(self, customer_id: str) -> Order:
        customer = self.customer_repo.get(customer_id)  # BAD
        if customer.is_premium:                          # BAD
            discount = self.discount_service.calculate() # BAD
            return PremiumOrder(discount=discount)
        return StandardOrder()

# GOOD: Factory only creates, doesn't fetch or calculate
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
            return Dog()  # Has bark()
        return Fish()     # Has swim() - different interface!

# GOOD: All products implement same interface
class AnimalFactory:
    def create(self, type: str) -> Animal:
        # All return Animal with common interface
        return self._creators[type]()
```

### Mistake 3: Factory Singleton Abuse

```python
# BAD: Global mutable singleton factory
class ProcessorFactory:
    _instance = None
    _processors = {}

    @classmethod
    def instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def register(self, name, creator):
        self._processors[name] = creator  # Global mutable state!

# Tests interfere with each other, can't run in parallel

# GOOD: Inject factory or use per-test instances
def test_processing():
    factory = ProcessorFactory()  # Fresh instance
    factory.register("test", MockProcessor)
    # Test in isolation
```

---

## Modern Alternatives

### Functional Factory (Python 3.10+)

```python
from typing import Protocol, Callable
from functools import partial

class Processor(Protocol):
    def process(self, data: bytes) -> bytes: ...

# Factories are just functions
def create_gzip_processor(level: int = 9) -> Processor:
    return GzipProcessor(level=level)

def create_lz4_processor(block_size: int = 64) -> Processor:
    return LZ4Processor(block_size=block_size)

# Registry is just a dict
processors: dict[str, Callable[[], Processor]] = {
    "gzip": create_gzip_processor,
    "gzip_fast": partial(create_gzip_processor, level=1),
    "lz4": create_lz4_processor,
}

# Usage
processor = processors["gzip_fast"]()
```

### Go Generics Factory (Go 1.18+)

```go
type Factory[T any] struct {
    creators map[string]func() T
}

func NewFactory[T any]() *Factory[T] {
    return &Factory[T]{
        creators: make(map[string]func() T),
    }
}

func (f *Factory[T]) Register(name string, creator func() T) {
    f.creators[name] = creator
}

func (f *Factory[T]) Create(name string) (T, error) {
    creator, ok := f.creators[name]
    if !ok {
        var zero T
        return zero, fmt.Errorf("unknown type: %s", name)
    }
    return creator(), nil
}

// Usage
processorFactory := NewFactory[PaymentProcessor]()
processorFactory.Register("stripe", func() PaymentProcessor {
    return &StripeProcessor{}
})
```

---

## Interview Deep-Dive Questions

**For Senior/Staff Level:**

1. "Walk me through a production system where you used Factory Method. What alternatives did you consider?"

2. "How would you implement a factory that needs to create objects requiring async initialization (database connections, API clients)?"

3. "Describe a scenario where Factory Method would be worse than simple `if/else` construction. Why?"

4. "How do you handle factory evolution when new product types require additional constructor parameters?"

5. "In a distributed system, how would you implement a factory that creates clients for different service versions?"

---

## Related Patterns

- [Abstract Factory](/topic/design-patterns/abstract-factory) - Creates families of products
- [Prototype](/topic/design-patterns/prototype) - Clone existing instances
- [Builder](/topic/design-patterns/builder) - Complex object construction
- [Singleton](/topic/design-patterns/singleton) - Often combined with Factory
- [Strategy](/topic/design-patterns/strategy) - Factories often create strategies
