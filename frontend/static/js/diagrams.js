/**
 * Custom Diagram Library - HTML + JavaScript Visualizations
 * Beautiful, animated diagrams for learning concepts
 */

// Prevent duplicate declarations on HTMX navigation
if (typeof DiagramEngine === 'undefined') {

class DiagramEngine {
    constructor() {
        this.diagrams = new Map();
        this.animationFrameId = null;
    }

    register(id, diagramInstance) {
        this.diagrams.set(id, diagramInstance);
    }

    renderAll() {
        this.diagrams.forEach((diagram, id) => {
            if (diagram.render && !diagram.rendered) {
                diagram.render();
                diagram.rendered = true;
            }
        });
    }

    static createSVG(tag, attrs = {}) {
        const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
        Object.entries(attrs).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        return element;
    }

    static createEl(tag, attrs = {}, classes = []) {
        const element = document.createElement(tag);
        Object.entries(attrs).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        element.classList.add(...classes);
        return element;
    }
}

/**
 * State Machine Diagram
 * Visualizes states and transitions
 */
class StateMachineDiagram {
    constructor(containerId, config = {}) {
        this.container = document.getElementById(containerId);
        this.config = {
            width: 800,
            height: 300,
            nodeRadius: 40,
            ...config
        };
        this.rendered = false;
    }

    render() {
        const svg = DiagramEngine.createSVG('svg', {
            viewBox: `0 0 ${this.config.width} ${this.config.height}`,
            class: 'state-machine-diagram',
            preserveAspectRatio: 'xMidYMid meet'
        });

        const defs = DiagramEngine.createSVG('defs');
        const arrowMarker = DiagramEngine.createSVG('marker', {
            id: 'arrowhead',
            markerWidth: '10',
            markerHeight: '10',
            refX: '9',
            refY: '3',
            orient: 'auto'
        });
        arrowMarker.appendChild(DiagramEngine.createSVG('polygon', {
            points: '0 0, 10 3, 0 6',
            fill: '#2563eb'
        }));
        defs.appendChild(arrowMarker);
        svg.appendChild(defs);

        // Draw states based on config
        const states = this.config.states || [];
        const transitions = this.config.transitions || [];
        const nodeRadius = this.config.nodeRadius;

        // Calculate positions
        const positions = {};
        states.forEach((state, i) => {
            const angle = (i / states.length) * Math.PI * 2;
            const centerX = this.config.width / 2;
            const centerY = this.config.height / 2;
            const radius = 100;
            positions[state.id] = {
                x: centerX + radius * Math.cos(angle),
                y: centerY + radius * Math.sin(angle)
            };
        });

        // Draw transitions first (so they appear behind states)
        transitions.forEach(trans => {
            const from = positions[trans.from];
            const to = positions[trans.to];
            const line = DiagramEngine.createSVG('line', {
                x1: from.x,
                y1: from.y,
                x2: to.x,
                y2: to.y,
                class: 'transition-line',
                'marker-end': 'url(#arrowhead)'
            });
            svg.appendChild(line);

            // Add label
            if (trans.label) {
                const midX = (from.x + to.x) / 2;
                const midY = (from.y + to.y) / 2;
                const text = DiagramEngine.createSVG('text', {
                    x: midX,
                    y: midY,
                    class: 'transition-label',
                    'text-anchor': 'middle'
                });
                text.textContent = trans.label;
                svg.appendChild(text);
            }
        });

        // Draw states
        states.forEach(state => {
            const pos = positions[state.id];
            const isInitial = state.initial;
            const isHighlighted = state.highlighted;

            // Draw circle
            const circle = DiagramEngine.createSVG('circle', {
                cx: pos.x,
                cy: pos.y,
                r: nodeRadius,
                class: `state-node ${isInitial ? 'initial' : ''} ${isHighlighted ? 'highlighted' : ''}`
            });
            svg.appendChild(circle);

            // Draw text
            const text = DiagramEngine.createSVG('text', {
                x: pos.x,
                y: pos.y,
                class: 'state-label',
                'text-anchor': 'middle',
                'dominant-baseline': 'middle'
            });
            text.textContent = state.id;
            svg.appendChild(text);

            // Draw description below if present
            if (state.description) {
                const desc = DiagramEngine.createSVG('text', {
                    x: pos.x,
                    y: pos.y + nodeRadius + 25,
                    class: 'state-description',
                    'text-anchor': 'middle'
                });
                desc.textContent = state.description;
                svg.appendChild(desc);
            }
        });

        this.container.appendChild(svg);
    }
}

/**
 * Flowchart Diagram
 * Visualizes processes and decision flows
 */
class FlowchartDiagram {
    constructor(containerId, config = {}) {
        this.container = document.getElementById(containerId);
        this.config = {
            width: 600,
            height: 400,
            nodeWidth: 120,
            nodeHeight: 60,
            spacing: 100,
            ...config
        };
        this.rendered = false;
    }

    render() {
        const svg = DiagramEngine.createSVG('svg', {
            viewBox: `0 0 ${this.config.width} ${this.config.height}`,
            class: 'flowchart-diagram',
            preserveAspectRatio: 'xMidYMid meet'
        });

        const defs = DiagramEngine.createSVG('defs');
        const arrowMarker = DiagramEngine.createSVG('marker', {
            id: 'flowArrow',
            markerWidth: '10',
            markerHeight: '10',
            refX: '9',
            refY: '3',
            orient: 'auto'
        });
        arrowMarker.appendChild(DiagramEngine.createSVG('polygon', {
            points: '0 0, 10 3, 0 6',
            fill: '#2563eb'
        }));
        defs.appendChild(arrowMarker);
        svg.appendChild(defs);

        const nodes = this.config.nodes || [];
        const edges = this.config.edges || [];

        // Calculate positions
        const positions = {};
        nodes.forEach((node, i) => {
            positions[node.id] = {
                x: this.config.width / 2,
                y: 50 + i * this.config.spacing
            };
        });

        // Draw edges
        edges.forEach(edge => {
            const from = positions[edge.from];
            const to = positions[edge.to];

            const line = DiagramEngine.createSVG('line', {
                x1: from.x,
                y1: from.y + this.config.nodeHeight / 2,
                x2: to.x,
                y2: to.y - this.config.nodeHeight / 2,
                class: 'flow-edge',
                'marker-end': 'url(#flowArrow)'
            });
            svg.appendChild(line);

            if (edge.label) {
                const midY = (from.y + to.y) / 2;
                const text = DiagramEngine.createSVG('text', {
                    x: from.x + 20,
                    y: midY,
                    class: 'edge-label'
                });
                text.textContent = edge.label;
                svg.appendChild(text);
            }
        });

        // Draw nodes
        nodes.forEach(node => {
            const pos = positions[node.id];
            const type = node.type || 'process'; // process, decision, terminal

            if (type === 'decision') {
                // Diamond shape for decisions
                const points = `${pos.x},${pos.y - 40} ${pos.x + 50},${pos.y} ${pos.x},${pos.y + 40} ${pos.x - 50},${pos.y}`;
                const polygon = DiagramEngine.createSVG('polygon', {
                    points,
                    class: `flow-node decision ${node.highlighted ? 'highlighted' : ''}`
                });
                svg.appendChild(polygon);
            } else if (type === 'terminal') {
                // Rounded rectangle for terminal
                const rect = DiagramEngine.createSVG('rect', {
                    x: pos.x - this.config.nodeWidth / 2,
                    y: pos.y - this.config.nodeHeight / 2,
                    width: this.config.nodeWidth,
                    height: this.config.nodeHeight,
                    rx: this.config.nodeHeight / 2,
                    class: `flow-node terminal ${node.highlighted ? 'highlighted' : ''}`
                });
                svg.appendChild(rect);
            } else {
                // Rectangle for process
                const rect = DiagramEngine.createSVG('rect', {
                    x: pos.x - this.config.nodeWidth / 2,
                    y: pos.y - this.config.nodeHeight / 2,
                    width: this.config.nodeWidth,
                    height: this.config.nodeHeight,
                    class: `flow-node process ${node.highlighted ? 'highlighted' : ''}`
                });
                svg.appendChild(rect);
            }

            // Add text
            const text = DiagramEngine.createSVG('text', {
                x: pos.x,
                y: pos.y,
                class: 'node-label',
                'text-anchor': 'middle',
                'dominant-baseline': 'middle'
            });
            text.textContent = node.label;
            svg.appendChild(text);
        });

        this.container.appendChild(svg);
    }
}

/**
 * Graph Diagram
 * Visualizes nodes and edges (useful for DAGs, dependencies)
 */
class GraphDiagram {
    constructor(containerId, config = {}) {
        this.container = document.getElementById(containerId);
        this.config = {
            width: 800,
            height: 400,
            nodeRadius: 35,
            ...config
        };
        this.rendered = false;
    }

    render() {
        const svg = DiagramEngine.createSVG('svg', {
            viewBox: `0 0 ${this.config.width} ${this.config.height}`,
            class: 'graph-diagram',
            preserveAspectRatio: 'xMidYMid meet'
        });

        const defs = DiagramEngine.createSVG('defs');
        const arrowMarker = DiagramEngine.createSVG('marker', {
            id: 'graphArrow',
            markerWidth: '10',
            markerHeight: '10',
            refX: '9',
            refY: '3',
            orient: 'auto'
        });
        arrowMarker.appendChild(DiagramEngine.createSVG('polygon', {
            points: '0 0, 10 3, 0 6',
            fill: '#2563eb'
        }));
        defs.appendChild(arrowMarker);
        svg.appendChild(defs);

        const nodes = this.config.nodes || [];
        const edges = this.config.edges || [];

        // Calculate positions using simple force-directed layout
        const positions = this.calculatePositions(nodes, edges);

        // Draw edges
        edges.forEach(edge => {
            const from = positions[edge.from];
            const to = positions[edge.to];

            // Calculate arrow direction
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const ratio = (dist - this.config.nodeRadius * 2) / dist;

            const startX = from.x + dx * (1 - ratio) / 2;
            const startY = from.y + dy * (1 - ratio) / 2;
            const endX = to.x - dx * (1 - ratio) / 2;
            const endY = to.y - dy * (1 - ratio) / 2;

            const line = DiagramEngine.createSVG('line', {
                x1: startX,
                y1: startY,
                x2: endX,
                y2: endY,
                class: `graph-edge ${edge.cycle ? 'cycle' : ''}`,
                'marker-end': 'url(#graphArrow)'
            });
            svg.appendChild(line);

            if (edge.label) {
                const midX = (from.x + to.x) / 2 + 15;
                const midY = (from.y + to.y) / 2;
                const text = DiagramEngine.createSVG('text', {
                    x: midX,
                    y: midY,
                    class: 'graph-edge-label'
                });
                text.textContent = edge.label;
                svg.appendChild(text);
            }
        });

        // Draw nodes
        nodes.forEach(node => {
            const pos = positions[node.id];
            const circle = DiagramEngine.createSVG('circle', {
                cx: pos.x,
                cy: pos.y,
                r: this.config.nodeRadius,
                class: `graph-node ${node.type || 'default'} ${node.cycle ? 'in-cycle' : ''}`
            });
            svg.appendChild(circle);

            const text = DiagramEngine.createSVG('text', {
                x: pos.x,
                y: pos.y,
                class: 'graph-node-label',
                'text-anchor': 'middle',
                'dominant-baseline': 'middle'
            });
            text.textContent = node.label || node.id;
            svg.appendChild(text);
        });

        this.container.appendChild(svg);
    }

    calculatePositions(nodes, edges) {
        const positions = {};
        const width = this.config.width;
        const height = this.config.height;

        // Simple grid layout for now
        const cols = Math.ceil(Math.sqrt(nodes.length));
        nodes.forEach((node, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            positions[node.id] = {
                x: width / (cols + 1) * (col + 1),
                y: height / (Math.ceil(nodes.length / cols) + 1) * (row + 1)
            };
        });

        return positions;
    }
}

/**
 * Architecture Diagram
 * Visualizes system components and interactions
 */
class ArchitectureDiagram {
    constructor(containerId, config = {}) {
        this.container = document.getElementById(containerId);
        this.config = {
            width: 900,
            height: 500,
            componentWidth: 120,
            componentHeight: 80,
            ...config
        };
        this.rendered = false;
    }

    render() {
        const svg = DiagramEngine.createSVG('svg', {
            viewBox: `0 0 ${this.config.width} ${this.config.height}`,
            class: 'architecture-diagram',
            preserveAspectRatio: 'xMidYMid meet'
        });

        const defs = DiagramEngine.createSVG('defs');
        const arrowMarker = DiagramEngine.createSVG('marker', {
            id: 'archArrow',
            markerWidth: '10',
            markerHeight: '10',
            refX: '9',
            refY: '3',
            orient: 'auto'
        });
        arrowMarker.appendChild(DiagramEngine.createSVG('polygon', {
            points: '0 0, 10 3, 0 6',
            fill: '#2563eb'
        }));
        defs.appendChild(arrowMarker);
        svg.appendChild(defs);

        const layers = this.config.layers || [];

        // Draw layers
        let yOffset = 30;
        layers.forEach((layer, layerIndex) => {
            // Draw layer background
            const layerBg = DiagramEngine.createSVG('rect', {
                x: 20,
                y: yOffset,
                width: this.config.width - 40,
                height: layer.components.length * this.config.componentHeight + 40,
                class: 'architecture-layer',
                fill: layer.color || '#f0f0f0'
            });
            svg.appendChild(layerBg);

            // Draw layer label
            const layerLabel = DiagramEngine.createSVG('text', {
                x: 35,
                y: yOffset + 20,
                class: 'layer-label'
            });
            layerLabel.textContent = layer.name;
            svg.appendChild(layerLabel);

            // Draw components
            layer.components.forEach((component, compIndex) => {
                const x = 100 + compIndex * (this.config.componentWidth + 40);
                const y = yOffset + 50;

                // Draw component box
                const box = DiagramEngine.createSVG('rect', {
                    x: x - this.config.componentWidth / 2,
                    y: y,
                    width: this.config.componentWidth,
                    height: this.config.componentHeight,
                    class: `component-box ${component.type || 'default'}`
                });
                svg.appendChild(box);

                // Draw component label
                const label = DiagramEngine.createSVG('text', {
                    x: x,
                    y: y + this.config.componentHeight / 2,
                    class: 'component-label',
                    'text-anchor': 'middle',
                    'dominant-baseline': 'middle'
                });
                label.textContent = component.name;
                svg.appendChild(label);
            });

            yOffset += layer.components.length * this.config.componentHeight + 80;
        });

        // Draw connections
        const connections = this.config.connections || [];
        connections.forEach(conn => {
            // Find positions of components
            // This is simplified - in real scenario would track all positions
        });

        this.container.appendChild(svg);
    }
}

/**
 * Tree Diagram
 * Visualizes hierarchical structures
 */
class TreeDiagram {
    constructor(containerId, config = {}) {
        this.container = document.getElementById(containerId);
        this.config = {
            width: 800,
            height: 500,
            nodeRadius: 25,
            verticalSpacing: 80,
            ...config
        };
        this.rendered = false;
    }

    render() {
        const svg = DiagramEngine.createSVG('svg', {
            viewBox: `0 0 ${this.config.width} ${this.config.height}`,
            class: 'tree-diagram',
            preserveAspectRatio: 'xMidYMid meet'
        });

        const root = this.config.root;
        if (!root) return;

        const positions = {};
        this.calculateTreePositions(root, this.config.width / 2, 30, positions);

        // Draw edges first
        this.drawTreeEdges(svg, root, positions);

        // Draw nodes
        this.drawTreeNodes(svg, root, positions);

        this.container.appendChild(svg);
    }

    calculateTreePositions(node, x, y, positions, siblingCount = 1, siblingIndex = 0) {
        positions[node.id] = { x, y };

        if (node.children && node.children.length > 0) {
            const childWidth = (this.config.width - 100) / (node.children.length || 1);
            node.children.forEach((child, i) => {
                const childX = (i - node.children.length / 2 + 0.5) * childWidth + x;
                const childY = y + this.config.verticalSpacing;
                this.calculateTreePositions(child, childX, childY, positions, node.children.length, i);
            });
        }
    }

    drawTreeEdges(svg, node, positions) {
        if (!node.children) return;

        const parentPos = positions[node.id];
        node.children.forEach(child => {
            const childPos = positions[child.id];
            const line = DiagramEngine.createSVG('line', {
                x1: parentPos.x,
                y1: parentPos.y + this.config.nodeRadius,
                x2: childPos.x,
                y2: childPos.y - this.config.nodeRadius,
                class: 'tree-edge'
            });
            svg.appendChild(line);
            this.drawTreeEdges(svg, child, positions);
        });
    }

    drawTreeNodes(svg, node, positions) {
        const pos = positions[node.id];
        const circle = DiagramEngine.createSVG('circle', {
            cx: pos.x,
            cy: pos.y,
            r: this.config.nodeRadius,
            class: `tree-node ${node.type || 'default'}`
        });
        svg.appendChild(circle);

        const text = DiagramEngine.createSVG('text', {
            x: pos.x,
            y: pos.y,
            class: 'tree-node-label',
            'text-anchor': 'middle',
            'dominant-baseline': 'middle'
        });
        text.textContent = node.label || node.id;
        svg.appendChild(text);

        if (node.children) {
            node.children.forEach(child => {
                this.drawTreeNodes(svg, child, positions);
            });
        }
    }
}

// Global engine instance
window.diagramEngine = new DiagramEngine();

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.diagramEngine.renderAll();
});

// Re-render diagrams after HTMX swaps
document.body.addEventListener('htmx:afterSwap', () => {
    window.diagramEngine.renderAll();
});

} // End of DiagramEngine undefined check
