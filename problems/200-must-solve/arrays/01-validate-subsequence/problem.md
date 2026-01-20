<script type="application/json" id="viz-config">
{
  "name": "Validate Subsequence",
  "algorithm": "two-pointer-subsequence",
  "complexity": { "time": "O(n)", "space": "O(1)" },
  "examples": [
    {
      "input": { "array": [5, 1, 22, 25, 6, -1, 8, 10], "sequence": [1, 6, -1, 10] },
      "output": true,
      "inputRaw": "array = [5, 1, 22, 25, 6, -1, 8, 10], sequence = [1, 6, -1, 10]",
      "outputRaw": "true"
    },
    {
      "input": { "array": [5, 1, 22, 25, 6, -1, 8, 10], "sequence": [5, 1, 22, 25, 6, -1, 8, 10] },
      "output": true,
      "inputRaw": "array = [5, 1, 22, 25, 6, -1, 8, 10], sequence = [5, 1, 22, 25, 6, -1, 8, 10]",
      "outputRaw": "true"
    },
    {
      "input": { "array": [5, 1, 22, 25, 6, -1, 8, 10], "sequence": [1, 6, 10, -1] },
      "output": false,
      "inputRaw": "array = [5, 1, 22, 25, 6, -1, 8, 10], sequence = [1, 6, 10, -1]",
      "outputRaw": "false (order matters!)"
    }
  ]
}
</script>

# Validate Subsequence

**Difficulty:** Easy (Green)

## Problem Statement

Given two non-empty arrays of integers, write a function that determines whether the second array is a subsequence of the first one.

A subsequence of an array is a set of numbers that aren't necessarily adjacent in the array but that are in the same order as they appear in the array. For instance, the numbers `[1, 3, 4]` form a subsequence of the array `[1, 2, 3, 4]`, and so do the numbers `[2, 4]`. Note that a single number in an array and the array itself are both valid subsequences of the array.

## Examples

**Example 1:**
```
Input: array = [5, 1, 22, 25, 6, -1, 8, 10], sequence = [1, 6, -1, 10]
Output: true
```

**Example 2:**
```
Input: array = [5, 1, 22, 25, 6, -1, 8, 10], sequence = [5, 1, 22, 25, 6, -1, 8, 10]
Output: true
```

**Example 3:**
```
Input: array = [5, 1, 22, 25, 6, -1, 8, 10], sequence = [1, 6, 10, -1]
Output: false (order matters!)
```

## Constraints

- Both arrays are non-empty
- The arrays can contain positive and negative integers
- Array length >= 1

---

## 🧠 Thought Process & Pattern Recognition

<details>
<summary><strong>Click to reveal thinking pattern</strong></summary>

### Step 1: Understand the Core Problem
**Question to ask yourself:** "What makes a subsequence different from a subarray?"
- Subsequence: Elements in same relative order, but NOT necessarily contiguous
- Subarray: Elements must be contiguous

### Step 2: Identify the Pattern
**Key insight:** We need to find ALL elements of sequence in the SAME ORDER within array.

```
Array:    [5, 1, 22, 25, 6, -1, 8, 10]
Sequence: [1, 6, -1, 10]

We're essentially "matching" elements one by one:
- Find 1  ✓ (at index 1)
- Find 6  ✓ (at index 4, AFTER where we found 1)
- Find -1 ✓ (at index 5, AFTER where we found 6)
- Find 10 ✓ (at index 7, AFTER where we found -1)
```

### Step 3: Recognize the Algorithm Pattern
This is a **Two-Pointer / Iterator** pattern because:
- We traverse both arrays in one direction
- We never need to go backwards
- We're looking for matches in order

### Step 4: Consider Alternative Approaches
1. **Brute Force with nested loops** - Check every possible combination
2. **Two Pointers** - Single pass through main array
3. **Recursion** - Break down into subproblems

### Step 5: Choose Optimal Solution
Two-pointer wins because it's O(n) time and O(1) space - we can't do better since we must check each element at least once.

</details>

---

## 📊 Visual Diagram: How It Works

<details>
<summary><strong>Click to see step-by-step visualization</strong></summary>

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     VALIDATE SUBSEQUENCE VISUALIZATION                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Array:    [ 5 ][ 1 ][ 22 ][ 25 ][ 6 ][ -1 ][ 8 ][ 10 ]                    │
│  Index:      0    1     2     3    4     5    6     7                       │
│                                                                             │
│  Sequence: [ 1 ][ 6 ][ -1 ][ 10 ]                                          │
│  Index:      0    1     2     3                                             │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                           STEP-BY-STEP EXECUTION                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  STEP 1: arrIdx=0, seqIdx=0                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Array:    [►5 ][ 1 ][ 22 ][ 25 ][ 6 ][ -1 ][ 8 ][ 10 ]            │   │
│  │  Sequence: [►1 ][ 6 ][ -1 ][ 10 ]                                   │   │
│  │  Compare: 5 ≠ 1  →  Move array pointer only                         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  STEP 2: arrIdx=1, seqIdx=0                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Array:    [ 5 ][►1 ][ 22 ][ 25 ][ 6 ][ -1 ][ 8 ][ 10 ]            │   │
│  │  Sequence: [►1 ][ 6 ][ -1 ][ 10 ]                                   │   │
│  │  Compare: 1 = 1  ✓  →  MATCH! Move BOTH pointers                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  STEP 3-4: arrIdx=2,3, seqIdx=1  (22≠6, 25≠6)                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Array:    [ 5 ][ 1 ][►22][►25][ 6 ][ -1 ][ 8 ][ 10 ]              │   │
│  │  Sequence: [ 1 ][►6 ][ -1 ][ 10 ]                                   │   │
│  │  No match → Keep moving array pointer                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  STEP 5: arrIdx=4, seqIdx=1                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Array:    [ 5 ][ 1 ][ 22 ][ 25 ][►6 ][ -1 ][ 8 ][ 10 ]            │   │
│  │  Sequence: [ 1 ][►6 ][ -1 ][ 10 ]                                   │   │
│  │  Compare: 6 = 6  ✓  →  MATCH! Move BOTH pointers                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  STEP 6: arrIdx=5, seqIdx=2                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Array:    [ 5 ][ 1 ][ 22 ][ 25 ][ 6 ][►-1][ 8 ][ 10 ]             │   │
│  │  Sequence: [ 1 ][ 6 ][►-1][ 10 ]                                    │   │
│  │  Compare: -1 = -1  ✓  →  MATCH! Move BOTH pointers                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  STEP 7: arrIdx=6, seqIdx=3  (8≠10)                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Array:    [ 5 ][ 1 ][ 22 ][ 25 ][ 6 ][ -1 ][►8 ][ 10 ]            │   │
│  │  Sequence: [ 1 ][ 6 ][ -1 ][►10]                                    │   │
│  │  No match → Keep moving array pointer                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  STEP 8: arrIdx=7, seqIdx=3                                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Array:    [ 5 ][ 1 ][ 22 ][ 25 ][ 6 ][ -1 ][ 8 ][►10]             │   │
│  │  Sequence: [ 1 ][ 6 ][ -1 ][►10]                                    │   │
│  │  Compare: 10 = 10  ✓  →  MATCH! seqIdx becomes 4                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  RESULT: seqIdx (4) == sequence.length (4)  →  Return TRUE ✓              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Flow Diagram

```
                    ┌──────────────┐
                    │    START     │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  seqIdx = 0  │
                    │  arrIdx = 0  │
                    └──────┬───────┘
                           │
           ┌───────────────┼───────────────┐
           │               ▼               │
           │    ┌──────────────────┐       │
           │    │ arrIdx < arr.len │       │
           │    │       AND        │───No──┼──────────┐
           │    │ seqIdx < seq.len │       │          │
           │    └────────┬─────────┘       │          │
           │             │ Yes             │          │
           │             ▼                 │          │
           │    ┌──────────────────┐       │          │
           │    │ arr[arrIdx] ==   │       │          │
           │    │ seq[seqIdx] ?    │       │          │
           │    └────────┬─────────┘       │          │
           │        ┌────┴────┐            │          │
           │       Yes       No            │          │
           │        │         │            │          │
           │        ▼         │            │          │
           │  ┌──────────┐    │            │          │
           │  │ seqIdx++ │    │            │          │
           │  └────┬─────┘    │            │          │
           │       │          │            │          │
           │       └────┬─────┘            │          │
           │            ▼                  │          │
           │     ┌──────────┐              │          │
           │     │ arrIdx++ │              │          │
           │     └────┬─────┘              │          │
           │          │                    │          │
           └──────────┘                    │          │
                                           │          │
                           ┌───────────────┘          │
                           │                          │
                           ▼                          ▼
                    ┌─────────────────────────────────────┐
                    │    Return: seqIdx == seq.length     │
                    └─────────────────────────────────────┘
```

</details>

---

## 🔄 Solution Approaches

### Approach 1: Two-Pointer (For-Each Loop) ⭐ RECOMMENDED

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why This Approach?
- **Simplest to implement** - Just one pointer to track
- **Most readable** - Clear intention
- **Optimal efficiency** - O(n) time, O(1) space

#### How It Works
1. Use a single pointer `seqIdx` for sequence array
2. Iterate through main array using for-each
3. When match found, advance sequence pointer
4. If sequence pointer reaches end, we found all elements

#### Code Logic Diagram
```
┌─────────────────────────────────────────────────┐
│  for each num in array:                         │
│      ┌─────────────────────────────────────┐    │
│      │  if seqIdx == seq.length:           │    │
│      │      break (found all!)             │    │
│      └─────────────────────────────────────┘    │
│      ┌─────────────────────────────────────┐    │
│      │  if num == sequence[seqIdx]:        │    │
│      │      seqIdx++  (found next one!)    │    │
│      └─────────────────────────────────────┘    │
│  return seqIdx == sequence.length               │
└─────────────────────────────────────────────────┘
```

#### Complexity Analysis
```
┌────────────────────────────────────────────────────────────────┐
│  TIME COMPLEXITY: O(n)                                         │
├────────────────────────────────────────────────────────────────┤
│  • We traverse the main array exactly ONCE                     │
│  • Each element is visited at most once                        │
│  • n = length of main array                                    │
│  • Best case: O(m) if sequence found early (m = sequence len)  │
│  • Worst case: O(n) always traverse full array                 │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│  SPACE COMPLEXITY: O(1)                                        │
├────────────────────────────────────────────────────────────────┤
│  • Only using one integer variable (seqIdx)                    │
│  • No additional data structures                               │
│  • Space doesn't grow with input size                          │
└────────────────────────────────────────────────────────────────┘
```

</details>

---

### Approach 2: Two-Pointer (While Loop)

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why Consider This Approach?
- **More explicit control** - Both pointers visible
- **Easier to modify** - Can add more conditions
- **Interview preference** - Some interviewers prefer explicit pointers

#### How It Works
1. Use TWO explicit pointers: `arrIdx` and `seqIdx`
2. Continue while both pointers are within bounds
3. Always increment `arrIdx`
4. Only increment `seqIdx` on match

#### Visual Comparison with Approach 1
```
┌─────────────────────────────────────────────────────────────────┐
│  APPROACH 1 (For-Each)          │  APPROACH 2 (While Loop)      │
├─────────────────────────────────┼───────────────────────────────┤
│  seqIdx = 0                     │  arrIdx = 0, seqIdx = 0       │
│  for num in array:              │  while arrIdx < n && seqIdx < m│
│      if num == seq[seqIdx]:     │      if arr[arrIdx] == seq[seqIdx]│
│          seqIdx++               │          seqIdx++              │
│                                 │      arrIdx++                  │
│  return seqIdx == m             │  return seqIdx == m            │
├─────────────────────────────────┴───────────────────────────────┤
│  Both are O(n) time, O(1) space - Choose based on preference!   │
└─────────────────────────────────────────────────────────────────┘
```

#### Complexity Analysis
```
TIME:  O(n) - Same as Approach 1
SPACE: O(1) - Same as Approach 1

When to prefer this?
• When you need to access array indices
• When modifying the problem (e.g., finding positions of matches)
• When interviewer explicitly asks for two-pointer solution
```

</details>

---

### Approach 3: Recursive Solution

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why Consider This Approach?
- **Demonstrates recursion skills** - Good for learning
- **Elegant for some** - Functional programming style
- **Foundation for harder problems** - LCS, Edit Distance use similar recursion

#### How It Works
```
Base Cases:
  • If sequence is empty → TRUE (found all elements)
  • If array is empty but sequence isn't → FALSE (can't find remaining)

Recursive Case:
  • If first elements match → Check rest of both arrays
  • If no match → Check rest of array with same sequence
```

#### Recursion Tree Visualization
```
isSubsequence([5,1,22,6], [1,6])
│
├── 5 ≠ 1, so check: isSubsequence([1,22,6], [1,6])
│   │
│   ├── 1 = 1 ✓, so check: isSubsequence([22,6], [6])
│   │   │
│   │   ├── 22 ≠ 6, so check: isSubsequence([6], [6])
│   │   │   │
│   │   │   └── 6 = 6 ✓, so check: isSubsequence([], [])
│   │   │       │
│   │   │       └── sequence empty → Return TRUE ✓
```

#### Complexity Analysis
```
┌────────────────────────────────────────────────────────────────┐
│  TIME COMPLEXITY: O(n)                                         │
├────────────────────────────────────────────────────────────────┤
│  • Each recursive call processes one element from array        │
│  • Maximum n calls (length of main array)                      │
│  • No repeated subproblems (unlike Fibonacci)                  │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│  SPACE COMPLEXITY: O(n) ⚠️ WORSE THAN ITERATIVE!              │
├────────────────────────────────────────────────────────────────┤
│  • Call stack grows with each recursive call                   │
│  • Maximum depth = n (length of main array)                    │
│  • This is why iterative is preferred for this problem         │
└────────────────────────────────────────────────────────────────┘
```

#### When NOT to Use Recursion Here
```
❌ Large arrays - Risk of stack overflow
❌ Performance critical - Function call overhead
❌ Memory constrained - O(n) space vs O(1)

✅ Use when: Learning, demonstrating recursion knowledge,
   or as building block for DP problems
```

</details>

---

### Approach 4: Index Finding (Less Optimal)

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why Show This Approach?
- **Common first intuition** - What many beginners try
- **Works but suboptimal** - Good to understand why
- **Teaches index manipulation** - Useful concept

#### How It Works
```
For each element in sequence:
    Find its index in array (starting after previous found index)
    If not found → return FALSE
    Update search start position
```

#### Visual Example
```
Array:    [5, 1, 22, 25, 6, -1, 8, 10]
Sequence: [1, 6, -1, 10]

Step 1: Find 1 in array starting from index 0
        Found at index 1 ✓
        Next search starts at index 2

Step 2: Find 6 in array[2:] = [22, 25, 6, -1, 8, 10]
        Found at index 4 ✓
        Next search starts at index 5

Step 3: Find -1 in array[5:] = [-1, 8, 10]
        Found at index 5 ✓
        Next search starts at index 6

Step 4: Find 10 in array[6:] = [8, 10]
        Found at index 7 ✓
        All found → Return TRUE
```

#### Complexity Analysis
```
┌────────────────────────────────────────────────────────────────┐
│  TIME COMPLEXITY: O(n * m) in worst case ⚠️                   │
├────────────────────────────────────────────────────────────────┤
│  • For each of m sequence elements                             │
│  • We might search through remaining n elements                │
│  • Though average case often better due to early termination   │
│                                                                │
│  Example worst case:                                           │
│  array = [1,1,1,1,1,2], sequence = [1,1,1,1,2]                │
│  Each search scans many elements                               │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│  SPACE COMPLEXITY: O(1)                                        │
├────────────────────────────────────────────────────────────────┤
│  • Only storing index variables                                │
│  • Same as optimal approaches                                  │
└────────────────────────────────────────────────────────────────┘
```

#### Why Not Recommended?
```
Approach 1 (Two-Pointer): O(n) time  ✓ Optimal
Approach 4 (Index Find):  O(n*m) time  ✗ Suboptimal

The two-pointer approach processes each element EXACTLY ONCE,
while this approach might re-scan portions of the array.
```

</details>

---

## 📊 Approach Comparison Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SOLUTION COMPARISON TABLE                            │
├───────────────────┬──────────┬──────────┬──────────────┬───────────────────┤
│     Approach      │   Time   │  Space   │  Difficulty  │   Recommendation  │
├───────────────────┼──────────┼──────────┼──────────────┼───────────────────┤
│ 1. For-Each Loop  │   O(n)   │   O(1)   │    Easy      │  ⭐ BEST CHOICE   │
├───────────────────┼──────────┼──────────┼──────────────┼───────────────────┤
│ 2. While Loop     │   O(n)   │   O(1)   │    Easy      │  ✓ Also great    │
├───────────────────┼──────────┼──────────┼──────────────┼───────────────────┤
│ 3. Recursive      │   O(n)   │   O(n)   │   Medium     │  ⚠️ Learning only │
├───────────────────┼──────────┼──────────┼──────────────┼───────────────────┤
│ 4. Index Finding  │  O(n*m)  │   O(1)   │    Easy      │  ✗ Not optimal   │
└───────────────────┴──────────┴──────────┴──────────────┴───────────────────┘

WHY APPROACH 1 IS RECOMMENDED:
┌─────────────────────────────────────────────────────────────────────────────┐
│ ✓ Optimal time complexity - O(n), can't do better                          │
│ ✓ Optimal space complexity - O(1), no extra memory                         │
│ ✓ Clean, readable code - Easy to understand and maintain                   │
│ ✓ Less error-prone - Single pointer reduces bugs                           │
│ ✓ Idiomatic - Uses language features naturally                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Hints

<details>
<summary>Hint 1</summary>
You can solve this problem by iterating through the main array once.
</details>

<details>
<summary>Hint 2</summary>
Use a pointer to track your position in the sequence array. Whenever you find a number in the main array that matches the number at the pointer position, move the pointer forward.
</details>

<details>
<summary>Hint 3</summary>
The sequence is valid if you reach the end of the sequence array (pointer equals sequence length).
</details>

---

## Similar Problems (Harder)

### 1. Longest Common Subsequence Length
**Difficulty:** Medium

Find the length of the longest common subsequence between two arrays.

```
Input: arr1 = [1, 4, 2, 5, 3], arr2 = [2, 4, 1, 3]
Output: 2 (subsequence [4, 3] or [1, 3])
```

**Thinking Pattern:** This extends our problem - instead of checking if one is subsequence of another, we find the longest sequence that's subsequence of BOTH. Requires 2D DP.

---

### 2. Count Distinct Subsequences
**Difficulty:** Hard

Given an array and a sequence, count how many distinct ways the sequence appears as a subsequence in the array.

```
Input: array = [1, 1, 2, 1], sequence = [1, 1]
Output: 3 (positions (0,1), (0,3), (1,3))
```

**Thinking Pattern:** Our problem returns true/false, this counts ALL valid matchings. Requires DP to avoid recounting.

---

### 3. Minimum Window Subsequence
**Difficulty:** Hard

Given arrays S and T, find the minimum contiguous substring of S that contains T as a subsequence.

```
Input: S = [1, 2, 3, 4, 2, 5], T = [2, 5]
Output: [2, 5] (length 2, starting at index 4)
```

**Thinking Pattern:** Our problem just validates, this finds the SHORTEST window. Requires sliding window + subsequence checking.
