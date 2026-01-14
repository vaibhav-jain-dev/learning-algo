# Product of Array Except Self

## Problem Description

Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.

**You must write an algorithm that runs in O(n) time and without using the division operation.**

## Examples

### Example 1
```
Input: nums = [1, 2, 3, 4]
Output: [24, 12, 8, 6]
Explanation:
- answer[0] = 2 * 3 * 4 = 24
- answer[1] = 1 * 3 * 4 = 12
- answer[2] = 1 * 2 * 4 = 8
- answer[3] = 1 * 2 * 3 = 6
```

### Example 2
```
Input: nums = [-1, 1, 0, -3, 3]
Output: [0, 0, 9, 0, 0]
Explanation: All products except for index 2 contain 0, making them 0.
At index 2: (-1) * 1 * (-3) * 3 = 9
```

### Example 3
```
Input: nums = [2, 3, 4, 5]
Output: [60, 40, 30, 24]
Explanation:
- answer[0] = 3 * 4 * 5 = 60
- answer[1] = 2 * 4 * 5 = 40
- answer[2] = 2 * 3 * 5 = 30
- answer[3] = 2 * 3 * 4 = 24
```

## Constraints

- 2 <= nums.length <= 10^5
- -30 <= nums[i] <= 30
- The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer

## Follow-up

Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)

## Hints

<details>
<summary>Hint 1</summary>
Think about the product at each index as the product of two parts: the product of all elements to the LEFT and the product of all elements to the RIGHT.
</details>

<details>
<summary>Hint 2</summary>
Can you compute prefix products (product of all elements from start to current) and suffix products (product of all elements from current to end)?
</details>

<details>
<summary>Hint 3</summary>
For O(1) space: First pass - fill the result array with left products. Second pass - multiply each element by the right product while computing it on the fly.
</details>

## Approach

### Two-Pass Prefix/Suffix Product (Optimal Solution)

**Key Insight:** The product of all elements except self at index `i` equals `(product of all elements to the left of i) * (product of all elements to the right of i)`.

**Algorithm (Two-Array Approach):**
1. Create a `left` array where `left[i]` = product of all elements before index `i`
2. Create a `right` array where `right[i]` = product of all elements after index `i`
3. Result: `answer[i] = left[i] * right[i]`

**Algorithm (O(1) Space Approach):**
1. First pass (left to right): Build result array with left products
   - `result[i] = product of nums[0] to nums[i-1]`
2. Second pass (right to left): Multiply each result by right product
   - Keep a running `right_product` and multiply `result[i] *= right_product`
   - Update `right_product *= nums[i]`

**Time Complexity:** O(n) - two passes through the array
**Space Complexity:** O(1) extra space (output array doesn't count)

### Visual Example

```
nums = [1, 2, 3, 4]

Left Products (prefix products, excluding current):
Index:    0    1    2    3
left:     1    1    2    6
          ^    1   1*2  1*2*3

Right Products (suffix products, excluding current):
Index:    0    1    2    3
right:   24   12    4    1
        2*3*4 3*4   4    ^

Final Result:
answer[i] = left[i] * right[i]
Index:    0    1    2    3
answer:  24   12    8    6
        1*24 1*12  2*4  6*1
```

### O(1) Space Visual

```
nums = [1, 2, 3, 4]

Pass 1 (Left to Right) - Build left products in result:
result = [1, 1, 2, 6]

Pass 2 (Right to Left) - Multiply by right products:
right_product starts at 1

i=3: result[3] = 6 * 1 = 6, right_product = 1 * 4 = 4
i=2: result[2] = 2 * 4 = 8, right_product = 4 * 3 = 12
i=1: result[1] = 1 * 12 = 12, right_product = 12 * 2 = 24
i=0: result[0] = 1 * 24 = 24, right_product = 24 * 1 = 24

Final result = [24, 12, 8, 6]
```
