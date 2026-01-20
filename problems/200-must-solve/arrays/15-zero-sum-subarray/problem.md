<div id="viz-config" style="display:none">
{"name":"Zero Sum Subarray","algorithm":"hash-prefix-sum","complexity":{"time":"O(n)","space":"O(n)"},"examples":[{"input":{"nums":[1,2,-2,3]},"output":true,"inputRaw":"nums=[1,2,-2,3]","outputRaw":"true"},{"input":{"nums":[1,2,3,4,5]},"output":false,"inputRaw":"nums=[1,2,3,4,5]","outputRaw":"false"},{"input":{"nums":[-5,5,2,-3,1]},"output":true,"inputRaw":"nums=[-5,5,2,-3,1]","outputRaw":"true"}]}
</div>

# Zero Sum Subarray

**Difficulty:** Medium

## Problem Statement

Given an array of integers, determine whether there exists a contiguous subarray that sums to zero.

A subarray is a contiguous part of an array. The subarray can be of any length, including a single element.

## Examples

**Example 1:**
```
Input: nums = [1, 2, -2, 3]
Output: true
Explanation: The subarray [2, -2] sums to 0
```

**Example 2:**
```
Input: nums = [1, 2, 3, 4, 5]
Output: false
Explanation: No contiguous subarray sums to 0
```

**Example 3:**
```
Input: nums = [-5, 5, 2, -3, 1]
Output: true
Explanation: The subarray [-5, 5] sums to 0
```

## Constraints

- 1 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9

---

## Thought Process & Pattern Recognition

<details>
<summary><strong>Click to reveal thinking pattern</strong></summary>

### Key Insight
If we compute **prefix sums** (running total), a zero-sum subarray exists if:
1. Any prefix sum equals 0 (subarray from start), OR
2. Any two prefix sums are equal (their difference gives 0)

### Why This Works
```
Array:      [1, 2, -2, 3]
Prefix:     [1, 3,  1, 4]
             ^      ^
             |      |
             Same prefix sum!

If prefix[i] == prefix[j], then sum(i+1 to j) = 0
```

### Pattern Recognition
This is a **Hash Table + Prefix Sum** problem - common pattern for subarray sum problems.

</details>

---

## Visual Diagram

<details>
<summary><strong>Click to see step-by-step visualization</strong></summary>

```
Array:  [1, 2, -2, 3]
Index:   0  1   2  3

Step 1: prefixSum = 1, seen = {0}
        Add 1 to seen: {0, 1}

Step 2: prefixSum = 1+2 = 3, seen = {0, 1}
        Add 3 to seen: {0, 1, 3}

Step 3: prefixSum = 3+(-2) = 1, seen = {0, 1, 3}
        1 already in seen! FOUND ZERO SUM SUBARRAY

        The subarray between indices where prefix=1 sums to 0
        That's [2, -2] = 0
```

</details>

---

## Solution Approaches

### Approach 1: Hash Set with Prefix Sum (Recommended)

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Algorithm
1. Initialize a set with 0 (handles subarray starting at index 0)
2. Track running prefix sum
3. For each element:
   - Add to prefix sum
   - If prefix sum already in set, return true
   - Add prefix sum to set
4. Return false if no match found

#### Complexity
- Time: O(n) - single pass
- Space: O(n) - hash set storage

#### Why Start Set with 0?
If prefix sum becomes 0 at any point, that means the subarray from index 0 sums to 0.

</details>

---

### Approach 2: Brute Force (Not Recommended)

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Algorithm
Check every possible subarray and compute its sum.

#### Complexity
- Time: O(n^3) or O(n^2) with optimization
- Space: O(1)

Not efficient for large arrays.

</details>

---

## Complexity Comparison

```
+-------------------+----------+----------+
|     Approach      |   Time   |  Space   |
+-------------------+----------+----------+
| Hash + Prefix Sum |   O(n)   |   O(n)   |  RECOMMENDED
| Brute Force       |  O(n^2)  |   O(1)   |
+-------------------+----------+----------+
```

---

## Hints

<details>
<summary>Hint 1</summary>
Think about what the prefix sum tells you about subarrays.
</details>

<details>
<summary>Hint 2</summary>
If two prefix sums are equal, what does that mean about the elements between them?
</details>

<details>
<summary>Hint 3</summary>
Use a hash set to track all prefix sums seen so far.
</details>
