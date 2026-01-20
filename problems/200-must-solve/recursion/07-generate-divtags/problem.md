# Generate Div Tags

**Difficulty:** Medium

## Problem Statement

Write a function that takes in a positive integer `numberOfTags` and returns a list of all valid strings that you can generate with that number of matched `<div></div>` tags.

A string is valid and contains matched `<div></div>` tags if for every opening tag `<div>`, there is a closing tag `</div>` that comes after it and isn't used as a match for a previously occurring opening tag.

Each output string should contain exactly `numberOfTags` opening tags and `numberOfTags` closing tags.

## Examples

**Example 1:**
```
Input: numberOfTags = 2
Output: ["<div><div></div></div>", "<div></div><div></div>"]
```

**Example 2:**
```
Input: numberOfTags = 1
Output: ["<div></div>"]
```

**Example 3:**
```
Input: numberOfTags = 3
Output: [
  "<div><div><div></div></div></div>",
  "<div><div></div><div></div></div>",
  "<div><div></div></div><div></div>",
  "<div></div><div><div></div></div>",
  "<div></div><div></div><div></div>"
]
```

## Constraints

- 1 <= numberOfTags <= 10

## Hints

<details>
<summary>Hint 1</summary>
This is similar to generating valid parentheses combinations.
</details>

<details>
<summary>Hint 2</summary>
Track how many opening and closing tags you've used. You can add an opening tag if you haven't used all of them. You can add a closing tag if there are unclosed opening tags.
</details>

<details>
<summary>Hint 3</summary>
The number of valid combinations follows the Catalan number sequence.
</details>

## Approach

### Key Insight
This is equivalent to generating valid parentheses, just with `<div>` and `</div>` instead of `(` and `)`.

### Rules
1. Can add `<div>` if openingTagsUsed < numberOfTags
2. Can add `</div>` if closingTagsUsed < openingTagsUsed

### Recursion Tree for n=2
```
                         ""
                          |
                       "<div>"
                      /       \
           "<div><div>"     "<div></div>"
                |                  |
         "<div><div></div>"  "<div></div><div>"
                |                  |
      "<div><div></div></div>" "<div></div><div></div>"
```

### Algorithm
1. Start with empty string, 0 opening tags used, 0 closing tags used
2. If can add opening tag (opening < n): add `<div>` and recurse
3. If can add closing tag (closing < opening): add `</div>` and recurse
4. Base case: when opening == closing == n, add to result

**Time Complexity:** O(4^n / sqrt(n)) - Catalan number of valid combinations
**Space Complexity:** O(n) for recursion stack

---

## Similar Problems (Harder)

### 1. Generate Parentheses with Multiple Types
Generate valid combinations with (), [], and {} where different types cannot interleave improperly.
- **Key difference:** Must track multiple tag types and ensure proper nesting order.

### 2. Valid Parentheses String with Wildcards
Given a string with (, ), and *, count ways to make it valid where * can be (, ), or empty.
- **Key difference:** Counting problem with wildcards instead of generation.

### 3. Remove Invalid Parentheses
Remove minimum number of parentheses to make string valid, return all possible results.
- **Key difference:** Removal/optimization problem instead of generation.
