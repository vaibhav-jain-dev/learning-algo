# Word Pattern

## Problem Description

Given a `pattern` and a string `s`, find if `s` follows the same pattern.

Here "follow" means a full match, such that there is a bijection (one-to-one correspondence) between a letter in `pattern` and a non-empty word in `s`.

## Examples

### Example 1
```
Input: pattern = "abba", s = "dog cat cat dog"
Output: true
Explanation:
  - 'a' maps to "dog"
  - 'b' maps to "cat"
  The pattern matches: a(dog) b(cat) b(cat) a(dog)
```

### Example 2
```
Input: pattern = "abba", s = "dog cat cat fish"
Output: false
Explanation:
  - 'a' maps to "dog"
  - 'b' maps to "cat"
  - But at position 3, 'a' should map to "dog", not "fish"
```

### Example 3
```
Input: pattern = "aaaa", s = "dog cat cat dog"
Output: false
Explanation:
  - 'a' maps to "dog" at first
  - But at position 1, 'a' should map to "dog", not "cat"
```

### Example 4
```
Input: pattern = "abba", s = "dog dog dog dog"
Output: false
Explanation:
  - 'a' maps to "dog"
  - 'b' also tries to map to "dog"
  - Two different pattern characters cannot map to the same word
```

## Constraints

- 1 <= pattern.length <= 300
- pattern contains only lowercase English letters
- 1 <= s.length <= 3000
- s contains only lowercase English letters and spaces ' '
- s does not contain any leading or trailing spaces
- All the words in s are separated by a single space

## Hints

<details>
<summary>Hint 1</summary>
First, split the string s into words. If the number of words doesn't match the pattern length, return false immediately.
</details>

<details>
<summary>Hint 2</summary>
This problem is similar to "Isomorphic Strings" - you need a bijection (one-to-one mapping) between pattern characters and words.
</details>

<details>
<summary>Hint 3</summary>
Use two hash maps: one mapping pattern characters to words, and another mapping words to pattern characters. Both must be consistent.
</details>

## Approach

### Two Hash Maps Approach - O(n) Time, O(n) Space

1. Split the string `s` into words
2. Check if the number of words equals the pattern length; if not, return false
3. Create two hash maps:
   - `char_to_word`: maps pattern characters to words
   - `word_to_char`: maps words to pattern characters
4. Iterate through pattern and words simultaneously:
   - Check if the mapping is consistent in both directions
   - If any inconsistency found, return false
   - Otherwise, add/confirm the mappings
5. Return true if all mappings are consistent

### Why Two Maps?

Using only one map would fail cases like:
- pattern = "ab", s = "dog dog"
- 'a' -> "dog" and 'b' -> "dog" would both be valid with one map
- But two different characters mapping to the same word violates the bijection

### Complexity Analysis

- **Time Complexity**: O(n) where n is the length of pattern (or number of words)
- **Space Complexity**: O(n) to store the mappings and the words array
