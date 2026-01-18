# Design Amazon (E-Commerce Platform)

## Problem Statement

Design a large-scale e-commerce platform like Amazon that handles product catalog, search, shopping cart, checkout, payments, order management, and delivery tracking.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f0883e;">

### Core Requirements
- **Product Catalog**: Millions of products with categories, attributes, images
- **Search & Discovery**: Full-text search, filters, recommendations
- **Shopping Cart**: Persistent cart across sessions/devices
- **Checkout & Payments**: Multiple payment methods, fraud detection
- **Order Management**: Order lifecycle, tracking, returns
- **Inventory Management**: Real-time stock across warehouses

</div>

---

## Functional Requirements

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #58a6ff; margin: 0 0 12px 0;">Customer</h4>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Browse/search products</li>
<li>View product details</li>
<li>Add to cart/wishlist</li>
<li>Checkout & pay</li>
<li>Track orders</li>
<li>Write reviews</li>
</ul>
</div>

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #a371f7; margin: 0 0 12px 0;">Seller</h4>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li>List products</li>
<li>Manage inventory</li>
<li>Process orders</li>
<li>Handle returns</li>
<li>View analytics</li>
<li>Manage pricing</li>
</ul>
</div>

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #7ee787; margin: 0 0 12px 0;">System</h4>
<ul style="color: #c9d1d9; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Inventory sync</li>
<li>Payment processing</li>
<li>Fraud detection</li>
<li>Recommendation engine</li>
<li>Warehouse routing</li>
<li>Delivery optimization</li>
</ul>
</div>

</div>

---

## Non-Functional Requirements

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

| Requirement | Target | Notes |
|-------------|--------|-------|
| **Availability** | 99.99% | Critical for revenue |
| **Latency** | < 200ms page load | User experience |
| **Throughput** | 100K orders/minute (peak) | Black Friday/Prime Day |
| **Consistency** | Eventually consistent reads | Strong for payments |
| **Scale** | 500M+ products, 300M+ users | Global operation |

</div>

---

## High-Level Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">AMAZON E-COMMERCE ARCHITECTURE</h3>

```
                                    ┌─────────────────┐
                                    │   CloudFront    │
                                    │     (CDN)       │
                                    └────────┬────────┘
                                             │
                    ┌────────────────────────┼────────────────────────┐
                    │                        │                        │
                    ▼                        ▼                        ▼
            ┌───────────────┐      ┌───────────────┐      ┌───────────────┐
            │  Web App      │      │  Mobile API   │      │  Seller API   │
            │  (React/Next) │      │   Gateway     │      │   Gateway     │
            └───────┬───────┘      └───────┬───────┘      └───────┬───────┘
                    │                      │                      │
                    └──────────────────────┼──────────────────────┘
                                           │
                               ┌───────────▼───────────┐
                               │    API Gateway        │
                               │   (Rate Limiting,     │
                               │    Auth, Routing)     │
                               └───────────┬───────────┘
                                           │
    ┌──────────────────────────────────────┼──────────────────────────────────────┐
    │                                      │                                      │
    │  ┌─────────────────────────────────────────────────────────────────────┐   │
    │  │                        SERVICE MESH (Envoy/Istio)                   │   │
    │  └─────────────────────────────────────────────────────────────────────┘   │
    │                                      │                                      │
    │     ┌────────────────────────────────┼────────────────────────────────┐    │
    │     │                                │                                │    │
    │     ▼                                ▼                                ▼    │
    │ ┌─────────┐  ┌─────────┐  ┌─────────────┐  ┌─────────┐  ┌─────────────┐   │
    │ │ Product │  │ Search  │  │    Cart     │  │  Order  │  │   Payment   │   │
    │ │ Service │  │ Service │  │   Service   │  │ Service │  │   Service   │   │
    │ └────┬────┘  └────┬────┘  └──────┬──────┘  └────┬────┘  └──────┬──────┘   │
    │      │            │              │              │              │          │
    │ ┌─────────┐  ┌─────────┐  ┌─────────────┐  ┌─────────┐  ┌─────────────┐   │
    │ │Inventory│  │  User   │  │Notification │  │Shipping │  │   Review    │   │
    │ │ Service │  │ Service │  │   Service   │  │ Service │  │   Service   │   │
    │ └─────────┘  └─────────┘  └─────────────┘  └─────────┘  └─────────────┘   │
    │                                                                            │
    │                         MICROSERVICES LAYER                                │
    └────────────────────────────────────────────────────────────────────────────┘
                                           │
    ┌──────────────────────────────────────┼──────────────────────────────────────┐
    │                                      │                                      │
    │  ┌─────────────────────────────────────────────────────────────────────┐   │
    │  │                        MESSAGE BUS (Kafka)                          │   │
    │  └─────────────────────────────────────────────────────────────────────┘   │
    │                                                                            │
    │                          EVENT STREAMING LAYER                             │
    └────────────────────────────────────────────────────────────────────────────┘
                                           │
    ┌──────────────────────────────────────┼──────────────────────────────────────┐
    │     ┌────────────────────────────────┼────────────────────────────────┐    │
    │     ▼                                ▼                                ▼    │
    │ ┌─────────┐  ┌─────────┐  ┌─────────────┐  ┌─────────┐  ┌─────────────┐   │
    │ │DynamoDB │  │ Aurora  │  │Elasticsearch│  │  Redis  │  │     S3      │   │
    │ │(Catalog)│  │(Orders) │  │  (Search)   │  │ (Cache) │  │  (Images)   │   │
    │ └─────────┘  └─────────┘  └─────────────┘  └─────────┘  └─────────────┘   │
    │                                                                            │
    │                            DATA LAYER                                      │
    └────────────────────────────────────────────────────────────────────────────┘
```

</div>

---

## Phase 1: Starting Phase (Low Budget)

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 1,000 - 50,000 monthly active users
- **Products**: 10,000 - 100,000 SKUs
- **Orders**: 100 - 1,000 orders/day
- **Budget**: $500 - $3,000/month
- **Team**: 3-8 developers

### Monolithic Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```
┌─────────────────────────────────────────────────────────────────┐
│                      E-COMMERCE MONOLITH                         │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    PRESENTATION LAYER                       │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │ │
│  │  │  Web Pages   │  │  REST API    │  │  Admin Panel     │  │ │
│  │  │  (Templates) │  │  (JSON)      │  │  (Dashboard)     │  │ │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    BUSINESS LOGIC LAYER                     │ │
│  │                                                             │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │ │
│  │  │  Products   │  │    Cart     │  │      Orders         │ │ │
│  │  │  Module     │  │   Module    │  │      Module         │ │ │
│  │  └─────────────┘  └─────────────┘  └─────────────────────┘ │ │
│  │                                                             │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │ │
│  │  │   Users     │  │  Payments   │  │     Inventory       │ │ │
│  │  │  Module     │  │   Module    │  │      Module         │ │ │
│  │  └─────────────┘  └─────────────┘  └─────────────────────┘ │ │
│  │                                                             │ │
│  │  ┌─────────────┐  ┌─────────────┐                          │ │
│  │  │   Search    │  │   Reviews   │                          │ │
│  │  │  Module     │  │   Module    │                          │ │
│  │  └─────────────┘  └─────────────┘                          │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    DATA ACCESS LAYER                        │ │
│  │            (ORM: Django ORM / SQLAlchemy / TypeORM)         │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
    ┌─────────┐          ┌─────────┐          ┌─────────┐
    │PostgreSQL│          │  Redis  │          │   S3    │
    │          │          │ (Cache/ │          │(Images) │
    │          │          │Sessions)│          │         │
    └─────────┘          └─────────┘          └─────────┘
```

</div>

#### Tech Stack
- **Backend**: Django/Rails/Laravel or Node.js
- **Database**: PostgreSQL (all data)
- **Cache**: Redis (sessions, cart)
- **Storage**: S3 (product images)
- **Search**: PostgreSQL full-text search
- **Payments**: Stripe/Razorpay integration
- **Hosting**: Single EC2 or Heroku

#### Abstract Code Structure

```python
# Django-style monolith structure
# apps/products/models.py
class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    inventory_count = models.IntegerField(default=0)

# apps/cart/services.py
class CartService:
    def add_item(self, user_id, product_id, quantity):
        cart = self.get_or_create_cart(user_id)
        product = Product.objects.get(id=product_id)

        if product.inventory_count < quantity:
            raise InsufficientInventoryError()

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart, product=product
        )
        cart_item.quantity += quantity
        cart_item.save()

        # Invalidate cache
        cache.delete(f"cart:{user_id}")
        return cart

# apps/orders/services.py
class OrderService:
    def create_order(self, user_id, payment_method):
        with transaction.atomic():
            cart = CartService().get_cart(user_id)

            # Validate inventory
            for item in cart.items.all():
                if item.product.inventory_count < item.quantity:
                    raise InsufficientInventoryError()

            # Create order
            order = Order.objects.create(
                user_id=user_id,
                total=cart.total,
                status='pending'
            )

            # Process payment
            payment = PaymentService().charge(
                user_id, cart.total, payment_method
            )

            # Update inventory
            for item in cart.items.all():
                item.product.inventory_count -= item.quantity
                item.product.save()

                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    price=item.product.price
                )

            # Clear cart
            cart.items.all().delete()

            # Send confirmation (sync in Phase 1)
            EmailService().send_order_confirmation(order)

            return order
```

### Simple Microservices (Phase 1)

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 20px; margin: 16px 0;">
<p style="color: #f0883e;"><strong>Not Recommended:</strong> At this scale, stick with monolith. If team insists:</p>

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Web/Mobile  │────▶│  API Gateway │────▶│  Backend     │
│   Clients    │     │  (Nginx)     │     │  (Monolith)  │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                            ┌─────────────────────┼─────────────────────┐
                            ▼                     ▼                     ▼
                     ┌───────────┐         ┌───────────┐         ┌───────────┐
                     │ PostgreSQL│         │   Redis   │         │    S3     │
                     └───────────┘         └───────────┘         └───────────┘

Only split if you have VERY different scaling needs (e.g., image processing)
```

</div>

</div>
</div>

---

## Phase 2: Medium User Phase

<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #0d1117; border-radius: 10px; padding: 24px;">

### Assumptions
- **Users**: 500,000 - 5M monthly active users
- **Products**: 1M - 10M SKUs
- **Orders**: 10,000 - 100,000 orders/day
- **Budget**: $20,000 - $100,000/month
- **Team**: 20-50 developers

### Modular Monolith Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

```
                        ┌─────────────────────┐
                        │    Load Balancer    │
                        │    (AWS ALB)        │
                        └──────────┬──────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
       ┌────────────┐       ┌────────────┐       ┌────────────┐
       │ App Node 1 │       │ App Node 2 │       │ App Node N │
       └─────┬──────┘       └─────┬──────┘       └─────┬──────┘
             │                    │                    │
             └────────────────────┼────────────────────┘
                                  │
    ┌─────────────────────────────┼─────────────────────────────┐
    │                             │                             │
    ▼                             ▼                             ▼
┌─────────────┐           ┌─────────────┐           ┌─────────────┐
│  Aurora     │           │   Redis     │           │Elasticsearch│
│  Primary    │           │   Cluster   │           │   Cluster   │
│  + Replicas │           │             │           │             │
└─────────────┘           └─────────────┘           └─────────────┘
        │
        ▼
┌─────────────┐           ┌─────────────┐           ┌─────────────┐
│  SQS/       │           │   S3        │           │  CloudFront │
│  RabbitMQ   │           │   + Images  │           │    (CDN)    │
└─────────────┘           └─────────────┘           └─────────────┘
```

</div>

### Microservices Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">
<h4 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">DOMAIN-DRIVEN MICROSERVICES</h4>

```
                              ┌────────────────────┐
                              │    API Gateway     │
                              │   (Kong/APIGW)     │
                              └─────────┬──────────┘
                                        │
         ┌──────────────────────────────┼──────────────────────────────┐
         │                              │                              │
         ▼                              ▼                              ▼
 ┌───────────────┐            ┌───────────────┐            ┌───────────────┐
 │   PRODUCT     │            │    SEARCH     │            │     USER      │
 │   DOMAIN      │            │    DOMAIN     │            │    DOMAIN     │
 │               │            │               │            │               │
 │ ┌───────────┐ │            │ ┌───────────┐ │            │ ┌───────────┐ │
 │ │ Catalog   │ │───────────▶│ │  Search   │ │            │ │  Auth     │ │
 │ │ Service   │ │  (events)  │ │  Service  │ │            │ │  Service  │ │
 │ └───────────┘ │            │ └───────────┘ │            │ └───────────┘ │
 │ ┌───────────┐ │            │               │            │ ┌───────────┐ │
 │ │ Inventory │ │            │ Elasticsearch │            │ │  Profile  │ │
 │ │ Service   │ │            │               │            │ │  Service  │ │
 │ └───────────┘ │            └───────────────┘            │ └───────────┘ │
 │               │                                          │               │
 │  DynamoDB     │                                          │  PostgreSQL   │
 └───────────────┘                                          └───────────────┘
         │                              │                              │
         └──────────────────────────────┼──────────────────────────────┘
                                        │
                                ┌───────▼───────┐
                                │    Kafka      │
                                │  Event Bus    │
                                └───────┬───────┘
                                        │
         ┌──────────────────────────────┼──────────────────────────────┐
         │                              │                              │
         ▼                              ▼                              ▼
 ┌───────────────┐            ┌───────────────┐            ┌───────────────┐
 │    CART       │            │    ORDER      │            │   PAYMENT     │
 │   DOMAIN      │            │    DOMAIN     │            │   DOMAIN      │
 │               │            │               │            │               │
 │ ┌───────────┐ │            │ ┌───────────┐ │            │ ┌───────────┐ │
 │ │   Cart    │ │───────────▶│ │  Order    │ │───────────▶│ │  Payment  │ │
 │ │  Service  │ │  checkout  │ │  Service  │ │  payment   │ │  Service  │ │
 │ └───────────┘ │            │ └───────────┘ │            │ └───────────┘ │
 │               │            │ ┌───────────┐ │            │               │
 │    Redis      │            │ │ Fulfillment│ │            │   Stripe/    │
 │               │            │ │  Service  │ │            │   Razorpay   │
 └───────────────┘            │ └───────────┘ │            └───────────────┘
                              │               │
                              │   Aurora      │
                              └───────────────┘
```

</div>

#### Service Communication Patterns

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 20px 0;">

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 16px;">
<h5 style="color: #58a6ff; margin: 0 0 8px 0;">Synchronous (REST/gRPC)</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Cart → Inventory (check stock)</li>
<li>Order → Payment (process)</li>
<li>User → Auth (validate token)</li>
</ul>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 16px;">
<h5 style="color: #7ee787; margin: 0 0 8px 0;">Asynchronous (Kafka)</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Order placed → Inventory update</li>
<li>Order placed → Send emails</li>
<li>Product updated → Reindex search</li>
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
- **Users**: 300M+ monthly active users
- **Products**: 500M+ SKUs
- **Orders**: 10M+ orders/day (100K+/min peak)
- **Budget**: $5M+/month
- **Team**: 1000+ engineers

### Global Architecture

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

```
                            GLOBAL INFRASTRUCTURE
    ┌────────────────────────────────────────────────────────────────────┐
    │                                                                    │
    │                         ┌──────────────┐                           │
    │                         │   Route 53   │                           │
    │                         │ (GeoDNS LB)  │                           │
    │                         └──────┬───────┘                           │
    │                                │                                   │
    │         ┌──────────────────────┼──────────────────────┐           │
    │         ▼                      ▼                      ▼           │
    │  ┌────────────┐         ┌────────────┐         ┌────────────┐    │
    │  │ CloudFront │         │ CloudFront │         │ CloudFront │    │
    │  │   US Edge  │         │   EU Edge  │         │  APAC Edge │    │
    │  └─────┬──────┘         └─────┬──────┘         └─────┬──────┘    │
    │        │                      │                      │            │
    │        ▼                      ▼                      ▼            │
    │  ┌──────────────────────────────────────────────────────────┐    │
    │  │                    REGIONAL DEPLOYMENTS                   │    │
    │  │                                                           │    │
    │  │   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐    │    │
    │  │   │  US-EAST    │   │  EU-WEST    │   │  AP-SOUTH   │    │    │
    │  │   │  Region     │   │  Region     │   │  Region     │    │    │
    │  │   │             │   │             │   │             │    │    │
    │  │   │ ┌─────────┐ │   │ ┌─────────┐ │   │ ┌─────────┐ │    │    │
    │  │   │ │   EKS   │ │   │ │   EKS   │ │   │ │   EKS   │ │    │    │
    │  │   │ │ Cluster │ │   │ │ Cluster │ │   │ │ Cluster │ │    │    │
    │  │   │ └─────────┘ │   │ └─────────┘ │   │ └─────────┘ │    │    │
    │  │   │             │   │             │   │             │    │    │
    │  │   │ ┌─────────┐ │   │ ┌─────────┐ │   │ ┌─────────┐ │    │    │
    │  │   │ │ Aurora  │ │   │ │ Aurora  │ │   │ │ Aurora  │ │    │    │
    │  │   │ │ Global  │◀┼───┼▶│ Replica │◀┼───┼▶│ Replica │ │    │    │
    │  │   │ └─────────┘ │   │ └─────────┘ │   │ └─────────┘ │    │    │
    │  │   │             │   │             │   │             │    │    │
    │  │   └─────────────┘   └─────────────┘   └─────────────┘    │    │
    │  │                                                           │    │
    │  └──────────────────────────────────────────────────────────┘    │
    │                                                                    │
    └────────────────────────────────────────────────────────────────────┘
```

</div>

### Data Partitioning Strategy

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">SHARDING STRATEGIES</h4>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 20px;">
<h5 style="color: #58a6ff; margin: 0 0 12px 0;">Products (DynamoDB)</h5>

```
Partition Key: product_id
Sort Key: version

Sharding: Automatic (DynamoDB)

GSI:
- category_id + price
- seller_id + created_at

Benefits:
- Single-digit ms latency
- Auto-scaling
- No shard management
```

</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 20px;">
<h5 style="color: #7ee787; margin: 0 0 12px 0;">Orders (Aurora)</h5>

```
Shard Key: user_id % 256

Sharding Strategy:
- Hash-based sharding
- 256 logical shards
- 16 physical clusters

Cross-shard queries:
- Scatter-gather pattern
- Async aggregation
```

</div>

</div>

</div>

### Checkout Flow (High Scale)

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #58a6ff; text-align: center; margin: 0 0 24px 0;">SAGA PATTERN FOR DISTRIBUTED CHECKOUT</h4>

```
    ┌─────────────────────────────────────────────────────────────────┐
    │                     CHECKOUT SAGA ORCHESTRATOR                   │
    └──────────────────────────────┬──────────────────────────────────┘
                                   │
    Step 1                         ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │  RESERVE INVENTORY                                               │
    │  ┌──────────────┐    success    ┌───────────────────────────┐   │
    │  │ Inventory    │──────────────▶│ Inventory Reserved        │   │
    │  │ Service      │               │ TTL: 15 minutes           │   │
    │  └──────────────┘    failure    └───────────────────────────┘   │
    │         │                                                        │
    │         └───────────────────────▶ SAGA FAILED (no compensation) │
    └─────────────────────────────────────────────────────────────────┘
                                   │
    Step 2                         ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │  PROCESS PAYMENT                                                 │
    │  ┌──────────────┐    success    ┌───────────────────────────┐   │
    │  │ Payment      │──────────────▶│ Payment Authorized        │   │
    │  │ Service      │               │                           │   │
    │  └──────────────┘    failure    └───────────────────────────┘   │
    │         │                                                        │
    │         └───────────────────────▶ COMPENSATE: Release Inventory │
    └─────────────────────────────────────────────────────────────────┘
                                   │
    Step 3                         ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │  CREATE ORDER                                                    │
    │  ┌──────────────┐    success    ┌───────────────────────────┐   │
    │  │ Order        │──────────────▶│ Order Created             │   │
    │  │ Service      │               │                           │   │
    │  └──────────────┘    failure    └───────────────────────────┘   │
    │         │                                                        │
    │         └───────▶ COMPENSATE: Refund Payment, Release Inventory │
    └─────────────────────────────────────────────────────────────────┘
                                   │
    Step 4                         ▼
    ┌─────────────────────────────────────────────────────────────────┐
    │  CONFIRM INVENTORY DEDUCTION                                     │
    │  ┌──────────────┐    success    ┌───────────────────────────┐   │
    │  │ Inventory    │──────────────▶│ ORDER COMPLETE            │   │
    │  │ Service      │               │ Send Confirmation         │   │
    │  └──────────────┘               └───────────────────────────┘   │
    └─────────────────────────────────────────────────────────────────┘
```

</div>

### Recommendation Engine

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

```
                    RECOMMENDATION PIPELINE

    ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
    │ User        │     │ Product     │     │ Order       │
    │ Events      │     │ Catalog     │     │ History     │
    └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
           │                   │                   │
           └───────────────────┼───────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   Kinesis Firehose  │
                    │   (Data Ingestion)  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │        EMR          │
                    │  (Spark Processing) │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
       ┌───────────┐    ┌───────────┐    ┌───────────┐
       │Collaborative│  │ Content   │    │ Real-time │
       │ Filtering  │   │  Based    │    │ Trending  │
       └───────────┘    └───────────┘    └───────────┘
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   SageMaker         │
                    │   (ML Models)       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   DynamoDB          │
                    │   (Recommendations) │
                    └─────────────────────┘
```

</div>

</div>
</div>

---

## AWS Technologies & Alternatives

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

| Component | AWS Service | Alternative | Trade-offs |
|-----------|-------------|-------------|------------|
| **Product Catalog** | DynamoDB | MongoDB Atlas | DynamoDB: Better scaling, MongoDB: Flexible queries |
| **Orders DB** | Aurora PostgreSQL | CockroachDB | Aurora: AWS integration, Cockroach: Multi-region |
| **Search** | OpenSearch | Algolia | OpenSearch: Control, Algolia: Managed + faster |
| **Cache** | ElastiCache Redis | Redis Enterprise | ElastiCache: Managed, Enterprise: Better clustering |
| **CDN** | CloudFront | Fastly | CloudFront: AWS integration, Fastly: Edge compute |
| **Message Queue** | MSK (Kafka) | Confluent Cloud | MSK: Cost, Confluent: Features + support |
| **Container** | EKS | GKE | EKS: AWS integration, GKE: Better K8s experience |
| **Recommendations** | SageMaker | Vertex AI | SageMaker: AWS ecosystem, Vertex: AutoML |

</div>

---

## Distributed Systems Considerations

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

### 1. Inventory Consistency

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 16px 0;">

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 20px;">
<h5 style="color: #f85149; margin: 0 0 12px 0;">Problem: Overselling</h5>
<p style="color: #8b949e; font-size: 13px;">Multiple users buying last item simultaneously</p>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 20px;">
<h5 style="color: #7ee787; margin: 0 0 12px 0;">Solution: Optimistic Locking</h5>

```python
# DynamoDB conditional update
dynamodb.update_item(
    TableName='inventory',
    Key={'product_id': id},
    UpdateExpression='SET quantity = quantity - :qty',
    ConditionExpression='quantity >= :qty',
    ExpressionAttributeValues={':qty': order_qty}
)
```

</div>

</div>

### 2. Cart Consistency Across Devices

```
Device A                    Device B
    │                           │
    │  Add Item X               │
    │  ───────▶ Redis           │
    │           │               │
    │           │  Pub/Sub      │
    │           │  ─────────────▶ Update Cart View
    │           │               │
    │           │               │  Add Item Y
    │  Update   │  ◀────────────│
    │  Cart     │               │
    │           │               │

Strategy: Redis + WebSocket for real-time sync
```

### 3. Search Index Consistency

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 20px; margin: 16px 0;">

```
Product Update Flow:

1. Update DynamoDB (source of truth)
2. DynamoDB Stream triggers Lambda
3. Lambda publishes to Kafka
4. Search Indexer consumes from Kafka
5. Update OpenSearch index

Eventual consistency: ~1-5 seconds lag
```

</div>

### 4. Rate Limiting Strategy

```
┌─────────────────────────────────────────────────────┐
│                 RATE LIMITING TIERS                  │
├─────────────────────────────────────────────────────┤
│ Anonymous Users:     100 requests/minute             │
│ Logged-in Users:     1000 requests/minute           │
│ Prime Members:       5000 requests/minute           │
│ Seller API:          10000 requests/minute          │
│                                                      │
│ Implementation: Token Bucket with Redis              │
│ Scope: Per user + per IP + per endpoint             │
└─────────────────────────────────────────────────────┘
```

</div>

---

## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

### Key Discussion Points

1. **Start with requirements clarification** - Is this B2C or B2B? What's the product type?
2. **Discuss trade-offs** - Why DynamoDB over MongoDB for catalog?
3. **Address hot partitions** - Popular products need caching strategies
4. **Payment reliability** - Idempotency, exactly-once semantics
5. **Search relevance** - How to rank products, personalization

### Common Follow-ups

- How would you handle Prime Day traffic (100x spike)?
- How do you ensure inventory accuracy across warehouses?
- How would you implement product recommendations?
- How do you handle fraudulent orders?

</div>
