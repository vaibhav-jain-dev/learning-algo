# Course Schedule (Cycle Detection in Directed Graph)

**Difficulty:** Medium-Hard (L2 - Requires Graph Understanding)
**Category:** Graph, Topological Sort, DFS, BFS
**Companies:** Google, Amazon, Facebook, Microsoft, Apple, Uber, Netflix

## Problem Statement

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.

Return `true` if you can finish all courses. Otherwise, return `false`.

## Real-World Applications

- **Build systems:** Detecting circular dependencies (Maven, Gradle, npm)
- **Package managers:** Dependency resolution
- **Spreadsheets:** Detecting circular cell references
- **Task scheduling:** Prerequisites in project management
- **Compiler:** Detecting circular imports/includes

## Examples

### Example 1
```
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true

Explanation:
There are 2 courses to take.
To take course 1, you need to finish course 0.
So it's possible: take 0 first, then 1.

Graph visualization:
    0 → 1
```

### Example 2
```
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false

Explanation:
To take course 1, you need course 0.
To take course 0, you need course 1.
This is a cycle - impossible!

Graph visualization:
    0 ⇆ 1  (cycle!)
```

### Example 3
```
Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: true

Graph visualization:
        0
       / \
      ↓   ↓
      1   2
       \ /
        ↓
        3

Valid orderings: [0,1,2,3] or [0,2,1,3]
```

### Example 4 (Larger Cycle)
```
Input: numCourses = 5, prerequisites = [[0,1],[1,2],[2,3],[3,4],[4,2]]
Output: false

Graph visualization:
    0 ← 1 ← 2 ← 3 ← 4
            ↑_______|
            (cycle: 2→3→4→2)
```

## Constraints

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length == 2`
- `0 <= ai, bi < numCourses`
- All the pairs `prerequisites[i]` are unique

## Mental Model & Thinking Process

### Key Insight #1: Graph Representation
This is a **directed graph** problem:
- Nodes = courses
- Directed edge from B to A means "B must be taken before A"
- If there's a cycle, it's impossible to complete all courses

### Key Insight #2: Cycle Detection
The problem reduces to: **Does this directed graph have a cycle?**

Two main approaches:
1. **DFS with state tracking** - Track "visiting" vs "visited" states
2. **BFS (Kahn's Algorithm)** - Remove nodes with no incoming edges iteratively

### Key Insight #3: Three States in DFS
```
WHITE (0): Not visited yet
GRAY (1): Currently being explored (in current DFS path)
BLACK (2): Fully explored (all descendants processed)

If we encounter a GRAY node during DFS → CYCLE DETECTED!
```

### Why Gray Means Cycle
If we're at node X and we reach a gray node Y:
- Y is currently in our DFS path (we started from Y, went through some nodes, and reached X)
- X has an edge to Y
- This means there's a path Y → ... → X → Y = CYCLE!

## Hints

<details>
<summary>Hint 1: Model as a Graph</summary>

Build an adjacency list where `graph[i]` contains all courses that depend on course `i` (or that course `i` is a prerequisite for).
</details>

<details>
<summary>Hint 2: Think About What "Impossible" Means</summary>

When is it impossible to finish all courses? When there's a circular dependency. How do you detect a cycle in a directed graph?
</details>

<details>
<summary>Hint 3: DFS Approach</summary>

Use DFS with 3 states: unvisited, visiting (in current path), visited (done). If you reach a "visiting" node, you've found a cycle.
</details>

<details>
<summary>Hint 4: BFS/Kahn's Approach</summary>

Start with nodes that have no prerequisites (in-degree 0). Process them, remove their outgoing edges, and repeat. If you process all nodes, no cycle. If you can't (some nodes always have prerequisites), there's a cycle.
</details>

## Approach Explanations

### Approach 1: DFS with Color States
**Time: O(V + E) | Space: O(V + E)**

```
1. Build adjacency list
2. For each node:
   - If WHITE: Start DFS
   - If find GRAY node during DFS: CYCLE! Return false
   - Mark node GRAY before exploring neighbors
   - Mark node BLACK after exploring all neighbors
3. If no cycle found: Return true
```

### Approach 2: BFS (Kahn's Algorithm / Topological Sort)
**Time: O(V + E) | Space: O(V + E)**

```
1. Build adjacency list and count in-degrees
2. Add all nodes with in-degree 0 to queue
3. While queue not empty:
   - Remove node from queue
   - Increment processed count
   - For each neighbor:
     - Decrement in-degree
     - If in-degree becomes 0: Add to queue
4. Return processed_count == numCourses
```

**Why this works:** If there's a cycle, nodes in the cycle will always have in-degree > 0, so they'll never be added to the queue.

## Visual Walkthrough (DFS)

```
numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]

Graph (adjacency list, reverse direction for "depends on"):
0 → [1, 2]   (0 is prerequisite for 1 and 2)
1 → [3]      (1 is prerequisite for 3)
2 → [3]      (2 is prerequisite for 3)
3 → []

DFS from node 0:
  Color 0 → GRAY
  Visit 1:
    Color 1 → GRAY
    Visit 3:
      Color 3 → GRAY
      No neighbors
      Color 3 → BLACK
    Color 1 → BLACK
  Visit 2:
    Color 2 → GRAY
    Visit 3:
      Already BLACK - skip
    Color 2 → BLACK
  Color 0 → BLACK

All nodes processed, no cycle found → Return true
```

## Visual Walkthrough (BFS/Kahn's)

```
numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]

In-degrees: [0, 1, 1, 2]  (course 3 has 2 prerequisites)

Initial queue: [0] (only course 0 has in-degree 0)
Processed: 0

Step 1: Process 0
  Queue: []
  Decrease in-degree of 1 and 2
  In-degrees: [-, 0, 0, 2]
  Add 1, 2 to queue
  Processed: 1

Step 2: Process 1
  Queue: [2]
  Decrease in-degree of 3
  In-degrees: [-, -, 0, 1]
  Processed: 2

Step 3: Process 2
  Queue: []
  Decrease in-degree of 3
  In-degrees: [-, -, -, 0]
  Add 3 to queue
  Processed: 3

Step 4: Process 3
  Queue: []
  No neighbors
  Processed: 4

Processed (4) == numCourses (4) → Return true
```

## Common Mistakes to Avoid

1. **Wrong edge direction:** Think carefully about what the edge represents
2. **Forgetting isolated nodes:** Courses with no prerequisites
3. **Not handling multiple components:** Graph may be disconnected
4. **Confusing "visiting" and "visited":** Critical for cycle detection

## Complexity Analysis

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| DFS | O(V + E) | O(V + E) | V = nodes, E = edges |
| BFS/Kahn's | O(V + E) | O(V + E) | Same complexity |

## Related Problems

- Course Schedule II (Medium) - Return the order, not just possibility
- Alien Dictionary (Hard) - Build graph from lexicographic order
- Parallel Courses (Medium) - Minimum semesters needed
- Prerequisite Tasks (Medium) - Check if specific task can be done
- Detect Cycle in Directed Graph (Classic graph problem)

## Follow-up Questions

1. **Course Schedule II:** Return ONE valid ordering
2. **Course Schedule III:** Given durations, how many courses can you take?
3. **Parallel Courses:** What's the minimum number of semesters?
4. **What if we need to detect ALL cycles, not just if one exists?**

## Interview Tips

1. **Clarify the problem:** What does the edge direction mean?
2. **Start simple:** Draw a small example graph
3. **Choose your approach:** DFS or BFS - both work
4. **Edge cases:** Empty prerequisites, single course, disconnected graph
5. **Real-world connection:** Build systems, package managers
