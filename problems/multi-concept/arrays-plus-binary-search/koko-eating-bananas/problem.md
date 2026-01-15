# Koko Eating Bananas

## Problem Description

Koko loves to eat bananas. There are `n` piles of bananas, the `i-th` pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.

Koko can decide her bananas-per-hour eating speed `k`. Each hour, she chooses some pile and eats `k` bananas from it. If the pile has fewer than `k` bananas, she eats all of them and won't eat any more during that hour.

Return the **minimum integer** `k` such that she can eat all the bananas within `h` hours.

**Concepts Combined**: Binary Search + Greedy Validation

## Examples

### Example 1
```
Input: piles = [3,6,7,11], h = 8
Output: 4
Explanation:
- Pile 0 (3 bananas): ceil(3/4) = 1 hour
- Pile 1 (6 bananas): ceil(6/4) = 2 hours
- Pile 2 (7 bananas): ceil(7/4) = 2 hours
- Pile 3 (11 bananas): ceil(11/4) = 3 hours
Total: 1 + 2 + 2 + 3 = 8 hours ✓
```

### Example 2
```
Input: piles = [30,11,23,4,20], h = 5
Output: 30
Explanation: With speed 30, each pile takes at most 1 hour.
```

### Example 3
```
Input: piles = [30,11,23,4,20], h = 6
Output: 23
Explanation:
- ceil(30/23)=2, ceil(11/23)=1, ceil(23/23)=1, ceil(4/23)=1, ceil(20/23)=1
- Total = 6 hours
```

## Constraints
- `1 <= piles.length <= 10^4`
- `piles.length <= h <= 10^9`
- `1 <= piles[i] <= 10^9`

## Hints

<details>
<summary>Hint 1</summary>
The answer k is between 1 and max(piles). Binary search for the minimum valid k.
</details>

<details>
<summary>Hint 2</summary>
If Koko can finish with speed k, she can also finish with any speed > k. This monotonic property enables binary search.
</details>

<details>
<summary>Hint 3</summary>
For validation: hours for pile p with speed k = ceil(p/k) = (p + k - 1) / k
</details>

## Approach

### Binary Search on Answer
1. Search space: [1, max(piles)]
2. For each mid value, check if Koko can finish in h hours
3. If yes, try smaller speed; if no, try larger speed

### Validation Function
```python
def canFinish(piles, k, h):
    hours = sum(ceil(p / k) for p in piles)
    return hours <= h
```

**Time Complexity**: O(n * log(max(piles)))
**Space Complexity**: O(1)
