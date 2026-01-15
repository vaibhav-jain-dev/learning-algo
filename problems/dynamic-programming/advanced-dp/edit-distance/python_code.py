"""
Edit Distance (Levenshtein Distance)
LeetCode 72 (Hard)

Classic DP problem with multiple approaches:
1. Recursion (exponential time)
2. Memoization (top-down DP)
3. Tabulation (bottom-up DP)
4. Space-optimized DP

Real-world applications:
- Spell checkers
- DNA sequence alignment
- Plagiarism detection
- Autocomplete suggestions
"""

from typing import List, Tuple
from functools import lru_cache


class Solution:
    def minDistance_recursive(self, word1: str, word2: str) -> int:
        """
        Approach 1: Pure Recursion (TLE)

        Time Complexity: O(3^(m+n)) - Exponential
        Space Complexity: O(m+n) - Recursion depth

        Educational purpose only - shows the core logic.
        """
        def solve(i: int, j: int) -> int:
            # Base cases
            if i == 0:
                return j  # Insert j characters
            if j == 0:
                return i  # Delete i characters

            # If characters match, no operation needed
            if word1[i - 1] == word2[j - 1]:
                return solve(i - 1, j - 1)

            # Try all three operations and take minimum
            return 1 + min(
                solve(i - 1, j),      # Delete from word1
                solve(i, j - 1),      # Insert into word1
                solve(i - 1, j - 1)   # Replace in word1
            )

        return solve(len(word1), len(word2))

    def minDistance_memo(self, word1: str, word2: str) -> int:
        """
        Approach 2: Memoization (Top-Down DP)

        Time Complexity: O(m × n) - Each state computed once
        Space Complexity: O(m × n) - Memoization table + recursion stack

        Thinking Process:
        1. Same recursion as above
        2. Add caching to avoid recomputation
        3. @lru_cache handles memoization automatically
        """
        @lru_cache(maxsize=None)
        def solve(i: int, j: int) -> int:
            if i == 0:
                return j
            if j == 0:
                return i

            if word1[i - 1] == word2[j - 1]:
                return solve(i - 1, j - 1)

            return 1 + min(
                solve(i - 1, j),      # Delete
                solve(i, j - 1),      # Insert
                solve(i - 1, j - 1)   # Replace
            )

        return solve(len(word1), len(word2))

    def minDistance(self, word1: str, word2: str) -> int:
        """
        Approach 3: Tabulation (Bottom-Up DP) - Standard Solution

        Time Complexity: O(m × n)
        Space Complexity: O(m × n)

        DP Table Meaning:
        dp[i][j] = minimum operations to convert word1[0..i-1] to word2[0..j-1]

        Recurrence:
        if word1[i-1] == word2[j-1]:
            dp[i][j] = dp[i-1][j-1]  # No operation needed
        else:
            dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
        """
        m, n = len(word1), len(word2)

        # Create DP table with extra row and column for empty string
        dp = [[0] * (n + 1) for _ in range(m + 1)]

        # Base cases: converting from/to empty string
        for i in range(m + 1):
            dp[i][0] = i  # Delete i characters
        for j in range(n + 1):
            dp[0][j] = j  # Insert j characters

        # Fill the table
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    # Characters match - no operation needed
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    # Take minimum of three operations
                    dp[i][j] = 1 + min(
                        dp[i - 1][j],      # Delete word1[i-1]
                        dp[i][j - 1],      # Insert word2[j-1]
                        dp[i - 1][j - 1]   # Replace word1[i-1] with word2[j-1]
                    )

        return dp[m][n]

    def minDistance_space_optimized(self, word1: str, word2: str) -> int:
        """
        Approach 4: Space-Optimized DP

        Time Complexity: O(m × n)
        Space Complexity: O(min(m, n))

        Observation: dp[i][j] only depends on:
        - dp[i-1][j-1] (diagonal)
        - dp[i-1][j] (above)
        - dp[i][j-1] (left)

        We only need the previous row!
        """
        m, n = len(word1), len(word2)

        # Ensure word2 is shorter for space efficiency
        if m < n:
            word1, word2 = word2, word1
            m, n = n, m

        # Only need two rows
        prev = list(range(n + 1))  # Previous row
        curr = [0] * (n + 1)       # Current row

        for i in range(1, m + 1):
            curr[0] = i  # Converting to empty string

            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    curr[j] = prev[j - 1]
                else:
                    curr[j] = 1 + min(
                        prev[j],      # Delete
                        curr[j - 1],  # Insert
                        prev[j - 1]   # Replace
                    )

            # Swap rows for next iteration
            prev, curr = curr, prev

        return prev[n]  # Result is in prev after last swap


class SolutionWithPath:
    """Extended solution that also reconstructs the operations."""

    def minDistanceWithOperations(self, word1: str, word2: str) -> Tuple[int, List[str]]:
        """
        Returns both the edit distance and the sequence of operations.
        """
        m, n = len(word1), len(word2)

        # Build DP table
        dp = [[0] * (n + 1) for _ in range(m + 1)]

        for i in range(m + 1):
            dp[i][0] = i
        for j in range(n + 1):
            dp[0][j] = j

        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])

        # Backtrack to find operations
        operations = []
        i, j = m, n

        while i > 0 or j > 0:
            if i > 0 and j > 0 and word1[i - 1] == word2[j - 1]:
                # Characters match, move diagonally
                i -= 1
                j -= 1
            elif i > 0 and j > 0 and dp[i][j] == dp[i - 1][j - 1] + 1:
                # Replace
                operations.append(f"Replace '{word1[i-1]}' at index {i-1} with '{word2[j-1]}'")
                i -= 1
                j -= 1
            elif i > 0 and dp[i][j] == dp[i - 1][j] + 1:
                # Delete
                operations.append(f"Delete '{word1[i-1]}' at index {i-1}")
                i -= 1
            elif j > 0 and dp[i][j] == dp[i][j - 1] + 1:
                # Insert
                operations.append(f"Insert '{word2[j-1]}' at index {i}")
                j -= 1

        return dp[m][n], operations[::-1]


def visualize_dp_table(word1: str, word2: str, dp: List[List[int]]):
    """Visualize the DP table for educational purposes."""
    m, n = len(word1), len(word2)

    # Header
    print("\nDP Table:")
    print("    ", end="")
    print("  ε", end="")
    for c in word2:
        print(f"  {c}", end="")
    print()

    # Rows
    for i in range(m + 1):
        if i == 0:
            print("  ε", end="")
        else:
            print(f"  {word1[i-1]}", end="")

        for j in range(n + 1):
            print(f" {dp[i][j]:2}", end="")
        print()


def main():
    """Test all approaches with comprehensive examples."""
    solution = Solution()
    solution_with_path = SolutionWithPath()

    test_cases = [
        ("horse", "ros", 3),
        ("intention", "execution", 5),
        ("", "abc", 3),
        ("abc", "", 3),
        ("abc", "abc", 0),
        ("kitten", "sitting", 3),
        ("sunday", "saturday", 3),
        ("algorithm", "altruistic", 6),
    ]

    print("=" * 70)
    print("EDIT DISTANCE - Comprehensive Test")
    print("=" * 70)

    for word1, word2, expected in test_cases:
        print(f"\n{'='*50}")
        print(f"word1: '{word1}'")
        print(f"word2: '{word2}'")
        print(f"Expected: {expected}")

        # Test standard solution
        result = solution.minDistance(word1, word2)
        print(f"Result: {result}")

        # Test space-optimized solution
        result_optimized = solution.minDistance_space_optimized(word1, word2)
        assert result == result_optimized, "Mismatch between solutions!"

        # Get operations
        distance, operations = solution_with_path.minDistanceWithOperations(word1, word2)
        print(f"\nOperations ({len(operations)}):")
        for i, op in enumerate(operations, 1):
            print(f"  {i}. {op}")

        # Verify result
        if result == expected:
            print("\n✓ PASSED")
        else:
            print(f"\n✗ FAILED (got {result}, expected {expected})")

        # Show DP table for small examples
        if len(word1) <= 6 and len(word2) <= 6:
            m, n = len(word1), len(word2)
            dp = [[0] * (n + 1) for _ in range(m + 1)]
            for i in range(m + 1):
                dp[i][0] = i
            for j in range(n + 1):
                dp[0][j] = j
            for i in range(1, m + 1):
                for j in range(1, n + 1):
                    if word1[i - 1] == word2[j - 1]:
                        dp[i][j] = dp[i - 1][j - 1]
                    else:
                        dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
            visualize_dp_table(word1, word2, dp)

    print("\n" + "=" * 70)
    print("All tests completed!")
    print("=" * 70)


if __name__ == "__main__":
    main()
