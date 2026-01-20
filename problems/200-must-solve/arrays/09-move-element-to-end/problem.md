# Move Element To End

**Difficulty:** Medium (Blue)

## Problem Statement

You're given an array of integers and an integer. Write a function that moves all instances of that integer in the array to the end of the array and returns the array.

The function should perform this in place (i.e., it should mutate the input array) and doesn't need to maintain the order of the other integers.

## Examples

**Example 1:**
```
Input: array = [2, 1, 2, 2, 2, 3, 4, 2], toMove = 2
Output: [4, 1, 3, 2, 2, 2, 2, 2] (or any valid arrangement)
```

**Example 2:**
```
Input: array = [1, 2, 3, 4, 5], toMove = 3
Output: [1, 2, 5, 4, 3] (or similar)
```

## Constraints

- The array may be empty
- The element to move may not exist in the array
- The array can have all elements as the target value

## Hints

<details>
<summary>Hint 1</summary>
Use two pointers: one at the beginning and one at the end of the array.
</details>

<details>
<summary>Hint 2</summary>
The right pointer should find non-target elements, and the left pointer should find target elements.
</details>

<details>
<summary>Hint 3</summary>
When left finds a target and right finds a non-target, swap them and move both pointers.
</details>

## Approach

### Two Pointers (Swap)
1. Initialize `left = 0`, `right = len(array) - 1`
2. While `left < right`:
   - Move `right` left until it points to non-target or crosses `left`
   - If `left` points to target, swap with `right`
   - Move `left` forward
3. Return the modified array

**Time Complexity:** O(n)
**Space Complexity:** O(1)

---

## Similar Problems (Harder)

### 1. Move Element with Order Preserved
**Difficulty:** Medium

Move all instances of target to end while preserving relative order of other elements.

```
Input: array = [2, 1, 2, 3, 2, 4], toMove = 2
Output: [1, 3, 4, 2, 2, 2] (order of 1,3,4 preserved)
```

### 2. Partition Array by Predicate
**Difficulty:** Medium

Rearrange array so elements satisfying a predicate come before those that don't.

```
Input: array = [1, 4, 2, 5, 3, 6], predicate = isEven
Output: [6, 4, 2, 5, 3, 1] (all evens before odds)
```

### 3. Dutch National Flag (3-Way Partition)
**Difficulty:** Hard

Partition array into three sections: less than pivot, equal to pivot, greater than pivot.

```
Input: array = [2, 0, 1, 2, 1, 0], pivot = 1
Output: [0, 0, 1, 1, 2, 2]
```
