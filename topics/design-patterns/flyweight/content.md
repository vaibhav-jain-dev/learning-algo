# Flyweight Pattern

## Overview

The Flyweight pattern minimizes memory usage by sharing as much data as possible with similar objects. It separates intrinsic (shared) state from extrinsic (context-specific) state.

## Key Concepts

### When to Use

- Large number of similar objects
- Storage costs are high
- Most object state can be made extrinsic
- Identity of objects isn't important

### State Types

- **Intrinsic**: Shared, context-independent (stored in flyweight)
- **Extrinsic**: Unique, context-dependent (passed by client)

## Implementation

### Python

```python
from typing import Dict, List, Tuple
from dataclasses import dataclass
import sys


# Flyweight - shared state
class CharacterStyle:
    def __init__(self, font: str, size: int, color: str, bold: bool = False):
        self.font = font
        self.size = size
        self.color = color
        self.bold = bold

    def render(self, char: str, x: int, y: int) -> str:
        style = "bold " if self.bold else ""
        return f"'{char}' at ({x},{y}) in {style}{self.font} {self.size}pt {self.color}"

    def __repr__(self):
        return f"Style({self.font}, {self.size}, {self.color})"


# Flyweight Factory
class StyleFactory:
    _styles: Dict[Tuple, CharacterStyle] = {}

    @classmethod
    def get_style(cls, font: str, size: int, color: str, bold: bool = False) -> CharacterStyle:
        key = (font, size, color, bold)
        if key not in cls._styles:
            cls._styles[key] = CharacterStyle(font, size, color, bold)
            print(f"Created new style: {cls._styles[key]}")
        return cls._styles[key]

    @classmethod
    def get_style_count(cls) -> int:
        return len(cls._styles)


# Context with extrinsic state
@dataclass
class Character:
    char: str
    x: int
    y: int
    style: CharacterStyle  # Reference to flyweight

    def render(self) -> str:
        return self.style.render(self.char, self.x, self.y)


# Text Editor using Flyweight
class TextEditor:
    def __init__(self):
        self.characters: List[Character] = []
        self.current_style = StyleFactory.get_style("Arial", 12, "black")

    def set_style(self, font: str, size: int, color: str, bold: bool = False):
        self.current_style = StyleFactory.get_style(font, size, color, bold)

    def add_character(self, char: str, x: int, y: int):
        character = Character(char, x, y, self.current_style)
        self.characters.append(character)

    def render_all(self):
        for char in self.characters:
            print(char.render())

    def memory_usage(self) -> Dict:
        char_count = len(self.characters)
        style_count = StyleFactory.get_style_count()

        # Without flyweight: each char would have its own style
        without_flyweight = char_count * sys.getsizeof(CharacterStyle("", 0, ""))

        # With flyweight: styles are shared
        with_flyweight = style_count * sys.getsizeof(CharacterStyle("", 0, ""))

        return {
            "characters": char_count,
            "unique_styles": style_count,
            "estimated_savings": f"{(1 - with_flyweight/without_flyweight)*100:.1f}%"
        }


# Real-world example: Game particles
class ParticleType:
    """Flyweight - shared particle properties"""
    def __init__(self, sprite: str, color: str, physics: Dict):
        self.sprite = sprite
        self.color = color
        self.physics = physics  # gravity, friction, etc.

    def draw(self, x: int, y: int, scale: float):
        return f"Draw {self.sprite} ({self.color}) at ({x},{y}) scale {scale}"


class ParticleFactory:
    _types: Dict[str, ParticleType] = {}

    @classmethod
    def get_particle_type(cls, name: str) -> ParticleType:
        if name not in cls._types:
            # Load particle properties
            configs = {
                "bullet": ParticleType("bullet.png", "yellow",
                                      {"gravity": 0, "speed": 10}),
                "smoke": ParticleType("smoke.png", "gray",
                                     {"gravity": -0.1, "speed": 1}),
                "spark": ParticleType("spark.png", "orange",
                                     {"gravity": 0.5, "speed": 3}),
                "blood": ParticleType("blood.png", "red",
                                     {"gravity": 1, "speed": 2}),
            }
            cls._types[name] = configs.get(name)
        return cls._types[name]


class Particle:
    """Context with extrinsic state"""
    def __init__(self, particle_type: ParticleType, x: int, y: int,
                 velocity: Tuple[float, float], scale: float = 1.0):
        self.type = particle_type  # Flyweight reference
        self.x = x
        self.y = y
        self.vx, self.vy = velocity
        self.scale = scale
        self.lifetime = 100

    def update(self):
        self.x += self.vx
        self.y += self.vy
        self.vy += self.type.physics.get("gravity", 0)
        self.lifetime -= 1

    def draw(self):
        return self.type.draw(self.x, self.y, self.scale)


class ParticleSystem:
    def __init__(self):
        self.particles: List[Particle] = []

    def spawn(self, type_name: str, x: int, y: int,
              velocity: Tuple[float, float], count: int = 1):
        particle_type = ParticleFactory.get_particle_type(type_name)
        for _ in range(count):
            self.particles.append(
                Particle(particle_type, x, y, velocity)
            )

    def update(self):
        # Update and remove dead particles
        self.particles = [p for p in self.particles if p.lifetime > 0]
        for p in self.particles:
            p.update()

    def render(self):
        for p in self.particles:
            print(p.draw())


# Tree example for forest
class TreeType:
    """Flyweight for tree rendering data"""
    def __init__(self, name: str, color: str, texture: str):
        self.name = name
        self.color = color
        self.texture = texture
        # Simulate large texture data
        self._texture_data = f"[{texture} data - 10MB]"

    def draw(self, x: int, y: int):
        return f"Draw {self.name} tree at ({x},{y})"


class TreeFactory:
    _types: Dict[str, TreeType] = {}

    @classmethod
    def get_tree_type(cls, name: str, color: str, texture: str) -> TreeType:
        key = f"{name}_{color}_{texture}"
        if key not in cls._types:
            cls._types[key] = TreeType(name, color, texture)
        return cls._types[key]


class Tree:
    def __init__(self, x: int, y: int, tree_type: TreeType):
        self.x = x
        self.y = y
        self.type = tree_type

    def draw(self):
        return self.type.draw(self.x, self.y)


class Forest:
    def __init__(self):
        self.trees: List[Tree] = []

    def plant_tree(self, x: int, y: int, name: str, color: str, texture: str):
        tree_type = TreeFactory.get_tree_type(name, color, texture)
        self.trees.append(Tree(x, y, tree_type))


# Usage
print("=== Text Editor ===")
editor = TextEditor()

# Type with default style
for i, char in enumerate("Hello"):
    editor.add_character(char, i * 10, 0)

# Change style
editor.set_style("Times", 14, "blue", bold=True)
for i, char in enumerate("World"):
    editor.add_character(char, i * 10, 20)

# Back to original style
editor.set_style("Arial", 12, "black")
for i, char in enumerate("!!!"):
    editor.add_character(char, i * 10, 40)

print(f"\nMemory stats: {editor.memory_usage()}")

print("\n=== Particle System ===")
system = ParticleSystem()
system.spawn("bullet", 100, 100, (5, 0), count=10)
system.spawn("smoke", 100, 100, (0, -1), count=20)
system.spawn("spark", 100, 100, (2, -2), count=15)

print(f"Total particles: {len(system.particles)}")
print(f"Unique particle types: {len(ParticleFactory._types)}")

print("\n=== Forest ===")
import random
forest = Forest()
for _ in range(1000):
    x, y = random.randint(0, 1000), random.randint(0, 1000)
    tree_type = random.choice(["Oak", "Pine", "Birch"])
    color = random.choice(["green", "dark_green"])
    forest.plant_tree(x, y, tree_type, color, f"{tree_type.lower()}_texture")

print(f"Trees planted: {len(forest.trees)}")
print(f"Unique tree types: {len(TreeFactory._types)}")
```

### Go

```go
package main

import (
	"fmt"
)

// Flyweight
type CharacterStyle struct {
	Font  string
	Size  int
	Color string
	Bold  bool
}

func (s *CharacterStyle) Render(char string, x, y int) string {
	bold := ""
	if s.Bold {
		bold = "bold "
	}
	return fmt.Sprintf("'%s' at (%d,%d) in %s%s %dpt %s",
		char, x, y, bold, s.Font, s.Size, s.Color)
}

// Flyweight Factory
type StyleFactory struct {
	styles map[string]*CharacterStyle
}

func NewStyleFactory() *StyleFactory {
	return &StyleFactory{
		styles: make(map[string]*CharacterStyle),
	}
}

func (f *StyleFactory) GetStyle(font string, size int, color string, bold bool) *CharacterStyle {
	key := fmt.Sprintf("%s_%d_%s_%t", font, size, color, bold)
	if _, exists := f.styles[key]; !exists {
		f.styles[key] = &CharacterStyle{
			Font:  font,
			Size:  size,
			Color: color,
			Bold:  bold,
		}
		fmt.Printf("Created new style: %s\n", key)
	}
	return f.styles[key]
}

func (f *StyleFactory) GetStyleCount() int {
	return len(f.styles)
}

// Context
type Character struct {
	Char  string
	X, Y  int
	Style *CharacterStyle
}

func (c *Character) Render() string {
	return c.Style.Render(c.Char, c.X, c.Y)
}

// Tree Flyweight example
type TreeType struct {
	Name    string
	Color   string
	Texture string
}

func (t *TreeType) Draw(x, y int) string {
	return fmt.Sprintf("Draw %s tree at (%d,%d)", t.Name, x, y)
}

type TreeFactory struct {
	types map[string]*TreeType
}

func NewTreeFactory() *TreeFactory {
	return &TreeFactory{
		types: make(map[string]*TreeType),
	}
}

func (f *TreeFactory) GetTreeType(name, color, texture string) *TreeType {
	key := fmt.Sprintf("%s_%s_%s", name, color, texture)
	if _, exists := f.types[key]; !exists {
		f.types[key] = &TreeType{
			Name:    name,
			Color:   color,
			Texture: texture,
		}
	}
	return f.types[key]
}

type Tree struct {
	X, Y     int
	TreeType *TreeType
}

func (t *Tree) Draw() string {
	return t.TreeType.Draw(t.X, t.Y)
}

type Forest struct {
	Trees   []*Tree
	Factory *TreeFactory
}

func NewForest() *Forest {
	return &Forest{
		Trees:   make([]*Tree, 0),
		Factory: NewTreeFactory(),
	}
}

func (f *Forest) PlantTree(x, y int, name, color, texture string) {
	treeType := f.Factory.GetTreeType(name, color, texture)
	f.Trees = append(f.Trees, &Tree{X: x, Y: y, TreeType: treeType})
}

func main() {
	// Text editor example
	factory := NewStyleFactory()

	style1 := factory.GetStyle("Arial", 12, "black", false)
	style2 := factory.GetStyle("Times", 14, "blue", true)
	style3 := factory.GetStyle("Arial", 12, "black", false) // Reuses existing

	fmt.Println(style1.Render("H", 0, 0))
	fmt.Println(style2.Render("W", 10, 0))
	fmt.Println(style3.Render("!", 20, 0))

	fmt.Printf("\nUnique styles: %d\n", factory.GetStyleCount())

	// Forest example
	fmt.Println("\n=== Forest ===")
	forest := NewForest()

	// Plant many trees
	types := []string{"Oak", "Pine", "Birch"}
	colors := []string{"green", "dark_green"}

	for i := 0; i < 1000; i++ {
		name := types[i%3]
		color := colors[i%2]
		forest.PlantTree(i*10, i*10, name, color, name+"_texture")
	}

	fmt.Printf("Trees planted: %d\n", len(forest.Trees))
	fmt.Printf("Unique tree types: %d\n", len(forest.Factory.types))
}
```

## Memory Comparison

| Scenario | Without Flyweight | With Flyweight |
|----------|-------------------|----------------|
| 1000 chars, 5 styles | 1000 style objects | 5 style objects |
| 10000 trees, 6 types | 10000 type objects | 6 type objects |

## Best Practices

1. **Identify shared state** - What can be extracted and shared
2. **Factory pattern** - Use factory to manage flyweight pool
3. **Immutability** - Flyweights should be immutable
4. **Trade-off** - Consider complexity vs memory savings

## Related Patterns

- [Factory Method](/topic/design-patterns/factory-method) - Creates flyweights
- [Singleton](/topic/design-patterns/singleton) - Factory often singleton
- [Composite](/topic/design-patterns/composite) - May use flyweights for leaves
