# Designing Flipkart (E-Commerce) Microservices Architecture

## Overview

This comprehensive guide walks through designing a large-scale e-commerce platform like Flipkart using microservices architecture. We'll cover service decomposition, data modeling, communication patterns, and handling scale challenges.

**Tags:** System Design, E-Commerce, Case Study, Flipkart

---

## Requirements Analysis

### Functional Requirements

```
┌─────────────────────────────────────────────────────────────────┐
│               FLIPKART FUNCTIONAL REQUIREMENTS                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  USER MANAGEMENT              PRODUCT MANAGEMENT                 │
│  ├─ Registration/Login        ├─ Product catalog                │
│  ├─ Profile management        ├─ Categories & attributes        │
│  ├─ Address management        ├─ Inventory tracking             │
│  └─ Wishlist                  └─ Seller management              │
│                                                                  │
│  SEARCH & DISCOVERY           ORDERING                          │
│  ├─ Full-text search          ├─ Cart management                │
│  ├─ Filters & facets          ├─ Order placement                │
│  ├─ Recommendations           ├─ Order tracking                 │
│  └─ Recently viewed           └─ Returns & refunds              │
│                                                                  │
│  PAYMENTS                     LOGISTICS                         │
│  ├─ Multiple payment modes    ├─ Warehouse management           │
│  ├─ Wallet system             ├─ Shipping partners              │
│  ├─ Refund processing         ├─ Delivery tracking              │
│  └─ Invoice generation        └─ Last-mile delivery             │
│                                                                  │
│  NOTIFICATIONS                ANALYTICS                         │
│  ├─ Email/SMS/Push            ├─ User behavior                  │
│  ├─ Order updates             ├─ Sales analytics                │
│  └─ Promotional               └─ Inventory forecasting          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Non-Functional Requirements

| Requirement | Target |
|------------|--------|
| **Availability** | 99.99% (52 min downtime/year) |
| **Latency** | p99 < 200ms for API calls |
| **Throughput** | 100K+ orders/minute during sales |
| **Data Volume** | 100M+ products, 500M+ users |
| **Concurrent Users** | 10M+ during peak |
| **Scale** | Handle 10x traffic during Big Billion Days |

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLIPKART MICROSERVICES ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────┐      │
│  │                         CLIENTS                                    │      │
│  │    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐      │      │
│  │    │   Web   │    │   iOS   │    │ Android │    │ Partner │      │      │
│  │    │   App   │    │   App   │    │   App   │    │   API   │      │      │
│  │    └────┬────┘    └────┬────┘    └────┬────┘    └────┬────┘      │      │
│  └─────────┼──────────────┼──────────────┼──────────────┼───────────┘      │
│            │              │              │              │                    │
│            ▼              ▼              ▼              ▼                    │
│  ┌───────────────────────────────────────────────────────────────────┐      │
│  │                      CDN + WAF + DDoS Protection                   │      │
│  └───────────────────────────────────────────────────────────────────┘      │
│                                    │                                         │
│  ┌─────────────────────────────────▼─────────────────────────────────┐      │
│  │                      API GATEWAY (Kong)                            │      │
│  │    ┌─────────────────────────────────────────────────────────┐    │      │
│  │    │ Auth │ Rate Limit │ Routing │ Request Transform │ Cache │    │      │
│  │    └─────────────────────────────────────────────────────────┘    │      │
│  └───────────────────────────────────────────────────────────────────┘      │
│                                    │                                         │
│  ┌─────────────────────────────────▼─────────────────────────────────┐      │
│  │                     BACKEND FOR FRONTEND (BFF)                     │      │
│  │    ┌──────────┐    ┌──────────┐    ┌──────────┐                   │      │
│  │    │ Web BFF  │    │Mobile BFF│    │Partner BFF│                   │      │
│  │    └──────────┘    └──────────┘    └──────────┘                   │      │
│  └───────────────────────────────────────────────────────────────────┘      │
│                                    │                                         │
│  ┌─────────────────────────────────▼─────────────────────────────────┐      │
│  │                     DOMAIN SERVICES LAYER                          │      │
│  │                                                                    │      │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐     │      │
│  │  │  User   │ │ Product │ │  Cart   │ │  Order  │ │ Payment │     │      │
│  │  │ Service │ │ Service │ │ Service │ │ Service │ │ Service │     │      │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘     │      │
│  │                                                                    │      │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐     │      │
│  │  │Inventory│ │  Search │ │Shipping │ │ Seller  │ │ Pricing │     │      │
│  │  │ Service │ │ Service │ │ Service │ │ Service │ │ Service │     │      │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘     │      │
│  │                                                                    │      │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐     │      │
│  │  │ Wallet  │ │Recommend│ │  Promo  │ │  Notif  │ │Analytics│     │      │
│  │  │ Service │ │ Service │ │ Service │ │ Service │ │ Service │     │      │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘     │      │
│  │                                                                    │      │
│  └───────────────────────────────────────────────────────────────────┘      │
│                                    │                                         │
│  ┌─────────────────────────────────▼─────────────────────────────────┐      │
│  │                       DATA & MESSAGING LAYER                       │      │
│  │                                                                    │      │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐     │      │
│  │  │PostgreSQL│ │ MongoDB │ │  Redis  │ │  Kafka  │ │Elastic  │     │      │
│  │  │(Users)  │ │(Products)│ │ (Cache) │ │(Events) │ │(Search) │     │      │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘     │      │
│  │                                                                    │      │
│  └───────────────────────────────────────────────────────────────────┘      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Service Decomposition

### Core Services

#### 1. User Service

```
┌─────────────────────────────────────────────────────────────────┐
│                       USER SERVICE                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  RESPONSIBILITIES:                                              │
│  ├─ User registration & authentication                          │
│  ├─ Profile management (name, email, phone)                     │
│  ├─ Address book management                                     │
│  ├─ Session management                                          │
│  └─ User preferences                                            │
│                                                                  │
│  API ENDPOINTS:                                                 │
│  POST   /api/users/register                                     │
│  POST   /api/users/login                                        │
│  GET    /api/users/{id}                                         │
│  PUT    /api/users/{id}                                         │
│  GET    /api/users/{id}/addresses                               │
│  POST   /api/users/{id}/addresses                               │
│                                                                  │
│  DATABASE: PostgreSQL                                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  users                    │  addresses                   │   │
│  │  ├─ id (PK)               │  ├─ id (PK)                  │   │
│  │  ├─ email (unique)        │  ├─ user_id (FK)             │   │
│  │  ├─ phone (unique)        │  ├─ address_line1            │   │
│  │  ├─ password_hash         │  ├─ address_line2            │   │
│  │  ├─ first_name            │  ├─ city                     │   │
│  │  ├─ last_name             │  ├─ state                    │   │
│  │  ├─ created_at            │  ├─ pincode                  │   │
│  │  └─ updated_at            │  ├─ is_default               │   │
│  │                           │  └─ type (home/work/other)   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  CACHE: Redis (sessions, frequently accessed profiles)          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### 2. Product Service

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRODUCT SERVICE                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  RESPONSIBILITIES:                                              │
│  ├─ Product CRUD operations                                     │
│  ├─ Category management                                         │
│  ├─ Product attributes & variants                               │
│  ├─ Product images & media                                      │
│  └─ Product reviews & ratings                                   │
│                                                                  │
│  API ENDPOINTS:                                                 │
│  GET    /api/products?category=&filters=                        │
│  GET    /api/products/{id}                                      │
│  GET    /api/products/{id}/variants                             │
│  GET    /api/products/{id}/reviews                              │
│  POST   /api/products/{id}/reviews                              │
│  GET    /api/categories                                         │
│  GET    /api/categories/{id}/products                           │
│                                                                  │
│  DATABASE: MongoDB (flexible schema for varied products)        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  {                                                       │   │
│  │    "_id": "prod_123",                                    │   │
│  │    "name": "iPhone 15 Pro",                              │   │
│  │    "seller_id": "seller_456",                            │   │
│  │    "category": ["Electronics", "Mobiles", "Apple"],      │   │
│  │    "brand": "Apple",                                     │   │
│  │    "attributes": {                                       │   │
│  │      "color": "Space Black",                             │   │
│  │      "storage": "256GB",                                 │   │
│  │      "ram": "8GB"                                        │   │
│  │    },                                                    │   │
│  │    "variants": [                                         │   │
│  │      {"sku": "IP15P-256-BLK", "storage": "256GB"},       │   │
│  │      {"sku": "IP15P-512-BLK", "storage": "512GB"}        │   │
│  │    ],                                                    │   │
│  │    "images": ["url1", "url2"],                           │   │
│  │    "rating": { "avg": 4.5, "count": 15234 },             │   │
│  │    "status": "active",                                   │   │
│  │    "created_at": "2024-01-15T10:30:00Z"                  │   │
│  │  }                                                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### 3. Inventory Service

```
┌─────────────────────────────────────────────────────────────────┐
│                     INVENTORY SERVICE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  RESPONSIBILITIES:                                              │
│  ├─ Track stock levels per SKU per warehouse                    │
│  ├─ Reserve inventory for orders                                │
│  ├─ Release inventory on cancellation                           │
│  ├─ Low stock alerts                                            │
│  └─ Inventory reconciliation                                    │
│                                                                  │
│  CRITICAL OPERATIONS (need ACID):                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  RESERVE INVENTORY (during checkout)                     │   │
│  │  1. Check available_qty >= requested_qty                 │   │
│  │  2. Decrement available_qty                              │   │
│  │  3. Increment reserved_qty                               │   │
│  │  4. Create reservation record with TTL                   │   │
│  │                                                          │   │
│  │  COMMIT INVENTORY (after payment)                        │   │
│  │  1. Decrement reserved_qty                               │   │
│  │  2. Create shipment allocation                           │   │
│  │                                                          │   │
│  │  RELEASE INVENTORY (on timeout/cancel)                   │   │
│  │  1. Increment available_qty                              │   │
│  │  2. Decrement reserved_qty                               │   │
│  │  3. Delete reservation record                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  DATABASE: PostgreSQL (ACID for inventory transactions)         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  inventory                │  inventory_reservations      │   │
│  │  ├─ sku (PK)              │  ├─ id (PK)                  │   │
│  │  ├─ warehouse_id (PK)     │  ├─ sku                      │   │
│  │  ├─ available_qty         │  ├─ warehouse_id             │   │
│  │  ├─ reserved_qty          │  ├─ order_id                 │   │
│  │  ├─ reorder_point         │  ├─ quantity                 │   │
│  │  └─ updated_at            │  ├─ status                   │   │
│  │                           │  └─ expires_at               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  DISTRIBUTED LOCK: Redis (prevent overselling)                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### 4. Cart Service

```
┌─────────────────────────────────────────────────────────────────┐
│                       CART SERVICE                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  RESPONSIBILITIES:                                              │
│  ├─ Add/remove items to cart                                    │
│  ├─ Update quantities                                           │
│  ├─ Apply coupons                                               │
│  ├─ Calculate totals (with tax, shipping)                       │
│  └─ Cart persistence & recovery                                 │
│                                                                  │
│  API ENDPOINTS:                                                 │
│  GET    /api/cart                                               │
│  POST   /api/cart/items                                         │
│  PUT    /api/cart/items/{sku}                                   │
│  DELETE /api/cart/items/{sku}                                   │
│  POST   /api/cart/coupon                                        │
│  DELETE /api/cart/coupon                                        │
│                                                                  │
│  DATA MODEL (Redis + PostgreSQL backup):                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  cart:{user_id} (Redis Hash)                             │   │
│  │  {                                                       │   │
│  │    "items": [                                            │   │
│  │      {                                                   │   │
│  │        "sku": "IP15P-256-BLK",                           │   │
│  │        "product_id": "prod_123",                         │   │
│  │        "quantity": 1,                                    │   │
│  │        "price": 134900,                                  │   │
│  │        "seller_id": "seller_456"                         │   │
│  │      }                                                   │   │
│  │    ],                                                    │   │
│  │    "coupon_code": "SAVE10",                              │   │
│  │    "updated_at": "2024-01-15T10:30:00Z"                  │   │
│  │  }                                                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  EVENTS PUBLISHED:                                              │
│  ├─ cart.item.added                                             │
│  ├─ cart.item.removed                                           │
│  └─ cart.abandoned (after 24h inactivity)                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### 5. Order Service

```
┌─────────────────────────────────────────────────────────────────┐
│                       ORDER SERVICE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  RESPONSIBILITIES:                                              │
│  ├─ Order creation & management                                 │
│  ├─ Order state machine                                         │
│  ├─ Order history                                               │
│  └─ Returns & refunds                                           │
│                                                                  │
│  ORDER STATE MACHINE:                                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │  CREATED ──▶ PAYMENT_PENDING ──▶ CONFIRMED               │   │
│  │                    │                   │                  │   │
│  │                    ▼                   ▼                  │   │
│  │              PAYMENT_FAILED       PROCESSING              │   │
│  │                    │                   │                  │   │
│  │                    ▼                   ▼                  │   │
│  │               CANCELLED            SHIPPED                │   │
│  │                                        │                  │   │
│  │                                        ▼                  │   │
│  │                                   DELIVERED               │   │
│  │                                        │                  │   │
│  │                                        ▼                  │   │
│  │                              RETURN_REQUESTED             │   │
│  │                                        │                  │   │
│  │                                        ▼                  │   │
│  │                                   RETURNED                │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  DATABASE: PostgreSQL                                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  orders                   │  order_items                 │   │
│  │  ├─ id (PK)               │  ├─ id (PK)                  │   │
│  │  ├─ user_id               │  ├─ order_id (FK)            │   │
│  │  ├─ status                │  ├─ sku                      │   │
│  │  ├─ total_amount          │  ├─ product_id               │   │
│  │  ├─ shipping_address_id   │  ├─ quantity                 │   │
│  │  ├─ payment_id            │  ├─ unit_price               │   │
│  │  ├─ created_at            │  ├─ seller_id                │   │
│  │  └─ updated_at            │  └─ status                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### 6. Payment Service

```
┌─────────────────────────────────────────────────────────────────┐
│                      PAYMENT SERVICE                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  RESPONSIBILITIES:                                              │
│  ├─ Payment processing (UPI, Cards, NetBanking, COD)            │
│  ├─ Payment gateway integration                                 │
│  ├─ Refund processing                                           │
│  ├─ Payment reconciliation                                      │
│  └─ Fraud detection                                             │
│                                                                  │
│  PAYMENT FLOW:                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │  1. Order Service ─▶ Payment Service: Initiate Payment   │   │
│  │                                                          │   │
│  │  2. Payment Service ─▶ Payment Gateway: Create Order     │   │
│  │                                                          │   │
│  │  3. User ─▶ Payment Gateway: Complete Payment            │   │
│  │                                                          │   │
│  │  4. Payment Gateway ─▶ Webhook ─▶ Payment Service        │   │
│  │                                                          │   │
│  │  5. Payment Service ─▶ Kafka: payment.completed          │   │
│  │                                                          │   │
│  │  6. Order Service ─▶ Consume event ─▶ Update order       │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  INTEGRATIONS:                                                  │
│  ├─ Razorpay (UPI, Cards)                                       │
│  ├─ PayU (NetBanking)                                           │
│  ├─ Simpl (Buy Now Pay Later)                                   │
│  └─ Internal Wallet                                             │
│                                                                  │
│  DATABASE: PostgreSQL (PCI-DSS compliant)                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  payments                 │  refunds                     │   │
│  │  ├─ id (PK)               │  ├─ id (PK)                  │   │
│  │  ├─ order_id              │  ├─ payment_id (FK)          │   │
│  │  ├─ amount                │  ├─ amount                   │   │
│  │  ├─ currency              │  ├─ reason                   │   │
│  │  ├─ method                │  ├─ status                   │   │
│  │  ├─ gateway               │  └─ created_at               │   │
│  │  ├─ gateway_txn_id        │                              │   │
│  │  ├─ status                │                              │   │
│  │  └─ created_at            │                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Search Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    SEARCH ARCHITECTURE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    SEARCH QUERY FLOW                      │   │
│  │                                                           │   │
│  │  User: "iPhone 15 Pro 256GB black"                        │   │
│  │         │                                                 │   │
│  │         ▼                                                 │   │
│  │  ┌─────────────┐                                          │   │
│  │  │ Query Parser│ ─▶ Tokenize, Normalize, Spell Check     │   │
│  │  └──────┬──────┘                                          │   │
│  │         │                                                 │   │
│  │         ▼                                                 │   │
│  │  ┌─────────────┐                                          │   │
│  │  │Query Builder│ ─▶ Build Elasticsearch DSL              │   │
│  │  └──────┬──────┘                                          │   │
│  │         │                                                 │   │
│  │         ▼                                                 │   │
│  │  ┌─────────────────────────────────────────────┐          │   │
│  │  │            ELASTICSEARCH CLUSTER             │          │   │
│  │  │                                              │          │   │
│  │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐    │          │   │
│  │  │  │ Shard 1  │ │ Shard 2  │ │ Shard 3  │    │          │   │
│  │  │  └──────────┘ └──────────┘ └──────────┘    │          │   │
│  │  │                                              │          │   │
│  │  │  Indexes:                                    │          │   │
│  │  │  ├─ products (100M+ docs)                    │          │   │
│  │  │  ├─ sellers (1M docs)                        │          │   │
│  │  │  └─ categories (10K docs)                    │          │   │
│  │  └─────────────────────────────────────────────┘          │   │
│  │         │                                                 │   │
│  │         ▼                                                 │   │
│  │  ┌─────────────┐                                          │   │
│  │  │   Ranker    │ ─▶ Relevance, Popularity, Personalize   │   │
│  │  └──────┬──────┘                                          │   │
│  │         │                                                 │   │
│  │         ▼                                                 │   │
│  │  Search Results with Facets                               │   │
│  │                                                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  DATA SYNC PIPELINE:                                            │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                                                           │   │
│  │  MongoDB ──▶ Debezium CDC ──▶ Kafka ──▶ Elasticsearch    │   │
│  │  (Products)    (Change Data     (product.   (Index        │   │
│  │                 Capture)          events)    Updates)      │   │
│  │                                                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Order Flow Sequence

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ORDER CREATION FLOW                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  User        Cart       Order      Inventory   Payment    Notification       │
│   │           │          │            │          │            │              │
│   │──Checkout▶│          │            │          │            │              │
│   │           │──Create─▶│            │          │            │              │
│   │           │  Order   │            │          │            │              │
│   │           │          │──Reserve──▶│          │            │              │
│   │           │          │  Stock     │          │            │              │
│   │           │          │◀───────────│          │            │              │
│   │           │          │   OK       │          │            │              │
│   │           │          │──Initiate─▶│          │            │              │
│   │           │          │  Payment   │          │            │              │
│   │           │          │            │──────────│            │              │
│   │◀──────────│──────────│──Payment──▶│          │            │              │
│   │           │          │  URL       │          │            │              │
│   │───────────│──────────│────────────│──Pay────▶│            │              │
│   │           │          │            │          │            │              │
│   │           │          │◀───Webhook─│──────────│            │              │
│   │           │          │  (Success) │          │            │              │
│   │           │          │──Confirm──▶│          │            │              │
│   │           │          │  Stock     │          │            │              │
│   │           │          │────────────│──────────│──Notify───▶│              │
│   │◀──────────│──────────│──────Order─│──────────│──Confirmed─│              │
│   │           │          │   Confirmed│          │            │              │
│   │           │          │            │          │            │              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Handling Scale (Big Billion Days)

### Pre-Sale Preparations

```
┌─────────────────────────────────────────────────────────────────┐
│               SCALING FOR BIG BILLION DAYS                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  TRAFFIC MANAGEMENT:                                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │  1. QUEUE-BASED CHECKOUT                                 │   │
│  │     ┌─────────┐    ┌─────────┐    ┌─────────┐           │   │
│  │     │  Users  │───▶│ Virtual │───▶│ Checkout│           │   │
│  │     │ (10M)   │    │  Queue  │    │ (10K/s) │           │   │
│  │     └─────────┘    └─────────┘    └─────────┘           │   │
│  │                                                          │   │
│  │  2. FLASH SALE INVENTORY LOCKING                         │   │
│  │     - Pre-reserve inventory in Redis                     │   │
│  │     - Atomic decrement with Lua scripts                  │   │
│  │     - No database queries during flash                   │   │
│  │                                                          │   │
│  │  3. STATIC PAGE CACHING                                  │   │
│  │     - Pre-render product pages                           │   │
│  │     - CDN caching with 5-min TTL                         │   │
│  │     - Dynamic prices via API                             │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  INFRASTRUCTURE SCALING:                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │  Component          Normal    │   BBD (10x)              │   │
│  │  ─────────────────────────────│──────────────            │   │
│  │  API Gateway        50 pods   │   500 pods               │   │
│  │  Cart Service       30 pods   │   300 pods               │   │
│  │  Order Service      20 pods   │   200 pods               │   │
│  │  Payment Service    40 pods   │   400 pods               │   │
│  │  Redis Cluster      6 nodes   │   30 nodes               │   │
│  │  Kafka Brokers      9 brokers │   27 brokers             │   │
│  │  PostgreSQL         3 replicas│   10 replicas            │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  GRACEFUL DEGRADATION:                                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                          │   │
│  │  Priority 1 (Always available):                          │   │
│  │  ├─ Checkout & Payment                                   │   │
│  │  ├─ Order status                                         │   │
│  │  └─ Core search                                          │   │
│  │                                                          │   │
│  │  Priority 2 (Degraded if needed):                        │   │
│  │  ├─ Recommendations                                      │   │
│  │  ├─ Reviews                                              │   │
│  │  └─ Wishlist                                             │   │
│  │                                                          │   │
│  │  Priority 3 (Disabled if needed):                        │   │
│  │  ├─ Recently viewed                                      │   │
│  │  ├─ Price history                                        │   │
│  │  └─ Similar products                                     │   │
│  │                                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Product DB** | MongoDB | Flexible schema for varied product attributes |
| **User/Order DB** | PostgreSQL | ACID compliance for transactions |
| **Cache** | Redis Cluster | High throughput, pub/sub, Lua scripts |
| **Message Broker** | Kafka | High throughput, replay capability |
| **Search** | Elasticsearch | Full-text search, faceted navigation |
| **API Gateway** | Kong | Plugin ecosystem, Kubernetes native |
| **Service Mesh** | Istio | mTLS, traffic management |

---

## Key Takeaways

1. **Design for failure** - Every service can fail, plan for graceful degradation
2. **Eventual consistency is OK** - Not everything needs ACID transactions
3. **Cache aggressively** - Pre-compute and cache what you can
4. **Async where possible** - Use events to decouple services
5. **Test at scale** - Load test with production-like traffic before sales
6. **Monitor everything** - You can't fix what you can't see
