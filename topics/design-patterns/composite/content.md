# Composite Pattern

## Overview

The Composite pattern composes objects into tree structures to represent part-whole hierarchies. It lets clients treat individual objects and compositions of objects uniformly.

## Key Concepts

### When to Use

- Represent part-whole hierarchies
- Treat leaf and composite objects uniformly
- Recursive tree structures
- File systems, UI components, organization charts

### Structure

<div id="composite-structure" class="diagram-container light"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const diagram = new TreeDiagram('composite-structure', {
        width: 750,
        height: 350,
        nodeRadius: 40,
        verticalSpacing: 100,
        root: {
            id: 'Component',
            label: '≪interface≫\nComponent\n+operation()\n+add()\n+remove()',
            type: 'root',
            children: [
                {
                    id: 'Leaf',
                    label: 'Leaf\n+operation()',
                    type: 'leaf',
                    children: []
                },
                {
                    id: 'Composite',
                    label: 'Composite\n-children[]\n+operation()\n+add()\n+remove()',
                    type: 'default',
                    children: []
                }
            ]
        }
    });
    diagramEngine.register('composite-structure', diagram);
    diagram.render();
});
</script>

## Implementation

### Python - File System

```python
from abc import ABC, abstractmethod
from typing import List

class FileSystemComponent(ABC):
    def __init__(self, name: str):
        self.name = name
        self.parent = None

    @abstractmethod
    def get_size(self) -> int:
        pass

    @abstractmethod
    def display(self, indent: int = 0) -> None:
        pass

    def get_path(self) -> str:
        if self.parent:
            return f"{self.parent.get_path()}/{self.name}"
        return self.name


class File(FileSystemComponent):
    def __init__(self, name: str, size: int):
        super().__init__(name)
        self._size = size

    def get_size(self) -> int:
        return self._size

    def display(self, indent: int = 0) -> None:
        print(" " * indent + f"📄 {self.name} ({self._size} bytes)")


class Directory(FileSystemComponent):
    def __init__(self, name: str):
        super().__init__(name)
        self._children: List[FileSystemComponent] = []

    def add(self, component: FileSystemComponent) -> None:
        component.parent = self
        self._children.append(component)

    def remove(self, component: FileSystemComponent) -> None:
        component.parent = None
        self._children.remove(component)

    def get_children(self) -> List[FileSystemComponent]:
        return self._children

    def get_size(self) -> int:
        return sum(child.get_size() for child in self._children)

    def display(self, indent: int = 0) -> None:
        print(" " * indent + f"📁 {self.name}/")
        for child in self._children:
            child.display(indent + 2)

    def find(self, name: str) -> List[FileSystemComponent]:
        results = []
        for child in self._children:
            if child.name == name:
                results.append(child)
            if isinstance(child, Directory):
                results.extend(child.find(name))
        return results


# Usage
root = Directory("root")
home = Directory("home")
user = Directory("user")
documents = Directory("documents")

root.add(home)
home.add(user)
user.add(documents)

documents.add(File("resume.pdf", 102400))
documents.add(File("cover_letter.docx", 51200))

pictures = Directory("pictures")
user.add(pictures)
pictures.add(File("vacation.jpg", 2048000))
pictures.add(File("family.png", 1536000))

user.add(File(".bashrc", 1024))

root.display()
print(f"\nTotal size: {root.get_size()} bytes")
print(f"Path to resume: {documents.get_children()[0].get_path()}")
```

### Go - Menu System

```go
package main

import (
	"fmt"
	"strings"
)

// Component interface
type MenuComponent interface {
	GetName() string
	GetPrice() float64
	GetDescription() string
	IsVegetarian() bool
	Print(indent int)
}

// Leaf
type MenuItem struct {
	name        string
	description string
	vegetarian  bool
	price       float64
}

func NewMenuItem(name, description string, vegetarian bool, price float64) *MenuItem {
	return &MenuItem{
		name:        name,
		description: description,
		vegetarian:  vegetarian,
		price:       price,
	}
}

func (m *MenuItem) GetName() string        { return m.name }
func (m *MenuItem) GetPrice() float64      { return m.price }
func (m *MenuItem) GetDescription() string { return m.description }
func (m *MenuItem) IsVegetarian() bool     { return m.vegetarian }

func (m *MenuItem) Print(indent int) {
	prefix := strings.Repeat("  ", indent)
	veg := ""
	if m.vegetarian {
		veg = " (v)"
	}
	fmt.Printf("%s- %s%s: $%.2f\n", prefix, m.name, veg, m.price)
	fmt.Printf("%s  %s\n", prefix, m.description)
}

// Composite
type Menu struct {
	name        string
	description string
	children    []MenuComponent
}

func NewMenu(name, description string) *Menu {
	return &Menu{
		name:        name,
		description: description,
		children:    make([]MenuComponent, 0),
	}
}

func (m *Menu) Add(component MenuComponent) {
	m.children = append(m.children, component)
}

func (m *Menu) Remove(component MenuComponent) {
	for i, c := range m.children {
		if c == component {
			m.children = append(m.children[:i], m.children[i+1:]...)
			break
		}
	}
}

func (m *Menu) GetName() string        { return m.name }
func (m *Menu) GetDescription() string { return m.description }
func (m *Menu) IsVegetarian() bool     { return false }

func (m *Menu) GetPrice() float64 {
	total := 0.0
	for _, child := range m.children {
		total += child.GetPrice()
	}
	return total
}

func (m *Menu) Print(indent int) {
	prefix := strings.Repeat("  ", indent)
	fmt.Printf("%s📋 %s\n", prefix, m.name)
	fmt.Printf("%s   %s\n", prefix, m.description)
	fmt.Println()

	for _, child := range m.children {
		child.Print(indent + 1)
	}
}

// Iterator for vegetarian items
func (m *Menu) GetVegetarianItems() []*MenuItem {
	var items []*MenuItem
	for _, child := range m.children {
		switch c := child.(type) {
		case *MenuItem:
			if c.IsVegetarian() {
				items = append(items, c)
			}
		case *Menu:
			items = append(items, c.GetVegetarianItems()...)
		}
	}
	return items
}

func main() {
	// Create menus
	allMenus := NewMenu("All Menus", "Complete menu listing")

	breakfastMenu := NewMenu("Breakfast", "Start your day right")
	breakfastMenu.Add(NewMenuItem("Pancakes", "Fluffy with maple syrup", true, 8.99))
	breakfastMenu.Add(NewMenuItem("Bacon & Eggs", "Classic breakfast", false, 10.99))
	breakfastMenu.Add(NewMenuItem("Oatmeal", "With fresh berries", true, 6.99))

	lunchMenu := NewMenu("Lunch", "Midday favorites")
	lunchMenu.Add(NewMenuItem("Burger", "Angus beef patty", false, 12.99))
	lunchMenu.Add(NewMenuItem("Garden Salad", "Fresh vegetables", true, 9.99))

	// Nested menu
	dessertMenu := NewMenu("Desserts", "Sweet endings")
	dessertMenu.Add(NewMenuItem("Apple Pie", "With vanilla ice cream", true, 6.99))
	dessertMenu.Add(NewMenuItem("Cheesecake", "New York style", true, 7.99))

	lunchMenu.Add(dessertMenu)

	allMenus.Add(breakfastMenu)
	allMenus.Add(lunchMenu)

	// Print entire menu
	allMenus.Print(0)

	// Find vegetarian items
	fmt.Println("\n🥗 Vegetarian Options:")
	for _, item := range allMenus.GetVegetarianItems() {
		fmt.Printf("  - %s ($%.2f)\n", item.GetName(), item.GetPrice())
	}
}
```

### Python - UI Component Tree

```python
from abc import ABC, abstractmethod
from typing import List, Optional

class UIComponent(ABC):
    def __init__(self, id: str):
        self.id = id
        self.parent: Optional['Container'] = None

    @abstractmethod
    def render(self) -> str:
        pass

    @abstractmethod
    def get_bounding_box(self) -> dict:
        pass


class Label(UIComponent):
    def __init__(self, id: str, text: str):
        super().__init__(id)
        self.text = text

    def render(self) -> str:
        return f'<label id="{self.id}">{self.text}</label>'

    def get_bounding_box(self) -> dict:
        return {"width": len(self.text) * 8, "height": 20}


class Button(UIComponent):
    def __init__(self, id: str, text: str, on_click: str = ""):
        super().__init__(id)
        self.text = text
        self.on_click = on_click

    def render(self) -> str:
        return f'<button id="{self.id}" onclick="{self.on_click}">{self.text}</button>'

    def get_bounding_box(self) -> dict:
        return {"width": len(self.text) * 10 + 20, "height": 30}


class TextInput(UIComponent):
    def __init__(self, id: str, placeholder: str = ""):
        super().__init__(id)
        self.placeholder = placeholder

    def render(self) -> str:
        return f'<input id="{self.id}" type="text" placeholder="{self.placeholder}"/>'

    def get_bounding_box(self) -> dict:
        return {"width": 200, "height": 30}


class Container(UIComponent):
    def __init__(self, id: str, layout: str = "vertical"):
        super().__init__(id)
        self.layout = layout
        self.children: List[UIComponent] = []

    def add(self, component: UIComponent) -> 'Container':
        component.parent = self
        self.children.append(component)
        return self

    def remove(self, component: UIComponent) -> None:
        component.parent = None
        self.children.remove(component)

    def render(self) -> str:
        children_html = "\n  ".join(child.render() for child in self.children)
        return f'<div id="{self.id}" class="container-{self.layout}">\n  {children_html}\n</div>'

    def get_bounding_box(self) -> dict:
        if not self.children:
            return {"width": 0, "height": 0}

        boxes = [child.get_bounding_box() for child in self.children]

        if self.layout == "vertical":
            width = max(b["width"] for b in boxes)
            height = sum(b["height"] for b in boxes)
        else:  # horizontal
            width = sum(b["width"] for b in boxes)
            height = max(b["height"] for b in boxes)

        return {"width": width + 20, "height": height + 20}  # padding

    def find_by_id(self, id: str) -> Optional[UIComponent]:
        for child in self.children:
            if child.id == id:
                return child
            if isinstance(child, Container):
                found = child.find_by_id(id)
                if found:
                    return found
        return None


# Build a login form
form = Container("login-form", "vertical")
form.add(Label("title", "Login"))
form.add(TextInput("username", "Enter username"))
form.add(TextInput("password", "Enter password"))

button_group = Container("buttons", "horizontal")
button_group.add(Button("submit", "Login", "handleLogin()"))
button_group.add(Button("cancel", "Cancel", "handleCancel()"))
form.add(button_group)

print(form.render())
print(f"\nForm size: {form.get_bounding_box()}")
```

## Common Interview Questions

1. **When to use Composite?**
   - Tree structures
   - Part-whole hierarchies
   - Uniform treatment of objects

2. **Composite vs Decorator?**
   - Composite: Tree structure, multiple children
   - Decorator: Linear chain, single wrapped object

3. **How to handle type-specific operations?**
   - Visitor pattern
   - isinstance checks
   - Double dispatch

## Best Practices

1. **Keep interface simple** - Common operations only
2. **Child management** - In composite only
3. **Consider caching** - For computed properties
4. **Handle cycles** - Prevent infinite recursion
5. **Use iterators** - For traversal operations

## Related Patterns

- [Decorator](/topic/design-patterns/decorator) - Similar recursive structure
- [Iterator](/topic/design-patterns/iterator) - Traverse composite
- [Visitor](/topic/design-patterns/visitor) - Operations on composites
