# Word Break

## Problem Description

Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

## Examples

### Example 1
```
Input: s = "leetcode", wordDict = ["leet", "code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
```

### Example 2
```
Input: s = "applepenapple", wordDict = ["apple", "pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
```

### Example 3
```
Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false
Explanation: The string cannot be segmented into dictionary words.
```

### Example 4
```
Input: s = "cars", wordDict = ["car", "ca", "rs"]
Output: true
Explanation: "cars" can be segmented as "ca rs".
```

## Constraints

- `1 <= s.length <= 300`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 20`
- `s` and `wordDict[i]` consist of only lowercase English letters
- All strings of `wordDict` are unique

## Hints

<details>
<summary>Hint 1</summary>
Think of this as: can the string be split at certain positions such that each segment is a valid word?
</details>

<details>
<summary>Hint 2</summary>
Use DP where dp[i] represents whether the substring s[0:i] can be segmented into dictionary words.
</details>

<details>
<summary>Hint 3</summary>
For each position i, check all possible previous positions j. If dp[j] is true and s[j:i] is in the dictionary, then dp[i] is true.
</details>

<details>
<summary>Hint 4</summary>
Using a hash set for the dictionary makes word lookups O(1).
</details>

## Approach

### DP State Definition
- `dp[i]` = true if `s[0:i]` can be segmented into dictionary words

### Base Case
- `dp[0] = true` (empty string can be segmented trivially)

### State Transition
```
dp[i] = OR(dp[j] AND s[j:i] in wordDict) for all j from 0 to i-1
```

For each position `i`, we check all possible split points `j`:
- If `dp[j]` is true (meaning s[0:j] can be segmented)
- AND `s[j:i]` is a valid word in the dictionary
- Then `dp[i]` is true

### Optimization
- Convert `wordDict` to a HashSet for O(1) lookups
- Only check substrings up to the maximum word length in the dictionary

### Time Complexity
- O(n^2 * m) where n is string length and m is max word length (for substring creation)
- Can be optimized to O(n^2) with efficient string comparison

### Space Complexity
- O(n) for the DP array
- O(k) for the word dictionary set where k is total characters in dictionary
