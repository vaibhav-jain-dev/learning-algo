# Largest Rectangle in Histogram

## Problem Description

Given an array of integers `heights` representing the histogram's bar height where the width of each bar is `1`, return the area of the largest rectangle in the histogram.

## Examples

### Example 1
```
Input: heights = [2,1,5,6,2,3]
Output: 10

Visual representation:
       _
      | |
   _ _| |
  | | | |_
  | | | | |_
 _| | | | | |
|_|_|_|_|_|_|
 2 1 5 6 2 3

Explanation: The largest rectangle has area = 10 units (formed by bars at indices 2 and 3 with height 5).
```

### Example 2
```
Input: heights = [2,4]
Output: 4
Explanation: The largest rectangle is formed by either bar alone (2*1=2 or 4*1=4) or both bars with min height (2*2=4).
```

### Example 3
```
Input: heights = [1,1,1,1]
Output: 4
Explanation: All bars have the same height, so the largest rectangle spans all 4 bars with height 1.
```

### Example 4
```
Input: heights = [5,4,3,2,1]
Output: 9
Explanation: The largest rectangle is formed by bars at indices 0-2 with height 3 (3*3=9).
```

### Example 5
```
Input: heights = [1,2,3,4,5]
Output: 9
Explanation: The largest rectangle is formed by bars at indices 2-4 with height 3 (3*3=9).
```

## Constraints
- `1 <= heights.length <= 10^5`
- `0 <= heights[i] <= 10^4`

## Hints

<details>
<summary>Hint 1</summary>
For each bar, think about finding the largest rectangle where that bar is the shortest bar (determines the height).
</details>

<details>
<summary>Hint 2</summary>
For each bar, you need to find how far left and how far right it can extend while still being the minimum height.
</details>

<details>
<summary>Hint 3</summary>
Use a monotonic increasing stack. When you encounter a bar shorter than the top of the stack, you can calculate the area for the taller bars.
</details>

<details>
<summary>Hint 4</summary>
The width of the rectangle for a popped bar is: current_index - stack_top_after_pop - 1 (or current_index if stack is empty).
</details>

## Approach

### Monotonic Stack Solution

The key insight is that for each bar, we want to find the maximum rectangle where that bar is the limiting height (the shortest bar in the rectangle).

**Algorithm:**

1. **Use a monotonic increasing stack** that stores indices of bars in increasing order of height.

2. **For each bar**:
   - While the stack is not empty AND current bar is shorter than the bar at stack's top:
     - Pop the top index - this bar will be the height of a rectangle
     - Calculate width:
       - If stack is empty after pop: width = current_index
       - Otherwise: width = current_index - stack_top - 1
     - Calculate area = height * width
     - Update max area if needed
   - Push current index onto stack

3. **Process remaining bars in stack** (using array length as the "current index")

### Visual Example

For `[2, 1, 5, 6, 2, 3]`:

```
Index 0: Push 0. Stack: [0]
Index 1: 1 < 2, pop 0, area = 2*1 = 2. Push 1. Stack: [1]
Index 2: 5 > 1, push 2. Stack: [1, 2]
Index 3: 6 > 5, push 3. Stack: [1, 2, 3]
Index 4: 2 < 6, pop 3, area = 6*1 = 6.
         2 < 5, pop 2, area = 5*2 = 10. Push 4. Stack: [1, 4]
Index 5: 3 > 2, push 5. Stack: [1, 4, 5]

End processing:
Pop 5: area = 3*1 = 3
Pop 4: area = 2*4 = 8
Pop 1: area = 1*6 = 6

Maximum area = 10
```

### Time Complexity
- **O(n)** - each element is pushed and popped at most once

### Space Complexity
- **O(n)** - for the stack

### Why This Works

- When we pop a bar from the stack, we know:
  - All bars to its right (up to current) are at least as tall
  - All bars to its left (down to the new stack top) are at least as tall
  - So the popped bar's height is the limiting factor for a rectangle spanning that width
