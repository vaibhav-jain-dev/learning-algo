# Valid Palindrome

## Problem Description

A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

## Examples

### Example 1
```
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
```

### Example 2
```
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
```

### Example 3
```
Input: s = " "
Output: true
Explanation: After removing non-alphanumeric characters, s is an empty string "".
An empty string reads the same forward and backward, so it's a palindrome.
```

### Example 4
```
Input: s = "Was it a car or a cat I saw?"
Output: true
Explanation: "wasitacaroracatisaw" is a palindrome.
```

## Constraints

- 1 <= s.length <= 2 * 10^5
- s consists only of printable ASCII characters

<details>
<summary>Hint 1</summary>
Use two pointers, one starting from the beginning and one from the end.
</details>

<details>
<summary>Hint 2</summary>
Skip non-alphanumeric characters by moving the pointers inward when encountering them.
</details>

<details>
<summary>Hint 3</summary>
Compare characters case-insensitively (convert both to lowercase before comparing).
</details>

## Approach

### Approach 1: Two Pointers (Optimal)

1. Initialize two pointers: `left` at start, `right` at end
2. While `left < right`:
   - Skip non-alphanumeric characters on both sides
   - Compare lowercase versions of characters at both pointers
   - If they don't match, return false
   - Move pointers inward
3. Return true if all comparisons passed

**Time Complexity**: O(n)
**Space Complexity**: O(1)

### Approach 2: Filter and Compare

1. Filter string to keep only alphanumeric characters
2. Convert to lowercase
3. Compare with its reverse

**Time Complexity**: O(n)
**Space Complexity**: O(n) for the filtered string

### Edge Cases

- Empty string or only spaces -> true
- Single character -> true
- Only non-alphanumeric characters -> true
- Mixed case letters
- Numbers in the string
