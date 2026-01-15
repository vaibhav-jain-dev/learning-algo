# Fruit Into Baskets

## Problem Description

You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array `fruits` where `fruits[i]` is the **type** of fruit the `i-th` tree produces.

You want to collect as much fruit as possible. However, the owner has some strict rules:

1. You only have **two baskets**, and each basket can only hold a **single type** of fruit.
2. There is no limit on the amount of fruit each basket can hold.
3. Starting from any tree of your choice, you must pick **exactly one fruit** from every tree while moving to the right.
4. Once you reach a tree with fruit that cannot fit in your baskets (a third type), you must stop.

Return the **maximum** number of fruits you can pick.

This is equivalent to finding the **longest subarray containing at most 2 distinct elements**.

## Examples

### Example 1
```
Input: fruits = [1, 2, 1]
Output: 3
Explanation: We can pick from all 3 trees.
```

### Example 2
```
Input: fruits = [0, 1, 2, 2]
Output: 3
Explanation: We can pick from trees [1, 2, 2].
If we had started at the first tree, we would only pick [0, 1].
```

### Example 3
```
Input: fruits = [1, 2, 3, 2, 2]
Output: 4
Explanation: We can pick from trees [2, 3, 2, 2].
If we had started at the first tree, we would only pick [1, 2].
```

### Example 4
```
Input: fruits = [3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]
Output: 5
Explanation: We can pick from trees [1, 2, 1, 1, 2] (indices 3-7).
```

## Constraints

- 1 <= fruits.length <= 10^5
- 0 <= fruits[i] < fruits.length

## Hints

<details>
<summary>Hint 1</summary>
This problem is about finding the longest contiguous subarray with at most 2 distinct values.
</details>

<details>
<summary>Hint 2</summary>
Use a sliding window with two pointers. Use a hash map to count the frequency of each fruit type in the current window.
</details>

<details>
<summary>Hint 3</summary>
When you have more than 2 types in your window, shrink from the left until you're back to 2 types.
</details>

<details>
<summary>Hint 4</summary>
When shrinking, remove fruits from the left and update counts. When a count reaches 0, remove that fruit type from your map.
</details>

## Approach

### Sliding Window with HashMap

1. **Initialize**: Two pointers (left, right), a HashMap for fruit counts, and max result
2. **Expand window** (move right pointer):
   - Add the fruit at right to the HashMap
   - Increment its count
3. **Contract window when invalid** (more than 2 fruit types):
   - While there are more than 2 types:
     - Decrement count of leftmost fruit
     - If count becomes 0, remove from HashMap
     - Move left pointer
4. **Update result**: Current window size = right - left + 1
5. **Return**: Maximum window size found

### Time Complexity
- O(n) where n is the length of the array
- Each element is visited at most twice

### Space Complexity
- O(1) since we have at most 3 distinct elements in the HashMap at any time

### Key Insight

This is the classic "longest subarray with at most K distinct elements" problem where K=2. The sliding window maintains the invariant that the window contains at most 2 distinct fruit types. When this invariant is violated, we shrink from the left.
