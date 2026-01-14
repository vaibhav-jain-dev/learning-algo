# Isomorphic Strings

## Problem Description

Given two strings `s` and `t`, determine if they are isomorphic.

Two strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t`.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

## Examples

### Example 1
```
Input: s = "egg", t = "add"
Output: true
Explanation:
  - 'e' maps to 'a'
  - 'g' maps to 'd'
  All 'e's become 'a's and all 'g's become 'd's.
```

### Example 2
```
Input: s = "foo", t = "bar"
Output: false
Explanation:
  - 'f' maps to 'b'
  - 'o' maps to 'a'
  But then 'o' would also need to map to 'r', which is a conflict.
```

### Example 3
```
Input: s = "paper", t = "title"
Output: true
Explanation:
  - 'p' maps to 't'
  - 'a' maps to 'i'
  - 'e' maps to 'l'
  - 'r' maps to 'e'
```

### Example 4
```
Input: s = "badc", t = "baba"
Output: false
Explanation:
  - 'b' maps to 'b'
  - 'a' maps to 'a'
  - 'd' maps to 'b' (conflict: 'b' is already mapped from 'b')
  Two different characters in s cannot map to the same character in t.
```

## Constraints

- 1 <= s.length <= 5 * 10^4
- t.length == s.length
- s and t consist of any valid ASCII characters

## Hints

<details>
<summary>Hint 1</summary>
Think about what conditions make two strings NOT isomorphic. What kind of mapping conflicts can occur?
</details>

<details>
<summary>Hint 2</summary>
You need to ensure a one-to-one mapping. Character 'a' in s always maps to the same character in t, AND no two different characters in s map to the same character in t.
</details>

<details>
<summary>Hint 3</summary>
Use two hash maps: one to map s -> t and another to map t -> s. Both mappings must be consistent.
</details>

## Approach

### Two Hash Maps Approach - O(n) Time, O(1) Space

1. Create two hash maps:
   - `s_to_t`: maps characters from s to characters in t
   - `t_to_s`: maps characters from t to characters in s

2. Iterate through both strings simultaneously:
   - For each position i, get `char_s = s[i]` and `char_t = t[i]`
   - Check if the mapping is consistent:
     - If `char_s` is in `s_to_t`, it must map to `char_t`
     - If `char_t` is in `t_to_s`, it must map to `char_s`
   - If either check fails, strings are not isomorphic
   - Otherwise, add/confirm the mappings

3. If we complete the iteration, strings are isomorphic

### Why Two Maps?

Using only one map (s -> t) would fail to catch cases like:
- s = "ab", t = "aa"
- 'a' -> 'a' and 'b' -> 'a' would both be valid with one map
- But this means two characters map to the same character (not allowed)

### Complexity Analysis

- **Time Complexity**: O(n) - Single pass through both strings
- **Space Complexity**: O(1) - Limited to 256 ASCII characters at most, which is constant
