# Microservices Architecture

## Overview

Microservices is an architectural style that structures an application as a collection of small, autonomous services. Each service is independently deployable, scalable, and focused on a specific business capability.

## Key Concepts

### Monolith vs Microservices

```
Monolith:
┌─────────────────────────────────┐
│  ┌─────┐ ┌─────┐ ┌─────────┐  │
│  │Users│ │Orders│ │Inventory│  │
│  └─────┘ └─────┘ └─────────┘  │
│  ┌──────────────────────────┐  │
│  │      Shared Database      │  │
│  └──────────────────────────┘  │
└─────────────────────────────────┘

Microservices:
┌────────┐   ┌────────┐   ┌──────────┐
│ Users  │   │ Orders │   │Inventory │
│Service │   │Service │   │ Service  │
└───┬────┘   └───┬────┘   └────┬─────┘
    │            │              │
┌───┴───┐   ┌───┴───┐    ┌────┴────┐
│User DB│   │OrderDB│    │Inv DB   │
└───────┘   └───────┘    └─────────┘
```

### Core Principles

1. **Single Responsibility**: Each service does one thing well
2. **Autonomy**: Teams own entire service lifecycle
3. **Decentralization**: No central governance or shared databases
4. **Resilience**: Services handle failures gracefully
5. **Observable**: Comprehensive monitoring and logging

## Service Communication

### Synchronous (Request-Response)

#### REST API
```python
# Order Service calling User Service
import requests

def get_user(user_id):
    response = requests.get(f"http://user-service/users/{user_id}")
    if response.status_code == 200:
        return response.json()
    return None
```

#### gRPC
```protobuf
// user.proto
service UserService {
    rpc GetUser (GetUserRequest) returns (User);
}

message GetUserRequest {
    string user_id = 1;
}

message User {
    string id = 1;
    string name = 2;
    string email = 3;
}
```

### Asynchronous (Event-Driven)

```python
# Order Service publishes event
def create_order(order_data):
    order = save_order(order_data)

    # Publish event for other services
    event_bus.publish("order.created", {
        "order_id": order.id,
        "user_id": order.user_id,
        "items": order.items
    })

    return order

# Inventory Service subscribes
@event_bus.subscribe("order.created")
def handle_order_created(event):
    for item in event["items"]:
        reserve_inventory(item["product_id"], item["quantity"])
```

## Service Discovery

### Client-Side Discovery

```python
class ServiceDiscovery:
    def __init__(self, registry_url):
        self.registry_url = registry_url
        self.cache = {}

    def get_service_url(self, service_name):
        if service_name not in self.cache:
            response = requests.get(f"{self.registry_url}/services/{service_name}")
            instances = response.json()["instances"]
            self.cache[service_name] = instances

        # Load balance (round-robin)
        instances = self.cache[service_name]
        return random.choice(instances)["url"]
```

### Server-Side Discovery

```
Client → Load Balancer → Service Registry
              ↓
         Service Instance
```

## Patterns

### API Gateway

Central entry point for all clients.

```go
package main

import (
	"net/http"
	"net/http/httputil"
	"net/url"
)

type APIGateway struct {
	routes map[string]*httputil.ReverseProxy
}

func NewAPIGateway() *APIGateway {
	gw := &APIGateway{
		routes: make(map[string]*httputil.ReverseProxy),
	}

	// Route configuration
	gw.addRoute("/users", "http://user-service:8080")
	gw.addRoute("/orders", "http://order-service:8080")
	gw.addRoute("/products", "http://product-service:8080")

	return gw
}

func (gw *APIGateway) addRoute(path, target string) {
	url, _ := url.Parse(target)
	gw.routes[path] = httputil.NewSingleHostReverseProxy(url)
}

func (gw *APIGateway) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// Find matching route
	for prefix, proxy := range gw.routes {
		if len(r.URL.Path) >= len(prefix) && r.URL.Path[:len(prefix)] == prefix {
			proxy.ServeHTTP(w, r)
			return
		}
	}

	http.NotFound(w, r)
}

func main() {
	gw := NewAPIGateway()
	http.ListenAndServe(":8080", gw)
}
```

### Circuit Breaker

Prevent cascading failures.

```python
import time
from enum import Enum
from threading import Lock

class State(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half_open"

class CircuitBreaker:
    def __init__(self, failure_threshold=5, recovery_timeout=30):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.failures = 0
        self.last_failure_time = None
        self.state = State.CLOSED
        self.lock = Lock()

    def call(self, func, *args, **kwargs):
        with self.lock:
            if self.state == State.OPEN:
                if time.time() - self.last_failure_time > self.recovery_timeout:
                    self.state = State.HALF_OPEN
                else:
                    raise Exception("Circuit is OPEN")

        try:
            result = func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise

    def _on_success(self):
        with self.lock:
            self.failures = 0
            self.state = State.CLOSED

    def _on_failure(self):
        with self.lock:
            self.failures += 1
            self.last_failure_time = time.time()

            if self.failures >= self.failure_threshold:
                self.state = State.OPEN


# Usage
circuit = CircuitBreaker()

def call_user_service(user_id):
    return requests.get(f"http://user-service/users/{user_id}")

try:
    response = circuit.call(call_user_service, "123")
except Exception as e:
    # Fallback logic
    return cached_user_data
```

### Saga Pattern

Manage distributed transactions.

```python
from abc import ABC, abstractmethod

class SagaStep(ABC):
    @abstractmethod
    def execute(self, context):
        pass

    @abstractmethod
    def compensate(self, context):
        pass

class CreateOrderStep(SagaStep):
    def execute(self, context):
        context['order'] = order_service.create(context['order_data'])
        return True

    def compensate(self, context):
        order_service.cancel(context['order']['id'])

class ReserveInventoryStep(SagaStep):
    def execute(self, context):
        inventory_service.reserve(context['order']['items'])
        return True

    def compensate(self, context):
        inventory_service.release(context['order']['items'])

class ProcessPaymentStep(SagaStep):
    def execute(self, context):
        payment_service.charge(context['order']['total'])
        return True

    def compensate(self, context):
        payment_service.refund(context['order']['total'])

class SagaOrchestrator:
    def __init__(self, steps):
        self.steps = steps

    def execute(self, context):
        completed = []

        for step in self.steps:
            try:
                if not step.execute(context):
                    self._compensate(completed, context)
                    return False
                completed.append(step)
            except Exception as e:
                self._compensate(completed, context)
                raise

        return True

    def _compensate(self, completed, context):
        for step in reversed(completed):
            try:
                step.compensate(context)
            except Exception as e:
                # Log compensation failure
                pass


# Usage
saga = SagaOrchestrator([
    CreateOrderStep(),
    ReserveInventoryStep(),
    ProcessPaymentStep()
])

context = {'order_data': {...}}
success = saga.execute(context)
```

### Sidecar Pattern

Deploy helper containers alongside services.

```yaml
# Kubernetes deployment with sidecar
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
spec:
  template:
    spec:
      containers:
        # Main service
        - name: order-service
          image: order-service:1.0
          ports:
            - containerPort: 8080

        # Sidecar for logging
        - name: log-collector
          image: fluent-bit:latest
          volumeMounts:
            - name: logs
              mountPath: /var/log/app

        # Sidecar for service mesh
        - name: envoy-proxy
          image: envoyproxy/envoy:latest
          ports:
            - containerPort: 15001
```

## Data Management

### Database Per Service

```python
# User Service - PostgreSQL
class UserRepository:
    def __init__(self):
        self.db = PostgreSQL("user_db")

# Order Service - MongoDB
class OrderRepository:
    def __init__(self):
        self.db = MongoDB("order_db")

# Product Service - Redis + PostgreSQL
class ProductRepository:
    def __init__(self):
        self.cache = Redis()
        self.db = PostgreSQL("product_db")
```

### Event Sourcing for Data Consistency

```python
class EventStore:
    def __init__(self):
        self.events = []

    def append(self, event):
        event['timestamp'] = time.time()
        event['sequence'] = len(self.events)
        self.events.append(event)
        self.publish(event)

    def get_events(self, aggregate_id, after_sequence=0):
        return [
            e for e in self.events
            if e['aggregate_id'] == aggregate_id
            and e['sequence'] > after_sequence
        ]

class Order:
    def __init__(self, id):
        self.id = id
        self.status = 'pending'
        self.items = []

    def apply(self, event):
        if event['type'] == 'OrderCreated':
            self.items = event['items']
        elif event['type'] == 'OrderConfirmed':
            self.status = 'confirmed'
        elif event['type'] == 'OrderShipped':
            self.status = 'shipped'

    @classmethod
    def from_events(cls, id, events):
        order = cls(id)
        for event in events:
            order.apply(event)
        return order
```

## Implementation Example

### Go - Complete Microservice

```go
package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gorilla/mux"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

// Domain
type User struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

// Repository
type UserRepository interface {
	FindByID(ctx context.Context, id string) (*User, error)
	Save(ctx context.Context, user *User) error
}

type InMemoryUserRepo struct {
	users map[string]*User
}

func (r *InMemoryUserRepo) FindByID(ctx context.Context, id string) (*User, error) {
	user, exists := r.users[id]
	if !exists {
		return nil, nil
	}
	return user, nil
}

func (r *InMemoryUserRepo) Save(ctx context.Context, user *User) error {
	r.users[user.ID] = user
	return nil
}

// Service
type UserService struct {
	repo UserRepository
}

func (s *UserService) GetUser(ctx context.Context, id string) (*User, error) {
	return s.repo.FindByID(ctx, id)
}

func (s *UserService) CreateUser(ctx context.Context, user *User) error {
	return s.repo.Save(ctx, user)
}

// HTTP Handlers
type UserHandler struct {
	service *UserService
}

func (h *UserHandler) GetUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	user, err := h.service.GetUser(r.Context(), id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if user == nil {
		http.NotFound(w, r)
		return
	}

	json.NewEncoder(w).Encode(user)
}

func (h *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := h.service.CreateUser(r.Context(), &user); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}

// Middleware
func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
	})
}

// Metrics
var (
	requestsTotal = prometheus.NewCounterVec(
		prometheus.CounterOpts{
			Name: "http_requests_total",
			Help: "Total number of HTTP requests",
		},
		[]string{"method", "path", "status"},
	)
)

func init() {
	prometheus.MustRegister(requestsTotal)
}

// Health check
func healthHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(map[string]string{"status": "healthy"})
}

func main() {
	// Initialize
	repo := &InMemoryUserRepo{users: make(map[string]*User)}
	service := &UserService{repo: repo}
	handler := &UserHandler{service: service}

	// Router
	r := mux.NewRouter()
	r.Use(loggingMiddleware)

	// Routes
	r.HandleFunc("/health", healthHandler).Methods("GET")
	r.HandleFunc("/users/{id}", handler.GetUser).Methods("GET")
	r.HandleFunc("/users", handler.CreateUser).Methods("POST")
	r.Handle("/metrics", promhttp.Handler())

	// Server
	srv := &http.Server{
		Addr:         ":8080",
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
	}

	// Graceful shutdown
	go func() {
		log.Println("Starting server on :8080")
		if err := srv.ListenAndServe(); err != http.ErrServerClosed {
			log.Fatalf("Server error: %v", err)
		}
	}()

	// Wait for interrupt
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server shutdown error: %v", err)
	}

	log.Println("Server stopped")
}
```

## Common Interview Questions

1. **How do you handle transactions across services?**
   - Saga pattern (choreography or orchestration)
   - Event sourcing
   - Two-phase commit (rarely recommended)

2. **How do you handle service failures?**
   - Circuit breakers
   - Retries with exponential backoff
   - Fallbacks and graceful degradation

3. **How do you manage service-to-service authentication?**
   - mTLS
   - JWT tokens
   - Service mesh (Istio, Linkerd)

4. **When should you NOT use microservices?**
   - Small team/project
   - Tight deadlines
   - Domain not well understood
   - Performance-critical tight coupling

## Best Practices

1. **Design around business domains** - Use Domain-Driven Design
2. **Keep services small but not too small** - Avoid nano-services
3. **Implement observability** - Logs, metrics, traces
4. **Use async communication** - Reduce coupling
5. **Embrace eventual consistency** - Don't fight CAP theorem
6. **Automate everything** - CI/CD, infrastructure as code

## Related Topics

- [API Gateway](/topic/system-design/api-gateway)
- [Message Queues](/topic/system-design/message-queues)
- [Event Sourcing](/topic/system-design/event-sourcing)
