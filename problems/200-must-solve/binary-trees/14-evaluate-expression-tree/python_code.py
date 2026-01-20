"""
Evaluate Expression Tree - Python Solution

Evaluate a binary expression tree where leaves are operands and
internal nodes are operators (+, -, *, /).

Time Complexity: O(n)
Space Complexity: O(h) for recursion stack
"""


class BinaryTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


# Operator mappings
ADDITION = -1
SUBTRACTION = -2
MULTIPLICATION = -3
DIVISION = -4


def evaluate_expression_tree(tree):
    """
    Evaluate a binary expression tree.

    Args:
        tree: Root of expression tree where:
              - Leaf nodes contain operands (integers >= 0)
              - Internal nodes contain operators (-1 to -4)

    Returns:
        int: Result of evaluating the expression
    """
    # Base case: leaf node (operand)
    if tree.left is None and tree.right is None:
        return tree.value

    # Recursively evaluate left and right subtrees
    left_value = evaluate_expression_tree(tree.left)
    right_value = evaluate_expression_tree(tree.right)

    # Apply operator
    if tree.value == ADDITION:
        return left_value + right_value
    elif tree.value == SUBTRACTION:
        return left_value - right_value
    elif tree.value == MULTIPLICATION:
        return left_value * right_value
    elif tree.value == DIVISION:
        # Integer division truncating toward zero
        return int(left_value / right_value)

    return 0  # Should never reach here


def evaluate_expression_tree_iterative(tree):
    """
    Iterative approach using post-order traversal with stack.

    Uses two stacks: one for traversal, one for values.
    """
    if tree.left is None and tree.right is None:
        return tree.value

    # Stack for nodes, stack for computed values
    stack = [tree]
    values = {}

    # First, get all nodes in post-order
    post_order = []
    visited = set()

    while stack:
        node = stack[-1]

        # If leaf or both children processed, process this node
        is_leaf = node.left is None and node.right is None
        children_processed = (
            (node.left is None or id(node.left) in visited) and
            (node.right is None or id(node.right) in visited)
        )

        if is_leaf or children_processed:
            stack.pop()
            visited.add(id(node))

            if is_leaf:
                values[id(node)] = node.value
            else:
                left_val = values[id(node.left)]
                right_val = values[id(node.right)]

                if node.value == ADDITION:
                    values[id(node)] = left_val + right_val
                elif node.value == SUBTRACTION:
                    values[id(node)] = left_val - right_val
                elif node.value == MULTIPLICATION:
                    values[id(node)] = left_val * right_val
                elif node.value == DIVISION:
                    values[id(node)] = int(left_val / right_val)
        else:
            # Push children (right first, then left)
            if node.right and id(node.right) not in visited:
                stack.append(node.right)
            if node.left and id(node.left) not in visited:
                stack.append(node.left)

    return values[id(tree)]


def tree_to_expression(tree):
    """Helper function to convert tree to infix expression string."""
    if tree.left is None and tree.right is None:
        return str(tree.value)

    operators = {-1: '+', -2: '-', -3: '*', -4: '/'}
    left_expr = tree_to_expression(tree.left)
    right_expr = tree_to_expression(tree.right)
    op = operators.get(tree.value, '?')

    return f"({left_expr} {op} {right_expr})"


# Test cases
if __name__ == "__main__":
    # Test 1: Example from problem
    #        -1 (+)
    #       /     \
    #    -2 (-)  -3 (*)
    #    /   \   /   \
    #   2     3 4     5
    # Expected: (2 - 3) + (4 * 5) = -1 + 20 = 19

    root1 = BinaryTree(ADDITION)
    root1.left = BinaryTree(SUBTRACTION)
    root1.right = BinaryTree(MULTIPLICATION)
    root1.left.left = BinaryTree(2)
    root1.left.right = BinaryTree(3)
    root1.right.left = BinaryTree(4)
    root1.right.right = BinaryTree(5)

    result1 = evaluate_expression_tree(root1)
    print(f"Test 1: {result1}")
    print(f"  Expression: {tree_to_expression(root1)}")
    # Expected: 19

    # Test 2: Division example
    #        -4 (/)
    #       /     \
    #    -3 (*)    2
    #    /   \
    #   6     3
    # Expected: (6 * 3) / 2 = 18 / 2 = 9

    root2 = BinaryTree(DIVISION)
    root2.left = BinaryTree(MULTIPLICATION)
    root2.right = BinaryTree(2)
    root2.left.left = BinaryTree(6)
    root2.left.right = BinaryTree(3)

    result2 = evaluate_expression_tree(root2)
    print(f"Test 2: {result2}")
    print(f"  Expression: {tree_to_expression(root2)}")
    # Expected: 9

    # Test 3: Simple addition
    #    -1 (+)
    #   /     \
    #  5       7
    # Expected: 12

    root3 = BinaryTree(ADDITION)
    root3.left = BinaryTree(5)
    root3.right = BinaryTree(7)

    result3 = evaluate_expression_tree(root3)
    print(f"Test 3: {result3}")
    # Expected: 12

    # Test 4: Single node (just a number)
    root4 = BinaryTree(42)
    result4 = evaluate_expression_tree(root4)
    print(f"Test 4 (single node): {result4}")
    # Expected: 42

    # Test 5: Complex nested expression
    #           -2 (-)
    #          /     \
    #       -1 (+)  -1 (+)
    #       /   \   /   \
    #      1     2 3     4
    # Expected: (1 + 2) - (3 + 4) = 3 - 7 = -4

    root5 = BinaryTree(SUBTRACTION)
    root5.left = BinaryTree(ADDITION)
    root5.right = BinaryTree(ADDITION)
    root5.left.left = BinaryTree(1)
    root5.left.right = BinaryTree(2)
    root5.right.left = BinaryTree(3)
    root5.right.right = BinaryTree(4)

    result5 = evaluate_expression_tree(root5)
    print(f"Test 5: {result5}")
    print(f"  Expression: {tree_to_expression(root5)}")
    # Expected: -4

    # Test 6: Integer division (truncate toward zero)
    #    -4 (/)
    #   /     \
    #  7       2
    # Expected: 7 / 2 = 3 (truncated)

    root6 = BinaryTree(DIVISION)
    root6.left = BinaryTree(7)
    root6.right = BinaryTree(2)

    result6 = evaluate_expression_tree(root6)
    print(f"Test 6 (division 7/2): {result6}")
    # Expected: 3

    # Test 7: Negative result division
    #    -4 (/)
    #   /     \
    # -7       2
    # Expected: -7 / 2 = -3 (truncated toward zero)

    root7 = BinaryTree(DIVISION)
    root7.left = BinaryTree(-7)
    root7.right = BinaryTree(2)

    result7 = evaluate_expression_tree(root7)
    print(f"Test 7 (division -7/2): {result7}")
    # Expected: -3

    # Test 8: Iterative approach verification
    result8 = evaluate_expression_tree_iterative(root1)
    print(f"Test 8 (iterative on Test 1): {result8}")
    # Expected: 19

    print("\nAll tests completed!")
