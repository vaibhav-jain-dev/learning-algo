/**
 * Possible Bipartition
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-coloring
 */
(function() {
    'use strict';

    const problem = {
        name: 'Possible Bipartition',
        difficulty: 'Medium',
        algorithm: 'graph-coloring',
        parent: '09-two-colorable',
        description: 'We want to split a group of n people into two groups. Given dislikes[i] = [ai, bi] where person ai dislikes person bi, return true if it\'s possible to split everyone into two groups such that no two people who dislike each other are in the same group.',
        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
        },
        hints: [
            'Think about how to traverse all connected cells from a starting point.',
            'Use DFS or BFS to explore all 4-directional neighbors.',
            'Mark cells as visited to avoid counting them twice.',
            'Track the metric you need (area, count) during traversal.',
            'Consider edge cases: empty grid, all water, all land.'
        ],
        examples: [
    {
        input: {
        "n": 4,
        "dislikes": [
                [
                        1,
                        2
                ],
                [
                        1,
                        3
                ],
                [
                        2,
                        4
                ]
        ]
},
        output: true,
        explanation: 'Exploring the graph structure, we find the required path or value. For input n=4, dislikes=[[1, 2], [1, 3], [2, 4]], the result is true.'
    },
    {
        input: {
        "n": 3,
        "dislikes": [
                [
                        1,
                        2
                ],
                [
                        1,
                        3
                ],
                [
                        2,
                        3
                ]
        ]
},
        output: false,
        explanation: 'Exploring the graph structure, we find the required path or value. For input n=3, dislikes=[[1, 2], [1, 3], [2, 3]], the result is false.'
    }
        ],
        solutions: {
            python: `from collections import defaultdict, deque

def possibleBipartition(n, dislikes):
    """
    Possible Bipartition - Graph Coloring (Bipartite Check)

    Build a graph where edges connect people who dislike each other.
    Check if this graph is bipartite (2-colorable).

    Time: O(V + E)
    Space: O(V + E)
    """
    # Build adjacency list (people are 1-indexed)
    graph = defaultdict(list)
    for a, b in dislikes:
        graph[a].append(b)
        graph[b].append(a)

    color = {}  # person -> color (0 or 1)

    def bfs(start):
        queue = deque([start])
        color[start] = 0

        while queue:
            person = queue.popleft()

            for enemy in graph[person]:
                if enemy not in color:
                    color[enemy] = 1 - color[person]
                    queue.append(enemy)
                elif color[enemy] == color[person]:
                    return False

        return True

    # Check each connected component
    for person in range(1, n + 1):
        if person not in color:
            if not bfs(person):
                return False

    return True


# Test
if __name__ == "__main__":
    # Test case 1: Can partition
    print(possibleBipartition(4, [[1,2],[1,3],[2,4]]))  # True

    # Test case 2: Cannot partition (triangle of dislikes)
    print(possibleBipartition(3, [[1,2],[1,3],[2,3]]))  # False

    # Test case 3: Can partition
    print(possibleBipartition(5, [[1,2],[2,3],[3,4],[4,5],[1,5]]))  # False`,
            go: `package main

import "fmt"

// PossibleBipartition checks if n people can be split into 2 groups
// Time: O(V+E), Space: O(V+E)
func PossibleBipartition(n int, dislikes [][]int) bool {
    // Build adjacency list
    graph := make([][]int, n+1)
    for i := range graph {
        graph[i] = []int{}
    }

    for _, d := range dislikes {
        a, b := d[0], d[1]
        graph[a] = append(graph[a], b)
        graph[b] = append(graph[b], a)
    }

    color := make([]int, n+1)
    for i := range color {
        color[i] = -1 // -1 = uncolored
    }

    bfs := func(start int) bool {
        queue := []int{start}
        color[start] = 0

        for len(queue) > 0 {
            person := queue[0]
            queue = queue[1:]

            for _, enemy := range graph[person] {
                if color[enemy] == -1 {
                    color[enemy] = 1 - color[person]
                    queue = append(queue, enemy)
                } else if color[enemy] == color[person] {
                    return false
                }
            }
        }

        return true
    }

    // Check each connected component
    for person := 1; person <= n; person++ {
        if color[person] == -1 {
            if !bfs(person) {
                return false
            }
        }
    }

    return true
}

func main() {
    // Test case 1: Can partition
    fmt.Println(PossibleBipartition(4, [][]int{{1, 2}, {1, 3}, {2, 4}})) // true

    // Test case 2: Cannot partition
    fmt.Println(PossibleBipartition(3, [][]int{{1, 2}, {1, 3}, {2, 3}})) // false

    // Test case 3
    fmt.Println(PossibleBipartition(5, [][]int{{1, 2}, {2, 3}, {3, 4}, {4, 5}, {1, 5}})) // false
}`
        },
        twists: [
            { title: 'Three Groups', difficulty: 'Very Hard', description: 'Split people into three groups instead of two, such that no two people who dislike each other are in the same group.', whyDifferent: '3-coloring is NP-complete. You cannot use simple BFS coloring. Backtracking or constraint satisfaction is needed, fundamentally harder than bipartite checking.', example: 'People 1-4, dislikes: [1-2, 2-3, 3-4, 4-1]. Not 2-partitionable (4-cycle is ok actually, but triangle is not). 3 groups: {1,3}, {2,4}, {} works for 4-cycle.' },
            { title: 'Minimize Group Size Difference', difficulty: 'Hard', description: 'If bipartition is possible, find the partition that minimizes the difference in group sizes.', whyDifferent: 'Each connected component has exactly 2 colorings (swap colors). You choose the coloring per component that best balances total group sizes, a subset sum variant.', example: 'Component A: 3 in group 1, 7 in group 2. Component B: 5 in group 1, 4 in group 2. Choose to swap A: 7+5=12 vs 3+4=7 (diff=5) or not swap: 3+5=8 vs 7+4=11 (diff=3). Minimum diff: 3.' },
            { title: 'Dislike Chains', difficulty: 'Medium', description: 'If person A dislikes B and B dislikes C, then A and C must be in the same group (enemy of enemy is friend). Verify this constraint.', whyDifferent: 'This is exactly what 2-coloring enforces, but the twist makes you think about it from a transitive constraint perspective rather than graph coloring.', example: '1 dislikes 2, 2 dislikes 3. So 1 and 3 are in the same group. If 1 also dislikes 3, bipartition fails.' },
            { title: 'Dynamic Dislikes', difficulty: 'Hard', description: 'Dislike pairs are added one at a time. After each addition, report if bipartition is still possible.', whyDifferent: 'Online bipartiteness checking requires Union-Find with complementary sets. When adding edge (a,b), you union a with complement of b and vice versa.', example: 'Add dislike (1,2): possible. Add (2,3): possible. Add (1,3): now 1,2,3 form a triangle, impossible.' },
            { title: 'Weighted Dislikes', difficulty: 'Hard', description: 'Each dislike has a weight. Partition into two groups minimizing the total weight of violated dislikes (cross-group dislikes are satisfied, same-group dislikes are violations).', whyDifferent: 'If perfect bipartition is impossible, you solve a weighted max-cut problem to minimize violation weight, which is NP-hard in general but has approximation algorithms.', example: 'Dislikes: (1,2 weight 5), (2,3 weight 1), (1,3 weight 2). Triangle, must violate one. Violate (2,3) with weight 1 is optimal.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '09-two-colorable/02-possible-bipartition', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/09-two-colorable/02-possible-bipartition'] = problem;

})();
