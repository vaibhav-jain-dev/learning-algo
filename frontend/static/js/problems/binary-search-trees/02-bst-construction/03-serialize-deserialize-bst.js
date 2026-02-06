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
            {
                title: 'Serialize BST to Minimum Bytes',
                difficulty: 'Hard',
                description: 'Serialize the BST using the minimum number of bytes possible. Use variable-length encoding, bit packing, or delta encoding to achieve maximum compression.',
                whyDifferent: 'Instead of string representation, you must think about binary encoding, bit-level operations, and compression techniques. The BST property allows delta encoding since values are bounded by parent constraints.',
                example: 'BST: [100,50,150] -> Instead of "100,50,150" (11 bytes), encode as binary with deltas: ~6 bytes.'
            },
            {
                title: 'Serialize and Deserialize General Binary Tree',
                difficulty: 'Hard',
                description: 'Serialize a general binary tree (not BST). Since the BST property no longer holds, you cannot reconstruct from preorder alone.',
                whyDifferent: 'Without BST ordering, preorder traversal is ambiguous -- you need null markers or both preorder and inorder. This fundamentally changes the serialization format and increases the encoded size.',
                example: 'Tree: [1,2,3,null,null,4,5] -> Must include null markers: "1,2,#,#,3,4,#,#,5,#,#".'
            },
            {
                title: 'Streaming Deserialization',
                difficulty: 'Hard',
                description: 'Deserialize the BST from a stream where you receive one value at a time. Build the tree incrementally as values arrive, without buffering all values first.',
                whyDifferent: 'Standard deserialization reads all data upfront. Streaming requires maintaining partial tree state and deciding where each new value belongs as it arrives, using the BST bounds tracking in an online fashion.',
                example: 'Stream: 5, 3, 2, 4, 7, 6, 8. After receiving "5,3,2": partial tree [5,3,null,2]. After "4": [5,3,null,2,4].'
            },
            {
                title: 'Serialize BST with Subtree Checksums',
                difficulty: 'Very Hard',
                description: 'Serialize the BST such that each subtree has an embedded checksum. During deserialization, verify that no corruption occurred. If corruption is detected, report which subtree is corrupted.',
                whyDifferent: 'Adds error detection to the serialization problem. You must design a checksum scheme that is hierarchical (each node\'s checksum depends on its children\'s), turning this into a Merkle tree problem.',
                example: 'Serialized: "5[hash],3[hash],7[hash]". If node 3 is corrupted to 9, deserialization detects the left subtree checksum mismatch.'
            },
            {
                title: 'Diff Two Serialized BSTs',
                difficulty: 'Hard',
                description: 'Given two serialized BST strings, determine the minimum edit operations (insert/delete/modify node) to transform one BST into the other without fully deserializing either tree.',
                whyDifferent: 'Working directly on serialized representations requires understanding how the string format maps to tree structure. You must identify structural differences from the preorder encoding without building the actual trees.',
                example: 'BST1: "5,3,2,4,7" BST2: "5,3,2,4,7,6,8" -> Diff: insert 6 and 8 as children of 7.'
            }
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
