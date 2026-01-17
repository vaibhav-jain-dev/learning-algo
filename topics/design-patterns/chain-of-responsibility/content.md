# Chain of Responsibility Pattern

## Overview

The Chain of Responsibility pattern passes requests along a chain of handlers. Each handler decides to process the request or pass it to the next handler in the chain.

## Mental Model & Thinking Process

### When Your Brain Should Think "Chain of Responsibility"

Ask yourself these questions:
1. **Do multiple objects have the potential to handle this request?**
2. **Should the sender NOT know which handler will process it?**
3. **Do I want to add/remove/reorder handlers dynamically?**
4. **Should handlers be decoupled from each other?**

If yes to most, Chain of Responsibility is a good fit.

---

## Key Concepts

### When to Use

- Multiple handlers for a request
- Handler isn't known beforehand
- Request should be handled by one of several handlers
- Handlers need to be specified dynamically

### Real-World Examples

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #e94560;">

| Domain | Chain | Handlers |
|--------|-------|----------|
| **Web Framework** | Middleware pipeline | Auth → CORS → Logging → Rate Limit → Route |
| **Approval System** | Purchase approval | Team Lead → Manager → Director → Board |
| **Exception Handling** | Try-catch chain | Specific Handler → Generic Handler → Default |
| **Event Propagation** | DOM events | Button → Form → Page → Document |
| **Support Tickets** | Escalation | L1 Support → L2 → Engineering → Management |

</div>

### Structure

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center; font-size: 16px;">Chain of Responsibility Flow</h4>

<div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">

<!-- Client -->
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 16px 20px; border-radius: 12px; text-align: center;">
<div style="color: #fff; font-size: 20px;">👤</div>
<div style="color: #fff; font-weight: bold; font-size: 12px;">Client</div>
<div style="color: #eddeff; font-size: 10px;">Sends request</div>
</div>

<div style="color: #7ee787; font-size: 20px;">→</div>

<!-- Handler 1 -->
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 16px 20px; border-radius: 12px; text-align: center;">
<div style="color: #fff; font-size: 20px;">🔗</div>
<div style="color: #fff; font-weight: bold; font-size: 12px;">Handler A</div>
<div style="color: #a5d6ff; font-size: 10px;">Auth check</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #7ee787; font-size: 10px;">pass</div>
<div style="color: #7ee787; font-size: 20px;">→</div>
</div>

<!-- Handler 2 -->
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 16px 20px; border-radius: 12px; text-align: center;">
<div style="color: #fff; font-size: 20px;">🔗</div>
<div style="color: #fff; font-weight: bold; font-size: 12px;">Handler B</div>
<div style="color: #d1f5d3; font-size: 10px;">Validate</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #7ee787; font-size: 10px;">pass</div>
<div style="color: #7ee787; font-size: 20px;">→</div>
</div>

<!-- Handler 3 -->
<div style="background: linear-gradient(135deg, #f78166 0%, #ffa657 100%); padding: 16px 20px; border-radius: 12px; text-align: center;">
<div style="color: #fff; font-size: 20px;">🔗</div>
<div style="color: #fff; font-weight: bold; font-size: 12px;">Handler C</div>
<div style="color: #ffe2cc; font-size: 10px;">Process</div>
</div>

<div style="color: #7ee787; font-size: 20px;">→</div>

<!-- Response -->
<div style="background: #21262d; padding: 16px 20px; border-radius: 12px; text-align: center; border: 2px solid #30363d;">
<div style="color: #7ee787; font-size: 20px;">✓</div>
<div style="color: #7ee787; font-weight: bold; font-size: 12px;">Response</div>
</div>

</div>

<!-- Short circuit example -->
<div style="margin-top: 24px; text-align: center;">
<div style="background: #21262d; padding: 12px 20px; border-radius: 8px; display: inline-block;">
<div style="color: #f85149; font-size: 11px;">If Handler A fails auth: <span style="color: #ffa657;">stops chain, returns 401</span></div>
<div style="color: #7ee787; font-size: 11px; margin-top: 4px;">If all pass: request handled by appropriate handler</div>
</div>
</div>

</div>

### Handler Decision Flow

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a7b 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #4ecdc4;">

```
handle(request):
    if (can_handle(request)):
        return process(request)      ← Handle it myself
    else if (next_handler):
        return next_handler.handle(request)  ← Pass to next
    else:
        return default_response      ← End of chain
```

**Key Insight**: Each handler has 3 choices:
1. **Handle** the request and return response
2. **Pass** to next handler
3. **Handle partially** then pass (e.g., add data, then continue)

</div>

---

## Pros and Cons

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); border-radius: 12px; padding: 20px;">

### Pros

- **Decoupling**: Sender doesn't know handler
- **Flexibility**: Add/remove handlers at runtime
- **Single Responsibility**: Each handler does one thing
- **Open/Closed**: New handlers don't change existing code
- **Order Control**: Configure processing sequence

</div>

<div style="background: linear-gradient(135deg, #4a1a1a 0%, #6b2d2d 100%); border-radius: 12px; padding: 20px;">

### Cons

- **No guarantee**: Request might not be handled
- **Debugging hard**: Following chain is complex
- **Performance**: Long chains add latency
- **Chain setup**: Configuration can be tricky
- **Implicit flow**: Logic spread across handlers

</div>

</div>

---

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
