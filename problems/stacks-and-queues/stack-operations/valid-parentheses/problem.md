# Valid Parentheses

## Problem Description

Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

## Examples

### Example 1
```
Input: s = "()"
Output: true
```

### Example 2
```
Input: s = "()[]{}"
Output: true
```

### Example 3
```
Input: s = "(]"
Output: false
```

### Example 4
```
Input: s = "([)]"
Output: false
Explanation: The brackets are not closed in the correct order.
```

### Example 5
```
Input: s = "{[]}"
Output: true
Explanation: Nested brackets are valid when properly matched.
```

## Constraints
- `0 <= s.length <= 10^4`
- `s` consists of parentheses only `'()[]{}'`

## Hints

<details>
<summary>Hint 1</summary>
Think about using a stack data structure. What should you push and when should you pop?
</details>

<details>
<summary>Hint 2</summary>
When you encounter an opening bracket, push it onto the stack. When you encounter a closing bracket, check if the top of the stack has the matching opening bracket.
</details>

<details>
<summary>Hint 3</summary>
Use a hash map to store the matching pairs of brackets for quick lookup.
</details>

## Approach

### Stack-Based Solution

1. **Initialize**: Create an empty stack and a mapping of closing brackets to their corresponding opening brackets.

2. **Iterate through the string**:
   - If the character is an opening bracket (`(`, `{`, `[`), push it onto the stack.
   - If the character is a closing bracket (`)`, `}`, `]`):
     - Check if the stack is empty (no matching opening bracket) - return false
     - Pop the top element and check if it matches the expected opening bracket
     - If it doesn't match, return false

3. **Final check**: After processing all characters, the stack should be empty. If not, there are unmatched opening brackets.

### Time Complexity
- **O(n)** where n is the length of the string - we process each character once

### Space Complexity
- **O(n)** in the worst case when all characters are opening brackets

### Why Stack Works

The stack naturally handles the "last opened, first closed" property of valid bracket sequences. The most recently opened bracket must be closed first, which is exactly what a stack provides with its LIFO (Last In, First Out) behavior.
