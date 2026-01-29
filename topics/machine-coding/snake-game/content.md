# Snake Game

## Problem Statement

Design the classic Snake game where a snake moves around a grid, eats food to grow, and the game ends when the snake collides with walls or itself. This is a canonical machine coding problem that tests your understanding of **game loops**, **state management**, **collision detection algorithms**, and **efficient data structure usage**.

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #4a5568;">
<h4 style="color: #63b3ed; margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Core Challenge</h4>
<p style="color: #e2e8f0; margin: 0; line-height: 1.7;">
The snake game appears simple but reveals deep systems design thinking: How do you model continuous movement in discrete time? How do you handle input that arrives between frames? What data structure allows O(1) growth while maintaining spatial ordering?
</p>
</div>

---

## Section 1: Game Loop Architecture

The **game loop** is the heartbeat of any real-time game. It orchestrates the continuous cycle of processing input, updating game state, and rendering output. Understanding game loops is critical because they appear in embedded systems, simulations, and any application requiring continuous state updates.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center; font-size: 16px;">Game Loop Execution Cycle</h4>
<div style="display: flex; flex-direction: column; gap: 12px;">
<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 16px 24px; border-radius: 12px; min-width: 140px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 13px;">1. PROCESS INPUT</div>
<div style="color: #d1f5d3; font-size: 10px; margin-top: 4px;">Direction changes</div>
</div>
<div style="color: #7ee787; font-size: 24px;">&#8594;</div>
<div style="background: linear-gradient(135deg, #1f6feb 0%, #388bfd 100%); padding: 16px 24px; border-radius: 12px; min-width: 140px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 13px;">2. UPDATE STATE</div>
<div style="color: #c8e1ff; font-size: 10px; margin-top: 4px;">Move, collision, score</div>
</div>
<div style="color: #58a6ff; font-size: 24px;">&#8594;</div>
<div style="background: linear-gradient(135deg, #8957e5 0%, #a371f7 100%); padding: 16px 24px; border-radius: 12px; min-width: 140px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 13px;">3. RENDER</div>
<div style="color: #e2c5ff; font-size: 10px; margin-top: 4px;">Draw grid state</div>
</div>
</div>
<div style="display: flex; justify-content: center; margin-top: 16px;">
<div style="background: #21262d; padding: 12px 24px; border-radius: 8px; border-left: 3px solid #f0883e;">
<div style="color: #f0883e; font-size: 11px; font-weight: bold;">LOOP BACK</div>
<div style="color: #8b949e; font-size: 10px;">After fixed time delta or vsync</div>
</div>
</div>
</div>
</div>

### Fixed vs Variable Time Step

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #0d253f 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #58a6ff;">
<h4 style="color: #58a6ff; margin: 0 0 12px 0;">Assumption: Fixed Time Step</h4>
<p style="color: #c9d1d9; margin: 0; font-size: 14px; line-height: 1.6;">
The snake game assumes a <strong>fixed time step</strong> where each update moves the snake exactly one cell. This simplifies collision detection but creates a coupling between game speed and frame rate. In production games, you would decouple these using delta time accumulation.
</p>
</div>

The **fixed time step** approach means:
- Each `update()` call advances game time by exactly one "tick"
- Snake moves exactly one grid cell per tick
- Collision detection only checks grid-aligned positions
- Game speed is controlled by the delay between ticks, not the update logic

<div style="background: linear-gradient(135deg, #2d1f1f 0%, #1f1a1a 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #f85149;">
<h4 style="color: #f85149; margin: 0 0 12px 0;">Trade-off: Fixed vs Variable Step</h4>
<div style="color: #c9d1d9; font-size: 14px; line-height: 1.6;">
<strong>Fixed Step:</strong> Deterministic behavior, simpler collision, but speed tied to tick rate<br/>
<strong>Variable Step:</strong> Smooth movement at any framerate, but requires interpolation and continuous collision detection
</div>
</div>

### Input Buffering and the 180-Degree Problem

A critical edge case: What happens when the player presses opposite directions in rapid succession within a single frame?

```
Frame N: Snake moving RIGHT
Player presses: UP, then LEFT (both within frame N)
```

Without input buffering, the last input (LEFT) would be applied, causing the snake to reverse into itself. Solutions include:

1. **Input Queue**: Buffer all inputs, process one per tick
2. **Direction Lock**: Ignore inputs until next tick starts
3. **Validation**: Reject any direction that would cause immediate self-collision

### Interview Questions: Game Loop

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #4a5568;">
<h4 style="color: #a78bfa; margin: 0 0 16px 0;">Level 1: Fundamentals</h4>
<p style="color: #e2e8f0; margin: 0 0 8px 0;"><strong>Q: What are the three phases of a game loop and why is their order important?</strong></p>
<p style="color: #94a3b8; margin: 0; font-size: 13px;">
<em>Expected: Input processing must happen before update (so new direction takes effect). Update must happen before render (so we display current state). Render must complete before next input poll (to prevent visual lag).</em>
</p>
</div>

<div style="background: linear-gradient(135deg, #1a2e1a 0%, #0f1a0f 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #4a5568;">
<h4 style="color: #86efac; margin: 0 0 16px 0;">Level 2: Implementation Depth</h4>
<p style="color: #e2e8f0; margin: 0 0 8px 0;"><strong>Q: How would you handle input that arrives faster than your tick rate without losing responsiveness?</strong></p>
<p style="color: #94a3b8; margin: 0; font-size: 13px;">
<em>Expected: Implement an input queue with timestamps. During each tick, process the oldest unprocessed input. This prevents "swallowing" rapid inputs while maintaining deterministic game state. Discussion should include queue size limits and input coalescing for mobile touch events.</em>
</p>
</div>

<div style="background: linear-gradient(135deg, #2e1a1a 0%, #1a0f0f 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #4a5568;">
<h4 style="color: #fca5a5; margin: 0 0 16px 0;">Level 3: System Design Integration</h4>
<p style="color: #e2e8f0; margin: 0 0 8px 0;"><strong>Q: If you needed to support networked multiplayer snake, how would you modify the game loop to handle latency and ensure consistency across clients?</strong></p>
<p style="color: #94a3b8; margin: 0; font-size: 13px;">
<em>Expected: Implement lockstep or rollback networking. Lockstep: All clients wait for inputs from all players before advancing. Rollback: Predict opponent moves, then rewind and resimulate when actual input arrives. Discuss authoritative server model, input delay compensation, and the trade-off between responsiveness and consistency. Reference [[distributed systems]](/topic/system-design/distributed-systems) concepts like eventual consistency.</em>
</p>
</div>

---

## Section 2: Queue-Based Snake Body Management

The snake body is the central data structure. The choice of data structure directly impacts the time complexity of movement, growth, and collision detection. This is where [[deque]](/topic/data-structures/deque) knowledge becomes essential.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center; font-size: 16px;">Deque-Based Snake Body Operations</h4>
<div style="display: flex; flex-direction: column; gap: 20px;">
<div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: center;">
<div style="background: #238636; padding: 12px 16px; border-radius: 8px; color: white; font-weight: bold; font-size: 12px;">HEAD</div>
<div style="background: #1f6feb; padding: 12px 16px; border-radius: 8px; color: white; font-size: 12px;">Body[1]</div>
<div style="background: #1f6feb; padding: 12px 16px; border-radius: 8px; color: white; font-size: 12px;">Body[2]</div>
<div style="background: #1f6feb; padding: 12px 16px; border-radius: 8px; color: white; font-size: 12px;">Body[3]</div>
<div style="background: #da3633; padding: 12px 16px; border-radius: 8px; color: white; font-weight: bold; font-size: 12px;">TAIL</div>
</div>
<div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 16px;">
<div style="background: #21262d; padding: 16px; border-radius: 8px; text-align: center; min-width: 150px;">
<div style="color: #7ee787; font-weight: bold; font-size: 13px;">MOVE</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 8px;">appendleft(new_head)<br/>pop() from tail</div>
<div style="color: #58a6ff; font-size: 11px; margin-top: 4px;">O(1) + O(1)</div>
</div>
<div style="background: #21262d; padding: 16px; border-radius: 8px; text-align: center; min-width: 150px;">
<div style="color: #ffa657; font-weight: bold; font-size: 13px;">GROW</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 8px;">appendleft(new_head)<br/>skip pop()</div>
<div style="color: #58a6ff; font-size: 11px; margin-top: 4px;">O(1)</div>
</div>
<div style="background: #21262d; padding: 16px; border-radius: 8px; text-align: center; min-width: 150px;">
<div style="color: #f778ba; font-weight: bold; font-size: 13px;">COLLISION CHECK</div>
<div style="color: #8b949e; font-size: 11px; margin-top: 8px;">head in body_set?</div>
<div style="color: #58a6ff; font-size: 11px; margin-top: 4px;">O(1) with HashSet</div>
</div>
</div>
</div>
</div>

### Why Deque Over Other Structures?

| Data Structure | Add Head | Remove Tail | Random Access | Self-Collision |
|----------------|----------|-------------|---------------|----------------|
| **Array/List** | O(n) | O(1) | O(1) | O(n) |
| **Linked List** | O(1) | O(1)* | O(n) | O(n) |
| **Deque** | O(1) | O(1) | O(1)** | O(n) / O(1)*** |

*Requires tail pointer. **Amortized for dynamic array deque. ***O(1) if augmented with HashSet.

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #0d253f 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #58a6ff;">
<h4 style="color: #58a6ff; margin: 0 0 12px 0;">Design Choice: Deque + HashSet Hybrid</h4>
<p style="color: #c9d1d9; margin: 0; font-size: 14px; line-height: 1.6;">
The optimal structure is a <strong>deque for ordering</strong> (maintains head-to-tail sequence for rendering) combined with a <strong>HashSet for O(1) membership queries</strong> (collision detection). This uses O(n) extra space but reduces collision check from O(n) to O(1) per move.
</p>
</div>

### The Growing Flag Pattern

A subtle implementation detail: when the snake eats food, we don't immediately add a segment. Instead, we set a `growing` flag that causes the next move to skip the tail removal.

```python
def move(self) -> Position:
    new_head = self.head.move(self.direction)
    self.body.appendleft(new_head)
    self.body_set.add(new_head)

    if not self.growing:
        removed_tail = self.body.pop()
        self.body_set.remove(removed_tail)
    else:
        self.growing = False  # Reset flag

    return new_head
```

<div style="background: linear-gradient(135deg, #2d1f1f 0%, #1f1a1a 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #f85149;">
<h4 style="color: #f85149; margin: 0 0 12px 0;">Edge Case: Multiple Consecutive Growth</h4>
<p style="color: #c9d1d9; margin: 0; font-size: 14px; line-height: 1.6;">
What if food spawns allow eating multiple items in quick succession? The boolean flag only tracks one pending growth. For games with multiple food items or power-ups, use a <strong>growth counter</strong> instead: <code>self.pending_growth += food.growth_amount</code> and decrement each tick.
</p>
</div>

### Interview Questions: Snake Body Data Structure

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #4a5568;">
<h4 style="color: #a78bfa; margin: 0 0 16px 0;">Level 1: Fundamentals</h4>
<p style="color: #e2e8f0; margin: 0 0 8px 0;"><strong>Q: Why is a deque preferred over an array for the snake body?</strong></p>
<p style="color: #94a3b8; margin: 0; font-size: 13px;">
<em>Expected: Movement requires adding to head and removing from tail every tick. Arrays have O(n) insertion at front due to shifting. Deque provides O(1) for both operations. Candidate should mention that Python's deque is implemented as a doubly-linked list of fixed-size blocks.</em>
</p>
</div>

<div style="background: linear-gradient(135deg, #1a2e1a 0%, #0f1a0f 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #4a5568;">
<h4 style="color: #86efac; margin: 0 0 16px 0;">Level 2: Implementation Depth</h4>
<p style="color: #e2e8f0; margin: 0 0 8px 0;"><strong>Q: How do you maintain O(1) self-collision detection while keeping body segments ordered?</strong></p>
<p style="color: #94a3b8; margin: 0; font-size: 13px;">
<em>Expected: Use two data structures - a deque for ordered traversal (rendering) and a HashSet for O(1) lookup. On move: add new head to both, remove tail from both. Trade-off is O(n) space overhead. Candidate should discuss keeping these structures synchronized and the bug potential if they diverge.</em>
</p>
</div>

<div style="background: linear-gradient(135deg, #2e1a1a 0%, #1a0f0f 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #4a5568;">
<h4 style="color: #fca5a5; margin: 0 0 16px 0;">Level 3: System Design Integration</h4>
<p style="color: #e2e8f0; margin: 0 0 8px 0;"><strong>Q: If the snake could grow to millions of segments (server-side simulation), how would you optimize memory and support fast serialization for network sync?</strong></p>
<p style="color: #94a3b8; margin: 0; font-size: 13px;">
<em>Expected: Run-length encoding for straight segments (store direction + length instead of each position). Use spatial partitioning (quadtree) for collision. For serialization, send delta updates (new head position, removed tail) instead of full body. Discuss memory pooling for Position objects to reduce GC pressure. Reference [[spatial indexing]](/topic/algorithms/spatial-indexing) for large-scale collision systems.</em>
</p>
</div>

---

## Section 3: Collision Detection

Collision detection in Snake involves two distinct checks: **boundary collision** (snake vs walls) and **self-collision** (snake head vs body). Each has different algorithmic characteristics.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center; font-size: 16px;">Collision Detection Decision Tree</h4>
<div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
<div style="background: #21262d; padding: 16px 24px; border-radius: 12px; text-align: center;">
<div style="color: #58a6ff; font-weight: bold; font-size: 14px;">New Head Position Calculated</div>
</div>
<div style="color: #8b949e; font-size: 20px;">&#8595;</div>
<div style="display: flex; gap: 32px; flex-wrap: wrap; justify-content: center;">
<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="background: #f85149; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 12px;">BOUNDARY CHECK</div>
<div style="color: #ffd1cf; font-size: 10px;">0 &lt;= x &lt; width?</div>
<div style="color: #ffd1cf; font-size: 10px;">0 &lt;= y &lt; height?</div>
</div>
<div style="color: #f85149; font-size: 10px;">O(1) - constant</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="background: #ffa657; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 12px;">SELF-COLLISION</div>
<div style="color: #fff3e0; font-size: 10px;">head in body_set?</div>
</div>
<div style="color: #ffa657; font-size: 10px;">O(1) with HashSet</div>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
<div style="background: #238636; padding: 12px 20px; border-radius: 8px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 12px;">FOOD COLLISION</div>
<div style="color: #d1f5d3; font-size: 10px;">head == food.pos?</div>
</div>
<div style="color: #238636; font-size: 10px;">O(1) - direct compare</div>
</div>
</div>
</div>
</div>

### Order of Collision Checks Matters

<div style="background: linear-gradient(135deg, #2d1f1f 0%, #1f1a1a 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #f85149;">
<h4 style="color: #f85149; margin: 0 0 12px 0;">Critical Edge Case: Tail Removal Timing</h4>
<p style="color: #c9d1d9; margin: 0; font-size: 14px; line-height: 1.6;">
In the LeetCode variant (353), the snake can move into the cell its tail is about to vacate. This requires removing the tail <strong>before</strong> checking self-collision. The order must be: (1) calculate new head, (2) if not eating: remove tail from body set, (3) check if new head collides with remaining body, (4) add new head to body.
</p>
</div>

```python
# Correct order for LeetCode 353 variant
def move(self, direction: str) -> int:
    new_head = self.calculate_new_head(direction)

    # 1. Boundary check first
    if not self.is_within_bounds(new_head):
        return -1

    # 2. Determine if eating (before any modifications)
    eating = self.food_queue and new_head == self.food_queue[0]

    # 3. Remove tail BEFORE self-collision check (if not eating)
    if not eating:
        tail = self.snake.pop()
        self.snake_set.remove(tail)

    # 4. Now check self-collision (against reduced body)
    if new_head in self.snake_set:
        return -1

    # 5. Add new head
    self.snake.appendleft(new_head)
    self.snake_set.add(new_head)

    if eating:
        self.score += 1
        self.food_queue.popleft()

    return self.score
```

### Wraparound Boundaries vs Hard Walls

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #0d253f 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #58a6ff;">
<h4 style="color: #58a6ff; margin: 0 0 12px 0;">Design Choice: Boundary Behavior</h4>
<p style="color: #c9d1d9; margin: 0; font-size: 14px; line-height: 1.6;">
<strong>Hard walls:</strong> Collision = game over. Simpler to implement.<br/>
<strong>Wraparound (toroidal):</strong> Exiting right reappears left. Requires modulo arithmetic: <code>new_x = (head.x + dx) % width</code>. Changes strategy significantly - no "safe corners."
</p>
</div>

### Interview Questions: Collision Detection

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #4a5568;">
<h4 style="color: #a78bfa; margin: 0 0 16px 0;">Level 1: Fundamentals</h4>
<p style="color: #e2e8f0; margin: 0 0 8px 0;"><strong>Q: In the LeetCode variant, why must we remove the tail before checking self-collision?</strong></p>
<p style="color: #94a3b8; margin: 0; font-size: 13px;">
<em>Expected: The snake is allowed to move into the space its tail currently occupies because the tail will vacate that cell in the same move. If we check collision first, we'd falsely detect a collision with our own tail. This models the physical reality that head and tail move simultaneously.</em>
</p>
</div>

<div style="background: linear-gradient(135deg, #1a2e1a 0%, #0f1a0f 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #4a5568;">
<h4 style="color: #86efac; margin: 0 0 16px 0;">Level 2: Implementation Depth</h4>
<p style="color: #e2e8f0; margin: 0 0 8px 0;"><strong>Q: How would collision detection change if the snake moved at sub-cell granularity (smooth movement)?</strong></p>
<p style="color: #94a3b8; margin: 0; font-size: 13px;">
<em>Expected: Would need continuous collision detection - check if the head's path intersects any body segment. Could use line-segment intersection for body represented as connected line segments, or swept AABB (Axis-Aligned Bounding Box) tests. Discuss the performance implications: O(n) segment checks per frame vs spatial partitioning with [[quadtrees]](/topic/data-structures/quadtree) for O(log n).</em>
</p>
</div>

<div style="background: linear-gradient(135deg, #2e1a1a 0%, #1a0f0f 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #4a5568;">
<h4 style="color: #fca5a5; margin: 0 0 16px 0;">Level 3: System Design Integration</h4>
<p style="color: #e2e8f0; margin: 0 0 8px 0;"><strong>Q: In a multiplayer snake game with 100 snakes of average length 50, how would you optimize collision detection between all snakes?</strong></p>
<p style="color: #94a3b8; margin: 0; font-size: 13px;">
<em>Expected: Naive approach is O(n * m) where n = number of snakes, m = average length (5000 * 5000 = 25M checks). Use spatial hashing: divide grid into cells, only check collisions within same/adjacent cells. For moving objects, use sweep-and-prune algorithm. Discuss the trade-off between cell size (too small = many cells to check, too large = no benefit). Reference [[collision detection]](/topic/game-dev/collision-detection) and [[spatial partitioning]](/topic/algorithms/spatial-partitioning).</em>
</p>
</div>

---

## Section 4: Food Generation and Placement

Food generation seems trivial but has interesting algorithmic implications as the snake grows. The naive approach degrades significantly when the board is nearly full.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center; font-size: 16px;">Food Generation Strategy Comparison</h4>
<div style="display: flex; flex-direction: column; gap: 16px;">
<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
<div style="background: #21262d; padding: 20px; border-radius: 12px; flex: 1; min-width: 200px; max-width: 280px;">
<div style="color: #f85149; font-weight: bold; font-size: 13px; margin-bottom: 12px;">NAIVE: Random Retry</div>
<div style="color: #8b949e; font-size: 11px; line-height: 1.5;">
Generate random position<br/>
If occupied, retry<br/>
<span style="color: #f85149;">Worst case: infinite loop when board 99% full</span>
</div>
<div style="color: #f85149; font-size: 10px; margin-top: 8px;">O(infinity) worst case</div>
</div>
<div style="background: #21262d; padding: 20px; border-radius: 12px; flex: 1; min-width: 200px; max-width: 280px;">
<div style="color: #ffa657; font-weight: bold; font-size: 13px; margin-bottom: 12px;">SCAN: Filter Empty</div>
<div style="color: #8b949e; font-size: 11px; line-height: 1.5;">
Enumerate all cells<br/>
Filter out snake body<br/>
Random choice from remainder
</div>
<div style="color: #ffa657; font-size: 10px; margin-top: 8px;">O(width * height) always</div>
</div>
<div style="background: #21262d; padding: 20px; border-radius: 12px; flex: 1; min-width: 200px; max-width: 280px;">
<div style="color: #238636; font-weight: bold; font-size: 13px; margin-bottom: 12px;">OPTIMAL: Maintain Empty Set</div>
<div style="color: #8b949e; font-size: 11px; line-height: 1.5;">
Track empty cells in list<br/>
Random index selection<br/>
Update on snake move
</div>
<div style="color: #238636; font-size: 10px; margin-top: 8px;">O(1) generation, O(1) update</div>
</div>
</div>
</div>
</div>

### Optimal Algorithm: Maintained Empty Set

```python
class OptimizedFoodSpawner:
    def __init__(self, width: int, height: int, snake_body: set):
        # Initialize with all positions except snake
        self.empty_cells = []
        self.position_to_index = {}  # For O(1) removal

        for y in range(height):
            for x in range(width):
                pos = (x, y)
                if pos not in snake_body:
                    self.position_to_index[pos] = len(self.empty_cells)
                    self.empty_cells.append(pos)

    def spawn_food(self) -> tuple:
        if not self.empty_cells:
            return None  # Board full - player wins!

        idx = random.randint(0, len(self.empty_cells) - 1)
        food_pos = self.empty_cells[idx]
        self._remove_position(food_pos)
        return food_pos

    def _remove_position(self, pos: tuple):
        """O(1) removal using swap-with-last trick"""
        idx = self.position_to_index[pos]
        last_pos = self.empty_cells[-1]

        # Swap with last element
        self.empty_cells[idx] = last_pos
        self.position_to_index[last_pos] = idx

        # Remove last element
        self.empty_cells.pop()
        del self.position_to_index[pos]

    def on_snake_move(self, new_head: tuple, removed_tail: tuple):
        """Update empty set when snake moves"""
        self._remove_position(new_head)  # Head occupies new cell
        if removed_tail:  # Tail vacates cell (unless growing)
            self.position_to_index[removed_tail] = len(self.empty_cells)
            self.empty_cells.append(removed_tail)
```

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #0d253f 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #58a6ff;">
<h4 style="color: #58a6ff; margin: 0 0 12px 0;">Assumption: Uniform Random Distribution</h4>
<p style="color: #c9d1d9; margin: 0; font-size: 14px; line-height: 1.6;">
We assume food should spawn with uniform probability across all empty cells. Some game variants use weighted distributions - food more likely near edges, or further from snake head to increase difficulty. The optimal algorithm supports weighted selection by storing weights with positions.
</p>
</div>

### The Win Condition Edge Case

When the snake fills the entire board, there's no space for food. This represents the win condition, but implementation must handle it gracefully:

```python
def _spawn_food(self):
    if not self.empty_cells:
        self.game_over = True
        self.victory = True  # Distinguish from death
        return
    # ... normal spawning
```

### Interview Questions: Food Generation

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #4a5568;">
<h4 style="color: #a78bfa; margin: 0 0 16px 0;">Level 1: Fundamentals</h4>
<p style="color: #e2e8f0; margin: 0 0 8px 0;"><strong>Q: What's wrong with the naive "generate random, retry if occupied" approach?</strong></p>
<p style="color: #94a3b8; margin: 0; font-size: 13px;">
<em>Expected: When the snake covers 90% of the board, each random attempt has only 10% chance of finding an empty cell. Expected attempts = 10. At 99% coverage, expected attempts = 100. As coverage approaches 100%, attempts approach infinity. This is unacceptable for real-time games.</em>
</p>
</div>

<div style="background: linear-gradient(135deg, #1a2e1a 0%, #0f1a0f 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #4a5568;">
<h4 style="color: #86efac; margin: 0 0 16px 0;">Level 2: Implementation Depth</h4>
<p style="color: #e2e8f0; margin: 0 0 8px 0;"><strong>Q: How do you achieve O(1) removal from the empty cells list while maintaining random access for spawning?</strong></p>
<p style="color: #94a3b8; margin: 0; font-size: 13px;">
<em>Expected: Use the "swap with last and pop" technique. Maintain a position-to-index mapping. When removing, swap the target with the last element, update the swapped element's index in the map, then pop from the end. This maintains O(1) random access (array indexing) while enabling O(1) removal. Reference [[array manipulation]](/topic/algorithms/array-techniques).</em>
</p>
</div>

<div style="background: linear-gradient(135deg, #2e1a1a 0%, #1a0f0f 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #4a5568;">
<h4 style="color: #fca5a5; margin: 0 0 16px 0;">Level 3: System Design Integration</h4>
<p style="color: #e2e8f0; margin: 0 0 8px 0;"><strong>Q: Design a food generation system for a massive multiplayer snake game where the board is 10,000 x 10,000 cells with 1000 concurrent snakes. Memory and latency are critical.</strong></p>
<p style="color: #94a3b8; margin: 0; font-size: 13px;">
<em>Expected: Cannot enumerate all 100M cells. Use hierarchical approach: divide into regions, track empty count per region, select region proportionally to empty count, then use local spawner per region. For memory, use sparse representation - only track occupied cells, generate random positions and check against occupied set. Discuss consistent hashing for distributing regions across servers. Reference [[distributed systems]](/topic/system-design/distributed-systems) and [[sharding]](/topic/system-design/database-sharding).</em>
</p>
</div>

---

## Section 5: Score Tracking and Game State

Score tracking extends beyond a simple counter. Production games need persistent storage, leaderboards, anti-cheat measures, and analytics. This connects to [[state management]](/topic/system-design/state-management) patterns.

<div style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #30363d;">
<h4 style="color: #58a6ff; margin: 0 0 24px 0; text-align: center; font-size: 16px;">Score State Machine</h4>
<div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
<div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap; justify-content: center;">
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 16px 24px; border-radius: 12px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 13px;">PLAYING</div>
<div style="color: #d1f5d3; font-size: 10px; margin-top: 4px;">score: N</div>
</div>
<div style="color: #7ee787; font-size: 24px;">&#8594;</div>
<div style="background: #21262d; padding: 12px 16px; border-radius: 8px;">
<div style="color: #7ee787; font-size: 11px;">eat food (+10)</div>
</div>
<div style="color: #7ee787; font-size: 24px;">&#8594;</div>
<div style="background: linear-gradient(135deg, #238636 0%, #2ea043 100%); padding: 16px 24px; border-radius: 12px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 13px;">PLAYING</div>
<div style="color: #d1f5d3; font-size: 10px; margin-top: 4px;">score: N+10</div>
</div>
</div>
<div style="display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; margin-top: 8px;">
<div style="display: flex; align-items: center; gap: 12px;">
<div style="color: #f85149; font-size: 20px;">&#8595;</div>
<div style="background: #21262d; padding: 8px 12px; border-radius: 6px;">
<div style="color: #f85149; font-size: 10px;">collision</div>
</div>
<div style="color: #f85149; font-size: 20px;">&#8595;</div>
</div>
</div>
<div style="background: linear-gradient(135deg, #da3633 0%, #f85149 100%); padding: 16px 24px; border-radius: 12px; text-align: center;">
<div style="color: #fff; font-weight: bold; font-size: 13px;">GAME OVER</div>
<div style="color: #ffd1cf; font-size: 10px; margin-top: 4px;">final_score, persist to leaderboard</div>
</div>
</div>
</div>

### Scoring Strategies

| Strategy | Formula | Game Feel |
|----------|---------|-----------|
| **Linear** | `score += 10` | Consistent, predictable |
| **Length-based** | `score += 10 * snake_length` | Rewards survival, exponential growth |
| **Time-pressure** | `score += max(100 - ticks_since_food, 10)` | Encourages aggressive play |
| **Combo** | `score += 10 * combo_multiplier` | Rewards consecutive quick eats |

<div style="background: linear-gradient(135deg, #1e3a5f 0%, #0d253f 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #58a6ff;">
<h4 style="color: #58a6ff; margin: 0 0 12px 0;">Design Choice: Immutable Game State</h4>
<p style="color: #c9d1d9; margin: 0; font-size: 14px; line-height: 1.6;">
For replay systems, undo functionality, or debugging, consider making game state immutable. Each update creates a new state object. This enables time-travel debugging but increases memory usage. Use structural sharing (like in [[persistent data structures]](/topic/data-structures/persistent)) to mitigate.
</p>
</div>

### State Serialization for Save/Load

```python
@dataclass
class GameState:
    snake_body: List[Tuple[int, int]]
    snake_direction: str
    food_position: Tuple[int, int]
    score: int
    moves: int
    timestamp: float

    def to_json(self) -> str:
        return json.dumps(asdict(self))

    @classmethod
    def from_json(cls, data: str) -> 'GameState':
        return cls(**json.loads(data))

    def checksum(self) -> str:
        """Integrity check for anti-cheat"""
        content = f"{self.snake_body}{self.score}{self.moves}"
        return hashlib.sha256(content.encode()).hexdigest()[:16]
```

<div style="background: linear-gradient(135deg, #2d1f1f 0%, #1f1a1a 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #f85149;">
<h4 style="color: #f85149; margin: 0 0 12px 0;">Trade-off: Client-side vs Server-side Score</h4>
<p style="color: #c9d1d9; margin: 0; font-size: 14px; line-height: 1.6;">
<strong>Client-side:</strong> Responsive, works offline, but vulnerable to manipulation<br/>
<strong>Server-side:</strong> Authoritative, cheat-resistant, but requires connectivity and adds latency<br/>
<strong>Hybrid:</strong> Client runs game, server validates replay/input sequence. Best of both worlds but complex to implement.
</p>
</div>

### Interview Questions: Score and State Management

<div style="background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #4a5568;">
<h4 style="color: #a78bfa; margin: 0 0 16px 0;">Level 1: Fundamentals</h4>
<p style="color: #e2e8f0; margin: 0 0 8px 0;"><strong>Q: What information is minimally required to serialize a snake game state for save/load?</strong></p>
<p style="color: #94a3b8; margin: 0; font-size: 13px;">
<em>Expected: Snake body positions (ordered list), current direction, food position, score, and board dimensions. Optionally: RNG seed for deterministic replay, move count for statistics. Note that direction must be saved separately from body since two snakes with identical body positions could be moving different directions.</em>
</p>
</div>

<div style="background: linear-gradient(135deg, #1a2e1a 0%, #0f1a0f 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #4a5568;">
<h4 style="color: #86efac; margin: 0 0 16px 0;">Level 2: Implementation Depth</h4>
<p style="color: #e2e8f0; margin: 0 0 8px 0;"><strong>Q: How would you implement a replay system that can play back any game from just the initial state and input sequence?</strong></p>
<p style="color: #94a3b8; margin: 0; font-size: 13px;">
<em>Expected: Store initial RNG seed, board dimensions, and timestamped input events [(tick, direction), ...]. To replay: reconstruct initial state, apply inputs at correct ticks, use same RNG seed for deterministic food spawning. Discuss the importance of determinism - floating point issues, RNG implementation differences across platforms. Reference [[event sourcing]](/topic/system-design/event-sourcing).</em>
</p>
</div>

<div style="background: linear-gradient(135deg, #2e1a1a 0%, #1a0f0f 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #4a5568;">
<h4 style="color: #fca5a5; margin: 0 0 16px 0;">Level 3: System Design Integration</h4>
<p style="color: #e2e8f0; margin: 0 0 8px 0;"><strong>Q: Design a global leaderboard system for 10 million daily active users with real-time rank updates. How do you handle score submissions, prevent cheating, and display ranks efficiently?</strong></p>
<p style="color: #94a3b8; margin: 0; font-size: 13px;">
<em>Expected: Use Redis sorted sets for O(log n) rank queries and updates. Shard by score ranges for horizontal scaling. For anti-cheat: require replay submission, server-side validation of physics/timing, statistical anomaly detection (impossibly fast scores). For real-time updates: use pub/sub to notify affected users when rank changes. Discuss eventual consistency trade-offs - showing slightly stale ranks is acceptable. Reference [[leaderboard design]](/topic/system-design/leaderboard) and [[redis data structures]](/topic/databases/redis).</em>
</p>
</div>

---

## Complete Implementation

### Python

```python
import random
from enum import Enum
from typing import List, Tuple, Optional, Set, Dict
from collections import deque
from dataclasses import dataclass, field
import json
import hashlib
import time


class Direction(Enum):
    """Movement direction with delta values and opposite lookup."""
    UP = (0, -1)
    DOWN = (0, 1)
    LEFT = (-1, 0)
    RIGHT = (1, 0)

    def opposite(self) -> 'Direction':
        opposites = {
            Direction.UP: Direction.DOWN,
            Direction.DOWN: Direction.UP,
            Direction.LEFT: Direction.RIGHT,
            Direction.RIGHT: Direction.LEFT
        }
        return opposites[self]

    @property
    def delta(self) -> Tuple[int, int]:
        return self.value


@dataclass(frozen=True)
class Position:
    """Immutable position with movement support.

    Using frozen=True makes Position hashable for set operations
    while ensuring positions cannot be accidentally mutated.
    """
    x: int
    y: int

    def move(self, direction: Direction) -> 'Position':
        dx, dy = direction.delta
        return Position(self.x + dx, self.y + dy)

    def __iter__(self):
        """Allow tuple unpacking: x, y = position"""
        return iter((self.x, self.y))


class Snake:
    """Snake entity with deque-based body management.

    Design decisions:
    - Deque for O(1) head/tail operations
    - Separate HashSet for O(1) collision lookup
    - Growing flag defers growth to next move (simpler than immediate extension)
    """

    def __init__(self, start_pos: Position, initial_length: int = 3):
        self.body: deque[Position] = deque()
        self.body_set: Set[Position] = set()

        # Initialize snake body extending left from start position
        for i in range(initial_length):
            pos = Position(start_pos.x - i, start_pos.y)
            self.body.append(pos)
            self.body_set.add(pos)

        self.direction = Direction.RIGHT
        self._pending_growth = 0  # Support multiple consecutive growth

    @property
    def head(self) -> Position:
        return self.body[0]

    @property
    def tail(self) -> Position:
        return self.body[-1]

    @property
    def length(self) -> int:
        return len(self.body)

    def move(self) -> Tuple[Position, Optional[Position]]:
        """Move snake in current direction.

        Returns:
            Tuple of (new_head, removed_tail or None if growing)
        """
        new_head = self.head.move(self.direction)

        # Add new head
        self.body.appendleft(new_head)
        self.body_set.add(new_head)

        # Handle tail based on growth state
        removed_tail = None
        if self._pending_growth > 0:
            self._pending_growth -= 1
        else:
            removed_tail = self.body.pop()
            self.body_set.remove(removed_tail)

        return new_head, removed_tail

    def grow(self, amount: int = 1):
        """Queue growth for subsequent moves."""
        self._pending_growth += amount

    def change_direction(self, new_direction: Direction) -> bool:
        """Change direction if valid (not opposite).

        Returns True if direction changed, False if rejected.
        """
        if new_direction != self.direction.opposite():
            self.direction = new_direction
            return True
        return False

    def collides_with_self(self) -> bool:
        """Check if head position overlaps with body.

        Note: This is called AFTER move(), so head is already in body_set.
        We check if head appears more than once.
        """
        # Count occurrences - head should appear exactly once
        return list(self.body).count(self.head) > 1

    def occupies(self, pos: Position) -> bool:
        """O(1) check if snake occupies a position."""
        return pos in self.body_set


@dataclass
class Food:
    """Food item with position and point value."""
    position: Position
    points: int = 10

    # Extension: different food types
    growth_amount: int = 1


class GameBoard:
    """Game board managing boundaries and position validation."""

    def __init__(self, width: int, height: int):
        self.width = width
        self.height = height
        self._total_cells = width * height

    def is_within_bounds(self, pos: Position) -> bool:
        return 0 <= pos.x < self.width and 0 <= pos.y < self.height

    @property
    def total_cells(self) -> int:
        return self._total_cells


class FoodSpawner:
    """Optimized food spawner maintaining O(1) spawn time.

    Uses the "swap with last" technique for O(1) removal from available cells.
    """

    def __init__(self, board: GameBoard, initial_occupied: Set[Position]):
        self.board = board
        self._available: List[Position] = []
        self._pos_to_index: Dict[Position, int] = {}

        # Initialize available positions
        for y in range(board.height):
            for x in range(board.width):
                pos = Position(x, y)
                if pos not in initial_occupied:
                    self._pos_to_index[pos] = len(self._available)
                    self._available.append(pos)

    def spawn(self) -> Optional[Food]:
        """Spawn food at random available position.

        Returns None if no space available (win condition).
        """
        if not self._available:
            return None

        idx = random.randint(0, len(self._available) - 1)
        pos = self._available[idx]
        self._remove_position(pos)
        return Food(position=pos)

    def _remove_position(self, pos: Position):
        """O(1) removal using swap-with-last."""
        if pos not in self._pos_to_index:
            return

        idx = self._pos_to_index[pos]
        last_pos = self._available[-1]

        # Swap with last
        self._available[idx] = last_pos
        self._pos_to_index[last_pos] = idx

        # Remove last
        self._available.pop()
        del self._pos_to_index[pos]

    def _add_position(self, pos: Position):
        """Add position back to available set."""
        if pos in self._pos_to_index:
            return
        self._pos_to_index[pos] = len(self._available)
        self._available.append(pos)

    def on_snake_move(self, new_head: Position, removed_tail: Optional[Position]):
        """Update available positions after snake move."""
        self._remove_position(new_head)
        if removed_tail:
            self._add_position(removed_tail)

    def on_food_eaten(self, food_pos: Position):
        """Food position already removed during spawn, nothing to do."""
        pass

    @property
    def available_count(self) -> int:
        return len(self._available)


class GameState(Enum):
    """Explicit game state for state machine clarity."""
    RUNNING = "running"
    GAME_OVER = "game_over"
    VICTORY = "victory"
    PAUSED = "paused"


@dataclass
class GameSnapshot:
    """Serializable game state for save/load and replay."""
    snake_body: List[Tuple[int, int]]
    snake_direction: str
    food_position: Optional[Tuple[int, int]]
    score: int
    moves: int
    board_width: int
    board_height: int
    state: str
    timestamp: float = field(default_factory=time.time)

    def to_json(self) -> str:
        return json.dumps({
            'snake_body': self.snake_body,
            'snake_direction': self.snake_direction,
            'food_position': self.food_position,
            'score': self.score,
            'moves': self.moves,
            'board_width': self.board_width,
            'board_height': self.board_height,
            'state': self.state,
            'timestamp': self.timestamp
        })

    @classmethod
    def from_json(cls, data: str) -> 'GameSnapshot':
        d = json.loads(data)
        return cls(**d)

    def checksum(self) -> str:
        """Integrity verification for anti-cheat."""
        content = f"{self.snake_body}:{self.score}:{self.moves}"
        return hashlib.sha256(content.encode()).hexdigest()[:16]


class SnakeGame:
    """Main game controller orchestrating all components.

    Responsibilities:
    - Game loop coordination (update cycle)
    - Input processing with validation
    - State transitions
    - Score management
    """

    def __init__(self, width: int = 20, height: int = 20,
                 initial_length: int = 3, seed: Optional[int] = None):
        # Set RNG seed for deterministic replay
        if seed is not None:
            random.seed(seed)
        self._seed = seed

        self.board = GameBoard(width, height)
        start_pos = Position(width // 2, height // 2)
        self.snake = Snake(start_pos, initial_length)

        self.food_spawner = FoodSpawner(self.board, self.snake.body_set)
        self.food: Optional[Food] = None

        self.score = 0
        self.moves = 0
        self.state = GameState.RUNNING

        # Input buffering for handling rapid direction changes
        self._input_queue: deque[Direction] = deque(maxlen=2)

        # Statistics
        self.food_eaten = 0
        self.start_time = time.time()

        # Spawn initial food
        self._spawn_food()

    def _spawn_food(self):
        """Attempt to spawn food, handle win condition."""
        self.food = self.food_spawner.spawn()
        if self.food is None:
            self.state = GameState.VICTORY

    def queue_direction(self, direction: Direction):
        """Queue a direction change for processing.

        Input buffering prevents losing rapid inputs and handles
        the 180-degree turn edge case.
        """
        if self.state != GameState.RUNNING:
            return

        # Validate against current direction or last queued direction
        reference_dir = self._input_queue[-1] if self._input_queue else self.snake.direction
        if direction != reference_dir.opposite():
            self._input_queue.append(direction)

    def update(self) -> bool:
        """Execute one game tick.

        Returns True if game continues, False if ended.
        """
        if self.state != GameState.RUNNING:
            return False

        # Process buffered input
        if self._input_queue:
            new_direction = self._input_queue.popleft()
            self.snake.change_direction(new_direction)

        # Move snake
        new_head, removed_tail = self.snake.move()
        self.moves += 1

        # Update food spawner tracking
        self.food_spawner.on_snake_move(new_head, removed_tail)

        # Check boundary collision
        if not self.board.is_within_bounds(new_head):
            self.state = GameState.GAME_OVER
            return False

        # Check self collision
        if self.snake.collides_with_self():
            self.state = GameState.GAME_OVER
            return False

        # Check food collision
        if self.food and new_head == self.food.position:
            self._handle_food_eaten()

        return True

    def _handle_food_eaten(self):
        """Process food consumption."""
        self.score += self.food.points
        self.snake.grow(self.food.growth_amount)
        self.food_eaten += 1
        self._spawn_food()

    def get_snapshot(self) -> GameSnapshot:
        """Create serializable snapshot of current state."""
        return GameSnapshot(
            snake_body=[(p.x, p.y) for p in self.snake.body],
            snake_direction=self.snake.direction.name,
            food_position=(self.food.position.x, self.food.position.y) if self.food else None,
            score=self.score,
            moves=self.moves,
            board_width=self.board.width,
            board_height=self.board.height,
            state=self.state.value
        )

    def get_statistics(self) -> dict:
        """Get game statistics for analytics."""
        elapsed = time.time() - self.start_time
        return {
            'score': self.score,
            'snake_length': self.snake.length,
            'food_eaten': self.food_eaten,
            'moves': self.moves,
            'elapsed_seconds': elapsed,
            'moves_per_food': self.moves / max(1, self.food_eaten),
            'efficiency': self.snake.length / max(1, self.moves),
            'board_coverage': self.snake.length / self.board.total_cells
        }

    def render(self) -> str:
        """Render game board as string for debugging."""
        grid = [['.' for _ in range(self.board.width)]
                for _ in range(self.board.height)]

        # Draw snake
        for i, pos in enumerate(self.snake.body):
            if self.board.is_within_bounds(pos):
                grid[pos.y][pos.x] = 'O' if i == 0 else 'o'

        # Draw food
        if self.food:
            grid[self.food.position.y][self.food.position.x] = '*'

        # Build output
        border = '+' + '-' * self.board.width + '+'
        lines = [border]
        for row in grid:
            lines.append('|' + ''.join(row) + '|')
        lines.append(border)
        lines.append(f"Score: {self.score} | Length: {self.snake.length} | "
                    f"Moves: {self.moves} | State: {self.state.value}")

        return '\n'.join(lines)


# LeetCode 353: Design Snake Game
class SnakeGameLC:
    """
    LeetCode-style interface with predetermined food positions.

    Key difference from standard game:
    - Food positions are predetermined (queue)
    - Snake can move into tail's current position (tail moves first)
    - Returns score or -1 on game over
    """

    def __init__(self, width: int, height: int, food: List[List[int]]):
        self.width = width
        self.height = height
        self.food_queue = deque(tuple(f) for f in food)  # [(row, col), ...]
        self.snake = deque([(0, 0)])  # [(row, col), ...]
        self.snake_set = {(0, 0)}
        self.score = 0

    def move(self, direction: str) -> int:
        """Move snake in direction. Returns score or -1 if game over."""
        directions = {
            'U': (-1, 0),
            'D': (1, 0),
            'L': (0, -1),
            'R': (0, 1)
        }

        dr, dc = directions[direction]
        head_r, head_c = self.snake[0]
        new_head = (head_r + dr, head_c + dc)

        # Boundary check
        if not (0 <= new_head[0] < self.height and 0 <= new_head[1] < self.width):
            return -1

        # Check if eating (before modifying body)
        eating = self.food_queue and self.food_queue[0] == new_head

        # CRITICAL: Remove tail BEFORE self-collision check
        # This allows snake to move into space tail is vacating
        if not eating:
            tail = self.snake.pop()
            self.snake_set.remove(tail)

        # Self collision check (against reduced body if not eating)
        if new_head in self.snake_set:
            return -1

        # Add new head
        self.snake.appendleft(new_head)
        self.snake_set.add(new_head)

        if eating:
            self.score += 1
            self.food_queue.popleft()

        return self.score


# Demo and testing
if __name__ == "__main__":
    print("=== Snake Game Demo ===\n")

    # Create game with fixed seed for reproducibility
    game = SnakeGame(15, 10, seed=42)

    # Simulate moves
    moves = [
        (Direction.RIGHT, 3),
        (Direction.DOWN, 2),
        (Direction.LEFT, 4),
        (Direction.UP, 2),
    ]

    print("Initial state:")
    print(game.render())
    print()

    for direction, count in moves:
        game.queue_direction(direction)
        for _ in range(count):
            if not game.update():
                print(f"Game ended: {game.state.value}")
                break

    print("After moves:")
    print(game.render())
    print()

    # Show statistics
    stats = game.get_statistics()
    print("Statistics:")
    for key, value in stats.items():
        if isinstance(value, float):
            print(f"  {key}: {value:.3f}")
        else:
            print(f"  {key}: {value}")

    # Demonstrate serialization
    print("\nSnapshot JSON:")
    snapshot = game.get_snapshot()
    print(snapshot.to_json()[:200] + "...")
    print(f"Checksum: {snapshot.checksum()}")
```

### Go

```go
package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"strings"
	"time"
)

// Direction represents movement direction with delta values
type Direction int

const (
	Up Direction = iota
	Down
	Left
	Right
)

func (d Direction) Opposite() Direction {
	switch d {
	case Up:
		return Down
	case Down:
		return Up
	case Left:
		return Right
	default:
		return Left
	}
}

func (d Direction) Delta() (int, int) {
	switch d {
	case Up:
		return 0, -1
	case Down:
		return 0, 1
	case Left:
		return -1, 0
	default:
		return 1, 0
	}
}

func (d Direction) String() string {
	names := []string{"UP", "DOWN", "LEFT", "RIGHT"}
	return names[d]
}

// Position represents a grid coordinate
type Position struct {
	X, Y int
}

func (p Position) Move(d Direction) Position {
	dx, dy := d.Delta()
	return Position{p.X + dx, p.Y + dy}
}

func (p Position) Key() string {
	return fmt.Sprintf("%d,%d", p.X, p.Y)
}

// Snake manages the snake entity with optimized data structures
type Snake struct {
	Body          []Position
	BodySet       map[string]bool // O(1) collision lookup
	Dir           Direction
	PendingGrowth int
}

func NewSnake(start Position, length int) *Snake {
	body := make([]Position, length)
	bodySet := make(map[string]bool)

	for i := 0; i < length; i++ {
		pos := Position{start.X - i, start.Y}
		body[i] = pos
		bodySet[pos.Key()] = true
	}

	return &Snake{
		Body:    body,
		BodySet: bodySet,
		Dir:     Right,
	}
}

func (s *Snake) Head() Position {
	return s.Body[0]
}

func (s *Snake) Tail() Position {
	return s.Body[len(s.Body)-1]
}

func (s *Snake) Length() int {
	return len(s.Body)
}

// Move advances the snake, returns (newHead, removedTail or nil)
func (s *Snake) Move() (Position, *Position) {
	newHead := s.Head().Move(s.Dir)

	// Prepend new head
	s.Body = append([]Position{newHead}, s.Body...)
	s.BodySet[newHead.Key()] = true

	var removedTail *Position
	if s.PendingGrowth > 0 {
		s.PendingGrowth--
	} else {
		tail := s.Body[len(s.Body)-1]
		removedTail = &tail
		delete(s.BodySet, tail.Key())
		s.Body = s.Body[:len(s.Body)-1]
	}

	return newHead, removedTail
}

func (s *Snake) Grow(amount int) {
	s.PendingGrowth += amount
}

func (s *Snake) ChangeDirection(newDir Direction) bool {
	if newDir != s.Dir.Opposite() {
		s.Dir = newDir
		return true
	}
	return false
}

func (s *Snake) CollidesWithSelf() bool {
	head := s.Head()
	for _, pos := range s.Body[1:] {
		if pos == head {
			return true
		}
	}
	return false
}

func (s *Snake) Occupies(pos Position) bool {
	return s.BodySet[pos.Key()]
}

// Food represents a food item
type Food struct {
	Position     Position
	Points       int
	GrowthAmount int
}

// GameBoard manages the game boundaries
type GameBoard struct {
	Width, Height int
}

func (b *GameBoard) IsWithinBounds(pos Position) bool {
	return pos.X >= 0 && pos.X < b.Width && pos.Y >= 0 && pos.Y < b.Height
}

func (b *GameBoard) TotalCells() int {
	return b.Width * b.Height
}

// FoodSpawner handles optimized food placement
type FoodSpawner struct {
	Board      *GameBoard
	Available  []Position
	PosToIndex map[string]int
}

func NewFoodSpawner(board *GameBoard, occupied map[string]bool) *FoodSpawner {
	spawner := &FoodSpawner{
		Board:      board,
		Available:  make([]Position, 0),
		PosToIndex: make(map[string]int),
	}

	for y := 0; y < board.Height; y++ {
		for x := 0; x < board.Width; x++ {
			pos := Position{x, y}
			if !occupied[pos.Key()] {
				spawner.PosToIndex[pos.Key()] = len(spawner.Available)
				spawner.Available = append(spawner.Available, pos)
			}
		}
	}

	return spawner
}

func (fs *FoodSpawner) Spawn() *Food {
	if len(fs.Available) == 0 {
		return nil
	}

	idx := rand.Intn(len(fs.Available))
	pos := fs.Available[idx]
	fs.removePosition(pos)

	return &Food{
		Position:     pos,
		Points:       10,
		GrowthAmount: 1,
	}
}

func (fs *FoodSpawner) removePosition(pos Position) {
	key := pos.Key()
	idx, exists := fs.PosToIndex[key]
	if !exists {
		return
	}

	// Swap with last
	lastPos := fs.Available[len(fs.Available)-1]
	fs.Available[idx] = lastPos
	fs.PosToIndex[lastPos.Key()] = idx

	// Remove last
	fs.Available = fs.Available[:len(fs.Available)-1]
	delete(fs.PosToIndex, key)
}

func (fs *FoodSpawner) addPosition(pos Position) {
	key := pos.Key()
	if _, exists := fs.PosToIndex[key]; exists {
		return
	}
	fs.PosToIndex[key] = len(fs.Available)
	fs.Available = append(fs.Available, pos)
}

func (fs *FoodSpawner) OnSnakeMove(newHead Position, removedTail *Position) {
	fs.removePosition(newHead)
	if removedTail != nil {
		fs.addPosition(*removedTail)
	}
}

// GameState represents the current state of the game
type GameState int

const (
	Running GameState = iota
	GameOver
	Victory
	Paused
)

func (gs GameState) String() string {
	names := []string{"RUNNING", "GAME_OVER", "VICTORY", "PAUSED"}
	return names[gs]
}

// GameSnapshot for serialization
type GameSnapshot struct {
	SnakeBody      [][]int `json:"snake_body"`
	SnakeDirection string  `json:"snake_direction"`
	FoodPosition   []int   `json:"food_position,omitempty"`
	Score          int     `json:"score"`
	Moves          int     `json:"moves"`
	BoardWidth     int     `json:"board_width"`
	BoardHeight    int     `json:"board_height"`
	State          string  `json:"state"`
	Timestamp      int64   `json:"timestamp"`
}

// SnakeGame is the main game controller
type SnakeGame struct {
	Board       *GameBoard
	Snake       *Snake
	FoodSpawner *FoodSpawner
	Food        *Food
	Score       int
	Moves       int
	State       GameState
	InputQueue  []Direction
	FoodEaten   int
	StartTime   time.Time
}

func NewSnakeGame(width, height, initialLength int) *SnakeGame {
	board := &GameBoard{width, height}
	startPos := Position{width / 2, height / 2}
	snake := NewSnake(startPos, initialLength)
	foodSpawner := NewFoodSpawner(board, snake.BodySet)

	game := &SnakeGame{
		Board:       board,
		Snake:       snake,
		FoodSpawner: foodSpawner,
		State:       Running,
		InputQueue:  make([]Direction, 0, 2),
		StartTime:   time.Now(),
	}

	game.spawnFood()
	return game
}

func (g *SnakeGame) spawnFood() {
	g.Food = g.FoodSpawner.Spawn()
	if g.Food == nil {
		g.State = Victory
	}
}

func (g *SnakeGame) QueueDirection(dir Direction) {
	if g.State != Running || len(g.InputQueue) >= 2 {
		return
	}

	var refDir Direction
	if len(g.InputQueue) > 0 {
		refDir = g.InputQueue[len(g.InputQueue)-1]
	} else {
		refDir = g.Snake.Dir
	}

	if dir != refDir.Opposite() {
		g.InputQueue = append(g.InputQueue, dir)
	}
}

func (g *SnakeGame) Update() bool {
	if g.State != Running {
		return false
	}

	// Process buffered input
	if len(g.InputQueue) > 0 {
		newDir := g.InputQueue[0]
		g.InputQueue = g.InputQueue[1:]
		g.Snake.ChangeDirection(newDir)
	}

	// Move snake
	newHead, removedTail := g.Snake.Move()
	g.Moves++

	// Update food spawner
	g.FoodSpawner.OnSnakeMove(newHead, removedTail)

	// Boundary collision
	if !g.Board.IsWithinBounds(newHead) {
		g.State = GameOver
		return false
	}

	// Self collision
	if g.Snake.CollidesWithSelf() {
		g.State = GameOver
		return false
	}

	// Food collision
	if g.Food != nil && newHead == g.Food.Position {
		g.handleFoodEaten()
	}

	return true
}

func (g *SnakeGame) handleFoodEaten() {
	g.Score += g.Food.Points
	g.Snake.Grow(g.Food.GrowthAmount)
	g.FoodEaten++
	g.spawnFood()
}

func (g *SnakeGame) GetSnapshot() GameSnapshot {
	body := make([][]int, len(g.Snake.Body))
	for i, pos := range g.Snake.Body {
		body[i] = []int{pos.X, pos.Y}
	}

	snapshot := GameSnapshot{
		SnakeBody:      body,
		SnakeDirection: g.Snake.Dir.String(),
		Score:          g.Score,
		Moves:          g.Moves,
		BoardWidth:     g.Board.Width,
		BoardHeight:    g.Board.Height,
		State:          g.State.String(),
		Timestamp:      time.Now().Unix(),
	}

	if g.Food != nil {
		snapshot.FoodPosition = []int{g.Food.Position.X, g.Food.Position.Y}
	}

	return snapshot
}

func (g *SnakeGame) GetStatistics() map[string]interface{} {
	elapsed := time.Since(g.StartTime).Seconds()
	movesPerFood := float64(g.Moves)
	if g.FoodEaten > 0 {
		movesPerFood = float64(g.Moves) / float64(g.FoodEaten)
	}

	return map[string]interface{}{
		"score":          g.Score,
		"snake_length":   g.Snake.Length(),
		"food_eaten":     g.FoodEaten,
		"moves":          g.Moves,
		"elapsed_seconds": elapsed,
		"moves_per_food": movesPerFood,
		"board_coverage": float64(g.Snake.Length()) / float64(g.Board.TotalCells()),
	}
}

func (g *SnakeGame) Render() string {
	grid := make([][]rune, g.Board.Height)
	for y := range grid {
		grid[y] = make([]rune, g.Board.Width)
		for x := range grid[y] {
			grid[y][x] = '.'
		}
	}

	// Draw snake
	for i, pos := range g.Snake.Body {
		if g.Board.IsWithinBounds(pos) {
			if i == 0 {
				grid[pos.Y][pos.X] = 'O'
			} else {
				grid[pos.Y][pos.X] = 'o'
			}
		}
	}

	// Draw food
	if g.Food != nil {
		grid[g.Food.Position.Y][g.Food.Position.X] = '*'
	}

	// Build output
	var sb strings.Builder
	border := "+" + strings.Repeat("-", g.Board.Width) + "+"
	sb.WriteString(border + "\n")
	for _, row := range grid {
		sb.WriteString("|" + string(row) + "|\n")
	}
	sb.WriteString(border + "\n")
	sb.WriteString(fmt.Sprintf("Score: %d | Length: %d | Moves: %d | State: %s\n",
		g.Score, g.Snake.Length(), g.Moves, g.State))

	return sb.String()
}

// LeetCode 353 implementation
type SnakeGameLC struct {
	Width, Height int
	FoodQueue     [][]int
	Snake         [][]int
	SnakeSet      map[string]bool
	Score         int
}

func NewSnakeGameLC(width, height int, food [][]int) *SnakeGameLC {
	return &SnakeGameLC{
		Width:     width,
		Height:    height,
		FoodQueue: food,
		Snake:     [][]int{{0, 0}},
		SnakeSet:  map[string]bool{"0,0": true},
		Score:     0,
	}
}

func (g *SnakeGameLC) Move(direction string) int {
	dirs := map[string][]int{
		"U": {-1, 0},
		"D": {1, 0},
		"L": {0, -1},
		"R": {0, 1},
	}

	d := dirs[direction]
	head := g.Snake[0]
	newHead := []int{head[0] + d[0], head[1] + d[1]}

	// Boundary check
	if newHead[0] < 0 || newHead[0] >= g.Height ||
		newHead[1] < 0 || newHead[1] >= g.Width {
		return -1
	}

	eating := len(g.FoodQueue) > 0 &&
		g.FoodQueue[0][0] == newHead[0] &&
		g.FoodQueue[0][1] == newHead[1]

	// Remove tail before collision check
	if !eating {
		tail := g.Snake[len(g.Snake)-1]
		key := fmt.Sprintf("%d,%d", tail[0], tail[1])
		delete(g.SnakeSet, key)
		g.Snake = g.Snake[:len(g.Snake)-1]
	}

	// Self collision
	key := fmt.Sprintf("%d,%d", newHead[0], newHead[1])
	if g.SnakeSet[key] {
		return -1
	}

	// Add new head
	g.Snake = append([][]int{newHead}, g.Snake...)
	g.SnakeSet[key] = true

	if eating {
		g.Score++
		g.FoodQueue = g.FoodQueue[1:]
	}

	return g.Score
}

func main() {
	rand.Seed(time.Now().UnixNano())

	fmt.Println("=== Snake Game Demo ===\n")

	game := NewSnakeGame(15, 10, 3)

	fmt.Println("Initial state:")
	fmt.Println(game.Render())

	// Simulate moves
	moves := []struct {
		dir   Direction
		count int
	}{
		{Right, 3},
		{Down, 2},
		{Left, 4},
		{Up, 2},
	}

	for _, m := range moves {
		game.QueueDirection(m.dir)
		for i := 0; i < m.count; i++ {
			if !game.Update() {
				fmt.Printf("Game ended: %s\n", game.State)
				break
			}
		}
	}

	fmt.Println("After moves:")
	fmt.Println(game.Render())

	// Show statistics
	stats := game.GetStatistics()
	fmt.Println("Statistics:")
	for key, value := range stats {
		fmt.Printf("  %s: %v\n", key, value)
	}

	// Demonstrate serialization
	snapshot := game.GetSnapshot()
	jsonData, _ := json.MarshalIndent(snapshot, "", "  ")
	fmt.Printf("\nSnapshot JSON:\n%s\n", string(jsonData)[:200]+"...")
}
```

---

## Complexity Analysis

| Operation | Time Complexity | Space Complexity | Notes |
|-----------|-----------------|------------------|-------|
| Move snake | O(1) | O(1) | Deque operations |
| Self-collision check | O(1) | O(n) | HashSet lookup, n = snake length |
| Boundary check | O(1) | O(1) | Simple comparison |
| Food spawn (naive) | O(W*H) | O(W*H) | W=width, H=height |
| Food spawn (optimized) | O(1) | O(W*H) | Maintained empty set |
| Render | O(W*H + n) | O(W*H) | Grid creation + snake overlay |
| Serialize state | O(n) | O(n) | Snake body copying |

**Overall per-tick complexity: O(1)** with optimized food spawner and HashSet collision detection.

---

## Related Topics

- [[deque]](/topic/data-structures/deque) - Double-ended queue for O(1) body management
- [[hash-set]](/topic/data-structures/hash-set) - O(1) collision detection
- [[state-machine]](/topic/design-patterns/state-machine) - Game state transitions
- [[event-sourcing]](/topic/system-design/event-sourcing) - Replay system design
- [[spatial-partitioning]](/topic/algorithms/spatial-partitioning) - Multiplayer collision optimization
- [[game-loop]](/topic/game-dev/game-loop) - Fixed vs variable time step patterns
