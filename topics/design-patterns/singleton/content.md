# Singleton Pattern

## Overview

The Singleton pattern ensures a class has only one instance and provides a global point of access to it. It solves the problem of **coordinating access to shared resources** that should exist exactly once in a system - like a database connection pool, configuration manager, or logging service.

<div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: #f8fafc; font-size: 18px;">Core Equation</h4>
  <div style="font-family: 'Courier New', monospace; font-size: 16px; background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px; text-align: center;">
    Singleton = Private Constructor + Static Instance + Global Access Point + Thread Safety
  </div>
</div>

**Difficulty:** Low conceptually, but tricky to implement correctly
**Category:** Creational Pattern
**Gang of Four Classification:** Object Creational

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; color: white;">
  <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 0.75rem;">Core Insight</div>
  <div style="font-size: 0.95rem; line-height: 1.6;">
    The Singleton pattern is deceptively simple - the challenge isn't creating a single instance, it's ensuring <span style="color: #10b981; font-weight: 600;">exactly one instance exists</span> across all threads, class loaders, and serialization boundaries while remaining <span style="color: #10b981; font-weight: 600;">testable</span> and not becoming a hidden dependency nightmare.
  </div>
</div>

**Critical Assumption**: Singleton assumes that a single instance is truly required and that the instance can be safely shared across all consumers. If different contexts need different configurations, Singleton becomes an anti-pattern.

**Key Trade-off**: Global access convenience vs. testability and explicit dependencies. This trade-off drives most criticism of the pattern.

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

## Internal Mechanisms and Architecture

### The Singleton Guarantee Problem

Creating a singleton seems trivial until you consider what can break it:

<div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #991b1b; margin-top: 0;">Ways to Break Singleton Guarantee</h4>
  <div style="display: grid; gap: 12px;">
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #991b1b;">1. Race Conditions</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Two threads call <code>getInstance()</code> simultaneously, both see <code>instance == null</code>, both create instances. Result: <span style="color: #dc2626; font-weight: 600;">two instances exist</span>.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #991b1b;">2. Reflection Attack</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;"><code>Constructor.setAccessible(true)</code> bypasses private constructor. Malicious code or frameworks can create additional instances.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #991b1b;">3. Serialization/Deserialization</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Deserializing a singleton creates a new instance. Without <code>readResolve()</code>, you get multiple instances.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #991b1b;">4. Multiple Class Loaders</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Each class loader loads its own copy of the class. Enterprise containers (J2EE) can have multiple class loaders, creating multiple singletons.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #991b1b;">5. Cloning</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">If singleton implements <code>Cloneable</code>, <code>clone()</code> can create additional instances. Must override and throw exception.</p>
    </div>
  </div>
</div>

### Singleton Implementation Spectrum

<div style="background: #f8fafc; border-radius: 16px; padding: 2rem; margin: 2rem 0; border: 1px solid #e2e8f0;">
  <div style="font-weight: 700; font-size: 1.2rem; color: #1e293b; text-align: center; margin-bottom: 1.5rem;">Implementation Approaches: Safety vs. Complexity</div>

  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="display: flex; align-items: center; gap: 1rem;">
      <div style="background: #fee2e2; color: #991b1b; padding: 8px 16px; border-radius: 8px; min-width: 160px; text-align: center; font-weight: 600;">Eager Initialization</div>
      <div style="flex: 1; height: 8px; background: linear-gradient(to right, #22c55e 100%, #e2e8f0 0%); border-radius: 4px;"></div>
      <span style="color: #64748b; font-size: 14px;">Simple, thread-safe, may waste resources</span>
    </div>
    <div style="display: flex; align-items: center; gap: 1rem;">
      <div style="background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 8px; min-width: 160px; text-align: center; font-weight: 600;">Synchronized Method</div>
      <div style="flex: 1; height: 8px; background: linear-gradient(to right, #22c55e 70%, #e2e8f0 70%); border-radius: 4px;"></div>
      <span style="color: #64748b; font-size: 14px;">Thread-safe, performance bottleneck</span>
    </div>
    <div style="display: flex; align-items: center; gap: 1rem;">
      <div style="background: #dbeafe; color: #1e40af; padding: 8px 16px; border-radius: 8px; min-width: 160px; text-align: center; font-weight: 600;">Double-Checked Locking</div>
      <div style="flex: 1; height: 8px; background: linear-gradient(to right, #22c55e 85%, #e2e8f0 85%); border-radius: 4px;"></div>
      <span style="color: #64748b; font-size: 14px;">Complex, requires volatile, error-prone</span>
    </div>
    <div style="display: flex; align-items: center; gap: 1rem;">
      <div style="background: #dcfce7; color: #166534; padding: 8px 16px; border-radius: 8px; min-width: 160px; text-align: center; font-weight: 600;">Bill Pugh / Holder</div>
      <div style="flex: 1; height: 8px; background: linear-gradient(to right, #22c55e 95%, #e2e8f0 95%); border-radius: 4px;"></div>
      <span style="color: #64748b; font-size: 14px;">Elegant, lazy, thread-safe by JVM</span>
    </div>
    <div style="display: flex; align-items: center; gap: 1rem;">
      <div style="background: #f3e8ff; color: #7c3aed; padding: 8px 16px; border-radius: 8px; min-width: 160px; text-align: center; font-weight: 600;">Enum Singleton</div>
      <div style="flex: 1; height: 8px; background: linear-gradient(to right, #22c55e 100%, #e2e8f0 0%); border-radius: 4px;"></div>
      <span style="color: #64748b; font-size: 14px;">Best for Java, handles all edge cases</span>
    </div>
  </div>
</div>

---

## Thread-Safe Implementations Deep Dive

### 1. Eager Initialization

```java
/**
 * Eager Initialization Singleton
 *
 * Thread Safety: Guaranteed by JVM class loading mechanism
 * Pros: Simple, no synchronization needed
 * Cons: Instance created even if never used (wastes resources for heavy objects)
 */
public class EagerSingleton {
    // Instance created at class loading time
    private static final EagerSingleton INSTANCE = new EagerSingleton();

    private EagerSingleton() {
        // Prevent reflection attacks
        if (INSTANCE != null) {
            throw new IllegalStateException("Singleton already constructed");
        }
    }

    public static EagerSingleton getInstance() {
        return INSTANCE;
    }
}
```

<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0;">
  <div style="font-weight: 700; color: #166534; margin-bottom: 0.5rem;">Why It's Thread-Safe</div>
  <div style="color: #14532d; font-size: 0.9rem; line-height: 1.6;">
    The JVM guarantees that <span style="color: #10b981; font-weight: 600;">static initialization happens exactly once</span> when the class is first loaded. The class loading mechanism uses internal locking to ensure thread safety. No explicit synchronization needed in your code.
  </div>
</div>

### 2. Synchronized Method (Naive Thread-Safe)

```java
/**
 * Synchronized Method Singleton
 *
 * Thread Safety: Guaranteed by synchronized keyword
 * Problem: EVERY call to getInstance() acquires lock - massive performance hit
 */
public class SynchronizedSingleton {
    private static SynchronizedSingleton instance;

    private SynchronizedSingleton() {}

    // Synchronized on class lock - only one thread can enter at a time
    public static synchronized SynchronizedSingleton getInstance() {
        if (instance == null) {
            instance = new SynchronizedSingleton();
        }
        return instance;
    }
}
```

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0;">
  <div style="font-weight: 700; color: #92400e; margin-bottom: 0.5rem;">Performance Problem</div>
  <div style="color: #78350f; font-size: 0.9rem; line-height: 1.6;">
    Synchronization is only needed during the first call when instance is created. After that, every thread contends for a lock just to return an already-created instance. In high-throughput systems, this creates a <span style="color: #dc2626; font-weight: 600;">severe bottleneck</span> - threads queue up waiting for the lock.
  </div>
</div>

### 3. Double-Checked Locking (DCL)

<div style="background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: white;">Double-Checked Locking: The Tricky Pattern</h4>
  <p style="color: #fed7aa; margin-bottom: 16px;">DCL attempts to minimize synchronization overhead by checking if the instance exists before acquiring the lock. However, it's <span style="font-weight: 700;">notoriously difficult to implement correctly</span> due to memory visibility issues.</p>
</div>

```java
/**
 * Double-Checked Locking Singleton
 *
 * The volatile keyword is CRITICAL - without it, this pattern is BROKEN.
 *
 * Why volatile is required:
 * 1. Prevents instruction reordering during object construction
 * 2. Ensures visibility of fully constructed object across threads
 *
 * Without volatile, Thread B might see a non-null but partially
 * constructed instance (fields not initialized).
 */
public class DCLSingleton {
    // MUST be volatile - this is not optional!
    private static volatile DCLSingleton instance;

    private final String config;
    private final DatabaseConnection connection;

    private DCLSingleton() {
        // Expensive initialization
        this.config = loadConfig();
        this.connection = createConnection();
    }

    public static DCLSingleton getInstance() {
        // First check (no locking) - fast path for common case
        if (instance == null) {
            // Only synchronize when instance might need to be created
            synchronized (DCLSingleton.class) {
                // Second check (with lock) - another thread may have created it
                if (instance == null) {
                    instance = new DCLSingleton();
                }
            }
        }
        return instance;
    }
}
```

<div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #991b1b; margin-top: 0;">The Memory Visibility Problem (Without volatile)</h4>

  <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 16px;">
    <div style="font-family: monospace; font-size: 14px; color: #334155;">
      <div style="margin-bottom: 8px;"><span style="color: #64748b;">// What you write:</span></div>
      <div>instance = new DCLSingleton();</div>
      <br/>
      <div style="margin-bottom: 8px;"><span style="color: #64748b;">// What JVM might execute (reordered):</span></div>
      <div>1. memory = allocate()           <span style="color: #64748b;">// Allocate memory</span></div>
      <div>2. instance = memory             <span style="color: #dc2626; font-weight: 600;">// Assign reference (non-null now!)</span></div>
      <div>3. constructor(instance)         <span style="color: #64748b;">// Initialize fields</span></div>
    </div>
  </div>

  <p style="color: #7f1d1d; margin-top: 16px; font-size: 14px;">
    Thread B calls <code>getInstance()</code> between steps 2 and 3. It sees <code>instance != null</code> and returns a <span style="color: #dc2626; font-weight: 600;">partially constructed object</span> with uninitialized fields. This causes NullPointerExceptions or corrupt state later.
  </p>
</div>

### 4. Bill Pugh Solution (Initialization-on-Demand Holder)

<div style="background: linear-gradient(135deg, #059669 0%, #34d399 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: white;">Bill Pugh Solution: The Elegant Approach</h4>
  <p style="color: #a7f3d0; margin-bottom: 0;">This solution leverages the JVM's class loading mechanism to achieve <span style="font-weight: 700;">lazy initialization</span> and <span style="font-weight: 700;">thread safety</span> without any synchronization in your code. It's considered the <span style="font-weight: 700;">best practice for Java singletons</span> (before Java 5 enums).</p>
</div>

```java
/**
 * Bill Pugh Singleton (Initialization-on-Demand Holder Idiom)
 *
 * How it works:
 * 1. Inner class is not loaded until getInstance() is called
 * 2. When inner class loads, JVM guarantees thread-safe initialization
 * 3. No synchronization overhead after initialization
 *
 * This is the RECOMMENDED approach for Java singletons.
 */
public class BillPughSingleton {

    private BillPughSingleton() {
        // Prevent reflection attacks
        if (SingletonHolder.INSTANCE != null) {
            throw new IllegalStateException("Singleton already constructed");
        }
    }

    /**
     * Static inner class - not loaded until referenced.
     *
     * JLS (Java Language Specification) guarantees:
     * - Class initialization is thread-safe
     * - Happens-before relationship established
     * - Instance visible to all threads after initialization
     */
    private static class SingletonHolder {
        private static final BillPughSingleton INSTANCE = new BillPughSingleton();
    }

    public static BillPughSingleton getInstance() {
        // First call triggers SingletonHolder class loading
        // JVM handles all synchronization internally
        return SingletonHolder.INSTANCE;
    }

    // Prevent deserialization from creating new instance
    protected Object readResolve() {
        return getInstance();
    }
}
```

<div style="background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #0369a1; margin-top: 0;">Why Bill Pugh Works</h4>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; gap: 12px; align-items: flex-start;">
      <div style="background: #0ea5e9; color: white; border-radius: 50%; min-width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px;">1</div>
      <div>
        <strong style="color: #0369a1;">Lazy Loading</strong>
        <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">The <code>SingletonHolder</code> class isn't loaded until <code>getInstance()</code> is called. No instance created at class load time.</p>
      </div>
    </div>
    <div style="display: flex; gap: 12px; align-items: flex-start;">
      <div style="background: #0ea5e9; color: white; border-radius: 50%; min-width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px;">2</div>
      <div>
        <strong style="color: #0369a1;">JVM Guarantees Thread Safety</strong>
        <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">Class initialization in Java is inherently thread-safe. The JVM acquires a lock during class initialization, ensuring only one thread initializes the class.</p>
      </div>
    </div>
    <div style="display: flex; gap: 12px; align-items: flex-start;">
      <div style="background: #0ea5e9; color: white; border-radius: 50%; min-width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px;">3</div>
      <div>
        <strong style="color: #0369a1;">No Synchronization Overhead</strong>
        <p style="color: #475569; margin: 4px 0 0 0; font-size: 14px;">After initialization, <code>getInstance()</code> is just a simple field access - no volatile reads, no locks, optimal performance.</p>
      </div>
    </div>
  </div>
</div>

### 5. Enum Singleton (Effective Java Recommendation)

<div style="background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: white;">Enum Singleton: Joshua Bloch's Recommendation</h4>
  <p style="color: #e0e7ff; margin-bottom: 0;">"A single-element enum type is often the best way to implement a singleton" - <em>Effective Java, 3rd Edition</em>. Enums provide <span style="font-weight: 700;">serialization safety</span>, <span style="font-weight: 700;">reflection safety</span>, and <span style="font-weight: 700;">thread safety</span> by design.</p>
</div>

```java
/**
 * Enum Singleton - The "Effective Java" recommended approach
 *
 * Advantages:
 * 1. Thread-safe by JVM guarantee
 * 2. Serialization handled automatically (no readResolve needed)
 * 3. Reflection cannot create new instances
 * 4. Simple and concise
 *
 * Limitations:
 * 1. Cannot extend other classes (enums implicitly extend Enum)
 * 2. Eager initialization (created when enum class loads)
 * 3. Cannot be lazily initialized
 */
public enum EnumSingleton {
    INSTANCE;

    // Instance fields
    private Connection connection;
    private Map<String, Object> cache;

    // Constructor - called once when enum is loaded
    EnumSingleton() {
        this.cache = new ConcurrentHashMap<>();
        // Careful: Don't do heavy I/O in enum constructor
        // It runs during class loading
    }

    // Instance methods
    public Connection getConnection() {
        if (connection == null) {
            connection = createConnection();
        }
        return connection;
    }

    public void put(String key, Object value) {
        cache.put(key, value);
    }

    public Object get(String key) {
        return cache.get(key);
    }

    private Connection createConnection() {
        // Create database connection
        return null; // Placeholder
    }
}

// Usage
EnumSingleton.INSTANCE.put("config", configValue);
Object config = EnumSingleton.INSTANCE.get("config");
```

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0;">Why Enum Handles All Edge Cases</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div>
      <div style="background: #dcfce7; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
        <strong style="color: #166534;">Reflection Protection</strong>
        <p style="color: #14532d; margin: 8px 0 0 0; font-size: 14px;">JVM throws <code>IllegalArgumentException</code> if you try to reflectively create enum instances. Built into the language.</p>
      </div>
      <div style="background: #dbeafe; padding: 16px; border-radius: 8px;">
        <strong style="color: #1e40af;">Thread Safety</strong>
        <p style="color: #1e40af; margin: 8px 0 0 0; font-size: 14px;">Enum initialization is guaranteed thread-safe by JLS. No synchronization needed.</p>
      </div>
    </div>
    <div>
      <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
        <strong style="color: #92400e;">Serialization Safety</strong>
        <p style="color: #78350f; margin: 8px 0 0 0; font-size: 14px;">Java serialization mechanism guarantees that enum values are not duplicated on deserialization. No <code>readResolve()</code> needed.</p>
      </div>
      <div style="background: #fce7f3; padding: 16px; border-radius: 8px;">
        <strong style="color: #9d174d;">Clone Protection</strong>
        <p style="color: #831843; margin: 8px 0 0 0; font-size: 14px;">Enums cannot be cloned. <code>Enum.clone()</code> throws <code>CloneNotSupportedException</code>.</p>
      </div>
    </div>
  </div>
</div>

---

## Python Thread-Safe Implementations

### Metaclass Singleton (Most Pythonic)

```python
import threading
from typing import Dict, Any, TypeVar, Type

T = TypeVar('T')


class SingletonMeta(type):
    """
    Thread-safe Singleton metaclass.

    How it works:
    1. Metaclass controls class instantiation via __call__
    2. Lock ensures only one thread creates the instance
    3. Double-checked locking pattern for performance

    This is the RECOMMENDED approach for Python singletons.
    """
    _instances: Dict[type, Any] = {}
    _lock: threading.Lock = threading.Lock()

    def __call__(cls: Type[T], *args, **kwargs) -> T:
        # First check without lock (fast path)
        if cls not in cls._instances:
            with cls._lock:
                # Second check with lock (thread safety)
                if cls not in cls._instances:
                    instance = super().__call__(*args, **kwargs)
                    cls._instances[cls] = instance
        return cls._instances[cls]


class DatabaseConnection(metaclass=SingletonMeta):
    """Example singleton using metaclass."""

    def __init__(self, connection_string: str = "default"):
        # __init__ only runs once due to metaclass
        self.connection_string = connection_string
        self._connection = None
        print(f"DatabaseConnection initialized with {connection_string}")

    def connect(self):
        if self._connection is None:
            # Create actual connection
            self._connection = self._create_connection()
        return self._connection

    def _create_connection(self):
        # Placeholder for actual connection logic
        return f"Connection to {self.connection_string}"


# Usage - all calls return the same instance
db1 = DatabaseConnection("postgresql://localhost/mydb")
db2 = DatabaseConnection("different_string")  # Args ignored after first call
assert db1 is db2  # True
```

### Module-Level Singleton (Python's Natural Pattern)

```python
"""
config_singleton.py

In Python, modules are naturally singletons.
The module is loaded once and cached in sys.modules.

This is the SIMPLEST approach for Python singletons.
"""
import threading
from typing import Any, Dict, Optional
import json
import os


class _ConfigManager:
    """Internal configuration manager class."""

    def __init__(self):
        self._config: Dict[str, Any] = {}
        self._lock = threading.RLock()
        self._loaded = False

    def load(self, config_path: str) -> 'ConfigManager':
        """Load configuration from file (thread-safe)."""
        with self._lock:
            if not self._loaded:
                with open(config_path, 'r') as f:
                    self._config = json.load(f)
                self._loaded = True
        return self

    def get(self, key: str, default: Any = None) -> Any:
        """Get configuration value."""
        return self._config.get(key, default)

    def set(self, key: str, value: Any) -> None:
        """Set configuration value (thread-safe)."""
        with self._lock:
            self._config[key] = value


# Module-level singleton instance
config = _ConfigManager()


def get_config() -> _ConfigManager:
    """Get the singleton config manager."""
    return config
```

### Go sync.Once Pattern

```go
package singleton

import (
    "sync"
    "database/sql"
)

// ConfigManager is a singleton configuration holder
type ConfigManager struct {
    settings map[string]interface{}
    mu       sync.RWMutex
}

var (
    instance *ConfigManager
    once     sync.Once
)

// GetInstance returns the singleton ConfigManager
// sync.Once guarantees this function body executes exactly once,
// even when called from multiple goroutines simultaneously.
func GetInstance() *ConfigManager {
    once.Do(func() {
        // This block executes exactly once
        instance = &ConfigManager{
            settings: make(map[string]interface{}),
        }
        instance.loadDefaults()
    })
    return instance
}

func (c *ConfigManager) loadDefaults() {
    c.settings["environment"] = "development"
    c.settings["debug"] = true
}

// Get retrieves a setting (read-locked)
func (c *ConfigManager) Get(key string) interface{} {
    c.mu.RLock()
    defer c.mu.RUnlock()
    return c.settings[key]
}

// Set updates a setting (write-locked)
func (c *ConfigManager) Set(key string, value interface{}) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.settings[key] = value
}
```

<div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 0 8px 8px 0;">
  <div style="font-weight: 700; color: #166534; margin-bottom: 0.5rem;">Why sync.Once is Perfect for Go</div>
  <div style="color: #14532d; font-size: 0.9rem; line-height: 1.6;">
    <code>sync.Once</code> is specifically designed for one-time initialization. It uses atomic operations internally and is <span style="color: #10b981; font-weight: 600;">wait-free after initialization</span>. The first goroutine to call <code>Do()</code> executes the function; all others wait until it completes, then return immediately. This is the <span style="color: #10b981; font-weight: 600;">idiomatic Go approach</span> for singletons.
  </div>
</div>

---

## Testing Challenges and Solutions

<div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #991b1b; margin-top: 0;">Why Singletons Are Hard to Test</h4>
  <div style="display: grid; gap: 16px;">
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #991b1b;">1. Global State Pollution</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Singleton state persists across tests. Test A modifies singleton, Test B sees modified state. Tests become order-dependent and flaky.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #991b1b;">2. Cannot Mock Dependencies</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Code that uses <code>Singleton.getInstance()</code> is tightly coupled. You can't inject a mock - the real singleton is always used.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #991b1b;">3. Hidden Dependencies</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Singleton calls are often buried deep in code. You don't see them in constructor/method signatures, making dependencies invisible.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
      <strong style="color: #991b1b;">4. Parallel Test Execution</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Multiple test threads sharing singleton state causes race conditions. Tests pass individually but fail when run together.</p>
    </div>
  </div>
</div>

### Solution 1: Interface + Dependency Injection

```java
/**
 * Solution: Program to interface, inject dependency
 *
 * Instead of code calling Singleton.getInstance(),
 * inject the dependency explicitly.
 */

// Interface for the singleton's behavior
public interface ConfigService {
    String get(String key);
    void set(String key, String value);
}

// Real implementation (singleton internally)
public class ConfigServiceImpl implements ConfigService {
    private static final ConfigServiceImpl INSTANCE = new ConfigServiceImpl();
    private final Map<String, String> config = new ConcurrentHashMap<>();

    private ConfigServiceImpl() {}

    public static ConfigService getInstance() {
        return INSTANCE;
    }

    @Override
    public String get(String key) {
        return config.get(key);
    }

    @Override
    public void set(String key, String value) {
        config.put(key, value);
    }
}

// Code that uses config - receives it via injection
public class OrderService {
    private final ConfigService config;

    // Dependency injected via constructor
    public OrderService(ConfigService config) {
        this.config = config;
    }

    public void processOrder(Order order) {
        String maxItems = config.get("max_items_per_order");
        // ... use config
    }
}

// In production
OrderService service = new OrderService(ConfigServiceImpl.getInstance());

// In tests - inject mock
ConfigService mockConfig = mock(ConfigService.class);
when(mockConfig.get("max_items_per_order")).thenReturn("100");
OrderService testService = new OrderService(mockConfig);
```

### Solution 2: Reset Method for Testing

```python
"""
Solution: Provide a reset method for tests.
This is a pragmatic approach when refactoring to DI isn't feasible.
"""
import threading
from typing import Optional


class CacheManager:
    """Singleton with test reset capability."""

    _instance: Optional['CacheManager'] = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self._initialized = True
        self._cache = {}

    def get(self, key: str):
        return self._cache.get(key)

    def set(self, key: str, value):
        self._cache[key] = value

    @classmethod
    def _reset_for_testing(cls):
        """
        Reset singleton state for testing.

        WARNING: Only use in test code!
        Consider using environment variable check:
        if os.environ.get('TESTING') != 'true':
            raise RuntimeError("_reset_for_testing only allowed in tests")
        """
        with cls._lock:
            cls._instance = None


# In tests
import pytest

@pytest.fixture(autouse=True)
def reset_singleton():
    """Reset singleton before each test."""
    yield
    CacheManager._reset_for_testing()


def test_cache_set_get():
    cache = CacheManager()
    cache.set("key", "value")
    assert cache.get("key") == "value"


def test_cache_empty():
    cache = CacheManager()
    # This would fail without reset - it would see previous test's data
    assert cache.get("key") is None
```

### Solution 3: Scoped Singletons (Per-Request/Per-Thread)

```python
"""
Solution: Use scoped singletons instead of global singletons.
Each test gets its own scope, preventing cross-contamination.
"""
import threading
from contextvars import ContextVar
from typing import TypeVar, Generic, Callable

T = TypeVar('T')


class ScopedSingleton(Generic[T]):
    """
    Context-scoped singleton using contextvars.

    Each async context/thread can have its own instance.
    Perfect for web request handling where you want
    "one per request" instead of "one per application".
    """

    def __init__(self, factory: Callable[[], T]):
        self._factory = factory
        self._context_var: ContextVar[T] = ContextVar('scoped_singleton')

    def get(self) -> T:
        """Get or create instance for current context."""
        try:
            return self._context_var.get()
        except LookupError:
            instance = self._factory()
            self._context_var.set(instance)
            return instance

    def set(self, instance: T) -> None:
        """Explicitly set instance (useful for testing)."""
        self._context_var.set(instance)


# Usage
class RequestContext:
    def __init__(self):
        self.user_id = None
        self.request_id = None

request_context = ScopedSingleton(RequestContext)

# In request handler
ctx = request_context.get()
ctx.user_id = authenticated_user_id

# In tests - each test gets fresh context
def test_something():
    ctx = request_context.get()  # Fresh instance for this test
    assert ctx.user_id is None
```

---

## Interview Deep-Dive: Thread-Safe Implementations

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: What are the main approaches to implement a thread-safe singleton?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> There are five main approaches: (1) <span style="color: #10b981; font-weight: 600;">Eager initialization</span> - create instance at class load time, thread-safe but not lazy. (2) <span style="color: #10b981; font-weight: 600;">Synchronized method</span> - wrap getInstance() in synchronized, thread-safe but slow. (3) <span style="color: #10b981; font-weight: 600;">Double-checked locking</span> - check null before and after lock, requires volatile. (4) <span style="color: #10b981; font-weight: 600;">Bill Pugh/Holder pattern</span> - use static inner class, lazy and thread-safe via JVM guarantees. (5) <span style="color: #10b981; font-weight: 600;">Enum singleton</span> - use single-element enum, handles serialization and reflection attacks.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: Why is the volatile keyword required in double-checked locking, and what happens without it?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Without volatile, the JVM can reorder instructions during object construction. The sequence <code>instance = new Singleton()</code> involves: (1) allocate memory, (2) initialize fields, (3) assign reference. Without volatile, the JVM might reorder to: allocate, assign reference, then initialize. Thread B could see a non-null instance with uninitialized fields, causing NullPointerExceptions or corrupt state. The volatile keyword establishes a <span style="color: #10b981; font-weight: 600;">happens-before relationship</span> - all writes before the volatile write are visible to threads that read the volatile variable. This prevents seeing a partially constructed object.</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: How would you implement a singleton that survives serialization, reflection attacks, and works correctly across multiple class loaders in a J2EE container?</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> The most robust solution is the <span style="color: #10b981; font-weight: 600;">enum singleton</span> combined with container-managed singletons. For serialization: enums are inherently serialization-safe - the JVM ensures only the named constants exist after deserialization. For reflection: the JVM prevents reflective instantiation of enums with <code>IllegalArgumentException</code>. For multiple class loaders: this is the hardest problem - true JVM-wide singletons are nearly impossible. Solutions: (1) Place singleton class in a shared parent class loader (system classpath). (2) Use JNDI to bind the singleton and look it up from child class loaders. (3) Use a [[dependency-injection]](/topic/design-patterns/dependency-injection) container like Spring which manages singleton scope at the container level, not JVM level. (4) Accept per-classloader singletons and design accordingly. If you must have a process-wide singleton, consider using the operating system: a named pipe, shared memory segment, or network socket that only one process can bind.</p>
    </div>
  </div>
</div>

---

## Interview Deep-Dive: Bill Pugh and Enum Solutions

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: Explain how the Bill Pugh singleton achieves lazy loading.</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> The Bill Pugh pattern uses a static inner class to hold the singleton instance. In Java, <span style="color: #10b981; font-weight: 600;">inner classes are not loaded until they are referenced</span>. When you call <code>getInstance()</code>, it references the inner <code>SingletonHolder</code> class, triggering its loading. At that point, the static final INSTANCE field is initialized. Before <code>getInstance()</code> is called, the inner class doesn't exist in memory, achieving true lazy initialization without explicit synchronization.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: When would you choose enum singleton over Bill Pugh, and vice versa?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Choose <span style="color: #10b981; font-weight: 600;">enum singleton</span> when: (1) You need serialization safety without additional code. (2) You want protection against reflection attacks. (3) You don't need to extend another class. (4) Eager initialization is acceptable. Choose <span style="color: #10b981; font-weight: 600;">Bill Pugh</span> when: (1) You need lazy initialization and the singleton is expensive to create. (2) You need to extend another class (enums cannot extend classes). (3) You're working with frameworks that don't handle enum singletons well. (4) You need to implement interfaces (both support this, but Bill Pugh is more natural). In modern Java, I default to enum unless I specifically need inheritance or lazy initialization.</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: Design a singleton that can be configured with different implementations at startup (like a test mode vs production mode) while maintaining thread safety and singleton guarantees.</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> Use a configurable holder pattern with interface-based design:
      <br/><br/>
      <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">public interface Service { void doWork(); }</code>
      <br/><br/>
      Create a holder that accepts configuration before first access:
      <br/><br/>
      <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">ServiceHolder.configure(ProductionService::new);</code> // Call once at startup
      <br/>
      <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">Service svc = ServiceHolder.getInstance();</code>
      <br/><br/>
      The holder uses <code>AtomicReference</code> for the factory and lazy initialization for the instance. The <code>configure()</code> method uses compareAndSet to ensure it's only called once - subsequent calls throw an exception. This pattern is used by logging frameworks like SLF4J where you configure the logging implementation at startup. For testing, call <code>ServiceHolder.configure(MockService::new)</code> before any code accesses the singleton. Key invariant: configuration must happen before first access, enforced by throwing if <code>getInstance()</code> is called before <code>configure()</code> or if <code>configure()</code> is called after <code>getInstance()</code>.</p>
    </div>
  </div>
</div>

---

## Interview Deep-Dive: Testing Challenges

<div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e40af; margin-top: 0;">Level 1: Why are singletons considered difficult to test?</h4>

  <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Singletons create <span style="color: #10b981; font-weight: 600;">hidden dependencies</span> and <span style="color: #10b981; font-weight: 600;">global state</span>. Tests cannot run in isolation because the singleton maintains state across tests. You cannot easily substitute a mock implementation because code calls <code>Singleton.getInstance()</code> directly rather than receiving the dependency. Tests become order-dependent - Test A might pass alone but fail after Test B modifies the singleton. Parallel test execution becomes problematic due to shared mutable state.</p>

  <div style="background: white; border-radius: 8px; padding: 20px; margin-top: 16px; border-left: 4px solid #3b82f6;">
    <h5 style="color: #1e40af; margin-top: 0;">Level 2: How would you refactor existing code that uses singletons to make it testable without a complete rewrite?</h5>

    <p style="color: #1e293b; line-height: 1.7;"><strong>Answer:</strong> Use the <span style="color: #10b981; font-weight: 600;">"Seam" approach</span>: (1) Extract an interface from the singleton class. (2) Make <code>getInstance()</code> return the interface type. (3) Add a package-private <code>setInstance(Interface impl)</code> method for testing. (4) In tests, call <code>setInstance(mockImpl)</code> before the code under test. (5) Reset in <code>@After</code> or use try-finally. This maintains backward compatibility - existing code still calls <code>getInstance()</code> - while allowing test injection. For new code, refactor to constructor injection gradually. Related: See [[dependency-injection]](/topic/design-patterns/dependency-injection) for the full DI pattern.</p>

    <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 12px; border-left: 4px solid #60a5fa;">
      <h6 style="color: #1e40af; margin-top: 0;">Level 3: Design a testing strategy for a system where 50+ classes depend on a DatabaseConnection singleton, some of which need real database access in integration tests while unit tests need mocks.</h6>

      <p style="color: #1e293b; line-height: 1.7; font-size: 14px;"><strong>Answer:</strong> Implement a <span style="color: #10b981; font-weight: 600;">layered singleton with environment-aware initialization</span>:
      <br/><br/>
      (1) <strong>Interface Layer:</strong> Define <code>DatabaseConnection</code> interface with all public methods.
      <br/><br/>
      (2) <strong>Provider Pattern:</strong> Create <code>DatabaseConnectionProvider</code> singleton that returns the appropriate implementation:
      <br/>
      - In production: returns the real pooled connection
      <br/>
      - In unit tests: returns a mock (detect via <code>System.getProperty("test.mode")</code> or TestNG/JUnit runner detection)
      <br/>
      - In integration tests: returns a test database connection (H2 in-memory or testcontainers)
      <br/><br/>
      (3) <strong>Scoped Instances:</strong> For unit tests, use thread-local or context-var scoped instances so parallel tests don't interfere.
      <br/><br/>
      (4) <strong>Reset Hooks:</strong> Integration tests get a fresh database state via <code>@BeforeEach</code> that truncates tables or restores from snapshot.
      <br/><br/>
      (5) <strong>Gradual Migration:</strong> New code uses constructor injection with the provider as default. Old code continues using <code>getInstance()</code> which delegates to the provider.
      <br/><br/>
      This approach lets you run: unit tests (fast, mocked), integration tests (real DB, isolated), and E2E tests (production config) - all with the same codebase and minimal changes to existing code.</p>
    </div>
  </div>
</div>

---

## Singleton in Distributed Systems

<div style="background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%); border-radius: 16px; padding: 28px; margin: 24px 0; color: white;">
  <h4 style="margin-top: 0; color: white;">The Distributed Singleton Challenge</h4>
  <p style="color: #fed7aa; margin-bottom: 0;">In distributed systems, "singleton" becomes a logical concept - you can't have a true JVM singleton across multiple processes. The challenge shifts to ensuring <span style="font-weight: 700;">only one logical instance operates at a time</span> across the cluster.</p>
</div>

<div style="background: #f8fafc; border-radius: 16px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #1e293b; margin-top: 0;">Distributed Singleton Patterns</h4>
  <div style="display: grid; gap: 16px;">
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <strong style="color: #1e40af;">Leader Election</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Use Zookeeper, etcd, or Consul for leader election. Only the leader node runs the singleton logic. On leader failure, another node is elected. See [[distributed-coordination]](/topic/system-design/distributed-systems).</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
      <strong style="color: #166534;">Distributed Locks</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Use Redis SETNX or Redlock for distributed locking. Singleton operation acquires lock, processes, releases lock. See [[distributed-locking]](/topic/system-design/distributed-locking).</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <strong style="color: #92400e;">Database Unique Constraint</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">For ID generation, use database auto-increment or unique constraints. Only one row can have a given ID - the database enforces singleton-like uniqueness.</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
      <strong style="color: #6d28d9;">Idempotent Operations</strong>
      <p style="color: #475569; margin: 8px 0 0 0; font-size: 14px;">Design operations to be idempotent - running them multiple times has the same effect as once. This sidesteps the singleton requirement by making duplicates harmless.</p>
    </div>
  </div>
</div>

---

## Real-World Implementation: Connection Pool Singleton

```java
/**
 * Production-grade database connection pool singleton.
 *
 * Demonstrates:
 * - Bill Pugh pattern for thread-safe lazy initialization
 * - Interface-based design for testability
 * - Graceful shutdown handling
 * - Configuration from environment
 */
public interface ConnectionPool {
    Connection getConnection() throws SQLException;
    void releaseConnection(Connection connection);
    PoolStats getStats();
    void shutdown();
}

public final class HikariConnectionPool implements ConnectionPool {

    private final HikariDataSource dataSource;
    private final AtomicBoolean shutdown = new AtomicBoolean(false);

    private HikariConnectionPool() {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(System.getenv("DATABASE_URL"));
        config.setUsername(System.getenv("DATABASE_USER"));
        config.setPassword(System.getenv("DATABASE_PASSWORD"));
        config.setMaximumPoolSize(
            Integer.parseInt(System.getenv().getOrDefault("DB_POOL_SIZE", "10"))
        );
        config.setMinimumIdle(2);
        config.setIdleTimeout(300000);  // 5 minutes
        config.setConnectionTimeout(10000);  // 10 seconds
        config.setMaxLifetime(1800000);  // 30 minutes

        // Add metrics
        config.setMetricRegistry(Metrics.getRegistry());

        this.dataSource = new HikariDataSource(config);

        // Register shutdown hook
        Runtime.getRuntime().addShutdownHook(new Thread(this::shutdown));
    }

    // Bill Pugh holder pattern
    private static class PoolHolder {
        private static final HikariConnectionPool INSTANCE = new HikariConnectionPool();
    }

    public static ConnectionPool getInstance() {
        return PoolHolder.INSTANCE;
    }

    @Override
    public Connection getConnection() throws SQLException {
        if (shutdown.get()) {
            throw new SQLException("Connection pool has been shut down");
        }
        return dataSource.getConnection();
    }

    @Override
    public void releaseConnection(Connection connection) {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();  // Returns to pool, doesn't actually close
            }
        } catch (SQLException e) {
            // Log and continue - don't fail on cleanup
            logger.warn("Error releasing connection", e);
        }
    }

    @Override
    public PoolStats getStats() {
        HikariPoolMXBean poolMXBean = dataSource.getHikariPoolMXBean();
        return new PoolStats(
            poolMXBean.getTotalConnections(),
            poolMXBean.getActiveConnections(),
            poolMXBean.getIdleConnections(),
            poolMXBean.getThreadsAwaitingConnection()
        );
    }

    @Override
    public void shutdown() {
        if (shutdown.compareAndSet(false, true)) {
            logger.info("Shutting down connection pool");
            dataSource.close();
        }
    }
}
```

---

## Anti-Patterns and Code Smells

<div style="background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #991b1b; margin-top: 0;">Singleton Anti-Patterns to Avoid</h4>

  <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #fecaca;">
    <div style="font-weight: 600; color: #991b1b; margin-bottom: 8px;">1. The God Singleton</div>
    <div style="color: #7f1d1d; font-size: 14px; line-height: 1.6;">
      <strong>Problem:</strong> A singleton that does everything - config, logging, caching, database, business logic.
      <br/>
      <strong>Solution:</strong> Follow Single Responsibility Principle. Create separate singletons or use [[facade]](/topic/design-patterns/facade) to coordinate them.
    </div>
  </div>

  <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #fecaca;">
    <div style="font-weight: 600; color: #991b1b; margin-bottom: 8px;">2. Singleton for Convenience</div>
    <div style="color: #7f1d1d; font-size: 14px; line-height: 1.6;">
      <strong>Problem:</strong> Using singleton just to avoid passing objects around, not because single instance is required.
      <br/>
      <strong>Solution:</strong> Use dependency injection. If you need easy access, that's what DI containers are for.
    </div>
  </div>

  <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #fecaca;">
    <div style="font-weight: 600; color: #991b1b; margin-bottom: 8px;">3. Mutable Singleton State</div>
    <div style="color: #7f1d1d; font-size: 14px; line-height: 1.6;">
      <strong>Problem:</strong> Singleton that allows arbitrary state modification from anywhere in the codebase.
      <br/>
      <strong>Solution:</strong> Prefer immutable singletons or restrict mutation to specific methods with clear semantics.
    </div>
  </div>

  <div style="margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #fecaca;">
    <div style="font-weight: 600; color: #991b1b; margin-bottom: 8px;">4. User-Specific Data in Singleton</div>
    <div style="color: #7f1d1d; font-size: 14px; line-height: 1.6;">
      <strong>Problem:</strong> Storing user session, preferences, or context in a singleton shared across all users.
      <br/>
      <strong>Solution:</strong> Use request-scoped or session-scoped containers. Store user data in thread-locals or context objects.
    </div>
  </div>

  <div>
    <div style="font-weight: 600; color: #991b1b; margin-bottom: 8px;">5. Singleton Masking Design Problems</div>
    <div style="color: #7f1d1d; font-size: 14px; line-height: 1.6;">
      <strong>Problem:</strong> Adding a singleton to "fix" a problem caused by poor design elsewhere.
      <br/>
      <strong>Solution:</strong> Address the root cause. Often the real problem is missing abstraction or incorrect object ownership.
    </div>
  </div>
</div>

---

## Quick Reference

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; color: white;">
  <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">Interview Checklist</div>
  <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8;">
    <li><strong>Definition:</strong> Ensures exactly one instance with global access point</li>
    <li><strong>Thread Safety:</strong> Requires explicit handling - DCL (volatile), Bill Pugh (holder), or enum</li>
    <li><strong>Best Java Approach:</strong> Enum singleton (handles serialization, reflection, thread safety)</li>
    <li><strong>Best Python Approach:</strong> Module-level instance or metaclass</li>
    <li><strong>Best Go Approach:</strong> sync.Once pattern</li>
    <li><strong>Testing Strategy:</strong> Interface + DI, or reset methods with caution</li>
    <li><strong>Common Pitfall:</strong> Using singleton for convenience instead of necessity</li>
    <li><strong>Distributed Systems:</strong> Use leader election, distributed locks, or idempotent design</li>
  </ul>
</div>

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
  <h4 style="color: #1e293b; margin-top: 0; margin-bottom: 12px;">Decision Checklist: Should You Use Singleton?</h4>
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <span style="background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 4px; font-size: 13px;">Is exactly ONE instance required?</span>
    <span style="background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 4px; font-size: 13px;">Would multiple instances cause problems?</span>
    <span style="background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 4px; font-size: 13px;">Is state minimal or read-only?</span>
    <span style="background: #fef3c7; color: #92400e; padding: 6px 12px; border-radius: 4px; font-size: 13px;">Can you use DI instead?</span>
    <span style="background: #fef3c7; color: #92400e; padding: 6px 12px; border-radius: 4px; font-size: 13px;">How will you test it?</span>
    <span style="background: #fee2e2; color: #991b1b; padding: 6px 12px; border-radius: 4px; font-size: 13px;">Is this just for convenience?</span>
  </div>
</div>

---

## Related Patterns

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;">
  <div style="font-weight: 700; color: #1e293b; margin-bottom: 1rem; font-size: 1.1rem;">Pattern Relationships</div>

  <div style="display: grid; gap: 1rem;">
    <div style="background: #dbeafe; padding: 1rem; border-radius: 8px;">
      <div style="font-weight: 600; color: #1e40af;">[[Factory Method]](/topic/design-patterns/factory-method)</div>
      <div style="font-size: 0.9rem; color: #1e40af;">Often returns singleton instances. Factory can hide singleton implementation details from clients.</div>
    </div>

    <div style="background: #dcfce7; padding: 1rem; border-radius: 8px;">
      <div style="font-weight: 600; color: #166534;">[[Abstract Factory]](/topic/design-patterns/abstract-factory)</div>
      <div style="font-size: 0.9rem; color: #166534;">Frequently implemented as singleton since you typically need only one factory per family of products.</div>
    </div>

    <div style="background: #fef3c7; padding: 1rem; border-radius: 8px;">
      <div style="font-weight: 600; color: #92400e;">[[Builder]](/topic/design-patterns/builder)</div>
      <div style="font-size: 0.9rem; color: #92400e;">Can be used to construct complex singleton instances with many configuration options.</div>
    </div>

    <div style="background: #fce7f3; padding: 1rem; border-radius: 8px;">
      <div style="font-weight: 600; color: #9d174d;">[[Dependency Injection]](/topic/design-patterns/dependency-injection)</div>
      <div style="font-size: 0.9rem; color: #9d174d;">The modern alternative to singleton. DI containers manage singleton lifecycle while preserving testability.</div>
    </div>

    <div style="background: #e0e7ff; padding: 1rem; border-radius: 8px;">
      <div style="font-weight: 600; color: #3730a3;">[[Flyweight]](/topic/design-patterns/flyweight)</div>
      <div style="font-size: 0.9rem; color: #3730a3;">Shares instances but allows multiple flyweights. Singleton is the extreme case of one shared instance.</div>
    </div>

    <div style="background: #f3e8ff; padding: 1rem; border-radius: 8px;">
      <div style="font-weight: 600; color: #7c3aed;">[[State]](/topic/design-patterns/state)</div>
      <div style="font-size: 0.9rem; color: #7c3aed;">State objects are often implemented as singletons since they're stateless and can be shared.</div>
    </div>
  </div>
</div>
