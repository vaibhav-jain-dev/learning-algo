# Trapping Rain Water

**Difficulty:** Hard (L2 - Requires Deep Thinking)
**Category:** Arrays, Two Pointers, Dynamic Programming, Stack
**Companies:** Google, Amazon, Facebook, Microsoft, Apple, Bloomberg

## Problem Statement

Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

## Visual Understanding

```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]

Visualization:
                        █
            █           █ █   █
        █   █ █   █ █   █ █ █ █ █
    █   █ █ █ █ █ █ █ █ █ █ █ █ █
    ─────────────────────────────
    0 1 0 2 1 0 1 3 2 1 2 1

Water trapped (shown as ~):
                        █
            █ ~ ~ ~ ~ ~ █ █ ~ █
        █ ~ █ █ ~ █ █ ~ █ █ █ █ █
    █ ~ █ █ █ █ █ █ █ █ █ █ █ █ █
    ─────────────────────────────

Output: 6 (total water units)
```

## Examples

### Example 1
```
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The elevation map (shown above) can trap 6 units of rain water.
```

### Example 2
```
Input: height = [4,2,0,3,2,5]
Output: 9

Visualization:
        █               █
        █       █       █
        █   ~   █   ~   █
        █   ~   █   █   █
        █   █   █   █   █
        ─────────────────
        4   2   0   3   2   5

Water trapped: 9 units
```

### Example 3
```
Input: height = [4,2,3]
Output: 1
Explanation: Water trapped between index 0 and 2, at index 1.
```

### Example 4 (Edge Case)
```
Input: height = [1,2,3,4,5]
Output: 0
Explanation: Monotonically increasing - no water can be trapped.
```

### Example 5 (Edge Case)
```
Input: height = [5,4,3,2,1]
Output: 0
Explanation: Monotonically decreasing - no water can be trapped.
```

## Constraints

- `n == height.length`
- `1 <= n <= 2 * 10^4`
- `0 <= height[i] <= 10^5`

## Mental Model & Thinking Process

### Key Insight #1: Water at Each Position
The amount of water at any position `i` depends on:
- The **maximum height to the left** of `i`
- The **maximum height to the right** of `i`
- The **current height** at `i`

**Formula:**
```
water[i] = min(maxLeft[i], maxRight[i]) - height[i]
```

Water level at position i is bounded by the **shorter** of the two surrounding max heights (think: water finds the lowest escape point).

### Key Insight #2: Why Two Pointers Work
If we have pointers at left and right:
- If `maxLeft < maxRight`: We know the water at left is bounded by maxLeft (it can't overflow to the right because there's something taller there)
- If `maxRight < maxLeft`: We know the water at right is bounded by maxRight

This allows us to process one side at a time without knowing the full picture.

### Key Insight #3: Stack-Based Thinking
Think of bars as walls. When we encounter a taller bar:
- All shorter bars to its left can now potentially hold water
- We "pop" shorter bars and calculate horizontal water slices

## Hints

<details>
<summary>Hint 1: Think About What Determines Water Level</summary>

Water at position `i` can only be as high as the shorter of the tallest bars on its left and right. Why? Because water would overflow through the shorter side.
</details>

<details>
<summary>Hint 2: Precompute Approach</summary>

What if you precomputed the maximum height to the left and right of each position? Then you could calculate water at each position in O(1).
</details>

<details>
<summary>Hint 3: Two Pointer Optimization</summary>

You don't need to precompute. If you have two pointers at left and right, you always know that the water level at the shorter side is determined by its max (not the other side). Why? Because there's definitely something taller on the other side.
</details>

<details>
<summary>Hint 4: Stack Approach</summary>

Maintain a stack of indices in decreasing order of heights. When you see a taller bar, pop from the stack and calculate water that can be trapped between the current bar and the new stack top.
</details>

## Approach Explanations

### Approach 1: Brute Force (TLE)
**Time: O(n²) | Space: O(1)**

For each position, scan left and right to find max heights.

```
For each position i:
    Find max height to the left
    Find max height to the right
    Water at i = min(maxLeft, maxRight) - height[i]
```

**Why it works:** Directly applies the key insight.
**Why it's slow:** Redundant scanning for each position.

### Approach 2: Dynamic Programming (Precomputation)
**Time: O(n) | Space: O(n)**

Precompute maxLeft[i] and maxRight[i] arrays.

```
Pass 1: Build maxLeft array (left to right)
Pass 2: Build maxRight array (right to left)
Pass 3: Calculate water at each position
```

**Trade-off:** Uses extra space but avoids redundant computation.

### Approach 3: Two Pointers (Optimal)
**Time: O(n) | Space: O(1)**

Key insight: We only need to know the max height on the shorter side.

```
left = 0, right = n-1
maxLeft = 0, maxRight = 0

While left < right:
    If height[left] < height[right]:
        # Water at left bounded by maxLeft
        If height[left] >= maxLeft:
            maxLeft = height[left]
        Else:
            water += maxLeft - height[left]
        left++
    Else:
        # Water at right bounded by maxRight
        If height[right] >= maxRight:
            maxRight = height[right]
        Else:
            water += maxRight - height[right]
        right--
```

**Why this works:** When height[left] < height[right], we know there's at least one bar on the right that's taller than the current left bar. So the water level at left is determined solely by maxLeft.

### Approach 4: Monotonic Stack
**Time: O(n) | Space: O(n)**

Maintain stack of indices in decreasing height order.

```
For each bar:
    While stack not empty AND current bar > stack top:
        Pop mid = stack.pop()
        If stack empty: break (no left boundary)

        width = current_index - stack.top() - 1
        bounded_height = min(height[current], height[stack.top()]) - height[mid]
        water += width * bounded_height

    Push current index
```

**Intuition:** Calculate water in horizontal layers, bounded by the current bar and the one before the popped bar.

## Visual Walkthrough (Two Pointers)

```
height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
          ↑                                ↑
          L                                R
          maxL=0                       maxR=0
          water=0

Step 1: height[L]=0 < height[R]=1
        height[L]=0 >= maxL? No
        water += maxL - height[L] = 0
        L++

height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
             ↑                             ↑
             L                             R
             maxL=0                    maxR=0
             water=0

Step 2: height[L]=1 >= height[R]=1
        height[R]=1 >= maxR=0? Yes
        maxR = 1
        R--

... continue until L meets R ...

Final: water = 6
```

## Common Mistakes to Avoid

1. **Forgetting edge cases:** Empty array, single element, monotonic arrays
2. **Off-by-one errors:** In two-pointer bounds and stack calculations
3. **Negative water:** Always max with 0 when calculating water
4. **Not handling equal heights:** In two-pointer, handle `height[left] == height[right]` consistently

## Complexity Analysis

| Approach | Time | Space | Notes |
|----------|------|-------|-------|
| Brute Force | O(n²) | O(1) | TLE for large inputs |
| DP (Precompute) | O(n) | O(n) | 3 passes, extra arrays |
| Two Pointers | O(n) | O(1) | Optimal, single pass |
| Monotonic Stack | O(n) | O(n) | Each element pushed/popped once |

## Related Problems

- Container With Most Water (Medium)
- Largest Rectangle in Histogram (Hard)
- Maximal Rectangle (Hard)
- Pour Water (Medium)

## Interview Tips

1. **Start with brute force:** Show you understand the problem
2. **Identify redundancy:** What are we recalculating?
3. **Optimize step by step:** Brute Force → DP → Two Pointers
4. **Draw examples:** Visualize water trapping
5. **Verify with edge cases:** Empty, single, monotonic

## Follow-up Questions

1. **What if bars have different widths?**
2. **What if we want to find the maximum volume in 3D?**
3. **Can you solve this with a single pass and O(1) space using a different technique?**
