<div id="viz-config" style="display:none">
{"name":"Depth First Search","algorithm":"graph-dfs","complexity":{"time":"O(V + E)","space":"O(V)"},"examples":[{"input":{"tree":{"name":"A","children":[{"name":"B","children":[{"name":"E"},{"name":"F","children":[{"name":"I"},{"name":"J"}]}]},{"name":"C"},{"name":"D","children":[{"name":"G","children":[{"name":"K"}]},{"name":"H"}]}]}},"output":["A","B","E","F","I","J","C","D","G","K","H"],"inputRaw":"Tree with root A","outputRaw":"[\"A\", \"B\", \"E\", \"F\", \"I\", \"J\", \"C\", \"D\", \"G\", \"K\", \"H\"]"}]}
</div>

# Depth First Search

**Difficulty:** Easy (Green)

## Problem Statement

You're given a Node class that has a name and an array of optional children nodes. Implement the depthFirstSearch method on the Node class, which takes in an empty array, traverses the tree using the Depth-first Search approach (specifically navigating the tree from left to right), stores all of the nodes' names in the input array, and returns it.

## Examples

**Example:**
```
Input:        A
            / | \
           B  C  D
          / \   / \
         E   F G   H
            / \  \
           I   J  K

Output: ["A", "B", "E", "F", "I", "J", "C", "D", "G", "K", "H"]
```

## Constraints

- Navigate from left to right
- Tree can have any number of children per node

## Hints

<details>
<summary>Hint 1</summary>
Use recursion - process current node, then recurse on children.
</details>

<details>
<summary>Hint 2</summary>
DFS can also be done iteratively with a stack.
</details>

## Approach

1. Add current node's name to array
2. Recursively call DFS on each child (left to right)
3. Return the array

**Time Complexity:** O(v + e) where v is vertices, e is edges
**Space Complexity:** O(v)

---

## Similar Problems (Harder)

### 1. DFS with Path Recording
**Difficulty:** Medium

Track and return the path to each leaf node.

### 2. DFS with Cycle Detection
**Difficulty:** Medium

Detect if the graph contains a cycle during DFS.

### 3. DFS with Topological Sort
**Difficulty:** Hard

Use DFS to perform topological sorting on a DAG.
