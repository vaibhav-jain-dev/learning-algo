<div id="viz-config" style="display:none">
{"name":"Find Duplicate Number","algorithm":"floyd-cycle-detection","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"nums":[1,3,4,2,2]},"output":2,"inputRaw":"nums = [1, 3, 4, 2, 2]","outputRaw":"2"}]}
</div>

# Find the Duplicate Number

**Difficulty:** Medium

## Problem Statement

Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive.

There is only one repeated number in `nums`, return this repeated number.

You must solve the problem without modifying the array and using only constant extra space.

## Examples

**Example 1:**
```
Input: nums = [1,3,4,2,2]
Output: 2
```

**Example 2:**
```
Input: nums = [3,1,3,4,2]
Output: 3
```

**Example 3:**
```
Input: nums = [1,1]
Output: 1
```

## Visual Explanation

### Using Array as Implicit Linked List

```
nums = [1, 3, 4, 2, 2]
index:  0  1  2  3  4

View as linked list where nums[i] points to next node:

Index: 0 -> nums[0]=1 -> nums[1]=3 -> nums[3]=2 -> nums[2]=4 -> nums[4]=2
                                                                    |
                                            ←←←←←←←←←←←←←←←←←←←←←←←

The cycle exists because two indices point to the same value (2).
The duplicate number is where the cycle begins.

Floyd's Algorithm:
- Slow: 0->1->3->2->4->2...
- Fast: 0->3->4->3->4...
- They meet at index 2 (value 4)
- Reset slow to 0, move both by 1
- They meet at index 2, which contains the duplicate (2)
```

## Constraints

- 1 <= n <= 10^5
- nums.length == n + 1
- 1 <= nums[i] <= n
- All integers in nums appear only once except for precisely one integer which appears two or more times

## Hints

<details>
<summary>Hint 1</summary>
Think of the array as a linked list where index i points to index nums[i].
</details>

<details>
<summary>Hint 2</summary>
Since there's a duplicate, there must be a cycle in this implicit linked list.
</details>

<details>
<summary>Hint 3</summary>
Use Floyd's Tortoise and Hare algorithm to find the cycle entrance, which is the duplicate.
</details>

## Approach

### Floyd's Cycle Detection

1. Treat array as implicit linked list (i -> nums[i])
2. Use slow/fast pointers to find cycle
3. Reset slow to start, move both by 1
4. Where they meet is the duplicate

**Time Complexity:** O(n)
**Space Complexity:** O(1)
