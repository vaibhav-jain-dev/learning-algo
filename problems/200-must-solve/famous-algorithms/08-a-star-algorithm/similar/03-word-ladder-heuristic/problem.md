<div id="viz-config" style="display:none">
{"name":"Word Ladder with Heuristic","algorithm":"a-star-bfs","complexity":{"time":"O(M^2 * N)","space":"O(M * N)"},"examples":[{"input":{"beginWord":"hit","endWord":"cog","wordList":["hot","dot","dog","lot","log","cog"]},"output":5,"inputRaw":"beginWord = 'hit', endWord = 'cog', wordList = ['hot','dot','dog','lot','log','cog']","outputRaw":"5"}]}
</div>

# Word Ladder with A* Heuristic

**Difficulty:** Hard

## Problem Statement

A transformation sequence from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:

- Every adjacent pair of words differs by a single letter
- Every `si` for `1 <= i <= k` is in `wordList`

Given `beginWord`, `endWord`, and `wordList`, return the number of words in the shortest transformation sequence from `beginWord` to `endWord`, or 0 if no such sequence exists.

Use A* algorithm with character difference heuristic for optimization.

## Examples

**Example 1:**
```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: hit -> hot -> dot -> dog -> cog (5 words)
```

**Example 2:**
```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: endWord "cog" is not in wordList
```

## Visual Explanation

### Word Graph Visualization

```
                    hit
                     |
                    hot
                   /   \
                 dot   lot
                  |     |
                 dog   log
                   \   /
                    cog

Shortest path: hit -> hot -> dot -> dog -> cog
Length: 5 words
```

### A* Heuristic: Character Differences

```
From "dot" to "cog":
d-o-t
c-o-g
^   ^
Different characters: 2

h(n) = number of characters different from endWord

This heuristic is admissible because each transformation
can only change one character.
```

## Constraints

- 1 <= beginWord.length <= 10
- endWord.length == beginWord.length
- 1 <= wordList.length <= 5000
- wordList[i].length == beginWord.length
- beginWord, endWord, and wordList[i] consist of lowercase English letters
- beginWord != endWord
- All words in wordList are unique

## Hints

<details>
<summary>Hint 1</summary>
Build a graph where words are nodes and edges connect words that differ by one character.
</details>

<details>
<summary>Hint 2</summary>
Use the number of differing characters from the endWord as the heuristic function h(n).
</details>

<details>
<summary>Hint 3</summary>
Use generic word patterns (like "h*t") to efficiently find neighbors without checking all pairs.
</details>

## Approach

### A* with Character Difference Heuristic

1. Check if endWord is in wordList
2. Build adjacency using generic patterns (e.g., "*ot" matches "hot", "dot", "lot")
3. Use A* with h(n) = hamming distance from current word to endWord
4. Return path length when endWord is reached

**Time Complexity:** O(M^2 * N) where M is word length, N is wordList size
**Space Complexity:** O(M * N) for storing patterns and visited states
