# Contributing to DSAlgo Learning Platform

Thank you for your interest in contributing! This guide will help you get started with contributing problems, topics, or code improvements.

## 👋 Quick Start

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/learning-algo.git`
3. **Create** a branch: `git checkout -b feature/your-feature-name`
4. **Make** your changes
5. **Test** your changes
6. **Commit** with clear messages
7. **Push** to your fork
8. **Create** a Pull Request

## 📝 Types of Contributions

### 1. Adding DSA Problems

We welcome new Data Structures and Algorithms problems! Here's how to add one:

#### Step 1: Choose the Right Category

Place your problem in the appropriate directory:

```
problems/
├── arrays/              # Array manipulation, sliding window
├── strings/             # String processing, pattern matching
├── linked-lists/        # Linked list operations
├── trees/               # Binary trees, BST, tries
├── graphs/              # Graph algorithms
├── dynamic-programming/ # DP problems
├── heaps/               # Heap and priority queue
├── sorting/             # Sorting algorithms
├── searching/           # Search algorithms
├── stacks/              # Stack problems
├── queues/              # Queue problems
├── hash-tables/         # Hashing problems
└── backtracking/        # Backtracking problems
```

#### Step 2: Create the Problem File

Create a markdown file with a descriptive name (use kebab-case):

```bash
problems/arrays/two-sum.md
problems/graphs/shortest-path-dijkstra.md
```

#### Step 3: Follow the Problem Template

```markdown
# Problem Title

## Description

Write a clear, concise description of the problem. Include:
- What the input represents
- What the expected output should be
- Any special rules or edge cases

## Constraints

- List all input constraints (e.g., array size limits)
- Mention any assumptions
- Expected time/space complexity if applicable

Example:
- `1 <= n <= 10^5`
- All elements are positive integers
- Array is not sorted

## Examples

### Example 1

**Input**: `nums = [2, 7, 11, 15], target = 9`

**Output**: `[0, 1]`

**Explanation**: Because `nums[0] + nums[1] == 9`, we return `[0, 1]`.

### Example 2

**Input**: `nums = [3, 2, 4], target = 6`

**Output**: `[1, 2]`

### Example 3 (Edge Case)

**Input**: `nums = [3, 3], target = 6`

**Output**: `[0, 1]`

## Approach

### Intuition

Explain the core idea behind the solution in simple terms.

### Algorithm

1. Step-by-step explanation of the approach
2. Use numbered lists for clarity
3. Mention key data structures or techniques used

### Why This Works

Explain why this approach solves the problem correctly.

## Complexity Analysis

- **Time Complexity**: O(n) - One pass through the array
- **Space Complexity**: O(n) - Hash map to store visited elements

## Code

### Python

```python
def main():
    nums = [2, 7, 11, 15]
    target = 9
    result = two_sum(nums, target)
    return result

def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
```

### Go

```go
package main

import "fmt"

func main() {
    nums := []int{2, 7, 11, 15}
    target := 9
    result := twoSum(nums, target)
    fmt.Println(result)
}

func twoSum(nums []int, target int) []int {
    seen := make(map[int]int)
    for i, num := range nums {
        complement := target - num
        if j, found := seen[complement]; found {
            return []int{j, i}
        }
        seen[num] = i
    }
    return []int{}
}
```

## Related Problems

- [Three Sum](three-sum.md) - Similar approach with triplets
- [Four Sum](four-sum.md) - Extension to quadruplets

## Tags

`hash-table` `array` `two-pointers`
```

#### Step 4: Validate Your Problem

```bash
# Run the validation script
./scripts/validate-markdown.sh

# Fix any errors reported
```

#### Step 5: Test the Code

Make sure your code examples:
- Follow the platform's execution requirements
- Actually work when run
- Handle edge cases
- Are well-commented

### 2. Adding Learning Topics

#### System Design Topics

Add to `topics/system-design/`:

```markdown
# Topic Title (e.g., Load Balancing)

## Overview

Brief introduction to the topic (2-3 sentences).

## What is [Topic]?

Detailed explanation of the concept.

## Key Components

### Component 1

Explanation with diagrams if needed.

### Component 2

More details.

## How It Works

Step-by-step explanation with diagrams:

```
[Client] --> [Load Balancer] --> [Server 1]
                              --> [Server 2]
                              --> [Server 3]
```

## Types/Variants

### Type 1: [Name]

- Description
- Use cases
- Pros and cons

### Type 2: [Name]

- Description
- Use cases
- Pros and cons

## Real-World Examples

- **Netflix**: Uses [solution] for [purpose]
- **Amazon**: Implements [approach] to handle [challenge]

## Implementation Considerations

### When to Use

- Scenario 1
- Scenario 2

### When Not to Use

- Scenario 1
- Scenario 2

## Best Practices

1. Practice 1 with explanation
2. Practice 2 with explanation
3. Practice 3 with explanation

## Common Pitfalls

### Pitfall 1

**Problem**: Description

**Solution**: How to avoid it

### Pitfall 2

**Problem**: Description

**Solution**: How to avoid it

## Trade-offs

| Aspect | Option A | Option B |
|--------|----------|----------|
| Performance | High | Medium |
| Complexity | High | Low |
| Cost | High | Low |

## Interview Questions

1. Question about the topic
2. Follow-up question
3. Design question

## Further Reading

- [Resource 1](link)
- [Resource 2](link)
```

#### Design Patterns

Add to `topics/design-patterns/`:

```markdown
# Pattern Name

## Intent

What problem does this pattern solve?

## Motivation

Why do we need this pattern? Real-world scenario.

## Structure

UML diagram or description of components.

## Participants

- **Class/Interface 1**: Responsibility
- **Class/Interface 2**: Responsibility

## Implementation

### Python

```python
# Full working example
```

### Go

```go
// Full working example
```

## When to Use

- Use case 1
- Use case 2

## When Not to Use

- Scenario 1
- Scenario 2

## Real Examples

- Framework/Library that uses this pattern
- Explanation of how it's used

## Related Patterns

- Pattern 1 (how it relates)
- Pattern 2 (differences)
```

### 3. Adding Database Tutorials

#### SQL Topics

Add to `topics/sql-learning/`:

```markdown
# SQL Topic Title

## Introduction

What concept are we learning?

## Syntax

```sql
-- Basic syntax example
```

## Examples

### Example 1: Basic Usage

```sql
SELECT * FROM users WHERE age > 18;
```

**Result**:
```
id | name    | age
---+---------+----
1  | Alice   | 25
2  | Bob     | 30
```

### Example 2: Advanced Usage

```sql
-- More complex example
```

## Performance Considerations

- Tip 1
- Tip 2
- Indexing strategies

## Common Mistakes

- Mistake 1 and how to avoid it
- Mistake 2 and solution

## Practice Problems

1. Problem statement
2. Expected solution
```

### 4. Code Contributions

#### Backend (Go)

Follow these guidelines:

```go
// Good: Clear function with documentation
// ExecuteQuery runs a SQL query and returns results
// It validates the query, executes it safely, and formats the output
func (h *SQLHandlers) ExecuteQuery(c *fiber.Ctx) error {
    var req QueryRequest
    if err := c.BodyParser(&req); err != nil {
        return fiber.NewError(fiber.StatusBadRequest, "invalid request")
    }
    
    // Validate input
    if req.Query == "" {
        return fiber.NewError(fiber.StatusBadRequest, "query cannot be empty")
    }
    
    // Execute and return
    result, err := h.db.Execute(req.Query)
    if err != nil {
        return fiber.NewError(fiber.StatusInternalServerError, err.Error())
    }
    
    return c.JSON(result)
}
```

**Code Style**:
- Use `gofmt` to format code
- Write meaningful variable names
- Add comments for complex logic
- Handle errors explicitly
- Write unit tests for new functions

#### Frontend (HTMX/Templates)

```html
<!-- Good: Semantic HTML with clear HTMX attributes -->
<button 
    hx-post="/api/sql/execute" 
    hx-target="#results"
    hx-indicator="#spinner"
    class="btn btn-primary">
    Execute Query
</button>

<div id="results" class="mt-4">
    <!-- Results will appear here -->
</div>

<div id="spinner" class="htmx-indicator">
    <span>Loading...</span>
</div>
```

**Template Guidelines**:
- Use semantic HTML5 elements
- Keep templates focused (one purpose per template)
- Use HTMX attributes for interactivity
- Follow accessibility best practices
- Add loading indicators

## ✅ Validation Checklist

Before submitting a PR:

### Content Contributions

- [ ] Follows the correct markdown format
- [ ] Passes `./scripts/validate-markdown.sh`
- [ ] No spelling/grammar errors
- [ ] Code examples are tested and working
- [ ] All required sections are present
- [ ] Examples are clear and helpful
- [ ] Complexity analysis is accurate

### Code Contributions

- [ ] Code follows project style guidelines
- [ ] All tests pass: `go test ./...`
- [ ] New features have tests
- [ ] Code is documented
- [ ] No unnecessary dependencies added
- [ ] Error handling is proper
- [ ] Commits are clear and atomic

## 📦 Pull Request Process

### 1. Create a Descriptive PR

**Good PR Title**:
```
feat: add sliding window problems category
fix: correct time complexity in binary search
docs: improve SQL indexing tutorial
```

**PR Description Template**:
```markdown
## Description

Brief description of changes.

## Type of Change

- [ ] New problem
- [ ] New topic/tutorial
- [ ] Bug fix
- [ ] Feature enhancement
- [ ] Documentation update

## Changes Made

- Added X problems in Y category
- Fixed Z issue
- Improved W documentation

## Testing

- [ ] Ran validation script
- [ ] Tested code examples
- [ ] Checked on local server

## Screenshots (if applicable)

Add screenshots for UI changes.
```

### 2. Respond to Review Comments

- Address all feedback
- Make requested changes promptly
- Explain your reasoning if you disagree
- Be respectful and collaborative

### 3. Merge Requirements

- All CI checks must pass
- At least one approving review
- No merge conflicts
- Validation script passes

## 🐛 Reporting Issues

### Bug Reports

Include:
1. **Description**: What's wrong?
2. **Steps to Reproduce**: How to trigger the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, browser, Docker version
6. **Screenshots**: If applicable

### Feature Requests

Include:
1. **Problem**: What problem does this solve?
2. **Solution**: Your proposed solution
3. **Alternatives**: Other solutions considered
4. **Benefits**: Why this would be valuable

## 📚 Style Guides

### Commit Messages

Follow conventional commits:

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semi colons, etc.
refactor: code restructuring
test: adding tests
chore: updating build tasks, package manager configs, etc.
```

### Markdown

- Use proper heading hierarchy (don't skip levels)
- Add blank lines between sections
- Use code blocks with language specifiers
- Format tables properly
- Use relative links for internal references

### Code Comments

```go
// Good: Explains WHY, not WHAT
// Use a hash map to achieve O(1) lookup time instead of nested loops
seenMap := make(map[int]bool)

// Bad: States the obvious
// Create a map
seenMap := make(map[int]bool)
```

## 🎓 Learning Resources

To contribute quality content, check out:

- [LeetCode](https://leetcode.com/) - Problem ideas
- [System Design Primer](https://github.com/donnemartin/system-design-primer) - System design topics
- [Refactoring Guru](https://refactoring.guru/) - Design patterns
- [Use The Index, Luke!](https://use-the-index-luke.com/) - SQL indexing

## ❓ Getting Help

- **Questions**: Open a [GitHub Discussion](https://github.com/vaibhav-jain-dev/learning-algo/discussions)
- **Bugs**: Open a [GitHub Issue](https://github.com/vaibhav-jain-dev/learning-algo/issues)
- **Chat**: Comment on related issues/PRs

## 🎉 Recognition

Contributors are acknowledged in:
- PR merge messages
- Release notes
- README contributors section (coming soon)

Thank you for contributing to making this platform better! 🚀
