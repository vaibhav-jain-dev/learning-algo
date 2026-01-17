# Recursion

## Overview

Recursion is a problem-solving technique where a function calls itself to solve smaller instances of the same problem. It's fundamental to many algorithms and data structures.

## Key Concepts & Terminology

### Core Components
- **Base Case**: Condition to stop recursion
- **Recursive Case**: Breaking problem into smaller subproblems
- **Call Stack**: Memory storing function calls

### Types of Recursion
| Type | Description |
|------|-------------|
| Direct | Function calls itself |
| Indirect | Function A calls B, B calls A |
| Tail | Recursive call is last operation |
| Tree | Multiple recursive calls per invocation |

### Recursion vs Iteration
| Aspect | Recursion | Iteration |
|--------|-----------|-----------|
| Readability | Often cleaner | Can be verbose |
| Space | O(n) stack | O(1) typically |
| Performance | Function call overhead | Generally faster |
| Risk | Stack overflow | None |

### Common Patterns
1. **Decrease and Conquer**: Reduce by 1 (factorial, Fibonacci)
2. **Divide and Conquer**: Split in half (merge sort, binary search)
3. **Backtracking**: Try all possibilities (permutations, sudoku)
4. **Dynamic Programming**: Memoize recursive solutions

### Tips for Writing Recursion
1. Define clear base case(s)
2. Ensure progress toward base case
3. Trust the recursive call
4. Consider memoization for overlapping subproblems

---

## Problems

### 1. Nth Fibonacci

**Difficulty:** Easy

**Problem Statement:**
Return the nth Fibonacci number (0-indexed).

**Example:**
```
F(0) = 0, F(1) = 1
F(n) = F(n-1) + F(n-2)

Input: n = 6
Output: 8 (0, 1, 1, 2, 3, 5, 8)
```

<details>
<summary><strong>Hints</strong></summary>

1. Base cases: F(0) = 0, F(1) = 1
2. Naive recursion is O(2^n), use memoization
3. Iterative is O(n) time, O(1) space

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
# Recursive with memoization
def getNthFib(n, memo={}):
    """
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    if n in memo:
        return memo[n]
    if n <= 1:
        return 0 if n == 0 else 1

    memo[n] = getNthFib(n - 1, memo) + getNthFib(n - 2, memo)
    return memo[n]

# Iterative (optimal)
def getNthFibIterative(n):
    """
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    if n <= 1:
        return 0 if n == 0 else 1

    prev2, prev1 = 0, 1
    for _ in range(2, n + 1):
        prev2, prev1 = prev1, prev2 + prev1

    return prev1

# Test
print(getNthFib(6))  # 8
print(getNthFibIterative(6))  # 8
```

```go
package main

import "fmt"

func getNthFib(n int) int {
    if n <= 1 {
        if n == 0 {
            return 0
        }
        return 1
    }

    prev2, prev1 := 0, 1
    for i := 2; i <= n; i++ {
        prev2, prev1 = prev1, prev2+prev1
    }

    return prev1
}

func main() {
    fmt.Println(getNthFib(6)) // 8
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Climbing Stairs** - Similar recurrence
2. **Tribonacci Number** - Three previous numbers
3. **House Robber** - DP on Fibonacci-like recurrence

</details>

---

### 2. Product Sum

**Difficulty:** Easy

**Problem Statement:**
Calculate the product sum of a nested array. Each element's depth is multiplied.

**Example:**
```
Input: [5, 2, [7, -1], 3, [6, [-13, 8], 4]]
Output: 12

Calculation:
5 + 2 + 2*(7-1) + 3 + 2*(6 + 3*(-13+8) + 4)
= 5 + 2 + 12 + 3 + 2*(6 - 15 + 4)
= 5 + 2 + 12 + 3 + 2*(-5)
= 12
```

<details>
<summary><strong>Hints</strong></summary>

1. Use depth parameter in recursion
2. If element is list, recurse with depth + 1
3. Multiply result by current depth

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def productSum(array, depth=1):
    """
    Time Complexity: O(n) where n is total elements
    Space Complexity: O(d) where d is max depth
    """
    total = 0

    for element in array:
        if isinstance(element, list):
            total += productSum(element, depth + 1)
        else:
            total += element

    return total * depth

# Test
array = [5, 2, [7, -1], 3, [6, [-13, 8], 4]]
print(productSum(array))  # 12
```

```go
package main

import "fmt"

func productSum(array []interface{}) int {
    return productSumHelper(array, 1)
}

func productSumHelper(array []interface{}, depth int) int {
    total := 0

    for _, element := range array {
        switch v := element.(type) {
        case int:
            total += v
        case []interface{}:
            total += productSumHelper(v, depth+1)
        }
    }

    return total * depth
}

func main() {
    array := []interface{}{5, 2, []interface{}{7, -1}, 3}
    fmt.Println(productSum(array))
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Nested List Weight Sum** - LeetCode version
2. **Nested List Weight Sum II** - Reversed weights
3. **Flatten Nested List Iterator** - Iterator on nested list

</details>

---

### 3. Permutations

**Difficulty:** Medium

**Problem Statement:**
Generate all permutations of an array.

**Example:**
```
Input: [1, 2, 3]
Output: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
```

<details>
<summary><strong>Hints</strong></summary>

1. For each position, try all remaining elements
2. Swap elements and recurse
3. Backtrack by swapping back

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def getPermutations(array):
    """
    Time Complexity: O(n! * n)
    Space Complexity: O(n! * n)
    """
    permutations = []
    if len(array) == 0:
        return permutations

    permutationsHelper(0, array, permutations)
    return permutations

def permutationsHelper(i, array, permutations):
    if i == len(array) - 1:
        permutations.append(array[:])
        return

    for j in range(i, len(array)):
        array[i], array[j] = array[j], array[i]
        permutationsHelper(i + 1, array, permutations)
        array[i], array[j] = array[j], array[i]  # Backtrack

# Alternative: Build permutation
def getPermutations2(array):
    result = []

    def backtrack(current, remaining):
        if not remaining:
            result.append(current[:])
            return

        for i in range(len(remaining)):
            current.append(remaining[i])
            backtrack(current, remaining[:i] + remaining[i+1:])
            current.pop()

    backtrack([], array)
    return result

# Test
print(getPermutations([1, 2, 3]))
```

```go
package main

import "fmt"

func getPermutations(array []int) [][]int {
    permutations := [][]int{}
    if len(array) == 0 {
        return permutations
    }

    permutationsHelper(0, array, &permutations)
    return permutations
}

func permutationsHelper(i int, array []int, permutations *[][]int) {
    if i == len(array)-1 {
        perm := make([]int, len(array))
        copy(perm, array)
        *permutations = append(*permutations, perm)
        return
    }

    for j := i; j < len(array); j++ {
        array[i], array[j] = array[j], array[i]
        permutationsHelper(i+1, array, permutations)
        array[i], array[j] = array[j], array[i]
    }
}

func main() {
    fmt.Println(getPermutations([]int{1, 2, 3}))
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Permutations II** - With duplicates
2. **Next Permutation** - Lexicographically next
3. **Permutation Sequence** - Kth permutation

</details>

---

### 4. Powerset

**Difficulty:** Medium

**Problem Statement:**
Generate all subsets (power set) of an array.

**Example:**
```
Input: [1, 2, 3]
Output: [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
```

<details>
<summary><strong>Hints</strong></summary>

1. Each element can be included or excluded
2. Iterative: for each element, add to all existing subsets
3. Recursive: branch for include/exclude

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def powerset(array):
    """
    Time Complexity: O(n * 2^n)
    Space Complexity: O(n * 2^n)
    """
    subsets = [[]]

    for element in array:
        # Add element to all existing subsets
        for i in range(len(subsets)):
            subsets.append(subsets[i] + [element])

    return subsets

# Recursive approach
def powersetRecursive(array, idx=None):
    if idx is None:
        idx = len(array) - 1

    if idx < 0:
        return [[]]

    subsets = powersetRecursive(array, idx - 1)
    element = array[idx]

    # Add element to all existing subsets
    new_subsets = []
    for subset in subsets:
        new_subsets.append(subset + [element])

    return subsets + new_subsets

# Test
print(powerset([1, 2, 3]))
```

```go
package main

import "fmt"

func powerset(array []int) [][]int {
    subsets := [][]int{{}}

    for _, element := range array {
        length := len(subsets)
        for i := 0; i < length; i++ {
            newSubset := make([]int, len(subsets[i])+1)
            copy(newSubset, subsets[i])
            newSubset[len(newSubset)-1] = element
            subsets = append(subsets, newSubset)
        }
    }

    return subsets
}

func main() {
    fmt.Println(powerset([]int{1, 2, 3}))
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Subsets II** - With duplicates
2. **Combination Sum** - Subsets summing to target
3. **Letter Combinations of Phone Number**

</details>

---

### 5. Phone Number Mnemonics

**Difficulty:** Medium

**Problem Statement:**
Generate all possible letter combinations for a phone number.

**Example:**
```
Input: "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]

Mapping: 2="abc", 3="def", 4="ghi", etc.
```

<details>
<summary><strong>Hints</strong></summary>

1. Map each digit to its letters
2. For each digit, try all possible letters
3. Backtracking to build combinations

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def phoneNumberMnemonics(phoneNumber):
    """
    Time Complexity: O(4^n * n)
    Space Complexity: O(4^n * n)
    """
    digit_to_letters = {
        '0': '0', '1': '1',
        '2': 'abc', '3': 'def',
        '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs',
        '8': 'tuv', '9': 'wxyz'
    }

    result = []
    current = [''] * len(phoneNumber)

    def backtrack(idx):
        if idx == len(phoneNumber):
            result.append(''.join(current))
            return

        digit = phoneNumber[idx]
        letters = digit_to_letters[digit]

        for letter in letters:
            current[idx] = letter
            backtrack(idx + 1)

    backtrack(0)
    return result

# Test
print(phoneNumberMnemonics("23"))
```

```go
package main

import "fmt"

var digitToLetters = map[byte]string{
    '0': "0", '1': "1",
    '2': "abc", '3': "def",
    '4': "ghi", '5': "jkl",
    '6': "mno", '7': "pqrs",
    '8': "tuv", '9': "wxyz",
}

func phoneNumberMnemonics(phoneNumber string) []string {
    result := []string{}
    current := make([]byte, len(phoneNumber))

    var backtrack func(idx int)
    backtrack = func(idx int) {
        if idx == len(phoneNumber) {
            result = append(result, string(current))
            return
        }

        digit := phoneNumber[idx]
        letters := digitToLetters[digit]

        for i := 0; i < len(letters); i++ {
            current[idx] = letters[i]
            backtrack(idx + 1)
        }
    }

    backtrack(0)
    return result
}

func main() {
    fmt.Println(phoneNumberMnemonics("23"))
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Letter Combinations of Phone Number** - LeetCode version
2. **Generate Parentheses** - Valid parentheses
3. **Combination Sum** - Numbers summing to target

</details>

---

### 6. Staircase Traversal

**Difficulty:** Medium

**Problem Statement:**
Count ways to climb n stairs taking 1 to maxSteps at a time.

**Example:**
```
Input: height = 4, maxSteps = 2
Output: 5

Ways: [1,1,1,1], [1,1,2], [1,2,1], [2,1,1], [2,2]
```

<details>
<summary><strong>Hints</strong></summary>

1. ways(n) = sum of ways(n-1) to ways(n-maxSteps)
2. Use memoization or tabulation
3. Optimize with sliding window

</details>

<details>
<summary><strong>Solution</strong></summary>

```python
def staircaseTraversal(height, maxSteps):
    """
    Time Complexity: O(height * maxSteps)
    Space Complexity: O(height)
    """
    # DP with sliding window
    if height <= 1:
        return 1

    ways = [0] * (height + 1)
    ways[0] = 1
    ways[1] = 1

    window_sum = ways[0] + ways[1]

    for i in range(2, height + 1):
        ways[i] = window_sum

        # Update window
        window_sum += ways[i]
        if i >= maxSteps:
            window_sum -= ways[i - maxSteps]

    return ways[height]

# Memoization approach
def staircaseTraversalMemo(height, maxSteps, memo={}):
    if height in memo:
        return memo[height]
    if height <= 1:
        return 1

    ways = 0
    for step in range(1, min(maxSteps, height) + 1):
        ways += staircaseTraversalMemo(height - step, maxSteps, memo)

    memo[height] = ways
    return ways

# Test
print(staircaseTraversal(4, 2))  # 5
```

```go
package main

import "fmt"

func staircaseTraversal(height, maxSteps int) int {
    if height <= 1 {
        return 1
    }

    ways := make([]int, height+1)
    ways[0] = 1
    ways[1] = 1

    windowSum := ways[0] + ways[1]

    for i := 2; i <= height; i++ {
        ways[i] = windowSum
        windowSum += ways[i]
        if i >= maxSteps {
            windowSum -= ways[i-maxSteps]
        }
    }

    return ways[height]
}

func main() {
    fmt.Println(staircaseTraversal(4, 2)) // 5
}
```

</details>

<details>
<summary><strong>Similar Problems</strong></summary>

1. **Climbing Stairs** - maxSteps = 2
2. **Min Cost Climbing Stairs** - With costs
3. **Decode Ways** - String decoding

</details>

---

### 7-11. More Medium/Hard Problems

<details>
<summary><strong>Blackjack Probability</strong></summary>

Calculate probability of busting in blackjack.

```python
def blackjackProbability(target, startingHand):
    """
    Probability of going over target starting with startingHand
    """
    memo = {}

    def calculate(current):
        if current > target:
            return 1.0
        if current + 4 >= target:  # Must stand
            return 0.0
        if current in memo:
            return memo[current]

        total_probability = 0.0
        for card in range(1, 11):
            total_probability += 0.1 * calculate(current + card)

        memo[current] = total_probability
        return total_probability

    return round(calculate(startingHand), 3)
```

</details>

<details>
<summary><strong>Solve Sudoku (Very Hard)</strong></summary>

Solve a Sudoku puzzle using backtracking.

```python
def solveSudoku(board):
    def isValid(board, row, col, num):
        # Check row
        if num in board[row]:
            return False
        # Check column
        for r in range(9):
            if board[r][col] == num:
                return False
        # Check 3x3 box
        boxRow, boxCol = 3 * (row // 3), 3 * (col // 3)
        for r in range(boxRow, boxRow + 3):
            for c in range(boxCol, boxCol + 3):
                if board[r][c] == num:
                    return False
        return True

    def solve(board):
        for row in range(9):
            for col in range(9):
                if board[row][col] == 0:
                    for num in range(1, 10):
                        if isValid(board, row, col, num):
                            board[row][col] = num
                            if solve(board):
                                return True
                            board[row][col] = 0
                    return False
        return True

    solve(board)
    return board
```

</details>

<details>
<summary><strong>Lowest Common Manager</strong></summary>

Find lowest manager who manages both employees.

```python
def getLowestCommonManager(topManager, reportOne, reportTwo):
    def getInfo(manager):
        numReports = 0
        lowestManager = None

        for report in manager.directReports:
            info = getInfo(report)
            if info['lowestManager']:
                return info
            numReports += info['numReports']

        if manager == reportOne or manager == reportTwo:
            numReports += 1

        if numReports == 2:
            lowestManager = manager

        return {'numReports': numReports, 'lowestManager': lowestManager}

    return getInfo(topManager)['lowestManager']
```

</details>

<details>
<summary><strong>Interweaving Strings</strong></summary>

Check if string3 is interleaving of string1 and string2.

```python
def interweavingStrings(one, two, three):
    if len(three) != len(one) + len(two):
        return False

    cache = [[None] * (len(two) + 1) for _ in range(len(one) + 1)]

    def check(i, j, k):
        if cache[i][j] is not None:
            return cache[i][j]

        if k == len(three):
            return True

        if i < len(one) and one[i] == three[k]:
            if check(i + 1, j, k + 1):
                cache[i][j] = True
                return True

        if j < len(two) and two[j] == three[k]:
            if check(i, j + 1, k + 1):
                cache[i][j] = True
                return True

        cache[i][j] = False
        return False

    return check(0, 0, 0)
```

</details>

---

## Practice Tips

### Recursion Checklist
- [ ] Identified base case(s)
- [ ] Recursive call moves toward base case
- [ ] Correct combination of subproblem results
- [ ] Considered memoization for overlapping subproblems

### Common Patterns

| Pattern | Examples |
|---------|----------|
| Linear Recursion | Factorial, Fibonacci |
| Tree Recursion | Permutations, Powerset |
| Backtracking | Sudoku, N-Queens |
| Divide & Conquer | Merge Sort, Quick Sort |

### Debugging Tips
1. Print recursive calls with parameters
2. Trace through small examples by hand
3. Verify base cases handle all termination conditions
4. Check that recursive calls make progress
