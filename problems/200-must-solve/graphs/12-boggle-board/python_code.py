"""
Boggle Board - Python Solution

Find all words from a dictionary that can be formed in a boggle board.
Uses Trie for efficient prefix matching combined with DFS traversal.

Time Complexity: O(N * M * 8^L + W * L) where:
    - N, M are board dimensions
    - L is max word length
    - W is number of words
Space Complexity: O(W * L + N * M) for Trie and recursion stack
"""


class TrieNode:
    """Node in the Trie data structure."""

    def __init__(self):
        self.children = {}
        self.word = None  # Stores complete word at end nodes


class Trie:
    """Trie (prefix tree) for efficient word lookup."""

    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        """Insert a word into the Trie."""
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.word = word  # Mark end of word


def boggle_board(board, words):
    """
    Find all words from the dictionary that exist in the boggle board.

    Args:
        board: 2D list of characters representing the boggle board
        words: List of words to search for

    Returns:
        List of words found in the board
    """
    if not board or not board[0] or not words:
        return []

    # Build Trie from all words
    trie = Trie()
    for word in words:
        trie.insert(word)

    rows, cols = len(board), len(board[0])
    found_words = set()

    # 8 directions: up, down, left, right, and 4 diagonals
    directions = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),           (0, 1),
        (1, -1),  (1, 0),  (1, 1)
    ]

    def dfs(row, col, node, visited):
        """DFS traversal guided by Trie structure."""
        char = board[row][col]

        # Prune if character not in Trie
        if char not in node.children:
            return

        next_node = node.children[char]

        # Found a complete word
        if next_node.word is not None:
            found_words.add(next_node.word)
            # Don't return - there might be longer words with same prefix

        # Mark as visited
        visited.add((row, col))

        # Explore all 8 directions
        for dr, dc in directions:
            new_row, new_col = row + dr, col + dc

            # Check bounds and if not visited
            if (0 <= new_row < rows and
                0 <= new_col < cols and
                (new_row, new_col) not in visited):
                dfs(new_row, new_col, next_node, visited)

        # Backtrack
        visited.remove((row, col))

    # Start DFS from each cell
    for i in range(rows):
        for j in range(cols):
            dfs(i, j, trie.root, set())

    return list(found_words)


def boggle_board_optimized(board, words):
    """
    Optimized version that removes found words from Trie.

    This prevents finding the same word multiple times and
    allows pruning empty branches.
    """
    if not board or not board[0] or not words:
        return []

    # Build Trie
    trie = Trie()
    for word in words:
        trie.insert(word)

    rows, cols = len(board), len(board[0])
    result = []

    directions = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),           (0, 1),
        (1, -1),  (1, 0),  (1, 1)
    ]

    def dfs(row, col, node):
        char = board[row][col]

        if char not in node.children:
            return

        next_node = node.children[char]

        # Found a word - add to result and mark as found
        if next_node.word is not None:
            result.append(next_node.word)
            next_node.word = None  # Prevent duplicates

        # Temporarily mark cell as visited
        board[row][col] = '#'

        for dr, dc in directions:
            new_row, new_col = row + dr, col + dc

            if (0 <= new_row < rows and
                0 <= new_col < cols and
                board[new_row][new_col] != '#'):
                dfs(new_row, new_col, next_node)

        # Restore cell
        board[row][col] = char

        # Optimization: remove leaf nodes that are not word endings
        if not next_node.children and next_node.word is None:
            del node.children[char]

    for i in range(rows):
        for j in range(cols):
            dfs(i, j, trie.root)

    return result


# Test cases
if __name__ == "__main__":
    # Test 1: Main example
    board1 = [
        ["t", "h", "i", "s"],
        ["w", "a", "t", "s"],
        ["o", "a", "h", "g"],
        ["f", "g", "d", "t"]
    ]
    words1 = ["this", "two", "fat", "that"]
    result1 = boggle_board(board1, words1)
    print(f"Test 1: {sorted(result1)}")
    print(f"Expected: ['fat', 'that', 'this', 'two']")
    assert set(result1) == {"this", "two", "fat", "that"}

    # Test 2: No reusing same cell
    board2 = [
        ["a", "b"],
        ["c", "d"]
    ]
    words2 = ["abcd", "abdc", "abca"]
    result2 = boggle_board(board2, words2)
    print(f"\nTest 2: {sorted(result2)}")
    print(f"Expected: ['abcd', 'abdc']")
    assert "abca" not in result2  # Can't reuse 'a'

    # Test 3: Single cell board
    board3 = [["a"]]
    words3 = ["a", "ab"]
    result3 = boggle_board(board3, words3)
    print(f"\nTest 3: {result3}")
    print(f"Expected: ['a']")
    assert result3 == ["a"]

    # Test 4: No words found
    board4 = [
        ["x", "y"],
        ["z", "w"]
    ]
    words4 = ["abc", "def"]
    result4 = boggle_board(board4, words4)
    print(f"\nTest 4: {result4}")
    print(f"Expected: []")
    assert result4 == []

    # Test 5: Diagonal words
    board5 = [
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"]
    ]
    words5 = ["aei", "ceg", "abc", "ghi"]
    result5 = boggle_board(board5, words5)
    print(f"\nTest 5: {sorted(result5)}")
    print(f"Expected: ['abc', 'aei', 'ceg', 'ghi']")
    assert set(result5) == {"aei", "ceg", "abc", "ghi"}

    # Test 6: Overlapping prefixes
    board6 = [
        ["c", "a", "t"],
        ["r", "r", "e"],
        ["t", "o", "n"]
    ]
    words6 = ["car", "cart", "cat", "ten"]
    result6 = boggle_board(board6, words6)
    print(f"\nTest 6: {sorted(result6)}")

    # Test 7: Optimized version
    board7 = [
        ["t", "h", "i", "s"],
        ["w", "a", "t", "s"],
        ["o", "a", "h", "g"],
        ["f", "g", "d", "t"]
    ]
    words7 = ["this", "two", "fat", "that"]
    result7 = boggle_board_optimized(board7, words7)
    print(f"\nTest 7 (Optimized): {sorted(result7)}")
    assert set(result7) == {"this", "two", "fat", "that"}

    print("\nAll tests passed!")
