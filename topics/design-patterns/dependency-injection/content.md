# Dependency Injection

## Overview

Dependency Injection (DI) is a design pattern where objects receive their dependencies from external sources rather than creating them internally. It promotes loose coupling, testability, and separation of concerns.

## Key Concepts

### Types of Injection

1. **Constructor Injection**: Dependencies passed via constructor
2. **Setter Injection**: Dependencies set via methods
3. **Interface Injection**: Dependency provides injector method

### Benefits

- **Testability**: Easy to mock dependencies
- **Flexibility**: Swap implementations without code changes
- **Decoupling**: Classes don't create their dependencies
- **Single Responsibility**: Separation of creation and use

## Implementation

### Python - Manual Dependency Injection

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List

# Interfaces
class EmailService(ABC):
    @abstractmethod
    def send(self, to: str, subject: str, body: str) -> bool:
        pass


class UserRepository(ABC):
    @abstractmethod
    def find_by_id(self, user_id: str) -> dict:
        pass

    @abstractmethod
    def save(self, user: dict) -> None:
        pass


class Logger(ABC):
    @abstractmethod
    def info(self, message: str) -> None:
        pass

    @abstractmethod
    def error(self, message: str) -> None:
        pass


# Implementations
class SMTPEmailService(EmailService):
    def __init__(self, host: str, port: int):
        self.host = host
        self.port = port

    def send(self, to: str, subject: str, body: str) -> bool:
        print(f"SMTP: Sending email to {to}")
        return True


class SendGridEmailService(EmailService):
    def __init__(self, api_key: str):
        self.api_key = api_key

    def send(self, to: str, subject: str, body: str) -> bool:
        print(f"SendGrid: Sending email to {to}")
        return True


class PostgreSQLUserRepository(UserRepository):
    def __init__(self, connection_string: str):
        self.connection_string = connection_string

    def find_by_id(self, user_id: str) -> dict:
        print(f"PostgreSQL: Finding user {user_id}")
        return {"id": user_id, "name": "John", "email": "john@example.com"}

    def save(self, user: dict) -> None:
        print(f"PostgreSQL: Saving user {user['id']}")


class InMemoryUserRepository(UserRepository):
    def __init__(self):
        self.users = {}

    def find_by_id(self, user_id: str) -> dict:
        return self.users.get(user_id)

    def save(self, user: dict) -> None:
        self.users[user["id"]] = user


class ConsoleLogger(Logger):
    def info(self, message: str) -> None:
        print(f"[INFO] {message}")

    def error(self, message: str) -> None:
        print(f"[ERROR] {message}")


# Service using dependency injection
class UserService:
    def __init__(
        self,
        user_repository: UserRepository,
        email_service: EmailService,
        logger: Logger
    ):
        self.user_repository = user_repository
        self.email_service = email_service
        self.logger = logger

    def register_user(self, user_id: str, name: str, email: str) -> dict:
        self.logger.info(f"Registering user: {name}")

        user = {"id": user_id, "name": name, "email": email}
        self.user_repository.save(user)

        self.email_service.send(
            email,
            "Welcome!",
            f"Hello {name}, welcome to our platform!"
        )

        self.logger.info(f"User {name} registered successfully")
        return user

    def get_user(self, user_id: str) -> dict:
        return self.user_repository.find_by_id(user_id)


# Composition Root - wire up dependencies
class Container:
    """Simple DI container"""

    def __init__(self, config: dict):
        self.config = config
        self._instances = {}

    def get_logger(self) -> Logger:
        if "logger" not in self._instances:
            self._instances["logger"] = ConsoleLogger()
        return self._instances["logger"]

    def get_email_service(self) -> EmailService:
        if "email" not in self._instances:
            if self.config.get("email_provider") == "sendgrid":
                self._instances["email"] = SendGridEmailService(
                    self.config["sendgrid_api_key"]
                )
            else:
                self._instances["email"] = SMTPEmailService(
                    self.config["smtp_host"],
                    self.config["smtp_port"]
                )
        return self._instances["email"]

    def get_user_repository(self) -> UserRepository:
        if "user_repo" not in self._instances:
            if self.config.get("env") == "test":
                self._instances["user_repo"] = InMemoryUserRepository()
            else:
                self._instances["user_repo"] = PostgreSQLUserRepository(
                    self.config["database_url"]
                )
        return self._instances["user_repo"]

    def get_user_service(self) -> UserService:
        if "user_service" not in self._instances:
            self._instances["user_service"] = UserService(
                self.get_user_repository(),
                self.get_email_service(),
                self.get_logger()
            )
        return self._instances["user_service"]


# Production configuration
prod_config = {
    "env": "production",
    "database_url": "postgresql://localhost/myapp",
    "email_provider": "sendgrid",
    "sendgrid_api_key": "SG.xxxxx"
}

container = Container(prod_config)
user_service = container.get_user_service()
user_service.register_user("1", "Alice", "alice@example.com")


# Test configuration - different implementations
test_config = {
    "env": "test",
    "email_provider": "smtp",
    "smtp_host": "localhost",
    "smtp_port": 1025
}

test_container = Container(test_config)
test_service = test_container.get_user_service()
```

### Go - Dependency Injection

```go
package main

import (
	"fmt"
)

// Interfaces
type Logger interface {
	Info(message string)
	Error(message string)
}

type EmailSender interface {
	Send(to, subject, body string) error
}

type UserRepository interface {
	FindByID(id string) (*User, error)
	Save(user *User) error
}

type User struct {
	ID    string
	Name  string
	Email string
}

// Implementations
type ConsoleLogger struct{}

func (l *ConsoleLogger) Info(message string) {
	fmt.Printf("[INFO] %s\n", message)
}

func (l *ConsoleLogger) Error(message string) {
	fmt.Printf("[ERROR] %s\n", message)
}

type SMTPEmailSender struct {
	Host string
	Port int
}

func (s *SMTPEmailSender) Send(to, subject, body string) error {
	fmt.Printf("SMTP: Sending to %s: %s\n", to, subject)
	return nil
}

type InMemoryUserRepository struct {
	users map[string]*User
}

func NewInMemoryUserRepository() *InMemoryUserRepository {
	return &InMemoryUserRepository{
		users: make(map[string]*User),
	}
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

// Service with injected dependencies
type UserService struct {
	repo   UserRepository
	email  EmailSender
	logger Logger
}

func NewUserService(repo UserRepository, email EmailSender, logger Logger) *UserService {
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

// Container for dependency management
type Container struct {
	logger          Logger
	emailSender     EmailSender
	userRepository  UserRepository
	userService     *UserService
}

type Config struct {
	SMTPHost string
	SMTPPort int
}

func NewContainer(config Config) *Container {
	c := &Container{}

	// Create dependencies
	c.logger = &ConsoleLogger{}
	c.emailSender = &SMTPEmailSender{
		Host: config.SMTPHost,
		Port: config.SMTPPort,
	}
	c.userRepository = NewInMemoryUserRepository()

	// Wire up services
	c.userService = NewUserService(
		c.userRepository,
		c.emailSender,
		c.logger,
	)

	return c
}

func (c *Container) UserService() *UserService {
	return c.userService
}

func main() {
	// Production setup
	container := NewContainer(Config{
		SMTPHost: "smtp.example.com",
		SMTPPort: 587,
	})

	userService := container.UserService()
	user, _ := userService.RegisterUser("1", "Alice", "alice@example.com")
	fmt.Printf("Created user: %+v\n", user)
}
```

### Python - Testing with DI

```python
import unittest
from unittest.mock import Mock, MagicMock

class TestUserService(unittest.TestCase):
    def setUp(self):
        # Create mock dependencies
        self.mock_repo = Mock(spec=UserRepository)
        self.mock_email = Mock(spec=EmailService)
        self.mock_logger = Mock(spec=Logger)

        # Inject mocks
        self.service = UserService(
            self.mock_repo,
            self.mock_email,
            self.mock_logger
        )

    def test_register_user_saves_to_repository(self):
        # Arrange
        user_id = "123"
        name = "Alice"
        email = "alice@example.com"

        # Act
        result = self.service.register_user(user_id, name, email)

        # Assert
        self.mock_repo.save.assert_called_once()
        saved_user = self.mock_repo.save.call_args[0][0]
        self.assertEqual(saved_user["id"], user_id)
        self.assertEqual(saved_user["name"], name)

    def test_register_user_sends_welcome_email(self):
        # Arrange
        email = "bob@example.com"

        # Act
        self.service.register_user("1", "Bob", email)

        # Assert
        self.mock_email.send.assert_called_once()
        call_args = self.mock_email.send.call_args[0]
        self.assertEqual(call_args[0], email)
        self.assertIn("Welcome", call_args[1])

    def test_register_user_logs_activity(self):
        # Act
        self.service.register_user("1", "Charlie", "charlie@example.com")

        # Assert
        self.assertEqual(self.mock_logger.info.call_count, 2)

    def test_get_user_returns_from_repository(self):
        # Arrange
        expected_user = {"id": "1", "name": "Dave"}
        self.mock_repo.find_by_id.return_value = expected_user

        # Act
        result = self.service.get_user("1")

        # Assert
        self.assertEqual(result, expected_user)
        self.mock_repo.find_by_id.assert_called_with("1")


if __name__ == "__main__":
    unittest.main()
```

### Go - Interface-Based Testing

```go
package main

import (
	"testing"
)

// Mock implementations for testing
type MockLogger struct {
	InfoCalls  []string
	ErrorCalls []string
}

func (m *MockLogger) Info(message string) {
	m.InfoCalls = append(m.InfoCalls, message)
}

func (m *MockLogger) Error(message string) {
	m.ErrorCalls = append(m.ErrorCalls, message)
}

type MockEmailSender struct {
	SendCalls []struct {
		To      string
		Subject string
		Body    string
	}
	ShouldFail bool
}

func (m *MockEmailSender) Send(to, subject, body string) error {
	m.SendCalls = append(m.SendCalls, struct {
		To      string
		Subject string
		Body    string
	}{to, subject, body})

	if m.ShouldFail {
		return fmt.Errorf("email failed")
	}
	return nil
}

func TestUserService_RegisterUser(t *testing.T) {
	// Arrange
	mockRepo := NewInMemoryUserRepository()
	mockEmail := &MockEmailSender{}
	mockLogger := &MockLogger{}

	service := NewUserService(mockRepo, mockEmail, mockLogger)

	// Act
	user, err := service.RegisterUser("1", "Alice", "alice@example.com")

	// Assert
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if user.Name != "Alice" {
		t.Errorf("expected name Alice, got %s", user.Name)
	}

	if len(mockEmail.SendCalls) != 1 {
		t.Errorf("expected 1 email, got %d", len(mockEmail.SendCalls))
	}

	if len(mockLogger.InfoCalls) != 2 {
		t.Errorf("expected 2 log calls, got %d", len(mockLogger.InfoCalls))
	}
}

func TestUserService_RegisterUser_EmailFailure_StillSucceeds(t *testing.T) {
	// Arrange
	mockRepo := NewInMemoryUserRepository()
	mockEmail := &MockEmailSender{ShouldFail: true}
	mockLogger := &MockLogger{}

	service := NewUserService(mockRepo, mockEmail, mockLogger)

	// Act
	user, err := service.RegisterUser("1", "Bob", "bob@example.com")

	// Assert - should still succeed
	if err != nil {
		t.Fatalf("registration should succeed even if email fails")
	}

	if user.Name != "Bob" {
		t.Errorf("expected name Bob, got %s", user.Name)
	}

	// Error should be logged
	if len(mockLogger.ErrorCalls) != 1 {
		t.Errorf("expected error to be logged")
	}
}
```

## Common Interview Questions

1. **DI vs Service Locator?**
   - DI: Dependencies pushed to object
   - Service Locator: Object pulls dependencies

2. **Constructor vs Setter injection?**
   - Constructor: Required dependencies, immutable
   - Setter: Optional dependencies, mutable

3. **What's a DI Container?**
   - Manages object creation and lifecycle
   - Resolves dependency graph automatically

## Best Practices

1. **Depend on abstractions** - Use interfaces
2. **Inject at construction** - Prefer constructor injection
3. **Single composition root** - Wire up in one place
4. **Avoid service locator** - Makes dependencies hidden
5. **Keep constructors simple** - Don't do work in constructor

## Related Patterns

- [Factory Method](/topic/design-patterns/factory-method) - Object creation
- [Strategy](/topic/design-patterns/strategy) - Interchangeable behaviors
- [Decorator](/topic/design-patterns/decorator) - Add functionality
