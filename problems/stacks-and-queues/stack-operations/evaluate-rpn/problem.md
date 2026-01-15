# Evaluate Reverse Polish Notation

## Problem Description

Evaluate the value of an arithmetic expression in Reverse Polish Notation (RPN).

Valid operators are `+`, `-`, `*`, and `/`. Each operand may be an integer or another expression.

**Note:**
- Division between two integers should truncate toward zero.
- The given RPN expression is always valid. That means the expression would always evaluate to a result, and there will not be any division by zero operation.

## What is Reverse Polish Notation?

Reverse Polish Notation (also known as postfix notation) is a mathematical notation where operators follow their operands. For example:
- Infix: `3 + 4` becomes Postfix: `3 4 +`
- Infix: `(3 + 4) * 5` becomes Postfix: `3 4 + 5 *`

## Examples

### Example 1
```
Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
```

### Example 2
```
Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 4 + 2 = 6
```

### Example 3
```
Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22
Explanation:
  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= 17 + 5
= 22
```

### Example 4
```
Input: tokens = ["3","4","-"]
Output: -1
Explanation: 3 - 4 = -1
```

## Constraints
- `1 <= tokens.length <= 10^4`
- `tokens[i]` is either an operator: `"+"`, `"-"`, `"*"`, or `"/"`, or an integer in the range `[-200, 200]`.

## Hints

<details>
<summary>Hint 1</summary>
Use a stack to store operands. When you encounter an operator, pop two operands, apply the operation, and push the result back.
</details>

<details>
<summary>Hint 2</summary>
Pay attention to the order of operands for subtraction and division - the first popped element is the second operand (right), and the second popped element is the first operand (left).
</details>

<details>
<summary>Hint 3</summary>
For division, remember to truncate toward zero. In some languages, integer division truncates toward negative infinity, so you may need to handle this explicitly.
</details>

## Approach

### Stack-Based Evaluation

The key insight is that RPN is designed to be evaluated using a stack:

1. **Initialize**: Create an empty stack to store operands.

2. **Process each token**:
   - If the token is a number, push it onto the stack.
   - If the token is an operator:
     - Pop the top two elements (second popped is left operand, first popped is right operand)
     - Apply the operation
     - Push the result back onto the stack

3. **Return result**: After processing all tokens, the stack will contain exactly one element - the final result.

### Handling Division

Division should truncate toward zero:
- `6 / 4 = 1` (not 1.5)
- `-6 / 4 = -1` (truncate toward zero, not -2)
- `6 / -4 = -1` (truncate toward zero, not -2)

In Python, use `int(a / b)` instead of `a // b` because `//` truncates toward negative infinity.

### Time Complexity
- **O(n)** where n is the number of tokens

### Space Complexity
- **O(n)** for the stack in the worst case (all operands followed by operators)

### Why RPN is Useful

1. **No parentheses needed**: Operator precedence is implicit in the notation
2. **Easy to evaluate**: Simple stack-based algorithm
3. **Used in calculators**: HP calculators famously used RPN
4. **Compiler design**: Used as intermediate representation in compilers
