# First Unique Character in a String

## Problem Description

Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return -1.

## Examples

### Example 1
```
Input: s = "leetcode"
Output: 0
Explanation: The character 'l' at index 0 is the first character that does not occur elsewhere in the string.
```

### Example 2
```
Input: s = "loveleetcode"
Output: 2
Explanation: The character 'v' at index 2 is the first non-repeating character.
```

### Example 3
```
Input: s = "aabb"
Output: -1
Explanation: There is no non-repeating character, so we return -1.
```

## Constraints

- 1 <= s.length <= 10^5
- s consists of only lowercase English letters

## Hints

<details>
<summary>Hint 1</summary>
You need to know how many times each character appears in the string. What data structure is good for counting?
</details>

<details>
<summary>Hint 2</summary>
Use a hash map to count the frequency of each character in the string.
</details>

<details>
<summary>Hint 3</summary>
After counting, iterate through the string again and return the index of the first character with count 1.
</details>

## Approach

### Two-Pass Hash Map Approach - O(n) Time, O(1) Space

1. **First Pass**: Count the frequency of each character using a hash map
2. **Second Pass**: Iterate through the string and return the index of the first character with frequency 1

### Why Two Passes?

- The first pass builds a complete picture of character frequencies
- The second pass finds the first unique character in order of appearance
- We can't combine these because we need to know all frequencies before determining which is "first"

### Alternative: LinkedHashMap Approach

Some languages support ordered hash maps that maintain insertion order. You could:
1. Use a linked hash map to store characters and their frequencies
2. Iterate through the map (which preserves insertion order) to find the first with count 1
3. However, this doesn't give us the index directly, so we'd still need to search

### Complexity Analysis

- **Time Complexity**: O(n) - Two passes through the string, each O(n)
- **Space Complexity**: O(1) - The hash map stores at most 26 characters (lowercase English letters), which is constant
