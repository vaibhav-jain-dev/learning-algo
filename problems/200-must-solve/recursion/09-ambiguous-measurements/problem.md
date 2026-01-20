<div id="viz-config" style="display:none">
{"name":"Ambiguous Measurements","algorithm":"recursion-measurements","complexity":{"time":"O(target * maxRange * numCups)","space":"O(target * maxRange)"},"examples":[{"input":{"cups":[[200,210],[450,465],[800,850]],"target":2100},"output":true,"inputRaw":"cups = [[200, 210], [450, 465], [800, 850]], target = 2100","outputRaw":"true"}]}
</div>

# Ambiguous Measurements

**Difficulty:** Hard

## Problem Statement

You have a measuring cup that can measure exactly `low` to `high` milliliters of liquid inclusively (the measuring lines are ambiguous between `low` and `high`).

Given a list of such measuring cups and a target amount of liquid, write a function that returns whether it's possible to measure exactly the target amount.

Each measuring cup can be used any number of times. Note that you can pour liquid into a larger container and can freely discard liquid (but you can't pour part of a cup measurement).

## Examples

**Example 1:**
```
Input:
  cups = [[200, 210], [450, 465], [800, 850]]
  target = 2100

Output: true
Explanation:
  Pour 450-465 ml 4 times: 4 * 450 = 1800, 4 * 465 = 1860 (range: 1800-1860)
  Pour 200-210 ml 1 time: adds 200-210
  Total range: 2000-2070... This doesn't work.

  Actually: Pour 200-210 ml 10 times, and 800-850 ml once:
  Low: 10*200 + 0*800 = 2000
  High: 10*210 + 0*850 = 2100
  Target 2100 is within [2000, 2100] -- this works!
```

**Example 2:**
```
Input:
  cups = [[100, 150]]
  target = 200

Output: true
Explanation: Use cup twice: range is [200, 300], which includes 200.
```

**Example 3:**
```
Input:
  cups = [[50, 60]]
  target = 75

Output: false
Explanation: No combination of [50,60] cups can measure exactly 75.
```

## Constraints

- 1 <= cups.length <= 10
- 1 <= low <= high <= 1000
- 1 <= target <= 5000
- Each cup can be used any number of times

## Hints

<details>
<summary>Hint 1</summary>
Think about what ranges of values are achievable. If [L1, H1] and [L2, H2] are achievable, then [L1+L2, H1+H2] is achievable.
</details>

<details>
<summary>Hint 2</summary>
Use recursion with memoization. State is (minAchievable, maxAchievable) after using some cups.
</details>

<details>
<summary>Hint 3</summary>
If target is in range [minAchievable, maxAchievable], we've succeeded. If minAchievable > target, we've overshot and can prune.
</details>

## Approach

### Key Insight
When combining cup measurements:
- If we achieve range [L, H] and add a cup [l, h], we get range [L+l, H+h]
- We succeed if target falls within our achievable range
- We fail if our minimum exceeds target (no way to go back down)

### Recursive Solution
```
canMeasure(cups, target, currentLow, currentHigh, memo):
    if target in [currentLow, currentHigh]: return True
    if currentLow > target: return False  # Overshot
    if (currentLow, currentHigh) in memo: return memo[(currentLow, currentHigh)]

    for each cup [low, high]:
        if canMeasure(cups, target, currentLow + low, currentHigh + high, memo):
            return True

    memo[(currentLow, currentHigh)] = False
    return False
```

### State Space
- State: (currentLow, currentHigh)
- Transitions: add any cup to current range
- Goal: target is within current range

**Time Complexity:** O(target * maxRange * numCups) with memoization
**Space Complexity:** O(target * maxRange) for memo

---

## Similar Problems (Harder)

### 1. Coin Change with Ranges
Given coins with value ranges [low, high], find if you can make exact change for a target.
- **Key difference:** Similar structure but often requires counting combinations, not just feasibility.

### 2. Subset Sum with Tolerance
Find if a subset sums to target within a tolerance range, elements have ranges too.
- **Key difference:** Each element used at most once, not unlimited times.

### 3. Water Jug Problem (Die Hard)
Given jugs of capacity X and Y, determine if you can measure exactly Z liters.
- **Key difference:** More complex state transitions (fill, empty, pour between jugs).
