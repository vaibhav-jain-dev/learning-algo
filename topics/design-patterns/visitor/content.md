# Visitor Pattern

## Overview

The Visitor pattern separates algorithms from the object structures they operate on, enabling new operations to be added without modifying element classes. It achieves **double dispatch** in single-dispatch languages by combining dynamic binding on both the element type and visitor type through a clever two-step invocation protocol.

**Difficulty:** Advanced
**Category:** Behavioral Pattern
**Also Known As:** Double Dispatch, External Polymorphism

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 2px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem; border-bottom: 2px solid #cbd5e1; padding-bottom: 0.75rem; color: #1e293b;">Core Insight</div>
<div style="line-height: 1.7; color: #475569;">
    The Visitor pattern inverts the traditional OOP approach. Instead of placing behavior inside objects, it extracts behavior into external visitor objects. This trades the Open-Closed Principle in one dimension (easy to add operations) for violating it in another (hard to add element types).
</div>
</div>

---

## The Double Dispatch Mechanism

### Why Single Dispatch Falls Short

Most object-oriented languages use **single dispatch**: the method called depends only on the runtime type of the receiver object, not on the runtime types of arguments.

<div style="background: #fef3c7; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #f59e0b;">
<div style="font-weight: 700; color: #92400e; margin-bottom: 0.75rem;">The Dispatch Problem</div>
<div style="color: #78350f; line-height: 1.7;">
When you call <code>process(element)</code>, the method selected depends on the static (compile-time) type of <code>element</code>, not its actual runtime type. Method overloading is resolved at compile time, not runtime. This means you cannot simply overload methods and expect runtime type-based dispatch.
</div>
</div>

```python
# This DOES NOT work as expected in Python/Java/C++
class Processor:
    def process(self, element: Circle):
        print("Processing circle")

    def process(self, element: Square):
        print("Processing square")

# At runtime, Python sees only the last definition
# Java/C++ resolve based on DECLARED type, not runtime type
processor = Processor()
shape: Shape = Circle()  # Declared as Shape, actually Circle
processor.process(shape)  # Calls Shape overload, not Circle!
```

### The Double Dispatch Solution

The Visitor pattern achieves runtime dispatch on both types through a **two-step protocol**:

<div style="background: #f8fafc; border-radius: 12px; padding: 2rem; margin: 2rem 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 1.1rem; color: #1e293b; margin-bottom: 1.5rem; text-align: center;">Double Dispatch Execution Flow</div>
<div style="display: flex; flex-direction: column; gap: 1rem;">
<div style="display: flex; align-items: center; gap: 1rem;">
<div style="background: #3b82f6; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">1</div>
<div style="background: #dbeafe; border-radius: 8px; padding: 1rem; flex: 1; border: 1px solid #93c5fd;">
<div style="font-weight: 600; color: #1e40af;">Client calls element.accept(visitor)</div>
<div style="color: #1e40af; font-size: 0.9rem; margin-top: 0.25rem;">First dispatch: selects accept() based on element's runtime type</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 1rem;">
<div style="background: #22c55e; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">2</div>
<div style="background: #dcfce7; border-radius: 8px; padding: 1rem; flex: 1; border: 1px solid #86efac;">
<div style="font-weight: 600; color: #166534;">Element calls visitor.visitX(this)</div>
<div style="color: #166534; font-size: 0.9rem; margin-top: 0.25rem;">Second dispatch: selects visitX() based on visitor's runtime type</div>
</div>
</div>
<div style="display: flex; align-items: center; gap: 1rem;">
<div style="background: #a855f7; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">3</div>
<div style="background: #f3e8ff; border-radius: 8px; padding: 1rem; flex: 1; border: 1px solid #d8b4fe;">
<div style="font-weight: 600; color: #7c3aed;">Correct method executes for both types</div>
<div style="color: #7c3aed; font-size: 0.9rem; margin-top: 0.25rem;">The "this" reference carries the concrete element type statically</div>
</div>
</div>
</div>
</div>

### The Critical Role of "this"

The key insight is that inside a method, `this` (or `self`) has a **static type** equal to the class where the method is defined. When `CircleElement.accept()` calls `visitor.visitCircle(this)`, the compiler knows `this` is exactly a `CircleElement`, not just some `Element`.

```python
class CircleElement(Element):
    def accept(self, visitor: ShapeVisitor) -> Any:
        # Here, 'self' is statically typed as CircleElement
        # The compiler/interpreter knows to call visitCircle, not visitElement
        return visitor.visit_circle(self)  # self is CircleElement, not Element
```

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #ef4444;">
<div style="font-weight: 700; color: #991b1b; margin-bottom: 0.75rem;">Critical Assumption</div>
<div style="color: #7f1d1d; line-height: 1.7;">
Double dispatch assumes <strong>static overload resolution</strong>. In languages with full multiple dispatch (like Julia or Common Lisp CLOS), the Visitor pattern is unnecessary because the language natively dispatches on all argument types at runtime.
</div>
</div>

### Interview Deep Dive: Double Dispatch

<div style="background: #eff6ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #bfdbfe;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 1rem;">Level 1: What is double dispatch and why do we need it?</div>
<div style="color: #1e3a8a; line-height: 1.7; margin-bottom: 1rem;">
    Double dispatch selects a method based on the runtime types of two objects: the receiver and one argument. Most OO languages only dispatch on the receiver type (single dispatch). We need it when behavior depends on combinations of types, such as collision detection between different shape pairs or applying different operations to different element types.
</div>

<div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.75rem;">Level 2: How does the Visitor pattern simulate true multiple dispatch?</div>
<div style="color: #1e3a8a; line-height: 1.7; margin-bottom: 1rem;">
It chains two single-dispatch calls. The first call <code>element.accept(visitor)</code> dispatches on the element's runtime type. Inside <code>accept()</code>, the call to <code>visitor.visitX(this)</code> dispatches on the visitor's runtime type. The trick is that <code>this</code> has a known static type inside each concrete element class, so the correct <code>visitX</code> overload is selected at compile time. This simulates runtime dispatch on both types.
</div>

<div style="background: #bfdbfe; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.75rem;">Level 3: What are the limitations of simulated double dispatch vs. true multiple dispatch?</div>
<div style="color: #1e3a8a; line-height: 1.7;">
<strong>Combinatorial explosion:</strong> True multiple dispatch can handle n types with n methods; simulated double dispatch requires n*m methods for n element types and m visitors. <strong>Asymmetric extension:</strong> Adding visitors is easy, but adding elements requires modifying all visitors. <strong>No dynamic discovery:</strong> Unlike true multiple dispatch which uses runtime type lookup, Visitor bakes the dispatch table into the class hierarchy at compile time. <strong>Two-hop overhead:</strong> Two virtual calls instead of one direct dispatch lookup.
</div>
</div>
</div>
</div>

---

## Element Hierarchy Traversal

### Traversal Responsibility

A critical design decision is **who controls traversal**: the visitor, the elements, or an external iterator? Each approach has distinct implications.

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 1rem;">Traversal Strategies Comparison</div>
<table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
<tr style="background: #e2e8f0;">
<th style="padding: 0.75rem; text-align: left; border: 1px solid #cbd5e1;">Strategy</th>
<th style="padding: 0.75rem; text-align: left; border: 1px solid #cbd5e1;">Description</th>
<th style="padding: 0.75rem; text-align: left; border: 1px solid #cbd5e1;">Trade-offs</th>
</tr>
<tr>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; font-weight: 600;">Visitor-controlled</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1;">Visitor explicitly calls accept on children</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1;">Maximum flexibility, but visitors must know structure</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; font-weight: 600;">Element-controlled</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1;">Element's accept() visits its children</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1;">Encapsulates structure, but less control over order</td>
</tr>
<tr>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; font-weight: 600;">External iterator</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1;">Separate iterator drives traversal</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1;">Clean separation, but adds complexity</td>
</tr>
</table>
</div>

### Visitor-Controlled Traversal

The visitor explicitly navigates the structure, calling `accept()` on children as needed:

```python
class TreeVisitor(ABC):
    @abstractmethod
    def visit_leaf(self, leaf: 'Leaf') -> Any:
        pass

    @abstractmethod
    def visit_composite(self, composite: 'Composite') -> Any:
        pass

class DepthFirstPrinter(TreeVisitor):
    def __init__(self):
        self.depth = 0

    def visit_leaf(self, leaf: Leaf) -> None:
        print("  " * self.depth + f"Leaf: {leaf.value}")

    def visit_composite(self, composite: Composite) -> None:
        print("  " * self.depth + f"Composite: {composite.name}")
        self.depth += 1
        # Visitor controls traversal order
        for child in composite.children:
            child.accept(self)
        self.depth -= 1
```

<div style="background: #dcfce7; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #22c55e;">
<div style="font-weight: 700; color: #166534; margin-bottom: 0.75rem;">Advantage: Traversal Flexibility</div>
<div style="color: #14532d; line-height: 1.7;">
    Visitor-controlled traversal allows different visitors to traverse differently: pre-order, post-order, selective visiting, early termination, or even visiting the same node multiple times.
</div>
</div>

### Element-Controlled Traversal

Elements handle their own child traversal, simplifying visitor implementation:

```python
class Composite(Element):
    def __init__(self, name: str):
        self.name = name
        self.children: List[Element] = []

    def accept(self, visitor: TreeVisitor) -> Any:
        # Element controls traversal
        for child in self.children:
            child.accept(visitor)
        # Visit self after children (post-order)
        return visitor.visit_composite(self)
```

<div style="background: #fef3c7; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #f59e0b;">
<div style="font-weight: 700; color: #92400e; margin-bottom: 0.75rem;">Trade-off: Fixed Traversal Order</div>
<div style="color: #78350f; line-height: 1.7;">
    When elements control traversal, all visitors use the same order. This reduces flexibility but ensures consistency and prevents visitors from needing to understand the element structure.
</div>
</div>

### Handling Cycles and Graph Structures

Tree structures are straightforward, but graphs with cycles require cycle detection:

```python
class GraphVisitor(ABC):
    def __init__(self):
        self.visited: Set[int] = set()  # Track by object id

    def visit(self, node: 'GraphNode') -> Any:
        node_id = id(node)
        if node_id in self.visited:
            return self.handle_cycle(node)

        self.visited.add(node_id)
        return node.accept(self)

    def handle_cycle(self, node: 'GraphNode') -> Any:
        """Override to customize cycle handling."""
        return None  # Skip already-visited nodes by default
```

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #ef4444;">
<div style="font-weight: 700; color: #991b1b; margin-bottom: 0.75rem;">Edge Case: Shared Nodes</div>
<div style="color: #7f1d1d; line-height: 1.7;">
    In DAGs (directed acyclic graphs), nodes may be reachable via multiple paths without cycles. Decide whether shared nodes should be visited once or multiple times based on your use case. Size calculation should visit once; path enumeration should visit multiple times.
</div>
</div>

### Interview Deep Dive: Traversal

<div style="background: #eff6ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #bfdbfe;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 1rem;">Level 1: Who should control traversal in the Visitor pattern?</div>
<div style="color: #1e3a8a; line-height: 1.7; margin-bottom: 1rem;">
    Either the visitor or the elements can control traversal. Visitor-controlled traversal offers more flexibility (different orders, early termination). Element-controlled traversal encapsulates structure and ensures consistent behavior across visitors.
</div>

<div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.75rem;">Level 2: How do you handle visiting a graph with cycles?</div>
<div style="color: #1e3a8a; line-height: 1.7; margin-bottom: 1rem;">
Track visited nodes using a set of object identities (or unique IDs). Before visiting a node, check if it has already been visited. For cycles, you can skip the node, return a cached result, or call a special <code>handleCycle()</code> method. The visited set can be stored in the visitor or passed as a parameter.
</div>

<div style="background: #bfdbfe; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.75rem;">Level 3: How would you implement a visitor that needs both pre-order and post-order callbacks?</div>
<div style="color: #1e3a8a; line-height: 1.7;">
<strong>Option 1:</strong> Add both <code>visitXEnter()</code> and <code>visitXExit()</code> methods to the visitor interface. Elements call enter before visiting children and exit after. <strong>Option 2:</strong> Have visit methods return a "continuation" that the traversal calls after children. <strong>Option 3:</strong> Use a hierarchical visitor pattern where <code>visitCompositeStart()</code> returns a boolean indicating whether to traverse children, and <code>visitCompositeEnd()</code> is called after. This is common in compiler AST visitors.
</div>
</div>
</div>
</div>

---

## Adding Operations Without Modifying Classes

### The Open-Closed Trade-off

The Visitor pattern embodies a **dimensional trade-off** in the Open-Closed Principle:

<div style="background: #f8fafc; border-radius: 12px; padding: 2rem; margin: 2rem 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 1.1rem; color: #1e293b; margin-bottom: 1.5rem; text-align: center;">Extension Trade-off Matrix</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
<div style="background: #dcfce7; border-radius: 10px; padding: 1.25rem; border: 2px solid #22c55e;">
<div style="font-weight: 700; color: #166534; margin-bottom: 0.75rem;">With Visitor Pattern</div>
<div style="color: #14532d; font-size: 0.9rem; line-height: 1.6;">
<div style="margin-bottom: 0.5rem;"><strong>Adding operations:</strong> Open (just add new visitor)</div>
<div><strong>Adding element types:</strong> Closed (must modify all visitors)</div>
</div>
</div>
<div style="background: #dbeafe; border-radius: 10px; padding: 1.25rem; border: 2px solid #3b82f6;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 0.75rem;">Without Visitor Pattern</div>
<div style="color: #1e3a8a; font-size: 0.9rem; line-height: 1.6;">
<div style="margin-bottom: 0.5rem;"><strong>Adding element types:</strong> Open (just add new class)</div>
<div><strong>Adding operations:</strong> Closed (must modify all elements)</div>
</div>
</div>
</div>
</div>

### When Visitor Wins

Use Visitor when your **element hierarchy is stable** but **operations change frequently**:

```python
# AST for a simple expression language - these rarely change
class Expression(ABC): pass
class NumberLiteral(Expression): pass
class BinaryOperation(Expression): pass
class VariableReference(Expression): pass
class FunctionCall(Expression): pass

# But operations on the AST grow continuously:
class TypeChecker(ExpressionVisitor): pass      # Week 1
class Interpreter(ExpressionVisitor): pass       # Week 2
class Optimizer(ExpressionVisitor): pass         # Week 3
class CodeGenerator(ExpressionVisitor): pass     # Week 4
class PrettyPrinter(ExpressionVisitor): pass     # Week 5
class SymbolResolver(ExpressionVisitor): pass    # Week 6
class DeadCodeAnalyzer(ExpressionVisitor): pass  # Week 7
# ... and so on
```

### The Acyclic Visitor Pattern

When you need to add both element types and operations more freely, consider the **Acyclic Visitor** pattern, which breaks the cyclic dependency:

```python
from abc import ABC, abstractmethod
from typing import TypeVar, Generic

# Marker interface - no methods
class Visitor(ABC):
    pass

# Each element type has its own visitor interface
class CircleVisitor(ABC):
    @abstractmethod
    def visit_circle(self, circle: 'Circle') -> None:
        pass

class SquareVisitor(ABC):
    @abstractmethod
    def visit_square(self, square: 'Square') -> None:
        pass

# Elements check if visitor supports them
class Circle(Shape):
    def accept(self, visitor: Visitor) -> None:
        if isinstance(visitor, CircleVisitor):
            visitor.visit_circle(self)
        # Gracefully ignore if visitor doesn't support Circle

class Square(Shape):
    def accept(self, visitor: Visitor) -> None:
        if isinstance(visitor, SquareVisitor):
            visitor.visit_square(self)

# Visitors implement only the interfaces they need
class AreaCalculator(Visitor, CircleVisitor, SquareVisitor):
    def visit_circle(self, circle: Circle) -> None:
        print(f"Circle area: {3.14159 * circle.radius ** 2}")

    def visit_square(self, square: Square) -> None:
        print(f"Square area: {square.side ** 2}")

# A visitor that only cares about circles
class CircleCounter(Visitor, CircleVisitor):
    def __init__(self):
        self.count = 0

    def visit_circle(self, circle: Circle) -> None:
        self.count += 1
```

<div style="background: #fef3c7; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #f59e0b;">
<div style="font-weight: 700; color: #92400e; margin-bottom: 0.75rem;">Trade-off: Runtime Type Checking</div>
<div style="color: #78350f; line-height: 1.7;">
Acyclic Visitor trades compile-time safety for flexibility. The <code>isinstance()</code> check happens at runtime, meaning you lose static guarantees that all element types are handled. This is acceptable when visitors legitimately need to ignore certain element types.
</div>
</div>

### Default Visitor Implementation

Provide a base visitor with default (often no-op) implementations to reduce boilerplate:

```python
class DefaultExpressionVisitor(ExpressionVisitor):
    """Base visitor with default implementations."""

    def visit_number(self, expr: NumberLiteral) -> Any:
        return None  # Default: do nothing

    def visit_binary_op(self, expr: BinaryOperation) -> Any:
        # Default: visit children but return nothing
        expr.left.accept(self)
        expr.right.accept(self)
        return None

    def visit_variable(self, expr: VariableReference) -> Any:
        return None

    def visit_function_call(self, expr: FunctionCall) -> Any:
        for arg in expr.arguments:
            arg.accept(self)
        return None

# Now visitors can override only what they need
class VariableFinder(DefaultExpressionVisitor):
    def __init__(self):
        self.variables: Set[str] = set()

    def visit_variable(self, expr: VariableReference) -> None:
        self.variables.add(expr.name)
    # All other visit methods inherited - they traverse but do nothing
```

### Interview Deep Dive: Extensibility

<div style="background: #eff6ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #bfdbfe;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 1rem;">Level 1: How does Visitor enable adding operations without modifying element classes?</div>
<div style="color: #1e3a8a; line-height: 1.7; margin-bottom: 1rem;">
Elements only need an <code>accept(visitor)</code> method that calls back to the visitor. New operations are added by creating new visitor classes that implement the visitor interface. The element classes never change when new operations are added.
</div>

<div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.75rem;">Level 2: What happens when you need to add a new element type to a Visitor-based system?</div>
<div style="color: #1e3a8a; line-height: 1.7; margin-bottom: 1rem;">
Every existing visitor must be modified to add a <code>visitNewElement()</code> method. This is the primary drawback of the Visitor pattern. In a large system with many visitors, adding an element type becomes expensive. Mitigations include: default visitor base classes, the Acyclic Visitor pattern, or generating visitor code from element definitions.
</div>

<div style="background: #bfdbfe; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.75rem;">Level 3: Compare the Expression Problem in functional vs. OO paradigms. How does Visitor fit in?</div>
<div style="color: #1e3a8a; line-height: 1.7;">
The <strong>Expression Problem</strong> asks: how do you add both new data variants AND new operations without recompiling existing code? <strong>OO approach:</strong> Easy to add types (new subclasses), hard to add operations (modify all classes). <strong>FP approach:</strong> Easy to add operations (new functions with pattern matching), hard to add types (modify all functions). <strong>Visitor flips OO</strong> to behave like FP: easy to add operations, hard to add types. Solutions like type classes, object algebras, or tagless final attempt to solve both dimensions simultaneously.
</div>
</div>
</div>
</div>

---

## Complete Implementation: Compiler AST Visitor

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any, Dict, List, Set, Optional, Union
from enum import Enum, auto


# ==================== TYPE SYSTEM ====================

class Type(ABC):
    """Base class for types in our language."""
    @abstractmethod
    def __eq__(self, other: object) -> bool:
        pass

@dataclass(frozen=True)
class PrimitiveType(Type):
    name: str

    def __eq__(self, other: object) -> bool:
        return isinstance(other, PrimitiveType) and self.name == other.name

    def __repr__(self) -> str:
        return self.name

@dataclass(frozen=True)
class FunctionType(Type):
    param_types: tuple
    return_type: Type

    def __eq__(self, other: object) -> bool:
        return (isinstance(other, FunctionType) and
                self.param_types == other.param_types and
                self.return_type == other.return_type)

    def __repr__(self) -> str:
        params = ", ".join(str(p) for p in self.param_types)
        return f"({params}) -> {self.return_type}"

# Built-in types
INT = PrimitiveType("int")
FLOAT = PrimitiveType("float")
BOOL = PrimitiveType("bool")
STRING = PrimitiveType("string")
VOID = PrimitiveType("void")
ERROR = PrimitiveType("<error>")


# ==================== AST NODES (ELEMENTS) ====================

class ASTNode(ABC):
    """Base class for all AST nodes."""

    @abstractmethod
    def accept(self, visitor: 'ASTVisitor') -> Any:
        """Accept a visitor for double dispatch."""
        pass

# ----- Expression Nodes -----

class Expression(ASTNode):
    """Base class for expression nodes."""
    pass

@dataclass
class IntLiteral(Expression):
    value: int

    def accept(self, visitor: 'ASTVisitor') -> Any:
        return visitor.visit_int_literal(self)

@dataclass
class FloatLiteral(Expression):
    value: float

    def accept(self, visitor: 'ASTVisitor') -> Any:
        return visitor.visit_float_literal(self)

@dataclass
class StringLiteral(Expression):
    value: str

    def accept(self, visitor: 'ASTVisitor') -> Any:
        return visitor.visit_string_literal(self)

@dataclass
class BoolLiteral(Expression):
    value: bool

    def accept(self, visitor: 'ASTVisitor') -> Any:
        return visitor.visit_bool_literal(self)

@dataclass
class Identifier(Expression):
    name: str

    def accept(self, visitor: 'ASTVisitor') -> Any:
        return visitor.visit_identifier(self)

class BinaryOperator(Enum):
    ADD = auto()
    SUB = auto()
    MUL = auto()
    DIV = auto()
    MOD = auto()
    EQ = auto()
    NE = auto()
    LT = auto()
    LE = auto()
    GT = auto()
    GE = auto()
    AND = auto()
    OR = auto()

@dataclass
class BinaryExpr(Expression):
    operator: BinaryOperator
    left: Expression
    right: Expression

    def accept(self, visitor: 'ASTVisitor') -> Any:
        return visitor.visit_binary_expr(self)

class UnaryOperator(Enum):
    NEG = auto()
    NOT = auto()

@dataclass
class UnaryExpr(Expression):
    operator: UnaryOperator
    operand: Expression

    def accept(self, visitor: 'ASTVisitor') -> Any:
        return visitor.visit_unary_expr(self)

@dataclass
class CallExpr(Expression):
    callee: Expression
    arguments: List[Expression]

    def accept(self, visitor: 'ASTVisitor') -> Any:
        return visitor.visit_call_expr(self)

@dataclass
class AssignExpr(Expression):
    target: str
    value: Expression

    def accept(self, visitor: 'ASTVisitor') -> Any:
        return visitor.visit_assign_expr(self)

# ----- Statement Nodes -----

class Statement(ASTNode):
    """Base class for statement nodes."""
    pass

@dataclass
class ExpressionStmt(Statement):
    expression: Expression

    def accept(self, visitor: 'ASTVisitor') -> Any:
        return visitor.visit_expression_stmt(self)

@dataclass
class VarDecl(Statement):
    name: str
    type_annotation: Optional[str]
    initializer: Optional[Expression]

    def accept(self, visitor: 'ASTVisitor') -> Any:
        return visitor.visit_var_decl(self)

@dataclass
class FunctionDecl(Statement):
    name: str
    parameters: List[tuple]  # List of (name, type) tuples
    return_type: str
    body: List[Statement]

    def accept(self, visitor: 'ASTVisitor') -> Any:
        return visitor.visit_function_decl(self)

@dataclass
class ReturnStmt(Statement):
    value: Optional[Expression]

    def accept(self, visitor: 'ASTVisitor') -> Any:
        return visitor.visit_return_stmt(self)

@dataclass
class IfStmt(Statement):
    condition: Expression
    then_branch: List[Statement]
    else_branch: Optional[List[Statement]]

    def accept(self, visitor: 'ASTVisitor') -> Any:
        return visitor.visit_if_stmt(self)

@dataclass
class WhileStmt(Statement):
    condition: Expression
    body: List[Statement]

    def accept(self, visitor: 'ASTVisitor') -> Any:
        return visitor.visit_while_stmt(self)

@dataclass
class BlockStmt(Statement):
    statements: List[Statement]

    def accept(self, visitor: 'ASTVisitor') -> Any:
        return visitor.visit_block_stmt(self)

@dataclass
class Program(ASTNode):
    statements: List[Statement]

    def accept(self, visitor: 'ASTVisitor') -> Any:
        return visitor.visit_program(self)


# ==================== VISITOR INTERFACE ====================

class ASTVisitor(ABC):
    """Abstract visitor interface for AST traversal."""

    # Expression visitors
    @abstractmethod
    def visit_int_literal(self, node: IntLiteral) -> Any: pass

    @abstractmethod
    def visit_float_literal(self, node: FloatLiteral) -> Any: pass

    @abstractmethod
    def visit_string_literal(self, node: StringLiteral) -> Any: pass

    @abstractmethod
    def visit_bool_literal(self, node: BoolLiteral) -> Any: pass

    @abstractmethod
    def visit_identifier(self, node: Identifier) -> Any: pass

    @abstractmethod
    def visit_binary_expr(self, node: BinaryExpr) -> Any: pass

    @abstractmethod
    def visit_unary_expr(self, node: UnaryExpr) -> Any: pass

    @abstractmethod
    def visit_call_expr(self, node: CallExpr) -> Any: pass

    @abstractmethod
    def visit_assign_expr(self, node: AssignExpr) -> Any: pass

    # Statement visitors
    @abstractmethod
    def visit_expression_stmt(self, node: ExpressionStmt) -> Any: pass

    @abstractmethod
    def visit_var_decl(self, node: VarDecl) -> Any: pass

    @abstractmethod
    def visit_function_decl(self, node: FunctionDecl) -> Any: pass

    @abstractmethod
    def visit_return_stmt(self, node: ReturnStmt) -> Any: pass

    @abstractmethod
    def visit_if_stmt(self, node: IfStmt) -> Any: pass

    @abstractmethod
    def visit_while_stmt(self, node: WhileStmt) -> Any: pass

    @abstractmethod
    def visit_block_stmt(self, node: BlockStmt) -> Any: pass

    @abstractmethod
    def visit_program(self, node: Program) -> Any: pass


# ==================== DEFAULT VISITOR ====================

class DefaultASTVisitor(ASTVisitor):
    """Default visitor that traverses all nodes but does nothing."""

    def visit_int_literal(self, node: IntLiteral) -> None:
        pass

    def visit_float_literal(self, node: FloatLiteral) -> None:
        pass

    def visit_string_literal(self, node: StringLiteral) -> None:
        pass

    def visit_bool_literal(self, node: BoolLiteral) -> None:
        pass

    def visit_identifier(self, node: Identifier) -> None:
        pass

    def visit_binary_expr(self, node: BinaryExpr) -> None:
        node.left.accept(self)
        node.right.accept(self)

    def visit_unary_expr(self, node: UnaryExpr) -> None:
        node.operand.accept(self)

    def visit_call_expr(self, node: CallExpr) -> None:
        node.callee.accept(self)
        for arg in node.arguments:
            arg.accept(self)

    def visit_assign_expr(self, node: AssignExpr) -> None:
        node.value.accept(self)

    def visit_expression_stmt(self, node: ExpressionStmt) -> None:
        node.expression.accept(self)

    def visit_var_decl(self, node: VarDecl) -> None:
        if node.initializer:
            node.initializer.accept(self)

    def visit_function_decl(self, node: FunctionDecl) -> None:
        for stmt in node.body:
            stmt.accept(self)

    def visit_return_stmt(self, node: ReturnStmt) -> None:
        if node.value:
            node.value.accept(self)

    def visit_if_stmt(self, node: IfStmt) -> None:
        node.condition.accept(self)
        for stmt in node.then_branch:
            stmt.accept(self)
        if node.else_branch:
            for stmt in node.else_branch:
                stmt.accept(self)

    def visit_while_stmt(self, node: WhileStmt) -> None:
        node.condition.accept(self)
        for stmt in node.body:
            stmt.accept(self)

    def visit_block_stmt(self, node: BlockStmt) -> None:
        for stmt in node.statements:
            stmt.accept(self)

    def visit_program(self, node: Program) -> None:
        for stmt in node.statements:
            stmt.accept(self)


# ==================== CONCRETE VISITORS ====================

class TypeChecker(ASTVisitor):
    """
    Type checking visitor that validates types and infers types
    for expressions throughout the AST.
    """

    def __init__(self):
        self.errors: List[str] = []
        self.symbol_table: Dict[str, Type] = {}
        self.function_table: Dict[str, FunctionType] = {}
        self.current_function_return_type: Optional[Type] = None
        self._type_map = {
            "int": INT,
            "float": FLOAT,
            "bool": BOOL,
            "string": STRING,
            "void": VOID,
        }

    def _resolve_type(self, type_name: str) -> Type:
        """Convert type name string to Type object."""
        return self._type_map.get(type_name, ERROR)

    def _error(self, message: str) -> None:
        """Record a type error."""
        self.errors.append(message)

    def visit_int_literal(self, node: IntLiteral) -> Type:
        return INT

    def visit_float_literal(self, node: FloatLiteral) -> Type:
        return FLOAT

    def visit_string_literal(self, node: StringLiteral) -> Type:
        return STRING

    def visit_bool_literal(self, node: BoolLiteral) -> Type:
        return BOOL

    def visit_identifier(self, node: Identifier) -> Type:
        if node.name not in self.symbol_table:
            self._error(f"Undefined variable: '{node.name}'")
            return ERROR
        return self.symbol_table[node.name]

    def visit_binary_expr(self, node: BinaryExpr) -> Type:
        left_type = node.left.accept(self)
        right_type = node.right.accept(self)

        # Arithmetic operators
        arithmetic_ops = {
            BinaryOperator.ADD, BinaryOperator.SUB,
            BinaryOperator.MUL, BinaryOperator.DIV, BinaryOperator.MOD
        }

        if node.operator in arithmetic_ops:
            if left_type == FLOAT or right_type == FLOAT:
                if left_type in (INT, FLOAT) and right_type in (INT, FLOAT):
                    return FLOAT
            if left_type == INT and right_type == INT:
                return INT
            self._error(f"Cannot apply {node.operator} to {left_type} and {right_type}")
            return ERROR

        # Comparison operators
        comparison_ops = {
            BinaryOperator.EQ, BinaryOperator.NE,
            BinaryOperator.LT, BinaryOperator.LE,
            BinaryOperator.GT, BinaryOperator.GE
        }

        if node.operator in comparison_ops:
            if left_type == right_type or (
                left_type in (INT, FLOAT) and right_type in (INT, FLOAT)
            ):
                return BOOL
            self._error(f"Cannot compare {left_type} with {right_type}")
            return ERROR

        # Logical operators
        if node.operator in (BinaryOperator.AND, BinaryOperator.OR):
            if left_type == BOOL and right_type == BOOL:
                return BOOL
            self._error(f"Logical operators require bool operands")
            return ERROR

        return ERROR

    def visit_unary_expr(self, node: UnaryExpr) -> Type:
        operand_type = node.operand.accept(self)

        if node.operator == UnaryOperator.NEG:
            if operand_type in (INT, FLOAT):
                return operand_type
            self._error(f"Cannot negate {operand_type}")
            return ERROR

        if node.operator == UnaryOperator.NOT:
            if operand_type == BOOL:
                return BOOL
            self._error(f"Cannot apply 'not' to {operand_type}")
            return ERROR

        return ERROR

    def visit_call_expr(self, node: CallExpr) -> Type:
        # For simplicity, assume callee is always an identifier
        if not isinstance(node.callee, Identifier):
            self._error("Callee must be an identifier")
            return ERROR

        func_name = node.callee.name
        if func_name not in self.function_table:
            self._error(f"Undefined function: '{func_name}'")
            return ERROR

        func_type = self.function_table[func_name]

        if len(node.arguments) != len(func_type.param_types):
            self._error(
                f"Function '{func_name}' expects {len(func_type.param_types)} "
                f"arguments, got {len(node.arguments)}"
            )
            return ERROR

        for i, (arg, expected_type) in enumerate(
            zip(node.arguments, func_type.param_types)
        ):
            arg_type = arg.accept(self)
            if arg_type != expected_type:
                self._error(
                    f"Argument {i+1} of '{func_name}' expects {expected_type}, "
                    f"got {arg_type}"
                )

        return func_type.return_type

    def visit_assign_expr(self, node: AssignExpr) -> Type:
        if node.target not in self.symbol_table:
            self._error(f"Undefined variable: '{node.target}'")
            return ERROR

        target_type = self.symbol_table[node.target]
        value_type = node.value.accept(self)

        if target_type != value_type:
            # Allow int -> float promotion
            if not (target_type == FLOAT and value_type == INT):
                self._error(
                    f"Cannot assign {value_type} to variable of type {target_type}"
                )

        return target_type

    def visit_expression_stmt(self, node: ExpressionStmt) -> None:
        node.expression.accept(self)

    def visit_var_decl(self, node: VarDecl) -> None:
        if node.type_annotation:
            var_type = self._resolve_type(node.type_annotation)
        elif node.initializer:
            var_type = node.initializer.accept(self)
        else:
            self._error(f"Variable '{node.name}' needs type annotation or initializer")
            var_type = ERROR

        if node.initializer and node.type_annotation:
            init_type = node.initializer.accept(self)
            if init_type != var_type:
                if not (var_type == FLOAT and init_type == INT):
                    self._error(
                        f"Cannot initialize {var_type} with {init_type}"
                    )

        self.symbol_table[node.name] = var_type

    def visit_function_decl(self, node: FunctionDecl) -> None:
        param_types = tuple(self._resolve_type(t) for _, t in node.parameters)
        return_type = self._resolve_type(node.return_type)
        func_type = FunctionType(param_types, return_type)

        self.function_table[node.name] = func_type

        # Save outer scope and create function scope
        outer_symbols = self.symbol_table.copy()
        outer_return_type = self.current_function_return_type

        self.current_function_return_type = return_type

        # Add parameters to scope
        for param_name, param_type_str in node.parameters:
            self.symbol_table[param_name] = self._resolve_type(param_type_str)

        # Type check body
        for stmt in node.body:
            stmt.accept(self)

        # Restore outer scope
        self.symbol_table = outer_symbols
        self.current_function_return_type = outer_return_type

    def visit_return_stmt(self, node: ReturnStmt) -> None:
        if self.current_function_return_type is None:
            self._error("Return statement outside of function")
            return

        if node.value is None:
            if self.current_function_return_type != VOID:
                self._error(
                    f"Function must return {self.current_function_return_type}"
                )
        else:
            return_type = node.value.accept(self)
            if return_type != self.current_function_return_type:
                if not (self.current_function_return_type == FLOAT and
                        return_type == INT):
                    self._error(
                        f"Expected return type {self.current_function_return_type}, "
                        f"got {return_type}"
                    )

    def visit_if_stmt(self, node: IfStmt) -> None:
        cond_type = node.condition.accept(self)
        if cond_type != BOOL:
            self._error(f"If condition must be bool, got {cond_type}")

        for stmt in node.then_branch:
            stmt.accept(self)

        if node.else_branch:
            for stmt in node.else_branch:
                stmt.accept(self)

    def visit_while_stmt(self, node: WhileStmt) -> None:
        cond_type = node.condition.accept(self)
        if cond_type != BOOL:
            self._error(f"While condition must be bool, got {cond_type}")

        for stmt in node.body:
            stmt.accept(self)

    def visit_block_stmt(self, node: BlockStmt) -> None:
        for stmt in node.statements:
            stmt.accept(self)

    def visit_program(self, node: Program) -> None:
        for stmt in node.statements:
            stmt.accept(self)


class PrettyPrinter(ASTVisitor):
    """
    Visitor that converts AST back to source code with proper formatting.
    Demonstrates accumulating string output during traversal.
    """

    def __init__(self, indent_size: int = 4):
        self.indent_size = indent_size
        self.current_indent = 0

    def _indent(self) -> str:
        return " " * (self.current_indent * self.indent_size)

    def _op_to_str(self, op: Union[BinaryOperator, UnaryOperator]) -> str:
        op_map = {
            BinaryOperator.ADD: "+", BinaryOperator.SUB: "-",
            BinaryOperator.MUL: "*", BinaryOperator.DIV: "/",
            BinaryOperator.MOD: "%", BinaryOperator.EQ: "==",
            BinaryOperator.NE: "!=", BinaryOperator.LT: "<",
            BinaryOperator.LE: "<=", BinaryOperator.GT: ">",
            BinaryOperator.GE: ">=", BinaryOperator.AND: "and",
            BinaryOperator.OR: "or", UnaryOperator.NEG: "-",
            UnaryOperator.NOT: "not ",
        }
        return op_map.get(op, "?")

    def visit_int_literal(self, node: IntLiteral) -> str:
        return str(node.value)

    def visit_float_literal(self, node: FloatLiteral) -> str:
        return str(node.value)

    def visit_string_literal(self, node: StringLiteral) -> str:
        return f'"{node.value}"'

    def visit_bool_literal(self, node: BoolLiteral) -> str:
        return "true" if node.value else "false"

    def visit_identifier(self, node: Identifier) -> str:
        return node.name

    def visit_binary_expr(self, node: BinaryExpr) -> str:
        left = node.left.accept(self)
        right = node.right.accept(self)
        op = self._op_to_str(node.operator)
        return f"({left} {op} {right})"

    def visit_unary_expr(self, node: UnaryExpr) -> str:
        operand = node.operand.accept(self)
        op = self._op_to_str(node.operator)
        return f"({op}{operand})"

    def visit_call_expr(self, node: CallExpr) -> str:
        callee = node.callee.accept(self)
        args = ", ".join(arg.accept(self) for arg in node.arguments)
        return f"{callee}({args})"

    def visit_assign_expr(self, node: AssignExpr) -> str:
        value = node.value.accept(self)
        return f"{node.target} = {value}"

    def visit_expression_stmt(self, node: ExpressionStmt) -> str:
        return self._indent() + node.expression.accept(self) + ";"

    def visit_var_decl(self, node: VarDecl) -> str:
        result = self._indent() + f"var {node.name}"
        if node.type_annotation:
            result += f": {node.type_annotation}"
        if node.initializer:
            result += f" = {node.initializer.accept(self)}"
        return result + ";"

    def visit_function_decl(self, node: FunctionDecl) -> str:
        params = ", ".join(f"{name}: {type_}" for name, type_ in node.parameters)
        lines = [f"{self._indent()}fn {node.name}({params}) -> {node.return_type} {{"]

        self.current_indent += 1
        for stmt in node.body:
            lines.append(stmt.accept(self))
        self.current_indent -= 1

        lines.append(self._indent() + "}")
        return "\n".join(lines)

    def visit_return_stmt(self, node: ReturnStmt) -> str:
        if node.value:
            return self._indent() + f"return {node.value.accept(self)};"
        return self._indent() + "return;"

    def visit_if_stmt(self, node: IfStmt) -> str:
        lines = [f"{self._indent()}if ({node.condition.accept(self)}) {{"]

        self.current_indent += 1
        for stmt in node.then_branch:
            lines.append(stmt.accept(self))
        self.current_indent -= 1

        if node.else_branch:
            lines.append(self._indent() + "} else {")
            self.current_indent += 1
            for stmt in node.else_branch:
                lines.append(stmt.accept(self))
            self.current_indent -= 1

        lines.append(self._indent() + "}")
        return "\n".join(lines)

    def visit_while_stmt(self, node: WhileStmt) -> str:
        lines = [f"{self._indent()}while ({node.condition.accept(self)}) {{"]

        self.current_indent += 1
        for stmt in node.body:
            lines.append(stmt.accept(self))
        self.current_indent -= 1

        lines.append(self._indent() + "}")
        return "\n".join(lines)

    def visit_block_stmt(self, node: BlockStmt) -> str:
        lines = [self._indent() + "{"]
        self.current_indent += 1
        for stmt in node.statements:
            lines.append(stmt.accept(self))
        self.current_indent -= 1
        lines.append(self._indent() + "}")
        return "\n".join(lines)

    def visit_program(self, node: Program) -> str:
        return "\n\n".join(stmt.accept(self) for stmt in node.statements)


class ConstantFolder(ASTVisitor):
    """
    Optimization visitor that folds constant expressions at compile time.
    Returns optimized AST nodes or the original if no optimization possible.
    """

    def visit_int_literal(self, node: IntLiteral) -> IntLiteral:
        return node

    def visit_float_literal(self, node: FloatLiteral) -> FloatLiteral:
        return node

    def visit_string_literal(self, node: StringLiteral) -> StringLiteral:
        return node

    def visit_bool_literal(self, node: BoolLiteral) -> BoolLiteral:
        return node

    def visit_identifier(self, node: Identifier) -> Identifier:
        return node

    def visit_binary_expr(self, node: BinaryExpr) -> Expression:
        left = node.left.accept(self)
        right = node.right.accept(self)

        # Check if both operands are now literals
        if isinstance(left, (IntLiteral, FloatLiteral)) and \
           isinstance(right, (IntLiteral, FloatLiteral)):
            left_val = left.value
            right_val = right.value

            try:
                result = self._evaluate_binary(node.operator, left_val, right_val)

                # Return appropriate literal type
                if isinstance(result, bool):
                    return BoolLiteral(result)
                elif isinstance(result, float):
                    return FloatLiteral(result)
                else:
                    return IntLiteral(int(result))
            except (ZeroDivisionError, ArithmeticError):
                pass  # Can't fold, return modified node

        # Return potentially partially-folded node
        return BinaryExpr(node.operator, left, right)

    def _evaluate_binary(
        self, op: BinaryOperator, left: float, right: float
    ) -> Union[float, bool]:
        ops = {
            BinaryOperator.ADD: lambda a, b: a + b,
            BinaryOperator.SUB: lambda a, b: a - b,
            BinaryOperator.MUL: lambda a, b: a * b,
            BinaryOperator.DIV: lambda a, b: a / b,
            BinaryOperator.MOD: lambda a, b: a % b,
            BinaryOperator.EQ: lambda a, b: a == b,
            BinaryOperator.NE: lambda a, b: a != b,
            BinaryOperator.LT: lambda a, b: a < b,
            BinaryOperator.LE: lambda a, b: a <= b,
            BinaryOperator.GT: lambda a, b: a > b,
            BinaryOperator.GE: lambda a, b: a >= b,
        }
        return ops[op](left, right)

    def visit_unary_expr(self, node: UnaryExpr) -> Expression:
        operand = node.operand.accept(self)

        if isinstance(operand, (IntLiteral, FloatLiteral)):
            if node.operator == UnaryOperator.NEG:
                if isinstance(operand, IntLiteral):
                    return IntLiteral(-operand.value)
                return FloatLiteral(-operand.value)

        if isinstance(operand, BoolLiteral):
            if node.operator == UnaryOperator.NOT:
                return BoolLiteral(not operand.value)

        return UnaryExpr(node.operator, operand)

    def visit_call_expr(self, node: CallExpr) -> CallExpr:
        optimized_args = [arg.accept(self) for arg in node.arguments]
        return CallExpr(node.callee, optimized_args)

    def visit_assign_expr(self, node: AssignExpr) -> AssignExpr:
        optimized_value = node.value.accept(self)
        return AssignExpr(node.target, optimized_value)

    def visit_expression_stmt(self, node: ExpressionStmt) -> ExpressionStmt:
        return ExpressionStmt(node.expression.accept(self))

    def visit_var_decl(self, node: VarDecl) -> VarDecl:
        optimized_init = None
        if node.initializer:
            optimized_init = node.initializer.accept(self)
        return VarDecl(node.name, node.type_annotation, optimized_init)

    def visit_function_decl(self, node: FunctionDecl) -> FunctionDecl:
        optimized_body = [stmt.accept(self) for stmt in node.body]
        return FunctionDecl(
            node.name, node.parameters, node.return_type, optimized_body
        )

    def visit_return_stmt(self, node: ReturnStmt) -> ReturnStmt:
        if node.value:
            return ReturnStmt(node.value.accept(self))
        return node

    def visit_if_stmt(self, node: IfStmt) -> Statement:
        optimized_cond = node.condition.accept(self)

        # If condition is constant, eliminate dead branch
        if isinstance(optimized_cond, BoolLiteral):
            if optimized_cond.value:
                # Condition always true, return then branch
                optimized_then = [s.accept(self) for s in node.then_branch]
                return BlockStmt(optimized_then)
            else:
                # Condition always false, return else branch or empty
                if node.else_branch:
                    optimized_else = [s.accept(self) for s in node.else_branch]
                    return BlockStmt(optimized_else)
                return BlockStmt([])

        optimized_then = [s.accept(self) for s in node.then_branch]
        optimized_else = None
        if node.else_branch:
            optimized_else = [s.accept(self) for s in node.else_branch]

        return IfStmt(optimized_cond, optimized_then, optimized_else)

    def visit_while_stmt(self, node: WhileStmt) -> Statement:
        optimized_cond = node.condition.accept(self)

        # If condition is constant false, eliminate loop
        if isinstance(optimized_cond, BoolLiteral) and not optimized_cond.value:
            return BlockStmt([])

        optimized_body = [s.accept(self) for s in node.body]
        return WhileStmt(optimized_cond, optimized_body)

    def visit_block_stmt(self, node: BlockStmt) -> BlockStmt:
        optimized = [s.accept(self) for s in node.statements]
        return BlockStmt(optimized)

    def visit_program(self, node: Program) -> Program:
        optimized = [s.accept(self) for s in node.statements]
        return Program(optimized)


class SymbolCollector(DefaultASTVisitor):
    """
    Visitor that collects all defined and referenced symbols.
    Useful for dependency analysis and dead code detection.
    """

    def __init__(self):
        self.defined_variables: Set[str] = set()
        self.referenced_variables: Set[str] = set()
        self.defined_functions: Set[str] = set()
        self.called_functions: Set[str] = set()

    def visit_identifier(self, node: Identifier) -> None:
        self.referenced_variables.add(node.name)

    def visit_var_decl(self, node: VarDecl) -> None:
        self.defined_variables.add(node.name)
        super().visit_var_decl(node)

    def visit_function_decl(self, node: FunctionDecl) -> None:
        self.defined_functions.add(node.name)
        # Add parameters as defined variables within the function
        for param_name, _ in node.parameters:
            self.defined_variables.add(param_name)
        super().visit_function_decl(node)

    def visit_call_expr(self, node: CallExpr) -> None:
        if isinstance(node.callee, Identifier):
            self.called_functions.add(node.callee.name)
        super().visit_call_expr(node)

    def get_unused_variables(self) -> Set[str]:
        return self.defined_variables - self.referenced_variables

    def get_undefined_variables(self) -> Set[str]:
        return self.referenced_variables - self.defined_variables

    def get_uncalled_functions(self) -> Set[str]:
        return self.defined_functions - self.called_functions


# ==================== USAGE EXAMPLE ====================

def demo():
    """Demonstrate the visitor pattern with a sample program."""

    # Build AST for:
    # fn add(a: int, b: int) -> int {
    #     return a + b;
    # }
    # var x: int = 3 + 4 * 2;
    # var y: int = add(x, 10);

    program = Program([
        FunctionDecl(
            name="add",
            parameters=[("a", "int"), ("b", "int")],
            return_type="int",
            body=[
                ReturnStmt(
                    BinaryExpr(
                        BinaryOperator.ADD,
                        Identifier("a"),
                        Identifier("b")
                    )
                )
            ]
        ),
        VarDecl(
            name="x",
            type_annotation="int",
            initializer=BinaryExpr(
                BinaryOperator.ADD,
                IntLiteral(3),
                BinaryExpr(BinaryOperator.MUL, IntLiteral(4), IntLiteral(2))
            )
        ),
        VarDecl(
            name="y",
            type_annotation="int",
            initializer=CallExpr(
                Identifier("add"),
                [Identifier("x"), IntLiteral(10)]
            )
        )
    ])

    print("=" * 60)
    print("VISITOR PATTERN - COMPILER AST DEMO")
    print("=" * 60)

    # Pretty print the original AST
    print("\n--- Original Source ---")
    printer = PrettyPrinter()
    print(program.accept(printer))

    # Type check
    print("\n--- Type Checking ---")
    checker = TypeChecker()
    program.accept(checker)
    if checker.errors:
        print("Type errors found:")
        for error in checker.errors:
            print(f"  - {error}")
    else:
        print("No type errors found!")

    # Constant folding optimization
    print("\n--- After Constant Folding ---")
    folder = ConstantFolder()
    optimized = program.accept(folder)
    print(optimized.accept(printer))

    # Symbol collection
    print("\n--- Symbol Analysis ---")
    collector = SymbolCollector()
    program.accept(collector)
    print(f"Defined functions: {collector.defined_functions}")
    print(f"Called functions: {collector.called_functions}")
    print(f"Defined variables: {collector.defined_variables}")
    print(f"Referenced variables: {collector.referenced_variables}")


if __name__ == "__main__":
    demo()
```

---

## Interview Deep Dive: Implementation Details

<div style="background: #eff6ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #bfdbfe;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 1rem;">Level 1: What should a visitor's visit method return?</div>
<div style="color: #1e3a8a; line-height: 1.7; margin-bottom: 1rem;">
It depends on the operation. Type checkers return types, evaluators return values, code generators return strings or IR nodes, collectors return nothing (mutate internal state). The return type should match the operation's purpose. Using generics (e.g., <code>Visitor&lt;T&gt;</code>) allows type-safe return values.
</div>

<div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.75rem;">Level 2: How do you handle state in visitors that need context from parent nodes?</div>
<div style="color: #1e3a8a; line-height: 1.7; margin-bottom: 1rem;">
<strong>Option 1:</strong> Store state in visitor instance variables (e.g., <code>current_function_return_type</code> in type checker). Save/restore when entering/exiting scopes. <strong>Option 2:</strong> Pass context as additional parameters using a context object pattern. <strong>Option 3:</strong> Maintain an explicit stack of contexts. <strong>Trade-off:</strong> Instance state is simpler but not thread-safe; parameter passing is pure but verbose.
</div>

<div style="background: #bfdbfe; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.75rem;">Level 3: How would you design a visitor that can be interrupted mid-traversal and resumed later?</div>
<div style="color: #1e3a8a; line-height: 1.7;">
Convert to <strong>continuation-passing style</strong> or use an <strong>explicit work stack</strong>. Instead of recursive calls, push pending work onto a stack. Process one item at a time and yield control. The visitor becomes an iterator: <code>while visitor.has_next(): visitor.step()</code>. This enables progress reporting, cancellation, and parallelization. Languages with generators/coroutines can <code>yield</code> from visit methods. This pattern is used in incremental parsers and background code analysis.
</div>
</div>
</div>
</div>

---

## Visitor Pattern vs. Alternatives

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 1rem;">Pattern Comparison</div>
<table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
<tr style="background: #e2e8f0;">
<th style="padding: 0.75rem; text-align: left; border: 1px solid #cbd5e1;">Approach</th>
<th style="padding: 0.75rem; text-align: left; border: 1px solid #cbd5e1;">Add Types</th>
<th style="padding: 0.75rem; text-align: left; border: 1px solid #cbd5e1;">Add Operations</th>
<th style="padding: 0.75rem; text-align: left; border: 1px solid #cbd5e1;">Best For</th>
</tr>
<tr>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; font-weight: 600;">Traditional OOP</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; color: #166534;">Easy</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; color: #991b1b;">Hard</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1;">Evolving type hierarchies</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; font-weight: 600;">Visitor Pattern</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; color: #991b1b;">Hard</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; color: #166534;">Easy</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1;">Stable types, many operations</td>
</tr>
<tr>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; font-weight: 600;">Pattern Matching</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; color: #991b1b;">Hard</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; color: #166534;">Easy</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1;">FP languages, sealed types</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; font-weight: 600;">Type Classes</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; color: #166534;">Easy</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1; color: #166534;">Easy</td>
<td style="padding: 0.75rem; border: 1px solid #cbd5e1;">Haskell, Rust traits</td>
</tr>
</table>
</div>

### When to Use Alternatives

<div style="background: #dcfce7; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #22c55e;">
<div style="font-weight: 700; color: #166534; margin-bottom: 0.75rem;">Use Pattern Matching Instead When:</div>
<div style="color: #14532d; line-height: 1.7;">
<ul style="margin: 0; padding-left: 1.25rem;">
<li>Your language has exhaustive pattern matching (Scala, Rust, Kotlin)</li>
<li>Types are sealed/final and won't be extended</li>
<li>Operations are simple enough to fit in a match expression</li>
<li>You want compile-time exhaustiveness checking</li>
</ul>
</div>
</div>

<div style="background: #dbeafe; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border-left: 4px solid #3b82f6;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 0.75rem;">Use isinstance/type Dispatch Instead When:</div>
<div style="color: #1e3a8a; line-height: 1.7;">
<ul style="margin: 0; padding-left: 1.25rem;">
<li>You have very few types (2-3)</li>
<li>You only need one or two operations</li>
<li>The overhead of the full Visitor infrastructure is not justified</li>
<li>You're prototyping and need quick iteration</li>
</ul>
</div>
</div>

---

## Common Pitfalls and Edge Cases

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #fecaca;">
<div style="font-weight: 700; color: #991b1b; margin-bottom: 1rem;">Critical Pitfalls</div>

<div style="margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid #fecaca;">
<div style="font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">1. Forgetting to Visit Children</div>
<div style="color: #7f1d1d; font-size: 0.95rem; line-height: 1.6;">
When traversal is visitor-controlled, forgetting to call <code>accept()</code> on children silently skips subtrees. Use a <code>DefaultVisitor</code> base class that handles traversal, so derived visitors only override behavior.
</div>
</div>

<div style="margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid #fecaca;">
<div style="font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">2. Breaking Encapsulation Excessively</div>
<div style="color: #7f1d1d; font-size: 0.95rem; line-height: 1.6;">
  Visitors need access to element data, but exposing too many internals couples visitors tightly to element implementation. Provide focused accessor methods rather than exposing all fields.
</div>
</div>

<div style="margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid #fecaca;">
<div style="font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">3. Accumulating Stale State</div>
<div style="color: #7f1d1d; font-size: 0.95rem; line-height: 1.6;">
Visitor instances that accumulate state (counters, collections) may retain state across multiple traversals. Either create new visitor instances for each traversal or provide explicit <code>reset()</code> methods.
</div>
</div>

<div style="margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid #fecaca;">
<div style="font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">4. Infinite Loops in Cyclic Structures</div>
<div style="color: #7f1d1d; font-size: 0.95rem; line-height: 1.6;">
  Visiting graphs without cycle detection causes stack overflow or infinite loops. Always track visited nodes when the structure might contain cycles.
</div>
</div>

<div>
<div style="font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">5. Thread Safety Issues</div>
<div style="color: #7f1d1d; font-size: 0.95rem; line-height: 1.6;">
  Visitors with mutable state are not thread-safe. For parallel traversal, either use thread-local visitors, immutable visitors that return new state, or synchronize access to shared state.
</div>
</div>
</div>

---

## Interview Deep Dive: Design Decisions

<div style="background: #eff6ff; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #bfdbfe;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 1rem;">Level 1: How does Visitor relate to the Composite pattern?</div>
<div style="color: #1e3a8a; line-height: 1.7; margin-bottom: 1rem;">
    [[Composite]](/topic/design-patterns/composite) creates tree structures of objects. Visitor operates on those structures by traversing them and applying operations. Composite defines the structure; Visitor defines operations on that structure. They are highly complementary patterns.
</div>

<div style="background: #dbeafe; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.75rem;">Level 2: How would you unit test visitors?</div>
<div style="color: #1e3a8a; line-height: 1.7; margin-bottom: 1rem;">
<strong>Test visit methods individually:</strong> Create each element type and verify the visitor produces correct output. <strong>Test traversal:</strong> Create composite structures and verify all nodes are visited in correct order. <strong>Test state accumulation:</strong> Traverse multiple elements and verify aggregated state. <strong>Use mock visitors:</strong> Test that elements call the correct visit method. <strong>Edge cases:</strong> Empty structures, single elements, deep nesting, cycles.
</div>

<div style="background: #bfdbfe; border-radius: 8px; padding: 1rem; margin-top: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.75rem;">Level 3: How would you evolve a Visitor-based system when you need to add both new elements and new operations frequently?</div>
<div style="color: #1e3a8a; line-height: 1.7;">
The Visitor pattern has a fundamental tension here. Strategies: <strong>1) Acyclic Visitor:</strong> Visitors implement only interfaces for types they care about. <strong>2) Reflective Visitor:</strong> Use reflection to dynamically dispatch, losing static safety but gaining flexibility. <strong>3) External Dispatch Table:</strong> Map (element type, operation type) pairs to handlers at runtime. <strong>4) Code Generation:</strong> Generate visitor infrastructure from element definitions. <strong>5) Reconsider the design:</strong> Perhaps the domain doesn't fit Visitor; consider [[Strategy]](/topic/design-patterns/strategy) or [[Command]](/topic/design-patterns/command) patterns instead.
</div>
</div>
</div>
</div>

---

## Real-World Applications

### Compilers and Static Analysis

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 1rem;">Industry Usage</div>

<div style="margin-bottom: 1rem; padding-left: 1rem; border-left: 3px solid #3b82f6;">
<div style="font-weight: 600; color: #1e40af;">LLVM/Clang</div>
<div style="color: #475569; font-size: 0.9rem;">Uses visitors for AST traversal, type checking, code generation, and optimization passes. Each compiler phase is a separate visitor.</div>
</div>

<div style="margin-bottom: 1rem; padding-left: 1rem; border-left: 3px solid #22c55e;">
<div style="font-weight: 600; color: #166534;">ESLint / Pylint / SonarQube</div>
<div style="color: #475569; font-size: 0.9rem;">Each linting rule is a visitor that traverses AST nodes looking for patterns. Adding rules doesn't modify the parser or AST classes.</div>
</div>

<div style="margin-bottom: 1rem; padding-left: 1rem; border-left: 3px solid #a855f7;">
<div style="font-weight: 600; color: #7c3aed;">TypeScript Compiler</div>
<div style="color: #475569; font-size: 0.9rem;">Type checker, transformer pipeline, and emit stages all use visitor patterns over the TypeScript AST.</div>
</div>

<div style="padding-left: 1rem; border-left: 3px solid #f59e0b;">
<div style="font-weight: 600; color: #92400e;">Babel</div>
<div style="color: #475569; font-size: 0.9rem;">Plugins are visitors that transform JavaScript AST. The plugin API is essentially a visitor registration system.</div>
</div>
</div>

### Database Query Processing

ORMs like SQLAlchemy, Django ORM, and Hibernate use visitors to traverse expression trees and generate SQL for different database backends (PostgreSQL, MySQL, SQLite each have different SQL dialects).

### Document Processing

PDF libraries traverse document structure with visitors for rendering, text extraction, and accessibility analysis. XML/HTML parsers expose SAX-like visitor interfaces for efficient streaming processing.

---

## Summary: Key Interview Points

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 2px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem; border-bottom: 2px solid #cbd5e1; padding-bottom: 0.75rem; color: #1e293b;">Memorize These</div>
<ul style="margin: 0; padding-left: 1.25rem; line-height: 2; color: #475569;">
<li><strong>Core mechanism:</strong> Double dispatch via accept/visit two-step protocol</li>
<li><strong>Key trade-off:</strong> Easy to add operations, hard to add element types</li>
<li><strong>When to use:</strong> Stable element hierarchy, frequently changing operations</li>
<li><strong>Traversal:</strong> Either visitor or elements control it, be consistent</li>
<li><strong>Cyclic structures:</strong> Track visited nodes to prevent infinite loops</li>
<li><strong>Alternatives:</strong> Pattern matching, type dispatch, acyclic visitor</li>
<li><strong>Related patterns:</strong> [[Composite]](/topic/design-patterns/composite), [[Iterator]](/topic/design-patterns/iterator), [[Strategy]](/topic/design-patterns/strategy)</li>
</ul>
</div>

---

## Related Patterns

- **[[Composite]](/topic/design-patterns/composite)** - Provides the tree structure that visitors typically traverse
- **[[Iterator]](/topic/design-patterns/iterator)** - Alternative for simple linear traversal without type-specific behavior
- **[[Strategy]](/topic/design-patterns/strategy)** - Alternative when only one operation varies, not multiple
- **[[Interpreter]](/topic/design-patterns/interpreter)** - Often uses Visitor for AST operations
- **[[Command]](/topic/design-patterns/command)** - Can encapsulate visitor operations for undo/redo
