# Proxy Pattern

## Overview

The Proxy pattern provides a surrogate or placeholder for another object to control access to it. The proxy acts as an intermediary, adding a level of indirection to support controlled access, lazy initialization, logging, or other cross-cutting concerns.

## Key Concepts

### Types of Proxies

1. **Virtual Proxy**: Lazy initialization of expensive objects
2. **Protection Proxy**: Access control
3. **Remote Proxy**: Local representative for remote object
4. **Logging Proxy**: Add logging to operations
5. **Caching Proxy**: Cache results of expensive operations

### Structure

```
┌─────────────────────────┐
│       Subject           │
├─────────────────────────┤
│ + request()             │
└───────────┬─────────────┘
            △
    ┌───────┴───────┐
┌───┴─────┐    ┌───┴────────┐
│RealSubject    │   Proxy    │
├──────────┤   ├────────────┤
│+request()│   │-realSubject│
└──────────┘   │+request()  │
               └────────────┘
```

## Implementation

### Python - Virtual Proxy (Lazy Loading)

```python
from abc import ABC, abstractmethod
from typing import Optional
import time

class Image(ABC):
    @abstractmethod
    def display(self) -> None:
        pass

    @abstractmethod
    def get_dimensions(self) -> tuple:
        pass


class HighResolutionImage(Image):
    """Expensive to create - loads large image from disk"""

    def __init__(self, filename: str):
        self.filename = filename
        self._load_image()

    def _load_image(self):
        print(f"Loading high-resolution image: {self.filename}")
        time.sleep(2)  # Simulate slow loading
        self.width = 4000
        self.height = 3000
        self.data = b"large_image_data"
        print(f"Image loaded: {self.width}x{self.height}")

    def display(self) -> None:
        print(f"Displaying {self.filename}")

    def get_dimensions(self) -> tuple:
        return (self.width, self.height)


class ImageProxy(Image):
    """Virtual proxy that delays image loading until needed"""

    def __init__(self, filename: str):
        self.filename = filename
        self._real_image: Optional[HighResolutionImage] = None
        # Lightweight metadata
        self._cached_dimensions = None

    def _get_real_image(self) -> HighResolutionImage:
        if self._real_image is None:
            self._real_image = HighResolutionImage(self.filename)
        return self._real_image

    def display(self) -> None:
        self._get_real_image().display()

    def get_dimensions(self) -> tuple:
        # Could return cached dimensions without loading full image
        if self._cached_dimensions:
            return self._cached_dimensions
        return self._get_real_image().get_dimensions()


# Usage
print("Creating image proxy (fast)...")
image = ImageProxy("large_photo.jpg")
print("Proxy created\n")

print("Getting dimensions (triggers loading)...")
print(f"Dimensions: {image.get_dimensions()}\n")

print("Displaying image...")
image.display()
```

### Python - Protection Proxy (Access Control)

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from enum import Enum
from typing import List, Optional

class Permission(Enum):
    READ = "read"
    WRITE = "write"
    DELETE = "delete"
    ADMIN = "admin"


@dataclass
class User:
    username: str
    permissions: List[Permission]

    def has_permission(self, permission: Permission) -> bool:
        return Permission.ADMIN in self.permissions or permission in self.permissions


class Document(ABC):
    @abstractmethod
    def read(self) -> str:
        pass

    @abstractmethod
    def write(self, content: str) -> None:
        pass

    @abstractmethod
    def delete(self) -> None:
        pass


class RealDocument(Document):
    def __init__(self, name: str, content: str = ""):
        self.name = name
        self.content = content

    def read(self) -> str:
        return self.content

    def write(self, content: str) -> None:
        self.content = content
        print(f"Document '{self.name}' updated")

    def delete(self) -> None:
        print(f"Document '{self.name}' deleted")


class ProtectedDocument(Document):
    """Protection proxy that checks permissions"""

    def __init__(self, document: RealDocument, user: User):
        self._document = document
        self._user = user

    def _check_permission(self, permission: Permission) -> None:
        if not self._user.has_permission(permission):
            raise PermissionError(
                f"User '{self._user.username}' lacks {permission.value} permission"
            )

    def read(self) -> str:
        self._check_permission(Permission.READ)
        return self._document.read()

    def write(self, content: str) -> None:
        self._check_permission(Permission.WRITE)
        self._document.write(content)

    def delete(self) -> None:
        self._check_permission(Permission.DELETE)
        self._document.delete()


# Usage
admin = User("admin", [Permission.ADMIN])
reader = User("reader", [Permission.READ])
writer = User("writer", [Permission.READ, Permission.WRITE])

doc = RealDocument("secret.txt", "Confidential content")

# Admin can do everything
admin_doc = ProtectedDocument(doc, admin)
print(admin_doc.read())
admin_doc.write("Updated by admin")

# Reader can only read
reader_doc = ProtectedDocument(doc, reader)
print(reader_doc.read())
try:
    reader_doc.write("Hacked!")
except PermissionError as e:
    print(f"Access denied: {e}")

# Writer can read and write but not delete
writer_doc = ProtectedDocument(doc, writer)
writer_doc.write("Updated by writer")
try:
    writer_doc.delete()
except PermissionError as e:
    print(f"Access denied: {e}")
```

### Go - Caching Proxy

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

// Subject interface
type DataFetcher interface {
	Fetch(key string) (string, error)
}

// Real subject - slow database
type Database struct {
	data map[string]string
}

func NewDatabase() *Database {
	return &Database{
		data: map[string]string{
			"user:1":    "Alice",
			"user:2":    "Bob",
			"product:1": "iPhone",
			"product:2": "MacBook",
		},
	}
}

func (d *Database) Fetch(key string) (string, error) {
	fmt.Printf("Database: Fetching %s (slow operation)\n", key)
	time.Sleep(500 * time.Millisecond) // Simulate slow DB

	value, exists := d.data[key]
	if !exists {
		return "", fmt.Errorf("key not found: %s", key)
	}
	return value, nil
}

// Caching Proxy
type CacheEntry struct {
	Value     string
	ExpiresAt time.Time
}

type CachingProxy struct {
	database   DataFetcher
	cache      map[string]CacheEntry
	mu         sync.RWMutex
	ttl        time.Duration
	hitCount   int
	missCount  int
}

func NewCachingProxy(database DataFetcher, ttl time.Duration) *CachingProxy {
	return &CachingProxy{
		database: database,
		cache:    make(map[string]CacheEntry),
		ttl:      ttl,
	}
}

func (p *CachingProxy) Fetch(key string) (string, error) {
	// Check cache first
	p.mu.RLock()
	entry, exists := p.cache[key]
	p.mu.RUnlock()

	if exists && time.Now().Before(entry.ExpiresAt) {
		p.hitCount++
		fmt.Printf("Cache HIT for %s\n", key)
		return entry.Value, nil
	}

	// Cache miss - fetch from database
	p.missCount++
	fmt.Printf("Cache MISS for %s\n", key)

	value, err := p.database.Fetch(key)
	if err != nil {
		return "", err
	}

	// Store in cache
	p.mu.Lock()
	p.cache[key] = CacheEntry{
		Value:     value,
		ExpiresAt: time.Now().Add(p.ttl),
	}
	p.mu.Unlock()

	return value, nil
}

func (p *CachingProxy) Stats() (hits, misses int) {
	return p.hitCount, p.missCount
}

func (p *CachingProxy) Invalidate(key string) {
	p.mu.Lock()
	delete(p.cache, key)
	p.mu.Unlock()
}

func (p *CachingProxy) Clear() {
	p.mu.Lock()
	p.cache = make(map[string]CacheEntry)
	p.mu.Unlock()
}

func main() {
	db := NewDatabase()
	proxy := NewCachingProxy(db, 5*time.Second)

	// First fetch - cache miss
	value, _ := proxy.Fetch("user:1")
	fmt.Printf("Got: %s\n\n", value)

	// Second fetch - cache hit
	value, _ = proxy.Fetch("user:1")
	fmt.Printf("Got: %s\n\n", value)

	// Different key - cache miss
	value, _ = proxy.Fetch("product:1")
	fmt.Printf("Got: %s\n\n", value)

	// Same key - cache hit
	value, _ = proxy.Fetch("product:1")
	fmt.Printf("Got: %s\n\n", value)

	// Stats
	hits, misses := proxy.Stats()
	fmt.Printf("Cache Stats - Hits: %d, Misses: %d\n", hits, misses)
}
```

### Go - Logging Proxy

```go
package main

import (
	"fmt"
	"log"
	"time"
)

type UserService interface {
	GetUser(id string) (*User, error)
	CreateUser(name, email string) (*User, error)
	DeleteUser(id string) error
}

type User struct {
	ID    string
	Name  string
	Email string
}

// Real service
type RealUserService struct {
	users map[string]*User
}

func NewRealUserService() *RealUserService {
	return &RealUserService{
		users: make(map[string]*User),
	}
}

func (s *RealUserService) GetUser(id string) (*User, error) {
	user, exists := s.users[id]
	if !exists {
		return nil, fmt.Errorf("user not found: %s", id)
	}
	return user, nil
}

func (s *RealUserService) CreateUser(name, email string) (*User, error) {
	id := fmt.Sprintf("user-%d", time.Now().UnixNano())
	user := &User{ID: id, Name: name, Email: email}
	s.users[id] = user
	return user, nil
}

func (s *RealUserService) DeleteUser(id string) error {
	if _, exists := s.users[id]; !exists {
		return fmt.Errorf("user not found: %s", id)
	}
	delete(s.users, id)
	return nil
}

// Logging Proxy
type LoggingUserService struct {
	service UserService
	logger  *log.Logger
}

func NewLoggingUserService(service UserService) *LoggingUserService {
	return &LoggingUserService{
		service: service,
		logger:  log.Default(),
	}
}

func (s *LoggingUserService) GetUser(id string) (*User, error) {
	start := time.Now()

	user, err := s.service.GetUser(id)

	if err != nil {
		s.logger.Printf("[ERROR] GetUser(%s) failed: %v (took %v)",
			id, err, time.Since(start))
	} else {
		s.logger.Printf("[INFO] GetUser(%s) success (took %v)",
			id, time.Since(start))
	}

	return user, err
}

func (s *LoggingUserService) CreateUser(name, email string) (*User, error) {
	start := time.Now()

	user, err := s.service.CreateUser(name, email)

	if err != nil {
		s.logger.Printf("[ERROR] CreateUser(%s, %s) failed: %v (took %v)",
			name, email, err, time.Since(start))
	} else {
		s.logger.Printf("[INFO] CreateUser(%s, %s) -> %s (took %v)",
			name, email, user.ID, time.Since(start))
	}

	return user, err
}

func (s *LoggingUserService) DeleteUser(id string) error {
	start := time.Now()

	err := s.service.DeleteUser(id)

	if err != nil {
		s.logger.Printf("[ERROR] DeleteUser(%s) failed: %v (took %v)",
			id, err, time.Since(start))
	} else {
		s.logger.Printf("[INFO] DeleteUser(%s) success (took %v)",
			id, time.Since(start))
	}

	return err
}

func main() {
	// Create real service
	realService := NewRealUserService()

	// Wrap with logging proxy
	service := NewLoggingUserService(realService)

	// Use service - all operations are logged
	user, _ := service.CreateUser("Alice", "alice@example.com")
	service.GetUser(user.ID)
	service.GetUser("nonexistent")
	service.DeleteUser(user.ID)
}
```

## Common Interview Questions

1. **Proxy vs Decorator?**
   - Proxy: Controls access to object
   - Decorator: Adds new functionality

2. **When is lazy loading beneficial?**
   - Heavy initialization cost
   - Object may not be used
   - Limited resources

3. **How to handle proxy chain?**
   - Each proxy delegates to next
   - Order matters (auth before logging)

## Best Practices

1. **Keep interface identical** - Proxy must match subject
2. **Single responsibility** - One purpose per proxy
3. **Consider thread safety** - Especially for caching
4. **Document proxy behavior** - Users should know what changes
5. **Allow direct access** - When proxy overhead isn't needed

## Related Patterns

- [Decorator](/topic/design-patterns/decorator) - Adds functionality
- [Adapter](/topic/design-patterns/adapter) - Changes interface
- [Facade](/topic/design-patterns/facade) - Simplifies interface
