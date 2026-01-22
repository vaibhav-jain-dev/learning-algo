# Composite Pattern

## Overview

The Composite pattern composes objects into tree structures to represent part-whole hierarchies. It lets clients treat individual objects (leaves) and compositions of objects (composites) uniformly through a common interface.

## Simple Explanation with Everyday Analogy

**The Corporate Organization Analogy**

Imagine a company's organizational structure. You have individual employees (developers, designers) and managers who oversee teams. Here's the key insight: when the CEO asks "What's the total salary budget?", the question works the same way whether asked to:
- An individual employee (returns their salary)
- A manager (returns sum of their team's salaries + their own)
- The entire company (returns everyone's salaries)

The Composite pattern lets you treat a single employee and an entire department the same way. You can call `getSalary()` on either, and the structure handles the complexity internally.

**Another Analogy: File System**

Your computer's file system is a perfect composite:
- **Files** are leaves - they have a size and can be opened
- **Folders** are composites - they contain files OR other folders
- Both respond to `getSize()` - a file returns its size, a folder returns the sum of everything inside

You can move, copy, or delete either a file or a folder using the same operations.

## Real Company Usage Examples

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #cbd5e1;">
  <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
    <div style="flex: 1; min-width: 200px; background: white; border-radius: 12px; padding: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
      <div style="font-weight: 700; color: #1e40af; margin-bottom: 0.5rem;">React Component Trees</div>
      <div style="font-size: 0.9rem; color: #475569;">React's virtual DOM is a composite structure. Components can contain other components or primitive elements, all implementing the same render interface.</div>
    </div>
    <div style="flex: 1; min-width: 200px; background: white; border-radius: 12px; padding: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
      <div style="font-weight: 700; color: #1e40af; margin-bottom: 0.5rem;">AWS CloudFormation</div>
      <div style="font-size: 0.9rem; color: #475569;">Stacks can contain resources or nested stacks. Operations like create/update/delete work uniformly across the hierarchy.</div>
    </div>
    <div style="flex: 1; min-width: 200px; background: white; border-radius: 12px; padding: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
      <div style="font-weight: 700; color: #1e40af; margin-bottom: 0.5rem;">Figma/Sketch Design Tools</div>
      <div style="font-size: 0.9rem; color: #475569;">Groups contain shapes or other groups. Transform operations (move, scale, rotate) work identically on single shapes or complex groups.</div>
    </div>
    <div style="flex: 1; min-width: 200px; background: white; border-radius: 12px; padding: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
      <div style="font-weight: 700; color: #1e40af; margin-bottom: 0.5rem;">E-commerce Product Bundles</div>
      <div style="font-size: 0.9rem; color: #475569;">Amazon uses composite for product bundles. A bundle contains products or sub-bundles, all supporting getPrice() and addToCart().</div>
    </div>
  </div>
</div>

## Pattern Structure

<div style="background: linear-gradient(135deg, #f8fafc 0%, #dbeafe 100%); border-radius: 16px; padding: 2rem; margin: 1.5rem 0; border: 1px solid #bfdbfe;">
  <div style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
    <div style="background: white; border: 2px solid #3b82f6; border-radius: 12px; padding: 1.25rem 2rem; text-align: center; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);">
      <div style="font-weight: 700; color: #1e40af; font-size: 1.1rem;">Component</div>
      <div style="font-size: 0.85rem; color: #64748b; font-style: italic;">interface</div>
      <div style="border-top: 1px solid #e2e8f0; margin-top: 0.75rem; padding-top: 0.75rem; font-size: 0.9rem; color: #334155; font-family: monospace;">
        + operation()<br>
        + add(Component)<br>
        + remove(Component)<br>
        + getChild(int)
      </div>
    </div>
    <div style="color: #3b82f6; font-size: 1.5rem;">|</div>
    <div style="display: flex; gap: 3rem; flex-wrap: wrap; justify-content: center;">
      <div style="background: white; border: 2px solid #22c55e; border-radius: 12px; padding: 1.25rem 2rem; text-align: center; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15);">
        <div style="font-weight: 700; color: #166534; font-size: 1.05rem;">Leaf</div>
        <div style="border-top: 1px solid #dcfce7; margin-top: 0.75rem; padding-top: 0.75rem; font-size: 0.9rem; color: #334155; font-family: monospace;">
          + operation()
        </div>
        <div style="font-size: 0.8rem; color: #6b7280; margin-top: 0.5rem; font-style: italic;">No children</div>
      </div>
      <div style="background: white; border: 2px solid #f59e0b; border-radius: 12px; padding: 1.25rem 2rem; text-align: center; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.15);">
        <div style="font-weight: 700; color: #92400e; font-size: 1.05rem;">Composite</div>
        <div style="border-top: 1px solid #fef3c7; margin-top: 0.75rem; padding-top: 0.75rem; font-size: 0.9rem; color: #334155; font-family: monospace;">
          - children: Component[]<br>
          + operation()<br>
          + add(Component)<br>
          + remove(Component)
        </div>
        <div style="font-size: 0.8rem; color: #6b7280; margin-top: 0.5rem; font-style: italic;">Delegates to children</div>
      </div>
    </div>
  </div>
</div>

## When to Use

<div style="background: linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%); border-radius: 12px; padding: 1.25rem; margin: 1rem 0; border: 1px solid #bbf7d0;">
  <div style="font-weight: 600; color: #166534; margin-bottom: 0.75rem;">Use Composite When:</div>
  <ul style="margin: 0; padding-left: 1.25rem; color: #15803d;">
    <li>You need to represent <strong>part-whole hierarchies</strong> of objects</li>
    <li>Clients should <strong>treat individual and composite objects uniformly</strong></li>
    <li>You have <strong>recursive tree structures</strong> (files/folders, menus, UI components)</li>
    <li>Operations should <strong>propagate through the structure</strong> (calculate total, render all)</li>
    <li>You want to <strong>add new component types</strong> without changing client code</li>
  </ul>
</div>

## Anti-Patterns to Avoid

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%); border-radius: 12px; padding: 1.25rem; margin: 1rem 0; border: 1px solid #fecaca;">
  <div style="font-weight: 600; color: #dc2626; margin-bottom: 0.75rem;">Avoid These Mistakes:</div>
  <ul style="margin: 0; padding-left: 1.25rem; color: #b91c1c;">
    <li><strong>Overly general interfaces</strong> - Don't force leaves to implement add/remove methods</li>
    <li><strong>Ignoring type safety</strong> - Adding incompatible children to composites</li>
    <li><strong>Circular references</strong> - A composite containing itself causes infinite loops</li>
    <li><strong>Leaking implementation</strong> - Client code checking instanceof breaks uniformity</li>
    <li><strong>Missing parent references</strong> - Makes traversal and deletion difficult</li>
  </ul>
</div>

## Implementation

### Python - File System Example

```python
from abc import ABC, abstractmethod
from typing import List, Optional, Iterator
from datetime import datetime

class FileSystemComponent(ABC):
    """Component interface for file system elements"""

    def __init__(self, name: str):
        self.name = name
        self.parent: Optional['Directory'] = None
        self.created_at = datetime.now()

    @abstractmethod
    def get_size(self) -> int:
        """Returns size in bytes"""
        pass

    @abstractmethod
    def display(self, indent: int = 0) -> None:
        """Display the component structure"""
        pass

    @abstractmethod
    def search(self, query: str) -> List['FileSystemComponent']:
        """Search for components matching query"""
        pass

    def get_path(self) -> str:
        """Get full path from root"""
        if self.parent:
            return f"{self.parent.get_path()}/{self.name}"
        return self.name

    def move_to(self, new_parent: 'Directory') -> None:
        """Move component to new parent"""
        if self.parent:
            self.parent.remove(self)
        new_parent.add(self)


class File(FileSystemComponent):
    """Leaf: represents a file"""

    def __init__(self, name: str, size: int, content: str = ""):
        super().__init__(name)
        self._size = size
        self.content = content

    def get_size(self) -> int:
        return self._size

    def display(self, indent: int = 0) -> None:
        prefix = "  " * indent
        size_kb = self._size / 1024
        print(f"{prefix}[File] {self.name} ({size_kb:.1f} KB)")

    def search(self, query: str) -> List[FileSystemComponent]:
        if query.lower() in self.name.lower():
            return [self]
        return []

    def read(self) -> str:
        return self.content

    def write(self, content: str) -> None:
        self.content = content
        self._size = len(content.encode())


class Directory(FileSystemComponent):
    """Composite: represents a directory containing files or other directories"""

    def __init__(self, name: str):
        super().__init__(name)
        self._children: List[FileSystemComponent] = []

    def add(self, component: FileSystemComponent) -> 'Directory':
        """Add a child component"""
        if component.parent:
            component.parent.remove(component)
        component.parent = self
        self._children.append(component)
        return self  # Enable chaining

    def remove(self, component: FileSystemComponent) -> None:
        """Remove a child component"""
        if component in self._children:
            component.parent = None
            self._children.remove(component)

    def get_children(self) -> List[FileSystemComponent]:
        return self._children.copy()

    def get_size(self) -> int:
        """Recursively calculate total size"""
        return sum(child.get_size() for child in self._children)

    def display(self, indent: int = 0) -> None:
        prefix = "  " * indent
        size_mb = self.get_size() / (1024 * 1024)
        print(f"{prefix}[Dir] {self.name}/ ({size_mb:.2f} MB)")
        for child in self._children:
            child.display(indent + 1)

    def search(self, query: str) -> List[FileSystemComponent]:
        """Recursively search all children"""
        results = []
        if query.lower() in self.name.lower():
            results.append(self)
        for child in self._children:
            results.extend(child.search(query))
        return results

    def __iter__(self) -> Iterator[FileSystemComponent]:
        """Iterate over all descendants"""
        for child in self._children:
            yield child
            if isinstance(child, Directory):
                yield from child

    def count_files(self) -> int:
        """Count total files in hierarchy"""
        count = 0
        for child in self._children:
            if isinstance(child, File):
                count += 1
            elif isinstance(child, Directory):
                count += child.count_files()
        return count


# Example Usage
def main():
    # Create file system structure
    root = Directory("home")

    # Create subdirectories
    documents = Directory("documents")
    projects = Directory("projects")
    photos = Directory("photos")

    # Build the tree
    root.add(documents).add(projects).add(photos)

    # Add files to documents
    documents.add(File("resume.pdf", 102400, "PDF content"))
    documents.add(File("notes.txt", 2048, "Meeting notes..."))

    # Create nested project structure
    webapp = Directory("webapp")
    projects.add(webapp)
    webapp.add(File("index.html", 4096, "<html>...</html>"))
    webapp.add(File("app.js", 8192, "const app = ..."))
    webapp.add(File("style.css", 2048, "body { ... }"))

    # Add photos
    photos.add(File("vacation.jpg", 2048000, "[JPEG data]"))
    photos.add(File("family.png", 1536000, "[PNG data]"))

    # Display entire structure
    print("File System Structure:")
    print("-" * 40)
    root.display()

    # Uniform operations on any component
    print(f"\nTotal size: {root.get_size() / (1024*1024):.2f} MB")
    print(f"Documents size: {documents.get_size() / 1024:.1f} KB")
    print(f"Total files: {root.count_files()}")

    # Search works uniformly
    print("\nSearch for 'app':")
    for result in root.search("app"):
        print(f"  Found: {result.get_path()}")


if __name__ == "__main__":
    main()
```

### Go - Organization Hierarchy Example

```go
package main

import (
	"fmt"
	"strings"
)

// Component interface
type Employee interface {
	GetName() string
	GetSalary() float64
	GetDetails() string
	Display(indent int)
}

// Leaf: Individual contributor
type Developer struct {
	Name     string
	Salary   float64
	Language string
}

func NewDeveloper(name string, salary float64, language string) *Developer {
	return &Developer{Name: name, Salary: salary, Language: language}
}

func (d *Developer) GetName() string    { return d.Name }
func (d *Developer) GetSalary() float64 { return d.Salary }

func (d *Developer) GetDetails() string {
	return fmt.Sprintf("%s (Developer - %s)", d.Name, d.Language)
}

func (d *Developer) Display(indent int) {
	prefix := strings.Repeat("  ", indent)
	fmt.Printf("%s[Dev] %s - $%.0f (%s)\n", prefix, d.Name, d.Salary, d.Language)
}

// Leaf: Designer
type Designer struct {
	Name      string
	Salary    float64
	Specialty string
}

func NewDesigner(name string, salary float64, specialty string) *Designer {
	return &Designer{Name: name, Salary: salary, Specialty: specialty}
}

func (d *Designer) GetName() string    { return d.Name }
func (d *Designer) GetSalary() float64 { return d.Salary }

func (d *Designer) GetDetails() string {
	return fmt.Sprintf("%s (Designer - %s)", d.Name, d.Specialty)
}

func (d *Designer) Display(indent int) {
	prefix := strings.Repeat("  ", indent)
	fmt.Printf("%s[Des] %s - $%.0f (%s)\n", prefix, d.Name, d.Salary, d.Specialty)
}

// Composite: Manager with team
type Manager struct {
	Name     string
	Salary   float64
	Title    string
	team     []Employee
}

func NewManager(name string, salary float64, title string) *Manager {
	return &Manager{
		Name:   name,
		Salary: salary,
		Title:  title,
		team:   make([]Employee, 0),
	}
}

func (m *Manager) GetName() string { return m.Name }

func (m *Manager) GetSalary() float64 {
	total := m.Salary
	for _, member := range m.team {
		total += member.GetSalary()
	}
	return total
}

func (m *Manager) GetDetails() string {
	return fmt.Sprintf("%s (%s, Team: %d)", m.Name, m.Title, len(m.team))
}

func (m *Manager) Add(employee Employee) *Manager {
	m.team = append(m.team, employee)
	return m // Enable chaining
}

func (m *Manager) Remove(employee Employee) {
	for i, e := range m.team {
		if e == employee {
			m.team = append(m.team[:i], m.team[i+1:]...)
			break
		}
	}
}

func (m *Manager) GetTeam() []Employee {
	return m.team
}

func (m *Manager) Display(indent int) {
	prefix := strings.Repeat("  ", indent)
	fmt.Printf("%s[Mgr] %s (%s) - Team Budget: $%.0f\n",
		prefix, m.Name, m.Title, m.GetSalary())
	for _, member := range m.team {
		member.Display(indent + 1)
	}
}

func (m *Manager) CountEmployees() int {
	count := 1 // Count self
	for _, member := range m.team {
		if mgr, ok := member.(*Manager); ok {
			count += mgr.CountEmployees()
		} else {
			count++
		}
	}
	return count
}

func main() {
	// Build organization structure
	ceo := NewManager("Alice", 250000, "CEO")

	// Engineering department
	vpEng := NewManager("Bob", 180000, "VP Engineering")

	teamLead := NewManager("Carol", 150000, "Tech Lead")
	teamLead.Add(NewDeveloper("Dave", 120000, "Go"))
	teamLead.Add(NewDeveloper("Eve", 115000, "Python"))
	teamLead.Add(NewDeveloper("Frank", 110000, "JavaScript"))

	vpEng.Add(teamLead)
	vpEng.Add(NewDeveloper("Grace", 130000, "Rust")) // Direct report

	// Design department
	vpDesign := NewManager("Henry", 160000, "VP Design")
	vpDesign.Add(NewDesigner("Ivy", 100000, "UX"))
	vpDesign.Add(NewDesigner("Jack", 95000, "UI"))

	// Build hierarchy
	ceo.Add(vpEng)
	ceo.Add(vpDesign)

	// Display organization
	fmt.Println("Organization Structure:")
	fmt.Println(strings.Repeat("=", 50))
	ceo.Display(0)

	// Uniform operations work at any level
	fmt.Println("\nBudget Analysis:")
	fmt.Println(strings.Repeat("-", 50))
	fmt.Printf("Total Company Budget: $%.0f\n", ceo.GetSalary())
	fmt.Printf("Engineering Budget: $%.0f\n", vpEng.GetSalary())
	fmt.Printf("Design Budget: $%.0f\n", vpDesign.GetSalary())
	fmt.Printf("Carol's Team Budget: $%.0f\n", teamLead.GetSalary())

	fmt.Printf("\nTotal Employees: %d\n", ceo.CountEmployees())
}
```

## Interview Questions with Answers

<div style="background: linear-gradient(135deg, #f8fafc 0%, #dbeafe 100%); border-radius: 12px; padding: 1.5rem; margin: 1rem 0; border: 1px solid #bfdbfe;">

**Q1: When would you choose Composite over a simple list/array?**

Use Composite when you have **hierarchical relationships** where operations need to propagate through levels. A simple list works for flat collections, but Composite handles:
- Variable depth (folders within folders)
- Uniform operations at any level
- Part-whole semantics (a team IS a group of employees)

**Q2: How do you handle operations that only make sense for leaves or composites?**

Three approaches:
1. **Transparency**: Define all operations in Component interface, leaves throw exceptions for child operations (React uses this)
2. **Safety**: Only define common operations in Component, use type checks when needed (more type-safe)
3. **Visitor pattern**: Move operations to visitors, let the structure dispatch appropriately

**Q3: How do you prevent circular references in a Composite?**

```python
def add(self, component):
    # Check for cycles
    ancestor = self.parent
    while ancestor:
        if ancestor is component:
            raise ValueError("Cannot add ancestor as child")
        ancestor = ancestor.parent
    # Safe to add
    self._children.append(component)
```

**Q4: How does Composite relate to the Visitor pattern?**

Visitor is often used WITH Composite to add operations without modifying the tree classes. The Composite provides structure traversal, the Visitor provides operations:

```python
class SizeCalculator(Visitor):
    def visit_file(self, file): return file.size
    def visit_directory(self, dir):
        return sum(child.accept(self) for child in dir.children)
```

**Q5: What's the time complexity of operations on a Composite?**

- **Traversal**: O(n) where n = total nodes
- **Search**: O(n) worst case
- **Add/Remove**: O(1) for direct children, O(n) for search + add
- **getSize()**: O(n) without caching, O(1) with cached values

</div>

## Quick Reference Card

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 1.5rem; margin: 1rem 0; border: 1px solid #bbf7d0;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
    <div>
      <div style="font-weight: 700; color: #166534; margin-bottom: 0.5rem;">Intent</div>
      <div style="font-size: 0.9rem; color: #15803d;">Compose objects into tree structures; treat individuals and groups uniformly</div>
    </div>
    <div>
      <div style="font-weight: 700; color: #166534; margin-bottom: 0.5rem;">Key Participants</div>
      <div style="font-size: 0.9rem; color: #15803d;">Component (interface), Leaf (no children), Composite (has children)</div>
    </div>
    <div>
      <div style="font-weight: 700; color: #166534; margin-bottom: 0.5rem;">Common Methods</div>
      <div style="font-size: 0.9rem; color: #15803d; font-family: monospace;">operation(), add(), remove(), getChild(), getParent()</div>
    </div>
    <div>
      <div style="font-weight: 700; color: #166534; margin-bottom: 0.5rem;">Related Patterns</div>
      <div style="font-size: 0.9rem; color: #15803d;">Decorator (similar structure), Iterator (traversal), Visitor (operations)</div>
    </div>
  </div>
</div>

## Best Practices

1. **Keep the interface minimal** - Only include operations common to all components
2. **Use parent references** - Makes traversal and restructuring easier
3. **Consider caching** - Cache computed values like total size for performance
4. **Implement iterators** - Make traversal convenient for clients
5. **Handle cycles defensively** - Validate before adding children
6. **Document child constraints** - Some composites may only accept certain types

## Related Patterns

- [Decorator](/topic/design-patterns/decorator) - Similar recursive structure, but for adding responsibilities
- [Iterator](/topic/design-patterns/iterator) - Traverse composite structures
- [Visitor](/topic/design-patterns/visitor) - Add operations to composites without modifying them
- [Chain of Responsibility](/topic/design-patterns/chain-of-responsibility) - Can follow parent chain in composite
