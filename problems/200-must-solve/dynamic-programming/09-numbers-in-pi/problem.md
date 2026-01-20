<div id="viz-config" style="display:none">
{"name":"Numbers in Pi","algorithm":"dp-pi-numbers","complexity":{"time":"O(n^2 * m)","space":"O(n + k)"},"examples":[{"input":{"pi":"3141592653589793238462643383279","numbers":["314159265358979323846","26433","8","3279","314159265","35897932384626433832","79"]},"output":2,"inputRaw":"pi = \"3141592653589793238462643383279\", numbers = [\"314159265358979323846\", \"26433\", \"8\", \"3279\", \"314159265\", \"35897932384626433832\", \"79\"]","outputRaw":"2"},{"input":{"pi":"314159","numbers":["314","159","3141","59"]},"output":1,"inputRaw":"pi = \"314159\", numbers = [\"314\", \"159\", \"3141\", \"59\"]","outputRaw":"1"},{"input":{"pi":"123456","numbers":["12","34","56"]},"output":2,"inputRaw":"pi = \"123456\", numbers = [\"12\", \"34\", \"56\"]","outputRaw":"2"}]}
</div>

# Numbers in Pi

**Difficulty:** Hard (Red)

## Problem Statement

Given a string representation of the first n digits of Pi and a list of positive integers (as strings), write a function that returns the smallest number of spaces that can be added to the Pi string such that all resulting numbers are found in the list of integers.

If there is no way to split Pi such that all numbers are in the list, return -1.

Note that a single digit from Pi can only be used once in a number.

## Examples

**Example 1:**
```
Input: pi = "3141592653589793238462643383279"
       numbers = ["314159265358979323846", "26433", "8", "3279", "314159265", "35897932384626433832", "79"]
Output: 2
Explanation: "314159265" + " " + "35897932384626433832" + " " + "79" uses 2 spaces
```

**Example 2:**
```
Input: pi = "314159"
       numbers = ["314", "159", "3141", "59"]
Output: 1
Explanation: "314" + " " + "159" or "3141" + " " + "59" both use 1 space
```

**Example 3:**
```
Input: pi = "123456"
       numbers = ["12", "34", "56"]
Output: 2
Explanation: "12" + " " + "34" + " " + "56"
```

## Constraints

- Pi string contains only digits
- Numbers are strings representing positive integers
- Each digit of Pi can only be used in one number
- Return the minimum number of spaces (which equals number of splits - 1)
- Return -1 if impossible to split

## Hints

<details>
<summary>Hint 1</summary>
Store numbers in a HashSet for O(1) lookup.
</details>

<details>
<summary>Hint 2</summary>
Use dynamic programming where dp[i] represents the minimum spaces needed to break pi[i:] into valid numbers.
</details>

<details>
<summary>Hint 3</summary>
At each position, try all possible prefixes that exist in the numbers list.
</details>

## Approach

### Dynamic Programming (Bottom-Up)
1. Create a set of valid numbers for O(1) lookup
2. dp[i] = minimum spaces needed to split pi[i:] into valid numbers
3. Start from the end of the string
4. For each position i, try all possible prefixes pi[i:j+1]
   - If prefix exists in numbers set and dp[j+1] is valid:
     - dp[i] = min(dp[i], dp[j+1] + 1)
5. Return dp[0] - 1 (subtract 1 because we count spaces, not numbers)

**Time Complexity:** O(n^2 * m) where n is length of pi, m is max number length
**Space Complexity:** O(n + k) where k is total characters in numbers list

---

## Similar Problems (Harder)

### 1. Word Break II
**Difficulty:** Hard

Return all possible sentences that can be formed by breaking a string with dictionary words.

### 2. Concatenated Words
**Difficulty:** Hard

Find all words that can be formed by concatenating other words in the list.

### 3. Minimum Extra Characters in a String
**Difficulty:** Medium-Hard

Find minimum characters left over when breaking string into dictionary words.
