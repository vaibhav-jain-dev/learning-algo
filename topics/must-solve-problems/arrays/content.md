# Arrays

## Overview

Arrays are one of the most fundamental data structures in computer science. They store elements in contiguous memory locations, allowing O(1) access by index. Mastering array problems is essential as they form the basis for understanding more complex data structures.

## Key Concepts & Terminology

### Core Concepts
- **Index**: Position of an element (0-based in most languages)
- **Contiguous Memory**: Elements stored sequentially
- **Random Access**: O(1) access to any element by index
- **Fixed Size** (in some languages) vs **Dynamic Arrays** (like Python lists)

### Common Techniques
| Technique | When to Use | Time Complexity |
|-----------|-------------|-----------------|
| Two Pointers | Sorted arrays, pair finding | O(n) |
| Sliding Window | Contiguous subarrays | O(n) |
| Prefix Sum | Range sum queries | O(n) preprocessing, O(1) query |
| Hash Map | Finding pairs, counting | O(n) |
| Binary Search | Sorted arrays | O(log n) |
| Kadane's Algorithm | Maximum subarray | O(n) |

### Boundary Conditions to Check
1. **Empty array**: `len(arr) == 0`
2. **Single element**: `len(arr) == 1`
3. **Duplicate elements**: How to handle?
4. **Negative numbers**: Affects min/max logic
5. **Integer overflow**: Large sums may overflow
6. **Out of bounds**: Always validate indices

### Time & Space Complexity Patterns
- **Brute Force**: Usually O(n²) or O(n³)
- **Optimized with Hash Map**: Usually O(n) time, O(n) space
- **Two Pointers on Sorted Array**: O(n log n) for sort + O(n) for traversal
- **In-place modification**: O(1) extra space

---

## Problems

### 1. Validate Subsequence

**Difficulty:** Easy

**Problem Statement:**
Given two non-empty arrays of integers, determine whether the second array is a subsequence of the first one.

A subsequence maintains the relative order but not necessarily contiguous.

**Example:**
```
Input: array = [5, 1, 22, 25, 6, -1, 8, 10], sequence = [1, 6, -1, 10]
Output: true
```

<details>
<summary><strong>Hints</strong></summary>

1. Use two pointers - one for array, one for sequence
2. Move sequence pointer only when you find a match
3. If sequence pointer reaches the end, it's a valid subsequence

</details>

<details>
<summary><strong>Solution</strong></summary>

**Approach:** Two Pointers

```python
def isValidSubsequence(array, sequence):
    """
    Time Complexity: O(n) where n is length of array
    Space Complexity: O(1)
    """
    seq_idx = 0

    for value in array:
        if seq_idx == len(sequence):
            break
        if value == sequence[seq_idx]:
            seq_idx += 1

    return seq_idx == len(sequence)

# Test
array = [5, 1, 22, 25, 6, -1, 8, 10]
sequence = [1, 6, -1, 10]
print(isValidSubsequence(array, sequence))  # True
```

```go
package main

import "fmt"

func isValidSubsequence(array []int, sequence []int) bool {
    seqIdx := 0
    for _, value := range array {
        if seqIdx == len(sequence) {
            break
        }
        if value == sequence[seqIdx] {
            seqIdx++
        }
    }
    return seqIdx == len(sequence)
}

func main() {
    array := []int{5, 1, 22, 25, 6, -1, 8, 10}
    sequence := []int{1, 6, -1, 10}
    fmt.Println(isValidSubsequence(array, sequence)) // true
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Is Subsequence (LeetCode 392)** - Same problem with strings
2. **Number of Matching Subsequences** - Count how many words are subsequences
3. **Longest Common Subsequence** - Find the longest subsequence common to both

</details>

---

### 2. Two Number Sum

**Difficulty:** Easy

**Problem Statement:**
Given an array of distinct integers and a target sum, return the two numbers that add up to the target. If no such pair exists, return an empty array.

**Example:**
```
Input: array = [3, 5, -4, 8, 11, 1, -1, 6], targetSum = 10
Output: [-1, 11] (order doesn't matter)
```

<details>
<summary><strong>Hints</strong></summary>

1. For each number x, you need to find (targetSum - x)
2. Use a hash set for O(1) lookups
3. Or sort and use two pointers

</details>

<details>
<summary><strong>Solution</strong></summary>

**Approach 1:** Hash Set (Optimal)

```python
def twoNumberSum(array, targetSum):
    """
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    seen = set()

    for num in array:
        complement = targetSum - num
        if complement in seen:
            return [complement, num]
        seen.add(num)

    return []

# Test
array = [3, 5, -4, 8, 11, 1, -1, 6]
print(twoNumberSum(array, 10))  # [-1, 11]
```

**Approach 2:** Two Pointers (after sorting)

```python
def twoNumberSumSorted(array, targetSum):
    """
    Time Complexity: O(n log n)
    Space Complexity: O(1) if sorting in-place
    """
    array.sort()
    left, right = 0, len(array) - 1

    while left < right:
        current_sum = array[left] + array[right]
        if current_sum == targetSum:
            return [array[left], array[right]]
        elif current_sum < targetSum:
            left += 1
        else:
            right -= 1

    return []
```

```go
package main

import "fmt"

func twoNumberSum(array []int, targetSum int) []int {
    seen := make(map[int]bool)

    for _, num := range array {
        complement := targetSum - num
        if seen[complement] {
            return []int{complement, num}
        }
        seen[num] = true
    }

    return []int{}
}

func main() {
    array := []int{3, 5, -4, 8, 11, 1, -1, 6}
    fmt.Println(twoNumberSum(array, 10)) // [-1 11]
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Three Sum** - Find triplets that sum to target
2. **Two Sum II - Sorted Array** - Array is already sorted
3. **Two Sum Less Than K** - Find pair with max sum less than K

</details>

---

### 3. Sorted Squared Array

**Difficulty:** Easy

**Problem Statement:**
Given a sorted array of integers, return a new array containing the squares of each number, also in sorted order.

**Example:**
```
Input: array = [-7, -3, 1, 9, 22, 30]
Output: [1, 9, 49, 81, 484, 900]
```

<details>
<summary><strong>Hints</strong></summary>

1. Squaring can change the order (negative numbers become positive)
2. Largest absolute values are at the ends
3. Use two pointers starting from both ends

</details>

<details>
<summary><strong>Solution</strong></summary>

**Approach:** Two Pointers from Ends

```python
def sortedSquaredArray(array):
    """
    Time Complexity: O(n)
    Space Complexity: O(n) for result array
    """
    n = len(array)
    result = [0] * n
    left, right = 0, n - 1

    for i in range(n - 1, -1, -1):
        if abs(array[left]) > abs(array[right]):
            result[i] = array[left] ** 2
            left += 1
        else:
            result[i] = array[right] ** 2
            right -= 1

    return result

# Test
array = [-7, -3, 1, 9, 22, 30]
print(sortedSquaredArray(array))  # [1, 9, 49, 81, 484, 900]
```

```go
package main

import "fmt"

func sortedSquaredArray(array []int) []int {
    n := len(array)
    result := make([]int, n)
    left, right := 0, n-1

    for i := n - 1; i >= 0; i-- {
        leftVal := array[left] * array[left]
        rightVal := array[right] * array[right]

        if leftVal > rightVal {
            result[i] = leftVal
            left++
        } else {
            result[i] = rightVal
            right--
        }
    }

    return result
}

func main() {
    array := []int{-7, -3, 1, 9, 22, 30}
    fmt.Println(sortedSquaredArray(array)) // [1 9 49 81 484 900]
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Merge Sorted Arrays** - Similar two-pointer technique
2. **Sort Array by Parity** - Rearrange elements while maintaining order
3. **Squares of a Sorted Array (LeetCode 977)** - Identical problem

</details>

---

### 4. Tournament Winner

**Difficulty:** Easy

**Problem Statement:**
Given an array of pairs representing teams that competed against each other and an array containing results (0 = away team wins, 1 = home team wins), return the team with the most points. A win gives 3 points.

**Example:**
```
Input:
competitions = [["HTML", "C#"], ["C#", "Python"], ["Python", "HTML"]]
results = [0, 0, 1]
Output: "Python"
```

<details>
<summary><strong>Hints</strong></summary>

1. Use a hash map to track points for each team
2. Iterate through competitions and results simultaneously
3. Winner gets 3 points

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def tournamentWinner(competitions, results):
    """
    Time Complexity: O(n) where n is number of competitions
    Space Complexity: O(k) where k is number of teams
    """
    HOME_TEAM_WON = 1
    scores = {}
    best_team = ""
    best_score = 0

    for i, competition in enumerate(competitions):
        home_team, away_team = competition
        winner = home_team if results[i] == HOME_TEAM_WON else away_team

        scores[winner] = scores.get(winner, 0) + 3

        if scores[winner] > best_score:
            best_score = scores[winner]
            best_team = winner

    return best_team

# Test
competitions = [["HTML", "C#"], ["C#", "Python"], ["Python", "HTML"]]
results = [0, 0, 1]
print(tournamentWinner(competitions, results))  # Python
```

```go
package main

import "fmt"

func tournamentWinner(competitions [][]string, results []int) string {
    scores := make(map[string]int)
    bestTeam := ""
    bestScore := 0

    for i, competition := range competitions {
        homeTeam, awayTeam := competition[0], competition[1]
        winner := awayTeam
        if results[i] == 1 {
            winner = homeTeam
        }

        scores[winner] += 3

        if scores[winner] > bestScore {
            bestScore = scores[winner]
            bestTeam = winner
        }
    }

    return bestTeam
}

func main() {
    competitions := [][]string{{"HTML", "C#"}, {"C#", "Python"}, {"Python", "HTML"}}
    results := []int{0, 0, 1}
    fmt.Println(tournamentWinner(competitions, results)) // Python
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Design Leaderboard** - Track and update scores dynamically
2. **Rank Teams by Votes** - Similar ranking with multiple criteria
3. **Find Winner on a Tic Tac Toe Game** - Determine game winner

</details>

---

### 5. Non-Constructible Change

**Difficulty:** Medium

**Problem Statement:**
Given an array of positive integers representing coin values, return the minimum amount of change that you cannot create.

**Example:**
```
Input: coins = [5, 7, 1, 1, 2, 3, 22]
Output: 20
```

<details>
<summary><strong>Hints</strong></summary>

1. Sort the coins first
2. If coins can create change 1 to N, a new coin C can extend to N+C only if C <= N+1
3. Track the maximum change you can create

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def nonConstructibleChange(coins):
    """
    Time Complexity: O(n log n) for sorting
    Space Complexity: O(1) or O(n) depending on sort

    Key insight: If we can create change 1..N and next coin is > N+1,
    then we cannot create N+1
    """
    coins.sort()
    current_change = 0

    for coin in coins:
        if coin > current_change + 1:
            return current_change + 1
        current_change += coin

    return current_change + 1

# Test
coins = [5, 7, 1, 1, 2, 3, 22]
print(nonConstructibleChange(coins))  # 20
```

```go
package main

import (
    "fmt"
    "sort"
)

func nonConstructibleChange(coins []int) int {
    sort.Ints(coins)
    currentChange := 0

    for _, coin := range coins {
        if coin > currentChange+1 {
            return currentChange + 1
        }
        currentChange += coin
    }

    return currentChange + 1
}

func main() {
    coins := []int{5, 7, 1, 1, 2, 3, 22}
    fmt.Println(nonConstructibleChange(coins)) // 20
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Coin Change** - Minimum coins to make amount
2. **Coin Change 2** - Number of ways to make amount
3. **Maximum Number of Consecutive Values** - Similar greedy approach

</details>

---

### 6. Three Number Sum

**Difficulty:** Medium

**Problem Statement:**
Given an array of distinct integers and a target sum, find all triplets that sum to the target. Return triplets in ascending order.

**Example:**
```
Input: array = [12, 3, 1, 2, -6, 5, -8, 6], targetSum = 0
Output: [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]
```

<details>
<summary><strong>Hints</strong></summary>

1. Sort the array first
2. Fix one element and use two pointers for the other two
3. Skip duplicates to avoid repeated triplets

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def threeNumberSum(array, targetSum):
    """
    Time Complexity: O(n²)
    Space Complexity: O(n) for output
    """
    array.sort()
    triplets = []

    for i in range(len(array) - 2):
        left = i + 1
        right = len(array) - 1

        while left < right:
            current_sum = array[i] + array[left] + array[right]

            if current_sum == targetSum:
                triplets.append([array[i], array[left], array[right]])
                left += 1
                right -= 1
            elif current_sum < targetSum:
                left += 1
            else:
                right -= 1

    return triplets

# Test
array = [12, 3, 1, 2, -6, 5, -8, 6]
print(threeNumberSum(array, 0))
# [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]
```

```go
package main

import (
    "fmt"
    "sort"
)

func threeNumberSum(array []int, targetSum int) [][]int {
    sort.Ints(array)
    triplets := [][]int{}

    for i := 0; i < len(array)-2; i++ {
        left := i + 1
        right := len(array) - 1

        for left < right {
            currentSum := array[i] + array[left] + array[right]

            if currentSum == targetSum {
                triplets = append(triplets, []int{array[i], array[left], array[right]})
                left++
                right--
            } else if currentSum < targetSum {
                left++
            } else {
                right--
            }
        }
    }

    return triplets
}

func main() {
    array := []int{12, 3, 1, 2, -6, 5, -8, 6}
    fmt.Println(threeNumberSum(array, 0))
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Four Sum** - Find quadruplets summing to target
2. **3Sum Closest** - Find triplet with sum closest to target
3. **3Sum Smaller** - Count triplets with sum less than target

</details>

---

### 7. Smallest Difference

**Difficulty:** Medium

**Problem Statement:**
Given two non-empty arrays of integers, find the pair of numbers (one from each array) whose absolute difference is closest to zero.

**Example:**
```
Input:
arrayOne = [-1, 5, 10, 20, 28, 3]
arrayTwo = [26, 134, 135, 15, 17]
Output: [28, 26]
```

<details>
<summary><strong>Hints</strong></summary>

1. Sort both arrays
2. Use two pointers
3. Move the pointer pointing to the smaller value

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def smallestDifference(arrayOne, arrayTwo):
    """
    Time Complexity: O(n log n + m log m)
    Space Complexity: O(1)
    """
    arrayOne.sort()
    arrayTwo.sort()

    i, j = 0, 0
    smallest = float('inf')
    result = []

    while i < len(arrayOne) and j < len(arrayTwo):
        first = arrayOne[i]
        second = arrayTwo[j]
        current_diff = abs(first - second)

        if current_diff < smallest:
            smallest = current_diff
            result = [first, second]

        if first < second:
            i += 1
        elif first > second:
            j += 1
        else:
            return [first, second]  # Difference is 0

    return result

# Test
arrayOne = [-1, 5, 10, 20, 28, 3]
arrayTwo = [26, 134, 135, 15, 17]
print(smallestDifference(arrayOne, arrayTwo))  # [28, 26]
```

```go
package main

import (
    "fmt"
    "math"
    "sort"
)

func smallestDifference(arrayOne, arrayTwo []int) []int {
    sort.Ints(arrayOne)
    sort.Ints(arrayTwo)

    i, j := 0, 0
    smallest := math.MaxInt64
    result := []int{0, 0}

    for i < len(arrayOne) && j < len(arrayTwo) {
        first := arrayOne[i]
        second := arrayTwo[j]

        diff := int(math.Abs(float64(first - second)))
        if diff < smallest {
            smallest = diff
            result = []int{first, second}
        }

        if first < second {
            i++
        } else if first > second {
            j++
        } else {
            return []int{first, second}
        }
    }

    return result
}

func main() {
    arrayOne := []int{-1, 5, 10, 20, 28, 3}
    arrayTwo := []int{26, 134, 135, 15, 17}
    fmt.Println(smallestDifference(arrayOne, arrayTwo)) // [28 26]
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Find K Closest Elements** - Find k closest numbers to target
2. **Minimum Absolute Difference** - Find all pairs with minimum difference
3. **K-diff Pairs in an Array** - Find pairs with exact difference k

</details>

---

### 8. Move Element To End

**Difficulty:** Medium

**Problem Statement:**
Given an array of integers and a target integer, move all instances of the target to the end of the array in-place.

**Example:**
```
Input: array = [2, 1, 2, 2, 2, 3, 4, 2], toMove = 2
Output: [4, 1, 3, 2, 2, 2, 2, 2] (order of non-target elements can vary)
```

<details>
<summary><strong>Hints</strong></summary>

1. Use two pointers - one from start, one from end
2. Swap elements when left finds toMove and right finds non-toMove
3. Be careful with the termination condition

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def moveElementToEnd(array, toMove):
    """
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    left = 0
    right = len(array) - 1

    while left < right:
        # Move right pointer until we find a non-target element
        while left < right and array[right] == toMove:
            right -= 1

        # If left points to target, swap with right
        if array[left] == toMove:
            array[left], array[right] = array[right], array[left]

        left += 1

    return array

# Test
array = [2, 1, 2, 2, 2, 3, 4, 2]
print(moveElementToEnd(array, 2))
```

```go
package main

import "fmt"

func moveElementToEnd(array []int, toMove int) []int {
    left := 0
    right := len(array) - 1

    for left < right {
        for left < right && array[right] == toMove {
            right--
        }

        if array[left] == toMove {
            array[left], array[right] = array[right], array[left]
        }

        left++
    }

    return array
}

func main() {
    array := []int{2, 1, 2, 2, 2, 3, 4, 2}
    fmt.Println(moveElementToEnd(array, 2))
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Move Zeroes** - Move all zeros to end
2. **Remove Element** - Remove all instances and return new length
3. **Sort Colors (Dutch National Flag)** - Three-way partition

</details>

---

### 9. Spiral Traverse

**Difficulty:** Medium

**Problem Statement:**
Given a 2D array, return all elements in spiral order (clockwise from outside to inside).

**Example:**
```
Input:
array = [
  [1,  2,  3,  4],
  [12, 13, 14, 5],
  [11, 16, 15, 6],
  [10, 9,  8,  7]
]
Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
```

<details>
<summary><strong>Hints</strong></summary>

1. Track four boundaries: top, bottom, left, right
2. Traverse in order: right, down, left, up
3. Shrink boundaries after each direction

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def spiralTraverse(array):
    """
    Time Complexity: O(n) where n is total elements
    Space Complexity: O(n) for output
    """
    result = []
    if not array:
        return result

    top, bottom = 0, len(array) - 1
    left, right = 0, len(array[0]) - 1

    while top <= bottom and left <= right:
        # Traverse right
        for col in range(left, right + 1):
            result.append(array[top][col])
        top += 1

        # Traverse down
        for row in range(top, bottom + 1):
            result.append(array[row][right])
        right -= 1

        # Traverse left (if still valid)
        if top <= bottom:
            for col in range(right, left - 1, -1):
                result.append(array[bottom][col])
            bottom -= 1

        # Traverse up (if still valid)
        if left <= right:
            for row in range(bottom, top - 1, -1):
                result.append(array[row][left])
            left += 1

    return result

# Test
array = [
    [1,  2,  3,  4],
    [12, 13, 14, 5],
    [11, 16, 15, 6],
    [10, 9,  8,  7]
]
print(spiralTraverse(array))
```

```go
package main

import "fmt"

func spiralTraverse(array [][]int) []int {
    result := []int{}
    if len(array) == 0 {
        return result
    }

    top, bottom := 0, len(array)-1
    left, right := 0, len(array[0])-1

    for top <= bottom && left <= right {
        // Traverse right
        for col := left; col <= right; col++ {
            result = append(result, array[top][col])
        }
        top++

        // Traverse down
        for row := top; row <= bottom; row++ {
            result = append(result, array[row][right])
        }
        right--

        // Traverse left
        if top <= bottom {
            for col := right; col >= left; col-- {
                result = append(result, array[bottom][col])
            }
            bottom--
        }

        // Traverse up
        if left <= right {
            for row := bottom; row >= top; row-- {
                result = append(result, array[row][left])
            }
            left++
        }
    }

    return result
}

func main() {
    array := [][]int{
        {1, 2, 3, 4},
        {12, 13, 14, 5},
        {11, 16, 15, 6},
        {10, 9, 8, 7},
    }
    fmt.Println(spiralTraverse(array))
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Spiral Matrix II** - Fill matrix in spiral order with 1 to n²
2. **Diagonal Traverse** - Traverse matrix diagonally
3. **Rotate Image** - Rotate matrix 90 degrees

</details>

---

### 10. Longest Peak

**Difficulty:** Medium

**Problem Statement:**
Find the length of the longest peak in the array. A peak is defined as adjacent integers that strictly increase until they reach a tip and then strictly decrease.

**Example:**
```
Input: array = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3]
Output: 6 (subarray [0, 10, 6, 5, -1, -3])
```

<details>
<summary><strong>Hints</strong></summary>

1. Identify peak tips (greater than both neighbors)
2. Expand left and right from each peak
3. Track the maximum length found

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def longestPeak(array):
    """
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    longest = 0
    i = 1

    while i < len(array) - 1:
        # Check if current position is a peak
        is_peak = array[i] > array[i-1] and array[i] > array[i+1]

        if not is_peak:
            i += 1
            continue

        # Expand left
        left = i - 2
        while left >= 0 and array[left] < array[left + 1]:
            left -= 1

        # Expand right
        right = i + 2
        while right < len(array) and array[right] < array[right - 1]:
            right += 1

        # Calculate peak length
        current_length = right - left - 1
        longest = max(longest, current_length)

        # Skip to end of current peak
        i = right

    return longest

# Test
array = [1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3]
print(longestPeak(array))  # 6
```

```go
package main

import "fmt"

func longestPeak(array []int) int {
    longest := 0
    i := 1

    for i < len(array)-1 {
        isPeak := array[i] > array[i-1] && array[i] > array[i+1]

        if !isPeak {
            i++
            continue
        }

        // Expand left
        left := i - 2
        for left >= 0 && array[left] < array[left+1] {
            left--
        }

        // Expand right
        right := i + 2
        for right < len(array) && array[right] < array[right-1] {
            right++
        }

        currentLength := right - left - 1
        if currentLength > longest {
            longest = currentLength
        }

        i = right
    }

    return longest
}

func main() {
    array := []int{1, 2, 3, 3, 4, 0, 10, 6, 5, -1, -3, 2, 3}
    fmt.Println(longestPeak(array)) // 6
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Longest Mountain in Array** - Similar peak finding
2. **Peak Index in Mountain Array** - Find single peak
3. **Find Peak Element** - Find any peak in O(log n)

</details>

---

### 11. Array Of Products

**Difficulty:** Medium

**Problem Statement:**
Given an array of integers, return an array where each element is the product of all other elements (without using division).

**Example:**
```
Input: array = [5, 1, 4, 2]
Output: [8, 40, 10, 20]
(8 = 1*4*2, 40 = 5*4*2, 10 = 5*1*2, 20 = 5*1*4)
```

<details>
<summary><strong>Hints</strong></summary>

1. For each position, result = product of left * product of right
2. First pass: calculate running product from left
3. Second pass: calculate running product from right and multiply

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def arrayOfProducts(array):
    """
    Time Complexity: O(n)
    Space Complexity: O(n) for output
    """
    n = len(array)
    result = [1] * n

    # Left products
    left_product = 1
    for i in range(n):
        result[i] = left_product
        left_product *= array[i]

    # Right products (multiply with existing)
    right_product = 1
    for i in range(n - 1, -1, -1):
        result[i] *= right_product
        right_product *= array[i]

    return result

# Test
array = [5, 1, 4, 2]
print(arrayOfProducts(array))  # [8, 40, 10, 20]
```

```go
package main

import "fmt"

func arrayOfProducts(array []int) []int {
    n := len(array)
    result := make([]int, n)

    // Initialize with 1s
    for i := range result {
        result[i] = 1
    }

    // Left products
    leftProduct := 1
    for i := 0; i < n; i++ {
        result[i] = leftProduct
        leftProduct *= array[i]
    }

    // Right products
    rightProduct := 1
    for i := n - 1; i >= 0; i-- {
        result[i] *= rightProduct
        rightProduct *= array[i]
    }

    return result
}

func main() {
    array := []int{5, 1, 4, 2}
    fmt.Println(arrayOfProducts(array)) // [8 40 10 20]
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Product of Array Except Self** - Identical problem on LeetCode
2. **Trapping Rain Water** - Similar left/right pass technique
3. **Candy** - Two-pass approach with running values

</details>

---

### 12. First Duplicate Value

**Difficulty:** Medium

**Problem Statement:**
Given an array of integers between 1 and n (inclusive) where n is the array length, return the first duplicate value. If no duplicate exists, return -1.

**Example:**
```
Input: array = [2, 1, 5, 2, 3, 3, 4]
Output: 2 (first duplicate encountered)
```

<details>
<summary><strong>Hints</strong></summary>

1. Values are in range [1, n], same as indices [0, n-1]
2. Use the array itself as a hash set
3. Mark visited by negating at index (value - 1)

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def firstDuplicateValue(array):
    """
    Time Complexity: O(n)
    Space Complexity: O(1) - modifies input array
    """
    for value in array:
        abs_value = abs(value)
        index = abs_value - 1

        if array[index] < 0:
            return abs_value

        array[index] *= -1

    return -1

# Test
array = [2, 1, 5, 2, 3, 3, 4]
print(firstDuplicateValue(array))  # 2
```

```go
package main

import "fmt"

func firstDuplicateValue(array []int) int {
    for _, value := range array {
        absValue := value
        if absValue < 0 {
            absValue = -absValue
        }

        index := absValue - 1

        if array[index] < 0 {
            return absValue
        }

        array[index] *= -1
    }

    return -1
}

func main() {
    array := []int{2, 1, 5, 2, 3, 3, 4}
    fmt.Println(firstDuplicateValue(array)) // 2
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Find the Duplicate Number** - One duplicate, O(1) space without modifying
2. **Find All Duplicates in an Array** - Return all duplicates
3. **Set Mismatch** - Find duplicate and missing number

</details>

---

### 13. Merge Overlapping Intervals

**Difficulty:** Medium

**Problem Statement:**
Given an array of intervals, merge all overlapping intervals and return the non-overlapping intervals.

**Example:**
```
Input: intervals = [[1, 2], [3, 5], [4, 7], [6, 8], [9, 10]]
Output: [[1, 2], [3, 8], [9, 10]]
```

<details>
<summary><strong>Hints</strong></summary>

1. Sort intervals by start time
2. Compare each interval's start with previous interval's end
3. If overlapping, merge by extending the end

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def mergeOverlappingIntervals(intervals):
    """
    Time Complexity: O(n log n) for sorting
    Space Complexity: O(n) for output
    """
    if not intervals:
        return []

    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    merged = [intervals[0]]

    for current in intervals[1:]:
        last = merged[-1]

        if current[0] <= last[1]:  # Overlapping
            last[1] = max(last[1], current[1])
        else:
            merged.append(current)

    return merged

# Test
intervals = [[1, 2], [3, 5], [4, 7], [6, 8], [9, 10]]
print(mergeOverlappingIntervals(intervals))  # [[1, 2], [3, 8], [9, 10]]
```

```go
package main

import (
    "fmt"
    "sort"
)

func mergeOverlappingIntervals(intervals [][]int) [][]int {
    if len(intervals) == 0 {
        return [][]int{}
    }

    // Sort by start time
    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][0] < intervals[j][0]
    })

    merged := [][]int{intervals[0]}

    for i := 1; i < len(intervals); i++ {
        current := intervals[i]
        last := merged[len(merged)-1]

        if current[0] <= last[1] { // Overlapping
            if current[1] > last[1] {
                last[1] = current[1]
            }
        } else {
            merged = append(merged, current)
        }
    }

    return merged
}

func main() {
    intervals := [][]int{{1, 2}, {3, 5}, {4, 7}, {6, 8}, {9, 10}}
    fmt.Println(mergeOverlappingIntervals(intervals))
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Insert Interval** - Insert and merge a new interval
2. **Meeting Rooms II** - Minimum meeting rooms required
3. **Non-overlapping Intervals** - Minimum removals for non-overlap

</details>

---

### 14. Zero Sum Subarray

**Difficulty:** Medium

**Problem Statement:**
Determine if there exists a contiguous subarray that sums to zero.

**Example:**
```
Input: nums = [4, 2, -3, 1, 6]
Output: true (subarray [2, -3, 1] sums to 0)

Input: nums = [1, 2, 3]
Output: false
```

<details>
<summary><strong>Hints</strong></summary>

1. Use prefix sum technique
2. If same prefix sum appears twice, subarray between them sums to zero
3. Also check if any prefix sum equals zero

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def zeroSumSubarray(nums):
    """
    Time Complexity: O(n)
    Space Complexity: O(n)

    Key insight: If prefix_sum[i] == prefix_sum[j] where j > i,
    then sum(nums[i+1:j+1]) = 0
    """
    seen = set([0])  # Include 0 to handle prefix sum = 0
    prefix_sum = 0

    for num in nums:
        prefix_sum += num

        if prefix_sum in seen:
            return True

        seen.add(prefix_sum)

    return False

# Test
print(zeroSumSubarray([4, 2, -3, 1, 6]))  # True
print(zeroSumSubarray([1, 2, 3]))  # False
```

```go
package main

import "fmt"

func zeroSumSubarray(nums []int) bool {
    seen := make(map[int]bool)
    seen[0] = true
    prefixSum := 0

    for _, num := range nums {
        prefixSum += num

        if seen[prefixSum] {
            return true
        }

        seen[prefixSum] = true
    }

    return false
}

func main() {
    fmt.Println(zeroSumSubarray([]int{4, 2, -3, 1, 6})) // true
    fmt.Println(zeroSumSubarray([]int{1, 2, 3}))       // false
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Subarray Sum Equals K** - Count subarrays with sum k
2. **Continuous Subarray Sum** - Sum divisible by k
3. **Maximum Size Subarray Sum Equals k** - Longest subarray with sum k

</details>

---

## Practice Tips

### Problem-Solving Framework

1. **Understand the Problem**
   - Read carefully, identify inputs/outputs
   - Ask clarifying questions
   - Consider edge cases

2. **Plan Your Approach**
   - Start with brute force
   - Identify patterns and optimizations
   - Consider time/space tradeoffs

3. **Implement**
   - Write clean, readable code
   - Handle edge cases
   - Use meaningful variable names

4. **Test**
   - Test with examples
   - Test edge cases
   - Consider large inputs

### Common Patterns Summary

| Pattern | Problems |
|---------|----------|
| Two Pointers | Sorted Squared Array, Smallest Difference, Move Element |
| Hash Map/Set | Two Sum, First Duplicate, Zero Sum Subarray |
| Sorting First | Three Sum, Merge Intervals, Non-Constructible Change |
| Prefix Sum | Zero Sum Subarray, Array of Products |
| In-place Modification | Move Element, First Duplicate |
| Multiple Passes | Array of Products, Spiral Traverse |
