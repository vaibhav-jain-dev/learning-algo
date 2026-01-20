# Alien Dictionary

**Difficulty:** Hard

## Problem Statement

There is a new alien language that uses the English alphabet. The order among letters is unknown. You are given a list of strings `words` from the alien language's dictionary, where the strings are sorted lexicographically by the rules of this new language.

Derive the order of letters in this language and return it. If no valid order exists, return "". If there are multiple valid orderings, return any of them.

## Examples

**Example 1:**
```
Input: words = ["wrt","wrf","er","ett","rftt"]
Output: "wertf"
```

**Example 2:**
```
Input: words = ["z","x"]
Output: "zx"
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Comparison</th>
<th style="border: 1px solid #ddd; padding: 10px;">Deduction</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">wrt vs wrf</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">t -> f</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">wrf vs er</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">w -> e</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">er vs ett</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">r -> t</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">ett vs rftt</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">e -> r</td>
</tr>
</table>

Final order: w -> e -> r -> t -> f

## Approach

1. Build graph from adjacent word comparisons
2. Run topological sort
3. Handle edge cases (invalid inputs, cycles)

**Time Complexity:** O(C) where C is total length of all words
**Space Complexity:** O(1) for 26 letters or O(U) for unique characters
