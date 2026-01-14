"""
Koko Eating Bananas
Combines: Binary Search + Greedy Validation
"""

from typing import List
import math

def minEatingSpeed(piles: List[int], h: int) -> int:
    """
    Find minimum eating speed to finish all bananas in h hours.
    Binary search on the answer.
    """

    def canFinish(k: int) -> bool:
        """Check if speed k allows finishing in h hours"""
        hours = sum(math.ceil(pile / k) for pile in piles)
        return hours <= h

    # Binary search: answer is in [1, max(piles)]
    left, right = 1, max(piles)

    while left < right:
        mid = (left + right) // 2

        if canFinish(mid):
            # Can finish, try smaller speed
            right = mid
        else:
            # Cannot finish, need faster speed
            left = mid + 1

    return left


def minEatingSpeed_verbose(piles: List[int], h: int) -> int:
    """Verbose version with step-by-step output"""

    def hoursNeeded(k: int) -> int:
        return sum(math.ceil(pile / k) for pile in piles)

    print(f"\nPiles: {piles}")
    print(f"Hours available: {h}")
    print(f"Search range: [1, {max(piles)}]")
    print("-" * 50)

    left, right = 1, max(piles)
    iteration = 0

    while left < right:
        iteration += 1
        mid = (left + right) // 2
        hours = hoursNeeded(mid)

        result = "CAN" if hours <= h else "CANNOT"
        print(f"Iteration {iteration}: speed={mid}, hours_needed={hours} ({result} finish)")

        if hours <= h:
            right = mid
            print(f"  -> Try slower: [{left}, {mid}]")
        else:
            left = mid + 1
            print(f"  -> Need faster: [{mid + 1}, {right}]")

    print(f"\nMinimum speed: {left}")
    print(f"Hours breakdown: {[math.ceil(p/left) for p in piles]} = {hoursNeeded(left)} hours")

    return left


def minEatingSpeed_bruteforce(piles: List[int], h: int) -> int:
    """Brute force: try each speed from 1 upward"""
    for k in range(1, max(piles) + 1):
        hours = sum(math.ceil(pile / k) for pile in piles)
        if hours <= h:
            return k
    return max(piles)


# Test cases
if __name__ == "__main__":
    test_cases = [
        ([3, 6, 7, 11], 8, 4),
        ([30, 11, 23, 4, 20], 5, 30),
        ([30, 11, 23, 4, 20], 6, 23),
        ([1, 1, 1, 999999999], 10, 142857143),
        ([312884470], 312884469, 2),
        ([805306368, 805306368, 805306368], 1000000000, 3),
    ]

    print("Koko Eating Bananas")
    print("=" * 60)

    for i, (piles, h, expected) in enumerate(test_cases):
        result = minEatingSpeed(piles, h)
        status = "PASS" if result == expected else "FAIL"
        print(f"\nTest {i + 1}: piles={piles[:3]}{'...' if len(piles)>3 else ''}, h={h}")
        print(f"  Result: {result} (expected: {expected}) [{status}]")

    # Detailed example
    print("\n" + "=" * 60)
    print("Detailed execution:")
    print("=" * 60)
    minEatingSpeed_verbose([3, 6, 7, 11], 8)
