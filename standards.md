# Content Standards

This document defines the standard markdown format for all content in this repository. All problems and topics must follow these formats to pass CI validation.

## Table of Contents

- [DS/Algo Problem Format](#dsalgo-problem-format)
- [Machine Coding Problem Format](#machine-coding-problem-format)
- [System Design Topic Format](#system-design-topic-format)
- [Validation Rules](#validation-rules)

---

## DS/Algo Problem Format

DS/Algo problems must be placed in `problems/<category>/<subcategory>/<problem-name>/` with three files:
- `problem.md` - Problem description
- `python_code.py` - Python solution
- `golang_code.go` - Go solution

### problem.md Template

```markdown
# Problem Title

## Description

Clear problem statement explaining what needs to be solved.

## Examples

### Example 1

**Input:** `nums = [1, 2, 3], target = 5`

**Output:** `[1, 2]`

**Explanation:** nums[1] + nums[2] = 2 + 3 = 5

### Example 2

**Input:** `nums = [3, 3], target = 6`

**Output:** `[0, 1]`

## Constraints

- `1 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- Only one valid answer exists

## Approach

### Brute Force

Explain the naive approach and why it's suboptimal.

**Time Complexity:** O(n²)
**Space Complexity:** O(1)

### Optimal Solution

Explain the optimal approach step by step.

**Time Complexity:** O(n)
**Space Complexity:** O(n)

## Hints

1. First hint without giving away the solution
2. Second hint that guides toward the approach
3. Third hint that's more specific

## Tags

`Array`, `Hash Map`, `Two Pointers`
```

### python_code.py Template

```python
"""
Problem: Problem Title
Category: Category Name
Subcategory: Subcategory Name

Time Complexity: O(n)
Space Complexity: O(n)
"""

from typing import List


def main():
    """
    Main function that demonstrates the solution.
    Must return a value (not just print).
    """
    # Example usage
    solution = Solution()

    # Test case 1
    result1 = solution.solve([1, 2, 3], 5)
    print(f"Test 1: {result1}")

    # Test case 2
    result2 = solution.solve([3, 3], 6)
    print(f"Test 2: {result2}")

    # Return results for validation
    return {
        "test1": result1,
        "test2": result2
    }


class Solution:
    def solve(self, nums: List[int], target: int) -> List[int]:
        """
        Optimal solution using hash map.

        Args:
            nums: List of integers
            target: Target sum

        Returns:
            Indices of two numbers that add up to target
        """
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []


# Alternative: Brute force solution
class BruteForceSolution:
    def solve(self, nums: List[int], target: int) -> List[int]:
        """O(n²) brute force approach"""
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                if nums[i] + nums[j] == target:
                    return [i, j]
        return []
```

### golang_code.go Template

```go
/*
Problem: Problem Title
Category: Category Name
Subcategory: Subcategory Name

Time Complexity: O(n)
Space Complexity: O(n)
*/

package main

import "fmt"

func main() {
	// Test case 1
	result1 := solve([]int{1, 2, 3}, 5)
	fmt.Printf("Test 1: %v\n", result1)

	// Test case 2
	result2 := solve([]int{3, 3}, 6)
	fmt.Printf("Test 2: %v\n", result2)
}

// solve finds two indices whose values sum to target
func solve(nums []int, target int) []int {
	seen := make(map[int]int)
	for i, num := range nums {
		complement := target - num
		if j, exists := seen[complement]; exists {
			return []int{j, i}
		}
		seen[num] = i
	}
	return []int{}
}

// solveBruteForce is the O(n²) approach
func solveBruteForce(nums []int, target int) []int {
	n := len(nums)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if nums[i]+nums[j] == target {
				return []int{i, j}
			}
		}
	}
	return []int{}
}
```

---

## Machine Coding Problem Format

Machine coding problems focus on system implementation and should be in `problems/machine-coding/<problem-name>/`.

### problem.md Template

```markdown
# LRU Cache

## Problem Statement

Design and implement a Least Recently Used (LRU) Cache with the following operations:

- `get(key)` - Return the value if key exists, otherwise return -1
- `put(key, value)` - Insert or update the value. Evict least recently used item if capacity exceeded.

Both operations must run in O(1) time complexity.

## Requirements

### Functional Requirements

1. Support `get` and `put` operations
2. Track access order for LRU eviction
3. Handle capacity limits
4. Thread-safe (bonus)

### Non-Functional Requirements

1. O(1) time for both operations
2. Memory efficient
3. Clean API design

## Interface

```python
class LRUCache:
    def __init__(self, capacity: int):
        pass

    def get(self, key: int) -> int:
        pass

    def put(self, key: int, value: int) -> None:
        pass
```

## Examples

```
cache = LRUCache(2)
cache.put(1, 1)      # cache: {1=1}
cache.put(2, 2)      # cache: {1=1, 2=2}
cache.get(1)         # returns 1, cache: {2=2, 1=1}
cache.put(3, 3)      # evicts key 2, cache: {1=1, 3=3}
cache.get(2)         # returns -1 (not found)
```

## Design Approach

### Data Structure Choice

Use HashMap + Doubly Linked List:
- HashMap: O(1) key lookup
- Doubly Linked List: O(1) insertion/deletion for LRU tracking

### Implementation Steps

1. Create Node class for doubly linked list
2. Maintain head (most recent) and tail (least recent) pointers
3. On get: move node to head
4. On put: add to head, evict tail if over capacity

## Edge Cases

- Get non-existent key
- Put when at capacity
- Update existing key
- Single capacity cache

## Follow-up Questions

1. How to make it thread-safe?
2. How to implement TTL (time-to-live)?
3. How to handle cache warming?

## Tags

`Design`, `Hash Map`, `Linked List`, `Cache`
```

---

## System Design Topic Format

System design topics should provide conceptual understanding with real-world examples.

### topic.md Template

```markdown
# Load Balancing

## TL;DR

Load balancing distributes incoming traffic across multiple servers to ensure no single server is overwhelmed, improving reliability and performance.

## What is Load Balancing?

A load balancer acts as a traffic cop, routing client requests to available servers based on configured algorithms, health checks, and server capacity.

## Types of Load Balancers

### Layer 4 (Transport Layer)

- Operates on TCP/UDP level
- Fast, doesn't inspect content
- Based on IP and port

### Layer 7 (Application Layer)

- Operates on HTTP level
- Can route based on URL, headers, cookies
- More flexible but higher overhead

## Load Balancing Algorithms

### Round Robin

Requests distributed sequentially across servers.

**Pros:** Simple, even distribution
**Cons:** Ignores server load

### Least Connections

Routes to server with fewest active connections.

**Pros:** Better for varying request durations
**Cons:** Requires connection tracking

### Weighted Round Robin

Servers assigned weights based on capacity.

**Pros:** Accounts for heterogeneous servers
**Cons:** Requires manual configuration

### Consistent Hashing

Routes based on hash of request attribute (e.g., user ID).

**Pros:** Session affinity, cache efficiency
**Cons:** Uneven distribution possible

## Real-World Examples

### Netflix

Uses multiple layers of load balancing:
- DNS-based global load balancing
- AWS ELB for regional distribution
- Custom Zuul gateway for microservices

### Uber

- Geographic load balancing for ride matching
- Consistent hashing for driver-rider pairing
- Circuit breakers for fault tolerance

## Trade-offs

| Aspect | Simple LB | Advanced LB |
|--------|-----------|-------------|
| Latency | Lower | Higher |
| Features | Basic | Rich |
| Cost | Lower | Higher |
| Complexity | Simple | Complex |

## When to Use

**Use Load Balancing When:**
- Traffic exceeds single server capacity
- High availability is required
- Geographic distribution needed

**Consider Alternatives When:**
- Single server sufficient
- Stateful connections required
- Cost is primary concern

## Common Interview Questions

1. How would you design a load balancer?
2. How to handle sticky sessions?
3. How to implement health checks?
4. How to handle load balancer failure?

## Related Topics

- [Auto Scaling](#)
- [Service Discovery](#)
- [Health Checks](#)
- [Circuit Breakers](#)

## Tags

`Infrastructure`, `Scalability`, `High Availability`, `Networking`
```

---

## Validation Rules

The GitHub Action validates the following rules:

### Required Sections for DS/Algo Problems

| Section | Required | Description |
|---------|----------|-------------|
| `# Title` | Yes | H1 heading as first line |
| `## Description` | Yes | Problem statement |
| `## Examples` | Yes | At least one example |
| `## Constraints` | Yes | Input constraints |
| `## Approach` | Yes | Solution explanation |
| `## Tags` | Yes | Categorization tags |

### Required Sections for Machine Coding

| Section | Required | Description |
|---------|----------|-------------|
| `# Title` | Yes | H1 heading as first line |
| `## Problem Statement` | Yes | What to build |
| `## Requirements` | Yes | Functional/non-functional |
| `## Interface` | Yes | API/class definition |
| `## Examples` | Yes | Usage examples |
| `## Tags` | Yes | Categorization tags |

### Required Sections for System Design

| Section | Required | Description |
|---------|----------|-------------|
| `# Title` | Yes | H1 heading as first line |
| `## TL;DR` | Yes | Brief summary |
| `## Tags` | Yes | Categorization tags |

### Code File Requirements

#### Python Files

- Must have a `main()` function
- `main()` must return a value
- Should include docstrings
- Should include type hints

#### Go Files

- Must have a `main()` function in `package main`
- Should include comments for exported functions
- Must be valid Go syntax

### Naming Conventions

- Directories: `kebab-case` (e.g., `two-sum`, `lru-cache`)
- Problem files: `problem.md`, `python_code.py`, `golang_code.go`
- No spaces in file or directory names

### File Structure

```
problems/
├── arrays/
│   ├── two-pointers/
│   │   └── two-sum/
│   │       ├── problem.md
│   │       ├── python_code.py
│   │       └── golang_code.go
│   └── sliding-window/
│       └── ...
├── machine-coding/
│   └── lru-cache/
│       ├── problem.md
│       ├── python_code.py
│       └── golang_code.go
└── system-design/
    └── load-balancing/
        └── topic.md
```

---

## Linting Commands

Run locally before pushing:

```bash
# Validate all markdown files
./scripts/validate-markdown.sh

# Check specific file
./scripts/validate-markdown.sh problems/arrays/two-pointers/two-sum/problem.md
```

## Contributing

1. Follow the templates above
2. Run validation locally
3. Ensure all required sections are present
4. Use proper formatting for code blocks
5. Include meaningful examples
