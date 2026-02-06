/**
 * Anti-Spiral by Layers
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/03-anti-spiral-traverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Anti-Spiral by Layers',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/03-anti-spiral-traverse',
        description: 'Return the anti-spiral traversal grouped by layers. Each layer is a separate sub-array in the result. Layer 0 is the center, layer 1 is the ring around it, and so on.',
        problem: 'Perform center-outward anti-spiral traversal but track which layer each element belongs to based on its distance from the center. Group elements by layer.',
        hints: ["Calculate each cell layer as min(row, col, rows-1-row, cols-1-col).", "The center is the highest layer number; invert for center-out ordering.", "Group spiral elements by their layer.", "Return array of arrays, one per layer."],
        complexity: { time: 'O(m*n)', space: 'O(m*n)' },
        examples: [
            { input: {"matrix": [[1, 2, 3], [4, 5, 6], [7, 8, 9]]}, output: [[5], [4, 7, 8, 9, 6, 3, 2, 1]], explanation: 'Layer 0 (center): [5]. Layer 1 (ring): [4,7,8,9,6,3,2,1].' },
            { input: {"matrix": [[1, 2], [3, 4]]}, output: [[1, 2, 4, 3]], explanation: '2x2 matrix is all one layer.' }
        ],
        solutions: {
            python: `def anti_spiral_by_layers(matrix):
    if not matrix: return []
    rows, cols = len(matrix), len(matrix[0])
    max_layer = min(rows,cols)//2
    # Center-out spiral
    r,c = (rows-1)//2, (cols-1)//2
    dr,dc = [-1,0,1,0], [0,-1,0,1]  # CCW: left,down,right,up
    visited = [[False]*cols for _ in range(rows)]
    layers = {}
    direction,steps,st,tc = 0,1,0,0
    count = 0
    while count < rows*cols:
        if 0<=r<rows and 0<=c<cols and not visited[r][c]:
            visited[r][c] = True
            layer = min(r,c,rows-1-r,cols-1-c)
            inv_layer = max_layer - layer
            if inv_layer not in layers: layers[inv_layer] = []
            layers[inv_layer].append(matrix[r][c])
            count += 1
        r+=dr[direction]; c+=dc[direction]; st+=1
        if st==steps:
            st=0; direction=(direction+1)%4; tc+=1
            if tc%2==0: steps+=1
    return [layers[k] for k in sorted(layers.keys())]

if __name__=="__main__":
    print(anti_spiral_by_layers([[1,2,3],[4,5,6],[7,8,9]]))`,
            go: `package main
import "fmt"
func antiSpiralByLayers(matrix [][]int) [][]int {
    if len(matrix)==0 { return nil }
    rows,cols := len(matrix),len(matrix[0])
    maxLayer := rows; if cols<rows { maxLayer=cols }; maxLayer/=2
    r,c := (rows-1)/2,(cols-1)/2
    dr,dc := []int{-1,0,1,0},[]int{0,-1,0,1}
    visited := make([][]bool,rows)
    for i:=range visited { visited[i]=make([]bool,cols) }
    layers := map[int][]int{}
    dir,steps,st,tc,count := 0,1,0,0,0
    for count<rows*cols {
        if r>=0&&r<rows&&c>=0&&c<cols&&!visited[r][c] {
            visited[r][c]=true
            mn := r; if c<mn{mn=c}; if rows-1-r<mn{mn=rows-1-r}; if cols-1-c<mn{mn=cols-1-c}
            layers[maxLayer-mn] = append(layers[maxLayer-mn],matrix[r][c])
            count++
        }
        r+=dr[dir]; c+=dc[dir]; st++
        if st==steps { st=0; dir=(dir+1)%4; tc++; if tc%2==0{steps++} }
    }
    result := [][]int{}
    for i:=0;i<=maxLayer;i++ { if v,ok:=layers[i];ok { result=append(result,v) } }
    return result
}
func main() { fmt.Println(antiSpiralByLayers([][]int{{1,2,3},{4,5,6},{7,8,9}})) }`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/03-anti-spiral-traverse/twist-03-anti-spiral-by-layers', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/03-anti-spiral-traverse/twist-03-anti-spiral-by-layers'] = problem;
})();
