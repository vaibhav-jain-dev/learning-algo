<div id="viz-config" style="display:none">
{"name":"Product Sum","algorithm":"recursion-product-sum","complexity":{"time":"O(n)","space":"O(d)"},"examples":[{"input":{"array":[5,2,[7,-1],3,[6,[-13,8],4]]},"output":12,"inputRaw":"[5, 2, [7, -1], 3, [6, [-13, 8], 4]]","outputRaw":"12"}]}
</div>

# Product Sum

**Difficulty:** Easy

## Problem Statement

Write a function that takes in a "special" array and returns its product sum.

A "special" array is a non-empty array that contains either integers or other "special" arrays. The product sum of a "special" array is the sum of its elements, where "special" arrays inside it are summed themselves and then multiplied by their level of depth.

The depth of a "special" array is how far nested it is. For instance, the depth of `[]` is 1; the depth of the inner array in `[[]]` is 2; the depth of the innermost array in `[[[]]]` is 3.

## Examples

**Example 1:**
```
Input: [5, 2, [7, -1], 3, [6, [-13, 8], 4]]
Output: 12

Explanation:
- Depth 1: 5 + 2 + 3 = 10
- Depth 2: [7, -1] = 6 * 2 = 12, and [6, ..., 4] = (6 + ... + 4) * 2
- Depth 3: [-13, 8] = -5 * 3 = -15
- Total: 5 + 2 + (7 + -1)*2 + 3 + (6 + (-13 + 8)*3 + 4)*2 = 12
```

**Example 2:**
```
Input: [1, 2, 3]
Output: 6
```

**Example 3:**
```
Input: [[1, 2], 3]
Output: 9
Explanation: (1 + 2) * 2 + 3 = 9
```

## Constraints

- The input array will always be non-empty
- Arrays can be nested to any depth
- Elements are integers or other special arrays

## Hints

<details>
<summary>Hint 1</summary>
Track the current depth as you recurse into nested arrays.
</details>

<details>
<summary>Hint 2</summary>
Multiply the result of each recursive call by the current depth.
</details>

## Approach

### Recursive Solution (Optimal)
1. Define a helper that takes array and current depth (starting at 1)
2. For each element:
   - If integer, add to sum
   - If array, recursively compute its product sum at depth+1
3. Multiply the total sum by current depth

**Time Complexity:** O(n) where n is total number of elements including nested
**Space Complexity:** O(d) where d is maximum depth (recursion stack)
