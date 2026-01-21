# How to Add New Problems and Visualizations

This guide explains how to add new problems to the 200 Must Solve Problems dashboard and create visualizations for them.

## Table of Contents

1. [Adding a New Problem](#adding-a-new-problem)
2. [Creating Visualizations](#creating-visualizations)
3. [Visualization Architecture](#visualization-architecture)
4. [Generic vs Custom Visualizations](#generic-vs-custom-visualizations)
5. [Testing Your Changes](#testing-your-changes)

---

## Adding a New Problem

### Step 1: Create the Problem Folder

Create a new folder in the appropriate category:

```
problems/200-must-solve/{category}/{XX-problem-name}/
```

Example:
```
problems/200-must-solve/arrays/20-new-problem/
```

### Step 2: Create problem.md

Create a `problem.md` file with the following structure:

```markdown
<div id="viz-config" style="display:none">
{"name":"Problem Name","algorithm":"algorithm-type","complexity":{"time":"O(n)","space":"O(1)"},"examples":[{"input":{"array":[1,2,3]},"output":true,"inputRaw":"array=[1,2,3]","outputRaw":"true"}]}
</div>

# Problem Name

**Difficulty:** Easy/Medium/Hard/Very Hard

## Problem Statement

[Description of the problem]

## Examples

**Example 1:**
```
Input: array = [1, 2, 3]
Output: true
```

## Constraints

- List constraints here

## Hints

<details>
<summary>Hint 1</summary>
First hint text
</details>

## Similar Problems (Harder)

### 1. Harder Variant Name
**Difficulty:** Medium

[Description]
```

### Step 3: Add Solution Files

Create solution files:
- `python_code.py` - Python solution
- `golang_code.go` - Go solution

### Step 4: Add Similar Problems

Create a `similar/` folder with harder variants:
```
similar/
├── 01-harder-variant/
│   ├── problem.md
│   ├── python_code.py
│   └── golang_code.go
├── 02-harder-variant/
└── 03-harder-variant/
```

---

## Creating Visualizations

### Visualization Config (viz-config)

The `viz-config` JSON in `problem.md` controls the visualization. Key fields:

| Field | Description | Example |
|-------|-------------|---------|
| `name` | Problem display name | `"Two Number Sum"` |
| `algorithm` | Algorithm type for visualization handler | `"hash-table-two-sum"` |
| `complexity.time` | Time complexity | `"O(n)"` |
| `complexity.space` | Space complexity | `"O(1)"` |
| `examples` | Array of test examples | See below |

### Example Structure

```json
{
  "input": {
    "array": [1, 2, 3, 4],
    "target": 5
  },
  "output": [1, 4],
  "inputRaw": "array=[1,2,3,4], target=5",
  "outputRaw": "[1, 4]"
}
```

---

## Visualization Architecture

### File Structure

```
frontend/static/js/
├── viz-utils.js           # Core utility functions
├── viz/
│   ├── arrays_viz.js      # Array algorithm visualizations
│   ├── graphs_viz.js      # Graph algorithm visualizations
│   ├── linked_lists_viz.js # Linked list visualizations
│   ├── trees_viz.js       # Binary tree visualizations
│   ├── bst_viz.js         # BST visualizations
│   ├── recursion_viz.js   # Recursion visualizations
│   ├── dp_viz.js          # Dynamic programming visualizations
│   ├── famous_viz.js      # Famous algorithm visualizations
│   └── viz-index.js       # Visualization index
```

### Registering a New Visualization

1. **Choose the appropriate viz file** based on the category
2. **Create a handler function** that generates visualization steps
3. **Register the handler** with VizUtils

Example:

```javascript
// In arrays_viz.js

function runMyNewAlgorithm(example, config, complexity) {
    const steps = [];
    const arr = example.input.array;

    // Step 1: Introduction
    steps.push({
        vizType: 'array',
        array: arr.slice(),
        status: 'Initialize',
        explanation: '<strong>' + config.name + '</strong><br>' +
            '<strong>Input:</strong> [' + arr.join(', ') + ']<br>' +
            '<strong>Complexity:</strong> Time: ' + complexity.time
    });

    // Step 2: Processing steps
    for (let i = 0; i < arr.length; i++) {
        steps.push({
            vizType: 'array',
            array: arr.slice(),
            currentIndex: i,
            status: 'Processing index ' + i,
            explanation: 'Processing element ' + arr[i]
        });
    }

    // Step 3: Result
    steps.push({
        vizType: 'array',
        array: arr,
        status: 'Complete!',
        explanation: '<strong>Result:</strong> ' + JSON.stringify(example.output)
    });

    return steps;
}

// Register the visualization
window.VizUtils.register('my-new-algorithm', runMyNewAlgorithm);
```

### Available vizType Values

| vizType | Description | Required Fields |
|---------|-------------|-----------------|
| `array` | Single array | `array` |
| `array-hash` | Array with hash table | `array`, `hashTable` |
| `two-arrays` | Two arrays comparison | `arr1` or `array`, `sequence` |
| `two-pointer` | Two pointer technique | `array`, `left`, `right` |
| `two-pointer-result` | Two pointers with result | `array`, `result`, `left`, `right` |
| `three-pointer` | Three pointers (for 3-sum) | `array`, `i`, `left`, `right` |
| `hash-table` | Hash table operations | `scores` or `hashTable` |
| `intervals` | Interval merging | `intervals`, `merged` |
| `linked-list` | Linked list nodes | `nodes` |
| `tree` | Binary tree | `nodes`, `edges` |
| `graph` | Graph structure | `nodes`, `edges`, `visited` |
| `matrix` | 2D grid/matrix | `matrix` |
| `spiral-matrix` | Spiral traversal | `matrix`, `result` |
| `dp-table` | DP table | `dp` or `table` |
| `recursion-tree` | Recursion call tree | `callStack` |

---

## Generic vs Custom Visualizations

### Using Generic Visualization

If no specific handler is registered for an algorithm type, the system falls back to `runGenericVisualization()` which shows:

1. Problem info and complexity
2. Input display
3. Processing indicator
4. Output display

This is useful for quick setup but provides minimal animation.

### Creating Custom Visualization

Custom visualizations provide:
- Step-by-step algorithm execution
- Visual highlights on data structures
- Pointer/index tracking
- Detailed explanations per step

**When to create custom:**
- Algorithm has clear visual steps
- Students benefit from seeing data transformations
- The algorithm is commonly taught

**When to use generic:**
- Algorithm is conceptually simple
- Visualization adds little value
- Quick prototype needed

---

## Testing Your Changes

### 1. Start the Development Server

```bash
cd /home/user/learning-algo
go run main.go
```

### 2. Access the Dashboard

Navigate to `http://localhost:8080/200-problems`

### 3. Check the Index

Click the "Index" button to see all registered visualizations and verify your new algorithm appears.

### 4. Test the Visualization

1. Select your problem category
2. Click on your new problem
3. Go to the "Visualize" tab
4. Test with different examples
5. Verify step-by-step animation works correctly

### 5. Browser Console

Check for errors in the browser console (F12 > Console):
- Missing required fields
- Invalid vizType
- Handler registration errors

---

## Checklist for New Problems

- [ ] Created problem folder with correct naming
- [ ] Created `problem.md` with viz-config
- [ ] Added Python solution
- [ ] Added Go solution
- [ ] Added 3 similar harder problems
- [ ] Registered visualization handler (if custom)
- [ ] Updated viz-index.js with new algorithm type
- [ ] Tested visualization in browser
- [ ] Verified all examples work correctly

---

## Common Issues

### Visualization Not Showing

1. Check that `viz-config` JSON is valid
2. Verify `algorithm` field matches registered handler
3. Check browser console for errors

### Steps Not Generating

1. Ensure `example.input` has all required fields
2. Check that handler returns an array of steps
3. Verify step objects have `vizType`, `status`, `explanation`

### Styling Issues

1. Check that vizType is supported
2. Verify CSS classes exist in 200-problems.css
3. Test in different browsers

---

## Need Help?

- Check existing visualizations in `frontend/static/js/viz/` for examples
- Review the `VizUtils` API in `frontend/static/js/viz-utils.js`
- Look at similar algorithms for patterns to follow
