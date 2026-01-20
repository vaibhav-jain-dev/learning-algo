<div id="viz-config" style="display:none">
{"name":"A* Algorithm","algorithm":"a-star","complexity":{"time":"O(E log V)","space":"O(V)"},"examples":[{"input":{"grid":[[0,0,0,0],[0,1,1,0],[0,0,0,0],[0,1,0,0]],"start":[0,0],"end":[3,3]},"output":6,"inputRaw":"grid = [[0,0,0,0],[0,1,1,0],[0,0,0,0],[0,1,0,0]], start = [0,0], end = [3,3]","outputRaw":"6"}]}
</div>

# A* Algorithm - Shortest Path with Heuristic

**Difficulty:** Hard

## Problem Statement

Implement the A* (A-Star) search algorithm to find the shortest path between two nodes in a weighted graph or grid. A* is an informed search algorithm that uses a heuristic function to guide its search, making it more efficient than Dijkstra's algorithm for many problems.

Given a 2D grid where:
- `0` represents a walkable cell
- `1` represents an obstacle

Find the shortest path from the start position to the end position. You can move in 4 directions (up, down, left, right). Return the length of the shortest path, or -1 if no path exists.

## Examples

**Example 1:**
```
Input: grid = [[0,0,0,0],[0,1,1,0],[0,0,0,0],[0,1,0,0]], start = [0,0], end = [3,3]
Output: 6
Explanation: The shortest path is (0,0) -> (1,0) -> (2,0) -> (2,1) -> (2,2) -> (3,2) -> (3,3)
```

**Example 2:**
```
Input: grid = [[0,1],[1,0]], start = [0,0], end = [1,1]
Output: -1
Explanation: No path exists to reach the destination.
```

**Example 3:**
```
Input: grid = [[0,0,0],[0,0,0],[0,0,0]], start = [0,0], end = [2,2]
Output: 4
Explanation: The shortest path length is 4 (diagonal movement not allowed)
```

## Visual Explanation

### A* Algorithm Visualization

For input grid with start (0,0) and end (3,3):

```
Initial Grid:           After A* Search:
+---+---+---+---+       +---+---+---+---+
| S | . | . | . |       | S | . | . | . |
+---+---+---+---+       +---+---+---+---+
| * | # | # | . |       | * | # | # | . |
+---+---+---+---+       +---+---+---+---+
| * | * | * | . |       | * | * | * | . |
+---+---+---+---+       +---+---+---+---+
| . | # | * | E |       | . | # | * | E |
+---+---+---+---+       +---+---+---+---+

S = Start, E = End, # = Obstacle, * = Path, . = Empty
```

### Algorithm Step-by-Step

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Step</th>
<th style="border: 1px solid #ddd; padding: 10px;">Current Node</th>
<th style="border: 1px solid #ddd; padding: 10px;">g(n)</th>
<th style="border: 1px solid #ddd; padding: 10px;">h(n)</th>
<th style="border: 1px solid #ddd; padding: 10px;">f(n) = g + h</th>
<th style="border: 1px solid #ddd; padding: 10px;">Action</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">(0,0)</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">6</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">6</td>
<td style="border: 1px solid #ddd; padding: 10px;">Start, expand neighbors</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">(1,0)</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">5</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">6</td>
<td style="border: 1px solid #ddd; padding: 10px;">Move down</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">(2,0)</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">6</td>
<td style="border: 1px solid #ddd; padding: 10px;">Move down</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">(2,1)</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">6</td>
<td style="border: 1px solid #ddd; padding: 10px;">Move right</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">5</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">(2,2)</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">6</td>
<td style="border: 1px solid #ddd; padding: 10px;">Move right</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">6</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">(3,2)</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">5</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">6</td>
<td style="border: 1px solid #ddd; padding: 10px;">Move down</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">7</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">(3,3)</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">6</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">6</td>
<td style="border: 1px solid #ddd; padding: 10px;">Goal reached!</td>
</tr>
</table>

### Key Concepts

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>A* Formula:</strong>
<ul>
<li><strong>f(n) = g(n) + h(n)</strong></li>
<li><strong>g(n)</strong>: Actual cost from start to current node</li>
<li><strong>h(n)</strong>: Heuristic estimate from current node to goal</li>
<li><strong>f(n)</strong>: Total estimated cost of path through n</li>
</ul>
</div>

### Heuristic Functions

```
Manhattan Distance (for 4-directional movement):
h(n) = |n.x - goal.x| + |n.y - goal.y|

Euclidean Distance (for any-direction movement):
h(n) = sqrt((n.x - goal.x)^2 + (n.y - goal.y)^2)
```

## Constraints

- 1 <= grid.length, grid[0].length <= 100
- grid[i][j] is 0 or 1
- start and end positions are valid and walkable (value 0)
- 0 <= start[0], end[0] < grid.length
- 0 <= start[1], end[1] < grid[0].length

## Hints

<details>
<summary>Hint 1</summary>
Use a priority queue (min-heap) to always process the node with the lowest f(n) value first. This ensures you explore the most promising paths.
</details>

<details>
<summary>Hint 2</summary>
Keep track of visited nodes to avoid processing the same node multiple times. Use a set for O(1) lookup.
</details>

<details>
<summary>Hint 3</summary>
For grid-based pathfinding with 4-directional movement, Manhattan distance is an admissible heuristic (never overestimates the actual cost).
</details>

<details>
<summary>Hint 4</summary>
Store the g-score (cost from start) for each node and update it when you find a shorter path. Only add a node to the open set if the new path is better.
</details>

## Approach

### A* Algorithm Implementation

1. Initialize open set (priority queue) with start node
2. Initialize g-scores and f-scores
3. While open set is not empty:
   - Pop node with lowest f-score
   - If goal reached, return path length
   - For each neighbor:
     - Calculate tentative g-score
     - If better than known g-score, update and add to open set
4. Return -1 if no path found

**Time Complexity:** O(E log V) where E is edges, V is vertices
**Space Complexity:** O(V) for storing nodes in open/closed sets

### Why A* is Better than Dijkstra

- A* uses heuristics to guide search toward the goal
- Explores fewer nodes when heuristic is good
- Guaranteed optimal path if heuristic is admissible
- Combines benefits of Dijkstra (optimal) and Greedy BFS (fast)

---

## Similar Problems

### 1. Shortest Path in Grid with Obstacles
**Difficulty:** Medium

Find the shortest path in a grid avoiding obstacles, similar to basic A* application.

### 2. Sliding Puzzle (8-Puzzle Problem)
**Difficulty:** Hard

Use A* to solve the classic sliding puzzle game with minimum moves.

### 3. Word Ladder with Heuristic
**Difficulty:** Hard

Transform one word to another using A* with edit distance heuristic.
