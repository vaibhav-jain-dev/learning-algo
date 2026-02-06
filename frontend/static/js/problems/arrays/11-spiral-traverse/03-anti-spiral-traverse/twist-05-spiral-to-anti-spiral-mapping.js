/**
 * Spiral to Anti-Spiral Mapping
 * Category: arrays
 * Difficulty: Very Hard
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/03-anti-spiral-traverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral to Anti-Spiral Mapping',
        difficulty: 'Very Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/03-anti-spiral-traverse',
        description: 'Given a matrix, compute both its standard clockwise spiral and counterclockwise anti-spiral traversals. Return a mapping showing where each position in the spiral maps to in the anti-spiral.',
        problem: 'Generate both traversals independently, creating position-to-value mappings. Then for each spiral position, find the corresponding anti-spiral position of the same cell.',
        hints: ["Generate the standard spiral order and anti-spiral order separately.", "Create a cell-to-position mapping for each traversal.", "For each cell, record (spiral_pos, anti_spiral_pos) pair.", "Return the permutation array."],
        complexity: { time: 'O(m*n)', space: 'O(m*n)' },
        examples: [
            { input: {"matrix": [[1, 2, 3], [4, 5, 6], [7, 8, 9]]}, output: [6, 7, 4, 5, 8, 3, 0, 1, 2], explanation: 'Spiral pos 0 is cell(0,0) which is anti-spiral pos 6. Spiral pos 8 is cell(1,1)=anti-spiral pos 0.' },
            { input: {"matrix": [[1, 2], [3, 4]]}, output: [0, 1, 3, 2], explanation: 'Spiral [1,2,4,3] vs anti-spiral [1,3,4,2]. Cell(0,0): spiral pos 0 -> anti-spiral pos 0.' }
        ],
        solutions: {
            python: `def spiral_to_anti_spiral_mapping(matrix):
    if not matrix: return []
    rows,cols = len(matrix),len(matrix[0])
    def spiral_order():
        res=[]; top,bot,left,right=0,rows-1,0,cols-1
        while top<=bot and left<=right:
            for c in range(left,right+1): res.append((top,c))
            top+=1
            for r in range(top,bot+1): res.append((r,right))
            right-=1
            if top<=bot:
                for c in range(right,left-1,-1): res.append((bot,c))
                bot-=1
            if left<=right:
                for r in range(bot,top-1,-1): res.append((r,left))
                left+=1
        return res
    def anti_spiral_order():
        r,c=(rows-1)//2,(cols-1)//2
        dr,dc=[0,1,0,-1],[-1,0,1,0]
        visited=[[False]*cols for _ in range(rows)]
        res=[]; d,steps,st,tc=0,1,0,0
        while len(res)<rows*cols:
            if 0<=r<rows and 0<=c<cols and not visited[r][c]:
                visited[r][c]=True; res.append((r,c))
            r+=dr[d];c+=dc[d];st+=1
            if st==steps: st=0;d=(d+1)%4;tc+=1;
            if tc%2==0 and st==0: steps+=1
        return res
    sp = spiral_order()
    asp = anti_spiral_order()
    cell_to_anti = {}
    for i,(r,c) in enumerate(asp): cell_to_anti[(r,c)]=i
    return [cell_to_anti[cell] for cell in sp]

if __name__=="__main__":
    print(spiral_to_anti_spiral_mapping([[1,2,3],[4,5,6],[7,8,9]]))`,
            go: `package main
import "fmt"
func spiralToAntiSpiralMapping(matrix [][]int) []int {
    if len(matrix)==0 { return nil }
    rows,cols := len(matrix),len(matrix[0])
    // Generate spiral order
    sp := [][2]int{}
    top,bot,left,right := 0,rows-1,0,cols-1
    for top<=bot && left<=right {
        for c:=left;c<=right;c++ { sp=append(sp,[2]int{top,c}) }; top++
        for r:=top;r<=bot;r++ { sp=append(sp,[2]int{r,right}) }; right--
        if top<=bot { for c:=right;c>=left;c-- { sp=append(sp,[2]int{bot,c}) }; bot-- }
        if left<=right { for r:=bot;r>=top;r-- { sp=append(sp,[2]int{r,left}) }; left++ }
    }
    // Anti-spiral
    asp := [][2]int{}
    visited := make([][]bool,rows)
    for i:=range visited { visited[i]=make([]bool,cols) }
    r,c := (rows-1)/2,(cols-1)/2
    dr,dc := []int{0,1,0,-1},[]int{-1,0,1,0}
    dir,steps,st,tc := 0,1,0,0
    for len(asp)<rows*cols {
        if r>=0&&r<rows&&c>=0&&c<cols&&!visited[r][c] { visited[r][c]=true; asp=append(asp,[2]int{r,c}) }
        r+=dr[dir]; c+=dc[dir]; st++
        if st==steps { st=0; dir=(dir+1)%4; tc++; if tc%2==0{steps++} }
    }
    cellToAnti := map[[2]int]int{}
    for i,p := range asp { cellToAnti[p]=i }
    result := make([]int,len(sp))
    for i,p := range sp { result[i]=cellToAnti[p] }
    return result
}
func main() { fmt.Println(spiralToAntiSpiralMapping([][]int{{1,2,3},{4,5,6},{7,8,9}})) }`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/03-anti-spiral-traverse/twist-05-spiral-to-anti-spiral-mapping', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/03-anti-spiral-traverse/twist-05-spiral-to-anti-spiral-mapping'] = problem;
})();
