# Smallest Difference

**Difficulty:** Medium (Blue)

## Problem Statement

Write a function that takes in two non-empty arrays of integers, finds the pair of numbers (one from each array) whose absolute difference is closest to zero, and returns an array containing these two numbers, with the number from the first array in the first position.

Note that the absolute difference of two integers is the distance between them on the real number line.

## Examples

**Example 1:**
```
Input: arrayOne = [-1, 5, 10, 20, 28, 3], arrayTwo = [26, 134, 135, 15, 17]
Output: [28, 26]
Explanation: |28 - 26| = 2, which is the smallest difference
```

**Example 2:**
```
Input: arrayOne = [10, 1000], arrayTwo = [1001, 11]
Output: [1000, 1001]
Explanation: |1000 - 1001| = 1
```

## Constraints

- Both arrays are non-empty
- Arrays can have different lengths
- Each array can have positive and negative integers

---

## 🧠 Thought Process & Pattern Recognition

### Naive Approach Analysis

**Brute Force Thinking:**
- Check every pair (one from each array)
- Track minimum difference
- Time: O(n × m) where n, m are array lengths

Can we do better? **Yes!** With sorting and two pointers.

### The "Aha!" Moment

**Key Insight:** If arrays are sorted, we can intelligently skip pairs.

When comparing two numbers:
- If `arr1[i] < arr2[j]`: Increasing j makes difference larger, so move i
- If `arr1[i] > arr2[j]`: Increasing i makes difference larger, so move j
- If equal: Perfect match! Difference = 0

```
arr1 (sorted): [3, 5, 10, 20, 28]
arr2 (sorted): [15, 17, 26, 134]
                ↑              ↑
               i=0            j=0

3 < 15 → move i (making arr1 value larger gets closer to 15)
```

### Pattern Recognition

This is a classic **"Two Sorted Arrays + Two Pointers"** pattern:
- Sort both arrays O(n log n + m log m)
- Two pointers converge toward optimal O(n + m)
- Same pattern as "Merge Two Sorted Arrays"

---

## 📊 Visual Diagram: How Two-Pointer Works

```
arrayOne = [-1, 5, 10, 20, 28, 3]  →  sorted: [-1, 3, 5, 10, 20, 28]
arrayTwo = [26, 134, 135, 15, 17] →  sorted: [15, 17, 26, 134, 135]

Step-by-step execution:

arr1: [-1,  3,  5, 10, 20, 28]
arr2: [15, 17, 26, 134, 135]
       i                        j

Step 1: arr1[i]=-1, arr2[j]=15
        diff = |−1 − 15| = 16    best = 16, pair = [-1, 15]
        -1 < 15 → move i

Step 2: arr1[i]=3, arr2[j]=15
        diff = |3 − 15| = 12     best = 12, pair = [3, 15]
        3 < 15 → move i

Step 3: arr1[i]=5, arr2[j]=15
        diff = |5 − 15| = 10     best = 10, pair = [5, 15]
        5 < 15 → move i

Step 4: arr1[i]=10, arr2[j]=15
        diff = |10 − 15| = 5     best = 5, pair = [10, 15]
        10 < 15 → move i

Step 5: arr1[i]=20, arr2[j]=15
        diff = |20 − 15| = 5     best = 5 (no update)
        20 > 15 → move j

Step 6: arr1[i]=20, arr2[j]=17
        diff = |20 − 17| = 3     best = 3, pair = [20, 17]
        20 > 17 → move j

Step 7: arr1[i]=20, arr2[j]=26
        diff = |20 − 26| = 6     best = 3 (no update)
        20 < 26 → move i

Step 8: arr1[i]=28, arr2[j]=26
        diff = |28 − 26| = 2     best = 2, pair = [28, 26] ← NEW BEST!
        28 > 26 → move j

Step 9: arr1[i]=28, arr2[j]=134
        diff = |28 − 134| = 106  best = 2 (no update)
        28 < 134 → move i

i reaches end. Return [28, 26] ✓
```

---

## 🔄 Solution Approaches

### Approach 1: Sort + Two Pointers ⭐ RECOMMENDED

**Time Complexity:** O(n log n + m log m) - sorting dominates
**Space Complexity:** O(1) - excluding sort space

**Why This is Best:**
- Optimal time complexity for this problem
- Simple logic: move pointer of smaller value
- Early exit if exact match found

```
Algorithm:
1. Sort both arrays
2. Initialize i=0, j=0, smallestDiff=∞
3. While both pointers valid:
   a. Calculate |arr1[i] - arr2[j]|
   b. Update best if smaller
   c. If equal, return (perfect match!)
   d. Move pointer of smaller element
4. Return best pair
```

### Approach 2: Brute Force

**Time Complexity:** O(n × m) - check all pairs
**Space Complexity:** O(1)

**When to Use:**
- Arrays are very small
- Need to verify two-pointer solution
- No sorting allowed

```
For each num1 in arr1:
    For each num2 in arr2:
        If |num1 - num2| < best:
            Update best pair
```

### Approach 3: Binary Search

**Time Complexity:** O(n log m) or O(m log n)
**Space Complexity:** O(1)

**When to Use:**
- When one array is much larger than the other
- When one array is already sorted

```
Sort the larger array (or both)
For each element in smaller array:
    Binary search for closest element in larger array
    Update best pair if closer
```

---

## 📊 Approach Comparison Summary

```
┌─────────────────────────┬──────────────────┬──────────┬──────────────────┐
│       Approach          │       Time       │  Space   │  Recommendation  │
├─────────────────────────┼──────────────────┼──────────┼──────────────────┤
│ 1. Sort + Two Pointers  │ O(n log n+m log m)│   O(1)  │  ⭐ BEST CHOICE  │
│ 2. Brute Force          │     O(n × m)     │   O(1)   │  ⚠️ Slow         │
│ 3. Binary Search        │ O(n log m)       │   O(1)   │  ✓ When n << m   │
└─────────────────────────┴──────────────────┴──────────┴──────────────────┘

Where: n = len(arrayOne), m = len(arrayTwo)
```

---

## Why Move the Smaller Pointer?

```
arr1: [..., 10, ...]
arr2: [..., 15, ...]
           ↑      ↑
           i      j

Current diff: |10 - 15| = 5

Options:
  - Move i right (larger arr1 value): gets closer to 15 → diff decreases!
  - Move j right (larger arr2 value): gets farther from 10 → diff increases

So: Always move the pointer pointing to smaller value.
```

---

## Edge Cases to Consider

1. **Exact match exists:** Return immediately (diff = 0)
2. **All elements in arr1 < all in arr2:** Answer at ends
3. **Single element arrays:** Only one possible pair
4. **Negative numbers:** Algorithm works the same
5. **Duplicates:** Handled naturally

---

## Hints

<details>
<summary>Hint 1</summary>
Sort both arrays first. This allows you to efficiently compare elements.
</details>

<details>
<summary>Hint 2</summary>
Use two pointers, one for each array. Compare the elements and move the pointer pointing to the smaller element.
</details>

<details>
<summary>Hint 3</summary>
If the elements are equal, you've found a difference of 0, which is optimal. Otherwise, track the smallest difference found.
</details>

---

## Similar Problems (Harder)

### 1. K Smallest Differences
**Difficulty:** Medium

Find the K pairs with smallest absolute differences between two arrays.

```
Input: arr1 = [1, 3, 5], arr2 = [2, 4], k = 3
Output: [[1,2], [3,2], [3,4]] (differences: 1, 1, 1)
```

### 2. Smallest Difference Triplet
**Difficulty:** Hard

Given three arrays, find one element from each such that max - min is minimized.

```
Input: arr1 = [1, 4, 5], arr2 = [10, 20], arr3 = [14, 19]
Output: [5, 10, 14] (max-min = 14-5 = 9)
```

### 3. Closest Sum to Target
**Difficulty:** Hard

Find one number from each of two arrays such that their sum is closest to a target.

```
Input: arr1 = [1, 3, 5], arr2 = [2, 4, 6], target = 8
Output: [3, 4] or [5, 2] (sum = 7, closest to 8)
```
