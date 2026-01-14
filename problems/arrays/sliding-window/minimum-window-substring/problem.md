# Minimum Window Substring

## Problem Description

Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window substring** of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.

A **window substring** is a contiguous sequence of characters within `s`.

The answer is guaranteed to be unique if it exists.

## Examples

### Example 1
```
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
```

### Example 2
```
Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
```

### Example 3
```
Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since s only has one 'a', it's impossible to include two 'a's.
```

### Example 4
```
Input: s = "cabwefgewcwaefgcf", t = "cae"
Output: "cwae"
Explanation: The minimum window containing 'c', 'a', and 'e' is "cwae".
```

## Constraints

- 1 <= m, n <= 10^5
- s and t consist of uppercase and lowercase English letters

## Hints

<details>
<summary>Hint 1</summary>
Use a hash map to count the frequency of each character in t. You'll need another hash map to track character frequencies in your current window.
</details>

<details>
<summary>Hint 2</summary>
Use two pointers (left and right) to define your window. Expand right to include more characters, and shrink left when you have a valid window.
</details>

<details>
<summary>Hint 3</summary>
Keep track of how many unique characters from t are currently satisfied (have required count) in your window. When all are satisfied, try shrinking from left.
</details>

<details>
<summary>Hint 4</summary>
Instead of comparing entire frequency maps, maintain a counter of how many characters have met their required frequency. Update this counter when adding/removing characters.
</details>

## Approach

### Sliding Window with Character Counting

1. **Build frequency map of t**: Count occurrences of each character in t
2. **Initialize pointers and counters**:
   - `left` and `right` pointers for the window
   - `required` = number of unique characters in t
   - `formed` = number of unique characters in current window with desired frequency
3. **Expand window** (move right pointer):
   - Add character to window frequency map
   - If character frequency matches required frequency, increment `formed`
4. **Contract window** (move left pointer):
   - While window is valid (`formed == required`):
     - Update minimum window if current is smaller
     - Remove leftmost character from window
     - If frequency drops below required, decrement `formed`
     - Move left pointer
5. **Return** the minimum window found

### Time Complexity
- O(|s| + |t|) where |s| and |t| are lengths of the strings
- Each character in s is visited at most twice (once by right, once by left)

### Space Complexity
- O(|s| + |t|) for the hash maps

### Key Insight

This is a variable-size sliding window problem. The window expands until it becomes valid (contains all characters of t), then contracts to find the minimum valid window. This expand-contract pattern is repeated until we've checked all possible windows.
