# Famous Algorithms

## Overview

These are fundamental algorithms that every programmer should know. They solve common problems efficiently and form the building blocks for more complex solutions.

## Key Concepts & Terminology

### Algorithm Categories
| Category | Algorithms |
|----------|------------|
| Search | Binary Search, DFS, BFS |
| Sort | Quick Sort, Merge Sort, Heap Sort |
| Graph | Dijkstra, Topological Sort, MST |
| String | KMP, Rabin-Karp |
| Data Structures | Union-Find, Trie, Segment Tree |

### Core Techniques
- **Greedy**: Make locally optimal choices
- **Divide & Conquer**: Split, solve, combine
- **Dynamic Programming**: Optimal substructure + overlapping subproblems
- **Backtracking**: Try all possibilities with pruning

---

## Problems

### 1. Kadane's Algorithm

**Difficulty:** Medium

**Problem Statement:**
Find the maximum sum contiguous subarray.

**Example:**
```
Input: [3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4]
Output: 19 (subarray: [1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1])
```

<details>
<summary><strong>Hints</strong></summary>

1. Track current sum and maximum sum
2. Reset current sum if it goes negative
3. At each position: extend current or start new

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def kadanesAlgorithm(array):
    """
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    max_sum = array[0]
    current_sum = array[0]

    for i in range(1, len(array)):
        # Either extend current subarray or start new
        current_sum = max(array[i], current_sum + array[i])
        max_sum = max(max_sum, current_sum)

    return max_sum

# With index tracking
def kadanesWithIndices(array):
    max_sum = array[0]
    current_sum = array[0]
    start = end = temp_start = 0

    for i in range(1, len(array)):
        if array[i] > current_sum + array[i]:
            current_sum = array[i]
            temp_start = i
        else:
            current_sum += array[i]

        if current_sum > max_sum:
            max_sum = current_sum
            start = temp_start
            end = i

    return max_sum, start, end

# Test
array = [3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4]
print(kadanesAlgorithm(array))  # 19
```

```go
package main

import "fmt"

func kadanesAlgorithm(array []int) int {
    maxSum := array[0]
    currentSum := array[0]

    for i := 1; i < len(array); i++ {
        if array[i] > currentSum+array[i] {
            currentSum = array[i]
        } else {
            currentSum += array[i]
        }

        if currentSum > maxSum {
            maxSum = currentSum
        }
    }

    return maxSum
}

func main() {
    array := []int{3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4}
    fmt.Println(kadanesAlgorithm(array)) // 19
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Maximum Product Subarray** - Product instead of sum
2. **Maximum Circular Subarray** - Circular array
3. **Best Time to Buy and Sell Stock** - Profit maximization

</details>

---

### 2. Union Find

**Difficulty:** Medium

**Problem Statement:**
Implement Union-Find (Disjoint Set Union) with union by rank and path compression.

**Example:**
```
UnionFind(5)  # 5 elements: 0, 1, 2, 3, 4
union(0, 1)   # {0, 1}, {2}, {3}, {4}
union(2, 3)   # {0, 1}, {2, 3}, {4}
union(0, 3)   # {0, 1, 2, 3}, {4}
find(0) == find(3)  # True
find(0) == find(4)  # False
```

<details>
<summary><strong>Hints</strong></summary>

1. parent[i] = parent of element i
2. Find: follow parents to root with path compression
3. Union: connect roots, use rank to keep balanced

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
class UnionFind:
    """
    Time Complexity:
    - Find: O(α(n)) ≈ O(1) amortized
    - Union: O(α(n)) ≈ O(1) amortized
    Space Complexity: O(n)
    """
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        """Find root with path compression"""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        """Union by rank"""
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False  # Already connected

        # Attach smaller tree under larger tree
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1

        return True

    def connected(self, x, y):
        return self.find(x) == self.find(y)

# Test
uf = UnionFind(5)
uf.union(0, 1)
uf.union(2, 3)
uf.union(0, 3)
print(uf.connected(0, 3))  # True
print(uf.connected(0, 4))  # False
```

```go
package main

import "fmt"

type UnionFind struct {
    parent []int
    rank   []int
}

func NewUnionFind(n int) *UnionFind {
    parent := make([]int, n)
    for i := range parent {
        parent[i] = i
    }
    return &UnionFind{
        parent: parent,
        rank:   make([]int, n),
    }
}

func (uf *UnionFind) Find(x int) int {
    if uf.parent[x] != x {
        uf.parent[x] = uf.Find(uf.parent[x])
    }
    return uf.parent[x]
}

func (uf *UnionFind) Union(x, y int) bool {
    rootX := uf.Find(x)
    rootY := uf.Find(y)

    if rootX == rootY {
        return false
    }

    if uf.rank[rootX] < uf.rank[rootY] {
        uf.parent[rootX] = rootY
    } else if uf.rank[rootX] > uf.rank[rootY] {
        uf.parent[rootY] = rootX
    } else {
        uf.parent[rootY] = rootX
        uf.rank[rootX]++
    }

    return true
}

func main() {
    uf := NewUnionFind(5)
    uf.Union(0, 1)
    uf.Union(2, 3)
    uf.Union(0, 3)
    fmt.Println(uf.Find(0) == uf.Find(3)) // true
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Number of Connected Components** - Count components
2. **Redundant Connection** - Find cycle edge
3. **Accounts Merge** - Merge by common element

</details>

---

### 3. Dijkstra's Algorithm

**Difficulty:** Hard

**Problem Statement:**
Find shortest paths from a source vertex to all other vertices in a weighted graph with non-negative edges.

**Example:**
```
edges = [
    [[1, 7]],          # 0 -> 1 (weight 7)
    [[2, 6], [3, 20], [4, 3]],  # 1 -> 2,3,4
    [[3, 14]],         # 2 -> 3
    [[4, 2]],          # 3 -> 4
    [],
    []
]
start = 0
Output: [0, 7, 13, 27, 10, -1]
```

<details>
<summary><strong>Hints</strong></summary>

1. Use min-heap to always process closest unvisited vertex
2. Relax edges: if new_dist < known_dist, update
3. Greedy: once a vertex is visited, its distance is final

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
import heapq

def dijkstrasAlgorithm(start, edges):
    """
    Time Complexity: O((V + E) log V)
    Space Complexity: O(V)
    """
    n = len(edges)
    distances = [float('inf')] * n
    distances[start] = 0

    # Min heap: (distance, vertex)
    heap = [(0, start)]
    visited = set()

    while heap:
        dist, vertex = heapq.heappop(heap)

        if vertex in visited:
            continue

        visited.add(vertex)

        for neighbor, weight in edges[vertex]:
            if neighbor not in visited:
                new_dist = dist + weight
                if new_dist < distances[neighbor]:
                    distances[neighbor] = new_dist
                    heapq.heappush(heap, (new_dist, neighbor))

    # Replace infinity with -1
    return [-1 if d == float('inf') else d for d in distances]

# Test
edges = [
    [[1, 7]],
    [[2, 6], [3, 20], [4, 3]],
    [[3, 14]],
    [[4, 2]],
    [],
    []
]
print(dijkstrasAlgorithm(0, edges))  # [0, 7, 13, 27, 10, -1]
```

```go
package main

import (
    "container/heap"
    "fmt"
)

type Item struct {
    vertex   int
    distance int
}

type MinHeap []Item

func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i].distance < h[j].distance }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *MinHeap) Push(x interface{}) {
    *h = append(*h, x.(Item))
}

func (h *MinHeap) Pop() interface{} {
    old := *h
    n := len(old)
    item := old[n-1]
    *h = old[0 : n-1]
    return item
}

func dijkstrasAlgorithm(start int, edges [][][]int) []int {
    n := len(edges)
    distances := make([]int, n)
    for i := range distances {
        distances[i] = 1<<31 - 1
    }
    distances[start] = 0

    visited := make(map[int]bool)
    h := &MinHeap{{start, 0}}
    heap.Init(h)

    for h.Len() > 0 {
        item := heap.Pop(h).(Item)
        vertex, dist := item.vertex, item.distance

        if visited[vertex] {
            continue
        }
        visited[vertex] = true

        for _, edge := range edges[vertex] {
            neighbor, weight := edge[0], edge[1]
            if !visited[neighbor] {
                newDist := dist + weight
                if newDist < distances[neighbor] {
                    distances[neighbor] = newDist
                    heap.Push(h, Item{neighbor, newDist})
                }
            }
        }
    }

    for i := range distances {
        if distances[i] == 1<<31-1 {
            distances[i] = -1
        }
    }

    return distances
}

func main() {
    edges := [][][]int{
        {{1, 7}},
        {{2, 6}, {3, 20}, {4, 3}},
        {{3, 14}},
        {{4, 2}},
        {},
        {},
    }
    fmt.Println(dijkstrasAlgorithm(0, edges))
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Network Delay Time** - LeetCode Dijkstra
2. **Cheapest Flights Within K Stops** - Modified Dijkstra
3. **Path with Maximum Probability** - Max probability path

</details>

---

### 4. Topological Sort

**Difficulty:** Hard

**Problem Statement:**
Find a valid ordering of vertices in a DAG such that for every edge u→v, u comes before v.

**Example:**
```
jobs = [1, 2, 3, 4]
deps = [[1, 2], [1, 3], [3, 2], [4, 2], [4, 3]]
Output: [1, 4, 3, 2] or [4, 1, 3, 2]
```

<details>
<summary><strong>Hints</strong></summary>

1. Build adjacency list and in-degree count
2. Start with vertices having in-degree 0
3. BFS: remove vertex, reduce in-degree of neighbors

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
from collections import deque

def topologicalSort(jobs, deps):
    """
    Time Complexity: O(V + E)
    Space Complexity: O(V + E)
    """
    # Build graph
    graph = {job: [] for job in jobs}
    in_degree = {job: 0 for job in jobs}

    for prereq, job in deps:
        graph[prereq].append(job)
        in_degree[job] += 1

    # Start with jobs having no prerequisites
    queue = deque([job for job in jobs if in_degree[job] == 0])
    result = []

    while queue:
        job = queue.popleft()
        result.append(job)

        for dependent in graph[job]:
            in_degree[dependent] -= 1
            if in_degree[dependent] == 0:
                queue.append(dependent)

    # Check for cycle
    if len(result) != len(jobs):
        return []

    return result

# DFS approach
def topologicalSortDFS(jobs, deps):
    graph = {job: [] for job in jobs}
    for prereq, job in deps:
        graph[prereq].append(job)

    WHITE, GRAY, BLACK = 0, 1, 2
    colors = {job: WHITE for job in jobs}
    result = []

    def dfs(job):
        if colors[job] == GRAY:
            return False  # Cycle detected
        if colors[job] == BLACK:
            return True

        colors[job] = GRAY
        for dependent in graph[job]:
            if not dfs(dependent):
                return False
        colors[job] = BLACK
        result.append(job)
        return True

    for job in jobs:
        if colors[job] == WHITE:
            if not dfs(job):
                return []

    return result[::-1]

# Test
jobs = [1, 2, 3, 4]
deps = [[1, 2], [1, 3], [3, 2], [4, 2], [4, 3]]
print(topologicalSort(jobs, deps))  # [1, 4, 3, 2] or similar valid order
```

```go
package main

import "fmt"

func topologicalSort(jobs []int, deps [][]int) []int {
    graph := make(map[int][]int)
    inDegree := make(map[int]int)

    for _, job := range jobs {
        graph[job] = []int{}
        inDegree[job] = 0
    }

    for _, dep := range deps {
        prereq, job := dep[0], dep[1]
        graph[prereq] = append(graph[prereq], job)
        inDegree[job]++
    }

    queue := []int{}
    for _, job := range jobs {
        if inDegree[job] == 0 {
            queue = append(queue, job)
        }
    }

    result := []int{}
    for len(queue) > 0 {
        job := queue[0]
        queue = queue[1:]
        result = append(result, job)

        for _, dependent := range graph[job] {
            inDegree[dependent]--
            if inDegree[dependent] == 0 {
                queue = append(queue, dependent)
            }
        }
    }

    if len(result) != len(jobs) {
        return []int{}
    }

    return result
}

func main() {
    jobs := []int{1, 2, 3, 4}
    deps := [][]int{{1, 2}, {1, 3}, {3, 2}, {4, 2}, {4, 3}}
    fmt.Println(topologicalSort(jobs, deps))
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Course Schedule II** - LeetCode version
2. **Alien Dictionary** - Order from sorted words
3. **Sequence Reconstruction** - Verify unique order

</details>

---

### 5-8. More Hard/Very Hard Algorithms

<details>
<summary><strong>Kruskal's Algorithm (MST)</strong></summary>

Find Minimum Spanning Tree using Union-Find.

```python
def kruskalsAlgorithm(edges, n):
    """
    Time: O(E log E)
    edges: [(u, v, weight), ...]
    """
    # Sort edges by weight
    edges.sort(key=lambda x: x[2])

    uf = UnionFind(n)
    mst = []
    total_weight = 0

    for u, v, weight in edges:
        if uf.union(u, v):
            mst.append((u, v, weight))
            total_weight += weight

            if len(mst) == n - 1:
                break

    return mst, total_weight
```

</details>

<details>
<summary><strong>Prim's Algorithm (MST)</strong></summary>

Find MST using min-heap.

```python
import heapq

def primsAlgorithm(graph, n):
    """
    Time: O(E log V)
    graph: adjacency list with weights
    """
    visited = set()
    mst = []
    heap = [(0, 0, -1)]  # (weight, vertex, from)

    while heap and len(visited) < n:
        weight, vertex, from_vertex = heapq.heappop(heap)

        if vertex in visited:
            continue

        visited.add(vertex)
        if from_vertex != -1:
            mst.append((from_vertex, vertex, weight))

        for neighbor, edge_weight in graph[vertex]:
            if neighbor not in visited:
                heapq.heappush(heap, (edge_weight, neighbor, vertex))

    return mst
```

</details>

<details>
<summary><strong>KMP Algorithm (String Matching)</strong></summary>

Pattern matching in O(n + m) time.

```python
def knuthMorrisPratt(text, pattern):
    """
    Time: O(n + m)
    Returns: starting index of match or -1
    """
    if not pattern:
        return 0

    # Build failure function
    lps = [0] * len(pattern)
    length = 0
    i = 1

    while i < len(pattern):
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length > 0:
            length = lps[length - 1]
        else:
            lps[i] = 0
            i += 1

    # Search
    i = j = 0
    while i < len(text):
        if text[i] == pattern[j]:
            i += 1
            j += 1
            if j == len(pattern):
                return i - j  # Match found
        elif j > 0:
            j = lps[j - 1]
        else:
            i += 1

    return -1
```

</details>

<details>
<summary><strong>A* Algorithm (Pathfinding)</strong></summary>

Optimal pathfinding with heuristic.

```python
import heapq

def aStarAlgorithm(start, end, graph, heuristic):
    """
    Time: O(E log V) with good heuristic
    heuristic: function(node) -> estimated distance to end
    """
    open_set = [(heuristic(start), 0, start, [start])]
    visited = set()

    while open_set:
        _, g_score, current, path = heapq.heappop(open_set)

        if current == end:
            return path

        if current in visited:
            continue

        visited.add(current)

        for neighbor, weight in graph[current]:
            if neighbor not in visited:
                new_g = g_score + weight
                f_score = new_g + heuristic(neighbor)
                heapq.heappush(open_set, (f_score, new_g, neighbor, path + [neighbor]))

    return None  # No path found
```

</details>

---

## Algorithm Selection Guide

| Problem Type | Best Algorithm |
|--------------|----------------|
| Max contiguous sum | Kadane's |
| Dynamic connectivity | Union-Find |
| Shortest path (positive weights) | Dijkstra |
| Shortest path (negative weights) | Bellman-Ford |
| All pairs shortest | Floyd-Warshall |
| Minimum Spanning Tree | Kruskal/Prim |
| Dependency ordering | Topological Sort |
| Pattern matching | KMP |
| Grid pathfinding | A* |
