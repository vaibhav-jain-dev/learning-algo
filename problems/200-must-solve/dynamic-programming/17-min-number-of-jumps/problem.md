# Min Number Of Jumps

**Difficulty:** Hard (Red)

## Problem Statement

You're given a non-empty array of positive integers where each integer represents the maximum number of steps you can take forward from that position. For example, if the element at index `1` is `3`, you can go from index `1` to index `2`, `3`, or `4`.

Write a function that returns the minimum number of jumps needed to reach the last index of the array.

If it's not possible to reach the last index, return -1.

## Examples

**Example 1:**
```
Input: array = [3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3]
Output: 4
Explanation: 0 -> 3 -> 4 -> 6 -> 10 (indices)
             Jump from 0 to 3 (jump size 3)
             Jump from 3 to 4 (jump size 1)
             Jump from 4 to 6 (jump size 2)
             Jump from 6 to 10 (jump size 4)
```

**Example 2:**
```
Input: array = [2, 1, 1]
Output: 1
Explanation: Jump from index 0 directly to index 2
```

**Example 3:**
```
Input: array = [1, 1, 1, 1]
Output: 3
Explanation: Must jump one step at a time
```

**Example 4:**
```
Input: array = [3, 1]
Output: 1
Explanation: Jump from index 0 to index 1
```

**Example 5:**
```
Input: array = [1, 0, 1]
Output: -1
Explanation: Cannot pass index 1 (stuck at 0 steps)
```

## Constraints

- Array is non-empty with at least one element
- All elements are non-negative integers
- If array has only one element, return 0 (already at the end)

## Hints

<details>
<summary>Hint 1</summary>
Try thinking about this problem in terms of dynamic programming. At each index, you can compute the minimum number of jumps to reach that index from all previous indices.
</details>

<details>
<summary>Hint 2</summary>
For the DP approach: jumps[i] = min(jumps[j] + 1) for all j where j < i and j + array[j] >= i
</details>

<details>
<summary>Hint 3</summary>
Can you solve this in O(n) time? Think greedy: at each position, track the farthest you can reach and when you must take a jump.
</details>

<details>
<summary>Hint 4</summary>
For the greedy approach: Track current range end and farthest reachable. When you pass current range end, increment jumps and update range.
</details>

## Approach

### Approach 1: Dynamic Programming
1. Create array jumps[] where jumps[i] = min jumps to reach index i
2. jumps[0] = 0 (already at start)
3. For each index i from 1 to n-1:
   - For each previous index j where j + array[j] >= i:
     - jumps[i] = min(jumps[i], jumps[j] + 1)
4. Return jumps[n-1]

**Time Complexity:** O(n^2)
**Space Complexity:** O(n)

### Approach 2: Greedy (Optimal)
1. Track: jumps (count), currentEnd (max index reachable with current jumps), farthest (max index reachable overall)
2. Iterate through array (except last element):
   - Update farthest = max(farthest, i + array[i])
   - When i reaches currentEnd:
     - Increment jumps
     - Update currentEnd = farthest
     - If farthest hasn't changed, return -1 (stuck)
3. Return jumps

**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

## Similar Problems (Related)

### 1. Jump Game (Can Reach End?)
**Difficulty:** Medium

Determine if you can reach the last index (boolean answer).

### 2. Jump Game III (Bidirectional)
**Difficulty:** Medium

Can jump forward or backward by exactly arr[i] steps.

### 3. Jump Game VII (Substring Jumps)
**Difficulty:** Medium-Hard

Jump only to indices in range [i+minJump, i+maxJump] if that position is '0'.
