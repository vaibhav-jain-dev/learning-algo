/**
 * Block Matrix Transpose
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Block Matrix Transpose',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '06-transpose-matrix',
        description: 'Transpose a matrix where elements are grouped into blocks of size k×k.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
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
        input: {},
        output: null,
        explanation: 'See problem description'
    }
        ],
        solutions: {
            python: `def blockMatrixTranspose(matrix, k):
    """
    Block Matrix Transpose

    Transpose a matrix where elements are grouped into k x k blocks.
    The blocks are transposed (block at [i,j] moves to [j,i]),
    but elements within each block maintain their relative positions.

    Time: O(m * n) where m, n are matrix dimensions
    Space: O(m * n) for the result matrix

    Args:
        matrix: 2D list with dimensions divisible by k
        k: Block size (k x k blocks)

    Returns:
        Block-transposed matrix
    """
    if not matrix or not matrix[0] or k <= 0:
        return matrix

    m, n = len(matrix), len(matrix[0])

    # Number of blocks in each dimension
    block_rows = m // k
    block_cols = n // k

    # Result will have dimensions n x m (transposed)
    result = [[0] * m for _ in range(n)]

    # For each block position
    for bi in range(block_rows):
        for bj in range(block_cols):
            # Copy block from (bi, bj) to transposed position (bj, bi)
            # Source block starts at (bi * k, bj * k)
            # Destination block starts at (bj * k, bi * k)
            for i in range(k):
                for j in range(k):
                    src_row = bi * k + i
                    src_col = bj * k + j
                    dst_row = bj * k + i
                    dst_col = bi * k + j
                    result[dst_row][dst_col] = matrix[src_row][src_col]

    return result


def blockMatrixTransposeWithBlockTranspose(matrix, k):
    """
    Alternative: Also transpose elements within each block
    """
    if not matrix or not matrix[0] or k <= 0:
        return matrix

    m, n = len(matrix), len(matrix[0])
    block_rows = m // k
    block_cols = n // k

    result = [[0] * m for _ in range(n)]

    for bi in range(block_rows):
        for bj in range(block_cols):
            for i in range(k):
                for j in range(k):
                    src_row = bi * k + i
                    src_col = bj * k + j
                    # Transpose within block: (i,j) -> (j,i)
                    dst_row = bj * k + j
                    dst_col = bi * k + i
                    result[dst_row][dst_col] = matrix[src_row][src_col]

    return result


# Test
if __name__ == "__main__":
    # 4x4 matrix with 2x2 blocks
    matrix = [
        [1,  2,  3,  4],
        [5,  6,  7,  8],
        [9,  10, 11, 12],
        [13, 14, 15, 16]
    ]
    result = blockMatrixTranspose(matrix, 2)
    print("Block transpose (k=2):")
    for row in result:
        print(row)`,
            go: `package main

import "fmt"

// BlockMatrixTranspose transposes a matrix with k x k blocks
// Time: O(m*n), Space: O(m*n)
func BlockMatrixTranspose(matrix [][]int, k int) [][]int {
    if len(matrix) == 0 || len(matrix[0]) == 0 || k <= 0 {
        return matrix
    }

    m, n := len(matrix), len(matrix[0])
    blockRows := m / k
    blockCols := n / k

    // Result has dimensions n x m
    result := make([][]int, n)
    for i := range result {
        result[i] = make([]int, m)
    }

    // For each block position
    for bi := 0; bi < blockRows; bi++ {
        for bj := 0; bj < blockCols; bj++ {
            // Copy block from (bi, bj) to transposed position (bj, bi)
            for i := 0; i < k; i++ {
                for j := 0; j < k; j++ {
                    srcRow := bi*k + i
                    srcCol := bj*k + j
                    dstRow := bj*k + i
                    dstCol := bi*k + j
                    result[dstRow][dstCol] = matrix[srcRow][srcCol]
                }
            }
        }
    }

    return result
}

// BlockMatrixTransposeWithBlockTranspose also transposes within each block
func BlockMatrixTransposeWithBlockTranspose(matrix [][]int, k int) [][]int {
    if len(matrix) == 0 || len(matrix[0]) == 0 || k <= 0 {
        return matrix
    }

    m, n := len(matrix), len(matrix[0])
    blockRows := m / k
    blockCols := n / k

    result := make([][]int, n)
    for i := range result {
        result[i] = make([]int, m)
    }

    for bi := 0; bi < blockRows; bi++ {
        for bj := 0; bj < blockCols; bj++ {
            for i := 0; i < k; i++ {
                for j := 0; j < k; j++ {
                    srcRow := bi*k + i
                    srcCol := bj*k + j
                    // Transpose within block
                    dstRow := bj*k + j
                    dstCol := bi*k + i
                    result[dstRow][dstCol] = matrix[srcRow][srcCol]
                }
            }
        }
    }

    return result
}

func main() {
    matrix := [][]int{
        {1, 2, 3, 4},
        {5, 6, 7, 8},
        {9, 10, 11, 12},
        {13, 14, 15, 16},
    }
    result := BlockMatrixTranspose(matrix, 2)
    fmt.Println("Block transpose (k=2):")
    for _, row := range result {
        fmt.Println(row)
    }
}`
        },
        twists: [
            { title: 'Block Transpose with Internal Transpose', difficulty: 'Hard', description: 'Transpose the block positions AND transpose elements within each block. Double transposition at two levels.', whyDifferent: 'Each element undergoes two coordinate transformations: its position within the block transposes, and the block itself moves.', example: 'matrix 4x4, k=2. Block (0,0) [[1,2],[5,6]] -> transposed block [[1,5],[2,6]] placed at (0,0) of result.' },
            { title: 'Block Rotate 90', difficulty: 'Hard', description: 'Instead of transposing blocks, rotate each block 90 degrees clockwise in its position, and also rotate block positions.', whyDifferent: 'Rotation is not the same as transposition. Requires applying 90-degree rotation both at the block level and within each block.', example: 'matrix 4x4, k=2. Each 2x2 block is rotated 90 degrees, and blocks are rearranged as if the block grid was rotated.' },
            { title: 'Non-Uniform Block Sizes', difficulty: 'Very Hard', description: 'The matrix is divided into blocks of varying sizes (given by a partition specification). Transpose the block structure.', whyDifferent: 'Variable block sizes mean you cannot use simple index arithmetic. Must handle each block boundary individually.', example: 'matrix 4x4 with blocks [2x1, 2x3] in first row, [2x1, 2x3] in second row. Transpose the block layout.' },
            { title: 'In-Place Block Transpose', difficulty: 'Very Hard', description: 'For a square matrix where k divides n, perform block transpose in-place with O(1) extra space.', whyDifferent: 'Must swap blocks without auxiliary storage, cycling through block positions similarly to in-place matrix transpose.', example: 'matrix 4x4, k=2. Swap block(0,1) with block(1,0) in-place. Diagonal blocks stay.' },
            { title: 'Block Transpose with Padding', difficulty: 'Hard', description: 'Matrix dimensions are not divisible by k. Pad with zeros to make dimensions divisible, then perform block transpose.', whyDifferent: 'Padding changes the matrix dimensions and adds zeros that must be tracked or removed from the final output.', example: 'matrix 3x5, k=2. Pad to 4x6, transpose blocks, then optionally trim. Result dimensions change.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 06-transpose-matrix
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/03-block-matrix-transpose', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/03-block-matrix-transpose'] = problem;

})();
