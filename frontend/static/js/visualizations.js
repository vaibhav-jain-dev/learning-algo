/**
 * Algorithm Visualization Engine
 * Provides interactive, step-by-step visualizations for learning algorithms
 */

(function() {
  'use strict';

  // ===========================================
  // Visualization Engine Core
  // ===========================================

  class VisualizationEngine {
    constructor(container, options = {}) {
      this.container = typeof container === 'string'
        ? document.querySelector(container)
        : container;
      this.options = {
        animationSpeed: 500,
        autoPlay: false,
        showCode: true,
        ...options
      };
      this.steps = [];
      this.currentStep = 0;
      this.isPlaying = false;
      this.playInterval = null;
    }

    addStep(state, description, code = '') {
      this.steps.push({ state, description, code, index: this.steps.length });
    }

    render() {
      // Override in subclasses
    }

    goToStep(index) {
      if (index >= 0 && index < this.steps.length) {
        this.currentStep = index;
        this.render();
        this.updateInfo();
        this.updateProgress();
      }
    }

    next() {
      if (this.currentStep < this.steps.length - 1) {
        this.goToStep(this.currentStep + 1);
      } else {
        this.pause();
      }
    }

    prev() {
      if (this.currentStep > 0) {
        this.goToStep(this.currentStep - 1);
      }
    }

    play() {
      if (this.isPlaying) return;
      this.isPlaying = true;
      this.updatePlayButton();
      this.playInterval = setInterval(() => this.next(), this.options.animationSpeed);
    }

    pause() {
      this.isPlaying = false;
      this.updatePlayButton();
      if (this.playInterval) {
        clearInterval(this.playInterval);
        this.playInterval = null;
      }
    }

    reset() {
      this.pause();
      this.goToStep(0);
    }

    updatePlayButton() {
      const btn = this.container.querySelector('.step-btn.play');
      if (btn) {
        btn.textContent = this.isPlaying ? '⏸ Pause' : '▶ Play';
      }
    }

    updateInfo() {
      const step = this.steps[this.currentStep];
      const infoEl = this.container.querySelector('.step-info');
      if (infoEl && step) {
        infoEl.innerHTML = `
          <div class="step-number">Step ${step.index + 1} of ${this.steps.length}</div>
          <div class="step-description">${step.description}</div>
          ${step.code ? `<div class="step-code">${step.code}</div>` : ''}
        `;
      }
    }

    updateProgress() {
      const dots = this.container.querySelectorAll('.step-dot');
      dots.forEach((dot, i) => {
        dot.classList.remove('active', 'completed');
        if (i === this.currentStep) {
          dot.classList.add('active');
        } else if (i < this.currentStep) {
          dot.classList.add('completed');
        }
      });
    }

    createControls() {
      return `
        <div class="step-header">
          <div class="step-title">${this.options.title || 'Step-by-Step Visualization'}</div>
          <div class="step-controls">
            <button class="step-btn" onclick="window.vizEngines['${this.id}'].reset()">⟲ Reset</button>
            <button class="step-btn" onclick="window.vizEngines['${this.id}'].prev()">← Prev</button>
            <button class="step-btn play" onclick="window.vizEngines['${this.id}'].isPlaying ? window.vizEngines['${this.id}'].pause() : window.vizEngines['${this.id}'].play()">▶ Play</button>
            <button class="step-btn" onclick="window.vizEngines['${this.id}'].next()">Next →</button>
          </div>
        </div>
      `;
    }

    createProgress() {
      return `
        <div class="step-progress">
          ${this.steps.map((_, i) => `<div class="step-dot${i === 0 ? ' active' : ''}"></div>`).join('')}
        </div>
      `;
    }

    init() {
      if (!window.vizEngines) window.vizEngines = {};
      this.id = 'viz_' + Math.random().toString(36).substr(2, 9);
      window.vizEngines[this.id] = this;

      this.container.innerHTML = `
        <div class="step-animation">
          ${this.createControls()}
          <div class="step-content"></div>
          <div class="step-info"></div>
          ${this.createProgress()}
        </div>
      `;

      this.render();
      this.updateInfo();
    }
  }

  // ===========================================
  // Array Visualization
  // ===========================================

  class ArrayVisualization extends VisualizationEngine {
    constructor(container, array, options = {}) {
      super(container, options);
      this.array = [...array];
      this.highlights = new Set();
      this.pointers = {};
    }

    render() {
      const step = this.steps[this.currentStep];
      if (!step) return;

      const content = this.container.querySelector('.step-content');
      const state = step.state;

      content.innerHTML = `
        <div class="array-viz${this.options.bars ? ' bars' : ''}">
          ${state.array.map((val, i) => {
            const classes = ['cell'];
            if (state.highlights?.includes(i)) classes.push('highlight');
            if (state.comparing?.includes(i)) classes.push('comparing');
            if (state.sorted?.includes(i)) classes.push('sorted');
            if (state.swapping?.includes(i)) classes.push('swapping');
            if (state.pointerLeft === i) classes.push('pointer-left');
            if (state.pointerRight === i) classes.push('pointer-right');

            const style = this.options.bars ? `height: ${val * 10}px` : '';

            return `<div class="${classes.join(' ')}" style="${style}">${val}</div>`;
          }).join('')}
        </div>
      `;
    }
  }

  // ===========================================
  // Two Pointers Visualization
  // ===========================================

  class TwoPointersVisualization extends VisualizationEngine {
    constructor(container, array, options = {}) {
      super(container, { title: 'Two Pointers Technique', ...options });
      this.array = [...array];
    }

    render() {
      const step = this.steps[this.currentStep];
      if (!step) return;

      const content = this.container.querySelector('.step-content');
      const state = step.state;
      const cellWidth = 50;

      content.innerHTML = `
        <div class="two-pointers-viz">
          <div class="array-container">
            ${state.array.map((val, i) => {
              const classes = ['cell'];
              if (state.highlights?.includes(i)) classes.push('highlight');
              if (i >= state.left && i <= state.right && state.windowHighlight) classes.push('in-window');
              return `<div class="${classes.join(' ')}">${val}</div>`;
            }).join('')}
          </div>
          <div class="pointer left" style="left: calc(50% - ${(state.array.length * cellWidth / 2)}px + ${state.left * cellWidth + cellWidth/2}px)">
            <div class="pointer-arrow"></div>
            <div class="pointer-label">left = ${state.left}</div>
          </div>
          <div class="pointer right" style="left: calc(50% - ${(state.array.length * cellWidth / 2)}px + ${state.right * cellWidth + cellWidth/2}px)">
            <div class="pointer-arrow"></div>
            <div class="pointer-label">right = ${state.right}</div>
          </div>
        </div>
      `;
    }
  }

  // ===========================================
  // Linked List Visualization
  // ===========================================

  class LinkedListVisualization extends VisualizationEngine {
    constructor(container, values, options = {}) {
      super(container, { title: 'Linked List Operations', ...options });
      this.values = [...values];
    }

    render() {
      const step = this.steps[this.currentStep];
      if (!step) return;

      const content = this.container.querySelector('.step-content');
      const state = step.state;

      content.innerHTML = `
        <div class="linkedlist-viz">
          ${state.nodes.map((node, i) => `
            <div class="node ${state.current === i ? 'highlight' : ''}">
              <div class="node-box">
                <div class="node-value">${node.value}</div>
                <div class="node-next">${node.next !== null ? '•' : 'null'}</div>
              </div>
            </div>
            ${node.next !== null ? '<div class="arrow"></div>' : '<div class="null-ptr">null</div>'}
          `).join('')}
        </div>
      `;
    }
  }

  // ===========================================
  // Stack Visualization
  // ===========================================

  class StackVisualization extends VisualizationEngine {
    constructor(container, options = {}) {
      super(container, { title: 'Stack Operations (LIFO)', ...options });
    }

    render() {
      const step = this.steps[this.currentStep];
      if (!step) return;

      const content = this.container.querySelector('.step-content');
      const state = step.state;

      content.innerHTML = `
        <div class="stack-viz">
          <div class="stack-base"></div>
          ${state.items.map((item, i) => `
            <div class="stack-item ${state.popping === i ? 'popping' : ''}">${item}</div>
          `).join('')}
        </div>
      `;
    }
  }

  // ===========================================
  // DP Table Visualization
  // ===========================================

  class DPTableVisualization extends VisualizationEngine {
    constructor(container, rows, cols, options = {}) {
      super(container, { title: 'Dynamic Programming Table', ...options });
      this.rows = rows;
      this.cols = cols;
    }

    render() {
      const step = this.steps[this.currentStep];
      if (!step) return;

      const content = this.container.querySelector('.step-content');
      const state = step.state;

      let tableHTML = '<table>';

      // Header row
      if (state.colHeaders) {
        tableHTML += '<tr><th></th>';
        state.colHeaders.forEach(h => tableHTML += `<th>${h}</th>`);
        tableHTML += '</tr>';
      }

      // Data rows
      state.table.forEach((row, i) => {
        tableHTML += '<tr>';
        if (state.rowHeaders) {
          tableHTML += `<th>${state.rowHeaders[i]}</th>`;
        }
        row.forEach((cell, j) => {
          const classes = [];
          if (state.computing && state.computing[0] === i && state.computing[1] === j) {
            classes.push('computing');
          }
          if (state.computed?.some(([r, c]) => r === i && c === j)) {
            classes.push('computed');
          }
          if (state.path?.some(([r, c]) => r === i && c === j)) {
            classes.push('path');
          }
          tableHTML += `<td class="${classes.join(' ')}">${cell !== null ? cell : ''}</td>`;
        });
        tableHTML += '</tr>';
      });

      tableHTML += '</table>';

      content.innerHTML = `<div class="dp-table-viz">${tableHTML}</div>`;
    }
  }

  // ===========================================
  // LRU Cache Visualization
  // ===========================================

  class LRUCacheVisualization extends VisualizationEngine {
    constructor(container, capacity, options = {}) {
      super(container, { title: 'LRU Cache Operations', ...options });
      this.capacity = capacity;
    }

    render() {
      const step = this.steps[this.currentStep];
      if (!step) return;

      const content = this.container.querySelector('.step-content');
      const state = step.state;

      content.innerHTML = `
        <div class="cache-viz">
          <div class="cache-header">
            <div class="cache-stats">
              <div class="stat">Capacity: <span class="stat-value">${this.capacity}</span></div>
              <div class="stat">Size: <span class="stat-value">${state.items.length}</span></div>
              <div class="stat">Hits: <span class="stat-value">${state.hits || 0}</span></div>
              <div class="stat">Misses: <span class="stat-value">${state.misses || 0}</span></div>
            </div>
            <div>Operation: <strong>${state.operation || '-'}</strong></div>
          </div>
          <div class="cache-content">
            <div class="cache-label">HEAD<br>(MRU)</div>
            <div class="cache-items">
              ${state.items.map((item, i) => {
                const classes = ['cache-item'];
                if (state.newItem === i) classes.push('new');
                if (state.accessed === i) classes.push('accessed');
                if (state.evicting === i) classes.push('evicting');
                return `<div class="${classes.join(' ')}">${item.key}:${item.value}</div>`;
              }).join('')}
              ${state.items.length === 0 ? '<span style="color: #6b7280; padding: 8px;">Empty</span>' : ''}
            </div>
            <div class="cache-label">TAIL<br>(LRU)</div>
          </div>
        </div>
      `;
    }
  }

  // ===========================================
  // Water Trapping Visualization
  // ===========================================

  class WaterTrappingVisualization extends VisualizationEngine {
    constructor(container, heights, options = {}) {
      super(container, { title: 'Trapping Rain Water', ...options });
      this.heights = [...heights];
    }

    render() {
      const step = this.steps[this.currentStep];
      if (!step) return;

      const content = this.container.querySelector('.step-content');
      const state = step.state;
      const maxHeight = Math.max(...state.heights) * 20;

      content.innerHTML = `
        <div class="water-trap-viz" style="height: ${maxHeight + 60}px">
          ${state.heights.map((h, i) => {
            const classes = ['bar'];
            if (state.pointerLeft === i || state.pointerRight === i) classes.push('highlight');
            const waterHeight = state.water?.[i] || 0;

            return `
              <div class="${classes.join(' ')}" style="height: ${h * 20}px">
                ${waterHeight > 0 ? `<div class="water" style="height: ${waterHeight * 20}px"></div>` : ''}
                <div class="bar-value">${h}</div>
              </div>
            `;
          }).join('')}
        </div>
        <div style="text-align: center; color: #60a5fa; margin-top: 10px;">
          Total Water Trapped: <strong>${state.totalWater || 0}</strong>
        </div>
      `;
    }
  }

  // ===========================================
  // Binary Search Visualization
  // ===========================================

  class BinarySearchVisualization extends VisualizationEngine {
    constructor(container, array, target, options = {}) {
      super(container, { title: `Binary Search for ${target}`, ...options });
      this.array = [...array];
      this.target = target;
    }

    render() {
      const step = this.steps[this.currentStep];
      if (!step) return;

      const content = this.container.querySelector('.step-content');
      const state = step.state;
      const cellWidth = 50;

      content.innerHTML = `
        <div class="two-pointers-viz">
          <div class="array-container">
            ${state.array.map((val, i) => {
              const classes = ['cell'];
              if (i < state.left || i > state.right) classes.push('excluded');
              if (state.mid === i) classes.push('highlight');
              if (state.found === i) classes.push('sorted');
              return `<div class="${classes.join(' ')}" style="${i < state.left || i > state.right ? 'opacity: 0.3' : ''}">${val}</div>`;
            }).join('')}
          </div>
          ${state.left <= state.right ? `
            <div class="pointer left" style="left: calc(50% - ${(state.array.length * cellWidth / 2)}px + ${state.left * cellWidth + cellWidth/2}px)">
              <div class="pointer-arrow"></div>
              <div class="pointer-label">L=${state.left}</div>
            </div>
            <div class="pointer mid" style="left: calc(50% - ${(state.array.length * cellWidth / 2)}px + ${state.mid * cellWidth + cellWidth/2}px)">
              <div class="pointer-arrow"></div>
              <div class="pointer-label">M=${state.mid}</div>
            </div>
            <div class="pointer right" style="left: calc(50% - ${(state.array.length * cellWidth / 2)}px + ${state.right * cellWidth + cellWidth/2}px)">
              <div class="pointer-arrow"></div>
              <div class="pointer-label">R=${state.right}</div>
            </div>
          ` : ''}
        </div>
      `;
    }
  }

  // ===========================================
  // Helper function to create visualizations easily
  // ===========================================

  window.createVisualization = function(type, containerId, data, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container ${containerId} not found`);
      return null;
    }

    let viz;
    switch(type) {
      case 'array':
        viz = new ArrayVisualization(container, data.array, options);
        break;
      case 'two-pointers':
        viz = new TwoPointersVisualization(container, data.array, options);
        break;
      case 'linkedlist':
        viz = new LinkedListVisualization(container, data.values, options);
        break;
      case 'stack':
        viz = new StackVisualization(container, options);
        break;
      case 'dp-table':
        viz = new DPTableVisualization(container, data.rows, data.cols, options);
        break;
      case 'lru-cache':
        viz = new LRUCacheVisualization(container, data.capacity, options);
        break;
      case 'water-trapping':
        viz = new WaterTrappingVisualization(container, data.heights, options);
        break;
      case 'binary-search':
        viz = new BinarySearchVisualization(container, data.array, data.target, options);
        break;
      default:
        console.error(`Unknown visualization type: ${type}`);
        return null;
    }

    return viz;
  };

  // ===========================================
  // Pre-built Demo Visualizations
  // ===========================================

  window.createTwoSumDemo = function(containerId) {
    const viz = createVisualization('two-pointers', containerId, {
      array: [2, 7, 11, 15]
    }, { title: 'Two Sum with Two Pointers' });

    viz.addStep(
      { array: [2, 7, 11, 15], left: 0, right: 3, highlights: [] },
      'Start with left pointer at beginning, right pointer at end.',
      'left = 0, right = len(arr) - 1'
    );

    viz.addStep(
      { array: [2, 7, 11, 15], left: 0, right: 3, highlights: [0, 3] },
      'Calculate sum: arr[left] + arr[right] = 2 + 15 = 17. Target is 9.',
      'sum = arr[left] + arr[right] = 17'
    );

    viz.addStep(
      { array: [2, 7, 11, 15], left: 0, right: 2, highlights: [2] },
      'Sum (17) > target (9), so move right pointer left.',
      'right -= 1  # 17 > 9, reduce sum'
    );

    viz.addStep(
      { array: [2, 7, 11, 15], left: 0, right: 2, highlights: [0, 2] },
      'Calculate sum: 2 + 11 = 13. Still > 9.',
      'sum = 2 + 11 = 13'
    );

    viz.addStep(
      { array: [2, 7, 11, 15], left: 0, right: 1, highlights: [1] },
      'Sum (13) > target (9), move right pointer left again.',
      'right -= 1  # 13 > 9'
    );

    viz.addStep(
      { array: [2, 7, 11, 15], left: 0, right: 1, highlights: [0, 1] },
      'Calculate sum: 2 + 7 = 9. Found the target!',
      'sum = 2 + 7 = 9 ✓ Found!'
    );

    viz.init();
    return viz;
  };

  window.createLRUCacheDemo = function(containerId) {
    const viz = createVisualization('lru-cache', containerId, {
      capacity: 3
    }, { title: 'LRU Cache Operations' });

    viz.addStep(
      { items: [], operation: 'Initialize', hits: 0, misses: 0 },
      'Initialize empty LRU Cache with capacity 3.',
      'cache = LRUCache(3)'
    );

    viz.addStep(
      { items: [{key: 1, value: 'A'}], operation: 'put(1, A)', newItem: 0, hits: 0, misses: 0 },
      'Put key=1 with value=A. Added to front (MRU position).',
      'cache.put(1, "A")'
    );

    viz.addStep(
      { items: [{key: 2, value: 'B'}, {key: 1, value: 'A'}], operation: 'put(2, B)', newItem: 0, hits: 0, misses: 0 },
      'Put key=2. Added to front, key=1 moves toward LRU.',
      'cache.put(2, "B")'
    );

    viz.addStep(
      { items: [{key: 3, value: 'C'}, {key: 2, value: 'B'}, {key: 1, value: 'A'}], operation: 'put(3, C)', newItem: 0, hits: 0, misses: 0 },
      'Put key=3. Cache is now full (3/3).',
      'cache.put(3, "C")'
    );

    viz.addStep(
      { items: [{key: 1, value: 'A'}, {key: 3, value: 'C'}, {key: 2, value: 'B'}], operation: 'get(1) → A', accessed: 0, hits: 1, misses: 0 },
      'Get key=1. Found! Move to front (MRU). Hit!',
      'cache.get(1)  # Returns "A"'
    );

    viz.addStep(
      { items: [{key: 1, value: 'A'}, {key: 3, value: 'C'}, {key: 2, value: 'B'}], operation: 'get(4) → -1', hits: 1, misses: 1 },
      'Get key=4. Not found! Miss.',
      'cache.get(4)  # Returns -1'
    );

    viz.addStep(
      { items: [{key: 1, value: 'A'}, {key: 3, value: 'C'}, {key: 2, value: 'B'}], operation: 'put(4, D)', evicting: 2, hits: 1, misses: 1 },
      'Put key=4. Cache full! Evict LRU (key=2).',
      'cache.put(4, "D")  # Evicts key=2'
    );

    viz.addStep(
      { items: [{key: 4, value: 'D'}, {key: 1, value: 'A'}, {key: 3, value: 'C'}], operation: 'put(4, D)', newItem: 0, hits: 1, misses: 1 },
      'Key=4 added to front. Key=2 is gone.',
      '# Cache: [4:D, 1:A, 3:C]'
    );

    viz.init();
    return viz;
  };

  window.createBinarySearchDemo = function(containerId) {
    const viz = createVisualization('binary-search', containerId, {
      array: [1, 3, 5, 7, 9, 11, 13, 15],
      target: 9
    }, { title: 'Binary Search for 9' });

    viz.addStep(
      { array: [1, 3, 5, 7, 9, 11, 13, 15], left: 0, right: 7, mid: 3 },
      'Start: Search entire array. Calculate mid = (0 + 7) / 2 = 3.',
      'left=0, right=7, mid=3'
    );

    viz.addStep(
      { array: [1, 3, 5, 7, 9, 11, 13, 15], left: 0, right: 7, mid: 3 },
      'arr[mid] = 7. Target 9 > 7, so search right half.',
      '9 > 7 → search right'
    );

    viz.addStep(
      { array: [1, 3, 5, 7, 9, 11, 13, 15], left: 4, right: 7, mid: 5 },
      'New search: left=4, right=7, mid=(4+7)/2=5.',
      'left=4, right=7, mid=5'
    );

    viz.addStep(
      { array: [1, 3, 5, 7, 9, 11, 13, 15], left: 4, right: 7, mid: 5 },
      'arr[mid] = 11. Target 9 < 11, so search left half.',
      '9 < 11 → search left'
    );

    viz.addStep(
      { array: [1, 3, 5, 7, 9, 11, 13, 15], left: 4, right: 4, mid: 4 },
      'New search: left=4, right=4, mid=4.',
      'left=4, right=4, mid=4'
    );

    viz.addStep(
      { array: [1, 3, 5, 7, 9, 11, 13, 15], left: 4, right: 4, mid: 4, found: 4 },
      'arr[mid] = 9. Found! Return index 4.',
      'arr[4] = 9 ✓ Found!'
    );

    viz.init();
    return viz;
  };

  window.createWaterTrappingDemo = function(containerId) {
    const heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
    const viz = createVisualization('water-trapping', containerId, {
      heights: heights
    }, { title: 'Trapping Rain Water - Two Pointers' });

    viz.addStep(
      { heights: heights, pointerLeft: 0, pointerRight: 11, water: [], totalWater: 0 },
      'Initialize: left=0, right=11, maxLeft=0, maxRight=0',
      'left, right = 0, len(height)-1'
    );

    viz.addStep(
      { heights: heights, pointerLeft: 1, pointerRight: 11, water: [], totalWater: 0 },
      'height[left]=0 < height[right]=1. maxLeft=0. No water. Move left.',
      'maxLeft = max(0, 0) = 0'
    );

    viz.addStep(
      { heights: heights, pointerLeft: 2, pointerRight: 11, water: [0,0], totalWater: 0 },
      'height[left]=1 < height[right]=1. Update maxLeft=1. No water at index 1.',
      'maxLeft = max(0, 1) = 1'
    );

    viz.addStep(
      { heights: heights, pointerLeft: 3, pointerRight: 11, water: [0,0,1], totalWater: 1 },
      'height[left]=0 < height[right]=1. Water = maxLeft - height[2] = 1-0 = 1.',
      'water += maxLeft - height[left] = 1'
    );

    viz.addStep(
      { heights: heights, pointerLeft: 3, pointerRight: 10, water: [0,0,1,0,0,0,0,0,0,0], totalWater: 1 },
      'height[left]=2 > height[right]=1. Process right side.',
      'Process right: height[right] < height[left]'
    );

    viz.addStep(
      { heights: heights, pointerLeft: 3, pointerRight: 9, water: [0,0,1,0,0,0,0,0,0,1], totalWater: 2 },
      'maxRight=2. Water at index 10 = 2-1 = 1. Total = 2.',
      'water += maxRight - height[right] = 1'
    );

    viz.addStep(
      { heights: heights, pointerLeft: 3, pointerRight: 7, water: [0,0,1,0,0,2,1,0,0,1,0], totalWater: 6 },
      'Continue until pointers meet. Total water trapped = 6.',
      'Total water = 6 units'
    );

    viz.init();
    return viz;
  };

  // Export for module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      VisualizationEngine,
      ArrayVisualization,
      TwoPointersVisualization,
      LinkedListVisualization,
      StackVisualization,
      DPTableVisualization,
      LRUCacheVisualization,
      WaterTrappingVisualization,
      BinarySearchVisualization
    };
  }

})();
