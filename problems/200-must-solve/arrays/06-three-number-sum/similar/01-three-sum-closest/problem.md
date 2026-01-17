# Three Sum Closest

**Difficulty:** Medium

## Problem Statement

Given an array of integers and a target value, find three integers in the array such that their sum is closest to the target. Return the sum of the three integers.

You may assume that each input would have exactly one solution.

## Examples

**Example 1:**
```
Input: array = [-1, 2, 1, -4], target = 1
Output: 2
Explanation: The sum that is closest to target is 2 (-1 + 2 + 1 = 2)
```

**Example 2:**
```
Input: array = [0, 0, 0], target = 1
Output: 0
Explanation: The closest sum is 0 (0 + 0 + 0 = 0)
```

**Example 3:**
```
Input: array = [1, 1, 1, 0], target = -100
Output: 2
Explanation: The closest sum is 2 (1 + 1 + 0 = 2)
```

**Example 4:**
```
Input: array = [4, 0, 5, -5, 3, 3, 0, -4, -5], target = -2
Output: -2
Explanation: The sum that equals target exactly is -2 (0 + 3 + -5 = -2)
```

## Constraints

- Array length is at least 3
- Array can contain duplicates
- There is exactly one solution

---

## Solution Approaches

### Approach 1: Brute Force - Check All Triplets

#### How It Works
```
For each triplet (i, j, k):
    Calculate sum = array[i] + array[j] + array[k]
    Track the sum with minimum |sum - target|
```

#### Complexity Analysis
```
Time Complexity: O(n^3) - Three nested loops
Space Complexity: O(1) - Only tracking best sum
```

---

### Approach 2: Sort + Two Pointers (RECOMMENDED)

#### Why This Approach is Best
- **Optimal time complexity** - O(n^2) with two-pointer technique
- **Minimal space** - O(1) excluding sorting
- **Early termination** - Can exit when exact match found

#### How It Works
```
1. Sort the array
2. For each element at index i:
   - Use two pointers (left, right) on remaining elements
   - Calculate current sum
   - Update closest if |current_sum - target| < |closest - target|
   - If sum < target: move left pointer right (need larger sum)
   - If sum > target: move right pointer left (need smaller sum)
   - If sum == target: return immediately (can't get closer!)
```

#### Visual Example
```
Array: [-1, 2, 1, -4], Target: 1

Step 0: Sort -> [-4, -1, 1, 2]

Fix i=0 (-4), left=1 (-1), right=3 (2)
  sum = -4 + -1 + 2 = -3, diff = |(-3) - 1| = 4
  -3 < 1, move left right

  left=2 (1), right=3 (2)
  sum = -4 + 1 + 2 = -1, diff = |(-1) - 1| = 2
  -1 < 1, move left right

  left >= right, done with i=0

Fix i=1 (-1), left=2 (1), right=3 (2)
  sum = -1 + 1 + 2 = 2, diff = |(2) - 1| = 1  <- new best!
  2 > 1, move right left

  left >= right, done with i=1

Result: 2 (closest sum found)
```

#### Complexity Analysis
```
Time Complexity: O(n^2)
  - Sorting: O(n log n)
  - Outer loop: O(n)
  - Inner two-pointer: O(n) per outer iteration
  - Total: O(n log n + n^2) = O(n^2)

Space Complexity: O(1) or O(log n) for sorting
```

---

### Approach 3: Binary Search Variation

#### How It Works
```
1. Sort the array
2. For each pair (i, j):
   - Use binary search to find element closest to (target - array[i] - array[j])
   - Update closest sum if better
```

#### Complexity Analysis
```
Time Complexity: O(n^2 log n)
Space Complexity: O(1)
```

Note: This is slower than two-pointer but demonstrates a different technique.

---

## Approach Comparison

```
+------------------+----------+--------+-------------------+
|     Approach     |   Time   | Space  |  Recommendation   |
+------------------+----------+--------+-------------------+
| Brute Force      |   O(n^3) |  O(1)  |  Too slow         |
| Sort + 2-Pointer |   O(n^2) |  O(1)  |  RECOMMENDED      |
| Binary Search    | O(n^2logn)|  O(1)  |  Alternative      |
+------------------+----------+--------+-------------------+
```

---

## Key Insights

1. **Track difference, not just sum** - We need minimum |sum - target|
2. **Early termination** - If we find exact match, return immediately
3. **Two-pointer direction** - Sum too small? Need larger numbers (move left). Sum too large? Need smaller numbers (move right)
4. **Sorting enables optimization** - Without sorting, we can't use two-pointer effectively

---

## Hints

<details>
<summary>Hint 1</summary>
Sort the array first to enable the two-pointer technique.
</details>

<details>
<summary>Hint 2</summary>
Track the closest sum found so far. Update it whenever you find a sum closer to target.
</details>

<details>
<summary>Hint 3</summary>
If you find a sum exactly equal to target, return immediately - you can't get closer!
</details>

---

## Related Problems

- Three Number Sum (find exact sum)
- Three Sum Smaller (count triplets with sum less than target)
- Four Sum Closest
