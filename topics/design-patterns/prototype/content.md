# Prototype Pattern

## Overview

The Prototype pattern creates new objects by cloning existing instances rather than constructing them from scratch. Instead of calling a constructor with parameters, you copy an existing object (the prototype) and modify the copy as needed. This creational pattern is particularly valuable when object creation is expensive, complex, or when you need to create objects whose types are determined at runtime.

Think of it like a photocopier for objects: you create one carefully configured original, then make copies whenever you need similar objects. The copies can then be customized without affecting the original.

## Why This Matters (Real-World Context)

Understanding the Prototype pattern is essential for several real-world scenarios that you will encounter in professional software development:

**Game Development**: Creating thousands of enemy characters, each with complex stats, equipment, and AI configurations. Building each from scratch would be prohibitively slow, but cloning a base template and tweaking a few properties is instantaneous.

**Document Processing**: Word processors and design tools let users create templates. When you create a new document from a template, you are using the Prototype pattern. The template is cloned, preserving formatting, styles, and placeholder content.

**Database Record Duplication**: When users need to duplicate complex records with many related entities (like duplicating a product listing with all its variants, images, and metadata), cloning is far more efficient than reconstructing.

**Configuration Management**: Systems often need multiple similar configurations with slight variations. Rather than building each configuration object from scratch, you clone a base configuration and modify specific settings.

**Caching and Object Pooling**: When objects are expensive to create (requiring network calls, file I/O, or heavy computation), systems maintain pools of pre-created prototypes that can be cloned instantly.

## Core Concepts

### The Clone Operation

At the heart of the Prototype pattern is the clone operation. There are two types:

**Shallow Copy**: Creates a new object but copies references to nested objects. Both the original and copy share the same nested objects. Changes to nested objects affect both.

**Deep Copy**: Creates a new object and recursively copies all nested objects. The original and copy are completely independent. This is usually what you want for prototypes.

### Prototype Registry

A common enhancement is the Prototype Registry (also called Prototype Manager), which stores a collection of pre-configured prototypes identified by keys. Clients request clones by name rather than managing prototype objects directly.

### Key Participants

- **Prototype**: Declares the interface for cloning itself
- **Concrete Prototype**: Implements the clone operation
- **Client**: Creates new objects by asking prototypes to clone themselves
- **Registry** (optional): Manages a collection of named prototypes

## How It Works

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0; text-align: center; font-size: 1.1rem;">Prototype Pattern Flow</h4>

  <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 20px;">
    <!-- Step 1: Create Prototype -->
    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
      <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 12px 16px; min-width: 140px; text-align: center;">
        <div style="font-weight: 600; color: #1e40af; font-size: 0.9rem;">1. Create Prototype</div>
        <div style="font-size: 0.75rem; color: #3b82f6; margin-top: 4px;">Configure original object</div>
      </div>
      <div style="color: #64748b; font-size: 1.2rem;">&#8594;</div>
      <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 12px 16px; flex: 1; min-width: 180px;">
        <div style="font-size: 0.8rem; color: #92400e;">
          <code>prototype = Document()</code><br>
          <code>prototype.styles = {...}</code><br>
          <code>prototype.metadata = {...}</code>
        </div>
      </div>
    </div>

    <!-- Step 2: Register (optional) -->
    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
      <div style="background: #d1fae5; border: 2px solid #10b981; border-radius: 8px; padding: 12px 16px; min-width: 140px; text-align: center;">
        <div style="font-weight: 600; color: #065f46; font-size: 0.9rem;">2. Register</div>
        <div style="font-size: 0.75rem; color: #10b981; margin-top: 4px;">Store in registry</div>
      </div>
      <div style="color: #64748b; font-size: 1.2rem;">&#8594;</div>
      <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 12px 16px; flex: 1; min-width: 180px;">
        <div style="font-size: 0.8rem; color: #92400e;">
          <code>registry["report"] = prototype</code>
        </div>
      </div>
    </div>

    <!-- Step 3: Clone -->
    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
      <div style="background: #fce7f3; border: 2px solid #ec4899; border-radius: 8px; padding: 12px 16px; min-width: 140px; text-align: center;">
        <div style="font-weight: 600; color: #9d174d; font-size: 0.9rem;">3. Clone</div>
        <div style="font-size: 0.75rem; color: #ec4899; margin-top: 4px;">Request copy</div>
      </div>
      <div style="color: #64748b; font-size: 1.2rem;">&#8594;</div>
      <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 12px 16px; flex: 1; min-width: 180px;">
        <div style="font-size: 0.8rem; color: #92400e;">
          <code>copy = registry.clone("report")</code><br>
          <code>// Deep copy created</code>
        </div>
      </div>
    </div>

    <!-- Step 4: Customize -->
    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
      <div style="background: #e0e7ff; border: 2px solid #6366f1; border-radius: 8px; padding: 12px 16px; min-width: 140px; text-align: center;">
        <div style="font-weight: 600; color: #3730a3; font-size: 0.9rem;">4. Customize</div>
        <div style="font-size: 0.75rem; color: #6366f1; margin-top: 4px;">Modify clone</div>
      </div>
      <div style="color: #64748b; font-size: 1.2rem;">&#8594;</div>
      <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 12px 16px; flex: 1; min-width: 180px;">
        <div style="font-size: 0.8rem; color: #92400e;">
          <code>copy.title = "Q4 Report"</code><br>
          <code>copy.content = "..."</code>
        </div>
      </div>
    </div>
  </div>

  <div style="background: #f1f5f9; border-radius: 8px; padding: 12px; margin-top: 20px;">
    <div style="font-weight: 600; color: #475569; font-size: 0.85rem;">Key Insight:</div>
    <div style="color: #64748b; font-size: 0.8rem; margin-top: 4px;">
      The prototype and its clone are independent after cloning. Changes to one do not affect the other (assuming deep copy).
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
  <h4 style="color: #1e293b; margin-top: 0; text-align: center; font-size: 1.1rem;">Class Structure</h4>

  <div style="display: flex; flex-direction: column; align-items: center; gap: 16px; margin-top: 16px;">
    <!-- Prototype Interface -->
    <div style="background: #ede9fe; border: 2px dashed #8b5cf6; border-radius: 8px; padding: 16px 24px; text-align: center; min-width: 200px;">
      <div style="font-weight: 700; color: #5b21b6; font-size: 1rem;">Prototype</div>
      <div style="font-size: 0.8rem; color: #7c3aed; margin-top: 8px; font-style: italic;">&laquo;interface&raquo;</div>
      <div style="border-top: 1px solid #c4b5fd; margin-top: 8px; padding-top: 8px; font-size: 0.8rem; color: #6d28d9;">
        + clone(): Prototype
      </div>
    </div>

    <div style="color: #8b5cf6; font-size: 1.2rem;">&#9650; implements</div>

    <!-- Concrete Prototypes -->
    <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
      <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 12px 16px; text-align: center; min-width: 150px;">
        <div style="font-weight: 600; color: #1e40af; font-size: 0.9rem;">ConcretePrototypeA</div>
        <div style="border-top: 1px solid #93c5fd; margin-top: 8px; padding-top: 8px; font-size: 0.75rem; color: #2563eb;">
          - field1, field2<br>
          + clone(): Prototype
        </div>
      </div>

      <div style="background: #d1fae5; border: 2px solid #10b981; border-radius: 8px; padding: 12px 16px; text-align: center; min-width: 150px;">
        <div style="font-weight: 600; color: #065f46; font-size: 0.9rem;">ConcretePrototypeB</div>
        <div style="border-top: 1px solid #6ee7b7; margin-top: 8px; padding-top: 8px; font-size: 0.75rem; color: #059669;">
          - fieldX, fieldY<br>
          + clone(): Prototype
        </div>
      </div>
    </div>
  </div>
</div>

## Real-Life Usage Example

Consider a game development scenario where you need to spawn different types of enemies. Each enemy type has complex initialization: loading assets, configuring AI behavior, setting stats, and establishing equipment loadouts.

```
Scenario: An RPG game with enemy spawning

Without Prototype:
- Each new Orc requires: Load 3D model (200ms), load textures (100ms),
  configure AI (50ms), set base stats, equip weapons
- Spawning 50 Orcs = 50 x 350ms = 17.5 seconds of loading

With Prototype:
- Create ONE fully configured Orc prototype (350ms one-time cost)
- Clone 50 times (practically instant - just memory copy)
- Customize each clone's position and minor variations
- Total time: ~400ms instead of 17.5 seconds
```

## What to Watch Out For (Common Pitfalls)

### Pitfall 1: Shallow Copy When Deep Copy Is Needed

```python
# WRONG: Using assignment or shallow copy
original = GameCharacter()
original.inventory = ["sword", "shield"]

# This creates a reference, not a copy!
copy = original  # Both point to same object

# Even copy.copy() is shallow
import copy
shallow = copy.copy(original)
shallow.inventory.append("potion")  # Modifies original's inventory too!

# CORRECT: Use deep copy
deep = copy.deepcopy(original)
deep.inventory.append("potion")  # Only affects the copy
```

### Pitfall 2: Forgetting to Reset Instance-Specific State

```python
# WRONG: Clone keeps unique identifiers
class User:
    def clone(self):
        return copy.deepcopy(self)

user1 = User(id=123, name="Alice", session_token="abc123")
user2 = user1.clone()
# user2 now has the same ID and session token!

# CORRECT: Reset instance-specific fields
class User:
    def clone(self):
        cloned = copy.deepcopy(self)
        cloned.id = generate_new_id()
        cloned.session_token = None
        cloned.created_at = datetime.now()
        return cloned
```

### Pitfall 3: Circular References

Objects with circular references can cause infinite loops during deep copy. Use `copy.deepcopy()` in Python which handles this, or implement custom clone logic that tracks visited objects.

### Pitfall 4: Non-Cloneable Dependencies

If your object contains references to external resources (database connections, file handles, sockets), these cannot be meaningfully cloned and must be handled specially.

## Interview Deep Dive

### Frequently Asked Questions

**Q: When would you use Prototype instead of Factory?**

A: Use Prototype when:
- Object creation is expensive (heavy initialization)
- You need to create objects whose type is determined at runtime
- You want to avoid building complex class hierarchies of factories
- Objects have many possible configurations that are easier to create by copying and modifying

Use Factory when:
- Object creation is simple and fast
- You need to enforce construction rules
- The set of object types is fixed and known at compile time

**Q: How do you handle deep copy of objects with circular references?**

A: Maintain a dictionary mapping original objects to their clones during the copy process. Before copying any object, check if it has already been copied. Python's `copy.deepcopy()` does this automatically using a memo dictionary.

**Q: What is the relationship between Prototype and immutability?**

A: Immutable objects do not need cloning since they cannot be modified. However, Prototype is valuable for creating new configurations based on existing immutable objects. You clone, create a mutable builder, modify, then produce a new immutable instance.

**Q: How do you implement Prototype in languages without built-in cloning?**

A: Options include:
- Copy constructors
- Serialization/deserialization (serialize to bytes, then deserialize to new object)
- Manual field-by-field copying
- Reflection-based copying utilities

### Common Interview Scenarios

1. **Design a document template system** - Use Prototype with a registry of templates
2. **Implement undo/redo functionality** - Clone state before modifications (Memento + Prototype)
3. **Create a game object spawning system** - Use Prototype to efficiently spawn entities

## Code Implementation

### Python

```python
import copy
from abc import ABC, abstractmethod
from typing import Dict, Any, Optional
from datetime import datetime


class Prototype(ABC):
    """Abstract base class defining the prototype interface."""

    @abstractmethod
    def clone(self) -> 'Prototype':
        """Create a deep copy of this object."""
        pass


class Document(Prototype):
    """
    A complex document class demonstrating the Prototype pattern.
    Documents have nested structures that must be deep copied.
    """

    def __init__(self, title: str, content: str, metadata: Dict[str, Any] = None):
        self.title = title
        self.content = content
        self.metadata = metadata or {}
        self.formatting = {
            'font': 'Arial',
            'size': 12,
            'margins': {'top': 1, 'bottom': 1, 'left': 1, 'right': 1}
        }
        self.created_at = datetime.now()
        self.sections = []

    def add_section(self, name: str, content: str) -> None:
        self.sections.append({'name': name, 'content': content})

    def clone(self) -> 'Document':
        """
        Create a deep copy of the document.
        Reset instance-specific fields like timestamps.
        """
        cloned = copy.deepcopy(self)
        cloned.created_at = datetime.now()  # New creation time
        return cloned

    def __repr__(self):
        return f"Document(title='{self.title}', sections={len(self.sections)})"


class PrototypeRegistry:
    """
    Registry that manages named prototypes.
    Clients can register prototypes and clone them by name.
    """

    def __init__(self):
        self._prototypes: Dict[str, Prototype] = {}

    def register(self, name: str, prototype: Prototype) -> None:
        """Register a prototype with a given name."""
        self._prototypes[name] = prototype

    def unregister(self, name: str) -> None:
        """Remove a prototype from the registry."""
        if name in self._prototypes:
            del self._prototypes[name]

    def clone(self, name: str) -> Prototype:
        """Clone a registered prototype by name."""
        if name not in self._prototypes:
            raise KeyError(f"Prototype '{name}' not found in registry")
        return self._prototypes[name].clone()

    def list_prototypes(self) -> list:
        """List all registered prototype names."""
        return list(self._prototypes.keys())


class GameCharacter(Prototype):
    """
    Example of a complex game object that benefits from cloning.
    Creating characters involves expensive asset loading.
    """

    def __init__(self, name: str, character_class: str):
        self.name = name
        self.character_class = character_class
        self.level = 1
        self.health = 100
        self.mana = 50
        self.inventory = []
        self.skills = {}
        self.position = {'x': 0, 'y': 0, 'z': 0}
        self.equipment = {
            'weapon': None,
            'armor': None,
            'accessory': None
        }

        # Simulate expensive initialization
        self._loaded_assets = self._load_assets()

    def _load_assets(self) -> Dict[str, str]:
        """Simulate loading expensive game assets."""
        # In real code, this would load 3D models, textures, etc.
        return {
            'model': f'{self.character_class.lower()}_model.fbx',
            'texture': f'{self.character_class.lower()}_texture.png',
            'animations': f'{self.character_class.lower()}_anims.json'
        }

    def clone(self) -> 'GameCharacter':
        """
        Clone the character. Assets are shared (they are immutable),
        but mutable state like inventory is deep copied.
        """
        cloned = copy.deepcopy(self)
        # Reset position for new spawn point
        cloned.position = {'x': 0, 'y': 0, 'z': 0}
        # Note: _loaded_assets can be shallow copied since assets are immutable
        return cloned

    def equip(self, slot: str, item: str) -> None:
        if slot in self.equipment:
            self.equipment[slot] = item

    def __repr__(self):
        return f"GameCharacter({self.name}, {self.character_class}, Level {self.level})"


# Usage Example
if __name__ == "__main__":
    # Create and configure document templates
    registry = PrototypeRegistry()

    # Create a report template
    report_template = Document("Report Template", "")
    report_template.formatting['font'] = 'Times New Roman'
    report_template.add_section("Executive Summary", "[Summary here]")
    report_template.add_section("Details", "[Details here]")
    report_template.add_section("Conclusion", "[Conclusion here]")
    report_template.metadata = {'type': 'report', 'department': 'Engineering'}
    registry.register("report", report_template)

    # Create a memo template
    memo_template = Document("Memo Template", "")
    memo_template.formatting['size'] = 11
    memo_template.add_section("To/From", "[Recipients]")
    memo_template.add_section("Subject", "[Subject]")
    memo_template.add_section("Body", "[Content]")
    registry.register("memo", memo_template)

    # Clone and customize
    q4_report = registry.clone("report")
    q4_report.title = "Q4 2024 Sales Report"
    q4_report.sections[0]['content'] = "Sales exceeded targets by 15%..."

    print(f"Original template: {report_template}")
    print(f"Q4 Report clone: {q4_report}")
    print(f"Templates share sections: {report_template.sections is q4_report.sections}")  # False

    # Game character prototypes
    warrior_prototype = GameCharacter("Warrior Template", "Warrior")
    warrior_prototype.skills = {'slash': 10, 'block': 8, 'charge': 5}
    warrior_prototype.equip('weapon', 'Iron Sword')
    warrior_prototype.equip('armor', 'Chain Mail')

    # Spawn multiple warriors by cloning
    player1 = warrior_prototype.clone()
    player1.name = "Thorin"

    player2 = warrior_prototype.clone()
    player2.name = "Gimli"
    player2.skills['slash'] = 12  # Customize this warrior's skills

    print(f"\nWarrior prototype: {warrior_prototype}")
    print(f"Player 1: {player1}")
    print(f"Player 2: {player2}")
    print(f"Shared skills dict: {warrior_prototype.skills is player1.skills}")  # False
```

### Go

```go
package main

import (
	"fmt"
	"time"
)

// Prototype interface defines the cloning contract
type Prototype interface {
	Clone() Prototype
}

// Document represents a complex document with nested structures
type Document struct {
	Title      string
	Content    string
	Metadata   map[string]string
	Formatting Formatting
	Sections   []Section
	CreatedAt  time.Time
}

type Formatting struct {
	Font    string
	Size    int
	Margins Margins
}

type Margins struct {
	Top, Bottom, Left, Right int
}

type Section struct {
	Name    string
	Content string
}

// Clone creates a deep copy of the Document
func (d *Document) Clone() Prototype {
	// Create new document with copied primitive values
	clone := &Document{
		Title:     d.Title,
		Content:   d.Content,
		CreatedAt: time.Now(), // Reset creation time
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

	// Deep copy slice
	clone.Sections = make([]Section, len(d.Sections))
	copy(clone.Sections, d.Sections)

	return clone
}

// PrototypeRegistry manages named prototypes
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

func (r *PrototypeRegistry) Unregister(name string) {
	delete(r.prototypes, name)
}

func (r *PrototypeRegistry) Clone(name string) (Prototype, error) {
	prototype, exists := r.prototypes[name]
	if !exists {
		return nil, fmt.Errorf("prototype '%s' not found", name)
	}
	return prototype.Clone(), nil
}

func (r *PrototypeRegistry) List() []string {
	names := make([]string, 0, len(r.prototypes))
	for name := range r.prototypes {
		names = append(names, name)
	}
	return names
}

// GameCharacter demonstrates a complex object benefiting from cloning
type GameCharacter struct {
	Name           string
	CharacterClass string
	Level          int
	Health         int
	Mana           int
	Skills         map[string]int
	Inventory      []string
	Equipment      Equipment
	Position       Position
}

type Equipment struct {
	Weapon    string
	Armor     string
	Accessory string
}

type Position struct {
	X, Y, Z float64
}

// Clone creates a deep copy of the GameCharacter
func (c *GameCharacter) Clone() Prototype {
	clone := &GameCharacter{
		Name:           c.Name,
		CharacterClass: c.CharacterClass,
		Level:          c.Level,
		Health:         c.Health,
		Mana:           c.Mana,
		Equipment:      c.Equipment, // Struct is copied by value
		Position:       Position{X: 0, Y: 0, Z: 0}, // Reset spawn position
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
	// Create prototype registry
	registry := NewPrototypeRegistry()

	// Create and register document templates
	reportTemplate := &Document{
		Title:   "Report Template",
		Content: "",
		Formatting: Formatting{
			Font: "Times New Roman",
			Size: 12,
			Margins: Margins{Top: 1, Bottom: 1, Left: 1, Right: 1},
		},
		Metadata: map[string]string{"type": "report"},
		Sections: []Section{
			{Name: "Summary", Content: "[Summary]"},
			{Name: "Details", Content: "[Details]"},
		},
		CreatedAt: time.Now(),
	}
	registry.Register("report", reportTemplate)

	// Clone and customize document
	proto, _ := registry.Clone("report")
	q4Report := proto.(*Document)
	q4Report.Title = "Q4 2024 Sales Report"
	q4Report.Sections[0].Content = "Sales exceeded targets..."

	fmt.Println("=== Document Cloning ===")
	fmt.Printf("Template: %s (created: %v)\n", reportTemplate.Title, reportTemplate.CreatedAt.Format("15:04:05"))
	fmt.Printf("Clone: %s (created: %v)\n", q4Report.Title, q4Report.CreatedAt.Format("15:04:05"))

	// Game character cloning
	fmt.Println("\n=== Game Character Cloning ===")

	warriorPrototype := &GameCharacter{
		Name:           "Warrior Template",
		CharacterClass: "Warrior",
		Level:          1,
		Health:         100,
		Mana:           30,
		Skills:         map[string]int{"slash": 10, "block": 8},
		Inventory:      []string{"sword", "shield", "potion"},
		Equipment:      Equipment{Weapon: "Iron Sword", Armor: "Chain Mail"},
	}

	// Clone for players
	player1 := warriorPrototype.Clone().(*GameCharacter)
	player1.Name = "Thorin"
	player1.Position = Position{X: 10, Y: 0, Z: 5}

	player2 := warriorPrototype.Clone().(*GameCharacter)
	player2.Name = "Gimli"
	player2.Skills["slash"] = 15 // Customize skills

	fmt.Printf("Prototype: %s, Skills: %v\n", warriorPrototype.Name, warriorPrototype.Skills)
	fmt.Printf("Player 1: %s, Skills: %v, Position: %v\n", player1.Name, player1.Skills, player1.Position)
	fmt.Printf("Player 2: %s, Skills: %v, Position: %v\n", player2.Name, player2.Skills, player2.Position)

	// Verify deep copy
	fmt.Printf("\nSkills are independent: %v\n", warriorPrototype.Skills["slash"] != player2.Skills["slash"])
}
```

## Quick Reference Card

| Aspect | Details |
|--------|---------|
| **Pattern Type** | Creational |
| **Intent** | Create objects by cloning prototypes instead of constructing |
| **Key Mechanism** | Clone method that creates deep copy |
| **Use When** | Object creation is expensive; runtime type determination needed |
| **Avoid When** | Simple object creation; few configurations needed |
| **Related Patterns** | Factory Method (alternative), Abstract Factory (uses prototypes), Singleton (opposite concept) |

### Clone Types Quick Reference

| Type | What's Copied | Nested Objects | Use Case |
|------|---------------|----------------|----------|
| **Shallow** | References | Shared | Immutable nested objects |
| **Deep** | Everything | Independent copies | Mutable nested objects |

### Implementation Checklist

- [ ] Define clone interface/method
- [ ] Implement deep copy for all mutable nested objects
- [ ] Reset instance-specific fields (IDs, timestamps)
- [ ] Handle circular references if present
- [ ] Consider using a registry for managing prototypes
- [ ] Document which fields are reset vs preserved

### Common Mistakes to Avoid

1. Using shallow copy when deep copy is needed
2. Forgetting to reset unique identifiers
3. Not handling circular references
4. Cloning non-cloneable resources (connections, handles)
5. Over-using prototype when simple construction suffices

## Related Patterns

- [Factory Method](/topic/design-patterns/factory-method) - Alternative creation approach
- [Abstract Factory](/topic/design-patterns/abstract-factory) - Can use prototypes internally
- [Singleton](/topic/design-patterns/singleton) - Opposite concept (single vs. multiple instances)
- [Memento](/topic/design-patterns/memento) - Uses similar cloning for state snapshots
