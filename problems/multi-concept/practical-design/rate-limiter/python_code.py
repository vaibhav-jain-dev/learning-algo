"""
Rate Limiter - Sliding Window Log Implementation

Multiple approaches demonstrated:
1. Sliding Window Log (precise)
2. Fixed Window Counter (simple)
3. Token Bucket (allows bursts)
"""

from collections import defaultdict, deque
import time


class RateLimiterSlidingWindow:
    """
    Sliding Window Log - Most precise implementation.

    Time Complexity: O(k) per request where k = requests in current window
    Space Complexity: O(n) where n = total requests in memory
    """

    def __init__(self, limit: int, window_seconds: int):
        self.limit = limit
        self.window = window_seconds
        # user_id -> deque of timestamps
        self.requests = defaultdict(deque)

    def allow_request(self, user_id: str, timestamp: int) -> bool:
        """
        Check if request is allowed and record it if so.

        Steps:
        1. Remove expired timestamps (older than window)
        2. Check if under limit
        3. If yes, add new timestamp and return True
        4. If no, return False
        """
        user_requests = self.requests[user_id]

        # Remove expired timestamps from the front
        window_start = timestamp - self.window
        while user_requests and user_requests[0] <= window_start:
            user_requests.popleft()

        # Check if under limit
        if len(user_requests) < self.limit:
            user_requests.append(timestamp)
            return True

        return False

    def get_remaining(self, user_id: str, timestamp: int) -> int:
        """Get remaining requests in current window."""
        user_requests = self.requests[user_id]
        window_start = timestamp - self.window

        # Count valid requests
        valid_count = sum(1 for ts in user_requests if ts > window_start)
        return max(0, self.limit - valid_count)


class RateLimiterFixedWindow:
    """
    Fixed Window Counter - Simple but can allow 2x burst at boundary.

    Time Complexity: O(1) per request
    Space Complexity: O(1) per user
    """

    def __init__(self, limit: int, window_seconds: int):
        self.limit = limit
        self.window = window_seconds
        # user_id -> (window_start, count)
        self.counters = defaultdict(lambda: (0, 0))

    def allow_request(self, user_id: str, timestamp: int) -> bool:
        """
        Fixed window: window_start = timestamp // window * window

        Problem: At boundary, user can make `limit` requests at end of
        one window and `limit` more at start of next = 2x burst
        """
        window_start = (timestamp // self.window) * self.window
        stored_window, count = self.counters[user_id]

        # New window? Reset counter
        if stored_window != window_start:
            self.counters[user_id] = (window_start, 1)
            return True

        # Same window, check limit
        if count < self.limit:
            self.counters[user_id] = (window_start, count + 1)
            return True

        return False


class RateLimiterTokenBucket:
    """
    Token Bucket - Allows controlled bursts.

    Tokens refill at a steady rate.
    Each request consumes one token.
    Bucket has max capacity (allows burst up to capacity).

    Time Complexity: O(1) per request
    Space Complexity: O(1) per user
    """

    def __init__(self, capacity: int, refill_rate: float):
        """
        capacity: max tokens (burst limit)
        refill_rate: tokens per second
        """
        self.capacity = capacity
        self.refill_rate = refill_rate
        # user_id -> (tokens, last_refill_time)
        self.buckets = defaultdict(lambda: (capacity, 0))

    def allow_request(self, user_id: str, timestamp: int) -> bool:
        """
        1. Calculate tokens to add since last refill
        2. Update token count (capped at capacity)
        3. If tokens >= 1, consume and allow
        4. Otherwise, reject
        """
        tokens, last_refill = self.buckets[user_id]

        # Refill tokens
        time_passed = timestamp - last_refill
        tokens_to_add = time_passed * self.refill_rate
        tokens = min(self.capacity, tokens + tokens_to_add)

        # Try to consume a token
        if tokens >= 1:
            self.buckets[user_id] = (tokens - 1, timestamp)
            return True

        self.buckets[user_id] = (tokens, timestamp)
        return False


# ========== Test Cases ==========

def test_sliding_window():
    """Test sliding window rate limiter."""
    print("Testing Sliding Window Rate Limiter")
    print("=" * 50)

    limiter = RateLimiterSlidingWindow(limit=3, window_seconds=10)

    # Test basic rate limiting
    test_cases = [
        ("user1", 1, True, "1st request"),
        ("user1", 2, True, "2nd request"),
        ("user1", 3, True, "3rd request"),
        ("user1", 4, False, "4th request - should be blocked"),
        ("user1", 11, True, "After window slides"),
        ("user2", 5, True, "Different user"),
    ]

    for user_id, timestamp, expected, description in test_cases:
        result = limiter.allow_request(user_id, timestamp)
        status = "PASS" if result == expected else "FAIL"
        print(f"  [{status}] {description}: {result}")

    print()


def test_fixed_window():
    """Test fixed window rate limiter."""
    print("Testing Fixed Window Rate Limiter")
    print("=" * 50)

    limiter = RateLimiterFixedWindow(limit=3, window_seconds=10)

    test_cases = [
        ("user1", 1, True, "1st request"),
        ("user1", 5, True, "2nd request"),
        ("user1", 9, True, "3rd request"),
        ("user1", 9, False, "4th request - blocked"),
        ("user1", 10, True, "New window starts"),
    ]

    for user_id, timestamp, expected, description in test_cases:
        result = limiter.allow_request(user_id, timestamp)
        status = "PASS" if result == expected else "FAIL"
        print(f"  [{status}] {description}: {result}")

    print()


def test_token_bucket():
    """Test token bucket rate limiter."""
    print("Testing Token Bucket Rate Limiter")
    print("=" * 50)

    # 5 tokens max, refills 1 token per second
    limiter = RateLimiterTokenBucket(capacity=5, refill_rate=1.0)

    # Burst test - should allow 5 rapid requests
    print("  Burst test (5 rapid requests):")
    for i in range(7):
        result = limiter.allow_request("user1", 0)
        print(f"    Request {i+1}: {'Allowed' if result else 'Blocked'}")

    # After waiting, tokens refill
    print("  After waiting 3 seconds:")
    result = limiter.allow_request("user1", 3)
    print(f"    Request: {'Allowed' if result else 'Blocked'}")

    print()


if __name__ == "__main__":
    test_sliding_window()
    test_fixed_window()
    test_token_bucket()

    print("All tests completed!")
