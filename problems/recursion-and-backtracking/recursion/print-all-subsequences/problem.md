# Print All Subsequences of a String

## Problem Description

Given a string, generate and print all possible subsequences (not substrings). A subsequence is a sequence that can be derived from the string by deleting some or no characters without changing the order of the remaining characters.

For a string of length n, there are 2^n possible subsequences (including the empty subsequence).

**Note**: A subsequence maintains relative order but characters don't need to be contiguous, unlike a substring.

## Examples

### Example 1
```
Input: "abc"
Output: ["", "c", "b", "bc", "a", "ac", "ab", "abc"]

Explanation:
- "" (empty - take nothing)
- "a" (take index 0)
- "b" (take index 1)
- "c" (take index 2)
- "ab" (take indices 0,1)
- "ac" (take indices 0,2)
- "bc" (take indices 1,2)
- "abc" (take all indices)
```

### Example 2
```
Input: "ab"
Output: ["", "b", "a", "ab"]

Explanation:
For each character, we have 2 choices: include or exclude
- "" : exclude 'a', exclude 'b'
- "b" : exclude 'a', include 'b'
- "a" : include 'a', exclude 'b'
- "ab" : include 'a', include 'b'
```

### Example 3
```
Input: "xyz"
Output: ["", "z", "y", "yz", "x", "xz", "xy", "xyz"]
Total: 2^3 = 8 subsequences
```

## Constraints

- 1 <= string length <= 20
- String contains only lowercase English letters
- The total number of subsequences is 2^n

## Hints

<details>
<summary>Hint 1</summary>
Think about each character as a binary choice: either include it in the subsequence or exclude it.
</details>

<details>
<summary>Hint 2</summary>
Use recursion where at each step, you make two recursive calls: one that includes the current character and one that excludes it.
</details>

<details>
<summary>Hint 3</summary>
The base case is when you've processed all characters - at that point, add the current subsequence to your result.
</details>

<details>
<summary>Hint 4</summary>
You can also solve this using bit manipulation: iterate from 0 to 2^n - 1 and use each number's binary representation to determine which characters to include.
</details>

## Approach Explanation

### The Include/Exclude Pattern

For each character in the string, we have exactly two choices:
1. **Include** the character in the current subsequence
2. **Exclude** the character from the current subsequence

This creates a binary decision tree.

### Decision Tree Visualization

```
Input: "abc"

                         ""
                        /  \
                 include 'a'  exclude 'a'
                      /          \
                    "a"          ""
                   /   \        /   \
            inc 'b' exc 'b' inc 'b' exc 'b'
               /      \       /       \
             "ab"    "a"    "b"       ""
            /   \   /  \   /  \      /  \
          inc  exc inc exc inc exc  inc exc
          'c'  'c' 'c' 'c' 'c' 'c'  'c' 'c'
           |    |   |   |   |   |    |   |
         "abc""ab""ac""a""bc" "b"  "c"  ""

Final subsequences (at leaves): "", "c", "b", "bc", "a", "ac", "ab", "abc"
```

### Recursive State at Each Level

```
Level 0 (index=0, char='a'):
  current="" -> branch into "a" and ""

Level 1 (index=1, char='b'):
  current="a" -> branch into "ab" and "a"
  current=""  -> branch into "b" and ""

Level 2 (index=2, char='c'):
  current="ab" -> branch into "abc" and "ab"
  current="a"  -> branch into "ac" and "a"
  current="b"  -> branch into "bc" and "b"
  current=""   -> branch into "c" and ""

Level 3 (base case, index=3):
  Add all current values to result: ["abc", "ab", "ac", "a", "bc", "b", "c", ""]
```

### Alternative: Bit Manipulation Approach

For a string of length n, we can use numbers from 0 to 2^n - 1 as bit masks:

```
String: "abc" (length 3)

Number | Binary | Subsequence
-------|--------|------------
   0   |  000   |    ""
   1   |  001   |    "c"
   2   |  010   |    "b"
   3   |  011   |    "bc"
   4   |  100   |    "a"
   5   |  101   |    "ac"
   6   |  110   |    "ab"
   7   |  111   |    "abc"
```

### Time and Space Complexity

| Metric | Value |
|--------|-------|
| Time Complexity | O(n * 2^n) |
| Space Complexity | O(n) for recursion stack |
| Output Size | O(2^n) subsequences |

### Algorithm Steps (Recursive)

1. **Base Case**: If index reaches the end of string, add current subsequence to result
2. **Recursive Case**:
   - **Include**: Add current character to subsequence, recurse to next index
   - **Exclude**: Don't add current character, recurse to next index
3. **Return**: Collect all subsequences from the recursion
