# Tournament with Tiebreakers

**Difficulty:** Medium

## Problem Statement

Same as tournament winner but with tiebreaker rules: if points are equal, the team with more head-to-head wins against tied opponents wins.

## Examples

**Example 1:**
```
Input: competitions = [["A","B"],["B","C"],["C","A"]], results = [1,1,0]
Output: "A" (A beats B, B beats C, A beats C - A has best record)
```

## Constraints

- competitions.length == results.length
- competitions[i].length == 2
- All team names are unique strings
