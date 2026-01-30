# Dynamic Programming - Interview Mastery Guide

## Category Overview

Dynamic Programming (DP) is an algorithmic paradigm that solves complex problems by breaking them into simpler overlapping subproblems. It stores the results of subproblems to avoid redundant computation, transforming exponential time complexity into polynomial time. DP is one of the most powerful techniques in algorithmic problem-solving and a favorite topic in technical interviews.

The key insight of DP is the **optimal substructure** property: the optimal solution to a problem can be constructed from optimal solutions of its subproblems. Combined with **overlapping subproblems**, DP can dramatically reduce computational complexity.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Two Approaches to DP</h3>
<div style="color: #334155;">
<ul>
<li><strong>Top-Down (Memoization)</strong>: Start from the main problem, recursively solve subproblems, cache results</li>
<li><strong>Bottom-Up (Tabulation)</strong>: Start from smallest subproblems, iteratively build up to the main problem</li>
</ul>
<table style="width: 100%; margin-top: 16px;">
<tr>
<th style="padding: 8px; background: #e2e8f0; text-align: left;">Aspect</th>
<th style="padding: 8px; background: #e2e8f0; text-align: left;">Top-Down</th>
<th style="padding: 8px; background: #e2e8f0; text-align: left;">Bottom-Up</th>
</tr>
<tr>
<td style="padding: 8px;">Implementation</td>
<td style="padding: 8px;">Recursion + Cache</td>
<td style="padding: 8px;">Iteration + Table</td>
</tr>
<tr>
<td style="padding: 8px;">Pros</td>
<td style="padding: 8px;">More intuitive, only computes needed states</td>
<td style="padding: 8px;">No recursion overhead, can optimize space</td>
</tr>
<tr>
<td style="padding: 8px;">Cons</td>
<td style="padding: 8px;">Stack overflow risk, function call overhead</td>
<td style="padding: 8px;">Must compute all states, order matters</td>
</tr>
</table>
</div>
</div>

**Interview Frequency**: DP problems appear in **20-25%** of coding interviews, especially at Google, Amazon, Meta, and quantitative trading firms. They test algorithmic thinking, optimization skills, and ability to identify patterns.

## Key Patterns

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">DP Pattern Recognition Guide</h3>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155; overflow-x: auto;">
+------------------------+-------------------------------+---------------------------+
|       Pattern          |        Characteristics        |     Example Problems      |
+------------------------+-------------------------------+---------------------------+
| 1D DP                  | Linear sequence, choices at   | Fibonacci, Climbing Stairs|
|                        | each position                 | House Robber, Coin Change |
+------------------------+-------------------------------+---------------------------+
| 2D DP                  | Two sequences/dimensions,     | LCS, Edit Distance,       |
|                        | grid problems                 | Unique Paths, Knapsack    |
+------------------------+-------------------------------+---------------------------+
| Interval DP            | Optimal way to merge/split    | Matrix Chain, Burst       |
|                        | intervals                     | Balloons, Palindrome Part |
+------------------------+-------------------------------+---------------------------+
| State Machine DP       | Finite states with            | Stock Trading, Best Team, |
|                        | transitions                   | Paint House               |
+------------------------+-------------------------------+---------------------------+
| Knapsack Variants      | Select items with constraint  | 0/1 Knapsack, Unbounded,  |
|                        | (weight/capacity)             | Subset Sum, Target Sum    |
+------------------------+-------------------------------+---------------------------+
| String DP              | Pattern matching, string      | Regex Match, Wildcard,    |
|                        | transformations               | Distinct Subsequences     |
+------------------------+-------------------------------+---------------------------+
</pre>
</div>

### Pattern 1: 1D Dynamic Programming

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">1D DP Visualization - Climbing Stairs</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Problem: Count ways to climb n stairs, taking 1 or 2 steps at a time.

Recurrence: dp[i] = dp[i-1] + dp[i-2]
  (ways to reach step i from step i-1 OR step i-2)

Stairs:  0    1    2    3    4    5
Ways:    1    1    2    3    5    8
  |    |    |    |
  |    |    |    |
  |    |    |    +-- dp[3] + dp[4] = 3 + 5
  |    |    +------ dp[2] + dp[3] = 2 + 3
  |    +---------- dp[1] + dp[2] = 1 + 2
  +-------------- dp[0] + dp[1] = 1 + 1

Visualization of paths to step 4:
From step 3 (3 ways): +1 each = 3 ways ending with 1-step
From step 2 (2 ways): +2 each = 2 ways ending with 2-step
Total: 5 ways
</pre>
</div>

### Pattern 2: 2D DP - Grid Problems

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">2D DP Visualization - Unique Paths</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Problem: Count paths from top-left to bottom-right (only right/down moves)

Grid (m=3, n=4):
    +-----+-----+-----+-----+
    |  1  |  1  |  1  |  1  |
    +-----+-----+-----+-----+
    |  1  |  2  |  3  |  4  |
    +-----+-----+-----+-----+
    |  1  |  3  |  6  | 10  |  <- Answer: 10
    +-----+-----+-----+-----+

Recurrence: dp[i][j] = dp[i-1][j] + dp[i][j-1]
  (paths from above + paths from left)

dp[2][3] = dp[1][3] + dp[2][2] = 4 + 6 = 10

Key: First row and column are all 1s (only one way to reach)
</pre>
</div>

### Pattern 3: Longest Common Subsequence (LCS)

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">LCS Table Visualization</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Strings: "ABCDE" and "ACE"

  ""   A   C   E
    +----+---+---+---+
 "" |  0 | 0 | 0 | 0 |
    +----+---+---+---+
  A |  0 | 1 | 1 | 1 |  <- A matches A
    +----+---+---+---+
  B |  0 | 1 | 1 | 1 |
    +----+---+---+---+
  C |  0 | 1 | 2 | 2 |  <- C matches C
    +----+---+---+---+
  D |  0 | 1 | 2 | 2 |
    +----+---+---+---+
  E |  0 | 1 | 2 | 3 |  <- E matches E, LCS = 3
    +----+---+---+---+

Recurrence:
  If chars match: dp[i][j] = dp[i-1][j-1] + 1
  Else:          dp[i][j] = max(dp[i-1][j], dp[i][j-1])

LCS = "ACE" (length 3)
</pre>
</div>

## Must-Know Problems with Solutions

### Problem 1: Maximum Subarray (Kadane's Algorithm)

**Problem**: Find the contiguous subarray with the largest sum.

```python
def max_subarray(nums):
    """
    Time: O(n) | Space: O(1)

    State: dp[i] = max subarray sum ending at index i
    Transition: dp[i] = max(nums[i], dp[i-1] + nums[i])
    Decision: Start fresh or extend previous subarray
    """
    max_sum = nums[0]
    current_sum = nums[0]

    for i in range(1, len(nums)):
        # Either start new subarray or extend existing
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)

    return max_sum

# Example
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
print(max_subarray(nums))  # 6 ([4, -1, 2, 1])
```

---

### Problem 2: Longest Increasing Subsequence (LIS)

**Problem**: Find the length of the longest strictly increasing subsequence.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">LIS Approaches</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Array: [10, 9, 2, 5, 3, 7, 101, 18]

O(n^2) DP Approach:
dp[i] = length of LIS ending at index i
dp[0] = 1 (just 10)
dp[1] = 1 (just 9)
dp[2] = 1 (just 2)
dp[3] = 2 (2, 5)
dp[4] = 2 (2, 3)
dp[5] = 3 (2, 5, 7) or (2, 3, 7)
dp[6] = 4 (2, 5, 7, 101) or (2, 3, 7, 101)
dp[7] = 4 (2, 5, 7, 18) or (2, 3, 7, 18)

Answer: max(dp) = 4

O(n log n) Binary Search Approach:
Maintain smallest tail for LIS of each length
tails = [2, 3, 7, 18]
Length = 4
</pre>
</div>

```python
def lis_dp(nums):
    """
    O(n^2) DP Solution
    dp[i] = length of LIS ending at nums[i]
    """
    if not nums:
        return 0

    n = len(nums)
    dp = [1] * n  # Each element is an LIS of length 1

    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)

def lis_binary_search(nums):
    """
    O(n log n) Binary Search Solution
    tails[i] = smallest ending element for LIS of length i+1
    """
    from bisect import bisect_left

    tails = []
    for num in nums:
        pos = bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num

    return len(tails)

# Example
nums = [10, 9, 2, 5, 3, 7, 101, 18]
print(lis_dp(nums))  # 4
print(lis_binary_search(nums))  # 4
```

---

### Problem 3: 0/1 Knapsack

**Problem**: Given items with weights and values, find maximum value that fits in capacity.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Knapsack Table Visualization</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Items: [(weight=1, value=1), (w=2, v=4), (w=3, v=5), (w=2, v=3)]
Capacity: 5

  Capacity
  0   1   2   3   4   5
  +---+---+---+---+---+---+
Item 0 | 0 | 1 | 1 | 1 | 1 | 1 |
  +---+---+---+---+---+---+
Item 1 | 0 | 1 | 4 | 5 | 5 | 5 |
  +---+---+---+---+---+---+
Item 2 | 0 | 1 | 4 | 5 | 6 | 9 |
  +---+---+---+---+---+---+
Item 3 | 0 | 1 | 4 | 5 | 7 | 9 |  <- Max value: 9
  +---+---+---+---+---+---+

Recurrence:
  dp[i][w] = max(
    dp[i-1][w],                    // Don't take item i
    dp[i-1][w-weight[i]] + value[i] // Take item i (if fits)
  )

Answer: 9 (items 1 and 2: value=4+5, weight=2+3=5)
</pre>
</div>

```python
def knapsack_01(values, weights, capacity):
    """
    Time: O(n * capacity) | Space: O(n * capacity)

    dp[i][c] = max value using items 0..i with capacity c
    """
    n = len(values)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for c in range(capacity + 1):
            # Don't take item i
            dp[i][c] = dp[i-1][c]

            # Take item i (if it fits)
            if weights[i-1] <= c:
                dp[i][c] = max(dp[i][c],
                               dp[i-1][c - weights[i-1]] + values[i-1])

    return dp[n][capacity]

def knapsack_01_optimized(values, weights, capacity):
    """
    Space-Optimized: O(capacity)
    Process backwards to avoid using updated values
    """
    dp = [0] * (capacity + 1)

    for i in range(len(values)):
        for c in range(capacity, weights[i] - 1, -1):  # Backward!
            dp[c] = max(dp[c], dp[c - weights[i]] + values[i])

    return dp[capacity]

# Example
values = [1, 4, 5, 3]
weights = [1, 2, 3, 2]
print(knapsack_01(values, weights, 5))  # 9
```

---

### Problem 4: Coin Change

**Problem**: Find minimum coins needed to make a target amount.

```python
def coin_change(coins, amount):
    """
    Time: O(amount * len(coins)) | Space: O(amount)

    dp[a] = minimum coins needed for amount a
    Unbounded knapsack variant (can use coins multiple times)
    """
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # 0 coins needed for amount 0

    for a in range(1, amount + 1):
        for coin in coins:
            if coin <= a and dp[a - coin] != float('inf'):
                dp[a] = min(dp[a], dp[a - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1

def coin_change_ways(coins, amount):
    """
    Count number of ways to make change (order doesn't matter)
    """
    dp = [0] * (amount + 1)
    dp[0] = 1

    for coin in coins:  # Process by coin first to avoid counting permutations
        for a in range(coin, amount + 1):
            dp[a] += dp[a - coin]

    return dp[amount]

# Examples
print(coin_change([1, 2, 5], 11))  # 3 (5+5+1)
print(coin_change_ways([1, 2, 5], 5))  # 4 ways
```

---

### Problem 5: Edit Distance (Levenshtein)

**Problem**: Find minimum operations (insert, delete, replace) to transform one string to another.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Edit Distance Table</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Strings: "abc" -> "yabd"

  ""   y   a   b   d
    +----+---+---+---+---+
 "" |  0 | 1 | 2 | 3 | 4 |  <- Insert all
    +----+---+---+---+---+
  a |  1 | 1 | 1 | 2 | 3 |  <- a matches a at [1][2]
    +----+---+---+---+---+
  b |  2 | 2 | 2 | 1 | 2 |  <- b matches b at [2][3]
    +----+---+---+---+---+
  c |  3 | 3 | 3 | 2 | 2 |  <- c != d, min of ops + 1
    +----+---+---+---+---+

Recurrence:
  If chars match: dp[i][j] = dp[i-1][j-1]
  Else: dp[i][j] = 1 + min(
    dp[i-1][j],    // Delete from str1
    dp[i][j-1],    // Insert into str1
    dp[i-1][j-1]   // Replace in str1
  )

Answer: 2 (insert 'y' at start, replace 'c' with 'd')
</pre>
</div>

```python
def edit_distance(str1, str2):
    """
    Time: O(m * n) | Space: O(m * n)

    dp[i][j] = min operations to convert str1[0:i] to str2[0:j]
    """
    m, n = len(str1), len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Base cases
    for i in range(m + 1):
        dp[i][0] = i  # Delete all from str1
    for j in range(n + 1):
        dp[0][j] = j  # Insert all to str1

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i-1] == str2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],    # Delete
                    dp[i][j-1],    # Insert
                    dp[i-1][j-1]   # Replace
                )

    return dp[m][n]

# Example
print(edit_distance("abc", "yabd"))  # 2
```

---

### Problem 6: Longest Common Subsequence

```python
def longest_common_subsequence(str1, str2):
    """
    Time: O(m * n) | Space: O(m * n)

    dp[i][j] = LCS length of str1[0:i] and str2[0:j]
    """
    m, n = len(str1), len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i-1] == str2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]

def get_lcs_string(str1, str2):
    """Also reconstruct the actual LCS"""
    m, n = len(str1), len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i-1] == str2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    # Backtrack to find LCS
    lcs = []
    i, j = m, n
    while i > 0 and j > 0:
        if str1[i-1] == str2[j-1]:
            lcs.append(str1[i-1])
            i -= 1
            j -= 1
        elif dp[i-1][j] > dp[i][j-1]:
            i -= 1
        else:
            j -= 1

    return ''.join(reversed(lcs))

# Example
print(longest_common_subsequence("ABCDE", "ACE"))  # 3
print(get_lcs_string("ABCDE", "ACE"))  # "ACE"
```

## Complexity Analysis Summary

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">DP Problems Complexity Reference</h3>
<table style="width: 100%; border-collapse: collapse; color: #334155;">
<tr style="background: #e2e8f0;">
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Problem</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Time</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Space</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Optimized Space</th>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Fibonacci</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(1)</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">LIS</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n^2) / O(n log n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">-</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">0/1 Knapsack</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n * W)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n * W)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(W)</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Coin Change</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n * amount)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(amount)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">-</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">LCS</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(m * n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(m * n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(min(m, n))</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Edit Distance</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(m * n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(m * n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(min(m, n))</td>
</tr>
</table>
</div>

## Common Mistakes

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Pitfalls to Avoid</h3>
<div style="color: #334155;">

1. **Wrong Base Case**: Forgetting to initialize dp[0] properly - causes cascading errors

2. **Off-by-One in Indices**: String problems often use 1-indexed dp with 0 as base case

3. **Wrong Iteration Order**:
   - Bottom-up: Must process dependencies first
   - Space optimization: May need reverse iteration

4. **Not Recognizing DP**: Signs: optimal substructure, overlapping subproblems, counting/min/max

5. **Overcounting**: In coin change for combinations (not permutations), iterate coins first

6. **Unbounded vs Bounded**: 0/1 Knapsack (each item once) vs Unbounded (unlimited use)

7. **Memoization Key Errors**: Using mutable objects or missing state in cache key

8. **Not Considering All States**: Missing dimensions in state (e.g., "last element used")

</div>
</div>

## Interview Tips

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">DP Problem-Solving Framework</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Step 1: Identify DP applicability
  - Can problem be broken into subproblems?
  - Do subproblems overlap?
  - Is there optimal substructure?

Step 2: Define state
  - What information do I need at each step?
  - What does dp[i] or dp[i][j] represent?
  - Make state as small as possible

Step 3: Define recurrence
  - How do I get dp[i] from smaller subproblems?
  - What are my choices at each step?
  - Write the recurrence relation

Step 4: Identify base cases
  - What are the smallest subproblems?
  - What do I know without computation?

Step 5: Determine iteration order
  - What must be computed before what?
  - Can I optimize space by reusing?

Time Allocation (45-min problem):
0-5 min:  Understand, identify as DP
5-15 min: Define state, recurrence, base cases
15-35 min: Implement solution
35-45 min: Test, optimize if needed
</pre>
</div>

### Key Communication Phrases

- "This has optimal substructure because the optimal solution uses optimal solutions to subproblems..."
- "I'll define dp[i] as... and the recurrence is..."
- "The base case is dp[0] = ... because..."
- "I can optimize space because I only need the previous row/state..."
- "Let me trace through a small example to verify the recurrence..."

## Practice Problems

### Easy
1. Fibonacci
2. Climbing Stairs
3. Maximum Subarray (Kadane's)
4. House Robber

### Medium
5. Coin Change
6. Longest Increasing Subsequence
7. Longest Common Subsequence
8. 0/1 Knapsack
9. Min Number of Coins for Change
10. Unique Paths
11. Edit Distance
12. Max Subset Sum No Adjacent

### Hard
13. Max Sum Increasing Subsequence
14. Longest Palindromic Subsequence
15. Water Area
16. Knapsack Problem
17. Disk Stacking

### Very Hard
18. Longest String Chain
19. Square of Zeroes
20. Palindrome Partitioning Min Cuts

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Quick Reference - Common Recurrences</h3>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Fibonacci:    dp[i] = dp[i-1] + dp[i-2]

LIS:          dp[i] = max(dp[j] + 1) for j < i where arr[j] < arr[i]

0/1 Knapsack: dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i])

Unbounded:    dp[w] = max(dp[w], dp[w-wt[i]] + val[i])

LCS:          dp[i][j] = dp[i-1][j-1] + 1        if match
  = max(dp[i-1][j], dp[i][j-1]) otherwise

Edit Dist:    dp[i][j] = dp[i-1][j-1]            if match
  = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])

Unique Paths: dp[i][j] = dp[i-1][j] + dp[i][j-1]

Space Optimization Pattern:
  - If only need previous row: use 2 rows, alternate
  - If only need previous element: use single variable
  - Process backward for 0/1 choices (prevent double-use)
</pre>
</div>
