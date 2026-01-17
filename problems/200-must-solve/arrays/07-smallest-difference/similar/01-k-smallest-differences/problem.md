# K Smallest Differences

**Difficulty:** Medium

## Problem Statement

Given two sorted arrays of integers `arr1` and `arr2`, and an integer `k`, find the K pairs with the smallest absolute differences between them. Each pair should consist of one element from `arr1` and one element from `arr2`.

Return the pairs sorted by their absolute difference in ascending order. If there are multiple pairs with the same difference, they can be returned in any order.

## Examples

**Example 1:**
```
Input: arr1 = [1, 3, 5], arr2 = [2, 4], k = 3
Output: [[1, 2], [3, 2], [3, 4]]
Explanation:
  - |1 - 2| = 1
  - |3 - 2| = 1
  - |3 - 4| = 1
  All three pairs have difference 1.
```

**Example 2:**
```
Input: arr1 = [1, 7, 11], arr2 = [2, 4, 6], k = 4
Output: [[1, 2], [1, 4], [7, 6], [1, 6]]
Explanation:
  - |1 - 2| = 1
  - |1 - 4| = 3
  - |7 - 6| = 1
  - |1 - 6| = 5
  Sorted by difference: [[1, 2], [7, 6], [1, 4], [1, 6]]
```

**Example 3:**
```
Input: arr1 = [1, 2], arr2 = [3], k = 2
Output: [[2, 3], [1, 3]]
Explanation:
  - |2 - 3| = 1
  - |1 - 3| = 2
```

## Constraints

- `1 <= arr1.length, arr2.length <= 10^5`
- `-10^6 <= arr1[i], arr2[i] <= 10^6`
- `1 <= k <= arr1.length * arr2.length`
- Both arrays are sorted in ascending order

---

## Thought Process & Pattern Recognition

### Naive Approach Analysis

**Brute Force Thinking:**
- Generate all pairs (n x m pairs)
- Calculate absolute difference for each
- Sort all pairs by difference
- Return first K

Time: O(nm log(nm)) for sorting all pairs

Can we do better? **Yes!** With a min-heap approach.

### The "Aha!" Moment

**Key Insight:** Since both arrays are sorted, for any element in arr1, the closest elements in arr2 are nearby. We can use a min-heap to efficiently explore pairs in order of their differences.

Think of it like a matrix where:
- Rows represent elements from arr1
- Columns represent elements from arr2
- Each cell is the absolute difference

We explore this matrix starting from promising cells (those with small differences).

### Pattern Recognition

This is a classic **"K Smallest in Sorted Matrix"** variant:
- Use min-heap to track candidates
- Start with initial promising pairs
- Extract minimum, add neighbors to heap
- Similar to "K Pairs with Smallest Sums"

---

## Visual Diagram: How Min-Heap Works

```
arr1 = [1, 3, 5], arr2 = [2, 4]

Difference Matrix:
         arr2[0]=2  arr2[1]=4
arr1[0]=1    1         3
arr1[1]=3    1         1
arr1[2]=5    3         1

Min-Heap approach (simplified):
1. Start with pairs from first elements
2. Pop smallest, add neighbors
3. Repeat k times

Initial heap: [(diff=1, 1, 2), ...]
Pop (1, 2), add neighbors -> [[1, 2]]
Pop (3, 2), add neighbors -> [[1, 2], [3, 2]]
Pop (3, 4), add neighbors -> [[1, 2], [3, 2], [3, 4]]
```

---

## Solution Approaches

### Approach 1: Min-Heap (Priority Queue) - RECOMMENDED

**Time Complexity:** O((n + m + k) log(n + m))
**Space Complexity:** O(n + m) for the heap

**Why This is Best:**
- Only explores necessary pairs
- Efficient for small k relative to n*m
- Natural fit for "K smallest" problems

```
Algorithm:
1. Create min-heap with initial candidates
2. Track visited pairs to avoid duplicates
3. Extract k pairs with smallest differences
4. For each extracted pair, add neighboring pairs to heap
```

### Approach 2: Two-Pointer with Expansion

**Time Complexity:** O(k * (n + m))
**Space Complexity:** O(k)

**When to Use:**
- When k is small
- Arrays are already sorted
- Memory is constrained

```
Start from positions where elements are closest
Expand outward to find k smallest differences
Track visited indices
```

### Approach 3: Brute Force with Sorting

**Time Complexity:** O(nm log(nm))
**Space Complexity:** O(nm)

**When to Use:**
- Arrays are small
- Need simple implementation
- k is close to n*m

---

## Approach Comparison Summary

```
+---------------------------+------------------+----------+------------------+
|         Approach          |       Time       |  Space   |  Recommendation  |
+---------------------------+------------------+----------+------------------+
| 1. Min-Heap               | O((n+m+k)log(n+m))| O(n+m)  |  BEST CHOICE     |
| 2. Two-Pointer Expansion  | O(k * (n + m))   |   O(k)   |  When k small    |
| 3. Brute Force + Sort     | O(nm log(nm))    |  O(nm)   |  Slow            |
+---------------------------+------------------+----------+------------------+

Where: n = len(arr1), m = len(arr2)
```

---

## Edge Cases to Consider

1. **k equals total pairs:** Return all pairs sorted
2. **Single element arrays:** Only one pair possible
3. **Identical elements:** Multiple pairs with diff=0
4. **Negative numbers:** Algorithm handles naturally
5. **k = 1:** Just need the single smallest difference

---

## Hints

<details>
<summary>Hint 1</summary>
Think about using a min-heap to always get the pair with the smallest difference next.
</details>

<details>
<summary>Hint 2</summary>
Since arrays are sorted, for each element in arr1, start by pairing with elements that are likely close in value from arr2.
</details>

<details>
<summary>Hint 3</summary>
Use binary search to find the starting position in arr2 for each element in arr1, then explore neighbors.
</details>

---

## Related Problems

- Smallest Difference (parent problem)
- K Pairs with Smallest Sums
- Find K Closest Elements
- Merge K Sorted Lists
