# Singleton Pattern

## Overview

The Singleton pattern ensures a class has only one instance and provides a global point of access to it. It solves the problem of **coordinating access to shared resources** that should exist exactly once in a system - like a database connection pool, configuration manager, or logging service.

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
<div style="background: #3b82f6; color: white; padding: 8px 16px; border-radius: 6px; font-weight: 600;">Pattern Type</div>
<span style="color: #334155;">Creational</span>
</div>
<div style="display: flex; align-items: center; gap: 12px;">
<div style="background: #10b981; color: white; padding: 8px 16px; border-radius: 6px; font-weight: 600;">Complexity</div>
<span style="color: #334155;">Low (but tricky to get right)</span>
</div>
</div>

---

## Why This Matters

Singleton is everywhere in production systems. Understanding it helps you work with major frameworks and make better architectural decisions.

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; margin-top: 0;">Real-World Framework Usage</h4>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
<div style="font-weight: 600; color: #166534; margin-bottom: 8px;">Spring Framework</div>
<div style="color: #334155; font-size: 14px;">Spring beans are singletons by default. The ApplicationContext itself is a singleton that manages all bean instances.</div>
<code style="background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #475569;">@Scope("singleton")</code>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
<div style="font-weight: 600; color: #1d4ed8; margin-bottom: 8px;">Django</div>
<div style="color: #334155; font-size: 14px;">Django's settings module is a singleton. Database connections are pooled using singleton connection managers.</div>
<code style="background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #475569;">django.conf.settings</code>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
<div style="font-weight: 600; color: #6d28d9; margin-bottom: 8px;">React</div>
<div style="color: #334155; font-size: 14px;">Redux store is a singleton. React's reconciler maintains a single instance of the virtual DOM tree.</div>
<code style="background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #475569;">createStore()</code>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b;">
<div style="font-weight: 600; color: #b45309; margin-bottom: 8px;">Node.js</div>
<div style="color: #334155; font-size: 14px;">Module caching makes every required module effectively a singleton. Database clients like Mongoose use this pattern.</div>
<code style="background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #475569;">require.cache</code>
</div>

</div>
</div>

---

## The Analogy

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
<div style="font-size: 48px; text-align: center; margin-bottom: 16px;">&#127970;</div>
<h4 style="color: #1e293b; margin-top: 0; text-align: center;">The Government Office</h4>
<p style="color: #475569; line-height: 1.7;">
Think of a country's tax office. There can only be ONE official tax authority - having multiple would cause chaos with conflicting rules and records. Everyone (citizens, businesses) must interact with the SAME office to file taxes, get refunds, or resolve disputes.
</p>
<div style="background: white; padding: 16px; border-radius: 8px; margin-top: 16px;">
<table style="width: 100%; border-collapse: collapse;">
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 8px; color: #64748b; font-weight: 500;">Tax Office</td>
<td style="padding: 8px; color: #1e293b;">= Singleton Instance</td>
</tr>
<tr style="border-bottom: 1px solid #e2e8f0;">
<td style="padding: 8px; color: #64748b; font-weight: 500;">Citizens accessing it</td>
<td style="padding: 8px; color: #1e293b;">= Multiple clients</td>
</tr>
<tr>
<td style="padding: 8px; color: #64748b; font-weight: 500;">Tax records</td>
<td style="padding: 8px; color: #1e293b;">= Shared state</td>
</tr>
</table>
</div>
</div>

---

## How It Works

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
<h4 style="color: #1e293b; margin-top: 0; text-align: center;">Singleton Class Structure</h4>

<div style="display: flex; justify-content: center; margin: 24px 0;">
<div style="background: white; border: 2px solid #3b82f6; border-radius: 8px; width: 300px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
<div style="background: #3b82f6; color: white; padding: 12px 16px; font-weight: 600; text-align: center;">Singleton</div>
<div style="padding: 16px; border-bottom: 1px solid #e2e8f0;">
<div style="color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 8px;">Private Members</div>
<code style="color: #dc2626; display: block; margin-bottom: 4px;">- instance: Singleton</code>
<code style="color: #dc2626; display: block;">- Singleton() // private constructor</code>
</div>
<div style="padding: 16px;">
<div style="color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 8px;">Public Members</div>
<code style="color: #059669; display: block; margin-bottom: 4px;">+ getInstance(): Singleton</code>
<code style="color: #059669; display: block;">+ businessMethod()</code>
</div>
</div>
</div>

<h4 style="color: #1e293b; text-align: center; margin-top: 32px;">Request Flow</h4>

<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 24px; margin-top: 20px;">
<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="background: white; border: 1px solid #e2e8f0; padding: 12px 20px; border-radius: 8px; color: #334155;">Client A</div>
<div style="color: #3b82f6; font-size: 20px;">&#8595;</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="background: white; border: 1px solid #e2e8f0; padding: 12px 20px; border-radius: 8px; color: #334155;">Client B</div>
<div style="color: #3b82f6; font-size: 20px;">&#8595;</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="background: white; border: 1px solid #e2e8f0; padding: 12px 20px; border-radius: 8px; color: #334155;">Client C</div>
<div style="color: #3b82f6; font-size: 20px;">&#8595;</div>
</div>
</div>

<div style="display: flex; justify-content: center; margin-top: 16px;">
<div style="background: #dbeafe; border: 2px solid #3b82f6; padding: 16px 40px; border-radius: 8px; text-align: center;">
<div style="font-weight: 600; color: #1e40af;">getInstance()</div>
</div>
</div>

<div style="display: flex; justify-content: center; margin-top: 16px;">
<div style="color: #3b82f6; font-size: 20px;">&#8595;</div>
</div>

<div style="display: flex; justify-content: center; margin-top: 8px;">
<div style="background: #22c55e; color: white; padding: 16px 32px; border-radius: 8px; text-align: center;">
<div style="font-weight: 600;">Single Instance</div>
<div style="font-size: 13px; opacity: 0.9;">All clients get the SAME object</div>
</div>
</div>
</div>

---

## When to Use / When NOT to Use

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 20px 0;">

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; border: 1px solid #bbf7d0;">
<h4 style="color: #166534; margin-top: 0;">When to Use</h4>
<ul style="color: #334155; padding-left: 20px; margin: 0; line-height: 1.8;">
<li><strong>Database Connection Pools</strong> - Managing limited connections</li>
<li><strong>Configuration Managers</strong> - App-wide settings</li>
<li><strong>Logging Services</strong> - Centralized logging</li>
<li><strong>Thread Pools</strong> - Worker thread management</li>
<li><strong>Cache Managers</strong> - Application-wide cache</li>
<li><strong>Hardware Access</strong> - Printer spoolers, device drivers</li>
</ul>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; border: 1px solid #fecaca;">
<h4 style="color: #dc2626; margin-top: 0;">When NOT to Use</h4>
<ul style="color: #334155; padding-left: 20px; margin: 0; line-height: 1.8;">
<li><strong>For "convenience"</strong> - This is a code smell</li>
<li><strong>Mutable state</strong> - Modified from multiple places</li>
<li><strong>Testing difficulty</strong> - Major red flag</li>
<li><strong>DI would be cleaner</strong> - Consider alternatives</li>
<li><strong>User-specific data</strong> - Each user needs own instance</li>
</ul>
</div>

</div>

---

## Real-Life Example

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">

<div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #22c55e;">
<h4 style="color: #166534; margin-top: 0;">Twitter's Snowflake ID Generator</h4>
<p style="color: #334155; font-size: 14px; line-height: 1.6;">
Twitter created Snowflake to generate unique IDs across distributed systems. Each data center has a <strong>single ID generator instance</strong> that produces 64-bit IDs with embedded timestamps. This ensures uniqueness without database coordination.
</p>
<div style="background: white; padding: 12px; border-radius: 6px; margin-top: 12px;">
<div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Result</div>
<div style="color: #166534; font-weight: 500;">10K+ IDs per second per machine</div>
</div>
</div>

<div style="background: #fef2f2; padding: 20px; border-radius: 8px; border-left: 4px solid #ef4444;">
<h4 style="color: #dc2626; margin-top: 0;">The Global Config Anti-Pattern</h4>
<p style="color: #334155; font-size: 14px; line-height: 1.6;">
A startup stored user session data in a singleton "GlobalState" class. During load testing, race conditions caused users to see each other's data. The singleton was being modified from 50+ places across the codebase.
</p>
<div style="background: white; padding: 12px; border-radius: 6px; margin-top: 12px;">
<div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Lesson</div>
<div style="color: #dc2626; font-weight: 500;">User data should NEVER be in a singleton</div>
</div>
</div>

</div>
</div>

---

## Interview Questions

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">

<div style="margin-bottom: 20px;">
<div style="background: #dbeafe; padding: 4px 12px; border-radius: 4px; display: inline-block; font-size: 12px; color: #1e40af; font-weight: 500; margin-bottom: 8px;">BASIC</div>
<h4 style="color: #1e293b; margin: 0 0 8px 0;">Q: What is the Singleton pattern and when would you use it?</h4>
<p style="color: #475569; margin: 0; font-size: 14px;">
<strong>Answer:</strong> Singleton ensures only one instance exists and provides global access. Use it for shared resources like connection pools, config managers, and logging - NOT for convenience or user-specific data.
</p>
</div>

<div style="margin-bottom: 20px;">
<div style="background: #fef3c7; padding: 4px 12px; border-radius: 4px; display: inline-block; font-size: 12px; color: #92400e; font-weight: 500; margin-bottom: 8px;">INTERMEDIATE</div>
<h4 style="color: #1e293b; margin: 0 0 8px 0;">Q: How do you make Singleton thread-safe?</h4>
<p style="color: #475569; margin: 0; font-size: 14px;">
<strong>Answer:</strong> Use double-checked locking (check, lock, check again), language constructs like Go's sync.Once, or metaclass in Python. The key is preventing race conditions during first initialization.
</p>
</div>

<div style="margin-bottom: 20px;">
<div style="background: #fee2e2; padding: 4px 12px; border-radius: 4px; display: inline-block; font-size: 12px; color: #991b1b; font-weight: 500; margin-bottom: 8px;">ADVANCED</div>
<h4 style="color: #1e293b; margin: 0 0 8px 0;">Q: Why is Singleton considered an anti-pattern by some? How do you mitigate?</h4>
<p style="color: #475569; margin: 0; font-size: 14px;">
<strong>Answer:</strong> It creates hidden dependencies, makes testing hard, and violates SRP. Mitigate by: using DI to inject the singleton, programming to interfaces, providing reset methods for testing, and keeping state minimal/read-only.
</p>
</div>

<div>
<div style="background: #fae8ff; padding: 4px 12px; border-radius: 4px; display: inline-block; font-size: 12px; color: #86198f; font-weight: 500; margin-bottom: 8px;">SYSTEM DESIGN</div>
<h4 style="color: #1e293b; margin: 0 0 8px 0;">Q: How do you handle Singleton in distributed systems?</h4>
<p style="color: #475569; margin: 0; font-size: 14px;">
<strong>Answer:</strong> Process-level singletons work for caches and pools. For cluster-wide singletons, use leader election (Zookeeper/etcd), distributed locks (Redis), or shared state in a database. The "singleton" becomes a logical concept coordinated across nodes.
</p>
</div>

</div>

---

## Code Examples

### Python - Thread-Safe Singleton with Double-Checked Locking

```python
import threading
from typing import Optional, Any, Dict


class Singleton:
    """
    Thread-safe Singleton using double-checked locking.

    Why double-checked locking?
    - First check: Avoid lock overhead when instance exists
    - Second check: Prevent race condition during creation
    """
    _instance: Optional['Singleton'] = None
    _lock: threading.Lock = threading.Lock()

    def __new__(cls) -> 'Singleton':
        # First check (without lock) - fast path
        if cls._instance is None:
            with cls._lock:
                # Second check (with lock) - thread safety
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self._initialized = True
        self.data: Dict[str, Any] = {}

    def set(self, key: str, value: Any) -> None:
        self.data[key] = value

    def get(self, key: str) -> Any:
        return self.data.get(key)


# Usage
s1 = Singleton()
s2 = Singleton()
print(f"Same instance: {s1 is s2}")  # True

s1.set("config", "production")
print(f"s2 sees s1's data: {s2.get('config')}")  # "production"
```

### Python - Metaclass Singleton (Most Pythonic)

```python
import threading
from typing import Dict, Any


class SingletonMeta(type):
    """
    Metaclass-based Singleton - cleanest Python approach.
    Separates singleton logic from business logic.
    """
    _instances: Dict[type, Any] = {}
    _lock: threading.Lock = threading.Lock()

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            with cls._lock:
                if cls not in cls._instances:
                    instance = super().__call__(*args, **kwargs)
                    cls._instances[cls] = instance
        return cls._instances[cls]


class ConfigManager(metaclass=SingletonMeta):
    """Example: Application configuration singleton."""

    def __init__(self):
        self._config: Dict[str, Any] = {}
        self._loaded = False

    def load(self, config_path: str) -> 'ConfigManager':
        if not self._loaded:
            # Load config from file
            self._config = {"env": "production", "debug": False}
            self._loaded = True
        return self

    def get(self, key: str, default: Any = None) -> Any:
        return self._config.get(key, default)


# Usage
config1 = ConfigManager().load("config.json")
config2 = ConfigManager()  # Same instance, already loaded

print(config1 is config2)  # True
print(config2.get("env"))  # "production"
```

### Go - Thread-Safe Singleton with sync.Once

```go
package main

import (
    "fmt"
    "sync"
)

// Singleton using sync.Once - idiomatic Go approach
// sync.Once guarantees exactly-once execution, thread-safe
type ConfigManager struct {
    data map[string]interface{}
    mu   sync.RWMutex
}

var (
    instance *ConfigManager
    once     sync.Once
)

// GetInstance returns the singleton instance
func GetInstance() *ConfigManager {
    once.Do(func() {
        instance = &ConfigManager{
            data: make(map[string]interface{}),
        }
        fmt.Println("ConfigManager instance created")
    })
    return instance
}

// Set stores a value (thread-safe)
func (c *ConfigManager) Set(key string, value interface{}) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.data[key] = value
}

// Get retrieves a value (thread-safe)
func (c *ConfigManager) Get(key string) interface{} {
    c.mu.RLock()
    defer c.mu.RUnlock()
    return c.data[key]
}

func main() {
    // Multiple goroutines accessing singleton
    var wg sync.WaitGroup

    for i := 0; i < 5; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            config := GetInstance()  // All get same instance
            config.Set(fmt.Sprintf("worker_%d", id), "active")
        }(i)
    }

    wg.Wait()

    config := GetInstance()
    fmt.Printf("Total keys: %d\n", len(config.data))
}
```

### Go - Database Connection Pool Singleton

```go
package main

import (
    "context"
    "database/sql"
    "sync"
    "time"
)

type DBPool struct {
    db          *sql.DB
    maxConns    int
    queryCount  int64
    mu          sync.Mutex
}

var (
    dbPool  *DBPool
    dbOnce  sync.Once
    initErr error
)

type DBConfig struct {
    ConnectionString string
    MaxConnections   int
    MaxIdleTime      time.Duration
}

// GetDBPool returns singleton database pool
func GetDBPool(config DBConfig) (*DBPool, error) {
    dbOnce.Do(func() {
        db, err := sql.Open("postgres", config.ConnectionString)
        if err != nil {
            initErr = err
            return
        }

        db.SetMaxOpenConns(config.MaxConnections)
        db.SetConnMaxIdleTime(config.MaxIdleTime)

        // Verify connection
        ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
        defer cancel()

        if err := db.PingContext(ctx); err != nil {
            initErr = err
            db.Close()
            return
        }

        dbPool = &DBPool{
            db:       db,
            maxConns: config.MaxConnections,
        }
    })

    return dbPool, initErr
}

func (p *DBPool) Query(ctx context.Context, query string) (*sql.Rows, error) {
    p.mu.Lock()
    p.queryCount++
    p.mu.Unlock()

    return p.db.QueryContext(ctx, query)
}

func (p *DBPool) Stats() map[string]interface{} {
    stats := p.db.Stats()
    return map[string]interface{}{
        "open_connections": stats.OpenConnections,
        "in_use":          stats.InUse,
        "idle":            stats.Idle,
        "query_count":     p.queryCount,
    }
}
```

---

## Quick Reference

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 20px;">

<div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
<div style="font-size: 24px; margin-bottom: 8px;">&#127919;</div>
<div style="font-weight: 600; color: #1e293b; margin-bottom: 4px;">Intent</div>
<div style="color: #64748b; font-size: 13px;">Ensure single instance with global access</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
<div style="font-size: 24px; margin-bottom: 8px;">&#128295;</div>
<div style="font-weight: 600; color: #1e293b; margin-bottom: 4px;">Key Mechanism</div>
<div style="color: #64748b; font-size: 13px;">Private constructor + static getInstance()</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
<div style="font-size: 24px; margin-bottom: 8px;">&#9888;&#65039;</div>
<div style="font-weight: 600; color: #1e293b; margin-bottom: 4px;">Watch Out</div>
<div style="color: #64748b; font-size: 13px;">Thread safety, testing difficulty, hidden deps</div>
</div>

<div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
<div style="font-size: 24px; margin-bottom: 8px;">&#128161;</div>
<div style="font-weight: 600; color: #1e293b; margin-bottom: 4px;">Alternative</div>
<div style="color: #64748b; font-size: 13px;">Dependency Injection for better testability</div>
</div>

</div>

<div style="background: white; padding: 16px; border-radius: 8px;">
<h4 style="color: #1e293b; margin-top: 0; margin-bottom: 12px;">Decision Checklist</h4>
<div style="display: flex; flex-wrap: wrap; gap: 8px;">
<span style="background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 4px; font-size: 13px;">Truly ONE instance needed?</span>
<span style="background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 4px; font-size: 13px;">Multiple instances cause problems?</span>
<span style="background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 4px; font-size: 13px;">State is simple/read-only?</span>
<span style="background: #fef3c7; color: #92400e; padding: 6px 12px; border-radius: 4px; font-size: 13px;">Can you use DI instead?</span>
</div>
</div>

</div>

---

## Related Patterns

- [Factory Method](/topic/design-patterns/factory-method) - Can return singleton instances
- [Abstract Factory](/topic/design-patterns/abstract-factory) - Often implemented as singleton
- [Builder](/topic/design-patterns/builder) - Can build singleton instances
- [Dependency Injection](/topic/design-patterns/dependency-injection) - Better alternative for testability
