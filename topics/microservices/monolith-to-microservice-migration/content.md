# Monolith to Microservices Migration: Complete Guide

## Overview

This guide covers the complete journey of migrating from a monolithic application to microservices architecture. We'll use a real-world example of an application with User, Order, and Logistics modules, showing the before and after database models, migration strategies, and common pitfalls.

**Tags:** Migration, Database Design, Refactoring, Architecture

---

## The Starting Point: Monolithic Architecture

### Original Monolith Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                    MONOLITHIC APPLICATION                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                     SINGLE CODEBASE                        │  │
│  │                                                            │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │  │
│  │  │    User      │  │    Order     │  │   Logistics  │     │  │
│  │  │   Module     │  │   Module     │  │    Module    │     │  │
│  │  │              │  │              │  │              │     │  │
│  │  │ • Register   │  │ • Create     │  │ • Assign     │     │  │
│  │  │ • Login      │  │ • Cancel     │  │ • Track      │     │  │
│  │  │ • Profile    │  │ • History    │  │ • Deliver    │     │  │
│  │  │ • Address    │  │ • Return     │  │ • Return     │     │  │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │  │
│  │         │                 │                 │              │  │
│  │         │    DIRECT METHOD CALLS            │              │  │
│  │         │                 │                 │              │  │
│  │  ┌──────▼─────────────────▼─────────────────▼───────────┐ │  │
│  │  │              SHARED DATA ACCESS LAYER                 │ │  │
│  │  │                    (ORM/Repository)                   │ │  │
│  │  └──────────────────────────┬────────────────────────────┘ │  │
│  │                             │                               │  │
│  └─────────────────────────────┼───────────────────────────────┘  │
│                                │                                   │
│  ┌─────────────────────────────▼───────────────────────────────┐  │
│  │                     SINGLE DATABASE                          │  │
│  │                      (PostgreSQL)                            │  │
│  │                                                              │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │  │
│  │  │  users   │ │  orders  │ │shipments │ │ addresses│       │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │  │
│  │                                                              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Original Database Schema (Monolith)

```sql
-- MONOLITHIC DATABASE SCHEMA
-- All tables in a single database with foreign key relationships

-- ==================== USER DOMAIN ====================
CREATE TABLE users (
    id              SERIAL PRIMARY KEY,
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    first_name      VARCHAR(100),
    last_name       VARCHAR(100),
    phone           VARCHAR(20),
    is_verified     BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
    address_line1   VARCHAR(255) NOT NULL,
    address_line2   VARCHAR(255),
    city            VARCHAR(100) NOT NULL,
    state           VARCHAR(100) NOT NULL,
    country         VARCHAR(100) NOT NULL,
    pincode         VARCHAR(20) NOT NULL,
    is_default      BOOLEAN DEFAULT FALSE,
    type            VARCHAR(20) DEFAULT 'home',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== ORDER DOMAIN ====================
CREATE TABLE orders (
    id              SERIAL PRIMARY KEY,
    user_id         INTEGER REFERENCES users(id),  -- Direct FK to users
    order_number    VARCHAR(50) UNIQUE NOT NULL,
    status          VARCHAR(50) NOT NULL,
    shipping_address_id INTEGER REFERENCES addresses(id),  -- Direct FK
    billing_address_id  INTEGER REFERENCES addresses(id),  -- Direct FK
    subtotal        DECIMAL(10,2) NOT NULL,
    tax             DECIMAL(10,2) DEFAULT 0,
    shipping_cost   DECIMAL(10,2) DEFAULT 0,
    discount        DECIMAL(10,2) DEFAULT 0,
    total           DECIMAL(10,2) NOT NULL,
    payment_method  VARCHAR(50),
    payment_status  VARCHAR(50),
    notes           TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id              SERIAL PRIMARY KEY,
    order_id        INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id      INTEGER NOT NULL,
    product_name    VARCHAR(255) NOT NULL,
    sku             VARCHAR(100) NOT NULL,
    quantity        INTEGER NOT NULL,
    unit_price      DECIMAL(10,2) NOT NULL,
    total_price     DECIMAL(10,2) NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== LOGISTICS DOMAIN ====================
CREATE TABLE shipments (
    id              SERIAL PRIMARY KEY,
    order_id        INTEGER REFERENCES orders(id),  -- Direct FK to orders
    tracking_number VARCHAR(100) UNIQUE,
    carrier         VARCHAR(100) NOT NULL,
    status          VARCHAR(50) NOT NULL,

    -- Denormalized from addresses (for historical accuracy)
    shipping_address_line1  VARCHAR(255),
    shipping_city           VARCHAR(100),
    shipping_state          VARCHAR(100),
    shipping_pincode        VARCHAR(20),

    estimated_delivery  DATE,
    actual_delivery     DATE,
    weight              DECIMAL(10,2),
    dimensions          VARCHAR(50),
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE delivery_attempts (
    id              SERIAL PRIMARY KEY,
    shipment_id     INTEGER REFERENCES shipments(id) ON DELETE CASCADE,
    attempt_number  INTEGER NOT NULL,
    status          VARCHAR(50) NOT NULL,
    delivery_agent  VARCHAR(100),
    notes           TEXT,
    attempted_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE delivery_agents (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    phone           VARCHAR(20) NOT NULL,
    email           VARCHAR(255),
    zone            VARCHAR(100),
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== CROSS-DOMAIN VIEWS ====================
-- Views that join data across domains (common in monoliths)

CREATE VIEW order_summary AS
SELECT
    o.id,
    o.order_number,
    o.status AS order_status,
    o.total,
    u.email AS customer_email,
    u.first_name || ' ' || u.last_name AS customer_name,
    s.tracking_number,
    s.status AS shipping_status,
    s.carrier
FROM orders o
JOIN users u ON o.user_id = u.id
LEFT JOIN shipments s ON s.order_id = o.id;
```

### Problems with this Monolithic Schema

```
┌─────────────────────────────────────────────────────────────────┐
│                 PROBLEMS WITH MONOLITHIC DB                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. TIGHT COUPLING                                              │
│     ├─ Orders table has FK to users table                       │
│     ├─ Shipments table has FK to orders table                   │
│     ├─ Cannot change user schema without affecting orders       │
│     └─ All changes require coordinated releases                 │
│                                                                  │
│  2. SINGLE POINT OF FAILURE                                     │
│     ├─ Database outage affects entire application               │
│     ├─ Cannot scale components independently                    │
│     └─ One slow query affects all modules                       │
│                                                                  │
│  3. CONFLICTING REQUIREMENTS                                    │
│     ├─ Users need fast reads (profile lookups)                  │
│     ├─ Orders need ACID transactions                            │
│     ├─ Logistics needs real-time tracking updates               │
│     └─ Cannot optimize for all patterns simultaneously          │
│                                                                  │
│  4. DEPLOYMENT BOTTLENECK                                       │
│     ├─ Database migrations require downtime                     │
│     ├─ One team's changes block others                          │
│     └─ Cannot release features independently                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Target State: Microservices Architecture

### Microservices Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     MICROSERVICES ARCHITECTURE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐       │
│  │   USER SERVICE    │  │   ORDER SERVICE   │  │ LOGISTICS SERVICE │       │
│  │                   │  │                   │  │                   │       │
│  │  ┌─────────────┐  │  │  ┌─────────────┐  │  │  ┌─────────────┐  │       │
│  │  │   API       │  │  │  │   API       │  │  │  │   API       │  │       │
│  │  │  Handlers   │  │  │  │  Handlers   │  │  │  │  Handlers   │  │       │
│  │  └──────┬──────┘  │  │  └──────┬──────┘  │  │  └──────┬──────┘  │       │
│  │         │         │  │         │         │  │         │         │       │
│  │  ┌──────▼──────┐  │  │  ┌──────▼──────┐  │  │  ┌──────▼──────┐  │       │
│  │  │  Business   │  │  │  │  Business   │  │  │  │  Business   │  │       │
│  │  │   Logic     │  │  │  │   Logic     │  │  │  │   Logic     │  │       │
│  │  └──────┬──────┘  │  │  └──────┬──────┘  │  │  └──────┬──────┘  │       │
│  │         │         │  │         │         │  │         │         │       │
│  │  ┌──────▼──────┐  │  │  ┌──────▼──────┐  │  │  ┌──────▼──────┐  │       │
│  │  │ Event       │  │  │  │ Event       │  │  │  │ Event       │  │       │
│  │  │ Publisher   │  │  │  │ Publisher   │  │  │  │ Publisher   │  │       │
│  │  └──────┬──────┘  │  │  └──────┬──────┘  │  │  └──────┬──────┘  │       │
│  │         │         │  │         │         │  │         │         │       │
│  └─────────┼─────────┘  └─────────┼─────────┘  └─────────┼─────────┘       │
│            │                      │                      │                  │
│  ┌─────────▼─────────┐  ┌─────────▼─────────┐  ┌─────────▼─────────┐       │
│  │    PostgreSQL     │  │    PostgreSQL     │  │    PostgreSQL     │       │
│  │   (User Data)     │  │   (Order Data)    │  │  (Shipping Data)  │       │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘       │
│                                                                              │
│                         ┌─────────────────────┐                             │
│                         │       KAFKA         │                             │
│                         │   (Event Bus)       │                             │
│                         │                     │                             │
│                         │ Topics:             │                             │
│                         │ • user.events       │                             │
│                         │ • order.events      │                             │
│                         │ • shipment.events   │                             │
│                         └─────────────────────┘                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Database Schemas After Migration

### User Service Database

```sql
-- USER SERVICE DATABASE (Isolated)
-- No foreign keys to other services

CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    first_name      VARCHAR(100),
    last_name       VARCHAR(100),
    phone           VARCHAR(20),
    is_verified     BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Soft delete support
    deleted_at      TIMESTAMP NULL
);

CREATE TABLE addresses (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    address_line1   VARCHAR(255) NOT NULL,
    address_line2   VARCHAR(255),
    city            VARCHAR(100) NOT NULL,
    state           VARCHAR(100) NOT NULL,
    country         VARCHAR(100) NOT NULL,
    pincode         VARCHAR(20) NOT NULL,
    is_default      BOOLEAN DEFAULT FALSE,
    type            VARCHAR(20) DEFAULT 'home',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Versioning for eventual consistency
    version         INTEGER DEFAULT 1
);

-- Outbox table for reliable event publishing
CREATE TABLE user_outbox (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aggregate_type  VARCHAR(100) NOT NULL,  -- 'user', 'address'
    aggregate_id    UUID NOT NULL,
    event_type      VARCHAR(100) NOT NULL,  -- 'UserCreated', 'AddressUpdated'
    payload         JSONB NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at    TIMESTAMP NULL
);

-- Index for outbox processing
CREATE INDEX idx_user_outbox_unpublished
ON user_outbox(created_at)
WHERE published_at IS NULL;
```

### Order Service Database

```sql
-- ORDER SERVICE DATABASE (Isolated)
-- Stores only user_id reference (not FK), copies address data

CREATE TABLE orders (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number    VARCHAR(50) UNIQUE NOT NULL,

    -- Reference to user (NOT a foreign key - just an ID)
    user_id         UUID NOT NULL,

    -- Denormalized user data (snapshot at order time)
    customer_email  VARCHAR(255) NOT NULL,
    customer_name   VARCHAR(200),
    customer_phone  VARCHAR(20),

    status          VARCHAR(50) NOT NULL DEFAULT 'CREATED',

    -- Denormalized address (snapshot at order time)
    shipping_address JSONB NOT NULL,
    /* Example:
    {
        "address_id": "uuid",
        "line1": "123 Main St",
        "line2": "Apt 4",
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": "400001"
    }
    */
    billing_address JSONB,

    subtotal        DECIMAL(10,2) NOT NULL,
    tax             DECIMAL(10,2) DEFAULT 0,
    shipping_cost   DECIMAL(10,2) DEFAULT 0,
    discount        DECIMAL(10,2) DEFAULT 0,
    total           DECIMAL(10,2) NOT NULL,

    payment_method  VARCHAR(50),
    payment_status  VARCHAR(50) DEFAULT 'PENDING',
    payment_id      UUID,  -- Reference to Payment Service

    notes           TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Optimistic locking
    version         INTEGER DEFAULT 1
);

CREATE TABLE order_items (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id        UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

    -- Product snapshot (denormalized from Product Service)
    product_id      UUID NOT NULL,
    product_name    VARCHAR(255) NOT NULL,
    sku             VARCHAR(100) NOT NULL,
    product_image   VARCHAR(500),

    quantity        INTEGER NOT NULL,
    unit_price      DECIMAL(10,2) NOT NULL,
    total_price     DECIMAL(10,2) NOT NULL,

    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order state transitions
CREATE TABLE order_status_history (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id        UUID NOT NULL REFERENCES orders(id),
    from_status     VARCHAR(50),
    to_status       VARCHAR(50) NOT NULL,
    changed_by      VARCHAR(100),  -- 'system', 'user:uuid', 'admin:uuid'
    reason          TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Outbox for reliable event publishing
CREATE TABLE order_outbox (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aggregate_type  VARCHAR(100) NOT NULL,
    aggregate_id    UUID NOT NULL,
    event_type      VARCHAR(100) NOT NULL,
    payload         JSONB NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at    TIMESTAMP NULL
);

-- Indexes
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_order_outbox_unpublished
ON order_outbox(created_at)
WHERE published_at IS NULL;
```

### Logistics Service Database

```sql
-- LOGISTICS SERVICE DATABASE (Isolated)
-- Stores order_id reference (not FK), copies relevant order data

CREATE TABLE shipments (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Reference to order (NOT a foreign key)
    order_id        UUID NOT NULL UNIQUE,
    order_number    VARCHAR(50) NOT NULL,  -- Denormalized for display

    tracking_number VARCHAR(100) UNIQUE,
    carrier_id      UUID REFERENCES carriers(id),
    carrier_name    VARCHAR(100),  -- Denormalized

    status          VARCHAR(50) NOT NULL DEFAULT 'PENDING',

    -- Denormalized shipping address (copied from order)
    recipient_name  VARCHAR(200) NOT NULL,
    recipient_phone VARCHAR(20) NOT NULL,
    address_line1   VARCHAR(255) NOT NULL,
    address_line2   VARCHAR(255),
    city            VARCHAR(100) NOT NULL,
    state           VARCHAR(100) NOT NULL,
    pincode         VARCHAR(20) NOT NULL,

    -- Shipment details
    weight_kg       DECIMAL(10,2),
    dimensions_cm   VARCHAR(50),  -- "30x20x10"
    package_count   INTEGER DEFAULT 1,

    estimated_delivery  DATE,
    actual_delivery     TIMESTAMP,

    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    version         INTEGER DEFAULT 1
);

CREATE TABLE carriers (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100) NOT NULL,
    code            VARCHAR(20) UNIQUE NOT NULL,
    api_endpoint    VARCHAR(500),
    is_active       BOOLEAN DEFAULT TRUE,

    -- Carrier capabilities
    supports_cod    BOOLEAN DEFAULT FALSE,
    supports_express BOOLEAN DEFAULT FALSE,
    serviceable_pincodes JSONB,  -- ["400001", "400002", ...]

    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE delivery_agents (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    carrier_id      UUID REFERENCES carriers(id),
    name            VARCHAR(100) NOT NULL,
    phone           VARCHAR(20) NOT NULL,
    email           VARCHAR(255),

    -- Assignment zone
    zone_id         UUID,
    zone_name       VARCHAR(100),

    -- Availability
    is_active       BOOLEAN DEFAULT TRUE,
    current_capacity INTEGER DEFAULT 20,
    current_load    INTEGER DEFAULT 0,

    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shipment_events (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shipment_id     UUID NOT NULL REFERENCES shipments(id),

    event_type      VARCHAR(50) NOT NULL,
    -- PICKED_UP, IN_TRANSIT, OUT_FOR_DELIVERY, DELIVERED,
    -- DELIVERY_FAILED, RETURNED

    location        VARCHAR(200),
    description     TEXT,

    -- Agent info if applicable
    agent_id        UUID REFERENCES delivery_agents(id),
    agent_name      VARCHAR(100),

    -- Customer interaction
    recipient_signature VARCHAR(500),  -- Base64 or URL
    delivery_photo  VARCHAR(500),      -- URL

    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE delivery_attempts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shipment_id     UUID NOT NULL REFERENCES shipments(id),
    agent_id        UUID REFERENCES delivery_agents(id),

    attempt_number  INTEGER NOT NULL,
    status          VARCHAR(50) NOT NULL,  -- SUCCESS, FAILED, RESCHEDULED
    failure_reason  VARCHAR(200),

    scheduled_date  DATE,
    attempted_at    TIMESTAMP,

    notes           TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Outbox for events
CREATE TABLE logistics_outbox (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aggregate_type  VARCHAR(100) NOT NULL,
    aggregate_id    UUID NOT NULL,
    event_type      VARCHAR(100) NOT NULL,
    payload         JSONB NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at    TIMESTAMP NULL
);

-- Indexes
CREATE INDEX idx_shipments_order_id ON shipments(order_id);
CREATE INDEX idx_shipments_tracking ON shipments(tracking_number);
CREATE INDEX idx_shipments_status ON shipments(status);
CREATE INDEX idx_shipment_events_shipment_id ON shipment_events(shipment_id);
CREATE INDEX idx_logistics_outbox_unpublished
ON logistics_outbox(created_at)
WHERE published_at IS NULL;
```

---

## Data Comparison: Before vs After

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SCHEMA COMPARISON: BEFORE vs AFTER                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  BEFORE (Monolith)                    AFTER (Microservices)                  │
│  ──────────────────                   ─────────────────────                  │
│                                                                              │
│  orders.user_id → FK to users         orders.user_id = UUID (no FK)         │
│                                       orders.customer_email = copied        │
│                                       orders.customer_name = copied         │
│                                                                              │
│  orders.shipping_address_id → FK      orders.shipping_address = JSONB       │
│                                       (complete address snapshot)            │
│                                                                              │
│  shipments.order_id → FK to orders    shipments.order_id = UUID (no FK)     │
│                                       shipments.order_number = copied       │
│                                       shipments.recipient_* = copied        │
│                                                                              │
│  Cross-service JOINs in queries       Events + Denormalized data            │
│                                                                              │
│  Cascading deletes                    Soft deletes + Eventual cleanup       │
│                                                                              │
│  Single transaction for order         Saga pattern with compensations       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Event-Driven Communication

### Events Published by Each Service

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         SERVICE EVENTS                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  USER SERVICE EVENTS:                                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Topic: user.events                                                  │    │
│  │                                                                      │    │
│  │  UserCreated:                                                        │    │
│  │  {                                                                   │    │
│  │    "event_id": "uuid",                                               │    │
│  │    "event_type": "UserCreated",                                      │    │
│  │    "timestamp": "2024-01-15T10:30:00Z",                              │    │
│  │    "data": {                                                         │    │
│  │      "user_id": "uuid",                                              │    │
│  │      "email": "user@example.com",                                    │    │
│  │      "name": "John Doe"                                              │    │
│  │    }                                                                 │    │
│  │  }                                                                   │    │
│  │                                                                      │    │
│  │  AddressAdded, AddressUpdated, UserDeleted                           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ORDER SERVICE EVENTS:                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Topic: order.events                                                 │    │
│  │                                                                      │    │
│  │  OrderCreated:                                                       │    │
│  │  {                                                                   │    │
│  │    "event_id": "uuid",                                               │    │
│  │    "event_type": "OrderCreated",                                     │    │
│  │    "timestamp": "2024-01-15T10:30:00Z",                              │    │
│  │    "data": {                                                         │    │
│  │      "order_id": "uuid",                                             │    │
│  │      "order_number": "ORD-123456",                                   │    │
│  │      "user_id": "uuid",                                              │    │
│  │      "total": 1500.00,                                               │    │
│  │      "shipping_address": { ... }                                     │    │
│  │    }                                                                 │    │
│  │  }                                                                   │    │
│  │                                                                      │    │
│  │  OrderConfirmed, OrderCancelled, OrderCompleted                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  LOGISTICS SERVICE EVENTS:                                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Topic: shipment.events                                              │    │
│  │                                                                      │    │
│  │  ShipmentCreated, ShipmentDispatched, ShipmentDelivered              │    │
│  │  DeliveryAttemptFailed, ShipmentReturned                             │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Migration Strategy: Strangler Fig Pattern

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STRANGLER FIG MIGRATION PHASES                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PHASE 1: IDENTIFY BOUNDARIES                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  • Analyze domain boundaries (User, Order, Logistics)                │    │
│  │  • Identify shared data and cross-cutting concerns                   │    │
│  │  • Map current database dependencies                                 │    │
│  │  • Define service contracts (APIs, Events)                           │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  PHASE 2: EXTRACT USER SERVICE (Least Dependencies)                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                      │    │
│  │  ┌──────────────────────────────────────────────────────────────┐   │    │
│  │  │                      MONOLITH                                 │   │    │
│  │  │  ┌────────┐  ┌────────┐  ┌────────┐                          │   │    │
│  │  │  │ User   │  │ Order  │  │Logistics│                          │   │    │
│  │  │  └───┬────┘  └───┬────┘  └───┬────┘                          │   │    │
│  │  │      │           │           │                                │   │    │
│  │  │      │     ┌─────▼───────────▼────┐                          │   │    │
│  │  │      │     │   Shared Database    │                          │   │    │
│  │  │      │     └──────────────────────┘                          │   │    │
│  │  └──────│────────────────────────────────────────────────────────┘   │    │
│  │         │                                                            │    │
│  │         │  Extract                                                   │    │
│  │         ▼                                                            │    │
│  │  ┌──────────────┐                                                   │    │
│  │  │ User Service │ ◀── API calls from monolith                       │    │
│  │  │  (New DB)    │                                                   │    │
│  │  └──────────────┘                                                   │    │
│  │                                                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  PHASE 3: DATA SYNCHRONIZATION                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  • Dual-write to both old and new databases                          │    │
│  │  • Sync existing user data to new User Service DB                    │    │
│  │  • Validate data consistency                                         │    │
│  │  • Switch reads to new service                                       │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  PHASE 4: EXTRACT ORDER SERVICE                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  • Copy user data (email, name) into orders (denormalization)        │    │
│  │  • Replace FK relationships with event-driven updates                │    │
│  │  • Implement Saga for order creation workflow                        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  PHASE 5: EXTRACT LOGISTICS SERVICE                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  • Subscribe to order.events                                         │    │
│  │  • Copy shipping address and order details                           │    │
│  │  • Remove shipments table from monolith                              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  PHASE 6: DECOMMISSION MONOLITH                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  • Redirect all traffic to microservices                             │    │
│  │  • Archive old database                                              │    │
│  │  • Remove monolith infrastructure                                    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Handling Cross-Service Queries

### Before: Simple JOIN

```sql
-- Monolith: Get order with customer details
SELECT
    o.order_number,
    o.total,
    u.email,
    u.first_name,
    s.tracking_number,
    s.status AS shipping_status
FROM orders o
JOIN users u ON o.user_id = u.id
LEFT JOIN shipments s ON s.order_id = o.id
WHERE o.id = 'order-123';
```

### After: API Composition

```go
// Order Service: Get order with aggregated data
func (s *OrderService) GetOrderDetails(ctx context.Context, orderID string) (*OrderDetails, error) {
    // 1. Get order from local database
    order, err := s.orderRepo.FindByID(ctx, orderID)
    if err != nil {
        return nil, err
    }

    // 2. Order already has denormalized customer data
    // No need to call User Service for basic info

    // 3. Get shipment from Logistics Service (if needed)
    shipment, err := s.logisticsClient.GetShipmentByOrderID(ctx, orderID)
    if err != nil {
        // Graceful degradation - return order without shipment
        log.Warn("Failed to fetch shipment", "error", err)
    }

    return &OrderDetails{
        Order:    order,
        Shipment: shipment,
    }, nil
}
```

---

## Key Migration Decisions

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| **ID Type** | UUID instead of Serial | Globally unique, no coordination needed |
| **Foreign Keys** | Store ID only, no FK constraints | Service independence |
| **Related Data** | Denormalize (copy) at creation time | Avoid sync issues, point-in-time accuracy |
| **Updates** | Events for cross-service sync | Loose coupling, eventual consistency |
| **Transactions** | Saga pattern | No distributed transactions |
| **Queries** | API composition, CQRS | No cross-service JOINs |

---

## Key Takeaways

1. **Break foreign keys** - Store references as plain IDs, not FK constraints
2. **Denormalize data** - Copy essential data at transaction time
3. **Use events** - Communicate changes asynchronously
4. **Accept eventual consistency** - Not everything needs immediate consistency
5. **Migrate incrementally** - Use Strangler Fig pattern, don't big bang
6. **Design for failure** - Handle missing data gracefully
