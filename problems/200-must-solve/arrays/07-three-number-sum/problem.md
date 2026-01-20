# Three Number Sum

**Difficulty:** Medium (Blue)

## Problem Statement

Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. The function should find all triplets in the array that sum up to the target sum and return a two-dimensional array of all these triplets.

The numbers in each triplet should be ordered in ascending order, and the triplets themselves should be ordered in ascending order with respect to the numbers they hold.

If no three numbers sum up to the target sum, the function should return an empty array.

## Examples

**Example 1:**
```
Input: array = [12, 3, 1, 2, -6, 5, -8, 6], targetSum = 0
Output: [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]
```

**Example 2:**
```
Input: array = [1, 2, 3], targetSum = 6
Output: [[1, 2, 3]]
```

**Example 3:**
```
Input: array = [1, 2, 3, 4, 5], targetSum = 100
Output: []
```

## Constraints

- Array contains distinct integers
- Array is non-empty
- Triplets must be unique

---

## 🧠 Thought Process & Pattern Recognition

<details>
<summary><strong>Click to reveal thinking pattern</strong></summary>

### Step 1: Understand the Core Problem
**Question:** "How is this different from Two Sum?"
- Two Sum: Find ONE pair that sums to target
- Three Sum: Find ALL triplets that sum to target
- We can reduce Three Sum to Two Sum by fixing one element!

### Step 2: Identify Initial Approaches
```
Approach 1: Brute Force
- Check every possible triplet
- Three nested loops: O(n³)
- Simple but slow

Approach 2: Sort + Two Pointers
- Sort array first
- Fix first element, use two-pointer for remaining
- O(n²) time

Approach 3: Hash Set
- For each pair, check if complement exists
- O(n²) time, O(n) space
```

### Step 3: Recognize the Pattern
**Key insight:** Sorting enables the Two-Pointer technique!

```
After sorting: [-8, -6, 1, 2, 3, 5, 6, 12]
Target: 0

Fix first element (-8), find two numbers that sum to 8:
Use two pointers on remaining array [−6, 1, 2, 3, 5, 6, 12]

left = -6, right = 12  →  -6 + 12 = 6 < 8  →  move left
left = 1,  right = 12  →  1 + 12 = 13 > 8  →  move right
left = 1,  right = 6   →  1 + 6 = 7 < 8    →  move left
left = 2,  right = 6   →  2 + 6 = 8 = 8    →  FOUND! [-8, 2, 6]
```

### Step 4: Why Sorting Helps
```
Without sorting:
- Can't use two-pointer technique
- Have to check all combinations

With sorting:
- If sum too small → need larger number → move left pointer right
- If sum too large → need smaller number → move right pointer left
- Systematic search, no repeated work
```

### Step 5: Choose Optimal Solution
**Sort + Two Pointers** is optimal because:
- O(n²) time - we need to check all pairs minimum
- O(1) extra space (excluding output)
- Naturally produces sorted triplets
- Easy to extend to K-Sum problems

</details>

---

## 📊 Visual Diagram: How It Works

<details>
<summary><strong>Click to see step-by-step visualization</strong></summary>

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      THREE NUMBER SUM VISUALIZATION                         │
├─────────────────────────────────────────────────────────────────────────────┤
│  Input: array = [12, 3, 1, 2, -6, 5, -8, 6], targetSum = 0                 │
│                                                                             │
│  STEP 0: Sort the array                                                     │
│  [-8, -6, 1, 2, 3, 5, 6, 12]                                               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                         ITERATION 1: Fix -8                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Array:  [-8] [-6] [ 1] [ 2] [ 3] [ 5] [ 6] [12]                          │
│           ▲    ▲                              ▲                            │
│          FIX  LEFT                          RIGHT                          │
│                                                                             │
│  Target for pair: 0 - (-8) = 8                                             │
│                                                                             │
│  Round 1: -6 + 12 = 6 < 8  →  Move LEFT right                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  [-8] [-6] [ 1] [ 2] [ 3] [ 5] [ 6] [12]                            │   │
│  │        L→                              R                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Round 2: 1 + 12 = 13 > 8  →  Move RIGHT left                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  [-8] [-6] [ 1] [ 2] [ 3] [ 5] [ 6] [12]                            │   │
│  │             L                     ←R                                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Round 3: 1 + 6 = 7 < 8  →  Move LEFT right                               │
│  Round 4: 2 + 6 = 8 = 8  →  ✓ FOUND! Triplet: [-8, 2, 6]                 │
│                              Move BOTH pointers                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  [-8] [-6] [ 1] [ 2] [ 3] [ 5] [ 6] [12]                            │   │
│  │                  L→           ←R                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  Round 5: 3 + 5 = 8 = 8  →  ✓ FOUND! Triplet: [-8, 3, 5]                 │
│  Round 6: L >= R  →  Done with -8                                         │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                         ITERATION 2: Fix -6                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Array:  [-8] [-6] [ 1] [ 2] [ 3] [ 5] [ 6] [12]                          │
│                ▲    ▲                         ▲                            │
│               FIX  LEFT                     RIGHT                          │
│                                                                             │
│  Target for pair: 0 - (-6) = 6                                             │
│                                                                             │
│  Round 1: 1 + 12 = 13 > 6  →  Move RIGHT left                             │
│  Round 2: 1 + 6 = 7 > 6    →  Move RIGHT left                             │
│  Round 3: 1 + 5 = 6 = 6    →  ✓ FOUND! Triplet: [-6, 1, 5]               │
│  Round 4: 2 + 3 = 5 < 6    →  Move LEFT right                             │
│  Round 5: L >= R  →  Done with -6                                         │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                      ITERATIONS 3-6: Continue...                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  Fix 1: Target = -1  →  No triplets found                                  │
│  Fix 2: Target = -2  →  No triplets found                                  │
│  Fix 3: Target = -3  →  No triplets found                                  │
│  (Continue until no room for two more elements)                            │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  FINAL RESULT: [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Algorithm Flow Diagram

```
                    ┌──────────────────┐
                    │   Sort Array     │
                    │   O(n log n)     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  i = 0           │
                    └────────┬─────────┘
                             │
           ┌─────────────────┼─────────────────┐
           │                 ▼                 │
           │    ┌──────────────────────┐       │
           │    │   i < n - 2 ?        │───No──┼───┐
           │    └──────────┬───────────┘       │   │
           │               │ Yes               │   │
           │               ▼                   │   │
           │    ┌──────────────────────┐       │   │
           │    │  left = i + 1        │       │   │
           │    │  right = n - 1       │       │   │
           │    │  target = T - arr[i] │       │   │
           │    └──────────┬───────────┘       │   │
           │               │                   │   │
           │    ┌──────────┼──────────┐        │   │
           │    │          ▼          │        │   │
           │    │  ┌───────────────┐  │        │   │
           │    │  │ left < right? │──┼──No────┤   │
           │    │  └───────┬───────┘  │        │   │
           │    │          │ Yes      │        │   │
           │    │          ▼          │        │   │
           │    │  ┌───────────────┐  │        │   │
           │    │  │ sum = arr[L]  │  │        │   │
           │    │  │     + arr[R]  │  │        │   │
           │    │  └───────┬───────┘  │        │   │
           │    │          │          │        │   │
           │    │     ┌────┴────┐     │        │   │
           │    │     ▼    ▼    ▼     │        │   │
           │    │   <target =target >target   │   │
           │    │     │    │    │     │        │   │
           │    │     ▼    │    ▼     │        │   │
           │    │   L++    │   R--    │        │   │
           │    │          ▼          │        │   │
           │    │    ┌──────────┐     │        │   │
           │    │    │ Add to   │     │        │   │
           │    │    │ results  │     │        │   │
           │    │    │ L++, R-- │     │        │   │
           │    │    └──────────┘     │        │   │
           │    │          │          │        │   │
           │    └──────────┘          │        │   │
           │                          │        │   │
           │    ┌─────────────────────┘        │   │
           │    │                              │   │
           │    ▼                              │   │
           │ ┌─────┐                           │   │
           │ │ i++ │                           │   │
           │ └──┬──┘                           │   │
           │    │                              │   │
           └────┘                              │   │
                                               │   │
                    ┌──────────────────────────┘   │
                    │                              │
                    ▼                              ▼
              ┌─────────────────────────────────────────┐
              │         Return Results Array            │
              └─────────────────────────────────────────┘
```

</details>

---

## 🔄 Solution Approaches

### Approach 1: Brute Force - Three Nested Loops

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why Consider This Approach?
- **Simplest to understand** - Direct translation of problem
- **No preprocessing needed** - Works on unsorted array
- **Good baseline** - Helps understand the problem before optimizing

#### How It Works
```
For each element i from 0 to n-3:
    For each element j from i+1 to n-2:
        For each element k from j+1 to n-1:
            If arr[i] + arr[j] + arr[k] == target:
                Add [arr[i], arr[j], arr[k]] to result
```

#### Visual Example
```
Array: [12, 3, 1, 2], Target: 16

Check ALL combinations:
(12, 3, 1) = 16 ✓
(12, 3, 2) = 17 ✗
(12, 1, 2) = 15 ✗
(3, 1, 2)  = 6  ✗

Result: [[1, 3, 12]] (sorted)
```

#### Complexity Analysis
```
┌────────────────────────────────────────────────────────────────┐
│  TIME COMPLEXITY: O(n³) ⚠️ SLOW                               │
├────────────────────────────────────────────────────────────────┤
│  • Three nested loops                                          │
│  • Each loop iterates up to n times                            │
│  • Total: n × n × n = n³ operations                            │
│                                                                │
│  For n = 1000: 1,000,000,000 operations (very slow!)          │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│  SPACE COMPLEXITY: O(1) excluding output                       │
├────────────────────────────────────────────────────────────────┤
│  • Only loop variables needed                                  │
│  • No additional data structures                               │
└────────────────────────────────────────────────────────────────┘
```

#### When NOT to Use
```
❌ Large arrays (n > 500) - Too slow
❌ Competitive programming - Will time out
❌ Production code - Better solutions exist

✅ Use when: Learning, very small arrays, or as starting point
```

</details>

---

### Approach 2: Sort + Two Pointers ⭐ RECOMMENDED

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why This Approach is Best
- **Optimal time complexity** - O(n²), can't do better
- **Minimal space** - O(1) excluding output
- **Naturally sorted results** - No extra sorting needed
- **Elegant two-pointer technique** - Fundamental pattern to learn

#### How It Works
```
1. SORT the array
2. For each element at index i:
   - left = i + 1
   - right = n - 1
   - target_sum = original_target - arr[i]

3. Two-pointer search:
   - current_sum = arr[left] + arr[right]
   - If current_sum == target_sum: Found! Add triplet, move both
   - If current_sum < target_sum: Need larger, move left right
   - If current_sum > target_sum: Need smaller, move right left
```

#### Why Two Pointers Work on Sorted Array
```
Sorted: [-8, -6, 1, 2, 3, 5, 6, 12]
                 L              R

Sum too SMALL? → Move L right (get larger number)
Sum too LARGE? → Move R left (get smaller number)
Sum EQUAL?     → Found it! Move both to find more

This works because:
• Moving L right ALWAYS increases the sum
• Moving R left ALWAYS decreases the sum
• We never miss any valid pair!
```

#### Complexity Analysis
```
┌────────────────────────────────────────────────────────────────┐
│  TIME COMPLEXITY: O(n²)                                        │
├────────────────────────────────────────────────────────────────┤
│  • Sorting: O(n log n)                                         │
│  • Outer loop: O(n) iterations                                 │
│  • Inner two-pointer: O(n) per outer iteration                 │
│  • Total: O(n log n) + O(n × n) = O(n²)                       │
│                                                                │
│  For n = 1000: ~1,000,000 operations (fast!)                  │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│  SPACE COMPLEXITY: O(1) excluding output                       │
├────────────────────────────────────────────────────────────────┤
│  • Only pointer variables (i, left, right)                     │
│  • Sorting is typically in-place                               │
│  • Output space depends on number of triplets                  │
└────────────────────────────────────────────────────────────────┘
```

#### Why This is Optimal
```
Lower bound proof:
• Must consider all possible pairs → Ω(n²) comparisons minimum
• Two-pointer achieves this bound exactly
• Can't do better than O(n²) in worst case
```

</details>

---

### Approach 3: Hash Set Method

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why Consider This Approach?
- **Alternative technique** - Uses hashing instead of sorting
- **Can handle unsorted output** - If order doesn't matter
- **Educational** - Shows reduction to Two Sum

#### How It Works
```
1. Sort array (for output ordering)
2. For each element at index i:
   - Create empty hash set
   - target_sum = original_target - arr[i]

3. For each element at index j (where j > i):
   - complement = target_sum - arr[j]
   - If complement in hash set:
       Found triplet: [arr[i], complement, arr[j]]
   - Add arr[j] to hash set
```

#### Visual Example
```
Sorted Array: [-8, -6, 1, 2, 3, 5, 6, 12], Target: 0

Fix i = 0 (value = -8), target_sum = 8

j = 1: value = -6, complement = 14, set = {}
       14 not in set, add -6 → set = {-6}

j = 2: value = 1, complement = 7, set = {-6}
       7 not in set, add 1 → set = {-6, 1}

j = 3: value = 2, complement = 6, set = {-6, 1}
       6 not in set, add 2 → set = {-6, 1, 2}

...

j = 6: value = 6, complement = 2, set = {-6, 1, 2, 3, 5}
       2 IS IN SET! → Found triplet: [-8, 2, 6] ✓
```

#### Complexity Analysis
```
┌────────────────────────────────────────────────────────────────┐
│  TIME COMPLEXITY: O(n²)                                        │
├────────────────────────────────────────────────────────────────┤
│  • Same as two-pointer approach                                │
│  • Hash operations are O(1) average                            │
│  • Outer loop × inner loop = O(n²)                            │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│  SPACE COMPLEXITY: O(n) ⚠️ WORSE THAN TWO-POINTER            │
├────────────────────────────────────────────────────────────────┤
│  • Hash set can grow up to O(n)                                │
│  • New set created for each outer iteration                    │
│  • Total space: O(n) for hash set                             │
└────────────────────────────────────────────────────────────────┘
```

#### When to Use Hash Set vs Two-Pointer
```
Two-Pointer (PREFERRED):
✓ O(1) space
✓ Cache-friendly (sequential access)
✓ Simpler implementation

Hash Set:
✓ Works without sorting if order doesn't matter
✓ Useful when modifications to array aren't allowed
✓ Educational - shows connection to Two Sum
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
│ 1. Brute Force    │   O(n³)  │   O(1)   │    Easy      │  ✗ Too slow      │
├───────────────────┼──────────┼──────────┼──────────────┼───────────────────┤
│ 2. Sort + 2-Ptr   │   O(n²)  │   O(1)   │   Medium     │  ⭐ BEST CHOICE  │
├───────────────────┼──────────┼──────────┼──────────────┼───────────────────┤
│ 3. Hash Set       │   O(n²)  │   O(n)   │   Medium     │  ✓ Alternative   │
└───────────────────┴──────────┴──────────┴──────────────┴───────────────────┘

WHY SORT + TWO-POINTER IS RECOMMENDED:
┌─────────────────────────────────────────────────────────────────────────────┐
│ ✓ Optimal time complexity - O(n²), proven lower bound                      │
│ ✓ Optimal space complexity - O(1) excluding output                         │
│ ✓ Results naturally sorted - No post-processing needed                     │
│ ✓ Fundamental technique - Applies to K-Sum, closest sum, etc.             │
│ ✓ Interview favorite - Expected solution in technical interviews           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔗 Extension: K-Sum Pattern

```
The Two-Pointer technique generalizes to K-Sum problems:

2-Sum:  O(n) with hash or O(n log n) with sort + 2-pointer
3-Sum:  O(n²) = O(n) for fixing one + O(n) for 2-Sum
4-Sum:  O(n³) = O(n) for fixing one + O(n²) for 3-Sum
K-Sum:  O(n^(K-1)) recursive reduction

Pattern:
K-Sum = Fix one element + (K-1)-Sum on remaining
Base case: 2-Sum with two pointers
```

---

## Hints

<details>
<summary>Hint 1</summary>
Sort the array first. This allows you to use a two-pointer technique efficiently.
</details>

<details>
<summary>Hint 2</summary>
For each number in the array, use two pointers to find pairs that sum to (targetSum - currentNumber).
</details>

<details>
<summary>Hint 3</summary>
The left pointer starts just after the current number, right pointer at the end. Move them based on the sum comparison.
</details>

---

## Similar Problems (Harder)

### 1. Three Number Sum Closest
**Difficulty:** Medium

Find three numbers whose sum is closest to the target.

```
Input: array = [-1, 2, 1, -4], target = 1
Output: 2 (sum of -1 + 2 + 1 = 2 is closest to 1)
```

**Thinking Pattern:** Same two-pointer approach, but track minimum difference instead of exact match. Update best answer whenever |current_sum - target| < |best_sum - target|.

---

### 2. Three Number Sum with Duplicates
**Difficulty:** Hard

Same problem but array can contain duplicates. Each unique triplet should appear only once.

```
Input: array = [1, 1, 1, 2, 2, 3], target = 6
Output: [[1, 2, 3]] (not [[1,2,3], [1,2,3], [1,2,3]])
```

**Thinking Pattern:** Add skip logic after finding a triplet - while next element equals current, skip it. Requires careful handling at multiple levels.

---

### 3. Count Triplets with Sum Less Than Target
**Difficulty:** Hard

Count the number of triplets whose sum is strictly less than the target.

```
Input: array = [-2, 0, 1, 3], target = 2
Output: 2 (triplets: [-2,0,1] and [-2,0,3])
```

**Thinking Pattern:** When sum < target with left at L and right at R, ALL pairs (L, L+1), (L, L+2), ..., (L, R) are valid. Count = R - L pairs found at once!
