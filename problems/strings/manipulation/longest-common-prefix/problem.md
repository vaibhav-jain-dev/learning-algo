# Longest Common Prefix

## Problem Description

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string `""`.

## Examples

### Example 1
```
Input: strs = ["flower","flow","flight"]
Output: "fl"
Explanation: "fl" is the longest prefix common to all three strings.
```

### Example 2
```
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
```

### Example 3
```
Input: strs = ["interspecies","interstellar","interstate"]
Output: "inters"
```

### Example 4
```
Input: strs = ["a"]
Output: "a"
```

## Constraints

- 1 <= strs.length <= 200
- 0 <= strs[i].length <= 200
- strs[i] consists of only lowercase English letters

<details>
<summary>Hint 1</summary>
The longest common prefix can never be longer than the shortest string in the array.
</details>

<details>
<summary>Hint 2</summary>
Compare characters at each position across all strings. Stop when you find a mismatch.
</details>

<details>
<summary>Hint 3</summary>
You can also use binary search on the length of the prefix, or divide and conquer by splitting the array.
</details>

## Approach

### Approach 1: Horizontal Scanning

1. Take the first string as the initial prefix
2. For each subsequent string, reduce the prefix until it matches
3. If prefix becomes empty, return empty string

**Time Complexity**: O(S) where S is sum of all characters in all strings
**Space Complexity**: O(1)

### Approach 2: Vertical Scanning (Recommended)

1. Compare characters at each index position
2. For each index i, check if all strings have the same character
3. Return prefix when a mismatch is found or a string ends

**Time Complexity**: O(S) where S is sum of all characters in all strings
**Space Complexity**: O(1)

### Approach 3: Binary Search

1. Find the minimum string length
2. Binary search for the length of the common prefix
3. For each candidate length, check if it's a valid common prefix

**Time Complexity**: O(S * log(m)) where m is minimum string length
**Space Complexity**: O(1)

### Approach 4: Divide and Conquer

1. Divide the array into two halves
2. Recursively find LCP of each half
3. Merge by finding LCP of the two results

**Time Complexity**: O(S)
**Space Complexity**: O(m * log(n)) for recursion stack
