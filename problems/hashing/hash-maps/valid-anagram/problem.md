# Valid Anagram

## Problem Description

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

## Examples

### Example 1
```
Input: s = "anagram", t = "nagaram"
Output: true
Explanation: Both strings contain: a(3), n(1), g(1), r(1), m(1)
```

### Example 2
```
Input: s = "rat", t = "car"
Output: false
Explanation:
  - s contains: r(1), a(1), t(1)
  - t contains: c(1), a(1), r(1)
  - 't' is in s but not in t, 'c' is in t but not in s
```

### Example 3
```
Input: s = "listen", t = "silent"
Output: true
Explanation: Both strings contain the same letters with the same frequencies.
```

## Constraints

- 1 <= s.length, t.length <= 5 * 10^4
- s and t consist of lowercase English letters

## Follow-up

What if the inputs contain Unicode characters? How would you adapt your solution to such a case?

## Hints

<details>
<summary>Hint 1</summary>
Two strings are anagrams if and only if they have the same characters with the same frequencies.
</details>

<details>
<summary>Hint 2</summary>
You can use a hash map to count character frequencies. Count characters in s, then subtract counts for characters in t.
</details>

<details>
<summary>Hint 3</summary>
Alternatively, you can sort both strings and compare them. Anagrams will have identical sorted representations.
</details>

## Approach

### Hash Map Approach - O(n) Time, O(1) Space

1. If lengths are different, return false immediately
2. Create a hash map to count character frequencies
3. Iterate through string `s` and increment count for each character
4. Iterate through string `t` and decrement count for each character
5. If any count goes negative, return false (character in t not in s or appears more times)
6. Return true if all counts are zero

### Sorting Approach - O(n log n) Time, O(n) Space

1. Sort both strings
2. Compare the sorted strings
3. Return true if they are equal

### Single Hash Map Optimization

Instead of using two passes, you can:
1. Increment count for characters in s
2. Decrement count for characters in t
3. Finally check if all counts are zero

### Complexity Analysis

**Hash Map Approach:**
- **Time Complexity**: O(n) - Linear traversal of both strings
- **Space Complexity**: O(1) - At most 26 characters for lowercase English letters

**Sorting Approach:**
- **Time Complexity**: O(n log n) - Due to sorting
- **Space Complexity**: O(n) - Sorting typically requires extra space

### Unicode Follow-up

For Unicode characters, the hash map approach works without modification. The key difference is that the space complexity becomes O(k) where k is the number of unique Unicode characters in the strings, rather than being bounded by 26.
