# Dynamic Programming

## Overview

Dynamic Programming (DP) is an optimization technique that solves complex problems by breaking them into simpler overlapping subproblems. It stores solutions to subproblems to avoid redundant computation, trading space for time.

## Key Concepts & Terminology

### Core Principles
- **Optimal Substructure**: Optimal solution contains optimal solutions to subproblems
- **Overlapping Subproblems**: Same subproblems solved multiple times
- **Memoization**: Top-down approach, cache recursive results
- **Tabulation**: Bottom-up approach, fill table iteratively

### DP Approaches
| Approach | Description | Space |
|----------|-------------|-------|
| Top-Down (Memoization) | Recursive + caching | O(n) cache |
| Bottom-Up (Tabulation) | Iterative table filling | O(n) or O(1) |
| Space-Optimized | Keep only needed states | O(1) often |

### Problem Recognition Patterns
1. **Counting problems**: "How many ways..."
2. **Optimization**: "Find minimum/maximum..."
3. **Decision making**: "Is it possible to..."
4. **Sequence problems**: Subsequences, subarrays
5. **Grid problems**: Paths, coins, etc.

### Common DP Patterns
- **1D DP**: Single array/sequence
- **2D DP**: Two sequences, grid
- **Interval DP**: Subarray ranges
- **State Machine DP**: Multiple states
- **Bitmask DP**: Subset enumeration

### Steps to Solve DP Problems
1. Define state (what does dp[i] represent?)
2. Find recurrence relation
3. Identify base cases
4. Determine traversal order
5. Optimize space if possible

---

## Problems

### 1. Max Subset Sum No Adjacent

**Difficulty:** Medium

**Problem Statement:**
Find the maximum sum of non-adjacent elements in an array.

**Example:**
```
Input: [75, 105, 120, 75, 90, 135]
Output: 330 (75 + 120 + 135)
```

<details>
<summary><strong>Hints</strong></summary>

1. dp[i] = max sum ending at or before index i
2. Either include current element or not
3. dp[i] = max(dp[i-1], dp[i-2] + arr[i])

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def maxSubsetSumNoAdjacent(array):
    """
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    if not array:
        return 0
    if len(array) == 1:
        return array[0]

    # prev2 = max sum two positions back
    # prev1 = max sum one position back
    prev2, prev1 = array[0], max(array[0], array[1])

    for i in range(2, len(array)):
        current = max(prev1, prev2 + array[i])
        prev2, prev1 = prev1, current

    return prev1

# Test
array = [75, 105, 120, 75, 90, 135]
print(maxSubsetSumNoAdjacent(array))  # 330
```

```go
package main

import "fmt"

func maxSubsetSumNoAdjacent(array []int) int {
    if len(array) == 0 {
        return 0
    }
    if len(array) == 1 {
        return array[0]
    }

    prev2 := array[0]
    prev1 := max(array[0], array[1])

    for i := 2; i < len(array); i++ {
        current := max(prev1, prev2+array[i])
        prev2, prev1 = prev1, current
    }

    return prev1
}

func max(a, b int) int {
    if a > b { return a }
    return b
}

func main() {
    array := []int{75, 105, 120, 75, 90, 135}
    fmt.Println(maxSubsetSumNoAdjacent(array)) // 330
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **House Robber** - LeetCode version
2. **House Robber II** - Circular array
3. **Delete and Earn** - Similar selection pattern

</details>

---

### 2. Number Of Ways To Make Change

**Difficulty:** Medium

**Problem Statement:**
Given an array of coin denominations and a target amount, find the number of ways to make change.

**Example:**
```
Input: n = 6, denoms = [1, 5]
Output: 2 (1+1+1+1+1+1 or 1+5)
```

<details>
<summary><strong>Hints</strong></summary>

1. dp[amount] = number of ways to make amount
2. For each coin, add ways to make (amount - coin)
3. Order matters: iterate coins first to avoid counting permutations

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def numberOfWaysToMakeChange(n, denoms):
    """
    Time Complexity: O(n * d) where d = number of denominations
    Space Complexity: O(n)
    """
    dp = [0] * (n + 1)
    dp[0] = 1  # One way to make 0

    for coin in denoms:
        for amount in range(coin, n + 1):
            dp[amount] += dp[amount - coin]

    return dp[n]

# Test
print(numberOfWaysToMakeChange(6, [1, 5]))  # 2
print(numberOfWaysToMakeChange(10, [1, 5, 10, 25]))  # 4
```

```go
package main

import "fmt"

func numberOfWaysToMakeChange(n int, denoms []int) int {
    dp := make([]int, n+1)
    dp[0] = 1

    for _, coin := range denoms {
        for amount := coin; amount <= n; amount++ {
            dp[amount] += dp[amount-coin]
        }
    }

    return dp[n]
}

func main() {
    fmt.Println(numberOfWaysToMakeChange(6, []int{1, 5})) // 2
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Coin Change 2** - LeetCode version
2. **Combination Sum IV** - Count permutations
3. **Target Sum** - Plus/minus operations

</details>

---

### 3. Min Coins For Change

**Difficulty:** Medium

**Problem Statement:**
Find the minimum number of coins needed to make exact change. Return -1 if impossible.

**Example:**
```
Input: n = 7, denoms = [1, 5, 10]
Output: 3 (5 + 1 + 1)
```

<details>
<summary><strong>Hints</strong></summary>

1. dp[amount] = minimum coins to make amount
2. dp[i] = min(dp[i], dp[i-coin] + 1) for each coin
3. Initialize with infinity (impossible)

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def minNumberOfCoinsForChange(n, denoms):
    """
    Time Complexity: O(n * d)
    Space Complexity: O(n)
    """
    dp = [float('inf')] * (n + 1)
    dp[0] = 0

    for coin in denoms:
        for amount in range(coin, n + 1):
            if dp[amount - coin] != float('inf'):
                dp[amount] = min(dp[amount], dp[amount - coin] + 1)

    return dp[n] if dp[n] != float('inf') else -1

# Test
print(minNumberOfCoinsForChange(7, [1, 5, 10]))  # 3
print(minNumberOfCoinsForChange(11, [1, 5, 10]))  # 2 (10 + 1)
```

```go
package main

import (
    "fmt"
    "math"
)

func minNumberOfCoinsForChange(n int, denoms []int) int {
    dp := make([]int, n+1)
    for i := range dp {
        dp[i] = math.MaxInt32
    }
    dp[0] = 0

    for _, coin := range denoms {
        for amount := coin; amount <= n; amount++ {
            if dp[amount-coin] != math.MaxInt32 {
                if dp[amount-coin]+1 < dp[amount] {
                    dp[amount] = dp[amount-coin] + 1
                }
            }
        }
    }

    if dp[n] == math.MaxInt32 {
        return -1
    }
    return dp[n]
}

func main() {
    fmt.Println(minNumberOfCoinsForChange(7, []int{1, 5, 10})) // 3
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Coin Change** - LeetCode version
2. **Perfect Squares** - Sum of squares
3. **Integer Break** - Maximum product

</details>

---

### 4. Levenshtein Distance

**Difficulty:** Medium

**Problem Statement:**
Find the minimum number of edit operations (insert, delete, replace) to transform one string into another.

**Example:**
```
Input: str1 = "abc", str2 = "yabd"
Output: 2 (insert 'y' at start, replace 'c' with 'd')
```

<details>
<summary><strong>Hints</strong></summary>

1. 2D DP: dp[i][j] = edit distance for str1[0:i] and str2[0:j]
2. If chars match: dp[i][j] = dp[i-1][j-1]
3. Otherwise: 1 + min(insert, delete, replace)

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def levenshteinDistance(str1, str2):
    """
    Time Complexity: O(m * n)
    Space Complexity: O(min(m, n)) optimized
    """
    # Make str1 the shorter string for space optimization
    if len(str1) > len(str2):
        str1, str2 = str2, str1

    # Only need two rows
    prev = list(range(len(str1) + 1))
    curr = [0] * (len(str1) + 1)

    for j in range(1, len(str2) + 1):
        curr[0] = j
        for i in range(1, len(str1) + 1):
            if str1[i-1] == str2[j-1]:
                curr[i] = prev[i-1]
            else:
                curr[i] = 1 + min(
                    prev[i],      # delete from str1
                    curr[i-1],    # insert into str1
                    prev[i-1]     # replace
                )
        prev, curr = curr, prev

    return prev[len(str1)]

# Test
print(levenshteinDistance("abc", "yabd"))  # 2
print(levenshteinDistance("horse", "ros"))  # 3
```

```go
package main

import "fmt"

func levenshteinDistance(str1, str2 string) int {
    if len(str1) > len(str2) {
        str1, str2 = str2, str1
    }

    prev := make([]int, len(str1)+1)
    curr := make([]int, len(str1)+1)

    for i := range prev {
        prev[i] = i
    }

    for j := 1; j <= len(str2); j++ {
        curr[0] = j
        for i := 1; i <= len(str1); i++ {
            if str1[i-1] == str2[j-1] {
                curr[i] = prev[i-1]
            } else {
                curr[i] = 1 + min(prev[i], min(curr[i-1], prev[i-1]))
            }
        }
        prev, curr = curr, prev
    }

    return prev[len(str1)]
}

func min(a, b int) int {
    if a < b { return a }
    return b
}

func main() {
    fmt.Println(levenshteinDistance("abc", "yabd")) // 2
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Edit Distance** - LeetCode version
2. **Delete Operation for Two Strings** - Only deletions
3. **Minimum ASCII Delete Sum** - Weighted deletions

</details>

---

### 5. Ways To Traverse Graph

**Difficulty:** Medium

**Problem Statement:**
Count the number of ways to traverse a grid from top-left to bottom-right, moving only right or down.

**Example:**
```
Input: width = 4, height = 3
Output: 10
```

<details>
<summary><strong>Hints</strong></summary>

1. dp[i][j] = ways to reach cell (i, j)
2. dp[i][j] = dp[i-1][j] + dp[i][j-1]
3. Base case: first row and column are all 1s

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def waysToTraverseGraph(width, height):
    """
    Time Complexity: O(w * h)
    Space Complexity: O(w)
    """
    dp = [1] * width

    for _ in range(1, height):
        for j in range(1, width):
            dp[j] += dp[j-1]

    return dp[width - 1]

# Mathematical solution using combinations
def waysToTraverseGraphMath(width, height):
    """
    Total moves: (width-1) right + (height-1) down
    Choose (width-1) positions for right moves
    """
    from math import factorial
    return factorial(width + height - 2) // (factorial(width - 1) * factorial(height - 1))

# Test
print(waysToTraverseGraph(4, 3))  # 10
```

```go
package main

import "fmt"

func waysToTraverseGraph(width, height int) int {
    dp := make([]int, width)
    for i := range dp {
        dp[i] = 1
    }

    for i := 1; i < height; i++ {
        for j := 1; j < width; j++ {
            dp[j] += dp[j-1]
        }
    }

    return dp[width-1]
}

func main() {
    fmt.Println(waysToTraverseGraph(4, 3)) // 10
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Unique Paths** - LeetCode version
2. **Unique Paths II** - With obstacles
3. **Minimum Path Sum** - Find minimum cost path

</details>

---

### 6. Max Sum Increasing Subsequence

**Difficulty:** Hard

**Problem Statement:**
Find the maximum sum of increasing subsequence and the subsequence itself.

**Example:**
```
Input: [10, 70, 20, 30, 50, 11, 30]
Output: [110, [10, 20, 30, 50]]
```

<details>
<summary><strong>Hints</strong></summary>

1. dp[i] = max sum of increasing subsequence ending at i
2. Track previous index to reconstruct path
3. For each i, check all j < i where arr[j] < arr[i]

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def maxSumIncreasingSubsequence(array):
    """
    Time Complexity: O(n²)
    Space Complexity: O(n)
    """
    n = len(array)
    dp = array[:]  # dp[i] = max sum ending at i
    prev = [None] * n  # For reconstruction

    max_idx = 0

    for i in range(1, n):
        for j in range(i):
            if array[j] < array[i] and dp[j] + array[i] > dp[i]:
                dp[i] = dp[j] + array[i]
                prev[i] = j

        if dp[i] > dp[max_idx]:
            max_idx = i

    # Reconstruct sequence
    sequence = []
    idx = max_idx
    while idx is not None:
        sequence.append(array[idx])
        idx = prev[idx]

    return [dp[max_idx], sequence[::-1]]

# Test
array = [10, 70, 20, 30, 50, 11, 30]
print(maxSumIncreasingSubsequence(array))  # [110, [10, 20, 30, 50]]
```

```go
package main

import "fmt"

func maxSumIncreasingSubsequence(array []int) (int, []int) {
    n := len(array)
    dp := make([]int, n)
    prev := make([]int, n)

    copy(dp, array)
    for i := range prev {
        prev[i] = -1
    }

    maxIdx := 0

    for i := 1; i < n; i++ {
        for j := 0; j < i; j++ {
            if array[j] < array[i] && dp[j]+array[i] > dp[i] {
                dp[i] = dp[j] + array[i]
                prev[i] = j
            }
        }
        if dp[i] > dp[maxIdx] {
            maxIdx = i
        }
    }

    // Reconstruct
    sequence := []int{}
    for idx := maxIdx; idx != -1; idx = prev[idx] {
        sequence = append([]int{array[idx]}, sequence...)
    }

    return dp[maxIdx], sequence
}

func main() {
    array := []int{10, 70, 20, 30, 50, 11, 30}
    sum, seq := maxSumIncreasingSubsequence(array)
    fmt.Println(sum, seq) // 110 [10 20 30 50]
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Longest Increasing Subsequence** - Length instead of sum
2. **Russian Doll Envelopes** - 2D LIS
3. **Number of Longest Increasing Subsequence** - Count LIS

</details>

---

### 7. Longest Common Subsequence

**Difficulty:** Hard

**Problem Statement:**
Find the longest common subsequence of two strings.

**Example:**
```
Input: str1 = "ZXVVYZW", str2 = "XKYKZPW"
Output: ["XYZW"]
```

<details>
<summary><strong>Hints</strong></summary>

1. 2D DP: dp[i][j] = LCS length for str1[0:i], str2[0:j]
2. If match: dp[i][j] = 1 + dp[i-1][j-1]
3. Else: max(dp[i-1][j], dp[i][j-1])

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def longestCommonSubsequence(str1, str2):
    """
    Time Complexity: O(m * n)
    Space Complexity: O(m * n)
    """
    m, n = len(str1), len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Fill DP table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i-1] == str2[j-1]:
                dp[i][j] = 1 + dp[i-1][j-1]
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    # Reconstruct LCS
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

    return [''.join(reversed(lcs))]

# Test
print(longestCommonSubsequence("ZXVVYZW", "XKYKZPW"))  # ['XYZW']
```

```go
package main

import "fmt"

func longestCommonSubsequence(str1, str2 string) []string {
    m, n := len(str1), len(str2)
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }

    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if str1[i-1] == str2[j-1] {
                dp[i][j] = 1 + dp[i-1][j-1]
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
            }
        }
    }

    // Reconstruct
    lcs := []byte{}
    i, j := m, n
    for i > 0 && j > 0 {
        if str1[i-1] == str2[j-1] {
            lcs = append([]byte{str1[i-1]}, lcs...)
            i--
            j--
        } else if dp[i-1][j] > dp[i][j-1] {
            i--
        } else {
            j--
        }
    }

    return []string{string(lcs)}
}

func max(a, b int) int {
    if a > b { return a }
    return b
}

func main() {
    fmt.Println(longestCommonSubsequence("ZXVVYZW", "XKYKZPW"))
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Longest Common Substring** - Contiguous
2. **Shortest Common Supersequence** - Merge strings
3. **Delete Operation for Two Strings**

</details>

---

### 8. Min Number Of Jumps

**Difficulty:** Hard

**Problem Statement:**
Find minimum jumps to reach the end. Each element is max jump length from that position.

**Example:**
```
Input: [3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3]
Output: 4 (3->4->2->7->end)
```

<details>
<summary><strong>Hints</strong></summary>

1. Greedy approach: track farthest reachable
2. Jump when reaching current boundary
3. Update boundary to farthest reachable

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def minNumberOfJumps(array):
    """
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    if len(array) == 1:
        return 0

    jumps = 0
    current_end = 0
    farthest = 0

    for i in range(len(array) - 1):
        farthest = max(farthest, i + array[i])

        if i == current_end:
            jumps += 1
            current_end = farthest

            if current_end >= len(array) - 1:
                break

    return jumps

# Test
array = [3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3]
print(minNumberOfJumps(array))  # 4
```

```go
package main

import "fmt"

func minNumberOfJumps(array []int) int {
    if len(array) == 1 {
        return 0
    }

    jumps := 0
    currentEnd := 0
    farthest := 0

    for i := 0; i < len(array)-1; i++ {
        if i+array[i] > farthest {
            farthest = i + array[i]
        }

        if i == currentEnd {
            jumps++
            currentEnd = farthest

            if currentEnd >= len(array)-1 {
                break
            }
        }
    }

    return jumps
}

func main() {
    array := []int{3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3}
    fmt.Println(minNumberOfJumps(array)) // 4
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Jump Game** - Can you reach end?
2. **Jump Game II** - LeetCode version
3. **Frog Jump** - Specific jump sizes

</details>

---

### 9. Knapsack Problem

**Difficulty:** Hard

**Problem Statement:**
Given items with weights and values, find maximum value that fits in capacity.

**Example:**
```
Input: items = [[1,2], [4,3], [5,6], [6,7]], capacity = 10
Output: [10, [1,3]] (items at indices 1 and 3)
```

<details>
<summary><strong>Hints</strong></summary>

1. dp[i][c] = max value with first i items and capacity c
2. Either include item i or not
3. Track choices for reconstruction

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def knapsackProblem(items, capacity):
    """
    Time Complexity: O(n * c)
    Space Complexity: O(n * c)
    """
    n = len(items)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        value, weight = items[i-1]
        for c in range(capacity + 1):
            if weight > c:
                dp[i][c] = dp[i-1][c]
            else:
                dp[i][c] = max(dp[i-1][c], value + dp[i-1][c-weight])

    # Reconstruct
    selected = []
    c = capacity
    for i in range(n, 0, -1):
        if dp[i][c] != dp[i-1][c]:
            selected.append(i-1)
            c -= items[i-1][1]

    return [dp[n][capacity], selected[::-1]]

# Test
items = [[1,2], [4,3], [5,6], [6,7]]
print(knapsackProblem(items, 10))  # [10, [1, 3]]
```

```go
package main

import "fmt"

func knapsackProblem(items [][]int, capacity int) (int, []int) {
    n := len(items)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, capacity+1)
    }

    for i := 1; i <= n; i++ {
        value, weight := items[i-1][0], items[i-1][1]
        for c := 0; c <= capacity; c++ {
            if weight > c {
                dp[i][c] = dp[i-1][c]
            } else {
                dp[i][c] = max(dp[i-1][c], value+dp[i-1][c-weight])
            }
        }
    }

    // Reconstruct
    selected := []int{}
    c := capacity
    for i := n; i > 0; i-- {
        if dp[i][c] != dp[i-1][c] {
            selected = append([]int{i - 1}, selected...)
            c -= items[i-1][1]
        }
    }

    return dp[n][capacity], selected
}

func max(a, b int) int {
    if a > b { return a }
    return b
}

func main() {
    items := [][]int{{1, 2}, {4, 3}, {5, 6}, {6, 7}}
    value, selected := knapsackProblem(items, 10)
    fmt.Println(value, selected) // 10 [1 3]
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **0/1 Knapsack** - Classic version
2. **Unbounded Knapsack** - Unlimited items
3. **Partition Equal Subset Sum** - Subset sum variant

</details>

---

### 10-15. More Hard/Very Hard Problems

<details>
<summary><strong>Disk Stacking</strong></summary>

Stack disks where each must be strictly smaller in all dimensions.

```python
def diskStacking(disks):
    """Sort by height, then LIS-style DP"""
    disks.sort(key=lambda x: x[2])  # Sort by height
    dp = [d[2] for d in disks]  # Heights
    prev = [None] * len(disks)

    max_idx = 0
    for i in range(1, len(disks)):
        for j in range(i):
            if canStack(disks[j], disks[i]):
                if dp[j] + disks[i][2] > dp[i]:
                    dp[i] = dp[j] + disks[i][2]
                    prev[i] = j
        if dp[i] > dp[max_idx]:
            max_idx = i

    # Reconstruct
    result = []
    while max_idx is not None:
        result.append(disks[max_idx])
        max_idx = prev[max_idx]
    return result[::-1]

def canStack(below, above):
    return below[0] < above[0] and below[1] < above[1] and below[2] < above[2]
```

</details>

<details>
<summary><strong>Numbers In Pi</strong></summary>

Minimum spaces to split Pi digits into dictionary words.

```python
def numbersInPi(pi, numbers):
    numbersSet = set(numbers)
    cache = {}

    def minSpaces(idx):
        if idx == len(pi):
            return -1  # No space after last
        if idx in cache:
            return cache[idx]

        minCount = float('inf')
        for i in range(idx, len(pi)):
            prefix = pi[idx:i+1]
            if prefix in numbersSet:
                spacesAfter = minSpaces(i + 1)
                if spacesAfter != float('inf'):
                    minCount = min(minCount, spacesAfter + 1)

        cache[idx] = minCount
        return minCount

    result = minSpaces(0)
    return result if result != float('inf') else -1
```

</details>

<details>
<summary><strong>Longest Increasing Subsequence O(n log n)</strong></summary>

```python
import bisect

def longestIncreasingSubsequence(array):
    """
    Time: O(n log n)
    Space: O(n)
    """
    if not array:
        return []

    # tails[i] = smallest tail of LIS of length i+1
    tails = []
    prev = [-1] * len(array)
    indices = []

    for i, num in enumerate(array):
        pos = bisect.bisect_left(tails, num)

        if pos == len(tails):
            tails.append(num)
            indices.append(i)
        else:
            tails[pos] = num
            indices[pos] = i

        prev[i] = indices[pos - 1] if pos > 0 else -1

    # Reconstruct
    result = []
    idx = indices[-1]
    while idx != -1:
        result.append(array[idx])
        idx = prev[idx]
    return result[::-1]
```

</details>

---

## Practice Tips

### DP Identification Checklist
- [ ] Can the problem be broken into subproblems?
- [ ] Are there overlapping subproblems?
- [ ] Does optimal solution use optimal subproblem solutions?
- [ ] Can you define a clear state and recurrence?

### Common Transitions
| Pattern | Transition |
|---------|------------|
| Linear | dp[i] depends on dp[i-1], dp[i-2], etc. |
| 2D Grid | dp[i][j] depends on dp[i-1][j], dp[i][j-1] |
| LCS/Edit | dp[i][j] depends on dp[i-1][j-1], dp[i-1][j], dp[i][j-1] |
| Knapsack | dp[i][w] depends on dp[i-1][w], dp[i-1][w-weight] |

### Space Optimization
- Often can reduce from O(n²) to O(n) or O(n) to O(1)
- Keep only rows/states needed for next computation
