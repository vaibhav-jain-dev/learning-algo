/**
 * Two Sum Closest in BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Sum Closest in BST',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value',
        description: 'Given the root of a binary search tree and a target value, find two nodes in the BST such that their **sum is closest to the target**. Return the two values. If there are multiple pairs with the same closest sum, return any one of them.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(n) or O(h) with iterators'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
        "tree": [
                10,
                5,
                15,
                2,
                7,
                12,
                20
        ],
        "target": 22
},
        output: [7, 15],
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 20] (length 7), target=22, the result is [7, 15].'
    },
    {
        input: {
        "tree": [
                5,
                3,
                7,
                1,
                4,
                6,
                8
        ],
        "target": 10
},
        output: [3, 7],
        explanation: 'Processing the input data produces the output. For input tree=[5, 3, ..., 8] (length 7), target=10, the result is [3, 7].'
    }
        ],
        solutions: {
            python: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def buildTree(arr):
    """Build tree from level-order array."""
    if not arr:
        return None
    root = TreeNode(arr[0])
    queue = deque([root])
    i = 1
    while queue and i < len(arr):
        node = queue.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i])
            queue.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            queue.append(node.right)
        i += 1
    return root

def twoSumClosestInBst(data):
    """
    Two Sum Closest in BST

    Approach: Get sorted values via inorder traversal, then use
    two pointers to find pair with sum closest to target.

    Time: O(n)
    Space: O(n)
    """
    tree = data.get("tree", [])
    target = data.get("target", 0)

    root = buildTree(tree)
    if not root:
        return []

    # Get sorted values via inorder traversal
    values = []
    def inorder(node):
        if not node:
            return
        inorder(node.left)
        values.append(node.val)
        inorder(node.right)

    inorder(root)

    if len(values) < 2:
        return []

    # Two pointer approach
    left, right = 0, len(values) - 1
    closest_sum = float('inf')
    result = [values[left], values[right]]

    while left < right:
        current_sum = values[left] + values[right]

        if abs(current_sum - target) < abs(closest_sum - target):
            closest_sum = current_sum
            result = [values[left], values[right]]

        if current_sum < target:
            left += 1
        elif current_sum > target:
            right -= 1
        else:
            # Exact match
            return [values[left], values[right]]

    return result


# Test
if __name__ == "__main__":
    print(twoSumClosestInBst({"tree": [10, 5, 15, 2, 7, 12, 20], "target": 22}))
    print(twoSumClosestInBst({"tree": [5, 3, 7, 1, 4, 6, 8], "target": 10}))`,
            go: `package main

import (
    "fmt"
    "math"
)

type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

func buildTree(arr []interface{}) *TreeNode {
    if len(arr) == 0 || arr[0] == nil {
        return nil
    }
    root := &TreeNode{Val: int(arr[0].(float64))}
    queue := []*TreeNode{root}
    i := 1
    for len(queue) > 0 && i < len(arr) {
        node := queue[0]
        queue = queue[1:]
        if i < len(arr) && arr[i] != nil {
            node.Left = &TreeNode{Val: int(arr[i].(float64))}
            queue = append(queue, node.Left)
        }
        i++
        if i < len(arr) && arr[i] != nil {
            node.Right = &TreeNode{Val: int(arr[i].(float64))}
            queue = append(queue, node.Right)
        }
        i++
    }
    return root
}

func TwoSumClosestInBst(data map[string]interface{}) []int {
    treeArr := data["tree"].([]interface{})
    target := int(data["target"].(float64))

    root := buildTree(treeArr)
    if root == nil {
        return []int{}
    }

    // Get sorted values via inorder traversal
    var values []int
    var inorder func(node *TreeNode)
    inorder = func(node *TreeNode) {
        if node == nil {
            return
        }
        inorder(node.Left)
        values = append(values, node.Val)
        inorder(node.Right)
    }
    inorder(root)

    if len(values) < 2 {
        return []int{}
    }

    // Two pointer approach
    left, right := 0, len(values)-1
    closestSum := math.MaxInt32
    result := []int{values[left], values[right]}

    for left < right {
        currentSum := values[left] + values[right]

        if abs(currentSum-target) < abs(closestSum-target) {
            closestSum = currentSum
            result = []int{values[left], values[right]}
        }

        if currentSum < target {
            left++
        } else if currentSum > target {
            right--
        } else {
            return []int{values[left], values[right]}
        }
    }

    return result
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}

func main() {
    data := map[string]interface{}{
        "tree":   []interface{}{10.0, 5.0, 15.0, 2.0, 7.0, 12.0, 20.0},
        "target": 22.0,
    }
    fmt.Println(TwoSumClosestInBst(data))
}`
        },
        twists: [
            {
                title: 'Three Sum Closest in BST',
                difficulty: 'Hard',
                description: 'Find three nodes in the BST whose sum is closest to the target. Return the three values.',
                whyDifferent: 'Two pointers naturally work for two-sum on sorted data, but three-sum requires fixing one element and running two-sum on the remaining, changing the time complexity and requiring nested iteration strategies.',
                example: 'Tree: [10,5,15,2,7,12,20], target=30 -> [7,10,15] with sum=32 (closest to 30).'
            },
            {
                title: 'Two Sum Exact in BST (Boolean)',
                difficulty: 'Medium',
                description: 'Instead of finding the closest sum, determine if any two nodes sum to exactly the target. Return true/false.',
                whyDifferent: 'The exact match version allows for early termination and can use a HashSet approach during traversal, avoiding the need to collect all values first. The BST iterator approach also works differently with exact matching.',
                example: 'Tree: [5,3,7,1,4,6,8], target=10 -> true (3+7=10).'
            },
            {
                title: 'Two Sum Closest Using O(h) Space',
                difficulty: 'Hard',
                description: 'Solve two-sum closest using only O(h) auxiliary space by implementing forward and reverse BST iterators instead of collecting all values into an array.',
                whyDifferent: 'Replaces the O(n) array with two controlled stacks simulating forward and reverse inorder traversal. Managing two independent iterators simultaneously requires careful state management.',
                example: 'Same output as base problem, but space usage is O(h) where h is tree height, not O(n).'
            },
            {
                title: 'Two Sum Closest Across Two BSTs',
                difficulty: 'Hard',
                description: 'Given two separate BSTs, find one node from each tree such that their sum is closest to the target.',
                whyDifferent: 'You cannot merge the two trees into a single sorted array efficiently. Instead, use a forward iterator on one BST and a reverse iterator on the other, requiring coordination across two separate data structures.',
                example: 'BST1: [3,1,5], BST2: [8,6,10], target=12 -> [3,10] or [5,8] (both sum to 13, closest to 12).'
            },
            {
                title: 'Two Sum Closest with No Ancestor-Descendant Pair',
                difficulty: 'Very Hard',
                description: 'Find two nodes with sum closest to target, but the two nodes must not be in an ancestor-descendant relationship.',
                whyDifferent: 'The constraint eliminates pairs that lie on the same root-to-leaf path. You must track the path relationships between candidate pairs, which the simple two-pointer approach on sorted values completely ignores.',
                example: 'Tree: [10,5,15,2,7,12,20], target=17 -> Cannot use (10,7) since 10 is ancestor of 7. Valid: (5,12)=17.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/03-two-sum-closest-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/03-two-sum-closest-bst'] = problem;

})();
