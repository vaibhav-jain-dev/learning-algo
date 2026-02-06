/**
 * Serialize and Deserialize BST
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'Serialize and Deserialize BST',
        difficulty: 'Hard',
        algorithm: 'bst-construction',
        parent: '02-bst-construction',
        description: 'Design an algorithm to serialize and deserialize a **binary search tree**. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a BST can be serialized to a string and this string can be deserialized to the original tree structure. **The encoded string should be as compact as possible.**',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n) for both serialize and deserialize',
            space: 'O(n)'
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
                5,
                3,
                7,
                2,
                4,
                6,
                8
        ]
},
        output: "5,3,2,4,7,6,8",
        explanation: 'Processing the input data produces the output. For input tree=[5, 3, ..., 8] (length 7), the result is 5,3,2,4,7,6,8.'
    },
    {
        input: {
        "tree": [
                2,
                1,
                3
        ]
},
        output: "2,1,3",
        explanation: 'Processing the input data produces the output. For input tree=[2, 1, 3], the result is 2,1,3.'
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

def serialize(root):
    """
    Serialize BST using preorder traversal.
    BST property allows reconstruction from preorder alone.
    """
    if not root:
        return ""

    result = []
    def preorder(node):
        if not node:
            return
        result.append(str(node.val))
        preorder(node.left)
        preorder(node.right)

    preorder(root)
    return ",".join(result)

def deserialize(data):
    """
    Deserialize string back to BST.
    Use value bounds to determine tree structure.
    """
    if not data:
        return None

    values = list(map(int, data.split(",")))
    idx = [0]

    def build(min_val, max_val):
        if idx[0] >= len(values):
            return None
        val = values[idx[0]]
        if val < min_val or val > max_val:
            return None

        idx[0] += 1
        node = TreeNode(val)
        node.left = build(min_val, val)
        node.right = build(val, max_val)
        return node

    return build(float('-inf'), float('inf'))

def serializeAndDeserializeBst(data):
    """
    Serialize and Deserialize BST

    Approach: Use preorder traversal for serialization.
    BST property allows reconstruction without null markers.

    Time: O(n) for both operations
    Space: O(n)
    """
    tree = data.get("tree", [])

    root = buildTree(tree)
    if not root:
        return ""

    # Serialize the tree
    serialized = serialize(root)

    # Verify by deserializing (optional)
    # reconstructed = deserialize(serialized)

    return serialized


# Test
if __name__ == "__main__":
    print(serializeAndDeserializeBst({"tree": [5, 3, 7, 2, 4, 6, 8]}))
    print(serializeAndDeserializeBst({"tree": [2, 1, 3]}))`,
            go: `package main

import (
    "fmt"
    "math"
    "strconv"
    "strings"
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

func serialize(root *TreeNode) string {
    if root == nil {
        return ""
    }
    var result []string
    var preorder func(node *TreeNode)
    preorder = func(node *TreeNode) {
        if node == nil {
            return
        }
        result = append(result, strconv.Itoa(node.Val))
        preorder(node.Left)
        preorder(node.Right)
    }
    preorder(root)
    return strings.Join(result, ",")
}

func deserialize(data string) *TreeNode {
    if data == "" {
        return nil
    }
    parts := strings.Split(data, ",")
    values := make([]int, len(parts))
    for i, p := range parts {
        values[i], _ = strconv.Atoi(p)
    }
    idx := 0

    var build func(minVal, maxVal int) *TreeNode
    build = func(minVal, maxVal int) *TreeNode {
        if idx >= len(values) {
            return nil
        }
        val := values[idx]
        if val < minVal || val > maxVal {
            return nil
        }
        idx++
        node := &TreeNode{Val: val}
        node.Left = build(minVal, val)
        node.Right = build(val, maxVal)
        return node
    }

    return build(math.MinInt32, math.MaxInt32)
}

func SerializeAndDeserializeBst(data map[string]interface{}) string {
    treeArr := data["tree"].([]interface{})
    root := buildTree(treeArr)

    if root == nil {
        return ""
    }

    return serialize(root)
}

func main() {
    data := map[string]interface{}{
        "tree": []interface{}{5.0, 3.0, 7.0, 2.0, 4.0, 6.0, 8.0},
    }
    fmt.Println(SerializeAndDeserializeBst(data))
}`
        },
        twists: [
            { id: '02-bst-construction/03-serialize-deserialize-bst/twist-01-serialize-bst-to-minimum-bytes', name: 'Serialize BST to Minimum Bytes', difficulty: 'Hard' },
            { id: '02-bst-construction/03-serialize-deserialize-bst/twist-02-serialize-and-deserialize-general-binary-tree', name: 'Serialize and Deserialize General Binary Tree', difficulty: 'Hard' },
            { id: '02-bst-construction/03-serialize-deserialize-bst/twist-03-streaming-deserialization', name: 'Streaming Deserialization', difficulty: 'Hard' },
            { id: '02-bst-construction/03-serialize-deserialize-bst/twist-04-serialize-bst-with-subtree-checksums', name: 'Serialize BST with Subtree Checksums', difficulty: 'Very Hard' },
            { id: '02-bst-construction/03-serialize-deserialize-bst/twist-05-diff-two-serialized-bsts', name: 'Diff Two Serialized BSTs', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/03-serialize-deserialize-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/03-serialize-deserialize-bst'] = problem;

})();
