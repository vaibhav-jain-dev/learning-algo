# Managing and Removing Single Dependency Bottlenecks

## Overview

In microservices architectures, bottlenecks emerge when a single service or resource becomes a constraint that limits overall system performance. This guide covers strategies to identify, manage, and eliminate these bottlenecks.

**Tags:** Performance, Bottleneck, Scaling, Architecture

---

## Understanding Bottlenecks

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #30363d; padding-bottom: 12px;">TYPES OF BOTTLENECKS</h3>

  <!-- 1. Service Bottleneck -->
  <div style="background: rgba(248,81,73,0.15); border-radius: 12px; padding: 20px; margin-bottom: 16px; border-left: 4px solid #f85149;">
    <h4 style="color: #f85149; margin: 0 0 16px 0;">1. SERVICE BOTTLENECK</h4>
    <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 16px;">
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="background: #238636; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 0.85em;">Service A</div>
        <div style="background: #238636; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 0.85em;">Service B</div>
        <div style="background: #238636; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 0.85em;">Service C</div>
      </div>
      <span style="color: #8b949e; font-size: 1.5em;">--></span>
      <div style="background: linear-gradient(135deg, #f85149 0%, #da3633 100%); border-radius: 8px; padding: 16px 24px; text-align: center;">
        <div style="color: #fff; font-weight: 600;">Auth Service</div>
        <div style="color: #fecaca; font-size: 0.75em;">(Bottleneck)</div>
      </div>
      <span style="color: #8b949e; font-size: 1.5em;">--></span>
      <div style="background: rgba(248,81,73,0.3); border-radius: 6px; padding: 8px 12px; color: #f85149; font-size: 0.85em;">Overwhelmed</div>
    </div>
    <div style="color: #8b949e; font-size: 0.9em; text-align: center; font-style: italic;">Symptom: All services slow down when Auth Service is busy</div>
  </div>

  <!-- 2. Database Bottleneck -->
  <div style="background: rgba(249,115,22,0.15); border-radius: 12px; padding: 20px; margin-bottom: 16px; border-left: 4px solid #f97316;">
    <h4 style="color: #f97316; margin: 0 0 16px 0;">2. DATABASE BOTTLENECK</h4>
    <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; margin-bottom: 16px;">
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="background: #1f6feb; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 0.85em;">Service A</div>
        <div style="background: #1f6feb; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 0.85em;">Service B</div>
        <div style="background: #1f6feb; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 0.85em;">Service C</div>
      </div>
      <span style="color: #8b949e; font-size: 1.5em;">--></span>
      <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 8px; padding: 16px 24px; text-align: center;">
        <div style="color: #fff; font-weight: 600;">Database</div>
        <div style="color: #fed7aa; font-size: 0.75em;">(Bottleneck)</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.8em;">
        <span style="color: #f97316;">Connection exhausted</span>
        <span style="color: #f97316;">Lock contention</span>
        <span style="color: #f97316;">Query slow</span>
      </div>
    </div>
  </div>

  <!-- 3. Network Bottleneck -->
  <div style="background: rgba(137,87,229,0.15); border-radius: 12px; padding: 20px; margin-bottom: 16px; border-left: 4px solid #8957e5;">
    <h4 style="color: #8957e5; margin: 0 0 16px 0;">3. NETWORK BOTTLENECK</h4>
    <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
      <div style="background: #8957e5; border-radius: 6px; padding: 10px 20px; color: #fff;">Service A</div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
        <span style="color: #8b949e; font-size: 1.2em;">---------------></span>
        <span style="color: #a371f7; font-size: 0.75em;">High latency, Bandwidth saturation</span>
      </div>
      <div style="background: #8957e5; border-radius: 6px; padding: 10px 20px; color: #fff;">Service B</div>
    </div>
  </div>

  <!-- 4. External Dependency Bottleneck -->
  <div style="background: rgba(136,136,136,0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #8b949e;">
    <h4 style="color: #8b949e; margin: 0 0 16px 0;">4. EXTERNAL DEPENDENCY BOTTLENECK</h4>
    <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
      <div style="background: #238636; border-radius: 6px; padding: 10px 20px; color: #fff;">Your Service</div>
      <span style="color: #8b949e; font-size: 1.5em;">--></span>
      <div style="background: rgba(248,81,73,0.2); border: 2px dashed #f85149; border-radius: 8px; padding: 12px 20px; text-align: center;">
        <div style="color: #f85149; font-weight: 600;">External API</div>
        <div style="color: #8b949e; font-size: 0.75em;">Rate limited, Slow, Unreliable</div>
      </div>
    </div>
  </div>
</div>

---

## Strategy 1: Horizontal Scaling

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #7ee787; margin: 0 0 24px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #30363d; padding-bottom: 12px;">STRATEGY: HORIZONTAL SCALING</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
    <!-- Before -->
    <div style="background: rgba(248,81,73,0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #f85149;">
      <h4 style="color: #f85149; margin: 0 0 16px 0;">BEFORE</h4>
      <div style="display: flex; align-items: center; justify-content: center; gap: 16px;">
        <div style="color: #8b949e; font-size: 0.9em;">All traffic</div>
        <span style="color: #8b949e;">--></span>
        <div style="background: linear-gradient(135deg, #f85149 0%, #da3633 100%); border-radius: 8px; padding: 16px 24px; text-align: center;">
          <div style="color: #fff; font-weight: 600;">Single Instance</div>
          <div style="color: #fecaca; font-size: 0.75em;">(Overloaded)</div>
        </div>
      </div>
    </div>

    <!-- After -->
    <div style="background: rgba(126,231,135,0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #7ee787;">
      <h4 style="color: #7ee787; margin: 0 0 16px 0;">AFTER</h4>
      <div style="display: flex; align-items: center; justify-content: center; gap: 16px;">
        <div style="text-align: center;">
          <div style="color: #8b949e; font-size: 0.9em;">All traffic</div>
          <div style="color: #58a6ff; font-size: 0.75em;">(Load Balancer)</div>
        </div>
        <span style="color: #8b949e;">--></span>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <div style="background: #238636; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 0.85em;">Instance 1</div>
          <div style="background: #238636; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 0.85em;">Instance 2</div>
          <div style="background: #238636; border-radius: 6px; padding: 8px 16px; color: #fff; font-size: 0.85em;">Instance 3</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Requirements -->
  <div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #58a6ff;">
    <h4 style="color: #58a6ff; margin: 0 0 16px 0;">REQUIREMENTS FOR HORIZONTAL SCALING</h4>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
      <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 14px;">
        <div style="color: #7ee787; font-weight: 600; margin-bottom: 8px;">1. Stateless services</div>
        <ul style="color: #8b949e; margin: 0; padding-left: 16px; font-size: 0.85em;">
          <li>No in-memory session state</li>
          <li>Use external store (Redis) for sessions</li>
        </ul>
      </div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 14px;">
        <div style="color: #7ee787; font-weight: 600; margin-bottom: 8px;">2. Shared nothing architecture</div>
        <ul style="color: #8b949e; margin: 0; padding-left: 16px; font-size: 0.85em;">
          <li>No local file dependencies</li>
          <li>Use object storage (S3) for files</li>
        </ul>
      </div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 14px;">
        <div style="color: #7ee787; font-weight: 600; margin-bottom: 8px;">3. Idempotent operations</div>
        <ul style="color: #8b949e; margin: 0; padding-left: 16px; font-size: 0.85em;">
          <li>Requests can be safely retried</li>
          <li>No duplicate side effects</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Kubernetes Auto-Scaling -->
  <div style="background: rgba(137,87,229,0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #8957e5;">
    <h4 style="color: #8957e5; margin: 0 0 16px 0;">KUBERNETES AUTO-SCALING</h4>
    <pre style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 16px; margin: 0; overflow-x: auto; font-size: 0.85em; color: #8b949e;"><code style="color: #e6edf3;">apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: auth-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: auth-service
  minReplicas: 3
  maxReplicas: 50
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70</code></pre>
  </div>
</div>

---

## Strategy 2: Caching

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #30363d; padding-bottom: 12px;">STRATEGY: CACHING</h3>

  <!-- Multi-Level Caching -->
  <div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #58a6ff;">
    <h4 style="color: #58a6ff; margin: 0 0 16px 0;">MULTI-LEVEL CACHING</h4>
    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
      <div style="background: #1f6feb; border-radius: 6px; padding: 8px 12px; color: #fff; font-size: 0.85em;">Client</div>
      <span style="color: #8b949e;">--></span>
      <div style="background: #238636; border-radius: 6px; padding: 8px 12px; color: #fff; font-size: 0.85em;">CDN</div>
      <span style="color: #8b949e;">--></span>
      <div style="background: #8957e5; border-radius: 6px; padding: 8px 12px; color: #fff; font-size: 0.85em;">API Gateway</div>
      <span style="color: #8b949e;">--></span>
      <div style="background: #f97316; border-radius: 6px; padding: 8px 12px; color: #fff; font-size: 0.85em;">Service</div>
      <span style="color: #8b949e;">--></span>
      <div style="background: #f85149; border-radius: 6px; padding: 8px 12px; color: #fff; font-size: 0.85em;">Redis</div>
      <span style="color: #8b949e;">--></span>
      <div style="background: #0891b2; border-radius: 6px; padding: 8px 12px; color: #fff; font-size: 0.85em;">DB</div>
    </div>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; text-align: center; font-size: 0.8em;">
      <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px; color: #7ee787;">L1: Edge Cache</div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px; color: #a371f7;">L2: Gateway Cache</div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px; color: #f97316;">L3: App Cache</div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px; color: #f85149;">L4: Redis Cache</div>
    </div>
  </div>

  <!-- Cache-Aside Pattern -->
  <div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #7ee787;">
    <h4 style="color: #7ee787; margin: 0 0 16px 0;">CACHE-ASIDE PATTERN</h4>
    <pre style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 16px; margin: 0; overflow-x: auto; font-size: 0.85em;"><code style="color: #e6edf3;">func GetUser(userID string) (*User, error) {
    <span style="color: #8b949e;">// 1. Check cache</span>
    user, err := cache.Get(ctx, "user:"+userID)
    if err == nil {
        return user, nil  <span style="color: #7ee787;">// Cache hit</span>
    }

    <span style="color: #8b949e;">// 2. Cache miss - fetch from DB</span>
    user, err = db.GetUser(ctx, userID)
    if err != nil {
        return nil, err
    }

    <span style="color: #8b949e;">// 3. Populate cache</span>
    cache.Set(ctx, "user:"+userID, user, 1*time.Hour)
    return user, nil
}</code></pre>
  </div>

  <!-- Cache Invalidation Strategies -->
  <div style="background: rgba(249,115,22,0.15); border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #f97316;">
    <h4 style="color: #f97316; margin: 0 0 16px 0;">CACHE INVALIDATION STRATEGIES</h4>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
      <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
        <div style="color: #7ee787; font-weight: 600; margin-bottom: 6px;">1. Time-based (TTL)</div>
        <code style="color: #8b949e; font-size: 0.8em;">cache.Set("user:123", user, 5*time.Minute)</code>
      </div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
        <div style="color: #58a6ff; font-weight: 600; margin-bottom: 6px;">2. Event-based</div>
        <code style="color: #8b949e; font-size: 0.8em;">On user.updated event -> cache.Delete("user:123")</code>
      </div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
        <div style="color: #a371f7; font-weight: 600; margin-bottom: 6px;">3. Write-through</div>
        <code style="color: #8b949e; font-size: 0.8em;">Update cache and DB together</code>
      </div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px;">
        <div style="color: #f97316; font-weight: 600; margin-bottom: 6px;">4. Cache-busting keys</div>
        <code style="color: #8b949e; font-size: 0.8em;">"user:123:v2" -> increment version on update</code>
      </div>
    </div>
  </div>

  <!-- Target -->
  <div style="background: rgba(126,231,135,0.2); border-radius: 8px; padding: 12px; text-align: center;">
    <span style="color: #7ee787; font-weight: 600;">CACHE HIT RATIO TARGET:</span>
    <span style="color: #8b949e;"> > 90% for read-heavy workloads</span>
  </div>
</div>

---

## Strategy 3: Asynchronous Processing

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #8957e5; margin: 0 0 24px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #30363d; padding-bottom: 12px;">STRATEGY: ASYNC PROCESSING</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
    <!-- Before (Synchronous) -->
    <div style="background: rgba(248,81,73,0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #f85149;">
      <h4 style="color: #f85149; margin: 0 0 16px 0;">BEFORE (Synchronous)</h4>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85em;">
          <span style="background: #1f6feb; border-radius: 4px; padding: 4px 10px; color: #fff;">Client</span>
          <span style="color: #8b949e;">--></span>
          <span style="background: #f97316; border-radius: 4px; padding: 4px 10px; color: #fff;">Order Service</span>
          <span style="color: #8b949e;">--></span>
          <span style="background: #f85149; border-radius: 4px; padding: 4px 10px; color: #fff;">Email Service (slow)</span>
        </div>
        <div style="text-align: center; color: #8b949e; font-size: 0.75em;">(waiting for email to send)</div>
      </div>
      <div style="background: rgba(248,81,73,0.3); border-radius: 6px; padding: 8px; text-align: center; color: #fecaca; font-size: 0.85em;">
        Total response time: <strong>2000ms</strong> (500ms + 1500ms email)
      </div>
    </div>

    <!-- After (Asynchronous) -->
    <div style="background: rgba(126,231,135,0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #7ee787;">
      <h4 style="color: #7ee787; margin: 0 0 16px 0;">AFTER (Asynchronous)</h4>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85em;">
          <span style="background: #1f6feb; border-radius: 4px; padding: 4px 10px; color: #fff;">Client</span>
          <span style="color: #8b949e;">--></span>
          <span style="background: #238636; border-radius: 4px; padding: 4px 10px; color: #fff;">Order Service</span>
          <span style="color: #8b949e;">--></span>
          <span style="background: #8957e5; border-radius: 4px; padding: 4px 10px; color: #fff;">Message Queue</span>
        </div>
        <div style="text-align: right; color: #8b949e; font-size: 0.75em; padding-right: 20px;">|</div>
        <div style="text-align: right; color: #8b949e; font-size: 0.75em; padding-right: 20px;">v</div>
        <div style="text-align: right; font-size: 0.85em; padding-right: 20px;">
          <span style="background: #0891b2; border-radius: 4px; padding: 4px 10px; color: #fff;">Email Service (async)</span>
        </div>
      </div>
      <div style="background: rgba(126,231,135,0.3); border-radius: 6px; padding: 8px; text-align: center; color: #d1fae5; font-size: 0.85em;">
        Response time: <strong>200ms</strong> (email sent later)
      </div>
    </div>
  </div>

  <!-- When to Use Async -->
  <div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #58a6ff;">
    <h4 style="color: #58a6ff; margin: 0 0 16px 0;">WHEN TO USE ASYNC</h4>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
      <div>
        <div style="color: #7ee787; font-weight: 600; margin-bottom: 8px;">Good for:</div>
        <ul style="color: #8b949e; margin: 0; padding-left: 20px; font-size: 0.85em;">
          <li>Non-critical operations (emails, notifications)</li>
          <li>Long-running tasks (report generation, exports)</li>
          <li>External API calls with high latency</li>
          <li>Operations that can be retried</li>
        </ul>
      </div>
      <div>
        <div style="color: #f85149; font-weight: 600; margin-bottom: 8px;">Not suitable for:</div>
        <ul style="color: #8b949e; margin: 0; padding-left: 20px; font-size: 0.85em;">
          <li>Operations requiring immediate response</li>
          <li>Operations user is waiting for</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Implementation -->
  <div style="background: rgba(137,87,229,0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #8957e5;">
    <h4 style="color: #8957e5; margin: 0 0 16px 0;">IMPLEMENTATION</h4>
    <pre style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 16px; margin: 0; overflow-x: auto; font-size: 0.8em;"><code style="color: #e6edf3;"><span style="color: #8b949e;">// Producer (Order Service)</span>
func CreateOrder(order *Order) error {
    <span style="color: #8b949e;">// Save order</span>
    err := db.SaveOrder(order)
    if err != nil {
        return err
    }

    <span style="color: #8b949e;">// Publish event (non-blocking)</span>
    kafka.Publish("order.created", OrderCreatedEvent{
        OrderID: order.ID,
        Email:   order.CustomerEmail,
    })

    return nil  <span style="color: #7ee787;">// Return immediately</span>
}

<span style="color: #8b949e;">// Consumer (Email Service)</span>
func HandleOrderCreated(event OrderCreatedEvent) {
    <span style="color: #8b949e;">// Send email (takes 1500ms)</span>
    sendEmail(event.Email, "Order Confirmation", ...)
}</code></pre>
  </div>
</div>

---

## Strategy 4: Database Optimization

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #0891b2; margin: 0 0 24px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #30363d; padding-bottom: 12px;">STRATEGY: DATABASE OPTIMIZATION</h3>

  <!-- 1. Read Replicas -->
  <div style="background: rgba(8,145,178,0.15); border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #0891b2;">
    <h4 style="color: #0891b2; margin: 0 0 16px 0;">1. READ REPLICAS</h4>
    <div style="display: flex; align-items: flex-start; justify-content: center; gap: 24px; flex-wrap: wrap; margin-bottom: 16px;">
      <div style="text-align: center;">
        <div style="color: #8b949e; font-size: 0.85em; margin-bottom: 8px;">Writes</div>
        <div style="color: #8b949e;">|</div>
        <div style="color: #8b949e;">v</div>
        <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 8px; padding: 16px 24px; color: #fff;">
          <div style="font-weight: 600;">Primary</div>
          <div style="font-size: 0.75em;">(Write DB)</div>
        </div>
        <div style="color: #8b949e; font-size: 0.8em; margin-top: 8px;">Sync --></div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="text-align: center;">
          <div style="color: #8b949e; font-size: 0.85em; margin-bottom: 8px;">Reads</div>
          <div style="color: #8b949e;">|</div>
          <div style="color: #8b949e;">v</div>
        </div>
        <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 12px 20px; color: #fff; text-align: center;">
          <div style="font-weight: 600;">Replica 1</div>
          <div style="font-size: 0.75em;">(Read DB)</div>
        </div>
        <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 12px 20px; color: #fff; text-align: center;">
          <div style="font-weight: 600;">Replica 2</div>
          <div style="font-size: 0.75em;">(Read DB)</div>
        </div>
      </div>
    </div>
    <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 10px; text-align: center; font-size: 0.85em; color: #8b949e;">
      Write/Read ratio: <strong style="color: #7ee787;">1:10</strong> typical in most applications. Scale reads by adding replicas.
    </div>
  </div>

  <!-- 2. Connection Pooling -->
  <div style="background: rgba(137,87,229,0.15); border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #8957e5;">
    <h4 style="color: #8957e5; margin: 0 0 16px 0;">2. CONNECTION POOLING</h4>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
      <div style="background: rgba(248,81,73,0.2); border-radius: 8px; padding: 14px;">
        <div style="color: #f85149; font-weight: 600; margin-bottom: 8px;">WITHOUT POOLING:</div>
        <div style="color: #8b949e; font-size: 0.8em;">
          Request 1 -> Open connection -> Query -> Close connection<br/>
          Request 2 -> Open connection -> Query -> Close connection<br/>
          <span style="color: #f85149;">(Connection overhead: ~50ms each)</span>
        </div>
      </div>
      <div style="background: rgba(126,231,135,0.2); border-radius: 8px; padding: 14px;">
        <div style="color: #7ee787; font-weight: 600; margin-bottom: 8px;">WITH POOLING:</div>
        <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px; margin-bottom: 8px;">
          <div style="color: #a371f7; font-size: 0.8em; text-align: center; margin-bottom: 6px;">CONNECTION POOL</div>
          <div style="display: flex; justify-content: center; gap: 4px;">
            <span style="background: #8957e5; border-radius: 3px; padding: 4px 8px; color: #fff; font-size: 0.7em;">Conn 1</span>
            <span style="background: #8957e5; border-radius: 3px; padding: 4px 8px; color: #fff; font-size: 0.7em;">Conn 2</span>
            <span style="background: #8957e5; border-radius: 3px; padding: 4px 8px; color: #fff; font-size: 0.7em;">Conn 3</span>
            <span style="background: #8957e5; border-radius: 3px; padding: 4px 8px; color: #fff; font-size: 0.7em;">Conn 4</span>
            <span style="background: #8957e5; border-radius: 3px; padding: 4px 8px; color: #fff; font-size: 0.7em;">Conn 5</span>
          </div>
        </div>
        <div style="color: #8b949e; font-size: 0.8em;">
          Request 1 -> Borrow conn -> Query -> Return conn<br/>
          <span style="color: #7ee787;">(No connection overhead)</span>
        </div>
      </div>
    </div>
    <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 10px;">
      <div style="color: #a371f7; font-weight: 600; margin-bottom: 6px; font-size: 0.85em;">Pool configuration:</div>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; font-size: 0.8em; color: #8b949e;">
        <span>min_connections: 10</span>
        <span>max_connections: 50</span>
        <span>max_idle_time: 30s</span>
        <span>connection_timeout: 5s</span>
      </div>
    </div>
  </div>

  <!-- 3. Query Optimization -->
  <div style="background: rgba(249,115,22,0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #f97316;">
    <h4 style="color: #f97316; margin: 0 0 16px 0;">3. QUERY OPTIMIZATION</h4>
    <ul style="color: #8b949e; margin: 0 0 16px 0; padding-left: 20px; font-size: 0.9em;">
      <li>Add indexes for frequently queried columns</li>
      <li>Use EXPLAIN ANALYZE to identify slow queries</li>
      <li>Avoid SELECT * - fetch only needed columns</li>
      <li>Batch operations instead of individual queries</li>
      <li>Use prepared statements</li>
    </ul>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
      <div style="background: rgba(248,81,73,0.2); border-radius: 8px; padding: 12px;">
        <div style="color: #f85149; font-weight: 600; margin-bottom: 8px; font-size: 0.85em;">Bad: N+1 queries</div>
        <pre style="background: rgba(0,0,0,0.3); border-radius: 4px; padding: 8px; margin: 0; font-size: 0.75em; color: #e6edf3; overflow-x: auto;">for _, orderID := range orderIDs {
    order, _ := db.GetOrder(orderID) <span style="color: #f85149;">// 100 queries</span>
}</pre>
      </div>
      <div style="background: rgba(126,231,135,0.2); border-radius: 8px; padding: 12px;">
        <div style="color: #7ee787; font-weight: 600; margin-bottom: 8px; font-size: 0.85em;">Good: Single query</div>
        <pre style="background: rgba(0,0,0,0.3); border-radius: 4px; padding: 8px; margin: 0; font-size: 0.75em; color: #e6edf3; overflow-x: auto;">orders, _ := db.GetOrders(orderIDs) <span style="color: #7ee787;">// 1 query</span></pre>
      </div>
    </div>
  </div>
</div>

---

## Strategy 5: Circuit Breaker + Fallback

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #f97316; margin: 0 0 24px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #30363d; padding-bottom: 12px;">STRATEGY: CIRCUIT BREAKER WITH FALLBACK</h3>

  <div style="background: rgba(249,115,22,0.1); border-radius: 8px; padding: 12px; margin-bottom: 24px; text-align: center;">
    <span style="color: #f97316;">When a dependency is the bottleneck, fail fast and use fallback</span>
  </div>

  <!-- Implementation -->
  <div style="background: rgba(137,87,229,0.15); border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #8957e5;">
    <h4 style="color: #8957e5; margin: 0 0 16px 0;">IMPLEMENTATION</h4>
    <pre style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 16px; margin: 0; overflow-x: auto; font-size: 0.8em;"><code style="color: #e6edf3;">func GetProductWithFallback(productID string) *Product {

    result, err := circuitBreaker.Execute(func() (*Product, error) {
        <span style="color: #8b949e;">// Try primary: Product Service</span>
        return productClient.GetProduct(productID)
    })

    if err != nil {
        <span style="color: #f85149;">// Circuit open or call failed</span>

        <span style="color: #58a6ff;">// Fallback 1: Try cache</span>
        if cached, ok := cache.Get(productID); ok {
            return cached
        }

        <span style="color: #f97316;">// Fallback 2: Return degraded response</span>
        return &Product{
            ID:        productID,
            Name:      "Product information unavailable",
            Price:     0,
            Available: false,
        }
    }

    return result
}</code></pre>
  </div>

  <!-- Fallback Strategies -->
  <div style="background: rgba(126,231,135,0.1); border-radius: 12px; padding: 20px; border-left: 4px solid #7ee787;">
    <h4 style="color: #7ee787; margin: 0 0 16px 0;">FALLBACK STRATEGIES</h4>
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px;">
      <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; text-align: center;">
        <div style="color: #58a6ff; font-weight: 600; margin-bottom: 6px; font-size: 0.9em;">1</div>
        <div style="color: #8b949e; font-size: 0.8em;">Cached data<br/>(slightly stale is OK)</div>
      </div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; text-align: center;">
        <div style="color: #7ee787; font-weight: 600; margin-bottom: 6px; font-size: 0.9em;">2</div>
        <div style="color: #8b949e; font-size: 0.8em;">Default value</div>
      </div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; text-align: center;">
        <div style="color: #a371f7; font-weight: 600; margin-bottom: 6px; font-size: 0.9em;">3</div>
        <div style="color: #8b949e; font-size: 0.8em;">Alternative service<br/>(backup provider)</div>
      </div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; text-align: center;">
        <div style="color: #f97316; font-weight: 600; margin-bottom: 6px; font-size: 0.9em;">4</div>
        <div style="color: #8b949e; font-size: 0.8em;">Degraded functionality<br/>(hide feature)</div>
      </div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px; text-align: center;">
        <div style="color: #0891b2; font-weight: 600; margin-bottom: 6px; font-size: 0.9em;">5</div>
        <div style="color: #8b949e; font-size: 0.8em;">Queue for<br/>later processing</div>
      </div>
    </div>
  </div>
</div>

---

## Strategy 6: Service Decomposition

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #30363d; padding-bottom: 12px;">STRATEGY: SERVICE DECOMPOSITION</h3>

  <div style="background: rgba(88,166,255,0.1); border-radius: 8px; padding: 12px; margin-bottom: 24px; text-align: center;">
    <span style="color: #58a6ff;">Split overloaded service into smaller, specialized services</span>
  </div>

  <!-- Before -->
  <div style="background: rgba(248,81,73,0.15); border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #f85149;">
    <h4 style="color: #f85149; margin: 0 0 16px 0;">BEFORE: Monolithic User Service (Bottleneck)</h4>
    <div style="display: flex; justify-content: center;">
      <div style="background: linear-gradient(135deg, #f85149 0%, #da3633 100%); border-radius: 12px; padding: 20px; min-width: 280px;">
        <div style="color: #fff; font-weight: 600; text-align: center; margin-bottom: 12px; font-size: 1.1em;">USER SERVICE</div>
        <ul style="color: #fecaca; margin: 0 0 12px 0; padding-left: 20px; font-size: 0.9em;">
          <li>Authentication</li>
          <li>Profile management</li>
          <li>Preferences</li>
          <li>Activity history</li>
          <li>Friend connections</li>
        </ul>
        <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px; text-align: center; color: #fecaca; font-size: 0.85em;">[All on single database]</div>
      </div>
    </div>
  </div>

  <!-- After -->
  <div style="background: rgba(126,231,135,0.15); border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #7ee787;">
    <h4 style="color: #7ee787; margin: 0 0 16px 0;">AFTER: Decomposed Services</h4>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 16px;">
      <!-- Auth Service -->
      <div style="text-align: center;">
        <div style="background: linear-gradient(135deg, #f85149 0%, #da3633 100%); border-radius: 10px; padding: 16px; margin-bottom: 8px;">
          <div style="color: #fff; font-weight: 600; margin-bottom: 8px;">Auth Service</div>
          <ul style="color: #fecaca; margin: 0; padding-left: 16px; font-size: 0.8em; text-align: left;">
            <li>Login</li>
            <li>Tokens</li>
            <li>Sessions</li>
          </ul>
        </div>
        <div style="color: #8b949e; font-size: 0.8em;">|</div>
        <div style="color: #8b949e; font-size: 0.8em;">v</div>
        <div style="background: #f85149; border-radius: 6px; padding: 8px; color: #fff; font-size: 0.85em;">
          Redis<br/><span style="font-size: 0.75em;">(Fast)</span>
        </div>
      </div>
      <!-- Profile Service -->
      <div style="text-align: center;">
        <div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); border-radius: 10px; padding: 16px; margin-bottom: 8px;">
          <div style="color: #fff; font-weight: 600; margin-bottom: 8px;">Profile Service</div>
          <ul style="color: #dbeafe; margin: 0; padding-left: 16px; font-size: 0.8em; text-align: left;">
            <li>Profile</li>
            <li>Prefs</li>
            <li>Settings</li>
          </ul>
        </div>
        <div style="color: #8b949e; font-size: 0.8em;">|</div>
        <div style="color: #8b949e; font-size: 0.8em;">v</div>
        <div style="background: #1f6feb; border-radius: 6px; padding: 8px; color: #fff; font-size: 0.85em;">
          Postgres<br/><span style="font-size: 0.75em;">(ACID)</span>
        </div>
      </div>
      <!-- Social Service -->
      <div style="text-align: center;">
        <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 10px; padding: 16px; margin-bottom: 8px;">
          <div style="color: #fff; font-weight: 600; margin-bottom: 8px;">Social Service</div>
          <ul style="color: #d1fae5; margin: 0; padding-left: 16px; font-size: 0.8em; text-align: left;">
            <li>Friends</li>
            <li>Activity</li>
            <li>Feed</li>
          </ul>
        </div>
        <div style="color: #8b949e; font-size: 0.8em;">|</div>
        <div style="color: #8b949e; font-size: 0.8em;">v</div>
        <div style="background: #238636; border-radius: 6px; padding: 8px; color: #fff; font-size: 0.85em;">
          Neo4j<br/><span style="font-size: 0.75em;">(Graph)</span>
        </div>
      </div>
    </div>
    <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 12px; text-align: center; font-size: 0.85em; color: #8b949e;">
      Each service: <span style="color: #7ee787;">Scales independently</span> | <span style="color: #58a6ff;">Uses optimal database</span> | <span style="color: #a371f7;">Has focused responsibility</span>
    </div>
  </div>

  <!-- Decomposition Criteria -->
  <div style="background: rgba(137,87,229,0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #8957e5;">
    <h4 style="color: #8957e5; margin: 0 0 12px 0;">DECOMPOSITION CRITERIA</h4>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
      <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 10px; text-align: center; color: #8b949e; font-size: 0.85em;">Different scaling requirements</div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 10px; text-align: center; color: #8b949e; font-size: 0.85em;">Different data access patterns</div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 10px; text-align: center; color: #8b949e; font-size: 0.85em;">Different update frequencies</div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 10px; text-align: center; color: #8b949e; font-size: 0.85em;">Different team ownership</div>
    </div>
  </div>
</div>

---

## Strategy 7: Request Coalescing

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #7ee787; margin: 0 0 24px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #30363d; padding-bottom: 12px;">STRATEGY: REQUEST COALESCING</h3>

  <div style="background: rgba(126,231,135,0.1); border-radius: 8px; padding: 12px; margin-bottom: 24px; text-align: center;">
    <span style="color: #7ee787;">Combine multiple requests into one to reduce backend load</span>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
    <!-- Before (Thundering Herd) -->
    <div style="background: rgba(248,81,73,0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #f85149;">
      <h4 style="color: #f85149; margin: 0 0 16px 0;">BEFORE (Thundering Herd Problem)</h4>
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px;">
        <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.85em;">
          <span style="color: #8b949e;">User 1 --get product--></span>
          <span style="color: #8b949e;">User 2 --get product--></span>
          <span style="color: #8b949e;">User 3 --get product--></span>
          <span style="color: #8b949e;">...</span>
          <span style="color: #8b949e;">User 100--get product--></span>
        </div>
        <div style="background: linear-gradient(135deg, #f85149 0%, #da3633 100%); border-radius: 8px; padding: 12px; text-align: center;">
          <div style="color: #fff; font-weight: 600;">Database</div>
          <div style="color: #fecaca; font-size: 0.75em;">(Same query 100 times!)</div>
        </div>
      </div>
      <div style="background: rgba(248,81,73,0.3); border-radius: 6px; padding: 8px; text-align: center; color: #fecaca; font-size: 0.85em;">
        Result: <strong>100 identical queries</strong> to database
      </div>
    </div>

    <!-- After (Request Coalescing) -->
    <div style="background: rgba(126,231,135,0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #7ee787;">
      <h4 style="color: #7ee787; margin: 0 0 16px 0;">AFTER (Request Coalescing)</h4>
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px;">
        <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.85em; color: #8b949e;">
          <span>User 1 --></span>
          <span>User 2 --></span>
          <span>User 3 --></span>
          <span>...</span>
          <span>User 100--></span>
        </div>
        <div style="background: #8957e5; border-radius: 8px; padding: 10px; text-align: center;">
          <div style="color: #fff; font-size: 0.85em;">Coalescer</div>
          <div style="color: #ede9fe; font-size: 0.7em;">(1 request)</div>
        </div>
        <span style="color: #8b949e;">--></span>
        <div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); border-radius: 8px; padding: 10px; text-align: center;">
          <div style="color: #fff; font-size: 0.85em;">Database</div>
          <div style="color: #d1fae5; font-size: 0.7em;">(1 query!)</div>
        </div>
      </div>
      <div style="text-align: center; color: #8b949e; font-size: 0.75em; margin-bottom: 8px;">(broadcast result to all)</div>
      <div style="background: rgba(126,231,135,0.3); border-radius: 6px; padding: 8px; text-align: center; color: #d1fae5; font-size: 0.85em;">
        Result: <strong>1 query</strong>, result shared with 100 users
      </div>
    </div>
  </div>

  <!-- Implementation -->
  <div style="background: rgba(137,87,229,0.15); border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #8957e5;">
    <h4 style="color: #8957e5; margin: 0 0 16px 0;">IMPLEMENTATION (Go with singleflight)</h4>
    <pre style="background: rgba(0,0,0,0.4); border-radius: 8px; padding: 16px; margin: 0; overflow-x: auto; font-size: 0.8em;"><code style="color: #e6edf3;">import "golang.org/x/sync/singleflight"

var group singleflight.Group

func GetProduct(productID string) (*Product, error) {
    <span style="color: #8b949e;">// All concurrent requests for same productID</span>
    <span style="color: #8b949e;">// will share the same database call</span>

    result, err, _ := group.Do(productID, func() (interface{}, error) {
        <span style="color: #7ee787;">// This function runs only ONCE</span>
        <span style="color: #7ee787;">// even if called 100 times concurrently</span>
        return db.GetProduct(productID)
    })

    if err != nil {
        return nil, err
    }
    return result.(*Product), nil
}</code></pre>
  </div>

  <!-- Use Cases -->
  <div style="background: rgba(88,166,255,0.1); border-radius: 12px; padding: 20px; border-left: 4px solid #58a6ff;">
    <h4 style="color: #58a6ff; margin: 0 0 12px 0;">USE CASES</h4>
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
      <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 10px; text-align: center; color: #8b949e; font-size: 0.85em;">Cache miss stampede prevention</div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 10px; text-align: center; color: #8b949e; font-size: 0.85em;">Hot key access</div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 10px; text-align: center; color: #8b949e; font-size: 0.85em;">Popular product pages</div>
      <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 10px; text-align: center; color: #8b949e; font-size: 0.85em;">Rate limited external APIs</div>
    </div>
  </div>
</div>

---

## Bottleneck Identification Checklist

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 20px 0; font-family: 'Segoe UI', system-ui, sans-serif;">
  <h3 style="color: #58a6ff; margin: 0 0 24px 0; font-size: 1.3em; text-align: center; border-bottom: 2px solid #30363d; padding-bottom: 12px;">BOTTLENECK IDENTIFICATION CHECKLIST</h3>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <!-- Monitoring Metrics -->
    <div style="background: rgba(88,166,255,0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #58a6ff;">
      <h4 style="color: #58a6ff; margin: 0 0 16px 0;">MONITORING METRICS</h4>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px; color: #8b949e; font-size: 0.9em;">
          <span style="background: rgba(88,166,255,0.3); border-radius: 4px; padding: 2px 8px; font-size: 0.8em;">check</span> Service latency (p50, p95, p99)
        </div>
        <div style="display: flex; align-items: center; gap: 8px; color: #8b949e; font-size: 0.9em;">
          <span style="background: rgba(88,166,255,0.3); border-radius: 4px; padding: 2px 8px; font-size: 0.8em;">check</span> Error rates per service
        </div>
        <div style="display: flex; align-items: center; gap: 8px; color: #8b949e; font-size: 0.9em;">
          <span style="background: rgba(88,166,255,0.3); border-radius: 4px; padding: 2px 8px; font-size: 0.8em;">check</span> CPU/Memory utilization
        </div>
        <div style="display: flex; align-items: center; gap: 8px; color: #8b949e; font-size: 0.9em;">
          <span style="background: rgba(88,166,255,0.3); border-radius: 4px; padding: 2px 8px; font-size: 0.8em;">check</span> Database connection pool usage
        </div>
        <div style="display: flex; align-items: center; gap: 8px; color: #8b949e; font-size: 0.9em;">
          <span style="background: rgba(88,166,255,0.3); border-radius: 4px; padding: 2px 8px; font-size: 0.8em;">check</span> Queue depths
        </div>
        <div style="display: flex; align-items: center; gap: 8px; color: #8b949e; font-size: 0.9em;">
          <span style="background: rgba(88,166,255,0.3); border-radius: 4px; padding: 2px 8px; font-size: 0.8em;">check</span> Network bandwidth
        </div>
      </div>
    </div>

    <!-- Tools -->
    <div style="background: rgba(126,231,135,0.15); border-radius: 12px; padding: 20px; border-left: 4px solid #7ee787;">
      <h4 style="color: #7ee787; margin: 0 0 16px 0;">TOOLS</h4>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px 12px;">
          <span style="color: #7ee787; font-weight: 600;">Distributed tracing</span>
          <span style="color: #8b949e; font-size: 0.85em;"> (Jaeger, Zipkin) - Find slow services</span>
        </div>
        <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px 12px;">
          <span style="color: #58a6ff; font-weight: 600;">APM</span>
          <span style="color: #8b949e; font-size: 0.85em;"> (Datadog, New Relic) - Service dependencies</span>
        </div>
        <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px 12px;">
          <span style="color: #a371f7; font-weight: 600;">Database profiler</span>
          <span style="color: #8b949e; font-size: 0.85em;"> - Slow queries</span>
        </div>
        <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 8px 12px;">
          <span style="color: #f97316; font-weight: 600;">Load testing</span>
          <span style="color: #8b949e; font-size: 0.85em;"> (k6, Gatling) - Find breaking points</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Red Flags -->
  <div style="background: rgba(248,81,73,0.15); border-radius: 12px; padding: 20px; margin-top: 20px; border-left: 4px solid #f85149;">
    <h4 style="color: #f85149; margin: 0 0 16px 0;">RED FLAGS</h4>
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px;">
      <div style="background: rgba(248,81,73,0.2); border-radius: 6px; padding: 10px; text-align: center;">
        <div style="color: #f85149; font-size: 1.2em; margin-bottom: 4px;">!</div>
        <div style="color: #8b949e; font-size: 0.8em;">One service appears in most slow traces</div>
      </div>
      <div style="background: rgba(248,81,73,0.2); border-radius: 6px; padding: 10px; text-align: center;">
        <div style="color: #f85149; font-size: 1.2em; margin-bottom: 4px;">!</div>
        <div style="color: #8b949e; font-size: 0.8em;">Database CPU at 100%</div>
      </div>
      <div style="background: rgba(248,81,73,0.2); border-radius: 6px; padding: 10px; text-align: center;">
        <div style="color: #f85149; font-size: 1.2em; margin-bottom: 4px;">!</div>
        <div style="color: #8b949e; font-size: 0.8em;">Connection pool exhausted</div>
      </div>
      <div style="background: rgba(248,81,73,0.2); border-radius: 6px; padding: 10px; text-align: center;">
        <div style="color: #f85149; font-size: 1.2em; margin-bottom: 4px;">!</div>
        <div style="color: #8b949e; font-size: 0.8em;">High error rate from single dependency</div>
      </div>
      <div style="background: rgba(248,81,73,0.2); border-radius: 6px; padding: 10px; text-align: center;">
        <div style="color: #f85149; font-size: 1.2em; margin-bottom: 4px;">!</div>
        <div style="color: #8b949e; font-size: 0.8em;">Requests timing out at same service</div>
      </div>
    </div>
  </div>
</div>

---

## Key Takeaways

1. **Identify before optimizing** - Use tracing and metrics to find real bottlenecks
2. **Cache aggressively** - Most reads can be cached
3. **Go async when possible** - Don't block on non-critical operations
4. **Scale horizontally** - Add instances, not bigger machines
5. **Fail fast with fallbacks** - Circuit breakers protect the system
6. **Decompose when needed** - Split overloaded services
7. **Coalesce requests** - Combine duplicate work
