"""
Min Stack

Design a stack that supports push, pop, top, and retrieving the minimum
element in constant time O(1).
"""

from typing import Optional, List, Tuple
import math


class MinStack:
    """
    MinStack implementation using two stacks.

    The main stack stores all elements, while the min stack stores
    the minimum values to enable O(1) getMin operation.

    Time Complexity: O(1) for all operations
    Space Complexity: O(n) where n is the number of elements
    """

    def __init__(self):
        """Initialize the MinStack."""
        self.stack = []      # Main stack for all elements
        self.min_stack = []  # Stack to track minimums

    def push(self, val: int) -> None:
        """
        Push element val onto stack.

        Also push to min_stack if val is less than or equal to current minimum.
        """
        self.stack.append(val)

        # Push to min_stack if it's empty or val is <= current min
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self) -> None:
        """
        Remove the element on top of the stack.

        Also pop from min_stack if the popped element is the current minimum.
        """
        if self.stack:
            val = self.stack.pop()
            # If popped value is current min, pop from min_stack too
            if val == self.min_stack[-1]:
                self.min_stack.pop()

    def top(self) -> int:
        """Get the top element of the stack."""
        return self.stack[-1]

    def getMin(self) -> int:
        """Retrieve the minimum element in the stack."""
        return self.min_stack[-1]


class MinStackWithPairs:
    """
    Alternative implementation storing (value, current_min) pairs.

    Each element stores both its value and the minimum at the time it was pushed.
    Simpler logic but slightly more space usage.
    """

    def __init__(self):
        """Initialize the stack with (value, min_at_time) pairs."""
        self.stack: List[Tuple[int, int]] = []

    def push(self, val: int) -> None:
        """Push element with current minimum."""
        if not self.stack:
            self.stack.append((val, val))
        else:
            current_min = min(val, self.stack[-1][1])
            self.stack.append((val, current_min))

    def pop(self) -> None:
        """Remove the top element."""
        if self.stack:
            self.stack.pop()

    def top(self) -> int:
        """Get the top element."""
        return self.stack[-1][0]

    def getMin(self) -> int:
        """Get the minimum element."""
        return self.stack[-1][1]


class MinStackOptimized:
    """
    Space-optimized implementation using a single value for min tracking.

    Uses mathematical trick: stores difference from minimum instead of actual values.
    When a new minimum is found, we store the encoded value and update min.

    Space Complexity: O(n) worst case, but min_stack is eliminated
    """

    def __init__(self):
        """Initialize the stack."""
        self.stack = []
        self.min_val = float('inf')

    def push(self, val: int) -> None:
        """Push with encoding when new minimum is found."""
        if not self.stack:
            self.stack.append(val)
            self.min_val = val
        else:
            if val < self.min_val:
                # Store encoded value: 2*val - min_val (which will be < val)
                self.stack.append(2 * val - self.min_val)
                self.min_val = val
            else:
                self.stack.append(val)

    def pop(self) -> None:
        """Pop with decoding to restore previous minimum if needed."""
        if self.stack:
            top = self.stack.pop()
            # If top < min_val, it's an encoded value
            if top < self.min_val:
                # Restore previous minimum: 2*min_val - top
                self.min_val = 2 * self.min_val - top

    def top(self) -> int:
        """Get the actual top value (decode if necessary)."""
        if self.stack[-1] < self.min_val:
            # This is an encoded value, actual value is min_val
            return self.min_val
        return self.stack[-1]

    def getMin(self) -> int:
        """Get the minimum value."""
        return self.min_val


def run_tests():
    """Run comprehensive tests for all MinStack implementations."""

    def test_implementation(MinStackClass, name):
        print(f"\nTesting {name}:")
        print("=" * 60)

        all_passed = True

        # Test 1: Basic operations from Example 1
        print("\nTest 1: Basic operations")
        ms = MinStackClass()
        ms.push(-2)
        ms.push(0)
        ms.push(-3)

        result1 = ms.getMin()
        expected1 = -3
        if result1 != expected1:
            print(f"  FAIL: getMin() = {result1}, expected {expected1}")
            all_passed = False
        else:
            print(f"  PASS: getMin() = {result1}")

        ms.pop()

        result2 = ms.top()
        expected2 = 0
        if result2 != expected2:
            print(f"  FAIL: top() = {result2}, expected {expected2}")
            all_passed = False
        else:
            print(f"  PASS: top() = {result2}")

        result3 = ms.getMin()
        expected3 = -2
        if result3 != expected3:
            print(f"  FAIL: getMin() = {result3}, expected {expected3}")
            all_passed = False
        else:
            print(f"  PASS: getMin() = {result3}")

        # Test 2: Ascending order
        print("\nTest 2: Ascending push order")
        ms = MinStackClass()
        for i in [1, 2, 3, 4, 5]:
            ms.push(i)

        if ms.getMin() != 1:
            print(f"  FAIL: getMin() = {ms.getMin()}, expected 1")
            all_passed = False
        else:
            print(f"  PASS: getMin() = 1 after pushing [1,2,3,4,5]")

        # Test 3: Descending order
        print("\nTest 3: Descending push order")
        ms = MinStackClass()
        for i in [5, 4, 3, 2, 1]:
            ms.push(i)

        if ms.getMin() != 1:
            print(f"  FAIL: getMin() = {ms.getMin()}, expected 1")
            all_passed = False
        else:
            print(f"  PASS: getMin() = 1 after pushing [5,4,3,2,1]")

        ms.pop()  # Remove 1
        if ms.getMin() != 2:
            print(f"  FAIL: getMin() = {ms.getMin()}, expected 2 after pop")
            all_passed = False
        else:
            print(f"  PASS: getMin() = 2 after pop")

        # Test 4: Duplicate minimums
        print("\nTest 4: Duplicate minimum values")
        ms = MinStackClass()
        ms.push(2)
        ms.push(0)
        ms.push(3)
        ms.push(0)

        if ms.getMin() != 0:
            print(f"  FAIL: getMin() = {ms.getMin()}, expected 0")
            all_passed = False
        else:
            print(f"  PASS: getMin() = 0")

        ms.pop()  # Remove second 0
        if ms.getMin() != 0:
            print(f"  FAIL: getMin() = {ms.getMin()}, expected 0 (first 0 still there)")
            all_passed = False
        else:
            print(f"  PASS: getMin() = 0 after removing one 0")

        ms.pop()  # Remove 3
        ms.pop()  # Remove first 0
        if ms.getMin() != 2:
            print(f"  FAIL: getMin() = {ms.getMin()}, expected 2")
            all_passed = False
        else:
            print(f"  PASS: getMin() = 2 after removing both 0s")

        # Test 5: Negative numbers
        print("\nTest 5: Negative numbers")
        ms = MinStackClass()
        ms.push(-1)
        ms.push(-2)
        ms.push(-3)

        if ms.getMin() != -3:
            print(f"  FAIL: getMin() = {ms.getMin()}, expected -3")
            all_passed = False
        else:
            print(f"  PASS: getMin() = -3")

        ms.pop()
        if ms.getMin() != -2:
            print(f"  FAIL: getMin() = {ms.getMin()}, expected -2")
            all_passed = False
        else:
            print(f"  PASS: getMin() = -2 after pop")

        # Test 6: Single element
        print("\nTest 6: Single element")
        ms = MinStackClass()
        ms.push(42)

        if ms.top() != 42:
            print(f"  FAIL: top() = {ms.top()}, expected 42")
            all_passed = False
        else:
            print(f"  PASS: top() = 42")

        if ms.getMin() != 42:
            print(f"  FAIL: getMin() = {ms.getMin()}, expected 42")
            all_passed = False
        else:
            print(f"  PASS: getMin() = 42")

        print("\n" + "=" * 60)
        print(f"All tests passed for {name}: {all_passed}")
        return all_passed

    # Test all implementations
    results = []
    results.append(test_implementation(MinStack, "MinStack (Two Stacks)"))
    results.append(test_implementation(MinStackWithPairs, "MinStackWithPairs"))
    results.append(test_implementation(MinStackOptimized, "MinStackOptimized"))

    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"All implementations passed: {all(results)}")


if __name__ == "__main__":
    run_tests()
