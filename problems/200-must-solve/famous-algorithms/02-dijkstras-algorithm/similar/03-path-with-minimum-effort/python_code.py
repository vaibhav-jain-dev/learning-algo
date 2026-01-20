"""
Path With Minimum Effort - Python Solution

Time Complexity: O(M * N * log(M * N))
Space Complexity: O(M * N)
"""

import heapq
from typing import List


def minimum_effort_path(heights: List[List[int]]) -> int:
    """
    Find path with minimum effort (maximum height difference along path).
    """
    rows, cols = len(heights), len(heights[0])
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    # effort[i][j] = minimum effort to reach cell (i, j)
    effort = [[float('inf')] * cols for _ in range(rows)]
    effort[0][0] = 0

    # Priority queue: (max_effort_so_far, row, col)
    pq = [(0, 0, 0)]

    while pq:
        curr_effort, r, c = heapq.heappop(pq)

        if r == rows - 1 and c == cols - 1:
            return curr_effort

        if curr_effort > effort[r][c]:
            continue

        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                # Effort is max of current path effort and this edge
                new_effort = max(curr_effort, abs(heights[nr][nc] - heights[r][c]))
                if new_effort < effort[nr][nc]:
                    effort[nr][nc] = new_effort
                    heapq.heappush(pq, (new_effort, nr, nc))

    return effort[rows-1][cols-1]


# Test cases
if __name__ == "__main__":
    print(f"Test 1: {minimum_effort_path([[1,2,2],[3,8,2],[5,3,5]])}")  # Expected: 2
    print(f"Test 2: {minimum_effort_path([[1,2,3],[3,8,4],[5,3,5]])}")  # Expected: 1
    print(f"Test 3: {minimum_effort_path([[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]])}")  # Expected: 0
    print("\nAll tests completed!")
