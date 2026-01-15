# Chain of Responsibility Pattern

## Overview

The Chain of Responsibility pattern passes requests along a chain of handlers. Each handler decides to process the request or pass it to the next handler in the chain.

## Key Concepts

### When to Use

- Multiple handlers for a request
- Handler isn't known beforehand
- Request should be handled by one of several handlers
- Handlers need to be specified dynamically

## Implementation

### Python - Middleware Chain

```python
from abc import ABC, abstractmethod
from typing import Optional, Callable, Dict, Any
from dataclasses import dataclass

@dataclass
class Request:
    path: str
    method: str
    headers: Dict[str, str]
    body: Any = None
    user: Optional[str] = None

@dataclass
class Response:
    status: int
    body: Any
    headers: Dict[str, str] = None


class Handler(ABC):
    def __init__(self):
        self._next: Optional[Handler] = None

    def set_next(self, handler: 'Handler') -> 'Handler':
        self._next = handler
        return handler

    @abstractmethod
    def handle(self, request: Request) -> Optional[Response]:
        pass

    def next(self, request: Request) -> Optional[Response]:
        if self._next:
            return self._next.handle(request)
        return None


class AuthHandler(Handler):
    def handle(self, request: Request) -> Optional[Response]:
        auth = request.headers.get('Authorization', '')
        if not auth.startswith('Bearer '):
            return Response(401, {'error': 'Unauthorized'})
        request.user = auth.split(' ')[1]  # Extract token
        return self.next(request)


class RateLimitHandler(Handler):
    def __init__(self, limit: int = 100):
        super().__init__()
        self.limit = limit
        self.requests = {}

    def handle(self, request: Request) -> Optional[Response]:
        user = request.user or request.headers.get('X-Forwarded-For', 'anonymous')
        self.requests[user] = self.requests.get(user, 0) + 1
        if self.requests[user] > self.limit:
            return Response(429, {'error': 'Too many requests'})
        return self.next(request)


class ValidationHandler(Handler):
    def handle(self, request: Request) -> Optional[Response]:
        if request.method == 'POST' and not request.body:
            return Response(400, {'error': 'Body required for POST'})
        return self.next(request)


class LoggingHandler(Handler):
    def handle(self, request: Request) -> Optional[Response]:
        print(f"[LOG] {request.method} {request.path} by {request.user}")
        response = self.next(request)
        print(f"[LOG] Response: {response.status if response else 'No response'}")
        return response


class FinalHandler(Handler):
    def handle(self, request: Request) -> Optional[Response]:
        return Response(200, {'message': f'Handled {request.path}'})


# Build chain
auth = AuthHandler()
rate_limit = RateLimitHandler(limit=10)
validation = ValidationHandler()
logging = LoggingHandler()
final = FinalHandler()

auth.set_next(rate_limit).set_next(validation).set_next(logging).set_next(final)

# Test requests
requests = [
    Request('/api/users', 'GET', {}),  # No auth
    Request('/api/users', 'GET', {'Authorization': 'Bearer token123'}),  # OK
    Request('/api/users', 'POST', {'Authorization': 'Bearer token123'}),  # No body
    Request('/api/users', 'POST', {'Authorization': 'Bearer token123'}, {'name': 'Alice'}),  # OK
]

for req in requests:
    print(f"\n--- Request: {req.method} {req.path} ---")
    response = auth.handle(req)
    print(f"Result: {response}")
```

### Go - Approval Chain

```go
package main

import "fmt"

type PurchaseRequest struct {
	ID       string
	Amount   float64
	Purpose  string
	Approved bool
	Approver string
}

type Approver interface {
	SetNext(approver Approver)
	Approve(request *PurchaseRequest)
}

type BaseApprover struct {
	next     Approver
	name     string
	limit    float64
}

func (a *BaseApprover) SetNext(approver Approver) {
	a.next = approver
}

func (a *BaseApprover) passToNext(request *PurchaseRequest) {
	if a.next != nil {
		a.next.Approve(request)
	} else {
		fmt.Printf("Request %s ($%.2f) requires board approval\n", request.ID, request.Amount)
	}
}

type TeamLead struct {
	BaseApprover
}

func NewTeamLead() *TeamLead {
	return &TeamLead{BaseApprover{name: "Team Lead", limit: 1000}}
}

func (t *TeamLead) Approve(request *PurchaseRequest) {
	if request.Amount <= t.limit {
		request.Approved = true
		request.Approver = t.name
		fmt.Printf("Request %s ($%.2f) approved by %s\n", request.ID, request.Amount, t.name)
	} else {
		fmt.Printf("Request %s ($%.2f) exceeds %s limit, passing up\n", request.ID, request.Amount, t.name)
		t.passToNext(request)
	}
}

type Manager struct {
	BaseApprover
}

func NewManager() *Manager {
	return &Manager{BaseApprover{name: "Manager", limit: 5000}}
}

func (m *Manager) Approve(request *PurchaseRequest) {
	if request.Amount <= m.limit {
		request.Approved = true
		request.Approver = m.name
		fmt.Printf("Request %s ($%.2f) approved by %s\n", request.ID, request.Amount, m.name)
	} else {
		fmt.Printf("Request %s ($%.2f) exceeds %s limit, passing up\n", request.ID, request.Amount, m.name)
		m.passToNext(request)
	}
}

type Director struct {
	BaseApprover
}

func NewDirector() *Director {
	return &Director{BaseApprover{name: "Director", limit: 25000}}
}

func (d *Director) Approve(request *PurchaseRequest) {
	if request.Amount <= d.limit {
		request.Approved = true
		request.Approver = d.name
		fmt.Printf("Request %s ($%.2f) approved by %s\n", request.ID, request.Amount, d.name)
	} else {
		fmt.Printf("Request %s ($%.2f) exceeds %s limit, passing up\n", request.ID, request.Amount, d.name)
		d.passToNext(request)
	}
}

func main() {
	teamLead := NewTeamLead()
	manager := NewManager()
	director := NewDirector()

	teamLead.SetNext(manager)
	manager.SetNext(director)

	requests := []*PurchaseRequest{
		{ID: "PR-001", Amount: 500, Purpose: "Office supplies"},
		{ID: "PR-002", Amount: 3000, Purpose: "New laptop"},
		{ID: "PR-003", Amount: 15000, Purpose: "Server equipment"},
		{ID: "PR-004", Amount: 50000, Purpose: "Office renovation"},
	}

	for _, req := range requests {
		fmt.Println()
		teamLead.Approve(req)
	}
}
```

## Best Practices

1. **Keep handlers focused** - Single responsibility
2. **Consider order** - Handler sequence matters
3. **Provide default** - Handle unprocessed requests
4. **Allow short-circuit** - Stop chain when handled

## Related Patterns

- [Command](/topic/design-patterns/command) - Encapsulate requests
- [Decorator](/topic/design-patterns/decorator) - Similar structure
- [Composite](/topic/design-patterns/composite) - Tree of handlers
