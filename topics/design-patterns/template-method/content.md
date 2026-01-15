# Template Method Pattern

## Overview

The Template Method pattern defines the skeleton of an algorithm in a base class, letting subclasses override specific steps without changing the algorithm's structure. It's a behavioral pattern based on inheritance.

## Key Concepts

### When to Use

- Algorithm has invariant parts and customizable parts
- Common behavior should be centralized
- Control extension points in framework design
- Avoid code duplication in similar algorithms

### Structure

```
┌─────────────────────────────┐
│      AbstractClass          │
├─────────────────────────────┤
│ + templateMethod()          │ ← Defines algorithm skeleton
│ # primitiveOperation1()     │ ← Abstract steps
│ # primitiveOperation2()     │
│ # hook()                    │ ← Optional hook
└─────────────────┬───────────┘
                  △
         ┌────────┴────────┐
    ┌────┴────┐       ┌────┴────┐
    │ClassA   │       │ClassB   │
    └─────────┘       └─────────┘
```

## Implementation

### Python - Data Processing Pipeline

```python
from abc import ABC, abstractmethod
from typing import List, Dict, Any
import json
import csv
from io import StringIO

class DataProcessor(ABC):
    """Template for data processing pipeline"""

    def process(self, source: str) -> Dict[str, Any]:
        """Template method - defines the algorithm skeleton"""
        # Step 1: Read data
        raw_data = self.read_data(source)

        # Step 2: Parse data
        parsed_data = self.parse_data(raw_data)

        # Step 3: Validate (hook - optional)
        if self.should_validate():
            self.validate(parsed_data)

        # Step 4: Transform
        transformed_data = self.transform(parsed_data)

        # Step 5: Output
        return self.format_output(transformed_data)

    @abstractmethod
    def read_data(self, source: str) -> str:
        """Read raw data from source"""
        pass

    @abstractmethod
    def parse_data(self, raw_data: str) -> List[Dict]:
        """Parse raw data into structured format"""
        pass

    @abstractmethod
    def transform(self, data: List[Dict]) -> List[Dict]:
        """Transform the data"""
        pass

    # Hook methods - can be overridden
    def should_validate(self) -> bool:
        """Hook to enable/disable validation"""
        return True

    def validate(self, data: List[Dict]) -> None:
        """Validate data - can be overridden"""
        if not data:
            raise ValueError("Data is empty")

    def format_output(self, data: List[Dict]) -> Dict[str, Any]:
        """Format final output - can be overridden"""
        return {
            "count": len(data),
            "data": data
        }


class JSONDataProcessor(DataProcessor):
    def read_data(self, source: str) -> str:
        print(f"Reading JSON from: {source}")
        # Simulate reading from file
        return '{"users": [{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]}'

    def parse_data(self, raw_data: str) -> List[Dict]:
        print("Parsing JSON data")
        parsed = json.loads(raw_data)
        return parsed.get("users", [])

    def transform(self, data: List[Dict]) -> List[Dict]:
        print("Transforming JSON data")
        return [
            {**user, "name": user["name"].upper()}
            for user in data
        ]


class CSVDataProcessor(DataProcessor):
    def read_data(self, source: str) -> str:
        print(f"Reading CSV from: {source}")
        return "name,age\nAlice,30\nBob,25"

    def parse_data(self, raw_data: str) -> List[Dict]:
        print("Parsing CSV data")
        reader = csv.DictReader(StringIO(raw_data))
        return [row for row in reader]

    def transform(self, data: List[Dict]) -> List[Dict]:
        print("Transforming CSV data")
        return [
            {"name": row["name"], "age": int(row["age"])}
            for row in data
        ]

    def should_validate(self) -> bool:
        return False  # Skip validation for CSV


class XMLDataProcessor(DataProcessor):
    def read_data(self, source: str) -> str:
        print(f"Reading XML from: {source}")
        return "<users><user name='Alice' age='30'/><user name='Bob' age='25'/></users>"

    def parse_data(self, raw_data: str) -> List[Dict]:
        print("Parsing XML data")
        import xml.etree.ElementTree as ET
        root = ET.fromstring(raw_data)
        return [
            {"name": user.get("name"), "age": user.get("age")}
            for user in root.findall("user")
        ]

    def transform(self, data: List[Dict]) -> List[Dict]:
        print("Transforming XML data")
        return [
            {"name": user["name"], "age": int(user["age"]), "source": "xml"}
            for user in data
        ]

    def format_output(self, data: List[Dict]) -> Dict[str, Any]:
        # Custom output format
        return {
            "format": "xml",
            "processed_count": len(data),
            "records": data
        }


# Usage
processors = [
    JSONDataProcessor(),
    CSVDataProcessor(),
    XMLDataProcessor()
]

for processor in processors:
    print(f"\n{'='*50}")
    result = processor.process("data_file")
    print(f"Result: {result}\n")
```

### Go - HTTP Request Handler

```go
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// Template interface
type RequestHandler interface {
	// Template method steps
	Authenticate(r *http.Request) error
	Authorize(r *http.Request, userID string) error
	Validate(r *http.Request) error
	Process(r *http.Request) (interface{}, error)
	Format(data interface{}) ([]byte, error)

	// Hook methods
	ShouldLog() bool
	OnError(err error)
}

// Base handler with template method
type BaseHandler struct {
	Handler RequestHandler
}

func (h *BaseHandler) Handle(w http.ResponseWriter, r *http.Request) {
	start := time.Now()

	// Template method execution
	defer func() {
		if h.Handler.ShouldLog() {
			fmt.Printf("[%s] %s - %v\n", r.Method, r.URL.Path, time.Since(start))
		}
	}()

	// Step 1: Authenticate
	userID := r.Header.Get("X-User-ID")
	if err := h.Handler.Authenticate(r); err != nil {
		h.Handler.OnError(err)
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Step 2: Authorize
	if err := h.Handler.Authorize(r, userID); err != nil {
		h.Handler.OnError(err)
		http.Error(w, "Forbidden", http.StatusForbidden)
		return
	}

	// Step 3: Validate
	if err := h.Handler.Validate(r); err != nil {
		h.Handler.OnError(err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Step 4: Process
	data, err := h.Handler.Process(r)
	if err != nil {
		h.Handler.OnError(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Step 5: Format response
	response, err := h.Handler.Format(data)
	if err != nil {
		h.Handler.OnError(err)
		http.Error(w, "Failed to format response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(response)
}

// Concrete handler: Get Users
type GetUsersHandler struct{}

func (h *GetUsersHandler) Authenticate(r *http.Request) error {
	if r.Header.Get("Authorization") == "" {
		return fmt.Errorf("missing authorization")
	}
	return nil
}

func (h *GetUsersHandler) Authorize(r *http.Request, userID string) error {
	// Any authenticated user can list users
	return nil
}

func (h *GetUsersHandler) Validate(r *http.Request) error {
	return nil // No validation needed for GET
}

func (h *GetUsersHandler) Process(r *http.Request) (interface{}, error) {
	users := []map[string]interface{}{
		{"id": "1", "name": "Alice"},
		{"id": "2", "name": "Bob"},
	}
	return users, nil
}

func (h *GetUsersHandler) Format(data interface{}) ([]byte, error) {
	return json.Marshal(map[string]interface{}{
		"users": data,
	})
}

func (h *GetUsersHandler) ShouldLog() bool {
	return true
}

func (h *GetUsersHandler) OnError(err error) {
	fmt.Printf("[ERROR] GetUsers: %v\n", err)
}

// Concrete handler: Create User
type CreateUserHandler struct{}

func (h *CreateUserHandler) Authenticate(r *http.Request) error {
	if r.Header.Get("Authorization") == "" {
		return fmt.Errorf("missing authorization")
	}
	return nil
}

func (h *CreateUserHandler) Authorize(r *http.Request, userID string) error {
	// Only admins can create users
	if r.Header.Get("X-Role") != "admin" {
		return fmt.Errorf("admin role required")
	}
	return nil
}

func (h *CreateUserHandler) Validate(r *http.Request) error {
	if r.ContentLength == 0 {
		return fmt.Errorf("request body is required")
	}
	return nil
}

func (h *CreateUserHandler) Process(r *http.Request) (interface{}, error) {
	var user map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		return nil, err
	}
	user["id"] = "new-id-123"
	return user, nil
}

func (h *CreateUserHandler) Format(data interface{}) ([]byte, error) {
	return json.Marshal(map[string]interface{}{
		"created": true,
		"user":    data,
	})
}

func (h *CreateUserHandler) ShouldLog() bool {
	return true
}

func (h *CreateUserHandler) OnError(err error) {
	fmt.Printf("[ERROR] CreateUser: %v\n", err)
}

func main() {
	getUsersHandler := &BaseHandler{Handler: &GetUsersHandler{}}
	createUserHandler := &BaseHandler{Handler: &CreateUserHandler{}}

	http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "GET":
			getUsersHandler.Handle(w, r)
		case "POST":
			createUserHandler.Handle(w, r)
		}
	})

	fmt.Println("Server starting on :8080")
	http.ListenAndServe(":8080", nil)
}
```

## Common Interview Questions

1. **Template Method vs Strategy?**
   - Template: Uses inheritance, defines skeleton
   - Strategy: Uses composition, swaps entire algorithm

2. **What are hook methods?**
   - Optional steps subclasses can override
   - Have default (often empty) implementation

3. **How to prevent subclass from overriding template?**
   - Make template method final (Java)
   - Don't expose template method (Python convention)

## Best Practices

1. **Minimize abstract operations** - Fewer things to implement
2. **Use hooks for optional steps** - Provide defaults
3. **Document extension points** - Clear what to override
4. **Keep template method focused** - Single algorithm
5. **Consider composition** - Template can become rigid

## Related Patterns

- [Strategy](/topic/design-patterns/strategy) - Composition alternative
- [Factory Method](/topic/design-patterns/factory-method) - Often used in templates
- [Hook](/topic/design-patterns/observer) - Similar extension mechanism
