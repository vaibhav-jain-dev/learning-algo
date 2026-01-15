"""
Word Break - Dynamic Programming Solution

Problem: Check if a string can be segmented into dictionary words.
"""

from typing import List, Set


def word_break_dp(s: str, word_dict: List[str]) -> bool:
    """
    Bottom-up DP solution.

    Time Complexity: O(n^2 * m) where n is string length, m is max word length
    Space Complexity: O(n)
    """
    word_set = set(word_dict)
    n = len(s)

    # dp[i] = True if s[0:i] can be segmented
    dp = [False] * (n + 1)
    dp[0] = True  # Empty string can be segmented

    for i in range(1, n + 1):
        for j in range(i):
            # If s[0:j] can be segmented and s[j:i] is a word
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break

    return dp[n]


def word_break_optimized(s: str, word_dict: List[str]) -> bool:
    """
    Optimized DP solution - only check substring lengths up to max word length.

    Time Complexity: O(n * m * m) where m is max word length
    Space Complexity: O(n)
    """
    word_set = set(word_dict)
    max_word_len = max(len(w) for w in word_dict) if word_dict else 0
    n = len(s)

    dp = [False] * (n + 1)
    dp[0] = True

    for i in range(1, n + 1):
        # Only check substrings up to max word length
        for j in range(max(0, i - max_word_len), i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break

    return dp[n]


def word_break_memo(s: str, word_dict: List[str]) -> bool:
    """
    Top-down DP with memoization.

    Time Complexity: O(n^2 * m)
    Space Complexity: O(n)
    """
    word_set = set(word_dict)
    memo = {}

    def helper(start: int) -> bool:
        if start == len(s):
            return True

        if start in memo:
            return memo[start]

        for end in range(start + 1, len(s) + 1):
            if s[start:end] in word_set and helper(end):
                memo[start] = True
                return True

        memo[start] = False
        return False

    return helper(0)


def word_break_bfs(s: str, word_dict: List[str]) -> bool:
    """
    BFS solution - explore all possible segmentations.

    Time Complexity: O(n^2 * m)
    Space Complexity: O(n)
    """
    from collections import deque

    word_set = set(word_dict)
    n = len(s)
    visited = set()
    queue = deque([0])

    while queue:
        start = queue.popleft()
        if start in visited:
            continue
        visited.add(start)

        for end in range(start + 1, n + 1):
            if s[start:end] in word_set:
                if end == n:
                    return True
                queue.append(end)

    return False


def get_word_break_sequences(s: str, word_dict: List[str]) -> List[List[str]]:
    """
    Returns all possible segmentations (for understanding).

    Time Complexity: O(2^n) in worst case
    Space Complexity: O(n * 2^n)
    """
    word_set = set(word_dict)
    memo = {}

    def helper(start: int) -> List[List[str]]:
        if start == len(s):
            return [[]]

        if start in memo:
            return memo[start]

        result = []
        for end in range(start + 1, len(s) + 1):
            word = s[start:end]
            if word in word_set:
                for seq in helper(end):
                    result.append([word] + seq)

        memo[start] = result
        return result

    return helper(0)


# Test cases
def run_tests():
    test_cases = [
        ("leetcode", ["leet", "code"], True),
        ("applepenapple", ["apple", "pen"], True),
        ("catsandog", ["cats", "dog", "sand", "and", "cat"], False),
        ("cars", ["car", "ca", "rs"], True),
        ("a", ["a"], True),
        ("ab", ["a", "b"], True),
        ("abc", ["a", "b", "c"], True),
        ("abc", ["ab", "c"], True),
        ("abc", ["abc"], True),
        ("aaaaaaa", ["aaaa", "aaa"], True),
        ("aaaaaaa", ["aaaa", "aa"], False),
        ("goalspecial", ["go", "goal", "goals", "special"], True),
    ]

    print("=" * 60)
    print("WORD BREAK - Test Results")
    print("=" * 60)

    for s, word_dict, expected in test_cases:
        result_dp = word_break_dp(s, word_dict)
        result_opt = word_break_optimized(s, word_dict)
        result_memo = word_break_memo(s, word_dict)
        result_bfs = word_break_bfs(s, word_dict)

        status = "PASS" if result_dp == expected else "FAIL"
        print(f"\ns = \"{s}\", wordDict = {word_dict}")
        print(f"  Expected:  {expected}")
        print(f"  DP:        {result_dp}")
        print(f"  Optimized: {result_opt}")
        print(f"  Memoized:  {result_memo}")
        print(f"  BFS:       {result_bfs}")
        print(f"  Status:    {status}")

        if expected:
            sequences = get_word_break_sequences(s, word_dict)
            if len(sequences) <= 5:
                print(f"  Sequences: {sequences}")
            else:
                print(f"  Sequences: {len(sequences)} total (showing first 3): {sequences[:3]}")

        assert result_dp == expected, f"DP failed for s={s}"
        assert result_opt == expected, f"Optimized failed for s={s}"
        assert result_memo == expected, f"Memoized failed for s={s}"
        assert result_bfs == expected, f"BFS failed for s={s}"

    print("\n" + "=" * 60)
    print("All tests passed!")
    print("=" * 60)


if __name__ == "__main__":
    run_tests()
