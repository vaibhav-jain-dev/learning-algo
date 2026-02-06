/**
 * Anti-Spiral Non-Square
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/03-anti-spiral-traverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Anti-Spiral Non-Square',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/03-anti-spiral-traverse',
        description: 'Perform anti-spiral traversal (center outward, counterclockwise) on a non-square rectangular matrix where the center may be a row segment or column segment rather than a single cell.',
        problem: 'For non-square matrices, the center region is the innermost row or column segment. Start the anti-spiral from this center region and expand outward.',
        hints: ["For even-by-odd or odd-by-even, center may be a 1xK or Kx1 segment.", "Start by visiting the center segment, then spiral outward.", "Handle the asymmetry where one dimension is exhausted before the other.", "Use visited tracking to avoid revisiting cells."],
        complexity: { time: 'O(m*n)', space: 'O(m*n)' },
        examples: [
            { input: {"matrix": [[1, 2, 3, 4], [5, 6, 7, 8]]}, output: [6, 5, 1, 2, 3, 4, 8, 7], explanation: 'Center of 2x4 is at row boundary. Start near (0,1)/(1,1), spiral outward.' },
            { input: {"matrix": [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]}, output: [5, 4, 7, 8, 9, 6, 3, 2, 1, 10, 11, 12], explanation: '4x3 center is (1,1). Spiral outward counterclockwise.' }
        ],
        solutions: {
            python: `def anti_spiral_non_square(matrix):
    if not matrix: return []
    rows,cols = len(matrix),len(matrix[0])
    r,c = (rows-1)//2, (cols-1)//2
    dr,dc = [0,1,0,-1],[- 1,0,1,0]  # left,down,right,up
    visited = [[False]*cols for _ in range(rows)]
    result = []
    direction,steps,st,tc = 0,1,0,0
    while len(result)<rows*cols:
        if 0<=r<rows and 0<=c<cols and not visited[r][c]:
            visited[r][c]=True
            result.append(matrix[r][c])
        r+=dr[direction]; c+=dc[direction]; st+=1
        if st==steps:
            st=0; direction=(direction+1)%4; tc+=1
            if tc%2==0: steps+=1
    return result

if __name__=="__main__":
    print(anti_spiral_non_square([[1,2,3,4],[5,6,7,8]]))`,
            go: `package main
import "fmt"
func antiSpiralNonSquare(matrix [][]int) []int {
    if len(matrix)==0 { return nil }
    rows,cols := len(matrix),len(matrix[0])
    r,c := (rows-1)/2,(cols-1)/2
    dr,dc := []int{0,1,0,-1},[]int{-1,0,1,0}
    visited := make([][]bool,rows)
    for i:=range visited { visited[i]=make([]bool,cols) }
    result := []int{}
    dir,steps,st,tc := 0,1,0,0
    for len(result)<rows*cols {
        if r>=0&&r<rows&&c>=0&&c<cols&&!visited[r][c] {
            visited[r][c]=true; result=append(result,matrix[r][c])
        }
        r+=dr[dir]; c+=dc[dir]; st++
        if st==steps { st=0; dir=(dir+1)%4; tc++; if tc%2==0{steps++} }
    }
    return result
}
func main() { fmt.Println(antiSpiralNonSquare([][]int{{1,2,3,4},{5,6,7,8}})) }`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/03-anti-spiral-traverse/twist-04-anti-spiral-non-square', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/03-anti-spiral-traverse/twist-04-anti-spiral-non-square'] = problem;
})();
