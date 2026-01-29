# Composite Pattern

## Overview

The Composite pattern structures objects into tree hierarchies where individual objects (leaves) and compositions (composites) implement a uniform interface. This enables clients to treat atomic elements and complex aggregations identically through polymorphism, eliminating conditional logic that would otherwise distinguish between single items and collections.

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%); border-radius: 12px; padding: 1.25rem; margin: 1.5rem 0; border-left: 4px solid #f59e0b;">
  <div style="font-weight: 700; color: #92400e; margin-bottom: 0.5rem;">Core Insight</div>
  <div style="color: #78350f;">The Composite pattern's power lies in <strong>structural recursion</strong>: a composite contains components, which may themselves be composites. This self-similar structure enables operations to propagate through arbitrarily deep hierarchies with zero knowledge of the actual depth.</div>
</div>

## Internal Mechanisms and Memory Layout

### How Composites Organize Children

When implementing a composite, the internal data structure for storing children significantly impacts performance characteristics:

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #cbd5e1;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
    <div style="background: white; border-radius: 12px; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
      <div style="font-weight: 700; color: #1e40af; margin-bottom: 0.75rem;">ArrayList/Dynamic Array</div>
      <div style="font-size: 0.9rem; color: #475569; margin-bottom: 0.5rem;"><strong>O(1)</strong> indexed access, <strong>O(n)</strong> removal</div>
      <div style="font-size: 0.85rem; color: #64748b;">Best when: order matters, frequent iteration, rare removals. Used by React's children array.</div>
    </div>
    <div style="background: white; border-radius: 12px; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
      <div style="font-weight: 700; color: #1e40af; margin-bottom: 0.75rem;">LinkedList</div>
      <div style="font-size: 0.9rem; color: #475569; margin-bottom: 0.5rem;"><strong>O(1)</strong> insertion/removal, <strong>O(n)</strong> access</div>
      <div style="font-size: 0.85rem; color: #64748b;">Best when: frequent structural modifications, rare random access. Used in DOM implementations.</div>
    </div>
    <div style="background: white; border-radius: 12px; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
      <div style="font-weight: 700; color: #1e40af; margin-bottom: 0.75rem;">HashMap by Name/ID</div>
      <div style="font-size: 0.9rem; color: #475569; margin-bottom: 0.5rem;"><strong>O(1)</strong> lookup by key, unordered</div>
      <div style="font-size: 0.85rem; color: #64748b;">Best when: children have unique identifiers, frequent lookup by name. Used in file systems.</div>
    </div>
    <div style="background: white; border-radius: 12px; padding: 1.25rem; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
      <div style="font-weight: 700; color: #1e40af; margin-bottom: 0.75rem;">TreeMap/Sorted Structure</div>
      <div style="font-size: 0.9rem; color: #475569; margin-bottom: 0.5rem;"><strong>O(log n)</strong> operations, sorted iteration</div>
      <div style="font-size: 0.85rem; color: #64748b;">Best when: children need ordering, range queries needed. Used in database indexes.</div>
    </div>
  </div>
</div>

### Parent Reference Management

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%); border-radius: 12px; padding: 1.25rem; margin: 1rem 0; border-left: 4px solid #ef4444;">
  <div style="font-weight: 700; color: #dc2626; margin-bottom: 0.5rem;">Critical Design Decision</div>
  <div style="color: #7f1d1d;">Whether to maintain parent references is a fundamental trade-off. Parent references enable upward traversal and path computation but create bidirectional coupling, complicating memory management and requiring careful synchronization during structural modifications.</div>
</div>

**With Parent References:**
- Path computation: O(depth) by walking up the tree
- Ancestor queries: O(depth) to find any ancestor
- Memory overhead: One additional pointer per node
- Invariant: `child.parent.children.contains(child)` must always hold

**Without Parent References:**
- Path computation: O(n) requiring full tree search
- Simpler memory model, easier garbage collection
- Immutable-friendly design
- Common in functional programming approaches

### Interview Questions: Internal Mechanisms

<div style="background: linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%); border-radius: 12px; padding: 1.5rem; margin: 1rem 0; border: 1px solid #c4b5fd;">

**Level 1: How does a Composite maintain its children collection, and what operations does it support?**

A Composite maintains an internal collection (typically a list or map) of Component references. Core operations include:
- `add(Component)`: Inserts a child, establishes parent-child relationship
- `remove(Component)`: Detaches a child, clears parent reference
- `getChild(index)` or `getChild(name)`: Retrieves specific children
- `getChildren()`: Returns all children (typically a defensive copy)

The collection choice affects performance: ArrayList provides O(1) indexed access but O(n) removal; LinkedList offers O(1) structural modification but O(n) access; HashMap enables O(1) lookup by key but loses ordering.

**Level 2: When adding a child that already has a parent, what invariants must be maintained and how?**

When a component with an existing parent is added to a new composite, several invariants must be preserved:

1. **Single-parent invariant**: A component can only have one parent. The implementation must either:
   - Automatically remove from the old parent (implicit reparenting)
   - Throw an exception requiring explicit removal first
   - Clone the component for the new location

2. **Cycle prevention**: Adding must verify the new child is not an ancestor of the composite:
```python
def add(self, component):
    # Verify no cycles
    ancestor = self
    while ancestor is not None:
        if ancestor is component:
            raise CycleDetectedError("Cannot add ancestor as child")
        ancestor = ancestor.parent

    # Reparent if necessary
    if component.parent is not None:
        component.parent._children.remove(component)

    component.parent = self
    self._children.append(component)
```

3. **Atomicity**: The operation should be atomic. If adding fails partway, the tree should remain in a valid state.

**Level 3: How would you implement a thread-safe Composite that supports concurrent reads and writes without blocking readers during structural modifications?**

Implementing concurrent Composite access requires addressing several challenges:

**Approach 1: Copy-on-Write (COW)**
```python
class ConcurrentComposite:
    def __init__(self):
        self._children = frozenset()  # Immutable reference
        self._lock = threading.Lock()

    def get_children(self):
        # No lock needed - reference read is atomic
        return self._children

    def add(self, component):
        with self._lock:
            # Create new immutable collection
            new_children = self._children | {component}
            component.parent = self
            # Atomic reference swap
            self._children = new_children
```

**Approach 2: Read-Write Lock with Snapshotting**
```python
class RWLockComposite:
    def __init__(self):
        self._children = []
        self._rwlock = RWLock()
        self._version = 0

    def iterate(self):
        with self._rwlock.read():
            # Snapshot for consistent iteration
            return list(self._children), self._version

    def add(self, component):
        with self._rwlock.write():
            self._children.append(component)
            self._version += 1
```

**Approach 3: Lock-Free with CAS (Compare-and-Swap)**
Used in high-performance systems like concurrent DOM implementations:
- Children stored as immutable linked list
- Modifications create new list heads
- CAS operation swaps the head reference
- Failed CAS triggers retry with updated state

Trade-offs:
- COW: Best for read-heavy workloads, memory overhead for writes
- RWLock: Balanced, potential writer starvation
- Lock-free: Highest throughput, complex implementation, requires careful memory management

</div>

---

## Tree Structures: The Foundation of Composite

### Structural Properties

The Composite pattern creates an [[tree]](/topic/data-structures/tree) structure with specific properties:

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 16px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #86efac;">
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="display: flex; align-items: flex-start; gap: 1rem;">
      <div style="background: #166534; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">1</div>
      <div>
        <div style="font-weight: 700; color: #166534;">Rooted Tree</div>
        <div style="font-size: 0.9rem; color: #15803d;">Every composite tree has a single root node. Operations typically begin at the root and propagate downward. Some implementations allow forest structures (multiple roots).</div>
      </div>
    </div>
    <div style="display: flex; align-items: flex-start; gap: 1rem;">
      <div style="background: #166534; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">2</div>
      <div>
        <div style="font-weight: 700; color: #166534;">N-ary Branching</div>
        <div style="font-size: 0.9rem; color: #15803d;">Unlike binary trees, composites can have any number of children. Some domains constrain this (e.g., binary expression trees), but the pattern allows unlimited branching.</div>
      </div>
    </div>
    <div style="display: flex; align-items: flex-start; gap: 1rem;">
      <div style="background: #166534; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">3</div>
      <div>
        <div style="font-weight: 700; color: #166534;">Acyclic Constraint</div>
        <div style="font-size: 0.9rem; color: #15803d;">The structure must remain acyclic. A composite cannot directly or indirectly contain itself. Violating this causes infinite recursion during traversal.</div>
      </div>
    </div>
    <div style="display: flex; align-items: flex-start; gap: 1rem;">
      <div style="background: #166534; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">4</div>
      <div>
        <div style="font-weight: 700; color: #166534;">Heterogeneous Nodes</div>
        <div style="font-size: 0.9rem; color: #15803d;">Different concrete types can coexist in the same tree (files, directories, symlinks), unified by the Component interface.</div>
      </div>
    </div>
  </div>
</div>

### Tree Traversal Strategies

Composite operations often require traversing the entire structure. The traversal order significantly impacts behavior:

**Pre-order (Parent Before Children)**
```python
def traverse_preorder(self, visitor):
    visitor.visit(self)  # Process parent first
    for child in self._children:
        child.traverse_preorder(visitor)
```
Use cases: Rendering (parent context needed first), serialization, copying

**Post-order (Children Before Parent)**
```python
def traverse_postorder(self, visitor):
    for child in self._children:
        child.traverse_postorder(visitor)
    visitor.visit(self)  # Process parent after children
```
Use cases: Size calculation (need child sizes first), deletion, dependency resolution

**Level-order (Breadth-First)**
```python
def traverse_levelorder(self, visitor):
    queue = deque([self])
    while queue:
        node = queue.popleft()
        visitor.visit(node)
        if hasattr(node, '_children'):
            queue.extend(node._children)
```
Use cases: Finding nearest match, shortest path, rendering layers

### Interview Questions: Tree Structures

<div style="background: linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%); border-radius: 12px; padding: 1.5rem; margin: 1rem 0; border: 1px solid #c4b5fd;">

**Level 1: What tree properties does the Composite pattern enforce, and why?**

The Composite pattern enforces:
1. **Acyclicity**: No node can be its own ancestor. This prevents infinite loops during recursive operations like `getSize()` or `render()`.
2. **Single parent**: Each node has at most one parent (or none for the root). This creates a true tree rather than a DAG.
3. **Uniform interface**: All nodes (leaves and composites) implement the same interface, enabling polymorphic treatment.

These properties ensure predictable traversal behavior and prevent pathological cases like infinite recursion or ambiguous paths.

**Level 2: How would you implement a Composite that allows multiple parents (DAG structure) while preventing cycles?**

A DAG (Directed Acyclic Graph) composite requires:

1. **Change parent reference to parent set**:
```python
class DAGComponent:
    def __init__(self):
        self.parents = set()  # Multiple parents allowed
```

2. **Cycle detection using DFS**:
```python
def can_add_child(self, potential_child):
    """Check if adding would create a cycle"""
    visited = set()

    def would_create_cycle(node):
        if node is self:
            return True
        if node in visited:
            return False
        visited.add(node)
        return any(would_create_cycle(p) for p in node.parents)

    return not would_create_cycle(potential_child)
```

3. **Adjust aggregation operations**:
```python
def get_total_size(self, visited=None):
    """Avoid double-counting in DAG"""
    if visited is None:
        visited = set()
    if id(self) in visited:
        return 0  # Already counted
    visited.add(id(self))

    if isinstance(self, Leaf):
        return self.size
    return sum(child.get_total_size(visited) for child in self.children)
```

Use cases: Symbolic links in file systems, shared UI components, build dependency graphs.

**Level 3: Design a Composite structure that supports efficient lowest common ancestor (LCA) queries for any two nodes in O(log n) time.**

Efficient LCA queries require preprocessing the tree:

**Solution: Binary Lifting with Euler Tour**

```python
import math

class LCAComposite:
    def __init__(self):
        self.children = []
        self.parent = None
        self.depth = 0
        self.index = -1
        # Binary lifting table: ancestors[k] = 2^k-th ancestor
        self.ancestors = []

    @classmethod
    def preprocess_tree(cls, root):
        """O(n log n) preprocessing for O(log n) LCA queries"""
        # Step 1: Assign depths and indices via DFS
        nodes = []
        stack = [(root, 0)]
        while stack:
            node, depth = stack.pop()
            node.depth = depth
            node.index = len(nodes)
            nodes.append(node)
            for child in reversed(node.children):
                stack.append((child, depth + 1))

        # Step 2: Build binary lifting table
        max_log = int(math.log2(len(nodes))) + 1
        for node in nodes:
            node.ancestors = [None] * max_log
            node.ancestors[0] = node.parent

            for k in range(1, max_log):
                if node.ancestors[k-1]:
                    node.ancestors[k] = node.ancestors[k-1].ancestors[k-1]

    @staticmethod
    def lca(u, v):
        """O(log n) LCA query after preprocessing"""
        # Bring to same depth
        if u.depth < v.depth:
            u, v = v, u

        diff = u.depth - v.depth
        for k in range(len(u.ancestors)):
            if (diff >> k) & 1:
                u = u.ancestors[k]

        if u is v:
            return u

        # Binary search for LCA
        for k in range(len(u.ancestors) - 1, -1, -1):
            if u.ancestors[k] is not v.ancestors[k]:
                u = u.ancestors[k]
                v = v.ancestors[k]

        return u.ancestors[0]
```

**Alternative: Heavy-Light Decomposition**
- Decomposes tree into chains
- O(log n) LCA using chain heads
- Also enables O(log n) path queries
- Used in competitive programming and database query optimization

**Practical applications**:
- Finding common directory ancestor for file operations
- UI component hierarchy queries
- Version control merge-base calculation

</div>

---

## Leaf vs Composite: The Fundamental Distinction

### Behavioral Differences

<div style="background: linear-gradient(135deg, #f8fafc 0%, #dbeafe 100%); border-radius: 16px; padding: 2rem; margin: 1.5rem 0; border: 1px solid #bfdbfe;">
  <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
    <div style="flex: 1; min-width: 280px; background: linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%); border: 2px solid #22c55e; border-radius: 12px; padding: 1.5rem;">
      <div style="font-weight: 700; color: #166534; font-size: 1.2rem; margin-bottom: 1rem; text-align: center;">Leaf</div>
      <div style="font-size: 0.9rem; color: #15803d;">
        <div style="margin-bottom: 0.75rem;"><strong>Structure:</strong> No children, terminal node</div>
        <div style="margin-bottom: 0.75rem;"><strong>Operations:</strong> Directly implements behavior</div>
        <div style="margin-bottom: 0.75rem;"><strong>add()/remove():</strong> Throws exception or no-op</div>
        <div style="margin-bottom: 0.75rem;"><strong>getChildren():</strong> Returns empty or throws</div>
        <div style="margin-bottom: 0.75rem;"><strong>Memory:</strong> Minimal overhead</div>
        <div><strong>Examples:</strong> File, MenuItem, PrimitiveShape</div>
      </div>
    </div>
    <div style="flex: 1; min-width: 280px; background: linear-gradient(135deg, #fef3c7 0%, #fffbeb 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 1.5rem;">
      <div style="font-weight: 700; color: #92400e; font-size: 1.2rem; margin-bottom: 1rem; text-align: center;">Composite</div>
      <div style="font-size: 0.9rem; color: #78350f;">
        <div style="margin-bottom: 0.75rem;"><strong>Structure:</strong> Contains children, internal node</div>
        <div style="margin-bottom: 0.75rem;"><strong>Operations:</strong> Delegates to children, aggregates</div>
        <div style="margin-bottom: 0.75rem;"><strong>add()/remove():</strong> Modifies child collection</div>
        <div style="margin-bottom: 0.75rem;"><strong>getChildren():</strong> Returns child collection</div>
        <div style="margin-bottom: 0.75rem;"><strong>Memory:</strong> Collection overhead + children</div>
        <div><strong>Examples:</strong> Directory, Menu, GroupShape</div>
      </div>
    </div>
  </div>
</div>

### Design Tension: Transparency vs Safety

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fff5f5 100%); border-radius: 12px; padding: 1.25rem; margin: 1rem 0; border-left: 4px solid #ef4444;">
  <div style="font-weight: 700; color: #dc2626; margin-bottom: 0.75rem;">Fundamental Trade-off</div>
  <div style="color: #7f1d1d;">
    <strong>Transparency Design:</strong> Component interface includes all operations (add, remove, getChildren). Leaves throw UnsupportedOperationException. Maximizes polymorphism but risks runtime errors.<br><br>
    <strong>Safety Design:</strong> Component interface contains only common operations. Child management only in Composite. Type-safe but requires downcasting or type checks.
  </div>
</div>

**Transparency Approach (Gang of Four default):**
```python
class Component(ABC):
    @abstractmethod
    def operation(self): pass

    def add(self, component):
        raise NotImplementedError("Leaf cannot have children")

    def remove(self, component):
        raise NotImplementedError("Leaf cannot have children")

    def get_child(self, index):
        raise NotImplementedError("Leaf cannot have children")

    def is_composite(self):
        return False
```

**Safety Approach (Type-safe):**
```python
class Component(ABC):
    @abstractmethod
    def operation(self): pass

class Leaf(Component):
    def operation(self):
        return self.do_work()

class Composite(Component):
    def add(self, component): ...
    def remove(self, component): ...
    def get_children(self): ...

    def operation(self):
        return aggregate(child.operation() for child in self._children)
```

### Hybrid Approaches in Production Systems

**React's Approach:** Uses transparency with runtime validation. All elements can theoretically have children, but primitive DOM elements (like `<input>`) warn when children are passed.

**Java AWT/Swing:** Uses safety. `Container` extends `Component` and adds child management. Non-containers simply lack these methods.

**DOM API:** Uses transparency with lenient behavior. All nodes have `childNodes`, but text nodes return empty NodeList instead of throwing.

### Interview Questions: Leaf vs Composite

<div style="background: linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%); border-radius: 12px; padding: 1.5rem; margin: 1rem 0; border: 1px solid #c4b5fd;">

**Level 1: Why do we need separate Leaf and Composite classes if they implement the same interface?**

The separation exists because of fundamentally different internal behaviors:

1. **State differences**: Composites maintain a child collection; leaves have no such overhead
2. **Operation semantics**: For aggregation operations, leaves return atomic values while composites aggregate over children
3. **Memory efficiency**: Leaves avoid the collection allocation overhead
4. **Type safety**: Separate classes enable compile-time prevention of invalid operations (in safety design)

The shared interface enables polymorphic treatment despite different implementations.

**Level 2: How would you design a Composite where the leaf/composite distinction can change at runtime?**

This is the "dynamic composite" problem. A node that starts as a leaf should be promotable to a composite:

```python
class FlexibleComponent:
    def __init__(self, name):
        self.name = name
        self._children = None  # None = leaf, list = composite
        self.parent = None

    @property
    def is_composite(self):
        return self._children is not None

    def promote_to_composite(self):
        """Convert leaf to composite"""
        if self._children is None:
            self._children = []

    def demote_to_leaf(self):
        """Convert composite to leaf (must be empty)"""
        if self._children is not None:
            if len(self._children) > 0:
                raise InvalidOperationError("Cannot demote non-empty composite")
            self._children = None

    def add(self, child):
        if self._children is None:
            # Auto-promote to composite
            self._children = []
        self._children.append(child)
        child.parent = self
```

**Real-world example**: macOS Finder allows converting empty folders to file bundles and vice versa. VSCode allows files to become "virtual folders" when opened as workspace roots.

**Level 3: Design a type system that statically guarantees composite operations are only called on composites while maintaining polymorphic operation dispatch.**

This requires encoding the leaf/composite distinction in the type system:

**Approach 1: Phantom Types (TypeScript/Scala)**
```typescript
type NodeType = 'leaf' | 'composite';

interface Component<T extends NodeType> {
    operation(): number;
}

interface Leaf extends Component<'leaf'> {
    readonly _brand: 'leaf';
}

interface Composite extends Component<'composite'> {
    readonly _brand: 'composite';
    add(child: Component<NodeType>): void;
    remove(child: Component<NodeType>): void;
    children: ReadonlyArray<Component<NodeType>>;
}

// This function only accepts composites at compile time
function addMultiple<T extends Composite>(
    parent: T,
    children: Component<NodeType>[]
): void {
    children.forEach(c => parent.add(c));
}
```

**Approach 2: Visitor with Type-Safe Dispatch**
```python
from typing import TypeVar, Generic

T = TypeVar('T')

class ComponentVisitor(Generic[T]):
    def visit_leaf(self, leaf: 'Leaf') -> T: ...
    def visit_composite(self, composite: 'Composite') -> T: ...

class Component(ABC):
    @abstractmethod
    def accept(self, visitor: ComponentVisitor[T]) -> T: ...

class Leaf(Component):
    def accept(self, visitor):
        return visitor.visit_leaf(self)

class Composite(Component):
    def accept(self, visitor):
        return visitor.visit_composite(self)

# Type-safe operations that only work on composites
class ChildAdder(ComponentVisitor[None]):
    def __init__(self, child: Component):
        self.child = child

    def visit_leaf(self, leaf):
        raise TypeError("Cannot add children to leaf")

    def visit_composite(self, composite):
        composite._children.append(self.child)
```

**Approach 3: Rust-style Enums with Pattern Matching**
```rust
enum Component {
    Leaf { name: String, data: Vec<u8> },
    Composite { name: String, children: Vec<Component> },
}

impl Component {
    fn add_child(&mut self, child: Component) -> Result<(), Error> {
        match self {
            Component::Composite { children, .. } => {
                children.push(child);
                Ok(())
            }
            Component::Leaf { .. } => {
                Err(Error::CannotAddToLeaf)
            }
        }
    }
}
```

Each approach trades off ergonomics, compile-time safety, and expressiveness differently.

</div>

---

## File System: The Canonical Example

### Real File System Internals

Understanding how actual file systems implement composite-like structures illuminates design decisions:

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #cbd5e1;">
  <div style="font-weight: 700; color: #1e40af; margin-bottom: 1rem; font-size: 1.1rem;">Unix Inode Architecture</div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
    <div style="background: white; border-radius: 10px; padding: 1rem; border-left: 3px solid #3b82f6;">
      <div style="font-weight: 600; color: #1e40af; margin-bottom: 0.5rem;">Inode (Component)</div>
      <div style="font-size: 0.85rem; color: #475569;">Metadata structure containing permissions, timestamps, size, and data block pointers. Both files and directories have inodes.</div>
    </div>
    <div style="background: white; border-radius: 10px; padding: 1rem; border-left: 3px solid #22c55e;">
      <div style="font-weight: 600; color: #166534; margin-bottom: 0.5rem;">Regular File (Leaf)</div>
      <div style="font-size: 0.85rem; color: #475569;">Inode points to data blocks containing file content. No child references. Size is actual content size.</div>
    </div>
    <div style="background: white; border-radius: 10px; padding: 1rem; border-left: 3px solid #f59e0b;">
      <div style="font-weight: 600; color: #92400e; margin-bottom: 0.5rem;">Directory (Composite)</div>
      <div style="font-size: 0.85rem; color: #475569;">Inode points to data blocks containing directory entries (name -> inode mappings). Children are inode references, not embedded data.</div>
    </div>
    <div style="background: white; border-radius: 10px; padding: 1rem; border-left: 3px solid #8b5cf6;">
      <div style="font-weight: 600; color: #6d28d9; margin-bottom: 0.5rem;">Symbolic Link (Special Leaf)</div>
      <div style="font-size: 0.85rem; color: #475569;">Inode contains path string. Creates DAG-like structure. Must handle in traversal to avoid infinite loops.</div>
    </div>
  </div>
</div>

### Complete File System Implementation

```python
from abc import ABC, abstractmethod
from typing import List, Optional, Iterator, Dict, Set
from datetime import datetime
from dataclasses import dataclass, field
from enum import Enum, auto
import hashlib

class Permission(Enum):
    READ = auto()
    WRITE = auto()
    EXECUTE = auto()

@dataclass
class Metadata:
    """Shared metadata for all file system components"""
    created_at: datetime = field(default_factory=datetime.now)
    modified_at: datetime = field(default_factory=datetime.now)
    accessed_at: datetime = field(default_factory=datetime.now)
    owner: str = "root"
    group: str = "root"
    permissions: Dict[str, Set[Permission]] = field(default_factory=lambda: {
        "owner": {Permission.READ, Permission.WRITE},
        "group": {Permission.READ},
        "other": {Permission.READ}
    })

class FileSystemError(Exception):
    """Base exception for file system operations"""
    pass

class CycleDetectedError(FileSystemError):
    """Raised when operation would create a cycle"""
    pass

class PermissionDeniedError(FileSystemError):
    """Raised when operation lacks required permissions"""
    pass

class FileSystemComponent(ABC):
    """
    Component interface for file system elements.

    Design decisions:
    - Parent reference maintained for path computation and upward traversal
    - Metadata separated into dataclass for clean serialization
    - Abstract methods define the polymorphic interface
    """

    def __init__(self, name: str):
        self._validate_name(name)
        self.name = name
        self.parent: Optional['Directory'] = None
        self.metadata = Metadata()

    @staticmethod
    def _validate_name(name: str) -> None:
        """Validate file/directory name"""
        if not name:
            raise ValueError("Name cannot be empty")
        if '/' in name or '\\' in name:
            raise ValueError("Name cannot contain path separators")
        if name in ('.', '..'):
            raise ValueError("Name cannot be . or ..")

    @abstractmethod
    def get_size(self) -> int:
        """Returns size in bytes - semantic differs for leaves and composites"""
        pass

    @abstractmethod
    def clone(self) -> 'FileSystemComponent':
        """Deep clone the component and its descendants"""
        pass

    @abstractmethod
    def accept(self, visitor: 'FileSystemVisitor') -> None:
        """Accept a visitor for extensible operations"""
        pass

    def get_path(self) -> str:
        """
        Compute full path by walking up parent chain.
        Time complexity: O(depth)
        """
        parts = []
        current = self
        while current is not None:
            parts.append(current.name)
            current = current.parent
        return '/'.join(reversed(parts))

    def get_depth(self) -> int:
        """Return depth from root (root = 0)"""
        depth = 0
        current = self.parent
        while current is not None:
            depth += 1
            current = current.parent
        return depth

    def get_root(self) -> 'FileSystemComponent':
        """Navigate to root of the tree"""
        current = self
        while current.parent is not None:
            current = current.parent
        return current

    def is_ancestor_of(self, other: 'FileSystemComponent') -> bool:
        """Check if this component is an ancestor of other"""
        current = other.parent
        while current is not None:
            if current is self:
                return True
            current = current.parent
        return False

    def touch(self) -> None:
        """Update access and modification times"""
        now = datetime.now()
        self.metadata.accessed_at = now
        self.metadata.modified_at = now


class File(FileSystemComponent):
    """
    Leaf node representing a file with content.

    Design decisions:
    - Content stored as bytes for binary file support
    - Lazy hash computation with caching
    - Size derived from content, not stored separately
    """

    def __init__(self, name: str, content: bytes = b""):
        super().__init__(name)
        self._content = content
        self._content_hash: Optional[str] = None

    @property
    def content(self) -> bytes:
        self.metadata.accessed_at = datetime.now()
        return self._content

    @content.setter
    def content(self, value: bytes) -> None:
        self._content = value
        self._content_hash = None  # Invalidate cache
        self.touch()

    def get_size(self) -> int:
        """File size is content length"""
        return len(self._content)

    def get_hash(self) -> str:
        """Compute SHA-256 hash of content with caching"""
        if self._content_hash is None:
            self._content_hash = hashlib.sha256(self._content).hexdigest()
        return self._content_hash

    def clone(self) -> 'File':
        """Create independent copy of file"""
        cloned = File(self.name, self._content)
        cloned.metadata = Metadata(
            created_at=datetime.now(),
            modified_at=datetime.now(),
            owner=self.metadata.owner,
            group=self.metadata.group,
            permissions=dict(self.metadata.permissions)
        )
        return cloned

    def accept(self, visitor: 'FileSystemVisitor') -> None:
        visitor.visit_file(self)

    def read(self, encoding: str = 'utf-8') -> str:
        """Read content as text"""
        return self._content.decode(encoding)

    def write(self, text: str, encoding: str = 'utf-8') -> None:
        """Write text content"""
        self.content = text.encode(encoding)


class Directory(FileSystemComponent):
    """
    Composite node representing a directory containing other components.

    Design decisions:
    - Children stored in dict for O(1) name lookup
    - Maintains insertion order (Python 3.7+) for consistent iteration
    - Size computation is recursive and uncached (trade-off: simplicity vs performance)
    """

    def __init__(self, name: str):
        super().__init__(name)
        self._children: Dict[str, FileSystemComponent] = {}

    def add(self, component: FileSystemComponent) -> 'Directory':
        """
        Add a child component with cycle detection and reparenting.
        Returns self for method chaining.

        Raises:
            CycleDetectedError: If adding would create a cycle
            ValueError: If name already exists
        """
        # Cycle detection: verify component isn't an ancestor
        if component.is_ancestor_of(self):
            raise CycleDetectedError(
                f"Cannot add '{component.name}' as it would create a cycle"
            )

        # Handle duplicate names
        if component.name in self._children:
            raise ValueError(f"'{component.name}' already exists in '{self.name}'")

        # Reparent if necessary
        if component.parent is not None:
            component.parent.remove(component)

        # Establish relationship
        component.parent = self
        self._children[component.name] = component
        self.touch()

        return self

    def remove(self, component: FileSystemComponent) -> bool:
        """
        Remove a child component.
        Returns True if removed, False if not found.
        """
        if component.name in self._children and self._children[component.name] is component:
            del self._children[component.name]
            component.parent = None
            self.touch()
            return True
        return False

    def get_child(self, name: str) -> Optional[FileSystemComponent]:
        """Get child by name, O(1) lookup"""
        return self._children.get(name)

    def get_children(self) -> List[FileSystemComponent]:
        """Return list of children (defensive copy)"""
        return list(self._children.values())

    def __contains__(self, name: str) -> bool:
        """Enable 'in' operator for name checking"""
        return name in self._children

    def __iter__(self) -> Iterator[FileSystemComponent]:
        """Iterate over direct children"""
        return iter(self._children.values())

    def get_size(self) -> int:
        """
        Recursively compute total size of all descendants.
        Time complexity: O(n) where n = total nodes in subtree
        """
        return sum(child.get_size() for child in self._children.values())

    def clone(self) -> 'Directory':
        """Deep clone directory and all contents"""
        cloned = Directory(self.name)
        cloned.metadata = Metadata(
            created_at=datetime.now(),
            modified_at=datetime.now(),
            owner=self.metadata.owner,
            group=self.metadata.group,
            permissions=dict(self.metadata.permissions)
        )
        for child in self._children.values():
            cloned.add(child.clone())
        return cloned

    def accept(self, visitor: 'FileSystemVisitor') -> None:
        visitor.visit_directory(self)

    def walk(self) -> Iterator[FileSystemComponent]:
        """
        Recursively iterate over all descendants (pre-order).
        Yields self, then recursively yields all descendants.
        """
        yield self
        for child in self._children.values():
            if isinstance(child, Directory):
                yield from child.walk()
            else:
                yield child

    def find(self, predicate) -> List[FileSystemComponent]:
        """Find all descendants matching predicate"""
        return [node for node in self.walk() if predicate(node)]

    def count_files(self) -> int:
        """Count total files in subtree"""
        return sum(1 for node in self.walk() if isinstance(node, File))

    def count_directories(self) -> int:
        """Count total directories in subtree (including self)"""
        return sum(1 for node in self.walk() if isinstance(node, Directory))


class SymbolicLink(FileSystemComponent):
    """
    Special leaf that references another path.

    Design decisions:
    - Stores target path, not resolved reference (allows dangling links)
    - Resolution happens at access time
    - Must handle in traversal to prevent infinite loops
    """

    def __init__(self, name: str, target_path: str):
        super().__init__(name)
        self.target_path = target_path
        self._resolved_target: Optional[FileSystemComponent] = None

    def resolve(self, root: FileSystemComponent) -> Optional[FileSystemComponent]:
        """
        Resolve the symbolic link to its target.
        Returns None if target doesn't exist (dangling link).
        """
        parts = self.target_path.strip('/').split('/')
        current = root

        for part in parts:
            if not part:
                continue
            if not isinstance(current, Directory):
                return None
            current = current.get_child(part)
            if current is None:
                return None
            # Recursive resolution for chained symlinks
            if isinstance(current, SymbolicLink):
                current = current.resolve(root)
                if current is None:
                    return None

        return current

    def get_size(self) -> int:
        """Symlink size is the length of the target path string"""
        return len(self.target_path.encode('utf-8'))

    def clone(self) -> 'SymbolicLink':
        return SymbolicLink(self.name, self.target_path)

    def accept(self, visitor: 'FileSystemVisitor') -> None:
        visitor.visit_symlink(self)


class FileSystemVisitor(ABC):
    """
    Visitor interface for extensible operations on file system.
    See [[visitor]](/topic/design-patterns/visitor) pattern.
    """

    @abstractmethod
    def visit_file(self, file: File) -> None:
        pass

    @abstractmethod
    def visit_directory(self, directory: Directory) -> None:
        pass

    @abstractmethod
    def visit_symlink(self, symlink: SymbolicLink) -> None:
        pass


class SizeCalculatorVisitor(FileSystemVisitor):
    """Calculate total size with detailed breakdown"""

    def __init__(self):
        self.total_size = 0
        self.file_count = 0
        self.dir_count = 0
        self.symlink_count = 0

    def visit_file(self, file: File) -> None:
        self.total_size += file.get_size()
        self.file_count += 1

    def visit_directory(self, directory: Directory) -> None:
        self.dir_count += 1
        for child in directory:
            child.accept(self)

    def visit_symlink(self, symlink: SymbolicLink) -> None:
        self.symlink_count += 1
        self.total_size += symlink.get_size()


class SearchVisitor(FileSystemVisitor):
    """Search for components matching criteria"""

    def __init__(self, predicate):
        self.predicate = predicate
        self.results: List[FileSystemComponent] = []

    def visit_file(self, file: File) -> None:
        if self.predicate(file):
            self.results.append(file)

    def visit_directory(self, directory: Directory) -> None:
        if self.predicate(directory):
            self.results.append(directory)
        for child in directory:
            child.accept(self)

    def visit_symlink(self, symlink: SymbolicLink) -> None:
        if self.predicate(symlink):
            self.results.append(symlink)
```

### Interview Questions: File System

<div style="background: linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%); border-radius: 12px; padding: 1.5rem; margin: 1rem 0; border: 1px solid #c4b5fd;">

**Level 1: Why is a file system a good example of the Composite pattern?**

File systems exemplify Composite because:

1. **Natural hierarchy**: Directories contain files and other directories, forming a tree
2. **Uniform operations**: Both files and directories support `getSize()`, `delete()`, `move()`, `copy()`, permissions
3. **Recursive structure**: A directory's size is the sum of its contents' sizes
4. **Part-whole semantics**: A directory IS a collection of file system elements
5. **Variable depth**: Nesting can be arbitrarily deep

The pattern enables treating a single file and a complex directory tree identically through the common interface.

**Level 2: How would you implement efficient size caching in a file system Composite, handling invalidation correctly?**

Size caching requires a cache invalidation strategy that propagates changes up the tree:

```python
class CachedDirectory(Directory):
    def __init__(self, name: str):
        super().__init__(name)
        self._cached_size: Optional[int] = None

    def _invalidate_size_cache(self) -> None:
        """Invalidate this node's cache and all ancestors'"""
        self._cached_size = None
        if self.parent is not None:
            self.parent._invalidate_size_cache()

    def add(self, component: FileSystemComponent) -> 'CachedDirectory':
        result = super().add(component)
        self._invalidate_size_cache()
        return result

    def remove(self, component: FileSystemComponent) -> bool:
        result = super().remove(component)
        if result:
            self._invalidate_size_cache()
        return result

    def get_size(self) -> int:
        if self._cached_size is None:
            self._cached_size = sum(child.get_size() for child in self._children.values())
        return self._cached_size

class CachedFile(File):
    @property
    def content(self) -> bytes:
        return self._content

    @content.setter
    def content(self, value: bytes) -> None:
        self._content = value
        self._content_hash = None
        # Invalidate ancestor caches
        if self.parent is not None:
            self.parent._invalidate_size_cache()
```

**Trade-offs**:
- Write operations become O(depth) due to cache invalidation
- Read operations become O(1) after initial computation
- Memory overhead: one integer per directory
- Suitable when reads >> writes

**Alternative**: Event-based invalidation using [[observer]](/topic/design-patterns/observer) pattern.

**Level 3: Design a distributed file system's metadata layer using the Composite pattern, handling partition tolerance and consistency.**

A distributed file system metadata layer must handle network partitions while maintaining a coherent tree structure:

**Architecture:**

```python
from typing import Dict, Set, Tuple
from dataclasses import dataclass
from enum import Enum
import uuid

class ConsistencyLevel(Enum):
    EVENTUAL = auto()      # Fastest, may see stale data
    READ_YOUR_WRITES = auto()  # See own writes immediately
    STRONG = auto()        # Linearizable, slowest

@dataclass
class VectorClock:
    """Causality tracking for conflict detection"""
    clocks: Dict[str, int]

    def increment(self, node_id: str) -> 'VectorClock':
        new_clocks = dict(self.clocks)
        new_clocks[node_id] = new_clocks.get(node_id, 0) + 1
        return VectorClock(new_clocks)

    def merge(self, other: 'VectorClock') -> 'VectorClock':
        merged = dict(self.clocks)
        for k, v in other.clocks.items():
            merged[k] = max(merged.get(k, 0), v)
        return VectorClock(merged)

    def happens_before(self, other: 'VectorClock') -> bool:
        return (all(self.clocks.get(k, 0) <= v for k, v in other.clocks.items()) and
                any(self.clocks.get(k, 0) < v for k, v in other.clocks.items()))

@dataclass
class DistributedMetadata:
    """Replicated metadata entry"""
    component_id: str
    name: str
    parent_id: Optional[str]
    is_directory: bool
    size: int
    vector_clock: VectorClock
    deleted: bool = False  # Tombstone for deletions

class MetadataPartition:
    """Single partition of metadata (runs on one node)"""

    def __init__(self, node_id: str, partition_id: int):
        self.node_id = node_id
        self.partition_id = partition_id
        self.entries: Dict[str, DistributedMetadata] = {}
        self.pending_sync: Set[str] = set()

    def local_add(self, parent_id: str, name: str, is_directory: bool) -> str:
        """Create new entry in this partition"""
        component_id = str(uuid.uuid4())
        clock = VectorClock({self.node_id: 1})

        entry = DistributedMetadata(
            component_id=component_id,
            name=name,
            parent_id=parent_id,
            is_directory=is_directory,
            size=0,
            vector_clock=clock
        )

        self.entries[component_id] = entry
        self.pending_sync.add(component_id)
        return component_id

    def receive_update(self, entry: DistributedMetadata) -> Tuple[bool, Optional[str]]:
        """
        Receive replicated update from another node.
        Returns (accepted, conflict_resolution_needed)
        """
        existing = self.entries.get(entry.component_id)

        if existing is None:
            # New entry, accept
            self.entries[entry.component_id] = entry
            return True, None

        if entry.vector_clock.happens_before(existing.vector_clock):
            # Stale update, ignore
            return False, None

        if existing.vector_clock.happens_before(entry.vector_clock):
            # Newer update, accept
            self.entries[entry.component_id] = entry
            return True, None

        # Concurrent updates - conflict!
        # Resolution strategy: Last-writer-wins with deterministic tiebreaker
        conflict_id = self._resolve_conflict(existing, entry)
        return True, conflict_id

    def _resolve_conflict(
        self,
        local: DistributedMetadata,
        remote: DistributedMetadata
    ) -> str:
        """
        Resolve concurrent update conflict.
        Strategy: Merge clocks, keep higher node_id's changes
        """
        merged_clock = local.vector_clock.merge(remote.vector_clock)

        # Deterministic winner selection
        if max(local.vector_clock.clocks.keys()) > max(remote.vector_clock.clocks.keys()):
            winner = local
        else:
            winner = remote

        winner.vector_clock = merged_clock
        self.entries[winner.component_id] = winner

        # Return conflict marker for user resolution
        return f"conflict:{local.component_id}"

class DistributedFileSystem:
    """
    Distributed composite file system with eventual consistency.
    Uses consistent hashing to partition metadata across nodes.
    """

    def __init__(self, node_id: str, num_partitions: int, replication_factor: int = 3):
        self.node_id = node_id
        self.partitions: Dict[int, MetadataPartition] = {}
        self.num_partitions = num_partitions
        self.replication_factor = replication_factor

    def _get_partition(self, component_id: str) -> int:
        """Consistent hash to determine owning partition"""
        return hash(component_id) % self.num_partitions

    def create_file(
        self,
        parent_path: str,
        name: str,
        consistency: ConsistencyLevel = ConsistencyLevel.READ_YOUR_WRITES
    ) -> str:
        """
        Create file with specified consistency level.

        EVENTUAL: Fire and forget, return immediately
        READ_YOUR_WRITES: Wait for local partition ack
        STRONG: Wait for quorum ack
        """
        parent_id = self._resolve_path(parent_path)
        partition_id = self._get_partition(parent_id)

        component_id = self.partitions[partition_id].local_add(
            parent_id, name, is_directory=False
        )

        if consistency == ConsistencyLevel.STRONG:
            self._wait_for_quorum(component_id)
        elif consistency == ConsistencyLevel.READ_YOUR_WRITES:
            self._wait_for_local(component_id)

        return component_id

    def list_directory(
        self,
        path: str,
        consistency: ConsistencyLevel = ConsistencyLevel.EVENTUAL
    ) -> List[DistributedMetadata]:
        """
        List directory contents with specified consistency.

        Note: EVENTUAL may return stale or incomplete results during partitions.
        """
        dir_id = self._resolve_path(path)

        if consistency == ConsistencyLevel.STRONG:
            # Read from quorum of replicas
            return self._quorum_read_children(dir_id)
        else:
            # Read from local partition only
            return self._local_read_children(dir_id)
```

**Key design decisions**:
1. **Vector clocks** for causality tracking and conflict detection
2. **Tombstones** for deletion to handle create-delete-create races
3. **Consistent hashing** for partition assignment
4. **Tunable consistency** levels per operation
5. **Conflict resolution** with deterministic merge semantics

**CAP theorem implications**:
- During partition: Choose AP (availability) with eventual consistency
- After partition heals: Reconcile conflicts using vector clocks
- Strong consistency operations block during partitions

</div>

---

## UI Component Hierarchies

### React Virtual DOM as Composite

React's component model is a sophisticated Composite implementation:

<div style="background: linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%); border-radius: 16px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #93c5fd;">
  <div style="font-weight: 700; color: #1e40af; margin-bottom: 1rem; font-size: 1.1rem;">React Element Structure</div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
    <div style="background: white; border-radius: 10px; padding: 1rem;">
      <div style="font-weight: 600; color: #3b82f6; margin-bottom: 0.5rem;">Element (Component)</div>
      <div style="font-size: 0.85rem; color: #475569; font-family: monospace;">{ type, props, key, ref }</div>
    </div>
    <div style="background: white; border-radius: 10px; padding: 1rem;">
      <div style="font-weight: 600; color: #22c55e; margin-bottom: 0.5rem;">DOM Element (Leaf)</div>
      <div style="font-size: 0.85rem; color: #475569; font-family: monospace;">type: 'div' | 'span' | ...</div>
    </div>
    <div style="background: white; border-radius: 10px; padding: 1rem;">
      <div style="font-weight: 600; color: #f59e0b; margin-bottom: 0.5rem;">Component (Composite)</div>
      <div style="font-size: 0.85rem; color: #475569; font-family: monospace;">type: Function | Class</div>
    </div>
    <div style="background: white; border-radius: 10px; padding: 1rem;">
      <div style="font-weight: 600; color: #8b5cf6; margin-bottom: 0.5rem;">Fragment (Virtual Composite)</div>
      <div style="font-size: 0.85rem; color: #475569; font-family: monospace;">type: Symbol(react.fragment)</div>
    </div>
  </div>
</div>

### UI Component Implementation

```python
from abc import ABC, abstractmethod
from typing import List, Optional, Tuple, Callable, Any, Dict
from dataclasses import dataclass, field
from enum import Enum, auto

@dataclass
class Rect:
    """Bounding rectangle for layout"""
    x: float
    y: float
    width: float
    height: float

    def contains(self, px: float, py: float) -> bool:
        return (self.x <= px < self.x + self.width and
                self.y <= py < self.y + self.height)

    def intersects(self, other: 'Rect') -> bool:
        return not (self.x + self.width <= other.x or
                   other.x + other.width <= self.x or
                   self.y + self.height <= other.y or
                   other.y + other.height <= self.y)

@dataclass
class RenderContext:
    """Context passed during render traversal"""
    canvas: Any  # Platform-specific canvas
    clip_rect: Rect
    scale: float = 1.0
    opacity: float = 1.0
    transform: Tuple[float, ...] = (1, 0, 0, 1, 0, 0)  # 2D affine matrix

class EventType(Enum):
    CLICK = auto()
    MOUSE_DOWN = auto()
    MOUSE_UP = auto()
    MOUSE_MOVE = auto()
    KEY_DOWN = auto()
    KEY_UP = auto()
    FOCUS = auto()
    BLUR = auto()

@dataclass
class Event:
    """UI event with propagation control"""
    type: EventType
    target: Optional['UIComponent'] = None
    x: float = 0
    y: float = 0
    key: str = ""
    _propagation_stopped: bool = False
    _default_prevented: bool = False

    def stop_propagation(self) -> None:
        self._propagation_stopped = True

    def prevent_default(self) -> None:
        self._default_prevented = True

class UIComponent(ABC):
    """
    Abstract base for UI components implementing Composite pattern.

    Design features:
    - Layout computation with dirty flag optimization
    - Event bubbling through component hierarchy
    - Render with clipping and transformation
    - Focus management
    """

    def __init__(self):
        self.parent: Optional['Container'] = None
        self.bounds = Rect(0, 0, 0, 0)
        self._layout_dirty = True
        self._visible = True
        self._enabled = True
        self._focusable = False
        self._focused = False
        self._event_handlers: Dict[EventType, List[Callable]] = {}

    @abstractmethod
    def get_preferred_size(self) -> Tuple[float, float]:
        """Return preferred width, height"""
        pass

    @abstractmethod
    def render(self, ctx: RenderContext) -> None:
        """Render component to canvas"""
        pass

    def layout(self, available_rect: Rect) -> None:
        """
        Compute layout within available space.
        Override in containers for custom layout logic.
        """
        pref_w, pref_h = self.get_preferred_size()
        self.bounds = Rect(
            available_rect.x,
            available_rect.y,
            min(pref_w, available_rect.width),
            min(pref_h, available_rect.height)
        )
        self._layout_dirty = False

    def invalidate_layout(self) -> None:
        """Mark layout as needing recomputation"""
        self._layout_dirty = True
        if self.parent:
            self.parent.invalidate_layout()

    def add_event_handler(self, event_type: EventType, handler: Callable) -> None:
        """Register event handler"""
        if event_type not in self._event_handlers:
            self._event_handlers[event_type] = []
        self._event_handlers[event_type].append(handler)

    def handle_event(self, event: Event) -> bool:
        """
        Handle event and bubble to parent.
        Returns True if event was handled.
        """
        if not self._enabled:
            return False

        handlers = self._event_handlers.get(event.type, [])
        for handler in handlers:
            handler(event)
            if event._propagation_stopped:
                return True

        # Bubble to parent (unless stopped)
        if self.parent and not event._propagation_stopped:
            return self.parent.handle_event(event)

        return len(handlers) > 0

    def hit_test(self, x: float, y: float) -> Optional['UIComponent']:
        """
        Find deepest component at coordinates.
        Override in containers to check children first.
        """
        if self._visible and self.bounds.contains(x, y):
            return self
        return None

    def focus(self) -> bool:
        """Request focus for this component"""
        if not self._focusable or not self._enabled:
            return False

        # Unfocus current focus holder
        root = self._get_root()
        if root._focused_component and root._focused_component is not self:
            root._focused_component._focused = False
            root._focused_component.handle_event(Event(EventType.BLUR))

        self._focused = True
        root._focused_component = self
        self.handle_event(Event(EventType.FOCUS))
        return True

    def _get_root(self) -> 'UIComponent':
        current = self
        while current.parent:
            current = current.parent
        return current


class Label(UIComponent):
    """Leaf component displaying text"""

    def __init__(self, text: str, font_size: float = 14):
        super().__init__()
        self.text = text
        self.font_size = font_size
        self.color = "#000000"

    def get_preferred_size(self) -> Tuple[float, float]:
        # Simplified: approximate width based on character count
        width = len(self.text) * self.font_size * 0.6
        height = self.font_size * 1.2
        return width, height

    def render(self, ctx: RenderContext) -> None:
        if not self._visible:
            return
        ctx.canvas.draw_text(
            self.text,
            self.bounds.x,
            self.bounds.y + self.font_size,
            self.font_size,
            self.color
        )


class Button(UIComponent):
    """Leaf component for clickable button"""

    def __init__(self, text: str, on_click: Optional[Callable] = None):
        super().__init__()
        self.text = text
        self._focusable = True
        self._hovered = False
        self._pressed = False

        if on_click:
            self.add_event_handler(EventType.CLICK, lambda e: on_click())

    def get_preferred_size(self) -> Tuple[float, float]:
        text_width = len(self.text) * 8
        return text_width + 24, 32  # Add padding

    def render(self, ctx: RenderContext) -> None:
        if not self._visible:
            return

        # Determine background color based on state
        if self._pressed:
            bg_color = "#0066cc"
        elif self._hovered:
            bg_color = "#4499ff"
        elif self._focused:
            bg_color = "#3388ee"
        else:
            bg_color = "#0088ff"

        ctx.canvas.draw_rect(self.bounds, bg_color)
        ctx.canvas.draw_text(
            self.text,
            self.bounds.x + 12,
            self.bounds.y + 20,
            14,
            "#ffffff"
        )


class Container(UIComponent):
    """
    Composite component that contains child components.

    Base container provides:
    - Child management (add/remove)
    - Hit testing with child delegation
    - Event bubbling
    - Layout coordination
    """

    def __init__(self):
        super().__init__()
        self._children: List[UIComponent] = []
        self._focused_component: Optional[UIComponent] = None

    def add(self, child: UIComponent) -> 'Container':
        """Add child component"""
        if child.parent:
            child.parent.remove(child)
        child.parent = self
        self._children.append(child)
        self.invalidate_layout()
        return self

    def remove(self, child: UIComponent) -> bool:
        """Remove child component"""
        if child in self._children:
            self._children.remove(child)
            child.parent = None
            self.invalidate_layout()
            return True
        return False

    def get_children(self) -> List[UIComponent]:
        return list(self._children)

    def hit_test(self, x: float, y: float) -> Optional[UIComponent]:
        """Check children first (front to back), then self"""
        if not self._visible or not self.bounds.contains(x, y):
            return None

        # Check children in reverse order (last added = front)
        for child in reversed(self._children):
            hit = child.hit_test(x, y)
            if hit:
                return hit

        return self  # Click on container background

    def render(self, ctx: RenderContext) -> None:
        """Render self, then children"""
        if not self._visible:
            return

        # Render container background
        self._render_background(ctx)

        # Create clipped context for children
        child_ctx = RenderContext(
            canvas=ctx.canvas,
            clip_rect=self.bounds,
            scale=ctx.scale,
            opacity=ctx.opacity
        )

        # Render children
        for child in self._children:
            if child.bounds.intersects(child_ctx.clip_rect):
                child.render(child_ctx)

    def _render_background(self, ctx: RenderContext) -> None:
        """Override to customize container background"""
        pass

    def get_preferred_size(self) -> Tuple[float, float]:
        """Default: union of children preferred sizes"""
        if not self._children:
            return 0, 0

        max_width = max(child.get_preferred_size()[0] for child in self._children)
        max_height = max(child.get_preferred_size()[1] for child in self._children)
        return max_width, max_height


class VerticalLayout(Container):
    """Container with vertical stacking layout"""

    def __init__(self, spacing: float = 8):
        super().__init__()
        self.spacing = spacing
        self.padding = 8

    def layout(self, available_rect: Rect) -> None:
        self.bounds = available_rect

        y = available_rect.y + self.padding
        available_width = available_rect.width - 2 * self.padding

        for child in self._children:
            pref_w, pref_h = child.get_preferred_size()
            child.layout(Rect(
                available_rect.x + self.padding,
                y,
                min(pref_w, available_width),
                pref_h
            ))
            y += child.bounds.height + self.spacing

        self._layout_dirty = False

    def get_preferred_size(self) -> Tuple[float, float]:
        if not self._children:
            return 2 * self.padding, 2 * self.padding

        total_height = 2 * self.padding + (len(self._children) - 1) * self.spacing
        max_width = 0

        for child in self._children:
            w, h = child.get_preferred_size()
            max_width = max(max_width, w)
            total_height += h

        return max_width + 2 * self.padding, total_height


class HorizontalLayout(Container):
    """Container with horizontal stacking layout"""

    def __init__(self, spacing: float = 8):
        super().__init__()
        self.spacing = spacing
        self.padding = 8

    def layout(self, available_rect: Rect) -> None:
        self.bounds = available_rect

        x = available_rect.x + self.padding
        available_height = available_rect.height - 2 * self.padding

        for child in self._children:
            pref_w, pref_h = child.get_preferred_size()
            child.layout(Rect(
                x,
                available_rect.y + self.padding,
                pref_w,
                min(pref_h, available_height)
            ))
            x += child.bounds.width + self.spacing

        self._layout_dirty = False

    def get_preferred_size(self) -> Tuple[float, float]:
        if not self._children:
            return 2 * self.padding, 2 * self.padding

        total_width = 2 * self.padding + (len(self._children) - 1) * self.spacing
        max_height = 0

        for child in self._children:
            w, h = child.get_preferred_size()
            max_height = max(max_height, h)
            total_width += w

        return total_width, max_height + 2 * self.padding
```

### Interview Questions: UI Component Hierarchies

<div style="background: linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%); border-radius: 12px; padding: 1.5rem; margin: 1rem 0; border: 1px solid #c4b5fd;">

**Level 1: How does event handling work in a UI component hierarchy?**

Events in UI hierarchies follow two phases:

1. **Capture phase (top-down)**: Event travels from root to target
   - Each ancestor can intercept before target receives it
   - Used for global shortcuts, focus management

2. **Bubble phase (bottom-up)**: Event bubbles from target to root
   - Target handles first, then parent, then grandparent...
   - Each handler can `stopPropagation()` to halt bubbling
   - Most common pattern for event handling

Hit testing determines the target by traversing the tree, typically checking children before parents (so overlapping children take precedence).

**Level 2: How would you implement efficient dirty-flag based rendering for a deeply nested UI tree?**

Dirty-flag optimization avoids re-rendering unchanged subtrees:

```python
class OptimizedContainer(Container):
    def __init__(self):
        super().__init__()
        self._render_dirty = True
        self._cached_render: Optional[Any] = None

    def mark_dirty(self) -> None:
        """Mark this and all ancestors as needing re-render"""
        self._render_dirty = True
        if self.parent:
            self.parent.mark_dirty()

    def render(self, ctx: RenderContext) -> None:
        if not self._render_dirty and self._cached_render:
            # Use cached render
            ctx.canvas.blit(self._cached_render, self.bounds)
            return

        # Create offscreen buffer for caching
        buffer = ctx.canvas.create_buffer(self.bounds.width, self.bounds.height)
        buffer_ctx = RenderContext(
            canvas=buffer,
            clip_rect=Rect(0, 0, self.bounds.width, self.bounds.height)
        )

        # Render to buffer
        self._render_background(buffer_ctx)
        for child in self._children:
            child.render(buffer_ctx)

        # Cache and blit
        self._cached_render = buffer
        self._render_dirty = False
        ctx.canvas.blit(buffer, self.bounds)

    def add(self, child: UIComponent) -> 'Container':
        result = super().add(child)
        self.mark_dirty()
        return result
```

**Key optimizations**:
1. **Dirty flag propagation**: Changes only mark ancestors dirty, not siblings
2. **Render caching**: Unchanged subtrees use cached bitmaps
3. **Incremental updates**: Only re-render dirty subtrees
4. **Batching**: Accumulate changes, render once per frame

React's reconciliation uses a similar approach with virtual DOM diffing.

**Level 3: Design a UI framework's layout system that supports constraint-based layouts, handling circular dependencies gracefully.**

Constraint-based layouts (like iOS Auto Layout) require solving a system of linear constraints:

```python
from typing import Dict, Set, Tuple, Optional
from dataclasses import dataclass
from enum import Enum, auto

class LayoutAttribute(Enum):
    LEFT = auto()
    RIGHT = auto()
    TOP = auto()
    BOTTOM = auto()
    WIDTH = auto()
    HEIGHT = auto()
    CENTER_X = auto()
    CENTER_Y = auto()

@dataclass
class Constraint:
    """
    Represents: item1.attr1 = multiplier * item2.attr2 + constant
    Priority determines which constraints to break on conflict.
    """
    item1: 'ConstrainedComponent'
    attr1: LayoutAttribute
    relation: str  # '=', '<=', '>='
    item2: Optional['ConstrainedComponent']
    attr2: Optional[LayoutAttribute]
    multiplier: float = 1.0
    constant: float = 0.0
    priority: int = 1000  # Required constraint

class ConstraintSolver:
    """
    Cassowary-style constraint solver for UI layout.

    Uses incremental simplex algorithm to efficiently handle:
    - Adding/removing constraints
    - Detecting unsatisfiable systems
    - Finding optimal solutions for soft constraints
    """

    def __init__(self):
        self.constraints: List[Constraint] = []
        self.variables: Dict[Tuple[int, LayoutAttribute], float] = {}
        self._dependency_graph: Dict[int, Set[int]] = {}

    def add_constraint(self, constraint: Constraint) -> bool:
        """
        Add constraint and check for cycles.
        Returns False if constraint creates unsatisfiable system.
        """
        # Build dependency: item1 depends on item2
        if constraint.item2:
            id1 = id(constraint.item1)
            id2 = id(constraint.item2)

            if id1 not in self._dependency_graph:
                self._dependency_graph[id1] = set()
            self._dependency_graph[id1].add(id2)

            # Check for cycle using DFS
            if self._has_cycle(id1):
                # Remove the edge we just added
                self._dependency_graph[id1].remove(id2)
                return False

        self.constraints.append(constraint)
        return True

    def _has_cycle(self, start: int) -> bool:
        """Detect cycle in dependency graph using DFS"""
        visited = set()
        rec_stack = set()

        def dfs(node: int) -> bool:
            visited.add(node)
            rec_stack.add(node)

            for neighbor in self._dependency_graph.get(node, []):
                if neighbor not in visited:
                    if dfs(neighbor):
                        return True
                elif neighbor in rec_stack:
                    return True

            rec_stack.remove(node)
            return False

        return dfs(start)

    def solve(self) -> Dict[Tuple[int, LayoutAttribute], float]:
        """
        Solve constraint system using incremental simplex.

        Algorithm outline:
        1. Convert constraints to standard form
        2. Build initial tableau
        3. Pivot to find optimal solution
        4. Handle soft constraints by relaxation
        """
        # Sort constraints by priority (solve required first)
        sorted_constraints = sorted(
            self.constraints,
            key=lambda c: -c.priority
        )

        # Initialize variables with intrinsic sizes
        self._initialize_variables()

        # Solve using Gaussian elimination with pivoting
        for constraint in sorted_constraints:
            if not self._apply_constraint(constraint):
                if constraint.priority >= 1000:
                    raise LayoutError(f"Required constraint unsatisfiable: {constraint}")
                # Soft constraint - skip if unsatisfiable

        return self.variables

    def _apply_constraint(self, constraint: Constraint) -> bool:
        """Apply single constraint, return True if satisfied"""
        key1 = (id(constraint.item1), constraint.attr1)

        if constraint.item2 is None:
            # Constant constraint: attr1 = constant
            self.variables[key1] = constraint.constant
            return True

        key2 = (id(constraint.item2), constraint.attr2)
        value2 = self.variables.get(key2, 0)
        target = constraint.multiplier * value2 + constraint.constant

        if constraint.relation == '=':
            self.variables[key1] = target
        elif constraint.relation == '<=':
            current = self.variables.get(key1, 0)
            self.variables[key1] = min(current, target)
        elif constraint.relation == '>=':
            current = self.variables.get(key1, 0)
            self.variables[key1] = max(current, target)

        return True

class ConstrainedComponent(UIComponent):
    """Component with constraint-based layout"""

    def __init__(self):
        super().__init__()
        self._constraints: List[Constraint] = []
        self._intrinsic_width: Optional[float] = None
        self._intrinsic_height: Optional[float] = None

    def constrain(
        self,
        attr: LayoutAttribute,
        to_item: Optional['ConstrainedComponent'] = None,
        to_attr: Optional[LayoutAttribute] = None,
        multiplier: float = 1.0,
        constant: float = 0.0,
        priority: int = 1000
    ) -> Constraint:
        """Create and register a constraint"""
        constraint = Constraint(
            item1=self,
            attr1=attr,
            relation='=',
            item2=to_item,
            attr2=to_attr,
            multiplier=multiplier,
            constant=constant,
            priority=priority
        )
        self._constraints.append(constraint)
        return constraint

    def pin_to_parent(
        self,
        edges: Set[LayoutAttribute],
        inset: float = 0
    ) -> List[Constraint]:
        """Convenience: pin edges to parent with inset"""
        constraints = []
        if LayoutAttribute.LEFT in edges:
            constraints.append(self.constrain(
                LayoutAttribute.LEFT,
                self.parent, LayoutAttribute.LEFT,
                constant=inset
            ))
        if LayoutAttribute.RIGHT in edges:
            constraints.append(self.constrain(
                LayoutAttribute.RIGHT,
                self.parent, LayoutAttribute.RIGHT,
                constant=-inset
            ))
        # ... similar for TOP, BOTTOM
        return constraints
```

**Handling circular dependencies**:
1. **Detection**: Build dependency graph during constraint addition
2. **Prevention**: Reject constraints that create cycles
3. **Resolution**: For soft constraints, use priority to break cycles
4. **Feedback**: Provide clear error messages identifying the cycle

**Real-world systems**:
- Apple Auto Layout uses Cassowary algorithm
- Android ConstraintLayout uses custom solver
- CSS Flexbox avoids cycles via unidirectional flow

</div>

---

## Recursive Operations

### Operation Propagation Patterns

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 16px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #86efac;">
  <div style="font-weight: 700; color: #166534; margin-bottom: 1rem; font-size: 1.1rem;">Types of Recursive Operations</div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
    <div style="background: white; border-radius: 10px; padding: 1rem;">
      <div style="font-weight: 600; color: #166534; margin-bottom: 0.5rem;">Aggregation</div>
      <div style="font-size: 0.85rem; color: #475569;">Combine child results: <code>sum()</code>, <code>max()</code>, <code>all()</code></div>
      <div style="font-size: 0.8rem; color: #6b7280; margin-top: 0.25rem;">Examples: getSize(), getTotalPrice(), countNodes()</div>
    </div>
    <div style="background: white; border-radius: 10px; padding: 1rem;">
      <div style="font-weight: 600; color: #166534; margin-bottom: 0.5rem;">Collection</div>
      <div style="font-size: 0.85rem; color: #475569;">Gather results from subtree: <code>flatten</code>, <code>filter</code></div>
      <div style="font-size: 0.8rem; color: #6b7280; margin-top: 0.25rem;">Examples: search(), findAll(), getLeaves()</div>
    </div>
    <div style="background: white; border-radius: 10px; padding: 1rem;">
      <div style="font-weight: 600; color: #166534; margin-bottom: 0.5rem;">Propagation</div>
      <div style="font-size: 0.85rem; color: #475569;">Apply action to all descendants</div>
      <div style="font-size: 0.8rem; color: #6b7280; margin-top: 0.25rem;">Examples: render(), delete(), setEnabled()</div>
    </div>
    <div style="background: white; border-radius: 10px; padding: 1rem;">
      <div style="font-weight: 600; color: #166534; margin-bottom: 0.5rem;">Transformation</div>
      <div style="font-size: 0.85rem; color: #475569;">Create new tree from existing: <code>map</code>, <code>clone</code></div>
      <div style="font-size: 0.8rem; color: #6b7280; margin-top: 0.25rem;">Examples: deepClone(), transform(), serialize()</div>
    </div>
  </div>
</div>

### Stack Overflow Prevention

Deeply nested composites can cause stack overflow with naive recursion:

```python
class SafeTraversal:
    """Non-recursive traversal to handle arbitrarily deep trees"""

    @staticmethod
    def iterative_size(root: FileSystemComponent) -> int:
        """
        Calculate total size without recursion.
        Uses explicit stack to simulate call stack.
        """
        total = 0
        stack = [root]

        while stack:
            node = stack.pop()
            if isinstance(node, File):
                total += node.get_size()
            elif isinstance(node, Directory):
                # Push children onto stack for processing
                stack.extend(node.get_children())

        return total

    @staticmethod
    def iterative_preorder(root: FileSystemComponent) -> List[FileSystemComponent]:
        """Pre-order traversal using explicit stack"""
        result = []
        stack = [root]

        while stack:
            node = stack.pop()
            result.append(node)
            if isinstance(node, Directory):
                # Reverse to maintain left-to-right order
                stack.extend(reversed(node.get_children()))

        return result

    @staticmethod
    def iterative_postorder(root: FileSystemComponent) -> List[FileSystemComponent]:
        """
        Post-order traversal using two stacks.
        More complex because children must be processed before parent.
        """
        result = []
        stack1 = [root]
        stack2 = []

        # First pass: reverse pre-order into stack2
        while stack1:
            node = stack1.pop()
            stack2.append(node)
            if isinstance(node, Directory):
                stack1.extend(node.get_children())

        # Second pass: pop from stack2 for post-order
        while stack2:
            result.append(stack2.pop())

        return result

    @staticmethod
    def tail_recursive_size(node: FileSystemComponent, accumulator: int = 0) -> int:
        """
        Tail-recursive implementation (for languages with TCO).
        Python doesn't optimize tail calls, but this shows the pattern.
        """
        if isinstance(node, File):
            return accumulator + node.get_size()

        # For directory: process children with accumulated value
        for child in node.get_children():
            accumulator = SafeTraversal.tail_recursive_size(child, accumulator)
        return accumulator
```

### Parallel Recursive Operations

For large trees, parallel processing can significantly improve performance:

```python
from concurrent.futures import ThreadPoolExecutor, Future
from typing import TypeVar, Callable
import threading

T = TypeVar('T')

class ParallelOperations:
    """Parallel operations on composite structures"""

    def __init__(self, max_workers: int = 4):
        self.executor = ThreadPoolExecutor(max_workers=max_workers)
        self._depth_threshold = 3  # Only parallelize at shallow depths

    def parallel_size(self, root: FileSystemComponent) -> int:
        """
        Calculate size with parallel processing of subtrees.

        Strategy:
        - Sequential for leaf nodes
        - Parallel for directory children at shallow depths
        - Switch to sequential at depth > threshold
        """
        return self._parallel_size_impl(root, 0)

    def _parallel_size_impl(self, node: FileSystemComponent, depth: int) -> int:
        if isinstance(node, File):
            return node.get_size()

        directory = node
        children = directory.get_children()

        if depth < self._depth_threshold and len(children) > 1:
            # Parallel: submit children as separate tasks
            futures: List[Future[int]] = []
            for child in children:
                future = self.executor.submit(
                    self._parallel_size_impl, child, depth + 1
                )
                futures.append(future)

            # Aggregate results
            return sum(f.result() for f in futures)
        else:
            # Sequential: process inline
            return sum(
                self._parallel_size_impl(child, depth + 1)
                for child in children
            )

    def parallel_map(
        self,
        root: FileSystemComponent,
        transform: Callable[[FileSystemComponent], T]
    ) -> Dict[str, T]:
        """
        Apply transformation to all nodes in parallel.
        Returns map of path -> result.
        """
        results: Dict[str, T] = {}
        lock = threading.Lock()

        def process_node(node: FileSystemComponent) -> None:
            result = transform(node)
            with lock:
                results[node.get_path()] = result

        # Collect all nodes first, then process in parallel
        all_nodes = list(SafeTraversal.iterative_preorder(root))
        futures = [self.executor.submit(process_node, node) for node in all_nodes]

        # Wait for all to complete
        for future in futures:
            future.result()

        return results
```

### Interview Questions: Recursive Operations

<div style="background: linear-gradient(135deg, #ede9fe 0%, #f5f3ff 100%); border-radius: 12px; padding: 1.5rem; margin: 1rem 0; border: 1px solid #c4b5fd;">

**Level 1: What are the time and space complexities of common Composite operations?**

For a tree with n total nodes, d maximum depth, and b average branching factor:

| Operation | Time | Space | Notes |
|-----------|------|-------|-------|
| `getSize()` | O(n) | O(d) stack | Must visit all nodes |
| `add(child)` | O(d) | O(1) | Cycle check walks ancestors |
| `remove(child)` | O(1) | O(1) | Direct removal |
| `search(name)` | O(n) | O(d) | Worst case: check all |
| `getPath()` | O(d) | O(d) | Walk to root |
| `clone()` | O(n) | O(n) | Copy all nodes |
| `render()` | O(n) | O(d) | Visit all nodes |

The space complexity reflects call stack depth for recursive implementations.

**Level 2: How would you implement a lazy-loading Composite where children are fetched on-demand?**

Lazy loading defers child retrieval until accessed:

```python
from typing import Callable, List, Optional
from enum import Enum, auto

class LoadState(Enum):
    UNLOADED = auto()
    LOADING = auto()
    LOADED = auto()
    ERROR = auto()

class LazyDirectory(Directory):
    """
    Directory with lazy child loading.

    Design considerations:
    - Children fetched on first access
    - Loading state prevents redundant fetches
    - Error handling with retry capability
    - Optional prefetching for anticipated access
    """

    def __init__(self, name: str, loader: Callable[['LazyDirectory'], List[FileSystemComponent]]):
        super().__init__(name)
        self._loader = loader
        self._load_state = LoadState.UNLOADED
        self._load_error: Optional[Exception] = None

    def _ensure_loaded(self) -> None:
        """Load children if not already loaded"""
        if self._load_state == LoadState.LOADED:
            return

        if self._load_state == LoadState.LOADING:
            # Prevent re-entrant loading
            raise RuntimeError("Circular loading detected")

        self._load_state = LoadState.LOADING
        try:
            children = self._loader(self)
            for child in children:
                super().add(child)
            self._load_state = LoadState.LOADED
        except Exception as e:
            self._load_state = LoadState.ERROR
            self._load_error = e
            raise

    def get_children(self) -> List[FileSystemComponent]:
        self._ensure_loaded()
        return super().get_children()

    def get_size(self) -> int:
        self._ensure_loaded()
        return super().get_size()

    def prefetch(self, depth: int = 1) -> 'LazyDirectory':
        """Eagerly load children up to specified depth"""
        self._ensure_loaded()
        if depth > 0:
            for child in self._children.values():
                if isinstance(child, LazyDirectory):
                    child.prefetch(depth - 1)
        return self

    def invalidate(self) -> None:
        """Clear cached children, will reload on next access"""
        self._children.clear()
        self._load_state = LoadState.UNLOADED
        self._load_error = None

# Usage with API-backed loading
def create_api_directory(path: str) -> LazyDirectory:
    def loader(directory: LazyDirectory) -> List[FileSystemComponent]:
        response = api_client.list_directory(directory.get_path())
        children = []
        for item in response['items']:
            if item['type'] == 'file':
                children.append(File(item['name'], item['size']))
            else:
                children.append(create_api_directory(item['name']))
        return children

    return LazyDirectory(path.split('/')[-1], loader)
```

**Trade-offs**:
- Pro: Reduced memory for large trees
- Pro: Faster initial load
- Con: Latency on first access
- Con: Complex error handling
- Con: Stale data if source changes

**Level 3: Design an incremental computation system for Composite that efficiently recomputes aggregates when leaves change.**

Incremental computation avoids full recomputation by propagating deltas:

```python
from abc import ABC, abstractmethod
from typing import TypeVar, Generic, Callable, Set
from dataclasses import dataclass

T = TypeVar('T')

@dataclass
class Delta(Generic[T]):
    """Represents a change to a value"""
    old_value: T
    new_value: T

    def invert(self) -> 'Delta[T]':
        return Delta(self.new_value, self.old_value)

class IncrementalAggregate(ABC, Generic[T]):
    """
    Defines an aggregate that can be incrementally updated.

    Requirements for incremental update:
    1. Combine operation must be associative
    2. Must support inverse operation for removals
    3. Must support delta application for updates
    """

    @abstractmethod
    def identity(self) -> T:
        """Identity element for combination"""
        pass

    @abstractmethod
    def combine(self, a: T, b: T) -> T:
        """Combine two aggregate values"""
        pass

    @abstractmethod
    def apply_delta(self, current: T, delta: Delta[T]) -> T:
        """Apply change to aggregate"""
        pass

class SumAggregate(IncrementalAggregate[int]):
    """Sum aggregate with O(1) incremental update"""

    def identity(self) -> int:
        return 0

    def combine(self, a: int, b: int) -> int:
        return a + b

    def apply_delta(self, current: int, delta: Delta[int]) -> int:
        # Remove old contribution, add new
        return current - delta.old_value + delta.new_value

class IncrementalComposite:
    """
    Composite with incremental aggregate computation.

    Key insight: When a leaf changes by delta, we only need to
    update aggregates on the path from leaf to root.
    """

    def __init__(self, name: str, aggregate: IncrementalAggregate[int]):
        self.name = name
        self.parent: Optional['IncrementalComposite'] = None
        self._children: List['IncrementalComposite'] = []
        self._aggregate = aggregate
        self._cached_value: int = aggregate.identity()
        self._value: int = 0  # Leaf value
        self._observers: Set[Callable[[Delta[int]], None]] = set()

    def set_value(self, new_value: int) -> None:
        """Update leaf value and propagate change"""
        if new_value == self._value:
            return

        delta = Delta(self._value, new_value)
        self._value = new_value

        # Propagate delta up the tree
        self._propagate_delta(delta)

    def _propagate_delta(self, delta: Delta[int]) -> None:
        """
        Propagate change up the tree.
        Time complexity: O(depth) instead of O(n)
        """
        # Update cached aggregate
        self._cached_value = self._aggregate.apply_delta(
            self._cached_value, delta
        )

        # Notify observers
        for observer in self._observers:
            observer(delta)

        # Propagate to parent
        if self.parent:
            self.parent._propagate_delta(delta)

    def add(self, child: 'IncrementalComposite') -> None:
        """Add child and update aggregates"""
        child.parent = self
        self._children.append(child)

        # Child's full value is added to our aggregate
        child_total = child.get_aggregate()
        delta = Delta(0, child_total)
        self._propagate_delta(delta)

    def remove(self, child: 'IncrementalComposite') -> None:
        """Remove child and update aggregates"""
        if child in self._children:
            self._children.remove(child)
            child.parent = None

            # Subtract child's contribution
            child_total = child.get_aggregate()
            delta = Delta(child_total, 0)
            self._propagate_delta(delta)

    def get_aggregate(self) -> int:
        """Get cached aggregate value in O(1)"""
        if not self._children:
            return self._value
        return self._cached_value

    def subscribe(self, observer: Callable[[Delta[int]], None]) -> None:
        """Subscribe to aggregate changes"""
        self._observers.add(observer)

    def unsubscribe(self, observer: Callable[[Delta[int]], None]) -> None:
        """Unsubscribe from changes"""
        self._observers.discard(observer)

# Advanced: Segment tree for efficient range aggregates
class SegmentTreeComposite:
    """
    Uses segment tree for efficient aggregate queries on subtrees.
    Supports O(log n) update and O(log n) range queries.
    """

    def __init__(self, values: List[int]):
        self.n = len(values)
        self.tree = [0] * (4 * self.n)
        self._build(values, 1, 0, self.n - 1)

    def _build(self, values: List[int], node: int, start: int, end: int) -> None:
        if start == end:
            self.tree[node] = values[start]
        else:
            mid = (start + end) // 2
            self._build(values, 2*node, start, mid)
            self._build(values, 2*node+1, mid+1, end)
            self.tree[node] = self.tree[2*node] + self.tree[2*node+1]

    def update(self, index: int, value: int) -> None:
        """O(log n) point update"""
        self._update(1, 0, self.n-1, index, value)

    def _update(self, node: int, start: int, end: int, index: int, value: int) -> None:
        if start == end:
            self.tree[node] = value
        else:
            mid = (start + end) // 2
            if index <= mid:
                self._update(2*node, start, mid, index, value)
            else:
                self._update(2*node+1, mid+1, end, index, value)
            self.tree[node] = self.tree[2*node] + self.tree[2*node+1]

    def query(self, left: int, right: int) -> int:
        """O(log n) range query"""
        return self._query(1, 0, self.n-1, left, right)

    def _query(self, node: int, start: int, end: int, left: int, right: int) -> int:
        if right < start or end < left:
            return 0
        if left <= start and end <= right:
            return self.tree[node]
        mid = (start + end) // 2
        return (self._query(2*node, start, mid, left, right) +
                self._query(2*node+1, mid+1, end, left, right))
```

**Performance comparison**:
| Scenario | Naive | Incremental |
|----------|-------|-------------|
| Initial build | O(n) | O(n) |
| Single leaf update | O(n) | O(depth) |
| k updates | O(k*n) | O(k*depth) |
| Query aggregate | O(n) | O(1) |

**Use cases**:
- Real-time dashboards with aggregated metrics
- Spreadsheet cell dependencies
- Game engine scene graphs with bounding volume hierarchies

</div>

---

## Go Implementation: Expression Evaluator

```go
package main

import (
	"fmt"
	"math"
	"strings"
)

// Expression is the component interface for arithmetic expressions.
// Both atomic values (leaves) and operations (composites) implement this.
type Expression interface {
	// Evaluate computes the expression value
	Evaluate() float64

	// String returns a human-readable representation
	String() string

	// Simplify returns a simplified expression (constant folding)
	Simplify() Expression

	// Variables returns all variable names in the expression
	Variables() []string

	// Substitute replaces variables with values
	Substitute(bindings map[string]float64) Expression
}

// Constant is a leaf representing a numeric value
type Constant struct {
	value float64
}

func NewConstant(value float64) *Constant {
	return &Constant{value: value}
}

func (c *Constant) Evaluate() float64 {
	return c.value
}

func (c *Constant) String() string {
	if c.value == math.Floor(c.value) {
		return fmt.Sprintf("%.0f", c.value)
	}
	return fmt.Sprintf("%.2f", c.value)
}

func (c *Constant) Simplify() Expression {
	return c
}

func (c *Constant) Variables() []string {
	return nil
}

func (c *Constant) Substitute(bindings map[string]float64) Expression {
	return c
}

// Variable is a leaf representing a named variable
type Variable struct {
	name  string
	value float64
}

func NewVariable(name string) *Variable {
	return &Variable{name: name}
}

func (v *Variable) Evaluate() float64 {
	return v.value
}

func (v *Variable) String() string {
	return v.name
}

func (v *Variable) Simplify() Expression {
	return v
}

func (v *Variable) Variables() []string {
	return []string{v.name}
}

func (v *Variable) Substitute(bindings map[string]float64) Expression {
	if val, ok := bindings[v.name]; ok {
		return NewConstant(val)
	}
	return v
}

// BinaryOp is a composite representing a binary operation
type BinaryOp struct {
	operator string
	left     Expression
	right    Expression
}

func NewBinaryOp(operator string, left, right Expression) *BinaryOp {
	return &BinaryOp{
		operator: operator,
		left:     left,
		right:    right,
	}
}

func (b *BinaryOp) Evaluate() float64 {
	l := b.left.Evaluate()
	r := b.right.Evaluate()

	switch b.operator {
	case "+":
		return l + r
	case "-":
		return l - r
	case "*":
		return l * r
	case "/":
		if r == 0 {
			return math.Inf(1)
		}
		return l / r
	case "^":
		return math.Pow(l, r)
	default:
		panic(fmt.Sprintf("Unknown operator: %s", b.operator))
	}
}

func (b *BinaryOp) String() string {
	return fmt.Sprintf("(%s %s %s)", b.left.String(), b.operator, b.right.String())
}

func (b *BinaryOp) Simplify() Expression {
	left := b.left.Simplify()
	right := b.right.Simplify()

	// If both operands are constants, evaluate now (constant folding)
	leftConst, leftIsConst := left.(*Constant)
	rightConst, rightIsConst := right.(*Constant)

	if leftIsConst && rightIsConst {
		result := NewBinaryOp(b.operator, leftConst, rightConst)
		return NewConstant(result.Evaluate())
	}

	// Algebraic simplifications
	switch b.operator {
	case "+":
		if leftIsConst && leftConst.value == 0 {
			return right // 0 + x = x
		}
		if rightIsConst && rightConst.value == 0 {
			return left // x + 0 = x
		}
	case "-":
		if rightIsConst && rightConst.value == 0 {
			return left // x - 0 = x
		}
	case "*":
		if (leftIsConst && leftConst.value == 0) ||
			(rightIsConst && rightConst.value == 0) {
			return NewConstant(0) // x * 0 = 0
		}
		if leftIsConst && leftConst.value == 1 {
			return right // 1 * x = x
		}
		if rightIsConst && rightConst.value == 1 {
			return left // x * 1 = x
		}
	case "/":
		if rightIsConst && rightConst.value == 1 {
			return left // x / 1 = x
		}
	case "^":
		if rightIsConst && rightConst.value == 0 {
			return NewConstant(1) // x ^ 0 = 1
		}
		if rightIsConst && rightConst.value == 1 {
			return left // x ^ 1 = x
		}
	}

	return NewBinaryOp(b.operator, left, right)
}

func (b *BinaryOp) Variables() []string {
	varSet := make(map[string]bool)
	for _, v := range b.left.Variables() {
		varSet[v] = true
	}
	for _, v := range b.right.Variables() {
		varSet[v] = true
	}

	result := make([]string, 0, len(varSet))
	for v := range varSet {
		result = append(result, v)
	}
	return result
}

func (b *BinaryOp) Substitute(bindings map[string]float64) Expression {
	return NewBinaryOp(
		b.operator,
		b.left.Substitute(bindings),
		b.right.Substitute(bindings),
	)
}

// UnaryOp is a composite representing a unary operation
type UnaryOp struct {
	operator   string
	operand    Expression
	applyFunc  func(float64) float64
}

func NewUnaryOp(operator string, operand Expression, apply func(float64) float64) *UnaryOp {
	return &UnaryOp{
		operator:  operator,
		operand:   operand,
		applyFunc: apply,
	}
}

func Negate(operand Expression) *UnaryOp {
	return NewUnaryOp("-", operand, func(x float64) float64 { return -x })
}

func Sqrt(operand Expression) *UnaryOp {
	return NewUnaryOp("sqrt", operand, math.Sqrt)
}

func Sin(operand Expression) *UnaryOp {
	return NewUnaryOp("sin", operand, math.Sin)
}

func Cos(operand Expression) *UnaryOp {
	return NewUnaryOp("cos", operand, math.Cos)
}

func (u *UnaryOp) Evaluate() float64 {
	return u.applyFunc(u.operand.Evaluate())
}

func (u *UnaryOp) String() string {
	if u.operator == "-" {
		return fmt.Sprintf("(-%s)", u.operand.String())
	}
	return fmt.Sprintf("%s(%s)", u.operator, u.operand.String())
}

func (u *UnaryOp) Simplify() Expression {
	operand := u.operand.Simplify()

	if c, ok := operand.(*Constant); ok {
		return NewConstant(u.applyFunc(c.value))
	}

	return NewUnaryOp(u.operator, operand, u.applyFunc)
}

func (u *UnaryOp) Variables() []string {
	return u.operand.Variables()
}

func (u *UnaryOp) Substitute(bindings map[string]float64) Expression {
	return NewUnaryOp(u.operator, u.operand.Substitute(bindings), u.applyFunc)
}

// FunctionCall is a composite for function calls with multiple arguments
type FunctionCall struct {
	name      string
	arguments []Expression
	applyFunc func([]float64) float64
}

func NewFunctionCall(name string, apply func([]float64) float64, args ...Expression) *FunctionCall {
	return &FunctionCall{
		name:      name,
		arguments: args,
		applyFunc: apply,
	}
}

func Max(args ...Expression) *FunctionCall {
	return NewFunctionCall("max", func(vals []float64) float64 {
		if len(vals) == 0 {
			return math.Inf(-1)
		}
		max := vals[0]
		for _, v := range vals[1:] {
			if v > max {
				max = v
			}
		}
		return max
	}, args...)
}

func Min(args ...Expression) *FunctionCall {
	return NewFunctionCall("min", func(vals []float64) float64 {
		if len(vals) == 0 {
			return math.Inf(1)
		}
		min := vals[0]
		for _, v := range vals[1:] {
			if v < min {
				min = v
			}
		}
		return min
	}, args...)
}

func (f *FunctionCall) Evaluate() float64 {
	vals := make([]float64, len(f.arguments))
	for i, arg := range f.arguments {
		vals[i] = arg.Evaluate()
	}
	return f.applyFunc(vals)
}

func (f *FunctionCall) String() string {
	args := make([]string, len(f.arguments))
	for i, arg := range f.arguments {
		args[i] = arg.String()
	}
	return fmt.Sprintf("%s(%s)", f.name, strings.Join(args, ", "))
}

func (f *FunctionCall) Simplify() Expression {
	simplified := make([]Expression, len(f.arguments))
	allConstant := true

	for i, arg := range f.arguments {
		simplified[i] = arg.Simplify()
		if _, ok := simplified[i].(*Constant); !ok {
			allConstant = false
		}
	}

	if allConstant {
		vals := make([]float64, len(simplified))
		for i, s := range simplified {
			vals[i] = s.(*Constant).value
		}
		return NewConstant(f.applyFunc(vals))
	}

	return NewFunctionCall(f.name, f.applyFunc, simplified...)
}

func (f *FunctionCall) Variables() []string {
	varSet := make(map[string]bool)
	for _, arg := range f.arguments {
		for _, v := range arg.Variables() {
			varSet[v] = true
		}
	}

	result := make([]string, 0, len(varSet))
	for v := range varSet {
		result = append(result, v)
	}
	return result
}

func (f *FunctionCall) Substitute(bindings map[string]float64) Expression {
	substituted := make([]Expression, len(f.arguments))
	for i, arg := range f.arguments {
		substituted[i] = arg.Substitute(bindings)
	}
	return NewFunctionCall(f.name, f.applyFunc, substituted...)
}

func main() {
	// Build expression: (x + 2) * (y - 1)
	x := NewVariable("x")
	y := NewVariable("y")

	expr := NewBinaryOp("*",
		NewBinaryOp("+", x, NewConstant(2)),
		NewBinaryOp("-", y, NewConstant(1)),
	)

	fmt.Println("Expression:", expr.String())
	fmt.Println("Variables:", expr.Variables())

	// Substitute values
	bound := expr.Substitute(map[string]float64{"x": 3, "y": 5})
	fmt.Println("After substitution:", bound.String())

	// Simplify (constant folding)
	simplified := bound.Simplify()
	fmt.Println("Simplified:", simplified.String())
	fmt.Println("Result:", simplified.Evaluate())

	// More complex expression with functions
	// sqrt(x^2 + y^2)
	distance := Sqrt(
		NewBinaryOp("+",
			NewBinaryOp("^", x, NewConstant(2)),
			NewBinaryOp("^", y, NewConstant(2)),
		),
	)

	fmt.Println("\nDistance formula:", distance.String())

	distBound := distance.Substitute(map[string]float64{"x": 3, "y": 4})
	fmt.Println("With x=3, y=4:", distBound.Simplify().String())

	// max(a, b, c)
	a, b, c := NewConstant(5), NewConstant(12), NewConstant(7)
	maximum := Max(a, b, c)
	fmt.Println("\nMax(5, 12, 7):", maximum.Evaluate())
}
```

---

## Design Trade-offs Summary

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%); border-radius: 16px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #fcd34d;">
  <div style="font-weight: 700; color: #92400e; margin-bottom: 1rem; font-size: 1.1rem;">Critical Design Decisions</div>
  <div style="display: grid; gap: 1rem;">
    <div style="background: white; border-radius: 10px; padding: 1rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div>
        <div style="font-weight: 600; color: #b45309;">Transparency vs Safety</div>
        <div style="font-size: 0.85rem; color: #78350f; margin-top: 0.25rem;"><strong>Transparency</strong>: All operations in Component interface. Maximum polymorphism, runtime errors possible.</div>
      </div>
      <div style="font-size: 0.85rem; color: #78350f;"><strong>Safety</strong>: Child operations only in Composite. Type-safe, requires casting/checking.</div>
    </div>
    <div style="background: white; border-radius: 10px; padding: 1rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div>
        <div style="font-weight: 600; color: #b45309;">Parent References</div>
        <div style="font-size: 0.85rem; color: #78350f; margin-top: 0.25rem;"><strong>With</strong>: O(d) path computation, upward traversal, complex invariants.</div>
      </div>
      <div style="font-size: 0.85rem; color: #78350f;"><strong>Without</strong>: Simpler model, better GC, immutable-friendly, O(n) path finding.</div>
    </div>
    <div style="background: white; border-radius: 10px; padding: 1rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div>
        <div style="font-weight: 600; color: #b45309;">Caching Strategy</div>
        <div style="font-size: 0.85rem; color: #78350f; margin-top: 0.25rem;"><strong>No cache</strong>: Simple, always consistent, O(n) queries.</div>
      </div>
      <div style="font-size: 0.85rem; color: #78350f;"><strong>With cache</strong>: O(1) queries, O(d) invalidation, memory overhead.</div>
    </div>
    <div style="background: white; border-radius: 10px; padding: 1rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <div>
        <div style="font-weight: 600; color: #b45309;">Collection Type</div>
        <div style="font-size: 0.85rem; color: #78350f; margin-top: 0.25rem;"><strong>List</strong>: Ordered, O(1) append, O(n) remove/lookup.</div>
      </div>
      <div style="font-size: 0.85rem; color: #78350f;"><strong>Map</strong>: O(1) lookup by key, no inherent order.</div>
    </div>
  </div>
</div>

---

## Related Patterns

- [[decorator]](/topic/design-patterns/decorator) - Similar recursive structure, but adds responsibilities rather than aggregating children
- [[iterator]](/topic/design-patterns/iterator) - Provides uniform traversal over composite structures
- [[visitor]](/topic/design-patterns/visitor) - Adds operations to composite without modifying node classes
- [[chain-of-responsibility]](/topic/design-patterns/chain-of-responsibility) - Can follow parent chain for request handling
- [[flyweight]](/topic/design-patterns/flyweight) - Can share leaf node state to reduce memory in large composites
- [[interpreter]](/topic/design-patterns/interpreter) - Often uses Composite for abstract syntax trees

---

## Quick Reference

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 1.5rem; margin: 1rem 0; border: 1px solid #bbf7d0;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
    <div>
      <div style="font-weight: 700; color: #166534; margin-bottom: 0.5rem;">Intent</div>
      <div style="font-size: 0.9rem; color: #15803d;">Compose objects into tree structures representing part-whole hierarchies with uniform treatment</div>
    </div>
    <div>
      <div style="font-weight: 700; color: #166534; margin-bottom: 0.5rem;">Participants</div>
      <div style="font-size: 0.9rem; color: #15803d;">Component (interface), Leaf (no children), Composite (has children), Client (uses interface)</div>
    </div>
    <div>
      <div style="font-weight: 700; color: #166534; margin-bottom: 0.5rem;">Key Methods</div>
      <div style="font-size: 0.9rem; color: #15803d; font-family: monospace;">operation(), add(), remove(), getChild(), getParent()</div>
    </div>
    <div>
      <div style="font-weight: 700; color: #166534; margin-bottom: 0.5rem;">Complexity</div>
      <div style="font-size: 0.9rem; color: #15803d;">Traversal: O(n), Add/Remove: O(1), Path: O(depth)</div>
    </div>
  </div>
</div>
