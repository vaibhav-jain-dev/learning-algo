# Dependency Injection

## Overview

Dependency Injection (DI) is a design pattern implementing [[Inversion of Control]](/topics/design-patterns/inversion-of-control) where objects receive their dependencies from external sources rather than creating them internally. At its core, DI separates **object construction** from **object use**, enabling the dependent class to remain agnostic about how its collaborators are instantiated, configured, or managed.

**Critical Insight**: DI is not merely about "passing things through constructors." It represents a fundamental architectural decision that inverts the traditional control flow of object creation, moving responsibility from the consumer to an external orchestrator (often called the **composition root**).

## Why This Matters for Interviews

### Industry Prevalence and Expectations

Every major enterprise framework is built around DI: Spring (Java), ASP.NET Core (C#), Angular (TypeScript), NestJS (Node.js), and FastAPI (Python). Interviewers expect candidates to understand not just the "what" but the "why" and "when not to."

### Real-World Stakes

**Uber's Payment System**: Uber uses DI extensively to swap payment processors per region. In India, they inject UPI implementations; in the US, credit card processors. Same business logic, different payment infrastructure.

**Netflix's Chaos Engineering**: Netflix injects fault-tolerant wrappers around services. During chaos experiments, they inject implementations that randomly fail, testing system resilience without modifying business code.

**Google's Testing Infrastructure**: Google's codebase mandates constructor injection. This enables their massive test infrastructure to run millions of tests by injecting lightweight mocks instead of real services.

---

## Constructor Injection vs Setter Injection

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #e2e8f0;">
<div style="text-align: center; margin-bottom: 24px;">
<span style="font-size: 1.4rem; font-weight: 700; color: #1e293b; letter-spacing: -0.5px;">Injection Method Comparison</span>
</div>

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">
<div style="flex: 1; min-width: 280px; background: linear-gradient(145deg, #065f46 0%, #047857 100%); border-radius: 12px; padding: 20px;">
<div style="font-weight: 700; color: #ecfdf5; font-size: 1.1rem; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
<span style="background: #10b981; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem;">PREFERRED</span>
        Constructor Injection
</div>
<div style="color: #d1fae5; font-size: 0.9rem; line-height: 1.6;">
<div style="margin-bottom: 8px;"><strong style="color: #6ee7b7;">Invariant:</strong> Object cannot exist in invalid state</div>
<div style="margin-bottom: 8px;"><strong style="color: #6ee7b7;">Immutability:</strong> Dependencies set once, never change</div>
<div style="margin-bottom: 8px;"><strong style="color: #6ee7b7;">Explicit Contract:</strong> Constructor signature documents requirements</div>
<div style="margin-bottom: 8px;"><strong style="color: #6ee7b7;">Thread Safety:</strong> No synchronization needed after construction</div>
</div>
</div>

<div style="flex: 1; min-width: 280px; background: linear-gradient(145deg, #92400e 0%, #b45309 100%); border-radius: 12px; padding: 20px;">
<div style="font-weight: 700; color: #fef3c7; font-size: 1.1rem; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
<span style="background: #f59e0b; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; color: #451a03;">SITUATIONAL</span>
        Setter Injection
</div>
<div style="color: #fef3c7; font-size: 0.9rem; line-height: 1.6;">
<div style="margin-bottom: 8px;"><strong style="color: #fcd34d;">Optional Dependencies:</strong> Object works without them</div>
<div style="margin-bottom: 8px;"><strong style="color: #fcd34d;">Reconfiguration:</strong> Change dependencies at runtime</div>
<div style="margin-bottom: 8px;"><strong style="color: #fcd34d;">Circular Dependencies:</strong> Can break cycles (workaround)</div>
<div style="margin-bottom: 8px;"><strong style="color: #fcd34d;">Legacy Integration:</strong> When constructors cannot change</div>
</div>
</div>
</div>
</div>

### Constructor Injection: Deep Mechanics

Constructor injection mandates that all required dependencies be provided at object creation time. The object transitions directly from "does not exist" to "fully initialized and valid."

```python
class PaymentProcessor:
    def __init__(
        self,
        gateway: PaymentGateway,          # Required: No payment without gateway
        fraud_detector: FraudDetector,    # Required: Must check fraud
        logger: Logger                     # Required: Must audit all payments
    ):
        # Defensive validation - fail fast
        if gateway is None:
            raise ValueError("PaymentGateway is required")
        if fraud_detector is None:
            raise ValueError("FraudDetector is required")
        if logger is None:
            raise ValueError("Logger is required")

        self._gateway = gateway
        self._fraud_detector = fraud_detector
        self._logger = logger
        # Object is now FULLY initialized - no partial states possible

    def process(self, payment: Payment) -> PaymentResult:
        # Can safely use all dependencies - guaranteed to be present
        self._logger.info(f"Processing payment {payment.id}")
        # ...
```

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
<div style="font-weight: 700; color: #92400e; margin-bottom: 8px;">Key Assumption</div>
<div style="color: #78350f;">Constructor injection assumes dependencies are available at object creation time. In scenarios with complex initialization order or async dependency resolution, this assumption may not hold, requiring alternative patterns like lazy proxies or provider functions.</div>
</div>

### Setter Injection: When and Why

Setter injection should be reserved for **truly optional** dependencies where the object provides meaningful functionality without them.

```python
class ReportGenerator:
    def __init__(self, data_source: DataSource):
        self._data_source = data_source  # Required via constructor
        self._cache = None                # Optional - will work without it
        self._metrics = None              # Optional - will work without it

    def set_cache(self, cache: Cache) -> None:
        """Optional: Enable caching for repeated report generation."""
        self._cache = cache

    def set_metrics(self, metrics: MetricsCollector) -> None:
        """Optional: Enable performance monitoring."""
        self._metrics = metrics

    def generate(self, report_type: str) -> Report:
        # Check cache if available
        if self._cache:
            cached = self._cache.get(report_type)
            if cached:
                return cached

        start = time.time()
        report = self._build_report(report_type)

        # Record metrics if available
        if self._metrics:
            self._metrics.record("report_generation_ms", time.time() - start)

        # Cache if available
        if self._cache:
            self._cache.set(report_type, report)

        return report
```

<div style="background: #fee2e2; border-left: 4px solid #ef4444; padding: 16px 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
<div style="font-weight: 700; color: #991b1b; margin-bottom: 8px;">Trade-off Alert</div>
<div style="color: #7f1d1d;">Setter injection introduces temporal coupling: the order in which setters are called may matter. It also creates mutable objects, complicating thread safety. Every setter is a potential source of bugs if dependencies are changed mid-operation.</div>
</div>

### Interface Injection (Historical Context)

Interface injection, where the dependency itself defines an injection method, is largely obsolete. Understanding it helps when encountering legacy codebases.

```java
// The dependency defines how it should be injected
interface DatabaseAware {
    void injectDatabase(Database db);
}

// Client must implement the interface
class UserRepository implements DatabaseAware {
    private Database db;

    @Override
    public void injectDatabase(Database db) {
        this.db = db;
    }
}
```

This pattern died because it pollutes the client's interface with infrastructure concerns and creates tight coupling to the injection mechanism itself.

### Interview Deep Dive: Constructor vs Setter Injection

**Level 1: Conceptual Understanding**

**Q: When would you choose setter injection over constructor injection?**

A: Setter injection is appropriate for truly optional dependencies that enhance functionality without being essential. Examples include caching layers, metrics collectors, or feature flag services. The key test: "Can this object provide meaningful value without this dependency?" If yes, setter injection is acceptable.

**Level 2: Implementation Challenges**

**Q: How do you handle circular dependencies when using constructor injection?**

A: Circular dependencies often indicate design problems. However, when unavoidable:

1. **Introduce an intermediary**: Extract a third class that both depend on
2. **Use lazy proxies**: Inject a proxy that resolves the real dependency on first use
3. **Event-based decoupling**: Replace direct dependency with events via an event bus
4. **Provider pattern**: Inject a `Provider<T>` or `Lazy<T>` that defers instantiation

```python
# Lazy proxy approach
class LazyServiceA:
    def __init__(self, provider: Callable[[], ServiceA]):
        self._provider = provider
        self._instance = None

    def __getattr__(self, name):
        if self._instance is None:
            self._instance = self._provider()
        return getattr(self._instance, name)

# ServiceB can now receive LazyServiceA in constructor
class ServiceB:
    def __init__(self, service_a: LazyServiceA):
        self._service_a = service_a  # Won't resolve ServiceA yet
```

**Level 3: Architectural Trade-offs**

**Q: A team argues that constructor injection creates "constructor explosion" with too many parameters. How do you address this while maintaining DI principles?**

A: Constructor explosion is a **symptom**, not a problem with DI. It reveals that the class violates the [[Single Responsibility Principle]](/topics/design-patterns/solid-principles). Address this through:

1. **Facade services**: Group related dependencies into a cohesive service
```python
# Before: 8 dependencies
class OrderProcessor:
    def __init__(self, inventory, pricing, tax_calc, discount_engine,
                 shipping_calc, payment, notification, audit):
        ...

# After: Grouped into domain-specific facades
class OrderProcessor:
    def __init__(self, pricing_facade: PricingFacade,
                 fulfillment_facade: FulfillmentFacade,
                 notification_service: NotificationService):
        ...
```

2. **Parameter objects**: When multiple dependencies are always used together
3. **Decomposition**: Split the class into smaller, focused classes

The goal is not to hide dependencies but to properly distribute responsibilities.

---

## DI Containers: Internal Mechanisms

A DI Container (also called IoC Container) automates dependency resolution by maintaining a registry of types and their implementations, building object graphs automatically.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #e2e8f0;">
<div style="text-align: center; margin-bottom: 24px;">
<span style="font-size: 1.3rem; font-weight: 700; color: #1e293b;">DI Container Resolution Pipeline</span>
</div>

<div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
<div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; align-items: center;">
<div style="background: #7c3aed; color: white; padding: 12px 20px; border-radius: 8px; font-weight: 600; text-align: center;">
        Request Type
<div style="font-size: 0.75rem; font-weight: 400; opacity: 0.9;">container.resolve(UserService)</div>
</div>
<div style="color: #64748b; font-size: 1.5rem;">-></div>
<div style="background: #2563eb; color: white; padding: 12px 20px; border-radius: 8px; font-weight: 600; text-align: center;">
        Check Registry
<div style="font-size: 0.75rem; font-weight: 400; opacity: 0.9;">Find registered implementation</div>
</div>
<div style="color: #64748b; font-size: 1.5rem;">-></div>
<div style="background: #0891b2; color: white; padding: 12px 20px; border-radius: 8px; font-weight: 600; text-align: center;">
        Analyze Constructor
<div style="font-size: 0.75rem; font-weight: 400; opacity: 0.9;">Inspect parameter types</div>
</div>
</div>

<div style="color: #64748b; font-size: 1.5rem;">|</div>

<div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; align-items: center;">
<div style="background: #059669; color: white; padding: 12px 20px; border-radius: 8px; font-weight: 600; text-align: center;">
        Resolve Dependencies
<div style="font-size: 0.75rem; font-weight: 400; opacity: 0.9;">Recursively build each param</div>
</div>
<div style="color: #64748b; font-size: 1.5rem;">-></div>
<div style="background: #ca8a04; color: white; padding: 12px 20px; border-radius: 8px; font-weight: 600; text-align: center;">
        Apply Lifecycle
<div style="font-size: 0.75rem; font-weight: 400; opacity: 0.9;">Singleton? Scoped? Transient?</div>
</div>
<div style="color: #64748b; font-size: 1.5rem;">-></div>
<div style="background: #dc2626; color: white; padding: 12px 20px; border-radius: 8px; font-weight: 600; text-align: center;">
        Return Instance
<div style="font-size: 0.75rem; font-weight: 400; opacity: 0.9;">Fully constructed object</div>
</div>
</div>
</div>
</div>

### Lifecycle Management

Containers manage object lifetimes through distinct scopes:

| Lifecycle | Behavior | Use Case | Memory Implication |
|-----------|----------|----------|-------------------|
| **Transient** | New instance every resolution | Stateless services, lightweight objects | Can cause memory pressure if overused |
| **Singleton** | One instance for application lifetime | Shared resources, connection pools | Memory retained for app lifetime |
| **Scoped** | One instance per logical scope (request, transaction) | Database contexts, user sessions | Must properly dispose scope |

```python
class DIContainer:
    def __init__(self):
        self._registry: Dict[Type, Tuple[Type, Lifecycle]] = {}
        self._singletons: Dict[Type, Any] = {}
        self._current_scope: Optional[Dict[Type, Any]] = None

    def register(self, interface: Type, implementation: Type,
                 lifecycle: Lifecycle = Lifecycle.TRANSIENT):
        self._registry[interface] = (implementation, lifecycle)

    def resolve(self, interface: Type) -> Any:
        if interface not in self._registry:
            raise ResolutionError(f"No registration for {interface}")

        impl_class, lifecycle = self._registry[interface]

        # Check singleton cache
        if lifecycle == Lifecycle.SINGLETON:
            if interface in self._singletons:
                return self._singletons[interface]

        # Check scoped cache
        if lifecycle == Lifecycle.SCOPED:
            if self._current_scope is None:
                raise ScopeError("No active scope for scoped resolution")
            if interface in self._current_scope:
                return self._current_scope[interface]

        # Build instance with recursive dependency resolution
        instance = self._build_instance(impl_class)

        # Cache according to lifecycle
        if lifecycle == Lifecycle.SINGLETON:
            self._singletons[interface] = instance
        elif lifecycle == Lifecycle.SCOPED:
            self._current_scope[interface] = instance

        return instance

    def _build_instance(self, impl_class: Type) -> Any:
        """Recursively resolve constructor dependencies."""
        constructor = impl_class.__init__
        params = inspect.signature(constructor).parameters

        dependencies = {}
        for name, param in params.items():
            if name == 'self':
                continue

            param_type = param.annotation
            if param_type == inspect.Parameter.empty:
                raise ResolutionError(
                    f"Cannot resolve untyped parameter '{name}' in {impl_class}"
                )

            # Recursive resolution
            dependencies[name] = self.resolve(param_type)

        return impl_class(**dependencies)

    @contextmanager
    def create_scope(self):
        """Create a new resolution scope."""
        previous_scope = self._current_scope
        self._current_scope = {}
        try:
            yield
        finally:
            # Dispose scoped instances if they implement disposal
            for instance in self._current_scope.values():
                if hasattr(instance, 'dispose'):
                    instance.dispose()
            self._current_scope = previous_scope
```

<div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 8px;">Design Choice</div>
<div style="color: #1e3a8a;">Scoped lifecycle requires explicit scope boundaries. In web frameworks, this typically aligns with HTTP request lifetime. In background workers, you must manually create and dispose scopes. Forgetting to dispose scopes causes memory leaks as scoped instances accumulate.</div>
</div>

### Registration Strategies

**Explicit Registration**: Manual mapping of interfaces to implementations.

```python
container.register(IUserRepository, PostgresUserRepository, Lifecycle.SCOPED)
container.register(IEmailService, SendGridEmailService, Lifecycle.SINGLETON)
```

**Convention-Based Registration**: Auto-register based on naming patterns or attributes.

```python
# Auto-register all classes ending in "Repository" as scoped
for cls in discover_classes("repositories"):
    if cls.__name__.endswith("Repository"):
        interface = find_interface(cls)
        container.register(interface, cls, Lifecycle.SCOPED)
```

**Module-Based Registration**: Group registrations into modules for organization.

```python
class PaymentModule:
    def configure(self, container: Container):
        container.register(IPaymentGateway, StripeGateway)
        container.register(IFraudDetector, MaxMindFraudDetector)
        container.register(IPaymentProcessor, PaymentProcessor)

# Compose application from modules
container.install(PaymentModule())
container.install(NotificationModule())
container.install(InventoryModule())
```

### Interview Deep Dive: DI Containers

**Level 1: Conceptual Understanding**

**Q: What problem does a DI container solve that manual DI does not?**

A: Manual DI (pure DI) requires explicit wiring at the composition root:

```python
# Manual DI - works fine for small apps
db = PostgresDatabase(config.db_url)
cache = RedisCache(config.redis_url)
user_repo = UserRepository(db, cache)
email = SendGridEmail(config.sendgrid_key)
user_service = UserService(user_repo, email)
```

This becomes unmanageable as dependency graphs grow. Containers provide:
- **Automatic resolution**: Container builds entire object graphs
- **Lifecycle management**: Singleton, scoped, transient handled automatically
- **Late binding**: Swap implementations via configuration without code changes
- **Validation**: Containers can verify all dependencies are satisfiable at startup

**Level 2: Implementation Challenges**

**Q: How does a DI container detect circular dependencies, and what are the performance implications of this detection?**

A: Containers detect cycles during resolution by tracking the "resolution stack":

```python
def resolve(self, interface: Type, resolution_stack: Set[Type] = None) -> Any:
    if resolution_stack is None:
        resolution_stack = set()

    if interface in resolution_stack:
        cycle = " -> ".join(t.__name__ for t in resolution_stack)
        raise CircularDependencyError(
            f"Circular dependency detected: {cycle} -> {interface.__name__}"
        )

    resolution_stack.add(interface)
    try:
        # ... resolution logic
        for dep_type in dependency_types:
            self.resolve(dep_type, resolution_stack.copy())
    finally:
        resolution_stack.discard(interface)
```

**Performance implications**:
- O(n) space for the stack where n is maximum dependency depth
- Detection adds constant overhead per resolution
- Sophisticated containers perform cycle detection at registration time (compile-time), not resolution time (runtime), avoiding repeated checks

**Level 3: Architectural Trade-offs**

**Q: Your team debates using a DI container vs pure DI (manual wiring). Under what circumstances would you recommend pure DI over a container?**

A: Pure DI is preferable when:

1. **Small, stable dependency graphs**: Under ~20 classes, manual wiring is clearer
2. **Performance-critical paths**: Containers add resolution overhead (reflection, hash lookups). Hot paths may benefit from direct instantiation
3. **Compile-time safety priority**: Pure DI catches wiring errors at compile time; containers defer to runtime
4. **Team unfamiliarity**: Containers have learning curves. Pure DI is immediately understandable
5. **Library development**: Libraries should not force container choices on consumers

Container DI is preferable when:
1. **Large, evolving graphs**: 50+ classes with frequent changes
2. **Multiple deployment configurations**: Different environments need different implementations
3. **Complex lifecycles**: Managing scoped/singleton across request boundaries
4. **Plugin architectures**: Dynamic loading of implementations

```python
# Pure DI advantage: Compile-time error if UserRepository doesn't exist
user_service = UserService(UserRepository(db))

# Container DI risk: Runtime error if registration missing
user_service = container.resolve(IUserService)  # May fail at runtime
```

---

## The Service Locator Anti-Pattern

The Service Locator pattern provides a global registry that any class can query for dependencies. While superficially similar to DI, it inverts control in the wrong direction.

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #fecaca;">
<div style="text-align: center; margin-bottom: 20px;">
<span style="font-size: 1.3rem; font-weight: 700; color: #991b1b;">Service Locator: Why It's Problematic</span>
</div>

<div style="display: flex; gap: 24px; flex-wrap: wrap;">
<div style="flex: 1; min-width: 260px;">
<div style="background: #fee2e2; border-radius: 10px; padding: 16px; border: 1px solid #fca5a5;">
<div style="color: #991b1b; font-weight: 600; margin-bottom: 12px;">Hidden Dependencies</div>
<div style="color: #7f1d1d; font-size: 0.9rem; line-height: 1.5;">
          Class signature does not reveal what it needs. You must read every method to discover dependencies, making code reviews and refactoring dangerous.
</div>
</div>
</div>

<div style="flex: 1; min-width: 260px;">
<div style="background: #fee2e2; border-radius: 10px; padding: 16px; border: 1px solid #fca5a5;">
<div style="color: #991b1b; font-weight: 600; margin-bottom: 12px;">Testing Nightmare</div>
<div style="color: #7f1d1d; font-size: 0.9rem; line-height: 1.5;">
          Tests must configure global state before each test and clean up after. Parallel tests become impossible without careful isolation. Forgotten setup causes cryptic failures.
</div>
</div>
</div>

<div style="flex: 1; min-width: 260px;">
<div style="background: #fee2e2; border-radius: 10px; padding: 16px; border: 1px solid #fca5a5;">
<div style="color: #991b1b; font-weight: 600; margin-bottom: 12px;">Runtime Coupling</div>
<div style="color: #7f1d1d; font-size: 0.9rem; line-height: 1.5;">
          Every class depends on the locator. Changing the locator API breaks everything. You've traded explicit dependencies for implicit coupling to infrastructure.
</div>
</div>
</div>
</div>
</div>

### Service Locator vs Dependency Injection

```python
# SERVICE LOCATOR (Anti-Pattern)
class OrderService:
    def process_order(self, order: Order) -> OrderResult:
        # Dependencies are HIDDEN - discovered only by reading code
        db = ServiceLocator.get(IDatabase)
        email = ServiceLocator.get(IEmailService)
        payment = ServiceLocator.get(IPaymentGateway)

        # What if ServiceLocator isn't configured? Runtime explosion.
        # What dependencies does this class have? Read every line to find out.

        payment.charge(order.total)
        db.save(order)
        email.send_confirmation(order.customer_email)

# DEPENDENCY INJECTION (Correct Pattern)
class OrderService:
    def __init__(
        self,
        db: IDatabase,
        email: IEmailService,
        payment: IPaymentGateway
    ):
        # Dependencies are EXPLICIT - visible in constructor signature
        self._db = db
        self._email = email
        self._payment = payment

    def process_order(self, order: Order) -> OrderResult:
        # Just use dependencies - no service location
        self._payment.charge(order.total)
        self._db.save(order)
        self._email.send_confirmation(order.customer_email)
```

### Why Service Locator Persists

Despite being an anti-pattern, service locators appear in production code because:

1. **Legacy migration**: Easier to add a locator to legacy code than refactor all constructors
2. **Framework constraints**: Some frameworks don't support constructor injection in certain contexts
3. **Cross-cutting concerns**: Logging and metrics are sometimes accessed via locators to avoid polluting every constructor
4. **Plugin systems**: Dynamically loaded plugins may not know their dependencies at compile time

<div style="background: #fef9c3; border-left: 4px solid #eab308; padding: 16px 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
<div style="font-weight: 700; color: #854d0e; margin-bottom: 8px;">Nuanced Perspective</div>
<div style="color: #713f12;">In rare cases, a constrained service locator scoped to a specific bounded context may be acceptable. The key is minimizing its reach and treating it as a pragmatic compromise, not a design choice. Document why it exists and plan for its eventual removal.</div>
</div>

### Interview Deep Dive: Service Locator

**Level 1: Conceptual Understanding**

**Q: What is the fundamental difference between Service Locator and Dependency Injection?**

A: The difference is **who controls dependency acquisition**:

- **DI**: Dependencies are pushed to the consumer from outside. The class is passive, receiving what it needs.
- **Service Locator**: The consumer actively pulls dependencies from a global registry. The class controls when and what it requests.

DI enforces the [[Dependency Inversion Principle]](/topics/design-patterns/solid-principles) - high-level modules don't depend on low-level modules. Service Locator violates this by making every class depend on the locator infrastructure.

**Level 2: Implementation Challenges**

**Q: You inherit a codebase using Service Locator throughout. How do you migrate to DI incrementally without breaking the system?**

A: Implement the Strangler Fig pattern for DI migration:

1. **Wrap the locator**: Create a thin DI container that internally uses the locator
```python
class TransitionalContainer:
    def __init__(self, legacy_locator: ServiceLocator):
        self._locator = legacy_locator
        self._di_registry: Dict[Type, Callable] = {}

    def resolve(self, interface: Type) -> Any:
        # Prefer DI registration, fall back to locator
        if interface in self._di_registry:
            return self._di_registry[interface]()
        return self._locator.get(interface)
```

2. **New classes use DI**: All new code uses constructor injection
3. **Migrate leaf classes first**: Classes with no downstream dependencies
4. **Remove locator calls incrementally**: One class at a time, add constructor parameters
5. **Track progress**: Maintain metrics on locator.get() call sites remaining

**Level 3: Architectural Trade-offs**

**Q: A senior engineer argues that Service Locator is acceptable for cross-cutting concerns like logging since "every class needs logging anyway." How do you respond?**

A: This argument has surface appeal but fails under scrutiny:

**Counter-argument 1: Not every class needs every cross-cutting concern**
```python
# With locator, you'd never notice this class logs but shouldn't
class PureCalculator:
    def calculate(self, x: int, y: int) -> int:
        logger = ServiceLocator.get(ILogger)  # Why does math need logging?
        logger.info(f"Calculating {x} + {y}")
        return x + y

# With DI, the unnecessary dependency is visible
class PureCalculator:
    def __init__(self, logger: ILogger):  # Code review: "Why does a calculator need a logger?"
        self._logger = logger
```

**Counter-argument 2: Testing impact**
```python
# Locator: Every test must configure global state
def test_calculator():
    ServiceLocator.register(ILogger, MockLogger())  # Easy to forget
    try:
        calc = PureCalculator()
        assert calc.calculate(2, 3) == 5
    finally:
        ServiceLocator.reset()  # Easy to forget

# DI: Test is self-contained
def test_calculator():
    calc = PureCalculator(MockLogger())  # Explicit, isolated
    assert calc.calculate(2, 3) == 5
```

**Better alternatives for cross-cutting concerns**:
- [[Aspect-Oriented Programming]](/topics/design-patterns/aop) for truly pervasive concerns
- Decorator pattern to wrap services with logging
- Structured logging that doesn't require injection (writes to stdout, collected externally)

---

## Testing Benefits of Dependency Injection

DI transforms testing from painful integration exercises to fast, deterministic unit tests.

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #86efac;">
<div style="text-align: center; margin-bottom: 24px;">
<span style="font-size: 1.3rem; font-weight: 700; color: #166534;">Testing Transformation with DI</span>
</div>

<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">
<div style="flex: 1; min-width: 300px;">
<div style="background: #fee2e2; border-radius: 12px; padding: 20px; border: 1px solid #fca5a5;">
<div style="color: #991b1b; font-weight: 700; font-size: 1.1rem; margin-bottom: 16px;">Without DI</div>
<div style="color: #7f1d1d; font-size: 0.9rem; line-height: 1.8;">
<div>1. Spin up database container</div>
<div>2. Run migrations</div>
<div>3. Configure email server mock</div>
<div>4. Set up payment sandbox</div>
<div>5. Run single test (30+ seconds)</div>
<div>6. Tear down everything</div>
<div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #fca5a5;">
<strong>Result:</strong> 100 tests = 50+ minutes
</div>
</div>
</div>
</div>

<div style="flex: 1; min-width: 300px;">
<div style="background: #dcfce7; border-radius: 12px; padding: 20px; border: 1px solid #86efac;">
<div style="color: #166534; font-weight: 700; font-size: 1.1rem; margin-bottom: 16px;">With DI</div>
<div style="color: #15803d; font-size: 0.9rem; line-height: 1.8;">
<div>1. Create mock objects</div>
<div>2. Inject into class under test</div>
<div>3. Run test (&lt;1ms)</div>
<div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #86efac;">
<strong>Result:</strong> 100 tests = &lt;1 second
</div>
</div>
</div>
</div>
</div>
</div>

### Testing Patterns Enabled by DI

**Mock Injection for Isolation**

```python
class TestPaymentProcessor:
    def test_successful_payment_sends_confirmation(self):
        # Arrange: Create mocks
        mock_gateway = Mock(spec=IPaymentGateway)
        mock_gateway.charge.return_value = ChargeResult(success=True, transaction_id="txn_123")

        mock_email = Mock(spec=IEmailService)
        mock_logger = Mock(spec=ILogger)

        # Inject mocks
        processor = PaymentProcessor(
            gateway=mock_gateway,
            email_service=mock_email,
            logger=mock_logger
        )

        # Act
        result = processor.process(Payment(amount=100, customer_email="test@example.com"))

        # Assert
        assert result.success
        mock_gateway.charge.assert_called_once_with(100)
        mock_email.send_confirmation.assert_called_once()
        mock_logger.info.assert_called()  # Verify logging happened

    def test_failed_payment_does_not_send_confirmation(self):
        mock_gateway = Mock(spec=IPaymentGateway)
        mock_gateway.charge.return_value = ChargeResult(success=False, error="Declined")

        mock_email = Mock(spec=IEmailService)

        processor = PaymentProcessor(
            gateway=mock_gateway,
            email_service=mock_email,
            logger=Mock()
        )

        result = processor.process(Payment(amount=100, customer_email="test@example.com"))

        assert not result.success
        mock_email.send_confirmation.assert_not_called()  # Critical: No email on failure
```

**Fake Implementations for Integration Testing**

```python
class InMemoryOrderRepository(IOrderRepository):
    """Fast, deterministic fake for testing."""

    def __init__(self):
        self._orders: Dict[str, Order] = {}
        self._save_count = 0  # Track for assertions

    def save(self, order: Order) -> None:
        self._orders[order.id] = order
        self._save_count += 1

    def find_by_id(self, order_id: str) -> Optional[Order]:
        return self._orders.get(order_id)

    def find_by_customer(self, customer_id: str) -> List[Order]:
        return [o for o in self._orders.values() if o.customer_id == customer_id]

class TestOrderWorkflow:
    def test_complete_order_workflow(self):
        # Use fakes for realistic behavior without real infrastructure
        order_repo = InMemoryOrderRepository()
        inventory = InMemoryInventory(initial_stock={"SKU001": 10})
        payment = FakePaymentGateway(always_succeeds=True)

        workflow = OrderWorkflow(
            orders=order_repo,
            inventory=inventory,
            payment=payment,
            notifications=StubNotificationService()
        )

        order = workflow.place_order(
            customer_id="cust_123",
            items=[OrderItem(sku="SKU001", quantity=2)]
        )

        # Verify state changes across multiple components
        assert order_repo.find_by_id(order.id) is not None
        assert inventory.get_stock("SKU001") == 8  # 10 - 2
        assert len(payment.processed_transactions) == 1
```

**Spy Injection for Behavior Verification**

```python
class SpyEmailService(IEmailService):
    """Captures calls for later verification."""

    def __init__(self, delegate: IEmailService = None):
        self._delegate = delegate
        self.calls: List[Dict] = []

    def send(self, to: str, subject: str, body: str) -> bool:
        self.calls.append({"to": to, "subject": subject, "body": body})
        if self._delegate:
            return self._delegate.send(to, subject, body)
        return True

    def assert_sent_to(self, email: str):
        recipients = [c["to"] for c in self.calls]
        assert email in recipients, f"No email sent to {email}. Sent to: {recipients}"

def test_signup_sends_welcome_email():
    spy = SpyEmailService()
    service = UserSignupService(email_service=spy)

    service.signup("newuser@example.com", "password123")

    spy.assert_sent_to("newuser@example.com")
    assert any("welcome" in c["subject"].lower() for c in spy.calls)
```

### Interview Deep Dive: Testing Benefits

**Level 1: Conceptual Understanding**

**Q: How does DI enable unit testing? Explain with a concrete example.**

A: DI enables unit testing by allowing test code to substitute real dependencies with test doubles. Without DI:

```python
# Untestable: Hard-coded dependency
class OrderService:
    def __init__(self):
        self._db = PostgresDatabase()  # Real DB - tests need actual Postgres

    def create_order(self, order: Order):
        self._db.save(order)  # Can't test without database
```

With DI:
```python
# Testable: Dependency injected
class OrderService:
    def __init__(self, db: IDatabase):
        self._db = db

    def create_order(self, order: Order):
        self._db.save(order)

# Test with mock
def test_create_order():
    mock_db = Mock(spec=IDatabase)
    service = OrderService(db=mock_db)

    service.create_order(Order(id="123"))

    mock_db.save.assert_called_once()  # Test without real database
```

**Level 2: Implementation Challenges**

**Q: When should you use mocks vs fakes vs stubs in DI-based testing? What are the trade-offs?**

A: Each test double serves different purposes:

| Type | Purpose | Pros | Cons |
|------|---------|------|------|
| **Stub** | Return canned answers | Simple, fast | Doesn't verify behavior |
| **Mock** | Verify interactions | Precise verification | Brittle if implementation changes |
| **Fake** | Working implementation | Realistic behavior | Requires maintenance |

**Decision guide**:
- **Stub** when you need the dependency to return values but don't care how it's called
- **Mock** when verifying the class under test calls dependencies correctly (interaction testing)
- **Fake** for integration-style tests that verify behavior across components

```python
# Stub: Just need a return value
stub_config = Mock()
stub_config.get_timeout.return_value = 30  # Don't care if called once or twice

# Mock: Verify correct interaction
mock_payment = Mock(spec=IPaymentGateway)
# ... run code ...
mock_payment.charge.assert_called_once_with(amount=100, currency="USD")

# Fake: Test realistic scenarios
fake_inventory = InMemoryInventory({"SKU001": 5})
# ... run code that should reduce inventory ...
assert fake_inventory.get_stock("SKU001") == 3
```

**Level 3: Architectural Trade-offs**

**Q: A team has 95% unit test coverage using DI with mocks, but production bugs keep appearing. What might be wrong, and how would you address it?**

A: High mock-based coverage can create a false sense of security. Common issues:

**Problem 1: Mocks don't reflect real behavior**
```python
# Mock says this works
mock_db.save.return_value = True

# Real database throws on duplicate key
real_db.save(order)  # IntegrityError: duplicate primary key
```
**Solution**: Use contract tests or fakes that enforce realistic constraints

**Problem 2: Testing implementation, not behavior**
```python
# Brittle: Tests HOW it works
mock_db.query.assert_called_with("SELECT * FROM users WHERE id = ?", [user_id])

# Better: Tests WHAT it does
assert result.email == "expected@email.com"
```
**Solution**: Test outcomes, not internal method calls

**Problem 3: Integration points untested**
Mocks at boundaries mean the actual integration is never tested.

**Solution**: Complement unit tests with:
- **Contract tests**: Verify mocks match real implementations
- **Integration tests**: Test real components together (fewer, slower)
- **Consumer-driven contracts**: [[Contract Testing]](/topics/testing/contract-testing) ensures API compatibility

**Testing pyramid adjustment**:
```
        /\
       /  \  E2E (few - validate user journeys)
      /----\
     /      \ Integration (some - validate component interaction)
    /--------\
   /          \ Unit with DI (many - validate logic)
  /------------\
```

---

## Implementation: Production-Grade DI Container

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Dict, Type, TypeVar, Generic, Callable, Optional, Any, List
from enum import Enum, auto
from contextlib import contextmanager
import threading
import inspect

T = TypeVar('T')

class Lifecycle(Enum):
    """Object lifecycle management strategies."""
    TRANSIENT = auto()   # New instance every time
    SINGLETON = auto()   # One instance for container lifetime
    SCOPED = auto()      # One instance per scope


@dataclass
class Registration:
    """Represents a service registration in the container."""
    interface: Type
    implementation: Type
    lifecycle: Lifecycle
    factory: Optional[Callable[..., Any]] = None  # Custom factory function


class ResolutionError(Exception):
    """Raised when dependency resolution fails."""
    pass


class ScopeError(Exception):
    """Raised when scope-related operations fail."""
    pass


class CircularDependencyError(Exception):
    """Raised when circular dependencies are detected."""
    pass


class Scope:
    """Represents a resolution scope with its own instance cache."""

    def __init__(self, container: 'Container'):
        self._container = container
        self._instances: Dict[Type, Any] = {}
        self._lock = threading.Lock()

    def get_or_create(self, interface: Type, factory: Callable[[], Any]) -> Any:
        """Get cached instance or create new one."""
        with self._lock:
            if interface not in self._instances:
                self._instances[interface] = factory()
            return self._instances[interface]

    def dispose(self):
        """Dispose all scoped instances."""
        for instance in self._instances.values():
            if hasattr(instance, 'dispose'):
                instance.dispose()
            elif hasattr(instance, 'close'):
                instance.close()
            elif hasattr(instance, '__exit__'):
                instance.__exit__(None, None, None)
        self._instances.clear()


class Container:
    """
    Production-grade DI container with lifecycle management.

    Features:
    - Constructor injection with automatic dependency resolution
    - Singleton, scoped, and transient lifecycles
    - Circular dependency detection
    - Thread-safe singleton management
    - Custom factory support
    """

    def __init__(self):
        self._registrations: Dict[Type, Registration] = {}
        self._singletons: Dict[Type, Any] = {}
        self._singleton_lock = threading.Lock()
        self._scope_local = threading.local()

    def register(
        self,
        interface: Type[T],
        implementation: Type[T] = None,
        lifecycle: Lifecycle = Lifecycle.TRANSIENT,
        factory: Callable[..., T] = None
    ) -> 'Container':
        """
        Register a service implementation.

        Args:
            interface: The interface/abstract type to register
            implementation: The concrete implementation type
            lifecycle: How instances should be managed
            factory: Optional custom factory function

        Returns:
            Self for fluent chaining
        """
        if implementation is None and factory is None:
            implementation = interface  # Self-registration

        self._registrations[interface] = Registration(
            interface=interface,
            implementation=implementation,
            lifecycle=lifecycle,
            factory=factory
        )
        return self

    def register_instance(self, interface: Type[T], instance: T) -> 'Container':
        """Register a pre-created singleton instance."""
        self._registrations[interface] = Registration(
            interface=interface,
            implementation=type(instance),
            lifecycle=Lifecycle.SINGLETON
        )
        self._singletons[interface] = instance
        return self

    def resolve(self, interface: Type[T]) -> T:
        """
        Resolve an instance of the requested type.

        Automatically resolves all constructor dependencies recursively.
        """
        return self._resolve_internal(interface, resolution_stack=set())

    def _resolve_internal(self, interface: Type[T], resolution_stack: set) -> T:
        """Internal resolution with circular dependency tracking."""
        if interface not in self._registrations:
            raise ResolutionError(
                f"No registration found for {interface.__name__}. "
                f"Did you forget to call container.register({interface.__name__}, ...)?"
            )

        # Circular dependency detection
        if interface in resolution_stack:
            cycle_path = " -> ".join(t.__name__ for t in resolution_stack)
            raise CircularDependencyError(
                f"Circular dependency detected: {cycle_path} -> {interface.__name__}"
            )

        registration = self._registrations[interface]

        # Handle based on lifecycle
        if registration.lifecycle == Lifecycle.SINGLETON:
            return self._resolve_singleton(interface, registration, resolution_stack)
        elif registration.lifecycle == Lifecycle.SCOPED:
            return self._resolve_scoped(interface, registration, resolution_stack)
        else:
            return self._create_instance(registration, resolution_stack)

    def _resolve_singleton(
        self,
        interface: Type,
        registration: Registration,
        resolution_stack: set
    ) -> Any:
        """Resolve with singleton lifecycle (thread-safe)."""
        if interface in self._singletons:
            return self._singletons[interface]

        with self._singleton_lock:
            # Double-check after acquiring lock
            if interface in self._singletons:
                return self._singletons[interface]

            instance = self._create_instance(registration, resolution_stack)
            self._singletons[interface] = instance
            return instance

    def _resolve_scoped(
        self,
        interface: Type,
        registration: Registration,
        resolution_stack: set
    ) -> Any:
        """Resolve with scoped lifecycle."""
        scope = getattr(self._scope_local, 'current_scope', None)
        if scope is None:
            raise ScopeError(
                f"Cannot resolve scoped service {interface.__name__} "
                "outside of a scope. Use 'with container.create_scope():'"
            )

        return scope.get_or_create(
            interface,
            lambda: self._create_instance(registration, resolution_stack)
        )

    def _create_instance(self, registration: Registration, resolution_stack: set) -> Any:
        """Create a new instance, resolving constructor dependencies."""
        resolution_stack = resolution_stack | {registration.interface}

        # Use custom factory if provided
        if registration.factory:
            return registration.factory(self)

        impl_class = registration.implementation

        # Inspect constructor parameters
        try:
            sig = inspect.signature(impl_class.__init__)
        except (ValueError, TypeError):
            # No constructor or uninspectable - just instantiate
            return impl_class()

        # Resolve each constructor parameter
        kwargs = {}
        for param_name, param in sig.parameters.items():
            if param_name == 'self':
                continue

            # Skip parameters with defaults if not registered
            if param.annotation == inspect.Parameter.empty:
                if param.default != inspect.Parameter.empty:
                    continue
                raise ResolutionError(
                    f"Cannot resolve parameter '{param_name}' in {impl_class.__name__}: "
                    "no type annotation and no default value"
                )

            param_type = param.annotation

            # Handle Optional types
            if hasattr(param_type, '__origin__') and param_type.__origin__ is type(None):
                if param_type not in self._registrations:
                    kwargs[param_name] = None
                    continue

            try:
                kwargs[param_name] = self._resolve_internal(param_type, resolution_stack)
            except ResolutionError:
                if param.default != inspect.Parameter.empty:
                    continue  # Use default value
                raise

        return impl_class(**kwargs)

    @contextmanager
    def create_scope(self):
        """
        Create a new resolution scope.

        Scoped services are cached within this scope and disposed when it exits.

        Usage:
            with container.create_scope():
                service = container.resolve(IScopedService)
        """
        scope = Scope(self)
        previous_scope = getattr(self._scope_local, 'current_scope', None)
        self._scope_local.current_scope = scope

        try:
            yield scope
        finally:
            scope.dispose()
            self._scope_local.current_scope = previous_scope

    def validate(self) -> List[str]:
        """
        Validate that all registrations can be resolved.

        Returns list of errors (empty if valid).
        """
        errors = []

        for interface in self._registrations:
            try:
                # Create a temporary scope for validation
                with self.create_scope():
                    self.resolve(interface)
            except Exception as e:
                errors.append(f"{interface.__name__}: {str(e)}")

        return errors


# ============================================================
# Example Usage with Interfaces and Implementations
# ============================================================

class ILogger(ABC):
    @abstractmethod
    def info(self, message: str) -> None: pass

    @abstractmethod
    def error(self, message: str, exception: Exception = None) -> None: pass


class IUserRepository(ABC):
    @abstractmethod
    def find_by_id(self, user_id: str) -> Optional[Dict]: pass

    @abstractmethod
    def save(self, user: Dict) -> None: pass


class IEmailService(ABC):
    @abstractmethod
    def send(self, to: str, subject: str, body: str) -> bool: pass


# Implementations
class ConsoleLogger(ILogger):
    def info(self, message: str) -> None:
        print(f"[INFO] {message}")

    def error(self, message: str, exception: Exception = None) -> None:
        print(f"[ERROR] {message}")
        if exception:
            print(f"  Exception: {exception}")


class PostgresUserRepository(IUserRepository):
    def __init__(self, logger: ILogger):
        self._logger = logger
        self._logger.info("PostgresUserRepository initialized")

    def find_by_id(self, user_id: str) -> Optional[Dict]:
        self._logger.info(f"Finding user {user_id}")
        return {"id": user_id, "name": "John Doe"}

    def save(self, user: Dict) -> None:
        self._logger.info(f"Saving user {user['id']}")


class SmtpEmailService(IEmailService):
    def __init__(self, logger: ILogger):
        self._logger = logger

    def send(self, to: str, subject: str, body: str) -> bool:
        self._logger.info(f"Sending email to {to}: {subject}")
        return True


class UserService:
    """Business logic service with injected dependencies."""

    def __init__(
        self,
        user_repository: IUserRepository,
        email_service: IEmailService,
        logger: ILogger
    ):
        self._users = user_repository
        self._email = email_service
        self._logger = logger

    def register_user(self, user_id: str, name: str, email: str) -> Dict:
        self._logger.info(f"Registering user: {name}")

        user = {"id": user_id, "name": name, "email": email}
        self._users.save(user)

        self._email.send(
            to=email,
            subject="Welcome!",
            body=f"Hello {name}, welcome to our platform!"
        )

        return user


# Container configuration
def configure_production_container() -> Container:
    container = Container()

    container.register(ILogger, ConsoleLogger, Lifecycle.SINGLETON)
    container.register(IUserRepository, PostgresUserRepository, Lifecycle.SCOPED)
    container.register(IEmailService, SmtpEmailService, Lifecycle.TRANSIENT)
    container.register(UserService, UserService, Lifecycle.SCOPED)

    return container


# Application usage
if __name__ == "__main__":
    container = configure_production_container()

    # Validate configuration at startup
    errors = container.validate()
    if errors:
        print("Container configuration errors:")
        for error in errors:
            print(f"  - {error}")
        exit(1)

    # Use within scope (e.g., HTTP request handling)
    with container.create_scope():
        user_service = container.resolve(UserService)
        user_service.register_user("u123", "Alice", "alice@example.com")
```

---

## Common Anti-Patterns and Solutions

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #93c5fd;">
<div style="text-align: center; margin-bottom: 24px;">
<span style="font-size: 1.3rem; font-weight: 700; color: #1e40af;">DI Anti-Pattern Recognition Guide</span>
</div>

<div style="display: flex; flex-direction: column; gap: 16px;">
<div style="background: #fee2e2; border: 1px solid #ef4444; border-radius: 10px; padding: 16px;">
<div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 12px;">
<div style="flex: 1; min-width: 200px;">
<div style="color: #991b1b; font-weight: 700; margin-bottom: 4px;">Container Injection</div>
<code style="color: #7f1d1d; font-size: 0.85rem;">__init__(self, container: Container)</code>
</div>
<div style="flex: 2; min-width: 250px; color: #475569; font-size: 0.9rem;">
<strong>Problem:</strong> Hides actual dependencies, defeats DI purpose<br>
<strong>Fix:</strong> Inject specific dependencies, not the container
</div>
</div>
</div>

<div style="background: #fee2e2; border: 1px solid #ef4444; border-radius: 10px; padding: 16px;">
<div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 12px;">
<div style="flex: 1; min-width: 200px;">
<div style="color: #991b1b; font-weight: 700; margin-bottom: 4px;">Constructor Over-Injection</div>
<code style="color: #7f1d1d; font-size: 0.85rem;">__init__(a, b, c, d, e, f, g, h)</code>
</div>
<div style="flex: 2; min-width: 250px; color: #475569; font-size: 0.9rem;">
<strong>Problem:</strong> Class has too many responsibilities<br>
<strong>Fix:</strong> Split class, use facade services
</div>
</div>
</div>

<div style="background: #fee2e2; border: 1px solid #ef4444; border-radius: 10px; padding: 16px;">
<div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 12px;">
<div style="flex: 1; min-width: 200px;">
<div style="color: #991b1b; font-weight: 700; margin-bottom: 4px;">Ambient Context</div>
<code style="color: #7f1d1d; font-size: 0.85rem;">Logger.Current.Info(...)</code>
</div>
<div style="flex: 2; min-width: 250px; color: #475569; font-size: 0.9rem;">
<strong>Problem:</strong> Global state, hidden dependency<br>
<strong>Fix:</strong> Inject logger explicitly
</div>
</div>
</div>

<div style="background: #fee2e2; border: 1px solid #ef4444; border-radius: 10px; padding: 16px;">
<div style="display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 12px;">
<div style="flex: 1; min-width: 200px;">
<div style="color: #991b1b; font-weight: 700; margin-bottom: 4px;">Control Freak</div>
<code style="color: #7f1d1d; font-size: 0.85rem;">new ConcreteClass() inside methods</code>
</div>
<div style="flex: 2; min-width: 250px; color: #475569; font-size: 0.9rem;">
<strong>Problem:</strong> Tight coupling, untestable<br>
<strong>Fix:</strong> Inject via constructor or use factory
</div>
</div>
</div>
</div>
</div>

        ---

        ## Related Patterns

        - [[Factory Method]](/topics/design-patterns/factory-method) - Create objects without specifying exact classes; often used by DI containers internally
        - [[Abstract Factory]](/topics/design-patterns/abstract-factory) - Create families of related objects; DI can inject different factories per environment
        - [[Strategy]](/topics/design-patterns/strategy) - Define interchangeable algorithms; DI makes strategy injection trivial
        - [[Decorator]](/topics/design-patterns/decorator) - Add behavior to objects; DI enables automatic decoration during resolution
        - [[Singleton]](/topics/design-patterns/singleton) - Ensure single instance; DI containers provide managed singleton lifecycle
        - [[Facade]](/topics/design-patterns/facade) - Simplify complex subsystems; reduces constructor parameter explosion
        - [[Inversion of Control]](/topics/design-patterns/inversion-of-control) - The broader principle that DI implements
        - [[SOLID Principles]](/topics/design-patterns/solid-principles) - DI directly enables Dependency Inversion Principle

        ---

        ## Key Takeaways for Interviews

        1. **DI is about object construction, not object use** - The pattern separates how objects are created from how they are used

        2. **Constructor injection should be your default** - It ensures objects are always valid and makes dependencies explicit

        3. **Service Locator hides dependencies** - Visible constructor parameters are always preferable to hidden service lookups

        4. **DI containers are optional** - Manual DI (pure DI) is valid and sometimes preferable for smaller systems

        5. **Too many dependencies signals design problems** - DI makes [[Single Responsibility Principle]](/topics/design-patterns/solid-principles) violations visible

        6. **Testing transformation is the killer feature** - DI enables fast, deterministic, isolated unit tests

        7. **Lifecycle management matters** - Understanding singleton vs scoped vs transient prevents subtle bugs
