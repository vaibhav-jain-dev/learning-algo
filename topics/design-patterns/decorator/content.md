# Decorator Pattern

## Overview

The Decorator pattern attaches additional responsibilities to an object dynamically. It provides a flexible alternative to subclassing for extending functionality by wrapping objects with decorator objects.

## Key Concepts

### When to Use

- Add responsibilities to objects without modifying their code
- When extension by subclassing is impractical
- Need to add/remove features at runtime
- Combining multiple behaviors flexibly

### Structure

```
┌─────────────────────────┐
│      Component          │
├─────────────────────────┤
│ + operation()           │
└───────────┬─────────────┘
            △
     ┌──────┴──────┐
┌────┴─────┐  ┌────┴────────────┐
│Concrete  │  │   Decorator     │
│Component │  ├─────────────────┤
└──────────┘  │ - component     │
              │ + operation()   │
              └────────┬────────┘
                       △
              ┌────────┴────────┐
        ┌─────┴─────┐    ┌─────┴─────┐
        │DecoratorA │    │DecoratorB │
        └───────────┘    └───────────┘
```

## Implementation

### Python - Coffee Shop Example

```python
from abc import ABC, abstractmethod
from decimal import Decimal

class Coffee(ABC):
    @abstractmethod
    def get_description(self) -> str:
        pass

    @abstractmethod
    def get_cost(self) -> Decimal:
        pass


# Concrete components
class Espresso(Coffee):
    def get_description(self) -> str:
        return "Espresso"

    def get_cost(self) -> Decimal:
        return Decimal("2.00")


class Americano(Coffee):
    def get_description(self) -> str:
        return "Americano"

    def get_cost(self) -> Decimal:
        return Decimal("2.50")


class Latte(Coffee):
    def get_description(self) -> str:
        return "Latte"

    def get_cost(self) -> Decimal:
        return Decimal("3.50")


# Decorator base class
class CoffeeDecorator(Coffee):
    def __init__(self, coffee: Coffee):
        self._coffee = coffee

    def get_description(self) -> str:
        return self._coffee.get_description()

    def get_cost(self) -> Decimal:
        return self._coffee.get_cost()


# Concrete decorators
class Milk(CoffeeDecorator):
    def get_description(self) -> str:
        return f"{self._coffee.get_description()}, Milk"

    def get_cost(self) -> Decimal:
        return self._coffee.get_cost() + Decimal("0.50")


class Whip(CoffeeDecorator):
    def get_description(self) -> str:
        return f"{self._coffee.get_description()}, Whip"

    def get_cost(self) -> Decimal:
        return self._coffee.get_cost() + Decimal("0.70")


class Mocha(CoffeeDecorator):
    def get_description(self) -> str:
        return f"{self._coffee.get_description()}, Mocha"

    def get_cost(self) -> Decimal:
        return self._coffee.get_cost() + Decimal("0.80")


class ExtraShot(CoffeeDecorator):
    def get_description(self) -> str:
        return f"{self._coffee.get_description()}, Extra Shot"

    def get_cost(self) -> Decimal:
        return self._coffee.get_cost() + Decimal("0.75")


class Size(CoffeeDecorator):
    def __init__(self, coffee: Coffee, size: str):
        super().__init__(coffee)
        self._size = size
        self._multipliers = {"small": Decimal("0.8"),
                            "medium": Decimal("1.0"),
                            "large": Decimal("1.3")}

    def get_description(self) -> str:
        return f"{self._size.capitalize()} {self._coffee.get_description()}"

    def get_cost(self) -> Decimal:
        return self._coffee.get_cost() * self._multipliers.get(self._size, Decimal("1.0"))


# Usage
# Simple espresso
coffee = Espresso()
print(f"{coffee.get_description()}: ${coffee.get_cost()}")
# Espresso: $2.00

# Latte with milk and whip
coffee = Latte()
coffee = Milk(coffee)
coffee = Whip(coffee)
print(f"{coffee.get_description()}: ${coffee.get_cost()}")
# Latte, Milk, Whip: $4.70

# Large mocha latte with extra shot
coffee = Latte()
coffee = Mocha(coffee)
coffee = ExtraShot(coffee)
coffee = Size(coffee, "large")
print(f"{coffee.get_description()}: ${coffee.get_cost()}")
# Large Latte, Mocha, Extra Shot: $6.57
```

### Python - Text Formatting Decorators

```python
from abc import ABC, abstractmethod

class TextComponent(ABC):
    @abstractmethod
    def render(self) -> str:
        pass


class PlainText(TextComponent):
    def __init__(self, text: str):
        self._text = text

    def render(self) -> str:
        return self._text


class TextDecorator(TextComponent):
    def __init__(self, component: TextComponent):
        self._component = component


class Bold(TextDecorator):
    def render(self) -> str:
        return f"<b>{self._component.render()}</b>"


class Italic(TextDecorator):
    def render(self) -> str:
        return f"<i>{self._component.render()}</i>"


class Underline(TextDecorator):
    def render(self) -> str:
        return f"<u>{self._component.render()}</u>"


class Link(TextDecorator):
    def __init__(self, component: TextComponent, url: str):
        super().__init__(component)
        self._url = url

    def render(self) -> str:
        return f'<a href="{self._url}">{self._component.render()}</a>'


class Color(TextDecorator):
    def __init__(self, component: TextComponent, color: str):
        super().__init__(component)
        self._color = color

    def render(self) -> str:
        return f'<span style="color:{self._color}">{self._component.render()}</span>'


# Usage
text = PlainText("Hello World")
print(text.render())  # Hello World

text = Bold(PlainText("Hello World"))
print(text.render())  # <b>Hello World</b>

text = Italic(Bold(PlainText("Hello World")))
print(text.render())  # <i><b>Hello World</b></i>

text = Link(Bold(Italic(PlainText("Click here"))), "https://example.com")
text = Color(text, "blue")
print(text.render())
# <span style="color:blue"><a href="https://example.com"><b><i>Click here</i></b></a></span>
```

### Go - HTTP Handler Decorators

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

// Decorator pattern using middleware

type HandlerFunc func(http.ResponseWriter, *http.Request)

// Logging decorator
func WithLogging(next HandlerFunc) HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		log.Printf("Started %s %s", r.Method, r.URL.Path)

		next(w, r)

		log.Printf("Completed %s %s in %v", r.Method, r.URL.Path, time.Since(start))
	}
}

// Authentication decorator
func WithAuth(next HandlerFunc) HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("Authorization")
		if token == "" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// Validate token (simplified)
		if token != "Bearer valid-token" {
			http.Error(w, "Invalid token", http.StatusForbidden)
			return
		}

		next(w, r)
	}
}

// CORS decorator
func WithCORS(next HandlerFunc) HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

// Rate limiting decorator
func WithRateLimit(limit int, window time.Duration) func(HandlerFunc) HandlerFunc {
	requests := make(map[string][]time.Time)

	return func(next HandlerFunc) HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {
			ip := r.RemoteAddr
			now := time.Now()

			// Clean old requests
			var valid []time.Time
			for _, t := range requests[ip] {
				if now.Sub(t) < window {
					valid = append(valid, t)
				}
			}
			requests[ip] = valid

			if len(requests[ip]) >= limit {
				http.Error(w, "Rate limit exceeded", http.StatusTooManyRequests)
				return
			}

			requests[ip] = append(requests[ip], now)
			next(w, r)
		}
	}
}

// Recovery decorator
func WithRecovery(next HandlerFunc) HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Printf("Panic recovered: %v", err)
				http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			}
		}()

		next(w, r)
	}
}

// Base handler
func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, World!")
}

func protectedHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Protected resource accessed!")
}

func main() {
	// Decorate handlers
	http.HandleFunc("/hello",
		WithRecovery(
			WithLogging(
				WithCORS(helloHandler))))

	http.HandleFunc("/protected",
		WithRecovery(
			WithLogging(
				WithCORS(
					WithAuth(
						WithRateLimit(10, time.Minute)(protectedHandler))))))

	log.Println("Server starting on :8080")
	http.ListenAndServe(":8080", nil)
}
```

### Go - Stream Decorators

```go
package main

import (
	"bytes"
	"compress/gzip"
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
	"io"
)

// Stream interface
type Stream interface {
	Write(data []byte) error
	Read() ([]byte, error)
}

// Base stream
type MemoryStream struct {
	buffer *bytes.Buffer
}

func NewMemoryStream() *MemoryStream {
	return &MemoryStream{buffer: &bytes.Buffer{}}
}

func (s *MemoryStream) Write(data []byte) error {
	_, err := s.buffer.Write(data)
	return err
}

func (s *MemoryStream) Read() ([]byte, error) {
	return s.buffer.Bytes(), nil
}

// Decorator base
type StreamDecorator struct {
	stream Stream
}

// Compression decorator
type CompressedStream struct {
	StreamDecorator
}

func NewCompressedStream(stream Stream) *CompressedStream {
	return &CompressedStream{StreamDecorator{stream}}
}

func (s *CompressedStream) Write(data []byte) error {
	var buf bytes.Buffer
	writer := gzip.NewWriter(&buf)
	writer.Write(data)
	writer.Close()
	return s.stream.Write(buf.Bytes())
}

func (s *CompressedStream) Read() ([]byte, error) {
	data, err := s.stream.Read()
	if err != nil {
		return nil, err
	}

	reader, err := gzip.NewReader(bytes.NewReader(data))
	if err != nil {
		return nil, err
	}
	defer reader.Close()

	return io.ReadAll(reader)
}

// Base64 encoding decorator
type Base64Stream struct {
	StreamDecorator
}

func NewBase64Stream(stream Stream) *Base64Stream {
	return &Base64Stream{StreamDecorator{stream}}
}

func (s *Base64Stream) Write(data []byte) error {
	encoded := base64.StdEncoding.EncodeToString(data)
	return s.stream.Write([]byte(encoded))
}

func (s *Base64Stream) Read() ([]byte, error) {
	data, err := s.stream.Read()
	if err != nil {
		return nil, err
	}
	return base64.StdEncoding.DecodeString(string(data))
}

func main() {
	// Simple stream
	stream := NewMemoryStream()
	stream.Write([]byte("Hello, World!"))
	data, _ := stream.Read()
	println("Plain:", string(data))

	// Compressed stream
	compStream := NewCompressedStream(NewMemoryStream())
	compStream.Write([]byte("Hello, World! This is a longer message for compression."))
	data, _ = compStream.Read()
	println("Decompressed:", string(data))

	// Compressed + Base64 encoded
	b64CompStream := NewBase64Stream(NewCompressedStream(NewMemoryStream()))
	b64CompStream.Write([]byte("Hello, World!"))
	data, _ = b64CompStream.Read()
	println("Decoded & Decompressed:", string(data))
}
```

## Common Interview Questions

1. **Decorator vs Inheritance?**
   - Decorator: Runtime, flexible, composable
   - Inheritance: Compile-time, static hierarchy

2. **Decorator vs Proxy?**
   - Decorator: Adds behavior
   - Proxy: Controls access (same interface)

3. **Order of decorators matter?**
   - Yes, decorators are applied in order
   - Different orders can produce different results

## Best Practices

1. **Keep decorators focused** - Single added responsibility
2. **Implement full interface** - Delegate unknown methods
3. **Order thoughtfully** - Consider decorator composition
4. **Use functional style** - When appropriate (like middleware)
5. **Document composition** - Explain typical combinations

## Related Patterns

- [Proxy](/topic/design-patterns/proxy) - Control access
- [Composite](/topic/design-patterns/composite) - Tree structure
- [Adapter](/topic/design-patterns/adapter) - Interface conversion
