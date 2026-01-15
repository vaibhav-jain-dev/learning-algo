# Intersection of Two Arrays

## Problem Description

Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.

## Examples

### Example 1
```
Input: nums1 = [1, 2, 2, 1], nums2 = [2, 2]
Output: [2]
Explanation: 2 is the only element that appears in both arrays.
```

### Example 2
```
Input: nums1 = [4, 9, 5], nums2 = [9, 4, 9, 8, 4]
Output: [9, 4] or [4, 9]
Explanation: Both 4 and 9 appear in both arrays. Order doesn't matter.
```

### Example 3
```
Input: nums1 = [1, 2, 3], nums2 = [4, 5, 6]
Output: []
Explanation: No elements are common to both arrays.
```

## Constraints

- 1 <= nums1.length, nums2.length <= 1000
- 0 <= nums1[i], nums2[i] <= 1000

## Follow-up

- What if the given array is already sorted? How would you optimize your algorithm?
- What if nums1's size is small compared to nums2's size? Which algorithm is better?

## Hints

<details>
<summary>Hint 1</summary>
Think about what data structure would help you efficiently check if an element exists in an array.
</details>

<details>
<summary>Hint 2</summary>
Convert one array to a hash set. Then iterate through the other array and check for membership.
</details>

<details>
<summary>Hint 3</summary>
Use set intersection directly if your language supports it. In Python: set(nums1) & set(nums2)
</details>

## Approach

### Hash Set Approach - O(n + m) Time, O(min(n, m)) Space

1. Convert both arrays to sets (removes duplicates)
2. Iterate through the smaller set
3. For each element, check if it exists in the larger set
4. If yes, add it to the result

### Two Sets Approach

1. Convert nums1 to a set
2. Create an empty result set
3. Iterate through nums2:
   - If element exists in set1, add it to result set
4. Convert result set to list

### Set Intersection (Built-in)

Many languages provide built-in set intersection:
- Python: `set(nums1) & set(nums2)`
- Go: Manual iteration required

### Sorting + Two Pointers (Follow-up)

If arrays are sorted:
1. Use two pointers, one for each array
2. If elements are equal, add to result (avoiding duplicates)
3. Move the pointer with the smaller element forward

### Complexity Analysis

**Hash Set Approach:**
- **Time Complexity**: O(n + m) - Converting to sets and iteration
- **Space Complexity**: O(n + m) - Storing both sets

**Sorting Approach (if already sorted):**
- **Time Complexity**: O(n + m) - Single pass with two pointers
- **Space Complexity**: O(1) - No extra space needed (excluding output)
