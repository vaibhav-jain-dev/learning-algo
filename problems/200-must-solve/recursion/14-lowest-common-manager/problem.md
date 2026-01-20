<div id="viz-config" style="display:none">
{"name":"Lowest Common Manager","algorithm":"recursion-manager","complexity":{"time":"O(n)","space":"O(h)"},"examples":[{"input":{"topManager":"A","employee1":"E","employee2":"G"},"output":"A","inputRaw":"topManager = A, employee1 = E, employee2 = G","outputRaw":"A"}]}
</div>

# Lowest Common Manager

**Difficulty:** Hard

## Problem Statement

You're given three inputs: the top manager of an organization (the root of an organizational chart), and two employees that are guaranteed to be in the organization.

Write a function that returns the lowest common manager of the two employees. The "lowest common manager" is the deepest manager (furthest from the top) that has both employees as subordinates (directly or indirectly through other managers).

Each employee has:
- A name (unique identifier)
- A list of direct reports (subordinates)

An employee is considered a subordinate of themselves.

## Examples

**Example 1:**
```
Organization:
          A
        / | \
       B  C  D
      /|     |
     E F     G
    /
   H

Input:
  topManager = A
  employee1 = E
  employee2 = G

Output: A

Explanation: A is the lowest manager that has both E (through B)
and G (through D) as subordinates.
```

**Example 2:**
```
Same organization as above

Input:
  topManager = A
  employee1 = E
  employee2 = F

Output: B

Explanation: B directly manages both E and F.
```

**Example 3:**
```
Same organization as above

Input:
  topManager = A
  employee1 = H
  employee2 = E

Output: E

Explanation: E is H's manager and is also a subordinate of itself.
```

**Example 4:**
```
Same organization as above

Input:
  topManager = A
  employee1 = B
  employee2 = B

Output: B

Explanation: An employee is their own lowest common manager.
```

## Constraints

- The organization has at least 1 employee
- Both target employees exist in the organization
- Each employee has a unique name
- An employee can have 0 or more direct reports
- The tree has no cycles

## Hints

<details>
<summary>Hint 1</summary>
This problem is similar to Lowest Common Ancestor (LCA) in a binary tree, but with multiple children per node.
</details>

<details>
<summary>Hint 2</summary>
Use DFS: for each node, count how many of the target employees are in its subtree (including itself).
</details>

<details>
<summary>Hint 3</summary>
The LCM is the deepest node where the count of found employees becomes 2.
</details>

<details>
<summary>Hint 4</summary>
Track both the count and the answer. Once you find a node where count reaches 2 for the first time, that's your LCM.
</details>

## Approach

### DFS with Subtree Count

The key insight: the lowest common manager is the deepest node in the tree where both employees are found in its subtree (including itself).

1. **DFS Traversal:**
   - For each employee, recursively check their direct reports
   - Count how many of the two target employees are in each subtree

2. **Return Information:**
   - From each recursive call, return: (count of targets found, LCM if found)
   - The count helps us know when we've found both employees

3. **Finding the LCM:**
   - If current employee is one of the targets, increment count
   - Add counts from all children's subtrees
   - When count becomes 2 and we haven't found LCM yet, current node is the LCM

### Algorithm Steps

```
function getLowestCommonManager(manager, emp1, emp2):
    result = DFS(manager, emp1, emp2)
    return result.lcm

function DFS(current, emp1, emp2):
    numFound = 0
    lcm = null

    for each directReport in current.directReports:
        childResult = DFS(directReport, emp1, emp2)

        if childResult.lcm is not null:
            return childResult  // LCM already found in subtree

        numFound += childResult.numFound

    if current == emp1 or current == emp2:
        numFound += 1

    if numFound == 2:
        lcm = current  // Found both - this is the LCM

    return {numFound, lcm}
```

### Why This Works

- The recursion explores depth-first, so we find the deepest node first
- Once we find both targets (count = 2), that node must be their LCM
- We immediately return once LCM is found, avoiding unnecessary work

### Alternative: Store Paths

1. Find path from root to employee1
2. Find path from root to employee2
3. Return last common node in both paths

This approach is simpler but requires two passes and O(h) extra space for paths.

**Time Complexity:** O(n) - visit each employee once
**Space Complexity:** O(h) - recursion stack depth, where h is the height of the org chart

---

## Similar Problems

### 1. Lowest Common Ancestor of a Binary Tree (LeetCode 236)
Same concept but limited to binary trees (max 2 children per node).
- **Key difference:** Simpler structure with only left/right children.

### 2. Lowest Common Ancestor with Parent Pointers
Find LCA when each node has a parent pointer.
- **Key difference:** Can traverse upward, enabling different algorithms.

### 3. Lowest Common Ancestor of Deepest Leaves
Find LCA of all deepest nodes in a tree.
- **Key difference:** Dynamic set of targets based on depth.
