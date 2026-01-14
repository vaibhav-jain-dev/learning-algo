"""
Evaluate Reverse Polish Notation

Evaluate the value of an arithmetic expression in Reverse Polish Notation (RPN).
Valid operators are +, -, *, and /.
"""

from typing import List
import operator


def eval_rpn(tokens: List[str]) -> int:
    """
    Evaluate a Reverse Polish Notation expression.

    Uses a stack to store operands. When an operator is encountered,
    pop two operands, apply the operation, and push the result.

    Time Complexity: O(n) where n is the number of tokens
    Space Complexity: O(n) for the stack
    """
    stack = []

    for token in tokens:
        if token in "+-*/":
            # Pop two operands (note the order!)
            right = stack.pop()
            left = stack.pop()

            if token == '+':
                result = left + right
            elif token == '-':
                result = left - right
            elif token == '*':
                result = left * right
            else:  # token == '/'
                # Truncate toward zero (not floor division)
                result = int(left / right)

            stack.append(result)
        else:
            # It's a number, push to stack
            stack.append(int(token))

    return stack[0]


def eval_rpn_with_operators(tokens: List[str]) -> int:
    """
    Alternative implementation using operator module for cleaner code.
    """
    operations = {
        '+': operator.add,
        '-': operator.sub,
        '*': operator.mul,
        '/': lambda a, b: int(a / b)  # Truncate toward zero
    }

    stack = []

    for token in tokens:
        if token in operations:
            right = stack.pop()
            left = stack.pop()
            stack.append(operations[token](left, right))
        else:
            stack.append(int(token))

    return stack[0]


def eval_rpn_with_trace(tokens: List[str]) -> tuple:
    """
    Extended version that returns the result along with execution trace.
    Useful for debugging and understanding the evaluation process.
    """
    stack = []
    trace = []

    for i, token in enumerate(tokens):
        if token in "+-*/":
            right = stack.pop()
            left = stack.pop()

            if token == '+':
                result = left + right
            elif token == '-':
                result = left - right
            elif token == '*':
                result = left * right
            else:
                result = int(left / right)

            trace.append(f"Step {i+1}: {left} {token} {right} = {result}")
            stack.append(result)
        else:
            stack.append(int(token))
            trace.append(f"Step {i+1}: Push {token} -> Stack: {stack[:]}")

    return stack[0], trace


def infix_to_rpn(expression: str) -> List[str]:
    """
    Convert infix expression to RPN (bonus function).
    Handles +, -, *, / and parentheses.
    Uses the Shunting Yard algorithm.
    """
    precedence = {'+': 1, '-': 1, '*': 2, '/': 2}
    output = []
    operator_stack = []

    i = 0
    while i < len(expression):
        char = expression[i]

        if char.isspace():
            i += 1
            continue

        # Handle numbers (including negative numbers at start or after operator)
        if char.isdigit() or (char == '-' and (i == 0 or expression[i-1] in '(+-*/')):
            j = i
            if char == '-':
                j += 1
            while j < len(expression) and expression[j].isdigit():
                j += 1
            output.append(expression[i:j])
            i = j
            continue

        if char in precedence:
            while (operator_stack and
                   operator_stack[-1] != '(' and
                   operator_stack[-1] in precedence and
                   precedence[operator_stack[-1]] >= precedence[char]):
                output.append(operator_stack.pop())
            operator_stack.append(char)

        elif char == '(':
            operator_stack.append(char)

        elif char == ')':
            while operator_stack and operator_stack[-1] != '(':
                output.append(operator_stack.pop())
            if operator_stack:
                operator_stack.pop()  # Remove the '('

        i += 1

    while operator_stack:
        output.append(operator_stack.pop())

    return output


def run_tests():
    """Run comprehensive tests for RPN evaluation."""
    test_cases = [
        # (input_tokens, expected_output, description)
        (["2", "1", "+", "3", "*"], 9, "(2 + 1) * 3"),
        (["4", "13", "5", "/", "+"], 6, "4 + (13 / 5)"),
        (["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"], 22, "Complex expression"),
        (["3", "4", "-"], -1, "3 - 4"),
        (["5"], 5, "Single number"),
        (["2", "3", "+"], 5, "Simple addition"),
        (["10", "3", "-"], 7, "Simple subtraction"),
        (["4", "5", "*"], 20, "Simple multiplication"),
        (["20", "4", "/"], 5, "Simple division"),
        (["7", "2", "/"], 3, "Division truncation (positive)"),
        (["-7", "2", "/"], -3, "Division truncation (negative dividend)"),
        (["7", "-2", "/"], -3, "Division truncation (negative divisor)"),
        (["-7", "-2", "/"], 3, "Division truncation (both negative)"),
        (["3", "4", "+", "2", "*", "7", "/"], 2, "(3 + 4) * 2 / 7"),
        (["5", "1", "2", "+", "4", "*", "+", "3", "-"], 14, "5 + ((1 + 2) * 4) - 3"),
    ]

    print("Testing eval_rpn function:")
    print("=" * 70)

    all_passed = True
    for i, (tokens, expected, description) in enumerate(test_cases, 1):
        result = eval_rpn(tokens)
        status = "PASS" if result == expected else "FAIL"
        if result != expected:
            all_passed = False

        tokens_str = str(tokens) if len(str(tokens)) <= 40 else str(tokens)[:37] + "..."
        print(f"Test {i:2}: {description}")
        print(f"         Input: {tokens_str}")
        print(f"         Result: {result}, Expected: {expected} [{status}]")
        print()

    print("=" * 70)
    print(f"All tests passed: {all_passed}")
    print()

    # Test alternative implementation
    print("Testing eval_rpn_with_operators function:")
    print("=" * 70)

    all_passed_alt = True
    for i, (tokens, expected, description) in enumerate(test_cases, 1):
        result = eval_rpn_with_operators(tokens)
        status = "PASS" if result == expected else "FAIL"
        if result != expected:
            all_passed_alt = False

    print(f"All {len(test_cases)} test cases: {'PASS' if all_passed_alt else 'FAIL'}")
    print()

    # Demonstrate trace functionality
    print("Demonstrating eval_rpn_with_trace:")
    print("=" * 70)

    demo_cases = [
        ["2", "1", "+", "3", "*"],
        ["4", "13", "5", "/", "+"],
    ]

    for tokens in demo_cases:
        result, trace = eval_rpn_with_trace(tokens)
        print(f"Expression: {tokens}")
        print(f"Result: {result}")
        print("Trace:")
        for step in trace:
            print(f"  {step}")
        print()

    # Demonstrate infix to RPN conversion
    print("Demonstrating infix_to_rpn conversion:")
    print("=" * 70)

    infix_expressions = [
        "3 + 4",
        "(3 + 4) * 5",
        "3 + 4 * 5",
        "10 + 3 * 5 - 2",
        "(10 + 3) * (5 - 2)",
    ]

    for expr in infix_expressions:
        rpn = infix_to_rpn(expr)
        result = eval_rpn(rpn)
        print(f"Infix: {expr}")
        print(f"RPN: {rpn}")
        print(f"Result: {result}")
        print()


if __name__ == "__main__":
    run_tests()
