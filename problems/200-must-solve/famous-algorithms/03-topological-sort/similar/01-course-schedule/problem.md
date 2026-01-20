<div id="viz-config" style="display:none">
{"name":"Course Schedule","algorithm":"topological-sort","complexity":{"time":"O(V + E)","space":"O(V + E)"},"examples":[{"input":{"numCourses":2,"prerequisites":[[1,0]]},"output":true,"inputRaw":"numCourses = 2, prerequisites = [[1,0]]","outputRaw":"true"},{"input":{"numCourses":2,"prerequisites":[[1,0],[0,1]]},"output":false,"inputRaw":"numCourses = 2, prerequisites = [[1,0],[0,1]]","outputRaw":"false"}]}
</div>

# Course Schedule

**Difficulty:** Medium

## Problem Statement

There are `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` before course `ai`.

Return `true` if you can finish all courses, or `false` if there is a cycle.

## Examples

**Example 1:**
```
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: Take course 0 first, then course 1
```

**Example 2:**
```
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: Courses 0 and 1 depend on each other - cycle!
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Scenario</th>
<th style="border: 1px solid #ddd; padding: 10px;">Graph</th>
<th style="border: 1px solid #ddd; padding: 10px;">Result</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">No cycle</td>
<td style="border: 1px solid #ddd; padding: 10px;">0 -> 1 -> 2</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">true</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">Cycle</td>
<td style="border: 1px solid #ddd; padding: 10px;">0 -> 1 -> 0</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #f8d7da;">false</td>
</tr>
</table>

## Approach

Use topological sort - if all nodes can be processed, no cycle exists.

**Time Complexity:** O(V + E)
**Space Complexity:** O(V + E)
