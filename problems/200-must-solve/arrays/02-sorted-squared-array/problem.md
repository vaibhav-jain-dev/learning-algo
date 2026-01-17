# Sorted Squared Array

**Difficulty:** Easy (Green)

## Problem Statement

Write a function that takes in a non-empty array of integers that are sorted in ascending order and returns a new array of the same length with the squares of the original integers also sorted in ascending order.

## Examples

**Example 1:**
```
Input: array = [1, 2, 3, 5, 6, 8, 9]
Output: [1, 4, 9, 25, 36, 64, 81]
```

**Example 2:**
```
Input: array = [-5, -4, -3, -2, -1]
Output: [1, 4, 9, 16, 25]
```

**Example 3:**
```
Input: array = [-7, -3, 1, 9, 22, 30]
Output: [1, 9, 49, 81, 484, 900]
```

## Constraints

- The input array is non-empty
- The input array is sorted in ascending order
- The array can contain negative integers

---

## 🧠 Thought Process & Pattern Recognition

### Why This Problem is Tricky

At first glance, you might think: "Just square each element and sort!" But that's O(n log n).
The key insight is that the input is **already sorted**, so we can do better.

### The "Aha!" Moment

**Observation:** When you square numbers:
- Positive numbers: Squaring preserves relative order (2² < 3² < 4²)
- Negative numbers: Squaring **reverses** relative order ((-4)² > (-3)² > (-2)²)

**Key Insight:** The largest squared value is ALWAYS at one of the **ends** of the array!
- Either the leftmost (most negative) number has the largest absolute value
- Or the rightmost (most positive) number has the largest absolute value

### Pattern Recognition: Two Pointers Converging

When you need to process a sorted array from both ends, think **Two Pointers**!

```
Array:  [-7, -3, 1, 9, 22, 30]
         ↑                  ↑
        left              right

|-7| = 7                 |30| = 30
7 < 30, so 30² goes at the END of result
```

---

## 📊 Visual Diagram: How Two-Pointer Works

```
Input: [-7, -3, 1, 9, 22, 30]

Step-by-step visualization:

Array:    [-7] [-3] [1] [9] [22] [30]
           L                      R      Result: [_, _, _, _, _, _]

Compare: |-7|=7  vs  |30|=30
30 > 7, so 30² = 900 → Result: [_, _, _, _, _, 900]
Move R left

Array:    [-7] [-3] [1] [9] [22] [30]
           L                [R]

Compare: |-7|=7  vs  |22|=22
22 > 7, so 22² = 484 → Result: [_, _, _, _, 484, 900]
Move R left

Array:    [-7] [-3] [1] [9] [22] [30]
           L            [R]

Compare: |-7|=7  vs  |9|=9
9 > 7, so 9² = 81 → Result: [_, _, _, 81, 484, 900]
Move R left

Array:    [-7] [-3] [1] [9] [22] [30]
           L        [R]

Compare: |-7|=7  vs  |1|=1
7 > 1, so 7² = 49 → Result: [_, _, 49, 81, 484, 900]
Move L right

Array:    [-7] [-3] [1] [9] [22] [30]
               [L]  [R]

Compare: |-3|=3  vs  |1|=1
3 > 1, so 3² = 9 → Result: [_, 9, 49, 81, 484, 900]
Move L right

Array:    [-7] [-3] [1] [9] [22] [30]
                   [LR]

Last element: 1² = 1 → Result: [1, 9, 49, 81, 484, 900]

Final: [1, 9, 49, 81, 484, 900] ✓
```

---

## 🔄 Solution Approaches

### Approach 1: Two-Pointer (Fill from End) ⭐ RECOMMENDED

**Time Complexity:** O(n) - single pass through array
**Space Complexity:** O(n) - for result array

**Why This is Best:**
- Leverages the sorted property optimally
- Single pass, no re-sorting needed
- Most efficient time complexity possible
- Works beautifully with negative numbers

```
Strategy: Compare absolute values at both ends,
         place larger squared value at end of result,
         move pointer inward, repeat.

         [-7, -3, 1, 9]  →  [1, 9, 9, 49]
          L        R
```

### Approach 2: Square and Sort (Brute Force)

**Time Complexity:** O(n log n) - due to sorting
**Space Complexity:** O(n) - for result array

**When to Use:**
- When simplicity matters more than optimal performance
- Quick implementation in interviews if time is short
- Good starting point before optimizing

```
Simply: [x*x for x in array], then sort

        [-7, -3, 1, 9]
        → [49, 9, 1, 81]  (squared)
        → [1, 9, 49, 81]  (sorted)
```

### Approach 3: Find Split Point + Merge

**Time Complexity:** O(n)
**Space Complexity:** O(n)

**Educational Value:**
- Demonstrates merge-sort thinking
- Useful when input is naturally partitioned

```
Split at zero-crossing:
[-7, -3] | [1, 9]  (negatives | positives)
    ↓         ↓
[49, 9]   [1, 81]  (squared, but reversed for negatives)
    ↓         ↓
 [9, 49]  [1, 81]  (negatives reversed)
    ↓
Merge: [1, 9, 49, 81]
```

---

## 📊 Approach Comparison Summary

```
┌───────────────────────────┬───────────┬──────────┬──────────────────┐
│         Approach          │   Time    │  Space   │  Recommendation  │
├───────────────────────────┼───────────┼──────────┼──────────────────┤
│ 1. Two-Pointer (Fill End) │   O(n)    │   O(n)   │  ⭐ BEST CHOICE  │
│ 2. Square and Sort        │ O(n log n)│   O(n)   │  ✓ Simple but    │
│                           │           │          │    slower        │
│ 3. Split + Merge          │   O(n)    │   O(n)   │  ⚠️ More complex │
└───────────────────────────┴───────────┴──────────┴──────────────────┘
```

---

## Hints

<details>
<summary>Hint 1</summary>
The tricky part is that negative numbers become positive when squared, which can change the sorting order.
</details>

<details>
<summary>Hint 2</summary>
Consider using two pointers: one at the beginning and one at the end of the array.
</details>

<details>
<summary>Hint 3</summary>
The largest squared value will always be either at the start (if negative) or at the end of the original array. Build the result array from the end.
</details>

---

## Similar Problems (Harder)

### 1. Merge Sorted Arrays with Squares
**Difficulty:** Medium

Given two sorted arrays, square all elements and merge them into a single sorted array.

```
Input: arr1 = [-3, -1, 2], arr2 = [-2, 4]
Output: [1, 4, 4, 9, 16]
```

### 2. Sorted Cubed Array with Duplicates Removed
**Difficulty:** Medium

Square the array, sort it, and remove duplicates while maintaining sorted order.

```
Input: array = [-3, -2, -1, 1, 2, 3]
Output: [1, 4, 9] (1 and -1 both give 1, etc.)
```

### 3. K-th Smallest Squared Element
**Difficulty:** Hard

Given a sorted array, find the k-th smallest element after squaring all elements, without sorting the entire squared array.

```
Input: array = [-4, -2, 0, 1, 3], k = 3
Output: 1 (squared array sorted: [0, 1, 4, 9, 16], 3rd element is 1)
```
