# Visitor Pattern

## Overview

The Visitor pattern lets you separate algorithms from the objects on which they operate. It allows adding new operations to existing object structures without modifying those structures.

## Key Concepts

### When to Use

- Perform operations on elements of complex structure
- Many distinct operations needed on object structure
- Classes rarely change but operations change often
- Avoid polluting classes with unrelated operations

## Implementation

### Python

```python
from abc import ABC, abstractmethod
from typing import List
from dataclasses import dataclass


# Element interface
class Shape(ABC):
    @abstractmethod
    def accept(self, visitor: 'ShapeVisitor'):
        pass


# Concrete Elements
@dataclass
class Circle(Shape):
    x: float
    y: float
    radius: float

    def accept(self, visitor: 'ShapeVisitor'):
        return visitor.visit_circle(self)


@dataclass
class Rectangle(Shape):
    x: float
    y: float
    width: float
    height: float

    def accept(self, visitor: 'ShapeVisitor'):
        return visitor.visit_rectangle(self)


@dataclass
class Triangle(Shape):
    x1: float
    y1: float
    x2: float
    y2: float
    x3: float
    y3: float

    def accept(self, visitor: 'ShapeVisitor'):
        return visitor.visit_triangle(self)


# Visitor interface
class ShapeVisitor(ABC):
    @abstractmethod
    def visit_circle(self, circle: Circle):
        pass

    @abstractmethod
    def visit_rectangle(self, rectangle: Rectangle):
        pass

    @abstractmethod
    def visit_triangle(self, triangle: Triangle):
        pass


# Concrete Visitors
class AreaCalculator(ShapeVisitor):
    def visit_circle(self, circle: Circle) -> float:
        import math
        return math.pi * circle.radius ** 2

    def visit_rectangle(self, rectangle: Rectangle) -> float:
        return rectangle.width * rectangle.height

    def visit_triangle(self, triangle: Triangle) -> float:
        # Using cross product formula
        return abs(
            (triangle.x1 * (triangle.y2 - triangle.y3) +
             triangle.x2 * (triangle.y3 - triangle.y1) +
             triangle.x3 * (triangle.y1 - triangle.y2)) / 2
        )


class PerimeterCalculator(ShapeVisitor):
    def visit_circle(self, circle: Circle) -> float:
        import math
        return 2 * math.pi * circle.radius

    def visit_rectangle(self, rectangle: Rectangle) -> float:
        return 2 * (rectangle.width + rectangle.height)

    def visit_triangle(self, triangle: Triangle) -> float:
        import math

        def distance(x1, y1, x2, y2):
            return math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

        return (distance(triangle.x1, triangle.y1, triangle.x2, triangle.y2) +
                distance(triangle.x2, triangle.y2, triangle.x3, triangle.y3) +
                distance(triangle.x3, triangle.y3, triangle.x1, triangle.y1))


class DrawingExporter(ShapeVisitor):
    def visit_circle(self, circle: Circle) -> str:
        return f"<circle cx='{circle.x}' cy='{circle.y}' r='{circle.radius}'/>"

    def visit_rectangle(self, rectangle: Rectangle) -> str:
        return (f"<rect x='{rectangle.x}' y='{rectangle.y}' "
                f"width='{rectangle.width}' height='{rectangle.height}'/>")

    def visit_triangle(self, triangle: Triangle) -> str:
        points = f"{triangle.x1},{triangle.y1} {triangle.x2},{triangle.y2} {triangle.x3},{triangle.y3}"
        return f"<polygon points='{points}'/>"


# Real-world example: AST Visitor
class ASTNode(ABC):
    @abstractmethod
    def accept(self, visitor: 'ASTVisitor'):
        pass


class NumberNode(ASTNode):
    def __init__(self, value: float):
        self.value = value

    def accept(self, visitor: 'ASTVisitor'):
        return visitor.visit_number(self)


class BinaryOpNode(ASTNode):
    def __init__(self, op: str, left: ASTNode, right: ASTNode):
        self.op = op
        self.left = left
        self.right = right

    def accept(self, visitor: 'ASTVisitor'):
        return visitor.visit_binary_op(self)


class UnaryOpNode(ASTNode):
    def __init__(self, op: str, operand: ASTNode):
        self.op = op
        self.operand = operand

    def accept(self, visitor: 'ASTVisitor'):
        return visitor.visit_unary_op(self)


class ASTVisitor(ABC):
    @abstractmethod
    def visit_number(self, node: NumberNode):
        pass

    @abstractmethod
    def visit_binary_op(self, node: BinaryOpNode):
        pass

    @abstractmethod
    def visit_unary_op(self, node: UnaryOpNode):
        pass


class Evaluator(ASTVisitor):
    def visit_number(self, node: NumberNode) -> float:
        return node.value

    def visit_binary_op(self, node: BinaryOpNode) -> float:
        left = node.left.accept(self)
        right = node.right.accept(self)
        ops = {
            '+': lambda a, b: a + b,
            '-': lambda a, b: a - b,
            '*': lambda a, b: a * b,
            '/': lambda a, b: a / b,
        }
        return ops[node.op](left, right)

    def visit_unary_op(self, node: UnaryOpNode) -> float:
        operand = node.operand.accept(self)
        if node.op == '-':
            return -operand
        return operand


class PrettyPrinter(ASTVisitor):
    def visit_number(self, node: NumberNode) -> str:
        return str(node.value)

    def visit_binary_op(self, node: BinaryOpNode) -> str:
        left = node.left.accept(self)
        right = node.right.accept(self)
        return f"({left} {node.op} {right})"

    def visit_unary_op(self, node: UnaryOpNode) -> str:
        operand = node.operand.accept(self)
        return f"({node.op}{operand})"


# Usage
print("=== Shape Visitor ===")
shapes: List[Shape] = [
    Circle(0, 0, 5),
    Rectangle(0, 0, 10, 5),
    Triangle(0, 0, 4, 0, 2, 3)
]

area_calc = AreaCalculator()
perim_calc = PerimeterCalculator()
exporter = DrawingExporter()

for shape in shapes:
    print(f"{shape.__class__.__name__}:")
    print(f"  Area: {shape.accept(area_calc):.2f}")
    print(f"  Perimeter: {shape.accept(perim_calc):.2f}")
    print(f"  SVG: {shape.accept(exporter)}")

print("\n=== AST Visitor ===")
# Expression: (3 + 4) * (-2)
ast = BinaryOpNode('*',
    BinaryOpNode('+', NumberNode(3), NumberNode(4)),
    UnaryOpNode('-', NumberNode(2))
)

evaluator = Evaluator()
printer = PrettyPrinter()

print(f"Expression: {ast.accept(printer)}")
print(f"Result: {ast.accept(evaluator)}")
```

### Go

```go
package main

import (
	"fmt"
	"math"
)

// Element interface
type Shape interface {
	Accept(visitor ShapeVisitor) interface{}
}

// Concrete elements
type Circle struct {
	X, Y, Radius float64
}

func (c *Circle) Accept(visitor ShapeVisitor) interface{} {
	return visitor.VisitCircle(c)
}

type Rectangle struct {
	X, Y, Width, Height float64
}

func (r *Rectangle) Accept(visitor ShapeVisitor) interface{} {
	return visitor.VisitRectangle(r)
}

type Triangle struct {
	X1, Y1, X2, Y2, X3, Y3 float64
}

func (t *Triangle) Accept(visitor ShapeVisitor) interface{} {
	return visitor.VisitTriangle(t)
}

// Visitor interface
type ShapeVisitor interface {
	VisitCircle(c *Circle) interface{}
	VisitRectangle(r *Rectangle) interface{}
	VisitTriangle(t *Triangle) interface{}
}

// Concrete visitors
type AreaCalculator struct{}

func (a *AreaCalculator) VisitCircle(c *Circle) interface{} {
	return math.Pi * c.Radius * c.Radius
}

func (a *AreaCalculator) VisitRectangle(r *Rectangle) interface{} {
	return r.Width * r.Height
}

func (a *AreaCalculator) VisitTriangle(t *Triangle) interface{} {
	return math.Abs((t.X1*(t.Y2-t.Y3) + t.X2*(t.Y3-t.Y1) + t.X3*(t.Y1-t.Y2)) / 2)
}

type PerimeterCalculator struct{}

func (p *PerimeterCalculator) VisitCircle(c *Circle) interface{} {
	return 2 * math.Pi * c.Radius
}

func (p *PerimeterCalculator) VisitRectangle(r *Rectangle) interface{} {
	return 2 * (r.Width + r.Height)
}

func (p *PerimeterCalculator) VisitTriangle(t *Triangle) interface{} {
	distance := func(x1, y1, x2, y2 float64) float64 {
		return math.Sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1))
	}
	return distance(t.X1, t.Y1, t.X2, t.Y2) +
		distance(t.X2, t.Y2, t.X3, t.Y3) +
		distance(t.X3, t.Y3, t.X1, t.Y1)
}

type SVGExporter struct{}

func (e *SVGExporter) VisitCircle(c *Circle) interface{} {
	return fmt.Sprintf("<circle cx='%.1f' cy='%.1f' r='%.1f'/>", c.X, c.Y, c.Radius)
}

func (e *SVGExporter) VisitRectangle(r *Rectangle) interface{} {
	return fmt.Sprintf("<rect x='%.1f' y='%.1f' width='%.1f' height='%.1f'/>",
		r.X, r.Y, r.Width, r.Height)
}

func (e *SVGExporter) VisitTriangle(t *Triangle) interface{} {
	return fmt.Sprintf("<polygon points='%.1f,%.1f %.1f,%.1f %.1f,%.1f'/>",
		t.X1, t.Y1, t.X2, t.Y2, t.X3, t.Y3)
}

func main() {
	shapes := []Shape{
		&Circle{0, 0, 5},
		&Rectangle{0, 0, 10, 5},
		&Triangle{0, 0, 4, 0, 2, 3},
	}

	areaCalc := &AreaCalculator{}
	perimCalc := &PerimeterCalculator{}
	exporter := &SVGExporter{}

	for _, shape := range shapes {
		fmt.Printf("%T:\n", shape)
		fmt.Printf("  Area: %.2f\n", shape.Accept(areaCalc))
		fmt.Printf("  Perimeter: %.2f\n", shape.Accept(perimCalc))
		fmt.Printf("  SVG: %s\n", shape.Accept(exporter))
	}
}
```

## Double Dispatch

Visitor uses double dispatch to select the correct method:
1. First dispatch: `element.accept(visitor)` - selects element type
2. Second dispatch: `visitor.visitX(this)` - selects visitor method

## Best Practices

1. **Open/Closed** - Add operations without modifying elements
2. **Accumulating state** - Visitors can accumulate results
3. **Breaking encapsulation** - Elements may need to expose internals
4. **Consider alternatives** - For simple cases, use polymorphism

## Related Patterns

- [Iterator](/topic/design-patterns/iterator) - Traverse structure
- [Composite](/topic/design-patterns/composite) - Often visited
- [Strategy](/topic/design-patterns/strategy) - Alternative for single operation
