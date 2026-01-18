"""
Word Ladder - Python Solutions

Find shortest transformation sequence from beginWord to endWord
where each step changes exactly one letter.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from collections import defaultdict, deque
from typing import List, Set


# ============================================================================
# APPROACH 1: BFS with Pattern Mapping
# ============================================================================
# Time Complexity:  O(M^2 × N) where M is word length, N is wordList size
# Space Complexity: O(M^2 × N) for the pattern map
#
# WHY THIS IS BEST:
# - Efficient neighbor finding via generic patterns
# - Avoids O(N^2) pairwise comparison
# - Standard BFS guarantees shortest path
# ============================================================================

def ladder_length_pattern(begin_word: str, end_word: str, word_list: List[str]) -> int:
    """
    Find shortest transformation using pattern mapping.

    Key Insight: Words that differ by one letter share a pattern.
    "hot" and "dot" both match pattern "*ot"

    Pattern Map:
        "*ot" -> ["hot", "dot", "lot"]
        "h*t" -> ["hot", "hit"]
        etc.
    """
    # Build word set for O(1) lookup
    word_set = set(word_list)

    # End word must be in list
    if end_word not in word_set:
        return 0

    # Build pattern map
    word_len = len(begin_word)
    patterns = defaultdict(list)

    for word in word_list + [begin_word]:
        for i in range(word_len):
            pattern = word[:i] + "*" + word[i+1:]
            patterns[pattern].append(word)

    # BFS
    visited = {begin_word}
    queue = deque([begin_word])
    length = 1

    while queue:
        for _ in range(len(queue)):
            word = queue.popleft()

            # Generate all patterns for this word
            for i in range(word_len):
                pattern = word[:i] + "*" + word[i+1:]

                # Check all words matching this pattern
                for neighbor in patterns[pattern]:
                    if neighbor == end_word:
                        return length + 1

                    if neighbor not in visited:
                        visited.add(neighbor)
                        queue.append(neighbor)

        length += 1

    return 0


# ============================================================================
# APPROACH 2: Bidirectional BFS
# ============================================================================
# Time Complexity:  O(M^2 × N)
# Space Complexity: O(M^2 × N)
#
# WHEN TO USE:
# - Very large word lists
# - Want to reduce search space significantly
# ============================================================================

def ladder_length_bidirectional(begin_word: str, end_word: str, word_list: List[str]) -> int:
    """
    Search from both ends simultaneously.

    When frontiers meet, we've found the shortest path.
    """
    word_set = set(word_list)

    if end_word not in word_set:
        return 0

    # Build pattern map
    word_len = len(begin_word)
    patterns = defaultdict(list)

    for word in word_list + [begin_word]:
        for i in range(word_len):
            pattern = word[:i] + "*" + word[i+1:]
            patterns[pattern].append(word)

    # Two frontiers
    begin_visited = {begin_word: 1}
    end_visited = {end_word: 1}
    begin_queue = deque([begin_word])
    end_queue = deque([end_word])

    def expand_frontier(queue: deque, visited: dict, other_visited: dict) -> int:
        """Expand one level of a frontier."""
        for _ in range(len(queue)):
            word = queue.popleft()
            current_dist = visited[word]

            for i in range(word_len):
                pattern = word[:i] + "*" + word[i+1:]

                for neighbor in patterns[pattern]:
                    # Check if frontiers meet
                    if neighbor in other_visited:
                        return current_dist + other_visited[neighbor]

                    if neighbor not in visited:
                        visited[neighbor] = current_dist + 1
                        queue.append(neighbor)

        return 0

    while begin_queue and end_queue:
        # Always expand smaller frontier
        if len(begin_queue) <= len(end_queue):
            result = expand_frontier(begin_queue, begin_visited, end_visited)
        else:
            result = expand_frontier(end_queue, end_visited, begin_visited)

        if result > 0:
            return result

    return 0


# ============================================================================
# APPROACH 3: BFS with Character Replacement
# ============================================================================
# Time Complexity:  O(M × 26 × N) = O(M × N)
# Space Complexity: O(N)
#
# WHEN TO USE:
# - Simpler implementation
# - When pattern building seems too complex
# ============================================================================

def ladder_length_simple(begin_word: str, end_word: str, word_list: List[str]) -> int:
    """
    Use character replacement to find neighbors.

    Try replacing each character with a-z and check if result is in word list.
    """
    word_set = set(word_list)

    if end_word not in word_set:
        return 0

    queue = deque([begin_word])
    visited = {begin_word}
    length = 1

    while queue:
        for _ in range(len(queue)):
            word = queue.popleft()

            # Try changing each character
            for i in range(len(word)):
                # Try all 26 letters
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    if c == word[i]:
                        continue

                    new_word = word[:i] + c + word[i+1:]

                    if new_word == end_word:
                        return length + 1

                    if new_word in word_set and new_word not in visited:
                        visited.add(new_word)
                        queue.append(new_word)

        length += 1

    return 0


# ============================================================================
# APPROACH 4: BFS with Generator (Memory Efficient)
# ============================================================================
# Time Complexity:  O(M × 26 × N)
# Space Complexity: O(N) - doesn't build full pattern map
#
# WHEN TO USE:
# - Memory is limited
# - Pattern map would be too large
# ============================================================================

def ladder_length_generator(begin_word: str, end_word: str, word_list: List[str]) -> int:
    """
    Generate neighbors lazily instead of building full pattern map.
    """
    word_set = set(word_list)

    if end_word not in word_set:
        return 0

    def get_neighbors(word: str):
        """Generate all valid neighbors of a word."""
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                if c != word[i]:
                    new_word = word[:i] + c + word[i+1:]
                    if new_word in word_set:
                        yield new_word

    queue = deque([begin_word])
    visited = {begin_word}
    length = 1

    while queue:
        for _ in range(len(queue)):
            word = queue.popleft()

            for neighbor in get_neighbors(word):
                if neighbor == end_word:
                    return length + 1

                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)

        length += 1

    return 0


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        ("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"], 5, "Standard case"),
        ("hit", "cog", ["hot", "dot", "dog", "lot", "log"], 0, "End word not in list"),
        ("a", "c", ["a", "b", "c"], 2, "Single character words"),
        ("hot", "dog", ["hot", "dog", "dot"], 3, "Direct path"),
        ("leet", "code", ["lest", "leet", "lose", "code", "lode", "robe", "lost"], 0, "No valid path"),
    ]

    approaches = [
        ("Pattern Mapping", ladder_length_pattern),
        ("Bidirectional BFS", ladder_length_bidirectional),
        ("Simple Replacement", ladder_length_simple),
        ("Generator-based", ladder_length_generator),
    ]

    print("=" * 70)
    print("WORD LADDER - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)

        for begin, end, words, expected, desc in test_cases:
            result = func(begin, end, words[:])  # Copy list
            status = "PASS" if result == expected else "FAIL"
            print(f"  [{status}] {desc}: got {result}, expected {expected}")


# ============================================================================
# SAMPLE INPUT
# ============================================================================

if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("DETAILED EXAMPLE")
    print("=" * 70)

    begin_word = "hit"
    end_word = "cog"
    word_list = ["hot", "dot", "dog", "lot", "log", "cog"]

    print(f"\nbeginWord: {begin_word}")
    print(f"endWord: {end_word}")
    print(f"wordList: {word_list}")
    print(f"\nShortest ladder length: {ladder_length_pattern(begin_word, end_word, word_list)}")
    print("Path: hit -> hot -> dot -> dog -> cog")

    print("\nAll tests completed!")
