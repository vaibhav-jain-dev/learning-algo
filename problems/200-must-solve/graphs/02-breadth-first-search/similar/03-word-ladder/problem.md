<div id="viz-config" style="display:none">
{"name":"Word Ladder","algorithm":"graph-bfs","complexity":{"time":"O(M^2 * N)","space":"O(M^2 * N)"},"examples":[{"input":{"beginWord":"hit","endWord":"cog","wordList":["hot","dot","dog","lot","log","cog"]},"output":5,"inputRaw":"hit -> cog","outputRaw":"5"},{"input":{"beginWord":"hit","endWord":"cog","wordList":["hot","dot","dog","lot","log"]},"output":0,"inputRaw":"hit -> cog (cog not in list)","outputRaw":"0"}]}
</div>

# Word Ladder

**Difficulty:** Hard

## Problem Statement

A **transformation sequence** from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:

- Every adjacent pair of words differs by a single letter
- Every `si` for `1 <= i <= k` is in `wordList`. Note that `beginWord` does not need to be in `wordList`
- `sk == endWord`

Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return the **number of words** in the **shortest transformation sequence** from `beginWord` to `endWord`, or `0` if no such sequence exists.

## Examples

**Example 1:**
```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> "cog", which is 5 words long.
```

**Example 2:**
```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
```

## Constraints

- `1 <= beginWord.length <= 10`
- `endWord.length == beginWord.length`
- `1 <= wordList.length <= 5000`
- `wordList[i].length == beginWord.length`
- `beginWord`, `endWord`, and `wordList[i]` consist of lowercase English letters
- `beginWord != endWord`
- All the words in `wordList` are **unique**

---

## Thought Process & Pattern Recognition

### Step 1: Understand the Core Problem

**Question to ask yourself:** "How do I model word transformations as a graph?"

Key insight:
- Each word is a **node** in a graph
- Two words are **connected** if they differ by exactly one letter
- We need to find the **shortest path** from beginWord to endWord

### Step 2: Identify the Pattern

**Key insight:** This is a **BFS shortest path** problem because:
- All edges have the same weight (1 transformation)
- BFS guarantees shortest path in unweighted graphs
- We need to efficiently find words that differ by one letter

### Step 3: Define the Algorithm

```
If endWord not in wordList: return 0

Build adjacency using generic patterns:
    "hot" -> ["*ot", "h*t", "ho*"]
    "dot" -> ["*ot", "d*t", "do*"]
    "*ot" connects "hot" and "dot"

BFS from beginWord:
    For each word at current level:
        Generate all patterns
        For each word matching a pattern:
            If it's endWord: return current_length + 1
            Add to next level

return 0  // No path found
```

---

## Visual Diagram: How It Works

### Input

<div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;">
<code>beginWord = "hit"</code><br>
<code>endWord = "cog"</code><br>
<code>wordList = ["hot","dot","dog","lot","log","cog"]</code>
</div>

### Graph Representation

<div style="background: #f8f9fa; padding: 30px; border-radius: 12px; margin: 20px 0;">

<div style="display: flex; flex-direction: column; align-items: center; gap: 30px;">

<!-- Level 0: hit -->
<div style="display: flex; align-items: center; gap: 20px;">
<span style="width: 80px; text-align: right; color: #6c757d;">Level 0:</span>
<div style="width: 80px; height: 50px; background: linear-gradient(135deg, #28a745, #1e7e34); border-radius: 25px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(40,167,69,0.4);">hit</div>
</div>

<!-- Arrow down -->
<div style="width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 15px solid #6c757d;"></div>

<!-- Level 1: hot -->
<div style="display: flex; align-items: center; gap: 20px;">
<span style="width: 80px; text-align: right; color: #6c757d;">Level 1:</span>
<div style="width: 80px; height: 50px; background: linear-gradient(135deg, #007bff, #0056b3); border-radius: 25px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(0,123,255,0.4);">hot</div>
</div>

<!-- Arrow down branching -->
<div style="display: flex; justify-content: center; gap: 60px;">
<div style="width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 15px solid #6c757d;"></div>
<div style="width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 15px solid #6c757d;"></div>
</div>

<!-- Level 2: dot, lot -->
<div style="display: flex; align-items: center; gap: 20px;">
<span style="width: 80px; text-align: right; color: #6c757d;">Level 2:</span>
<div style="display: flex; gap: 30px;">
<div style="width: 80px; height: 50px; background: linear-gradient(135deg, #ffc107, #d39e00); border-radius: 25px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(255,193,7,0.4);">dot</div>
<div style="width: 80px; height: 50px; background: linear-gradient(135deg, #ffc107, #d39e00); border-radius: 25px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(255,193,7,0.4);">lot</div>
</div>
</div>

<!-- Arrow down branching -->
<div style="display: flex; justify-content: center; gap: 60px;">
<div style="width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 15px solid #6c757d;"></div>
<div style="width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 15px solid #6c757d;"></div>
</div>

<!-- Level 3: dog, log -->
<div style="display: flex; align-items: center; gap: 20px;">
<span style="width: 80px; text-align: right; color: #6c757d;">Level 3:</span>
<div style="display: flex; gap: 30px;">
<div style="width: 80px; height: 50px; background: linear-gradient(135deg, #17a2b8, #117a8b); border-radius: 25px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(23,162,184,0.4);">dog</div>
<div style="width: 80px; height: 50px; background: linear-gradient(135deg, #17a2b8, #117a8b); border-radius: 25px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(23,162,184,0.4);">log</div>
</div>
</div>

<!-- Arrow down converging -->
<div style="display: flex; justify-content: center;">
<div style="width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 15px solid #6c757d;"></div>
</div>

<!-- Level 4: cog -->
<div style="display: flex; align-items: center; gap: 20px;">
<span style="width: 80px; text-align: right; color: #6c757d;">Level 4:</span>
<div style="width: 80px; height: 50px; background: linear-gradient(135deg, #dc3545, #bd2130); border-radius: 25px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(220,53,69,0.4);">cog</div>
</div>

</div>
</div>

### Generic Word Patterns

<div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 15px 0;">
<div style="text-align: center; margin-bottom: 15px; font-weight: bold;">
Pattern Mapping (for efficient neighbor finding)
</div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
<div style="background: white; padding: 15px; border-radius: 8px;">
<strong>Pattern "*ot":</strong><br>
hot, dot, lot
</div>
<div style="background: white; padding: 15px; border-radius: 8px;">
<strong>Pattern "ho*":</strong><br>
hot
</div>
<div style="background: white; padding: 15px; border-radius: 8px;">
<strong>Pattern "do*":</strong><br>
dot, dog
</div>
<div style="background: white; padding: 15px; border-radius: 8px;">
<strong>Pattern "*og":</strong><br>
dog, log, cog
</div>
</div>
</div>

### BFS Exploration

**Step 1:** Start with "hit" (length = 1)

<div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 10px 0;">
<div style="text-align: center;">
<span style="background: #28a745; color: white; padding: 5px 15px; border-radius: 20px; margin: 5px;">hit</span>
</div>
<div style="text-align: center; margin-top: 10px;">
Generate patterns: *it, h*t, hi* -> Find "hot"
</div>
</div>

**Step 2:** Process "hot" (length = 2)

<div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 10px 0;">
<div style="text-align: center;">
<span style="background: #007bff; color: white; padding: 5px 15px; border-radius: 20px; margin: 5px;">hot</span>
</div>
<div style="text-align: center; margin-top: 10px;">
Patterns: *ot, h*t, ho* -> Find "dot", "lot"
</div>
</div>

**Step 3:** Process "dot", "lot" (length = 3)

<div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin: 10px 0;">
<div style="text-align: center;">
<span style="background: #ffc107; color: white; padding: 5px 15px; border-radius: 20px; margin: 5px;">dot</span>
<span style="background: #ffc107; color: white; padding: 5px 15px; border-radius: 20px; margin: 5px;">lot</span>
</div>
<div style="text-align: center; margin-top: 10px;">
Find "dog" from dot, "log" from lot
</div>
</div>

**Step 4:** Process "dog", "log" (length = 4)

<div style="background: #fce4ec; padding: 15px; border-radius: 8px; margin: 10px 0;">
<div style="text-align: center;">
<span style="background: #17a2b8; color: white; padding: 5px 15px; border-radius: 20px; margin: 5px;">dog</span>
<span style="background: #17a2b8; color: white; padding: 5px 15px; border-radius: 20px; margin: 5px;">log</span>
</div>
<div style="text-align: center; margin-top: 10px;">
Find "cog" from both -> endWord found!
</div>
</div>

### Final Result

<div style="background: #d4edda; color: #155724; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Shortest transformation sequence:</strong><br>
hit -> hot -> dot -> dog -> cog<br><br>
<strong>Length = 5 words</strong>
</div>

---

## Solution Approaches

### Approach 1: BFS with Pattern Mapping

| Metric | Value |
|--------|-------|
| Time Complexity | O(M^2 x N) where M is word length, N is wordList size |
| Space Complexity | O(M^2 x N) for pattern map |

**Why this is best:**
- Efficient neighbor finding via patterns
- Avoids comparing every pair of words
- Standard BFS guarantees shortest path

### Approach 2: Bidirectional BFS

| Metric | Value |
|--------|-------|
| Time Complexity | O(M^2 x N) |
| Space Complexity | O(M^2 x N) |

**When to use:**
- Very large word lists
- Want to reduce search space

### Approach 3: BFS with Direct Comparison

| Metric | Value |
|--------|-------|
| Time Complexity | O(M x N^2) |
| Space Complexity | O(N) |

**When to use:**
- Simpler implementation
- Small word lists

---

## Complexity Comparison

| Approach | Time | Space | Recommendation |
|----------|------|-------|----------------|
| Pattern BFS | O(M^2 x N) | O(M^2 x N) | Best overall |
| Bidirectional | O(M^2 x N) | O(M^2 x N) | Large inputs |
| Direct Compare | O(M x N^2) | O(N) | Simple cases |
