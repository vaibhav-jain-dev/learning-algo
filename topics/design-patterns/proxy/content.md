# Proxy Pattern

## Overview

The Proxy pattern provides a surrogate or placeholder for another object to control access to it. Unlike simple wrappers, proxies implement the same interface as the target object, making them substitutable while intercepting all access to add cross-cutting concerns like lazy initialization, access control, logging, caching, or remote communication.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 2rem; margin: 2rem 0; border: 1px solid #0f3460;">
  <div style="color: #e94560; font-weight: 700; font-size: 1.2rem; margin-bottom: 1rem;">Core Insight</div>
  <div style="color: #eee; line-height: 1.7;">
    The proxy pattern embodies the principle of <strong style="color: #00d9ff;">indirection</strong>: by placing an intermediary between client and target, we gain a control point where behavior can be modified without changing either party. This is the foundation of many critical infrastructure patterns including RPC frameworks, ORM lazy loading, and security middleware.
  </div>
</div>

### Fundamental Properties

**Interface Identity**: The proxy MUST implement the exact same interface as the real subject. This enables the [[Liskov Substitution Principle]](/topic/solid/liskov-substitution) - clients remain unaware they're communicating with a proxy.

**Controlled Delegation**: Unlike the [[Decorator Pattern]](/topic/design-patterns/decorator) which unconditionally forwards calls while adding behavior, proxies make explicit decisions about whether, when, and how to delegate to the real subject.

**Reference Management**: Proxies maintain a reference to the real subject (or enough information to obtain one), managing its lifecycle according to proxy semantics.

---

## Structural Architecture

<div style="display: flex; flex-direction: column; gap: 1.5rem; margin: 2rem 0; font-family: system-ui, -apple-system, sans-serif;">
  <div style="display: flex; justify-content: center;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 1.5rem 2.5rem; color: white; text-align: center; box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);">
      <div style="font-weight: 700; font-size: 1.15rem; letter-spacing: 0.5px;">Subject</div>
      <div style="font-size: 0.75rem; opacity: 0.8; margin-top: 0.25rem;">interface</div>
      <div style="border-top: 1px solid rgba(255,255,255,0.3); margin-top: 0.75rem; padding-top: 0.75rem; font-size: 0.85rem; font-family: 'Fira Code', monospace;">
        + request(): Response<br>
        + getState(): State
      </div>
    </div>
  </div>
  <div style="display: flex; justify-content: center; gap: 0.5rem; color: #667eea;">
    <span style="font-size: 1.5rem;">&#9650;</span>
    <span style="font-size: 0.9rem; align-self: center;">implements</span>
    <span style="font-size: 1.5rem;">&#9650;</span>
  </div>
  <div style="display: flex; gap: 3rem; justify-content: center; flex-wrap: wrap;">
    <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); border: 2px solid #4ecdc4; border-radius: 12px; padding: 1.25rem 2rem; text-align: center; min-width: 180px;">
      <div style="color: #4ecdc4; font-weight: 700; font-size: 1.05rem;">RealSubject</div>
      <div style="color: #aaa; font-size: 0.75rem; margin-top: 0.25rem;">concrete implementation</div>
      <div style="border-top: 1px solid #4ecdc4; margin-top: 0.75rem; padding-top: 0.75rem; color: #88d8d8; font-size: 0.85rem; font-family: 'Fira Code', monospace;">
        + request(): Response<br>
        + getState(): State
      </div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
      <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 12px; padding: 1.25rem 2rem; color: white; text-align: center; box-shadow: 0 8px 32px rgba(240, 147, 251, 0.3); min-width: 200px;">
        <div style="font-weight: 700; font-size: 1.05rem;">Proxy</div>
        <div style="font-size: 0.75rem; opacity: 0.8; margin-top: 0.25rem;">controls access</div>
        <div style="border-top: 1px solid rgba(255,255,255,0.3); margin-top: 0.75rem; padding-top: 0.75rem; font-size: 0.85rem; font-family: 'Fira Code', monospace; text-align: left;">
          - realSubject: Subject<br>
          + request(): Response<br>
          + getState(): State
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 12px solid #f5576c;"></div>
        <span style="color: #f5576c; font-size: 0.85rem; font-weight: 500;">delegates to RealSubject</span>
      </div>
    </div>
  </div>
</div>

---

## Virtual Proxy (Lazy Initialization)

### Concept and Motivation

A Virtual Proxy defers the creation of expensive objects until they are actually needed. This is critical when object instantiation involves heavy I/O operations, significant memory allocation, or complex computation.

<div style="background: linear-gradient(135deg, #232526 0%, #414345 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #00d9ff;">
  <div style="color: #00d9ff; font-weight: 600; margin-bottom: 0.75rem;">Key Assumption</div>
  <div style="color: #ddd; line-height: 1.6;">
    Virtual proxies assume that object creation cost significantly exceeds proxy creation cost, AND that there's a reasonable probability the object won't be needed. If objects are always used immediately, the proxy adds pure overhead.
  </div>
</div>

### Internal Mechanisms

**Lazy Reference Pattern**: The proxy holds a nullable reference to the real subject. Each method checks if the reference is null, instantiating the real object on first access (double-checked locking pattern in concurrent environments).

**Metadata Caching**: Smart virtual proxies cache lightweight metadata that can answer simple queries without materializing the full object. For example, an image proxy might store dimensions without loading pixel data.

**Creation Context Capture**: The proxy captures all constructor arguments at proxy creation time, storing them until actual instantiation. This creates a temporal decoupling between specification and materialization.

### Implementation - Python

```python
from abc import ABC, abstractmethod
from typing import Optional, Generic, TypeVar, Callable, Any
from threading import Lock
from dataclasses import dataclass
import weakref

T = TypeVar('T')


class VirtualProxyMixin(Generic[T]):
    """
    Thread-safe virtual proxy base with double-checked locking.

    Design Decision: We use double-checked locking because:
    1. Most accesses happen after initialization (fast path needs no lock)
    2. Initialization happens once (slow path is acceptable)
    3. Memory barrier semantics ensure visibility across threads
    """

    _instance: Optional[T] = None
    _lock: Lock
    _factory: Callable[[], T]
    _initialized: bool = False

    def _get_instance(self) -> T:
        # Fast path - no locking if already initialized
        if self._initialized:
            return self._instance

        # Slow path - acquire lock for initialization
        with self._lock:
            # Double-check after acquiring lock
            if not self._initialized:
                self._instance = self._factory()
                self._initialized = True

        return self._instance

    def is_materialized(self) -> bool:
        """Check if real object exists without triggering creation."""
        return self._initialized


class Document(ABC):
    """Subject interface for document operations."""

    @abstractmethod
    def get_content(self) -> str:
        pass

    @abstractmethod
    def get_metadata(self) -> dict:
        pass

    @abstractmethod
    def get_word_count(self) -> int:
        pass

    @abstractmethod
    def search(self, query: str) -> list[int]:
        pass


@dataclass
class DocumentMetadata:
    """Lightweight metadata that can be loaded without full document."""
    filename: str
    size_bytes: int
    word_count: int
    created_at: str


class HeavyDocument(Document):
    """
    Real subject - expensive document that loads full content.
    Simulates loading a large document from disk/network.
    """

    def __init__(self, filename: str):
        self.filename = filename
        self._content: str = ""
        self._metadata: dict = {}
        self._load_document()

    def _load_document(self):
        """Expensive operation - loads entire document into memory."""
        print(f"[HeavyDocument] Loading {self.filename}...")
        # Simulate expensive I/O
        import time
        time.sleep(1)

        # In reality, this would read from disk/network
        self._content = f"Full content of {self.filename} " * 1000
        self._metadata = {
            "filename": self.filename,
            "size_bytes": len(self._content),
            "word_count": len(self._content.split()),
            "loaded_at": "2024-01-15T10:30:00Z"
        }
        print(f"[HeavyDocument] Loaded {self._metadata['word_count']} words")

    def get_content(self) -> str:
        return self._content

    def get_metadata(self) -> dict:
        return self._metadata

    def get_word_count(self) -> int:
        return self._metadata["word_count"]

    def search(self, query: str) -> list[int]:
        """Return positions where query appears."""
        positions = []
        start = 0
        while True:
            pos = self._content.find(query, start)
            if pos == -1:
                break
            positions.append(pos)
            start = pos + 1
        return positions


class DocumentProxy(Document):
    """
    Virtual proxy with smart metadata caching.

    Trade-off Analysis:
    - Pro: Defers 1-second load until content is actually needed
    - Pro: Metadata queries don't trigger full load
    - Con: Additional memory for proxy + metadata cache
    - Con: First content access has latency spike

    When to Use:
    - Document galleries where users browse metadata
    - Search result previews
    - Lazy-loaded document trees
    """

    def __init__(self, filename: str, cached_metadata: Optional[DocumentMetadata] = None):
        self._filename = filename
        self._cached_metadata = cached_metadata
        self._real_document: Optional[HeavyDocument] = None
        self._lock = Lock()

    def _ensure_loaded(self) -> HeavyDocument:
        """Double-checked locking for thread-safe lazy initialization."""
        if self._real_document is not None:
            return self._real_document

        with self._lock:
            if self._real_document is None:
                self._real_document = HeavyDocument(self._filename)

        return self._real_document

    def get_content(self) -> str:
        # Must load full document for content
        return self._ensure_loaded().get_content()

    def get_metadata(self) -> dict:
        # Can return cached metadata without loading
        if self._cached_metadata:
            return {
                "filename": self._cached_metadata.filename,
                "size_bytes": self._cached_metadata.size_bytes,
                "word_count": self._cached_metadata.word_count,
                "created_at": self._cached_metadata.created_at,
                "source": "cache"
            }
        return self._ensure_loaded().get_metadata()

    def get_word_count(self) -> int:
        # Optimized path using cached metadata
        if self._cached_metadata:
            return self._cached_metadata.word_count
        return self._ensure_loaded().get_word_count()

    def search(self, query: str) -> list[int]:
        # Must load for search
        return self._ensure_loaded().search(query)

    def is_loaded(self) -> bool:
        """Introspection method - check without triggering load."""
        return self._real_document is not None


# Usage demonstration
if __name__ == "__main__":
    # Create proxy with cached metadata (from index/database)
    cached = DocumentMetadata(
        filename="large_report.pdf",
        size_bytes=5_000_000,
        word_count=50000,
        created_at="2024-01-01"
    )

    doc = DocumentProxy("large_report.pdf", cached_metadata=cached)

    # These don't trigger loading
    print(f"Word count: {doc.get_word_count()}")  # From cache
    print(f"Is loaded: {doc.is_loaded()}")  # False

    # This triggers loading
    positions = doc.search("important")
    print(f"Found at {len(positions)} positions")
    print(f"Is loaded: {doc.is_loaded()}")  # True
```

### Interview Questions - Virtual Proxy

<div style="background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%); border-radius: 16px; padding: 2rem; margin: 2rem 0;">
  <div style="color: #f39c12; font-weight: 700; font-size: 1.1rem; margin-bottom: 1.5rem;">Level 1: Fundamentals</div>

  <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
    <div style="color: #3498db; font-weight: 600;">Q: When should you use a virtual proxy instead of direct instantiation?</div>
    <div style="color: #bbb; margin-top: 0.75rem; line-height: 1.6;">
      <strong style="color: #2ecc71;">A:</strong> Use virtual proxies when: (1) Object creation is expensive (heavy I/O, complex computation, large memory), (2) There's uncertainty whether the object will be used, (3) You need to present a collection of objects where only some will be accessed. Classic examples: ORM lazy loading of relationships, image thumbnails in galleries, document previews.
    </div>
  </div>

  <div style="color: #e74c3c; font-weight: 700; font-size: 1.1rem; margin: 1.5rem 0 1rem;">Level 2: Implementation Depth</div>

  <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
    <div style="color: #3498db; font-weight: 600;">Q: What threading issues arise with virtual proxies and how do you solve them?</div>
    <div style="color: #bbb; margin-top: 0.75rem; line-height: 1.6;">
      <strong style="color: #2ecc71;">A:</strong> The primary issue is the <strong>check-then-act race condition</strong>. Two threads might both see the object as null and both create instances. Solutions:<br><br>
      <strong>1. Double-Checked Locking (DCL):</strong> Check without lock, acquire lock, check again, initialize. Requires proper memory barriers (volatile in Java, memory_order in C++).<br><br>
      <strong>2. Initialize-on-demand holder idiom:</strong> Use a nested class whose static field is initialized by class loader (thread-safe by JVM spec).<br><br>
      <strong>3. Atomic reference with CAS:</strong> Use compareAndSet - if another thread wins, discard your instance and use theirs.<br><br>
      <strong>Trade-off:</strong> DCL has complexity but allows lazy init with minimal contention. Atomic CAS may waste one initialization but is lock-free.
    </div>
  </div>

  <div style="color: #9b59b6; font-weight: 700; font-size: 1.1rem; margin: 1.5rem 0 1rem;">Level 3: Architecture and Edge Cases</div>

  <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem;">
    <div style="color: #3498db; font-weight: 600;">Q: How would you design a virtual proxy system that handles initialization failures, supports retry with backoff, and allows the proxy to be garbage collected while keeping the real object alive if other references exist?</div>
    <div style="color: #bbb; margin-top: 0.75rem; line-height: 1.6;">
      <strong style="color: #2ecc71;">A:</strong> This requires a sophisticated design:<br><br>
      <strong>1. Failure Handling with State Machine:</strong> Track proxy state (UNINITIALIZED, INITIALIZING, READY, FAILED). On failure, store the exception and transition to FAILED. Support reset() to return to UNINITIALIZED for retry.<br><br>
      <strong>2. Retry with Exponential Backoff:</strong> Wrap initialization in a retry policy. Use a RetryContext that tracks attempt count, last failure time, and computes next retry delay. Cap maximum retries and implement circuit breaker pattern if failures persist.<br><br>
      <strong>3. GC-Safe Reference Management:</strong> Use <code>WeakReference</code> from proxy to real subject. The proxy checks if the weak reference is still valid; if cleared, it can re-initialize. For the reverse (keeping real object alive), use a <code>shared_ptr</code>-style reference counting or rely on the real object's own strong references.<br><br>
      <strong>4. Cache Coordination:</strong> If multiple proxies can point to the same real object, use a WeakValueDictionary keyed by identity. New proxies check the cache first, reusing existing instances.<br><br>
      <strong>Edge Case:</strong> What if initialization succeeds but returns null? Define explicit semantics - either this is valid (null object pattern) or throw IllegalStateException.
    </div>
  </div>
</div>

---

## Protection Proxy (Access Control)

### Concept and Motivation

A Protection Proxy controls access to the real subject based on access rights, implementing authorization logic at the object level. This enforces [[Principle of Least Privilege]](/topic/security/least-privilege) by ensuring clients can only perform operations they're authorized for.

<div style="background: linear-gradient(135deg, #232526 0%, #414345 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #e74c3c;">
  <div style="color: #e74c3c; font-weight: 600; margin-bottom: 0.75rem;">Security Assumption</div>
  <div style="color: #ddd; line-height: 1.6;">
    Protection proxies assume the client cannot bypass the proxy to access the real subject directly. In languages with reflection or unsafe memory access, additional measures (like SecurityManager in Java or private constructors with factory methods) must prevent circumvention.
  </div>
</div>

### Internal Mechanisms

**Permission Resolution**: The proxy intercepts each method call, extracts the current security context (user, roles, claims), and evaluates whether the operation is permitted. This may involve checking against ACLs, RBAC policies, or ABAC rules.

**Context Propagation**: The security context must be available at the proxy layer. Common approaches include thread-local storage, explicit context passing, or [[Dependency Injection]](/topic/design-patterns/dependency-injection) of a security service.

**Audit Trail**: Protection proxies often log access attempts (both successful and denied) for security auditing and compliance requirements.

### Implementation - Python

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from enum import Enum, auto
from typing import Optional, Callable, Any
from functools import wraps
from datetime import datetime
import threading


class Permission(Enum):
    """Fine-grained permissions for document operations."""
    READ = auto()
    WRITE = auto()
    DELETE = auto()
    SHARE = auto()
    ADMIN = auto()  # Implies all permissions


class AuditAction(Enum):
    ACCESS_GRANTED = "ACCESS_GRANTED"
    ACCESS_DENIED = "ACCESS_DENIED"
    OPERATION_COMPLETED = "OPERATION_COMPLETED"
    OPERATION_FAILED = "OPERATION_FAILED"


@dataclass
class AuditEntry:
    timestamp: datetime
    user_id: str
    resource_id: str
    action: AuditAction
    permission_required: Permission
    details: str = ""


@dataclass
class User:
    """Security principal with role-based permissions."""
    id: str
    username: str
    roles: set[str] = field(default_factory=set)
    permissions: set[Permission] = field(default_factory=set)

    def has_permission(self, permission: Permission) -> bool:
        """
        Check if user has specific permission.

        Permission Resolution Order:
        1. ADMIN permission grants everything
        2. Direct permission match
        3. Role-based permission (would require role->permission mapping)
        """
        if Permission.ADMIN in self.permissions:
            return True
        return permission in self.permissions

    def has_role(self, role: str) -> bool:
        return role in self.roles


class SecurityContext:
    """
    Thread-local security context for implicit principal propagation.

    Design Trade-off:
    - Pro: No need to pass user through every method call
    - Pro: Works with existing interfaces that don't accept user parameter
    - Con: Hidden dependency, harder to test
    - Con: Must be careful with async/thread pools
    """
    _local = threading.local()

    @classmethod
    def set_current_user(cls, user: User) -> None:
        cls._local.user = user

    @classmethod
    def get_current_user(cls) -> Optional[User]:
        return getattr(cls._local, 'user', None)

    @classmethod
    def clear(cls) -> None:
        cls._local.user = None


class AuditLog:
    """Simple audit log for security events."""
    _entries: list[AuditEntry] = []
    _lock = threading.Lock()

    @classmethod
    def log(cls, entry: AuditEntry) -> None:
        with cls._lock:
            cls._entries.append(entry)
            # In production, this would write to persistent storage
            print(f"[AUDIT] {entry.timestamp.isoformat()} | {entry.action.value} | "
                  f"user={entry.user_id} | resource={entry.resource_id} | "
                  f"permission={entry.permission_required.name} | {entry.details}")

    @classmethod
    def get_entries(cls, user_id: Optional[str] = None) -> list[AuditEntry]:
        with cls._lock:
            if user_id:
                return [e for e in cls._entries if e.user_id == user_id]
            return cls._entries.copy()


class AccessDeniedError(Exception):
    """Raised when access control check fails."""
    def __init__(self, user: User, permission: Permission, resource: str):
        self.user = user
        self.permission = permission
        self.resource = resource
        super().__init__(
            f"User '{user.username}' lacks {permission.name} permission for '{resource}'"
        )


class BankAccount(ABC):
    """Subject interface for bank account operations."""

    @abstractmethod
    def get_balance(self) -> float:
        pass

    @abstractmethod
    def deposit(self, amount: float) -> None:
        pass

    @abstractmethod
    def withdraw(self, amount: float) -> bool:
        pass

    @abstractmethod
    def transfer(self, target: 'BankAccount', amount: float) -> bool:
        pass

    @abstractmethod
    def close_account(self) -> None:
        pass


class RealBankAccount(BankAccount):
    """Real subject - actual bank account implementation."""

    def __init__(self, account_id: str, owner_id: str, initial_balance: float = 0):
        self.account_id = account_id
        self.owner_id = owner_id
        self._balance = initial_balance
        self._closed = False

    def get_balance(self) -> float:
        if self._closed:
            raise ValueError("Account is closed")
        return self._balance

    def deposit(self, amount: float) -> None:
        if self._closed:
            raise ValueError("Account is closed")
        if amount <= 0:
            raise ValueError("Deposit amount must be positive")
        self._balance += amount

    def withdraw(self, amount: float) -> bool:
        if self._closed:
            raise ValueError("Account is closed")
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive")
        if amount > self._balance:
            return False
        self._balance -= amount
        return True

    def transfer(self, target: 'BankAccount', amount: float) -> bool:
        if self.withdraw(amount):
            target.deposit(amount)
            return True
        return False

    def close_account(self) -> None:
        if self._balance != 0:
            raise ValueError("Cannot close account with non-zero balance")
        self._closed = True


class ProtectedBankAccount(BankAccount):
    """
    Protection proxy implementing fine-grained access control.

    Permission Mapping:
    - get_balance: READ
    - deposit: WRITE
    - withdraw: WRITE
    - transfer: WRITE + target account WRITE
    - close_account: DELETE

    Design Decisions:
    1. Uses SecurityContext for implicit user - matches real banking systems
    2. Logs all access attempts for compliance
    3. Fails closed - if no user in context, denies access
    """

    def __init__(self, account: RealBankAccount):
        self._account = account
        self._resource_id = f"account:{account.account_id}"

    def _get_current_user(self) -> User:
        user = SecurityContext.get_current_user()
        if user is None:
            raise AccessDeniedError(
                User("anonymous", "anonymous"),
                Permission.READ,
                self._resource_id
            )
        return user

    def _check_permission(self, permission: Permission) -> User:
        """
        Verify current user has required permission.
        Returns user on success for audit logging.
        """
        user = self._get_current_user()

        # Owner always has full access to their own account
        is_owner = user.id == self._account.owner_id
        has_permission = user.has_permission(permission)

        if is_owner or has_permission:
            AuditLog.log(AuditEntry(
                timestamp=datetime.now(),
                user_id=user.id,
                resource_id=self._resource_id,
                action=AuditAction.ACCESS_GRANTED,
                permission_required=permission
            ))
            return user

        AuditLog.log(AuditEntry(
            timestamp=datetime.now(),
            user_id=user.id,
            resource_id=self._resource_id,
            action=AuditAction.ACCESS_DENIED,
            permission_required=permission
        ))
        raise AccessDeniedError(user, permission, self._resource_id)

    def get_balance(self) -> float:
        self._check_permission(Permission.READ)
        return self._account.get_balance()

    def deposit(self, amount: float) -> None:
        user = self._check_permission(Permission.WRITE)
        self._account.deposit(amount)
        AuditLog.log(AuditEntry(
            timestamp=datetime.now(),
            user_id=user.id,
            resource_id=self._resource_id,
            action=AuditAction.OPERATION_COMPLETED,
            permission_required=Permission.WRITE,
            details=f"deposit={amount}"
        ))

    def withdraw(self, amount: float) -> bool:
        user = self._check_permission(Permission.WRITE)
        result = self._account.withdraw(amount)
        AuditLog.log(AuditEntry(
            timestamp=datetime.now(),
            user_id=user.id,
            resource_id=self._resource_id,
            action=AuditAction.OPERATION_COMPLETED if result else AuditAction.OPERATION_FAILED,
            permission_required=Permission.WRITE,
            details=f"withdraw={amount}, success={result}"
        ))
        return result

    def transfer(self, target: 'BankAccount', amount: float) -> bool:
        user = self._check_permission(Permission.WRITE)
        # Note: In real implementation, would also verify WRITE on target
        result = self._account.transfer(target, amount)
        AuditLog.log(AuditEntry(
            timestamp=datetime.now(),
            user_id=user.id,
            resource_id=self._resource_id,
            action=AuditAction.OPERATION_COMPLETED if result else AuditAction.OPERATION_FAILED,
            permission_required=Permission.WRITE,
            details=f"transfer={amount}, success={result}"
        ))
        return result

    def close_account(self) -> None:
        user = self._check_permission(Permission.DELETE)
        self._account.close_account()
        AuditLog.log(AuditEntry(
            timestamp=datetime.now(),
            user_id=user.id,
            resource_id=self._resource_id,
            action=AuditAction.OPERATION_COMPLETED,
            permission_required=Permission.DELETE,
            details="account_closed"
        ))


# Usage demonstration
if __name__ == "__main__":
    # Create account
    real_account = RealBankAccount("ACC-001", owner_id="user-alice", initial_balance=1000)
    protected_account = ProtectedBankAccount(real_account)

    # Owner access
    alice = User("user-alice", "alice")
    SecurityContext.set_current_user(alice)

    print(f"Alice's balance: ${protected_account.get_balance()}")
    protected_account.deposit(500)
    print(f"After deposit: ${protected_account.get_balance()}")

    # Bank teller with limited permissions
    teller = User("user-teller", "teller", permissions={Permission.READ})
    SecurityContext.set_current_user(teller)

    print(f"\nTeller checking balance: ${protected_account.get_balance()}")

    try:
        protected_account.withdraw(100)  # Should fail
    except AccessDeniedError as e:
        print(f"Teller withdraw denied: {e}")

    # Admin access
    admin = User("user-admin", "admin", permissions={Permission.ADMIN})
    SecurityContext.set_current_user(admin)

    protected_account.withdraw(200)
    print(f"\nAdmin withdrew $200, balance: ${protected_account.get_balance()}")

    SecurityContext.clear()
```

### Interview Questions - Protection Proxy

<div style="background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%); border-radius: 16px; padding: 2rem; margin: 2rem 0;">
  <div style="color: #f39c12; font-weight: 700; font-size: 1.1rem; margin-bottom: 1.5rem;">Level 1: Fundamentals</div>

  <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
    <div style="color: #3498db; font-weight: 600;">Q: How does a protection proxy differ from application-level security middleware?</div>
    <div style="color: #bbb; margin-top: 0.75rem; line-height: 1.6;">
      <strong style="color: #2ecc71;">A:</strong> Protection proxies provide <strong>object-level security</strong> while middleware typically provides <strong>request-level security</strong>.<br><br>
      <strong>Middleware:</strong> Intercepts at API boundary, coarse-grained (entire endpoint), stateless per request, centralized configuration.<br><br>
      <strong>Protection Proxy:</strong> Intercepts at object boundary, fine-grained (per method), can maintain state, distributed with objects.<br><br>
      <strong>When to combine:</strong> Use middleware for authentication and coarse authorization, proxies for domain-specific fine-grained authorization that depends on object state.
    </div>
  </div>

  <div style="color: #e74c3c; font-weight: 700; font-size: 1.1rem; margin: 1.5rem 0 1rem;">Level 2: Implementation Depth</div>

  <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
    <div style="color: #3498db; font-weight: 600;">Q: What are the security implications of using thread-local storage for security context in a protection proxy?</div>
    <div style="color: #bbb; margin-top: 0.75rem; line-height: 1.6;">
      <strong style="color: #2ecc71;">A:</strong> Thread-local security context has several vulnerabilities:<br><br>
      <strong>1. Thread Pool Contamination:</strong> If a thread pool reuses threads, a previous request's context might leak to the next request if not explicitly cleared. Always clear context in finally blocks or use request-scoped containers.<br><br>
      <strong>2. Async/Await Context Loss:</strong> In async code, continuations may run on different threads, losing the context. Solutions: explicit context propagation, AsyncLocal (C#), or contextvars (Python 3.7+).<br><br>
      <strong>3. Nested Security Contexts:</strong> If code needs to temporarily elevate privileges (run-as), thread-local doesn't naturally support stacking. Implement a context stack or use explicit privilege escalation tokens.<br><br>
      <strong>4. Testing Difficulty:</strong> Tests must remember to set/clear context. Consider dependency injection as alternative for testability.
    </div>
  </div>

  <div style="color: #9b59b6; font-weight: 700; font-size: 1.1rem; margin: 1.5rem 0 1rem;">Level 3: Architecture and Edge Cases</div>

  <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem;">
    <div style="color: #3498db; font-weight: 600;">Q: Design a protection proxy system that handles: (1) hierarchical permissions with inheritance, (2) time-based access windows, (3) rate limiting per user, and (4) delegated permissions that can be revoked mid-session.</div>
    <div style="color: #bbb; margin-top: 0.75rem; line-height: 1.6;">
      <strong style="color: #2ecc71;">A:</strong><br><br>
      <strong>1. Hierarchical Permissions:</strong> Model permissions as a DAG where higher-level permissions imply lower ones. Use a PermissionResolver that traverses the hierarchy. Cache resolved permissions but invalidate on role changes. Example: ADMIN > MANAGER > EDITOR > VIEWER.<br><br>
      <strong>2. Time-Based Access:</strong> Extend Permission to TemporalPermission with validFrom/validUntil. The proxy checks current time against window. For recurring windows (business hours only), use cron-like expressions. Store time in UTC, convert to user's timezone for comparison.<br><br>
      <strong>3. Rate Limiting:</strong> Inject a RateLimiter into the proxy. Use token bucket or sliding window algorithm keyed by (user_id, operation). Rate limits can be permission-specific (admins get higher limits). Consider distributed rate limiting via Redis if horizontally scaled.<br><br>
      <strong>4. Delegated Revocable Permissions:</strong> Issue delegation tokens with unique IDs stored in a revocation list (or use short-lived JWTs with refresh). On each access, proxy checks if token is revoked. For immediate revocation, use a distributed cache with pub/sub for propagation. Token should include delegator chain for audit trail.<br><br>
      <strong>Edge Case - Revocation During Transaction:</strong> If permissions revoked mid-transaction, you have options: (a) fail immediately (consistent but disruptive), (b) allow transaction to complete (eventual consistency), (c) queue revocation for end of current operation. Choice depends on security requirements.
    </div>
  </div>
</div>

---

## Remote Proxy (Location Transparency)

### Concept and Motivation

A Remote Proxy provides a local representative for an object that exists in a different address space - whether another process, machine, or data center. This enables [[Location Transparency]](/topic/distributed-systems/location-transparency), where clients interact with remote objects using the same interface as local ones.

<div style="background: linear-gradient(135deg, #232526 0%, #414345 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #9b59b6;">
  <div style="color: #9b59b6; font-weight: 600; margin-bottom: 0.75rem;">Distributed Computing Assumption</div>
  <div style="color: #ddd; line-height: 1.6;">
    Remote proxies assume network communication is fundamentally different from local calls: it can fail, has latency, may deliver messages out of order, and the remote object's state can change between calls. The <strong>Eight Fallacies of Distributed Computing</strong> all apply.
  </div>
</div>

### Internal Mechanisms

**Marshalling/Serialization**: Method arguments must be serialized for network transmission and deserialized on the remote side. This includes handling object graphs, circular references, and versioning of serialized formats.

**Network Protocol**: The proxy encapsulates connection management, protocol handling (HTTP, gRPC, custom binary), request/response correlation, and potentially connection pooling.

**Failure Handling**: Network calls can fail in ways local calls cannot. The proxy must handle timeouts, retries, circuit breaking, and communicate failures appropriately to the client.

### Architecture Diagram

<div style="display: flex; flex-direction: column; gap: 1rem; margin: 2rem 0; font-family: system-ui, sans-serif;">
  <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem; flex-wrap: wrap;">
    <div style="flex: 1; min-width: 280px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 1.5rem; border: 2px solid #3498db;">
      <div style="color: #3498db; font-weight: 700; text-align: center; margin-bottom: 1rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Client Process</div>
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <div style="background: #2c3e50; border-radius: 8px; padding: 0.75rem; text-align: center;">
          <div style="color: #ecf0f1; font-weight: 600;">Client Code</div>
          <div style="color: #95a5a6; font-size: 0.8rem;">calls proxy.method()</div>
        </div>
        <div style="text-align: center; color: #3498db;">&#8595;</div>
        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 8px; padding: 0.75rem; text-align: center;">
          <div style="color: white; font-weight: 600;">Remote Proxy (Stub)</div>
          <div style="color: rgba(255,255,255,0.8); font-size: 0.75rem;">serializes, sends request</div>
        </div>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 1rem;">
      <div style="color: #f39c12; font-size: 0.85rem; margin-bottom: 0.5rem;">Network</div>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <div style="color: #2ecc71; font-size: 1.2rem;">&#8594; request &#8594;</div>
        <div style="color: #e74c3c; font-size: 1.2rem;">&#8592; response &#8592;</div>
      </div>
      <div style="color: #7f8c8d; font-size: 0.75rem; margin-top: 0.5rem;">(HTTP, gRPC, etc.)</div>
    </div>
    <div style="flex: 1; min-width: 280px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 1.5rem; border: 2px solid #e74c3c;">
      <div style="color: #e74c3c; font-weight: 700; text-align: center; margin-bottom: 1rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Server Process</div>
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); border-radius: 8px; padding: 0.75rem; text-align: center;">
          <div style="color: white; font-weight: 600;">Skeleton (Dispatcher)</div>
          <div style="color: rgba(255,255,255,0.8); font-size: 0.75rem;">deserializes, invokes</div>
        </div>
        <div style="text-align: center; color: #e74c3c;">&#8595;</div>
        <div style="background: #2c3e50; border-radius: 8px; padding: 0.75rem; text-align: center;">
          <div style="color: #4ecdc4; font-weight: 600;">Real Service</div>
          <div style="color: #95a5a6; font-size: 0.8rem;">actual implementation</div>
        </div>
      </div>
    </div>
  </div>
</div>

### Implementation - Go with gRPC-style Patterns

```go
package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"math/rand"
	"net/http"
	"sync"
	"time"
)

// Domain types
type User struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
}

// Subject interface - same interface used locally and remotely
type UserService interface {
	GetUser(ctx context.Context, id string) (*User, error)
	CreateUser(ctx context.Context, name, email string) (*User, error)
	ListUsers(ctx context.Context, limit int) ([]*User, error)
}

// ============ REAL SERVICE (runs on server) ============

type RealUserService struct {
	mu    sync.RWMutex
	users map[string]*User
}

func NewRealUserService() *RealUserService {
	return &RealUserService{
		users: make(map[string]*User),
	}
}

func (s *RealUserService) GetUser(ctx context.Context, id string) (*User, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	user, exists := s.users[id]
	if !exists {
		return nil, fmt.Errorf("user not found: %s", id)
	}
	return user, nil
}

func (s *RealUserService) CreateUser(ctx context.Context, name, email string) (*User, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	user := &User{
		ID:        fmt.Sprintf("user-%d", rand.Int63()),
		Name:      name,
		Email:     email,
		CreatedAt: time.Now(),
	}
	s.users[user.ID] = user
	return user, nil
}

func (s *RealUserService) ListUsers(ctx context.Context, limit int) ([]*User, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	users := make([]*User, 0, limit)
	for _, u := range s.users {
		users = append(users, u)
		if len(users) >= limit {
			break
		}
	}
	return users, nil
}

// ============ REMOTE PROXY (runs on client) ============

// RemoteError wraps network and remote errors with additional context
type RemoteError struct {
	Operation   string
	StatusCode  int
	Message     string
	Retriable   bool
	Cause       error
}

func (e *RemoteError) Error() string {
	return fmt.Sprintf("remote error in %s: %s (status=%d, retriable=%v)",
		e.Operation, e.Message, e.StatusCode, e.Retriable)
}

func (e *RemoteError) Unwrap() error {
	return e.Cause
}

// CircuitBreaker prevents cascading failures
type CircuitBreaker struct {
	mu              sync.Mutex
	failureCount    int
	lastFailure     time.Time
	state           string // "closed", "open", "half-open"
	failureThreshold int
	resetTimeout    time.Duration
}

func NewCircuitBreaker(threshold int, resetTimeout time.Duration) *CircuitBreaker {
	return &CircuitBreaker{
		state:            "closed",
		failureThreshold: threshold,
		resetTimeout:     resetTimeout,
	}
}

func (cb *CircuitBreaker) Allow() bool {
	cb.mu.Lock()
	defer cb.mu.Unlock()

	switch cb.state {
	case "closed":
		return true
	case "open":
		if time.Since(cb.lastFailure) > cb.resetTimeout {
			cb.state = "half-open"
			return true
		}
		return false
	case "half-open":
		return true
	}
	return false
}

func (cb *CircuitBreaker) RecordSuccess() {
	cb.mu.Lock()
	defer cb.mu.Unlock()

	cb.failureCount = 0
	cb.state = "closed"
}

func (cb *CircuitBreaker) RecordFailure() {
	cb.mu.Lock()
	defer cb.mu.Unlock()

	cb.failureCount++
	cb.lastFailure = time.Now()

	if cb.failureCount >= cb.failureThreshold {
		cb.state = "open"
	}
}

// RemoteUserServiceProxy is the remote proxy (client stub)
type RemoteUserServiceProxy struct {
	baseURL        string
	client         *http.Client
	circuitBreaker *CircuitBreaker
	maxRetries     int
	retryDelay     time.Duration
}

func NewRemoteUserServiceProxy(baseURL string) *RemoteUserServiceProxy {
	return &RemoteUserServiceProxy{
		baseURL: baseURL,
		client: &http.Client{
			Timeout: 10 * time.Second,
		},
		circuitBreaker: NewCircuitBreaker(5, 30*time.Second),
		maxRetries:     3,
		retryDelay:     100 * time.Millisecond,
	}
}

// doRequest handles the common HTTP request pattern with retry and circuit breaker
func (p *RemoteUserServiceProxy) doRequest(
	ctx context.Context,
	method, endpoint string,
	body interface{},
	result interface{},
) error {
	// Check circuit breaker
	if !p.circuitBreaker.Allow() {
		return &RemoteError{
			Operation:  endpoint,
			Message:    "circuit breaker open",
			Retriable:  false,
		}
	}

	var lastErr error
	for attempt := 0; attempt <= p.maxRetries; attempt++ {
		if attempt > 0 {
			// Exponential backoff
			delay := p.retryDelay * time.Duration(1<<(attempt-1))
			select {
			case <-ctx.Done():
				return ctx.Err()
			case <-time.After(delay):
			}
		}

		err := p.doSingleRequest(ctx, method, endpoint, body, result)
		if err == nil {
			p.circuitBreaker.RecordSuccess()
			return nil
		}

		lastErr = err

		// Check if error is retriable
		var remoteErr *RemoteError
		if errors.As(err, &remoteErr) && !remoteErr.Retriable {
			p.circuitBreaker.RecordFailure()
			return err
		}
	}

	p.circuitBreaker.RecordFailure()
	return lastErr
}

func (p *RemoteUserServiceProxy) doSingleRequest(
	ctx context.Context,
	method, endpoint string,
	body interface{},
	result interface{},
) error {
	url := p.baseURL + endpoint

	// In real implementation: marshal body, create request, send, unmarshal response
	// Simplified for demonstration
	fmt.Printf("[PROXY] %s %s\n", method, url)

	// Simulate network call
	time.Sleep(50 * time.Millisecond)

	// Simulate occasional failures for demonstration
	if rand.Float32() < 0.1 {
		return &RemoteError{
			Operation:  endpoint,
			StatusCode: 503,
			Message:    "service temporarily unavailable",
			Retriable:  true,
		}
	}

	return nil
}

func (p *RemoteUserServiceProxy) GetUser(ctx context.Context, id string) (*User, error) {
	var user User
	err := p.doRequest(ctx, "GET", "/users/"+id, nil, &user)
	if err != nil {
		return nil, err
	}
	// In real implementation, user would be populated from response
	return &user, nil
}

func (p *RemoteUserServiceProxy) CreateUser(ctx context.Context, name, email string) (*User, error) {
	request := map[string]string{"name": name, "email": email}
	var user User
	err := p.doRequest(ctx, "POST", "/users", request, &user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (p *RemoteUserServiceProxy) ListUsers(ctx context.Context, limit int) ([]*User, error) {
	var users []*User
	endpoint := fmt.Sprintf("/users?limit=%d", limit)
	err := p.doRequest(ctx, "GET", endpoint, nil, &users)
	if err != nil {
		return nil, err
	}
	return users, nil
}

// ============ CLIENT CODE ============
// Client code is identical whether using local or remote service

func processUsers(svc UserService) {
	ctx := context.Background()

	// Create user
	user, err := svc.CreateUser(ctx, "Alice", "alice@example.com")
	if err != nil {
		fmt.Printf("Failed to create user: %v\n", err)
		return
	}
	fmt.Printf("Created user: %+v\n", user)

	// Get user
	retrieved, err := svc.GetUser(ctx, user.ID)
	if err != nil {
		fmt.Printf("Failed to get user: %v\n", err)
		return
	}
	fmt.Printf("Retrieved user: %+v\n", retrieved)
}

func main() {
	// Local usage
	fmt.Println("=== Using Local Service ===")
	localService := NewRealUserService()
	processUsers(localService)

	// Remote usage - SAME client code, different service instance
	fmt.Println("\n=== Using Remote Service (via Proxy) ===")
	remoteService := NewRemoteUserServiceProxy("http://api.example.com")
	processUsers(remoteService)
}
```

### Interview Questions - Remote Proxy

<div style="background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%); border-radius: 16px; padding: 2rem; margin: 2rem 0;">
  <div style="color: #f39c12; font-weight: 700; font-size: 1.1rem; margin-bottom: 1.5rem;">Level 1: Fundamentals</div>

  <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
    <div style="color: #3498db; font-weight: 600;">Q: What are the key differences between local method calls and remote calls that a remote proxy must handle?</div>
    <div style="color: #bbb; margin-top: 0.75rem; line-height: 1.6;">
      <strong style="color: #2ecc71;">A:</strong> Remote calls differ fundamentally:<br><br>
      <strong>1. Latency:</strong> Network round-trip adds milliseconds to seconds vs. nanoseconds for local calls.<br>
      <strong>2. Failure Modes:</strong> Network can fail, timeout, or return partial data. Local calls only fail on exceptions.<br>
      <strong>3. Serialization:</strong> Arguments must be serializable; no passing of function pointers or open file handles.<br>
      <strong>4. State Isolation:</strong> Remote object state is not visible locally; can change between calls.<br>
      <strong>5. Security:</strong> Data crosses trust boundaries; needs authentication, encryption.<br>
      <strong>6. Partial Failure:</strong> Request might succeed but response lost, leaving unknown state.
    </div>
  </div>

  <div style="color: #e74c3c; font-weight: 700; font-size: 1.1rem; margin: 1.5rem 0 1rem;">Level 2: Implementation Depth</div>

  <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
    <div style="color: #3498db; font-weight: 600;">Q: Explain the trade-offs between different retry strategies in remote proxies and when to use each.</div>
    <div style="color: #bbb; margin-top: 0.75rem; line-height: 1.6;">
      <strong style="color: #2ecc71;">A:</strong><br><br>
      <strong>1. Immediate Retry:</strong> Retry instantly on failure. Good for transient network glitches. Risk: amplifies load during outages.<br><br>
      <strong>2. Fixed Delay:</strong> Wait constant time between retries. Simple but not adaptive. May retry too fast during outage or too slow for transient errors.<br><br>
      <strong>3. Exponential Backoff:</strong> Double delay each retry (100ms, 200ms, 400ms...). Reduces load during extended outages. Standard for cloud services.<br><br>
      <strong>4. Exponential Backoff + Jitter:</strong> Add random jitter to prevent thundering herd when many clients retry simultaneously. Essential for distributed systems.<br><br>
      <strong>5. Circuit Breaker + Retry:</strong> After N failures, stop retrying for a period. Prevents wasting resources on definitely-down services.<br><br>
      <strong>Idempotency Requirement:</strong> Only safe to retry idempotent operations (GET, PUT with same value). Non-idempotent operations (POST creating resource) need idempotency keys to prevent duplicates.
    </div>
  </div>

  <div style="color: #9b59b6; font-weight: 700; font-size: 1.1rem; margin: 1.5rem 0 1rem;">Level 3: Architecture and Edge Cases</div>

  <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem;">
    <div style="color: #3498db; font-weight: 600;">Q: Design a remote proxy system for a stock trading platform that must handle: (1) sub-millisecond latency requirements, (2) exactly-once execution semantics for trades, (3) graceful degradation during partial outages, and (4) regulatory audit trail requirements.</div>
    <div style="color: #bbb; margin-top: 0.75rem; line-height: 1.6;">
      <strong style="color: #2ecc71;">A:</strong><br><br>
      <strong>1. Sub-millisecond Latency:</strong><br>
      - Use binary protocol (not JSON/HTTP) - consider FIX protocol or custom binary format<br>
      - Pre-establish persistent connections (connection pooling)<br>
      - Use kernel bypass networking (DPDK) for critical paths<br>
      - Proxy should pre-serialize common messages; use object pooling to avoid GC<br>
      - Co-locate proxy close to exchange servers<br><br>

      <strong>2. Exactly-Once Semantics:</strong><br>
      - Assign unique trade ID (idempotency key) before sending<br>
      - Store pending trades in local persistent log before network call<br>
      - If response lost, query trade status using trade ID<br>
      - Implement two-phase protocol: reserve then confirm<br>
      - Use distributed consensus (Raft) for proxy cluster to prevent duplicate submission<br><br>

      <strong>3. Graceful Degradation:</strong><br>
      - Multiple exchange connections with automatic failover<br>
      - Cache last known prices for read operations during write outage<br>
      - Queue orders locally during brief outages with timeout<br>
      - Circuit breaker per exchange; route to alternatives<br>
      - Reject new orders (fail-fast) rather than queue indefinitely<br><br>

      <strong>4. Regulatory Audit Trail:</strong><br>
      - Log every request/response with microsecond timestamps before and after<br>
      - Include sequence numbers for ordering reconstruction<br>
      - Write audit log to append-only storage (separate from normal logs)<br>
      - Hash chain entries for tamper detection<br>
      - Synchronize clocks with exchange using PTP (Precision Time Protocol)<br>
      - Retain logs per regulatory requirements (7 years for SEC)<br><br>

      <strong>Edge Case - Split Brain:</strong> If proxy cluster partitions, use fencing tokens to ensure only one proxy can submit orders. Invalid tokens rejected by exchange.
    </div>
  </div>
</div>

---

## Caching Proxy

### Concept and Motivation

A Caching Proxy stores the results of expensive operations and returns cached results for subsequent identical requests. This implements [[Memoization]](/topic/algorithms/memoization) at the service boundary, trading memory for performance.

<div style="background: linear-gradient(135deg, #232526 0%, #414345 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #2ecc71;">
  <div style="color: #2ecc71; font-weight: 600; margin-bottom: 0.75rem;">Caching Trade-off</div>
  <div style="color: #ddd; line-height: 1.6;">
    Caching introduces the fundamental trade-off between <strong>freshness</strong> and <strong>performance</strong>. Cached data may be stale, and the cache itself consumes memory. The cache is only beneficial when: (hit_rate * fetch_cost) > (cache_overhead + staleness_cost).
  </div>
</div>

### Internal Mechanisms

**Cache Key Generation**: The proxy must generate consistent, unique keys from method arguments. This requires handling: object identity vs. equality, argument ordering, null handling, and potentially request context.

**Eviction Policies**: When cache is full, decisions must be made about what to remove. Common policies: LRU (Least Recently Used), LFU (Least Frequently Used), TTL (Time To Live), or size-based eviction.

**Cache Invalidation**: The hardest problem in computer science. Strategies include: TTL-based expiration, explicit invalidation on writes, cache-aside pattern, or event-driven invalidation via [[Pub/Sub]](/topic/distributed-systems/pub-sub).

**Consistency Models**: Decide on guarantees: strong consistency (always fresh, defeats caching purpose), eventual consistency (may read stale), or bounded staleness (fresh within N seconds).

### Implementation - Python with Advanced Features

```python
from abc import ABC, abstractmethod
from typing import Optional, Generic, TypeVar, Callable, Any, Hashable
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from threading import RLock
from collections import OrderedDict
from enum import Enum
import hashlib
import json
import time


T = TypeVar('T')


class EvictionPolicy(Enum):
    LRU = "lru"      # Least Recently Used
    LFU = "lfu"      # Least Frequently Used
    TTL = "ttl"      # Time To Live only
    FIFO = "fifo"    # First In First Out


@dataclass
class CacheEntry(Generic[T]):
    """
    Cache entry with metadata for eviction decisions.
    """
    value: T
    created_at: datetime
    expires_at: Optional[datetime]
    access_count: int = 0
    last_accessed: datetime = field(default_factory=datetime.now)
    size_bytes: int = 0

    def is_expired(self) -> bool:
        if self.expires_at is None:
            return False
        return datetime.now() > self.expires_at

    def touch(self) -> None:
        """Update access metadata."""
        self.access_count += 1
        self.last_accessed = datetime.now()


@dataclass
class CacheStats:
    """Cache performance statistics."""
    hits: int = 0
    misses: int = 0
    evictions: int = 0
    expirations: int = 0
    size_bytes: int = 0
    entry_count: int = 0

    @property
    def hit_rate(self) -> float:
        total = self.hits + self.misses
        return self.hits / total if total > 0 else 0.0

    def __str__(self) -> str:
        return (f"CacheStats(hits={self.hits}, misses={self.misses}, "
                f"hit_rate={self.hit_rate:.2%}, evictions={self.evictions}, "
                f"entries={self.entry_count})")


class Cache(Generic[T]):
    """
    Thread-safe generic cache with configurable eviction.

    Design Decisions:
    1. OrderedDict for O(1) LRU operations
    2. RLock for reentrant locking (methods call each other)
    3. Lazy expiration - check on access, periodic cleanup optional
    4. Size tracking for memory-bounded caches
    """

    def __init__(
        self,
        max_size: int = 1000,
        max_bytes: Optional[int] = None,
        default_ttl: Optional[timedelta] = None,
        eviction_policy: EvictionPolicy = EvictionPolicy.LRU
    ):
        self._cache: OrderedDict[str, CacheEntry[T]] = OrderedDict()
        self._lock = RLock()
        self._max_size = max_size
        self._max_bytes = max_bytes
        self._default_ttl = default_ttl
        self._eviction_policy = eviction_policy
        self._stats = CacheStats()

    def _make_key(self, *args, **kwargs) -> str:
        """Generate cache key from arguments."""
        key_data = {
            "args": args,
            "kwargs": sorted(kwargs.items())
        }
        key_json = json.dumps(key_data, sort_keys=True, default=str)
        return hashlib.sha256(key_json.encode()).hexdigest()[:16]

    def _estimate_size(self, value: Any) -> int:
        """Estimate memory size of value."""
        try:
            return len(json.dumps(value, default=str).encode())
        except:
            return 1000  # Default estimate

    def _evict_if_needed(self) -> None:
        """Evict entries according to policy if over limits."""
        while len(self._cache) >= self._max_size:
            self._evict_one()

        if self._max_bytes:
            while self._stats.size_bytes > self._max_bytes and self._cache:
                self._evict_one()

    def _evict_one(self) -> None:
        """Evict single entry based on policy."""
        if not self._cache:
            return

        if self._eviction_policy == EvictionPolicy.LRU:
            # OrderedDict maintains insertion order; move_to_end on access
            key = next(iter(self._cache))
        elif self._eviction_policy == EvictionPolicy.LFU:
            # Find least frequently used
            key = min(self._cache.keys(),
                     key=lambda k: self._cache[k].access_count)
        elif self._eviction_policy == EvictionPolicy.FIFO:
            key = next(iter(self._cache))
        else:  # TTL - evict oldest
            key = min(self._cache.keys(),
                     key=lambda k: self._cache[k].created_at)

        entry = self._cache.pop(key)
        self._stats.evictions += 1
        self._stats.size_bytes -= entry.size_bytes
        self._stats.entry_count -= 1

    def get(self, key: str) -> Optional[T]:
        """Get value from cache, None if not found or expired."""
        with self._lock:
            entry = self._cache.get(key)

            if entry is None:
                self._stats.misses += 1
                return None

            if entry.is_expired():
                self._cache.pop(key)
                self._stats.expirations += 1
                self._stats.size_bytes -= entry.size_bytes
                self._stats.entry_count -= 1
                self._stats.misses += 1
                return None

            # Update access metadata
            entry.touch()

            # Move to end for LRU
            if self._eviction_policy == EvictionPolicy.LRU:
                self._cache.move_to_end(key)

            self._stats.hits += 1
            return entry.value

    def set(
        self,
        key: str,
        value: T,
        ttl: Optional[timedelta] = None
    ) -> None:
        """Store value in cache."""
        with self._lock:
            # Remove existing entry if present
            if key in self._cache:
                old_entry = self._cache.pop(key)
                self._stats.size_bytes -= old_entry.size_bytes
                self._stats.entry_count -= 1

            # Create new entry
            effective_ttl = ttl or self._default_ttl
            expires_at = datetime.now() + effective_ttl if effective_ttl else None
            size = self._estimate_size(value)

            entry = CacheEntry(
                value=value,
                created_at=datetime.now(),
                expires_at=expires_at,
                size_bytes=size
            )

            # Evict if needed before adding
            self._evict_if_needed()

            self._cache[key] = entry
            self._stats.size_bytes += size
            self._stats.entry_count += 1

    def invalidate(self, key: str) -> bool:
        """Remove specific entry. Returns True if existed."""
        with self._lock:
            if key in self._cache:
                entry = self._cache.pop(key)
                self._stats.size_bytes -= entry.size_bytes
                self._stats.entry_count -= 1
                return True
            return False

    def clear(self) -> None:
        """Remove all entries."""
        with self._lock:
            self._cache.clear()
            self._stats.size_bytes = 0
            self._stats.entry_count = 0

    def get_stats(self) -> CacheStats:
        """Return copy of statistics."""
        with self._lock:
            return CacheStats(
                hits=self._stats.hits,
                misses=self._stats.misses,
                evictions=self._stats.evictions,
                expirations=self._stats.expirations,
                size_bytes=self._stats.size_bytes,
                entry_count=self._stats.entry_count
            )


# Subject interface
class WeatherService(ABC):
    @abstractmethod
    def get_current_weather(self, city: str) -> dict:
        pass

    @abstractmethod
    def get_forecast(self, city: str, days: int) -> list[dict]:
        pass

    @abstractmethod
    def get_historical(self, city: str, date: str) -> dict:
        pass


class RealWeatherService(WeatherService):
    """Simulates expensive weather API calls."""

    def __init__(self, api_latency_ms: int = 500):
        self._latency = api_latency_ms / 1000

    def _simulate_api_call(self, operation: str) -> None:
        print(f"[WeatherAPI] Calling external API: {operation}")
        time.sleep(self._latency)

    def get_current_weather(self, city: str) -> dict:
        self._simulate_api_call(f"current/{city}")
        return {
            "city": city,
            "temperature": 22.5,
            "humidity": 65,
            "conditions": "partly_cloudy",
            "timestamp": datetime.now().isoformat()
        }

    def get_forecast(self, city: str, days: int) -> list[dict]:
        self._simulate_api_call(f"forecast/{city}?days={days}")
        return [
            {"day": i, "high": 25 + i, "low": 15 + i, "conditions": "sunny"}
            for i in range(days)
        ]

    def get_historical(self, city: str, date: str) -> dict:
        self._simulate_api_call(f"historical/{city}/{date}")
        return {
            "city": city,
            "date": date,
            "temperature": 20.0,
            "conditions": "clear"
        }


class CachingWeatherProxy(WeatherService):
    """
    Caching proxy with operation-specific TTLs.

    Cache Strategy:
    - Current weather: Short TTL (5 min) - changes frequently
    - Forecast: Medium TTL (1 hour) - updates periodically
    - Historical: Long TTL (24 hours) - data doesn't change

    Trade-offs:
    - Pro: Reduces API calls and latency dramatically
    - Pro: Provides resilience during API outages (stale-while-revalidate)
    - Con: May serve stale data
    - Con: Memory overhead for cache
    """

    def __init__(self, service: WeatherService):
        self._service = service
        self._cache = Cache[Any](
            max_size=10000,
            eviction_policy=EvictionPolicy.LRU
        )

        # Operation-specific TTLs
        self._ttl_current = timedelta(minutes=5)
        self._ttl_forecast = timedelta(hours=1)
        self._ttl_historical = timedelta(hours=24)

    def _cache_key(self, operation: str, *args, **kwargs) -> str:
        """Generate unique cache key for operation."""
        key_parts = [operation] + [str(a) for a in args]
        key_parts.extend(f"{k}={v}" for k, v in sorted(kwargs.items()))
        return ":".join(key_parts)

    def get_current_weather(self, city: str) -> dict:
        key = self._cache_key("current", city)

        # Check cache
        cached = self._cache.get(key)
        if cached is not None:
            print(f"[Cache] HIT for current weather: {city}")
            return cached

        print(f"[Cache] MISS for current weather: {city}")
        result = self._service.get_current_weather(city)
        self._cache.set(key, result, self._ttl_current)
        return result

    def get_forecast(self, city: str, days: int) -> list[dict]:
        key = self._cache_key("forecast", city, days=days)

        cached = self._cache.get(key)
        if cached is not None:
            print(f"[Cache] HIT for forecast: {city}, {days} days")
            return cached

        print(f"[Cache] MISS for forecast: {city}, {days} days")
        result = self._service.get_forecast(city, days)
        self._cache.set(key, result, self._ttl_forecast)
        return result

    def get_historical(self, city: str, date: str) -> dict:
        key = self._cache_key("historical", city, date)

        cached = self._cache.get(key)
        if cached is not None:
            print(f"[Cache] HIT for historical: {city}, {date}")
            return cached

        print(f"[Cache] MISS for historical: {city}, {date}")
        result = self._service.get_historical(city, date)
        self._cache.set(key, result, self._ttl_historical)
        return result

    def invalidate_city(self, city: str) -> None:
        """Invalidate all cached data for a city."""
        # In production, would use pattern-based invalidation
        self._cache.invalidate(self._cache_key("current", city))
        print(f"[Cache] Invalidated data for {city}")

    def get_stats(self) -> CacheStats:
        return self._cache.get_stats()


# Usage demonstration
if __name__ == "__main__":
    real_service = RealWeatherService(api_latency_ms=200)
    cached_service = CachingWeatherProxy(real_service)

    print("=== First Requests (Cache Misses) ===")
    start = time.time()
    cached_service.get_current_weather("London")
    cached_service.get_forecast("London", 5)
    print(f"Time: {time.time() - start:.3f}s\n")

    print("=== Repeated Requests (Cache Hits) ===")
    start = time.time()
    for _ in range(10):
        cached_service.get_current_weather("London")
        cached_service.get_forecast("London", 5)
    print(f"Time for 10 iterations: {time.time() - start:.3f}s\n")

    print("=== Cache Statistics ===")
    print(cached_service.get_stats())
```

### Interview Questions - Caching Proxy

<div style="background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%); border-radius: 16px; padding: 2rem; margin: 2rem 0;">
  <div style="color: #f39c12; font-weight: 700; font-size: 1.1rem; margin-bottom: 1.5rem;">Level 1: Fundamentals</div>

  <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
    <div style="color: #3498db; font-weight: 600;">Q: What are the main cache invalidation strategies and when would you use each?</div>
    <div style="color: #bbb; margin-top: 0.75rem; line-height: 1.6;">
      <strong style="color: #2ecc71;">A:</strong><br><br>
      <strong>1. Time-based (TTL):</strong> Entries expire after fixed duration. Use when data changes predictably (weather updates every 5 min) or staleness is acceptable within bounds.<br><br>
      <strong>2. Write-through:</strong> Update cache on every write to underlying data. Use when writes are infrequent and you need strong consistency.<br><br>
      <strong>3. Write-behind (write-back):</strong> Update cache immediately, sync to storage asynchronously. Use for write-heavy workloads where temporary inconsistency is acceptable.<br><br>
      <strong>4. Cache-aside (lazy loading):</strong> Application manages cache explicitly. Use when you need fine-grained control over what gets cached.<br><br>
      <strong>5. Event-driven:</strong> Invalidate on events (message queue). Use in distributed systems where data sources can publish change events.
    </div>
  </div>

  <div style="color: #e74c3c; font-weight: 700; font-size: 1.1rem; margin: 1.5rem 0 1rem;">Level 2: Implementation Depth</div>

  <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
    <div style="color: #3498db; font-weight: 600;">Q: How do you handle the "thundering herd" problem in caching proxies?</div>
    <div style="color: #bbb; margin-top: 0.75rem; line-height: 1.6;">
      <strong style="color: #2ecc71;">A:</strong> Thundering herd occurs when a popular cache entry expires and many concurrent requests all try to regenerate it simultaneously, overwhelming the backend.<br><br>
      <strong>Solutions:</strong><br><br>
      <strong>1. Request Coalescing (Singleflight):</strong> Only one request fetches fresh data; others wait for result. Implement with a lock per key or a promise/future that others await.<br><br>
      <strong>2. Probabilistic Early Expiration:</strong> Randomly expire entries slightly before TTL. Spreads regeneration over time. Implementation: if (now > expires - random(0, grace_period)) then refresh.<br><br>
      <strong>3. Background Refresh:</strong> Refresh cache entries before they expire using background workers. Entries never actually expire from client perspective.<br><br>
      <strong>4. Stale-While-Revalidate:</strong> Return stale data immediately while fetching fresh data in background. Client gets fast response; next request gets fresh data.<br><br>
      <strong>5. Lock with Timeout:</strong> First requester gets lock to refresh; others either wait (bounded time) or get stale data. Prevents indefinite blocking.
    </div>
  </div>

  <div style="color: #9b59b6; font-weight: 700; font-size: 1.1rem; margin: 1.5rem 0 1rem;">Level 3: Architecture and Edge Cases</div>

  <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem;">
    <div style="color: #3498db; font-weight: 600;">Q: Design a distributed caching proxy layer for a global e-commerce platform that handles: (1) inventory counts that must never oversell, (2) product catalog with millions of items, (3) user sessions across regions, and (4) flash sales with 100x traffic spikes.</div>
    <div style="color: #bbb; margin-top: 0.75rem; line-height: 1.6;">
      <strong style="color: #2ecc71;">A:</strong><br><br>
      <strong>1. Inventory (Strong Consistency Required):</strong><br>
      - DON'T cache actual counts - cache only decrements with atomic operations<br>
      - Use Redis DECR with check: if result < 0, INCR back and reject<br>
      - Or: Reserve inventory in cache, confirm with DB async<br>
      - Write-through to DB for durability<br>
      - Single authoritative region per SKU (shard by product ID)<br><br>

      <strong>2. Product Catalog (Read-Heavy):</strong><br>
      - Multi-tier: L1 (local, 1 min TTL), L2 (regional Redis, 10 min), L3 (origin)<br>
      - Millions of items: Use consistent hashing to distribute across cache cluster<br>
      - Precompute popular items during off-peak; lazy-load long tail<br>
      - CDN edge caching for product images and static data<br>
      - Event-driven invalidation from catalog management system<br><br>

      <strong>3. User Sessions (Geo-Distributed):</strong><br>
      - Sticky sessions to one region (route by user ID hash)<br>
      - Or: Replicate session to all regions with eventual consistency<br>
      - Use session token to identify authoritative region<br>
      - Implement session handoff protocol for region changes<br>
      - TTL with sliding expiration; touch on every request<br><br>

      <strong>4. Flash Sales (Traffic Spikes):</strong><br>
      - Pre-warm caches before sale starts<br>
      - Request coalescing to prevent thundering herd<br>
      - Rate limiting per user at edge<br>
      - Queue-based architecture: accept requests into queue, process async<br>
      - Degrade gracefully: cache "sold out" status aggressively<br>
      - Auto-scale cache cluster based on metrics; pre-scale before known events<br><br>

      <strong>Edge Case - Cache Stampede After Flash Sale:</strong> When sale ends and restrictions lift, cached "sold out" entries expire simultaneously. Solution: Use randomized TTL or keep "sold out" cached until explicit invalidation.
    </div>
  </div>
</div>

---

## Dynamic Proxy (Runtime Generation)

### Concept and Motivation

Dynamic Proxies are generated at runtime rather than compile time, allowing a single proxy implementation to handle any interface. This enables [[Aspect-Oriented Programming]](/topic/design-patterns/aop) patterns where cross-cutting concerns are applied uniformly across many classes.

<div style="background: linear-gradient(135deg, #232526 0%, #414345 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #f39c12;">
  <div style="color: #f39c12; font-weight: 600; margin-bottom: 0.75rem;">Metaprogramming Trade-off</div>
  <div style="color: #ddd; line-height: 1.6;">
    Dynamic proxies trade compile-time safety for runtime flexibility. Type errors that static proxies catch at compile time become runtime errors. The indirection also makes debugging and stack traces more complex.
  </div>
</div>

### Internal Mechanisms

**Reflection-Based Interception**: Dynamic proxies intercept method calls using reflection. The proxy receives method name, argument types, and values, decides what to do, and optionally delegates to the real object.

**Bytecode Generation**: Languages like Java use bytecode generation (java.lang.reflect.Proxy or libraries like cglib/ByteBuddy) to create proxy classes at runtime that implement specified interfaces.

**Protocol-Based Proxies**: Python and Ruby use protocols (__getattr__, method_missing) to intercept arbitrary attribute access, enabling proxies without explicit interfaces.

### Implementation - Python with Full Dynamic Proxy

```python
from typing import Any, Callable, Optional, TypeVar, Generic, Protocol
from functools import wraps
from dataclasses import dataclass, field
from datetime import datetime
import inspect
import time
import threading

T = TypeVar('T')


@dataclass
class MethodInvocation:
    """
    Captures all information about a method invocation.
    Enables sophisticated interception logic.
    """
    target: Any
    method_name: str
    args: tuple
    kwargs: dict
    method: Callable
    timestamp: datetime = field(default_factory=datetime.now)

    def proceed(self) -> Any:
        """Execute the original method."""
        return self.method(*self.args, **self.kwargs)

    def get_signature(self) -> str:
        """Human-readable method signature."""
        arg_strs = [repr(a) for a in self.args]
        arg_strs.extend(f"{k}={v!r}" for k, v in self.kwargs.items())
        return f"{self.method_name}({', '.join(arg_strs)})"


class InvocationHandler(Protocol):
    """
    Protocol for handling intercepted method calls.
    Similar to Java's InvocationHandler.
    """
    def invoke(self, invocation: MethodInvocation) -> Any:
        ...


class LoggingHandler:
    """Handler that logs all method invocations."""

    def __init__(self, log_args: bool = True, log_result: bool = True):
        self._log_args = log_args
        self._log_result = log_result

    def invoke(self, invocation: MethodInvocation) -> Any:
        # Log entry
        sig = invocation.get_signature() if self._log_args else invocation.method_name
        print(f"[LOG] Entering: {sig}")

        start = time.time()
        try:
            result = invocation.proceed()
            elapsed = time.time() - start

            # Log success
            result_str = repr(result)[:100] if self._log_result else "<hidden>"
            print(f"[LOG] Exiting: {invocation.method_name} "
                  f"({elapsed:.3f}s) -> {result_str}")
            return result

        except Exception as e:
            elapsed = time.time() - start
            print(f"[LOG] Exception in {invocation.method_name} "
                  f"({elapsed:.3f}s): {type(e).__name__}: {e}")
            raise


class TimingHandler:
    """Handler that tracks method execution times."""

    def __init__(self):
        self._timings: dict[str, list[float]] = {}
        self._lock = threading.Lock()

    def invoke(self, invocation: MethodInvocation) -> Any:
        start = time.time()
        try:
            return invocation.proceed()
        finally:
            elapsed = time.time() - start
            with self._lock:
                if invocation.method_name not in self._timings:
                    self._timings[invocation.method_name] = []
                self._timings[invocation.method_name].append(elapsed)

    def get_stats(self) -> dict[str, dict[str, float]]:
        """Get timing statistics per method."""
        with self._lock:
            stats = {}
            for method, times in self._timings.items():
                stats[method] = {
                    "count": len(times),
                    "total": sum(times),
                    "mean": sum(times) / len(times),
                    "min": min(times),
                    "max": max(times)
                }
            return stats


class RetryHandler:
    """
    Handler that retries failed method calls.

    Design Decisions:
    1. Only retry on specified exception types
    2. Exponential backoff with jitter
    3. Preserve original exception if all retries fail
    """

    def __init__(
        self,
        max_retries: int = 3,
        retry_exceptions: tuple = (Exception,),
        base_delay: float = 0.1
    ):
        self._max_retries = max_retries
        self._retry_exceptions = retry_exceptions
        self._base_delay = base_delay

    def invoke(self, invocation: MethodInvocation) -> Any:
        last_exception = None

        for attempt in range(self._max_retries + 1):
            try:
                return invocation.proceed()
            except self._retry_exceptions as e:
                last_exception = e
                if attempt < self._max_retries:
                    delay = self._base_delay * (2 ** attempt)
                    print(f"[RETRY] Attempt {attempt + 1} failed, "
                          f"retrying in {delay:.2f}s: {e}")
                    time.sleep(delay)

        raise last_exception


class CachingHandler:
    """Handler that caches method results."""

    def __init__(self, ttl_seconds: float = 60):
        self._cache: dict[str, tuple[Any, float]] = {}
        self._ttl = ttl_seconds
        self._lock = threading.Lock()

    def _make_key(self, invocation: MethodInvocation) -> str:
        """Create cache key from method and arguments."""
        return f"{invocation.method_name}:{invocation.args}:{invocation.kwargs}"

    def invoke(self, invocation: MethodInvocation) -> Any:
        key = self._make_key(invocation)

        with self._lock:
            if key in self._cache:
                value, expiry = self._cache[key]
                if time.time() < expiry:
                    print(f"[CACHE] Hit: {invocation.method_name}")
                    return value
                del self._cache[key]

        print(f"[CACHE] Miss: {invocation.method_name}")
        result = invocation.proceed()

        with self._lock:
            self._cache[key] = (result, time.time() + self._ttl)

        return result


class CompositeHandler:
    """
    Chains multiple handlers together.
    Forms an interceptor chain similar to servlet filters.
    """

    def __init__(self, handlers: list[InvocationHandler]):
        self._handlers = handlers

    def invoke(self, invocation: MethodInvocation) -> Any:
        """
        Execute handlers in order, wrapping each around the next.
        Creates a pipeline: handler1 -> handler2 -> ... -> actual method
        """
        if not self._handlers:
            return invocation.proceed()

        def create_chain(handlers: list, original_proceed: Callable) -> Callable:
            if not handlers:
                return original_proceed

            handler = handlers[0]
            rest = handlers[1:]

            def chained_proceed():
                # Create a modified invocation that proceeds to next handler
                next_proceed = create_chain(rest, original_proceed)
                modified_invocation = MethodInvocation(
                    target=invocation.target,
                    method_name=invocation.method_name,
                    args=invocation.args,
                    kwargs=invocation.kwargs,
                    method=lambda *a, **k: next_proceed(),
                    timestamp=invocation.timestamp
                )
                return handler.invoke(modified_invocation)

            return chained_proceed

        chain = create_chain(self._handlers, invocation.proceed)
        return chain()


class DynamicProxy(Generic[T]):
    """
    Dynamic proxy that intercepts all method calls.

    Implementation Notes:
    - Uses __getattr__ to intercept attribute access
    - Creates wrapper functions that build MethodInvocation
    - Preserves method signatures and docstrings where possible

    Limitations:
    - Cannot intercept __dunder__ methods (Python limitation)
    - No compile-time type checking on proxy
    - Slight overhead per method call
    """

    def __init__(self, target: T, handler: InvocationHandler):
        # Use object.__setattr__ to avoid triggering __getattr__
        object.__setattr__(self, '_target', target)
        object.__setattr__(self, '_handler', handler)
        object.__setattr__(self, '_method_cache', {})

    def __getattr__(self, name: str) -> Any:
        target = object.__getattribute__(self, '_target')
        handler = object.__getattribute__(self, '_handler')
        cache = object.__getattribute__(self, '_method_cache')

        # Get attribute from target
        attr = getattr(target, name)

        # If not callable, return directly (property access)
        if not callable(attr):
            return attr

        # Check cache for wrapped method
        if name in cache:
            return cache[name]

        # Create wrapped method
        @wraps(attr)
        def wrapper(*args, **kwargs):
            invocation = MethodInvocation(
                target=target,
                method_name=name,
                args=args,
                kwargs=kwargs,
                method=attr
            )
            return handler.invoke(invocation)

        cache[name] = wrapper
        return wrapper

    def __repr__(self) -> str:
        target = object.__getattribute__(self, '_target')
        return f"DynamicProxy({target!r})"


# Factory function for creating proxies
def create_proxy(
    target: T,
    *,
    logging: bool = False,
    timing: bool = False,
    caching: bool = False,
    cache_ttl: float = 60,
    retry: bool = False,
    max_retries: int = 3
) -> T:
    """
    Factory function to create a proxy with common handlers.

    Example:
        service = create_proxy(
            RealService(),
            logging=True,
            caching=True,
            retry=True
        )
    """
    handlers = []

    # Order matters: logging should be outermost to see all calls
    if logging:
        handlers.append(LoggingHandler())

    if timing:
        handlers.append(TimingHandler())

    if retry:
        handlers.append(RetryHandler(max_retries=max_retries))

    if caching:
        handlers.append(CachingHandler(ttl_seconds=cache_ttl))

    if not handlers:
        return target

    handler = CompositeHandler(handlers) if len(handlers) > 1 else handlers[0]
    return DynamicProxy(target, handler)


# Example usage
class Calculator:
    """Example service class."""

    def add(self, a: int, b: int) -> int:
        """Add two numbers."""
        return a + b

    def divide(self, a: int, b: int) -> float:
        """Divide a by b."""
        if b == 0:
            raise ValueError("Division by zero")
        return a / b

    def slow_operation(self, n: int) -> int:
        """Simulates slow computation."""
        time.sleep(0.1)
        return n * 2


if __name__ == "__main__":
    # Create proxied calculator with multiple handlers
    calc = create_proxy(
        Calculator(),
        logging=True,
        caching=True,
        retry=True
    )

    print("=== Basic Operations ===")
    print(f"add(2, 3) = {calc.add(2, 3)}")
    print(f"divide(10, 2) = {calc.divide(10, 2)}")

    print("\n=== Cached Operation ===")
    print(f"slow_operation(5) = {calc.slow_operation(5)}")  # Cache miss
    print(f"slow_operation(5) = {calc.slow_operation(5)}")  # Cache hit

    print("\n=== Error Handling ===")
    try:
        calc.divide(1, 0)
    except ValueError as e:
        print(f"Caught: {e}")
```

### Interview Questions - Dynamic Proxy

<div style="background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%); border-radius: 16px; padding: 2rem; margin: 2rem 0;">
  <div style="color: #f39c12; font-weight: 700; font-size: 1.1rem; margin-bottom: 1.5rem;">Level 1: Fundamentals</div>

  <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
    <div style="color: #3498db; font-weight: 600;">Q: What are the advantages and disadvantages of dynamic proxies compared to static proxies?</div>
    <div style="color: #bbb; margin-top: 0.75rem; line-height: 1.6;">
      <strong style="color: #2ecc71;">A:</strong><br><br>
      <strong>Advantages of Dynamic Proxies:</strong><br>
      - Single implementation handles any interface (reduces boilerplate)<br>
      - Can add behavior to classes without source code access<br>
      - Enables runtime composition of behaviors<br>
      - Foundation for AOP frameworks<br><br>

      <strong>Disadvantages:</strong><br>
      - No compile-time type checking<br>
      - Runtime overhead from reflection<br>
      - More complex debugging (stack traces include proxy machinery)<br>
      - Cannot proxy final classes/methods in some languages<br>
      - Magic behavior can surprise developers
    </div>
  </div>

  <div style="color: #e74c3c; font-weight: 700; font-size: 1.1rem; margin: 1.5rem 0 1rem;">Level 2: Implementation Depth</div>

  <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
    <div style="color: #3498db; font-weight: 600;">Q: How does Java's Proxy.newProxyInstance() work internally, and what are its limitations?</div>
    <div style="color: #bbb; margin-top: 0.75rem; line-height: 1.6;">
      <strong style="color: #2ecc71;">A:</strong><br><br>
      <strong>Internal Mechanism:</strong><br>
      1. Generates a new class at runtime implementing specified interfaces<br>
      2. Uses sun.misc.ProxyGenerator to emit bytecode<br>
      3. Generated class has a field holding the InvocationHandler<br>
      4. Each interface method is implemented to call handler.invoke()<br>
      5. Class is loaded via specified ClassLoader<br>
      6. Instance is created and returned<br><br>

      <strong>Limitations:</strong><br>
      - <strong>Interfaces only:</strong> Cannot proxy concrete classes (need cglib/ByteBuddy)<br>
      - <strong>Final methods:</strong> Cannot intercept final methods<br>
      - <strong>Private methods:</strong> Not intercepted (not part of interface)<br>
      - <strong>Self-invocation:</strong> If proxied method calls another method on this, that call bypasses proxy<br>
      - <strong>ClassLoader issues:</strong> Proxy must be loaded by ClassLoader that can see all interfaces<br><br>

      <strong>Self-invocation Example:</strong><br>
      <code>void methodA() { methodB(); }</code> - call to methodB() goes directly to implementation, not through proxy. Solution: inject proxy reference and call through it.
    </div>
  </div>

  <div style="color: #9b59b6; font-weight: 700; font-size: 1.1rem; margin: 1.5rem 0 1rem;">Level 3: Architecture and Edge Cases</div>

  <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1rem;">
    <div style="color: #3498db; font-weight: 600;">Q: Design a dynamic proxy system for a microservices framework that provides: (1) automatic service discovery and load balancing, (2) circuit breaker with health checking, (3) distributed tracing correlation, and (4) automatic retries with idempotency detection.</div>
    <div style="color: #bbb; margin-top: 0.75rem; line-height: 1.6;">
      <strong style="color: #2ecc71;">A:</strong><br><br>
      <strong>1. Service Discovery + Load Balancing Handler:</strong><br>
      - Inject ServiceRegistry that returns list of endpoints<br>
      - On each call, resolve service name to endpoints<br>
      - Implement load balancing strategy (round-robin, least-connections, weighted)<br>
      - Cache resolution with short TTL; subscribe to registry updates<br>
      - Remove failed endpoints from rotation temporarily<br><br>

      <strong>2. Circuit Breaker Handler:</strong><br>
      - Per-endpoint circuit breaker state (closed/open/half-open)<br>
      - Track success/failure rates in sliding window<br>
      - Open circuit after threshold failures; reject fast<br>
      - Half-open: allow single probe request periodically<br>
      - Health check endpoint: call /health in background to detect recovery<br>
      - Integrate with service discovery to mark unhealthy instances<br><br>

      <strong>3. Distributed Tracing Handler:</strong><br>
      - Extract or create trace context (trace ID, span ID, parent span ID)<br>
      - Create new span for outgoing call<br>
      - Inject trace headers into request (B3 format or W3C TraceContext)<br>
      - Record timing, status code, error info<br>
      - Propagate baggage items (user ID, tenant ID)<br>
      - Report to collector (Jaeger, Zipkin) async<br><br>

      <strong>4. Idempotency-Aware Retry:</strong><br>
      - Inspect method annotations or naming convention for idempotency<br>
      - For non-idempotent methods, generate idempotency key from args<br>
      - Send key in header; server deduplicates<br>
      - Only retry if server confirms request wasn't processed<br>
      - For reads (GET): always safe to retry<br>
      - For writes: check response - 409 Conflict means already processed<br><br>

      <strong>Handler Chain Order:</strong><br>
      Tracing (outermost) -> Circuit Breaker -> Retry -> Load Balancer -> Network<br><br>

      <strong>Edge Case - Retry After Partial Success:</strong> If request succeeds but response lost, retry might get "already exists" error. Handler should detect this (409 status, specific error code) and treat as success, potentially fetching the created resource to return.
    </div>
  </div>
</div>

---

## Comparison Matrix

<div style="overflow-x: auto; margin: 2rem 0;">
  <table style="width: 100%; border-collapse: collapse; font-family: system-ui, sans-serif; font-size: 0.9rem;">
    <thead>
      <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <th style="padding: 1rem; text-align: left; color: white; border: 1px solid #444;">Proxy Type</th>
        <th style="padding: 1rem; text-align: left; color: white; border: 1px solid #444;">Primary Purpose</th>
        <th style="padding: 1rem; text-align: left; color: white; border: 1px solid #444;">When to Use</th>
        <th style="padding: 1rem; text-align: left; color: white; border: 1px solid #444;">Key Trade-off</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background: #1a1a2e;">
        <td style="padding: 0.75rem; border: 1px solid #444; color: #4ecdc4; font-weight: 600;">Virtual</td>
        <td style="padding: 0.75rem; border: 1px solid #444; color: #ddd;">Defer expensive initialization</td>
        <td style="padding: 0.75rem; border: 1px solid #444; color: #ddd;">Heavy objects that may not be used</td>
        <td style="padding: 0.75rem; border: 1px solid #444; color: #ddd;">Memory vs. latency on first access</td>
      </tr>
      <tr style="background: #16213e;">
        <td style="padding: 0.75rem; border: 1px solid #444; color: #e74c3c; font-weight: 600;">Protection</td>
        <td style="padding: 0.75rem; border: 1px solid #444; color: #ddd;">Access control enforcement</td>
        <td style="padding: 0.75rem; border: 1px solid #444; color: #ddd;">Fine-grained security at object level</td>
        <td style="padding: 0.75rem; border: 1px solid #444; color: #ddd;">Security vs. performance overhead</td>
      </tr>
      <tr style="background: #1a1a2e;">
        <td style="padding: 0.75rem; border: 1px solid #444; color: #9b59b6; font-weight: 600;">Remote</td>
        <td style="padding: 0.75rem; border: 1px solid #444; color: #ddd;">Location transparency</td>
        <td style="padding: 0.75rem; border: 1px solid #444; color: #ddd;">Distributed systems, RPC</td>
        <td style="padding: 0.75rem; border: 1px solid #444; color: #ddd;">Abstraction vs. hidden complexity</td>
      </tr>
      <tr style="background: #16213e;">
        <td style="padding: 0.75rem; border: 1px solid #444; color: #2ecc71; font-weight: 600;">Caching</td>
        <td style="padding: 0.75rem; border: 1px solid #444; color: #ddd;">Store and reuse results</td>
        <td style="padding: 0.75rem; border: 1px solid #444; color: #ddd;">Expensive, repeatable operations</td>
        <td style="padding: 0.75rem; border: 1px solid #444; color: #ddd;">Freshness vs. performance</td>
      </tr>
      <tr style="background: #1a1a2e;">
        <td style="padding: 0.75rem; border: 1px solid #444; color: #f39c12; font-weight: 600;">Dynamic</td>
        <td style="padding: 0.75rem; border: 1px solid #444; color: #ddd;">Runtime behavior injection</td>
        <td style="padding: 0.75rem; border: 1px solid #444; color: #ddd;">AOP, frameworks, generic handling</td>
        <td style="padding: 0.75rem; border: 1px solid #444; color: #ddd;">Flexibility vs. type safety</td>
      </tr>
    </tbody>
  </table>
</div>

---

## Related Patterns

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 1.5rem; border: 1px solid #3498db;">
    <div style="color: #3498db; font-weight: 700; font-size: 1.1rem; margin-bottom: 0.75rem;">Decorator</div>
    <div style="color: #bbb; line-height: 1.6; font-size: 0.9rem;">
      <strong>Similarity:</strong> Both wrap objects and implement same interface.<br>
      <strong>Difference:</strong> Decorator adds functionality; Proxy controls access. Decorators are typically stackable; Proxies usually aren't.
    </div>
    <div style="margin-top: 0.75rem;">
      <a href="/topic/design-patterns/decorator" style="color: #3498db; text-decoration: none;">[[Decorator Pattern]] &rarr;</a>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 1.5rem; border: 1px solid #e74c3c;">
    <div style="color: #e74c3c; font-weight: 700; font-size: 1.1rem; margin-bottom: 0.75rem;">Adapter</div>
    <div style="color: #bbb; line-height: 1.6; font-size: 0.9rem;">
      <strong>Similarity:</strong> Both wrap another object.<br>
      <strong>Difference:</strong> Adapter changes interface; Proxy keeps same interface. Adapter enables incompatible classes to work together.
    </div>
    <div style="margin-top: 0.75rem;">
      <a href="/topic/design-patterns/adapter" style="color: #e74c3c; text-decoration: none;">[[Adapter Pattern]] &rarr;</a>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 1.5rem; border: 1px solid #2ecc71;">
    <div style="color: #2ecc71; font-weight: 700; font-size: 1.1rem; margin-bottom: 0.75rem;">Facade</div>
    <div style="color: #bbb; line-height: 1.6; font-size: 0.9rem;">
      <strong>Similarity:</strong> Both provide intermediary to other code.<br>
      <strong>Difference:</strong> Facade simplifies complex subsystem; Proxy controls access to single object. Facade creates new interface.
    </div>
    <div style="margin-top: 0.75rem;">
      <a href="/topic/design-patterns/facade" style="color: #2ecc71; text-decoration: none;">[[Facade Pattern]] &rarr;</a>
    </div>
  </div>

  <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 1.5rem; border: 1px solid #f39c12;">
    <div style="color: #f39c12; font-weight: 700; font-size: 1.1rem; margin-bottom: 0.75rem;">Flyweight</div>
    <div style="color: #bbb; line-height: 1.6; font-size: 0.9rem;">
      <strong>Relationship:</strong> Virtual proxies can work with Flyweight to share common state across proxied objects while keeping unique state in proxies.
    </div>
    <div style="margin-top: 0.75rem;">
      <a href="/topic/design-patterns/flyweight" style="color: #f39c12; text-decoration: none;">[[Flyweight Pattern]] &rarr;</a>
    </div>
  </div>
</div>

---

## Best Practices and Anti-Patterns

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #1e3a2f 0%, #2d5a47 100%); border-radius: 12px; padding: 1.5rem; border: 1px solid #2ecc71;">
    <div style="color: #2ecc71; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">Best Practices</div>
    <ul style="color: #bbb; line-height: 1.8; padding-left: 1.25rem; margin: 0;">
      <li><strong>Single Responsibility:</strong> Each proxy should have one purpose</li>
      <li><strong>Interface Fidelity:</strong> Proxy must exactly match subject interface</li>
      <li><strong>Transparent Failures:</strong> Don't swallow exceptions silently</li>
      <li><strong>Document Behavior:</strong> Make proxy semantics clear to users</li>
      <li><strong>Allow Bypass:</strong> Provide access to unwrapped object when needed</li>
      <li><strong>Consider Thread Safety:</strong> Especially for caching and lazy init</li>
    </ul>
  </div>

  <div style="background: linear-gradient(135deg, #3a1e1e 0%, #5a2d2d 100%); border-radius: 12px; padding: 1.5rem; border: 1px solid #e74c3c;">
    <div style="color: #e74c3c; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">Anti-Patterns</div>
    <ul style="color: #bbb; line-height: 1.8; padding-left: 1.25rem; margin: 0;">
      <li><strong>God Proxy:</strong> Proxy doing too many things (log + cache + auth + ...)</li>
      <li><strong>Hidden Behavior:</strong> Proxy that changes semantics unexpectedly</li>
      <li><strong>Infinite Proxy Chain:</strong> Too many layers of proxies</li>
      <li><strong>Leaky Abstraction:</strong> Proxy-specific exceptions leaking to client</li>
      <li><strong>Identity Confusion:</strong> proxy == realObject should be false</li>
      <li><strong>Ignoring Self-Calls:</strong> Internal calls bypassing proxy logic</li>
    </ul>
  </div>
</div>

---

## Real-World Applications

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 2rem; margin: 2rem 0; border: 1px solid #444;">
  <div style="color: #f39c12; font-weight: 700; font-size: 1.2rem; margin-bottom: 1.5rem;">Industry Examples</div>

  <div style="display: grid; gap: 1.5rem;">
    <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1.25rem;">
      <div style="color: #3498db; font-weight: 600; margin-bottom: 0.5rem;">ORM Lazy Loading (Hibernate, SQLAlchemy)</div>
      <div style="color: #bbb; line-height: 1.6;">Virtual proxies for entity relationships. <code>user.orders</code> returns proxy that loads from database on first access. Prevents N+1 query problem when used with batch fetching.</div>
    </div>

    <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1.25rem;">
      <div style="color: #e74c3c; font-weight: 600; margin-bottom: 0.5rem;">Spring AOP</div>
      <div style="color: #bbb; line-height: 1.6;">Dynamic proxies for transactions, security, logging. <code>@Transactional</code> wraps methods with transaction management. Uses JDK proxies for interfaces, CGLIB for concrete classes.</div>
    </div>

    <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1.25rem;">
      <div style="color: #2ecc71; font-weight: 600; margin-bottom: 0.5rem;">gRPC Client Stubs</div>
      <div style="color: #bbb; line-height: 1.6;">Remote proxies generated from Protocol Buffer definitions. Handles serialization, connection management, retries, load balancing transparently.</div>
    </div>

    <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1.25rem;">
      <div style="color: #9b59b6; font-weight: 600; margin-bottom: 0.5rem;">CDN Edge Caching (Cloudflare, Akamai)</div>
      <div style="color: #bbb; line-height: 1.6;">Caching proxies at network edge. Intercept requests, serve cached content, forward cache misses to origin. Handle cache invalidation, vary headers, stale-while-revalidate.</div>
    </div>

    <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 1.25rem;">
      <div style="color: #f39c12; font-weight: 600; margin-bottom: 0.5rem;">API Gateways (Kong, AWS API Gateway)</div>
      <div style="color: #bbb; line-height: 1.6;">Combines multiple proxy types: protection (auth/rate limiting), remote (routing), caching, logging. Single entry point to microservices with cross-cutting concerns.</div>
    </div>
  </div>
</div>
