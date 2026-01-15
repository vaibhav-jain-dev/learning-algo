# Three Sum

## Problem Statement

Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that:
- `i != j`, `i != k`, and `j != k`
- `nums[i] + nums[j] + nums[k] == 0`

Notice that the solution set must not contain duplicate triplets.

## Examples

### Example 1
```
Input: nums = [-1, 0, 1, 2, -1, -4]
Output: [[-1, -1, 2], [-1, 0, 1]]
Explanation:
- nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0
- nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0
- nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0
The distinct triplets are [-1, 0, 1] and [-1, -1, 2].
Note: The order of the output and the order of the triplets does not matter.
```

### Example 2
```
Input: nums = [0, 1, 1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
```

### Example 3
```
Input: nums = [0, 0, 0]
Output: [[0, 0, 0]]
Explanation: The only possible triplet sums up to 0.
```

### Example 4
```
Input: nums = [-2, 0, 1, 1, 2]
Output: [[-2, 0, 2], [-2, 1, 1]]
Explanation: Two distinct triplets sum to zero.
```

## Constraints

- `3 <= nums.length <= 3000`
- `-10^5 <= nums[i] <= 10^5`

## Hints

<details>
<summary>Hint 1: Sorting</summary>

Sorting the array first can help in multiple ways:
1. It makes it easier to skip duplicate values
2. It allows us to use the two-pointer technique efficiently
</details>

<details>
<summary>Hint 2: Reduce to Two Sum</summary>

If we fix one element, the problem becomes finding two numbers that sum to the negative of the fixed element. This is essentially the "Two Sum II - Sorted Array" problem.
</details>

<details>
<summary>Hint 3: Avoiding Duplicates</summary>

To avoid duplicate triplets:
1. Skip duplicate values when iterating through the first element
2. Skip duplicate values when moving the left and right pointers
</details>

<details>
<summary>Hint 4: Two Pointer Approach</summary>

After sorting and fixing the first element at index `i`:
- Use a left pointer starting at `i + 1`
- Use a right pointer starting at the end
- If the sum is too small, move left pointer right
- If the sum is too large, move right pointer left
- If the sum equals zero, record the triplet and move both pointers
</details>

## Approach Explanation

### Two-Pointer Approach (Optimal)

**Time Complexity:** O(n^2)
**Space Complexity:** O(1) or O(n) depending on the sorting algorithm

#### Algorithm

1. **Sort the array** - This enables the two-pointer technique and helps skip duplicates.

2. **Iterate through the array** with index `i` as the first element of the triplet:
   - If the current element is greater than 0, break (since the array is sorted, no three positive numbers can sum to 0)
   - Skip duplicate values of `nums[i]` to avoid duplicate triplets

3. **For each fixed `i`, use two pointers** to find pairs that sum to `-nums[i]`:
   - Initialize `left = i + 1` and `right = len(nums) - 1`
   - While `left < right`:
     - Calculate `current_sum = nums[i] + nums[left] + nums[right]`
     - If `current_sum < 0`: Move `left` pointer right (need larger sum)
     - If `current_sum > 0`: Move `right` pointer left (need smaller sum)
     - If `current_sum == 0`:
       - Add triplet to result
       - Skip duplicates for both `left` and `right`
       - Move both pointers inward

#### Visual Walkthrough

For `nums = [-1, 0, 1, 2, -1, -4]`:

```
After sorting: [-4, -1, -1, 0, 1, 2]

i=0, nums[i]=-4, target=4
  left=1, right=5: -1 + 2 = 1 < 4, move left
  left=2, right=5: -1 + 2 = 1 < 4, move left
  left=3, right=5: 0 + 2 = 2 < 4, move left
  left=4, right=5: 1 + 2 = 3 < 4, move left
  left=5, right=5: done

i=1, nums[i]=-1, target=1
  left=2, right=5: -1 + 2 = 1 == 1, found [-1, -1, 2]!
  left=3, right=4: 0 + 1 = 1 == 1, found [-1, 0, 1]!
  left=4, right=4: done

i=2, nums[i]=-1: skip (duplicate of i=1)

i=3, nums[i]=0, target=0
  left=4, right=5: 1 + 2 = 3 > 0, move right
  left=4, right=4: done

Result: [[-1, -1, 2], [-1, 0, 1]]
```

### Why Two Pointers Work

The key insight is that in a sorted array:
- Moving the left pointer right increases the sum
- Moving the right pointer left decreases the sum

This gives us a systematic way to search for pairs that sum to a target value in O(n) time, making the overall algorithm O(n^2).

### Common Mistakes to Avoid

1. **Forgetting to skip duplicates** - This leads to duplicate triplets in the result
2. **Not handling edge cases** - Arrays with fewer than 3 elements, all zeros, etc.
3. **Off-by-one errors** - Make sure left starts at `i + 1`, not `i`
4. **Not breaking early** - If `nums[i] > 0`, no valid triplets are possible
