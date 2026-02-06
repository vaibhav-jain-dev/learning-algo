/**
 * Anti-Spiral Clockwise
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/03-anti-spiral-traverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Anti-Spiral Clockwise',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/03-anti-spiral-traverse',
        description: 'Traverse a matrix from the center outward in clockwise direction (right first, then down, left, up). This is center-outward like anti-spiral but clockwise instead of counterclockwise.',
        problem: 'Start at the center cell and use clockwise direction vectors (right, down, left, up) with expanding step sizes.',
        hints: ["Find center cell at ((rows-1)//2, (cols-1)//2).", "Use direction order: right, down, left, up.", "Step sizes expand as 1,1,2,2,3,3,...", "Filter out-of-bounds positions."],
        complexity: { time: 'O(m*n)', space: 'O(m*n)' },
        examples: [
            { input: {"matrix": [[1, 2, 3], [4, 5, 6], [7, 8, 9]]}, output: [5, 6, 9, 8, 7, 4, 1, 2, 3], explanation: 'Center=5, right=6, down=9, left=8,7, up=4,1, right=2,3.' },
            { input: {"matrix": [[1, 2], [3, 4]]}, output: [1, 2, 4, 3], explanation: 'Center upper-left (0,0)=1. Right=2, down=4, left=3.' }
        ],
        solutions: {
            python: `def anti_spiral_clockwise(matrix):
    if not matrix: return []
    rows, cols = len(matrix), len(matrix[0])
    r, c = (rows-1)//2, (cols-1)//2
    dr, dc = [0,1,0,-1], [1,0,-1,0]
    result, direction = [], 0
    steps, st, tc = 1, 0, 0
    visited = [[False]*cols for _ in range(rows)]
    while len(result) < rows*cols:
        if 0<=r<rows and 0<=c<cols and not visited[r][c]:
            visited[r][c] = True
            result.append(matrix[r][c])
        r+=dr[direction]; c+=dc[direction]; st+=1
        if st==steps:
            st=0; direction=(direction+1)%4; tc+=1
            if tc%2==0: steps+=1
    return result

if __name__=="__main__":
    print(anti_spiral_clockwise([[1,2,3],[4,5,6],[7,8,9]]))`,
            go: `package main
import "fmt"
func antiSpiralClockwise(matrix [][]int) []int {
    if len(matrix)==0 { return nil }
    rows,cols := len(matrix),len(matrix[0])
    r,c := (rows-1)/2,(cols-1)/2
    dr,dc := []int{0,1,0,-1},[]int{1,0,-1,0}
    result := []int{}
    visited := make([][]bool,rows)
    for i:=range visited { visited[i]=make([]bool,cols) }
    dir,steps,st,tc := 0,1,0,0
    for len(result)<rows*cols {
        if r>=0&&r<rows&&c>=0&&c<cols&&!visited[r][c] {
            visited[r][c]=true; result=append(result,matrix[r][c])
        }
        r+=dr[dir]; c+=dc[dir]; st++
        if st==steps { st=0; dir=(dir+1)%4; tc++; if tc%2==0 { steps++ } }
    }
    return result
}
func main() { fmt.Println(antiSpiralClockwise([][]int{{1,2,3},{4,5,6},{7,8,9}})) }`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/03-anti-spiral-traverse/twist-01-anti-spiral-clockwise', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/03-anti-spiral-traverse/twist-01-anti-spiral-clockwise'] = problem;
})();
