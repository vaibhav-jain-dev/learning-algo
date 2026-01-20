<div id="viz-config" style="display:none">
{"name":"Parallel Courses","algorithm":"topological-sort","complexity":{"time":"O(V + E)","space":"O(V + E)"},"examples":[{"input":{"n":3,"relations":[[1,3],[2,3]]},"output":2,"inputRaw":"n = 3, relations = [[1,3],[2,3]]","outputRaw":"2"}]}
</div>

# Parallel Courses

**Difficulty:** Medium

## Problem Statement

You are given an integer `n`, which indicates there are `n` courses labeled from `1` to `n`. You are also given an array `relations` where `relations[i] = [prevCourse, nextCourse]`, indicating that `prevCourse` must be taken before `nextCourse`.

In one semester, you can take any number of courses as long as all prerequisites are completed. Return the minimum number of semesters needed to complete all courses. Return `-1` if it's impossible.

## Examples

**Example 1:**
```
Input: n = 3, relations = [[1,3],[2,3]]
Output: 2
Explanation: Semester 1: courses 1, 2. Semester 2: course 3
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Semester</th>
<th style="border: 1px solid #ddd; padding: 10px;">Courses Available</th>
<th style="border: 1px solid #ddd; padding: 10px;">Take</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">1</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">[1, 2]</td>
<td style="border: 1px solid #ddd; padding: 10px;">1, 2</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">2</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">[3]</td>
<td style="border: 1px solid #ddd; padding: 10px;">3</td>
</tr>
</table>

## Approach

Use BFS level-by-level traversal. Each level represents one semester.

**Time Complexity:** O(V + E)
**Space Complexity:** O(V + E)
