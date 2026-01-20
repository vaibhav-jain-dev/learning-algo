<div id="viz-config" style="display:none">
{"name":"Phone Number Mnemonics","algorithm":"recursion-phone","complexity":{"time":"O(4^n * n)","space":"O(n)"},"examples":[{"input":{"phoneNumber":"23"},"output":["ad","ae","af","bd","be","bf","cd","ce","cf"],"inputRaw":"\"23\"","outputRaw":"[\"ad\", \"ae\", \"af\", \"bd\", \"be\", \"bf\", \"cd\", \"ce\", \"cf\"]"}]}
</div>

# Phone Number Mnemonics

**Difficulty:** Medium

## Problem Statement

Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent on a phone keypad.

The mapping of digits to letters (just like on telephone buttons) is:
```
2 -> "abc"
3 -> "def"
4 -> "ghi"
5 -> "jkl"
6 -> "mno"
7 -> "pqrs"
8 -> "tuv"
9 -> "wxyz"
```

Note that 1 does not map to any letters.

## Examples

**Example 1:**
```
Input: "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
Explanation: Digit 2 maps to "abc", digit 3 maps to "def"
```

**Example 2:**
```
Input: "2"
Output: ["a", "b", "c"]
```

**Example 3:**
```
Input: ""
Output: []
```

**Example 4:**
```
Input: "1905"
Output: []
Explanation: Contains digits with no letter mappings (0, 1)
```

## Constraints

- 0 <= phone number length <= 10
- Input contains only digits
- Each digit is from 0-9

## Hints

<details>
<summary>Hint 1</summary>
Think of this as a tree where each level represents a digit, and branches represent letter choices.
</details>

<details>
<summary>Hint 2</summary>
Use backtracking: for each digit, try each possible letter and recurse.
</details>

<details>
<summary>Hint 3</summary>
The number of combinations is the product of letter counts for each digit.
</details>

## Approach

### Recursive Tree

For input "23":
```
                    ""
           /        |        \
         "a"       "b"       "c"       (digit 2: abc)
        / | \     / | \     / | \
      "ad""ae""af""bd""be""bf""cd""ce""cf"  (digit 3: def)
```

### Algorithm
1. Create a mapping from digits to letters
2. For each digit, iterate through its possible letters
3. Add letter to current combination and recurse
4. Backtrack by removing the letter

**Time Complexity:** O(4^n * n) - worst case 4 letters per digit (7, 9), n digits
**Space Complexity:** O(n) for recursion stack

### Iterative Approach
1. Start with [""]
2. For each digit, create new combinations by appending each letter
3. Replace old combinations with new ones

**Time Complexity:** O(4^n * n)
**Space Complexity:** O(4^n * n) for storing combinations

---

## Similar Problems (Harder)

### 1. Phone Number Word Search
Given a phone number and dictionary, find all valid words that can be spelled.
- **Key difference:** Must validate combinations against a dictionary using trie for efficiency.

### 2. Generate Palindromic Decompositions
Partition a string such that every substring is a palindrome.
- **Key difference:** Variable-length choices at each step with palindrome validation.

### 3. Decode Ways with Wildcards
Count ways to decode a string with '*' representing any digit 1-9.
- **Key difference:** Combines letter mapping with wildcard handling and counting.
