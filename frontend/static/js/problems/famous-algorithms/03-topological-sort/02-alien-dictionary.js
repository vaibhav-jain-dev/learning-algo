/**
 * Alien Dictionary
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: topological-sort
 */
(function() {
    'use strict';

    const problem = {
        name: 'Alien Dictionary',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort',
        description: 'There is a new alien language that uses the English alphabet. The order among letters is unknown. You are given a list of strings words from the alien language\'s dictionary, where the strings are sorted lexicographically by the rules of this new language. Derive the order of letters in this language and return it. If no valid order exists, return "". If there are multiple valid orderings, return any of them.',
        complexity: {
            time: 'O(C)',
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
        "words": [
                "wrt",
                "wrf",
                "er",
                "ett",
                "rftt"
        ]
},
        output: "wertf",
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input words=[wrt, wrf, er, ett, rftt], the result is wertf.'
    },
    {
        input: {
        "words": [
                "z",
                "x"
        ]
},
        output: "zx",
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input words=[z, x], the result is zx.'
    }
        ],
        solutions: {
            python: `from collections import deque, defaultdict

def alienOrder(words):
    """
    Alien Dictionary using Topological Sort

    Derive the order of letters from the sorted word list.

    Time: O(C) where C is total characters
    Space: O(1) - at most 26 letters
    """
    # Build graph of character relationships
    graph = defaultdict(set)
    in_degree = {c: 0 for word in words for c in word}

    # Compare adjacent words to find ordering rules
    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        min_len = min(len(w1), len(w2))

        # Check for invalid case: prefix comes after longer word
        if len(w1) > len(w2) and w1[:min_len] == w2[:min_len]:
            return ""

        # Find first differing character
        for j in range(min_len):
            if w1[j] != w2[j]:
                if w2[j] not in graph[w1[j]]:
                    graph[w1[j]].add(w2[j])
                    in_degree[w2[j]] += 1
                break

    # Topological sort using BFS
    queue = deque([c for c in in_degree if in_degree[c] == 0])
    result = []

    while queue:
        c = queue.popleft()
        result.append(c)

        for neighbor in graph[c]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # Check if all characters are included (no cycle)
    if len(result) != len(in_degree):
        return ""

    return "".join(result)


# Test
if __name__ == "__main__":
    print(alienOrder(["wrt","wrf","er","ett","rftt"]))  # Output: "wertf"
    print(alienOrder(["z","x"]))                         # Output: "zx"`,
            go: `package main

import "fmt"

// AlienOrder derives character order from sorted alien dictionary.
// Time: O(C), Space: O(1)
func AlienOrder(words []string) string {
    // Build character set and graph
    inDegree := make(map[byte]int)
    graph := make(map[byte][]byte)

    // Initialize all characters
    for _, word := range words {
        for i := 0; i < len(word); i++ {
            if _, ok := inDegree[word[i]]; !ok {
                inDegree[word[i]] = 0
            }
        }
    }

    // Compare adjacent words
    for i := 0; i < len(words)-1; i++ {
        w1, w2 := words[i], words[i+1]
        minLen := len(w1)
        if len(w2) < minLen {
            minLen = len(w2)
        }

        // Check invalid case
        if len(w1) > len(w2) && w1[:minLen] == w2[:minLen] {
            return ""
        }

        // Find first difference
        for j := 0; j < minLen; j++ {
            if w1[j] != w2[j] {
                // Check if edge already exists
                found := false
                for _, n := range graph[w1[j]] {
                    if n == w2[j] {
                        found = true
                        break
                    }
                }
                if !found {
                    graph[w1[j]] = append(graph[w1[j]], w2[j])
                    inDegree[w2[j]]++
                }
                break
            }
        }
    }

    // BFS topological sort
    queue := []byte{}
    for c, deg := range inDegree {
        if deg == 0 {
            queue = append(queue, c)
        }
    }

    result := []byte{}
    for len(queue) > 0 {
        c := queue[0]
        queue = queue[1:]
        result = append(result, c)

        for _, neighbor := range graph[c] {
            inDegree[neighbor]--
            if inDegree[neighbor] == 0 {
                queue = append(queue, neighbor)
            }
        }
    }

    if len(result) != len(inDegree) {
        return ""
    }

    return string(result)
}

func main() {
    fmt.Println(AlienOrder([]string{"wrt","wrf","er","ett","rftt"})) // Output: "wertf"
    fmt.Println(AlienOrder([]string{"z","x"}))                        // Output: "zx"
}`
        },
        twists: [
            { title: 'Verify Alien Order', difficulty: 'Medium', description: 'Given a proposed character ordering and the sorted word list, verify if the proposed ordering is consistent with the word list.', whyDifferent: 'Inverts from deriving the order to checking one -- simply verify that each adjacent word pair respects the proposed ordering, a much simpler task.', example: 'For words ["wrt","wrf"] and proposed order "wrtf...", verify that t comes before f in the order.' },
            { title: 'All Valid Orderings', difficulty: 'Very Hard', description: 'Return all possible valid character orderings that are consistent with the word list, not just any one of them.', whyDifferent: 'Requires enumerating all topological orderings of the derived graph, which involves backtracking through all choices at each zero in-degree step.', example: 'If the constraints only define w<e and e<r, characters t and f could appear anywhere unconstrained, leading to many valid orderings.' },
            { title: 'Minimum Additional Words', difficulty: 'Hard', description: 'Given a partial word list that yields an ambiguous ordering, determine the minimum number of additional words needed to fully determine the alphabet order.', whyDifferent: 'Requires analyzing which character pairs lack ordering constraints and designing words that would create those missing edges in the graph.', example: 'If words ["ab","ac"] only tell us b<c, we need more words to determine where other characters like d and e fit.' },
            { title: 'Detect Inconsistency Details', difficulty: 'Medium', description: 'When the ordering is invalid, return the specific conflicting constraints (the cycle) that make it impossible.', whyDifferent: 'Goes beyond returning empty string to identifying and reporting the exact cycle of character relationships that creates the contradiction.', example: 'For words ["a","b","a"], the constraints b<a and a<b conflict. Return the cycle [a,b,a] as the conflict.' },
            { title: 'Lexicographically First Order', difficulty: 'Hard', description: 'Among all valid orderings consistent with the word list, return the lexicographically smallest one (by English alphabet).', whyDifferent: 'Requires using a min-heap instead of a regular queue in the topological sort to always pick the smallest (by English alphabet) available character.', example: 'If both "a" and "c" have zero in-degree, choose "a" first to get the lexicographically smallest valid alien ordering.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/02-alien-dictionary', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/02-alien-dictionary'] = problem;

})();
