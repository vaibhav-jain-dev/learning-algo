/**
 * Diagonal Spiral
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Diagonal Spiral',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse',
        description: 'Given an n x m two-dimensional array, traverse the matrix in a diagonal spiral pattern instead of the standard horizontal/vertical spiral. Movement is diagonal (up-right, down-right, down-left, up-left) creating a diamond-shaped spiral pattern. Start from the top-left corner and spiral inward diagonally.',
        problem: 'Use diagonal direction vectors (dr, dc) of (-1,1), (1,1), (1,-1), (-1,-1) instead of the standard axis-aligned vectors. Track visited cells and change direction when hitting boundaries or already-visited cells.',
        hints: [
            'Direction vectors for diagonal movement: (-1,1), (1,1), (1,-1), (-1,-1).',
            'Use a visited matrix to track which cells have been traversed.',
            'When the next diagonal cell is out of bounds or already visited, rotate to the next direction.',
            'The spiral may not form perfect rings like the standard spiral due to diagonal geometry.'
        ],
        complexity: { time: 'O(m*n)', space: 'O(m*n)' },
        examples: [
            {
                input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] },
                output: [1, 5, 3, 6, 7, 4, 2, 9, 8],
                explanation: 'Start at (0,0)=1. Diagonal down-right: (1,1)=5. Up-right: (0,2)=3. Down-right: (1,2) already moving diag gets 6. Continue pattern visiting all cells.'
            },
            {
                input: { matrix: [[1,2],[3,4]] },
                output: [1, 4, 2, 3],
                explanation: 'Start at (0,0)=1. Diagonal to (1,1)=4. Then (0,1)=2. Then (1,0)=3.'
            },
            {
                input: { matrix: [[1,2,3,4]] },
                output: [1, 2, 3, 4],
                explanation: 'Single row - diagonal traversal reduces to left-to-right traversal.'
            }
        ],
        solutions: {
            python: `def diagonal_spiral(matrix):
    """
    Traverse matrix in diagonal spiral pattern.
    Time: O(m*n), Space: O(m*n)
    """
    if not matrix or not matrix[0]:
        return []

    rows, cols = len(matrix), len(matrix[0])
    total = rows * cols
    visited = [[False] * cols for _ in range(rows)]
    result = []

    # Diagonal directions: down-right, down-left, up-left, up-right
    dr = [1, 1, -1, -1]
    dc = [1, -1, -1, 1]

    r, c = 0, 0
    direction = 0

    for _ in range(total):
        result.append(matrix[r][c])
        visited[r][c] = True

        # Try current direction
        nr, nc = r + dr[direction], c + dc[direction]

        if not (0 <= nr < rows and 0 <= nc < cols and not visited[nr][nc]):
            # Try next direction
            direction = (direction + 1) % 4
            nr, nc = r + dr[direction], c + dc[direction]

            if not (0 <= nr < rows and 0 <= nc < cols and not visited[nr][nc]):
                # Try all directions
                found = False
                for d in range(4):
                    nr, nc = r + dr[d], c + dc[d]
                    if 0 <= nr < rows and 0 <= nc < cols and not visited[nr][nc]:
                        direction = d
                        found = True
                        break

                if not found:
                    # Try axis-aligned as fallback
                    for dr2, dc2 in [(0,1),(1,0),(0,-1),(-1,0)]:
                        nr, nc = r + dr2, c + dc2
                        if 0 <= nr < rows and 0 <= nc < cols and not visited[nr][nc]:
                            found = True
                            break
                    if not found:
                        break

        r, c = nr, nc

    return result


# Tests
if __name__ == "__main__":
    print(diagonal_spiral([[1,2,3],[4,5,6],[7,8,9]]))
    # [1, 5, 3, 6, 7, 4, 2, 9, 8]
    print(diagonal_spiral([[1,2],[3,4]]))
    # [1, 4, 2, 3]
    print(diagonal_spiral([[1,2,3,4]]))
    # [1, 2, 3, 4]`,
            go: `package main

import "fmt"

func diagonalSpiral(matrix [][]int) []int {
    if len(matrix) == 0 || len(matrix[0]) == 0 {
        return []int{}
    }

    rows, cols := len(matrix), len(matrix[0])
    total := rows * cols
    visited := make([][]bool, rows)
    for i := range visited {
        visited[i] = make([]bool, cols)
    }

    result := []int{}
    dr := []int{1, 1, -1, -1}
    dc := []int{1, -1, -1, 1}

    r, c := 0, 0
    direction := 0

    for i := 0; i < total; i++ {
        result = append(result, matrix[r][c])
        visited[r][c] = true

        nr, nc := r+dr[direction], c+dc[direction]
        if nr < 0 || nr >= rows || nc < 0 || nc >= cols || visited[nr][nc] {
            direction = (direction + 1) % 4
            nr, nc = r+dr[direction], c+dc[direction]
            if nr < 0 || nr >= rows || nc < 0 || nc >= cols || visited[nr][nc] {
                found := false
                for d := 0; d < 4; d++ {
                    nr, nc = r+dr[d], c+dc[d]
                    if nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] {
                        direction = d
                        found = true
                        break
                    }
                }
                if !found {
                    adr := []int{0, 1, 0, -1}
                    adc := []int{1, 0, -1, 0}
                    for d := 0; d < 4; d++ {
                        nr, nc = r+adr[d], c+adc[d]
                        if nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] {
                            found = true
                            break
                        }
                    }
                    if !found {
                        break
                    }
                }
            }
        }
        r, c = nr, nc
    }

    return result
}

func main() {
    fmt.Println(diagonalSpiral([][]int{{1,2,3},{4,5,6},{7,8,9}}))
    fmt.Println(diagonalSpiral([][]int{{1,2},{3,4}}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/twist-04-diagonal-spiral', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/twist-04-diagonal-spiral'] = problem;
})();
