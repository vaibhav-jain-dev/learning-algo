<div id="viz-config" style="display:none">
{"name":"Max Subset Sum No Adjacent","algorithm":"dp-max-subset","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"array":[75,105,120,75,90,135]},"output":330,"inputRaw":"array = [75, 105, 120, 75, 90, 135]","outputRaw":"330 (75 + 120 + 135)"},{"input":{"array":[7,10,12,7,9,14]},"output":33,"inputRaw":"array = [7, 10, 12, 7, 9, 14]","outputRaw":"33 (7 + 12 + 14)"}]}
</div>

# Max Subset Sum No Adjacent

**Difficulty:** Medium (Blue)

## Problem Statement

Write a function that takes in an array of positive integers and returns the maximum sum of non-adjacent elements in the array.

If the input array is empty, the function should return 0.

## Examples

**Example 1:**
```
Input: array = [75, 105, 120, 75, 90, 135]
Output: 330 (75 + 120 + 135)
```

**Example 2:**
```
Input: array = [7, 10, 12, 7, 9, 14]
Output: 33 (7 + 12 + 14)
```

## Constraints

- Array contains positive integers
- Elements cannot be adjacent in the subset
- Empty array returns 0

---

## Thought Process & Pattern Recognition

<details>
<summary><strong>Click to reveal thinking pattern</strong></summary>

### Step 1: Understand the Core Problem
**Question to ask yourself:** "At each element, what choices do I have?"

For each element, we have exactly two choices:
- **Include it** - Add to sum, but skip the previous element
- **Exclude it** - Don't add, take whatever was best before

### Step 2: Identify the Pattern
**Key insight:** This is a **Dynamic Programming** problem because:
- Optimal substructure: Best solution at position i depends on best solutions before
- Overlapping subproblems: Same subproblems are solved multiple times in naive recursion

```
Array: [7, 10, 12, 7, 9, 14]

At each index i, we track:
- maxSum[i] = max sum we can achieve considering elements 0 to i

Decision at each step:
- Include array[i]: maxSum[i-2] + array[i]
- Exclude array[i]: maxSum[i-1]

maxSum[i] = max(maxSum[i-1], maxSum[i-2] + array[i])
```

### Step 3: Recognize the Algorithm Pattern
This is the **House Robber** pattern (classic DP):
- Cannot take adjacent elements
- Maximize total value
- Linear DP with constant lookback

### Step 4: Consider Alternative Approaches
1. **Brute Force (2^n)** - Try all subsets, check non-adjacency
2. **Recursive + Memoization** - Top-down DP
3. **Iterative DP with Array** - O(n) space
4. **Iterative DP with Two Variables** - O(1) space ⭐

### Step 5: Choose Optimal Solution
Two-variable iterative DP wins:
- Same O(n) time as other DP approaches
- O(1) space instead of O(n)
- Simple to implement

</details>

---

## Visual Diagram: How It Works

<details>
<summary><strong>Click to see step-by-step visualization</strong></summary>

```
                    MAX SUBSET SUM VISUALIZATION
┌─────────────────────────────────────────────────────────────────────────────┐
│  Array: [7, 10, 12, 7, 9, 14]                                              │
│                                                                             │
│  Goal: Find max sum where no two elements are adjacent                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Index:    0     1     2     3     4     5                                │
│   Array:  [ 7 ] [10 ] [12 ] [ 7 ] [ 9 ] [14 ]                             │
│                                                                             │
│   Step-by-step DP:                                                          │
│                                                                             │
│   i=0: prev=0, curr=7                                                       │
│        Take 7 (only option)                                                 │
│                                                                             │
│   i=1: prev=7, curr=max(7, 0+10)=10                                        │
│        10 > 7, so best is just 10                                          │
│                                                                             │
│   i=2: prev=10, curr=max(10, 7+12)=19                                      │
│        7+12=19 > 10, so take 7 and 12                                      │
│                                                                             │
│   i=3: prev=19, curr=max(19, 10+7)=19                                      │
│        19 > 17, so skip 7                                                   │
│                                                                             │
│   i=4: prev=19, curr=max(19, 19+9)=28                                      │
│        19+9=28 > 19, so take 9                                              │
│                                                                             │
│   i=5: prev=28, curr=max(28, 19+14)=33                                     │
│        19+14=33 > 28, so take 14                                            │
│                                                                             │
│   RESULT: 33 (elements: 7 + 12 + 14)                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### DP State Transition

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DP TRANSITION FORMULA                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   At each position i, we maintain:                                          │
│                                                                             │
│   prev = best sum we could get up to index i-2                             │
│   curr = best sum we could get up to index i-1                             │
│                                                                             │
│   For element array[i]:                                                     │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────┐      │
│   │                                                                 │      │
│   │   new_curr = max(curr, prev + array[i])                        │      │
│   │              ────   ─────────────────                          │      │
│   │              skip   include (must skip i-1)                    │      │
│   │                                                                 │      │
│   │   Then: prev = curr, curr = new_curr                           │      │
│   │                                                                 │      │
│   └─────────────────────────────────────────────────────────────────┘      │
│                                                                             │
│   This is the "rolling two variables" optimization!                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

</details>

---

## Solution Approaches

### Approach 1: Two Variables DP ⭐ RECOMMENDED

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why This Approach?
- **Optimal time** - O(n), single pass
- **Optimal space** - O(1), just two variables
- **Simple logic** - Easy to understand and code

#### Pseudo Code
```
function maxSubsetSumNoAdjacent(array):
    if array is empty: return 0
    if array has 1 element: return array[0]

    prev = 0          # Best sum up to i-2
    curr = array[0]   # Best sum up to i-1

    for i from 1 to n-1:
        new_curr = max(curr, prev + array[i])
        prev = curr
        curr = new_curr

    return curr
```

#### How It Works
1. Track two values: best sum excluding last element (prev), best sum including last (curr)
2. For each new element: either skip it (keep curr) or take it (prev + element)
3. Update prev and curr for next iteration

#### Code Logic
```
┌─────────────────────────────────────────────────┐
│  prev, curr = 0, 0                              │
│  for num in array:                              │
│      prev, curr = curr, max(curr, prev + num)   │
│  return curr                                    │
└─────────────────────────────────────────────────┘
```

#### Complexity Analysis
```
┌────────────────────────────────────────────────────────────────┐
│  TIME COMPLEXITY: O(n)                                         │
├────────────────────────────────────────────────────────────────┤
│  • Single pass through the array                               │
│  • Constant work at each element                               │
│  • Cannot do better - must look at each element                │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│  SPACE COMPLEXITY: O(1)                                        │
├────────────────────────────────────────────────────────────────┤
│  • Only two variables regardless of input size                 │
│  • Optimal - cannot use less space                             │
│  • No recursion stack or auxiliary arrays                      │
└────────────────────────────────────────────────────────────────┘
```

</details>

---

### Approach 2: DP with Array

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why Consider This Approach?
- **More intuitive** - Can see all intermediate values
- **Easier debugging** - Can print the DP array
- **Foundation** - Helps understand the two-variable optimization

#### Pseudo Code
```
function maxSubsetSumNoAdjacent(array):
    if array is empty: return 0
    if array has 1 element: return array[0]

    dp = new array of size n
    dp[0] = array[0]
    dp[1] = max(array[0], array[1])

    for i from 2 to n-1:
        dp[i] = max(dp[i-1], dp[i-2] + array[i])

    return dp[n-1]
```

#### DP Array Visualization
```
Array: [7, 10, 12, 7, 9, 14]
DP:    [7, 10, 19, 19, 28, 33]

dp[0] = 7                          (just take first)
dp[1] = max(7, 10) = 10           (take larger of first two)
dp[2] = max(10, 7+12) = 19        (take 7 and 12)
dp[3] = max(19, 10+7) = 19        (skip 7)
dp[4] = max(19, 19+9) = 28        (take 9)
dp[5] = max(28, 19+14) = 33       (take 14)
```

#### Complexity Analysis
```
TIME:  O(n) - Same as two-variable approach
SPACE: O(n) - Stores entire DP array

When to use this?
• When you need to reconstruct which elements were chosen
• For debugging and understanding DP
• As a stepping stone to the optimized solution
```

</details>

---

### Approach 3: Recursive with Memoization

<details>
<summary><strong>Click to see solution details</strong></summary>

#### Why Consider This Approach?
- **Top-down thinking** - Natural way to formulate DP
- **Same time complexity** - O(n) with memoization
- **Interview alternative** - Shows you understand recursion + DP

#### Pseudo Code
```
function maxSubsetSum(array, i, memo):
    if i < 0: return 0
    if i in memo: return memo[i]

    # Include current or skip it
    memo[i] = max(
        maxSubsetSum(array, i-1, memo),        # Skip
        array[i] + maxSubsetSum(array, i-2, memo)  # Include
    )
    return memo[i]

# Call: maxSubsetSum(array, n-1, {})
```

#### Complexity Analysis
```
TIME:  O(n) - Each subproblem solved once
SPACE: O(n) - Memoization table + recursion stack

Why not preferred?
• Extra overhead from recursion
• Risk of stack overflow for large arrays
• Same time, more space than iterative
```

</details>

---

## Approach Comparison Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SOLUTION COMPARISON TABLE                            │
├───────────────────┬──────────┬──────────┬──────────────┬───────────────────┤
│     Approach      │   Time   │  Space   │  Difficulty  │   Recommendation  │
├───────────────────┼──────────┼──────────┼──────────────┼───────────────────┤
│ 1. Two Variables  │   O(n)   │   O(1)   │    Easy      │  ⭐ BEST CHOICE   │
├───────────────────┼──────────┼──────────┼──────────────┼───────────────────┤
│ 2. DP Array       │   O(n)   │   O(n)   │    Easy      │  ✓ For learning  │
├───────────────────┼──────────┼──────────┼──────────────┼───────────────────┤
│ 3. Recursive+Memo │   O(n)   │   O(n)   │   Medium     │  ⚠️ More overhead │
├───────────────────┼──────────┼──────────┼──────────────┼───────────────────┤
│ 4. Brute Force    │  O(2^n)  │   O(n)   │    Easy      │  ✗ Too slow      │
└───────────────────┴──────────┴──────────┴──────────────┴───────────────────┘

WHY TWO VARIABLES IS RECOMMENDED:
┌─────────────────────────────────────────────────────────────────────────────┐
│ ✓ Optimal O(n) time - must check each element                               │
│ ✓ Optimal O(1) space - only need last two values                           │
│ ✓ Clean code - just 4 lines in the loop                                    │
│ ✓ Interview gold - shows space optimization skill                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Hints

<details>
<summary>Hint 1</summary>
At each position, you have two choices: include the current element or skip it.
</details>

<details>
<summary>Hint 2</summary>
Think about what information you need from previous elements: maxSum[i] = max(maxSum[i-1], maxSum[i-2] + array[i])
</details>

<details>
<summary>Hint 3</summary>
You only need the last two values, so you can reduce space from O(n) to O(1) using two variables.
</details>

---

## Similar Problems (Harder)

### 1. House Robber II
**Difficulty:** Medium

Same problem but array is circular - first and last elements are adjacent.

```
Input: [2, 3, 2]
Output: 3 (can't take both 2s since they're adjacent in circle)
```

**Pattern:** Run the algorithm twice - once excluding first, once excluding last.

---

### 2. Delete and Earn
**Difficulty:** Medium

If you take number n, delete all n-1 and n+1 from array. Maximize points.

**Pattern:** Transform to House Robber - adjacent values can't both be taken.

---

### 3. Paint House
**Difficulty:** Medium

Paint n houses with 3 colors, adjacent houses can't have same color. Minimize cost.

**Pattern:** DP with state = (house index, last color used).
