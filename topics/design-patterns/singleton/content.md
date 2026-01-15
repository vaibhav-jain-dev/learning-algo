# Singleton Pattern

## Overview

The Singleton pattern ensures a class has only one instance and provides a global point of access to it. It's useful when exactly one object is needed to coordinate actions across the system.

## Key Concepts

### When to Use

- Database connections
- Configuration managers
- Logging services
- Thread pools
- Cache managers

### Structure

```
┌─────────────────────────────┐
│         Singleton           │
├─────────────────────────────┤
│ - instance: Singleton       │
├─────────────────────────────┤
│ - Singleton()               │
│ + getInstance(): Singleton  │
│ + operation()               │
└─────────────────────────────┘
```

## Implementation

### Python - Thread-Safe Singleton

```python
import threading
from typing import Optional

class Singleton:
    _instance: Optional['Singleton'] = None
    _lock: threading.Lock = threading.Lock()

    def __new__(cls) -> 'Singleton':
        if cls._instance is None:
            with cls._lock:
                # Double-checked locking
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self._initialized = True
        # Initialize instance attributes
        self.data = {}

    def set(self, key: str, value: any):
        self.data[key] = value

    def get(self, key: str) -> any:
        return self.data.get(key)


# Usage
s1 = Singleton()
s2 = Singleton()
print(s1 is s2)  # True

s1.set("config", "value")
print(s2.get("config"))  # "value"
```

### Python - Metaclass Singleton

```python
class SingletonMeta(type):
    _instances = {}
    _lock = threading.Lock()

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            with cls._lock:
                if cls not in cls._instances:
                    instance = super().__call__(*args, **kwargs)
                    cls._instances[cls] = instance
        return cls._instances[cls]


class Database(metaclass=SingletonMeta):
    def __init__(self):
        self.connection = None

    def connect(self, url: str):
        if self.connection is None:
            self.connection = f"Connected to {url}"
        return self.connection


# Usage
db1 = Database()
db2 = Database()
print(db1 is db2)  # True
```

### Python - Decorator Singleton

```python
def singleton(cls):
    instances = {}
    lock = threading.Lock()

    def get_instance(*args, **kwargs):
        if cls not in instances:
            with lock:
                if cls not in instances:
                    instances[cls] = cls(*args, **kwargs)
        return instances[cls]

    return get_instance


@singleton
class Logger:
    def __init__(self):
        self.logs = []

    def log(self, message: str):
        self.logs.append(message)

    def get_logs(self):
        return self.logs


# Usage
logger1 = Logger()
logger2 = Logger()
logger1.log("Hello")
print(logger2.get_logs())  # ["Hello"]
```

### Go - Thread-Safe Singleton

```go
package main

import (
	"sync"
)

type Singleton struct {
	data map[string]interface{}
}

var (
	instance *Singleton
	once     sync.Once
)

func GetInstance() *Singleton {
	once.Do(func() {
		instance = &Singleton{
			data: make(map[string]interface{}),
		}
	})
	return instance
}

func (s *Singleton) Set(key string, value interface{}) {
	s.data[key] = value
}

func (s *Singleton) Get(key string) interface{} {
	return s.data[key]
}

func main() {
	s1 := GetInstance()
	s2 := GetInstance()

	println(s1 == s2) // true

	s1.Set("config", "value")
	println(s2.Get("config").(string)) // "value"
}
```

### Go - Singleton with Lazy Initialization

```go
package main

import (
	"database/sql"
	"sync"
)

type Database struct {
	db *sql.DB
}

var (
	dbInstance *Database
	dbOnce     sync.Once
	initError  error
)

func GetDatabase() (*Database, error) {
	dbOnce.Do(func() {
		db, err := sql.Open("postgres", "connection-string")
		if err != nil {
			initError = err
			return
		}
		dbInstance = &Database{db: db}
	})

	if initError != nil {
		return nil, initError
	}
	return dbInstance, nil
}

func (d *Database) Query(query string) (*sql.Rows, error) {
	return d.db.Query(query)
}

func (d *Database) Close() error {
	return d.db.Close()
}
```

## Real-World Examples

### Configuration Manager

```python
import json
import os
from typing import Any, Dict

class ConfigManager:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._config = {}
                    cls._instance._loaded = False
        return cls._instance

    def load(self, path: str):
        if not self._loaded:
            with open(path) as f:
                self._config = json.load(f)
            self._loaded = True

    def get(self, key: str, default: Any = None) -> Any:
        keys = key.split('.')
        value = self._config

        for k in keys:
            if isinstance(value, dict):
                value = value.get(k)
            else:
                return default

        return value if value is not None else default


# Usage
config = ConfigManager()
config.load("config.json")

db_host = config.get("database.host", "localhost")
```

### Connection Pool

```go
package main

import (
	"sync"
)

type Connection struct {
	id int
}

type ConnectionPool struct {
	connections chan *Connection
	maxSize     int
	mu          sync.Mutex
	created     int
}

var (
	pool     *ConnectionPool
	poolOnce sync.Once
)

func GetPool(maxSize int) *ConnectionPool {
	poolOnce.Do(func() {
		pool = &ConnectionPool{
			connections: make(chan *Connection, maxSize),
			maxSize:     maxSize,
		}
	})
	return pool
}

func (p *ConnectionPool) Acquire() *Connection {
	select {
	case conn := <-p.connections:
		return conn
	default:
		p.mu.Lock()
		defer p.mu.Unlock()

		if p.created < p.maxSize {
			p.created++
			return &Connection{id: p.created}
		}

		// Wait for available connection
		return <-p.connections
	}
}

func (p *ConnectionPool) Release(conn *Connection) {
	p.connections <- conn
}

func main() {
	pool := GetPool(5)

	conn := pool.Acquire()
	println("Got connection:", conn.id)
	pool.Release(conn)
}
```

## Anti-Patterns and Pitfalls

### Problems with Singleton

1. **Global State**: Hidden dependencies
2. **Testing Difficulty**: Hard to mock
3. **Tight Coupling**: Classes depend on concrete singleton
4. **Thread Safety**: Must handle concurrent access

### Better Alternative: Dependency Injection

```python
# Instead of Singleton
class UserService:
    def __init__(self):
        self.db = Database()  # Hard-coded dependency

# Use Dependency Injection
class UserService:
    def __init__(self, db: Database):
        self.db = db  # Injected dependency

# In composition root
db = Database()
user_service = UserService(db)
```

## Common Interview Questions

1. **How do you make Singleton thread-safe?**
   - Double-checked locking
   - sync.Once in Go
   - Metaclass in Python

2. **Why is Singleton considered an anti-pattern?**
   - Global state
   - Testing difficulties
   - Violates Single Responsibility

3. **When is Singleton appropriate?**
   - Logging
   - Configuration
   - Connection pools
   - Hardware access

## Best Practices

1. **Consider alternatives** - Dependency injection often better
2. **Lazy initialization** - Don't create until needed
3. **Thread safety** - Always handle concurrent access
4. **Make it testable** - Allow injection for testing
5. **Document usage** - Make singleton nature clear

## Related Patterns

- [Factory Method](/topic/design-patterns/factory-method) - Can return singleton
- [Abstract Factory](/topic/design-patterns/abstract-factory) - Often implemented as singleton
- [Dependency Injection](/topic/design-patterns/dependency-injection) - Alternative approach
