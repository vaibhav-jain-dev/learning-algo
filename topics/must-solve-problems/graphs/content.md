# Graphs

## Overview

Graphs are versatile data structures consisting of vertices (nodes) and edges. They model relationships and connections, used in social networks, maps, dependencies, and countless applications.

## Key Concepts & Terminology

### Graph Types
| Type | Description |
|------|-------------|
| Directed | Edges have direction (A→B) |
| Undirected | Edges are bidirectional |
| Weighted | Edges have costs/distances |
| Unweighted | All edges have equal cost |
| Cyclic | Contains at least one cycle |
| Acyclic | No cycles (DAG if directed) |

### Representations
- **Adjacency List**: Space O(V+E), lookup O(degree)
- **Adjacency Matrix**: Space O(V²), lookup O(1)
- **Edge List**: Space O(E), good for sparse graphs

### Core Algorithms
| Algorithm | Use Case | Time |
|-----------|----------|------|
| BFS | Shortest path (unweighted), level traversal | O(V+E) |
| DFS | Path finding, cycle detection, topological sort | O(V+E) |
| Dijkstra | Shortest path (weighted, positive) | O((V+E)logV) |
| Bellman-Ford | Shortest path (negative weights) | O(VE) |
| Floyd-Warshall | All-pairs shortest path | O(V³) |
| Kruskal/Prim | Minimum spanning tree | O(ElogE) |

### Common Patterns
1. **BFS for shortest path** in unweighted graphs
2. **DFS for connectivity** and path existence
3. **Topological sort** for dependencies
4. **Union-Find** for connected components

### Boundary Conditions
1. Empty graph
2. Single node
3. Disconnected components
4. Self-loops
5. Parallel edges

---

## Problems

### 1. Depth-First Search

**Difficulty:** Easy

**Problem Statement:**
Implement DFS traversal on a graph represented as an adjacency list.

**Example:**
```
Graph:
    A
  / | \
 B  C  D
/ \    / \
E  F  G   H

DFS from A: [A, B, E, F, C, D, G, H]
```

<details>
<summary><strong>Hints</strong></summary>

1. Visit current node first
2. Recursively visit all unvisited children
3. Track visited to avoid cycles

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class Node:
    def __init__(self, name):
        self.name = name
        self.children = []

    def addChild(self, name):
        self.children.append(Node(name))
        return self

    def depthFirstSearch(self, array):
        """
        Time Complexity: O(V + E)
        Space Complexity: O(V)
        """
        array.append(self.name)
        for child in self.children:
            child.depthFirstSearch(array)
        return array

# Test
root = Node("A")
root.addChild("B").addChild("C").addChild("D")
root.children[0].addChild("E").addChild("F")
root.children[2].addChild("G").addChild("H")

print(root.depthFirstSearch([]))  # ['A', 'B', 'E', 'F', 'C', 'D', 'G', 'H']
```

```go
package main

import "fmt"

type Node struct {
    Name     string
    Children []*Node
}

func (n *Node) AddChild(name string) *Node {
    child := &Node{Name: name}
    n.Children = append(n.Children, child)
    return n
}

func (n *Node) DepthFirstSearch(array []string) []string {
    array = append(array, n.Name)
    for _, child := range n.Children {
        array = child.DepthFirstSearch(array)
    }
    return array
}

func main() {
    root := &Node{Name: "A"}
    root.AddChild("B").AddChild("C").AddChild("D")
    fmt.Println(root.DepthFirstSearch([]string{}))
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Number of Islands** - DFS on grid
2. **Clone Graph** - DFS with cloning
3. **Path Sum III** - DFS with prefix sum

</details>

---

### 2. Breadth-First Search

**Difficulty:** Medium

**Problem Statement:**
Implement BFS traversal returning nodes level by level.

**Example:**
```
Graph:
    A
  / | \
 B  C  D
/ \    / \
E  F  G   H

BFS from A: [A, B, C, D, E, F, G, H]
```

<details>
<summary><strong>Hints</strong></summary>

1. Use a queue (FIFO)
2. Process all nodes at current level before next
3. Track visited to avoid revisiting

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
from collections import deque

class Node:
    def __init__(self, name):
        self.name = name
        self.children = []

    def addChild(self, name):
        self.children.append(Node(name))
        return self

    def breadthFirstSearch(self, array):
        """
        Time Complexity: O(V + E)
        Space Complexity: O(V)
        """
        queue = deque([self])

        while queue:
            node = queue.popleft()
            array.append(node.name)

            for child in node.children:
                queue.append(child)

        return array

# Test
root = Node("A")
root.addChild("B").addChild("C").addChild("D")
root.children[0].addChild("E").addChild("F")

print(root.breadthFirstSearch([]))  # ['A', 'B', 'C', 'D', 'E', 'F']
```

```go
package main

import "fmt"

type Node struct {
    Name     string
    Children []*Node
}

func (n *Node) BreadthFirstSearch(array []string) []string {
    queue := []*Node{n}

    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]

        array = append(array, node.Name)

        for _, child := range node.Children {
            queue = append(queue, child)
        }
    }

    return array
}

func main() {
    root := &Node{Name: "A"}
    root.Children = []*Node{{Name: "B"}, {Name: "C"}}
    fmt.Println(root.BreadthFirstSearch([]string{}))
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Shortest Path in Binary Matrix** - BFS on grid
2. **Word Ladder** - BFS for transformation
3. **Rotting Oranges** - Multi-source BFS

</details>

---

### 3. Single Cycle Check

**Difficulty:** Medium

**Problem Statement:**
Determine if the array represents a single cycle where following jumps visits each element exactly once and returns to start.

**Example:**
```
Input: [2, 3, 1, -4, -4, 2]
Output: true

0 -> 2 -> 3 -> -1 -> -5 -> 1 -> 0 (visits all once)
```

<details>
<summary><strong>Hints</strong></summary>

1. Start at index 0
2. Make n jumps and track visited count
3. Must visit each element exactly once and return to 0

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def hasSingleCycle(array):
    """
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    n = len(array)
    num_visited = 0
    current_idx = 0

    while num_visited < n:
        if num_visited > 0 and current_idx == 0:
            return False  # Back to start too early

        num_visited += 1
        current_idx = getNextIdx(current_idx, array)

    return current_idx == 0

def getNextIdx(current_idx, array):
    jump = array[current_idx]
    next_idx = (current_idx + jump) % len(array)
    return next_idx

# Test
print(hasSingleCycle([2, 3, 1, -4, -4, 2]))  # True
print(hasSingleCycle([2, 2, -1]))  # True
print(hasSingleCycle([1, 1, 1, 1, 2]))  # False
```

```go
package main

import "fmt"

func hasSingleCycle(array []int) bool {
    n := len(array)
    numVisited := 0
    currentIdx := 0

    for numVisited < n {
        if numVisited > 0 && currentIdx == 0 {
            return false
        }
        numVisited++
        currentIdx = getNextIdx(currentIdx, array)
    }

    return currentIdx == 0
}

func getNextIdx(currentIdx int, array []int) int {
    n := len(array)
    jump := array[currentIdx]
    nextIdx := (currentIdx + jump) % n
    if nextIdx < 0 {
        nextIdx += n
    }
    return nextIdx
}

func main() {
    fmt.Println(hasSingleCycle([]int{2, 3, 1, -4, -4, 2})) // true
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Linked List Cycle** - Floyd's algorithm
2. **Circular Array Loop** - LeetCode version
3. **Happy Number** - Cycle detection

</details>

---

### 4. River Sizes

**Difficulty:** Medium

**Problem Statement:**
Find the sizes of all rivers (connected 1s) in a matrix.

**Example:**
```
Input:
[
  [1, 0, 0, 1, 0],
  [1, 0, 1, 0, 0],
  [0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 0]
]
Output: [1, 2, 2, 2, 5]
```

<details>
<summary><strong>Hints</strong></summary>

1. Iterate through matrix
2. When finding unvisited 1, do BFS/DFS to find river size
3. Mark visited cells to avoid recounting

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def riverSizes(matrix):
    """
    Time Complexity: O(m * n)
    Space Complexity: O(m * n)
    """
    sizes = []
    visited = [[False] * len(matrix[0]) for _ in range(len(matrix))]

    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            if not visited[i][j] and matrix[i][j] == 1:
                size = exploreRiver(matrix, visited, i, j)
                sizes.append(size)

    return sorted(sizes)

def exploreRiver(matrix, visited, row, col):
    size = 0
    stack = [(row, col)]

    while stack:
        r, c = stack.pop()

        if visited[r][c]:
            continue

        visited[r][c] = True

        if matrix[r][c] == 0:
            continue

        size += 1

        # Add neighbors
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < len(matrix) and 0 <= nc < len(matrix[0]):
                if not visited[nr][nc]:
                    stack.append((nr, nc))

    return size

# Test
matrix = [
    [1, 0, 0, 1, 0],
    [1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0]
]
print(riverSizes(matrix))  # [1, 2, 2, 2, 5]
```

```go
package main

import (
    "fmt"
    "sort"
)

func riverSizes(matrix [][]int) []int {
    sizes := []int{}
    visited := make([][]bool, len(matrix))
    for i := range visited {
        visited[i] = make([]bool, len(matrix[0]))
    }

    for i := 0; i < len(matrix); i++ {
        for j := 0; j < len(matrix[0]); j++ {
            if !visited[i][j] && matrix[i][j] == 1 {
                size := exploreRiver(matrix, visited, i, j)
                sizes = append(sizes, size)
            }
        }
    }

    sort.Ints(sizes)
    return sizes
}

func exploreRiver(matrix [][]int, visited [][]bool, row, col int) int {
    size := 0
    stack := [][]int{{row, col}}

    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        r, c := node[0], node[1]

        if visited[r][c] {
            continue
        }
        visited[r][c] = true

        if matrix[r][c] == 0 {
            continue
        }
        size++

        directions := [][]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
        for _, d := range directions {
            nr, nc := r+d[0], c+d[1]
            if nr >= 0 && nr < len(matrix) && nc >= 0 && nc < len(matrix[0]) && !visited[nr][nc] {
                stack = append(stack, []int{nr, nc})
            }
        }
    }

    return size
}

func main() {
    matrix := [][]int{
        {1, 0, 0, 1, 0},
        {1, 0, 1, 0, 0},
    }
    fmt.Println(riverSizes(matrix))
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Number of Islands** - LeetCode version
2. **Max Area of Island** - Find largest island
3. **Flood Fill** - Change connected region

</details>

---

### 5. Youngest Common Ancestor

**Difficulty:** Medium

**Problem Statement:**
Find the youngest (deepest) common ancestor of two nodes.

**Example:**
```
          A
        / | \
       B  C  D
      / \   / \
     E   F G   H
    / \
   I   J

Nodes: E, I
Output: E (I's ancestor is E, E's ancestor is itself)
```

<details>
<summary><strong>Hints</strong></summary>

1. Find depth of both nodes
2. Bring deeper node to same level
3. Move both up until they meet

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class AncestralTree:
    def __init__(self, name):
        self.name = name
        self.ancestor = None

def getYoungestCommonAncestor(topAncestor, descendantOne, descendantTwo):
    """
    Time Complexity: O(D) where D is depth
    Space Complexity: O(1)
    """
    depth1 = getDepth(descendantOne, topAncestor)
    depth2 = getDepth(descendantTwo, topAncestor)

    # Bring to same level
    if depth1 > depth2:
        return getAncestor(descendantOne, descendantTwo, depth1 - depth2)
    else:
        return getAncestor(descendantTwo, descendantOne, depth2 - depth1)

def getDepth(node, topAncestor):
    depth = 0
    while node != topAncestor:
        depth += 1
        node = node.ancestor
    return depth

def getAncestor(lower, higher, diff):
    # Move lower up by diff levels
    while diff > 0:
        lower = lower.ancestor
        diff -= 1

    # Move both up until they meet
    while lower != higher:
        lower = lower.ancestor
        higher = higher.ancestor

    return lower
```

```go
package main

type AncestralTree struct {
    Name     string
    Ancestor *AncestralTree
}

func getYoungestCommonAncestor(top, one, two *AncestralTree) *AncestralTree {
    depth1 := getDepth(one, top)
    depth2 := getDepth(two, top)

    if depth1 > depth2 {
        return getAncestor(one, two, depth1-depth2)
    }
    return getAncestor(two, one, depth2-depth1)
}

func getDepth(node, top *AncestralTree) int {
    depth := 0
    for node != top {
        depth++
        node = node.Ancestor
    }
    return depth
}

func getAncestor(lower, higher *AncestralTree, diff int) *AncestralTree {
    for diff > 0 {
        lower = lower.Ancestor
        diff--
    }

    for lower != higher {
        lower = lower.Ancestor
        higher = higher.Ancestor
    }

    return lower
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Lowest Common Ancestor of Binary Tree** - No parent pointers
2. **LCA of BST** - Use BST property
3. **LCA of Deepest Leaves** - Special case

</details>

---

### 6. Remove Islands

**Difficulty:** Medium

**Problem Statement:**
Remove all islands (1s not connected to border) from a matrix.

**Example:**
```
Input:                    Output:
[1, 0, 0, 0, 0, 0]       [1, 0, 0, 0, 0, 0]
[0, 1, 0, 1, 1, 1]       [0, 0, 0, 1, 1, 1]
[0, 0, 1, 0, 1, 0]  ->   [0, 0, 0, 0, 1, 0]
[1, 1, 0, 0, 1, 0]       [1, 1, 0, 0, 1, 0]
[1, 0, 1, 1, 0, 0]       [1, 0, 0, 0, 0, 0]
[1, 0, 0, 0, 0, 1]       [1, 0, 0, 0, 0, 1]
```

<details>
<summary><strong>Hints</strong></summary>

1. Mark all 1s connected to border as "safe"
2. DFS/BFS from border 1s
3. Convert remaining 1s to 0s

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def removeIslands(matrix):
    """
    Time Complexity: O(m * n)
    Space Complexity: O(m * n)
    """
    rows, cols = len(matrix), len(matrix[0])

    # Mark border-connected 1s as 2
    for i in range(rows):
        for j in range(cols):
            is_border = i == 0 or i == rows - 1 or j == 0 or j == cols - 1
            if is_border and matrix[i][j] == 1:
                markConnected(matrix, i, j)

    # Convert: 2 -> 1 (border-connected), 1 -> 0 (islands)
    for i in range(rows):
        for j in range(cols):
            if matrix[i][j] == 1:
                matrix[i][j] = 0
            elif matrix[i][j] == 2:
                matrix[i][j] = 1

    return matrix

def markConnected(matrix, row, col):
    stack = [(row, col)]

    while stack:
        r, c = stack.pop()

        if matrix[r][c] != 1:
            continue

        matrix[r][c] = 2

        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < len(matrix) and 0 <= nc < len(matrix[0]):
                stack.append((nr, nc))

# Test
matrix = [
    [1, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1],
    [0, 0, 1, 0, 1, 0],
    [1, 1, 0, 0, 1, 0],
    [1, 0, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1]
]
result = removeIslands(matrix)
for row in result:
    print(row)
```

```go
package main

import "fmt"

func removeIslands(matrix [][]int) [][]int {
    rows, cols := len(matrix), len(matrix[0])

    // Mark border-connected 1s
    for i := 0; i < rows; i++ {
        for j := 0; j < cols; j++ {
            isBorder := i == 0 || i == rows-1 || j == 0 || j == cols-1
            if isBorder && matrix[i][j] == 1 {
                markConnected(matrix, i, j)
            }
        }
    }

    // Convert
    for i := 0; i < rows; i++ {
        for j := 0; j < cols; j++ {
            if matrix[i][j] == 1 {
                matrix[i][j] = 0
            } else if matrix[i][j] == 2 {
                matrix[i][j] = 1
            }
        }
    }

    return matrix
}

func markConnected(matrix [][]int, row, col int) {
    stack := [][]int{{row, col}}
    directions := [][]int{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

    for len(stack) > 0 {
        cell := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        r, c := cell[0], cell[1]

        if matrix[r][c] != 1 {
            continue
        }
        matrix[r][c] = 2

        for _, d := range directions {
            nr, nc := r+d[0], c+d[1]
            if nr >= 0 && nr < len(matrix) && nc >= 0 && nc < len(matrix[0]) {
                stack = append(stack, []int{nr, nc})
            }
        }
    }
}

func main() {
    matrix := [][]int{
        {1, 0, 0, 0, 0, 0},
        {0, 1, 0, 1, 1, 1},
    }
    fmt.Println(removeIslands(matrix))
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Surrounded Regions** - LeetCode O/X version
2. **Number of Enclaves** - Count cells in islands
3. **Pacific Atlantic Water Flow** - Flow from borders

</details>

---

### 7. Cycle In Graph

**Difficulty:** Medium

**Problem Statement:**
Detect if a directed graph contains a cycle.

**Example:**
```
edges = [
  [1, 3],  # 0 -> 1, 0 -> 3
  [2, 3, 4],  # 1 -> 2, 1 -> 3, 1 -> 4
  [0],  # 2 -> 0 (creates cycle!)
  [],
  [2, 5],
  []
]
Output: true (0 -> 1 -> 2 -> 0)
```

<details>
<summary><strong>Hints</strong></summary>

1. Use DFS with three states: unvisited, visiting, visited
2. Cycle exists if we reach a "visiting" node
3. Mark "visited" when all descendants explored

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def cycleInGraph(edges):
    """
    Time Complexity: O(V + E)
    Space Complexity: O(V)
    """
    WHITE, GRAY, BLACK = 0, 1, 2
    colors = [WHITE] * len(edges)

    def hasCycle(node):
        colors[node] = GRAY  # Visiting

        for neighbor in edges[node]:
            if colors[neighbor] == GRAY:  # Back edge
                return True
            if colors[neighbor] == WHITE:
                if hasCycle(neighbor):
                    return True

        colors[node] = BLACK  # Visited
        return False

    for node in range(len(edges)):
        if colors[node] == WHITE:
            if hasCycle(node):
                return True

    return False

# Test
edges = [
    [1, 3],
    [2, 3, 4],
    [0],
    [],
    [2, 5],
    []
]
print(cycleInGraph(edges))  # True
```

```go
package main

import "fmt"

const (
    WHITE = 0
    GRAY  = 1
    BLACK = 2
)

func cycleInGraph(edges [][]int) bool {
    colors := make([]int, len(edges))

    var hasCycle func(node int) bool
    hasCycle = func(node int) bool {
        colors[node] = GRAY

        for _, neighbor := range edges[node] {
            if colors[neighbor] == GRAY {
                return true
            }
            if colors[neighbor] == WHITE {
                if hasCycle(neighbor) {
                    return true
                }
            }
        }

        colors[node] = BLACK
        return false
    }

    for node := 0; node < len(edges); node++ {
        if colors[node] == WHITE {
            if hasCycle(node) {
                return true
            }
        }
    }

    return false
}

func main() {
    edges := [][]int{
        {1, 3},
        {2, 3, 4},
        {0},
        {},
        {2, 5},
        {},
    }
    fmt.Println(cycleInGraph(edges)) // true
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Course Schedule** - Prerequisite cycles
2. **Course Schedule II** - Topological sort
3. **Redundant Connection** - Find cycle edge

</details>

---

### 8-11. More Medium/Hard Problems

<details>
<summary><strong>Minimum Passes Of Matrix</strong></summary>

Find minimum passes to convert all negatives to positives (adjacent to positive).

```python
from collections import deque

def minimumPassesOfMatrix(matrix):
    passes = 0
    positives = deque()

    # Find initial positives
    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            if matrix[i][j] > 0:
                positives.append((i, j))

    while positives:
        size = len(positives)
        changed = False

        for _ in range(size):
            r, c = positives.popleft()

            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < len(matrix) and 0 <= nc < len(matrix[0]):
                    if matrix[nr][nc] < 0:
                        matrix[nr][nc] *= -1
                        positives.append((nr, nc))
                        changed = True

        if changed:
            passes += 1

    # Check if any negatives remain
    for row in matrix:
        for val in row:
            if val < 0:
                return -1

    return passes
```

</details>

<details>
<summary><strong>Two-Colorable</strong></summary>

Check if graph is bipartite (can be 2-colored).

```python
def twoColorable(edges):
    colors = [None] * len(edges)
    stack = [(0, True)]

    while stack:
        node, color = stack.pop()

        if colors[node] is not None:
            if colors[node] != color:
                return False
            continue

        colors[node] = color

        for neighbor in edges[node]:
            stack.append((neighbor, not color))

    return True
```

</details>

<details>
<summary><strong>Boggle Board (Hard)</strong></summary>

Find all words from dictionary in a grid.

```python
def boggleBoard(board, words):
    trie = buildTrie(words)
    found = set()

    for i in range(len(board)):
        for j in range(len(board[0])):
            explore(board, i, j, trie, found, set())

    return list(found)

def explore(board, r, c, node, found, visited):
    if (r, c) in visited:
        return
    if r < 0 or r >= len(board) or c < 0 or c >= len(board[0]):
        return

    char = board[r][c]
    if char not in node:
        return

    visited.add((r, c))
    node = node[char]

    if "*" in node:
        found.add(node["*"])

    for dr, dc in [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]:
        explore(board, r+dr, c+dc, node, found, visited)

    visited.remove((r, c))
```

</details>

---

## Practice Tips

### Graph Problem Categories

| Category | Examples |
|----------|----------|
| Traversal | BFS, DFS, level order |
| Shortest Path | Dijkstra, BFS (unweighted) |
| Cycle Detection | DFS coloring, Union-Find |
| Connectivity | Union-Find, DFS |
| Topological Sort | Course schedule, build order |

### When to Use What
- **BFS**: Shortest path (unweighted), level-by-level processing
- **DFS**: Path existence, cycle detection, topological sort
- **Union-Find**: Dynamic connectivity, MST (Kruskal's)
- **Dijkstra**: Shortest path with positive weights
