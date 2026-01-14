# Implement strStr()

## Problem Description

Implement the `strStr()` function, which returns the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.

This is a classic string matching problem that appears in many programming interviews and is the foundation for understanding pattern matching algorithms.

## Examples

### Example 1
```
Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6. The first occurrence is at index 0, so we return 0.
```

### Example 2
```
Input: haystack = "leetcode", needle = "leeto"
Output: -1
Explanation: "leeto" did not occur in "leetcode", so we return -1.
```

### Example 3
```
Input: haystack = "hello", needle = "ll"
Output: 2
Explanation: "ll" occurs at index 2.
```

### Example 4
```
Input: haystack = "aaaaa", needle = "bba"
Output: -1
Explanation: "bba" is not found in "aaaaa".
```

## Constraints

- 1 <= haystack.length, needle.length <= 10^4
- haystack and needle consist of only lowercase English characters

<details>
<summary>Hint 1</summary>
The naive approach compares each position in haystack with needle. This works well for small strings.
</details>

<details>
<summary>Hint 2</summary>
For better performance on large strings with repetitive patterns, consider using KMP or Rabin-Karp algorithms.
</details>

<details>
<summary>Hint 3</summary>
Handle edge cases: empty needle should return 0, needle longer than haystack should return -1.
</details>

## Approach

### Approach 1: Sliding Window (Naive)

1. Slide a window of size `len(needle)` across `haystack`
2. At each position, compare the window with `needle`
3. Return the index if match found, -1 otherwise

**Time Complexity**: O((n-m+1) * m) where n = len(haystack), m = len(needle)
**Space Complexity**: O(1)

### Approach 2: Built-in Functions

Most languages have built-in string search functions:
- Python: `str.find()` or `str.index()`
- Go: `strings.Index()`
- Java: `String.indexOf()`

These are typically optimized implementations.

### Approach 3: KMP Algorithm

For production use with large strings and repetitive patterns:
1. Build the LPS (Longest Proper Prefix Suffix) array for needle
2. Use the LPS array to skip unnecessary comparisons

**Time Complexity**: O(n + m)
**Space Complexity**: O(m)

### Edge Cases to Consider

1. Empty needle - typically returns 0
2. Needle longer than haystack - returns -1
3. Empty haystack with non-empty needle - returns -1
4. Both empty - returns 0
5. Needle at the very end of haystack
6. Multiple occurrences - return first one
