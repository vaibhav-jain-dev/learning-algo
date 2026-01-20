# Spiral Matrix II (Generate)

**Difficulty:** Medium

## Problem Statement

Given a positive integer `n`, generate an `n x n` matrix filled with elements from 1 to n^2 in spiral order.

## Examples

**Example 1:**
```
Input: n = 3
Output: [
    [1, 2, 3],
    [8, 9, 4],
    [7, 6, 5]
]
```

**Example 2:**
```
Input: n = 4
Output: [
    [1,  2,  3,  4],
    [12, 13, 14, 5],
    [11, 16, 15, 6],
    [10, 9,  8,  7]
]
```

**Example 3:**
```
Input: n = 1
Output: [[1]]
```

## Constraints

- 1 <= n <= 20

---

## Thought Process & Pattern Recognition

### Step 1: Reverse of Spiral Traverse

While Spiral Traverse **reads** from a matrix, this problem **writes** to a matrix.

<div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 10px 0;">
<strong>Key Insight:</strong> Same boundary-shrinking technique, but instead of reading values, we write incrementing numbers.
</div>

### Step 2: Direction Pattern

The spiral follows a fixed pattern:
1. **Right:** Row stays same, column increases
2. **Down:** Column stays same, row increases
3. **Left:** Row stays same, column decreases
4. **Up:** Column stays same, row decreases
5. Repeat with shrinking boundaries

---

## Visual Diagram: How It Works

### Input: n = 3

### Step-by-Step Generation

**Step 1:** Initialize 3x3 matrix and start filling

<table style="border-collapse: collapse; margin: 20px 0;">
<tr>
<td style="border: 2px solid #007bff; padding: 15px; text-align: center; width: 50px; background: #e7f3ff;"><strong>1</strong></td>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center; width: 50px;"></td>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center; width: 50px;"></td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
</tr>
</table>

<div style="background: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0;">
Start at (0,0), write 1, move RIGHT
</div>

---

**Step 2:** Fill top row (going RIGHT)

<table style="border-collapse: collapse; margin: 20px 0;">
<tr>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; width: 50px; background: #d4edda;"><strong>1</strong></td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; width: 50px; background: #d4edda;"><strong>2</strong></td>
<td style="border: 2px solid #007bff; padding: 15px; text-align: center; width: 50px; background: #e7f3ff;"><strong>3</strong></td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
</tr>
</table>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
Filled top row: 1, 2, 3. Now turn DOWN.
</div>

---

**Step 3:** Fill right column (going DOWN)

<table style="border-collapse: collapse; margin: 20px 0;">
<tr>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; width: 50px; background: #d4edda;">1</td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; width: 50px; background: #d4edda;">2</td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; width: 50px; background: #d4edda;">3</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; background: #d4edda;"><strong>4</strong></td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
<td style="border: 2px solid #007bff; padding: 15px; text-align: center; background: #e7f3ff;"><strong>5</strong></td>
</tr>
</table>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
Filled right column: 4, 5. Now turn LEFT.
</div>

---

**Step 4:** Fill bottom row (going LEFT)

<table style="border-collapse: collapse; margin: 20px 0;">
<tr>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; width: 50px; background: #d4edda;">1</td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; width: 50px; background: #d4edda;">2</td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; width: 50px; background: #d4edda;">3</td>
</tr>
<tr>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; background: #d4edda;">4</td>
</tr>
<tr>
<td style="border: 2px solid #007bff; padding: 15px; text-align: center; background: #e7f3ff;"><strong>7</strong></td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; background: #d4edda;"><strong>6</strong></td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; background: #d4edda;">5</td>
</tr>
</table>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
Filled bottom row: 6, 7. Now turn UP.
</div>

---

**Step 5:** Fill left column (going UP)

<table style="border-collapse: collapse; margin: 20px 0;">
<tr>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; width: 50px; background: #d4edda;">1</td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; width: 50px; background: #d4edda;">2</td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; width: 50px; background: #d4edda;">3</td>
</tr>
<tr>
<td style="border: 2px solid #007bff; padding: 15px; text-align: center; background: #e7f3ff;"><strong>8</strong></td>
<td style="border: 1px solid #dee2e6; padding: 15px; text-align: center;"></td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; background: #d4edda;">4</td>
</tr>
<tr>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; background: #d4edda;">7</td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; background: #d4edda;">6</td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; background: #d4edda;">5</td>
</tr>
</table>

<div style="background: #d4edda; padding: 10px; border-radius: 5px; margin: 10px 0;">
Filled left column: 8. Boundaries shrink, continue spiral inward.
</div>

---

**Step 6:** Fill center (inner layer)

<table style="border-collapse: collapse; margin: 20px 0;">
<tr>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; width: 50px; background: #d4edda;">1</td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; width: 50px; background: #d4edda;">2</td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; width: 50px; background: #d4edda;">3</td>
</tr>
<tr>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; background: #d4edda;">8</td>
<td style="border: 2px solid #ffc107; padding: 15px; text-align: center; background: #fff3cd;"><strong>9</strong></td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; background: #d4edda;">4</td>
</tr>
<tr>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; background: #d4edda;">7</td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; background: #d4edda;">6</td>
<td style="border: 1px solid #28a745; padding: 15px; text-align: center; background: #d4edda;">5</td>
</tr>
</table>

### Final Result

<div style="background: #cce5ff; color: #004085; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
<strong>Output: [[1,2,3],[8,9,4],[7,6,5]]</strong>
</div>

---

## Solution Approaches

### Approach 1: Layer-by-Layer (Recommended)

| Metric | Value |
|--------|-------|
| Time Complexity | O(n^2) |
| Space Complexity | O(1) extra (O(n^2) for result) |

**Why this is best:**
- Same pattern as spiral traverse
- Easy to understand
- Handles all cases

### Approach 2: Direction Vectors

| Metric | Value |
|--------|-------|
| Time Complexity | O(n^2) |
| Space Complexity | O(1) extra |

**How it works:**
- Use direction vectors: [(0,1), (1,0), (0,-1), (-1,0)]
- Change direction when hitting boundary or filled cell
