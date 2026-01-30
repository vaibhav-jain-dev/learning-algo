# Design Amazon (E-Commerce Platform)

## Problem Statement

Design a large-scale e-commerce platform like Amazon that handles product catalog, search, shopping cart, checkout, payments, order management, and delivery tracking.

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f0883e;">

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

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #1d4ed8; margin: 0 0 12px 0;">Customer</h4>
<ul style="color: #475569; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Browse/search products</li>
<li>View product details</li>
<li>Add to cart/wishlist</li>
<li>Checkout & pay</li>
<li>Track orders</li>
<li>Write reviews</li>
</ul>
</div>

<div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #7c3aed; margin: 0 0 12px 0;">Seller</h4>
<ul style="color: #475569; font-size: 13px; margin: 0; padding-left: 16px;">
<li>List products</li>
<li>Manage inventory</li>
<li>Process orders</li>
<li>Handle returns</li>
<li>View analytics</li>
<li>Manage pricing</li>
</ul>
</div>

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 20px;">
<h4 style="color: #16a34a; margin: 0 0 12px 0;">System</h4>
<ul style="color: #475569; font-size: 13px; margin: 0; padding-left: 16px;">
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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #1d4ed8; text-align: center; margin: 0 0 24px 0;">AMAZON E-COMMERCE ARCHITECTURE</h3>

<div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">

    <!-- CDN Layer -->
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 12px; padding: 16px 32px; text-align: center; color: white;">
<strong>CloudFront (CDN)</strong>
</div>

<div style="color: #3b82f6; font-size: 24px;">↓</div>

    <!-- Client Apps -->
<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 10px; padding: 12px 20px; color: white; text-align: center; min-width: 120px;">
<strong>Web App</strong><br><span style="font-size: 11px;">(React/Next)</span>
</div>
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 10px; padding: 12px 20px; color: white; text-align: center; min-width: 120px;">
<strong>Mobile API</strong><br><span style="font-size: 11px;">Gateway</span>
</div>
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 10px; padding: 12px 20px; color: white; text-align: center; min-width: 120px;">
<strong>Seller API</strong><br><span style="font-size: 11px;">Gateway</span>
</div>
</div>

<div style="color: #3b82f6; font-size: 24px;">↓</div>

          <!-- API Gateway -->
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border-radius: 12px; padding: 16px 32px; text-align: center; color: white;">
<strong>API Gateway</strong><br><span style="font-size: 12px;">Rate Limiting, Auth, Routing</span>
</div>

<div style="color: #3b82f6; font-size: 24px;">↓</div>

            <!-- Microservices Layer -->
<div style="background: #f1f5f9; border: 2px solid #3b82f6; border-radius: 16px; padding: 20px; width: 100%; max-width: 800px;">
<div style="text-align: center; color: #1d4ed8; font-weight: bold; margin-bottom: 12px;">SERVICE MESH (Envoy/Istio)</div>

<div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-bottom: 16px;">
<div style="background: #dbeafe; border: 1px solid #3b82f6; border-radius: 8px; padding: 10px 16px; text-align: center; min-width: 100px;"><strong style="color: #1d4ed8;">Product</strong><br><span style="font-size: 11px; color: #475569;">Service</span></div>
<div style="background: #dbeafe; border: 1px solid #3b82f6; border-radius: 8px; padding: 10px 16px; text-align: center; min-width: 100px;"><strong style="color: #1d4ed8;">Search</strong><br><span style="font-size: 11px; color: #475569;">Service</span></div>
<div style="background: #dbeafe; border: 1px solid #3b82f6; border-radius: 8px; padding: 10px 16px; text-align: center; min-width: 100px;"><strong style="color: #1d4ed8;">Cart</strong><br><span style="font-size: 11px; color: #475569;">Service</span></div>
<div style="background: #dbeafe; border: 1px solid #3b82f6; border-radius: 8px; padding: 10px 16px; text-align: center; min-width: 100px;"><strong style="color: #1d4ed8;">Order</strong><br><span style="font-size: 11px; color: #475569;">Service</span></div>
<div style="background: #dbeafe; border: 1px solid #3b82f6; border-radius: 8px; padding: 10px 16px; text-align: center; min-width: 100px;"><strong style="color: #1d4ed8;">Payment</strong><br><span style="font-size: 11px; color: #475569;">Service</span></div>
</div>

<div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
<div style="background: #dcfce7; border: 1px solid #22c55e; border-radius: 8px; padding: 10px 16px; text-align: center; min-width: 100px;"><strong style="color: #16a34a;">Inventory</strong><br><span style="font-size: 11px; color: #475569;">Service</span></div>
<div style="background: #dcfce7; border: 1px solid #22c55e; border-radius: 8px; padding: 10px 16px; text-align: center; min-width: 100px;"><strong style="color: #16a34a;">User</strong><br><span style="font-size: 11px; color: #475569;">Service</span></div>
<div style="background: #dcfce7; border: 1px solid #22c55e; border-radius: 8px; padding: 10px 16px; text-align: center; min-width: 100px;"><strong style="color: #16a34a;">Notification</strong><br><span style="font-size: 11px; color: #475569;">Service</span></div>
<div style="background: #dcfce7; border: 1px solid #22c55e; border-radius: 8px; padding: 10px 16px; text-align: center; min-width: 100px;"><strong style="color: #16a34a;">Shipping</strong><br><span style="font-size: 11px; color: #475569;">Service</span></div>
<div style="background: #dcfce7; border: 1px solid #22c55e; border-radius: 8px; padding: 10px 16px; text-align: center; min-width: 100px;"><strong style="color: #16a34a;">Review</strong><br><span style="font-size: 11px; color: #475569;">Service</span></div>
</div>

<div style="text-align: center; color: #475569; font-size: 12px; margin-top: 12px;">MICROSERVICES LAYER</div>
</div>

<div style="color: #3b82f6; font-size: 24px;">↓</div>

                                <!-- Event Streaming Layer -->
<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 16px; padding: 16px; width: 100%; max-width: 800px; text-align: center;">
<strong style="color: #d97706;">MESSAGE BUS (Kafka)</strong>
<div style="color: #475569; font-size: 12px; margin-top: 4px;">EVENT STREAMING LAYER</div>
</div>

<div style="color: #3b82f6; font-size: 24px;">↓</div>

                                <!-- Data Layer -->
<div style="background: #f1f5f9; border: 2px solid #7c3aed; border-radius: 16px; padding: 20px; width: 100%; max-width: 800px;">
<div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
<div style="background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%); border-radius: 8px; padding: 10px 16px; text-align: center; color: white; min-width: 100px;"><strong>DynamoDB</strong><br><span style="font-size: 11px;">(Catalog)</span></div>
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 8px; padding: 10px 16px; text-align: center; color: white; min-width: 100px;"><strong>Aurora</strong><br><span style="font-size: 11px;">(Orders)</span></div>
<div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 8px; padding: 10px 16px; text-align: center; color: white; min-width: 100px;"><strong>Elasticsearch</strong><br><span style="font-size: 11px;">(Search)</span></div>
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border-radius: 8px; padding: 10px 16px; text-align: center; color: white; min-width: 100px;"><strong>Redis</strong><br><span style="font-size: 11px;">(Cache)</span></div>
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 8px; padding: 10px 16px; text-align: center; color: white; min-width: 100px;"><strong>S3</strong><br><span style="font-size: 11px;">(Images)</span></div>
</div>
<div style="text-align: center; color: #475569; font-size: 12px; margin-top: 12px;">DATA LAYER</div>
</div>

</div>

</div>

                                      ---

                                      ## Phase 1: Starting Phase (Low Budget)

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

                                          ### Assumptions
                                          - **Users**: 1,000 - 50,000 monthly active users
                                          - **Products**: 10,000 - 100,000 SKUs
                                          - **Orders**: 100 - 1,000 orders/day
                                          - **Budget**: $500 - $3,000/month
                                          - **Team**: 3-8 developers

                                          ### Monolithic Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

<div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">

                                              <!-- Monolith Container -->
<div style="background: #f1f5f9; border: 2px solid #3b82f6; border-radius: 16px; padding: 20px; width: 100%; max-width: 700px;">
<h4 style="text-align: center; color: #1d4ed8; margin: 0 0 16px 0;">E-COMMERCE MONOLITH</h4>

                                                <!-- Presentation Layer -->
<div style="background: #dbeafe; border: 1px solid #3b82f6; border-radius: 12px; padding: 16px; margin-bottom: 12px;">
<div style="text-align: center; color: #1d4ed8; font-weight: bold; margin-bottom: 12px;">PRESENTATION LAYER</div>
<div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
<div style="background: white; border-radius: 8px; padding: 10px 16px; text-align: center; min-width: 100px;"><strong style="color: #1d4ed8;">Web Pages</strong><br><span style="font-size: 11px; color: #475569;">(Templates)</span></div>
<div style="background: white; border-radius: 8px; padding: 10px 16px; text-align: center; min-width: 100px;"><strong style="color: #1d4ed8;">REST API</strong><br><span style="font-size: 11px; color: #475569;">(JSON)</span></div>
<div style="background: white; border-radius: 8px; padding: 10px 16px; text-align: center; min-width: 100px;"><strong style="color: #1d4ed8;">Admin Panel</strong><br><span style="font-size: 11px; color: #475569;">(Dashboard)</span></div>
</div>
</div>

                                                      <!-- Business Logic Layer -->
<div style="background: #f0fdf4; border: 1px solid #22c55e; border-radius: 12px; padding: 16px; margin-bottom: 12px;">
<div style="text-align: center; color: #16a34a; font-weight: bold; margin-bottom: 12px;">BUSINESS LOGIC LAYER</div>
<div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 10px;">
<div style="background: white; border-radius: 6px; padding: 8px 14px; text-align: center;"><strong style="color: #16a34a; font-size: 13px;">Products</strong></div>
<div style="background: white; border-radius: 6px; padding: 8px 14px; text-align: center;"><strong style="color: #16a34a; font-size: 13px;">Cart</strong></div>
<div style="background: white; border-radius: 6px; padding: 8px 14px; text-align: center;"><strong style="color: #16a34a; font-size: 13px;">Orders</strong></div>
</div>
<div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 10px;">
<div style="background: white; border-radius: 6px; padding: 8px 14px; text-align: center;"><strong style="color: #16a34a; font-size: 13px;">Users</strong></div>
<div style="background: white; border-radius: 6px; padding: 8px 14px; text-align: center;"><strong style="color: #16a34a; font-size: 13px;">Payments</strong></div>
<div style="background: white; border-radius: 6px; padding: 8px 14px; text-align: center;"><strong style="color: #16a34a; font-size: 13px;">Inventory</strong></div>
</div>
<div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
<div style="background: white; border-radius: 6px; padding: 8px 14px; text-align: center;"><strong style="color: #16a34a; font-size: 13px;">Search</strong></div>
<div style="background: white; border-radius: 6px; padding: 8px 14px; text-align: center;"><strong style="color: #16a34a; font-size: 13px;">Reviews</strong></div>
</div>
</div>

                                                      <!-- Data Access Layer -->
<div style="background: #faf5ff; border: 1px solid #7c3aed; border-radius: 12px; padding: 12px; text-align: center;">
<strong style="color: #7c3aed;">DATA ACCESS LAYER</strong><br>
<span style="font-size: 12px; color: #475569;">(ORM: Django ORM / SQLAlchemy / TypeORM)</span>
</div>
</div>

<div style="color: #3b82f6; font-size: 24px;">↓</div>

                                                      <!-- Databases -->
<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); border-radius: 10px; padding: 12px 20px; color: white; text-align: center; min-width: 100px;">
<strong>PostgreSQL</strong>
</div>
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); border-radius: 10px; padding: 12px 20px; color: white; text-align: center; min-width: 100px;">
<strong>Redis</strong><br><span style="font-size: 11px;">(Cache/Sessions)</span>
</div>
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 10px; padding: 12px 20px; color: white; text-align: center; min-width: 100px;">
<strong>S3</strong><br><span style="font-size: 11px;">(Images)</span>
</div>
</div>

</div>

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
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

                                                      ### Assumptions
                                                      - **Users**: 500,000 - 5M monthly active users
                                                      - **Products**: 1M - 10M SKUs
                                                      - **Orders**: 10,000 - 100,000 orders/day
                                                      - **Budget**: $20,000 - $100,000/month
                                                      - **Team**: 20-50 developers

                                                      ### Modular Monolith Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 16px 0;">
<h4 style="color: #1d4ed8; text-align: center; margin: 0 0 24px 0;">DOMAIN-DRIVEN MICROSERVICES</h4>

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
<h5 style="color: #1d4ed8; margin: 0 0 8px 0;">Synchronous (REST/gRPC)</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Cart → Inventory (check stock)</li>
<li>Order → Payment (process)</li>
<li>User → Auth (validate token)</li>
</ul>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 16px;">
<h5 style="color: #16a34a; margin: 0 0 8px 0;">Asynchronous (Kafka)</h5>
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
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

                                                      ### Assumptions
                                                      - **Users**: 300M+ monthly active users
                                                      - **Products**: 500M+ SKUs
                                                      - **Orders**: 10M+ orders/day (100K+/min peak)
                                                      - **Budget**: $5M+/month
                                                      - **Team**: 1000+ engineers

                                                      ### Global Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #f0883e; text-align: center; margin: 0 0 24px 0;">SHARDING STRATEGIES</h4>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 20px;">
<h5 style="color: #1d4ed8; margin: 0 0 12px 0;">Products (DynamoDB)</h5>

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
<h5 style="color: #16a34a; margin: 0 0 12px 0;">Orders (Aurora)</h5>

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h4 style="color: #1d4ed8; text-align: center; margin: 0 0 24px 0;">SAGA PATTERN FOR DISTRIBUTED CHECKOUT</h4>

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

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

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

                                                    ### 1. Inventory Consistency

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 16px 0;">

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 20px;">
<h5 style="color: #f85149; margin: 0 0 12px 0;">Problem: Overselling</h5>
<p style="color: #8b949e; font-size: 13px;">Multiple users buying last item simultaneously</p>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 20px;">
<h5 style="color: #16a34a; margin: 0 0 12px 0;">Solution: Optimistic Locking</h5>

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

                                                  ## Interview Deep Dive Questions

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #f0883e;">

                                                    Interviewers use these probing questions to test your depth of understanding. Here are the questions, what they're really probing, and how to answer effectively.

</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

                                                    ### 1. "Why DynamoDB for cart instead of Redis?"

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 16px 0;">

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 20px;">
<h5 style="color: #1d4ed8; margin: 0 0 12px 0;">What They're Probing</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Do you understand persistence vs. cache trade-offs?</li>
<li>Can you reason about data durability requirements?</li>
<li>Do you know when "fast" isn't the only consideration?</li>
</ul>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 20px;">
<h5 style="color: #16a34a; margin: 0 0 12px 0;">Strong Answer</h5>
<p style="color: #475569; font-size: 13px; margin: 0;">"At Amazon scale, carts represent potential revenue. Redis is faster but volatile - a Redis cluster restart loses carts. DynamoDB gives us durability with single-digit ms latency. We use Redis as a read-through cache in front of DynamoDB for hot carts. For checkout, we need the guarantee that the cart survives infrastructure failures."</p>
</div>

</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 16px; margin-top: 16px;">
<h5 style="color: #f0883e; margin: 0 0 8px 0;">When Simpler Works</h5>
<p style="color: #8b949e; font-size: 13px; margin: 0;">"At < 10K DAU, Redis with AOF persistence is fine. Cart loss is annoying but not catastrophic. You can even use PostgreSQL with a `carts` table - it handles 1000s of concurrent carts easily."</p>
</div>

                                                    ---

                                                    ### 2. "How do you prevent overselling during flash sales?"

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 16px 0;">

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 20px;">
<h5 style="color: #1d4ed8; margin: 0 0 12px 0;">What They're Probing</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Understanding of race conditions in distributed systems</li>
<li>Knowledge of pessimistic vs. optimistic locking</li>
<li>Ability to design for high-contention scenarios</li>
</ul>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 20px;">
<h5 style="color: #16a34a; margin: 0 0 12px 0;">Strong Answer</h5>
<p style="color: #475569; font-size: 13px; margin: 0;">"Three-layer approach: (1) Pre-sale queue with virtual waiting room to control concurrent requests, (2) Redis atomic decrement with Lua script for inventory - `DECR` returns new value atomically, reject if < 0, (3) DynamoDB conditional write as final check with `ConditionExpression: quantity >= :requested`. For ultra-hot items, we pre-shard inventory across multiple keys and aggregate."</p>
</div>

</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 16px; margin-top: 16px;">
<h5 style="color: #f0883e; margin: 0 0 8px 0;">When Simpler Works</h5>
<p style="color: #8b949e; font-size: 13px; margin: 0;">"At 1000 orders/day, PostgreSQL `SELECT FOR UPDATE` with a short transaction is sufficient. You won't hit lock contention. Even simpler: just let occasional oversells happen and handle via customer service - it's cheaper than engineering complexity."</p>
</div>

                                                    ---

                                                    ### 3. "Why not just use PostgreSQL for everything?"

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 16px 0;">

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 20px;">
<h5 style="color: #1d4ed8; margin: 0 0 12px 0;">What They're Probing</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Do you understand polyglot persistence?</li>
<li>Can you articulate when relational breaks down?</li>
<li>Do you have experience with real scaling challenges?</li>
</ul>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 20px;">
<h5 style="color: #16a34a; margin: 0 0 12px 0;">Strong Answer</h5>
<p style="color: #475569; font-size: 13px; margin: 0;">"For orders, PostgreSQL is perfect - ACID transactions, complex joins for reporting. But product catalog has different access patterns: 500M products, read-heavy (1000:1 read/write), needs single-digit ms latency, flexible schemas per category. DynamoDB handles this natively. PostgreSQL at this scale requires manual sharding, which is operationally complex. Search needs inverted indices - Elasticsearch does this 100x better than PostgreSQL's full-text search at scale."</p>
</div>

</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 16px; margin-top: 16px;">
<h5 style="color: #f0883e; margin: 0 0 8px 0;">When Simpler Works</h5>
<p style="color: #8b949e; font-size: 13px; margin: 0;">"Under 1M products and 100K users, PostgreSQL handles everything beautifully. Use JSONB columns for flexible product attributes, `tsvector` for search, and you're set for years. I've seen $10M/year e-commerce sites run on a single well-tuned PostgreSQL instance."</p>
</div>

                                                    ---

                                                    ### 4. "How would you handle Prime Day traffic (100x spike)?"

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 16px 0;">

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 20px;">
<h5 style="color: #1d4ed8; margin: 0 0 12px 0;">What They're Probing</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Understanding of capacity planning and load testing</li>
<li>Knowledge of graceful degradation patterns</li>
<li>Experience with auto-scaling and caching strategies</li>
</ul>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 20px;">
<h5 style="color: #16a34a; margin: 0 0 12px 0;">Strong Answer</h5>
<p style="color: #475569; font-size: 13px; margin: 0;">"Multi-pronged: (1) Pre-warm everything - EC2, Lambda, DynamoDB provisioned capacity 24h before, (2) Aggressive CDN caching - product pages become static HTML for 60s, (3) Queue non-critical work - email confirmations, analytics go to SQS, (4) Circuit breakers on recommendations - if ML service is slow, show trending instead, (5) Virtual waiting rooms for checkout to control database load. We practice with 'GameDay' load tests monthly."</p>
</div>

</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 16px; margin-top: 16px;">
<h5 style="color: #f0883e; margin: 0 0 8px 0;">When Simpler Works</h5>
<p style="color: #8b949e; font-size: 13px; margin: 0;">"For a 10x spike (typical holiday rush for SMB e-commerce), just over-provision 3x during sale period. A $200/month server becoming $600/month for a week is nothing compared to engineering complexity. Use Cloudflare in front for DDoS and caching."</p>
</div>

                                                    ---

                                                    ### 5. "Why Kafka for order events instead of SQS?"

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 16px 0;">

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 20px;">
<h5 style="color: #1d4ed8; margin: 0 0 12px 0;">What They're Probing</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Understanding of event streaming vs. message queues</li>
<li>Knowledge of event sourcing and replay capabilities</li>
<li>Ability to choose appropriate tools for requirements</li>
</ul>
</div>

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 20px;">
<h5 style="color: #16a34a; margin: 0 0 12px 0;">Strong Answer</h5>
<p style="color: #475569; font-size: 13px; margin: 0;">"Kafka provides event log semantics - we can replay order events to rebuild search indices, recalculate analytics, or debug issues. Multiple consumers read the same events (search indexer, email service, analytics, fraud detection) without coordination. SQS deletes after consumption. For checkout specifically, we actually use SQS - it's simpler, and we don't need replay. Kafka is for the event backbone where history matters."</p>
</div>

</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 16px; margin-top: 16px;">
<h5 style="color: #f0883e; margin: 0 0 8px 0;">When Simpler Works</h5>
<p style="color: #8b949e; font-size: 13px; margin: 0;">"You don't need Kafka for checkout - a simple SQS queue or even synchronous processing works fine under 10K orders/day. Kafka adds operational complexity (ZooKeeper, partition management). Start with SQS/RabbitMQ and migrate to Kafka only when you need event replay or high fan-out."</p>
</div>

</div>

                                                  ---

                                                  ## Why This Technology?

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 16px; padding: 24px; margin: 20px 0; border-left: 4px solid #3b82f6;">

                                                    Understanding **why** specific technologies are chosen demonstrates architectural maturity. Interviewers want to see you can reason about trade-offs, not just list technologies.

</div>

                                                  ### Decision Matrix

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0; overflow-x: auto;">

                                                    | Component | Technology | Why This? | Alternative | When Alternative Wins |
                                                    |-----------|------------|-----------|-------------|----------------------|
                                                    | **Product Catalog** | DynamoDB | Single-digit ms at any scale, flexible schema per category, auto-sharding | MongoDB | Need complex queries, aggregations, or $lookup joins |
                                                    | **Orders** | Aurora PostgreSQL | ACID for money, complex reporting queries, familiar SQL | CockroachDB | Multi-region active-active writes required |
                                                    | **Cart** | DynamoDB + Redis | Durability (DynamoDB) + Speed (Redis cache) | Redis only | Cart loss acceptable, < 50K users |
                                                    | **Search** | OpenSearch | Full-text, facets, relevance tuning, integrates with product catalog | Algolia | Need instant search, smaller catalog < 1M |
                                                    | **CDN** | CloudFront | AWS integration, Lambda@Edge, cost-effective | Fastly | Need edge compute, real-time purging |
                                                    | **Events** | Kafka (MSK) | Event replay, multiple consumers, high throughput | SQS | Simple queue needed, no replay requirement |
                                                    | **Cache** | ElastiCache Redis | Sub-ms latency, rich data structures, pub/sub | Memcached | Simple key-value only, multi-threaded needed |

</div>

                                                  ### Deep Dive: Critical Decisions

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px;">
<h4 style="color: #1d4ed8; margin: 0 0 16px 0;">DynamoDB for Product Catalog</h4>

<div style="background: rgba(126, 231, 135, 0.1); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
<h5 style="color: #16a34a; margin: 0 0 8px 0;">Pros</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Consistent single-digit ms latency at any scale</li>
<li>No capacity planning - auto-scales</li>
<li>Flexible attributes per category (JSONB-like)</li>
<li>Global tables for multi-region</li>
</ul>
</div>

<div style="background: rgba(248, 81, 73, 0.1); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
<h5 style="color: #f85149; margin: 0 0 8px 0;">Cons</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>No joins - denormalization required</li>
<li>GSI limits (20 per table)</li>
<li>Query patterns must be known upfront</li>
<li>Cost at very high throughput</li>
</ul>
</div>

<div style="background: rgba(137, 87, 229, 0.1); border-radius: 8px; padding: 12px;">
<h5 style="color: #7c3aed; margin: 0 0 8px 0;">Mitigation</h5>
<p style="color: #8b949e; font-size: 13px; margin: 0;">Use OpenSearch for complex queries. Denormalize seller info into product records. Cache GSI results in Redis.</p>
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px;">
<h4 style="color: #1d4ed8; margin: 0 0 16px 0;">Aurora for Orders</h4>

<div style="background: rgba(126, 231, 135, 0.1); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
<h5 style="color: #16a34a; margin: 0 0 8px 0;">Pros</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>ACID transactions for payment integrity</li>
<li>Complex queries for analytics/reporting</li>
<li>15 read replicas for scaling reads</li>
<li>Point-in-time recovery</li>
</ul>
</div>

<div style="background: rgba(248, 81, 73, 0.1); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
<h5 style="color: #f85149; margin: 0 0 8px 0;">Cons</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Write scaling limited (vertical primarily)</li>
<li>Cross-region writes need careful handling</li>
<li>Cost higher than RDS PostgreSQL</li>
<li>Sharding requires application logic</li>
</ul>
</div>

<div style="background: rgba(137, 87, 229, 0.1); border-radius: 8px; padding: 12px;">
<h5 style="color: #7c3aed; margin: 0 0 8px 0;">Mitigation</h5>
<p style="color: #8b949e; font-size: 13px; margin: 0;">Shard by user_id at scale. Use read replicas for analytics. Consider Aurora Serverless v2 for variable load.</p>
</div>
</div>

</div>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px;">
<h4 style="color: #1d4ed8; margin: 0 0 16px 0;">Kafka for Event Streaming</h4>

<div style="background: rgba(126, 231, 135, 0.1); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
<h5 style="color: #16a34a; margin: 0 0 8px 0;">Pros</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Event replay for rebuilding state</li>
<li>Multiple consumers without duplication</li>
<li>High throughput (millions/sec)</li>
<li>Durable log with configurable retention</li>
</ul>
</div>

<div style="background: rgba(248, 81, 73, 0.1); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
<h5 style="color: #f85149; margin: 0 0 8px 0;">Cons</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Operational complexity (ZooKeeper/KRaft)</li>
<li>Partition rebalancing can cause delays</li>
<li>No built-in dead letter queue</li>
<li>Requires expertise to tune</li>
</ul>
</div>

<div style="background: rgba(137, 87, 229, 0.1); border-radius: 8px; padding: 12px;">
<h5 style="color: #7c3aed; margin: 0 0 8px 0;">Mitigation</h5>
<p style="color: #8b949e; font-size: 13px; margin: 0;">Use MSK for managed operations. Implement custom DLQ with separate topic. Start with fewer partitions and scale up.</p>
</div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px;">
<h4 style="color: #1d4ed8; margin: 0 0 16px 0;">Microservices Architecture</h4>

<div style="background: rgba(126, 231, 135, 0.1); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
<h5 style="color: #16a34a; margin: 0 0 8px 0;">Pros</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Independent deployment and scaling</li>
<li>Technology flexibility per service</li>
<li>Team autonomy and ownership</li>
<li>Fault isolation</li>
</ul>
</div>

<div style="background: rgba(248, 81, 73, 0.1); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
<h5 style="color: #f85149; margin: 0 0 8px 0;">Cons</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Network latency and failures</li>
<li>Distributed transaction complexity</li>
<li>Operational overhead (observability)</li>
<li>Data consistency challenges</li>
</ul>
</div>

<div style="background: rgba(137, 87, 229, 0.1); border-radius: 8px; padding: 12px;">
<h5 style="color: #7c3aed; margin: 0 0 8px 0;">Mitigation</h5>
<p style="color: #8b949e; font-size: 13px; margin: 0;">Start with modular monolith. Use service mesh for observability. Implement saga pattern for distributed transactions. Invest in good CI/CD.</p>
</div>
</div>

</div>

                                                  ---

                                                  ## When Simpler Solutions Work

<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 12px; padding: 4px; margin: 20px 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 24px;">

<div style="background: rgba(126, 231, 135, 0.1); border: 1px solid #7ee787; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
<h4 style="color: #16a34a; margin: 0 0 12px 0;">The $500/month E-Commerce Platform</h4>
<p style="color: #475569; font-size: 14px; margin: 0 0 16px 0;">A real architecture that handles $2M/year in revenue:</p>

                                                        ```
                                                        ┌─────────────────────────────────────────────────────────────────┐
                                                        │                    PRACTICAL SMB ARCHITECTURE                    │
                                                        │                                                                  │
                                                        │   Cloudflare (Free/Pro)           DigitalOcean Droplet ($48/mo) │
                                                        │   ┌───────────────────┐           ┌─────────────────────────┐   │
                                                        │   │ CDN + DDoS + Cache│──────────▶│  Django/Rails/Laravel   │   │
                                                        │   │ + Free SSL        │           │  + PostgreSQL           │   │
                                                        │   └───────────────────┘           │  + Redis (same box)     │   │
                                                        │                                   └─────────────────────────┘   │
                                                        │                                              │                   │
                                                        │   ┌───────────────────┐           ┌─────────────────────────┐   │
                                                        │   │  Stripe           │◀──────────│  S3 ($10/mo images)     │   │
                                                        │   │  (payments)       │           │  + Backblaze B2 backup  │   │
                                                        │   └───────────────────┘           └─────────────────────────┘   │
                                                        │                                                                  │
                                                        │   Total: ~$100/month for 10K+ products, 1000 orders/day         │
                                                        └─────────────────────────────────────────────────────────────────┘
                                                        ```

</div>

                                                      ### When MongoDB Alone is Enough

<div style="background: rgba(88, 166, 255, 0.1); border: 1px solid #58a6ff; border-radius: 12px; padding: 20px; margin-bottom: 16px;">

                                                        **Use MongoDB as your single database when:**
                                                        - < 100K products with variable attributes
                                                        - < 5K orders/day (MongoDB transactions work fine)
                                                        - Need flexible schema for product variations
                                                        - Team knows MongoDB well
                                                        - Don't need complex SQL reporting

                                                        ```javascript
                                                        // MongoDB handles products AND orders just fine at this scale
                                                        db.products.find({
                                                        category: "electronics",
                                                        "attributes.brand": "Apple",
                                                        price: { $lt: 1000 }
                                                        }).sort({ sales_rank: 1 })

                                                        // Even transactions work for checkout
                                                        session.withTransaction(async () => {
                                                        await db.inventory.updateOne(
                                                        { sku: "ABC123", quantity: { $gte: 1 } },
                                                        { $inc: { quantity: -1 } }
                                                        );
                                                        await db.orders.insertOne({ ... });
                                                        });
                                                        ```

</div>

                                                      ### When You Don't Need Elasticsearch

<div style="background: rgba(137, 87, 229, 0.1); border: 1px solid #a371f7; border-radius: 12px; padding: 20px; margin-bottom: 16px;">

                                                        **PostgreSQL full-text search handles:**
                                                        - < 1M products easily
                                                        - Basic text search with ranking
                                                        - Category filtering with GIN indexes
                                                        - Most e-commerce search needs

                                                        ```sql
                                                        -- PostgreSQL full-text search is surprisingly capable
                                                        CREATE INDEX idx_product_search ON products
                                                        USING GIN (to_tsvector('english', name || ' ' || description));

                                                        SELECT *, ts_rank(
                                                        to_tsvector('english', name || ' ' || description),
                                                        plainto_tsquery('english', 'wireless headphones')
                                                        ) as rank
                                                        FROM products
                                                        WHERE to_tsvector('english', name || ' ' || description)
                                                        @@ plainto_tsquery('english', 'wireless headphones')
                                                        ORDER BY rank DESC, sales_count DESC
                                                        LIMIT 20;

                                                        -- Add filters with regular WHERE clauses
                                                        -- This handles 90% of e-commerce search use cases
                                                        ```

                                                        **Only add Elasticsearch when you need:**
                                                        - Fuzzy matching and typo tolerance
                                                        - Complex faceted navigation (10+ filters)
                                                        - Real-time search suggestions
                                                        - > 1M products with sub-100ms response

</div>

                                                      ### Simpler Alternatives Table

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

                                                        | Complex Solution | Simpler Alternative | Use Simpler When |
                                                        |-----------------|---------------------|------------------|
                                                        | **Kafka + multiple services** | SQS + Lambda | < 10K orders/day, no event replay needed |
                                                        | **DynamoDB + OpenSearch** | PostgreSQL + pg_trgm | < 1M products, < 100K DAU |
                                                        | **Microservices** | Modular monolith | < 20 developers, single deployment unit OK |
                                                        | **Redis cluster** | Single Redis instance | < 50K concurrent users, < 100GB cache |
                                                        | **Kubernetes (EKS)** | ECS or even EC2 + Docker Compose | < 10 services, predictable load |
                                                        | **Aurora Global** | Aurora single-region + read replicas | Users in one geography |
                                                        | **Custom ML recommendations** | Algolia Recommend or simple "also bought" | < 100K products |
                                                        | **Event sourcing** | Simple CRUD with audit log | Don't need to replay history |

</div>

                                                      ### Scale Thresholds - When to Upgrade

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 16px 0;">

                                                        ```
                                                        ┌─────────────────────────────────────────────────────────────────┐
                                                        │                    COMPLEXITY TRIGGER POINTS                     │
                                                        ├─────────────────────────────────────────────────────────────────┤
                                                        │                                                                  │
                                                        │  ORDERS/DAY        ARCHITECTURE RECOMMENDATION                   │
                                                        │  ───────────       ─────────────────────────────                │
                                                        │  < 1,000           Single server, PostgreSQL, sync processing   │
                                                        │  1K - 10K          Add Redis cache, async emails via Celery     │
                                                        │  10K - 50K         Read replicas, message queue, CDN            │
                                                        │  50K - 100K        Consider service extraction, search cluster  │
                                                        │  > 100K            Microservices, event streaming, multi-region │
                                                        │                                                                  │
                                                        │  PRODUCTS          SEARCH RECOMMENDATION                         │
                                                        │  ────────          ─────────────────────                        │
                                                        │  < 100K            PostgreSQL full-text search                  │
                                                        │  100K - 1M         PostgreSQL + pg_trgm, or Algolia             │
                                                        │  1M - 10M          Elasticsearch/OpenSearch cluster             │
                                                        │  > 10M             Sharded Elasticsearch + vector search        │
                                                        │                                                                  │
                                                        │  TEAM SIZE         ARCHITECTURE RECOMMENDATION                   │
                                                        │  ─────────         ─────────────────────────────                │
                                                        │  1-5 devs          Monolith, single database                    │
                                                        │  5-15 devs         Modular monolith, maybe 2-3 services         │
                                                        │  15-50 devs        Domain-based services, shared libraries      │
                                                        │  > 50 devs         Full microservices, platform team            │
                                                        │                                                                  │
                                                        └─────────────────────────────────────────────────────────────────┘
                                                        ```

</div>

</div>
</div>

                                                  ---

                                                  ## Trade-off Analysis & Mitigation

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">

                                                    Every architectural decision has costs. Here's how to acknowledge and manage them.

<div style="display: grid; grid-template-columns: 1fr; gap: 20px; margin: 20px 0;">

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 20px;">
<h4 style="color: #f85149; margin: 0 0 16px 0;">CON: Eventual Consistency in Catalog</h4>

<p style="color: #475569; font-size: 14px;"><strong>The Problem:</strong> Product updates in DynamoDB take 1-5 seconds to appear in OpenSearch. User might see stale prices or inventory.</p>

<div style="background: rgba(126, 231, 135, 0.1); border-radius: 8px; padding: 12px; margin-top: 12px;">
<h5 style="color: #16a34a; margin: 0 0 8px 0;">Mitigation Strategies</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Always fetch price/inventory from source at checkout (not cache)</li>
<li>Show "prices may vary" disclaimer on search results</li>
<li>For critical updates (out of stock), use synchronous write-through</li>
<li>Display "last updated" timestamp on product pages</li>
</ul>
</div>
</div>

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 20px;">
<h4 style="color: #f85149; margin: 0 0 16px 0;">CON: Microservices Network Latency</h4>

<p style="color: #475569; font-size: 14px;"><strong>The Problem:</strong> Product page requires 5 service calls (product, inventory, reviews, recommendations, seller). Network adds 50-100ms.</p>

<div style="background: rgba(126, 231, 135, 0.1); border-radius: 8px; padding: 12px; margin-top: 12px;">
<h5 style="color: #16a34a; margin: 0 0 8px 0;">Mitigation Strategies</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Parallel calls with Promise.all() / asyncio.gather()</li>
<li>BFF (Backend for Frontend) pattern - aggregate in one API call</li>
<li>Cache aggregated product view in Redis (5-minute TTL)</li>
<li>Async load non-critical data (reviews, recommendations)</li>
<li>Service mesh with connection pooling (Envoy, Linkerd)</li>
</ul>
</div>
</div>

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 20px;">
<h4 style="color: #f85149; margin: 0 0 16px 0;">CON: Distributed Transaction Complexity</h4>

<p style="color: #475569; font-size: 14px;"><strong>The Problem:</strong> Checkout spans inventory, payment, order services. Payment succeeds but order creation fails - now what?</p>

<div style="background: rgba(126, 231, 135, 0.1); border-radius: 8px; padding: 12px; margin-top: 12px;">
<h5 style="color: #16a34a; margin: 0 0 8px 0;">Mitigation Strategies</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Saga pattern with compensation actions (refund payment, release inventory)</li>
<li>Idempotency keys on all operations for safe retry</li>
<li>Reserve inventory with TTL, confirm/release explicitly</li>
<li>Payment authorization (not capture) until order confirmed</li>
<li>Dedicated saga orchestrator service with state machine</li>
</ul>
</div>
</div>

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 20px;">
<h4 style="color: #f85149; margin: 0 0 16px 0;">CON: Kafka Operational Complexity</h4>

<p style="color: #475569; font-size: 14px;"><strong>The Problem:</strong> Consumer lag, partition rebalancing during deploys, no built-in DLQ, requires dedicated expertise.</p>

<div style="background: rgba(126, 231, 135, 0.1); border-radius: 8px; padding: 12px; margin-top: 12px;">
<h5 style="color: #16a34a; margin: 0 0 8px 0;">Mitigation Strategies</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Use MSK (managed Kafka) to avoid ZooKeeper management</li>
<li>Implement custom DLQ topic with retry logic</li>
<li>Use static partition assignment to avoid rebalancing</li>
<li>Monitor consumer lag with Prometheus/Grafana alerts</li>
<li>Consider Kafka Connect for standard integrations</li>
</ul>
</div>
</div>

<div style="background: rgba(248, 81, 73, 0.1); border: 1px solid #f85149; border-radius: 12px; padding: 20px;">
<h4 style="color: #f85149; margin: 0 0 16px 0;">CON: Multi-Region Data Consistency</h4>

<p style="color: #475569; font-size: 14px;"><strong>The Problem:</strong> US user places order, immediately checks from EU - order not visible due to replication lag.</p>

<div style="background: rgba(126, 231, 135, 0.1); border-radius: 8px; padding: 12px; margin-top: 12px;">
<h5 style="color: #16a34a; margin: 0 0 8px 0;">Mitigation Strategies</h5>
<ul style="color: #8b949e; font-size: 13px; margin: 0; padding-left: 16px;">
<li>Route user to primary region for writes, read from local replica</li>
<li>Sticky sessions - user stays in same region for session duration</li>
<li>Read-your-writes: include version/timestamp in response, check before reading</li>
<li>For critical reads (order confirmation), query primary</li>
<li>Aurora Global Database with write forwarding</li>
</ul>
</div>
</div>

</div>
</div>

                                                  ---

                                                  ## Interview Tips

<div style="background: linear-gradient(135deg, #2d1f3d 0%, #4a3a5d 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

                                                    ### Key Discussion Points

                                                    1. **Start with requirements clarification** - Is this B2C or B2B? What's the product type? What geography?
                                                    2. **State your scale assumptions explicitly** - "I'm designing for 10M DAU, 500M products"
                                                    3. **Discuss trade-offs proactively** - "DynamoDB gives us latency but costs us query flexibility"
                                                    4. **Address hot partitions** - Popular products need caching strategies
                                                    5. **Payment reliability** - Idempotency, exactly-once semantics, PCI compliance
                                                    6. **Search relevance** - How to rank products, personalization, handling typos

                                                    ### Common Follow-ups

                                                    - How would you handle Prime Day traffic (100x spike)?
                                                    - How do you ensure inventory accuracy across warehouses?
                                                    - How would you implement product recommendations at scale?
                                                    - How do you handle fraudulent orders?
                                                    - What happens if the payment service is down during checkout?

</div>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #3d1f1f 0%, #5a3a3a 100%); border-radius: 12px; padding: 24px;">
<h4 style="color: #f85149; margin: 0 0 16px 0;">Red Flags - Avoid These</h4>
<ul style="color: #475569; font-size: 13px; padding-left: 20px;">
<li>"We need microservices because Amazon uses them" (cargo culting)</li>
<li>Jumping to complex solutions without discussing scale requirements</li>
<li>Not mentioning caching when discussing product pages</li>
<li>Ignoring the consistency vs. availability trade-off</li>
<li>"Kafka for everything" without justifying why not SQS</li>
<li>Not discussing how to handle payment failures</li>
<li>Forgetting about mobile clients and API design</li>
<li>No mention of observability (logging, tracing, metrics)</li>
<li>Designing multi-region for a startup with 1000 users</li>
<li>"We'll just use blockchain for inventory" (seriously, people say this)</li>
</ul>
</div>

<div style="background: linear-gradient(135deg, #1f3d2d 0%, #3a5a4a 100%); border-radius: 12px; padding: 24px;">
<h4 style="color: #16a34a; margin: 0 0 16px 0;">Impressive Statements</h4>
<ul style="color: #475569; font-size: 13px; padding-left: 20px;">
<li>"At 1000 orders/day, a monolith with PostgreSQL is the right choice"</li>
<li>"We'd use optimistic locking with DynamoDB conditional writes for inventory"</li>
<li>"The product page should be cacheable at CDN for 60 seconds with stale-while-revalidate"</li>
<li>"Payments need idempotency keys to handle retries safely"</li>
<li>"We'd use a saga pattern for checkout with compensation actions"</li>
<li>"Search results can be eventually consistent, but checkout must read from source of truth"</li>
<li>"I'd start with a modular monolith and extract services based on team/scaling needs"</li>
<li>"For Prime Day, we pre-warm capacity and implement circuit breakers on non-critical services"</li>
<li>"You don't need Kafka for checkout - SQS works fine under 100K orders/day"</li>
<li>"PostgreSQL handles 1M products with full-text search - we'd add Elasticsearch only when we see latency issues"</li>
</ul>
</div>

</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">

                                                    ### The Perfect Interview Flow

                                                    ```
                                                    1. CLARIFY (2-3 min)
                                                    "What scale are we designing for? B2C or marketplace?
                                                    What's the read/write ratio? Which geography?"

                                                    2. HIGH-LEVEL DESIGN (5-7 min)
                                                    Draw the main components. Explain WHY each exists.
                                                    "Products in DynamoDB because of scale and latency requirements..."

                                                    3. DEEP DIVE (15-20 min)
                                                    Pick 2-3 areas and go deep. Interviewer will guide you.
                                                    - Checkout flow with saga pattern
                                                    - Search indexing pipeline
                                                    - Inventory consistency

                                                    4. SCALE & FAILURE MODES (5-10 min)
                                                    "For Prime Day, we'd pre-warm, add circuit breakers, queue non-critical work..."
                                                    "If payment service is down, we show a friendly error and retry with exponential backoff"

                                                    5. WRAP UP (2-3 min)
                                                    "Given more time, I'd add fraud detection ML,
                                                    real-time inventory across warehouses, and A/B testing for recommendations"
                                                    ```

</div>

<div style="background: rgba(240, 136, 62, 0.1); border: 1px solid #f0883e; border-radius: 12px; padding: 20px; margin: 20px 0;">
<h4 style="color: #f0883e; margin: 0 0 12px 0;">Final Tip: Show Pragmatism</h4>
<p style="color: #475569; font-size: 14px; margin: 0;">The best candidates demonstrate they know when NOT to use complex solutions. Saying "At this scale, we don't need Kafka - SQS is simpler and sufficient" is more impressive than always reaching for the most complex tool. Interviewers want to hire engineers who can ship products, not architects who over-engineer everything.</p>
</div>
