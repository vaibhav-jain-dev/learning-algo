# Reverse Words in a String

## Problem Description

Given an input string `s`, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in `s` will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space.

Note that `s` may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

## Examples

### Example 1
```
Input: s = "the sky is blue"
Output: "blue is sky the"
```

### Example 2
```
Input: s = "  hello world  "
Output: "world hello"
Explanation: Reversed string should not contain leading or trailing spaces.
```

### Example 3
```
Input: s = "a good   example"
Output: "example good a"
Explanation: Multiple spaces between words are reduced to a single space.
```

### Example 4
```
Input: s = "  Bob    Loves  Alice   "
Output: "Alice Loves Bob"
```

## Constraints

- 1 <= s.length <= 10^4
- s contains English letters (upper-case and lower-case), digits, and spaces ' '
- There is at least one word in s

<details>
<summary>Hint 1</summary>
Split the string by spaces, filter out empty strings, then reverse the list and join with a single space.
</details>

<details>
<summary>Hint 2</summary>
For O(1) space (in-place for languages with mutable strings): First reverse the entire string, then reverse each word individually.
</details>

<details>
<summary>Hint 3</summary>
Use two pointers to identify word boundaries and handle multiple spaces between words.
</details>

## Approach

### Approach 1: Split, Reverse, Join (Recommended)

1. Split the string by spaces
2. Filter out empty strings (from multiple spaces)
3. Reverse the list of words
4. Join with a single space

**Time Complexity**: O(n)
**Space Complexity**: O(n)

### Approach 2: Two-Pass In-Place (for mutable strings)

1. Reverse the entire string
2. Reverse each word individually
3. Clean up extra spaces

**Time Complexity**: O(n)
**Space Complexity**: O(1) if string is mutable, O(n) otherwise

### Approach 3: Stack-Based

1. Push each word onto a stack
2. Pop all words and join with spaces

**Time Complexity**: O(n)
**Space Complexity**: O(n)

### Edge Cases

- Leading/trailing spaces
- Multiple spaces between words
- Single word
- Empty string
- String with only spaces
