# Adapter Pattern

## Overview

The Adapter pattern converts the interface of a class into another interface that clients expect. It allows classes with incompatible interfaces to work together by wrapping an object with a compatible interface.

## Key Concepts

### When to Use

- Integrating legacy code with new systems
- Using third-party libraries with different interfaces
- Making incompatible classes work together
- Creating reusable classes that cooperate with unforeseen classes

### Structure

```
┌─────────────────┐         ┌─────────────────┐
│     Client      │────────→│  Target         │
└─────────────────┘         │  Interface      │
                            └────────┬────────┘
                                     │
                            ┌────────┴────────┐
                            │     Adapter     │
                            ├─────────────────┤
                            │ - adaptee       │
                            │ + request()     │
                            └────────┬────────┘
                                     │ wraps
                            ┌────────┴────────┐
                            │    Adaptee      │
                            │ + specificReq() │
                            └─────────────────┘
```

## Implementation

### Python - Payment Gateway Adapter

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from decimal import Decimal
from typing import Dict, Any

# Target interface (what our system expects)
class PaymentGateway(ABC):
    @abstractmethod
    def process_payment(self, amount: Decimal, card_number: str,
                       expiry: str, cvv: str) -> Dict[str, Any]:
        pass

    @abstractmethod
    def refund(self, transaction_id: str, amount: Decimal) -> bool:
        pass


# Adaptee 1: Stripe-like API (different interface)
class StripeAPI:
    def create_charge(self, amount_cents: int, source_token: str) -> Dict:
        return {
            "id": f"ch_{source_token[:8]}",
            "amount": amount_cents,
            "status": "succeeded"
        }

    def create_refund(self, charge_id: str, amount_cents: int) -> Dict:
        return {
            "id": f"rf_{charge_id[:8]}",
            "amount": amount_cents,
            "status": "succeeded"
        }

    def create_token(self, card_number: str, exp_month: str,
                    exp_year: str, cvc: str) -> str:
        return f"tok_{card_number[-4:]}"


# Adaptee 2: PayPal-like API (different interface)
class PayPalAPI:
    def create_order(self, purchase_units: list) -> Dict:
        return {
            "id": f"ORDER-{purchase_units[0]['amount']['value']}",
            "status": "CREATED"
        }

    def capture_order(self, order_id: str) -> Dict:
        return {
            "id": order_id,
            "status": "COMPLETED"
        }

    def refund_capture(self, capture_id: str, amount: Dict) -> Dict:
        return {
            "id": f"REFUND-{capture_id}",
            "status": "COMPLETED"
        }


# Adapter for Stripe
class StripeAdapter(PaymentGateway):
    def __init__(self):
        self._stripe = StripeAPI()

    def process_payment(self, amount: Decimal, card_number: str,
                       expiry: str, cvv: str) -> Dict[str, Any]:
        # Convert amount to cents
        amount_cents = int(amount * 100)

        # Parse expiry
        exp_month, exp_year = expiry.split('/')

        # Create token first
        token = self._stripe.create_token(
            card_number, exp_month, exp_year, cvv
        )

        # Process charge
        result = self._stripe.create_charge(amount_cents, token)

        # Adapt response to our format
        return {
            "success": result["status"] == "succeeded",
            "transaction_id": result["id"],
            "amount": Decimal(result["amount"]) / 100,
            "provider": "stripe"
        }

    def refund(self, transaction_id: str, amount: Decimal) -> bool:
        amount_cents = int(amount * 100)
        result = self._stripe.create_refund(transaction_id, amount_cents)
        return result["status"] == "succeeded"


# Adapter for PayPal
class PayPalAdapter(PaymentGateway):
    def __init__(self):
        self._paypal = PayPalAPI()

    def process_payment(self, amount: Decimal, card_number: str,
                       expiry: str, cvv: str) -> Dict[str, Any]:
        # PayPal uses different structure
        purchase_units = [{
            "amount": {
                "currency_code": "USD",
                "value": str(amount)
            }
        }]

        # Create and capture order
        order = self._paypal.create_order(purchase_units)
        result = self._paypal.capture_order(order["id"])

        return {
            "success": result["status"] == "COMPLETED",
            "transaction_id": result["id"],
            "amount": amount,
            "provider": "paypal"
        }

    def refund(self, transaction_id: str, amount: Decimal) -> bool:
        amount_dict = {
            "currency_code": "USD",
            "value": str(amount)
        }
        result = self._paypal.refund_capture(transaction_id, amount_dict)
        return result["status"] == "COMPLETED"


# Client code - works with any adapter
class PaymentService:
    def __init__(self, gateway: PaymentGateway):
        self._gateway = gateway

    def checkout(self, amount: Decimal, card_info: Dict) -> Dict:
        return self._gateway.process_payment(
            amount,
            card_info["number"],
            card_info["expiry"],
            card_info["cvv"]
        )


# Usage
stripe_gateway = StripeAdapter()
paypal_gateway = PayPalAdapter()

service = PaymentService(stripe_gateway)
result = service.checkout(
    Decimal("99.99"),
    {"number": "4111111111111111", "expiry": "12/25", "cvv": "123"}
)
print(f"Stripe: {result}")

service = PaymentService(paypal_gateway)
result = service.checkout(
    Decimal("49.99"),
    {"number": "4111111111111111", "expiry": "12/25", "cvv": "123"}
)
print(f"PayPal: {result}")
```

### Go - Logger Adapter

```go
package main

import (
	"fmt"
	"log"
	"os"
	"time"
)

// Target interface
type Logger interface {
	Debug(message string)
	Info(message string)
	Warning(message string)
	Error(message string)
}

// Adaptee 1: Standard library logger
type StdLogger struct {
	logger *log.Logger
}

func NewStdLogger() *StdLogger {
	return &StdLogger{
		logger: log.New(os.Stdout, "", log.LstdFlags),
	}
}

func (l *StdLogger) Print(level, message string) {
	l.logger.Printf("[%s] %s", level, message)
}

// Adaptee 2: Third-party structured logger (simulated)
type StructuredLogger struct {
	prefix string
}

func NewStructuredLogger(prefix string) *StructuredLogger {
	return &StructuredLogger{prefix: prefix}
}

func (l *StructuredLogger) Log(level int, msg string, fields map[string]interface{}) {
	fmt.Printf("%s | level=%d | msg=%s | fields=%v\n",
		l.prefix, level, msg, fields)
}

// Adapter for StdLogger
type StdLoggerAdapter struct {
	logger *StdLogger
}

func NewStdLoggerAdapter() *StdLoggerAdapter {
	return &StdLoggerAdapter{
		logger: NewStdLogger(),
	}
}

func (a *StdLoggerAdapter) Debug(message string) {
	a.logger.Print("DEBUG", message)
}

func (a *StdLoggerAdapter) Info(message string) {
	a.logger.Print("INFO", message)
}

func (a *StdLoggerAdapter) Warning(message string) {
	a.logger.Print("WARNING", message)
}

func (a *StdLoggerAdapter) Error(message string) {
	a.logger.Print("ERROR", message)
}

// Adapter for StructuredLogger
type StructuredLoggerAdapter struct {
	logger *StructuredLogger
}

func NewStructuredLoggerAdapter(prefix string) *StructuredLoggerAdapter {
	return &StructuredLoggerAdapter{
		logger: NewStructuredLogger(prefix),
	}
}

func (a *StructuredLoggerAdapter) Debug(message string) {
	a.logger.Log(0, message, map[string]interface{}{
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (a *StructuredLoggerAdapter) Info(message string) {
	a.logger.Log(1, message, map[string]interface{}{
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (a *StructuredLoggerAdapter) Warning(message string) {
	a.logger.Log(2, message, map[string]interface{}{
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

func (a *StructuredLoggerAdapter) Error(message string) {
	a.logger.Log(3, message, map[string]interface{}{
		"timestamp": time.Now().Format(time.RFC3339),
	})
}

// Application using Logger interface
type Application struct {
	logger Logger
}

func NewApplication(logger Logger) *Application {
	return &Application{logger: logger}
}

func (a *Application) Run() {
	a.logger.Info("Application started")
	a.logger.Debug("Debug mode enabled")
	a.logger.Warning("This is a warning")
	a.logger.Error("Something went wrong")
}

func main() {
	// Use standard logger
	app := NewApplication(NewStdLoggerAdapter())
	app.Run()

	fmt.Println()

	// Switch to structured logger
	app = NewApplication(NewStructuredLoggerAdapter("myapp"))
	app.Run()
}
```

### Python - Data Format Adapter

```python
import json
import xml.etree.ElementTree as ET
from abc import ABC, abstractmethod
from typing import Dict, Any

# Target interface
class DataReader(ABC):
    @abstractmethod
    def read(self, source: str) -> Dict[str, Any]:
        pass


# Our system expects JSON
class JSONReader(DataReader):
    def read(self, source: str) -> Dict[str, Any]:
        return json.loads(source)


# Adaptee: XML data source
class XMLDataSource:
    def parse_xml(self, xml_string: str) -> ET.Element:
        return ET.fromstring(xml_string)

    def get_text(self, element: ET.Element, path: str) -> str:
        node = element.find(path)
        return node.text if node is not None else ""


# Adapter for XML
class XMLToJSONAdapter(DataReader):
    def __init__(self):
        self._xml_source = XMLDataSource()

    def read(self, source: str) -> Dict[str, Any]:
        root = self._xml_source.parse_xml(source)
        return self._element_to_dict(root)

    def _element_to_dict(self, element: ET.Element) -> Dict[str, Any]:
        result = {}

        # Add attributes
        result.update(element.attrib)

        # Add child elements
        for child in element:
            if len(child) > 0:
                # Has children, recurse
                result[child.tag] = self._element_to_dict(child)
            else:
                # Leaf node
                result[child.tag] = child.text

        return result


# Usage
xml_data = """
<user id="123">
    <name>John Doe</name>
    <email>john@example.com</email>
    <address>
        <city>New York</city>
        <country>USA</country>
    </address>
</user>
"""

json_data = '{"id": "123", "name": "John Doe", "email": "john@example.com"}'

# Client code works with DataReader interface
def process_user(reader: DataReader, data: str):
    user_dict = reader.read(data)
    print(f"User: {user_dict}")

# Works with JSON
json_reader = JSONReader()
process_user(json_reader, json_data)

# Works with XML (through adapter)
xml_adapter = XMLToJSONAdapter()
process_user(xml_adapter, xml_data)
```

## Common Interview Questions

1. **Class Adapter vs Object Adapter?**
   - Class: Uses inheritance (less flexible)
   - Object: Uses composition (more flexible)

2. **Adapter vs Facade?**
   - Adapter: Makes one interface compatible with another
   - Facade: Simplifies a complex subsystem

3. **Adapter vs Decorator?**
   - Adapter: Changes interface
   - Decorator: Adds behavior without changing interface

## Best Practices

1. **Keep adapters thin** - Only convert, don't add logic
2. **One adaptee per adapter** - Single responsibility
3. **Document mappings** - Clear what converts to what
4. **Use object adapter** - More flexible than class adapter
5. **Consider two-way** - May need to adapt both directions

## Related Patterns

- [Facade](/topic/design-patterns/facade) - Simplify interfaces
- [Decorator](/topic/design-patterns/decorator) - Add behavior
- [Bridge](/topic/design-patterns/bridge) - Separate abstraction from implementation
