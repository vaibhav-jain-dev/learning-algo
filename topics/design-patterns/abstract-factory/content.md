# Abstract Factory Pattern

## Overview

The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. Think of it as a "factory of factories" - it creates objects that belong together and ensures they're compatible with each other. This pattern is one of the most powerful creational patterns and is essential for building systems that need to support multiple product variants.

## Why This Matters (Real-World Context)

**Why do companies use this pattern?**

Abstract Factory is crucial when your application needs to work with multiple families of products that must be used together consistently. It prevents the nightmare scenario of mixing incompatible components.

**Real-world examples:**

- **Spring Framework** uses Abstract Factory through `BeanFactory` and `ApplicationContext` to create families of beans that work together in different contexts (web, standalone, test environments)
- **Java AWT/Swing** uses this pattern to create UI components that look native on different operating systems (Windows, macOS, Linux)
- **AWS SDK** provides factory interfaces to create service clients that are configured for specific regions and authentication methods
- **React Native** uses Abstract Factory concepts internally to create platform-specific components (iOS vs Android)

**What problems does it solve?**

1. **Consistency** - Ensures all created objects belong to the same family
2. **Decoupling** - Client code doesn't depend on concrete classes
3. **Configurability** - Easy to switch entire product families at runtime
4. **Scalability** - Adding new product families doesn't require changing existing code

## Core Concepts

Imagine you're building with LEGO sets. Each LEGO set (like "City," "Star Wars," or "Harry Potter") has its own unique pieces that are designed to work together. You wouldn't mix a Star Wars lightsaber piece with a LEGO City police station - they belong to different "families."

The Abstract Factory is like having different LEGO set boxes. When you open the "Star Wars" box (factory), everything inside is Star Wars themed. When you open the "City" box (different factory), everything is City themed. The beauty is that your instructions (client code) just say "get a vehicle" or "get a figure" - and whichever box you're using gives you the right themed piece.

**Key participants:**

1. **Abstract Factory** - The interface declaring creation methods for each product type
2. **Concrete Factory** - Implements creation methods for a specific family
3. **Abstract Product** - Interface for a type of product
4. **Concrete Product** - Specific implementation belonging to a family
5. **Client** - Uses only abstract interfaces, unaware of concrete classes

## How It Works

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin: 0 0 20px 0; text-align: center; font-size: 18px;">Abstract Factory Structure</h4>

  <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 24px; align-items: flex-start;">

    <!-- Abstract Factory -->
    <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 10px; padding: 16px; min-width: 200px; text-align: center;">
      <div style="color: #1e40af; font-weight: 700; font-size: 14px; border-bottom: 1px solid #3b82f6; padding-bottom: 8px; margin-bottom: 8px;">AbstractFactory</div>
      <div style="color: #1e293b; font-size: 12px; font-family: monospace;">
        + createProductA()<br>
        + createProductB()
      </div>
    </div>

    <!-- Arrow -->
    <div style="display: flex; flex-direction: column; justify-content: center; color: #64748b; font-size: 24px; padding-top: 20px;">
      <span>implements</span>
      <span style="font-size: 32px;">^</span>
    </div>

    <!-- Concrete Factories Container -->
    <div style="display: flex; flex-direction: column; gap: 16px;">

      <!-- Concrete Factory 1 -->
      <div style="display: flex; align-items: center; gap: 16px;">
        <div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 10px; padding: 12px 16px; text-align: center;">
          <div style="color: #166534; font-weight: 600; font-size: 13px;">ConcreteFactory1</div>
          <div style="color: #15803d; font-size: 11px;">(Windows UI)</div>
        </div>
        <div style="color: #22c55e; font-size: 20px;">--creates--></div>
        <div style="display: flex; gap: 8px;">
          <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 6px; padding: 8px 12px; color: #166534; font-size: 11px;">WinButton</div>
          <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 6px; padding: 8px 12px; color: #166534; font-size: 11px;">WinCheckbox</div>
        </div>
      </div>

      <!-- Concrete Factory 2 -->
      <div style="display: flex; align-items: center; gap: 16px;">
        <div style="background: #f3e8ff; border: 2px solid #a855f7; border-radius: 10px; padding: 12px 16px; text-align: center;">
          <div style="color: #6b21a8; font-weight: 600; font-size: 13px;">ConcreteFactory2</div>
          <div style="color: #7c3aed; font-size: 11px;">(macOS UI)</div>
        </div>
        <div style="color: #a855f7; font-size: 20px;">--creates--></div>
        <div style="display: flex; gap: 8px;">
          <div style="background: #faf5ff; border: 1px solid #d8b4fe; border-radius: 6px; padding: 8px 12px; color: #6b21a8; font-size: 11px;">MacButton</div>
          <div style="background: #faf5ff; border: 1px solid #d8b4fe; border-radius: 6px; padding: 8px 12px; color: #6b21a8; font-size: 11px;">MacCheckbox</div>
        </div>
      </div>

    </div>
  </div>

  <!-- Client -->
  <div style="margin-top: 24px; padding-top: 16px; border-top: 2px dashed #cbd5e1;">
    <div style="display: flex; justify-content: center; align-items: center; gap: 16px; flex-wrap: wrap;">
      <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 10px; padding: 12px 20px; text-align: center;">
        <div style="color: #92400e; font-weight: 600; font-size: 13px;">Client</div>
        <div style="color: #b45309; font-size: 11px;">Uses AbstractFactory</div>
      </div>
      <div style="color: #64748b; font-size: 12px; max-width: 300px; text-align: center;">
        Client only knows about abstract interfaces. Factory selection determines which family of products is created.
      </div>
    </div>
  </div>
</div>

**Step-by-step flow:**

1. **Define abstract products** - Create interfaces for each type of product (Button, Checkbox, etc.)
2. **Create concrete products** - Implement products for each family (WindowsButton, MacButton, etc.)
3. **Define abstract factory** - Interface with creation methods for each product type
4. **Implement concrete factories** - Each factory creates products from one family
5. **Client uses factory** - Client receives a factory and uses it to create products without knowing concrete types

## Real-Life Usage Example

**Where this pattern is used in popular frameworks/libraries:**

### Java Swing UI Toolkit
```java
// Java uses Abstract Factory for cross-platform UI
UIManager.setLookAndFeel("javax.swing.plaf.metal.MetalLookAndFeel");
// Now all JButton, JTextField, etc. will have Metal look

UIManager.setLookAndFeel("com.sun.java.swing.plaf.windows.WindowsLookAndFeel");
// Now all components will have Windows look
```

### Spring Framework
```java
// ApplicationContext is an Abstract Factory
ApplicationContext context = new ClassPathXmlApplicationContext("beans.xml");

// Different contexts create beans differently
ApplicationContext webContext = new WebApplicationContext();
ApplicationContext testContext = new TestApplicationContext();
```

### Database Drivers (JDBC)
```java
// DriverManager acts as Abstract Factory
Connection conn = DriverManager.getConnection("jdbc:mysql://...");  // MySQL family
Connection conn = DriverManager.getConnection("jdbc:postgresql://..."); // PostgreSQL family
```

**Why they chose this pattern:**

- **Swing**: Needed to create consistent UI components across different operating systems without rewriting client code
- **Spring**: Enables different bean instantiation strategies (singleton, prototype) and scopes (request, session) without changing application code
- **JDBC**: Allows applications to switch databases without code changes, as each driver provides compatible implementations

## What to Watch Out For (Common Pitfalls)

1. **Over-engineering for single families**
   - If you only have one product family and don't anticipate more, Abstract Factory adds unnecessary complexity
   - Use simple Factory Method instead

2. **Adding new products is expensive**
   - Adding a new product type (e.g., TextInput) requires modifying ALL factories
   - This can violate the Open/Closed Principle
   - Consider if your product types are truly stable before using this pattern

3. **Mixing products from different families**
   - The pattern doesn't enforce family consistency at compile-time
   - A careless developer could still mix products manually
   - Consider using dependency injection to prevent this

4. **Factory proliferation**
   - Creating too many small factories makes code hard to navigate
   - Group related products logically

5. **Ignoring the Liskov Substitution Principle**
   - All products in a family must truly be interchangeable
   - Don't create products that behave dramatically differently

6. **Not using dependency injection**
   - Hardcoding factory selection defeats the purpose
   - Always inject factories to enable testing and configuration

7. **Confusing with Factory Method**
   - Factory Method: Single method, single product
   - Abstract Factory: Multiple methods, multiple products that form a family

## Interview Deep Dive

### Common Interview Questions

**Q1: When would you choose Abstract Factory over Factory Method?**
> Use Abstract Factory when you need to create families of related objects that must work together. Use Factory Method when you only need to create one type of object. Abstract Factory is essentially multiple Factory Methods organized together.

**Q2: How does Abstract Factory support the Open/Closed Principle?**
> You can add new product families (new concrete factories) without modifying existing client code. However, adding new product types requires modifying all factories, which does violate OCP. This is a known trade-off.

**Q3: Can Abstract Factory be combined with other patterns?**
> Yes! Factories are often implemented as Singletons. Factory Methods can be used inside Abstract Factories. Prototype can be used if products are complex to create. Builder can construct products step-by-step within the factory.

### How to Explain This in 2 Minutes

"Abstract Factory is a pattern for creating families of related objects without specifying concrete classes.

Think of it like a car manufacturing plant. A Toyota plant produces Toyota engines, Toyota transmissions, and Toyota chassis - all designed to work together. A Honda plant produces Honda parts - also compatible within their family.

The client code just says 'give me an engine' and 'give me a transmission.' Which factory you're connected to determines whether you get Toyota or Honda parts. The beauty is you can switch the entire family by just changing which factory you use, and you're guaranteed all parts will be compatible.

This is crucial for cross-platform applications, theming systems, and any situation where you have multiple variants of a complete system."

### Follow-up Questions Interviewers Ask

1. "How would you handle a situation where 90% of products are the same across families?"
   - Use Template Method or default implementations in abstract products

2. "What if products need different constructor parameters across families?"
   - Use Builder pattern in conjunction, or pass configuration objects

3. "How do you test code that uses Abstract Factory?"
   - Create a TestFactory that returns mock products
   - Use dependency injection to swap factories

### When NOT to Use This Pattern

- When you have only one product family with no plans to add more
- When products don't actually need to work together as a family
- When the product types change frequently (adding products is costly)
- When simpler patterns (Factory Method, simple constructors) suffice
- When dependency injection frameworks handle object creation for you

## Code Implementation

### Python - Cloud Infrastructure Factory

```python
from abc import ABC, abstractmethod
from typing import Dict, Any
from dataclasses import dataclass

# ============================================
# ABSTRACT PRODUCTS
# ============================================

class Database(ABC):
    """Abstract product for database services"""

    @abstractmethod
    def connect(self) -> str:
        """Establish connection to database"""
        pass

    @abstractmethod
    def query(self, sql: str) -> Dict[str, Any]:
        """Execute a query and return results"""
        pass

    @abstractmethod
    def get_connection_string(self) -> str:
        """Get the connection string for this database"""
        pass


class Cache(ABC):
    """Abstract product for caching services"""

    @abstractmethod
    def get(self, key: str) -> Any:
        """Retrieve value from cache"""
        pass

    @abstractmethod
    def set(self, key: str, value: Any, ttl: int = 3600) -> bool:
        """Store value in cache with TTL"""
        pass

    @abstractmethod
    def delete(self, key: str) -> bool:
        """Remove value from cache"""
        pass


class MessageQueue(ABC):
    """Abstract product for message queue services"""

    @abstractmethod
    def publish(self, topic: str, message: Dict) -> str:
        """Publish message to topic, return message ID"""
        pass

    @abstractmethod
    def subscribe(self, topic: str, callback) -> None:
        """Subscribe to topic with callback handler"""
        pass


# ============================================
# AWS PRODUCT FAMILY
# ============================================

class AWSDynamoDB(Database):
    """AWS DynamoDB implementation"""

    def __init__(self, region: str = "us-east-1"):
        self.region = region
        self.connected = False

    def connect(self) -> str:
        self.connected = True
        return f"Connected to DynamoDB in {self.region}"

    def query(self, sql: str) -> Dict[str, Any]:
        # DynamoDB uses PartiQL, but we simulate SQL-like interface
        return {"service": "DynamoDB", "query": sql, "results": []}

    def get_connection_string(self) -> str:
        return f"dynamodb://{self.region}.amazonaws.com"


class AWSElastiCache(Cache):
    """AWS ElastiCache (Redis) implementation"""

    def __init__(self, cluster_id: str = "main-cache"):
        self.cluster_id = cluster_id
        self._store: Dict[str, Any] = {}

    def get(self, key: str) -> Any:
        return self._store.get(key)

    def set(self, key: str, value: Any, ttl: int = 3600) -> bool:
        self._store[key] = value
        print(f"ElastiCache SET {key} (TTL: {ttl}s)")
        return True

    def delete(self, key: str) -> bool:
        if key in self._store:
            del self._store[key]
            return True
        return False


class AWSSQS(MessageQueue):
    """AWS SQS implementation"""

    def __init__(self, queue_prefix: str = "prod"):
        self.queue_prefix = queue_prefix
        self._message_id = 0

    def publish(self, topic: str, message: Dict) -> str:
        self._message_id += 1
        msg_id = f"sqs-{self._message_id}"
        print(f"SQS: Published to {self.queue_prefix}-{topic}: {message}")
        return msg_id

    def subscribe(self, topic: str, callback) -> None:
        print(f"SQS: Subscribed to {self.queue_prefix}-{topic}")


# ============================================
# GCP PRODUCT FAMILY
# ============================================

class GCPFirestore(Database):
    """Google Cloud Firestore implementation"""

    def __init__(self, project_id: str = "my-project"):
        self.project_id = project_id
        self.connected = False

    def connect(self) -> str:
        self.connected = True
        return f"Connected to Firestore project: {self.project_id}"

    def query(self, sql: str) -> Dict[str, Any]:
        return {"service": "Firestore", "query": sql, "results": []}

    def get_connection_string(self) -> str:
        return f"firestore://{self.project_id}.firebaseio.com"


class GCPMemorystore(Cache):
    """Google Cloud Memorystore implementation"""

    def __init__(self, instance_id: str = "cache-instance"):
        self.instance_id = instance_id
        self._store: Dict[str, Any] = {}

    def get(self, key: str) -> Any:
        return self._store.get(key)

    def set(self, key: str, value: Any, ttl: int = 3600) -> bool:
        self._store[key] = value
        print(f"Memorystore SET {key} (TTL: {ttl}s)")
        return True

    def delete(self, key: str) -> bool:
        return self._store.pop(key, None) is not None


class GCPPubSub(MessageQueue):
    """Google Cloud Pub/Sub implementation"""

    def __init__(self, project_id: str = "my-project"):
        self.project_id = project_id
        self._message_id = 0

    def publish(self, topic: str, message: Dict) -> str:
        self._message_id += 1
        msg_id = f"pubsub-{self._message_id}"
        print(f"Pub/Sub: Published to projects/{self.project_id}/topics/{topic}")
        return msg_id

    def subscribe(self, topic: str, callback) -> None:
        print(f"Pub/Sub: Created subscription for {topic}")


# ============================================
# ABSTRACT FACTORY
# ============================================

class CloudFactory(ABC):
    """Abstract factory for cloud infrastructure"""

    @abstractmethod
    def create_database(self) -> Database:
        """Create a database service"""
        pass

    @abstractmethod
    def create_cache(self) -> Cache:
        """Create a cache service"""
        pass

    @abstractmethod
    def create_message_queue(self) -> MessageQueue:
        """Create a message queue service"""
        pass

    @abstractmethod
    def get_provider_name(self) -> str:
        """Return the cloud provider name"""
        pass


# ============================================
# CONCRETE FACTORIES
# ============================================

class AWSFactory(CloudFactory):
    """Factory for AWS services"""

    def __init__(self, region: str = "us-east-1"):
        self.region = region

    def create_database(self) -> Database:
        return AWSDynamoDB(self.region)

    def create_cache(self) -> Cache:
        return AWSElastiCache()

    def create_message_queue(self) -> MessageQueue:
        return AWSSQS()

    def get_provider_name(self) -> str:
        return "Amazon Web Services"


class GCPFactory(CloudFactory):
    """Factory for Google Cloud services"""

    def __init__(self, project_id: str = "my-project"):
        self.project_id = project_id

    def create_database(self) -> Database:
        return GCPFirestore(self.project_id)

    def create_cache(self) -> Cache:
        return GCPMemorystore()

    def create_message_queue(self) -> MessageQueue:
        return GCPPubSub(self.project_id)

    def get_provider_name(self) -> str:
        return "Google Cloud Platform"


# ============================================
# CLIENT CODE
# ============================================

class Application:
    """
    Client class that uses cloud services.
    Notice: It only depends on abstract interfaces!
    """

    def __init__(self, cloud_factory: CloudFactory):
        # Create all infrastructure from the same factory
        # This guarantees all services are from the same cloud provider
        self.db = cloud_factory.create_database()
        self.cache = cloud_factory.create_cache()
        self.mq = cloud_factory.create_message_queue()
        self.provider = cloud_factory.get_provider_name()

    def initialize(self) -> None:
        """Initialize all services"""
        print(f"\n{'='*50}")
        print(f"Initializing application on {self.provider}")
        print('='*50)

        # Connect to database
        print(self.db.connect())
        print(f"Connection string: {self.db.get_connection_string()}")

        # Initialize cache
        self.cache.set("app:initialized", True)

        # Subscribe to events
        self.mq.subscribe("user-events", lambda msg: print(f"Received: {msg}"))

    def process_user(self, user_id: str, data: Dict) -> None:
        """Example business logic using all services"""
        # Check cache first
        cached = self.cache.get(f"user:{user_id}")
        if cached:
            print(f"Cache hit for user {user_id}")
            return

        # Query database
        result = self.db.query(f"SELECT * FROM users WHERE id = '{user_id}'")

        # Cache the result
        self.cache.set(f"user:{user_id}", result, ttl=300)

        # Publish event
        self.mq.publish("user-events", {"action": "user_accessed", "user_id": user_id})


# ============================================
# FACTORY SELECTOR (Dependency Injection Helper)
# ============================================

def get_cloud_factory(provider: str, **kwargs) -> CloudFactory:
    """
    Factory method to get the appropriate cloud factory.
    In real apps, this would read from config/environment.
    """
    factories = {
        "aws": lambda: AWSFactory(kwargs.get("region", "us-east-1")),
        "gcp": lambda: GCPFactory(kwargs.get("project_id", "my-project")),
    }

    factory_creator = factories.get(provider.lower())
    if not factory_creator:
        raise ValueError(f"Unknown cloud provider: {provider}")

    return factory_creator()


# ============================================
# USAGE EXAMPLE
# ============================================

if __name__ == "__main__":
    # Configuration would typically come from environment variables
    CLOUD_PROVIDER = "aws"  # Change to "gcp" to switch entire infrastructure

    # Get the appropriate factory
    factory = get_cloud_factory(CLOUD_PROVIDER, region="us-west-2")

    # Create application with injected factory
    app = Application(factory)
    app.initialize()
    app.process_user("user-123", {"name": "Alice"})

    print("\n" + "="*50)
    print("Switching to GCP...")
    print("="*50)

    # Switching cloud providers is trivial - just change the factory!
    gcp_factory = get_cloud_factory("gcp", project_id="production-project")
    gcp_app = Application(gcp_factory)
    gcp_app.initialize()
    gcp_app.process_user("user-456", {"name": "Bob"})
```

### Go - UI Component Factory

```go
package main

import (
	"fmt"
)

// ============================================
// ABSTRACT PRODUCTS
// ============================================

// Button is the abstract product interface for buttons
type Button interface {
	Render() string
	OnClick(handler func())
	SetLabel(label string)
}

// Checkbox is the abstract product interface for checkboxes
type Checkbox interface {
	Render() string
	IsChecked() bool
	SetChecked(checked bool)
}

// TextField is the abstract product interface for text inputs
type TextField interface {
	Render() string
	GetValue() string
	SetValue(value string)
	SetPlaceholder(placeholder string)
}

// ============================================
// WINDOWS PRODUCT FAMILY
// ============================================

// WindowsButton implements Button for Windows
type WindowsButton struct {
	label   string
	handler func()
}

func (b *WindowsButton) Render() string {
	return fmt.Sprintf("[=== %s ===]", b.label) // Windows-style button
}

func (b *WindowsButton) OnClick(handler func()) {
	b.handler = handler
}

func (b *WindowsButton) SetLabel(label string) {
	b.label = label
}

// WindowsCheckbox implements Checkbox for Windows
type WindowsCheckbox struct {
	checked bool
	label   string
}

func (c *WindowsCheckbox) Render() string {
	check := " "
	if c.checked {
		check = "X"
	}
	return fmt.Sprintf("[%s] %s", check, c.label)
}

func (c *WindowsCheckbox) IsChecked() bool {
	return c.checked
}

func (c *WindowsCheckbox) SetChecked(checked bool) {
	c.checked = checked
}

// WindowsTextField implements TextField for Windows
type WindowsTextField struct {
	value       string
	placeholder string
}

func (t *WindowsTextField) Render() string {
	display := t.value
	if display == "" {
		display = t.placeholder
	}
	return fmt.Sprintf("|_%s_|", display)
}

func (t *WindowsTextField) GetValue() string {
	return t.value
}

func (t *WindowsTextField) SetValue(value string) {
	t.value = value
}

func (t *WindowsTextField) SetPlaceholder(placeholder string) {
	t.placeholder = placeholder
}

// ============================================
// MACOS PRODUCT FAMILY
// ============================================

// MacButton implements Button for macOS
type MacButton struct {
	label   string
	handler func()
}

func (b *MacButton) Render() string {
	return fmt.Sprintf("( %s )", b.label) // macOS-style rounded button
}

func (b *MacButton) OnClick(handler func()) {
	b.handler = handler
}

func (b *MacButton) SetLabel(label string) {
	b.label = label
}

// MacCheckbox implements Checkbox for macOS
type MacCheckbox struct {
	checked bool
	label   string
}

func (c *MacCheckbox) Render() string {
	check := "o"
	if c.checked {
		check = "*"
	}
	return fmt.Sprintf("(%s) %s", check, c.label)
}

func (c *MacCheckbox) IsChecked() bool {
	return c.checked
}

func (c *MacCheckbox) SetChecked(checked bool) {
	c.checked = checked
}

// MacTextField implements TextField for macOS
type MacTextField struct {
	value       string
	placeholder string
}

func (t *MacTextField) Render() string {
	display := t.value
	if display == "" {
		display = t.placeholder
	}
	return fmt.Sprintf("[ %s ]", display)
}

func (t *MacTextField) GetValue() string {
	return t.value
}

func (t *MacTextField) SetValue(value string) {
	t.value = value
}

func (t *MacTextField) SetPlaceholder(placeholder string) {
	t.placeholder = placeholder
}

// ============================================
// LINUX PRODUCT FAMILY
// ============================================

// LinuxButton implements Button for Linux/GTK
type LinuxButton struct {
	label   string
	handler func()
}

func (b *LinuxButton) Render() string {
	return fmt.Sprintf("< %s >", b.label) // Linux/GTK-style button
}

func (b *LinuxButton) OnClick(handler func()) {
	b.handler = handler
}

func (b *LinuxButton) SetLabel(label string) {
	b.label = label
}

// LinuxCheckbox implements Checkbox for Linux
type LinuxCheckbox struct {
	checked bool
	label   string
}

func (c *LinuxCheckbox) Render() string {
	check := "-"
	if c.checked {
		check = "+"
	}
	return fmt.Sprintf("[%s] %s", check, c.label)
}

func (c *LinuxCheckbox) IsChecked() bool {
	return c.checked
}

func (c *LinuxCheckbox) SetChecked(checked bool) {
	c.checked = checked
}

// LinuxTextField implements TextField for Linux
type LinuxTextField struct {
	value       string
	placeholder string
}

func (t *LinuxTextField) Render() string {
	display := t.value
	if display == "" {
		display = t.placeholder
	}
	return fmt.Sprintf(">>> %s <<<", display)
}

func (t *LinuxTextField) GetValue() string {
	return t.value
}

func (t *LinuxTextField) SetValue(value string) {
	t.value = value
}

func (t *LinuxTextField) SetPlaceholder(placeholder string) {
	t.placeholder = placeholder
}

// ============================================
// ABSTRACT FACTORY
// ============================================

// GUIFactory is the abstract factory interface
type GUIFactory interface {
	CreateButton() Button
	CreateCheckbox() Checkbox
	CreateTextField() TextField
	GetOSName() string
}

// ============================================
// CONCRETE FACTORIES
// ============================================

// WindowsFactory creates Windows UI components
type WindowsFactory struct{}

func (f *WindowsFactory) CreateButton() Button {
	return &WindowsButton{label: "Button"}
}

func (f *WindowsFactory) CreateCheckbox() Checkbox {
	return &WindowsCheckbox{label: "Option"}
}

func (f *WindowsFactory) CreateTextField() TextField {
	return &WindowsTextField{}
}

func (f *WindowsFactory) GetOSName() string {
	return "Windows"
}

// MacFactory creates macOS UI components
type MacFactory struct{}

func (f *MacFactory) CreateButton() Button {
	return &MacButton{label: "Button"}
}

func (f *MacFactory) CreateCheckbox() Checkbox {
	return &MacCheckbox{label: "Option"}
}

func (f *MacFactory) CreateTextField() TextField {
	return &MacTextField{}
}

func (f *MacFactory) GetOSName() string {
	return "macOS"
}

// LinuxFactory creates Linux UI components
type LinuxFactory struct{}

func (f *LinuxFactory) CreateButton() Button {
	return &LinuxButton{label: "Button"}
}

func (f *LinuxFactory) CreateCheckbox() Checkbox {
	return &LinuxCheckbox{label: "Option"}
}

func (f *LinuxFactory) CreateTextField() TextField {
	return &LinuxTextField{}
}

func (f *LinuxFactory) GetOSName() string {
	return "Linux"
}

// ============================================
// CLIENT CODE
// ============================================

// LoginForm represents a login form using abstract UI components
type LoginForm struct {
	factory       GUIFactory
	usernameField TextField
	passwordField TextField
	rememberMe    Checkbox
	loginButton   Button
	cancelButton  Button
}

// NewLoginForm creates a new login form using the provided factory
func NewLoginForm(factory GUIFactory) *LoginForm {
	form := &LoginForm{factory: factory}

	// Create all components using the abstract factory
	// All components will be from the same OS family
	form.usernameField = factory.CreateTextField()
	form.usernameField.SetPlaceholder("Enter username")

	form.passwordField = factory.CreateTextField()
	form.passwordField.SetPlaceholder("Enter password")

	form.rememberMe = factory.CreateCheckbox()

	form.loginButton = factory.CreateButton()
	form.loginButton.SetLabel("Login")

	form.cancelButton = factory.CreateButton()
	form.cancelButton.SetLabel("Cancel")

	return form
}

// Render displays the form
func (f *LoginForm) Render() {
	fmt.Printf("\n========== Login Form (%s) ==========\n\n", f.factory.GetOSName())
	fmt.Printf("  Username: %s\n", f.usernameField.Render())
	fmt.Printf("  Password: %s\n", f.passwordField.Render())
	fmt.Printf("  %s Remember me\n", f.rememberMe.Render())
	fmt.Printf("\n  %s    %s\n", f.loginButton.Render(), f.cancelButton.Render())
	fmt.Println("\n==========================================")
}

// ============================================
// FACTORY SELECTOR
// ============================================

// GetGUIFactory returns the appropriate factory based on OS
func GetGUIFactory(osName string) GUIFactory {
	switch osName {
	case "windows":
		return &WindowsFactory{}
	case "macos", "darwin":
		return &MacFactory{}
	case "linux":
		return &LinuxFactory{}
	default:
		// Default to Linux
		return &LinuxFactory{}
	}
}

// ============================================
// MAIN
// ============================================

func main() {
	// Demonstrate how the same client code works with different factories
	operatingSystems := []string{"windows", "macos", "linux"}

	for _, os := range operatingSystems {
		// Get the appropriate factory for this OS
		factory := GetGUIFactory(os)

		// Create the login form - same code, different appearance
		loginForm := NewLoginForm(factory)

		// Fill in some data
		loginForm.usernameField.SetValue("john_doe")
		loginForm.rememberMe.SetChecked(true)

		// Render the form
		loginForm.Render()
	}

	// Demonstrate that components from different families
	// shouldn't be mixed (this is a design constraint)
	fmt.Println("\n=== Demonstrating Factory Isolation ===")
	fmt.Println("Each factory creates a consistent family of components.")
	fmt.Println("WindowsFactory -> WindowsButton, WindowsCheckbox, WindowsTextField")
	fmt.Println("MacFactory -> MacButton, MacCheckbox, MacTextField")
	fmt.Println("LinuxFactory -> LinuxButton, LinuxCheckbox, LinuxTextField")
}
```

## Quick Reference Card

### Pattern Essence
- **Intent**: Create families of related objects without specifying concrete classes
- **Also Known As**: Kit, Toolkit
- **Category**: Creational Pattern

### Key Components
| Component | Purpose |
|-----------|---------|
| AbstractFactory | Interface declaring creation methods for each product |
| ConcreteFactory | Creates products for one specific family |
| AbstractProduct | Interface for a type of product |
| ConcreteProduct | Implements a product for a specific family |
| Client | Uses abstract interfaces only |

### When to Use
- Multiple families of related products
- Products must be used together consistently
- Need to switch entire product families easily
- Want to hide concrete product classes from clients

### When NOT to Use
- Only one product family exists
- Products don't need to work together
- Product types change frequently
- Simple construction suffices

### Key Trade-offs
| Pros | Cons |
|------|------|
| Isolates concrete classes | Adding new product types is costly |
| Easy to switch families | Can become complex with many products |
| Promotes consistency | May require parallel class hierarchies |
| Supports Open/Closed for families | Tight coupling between products |

### Related Patterns
- **Factory Method**: Single product, simpler
- **Builder**: Step-by-step construction
- **Prototype**: Clone-based creation
- **Singleton**: Often used for factories

### Code Smell Indicators
- Lots of `if/switch` on type to create objects
- Products from different sources mixed accidentally
- Difficulty testing due to concrete dependencies
- Hard-coded object creation scattered throughout code

### Quick Implementation Checklist
1. Identify the product families and product types
2. Define abstract product interfaces
3. Implement concrete products for each family
4. Define abstract factory with creation methods
5. Implement concrete factory for each family
6. Client code uses only abstract interfaces
7. Use dependency injection for factory selection
