<div id="viz-config" style="display:none">
{"name":"String Pattern Matching","algorithm":"kmp-algorithm","complexity":{"time":"O(n + m)","space":"O(m)"},"examples":[{"input":{"text":"ABABDABACDABABCABAB","pattern":"ABABCABAB"},"output":[10],"inputRaw":"text = \"ABABDABACDABABCABAB\", pattern = \"ABABCABAB\"","outputRaw":"[10]"},{"input":{"text":"AAAAAA","pattern":"AA"},"output":[0,1,2,3,4],"inputRaw":"text = \"AAAAAA\", pattern = \"AA\"","outputRaw":"[0, 1, 2, 3, 4]"}]}
</div>

# Knuth-Morris-Pratt (KMP) Algorithm - String Pattern Matching

**Difficulty:** Hard

## Problem Statement

Given a text string and a pattern string, find all occurrences of the pattern in the text using the KMP algorithm.

The KMP algorithm improves upon the naive O(n*m) approach by preprocessing the pattern to build a "failure function" (also called LPS - Longest Proper Prefix which is also Suffix). This allows us to skip characters that we know will match, achieving O(n + m) time complexity.

## Examples

**Example 1:**
```
Input: text = "ABABDABACDABABCABAB", pattern = "ABABCABAB"
Output: [10]
Explanation: Pattern found at index 10
```

**Example 2:**
```
Input: text = "AAAAAA", pattern = "AA"
Output: [0, 1, 2, 3, 4]
Explanation: Pattern found at indices 0, 1, 2, 3, 4
```

## Visual Explanation

### Building the LPS (Failure Function) Array

For pattern "ABABCABAB":

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Index</th>
<th style="border: 1px solid #ddd; padding: 10px;">0</th>
<th style="border: 1px solid #ddd; padding: 10px;">1</th>
<th style="border: 1px solid #ddd; padding: 10px;">2</th>
<th style="border: 1px solid #ddd; padding: 10px;">3</th>
<th style="border: 1px solid #ddd; padding: 10px;">4</th>
<th style="border: 1px solid #ddd; padding: 10px;">5</th>
<th style="border: 1px solid #ddd; padding: 10px;">6</th>
<th style="border: 1px solid #ddd; padding: 10px;">7</th>
<th style="border: 1px solid #ddd; padding: 10px;">8</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; font-weight: bold;">Pattern</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">A</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">B</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">A</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">B</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">C</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">A</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">B</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">A</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center;">B</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px; font-weight: bold;">LPS</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #d4edda;">0</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">3</td>
<td style="border: 1px solid #ddd; padding: 10px; text-align: center; background: #fff3cd;">4</td>
</tr>
</table>

### LPS Building Step-by-Step

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Step</th>
<th style="border: 1px solid #ddd; padding: 10px;">i</th>
<th style="border: 1px solid #ddd; padding: 10px;">len</th>
<th style="border: 1px solid #ddd; padding: 10px;">Pattern[i]</th>
<th style="border: 1px solid #ddd; padding: 10px;">Pattern[len]</th>
<th style="border: 1px solid #ddd; padding: 10px;">Action</th>
<th style="border: 1px solid #ddd; padding: 10px;">LPS[i]</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">1</td>
<td style="border: 1px solid #ddd; padding: 10px;">1</td>
<td style="border: 1px solid #ddd; padding: 10px;">0</td>
<td style="border: 1px solid #ddd; padding: 10px;">B</td>
<td style="border: 1px solid #ddd; padding: 10px;">A</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #f8d7da;">Mismatch, len=0</td>
<td style="border: 1px solid #ddd; padding: 10px;">0</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">2</td>
<td style="border: 1px solid #ddd; padding: 10px;">2</td>
<td style="border: 1px solid #ddd; padding: 10px;">0</td>
<td style="border: 1px solid #ddd; padding: 10px;">A</td>
<td style="border: 1px solid #ddd; padding: 10px;">A</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">Match, len++</td>
<td style="border: 1px solid #ddd; padding: 10px;">1</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">3</td>
<td style="border: 1px solid #ddd; padding: 10px;">3</td>
<td style="border: 1px solid #ddd; padding: 10px;">1</td>
<td style="border: 1px solid #ddd; padding: 10px;">B</td>
<td style="border: 1px solid #ddd; padding: 10px;">B</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">Match, len++</td>
<td style="border: 1px solid #ddd; padding: 10px;">2</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">4</td>
<td style="border: 1px solid #ddd; padding: 10px;">4</td>
<td style="border: 1px solid #ddd; padding: 10px;">2</td>
<td style="border: 1px solid #ddd; padding: 10px;">C</td>
<td style="border: 1px solid #ddd; padding: 10px;">A</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #f8d7da;">Mismatch, use LPS</td>
<td style="border: 1px solid #ddd; padding: 10px;">0</td>
</tr>
</table>

### Pattern Matching Process

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
<strong>Key Insight:</strong> When a mismatch occurs at position j in the pattern, we don't start over. Instead, we use LPS[j-1] to know how many characters we can skip - these are guaranteed to match because they form both a prefix and suffix of the matched portion.
</div>

```
Text:    ABABDABACDABABCABAB
Pattern: ABABCABAB

Step 1: Match ABAB, mismatch at C vs D
        Use LPS[3]=2, shift pattern by 2
Step 2: Continue matching...
Step 3: Found match at index 10!
```

## Constraints

- 1 <= pattern.length <= text.length <= 10^5
- Text and pattern consist of lowercase/uppercase English letters

## Hints

<details>
<summary>Hint 1</summary>
The LPS array tells us the length of the longest proper prefix that is also a suffix for each position.
</details>

<details>
<summary>Hint 2</summary>
When a mismatch occurs at pattern[j], instead of restarting, use LPS[j-1] to skip comparisons.
</details>

<details>
<summary>Hint 3</summary>
Think of the LPS array as telling you: "if a mismatch occurs here, this many characters at the start of the pattern are guaranteed to already match."
</details>

## Approach

### 1. Build LPS Array
1. Initialize LPS array of pattern length with zeros
2. Use two pointers: i (current position), len (length of previous longest prefix suffix)
3. If characters match: LPS[i] = len + 1, increment both
4. If mismatch and len > 0: len = LPS[len - 1] (use the LPS array itself)
5. If mismatch and len == 0: LPS[i] = 0, increment i

### 2. Search using LPS
1. Use two pointers: i for text, j for pattern
2. If characters match: increment both
3. If j reaches pattern length: found match, use LPS to continue
4. If mismatch: use LPS[j-1] to shift pattern

**Time Complexity:** O(n + m) where n is text length, m is pattern length
**Space Complexity:** O(m) for LPS array

---

## Similar Problems

### 1. Implement strStr()
**Difficulty:** Easy

Return the index of the first occurrence of needle in haystack.

### 2. Repeated Substring Pattern
**Difficulty:** Easy

Check if a string can be constructed by repeating a substring.

### 3. Longest Happy Prefix
**Difficulty:** Hard

Find the longest prefix which is also a suffix (excluding the string itself).
