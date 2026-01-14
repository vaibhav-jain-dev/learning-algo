"""
Daily Temperatures

Given an array of daily temperatures, return an array where each element
tells how many days you have to wait until a warmer temperature.
"""

from typing import List


def daily_temperatures(temperatures: List[int]) -> List[int]:
    """
    Find days until warmer temperature using a monotonic decreasing stack.

    The stack stores indices of temperatures in decreasing order.
    When we find a warmer temperature, we resolve all pending colder days.

    Time Complexity: O(n) - each element pushed and popped at most once
    Space Complexity: O(n) - for the stack and result array
    """
    n = len(temperatures)
    result = [0] * n
    stack = []  # Stack of indices (temperatures at these indices are in decreasing order)

    for i in range(n):
        # While current temperature is warmer than temperature at stack's top index
        while stack and temperatures[i] > temperatures[stack[-1]]:
            prev_index = stack.pop()
            result[prev_index] = i - prev_index

        stack.append(i)

    # Remaining indices in stack have no warmer future day (already 0)
    return result


def daily_temperatures_brute_force(temperatures: List[int]) -> List[int]:
    """
    Brute force approach - check every future day for each day.
    Time Complexity: O(n^2)
    Space Complexity: O(n) for result array

    Included for comparison and understanding.
    """
    n = len(temperatures)
    result = [0] * n

    for i in range(n):
        for j in range(i + 1, n):
            if temperatures[j] > temperatures[i]:
                result[i] = j - i
                break

    return result


def daily_temperatures_reverse(temperatures: List[int]) -> List[int]:
    """
    Alternative approach processing from right to left.
    Uses the result array to jump ahead and find the next warmer day.

    Time Complexity: O(n) - amortized
    Space Complexity: O(n) for result array (no extra stack needed)
    """
    n = len(temperatures)
    result = [0] * n

    for i in range(n - 2, -1, -1):
        j = i + 1

        while j < n:
            if temperatures[j] > temperatures[i]:
                result[i] = j - i
                break
            elif result[j] == 0:
                # No warmer day exists after j
                break
            else:
                # Jump ahead using result[j]
                j += result[j]

    return result


def daily_temperatures_with_trace(temperatures: List[int]) -> tuple:
    """
    Extended version that returns result with execution trace.
    Useful for understanding how the algorithm works.
    """
    n = len(temperatures)
    result = [0] * n
    stack = []
    trace = []

    for i in range(n):
        trace.append(f"\nDay {i}: Temperature = {temperatures[i]}")
        trace.append(f"  Stack before: {[(idx, temperatures[idx]) for idx in stack]}")

        while stack and temperatures[i] > temperatures[stack[-1]]:
            prev_index = stack.pop()
            result[prev_index] = i - prev_index
            trace.append(f"  Pop index {prev_index} (temp {temperatures[prev_index]}): "
                        f"Wait {result[prev_index]} days")

        stack.append(i)
        trace.append(f"  Push index {i}")
        trace.append(f"  Stack after: {[(idx, temperatures[idx]) for idx in stack]}")
        trace.append(f"  Result so far: {result}")

    return result, trace


def run_tests():
    """Run comprehensive tests for daily_temperatures."""
    test_cases = [
        # (input, expected, description)
        ([73, 74, 75, 71, 69, 72, 76, 73], [1, 1, 4, 2, 1, 1, 0, 0], "Example 1"),
        ([30, 40, 50, 60], [1, 1, 1, 0], "Strictly increasing"),
        ([30, 60, 90], [1, 1, 0], "Example 3"),
        ([90, 80, 70, 60], [0, 0, 0, 0], "Strictly decreasing"),
        ([70, 70, 70, 70], [0, 0, 0, 0], "All equal"),
        ([50], [0], "Single element"),
        ([50, 60], [1, 0], "Two elements - increasing"),
        ([60, 50], [0, 0], "Two elements - decreasing"),
        ([55, 38, 53, 81, 61, 93, 97, 32, 43, 78], [3, 1, 1, 2, 1, 1, 0, 1, 1, 0], "Complex case"),
        ([89, 62, 70, 58, 47, 47, 46, 76, 100, 70], [8, 1, 5, 4, 3, 2, 1, 1, 0, 0], "Another complex case"),
    ]

    print("Testing daily_temperatures function:")
    print("=" * 70)

    all_passed = True
    for i, (temps, expected, description) in enumerate(test_cases, 1):
        result = daily_temperatures(temps)
        status = "PASS" if result == expected else "FAIL"
        if result != expected:
            all_passed = False

        temps_str = str(temps) if len(str(temps)) <= 40 else str(temps)[:37] + "..."
        print(f"Test {i:2}: {description}")
        print(f"         Input: {temps_str}")
        print(f"         Result: {result}")
        print(f"         Expected: {expected} [{status}]")
        print()

    print("=" * 70)
    print(f"All tests passed: {all_passed}")
    print()

    # Test all implementations give same results
    print("Comparing all implementations:")
    print("=" * 70)

    all_match = True
    for temps, expected, description in test_cases:
        result1 = daily_temperatures(temps)
        result2 = daily_temperatures_brute_force(temps)
        result3 = daily_temperatures_reverse(temps)

        if not (result1 == result2 == result3 == expected):
            all_match = False
            print(f"MISMATCH for {description}:")
            print(f"  Monotonic stack: {result1}")
            print(f"  Brute force: {result2}")
            print(f"  Reverse: {result3}")
            print(f"  Expected: {expected}")

    if all_match:
        print("All implementations produce identical correct results!")
    print()

    # Demonstrate trace functionality
    print("Demonstrating algorithm trace:")
    print("=" * 70)

    demo_temps = [73, 74, 75, 71, 69, 72, 76, 73]
    result, trace = daily_temperatures_with_trace(demo_temps)

    print(f"Input: {demo_temps}")
    print("\nExecution trace:")
    for line in trace:
        print(line)

    print(f"\nFinal result: {result}")


if __name__ == "__main__":
    run_tests()
