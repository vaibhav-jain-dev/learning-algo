# Facade Pattern

## Overview

The Facade pattern provides a unified, simplified interface to a complex subsystem of classes, libraries, or frameworks. It acts as a high-level entry point that shields clients from the intricate dependencies, initialization sequences, and interaction protocols within the subsystem.

> **Core Insight**: A Facade does not add new functionality—it orchestrates existing capabilities into cohesive, use-case-driven operations that align with client mental models rather than implementation details.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 2rem; margin: 2rem 0; font-family: system-ui, sans-serif;">
  <div style="text-align: center; margin-bottom: 1.5rem;">
    <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 0.75rem 2rem; border-radius: 8px; color: white; font-weight: 700; font-size: 1.1rem; display: inline-block;">Client</span>
  </div>
  <div style="text-align: center; color: #667eea; font-size: 1.5rem; margin: 1rem 0;">&#8595;</div>
  <div style="text-align: center; margin-bottom: 1.5rem;">
    <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 1.25rem 2.5rem; border-radius: 12px; color: white; display: inline-block; box-shadow: 0 8px 32px rgba(17, 153, 142, 0.3);">
      <div style="font-weight: 700; font-size: 1.2rem; margin-bottom: 0.5rem;">Facade</div>
      <div style="font-size: 0.85rem; opacity: 0.9; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 0.5rem;">Simplified API surface</div>
    </div>
  </div>
  <div style="text-align: center; color: #38ef7d; font-size: 1rem; margin: 1rem 0;">orchestrates &#8595;</div>
  <div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 1.5rem; border: 1px dashed rgba(255,255,255,0.2);">
    <div style="text-align: center; color: #888; font-size: 0.8rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 1px;">Complex Subsystem</div>
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
      <div style="background: #2d3748; border: 2px solid #4ecdc4; border-radius: 8px; padding: 0.75rem 1.25rem; color: #4ecdc4; font-size: 0.85rem;">ServiceA</div>
      <div style="background: #2d3748; border: 2px solid #f093fb; border-radius: 8px; padding: 0.75rem 1.25rem; color: #f093fb; font-size: 0.85rem;">ServiceB</div>
      <div style="background: #2d3748; border: 2px solid #ffd93d; border-radius: 8px; padding: 0.75rem 1.25rem; color: #ffd93d; font-size: 0.85rem;">ServiceC</div>
      <div style="background: #2d3748; border: 2px solid #74b9ff; border-radius: 8px; padding: 0.75rem 1.25rem; color: #74b9ff; font-size: 0.85rem;">ServiceD</div>
    </div>
    <div style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 1rem; flex-wrap: wrap;">
      <span style="color: #666; font-size: 0.75rem;">internal dependencies</span>
      <span style="color: #4ecdc4;">&#8596;</span>
      <span style="color: #666; font-size: 0.75rem;">initialization order</span>
      <span style="color: #f093fb;">&#8596;</span>
      <span style="color: #666; font-size: 0.75rem;">state management</span>
    </div>
  </div>
</div>

---

## Internal Mechanisms and Architecture

### How Facades Work Internally

A Facade maintains references to subsystem components and coordinates their interactions. Understanding the internal mechanics reveals critical design decisions:

**Component Lifecycle Management**
```python
class PaymentFacade:
    def __init__(self, config: PaymentConfig):
        # Eager vs lazy initialization trade-off
        self._fraud_detector = None  # Lazy - expensive ML model
        self._validator = CardValidator()  # Eager - lightweight
        self._gateway = self._create_gateway(config)  # Eager - required
        self._audit_log = AuditLogger(config.audit_path)

    @property
    def fraud_detector(self) -> FraudDetector:
        """Lazy initialization for expensive subsystem components"""
        if self._fraud_detector is None:
            self._fraud_detector = FraudDetector.load_model(
                model_path="/models/fraud_v3.pkl",
                threshold=0.85
            )
        return self._fraud_detector
```

<div style="background: linear-gradient(135deg, #ff6b6b22 0%, #ee5a2422 100%); border-left: 4px solid #ff6b6b; border-radius: 0 8px 8px 0; padding: 1.25rem 1.5rem; margin: 1.5rem 0;">
  <div style="font-weight: 700; color: #ff6b6b; margin-bottom: 0.5rem;">Critical Assumption</div>
  <div style="color: #ccc; font-size: 0.95rem;">Facades assume ownership of subsystem component lifecycles. If external code holds references to subsystem objects, the Facade cannot guarantee consistent state or proper cleanup. This becomes critical when implementing dispose/cleanup patterns.</div>
</div>

**Request Orchestration Patterns**

Facades internally implement one of several orchestration strategies:

```python
class OrderFacade:
    def place_order(self, order: Order) -> OrderResult:
        # Sequential orchestration with compensation
        saga = OrderSaga()

        try:
            # Phase 1: Validation (can fail fast)
            self._inventory.validate_availability(order.items)
            self._payment.validate_method(order.payment_info)

            # Phase 2: Reservations (compensatable)
            saga.add_step(
                action=lambda: self._inventory.reserve(order.items),
                compensate=lambda: self._inventory.release(order.items)
            )
            saga.add_step(
                action=lambda: self._payment.authorize(order.total),
                compensate=lambda txn: self._payment.void(txn)
            )

            # Phase 3: Commit
            saga.execute()
            return OrderResult(success=True, order_id=saga.order_id)

        except SubsystemError as e:
            saga.compensate()  # Rollback in reverse order
            raise OrderFailedError(str(e), partial_state=saga.state)
```

### Subsystem Encapsulation Boundaries

Encapsulation in Facades operates at multiple levels:

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #0f0f23 100%); border-radius: 12px; padding: 1.5rem; margin: 2rem 0; font-family: system-ui, sans-serif;">
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="display: flex; align-items: center; gap: 1rem;">
      <div style="background: #e74c3c; color: white; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 600; min-width: 140px; text-align: center;">Interface Level</div>
      <div style="color: #aaa; font-size: 0.9rem;">Hides method signatures, parameter complexity, return types of subsystem</div>
    </div>
    <div style="display: flex; align-items: center; gap: 1rem;">
      <div style="background: #e67e22; color: white; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 600; min-width: 140px; text-align: center;">Protocol Level</div>
      <div style="color: #aaa; font-size: 0.9rem;">Hides calling order, initialization sequences, state dependencies</div>
    </div>
    <div style="display: flex; align-items: center; gap: 1rem;">
      <div style="background: #f39c12; color: white; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 600; min-width: 140px; text-align: center;">Error Level</div>
      <div style="color: #aaa; font-size: 0.9rem;">Translates subsystem exceptions into domain-specific errors</div>
    </div>
    <div style="display: flex; align-items: center; gap: 1rem;">
      <div style="background: #27ae60; color: white; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 600; min-width: 140px; text-align: center;">Resource Level</div>
      <div style="color: #aaa; font-size: 0.9rem;">Manages connections, pooling, caching transparently</div>
    </div>
  </div>
</div>

```python
class DatabaseFacade:
    """Encapsulates connection management, query building, result mapping"""

    def __init__(self, connection_string: str):
        # Resource-level encapsulation
        self._pool = ConnectionPool(
            connection_string,
            min_size=5,
            max_size=20,
            timeout=30
        )
        self._query_builder = QueryBuilder()
        self._mapper = ResultMapper()

    def find_users_by_criteria(
        self,
        criteria: UserSearchCriteria
    ) -> List[User]:
        """
        Interface-level: Hides SQL, connection handling, mapping
        Protocol-level: Manages acquire -> execute -> release -> map
        Error-level: Translates DB errors to domain exceptions
        """
        connection = None
        try:
            # Protocol encapsulation
            connection = self._pool.acquire()

            # Interface encapsulation - hide query complexity
            query = self._query_builder.select("users") \
                .where(criteria.to_conditions()) \
                .order_by(criteria.sort_field) \
                .limit(criteria.page_size) \
                .offset(criteria.page * criteria.page_size) \
                .build()

            result = connection.execute(query)

            # Mapping encapsulation
            return self._mapper.map_all(result, User)

        except ConnectionTimeoutError:
            # Error-level encapsulation
            raise ServiceUnavailableError(
                "Database temporarily unavailable",
                retry_after=30
            )
        except QueryExecutionError as e:
            if "unique constraint" in str(e):
                raise DuplicateEntityError("User already exists")
            raise DataAccessError(f"Query failed: {e}")
        finally:
            if connection:
                self._pool.release(connection)
```

---

## Facade vs Adapter: Critical Distinctions

Understanding when to use Facade versus [[Adapter]](/topic/design-patterns/adapter) is a common interview topic. The distinction is subtle but important:

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #667eea22 0%, #764ba222 100%); border: 2px solid #667eea; border-radius: 12px; padding: 1.5rem;">
    <div style="color: #667eea; font-weight: 700; font-size: 1.2rem; margin-bottom: 1rem; text-align: center;">Facade Pattern</div>
    <div style="color: #bbb; font-size: 0.9rem; line-height: 1.6;">
      <div style="margin-bottom: 0.75rem;"><strong style="color: #667eea;">Intent:</strong> Simplify a complex interface</div>
      <div style="margin-bottom: 0.75rem;"><strong style="color: #667eea;">Direction:</strong> Many-to-One (multiple subsystems to single interface)</div>
      <div style="margin-bottom: 0.75rem;"><strong style="color: #667eea;">Interface:</strong> Creates NEW simplified interface</div>
      <div style="margin-bottom: 0.75rem;"><strong style="color: #667eea;">Coupling:</strong> Client knows only Facade</div>
      <div><strong style="color: #667eea;">Functionality:</strong> Subset of subsystem capabilities</div>
    </div>
  </div>
  <div style="background: linear-gradient(135deg, #11998e22 0%, #38ef7d22 100%); border: 2px solid #11998e; border-radius: 12px; padding: 1.5rem;">
    <div style="color: #11998e; font-weight: 700; font-size: 1.2rem; margin-bottom: 1rem; text-align: center;">Adapter Pattern</div>
    <div style="color: #bbb; font-size: 0.9rem; line-height: 1.6;">
      <div style="margin-bottom: 0.75rem;"><strong style="color: #11998e;">Intent:</strong> Make incompatible interface compatible</div>
      <div style="margin-bottom: 0.75rem;"><strong style="color: #11998e;">Direction:</strong> One-to-One (single adaptee to single target)</div>
      <div style="margin-bottom: 0.75rem;"><strong style="color: #11998e;">Interface:</strong> Conforms to EXISTING target interface</div>
      <div style="margin-bottom: 0.75rem;"><strong style="color: #11998e;">Coupling:</strong> Client knows target interface</div>
      <div><strong style="color: #11998e;">Functionality:</strong> Complete translation of adaptee</div>
    </div>
  </div>
</div>

### Combined Usage Pattern

Real systems often use both patterns together:

```python
# Legacy payment system with incompatible interface
class LegacyPaymentGateway:
    def process_cc_txn(self, cc_num: str, exp: str, cvv: str,
                       amt_cents: int, merchant_id: str) -> dict:
        # Returns: {"code": 0, "auth": "ABC123", "msg": "OK"}
        pass

# Modern payment interface (target)
class PaymentProcessor(Protocol):
    def charge(self, card: CardInfo, amount: Money) -> PaymentResult:
        ...

# ADAPTER: Makes legacy gateway conform to modern interface
class LegacyPaymentAdapter(PaymentProcessor):
    def __init__(self, gateway: LegacyPaymentGateway, merchant_id: str):
        self._gateway = gateway
        self._merchant_id = merchant_id

    def charge(self, card: CardInfo, amount: Money) -> PaymentResult:
        # Translate modern interface to legacy
        response = self._gateway.process_cc_txn(
            cc_num=card.number,
            exp=f"{card.exp_month:02d}{card.exp_year % 100:02d}",
            cvv=card.cvv,
            amt_cents=int(amount.cents),
            merchant_id=self._merchant_id
        )

        # Translate legacy response to modern result
        if response["code"] == 0:
            return PaymentResult(
                success=True,
                authorization_code=response["auth"]
            )
        return PaymentResult(success=False, error=response["msg"])

# FACADE: Simplifies entire checkout process
class CheckoutFacade:
    def __init__(
        self,
        payment: PaymentProcessor,  # Could be adapter or native
        inventory: InventoryService,
        shipping: ShippingCalculator,
        tax: TaxService,
        notifications: NotificationService
    ):
        self._payment = payment
        self._inventory = inventory
        self._shipping = shipping
        self._tax = tax
        self._notifications = notifications

    def complete_purchase(self, cart: Cart, customer: Customer) -> Order:
        """Single method hides 5 subsystems and their interactions"""
        # Facade orchestrates, potentially using adapted components
        pass
```

<div style="background: linear-gradient(135deg, #3498db22 0%, #2980b922 100%); border-left: 4px solid #3498db; border-radius: 0 8px 8px 0; padding: 1.25rem 1.5rem; margin: 1.5rem 0;">
  <div style="font-weight: 700; color: #3498db; margin-bottom: 0.5rem;">Trade-off Analysis</div>
  <div style="color: #ccc; font-size: 0.95rem;">Using Adapters within a Facade adds a layer of indirection but enables swapping implementations (e.g., switching payment gateways) without changing the Facade. The cost is additional object allocation and method call overhead—typically negligible except in high-frequency paths.</div>
</div>

---

## API Simplification Strategies

### Reducing Cognitive Load

Effective API simplification involves multiple techniques:

**1. Parameter Object Consolidation**
```python
# Before: 12 parameters
def create_server(
    name: str, region: str, zone: str, machine_type: str,
    disk_size: int, disk_type: str, image: str, network: str,
    subnet: str, tags: List[str], labels: Dict[str, str],
    service_account: str
) -> Server:
    pass

# After: Single configuration object
@dataclass
class ServerConfig:
    name: str
    region: str = "us-east-1"
    zone: str = "a"
    machine_type: str = "n1-standard-1"
    disk_size_gb: int = 100
    disk_type: str = "ssd"
    image: str = "ubuntu-22.04"
    network: str = "default"
    subnet: Optional[str] = None
    tags: List[str] = field(default_factory=list)
    labels: Dict[str, str] = field(default_factory=dict)
    service_account: Optional[str] = None

    @classmethod
    def for_web_server(cls, name: str) -> "ServerConfig":
        """Factory method for common use case"""
        return cls(
            name=name,
            machine_type="n1-standard-2",
            tags=["http-server", "https-server"],
            labels={"role": "web"}
        )

class ComputeFacade:
    def create_server(self, config: ServerConfig) -> Server:
        # Single entry point with sensible defaults
        pass
```

**2. Operation Composition**
```python
class MediaProcessingFacade:
    """Composes multiple operations into single logical units"""

    def prepare_for_streaming(
        self,
        source: Path,
        output_dir: Path,
        quality_levels: List[str] = ["1080p", "720p", "480p"]
    ) -> StreamingPackage:
        """
        Internally executes:
        1. Probe source for metadata
        2. Extract audio tracks
        3. Transcode to each quality level
        4. Generate adaptive bitrate manifest
        5. Create thumbnails at intervals
        6. Generate preview clip
        7. Package for CDN upload
        """
        metadata = self._prober.analyze(source)

        variants = []
        for quality in quality_levels:
            transcoded = self._transcoder.transcode(
                source,
                self._get_encoding_params(quality, metadata)
            )
            variants.append(transcoded)

        manifest = self._packager.create_hls_manifest(variants)
        thumbnails = self._thumbnail_gen.extract(source, interval_seconds=10)
        preview = self._clip_extractor.create_preview(source, duration=30)

        return StreamingPackage(
            manifest=manifest,
            variants=variants,
            thumbnails=thumbnails,
            preview=preview,
            metadata=metadata
        )
```

**3. Error Consolidation and Translation**
```python
class PaymentFacadeError(Exception):
    """Base exception for all payment operations"""
    def __init__(self, message: str, code: str, retriable: bool = False):
        super().__init__(message)
        self.code = code
        self.retriable = retriable

class PaymentFacade:
    def charge(self, payment: PaymentRequest) -> PaymentResult:
        try:
            # Multiple subsystems, each with own exception types
            validated = self._validator.validate(payment.card)
            fraud_score = self._fraud_detector.score(payment)

            if fraud_score > 0.8:
                raise FraudDetectedError(score=fraud_score)

            result = self._gateway.process(payment)
            self._ledger.record(result)

            return result

        except CardValidationError as e:
            # Translate subsystem errors to facade errors
            raise PaymentFacadeError(
                "Invalid card details",
                code="CARD_INVALID",
                retriable=False
            ) from e
        except GatewayTimeoutError as e:
            raise PaymentFacadeError(
                "Payment processor temporarily unavailable",
                code="GATEWAY_TIMEOUT",
                retriable=True
            ) from e
        except FraudDetectedError as e:
            raise PaymentFacadeError(
                "Transaction declined for security reasons",
                code="FRAUD_SUSPECTED",
                retriable=False
            ) from e
        except LedgerWriteError as e:
            # Critical: payment succeeded but ledger failed
            self._alert_service.critical(
                "Ledger write failed after successful payment",
                payment_id=result.id
            )
            # Still return success - reconciliation handles this
            return result
```

---

## Layered Facades Architecture

Complex systems often employ multiple Facade layers, each serving different abstraction levels:

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 2rem; margin: 2rem 0; font-family: system-ui, sans-serif;">
  <div style="text-align: center; margin-bottom: 0.5rem;">
    <span style="color: #888; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">External Clients</span>
  </div>
  <div style="text-align: center; margin-bottom: 1.5rem;">
    <div style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); padding: 1rem 2rem; border-radius: 10px; color: white; display: inline-block; box-shadow: 0 4px 20px rgba(231, 76, 60, 0.3);">
      <div style="font-weight: 700; font-size: 1.1rem;">Public API Facade</div>
      <div style="font-size: 0.8rem; opacity: 0.8; margin-top: 0.25rem;">REST/GraphQL endpoints, rate limiting, auth</div>
    </div>
  </div>
  <div style="text-align: center; color: #e74c3c; margin: 0.75rem 0;">&#8595;</div>
  <div style="text-align: center; margin-bottom: 1.5rem;">
    <div style="background: linear-gradient(135deg, #e67e22 0%, #d35400 100%); padding: 1rem 2rem; border-radius: 10px; color: white; display: inline-block; box-shadow: 0 4px 20px rgba(230, 126, 34, 0.3);">
      <div style="font-weight: 700; font-size: 1.1rem;">Application Service Facade</div>
      <div style="font-size: 0.8rem; opacity: 0.8; margin-top: 0.25rem;">Use-case orchestration, transactions, business rules</div>
    </div>
  </div>
  <div style="text-align: center; color: #e67e22; margin: 0.75rem 0;">&#8595;</div>
  <div style="display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
    <div style="background: linear-gradient(135deg, #f39c12 0%, #f1c40f 100%); padding: 0.75rem 1.25rem; border-radius: 8px; color: #1a1a2e; box-shadow: 0 4px 15px rgba(243, 156, 18, 0.3);">
      <div style="font-weight: 700;">Domain Facade A</div>
      <div style="font-size: 0.75rem; opacity: 0.8;">Orders</div>
    </div>
    <div style="background: linear-gradient(135deg, #f39c12 0%, #f1c40f 100%); padding: 0.75rem 1.25rem; border-radius: 8px; color: #1a1a2e; box-shadow: 0 4px 15px rgba(243, 156, 18, 0.3);">
      <div style="font-weight: 700;">Domain Facade B</div>
      <div style="font-size: 0.75rem; opacity: 0.8;">Payments</div>
    </div>
    <div style="background: linear-gradient(135deg, #f39c12 0%, #f1c40f 100%); padding: 0.75rem 1.25rem; border-radius: 8px; color: #1a1a2e; box-shadow: 0 4px 15px rgba(243, 156, 18, 0.3);">
      <div style="font-weight: 700;">Domain Facade C</div>
      <div style="font-size: 0.75rem; opacity: 0.8;">Inventory</div>
    </div>
  </div>
  <div style="text-align: center; color: #f39c12; margin: 0.75rem 0;">&#8595;</div>
  <div style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 1rem; border: 1px solid rgba(255,255,255,0.1);">
    <div style="text-align: center; color: #666; font-size: 0.75rem; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 1px;">Infrastructure Layer</div>
    <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
      <span style="background: #2d3748; color: #27ae60; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.8rem;">Database</span>
      <span style="background: #2d3748; color: #3498db; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.8rem;">Cache</span>
      <span style="background: #2d3748; color: #9b59b6; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.8rem;">Message Queue</span>
      <span style="background: #2d3748; color: #e74c3c; padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.8rem;">External APIs</span>
    </div>
  </div>
</div>

### Implementation of Layered Facades

```python
# Layer 1: Infrastructure Facades
class CacheFacade:
    """Hides Redis complexity: connection pooling, serialization, key management"""
    def __init__(self, redis_url: str):
        self._pool = redis.ConnectionPool.from_url(redis_url)
        self._serializer = PickleSerializer()

    def get_or_compute(
        self,
        key: str,
        compute_fn: Callable[[], T],
        ttl: timedelta = timedelta(hours=1)
    ) -> T:
        cached = self._get(key)
        if cached is not None:
            return cached

        value = compute_fn()
        self._set(key, value, ttl)
        return value


class DatabaseFacade:
    """Hides SQLAlchemy session management, query optimization"""
    pass


# Layer 2: Domain Facades
class InventoryFacade:
    """Domain operations for inventory management"""

    def __init__(self, db: DatabaseFacade, cache: CacheFacade):
        self._db = db
        self._cache = cache

    def check_availability(self, sku: str, quantity: int) -> AvailabilityResult:
        # Uses infrastructure facades internally
        inventory = self._cache.get_or_compute(
            f"inventory:{sku}",
            lambda: self._db.get_inventory(sku),
            ttl=timedelta(minutes=5)
        )
        return AvailabilityResult(
            available=inventory.quantity >= quantity,
            current_stock=inventory.quantity
        )


class PaymentFacade:
    """Domain operations for payment processing"""

    def __init__(self, gateway: PaymentGateway, fraud: FraudService):
        self._gateway = gateway
        self._fraud = fraud


# Layer 3: Application Service Facade
class OrderServiceFacade:
    """Orchestrates order workflows across domains"""

    def __init__(
        self,
        inventory: InventoryFacade,
        payment: PaymentFacade,
        shipping: ShippingFacade,
        notifications: NotificationFacade
    ):
        self._inventory = inventory
        self._payment = payment
        self._shipping = shipping
        self._notifications = notifications

    @transactional
    def place_order(self, order_request: OrderRequest) -> OrderResult:
        """Single transaction spanning multiple domain facades"""

        # Validate across domains
        for item in order_request.items:
            availability = self._inventory.check_availability(
                item.sku, item.quantity
            )
            if not availability.available:
                raise InsufficientStockError(item.sku)

        # Reserve and charge
        reservation = self._inventory.reserve(order_request.items)
        payment = self._payment.charge(order_request.payment)

        # Create shipment
        shipment = self._shipping.create_shipment(order_request)

        # Async notification
        self._notifications.send_order_confirmation_async(
            order_request.customer_email,
            order_id=reservation.order_id
        )

        return OrderResult(
            order_id=reservation.order_id,
            payment_id=payment.transaction_id,
            tracking_number=shipment.tracking_number
        )


# Layer 4: Public API Facade
class PublicAPIFacade:
    """External-facing API with security, rate limiting, versioning"""

    def __init__(
        self,
        order_service: OrderServiceFacade,
        auth: AuthService,
        rate_limiter: RateLimiter
    ):
        self._order_service = order_service
        self._auth = auth
        self._rate_limiter = rate_limiter

    def handle_create_order(self, request: HTTPRequest) -> HTTPResponse:
        # Authentication
        user = self._auth.validate_token(request.headers["Authorization"])

        # Rate limiting
        if not self._rate_limiter.allow(user.id, "create_order"):
            return HTTPResponse(429, {"error": "Rate limit exceeded"})

        # Validate and transform request
        try:
            order_request = OrderRequest.from_api_v1(request.body, user)
        except ValidationError as e:
            return HTTPResponse(400, {"error": str(e)})

        # Delegate to application service
        try:
            result = self._order_service.place_order(order_request)
            return HTTPResponse(201, result.to_api_v1())
        except InsufficientStockError as e:
            return HTTPResponse(409, {"error": "Item unavailable"})
        except PaymentDeclinedError as e:
            return HTTPResponse(402, {"error": "Payment declined"})
```

<div style="background: linear-gradient(135deg, #9b59b622 0%, #8e44ad22 100%); border-left: 4px solid #9b59b6; border-radius: 0 8px 8px 0; padding: 1.25rem 1.5rem; margin: 1.5rem 0;">
  <div style="font-weight: 700; color: #9b59b6; margin-bottom: 0.5rem;">Design Choice: Layer Communication</div>
  <div style="color: #ccc; font-size: 0.95rem;">Each layer should only communicate with the layer immediately below it. Skipping layers (e.g., API facade directly accessing database facade) violates the layered architecture and makes the system harder to reason about, test, and modify.</div>
</div>

---

## Implementation: Complete Examples

### Go - E-Commerce Order Facade with Saga Pattern

```go
package main

import (
	"context"
	"errors"
	"fmt"
	"sync"
	"time"
)

// Subsystem interfaces

type InventoryService interface {
	CheckStock(ctx context.Context, sku string, qty int) (bool, error)
	Reserve(ctx context.Context, sku string, qty int) (string, error)
	Release(ctx context.Context, reservationID string) error
}

type PaymentService interface {
	Authorize(ctx context.Context, amount Money, card CardInfo) (string, error)
	Capture(ctx context.Context, authID string) error
	Void(ctx context.Context, authID string) error
}

type ShippingService interface {
	CalculateRate(ctx context.Context, items []Item, addr Address) (Money, error)
	CreateShipment(ctx context.Context, orderID string, items []Item, addr Address) (string, error)
	CancelShipment(ctx context.Context, shipmentID string) error
}

type NotificationService interface {
	SendOrderConfirmation(ctx context.Context, email string, order OrderDetails) error
}

// Domain types

type Money struct {
	Amount   int64
	Currency string
}

func (m Money) Add(other Money) Money {
	return Money{Amount: m.Amount + other.Amount, Currency: m.Currency}
}

type CardInfo struct {
	Number    string
	ExpMonth  int
	ExpYear   int
	CVV       string
	HolderName string
}

type Address struct {
	Street  string
	City    string
	State   string
	ZipCode string
	Country string
}

type Item struct {
	SKU      string
	Name     string
	Quantity int
	Price    Money
	Weight   float64
}

type OrderRequest struct {
	CustomerID    string
	CustomerEmail string
	Items         []Item
	ShippingAddr  Address
	BillingAddr   Address
	Card          CardInfo
}

type OrderDetails struct {
	OrderID        string
	Items          []Item
	Subtotal       Money
	ShippingCost   Money
	Tax            Money
	Total          Money
	TrackingNumber string
	EstimatedDelivery time.Time
}

// Saga implementation for distributed transaction management

type SagaStep struct {
	Name       string
	Execute    func(ctx context.Context) error
	Compensate func(ctx context.Context) error
}

type Saga struct {
	steps     []SagaStep
	executed  []int
	mu        sync.Mutex
}

func NewSaga() *Saga {
	return &Saga{
		steps:    make([]SagaStep, 0),
		executed: make([]int, 0),
	}
}

func (s *Saga) AddStep(step SagaStep) {
	s.steps = append(s.steps, step)
}

func (s *Saga) Execute(ctx context.Context) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	for i, step := range s.steps {
		if err := step.Execute(ctx); err != nil {
			// Compensate in reverse order
			s.compensate(ctx)
			return fmt.Errorf("saga failed at step '%s': %w", step.Name, err)
		}
		s.executed = append(s.executed, i)
	}
	return nil
}

func (s *Saga) compensate(ctx context.Context) {
	// Reverse order compensation
	for i := len(s.executed) - 1; i >= 0; i-- {
		stepIdx := s.executed[i]
		step := s.steps[stepIdx]
		if step.Compensate != nil {
			if err := step.Compensate(ctx); err != nil {
				// Log but continue - compensation must complete
				fmt.Printf("WARNING: compensation failed for step '%s': %v\n",
					step.Name, err)
			}
		}
	}
}

// The Facade

type OrderFacade struct {
	inventory     InventoryService
	payment       PaymentService
	shipping      ShippingService
	notifications NotificationService

	// Configuration
	taxRate       float64
	orderTimeout  time.Duration
}

type OrderFacadeConfig struct {
	TaxRate      float64
	OrderTimeout time.Duration
}

func NewOrderFacade(
	inventory InventoryService,
	payment PaymentService,
	shipping ShippingService,
	notifications NotificationService,
	config OrderFacadeConfig,
) *OrderFacade {
	return &OrderFacade{
		inventory:     inventory,
		payment:       payment,
		shipping:      shipping,
		notifications: notifications,
		taxRate:       config.TaxRate,
		orderTimeout:  config.OrderTimeout,
	}
}

func (f *OrderFacade) PlaceOrder(
	ctx context.Context,
	req OrderRequest,
) (*OrderDetails, error) {
	// Apply timeout to entire operation
	ctx, cancel := context.WithTimeout(ctx, f.orderTimeout)
	defer cancel()

	// Phase 1: Validation (fail fast, no compensation needed)
	if err := f.validateRequest(req); err != nil {
		return nil, fmt.Errorf("validation failed: %w", err)
	}

	// Check stock availability for all items
	for _, item := range req.Items {
		available, err := f.inventory.CheckStock(ctx, item.SKU, item.Quantity)
		if err != nil {
			return nil, fmt.Errorf("stock check failed: %w", err)
		}
		if !available {
			return nil, fmt.Errorf("insufficient stock for SKU %s", item.SKU)
		}
	}

	// Calculate totals
	subtotal := f.calculateSubtotal(req.Items)
	shippingCost, err := f.shipping.CalculateRate(ctx, req.Items, req.ShippingAddr)
	if err != nil {
		return nil, fmt.Errorf("shipping calculation failed: %w", err)
	}
	tax := Money{
		Amount:   int64(float64(subtotal.Amount) * f.taxRate),
		Currency: subtotal.Currency,
	}
	total := subtotal.Add(shippingCost).Add(tax)

	// Phase 2: Execute saga with compensation
	orderID := generateOrderID()
	var reservationIDs []string
	var authorizationID string
	var trackingNumber string

	saga := NewSaga()

	// Step 1: Reserve inventory
	saga.AddStep(SagaStep{
		Name: "reserve_inventory",
		Execute: func(ctx context.Context) error {
			for _, item := range req.Items {
				resID, err := f.inventory.Reserve(ctx, item.SKU, item.Quantity)
				if err != nil {
					return err
				}
				reservationIDs = append(reservationIDs, resID)
			}
			return nil
		},
		Compensate: func(ctx context.Context) error {
			for _, resID := range reservationIDs {
				f.inventory.Release(ctx, resID)
			}
			return nil
		},
	})

	// Step 2: Authorize payment
	saga.AddStep(SagaStep{
		Name: "authorize_payment",
		Execute: func(ctx context.Context) error {
			var err error
			authorizationID, err = f.payment.Authorize(ctx, total, req.Card)
			return err
		},
		Compensate: func(ctx context.Context) error {
			return f.payment.Void(ctx, authorizationID)
		},
	})

	// Step 3: Create shipment
	saga.AddStep(SagaStep{
		Name: "create_shipment",
		Execute: func(ctx context.Context) error {
			var err error
			trackingNumber, err = f.shipping.CreateShipment(
				ctx, orderID, req.Items, req.ShippingAddr)
			return err
		},
		Compensate: func(ctx context.Context) error {
			return f.shipping.CancelShipment(ctx, trackingNumber)
		},
	})

	// Step 4: Capture payment (no compensation - funds released automatically)
	saga.AddStep(SagaStep{
		Name: "capture_payment",
		Execute: func(ctx context.Context) error {
			return f.payment.Capture(ctx, authorizationID)
		},
		Compensate: nil, // Capture is final - handle via refund process
	})

	// Execute the saga
	if err := saga.Execute(ctx); err != nil {
		return nil, err
	}

	// Build order details
	orderDetails := &OrderDetails{
		OrderID:          orderID,
		Items:            req.Items,
		Subtotal:         subtotal,
		ShippingCost:     shippingCost,
		Tax:              tax,
		Total:            total,
		TrackingNumber:   trackingNumber,
		EstimatedDelivery: time.Now().AddDate(0, 0, 5),
	}

	// Async notification (fire and forget with logging)
	go func() {
		bgCtx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()
		if err := f.notifications.SendOrderConfirmation(
			bgCtx, req.CustomerEmail, *orderDetails); err != nil {
			fmt.Printf("WARNING: failed to send confirmation: %v\n", err)
		}
	}()

	return orderDetails, nil
}

func (f *OrderFacade) validateRequest(req OrderRequest) error {
	if len(req.Items) == 0 {
		return errors.New("order must contain at least one item")
	}
	if req.CustomerEmail == "" {
		return errors.New("customer email is required")
	}
	// Additional validation...
	return nil
}

func (f *OrderFacade) calculateSubtotal(items []Item) Money {
	var total int64
	currency := "USD"
	for _, item := range items {
		total += item.Price.Amount * int64(item.Quantity)
		currency = item.Price.Currency
	}
	return Money{Amount: total, Currency: currency}
}

func generateOrderID() string {
	return fmt.Sprintf("ORD-%d", time.Now().UnixNano())
}
```

### Python - Media Processing Facade with Progress Tracking

```python
from __future__ import annotations
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from enum import Enum, auto
from pathlib import Path
from typing import Callable, Dict, List, Optional, Protocol
from concurrent.futures import ThreadPoolExecutor, Future
import threading
import time


class ProcessingStage(Enum):
    ANALYZING = auto()
    TRANSCODING = auto()
    PACKAGING = auto()
    UPLOADING = auto()
    COMPLETE = auto()
    FAILED = auto()


@dataclass
class ProgressUpdate:
    stage: ProcessingStage
    percent: float
    message: str
    elapsed_seconds: float
    estimated_remaining: Optional[float] = None


ProgressCallback = Callable[[ProgressUpdate], None]


# Subsystem protocols

class MediaAnalyzer(Protocol):
    def analyze(self, source: Path) -> MediaMetadata: ...


class Transcoder(Protocol):
    def transcode(
        self,
        source: Path,
        output: Path,
        params: TranscodeParams,
        on_progress: Optional[Callable[[float], None]] = None
    ) -> TranscodeResult: ...


class Packager(Protocol):
    def create_manifest(
        self,
        variants: List[Path],
        output_dir: Path
    ) -> Path: ...

    def create_thumbnails(
        self,
        source: Path,
        output_dir: Path,
        interval_seconds: int
    ) -> List[Path]: ...


class CDNUploader(Protocol):
    def upload(
        self,
        files: List[Path],
        destination: str,
        on_progress: Optional[Callable[[float], None]] = None
    ) -> CDNUploadResult: ...


# Domain types

@dataclass
class MediaMetadata:
    duration_seconds: float
    width: int
    height: int
    codec: str
    bitrate: int
    audio_tracks: List[AudioTrack]


@dataclass
class AudioTrack:
    language: str
    codec: str
    channels: int


@dataclass
class TranscodeParams:
    resolution: str
    video_codec: str = "h264"
    audio_codec: str = "aac"
    video_bitrate: int = 5000000
    audio_bitrate: int = 128000
    keyframe_interval: int = 2


@dataclass
class TranscodeResult:
    output_path: Path
    duration_seconds: float
    file_size_bytes: int


@dataclass
class CDNUploadResult:
    urls: Dict[str, str]
    manifest_url: str


@dataclass
class QualityPreset:
    name: str
    resolution: str
    video_bitrate: int

    @classmethod
    def hd_1080p(cls) -> QualityPreset:
        return cls("1080p", "1920x1080", 5000000)

    @classmethod
    def hd_720p(cls) -> QualityPreset:
        return cls("720p", "1280x720", 2500000)

    @classmethod
    def sd_480p(cls) -> QualityPreset:
        return cls("480p", "854x480", 1000000)

    @classmethod
    def default_ladder(cls) -> List[QualityPreset]:
        return [cls.hd_1080p(), cls.hd_720p(), cls.sd_480p()]


@dataclass
class ProcessingResult:
    """Complete result of media processing pipeline"""
    manifest_url: str
    variant_urls: Dict[str, str]
    thumbnail_urls: List[str]
    metadata: MediaMetadata
    processing_time_seconds: float


@dataclass
class ProcessingJob:
    """Internal job tracking"""
    id: str
    source: Path
    stage: ProcessingStage = ProcessingStage.ANALYZING
    progress: float = 0.0
    start_time: float = field(default_factory=time.time)
    error: Optional[str] = None
    result: Optional[ProcessingResult] = None
    _lock: threading.Lock = field(default_factory=threading.Lock)

    def update(
        self,
        stage: ProcessingStage,
        progress: float,
        callback: Optional[ProgressCallback] = None
    ):
        with self._lock:
            self.stage = stage
            self.progress = progress

            if callback:
                elapsed = time.time() - self.start_time
                callback(ProgressUpdate(
                    stage=stage,
                    percent=progress,
                    message=f"{stage.name}: {progress:.1f}%",
                    elapsed_seconds=elapsed
                ))


class MediaProcessingFacade:
    """
    Unified interface for complex media processing pipeline.

    Encapsulates:
    - Media analysis and validation
    - Multi-quality transcoding (parallel)
    - Adaptive bitrate packaging (HLS/DASH)
    - CDN upload with resumability
    - Progress tracking and callbacks

    Trade-offs:
    - Memory: Keeps job state in memory (use Redis for distributed)
    - Parallelism: Thread pool size affects resource usage
    - Error handling: Partial failures require manual cleanup
    """

    def __init__(
        self,
        analyzer: MediaAnalyzer,
        transcoder: Transcoder,
        packager: Packager,
        uploader: CDNUploader,
        work_dir: Path,
        max_parallel_transcodes: int = 3
    ):
        self._analyzer = analyzer
        self._transcoder = transcoder
        self._packager = packager
        self._uploader = uploader
        self._work_dir = work_dir
        self._executor = ThreadPoolExecutor(max_workers=max_parallel_transcodes)
        self._jobs: Dict[str, ProcessingJob] = {}
        self._lock = threading.Lock()

    def process_for_streaming(
        self,
        source: Path,
        cdn_destination: str,
        presets: Optional[List[QualityPreset]] = None,
        on_progress: Optional[ProgressCallback] = None
    ) -> ProcessingResult:
        """
        Process media file for adaptive streaming delivery.

        Args:
            source: Path to source media file
            cdn_destination: CDN path prefix for uploads
            presets: Quality ladder (defaults to 1080p, 720p, 480p)
            on_progress: Optional callback for progress updates

        Returns:
            ProcessingResult with URLs and metadata

        Raises:
            MediaProcessingError: If any stage fails
        """
        presets = presets or QualityPreset.default_ladder()
        job_id = self._create_job_id(source)
        job = ProcessingJob(id=job_id, source=source)

        with self._lock:
            self._jobs[job_id] = job

        try:
            # Stage 1: Analyze source
            job.update(ProcessingStage.ANALYZING, 0, on_progress)
            metadata = self._analyzer.analyze(source)
            job.update(ProcessingStage.ANALYZING, 100, on_progress)

            # Stage 2: Transcode to all quality levels (parallel)
            job.update(ProcessingStage.TRANSCODING, 0, on_progress)
            variants = self._transcode_parallel(
                source, presets, job, on_progress
            )
            job.update(ProcessingStage.TRANSCODING, 100, on_progress)

            # Stage 3: Package for streaming
            job.update(ProcessingStage.PACKAGING, 0, on_progress)
            output_dir = self._work_dir / job_id
            manifest = self._packager.create_manifest(variants, output_dir)
            thumbnails = self._packager.create_thumbnails(
                source, output_dir, interval_seconds=10
            )
            job.update(ProcessingStage.PACKAGING, 100, on_progress)

            # Stage 4: Upload to CDN
            job.update(ProcessingStage.UPLOADING, 0, on_progress)
            all_files = variants + [manifest] + thumbnails
            upload_result = self._uploader.upload(
                all_files,
                cdn_destination,
                on_progress=lambda p: job.update(
                    ProcessingStage.UPLOADING, p, on_progress
                )
            )

            # Build result
            job.update(ProcessingStage.COMPLETE, 100, on_progress)
            result = ProcessingResult(
                manifest_url=upload_result.manifest_url,
                variant_urls=upload_result.urls,
                thumbnail_urls=[
                    upload_result.urls[t.name] for t in thumbnails
                ],
                metadata=metadata,
                processing_time_seconds=time.time() - job.start_time
            )
            job.result = result
            return result

        except Exception as e:
            job.stage = ProcessingStage.FAILED
            job.error = str(e)
            raise MediaProcessingError(
                f"Processing failed at {job.stage.name}: {e}"
            ) from e

    def _transcode_parallel(
        self,
        source: Path,
        presets: List[QualityPreset],
        job: ProcessingJob,
        on_progress: Optional[ProgressCallback]
    ) -> List[Path]:
        """Transcode to multiple qualities in parallel"""
        futures: List[tuple[QualityPreset, Future]] = []
        progress_per_preset: Dict[str, float] = {p.name: 0 for p in presets}
        progress_lock = threading.Lock()

        def update_aggregate_progress():
            with progress_lock:
                total = sum(progress_per_preset.values()) / len(presets)
                job.update(ProcessingStage.TRANSCODING, total, on_progress)

        for preset in presets:
            output = self._work_dir / job.id / f"{preset.name}.mp4"
            output.parent.mkdir(parents=True, exist_ok=True)

            def transcode_one(p: QualityPreset, out: Path):
                def on_transcode_progress(percent: float):
                    progress_per_preset[p.name] = percent
                    update_aggregate_progress()

                params = TranscodeParams(
                    resolution=p.resolution,
                    video_bitrate=p.video_bitrate
                )
                result = self._transcoder.transcode(
                    source, out, params, on_transcode_progress
                )
                return result.output_path

            future = self._executor.submit(transcode_one, preset, output)
            futures.append((preset, future))

        # Wait for all and collect results
        variants = []
        errors = []
        for preset, future in futures:
            try:
                variants.append(future.result())
            except Exception as e:
                errors.append(f"{preset.name}: {e}")

        if errors:
            raise MediaProcessingError(
                f"Transcoding failed: {'; '.join(errors)}"
            )

        return variants

    def get_job_status(self, job_id: str) -> Optional[ProcessingJob]:
        """Get current status of a processing job"""
        with self._lock:
            return self._jobs.get(job_id)

    def _create_job_id(self, source: Path) -> str:
        return f"job_{source.stem}_{int(time.time() * 1000)}"


class MediaProcessingError(Exception):
    """Raised when media processing fails"""
    pass
```

---

## Edge Cases and Failure Handling

### Partial Failure Scenarios

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 1.5rem; margin: 2rem 0;">
  <div style="color: #e74c3c; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">Critical Edge Cases</div>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="background: rgba(231, 76, 60, 0.1); border-radius: 8px; padding: 1rem; border-left: 3px solid #e74c3c;">
      <div style="color: #e74c3c; font-weight: 600; margin-bottom: 0.5rem;">Subsystem Timeout Mid-Operation</div>
      <div style="color: #aaa; font-size: 0.9rem;">Payment authorized but shipping service times out. Authorization will auto-expire in 7 days. Must track authorization IDs for manual void if shipment creation fails permanently.</div>
    </div>
    <div style="background: rgba(230, 126, 34, 0.1); border-radius: 8px; padding: 1rem; border-left: 3px solid #e67e22;">
      <div style="color: #e67e22; font-weight: 600; margin-bottom: 0.5rem;">Compensation Failure</div>
      <div style="color: #aaa; font-size: 0.9rem;">Saga compensation step fails (e.g., inventory release fails). System enters inconsistent state. Requires: dead letter queue for failed compensations, manual intervention workflows, idempotent compensation operations.</div>
    </div>
    <div style="background: rgba(241, 196, 15, 0.1); border-radius: 8px; padding: 1rem; border-left: 3px solid #f1c40f;">
      <div style="color: #f1c40f; font-weight: 600; margin-bottom: 0.5rem;">Subsystem State Divergence</div>
      <div style="color: #aaa; font-size: 0.9rem;">Network partition causes Facade to believe operation failed, but subsystem succeeded. Implement idempotency keys, exactly-once semantics, or compensating transactions with reconciliation.</div>
    </div>
    <div style="background: rgba(46, 204, 113, 0.1); border-radius: 8px; padding: 1rem; border-left: 3px solid #2ecc71;">
      <div style="color: #2ecc71; font-weight: 600; margin-bottom: 0.5rem;">Circular Dependency</div>
      <div style="color: #aaa; font-size: 0.9rem;">Subsystem A requires initialization data from Subsystem B, which requires A. Solution: lazy initialization, dependency injection containers, or two-phase initialization in Facade constructor.</div>
    </div>
  </div>
</div>

### Idempotency in Facades

```python
class IdempotentOrderFacade:
    """Facade with built-in idempotency for distributed systems"""

    def __init__(
        self,
        order_service: OrderService,
        idempotency_store: IdempotencyStore,  # Redis/DynamoDB
        ttl: timedelta = timedelta(hours=24)
    ):
        self._orders = order_service
        self._store = idempotency_store
        self._ttl = ttl

    def place_order(
        self,
        idempotency_key: str,  # Client-provided unique key
        request: OrderRequest
    ) -> OrderResult:
        """
        Idempotent order placement.

        If called multiple times with same idempotency_key:
        - In-progress: Raises ConcurrentOperationError
        - Completed: Returns cached result
        - Failed: Allows retry
        """
        # Check for existing operation
        existing = self._store.get(idempotency_key)

        if existing:
            if existing.status == "completed":
                return existing.result  # Return cached result
            elif existing.status == "in_progress":
                if existing.started_at > datetime.now() - timedelta(minutes=5):
                    raise ConcurrentOperationError(
                        "Operation already in progress"
                    )
                # Stale in-progress, allow retry

        # Mark as in-progress
        self._store.set(
            idempotency_key,
            IdempotencyRecord(
                status="in_progress",
                started_at=datetime.now(),
                request_hash=hash_request(request)
            ),
            ttl=self._ttl
        )

        try:
            result = self._orders.place_order(request)

            # Mark as completed with result
            self._store.set(
                idempotency_key,
                IdempotencyRecord(
                    status="completed",
                    result=result,
                    completed_at=datetime.now()
                ),
                ttl=self._ttl
            )

            return result

        except Exception as e:
            # Mark as failed (allows retry)
            self._store.set(
                idempotency_key,
                IdempotencyRecord(
                    status="failed",
                    error=str(e),
                    failed_at=datetime.now()
                ),
                ttl=self._ttl
            )
            raise
```

---

## Interview Questions: 3-Level Recursive Deep Dive

### Section 1: Core Facade Concepts

**Level 1: What is the Facade pattern and when would you use it?**

The Facade pattern provides a simplified interface to a complex subsystem. Use it when:
- A subsystem has many interdependent classes with complex initialization
- You want to decouple clients from subsystem implementation details
- You need to layer a subsystem with different abstraction levels
- Third-party libraries have complex APIs that most clients only use partially

> **Level 2: How do you decide what belongs in the Facade interface versus exposing subsystem components directly?**

The decision involves analyzing usage patterns and coupling trade-offs:

1. **80/20 Analysis**: If 80% of clients need the same 20% of subsystem functionality, that 20% belongs in the Facade
2. **Cohesion Test**: Operations that are always called together should be combined into single Facade methods
3. **Stability Principle**: Stable, well-understood operations go in Facade; experimental features can remain direct
4. **Error Boundary**: Operations requiring complex error handling/recovery should be in Facade

```python
class GoodFacade:
    def common_workflow(self):  # 80% of clients need this
        pass

    def get_subsystem(self) -> Subsystem:  # Escape hatch for power users
        return self._subsystem
```

>> **Level 3: What happens when Facade method granularity doesn't match client transaction boundaries?**

This creates the **Transaction Boundary Mismatch Problem**:

```python
# Facade designed for individual operations
class PaymentFacade:
    def authorize(self, payment): ...
    def capture(self, auth_id): ...

# But client needs atomic "charge" operation
# If authorize succeeds but capture fails, who handles cleanup?
```

Solutions:
1. **Saga in Facade**: Facade implements compensating transactions internally
2. **Unit of Work**: Facade accepts transaction context, client manages boundaries
3. **Operation Composition**: Add coarse-grained methods alongside fine-grained
4. **Event Sourcing**: Facade emits events, separate handler ensures consistency

The trade-off: Coarse-grained methods reduce flexibility; fine-grained methods leak transaction complexity to clients.

---

### Section 2: Facade vs Related Patterns

**Level 1: How does Facade differ from [[Adapter]](/topic/design-patterns/adapter)?**

| Aspect | Facade | Adapter |
|--------|--------|---------|
| **Intent** | Simplify | Make compatible |
| **Interface** | Creates new | Conforms to existing |
| **Scope** | Multiple classes | Single class |
| **Direction** | Many-to-one | One-to-one |

> **Level 2: Can a system use both Facade and Adapter, and how do they interact?**

Yes, commonly in these configurations:

1. **Adapter inside Facade**: Facade uses Adapters for individual subsystem components
2. **Facade wrapped by Adapter**: Legacy Facade adapted to new interface requirements
3. **Parallel existence**: Different entry points for different client types

```python
class PaymentFacade:
    def __init__(self):
        # Adapters hide third-party payment gateway differences
        self._stripe = StripeAdapter(stripe.Client())
        self._paypal = PayPalAdapter(paypal.SDK())

    def charge(self, method: PaymentMethod, amount: Money):
        # Facade selects and orchestrates adapted components
        adapter = self._stripe if method.type == "card" else self._paypal
        return adapter.charge(amount)
```

>> **Level 3: When does combining Facade and Adapter create problematic coupling, and how do you avoid it?**

Problems arise when:

1. **Adaptation Logic Leaks**: Facade makes decisions based on adaptee internals
2. **Circular Dependencies**: Adapter needs Facade context, Facade needs Adapter
3. **Inconsistent Abstractions**: Adapted interfaces don't align semantically

```python
# PROBLEMATIC: Facade knows too much about Stripe internals
class BadPaymentFacade:
    def charge(self, amount):
        if self._stripe._client.api_version < "2020-01-01":  # Leaking!
            return self._stripe.legacy_charge(amount)
        return self._stripe.charge(amount)

# BETTER: Adapter handles all version differences internally
class StripeAdapter:
    def charge(self, amount):
        # Version handling encapsulated in adapter
        if self._api_version < "2020-01-01":
            return self._legacy_charge(amount)
        return self._modern_charge(amount)
```

**Avoidance strategies**:
- [[Dependency Inversion]](/topic/design-patterns/dependency-inversion): Define interfaces in Facade layer, Adapters implement
- [[Strategy Pattern]](/topic/design-patterns/strategy): Inject payment strategies rather than concrete adapters
- Anti-Corruption Layer: Separate translation layer between domains

---

### Section 3: Subsystem Encapsulation

**Level 1: What does "encapsulation" mean in the context of Facades?**

Facade encapsulation means hiding:
- Internal class relationships and dependencies
- Initialization order and configuration complexity
- Communication protocols between components
- Error types and recovery mechanisms
- Resource management (connections, threads, memory)

> **Level 2: How do you handle subsystem state that needs to be exposed without breaking encapsulation?**

Options with trade-offs:

1. **Snapshot DTOs**: Return immutable copies of state
   - Pro: Full encapsulation, thread-safe
   - Con: Memory overhead, potential staleness

2. **Observable/Callback**: Subsystem pushes state changes
   - Pro: Real-time, inverted control
   - Con: Callback complexity, ordering issues

3. **Read-Only Views**: Return interfaces with only getters
   - Pro: Type safety, no copies
   - Con: Still exposes structure

```python
class InventoryFacade:
    def get_stock_snapshot(self, sku: str) -> StockSnapshot:
        """Returns immutable point-in-time view"""
        stock = self._warehouse.get_stock(sku)
        return StockSnapshot(
            sku=sku,
            available=stock.available,
            reserved=stock.reserved,
            as_of=datetime.now()
        )

    def subscribe_stock_changes(
        self,
        sku: str,
        callback: Callable[[StockChange], None]
    ) -> Subscription:
        """Push-based state observation"""
        return self._event_bus.subscribe(
            f"stock.{sku}.changed",
            lambda event: callback(StockChange.from_event(event))
        )
```

>> **Level 3: What are the implications of Facade encapsulation for testing and debugging in production?**

**Testing Challenges**:
- Cannot inject mocks for internal components without breaking encapsulation
- Integration tests become necessary, increasing test time and flakiness
- Behavior verification requires observing side effects, not internal state

**Solutions**:
```python
class TestableOrderFacade:
    def __init__(
        self,
        # Inject through constructor for testability
        inventory: InventoryService = None,
        payment: PaymentService = None
    ):
        # Production code can pass None for defaults
        self._inventory = inventory or ProductionInventoryService()
        self._payment = payment or ProductionPaymentService()
```

**Production Debugging Challenges**:
- Logs must be emitted at Facade boundary, not just subsystems
- Correlation IDs must propagate through all subsystems
- Metrics aggregation: distinguish Facade latency from subsystem latency

```python
class InstrumentedFacade:
    def place_order(self, request):
        correlation_id = generate_correlation_id()
        context = Context(correlation_id=correlation_id)

        with self._tracer.span("facade.place_order") as span:
            span.set_attribute("correlation_id", correlation_id)

            try:
                # Pass context to all subsystem calls
                result = self._do_place_order(request, context)
                span.set_status(Status.OK)
                return result
            except Exception as e:
                span.set_status(Status.ERROR, str(e))
                span.record_exception(e)
                raise
```

---

### Section 4: Layered Facades

**Level 1: When should you use multiple layers of Facades?**

Use layered Facades when:
- Different clients need different abstraction levels (API vs internal services)
- System has distinct architectural boundaries (infrastructure, domain, application)
- Teams own different layers with separate release cycles
- Security/audit requirements differ by layer

> **Level 2: How do you prevent layered Facades from becoming a performance bottleneck?**

Each layer adds overhead:
- Method call overhead (minimal)
- Object allocation for DTOs between layers (can be significant)
- Validation repeated at each layer (redundant)
- Logging/tracing at each layer (multiplicative)

**Optimization strategies**:

```python
# 1. Bypass layers for read-heavy paths
class OptimizedLayeredFacade:
    def get_user_profile(self, user_id: str):
        # Skip domain layer, go directly to cache
        return self._cache.get(f"profile:{user_id}")

    def update_user_profile(self, user_id: str, updates: dict):
        # Full layer traversal for writes
        return self._domain_facade.update_user(user_id, updates)

# 2. Bulk operations to amortize layer overhead
class BatchAwareFacade:
    def get_users(self, user_ids: List[str]):
        # Single traversal for many items
        return self._domain_facade.get_users_batch(user_ids)

# 3. Lazy loading to defer layer traversal
class LazyLayeredFacade:
    def get_order(self, order_id: str) -> LazyOrder:
        # Returns proxy, only traverses layers on access
        return LazyOrder(order_id, self._domain_facade)
```

>> **Level 3: How do you handle cross-layer transactions in a layered Facade architecture?**

Cross-layer transactions are inherently challenging because each layer may have its own transaction semantics:

**Problem scenarios**:
1. API layer commits but domain layer rolls back
2. Domain layer commits but infrastructure layer fails
3. Partial commits across layers leave inconsistent state

**Solutions by architecture style**:

**Monolithic (shared database)**:
```python
class TransactionalFacade:
    @transactional(propagation=REQUIRED)  # Share transaction
    def place_order(self, request):
        # All layers share same DB transaction
        order = self._domain_facade.create_order(request)
        self._notification_facade.queue_confirmation(order)
        return order
```

**Microservices (distributed)**:
```python
class SagaOrchestrator:
    """Cross-service saga managed at API layer"""

    def place_order(self, request):
        saga = Saga()

        # Each step is independent transaction
        saga.add_step(
            execute=lambda: self._order_service.create(request),
            compensate=lambda r: self._order_service.cancel(r.order_id)
        )
        saga.add_step(
            execute=lambda: self._payment_service.charge(request.payment),
            compensate=lambda r: self._payment_service.refund(r.payment_id)
        )

        return saga.execute()
```

**Event Sourcing**:
```python
class EventSourcedFacade:
    """Events are source of truth, projections are eventually consistent"""

    def place_order(self, request):
        # Emit event - single atomic write
        event = OrderPlaced(request)
        self._event_store.append(event)

        # Projections update asynchronously
        # UI shows "processing" until projections catch up
        return OrderPending(event.id)
```

---

### Section 5: Real-World Implications

**Level 1: What are common mistakes when implementing the Facade pattern?**

1. **God Facade**: Single Facade becomes dumping ground for all subsystem access
2. **Leaky Abstraction**: Facade methods expose subsystem-specific types/exceptions
3. **Tight Coupling**: Facade directly instantiates all dependencies (no DI)
4. **Missing Escape Hatch**: No way to access subsystem for advanced use cases
5. **Inconsistent Granularity**: Mix of high-level and low-level operations

> **Level 2: How do you evolve a Facade's API without breaking existing clients?**

**Versioning strategies**:

```python
# 1. Method-level versioning
class PaymentFacade:
    def charge(self, amount: Money) -> ChargeResult:
        """Original method, maintained for compatibility"""
        return self.charge_v2(amount, ChargeOptions())

    def charge_v2(
        self,
        amount: Money,
        options: ChargeOptions
    ) -> ChargeResultV2:
        """Enhanced version with more options"""
        pass

# 2. Interface versioning
class PaymentFacadeV1(Protocol):
    def charge(self, amount: Money) -> ChargeResult: ...

class PaymentFacadeV2(PaymentFacadeV1):
    def charge_with_options(
        self, amount: Money, options: ChargeOptions
    ) -> ChargeResultV2: ...

# 3. Feature flags
class PaymentFacade:
    def charge(self, amount: Money, **kwargs) -> ChargeResult:
        if self._features.is_enabled("enhanced_fraud_check"):
            return self._charge_with_enhanced_fraud(amount, **kwargs)
        return self._legacy_charge(amount)
```

>> **Level 3: How does Facade design change in distributed systems with eventual consistency?**

Distributed Facades must handle:

1. **Partial Visibility**: Client may see stale state due to replication lag
2. **Conflicting Updates**: Concurrent operations may create conflicts
3. **Network Partitions**: Subsystems may be temporarily unreachable
4. **Ordering Guarantees**: Operations may complete out of order

```python
class DistributedOrderFacade:
    def place_order(self, request: OrderRequest) -> OrderHandle:
        """
        Returns handle immediately, order processes asynchronously.
        Client must poll or subscribe for completion.
        """
        # Write to durable queue - fast, reliable
        message_id = self._queue.publish(
            topic="orders.pending",
            message=request.to_message(),
            deduplication_id=request.idempotency_key
        )

        # Return handle for tracking
        return OrderHandle(
            tracking_id=message_id,
            status_url=f"/orders/{message_id}/status",
            estimated_completion=timedelta(seconds=30)
        )

    def get_order_status(self, tracking_id: str) -> OrderStatus:
        """
        May return PENDING, PROCESSING, COMPLETED, or FAILED.
        COMPLETED may still show stale details due to replication.
        """
        # Check fast cache first
        cached = self._cache.get(f"order:{tracking_id}")
        if cached and cached.status in ("COMPLETED", "FAILED"):
            return cached

        # Fall back to source of truth (slower)
        return self._order_store.get_status(tracking_id)

    async def subscribe_order_updates(
        self,
        tracking_id: str
    ) -> AsyncIterator[OrderUpdate]:
        """
        Real-time updates via SSE or WebSocket.
        Handles reconnection and replay.
        """
        last_seen = None
        while True:
            updates = await self._event_stream.read(
                topic=f"orders.{tracking_id}",
                after=last_seen
            )
            for update in updates:
                last_seen = update.sequence
                yield update
                if update.is_terminal:
                    return
```

<div style="background: linear-gradient(135deg, #e74c3c22 0%, #c0392b22 100%); border-left: 4px solid #e74c3c; border-radius: 0 8px 8px 0; padding: 1.25rem 1.5rem; margin: 1.5rem 0;">
  <div style="font-weight: 700; color: #e74c3c; margin-bottom: 0.5rem;">Eventual Consistency Trade-off</div>
  <div style="color: #ccc; font-size: 0.95rem;">Distributed Facades trade immediate consistency for availability and partition tolerance ([[CAP Theorem]](/topic/system-design/cap-theorem)). The Facade API must communicate this: return handles instead of results, provide status polling, and document staleness windows.</div>
</div>

---

## Best Practices and Anti-Patterns

### Best Practices

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #27ae6022 0%, #2ecc7122 100%); border: 1px solid #27ae60; border-radius: 10px; padding: 1.25rem;">
    <div style="color: #27ae60; font-weight: 700; margin-bottom: 0.75rem;">Provide Escape Hatches</div>
    <div style="color: #bbb; font-size: 0.9rem;">Expose underlying subsystems for power users who need fine-grained control. Don't force all access through Facade.</div>
  </div>
  <div style="background: linear-gradient(135deg, #27ae6022 0%, #2ecc7122 100%); border: 1px solid #27ae60; border-radius: 10px; padding: 1.25rem;">
    <div style="color: #27ae60; font-weight: 700; margin-bottom: 0.75rem;">Design for Composition</div>
    <div style="color: #bbb; font-size: 0.9rem;">Accept dependencies through constructor (DI) rather than creating them internally. Enables testing and flexibility.</div>
  </div>
  <div style="background: linear-gradient(135deg, #27ae6022 0%, #2ecc7122 100%); border: 1px solid #27ae60; border-radius: 10px; padding: 1.25rem;">
    <div style="color: #27ae60; font-weight: 700; margin-bottom: 0.75rem;">Translate Errors Consistently</div>
    <div style="color: #bbb; font-size: 0.9rem;">Convert subsystem exceptions to Facade-specific errors. Include retriability hints and correlation IDs.</div>
  </div>
  <div style="background: linear-gradient(135deg, #27ae6022 0%, #2ecc7122 100%); border: 1px solid #27ae60; border-radius: 10px; padding: 1.25rem;">
    <div style="color: #27ae60; font-weight: 700; margin-bottom: 0.75rem;">Document Assumptions</div>
    <div style="color: #bbb; font-size: 0.9rem;">Clearly state thread-safety guarantees, transaction boundaries, and consistency models.</div>
  </div>
</div>

### Anti-Patterns

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
  <div style="background: linear-gradient(135deg, #e74c3c22 0%, #c0392b22 100%); border: 1px solid #e74c3c; border-radius: 10px; padding: 1.25rem;">
    <div style="color: #e74c3c; font-weight: 700; margin-bottom: 0.75rem;">God Facade</div>
    <div style="color: #bbb; font-size: 0.9rem;">Single Facade with 50+ methods covering unrelated functionality. Split into focused, cohesive Facades.</div>
  </div>
  <div style="background: linear-gradient(135deg, #e74c3c22 0%, #c0392b22 100%); border: 1px solid #e74c3c; border-radius: 10px; padding: 1.25rem;">
    <div style="color: #e74c3c; font-weight: 700; margin-bottom: 0.75rem;">Transparent Facade</div>
    <div style="color: #bbb; font-size: 0.9rem;">Facade methods that simply delegate to single subsystem method without adding value. Remove unnecessary indirection.</div>
  </div>
  <div style="background: linear-gradient(135deg, #e74c3c22 0%, #c0392b22 100%); border: 1px solid #e74c3c; border-radius: 10px; padding: 1.25rem;">
    <div style="color: #e74c3c; font-weight: 700; margin-bottom: 0.75rem;">Shared State Facade</div>
    <div style="color: #bbb; font-size: 0.9rem;">Facade holds mutable state between method calls. Keep Facades stateless; state belongs in subsystems.</div>
  </div>
  <div style="background: linear-gradient(135deg, #e74c3c22 0%, #c0392b22 100%); border: 1px solid #e74c3c; border-radius: 10px; padding: 1.25rem;">
    <div style="color: #e74c3c; font-weight: 700; margin-bottom: 0.75rem;">Facade Without Abstraction</div>
    <div style="color: #bbb; font-size: 0.9rem;">Facade interface exposes implementation details (concrete types, config objects). Define clean, abstract contracts.</div>
  </div>
</div>

---

## Related Patterns

- [[Adapter]](/topic/design-patterns/adapter) - Interface translation vs simplification
- [[Mediator]](/topic/design-patterns/mediator) - Centralizes communication between components
- [[Proxy]](/topic/design-patterns/proxy) - Controls access to another object
- [[Abstract Factory]](/topic/design-patterns/abstract-factory) - Often used with Facade for subsystem creation
- [[Singleton]](/topic/design-patterns/singleton) - Facades often implemented as singletons (with caution)
- [[Composite]](/topic/design-patterns/composite) - Subsystems may be composites accessed through Facade

---

## Summary

The Facade pattern is deceptively simple in concept but requires careful design in practice. Key takeaways:

1. **Simplification, not hiding**: Provide simplified access while allowing direct subsystem access when needed
2. **Transaction management**: Facades often become natural transaction boundaries requiring saga/compensation patterns
3. **Layering strategy**: Multiple Facade layers serve different abstraction needs but add overhead
4. **Distributed challenges**: Eventual consistency, idempotency, and correlation become critical concerns
5. **Evolution planning**: Version Facade APIs from the start; breaking changes are expensive

The most successful Facades balance simplicity with flexibility, hiding complexity without restricting power users.
