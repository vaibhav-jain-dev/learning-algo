<div id="viz-config" style="display:none">
{"name":"Fibonacci with Matrix Exponentiation","algorithm":"recursion-fibonacci","complexity":{"time":"O(log n)","space":"O(1)"},"examples":[{"input":{"n":10},"output":55,"inputRaw":"n = 10","outputRaw":"55"}]}
</div>

# Fibonacci with Matrix Exponentiation

**Difficulty:** Hard

## Problem Statement

Given a very large number n (up to 10^18), compute the n-th Fibonacci number modulo 10^9 + 7.

The standard O(n) approach is too slow for such large n. Use matrix exponentiation to achieve O(log n) time complexity.

## Examples

**Example 1:**
```
Input: n = 10
Output: 55
```

**Example 2:**
```
Input: n = 1000000000 (10^9)
Output: 21 (modulo 10^9 + 7)
```

**Example 3:**
```
Input: n = 0
Output: 0
```

## Constraints

- 0 <= n <= 10^18
- Return result modulo 10^9 + 7

---

## Thought Process & Pattern Recognition

### Step 1: Why Standard Approaches Fail

**For n = 10^18:**
- Iterative O(n): Would take ~31 years at 1 billion ops/sec
- We need O(log n): ~60 operations!

### Step 2: The Key Mathematical Insight

**Fibonacci can be expressed as matrix multiplication:**

```
[F(n+1)]   [1 1]^n   [F(1)]   [1]
[F(n)  ] = [1 0]   * [F(0)] = [0]
```

**Why does this work?**
```
[1 1] * [F(n)  ]   [F(n) + F(n-1)]   [F(n+1)]
[1 0]   [F(n-1)] = [F(n)        ] = [F(n)  ]
```

### Step 3: Matrix Exponentiation

We can compute M^n in O(log n) using **binary exponentiation**:

```
M^8 = M^4 * M^4
M^4 = M^2 * M^2
M^2 = M * M
```

Instead of 8 multiplications, we need only 3!

---

## Visual Diagram: Matrix Exponentiation

### The Matrix Relationship

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 20px;">
<strong>Fibonacci as Matrix Power</strong>
</div>

<div style="display: flex; justify-content: center; align-items: center; gap: 15px; flex-wrap: wrap; margin: 20px 0;">
  <div style="background: #007bff; color: white; padding: 20px; border-radius: 8px; text-align: center;">
    <div style="font-size: 18px; margin-bottom: 10px;">[F(n+1)]</div>
    <div style="font-size: 18px;">[F(n)]</div>
  </div>
  <div style="font-size: 24px; color: #6c757d;">=</div>
  <div style="background: #dc3545; color: white; padding: 20px; border-radius: 8px; text-align: center;">
    <div style="font-size: 18px; margin-bottom: 10px;">[1 1]^n</div>
    <div style="font-size: 18px;">[1 0]</div>
  </div>
  <div style="font-size: 24px; color: #6c757d;">*</div>
  <div style="background: #28a745; color: white; padding: 20px; border-radius: 8px; text-align: center;">
    <div style="font-size: 18px; margin-bottom: 10px;">[1]</div>
    <div style="font-size: 18px;">[0]</div>
  </div>
</div>

<div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
<strong>Therefore:</strong> F(n) = M[1][0] where M = base^n
</div>

</div>

### Binary Exponentiation Process

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 15px;">
<strong>Computing M^13 (binary: 1101)</strong>
</div>

<table style="border-collapse: collapse; margin: 20px auto; font-family: monospace;">
<tr style="background: #e9ecef;">
  <th style="border: 1px solid #dee2e6; padding: 12px;">Step</th>
  <th style="border: 1px solid #dee2e6; padding: 12px;">n (binary)</th>
  <th style="border: 1px solid #dee2e6; padding: 12px;">n % 2</th>
  <th style="border: 1px solid #dee2e6; padding: 12px;">Action</th>
  <th style="border: 1px solid #dee2e6; padding: 12px;">Result</th>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">0</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">1101</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #d4edda;">1</td>
  <td style="border: 1px solid #dee2e6; padding: 12px;">result *= M^1</td>
  <td style="border: 1px solid #dee2e6; padding: 12px;">M^1</td>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">1</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">110</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #f8d7da;">0</td>
  <td style="border: 1px solid #dee2e6; padding: 12px;">skip multiply</td>
  <td style="border: 1px solid #dee2e6; padding: 12px;">M^1</td>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">2</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">11</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #d4edda;">1</td>
  <td style="border: 1px solid #dee2e6; padding: 12px;">result *= M^4</td>
  <td style="border: 1px solid #dee2e6; padding: 12px;">M^5</td>
</tr>
<tr>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">3</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center;">1</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; text-align: center; background: #d4edda;">1</td>
  <td style="border: 1px solid #dee2e6; padding: 12px;">result *= M^8</td>
  <td style="border: 1px solid #dee2e6; padding: 12px; background: #28a745; color: white; font-weight: bold;">M^13</td>
</tr>
</table>

<div style="display: flex; justify-content: center; gap: 10px; margin: 20px 0;">
  <div style="background: #cce5ff; padding: 10px 20px; border-radius: 5px;">
    <strong>13 = 8 + 4 + 1</strong>
  </div>
  <div style="background: #cce5ff; padding: 10px 20px; border-radius: 5px;">
    <strong>M^13 = M^8 * M^4 * M^1</strong>
  </div>
</div>

<div style="background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin-top: 15px; text-align: center;">
<strong>Only 4 iterations instead of 13 multiplications!</strong><br>
For n = 10^18: Only ~60 iterations needed!
</div>

</div>

### Matrix Multiplication Detail

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace;">

<div style="text-align: center; margin-bottom: 15px;">
<strong>2x2 Matrix Multiplication</strong>
</div>

<div style="display: flex; justify-content: center; align-items: center; gap: 10px; flex-wrap: wrap; margin: 20px 0;">
  <div style="background: #007bff; color: white; padding: 15px; border-radius: 8px; text-align: center;">
    <div>[a b]</div>
    <div>[c d]</div>
  </div>
  <div style="font-size: 20px;">*</div>
  <div style="background: #28a745; color: white; padding: 15px; border-radius: 8px; text-align: center;">
    <div>[e f]</div>
    <div>[g h]</div>
  </div>
  <div style="font-size: 20px;">=</div>
  <div style="background: #dc3545; color: white; padding: 15px; border-radius: 8px; text-align: center;">
    <div>[ae+bg  af+bh]</div>
    <div>[ce+dg  cf+dh]</div>
  </div>
</div>

<div style="background: #fff3cd; color: #856404; padding: 10px; border-radius: 5px; margin-top: 15px; text-align: center;">
<strong>Remember:</strong> Apply modulo after each operation to prevent overflow!
</div>

</div>

---

## Solution Approaches

### Approach 1: Matrix Exponentiation (Optimal)

| Metric | Value |
|--------|-------|
| Time Complexity | O(log n) |
| Space Complexity | O(1) |

**Why this is best:**
- Handles n up to 10^18 in microseconds
- Uses only constant extra space
- Essential for competitive programming

### Approach 2: Fast Doubling

| Metric | Value |
|--------|-------|
| Time Complexity | O(log n) |
| Space Complexity | O(log n) stack |

**Alternative O(log n) method using identities:**
- F(2k) = F(k) * [2*F(k+1) - F(k)]
- F(2k+1) = F(k+1)^2 + F(k)^2

---

## Complexity Comparison

| Approach | Time | Space | Max n |
|----------|------|-------|-------|
| Naive Recursion | O(2^n) | O(n) | ~40 |
| Iterative | O(n) | O(1) | ~10^8 |
| Matrix Exponentiation | O(log n) | O(1) | ~10^18 |
| Fast Doubling | O(log n) | O(log n) | ~10^18 |

---

## Common Pitfalls

1. **Integer Overflow:** Always use modulo after each operation
2. **Base Case:** Handle n=0 and n=1 separately
3. **Matrix Indexing:** F(n) is at position [1][0] or [0][1] depending on convention
4. **Large Exponents:** Use `uint64` or equivalent for n
