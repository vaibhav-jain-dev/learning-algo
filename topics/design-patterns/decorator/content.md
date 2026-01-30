# Decorator Pattern

## Overview

The Decorator pattern dynamically attaches additional responsibilities to objects by wrapping them with decorator objects that share the same interface. Unlike subclassing, which creates static behavior extensions at compile time, decoration enables runtime composition of behaviors while preserving the Open/Closed Principle.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #e94560;">
<h4 style="color: #e94560; margin: 0 0 0.75rem 0;">Core Insight</h4>
<p style="color: #eee; margin: 0; line-height: 1.6;">The Decorator pattern embodies the principle of <strong>composition over inheritance</strong>. Each decorator "has-a" component rather than "is-a" specialized version, enabling unlimited behavioral combinations without exponential class hierarchies.</p>
</div>

## Structural Architecture

<div style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem; margin: 2rem 0; font-family: system-ui, sans-serif;">
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 1.25rem 2rem; color: white; text-align: center; box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);">
<div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 0.5rem;">Component Interface</div>
<div style="font-size: 0.85rem; opacity: 0.9; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 0.5rem; font-family: monospace;">+ operation(): Result</div>
</div>
<div style="display: flex; align-items: center; gap: 0.5rem; color: #667eea;">
<div style="width: 2px; height: 30px; background: #667eea;"></div>
</div>
<div style="display: flex; gap: 4rem; align-items: flex-start;">
<div style="display: flex; flex-direction: column; align-items: center;">
<div style="background: linear-gradient(135deg, #0f3460 0%, #16213e 100%); border: 2px solid #4ecdc4; border-radius: 10px; padding: 1rem 1.5rem; text-align: center;">
<div style="color: #4ecdc4; font-weight: 600;">ConcreteComponent</div>
<div style="color: #888; font-size: 0.8rem; margin-top: 0.5rem; font-family: monospace;">+ operation()</div>
</div>
<div style="color: #888; font-size: 0.75rem; margin-top: 0.5rem; max-width: 150px; text-align: center;">Base implementation without decoration</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
<div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); border-radius: 10px; padding: 1rem 1.5rem; color: white; text-align: center; box-shadow: 0 4px 15px rgba(17, 153, 142, 0.3);">
<div style="font-weight: 700;">BaseDecorator</div>
<div style="font-size: 0.8rem; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 0.5rem; margin-top: 0.5rem; font-family: monospace;">
          - wrappedComponent: Component<br>+ operation(): delegates to wrapped
</div>
</div>
<div style="display: flex; align-items: center; gap: 0.5rem; color: #38ef7d;">
<div style="width: 2px; height: 20px; background: #38ef7d;"></div>
</div>
<div style="display: flex; gap: 1.5rem;">
<div style="background: #1a1a2e; border: 2px solid #f093fb; border-radius: 8px; padding: 0.75rem 1rem; text-align: center;">
<div style="color: #f093fb; font-size: 0.9rem; font-weight: 600;">DecoratorA</div>
<div style="color: #888; font-size: 0.75rem; margin-top: 0.25rem;">adds behavior before</div>
</div>
<div style="background: #1a1a2e; border: 2px solid #ffd93d; border-radius: 8px; padding: 0.75rem 1rem; text-align: center;">
<div style="color: #ffd93d; font-size: 0.9rem; font-weight: 600;">DecoratorB</div>
<div style="color: #888; font-size: 0.75rem; margin-top: 0.25rem;">adds behavior after</div>
</div>
</div>
</div>
</div>
</div>

---

## Section 1: Decorator vs Inheritance - The Fundamental Trade-off

### The Combinatorial Explosion Problem

Inheritance creates a **static class hierarchy** where each combination of features requires a dedicated class. Consider a notification system with 3 delivery channels and 3 formatting options:

<div style="display: flex; gap: 2rem; margin: 2rem 0; flex-wrap: wrap;">
<div style="flex: 1; min-width: 280px; background: linear-gradient(135deg, #ff6b6b22 0%, #ff6b6b11 100%); border: 1px solid #ff6b6b; border-radius: 10px; padding: 1.25rem;">
<h4 style="color: #ff6b6b; margin: 0 0 1rem 0;">Inheritance Approach</h4>
<div style="color: #ccc; font-size: 0.9rem; line-height: 1.6;">
<div style="font-family: monospace; background: #1a1a2e; padding: 0.75rem; border-radius: 6px; margin-bottom: 0.75rem;">
        Notifier (base)<br>
        EmailNotifier<br>
        SMSNotifier<br>
        SlackNotifier<br>
        HTMLEmailNotifier<br>
        PlainTextEmailNotifier<br>
        HTMLSMSNotifier<br>
        ... (3 x 3 = 9 classes minimum)
</div>
<div style="color: #ff6b6b;">Classes grow multiplicatively: O(n * m * k)</div>
</div>
</div>
<div style="flex: 1; min-width: 280px; background: linear-gradient(135deg, #4ecdc422 0%, #4ecdc411 100%); border: 1px solid #4ecdc4; border-radius: 10px; padding: 1.25rem;">
<h4 style="color: #4ecdc4; margin: 0 0 1rem 0;">Decorator Approach</h4>
<div style="color: #ccc; font-size: 0.9rem; line-height: 1.6;">
<div style="font-family: monospace; background: #1a1a2e; padding: 0.75rem; border-radius: 6px; margin-bottom: 0.75rem;">
        Notifier (interface)<br>
        BaseNotifier<br>
        EmailDecorator<br>
        SMSDecorator<br>
        HTMLFormatterDecorator<br>
        ... (3 + 3 = 6 classes total)
</div>
<div style="color: #4ecdc4;">Classes grow additively: O(n + m + k)</div>
</div>
</div>
</div>

### Internal Mechanics: How Delegation Chains Work

```python
from abc import ABC, abstractmethod
from typing import Protocol, runtime_checkable

@runtime_checkable
class DataSource(Protocol):
    """Component interface - defines the contract all participants must follow."""
    def write_data(self, data: str) -> None: ...
    def read_data(self) -> str: ...


class FileDataSource:
    """Concrete component - the core object being decorated."""

    def __init__(self, filename: str):
        self._filename = filename
        self._data = ""

    def write_data(self, data: str) -> None:
        # In production: actual file I/O
        self._data = data
        print(f"[FileDataSource] Writing {len(data)} bytes to {self._filename}")

    def read_data(self) -> str:
        print(f"[FileDataSource] Reading from {self._filename}")
        return self._data


class DataSourceDecorator(ABC):
    """
    Base decorator - maintains reference to wrapped component.

    CRITICAL DESIGN DECISION: The decorator stores a reference to the
    Component INTERFACE, not a concrete class. This enables decorators
    to wrap other decorators transparently.
    """

    def __init__(self, source: DataSource):
        # Protected member - accessible to subclass decorators
        self._wrapped: DataSource = source

    def write_data(self, data: str) -> None:
        # Default: pure delegation (no-op decorator)
        self._wrapped.write_data(data)

    def read_data(self) -> str:
        return self._wrapped.read_data()


class EncryptionDecorator(DataSourceDecorator):
    """Adds encryption behavior before delegation."""

    def __init__(self, source: DataSource, key: str):
        super().__init__(source)
        self._key = key

    def write_data(self, data: str) -> None:
        # PRE-PROCESSING: Transform data before passing down
        encrypted = self._encrypt(data)
        print(f"[EncryptionDecorator] Encrypted {len(data)} -> {len(encrypted)} bytes")
        self._wrapped.write_data(encrypted)

    def read_data(self) -> str:
        # POST-PROCESSING: Transform data after receiving from chain
        data = self._wrapped.read_data()
        decrypted = self._decrypt(data)
        print(f"[EncryptionDecorator] Decrypted {len(data)} -> {len(decrypted)} bytes")
        return decrypted

    def _encrypt(self, data: str) -> str:
        # Simplified XOR encryption for demonstration
        return ''.join(chr(ord(c) ^ ord(self._key[i % len(self._key)]))
                       for i, c in enumerate(data))

    def _decrypt(self, data: str) -> str:
        return self._encrypt(data)  # XOR is symmetric


class CompressionDecorator(DataSourceDecorator):
    """Adds compression behavior."""

    def __init__(self, source: DataSource, level: int = 6):
        super().__init__(source)
        self._level = level

    def write_data(self, data: str) -> None:
        import zlib
        compressed = zlib.compress(data.encode(), self._level)
        print(f"[CompressionDecorator] Compressed {len(data)} -> {len(compressed)} bytes")
        # Store as hex string for compatibility
        self._wrapped.write_data(compressed.hex())

    def read_data(self) -> str:
        import zlib
        data = self._wrapped.read_data()
        decompressed = zlib.decompress(bytes.fromhex(data)).decode()
        print(f"[CompressionDecorator] Decompressed {len(data)} -> {len(decompressed)} bytes")
        return decompressed
```

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #ffd93d;">
<h4 style="color: #ffd93d; margin: 0 0 0.75rem 0;">Key Assumption</h4>
<p style="color: #eee; margin: 0; line-height: 1.6;">The Decorator pattern assumes <strong>interface stability</strong>. All decorators must implement the complete Component interface. Adding methods to the interface requires updating ALL decorators - a significant maintenance cost that inheritance avoids through method inheritance.</p>
</div>

### Trade-off Analysis

| Dimension | Inheritance | Decorator |
|-----------|-------------|-----------|
| **Binding Time** | Compile-time (static) | Runtime (dynamic) |
| **Behavior Modification** | Must subclass | Wrap existing objects |
| **Multiple Behaviors** | Multiple inheritance issues | Stack decorators freely |
| **Memory Overhead** | Single object | Object per decorator layer |
| **Method Access** | Direct access to protected members | Only interface methods visible |
| **Type Identity** | `isinstance()` reliable | May need `unwrap()` utilities |
| **Debugging** | Single class to inspect | Chain of objects to traverse |

### Interview Questions - Level 1 (Foundation)

**Q1.1: Why would you choose Decorator over creating a subclass?**

*Expected Answer:* Use Decorator when:
- Behaviors need to be added/removed at runtime
- You need arbitrary combinations without class explosion
- You're working with third-party classes you can't subclass
- The Single Responsibility Principle demands separation of concerns

**Q1.2: What's the fundamental structural requirement for Decorator to work?**

*Expected Answer:* Both the decorator and the component must share the same interface. The decorator holds a reference to a Component (not a ConcreteComponent), enabling it to wrap either concrete components or other decorators transparently.

### Interview Questions - Level 2 (Mechanics)

**Q2.1: How does a decorator chain handle method calls internally?**

*Expected Answer:* Each decorator receives the call, optionally performs pre-processing, delegates to its wrapped component (which may be another decorator), receives the result, optionally performs post-processing, and returns. This creates a pipeline where:
- Write operations process data "outside-in" (outermost decorator first)
- Read operations process data "inside-out" (innermost component first, then decorators transform the result)

**Q2.2: A decorator adds logging. Another adds caching. Does order matter?**

*Expected Answer:* Yes, critically. If Logging wraps Caching: logs show cache hits/misses. If Caching wraps Logging: cache may return stale logged values, and you won't see logs for cached calls. Order determines which behaviors see which data.

### Interview Questions - Level 3 (Edge Cases & Design)

**Q3.1: How do you handle decorator-specific methods that aren't in the Component interface?**

*Expected Answer:* This is a fundamental tension. Options:
1. **Visitor pattern**: External object that knows about specific decorator types
2. **Type checking with unwrapping**: `while hasattr(obj, '_wrapped'): if isinstance(obj, SpecificDecorator): ...`
3. **Extended interface**: Define a richer interface that includes optional capabilities
4. **Avoid it**: Design decorators to only add behavior within interface method calls

The cleanest solution often is ensuring all interactions happen through the Component interface, accepting that decorators are transparent wrappers.

**Q3.2: A teammate argues that a Decorator holding state (like a cache) violates the pattern. Are they correct?**

*Expected Answer:* No, but it requires careful design. Stateful decorators are valid and common (caching, rate limiting, circuit breakers). The concerns are:
- **Thread safety**: The state must be synchronized if shared
- **Lifecycle management**: State may need clearing/resetting
- **Testing**: Stateful decorators are harder to test in isolation
- **Memory leaks**: Long-lived decorators with unbounded state

The pattern doesn't prohibit state; it just focuses on interface conformance and delegation.

---

## Section 2: Decorator Stacking - Order, Composition, and Complexity

### The Mathematics of Decorator Ordering

With `n` decorators, there are `n!` (factorial) possible orderings. Each ordering may produce different behavior depending on whether decorators:
- Transform input before delegation (pre-processing)
- Transform output after delegation (post-processing)
- Short-circuit the chain conditionally
- Maintain internal state that affects subsequent calls

<div style="display: flex; flex-direction: column; gap: 1rem; margin: 2rem 0;">
<div style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); border-radius: 10px; padding: 1rem; color: white;">
<div style="font-weight: 700; margin-bottom: 0.5rem;">Decorator Stack: Compression -> Encryption -> FileSource</div>
<div style="font-family: monospace; font-size: 0.85rem;">
      write("Hello") -> compress("Hello") -> encrypt(compressed) -> store(encrypted)
</div>
</div>
<div style="text-align: center; color: #888; font-size: 1.5rem;">vs</div>
<div style="background: linear-gradient(90deg, #11998e 0%, #38ef7d 100%); border-radius: 10px; padding: 1rem; color: white;">
<div style="font-weight: 700; margin-bottom: 0.5rem;">Decorator Stack: Encryption -> Compression -> FileSource</div>
<div style="font-family: monospace; font-size: 0.85rem;">
      write("Hello") -> encrypt("Hello") -> compress(encrypted) -> store(compressed)
</div>
</div>
</div>

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #e94560;">
<h4 style="color: #e94560; margin: 0 0 0.75rem 0;">Critical Insight: Compression + Encryption Order</h4>
<p style="color: #eee; margin: 0; line-height: 1.6;">Compress-then-encrypt is generally correct because compression finds patterns in plaintext. Encrypted data appears random and doesn't compress well. Encrypt-then-compress wastes CPU cycles and may even increase size. This is why the order in decorator chains has <strong>real-world security and performance implications</strong>.</p>
</div>

### Implementing Robust Stacking

```python
from typing import List, Callable, TypeVar, Generic
from functools import wraps
import time

T = TypeVar('T')

class Request:
    def __init__(self, path: str, method: str, body: dict = None, headers: dict = None):
        self.path = path
        self.method = method
        self.body = body or {}
        self.headers = headers or {}
        self.context: dict = {}  # Decorators can add metadata here

class Response:
    def __init__(self, status: int, body: dict = None, headers: dict = None):
        self.status = status
        self.body = body or {}
        self.headers = headers or {}

# Type alias for handlers
Handler = Callable[[Request], Response]
Middleware = Callable[[Handler], Handler]


def logging_middleware(logger_name: str = "app") -> Middleware:
    """
    Creates a logging decorator that wraps handlers.
    Demonstrates: factory pattern for configurable decorators.
    """
    def decorator(handler: Handler) -> Handler:
        @wraps(handler)
        def wrapper(request: Request) -> Response:
            start = time.perf_counter()
            print(f"[{logger_name}] -> {request.method} {request.path}")

            response = handler(request)

            elapsed = (time.perf_counter() - start) * 1000
            print(f"[{logger_name}] <- {response.status} ({elapsed:.2f}ms)")
            return response
        return wrapper
    return decorator


def authentication_middleware(secret_key: str) -> Middleware:
    """
    Validates authentication before allowing request through.
    Demonstrates: short-circuit behavior in decorator chain.
    """
    def decorator(handler: Handler) -> Handler:
        @wraps(handler)
        def wrapper(request: Request) -> Response:
            token = request.headers.get("Authorization", "")

            if not token.startswith("Bearer "):
                # SHORT-CIRCUIT: Never calls the wrapped handler
                return Response(401, {"error": "Missing bearer token"})

            # Simplified validation
            if token != f"Bearer {secret_key}":
                return Response(403, {"error": "Invalid token"})

            # Add user info to request context for downstream use
            request.context["authenticated"] = True
            request.context["user_id"] = "user_123"

            return handler(request)
        return wrapper
    return decorator


def rate_limit_middleware(max_requests: int, window_seconds: int) -> Middleware:
    """
    Stateful decorator that tracks request counts.
    Demonstrates: shared mutable state across invocations.
    """
    request_counts: dict[str, list[float]] = {}

    def decorator(handler: Handler) -> Handler:
        @wraps(handler)
        def wrapper(request: Request) -> Response:
            client_ip = request.headers.get("X-Forwarded-For", "unknown")
            now = time.time()

            # Clean old entries and count recent requests
            if client_ip not in request_counts:
                request_counts[client_ip] = []

            request_counts[client_ip] = [
                ts for ts in request_counts[client_ip]
                if now - ts < window_seconds
            ]

            if len(request_counts[client_ip]) >= max_requests:
                return Response(429, {
                    "error": "Rate limit exceeded",
                    "retry_after": window_seconds
                })

            request_counts[client_ip].append(now)
            return handler(request)
        return wrapper
    return decorator


def caching_middleware(ttl_seconds: int) -> Middleware:
    """
    Caches responses for GET requests.
    Demonstrates: conditional behavior based on request properties.
    """
    cache: dict[str, tuple[Response, float]] = {}

    def decorator(handler: Handler) -> Handler:
        @wraps(handler)
        def wrapper(request: Request) -> Response:
            # Only cache GET requests
            if request.method != "GET":
                return handler(request)

            cache_key = f"{request.method}:{request.path}"
            now = time.time()

            # Check cache
            if cache_key in cache:
                response, cached_at = cache[cache_key]
                if now - cached_at < ttl_seconds:
                    response.headers["X-Cache"] = "HIT"
                    return response

            # Cache miss - call handler
            response = handler(request)

            # Only cache successful responses
            if 200 <= response.status < 300:
                cache[cache_key] = (response, now)
                response.headers["X-Cache"] = "MISS"

            return response
        return wrapper
    return decorator


# Composing decorators with explicit ordering
def compose_middleware(*middlewares: Middleware) -> Middleware:
    """
    Composes multiple middleware into a single middleware.
    Order: first middleware in list is outermost (runs first on request, last on response).
    """
    def composed(handler: Handler) -> Handler:
        for middleware in reversed(middlewares):
            handler = middleware(handler)
        return handler
    return composed


# Example usage showing order dependency
def user_api_handler(request: Request) -> Response:
    user_id = request.context.get("user_id", "anonymous")
    return Response(200, {"message": f"Hello, {user_id}!"})


# CORRECT ORDER: Rate limit -> Auth -> Cache -> Logging -> Handler
# - Rate limit first: Prevents DoS before expensive auth
# - Auth before cache: Don't cache responses for different users together
# - Cache before logging: Cached responses still get logged
# - Logging innermost: Accurate timing of actual handler execution

pipeline = compose_middleware(
    rate_limit_middleware(100, 60),
    authentication_middleware("secret123"),
    caching_middleware(300),
    logging_middleware("api"),
)

decorated_handler = pipeline(user_api_handler)
```

### The Unwrapping Problem

When decorators are stacked, you sometimes need to access the underlying component or a specific decorator in the chain.

```python
class DecoratorChainMixin:
    """
    Mixin providing chain introspection capabilities.
    Trade-off: Adds coupling but enables debugging and testing.
    """

    def get_wrapped(self):
        """Returns the immediately wrapped component."""
        return getattr(self, '_wrapped', None)

    def unwrap_all(self):
        """Returns the innermost concrete component."""
        current = self
        while hasattr(current, '_wrapped'):
            current = current._wrapped
        return current

    def find_decorator(self, decorator_type: type):
        """Finds a specific decorator type in the chain."""
        current = self
        while current is not None:
            if isinstance(current, decorator_type):
                return current
            current = getattr(current, '_wrapped', None)
        return None

    def get_chain_depth(self) -> int:
        """Returns the number of decorators in the chain."""
        depth = 0
        current = self
        while hasattr(current, '_wrapped'):
            depth += 1
            current = current._wrapped
        return depth
```

### Interview Questions - Level 1 (Foundation)

**Q1.1: Given decorators A, B, C, if you write `A(B(C(component)))`, what's the execution order?**

*Expected Answer:* On a method call:
1. A's pre-processing runs first
2. A delegates to B
3. B's pre-processing runs
4. B delegates to C
5. C's pre-processing runs
6. C delegates to component
7. Component executes and returns
8. C's post-processing runs on result
9. B's post-processing runs
10. A's post-processing runs and returns final result

Request flows "inward" (A->B->C->component), response flows "outward" (component->C->B->A).

**Q1.2: Why would you need to unwrap a decorator chain?**

*Expected Answer:* Common reasons include:
- Debugging: Inspecting internal state of specific decorators
- Testing: Verifying decorator configuration
- Serialization: Serializing only the core component
- Identity checks: Comparing underlying components
- Dynamic reconfiguration: Adding/removing decorators at runtime

### Interview Questions - Level 2 (Mechanics)

**Q2.1: How would you implement a "once-only" decorator that executes the wrapped method only on the first call?**

*Expected Answer:*
```python
class OnceOnlyDecorator(Decorator):
    def __init__(self, wrapped):
        super().__init__(wrapped)
        self._executed = False
        self._cached_result = None

    def operation(self):
        if not self._executed:
            self._cached_result = self._wrapped.operation()
            self._executed = True
        return self._cached_result
```

Key considerations: Thread safety (use Lock), memory management (consider WeakRef for cached_result if large), reset capability.

**Q2.2: Two decorators both modify the same header field. How do you handle conflicts?**

*Expected Answer:* Options include:
1. **Last-write-wins**: Accept that outer decorators override inner ones
2. **Merge strategy**: Define how values combine (e.g., append for arrays)
3. **Namespace headers**: Each decorator uses prefixed headers (X-RateLimit-*, X-Cache-*)
4. **Priority system**: Decorators declare priority, highest priority wins
5. **Validation layer**: Final decorator validates header consistency

The decorator pattern doesn't solve this; it's an architectural decision.

### Interview Questions - Level 3 (Edge Cases & Design)

**Q3.1: How do you test a decorator that depends on decorators above it in the chain?**

*Expected Answer:* Integration testing challenge. Strategies:
1. **Mock the wrapped component**: Test decorator in isolation with mock that returns controlled responses
2. **Context injection**: Use request.context pattern so decorators can communicate without tight coupling
3. **Dependency injection**: Decorator accepts dependencies explicitly rather than assuming chain position
4. **Contract testing**: Define interface contracts that decorators must satisfy
5. **Chain builder helpers**: Factory that builds valid chains for testing

```python
# Example: Testing auth decorator that needs rate limit info
def test_auth_with_rate_limit_context():
    mock_handler = Mock(return_value=Response(200, {}))

    # Simulate rate limit decorator having run
    request = Request("/api", "GET")
    request.context["rate_limit_remaining"] = 50

    auth_decorated = authentication_middleware("secret")(mock_handler)
    # ... test assertions
```

**Q3.2: A decorator stack has 10 layers. Performance is degrading. How do you diagnose and fix?**

*Expected Answer:* Diagnosis:
1. **Profile the chain**: Measure time in each decorator
2. **Check for O(n^2) patterns**: Each decorator iterating the full chain
3. **Memory pressure**: Object allocations per request
4. **Lock contention**: Stateful decorators with shared locks

Fixes:
1. **Flatten common combinations**: Create specialized composite decorators
2. **Short-circuit patterns**: Early-exit decorators should be outermost
3. **Lazy evaluation**: Don't process until necessary
4. **Object pooling**: Reuse decorator instances where safe
5. **Reduce chain depth**: Question if all 10 layers are necessary

See also: [[Composite Pattern]](/topic/design-patterns/composite) for flattening hierarchies.

---

## Section 3: I/O Streams - The Classic Decorator Application

### Java's I/O Design Philosophy

Java's `java.io` package is the canonical real-world Decorator implementation. The design enables mixing and matching stream behaviors:

<div style="display: flex; flex-direction: column; gap: 0.5rem; margin: 2rem 0; font-family: monospace; font-size: 0.9rem;">
<div style="display: flex; align-items: center; gap: 1rem;">
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 0.75rem 1.5rem; border-radius: 8px; color: white; min-width: 200px; text-align: center;">InputStream</div>
<div style="color: #888; flex: 1;">Abstract component - defines read(), close(), available()</div>
</div>
<div style="display: flex; align-items: center; gap: 1rem; padding-left: 2rem;">
<div style="width: 2px; height: 20px; background: #667eea;"></div>
</div>
<div style="display: flex; align-items: center; gap: 1rem; padding-left: 2rem;">
<div style="background: #1e3a5f; border: 2px solid #4ecdc4; padding: 0.75rem 1.5rem; border-radius: 8px; color: #4ecdc4; min-width: 200px; text-align: center;">FileInputStream</div>
<div style="color: #888; flex: 1;">Concrete component - reads from file</div>
</div>
<div style="display: flex; align-items: center; gap: 1rem; padding-left: 2rem;">
<div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 0.75rem 1.5rem; border-radius: 8px; color: white; min-width: 200px; text-align: center;">FilterInputStream</div>
<div style="color: #888; flex: 1;">Abstract decorator base - wraps any InputStream</div>
</div>
<div style="display: flex; align-items: center; gap: 1rem; padding-left: 4rem;">
<div style="width: 2px; height: 20px; background: #38ef7d;"></div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 0.75rem; padding-left: 4rem;">
<div style="background: #1a1a2e; border: 2px solid #f093fb; padding: 0.5rem 1rem; border-radius: 6px; color: #f093fb;">BufferedInputStream</div>
<div style="background: #1a1a2e; border: 2px solid #ffd93d; padding: 0.5rem 1rem; border-radius: 6px; color: #ffd93d;">DataInputStream</div>
<div style="background: #1a1a2e; border: 2px solid #74b9ff; padding: 0.5rem 1rem; border-radius: 6px; color: #74b9ff;">GZIPInputStream</div>
<div style="background: #1a1a2e; border: 2px solid #a29bfe; padding: 0.5rem 1rem; border-radius: 6px; color: #a29bfe;">CipherInputStream</div>
</div>
</div>

### Python Implementation with Real-World Concerns

```python
from abc import ABC, abstractmethod
from typing import Optional, Iterator
import io
import gzip
import hashlib
import threading
from contextlib import contextmanager


class Stream(ABC):
    """
    Component interface for streams.

    Design Decision: Using context manager protocol for resource safety.
    All streams MUST be used with 'with' statements or explicitly closed.
    """

    @abstractmethod
    def read(self, size: int = -1) -> bytes:
        """Read up to size bytes. Returns empty bytes at EOF."""
        pass

    @abstractmethod
    def write(self, data: bytes) -> int:
        """Write data, return bytes written."""
        pass

    @abstractmethod
    def close(self) -> None:
        """Release resources."""
        pass

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()
        return False  # Don't suppress exceptions


class FileStream(Stream):
    """Concrete component: File-based stream."""

    def __init__(self, path: str, mode: str = 'rb'):
        self._path = path
        self._mode = mode
        self._file: Optional[io.BufferedIOBase] = None
        self._closed = False

    def _ensure_open(self):
        if self._closed:
            raise ValueError("I/O operation on closed stream")
        if self._file is None:
            self._file = open(self._path, self._mode)

    def read(self, size: int = -1) -> bytes:
        self._ensure_open()
        return self._file.read(size)

    def write(self, data: bytes) -> int:
        self._ensure_open()
        return self._file.write(data)

    def close(self) -> None:
        if not self._closed:
            if self._file:
                self._file.close()
            self._closed = True


class MemoryStream(Stream):
    """Concrete component: In-memory stream for testing."""

    def __init__(self, initial_data: bytes = b''):
        self._buffer = io.BytesIO(initial_data)
        self._closed = False

    def read(self, size: int = -1) -> bytes:
        if self._closed:
            raise ValueError("I/O operation on closed stream")
        return self._buffer.read(size)

    def write(self, data: bytes) -> int:
        if self._closed:
            raise ValueError("I/O operation on closed stream")
        return self._buffer.write(data)

    def close(self) -> None:
        self._closed = True

    def get_value(self) -> bytes:
        """Testing helper: get all written data."""
        pos = self._buffer.tell()
        self._buffer.seek(0)
        data = self._buffer.read()
        self._buffer.seek(pos)
        return data


class StreamDecorator(Stream):
    """
    Base decorator providing delegation and resource management.

    CRITICAL: Decorators must properly delegate close() to avoid resource leaks.
    The chain of responsibility for cleanup flows inward to the concrete component.
    """

    def __init__(self, wrapped: Stream):
        self._wrapped = wrapped

    def read(self, size: int = -1) -> bytes:
        return self._wrapped.read(size)

    def write(self, data: bytes) -> int:
        return self._wrapped.write(data)

    def close(self) -> None:
        # Delegate close to wrapped stream
        self._wrapped.close()


class BufferedStream(StreamDecorator):
    """
    Adds buffering to reduce system calls.

    Trade-off: Memory usage vs I/O performance.
    Default 8KB buffer matches typical filesystem block sizes.
    """

    def __init__(self, wrapped: Stream, buffer_size: int = 8192):
        super().__init__(wrapped)
        self._buffer_size = buffer_size
        self._read_buffer = b''
        self._write_buffer = b''

    def read(self, size: int = -1) -> bytes:
        if size == -1:
            # Read all: empty buffer + read rest
            result = self._read_buffer + self._wrapped.read(-1)
            self._read_buffer = b''
            return result

        # Read from buffer first
        while len(self._read_buffer) < size:
            chunk = self._wrapped.read(self._buffer_size)
            if not chunk:
                break
            self._read_buffer += chunk

        result = self._read_buffer[:size]
        self._read_buffer = self._read_buffer[size:]
        return result

    def write(self, data: bytes) -> int:
        self._write_buffer += data
        written = 0

        # Flush when buffer exceeds threshold
        while len(self._write_buffer) >= self._buffer_size:
            chunk = self._write_buffer[:self._buffer_size]
            self._wrapped.write(chunk)
            self._write_buffer = self._write_buffer[self._buffer_size:]
            written += len(chunk)

        return len(data)  # Report bytes accepted, not flushed

    def flush(self) -> None:
        """Force write buffer to underlying stream."""
        if self._write_buffer:
            self._wrapped.write(self._write_buffer)
            self._write_buffer = b''

    def close(self) -> None:
        self.flush()  # CRITICAL: Flush before close
        super().close()


class CompressingStream(StreamDecorator):
    """
    Adds gzip compression.

    Complexity: Compression is stateful - the compressor maintains
    dictionary state across writes. Final flush is required.
    """

    def __init__(self, wrapped: Stream, level: int = 6):
        super().__init__(wrapped)
        self._level = level
        self._compressor = None
        self._decompressor = None

    def write(self, data: bytes) -> int:
        if self._compressor is None:
            self._compressor = gzip.GzipFile(
                fileobj=_WritableWrapper(self._wrapped),
                mode='wb',
                compresslevel=self._level
            )
        self._compressor.write(data)
        return len(data)

    def read(self, size: int = -1) -> bytes:
        if self._decompressor is None:
            self._decompressor = gzip.GzipFile(
                fileobj=_ReadableWrapper(self._wrapped),
                mode='rb'
            )
        return self._decompressor.read(size)

    def close(self) -> None:
        if self._compressor:
            self._compressor.close()
        if self._decompressor:
            self._decompressor.close()
        super().close()


class _WritableWrapper:
    """Adapter to make Stream compatible with gzip.GzipFile."""
    def __init__(self, stream: Stream):
        self._stream = stream
    def write(self, data: bytes) -> int:
        return self._stream.write(data)
    def flush(self): pass


class _ReadableWrapper:
    """Adapter to make Stream compatible with gzip.GzipFile."""
    def __init__(self, stream: Stream):
        self._stream = stream
    def read(self, size: int = -1) -> bytes:
        return self._stream.read(size)


class HashingStream(StreamDecorator):
    """
    Computes hash while streaming data through.

    Use case: Verify data integrity without loading entire file into memory.
    Common in: Download verification, backup integrity, content addressing.
    """

    def __init__(self, wrapped: Stream, algorithm: str = 'sha256'):
        super().__init__(wrapped)
        self._hasher = hashlib.new(algorithm)
        self._algorithm = algorithm

    def read(self, size: int = -1) -> bytes:
        data = self._wrapped.read(size)
        self._hasher.update(data)
        return data

    def write(self, data: bytes) -> int:
        self._hasher.update(data)
        return self._wrapped.write(data)

    def get_hash(self) -> str:
        """Returns hex digest of all data that passed through."""
        return self._hasher.hexdigest()

    def reset_hash(self) -> None:
        """Reset hash state for new computation."""
        self._hasher = hashlib.new(self._algorithm)


class ProgressStream(StreamDecorator):
    """
    Reports progress during I/O operations.

    Real-world use: Progress bars, upload/download indicators.
    """

    def __init__(self, wrapped: Stream, total_size: int,
                 callback: callable = None):
        super().__init__(wrapped)
        self._total = total_size
        self._processed = 0
        self._callback = callback or self._default_callback

    def _default_callback(self, processed: int, total: int):
        percent = (processed / total * 100) if total > 0 else 0
        print(f"\rProgress: {processed}/{total} bytes ({percent:.1f}%)", end='')

    def read(self, size: int = -1) -> bytes:
        data = self._wrapped.read(size)
        self._processed += len(data)
        self._callback(self._processed, self._total)
        return data

    def write(self, data: bytes) -> int:
        result = self._wrapped.write(data)
        self._processed += len(data)
        self._callback(self._processed, self._total)
        return result


# Real-world composition example
def create_upload_stream(path: str, file_size: int) -> tuple[Stream, HashingStream]:
    """
    Creates a stream stack for file upload with:
    - Progress reporting
    - Integrity hashing
    - Compression
    - Buffering

    Returns the outer stream and the hashing stream (to retrieve hash later).
    """
    file_stream = FileStream(path, 'rb')
    buffered = BufferedStream(file_stream, buffer_size=65536)  # 64KB buffer
    hashing = HashingStream(buffered)
    compressed = CompressingStream(hashing, level=6)
    progress = ProgressStream(compressed, file_size)

    return progress, hashing


# Usage
# outer_stream, hasher = create_upload_stream('/path/to/file', file_size)
# with outer_stream:
#     while chunk := outer_stream.read(8192):
#         network.send(chunk)
# print(f"\nFile hash: {hasher.get_hash()}")
```

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #e94560;">
<h4 style="color: #e94560; margin: 0 0 0.75rem 0;">Resource Management Warning</h4>
<p style="color: #eee; margin: 0; line-height: 1.6;">Stream decorators MUST propagate <code>close()</code> calls down the chain. Failure to do so causes resource leaks (file handles, network connections). In languages without deterministic destruction, always use try-finally or context managers. Java's try-with-resources and Python's context managers are designed specifically for this pattern.</p>
</div>

### Interview Questions - Level 1 (Foundation)

**Q1.1: Why does Java use `FilterInputStream` as the decorator base instead of just extending `InputStream`?**

*Expected Answer:* `FilterInputStream` provides default delegation behavior, reducing boilerplate. Each concrete decorator only overrides methods it modifies. Without it, every decorator would need to implement all ~10 InputStream methods with delegation code.

**Q1.2: What happens if you forget to close a BufferedOutputStream in Java?**

*Expected Answer:* Data remaining in the buffer is lost. The buffer may not be flushed to the underlying stream, causing incomplete writes. This is why `flush()` must be called before `close()`, and why try-with-resources is essential.

### Interview Questions - Level 2 (Mechanics)

**Q2.1: How does `BufferedInputStream.mark()` and `reset()` work with decorator chaining?**

*Expected Answer:* `BufferedInputStream` overrides `mark()` to remember position in its buffer and `reset()` to return to that position. However, it can only reset within the buffer bounds. If you read past the `markLimit`, the mark becomes invalid.

The complexity: if another decorator wraps BufferedInputStream, mark/reset semantics depend entirely on BufferedInputStream's buffer - outer decorators can't extend the mark capability.

**Q2.2: Design a decorator that limits total bytes read (quota enforcement). What edge cases must you handle?**

*Expected Answer:*
```python
class QuotaStream(StreamDecorator):
    def __init__(self, wrapped: Stream, max_bytes: int):
        super().__init__(wrapped)
        self._remaining = max_bytes

    def read(self, size: int = -1) -> bytes:
        if self._remaining <= 0:
            return b''  # Quota exhausted, simulate EOF

        # Limit read size to remaining quota
        actual_size = min(size, self._remaining) if size > 0 else self._remaining
        data = self._wrapped.read(actual_size)
        self._remaining -= len(data)
        return data
```

Edge cases:
- `size=-1` (read all): Must limit to remaining quota
- Empty reads at quota boundary vs actual EOF
- Thread safety if shared across threads
- Quota accounting for failed reads (if underlying stream throws)

### Interview Questions - Level 3 (Edge Cases & Design)

**Q3.1: You're debugging: data written through Compression->Encryption->File appears corrupted. How do you diagnose?**

*Expected Answer:* Systematic approach:
1. **Isolate layers**: Test each decorator independently with known inputs
2. **Verify order**: Compression->Encryption writes compressed-then-encrypted; reading must Decrypt->Decompress (reverse order)
3. **Check flush/close**: Compression maintains state; incomplete flush corrupts data
4. **Buffer boundaries**: Encryption block sizes (16 bytes for AES) may not align with compression output
5. **Add diagnostic layer**: Insert a TeeStream that writes to a debug file before encryption

Common causes:
- Flush not called before close
- Read path doesn't reverse write path order
- Partial block handling in encryption

**Q3.2: How would you make stream decorators work with async I/O?**

*Expected Answer:* Fundamental redesign needed:
```python
class AsyncStream(ABC):
    @abstractmethod
    async def read(self, size: int = -1) -> bytes: ...

    @abstractmethod
    async def write(self, data: bytes) -> int: ...

class AsyncBufferedStream(AsyncStreamDecorator):
    async def read(self, size: int = -1) -> bytes:
        # Buffer management same as sync
        while len(self._buffer) < size:
            chunk = await self._wrapped.read(self._buffer_size)  # Await!
            if not chunk:
                break
            self._buffer += chunk
        # ...
```

Challenges:
- Can't mix sync and async decorators transparently
- Cancellation must propagate through chain
- Backpressure handling changes
- Testing requires async test frameworks

See also: [[Async Patterns]](/topic/concurrency/async-await) for async composition strategies.

---

## Section 4: Middleware Pattern - Decorators in Web Frameworks

### Middleware as Request/Response Decoration

Web framework middleware is the Decorator pattern applied to HTTP handling. Each middleware wraps the next handler, creating a pipeline.

<div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin: 2rem 0; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 0.75rem 1rem; border-radius: 8px; color: white; font-size: 0.85rem;">Request</div>
<div style="color: #667eea; font-size: 1.5rem;">-></div>
<div style="background: #1a1a2e; border: 2px solid #f093fb; padding: 0.5rem 0.75rem; border-radius: 6px; color: #f093fb; font-size: 0.8rem;">Logging</div>
<div style="color: #888;">-></div>
<div style="background: #1a1a2e; border: 2px solid #ffd93d; padding: 0.5rem 0.75rem; border-radius: 6px; color: #ffd93d; font-size: 0.8rem;">Auth</div>
<div style="color: #888;">-></div>
<div style="background: #1a1a2e; border: 2px solid #74b9ff; padding: 0.5rem 0.75rem; border-radius: 6px; color: #74b9ff; font-size: 0.8rem;">RateLimit</div>
<div style="color: #888;">-></div>
<div style="background: #1a1a2e; border: 2px solid #a29bfe; padding: 0.5rem 0.75rem; border-radius: 6px; color: #a29bfe; font-size: 0.8rem;">CORS</div>
<div style="color: #888;">-></div>
<div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 0.75rem 1rem; border-radius: 8px; color: white; font-size: 0.85rem;">Handler</div>
<div style="color: #38ef7d; font-size: 1.5rem;">-></div>
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 0.75rem 1rem; border-radius: 8px; color: white; font-size: 0.85rem;">Response</div>
</div>

### Go Implementation with Real-World Patterns

```go
package main

import (
    "context"
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "runtime/debug"
    "sync"
    "time"
)

// ContextKey type for type-safe context values
type ContextKey string

const (
    RequestIDKey   ContextKey = "request_id"
    UserKey        ContextKey = "user"
    StartTimeKey   ContextKey = "start_time"
)

// Middleware signature - takes handler, returns handler
type Middleware func(http.Handler) http.Handler

// ChainMiddleware composes middleware in order (first runs first)
func ChainMiddleware(middlewares ...Middleware) Middleware {
    return func(final http.Handler) http.Handler {
        // Apply in reverse so first middleware is outermost
        for i := len(middlewares) - 1; i >= 0; i-- {
            final = middlewares[i](final)
        }
        return final
    }
}

// RequestIDMiddleware adds unique ID to each request
// Demonstrates: Adding context to requests for tracing
func RequestIDMiddleware(generator func() string) Middleware {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            requestID := r.Header.Get("X-Request-ID")
            if requestID == "" {
                requestID = generator()
            }

            // Add to context for downstream middleware/handlers
            ctx := context.WithValue(r.Context(), RequestIDKey, requestID)

            // Add to response headers for client correlation
            w.Header().Set("X-Request-ID", requestID)

            next.ServeHTTP(w, r.WithContext(ctx))
        })
    }
}

// LoggingMiddleware logs request details
// Demonstrates: Capturing both request and response information
func LoggingMiddleware(logger *log.Logger) Middleware {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            start := time.Now()

            // Wrap ResponseWriter to capture status code
            wrapped := &responseWrapper{ResponseWriter: w, statusCode: http.StatusOK}

            // Store start time in context for other middleware
            ctx := context.WithValue(r.Context(), StartTimeKey, start)

            requestID, _ := r.Context().Value(RequestIDKey).(string)
            logger.Printf("[%s] -> %s %s", requestID, r.Method, r.URL.Path)

            next.ServeHTTP(wrapped, r.WithContext(ctx))

            duration := time.Since(start)
            logger.Printf("[%s] <- %d %s (%v)",
                requestID, wrapped.statusCode, http.StatusText(wrapped.statusCode), duration)
        })
    }
}

type responseWrapper struct {
    http.ResponseWriter
    statusCode int
    written    bool
}

func (w *responseWrapper) WriteHeader(code int) {
    if !w.written {
        w.statusCode = code
        w.written = true
    }
    w.ResponseWriter.WriteHeader(code)
}

func (w *responseWrapper) Write(b []byte) (int, error) {
    if !w.written {
        w.written = true
    }
    return w.ResponseWriter.Write(b)
}

// RecoveryMiddleware catches panics and returns 500
// Demonstrates: Short-circuit on exceptional conditions
func RecoveryMiddleware(logger *log.Logger) Middleware {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            defer func() {
                if err := recover(); err != nil {
                    requestID, _ := r.Context().Value(RequestIDKey).(string)

                    // Log the panic with stack trace
                    logger.Printf("[%s] PANIC: %v\n%s", requestID, err, debug.Stack())

                    // Return generic error to client (don't leak internals)
                    w.Header().Set("Content-Type", "application/json")
                    w.WriteHeader(http.StatusInternalServerError)
                    json.NewEncoder(w).Encode(map[string]string{
                        "error":      "Internal server error",
                        "request_id": requestID,
                    })
                }
            }()

            next.ServeHTTP(w, r)
        })
    }
}

// RateLimitMiddleware implements token bucket rate limiting
// Demonstrates: Stateful middleware with thread-safe shared state
func RateLimitMiddleware(rps int, burst int) Middleware {
    type bucket struct {
        tokens    float64
        lastCheck time.Time
        mu        sync.Mutex
    }

    buckets := make(map[string]*bucket)
    var bucketsLock sync.RWMutex

    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            // Use IP as client identifier (production: use better identification)
            clientIP := r.RemoteAddr

            bucketsLock.RLock()
            b, exists := buckets[clientIP]
            bucketsLock.RUnlock()

            if !exists {
                bucketsLock.Lock()
                b = &bucket{tokens: float64(burst), lastCheck: time.Now()}
                buckets[clientIP] = b
                bucketsLock.Unlock()
            }

            b.mu.Lock()

            // Refill tokens based on time elapsed
            now := time.Now()
            elapsed := now.Sub(b.lastCheck).Seconds()
            b.tokens += elapsed * float64(rps)
            if b.tokens > float64(burst) {
                b.tokens = float64(burst)
            }
            b.lastCheck = now

            if b.tokens < 1 {
                b.mu.Unlock()

                w.Header().Set("Retry-After", "1")
                w.Header().Set("X-RateLimit-Remaining", "0")
                http.Error(w, "Rate limit exceeded", http.StatusTooManyRequests)
                return
            }

            b.tokens--
            remaining := int(b.tokens)
            b.mu.Unlock()

            w.Header().Set("X-RateLimit-Remaining", fmt.Sprintf("%d", remaining))
            next.ServeHTTP(w, r)
        })
    }
}

// TimeoutMiddleware enforces request timeout
// Demonstrates: Context cancellation propagation
func TimeoutMiddleware(timeout time.Duration) Middleware {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            ctx, cancel := context.WithTimeout(r.Context(), timeout)
            defer cancel()

            // Channel to signal handler completion
            done := make(chan struct{})

            go func() {
                next.ServeHTTP(w, r.WithContext(ctx))
                close(done)
            }()

            select {
            case <-done:
                // Handler completed normally
            case <-ctx.Done():
                // Timeout - note: response may be partially written
                // This is a fundamental limitation of HTTP
                w.WriteHeader(http.StatusGatewayTimeout)
            }
        })
    }
}

// CORSMiddleware handles Cross-Origin Resource Sharing
// Demonstrates: Conditional short-circuit (OPTIONS) and header decoration
func CORSMiddleware(allowedOrigins []string) Middleware {
    originSet := make(map[string]bool)
    for _, o := range allowedOrigins {
        originSet[o] = true
    }

    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            origin := r.Header.Get("Origin")

            // Check if origin is allowed
            if originSet[origin] || originSet["*"] {
                w.Header().Set("Access-Control-Allow-Origin", origin)
                w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Request-ID")
                w.Header().Set("Access-Control-Expose-Headers", "X-Request-ID, X-RateLimit-Remaining")
                w.Header().Set("Access-Control-Max-Age", "86400")
            }

            // Handle preflight
            if r.Method == http.MethodOptions {
                w.WriteHeader(http.StatusNoContent)
                return // Short-circuit: don't call next handler
            }

            next.ServeHTTP(w, r)
        })
    }
}

// Usage example
func main() {
    logger := log.Default()

    // Define middleware stack
    stack := ChainMiddleware(
        RecoveryMiddleware(logger),           // Outermost: catch panics
        RequestIDMiddleware(generateUUID),     // Add request ID early
        LoggingMiddleware(logger),             // Log with request ID
        TimeoutMiddleware(30 * time.Second),   // Enforce timeout
        RateLimitMiddleware(100, 10),          // Rate limit
        CORSMiddleware([]string{"https://app.example.com"}),
    )

    // Apply to handlers
    http.Handle("/api/users", stack(http.HandlerFunc(usersHandler)))
    http.Handle("/api/health", stack(http.HandlerFunc(healthHandler)))

    log.Println("Server starting on :8080")
    http.ListenAndServe(":8080", nil)
}

func generateUUID() string {
    // Simplified - use uuid library in production
    return fmt.Sprintf("%d", time.Now().UnixNano())
}

func usersHandler(w http.ResponseWriter, r *http.Request) {
    json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("healthy"))
}
```

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #4ecdc4;">
<h4 style="color: #4ecdc4; margin: 0 0 0.75rem 0;">Design Choice: Handler vs Middleware Responsibility</h4>
<p style="color: #eee; margin: 0; line-height: 1.6;">Middleware should handle <strong>cross-cutting concerns</strong>: authentication, logging, rate limiting, CORS. Business logic belongs in handlers. If you find middleware making business decisions (e.g., "admin users skip rate limits"), consider moving that logic to the handler or introducing a policy layer.</p>
</div>

### Express.js Pattern Comparison

```javascript
// Express middleware follows same decorator pattern
// but with (req, res, next) signature

const express = require('express');
const app = express();

// Middleware order matters - defined top to bottom
app.use(requestIdMiddleware);      // Runs first
app.use(loggingMiddleware);        // Runs second
app.use(authenticationMiddleware); // Runs third
app.use(rateLimitMiddleware);      // Runs fourth

// The 'next()' call is the delegation point
function loggingMiddleware(req, res, next) {
    const start = Date.now();

    // Intercept response finish to log duration
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
    });

    next(); // Delegate to next middleware/handler
}

// Short-circuit example
function authenticationMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!validateToken(token)) {
        // Don't call next() - short-circuit the chain
        return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = decodeToken(token);
    next(); // Continue to next middleware
}
```

### Interview Questions - Level 1 (Foundation)

**Q1.1: What's the difference between middleware and filters?**

*Expected Answer:* Functionally similar, naming varies by framework:
- **Middleware** (Express, Koa, Go): Wraps handlers, controls whether to call next
- **Filters** (Java Servlet, Spring): Same concept, filter chain pattern
- **Interceptors** (Angular, NestJS): Often split into pre/post phases explicitly

All implement the Decorator pattern for HTTP request/response processing.

**Q1.2: Why do most frameworks apply middleware in definition order but decorators wrap inside-out?**

*Expected Answer:* It's the same thing viewed differently:
- Definition order: `[A, B, C, Handler]` means A runs first
- Wrapping order: `A(B(C(Handler)))` - A is outermost, runs first

Frameworks abstract the wrapping, presenting a linear list for developer ergonomics while constructing the decorator chain internally.

### Interview Questions - Level 2 (Mechanics)

**Q2.1: How do you share data between middleware without polluting the request object?**

*Expected Answer:* Options:
1. **Context (Go)**: `context.WithValue()` - type-safe, immutable chain
2. **Locals (Express)**: `res.locals` - mutable, scoped to request
3. **Request attributes (Java)**: `request.setAttribute()` - standard servlet API
4. **AsyncLocalStorage (Node.js)**: Thread-local-like storage for async

Go's context is considered cleanest due to immutability and explicit propagation.

**Q2.2: Timeout middleware can't truly abort a running handler. Why, and how do you mitigate?**

*Expected Answer:* HTTP handlers can't be forcibly interrupted:
- Handler goroutine/thread continues running
- Response may be partially written before timeout
- Database connections may remain open

Mitigations:
1. **Check context**: Handler periodically checks `ctx.Done()`
2. **Database timeouts**: Use context-aware database clients
3. **Response wrapper**: Buffer writes, only flush on success
4. **Circuit breaker**: Track slow handlers, shed load earlier

See also: [[Circuit Breaker Pattern]](/topic/design-patterns/circuit-breaker) for failure handling.

### Interview Questions - Level 3 (Edge Cases & Design)

**Q3.1: Design a middleware that retries failed requests. What problems might occur?**

*Expected Answer:*
```go
func RetryMiddleware(maxRetries int, backoff time.Duration) Middleware {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            // Problem 1: Can't retry if body already consumed
            // Solution: Buffer body first
            body, _ := io.ReadAll(r.Body)

            for attempt := 0; attempt <= maxRetries; attempt++ {
                // Problem 2: Need to intercept response
                recorder := httptest.NewRecorder()
                r.Body = io.NopCloser(bytes.NewReader(body))

                next.ServeHTTP(recorder, r)

                // Problem 3: What errors are retryable?
                if recorder.Code < 500 {
                    // Copy recorded response to actual writer
                    for k, v := range recorder.Header() {
                        w.Header()[k] = v
                    }
                    w.WriteHeader(recorder.Code)
                    w.Write(recorder.Body.Bytes())
                    return
                }

                time.Sleep(backoff * time.Duration(attempt+1))
            }

            http.Error(w, "Service unavailable after retries", 503)
        })
    }
}
```

Problems:
- **Idempotency**: Non-idempotent requests (POST) shouldn't be blindly retried
- **Body consumption**: Request body is a stream, can only read once
- **Memory**: Buffering large bodies is expensive
- **Timing**: Retries may exceed client timeout
- **Duplicate effects**: Partial success before failure

**Q3.2: How would you implement middleware that works with both HTTP/1.1 and HTTP/2 Server Push?**

*Expected Answer:* This exposes a Decorator limitation - HTTP/2 pusher is an optional capability:

```go
func PushMiddleware(assets []string) Middleware {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            // Check if underlying connection supports push
            if pusher, ok := w.(http.Pusher); ok {
                for _, asset := range assets {
                    // Push returns error if push not possible
                    pusher.Push(asset, nil)
                }
            }

            next.ServeHTTP(w, r)
        })
    }
}
```

The pattern challenge: `ResponseWriter` has optional `Pusher` interface. When we wrap it (e.g., for logging), we lose the `Pusher` capability unless we explicitly preserve it:

```go
type pushableWrapper struct {
    http.ResponseWriter
    http.Pusher // Embed if available
}
```

This is the "lost capabilities through decoration" problem - each wrapper must explicitly preserve all optional interfaces.

---

## Related Patterns and Cross-References

- [[Proxy Pattern]](/topic/design-patterns/proxy) - Controls access without adding behavior; Decorator adds behavior without controlling access
- [[Adapter Pattern]](/topic/design-patterns/adapter) - Changes interface; Decorator preserves interface
- [[Chain of Responsibility]](/topic/design-patterns/chain-of-responsibility) - Similar chain structure, but CoR handlers decide whether to process; Decorators always delegate
- [[Composite Pattern]](/topic/design-patterns/composite) - Tree structure; Decorator is linear chain
- [[Strategy Pattern]](/topic/design-patterns/strategy) - Changes algorithm entirely; Decorator wraps and extends

## Summary: When to Use Decorator

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 2rem 0;">
<div style="background: linear-gradient(135deg, #4ecdc422 0%, #4ecdc411 100%); border: 1px solid #4ecdc4; border-radius: 10px; padding: 1.25rem;">
<h4 style="color: #4ecdc4; margin: 0 0 0.75rem 0;">Use Decorator When</h4>
<ul style="color: #ccc; margin: 0; padding-left: 1.25rem; line-height: 1.8;">
<li>Adding responsibilities dynamically</li>
<li>Responsibilities can be withdrawn</li>
<li>Subclassing creates class explosion</li>
<li>Need to combine behaviors flexibly</li>
<li>Modifying third-party code behavior</li>
</ul>
</div>
<div style="background: linear-gradient(135deg, #ff6b6b22 0%, #ff6b6b11 100%); border: 1px solid #ff6b6b; border-radius: 10px; padding: 1.25rem;">
<h4 style="color: #ff6b6b; margin: 0 0 0.75rem 0;">Avoid Decorator When</h4>
<ul style="color: #ccc; margin: 0; padding-left: 1.25rem; line-height: 1.8;">
<li>Single fixed behavior needed</li>
<li>Component interface is unstable</li>
<li>Deep chains cause performance issues</li>
<li>Identity/type checking is important</li>
<li>Decorators need to access each other</li>
</ul>
</div>
</div>
