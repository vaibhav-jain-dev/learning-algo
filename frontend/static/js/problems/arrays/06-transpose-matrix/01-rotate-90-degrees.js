/**
 * Rotate 90 Degrees
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rotate 90 Degrees',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        parent: '06-transpose-matrix',
        description: 'Given an n x n 2D square matrix representing an image, rotate the matrix by 90 degrees clockwise **in-place**. You must modify the input matrix directly. Do NOT allocate another 2D matrix for the rotation.',
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
        input: {
          "matrix": [
            "\\n    [1",
            2,
            "3]",
            "\\n    [4",
            5,
            "6]",
            "\\n    [7",
            8,
            "9]\\n"
          ]
        },
        output: "[\n    [7, 4, 1],\n    [8, 5, 2],\n    [9, 6, 3]\n]",
        explanation: 'Given the input, the algorithm processes it to produce [\n    [7, 4, 1],\n    [8, 5, 2],\n    [9, 6, 3]\n]'
    },
    {
        input: {
          "matrix": [
            "\\n    [1",
            2,
            3,
            "4]",
            "\\n    [5",
            6,
            7,
            "8]",
            "\\n    [9",
            10,
            11,
            "12]",
            "\\n    [13",
            14,
            15,
            "16]\\n"
          ]
        },
        output: "[\n    [13, 9,  5, 1],\n    [14, 10, 6, 2],\n    [15, 11, 7, 3],\n    [16, 12, 8, 4]\n]",
        explanation: 'Given the input, the algorithm processes it to produce [\n    [13, 9,  5, 1],\n    [14, 10, 6, 2],\n    [15, 11, 7, 3],\n    [16, 12, 8, 4]\n]'
    }
        ],
        solutions: {
            python: `def rotate90Degrees(matrix):
    """
    Rotate 90 Degrees Clockwise (In-Place)

    Rotates an n x n matrix 90 degrees clockwise in-place.

    Key insight: 90-degree clockwise rotation = Transpose + Reverse each row
    Or equivalently: process layer by layer, rotating 4 elements at a time

    Time: O(n^2) where n is the dimension
    Space: O(1) - in-place rotation

    Args:
        matrix: n x n 2D list (modified in-place)

    Returns:
        The rotated matrix (same reference)
    """
    n = len(matrix)

    # Method: Transpose then reverse each row

    # Step 1: Transpose (swap matrix[i][j] with matrix[j][i])
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    # Step 2: Reverse each row
    for i in range(n):
        matrix[i].reverse()

    return matrix


def rotate90DegreesLayerMethod(matrix):
    """
    Alternative: Layer-by-layer rotation
    Process each layer from outside to inside, rotating 4 elements at a time.
    """
    n = len(matrix)

    # Process layer by layer
    for layer in range(n // 2):
        first = layer
        last = n - 1 - layer

        for i in range(first, last):
            offset = i - first

            # Save top
            top = matrix[first][i]

            # Left -> Top
            matrix[first][i] = matrix[last - offset][first]

            # Bottom -> Left
            matrix[last - offset][first] = matrix[last][last - offset]

            # Right -> Bottom
            matrix[last][last - offset] = matrix[i][last]

            # Top -> Right
            matrix[i][last] = top

    return matrix


# Test
if __name__ == "__main__":
    matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]
    print(rotate90Degrees(matrix))
    # [[7, 4, 1], [8, 5, 2], [9, 6, 3]]`,
            go: `package main

import "fmt"

// Rotate90Degrees rotates an n x n matrix 90 degrees clockwise in-place
// Time: O(n^2), Space: O(1)
func Rotate90Degrees(matrix [][]int) [][]int {
    n := len(matrix)

    // Step 1: Transpose
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
        }
    }

    // Step 2: Reverse each row
    for i := 0; i < n; i++ {
        for left, right := 0, n-1; left < right; left, right = left+1, right-1 {
            matrix[i][left], matrix[i][right] = matrix[i][right], matrix[i][left]
        }
    }

    return matrix
}

// Rotate90DegreesLayerMethod uses layer-by-layer rotation
func Rotate90DegreesLayerMethod(matrix [][]int) [][]int {
    n := len(matrix)

    for layer := 0; layer < n/2; layer++ {
        first := layer
        last := n - 1 - layer

        for i := first; i < last; i++ {
            offset := i - first

            // Save top
            top := matrix[first][i]

            // Left -> Top
            matrix[first][i] = matrix[last-offset][first]

            // Bottom -> Left
            matrix[last-offset][first] = matrix[last][last-offset]

            // Right -> Bottom
            matrix[last][last-offset] = matrix[i][last]

            // Top -> Right
            matrix[i][last] = top
        }
    }

    return matrix
}

func main() {
    matrix := [][]int{
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9},
    }
    fmt.Println(Rotate90Degrees(matrix))
    // [[7 4 1] [8 5 2] [9 6 3]]
}`
        },
        twists: [
            { title: 'Rotate 180 Degrees', difficulty: 'Easy', description: 'Rotate the matrix by 180 degrees in-place. Each element moves to the diagonally opposite position.', whyDifferent: 'Simpler than 90-degree: just reverse all rows and then reverse element order within each row (or reverse the entire flat array).', example: 'matrix = [[1,2],[3,4]]. Result: [[4,3],[2,1]].' },
            { title: 'Rotate Counterclockwise 90', difficulty: 'Medium', description: 'Rotate the matrix 90 degrees counterclockwise instead of clockwise.', whyDifferent: 'Transpose + reverse columns (instead of rows), or reverse rows first then transpose. Direction change alters the composition.', example: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]. Result: [[3,6,9],[2,5,8],[1,4,7]].' },
            { title: 'Rotate Rectangular Matrix', difficulty: 'Hard', description: 'Rotate a non-square m x n matrix by 90 degrees. The result will be n x m. Cannot be done in-place.', whyDifferent: 'Dimensions change, so in-place is impossible. Must allocate a new matrix and map coordinates correctly.', example: 'matrix = [[1,2,3],[4,5,6]]. 2x3 -> 3x2. Result: [[4,1],[5,2],[6,3]].' },
            { title: 'Rotate by K*90 Degrees', difficulty: 'Medium', description: 'Rotate by K * 90 degrees where K can be any integer. Optimize by reducing K mod 4.', whyDifferent: 'Must recognize that K mod 4 determines the actual rotation, then apply the appropriate transformation.', example: 'matrix = [[1,2],[3,4]], K = 7. 7 mod 4 = 3. Rotate 270 degrees (same as 90 CCW).' },
            { title: 'Rotate Ring Only', difficulty: 'Hard', description: 'Rotate only the outermost ring of the matrix by 90 degrees, leaving inner elements unchanged.', whyDifferent: 'Must extract the ring, rotate its elements, and place them back. Inner layers remain untouched.', example: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]. Rotate outer ring: [[7,4,1],[8,5,2],[9,6,3]]. Center 5 stays.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 06-transpose-matrix
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/01-rotate-90-degrees', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/01-rotate-90-degrees'] = problem;

})();
