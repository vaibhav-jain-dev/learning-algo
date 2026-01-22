# Builder Pattern

## Overview

The Builder pattern separates the construction of a complex object from its representation, allowing the same construction process to create different representations. It's essential when creating objects with many optional parameters or multi-step initialization.

**Difficulty:** Intermediate
**Category:** Creational Pattern
**First Documented:** GoF (1994)

---

## Simple Explanation: The Subway Sandwich Analogy

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h3 style="color: #1e293b; margin-top: 0; font-size: 1.3rem;">Think of Building a Subway Sandwich</h3>

<p style="color: #334155; font-size: 1rem; line-height: 1.7;">
When you order at Subway, you don't just say "give me a sandwich." Instead, you go through a step-by-step process:
</p>

<div style="display: flex; flex-wrap: wrap; gap: 12px; margin: 20px 0;">
<div style="background: #dbeafe; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
<span style="background: #3b82f6; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700;">1</span>
<span style="color: #1e40af; font-weight: 600;">Choose bread</span>
</div>
<div style="background: #dcfce7; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
<span style="background: #22c55e; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700;">2</span>
<span style="color: #166534; font-weight: 600;">Pick protein</span>
</div>
<div style="background: #fef3c7; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
<span style="background: #f59e0b; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700;">3</span>
<span style="color: #92400e; font-weight: 600;">Add cheese</span>
</div>
<div style="background: #fce7f3; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
<span style="background: #ec4899; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700;">4</span>
<span style="color: #9d174d; font-weight: 600;">Select veggies</span>
</div>
<div style="background: #e0e7ff; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; gap: 8px;">
<span style="background: #6366f1; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700;">5</span>
<span style="color: #3730a3; font-weight: 600;">Add sauces</span>
</div>
</div>

<p style="color: #334155; font-size: 1rem; line-height: 1.7;">
<strong>The sandwich artist (Builder)</strong> follows your instructions step by step.<br>
<strong>You (Director)</strong> specify the configuration.<br>
<strong>The sandwich (Product)</strong> is built piece by piece and given to you at the end.
</p>

<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 16px;">
<strong style="color: #0f172a;">The Key Insight:</strong>
<span style="color: #334155;"> You can skip steps (no cheese), customize each step (extra pickles), or follow preset recipes (the "Italian BMT" combo) - all using the same construction process.</span>
</div>
</div>

---

## Real Company Usage

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">

| Company | How They Use Builder Pattern |
|---------|------------------------------|
| **Stripe** | API request builders for complex payment configurations |
| **AWS SDK** | Service client builders (S3ClientBuilder, DynamoDBClientBuilder) |
| **Elasticsearch** | Query builders for complex search queries |
| **OkHttp** | Request.Builder for HTTP requests with headers, body, timeouts |
| **Retrofit** | Retrofit.Builder for API client configuration |
| **Protocol Buffers** | Message builders for creating complex protobuf messages |
| **StringBuilder** | Classic example in Java/C# for efficient string construction |

</div>

---

## Pattern Structure

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #cbd5e1;">
<h4 style="color: #1e293b; margin-top: 0; text-align: center; font-size: 1.1rem;">Builder Pattern Structure</h4>

<div style="display: flex; flex-direction: column; align-items: center; gap: 20px; margin: 24px 0;">

<!-- Director -->
<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; width: 220px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);">
<div style="background: #3b82f6; color: white; padding: 12px; font-weight: 700; text-align: center; border-radius: 10px 10px 0 0;">Director</div>
<div style="padding: 16px; color: #1e3a8a; font-size: 0.9rem;">
<code>+ construct(builder)</code><br>
<code>+ makePreset()</code>
</div>
</div>

<div style="color: #64748b; font-size: 1rem;">uses &#8595;</div>

<!-- Builder Interface -->
<div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; width: 260px; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15);">
<div style="background: #22c55e; color: white; padding: 12px; font-weight: 700; text-align: center; border-radius: 10px 10px 0 0;">Builder (interface)</div>
<div style="padding: 16px; color: #166534; font-size: 0.9rem;">
<code>+ buildPartA()</code><br>
<code>+ buildPartB()</code><br>
<code>+ buildPartC()</code><br>
<code>+ getResult(): Product</code>
</div>
</div>

<div style="color: #22c55e; font-size: 1.5rem;">&#9651;</div>

<!-- Concrete Builders -->
<div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">
<div style="background: #f0fdf4; border: 2px solid #86efac; border-radius: 12px; width: 180px;">
<div style="background: #86efac; color: #166534; padding: 10px; font-weight: 700; text-align: center; border-radius: 10px 10px 0 0; font-size: 0.9rem;">ConcreteBuilderA</div>
<div style="padding: 12px; color: #166534; font-size: 0.85rem;">
Builds ProductA
</div>
</div>
<div style="background: #fef3c7; border: 2px solid #fcd34d; border-radius: 12px; width: 180px;">
<div style="background: #fcd34d; color: #92400e; padding: 10px; font-weight: 700; text-align: center; border-radius: 10px 10px 0 0; font-size: 0.9rem;">ConcreteBuilderB</div>
<div style="padding: 12px; color: #92400e; font-size: 0.85rem;">
Builds ProductB
</div>
</div>
</div>

</div>

<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 16px;">
<strong style="color: #0f172a;">Flow:</strong>
<span style="color: #334155;"> Director calls builder methods in sequence. Builder accumulates state. Client calls <code>getResult()</code> to get the final product.</span>
</div>
</div>

---

## When to Use Builder Pattern

<div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">

### Good Use Cases

1. **Many Constructor Parameters** - Objects with 4+ parameters, especially optional ones
2. **Immutable Objects** - Build complex immutable objects step by step
3. **Fluent APIs** - Create readable, chainable configuration code
4. **Telescoping Constructor Problem** - Avoid multiple constructor overloads
5. **Complex Object Graphs** - Objects with nested complex structures
6. **Test Data Builders** - Create test fixtures with sensible defaults

</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">

### The Telescoping Constructor Problem

```python
# BAD: Telescoping constructors
class Pizza:
    def __init__(self, size):
        self.size = size
    def __init__(self, size, cheese):
        self.size = size
        self.cheese = cheese
    def __init__(self, size, cheese, pepperoni):
        # ... this gets out of hand quickly!

# GOOD: Builder pattern
pizza = (
    PizzaBuilder()
    .size("large")
    .cheese("mozzarella")
    .pepperoni(True)
    .build()
)
```

</div>

---

## Anti-Patterns: When NOT to Use

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">

### Common Mistakes

1. **Simple Objects** - Don't use builder for objects with 2-3 required parameters
2. **Mutable Objects** - If object can be modified after creation, builder adds unnecessary complexity
3. **Over-Engineering** - If you never need different configurations, skip the pattern
4. **When Dataclasses Suffice** - Python dataclasses with defaults often eliminate the need

</div>

```python
# OVERKILL: Builder for simple object
class PointBuilder:  # Don't do this!
    def x(self, x): ...
    def y(self, y): ...
    def build(self): return Point(self._x, self._y)

# BETTER: Just use the constructor or dataclass
@dataclass
class Point:
    x: float
    y: float

point = Point(10, 20)  # Simple and clear
```

---

## Python Implementation

### Fluent Builder (Most Common)

```python
from __future__ import annotations
from dataclasses import dataclass, field
from typing import List, Optional, Dict, Any
from enum import Enum


class Priority(Enum):
    LOW = "low"
    NORMAL = "normal"
    HIGH = "high"
    URGENT = "urgent"


@dataclass(frozen=True)  # Immutable product
class Email:
    sender: str
    recipients: List[str]
    subject: str
    body: str
    cc: List[str] = field(default_factory=list)
    bcc: List[str] = field(default_factory=list)
    attachments: List[str] = field(default_factory=list)
    is_html: bool = False
    priority: Priority = Priority.NORMAL
    headers: Dict[str, str] = field(default_factory=dict)


class EmailBuilder:
    """
    Fluent builder for creating Email objects.
    Returns self from each method to enable chaining.
    """

    def __init__(self):
        self._sender: str = ""
        self._recipients: List[str] = []
        self._subject: str = ""
        self._body: str = ""
        self._cc: List[str] = []
        self._bcc: List[str] = []
        self._attachments: List[str] = []
        self._is_html: bool = False
        self._priority: Priority = Priority.NORMAL
        self._headers: Dict[str, str] = {}

    def from_address(self, sender: str) -> EmailBuilder:
        """Set the sender email address."""
        self._sender = sender
        return self

    def to(self, *recipients: str) -> EmailBuilder:
        """Add one or more recipients."""
        self._recipients.extend(recipients)
        return self

    def cc(self, *recipients: str) -> EmailBuilder:
        """Add CC recipients."""
        self._cc.extend(recipients)
        return self

    def bcc(self, *recipients: str) -> EmailBuilder:
        """Add BCC recipients."""
        self._bcc.extend(recipients)
        return self

    def subject(self, subject: str) -> EmailBuilder:
        """Set the email subject."""
        self._subject = subject
        return self

    def body(self, body: str) -> EmailBuilder:
        """Set plain text body."""
        self._body = body
        self._is_html = False
        return self

    def html_body(self, body: str) -> EmailBuilder:
        """Set HTML body."""
        self._body = body
        self._is_html = True
        return self

    def attach(self, *files: str) -> EmailBuilder:
        """Attach files to the email."""
        self._attachments.extend(files)
        return self

    def priority(self, priority: Priority) -> EmailBuilder:
        """Set email priority."""
        self._priority = priority
        return self

    def header(self, name: str, value: str) -> EmailBuilder:
        """Add a custom header."""
        self._headers[name] = value
        return self

    def build(self) -> Email:
        """
        Build and validate the Email object.
        Raises ValueError if required fields are missing.
        """
        # Validation
        if not self._sender:
            raise ValueError("Sender is required")
        if not self._recipients:
            raise ValueError("At least one recipient is required")
        if not self._subject:
            raise ValueError("Subject is required")

        return Email(
            sender=self._sender,
            recipients=list(self._recipients),
            subject=self._subject,
            body=self._body,
            cc=list(self._cc),
            bcc=list(self._bcc),
            attachments=list(self._attachments),
            is_html=self._is_html,
            priority=self._priority,
            headers=dict(self._headers)
        )


# Usage - fluent and readable
email = (
    EmailBuilder()
    .from_address("noreply@company.com")
    .to("user@example.com", "manager@example.com")
    .cc("team@company.com")
    .subject("Q4 Report Ready")
    .html_body("<h1>Report</h1><p>The Q4 report is attached.</p>")
    .attach("q4_report.pdf", "charts.xlsx")
    .priority(Priority.HIGH)
    .header("X-Campaign-ID", "q4-2024")
    .build()
)

print(f"Sending to {len(email.recipients)} recipients")
print(f"Subject: {email.subject}")
print(f"Priority: {email.priority.value}")
```

### Builder with Director

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List, Optional


@dataclass
class Computer:
    """Product - the complex object being built."""
    cpu: str = ""
    ram_gb: int = 0
    storage_gb: int = 0
    gpu: Optional[str] = None
    os: str = ""
    peripherals: List[str] = None

    def __post_init__(self):
        if self.peripherals is None:
            self.peripherals = []

    def specs(self) -> str:
        specs = [
            f"CPU: {self.cpu}",
            f"RAM: {self.ram_gb}GB",
            f"Storage: {self.storage_gb}GB",
            f"OS: {self.os}"
        ]
        if self.gpu:
            specs.append(f"GPU: {self.gpu}")
        if self.peripherals:
            specs.append(f"Peripherals: {', '.join(self.peripherals)}")
        return " | ".join(specs)


class ComputerBuilder(ABC):
    """Abstract builder interface."""

    def __init__(self):
        self._computer = Computer()

    @abstractmethod
    def set_cpu(self) -> 'ComputerBuilder':
        pass

    @abstractmethod
    def set_ram(self) -> 'ComputerBuilder':
        pass

    @abstractmethod
    def set_storage(self) -> 'ComputerBuilder':
        pass

    def set_gpu(self) -> 'ComputerBuilder':
        """Optional step - default does nothing."""
        return self

    @abstractmethod
    def set_os(self) -> 'ComputerBuilder':
        pass

    def add_peripherals(self) -> 'ComputerBuilder':
        """Optional step - default does nothing."""
        return self

    def get_result(self) -> Computer:
        return self._computer


class GamingPCBuilder(ComputerBuilder):
    """Concrete builder for gaming PCs."""

    def set_cpu(self) -> 'GamingPCBuilder':
        self._computer.cpu = "Intel i9-13900K"
        return self

    def set_ram(self) -> 'GamingPCBuilder':
        self._computer.ram_gb = 64
        return self

    def set_storage(self) -> 'GamingPCBuilder':
        self._computer.storage_gb = 2000  # 2TB NVMe
        return self

    def set_gpu(self) -> 'GamingPCBuilder':
        self._computer.gpu = "NVIDIA RTX 4090"
        return self

    def set_os(self) -> 'GamingPCBuilder':
        self._computer.os = "Windows 11 Pro"
        return self

    def add_peripherals(self) -> 'GamingPCBuilder':
        self._computer.peripherals = [
            "Mechanical Keyboard",
            "Gaming Mouse",
            "27\" 4K Monitor"
        ]
        return self


class OfficePCBuilder(ComputerBuilder):
    """Concrete builder for office workstations."""

    def set_cpu(self) -> 'OfficePCBuilder':
        self._computer.cpu = "Intel i5-13400"
        return self

    def set_ram(self) -> 'OfficePCBuilder':
        self._computer.ram_gb = 16
        return self

    def set_storage(self) -> 'OfficePCBuilder':
        self._computer.storage_gb = 512
        return self

    def set_os(self) -> 'OfficePCBuilder':
        self._computer.os = "Windows 11 Business"
        return self

    def add_peripherals(self) -> 'OfficePCBuilder':
        self._computer.peripherals = [
            "Standard Keyboard",
            "Optical Mouse",
            "24\" Monitor"
        ]
        return self


class ServerBuilder(ComputerBuilder):
    """Concrete builder for servers."""

    def set_cpu(self) -> 'ServerBuilder':
        self._computer.cpu = "AMD EPYC 9654 (96 cores)"
        return self

    def set_ram(self) -> 'ServerBuilder':
        self._computer.ram_gb = 512
        return self

    def set_storage(self) -> 'ServerBuilder':
        self._computer.storage_gb = 10000  # 10TB RAID
        return self

    def set_os(self) -> 'ServerBuilder':
        self._computer.os = "Ubuntu Server 22.04 LTS"
        return self


class ComputerDirector:
    """
    Director - knows HOW to build specific configurations.
    Encapsulates construction algorithms.
    """

    def __init__(self, builder: ComputerBuilder):
        self._builder = builder

    def build_minimal(self) -> Computer:
        """Build with only required components."""
        return (
            self._builder
            .set_cpu()
            .set_ram()
            .set_storage()
            .set_os()
            .get_result()
        )

    def build_full(self) -> Computer:
        """Build with all optional components."""
        return (
            self._builder
            .set_cpu()
            .set_ram()
            .set_storage()
            .set_gpu()
            .set_os()
            .add_peripherals()
            .get_result()
        )


# Usage with Director
gaming_builder = GamingPCBuilder()
director = ComputerDirector(gaming_builder)

gaming_pc = director.build_full()
print(f"Gaming PC: {gaming_pc.specs()}")

office_builder = OfficePCBuilder()
director = ComputerDirector(office_builder)

office_pc = director.build_minimal()
print(f"Office PC: {office_pc.specs()}")

# Direct builder usage (without director)
server = (
    ServerBuilder()
    .set_cpu()
    .set_ram()
    .set_storage()
    .set_os()
    .get_result()
)
print(f"Server: {server.specs()}")
```

### Production-Grade: HTTP Request Builder

```python
from dataclasses import dataclass, field
from typing import Dict, Any, Optional, Callable
from enum import Enum
import json


class HttpMethod(Enum):
    GET = "GET"
    POST = "POST"
    PUT = "PUT"
    PATCH = "PATCH"
    DELETE = "DELETE"


@dataclass(frozen=True)
class HttpRequest:
    """Immutable HTTP request object."""
    method: HttpMethod
    url: str
    headers: Dict[str, str]
    query_params: Dict[str, str]
    body: Optional[bytes]
    timeout_seconds: int
    retry_count: int
    auth: Optional[tuple]


class HttpRequestBuilder:
    """
    Production-grade HTTP request builder.

    Features:
    - Fluent interface
    - Sensible defaults
    - Validation
    - Common presets
    """

    def __init__(self):
        self._method: HttpMethod = HttpMethod.GET
        self._url: str = ""
        self._headers: Dict[str, str] = {}
        self._query_params: Dict[str, str] = {}
        self._body: Optional[bytes] = None
        self._timeout: int = 30
        self._retry_count: int = 0
        self._auth: Optional[tuple] = None

    # HTTP Methods
    def get(self, url: str) -> 'HttpRequestBuilder':
        self._method = HttpMethod.GET
        self._url = url
        return self

    def post(self, url: str) -> 'HttpRequestBuilder':
        self._method = HttpMethod.POST
        self._url = url
        return self

    def put(self, url: str) -> 'HttpRequestBuilder':
        self._method = HttpMethod.PUT
        self._url = url
        return self

    def delete(self, url: str) -> 'HttpRequestBuilder':
        self._method = HttpMethod.DELETE
        self._url = url
        return self

    # Headers
    def header(self, name: str, value: str) -> 'HttpRequestBuilder':
        self._headers[name] = value
        return self

    def headers(self, headers: Dict[str, str]) -> 'HttpRequestBuilder':
        self._headers.update(headers)
        return self

    def content_type(self, content_type: str) -> 'HttpRequestBuilder':
        return self.header("Content-Type", content_type)

    def accept(self, accept: str) -> 'HttpRequestBuilder':
        return self.header("Accept", accept)

    def bearer_token(self, token: str) -> 'HttpRequestBuilder':
        return self.header("Authorization", f"Bearer {token}")

    # Query Parameters
    def query(self, name: str, value: str) -> 'HttpRequestBuilder':
        self._query_params[name] = value
        return self

    def query_params(self, params: Dict[str, str]) -> 'HttpRequestBuilder':
        self._query_params.update(params)
        return self

    # Body
    def body_raw(self, data: bytes) -> 'HttpRequestBuilder':
        self._body = data
        return self

    def body_text(self, text: str) -> 'HttpRequestBuilder':
        self._body = text.encode('utf-8')
        return self.content_type("text/plain")

    def body_json(self, data: Any) -> 'HttpRequestBuilder':
        self._body = json.dumps(data).encode('utf-8')
        return self.content_type("application/json")

    def body_form(self, data: Dict[str, str]) -> 'HttpRequestBuilder':
        from urllib.parse import urlencode
        self._body = urlencode(data).encode('utf-8')
        return self.content_type("application/x-www-form-urlencoded")

    # Configuration
    def timeout(self, seconds: int) -> 'HttpRequestBuilder':
        self._timeout = seconds
        return self

    def retries(self, count: int) -> 'HttpRequestBuilder':
        self._retry_count = count
        return self

    def basic_auth(self, username: str, password: str) -> 'HttpRequestBuilder':
        self._auth = (username, password)
        return self

    # Presets for common scenarios
    def json_api(self) -> 'HttpRequestBuilder':
        """Preset for JSON APIs."""
        return (
            self
            .content_type("application/json")
            .accept("application/json")
        )

    def with_retry(self) -> 'HttpRequestBuilder':
        """Preset for resilient requests."""
        return self.retries(3).timeout(10)

    # Build
    def build(self) -> HttpRequest:
        """Build the immutable request object."""
        if not self._url:
            raise ValueError("URL is required")

        # Add default headers
        headers = {"User-Agent": "MyApp/1.0"}
        headers.update(self._headers)

        return HttpRequest(
            method=self._method,
            url=self._url,
            headers=headers,
            query_params=dict(self._query_params),
            body=self._body,
            timeout_seconds=self._timeout,
            retry_count=self._retry_count,
            auth=self._auth
        )


# Usage Examples
# Simple GET request
get_request = (
    HttpRequestBuilder()
    .get("https://api.example.com/users")
    .query("page", "1")
    .query("limit", "10")
    .bearer_token("abc123")
    .build()
)

# POST with JSON body
post_request = (
    HttpRequestBuilder()
    .post("https://api.example.com/users")
    .json_api()
    .body_json({"name": "Alice", "email": "alice@example.com"})
    .bearer_token("abc123")
    .with_retry()
    .build()
)

# Form submission
form_request = (
    HttpRequestBuilder()
    .post("https://example.com/login")
    .body_form({"username": "alice", "password": "secret"})
    .timeout(5)
    .build()
)

print(f"GET: {get_request.method.value} {get_request.url}")
print(f"POST: {post_request.method.value} {post_request.url}")
print(f"Form: {form_request.method.value} {form_request.url}")
```

---

## Builder vs Related Patterns

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">

<div style="background: #dbeafe; padding: 20px; border-radius: 12px; border-top: 4px solid #3b82f6;">
<h4 style="color: #1e40af; margin-top: 0;">Builder</h4>
<p style="color: #1e3a8a; font-size: 0.9rem; margin-bottom: 12px;">Step-by-step construction of complex objects.</p>
<div style="background: #eff6ff; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
<strong style="color: #1e40af;">Focus:</strong> <span style="color: #1e3a8a;">Construction process</span><br>
<strong style="color: #1e40af;">Returns:</strong> <span style="color: #1e3a8a;">One complex product</span>
</div>
</div>

<div style="background: #dcfce7; padding: 20px; border-radius: 12px; border-top: 4px solid #22c55e;">
<h4 style="color: #166534; margin-top: 0;">Factory Method</h4>
<p style="color: #14532d; font-size: 0.9rem; margin-bottom: 12px;">Single-step creation with subclass decisions.</p>
<div style="background: #f0fdf4; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
<strong style="color: #166534;">Focus:</strong> <span style="color: #14532d;">Which class to instantiate</span><br>
<strong style="color: #166534;">Returns:</strong> <span style="color: #14532d;">One simple product</span>
</div>
</div>

<div style="background: #fef3c7; padding: 20px; border-radius: 12px; border-top: 4px solid #f59e0b;">
<h4 style="color: #92400e; margin-top: 0;">Abstract Factory</h4>
<p style="color: #78350f; font-size: 0.9rem; margin-bottom: 12px;">Creates families of related objects.</p>
<div style="background: #fffbeb; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
<strong style="color: #92400e;">Focus:</strong> <span style="color: #78350f;">Product families</span><br>
<strong style="color: #92400e;">Returns:</strong> <span style="color: #78350f;">Multiple related products</span>
</div>
</div>

</div>
</div>

---

## Interview Questions

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">

### Conceptual Questions

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q1: When would you use Builder over a constructor with default parameters?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
Use Builder when:
<ul>
<li><strong>Many optional parameters:</strong> 4+ parameters become hard to remember</li>
<li><strong>Complex validation:</strong> Builder can validate in build() before creating object</li>
<li><strong>Immutable objects:</strong> Builder collects state, then creates frozen object</li>
<li><strong>Readable code:</strong> <code>.timeout(30).retries(3)</code> is clearer than positional args</li>
<li><strong>Different representations:</strong> Same process creates different products</li>
</ul>
Use constructor with defaults when:
<ul>
<li>Object has few parameters (2-3)</li>
<li>Most parameters are required</li>
<li>Simple objects with straightforward construction</li>
</ul>
</div>
</details>

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q2: What's the role of the Director in the Builder pattern?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
The Director encapsulates construction algorithms:
<ul>
<li><strong>Knows the steps:</strong> Which builder methods to call and in what order</li>
<li><strong>Defines presets:</strong> build_gaming_pc(), build_office_pc()</li>
<li><strong>Optional:</strong> Client can use builder directly without director</li>
</ul>
<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px; margin-top: 8px;">
# With Director - encapsulated knowledge
director.build_gaming_pc()

# Without Director - client knows the steps
builder.set_cpu().set_gpu().set_ram().build()
</pre>
<strong>In practice:</strong> Modern fluent builders often skip the Director, letting clients chain methods directly.
</div>
</details>

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q3: How do you make a Builder thread-safe?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
<strong>Best practice:</strong> Create a new builder instance per thread.
<br><br>
<strong>If sharing is needed:</strong>
<ul>
<li>Make builder immutable (each method returns a new builder)</li>
<li>Use locks (not recommended - defeats fluent purpose)</li>
<li>Use thread-local storage</li>
</ul>
<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px; margin-top: 8px;">
# Immutable builder approach
class ImmutableBuilder:
    def __init__(self, **kwargs):
        self._values = kwargs

    def with_name(self, name):
        return ImmutableBuilder(**self._values, name=name)

    def with_age(self, age):
        return ImmutableBuilder(**self._values, age=age)
</pre>
</div>
</details>

### Coding Questions

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q4: Implement a SQL Query Builder</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px; overflow-x: auto;">
class QueryBuilder:
    def __init__(self):
        self._select = ["*"]
        self._from = ""
        self._where = []
        self._order_by = []
        self._limit = None

    def select(self, *columns):
        self._select = list(columns)
        return self

    def from_table(self, table):
        self._from = table
        return self

    def where(self, condition):
        self._where.append(condition)
        return self

    def order_by(self, column, direction="ASC"):
        self._order_by.append(f"{column} {direction}")
        return self

    def limit(self, count):
        self._limit = count
        return self

    def build(self):
        if not self._from:
            raise ValueError("FROM clause required")

        query = f"SELECT {', '.join(self._select)}"
        query += f" FROM {self._from}"

        if self._where:
            query += f" WHERE {' AND '.join(self._where)}"
        if self._order_by:
            query += f" ORDER BY {', '.join(self._order_by)}"
        if self._limit:
            query += f" LIMIT {self._limit}"

        return query

# Usage
query = (
    QueryBuilder()
    .select("id", "name", "email")
    .from_table("users")
    .where("status = 'active'")
    .where("age > 18")
    .order_by("created_at", "DESC")
    .limit(10)
    .build()
)
</pre>
</div>
</details>

<details style="margin-bottom: 12px;">
<summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q5: How would you add validation to a Builder?</summary>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
<strong>Two approaches:</strong>
<br><br>
<strong>1. Validate in build() - Recommended:</strong>
<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px;">
def build(self):
    errors = []
    if not self._url:
        errors.append("URL is required")
    if self._timeout < 0:
        errors.append("Timeout must be positive")
    if errors:
        raise ValueError(f"Invalid config: {errors}")
    return Request(...)
</pre>

<strong>2. Validate eagerly in setters:</strong>
<pre style="background: #e2e8f0; padding: 12px; border-radius: 6px;">
def timeout(self, seconds):
    if seconds < 0:
        raise ValueError("Timeout must be positive")
    self._timeout = seconds
    return self
</pre>

<strong>Best practice:</strong> Validate in build() for interdependent validations, in setters for simple constraints.
</div>
</details>

</div>

---

## Common Mistakes

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #fecaca;">

### Mistake 1: Forgetting to Reset Builder State

```python
# BAD: Reusing builder without reset
builder = EmailBuilder()
email1 = builder.to("a@example.com").subject("Hi").build()
email2 = builder.to("b@example.com").build()  # Still has "a@example.com"!

# GOOD: Create new builder or add reset method
email1 = EmailBuilder().to("a@example.com").subject("Hi").build()
email2 = EmailBuilder().to("b@example.com").subject("Hello").build()
```

### Mistake 2: Returning Mutable Internal State

```python
# BAD: Exposing internal list
def build(self):
    return Product(items=self._items)  # Caller can modify!

# GOOD: Return copy
def build(self):
    return Product(items=list(self._items))  # Defensive copy
```

### Mistake 3: Not Validating Required Fields

```python
# BAD: Silent failures
def build(self):
    return User(name=self._name)  # What if name is empty?

# GOOD: Validate in build()
def build(self):
    if not self._name:
        raise ValueError("Name is required")
    return User(name=self._name)
```

</div>

---

## Key Takeaways

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #93c5fd;">

1. **Builder separates construction from representation** - Same process can create different objects

2. **Fluent interface is key** - Return `self` from each method for readable chaining

3. **Validate in build()** - Ensure object is valid before returning

4. **Director is optional** - Modern builders often skip it for simplicity

5. **Don't over-engineer** - If a simple constructor works, use it

6. **Create immutable products** - Builder collects mutable state, product is frozen

</div>

---

## Related Patterns

- [Factory Method](/topic/design-patterns/factory-method) - Single-step creation
- [Abstract Factory](/topic/design-patterns/abstract-factory) - Product families
- [Prototype](/topic/design-patterns/prototype) - Clone existing objects
- [Composite](/topic/design-patterns/composite) - Build tree structures with Builder
