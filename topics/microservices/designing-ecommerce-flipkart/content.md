# Designing Flipkart (E-Commerce) Microservices Architecture

## Overview

This comprehensive guide walks through designing a large-scale e-commerce platform like Flipkart using microservices architecture. We'll cover service decomposition, data modeling, communication patterns, and handling scale challenges.

**Tags:** System Design, E-Commerce, Case Study, Flipkart

---

## Requirements Analysis

### Functional Requirements

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">FLIPKART FUNCTIONAL REQUIREMENTS</h4>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 16px; color: #fff;">
<div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">USER MANAGEMENT</div>
<div style="font-size: 10px; opacity: 0.9;">Registration/Login | Profile management<br/>Address management | Wishlist</div>
</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 8px; padding: 16px; color: #fff;">
<div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">PRODUCT MANAGEMENT</div>
<div style="font-size: 10px; opacity: 0.9;">Product catalog | Categories & attributes<br/>Inventory tracking | Seller management</div>
</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 8px; padding: 16px; color: #fff;">
<div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">SEARCH & DISCOVERY</div>
<div style="font-size: 10px; opacity: 0.9;">Full-text search | Filters & facets<br/>Recommendations | Recently viewed</div>
</div>
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); border-radius: 8px; padding: 16px; color: #fff;">
<div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">ORDERING</div>
<div style="font-size: 10px; opacity: 0.9;">Cart management | Order placement<br/>Order tracking | Returns & refunds</div>
</div>
<div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); border-radius: 8px; padding: 16px; color: #fff;">
<div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">PAYMENTS</div>
<div style="font-size: 10px; opacity: 0.9;">Multiple payment modes | Wallet system<br/>Refund processing | Invoice generation</div>
</div>
<div style="background: linear-gradient(135deg, #6e7681 0%, #8b949e 100%); border-radius: 8px; padding: 16px; color: #fff;">
<div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">LOGISTICS</div>
<div style="font-size: 10px; opacity: 0.9;">Warehouse management | Shipping partners<br/>Delivery tracking | Last-mile delivery</div>
</div>
<div style="background: linear-gradient(135deg, #3fb950 0%, #56d364 100%); border-radius: 8px; padding: 16px; color: #0d1117;">
<div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">NOTIFICATIONS</div>
<div style="font-size: 10px; opacity: 0.9;">Email/SMS/Push<br/>Order updates | Promotional</div>
</div>
<div style="background: linear-gradient(135deg, #d29922 0%, #e3b341 100%); border-radius: 8px; padding: 16px; color: #0d1117;">
<div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">ANALYTICS</div>
<div style="font-size: 10px; opacity: 0.9;">User behavior | Sales analytics<br/>Inventory forecasting</div>
</div>
</div>
</div>

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

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">FLIPKART MICROSERVICES ARCHITECTURE</h4>
<!-- Clients Layer -->
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
<div style="color: #8b949e; font-size: 11px; text-align: center; margin-bottom: 12px;">CLIENTS</div>
<div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #6e7681; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 10px;">Web App</div>
<div style="background: #6e7681; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 10px;">iOS App</div>
<div style="background: #6e7681; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 10px;">Android App</div>
<div style="background: #6e7681; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 10px;">Partner API</div>
</div>
</div>
<div style="text-align: center; color: #58a6ff; margin: 8px 0;">↓</div>
<!-- CDN Layer -->
<div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); border-radius: 8px; padding: 12px; text-align: center; color: #fff; font-size: 11px; margin-bottom: 12px;">
CDN + WAF + DDoS Protection
</div>
<div style="text-align: center; color: #58a6ff; margin: 8px 0;">↓</div>
<!-- API Gateway -->
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
<div style="color: #fff; font-weight: bold; font-size: 12px; text-align: center; margin-bottom: 8px;">API GATEWAY (Kong)</div>
<div style="display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
<span style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px; font-size: 9px; color: #fff;">Auth</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px; font-size: 9px; color: #fff;">Rate Limit</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px; font-size: 9px; color: #fff;">Routing</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px; font-size: 9px; color: #fff;">Transform</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px; font-size: 9px; color: #fff;">Cache</span>
</div>
</div>
<div style="text-align: center; color: #58a6ff; margin: 8px 0;">↓</div>
<!-- BFF Layer -->
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
<div style="color: #fff; font-weight: bold; font-size: 12px; text-align: center; margin-bottom: 8px;">BACKEND FOR FRONTEND (BFF)</div>
<div style="display: flex; justify-content: center; gap: 12px;">
<span style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 4px; font-size: 10px; color: #fff;">Web BFF</span>
<span style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 4px; font-size: 10px; color: #fff;">Mobile BFF</span>
<span style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 4px; font-size: 10px; color: #fff;">Partner BFF</span>
</div>
</div>
<div style="text-align: center; color: #58a6ff; margin: 8px 0;">↓</div>
<!-- Domain Services Layer -->
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
<div style="color: #fff; font-weight: bold; font-size: 12px; text-align: center; margin-bottom: 12px;">DOMAIN SERVICES LAYER</div>
<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="display: flex; justify-content: center; gap: 6px; flex-wrap: wrap;">
<span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 4px; font-size: 9px; color: #fff;">User</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 4px; font-size: 9px; color: #fff;">Product</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 4px; font-size: 9px; color: #fff;">Cart</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 4px; font-size: 9px; color: #fff;">Order</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 4px; font-size: 9px; color: #fff;">Payment</span>
</div>
<div style="display: flex; justify-content: center; gap: 6px; flex-wrap: wrap;">
<span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 4px; font-size: 9px; color: #fff;">Inventory</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 4px; font-size: 9px; color: #fff;">Search</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 4px; font-size: 9px; color: #fff;">Shipping</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 4px; font-size: 9px; color: #fff;">Seller</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 4px; font-size: 9px; color: #fff;">Pricing</span>
</div>
<div style="display: flex; justify-content: center; gap: 6px; flex-wrap: wrap;">
<span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 4px; font-size: 9px; color: #fff;">Wallet</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 4px; font-size: 9px; color: #fff;">Recommend</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 4px; font-size: 9px; color: #fff;">Promo</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 4px; font-size: 9px; color: #fff;">Notif</span>
<span style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 4px; font-size: 9px; color: #fff;">Analytics</span>
</div>
</div>
</div>
<div style="text-align: center; color: #58a6ff; margin: 8px 0;">↓</div>
<!-- Data Layer -->
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); border-radius: 12px; padding: 16px;">
<div style="color: #fff; font-weight: bold; font-size: 12px; text-align: center; margin-bottom: 12px;">DATA & MESSAGING LAYER</div>
<div style="display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;">
<div style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 4px; font-size: 9px; color: #fff; text-align: center;"><div style="font-weight: bold;">PostgreSQL</div><div style="opacity: 0.8;">(Users)</div></div>
<div style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 4px; font-size: 9px; color: #fff; text-align: center;"><div style="font-weight: bold;">MongoDB</div><div style="opacity: 0.8;">(Products)</div></div>
<div style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 4px; font-size: 9px; color: #fff; text-align: center;"><div style="font-weight: bold;">Redis</div><div style="opacity: 0.8;">(Cache)</div></div>
<div style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 4px; font-size: 9px; color: #fff; text-align: center;"><div style="font-weight: bold;">Kafka</div><div style="opacity: 0.8;">(Events)</div></div>
<div style="background: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 4px; font-size: 9px; color: #fff; text-align: center;"><div style="font-weight: bold;">Elastic</div><div style="opacity: 0.8;">(Search)</div></div>
</div>
</div>
</div>

---

## Service Decomposition

### Core Services

#### 1. User Service

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 14px;">USER SERVICE</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
<div>
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 8px;">RESPONSIBILITIES:</div>
<div style="color: #c9d1d9; font-size: 11px;">
<div>- User registration & authentication</div>
<div>- Profile management (name, email, phone)</div>
<div>- Address book management</div>
<div>- Session management</div>
<div>- User preferences</div>
</div>
</div>
<div>
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">API ENDPOINTS:</div>
<div style="font-family: monospace; font-size: 10px; color: #c9d1d9;">
<div><span style="color: #7ee787;">POST</span> /api/users/register</div>
<div><span style="color: #7ee787;">POST</span> /api/users/login</div>
<div><span style="color: #58a6ff;">GET</span> /api/users/{id}</div>
<div><span style="color: #f0883e;">PUT</span> /api/users/{id}</div>
<div><span style="color: #58a6ff;">GET</span> /api/users/{id}/addresses</div>
</div>
</div>
</div>
<div style="color: #f0883e; font-weight: bold; font-size: 12px; margin-bottom: 12px;">DATABASE: PostgreSQL</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 11px; margin-bottom: 8px;">users</div>
<div style="font-size: 10px; color: #8b949e;">id (PK) | email | phone | password_hash | first_name | last_name | created_at</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 11px; margin-bottom: 8px;">addresses</div>
<div style="font-size: 10px; color: #8b949e;">id (PK) | user_id (FK) | address_line1 | city | state | pincode | is_default | type</div>
</div>
</div>
<div style="background: rgba(248,81,73,0.1); border-radius: 8px; padding: 12px; border-left: 3px solid #f85149;">
<span style="color: #f85149; font-weight: bold; font-size: 11px;">CACHE:</span> <span style="color: #c9d1d9; font-size: 11px;">Redis (sessions, frequently accessed profiles)</span>
</div>
</div>

#### 2. Product Service

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 14px;">PRODUCT SERVICE</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
<div>
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 8px;">RESPONSIBILITIES:</div>
<div style="color: #c9d1d9; font-size: 11px;">
<div>- Product CRUD operations</div>
<div>- Category management</div>
<div>- Product attributes & variants</div>
<div>- Product images & media</div>
<div>- Product reviews & ratings</div>
</div>
</div>
<div>
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">API ENDPOINTS:</div>
<div style="font-family: monospace; font-size: 10px; color: #c9d1d9;">
<div><span style="color: #58a6ff;">GET</span> /api/products?category=&filters=</div>
<div><span style="color: #58a6ff;">GET</span> /api/products/{id}</div>
<div><span style="color: #58a6ff;">GET</span> /api/products/{id}/variants</div>
<div><span style="color: #58a6ff;">GET</span> /api/products/{id}/reviews</div>
<div><span style="color: #7ee787;">POST</span> /api/products/{id}/reviews</div>
</div>
</div>
</div>
<div style="color: #8957e5; font-weight: bold; font-size: 12px; margin-bottom: 12px;">DATABASE: MongoDB (flexible schema)</div>
<div style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 16px; font-family: monospace; font-size: 10px; color: #c9d1d9;">
<div>{</div>
<div style="margin-left: 12px;"><span style="color: #7ee787;">"_id"</span>: <span style="color: #a5d6ff;">"prod_123"</span>,</div>
<div style="margin-left: 12px;"><span style="color: #7ee787;">"name"</span>: <span style="color: #a5d6ff;">"iPhone 15 Pro"</span>,</div>
<div style="margin-left: 12px;"><span style="color: #7ee787;">"category"</span>: [<span style="color: #a5d6ff;">"Electronics"</span>, <span style="color: #a5d6ff;">"Mobiles"</span>, <span style="color: #a5d6ff;">"Apple"</span>],</div>
<div style="margin-left: 12px;"><span style="color: #7ee787;">"attributes"</span>: { <span style="color: #a5d6ff;">"color"</span>: <span style="color: #a5d6ff;">"Space Black"</span>, <span style="color: #a5d6ff;">"storage"</span>: <span style="color: #a5d6ff;">"256GB"</span> },</div>
<div style="margin-left: 12px;"><span style="color: #7ee787;">"variants"</span>: [{ <span style="color: #a5d6ff;">"sku"</span>: <span style="color: #a5d6ff;">"IP15P-256-BLK"</span> }],</div>
<div style="margin-left: 12px;"><span style="color: #7ee787;">"rating"</span>: { <span style="color: #a5d6ff;">"avg"</span>: <span style="color: #f78166;">4.5</span>, <span style="color: #a5d6ff;">"count"</span>: <span style="color: #f78166;">15234</span> }</div>
<div>}</div>
</div>
</div>

#### 3. Inventory Service

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 14px;">INVENTORY SERVICE</h4>
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 8px;">RESPONSIBILITIES:</div>
<div style="color: #c9d1d9; font-size: 11px; margin-bottom: 20px;">
Track stock levels per SKU | Reserve inventory for orders | Release on cancellation | Low stock alerts
</div>
<div style="color: #f0883e; font-weight: bold; font-size: 12px; margin-bottom: 12px;">CRITICAL OPERATIONS (ACID):</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px;">
<div style="background: rgba(126,231,135,0.1); border-radius: 8px; padding: 12px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 11px; margin-bottom: 8px;">RESERVE</div>
<div style="color: #8b949e; font-size: 10px;">1. Check available >= requested<br/>2. Decrement available_qty<br/>3. Increment reserved_qty<br/>4. Create reservation with TTL</div>
</div>
<div style="background: rgba(88,166,255,0.1); border-radius: 8px; padding: 12px; border-left: 3px solid #58a6ff;">
<div style="color: #58a6ff; font-weight: bold; font-size: 11px; margin-bottom: 8px;">COMMIT</div>
<div style="color: #8b949e; font-size: 10px;">1. Decrement reserved_qty<br/>2. Create shipment allocation</div>
</div>
<div style="background: rgba(248,81,73,0.1); border-radius: 8px; padding: 12px; border-left: 3px solid #f85149;">
<div style="color: #f85149; font-weight: bold; font-size: 11px; margin-bottom: 8px;">RELEASE</div>
<div style="color: #8b949e; font-size: 10px;">1. Increment available_qty<br/>2. Decrement reserved_qty<br/>3. Delete reservation</div>
</div>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 11px; margin-bottom: 6px;">inventory</div>
<div style="font-size: 10px; color: #8b949e;">sku (PK) | warehouse_id (PK) | available_qty | reserved_qty | reorder_point</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 11px; margin-bottom: 6px;">inventory_reservations</div>
<div style="font-size: 10px; color: #8b949e;">id (PK) | sku | warehouse_id | order_id | quantity | status | expires_at</div>
</div>
</div>
<div style="margin-top: 12px; color: #f85149; font-size: 11px;"><strong>DISTRIBUTED LOCK:</strong> Redis (prevent overselling)</div>
</div>

#### 4. Cart Service

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 14px;">CART SERVICE</h4>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
<div>
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 8px;">RESPONSIBILITIES:</div>
<div style="color: #c9d1d9; font-size: 11px;">
Add/remove items | Update quantities | Apply coupons | Calculate totals | Cart persistence
</div>
</div>
<div>
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">API ENDPOINTS:</div>
<div style="font-family: monospace; font-size: 10px; color: #c9d1d9;">
<span style="color: #58a6ff;">GET</span> /api/cart | <span style="color: #7ee787;">POST</span> /api/cart/items<br/>
<span style="color: #f0883e;">PUT/DELETE</span> /api/cart/items/{sku}
</div>
</div>
</div>
<div style="color: #f85149; font-weight: bold; font-size: 12px; margin-bottom: 12px;">DATA MODEL (Redis + PostgreSQL backup):</div>
<div style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 16px; font-family: monospace; font-size: 10px; color: #c9d1d9; margin-bottom: 16px;">
<div><span style="color: #8b949e;">cart:{user_id}</span> {</div>
<div style="margin-left: 12px;"><span style="color: #7ee787;">"items"</span>: [{ <span style="color: #a5d6ff;">"sku"</span>: <span style="color: #a5d6ff;">"IP15P-256-BLK"</span>, <span style="color: #a5d6ff;">"quantity"</span>: <span style="color: #f78166;">1</span>, <span style="color: #a5d6ff;">"price"</span>: <span style="color: #f78166;">134900</span> }],</div>
<div style="margin-left: 12px;"><span style="color: #7ee787;">"coupon_code"</span>: <span style="color: #a5d6ff;">"SAVE10"</span></div>
<div>}</div>
</div>
<div style="color: #8957e5; font-weight: bold; font-size: 12px; margin-bottom: 8px;">EVENTS PUBLISHED:</div>
<div style="display: flex; gap: 8px; flex-wrap: wrap;">
<span style="background: rgba(137,87,229,0.2); color: #a371f7; padding: 4px 10px; border-radius: 4px; font-size: 10px;">cart.item.added</span>
<span style="background: rgba(137,87,229,0.2); color: #a371f7; padding: 4px 10px; border-radius: 4px; font-size: 10px;">cart.item.removed</span>
<span style="background: rgba(137,87,229,0.2); color: #a371f7; padding: 4px 10px; border-radius: 4px; font-size: 10px;">cart.abandoned (24h)</span>
</div>
</div>

#### 5. Order Service

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 14px;">ORDER SERVICE</h4>
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 8px;">RESPONSIBILITIES:</div>
<div style="color: #c9d1d9; font-size: 11px; margin-bottom: 20px;">
Order creation & management | Order state machine | Order history | Returns & refunds
</div>
<div style="color: #f0883e; font-weight: bold; font-size: 12px; margin-bottom: 12px;">ORDER STATE MACHINE:</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
<div style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 8px;">
<div style="background: #6e7681; border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px;">CREATED</div>
<div style="color: #58a6ff;">→</div>
<div style="background: #f0883e; border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px;">PAYMENT_PENDING</div>
<div style="color: #58a6ff;">→</div>
<div style="background: #238636; border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px;">CONFIRMED</div>
<div style="color: #58a6ff;">→</div>
<div style="background: #1f6feb; border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px;">PROCESSING</div>
<div style="color: #58a6ff;">→</div>
<div style="background: #8957e5; border-radius: 4px; padding: 6px 12px; color: #fff; font-size: 10px;">SHIPPED</div>
<div style="color: #58a6ff;">→</div>
<div style="background: #7ee787; border-radius: 4px; padding: 6px 12px; color: #0d1117; font-size: 10px; font-weight: bold;">DELIVERED</div>
</div>
<div style="display: flex; justify-content: center; gap: 16px; margin-top: 12px;">
<div style="text-align: center;">
<div style="color: #f85149; font-size: 10px;">↓ payment fails</div>
<div style="background: #da3633; border-radius: 4px; padding: 4px 10px; color: #fff; font-size: 9px;">CANCELLED</div>
</div>
<div style="text-align: center;">
<div style="color: #f0883e; font-size: 10px;">↓ return request</div>
<div style="background: #f0883e; border-radius: 4px; padding: 4px 10px; color: #fff; font-size: 9px;">RETURNED</div>
</div>
</div>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 11px; margin-bottom: 6px;">orders</div>
<div style="font-size: 10px; color: #8b949e;">id (PK) | user_id | status | total_amount | shipping_address_id | payment_id</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 11px; margin-bottom: 6px;">order_items</div>
<div style="font-size: 10px; color: #8b949e;">id (PK) | order_id (FK) | sku | product_id | quantity | unit_price | seller_id</div>
</div>
</div>
</div>

#### 6. Payment Service

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 20px 0; font-size: 14px;">PAYMENT SERVICE</h4>
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 8px;">RESPONSIBILITIES:</div>
<div style="color: #c9d1d9; font-size: 11px; margin-bottom: 20px;">
Payment processing (UPI, Cards, NetBanking, COD) | Gateway integration | Refund processing | Fraud detection
</div>
<div style="color: #f0883e; font-weight: bold; font-size: 12px; margin-bottom: 12px;">PAYMENT FLOW:</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
<div style="display: flex; flex-direction: column; gap: 8px; font-size: 11px; color: #c9d1d9;">
<div><span style="color: #7ee787;">1.</span> Order Service → Payment Service: Initiate Payment</div>
<div><span style="color: #7ee787;">2.</span> Payment Service → Payment Gateway: Create Order</div>
<div><span style="color: #7ee787;">3.</span> User → Payment Gateway: Complete Payment</div>
<div><span style="color: #7ee787;">4.</span> Payment Gateway → Webhook → Payment Service</div>
<div><span style="color: #7ee787;">5.</span> Payment Service → Kafka: <span style="color: #a371f7;">payment.completed</span></div>
<div><span style="color: #7ee787;">6.</span> Order Service → Consume event → Update order</div>
</div>
</div>
<div style="color: #58a6ff; font-weight: bold; font-size: 12px; margin-bottom: 8px;">INTEGRATIONS:</div>
<div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;">
<span style="background: rgba(88,166,255,0.2); color: #58a6ff; padding: 4px 10px; border-radius: 4px; font-size: 10px;">Razorpay (UPI, Cards)</span>
<span style="background: rgba(88,166,255,0.2); color: #58a6ff; padding: 4px 10px; border-radius: 4px; font-size: 10px;">PayU (NetBanking)</span>
<span style="background: rgba(88,166,255,0.2); color: #58a6ff; padding: 4px 10px; border-radius: 4px; font-size: 10px;">Simpl (BNPL)</span>
<span style="background: rgba(88,166,255,0.2); color: #58a6ff; padding: 4px 10px; border-radius: 4px; font-size: 10px;">Internal Wallet</span>
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 11px; margin-bottom: 6px;">payments</div>
<div style="font-size: 10px; color: #8b949e;">id | order_id | amount | currency | method | gateway | gateway_txn_id | status</div>
</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 11px; margin-bottom: 6px;">refunds</div>
<div style="font-size: 10px; color: #8b949e;">id | payment_id (FK) | amount | reason | status | created_at</div>
</div>
</div>
</div>

---

## Search Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">SEARCH ARCHITECTURE</h4>
<!-- Search Query Flow -->
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; margin-bottom: 20px;">
<div style="color: #7ee787; font-weight: bold; font-size: 12px; text-align: center; margin-bottom: 16px;">SEARCH QUERY FLOW</div>
<div style="text-align: center; margin-bottom: 16px;">
<div style="background: rgba(88,166,255,0.2); border-radius: 8px; padding: 12px; display: inline-block; color: #58a6ff; font-size: 11px;">
<strong>User Query:</strong> "iPhone 15 Pro 256GB black"
</div>
</div>
<div style="text-align: center; color: #58a6ff; margin: 8px 0;">↓</div>
<div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 12px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-size: 11px; font-weight: bold;">Query Parser</div>
<div style="color: #8b949e; font-size: 10px;">→ Tokenize, Normalize, Spell Check</div>
</div>
<div style="text-align: center; color: #58a6ff; margin: 8px 0;">↓</div>
<div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 12px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-size: 11px; font-weight: bold;">Query Builder</div>
<div style="color: #8b949e; font-size: 10px;">→ Build Elasticsearch DSL</div>
</div>
<div style="text-align: center; color: #58a6ff; margin: 8px 0;">↓</div>
<!-- Elasticsearch Cluster -->
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
<div style="color: #fff; font-weight: bold; font-size: 12px; text-align: center; margin-bottom: 12px;">ELASTICSEARCH CLUSTER</div>
<div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 12px;">
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 10px;">Shard 1</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 10px;">Shard 2</div>
<div style="background: rgba(255,255,255,0.2); border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 10px;">Shard 3</div>
</div>
<div style="color: rgba(255,255,255,0.9); font-size: 10px; text-align: center;">
<strong>Indexes:</strong> products (100M+ docs) | sellers (1M docs) | categories (10K docs)
</div>
</div>
<div style="text-align: center; color: #58a6ff; margin: 8px 0;">↓</div>
<div style="display: flex; justify-content: center; align-items: center; gap: 16px; margin-bottom: 12px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); border-radius: 8px; padding: 10px 16px; color: #fff; font-size: 11px; font-weight: bold;">Ranker</div>
<div style="color: #8b949e; font-size: 10px;">→ Relevance, Popularity, Personalize</div>
</div>
<div style="text-align: center; color: #58a6ff; margin: 8px 0;">↓</div>
<div style="text-align: center;">
<div style="background: rgba(126,231,135,0.2); border-radius: 8px; padding: 12px; display: inline-block; color: #7ee787; font-size: 11px; font-weight: bold;">
Search Results with Facets
</div>
</div>
</div>
<!-- Data Sync Pipeline -->
<div style="color: #f0883e; font-weight: bold; font-size: 12px; margin-bottom: 12px;">DATA SYNC PIPELINE:</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 16px;">
<div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; font-size: 10px;">
<div style="background: #8957e5; border-radius: 6px; padding: 8px 12px; color: #fff; text-align: center;">
<div style="font-weight: bold;">MongoDB</div>
<div style="opacity: 0.8;">(Products)</div>
</div>
<div style="color: #58a6ff;">→</div>
<div style="background: #1f6feb; border-radius: 6px; padding: 8px 12px; color: #fff; text-align: center;">
<div style="font-weight: bold;">Debezium CDC</div>
<div style="opacity: 0.8;">(Change Data Capture)</div>
</div>
<div style="color: #58a6ff;">→</div>
<div style="background: #f78166; border-radius: 6px; padding: 8px 12px; color: #fff; text-align: center;">
<div style="font-weight: bold;">Kafka</div>
<div style="opacity: 0.8;">(product.events)</div>
</div>
<div style="color: #58a6ff;">→</div>
<div style="background: #238636; border-radius: 6px; padding: 8px 12px; color: #fff; text-align: center;">
<div style="font-weight: bold;">Elasticsearch</div>
<div style="opacity: 0.8;">(Index Updates)</div>
</div>
</div>
</div>
</div>

---

## Order Flow Sequence

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">ORDER CREATION FLOW</h4>
<!-- Service Headers -->
<div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; margin-bottom: 16px;">
<div style="background: #6e7681; border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 10px; font-weight: bold;">User</div>
<div style="background: #8957e5; border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 10px; font-weight: bold;">Cart</div>
<div style="background: #1f6feb; border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 10px; font-weight: bold;">Order</div>
<div style="background: #238636; border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 10px; font-weight: bold;">Inventory</div>
<div style="background: #f78166; border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 10px; font-weight: bold;">Payment</div>
<div style="background: #d29922; border-radius: 6px; padding: 8px; text-align: center; color: #fff; font-size: 10px; font-weight: bold;">Notification</div>
</div>
<!-- Flow Steps -->
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 16px;">
<div style="display: flex; flex-direction: column; gap: 10px; font-size: 11px;">
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #7ee787; font-weight: bold; width: 20px;">1.</span>
<span style="color: #6e7681;">User</span>
<span style="color: #58a6ff;">→ Checkout →</span>
<span style="color: #8957e5;">Cart</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #7ee787; font-weight: bold; width: 20px;">2.</span>
<span style="color: #8957e5;">Cart</span>
<span style="color: #58a6ff;">→ Create Order →</span>
<span style="color: #1f6feb;">Order Service</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #7ee787; font-weight: bold; width: 20px;">3.</span>
<span style="color: #1f6feb;">Order</span>
<span style="color: #58a6ff;">→ Reserve Stock →</span>
<span style="color: #238636;">Inventory</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 2px 8px; border-radius: 4px; font-size: 9px; margin-left: 8px;">OK</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #7ee787; font-weight: bold; width: 20px;">4.</span>
<span style="color: #1f6feb;">Order</span>
<span style="color: #58a6ff;">→ Initiate Payment →</span>
<span style="color: #f78166;">Payment</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #7ee787; font-weight: bold; width: 20px;">5.</span>
<span style="color: #f78166;">Payment</span>
<span style="color: #58a6ff;">→ Payment URL →</span>
<span style="color: #6e7681;">User</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #7ee787; font-weight: bold; width: 20px;">6.</span>
<span style="color: #6e7681;">User</span>
<span style="color: #58a6ff;">→ Pay →</span>
<span style="color: #f78166;">Payment Gateway</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #7ee787; font-weight: bold; width: 20px;">7.</span>
<span style="color: #f78166;">Payment Gateway</span>
<span style="color: #58a6ff;">→ Webhook (Success) →</span>
<span style="color: #1f6feb;">Order</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #7ee787; font-weight: bold; width: 20px;">8.</span>
<span style="color: #1f6feb;">Order</span>
<span style="color: #58a6ff;">→ Confirm Stock →</span>
<span style="color: #238636;">Inventory</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #7ee787; font-weight: bold; width: 20px;">9.</span>
<span style="color: #1f6feb;">Order</span>
<span style="color: #58a6ff;">→ Notify →</span>
<span style="color: #d29922;">Notification</span>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="color: #7ee787; font-weight: bold; width: 20px;">10.</span>
<span style="color: #d29922;">Notification</span>
<span style="color: #58a6ff;">→ Order Confirmed →</span>
<span style="color: #6e7681;">User</span>
<span style="background: rgba(126,231,135,0.2); color: #7ee787; padding: 2px 8px; border-radius: 4px; font-size: 9px; margin-left: 8px;">Complete</span>
</div>
</div>
</div>
</div>

---

## Handling Scale (Big Billion Days)

### Pre-Sale Preparations

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 14px; text-align: center;">SCALING FOR BIG BILLION DAYS</h4>
<!-- Traffic Management -->
<div style="color: #7ee787; font-weight: bold; font-size: 12px; margin-bottom: 12px;">TRAFFIC MANAGEMENT:</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
<!-- Queue-Based Checkout -->
<div style="margin-bottom: 16px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 11px; margin-bottom: 8px;">1. QUEUE-BASED CHECKOUT</div>
<div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #6e7681; border-radius: 6px; padding: 10px 16px; color: #fff; font-size: 10px; text-align: center;">
<div style="font-weight: bold;">Users</div>
<div style="opacity: 0.8;">(10M)</div>
</div>
<div style="color: #58a6ff;">→</div>
<div style="background: #8957e5; border-radius: 6px; padding: 10px 16px; color: #fff; font-size: 10px; text-align: center;">
<div style="font-weight: bold;">Virtual Queue</div>
</div>
<div style="color: #58a6ff;">→</div>
<div style="background: #238636; border-radius: 6px; padding: 10px 16px; color: #fff; font-size: 10px; text-align: center;">
<div style="font-weight: bold;">Checkout</div>
<div style="opacity: 0.8;">(10K/s)</div>
</div>
</div>
</div>
<!-- Flash Sale Inventory -->
<div style="margin-bottom: 16px;">
<div style="color: #58a6ff; font-weight: bold; font-size: 11px; margin-bottom: 8px;">2. FLASH SALE INVENTORY LOCKING</div>
<div style="color: #c9d1d9; font-size: 10px; padding-left: 12px;">
<div>- Pre-reserve inventory in Redis</div>
<div>- Atomic decrement with Lua scripts</div>
<div>- No database queries during flash</div>
</div>
</div>
<!-- Static Page Caching -->
<div>
<div style="color: #58a6ff; font-weight: bold; font-size: 11px; margin-bottom: 8px;">3. STATIC PAGE CACHING</div>
<div style="color: #c9d1d9; font-size: 10px; padding-left: 12px;">
<div>- Pre-render product pages</div>
<div>- CDN caching with 5-min TTL</div>
<div>- Dynamic prices via API</div>
</div>
</div>
</div>
<!-- Infrastructure Scaling -->
<div style="color: #f0883e; font-weight: bold; font-size: 12px; margin-bottom: 12px;">INFRASTRUCTURE SCALING:</div>
<div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 16px; margin-bottom: 20px; overflow-x: auto;">
<table style="width: 100%; border-collapse: collapse; font-size: 10px; color: #c9d1d9;">
<tr style="border-bottom: 1px solid #30363d;">
<th style="text-align: left; padding: 8px; color: #58a6ff;">Component</th>
<th style="text-align: center; padding: 8px; color: #6e7681;">Normal</th>
<th style="text-align: center; padding: 8px; color: #7ee787;">BBD (10x)</th>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 8px;">API Gateway</td>
<td style="text-align: center; padding: 8px;">50 pods</td>
<td style="text-align: center; padding: 8px; color: #7ee787; font-weight: bold;">500 pods</td>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 8px;">Cart Service</td>
<td style="text-align: center; padding: 8px;">30 pods</td>
<td style="text-align: center; padding: 8px; color: #7ee787; font-weight: bold;">300 pods</td>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 8px;">Order Service</td>
<td style="text-align: center; padding: 8px;">20 pods</td>
<td style="text-align: center; padding: 8px; color: #7ee787; font-weight: bold;">200 pods</td>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 8px;">Payment Service</td>
<td style="text-align: center; padding: 8px;">40 pods</td>
<td style="text-align: center; padding: 8px; color: #7ee787; font-weight: bold;">400 pods</td>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 8px;">Redis Cluster</td>
<td style="text-align: center; padding: 8px;">6 nodes</td>
<td style="text-align: center; padding: 8px; color: #7ee787; font-weight: bold;">30 nodes</td>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 8px;">Kafka Brokers</td>
<td style="text-align: center; padding: 8px;">9 brokers</td>
<td style="text-align: center; padding: 8px; color: #7ee787; font-weight: bold;">27 brokers</td>
</tr>
<tr>
<td style="padding: 8px;">PostgreSQL</td>
<td style="text-align: center; padding: 8px;">3 replicas</td>
<td style="text-align: center; padding: 8px; color: #7ee787; font-weight: bold;">10 replicas</td>
</tr>
</table>
</div>
<!-- Graceful Degradation -->
<div style="color: #f85149; font-weight: bold; font-size: 12px; margin-bottom: 12px;">GRACEFUL DEGRADATION:</div>
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
<div style="background: rgba(126,231,135,0.1); border-radius: 8px; padding: 12px; border-left: 3px solid #7ee787;">
<div style="color: #7ee787; font-weight: bold; font-size: 11px; margin-bottom: 8px;">Priority 1 (Always)</div>
<div style="color: #c9d1d9; font-size: 10px;">
<div>- Checkout & Payment</div>
<div>- Order status</div>
<div>- Core search</div>
</div>
</div>
<div style="background: rgba(240,136,62,0.1); border-radius: 8px; padding: 12px; border-left: 3px solid #f0883e;">
<div style="color: #f0883e; font-weight: bold; font-size: 11px; margin-bottom: 8px;">Priority 2 (Degraded)</div>
<div style="color: #c9d1d9; font-size: 10px;">
<div>- Recommendations</div>
<div>- Reviews</div>
<div>- Wishlist</div>
</div>
</div>
<div style="background: rgba(248,81,73,0.1); border-radius: 8px; padding: 12px; border-left: 3px solid #f85149;">
<div style="color: #f85149; font-weight: bold; font-size: 11px; margin-bottom: 8px;">Priority 3 (Disabled)</div>
<div style="color: #c9d1d9; font-size: 10px;">
<div>- Recently viewed</div>
<div>- Price history</div>
<div>- Similar products</div>
</div>
</div>
</div>
</div>

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
