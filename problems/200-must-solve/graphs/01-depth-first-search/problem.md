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

---

## Thought Process & Pattern Recognition

<details>
<summary><strong>Click to reveal thinking pattern</strong></summary>

### Step 1: Understand the Core Problem
**Question to ask yourself:** "What order should I visit the nodes?"

DFS means we go as **deep as possible** before backtracking:
- Visit a node
- Go to its first child, then that child's first child, etc.
- When we hit a leaf, backtrack and try the next sibling

### Step 2: Identify the Pattern
**Key insight:** This is the classic **DFS traversal pattern** - "go deep first."

```
        A                    Visit order:
      / | \                  1. A (start at root)
     B  C  D                 2. B (first child of A)
    / \   / \                3. E (first child of B)
   E   F G   H               4. F (second child of B)
      / \  \                 5. I (first child of F)
     I   J  K                6. J (second child of F)
                             7. C (second child of A)
                             8. D (third child of A)
                             9. G (first child of D)
                             10. K (child of G)
                             11. H (second child of D)
```

### Step 3: Recognize the Algorithm Pattern
This is a **Recursion / Stack** pattern because:
- Each recursive call processes one node
- The call stack naturally handles backtracking
- Can also be done iteratively with explicit stack

### Step 4: Consider Alternative Approaches
1. **Recursive** - Natural, elegant, uses call stack
2. **Iterative with Stack** - Explicit control, avoids stack overflow
3. **BFS for comparison** - Level by level, uses queue instead

### Step 5: Choose Optimal Solution
Recursive DFS wins for simplicity. Use iterative only if:
- Tree is extremely deep (risk of stack overflow)
- You need explicit control over the traversal

</details>

---

## Visual Diagram: How It Works

<details>
<summary><strong>Click to see step-by-step visualization</strong></summary>

```
                    DEPTH FIRST SEARCH VISUALIZATION
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                              [A] ← Start here                              │
│                            /  |  \                                         │
│                         [B]  [C]  [D]                                      │
│                        / \       / \                                       │
│                      [E] [F]   [G] [H]                                     │
│                          / \    |                                          │
│                        [I] [J] [K]                                         │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                       TRAVERSAL ORDER (Left to Right)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Step 1: Visit A, add "A"                  result: [A]                     │
│          Go to first child B                                                │
│                                                                             │
│  Step 2: Visit B, add "B"                  result: [A, B]                  │
│          Go to first child E                                                │
│                                                                             │
│  Step 3: Visit E, add "E"                  result: [A, B, E]               │
│          No children, backtrack to B                                        │
│                                                                             │
│  Step 4: Visit F, add "F"                  result: [A, B, E, F]            │
│          Go to first child I                                                │
│                                                                             │
│  Step 5: Visit I, add "I"                  result: [A, B, E, F, I]         │
│          No children, backtrack to F                                        │
│                                                                             │
│  Step 6: Visit J, add "J"                  result: [A, B, E, F, I, J]      │
│          No children, backtrack to A                                        │
│                                                                             │
│  Step 7: Visit C, add "C"                  result: [A, B, E, F, I, J, C]   │
│          No children, continue to D                                         │
│                                                                             │
│  Step 8-11: Continue with D subtree...                                     │
│                                                                             │
│  FINAL: [A, B, E, F, I, J, C, D, G, K, H]                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Call Stack Visualization

```
                          RECURSIVE CALL STACK
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│    dfs(A)                                                                   │
│    ├── add "A" to result                                                   │
│    ├── dfs(B)                                                               │
│    │   ├── add "B" to result                                               │
│    │   ├── dfs(E)                                                           │
│    │   │   └── add "E" to result (leaf - return)                           │
│    │   └── dfs(F)                                                           │
│    │       ├── add "F" to result                                           │
│    │       ├── dfs(I) → add "I" (leaf)                                     │
│    │       └── dfs(J) → add "J" (leaf)                                     │
│    ├── dfs(C)                                                               │
│    │   └── add "C" to result (leaf)                                        │
│    └── dfs(D)                                                               │
│        ├── add "D" to result                                               │
│        ├── dfs(G)                                                           │
│        │   ├── add "G" to result                                           │
│        │   └── dfs(K) → add "K" (leaf)                                     │
│        └── dfs(H) → add "H" (leaf)                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

</details>

---

## Solution Approaches

### Approach 1: Recursive DFS ⭐ RECOMMENDED

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why This Approach?
- **Most intuitive** - Recursion naturally models the "go deep" behavior
- **Clean code** - Just a few lines
- **Optimal for most cases** - Unless tree is extremely deep

#### Pseudo Code
```
function depthFirstSearch(node, result):
    result.append(node.name)           # Visit current node
    for each child in node.children:   # Process children left to right
        depthFirstSearch(child, result)
    return result
```

#### How It Works
1. Add current node's name to result array
2. For each child (left to right), recursively call DFS
3. Recursion naturally handles backtracking via call stack

#### Code Logic
```
┌─────────────────────────────────────────────────┐
│  def dfs(node, array):                          │
│      array.append(node.name)                    │
│      for child in node.children:                │
│          dfs(child, array)                      │
│      return array                               │
└─────────────────────────────────────────────────┘
```

#### Complexity Analysis
```
┌────────────────────────────────────────────────────────────────┐
│  TIME COMPLEXITY: O(V + E)                                     │
├────────────────────────────────────────────────────────────────┤
│  • V = number of vertices (nodes)                              │
│  • E = number of edges                                         │
│  • We visit each node exactly once: O(V)                       │
│  • We traverse each edge once during recursion: O(E)           │
│  • Total: O(V + E)                                             │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│  SPACE COMPLEXITY: O(V)                                        │
├────────────────────────────────────────────────────────────────┤
│  • Call stack depth = height of tree                           │
│  • Worst case (skewed tree): O(V)                              │
│  • Best case (balanced tree): O(log V)                         │
│  • Result array also takes O(V) space                          │
└────────────────────────────────────────────────────────────────┘
```

</details>

---

### Approach 2: Iterative with Stack

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why Consider This Approach?
- **Avoids stack overflow** - For very deep trees
- **Explicit control** - Easier to add features like early termination
- **Same complexity** - No performance difference

#### Pseudo Code
```
function depthFirstSearchIterative(root):
    result = []
    stack = [root]

    while stack is not empty:
        node = stack.pop()
        result.append(node.name)
        # Add children in REVERSE order (so leftmost is processed first)
        for child in reversed(node.children):
            stack.push(child)

    return result
```

#### Key Insight
We push children in **reverse order** so that when we pop, the leftmost child comes out first.

```
Stack behavior for node A with children [B, C, D]:
1. Push D, C, B (reverse order)
2. Stack: [D, C, B]
3. Pop B first → Correct! Left-to-right order
```

#### Complexity Analysis
```
TIME:  O(V + E) - Same as recursive
SPACE: O(V)     - Explicit stack instead of call stack

When to prefer iterative?
• Very deep trees (risk of stack overflow)
• Need to limit traversal depth
• Language doesn't optimize tail recursion
```

</details>

---

## Approach Comparison Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SOLUTION COMPARISON TABLE                            │
├───────────────────┬──────────┬──────────┬──────────────┬───────────────────┤
│     Approach      │   Time   │  Space   │  Difficulty  │   Recommendation  │
├───────────────────┼──────────┼──────────┼──────────────┼───────────────────┤
│ 1. Recursive      │ O(V + E) │   O(V)   │    Easy      │  ⭐ BEST CHOICE   │
├───────────────────┼──────────┼──────────┼──────────────┼───────────────────┤
│ 2. Iterative      │ O(V + E) │   O(V)   │   Medium     │  ✓ Deep trees    │
└───────────────────┴──────────┴──────────┴──────────────┴───────────────────┘

WHY RECURSIVE IS RECOMMENDED:
┌─────────────────────────────────────────────────────────────────────────────┐
│ ✓ Clean, readable code - just 4 lines                                       │
│ ✓ Natural representation of "go deep" behavior                              │
│ ✓ Call stack handles backtracking automatically                             │
│ ✓ Standard pattern expected in interviews                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Hints

<details>
<summary>Hint 1</summary>
Use recursion - process current node, then recurse on children.
</details>

<details>
<summary>Hint 2</summary>
DFS can also be done iteratively with a stack. Remember to add children in reverse order!
</details>

<details>
<summary>Hint 3</summary>
The call stack naturally handles "backtracking" in recursive DFS.
</details>

---

## Similar Problems (Harder)

### 1. Number of Islands
**Difficulty:** Medium

Use DFS to count connected components in a 2D grid.

```
Input: grid = [
  ["1","1","0","0"],
  ["1","1","0","0"],
  ["0","0","1","0"],
  ["0","0","0","1"]
]
Output: 3
```

**Pattern:** Apply DFS from each unvisited "1" to mark entire island.

---

### 2. Clone Graph
**Difficulty:** Medium

Deep copy a graph using DFS traversal.

**Pattern:** DFS + hash map to track cloned nodes.

---

### 3. All Paths Source to Target
**Difficulty:** Medium

Find all paths from source to target in a DAG.

**Pattern:** DFS with path tracking and backtracking.
