# Custom Diagram Engine Documentation

## Overview

The learning platform uses a custom HTML5 SVG + JavaScript diagram engine instead of external libraries like Mermaid. This provides full control over appearance, animations, and interactivity while keeping the bundle size minimal.

## Quick Start

### Basic Usage Pattern

```javascript
// Create a diagram
const diagram = new DiagramType('container-id', configObject);

// Register it with the engine
diagramEngine.register('container-id', diagram);

// Render it
diagram.render();
```

### HTML Container

```html
<div id="my-diagram" class="diagram-container light"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const diagram = new StateMachineDiagram('my-diagram', {
        // config...
    });
    diagramEngine.register('my-diagram', diagram);
    diagram.render();
});
</script>
```

## Diagram Types

### 1. StateMachineDiagram
Shows states connected by transitions with descriptions.

**Use Cases:** State patterns, circuit breakers, elevator systems, traffic lights

**Config:**
```javascript
{
    width: 700,          // SVG width
    height: 350,         // SVG height
    nodeRadius: 45,      // State circle radius
    states: [
        {
            id: 'IDLE',
            initial: true,           // highlight as starting state
            highlighted: false,      // highlight as problem/error
            description: 'Waiting'   // show below state
        },
        { id: 'RUNNING', initial: false, highlighted: false }
    ],
    transitions: [
        { from: 'IDLE', to: 'RUNNING', label: 'Start' },
        { from: 'RUNNING', to: 'IDLE', label: 'Stop' }
    ]
}
```

### 2. FlowchartDiagram
Process flows with different node types (process, decision, terminal).

**Use Cases:** Algorithms, decision trees, processes, workflows

**Config:**
```javascript
{
    width: 600,
    height: 400,
    nodeWidth: 120,
    nodeHeight: 60,
    spacing: 100,
    nodes: [
        {
            id: 'start',
            label: 'Begin',
            type: 'terminal'      // 'terminal', 'process', 'decision'
        },
        {
            id: 'check',
            label: 'Check\nCondition?',
            type: 'decision',
            highlighted: true     // show error/emphasis
        },
        { id: 'end', label: 'End', type: 'terminal' }
    ],
    edges: [
        { from: 'start', to: 'check', label: '' },
        { from: 'check', to: 'end', label: 'Yes' }
    ]
}
```

### 3. GraphDiagram
Nodes and edges for DAGs, dependencies, and graphs.

**Use Cases:** Dependency graphs, prerequisite chains, system architectures

**Config:**
```javascript
{
    width: 800,
    height: 400,
    nodeRadius: 35,
    nodes: [
        { id: '0', label: 'Course 0', type: 'default' },
        { id: '1', label: 'Course 1', type: 'default' },
        { id: '2', label: 'Cycle', type: 'default', cycle: true }
    ],
    edges: [
        { from: '0', to: '1', label: 'prerequisite' },
        { from: '1', to: '2', label: 'prerequisite', cycle: true }
    ]
}
```

**Node Types:**
- `default`: Blue (normal nodes)
- `start`: Green (start/initial nodes)
- `end`: Red (end nodes)
- Add `cycle: true` to nodes involved in cycles (shows red pulse animation)

### 4. TreeDiagram
Hierarchical tree structures with parent-child relationships.

**Use Cases:** File systems, class hierarchies, organizational structures, component composition

**Config:**
```javascript
{
    width: 800,
    height: 500,
    nodeRadius: 25,
    verticalSpacing: 80,
    root: {
        id: 'root',
        label: 'Parent',
        type: 'root',
        children: [
            {
                id: 'child1',
                label: 'Child 1',
                type: 'default',
                children: []
            },
            {
                id: 'child2',
                label: 'Child 2',
                type: 'leaf',
                children: []
            }
        ]
    }
}
```

### 5. ArchitectureDiagram
Layered system components showing architecture.

**Use Cases:** Microservices, system layers, component hierarchies

**Config:**
```javascript
{
    width: 900,
    height: 500,
    componentWidth: 120,
    componentHeight: 80,
    layers: [
        {
            name: 'Frontend',
            color: '#e3f2fd',
            components: [
                { name: 'Web Client', type: 'default' },
                { name: 'Mobile App', type: 'default' }
            ]
        },
        {
            name: 'Backend',
            color: '#f3e5f5',
            components: [
                { name: 'API Server', type: 'service' },
                { name: 'Database', type: 'database' }
            ]
        }
    ]
}
```

**Component Types:**
- `default`: Blue
- `service`: Green
- `database`: Orange
- `message-broker`: Pink

## Styling

All diagrams use classes defined in `/frontend/static/css/diagrams.css`.

### CSS Classes

- `.diagram-container` - Main wrapper (add `light` or `dark` classes)
- `.state-node`, `.flow-node`, `.graph-node`, etc. - Individual diagram elements
- `.highlighted` - For emphasized states/errors (red pulse animation)

### Container Variants

```html
<!-- Light theme (default) -->
<div class="diagram-container light"></div>

<!-- Dark theme -->
<div class="diagram-container dark"></div>
```

## Colors and Styling

### Default Color Scheme

| Use | Color | Hex |
|-----|-------|-----|
| Default/Normal | Blue | #bbdefb |
| Start/Initial | Green | #c8e6c9 |
| Error/Emphasized | Red | #ffcccc |
| Decision | Yellow | #fff9c4 |
| Background | Light Gray | #f5f7fa |

### Hover Effects

- Nodes brighten and get drop shadows
- Transitions highlight on hover
- Smooth transitions (0.3s) for all interactions

### Animations

- `pulse-state`: Pulse animation for emphasized states
- `pulse-node`: Pulse animation for decision nodes
- `pulse-cycle`: Special pulse for nodes in cycles
- `fade-in`: On diagram container load

## Examples from Codebase

### State Pattern
```javascript
const diagram = new StateMachineDiagram('state-pattern-diagram', {
    width: 700,
    height: 350,
    nodeRadius: 45,
    states: [
        { id: 'Context', initial: true, description: 'holds state' },
        { id: 'State', description: 'interface' },
        { id: 'StateA', description: 'concrete' },
        { id: 'StateB', description: 'concrete' }
    ],
    transitions: [
        { from: 'Context', to: 'State', label: 'uses' },
        { from: 'State', to: 'StateA', label: 'implements' },
        { from: 'State', to: 'StateB', label: 'implements' }
    ]
});
```

### Circuit Breaker
```javascript
const diagram = new StateMachineDiagram('circuit-breaker-states', {
    width: 750,
    height: 400,
    nodeRadius: 50,
    states: [
        {
            id: 'CLOSED',
            initial: true,
            description: 'All requests pass\nFailures counted'
        },
        {
            id: 'OPEN',
            highlighted: false,
            description: 'All requests fail\nFail fast'
        },
        {
            id: 'HALF-OPEN',
            description: 'Testing recovery\nProbing'
        }
    ],
    transitions: [
        { from: 'CLOSED', to: 'OPEN', label: 'Failure threshold' },
        { from: 'OPEN', to: 'HALF-OPEN', label: 'Timeout expires' },
        { from: 'HALF-OPEN', to: 'CLOSED', label: 'Probe success' }
    ]
});
```

## Converting from Mermaid

When you see a comment like:
```html
<!-- Custom diagram: replace with HTML+JS implementation using diagramEngine -->
```

1. Identify the diagram type (flowchart, state machine, graph, etc.)
2. Choose the appropriate DiagramEngine class
3. Extract the information from the original Mermaid code
4. Create a diagram container with unique ID
5. Add JavaScript to create and render the diagram

## Best Practices

1. **Use Descriptive IDs**: Use meaningful container IDs like `circuit-breaker-states` instead of `diagram1`

2. **Add Descriptions**: Use the `description` field in state machines to explain what each state means

3. **Highlight Errors**: Use `highlighted: true` to emphasize error states or problematic paths

4. **Label Transitions**: Always provide meaningful transition labels

5. **Responsive Sizes**: Test diagrams at different screen sizes

6. **Keep It Simple**: Use appropriate diagram types - don't force complex data into wrong diagram types

7. **Load on DOMContentLoaded**: Always wrap diagram creation in `document.addEventListener('DOMContentLoaded', ...)`

## File Structure

```
frontend/
├── static/
│   ├── js/
│   │   ├── diagrams.js          # Diagram engine and classes
│   │   └── visualizations.js    # Algorithm visualizations
│   └── css/
│       └── diagrams.css          # All diagram styling
└── templates/
    └── layouts/
        └── main.html            # Loads diagrams.js
```

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

Uses standard HTML5 SVG with no polyfills needed.

## Performance

- No external library loading delays
- Smooth 60fps animations using CSS transitions
- Lazy rendering - diagrams only render when visible
- Minimal bundle size (~20KB minified)

## Extending

To create a new diagram type:

```javascript
class MyCustomDiagram {
    constructor(containerId, config = {}) {
        this.container = document.getElementById(containerId);
        this.config = config;
        this.rendered = false;
    }

    render() {
        const svg = DiagramEngine.createSVG('svg', {
            viewBox: `0 0 ${this.config.width} ${this.config.height}`,
            class: 'my-custom-diagram'
        });

        // Add your SVG elements
        this.container.appendChild(svg);
    }
}

// Register it
const diagram = new MyCustomDiagram('id', config);
diagramEngine.register('id', diagram);
diagram.render();
```

## Troubleshooting

**Diagram not appearing:**
- Check browser console for JavaScript errors
- Verify container ID matches in HTML and JavaScript
- Ensure `diagramEngine.render()` is called after creation

**Styling not applied:**
- Check that `diagrams.css` is loaded in main.html
- Verify CSS class names match
- Check for CSS conflicts with other stylesheets

**Animations not smooth:**
- Check browser hardware acceleration is enabled
- Ensure no JavaScript blocking during animation
- Check for conflicting CSS animations

## Support

For issues or questions about the diagram engine, see the implementation in:
- `/frontend/static/js/diagrams.js`
- `/frontend/static/css/diagrams.css`
