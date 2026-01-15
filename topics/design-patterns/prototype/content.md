# Prototype Pattern

## Overview

The Prototype pattern creates new objects by cloning existing instances rather than creating from scratch. This is useful when object creation is expensive or complex.

## Key Concepts

### When to Use

- Object creation is costly (database calls, network requests)
- Objects have many configurations
- Hide complexity of creating new instances
- Avoid subclasses of object creator

## Implementation

### Python

```python
import copy
from abc import ABC, abstractmethod
from typing import Dict, Any


class Prototype(ABC):
    @abstractmethod
    def clone(self) -> 'Prototype':
        pass


class Document(Prototype):
    def __init__(self, title: str, content: str, metadata: Dict[str, Any] = None):
        self.title = title
        self.content = content
        self.metadata = metadata or {}
        self.formatting = {
            'font': 'Arial',
            'size': 12,
            'margins': {'top': 1, 'bottom': 1, 'left': 1, 'right': 1}
        }

    def clone(self) -> 'Document':
        # Deep copy to handle nested objects
        return copy.deepcopy(self)

    def __repr__(self):
        return f"Document(title='{self.title}', content='{self.content[:20]}...')"


class DocumentPrototypeRegistry:
    def __init__(self):
        self._prototypes: Dict[str, Document] = {}

    def register(self, name: str, prototype: Document):
        self._prototypes[name] = prototype

    def unregister(self, name: str):
        del self._prototypes[name]

    def clone(self, name: str) -> Document:
        prototype = self._prototypes.get(name)
        if prototype:
            return prototype.clone()
        raise KeyError(f"Prototype '{name}' not found")


# Complex object example
class GameCharacter(Prototype):
    def __init__(self, name: str, level: int = 1):
        self.name = name
        self.level = level
        self.health = 100
        self.inventory = []
        self.skills = {}
        self.position = {'x': 0, 'y': 0}
        # Simulate expensive initialization
        self._load_assets()

    def _load_assets(self):
        # Expensive operation
        self.assets = {'model': 'character.obj', 'textures': ['skin.png', 'armor.png']}

    def clone(self) -> 'GameCharacter':
        cloned = copy.deepcopy(self)
        # Reset instance-specific properties
        cloned.position = {'x': 0, 'y': 0}
        return cloned

    def __repr__(self):
        return f"Character({self.name}, Level {self.level})"


# Usage
# Document templates
registry = DocumentPrototypeRegistry()

# Create prototype templates
report_template = Document("Report Template", "Introduction\n\nBody\n\nConclusion")
report_template.formatting['font'] = 'Times New Roman'
registry.register("report", report_template)

letter_template = Document("Letter Template", "Dear [Name],\n\n[Body]\n\nSincerely,")
letter_template.formatting['size'] = 11
registry.register("letter", letter_template)

# Clone and customize
my_report = registry.clone("report")
my_report.title = "Q4 Sales Report"
my_report.content = "Q4 was excellent..."

my_letter = registry.clone("letter")
my_letter.title = "Job Offer"
my_letter.content = "Dear John,\n\nWe're pleased to offer..."

print(my_report)
print(my_letter)

# Game characters
warrior_prototype = GameCharacter("Warrior Template", level=1)
warrior_prototype.skills = {'slash': 10, 'block': 5}
warrior_prototype.inventory = ['sword', 'shield']

# Clone for new players
player1 = warrior_prototype.clone()
player1.name = "Player1_Warrior"

player2 = warrior_prototype.clone()
player2.name = "Player2_Warrior"

print(player1, player1.skills)
print(player2, player2.skills)
```

### Go

```go
package main

import "fmt"

type Prototype interface {
	Clone() Prototype
}

type Document struct {
	Title      string
	Content    string
	Metadata   map[string]string
	Formatting Formatting
}

type Formatting struct {
	Font    string
	Size    int
	Margins Margins
}

type Margins struct {
	Top, Bottom, Left, Right int
}

func (d *Document) Clone() Prototype {
	// Create new document with copied values
	clone := &Document{
		Title:   d.Title,
		Content: d.Content,
		Formatting: Formatting{
			Font: d.Formatting.Font,
			Size: d.Formatting.Size,
			Margins: Margins{
				Top:    d.Formatting.Margins.Top,
				Bottom: d.Formatting.Margins.Bottom,
				Left:   d.Formatting.Margins.Left,
				Right:  d.Formatting.Margins.Right,
			},
		},
	}

	// Deep copy map
	clone.Metadata = make(map[string]string)
	for k, v := range d.Metadata {
		clone.Metadata[k] = v
	}

	return clone
}

type PrototypeRegistry struct {
	prototypes map[string]Prototype
}

func NewPrototypeRegistry() *PrototypeRegistry {
	return &PrototypeRegistry{
		prototypes: make(map[string]Prototype),
	}
}

func (r *PrototypeRegistry) Register(name string, prototype Prototype) {
	r.prototypes[name] = prototype
}

func (r *PrototypeRegistry) Clone(name string) (Prototype, error) {
	if prototype, exists := r.prototypes[name]; exists {
		return prototype.Clone(), nil
	}
	return nil, fmt.Errorf("prototype '%s' not found", name)
}

// Game character example
type Character struct {
	Name      string
	Level     int
	Health    int
	Skills    map[string]int
	Inventory []string
	Position  Position
}

type Position struct {
	X, Y int
}

func (c *Character) Clone() Prototype {
	clone := &Character{
		Name:     c.Name,
		Level:    c.Level,
		Health:   c.Health,
		Position: Position{X: 0, Y: 0}, // Reset position
	}

	// Deep copy map
	clone.Skills = make(map[string]int)
	for k, v := range c.Skills {
		clone.Skills[k] = v
	}

	// Deep copy slice
	clone.Inventory = make([]string, len(c.Inventory))
	copy(clone.Inventory, c.Inventory)

	return clone
}

func main() {
	// Document prototype registry
	registry := NewPrototypeRegistry()

	// Create templates
	reportTemplate := &Document{
		Title:   "Report Template",
		Content: "Introduction\n\nBody\n\nConclusion",
		Formatting: Formatting{
			Font: "Times New Roman",
			Size: 12,
			Margins: Margins{1, 1, 1, 1},
		},
		Metadata: make(map[string]string),
	}
	registry.Register("report", reportTemplate)

	// Clone and customize
	proto, _ := registry.Clone("report")
	myReport := proto.(*Document)
	myReport.Title = "Q4 Sales Report"
	myReport.Content = "Q4 was excellent..."

	fmt.Printf("Original: %s\n", reportTemplate.Title)
	fmt.Printf("Cloned: %s\n", myReport.Title)

	// Character prototype
	warriorTemplate := &Character{
		Name:      "Warrior",
		Level:     1,
		Health:    100,
		Skills:    map[string]int{"slash": 10, "block": 5},
		Inventory: []string{"sword", "shield"},
	}

	player1 := warriorTemplate.Clone().(*Character)
	player1.Name = "Player1"

	player2 := warriorTemplate.Clone().(*Character)
	player2.Name = "Player2"
	player2.Skills["slash"] = 15 // Modify doesn't affect others

	fmt.Printf("Player1: %+v\n", player1)
	fmt.Printf("Player2: %+v\n", player2)
	fmt.Printf("Template: %+v\n", warriorTemplate)
}
```

## Best Practices

1. **Deep vs Shallow Copy** - Be explicit about copy depth
2. **Registry Pattern** - Use registry for managing prototypes
3. **Clone Method** - Each class implements its own clone
4. **Reset State** - Reset instance-specific fields after cloning

## Related Patterns

- [Factory Method](/topic/design-patterns/factory-method) - Alternative creation
- [Abstract Factory](/topic/design-patterns/abstract-factory) - Family of objects
- [Singleton](/topic/design-patterns/singleton) - Single instance
