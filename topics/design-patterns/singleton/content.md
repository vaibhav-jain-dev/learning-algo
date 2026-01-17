# Singleton Pattern

## Overview

The Singleton pattern ensures a class has only one instance and provides a global point of access to it. It's one of the most debated design patterns - powerful when used correctly, problematic when misused.

## Mental Model & Thinking Process

### When Your Brain Should Think "Singleton"

Ask yourself these questions:
1. **Is there truly only ONE of this thing in the entire system?** (e.g., one database connection pool, one configuration manager)
2. **Would multiple instances cause actual problems?** (e.g., conflicting configurations, resource exhaustion)
3. **Do I need global access from anywhere in the application?**
4. **Will creating multiple instances waste significant resources?**

### The Decision Tree

<div class="decision-tree" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d;">
<h4 style="color: #4ecdc4; margin-top: 0; text-align: center;">Should You Use Singleton?</h4>
<div style="display: flex; flex-direction: column; gap: 16px;">
<div style="background: #252540; padding: 16px; border-radius: 8px; border-left: 4px solid #569cd6;">
<strong style="color: #569cd6;">Question 1:</strong> <span style="color: #ddd;">Do you need exactly ONE instance?</span>
<div style="margin-top: 8px; padding-left: 20px;">
<span style="color: #ff6b6b;">NO →</span> <span style="color: #888;">Don't use Singleton. Consider regular classes or factory patterns.</span>
</div>
</div>
<div style="background: #252540; padding: 16px; border-radius: 8px; border-left: 4px solid #569cd6;">
<strong style="color: #569cd6;">Question 2:</strong> <span style="color: #ddd;">Is global access truly necessary?</span>
<div style="margin-top: 8px; padding-left: 20px;">
<span style="color: #ff6b6b;">NO →</span> <span style="color: #888;">Consider Dependency Injection instead. It's more testable.</span>
</div>
</div>
<div style="background: #252540; padding: 16px; border-radius: 8px; border-left: 4px solid #569cd6;">
<strong style="color: #569cd6;">Question 3:</strong> <span style="color: #ddd;">Is the object stateless or has simple state?</span>
<div style="margin-top: 8px; padding-left: 20px;">
<span style="color: #4ecdc4;">YES →</span> <span style="color: #4ecdc4; font-weight: bold;">Singleton might be appropriate</span><br>
<span style="color: #ffc107;">NO →</span> <span style="color: #ffc107;">Be VERY careful! Singleton with complex mutable state is a recipe for bugs.</span>
</div>
</div>
</div>
</div>

## Key Concepts

### When to Use

- **Database Connection Pools** - Managing limited database connections
- **Configuration Managers** - Application-wide settings
- **Logging Services** - Centralized logging infrastructure
- **Thread Pools** - Managing worker threads
- **Cache Managers** - Application-wide caching layer
- **Hardware Interface Access** - Printer spoolers, device drivers
- **Registry Objects** - Central lookup services

### When NOT to Use

- **When you're using it just for "convenience"** - This is a code smell
- **When the singleton holds mutable state that's modified from multiple places**
- **When it makes testing difficult** - Major red flag
- **When dependency injection would be cleaner**
- **For user-specific data** - Each user needs their own instance

### Structure

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d;">
<h4 style="color: #4ecdc4; margin-top: 0; text-align: center;">Singleton Class Structure</h4>
<div style="display: flex; justify-content: center; margin-bottom: 24px;">
<div style="background: #252540; border: 2px solid #569cd6; border-radius: 8px; width: 320px;">
<div style="background: #569cd6; color: white; padding: 8px 16px; font-weight: bold; text-align: center;">Singleton</div>
<div style="padding: 12px; border-bottom: 1px solid #30363d;">
<div style="color: #888; font-size: 12px; margin-bottom: 4px;">ATTRIBUTES</div>
<code style="color: #ce9178;">- instance: Singleton</code> <span style="color: #6a9955; font-size: 12px;">(private static)</span><br>
<code style="color: #ce9178;">- data: any</code> <span style="color: #6a9955; font-size: 12px;">(instance state)</span>
</div>
<div style="padding: 12px;">
<div style="color: #888; font-size: 12px; margin-bottom: 4px;">METHODS</div>
<code style="color: #dcdcaa;">- Singleton()</code> <span style="color: #6a9955; font-size: 12px;">(private constructor)</span><br>
<code style="color: #dcdcaa;">+ getInstance(): Singleton</code> <span style="color: #6a9955; font-size: 12px;">(static)</span><br>
<code style="color: #dcdcaa;">+ businessMethod()</code>
</div>
</div>
</div>
<h4 style="color: #4ecdc4; margin-top: 24px; text-align: center;">How It Works</h4>
<div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-top: 16px;">
<div style="text-align: center;">
<div style="background: #252540; padding: 12px 20px; border-radius: 8px; color: #ddd; margin-bottom: 8px;">Thread 1<br><code style="color: #569cd6;">getInstance()</code></div>
<div style="color: #569cd6; font-size: 24px;">↓</div>
</div>
<div style="text-align: center;">
<div style="background: #252540; padding: 12px 20px; border-radius: 8px; color: #ddd; margin-bottom: 8px;">Thread 2<br><code style="color: #569cd6;">getInstance()</code></div>
<div style="color: #569cd6; font-size: 24px;">↓</div>
</div>
<div style="text-align: center;">
<div style="background: #252540; padding: 12px 20px; border-radius: 8px; color: #ddd; margin-bottom: 8px;">Thread 3<br><code style="color: #569cd6;">getInstance()</code></div>
<div style="color: #569cd6; font-size: 24px;">↓</div>
</div>
</div>
<div style="display: flex; justify-content: center; margin-top: 16px;">
<div style="background: #4ecdc4; color: #1a1a2e; padding: 16px 32px; border-radius: 8px; text-align: center; font-weight: bold;">
Single Instance<br>
<span style="font-weight: normal; font-size: 14px;">All threads get the SAME object</span>
</div>
</div>
</div>

## Pros and Cons Analysis

### ✅ Pros

| Advantage | Explanation | Real-World Impact |
|-----------|-------------|-------------------|
| **Controlled Access** | Single point of access to shared resource | Prevents resource conflicts |
| **Reduced Memory Footprint** | Only one instance exists | Important for heavy objects |
| **Lazy Initialization** | Created only when first needed | Faster startup time |
| **Global Access Point** | Accessible from anywhere | Convenient for cross-cutting concerns |
| **State Consistency** | Single source of truth | No conflicting configurations |

### ❌ Cons

| Disadvantage | Explanation | Mitigation Strategy |
|--------------|-------------|---------------------|
| **Hidden Dependencies** | Code depends on global state | Use dependency injection where possible |
| **Testing Difficulty** | Hard to mock/stub for unit tests | Implement interface-based singleton |
| **Tight Coupling** | Classes depend on concrete singleton | Program to interfaces |
| **Thread Safety Overhead** | Synchronization required | Use language-specific optimizations |
| **Single Responsibility Violation** | Class manages its own lifecycle | Consider factory-based creation |
| **Difficult to Subclass** | Private constructor prevents extension | Provide protected constructor option |

### Trade-off Matrix

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #30363d; overflow-x: auto;">
<h4 style="color: #4ecdc4; margin-top: 0; text-align: center;">Trade-off Comparison</h4>
<table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
<thead>
<tr style="border-bottom: 2px solid #30363d;">
<th style="padding: 12px; text-align: left; color: #888;">Aspect</th>
<th style="padding: 12px; text-align: center; color: #569cd6;">Singleton</th>
<th style="padding: 12px; text-align: center; color: #4ecdc4;">Dependency Injection</th>
<th style="padding: 12px; text-align: center; color: #ff6b6b;">Global Variable</th>
</tr>
</thead>
<tbody style="color: #ddd;">
<tr style="border-bottom: 1px solid #30363d;">
<td style="padding: 12px;">Controlled Access</td>
<td style="padding: 12px; text-align: center; color: #ffc107;">★★★★★</td>
<td style="padding: 12px; text-align: center; color: #ffc107;">★★★★★</td>
<td style="padding: 12px; text-align: center; color: #888;">★☆☆☆☆</td>
</tr>
<tr style="border-bottom: 1px solid #30363d;">
<td style="padding: 12px;">Testability</td>
<td style="padding: 12px; text-align: center; color: #888;">★★☆☆☆</td>
<td style="padding: 12px; text-align: center; color: #ffc107;">★★★★★</td>
<td style="padding: 12px; text-align: center; color: #888;">★☆☆☆☆</td>
</tr>
<tr style="border-bottom: 1px solid #30363d;">
<td style="padding: 12px;">Flexibility</td>
<td style="padding: 12px; text-align: center; color: #888;">★★☆☆☆</td>
<td style="padding: 12px; text-align: center; color: #ffc107;">★★★★★</td>
<td style="padding: 12px; text-align: center; color: #888;">★☆☆☆☆</td>
</tr>
<tr style="border-bottom: 1px solid #30363d;">
<td style="padding: 12px;">Simplicity</td>
<td style="padding: 12px; text-align: center; color: #ffc107;">★★★★☆</td>
<td style="padding: 12px; text-align: center; color: #888;">★★☆☆☆</td>
<td style="padding: 12px; text-align: center; color: #ffc107;">★★★★★</td>
</tr>
<tr style="border-bottom: 1px solid #30363d;">
<td style="padding: 12px;">Memory Control</td>
<td style="padding: 12px; text-align: center; color: #ffc107;">★★★★★</td>
<td style="padding: 12px; text-align: center; color: #ffc107;">★★★★☆</td>
<td style="padding: 12px; text-align: center; color: #ffc107;">★★★★★</td>
</tr>
<tr>
<td style="padding: 12px;">Thread Safety</td>
<td style="padding: 12px; text-align: center; color: #ffc107;">★★★★☆</td>
<td style="padding: 12px; text-align: center; color: #ffc107;">★★★★★</td>
<td style="padding: 12px; text-align: center; color: #888;">★☆☆☆☆</td>
</tr>
</tbody>
</table>
<div style="background: #252540; padding: 16px; border-radius: 8px; margin-top: 16px;">
<strong style="color: #4ecdc4;">Recommendations:</strong>
<ul style="color: #ddd; margin: 8px 0 0 0; padding-left: 20px;">
<li>Prefer <strong>Dependency Injection</strong> for application code</li>
<li>Use <strong>Singleton</strong> for infrastructure (connection pools, config)</li>
<li>Avoid global variables</li>
</ul>
</div>
</div>

## Implementation

### Python - Thread-Safe Singleton with Double-Checked Locking

```python
import threading
from typing import Optional, Any, Dict

class Singleton:
    """
    Thread-safe Singleton implementation using double-checked locking.

    Why double-checked locking?
    - First check: Avoid lock acquisition overhead when instance exists
    - Second check: Ensure only one thread creates the instance

    Time Complexity: O(1) for getInstance after initialization
    Space Complexity: O(1) for the singleton mechanism itself
    """
    _instance: Optional['Singleton'] = None
    _lock: threading.Lock = threading.Lock()

    def __new__(cls) -> 'Singleton':
        # First check (without lock) - fast path
        if cls._instance is None:
            with cls._lock:
                # Second check (with lock) - thread safety
                # This prevents race condition where multiple threads
                # pass the first check simultaneously
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        # Prevent re-initialization on subsequent calls
        if self._initialized:
            return
        self._initialized = True
        self.data: Dict[str, Any] = {}

    def set(self, key: str, value: Any) -> None:
        self.data[key] = value

    def get(self, key: str) -> Any:
        return self.data.get(key)


# Usage demonstration
if __name__ == "__main__":
    s1 = Singleton()
    s2 = Singleton()

    # Verify same instance
    print(f"Same instance: {s1 is s2}")  # True

    # Demonstrate shared state
    s1.set("config", "production")
    print(f"s2 sees s1's data: {s2.get('config')}")  # "production"
```

### Python - Metaclass Singleton (Most Pythonic)

```python
import threading
from typing import Dict, Any

class SingletonMeta(type):
    """
    Metaclass-based Singleton - the most Pythonic approach.

    How it works:
    1. Metaclass controls class instantiation
    2. __call__ is invoked when you call ClassName()
    3. We intercept this to return existing instance

    Advantages:
    - Clean separation of singleton logic from business logic
    - Reusable across multiple classes
    - Transparent to class users
    """
    _instances: Dict[type, Any] = {}
    _lock: threading.Lock = threading.Lock()

    def __call__(cls, *args, **kwargs):
        # Check if instance already exists
        if cls not in cls._instances:
            with cls._lock:
                # Double-check after acquiring lock
                if cls not in cls._instances:
                    instance = super().__call__(*args, **kwargs)
                    cls._instances[cls] = instance
        return cls._instances[cls]


class Database(metaclass=SingletonMeta):
    """Example usage of metaclass singleton."""

    def __init__(self, connection_string: str = "default"):
        self.connection_string = connection_string
        self.connection = None
        self._query_count = 0

    def connect(self) -> str:
        if self.connection is None:
            self.connection = f"Connected to {self.connection_string}"
        return self.connection

    def query(self, sql: str) -> str:
        self._query_count += 1
        return f"Executed: {sql} (Query #{self._query_count})"


class Logger(metaclass=SingletonMeta):
    """Another class using the same metaclass."""

    def __init__(self):
        self.logs = []

    def log(self, message: str):
        self.logs.append(message)

    def get_logs(self):
        return self.logs.copy()


# Usage
db1 = Database("postgresql://localhost/mydb")
db2 = Database("mysql://localhost/otherdb")  # connection_string ignored!
print(db1 is db2)  # True
print(db1.connection_string)  # "postgresql://localhost/mydb"

logger1 = Logger()
logger2 = Logger()
logger1.log("Application started")
print(logger2.get_logs())  # ["Application started"]
```

### Python - Decorator Singleton (Most Flexible)

```python
import threading
from functools import wraps
from typing import TypeVar, Callable, Dict, Any

T = TypeVar('T')

def singleton(cls: T) -> Callable[..., T]:
    """
    Decorator-based Singleton pattern.

    Advantages:
    - Can be applied to any class with @singleton
    - Doesn't require class modification
    - Easy to remove/add singleton behavior

    Disadvantages:
    - Returns a function, not a class (breaks isinstance checks)
    - Can't access class attributes directly
    """
    instances: Dict[type, Any] = {}
    lock = threading.Lock()

    @wraps(cls)
    def get_instance(*args, **kwargs) -> T:
        if cls not in instances:
            with lock:
                if cls not in instances:
                    instances[cls] = cls(*args, **kwargs)
        return instances[cls]

    return get_instance


def singleton_with_reset(cls: T) -> T:
    """
    Singleton decorator that allows instance reset for testing.
    """
    instances: Dict[type, Any] = {}
    lock = threading.Lock()

    @wraps(cls)
    def get_instance(*args, **kwargs) -> T:
        if cls not in instances:
            with lock:
                if cls not in instances:
                    instances[cls] = cls(*args, **kwargs)
        return instances[cls]

    def reset():
        """Reset the singleton instance (useful for testing)."""
        with lock:
            if cls in instances:
                del instances[cls]

    get_instance.reset = reset
    return get_instance


@singleton
class CacheManager:
    """Example singleton cache manager."""

    def __init__(self, max_size: int = 1000):
        self.max_size = max_size
        self.cache: Dict[str, Any] = {}

    def get(self, key: str) -> Any:
        return self.cache.get(key)

    def set(self, key: str, value: Any) -> None:
        if len(self.cache) >= self.max_size:
            # Simple eviction: remove first item
            first_key = next(iter(self.cache))
            del self.cache[first_key]
        self.cache[key] = value


@singleton_with_reset
class TestableService:
    """Singleton that can be reset for testing."""

    def __init__(self):
        self.state = "initialized"


# Usage
cache1 = CacheManager(max_size=500)
cache2 = CacheManager(max_size=1000)  # max_size ignored!
print(cache1 is cache2)  # True
print(cache1.max_size)  # 500

# Testing example
service = TestableService()
service.state = "modified"
TestableService.reset()  # Reset for next test
new_service = TestableService()
print(new_service.state)  # "initialized"
```

### Go - Thread-Safe Singleton with sync.Once

```go
package main

import (
	"fmt"
	"sync"
)

// Singleton represents a singleton instance
// Why use sync.Once?
// - Guarantees exactly-once execution
// - Thread-safe without explicit locking
// - More efficient than mutex for initialization
type Singleton struct {
	data map[string]interface{}
	mu   sync.RWMutex // Protects data access, not initialization
}

var (
	instance *Singleton
	once     sync.Once
)

// GetInstance returns the singleton instance
// Time Complexity: O(1)
// Thread Safety: Guaranteed by sync.Once
func GetInstance() *Singleton {
	once.Do(func() {
		instance = &Singleton{
			data: make(map[string]interface{}),
		}
		fmt.Println("Singleton instance created")
	})
	return instance
}

// Set stores a value (thread-safe)
func (s *Singleton) Set(key string, value interface{}) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.data[key] = value
}

// Get retrieves a value (thread-safe)
func (s *Singleton) Get(key string) interface{} {
	s.mu.RLock()
	defer s.mu.RUnlock()
	return s.data[key]
}

func main() {
	// Demonstrate thread safety
	var wg sync.WaitGroup

	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			s := GetInstance() // All goroutines get same instance
			s.Set(fmt.Sprintf("key%d", id), id)
		}(i)
	}

	wg.Wait()

	s := GetInstance()
	fmt.Printf("Instance has %d entries\n", len(s.data))
}
```

### Go - Singleton with Lazy Initialization and Error Handling

```go
package main

import (
	"database/sql"
	"errors"
	"sync"
)

// DatabaseSingleton represents a singleton database connection
type DatabaseSingleton struct {
	db           *sql.DB
	queryCount   int
	mu           sync.Mutex
}

var (
	dbInstance *DatabaseSingleton
	dbOnce     sync.Once
	initError  error
)

// GetDatabase returns the singleton database instance
// Handles initialization errors gracefully
func GetDatabase(connectionString string) (*DatabaseSingleton, error) {
	dbOnce.Do(func() {
		db, err := sql.Open("postgres", connectionString)
		if err != nil {
			initError = fmt.Errorf("failed to open database: %w", err)
			return
		}

		// Verify connection
		if err := db.Ping(); err != nil {
			initError = fmt.Errorf("failed to ping database: %w", err)
			db.Close()
			return
		}

		dbInstance = &DatabaseSingleton{db: db}
	})

	if initError != nil {
		return nil, initError
	}
	return dbInstance, nil
}

// Query executes a query and tracks query count
func (d *DatabaseSingleton) Query(query string, args ...interface{}) (*sql.Rows, error) {
	d.mu.Lock()
	d.queryCount++
	d.mu.Unlock()

	return d.db.Query(query, args...)
}

// GetQueryCount returns total queries executed
func (d *DatabaseSingleton) GetQueryCount() int {
	d.mu.Lock()
	defer d.mu.Unlock()
	return d.queryCount
}

// Close closes the database connection
func (d *DatabaseSingleton) Close() error {
	if d.db != nil {
		return d.db.Close()
	}
	return nil
}
```

## Real-World Examples

### Configuration Manager with Environment Support

```python
import json
import os
from typing import Any, Dict, Optional
from pathlib import Path
import threading

class ConfigManager:
    """
    Production-ready configuration manager singleton.

    Features:
    - Environment-specific configurations
    - Nested key access (e.g., "database.host")
    - Environment variable overrides
    - Hot reloading support
    - Type-safe getters
    """
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._config: Dict[str, Any] = {}
                    cls._instance._loaded = False
                    cls._instance._env = os.getenv("APP_ENV", "development")
        return cls._instance

    def load(self, config_dir: str = "config") -> 'ConfigManager':
        """Load configuration files based on environment."""
        if self._loaded:
            return self

        config_path = Path(config_dir)

        # Load base config
        base_file = config_path / "base.json"
        if base_file.exists():
            with open(base_file) as f:
                self._config = json.load(f)

        # Load environment-specific config (overrides base)
        env_file = config_path / f"{self._env}.json"
        if env_file.exists():
            with open(env_file) as f:
                env_config = json.load(f)
                self._deep_merge(self._config, env_config)

        self._loaded = True
        return self

    def _deep_merge(self, base: dict, override: dict) -> None:
        """Recursively merge override into base."""
        for key, value in override.items():
            if key in base and isinstance(base[key], dict) and isinstance(value, dict):
                self._deep_merge(base[key], value)
            else:
                base[key] = value

    def get(self, key: str, default: Any = None) -> Any:
        """
        Get config value by dot-notation key.
        Environment variables override config values.

        Example: get("database.host") checks:
        1. DATABASE_HOST environment variable
        2. config["database"]["host"]
        3. Returns default if not found
        """
        # Check environment variable first
        env_key = key.upper().replace(".", "_")
        env_value = os.getenv(env_key)
        if env_value is not None:
            return env_value

        # Navigate nested dictionary
        keys = key.split('.')
        value = self._config

        for k in keys:
            if isinstance(value, dict):
                value = value.get(k)
            else:
                return default

        return value if value is not None else default

    def get_int(self, key: str, default: int = 0) -> int:
        """Get integer config value."""
        value = self.get(key, default)
        return int(value) if value is not None else default

    def get_bool(self, key: str, default: bool = False) -> bool:
        """Get boolean config value."""
        value = self.get(key, default)
        if isinstance(value, bool):
            return value
        if isinstance(value, str):
            return value.lower() in ('true', '1', 'yes', 'on')
        return bool(value)

    def get_list(self, key: str, default: list = None) -> list:
        """Get list config value."""
        value = self.get(key, default or [])
        if isinstance(value, str):
            return [x.strip() for x in value.split(',')]
        return value if isinstance(value, list) else default or []

    def reload(self) -> 'ConfigManager':
        """Force reload configuration (useful for hot reloading)."""
        self._loaded = False
        self._config = {}
        return self.load()


# Usage
config = ConfigManager().load()

database_host = config.get("database.host", "localhost")
database_port = config.get_int("database.port", 5432)
debug_mode = config.get_bool("app.debug", False)
allowed_origins = config.get_list("cors.allowed_origins", ["http://localhost"])
```

### Connection Pool Singleton

```go
package main

import (
	"context"
	"errors"
	"sync"
	"time"
)

// Connection represents a database connection
type Connection struct {
	ID        int
	CreatedAt time.Time
	InUse     bool
}

// ConnectionPool is a singleton connection pool
type ConnectionPool struct {
	connections chan *Connection
	maxSize     int
	minSize     int
	created     int
	mu          sync.Mutex

	// Metrics
	totalAcquired int
	totalReleased int
	waitTime      time.Duration
}

var (
	pool     *ConnectionPool
	poolOnce sync.Once
)

// PoolConfig holds configuration for the connection pool
type PoolConfig struct {
	MaxSize int
	MinSize int
}

// GetPool returns the singleton connection pool
func GetPool(config PoolConfig) *ConnectionPool {
	poolOnce.Do(func() {
		pool = &ConnectionPool{
			connections: make(chan *Connection, config.MaxSize),
			maxSize:     config.MaxSize,
			minSize:     config.MinSize,
		}

		// Pre-warm pool with minimum connections
		for i := 0; i < config.MinSize; i++ {
			pool.created++
			pool.connections <- &Connection{
				ID:        pool.created,
				CreatedAt: time.Now(),
			}
		}
	})
	return pool
}

// Acquire gets a connection from the pool
func (p *ConnectionPool) Acquire(ctx context.Context) (*Connection, error) {
	startTime := time.Now()

	select {
	case conn := <-p.connections:
		p.mu.Lock()
		conn.InUse = true
		p.totalAcquired++
		p.waitTime += time.Since(startTime)
		p.mu.Unlock()
		return conn, nil

	default:
		// No available connection, try to create new one
		p.mu.Lock()
		if p.created < p.maxSize {
			p.created++
			p.totalAcquired++
			conn := &Connection{
				ID:        p.created,
				CreatedAt: time.Now(),
				InUse:     true,
			}
			p.mu.Unlock()
			return conn, nil
		}
		p.mu.Unlock()

		// Pool exhausted, wait for available connection
		select {
		case conn := <-p.connections:
			p.mu.Lock()
			conn.InUse = true
			p.totalAcquired++
			p.waitTime += time.Since(startTime)
			p.mu.Unlock()
			return conn, nil
		case <-ctx.Done():
			return nil, errors.New("timeout waiting for connection")
		}
	}
}

// Release returns a connection to the pool
func (p *ConnectionPool) Release(conn *Connection) {
	p.mu.Lock()
	conn.InUse = false
	p.totalReleased++
	p.mu.Unlock()

	p.connections <- conn
}

// Stats returns pool statistics
func (p *ConnectionPool) Stats() map[string]interface{} {
	p.mu.Lock()
	defer p.mu.Unlock()

	return map[string]interface{}{
		"total_created":   p.created,
		"total_acquired":  p.totalAcquired,
		"total_released":  p.totalReleased,
		"available":       len(p.connections),
		"avg_wait_time":   p.waitTime / time.Duration(max(p.totalAcquired, 1)),
	}
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}
```

## Anti-Patterns and Pitfalls

### ❌ Common Mistakes

#### 1. Using Singleton for User-Specific Data

```python
# WRONG: Each user needs their own session
class UserSession:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def set_user(self, user_id):
        self.user_id = user_id  # Overwritten by next user!

# CORRECT: Use dependency injection or session management
class UserSession:
    def __init__(self, user_id):
        self.user_id = user_id

# In request handler:
session = UserSession(request.user_id)
```

#### 2. Singleton with Mutable State Modified from Multiple Places

```python
# PROBLEMATIC: State modified from anywhere
class AppState:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.data = {}
        return cls._instance

# Different parts of app modifying state - race conditions!
AppState().data["key1"] = "value1"  # Module A
AppState().data["key1"] = "value2"  # Module B (overwrites!)

# BETTER: Use proper state management with controlled mutations
class AppState:
    _instance = None
    _lock = threading.Lock()

    def update(self, key, value, expected_value=None):
        """Atomic update with optional optimistic locking."""
        with self._lock:
            if expected_value is not None:
                if self.data.get(key) != expected_value:
                    raise ConcurrentModificationError()
            self.data[key] = value
```

#### 3. Not Making Singleton Thread-Safe

```python
# WRONG: Race condition in creation
class UnsafeSingleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:  # Thread A checks
            # Thread B also checks (instance still None)
            cls._instance = super().__new__(cls)  # Both create!
        return cls._instance

# CORRECT: Always use locking for thread safety
class SafeSingleton:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
        return cls._instance
```

### ✅ Better Alternative: Dependency Injection

```python
from abc import ABC, abstractmethod
from typing import Protocol

# Define interface
class DatabaseInterface(Protocol):
    def query(self, sql: str) -> list: ...
    def execute(self, sql: str) -> None: ...

# Concrete implementation
class PostgresDatabase:
    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        self._connection = None

    def query(self, sql: str) -> list:
        return []  # Implementation

    def execute(self, sql: str) -> None:
        pass  # Implementation

# Mock for testing
class MockDatabase:
    def __init__(self):
        self.queries = []

    def query(self, sql: str) -> list:
        self.queries.append(sql)
        return [{"mock": "data"}]

    def execute(self, sql: str) -> None:
        self.queries.append(sql)

# Service depends on interface, not concrete singleton
class UserService:
    def __init__(self, db: DatabaseInterface):
        self.db = db  # Injected dependency

    def get_user(self, user_id: int):
        return self.db.query(f"SELECT * FROM users WHERE id = {user_id}")

# Production setup
db = PostgresDatabase("postgresql://localhost/mydb")
user_service = UserService(db)

# Test setup
mock_db = MockDatabase()
test_service = UserService(mock_db)  # Easy to test!
```

## Frequently Asked Questions (FAQ)

### Q1: How do you make Singleton thread-safe?

**Answer:** There are several approaches depending on the language:

**Python:**
- **Double-checked locking:** Check instance twice, lock only when needed
- **Metaclass:** Use `__call__` in metaclass to control instantiation
- **Module-level instance:** Python modules are singletons by default

**Go:**
- **sync.Once:** Guarantees exactly-once execution, most idiomatic
- **init() function:** Package-level initialization, runs once at import

**Java:**
- **Enum singleton:** JVM guarantees single instance
- **Static inner class:** Lazy initialization with thread safety

**Key insight:** The double-checked locking pattern avoids synchronization overhead after initialization while ensuring thread safety during creation.

---

### Q2: Why is Singleton considered an anti-pattern by some developers?

**Answer:** Singleton has legitimate criticisms:

1. **Global State:** Introduces hidden dependencies that make code harder to reason about
2. **Testing Difficulty:** Hard to mock/stub without special frameworks
3. **Violates SRP:** Class manages its own lifecycle AND business logic
4. **Tight Coupling:** Dependent classes are coupled to concrete implementation
5. **Hidden Dependencies:** Dependencies aren't explicit in method signatures
6. **Parallel Testing Issues:** Tests can interfere with each other through shared state

**However, Singleton is appropriate when:**
- There truly should be only one instance (hardware access, connection pools)
- The singleton is stateless or has simple, read-only state
- You're wrapping an external resource that's inherently single-instance

---

### Q3: When is Singleton appropriate vs. Dependency Injection?

**Answer:**

**Use Singleton when:**
- Resource is truly system-wide (one printer spooler, one logger)
- Object is expensive to create and rarely changes
- You're building infrastructure/framework code
- State is simple or read-only after initialization

**Use Dependency Injection when:**
- You want testable code
- Multiple implementations might be needed
- Object state is complex or request-specific
- You're building application code

**Best Practice:** Combine both! Use singleton for instance management, but inject it:

```python
# Singleton instance
config = ConfigManager()

# Inject into services
class OrderService:
    def __init__(self, config: ConfigManager):
        self.config = config
```

---

### Q4: How do you test code that uses Singletons?

**Answer:** Several strategies:

1. **Interface-based Singleton:**
```python
class LoggerInterface(Protocol):
    def log(self, message: str) -> None: ...

class Logger(metaclass=SingletonMeta):
    def log(self, message: str) -> None:
        print(message)

class MockLogger:
    def __init__(self):
        self.messages = []

    def log(self, message: str) -> None:
        self.messages.append(message)

# Production
service = MyService(Logger())

# Test
service = MyService(MockLogger())
```

2. **Reset Method (for tests only):**
```python
@singleton_with_reset
class Database:
    pass

# In test teardown
Database.reset()
```

3. **Dependency Injection Override:**
```python
# Use DI container that can override singletons in test mode
container.register(Logger, MockLogger, scope="test")
```

---

### Q5: How do you handle Singleton in distributed systems?

**Answer:** In distributed systems, "singleton" becomes more complex:

1. **Process-Level Singleton:** Each process has its own singleton - OK for caches, connection pools

2. **Cluster-Level Singleton:** Requires coordination:
   - **Leader Election:** Use Zookeeper, etcd, or Consul
   - **Distributed Lock:** Ensure only one instance runs a task
   - **Shared State:** Use Redis or database for state that must be global

```python
# Process-local singleton for caching
class LocalCache:
    _instance = None
    # ... singleton implementation

# Cluster-wide coordination using Redis
class DistributedLock:
    def __init__(self, redis_client, lock_name):
        self.redis = redis_client
        self.lock_name = lock_name

    def acquire(self, timeout=10):
        return self.redis.set(
            self.lock_name,
            "1",
            nx=True,  # Only set if not exists
            ex=timeout
        )

    def release(self):
        self.redis.delete(self.lock_name)
```

---

### Q6: What's the difference between Singleton and static class?

**Answer:**

| Aspect | Singleton | Static Class |
|--------|-----------|--------------|
| Instantiation | Single instance exists | No instantiation |
| State | Can have instance state | Only static state |
| Inheritance | Can implement interfaces | Cannot implement interfaces |
| Polymorphism | Supports polymorphism | No polymorphism |
| Lazy Init | Easy to implement | Harder to implement |
| Testing | Can be mocked (with effort) | Very hard to mock |
| Memory | Instance can be garbage collected | Always in memory |

**When to use Static Class:**
- Pure utility functions with no state (Math.sqrt, StringUtils)
- Extension methods
- Constants containers

**When to use Singleton:**
- When you need state
- When you need interface implementation
- When you need lazy initialization
- When you might need to replace implementation

## Common Interview Questions

### Basic Level

1. **What is the Singleton pattern and when would you use it?**
2. **How do you make Singleton thread-safe?**
3. **What are the drawbacks of using Singleton?**

### Intermediate Level

4. **Explain double-checked locking and why it's needed.**
5. **How does sync.Once work in Go?**
6. **Compare Singleton implementation approaches in Python.**
7. **How would you test code that uses Singletons?**

### Advanced Level

8. **How would you implement Singleton in a distributed system?**
9. **Explain the Bill Pugh Singleton implementation (Java).**
10. **When would you choose Singleton over Dependency Injection?**
11. **How do you handle Singleton with inheritance?**
12. **What are the memory implications of Singleton?**

### Interview Tips

1. **Don't just recite the pattern** - Explain when NOT to use it
2. **Show awareness of trade-offs** - Testing difficulty, global state
3. **Know multiple implementations** - Thread-safe, lazy, eager
4. **Mention alternatives** - Dependency injection, factory
5. **Real-world examples** - Configuration, logging, connection pools

## Best Practices

### Do's ✅

1. **Use for truly single resources** - Connection pools, hardware access
2. **Implement thread safety** - Always assume multi-threaded access
3. **Consider lazy initialization** - Don't create until needed
4. **Make it testable** - Provide interface or reset capability
5. **Document singleton nature** - Make it clear in class name/docs
6. **Keep state minimal** - Less state = fewer problems
7. **Use language idioms** - sync.Once in Go, metaclass in Python

### Don'ts ❌

1. **Don't use for convenience** - "I need it everywhere" isn't justification
2. **Don't store user-specific data** - Each user needs their own instance
3. **Don't create singletons for mutable shared state** - Use proper synchronization
4. **Don't subclass singletons** - Usually causes confusion
5. **Don't use in libraries** - Let consumers decide lifecycle
6. **Don't ignore initialization errors** - Handle gracefully

## Related Patterns

- [Factory Method](/topic/design-patterns/factory-method) - Can return singleton instances
- [Abstract Factory](/topic/design-patterns/abstract-factory) - Often implemented as singleton
- [Builder](/topic/design-patterns/builder) - Can build singleton instances
- [Prototype](/topic/design-patterns/prototype) - Opposite approach (cloning)
- [Dependency Injection](/topic/design-patterns/dependency-injection) - Alternative approach for managing instances
- [Service Locator](/topic/design-patterns/service-locator) - Registry of singletons

## Further Reading

- "Design Patterns: Elements of Reusable Object-Oriented Software" - Gang of Four
- "Effective Java" by Joshua Bloch - Item 3: Enforce singleton with private constructor
- "Head First Design Patterns" - Chapter on Singleton
- Martin Fowler's article on "Inversion of Control" - Understanding DI alternative
