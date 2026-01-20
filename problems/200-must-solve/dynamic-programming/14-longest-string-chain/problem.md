<div id="viz-config" style="display:none">
{"name":"Longest String Chain","algorithm":"dp-string-chain","complexity":{"time":"O(n * L^2)","space":"O(n * L)"},"examples":[{"input":{"words":["a","b","ba","bca","bda","bdca"]},"output":4,"inputRaw":"words = [\"a\", \"b\", \"ba\", \"bca\", \"bda\", \"bdca\"]","outputRaw":"4"},{"input":{"words":["xbc","pcxbcf","xb","cxbc","pcxbc"]},"output":5,"inputRaw":"words = [\"xbc\", \"pcxbcf\", \"xb\", \"cxbc\", \"pcxbc\"]","outputRaw":"5"},{"input":{"words":["abcd","dbqca"]},"output":1,"inputRaw":"words = [\"abcd\", \"dbqca\"]","outputRaw":"1"}]}
</div>

# Longest String Chain

**Difficulty:** Hard (Red)

## Problem Statement

Given a list of words, where each word consists of only lowercase English letters, find the longest string chain.

A string chain is a sequence of words [word_1, word_2, ..., word_k] where word_i+1 can be formed by adding exactly one letter to word_i at any position. All words in the chain must be in the given list.

Return the length of the longest possible string chain.

## Examples

**Example 1:**
```
Input: words = ["a", "b", "ba", "bca", "bda", "bdca"]
Output: 4
Explanation: One of the longest chains is "a" -> "ba" -> "bda" -> "bdca"
```

**Example 2:**
```
Input: words = ["xbc", "pcxbcf", "xb", "cxbc", "pcxbc"]
Output: 5
Explanation: "xb" -> "xbc" -> "cxbc" -> "pcxbc" -> "pcxbcf"
```

**Example 3:**
```
Input: words = ["abcd", "dbqca"]
Output: 1
Explanation: No chain possible, each word is its own chain
```

## Constraints

- 1 <= words.length <= 1000
- 1 <= words[i].length <= 16
- All words consist of lowercase English letters
- All words are unique

## Hints

<details>
<summary>Hint 1</summary>
Sort words by length. A longer word can only be formed from a shorter word.
</details>

<details>
<summary>Hint 2</summary>
For each word, try removing one character at a time. If the resulting word exists, it could be a predecessor.
</details>

<details>
<summary>Hint 3</summary>
Use a hash map to store the longest chain ending at each word for O(1) lookup.
</details>

## Approach

### Dynamic Programming with Hash Map
1. Sort words by length (shorter words first)
2. Use a hash map: dp[word] = length of longest chain ending with word
3. For each word, try removing each character:
   - If the predecessor exists in dp: dp[word] = max(dp[word], dp[predecessor] + 1)
   - Otherwise: dp[word] = 1 (word is start of its own chain)
4. Return the maximum value in dp

**Time Complexity:** O(n * L^2) where n is number of words, L is max word length
**Space Complexity:** O(n * L)

---

## Similar Problems (Harder)

### 1. Longest Word in Dictionary through Deleting
**Difficulty:** Medium-Hard

Find the longest word in dictionary that can be formed by deleting characters from a given string.

### 2. Word Ladder
**Difficulty:** Hard

Find shortest transformation sequence from beginWord to endWord, changing one letter at a time.

### 3. Concatenated Words
**Difficulty:** Hard

Find all words that can be formed by concatenating other words in the list.
