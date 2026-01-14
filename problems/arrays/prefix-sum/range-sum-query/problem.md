# Range Sum Query - Immutable

## Problem Description

Given an integer array `nums`, handle multiple queries of the following type:

Calculate the sum of the elements of `nums` between indices `left` and `right` inclusive where `left <= right`.

Implement the `NumArray` class:
- `NumArray(int[] nums)` - Initializes the object with the integer array `nums`.
- `int sumRange(int left, int right)` - Returns the sum of the elements of `nums` between indices `left` and `right` inclusive (i.e., `nums[left] + nums[left + 1] + ... + nums[right]`).

## Examples

### Example 1
```
Input:
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]

Output: [null, 1, -1, -3]

Explanation:
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3
```

### Example 2
```
Input:
nums = [1, 2, 3, 4, 5]
Queries: sumRange(0, 4), sumRange(1, 3), sumRange(2, 2)

Output: [15, 9, 3]

Explanation:
sumRange(0, 4): 1 + 2 + 3 + 4 + 5 = 15
sumRange(1, 3): 2 + 3 + 4 = 9
sumRange(2, 2): 3 = 3
```

### Example 3
```
Input:
nums = [10, -5, 3, 8, -2, 7]
Queries: sumRange(0, 0), sumRange(5, 5), sumRange(0, 5)

Output: [10, 7, 21]

Explanation:
sumRange(0, 0): 10 (single element)
sumRange(5, 5): 7 (single element)
sumRange(0, 5): 10 + (-5) + 3 + 8 + (-2) + 7 = 21
```

## Constraints

- 1 <= nums.length <= 10^4
- -10^5 <= nums[i] <= 10^5
- 0 <= left <= right < nums.length
- At most 10^4 calls will be made to `sumRange`

## Hints

<details>
<summary>Hint 1</summary>
A naive approach would compute the sum for each query in O(n) time. With many queries, this becomes inefficient. How can we precompute information to answer each query in O(1)?
</details>

<details>
<summary>Hint 2</summary>
Consider using a prefix sum array where prefix[i] stores the sum of elements from index 0 to i-1.
</details>

<details>
<summary>Hint 3</summary>
If prefix[i] = nums[0] + nums[1] + ... + nums[i-1], then:
sumRange(left, right) = prefix[right+1] - prefix[left]
</details>

## Approach

### Prefix Sum Array (Optimal Solution)

**Key Insight:** Precompute a prefix sum array during initialization so each query can be answered in O(1) time.

**Algorithm:**

1. **Initialization:**
   - Create prefix array of size `n + 1`
   - `prefix[0] = 0` (sum of 0 elements)
   - `prefix[i] = prefix[i-1] + nums[i-1]` for i from 1 to n
   - So `prefix[i]` = sum of first `i` elements = `nums[0] + nums[1] + ... + nums[i-1]`

2. **Query:**
   - `sumRange(left, right) = prefix[right + 1] - prefix[left]`
   - This gives us: `nums[left] + nums[left+1] + ... + nums[right]`

**Why this works:**
- `prefix[right + 1]` = sum from index 0 to right (inclusive)
- `prefix[left]` = sum from index 0 to left-1 (inclusive)
- Subtracting gives sum from left to right

**Time Complexity:**
- Initialization: O(n)
- Each query: O(1)

**Space Complexity:** O(n) for prefix array

### Visual Example

```
nums = [-2, 0, 3, -5, 2, -1]
Index:   0  1  2   3  4   5

Prefix Sum Array:
prefix[0] = 0                           (no elements)
prefix[1] = 0 + (-2) = -2               (sum of nums[0])
prefix[2] = -2 + 0 = -2                 (sum of nums[0..1])
prefix[3] = -2 + 3 = 1                  (sum of nums[0..2])
prefix[4] = 1 + (-5) = -4               (sum of nums[0..3])
prefix[5] = -4 + 2 = -2                 (sum of nums[0..4])
prefix[6] = -2 + (-1) = -3              (sum of nums[0..5])

prefix = [0, -2, -2, 1, -4, -2, -3]
          0   1   2  3   4   5   6

Query: sumRange(0, 2)
= prefix[3] - prefix[0]
= 1 - 0 = 1
Verify: (-2) + 0 + 3 = 1 ✓

Query: sumRange(2, 5)
= prefix[6] - prefix[2]
= -3 - (-2) = -1
Verify: 3 + (-5) + 2 + (-1) = -1 ✓

Query: sumRange(0, 5)
= prefix[6] - prefix[0]
= -3 - 0 = -3
Verify: (-2) + 0 + 3 + (-5) + 2 + (-1) = -3 ✓
```

### Why Use Size n+1 for Prefix Array?

Using `n+1` size with `prefix[0] = 0` simplifies the formula:
- Without this: need special handling when `left = 0`
- With this: `sumRange(left, right) = prefix[right+1] - prefix[left]` works for all cases

Alternative: Use size `n` where `prefix[i] = sum of nums[0..i]`
- Then: `sumRange(left, right) = prefix[right] - (left > 0 ? prefix[left-1] : 0)`
- Requires conditional check, less elegant
