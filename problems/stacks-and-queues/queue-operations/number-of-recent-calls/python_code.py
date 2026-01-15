"""
Number of Recent Calls

Implement a RecentCounter class that counts the number of recent requests
within a 3000 millisecond time window.
"""

from collections import deque
from typing import List
import bisect


class RecentCounter:
    """
    RecentCounter using a queue to track timestamps within the time window.

    New requests are added to the back of the queue, and old requests
    (outside the 3000ms window) are removed from the front.

    Time Complexity: O(n) amortized per ping (each request added/removed once)
    Space Complexity: O(W) where W is max requests within any 3000ms window
    """

    def __init__(self):
        """Initialize the counter with an empty queue."""
        self.requests = deque()

    def ping(self, t: int) -> int:
        """
        Add a new request at time t and return count of recent requests.

        Args:
            t: Timestamp in milliseconds

        Returns:
            Number of requests in the range [t - 3000, t]
        """
        # Add the new request
        self.requests.append(t)

        # Remove requests outside the time window
        while self.requests and self.requests[0] < t - 3000:
            self.requests.popleft()

        # Return the count of requests in the window
        return len(self.requests)


class RecentCounterList:
    """
    Alternative implementation using a list (less efficient for removal).

    Time Complexity: O(n) per ping in worst case
    Space Complexity: O(n) where n is total number of pings
    """

    def __init__(self):
        """Initialize with an empty list."""
        self.requests = []

    def ping(self, t: int) -> int:
        """Add request and count recent ones."""
        self.requests.append(t)

        # Find first index in range [t-3000, t]
        start_idx = 0
        while start_idx < len(self.requests) and self.requests[start_idx] < t - 3000:
            start_idx += 1

        return len(self.requests) - start_idx


class RecentCounterBinarySearch:
    """
    Implementation using binary search for O(log n) lookup.

    Keeps all requests and uses binary search to find the window.
    More memory but faster per-query time.

    Time Complexity: O(log n) per ping
    Space Complexity: O(n) where n is total number of pings
    """

    def __init__(self):
        """Initialize with an empty list."""
        self.requests = []

    def ping(self, t: int) -> int:
        """Add request and count recent ones using binary search."""
        self.requests.append(t)

        # Find leftmost position where value >= t - 3000
        left_bound = bisect.bisect_left(self.requests, t - 3000)

        return len(self.requests) - left_bound


class RecentCounterWithTrace:
    """
    RecentCounter with operation tracing for debugging.
    """

    def __init__(self):
        self.requests = deque()
        self.trace = ["RecentCounter initialized"]

    def ping(self, t: int) -> int:
        self.trace.append(f"\nping({t}):")
        self.trace.append(f"  Queue before: {list(self.requests)}")
        self.trace.append(f"  Time window: [{t - 3000}, {t}]")

        self.requests.append(t)
        self.trace.append(f"  Added {t}")

        removed = []
        while self.requests and self.requests[0] < t - 3000:
            removed.append(self.requests.popleft())

        if removed:
            self.trace.append(f"  Removed (outside window): {removed}")

        self.trace.append(f"  Queue after: {list(self.requests)}")

        count = len(self.requests)
        self.trace.append(f"  Return: {count}")

        return count

    def get_trace(self) -> List[str]:
        return self.trace


def run_tests():
    """Run comprehensive tests for RecentCounter."""

    def test_implementation(CounterClass, name):
        print(f"\nTesting {name}:")
        print("=" * 60)

        all_passed = True

        # Test 1: Example 1
        print("\nTest 1: Example 1")
        counter = CounterClass()

        test_cases = [
            (1, 1, "ping(1)"),
            (100, 2, "ping(100)"),
            (3001, 3, "ping(3001)"),
            (3002, 3, "ping(3002)"),
        ]

        for t, expected, desc in test_cases:
            result = counter.ping(t)
            if result != expected:
                print(f"  FAIL: {desc} = {result}, expected {expected}")
                all_passed = False
            else:
                print(f"  PASS: {desc} = {result}")

        # Test 2: All within window
        print("\nTest 2: All requests within 3000ms window")
        counter = CounterClass()

        for i, t in enumerate([100, 200, 300, 400, 500], 1):
            result = counter.ping(t)
            if result != i:
                print(f"  FAIL: ping({t}) = {result}, expected {i}")
                all_passed = False
            else:
                print(f"  PASS: ping({t}) = {i}")

        # Test 3: Gradual expiration
        print("\nTest 3: Gradual expiration")
        counter = CounterClass()

        test_cases = [
            (1, 1),
            (1000, 2),
            (2000, 3),
            (3000, 4),
            (4000, 4),  # 1 expires
            (5000, 4),  # 1000 expires
            (6000, 4),  # 2000 expires
            (7000, 4),  # 3000 expires
        ]

        for t, expected in test_cases:
            result = counter.ping(t)
            if result != expected:
                print(f"  FAIL: ping({t}) = {result}, expected {expected}")
                all_passed = False
            else:
                print(f"  PASS: ping({t}) = {result}")

        # Test 4: Large gap
        print("\nTest 4: Large gap between requests")
        counter = CounterClass()

        counter.ping(1)
        result = counter.ping(10000)  # Way beyond 3000ms window
        if result != 1:
            print(f"  FAIL: ping(10000) = {result}, expected 1")
            all_passed = False
        else:
            print("  PASS: Large gap handled correctly")

        # Test 5: Single request
        print("\nTest 5: Single request")
        counter = CounterClass()

        result = counter.ping(1000)
        if result != 1:
            print(f"  FAIL: Single ping = {result}, expected 1")
            all_passed = False
        else:
            print("  PASS: Single request returns 1")

        # Test 6: Exact boundary
        print("\nTest 6: Exact boundary (t - 3000)")
        counter = CounterClass()

        counter.ping(1000)
        result = counter.ping(4000)  # Request at 1000 is exactly at boundary t - 3000
        if result != 2:
            print(f"  FAIL: Boundary ping = {result}, expected 2 (inclusive)")
            all_passed = False
        else:
            print("  PASS: Boundary is inclusive")

        result = counter.ping(4001)  # Now 1000 is outside
        if result != 2:
            print(f"  FAIL: After boundary ping = {result}, expected 2")
            all_passed = False
        else:
            print("  PASS: Element expires after boundary")

        print("\n" + "=" * 60)
        print(f"All tests passed for {name}: {all_passed}")
        return all_passed

    # Test all implementations
    results = []
    results.append(test_implementation(RecentCounter, "RecentCounter (Queue)"))
    results.append(test_implementation(RecentCounterList, "RecentCounterList"))
    results.append(test_implementation(RecentCounterBinarySearch, "RecentCounterBinarySearch"))

    # Demonstrate trace functionality
    print("\n" + "=" * 60)
    print("Demonstrating operation trace:")
    print("=" * 60)

    counter = RecentCounterWithTrace()
    counter.ping(1)
    counter.ping(100)
    counter.ping(3001)
    counter.ping(3002)

    print("\nOperation trace:")
    for line in counter.get_trace():
        print(f"  {line}")

    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"All implementations passed: {all(results)}")


if __name__ == "__main__":
    run_tests()
