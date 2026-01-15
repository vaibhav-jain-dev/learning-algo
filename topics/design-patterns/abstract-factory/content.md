# Abstract Factory Pattern

## Overview

The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. It's useful when your system needs to work with multiple families of products.

## Key Concepts

### When to Use

- When you need to create families of related products
- When products from one family shouldn't mix with another
- When you want to provide a library of products without exposing implementation
- When system should be independent of how products are created

### Structure

```
┌─────────────────────────┐
│    AbstractFactory      │
├─────────────────────────┤
│ + createProductA()      │
│ + createProductB()      │
└─────────────────────────┘
           △
    ┌──────┴──────┐
    │             │
┌───┴───┐    ┌───┴───┐
│Factory1│    │Factory2│
└───────┘    └───────┘
    │             │
    ▼             ▼
ProductA1     ProductA2
ProductB1     ProductB2
```

## Implementation

### Python - UI Component Factory

```python
from abc import ABC, abstractmethod

# Abstract Products
class Button(ABC):
    @abstractmethod
    def render(self) -> str:
        pass


class Checkbox(ABC):
    @abstractmethod
    def render(self) -> str:
        pass


class TextInput(ABC):
    @abstractmethod
    def render(self) -> str:
        pass


# Windows Family
class WindowsButton(Button):
    def render(self) -> str:
        return "[Windows Button]"


class WindowsCheckbox(Checkbox):
    def render(self) -> str:
        return "[☑] Windows Checkbox"


class WindowsTextInput(TextInput):
    def render(self) -> str:
        return "|_Windows Input_|"


# Mac Family
class MacButton(Button):
    def render(self) -> str:
        return "(Mac Button)"


class MacCheckbox(Checkbox):
    def render(self) -> str:
        return "(✓) Mac Checkbox"


class MacTextInput(TextInput):
    def render(self) -> str:
        return "⌘ Mac Input ⌘"


# Linux Family
class LinuxButton(Button):
    def render(self) -> str:
        return "<Linux Button>"


class LinuxCheckbox(Checkbox):
    def render(self) -> str:
        return "[x] Linux Checkbox"


class LinuxTextInput(TextInput):
    def render(self) -> str:
        return ">>> Linux Input <<<"


# Abstract Factory
class GUIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button:
        pass

    @abstractmethod
    def create_checkbox(self) -> Checkbox:
        pass

    @abstractmethod
    def create_text_input(self) -> TextInput:
        pass


# Concrete Factories
class WindowsFactory(GUIFactory):
    def create_button(self) -> Button:
        return WindowsButton()

    def create_checkbox(self) -> Checkbox:
        return WindowsCheckbox()

    def create_text_input(self) -> TextInput:
        return WindowsTextInput()


class MacFactory(GUIFactory):
    def create_button(self) -> Button:
        return MacButton()

    def create_checkbox(self) -> Checkbox:
        return MacCheckbox()

    def create_text_input(self) -> TextInput:
        return MacTextInput()


class LinuxFactory(GUIFactory):
    def create_button(self) -> Button:
        return LinuxButton()

    def create_checkbox(self) -> Checkbox:
        return LinuxCheckbox()

    def create_text_input(self) -> TextInput:
        return LinuxTextInput()


# Client code
class Application:
    def __init__(self, factory: GUIFactory):
        self.button = factory.create_button()
        self.checkbox = factory.create_checkbox()
        self.text_input = factory.create_text_input()

    def render(self) -> str:
        return f"""
        {self.button.render()}
        {self.checkbox.render()}
        {self.text_input.render()}
        """


def get_factory(os_type: str) -> GUIFactory:
    factories = {
        "windows": WindowsFactory(),
        "mac": MacFactory(),
        "linux": LinuxFactory()
    }
    return factories.get(os_type.lower(), WindowsFactory())


# Usage
app = Application(get_factory("mac"))
print(app.render())
```

### Go - Database & Cache Factory

```go
package main

import "fmt"

// Abstract Products
type Database interface {
	Connect() string
	Query(sql string) string
}

type Cache interface {
	Get(key string) string
	Set(key string, value string) string
}

type MessageQueue interface {
	Publish(topic string, message string) string
	Subscribe(topic string) string
}

// AWS Family
type AWSDynamoDB struct{}

func (d *AWSDynamoDB) Connect() string {
	return "Connected to DynamoDB"
}

func (d *AWSDynamoDB) Query(sql string) string {
	return fmt.Sprintf("DynamoDB query: %s", sql)
}

type AWSElastiCache struct{}

func (c *AWSElastiCache) Get(key string) string {
	return fmt.Sprintf("ElastiCache GET %s", key)
}

func (c *AWSElastiCache) Set(key string, value string) string {
	return fmt.Sprintf("ElastiCache SET %s=%s", key, value)
}

type AWSSQS struct{}

func (q *AWSSQS) Publish(topic string, message string) string {
	return fmt.Sprintf("SQS publish to %s: %s", topic, message)
}

func (q *AWSSQS) Subscribe(topic string) string {
	return fmt.Sprintf("SQS subscribe to %s", topic)
}

// GCP Family
type GCPFirestore struct{}

func (d *GCPFirestore) Connect() string {
	return "Connected to Firestore"
}

func (d *GCPFirestore) Query(sql string) string {
	return fmt.Sprintf("Firestore query: %s", sql)
}

type GCPMemorystore struct{}

func (c *GCPMemorystore) Get(key string) string {
	return fmt.Sprintf("Memorystore GET %s", key)
}

func (c *GCPMemorystore) Set(key string, value string) string {
	return fmt.Sprintf("Memorystore SET %s=%s", key, value)
}

type GCPPubSub struct{}

func (q *GCPPubSub) Publish(topic string, message string) string {
	return fmt.Sprintf("PubSub publish to %s: %s", topic, message)
}

func (q *GCPPubSub) Subscribe(topic string) string {
	return fmt.Sprintf("PubSub subscribe to %s", topic)
}

// Abstract Factory
type CloudFactory interface {
	CreateDatabase() Database
	CreateCache() Cache
	CreateMessageQueue() MessageQueue
}

// Concrete Factories
type AWSFactory struct{}

func (f *AWSFactory) CreateDatabase() Database {
	return &AWSDynamoDB{}
}

func (f *AWSFactory) CreateCache() Cache {
	return &AWSElastiCache{}
}

func (f *AWSFactory) CreateMessageQueue() MessageQueue {
	return &AWSSQS{}
}

type GCPFactory struct{}

func (f *GCPFactory) CreateDatabase() Database {
	return &GCPFirestore{}
}

func (f *GCPFactory) CreateCache() Cache {
	return &GCPMemorystore{}
}

func (f *GCPFactory) CreateMessageQueue() MessageQueue {
	return &GCPPubSub{}
}

// Client
type InfrastructureClient struct {
	db    Database
	cache Cache
	mq    MessageQueue
}

func NewInfrastructureClient(factory CloudFactory) *InfrastructureClient {
	return &InfrastructureClient{
		db:    factory.CreateDatabase(),
		cache: factory.CreateCache(),
		mq:    factory.CreateMessageQueue(),
	}
}

func (c *InfrastructureClient) Initialize() {
	fmt.Println(c.db.Connect())
	fmt.Println(c.cache.Set("initialized", "true"))
	fmt.Println(c.mq.Subscribe("events"))
}

func GetFactory(cloud string) CloudFactory {
	switch cloud {
	case "aws":
		return &AWSFactory{}
	case "gcp":
		return &GCPFactory{}
	default:
		return &AWSFactory{}
	}
}

func main() {
	// Configure based on environment
	factory := GetFactory("gcp")
	client := NewInfrastructureClient(factory)
	client.Initialize()
}
```

### Python - Theme Factory

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass

# Abstract Products
@dataclass
class ColorPalette(ABC):
    primary: str
    secondary: str
    background: str
    text: str


@dataclass
class Typography(ABC):
    heading_font: str
    body_font: str
    heading_size: int
    body_size: int


@dataclass
class Spacing(ABC):
    small: int
    medium: int
    large: int


# Light Theme Family
@dataclass
class LightColorPalette(ColorPalette):
    primary: str = "#007bff"
    secondary: str = "#6c757d"
    background: str = "#ffffff"
    text: str = "#212529"


@dataclass
class LightTypography(Typography):
    heading_font: str = "Helvetica"
    body_font: str = "Arial"
    heading_size: int = 24
    body_size: int = 14


@dataclass
class LightSpacing(Spacing):
    small: int = 8
    medium: int = 16
    large: int = 24


# Dark Theme Family
@dataclass
class DarkColorPalette(ColorPalette):
    primary: str = "#0d6efd"
    secondary: str = "#adb5bd"
    background: str = "#121212"
    text: str = "#e9ecef"


@dataclass
class DarkTypography(Typography):
    heading_font: str = "Roboto"
    body_font: str = "Open Sans"
    heading_size: int = 28
    body_size: int = 16


@dataclass
class DarkSpacing(Spacing):
    small: int = 12
    medium: int = 20
    large: int = 32


# Abstract Factory
class ThemeFactory(ABC):
    @abstractmethod
    def create_colors(self) -> ColorPalette:
        pass

    @abstractmethod
    def create_typography(self) -> Typography:
        pass

    @abstractmethod
    def create_spacing(self) -> Spacing:
        pass


# Concrete Factories
class LightThemeFactory(ThemeFactory):
    def create_colors(self) -> ColorPalette:
        return LightColorPalette()

    def create_typography(self) -> Typography:
        return LightTypography()

    def create_spacing(self) -> Spacing:
        return LightSpacing()


class DarkThemeFactory(ThemeFactory):
    def create_colors(self) -> ColorPalette:
        return DarkColorPalette()

    def create_typography(self) -> Typography:
        return DarkTypography()

    def create_spacing(self) -> Spacing:
        return DarkSpacing()


# Theme class using the factory
class Theme:
    def __init__(self, factory: ThemeFactory):
        self.colors = factory.create_colors()
        self.typography = factory.create_typography()
        self.spacing = factory.create_spacing()

    def generate_css(self) -> str:
        return f"""
:root {{
    --primary: {self.colors.primary};
    --secondary: {self.colors.secondary};
    --background: {self.colors.background};
    --text: {self.colors.text};
    --heading-font: {self.typography.heading_font};
    --body-font: {self.typography.body_font};
    --heading-size: {self.typography.heading_size}px;
    --body-size: {self.typography.body_size}px;
    --spacing-sm: {self.spacing.small}px;
    --spacing-md: {self.spacing.medium}px;
    --spacing-lg: {self.spacing.large}px;
}}
        """


# Usage
dark_theme = Theme(DarkThemeFactory())
print(dark_theme.generate_css())
```

## Common Interview Questions

1. **When to use Abstract Factory vs Factory Method?**
   - Factory Method: One product type
   - Abstract Factory: Multiple related product types

2. **How does Abstract Factory ensure product compatibility?**
   - Each factory creates a consistent family
   - Products from same factory are designed to work together

3. **How to add a new product to all factories?**
   - Add abstract method to AbstractFactory
   - Implement in all concrete factories
   - This is a potential violation of Open/Closed Principle

## Best Practices

1. **Keep factories focused** - One factory per product family
2. **Use dependency injection** - Pass factory to client
3. **Consider configuration** - Determine factory at runtime
4. **Document relationships** - Clear which products work together
5. **Avoid product explosion** - Too many products = too complex

## Related Patterns

- [Factory Method](/topic/design-patterns/factory-method) - Single product creation
- [Builder](/topic/design-patterns/builder) - Complex object construction
- [Prototype](/topic/design-patterns/prototype) - Clone-based creation
