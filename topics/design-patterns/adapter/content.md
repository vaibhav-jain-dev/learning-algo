# Adapter Pattern

## Overview

The Adapter pattern converts the interface of a class into another interface that clients expect. It allows classes with incompatible interfaces to work together by wrapping an object with a compatible interface. Think of it as a translator between two systems that speak different languages.

**Difficulty:** Beginner-Intermediate
**Category:** Structural Pattern
**First Documented:** GoF (1994)

---

## Simple Explanation: The Power Adapter Analogy

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h3 style="color: #1e293b; margin-top: 0; font-size: 1.3rem;">Think of a Travel Power Adapter</h3>

<p style="color: #334155; font-size: 1rem; line-height: 1.7;">
When you travel from the US to Europe, your American laptop charger won't fit into European wall outlets. The solution? A power adapter.
</p>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 20px 0;">
<div style="background: #dbeafe; padding: 16px; border-radius: 12px; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: 700;">Your Laptop (Client)</div>
<div style="color: #1e3a8a; font-size: 0.9rem;">Needs power through US-style plug</div>
</div>
<div style="background: #dcfce7; padding: 16px; border-radius: 12px; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: 700;">Adapter</div>
<div style="color: #14532d; font-size: 0.9rem;">Converts US plug to EU socket</div>
</div>
<div style="background: #fef3c7; padding: 16px; border-radius: 12px; border-left: 4px solid #f59e0b;">
<div style="color: #92400e; font-weight: 700;">EU Outlet (Adaptee)</div>
<div style="color: #78350f; font-size: 0.9rem;">Provides power through EU socket</div>
</div>
</div>

<p style="color: #334155; font-size: 1rem; line-height: 1.7;">
The adapter doesn't change how either device works internally. It simply provides a compatible interface so they can work together.
</p>

<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 16px;">
<strong style="color: #0f172a;">The Key Insight:</strong>
<span style="color: #334155;"> The adapter pattern is about making incompatible things work together without modifying either one. You wrap one interface to match what the other expects.</span>
</div>
</div>

---

## Real Company Usage

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">

| Company | How They Use Adapter Pattern |
|---------|------------------------------|
| **Stripe** | Adapters wrap different payment processors (PayPal, Braintree) to a unified interface |
| **AWS SDK** | Adapts various cloud storage APIs (S3, GCS, Azure Blob) to common interface |
| **Django** | Database adapters make different databases (PostgreSQL, MySQL, SQLite) work with same ORM |
| **React** | HOCs (Higher-Order Components) adapt components to provide additional props |
| **Logging Libraries** | Python's logging adapters wrap different output handlers |
| **API Gateways** | Adapt microservice responses to client-expected formats |

</div>

---

## Pattern Structure

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h4 style="color: #1e293b; margin-top: 0; text-align: center; font-size: 1.1rem;">Adapter Pattern Structure (Object Adapter)</h4>

<div style="display: flex; align-items: flex-start; justify-content: center; gap: 24px; flex-wrap: wrap; margin: 24px 0;">

<!-- Client -->
<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; width: 140px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);">
<div style="background: #3b82f6; color: white; padding: 10px; font-weight: 700; text-align: center; border-radius: 10px 10px 0 0; font-size: 0.9rem;">Client</div>
<div style="padding: 12px; color: #1e3a8a; font-size: 0.8rem; text-align: center;">
Uses Target interface
</div>
</div>

<!-- Arrow -->
<div style="display: flex; align-items: center; color: #64748b; font-size: 1.5rem; padding-top: 30px;">
&#8594;
</div>

<!-- Target Interface + Adapter -->
<div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">

<!-- Target Interface -->
<div style="background: #f1f5f9; border: 2px dashed #64748b; border-radius: 12px; width: 180px;">
<div style="background: #64748b; color: white; padding: 10px; font-weight: 700; text-align: center; border-radius: 10px 10px 0 0; font-size: 0.9rem;">Target Interface</div>
<div style="padding: 12px; color: #334155; font-size: 0.8rem;">
<code>+ request()</code>
</div>
</div>

<div style="color: #22c55e; font-size: 1rem;">implements &#9650;</div>

<!-- Adapter -->
<div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; width: 180px; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15);">
<div style="background: #22c55e; color: white; padding: 10px; font-weight: 700; text-align: center; border-radius: 10px 10px 0 0; font-size: 0.9rem;">Adapter</div>
<div style="padding: 12px; color: #166534; font-size: 0.8rem;">
<code>- adaptee</code><br>
<code>+ request()</code>
</div>
</div>

</div>

<!-- Arrow -->
<div style="display: flex; align-items: center; color: #64748b; font-size: 1rem; padding-top: 100px;">
wraps &#8594;
</div>

<!-- Adaptee -->
<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; width: 160px; margin-top: 70px;">
<div style="background: #f59e0b; color: white; padding: 10px; font-weight: 700; text-align: center; border-radius: 10px 10px 0 0; font-size: 0.9rem;">Adaptee</div>
<div style="padding: 12px; color: #92400e; font-size: 0.8rem;">
<code>+ specificRequest()</code>
</div>
</div>

</div>

<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 16px;">
<strong style="color: #0f172a;">Flow:</strong>
<span style="color: #334155;"> Client calls <code>request()</code> on Adapter. Adapter translates and calls <code>specificRequest()</code> on Adaptee. Result is converted back to what Client expects.</span>
</div>
</div>

---

## Two Types of Adapters

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">

<div style="background: #dbeafe; padding: 20px; border-radius: 12px; border-top: 4px solid #3b82f6;">
<h4 style="color: #1e40af; margin-top: 0;">Object Adapter (Recommended)</h4>
<p style="color: #1e3a8a; font-size: 0.9rem; margin-bottom: 12px;">Uses composition - adapter holds reference to adaptee.</p>
<pre style="background: #eff6ff; padding: 12px; border-radius: 6px; font-size: 0.8rem; overflow-x: auto;"><code style="color: #1e3a8a;">class Adapter(Target):
    def __init__(self, adaptee):
        self.adaptee = adaptee

    def request(self):
        return self.adaptee.specific()</code></pre>
<div style="color: #3b82f6; font-size: 0.85rem; margin-top: 12px;">
<strong>Pros:</strong> Flexible, works with adaptee subclasses<br>
<strong>Cons:</strong> Extra indirection
</div>
</div>

<div style="background: #dcfce7; padding: 20px; border-radius: 12px; border-top: 4px solid #22c55e;">
<h4 style="color: #166534; margin-top: 0;">Class Adapter (Less Common)</h4>
<p style="color: #14532d; font-size: 0.9rem; margin-bottom: 12px;">Uses multiple inheritance - adapter IS both target and adaptee.</p>
<pre style="background: #f0fdf4; padding: 12px; border-radius: 6px; font-size: 0.8rem; overflow-x: auto;"><code style="color: #166534;">class Adapter(Target, Adaptee):
    def request(self):
        return self.specific_request()</code></pre>
<div style="color: #22c55e; font-size: 0.85rem; margin-top: 12px;">
<strong>Pros:</strong> No extra object, direct access<br>
<strong>Cons:</strong> Tied to one adaptee class
</div>
</div>

</div>
</div>

---

## When to Use Adapter Pattern

<div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">

### Good Use Cases

1. **Legacy System Integration** - Wrap old APIs to work with new code
2. **Third-Party Libraries** - Adapt external libraries to your interface
3. **API Version Migration** - Support multiple API versions simultaneously
4. **Testing** - Adapt real services to use mock implementations
5. **Data Format Conversion** - XML to JSON, CSV to objects, etc.
6. **Cross-Platform Development** - Unified interface over platform-specific APIs

</div>

---

## Anti-Patterns: When NOT to Use

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">

### Common Mistakes

1. **Overuse** - Don't adapt everything; sometimes direct usage is fine
2. **Business Logic in Adapter** - Adapters should only translate, not add behavior
3. **Deep Adaptation Chains** - Adapting adapters creates complexity
4. **When Facade is Better** - Use Facade to simplify, Adapter to make compatible
5. **Premature Abstraction** - Don't create adapters for hypothetical future needs

</div>

```python
# BAD: Business logic in adapter
class PaymentAdapter:
    def process(self, amount):
        # Validation should NOT be here!
        if amount < 0:
            raise ValueError("Invalid amount")
        # Discount calculation should NOT be here!
        final_amount = amount * 0.9
        return self.adaptee.charge(final_amount)

# GOOD: Adapter only translates
class PaymentAdapter:
    def process(self, amount):
        # Just convert between interfaces
        return self.adaptee.charge(amount)
```

---

## Python Implementation

### Basic Adapter: Payment Gateway Integration

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from decimal import Decimal
from typing import Dict, Any, Optional
from datetime import datetime


@dataclass
class PaymentResult:
    """Unified payment result for our system."""
    success: bool
    transaction_id: str
    amount: Decimal
    currency: str
    provider: str
    timestamp: datetime
    raw_response: Optional[Dict] = None


# Target Interface - what our application expects
class PaymentGateway(ABC):
    """Our standard payment interface."""

    @abstractmethod
    def charge(self, amount: Decimal, currency: str,
               card_token: str) -> PaymentResult:
        """Charge a payment method."""
        pass

    @abstractmethod
    def refund(self, transaction_id: str,
               amount: Optional[Decimal] = None) -> PaymentResult:
        """Refund a transaction (partial or full)."""
        pass

    @abstractmethod
    def get_transaction(self, transaction_id: str) -> Dict[str, Any]:
        """Get transaction details."""
        pass


# Adaptee 1: Stripe-like API (different interface)
class StripeClient:
    """Third-party Stripe-like payment client."""

    def __init__(self, api_key: str):
        self.api_key = api_key

    def create_charge(self, amount_cents: int, currency: str,
                      source: str, metadata: Dict = None) -> Dict:
        """Stripe charges in cents, not decimal dollars."""
        return {
            "id": f"ch_{datetime.now().timestamp()}",
            "amount": amount_cents,
            "currency": currency.lower(),
            "source": source,
            "status": "succeeded",
            "created": int(datetime.now().timestamp())
        }

    def create_refund(self, charge_id: str,
                      amount_cents: Optional[int] = None) -> Dict:
        return {
            "id": f"rf_{datetime.now().timestamp()}",
            "charge": charge_id,
            "amount": amount_cents,
            "status": "succeeded"
        }

    def retrieve_charge(self, charge_id: str) -> Dict:
        return {
            "id": charge_id,
            "amount": 1000,
            "currency": "usd",
            "status": "succeeded"
        }


# Adaptee 2: PayPal-like API (completely different interface)
class PayPalClient:
    """Third-party PayPal-like payment client."""

    def __init__(self, client_id: str, client_secret: str):
        self.client_id = client_id
        self.client_secret = client_secret

    def create_order(self, intent: str, purchase_units: list) -> Dict:
        """PayPal uses orders with purchase units."""
        return {
            "id": f"ORDER-{datetime.now().timestamp()}",
            "intent": intent,
            "status": "CREATED",
            "purchase_units": purchase_units
        }

    def capture_order(self, order_id: str) -> Dict:
        """Capture completes the payment."""
        return {
            "id": order_id,
            "status": "COMPLETED",
            "purchase_units": [{
                "payments": {
                    "captures": [{
                        "id": f"CAP-{datetime.now().timestamp()}",
                        "amount": {"value": "10.00", "currency_code": "USD"}
                    }]
                }
            }]
        }

    def refund_capture(self, capture_id: str, amount: Dict = None) -> Dict:
        return {
            "id": f"REFUND-{datetime.now().timestamp()}",
            "status": "COMPLETED"
        }


# Adapter for Stripe
class StripeAdapter(PaymentGateway):
    """Adapts Stripe's interface to our PaymentGateway interface."""

    def __init__(self, api_key: str):
        self._client = StripeClient(api_key)

    def charge(self, amount: Decimal, currency: str,
               card_token: str) -> PaymentResult:
        # Convert decimal dollars to cents for Stripe
        amount_cents = int(amount * 100)

        # Call Stripe's different method name and signature
        response = self._client.create_charge(
            amount_cents=amount_cents,
            currency=currency,
            source=card_token
        )

        # Convert Stripe's response to our format
        return PaymentResult(
            success=response["status"] == "succeeded",
            transaction_id=response["id"],
            amount=Decimal(response["amount"]) / 100,
            currency=response["currency"].upper(),
            provider="stripe",
            timestamp=datetime.fromtimestamp(response["created"]),
            raw_response=response
        )

    def refund(self, transaction_id: str,
               amount: Optional[Decimal] = None) -> PaymentResult:
        amount_cents = int(amount * 100) if amount else None

        response = self._client.create_refund(
            charge_id=transaction_id,
            amount_cents=amount_cents
        )

        return PaymentResult(
            success=response["status"] == "succeeded",
            transaction_id=response["id"],
            amount=Decimal(response["amount"]) / 100 if response["amount"] else Decimal(0),
            currency="USD",
            provider="stripe",
            timestamp=datetime.now(),
            raw_response=response
        )

    def get_transaction(self, transaction_id: str) -> Dict[str, Any]:
        return self._client.retrieve_charge(transaction_id)


# Adapter for PayPal
class PayPalAdapter(PaymentGateway):
    """Adapts PayPal's interface to our PaymentGateway interface."""

    def __init__(self, client_id: str, client_secret: str):
        self._client = PayPalClient(client_id, client_secret)
        self._capture_ids: Dict[str, str] = {}  # Map order IDs to capture IDs

    def charge(self, amount: Decimal, currency: str,
               card_token: str) -> PaymentResult:
        # PayPal uses a two-step process: create order, then capture

        # Step 1: Create order with PayPal's structure
        purchase_units = [{
            "amount": {
                "currency_code": currency,
                "value": str(amount)
            }
        }]

        order = self._client.create_order(
            intent="CAPTURE",
            purchase_units=purchase_units
        )

        # Step 2: Capture the order
        capture_response = self._client.capture_order(order["id"])

        # Extract capture ID for potential refunds
        capture_id = (capture_response["purchase_units"][0]
                     ["payments"]["captures"][0]["id"])
        self._capture_ids[order["id"]] = capture_id

        return PaymentResult(
            success=capture_response["status"] == "COMPLETED",
            transaction_id=order["id"],
            amount=amount,
            currency=currency,
            provider="paypal",
            timestamp=datetime.now(),
            raw_response=capture_response
        )

    def refund(self, transaction_id: str,
               amount: Optional[Decimal] = None) -> PaymentResult:
        capture_id = self._capture_ids.get(transaction_id, transaction_id)

        amount_dict = None
        if amount:
            amount_dict = {"value": str(amount), "currency_code": "USD"}

        response = self._client.refund_capture(capture_id, amount_dict)

        return PaymentResult(
            success=response["status"] == "COMPLETED",
            transaction_id=response["id"],
            amount=amount or Decimal(0),
            currency="USD",
            provider="paypal",
            timestamp=datetime.now(),
            raw_response=response
        )

    def get_transaction(self, transaction_id: str) -> Dict[str, Any]:
        # PayPal doesn't have direct transaction lookup in this example
        return {"id": transaction_id, "provider": "paypal"}


# Client code - works with any adapter
class PaymentService:
    """Our application's payment service - uses the Target interface."""

    def __init__(self, gateway: PaymentGateway):
        self._gateway = gateway

    def process_payment(self, amount: Decimal, currency: str,
                       card_token: str) -> PaymentResult:
        """Process payment through whatever gateway is configured."""
        result = self._gateway.charge(amount, currency, card_token)

        if result.success:
            print(f"Payment successful: {result.transaction_id}")
        else:
            print(f"Payment failed: {result.transaction_id}")

        return result


# Usage - client code doesn't know which provider is used
print("=== Using Stripe ===")
stripe_gateway = StripeAdapter("sk_test_xxx")
service = PaymentService(stripe_gateway)
result = service.process_payment(Decimal("99.99"), "USD", "tok_visa")
print(f"Provider: {result.provider}, Amount: ${result.amount}")

print("\n=== Using PayPal ===")
paypal_gateway = PayPalAdapter("client_id", "client_secret")
service = PaymentService(paypal_gateway)
result = service.process_payment(Decimal("49.99"), "USD", "card_token")
print(f"Provider: {result.provider}, Amount: ${result.amount}")
```

### Data Format Adapter

```python
from abc import ABC, abstractmethod
from typing import Dict, Any, List
import json
import csv
from io import StringIO


# Target interface
class DataReader(ABC):
    """Our system expects data as list of dictionaries."""

    @abstractmethod
    def read(self, source: str) -> List[Dict[str, Any]]:
        pass


# Native JSON reader (no adapter needed)
class JSONReader(DataReader):
    def read(self, source: str) -> List[Dict[str, Any]]:
        data = json.loads(source)
        # Ensure it's always a list
        return data if isinstance(data, list) else [data]


# Adaptee: XML parser (different interface)
class XMLParser:
    """Third-party XML parser with its own interface."""

    def parse_string(self, xml_string: str) -> 'XMLElement':
        """Returns proprietary XMLElement objects."""
        # Simplified XML parsing
        import xml.etree.ElementTree as ET
        return ET.fromstring(xml_string)


class XMLElement:
    """Proprietary XML element class."""
    pass


# Adapter for XML
class XMLToDataAdapter(DataReader):
    """Adapts XML parser to our DataReader interface."""

    def __init__(self):
        self._parser = XMLParser()

    def read(self, source: str) -> List[Dict[str, Any]]:
        import xml.etree.ElementTree as ET
        root = ET.fromstring(source)
        return self._element_to_dict_list(root)

    def _element_to_dict_list(self, root) -> List[Dict[str, Any]]:
        """Convert XML elements to list of dictionaries."""
        results = []

        for child in root:
            item = dict(child.attrib)  # Get attributes
            for subchild in child:
                item[subchild.tag] = subchild.text
            results.append(item)

        return results if results else [self._single_element_to_dict(root)]

    def _single_element_to_dict(self, element) -> Dict[str, Any]:
        result = dict(element.attrib)
        for child in element:
            result[child.tag] = child.text
        return result


# Adapter for CSV
class CSVToDataAdapter(DataReader):
    """Adapts CSV data to our DataReader interface."""

    def read(self, source: str) -> List[Dict[str, Any]]:
        reader = csv.DictReader(StringIO(source))
        return list(reader)


# Factory for getting appropriate adapter
class DataReaderFactory:
    """Creates appropriate reader based on format."""

    @staticmethod
    def get_reader(format_type: str) -> DataReader:
        readers = {
            "json": JSONReader(),
            "xml": XMLToDataAdapter(),
            "csv": CSVToDataAdapter()
        }
        reader = readers.get(format_type.lower())
        if not reader:
            raise ValueError(f"Unsupported format: {format_type}")
        return reader


# Usage
json_data = '[{"name": "Alice", "age": "30"}, {"name": "Bob", "age": "25"}]'
xml_data = '''<users>
    <user><name>Alice</name><age>30</age></user>
    <user><name>Bob</name><age>25</age></user>
</users>'''
csv_data = '''name,age
Alice,30
Bob,25'''

for format_type, data in [("json", json_data), ("xml", xml_data), ("csv", csv_data)]:
    reader = DataReaderFactory.get_reader(format_type)
    result = reader.read(data)
    print(f"{format_type.upper()}: {result}")
```

---

## Adapter vs Related Patterns

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">

<div style="background: #dbeafe; padding: 20px; border-radius: 12px; border-top: 4px solid #3b82f6;">
<h4 style="color: #1e40af; margin-top: 0;">Adapter</h4>
<p style="color: #1e3a8a; font-size: 0.9rem; margin-bottom: 12px;">Makes incompatible interfaces compatible.</p>
<div style="background: #eff6ff; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
<strong style="color: #1e40af;">Changes:</strong> <span style="color: #1e3a8a;">Interface only</span><br>
<strong style="color: #1e40af;">Goal:</strong> <span style="color: #1e3a8a;">Compatibility</span>
</div>
</div>

<div style="background: #dcfce7; padding: 20px; border-radius: 12px; border-top: 4px solid #22c55e;">
<h4 style="color: #166534; margin-top: 0;">Decorator</h4>
<p style="color: #14532d; font-size: 0.9rem; margin-bottom: 12px;">Adds behavior without changing interface.</p>
<div style="background: #f0fdf4; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
<strong style="color: #166534;">Changes:</strong> <span style="color: #14532d;">Behavior</span><br>
<strong style="color: #166534;">Goal:</strong> <span style="color: #14532d;">Enhancement</span>
</div>
</div>

<div style="background: #fef3c7; padding: 20px; border-radius: 12px; border-top: 4px solid #f59e0b;">
<h4 style="color: #92400e; margin-top: 0;">Facade</h4>
<p style="color: #78350f; font-size: 0.9rem; margin-bottom: 12px;">Simplifies complex subsystem interface.</p>
<div style="background: #fffbeb; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
<strong style="color: #92400e;">Changes:</strong> <span style="color: #78350f;">Complexity level</span><br>
<strong style="color: #92400e;">Goal:</strong> <span style="color: #78350f;">Simplification</span>
</div>
</div>

</div>

<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 20px;">
<strong style="color: #0f172a;">Quick Decision Guide:</strong>
<ul style="color: #334155; margin-bottom: 0;">
<li><strong>Adapter:</strong> "I need to use this class, but it has the wrong interface"</li>
<li><strong>Decorator:</strong> "I need to add features to this class"</li>
<li><strong>Facade:</strong> "I need to simplify this complex system"</li>
</ul>
</div>
</div>

---

## Interview Questions

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">

### Conceptual Questions

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q1: What's the difference between Object Adapter and Class Adapter?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
<strong>Object Adapter (Composition):</strong>
<ul>
<li>Holds a reference to the adaptee</li>
<li>More flexible - can adapt any subclass of adaptee</li>
<li>Preferred in most languages</li>
</ul>

<strong>Class Adapter (Inheritance):</strong>
<ul>
<li>Inherits from both target and adaptee</li>
<li>Requires multiple inheritance</li>
<li>Direct access to adaptee methods (no delegation)</li>
<li>Less flexible - tied to specific adaptee class</li>
</ul>

<strong>Recommendation:</strong> Use Object Adapter unless you have a specific reason to use inheritance.
</div>
</details>

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q2: When would you use Adapter vs Facade?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
<strong>Adapter:</strong> When you have one interface but need another specific interface.
<br>Example: Using a PayPal SDK but your code expects Stripe-like methods.
<br><br>
<strong>Facade:</strong> When you want to simplify a complex subsystem.
<br>Example: One method to send email that internally handles SMTP config, templates, and retry logic.
<br><br>
<strong>Key difference:</strong> Adapter converts interface A to interface B. Facade creates a new simplified interface over complexity.
</div>
</details>

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q3: Can an Adapter work with multiple adaptees?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
Yes, but it depends on the use case:
<br><br>
<strong>Single adaptee per adapter (standard):</strong> Each adapter wraps one specific service.
<br><br>
<strong>Multiple adaptees (composite adapter):</strong> Useful for fallback scenarios:
<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px; margin-top: 8px;">
class FallbackPaymentAdapter(PaymentGateway):
    def __init__(self, primary, fallback):
        self.primary = primary
        self.fallback = fallback

    def charge(self, amount):
        try:
            return self.primary.charge(amount)
        except Exception:
            return self.fallback.charge(amount)
</pre>
However, be careful - this adds complexity and may violate single responsibility.
</div>
</details>

### Coding Questions

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q4: Implement an adapter for a legacy logging system</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px; overflow-x: auto;">
# Target interface (modern)
class Logger(ABC):
    @abstractmethod
    def log(self, level: str, message: str): pass

# Legacy system (adaptee)
class OldFileLogger:
    def write_to_file(self, text: str, severity: int):
        # severity: 1=DEBUG, 2=INFO, 3=WARN, 4=ERROR
        print(f"[{severity}] {text}")

# Adapter
class LegacyLoggerAdapter(Logger):
    LEVEL_MAP = {"DEBUG": 1, "INFO": 2, "WARN": 3, "ERROR": 4}

    def __init__(self, legacy_logger: OldFileLogger):
        self._legacy = legacy_logger

    def log(self, level: str, message: str):
        severity = self.LEVEL_MAP.get(level.upper(), 2)
        self._legacy.write_to_file(message, severity)

# Usage
legacy = OldFileLogger()
logger = LegacyLoggerAdapter(legacy)
logger.log("ERROR", "Something went wrong")
</pre>
</div>
</details>

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q5: How would you test an adapter?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
<strong>Testing strategies:</strong>
<ol>
<li><strong>Mock the adaptee:</strong> Verify adapter calls correct adaptee methods</li>
<li><strong>Test translation:</strong> Verify data is correctly converted</li>
<li><strong>Integration test:</strong> Test with real adaptee (sparingly)</li>
</ol>
<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px;">
def test_stripe_adapter_converts_amount():
    # Mock the Stripe client
    mock_client = Mock()
    mock_client.create_charge.return_value = {
        "id": "ch_123", "status": "succeeded",
        "amount": 9999, "currency": "usd", "created": 1234567890
    }

    adapter = StripeAdapter.__new__(StripeAdapter)
    adapter._client = mock_client

    result = adapter.charge(Decimal("99.99"), "USD", "tok_xxx")

    # Verify conversion: $99.99 -> 9999 cents
    mock_client.create_charge.assert_called_with(
        amount_cents=9999,
        currency="USD",
        source="tok_xxx"
    )
    assert result.amount == Decimal("99.99")
</pre>
</div>
</details>

</div>

---

## Common Mistakes

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #fecaca;">

### Mistake 1: Adding Business Logic to Adapter

```python
# BAD: Adapter does more than translate
class PaymentAdapter:
    def charge(self, amount):
        # DON'T: Apply business rules in adapter
        if self.user.is_premium:
            amount *= 0.9
        # DON'T: Add caching
        if amount in self._cache:
            return self._cache[amount]
        return self.adaptee.process(amount)

# GOOD: Adapter only translates
class PaymentAdapter:
    def charge(self, amount):
        # Just convert interface - nothing else
        return self.adaptee.process_payment(float(amount))
```

### Mistake 2: Adapter Chains

```python
# BAD: Adapting an adapter
class XMLAdapter:
    def parse(self, data):
        return xml_to_dict(data)

class XMLToJSONAdapter:
    def __init__(self, xml_adapter):
        self.adapter = xml_adapter  # Adapter wrapping adapter!

# GOOD: Direct adaptation
class XMLToJSONAdapter:
    def parse(self, data):
        # Convert directly
        return json.dumps(xml_to_dict(data))
```

### Mistake 3: Incomplete Adaptation

```python
# BAD: Partial interface implementation
class IncompleteAdapter(PaymentGateway):
    def charge(self, amount):
        return self.adaptee.pay(amount)

    def refund(self, transaction_id):
        raise NotImplementedError("Refund not supported")  # Surprise!

# GOOD: Full implementation or explicit interface
class CompleteAdapter(PaymentGateway):
    def charge(self, amount):
        return self.adaptee.pay(amount)

    def refund(self, transaction_id):
        # Implement properly or use different interface
        return self.adaptee.reverse_transaction(transaction_id)
```

</div>

---

## Key Takeaways

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #93c5fd;">

1. **Adapter = Interface Translator** - Converts one interface to another expected interface

2. **Prefer Object Adapter** - Use composition over inheritance for flexibility

3. **Keep Adapters Thin** - Only translate, don't add business logic

4. **One Adaptee Per Adapter** - Maintain single responsibility

5. **Don't Adapt Everything** - Use when there's genuine interface mismatch

6. **Test the Translation** - Verify data converts correctly in both directions

</div>

---

## Related Patterns

- [Facade](/topic/design-patterns/facade) - Simplifies complex interfaces
- [Decorator](/topic/design-patterns/decorator) - Adds behavior without changing interface
- [Bridge](/topic/design-patterns/bridge) - Separates abstraction from implementation
- [Proxy](/topic/design-patterns/proxy) - Controls access to an object
