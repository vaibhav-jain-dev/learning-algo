/**
 * Reverse Spiral Outside-In CCW
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/03-anti-spiral-traverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Spiral Outside-In CCW',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/03-anti-spiral-traverse',
        description: 'Traverse the matrix counterclockwise starting from the outside (top-left, going down first) spiraling inward. Combines counterclockwise direction with outside-in progression.',
        problem: 'Use boundary variables and traverse in CCW order: down the left, right along bottom, up the right, left along top. Shrink boundaries inward.',
        hints: ["Start at top-left corner going down.", "Direction order: down, right, up, left.", "Shrink boundaries after each direction pass.", "This is the same as counterclockwise spiral from outside."],
        complexity: { time: 'O(m*n)', space: 'O(m*n)' },
        examples: [
            { input: {"matrix": [[1, 2, 3], [4, 5, 6], [7, 8, 9]]}, output: [1, 4, 7, 8, 9, 6, 3, 2, 5], explanation: 'Down: 1,4,7. Right: 8,9. Up: 6,3. Left: 2. Center: 5.' },
            { input: {"matrix": [[1, 2], [3, 4]]}, output: [1, 3, 4, 2], explanation: 'Down: 1,3. Right: 4. Up: 2.' }
        ],
        solutions: {
            python: `def reverse_spiral_ccw(matrix):
    if not matrix: return []
    result = []
    top,bottom = 0,len(matrix)-1
    left,right = 0,len(matrix[0])-1
    while top<=bottom and left<=right:
        for r in range(top,bottom+1): result.append(matrix[r][left])
        left+=1
        for c in range(left,right+1): result.append(matrix[bottom][c])
        bottom-=1
        if left<=right:
            for r in range(bottom,top-1,-1): result.append(matrix[r][right])
            right-=1
        if top<=bottom:
            for c in range(right,left-1,-1): result.append(matrix[top][c])
            top+=1
    return result

if __name__=="__main__":
    print(reverse_spiral_ccw([[1,2,3],[4,5,6],[7,8,9]]))`,
            go: `package main
import "fmt"
func reverseSpiralCCW(matrix [][]int) []int {
    if len(matrix)==0 { return nil }
    result := []int{}
    top,bottom := 0,len(matrix)-1
    left,right := 0,len(matrix[0])-1
    for top<=bottom && left<=right {
        for r:=top;r<=bottom;r++ { result=append(result,matrix[r][left]) }
        left++
        for c:=left;c<=right;c++ { result=append(result,matrix[bottom][c]) }
        bottom--
        if left<=right { for r:=bottom;r>=top;r-- { result=append(result,matrix[r][right]) }; right-- }
        if top<=bottom { for c:=right;c>=left;c-- { result=append(result,matrix[top][c]) }; top++ }
    }
    return result
}
func main() { fmt.Println(reverseSpiralCCW([][]int{{1,2,3},{4,5,6},{7,8,9}})) }`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/03-anti-spiral-traverse/twist-02-reverse-spiral-outside-in-ccw', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/03-anti-spiral-traverse/twist-02-reverse-spiral-outside-in-ccw'] = problem;
})();
