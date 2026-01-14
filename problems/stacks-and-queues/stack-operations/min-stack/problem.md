# Min Stack

## Problem Description

Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the `MinStack` class:
- `MinStack()` initializes the stack object.
- `void push(int val)` pushes the element `val` onto the stack.
- `void pop()` removes the element on the top of the stack.
- `int top()` gets the top element of the stack.
- `int getMin()` retrieves the minimum element in the stack.

You must implement a solution with `O(1)` time complexity for each function.

## Examples

### Example 1
```
Input:
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output:
[null,null,null,null,-3,null,0,-2]

Explanation:
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
```

### Example 2
```
Input:
["MinStack","push","push","getMin","push","getMin","pop","getMin"]
[[],[5],[3],[],[1],[],[],[]]

Output:
[null,null,null,3,null,1,null,3]

Explanation:
MinStack minStack = new MinStack();
minStack.push(5);
minStack.push(3);
minStack.getMin(); // return 3
minStack.push(1);
minStack.getMin(); // return 1
minStack.pop();
minStack.getMin(); // return 3
```

### Example 3
```
Input:
["MinStack","push","push","push","push","getMin","pop","getMin","pop","getMin"]
[[],[2],[0],[3],[0],[],[],[],[],[]]

Output:
[null,null,null,null,null,0,null,0,null,0]

Explanation: Demonstrates handling duplicate minimum values.
```

## Constraints
- `-2^31 <= val <= 2^31 - 1`
- Methods `pop`, `top` and `getMin` operations will always be called on non-empty stacks.
- At most `3 * 10^4` calls will be made to `push`, `pop`, `top`, and `getMin`.

## Hints

<details>
<summary>Hint 1</summary>
Consider using two stacks: one for all elements and one to track minimums.
</details>

<details>
<summary>Hint 2</summary>
For the minimum stack, you only need to push when a new minimum is found or when a value equals the current minimum.
</details>

<details>
<summary>Hint 3</summary>
Alternative approach: Store pairs of (value, current_minimum) in a single stack.
</details>

<details>
<summary>Hint 4</summary>
Space optimization: Instead of storing the actual minimum, store the difference between the value and current minimum.
</details>

## Approach

### Two-Stack Approach

The key insight is that we need to track how the minimum changes as elements are pushed and popped.

1. **Main Stack**: Stores all elements normally.

2. **Min Stack**: Stores the minimum value at each "level" of the main stack.
   - Push to min stack when the new value is less than or equal to current minimum
   - Pop from min stack when the popped value equals the current minimum

### Single Stack with Pairs

Alternatively, store `(value, current_min)` pairs:
- Each element stores both its value and what the minimum was when it was pushed
- More space usage but simpler logic

### Operations

**Push(val)**:
- Push to main stack
- If min stack is empty OR val <= current min, push to min stack

**Pop()**:
- Pop from main stack
- If popped value equals top of min stack, pop from min stack too

**Top()**: Return top of main stack

**GetMin()**: Return top of min stack

### Time Complexity
- All operations: **O(1)**

### Space Complexity
- **O(n)** where n is the number of elements in the stack
- The min stack uses additional space but at most O(n)
