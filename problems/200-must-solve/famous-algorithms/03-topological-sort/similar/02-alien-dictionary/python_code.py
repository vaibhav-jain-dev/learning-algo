"""
Alien Dictionary - Python Solution

Time Complexity: O(C) where C is total length of all words
Space Complexity: O(U) where U is unique characters
"""

from typing import List
from collections import defaultdict, deque


def alien_order(words: List[str]) -> str:
    """
    Find the character order in the alien language.
    """
    # Build adjacency list and calculate in-degrees
    graph = defaultdict(set)
    in_degree = {c: 0 for word in words for c in word}

    # Compare adjacent words to find ordering relationships
    for i in range(len(words) - 1):
        word1, word2 = words[i], words[i + 1]
        # Check for invalid case: prefix comes after longer word
        if len(word1) > len(word2) and word1[:len(word2)] == word2:
            return ""

        for c1, c2 in zip(word1, word2):
            if c1 != c2:
                if c2 not in graph[c1]:
                    graph[c1].add(c2)
                    in_degree[c2] += 1
                break

    # Topological sort using BFS
    queue = deque([c for c in in_degree if in_degree[c] == 0])
    result = []

    while queue:
        c = queue.popleft()
        result.append(c)
        for neighbor in graph[c]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # Check for cycle
    if len(result) != len(in_degree):
        return ""

    return "".join(result)


# Test cases
if __name__ == "__main__":
    print(f"Test 1: {alien_order(['wrt','wrf','er','ett','rftt'])}")  # Expected: "wertf"
    print(f"Test 2: {alien_order(['z','x'])}")  # Expected: "zx"
    print(f"Test 3: {alien_order(['z','x','z'])}")  # Expected: "" (cycle)
    print(f"Test 4: {alien_order(['abc','ab'])}")  # Expected: "" (invalid)
    print("\nAll tests completed!")
