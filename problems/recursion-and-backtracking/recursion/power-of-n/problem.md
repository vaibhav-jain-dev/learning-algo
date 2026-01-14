# Power of N - Calculate x^n Efficiently

## Problem Description

Implement a function to calculate `x` raised to the power `n` (i.e., x^n). The solution should be efficient, handling both positive and negative exponents.

The naive approach of multiplying x by itself n times has O(n) time complexity. Your goal is to implement an O(log n) solution using the "exponentiation by squaring" technique.

## Examples

### Example 1
```
Input: x = 2.0, n = 10
Output: 1024.0
Explanation: 2^10 = 1024
```

### Example 2
```
Input: x = 2.1, n = 3
Output: 9.261
Explanation: 2.1^3 = 9.261
```

### Example 3
```
Input: x = 2.0, n = -2
Output: 0.25
Explanation: 2^-2 = 1/(2^2) = 1/4 = 0.25
```

### Example 4
```
Input: x = 5.0, n = 0
Output: 1.0
Explanation: Any number raised to power 0 is 1
```

## Constraints

- -100.0 < x < 100.0
- -2^31 <= n <= 2^31 - 1
- n is an integer
- -10^4 <= x^n <= 10^4

## Hints

<details>
<summary>Hint 1</summary>
Think about how you can use the property: x^n = x^(n/2) * x^(n/2) for even n.
</details>

<details>
<summary>Hint 2</summary>
For odd n: x^n = x * x^(n-1) = x * x^((n-1)/2) * x^((n-1)/2)
</details>

<details>
<summary>Hint 3</summary>
For negative exponents: x^(-n) = 1/(x^n)
</details>

<details>
<summary>Hint 4</summary>
Be careful with edge cases: n = 0, x = 0, and very large negative exponents.
</details>

## Approach Explanation

### Key Mathematical Insight

We can use the following mathematical properties:
- x^n = (x^(n/2))^2 when n is even
- x^n = x * (x^((n-1)/2))^2 when n is odd
- x^0 = 1
- x^(-n) = 1/(x^n)

### Decision Tree Visualization

```
Calculate 2^10:

pow(2, 10)
    |
    v
n=10 is even, so calculate pow(2, 5) and square it
    |
    v
pow(2, 5)
    |
    v
n=5 is odd, so calculate 2 * pow(2, 4)
    |
    v
pow(2, 4)
    |
    v
n=4 is even, so calculate pow(2, 2) and square it
    |
    v
pow(2, 2)
    |
    v
n=2 is even, so calculate pow(2, 1) and square it
    |
    v
pow(2, 1)
    |
    v
n=1 is odd, so calculate 2 * pow(2, 0)
    |
    v
pow(2, 0) = 1 [BASE CASE]

Now unwind:
pow(2, 0) = 1
pow(2, 1) = 2 * 1 = 2
pow(2, 2) = 2^2 = 4
pow(2, 4) = 4^2 = 16
pow(2, 5) = 2 * 16 = 32
pow(2, 10) = 32^2 = 1024
```

### Comparison of Approaches

| Approach | Time Complexity | Space Complexity |
|----------|-----------------|------------------|
| Naive (multiply n times) | O(n) | O(1) |
| Recursive squaring | O(log n) | O(log n) |
| Iterative squaring | O(log n) | O(1) |

### Algorithm Steps

1. **Handle base cases**:
   - If n == 0, return 1
   - If n == 1, return x

2. **Handle negative exponents**:
   - If n < 0, compute 1/power(x, -n)

3. **Apply exponentiation by squaring**:
   - If n is even: return power(x, n/2)^2
   - If n is odd: return x * power(x, n-1)

### Why This Works

The key insight is that we're reducing the problem size by half at each step:
- To calculate x^16, we only need x^8 (then square it)
- To calculate x^8, we only need x^4 (then square it)
- And so on...

This gives us O(log n) multiplications instead of O(n).
