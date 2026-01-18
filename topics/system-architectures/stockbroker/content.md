# Design a Stockbroker System

## Problem Statement

Design a real-time stock trading platform that allows users to buy/sell stocks, view market data, manage portfolios, and execute trades with low latency.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

### Core Requirements
- **Real-time market data** streaming (prices, volumes, charts)
- **Order management** (market, limit, stop-loss orders)
- **Portfolio tracking** with P&L calculations
- **Trade execution** with sub-second latency
- **Account management** (deposits, withdrawals, margins)
- **Regulatory compliance** (audit trails, reporting)

</div>

---

## Functional Requirements

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #58a6ff; margin: 0 0 12px 0;">User Features</h4>
<ul style="color: #c9d1d9; font-size: 14px; margin: 0; padding-left: 20px;">
<li>User registration & KYC</li>
<li>View watchlists</li>
<li>Search stocks/symbols</li>
<li>Place buy/sell orders</li>
<li>View order history</li>
<li>Track portfolio performance</li>
</ul>
</div>

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #a371f7; margin: 0 0 12px 0;">System Features</h4>
<ul style="color: #c9d1d9; font-size: 14px; margin: 0; padding-left: 20px;">
<li>Order matching engine</li>
<li>Real-time price feeds</li>
<li>Risk management</li>
<li>Margin calculations</li>
<li>Settlement processing</li>
<li>Audit logging</li>
</ul>
</div>

</div>

---

## Non-Functional Requirements

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

| Requirement | Target | Criticality |
|-------------|--------|-------------|
| **Latency** | < 10ms for order placement | Critical |
| **Throughput** | 100K orders/second | High |
| **Availability** | 99.99% during market hours | Critical |
| **Consistency** | Strong for trades, eventual for analytics | Critical |
| **Data Retention** | 7 years for compliance | Regulatory |

</div>

---

## High-Level Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">STOCKBROKER SYSTEM ARCHITECTURE</h3>

<div style="display: flex; flex-direction: column; gap: 24px;">

<!-- Client Layer -->
<div style="background: rgba(88, 166, 255, 0.1); border: 2px solid #58a6ff; border-radius: 12px; padding: 20px;">
<div style="color: #58a6ff; font-weight: 600; margin-bottom: 12px; text-align: center;">CLIENT LAYER</div>
<div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;">
<div style="background: #21262d; padding: 12px 24px; border-radius: 8px; text-align: center;">
<div style="font-size: 24px;">📱</div>
<div style="color: #8b949e; font-size: 12px;">Mobile App</div>
</div>
<div style="background: #21262d; padding: 12px 24px; border-radius: 8px; text-align: center;">
<div style="font-size: 24px;">💻</div>
<div style="color: #8b949e; font-size: 12px;">Web Terminal</div>
</div>
<div style="background: #21262d; padding: 12px 24px; border-radius: 8px; text-align: center;">
<div style="font-size: 24px;">🔌</div>
<div style="color: #8b949e; font-size: 12px;">Trading API</div>
</div>
</div>
</div>

<div style="text-align: center; color: #58a6ff; font-size: 24px;">↓ WebSocket / REST ↓</div>

<!-- Gateway Layer -->
<div style="background: rgba(126, 231, 135, 0.1); border: 2px solid #7ee787; border-radius: 12px; padding: 20px;">
<div style="color: #7ee787; font-weight: 600; margin-bottom: 12px; text-align: center;">API GATEWAY & LOAD BALANCER</div>
<div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
<span style="background: #238636; padding: 8px 16px; border-radius: 6px; color: white; font-size: 13px;">Rate Limiting</span>
<span style="background: #238636; padding: 8px 16px; border-radius: 6px; color: white; font-size: 13px;">Authentication</span>
<span style="background: #238636; padding: 8px 16px; border-radius: 6px; color: white; font-size: 13px;">SSL Termination</span>
<span style="background: #238636; padding: 8px 16px; border-radius: 6px; color: white; font-size: 13px;">Request Routing</span>
</div>
</div>

<div style="text-align: center; color: #58a6ff; font-size: 24px;">↓</div>

<!-- Service Layer -->
<div style="background: rgba(137, 87, 229, 0.1); border: 2px solid #a371f7; border-radius: 12px; padding: 20px;">
<div style="color: #a371f7; font-weight: 600; margin-bottom: 16px; text-align: center;">CORE SERVICES</div>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
<div style="background: #21262d; padding: 16px; border-radius: 8px; text-align: center;">
<div style="color: #f0883e; font-weight: 600; font-size: 13px;">Order Service</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">Place/Cancel Orders</div>
</div>
<div style="background: #21262d; padding: 16px; border-radius: 8px; text-align: center;">
<div style="color: #58a6ff; font-weight: 600; font-size: 13px;">Matching Engine</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">Order Book</div>
</div>
<div style="background: #21262d; padding: 16px; border-radius: 8px; text-align: center;">
<div style="color: #7ee787; font-weight: 600; font-size: 13px;">Market Data</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">Price Streaming</div>
</div>
<div style="background: #21262d; padding: 16px; border-radius: 8px; text-align: center;">
<div style="color: #a371f7; font-weight: 600; font-size: 13px;">Portfolio</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">Holdings & P&L</div>
</div>
<div style="background: #21262d; padding: 16px; border-radius: 8px; text-align: center;">
<div style="color: #f85149; font-weight: 600; font-size: 13px;">Risk Engine</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">Margin & Limits</div>
</div>
<div style="background: #21262d; padding: 16px; border-radius: 8px; text-align: center;">
<div style="color: #58a6ff; font-weight: 600; font-size: 13px;">Settlement</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">T+1/T+2</div>
</div>
<div style="background: #21262d; padding: 16px; border-radius: 8px; text-align: center;">
<div style="color: #7ee787; font-weight: 600; font-size: 13px;">Account</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">Users & Wallets</div>
</div>
<div style="background: #21262d; padding: 16px; border-radius: 8px; text-align: center;">
<div style="color: #f0883e; font-weight: 600; font-size: 13px;">Notification</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 4px;">Alerts & Updates</div>
</div>
</div>
</div>

<div style="text-align: center; color: #58a6ff; font-size: 24px;">↓</div>

<!-- Data Layer -->
<div style="background: rgba(240, 136, 62, 0.1); border: 2px solid #f0883e; border-radius: 12px; padding: 20px;">
<div style="color: #f0883e; font-weight: 600; margin-bottom: 16px; text-align: center;">DATA LAYER</div>
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
<div style="background: #21262d; padding: 16px; border-radius: 8px; text-align: center;">
<div style="font-size: 20px;">🐘</div>
<div style="color: #c9d1d9; font-size: 12px; margin-top: 4px;">PostgreSQL</div>
<div style="color: #8b949e; font-size: 10px;">Orders, Accounts</div>
</div>
<div style="background: #21262d; padding: 16px; border-radius: 8px; text-align: center;">
<div style="font-size: 20px;">🔴</div>
<div style="color: #c9d1d9; font-size: 12px; margin-top: 4px;">Redis</div>
<div style="color: #8b949e; font-size: 10px;">Order Book, Cache</div>
</div>
<div style="background: #21262d; padding: 16px; border-radius: 8px; text-align: center;">
<div style="font-size: 20px;">📊</div>
<div style="color: #c9d1d9; font-size: 12px; margin-top: 4px;">TimescaleDB</div>
<div style="color: #8b949e; font-size: 10px;">Market Data</div>
</div>
<div style="background: #21262d; padding: 16px; border-radius: 8px; text-align: center;">
<div style="font-size: 20px;">📨</div>
<div style="color: #c9d1d9; font-size: 12px; margin-top: 4px;">Kafka</div>
<div style="color: #8b949e; font-size: 10px;">Event Streaming</div>
</div>
</div>
</div>

</div>
</div>

---

## Phase 1: Starting Phase (Low Budget)

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 1,000 - 10,000 active traders
- **Orders**: ~10,000 orders/day
- **Budget**: $500 - $2,000/month
- **Team**: 2-5 developers

### Monolithic Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```
┌─────────────────────────────────────────────────────────────┐
│                    MONOLITHIC APPLICATION                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│  │   Web UI    │ │  REST API   │ │  WebSocket Server   │   │
│  └──────┬──────┘ └──────┬──────┘ └──────────┬──────────┘   │
│         └───────────────┴───────────────────┘               │
│                         │                                    │
│  ┌──────────────────────┴──────────────────────────┐       │
│  │              Business Logic Layer                │       │
│  │  ┌─────────┐ ┌──────────┐ ┌─────────────────┐  │       │
│  │  │ Orders  │ │ Portfolio │ │ Market Data     │  │       │
│  │  └─────────┘ └──────────┘ └─────────────────┘  │       │
│  │  ┌─────────┐ ┌──────────┐ ┌─────────────────┐  │       │
│  │  │ Users   │ │ Matching │ │ Notifications   │  │       │
│  │  └─────────┘ └──────────┘ └─────────────────┘  │       │
│  └─────────────────────────────────────────────────┘       │
│                         │                                    │
│  ┌──────────────────────┴──────────────────────────┐       │
│  │              Data Access Layer                   │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
   ┌─────────┐     ┌───────────┐     ┌───────────┐
   │PostgreSQL│     │   Redis   │     │   S3      │
   │(Primary) │     │  (Cache)  │     │ (Backups) │
   └─────────┘     └───────────┘     └───────────┘
```

</div>

#### Tech Stack
- **Backend**: Python/Django or Node.js/Express
- **Database**: PostgreSQL (single instance)
- **Cache**: Redis (for sessions, order book)
- **WebSocket**: Socket.io or Django Channels
- **Hosting**: Single EC2 instance or DigitalOcean droplet

#### Abstract Code Structure

```python
# Monolithic Order Service
class OrderService:
    def __init__(self, db, cache, market_data):
        self.db = db
        self.cache = cache
        self.market_data = market_data

    def place_order(self, user_id, symbol, order_type, quantity, price=None):
        # Validate user balance
        # Check risk limits
        # Create order record
        # Submit to matching engine (in-process)
        # Update portfolio
        # Send notification
        pass

    def match_orders(self, symbol):
        # Get order book from cache
        # Match buy/sell orders
        # Execute trades
        # Update balances
        pass

class MatchingEngine:
    def __init__(self, cache):
        self.order_books = {}  # In-memory order books

    def add_order(self, order):
        # Add to appropriate order book
        # Try to match immediately
        pass

    def match(self, symbol):
        # Price-time priority matching
        pass
```

### Microservices Architecture (Phase 1)

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 20px; margin: 16px 0;">
<p style="color: #f0883e;"><strong>Not Recommended for Phase 1</strong></p>
<p style="color: #8b949e;">At this scale, microservices add unnecessary complexity. The operational overhead of managing multiple services, service discovery, and distributed transactions outweighs the benefits.</p>
</div>

#### If You Must Use Microservices:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  API Gateway │────▶│ Order Service│────▶│  PostgreSQL  │
└──────────────┘     └──────────────┘     └──────────────┘
        │                   │
        │            ┌──────▼──────┐
        │            │   Redis     │
        │            │ (Pub/Sub)   │
        │            └──────┬──────┘
        │                   │
        ▼                   ▼
┌──────────────┐     ┌──────────────┐
│Market Service│     │ Notification │
└──────────────┘     └──────────────┘
```

</div>
</div>

---

## Phase 2: Medium User Phase

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 100,000 - 500,000 active traders
- **Orders**: 500,000 - 2M orders/day
- **Budget**: $10,000 - $50,000/month
- **Team**: 10-25 developers

### Monolithic Architecture (Modular Monolith)

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```
                    ┌─────────────────────┐
                    │   Load Balancer     │
                    │   (AWS ALB/NLB)     │
                    └──────────┬──────────┘
                               │
           ┌───────────────────┼───────────────────┐
           ▼                   ▼                   ▼
    ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
    │   App       │     │   App       │     │   App       │
    │ Instance 1  │     │ Instance 2  │     │ Instance 3  │
    └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
           │                   │                   │
           └───────────────────┼───────────────────┘
                               │
    ┌──────────────────────────┼──────────────────────────┐
    │                          ▼                          │
    │  ┌─────────────┐  ┌─────────────┐  ┌────────────┐  │
    │  │ PostgreSQL  │  │   Redis     │  │  Kafka     │  │
    │  │  Primary    │  │  Cluster    │  │  Cluster   │  │
    │  │  + Replica  │  │             │  │            │  │
    │  └─────────────┘  └─────────────┘  └────────────┘  │
    │                  DATA LAYER                         │
    └─────────────────────────────────────────────────────┘
```

</div>

#### Improvements from Phase 1
- **Horizontal scaling**: Multiple app instances behind load balancer
- **Database replication**: Read replicas for analytics
- **Redis cluster**: For high-availability caching
- **Message queue**: Kafka for async order processing
- **Connection pooling**: PgBouncer for DB connections

### Microservices Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                         ┌────────────────────┐
                         │    API Gateway     │
                         │  (Kong/AWS APIGW)  │
                         └─────────┬──────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        │                          │                          │
        ▼                          ▼                          ▼
┌───────────────┐         ┌───────────────┐         ┌───────────────┐
│Order Service  │         │Market Data    │         │Portfolio      │
│               │◀───────▶│  Service      │         │  Service      │
│ - Placement   │         │               │         │               │
│ - Validation  │         │ - Price Feed  │         │ - Holdings    │
│ - History     │         │ - Streaming   │         │ - P&L Calc    │
└───────┬───────┘         └───────┬───────┘         └───────┬───────┘
        │                         │                         │
        ▼                         ▼                         ▼
   [PostgreSQL]            [TimescaleDB]             [PostgreSQL]
        │                         │                         │
        └─────────────────────────┼─────────────────────────┘
                                  │
                          ┌───────▼───────┐
                          │    Kafka      │
                          │  Event Bus   │
                          └───────┬───────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        │                         │                         │
        ▼                         ▼                         ▼
┌───────────────┐         ┌───────────────┐         ┌───────────────┐
│Matching Engine│         │Risk Service   │         │Notification   │
│               │         │               │         │  Service      │
│ - Order Book  │         │ - Margins     │         │               │
│ - Trade Exec  │         │ - Limits      │         │ - Email/SMS   │
└───────────────┘         └───────────────┘         └───────────────┘
        │                         │
        ▼                         │
   [Redis Cluster]                │
   (Order Books)                  │
                                  │
                          ┌───────▼───────┐
                          │  Settlement   │
                          │   Service     │
                          └───────────────┘
```

</div>

#### Service Boundaries

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 20px 0;">

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 16px;">
<h5 style="color: #58a6ff; margin: 0 0 8px 0;">Order Service</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Order CRUD operations</li>
<li>Order validation</li>
<li>Order history queries</li>
<li>Owns: orders, order_history tables</li>
</ul>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 16px;">
<h5 style="color: #7ee787; margin: 0 0 8px 0;">Matching Engine</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Order book management</li>
<li>Trade execution</li>
<li>Price-time priority</li>
<li>Owns: order_book (Redis)</li>
</ul>
</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 16px;">
<h5 style="color: #f0883e; margin: 0 0 8px 0;">Market Data Service</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Real-time price feeds</li>
<li>Historical data (OHLCV)</li>
<li>Market depth</li>
<li>Owns: price_ticks, candles</li>
</ul>
</div>

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 16px;">
<h5 style="color: #a371f7; margin: 0 0 8px 0;">Risk Service</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Margin calculations</li>
<li>Position limits</li>
<li>Auto-square off</li>
<li>Owns: margins, limits</li>
</ul>
</div>

</div>

</div>
</div>

---

## Phase 3: High User Base Phase

<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 5M+ active traders
- **Orders**: 50M+ orders/day (500K+ orders/second peak)
- **Budget**: $500,000+/month
- **Team**: 100+ engineers across teams

### High-Scale Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

```
                              GLOBAL INFRASTRUCTURE
    ┌────────────────────────────────────────────────────────────────┐
    │                                                                │
    │   ┌──────────┐     ┌──────────┐     ┌──────────┐              │
    │   │  Route53 │────▶│CloudFront│────▶│   WAF    │              │
    │   │  (DNS)   │     │  (CDN)   │     │(Security)│              │
    │   └──────────┘     └──────────┘     └────┬─────┘              │
    │                                          │                     │
    │   ┌──────────────────────────────────────┼───────────────────┐│
    │   │              REGION: US-EAST-1       │                   ││
    │   │                                      ▼                   ││
    │   │  ┌─────────────────────────────────────────────────────┐ ││
    │   │  │              API GATEWAY CLUSTER                    │ ││
    │   │  │   ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐      │ ││
    │   │  │   │APIGW│  │APIGW│  │APIGW│  │APIGW│  │APIGW│      │ ││
    │   │  │   └──┬──┘  └──┬──┘  └──┬──┘  └──┬──┘  └──┬──┘      │ ││
    │   │  └──────┼────────┼───────┼────────┼────────┼──────────┘ ││
    │   │         └────────┴───────┼────────┴────────┘             ││
    │   │                          ▼                               ││
    │   │  ┌────────────────────────────────────────────────────┐  ││
    │   │  │           KUBERNETES CLUSTER (EKS)                 │  ││
    │   │  │                                                    │  ││
    │   │  │  ┌──────────────────────────────────────────────┐ │  ││
    │   │  │  │         TRADING SERVICES NAMESPACE           │ │  ││
    │   │  │  │  ┌─────────┐ ┌─────────┐ ┌─────────────────┐│ │  ││
    │   │  │  │  │ Order   │ │Matching │ │  Market Data    ││ │  ││
    │   │  │  │  │ (x20)   │ │ Engine  │ │    (x10)        ││ │  ││
    │   │  │  │  │         │ │ (x5)    │ │                 ││ │  ││
    │   │  │  │  └─────────┘ └─────────┘ └─────────────────┘│ │  ││
    │   │  │  └──────────────────────────────────────────────┘ │  ││
    │   │  │                                                    │  ││
    │   │  │  ┌──────────────────────────────────────────────┐ │  ││
    │   │  │  │         SUPPORT SERVICES NAMESPACE           │ │  ││
    │   │  │  │  ┌─────────┐ ┌─────────┐ ┌─────────────────┐│ │  ││
    │   │  │  │  │ Risk    │ │Portfolio│ │  Settlement     ││ │  ││
    │   │  │  │  │ (x10)   │ │ (x15)   │ │    (x5)         ││ │  ││
    │   │  │  │  └─────────┘ └─────────┘ └─────────────────┘│ │  ││
    │   │  │  └──────────────────────────────────────────────┘ │  ││
    │   │  └────────────────────────────────────────────────────┘  ││
    │   │                          │                               ││
    │   │         ┌────────────────┼────────────────┐              ││
    │   │         ▼                ▼                ▼              ││
    │   │  ┌───────────┐    ┌───────────┐    ┌───────────┐        ││
    │   │  │  Aurora   │    │  Redis    │    │  Kafka    │        ││
    │   │  │ Cluster   │    │ Cluster   │    │ Cluster   │        ││
    │   │  │ (Global)  │    │ (128 nodes│    │ (100 nodes│        ││
    │   │  └───────────┘    └───────────┘    └───────────┘        ││
    │   └──────────────────────────────────────────────────────────┘│
    │                                                                │
    │   ┌──────────────────────────────────────────────────────────┐│
    │   │              REGION: EU-WEST-1 (DR)                      ││
    │   │              [Similar architecture - Active/Passive]      ││
    │   └──────────────────────────────────────────────────────────┘│
    └────────────────────────────────────────────────────────────────┘
```

</div>

### Order Flow at Scale

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">HIGH-FREQUENCY ORDER PROCESSING</h4>

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #238636; min-width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<div style="flex: 1; background: rgba(35, 134, 54, 0.1); border: 1px solid #238636; border-radius: 8px; padding: 12px;">
<div style="color: #7ee787; font-weight: 600;">Order Received</div>
<div style="color: #8b949e; font-size: 13px;">API Gateway → Order Service (< 1ms)</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #1f6feb; min-width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">2</div>
<div style="flex: 1; background: rgba(31, 111, 235, 0.1); border: 1px solid #1f6feb; border-radius: 8px; padding: 12px;">
<div style="color: #58a6ff; font-weight: 600;">Pre-Trade Validation</div>
<div style="color: #8b949e; font-size: 13px;">Balance check, Risk limits (Redis) (< 1ms)</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #8957e5; min-width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">3</div>
<div style="flex: 1; background: rgba(137, 87, 229, 0.1); border: 1px solid #8957e5; border-radius: 8px; padding: 12px;">
<div style="color: #a371f7; font-weight: 600;">Order Queued</div>
<div style="color: #8b949e; font-size: 13px;">Kafka partition by symbol (< 1ms)</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f0883e; min-width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">4</div>
<div style="flex: 1; background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 8px; padding: 12px;">
<div style="color: #f0883e; font-weight: 600;">Matching Engine</div>
<div style="color: #8b949e; font-size: 13px;">Order book matching (LMAX Disruptor) (< 5ms)</div>
</div>
</div>

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f85149; min-width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">5</div>
<div style="flex: 1; background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 8px; padding: 12px;">
<div style="color: #f85149; font-weight: 600;">Trade Execution</div>
<div style="color: #8b949e; font-size: 13px;">Update balances, emit events (< 2ms)</div>
</div>
</div>

</div>

<div style="text-align: center; margin-top: 24px; padding: 16px; background: rgba(126, 231, 135, 0.1); border-radius: 8px;">
<span style="color: #7ee787; font-weight: 600;">Total Latency: < 10ms (P99)</span>
</div>

</div>

### Matching Engine Deep Dive

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">ORDER BOOK STRUCTURE</h4>

```
                    AAPL Order Book
    ┌─────────────────────────────────────────┐
    │           BIDS (Buy Orders)             │
    │  ┌───────────────────────────────────┐  │
    │  │ Price    │ Quantity │ Orders      │  │
    │  ├──────────┼──────────┼─────────────┤  │
    │  │ $182.50  │ 15,000   │ [O1,O2,O3]  │  │  ← Best Bid
    │  │ $182.45  │ 8,000    │ [O4,O5]     │  │
    │  │ $182.40  │ 25,000   │ [O6,O7,O8]  │  │
    │  │ $182.35  │ 12,000   │ [O9]        │  │
    │  └───────────────────────────────────┘  │
    ├─────────────────────────────────────────┤
    │          SPREAD: $0.05                  │
    ├─────────────────────────────────────────┤
    │           ASKS (Sell Orders)            │
    │  ┌───────────────────────────────────┐  │
    │  │ Price    │ Quantity │ Orders      │  │
    │  ├──────────┼──────────┼─────────────┤  │
    │  │ $182.55  │ 10,000   │ [O10,O11]   │  │  ← Best Ask
    │  │ $182.60  │ 20,000   │ [O12,O13]   │  │
    │  │ $182.65  │ 5,000    │ [O14]       │  │
    │  │ $182.70  │ 18,000   │ [O15,O16]   │  │
    │  └───────────────────────────────────┘  │
    └─────────────────────────────────────────┘
```

#### Abstract Matching Engine Code

```java
// High-performance matching engine (LMAX Disruptor pattern)
public class MatchingEngine {
    private final RingBuffer<OrderEvent> ringBuffer;
    private final Map<String, OrderBook> orderBooks;

    public void onOrder(Order order) {
        OrderBook book = orderBooks.get(order.getSymbol());

        if (order.getType() == MARKET) {
            matchMarketOrder(book, order);
        } else {
            matchLimitOrder(book, order);
        }
    }

    private void matchLimitOrder(OrderBook book, Order order) {
        if (order.getSide() == BUY) {
            // Match against asks
            while (order.getRemainingQty() > 0 &&
                   !book.getAsks().isEmpty() &&
                   order.getPrice() >= book.getBestAsk().getPrice()) {
                executeTrade(order, book.getBestAsk());
            }
            if (order.getRemainingQty() > 0) {
                book.addBid(order);  // Add remaining to book
            }
        }
        // Similar for SELL side
    }
}
```

</div>

</div>
</div>

---

## AWS Technologies & Alternatives

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Compute

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 16px 0;">

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 16px;">
<h5 style="color: #58a6ff; margin: 0 0 8px 0;">AWS EKS</h5>
<p style="color: #7ee787; font-size: 12px; margin: 0 0 8px 0;">✓ Used For: Container orchestration</p>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Why:</strong> Managed K8s, auto-scaling, easy integration with AWS services</p>
</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 16px;">
<h5 style="color: #f0883e; margin: 0 0 8px 0;">Alternative: GKE</h5>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Pros:</strong> Better K8s integration, Autopilot mode</p>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Cons:</strong> Less AWS service integration</p>
</div>

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 16px;">
<h5 style="color: #a371f7; margin: 0 0 8px 0;">Alternative: Self-managed K8s</h5>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Pros:</strong> Full control, no vendor lock-in</p>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Cons:</strong> High ops overhead</p>
</div>

</div>

### Database

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 16px 0;">

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 16px;">
<h5 style="color: #58a6ff; margin: 0 0 8px 0;">Aurora PostgreSQL</h5>
<p style="color: #7ee787; font-size: 12px; margin: 0 0 8px 0;">✓ Used For: Orders, accounts, trades</p>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Why:</strong> 5x throughput, auto-scaling storage, global database</p>
</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 16px;">
<h5 style="color: #f0883e; margin: 0 0 8px 0;">Alternative: CockroachDB</h5>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Pros:</strong> Distributed SQL, no single point of failure</p>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Cons:</strong> Higher latency, complex operations</p>
</div>

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 16px;">
<h5 style="color: #a371f7; margin: 0 0 8px 0;">Alternative: YugabyteDB</h5>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Pros:</strong> PostgreSQL compatible, distributed</p>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Cons:</strong> Smaller ecosystem</p>
</div>

</div>

### Message Queue

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 16px 0;">

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 16px;">
<h5 style="color: #58a6ff; margin: 0 0 8px 0;">Amazon MSK (Kafka)</h5>
<p style="color: #7ee787; font-size: 12px; margin: 0 0 8px 0;">✓ Used For: Order events, market data</p>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Why:</strong> High throughput, ordering guarantees, replay capability</p>
</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 16px;">
<h5 style="color: #f0883e; margin: 0 0 8px 0;">Alternative: Redpanda</h5>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Pros:</strong> Kafka-compatible, lower latency, no ZooKeeper</p>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Cons:</strong> Smaller community</p>
</div>

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 16px;">
<h5 style="color: #a371f7; margin: 0 0 8px 0;">Alternative: Pulsar</h5>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Pros:</strong> Multi-tenancy, geo-replication</p>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Cons:</strong> Complexity, less tooling</p>
</div>

</div>

### Cache

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 16px 0;">

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 16px;">
<h5 style="color: #58a6ff; margin: 0 0 8px 0;">ElastiCache Redis</h5>
<p style="color: #7ee787; font-size: 12px; margin: 0 0 8px 0;">✓ Used For: Order books, sessions, rate limiting</p>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Why:</strong> Sub-ms latency, cluster mode, data structures</p>
</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 16px;">
<h5 style="color: #f0883e; margin: 0 0 8px 0;">Alternative: KeyDB</h5>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Pros:</strong> Multi-threaded, Redis compatible</p>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Cons:</strong> Less mature ecosystem</p>
</div>

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 16px;">
<h5 style="color: #a371f7; margin: 0 0 8px 0;">Alternative: Dragonfly</h5>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Pros:</strong> 25x throughput, lower memory</p>
<p style="color: #8b949e; font-size: 12px; margin: 0;"><strong>Cons:</strong> New, less battle-tested</p>
</div>

</div>

</div>

---

## Distributed Systems Considerations

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### 1. Consistency vs Availability Trade-offs

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 16px 0;">

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 20px;">
<h5 style="color: #f85149; margin: 0 0 12px 0;">Strong Consistency Required</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Order matching (can't double-spend)</li>
<li>Balance updates (ACID transactions)</li>
<li>Trade settlement</li>
</ul>
<p style="color: #c9d1d9; font-size: 12px; margin-top: 12px;"><strong>Solution:</strong> Synchronous replication, distributed locks</p>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 20px;">
<h5 style="color: #7ee787; margin: 0 0 12px 0;">Eventual Consistency OK</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Market data display</li>
<li>Portfolio analytics</li>
<li>Order history queries</li>
</ul>
<p style="color: #c9d1d9; font-size: 12px; margin-top: 12px;"><strong>Solution:</strong> Read replicas, caching, async updates</p>
</div>

</div>

### 2. Handling Network Partitions

```
                    PARTITION SCENARIO
    ┌───────────────────┐         ┌───────────────────┐
    │   Region A        │    X    │   Region B        │
    │  ┌─────────────┐  │    X    │  ┌─────────────┐  │
    │  │ Matching    │  │    X    │  │ Matching    │  │
    │  │ Engine      │  │ ──X──── │  │ Engine      │  │
    │  └─────────────┘  │    X    │  └─────────────┘  │
    │                   │    X    │                   │
    │  Active           │  SPLIT  │  Standby          │
    └───────────────────┘         └───────────────────┘

    STRATEGY: Prefer Consistency over Availability
    - Only primary region accepts trades
    - Standby becomes read-only
    - Manual failover after partition heals
```

### 3. Idempotency

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 20px; margin: 16px 0;">
<h5 style="color: #a371f7; margin: 0 0 12px 0;">Order Idempotency Key</h5>

```python
# Every order has a client-generated idempotency key
class Order:
    idempotency_key: str  # UUID generated by client
    user_id: str
    symbol: str
    quantity: int
    price: Decimal

# Server checks before processing
def place_order(order):
    existing = cache.get(f"order:{order.idempotency_key}")
    if existing:
        return existing  # Return cached response

    result = process_order(order)
    cache.set(f"order:{order.idempotency_key}", result, ttl=24h)
    return result
```

</div>

### 4. Rate Limiting

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 20px; margin: 16px 0;">

```
Rate Limits:
┌─────────────────────────────────────────────┐
│ Order Placement:  100 orders/second/user    │
│ Market Data:      1000 requests/min/user    │
│ API Calls:        10000 requests/min/user   │
└─────────────────────────────────────────────┘

Implementation: Token Bucket Algorithm (Redis)
- Distributed rate limiting across all API gateways
- Sliding window for smooth rate limiting
```

</div>

### 5. Circuit Breaker Pattern

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 20px; margin: 16px 0;">

```
             CIRCUIT BREAKER STATES

    ┌────────┐     failures > threshold    ┌────────┐
    │ CLOSED │ ──────────────────────────▶ │  OPEN  │
    │        │                              │        │
    │ Normal │                              │ Reject │
    │ Flow   │                              │  All   │
    └────────┘                              └───┬────┘
        ▲                                       │
        │         ┌───────────────┐             │
        │ success │  HALF-OPEN    │  timeout    │
        └─────────│               │◀────────────┘
                  │ Test Request  │
                  └───────────────┘

Applied to:
- Exchange connectivity
- Payment gateway
- External market data feeds
```

</div>

</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Points to Discuss

1. **Latency is Critical**: Trading systems need sub-10ms latency
2. **Consistency over Availability**: For financial transactions, use strong consistency
3. **Order Book Data Structure**: Price-time priority with efficient insertion/removal
4. **Event Sourcing**: All trades are immutable events for audit
5. **Regulatory Compliance**: 7-year data retention, audit trails
6. **Risk Management**: Real-time margin monitoring, circuit breakers

### Common Follow-up Questions

- How would you handle a market crash with 10x normal volume?
- How do you ensure no duplicate trades?
- How would you implement after-hours trading?
- How do you handle different order types (market, limit, stop-loss)?

</div>

---

## Related Topics

- [Message Queues](/topic/system-design/message-queues)
- [Database Sharding](/topic/system-design/database-sharding)
- [Rate Limiting](/topic/system-design/rate-limiting)
- [Circuit Breaker](/topic/system-design/circuit-breaker)
