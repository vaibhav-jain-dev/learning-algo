<div id="viz-config" style="display:none">
{"name":"Boggle Board","algorithm":"graph-word-search","complexity":{"time":"O(N * M * 8^L + W * L)","space":"O(W * L + N * M)"},"examples":[{"input":{"board":[["t","h","i","s"],["w","a","t","s"],["o","a","h","g"],["f","g","d","t"]],"words":["this","two","fat","that"]},"output":["this","two","fat","that"],"inputRaw":"4x4 board, 4 words","outputRaw":"[\"this\", \"two\", \"fat\", \"that\"]"},{"input":{"board":[["a","b"],["c","d"]],"words":["abcd","abdc","abca"]},"output":["abcd","abdc"],"inputRaw":"2x2 board, 3 words","outputRaw":"[\"abcd\", \"abdc\"]"}]}
</div>

# Boggle Board

**Difficulty:** Hard (Red)

## Problem Statement

You're given a two-dimensional array (a matrix) of potentially unequal height and width containing letters; this matrix represents a boggle board. You're also given a list of words.

Write a function that returns an array of all the words contained in the boggle board. The final words don't need to be in any particular order.

A word is constructed in the boggle board by connecting adjacent (horizontally, vertically, or diagonally) letters, without using any single letter at a given position more than once. While a word can have repeated letters, they must come from different positions in the boggle board.

## Examples

**Example 1:**
```
Input:
board = [
  ["t", "h", "i", "s"],
  ["w", "a", "t", "s"],
  ["o", "a", "h", "g"],
  ["f", "g", "d", "t"]
]
words = ["this", "two", "fat", "that"]

Output: ["this", "two", "fat", "that"]
```

**Example 2:**
```
Input:
board = [
  ["a", "b"],
  ["c", "d"]
]
words = ["abcd", "abdc", "abca"]

Output: ["abcd", "abdc"]
(Note: "abca" is not valid because 'a' would need to be used twice from same position)
```

**Example 3:**
```
Input:
board = [
  ["a", "b", "c"],
  ["d", "e", "f"],
  ["g", "h", "i"]
]
words = ["aef", "abe", "abcfi", "abcfed"]

Output: ["abe", "aef"]
```

## Constraints

- 1 <= board.length <= 12
- 1 <= board[0].length <= 12
- board[i][j] is a lowercase English letter
- 1 <= words.length <= 3 * 10^4
- 1 <= words[i].length <= 10
- words[i] consists of lowercase English letters
- All words in words are unique

## Hints

<details>
<summary>Hint 1</summary>
A naive approach would be to iterate through each word and check if it exists in the board using DFS. However, this is inefficient when the words list is large.
</details>

<details>
<summary>Hint 2</summary>
Consider using a Trie (prefix tree) to store all the words. This allows you to search for multiple words simultaneously as you traverse the board.
</details>

<details>
<summary>Hint 3</summary>
When traversing the board, use the Trie to check if the current path forms a valid prefix. If not, you can prune that search branch early.
</details>

<details>
<summary>Hint 4</summary>
Use DFS from each cell in the board. At each step, check if the current path matches a word in the Trie. Mark cells as visited during the current path and unmark them when backtracking.
</details>

<details>
<summary>Hint 5</summary>
To avoid duplicates, mark words as found in the Trie so you don't add them multiple times to the result.
</details>

## Approach

### Using Trie + DFS

1. **Build a Trie:** Insert all words from the dictionary into a Trie data structure.

2. **DFS from each cell:** For each cell in the board, start a DFS traversal.

3. **Trie-guided search:** During DFS, follow the Trie structure:
   - If current character doesn't exist in Trie children, prune the search
   - If we reach a word end marker, add the word to results

4. **Track visited cells:** Use a visited set or modify the board temporarily to avoid reusing cells in the same path.

5. **Explore all 8 directions:** Move horizontally, vertically, and diagonally.

6. **Backtrack:** After exploring all neighbors, unmark the current cell as visited.

**Time Complexity:** O(N * M * 8^L + W * L)
- N * M: board dimensions
- 8^L: worst case DFS exploration (L = max word length)
- W * L: building the Trie (W = number of words)

**Space Complexity:** O(W * L + N * M)
- W * L: Trie storage
- N * M: recursion stack and visited tracking

---

## Similar Problems (Harder)

### 1. Word Search II
**Difficulty:** Hard

Same problem - find all words from dictionary in board (LeetCode 212).

### 2. Word Search
**Difficulty:** Medium

Find if a single word exists in the board (LeetCode 79).

### 3. Maximum Score Words Formed by Letters
**Difficulty:** Hard

Form words from available letters to maximize score.
