# Remove Duplicates from Sorted Array

## Problem Statement

Given an integer array `nums` sorted in **non-decreasing order**, remove the duplicates **in-place** such that each unique element appears only once. The relative order of the elements should be kept the same.

Return the number of unique elements in the array.

**Important Constraints:**
- You must modify the array in-place with O(1) extra memory
- The first `k` elements of `nums` should contain the unique elements in their original order
- Elements beyond the first `k` positions do not matter

## Examples

### Example 1
```
Input: nums = [1, 1, 2]
Output: 2, nums = [1, 2, _]

Explanation: Your function should return k = 2, with the first two elements
of nums being 1 and 2 respectively. It does not matter what you leave beyond
the returned k (hence the underscore).
```

### Example 2
```
Input: nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
Output: 5, nums = [0, 1, 2, 3, 4, _, _, _, _, _]

Explanation: Your function should return k = 5, with the first five elements
of nums being 0, 1, 2, 3, and 4 respectively.
```

### Example 3
```
Input: nums = [1, 2, 3]
Output: 3, nums = [1, 2, 3]

Explanation: No duplicates exist, so the array remains unchanged and k = 3.
```

### Example 4
```
Input: nums = []
Output: 0, nums = []

Explanation: Empty array has no elements, return 0.
```

## Constraints

- `0 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i] <= 100`
- `nums` is sorted in non-decreasing order

---

## Hints

<details>
<summary>Hint 1: Think about the problem structure</summary>

Since the array is already sorted, all duplicate elements will be adjacent to each other. This is a key insight that simplifies the problem significantly.

</details>

<details>
<summary>Hint 2: Two-pointer technique</summary>

Use two pointers:
- A "slow" pointer that tracks where to place the next unique element
- A "fast" pointer that scans through the array looking for unique elements

</details>

<details>
<summary>Hint 3: When to move the slow pointer</summary>

Only move the slow pointer forward when you find a new unique element (i.e., when `nums[fast] != nums[slow]`). Copy the new unique element to the slow pointer's position.

</details>

<details>
<summary>Hint 4: Initial setup</summary>

Start the slow pointer at index 0 (first element is always unique in a non-empty array) and the fast pointer at index 1. The slow pointer represents the last position of a confirmed unique element.

</details>

---

## Approach Explanation

### Two-Pointer Approach

This problem is a classic application of the **two-pointer technique**, specifically the "slow-fast pointer" variant.

#### Key Insight
Since the array is sorted, duplicates are always adjacent. We don't need to search the entire array to check if an element is a duplicate - we just compare with the previous unique element.

#### Algorithm

1. **Handle edge case**: If the array is empty, return 0.

2. **Initialize pointers**:
   - `slow = 0`: Points to the position of the last unique element found
   - `fast = 1`: Scans through the array

3. **Iterate with fast pointer**:
   - If `nums[fast] != nums[slow]`: We found a new unique element
     - Increment `slow`
     - Copy `nums[fast]` to `nums[slow]`
   - Always increment `fast`

4. **Return result**: Return `slow + 1` (the count of unique elements)

#### Visual Walkthrough

```
Initial: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
          s  f

Step 1:  nums[f]=0 == nums[s]=0, skip
         [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
          s     f

Step 2:  nums[f]=1 != nums[s]=0, copy
         [0, 1, 1, 1, 1, 2, 2, 3, 3, 4]
             s     f

Step 3:  nums[f]=1 == nums[s]=1, skip
         [0, 1, 1, 1, 1, 2, 2, 3, 3, 4]
             s        f

Step 4:  nums[f]=1 == nums[s]=1, skip
         [0, 1, 1, 1, 1, 2, 2, 3, 3, 4]
             s           f

Step 5:  nums[f]=2 != nums[s]=1, copy
         [0, 1, 2, 1, 1, 2, 2, 3, 3, 4]
                s           f

... and so on

Final:   [0, 1, 2, 3, 4, 2, 2, 3, 3, 4]
                      s                 f

Return: s + 1 = 5
```

#### Complexity Analysis

- **Time Complexity**: O(n) - We traverse the array once with the fast pointer
- **Space Complexity**: O(1) - We only use two pointer variables

#### Why This Works

1. The slow pointer always points to the last confirmed unique element
2. When we find a new unique element (different from `nums[slow]`), we:
   - Move slow forward to make room
   - Place the new unique element there
3. All unique elements get "compacted" to the front of the array
4. The portion beyond `slow` may contain leftover values, but we don't care about them

#### Common Mistakes to Avoid

1. **Off-by-one errors**: Remember to return `slow + 1`, not `slow`
2. **Empty array**: Always handle the empty array case first
3. **Single element**: An array with one element has no duplicates, return 1
