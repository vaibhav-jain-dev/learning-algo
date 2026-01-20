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

<div style="border: 2px solid #58a6ff; border-radius: 12px; overflow: hidden;">
<div style="background: #58a6ff; color: #0d1117; padding: 12px; text-align: center; font-weight: 600;">MONOLITHIC APPLICATION</div>
<div style="padding: 20px;">

<div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 16px; flex-wrap: wrap;">
<div style="background: #21262d; border: 1px solid #30363d; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #58a6ff; font-weight: 600; font-size: 14px;">Web UI</div>
</div>
<div style="background: #21262d; border: 1px solid #30363d; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #58a6ff; font-weight: 600; font-size: 14px;">REST API</div>
</div>
<div style="background: #21262d; border: 1px solid #30363d; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #58a6ff; font-weight: 600; font-size: 14px;">WebSocket Server</div>
</div>
</div>

<div style="text-align: center; color: #58a6ff; font-size: 20px; margin: 8px 0;">↓</div>

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
<div style="color: #a371f7; font-weight: 600; text-align: center; margin-bottom: 12px;">Business Logic Layer</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
<div style="background: #21262d; border-radius: 6px; padding: 8px; text-align: center; color: #c9d1d9; font-size: 13px;">Orders</div>
<div style="background: #21262d; border-radius: 6px; padding: 8px; text-align: center; color: #c9d1d9; font-size: 13px;">Portfolio</div>
<div style="background: #21262d; border-radius: 6px; padding: 8px; text-align: center; color: #c9d1d9; font-size: 13px;">Market Data</div>
<div style="background: #21262d; border-radius: 6px; padding: 8px; text-align: center; color: #c9d1d9; font-size: 13px;">Users</div>
<div style="background: #21262d; border-radius: 6px; padding: 8px; text-align: center; color: #c9d1d9; font-size: 13px;">Matching</div>
<div style="background: #21262d; border-radius: 6px; padding: 8px; text-align: center; color: #c9d1d9; font-size: 13px;">Notifications</div>
</div>
</div>

<div style="text-align: center; color: #58a6ff; font-size: 20px; margin: 8px 0;">↓</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #f0883e; font-weight: 600;">Data Access Layer</div>
</div>

</div>
</div>

<div style="text-align: center; color: #58a6ff; font-size: 24px; margin: 16px 0;">↓</div>

<div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;">
<div style="background: #21262d; border: 2px solid #238636; border-radius: 8px; padding: 16px; text-align: center; min-width: 100px;">
<div style="font-size: 24px;">🐘</div>
<div style="color: #7ee787; font-weight: 600; font-size: 13px;">PostgreSQL</div>
<div style="color: #8b949e; font-size: 11px;">(Primary)</div>
</div>
<div style="background: #21262d; border: 2px solid #f85149; border-radius: 8px; padding: 16px; text-align: center; min-width: 100px;">
<div style="font-size: 24px;">🔴</div>
<div style="color: #f85149; font-weight: 600; font-size: 13px;">Redis</div>
<div style="color: #8b949e; font-size: 11px;">(Cache)</div>
</div>
<div style="background: #21262d; border: 2px solid #f0883e; border-radius: 8px; padding: 16px; text-align: center; min-width: 100px;">
<div style="font-size: 24px;">☁️</div>
<div style="color: #f0883e; font-weight: 600; font-size: 13px;">S3</div>
<div style="color: #8b949e; font-size: 11px;">(Backups)</div>
</div>
</div>

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

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

<div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 16px; flex-wrap: wrap;">
<div style="background: #238636; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: white; font-weight: 600; font-size: 13px;">API Gateway</div>
</div>
<div style="color: #58a6ff; font-size: 20px;">→</div>
<div style="background: #1f6feb; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: white; font-weight: 600; font-size: 13px;">Order Service</div>
</div>
<div style="color: #58a6ff; font-size: 20px;">→</div>
<div style="background: #21262d; border: 2px solid #7ee787; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #7ee787; font-weight: 600; font-size: 13px;">PostgreSQL</div>
</div>
</div>

<div style="display: flex; justify-content: center; gap: 80px; margin: 16px 0;">
<div style="text-align: center; color: #58a6ff; font-size: 20px;">↓</div>
<div style="text-align: center; color: #58a6ff; font-size: 20px;">↓</div>
</div>

<div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;">
<div style="background: #21262d; border: 2px solid #f85149; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #f85149; font-weight: 600; font-size: 13px;">Redis</div>
<div style="color: #8b949e; font-size: 11px;">(Pub/Sub)</div>
</div>
</div>

<div style="display: flex; justify-content: center; gap: 80px; margin: 16px 0;">
<div style="text-align: center; color: #58a6ff; font-size: 20px;">↓</div>
<div style="text-align: center; color: #58a6ff; font-size: 20px;">↓</div>
</div>

<div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;">
<div style="background: #8957e5; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: white; font-weight: 600; font-size: 13px;">Market Service</div>
</div>
<div style="background: #f0883e; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: white; font-weight: 600; font-size: 13px;">Notification</div>
</div>
</div>

</div>

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

<div style="display: flex; justify-content: center; margin-bottom: 20px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 16px 32px; text-align: center;">
<div style="color: white; font-weight: 600;">Load Balancer</div>
<div style="color: rgba(255,255,255,0.7); font-size: 12px;">(AWS ALB/NLB)</div>
</div>
</div>

<div style="text-align: center; color: #7ee787; font-size: 24px; margin: 12px 0;">↓</div>

<div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 20px; flex-wrap: wrap;">
<div style="background: #21262d; border: 2px solid #58a6ff; border-radius: 8px; padding: 16px 24px; text-align: center;">
<div style="color: #58a6ff; font-weight: 600;">App Instance 1</div>
</div>
<div style="background: #21262d; border: 2px solid #58a6ff; border-radius: 8px; padding: 16px 24px; text-align: center;">
<div style="color: #58a6ff; font-weight: 600;">App Instance 2</div>
</div>
<div style="background: #21262d; border: 2px solid #58a6ff; border-radius: 8px; padding: 16px 24px; text-align: center;">
<div style="color: #58a6ff; font-weight: 600;">App Instance 3</div>
</div>
</div>

<div style="text-align: center; color: #58a6ff; font-size: 24px; margin: 12px 0;">↓</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 2px solid #f0883e; border-radius: 12px; padding: 20px;">
<div style="color: #f0883e; font-weight: 600; text-align: center; margin-bottom: 16px;">DATA LAYER</div>
<div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
<div style="background: #21262d; border-radius: 8px; padding: 16px 20px; text-align: center; min-width: 120px;">
<div style="font-size: 20px;">🐘</div>
<div style="color: #7ee787; font-weight: 600; font-size: 13px;">PostgreSQL</div>
<div style="color: #8b949e; font-size: 11px;">Primary + Replica</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px 20px; text-align: center; min-width: 120px;">
<div style="font-size: 20px;">🔴</div>
<div style="color: #f85149; font-weight: 600; font-size: 13px;">Redis</div>
<div style="color: #8b949e; font-size: 11px;">Cluster</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px 20px; text-align: center; min-width: 120px;">
<div style="font-size: 20px;">📨</div>
<div style="color: #a371f7; font-weight: 600; font-size: 13px;">Kafka</div>
<div style="color: #8b949e; font-size: 11px;">Cluster</div>
</div>
</div>
</div>

</div>

#### Improvements from Phase 1
- **Horizontal scaling**: Multiple app instances behind load balancer
- **Database replication**: Read replicas for analytics
- **Redis cluster**: For high-availability caching
- **Message queue**: Kafka for async order processing
- **Connection pooling**: PgBouncer for DB connections

### Microservices Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">

<!-- API Gateway -->
<div style="display: flex; justify-content: center; margin-bottom: 20px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 16px 32px; text-align: center;">
<div style="color: white; font-weight: 600;">API Gateway</div>
<div style="color: rgba(255,255,255,0.7); font-size: 12px;">(Kong/AWS APIGW)</div>
</div>
</div>

<div style="text-align: center; color: #7ee787; font-size: 24px; margin: 12px 0;">↓</div>

<!-- Top Services Row -->
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 12px;">
<div style="background: rgba(240, 136, 62, 0.1); border: 2px solid #f0883e; border-radius: 10px; padding: 16px;">
<div style="color: #f0883e; font-weight: 600; text-align: center; margin-bottom: 8px;">Order Service</div>
<ul style="color: #8b949e; font-size: 12px; margin: 0; padding-left: 16px;">
<li>Placement</li>
<li>Validation</li>
<li>History</li>
</ul>
<div style="background: #21262d; border-radius: 6px; padding: 8px; text-align: center; margin-top: 12px;">
<div style="color: #7ee787; font-size: 11px;">PostgreSQL</div>
</div>
</div>
<div style="background: rgba(88, 166, 255, 0.1); border: 2px solid #58a6ff; border-radius: 10px; padding: 16px;">
<div style="color: #58a6ff; font-weight: 600; text-align: center; margin-bottom: 8px;">Market Data Service</div>
<ul style="color: #8b949e; font-size: 12px; margin: 0; padding-left: 16px;">
<li>Price Feed</li>
<li>Streaming</li>
</ul>
<div style="background: #21262d; border-radius: 6px; padding: 8px; text-align: center; margin-top: 12px;">
<div style="color: #58a6ff; font-size: 11px;">TimescaleDB</div>
</div>
</div>
<div style="background: rgba(137, 87, 229, 0.1); border: 2px solid #a371f7; border-radius: 10px; padding: 16px;">
<div style="color: #a371f7; font-weight: 600; text-align: center; margin-bottom: 8px;">Portfolio Service</div>
<ul style="color: #8b949e; font-size: 12px; margin: 0; padding-left: 16px;">
<li>Holdings</li>
<li>P&L Calc</li>
</ul>
<div style="background: #21262d; border-radius: 6px; padding: 8px; text-align: center; margin-top: 12px;">
<div style="color: #7ee787; font-size: 11px;">PostgreSQL</div>
</div>
</div>
</div>

<div style="text-align: center; color: #58a6ff; font-size: 24px; margin: 12px 0;">↓</div>

<!-- Kafka Event Bus -->
<div style="display: flex; justify-content: center; margin: 16px 0;">
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 10px; padding: 16px 48px; text-align: center;">
<div style="color: white; font-weight: 600;">Kafka Event Bus</div>
</div>
</div>

<div style="text-align: center; color: #a371f7; font-size: 24px; margin: 12px 0;">↓</div>

<!-- Bottom Services Row -->
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 16px;">
<div style="background: rgba(248, 81, 73, 0.1); border: 2px solid #f85149; border-radius: 10px; padding: 16px;">
<div style="color: #f85149; font-weight: 600; text-align: center; margin-bottom: 8px;">Matching Engine</div>
<ul style="color: #8b949e; font-size: 12px; margin: 0; padding-left: 16px;">
<li>Order Book</li>
<li>Trade Exec</li>
</ul>
<div style="background: #21262d; border-radius: 6px; padding: 8px; text-align: center; margin-top: 12px;">
<div style="color: #f85149; font-size: 11px;">Redis Cluster</div>
</div>
</div>
<div style="background: rgba(126, 231, 135, 0.1); border: 2px solid #7ee787; border-radius: 10px; padding: 16px;">
<div style="color: #7ee787; font-weight: 600; text-align: center; margin-bottom: 8px;">Risk Service</div>
<ul style="color: #8b949e; font-size: 12px; margin: 0; padding-left: 16px;">
<li>Margins</li>
<li>Limits</li>
</ul>
</div>
<div style="background: rgba(88, 166, 255, 0.1); border: 2px solid #58a6ff; border-radius: 10px; padding: 16px;">
<div style="color: #58a6ff; font-weight: 600; text-align: center; margin-bottom: 8px;">Notification Service</div>
<ul style="color: #8b949e; font-size: 12px; margin: 0; padding-left: 16px;">
<li>Email/SMS</li>
<li>Push Alerts</li>
</ul>
</div>
</div>

<!-- Settlement Service -->
<div style="display: flex; justify-content: center;">
<div style="background: rgba(240, 136, 62, 0.1); border: 2px solid #f0883e; border-radius: 10px; padding: 16px 32px; text-align: center;">
<div style="color: #f0883e; font-weight: 600;">Settlement Service</div>
</div>
</div>

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

<div style="border: 2px solid #58a6ff; border-radius: 16px; padding: 24px;">
<div style="color: #58a6ff; font-weight: 700; text-align: center; font-size: 18px; margin-bottom: 24px;">GLOBAL INFRASTRUCTURE</div>

<!-- Edge Layer -->
<div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 20px; flex-wrap: wrap;">
<div style="background: #21262d; border: 2px solid #7ee787; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #7ee787; font-weight: 600; font-size: 13px;">Route53</div>
<div style="color: #8b949e; font-size: 11px;">(DNS)</div>
</div>
<div style="color: #58a6ff; font-size: 20px; display: flex; align-items: center;">→</div>
<div style="background: #21262d; border: 2px solid #f0883e; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #f0883e; font-weight: 600; font-size: 13px;">CloudFront</div>
<div style="color: #8b949e; font-size: 11px;">(CDN)</div>
</div>
<div style="color: #58a6ff; font-size: 20px; display: flex; align-items: center;">→</div>
<div style="background: #21262d; border: 2px solid #f85149; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="color: #f85149; font-weight: 600; font-size: 13px;">WAF</div>
<div style="color: #8b949e; font-size: 11px;">(Security)</div>
</div>
</div>

<div style="text-align: center; color: #58a6ff; font-size: 24px; margin: 16px 0;">↓</div>

<!-- Region US-EAST-1 -->
<div style="background: rgba(88, 166, 255, 0.05); border: 2px solid #1f6feb; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
<div style="color: #58a6ff; font-weight: 600; text-align: center; margin-bottom: 16px;">REGION: US-EAST-1</div>

<!-- API Gateway Cluster -->
<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
<div style="color: #7ee787; font-weight: 600; text-align: center; margin-bottom: 12px;">API GATEWAY CLUSTER</div>
<div style="display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
<div style="background: #238636; padding: 8px 12px; border-radius: 6px; color: white; font-size: 11px;">APIGW</div>
<div style="background: #238636; padding: 8px 12px; border-radius: 6px; color: white; font-size: 11px;">APIGW</div>
<div style="background: #238636; padding: 8px 12px; border-radius: 6px; color: white; font-size: 11px;">APIGW</div>
<div style="background: #238636; padding: 8px 12px; border-radius: 6px; color: white; font-size: 11px;">APIGW</div>
<div style="background: #238636; padding: 8px 12px; border-radius: 6px; color: white; font-size: 11px;">APIGW</div>
</div>
</div>

<div style="text-align: center; color: #58a6ff; font-size: 20px; margin: 12px 0;">↓</div>

<!-- Kubernetes Cluster -->
<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
<div style="color: #a371f7; font-weight: 600; text-align: center; margin-bottom: 16px;">KUBERNETES CLUSTER (EKS)</div>

<!-- Trading Services Namespace -->
<div style="background: rgba(240, 136, 62, 0.1); border: 1px dashed #f0883e; border-radius: 6px; padding: 12px; margin-bottom: 12px;">
<div style="color: #f0883e; font-size: 12px; text-align: center; margin-bottom: 10px;">TRADING SERVICES NAMESPACE</div>
<div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #21262d; padding: 10px 16px; border-radius: 6px; text-align: center;">
<div style="color: #58a6ff; font-size: 12px; font-weight: 600;">Order</div>
<div style="color: #8b949e; font-size: 10px;">(x20)</div>
</div>
<div style="background: #21262d; padding: 10px 16px; border-radius: 6px; text-align: center;">
<div style="color: #f85149; font-size: 12px; font-weight: 600;">Matching Engine</div>
<div style="color: #8b949e; font-size: 10px;">(x5)</div>
</div>
<div style="background: #21262d; padding: 10px 16px; border-radius: 6px; text-align: center;">
<div style="color: #7ee787; font-size: 12px; font-weight: 600;">Market Data</div>
<div style="color: #8b949e; font-size: 10px;">(x10)</div>
</div>
</div>
</div>

<!-- Support Services Namespace -->
<div style="background: rgba(88, 166, 255, 0.1); border: 1px dashed #58a6ff; border-radius: 6px; padding: 12px;">
<div style="color: #58a6ff; font-size: 12px; text-align: center; margin-bottom: 10px;">SUPPORT SERVICES NAMESPACE</div>
<div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #21262d; padding: 10px 16px; border-radius: 6px; text-align: center;">
<div style="color: #f85149; font-size: 12px; font-weight: 600;">Risk</div>
<div style="color: #8b949e; font-size: 10px;">(x10)</div>
</div>
<div style="background: #21262d; padding: 10px 16px; border-radius: 6px; text-align: center;">
<div style="color: #a371f7; font-size: 12px; font-weight: 600;">Portfolio</div>
<div style="color: #8b949e; font-size: 10px;">(x15)</div>
</div>
<div style="background: #21262d; padding: 10px 16px; border-radius: 6px; text-align: center;">
<div style="color: #f0883e; font-size: 12px; font-weight: 600;">Settlement</div>
<div style="color: #8b949e; font-size: 10px;">(x5)</div>
</div>
</div>
</div>
</div>

<div style="text-align: center; color: #58a6ff; font-size: 20px; margin: 12px 0;">↓</div>

<!-- Data Layer -->
<div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #21262d; border: 2px solid #7ee787; border-radius: 8px; padding: 12px 16px; text-align: center;">
<div style="font-size: 18px;">🐘</div>
<div style="color: #7ee787; font-weight: 600; font-size: 12px;">Aurora</div>
<div style="color: #8b949e; font-size: 10px;">(Global)</div>
</div>
<div style="background: #21262d; border: 2px solid #f85149; border-radius: 8px; padding: 12px 16px; text-align: center;">
<div style="font-size: 18px;">🔴</div>
<div style="color: #f85149; font-weight: 600; font-size: 12px;">Redis</div>
<div style="color: #8b949e; font-size: 10px;">(128 nodes)</div>
</div>
<div style="background: #21262d; border: 2px solid #a371f7; border-radius: 8px; padding: 12px 16px; text-align: center;">
<div style="font-size: 18px;">📨</div>
<div style="color: #a371f7; font-weight: 600; font-size: 12px;">Kafka</div>
<div style="color: #8b949e; font-size: 10px;">(100 nodes)</div>
</div>
</div>

</div>

<!-- DR Region -->
<div style="background: rgba(137, 87, 229, 0.05); border: 1px dashed #a371f7; border-radius: 12px; padding: 16px; text-align: center;">
<div style="color: #a371f7; font-weight: 600; margin-bottom: 4px;">REGION: EU-WEST-1 (DR)</div>
<div style="color: #8b949e; font-size: 12px;">[Similar architecture - Active/Passive]</div>
</div>

</div>

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

<div style="max-width: 500px; margin: 0 auto;">
<div style="background: #21262d; border-radius: 12px; overflow: hidden; border: 2px solid #58a6ff;">

<!-- Header -->
<div style="background: #58a6ff; color: #0d1117; padding: 12px; text-align: center; font-weight: 700;">
AAPL Order Book
</div>

<!-- Bids Section -->
<div style="padding: 16px;">
<div style="color: #7ee787; font-weight: 600; text-align: center; margin-bottom: 12px;">BIDS (Buy Orders)</div>
<table style="width: 100%; border-collapse: collapse; font-size: 13px;">
<thead>
<tr style="border-bottom: 1px solid #30363d;">
<th style="padding: 8px; text-align: left; color: #8b949e;">Price</th>
<th style="padding: 8px; text-align: center; color: #8b949e;">Quantity</th>
<th style="padding: 8px; text-align: right; color: #8b949e;">Orders</th>
</tr>
</thead>
<tbody>
<tr style="background: rgba(126, 231, 135, 0.15);">
<td style="padding: 8px; color: #7ee787; font-weight: 600;">$182.50</td>
<td style="padding: 8px; text-align: center; color: #c9d1d9;">15,000</td>
<td style="padding: 8px; text-align: right; color: #8b949e;">[O1,O2,O3] <span style="color: #7ee787; font-size: 11px;">Best Bid</span></td>
</tr>
<tr>
<td style="padding: 8px; color: #7ee787;">$182.45</td>
<td style="padding: 8px; text-align: center; color: #c9d1d9;">8,000</td>
<td style="padding: 8px; text-align: right; color: #8b949e;">[O4,O5]</td>
</tr>
<tr>
<td style="padding: 8px; color: #7ee787;">$182.40</td>
<td style="padding: 8px; text-align: center; color: #c9d1d9;">25,000</td>
<td style="padding: 8px; text-align: right; color: #8b949e;">[O6,O7,O8]</td>
</tr>
<tr>
<td style="padding: 8px; color: #7ee787;">$182.35</td>
<td style="padding: 8px; text-align: center; color: #c9d1d9;">12,000</td>
<td style="padding: 8px; text-align: right; color: #8b949e;">[O9]</td>
</tr>
</tbody>
</table>
</div>

<!-- Spread -->
<div style="background: linear-gradient(90deg, #238636 0%, #1f6feb 50%, #f85149 100%); padding: 12px; text-align: center;">
<span style="color: white; font-weight: 700;">SPREAD: $0.05</span>
</div>

<!-- Asks Section -->
<div style="padding: 16px;">
<div style="color: #f85149; font-weight: 600; text-align: center; margin-bottom: 12px;">ASKS (Sell Orders)</div>
<table style="width: 100%; border-collapse: collapse; font-size: 13px;">
<thead>
<tr style="border-bottom: 1px solid #30363d;">
<th style="padding: 8px; text-align: left; color: #8b949e;">Price</th>
<th style="padding: 8px; text-align: center; color: #8b949e;">Quantity</th>
<th style="padding: 8px; text-align: right; color: #8b949e;">Orders</th>
</tr>
</thead>
<tbody>
<tr style="background: rgba(248, 81, 73, 0.15);">
<td style="padding: 8px; color: #f85149; font-weight: 600;">$182.55</td>
<td style="padding: 8px; text-align: center; color: #c9d1d9;">10,000</td>
<td style="padding: 8px; text-align: right; color: #8b949e;">[O10,O11] <span style="color: #f85149; font-size: 11px;">Best Ask</span></td>
</tr>
<tr>
<td style="padding: 8px; color: #f85149;">$182.60</td>
<td style="padding: 8px; text-align: center; color: #c9d1d9;">20,000</td>
<td style="padding: 8px; text-align: right; color: #8b949e;">[O12,O13]</td>
</tr>
<tr>
<td style="padding: 8px; color: #f85149;">$182.65</td>
<td style="padding: 8px; text-align: center; color: #c9d1d9;">5,000</td>
<td style="padding: 8px; text-align: right; color: #8b949e;">[O14]</td>
</tr>
<tr>
<td style="padding: 8px; color: #f85149;">$182.70</td>
<td style="padding: 8px; text-align: center; color: #c9d1d9;">18,000</td>
<td style="padding: 8px; text-align: right; color: #8b949e;">[O15,O16]</td>
</tr>
</tbody>
</table>
</div>

</div>
</div>

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

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

<div style="color: #f85149; font-weight: 600; text-align: center; margin-bottom: 20px; font-size: 16px;">PARTITION SCENARIO</div>

<div style="display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap; margin-bottom: 24px;">

<!-- Region A -->
<div style="background: rgba(126, 231, 135, 0.1); border: 2px solid #7ee787; border-radius: 12px; padding: 20px; min-width: 180px;">
<div style="color: #7ee787; font-weight: 600; text-align: center; margin-bottom: 12px;">Region A</div>
<div style="background: #21262d; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #58a6ff; font-weight: 600; font-size: 13px;">Matching Engine</div>
</div>
<div style="color: #7ee787; text-align: center; margin-top: 12px; font-weight: 600;">ACTIVE</div>
</div>

<!-- Partition Indicator -->
<div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
<div style="color: #f85149; font-size: 24px; font-weight: bold;">X</div>
<div style="color: #f85149; font-size: 24px; font-weight: bold;">X</div>
<div style="color: #f85149; font-weight: 600; font-size: 12px;">SPLIT</div>
<div style="color: #f85149; font-size: 24px; font-weight: bold;">X</div>
<div style="color: #f85149; font-size: 24px; font-weight: bold;">X</div>
</div>

<!-- Region B -->
<div style="background: rgba(248, 81, 73, 0.1); border: 2px solid #f85149; border-radius: 12px; padding: 20px; min-width: 180px;">
<div style="color: #f85149; font-weight: 600; text-align: center; margin-bottom: 12px;">Region B</div>
<div style="background: #21262d; border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #8b949e; font-weight: 600; font-size: 13px;">Matching Engine</div>
</div>
<div style="color: #f85149; text-align: center; margin-top: 12px; font-weight: 600;">STANDBY</div>
</div>

</div>

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 8px; padding: 16px;">
<div style="color: #a371f7; font-weight: 600; margin-bottom: 8px;">STRATEGY: Prefer Consistency over Availability</div>
<ul style="color: #8b949e; margin: 0; padding-left: 20px; font-size: 13px;">
<li>Only primary region accepts trades</li>
<li>Standby becomes read-only</li>
<li>Manual failover after partition heals</li>
</ul>
</div>

</div>

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

<div style="color: #f0883e; font-weight: 600; margin-bottom: 16px;">Rate Limits:</div>

<div style="display: grid; gap: 8px; margin-bottom: 20px;">
<div style="display: flex; justify-content: space-between; background: #21262d; padding: 12px 16px; border-radius: 8px;">
<span style="color: #c9d1d9; font-weight: 500;">Order Placement</span>
<span style="color: #7ee787; font-weight: 600;">100 orders/second/user</span>
</div>
<div style="display: flex; justify-content: space-between; background: #21262d; padding: 12px 16px; border-radius: 8px;">
<span style="color: #c9d1d9; font-weight: 500;">Market Data</span>
<span style="color: #58a6ff; font-weight: 600;">1000 requests/min/user</span>
</div>
<div style="display: flex; justify-content: space-between; background: #21262d; padding: 12px 16px; border-radius: 8px;">
<span style="color: #c9d1d9; font-weight: 500;">API Calls</span>
<span style="color: #a371f7; font-weight: 600;">10000 requests/min/user</span>
</div>
</div>

<div style="background: #21262d; border-radius: 8px; padding: 16px;">
<div style="color: #f0883e; font-weight: 600; margin-bottom: 8px;">Implementation: Token Bucket Algorithm (Redis)</div>
<ul style="color: #8b949e; margin: 0; padding-left: 20px; font-size: 13px;">
<li>Distributed rate limiting across all API gateways</li>
<li>Sliding window for smooth rate limiting</li>
</ul>
</div>

</div>

### 5. Circuit Breaker Pattern

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

<div style="color: #58a6ff; font-weight: 600; text-align: center; margin-bottom: 24px; font-size: 16px;">CIRCUIT BREAKER STATES</div>

<div style="display: flex; justify-content: center; align-items: center; gap: 16px; flex-wrap: wrap; margin-bottom: 24px;">

<!-- CLOSED State -->
<div style="background: rgba(126, 231, 135, 0.1); border: 2px solid #7ee787; border-radius: 12px; padding: 20px; text-align: center; min-width: 120px;">
<div style="color: #7ee787; font-weight: 700; font-size: 16px;">CLOSED</div>
<div style="color: #8b949e; font-size: 12px; margin-top: 4px;">Normal Flow</div>
</div>

<!-- Arrow to OPEN -->
<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #f85149; font-size: 11px; margin-bottom: 4px;">failures > threshold</div>
<div style="color: #f85149; font-size: 24px;">→</div>
</div>

<!-- OPEN State -->
<div style="background: rgba(248, 81, 73, 0.1); border: 2px solid #f85149; border-radius: 12px; padding: 20px; text-align: center; min-width: 120px;">
<div style="color: #f85149; font-weight: 700; font-size: 16px;">OPEN</div>
<div style="color: #8b949e; font-size: 12px; margin-top: 4px;">Reject All</div>
</div>

</div>

<!-- Bottom row with HALF-OPEN -->
<div style="display: flex; justify-content: center; align-items: center; gap: 40px; margin-bottom: 24px;">

<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #7ee787; font-size: 24px;">↑</div>
<div style="color: #7ee787; font-size: 11px;">success</div>
</div>

<!-- HALF-OPEN State -->
<div style="background: rgba(240, 136, 62, 0.1); border: 2px solid #f0883e; border-radius: 12px; padding: 20px; text-align: center; min-width: 140px;">
<div style="color: #f0883e; font-weight: 700; font-size: 16px;">HALF-OPEN</div>
<div style="color: #8b949e; font-size: 12px; margin-top: 4px;">Test Request</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #f0883e; font-size: 11px;">timeout</div>
<div style="color: #f0883e; font-size: 24px;">↑</div>
</div>

</div>

<!-- Applied to section -->
<div style="background: #21262d; border-radius: 8px; padding: 16px;">
<div style="color: #a371f7; font-weight: 600; margin-bottom: 8px;">Applied to:</div>
<div style="display: flex; gap: 12px; flex-wrap: wrap;">
<span style="background: rgba(137, 87, 229, 0.2); color: #a371f7; padding: 6px 12px; border-radius: 6px; font-size: 12px;">Exchange connectivity</span>
<span style="background: rgba(137, 87, 229, 0.2); color: #a371f7; padding: 6px 12px; border-radius: 6px; font-size: 12px;">Payment gateway</span>
<span style="background: rgba(137, 87, 229, 0.2); color: #a371f7; padding: 6px 12px; border-radius: 6px; font-size: 12px;">External market data feeds</span>
</div>
</div>

</div>

</div>

---

## Interview Deep Dive Questions

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 32px; margin: 20px 0; border-left: 4px solid #f85149;">

### Questions Interviewers Will Ask (Be Prepared!)

<div style="display: grid; grid-template-columns: 1fr; gap: 16px; margin: 20px 0;">

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 20px;">
<h4 style="color: #f85149; margin: 0 0 12px 0;">🔥 "Why Kafka and not Redis Pub/Sub for order events?"</h4>
<div style="color: #c9d1d9; font-size: 14px;">
<p><strong>What they're probing:</strong> Do you understand the difference between message queues and pub/sub? Durability vs speed trade-offs?</p>

<div style="background: #21262d; border-radius: 8px; padding: 16px; margin: 16px 0;">
<p style="color: #58a6ff; font-weight: 600; margin: 0 0 12px 0;">Real Scenario - What Actually Happens:</p>
<p style="color: #8b949e; margin: 0 0 8px 0;"><strong>10:30:00 AM:</strong> User Alice places a buy order for 100 shares of AAPL at $182.50</p>
<p style="color: #8b949e; margin: 0 0 8px 0;"><strong>10:30:01 AM:</strong> Order Service publishes "OrderPlaced" event</p>
<p style="color: #8b949e; margin: 0 0 8px 0;"><strong>10:30:02 AM:</strong> Matching Engine crashes due to memory spike</p>
<p style="color: #f85149; margin: 0 0 8px 0;"><strong>With Redis Pub/Sub:</strong> Message is GONE. Alice's order vanishes. She calls support angry: "I placed an order but nothing happened!" You have no way to recover it.</p>
<p style="color: #7ee787; margin: 0;"><strong>With Kafka:</strong> Message sits in partition. Matching Engine restarts at 10:30:15 AM, reads from last committed offset, processes Alice's order. Alice gets her trade. She never knew anything went wrong.</p>
</div>

<p><strong>Step-by-Step Why Kafka Wins for Orders:</strong></p>
<ol style="color: #8b949e; margin: 8px 0; padding-left: 20px;">
<li><strong>Durability:</strong> Messages written to disk with configurable replication (typically 3 copies). Even if 2 brokers die, data survives.</li>
<li><strong>Ordering:</strong> Orders for the same stock go to same partition = guaranteed FIFO. Critical because Order A at $182.50 must be matched before Order B at $182.55.</li>
<li><strong>Replay:</strong> New consumer can read from offset 0. Useful for: rebuilding order book after crash, auditing, debugging production issues.</li>
<li><strong>Backpressure:</strong> If Matching Engine is slow, messages queue up safely. Redis would start dropping subscribers or OOMing.</li>
</ol>

<div style="background: rgba(248, 81, 73, 0.1); border-radius: 8px; padding: 12px; margin: 16px 0;">
<p style="color: #f85149; margin: 0;"><strong>Concrete Numbers:</strong> Under 50K msg/sec load, Redis Pub/Sub loses ~0.1-0.3% of messages when subscribers lag. That's 50-150 lost orders per day at scale. Unacceptable for a brokerage.</p>
</div>

<p style="color: #7ee787;"><strong>When Redis Pub/Sub IS enough:</strong> Real-time price ticker updates to 10,000 connected WebSocket clients. If you miss AAPL's price at 10:30:00.100, the next tick at 10:30:00.200 is already more current anyway. No one files a complaint because they saw $182.50 instead of $182.51 for 100ms.</p>

<p style="color: #f0883e; margin-top: 12px;"><strong>Analogy:</strong> Redis Pub/Sub is like shouting in a room - whoever is listening hears you, everyone else misses it. Kafka is like a recorded voicemail - message is saved until you explicitly confirm you received it.</p>
</div>
</div>

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 20px;">
<h4 style="color: #58a6ff; margin: 0 0 12px 0;">🔥 "Why not just use a single PostgreSQL database? Why Redis for order books?"</h4>
<div style="color: #c9d1d9; font-size: 14px;">
<p><strong>What they're probing:</strong> Do you understand data access patterns and latency requirements?</p>

<div style="background: #21262d; border-radius: 8px; padding: 16px; margin: 16px 0;">
<p style="color: #58a6ff; font-weight: 600; margin: 0 0 12px 0;">Real Scenario - Order Book Operations Per Second:</p>
<p style="color: #8b949e; margin: 0 0 8px 0;">For AAPL alone during market hours:</p>
<ul style="color: #8b949e; margin: 0; padding-left: 20px;">
<li>~500 new orders/second arriving</li>
<li>~300 cancellations/second</li>
<li>~200 matches/second (removing orders from both sides)</li>
<li>~10,000 reads/second (market data subscribers checking best bid/ask)</li>
</ul>
<p style="color: #f0883e; margin: 12px 0 0 0;"><strong>Total: ~11,000 operations/second on ONE stock's order book.</strong> Now multiply by 8,000 tradeable symbols.</p>
</div>

<p><strong>Step-by-Step Why Redis Wins Here:</strong></p>
<ol style="color: #8b949e; margin: 8px 0; padding-left: 20px;">
<li><strong>Latency Math:</strong> PostgreSQL SELECT with index = 0.5-5ms. Redis ZRANGEBYSCORE = 0.1-0.3ms. When matching engine processes 10,000 orders/second, saving 2ms per operation = 20 seconds of cumulative delay per second. You'd fall behind instantly.</li>
<li><strong>Data Structure Fit:</strong> Order book IS a sorted set. Bids sorted DESC by price, then ASC by time. Redis ZADD with composite score (price * 1e9 + timestamp) gives exactly this behavior in O(log n).</li>
<li><strong>Memory vs Disk:</strong> Order book is 100% hot data. Every single entry is accessed constantly. PostgreSQL would cache it in shared_buffers, but you're still paying for query parsing, planning, and lock acquisition on every operation.</li>
<li><strong>Atomic Operations:</strong> Redis MULTI/EXEC lets you atomically remove from asks, add to executed trades, update buyer balance, update seller balance - all in one round trip.</li>
</ol>

<div style="background: rgba(126, 231, 135, 0.1); border-radius: 8px; padding: 12px; margin: 16px 0;">
<p style="color: #7ee787; margin: 0 0 8px 0;"><strong>But PostgreSQL is STILL the source of truth!</strong></p>
<p style="color: #8b949e; margin: 0;">Every order is written to PostgreSQL FIRST (for durability and audit). Redis order book is derived state - if Redis dies, we replay orders from PostgreSQL and rebuild it in seconds.</p>
</div>

<p style="color: #7ee787;"><strong>When PostgreSQL alone IS enough:</strong></p>
<ul style="color: #8b949e; margin: 8px 0; padding-left: 20px;">
<li>< 1,000 orders/day (that's ~0.02 orders/second during market hours)</li>
<li>Latency tolerance > 100ms (users won't notice 50ms vs 150ms)</li>
<li>Budget < $500/month (Redis adds infrastructure cost)</li>
<li>Team has no Redis expertise (operational simplicity matters!)</li>
</ul>

<p style="color: #f0883e; margin-top: 12px;"><strong>Analogy:</strong> PostgreSQL is like a filing cabinet - organized, durable, handles everything. Redis is like your desk - only the papers you're actively working on. For high-frequency tasks, you work from your desk and periodically file things away.</p>
</div>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 20px;">
<h4 style="color: #7ee787; margin: 0 0 12px 0;">🔥 "What happens if your matching engine crashes mid-trade?"</h4>
<div style="color: #c9d1d9; font-size: 14px;">
<p><strong>What they're probing:</strong> Fault tolerance, exactly-once processing, state recovery.</p>

<div style="background: #21262d; border-radius: 8px; padding: 16px; margin: 16px 0;">
<p style="color: #7ee787; font-weight: 600; margin: 0 0 12px 0;">Real Scenario - The Worst Case:</p>
<p style="color: #8b949e; margin: 0 0 8px 0;"><strong>10:30:00.000:</strong> Buy order from Alice (100 AAPL @ $182.50) matches with Sell order from Bob (100 AAPL @ $182.50)</p>
<p style="color: #8b949e; margin: 0 0 8px 0;"><strong>10:30:00.001:</strong> Matching engine removes both orders from order book</p>
<p style="color: #8b949e; margin: 0 0 8px 0;"><strong>10:30:00.002:</strong> Matching engine debits Alice's balance: $18,250</p>
<p style="color: #f85149; margin: 0 0 8px 0;"><strong>10:30:00.003:</strong> CRASH! Server dies before crediting Bob's balance or recording the trade.</p>
<p style="color: #f0883e; margin: 0;"><strong>Nightmare scenario:</strong> Alice lost money, Bob didn't get paid, no trade record exists. Who owns the shares?</p>
</div>

<p><strong>Step-by-Step How We Prevent This:</strong></p>
<ol style="color: #8b949e; margin: 8px 0; padding-left: 20px;">
<li><strong>Event Sourcing Architecture:</strong>
<ul style="margin-top: 4px;">
<li>Original orders live in Kafka: OrderPlaced(Alice, BUY, 100, $182.50) and OrderPlaced(Bob, SELL, 100, $182.50)</li>
<li>Matching engine reads these events, but does NOT commit offset until trade is fully persisted</li>
<li>If crash happens, Kafka offset is still at "before Alice's order" - engine replays both orders on restart</li>
</ul>
</li>
<li><strong>Atomic Trade Execution:</strong>
<ul style="margin-top: 4px;">
<li>Trade is ONE database transaction: debit Alice, credit Bob, create trade record, update both positions</li>
<li>PostgreSQL COMMIT or ROLLBACK - no partial states possible</li>
<li>Only AFTER commit do we acknowledge Kafka offset</li>
</ul>
</li>
<li><strong>Checkpointing (for faster recovery):</strong>
<ul style="margin-top: 4px;">
<li>Every 60 seconds: snapshot entire order book state to disk with Kafka offset</li>
<li>On restart: load snapshot, then replay only events from that offset forward</li>
<li>Without checkpointing: restart after 8 hours = replay 8 hours of events (could take 10+ minutes)</li>
<li>With checkpointing: restart = load snapshot + replay ~60 seconds of events (~5 seconds)</li>
</ul>
</li>
<li><strong>Idempotency Keys:</strong>
<ul style="margin-top: 4px;">
<li>Each order has UUID: order_id = "abc-123-def"</li>
<li>If we replay and try to process "abc-123-def" again, we check: "Does trade for this order_id exist?"</li>
<li>If yes, skip. If no, process. Replay is safe.</li>
</ul>
</li>
</ol>

<div style="background: rgba(240, 136, 62, 0.1); border-radius: 8px; padding: 12px; margin: 16px 0;">
<p style="color: #f0883e; margin: 0;"><strong>Key Insight:</strong> We use "at-least-once delivery + idempotent processing = exactly-once semantics". The message might be delivered twice, but the second processing is a no-op because we already recorded that order_id.</p>
</div>

<p style="color: #7ee787;"><strong>Recovery Timeline:</strong></p>
<ul style="color: #8b949e; margin: 8px 0; padding-left: 20px;">
<li><strong>10:30:00.003:</strong> Crash</li>
<li><strong>10:30:05:</strong> Health check fails, Kubernetes restarts pod</li>
<li><strong>10:30:15:</strong> New instance loads checkpoint from 10:29:00</li>
<li><strong>10:30:20:</strong> Replayed 75 seconds of events (including Alice and Bob's orders)</li>
<li><strong>10:30:20:</strong> Trade executes successfully this time, both balances updated</li>
<li><strong>Total downtime:</strong> ~20 seconds. Zero data loss.</li>
</ul>

<p style="color: #f0883e; margin-top: 12px;"><strong>Analogy:</strong> It's like a video game with autosave. Crash during a boss fight? You restart from the last checkpoint and replay your actions. You might fight the boss twice, but you only get the reward once (idempotency).</p>
</div>
</div>

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 20px;">
<h4 style="color: #a371f7; margin: 0 0 12px 0;">🔥 "Why LMAX Disruptor pattern for matching engine? Why not just threads?"</h4>
<div style="color: #c9d1d9; font-size: 14px;">
<p><strong>What they're probing:</strong> Deep performance understanding, lock-free data structures, mechanical sympathy.</p>

<div style="background: #21262d; border-radius: 8px; padding: 16px; margin: 16px 0;">
<p style="color: #a371f7; font-weight: 600; margin: 0 0 12px 0;">The Hidden Costs of Traditional Threading:</p>
<p style="color: #8b949e; margin: 0 0 8px 0;">Imagine a naive multi-threaded matching engine:</p>
<ul style="color: #8b949e; margin: 0; padding-left: 20px;">
<li>Thread 1: Processes BUY orders for AAPL</li>
<li>Thread 2: Processes SELL orders for AAPL</li>
<li>Both need to access the same order book = LOCK required</li>
</ul>
<p style="color: #f85149; margin: 12px 0 0 0;"><strong>What happens at 100K orders/second:</strong></p>
<ul style="color: #8b949e; margin: 0; padding-left: 20px;">
<li>Lock acquisition: ~100ns when uncontested, but 1-10us when contested</li>
<li>Context switch when blocking: ~10us per switch</li>
<li>At 100K/sec with 50% contention = 500,000us = 0.5 seconds wasted PER SECOND</li>
<li>You're now running at 50% capacity before you've even done useful work!</li>
</ul>
</div>

<p><strong>Step-by-Step Why Disruptor Wins:</strong></p>
<ol style="color: #8b949e; margin: 8px 0; padding-left: 20px;">
<li><strong>Single Writer Principle:</strong>
<ul style="margin-top: 4px;">
<li>ONE thread processes ALL orders for a given symbol - no locks needed</li>
<li>Multiple matching engines, each handles different partition of symbols</li>
<li>Symbols A-M go to Engine 1, N-Z go to Engine 2</li>
</ul>
</li>
<li><strong>Pre-allocated Ring Buffer:</strong>
<ul style="margin-top: 4px;">
<li>Memory allocated once at startup: 64KB ring with 1024 slots</li>
<li>No malloc/free during operation = no GC pauses, no memory fragmentation</li>
<li>Each slot is exactly 64 bytes = one CPU cache line = no "false sharing"</li>
</ul>
</li>
<li><strong>Mechanical Sympathy:</strong>
<ul style="margin-top: 4px;">
<li>Sequential memory access: CPU prefetcher loves this, 10x faster than random access</li>
<li>Data fits in L1 cache: 32KB cache holds 500 orders being processed</li>
<li>Branch prediction works: processing loop is predictable, CPU doesn't stall</li>
</ul>
</li>
<li><strong>Batching:</strong>
<ul style="margin-top: 4px;">
<li>Instead of: read order, process, write result, repeat</li>
<li>Disruptor: read 100 orders, process 100, write 100 results</li>
<li>Amortizes system call overhead across batch</li>
</ul>
</li>
</ol>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0;">
<div style="background: rgba(248, 81, 73, 0.1); border-radius: 8px; padding: 12px;">
<p style="color: #f85149; font-weight: 600; margin: 0 0 8px 0;">Traditional Threads</p>
<ul style="color: #8b949e; margin: 0; padding-left: 16px; font-size: 13px;">
<li>50,000 orders/sec max</li>
<li>P99 latency: 5-50ms</li>
<li>CPU: 80% waiting on locks</li>
</ul>
</div>
<div style="background: rgba(126, 231, 135, 0.1); border-radius: 8px; padding: 12px;">
<p style="color: #7ee787; font-weight: 600; margin: 0 0 8px 0;">LMAX Disruptor</p>
<ul style="color: #8b949e; margin: 0; padding-left: 16px; font-size: 13px;">
<li>6,000,000 orders/sec</li>
<li>P99 latency: < 1ms</li>
<li>CPU: 95% doing useful work</li>
</ul>
</div>
</div>

<p style="color: #7ee787;"><strong>When threads ARE fine:</strong></p>
<ul style="color: #8b949e; margin: 8px 0; padding-left: 20px;">
<li>< 10K orders/second (lock contention is negligible)</li>
<li>Latency tolerance > 10ms (users won't notice)</li>
<li>Team lacks low-level performance expertise</li>
<li>You're using Python/Ruby (GIL means you can't parallelize anyway)</li>
</ul>

<p style="color: #f0883e; margin-top: 12px;"><strong>Analogy:</strong> Traditional threading is like a restaurant where waiters keep bumping into each other in the kitchen doorway. Disruptor is like a sushi conveyor belt - everything flows in one direction, no collisions, constant throughput.</p>
</div>
</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 20px;">
<h4 style="color: #f0883e; margin: 0 0 12px 0;">🔥 "How do you handle a stock split or corporate action?"</h4>
<div style="color: #c9d1d9; font-size: 14px;">
<p><strong>What they're probing:</strong> Operational complexity, data migration, backward compatibility, edge case handling.</p>

<div style="background: #21262d; border-radius: 8px; padding: 16px; margin: 16px 0;">
<p style="color: #f0883e; font-weight: 600; margin: 0 0 12px 0;">Real Scenario - NVDA 10:1 Stock Split (June 2024):</p>
<p style="color: #8b949e; margin: 0 0 8px 0;"><strong>Before split:</strong> Alice owns 50 shares @ $1,200/share = $60,000 position</p>
<p style="color: #8b949e; margin: 0 0 8px 0;"><strong>After split:</strong> Alice owns 500 shares @ $120/share = $60,000 position (same value!)</p>
<p style="color: #f85149; margin: 0;"><strong>The complexity:</strong> Alice also has a limit order to sell 10 shares @ $1,250. What happens to it?</p>
</div>

<p><strong>Step-by-Step Corporate Action Processing:</strong></p>
<ol style="color: #8b949e; margin: 8px 0; padding-left: 20px;">
<li><strong>T-1 Day (Announcement):</strong>
<ul style="margin-top: 4px;">
<li>Corporate action received from data provider (Bloomberg, Reuters)</li>
<li>Ops team reviews and approves in admin panel</li>
<li>System schedules automated processing for ex-date</li>
</ul>
</li>
<li><strong>Ex-Date 4:00 PM - Market Close:</strong>
<ul style="margin-top: 4px;">
<li>HALT trading for NVDA (circuit breaker activated)</li>
<li>CANCEL all open orders for NVDA - notify users via email/push</li>
<li>Users see: "Your order was cancelled due to corporate action"</li>
</ul>
</li>
<li><strong>Ex-Date 4:01 PM - Position Adjustment:</strong>
<ul style="margin-top: 4px;">
<li>Batch job: UPDATE positions SET quantity = quantity * 10, avg_cost = avg_cost / 10 WHERE symbol = 'NVDA'</li>
<li>Alice: 50 shares * 10 = 500 shares, $1,200 / 10 = $120 cost basis</li>
<li>Fractional shares: If someone had 3 shares, they now have 30 (clean). But 10:3 reverse splits create fractions.</li>
</ul>
</li>
<li><strong>Ex-Date 4:02 PM - Historical Data:</strong>
<ul style="margin-top: 4px;">
<li>ALL historical prices divided by 10 (adjusted prices)</li>
<li>Charts look continuous - no cliff on split date</li>
<li>Unadjusted prices kept separately for regulatory reporting</li>
</ul>
</li>
<li><strong>Ex-Date 4:05 PM - Resume Trading:</strong>
<ul style="margin-top: 4px;">
<li>Order book starts fresh at $0</li>
<li>First trades establish new price (~$120)</li>
<li>Users can place new orders at post-split prices</li>
</ul>
</li>
</ol>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0;">
<div style="background: rgba(248, 81, 73, 0.1); border-radius: 8px; padding: 12px;">
<p style="color: #f85149; font-weight: 600; margin: 0 0 8px 0;">Trap to Avoid</p>
<p style="color: #8b949e; margin: 0; font-size: 13px;">DON'T try to "adjust" open orders (e.g., sell 10 @ $1,250 becomes sell 100 @ $125). Users set specific prices for reasons - their strategy may not scale linearly. Always cancel and let them re-enter.</p>
</div>
<div style="background: rgba(126, 231, 135, 0.1); border-radius: 8px; padding: 12px;">
<p style="color: #7ee787; font-weight: 600; margin: 0 0 8px 0;">Edge Case: Fractional Shares</p>
<p style="color: #8b949e; margin: 0; font-size: 13px;">1:3 reverse split + user has 10 shares = 3.33 shares. Options: (1) Cash out fraction at market price, (2) Round to nearest whole share, (3) Support fractional shares. Most brokers do option 1.</p>
</div>
</div>

<p style="color: #7ee787;"><strong>Other Corporate Actions to Handle:</strong></p>
<ul style="color: #8b949e; margin: 8px 0; padding-left: 20px;">
<li><strong>Dividend:</strong> Credit cash to account (easy), or DRIP = buy fractional shares</li>
<li><strong>Merger:</strong> Replace shares of Company A with shares of Company B at exchange ratio</li>
<li><strong>Spin-off:</strong> Add new position for spun-off company</li>
<li><strong>Symbol change:</strong> Update symbol everywhere, preserve history</li>
</ul>

<p style="color: #f0883e; margin-top: 12px;"><strong>Analogy:</strong> It's like a restaurant that needs to change its menu prices. You don't try to modify everyone's in-progress orders - you cancel them, update the menu, and let people re-order. Anything else leads to chaos ("But I ordered at the OLD price!").</p>
</div>
</div>

</div>
</div>

---

## Why This Technology? (Decision Justification)

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Decision Matrix: What Made Us Choose This

<div style="overflow-x: auto;">

| Component | Chosen Tech | Why THIS over alternatives | Key Trade-off Accepted | When to Reconsider |
|-----------|-------------|---------------------------|----------------------|-------------------|
| **Order DB** | Aurora PostgreSQL | ACID for money, familiar SQL, AWS integration | Higher cost than self-managed | Multi-cloud strategy needed |
| **Order Book** | Redis Sorted Sets | O(log n) ops, sub-ms latency, atomic operations | Memory-bound, no persistence | > 1B orders in book (use specialized exchange software) |
| **Event Bus** | Kafka | Durability, ordering, replay, exactly-once | Operational complexity, latency ~5ms | < 1K orders/day (use PostgreSQL LISTEN/NOTIFY) |
| **Time-series** | TimescaleDB | PostgreSQL compatible, automatic partitioning | Less performant than InfluxDB | Need sub-second granularity at massive scale |
| **Compute** | EKS | Managed K8s, auto-scaling, AWS ecosystem | Vendor lock-in | Latency-critical (use bare metal + DPDK) |

</div>

### Deep Dive: Critical Decisions

<div style="background: rgba(248, 81, 73, 0.15); border: 2px solid #f85149; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #f85149; margin: 0 0 16px 0;">💰 Why Aurora over self-managed PostgreSQL?</h4>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
<div>
<h5 style="color: #7ee787;">What We Gain:</h5>
<ul style="color: #8b949e; font-size: 13px;">
<li>5x throughput vs vanilla PostgreSQL</li>
<li>Auto-scaling storage (no disk management)</li>
<li>15 read replicas across regions</li>
<li>Automatic failover in 30 seconds</li>
<li>Point-in-time recovery</li>
</ul>
</div>
<div>
<h5 style="color: #f85149;">What We Accept:</h5>
<ul style="color: #8b949e; font-size: 13px;">
<li>~40% more expensive</li>
<li>AWS lock-in (migration pain)</li>
<li>Less control over internals</li>
<li>Serverless has cold start latency</li>
</ul>
</div>
</div>

<p style="color: #c9d1d9; margin-top: 16px;"><strong>Mitigation:</strong> Use PostgreSQL-compatible APIs everywhere. If we must migrate, CockroachDB and YugabyteDB are drop-in compatible.</p>
</div>

<div style="background: rgba(88, 166, 255, 0.15); border: 2px solid #58a6ff; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #58a6ff; margin: 0 0 16px 0;">⚡ Why Kafka over SQS/RabbitMQ?</h4>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
<div>
<h5 style="color: #7ee787;">What We Gain:</h5>
<ul style="color: #8b949e; font-size: 13px;">
<li>Order guarantee per partition (critical for matching)</li>
<li>Replay capability (audit, debugging, recovery)</li>
<li>High throughput (1M+ msgs/sec)</li>
<li>Consumer groups for scaling</li>
</ul>
</div>
<div>
<h5 style="color: #f85149;">What We Accept:</h5>
<ul style="color: #8b949e; font-size: 13px;">
<li>Operational complexity (Zookeeper until recently)</li>
<li>Not ideal for < 1K msgs/sec</li>
<li>Higher latency than in-memory queues (~5ms)</li>
<li>Steep learning curve</li>
</ul>
</div>
</div>

<p style="color: #c9d1d9; margin-top: 16px;"><strong>When SQS is fine:</strong> Notifications, email queues - anything where order doesn't matter and you don't need replay.</p>
</div>

</div>

---

## When Simpler Solutions Work

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Don't Over-Engineer: Match Complexity to Scale

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 20px 0;">

<div style="background: rgba(126, 231, 135, 0.1); border: 2px solid #7ee787; border-radius: 12px; padding: 20px;">
<h4 style="color: #7ee787; margin: 0 0 16px 0;">✅ When PostgreSQL ALONE is Enough</h4>

<div style="background: #21262d; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
<p style="color: #7ee787; font-weight: 600; margin: 0 0 8px 0;">Specific Thresholds:</p>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li><strong>< 10K orders/day</strong> (~0.2 orders/sec during market hours)</li>
<li><strong>< 100 concurrent users</strong> (100 DB connections is fine)</li>
<li><strong>Latency tolerance > 50ms</strong> (retail traders won't notice)</li>
<li><strong>Budget < $1K/month</strong> (single server suffices)</li>
<li><strong>Team size < 5</strong> (can't operate Kafka anyway)</li>
</ul>
</div>

```sql
-- PostgreSQL as message queue
LISTEN order_events;

-- Producer
NOTIFY order_events, '{"order_id": 123, "action": "placed"}';

-- Works fine for small scale!
```

<p style="color: #7ee787; margin-top: 12px;"><strong>Fun fact:</strong> Robinhood started with PostgreSQL! They added complexity only when they hit 1M+ users.</p>
</div>

<div style="background: rgba(248, 81, 73, 0.1); border: 2px solid #f85149; border-radius: 12px; padding: 20px;">
<h4 style="color: #f85149; margin: 0 0 16px 0;">❌ When You NEED the Full Stack</h4>

<div style="background: #21262d; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
<p style="color: #f85149; font-weight: 600; margin: 0 0 8px 0;">Upgrade Triggers (any ONE of these):</p>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li><strong>> 100K orders/day</strong> - LISTEN/NOTIFY starts dropping</li>
<li><strong>Sub-10ms latency required</strong> - institutional clients demand it</li>
<li><strong>Regulatory replay requirements</strong> - SEC/FINRA audit trail</li>
<li><strong>Multi-region deployment</strong> - can't LISTEN across regions</li>
<li><strong>> 500 concurrent connections</strong> - connection pooling stress</li>
</ul>
</div>

<p style="color: #f85149; font-weight: 600; margin: 0 0 8px 0;">Warning Signs You've Outgrown PostgreSQL:</p>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>VACUUM takes > 1 hour (table bloat)</li>
<li>Connection pool exhaustion during peaks</li>
<li>Replication lag > 1 second</li>
<li>SELECT on order book > 5ms P99</li>
<li>Disk I/O at 100% during market open</li>
</ul>
</div>

</div>

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 20px; margin: 20px 0;">
<h4 style="color: #a371f7; margin: 0 0 16px 0;">Decision Flowchart: What Stack Do You Need?</h4>

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
<div style="background: #21262d; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #7ee787; font-weight: 600; margin-bottom: 8px;">Phase 1</div>
<div style="color: #8b949e; font-size: 13px; margin-bottom: 8px;">< 1K users, < 10K orders/day</div>
<div style="color: #c9d1d9; font-size: 12px;">PostgreSQL + Redis<br/>$100-500/mo</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #f0883e; font-weight: 600; margin-bottom: 8px;">Phase 2</div>
<div style="color: #8b949e; font-size: 13px; margin-bottom: 8px;">10K-100K users, 100K-1M orders/day</div>
<div style="color: #c9d1d9; font-size: 12px;">+ Kafka + Read Replicas<br/>$5K-20K/mo</div>
</div>
<div style="background: #21262d; border-radius: 8px; padding: 16px; text-align: center;">
<div style="color: #f85149; font-weight: 600; margin-bottom: 8px;">Phase 3</div>
<div style="color: #8b949e; font-size: 13px; margin-bottom: 8px;">> 100K users, > 1M orders/day</div>
<div style="color: #c9d1d9; font-size: 12px;">Full microservices<br/>$50K+/mo</div>
</div>
</div>

<p style="color: #8b949e; font-size: 13px; margin: 16px 0 0 0;"><strong>Golden Rule:</strong> If you're not sure whether you need Kafka, you don't need Kafka. Add it when PostgreSQL NOTIFY starts dropping messages or you need replay for auditing.</p>
</div>

### Simpler Alternatives That Work

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 20px; margin: 20px 0;">

| Instead of... | Use This When... | Example Scenario |
|--------------|------------------|------------------|
| **Kafka** | Redis Streams | < 100K msgs/day, don't need infinite retention |
| **Kubernetes** | Docker Compose | Single server, < 10 services |
| **Redis Cluster** | Single Redis | < 100GB data, < 100K ops/sec |
| **Microservices** | Modular Monolith | < 10 engineers, single team ownership |
| **TimescaleDB** | PostgreSQL + partitioning | < 1B rows, don't need advanced time-series features |
| **Aurora** | RDS PostgreSQL | < 10K TPS, don't need global database |

</div>

### The $500/month Trading Platform

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

<div style="color: #8b949e; text-align: center; margin-bottom: 20px;">For a startup with 1,000 users:</div>

<div style="border: 2px solid #7ee787; border-radius: 12px; overflow: hidden;">

<div style="background: #7ee787; color: #0d1117; padding: 12px; text-align: center; font-weight: 700;">
SIMPLIFIED STACK
</div>

<div style="padding: 24px;">

<div style="display: flex; justify-content: center; gap: 24px; align-items: center; margin-bottom: 20px; flex-wrap: wrap;">
<div style="background: #21262d; border: 2px solid #58a6ff; border-radius: 10px; padding: 16px 24px; text-align: center;">
<div style="color: #58a6ff; font-weight: 600;">Django/FastAPI</div>
<div style="color: #8b949e; font-size: 12px;">Monolith + Celery</div>
</div>
<div style="color: #58a6ff; font-size: 24px;">→</div>
<div style="background: #21262d; border: 2px solid #7ee787; border-radius: 10px; padding: 16px 24px; text-align: center;">
<div style="font-size: 20px;">🐘</div>
<div style="color: #7ee787; font-weight: 600;">PostgreSQL</div>
<div style="color: #8b949e; font-size: 12px;">(All data)</div>
</div>
</div>

<div style="text-align: center; color: #58a6ff; font-size: 24px; margin: 12px 0;">↓</div>

<div style="display: flex; justify-content: center; margin-bottom: 20px;">
<div style="background: #21262d; border: 2px solid #f85149; border-radius: 10px; padding: 16px 24px; text-align: center;">
<div style="font-size: 20px;">🔴</div>
<div style="color: #f85149; font-weight: 600;">Redis (Single)</div>
<div style="color: #8b949e; font-size: 12px;">Sessions, cache, Celery broker</div>
</div>
</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px;">
<div style="background: rgba(126, 231, 135, 0.1); border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #7ee787; font-weight: 600;">~$100/month</div>
<div style="color: #8b949e; font-size: 12px;">on DigitalOcean</div>
</div>
<div style="background: rgba(88, 166, 255, 0.1); border-radius: 8px; padding: 12px; text-align: center;">
<div style="color: #58a6ff; font-weight: 600;">10K orders/day</div>
<div style="color: #8b949e; font-size: 12px;">with < 100ms latency</div>
</div>
</div>

</div>
</div>

<div style="text-align: center; margin-top: 20px; padding: 16px; background: rgba(248, 81, 73, 0.1); border-radius: 8px;">
<div style="color: #f85149; font-weight: 600;">No Kafka. No Kubernetes. No microservices.</div>
<div style="color: #8b949e; font-size: 13px; margin-top: 4px;">Start here, evolve when you have the problems.</div>
</div>

</div>

</div>
</div>

---

## Trade-off Analysis & Mitigation

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### Managing the Downsides

<div style="margin: 20px 0;">

<div style="background: rgba(240, 136, 62, 0.1); border-left: 4px solid #f0883e; border-radius: 0 12px 12px 0; padding: 20px; margin: 16px 0;">
<h4 style="color: #f0883e; margin: 0 0 12px 0;">CON: Kafka adds operational complexity</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div>
<h5 style="color: #f85149; margin: 0 0 8px 0;">The Problem:</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Zookeeper dependency (pre-KRaft)</li>
<li>Partition rebalancing during scaling</li>
<li>Consumer group coordination</li>
<li>Disk space management for retention</li>
</ul>
</div>
<div>
<h5 style="color: #7ee787; margin: 0 0 8px 0;">How We Manage:</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Use Amazon MSK (managed Kafka)</li>
<li>Kafka 3.x+ with KRaft (no Zookeeper)</li>
<li>Over-provision partitions upfront</li>
<li>Automated monitoring with Burrow</li>
</ul>
</div>
</div>
</div>

<div style="background: rgba(88, 166, 255, 0.1); border-left: 4px solid #58a6ff; border-radius: 0 12px 12px 0; padding: 20px; margin: 16px 0;">
<h4 style="color: #58a6ff; margin: 0 0 12px 0;">CON: Redis data can be lost (not persistent by default)</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div>
<h5 style="color: #f85149; margin: 0 0 8px 0;">The Problem:</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Redis restart = order book lost</li>
<li>AOF persistence adds latency</li>
<li>Cluster failover can lose writes</li>
</ul>
</div>
<div>
<h5 style="color: #7ee787; margin: 0 0 8px 0;">How We Manage:</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Order book is DERIVED state - rebuild from Kafka</li>
<li>Use Redis for speed, Kafka for durability</li>
<li>Async AOF with 1s fsync (acceptable trade-off)</li>
<li>Sentinel for automatic failover</li>
</ul>
</div>
</div>
</div>

<div style="background: rgba(137, 87, 229, 0.1); border-left: 4px solid #a371f7; border-radius: 0 12px 12px 0; padding: 20px; margin: 16px 0;">
<h4 style="color: #a371f7; margin: 0 0 12px 0;">CON: Microservices mean distributed transactions</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div>
<h5 style="color: #f85149; margin: 0 0 8px 0;">The Problem:</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Order placed but balance not updated?</li>
<li>Saga pattern complexity</li>
<li>Eventual consistency confusion</li>
</ul>
</div>
<div>
<h5 style="color: #7ee787; margin: 0 0 8px 0;">How We Manage:</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Keep order + balance in SAME service initially</li>
<li>Use Outbox pattern for reliable events</li>
<li>Compensating transactions for rollback</li>
<li>Accept eventual consistency where safe (portfolio display)</li>
</ul>
</div>
</div>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border-left: 4px solid #7ee787; border-radius: 0 12px 12px 0; padding: 20px; margin: 16px 0;">
<h4 style="color: #7ee787; margin: 0 0 12px 0;">CON: Strong consistency hurts availability</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div>
<h5 style="color: #f85149; margin: 0 0 8px 0;">The Problem:</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Synchronous replication = higher latency</li>
<li>Network partition = trades rejected</li>
<li>Cross-region = 100ms+ latency</li>
</ul>
</div>
<div>
<h5 style="color: #7ee787; margin: 0 0 8px 0;">How We Manage:</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Single active region for matching (consistency)</li>
<li>Async replication to DR (availability)</li>
<li>Circuit breaker: queue orders if primary down</li>
<li>Regulatory stance: "better to reject than double-trade"</li>
</ul>
</div>
</div>
</div>

</div>

### The "What If" Scenarios

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 20px; margin: 20px 0;">
<h4 style="color: #f85149; margin: 0 0 16px 0;">What if we need to support crypto trading too?</h4>

| Aspect | Stock Trading | Crypto Trading | Architecture Impact |
|--------|--------------|----------------|---------------------|
| **Hours** | 9:30 AM - 4 PM | 24/7 | Need follow-the-sun ops team |
| **Settlement** | T+1/T+2 | Instant (blockchain) | Different settlement service |
| **Volatility** | 5% daily max | 50%+ possible | Higher margin requirements |
| **Custody** | Broker holds | Hot/Cold wallets | New security architecture |

<p style="color: #c9d1d9;"><strong>Decision:</strong> Separate matching engine per asset class, shared user accounts. Don't try to force crypto into T+1 settlement.</p>
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

### Red Flags That Hurt Your Interview

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 16px; margin: 16px 0;">
<ul style="color: #f85149; margin: 0; padding-left: 20px;">
<li>❌ Proposing Kafka for 100 orders/day startup</li>
<li>❌ Ignoring regulatory requirements (audit trails)</li>
<li>❌ Using eventual consistency for balance updates</li>
<li>❌ Not mentioning idempotency for order placement</li>
<li>❌ Single point of failure in matching engine</li>
</ul>
</div>

### Statements That Impress Interviewers

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 16px; margin: 16px 0;">
<ul style="color: #7ee787; margin: 0; padding-left: 20px;">
<li>✅ "At this scale, PostgreSQL with connection pooling is sufficient"</li>
<li>✅ "We'd use the Outbox pattern to ensure order events are reliably published"</li>
<li>✅ "Order book is derived state - we can rebuild from the event log"</li>
<li>✅ "LMAX Disruptor achieves low latency by avoiding locks entirely"</li>
<li>✅ "We accept higher latency for writes to ensure strong consistency"</li>
</ul>
</div>

</div>

---

## Related Topics

- [Message Queues](/topic/system-design/message-queues)
- [Database Sharding](/topic/system-design/database-sharding)
- [Rate Limiting](/topic/system-design/rate-limiting)
- [Circuit Breaker](/topic/system-design/circuit-breaker)
