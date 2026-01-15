# Edit Distance (Levenshtein Distance)

**Difficulty:** Hard (L2 - Classic DP, Deep Thinking Required)
**Category:** Dynamic Programming, String
**Companies:** Google, Amazon, Facebook, Microsoft, LinkedIn, Uber

## Problem Statement

Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.

You have the following three operations permitted on a word:
- **Insert** a character
- **Delete** a character
- **Replace** a character

## Why This Problem Matters

Edit Distance is fundamental to:
- **Spell checkers** - Suggesting corrections
- **DNA sequence alignment** - Bioinformatics
- **Plagiarism detection** - Document similarity
- **Autocomplete** - Finding closest matches
- **Diff tools** - Git, file comparisons
- **Natural Language Processing** - Fuzzy matching

## Examples

### Example 1
```
Input: word1 = "horse", word2 = "ros"
Output: 3

Explanation:
horse → rorse (replace 'h' with 'r')
rorse → rose (delete 'r')
rose → ros (delete 'e')
```

### Example 2
```
Input: word1 = "intention", word2 = "execution"
Output: 5

Explanation:
intention → inention (delete 't')
inention → enention (replace 'i' with 'e')
enention → exention (replace 'n' with 'x')
exention → exection (replace 'n' with 'c')
exection → execution (insert 'u')
```

### Example 3
```
Input: word1 = "", word2 = "abc"
Output: 3 (3 insertions needed)
```

### Example 4
```
Input: word1 = "abc", word2 = ""
Output: 3 (3 deletions needed)
```

### Example 5
```
Input: word1 = "abc", word2 = "abc"
Output: 0 (already equal)
```

## Constraints

- `0 <= word1.length, word2.length <= 500`
- `word1` and `word2` consist of lowercase English letters

## Mental Model & Thinking Process

### Key Insight #1: Optimal Substructure
To convert word1[0..i] to word2[0..j], we have choices:
1. If word1[i] == word2[j]: No operation needed, same as converting word1[0..i-1] to word2[0..j-1]
2. If different, try all three operations and take minimum

### Key Insight #2: The Three Operations Mapped to DP

```
dp[i][j] = minimum operations to convert word1[0..i-1] to word2[0..j-1]

If word1[i-1] == word2[j-1]:
    dp[i][j] = dp[i-1][j-1]  (no operation needed)

Else:
    dp[i][j] = 1 + min(
        dp[i-1][j],     # Delete: remove word1[i-1], still need to match word2[0..j-1]
        dp[i][j-1],     # Insert: add word2[j-1], still need to convert word1[0..i-1]
        dp[i-1][j-1]    # Replace: replace word1[i-1] with word2[j-1]
    )
```

### Visual Understanding

```
Converting "horse" to "ros"

DP Table (word1 on rows, word2 on columns):

        ""    r    o    s
   ""    0    1    2    3
    h    1    1    2    3
    o    2    2    1    2
    r    3    2    2    2
    s    4    3    3    2
    e    5    4    4    3  ← Answer

Reading the table:
- dp[0][j] = j (insert j characters)
- dp[i][0] = i (delete i characters)
- dp[5][3] = 3 (answer)
```

## Hints

<details>
<summary>Hint 1: Start with Recursion</summary>

Define a recursive function: `minDistance(i, j)` = minimum operations to convert `word1[0..i-1]` to `word2[0..j-1]`.

Base cases:
- If i == 0: return j (insert j characters)
- If j == 0: return i (delete i characters)
</details>

<details>
<summary>Hint 2: Identify Overlapping Subproblems</summary>

Draw the recursion tree. You'll see the same (i, j) pairs computed multiple times. This is a classic sign we need memoization or DP.
</details>

<details>
<summary>Hint 3: Fill DP Table</summary>

Create a 2D table where dp[i][j] represents the edit distance for word1[0..i-1] and word2[0..j-1]. Fill it row by row.
</details>

<details>
<summary>Hint 4: Space Optimization</summary>

Notice that dp[i][j] only depends on dp[i-1][j-1], dp[i-1][j], and dp[i][j-1]. You only need the previous row, so you can optimize to O(n) space.
</details>

## Approach Explanations

### Approach 1: Recursion (TLE)
**Time: O(3^(m+n)) | Space: O(m+n) for call stack**

```
def minDistance(i, j):
    if i == 0: return j
    if j == 0: return i

    if word1[i-1] == word2[j-1]:
        return minDistance(i-1, j-1)

    return 1 + min(
        minDistance(i-1, j),    # delete
        minDistance(i, j-1),    # insert
        minDistance(i-1, j-1)   # replace
    )
```

### Approach 2: Memoization (Top-Down DP)
**Time: O(m × n) | Space: O(m × n)**

Same as recursion but with memoization.

### Approach 3: Tabulation (Bottom-Up DP)
**Time: O(m × n) | Space: O(m × n)**

```
1. Create dp table of size (m+1) × (n+1)
2. Initialize first row and column (base cases)
3. Fill table using recurrence relation
4. Return dp[m][n]
```

### Approach 4: Space-Optimized DP
**Time: O(m × n) | Space: O(n)**

Only keep previous row and current row.

## Complexity Analysis

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| Recursion | O(3^(m+n)) | O(m+n) | Exponential, TLE |
| Memoization | O(m × n) | O(m × n) | Top-down with cache |
| Tabulation | O(m × n) | O(m × n) | Bottom-up, intuitive |
| Space-Optimized | O(m × n) | O(min(m,n)) | Best practical solution |

## Reconstructing the Path

To find the actual operations (not just count):

```python
def reconstruct(dp, word1, word2):
    i, j = len(word1), len(word2)
    operations = []

    while i > 0 or j > 0:
        if i > 0 and j > 0 and word1[i-1] == word2[j-1]:
            # Characters match, move diagonally
            i -= 1
            j -= 1
        elif i > 0 and j > 0 and dp[i][j] == dp[i-1][j-1] + 1:
            # Replace
            operations.append(f"Replace '{word1[i-1]}' with '{word2[j-1]}' at position {i-1}")
            i -= 1
            j -= 1
        elif i > 0 and dp[i][j] == dp[i-1][j] + 1:
            # Delete
            operations.append(f"Delete '{word1[i-1]}' at position {i-1}")
            i -= 1
        elif j > 0 and dp[i][j] == dp[i][j-1] + 1:
            # Insert
            operations.append(f"Insert '{word2[j-1]}' at position {i}")
            j -= 1

    return operations[::-1]  # Reverse to get correct order
```

## Common Mistakes to Avoid

1. **Off-by-one errors:** dp[i][j] corresponds to word1[0..i-1] and word2[0..j-1]
2. **Wrong base case initialization:** dp[0][j] = j and dp[i][0] = i
3. **Forgetting the case when characters are equal**
4. **Not handling empty strings**

## Variations

1. **Weighted Edit Distance:** Different costs for insert, delete, replace
2. **Damerau-Levenshtein:** Also allows transpositions (swap adjacent)
3. **LCS-based:** Edit distance = m + n - 2 × LCS(word1, word2)

## Related Problems

- Longest Common Subsequence (Medium)
- Delete Operation for Two Strings (Medium)
- Minimum ASCII Delete Sum for Two Strings (Medium)
- Distinct Subsequences (Hard)
- Wildcard Matching (Hard)

## Interview Tips

1. **Start by explaining the problem clearly** - Show you understand
2. **Draw the DP table for a small example** - Interviewers love this
3. **Explain the recurrence relation** - The key insight
4. **Discuss time/space complexity** - Before and after optimization
5. **Mention real-world applications** - Shows deeper understanding
