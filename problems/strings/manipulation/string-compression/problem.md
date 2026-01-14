# String Compression

## Problem Description

Given an array of characters `chars`, compress it using the following algorithm:

Begin with an empty string `s`. For each group of consecutive repeating characters in `chars`:

- If the group's length is 1, append the character to `s`.
- Otherwise, append the character followed by the group's length.

The compressed string `s` should not be returned separately, but instead be stored in the input character array `chars`. Note that group lengths that are 10 or longer will be split into multiple characters in `chars`.

After you are done modifying the input array, return the new length of the array.

You must write an algorithm that uses only constant extra space.

## Examples

### Example 1
```
Input: chars = ["a","a","b","b","c","c","c"]
Output: Return 6, and the first 6 characters are ["a","2","b","2","c","3"]
Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".
```

### Example 2
```
Input: chars = ["a"]
Output: Return 1, and the first 1 character is ["a"]
Explanation: The only group is "a", which remains uncompressed since it's a single character.
```

### Example 3
```
Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
Output: Return 4, and the first 4 characters are ["a","b","1","2"]
Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".
```

### Example 4
```
Input: chars = ["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"]
Output: Return 3, and the first 3 characters are ["a","1","6"]
Explanation: 16 consecutive 'a's compress to "a16".
```

## Constraints

- 1 <= chars.length <= 2000
- chars[i] is a lowercase English letter, uppercase English letter, digit, or symbol

<details>
<summary>Hint 1</summary>
Use two pointers: one to read characters and one to write the compressed result.
</details>

<details>
<summary>Hint 2</summary>
Count consecutive characters, then write the character and its count (if > 1) at the write pointer.
</details>

<details>
<summary>Hint 3</summary>
For counts >= 10, you need to convert the number to string and write each digit separately.
</details>

## Approach

### Two Pointer Approach (In-Place)

1. Use `read` pointer to iterate through the array
2. Use `write` pointer to track where to write compressed data
3. For each group of consecutive characters:
   - Count the length of the group
   - Write the character at `write` position
   - If count > 1, write each digit of the count
4. Return the final `write` position as the new length

**Time Complexity**: O(n)
**Space Complexity**: O(1) - modifies array in place

### Key Points

1. Numbers >= 10 need to be written digit by digit
2. Single characters don't need a count
3. The write pointer is always <= read pointer, so we won't overwrite unread data

### Edge Cases

- Single character array
- All same characters
- All different characters
- Counts that are 10 or more (multiple digits)
