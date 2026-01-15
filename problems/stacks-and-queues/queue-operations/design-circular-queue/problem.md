# Design Circular Queue

## Problem Description

Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle, and the last position is connected back to the first position to make a circle. It is also called "Ring Buffer".

One of the benefits of the circular queue is that we can make use of the spaces in front of the queue. In a normal queue, once the queue becomes full, we cannot insert the next element even if there is a space in front of the queue. But using the circular queue, we can use the space to store new values.

Implement the `MyCircularQueue` class:

- `MyCircularQueue(k)` Initializes the object with the size of the queue to be `k`.
- `bool enQueue(int value)` Inserts an element into the circular queue. Return `true` if the operation is successful.
- `bool deQueue()` Deletes an element from the circular queue. Return `true` if the operation is successful.
- `int Front()` Gets the front item from the queue. If the queue is empty, return `-1`.
- `int Rear()` Gets the last item from the queue. If the queue is empty, return `-1`.
- `bool isEmpty()` Checks whether the circular queue is empty or not.
- `bool isFull()` Checks whether the circular queue is full or not.

## Examples

### Example 1
```
Input:
["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]
[[3], [1], [2], [3], [4], [], [], [], [4], []]

Output:
[null, true, true, true, false, 3, true, true, true, 4]

Explanation:
MyCircularQueue myCircularQueue = new MyCircularQueue(3);
myCircularQueue.enQueue(1); // return True
myCircularQueue.enQueue(2); // return True
myCircularQueue.enQueue(3); // return True
myCircularQueue.enQueue(4); // return False, queue is full
myCircularQueue.Rear();     // return 3
myCircularQueue.isFull();   // return True
myCircularQueue.deQueue();  // return True
myCircularQueue.enQueue(4); // return True
myCircularQueue.Rear();     // return 4
```

### Example 2
```
Input:
["MyCircularQueue", "enQueue", "deQueue", "Front", "deQueue", "Front", "enQueue", "Front"]
[[2], [1], [], [], [], [], [5], []]

Output:
[null, true, true, -1, false, -1, true, 5]

Explanation:
After enQueue(1): queue = [1, _], front = 1
After deQueue(): queue = [_, _], empty
Front() on empty queue returns -1
deQueue() on empty queue returns false
enQueue(5): queue = [5, _]
Front() returns 5
```

### Example 3
```
Input:
["MyCircularQueue", "enQueue", "enQueue", "Front", "Rear", "enQueue"]
[[2], [1], [2], [], [], [3]]

Output:
[null, true, true, 1, 2, false]

Explanation: Shows Front and Rear operations on a full queue.
```

## Constraints
- `1 <= k <= 1000`
- `0 <= value <= 1000`
- At most `3000` calls will be made to `enQueue`, `deQueue`, `Front`, `Rear`, `isEmpty`, and `isFull`.

## Hints

<details>
<summary>Hint 1</summary>
Use a fixed-size array to store elements. Track the front and rear positions with indices.
</details>

<details>
<summary>Hint 2</summary>
Use modulo arithmetic to wrap around when indices reach the end of the array.
</details>

<details>
<summary>Hint 3</summary>
Keep track of the current count of elements to easily check if the queue is empty or full.
</details>

<details>
<summary>Hint 4</summary>
Be careful with edge cases: empty queue operations, full queue operations, and wrapping around.
</details>

## Approach

### Array-Based Implementation

Use a fixed-size array with two pointers and a count:
- **front**: Index of the front element
- **rear**: Index where the next element will be inserted
- **count**: Current number of elements (or use size calculation)

### Key Operations

**enQueue(value)**:
1. Check if full - return false
2. Place value at rear position
3. Move rear: `rear = (rear + 1) % capacity`
4. Increment count
5. Return true

**deQueue()**:
1. Check if empty - return false
2. Move front: `front = (front + 1) % capacity`
3. Decrement count
4. Return true

**Front()**: Return `array[front]` if not empty, else -1

**Rear()**: Return `array[(rear - 1 + capacity) % capacity]` if not empty, else -1

### Circular Nature

The modulo operation `% capacity` handles the wraparound:
- When rear reaches the end, `(end + 1) % capacity = 0` wraps to the beginning
- This allows reusing slots that were freed by deQueue

### Visual Example

Capacity = 3:
```
Initial:     [_, _, _]  front=0, rear=0, count=0
enQueue(1):  [1, _, _]  front=0, rear=1, count=1
enQueue(2):  [1, 2, _]  front=0, rear=2, count=2
enQueue(3):  [1, 2, 3]  front=0, rear=0, count=3 (full)
deQueue():   [_, 2, 3]  front=1, rear=0, count=2
enQueue(4):  [4, 2, 3]  front=1, rear=1, count=3 (wrapped!)
```

### Time Complexity
- All operations: **O(1)**

### Space Complexity
- **O(k)** where k is the capacity
