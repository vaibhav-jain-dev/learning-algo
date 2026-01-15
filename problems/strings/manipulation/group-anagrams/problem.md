# Group Anagrams

## Problem Description

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

## Examples

### Example 1
```
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
Explanation:
- "eat", "tea", and "ate" are anagrams (same letters: a, e, t)
- "tan" and "nat" are anagrams (same letters: a, n, t)
- "bat" has no anagram in the list
```

### Example 2
```
Input: strs = [""]
Output: [[""]]
```

### Example 3
```
Input: strs = ["a"]
Output: [["a"]]
```

### Example 4
```
Input: strs = ["cab","tin","pew","duh","may","ill","buy","bar","max","doc"]
Output: [["cab"],["tin"],["pew"],["duh"],["may"],["ill"],["buy"],["bar"],["max"],["doc"]]
Explanation: No two words are anagrams of each other.
```

## Constraints

- 1 <= strs.length <= 10^4
- 0 <= strs[i].length <= 100
- strs[i] consists of lowercase English letters

<details>
<summary>Hint 1</summary>
Two strings are anagrams if and only if their sorted strings are equal.
</details>

<details>
<summary>Hint 2</summary>
Use a hash map where the key is the sorted string and the value is a list of original strings.
</details>

<details>
<summary>Hint 3</summary>
Alternative: Instead of sorting, use character count as the key (faster for long strings).
</details>

## Approach

### Approach 1: Sorted String as Key

1. Create a hash map to group anagrams
2. For each string, sort its characters to create a key
3. Add the original string to the list mapped by that key
4. Return all values from the hash map

**Time Complexity**: O(n * k * log(k)) where n is number of strings, k is max string length
**Space Complexity**: O(n * k)

### Approach 2: Character Count as Key

1. Create a hash map to group anagrams
2. For each string, count character frequencies
3. Use the count array/tuple as the key
4. Add the original string to the list mapped by that key

**Time Complexity**: O(n * k) where n is number of strings, k is max string length
**Space Complexity**: O(n * k)

### Why Character Count is Faster

- Sorting: O(k log k) per string
- Counting: O(k) per string (just iterate once and count)

For long strings, the counting approach is significantly faster.
