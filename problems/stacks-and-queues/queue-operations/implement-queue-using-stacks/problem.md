# Implement Queue using Stacks

## Problem Description

Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (`push`, `peek`, `pop`, and `empty`).

Implement the `MyQueue` class:
- `void push(int x)` - Pushes element x to the back of the queue.
- `int pop()` - Removes the element from the front of the queue and returns it.
- `int peek()` - Returns the element at the front of the queue.
- `boolean empty()` - Returns true if the queue is empty, false otherwise.

**Notes:**
- You must use only standard operations of a stack, which means only `push to top`, `peek/pop from top`, `size`, and `is empty` operations are valid.
- Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.

## Examples

### Example 1
```
Input:
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]

Output:
[null, null, null, 1, 1, false]

Explanation:
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek();  // return 1
myQueue.pop();   // return 1, queue is [2]
myQueue.empty(); // return false
```

### Example 2
```
Input:
["MyQueue", "push", "push", "push", "pop", "pop", "peek"]
[[], [1], [2], [3], [], [], []]

Output:
[null, null, null, null, 1, 2, 3]

Explanation:
myQueue.push(1); // queue: [1]
myQueue.push(2); // queue: [1, 2]
myQueue.push(3); // queue: [1, 2, 3]
myQueue.pop();   // return 1, queue: [2, 3]
myQueue.pop();   // return 2, queue: [3]
myQueue.peek();  // return 3
```

### Example 3
```
Input:
["MyQueue", "push", "pop", "push", "pop", "push", "pop"]
[[], [1], [], [2], [], [3], []]

Output:
[null, null, 1, null, 2, null, 3]

Explanation: Push and pop alternating.
```

## Constraints
- `1 <= x <= 9`
- At most `100` calls will be made to `push`, `pop`, `peek`, and `empty`.
- All the calls to `pop` and `peek` are valid.

## Follow-up

Can you implement the queue such that each operation is amortized O(1) time complexity? In other words, performing n operations will take overall O(n) time even if one of those operations may take longer.

## Hints

<details>
<summary>Hint 1</summary>
Think about how a stack reverses the order of elements. If you push 1, 2, 3 onto a stack and then pop them all, you get 3, 2, 1.
</details>

<details>
<summary>Hint 2</summary>
If you transfer all elements from one stack to another, the order gets reversed. This can help achieve FIFO order.
</details>

<details>
<summary>Hint 3</summary>
Use one stack for pushing (input stack) and one for popping (output stack). Transfer elements from input to output only when output is empty.
</details>

<details>
<summary>Hint 4</summary>
For amortized O(1): don't transfer on every pop. Only transfer when the output stack is empty. Each element is moved at most twice.
</details>

## Approach

### Two-Stack Solution (Amortized O(1))

The key insight is to use two stacks:
- **Input Stack**: For push operations
- **Output Stack**: For pop/peek operations

**Push Operation**: Always push to the input stack. O(1)

**Pop/Peek Operation**:
1. If output stack is empty, transfer ALL elements from input stack to output stack
2. Pop/peek from output stack

### Why This Works

When we transfer from input to output, the order reverses:
- Input stack (top to bottom): [3, 2, 1] (3 was pushed last)
- After transfer to output (top to bottom): [1, 2, 3] (1 is now on top)

This is exactly the FIFO order we need!

### Why Amortized O(1)?

Each element is:
1. Pushed to input stack once: O(1)
2. Popped from input stack once: O(1)
3. Pushed to output stack once: O(1)
4. Popped from output stack once: O(1)

Total: 4 operations per element over its lifetime = O(1) amortized per operation.

### Time Complexity
- **Push**: O(1)
- **Pop**: Amortized O(1), worst case O(n)
- **Peek**: Amortized O(1), worst case O(n)
- **Empty**: O(1)

### Space Complexity
- **O(n)** where n is the number of elements in the queue
