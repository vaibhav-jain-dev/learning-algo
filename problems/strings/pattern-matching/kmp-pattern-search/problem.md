# KMP Pattern Search

## Problem Description

Implement the Knuth-Morris-Pratt (KMP) pattern matching algorithm to find all occurrences of a pattern string in a text string efficiently.

The KMP algorithm improves upon the naive pattern matching approach by utilizing information about the pattern itself to avoid unnecessary character comparisons when a mismatch occurs.

## Examples

### Example 1
```
Input: text = "AABAACAADAABAAABAA", pattern = "AABA"
Output: [0, 9, 13]
Explanation: Pattern "AABA" is found at indices 0, 9, and 13.
```

### Example 2
```
Input: text = "ABABDABACDABABCABAB", pattern = "ABABCABAB"
Output: [10]
Explanation: Pattern "ABABCABAB" is found starting at index 10.
```

### Example 3
```
Input: text = "AAAAAA", pattern = "AAA"
Output: [0, 1, 2, 3]
Explanation: Overlapping occurrences are counted.
```

## Constraints

- 1 <= pattern.length <= text.length <= 10^5
- text and pattern consist of lowercase and/or uppercase English letters

<details>
<summary>Hint 1</summary>
The key insight of KMP is to precompute a "failure function" (also called LPS - Longest Proper Prefix which is also Suffix) for the pattern.
</details>

<details>
<summary>Hint 2</summary>
When a mismatch occurs at pattern[j], instead of starting over, use the LPS array to know how many characters can be skipped.
</details>

<details>
<summary>Hint 3</summary>
The LPS array at index i contains the length of the longest proper prefix of pattern[0..i] which is also a suffix of pattern[0..i].
</details>

## Approach

### Understanding KMP

1. **Preprocessing Phase (Build LPS Array)**:
   - LPS[i] = length of longest proper prefix of pattern[0...i] which is also a suffix
   - A proper prefix is a prefix that is not the entire string
   - Example: For "AABAACAABAA", LPS = [0,1,0,1,2,0,1,2,3,4,5]

2. **Searching Phase**:
   - Compare pattern with text character by character
   - On mismatch, use LPS to determine how far to shift the pattern
   - Never go back in the text string - only move forward

### Time Complexity
- **Preprocessing**: O(m) where m is pattern length
- **Searching**: O(n) where n is text length
- **Total**: O(n + m)

### Space Complexity
- O(m) for the LPS array

### Why KMP is Efficient

In naive pattern matching, when a mismatch occurs, we restart comparison from the next position in text and beginning of pattern. KMP avoids this by recognizing that some characters have already been matched and uses this information to skip unnecessary comparisons.
