"""
Word Ladder with A* Heuristic - Python Solution

Find shortest transformation sequence using A* with character difference heuristic.

Time Complexity: O(M^2 * N)
Space Complexity: O(M * N)
"""

from typing import List
from collections import deque, defaultdict
import heapq


def word_ladder_bfs(beginWord: str, endWord: str, wordList: List[str]) -> int:
    """
    Standard BFS solution for word ladder.

    Args:
        beginWord: Starting word
        endWord: Target word
        wordList: Dictionary of valid words

    Returns:
        Number of words in shortest transformation sequence, or 0
    """
    if endWord not in wordList:
        return 0

    word_set = set(wordList)
    word_len = len(beginWord)

    # Build pattern dictionary for O(1) neighbor lookup
    patterns = defaultdict(list)
    for word in word_set:
        for i in range(word_len):
            pattern = word[:i] + '*' + word[i+1:]
            patterns[pattern].append(word)

    queue = deque([(beginWord, 1)])
    visited = {beginWord}

    while queue:
        word, length = queue.popleft()

        for i in range(word_len):
            pattern = word[:i] + '*' + word[i+1:]

            for neighbor in patterns[pattern]:
                if neighbor == endWord:
                    return length + 1

                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, length + 1))

    return 0


def word_ladder_astar(beginWord: str, endWord: str, wordList: List[str]) -> int:
    """
    A* solution with character difference heuristic.

    Args:
        beginWord: Starting word
        endWord: Target word
        wordList: Dictionary of valid words

    Returns:
        Number of words in shortest transformation sequence, or 0
    """
    if endWord not in wordList:
        return 0

    word_set = set(wordList)
    word_len = len(beginWord)

    # Heuristic: count of different characters from endWord
    def heuristic(word: str) -> int:
        return sum(1 for i in range(word_len) if word[i] != endWord[i])

    # Build pattern dictionary
    patterns = defaultdict(list)
    for word in word_set:
        for i in range(word_len):
            pattern = word[:i] + '*' + word[i+1:]
            patterns[pattern].append(word)

    # Priority queue: (f_score, g_score, word)
    start_h = heuristic(beginWord)
    pq = [(start_h + 1, 1, beginWord)]
    g_scores = {beginWord: 1}

    while pq:
        f, length, word = heapq.heappop(pq)

        if word == endWord:
            return length

        if length > g_scores.get(word, float('inf')):
            continue

        for i in range(word_len):
            pattern = word[:i] + '*' + word[i+1:]

            for neighbor in patterns[pattern]:
                new_length = length + 1

                if new_length < g_scores.get(neighbor, float('inf')):
                    g_scores[neighbor] = new_length
                    f = new_length + heuristic(neighbor)
                    heapq.heappush(pq, (f, new_length, neighbor))

    return 0


def word_ladder_bidirectional(beginWord: str, endWord: str, wordList: List[str]) -> int:
    """
    Bidirectional BFS for faster search.

    Args:
        beginWord: Starting word
        endWord: Target word
        wordList: Dictionary of valid words

    Returns:
        Number of words in shortest transformation sequence, or 0
    """
    if endWord not in wordList:
        return 0

    word_set = set(wordList)
    word_len = len(beginWord)

    # Build pattern dictionary
    patterns = defaultdict(list)
    for word in word_set:
        for i in range(word_len):
            pattern = word[:i] + '*' + word[i+1:]
            patterns[pattern].append(word)

    # Two frontiers
    front_begin = {beginWord}
    front_end = {endWord}
    visited_begin = {beginWord: 1}
    visited_end = {endWord: 1}

    while front_begin and front_end:
        # Always expand smaller frontier
        if len(front_begin) > len(front_end):
            front_begin, front_end = front_end, front_begin
            visited_begin, visited_end = visited_end, visited_begin

        next_front = set()

        for word in front_begin:
            current_len = visited_begin[word]

            for i in range(word_len):
                pattern = word[:i] + '*' + word[i+1:]

                for neighbor in patterns[pattern]:
                    if neighbor in visited_end:
                        return current_len + visited_end[neighbor]

                    if neighbor not in visited_begin and neighbor in word_set:
                        visited_begin[neighbor] = current_len + 1
                        next_front.add(neighbor)

        front_begin = next_front

    return 0


# Test cases
if __name__ == "__main__":
    # Test 1: Standard case
    result1 = word_ladder_bfs("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
    print(f"Test 1 (BFS): {result1}")
    assert result1 == 5, f"Expected 5, got {result1}"

    result1_astar = word_ladder_astar("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
    print(f"Test 1 (A*): {result1_astar}")
    assert result1_astar == 5

    result1_bidir = word_ladder_bidirectional("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
    print(f"Test 1 (Bidirectional): {result1_bidir}")
    assert result1_bidir == 5

    # Test 2: No path (endWord not in list)
    result2 = word_ladder_bfs("hit", "cog", ["hot", "dot", "dog", "lot", "log"])
    print(f"Test 2 (BFS): {result2}")
    assert result2 == 0, f"Expected 0, got {result2}"

    # Test 3: Direct transformation
    result3 = word_ladder_bfs("hot", "dot", ["dot"])
    print(f"Test 3 (BFS): {result3}")
    assert result3 == 2, f"Expected 2, got {result3}"

    # Test 4: Multiple paths (same length)
    result4 = word_ladder_bfs("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
    print(f"Test 4 (BFS): {result4}")
    assert result4 == 5

    # Test 5: Longer words
    result5 = word_ladder_astar("game", "cope", ["came", "come", "cope", "fame", "same", "gape", "cape"])
    print(f"Test 5 (A*): {result5}")

    print("\nAll tests passed!")
