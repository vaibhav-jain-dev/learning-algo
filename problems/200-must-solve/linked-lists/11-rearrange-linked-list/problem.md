<div id="viz-config" style="display:none">
{"name":"Rearrange Linked List","algorithm":"ll-rearrange","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"list":[3,0,5,2,1,4],"k":3},"output":[0,2,1,3,5,4],"inputRaw":"3 -> 0 -> 5 -> 2 -> 1 -> 4, k = 3","outputRaw":"0 -> 2 -> 1 -> 3 -> 5 -> 4"},{"input":{"list":[1,4,3,2,5,2],"k":3},"output":[1,2,2,3,4,5],"inputRaw":"1 -> 4 -> 3 -> 2 -> 5 -> 2, k = 3","outputRaw":"1 -> 2 -> 2 -> 3 -> 4 -> 5"},{"input":{"list":[5,1,8,0,3],"k":3},"output":[1,0,3,5,8],"inputRaw":"5 -> 1 -> 8 -> 0 -> 3, k = 3","outputRaw":"1 -> 0 -> 3 -> 5 -> 8"}]}
</div>

# Rearrange Linked List

**Difficulty:** Hard

## Problem Statement

Write a function that takes in the head of a Singly Linked List and an integer `k`, rearranges the list in place (i.e., doesn't create a brand new list) around nodes with value `k`, and returns its new head.

Rearranging a Linked List around nodes with value `k` means:
1. All nodes with a value smaller than `k` come before nodes with value `k`
2. All nodes with a value equal to `k` come in the middle
3. All nodes with a value greater than `k` come after nodes with value `k`

The relative order of nodes within each group should be preserved from the original list.

## Examples

**Example 1:**
```
Input: 3 -> 0 -> 5 -> 2 -> 1 -> 4, k = 3
Output: 0 -> 2 -> 1 -> 3 -> 5 -> 4
Explanation:
  - Nodes < 3: 0, 2, 1 (preserved order)
  - Nodes = 3: 3
  - Nodes > 3: 5, 4 (preserved order)
```

**Example 2:**
```
Input: 1 -> 4 -> 3 -> 2 -> 5 -> 2, k = 3
Output: 1 -> 2 -> 2 -> 3 -> 4 -> 5
Explanation:
  - Nodes < 3: 1, 2, 2 (preserved order from original)
  - Nodes = 3: 3
  - Nodes > 3: 4, 5 (preserved order from original)
```

**Example 3:**
```
Input: 5 -> 1 -> 8 -> 0 -> 3, k = 3
Output: 1 -> 0 -> 3 -> 5 -> 8
Explanation:
  - Nodes < 3: 1, 0
  - Nodes = 3: 3
  - Nodes > 3: 5, 8
```

## Constraints

- Rearrange in place (don't create new nodes, only rewire pointers)
- Preserve relative order within each group (stable partition)
- Handle cases where k doesn't exist in the list
- Handle cases where all nodes are smaller/greater than k

## Hints

<details>
<summary>Hint 1</summary>
Create three separate chains: one for nodes less than k, one for nodes equal to k, and one for nodes greater than k.
</details>

<details>
<summary>Hint 2</summary>
Use dummy heads for each chain to simplify the logic of adding the first node.
</details>

<details>
<summary>Hint 3</summary>
After building the three chains, connect them: less_tail -> equal_head, equal_tail -> greater_head.
</details>

## Approach

### Three-Way Partition with Dummy Heads

1. **Create three dummy heads:** for less, equal, and greater chains
2. **Initialize tail pointers:** point to dummy heads initially
3. **Traverse original list:**
   - If node.value < k: append to less chain
   - If node.value == k: append to equal chain
   - If node.value > k: append to greater chain
4. **Connect the chains:**
   - Connect less_tail to equal_head (skip dummy)
   - Connect equal_tail to greater_head (skip dummy)
   - Set greater_tail.next = None
5. **Return:** less_head.next (skip dummy), handling empty less chain

**Time Complexity:** O(n) - single pass through the list
**Space Complexity:** O(1) - only pointer manipulation, no new nodes created

---

## Similar Problems (Harder)

### 1. Partition List Around Two Values
**Difficulty:** Hard

Given two values k1 and k2 (k1 < k2), partition the list into three parts: nodes < k1, nodes in [k1, k2], and nodes > k2.

### 2. Rearrange Linked List in Zigzag Order
**Difficulty:** Hard

Rearrange the list so that a < b > c < d > e... (alternating less than and greater than).

### 3. Rearrange Linked List by Odd/Even Position
**Difficulty:** Medium-Hard

Group all odd-indexed nodes together followed by even-indexed nodes, preserving relative order within each group.
