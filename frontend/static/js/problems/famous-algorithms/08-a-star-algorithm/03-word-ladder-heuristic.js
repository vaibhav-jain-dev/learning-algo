/**
 * Word Ladder with Heuristic
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: a-star-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Word Ladder with Heuristic',
        difficulty: 'Hard',
        algorithm: 'a-star-bfs',
        parent: '08-a-star-algorithm',
        description: 'A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: - Every adjacent pair of words differs by a single letter - Every si for 1 <= i <= k is in wordList Given beginWord, endWord, and wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists. Use A* algorithm with character difference heuristic for optimization.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(M^2 * N)',
            space: 'O(M * N)'
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
        "beginWord": "hit",
        "endWord": "cog",
        "wordList": [
                "hot",
                "dot",
                "dog",
                "lot",
                "log",
                "cog"
        ]
},
        output: 5,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input beginWord=hit, endWord=cog, wordList=[hot, dot, ..., cog] (length 6), the result is 5.'
    }
        ],
        solutions: {
            python: `def wordLadderWithHeuristic(data):
    """
    Word Ladder with Heuristic (A* Algorithm)

    Uses character difference count as heuristic.

    Time: O(M^2 * N) where M = word length, N = wordList size
    Space: O(M * N)
    """
    import heapq
    from collections import defaultdict

    begin_word = data["beginWord"]
    end_word = data["endWord"]
    word_list = data["wordList"]

    if end_word not in word_list:
        return 0

    word_set = set(word_list)
    word_len = len(begin_word)

    # Heuristic: count character differences
    def heuristic(word):
        return sum(c1 != c2 for c1, c2 in zip(word, end_word))

    # Build pattern dictionary for O(1) neighbor lookup
    # e.g., "hot" -> ["*ot", "h*t", "ho*"]
    patterns = defaultdict(list)
    for word in word_list:
        for i in range(word_len):
            pattern = word[:i] + "*" + word[i+1:]
            patterns[pattern].append(word)

    # A* algorithm
    # (f_score, g_score, word)
    start_h = heuristic(begin_word)
    min_heap = [(1 + start_h, 1, begin_word)]
    visited = {begin_word}

    while min_heap:
        f, g, word = heapq.heappop(min_heap)

        if word == end_word:
            return g

        # Find neighbors using patterns
        for i in range(word_len):
            pattern = word[:i] + "*" + word[i+1:]
            for neighbor in patterns[pattern]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    new_g = g + 1
                    new_f = new_g + heuristic(neighbor)
                    heapq.heappush(min_heap, (new_f, new_g, neighbor))

    return 0


# Test
if __name__ == "__main__":
    data = {
        "beginWord": "hit",
        "endWord": "cog",
        "wordList": ["hot", "dot", "dog", "lot", "log", "cog"]
    }
    print(wordLadderWithHeuristic(data))  # Output: 5`,
            go: `package main

import (
    "container/heap"
    "fmt"
)

type WordState struct {
    f, g int
    word string
}

type WordHeap []WordState

func (h WordHeap) Len() int           { return len(h) }
func (h WordHeap) Less(i, j int) bool { return h[i].f < h[j].f }
func (h WordHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *WordHeap) Push(x interface{}) { *h = append(*h, x.(WordState)) }
func (h *WordHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

// WordLadderWithHeuristic uses A* with character difference heuristic.
// Time: O(M^2 * N), Space: O(M * N)
func WordLadderWithHeuristic(data map[string]interface{}) int {
    beginWord := data["beginWord"].(string)
    endWord := data["endWord"].(string)
    wordListRaw := data["wordList"].([]interface{})

    // Parse word list
    wordList := make([]string, len(wordListRaw))
    wordSet := make(map[string]bool)
    for i, w := range wordListRaw {
        wordList[i] = w.(string)
        wordSet[w.(string)] = true
    }

    if !wordSet[endWord] {
        return 0
    }

    wordLen := len(beginWord)

    // Heuristic: character differences
    heuristic := func(word string) int {
        diff := 0
        for i := 0; i < wordLen; i++ {
            if word[i] != endWord[i] {
                diff++
            }
        }
        return diff
    }

    // Build pattern map
    patterns := make(map[string][]string)
    for _, word := range wordList {
        for i := 0; i < wordLen; i++ {
            pattern := word[:i] + "*" + word[i+1:]
            patterns[pattern] = append(patterns[pattern], word)
        }
    }

    // A* algorithm
    startH := heuristic(beginWord)
    h := &WordHeap{{1 + startH, 1, beginWord}}
    heap.Init(h)
    visited := map[string]bool{beginWord: true}

    for h.Len() > 0 {
        curr := heap.Pop(h).(WordState)

        if curr.word == endWord {
            return curr.g
        }

        // Find neighbors
        for i := 0; i < wordLen; i++ {
            pattern := curr.word[:i] + "*" + curr.word[i+1:]
            for _, neighbor := range patterns[pattern] {
                if !visited[neighbor] {
                    visited[neighbor] = true
                    newG := curr.g + 1
                    newF := newG + heuristic(neighbor)
                    heap.Push(h, WordState{newF, newG, neighbor})
                }
            }
        }
    }

    return 0
}

func main() {
    data := map[string]interface{}{
        "beginWord": "hit",
        "endWord":   "cog",
        "wordList": []interface{}{
            "hot", "dot", "dog", "lot", "log", "cog",
        },
    }
    fmt.Println(WordLadderWithHeuristic(data)) // 5
}`
        },
        twists: [
            { title: 'All Shortest Paths', difficulty: 'Hard', description: 'Return all shortest transformation sequences from beginWord to endWord, not just one.', whyDifferent: 'Requires BFS to find the shortest distance first, then DFS/backtracking to enumerate all paths of that length, maintaining a parent map of all predecessors.', example: 'For hit->cog, there might be two shortest paths: hit->hot->dot->dog->cog and hit->hot->lot->log->cog. Return both.' },
            { title: 'Bidirectional BFS', difficulty: 'Hard', description: 'Solve word ladder using bidirectional BFS from both beginWord and endWord simultaneously.', whyDifferent: 'Explores from both ends, meeting in the middle, dramatically reducing the search space from O(b^d) to O(b^(d/2)) where b is branching factor and d is depth.', example: 'Forward frontier: {hit} -> {hot}. Backward frontier: {cog} -> {dog,log}. Continue until frontiers overlap.' },
            { title: 'Weighted Transformations', difficulty: 'Hard', description: 'Each character substitution has a different cost (e.g., changing vowels costs 1, consonants costs 2). Find the minimum cost transformation.', whyDifferent: 'Unit-cost BFS no longer works. Need Dijkstra or A* with proper g-cost tracking for variable-weight edges.', example: 'Transforming "hit" to "hot" costs 1 (vowel change i->o), but "hit" to "hat" costs 2 (consonant change i to vowel a? depends on definition).' },
            { title: 'Maximum Ladder Length', difficulty: 'Medium', description: 'Find the longest possible transformation sequence from beginWord to endWord (visiting each word at most once).', whyDifferent: 'Inverts the optimization from shortest to longest path, which is NP-hard in general graphs. For word ladders, the small graph size may make it tractable with DFS+backtracking.', example: 'From "hit" to "cog", the shortest path is 5 but the longest (non-repeating) path might visit 10 intermediate words.' },
            { title: 'Edit Distance Heuristic Analysis', difficulty: 'Medium', description: 'Prove that the character-difference heuristic is admissible and consistent for the word ladder problem.', whyDifferent: 'Focuses on theoretical understanding -- showing that hamming distance never overestimates the true distance (each difference requires at least one step) and that it satisfies the triangle inequality.', example: 'h("hit","cog")=3 (all chars differ). Actual distance is 4. Since 3 <= 4, the heuristic is admissible (never overestimates).' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/03-word-ladder-heuristic', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/03-word-ladder-heuristic'] = problem;

})();
