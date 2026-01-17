# Monolith to Microservices Migration: Complete Guide

## Overview

This guide covers the complete journey of migrating from a monolithic application to microservices architecture. We'll use a real-world example of an application with User, Order, and Logistics modules, showing the before and after database models, migration strategies, and common pitfalls.

**Tags:** Migration, Database Design, Refactoring, Architecture

---

## The Starting Point: Monolithic Architecture

### Original Monolith Structure

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #58a6ff; margin: 0 0 8px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #30363d; padding-bottom: 12px;">MONOLITHIC APPLICATION</h3>

  <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 20px; margin-top: 16px;">
    <h4 style="color: #8b949e; margin: 0 0 16px 0; text-align: center;">SINGLE CODEBASE</h4>

    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px;">
      <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 16px;">
        <div style="color: #fff; font-weight: 600; margin-bottom: 8px; text-align: center;">User Module</div>
        <ul style="color: #d1fae5; margin: 0; padding-left: 20px; font-size: 0.9em;">
          <li>Register</li>
          <li>Login</li>
          <li>Profile</li>
          <li>Address</li>
        </ul>
      </div>
      <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 10px; padding: 16px;">
        <div style="color: #fff; font-weight: 600; margin-bottom: 8px; text-align: center;">Order Module</div>
        <ul style="color: #dbeafe; margin: 0; padding-left: 20px; font-size: 0.9em;">
          <li>Create</li>
          <li>Cancel</li>
          <li>History</li>
          <li>Return</li>
        </ul>
      </div>
      <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 10px; padding: 16px;">
        <div style="color: #fff; font-weight: 600; margin-bottom: 8px; text-align: center;">Logistics Module</div>
        <ul style="color: #ede9fe; margin: 0; padding-left: 20px; font-size: 0.9em;">
          <li>Assign</li>
          <li>Track</li>
          <li>Deliver</li>
          <li>Return</li>
        </ul>
      </div>
    </div>

    <div style="text-align: center; color: #8b949e; margin: 16px 0; font-size: 0.9em;">
      <span style="display: inline-block; border-top: 2px dashed #30363d; width: 80%; padding-top: 8px;">DIRECT METHOD CALLS</span>
    </div>

    <div style="background: linear-gradient(135deg, #21262d 0%, #30363d 100%); border-radius: 10px; padding: 16px; text-align: center; margin-bottom: 16px;">
      <div style="color: #58a6ff; font-weight: 600;">SHARED DATA ACCESS LAYER</div>
      <div style="color: #8b949e; font-size: 0.9em;">(ORM/Repository)</div>
    </div>
  </div>

  <div style="text-align: center; margin: 16px 0;">
    <span style="color: #8b949e; font-size: 1.5em;">↓</span>
  </div>

  <div style="background: linear-gradient(135deg, #f85149 0%, #da3633 100%); border-radius: 12px; padding: 20px;">
    <div style="color: #fff; font-weight: 600; text-align: center; margin-bottom: 12px;">SINGLE DATABASE (PostgreSQL)</div>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
      <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 0.9em;">users</div>
      <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 0.9em;">orders</div>
      <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 0.9em;">shipments</div>
      <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 0.9em;">addresses</div>
    </div>
  </div>
</div>

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

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #f85149; margin: 0 0 20px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #30363d; padding-bottom: 12px;">PROBLEMS WITH MONOLITHIC DB</h3>

  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
    <div style="background: linear-gradient(135deg, #f85149 0%, #da3633 100%); border-radius: 12px; padding: 16px;">
      <h4 style="color: #fff; margin: 0 0 12px 0; font-size: 1.1em;">1. TIGHT COUPLING</h4>
      <ul style="color: #fecaca; margin: 0; padding-left: 20px; font-size: 0.9em;">
        <li>Orders table has FK to users table</li>
        <li>Shipments table has FK to orders table</li>
        <li>Cannot change user schema without affecting orders</li>
        <li>All changes require coordinated releases</li>
      </ul>
    </div>
    <div style="background: linear-gradient(135deg, #f85149 0%, #da3633 100%); border-radius: 12px; padding: 16px;">
      <h4 style="color: #fff; margin: 0 0 12px 0; font-size: 1.1em;">2. SINGLE POINT OF FAILURE</h4>
      <ul style="color: #fecaca; margin: 0; padding-left: 20px; font-size: 0.9em;">
        <li>Database outage affects entire application</li>
        <li>Cannot scale components independently</li>
        <li>One slow query affects all modules</li>
      </ul>
    </div>
    <div style="background: linear-gradient(135deg, #f85149 0%, #da3633 100%); border-radius: 12px; padding: 16px;">
      <h4 style="color: #fff; margin: 0 0 12px 0; font-size: 1.1em;">3. CONFLICTING REQUIREMENTS</h4>
      <ul style="color: #fecaca; margin: 0; padding-left: 20px; font-size: 0.9em;">
        <li>Users need fast reads (profile lookups)</li>
        <li>Orders need ACID transactions</li>
        <li>Logistics needs real-time tracking updates</li>
        <li>Cannot optimize for all patterns simultaneously</li>
      </ul>
    </div>
    <div style="background: linear-gradient(135deg, #f85149 0%, #da3633 100%); border-radius: 12px; padding: 16px;">
      <h4 style="color: #fff; margin: 0 0 12px 0; font-size: 1.1em;">4. DEPLOYMENT BOTTLENECK</h4>
      <ul style="color: #fecaca; margin: 0; padding-left: 20px; font-size: 0.9em;">
        <li>Database migrations require downtime</li>
        <li>One team's changes block others</li>
        <li>Cannot release features independently</li>
      </ul>
    </div>
  </div>
</div>

---

## Target State: Microservices Architecture

### Microservices Structure

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #7ee787; margin: 0 0 20px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #30363d; padding-bottom: 12px;">MICROSERVICES ARCHITECTURE</h3>

  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px;">
    <!-- User Service -->
    <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 16px;">
      <h4 style="color: #fff; margin: 0 0 12px 0; text-align: center;">USER SERVICE</h4>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px; text-align: center; color: #d1fae5; font-size: 0.85em;">API Handlers</div>
        <div style="text-align: center; color: #fff;">↓</div>
        <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px; text-align: center; color: #d1fae5; font-size: 0.85em;">Business Logic</div>
        <div style="text-align: center; color: #fff;">↓</div>
        <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px; text-align: center; color: #d1fae5; font-size: 0.85em;">Event Publisher</div>
      </div>
      <div style="text-align: center; margin-top: 12px;">
        <div style="color: #fff;">↓</div>
        <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px; margin-top: 4px; color: #fff; font-size: 0.85em;">PostgreSQL<br/><span style="color: #d1fae5;">(User Data)</span></div>
      </div>
    </div>

    <!-- Order Service -->
    <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 16px;">
      <h4 style="color: #fff; margin: 0 0 12px 0; text-align: center;">ORDER SERVICE</h4>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px; text-align: center; color: #dbeafe; font-size: 0.85em;">API Handlers</div>
        <div style="text-align: center; color: #fff;">↓</div>
        <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px; text-align: center; color: #dbeafe; font-size: 0.85em;">Business Logic</div>
        <div style="text-align: center; color: #fff;">↓</div>
        <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px; text-align: center; color: #dbeafe; font-size: 0.85em;">Event Publisher</div>
      </div>
      <div style="text-align: center; margin-top: 12px;">
        <div style="color: #fff;">↓</div>
        <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px; margin-top: 4px; color: #fff; font-size: 0.85em;">PostgreSQL<br/><span style="color: #dbeafe;">(Order Data)</span></div>
      </div>
    </div>

    <!-- Logistics Service -->
    <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 16px;">
      <h4 style="color: #fff; margin: 0 0 12px 0; text-align: center;">LOGISTICS SERVICE</h4>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px; text-align: center; color: #ede9fe; font-size: 0.85em;">API Handlers</div>
        <div style="text-align: center; color: #fff;">↓</div>
        <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px; text-align: center; color: #ede9fe; font-size: 0.85em;">Business Logic</div>
        <div style="text-align: center; color: #fff;">↓</div>
        <div style="background: rgba(255,255,255,0.15); border-radius: 6px; padding: 8px; text-align: center; color: #ede9fe; font-size: 0.85em;">Event Publisher</div>
      </div>
      <div style="text-align: center; margin-top: 12px;">
        <div style="color: #fff;">↓</div>
        <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px; margin-top: 4px; color: #fff; font-size: 0.85em;">PostgreSQL<br/><span style="color: #ede9fe;">(Shipping Data)</span></div>
      </div>
    </div>
  </div>

  <!-- Kafka Event Bus -->
  <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 12px; padding: 20px; text-align: center;">
    <h4 style="color: #fff; margin: 0 0 12px 0;">KAFKA (Event Bus)</h4>
    <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
      <span style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 20px; color: #fff; font-size: 0.85em;">user.events</span>
      <span style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 20px; color: #fff; font-size: 0.85em;">order.events</span>
      <span style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 20px; color: #fff; font-size: 0.85em;">shipment.events</span>
    </div>
  </div>
</div>

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

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #30363d; padding-bottom: 12px;">SCHEMA COMPARISON: BEFORE vs AFTER</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
    <!-- Before Column -->
    <div>
      <h4 style="color: #f85149; margin: 0 0 16px 0; text-align: center; padding: 8px; background: rgba(248,81,73,0.1); border-radius: 8px;">BEFORE (Monolith)</h4>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="background: rgba(248,81,73,0.15); border-radius: 8px; padding: 12px; border-left: 3px solid #f85149;">
          <code style="color: #f85149;">orders.user_id</code><span style="color: #8b949e;"> → FK to users</span>
        </div>
        <div style="background: rgba(248,81,73,0.15); border-radius: 8px; padding: 12px; border-left: 3px solid #f85149;">
          <code style="color: #f85149;">orders.shipping_address_id</code><span style="color: #8b949e;"> → FK</span>
        </div>
        <div style="background: rgba(248,81,73,0.15); border-radius: 8px; padding: 12px; border-left: 3px solid #f85149;">
          <code style="color: #f85149;">shipments.order_id</code><span style="color: #8b949e;"> → FK to orders</span>
        </div>
        <div style="background: rgba(248,81,73,0.15); border-radius: 8px; padding: 12px; border-left: 3px solid #f85149;">
          <span style="color: #8b949e;">Cross-service JOINs in queries</span>
        </div>
        <div style="background: rgba(248,81,73,0.15); border-radius: 8px; padding: 12px; border-left: 3px solid #f85149;">
          <span style="color: #8b949e;">Cascading deletes</span>
        </div>
        <div style="background: rgba(248,81,73,0.15); border-radius: 8px; padding: 12px; border-left: 3px solid #f85149;">
          <span style="color: #8b949e;">Single transaction for order</span>
        </div>
      </div>
    </div>

    <!-- After Column -->
    <div>
      <h4 style="color: #7ee787; margin: 0 0 16px 0; text-align: center; padding: 8px; background: rgba(126,231,135,0.1); border-radius: 8px;">AFTER (Microservices)</h4>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="background: rgba(126,231,135,0.15); border-radius: 8px; padding: 12px; border-left: 3px solid #7ee787;">
          <code style="color: #7ee787;">orders.user_id</code><span style="color: #8b949e;"> = UUID (no FK)</span><br/>
          <span style="color: #8b949e; font-size: 0.85em;">+ customer_email, customer_name copied</span>
        </div>
        <div style="background: rgba(126,231,135,0.15); border-radius: 8px; padding: 12px; border-left: 3px solid #7ee787;">
          <code style="color: #7ee787;">orders.shipping_address</code><span style="color: #8b949e;"> = JSONB</span><br/>
          <span style="color: #8b949e; font-size: 0.85em;">(complete address snapshot)</span>
        </div>
        <div style="background: rgba(126,231,135,0.15); border-radius: 8px; padding: 12px; border-left: 3px solid #7ee787;">
          <code style="color: #7ee787;">shipments.order_id</code><span style="color: #8b949e;"> = UUID (no FK)</span><br/>
          <span style="color: #8b949e; font-size: 0.85em;">+ order_number, recipient_* copied</span>
        </div>
        <div style="background: rgba(126,231,135,0.15); border-radius: 8px; padding: 12px; border-left: 3px solid #7ee787;">
          <span style="color: #8b949e;">Events + Denormalized data</span>
        </div>
        <div style="background: rgba(126,231,135,0.15); border-radius: 8px; padding: 12px; border-left: 3px solid #7ee787;">
          <span style="color: #8b949e;">Soft deletes + Eventual cleanup</span>
        </div>
        <div style="background: rgba(126,231,135,0.15); border-radius: 8px; padding: 12px; border-left: 3px solid #7ee787;">
          <span style="color: #8b949e;">Saga pattern with compensations</span>
        </div>
      </div>
    </div>
  </div>
</div>

---

## Event-Driven Communication

### Events Published by Each Service

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #30363d; padding-bottom: 12px;">SERVICE EVENTS</h3>

  <div style="display: flex; flex-direction: column; gap: 20px;">
    <!-- User Service Events -->
    <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 20px;">
      <h4 style="color: #fff; margin: 0 0 12px 0;">USER SERVICE EVENTS</h4>
      <div style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
        <span style="color: #d1fae5; font-weight: 600;">Topic: user.events</span>
      </div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 16px; font-family: monospace; font-size: 0.85em;">
        <div style="color: #7ee787; margin-bottom: 8px;">UserCreated:</div>
        <pre style="color: #d1fae5; margin: 0; white-space: pre-wrap;">{
  "event_id": "uuid",
  "event_type": "UserCreated",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "user_id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}</pre>
      </div>
      <div style="margin-top: 12px; display: flex; gap: 8px; flex-wrap: wrap;">
        <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 12px; color: #fff; font-size: 0.85em;">AddressAdded</span>
        <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 12px; color: #fff; font-size: 0.85em;">AddressUpdated</span>
        <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 12px; color: #fff; font-size: 0.85em;">UserDeleted</span>
      </div>
    </div>

    <!-- Order Service Events -->
    <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 20px;">
      <h4 style="color: #fff; margin: 0 0 12px 0;">ORDER SERVICE EVENTS</h4>
      <div style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
        <span style="color: #dbeafe; font-weight: 600;">Topic: order.events</span>
      </div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 16px; font-family: monospace; font-size: 0.85em;">
        <div style="color: #58a6ff; margin-bottom: 8px;">OrderCreated:</div>
        <pre style="color: #dbeafe; margin: 0; white-space: pre-wrap;">{
  "event_id": "uuid",
  "event_type": "OrderCreated",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "order_id": "uuid",
    "order_number": "ORD-123456",
    "user_id": "uuid",
    "total": 1500.00,
    "shipping_address": { ... }
  }
}</pre>
      </div>
      <div style="margin-top: 12px; display: flex; gap: 8px; flex-wrap: wrap;">
        <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 12px; color: #fff; font-size: 0.85em;">OrderConfirmed</span>
        <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 12px; color: #fff; font-size: 0.85em;">OrderCancelled</span>
        <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 12px; color: #fff; font-size: 0.85em;">OrderCompleted</span>
      </div>
    </div>

    <!-- Logistics Service Events -->
    <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 20px;">
      <h4 style="color: #fff; margin: 0 0 12px 0;">LOGISTICS SERVICE EVENTS</h4>
      <div style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
        <span style="color: #ede9fe; font-weight: 600;">Topic: shipment.events</span>
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 12px; color: #fff; font-size: 0.85em;">ShipmentCreated</span>
        <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 12px; color: #fff; font-size: 0.85em;">ShipmentDispatched</span>
        <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 12px; color: #fff; font-size: 0.85em;">ShipmentDelivered</span>
        <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 12px; color: #fff; font-size: 0.85em;">DeliveryAttemptFailed</span>
        <span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 12px; color: #fff; font-size: 0.85em;">ShipmentReturned</span>
      </div>
    </div>
  </div>
</div>

---

## Migration Strategy: Strangler Fig Pattern

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #30363d; padding-bottom: 12px;">STRANGLER FIG MIGRATION PHASES</h3>

  <div style="display: flex; flex-direction: column; gap: 16px;">
    <!-- Phase 1 -->
    <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 20px;">
      <h4 style="color: #fff; margin: 0 0 12px 0; display: flex; align-items: center; gap: 10px;">
        <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 0.85em;">PHASE 1</span>
        IDENTIFY BOUNDARIES
      </h4>
      <ul style="color: #dbeafe; margin: 0; padding-left: 20px; font-size: 0.9em;">
        <li>Analyze domain boundaries (User, Order, Logistics)</li>
        <li>Identify shared data and cross-cutting concerns</li>
        <li>Map current database dependencies</li>
        <li>Define service contracts (APIs, Events)</li>
      </ul>
    </div>

    <!-- Phase 2 -->
    <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 20px;">
      <h4 style="color: #fff; margin: 0 0 12px 0; display: flex; align-items: center; gap: 10px;">
        <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 0.85em;">PHASE 2</span>
        EXTRACT USER SERVICE (Least Dependencies)
      </h4>
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px; align-items: center;">
        <div style="background: rgba(0,0,0,0.2); border-radius: 8px; padding: 16px;">
          <div style="color: #d1fae5; font-weight: 600; margin-bottom: 12px; text-align: center;">MONOLITH</div>
          <div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 12px;">
            <span style="background: rgba(255,255,255,0.15); padding: 6px 12px; border-radius: 6px; color: #fff; font-size: 0.85em;">User</span>
            <span style="background: rgba(255,255,255,0.15); padding: 6px 12px; border-radius: 6px; color: #fff; font-size: 0.85em;">Order</span>
            <span style="background: rgba(255,255,255,0.15); padding: 6px 12px; border-radius: 6px; color: #fff; font-size: 0.85em;">Logistics</span>
          </div>
          <div style="text-align: center; color: #fff;">↓</div>
          <div style="background: rgba(248,81,73,0.3); border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 0.85em; margin-top: 8px;">Shared Database</div>
        </div>
        <div style="text-align: center;">
          <div style="color: #fff; margin-bottom: 8px;">Extract →</div>
          <div style="background: #7ee787; border-radius: 8px; padding: 12px; color: #0d1117;">
            <div style="font-weight: 600;">User Service</div>
            <div style="font-size: 0.85em;">(New DB)</div>
          </div>
          <div style="color: #d1fae5; font-size: 0.8em; margin-top: 8px;">API calls from monolith</div>
        </div>
      </div>
    </div>

    <!-- Phase 3 -->
    <div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 20px;">
      <h4 style="color: #fff; margin: 0 0 12px 0; display: flex; align-items: center; gap: 10px;">
        <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 0.85em;">PHASE 3</span>
        DATA SYNCHRONIZATION
      </h4>
      <ul style="color: #ede9fe; margin: 0; padding-left: 20px; font-size: 0.9em;">
        <li>Dual-write to both old and new databases</li>
        <li>Sync existing user data to new User Service DB</li>
        <li>Validate data consistency</li>
        <li>Switch reads to new service</li>
      </ul>
    </div>

    <!-- Phase 4 -->
    <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 12px; padding: 20px;">
      <h4 style="color: #fff; margin: 0 0 12px 0; display: flex; align-items: center; gap: 10px;">
        <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 0.85em;">PHASE 4</span>
        EXTRACT ORDER SERVICE
      </h4>
      <ul style="color: #fed7aa; margin: 0; padding-left: 20px; font-size: 0.9em;">
        <li>Copy user data (email, name) into orders (denormalization)</li>
        <li>Replace FK relationships with event-driven updates</li>
        <li>Implement Saga for order creation workflow</li>
      </ul>
    </div>

    <!-- Phase 5 -->
    <div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); border-radius: 12px; padding: 20px;">
      <h4 style="color: #fff; margin: 0 0 12px 0; display: flex; align-items: center; gap: 10px;">
        <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 0.85em;">PHASE 5</span>
        EXTRACT LOGISTICS SERVICE
      </h4>
      <ul style="color: #cffafe; margin: 0; padding-left: 20px; font-size: 0.9em;">
        <li>Subscribe to order.events</li>
        <li>Copy shipping address and order details</li>
        <li>Remove shipments table from monolith</li>
      </ul>
    </div>

    <!-- Phase 6 -->
    <div style="background: linear-gradient(135deg, #7ee787 0%, #3fb950 100%); border-radius: 12px; padding: 20px;">
      <h4 style="color: #0d1117; margin: 0 0 12px 0; display: flex; align-items: center; gap: 10px;">
        <span style="background: rgba(0,0,0,0.2); padding: 4px 12px; border-radius: 20px; font-size: 0.85em; color: #fff;">PHASE 6</span>
        DECOMMISSION MONOLITH
      </h4>
      <ul style="color: #064e3b; margin: 0; padding-left: 20px; font-size: 0.9em;">
        <li>Redirect all traffic to microservices</li>
        <li>Archive old database</li>
        <li>Remove monolith infrastructure</li>
      </ul>
    </div>
  </div>
</div>

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
