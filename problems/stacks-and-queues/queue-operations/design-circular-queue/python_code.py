"""
Design Circular Queue

Design a circular queue (ring buffer) with fixed capacity that supports
enQueue, deQueue, Front, Rear, isEmpty, and isFull operations.
"""

from typing import List, Optional


class MyCircularQueue:
    """
    Circular Queue implementation using a fixed-size array.

    Uses front and rear pointers with modulo arithmetic for wraparound.

    Time Complexity: O(1) for all operations
    Space Complexity: O(k) where k is the capacity
    """

    def __init__(self, k: int):
        """Initialize the circular queue with capacity k."""
        self.capacity = k
        self.queue = [0] * k
        self.front = 0
        self.rear = 0
        self.count = 0

    def enQueue(self, value: int) -> bool:
        """Insert an element into the queue. Returns True if successful."""
        if self.isFull():
            return False

        self.queue[self.rear] = value
        self.rear = (self.rear + 1) % self.capacity
        self.count += 1
        return True

    def deQueue(self) -> bool:
        """Delete an element from the queue. Returns True if successful."""
        if self.isEmpty():
            return False

        self.front = (self.front + 1) % self.capacity
        self.count -= 1
        return True

    def Front(self) -> int:
        """Get the front item. Returns -1 if empty."""
        if self.isEmpty():
            return -1
        return self.queue[self.front]

    def Rear(self) -> int:
        """Get the last item. Returns -1 if empty."""
        if self.isEmpty():
            return -1
        # rear points to next empty slot, so actual rear is one position back
        return self.queue[(self.rear - 1 + self.capacity) % self.capacity]

    def isEmpty(self) -> bool:
        """Check if the queue is empty."""
        return self.count == 0

    def isFull(self) -> bool:
        """Check if the queue is full."""
        return self.count == self.capacity


class MyCircularQueueNoCount:
    """
    Alternative implementation without explicit count variable.

    Uses one extra slot to differentiate between empty and full states.
    Empty: front == rear
    Full: (rear + 1) % capacity == front
    """

    def __init__(self, k: int):
        """Initialize with k+1 slots (one slot is always empty)."""
        self.capacity = k + 1  # Extra slot to differentiate empty/full
        self.queue = [0] * self.capacity
        self.front = 0
        self.rear = 0

    def enQueue(self, value: int) -> bool:
        """Insert element if not full."""
        if self.isFull():
            return False

        self.queue[self.rear] = value
        self.rear = (self.rear + 1) % self.capacity
        return True

    def deQueue(self) -> bool:
        """Delete element if not empty."""
        if self.isEmpty():
            return False

        self.front = (self.front + 1) % self.capacity
        return True

    def Front(self) -> int:
        """Get front element."""
        if self.isEmpty():
            return -1
        return self.queue[self.front]

    def Rear(self) -> int:
        """Get rear element."""
        if self.isEmpty():
            return -1
        return self.queue[(self.rear - 1 + self.capacity) % self.capacity]

    def isEmpty(self) -> bool:
        """Empty when front equals rear."""
        return self.front == self.rear

    def isFull(self) -> bool:
        """Full when rear is one behind front (with wraparound)."""
        return (self.rear + 1) % self.capacity == self.front


class MyCircularQueueWithTrace:
    """
    Circular Queue with operation tracing for debugging.
    """

    def __init__(self, k: int):
        self.capacity = k
        self.queue = [None] * k  # Use None to show empty slots
        self.front = 0
        self.rear = 0
        self.count = 0
        self.trace = [f"Created queue with capacity {k}"]

    def _state_str(self) -> str:
        return f"queue={self.queue}, front={self.front}, rear={self.rear}, count={self.count}"

    def enQueue(self, value: int) -> bool:
        if self.isFull():
            self.trace.append(f"enQueue({value}) -> False (full), {self._state_str()}")
            return False

        self.queue[self.rear] = value
        self.rear = (self.rear + 1) % self.capacity
        self.count += 1
        self.trace.append(f"enQueue({value}) -> True, {self._state_str()}")
        return True

    def deQueue(self) -> bool:
        if self.isEmpty():
            self.trace.append(f"deQueue() -> False (empty), {self._state_str()}")
            return False

        removed = self.queue[self.front]
        self.queue[self.front] = None  # Clear for visualization
        self.front = (self.front + 1) % self.capacity
        self.count -= 1
        self.trace.append(f"deQueue() -> True (removed {removed}), {self._state_str()}")
        return True

    def Front(self) -> int:
        if self.isEmpty():
            self.trace.append(f"Front() -> -1 (empty)")
            return -1
        val = self.queue[self.front]
        self.trace.append(f"Front() -> {val}")
        return val

    def Rear(self) -> int:
        if self.isEmpty():
            self.trace.append(f"Rear() -> -1 (empty)")
            return -1
        val = self.queue[(self.rear - 1 + self.capacity) % self.capacity]
        self.trace.append(f"Rear() -> {val}")
        return val

    def isEmpty(self) -> bool:
        return self.count == 0

    def isFull(self) -> bool:
        return self.count == self.capacity

    def get_trace(self) -> List[str]:
        return self.trace


def run_tests():
    """Run comprehensive tests for MyCircularQueue."""

    def test_implementation(QueueClass, name):
        print(f"\nTesting {name}:")
        print("=" * 60)

        all_passed = True

        # Test 1: Basic operations from Example 1
        print("\nTest 1: Basic operations")
        queue = QueueClass(3)

        results = []
        results.append(("enQueue(1)", queue.enQueue(1), True))
        results.append(("enQueue(2)", queue.enQueue(2), True))
        results.append(("enQueue(3)", queue.enQueue(3), True))
        results.append(("enQueue(4)", queue.enQueue(4), False))  # Full
        results.append(("Rear()", queue.Rear(), 3))
        results.append(("isFull()", queue.isFull(), True))
        results.append(("deQueue()", queue.deQueue(), True))
        results.append(("enQueue(4)", queue.enQueue(4), True))  # Wraparound
        results.append(("Rear()", queue.Rear(), 4))

        for op, result, expected in results:
            if result != expected:
                print(f"  FAIL: {op} = {result}, expected {expected}")
                all_passed = False
            else:
                print(f"  PASS: {op} = {result}")

        # Test 2: Empty queue operations
        print("\nTest 2: Empty queue operations")
        queue = QueueClass(2)

        if queue.isEmpty() != True:
            print("  FAIL: isEmpty() on new queue should be True")
            all_passed = False
        else:
            print("  PASS: isEmpty() = True for new queue")

        if queue.Front() != -1:
            print("  FAIL: Front() on empty queue should be -1")
            all_passed = False
        else:
            print("  PASS: Front() = -1 for empty queue")

        if queue.Rear() != -1:
            print("  FAIL: Rear() on empty queue should be -1")
            all_passed = False
        else:
            print("  PASS: Rear() = -1 for empty queue")

        if queue.deQueue() != False:
            print("  FAIL: deQueue() on empty queue should be False")
            all_passed = False
        else:
            print("  PASS: deQueue() = False for empty queue")

        # Test 3: Fill and empty completely
        print("\nTest 3: Fill and empty cycle")
        queue = QueueClass(3)

        # Fill
        for i in range(3):
            queue.enQueue(i)

        # Empty
        dequeued = []
        while not queue.isEmpty():
            front = queue.Front()
            queue.deQueue()
            dequeued.append(front)

        if dequeued != [0, 1, 2]:
            print(f"  FAIL: Dequeued order {dequeued}, expected [0, 1, 2]")
            all_passed = False
        else:
            print("  PASS: FIFO order maintained")

        # Test 4: Multiple wraparounds
        print("\nTest 4: Multiple wraparounds")
        queue = QueueClass(3)

        # First cycle
        queue.enQueue(1)
        queue.enQueue(2)
        queue.deQueue()  # Remove 1
        queue.enQueue(3)
        queue.deQueue()  # Remove 2
        queue.enQueue(4)

        # Check state
        if queue.Front() != 3:
            print(f"  FAIL: Front() = {queue.Front()}, expected 3")
            all_passed = False
        else:
            print("  PASS: Front() = 3 after wraparound")

        if queue.Rear() != 4:
            print(f"  FAIL: Rear() = {queue.Rear()}, expected 4")
            all_passed = False
        else:
            print("  PASS: Rear() = 4 after wraparound")

        # Test 5: Capacity 1
        print("\nTest 5: Capacity 1")
        queue = QueueClass(1)

        queue.enQueue(5)
        if queue.isFull() != True:
            print("  FAIL: isFull() should be True after 1 enqueue")
            all_passed = False
        else:
            print("  PASS: isFull() = True for capacity 1")

        if queue.enQueue(6) != False:
            print("  FAIL: enQueue should fail when full")
            all_passed = False
        else:
            print("  PASS: enQueue fails when full")

        print("\n" + "=" * 60)
        print(f"All tests passed for {name}: {all_passed}")
        return all_passed

    # Test both implementations
    results = []
    results.append(test_implementation(MyCircularQueue, "MyCircularQueue (with count)"))
    results.append(test_implementation(MyCircularQueueNoCount, "MyCircularQueueNoCount (extra slot)"))

    # Demonstrate trace functionality
    print("\n" + "=" * 60)
    print("Demonstrating operation trace:")
    print("=" * 60)

    queue = MyCircularQueueWithTrace(3)
    queue.enQueue(1)
    queue.enQueue(2)
    queue.enQueue(3)
    queue.enQueue(4)  # Should fail
    queue.Rear()
    queue.deQueue()
    queue.enQueue(4)  # Should succeed (wraparound)
    queue.Front()
    queue.Rear()

    print("\nOperation trace:")
    for line in queue.get_trace():
        print(f"  {line}")

    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"All implementations passed: {all(results)}")


if __name__ == "__main__":
    run_tests()
