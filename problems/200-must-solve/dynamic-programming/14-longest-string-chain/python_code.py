"""
Longest String Chain - Python Solution

Find the longest string chain where each word differs from the previous
by exactly one added character.

Time Complexity: O(n * L^2) where n is number of words, L is max word length
Space Complexity: O(n * L)
"""

from typing import List, Tuple, Dict
from collections import defaultdict


def longest_string_chain(words: List[str]) -> int:
    """
    Find the longest string chain using DP with hash map.

    Args:
        words: List of words

    Returns:
        Length of the longest string chain
    """
    if not words:
        return 0

    # Sort words by length (shorter words first)
    words.sort(key=len)

    # dp[word] = length of longest chain ending with word
    dp: Dict[str, int] = {}

    max_length = 1

    for word in words:
        dp[word] = 1  # Each word is at least a chain of 1

        # Try removing each character to find predecessor
        for i in range(len(word)):
            predecessor = word[:i] + word[i + 1:]

            if predecessor in dp:
                dp[word] = max(dp[word], dp[predecessor] + 1)

        max_length = max(max_length, dp[word])

    return max_length


def longest_string_chain_with_chain(words: List[str]) -> Tuple[int, List[str]]:
    """
    Return both the length and the actual chain.

    Args:
        words: List of words

    Returns:
        Tuple of (max_length, list of words forming the chain)
    """
    if not words:
        return (0, [])

    words.sort(key=len)

    dp: Dict[str, int] = {}
    prev: Dict[str, str] = {}  # Track predecessor for backtracking

    max_length = 1
    max_word = words[0]

    for word in words:
        dp[word] = 1
        prev[word] = None

        for i in range(len(word)):
            predecessor = word[:i] + word[i + 1:]

            if predecessor in dp:
                if dp[predecessor] + 1 > dp[word]:
                    dp[word] = dp[predecessor] + 1
                    prev[word] = predecessor

        if dp[word] > max_length:
            max_length = dp[word]
            max_word = word

    # Backtrack to build the chain
    chain = []
    current = max_word
    while current is not None:
        chain.append(current)
        current = prev[current]

    chain.reverse()

    return (max_length, chain)


def longest_string_chain_by_length(words: List[str]) -> int:
    """
    Alternative approach grouping words by length first.

    Args:
        words: List of words

    Returns:
        Length of the longest string chain
    """
    if not words:
        return 0

    # Group words by length
    by_length = defaultdict(set)
    for word in words:
        by_length[len(word)].add(word)

    # dp[word] = length of longest chain ending with word
    dp: Dict[str, int] = {}

    max_length = 1

    # Process from shortest to longest
    lengths = sorted(by_length.keys())

    for length in lengths:
        for word in by_length[length]:
            dp[word] = 1

            # Only check if there are words of length-1
            if length - 1 in by_length:
                for i in range(len(word)):
                    predecessor = word[:i] + word[i + 1:]

                    if predecessor in dp:
                        dp[word] = max(dp[word], dp[predecessor] + 1)

            max_length = max(max_length, dp[word])

    return max_length


def longest_string_chain_recursive(words: List[str]) -> int:
    """
    Top-down recursive approach with memoization.

    Args:
        words: List of words

    Returns:
        Length of the longest string chain
    """
    if not words:
        return 0

    word_set = set(words)
    memo: Dict[str, int] = {}

    def dp(word: str) -> int:
        """Returns longest chain starting from word."""
        if word in memo:
            return memo[word]

        result = 1

        # Try adding each letter at each position
        for i in range(len(word) + 1):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                next_word = word[:i] + c + word[i:]

                if next_word in word_set:
                    result = max(result, 1 + dp(next_word))

        memo[word] = result
        return result

    max_length = 0
    for word in words:
        max_length = max(max_length, dp(word))

    return max_length


def count_all_chains(words: List[str], min_length: int = 2) -> int:
    """
    Count all distinct chains of at least min_length.

    Args:
        words: List of words
        min_length: Minimum chain length to count

    Returns:
        Number of distinct chains
    """
    if not words:
        return 0

    words.sort(key=len)
    word_set = set(words)

    def count_chains(word: str) -> int:
        """Count chains starting with word."""
        count = 0

        # Try adding each character at each position
        for i in range(len(word) + 1):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                next_word = word[:i] + c + word[i:]

                if next_word in word_set:
                    count += 1 + count_chains(next_word)

        return count

    # Find all starting words (words with no predecessor in the set)
    starting_words = []
    for word in words:
        has_predecessor = False
        for i in range(len(word)):
            pred = word[:i] + word[i + 1:]
            if pred in word_set:
                has_predecessor = True
                break
        if not has_predecessor:
            starting_words.append(word)

    total = len(words)  # All single-word chains
    for word in starting_words:
        total += count_chains(word)

    return total


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    words1 = ["a", "b", "ba", "bca", "bda", "bdca"]
    result1 = longest_string_chain(words1)
    print(f"Test 1: words = {words1}")
    print(f"  Longest chain length: {result1}")
    # Expected: 4 ("a" -> "ba" -> "bda" -> "bdca")

    # Test 2: Another case
    words2 = ["xbc", "pcxbcf", "xb", "cxbc", "pcxbc"]
    result2 = longest_string_chain(words2)
    print(f"\nTest 2: words = {words2}")
    print(f"  Longest chain length: {result2}")
    # Expected: 5 ("xb" -> "xbc" -> "cxbc" -> "pcxbc" -> "pcxbcf")

    # Test 3: No chain
    words3 = ["abcd", "dbqca"]
    result3 = longest_string_chain(words3)
    print(f"\nTest 3: words = {words3}")
    print(f"  Longest chain length: {result3}")
    # Expected: 1

    # Test 4: Single word
    words4 = ["hello"]
    result4 = longest_string_chain(words4)
    print(f"\nTest 4: words = {words4}")
    print(f"  Longest chain length: {result4}")
    # Expected: 1

    # Test 5: With chain output
    words5 = ["a", "b", "ba", "bca", "bda", "bdca"]
    length, chain = longest_string_chain_with_chain(words5)
    print(f"\nTest 5: words = {words5}")
    print(f"  Longest chain length: {length}")
    print(f"  Chain: {chain}")

    # Test 6: Compare methods
    words6 = ["xbc", "pcxbcf", "xb", "cxbc", "pcxbc"]
    print(f"\nTest 6 - Method comparison for {words6}:")
    print(f"  Standard DP: {longest_string_chain(words6)}")
    print(f"  By length: {longest_string_chain_by_length(words6)}")
    print(f"  Recursive: {longest_string_chain_recursive(words6)}")

    # Test 7: Multiple chains
    words7 = ["a", "ab", "abc", "b", "bc", "bcd"]
    length7, chain7 = longest_string_chain_with_chain(words7)
    print(f"\nTest 7: words = {words7}")
    print(f"  Longest chain length: {length7}")
    print(f"  Chain: {chain7}")
    # Expected: 3 (either "a"->"ab"->"abc" or "b"->"bc"->"bcd")

    # Test 8: Empty list
    words8 = []
    result8 = longest_string_chain(words8)
    print(f"\nTest 8: words = {words8}")
    print(f"  Longest chain length: {result8}")
    # Expected: 0

    # Test 9: All same length
    words9 = ["abc", "def", "ghi"]
    result9 = longest_string_chain(words9)
    print(f"\nTest 9: words = {words9}")
    print(f"  Longest chain length: {result9}")
    # Expected: 1

    print("\nAll tests completed!")
