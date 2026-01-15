# Number of Recent Calls

## Problem Description

You have a `RecentCounter` class which counts the number of recent requests within a certain time frame.

Implement the `RecentCounter` class:

- `RecentCounter()` Initializes the counter with zero recent requests.
- `int ping(int t)` Adds a new request at time `t`, where `t` represents some time in milliseconds, and returns the number of requests that has happened in the past `3000` milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range `[t - 3000, t]`.

It is **guaranteed** that every call to `ping` uses a strictly larger value of `t` than the previous call.

## Examples

### Example 1
```
Input:
["RecentCounter", "ping", "ping", "ping", "ping"]
[[], [1], [100], [3001], [3002]]

Output:
[null, 1, 2, 3, 3]

Explanation:
RecentCounter recentCounter = new RecentCounter();
recentCounter.ping(1);     // requests = [1], range is [-2999,1], return 1
recentCounter.ping(100);   // requests = [1,100], range is [-2900,100], return 2
recentCounter.ping(3001);  // requests = [1,100,3001], range is [1,3001], return 3
recentCounter.ping(3002);  // requests = [1,100,3001,3002], range is [2,3002],
                           // 1 is out of range, return 3
```

### Example 2
```
Input:
["RecentCounter", "ping", "ping", "ping", "ping", "ping"]
[[], [1], [1000], [2000], [3000], [4000]]

Output:
[null, 1, 2, 3, 4, 4]

Explanation:
At ping(4000), requests = [1,1000,2000,3000,4000]
Range is [1000, 4000], so 1 is out, count = 4
```

### Example 3
```
Input:
["RecentCounter", "ping", "ping"]
[[], [1], [3002]]

Output:
[null, 1, 1]

Explanation:
At ping(3002), range is [2, 3002]
Request at t=1 is outside this range.
```

### Example 4
```
Input:
["RecentCounter", "ping", "ping", "ping", "ping"]
[[], [100], [200], [300], [400]]

Output:
[null, 1, 2, 3, 4]

Explanation:
All requests within 3000ms of each other, so all are counted.
```

## Constraints
- `1 <= t <= 10^9`
- Each test case will call `ping` with **strictly increasing** values of `t`.
- At most `10^4` calls will be made to `ping`.

## Hints

<details>
<summary>Hint 1</summary>
Think about what data structure would efficiently allow you to add elements and remove old elements from the front.
</details>

<details>
<summary>Hint 2</summary>
A queue is perfect here! New requests are added to the back, and old requests (outside the time window) can be removed from the front.
</details>

<details>
<summary>Hint 3</summary>
Since timestamps are strictly increasing, once a timestamp is too old (less than t - 3000), it will never be valid again. You can safely remove it.
</details>

<details>
<summary>Hint 4</summary>
The answer is simply the size of the queue after removing old timestamps.
</details>

## Approach

### Queue-Based Solution

Use a queue to store timestamps of recent requests:

1. **ping(t)**:
   - Add timestamp `t` to the queue
   - Remove all timestamps from the front that are less than `t - 3000`
   - Return the size of the queue

### Why Queue Works

- **FIFO Property**: Since timestamps are strictly increasing, older timestamps are always at the front of the queue.
- **Efficient Removal**: We only need to check and remove from the front (older requests).
- **No Need to Search**: The queue naturally maintains chronological order.

### Visual Example

```
ping(1):    Queue: [1]         Range: [-2999, 1]    Count: 1
ping(100):  Queue: [1, 100]    Range: [-2900, 100]  Count: 2
ping(3001): Queue: [1, 100, 3001]  Range: [1, 3001]     Count: 3
ping(3002): Remove 1, Queue: [100, 3001, 3002]  Range: [2, 3002]  Count: 3
```

### Time Complexity
- **O(n)** amortized per ping, where n is the number of requests
- Each request is added once and removed at most once
- Over all pings, total time is O(total number of pings)

### Space Complexity
- **O(W)** where W is the maximum number of requests within any 3000ms window
- In worst case, O(n) if all requests are within 3000ms of each other

### Alternative: Binary Search

If the problem didn't require removing old requests, we could use binary search on a list:
- Store all timestamps in a list
- Binary search to find the first timestamp >= t - 3000
- Count = end index - found index

This would be O(log n) per query but O(n) space for all requests.
