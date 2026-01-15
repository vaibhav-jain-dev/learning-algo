# Find Pivot Index

## Problem Description

Given an array of integers `nums`, calculate the **pivot index** of this array.

The **pivot index** is the index where the sum of all the numbers **strictly to the left** of the index is equal to the sum of all the numbers **strictly to the right** of the index.

If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.

Return the **leftmost pivot index**. If no such index exists, return -1.

## Examples

### Example 1
```
Input: nums = [1, 7, 3, 6, 5, 6]
Output: 3
Explanation:
The pivot index is 3.
Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
Right sum = nums[4] + nums[5] = 5 + 6 = 11
```

### Example 2
```
Input: nums = [1, 2, 3]
Output: -1
Explanation:
There is no index that satisfies the conditions in the problem statement.
- Index 0: left = 0, right = 2 + 3 = 5 (not equal)
- Index 1: left = 1, right = 3 (not equal)
- Index 2: left = 1 + 2 = 3, right = 0 (not equal)
```

### Example 3
```
Input: nums = [2, 1, -1]
Output: 0
Explanation:
The pivot index is 0.
Left sum = 0 (no elements to the left)
Right sum = nums[1] + nums[2] = 1 + (-1) = 0
Left sum equals right sum, so index 0 is the pivot.
```

### Example 4
```
Input: nums = [-1, -1, -1, -1, -1, 0]
Output: 2
Explanation:
At index 2:
Left sum = (-1) + (-1) = -2
Right sum = (-1) + (-1) + 0 = -2
```

## Constraints

- 1 <= nums.length <= 10^4
- -1000 <= nums[i] <= 1000

## Hints

<details>
<summary>Hint 1</summary>
First calculate the total sum of the array. Think about how you can use this to find the pivot efficiently.
</details>

<details>
<summary>Hint 2</summary>
If left_sum equals right_sum, then: left_sum + nums[i] + right_sum = total_sum
This means: 2 * left_sum + nums[i] = total_sum
</details>

<details>
<summary>Hint 3</summary>
Iterate through the array, maintaining a running left_sum. At each index, check if 2 * left_sum + nums[i] equals total_sum.
</details>

## Approach

### Single Pass with Total Sum (Optimal Solution)

**Key Insight:**
- Total sum = left_sum + nums[i] + right_sum
- At pivot: left_sum = right_sum
- Therefore: total_sum = 2 * left_sum + nums[i]
- Rearranging: left_sum = (total_sum - nums[i]) / 2

But we can avoid division by checking: `2 * left_sum + nums[i] == total_sum`

**Algorithm:**
1. Calculate total sum of the array
2. Initialize left_sum = 0
3. Iterate through each index:
   - If `2 * left_sum + nums[i] == total_sum`, return current index
   - Add nums[i] to left_sum
4. If no pivot found, return -1

**Why this works:**
- At each position i, we know left_sum (sum of elements before i)
- right_sum = total_sum - left_sum - nums[i]
- We check if left_sum == right_sum, which is equivalent to checking:
  - left_sum == total_sum - left_sum - nums[i]
  - 2 * left_sum == total_sum - nums[i]
  - 2 * left_sum + nums[i] == total_sum

**Time Complexity:** O(n) - two passes (one for sum, one to find pivot)
**Space Complexity:** O(1)

### Visual Example

```
nums = [1, 7, 3, 6, 5, 6]

Step 1: Calculate total_sum
total_sum = 1 + 7 + 3 + 6 + 5 + 6 = 28

Step 2: Find pivot

Index 0: left_sum = 0
  Check: 2*0 + 1 = 1, total = 28 (not equal)
  Update: left_sum = 0 + 1 = 1

Index 1: left_sum = 1
  Check: 2*1 + 7 = 9, total = 28 (not equal)
  Update: left_sum = 1 + 7 = 8

Index 2: left_sum = 8
  Check: 2*8 + 3 = 19, total = 28 (not equal)
  Update: left_sum = 8 + 3 = 11

Index 3: left_sum = 11
  Check: 2*11 + 6 = 28, total = 28 (EQUAL!)
  Return 3

Verification at index 3:
  Left sum = 1 + 7 + 3 = 11 ✓
  Right sum = 5 + 6 = 11 ✓
  The element at pivot (6) is NOT included in either sum.
```

### Alternative: Using Prefix Sum Array

```
nums = [1, 7, 3, 6, 5, 6]
prefix = [0, 1, 8, 11, 17, 22, 28]

For each index i:
  left_sum = prefix[i]
  right_sum = prefix[n] - prefix[i+1] = total - prefix[i+1]

At i=3:
  left_sum = prefix[3] = 11
  right_sum = prefix[6] - prefix[4] = 28 - 17 = 11
  Equal! Return 3
```

This approach uses O(n) extra space but can be useful if you need to answer multiple pivot queries on the same array.
