# Builder Pattern

## Overview

The Builder pattern separates the construction of a complex object from its representation, allowing the same construction process to create different representations. It's useful when creating objects with many optional parameters or complex initialization.

## Key Concepts

### When to Use

- Objects with many constructor parameters
- Object creation involves multiple steps
- Same construction process for different representations
- Avoiding "telescoping constructor" anti-pattern

### Structure

<div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; margin: 2rem 0; font-family: system-ui, sans-serif;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 1.25rem 2rem; color: white; text-align: center; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
    <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 0.5rem;">Director</div>
    <div style="font-size: 0.85rem; opacity: 0.9; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 0.5rem;">+ construct(builder)</div>
  </div>
  <div style="color: #667eea; font-size: 1.25rem;">↓ uses</div>
  <div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); border-radius: 12px; padding: 1.25rem 2rem; color: white; text-align: center; box-shadow: 0 4px 15px rgba(17, 153, 142, 0.3);">
    <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 0.5rem;">Builder (interface)</div>
    <div style="font-size: 0.85rem; opacity: 0.9; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 0.5rem;">
      + buildPartA()<br>+ buildPartB()<br>+ getResult()
    </div>
  </div>
  <div style="color: #38ef7d; font-size: 1.25rem;">▲</div>
  <div style="display: flex; gap: 2rem;">
    <div style="background: #1e3a5f; border: 2px solid #4ecdc4; border-radius: 10px; padding: 1rem 1.5rem; color: #4ecdc4; font-weight: 600; text-align: center;">
      ConcreteBuilderA<br><span style="font-size: 0.8rem; opacity: 0.8;">→ ProductA</span>
    </div>
    <div style="background: #1e3a5f; border: 2px solid #f093fb; border-radius: 10px; padding: 1rem 1.5rem; color: #f093fb; font-weight: 600; text-align: center;">
      ConcreteBuilderB<br><span style="font-size: 0.8rem; opacity: 0.8;">→ ProductB</span>
    </div>
  </div>
</div>

## Implementation

### Python - Fluent Builder

```python
from __future__ import annotations
from dataclasses import dataclass, field
from typing import List, Optional

@dataclass
class Email:
    sender: str
    recipients: List[str]
    subject: str
    body: str
    cc: List[str] = field(default_factory=list)
    bcc: List[str] = field(default_factory=list)
    attachments: List[str] = field(default_factory=list)
    is_html: bool = False
    priority: str = "normal"


class EmailBuilder:
    def __init__(self):
        self._sender: str = ""
        self._recipients: List[str] = []
        self._subject: str = ""
        self._body: str = ""
        self._cc: List[str] = []
        self._bcc: List[str] = []
        self._attachments: List[str] = []
        self._is_html: bool = False
        self._priority: str = "normal"

    def from_address(self, sender: str) -> EmailBuilder:
        self._sender = sender
        return self

    def to(self, *recipients: str) -> EmailBuilder:
        self._recipients.extend(recipients)
        return self

    def cc(self, *recipients: str) -> EmailBuilder:
        self._cc.extend(recipients)
        return self

    def bcc(self, *recipients: str) -> EmailBuilder:
        self._bcc.extend(recipients)
        return self

    def subject(self, subject: str) -> EmailBuilder:
        self._subject = subject
        return self

    def body(self, body: str) -> EmailBuilder:
        self._body = body
        return self

    def html_body(self, body: str) -> EmailBuilder:
        self._body = body
        self._is_html = True
        return self

    def attach(self, *files: str) -> EmailBuilder:
        self._attachments.extend(files)
        return self

    def priority(self, priority: str) -> EmailBuilder:
        self._priority = priority
        return self

    def build(self) -> Email:
        if not self._sender:
            raise ValueError("Sender is required")
        if not self._recipients:
            raise ValueError("At least one recipient is required")
        if not self._subject:
            raise ValueError("Subject is required")

        return Email(
            sender=self._sender,
            recipients=self._recipients,
            subject=self._subject,
            body=self._body,
            cc=self._cc,
            bcc=self._bcc,
            attachments=self._attachments,
            is_html=self._is_html,
            priority=self._priority
        )


# Usage
email = (
    EmailBuilder()
    .from_address("sender@example.com")
    .to("recipient@example.com", "another@example.com")
    .cc("manager@example.com")
    .subject("Meeting Tomorrow")
    .html_body("<h1>Hello!</h1><p>Let's meet tomorrow.</p>")
    .attach("document.pdf", "slides.pptx")
    .priority("high")
    .build()
)

print(email)
```

### Python - Builder with Director

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List

@dataclass
class House:
    walls: str = ""
    roof: str = ""
    windows: int = 0
    doors: int = 0
    garage: bool = False
    pool: bool = False
    garden: bool = False


class HouseBuilder(ABC):
    def __init__(self):
        self._house = House()

    @abstractmethod
    def build_walls(self) -> 'HouseBuilder':
        pass

    @abstractmethod
    def build_roof(self) -> 'HouseBuilder':
        pass

    @abstractmethod
    def build_windows(self) -> 'HouseBuilder':
        pass

    @abstractmethod
    def build_doors(self) -> 'HouseBuilder':
        pass

    def build_garage(self) -> 'HouseBuilder':
        return self

    def build_pool(self) -> 'HouseBuilder':
        return self

    def build_garden(self) -> 'HouseBuilder':
        return self

    def get_result(self) -> House:
        return self._house


class WoodenHouseBuilder(HouseBuilder):
    def build_walls(self) -> 'WoodenHouseBuilder':
        self._house.walls = "wooden walls"
        return self

    def build_roof(self) -> 'WoodenHouseBuilder':
        self._house.roof = "wooden roof"
        return self

    def build_windows(self) -> 'WoodenHouseBuilder':
        self._house.windows = 4
        return self

    def build_doors(self) -> 'WoodenHouseBuilder':
        self._house.doors = 2
        return self

    def build_garden(self) -> 'WoodenHouseBuilder':
        self._house.garden = True
        return self


class StoneHouseBuilder(HouseBuilder):
    def build_walls(self) -> 'StoneHouseBuilder':
        self._house.walls = "stone walls"
        return self

    def build_roof(self) -> 'StoneHouseBuilder':
        self._house.roof = "tile roof"
        return self

    def build_windows(self) -> 'StoneHouseBuilder':
        self._house.windows = 8
        return self

    def build_doors(self) -> 'StoneHouseBuilder':
        self._house.doors = 3
        return self

    def build_garage(self) -> 'StoneHouseBuilder':
        self._house.garage = True
        return self

    def build_pool(self) -> 'StoneHouseBuilder':
        self._house.pool = True
        return self


class ConstructionDirector:
    def __init__(self, builder: HouseBuilder):
        self._builder = builder

    def build_minimal_house(self) -> House:
        return (
            self._builder
            .build_walls()
            .build_roof()
            .build_windows()
            .build_doors()
            .get_result()
        )

    def build_full_house(self) -> House:
        return (
            self._builder
            .build_walls()
            .build_roof()
            .build_windows()
            .build_doors()
            .build_garage()
            .build_pool()
            .build_garden()
            .get_result()
        )


# Usage
wooden_builder = WoodenHouseBuilder()
director = ConstructionDirector(wooden_builder)

minimal_house = director.build_minimal_house()
print(f"Minimal house: {minimal_house}")

stone_builder = StoneHouseBuilder()
director = ConstructionDirector(stone_builder)

full_house = director.build_full_house()
print(f"Full house: {full_house}")
```

### Go - Fluent Builder

```go
package main

import (
	"fmt"
	"strings"
)

type HTTPRequest struct {
	Method  string
	URL     string
	Headers map[string]string
	Body    string
	Timeout int
	Retries int
}

type HTTPRequestBuilder struct {
	request *HTTPRequest
}

func NewHTTPRequestBuilder() *HTTPRequestBuilder {
	return &HTTPRequestBuilder{
		request: &HTTPRequest{
			Headers: make(map[string]string),
			Timeout: 30,
			Retries: 0,
		},
	}
}

func (b *HTTPRequestBuilder) Method(method string) *HTTPRequestBuilder {
	b.request.Method = method
	return b
}

func (b *HTTPRequestBuilder) URL(url string) *HTTPRequestBuilder {
	b.request.URL = url
	return b
}

func (b *HTTPRequestBuilder) Header(key, value string) *HTTPRequestBuilder {
	b.request.Headers[key] = value
	return b
}

func (b *HTTPRequestBuilder) Body(body string) *HTTPRequestBuilder {
	b.request.Body = body
	return b
}

func (b *HTTPRequestBuilder) Timeout(seconds int) *HTTPRequestBuilder {
	b.request.Timeout = seconds
	return b
}

func (b *HTTPRequestBuilder) Retries(count int) *HTTPRequestBuilder {
	b.request.Retries = count
	return b
}

func (b *HTTPRequestBuilder) Build() (*HTTPRequest, error) {
	if b.request.Method == "" {
		return nil, fmt.Errorf("method is required")
	}
	if b.request.URL == "" {
		return nil, fmt.Errorf("URL is required")
	}
	return b.request, nil
}

// Shorthand methods
func (b *HTTPRequestBuilder) Get(url string) *HTTPRequestBuilder {
	return b.Method("GET").URL(url)
}

func (b *HTTPRequestBuilder) Post(url string) *HTTPRequestBuilder {
	return b.Method("POST").URL(url)
}

func (b *HTTPRequestBuilder) JSON(body string) *HTTPRequestBuilder {
	return b.Header("Content-Type", "application/json").Body(body)
}

func main() {
	request, err := NewHTTPRequestBuilder().
		Post("https://api.example.com/users").
		Header("Authorization", "Bearer token123").
		JSON(`{"name": "John", "email": "john@example.com"}`).
		Timeout(10).
		Retries(3).
		Build()

	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Printf("Request: %+v\n", request)
}
```

### Go - Query Builder

```go
package main

import (
	"fmt"
	"strings"
)

type SQLQuery struct {
	table      string
	columns    []string
	conditions []string
	orderBy    []string
	limit      int
	offset     int
}

type QueryBuilder struct {
	query *SQLQuery
}

func Select(columns ...string) *QueryBuilder {
	return &QueryBuilder{
		query: &SQLQuery{
			columns: columns,
		},
	}
}

func (b *QueryBuilder) From(table string) *QueryBuilder {
	b.query.table = table
	return b
}

func (b *QueryBuilder) Where(condition string) *QueryBuilder {
	b.query.conditions = append(b.query.conditions, condition)
	return b
}

func (b *QueryBuilder) And(condition string) *QueryBuilder {
	return b.Where(condition)
}

func (b *QueryBuilder) OrderBy(column string, direction string) *QueryBuilder {
	b.query.orderBy = append(b.query.orderBy, fmt.Sprintf("%s %s", column, direction))
	return b
}

func (b *QueryBuilder) Limit(limit int) *QueryBuilder {
	b.query.limit = limit
	return b
}

func (b *QueryBuilder) Offset(offset int) *QueryBuilder {
	b.query.offset = offset
	return b
}

func (b *QueryBuilder) Build() string {
	var parts []string

	// SELECT
	cols := "*"
	if len(b.query.columns) > 0 {
		cols = strings.Join(b.query.columns, ", ")
	}
	parts = append(parts, fmt.Sprintf("SELECT %s", cols))

	// FROM
	parts = append(parts, fmt.Sprintf("FROM %s", b.query.table))

	// WHERE
	if len(b.query.conditions) > 0 {
		parts = append(parts, fmt.Sprintf("WHERE %s", strings.Join(b.query.conditions, " AND ")))
	}

	// ORDER BY
	if len(b.query.orderBy) > 0 {
		parts = append(parts, fmt.Sprintf("ORDER BY %s", strings.Join(b.query.orderBy, ", ")))
	}

	// LIMIT
	if b.query.limit > 0 {
		parts = append(parts, fmt.Sprintf("LIMIT %d", b.query.limit))
	}

	// OFFSET
	if b.query.offset > 0 {
		parts = append(parts, fmt.Sprintf("OFFSET %d", b.query.offset))
	}

	return strings.Join(parts, " ")
}

func main() {
	query := Select("id", "name", "email").
		From("users").
		Where("status = 'active'").
		And("age > 18").
		OrderBy("created_at", "DESC").
		Limit(10).
		Offset(20).
		Build()

	fmt.Println(query)
	// SELECT id, name, email FROM users WHERE status = 'active' AND age > 18 ORDER BY created_at DESC LIMIT 10 OFFSET 20
}
```

## Real-World Examples

### Configuration Builder

```python
from dataclasses import dataclass
from typing import Dict, Any, Optional

@dataclass
class ServerConfig:
    host: str
    port: int
    ssl: bool
    ssl_cert: Optional[str]
    ssl_key: Optional[str]
    workers: int
    timeout: int
    max_connections: int
    debug: bool
    log_level: str
    middleware: list


class ServerConfigBuilder:
    def __init__(self):
        self._host = "0.0.0.0"
        self._port = 8080
        self._ssl = False
        self._ssl_cert = None
        self._ssl_key = None
        self._workers = 4
        self._timeout = 30
        self._max_connections = 1000
        self._debug = False
        self._log_level = "INFO"
        self._middleware = []

    def host(self, host: str) -> 'ServerConfigBuilder':
        self._host = host
        return self

    def port(self, port: int) -> 'ServerConfigBuilder':
        self._port = port
        return self

    def enable_ssl(self, cert: str, key: str) -> 'ServerConfigBuilder':
        self._ssl = True
        self._ssl_cert = cert
        self._ssl_key = key
        return self

    def workers(self, count: int) -> 'ServerConfigBuilder':
        self._workers = count
        return self

    def timeout(self, seconds: int) -> 'ServerConfigBuilder':
        self._timeout = seconds
        return self

    def max_connections(self, count: int) -> 'ServerConfigBuilder':
        self._max_connections = count
        return self

    def debug_mode(self) -> 'ServerConfigBuilder':
        self._debug = True
        self._log_level = "DEBUG"
        return self

    def production_mode(self) -> 'ServerConfigBuilder':
        self._debug = False
        self._log_level = "WARNING"
        self._workers = 8
        return self

    def add_middleware(self, middleware: str) -> 'ServerConfigBuilder':
        self._middleware.append(middleware)
        return self

    def build(self) -> ServerConfig:
        return ServerConfig(
            host=self._host,
            port=self._port,
            ssl=self._ssl,
            ssl_cert=self._ssl_cert,
            ssl_key=self._ssl_key,
            workers=self._workers,
            timeout=self._timeout,
            max_connections=self._max_connections,
            debug=self._debug,
            log_level=self._log_level,
            middleware=self._middleware
        )


# Usage
dev_config = (
    ServerConfigBuilder()
    .host("localhost")
    .port(3000)
    .debug_mode()
    .add_middleware("cors")
    .add_middleware("logging")
    .build()
)

prod_config = (
    ServerConfigBuilder()
    .host("0.0.0.0")
    .port(443)
    .production_mode()
    .enable_ssl("/etc/ssl/cert.pem", "/etc/ssl/key.pem")
    .max_connections(10000)
    .add_middleware("rate_limiter")
    .add_middleware("compression")
    .build()
)
```

## Common Interview Questions

1. **When to use Builder vs Constructor?**
   - Builder: Many parameters, optional fields
   - Constructor: Few required parameters

2. **Difference between Builder and Factory?**
   - Builder: Step-by-step construction
   - Factory: Single-step creation

3. **How to make Builder thread-safe?**
   - Create new builder instance per thread
   - Or use immutable intermediate builders

## Best Practices

1. **Use fluent interface** - Return `this` for chaining
2. **Validate in build()** - Check required fields
3. **Immutable products** - Builder creates immutable objects
4. **Reset capability** - Allow reusing builder
5. **Default values** - Sensible defaults for optional fields

## Related Patterns

- [Factory Method](/topic/design-patterns/factory-method) - Simpler creation
- [Abstract Factory](/topic/design-patterns/abstract-factory) - Product families
- [Prototype](/topic/design-patterns/prototype) - Clone-based creation
