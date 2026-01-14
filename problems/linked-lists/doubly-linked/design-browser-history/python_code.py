"""
Design Browser History

Implement a browser history with visit, back, and forward operations
using a doubly linked list.

Time Complexity:
- visit: O(1)
- back: O(steps)
- forward: O(steps)

Space Complexity: O(n) where n is number of pages visited
"""

from typing import Optional, List


class PageNode:
    """Node representing a visited page in browser history."""

    def __init__(self, url: str):
        self.url = url
        self.prev: Optional['PageNode'] = None
        self.next: Optional['PageNode'] = None

    def __repr__(self):
        return f"Page({self.url})"


class BrowserHistory:
    """
    Browser history implementation using doubly linked list.

    Supports visit, back, and forward operations.
    """

    def __init__(self, homepage: str):
        """Initialize browser with homepage."""
        self.current = PageNode(homepage)

    def visit(self, url: str) -> None:
        """
        Visit a new URL from current page.

        Creates new page node and clears forward history.
        """
        new_page = PageNode(url)

        # Link current to new page
        self.current.next = new_page
        new_page.prev = self.current

        # new_page.next is None, which clears forward history

        # Move to new page
        self.current = new_page

    def back(self, steps: int) -> str:
        """
        Move back in history by given steps.

        Returns current URL after moving back.
        If steps > available history, moves to earliest page.
        """
        while steps > 0 and self.current.prev:
            self.current = self.current.prev
            steps -= 1

        return self.current.url

    def forward(self, steps: int) -> str:
        """
        Move forward in history by given steps.

        Returns current URL after moving forward.
        If steps > available forward history, moves to latest page.
        """
        while steps > 0 and self.current.next:
            self.current = self.current.next
            steps -= 1

        return self.current.url

    def get_current_url(self) -> str:
        """Get current page URL."""
        return self.current.url

    def get_history_string(self) -> str:
        """Get string representation of history with current marker."""
        # Find the beginning
        node = self.current
        while node.prev:
            node = node.prev

        # Build string
        pages = []
        while node:
            if node == self.current:
                pages.append(f"[{node.url}]")
            else:
                pages.append(node.url)
            node = node.next

        return " <-> ".join(pages)


# Alternative implementation using a list
class BrowserHistoryList:
    """
    Browser history implementation using a list and index.

    Alternative approach that's also efficient.
    """

    def __init__(self, homepage: str):
        self.history: List[str] = [homepage]
        self.current_idx: int = 0

    def visit(self, url: str) -> None:
        # Clear forward history
        self.history = self.history[:self.current_idx + 1]
        self.history.append(url)
        self.current_idx += 1

    def back(self, steps: int) -> str:
        self.current_idx = max(0, self.current_idx - steps)
        return self.history[self.current_idx]

    def forward(self, steps: int) -> str:
        self.current_idx = min(len(self.history) - 1, self.current_idx + steps)
        return self.history[self.current_idx]


# ==================== TEST CASES ====================

def test_browser_history():
    print("=" * 60)
    print("DESIGN BROWSER HISTORY - TEST CASES")
    print("=" * 60)

    # Test case 1: Main example
    print("\nTest 1: Main example from problem")
    browser = BrowserHistory("leetcode.com")
    print(f"  Initial: {browser.get_history_string()}")

    browser.visit("google.com")
    print(f"  visit(google.com): {browser.get_history_string()}")

    browser.visit("facebook.com")
    print(f"  visit(facebook.com): {browser.get_history_string()}")

    browser.visit("youtube.com")
    print(f"  visit(youtube.com): {browser.get_history_string()}")

    result = browser.back(1)
    print(f"  back(1) = {result}: {browser.get_history_string()}")
    assert result == "facebook.com"

    result = browser.back(1)
    print(f"  back(1) = {result}: {browser.get_history_string()}")
    assert result == "google.com"

    result = browser.forward(1)
    print(f"  forward(1) = {result}: {browser.get_history_string()}")
    assert result == "facebook.com"

    browser.visit("linkedin.com")
    print(f"  visit(linkedin.com): {browser.get_history_string()}")

    result = browser.forward(2)
    print(f"  forward(2) = {result}: {browser.get_history_string()}")
    assert result == "linkedin.com"  # Can't go forward

    result = browser.back(2)
    print(f"  back(2) = {result}: {browser.get_history_string()}")
    assert result == "google.com"

    result = browser.back(7)
    print(f"  back(7) = {result}: {browser.get_history_string()}")
    assert result == "leetcode.com"
    print("  PASSED!")

    # Test case 2: Simple back/forward
    print("\nTest 2: Simple back/forward at limits")
    browser = BrowserHistory("home.com")
    browser.visit("a.com")
    print(f"  History: {browser.get_history_string()}")

    result = browser.back(5)
    print(f"  back(5) = {result}")
    assert result == "home.com"

    result = browser.forward(5)
    print(f"  forward(5) = {result}")
    assert result == "a.com"
    print("  PASSED!")

    # Test case 3: No forward history after visit
    print("\nTest 3: Visit clears forward history")
    browser = BrowserHistory("1")
    browser.visit("2")
    browser.visit("3")
    browser.visit("4")
    print(f"  Initial: {browser.get_history_string()}")

    browser.back(2)
    print(f"  back(2): {browser.get_history_string()}")

    browser.visit("5")  # Should clear 3 and 4
    print(f"  visit(5): {browser.get_history_string()}")

    result = browser.forward(10)
    print(f"  forward(10) = {result} (can't go forward)")
    assert result == "5"

    result = browser.back(10)
    print(f"  back(10) = {result}")
    assert result == "1"
    print("  PASSED!")

    # Test case 4: Single page, no history
    print("\nTest 4: Single page")
    browser = BrowserHistory("only.com")

    result = browser.back(10)
    assert result == "only.com"
    print(f"  back(10) on single page = {result}")

    result = browser.forward(10)
    assert result == "only.com"
    print(f"  forward(10) on single page = {result}")
    print("  PASSED!")

    # Test case 5: List-based implementation
    print("\nTest 5: List-based implementation")
    browser = BrowserHistoryList("a.com")
    browser.visit("b.com")
    browser.visit("c.com")

    result = browser.back(1)
    assert result == "b.com"
    print(f"  After visits a,b,c -> back(1) = {result}")

    browser.visit("d.com")
    result = browser.forward(1)
    assert result == "d.com"
    print(f"  After visit d -> forward(1) = {result} (can't go forward)")

    result = browser.back(3)
    assert result == "a.com"
    print(f"  back(3) = {result}")
    print("  PASSED!")

    # Test case 6: Alternating back and forward
    print("\nTest 6: Alternating back and forward")
    browser = BrowserHistory("home")
    for i in range(1, 6):
        browser.visit(f"page{i}")
    print(f"  History: {browser.get_history_string()}")

    # Navigate back and forth
    results = []
    results.append(browser.back(2))
    results.append(browser.forward(1))
    results.append(browser.back(3))
    results.append(browser.forward(2))
    print(f"  back(2), forward(1), back(3), forward(2) = {results}")
    assert results == ["page3", "page4", "page1", "page3"]
    print("  PASSED!")

    print("\n" + "=" * 60)
    print("ALL TESTS PASSED!")
    print("=" * 60)


if __name__ == "__main__":
    test_browser_history()
