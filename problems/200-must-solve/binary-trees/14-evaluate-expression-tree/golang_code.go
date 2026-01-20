/*
Evaluate Expression Tree - Go Solution

Evaluate a binary expression tree where leaves are operands and
internal nodes are operators (+, -, *, /).

Time Complexity: O(n)
Space Complexity: O(h) for recursion stack
*/

package main

import "fmt"

// BinaryTree represents a node in the expression tree
type BinaryTree struct {
	Value int
	Left  *BinaryTree
	Right *BinaryTree
}

// Operator constants
const (
	Addition       = -1
	Subtraction    = -2
	Multiplication = -3
	Division       = -4
)

// EvaluateExpressionTree evaluates a binary expression tree
// Leaf nodes contain operands, internal nodes contain operators
func EvaluateExpressionTree(tree *BinaryTree) int {
	// Base case: leaf node (operand)
	if tree.Left == nil && tree.Right == nil {
		return tree.Value
	}

	// Recursively evaluate left and right subtrees
	leftValue := EvaluateExpressionTree(tree.Left)
	rightValue := EvaluateExpressionTree(tree.Right)

	// Apply operator
	switch tree.Value {
	case Addition:
		return leftValue + rightValue
	case Subtraction:
		return leftValue - rightValue
	case Multiplication:
		return leftValue * rightValue
	case Division:
		// Go integer division truncates toward zero
		return leftValue / rightValue
	}

	return 0 // Should never reach here
}

// EvaluateExpressionTreeIterative uses post-order traversal with stack
func EvaluateExpressionTreeIterative(tree *BinaryTree) int {
	if tree.Left == nil && tree.Right == nil {
		return tree.Value
	}

	type stackItem struct {
		node      *BinaryTree
		processed bool
	}

	stack := []stackItem{{tree, false}}
	values := make(map[*BinaryTree]int)

	for len(stack) > 0 {
		// Peek at top
		item := &stack[len(stack)-1]
		node := item.node

		isLeaf := node.Left == nil && node.Right == nil

		if isLeaf {
			// Pop and store value
			stack = stack[:len(stack)-1]
			values[node] = node.Value
		} else if item.processed {
			// Both children have been processed, compute this node
			stack = stack[:len(stack)-1]

			leftVal := values[node.Left]
			rightVal := values[node.Right]

			switch node.Value {
			case Addition:
				values[node] = leftVal + rightVal
			case Subtraction:
				values[node] = leftVal - rightVal
			case Multiplication:
				values[node] = leftVal * rightVal
			case Division:
				values[node] = leftVal / rightVal
			}
		} else {
			// Mark as processed and push children
			item.processed = true
			if node.Right != nil {
				stack = append(stack, stackItem{node.Right, false})
			}
			if node.Left != nil {
				stack = append(stack, stackItem{node.Left, false})
			}
		}
	}

	return values[tree]
}

// treeToExpression converts tree to infix expression string (for debugging)
func treeToExpression(tree *BinaryTree) string {
	if tree.Left == nil && tree.Right == nil {
		return fmt.Sprintf("%d", tree.Value)
	}

	operators := map[int]string{
		-1: "+",
		-2: "-",
		-3: "*",
		-4: "/",
	}

	leftExpr := treeToExpression(tree.Left)
	rightExpr := treeToExpression(tree.Right)
	op := operators[tree.Value]

	return fmt.Sprintf("(%s %s %s)", leftExpr, op, rightExpr)
}

func main() {
	// Test 1: Example from problem
	//        -1 (+)
	//       /     \
	//    -2 (-)  -3 (*)
	//    /   \   /   \
	//   2     3 4     5
	// Expected: (2 - 3) + (4 * 5) = -1 + 20 = 19

	root1 := &BinaryTree{Value: Addition}
	root1.Left = &BinaryTree{Value: Subtraction}
	root1.Right = &BinaryTree{Value: Multiplication}
	root1.Left.Left = &BinaryTree{Value: 2}
	root1.Left.Right = &BinaryTree{Value: 3}
	root1.Right.Left = &BinaryTree{Value: 4}
	root1.Right.Right = &BinaryTree{Value: 5}

	result1 := EvaluateExpressionTree(root1)
	fmt.Printf("Test 1: %d\n", result1)
	fmt.Printf("  Expression: %s\n", treeToExpression(root1))
	// Expected: 19

	// Test 2: Division example
	//        -4 (/)
	//       /     \
	//    -3 (*)    2
	//    /   \
	//   6     3
	// Expected: (6 * 3) / 2 = 18 / 2 = 9

	root2 := &BinaryTree{Value: Division}
	root2.Left = &BinaryTree{Value: Multiplication}
	root2.Right = &BinaryTree{Value: 2}
	root2.Left.Left = &BinaryTree{Value: 6}
	root2.Left.Right = &BinaryTree{Value: 3}

	result2 := EvaluateExpressionTree(root2)
	fmt.Printf("Test 2: %d\n", result2)
	fmt.Printf("  Expression: %s\n", treeToExpression(root2))
	// Expected: 9

	// Test 3: Simple addition
	//    -1 (+)
	//   /     \
	//  5       7
	// Expected: 12

	root3 := &BinaryTree{Value: Addition}
	root3.Left = &BinaryTree{Value: 5}
	root3.Right = &BinaryTree{Value: 7}

	result3 := EvaluateExpressionTree(root3)
	fmt.Printf("Test 3: %d\n", result3)
	// Expected: 12

	// Test 4: Single node (just a number)
	root4 := &BinaryTree{Value: 42}
	result4 := EvaluateExpressionTree(root4)
	fmt.Printf("Test 4 (single node): %d\n", result4)
	// Expected: 42

	// Test 5: Complex nested expression
	//           -2 (-)
	//          /     \
	//       -1 (+)  -1 (+)
	//       /   \   /   \
	//      1     2 3     4
	// Expected: (1 + 2) - (3 + 4) = 3 - 7 = -4

	root5 := &BinaryTree{Value: Subtraction}
	root5.Left = &BinaryTree{Value: Addition}
	root5.Right = &BinaryTree{Value: Addition}
	root5.Left.Left = &BinaryTree{Value: 1}
	root5.Left.Right = &BinaryTree{Value: 2}
	root5.Right.Left = &BinaryTree{Value: 3}
	root5.Right.Right = &BinaryTree{Value: 4}

	result5 := EvaluateExpressionTree(root5)
	fmt.Printf("Test 5: %d\n", result5)
	fmt.Printf("  Expression: %s\n", treeToExpression(root5))
	// Expected: -4

	// Test 6: Integer division (truncate toward zero)
	//    -4 (/)
	//   /     \
	//  7       2
	// Expected: 7 / 2 = 3 (truncated)

	root6 := &BinaryTree{Value: Division}
	root6.Left = &BinaryTree{Value: 7}
	root6.Right = &BinaryTree{Value: 2}

	result6 := EvaluateExpressionTree(root6)
	fmt.Printf("Test 6 (division 7/2): %d\n", result6)
	// Expected: 3

	// Test 7: Negative result division
	//    -4 (/)
	//   /     \
	// -7       2
	// Expected: -7 / 2 = -3 (truncated toward zero)

	root7 := &BinaryTree{Value: Division}
	root7.Left = &BinaryTree{Value: -7}
	root7.Right = &BinaryTree{Value: 2}

	result7 := EvaluateExpressionTree(root7)
	fmt.Printf("Test 7 (division -7/2): %d\n", result7)
	// Expected: -3

	// Test 8: Iterative approach verification
	result8 := EvaluateExpressionTreeIterative(root1)
	fmt.Printf("Test 8 (iterative on Test 1): %d\n", result8)
	// Expected: 19

	fmt.Println("\nAll tests completed!")
}
