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
            { id: '03-topological-sort/02-alien-dictionary/twist-01-verify-alien-order', name: 'Verify Alien Order', difficulty: 'Medium' },
            { id: '03-topological-sort/02-alien-dictionary/twist-02-all-valid-orderings', name: 'All Valid Orderings', difficulty: 'Very Hard' },
            { id: '03-topological-sort/02-alien-dictionary/twist-03-minimum-additional-words', name: 'Minimum Additional Words', difficulty: 'Hard' },
            { id: '03-topological-sort/02-alien-dictionary/twist-04-detect-inconsistency-details', name: 'Detect Inconsistency Details', difficulty: 'Medium' },
            { id: '03-topological-sort/02-alien-dictionary/twist-05-lexicographically-first-order', name: 'Lexicographically First Order', difficulty: 'Hard' }
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
