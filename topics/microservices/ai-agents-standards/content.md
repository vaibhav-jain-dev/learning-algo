# Microservices Standards for AI Agents: Context & Recommendations

## Overview

As AI agents become integral to software development and operations, microservices architectures need to be designed with AI-friendliness in mind. This guide covers standards and recommendations for making microservices more understandable and manageable by AI systems.

**Tags:** AI, Standards, Documentation, Automation, Best Practices

---

## Why AI-Friendly Architecture Matters

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                AI AGENTS IN MICROSERVICES ECOSYSTEM                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  AI AGENTS ARE BEING USED FOR:                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  1. CODE GENERATION & REVIEW                                        │    │
│  │     • GitHub Copilot, Claude, ChatGPT generating code               │    │
│  │     • Automated PR reviews                                          │    │
│  │     • Code refactoring suggestions                                  │    │
│  │                                                                      │    │
│  │  2. INCIDENT RESPONSE                                               │    │
│  │     • Automated root cause analysis                                 │    │
│  │     • Runbook execution                                             │    │
│  │     • Alert correlation                                             │    │
│  │                                                                      │    │
│  │  3. INFRASTRUCTURE MANAGEMENT                                       │    │
│  │     • Auto-scaling decisions                                        │    │
│  │     • Resource optimization                                         │    │
│  │     • Deployment automation                                         │    │
│  │                                                                      │    │
│  │  4. DOCUMENTATION & ONBOARDING                                      │    │
│  │     • Generating documentation from code                            │    │
│  │     • Answering developer questions                                 │    │
│  │     • Creating architecture diagrams                                │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  THE PROBLEM:                                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  AI agents struggle with:                                            │    │
│  │  • Undocumented service relationships                                │    │
│  │  • Inconsistent naming conventions                                   │    │
│  │  • Missing context about business logic                              │    │
│  │  • Unclear API contracts                                             │    │
│  │  • Lack of standardized metadata                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Standard 1: Service Manifest Files

Every service should have a machine-readable manifest.

### Service Manifest (service.yaml)

```yaml
# service.yaml - Standard service manifest
apiVersion: microservices/v1
kind: ServiceManifest

metadata:
  name: order-service
  version: 2.1.0
  team: commerce
  owner: commerce-team@company.com
  repository: https://github.com/company/order-service
  documentation: https://docs.company.com/order-service

description: |
  Manages the complete order lifecycle including creation,
  payment processing, fulfillment tracking, and returns.

  Business Context:
  - Orders are created when users complete checkout
  - Order status progresses through: CREATED → PAID → SHIPPED → DELIVERED
  - Supports partial returns and refunds

# Service dependencies
dependencies:
  synchronous:
    - name: user-service
      purpose: "Validate user exists and fetch shipping addresses"
      criticality: critical  # critical, degraded, optional
      fallback: "Cache user data for 24 hours"

    - name: inventory-service
      purpose: "Reserve and commit inventory for order items"
      criticality: critical
      fallback: "Queue order for manual processing"

    - name: payment-service
      purpose: "Process payment for order"
      criticality: critical
      fallback: "None - payment required"

  asynchronous:
    - name: notification-service
      purpose: "Send order confirmation and updates"
      criticality: optional
      events_published:
        - order.created
        - order.updated
        - order.completed

    - name: analytics-service
      purpose: "Track order metrics"
      criticality: optional

# API specification
api:
  type: REST
  spec_file: ./openapi.yaml
  base_path: /api/v2/orders

  # Key endpoints for AI understanding
  key_endpoints:
    - path: POST /orders
      purpose: "Create a new order from cart"
      idempotent: false
      side_effects:
        - "Reserves inventory"
        - "Publishes order.created event"

    - path: GET /orders/{id}
      purpose: "Get order details"
      idempotent: true

    - path: POST /orders/{id}/cancel
      purpose: "Cancel an order"
      idempotent: true
      preconditions:
        - "Order status must be CREATED or PAID"
      side_effects:
        - "Releases reserved inventory"
        - "Initiates refund if paid"
        - "Publishes order.cancelled event"

# Events (for event-driven communication)
events:
  published:
    - name: order.created
      schema: ./schemas/order-created.avsc
      description: "Emitted when a new order is created"

    - name: order.updated
      schema: ./schemas/order-updated.avsc
      description: "Emitted when order status changes"

  subscribed:
    - name: payment.completed
      source: payment-service
      handler: handlePaymentCompleted
      description: "Updates order status when payment succeeds"

    - name: shipment.delivered
      source: logistics-service
      handler: handleShipmentDelivered
      description: "Marks order as delivered"

# Data ownership
data:
  database: postgresql
  schema: orders

  key_entities:
    - name: Order
      description: "Core order entity"
      retention: "7 years for compliance"
      pii_fields: ["shipping_address", "billing_address"]

    - name: OrderItem
      description: "Line items in an order"
      parent: Order

  # Data that this service is the source of truth for
  owns:
    - orders
    - order_items
    - order_status_history

  # Data that is cached/copied from other services
  caches:
    - entity: user_info
      source: user-service
      ttl: 24h
      refresh_on: user.updated

# Operational characteristics
operations:
  scaling:
    min_instances: 2
    max_instances: 50
    scaling_metric: cpu_utilization
    target_value: 70

  health_check:
    endpoint: /health
    interval: 10s
    timeout: 5s

  sla:
    availability: 99.9%
    p99_latency: 200ms

  alerts:
    - name: high_error_rate
      condition: "error_rate > 1%"
      severity: critical
      runbook: ./runbooks/high-error-rate.md

    - name: high_latency
      condition: "p99_latency > 500ms"
      severity: warning
      runbook: ./runbooks/high-latency.md

# Environment variables and configuration
configuration:
  required:
    - name: DATABASE_URL
      description: "PostgreSQL connection string"
      secret: true

    - name: KAFKA_BROKERS
      description: "Kafka broker addresses"
      example: "kafka-1:9092,kafka-2:9092"

  optional:
    - name: LOG_LEVEL
      description: "Logging verbosity"
      default: "info"
      values: ["debug", "info", "warn", "error"]

# Runbooks for common operations
runbooks:
  - name: deployment
    file: ./runbooks/deployment.md

  - name: rollback
    file: ./runbooks/rollback.md

  - name: database_migration
    file: ./runbooks/database-migration.md

  - name: incident_response
    file: ./runbooks/incident-response.md
```

---

## Standard 2: Consistent Naming Conventions

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    NAMING CONVENTION STANDARDS                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  SERVICE NAMES:                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Pattern: {domain}-service                                           │    │
│  │                                                                      │    │
│  │  ✅ Good:                          ❌ Bad:                           │    │
│  │  • order-service                   • orders                          │    │
│  │  • user-service                    • user-svc                        │    │
│  │  • payment-service                 • PaymentAPI                      │    │
│  │  • inventory-service               • inv_service                     │    │
│  │                                                                      │    │
│  │  Rules:                                                              │    │
│  │  • Lowercase with hyphens                                            │    │
│  │  • Singular noun + "-service"                                        │    │
│  │  • Match business domain terminology                                 │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  API ENDPOINTS:                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Pattern: /api/{version}/{resource}                                  │    │
│  │                                                                      │    │
│  │  ✅ Good:                          ❌ Bad:                           │    │
│  │  • GET /api/v1/orders              • GET /api/getOrders              │    │
│  │  • POST /api/v1/orders             • POST /api/createOrder           │    │
│  │  • GET /api/v1/orders/{id}         • GET /api/v1/order/{id}          │    │
│  │  • DELETE /api/v1/orders/{id}      • POST /api/v1/orders/{id}/delete │    │
│  │                                                                      │    │
│  │  Rules:                                                              │    │
│  │  • Plural nouns for collections                                      │    │
│  │  • Use HTTP verbs, not action words in URL                           │    │
│  │  • Consistent versioning (v1, v2)                                    │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  EVENT NAMES:                                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Pattern: {domain}.{entity}.{action}                                 │    │
│  │                                                                      │    │
│  │  ✅ Good:                          ❌ Bad:                           │    │
│  │  • order.created                   • ORDER_CREATED                   │    │
│  │  • order.payment.completed         • orderPaymentCompleted           │    │
│  │  • user.address.updated            • UserAddressUpdate               │    │
│  │  • inventory.stock.depleted        • stockOut                        │    │
│  │                                                                      │    │
│  │  Rules:                                                              │    │
│  │  • Lowercase with dots as separators                                 │    │
│  │  • Past tense for events (created, updated, deleted)                 │    │
│  │  • Include domain prefix                                             │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  DATABASE TABLES:                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Pattern: {entity} (plural)                                          │    │
│  │                                                                      │    │
│  │  ✅ Good:                          ❌ Bad:                           │    │
│  │  • orders                          • Order                           │    │
│  │  • order_items                     • orderItems                      │    │
│  │  • user_addresses                  • tbl_user_addresses              │    │
│  │                                                                      │    │
│  │  Rules:                                                              │    │
│  │  • Lowercase with underscores                                        │    │
│  │  • Plural nouns                                                      │    │
│  │  • No table prefixes                                                 │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Standard 3: API Documentation with AI Context

### OpenAPI with AI Extensions

```yaml
openapi: 3.0.3
info:
  title: Order Service API
  version: 2.1.0
  description: |
    Manages order lifecycle from creation to delivery.

    ## AI Context
    This service is the source of truth for order data.
    - All order mutations must go through this API
    - Order status is authoritative here
    - Other services should subscribe to events, not poll

    ## Common Patterns
    - Create order → Reserve inventory → Process payment → Ship
    - Cancellation triggers inventory release and refund

  x-ai-context:
    domain: commerce
    subdomain: ordering
    business_capability: order_management
    data_owner: true

paths:
  /orders:
    post:
      summary: Create a new order
      operationId: createOrder
      description: |
        Creates a new order from the user's cart.

        ## AI Context
        - This is an idempotent operation when using idempotency_key
        - Inventory is reserved (not committed) at this stage
        - Order starts in CREATED status
        - Triggers order.created event

        ## Error Handling
        - 400: Validation errors (empty cart, invalid address)
        - 402: Payment required but not provided
        - 409: Duplicate idempotency_key
        - 422: Insufficient inventory

      x-ai-context:
        idempotent: true
        idempotency_key_header: X-Idempotency-Key
        side_effects:
          - type: event
            name: order.created
            always: true
          - type: service_call
            target: inventory-service
            operation: reserveStock
            rollback: releaseStock
        retry_safe: true
        typical_latency_ms: 150

      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateOrderRequest'
            examples:
              standard_order:
                summary: Standard order with shipping
                value:
                  cart_id: "cart_abc123"
                  shipping_address_id: "addr_xyz789"
                  payment_method: "credit_card"

      responses:
        '201':
          description: Order created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Order'

        '422':
          description: Business logic error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Error'
              examples:
                insufficient_inventory:
                  summary: Not enough stock
                  value:
                    code: "INSUFFICIENT_INVENTORY"
                    message: "Item SKU123 only has 2 units available"
                    details:
                      sku: "SKU123"
                      requested: 5
                      available: 2

  /orders/{id}/cancel:
    post:
      summary: Cancel an order
      operationId: cancelOrder
      description: |
        Cancels an order if it's in a cancellable state.

        ## AI Context
        - Only CREATED and PAID orders can be cancelled
        - SHIPPED orders must use return flow instead
        - Automatic refund triggered for paid orders

        ## Compensation Logic
        1. Update order status to CANCELLED
        2. Release reserved inventory
        3. Initiate refund (if paid)
        4. Publish order.cancelled event

      x-ai-context:
        idempotent: true
        preconditions:
          - "order.status IN ('CREATED', 'PAID')"
        compensating_actions:
          - service: inventory-service
            action: releaseStock
          - service: payment-service
            action: refund
            condition: "order.payment_status == 'PAID'"

      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid

        - name: reason
          in: query
          required: true
          schema:
            type: string
            enum:
              - customer_request
              - inventory_unavailable
              - payment_failed
              - fraud_detected

      responses:
        '200':
          description: Order cancelled
        '409':
          description: Order cannot be cancelled
          content:
            application/json:
              examples:
                already_shipped:
                  value:
                    code: "ORDER_NOT_CANCELLABLE"
                    message: "Order has already been shipped. Use return flow."

components:
  schemas:
    Order:
      type: object
      description: |
        Represents a customer order.

        ## AI Context
        - order_number is human-readable, id is for API calls
        - status follows state machine (see x-state-machine)
        - total includes tax and shipping

      x-ai-context:
        entity_type: aggregate_root
        source_of_truth: true
        state_machine:
          states: [CREATED, PAID, PROCESSING, SHIPPED, DELIVERED, CANCELLED, RETURNED]
          transitions:
            CREATED: [PAID, CANCELLED]
            PAID: [PROCESSING, CANCELLED]
            PROCESSING: [SHIPPED]
            SHIPPED: [DELIVERED, RETURNED]
            DELIVERED: [RETURNED]

      properties:
        id:
          type: string
          format: uuid
          description: "Unique identifier (use for API calls)"
          x-ai-context:
            indexed: true
            generated: true

        order_number:
          type: string
          pattern: "^ORD-[0-9]{10}$"
          description: "Human-readable order number (show to customers)"
          x-ai-context:
            indexed: true
            generated: true
            human_readable: true

        status:
          type: string
          enum: [CREATED, PAID, PROCESSING, SHIPPED, DELIVERED, CANCELLED, RETURNED]
          x-ai-context:
            state_machine: true
            see: "#/components/schemas/Order/x-ai-context/state_machine"
```

---

## Standard 4: Code Documentation for AI

### In-Code Documentation Standards

```go
// Package orders provides the core order management functionality.
//
// AI CONTEXT:
// This package is the primary entry point for order operations.
// - OrderService: Main business logic
// - OrderRepository: Database operations
// - OrderEvents: Event publishing
//
// DEPENDENCIES:
// - inventory-service: Stock reservation
// - payment-service: Payment processing
// - notification-service: Order updates (async)
//
// STATE MACHINE:
// CREATED → PAID → PROCESSING → SHIPPED → DELIVERED
//          ↓                              ↓
//       CANCELLED                      RETURNED
package orders

// OrderService handles all order-related business operations.
//
// AI CONTEXT:
// - This is the main entry point for order operations
// - All methods are safe to retry (idempotent where noted)
// - Events are published after successful database commits
//
// USAGE PATTERNS:
//   svc := NewOrderService(repo, inventoryClient, paymentClient)
//   order, err := svc.CreateOrder(ctx, req)
//
// ERROR HANDLING:
// - ValidationError: Client provided invalid input
// - InsufficientInventoryError: Not enough stock
// - PaymentError: Payment processing failed
// - ConflictError: Order state doesn't allow operation
type OrderService struct {
    repo            OrderRepository
    inventoryClient InventoryClient
    paymentClient   PaymentClient
    eventPublisher  EventPublisher
}

// CreateOrder creates a new order from a cart.
//
// AI CONTEXT:
// This method orchestrates order creation:
// 1. Validates the request
// 2. Reserves inventory (rollback on failure)
// 3. Calculates totals (subtotal + tax + shipping)
// 4. Persists order to database
// 5. Publishes order.created event
//
// IDEMPOTENCY:
// When idempotencyKey is provided, duplicate requests return
// the existing order instead of creating a new one.
//
// FAILURE MODES:
// - Inventory reservation fails → Return error, no order created
// - Database write fails → Release inventory, return error
// - Event publish fails → Order created, event retried async
//
// SIDE EFFECTS:
// - Inventory reserved in inventory-service
// - order.created event published to Kafka
//
// COMPENSATION:
// If this method fails after inventory reservation, it automatically
// releases the reserved inventory.
//
// Parameters:
//   - ctx: Context with timeout (recommended: 30s)
//   - req: Order creation request with cart_id and shipping details
//
// Returns:
//   - *Order: Created order with status CREATED
//   - error: Typed error (ValidationError, InsufficientInventoryError, etc.)
//
// Example:
//   order, err := svc.CreateOrder(ctx, CreateOrderRequest{
//       CartID:            "cart_123",
//       ShippingAddressID: "addr_456",
//       IdempotencyKey:    "idem_789",
//   })
func (s *OrderService) CreateOrder(ctx context.Context, req CreateOrderRequest) (*Order, error) {
    // Implementation...
}

// CancelOrder cancels an existing order.
//
// AI CONTEXT:
// Preconditions:
// - Order must exist
// - Order status must be CREATED or PAID
//
// State Transition:
// - CREATED → CANCELLED (no refund needed)
// - PAID → CANCELLED (triggers automatic refund)
//
// IDEMPOTENT: Yes - calling multiple times has same effect
//
// SIDE EFFECTS:
// - Inventory released in inventory-service
// - Refund initiated in payment-service (if paid)
// - order.cancelled event published
//
// COMMON ERRORS:
// - NotFoundError: Order doesn't exist
// - ConflictError: Order already shipped (use ReturnOrder instead)
func (s *OrderService) CancelOrder(ctx context.Context, orderID string, reason CancelReason) error {
    // Implementation...
}
```

---

## Standard 5: Structured Logging

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STRUCTURED LOGGING FOR AI                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  LOG FORMAT (JSON):                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  {                                                                   │    │
│  │    "timestamp": "2024-01-15T10:30:00.123Z",                          │    │
│  │    "level": "info",                                                  │    │
│  │    "service": "order-service",                                       │    │
│  │    "version": "2.1.0",                                               │    │
│  │    "environment": "production",                                      │    │
│  │                                                                      │    │
│  │    // Tracing context                                                │    │
│  │    "trace_id": "abc123",                                             │    │
│  │    "span_id": "def456",                                              │    │
│  │    "parent_span_id": "ghi789",                                       │    │
│  │                                                                      │    │
│  │    // Business context                                               │    │
│  │    "operation": "create_order",                                      │    │
│  │    "entity_type": "order",                                           │    │
│  │    "entity_id": "order_123",                                         │    │
│  │    "user_id": "user_456",                                            │    │
│  │                                                                      │    │
│  │    // Message                                                        │    │
│  │    "message": "Order created successfully",                          │    │
│  │    "details": {                                                      │    │
│  │      "order_number": "ORD-1234567890",                               │    │
│  │      "total": 150.00,                                                │    │
│  │      "items_count": 3                                                │    │
│  │    },                                                                │    │
│  │                                                                      │    │
│  │    // Duration for operations                                        │    │
│  │    "duration_ms": 145,                                               │    │
│  │                                                                      │    │
│  │    // For errors                                                     │    │
│  │    "error_code": null,                                               │    │
│  │    "error_message": null,                                            │    │
│  │    "stack_trace": null                                               │    │
│  │  }                                                                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  REQUIRED FIELDS:                                                            │
│  • timestamp, level, service, trace_id                                      │
│  • operation (what action is being performed)                               │
│  • entity_type, entity_id (what resource is affected)                       │
│                                                                              │
│  ERROR LOGS MUST INCLUDE:                                                    │
│  • error_code (machine-readable)                                            │
│  • error_message (human-readable)                                           │
│  • stack_trace (for debugging)                                              │
│  • context (what was being attempted)                                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Standard 6: Architecture Decision Records (ADRs)

```markdown
# ADR-001: Use Saga Pattern for Order Creation

## Status
Accepted

## Context
Order creation involves multiple services:
- Inventory Service: Reserve stock
- Payment Service: Process payment
- Notification Service: Send confirmation

We need to maintain consistency across these services without
distributed transactions.

## AI Context
- This pattern is used in: CreateOrder, CancelOrder, ReturnOrder
- Services involved: inventory-service, payment-service, notification-service
- Compensation handlers are in: pkg/saga/compensations.go

## Decision
We will use the Saga pattern with choreography:
1. Order Service creates order in PENDING state
2. Publishes order.created event
3. Inventory Service reserves stock, publishes inventory.reserved
4. Payment Service processes payment, publishes payment.completed
5. Order Service updates status to CONFIRMED

Compensation flow:
- If payment fails → Release inventory
- If order cancelled → Release inventory + Refund if paid

## Consequences

### Positive
- No distributed transactions needed
- Services remain loosely coupled
- Clear compensation logic

### Negative
- Eventual consistency (order may be in inconsistent state briefly)
- Need to handle partial failures
- More complex debugging

### Mitigation
- Implement saga state tracking
- Add correlation IDs to all events
- Dashboard for monitoring saga progress

## References
- [Saga Pattern](https://microservices.io/patterns/data/saga.html)
- Related ADRs: ADR-002 (Event Sourcing)
```

---

## Standard 7: Service Catalog

```yaml
# service-catalog.yaml
apiVersion: catalog/v1
kind: ServiceCatalog

metadata:
  organization: acme-corp
  last_updated: 2024-01-15

domains:
  - name: commerce
    description: "E-commerce and ordering capabilities"
    owner: commerce-team@acme.com
    services:
      - name: order-service
        manifest: ./services/order-service/service.yaml
        status: production
        criticality: tier1

      - name: cart-service
        manifest: ./services/cart-service/service.yaml
        status: production
        criticality: tier1

      - name: inventory-service
        manifest: ./services/inventory-service/service.yaml
        status: production
        criticality: tier1

  - name: users
    description: "User management and authentication"
    owner: identity-team@acme.com
    services:
      - name: user-service
        manifest: ./services/user-service/service.yaml
        status: production
        criticality: tier1

      - name: auth-service
        manifest: ./services/auth-service/service.yaml
        status: production
        criticality: tier1

# Service relationships for AI understanding
relationships:
  - type: depends_on
    from: order-service
    to: user-service
    description: "Fetches user data for order creation"

  - type: depends_on
    from: order-service
    to: inventory-service
    description: "Reserves inventory for orders"

  - type: publishes_to
    from: order-service
    to: notification-service
    via: order.created event
    description: "Triggers order confirmation email"

# Common patterns for AI to understand
patterns:
  - name: order_creation_saga
    description: "Multi-step order creation"
    services: [order-service, inventory-service, payment-service]
    documentation: ./patterns/order-creation-saga.md

  - name: user_address_sync
    description: "Address updates propagated to orders"
    services: [user-service, order-service]
    trigger: user.address.updated
    documentation: ./patterns/address-sync.md
```

---

## Implementation Checklist

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                  AI-FRIENDLY MICROSERVICES CHECKLIST                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ☐ SERVICE MANIFEST                                                          │
│    ☐ service.yaml in every service repo                                     │
│    ☐ Dependencies documented with purpose                                   │
│    ☐ Events published/subscribed documented                                 │
│    ☐ Configuration documented                                               │
│                                                                              │
│  ☐ API DOCUMENTATION                                                         │
│    ☐ OpenAPI spec with x-ai-context extensions                              │
│    ☐ Examples for all endpoints                                             │
│    ☐ Error responses documented                                             │
│    ☐ Idempotency documented                                                 │
│                                                                              │
│  ☐ CODE DOCUMENTATION                                                        │
│    ☐ Package-level AI context comments                                      │
│    ☐ Function-level documentation with side effects                         │
│    ☐ Error types and handling documented                                    │
│    ☐ State machines documented                                              │
│                                                                              │
│  ☐ NAMING CONVENTIONS                                                        │
│    ☐ Consistent service naming                                              │
│    ☐ Consistent API endpoint patterns                                       │
│    ☐ Consistent event naming                                                │
│    ☐ Consistent database naming                                             │
│                                                                              │
│  ☐ OBSERVABILITY                                                             │
│    ☐ Structured JSON logging                                                │
│    ☐ Correlation IDs in all logs                                            │
│    ☐ Distributed tracing enabled                                            │
│    ☐ Runbooks for common issues                                             │
│                                                                              │
│  ☐ SERVICE CATALOG                                                           │
│    ☐ All services registered                                                │
│    ☐ Dependencies mapped                                                    │
│    ☐ Team ownership documented                                              │
│    ☐ Kept up to date                                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Key Takeaways

1. **Machine-readable manifests** - Every service needs a service.yaml
2. **Consistent naming** - Makes AI pattern recognition easier
3. **Rich API docs** - Include AI context, side effects, error handling
4. **Code comments matter** - Document state machines, compensation logic
5. **Structured logging** - JSON with consistent fields
6. **Service catalog** - Central registry of all services and relationships
7. **Keep docs updated** - Outdated docs are worse than no docs for AI
