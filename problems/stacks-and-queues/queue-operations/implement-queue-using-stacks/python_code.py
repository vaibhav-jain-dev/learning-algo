"""
Implement Queue using Stacks

Implement a first-in-first-out (FIFO) queue using only two stacks.
"""

from typing import List, Tuple


class MyQueue:
    """
    Queue implementation using two stacks with amortized O(1) operations.

    Uses an input stack for pushes and an output stack for pops/peeks.
    Elements are transferred from input to output only when output is empty.

    Time Complexity:
        - Push: O(1)
        - Pop: Amortized O(1)
        - Peek: Amortized O(1)
        - Empty: O(1)

    Space Complexity: O(n)
    """

    def __init__(self):
        """Initialize the queue with two stacks."""
        self.input_stack = []   # Stack for push operations
        self.output_stack = []  # Stack for pop/peek operations

    def push(self, x: int) -> None:
        """Push element x to the back of queue."""
        self.input_stack.append(x)

    def pop(self) -> int:
        """Remove the element from the front of queue and return it."""
        self._transfer_if_needed()
        return self.output_stack.pop()

    def peek(self) -> int:
        """Get the front element without removing it."""
        self._transfer_if_needed()
        return self.output_stack[-1]

    def empty(self) -> bool:
        """Return whether the queue is empty."""
        return len(self.input_stack) == 0 and len(self.output_stack) == 0

    def _transfer_if_needed(self) -> None:
        """Transfer elements from input to output stack if output is empty."""
        if not self.output_stack:
            while self.input_stack:
                self.output_stack.append(self.input_stack.pop())


class MyQueueSimple:
    """
    Simple (but less efficient) queue implementation using two stacks.

    Transfers all elements on every push operation.
    Time Complexity: Push O(n), Pop O(1), Peek O(1)
    """

    def __init__(self):
        """Initialize with two stacks."""
        self.stack1 = []
        self.stack2 = []

    def push(self, x: int) -> None:
        """Push by transferring all elements, adding new one, then transferring back."""
        # Move all from stack1 to stack2
        while self.stack1:
            self.stack2.append(self.stack1.pop())

        # Push new element
        self.stack1.append(x)

        # Move all back from stack2 to stack1
        while self.stack2:
            self.stack1.append(self.stack2.pop())

    def pop(self) -> int:
        """Pop from the top of stack1."""
        return self.stack1.pop()

    def peek(self) -> int:
        """Peek at the top of stack1."""
        return self.stack1[-1]

    def empty(self) -> bool:
        """Check if queue is empty."""
        return len(self.stack1) == 0


class MyQueueWithTrace:
    """
    Queue implementation with operation tracing for debugging.
    """

    def __init__(self):
        self.input_stack = []
        self.output_stack = []
        self.trace = []

    def push(self, x: int) -> None:
        self.input_stack.append(x)
        self.trace.append(f"push({x}): input={self.input_stack}, output={self.output_stack}")

    def pop(self) -> int:
        self._transfer_if_needed()
        val = self.output_stack.pop()
        self.trace.append(f"pop() -> {val}: input={self.input_stack}, output={self.output_stack}")
        return val

    def peek(self) -> int:
        self._transfer_if_needed()
        val = self.output_stack[-1]
        self.trace.append(f"peek() -> {val}: input={self.input_stack}, output={self.output_stack}")
        return val

    def empty(self) -> bool:
        result = len(self.input_stack) == 0 and len(self.output_stack) == 0
        self.trace.append(f"empty() -> {result}: input={self.input_stack}, output={self.output_stack}")
        return result

    def _transfer_if_needed(self) -> None:
        if not self.output_stack:
            self.trace.append(f"  [Transfer] input={self.input_stack} -> output")
            while self.input_stack:
                self.output_stack.append(self.input_stack.pop())
            self.trace.append(f"  [After transfer] input={self.input_stack}, output={self.output_stack}")

    def get_trace(self) -> List[str]:
        return self.trace


def run_tests():
    """Run comprehensive tests for MyQueue implementation."""

    def test_implementation(QueueClass, name):
        print(f"\nTesting {name}:")
        print("=" * 60)

        all_passed = True

        # Test 1: Basic operations from Example 1
        print("\nTest 1: Basic operations")
        queue = QueueClass()
        queue.push(1)
        queue.push(2)

        result = queue.peek()
        if result != 1:
            print(f"  FAIL: peek() = {result}, expected 1")
            all_passed = False
        else:
            print(f"  PASS: peek() = 1")

        result = queue.pop()
        if result != 1:
            print(f"  FAIL: pop() = {result}, expected 1")
            all_passed = False
        else:
            print(f"  PASS: pop() = 1")

        result = queue.empty()
        if result != False:
            print(f"  FAIL: empty() = {result}, expected False")
            all_passed = False
        else:
            print(f"  PASS: empty() = False")

        # Test 2: Multiple pushes then pops
        print("\nTest 2: Multiple pushes then pops")
        queue = QueueClass()
        for i in range(1, 6):
            queue.push(i)

        for i in range(1, 6):
            result = queue.pop()
            if result != i:
                print(f"  FAIL: pop() = {result}, expected {i}")
                all_passed = False
            else:
                print(f"  PASS: pop() = {i}")

        # Test 3: Interleaved push and pop
        print("\nTest 3: Interleaved push and pop")
        queue = QueueClass()
        queue.push(1)
        queue.push(2)
        result1 = queue.pop()  # Should be 1
        queue.push(3)
        result2 = queue.pop()  # Should be 2
        result3 = queue.pop()  # Should be 3

        if result1 != 1 or result2 != 2 or result3 != 3:
            print(f"  FAIL: Got {result1}, {result2}, {result3}, expected 1, 2, 3")
            all_passed = False
        else:
            print(f"  PASS: Interleaved operations correct (1, 2, 3)")

        # Test 4: Empty queue
        print("\nTest 4: Empty queue")
        queue = QueueClass()
        if queue.empty() != True:
            print(f"  FAIL: empty() on new queue should be True")
            all_passed = False
        else:
            print(f"  PASS: empty() = True for new queue")

        queue.push(42)
        if queue.empty() != False:
            print(f"  FAIL: empty() after push should be False")
            all_passed = False
        else:
            print(f"  PASS: empty() = False after push")

        queue.pop()
        if queue.empty() != True:
            print(f"  FAIL: empty() after pop should be True")
            all_passed = False
        else:
            print(f"  PASS: empty() = True after popping all")

        # Test 5: Peek doesn't remove
        print("\nTest 5: Peek doesn't remove element")
        queue = QueueClass()
        queue.push(100)
        peek1 = queue.peek()
        peek2 = queue.peek()
        pop1 = queue.pop()

        if peek1 != 100 or peek2 != 100 or pop1 != 100:
            print(f"  FAIL: Peek should not remove element")
            all_passed = False
        else:
            print(f"  PASS: Multiple peeks return same value")

        print("\n" + "=" * 60)
        print(f"All tests passed for {name}: {all_passed}")
        return all_passed

    # Test both implementations
    results = []
    results.append(test_implementation(MyQueue, "MyQueue (Amortized O(1))"))
    results.append(test_implementation(MyQueueSimple, "MyQueueSimple (O(n) push)"))

    # Demonstrate trace functionality
    print("\n" + "=" * 60)
    print("Demonstrating operation trace:")
    print("=" * 60)

    queue = MyQueueWithTrace()
    queue.push(1)
    queue.push(2)
    queue.push(3)
    queue.peek()
    queue.pop()
    queue.push(4)
    queue.pop()
    queue.pop()
    queue.empty()

    print("\nOperation trace:")
    for line in queue.get_trace():
        print(f"  {line}")

    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"All implementations passed: {all(results)}")


if __name__ == "__main__":
    run_tests()
