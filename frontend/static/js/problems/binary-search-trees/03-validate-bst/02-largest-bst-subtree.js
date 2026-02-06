/**
 * Largest BST Subtree
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-validation
 */
(function() {
    'use strict';

    const problem = {
        name: 'Largest BST Subtree',
        difficulty: 'Medium',
        algorithm: 'bst-validation',
        parent: '03-validate-bst',
        description: 'Given the root of a binary tree, find the largest subtree which is a Binary Search Tree (BST), where the largest means subtree has the largest number of nodes. A **Binary Search Tree (BST)** is a tree in which all the nodes follow the below properties: - The left subtree values are less than the value of their parent node - The right subtree values are greater than the value of their parent node Return the size of the largest BST subtree.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(h)'
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
                1,
                8,
                null,
                7
        ]
},
        output: 3,
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 7] (length 7), the result is 3.'
    },
    {
        input: {
        "tree": [
                2,
                1,
                3
        ]
},
        output: 3,
        explanation: 'Processing the input data produces the output. For input tree=[2, 1, 3], the result is 3.'
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
    if not arr or arr[0] is None:
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

def largestBstSubtree(data):
    """
    Largest BST Subtree

    Approach: Post-order traversal. For each node, check if subtree
    is valid BST and track size. Return tuple (is_bst, size, min, max).

    Time: O(n)
    Space: O(h) recursion stack
    """
    tree = data.get("tree", [])
    root = buildTree(tree)

    if not root:
        return 0

    max_size = [0]

    def helper(node):
        """
        Returns (is_bst, size, min_val, max_val)
        """
        if not node:
            return (True, 0, float('inf'), float('-inf'))

        left_bst, left_size, left_min, left_max = helper(node.left)
        right_bst, right_size, right_min, right_max = helper(node.right)

        # Check if current subtree is BST
        if left_bst and right_bst and left_max < node.val < right_min:
            size = left_size + right_size + 1
            max_size[0] = max(max_size[0], size)
            return (True, size, min(left_min, node.val), max(right_max, node.val))
        else:
            return (False, 0, 0, 0)

    helper(root)
    return max_size[0]


# Test
if __name__ == "__main__":
    print(largestBstSubtree({"tree": [10, 5, 15, 1, 8, None, 7]}))
    print(largestBstSubtree({"tree": [2, 1, 3]}))`,
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

type BSTInfo struct {
    isBST bool
    size  int
    minV  int
    maxV  int
}

func LargestBstSubtree(data map[string]interface{}) int {
    treeArr := data["tree"].([]interface{})
    root := buildTree(treeArr)

    if root == nil {
        return 0
    }

    maxSize := 0

    var helper func(node *TreeNode) BSTInfo
    helper = func(node *TreeNode) BSTInfo {
        if node == nil {
            return BSTInfo{true, 0, math.MaxInt32, math.MinInt32}
        }

        left := helper(node.Left)
        right := helper(node.Right)

        if left.isBST && right.isBST && left.maxV < node.Val && node.Val < right.minV {
            size := left.size + right.size + 1
            if size > maxSize {
                maxSize = size
            }
            minV := left.minV
            if node.Val < minV {
                minV = node.Val
            }
            maxV := right.maxV
            if node.Val > maxV {
                maxV = node.Val
            }
            return BSTInfo{true, size, minV, maxV}
        }

        return BSTInfo{false, 0, 0, 0}
    }

    helper(root)
    return maxSize
}

func main() {
    data := map[string]interface{}{
        "tree": []interface{}{10.0, 5.0, 15.0, 1.0, 8.0, nil, 7.0},
    }
    fmt.Println(LargestBstSubtree(data))
}`
        },
        twists: [
            {
                title: 'Largest BST Subtree by Height',
                difficulty: 'Medium',
                description: 'Instead of finding the BST subtree with the most nodes, find the one with the greatest height.',
                whyDifferent: 'A tall but narrow BST subtree beats a short but wide one. The post-order aggregation must track height instead of size, and the optimal subtree may be different from the size-based answer.',
                example: 'Tree where left subtree is a chain BST of height 4 (5 nodes) and right subtree is a complete BST of height 2 (7 nodes). By height: left wins (4). By size: right wins (7).'
            },
            {
                title: 'Largest Almost-BST Subtree',
                difficulty: 'Hard',
                description: 'Find the largest subtree that can become a valid BST by removing at most one node from it.',
                whyDifferent: 'You must consider subtrees that are "almost valid" -- one violation is tolerable. This requires tracking not just validity but the number of violations and which node to remove, adding a dimension to the state.',
                example: 'Tree: [10,5,15,1,8,7,20]. Subtree at 15: [15,7,20] is not BST (7<15 on right). Remove 7 -> [15,null,20] is BST of size 2. But subtree at 10 with one removal might be larger.'
            },
            {
                title: 'All Maximal BST Subtrees',
                difficulty: 'Hard',
                description: 'Find all BST subtrees that are maximal -- meaning they are valid BSTs and no proper super-tree containing them is also a valid BST. Return all their roots.',
                whyDifferent: 'Instead of finding the single largest, you must identify all BST subtrees that cannot be extended upward. This requires understanding the boundary between BST and non-BST regions throughout the tree.',
                example: 'Tree: [8,4,12,2,6,9,15,1,3,5,7,null,11,13,20] might have multiple maximal BST subtrees if the root itself is not a valid BST.'
            },
            {
                title: 'Minimum Nodes to Remove for Full BST',
                difficulty: 'Very Hard',
                description: 'Find the minimum number of nodes to remove from the binary tree so that the entire remaining tree is a valid BST.',
                whyDifferent: 'This is an optimization problem over all possible subsets of nodes to remove, not just finding existing BST subtrees. Removing a node may fix one violation but create another, requiring global reasoning.',
                example: 'Tree: [5,3,8,1,4,6,10,null,null,null,null,7] -> Remove node 7 (which violates right subtree of 6). Minimum removals: 1.'
            },
            {
                title: 'Largest BST Subtree with Augmented Nodes',
                difficulty: 'Medium',
                description: 'While finding the largest BST subtree, augment each node with its BST subtree size. After processing, each node should know the size of the largest BST subtree rooted at or below it.',
                whyDifferent: 'This adds an output requirement -- you are not just computing a single answer but annotating the entire tree. The augmentation must propagate correctly, and non-BST nodes must carry the max of their children\'s BST sizes.',
                example: 'Tree: [10,5,15,1,8,null,7]. Node 5 gets augmented with bstSize=3 (subtree [5,1,8] is valid BST). Node 15 gets bstSize=1 (only itself). Node 10 gets bstSize=3 (max of children).'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/02-largest-bst-subtree', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/02-largest-bst-subtree'] = problem;

})();
