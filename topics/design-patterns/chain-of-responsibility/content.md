# Chain of Responsibility Pattern

## Overview

The Chain of Responsibility pattern passes requests along a chain of handlers. Each handler decides to process the request or pass it to the next handler in the chain. It decouples senders from receivers by giving multiple objects a chance to handle the request.

**Difficulty:** Intermediate
**Category:** Behavioral Pattern
**First Documented:** GoF (1994)

---

## Simple Explanation: The Customer Support Escalation

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h3 style="color: #1e293b; margin-top: 0; font-size: 1.3rem;">Think of Customer Support Escalation</h3>

<p style="color: #334155; font-size: 1rem; line-height: 1.7;">
When you contact customer support with a problem, your request goes through a chain:
</p>

<div style="display: flex; flex-wrap: wrap; gap: 8px; margin: 20px 0; align-items: center; justify-content: center;">
<div style="background: #dbeafe; padding: 14px 18px; border-radius: 10px; text-align: center;">
<div style="color: #1e40af; font-weight: 700; font-size: 0.9rem;">Chatbot</div>
<div style="color: #1e3a8a; font-size: 0.75rem;">FAQs, simple issues</div>
</div>
<div style="color: #64748b; font-size: 1.2rem;">&#8594;</div>
<div style="background: #dcfce7; padding: 14px 18px; border-radius: 10px; text-align: center;">
<div style="color: #166534; font-weight: 700; font-size: 0.9rem;">L1 Support</div>
<div style="color: #14532d; font-size: 0.75rem;">Common problems</div>
</div>
<div style="color: #64748b; font-size: 1.2rem;">&#8594;</div>
<div style="background: #fef3c7; padding: 14px 18px; border-radius: 10px; text-align: center;">
<div style="color: #92400e; font-weight: 700; font-size: 0.9rem;">L2 Support</div>
<div style="color: #78350f; font-size: 0.75rem;">Technical issues</div>
</div>
<div style="color: #64748b; font-size: 1.2rem;">&#8594;</div>
<div style="background: #fce7f3; padding: 14px 18px; border-radius: 10px; text-align: center;">
<div style="color: #9d174d; font-weight: 700; font-size: 0.9rem;">Engineering</div>
<div style="color: #831843; font-size: 0.75rem;">Complex bugs</div>
</div>
<div style="color: #64748b; font-size: 1.2rem;">&#8594;</div>
<div style="background: #e0e7ff; padding: 14px 18px; border-radius: 10px; text-align: center;">
<div style="color: #3730a3; font-weight: 700; font-size: 0.9rem;">Management</div>
<div style="color: #312e81; font-size: 0.75rem;">Escalations</div>
</div>
</div>

<p style="color: #334155; font-size: 1rem; line-height: 1.7;">
Each level tries to handle your issue. If they can't, they escalate to the next level. You don't need to know who will ultimately solve your problem - the chain figures it out.
</p>

<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 16px;">
<strong style="color: #0f172a;">The Key Insight:</strong>
<span style="color: #334155;"> The sender doesn't know (or care) which handler will process the request. Each handler decides: handle it, pass it on, or both.</span>
</div>
</div>

---

## Real Company Usage

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">

| Company/Framework | How They Use Chain of Responsibility |
|-------------------|-------------------------------------|
| **Express.js** | Middleware chain (auth, logging, parsing, routing) |
| **Django** | Middleware pipeline for request/response processing |
| **Spring** | Filter chains for security, logging, compression |
| **AWS Lambda** | Event handlers in serverless pipelines |
| **Stripe** | Webhook handlers for different event types |
| **Logging (Python)** | Logger hierarchy with different handlers |
| **DOM Events** | Event bubbling from child to parent elements |

</div>

---

## Pattern Structure

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h4 style="color: #1e293b; margin-top: 0; text-align: center; font-size: 1.1rem;">Chain of Responsibility Flow</h4>

<div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; margin: 24px 0;">

<!-- Client -->
<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; padding: 16px 20px; text-align: center; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);">
<div style="color: #1e40af; font-weight: 700;">Client</div>
<div style="color: #1e3a8a; font-size: 0.8rem;">Sends request</div>
</div>

<div style="color: #22c55e; font-size: 1.5rem;">&#8594;</div>

<!-- Handler A -->
<div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; padding: 16px 20px; text-align: center;">
<div style="color: #166534; font-weight: 700;">Handler A</div>
<div style="color: #14532d; font-size: 0.8rem;">Auth check</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #64748b; font-size: 0.7rem;">pass</div>
<div style="color: #22c55e; font-size: 1.5rem;">&#8594;</div>
</div>

<!-- Handler B -->
<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 16px 20px; text-align: center;">
<div style="color: #92400e; font-weight: 700;">Handler B</div>
<div style="color: #78350f; font-size: 0.8rem;">Validate</div>
</div>

<div style="display: flex; flex-direction: column; align-items: center;">
<div style="color: #64748b; font-size: 0.7rem;">pass</div>
<div style="color: #22c55e; font-size: 1.5rem;">&#8594;</div>
</div>

<!-- Handler C -->
<div style="background: #fce7f3; border: 2px solid #ec4899; border-radius: 12px; padding: 16px 20px; text-align: center;">
<div style="color: #9d174d; font-weight: 700;">Handler C</div>
<div style="color: #831843; font-size: 0.8rem;">Process</div>
</div>

<div style="color: #22c55e; font-size: 1.5rem;">&#8594;</div>

<!-- Response -->
<div style="background: #f1f5f9; border: 2px solid #64748b; border-radius: 12px; padding: 16px 20px; text-align: center;">
<div style="color: #22c55e; font-weight: 700;">Response</div>
</div>

</div>

<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 16px;">
<strong style="color: #0f172a;">Handler Decision:</strong>
<span style="color: #334155;"> Each handler can: (1) Handle and stop, (2) Handle and pass, or (3) Just pass to next.</span>
</div>
</div>

---

## When to Use Chain of Responsibility

<div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">

### Good Use Cases

1. **Middleware Pipelines** - HTTP request processing (auth, logging, parsing)
2. **Approval Workflows** - Purchase requests through manager hierarchy
3. **Event Handling** - UI events bubbling up the component tree
4. **Logging Systems** - Different handlers for different log levels
5. **Input Validation** - Chain of validators for form data
6. **Exception Handling** - Try-catch chains with different handlers
7. **Command Processing** - Route commands to appropriate handlers

</div>

---

## Anti-Patterns: When NOT to Use

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">

### Common Mistakes

1. **Guaranteed Handler Required** - If every request MUST be handled, ensure a default handler
2. **Too Long Chains** - Performance degrades; consider direct routing instead
3. **Circular Chains** - Accidentally creating loops causes infinite processing
4. **Order Dependencies** - When handlers have complex interdependencies
5. **When Simple If-Else Works** - Don't over-engineer simple conditional logic

</div>

```python
# OVERKILL: Chain for simple logic
class SmallHandler: ...
class MediumHandler: ...
class LargeHandler: ...
# Chain just to check sizes? Too complex!

# BETTER: Simple conditional
def process(size):
    if size < 10: return handle_small()
    elif size < 100: return handle_medium()
    else: return handle_large()
```

---

## Python Implementation

### HTTP Middleware Chain

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Optional, Dict, Any, Callable, List
from datetime import datetime
import json
import time


@dataclass
class Request:
    """HTTP-like request object."""
    path: str
    method: str
    headers: Dict[str, str] = field(default_factory=dict)
    body: Optional[Any] = None
    user: Optional[str] = None
    context: Dict[str, Any] = field(default_factory=dict)


@dataclass
class Response:
    """HTTP-like response object."""
    status: int
    body: Any
    headers: Dict[str, str] = field(default_factory=dict)


class Handler(ABC):
    """
    Base handler in the chain.
    Each handler can process the request and/or pass to next.
    """

    def __init__(self):
        self._next: Optional['Handler'] = None

    def set_next(self, handler: 'Handler') -> 'Handler':
        """Set the next handler and return it for chaining."""
        self._next = handler
        return handler

    def handle(self, request: Request) -> Optional[Response]:
        """Process request. Override in subclasses."""
        return self._pass_to_next(request)

    def _pass_to_next(self, request: Request) -> Optional[Response]:
        """Pass request to next handler in chain."""
        if self._next:
            return self._next.handle(request)
        return None


class AuthenticationHandler(Handler):
    """Verify authentication token."""

    def __init__(self, valid_tokens: set = None):
        super().__init__()
        self.valid_tokens = valid_tokens or {"token123", "admin_token"}

    def handle(self, request: Request) -> Optional[Response]:
        auth_header = request.headers.get("Authorization", "")

        if not auth_header.startswith("Bearer "):
            return Response(
                status=401,
                body={"error": "Missing or invalid Authorization header"}
            )

        token = auth_header.split(" ")[1]
        if token not in self.valid_tokens:
            return Response(
                status=401,
                body={"error": "Invalid token"}
            )

        # Set user info for downstream handlers
        request.user = f"user_{token[:5]}"
        request.context["authenticated"] = True

        return self._pass_to_next(request)


class RateLimitHandler(Handler):
    """Limit requests per user/IP."""

    def __init__(self, max_requests: int = 100, window_seconds: int = 60):
        super().__init__()
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self._request_counts: Dict[str, List[float]] = {}

    def handle(self, request: Request) -> Optional[Response]:
        identifier = request.user or request.headers.get("X-Forwarded-For", "unknown")
        current_time = time.time()

        # Get or create request history
        if identifier not in self._request_counts:
            self._request_counts[identifier] = []

        # Remove old requests outside window
        cutoff = current_time - self.window_seconds
        self._request_counts[identifier] = [
            t for t in self._request_counts[identifier] if t > cutoff
        ]

        # Check rate limit
        if len(self._request_counts[identifier]) >= self.max_requests:
            return Response(
                status=429,
                body={"error": "Rate limit exceeded"},
                headers={"Retry-After": str(self.window_seconds)}
            )

        # Record this request
        self._request_counts[identifier].append(current_time)
        request.context["rate_limit_remaining"] = (
            self.max_requests - len(self._request_counts[identifier])
        )

        return self._pass_to_next(request)


class ValidationHandler(Handler):
    """Validate request data."""

    def handle(self, request: Request) -> Optional[Response]:
        # POST/PUT requests should have a body
        if request.method in ("POST", "PUT", "PATCH"):
            if not request.body:
                return Response(
                    status=400,
                    body={"error": "Request body required"}
                )

            # Validate JSON if Content-Type indicates JSON
            content_type = request.headers.get("Content-Type", "")
            if "application/json" in content_type:
                if not isinstance(request.body, (dict, list)):
                    return Response(
                        status=400,
                        body={"error": "Invalid JSON body"}
                    )

        return self._pass_to_next(request)


class LoggingHandler(Handler):
    """Log request and response details."""

    def handle(self, request: Request) -> Optional[Response]:
        start_time = time.time()

        # Log incoming request
        print(f"[{datetime.now().isoformat()}] --> {request.method} {request.path}")
        print(f"    User: {request.user or 'anonymous'}")

        # Process rest of chain
        response = self._pass_to_next(request)

        # Log response
        duration_ms = (time.time() - start_time) * 1000
        status = response.status if response else "NO_RESPONSE"
        print(f"[{datetime.now().isoformat()}] <-- {status} ({duration_ms:.2f}ms)")

        return response


class CORSHandler(Handler):
    """Handle Cross-Origin Resource Sharing."""

    def __init__(self, allowed_origins: List[str] = None):
        super().__init__()
        self.allowed_origins = allowed_origins or ["*"]

    def handle(self, request: Request) -> Optional[Response]:
        origin = request.headers.get("Origin", "")

        # Handle preflight OPTIONS request
        if request.method == "OPTIONS":
            return Response(
                status=204,
                body=None,
                headers={
                    "Access-Control-Allow-Origin": self._get_allowed_origin(origin),
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type, Authorization",
                    "Access-Control-Max-Age": "86400"
                }
            )

        # Add CORS headers for regular requests
        response = self._pass_to_next(request)
        if response:
            response.headers["Access-Control-Allow-Origin"] = self._get_allowed_origin(origin)

        return response

    def _get_allowed_origin(self, origin: str) -> str:
        if "*" in self.allowed_origins:
            return "*"
        if origin in self.allowed_origins:
            return origin
        return self.allowed_origins[0] if self.allowed_origins else ""


class RoutingHandler(Handler):
    """Route requests to appropriate handlers."""

    def __init__(self):
        super().__init__()
        self._routes: Dict[str, Dict[str, Callable]] = {}

    def route(self, path: str, method: str, handler: Callable):
        """Register a route handler."""
        if path not in self._routes:
            self._routes[path] = {}
        self._routes[path][method] = handler

    def handle(self, request: Request) -> Optional[Response]:
        # Find matching route
        path_handlers = self._routes.get(request.path)
        if not path_handlers:
            return Response(status=404, body={"error": "Not found"})

        method_handler = path_handlers.get(request.method)
        if not method_handler:
            return Response(
                status=405,
                body={"error": "Method not allowed"},
                headers={"Allow": ", ".join(path_handlers.keys())}
            )

        # Execute route handler
        try:
            return method_handler(request)
        except Exception as e:
            return Response(
                status=500,
                body={"error": str(e)}
            )


# Build the middleware chain
def create_app():
    """Create application with middleware chain."""

    # Create handlers
    logging = LoggingHandler()
    cors = CORSHandler(allowed_origins=["https://example.com", "http://localhost:3000"])
    auth = AuthenticationHandler()
    rate_limit = RateLimitHandler(max_requests=10, window_seconds=60)
    validation = ValidationHandler()
    router = RoutingHandler()

    # Build chain: logging -> cors -> auth -> rate_limit -> validation -> router
    logging.set_next(cors).set_next(auth).set_next(rate_limit).set_next(validation).set_next(router)

    # Register routes
    router.route("/api/users", "GET", lambda req: Response(
        status=200,
        body={"users": [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]}
    ))

    router.route("/api/users", "POST", lambda req: Response(
        status=201,
        body={"created": req.body, "id": 3}
    ))

    return logging  # Return first handler in chain


# Usage
app = create_app()

print("=== Test 1: Valid GET request ===")
response = app.handle(Request(
    path="/api/users",
    method="GET",
    headers={"Authorization": "Bearer token123"}
))
print(f"Response: {response}\n")

print("=== Test 2: Missing auth ===")
response = app.handle(Request(
    path="/api/users",
    method="GET",
    headers={}
))
print(f"Response: {response}\n")

print("=== Test 3: POST with body ===")
response = app.handle(Request(
    path="/api/users",
    method="POST",
    headers={
        "Authorization": "Bearer token123",
        "Content-Type": "application/json"
    },
    body={"name": "Charlie", "email": "charlie@example.com"}
))
print(f"Response: {response}\n")

print("=== Test 4: POST without body ===")
response = app.handle(Request(
    path="/api/users",
    method="POST",
    headers={
        "Authorization": "Bearer token123",
        "Content-Type": "application/json"
    }
))
print(f"Response: {response}\n")
```

### Approval Workflow

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Optional
from enum import Enum
from datetime import datetime


class ApprovalStatus(Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    ESCALATED = "escalated"


@dataclass
class PurchaseRequest:
    """Purchase request to be approved."""
    id: str
    amount: float
    description: str
    requester: str
    status: ApprovalStatus = ApprovalStatus.PENDING
    approved_by: Optional[str] = None
    rejection_reason: Optional[str] = None
    approval_history: list = None

    def __post_init__(self):
        if self.approval_history is None:
            self.approval_history = []


class Approver(ABC):
    """Base approver in the chain."""

    def __init__(self, name: str, approval_limit: float):
        self._next: Optional['Approver'] = None
        self.name = name
        self.approval_limit = approval_limit

    def set_next(self, approver: 'Approver') -> 'Approver':
        self._next = approver
        return approver

    def handle(self, request: PurchaseRequest) -> PurchaseRequest:
        """Process approval request."""
        # Check if within approval limit
        if request.amount <= self.approval_limit:
            return self._approve(request)

        # Check for rejection conditions
        rejection_reason = self._check_rejection(request)
        if rejection_reason:
            return self._reject(request, rejection_reason)

        # Escalate to next approver
        return self._escalate(request)

    def _approve(self, request: PurchaseRequest) -> PurchaseRequest:
        """Approve the request."""
        request.status = ApprovalStatus.APPROVED
        request.approved_by = self.name
        request.approval_history.append({
            "approver": self.name,
            "action": "approved",
            "timestamp": datetime.now().isoformat(),
            "limit": self.approval_limit
        })
        print(f"  [APPROVED] by {self.name} (limit: ${self.approval_limit:,.0f})")
        return request

    def _reject(self, request: PurchaseRequest, reason: str) -> PurchaseRequest:
        """Reject the request."""
        request.status = ApprovalStatus.REJECTED
        request.rejection_reason = reason
        request.approval_history.append({
            "approver": self.name,
            "action": "rejected",
            "reason": reason,
            "timestamp": datetime.now().isoformat()
        })
        print(f"  [REJECTED] by {self.name}: {reason}")
        return request

    def _escalate(self, request: PurchaseRequest) -> PurchaseRequest:
        """Escalate to next approver."""
        request.approval_history.append({
            "approver": self.name,
            "action": "escalated",
            "reason": f"Amount ${request.amount:,.0f} exceeds limit ${self.approval_limit:,.0f}",
            "timestamp": datetime.now().isoformat()
        })
        print(f"  [ESCALATED] by {self.name} (amount exceeds ${self.approval_limit:,.0f} limit)")

        if self._next:
            return self._next.handle(request)

        # No more approvers - reject as too high
        return self._reject(request, "Amount exceeds maximum approval authority")

    def _check_rejection(self, request: PurchaseRequest) -> Optional[str]:
        """Override to add rejection conditions. Return reason if should reject."""
        return None


class TeamLeadApprover(Approver):
    """Team lead can approve small purchases."""

    def __init__(self):
        super().__init__("Team Lead", approval_limit=1000)

    def _check_rejection(self, request: PurchaseRequest) -> Optional[str]:
        # Team lead can reject vague descriptions
        if len(request.description) < 10:
            return "Description too vague - please provide more detail"
        return None


class ManagerApprover(Approver):
    """Manager can approve medium purchases."""

    def __init__(self):
        super().__init__("Manager", approval_limit=10000)


class DirectorApprover(Approver):
    """Director can approve large purchases."""

    def __init__(self):
        super().__init__("Director", approval_limit=50000)

    def _check_rejection(self, request: PurchaseRequest) -> Optional[str]:
        # Director rejects non-business-critical items over $25k
        if request.amount > 25000 and "critical" not in request.description.lower():
            return "Items over $25,000 must be business-critical"
        return None


class CFOApprover(Approver):
    """CFO can approve very large purchases."""

    def __init__(self):
        super().__init__("CFO", approval_limit=500000)


class BoardApprover(Approver):
    """Board approval for massive purchases."""

    def __init__(self):
        super().__init__("Board of Directors", approval_limit=float('inf'))

    def _check_rejection(self, request: PurchaseRequest) -> Optional[str]:
        # Board only meets monthly - reject urgent requests
        if "urgent" in request.description.lower():
            return "Board approval requires 30-day lead time"
        return None


# Build approval chain
def create_approval_chain() -> Approver:
    team_lead = TeamLeadApprover()
    manager = ManagerApprover()
    director = DirectorApprover()
    cfo = CFOApprover()
    board = BoardApprover()

    team_lead.set_next(manager).set_next(director).set_next(cfo).set_next(board)

    return team_lead


# Test the approval chain
chain = create_approval_chain()

requests = [
    PurchaseRequest("PR-001", 500, "Office supplies for team", "Alice"),
    PurchaseRequest("PR-002", 5000, "New development laptops", "Bob"),
    PurchaseRequest("PR-003", 25000, "Server upgrade for critical infrastructure", "Charlie"),
    PurchaseRequest("PR-004", 75000, "New office furniture", "Diana"),  # Will be rejected
    PurchaseRequest("PR-005", 75000, "Critical security system upgrade", "Eve"),
    PurchaseRequest("PR-006", 100, "Bad", "Frank"),  # Vague description
    PurchaseRequest("PR-007", 1000000, "Urgent new building", "Grace"),  # Board rejection
]

for req in requests:
    print(f"\n{'='*50}")
    print(f"Processing: {req.id} - ${req.amount:,.0f} - '{req.description}'")
    result = chain.handle(req)
    print(f"Final Status: {result.status.value}")
    if result.approved_by:
        print(f"Approved by: {result.approved_by}")
    if result.rejection_reason:
        print(f"Rejection: {result.rejection_reason}")
```

---

## Chain of Responsibility vs Related Patterns

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">

<div style="background: #dbeafe; padding: 20px; border-radius: 12px; border-top: 4px solid #3b82f6;">
<h4 style="color: #1e40af; margin-top: 0;">Chain of Responsibility</h4>
<p style="color: #1e3a8a; font-size: 0.9rem; margin-bottom: 12px;">Passes request through handlers until processed.</p>
<div style="background: #eff6ff; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
<strong style="color: #1e40af;">Handler decides:</strong> <span style="color: #1e3a8a;">Process or pass</span><br>
<strong style="color: #1e40af;">Result:</strong> <span style="color: #1e3a8a;">0 or 1 handler processes</span>
</div>
</div>

<div style="background: #dcfce7; padding: 20px; border-radius: 12px; border-top: 4px solid #22c55e;">
<h4 style="color: #166534; margin-top: 0;">Decorator</h4>
<p style="color: #14532d; font-size: 0.9rem; margin-bottom: 12px;">Wraps objects to add behavior.</p>
<div style="background: #f0fdf4; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
<strong style="color: #166534;">All decorators:</strong> <span style="color: #14532d;">Add behavior</span><br>
<strong style="color: #166534;">Result:</strong> <span style="color: #14532d;">All enhance the object</span>
</div>
</div>

<div style="background: #fef3c7; padding: 20px; border-radius: 12px; border-top: 4px solid #f59e0b;">
<h4 style="color: #92400e; margin-top: 0;">Command</h4>
<p style="color: #78350f; font-size: 0.9rem; margin-bottom: 12px;">Encapsulates request as object.</p>
<div style="background: #fffbeb; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
<strong style="color: #92400e;">Request is:</strong> <span style="color: #78350f;">Stored/queued</span><br>
<strong style="color: #92400e;">Handler:</strong> <span style="color: #78350f;">Known in advance</span>
</div>
</div>

</div>

<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 20px;">
<strong style="color: #0f172a;">Quick Decision:</strong>
<ul style="color: #334155; margin-bottom: 0;">
<li><strong>Chain:</strong> "I don't know who should handle this - let the chain decide"</li>
<li><strong>Decorator:</strong> "I want to add features to this object"</li>
<li><strong>Command:</strong> "I want to parameterize, queue, or log operations"</li>
</ul>
</div>
</div>

---

## Interview Questions

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">

### Conceptual Questions

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q1: What happens if no handler processes the request?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
<strong>Options:</strong>
<ol>
<li><strong>Return null/None:</strong> Client checks and handles "no handler" case</li>
<li><strong>Default handler:</strong> Add a catch-all handler at the end of chain</li>
<li><strong>Throw exception:</strong> Fail explicitly if handling is required</li>
<li><strong>Return error response:</strong> Common in HTTP middleware (404 Not Found)</li>
</ol>

<strong>Best practice:</strong> Always have a default handler or explicit error for required processing:
<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px; margin-top: 8px;">
class DefaultHandler(Handler):
    def handle(self, request):
        return Response(status=404, body="Not found")

# Ensure chain ends with default
chain.set_next(handler_a).set_next(handler_b).set_next(DefaultHandler())
</pre>
</div>
</details>

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q2: How do you handle errors in middleware chains?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
<strong>Strategies:</strong>

<strong>1. Error handler middleware:</strong>
<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px;">
class ErrorHandler(Handler):
    def handle(self, request):
        try:
            return self._pass_to_next(request)
        except Exception as e:
            return Response(status=500, body={"error": str(e)})
</pre>

<strong>2. Result objects:</strong>
<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px;">
@dataclass
class Result:
    success: bool
    data: Any = None
    error: str = None
</pre>

<strong>3. Exception propagation:</strong>
Let exceptions bubble up and handle at top level.

<strong>Best practice:</strong> Use error handler middleware at the start of chain.
</div>
</details>

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q3: Can handlers modify the request for downstream handlers?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
<strong>Yes!</strong> This is a common and useful pattern.

<strong>Example: Authentication handler adds user info:</strong>
<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px;">
class AuthHandler(Handler):
    def handle(self, request):
        token = request.headers.get("Authorization")
        user = validate_token(token)
        request.user = user  # Enrich request
        request.context["permissions"] = user.permissions
        return self._pass_to_next(request)

# Downstream handler uses enriched data
class AuthorizationHandler(Handler):
    def handle(self, request):
        if "admin" not in request.context["permissions"]:
            return Response(status=403, body="Forbidden")
        return self._pass_to_next(request)
</pre>

<strong>Caution:</strong> Document what each handler adds to avoid hidden dependencies.
</div>
</details>

### Coding Questions

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q4: Implement a discount chain for e-commerce</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px; overflow-x: auto;">
class DiscountHandler(ABC):
    def __init__(self):
        self._next = None

    def set_next(self, handler):
        self._next = handler
        return handler

    def apply(self, order):
        discount = self._calculate_discount(order)
        order.discounts.append(discount)
        if self._next:
            return self._next.apply(order)
        return order

    @abstractmethod
    def _calculate_discount(self, order): pass

class LoyaltyDiscount(DiscountHandler):
    def _calculate_discount(self, order):
        if order.customer.loyalty_years > 5:
            return {"type": "loyalty", "amount": order.total * 0.10}
        return {"type": "loyalty", "amount": 0}

class BulkDiscount(DiscountHandler):
    def _calculate_discount(self, order):
        if order.item_count > 10:
            return {"type": "bulk", "amount": order.total * 0.05}
        return {"type": "bulk", "amount": 0}

class CouponDiscount(DiscountHandler):
    def _calculate_discount(self, order):
        if order.coupon_code == "SAVE20":
            return {"type": "coupon", "amount": 20}
        return {"type": "coupon", "amount": 0}
</pre>
</div>
</details>

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q5: How would you make the chain order configurable at runtime?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px; overflow-x: auto;">
class ChainBuilder:
    def __init__(self):
        self._handlers = []

    def add(self, handler):
        self._handlers.append(handler)
        return self

    def build(self):
        if not self._handlers:
            raise ValueError("Chain must have at least one handler")

        for i in range(len(self._handlers) - 1):
            self._handlers[i].set_next(self._handlers[i + 1])

        return self._handlers[0]

# Usage - configurable order
builder = ChainBuilder()

if config.get("enable_logging"):
    builder.add(LoggingHandler())

if config.get("require_auth"):
    builder.add(AuthHandler())

builder.add(ValidationHandler())
builder.add(RouterHandler())

chain = builder.build()
</pre>
</div>
</details>

</div>

---

## Common Mistakes

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #fecaca;">

### Mistake 1: Forgetting Default Handler

```python
# BAD: Request might not be handled
chain = auth.set_next(validation).set_next(router)
response = chain.handle(request)  # Could be None!

# GOOD: Always have a fallback
class NotFoundHandler(Handler):
    def handle(self, request):
        return Response(status=404, body={"error": "Not found"})

chain = auth.set_next(validation).set_next(router).set_next(NotFoundHandler())
```

### Mistake 2: Circular Chain

```python
# BAD: Infinite loop!
handler_a.set_next(handler_b)
handler_b.set_next(handler_a)  # Circular!

# GOOD: Linear chain with termination
handler_a.set_next(handler_b).set_next(handler_c)  # Ends at c
```

### Mistake 3: Order-Dependent Hidden Bugs

```python
# BAD: Auth after rate limit - can rate limit unauthenticated requests
chain = rate_limit.set_next(auth)

# GOOD: Auth before rate limit - rate limit per authenticated user
chain = auth.set_next(rate_limit)
```

</div>

---

## Key Takeaways

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #93c5fd;">

1. **Decouples Sender from Receiver** - Sender doesn't know which handler will process

2. **Dynamic Handler Selection** - Chain determines the right handler at runtime

3. **Single Responsibility** - Each handler focuses on one concern

4. **Order Matters** - Handler sequence affects behavior (auth before rate limit)

5. **Always Have a Default** - Ensure requests don't fall through unhandled

6. **Don't Over-Engineer** - Simple if-else is fine for simple cases

</div>

---

## Related Patterns

- [Command](/topic/design-patterns/command) - Encapsulates requests as objects
- [Decorator](/topic/design-patterns/decorator) - Similar structure, different intent
- [Composite](/topic/design-patterns/composite) - Can form tree of handlers
- [Strategy](/topic/design-patterns/strategy) - Single handler selection vs chain
