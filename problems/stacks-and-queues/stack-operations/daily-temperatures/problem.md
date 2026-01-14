# Daily Temperatures

## Problem Description

Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`th day to get a warmer temperature.

If there is no future day for which this is possible, keep `answer[i] == 0` instead.

## Examples

### Example 1
```
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
Explanation:
- Day 0 (73): Next warmer is day 1 (74), wait 1 day
- Day 1 (74): Next warmer is day 2 (75), wait 1 day
- Day 2 (75): Next warmer is day 6 (76), wait 4 days
- Day 3 (71): Next warmer is day 5 (72), wait 2 days
- Day 4 (69): Next warmer is day 5 (72), wait 1 day
- Day 5 (72): Next warmer is day 6 (76), wait 1 day
- Day 6 (76): No warmer day, answer is 0
- Day 7 (73): No warmer day, answer is 0
```

### Example 2
```
Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]
Explanation: Strictly increasing temperatures, each day waits just 1 day (except the last).
```

### Example 3
```
Input: temperatures = [30,60,90]
Output: [1,1,0]
```

### Example 4
```
Input: temperatures = [90,80,70,60]
Output: [0,0,0,0]
Explanation: Strictly decreasing temperatures, no day has a warmer future day.
```

### Example 5
```
Input: temperatures = [70,70,70,70]
Output: [0,0,0,0]
Explanation: All temperatures are equal, so no day has a strictly warmer future day.
```

## Constraints
- `1 <= temperatures.length <= 10^5`
- `30 <= temperatures[i] <= 100`

## Hints

<details>
<summary>Hint 1</summary>
A brute force approach would check every future day for each day - this is O(n^2). Can we do better?
</details>

<details>
<summary>Hint 2</summary>
Consider using a monotonic stack. Think about what invariant the stack should maintain.
</details>

<details>
<summary>Hint 3</summary>
Use a stack that maintains indices of temperatures in decreasing order. When you find a warmer temperature, you can resolve all colder days in the stack.
</details>

<details>
<summary>Hint 4</summary>
Process from left to right. For each temperature, pop from stack while current temperature is warmer than the temperature at stack's top index. The difference in indices gives the waiting days.
</details>

## Approach

### Monotonic Stack Solution

The key insight is to use a **monotonic decreasing stack** (storing indices, not values):

1. **Initialize**: Create a result array filled with zeros and an empty stack.

2. **Process each day**:
   - While the stack is not empty AND current temperature > temperature at index on top of stack:
     - Pop the index from stack
     - Calculate days to wait: current index - popped index
     - Store this in the result array at the popped index
   - Push the current index onto the stack

3. **Remaining indices**: Any indices left in the stack have no warmer future day (already initialized to 0).

### Why Monotonic Stack Works

- The stack maintains indices of days that haven't found their "next warmer day" yet
- These indices are in decreasing order of temperature (monotonic decreasing)
- When we find a warmer day, we can resolve all pending colder days
- Each index is pushed once and popped at most once, giving O(n) time

### Visual Example

For `[73, 74, 75, 71, 69, 72, 76, 73]`:

```
Day 0: Push 0 (73). Stack: [0]
Day 1: 74 > 73, pop 0, result[0]=1. Push 1. Stack: [1]
Day 2: 75 > 74, pop 1, result[1]=1. Push 2. Stack: [2]
Day 3: 71 < 75, push 3. Stack: [2,3]
Day 4: 69 < 71, push 4. Stack: [2,3,4]
Day 5: 72 > 69, pop 4, result[4]=1. 72 > 71, pop 3, result[3]=2. Push 5. Stack: [2,5]
Day 6: 76 > 72, pop 5, result[5]=1. 76 > 75, pop 2, result[2]=4. Push 6. Stack: [6]
Day 7: 73 < 76, push 7. Stack: [6,7]

Result: [1,1,4,2,1,1,0,0]
```

### Time Complexity
- **O(n)** - each element is pushed and popped at most once

### Space Complexity
- **O(n)** - for the stack and result array
