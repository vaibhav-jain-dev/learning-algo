# Design Browser History

## Problem Description

You have a browser of one tab where you start on the homepage and you can visit another url, get back in the history number of steps or move forward in the history number of steps.

Implement the `BrowserHistory` class:

- `BrowserHistory(string homepage)` - Initializes the object with the homepage of the browser.
- `void visit(string url)` - Visits url from the current page. It clears up all the forward history.
- `string back(int steps)` - Move steps back in history. If you can only return x steps in the history and steps > x, you will return only x steps. Return the current url after moving back in history at most steps.
- `string forward(int steps)` - Move steps forward in history. If you can only forward x steps in the history and steps > x, you will forward only x steps. Return the current url after forwarding in history at most steps.

## Examples

### Example 1
```
Input:
["BrowserHistory", "visit", "visit", "visit", "back", "back", "forward", "visit", "forward", "back", "back"]
[["leetcode.com"], ["google.com"], ["facebook.com"], ["youtube.com"], [1], [1], [1], ["linkedin.com"], [2], [2], [7]]

Output:
[null, null, null, null, "facebook.com", "google.com", "facebook.com", null, "linkedin.com", "google.com", "leetcode.com"]

Explanation:
BrowserHistory browserHistory = new BrowserHistory("leetcode.com");
browserHistory.visit("google.com");       // You are in "leetcode.com". Visit "google.com"
browserHistory.visit("facebook.com");     // You are in "google.com". Visit "facebook.com"
browserHistory.visit("youtube.com");      // You are in "facebook.com". Visit "youtube.com"
browserHistory.back(1);                   // You are in "youtube.com", move back to "facebook.com" return "facebook.com"
browserHistory.back(1);                   // You are in "facebook.com", move back to "google.com" return "google.com"
browserHistory.forward(1);                // You are in "google.com", move forward to "facebook.com" return "facebook.com"
browserHistory.visit("linkedin.com");     // You are in "facebook.com". Visit "linkedin.com"
browserHistory.forward(2);                // You are in "linkedin.com", cannot forward, return "linkedin.com"
browserHistory.back(2);                   // You are in "linkedin.com", move back to "google.com" return "google.com"
browserHistory.back(7);                   // You are in "google.com", can only back 1 step to "leetcode.com" return "leetcode.com"
```

### Example 2
```
Input:
["BrowserHistory", "visit", "back", "forward"]
[["home.com"], ["a.com"], [5], [5]]

Output: [null, null, "home.com", "a.com"]

Explanation:
- Start at home.com
- Visit a.com
- Back 5 steps but can only go 1, return home.com
- Forward 5 steps but can only go 1, return a.com
```

## Constraints

- 1 <= homepage.length <= 20
- 1 <= url.length <= 20
- 1 <= steps <= 100
- homepage and url consist of '.' and lower case English letters
- At most 5000 calls will be made to visit, back, and forward

## Hints

<details>
<summary>Hint 1</summary>
A doubly linked list is perfect for this problem because you need to move both forward and backward.
</details>

<details>
<summary>Hint 2</summary>
Each node stores a URL. The current position is tracked by a pointer to the current node.
</details>

<details>
<summary>Hint 3</summary>
When visiting a new URL, create a new node after current and clear any forward history by setting the new node's next to null.
</details>

<details>
<summary>Hint 4</summary>
For back/forward operations, move the current pointer and count steps. Stop when you reach the end or complete the steps.
</details>

## Approach

### Doubly Linked List Approach

Use a doubly linked list where:
- Each node contains a URL
- Current pointer tracks the page we're viewing
- Prev pointers allow going back
- Next pointers allow going forward

**Operations:**

**visit(url):**
1. Create new node with the url
2. Set current.next = new_node
3. Set new_node.prev = current
4. Set new_node.next = null (clears forward history!)
5. Move current to new_node

**back(steps):**
1. Move current to prev, decrement steps
2. Stop when steps = 0 or current.prev is null
3. Return current.url

**forward(steps):**
1. Move current to next, decrement steps
2. Stop when steps = 0 or current.next is null
3. Return current.url

**Time Complexity:**
- visit: O(1)
- back: O(min(steps, history_length))
- forward: O(min(steps, forward_length))

**Space Complexity:** O(n) where n is number of pages visited

### Alternative: Array/List Approach

Could also use a dynamic array with an index pointer. But doubly linked list is more elegant for this use case since we're essentially implementing browser navigation.

## Visual Walkthrough

```
Initial: [leetcode.com] <- current

After visit("google.com"):
[leetcode.com] <-> [google.com] <- current

After visit("facebook.com"):
[leetcode.com] <-> [google.com] <-> [facebook.com] <- current

After visit("youtube.com"):
[leetcode.com] <-> [google.com] <-> [facebook.com] <-> [youtube.com] <- current

After back(1):
[leetcode.com] <-> [google.com] <-> [facebook.com] <- current <-> [youtube.com]
Returns: "facebook.com"

After back(1):
[leetcode.com] <-> [google.com] <- current <-> [facebook.com] <-> [youtube.com]
Returns: "google.com"

After visit("linkedin.com"):
[leetcode.com] <-> [google.com] <- [linkedin.com] <- current
                                   (forward history cleared!)
Returns: null (but current is linkedin.com)
```

## Common Mistakes

1. Forgetting to clear forward history when visiting a new page
2. Not handling edge cases when steps > available history
3. Not updating prev/next pointers correctly
4. Off-by-one errors in counting steps
