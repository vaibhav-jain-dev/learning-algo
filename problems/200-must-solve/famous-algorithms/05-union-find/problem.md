<div id="viz-config" style="display:none">
{"name":"Disjoint Set Union","algorithm":"union-find","complexity":{"time":"O(alpha(n))","space":"O(n)"},"examples":[{"input":{"n":5,"operations":["union(0,1)","union(2,3)","union(1,3)","find(0)==find(3)?","find(0)==find(4)?"]},"output":{"disjointSets":2,"find03":true,"find04":false},"inputRaw":"n = 5, union(0,1), union(2,3), union(1,3)","outputRaw":"2 disjoint sets: {0,1,2,3} and {4}"}]}
</div>

# Union-Find (Disjoint Set Union)

**Difficulty:** Medium

## Problem Statement

Implement a Union-Find data structure (also known as Disjoint Set Union or DSU) that supports the following operations:

1. **Find(x)**: Determine which set element x belongs to (returns the representative/root)
2. **Union(x, y)**: Merge the sets containing elements x and y

The data structure should be optimized with:
- **Path Compression**: Flatten the tree during Find operations
- **Union by Rank/Size**: Always attach the smaller tree under the larger one

## Examples

**Example:**
```
Input:
  n = 5 (elements 0-4)
  Operations:
    union(0, 1)
    union(2, 3)
    union(1, 3)
    find(0) == find(3)?  -> true
    find(0) == find(4)?  -> false

Number of disjoint sets: 2 ({0,1,2,3} and {4})
```

## Visual Explanation

### Initial State (5 separate sets)

```
[0]   [1]   [2]   [3]   [4]
```

### After union(0, 1)

```
  0       [2]   [3]   [4]
  |
  1
```

### After union(2, 3)

```
  0       2       [4]
  |       |
  1       3
```

### After union(1, 3) - Sets merge!

```
      0           [4]
    / | \
   1  2  3
```

### Union by Rank Table

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Element</th>
<th style="border: 1px solid #ddd; padding: 10px;">Parent</th>
<th style="border: 1px solid #ddd; padding: 10px;">Rank</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">0 (root)</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">2</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">0</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">0</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">4</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">4 (root)</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">0</td>
</tr>
</table>

### Path Compression Visualization

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Before Find(3)</th>
<th style="border: 1px solid #ddd; padding: 10px;">After Find(3)</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
0 <- 2 <- 3
</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">
  0
 / \
2   3
</td>
</tr>
</table>

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>Key Insight:</strong> Path compression makes subsequent Find operations O(1) by flattening the tree. Combined with union by rank, both operations become nearly O(1) amortized - specifically O(α(n)) where α is the inverse Ackermann function.
</div>

## Constraints

- 1 <= n <= 10^5
- 0 <= x, y < n

## Hints

<details>
<summary>Hint 1</summary>
Initialize each element as its own parent (self-loop means it's a root).
</details>

<details>
<summary>Hint 2</summary>
Path compression: during Find, make every visited node point directly to the root.
</details>

<details>
<summary>Hint 3</summary>
Union by rank: attach the shorter tree under the root of the taller tree to keep trees balanced.
</details>

## Approach

### Find with Path Compression
```python
def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])  # Path compression
    return parent[x]
```

### Union by Rank
```python
def union(x, y):
    root_x, root_y = find(x), find(y)
    if root_x == root_y:
        return False  # Already in same set
    if rank[root_x] < rank[root_y]:
        root_x, root_y = root_y, root_x
    parent[root_y] = root_x
    if rank[root_x] == rank[root_y]:
        rank[root_x] += 1
    return True
```

**Time Complexity:** O(α(n)) per operation (nearly constant)
**Space Complexity:** O(n)

---

## Similar Problems

### 1. Number of Provinces
**Difficulty:** Medium

Find the number of connected components in an undirected graph.

### 2. Redundant Connection
**Difficulty:** Medium

Find the edge that can be removed to make the graph a tree.

### 3. Accounts Merge
**Difficulty:** Medium

Merge accounts that share common emails.
