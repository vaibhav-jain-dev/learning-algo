/**
 * Sliding Puzzle
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: a-star-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sliding Puzzle',
        difficulty: 'Hard',
        algorithm: 'a-star-bfs',
        parent: '08-a-star-algorithm',
        description: 'On a 2x3 board, there are 5 tiles labeled 1 to 5, and an empty square represented by 0. A move consists of choosing 0 and a 4-directionally adjacent number and swapping them. The state of the board is solved if and only if the board is [[1,2,3],[4,5,0]]. Given the puzzle board, return the least number of moves required to solve the puzzle. If it is impossible to solve, return -1.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O((mn)!)',
            space: 'O((mn)!)'
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
        "board": [
                [
                        1,
                        2,
                        3
                ],
                [
                        4,
                        0,
                        5
                ]
        ]
},
        output: 1,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input board=[[1, 2, 3], [4, 0, 5]], the result is 1.'
    }
        ],
        solutions: {
            python: `def slidingPuzzle(data):
    """
    Sliding Puzzle using A*/BFS

    Uses Manhattan distance sum as heuristic for A*.

    Time: O((mn)!) - worst case all states
    Space: O((mn)!)
    """
    import heapq

    board = data["board"]
    target = "123450"

    # Convert board to string
    start = "".join(str(num) for row in board for num in row)

    if start == target:
        return 0

    # Possible moves for position 0 at each index (2x3 board)
    # Index: 0 1 2
    #        3 4 5
    neighbors = {
        0: [1, 3],
        1: [0, 2, 4],
        2: [1, 5],
        3: [0, 4],
        4: [1, 3, 5],
        5: [2, 4]
    }

    # Manhattan distance heuristic
    def heuristic(state):
        distance = 0
        for i, ch in enumerate(state):
            if ch != '0':
                val = int(ch)
                target_row, target_col = (val - 1) // 3, (val - 1) % 3
                curr_row, curr_col = i // 3, i % 3
                distance += abs(target_row - curr_row) + abs(target_col - curr_col)
        return distance

    # A* algorithm
    # (f_score, moves, state)
    start_h = heuristic(start)
    min_heap = [(start_h, 0, start)]
    visited = {start}

    while min_heap:
        f, moves, state = heapq.heappop(min_heap)

        if state == target:
            return moves

        # Find position of 0
        zero_pos = state.index('0')

        # Try all possible swaps
        for next_pos in neighbors[zero_pos]:
            state_list = list(state)
            state_list[zero_pos], state_list[next_pos] = state_list[next_pos], state_list[zero_pos]
            new_state = "".join(state_list)

            if new_state not in visited:
                visited.add(new_state)
                new_moves = moves + 1
                new_f = new_moves + heuristic(new_state)
                heapq.heappush(min_heap, (new_f, new_moves, new_state))

    return -1


# Test
if __name__ == "__main__":
    data = {"board": [[1,2,3], [4,0,5]]}
    print(slidingPuzzle(data))  # Output: 1`,
            go: `package main

import (
    "container/heap"
    "fmt"
    "strconv"
    "strings"
)

type PuzzleState struct {
    f, moves int
    state    string
}

type PuzzleHeap []PuzzleState

func (h PuzzleHeap) Len() int           { return len(h) }
func (h PuzzleHeap) Less(i, j int) bool { return h[i].f < h[j].f }
func (h PuzzleHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *PuzzleHeap) Push(x interface{}) { *h = append(*h, x.(PuzzleState)) }
func (h *PuzzleHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

// SlidingPuzzle uses A* algorithm.
// Time: O((mn)!), Space: O((mn)!)
func SlidingPuzzle(data map[string]interface{}) int {
    boardRaw := data["board"].([]interface{})
    target := "123450"

    // Convert board to string
    var sb strings.Builder
    for _, row := range boardRaw {
        r := row.([]interface{})
        for _, v := range r {
            sb.WriteString(strconv.Itoa(int(v.(float64))))
        }
    }
    start := sb.String()

    if start == target {
        return 0
    }

    // Neighbors for each position
    neighbors := map[int][]int{
        0: {1, 3},
        1: {0, 2, 4},
        2: {1, 5},
        3: {0, 4},
        4: {1, 3, 5},
        5: {2, 4},
    }

    abs := func(x int) int {
        if x < 0 {
            return -x
        }
        return x
    }

    // Manhattan distance heuristic
    heuristic := func(state string) int {
        distance := 0
        for i, ch := range state {
            if ch != '0' {
                val := int(ch - '0')
                targetRow, targetCol := (val-1)/3, (val-1)%3
                currRow, currCol := i/3, i%3
                distance += abs(targetRow-currRow) + abs(targetCol-currCol)
            }
        }
        return distance
    }

    // A* algorithm
    startH := heuristic(start)
    h := &PuzzleHeap{{startH, 0, start}}
    heap.Init(h)
    visited := map[string]bool{start: true}

    for h.Len() > 0 {
        curr := heap.Pop(h).(PuzzleState)

        if curr.state == target {
            return curr.moves
        }

        // Find position of 0
        zeroPos := strings.Index(curr.state, "0")

        // Try all swaps
        for _, nextPos := range neighbors[zeroPos] {
            stateBytes := []byte(curr.state)
            stateBytes[zeroPos], stateBytes[nextPos] = stateBytes[nextPos], stateBytes[zeroPos]
            newState := string(stateBytes)

            if !visited[newState] {
                visited[newState] = true
                newMoves := curr.moves + 1
                newF := newMoves + heuristic(newState)
                heap.Push(h, PuzzleState{newF, newMoves, newState})
            }
        }
    }

    return -1
}

func main() {
    data := map[string]interface{}{
        "board": []interface{}{
            []interface{}{float64(1), float64(2), float64(3)},
            []interface{}{float64(4), float64(0), float64(5)},
        },
    }
    fmt.Println(SlidingPuzzle(data)) // 1
}`
        },
        twists: [
            { title: 'Solvability Check', difficulty: 'Medium', description: 'Before solving, determine if the puzzle is solvable by counting inversions in the flattened sequence.', whyDifferent: 'Uses a mathematical property (inversion count parity) to determine solvability in O(n^2) without any search, a completely different approach from BFS/A*.', example: 'For a 2x3 board, count pairs (a,b) where a appears before b but a > b (excluding 0). If inversion count parity matches the blank position, the puzzle is solvable.' },
            { title: 'IDA* Approach', difficulty: 'Hard', description: 'Solve the sliding puzzle using Iterative Deepening A* (IDA*) to save memory compared to standard A*.', whyDifferent: 'IDA* uses DFS with an increasing f-cost threshold instead of maintaining a priority queue, trading time (re-exploration) for dramatically reduced memory usage.', example: 'Set threshold to initial heuristic. DFS prunes branches exceeding threshold. If unsolved, increase threshold to the minimum pruned f-cost and repeat.' },
            { title: 'Larger Puzzle (3x3 or 4x4)', difficulty: 'Very Hard', description: 'Scale the solution to a 3x3 (8-puzzle) or 4x4 (15-puzzle) board.', whyDifferent: 'The state space explodes (9!/2 = 181,440 for 8-puzzle, 16!/2 ~ 10^13 for 15-puzzle), requiring more sophisticated heuristics like pattern databases.', example: 'The 15-puzzle cannot be solved by brute-force BFS. Need IDA* with Manhattan distance heuristic or pattern database heuristic.' },
            { title: 'Bidirectional BFS', difficulty: 'Hard', description: 'Solve the puzzle using bidirectional BFS -- searching forward from initial state and backward from goal, meeting in the middle.', whyDifferent: 'Explores roughly sqrt(N) states from each direction instead of N total, significantly reducing the search space for puzzles with large state spaces.', example: 'Forward BFS from initial state and backward BFS from [[1,2,3],[4,5,0]]. When they share a state, combine the two half-paths.' },
            { title: 'Count Minimum Moves Only', difficulty: 'Medium', description: 'Return just the move count without tracking the actual sequence of moves or states.', whyDifferent: 'Can use A* without storing the path, only the move count in each state, reducing memory overhead per state from O(moves) to O(1) extra.', example: 'For board [[4,1,2],[5,0,3]], return 5 (minimum moves) without specifying which tiles to move in what order.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/02-sliding-puzzle', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/02-sliding-puzzle'] = problem;

})();
