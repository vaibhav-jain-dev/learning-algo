# Dependency Injection

## Overview

Dependency Injection (DI) is a design pattern where objects receive their dependencies from external sources rather than creating them internally. Instead of a class instantiating its own collaborators, they are "injected" from outside, typically through constructors, setters, or interfaces. This fundamental technique promotes loose coupling, dramatically improves testability, and enforces separation of concerns throughout your application.

## Why This Matters (Real-World Context)

### Why Do Companies Use This Pattern?

**Testability at Scale**: Companies like Google, Microsoft, and Netflix mandate DI because it makes unit testing trivial. When your UserService receives its DatabaseConnection as a parameter, you can inject a mock database during tests instead of spinning up real infrastructure.

**Configuration Flexibility**: Production uses PostgreSQL, staging uses SQLite, testing uses in-memory mocks - all without changing a single line of business logic. Netflix famously uses DI to swap implementations between their different deployment environments.

**Team Scalability**: When teams grow, DI provides clear boundaries. Team A owns the PaymentProcessor interface, Team B implements StripePaymentProcessor, Team C implements PayPalPaymentProcessor. Nobody steps on each other's code.

### Real Examples from Popular Frameworks

- **Spring Framework (Java)**: The entire framework is built around DI. Every `@Autowired` annotation is dependency injection in action.
- **Angular**: Services are injected into components via constructors, managed by Angular's DI container.
- **ASP.NET Core**: Built-in DI container that wires up controllers, services, and repositories.
- **FastAPI (Python)**: The `Depends()` function is DI - inject database sessions, authentication, or any service.

### What Problems Does It Solve?

1. **Tight Coupling**: Without DI, classes create their own dependencies, making them impossible to test in isolation
2. **Hidden Dependencies**: DI makes all dependencies explicit and visible in constructors
3. **Rigid Architecture**: DI allows swapping implementations without modifying dependent code
4. **Testing Nightmares**: Real databases, email servers, and APIs in tests become mock objects

## Core Concepts

### The Restaurant Kitchen Analogy

Imagine you're a head chef (your class). Without DI, you'd need to:
- Grow your own vegetables
- Raise your own cattle
- Make your own pots and pans

That's insane! Instead, suppliers **inject** ingredients and equipment into your kitchen. You just cook. You don't care if tomatoes come from Farm A or Farm B - they implement the "Tomato" interface.

### Three Types of Injection

**Constructor Injection** (Preferred): Dependencies are passed through the constructor. The object cannot exist without its dependencies.
```
class Chef:
    def __init__(self, ingredients: IngredientSupplier, equipment: KitchenEquipment):
        self.ingredients = ingredients  # Cannot create Chef without these
        self.equipment = equipment
```

**Setter Injection**: Dependencies are set through methods after construction. Useful for optional dependencies.
```
class Chef:
    def set_special_equipment(self, equipment: SpecialEquipment):
        self.special_equipment = equipment  # Optional, can be added later
```

**Interface Injection**: The dependency provides an injector method that injects it into any client passed to it. Rarely used in modern applications.

### The DI Container

A DI container (or IoC container) is like a master registry that:
1. Knows how to create every object in your system
2. Knows what dependencies each object needs
3. Automatically wires everything together

Think of it as a very smart factory that reads a blueprint of your entire application.

## How It Works

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <div style="text-align: center; margin-bottom: 20px;">
    <span style="font-size: 1.25rem; font-weight: 700; color: #334155;">Dependency Injection Flow</span>
  </div>

  <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
    <!-- Without DI -->
    <div style="width: 100%; max-width: 500px;">
      <div style="background: #fee2e2; border: 2px solid #fca5a5; border-radius: 8px; padding: 16px; margin-bottom: 8px;">
        <div style="font-weight: 600; color: #991b1b; margin-bottom: 8px;">Without DI (Tight Coupling)</div>
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
          <div style="background: #fecaca; padding: 8px 16px; border-radius: 6px; color: #7f1d1d;">UserService</div>
          <span style="color: #991b1b;">creates</span>
          <div style="background: #fecaca; padding: 8px 16px; border-radius: 6px; color: #7f1d1d;">new Database()</div>
        </div>
        <div style="text-align: center; color: #991b1b; font-size: 0.85rem; margin-top: 8px;">Class controls its dependencies - hard to test!</div>
      </div>
    </div>

    <!-- Arrow -->
    <div style="font-size: 1.5rem; color: #64748b;">Refactor with DI</div>

    <!-- With DI -->
    <div style="width: 100%; max-width: 600px;">
      <div style="background: #dcfce7; border: 2px solid #86efac; border-radius: 8px; padding: 16px;">
        <div style="font-weight: 600; color: #166534; margin-bottom: 12px;">With DI (Loose Coupling)</div>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          <!-- Container -->
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
            <div style="background: #dbeafe; padding: 10px 20px; border-radius: 8px; color: #1e40af; font-weight: 600;">DI Container</div>
          </div>

          <!-- Arrows down -->
          <div style="display: flex; justify-content: center; gap: 40px;">
            <span style="color: #166534;">creates</span>
            <span style="color: #166534;">creates</span>
          </div>

          <!-- Dependencies -->
          <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
            <div style="background: #f3e8ff; padding: 8px 16px; border-radius: 6px; color: #6b21a8;">Database</div>
            <div style="background: #fef3c7; padding: 8px 16px; border-radius: 6px; color: #92400e;">EmailService</div>
          </div>

          <!-- Arrow down -->
          <div style="text-align: center; color: #166534;">injects into</div>

          <!-- UserService -->
          <div style="display: flex; justify-content: center;">
            <div style="background: #bbf7d0; padding: 12px 24px; border-radius: 8px; color: #14532d; font-weight: 600;">
              UserService(db, email)
            </div>
          </div>
        </div>

        <div style="text-align: center; color: #166534; font-size: 0.85rem; margin-top: 12px;">Dependencies injected from outside - easy to test and swap!</div>
      </div>
    </div>
  </div>
</div>

### Step-by-Step Process

1. **Define Abstractions**: Create interfaces/abstract classes for your dependencies
2. **Implement Concretions**: Build actual implementations of those interfaces
3. **Configure Container**: Register which implementation to use for each interface
4. **Request Objects**: Ask the container for objects - it handles all wiring
5. **Use Objects**: Your code works with abstractions, unaware of concrete types

## Real-Life Usage Example

### Scenario: E-Commerce Order Processing

You're building an order system that needs to:
- Save orders to a database
- Send confirmation emails
- Process payments
- Log everything

Without DI, your OrderService would be a tangled mess of `new Database()`, `new EmailClient()`, etc. With DI:

```python
class OrderService:
    def __init__(
        self,
        order_repo: OrderRepository,      # Injected - could be SQL, NoSQL, or mock
        email_service: EmailService,       # Injected - could be SMTP, SendGrid, or mock
        payment_processor: PaymentProcessor,  # Injected - Stripe, PayPal, or mock
        logger: Logger                     # Injected - File, Cloud, or mock
    ):
        self.order_repo = order_repo
        self.email_service = email_service
        self.payment_processor = payment_processor
        self.logger = logger

    def process_order(self, order: Order) -> OrderResult:
        # Business logic only - no infrastructure concerns
        self.logger.info(f"Processing order {order.id}")

        payment_result = self.payment_processor.charge(order.total)
        if not payment_result.success:
            return OrderResult.failed("Payment declined")

        self.order_repo.save(order)
        self.email_service.send_confirmation(order)

        return OrderResult.success(order.id)
```

In production: Real Stripe, PostgreSQL, SendGrid
In tests: Mock everything, run thousands of tests in seconds

## What to Watch Out For (Common Pitfalls)

### 1. Constructor Overload (Too Many Dependencies)

```python
# BAD: This class does too much
class GodService:
    def __init__(self, db, cache, email, sms, payment, shipping,
                 analytics, logging, auth, config, queue, storage):
        # 12 dependencies = this class has too many responsibilities
```

**Fix**: If you have more than 4-5 dependencies, your class likely violates Single Responsibility. Split it up.

### 2. Service Locator Anti-Pattern

```python
# BAD: Hidden dependencies
class UserService:
    def do_something(self):
        db = ServiceLocator.get("database")  # Dependency is hidden!
        db.query(...)
```

**Fix**: Always inject through constructor. Dependencies should be visible in the class signature.

### 3. Injecting the Container Itself

```python
# BAD: Container as dependency
class UserService:
    def __init__(self, container: DIContainer):
        self.container = container  # Now you can get anything - back to square one
```

**Fix**: Only inject what you need. The container should be invisible to your business logic.

### 4. Circular Dependencies

```python
# BAD: A needs B, B needs A
class ServiceA:
    def __init__(self, service_b: ServiceB): pass

class ServiceB:
    def __init__(self, service_a: ServiceA): pass  # Circular!
```

**Fix**: Introduce an intermediate service or use events to break the cycle.

### 5. Over-Engineering Simple Applications

Not every script needs a DI container. For small applications or scripts, manual wiring is fine:

```python
# Simple manual DI for small apps
db = PostgresDatabase(config.db_url)
email = SendGridEmail(config.sendgrid_key)
service = UserService(db, email)  # That's DI without a container!
```

## Interview Deep Dive

### Frequently Asked Questions

**Q1: What's the difference between Dependency Injection and Inversion of Control?**

IoC is the principle - "don't call us, we'll call you." DI is one technique to achieve IoC. Other IoC techniques include events, callbacks, and template methods. DI specifically addresses how objects get their dependencies.

**Q2: Constructor Injection vs Setter Injection - when to use which?**

| Aspect | Constructor Injection | Setter Injection |
|--------|----------------------|------------------|
| Required deps | Yes - object won't work without them | No - optional dependencies |
| Immutability | Supports immutable objects | Object is mutable |
| Completeness | Object fully initialized after construction | May be in invalid state |
| Testing | Immediately obvious what to mock | Might forget to set something |

**Rule of thumb**: Default to constructor injection. Use setter injection only for truly optional dependencies.

**Q3: How do you handle configuration that varies by environment?**

```python
# The container reads environment and wires accordingly
if environment == "production":
    container.register(Database, PostgresDatabase)
    container.register(EmailService, SendGridService)
elif environment == "test":
    container.register(Database, InMemoryDatabase)
    container.register(EmailService, MockEmailService)
```

**Q4: What's the role of interfaces in DI?**

Interfaces define the contract. Your code depends on the contract (interface), not the implementation. This allows:
- Swapping implementations without changing dependent code
- Multiple implementations of the same interface
- Mocking in tests

**Q5: How does DI affect application startup time?**

DI containers can slow startup because they:
1. Scan for dependencies
2. Build the dependency graph
3. Instantiate objects

Mitigations:
- Lazy initialization (create objects on first use)
- Compile-time DI (like Dagger in Android)
- Limit reflection usage

### System Design Connection

In microservices, DI enables:
- **Feature Flags**: Inject FeatureFlagService to toggle features
- **A/B Testing**: Inject different algorithm implementations
- **Circuit Breakers**: Inject wrapped clients with fallback behavior
- **Multi-tenancy**: Inject tenant-specific configurations

## Code Implementation

### Python - Complete DI Example

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Dict, Any, Optional


# ============================================================
# STEP 1: Define Abstractions (Interfaces)
# ============================================================

class UserRepository(ABC):
    """Interface for user data access."""

    @abstractmethod
    def find_by_id(self, user_id: str) -> Optional[Dict]:
        pass

    @abstractmethod
    def save(self, user: Dict) -> None:
        pass


class EmailService(ABC):
    """Interface for sending emails."""

    @abstractmethod
    def send(self, to: str, subject: str, body: str) -> bool:
        pass


class Logger(ABC):
    """Interface for logging."""

    @abstractmethod
    def info(self, message: str) -> None:
        pass

    @abstractmethod
    def error(self, message: str) -> None:
        pass


# ============================================================
# STEP 2: Implement Concrete Classes
# ============================================================

class PostgresUserRepository(UserRepository):
    """Production implementation using PostgreSQL."""

    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        # In real code: establish connection pool

    def find_by_id(self, user_id: str) -> Optional[Dict]:
        print(f"[Postgres] SELECT * FROM users WHERE id = {user_id}")
        return {"id": user_id, "name": "John", "email": "john@example.com"}

    def save(self, user: Dict) -> None:
        print(f"[Postgres] INSERT INTO users VALUES ({user})")


class InMemoryUserRepository(UserRepository):
    """Test implementation using in-memory storage."""

    def __init__(self):
        self.users: Dict[str, Dict] = {}

    def find_by_id(self, user_id: str) -> Optional[Dict]:
        return self.users.get(user_id)

    def save(self, user: Dict) -> None:
        self.users[user["id"]] = user


class SendGridEmailService(EmailService):
    """Production email service using SendGrid."""

    def __init__(self, api_key: str):
        self.api_key = api_key

    def send(self, to: str, subject: str, body: str) -> bool:
        print(f"[SendGrid] Sending '{subject}' to {to}")
        return True


class MockEmailService(EmailService):
    """Test email service that captures sent emails."""

    def __init__(self):
        self.sent_emails = []

    def send(self, to: str, subject: str, body: str) -> bool:
        self.sent_emails.append({"to": to, "subject": subject, "body": body})
        return True


class ConsoleLogger(Logger):
    """Simple console logger."""

    def info(self, message: str) -> None:
        print(f"[INFO] {message}")

    def error(self, message: str) -> None:
        print(f"[ERROR] {message}")


# ============================================================
# STEP 3: Service That Uses Dependencies (via Constructor Injection)
# ============================================================

class UserService:
    """
    Business logic for user operations.
    All dependencies are injected - this class has no idea about
    PostgreSQL, SendGrid, or any concrete implementation.
    """

    def __init__(
        self,
        user_repository: UserRepository,
        email_service: EmailService,
        logger: Logger
    ):
        self.user_repository = user_repository
        self.email_service = email_service
        self.logger = logger

    def register_user(self, user_id: str, name: str, email: str) -> Dict:
        self.logger.info(f"Registering user: {name}")

        user = {"id": user_id, "name": name, "email": email}
        self.user_repository.save(user)

        self.email_service.send(
            to=email,
            subject="Welcome!",
            body=f"Hello {name}, welcome to our platform!"
        )

        self.logger.info(f"User {name} registered successfully")
        return user

    def get_user(self, user_id: str) -> Optional[Dict]:
        return self.user_repository.find_by_id(user_id)


# ============================================================
# STEP 4: DI Container
# ============================================================

class Container:
    """
    Simple DI container that manages object creation and lifecycle.
    In production, you'd use a library like dependency-injector.
    """

    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self._singletons: Dict[str, Any] = {}

    def get_logger(self) -> Logger:
        if "logger" not in self._singletons:
            self._singletons["logger"] = ConsoleLogger()
        return self._singletons["logger"]

    def get_user_repository(self) -> UserRepository:
        if "user_repo" not in self._singletons:
            if self.config.get("environment") == "test":
                self._singletons["user_repo"] = InMemoryUserRepository()
            else:
                self._singletons["user_repo"] = PostgresUserRepository(
                    self.config["database_url"]
                )
        return self._singletons["user_repo"]

    def get_email_service(self) -> EmailService:
        if "email" not in self._singletons:
            if self.config.get("environment") == "test":
                self._singletons["email"] = MockEmailService()
            else:
                self._singletons["email"] = SendGridEmailService(
                    self.config["sendgrid_api_key"]
                )
        return self._singletons["email"]

    def get_user_service(self) -> UserService:
        if "user_service" not in self._singletons:
            self._singletons["user_service"] = UserService(
                user_repository=self.get_user_repository(),
                email_service=self.get_email_service(),
                logger=self.get_logger()
            )
        return self._singletons["user_service"]


# ============================================================
# STEP 5: Usage
# ============================================================

# Production configuration
prod_config = {
    "environment": "production",
    "database_url": "postgresql://localhost/myapp",
    "sendgrid_api_key": "SG.xxxxx"
}

print("=== Production Mode ===")
prod_container = Container(prod_config)
prod_user_service = prod_container.get_user_service()
prod_user_service.register_user("1", "Alice", "alice@example.com")

# Test configuration - completely different implementations!
test_config = {
    "environment": "test"
}

print("\n=== Test Mode ===")
test_container = Container(test_config)
test_user_service = test_container.get_user_service()
test_user_service.register_user("2", "Bob", "bob@test.com")

# In tests, we can verify emails were "sent"
mock_email = test_container.get_email_service()
print(f"Emails captured: {mock_email.sent_emails}")
```

### Go - Complete DI Example

```go
package main

import (
	"fmt"
)

// ============================================================
// STEP 1: Define Interfaces
// ============================================================

type User struct {
	ID    string
	Name  string
	Email string
}

type UserRepository interface {
	FindByID(id string) (*User, error)
	Save(user *User) error
}

type EmailService interface {
	Send(to, subject, body string) error
}

type Logger interface {
	Info(message string)
	Error(message string)
}

// ============================================================
// STEP 2: Implement Concrete Types
// ============================================================

// PostgresUserRepository - Production implementation
type PostgresUserRepository struct {
	connectionString string
}

func NewPostgresUserRepository(connStr string) *PostgresUserRepository {
	return &PostgresUserRepository{connectionString: connStr}
}

func (r *PostgresUserRepository) FindByID(id string) (*User, error) {
	fmt.Printf("[Postgres] SELECT * FROM users WHERE id = %s\n", id)
	return &User{ID: id, Name: "John", Email: "john@example.com"}, nil
}

func (r *PostgresUserRepository) Save(user *User) error {
	fmt.Printf("[Postgres] INSERT INTO users VALUES (%+v)\n", user)
	return nil
}

// InMemoryUserRepository - Test implementation
type InMemoryUserRepository struct {
	users map[string]*User
}

func NewInMemoryUserRepository() *InMemoryUserRepository {
	return &InMemoryUserRepository{users: make(map[string]*User)}
}

func (r *InMemoryUserRepository) FindByID(id string) (*User, error) {
	user, exists := r.users[id]
	if !exists {
		return nil, fmt.Errorf("user not found: %s", id)
	}
	return user, nil
}

func (r *InMemoryUserRepository) Save(user *User) error {
	r.users[user.ID] = user
	return nil
}

// SendGridEmailService - Production implementation
type SendGridEmailService struct {
	apiKey string
}

func NewSendGridEmailService(apiKey string) *SendGridEmailService {
	return &SendGridEmailService{apiKey: apiKey}
}

func (s *SendGridEmailService) Send(to, subject, body string) error {
	fmt.Printf("[SendGrid] Sending '%s' to %s\n", subject, to)
	return nil
}

// MockEmailService - Test implementation
type MockEmailService struct {
	SentEmails []map[string]string
}

func NewMockEmailService() *MockEmailService {
	return &MockEmailService{SentEmails: make([]map[string]string, 0)}
}

func (s *MockEmailService) Send(to, subject, body string) error {
	s.SentEmails = append(s.SentEmails, map[string]string{
		"to": to, "subject": subject, "body": body,
	})
	return nil
}

// ConsoleLogger
type ConsoleLogger struct{}

func (l *ConsoleLogger) Info(message string) {
	fmt.Printf("[INFO] %s\n", message)
}

func (l *ConsoleLogger) Error(message string) {
	fmt.Printf("[ERROR] %s\n", message)
}

// ============================================================
// STEP 3: Service Using Constructor Injection
// ============================================================

type UserService struct {
	repo   UserRepository
	email  EmailService
	logger Logger
}

// Constructor receives all dependencies
func NewUserService(repo UserRepository, email EmailService, logger Logger) *UserService {
	return &UserService{
		repo:   repo,
		email:  email,
		logger: logger,
	}
}

func (s *UserService) RegisterUser(id, name, email string) (*User, error) {
	s.logger.Info(fmt.Sprintf("Registering user: %s", name))

	user := &User{ID: id, Name: name, Email: email}

	if err := s.repo.Save(user); err != nil {
		s.logger.Error(fmt.Sprintf("Failed to save user: %v", err))
		return nil, err
	}

	if err := s.email.Send(email, "Welcome!", "Welcome to our platform!"); err != nil {
		s.logger.Error(fmt.Sprintf("Failed to send email: %v", err))
		// Don't fail registration if email fails
	}

	s.logger.Info(fmt.Sprintf("User %s registered successfully", name))
	return user, nil
}

func (s *UserService) GetUser(id string) (*User, error) {
	return s.repo.FindByID(id)
}

// ============================================================
// STEP 4: DI Container
// ============================================================

type Config struct {
	Environment    string
	DatabaseURL    string
	SendGridAPIKey string
}

type Container struct {
	config      Config
	logger      Logger
	repo        UserRepository
	email       EmailService
	userService *UserService
}

func NewContainer(config Config) *Container {
	c := &Container{config: config}

	// Wire up dependencies based on environment
	c.logger = &ConsoleLogger{}

	if config.Environment == "test" {
		c.repo = NewInMemoryUserRepository()
		c.email = NewMockEmailService()
	} else {
		c.repo = NewPostgresUserRepository(config.DatabaseURL)
		c.email = NewSendGridEmailService(config.SendGridAPIKey)
	}

	c.userService = NewUserService(c.repo, c.email, c.logger)

	return c
}

func (c *Container) UserService() *UserService {
	return c.userService
}

func (c *Container) EmailService() EmailService {
	return c.email
}

// ============================================================
// STEP 5: Usage
// ============================================================

func main() {
	// Production setup
	fmt.Println("=== Production Mode ===")
	prodContainer := NewContainer(Config{
		Environment:    "production",
		DatabaseURL:    "postgresql://localhost/myapp",
		SendGridAPIKey: "SG.xxxxx",
	})

	prodService := prodContainer.UserService()
	prodService.RegisterUser("1", "Alice", "alice@example.com")

	// Test setup - completely different implementations!
	fmt.Println("\n=== Test Mode ===")
	testContainer := NewContainer(Config{
		Environment: "test",
	})

	testService := testContainer.UserService()
	testService.RegisterUser("2", "Bob", "bob@test.com")

	// In tests, we can verify emails were "sent"
	mockEmail := testContainer.EmailService().(*MockEmailService)
	fmt.Printf("Emails captured: %+v\n", mockEmail.SentEmails)
}
```

## Quick Reference Card

```
+------------------------------------------------------------------+
|                    DEPENDENCY INJECTION                          |
+------------------------------------------------------------------+
| WHAT: Objects receive dependencies from outside, not create them |
| WHY:  Testability, flexibility, loose coupling                   |
+------------------------------------------------------------------+
| THREE TYPES:                                                     |
|   Constructor (preferred) - Required dependencies                |
|   Setter                  - Optional dependencies                |
|   Interface               - Rarely used                          |
+------------------------------------------------------------------+
| KEY PRINCIPLES:                                                  |
|   - Depend on abstractions, not concretions                      |
|   - Inject at construction time                                  |
|   - Single composition root (wire once at startup)               |
|   - Keep constructors simple (no business logic)                 |
+------------------------------------------------------------------+
| RED FLAGS:                                                       |
|   - More than 5 constructor parameters                           |
|   - Using 'new' inside business logic                            |
|   - Service locator pattern                                      |
|   - Injecting the container itself                               |
+------------------------------------------------------------------+
| TESTING BENEFIT:                                                 |
|   Production: UserService(PostgresRepo, SendGridEmail)           |
|   Testing:    UserService(MockRepo, MockEmail)                   |
|   Same code, different implementations!                          |
+------------------------------------------------------------------+
| REMEMBER:                                                        |
|   "Don't call us, we'll call you" - Hollywood Principle          |
|   Objects don't find dependencies, dependencies find objects     |
+------------------------------------------------------------------+
```

## Related Patterns

- [Factory Method](/topic/design-patterns/factory-method) - Can be used by DI containers to create objects
- [Strategy](/topic/design-patterns/strategy) - DI is perfect for injecting interchangeable strategies
- [Decorator](/topic/design-patterns/decorator) - Inject decorated versions of services
- [Singleton](/topic/design-patterns/singleton) - DI containers often manage singleton lifecycle
