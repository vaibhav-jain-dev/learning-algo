<div id="viz-config" style="display:none">
{"name":"Ways To Traverse Graph","algorithm":"dp-graph-traversal","complexity":{"time":"O(width * height)","space":"O(width * height)"},"examples":[{"input":{"width":4,"height":3},"output":10,"inputRaw":"width = 4, height = 3","outputRaw":"10"},{"input":{"width":2,"height":2},"output":2,"inputRaw":"width = 2, height = 2","outputRaw":"2"},{"input":{"width":3,"height":3},"output":6,"inputRaw":"width = 3, height = 3","outputRaw":"6"},{"input":{"width":1,"height":5},"output":1,"inputRaw":"width = 1, height = 5","outputRaw":"1"}]}
</div>

# Ways To Traverse Graph

**Difficulty:** Medium (Blue)

## Problem Statement

You're given two positive integers representing the width and height of a grid-shaped, rectangular graph. Write a function that returns the number of ways to reach the bottom-right corner of the graph when starting at the top-left corner.

Each move you take must either go down or right. In other words, you can never move up or left in the graph.

For example, given a graph of width 2 and height 3, there are 3 ways to reach the bottom-right corner:
1. Down, Down, Right
2. Down, Right, Down
3. Right, Down, Down

## Examples

**Example 1:**
```
Input: width = 4, height = 3
Output: 10
```

**Example 2:**
```
Input: width = 2, height = 2
Output: 2
Explanation: Right-Down or Down-Right
```

**Example 3:**
```
Input: width = 3, height = 3
Output: 6
Explanation: All paths require 2 rights and 2 downs
```

**Example 4:**
```
Input: width = 1, height = 5
Output: 1
Explanation: Only one way - go down 4 times
```

## Constraints

- Width and height are positive integers >= 1
- The starting position counts as a cell in the grid
- Grid dimensions can be large, consider overflow for very large grids

## Hints

<details>
<summary>Hint 1</summary>
Think about the base cases: what if width is 1 or height is 1?
</details>

<details>
<summary>Hint 2</summary>
The number of ways to reach any cell equals the sum of ways to reach the cell above it and the cell to its left.
</details>

<details>
<summary>Hint 3</summary>
This is essentially a combinatorics problem: choose (width-1) rights from (width-1 + height-1) total moves.
</details>

<details>
<summary>Hint 4</summary>
For the DP approach, you can optimize space by only keeping track of one row at a time.
</details>

## Approach

### Approach 1: Dynamic Programming (2D Table)
1. Create a 2D table dp[height][width]
2. Base case: first row and first column are all 1s (only one way to reach them)
3. For each cell (i, j): dp[i][j] = dp[i-1][j] + dp[i][j-1]
4. Return dp[height-1][width-1]

**Time Complexity:** O(width * height)
**Space Complexity:** O(width * height)

### Approach 2: Dynamic Programming (Space Optimized)
1. Use a 1D array of size width
2. Update row by row
3. Each cell = itself (from above) + previous cell (from left)

**Time Complexity:** O(width * height)
**Space Complexity:** O(width)

### Approach 3: Mathematical (Combinatorics)
1. Total moves = (width - 1) + (height - 1)
2. Need to choose (width - 1) right moves from total moves
3. Answer = C(width + height - 2, width - 1) = (width + height - 2)! / ((width - 1)! * (height - 1)!)

**Time Complexity:** O(width + height)
**Space Complexity:** O(1)

---

## Similar Problems (Harder)

### 1. Unique Paths II (With Obstacles)
**Difficulty:** Medium-Hard

Same problem but some cells are blocked and cannot be traversed.

### 2. Minimum Path Sum
**Difficulty:** Medium

Each cell has a cost; find the path with minimum total cost.

### 3. Dungeon Game
**Difficulty:** Hard

Find minimum initial health needed to reach bottom-right with positive health.
