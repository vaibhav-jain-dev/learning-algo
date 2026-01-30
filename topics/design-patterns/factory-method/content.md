# Factory Method Pattern

## Overview

The Factory Method pattern defines an interface for creating objects, but lets subclasses decide which class to instantiate. It promotes loose coupling by eliminating the need to bind application-specific classes into your code.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border: 2px solid #e2e8f0;">
<h4 style="margin: 0 0 12px 0; color: #1e40af;">Core Insight</h4>
<p style="margin: 0; font-size: 15px; line-height: 1.6; color: #475569;">
Factory Method is fundamentally about <span style="color: #166534; font-weight: 600;">deferring instantiation to subclasses</span>. The superclass defines the algorithm (template), and the factory method is the "hook" that subclasses override to customize object creation. This creates a powerful extension mechanism that follows the <span style="color: #166534; font-weight: 600;">Open/Closed Principle</span>.
</p>
</div>

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

  ## Section 1: Factory Method vs Abstract Factory - The Critical Distinction

  Understanding the difference between Factory Method and [[Abstract Factory]](/topics/design-patterns/abstract-factory) is one of the most common interview questions. They solve different problems despite similar names.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #cbd5e1; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #334155; margin: 0 0 20px 0; text-align: center;">Structural Comparison</h4>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">

<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 10px; padding: 16px;">
<h5 style="color: #1e40af; margin: 0 0 12px 0; text-align: center;">Factory Method</h5>
<div style="font-size: 13px; color: #1e3a5f;">
<div style="margin-bottom: 8px;"><span style="color: #166534; font-weight: 600;">Structure:</span> Single method in a class</div>
<div style="margin-bottom: 8px;"><span style="color: #166534; font-weight: 600;">Creates:</span> ONE product type</div>
<div style="margin-bottom: 8px;"><span style="color: #166534; font-weight: 600;">Extension:</span> Subclass overrides method</div>
<div style="margin-bottom: 8px;"><span style="color: #166534; font-weight: 600;">Relationship:</span> IS-A (inheritance)</div>
<div style="background: #bfdbfe; padding: 8px; border-radius: 4px; margin-top: 12px;">
<code style="font-size: 11px;">
              class Dialog:<br/>
              &nbsp;&nbsp;def create_button(self) -> Button:<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;return DefaultButton()
</code>
</div>
</div>
</div>

<div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 10px; padding: 16px;">
<h5 style="color: #166534; margin: 0 0 12px 0; text-align: center;">Abstract Factory</h5>
<div style="font-size: 13px; color: #14532d;">
<div style="margin-bottom: 8px;"><span style="color: #166534; font-weight: 600;">Structure:</span> Interface with multiple methods</div>
<div style="margin-bottom: 8px;"><span style="color: #166534; font-weight: 600;">Creates:</span> FAMILY of related products</div>
<div style="margin-bottom: 8px;"><span style="color: #166534; font-weight: 600;">Extension:</span> New factory class</div>
<div style="margin-bottom: 8px;"><span style="color: #166534; font-weight: 600;">Relationship:</span> HAS-A (composition)</div>
<div style="background: #bbf7d0; padding: 8px; border-radius: 4px; margin-top: 12px;">
<code style="font-size: 11px;">
              class WidgetFactory:<br/>
              &nbsp;&nbsp;def create_button(self) -> Button<br/>
              &nbsp;&nbsp;def create_scroll(self) -> Scrollbar<br/>
              &nbsp;&nbsp;def create_menu(self) -> Menu
</code>
</div>
</div>
</div>

</div>
</div>

  ### 1.1 The Fundamental Difference

<div style="background: #fefce8; border-left: 4px solid #eab308; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 20px 0;">
<h4 style="margin: 0 0 8px 0; color: #a16207;">Key Distinction</h4>
<p style="margin: 0; color: #713f12; font-size: 14px;">
<span style="color: #166534; font-weight: 600;">Factory Method</span> uses <strong>inheritance</strong> to decide what object to create. The subclass IS the factory.
      <br><br>
<span style="color: #166534; font-weight: 600;">Abstract Factory</span> uses <strong>composition</strong> to delegate creation to a factory object. The class HAS a factory.
</p>
</div>

      ```python
      # Factory Method: Uses inheritance
      class LogisticsCompany(ABC):
      @abstractmethod
      def create_transport(self) -> Transport:
      """Factory method - subclasses decide what to create."""
      pass

      def plan_delivery(self, cargo: str) -> None:
      # Template method uses factory method
      transport = self.create_transport()  # Subclass decides type
      transport.deliver(cargo)

      class TruckingCompany(LogisticsCompany):
      def create_transport(self) -> Transport:
      return Truck()  # This subclass creates Trucks

      class ShippingCompany(LogisticsCompany):
      def create_transport(self) -> Transport:
      return Ship()  # This subclass creates Ships


      # Abstract Factory: Uses composition
      class Application:
      def __init__(self, factory: GUIFactory):
      # Factory is INJECTED - composition
      self.button = factory.create_button()
      self.checkbox = factory.create_checkbox()
      self.textfield = factory.create_textfield()
      ```

      ### 1.2 When to Choose Which

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #cbd5e1; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #334155; margin: 0 0 20px 0; text-align: center;">Decision Framework</h4>

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 16px;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 8px;">Use Factory Method When:</div>
<ul style="margin: 0; padding-left: 20px; color: #1e3a5f; font-size: 14px;">
<li>You have a <span style="color: #166534; font-weight: 600;">single product</span> with variations</li>
<li>Subclasses should control instantiation</li>
<li>You're building a <span style="color: #166534; font-weight: 600;">framework</span> where users extend your classes</li>
<li>The algorithm is fixed but the objects used vary</li>
</ul>
</div>

<div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 8px; padding: 16px;">
<div style="font-weight: 700; color: #166534; margin-bottom: 8px;">Use Abstract Factory When:</div>
<ul style="margin: 0; padding-left: 20px; color: #14532d; font-size: 14px;">
<li>You need <span style="color: #166534; font-weight: 600;">multiple related products</span> that work together</li>
<li>Products from different families should never mix</li>
<li>You want to <span style="color: #166534; font-weight: 600;">swap entire product families</span> at runtime</li>
<li>Platform/environment determines all product types</li>
</ul>
</div>

</div>
</div>

      ### Interview Questions: Factory Method vs Abstract Factory (3 Levels Deep)

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">

        **Level 1: "What is the key difference between Factory Method and Abstract Factory?"**

> <span style="color: #166534; font-weight: 600;">Factory Method</span> creates ONE product through inheritance - subclasses override a creation method. <span style="color: #166534; font-weight: 600;">Abstract Factory</span> creates a FAMILY of related products through composition - client holds a factory object. Factory Method is about deferring instantiation to subclasses; Abstract Factory is about enforcing family consistency.

        **Level 2: "Can Abstract Factory be implemented using Factory Methods? Explain the relationship."**

        > Yes, Abstract Factory is often implemented as a collection of Factory Methods. Each creation method in the abstract factory interface IS a factory method:
        >
        > ```python
        > class GUIFactory(ABC):
        >     @abstractmethod
        >     def create_button(self) -> Button:  # Factory Method
        >         pass
        >
        >     @abstractmethod
        >     def create_scrollbar(self) -> Scrollbar:  # Factory Method
        >         pass
        > ```
        >
        > The distinction is conceptual: Factory Method focuses on ONE product with subclass control; Abstract Factory focuses on MULTIPLE products that form a coherent family. When you have multiple factory methods in an interface that together create a product family, you have an Abstract Factory.
        >
> **Key insight**: Abstract Factory adds the <span style="color: #166534; font-weight: 600;">family invariant</span> - all products from one factory instance are guaranteed compatible. This constraint doesn't exist in isolated Factory Methods.

        **Level 3: "Design a system that starts with Factory Method and evolves to Abstract Factory. What triggers the evolution? What are the migration challenges?"**

        > **Evolution triggers**:
        > 1. Discovery that products have relationships (button click should update scrollbar)
        > 2. Platform proliferation requiring consistent product families
        > 3. Bugs from mixing incompatible products
        >
        > **Migration path**:
        > ```python
        > # Stage 1: Single Factory Method
        > class Dialog:
        >     def create_button(self) -> Button:
        >         return DefaultButton()
        >
        > # Stage 2: Multiple independent Factory Methods (code smell!)
        > class Dialog:
        >     def create_button(self) -> Button: ...
        >     def create_textfield(self) -> TextField: ...
        >     # Problem: No guarantee button/textfield are compatible
        >
        > # Stage 3: Extract Abstract Factory
        > class WidgetFactory(ABC):
        >     def create_button(self) -> Button: ...
        >     def create_textfield(self) -> TextField: ...
        >
        > class Dialog:
        >     def __init__(self, factory: WidgetFactory):
        >         self.factory = factory  # Composition replaces inheritance
        > ```
        >
        > **Migration challenges**:
        > 1. **Inheritance to composition**: Dialog subclasses must become factory classes
        > 2. **Compile-time to runtime binding**: Factory is now injected, not baked in
        > 3. **Inversion of control**: Client code changes from extending Dialog to providing factories
        > 4. **Testing infrastructure**: Mock strategies change completely
        >
        > **Trade-off**: Factory Method is simpler but doesn't scale. Abstract Factory adds complexity but enables family consistency and [[Dependency Injection]](/topics/design-patterns/dependency-injection) integration.

</div>

      ---

      ## Section 2: Parameterized Factories

<span style="color: #166534; font-weight: 600;">Parameterized factories</span> accept parameters that determine which product type to create. This is a common variation that combines the flexibility of runtime decisions with the structure of factory methods.

      ### 2.1 Simple Parameterized Factory

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #cbd5e1; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #334155; margin: 0 0 20px 0; text-align: center;">Parameterized Factory Decision Flow</h4>

<div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
<div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; align-items: center;">
<div style="background: #7c3aed; color: white; padding: 12px 20px; border-radius: 8px; font-weight: 600; text-align: center;">
              Input Parameter
<div style="font-size: 0.75rem; font-weight: 400; opacity: 0.9;">type="email" | "sms" | "push"</div>
</div>
<div style="color: #64748b; font-size: 1.5rem;">-></div>
<div style="background: #2563eb; color: white; padding: 12px 20px; border-radius: 8px; font-weight: 600; text-align: center;">
              Factory Method
<div style="font-size: 0.75rem; font-weight: 400; opacity: 0.9;">create_notification(type)</div>
</div>
<div style="color: #64748b; font-size: 1.5rem;">-></div>
<div style="background: #059669; color: white; padding: 12px 20px; border-radius: 8px; font-weight: 600; text-align: center;">
              Product Instance
<div style="font-size: 0.75rem; font-weight: 400; opacity: 0.9;">EmailNotification()</div>
</div>
</div>
</div>
</div>

      ```python
      from abc import ABC, abstractmethod
      from typing import Dict, Type
      from enum import Enum, auto


      class NotificationType(Enum):
      EMAIL = auto()
      SMS = auto()
      PUSH = auto()
      SLACK = auto()


      class Notification(ABC):
      @abstractmethod
      def send(self, recipient: str, message: str) -> bool:
      pass


      class EmailNotification(Notification):
      def send(self, recipient: str, message: str) -> bool:
      print(f"Sending EMAIL to {recipient}: {message}")
      return True


      class SMSNotification(Notification):
      def send(self, recipient: str, message: str) -> bool:
      print(f"Sending SMS to {recipient}: {message}")
      return True


      class PushNotification(Notification):
      def send(self, recipient: str, message: str) -> bool:
      print(f"Sending PUSH to {recipient}: {message}")
      return True


      class SlackNotification(Notification):
      def send(self, recipient: str, message: str) -> bool:
      print(f"Sending SLACK to {recipient}: {message}")
      return True


      # Parameterized Factory Method
      class NotificationService:
      """
      Parameterized factory - type parameter determines product.
      """

      def create_notification(self, notification_type: NotificationType) -> Notification:
      """Factory method that uses a parameter to decide product type."""
      creators: Dict[NotificationType, Type[Notification]] = {
      NotificationType.EMAIL: EmailNotification,
      NotificationType.SMS: SMSNotification,
      NotificationType.PUSH: PushNotification,
      NotificationType.SLACK: SlackNotification,
      }

      creator = creators.get(notification_type)
      if not creator:
      raise ValueError(f"Unknown notification type: {notification_type}")

      return creator()

      def notify_user(
      self,
      user_id: str,
      message: str,
      preferred_channel: NotificationType
      ) -> bool:
      """Use the factory method in a template-style operation."""
      notification = self.create_notification(preferred_channel)
      return notification.send(user_id, message)
      ```

      ### 2.2 Registry-Based Parameterized Factory

A more extensible approach uses a <span style="color: #166534; font-weight: 600;">registry pattern</span> that allows dynamic registration of new product types without modifying the factory.

      ```python
      from typing import Callable, Dict, Any


      class NotificationFactory:
      """
      Registry-based parameterized factory.

      Allows dynamic registration of new notification types
      without modifying factory code (Open/Closed Principle).
      """

      _registry: Dict[str, Callable[..., Notification]] = {}

      @classmethod
      def register(cls, name: str, creator: Callable[..., Notification]) -> None:
      """Register a new notification type creator."""
      cls._registry[name.lower()] = creator

      @classmethod
      def create(cls, name: str, **kwargs: Any) -> Notification:
      """Create notification by registered name."""
      creator = cls._registry.get(name.lower())
      if not creator:
      available = list(cls._registry.keys())
      raise ValueError(
      f"Unknown notification type: '{name}'. "
      f"Available types: {available}"
      )
      return creator(**kwargs)

      @classmethod
      def available_types(cls) -> list:
      """List all registered notification types."""
      return list(cls._registry.keys())


      # Registration (typically at application startup)
      NotificationFactory.register("email", lambda **kw: EmailNotification())
      NotificationFactory.register("sms", lambda **kw: SMSNotification())
      NotificationFactory.register("push", lambda **kw: PushNotification())

      # Extensible: Add new types without modifying factory
      class WebhookNotification(Notification):
      def __init__(self, endpoint: str):
      self.endpoint = endpoint

      def send(self, recipient: str, message: str) -> bool:
      print(f"Sending WEBHOOK to {self.endpoint} for {recipient}")
      return True

      # Register at runtime
      NotificationFactory.register(
      "webhook",
      lambda endpoint="default", **kw: WebhookNotification(endpoint)
      )

      # Usage
      notification = NotificationFactory.create("webhook", endpoint="https://api.example.com")
      ```

<div style="background: #dcfce7; border-left: 4px solid #22c55e; padding: 16px 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
<h4 style="margin: 0 0 8px 0; color: #166534;">Design Benefit</h4>
<p style="margin: 0; color: #14532d; font-size: 14px;">
Registry-based factories enable <span style="color: #166534; font-weight: 600;">plugin architectures</span>. New product types can be registered by external modules without modifying core factory code. This is how frameworks like Django register middleware and Flask registers extensions.
</p>
</div>

      ### 2.3 Parameterized Factory with Configuration

      ```python
      from dataclasses import dataclass
      from typing import Optional


      @dataclass
      class NotificationConfig:
      """Configuration for notification creation."""
      retry_count: int = 3
      timeout_seconds: float = 30.0
      priority: str = "normal"
      metadata: Optional[Dict[str, Any]] = None


      class ConfigurableNotificationFactory:
      """
      Factory that creates configured products.

      Separates WHAT to create (type) from HOW to configure it (config).
      """

      def __init__(self, default_config: NotificationConfig = None):
      self.default_config = default_config or NotificationConfig()

      def create(
      self,
      notification_type: str,
      config: NotificationConfig = None
      ) -> Notification:
      """Create notification with configuration."""
      effective_config = config or self.default_config

      # Type determines WHAT, config determines HOW
      if notification_type == "email":
      return ConfiguredEmailNotification(effective_config)
      elif notification_type == "sms":
      return ConfiguredSMSNotification(effective_config)
      else:
      raise ValueError(f"Unknown type: {notification_type}")


      class ConfiguredEmailNotification(Notification):
      def __init__(self, config: NotificationConfig):
      self.config = config

      def send(self, recipient: str, message: str) -> bool:
      print(f"Sending EMAIL (retries={self.config.retry_count}, "
      f"timeout={self.config.timeout_seconds}s)")
      return True
      ```

      ### Interview Questions: Parameterized Factories (3 Levels Deep)

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">

        **Level 1: "What is a parameterized factory and when would you use it?"**

> A <span style="color: #166534; font-weight: 600;">parameterized factory</span> accepts input parameters that determine which product type to create. Instead of subclasses overriding a method, a single factory method uses conditional logic based on parameters.
        >
        > **Use when**:
        > - Product type is determined at runtime based on configuration or user input
        > - The number of product types is stable and manageable
        > - You want to avoid proliferation of subclasses
        >
        > **Example**: Creating database connections based on a driver string ("postgres", "mysql", "sqlite")

        **Level 2: "Compare if/switch parameterized factories vs registry-based factories. What are the trade-offs?"**

        > **If/Switch Factory**:
        > ```python
        > def create(self, type: str):
        >     if type == "email": return Email()
        >     elif type == "sms": return SMS()
        >     else: raise ValueError(f"Unknown: {type}")
        > ```
        >
        > | Aspect | If/Switch | Registry |
        > |--------|-----------|----------|
        > | **Adding types** | Modify factory (violates OCP) | Register without modification |
        > | **Type safety** | Compile-time checking possible | Runtime errors for unknown types |
        > | **Discoverability** | Explicit in code | Must query registry |
        > | **Dependency** | Factory depends on all products | Products depend on factory |
        > | **Plugin support** | No | Yes - external modules can register |
        >
        > **Trade-off**: If/switch is simpler for stable, small type sets. Registry is better for extensible systems where types are added dynamically (plugins, modules loading at startup).

        **Level 3: "Design a parameterized factory system that supports: (a) type-safe parameter validation, (b) product caching based on parameters, and (c) lazy instantiation. How do the requirements interact?"**

        > This requires combining several patterns:
        >
        > ```python
        > from typing import TypeVar, Generic, Dict, Callable, Any, Optional
        > from dataclasses import dataclass, field
        > import threading
        >
        > T = TypeVar('T')
        >
        > @dataclass(frozen=True)  # Frozen for hashability
        > class ProductKey:
        >     """Type-safe, hashable cache key."""
        >     product_type: str
        >     config_hash: int
        >
        >     @classmethod
        >     def from_params(cls, product_type: str, **params) -> 'ProductKey':
        >         # Create stable hash from parameters
        >         config_hash = hash(tuple(sorted(params.items())))
        >         return cls(product_type, config_hash)
        >
        >
        > class AdvancedFactory(Generic[T]):
        >     """
        >     Factory with caching and lazy instantiation.
        >     """
        >
        >     def __init__(self):
        >         self._registry: Dict[str, Callable[..., T]] = {}
        >         self._validators: Dict[str, Callable[[Dict], None]] = {}
        >         self._cache: Dict[ProductKey, T] = {}
        >         self._lock = threading.Lock()
        >
        >     def register(
        >         self,
        >         name: str,
        >         creator: Callable[..., T],
        >         validator: Callable[[Dict], None] = None
        >     ) -> None:
        >         """Register type with optional validator."""
        >         self._registry[name] = creator
        >         if validator:
        >             self._validators[name] = validator
        >
        >     def create(
        >         self,
        >         name: str,
        >         cache: bool = False,
        >         **params
        >     ) -> T:
        >         """Create with optional caching."""
        >         # (a) Type-safe validation
        >         if name in self._validators:
        >             self._validators[name](params)
        >
        >         # (b) Check cache
        >         if cache:
        >             key = ProductKey.from_params(name, **params)
        >             if key in self._cache:
        >                 return self._cache[key]
        >
        >         # Create instance
        >         creator = self._registry.get(name)
        >         if not creator:
        >             raise ValueError(f"Unknown type: {name}")
        >
        >         instance = creator(**params)
        >
        >         # Cache if requested
        >         if cache:
        >             with self._lock:
        >                 self._cache[key] = instance
        >
        >         return instance
        >
        >     def get_lazy(self, name: str, **params) -> Callable[[], T]:
        >         """(c) Return lazy provider instead of instance."""
        >         return lambda: self.create(name, **params)
        > ```
        >
        > **Interaction complexities**:
        > 1. **Validation + Caching**: Validate BEFORE checking cache (invalid params shouldn't hit cache)
        > 2. **Caching + Lazy**: Lazy provider should respect cache when eventually called
        > 3. **Thread safety**: Cache access needs synchronization; validation doesn't
        > 4. **Memory management**: Cached products may need TTL or LRU eviction
        >
        > **Real-world example**: Database connection pools cache connections by (host, port, database) tuple, validate credentials before caching, and provide lazy connection acquisition.

</div>

      ---

      ## Section 3: Dependency Injection Integration

      Factory Method integrates naturally with [[Dependency Injection]](/topics/design-patterns/dependency-injection). Understanding this integration is crucial for modern application architecture.

      ### 3.1 Factory as an Injected Dependency

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #cbd5e1; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #334155; margin: 0 0 20px 0; text-align: center;">DI + Factory Integration</h4>

<div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
<div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; align-items: center;">
<div style="background: #7c3aed; color: white; padding: 12px 20px; border-radius: 8px; font-weight: 600; text-align: center;">
              DI Container
<div style="font-size: 0.75rem; font-weight: 400; opacity: 0.9;">Configures factory binding</div>
</div>
<div style="color: #64748b; font-size: 1.5rem;">-></div>
<div style="background: #2563eb; color: white; padding: 12px 20px; border-radius: 8px; font-weight: 600; text-align: center;">
              Injects Factory
<div style="font-size: 0.75rem; font-weight: 400; opacity: 0.9;">Into service constructor</div>
</div>
<div style="color: #64748b; font-size: 1.5rem;">-></div>
<div style="background: #059669; color: white; padding: 12px 20px; border-radius: 8px; font-weight: 600; text-align: center;">
              Service Creates Products
<div style="font-size: 0.75rem; font-weight: 400; opacity: 0.9;">When needed at runtime</div>
</div>
</div>
</div>
</div>

      ```python
      from abc import ABC, abstractmethod
      from typing import Protocol


      # Product interface
      class Document(ABC):
      @abstractmethod
      def render(self) -> str:
      pass


      # Concrete products
      class PDFDocument(Document):
      def __init__(self, content: str):
      self.content = content

      def render(self) -> str:
      return f"<PDF>{self.content}</PDF>"


      class HTMLDocument(Document):
      def __init__(self, content: str):
      self.content = content

      def render(self) -> str:
      return f"<html><body>{self.content}</body></html>"


      # Factory interface (for DI)
      class DocumentFactory(Protocol):
      """Factory protocol - enables DI container binding."""

      def create_document(self, content: str) -> Document:
      ...


      # Concrete factories
      class PDFDocumentFactory:
      def create_document(self, content: str) -> Document:
      return PDFDocument(content)


      class HTMLDocumentFactory:
      def create_document(self, content: str) -> Document:
      return HTMLDocument(content)


      # Service that depends on factory
      class ReportGenerator:
      """
      Service receives factory via constructor injection.

      This inverts control: ReportGenerator doesn't decide
      what documents to create - the DI container does.
      """

      def __init__(self, document_factory: DocumentFactory):
      self._factory = document_factory  # Injected dependency

      def generate_report(self, data: dict) -> Document:
      content = self._format_data(data)
      # Factory creates the document - type determined by injection
      return self._factory.create_document(content)

      def _format_data(self, data: dict) -> str:
      return "\n".join(f"{k}: {v}" for k, v in data.items())


      # DI container configuration
      class Container:
      def __init__(self, output_format: str = "pdf"):
      self.output_format = output_format

      def get_document_factory(self) -> DocumentFactory:
      """Factory binding determined by configuration."""
      if self.output_format == "pdf":
      return PDFDocumentFactory()
      else:
      return HTMLDocumentFactory()

      def get_report_generator(self) -> ReportGenerator:
      """Compose service with its dependencies."""
      return ReportGenerator(self.get_document_factory())


      # Usage
      container = Container(output_format="html")  # Configuration
      generator = container.get_report_generator()  # Resolved with HTML factory
      report = generator.generate_report({"title": "Q4 Results", "profit": 1000000})
      print(report.render())
      ```

      ### 3.2 Factory Provider Pattern

When you need <span style="color: #166534; font-weight: 600;">deferred creation</span> or multiple instances from a single injection, use the Factory Provider pattern.

      ```python
      from typing import Callable, TypeVar

      T = TypeVar('T')

      # Factory provider type
      DocumentProvider = Callable[[str], Document]


      class EnhancedReportGenerator:
      """
      Service receives a factory FUNCTION, not a factory object.

      This enables:
      1. Lazy instantiation
      2. Multiple instances per service call
      3. Parameterized creation
      """

      def __init__(self, document_provider: DocumentProvider):
      self._create_document = document_provider

      def generate_multi_format_report(
      self,
      data: dict,
      formats: list
      ) -> list:
      content = self._format_data(data)

      # Create multiple documents using the provider
      documents = []
      for fmt in formats:
      doc = self._create_document(content)
      documents.append(doc)

      return documents


      # DI container with provider
      class ModernContainer:
      def __init__(self, output_format: str):
      self.output_format = output_format

      def get_document_provider(self) -> DocumentProvider:
      """
      Return a factory function, not an instance.

      This function captures configuration but defers creation.
      """
      if self.output_format == "pdf":
      return lambda content: PDFDocument(content)
      else:
      return lambda content: HTMLDocument(content)

      def get_report_generator(self) -> EnhancedReportGenerator:
      return EnhancedReportGenerator(self.get_document_provider())
      ```

<div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
<h4 style="margin: 0 0 8px 0; color: #1e40af;">Why Use Factory Providers?</h4>
<p style="margin: 0; color: #1e3a8a; font-size: 14px;">
Standard DI creates one instance per injection. Factory providers let you create <span style="color: #166534; font-weight: 600;">multiple instances on demand</span> while still keeping the creation logic external to the consumer. Common in: HTTP client creation, database connection factories, worker pool managers.
</p>
</div>

      ### 3.3 Scoped Factories

Factories can be <span style="color: #166534; font-weight: 600;">scoped</span> to create products with appropriate lifecycles.

      ```python
      from contextlib import contextmanager
      from typing import Generator


      class ScopedFactory:
      """
      Factory that creates products scoped to a context.

      Products created within a scope share resources and
      are disposed together when the scope ends.
      """

      def __init__(self):
      self._scope_resources: dict = {}
      self._in_scope = False

      @contextmanager
      def scope(self) -> Generator[None, None, None]:
      """Enter a creation scope."""
      self._in_scope = True
      self._scope_resources = {}
      try:
      yield
      finally:
      # Cleanup scope resources
      for resource in self._scope_resources.values():
      if hasattr(resource, 'close'):
      resource.close()
      self._scope_resources.clear()
      self._in_scope = False

      def create_connection(self, name: str) -> 'Connection':
      """Create connection scoped to current scope."""
      if not self._in_scope:
      raise RuntimeError("Must create within scope")

      if name not in self._scope_resources:
      self._scope_resources[name] = Connection(name)

      return self._scope_resources[name]


      # Usage with DI
      class RequestHandler:
      def __init__(self, factory: ScopedFactory):
      self._factory = factory

      def handle(self, request: dict) -> dict:
      with self._factory.scope():
      # All connections in this scope share resources
      db_conn = self._factory.create_connection("database")
      cache_conn = self._factory.create_connection("cache")

      # ... handle request ...

      return {"status": "ok"}
      # Scope ends: all connections automatically closed
      ```

      ### Interview Questions: DI Integration (3 Levels Deep)

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">

        **Level 1: "How does Factory Method work with Dependency Injection?"**

        > Factory Method and DI are complementary patterns. DI injects the factory (or factory function) into services, while Factory Method handles the actual product creation. This separation means:
        >
> - <span style="color: #166534; font-weight: 600;">DI Container</span>: Decides WHICH factory to use (configured at composition root)
> - <span style="color: #166534; font-weight: 600;">Factory Method</span>: Decides HOW to create the product
        >
        > The service doesn't know which factory it received - it just calls the factory method and gets a product.

        **Level 2: "When should you inject a factory vs inject the product directly? What are the implications of each?"**

        > **Inject Product Directly**:
        > ```python
        > class Service:
        >     def __init__(self, database: Database):
        >         self._db = database  # Injected once at construction
        > ```
        > - Product created ONCE at service creation
        > - Same instance used for all operations
        > - Simpler, sufficient for singletons/stateless dependencies
        >
        > **Inject Factory**:
        > ```python
        > class Service:
        >     def __init__(self, db_factory: Callable[[], Database]):
        >         self._create_db = db_factory  # Factory injected
        >
        >     def process(self):
        >         db = self._create_db()  # New instance per call
        > ```
        > - Products created ON DEMAND during operation
        > - Multiple instances possible
        > - Required for: scoped resources, per-request objects, pooled resources
        >
        > **Rule of thumb**: If the service needs different product instances during its lifetime, inject the factory. If one instance suffices, inject the product.

        **Level 3: "Design a DI system where factories themselves have dependencies. How do you handle factory dependencies while maintaining the factory pattern's benefits?"**

        > This is the "factory with dependencies" problem. The factory needs services to create products, but those services are also managed by DI.
        >
        > ```python
        > class DatabaseConnectionFactory:
        >     """Factory that has its own dependencies."""
        >
        >     def __init__(
        >         self,
        >         config_service: ConfigService,
        >         metrics: MetricsService,
        >         logger: ILogger
        >     ):
        >         # Factory dependencies injected
        >         self._config = config_service
        >         self._metrics = metrics
        >         self._logger = logger
        >
        >     def create_connection(self, database_name: str) -> Connection:
        >         # Use dependencies to create product
        >         config = self._config.get_database_config(database_name)
        >
        >         self._logger.info(f"Creating connection to {database_name}")
        >         conn = Connection(
        >             host=config.host,
        >             port=config.port,
        >             credentials=config.credentials
        >         )
        >
        >         # Wrap with metrics
        >         return MetricsWrappedConnection(conn, self._metrics)
        >
        >
        > # DI Container configuration
        > class Container:
        >     def get_connection_factory(self) -> DatabaseConnectionFactory:
        >         # Factory's dependencies resolved first
        >         return DatabaseConnectionFactory(
        >             config_service=self.get_config_service(),
        >             metrics=self.get_metrics_service(),
        >             logger=self.get_logger()
        >         )
        >
        >     def get_user_repository(self) -> UserRepository:
        >         # Service receives factory, not connection
        >         return UserRepository(
        >             connection_factory=self.get_connection_factory()
        >         )
        > ```
        >
        > **Key considerations**:
        > 1. **Lifecycle mismatch**: Factory is often singleton, products are transient. Ensure factory dependencies match factory lifecycle.
        > 2. **Circular dependencies**: If a factory dependency needs products from the same factory, use lazy providers.
        > 3. **Testing**: Mock the factory dependencies, not the factory itself, for unit tests.
        >
        > **Alternative**: Inject factory dependencies as a provider:
        > ```python
        > class LazyDependencyFactory:
        >     def __init__(self, container: Callable[[], Container]):
        >         self._get_container = container  # Lazy container access
        >
        >     def create_connection(self, name: str) -> Connection:
        >         container = self._get_container()  # Resolve when needed
        >         config = container.get_config_service().get(name)
        >         # ...
        > ```
        > This breaks the circular dependency by deferring resolution.

</div>

      ---

      ## Section 4: Real-World Examples and Case Studies

      ### 4.1 Cross-Platform Logger Factory

      ```python
      from abc import ABC, abstractmethod
      from typing import Optional
      import sys
      import json
      from datetime import datetime
      from enum import Enum


      class LogLevel(Enum):
      DEBUG = 10
      INFO = 20
      WARNING = 30
      ERROR = 40
      CRITICAL = 50


      class LogOutput(ABC):
      """Product interface - all loggers must implement this."""

      @abstractmethod
      def write(self, level: LogLevel, message: str, context: dict) -> None:
      pass

      @abstractmethod
      def flush(self) -> None:
      pass

      @abstractmethod
      def close(self) -> None:
      pass


      class ConsoleLogOutput(LogOutput):
      """Console output with color support."""

      COLORS = {
      LogLevel.DEBUG: "\033[36m",    # Cyan
      LogLevel.INFO: "\033[32m",     # Green
      LogLevel.WARNING: "\033[33m",  # Yellow
      LogLevel.ERROR: "\033[31m",    # Red
      LogLevel.CRITICAL: "\033[41m", # Red background
      }
      RESET = "\033[0m"

      def write(self, level: LogLevel, message: str, context: dict) -> None:
      color = self.COLORS.get(level, "")
      timestamp = datetime.now().isoformat()
      formatted = f"{color}[{timestamp}] {level.name}: {message}{self.RESET}"
      if context:
      formatted += f" | context: {context}"
      print(formatted)

      def flush(self) -> None:
      sys.stdout.flush()

      def close(self) -> None:
      pass


      class JSONLogOutput(LogOutput):
      """Structured JSON output for log aggregation systems."""

      def __init__(self, stream=None):
      self._stream = stream or sys.stdout

      def write(self, level: LogLevel, message: str, context: dict) -> None:
      log_entry = {
      "timestamp": datetime.now().isoformat(),
      "level": level.name,
      "message": message,
      **context
      }
      json.dump(log_entry, self._stream)
      self._stream.write("\n")

      def flush(self) -> None:
      self._stream.flush()

      def close(self) -> None:
      if self._stream != sys.stdout:
      self._stream.close()


      class FileLogOutput(LogOutput):
      """File-based log output with rotation support."""

      def __init__(self, filepath: str, max_size_mb: int = 100):
      self._filepath = filepath
      self._max_size = max_size_mb * 1024 * 1024
      self._file = open(filepath, "a")

      def write(self, level: LogLevel, message: str, context: dict) -> None:
      timestamp = datetime.now().isoformat()
      line = f"[{timestamp}] {level.name}: {message}"
      if context:
      line += f" | {json.dumps(context)}"
      self._file.write(line + "\n")
      self._maybe_rotate()

      def _maybe_rotate(self) -> None:
      if self._file.tell() > self._max_size:
      self.close()
      # Rotation logic here
      self._file = open(self._filepath, "a")

      def flush(self) -> None:
      self._file.flush()

      def close(self) -> None:
      self._file.close()


      # Factory Method implementation
      class LoggerFactory(ABC):
      """
      Creator class - defines the logging workflow.
      Subclasses override create_output() to customize output.
      """

      def __init__(self, min_level: LogLevel = LogLevel.INFO):
      self.min_level = min_level
      self._output: Optional[LogOutput] = None

      @abstractmethod
      def create_output(self) -> LogOutput:
      """Factory method - subclasses decide output type."""
      pass

      def get_logger(self) -> 'Logger':
      """
      Template method that uses factory method.

      This ensures consistent logger setup regardless
      of which output type is created.
      """
      if self._output is None:
      self._output = self.create_output()
      return Logger(self._output, self.min_level)


      class Logger:
      """The product-using class created by factory."""

      def __init__(self, output: LogOutput, min_level: LogLevel):
      self._output = output
      self._min_level = min_level

      def log(self, level: LogLevel, message: str, **context) -> None:
      if level.value >= self._min_level.value:
      self._output.write(level, message, context)

      def debug(self, message: str, **context) -> None:
      self.log(LogLevel.DEBUG, message, **context)

      def info(self, message: str, **context) -> None:
      self.log(LogLevel.INFO, message, **context)

      def error(self, message: str, **context) -> None:
      self.log(LogLevel.ERROR, message, **context)


      # Concrete factories
      class DevelopmentLoggerFactory(LoggerFactory):
      """Factory for development environment - colorful console output."""

      def create_output(self) -> LogOutput:
      return ConsoleLogOutput()


      class ProductionLoggerFactory(LoggerFactory):
      """Factory for production - structured JSON for log aggregation."""

      def create_output(self) -> LogOutput:
      return JSONLogOutput()


      class FileLoggerFactory(LoggerFactory):
      """Factory for file-based logging."""

      def __init__(self, filepath: str, min_level: LogLevel = LogLevel.INFO):
      super().__init__(min_level)
      self._filepath = filepath

      def create_output(self) -> LogOutput:
      return FileLogOutput(self._filepath)


      # Usage
      def get_logger_factory(environment: str) -> LoggerFactory:
      """Select factory based on environment."""
      if environment == "development":
      return DevelopmentLoggerFactory(min_level=LogLevel.DEBUG)
      elif environment == "production":
      return ProductionLoggerFactory(min_level=LogLevel.INFO)
      else:
      return FileLoggerFactory("/var/log/app.log")


      # Application code uses factory without knowing output type
      factory = get_logger_factory("production")
      logger = factory.get_logger()
      logger.info("Application started", version="1.0.0", environment="production")
      ```

      ### 4.2 Database Connection Factory

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #cbd5e1; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #334155; margin: 0 0 20px 0; text-align: center;">Database Factory Architecture</h4>

<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 12px 16px; text-align: center;">
<div style="font-weight: 700; color: #1e40af; font-size: 13px;">DatabaseFactory</div>
<div style="font-size: 10px; color: #3b82f6; margin-top: 4px;">interface</div>
<div style="font-family: monospace; font-size: 10px; color: #1e3a5f; margin-top: 6px;">+create_connection()</div>
</div>
</div>

<div style="display: flex; justify-content: center;">
<div style="color: #64748b; font-size: 12px;">implements</div>
</div>

<div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 8px; padding: 10px 14px; text-align: center; min-width: 120px;">
<div style="font-weight: 600; color: #166534; font-size: 12px;">PostgresFactory</div>
<div style="font-size: 9px; color: #15803d; margin-top: 4px;">psycopg2 driver</div>
</div>
<div style="background: #e0e7ff; border: 2px solid #6366f1; border-radius: 8px; padding: 10px 14px; text-align: center; min-width: 120px;">
<div style="font-weight: 600; color: #3730a3; font-size: 12px;">MySQLFactory</div>
<div style="font-size: 9px; color: #4338ca; margin-top: 4px;">mysql-connector</div>
</div>
<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 10px 14px; text-align: center; min-width: 120px;">
<div style="font-weight: 600; color: #92400e; font-size: 12px;">SQLiteFactory</div>
<div style="font-size: 9px; color: #b45309; margin-top: 4px;">sqlite3 built-in</div>
</div>
</div>
</div>
</div>

      ```python
      from abc import ABC, abstractmethod
      from typing import Optional, Dict, Any, List
      from contextlib import contextmanager
      import threading


      class DatabaseConnection(ABC):
      """Product interface for database connections."""

      @abstractmethod
      def execute(self, query: str, params: tuple = ()) -> List[Dict]:
      pass

      @abstractmethod
      def execute_many(self, query: str, params_list: List[tuple]) -> int:
      pass

      @abstractmethod
      def begin_transaction(self) -> None:
      pass

      @abstractmethod
      def commit(self) -> None:
      pass

      @abstractmethod
      def rollback(self) -> None:
      pass

      @abstractmethod
      def close(self) -> None:
      pass

      @contextmanager
      def transaction(self):
      """Context manager for transaction handling."""
      self.begin_transaction()
      try:
      yield self
      self.commit()
      except Exception:
      self.rollback()
      raise


      class PostgresConnection(DatabaseConnection):
      """PostgreSQL connection implementation."""

      def __init__(self, host: str, port: int, database: str,
      user: str, password: str):
      self._config = {
      "host": host, "port": port, "database": database,
      "user": user, "password": password
      }
      self._conn = None
      self._connect()

      def _connect(self) -> None:
      # In production: import psycopg2
      print(f"PostgreSQL: Connecting to {self._config['host']}:{self._config['port']}")
      # self._conn = psycopg2.connect(**self._config)

      def execute(self, query: str, params: tuple = ()) -> List[Dict]:
      print(f"PostgreSQL executing: {query}")
      # Actual implementation would use cursor
      return []

      def execute_many(self, query: str, params_list: List[tuple]) -> int:
      print(f"PostgreSQL batch executing: {query} ({len(params_list)} rows)")
      return len(params_list)

      def begin_transaction(self) -> None:
      print("PostgreSQL: BEGIN")

      def commit(self) -> None:
      print("PostgreSQL: COMMIT")

      def rollback(self) -> None:
      print("PostgreSQL: ROLLBACK")

      def close(self) -> None:
      print("PostgreSQL: Connection closed")


      class MySQLConnection(DatabaseConnection):
      """MySQL connection implementation."""

      def __init__(self, host: str, port: int, database: str,
      user: str, password: str):
      self._config = {
      "host": host, "port": port, "database": database,
      "user": user, "password": password
      }
      print(f"MySQL: Connecting to {host}:{port}")

      def execute(self, query: str, params: tuple = ()) -> List[Dict]:
      print(f"MySQL executing: {query}")
      return []

      def execute_many(self, query: str, params_list: List[tuple]) -> int:
      return len(params_list)

      def begin_transaction(self) -> None:
      print("MySQL: START TRANSACTION")

      def commit(self) -> None:
      print("MySQL: COMMIT")

      def rollback(self) -> None:
      print("MySQL: ROLLBACK")

      def close(self) -> None:
      print("MySQL: Connection closed")


      # Factory Method pattern with connection pooling
      class DatabaseConnectionFactory(ABC):
      """
      Factory for database connections.

      Combines Factory Method with object pooling for
      production-grade connection management.
      """

      def __init__(self, pool_size: int = 10):
      self._pool_size = pool_size
      self._available: List[DatabaseConnection] = []
      self._in_use: List[DatabaseConnection] = []
      self._lock = threading.Lock()

      @abstractmethod
      def create_connection(self) -> DatabaseConnection:
      """Factory method - subclasses create specific connection types."""
      pass

      def acquire(self) -> DatabaseConnection:
      """
      Get a connection from the pool.

      Template method that uses factory method for creation.
      """
      with self._lock:
      if self._available:
      conn = self._available.pop()
      elif len(self._in_use) < self._pool_size:
      conn = self.create_connection()  # Factory method call
      else:
      raise RuntimeError("Connection pool exhausted")

      self._in_use.append(conn)
      return conn

      def release(self, conn: DatabaseConnection) -> None:
      """Return connection to pool."""
      with self._lock:
      if conn in self._in_use:
      self._in_use.remove(conn)
      self._available.append(conn)

      @contextmanager
      def connection(self):
      """Context manager for automatic connection management."""
      conn = self.acquire()
      try:
      yield conn
      finally:
      self.release(conn)


      class PostgresConnectionFactory(DatabaseConnectionFactory):
      """Factory for PostgreSQL connections."""

      def __init__(self, host: str, port: int, database: str,
      user: str, password: str, pool_size: int = 10):
      super().__init__(pool_size)
      self._host = host
      self._port = port
      self._database = database
      self._user = user
      self._password = password

      def create_connection(self) -> DatabaseConnection:
      return PostgresConnection(
      self._host, self._port, self._database,
      self._user, self._password
      )


      class MySQLConnectionFactory(DatabaseConnectionFactory):
      """Factory for MySQL connections."""

      def __init__(self, host: str, port: int, database: str,
      user: str, password: str, pool_size: int = 10):
      super().__init__(pool_size)
      self._host = host
      self._port = port
      self._database = database
      self._user = user
      self._password = password

      def create_connection(self) -> DatabaseConnection:
      return MySQLConnection(
      self._host, self._port, self._database,
      self._user, self._password
      )


      # Usage with Dependency Injection
      class UserRepository:
      """Repository using injected connection factory."""

      def __init__(self, connection_factory: DatabaseConnectionFactory):
      self._factory = connection_factory

      def find_by_id(self, user_id: int) -> Optional[Dict]:
      with self._factory.connection() as conn:
      results = conn.execute(
      "SELECT * FROM users WHERE id = %s",
      (user_id,)
      )
      return results[0] if results else None

      def create_user(self, name: str, email: str) -> int:
      with self._factory.connection() as conn:
      with conn.transaction():
      conn.execute(
      "INSERT INTO users (name, email) VALUES (%s, %s)",
      (name, email)
      )
      return 1  # Would return last insert ID
      ```

      ### 4.3 HTTP Client Factory

      ```python
      from abc import ABC, abstractmethod
      from typing import Dict, Any, Optional
      from dataclasses import dataclass
      from enum import Enum


      class HttpMethod(Enum):
      GET = "GET"
      POST = "POST"
      PUT = "PUT"
      DELETE = "DELETE"


      @dataclass
      class HttpResponse:
      status_code: int
      headers: Dict[str, str]
      body: Any
      elapsed_ms: float


      class HttpClient(ABC):
      """Product interface for HTTP clients."""

      @abstractmethod
      def request(
      self,
      method: HttpMethod,
      url: str,
      headers: Dict[str, str] = None,
      body: Any = None,
      timeout: float = 30.0
      ) -> HttpResponse:
      pass

      def get(self, url: str, **kwargs) -> HttpResponse:
      return self.request(HttpMethod.GET, url, **kwargs)

      def post(self, url: str, body: Any, **kwargs) -> HttpResponse:
      return self.request(HttpMethod.POST, url, body=body, **kwargs)


      class StandardHttpClient(HttpClient):
      """Standard HTTP client using requests library."""

      def request(
      self,
      method: HttpMethod,
      url: str,
      headers: Dict[str, str] = None,
      body: Any = None,
      timeout: float = 30.0
      ) -> HttpResponse:
      print(f"StandardHttpClient: {method.value} {url}")
      # In production: use requests library
      return HttpResponse(200, {}, {"data": "response"}, 100.0)


      class RetryingHttpClient(HttpClient):
      """HTTP client with automatic retry logic."""

      def __init__(self, max_retries: int = 3, backoff_factor: float = 0.5):
      self._max_retries = max_retries
      self._backoff_factor = backoff_factor

      def request(
      self,
      method: HttpMethod,
      url: str,
      headers: Dict[str, str] = None,
      body: Any = None,
      timeout: float = 30.0
      ) -> HttpResponse:
      for attempt in range(self._max_retries + 1):
      print(f"RetryingHttpClient: {method.value} {url} (attempt {attempt + 1})")
      # In production: implement actual retry logic
      return HttpResponse(200, {}, {"data": "response"}, 100.0)


      class CircuitBreakerHttpClient(HttpClient):
      """HTTP client with circuit breaker pattern."""

      def __init__(
      self,
      failure_threshold: int = 5,
      recovery_timeout: float = 30.0
      ):
      self._failure_threshold = failure_threshold
      self._recovery_timeout = recovery_timeout
      self._failure_count = 0
      self._circuit_open = False

      def request(
      self,
      method: HttpMethod,
      url: str,
      headers: Dict[str, str] = None,
      body: Any = None,
      timeout: float = 30.0
      ) -> HttpResponse:
      if self._circuit_open:
      raise RuntimeError("Circuit breaker is open")

      print(f"CircuitBreakerHttpClient: {method.value} {url}")
      return HttpResponse(200, {}, {"data": "response"}, 100.0)


      # Factory with configuration
      @dataclass
      class HttpClientConfig:
      """Configuration for HTTP client creation."""
      timeout: float = 30.0
      max_retries: int = 3
      use_circuit_breaker: bool = False
      failure_threshold: int = 5


      class HttpClientFactory(ABC):
      """Factory for HTTP clients."""

      def __init__(self, config: HttpClientConfig = None):
      self.config = config or HttpClientConfig()

      @abstractmethod
      def create_client(self) -> HttpClient:
      """Factory method."""
      pass


      class StandardHttpClientFactory(HttpClientFactory):
      """Factory for standard HTTP clients."""

      def create_client(self) -> HttpClient:
      return StandardHttpClient()


      class ResilientHttpClientFactory(HttpClientFactory):
      """Factory for resilient HTTP clients with retries."""

      def create_client(self) -> HttpClient:
      if self.config.use_circuit_breaker:
      return CircuitBreakerHttpClient(
      failure_threshold=self.config.failure_threshold
      )
      return RetryingHttpClient(
      max_retries=self.config.max_retries
      )


      # Service using injected factory
      class PaymentGateway:
      """Payment service using HTTP client factory."""

      def __init__(self, http_factory: HttpClientFactory):
      self._http = http_factory.create_client()

      def charge(self, amount: float, token: str) -> Dict:
      response = self._http.post(
      "https://api.stripe.com/v1/charges",
      body={"amount": amount, "source": token}
      )
      return response.body
      ```

      ---

      ## When to Use Factory Method

<div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">

        ### Good Use Cases

1. <span style="color: #166534; font-weight: 600;">Framework/Library Development</span> - Your code defines the algorithm, users extend to provide implementations
2. <span style="color: #166534; font-weight: 600;">Plugin Systems</span> - Core system doesn't know what plugins exist at compile time
3. <span style="color: #166534; font-weight: 600;">Cross-Platform Applications</span> - Same logic, different platform-specific implementations
4. <span style="color: #166534; font-weight: 600;">Testing Infrastructure</span> - Production factory creates real services, test factory creates mocks
5. <span style="color: #166534; font-weight: 600;">Database Connections</span> - Create appropriate connection objects based on database type

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

      ## Interview Questions: Comprehensive (3 Levels Deep)

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">

        ### Conceptual Questions

        <details style="margin-bottom: 12px;">
          <summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q1: What's the difference between Factory Method and Simple Factory?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
<strong>Simple Factory:</strong> A single method/function that creates objects based on parameters. It's not a GoF pattern - just a good practice.
            <br><br>
<strong>Factory Method:</strong> Uses inheritance where subclasses override the creation method. The key is that the superclass defines an algorithm that uses the factory method, and subclasses customize what gets created.
                <br><br>
<strong>Key difference:</strong> Factory Method involves <span style="color: #166534; font-weight: 600;">polymorphism</span> and is extensible without modifying existing code (Open/Closed Principle).
</div>
                </details>

                <details style="margin-bottom: 12px;">
                  <summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q2: Why is Factory Method often used with Template Method?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
                    Factory Method provides the "hook" for [[Template Method]](/topics/design-patterns/template-method). The superclass defines an algorithm (template) that includes creating objects. The factory method is the step that subclasses customize.
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

                                ### Advanced Questions (Level 3)

                                <details style="margin-bottom: 12px;">
                                  <summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q6: Design a factory system for a plugin architecture where plugins are loaded at runtime from external packages</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px; overflow-x: auto;">
                                      from abc import ABC, abstractmethod
                                      from typing import Dict, Type
                                      import importlib
                                      import pkgutil

                                      class Plugin(ABC):
                                      @abstractmethod
                                      def execute(self, context: dict) -> dict:
                                      pass

                                      @property
                                      @abstractmethod
                                      def name(self) -> str:
                                      pass

                                      class PluginFactory:
                                      """
                                      Factory that discovers and loads plugins at runtime.
                                      Supports entry_points for package-based discovery.
                                      """

                                      _plugins: Dict[str, Type[Plugin]] = {}

                                      @classmethod
                                      def discover_plugins(cls, package_name: str) -> None:
                                      """Discover plugins from a package namespace."""
                                      package = importlib.import_module(package_name)

                                      for importer, modname, ispkg in pkgutil.walk_packages(
                                      package.__path__, package.__name__ + "."
                                      ):
                                      module = importlib.import_module(modname)
                                      for name in dir(module):
                                      obj = getattr(module, name)
                                      if (isinstance(obj, type) and
                                      issubclass(obj, Plugin) and
                                      obj is not Plugin):
                                      cls._plugins[obj.name] = obj

                                      @classmethod
                                      def create(cls, name: str, **kwargs) -> Plugin:
                                      if name not in cls._plugins:
                                      raise ValueError(f"Unknown plugin: {name}")
                                      return cls._plugins[name](**kwargs)

                                      @classmethod
                                      def available_plugins(cls) -> list:
                                      return list(cls._plugins.keys())

                                      # At application startup
                                      PluginFactory.discover_plugins("myapp.plugins")
</pre>

<strong>Key considerations:</strong>
<ul>
<li><span style="color: #166534; font-weight: 600;">Isolation:</span> Plugins should be sandboxed to prevent interference</li>
<li><span style="color: #166534; font-weight: 600;">Versioning:</span> Handle plugin API versioning for compatibility</li>
<li><span style="color: #166534; font-weight: 600;">Hot-reload:</span> Consider supporting plugin updates without restart</li>
<li><span style="color: #166534; font-weight: 600;">Dependency injection:</span> Plugins may need access to core services</li>
</ul>
</div>
                                </details>

                                <details style="margin-bottom: 12px;">
                                  <summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q7: How would you implement factory method in a language without inheritance (like Go)?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
In Go, you use <span style="color: #166534; font-weight: 600;">interfaces and function types</span> instead of inheritance:

<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px; overflow-x: auto;">
                                      // Go implementation using interfaces and function types

                                      type Notification interface {
                                      Send(recipient, message string) error
                                      }

                                      // Factory function type
                                      type NotificationFactory func() Notification

                                      // Creator struct with factory function field
                                      type NotificationService struct {
                                      createNotification NotificationFactory
                                      }

                                      func NewEmailService() *NotificationService {
                                      return &NotificationService{
                                      createNotification: func() Notification {
                                      return &EmailNotification{}
                                      },
                                      }
                                      }

                                      func NewSMSService() *NotificationService {
                                      return &NotificationService{
                                      createNotification: func() Notification {
                                      return &SMSNotification{}
                                      },
                                      }
                                      }

                                      func (s *NotificationService) NotifyUser(userID, message string) error {
                                      notification := s.createNotification()
                                      return notification.Send(userID, message)
                                      }
</pre>

<strong>Trade-offs vs inheritance-based approach:</strong>
<ul>
<li><span style="color: #166534; font-weight: 600;">Pro:</span> More explicit, easier to test (just pass different function)</li>
<li><span style="color: #166534; font-weight: 600;">Pro:</span> No inheritance hierarchy to understand</li>
<li><span style="color: #166534; font-weight: 600;">Con:</span> Less discoverable - factory is a function, not a method</li>
<li><span style="color: #166534; font-weight: 600;">Con:</span> Cannot enforce that subclasses implement factory (no abstract classes)</li>
</ul>
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

                                ### Mistake 3: Ignoring Product Lifecycle

                                ```python
                                # BAD: Factory creates but never cleans up
                                class ConnectionFactory:
                                def create_connection(self) -> Connection:
                                return Connection()  # Who closes this?

                                # GOOD: Factory manages full lifecycle
                                class ConnectionFactory:
                                def create_connection(self) -> Connection:
                                conn = Connection()
                                self._active_connections.append(conn)
                                return conn

                                def close_all(self) -> None:
                                for conn in self._active_connections:
                                conn.close()
                                ```

</div>

                              ---

                              ## Key Takeaways

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #93c5fd;">

1. <span style="color: #166534; font-weight: 600;">Factory Method = Inheritance + Template Method</span> - The superclass defines the algorithm, subclasses customize creation

2. <span style="color: #166534; font-weight: 600;">Not just about hiding `new`</span> - The pattern is about deferring instantiation decisions to subclasses

3. <span style="color: #166534; font-weight: 600;">Know when NOT to use it</span> - If you have only one concrete type, just create it directly

4. <span style="color: #166534; font-weight: 600;">Consider DI first</span> - In modern applications, [[Dependency Injection]](/topics/design-patterns/dependency-injection) often provides more flexibility

5. <span style="color: #166534; font-weight: 600;">Products must share interface</span> - All created objects must be usable through the same abstraction

6. <span style="color: #166534; font-weight: 600;">Factory Method creates ONE product</span> - Use [[Abstract Factory]](/topics/design-patterns/abstract-factory) for product families

7. <span style="color: #166534; font-weight: 600;">Parameterized factories add flexibility</span> - Registry-based factories enable plugin architectures

</div>

                              ---

                              ## Quick Reference Card

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 2px solid #e2e8f0;">

                                ### Pattern Essence
<div style="color: #475569;">

                                  - **Intent**: Define interface for creation, let subclasses decide the class
                                  - **Key Benefit**: Extensible without modifying existing code
                                  - **Category**: Creational Pattern (GoF)

</div>

                                ### Decision Checklist

                                | Question | If Yes |
                                |----------|--------|
                                | Only one product type needed? | Use Factory Method |
                                | Multiple related products that must work together? | Use [[Abstract Factory]](/topics/design-patterns/abstract-factory) |
                                | Product type determined at runtime? | Use Parameterized Factory |
                                | Need to inject factory into services? | Combine with [[DI]](/topics/design-patterns/dependency-injection) |
                                | Only one concrete implementation exists? | Skip pattern - use direct construction |

                                ### Code Smell Indicators
                                - Scattered `new` statements throughout codebase
                                - Conditional logic selecting between product types
                                - Difficulty testing due to hard-coded dependencies
                                - Adding new product types requires modifying multiple files

</div>

                              ---

                              ## Related Patterns

                              - [[Abstract Factory]](/topics/design-patterns/abstract-factory) - Creates families of products (Factory Method creates one)
                              - [[Builder]](/topics/design-patterns/builder) - Complex object construction step-by-step
                              - [[Prototype]](/topics/design-patterns/prototype) - Clone existing instances instead of creating new
                              - [[Singleton]](/topics/design-patterns/singleton) - Often combined with Factory for single instances
                              - [[Template Method]](/topics/design-patterns/template-method) - Factory Method often used as a hook in Template Method
                              - [[Strategy]](/topics/design-patterns/strategy) - Can replace Factory Method when behavior varies
                              - [[Dependency Injection]](/topics/design-patterns/dependency-injection) - Modern alternative using composition over inheritance
