<div id="viz-config" style="display:none">
{"name":"Sliding Puzzle","algorithm":"a-star-bfs","complexity":{"time":"O((mn)!)","space":"O((mn)!)"},"examples":[{"input":{"board":[[1,2,3],[4,0,5]]},"output":1,"inputRaw":"board = [[1,2,3],[4,0,5]]","outputRaw":"1"}]}
</div>

# Sliding Puzzle (8-Puzzle Problem)

**Difficulty:** Hard

## Problem Statement

On a 2x3 board, there are 5 tiles labeled 1 to 5, and an empty square represented by 0. A move consists of choosing 0 and a 4-directionally adjacent number and swapping them.

The state of the board is solved if and only if the board is `[[1,2,3],[4,5,0]]`.

Given the puzzle board, return the least number of moves required to solve the puzzle. If it is impossible to solve, return -1.

## Examples

**Example 1:**
```
Input: board = [[1,2,3],[4,0,5]]
Output: 1
Explanation: Swap 0 and 5 in one move.
```

**Example 2:**
```
Input: board = [[1,2,3],[5,4,0]]
Output: -1
Explanation: No possible way to reach the goal.
```

**Example 3:**
```
Input: board = [[4,1,2],[5,0,3]]
Output: 5
Explanation: 5 moves to reach [[1,2,3],[4,5,0]]
```

## Visual Explanation

### Move Sequence Example

```
Initial State:      Goal State:
+---+---+---+       +---+---+---+
| 1 | 2 | 3 |       | 1 | 2 | 3 |
+---+---+---+  -->  +---+---+---+
| 4 | 0 | 5 |       | 4 | 5 | 0 |
+---+---+---+       +---+---+---+

Move 0 right (swap with 5):
+---+---+---+
| 1 | 2 | 3 |
+---+---+---+
| 4 | 5 | 0 |  ✓ Goal reached in 1 move!
+---+---+---+
```

### A* Heuristic: Manhattan Distance

```
Current:           Goal:
+---+---+---+      +---+---+---+
| 4 | 1 | 2 |      | 1 | 2 | 3 |
+---+---+---+      +---+---+---+
| 5 | 0 | 3 |      | 4 | 5 | 0 |
+---+---+---+      +---+---+---+

Manhattan distance for each tile:
- Tile 1: |0-0| + |1-0| = 1
- Tile 2: |0-0| + |2-1| = 1
- Tile 3: |1-0| + |2-2| = 1
- Tile 4: |0-1| + |0-0| = 1
- Tile 5: |1-1| + |0-1| = 1

Total heuristic h(n) = 5
```

## Constraints

- board.length == 2
- board[i].length == 3
- 0 <= board[i][j] <= 5
- Each value board[i][j] is unique

## Hints

<details>
<summary>Hint 1</summary>
Represent the board state as a string for easy hashing and comparison.
</details>

<details>
<summary>Hint 2</summary>
Use BFS for shortest path or A* with Manhattan distance heuristic for better performance.
</details>

<details>
<summary>Hint 3</summary>
Precompute the valid neighbors for each position of the empty tile.
</details>

## Approach

### A* with Manhattan Distance

1. Convert board to string representation
2. Use priority queue with f(n) = g(n) + h(n)
3. h(n) = sum of Manhattan distances for each tile
4. Generate neighbors by swapping 0 with adjacent tiles
5. Return moves when goal state reached

**Time Complexity:** O((mn)!) - worst case explores all permutations
**Space Complexity:** O((mn)!) for storing visited states
