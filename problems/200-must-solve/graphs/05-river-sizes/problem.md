<div id="viz-config" style="display:none">
{"name":"River Sizes","algorithm":"graph-flood-fill","complexity":{"time":"O(N * M)","space":"O(N * M)"},"examples":[{"input":{"matrix":[[1,0,0,1,0],[1,0,1,0,0],[0,0,1,0,1],[1,0,1,0,1],[1,0,1,1,0]]},"output":[1,2,2,2,5],"inputRaw":"5x5 matrix with rivers","outputRaw":"[1, 2, 2, 2, 5]"},{"input":{"matrix":[[1,1,1],[1,1,1],[1,1,1]]},"output":[9],"inputRaw":"3x3 matrix all 1s","outputRaw":"[9]"}]}
</div>

# River Sizes

**Difficulty:** Medium (Yellow)

## Problem Statement

You're given a two-dimensional array (matrix) of potentially unequal height and width containing only 0s and 1s. Each 0 represents land, and each 1 represents part of a river. A river consists of any number of 1s that are either horizontally or vertically adjacent (but not diagonally adjacent). The number of adjacent 1s forming a river determines its size.

Write a function that returns an array of the sizes of all rivers represented in the input matrix. The sizes don't need to be in any particular order.

## Examples

**Example 1:**
```
Input: matrix = [
    [1, 0, 0, 1, 0],
    [1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0]
]

Output: [1, 2, 2, 2, 5]

Explanation:
- River of size 1: single 1 at position (0, 3)
- River of size 2: 1s at positions (0, 0) and (1, 0)
- River of size 2: 1s at positions (2, 4) and (3, 4)
- River of size 2: 1s at positions (3, 0) and (4, 0)
- River of size 5: 1s at positions (1, 2), (2, 2), (3, 2), (4, 2), (4, 3)
```

**Example 2:**
```
Input: matrix = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
]

Output: [9]

Explanation: All 1s are connected, forming one river of size 9.
```

## Constraints

- Matrix will contain only 0s and 1s
- Matrix can be empty
- Rivers are only formed by horizontal/vertical adjacency (not diagonal)
- Return an empty array if there are no rivers

## Hints

<details>
<summary>Hint 1</summary>
Traverse the matrix and when you find a 1 that hasn't been visited, start exploring the river from that position.
</details>

<details>
<summary>Hint 2</summary>
Use DFS or BFS to explore all connected 1s starting from each unvisited river cell.
</details>

<details>
<summary>Hint 3</summary>
Mark cells as visited to avoid counting them twice. You can modify the matrix in-place or use a separate visited set/array.
</details>

## Approach

### DFS/BFS Approach
1. Create a visited set or mark visited cells in-place
2. Iterate through each cell in the matrix
3. When an unvisited 1 is found, start DFS/BFS to explore the entire river
4. Count all connected 1s and add the size to the result
5. Mark all visited cells to avoid recounting

### Directions
- Check four directions: up, down, left, right
- Ensure bounds checking before exploring neighbors

**Time Complexity:** O(n * m) where n is rows and m is columns
**Space Complexity:** O(n * m) for the visited set

---

## Similar Problems (Harder)

### 1. Maximum River Network
**Difficulty:** Hard

Find the maximum total size if you can connect any two rivers by changing exactly one 0 to 1.

### 2. River Perimeter
**Difficulty:** Medium

Calculate the total perimeter of all rivers, where perimeter is the number of edges adjacent to land (0s) or the boundary.

### 3. Minimum Cut to Separate Rivers
**Difficulty:** Very Hard

Find the minimum number of 1s to change to 0s to separate a connected river into two distinct rivers.
