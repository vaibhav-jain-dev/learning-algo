# Factory Method Pattern

## Overview

The Factory Method pattern defines an interface for creating objects, but lets subclasses decide which class to instantiate. It promotes loose coupling by eliminating the need to bind application-specific classes into your code.

## Key Concepts

### When to Use

- When you don't know ahead of time what class you need
- When you want subclasses to specify objects created
- When you want to localize knowledge of which class gets created
- When creating objects requires complex logic

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

### Python - Parameterized Factory Method

```python
from abc import ABC, abstractmethod
from typing import Dict, Type

class Document(ABC):
    @abstractmethod
    def open(self) -> str:
        pass

    @abstractmethod
    def save(self) -> str:
        pass


class PDFDocument(Document):
    def open(self) -> str:
        return "Opening PDF document"

    def save(self) -> str:
        return "Saving PDF document"


class WordDocument(Document):
    def open(self) -> str:
        return "Opening Word document"

    def save(self) -> str:
        return "Saving Word document"


class ExcelDocument(Document):
    def open(self) -> str:
        return "Opening Excel spreadsheet"

    def save(self) -> str:
        return "Saving Excel spreadsheet"


class DocumentFactory:
    _creators: Dict[str, Type[Document]] = {}

    @classmethod
    def register(cls, doc_type: str, creator: Type[Document]):
        cls._creators[doc_type] = creator

    @classmethod
    def create(cls, doc_type: str) -> Document:
        creator = cls._creators.get(doc_type)
        if not creator:
            raise ValueError(f"Unknown document type: {doc_type}")
        return creator()


# Register document types
DocumentFactory.register("pdf", PDFDocument)
DocumentFactory.register("word", WordDocument)
DocumentFactory.register("excel", ExcelDocument)

# Usage
doc = DocumentFactory.create("pdf")
print(doc.open())  # "Opening PDF document"
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

### Go - Factory with Registration

```go
package main

import (
	"fmt"
	"sync"
)

// Product interface
type PaymentProcessor interface {
	Process(amount float64) string
	GetFee(amount float64) float64
}

// Concrete products
type CreditCardProcessor struct{}

func (c *CreditCardProcessor) Process(amount float64) string {
	return fmt.Sprintf("Processing $%.2f via Credit Card", amount)
}

func (c *CreditCardProcessor) GetFee(amount float64) float64 {
	return amount * 0.029 + 0.30 // 2.9% + $0.30
}

type PayPalProcessor struct{}

func (p *PayPalProcessor) Process(amount float64) string {
	return fmt.Sprintf("Processing $%.2f via PayPal", amount)
}

func (p *PayPalProcessor) GetFee(amount float64) float64 {
	return amount * 0.034 + 0.49 // 3.4% + $0.49
}

type CryptoProcessor struct{}

func (c *CryptoProcessor) Process(amount float64) string {
	return fmt.Sprintf("Processing $%.2f via Cryptocurrency", amount)
}

func (c *CryptoProcessor) GetFee(amount float64) float64 {
	return amount * 0.01 // 1%
}

// Factory with registration
type PaymentFactory struct {
	mu       sync.RWMutex
	creators map[string]func() PaymentProcessor
}

func NewPaymentFactory() *PaymentFactory {
	return &PaymentFactory{
		creators: make(map[string]func() PaymentProcessor),
	}
}

func (f *PaymentFactory) Register(name string, creator func() PaymentProcessor) {
	f.mu.Lock()
	defer f.mu.Unlock()
	f.creators[name] = creator
}

func (f *PaymentFactory) Create(name string) (PaymentProcessor, error) {
	f.mu.RLock()
	defer f.mu.RUnlock()

	creator, exists := f.creators[name]
	if !exists {
		return nil, fmt.Errorf("unknown processor: %s", name)
	}
	return creator(), nil
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

func main() {
	factory := NewPaymentFactory()

	// Register processors
	factory.Register("credit_card", func() PaymentProcessor {
		return &CreditCardProcessor{}
	})
	factory.Register("paypal", func() PaymentProcessor {
		return &PayPalProcessor{}
	})
	factory.Register("crypto", func() PaymentProcessor {
		return &CryptoProcessor{}
	})

	// Use factory
	processor, _ := factory.Create("credit_card")
	amount := 100.0

	fmt.Println(processor.Process(amount))
	fmt.Printf("Fee: $%.2f\n", processor.GetFee(amount))

	// List available processors
	fmt.Println("Available:", factory.ListProcessors())
}
```

## Real-World Examples

### Database Connection Factory

```python
from abc import ABC, abstractmethod
from typing import Any, Dict

class DatabaseConnection(ABC):
    @abstractmethod
    def connect(self) -> None:
        pass

    @abstractmethod
    def execute(self, query: str) -> Any:
        pass

    @abstractmethod
    def close(self) -> None:
        pass


class PostgreSQLConnection(DatabaseConnection):
    def __init__(self, config: Dict[str, str]):
        self.config = config
        self.conn = None

    def connect(self) -> None:
        # Simulate connection
        self.conn = f"PostgreSQL://{self.config['host']}:{self.config['port']}"

    def execute(self, query: str) -> Any:
        return f"Executing on PostgreSQL: {query}"

    def close(self) -> None:
        self.conn = None


class MySQLConnection(DatabaseConnection):
    def __init__(self, config: Dict[str, str]):
        self.config = config
        self.conn = None

    def connect(self) -> None:
        self.conn = f"MySQL://{self.config['host']}:{self.config['port']}"

    def execute(self, query: str) -> Any:
        return f"Executing on MySQL: {query}"

    def close(self) -> None:
        self.conn = None


class DatabaseFactory:
    @staticmethod
    def create(db_type: str, config: Dict[str, str]) -> DatabaseConnection:
        factories = {
            "postgresql": PostgreSQLConnection,
            "mysql": MySQLConnection,
        }

        factory = factories.get(db_type.lower())
        if not factory:
            raise ValueError(f"Unsupported database: {db_type}")

        return factory(config)


# Usage
config = {"host": "localhost", "port": "5432", "database": "mydb"}
db = DatabaseFactory.create("postgresql", config)
db.connect()
result = db.execute("SELECT * FROM users")
print(result)
```

## Common Interview Questions

1. **Difference between Factory Method and Abstract Factory?**
   - Factory Method: Creates one product
   - Abstract Factory: Creates families of related products

2. **When to use Factory Method vs Simple Factory?**
   - Simple Factory: Just a function, less flexible
   - Factory Method: Uses inheritance, more extensible

3. **How does Factory Method promote loose coupling?**
   - Client code uses interface, not concrete classes
   - New products can be added without changing client

## Best Practices

1. **Use interfaces** - Return abstract types, not concrete
2. **Single responsibility** - Each factory creates one type
3. **Registration** - Allow dynamic product registration
4. **Configuration** - Use config to determine which factory
5. **Testing** - Easy to mock factory for tests

## Related Patterns

- [Abstract Factory](/topic/design-patterns/abstract-factory) - Creates families of products
- [Prototype](/topic/design-patterns/prototype) - Clone existing instances
- [Builder](/topic/design-patterns/builder) - Complex object construction
