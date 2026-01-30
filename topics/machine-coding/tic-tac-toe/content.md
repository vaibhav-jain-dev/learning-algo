# Tic Tac Toe - Machine Coding Deep Dive

## Problem Statement

Design a production-ready Tic Tac Toe game supporting two players on an NxN board with configurable win conditions, O(1) win detection, undo functionality, and an unbeatable AI opponent using game theory.

<div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
<h4 style="color: #dc2626; margin-top: 0;">Why This Problem Matters in Interviews</h4>
<p style="color: #1e293b;">Tic Tac Toe tests your ability to design clean abstractions, optimize algorithmic complexity, implement game theory (minimax), and handle state management - all core skills for building interactive systems, game engines, and decision-making algorithms.</p>
</div>

---

## Core Architecture Overview

<div style="background: #eff6ff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<div style="display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px;">

<div style="background: #f0fdf4; border-left: 3px solid #22c55e; padding: 16px 24px; border-radius: 8px; text-align: center; min-width: 140px;">
<div style="color: #fff; font-weight: bold; font-size: 14px;">Game State Manager</div>
<div style="color: #166534; font-size: 12px; margin-top: 8px;">Board, Players, History</div>
</div>

<div style="color: #1e40af; font-size: 24px; display: flex; align-items: center;">&#8594;</div>

<div style="background: #eff6ff; border-left: 3px solid #3b82f6; padding: 16px 24px; border-radius: 8px; text-align: center; min-width: 140px;">
<div style="color: #fff; font-weight: bold; font-size: 14px;">Win Detector</div>
<div style="color: #1e40af; font-size: 12px; margin-top: 8px;">O(1) Counter System</div>
</div>

<div style="color: #1e40af; font-size: 24px; display: flex; align-items: center;">&#8594;</div>

<div style="background: #f5f3ff; border-left: 3px solid #8b5cf6; padding: 16px 24px; border-radius: 8px; text-align: center; min-width: 140px;">
<div style="color: #fff; font-weight: bold; font-size: 14px;">AI Engine</div>
<div style="color: #5b21b6; font-size: 12px; margin-top: 8px;">Minimax + Alpha-Beta</div>
</div>

</div>
</div>

---

## Section 1: Game State Management

### The State Machine Model

Tic Tac Toe is fundamentally a [[finite state machine]](/topics/system-design/state-machines) with deterministic transitions. Understanding this model is critical for building maintainable game logic.

<div style="background: #f0fdf4; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">State Transition Diagram</h4>
<div style="display: flex; flex-direction: column; gap: 12px; padding: 16px;">

<div style="display: flex; align-items: center; gap: 16px;">
<div style="background: #f8fafc; padding: 12px 20px; border-radius: 6px; border: 2px solid #3b82f6; color: #1e40af; font-weight: bold;">INITIALIZED</div>
<div style="color: #64748b;">&#8594; Player X's turn</div>
<div style="background: #f8fafc; padding: 12px 20px; border-radius: 6px; border: 2px solid #22c55e; color: #22c55e; font-weight: bold;">IN_PROGRESS</div>
</div>

<div style="display: flex; align-items: center; gap: 16px; margin-left: 40px;">
<div style="background: #f8fafc; padding: 12px 20px; border-radius: 6px; border: 2px solid #22c55e; color: #22c55e; font-weight: bold;">IN_PROGRESS</div>
<div style="color: #64748b;">&#8594; Win detected</div>
<div style="background: #f8fafc; padding: 12px 20px; border-radius: 6px; border: 2px solid #ef4444; color: #ef4444; font-weight: bold;">X_WINS | O_WINS</div>
</div>

<div style="display: flex; align-items: center; gap: 16px; margin-left: 40px;">
<div style="background: #f8fafc; padding: 12px 20px; border-radius: 6px; border: 2px solid #22c55e; color: #22c55e; font-weight: bold;">IN_PROGRESS</div>
<div style="color: #64748b;">&#8594; Board full, no winner</div>
<div style="background: #f8fafc; padding: 12px 20px; border-radius: 6px; border: 2px solid #f97316; color: #c2410c; font-weight: bold;">DRAW</div>
</div>

</div>
</div>

### Core Data Structures

```python
from enum import Enum
from typing import Optional, List, Tuple
from dataclasses import dataclass, field
from abc import ABC, abstractmethod


class Player(Enum):
    """
    Enum representation ensures type safety and prevents invalid player values.

    Design Decision: Using Enum over strings/integers provides:
    - Compile-time checking in typed languages
    - Exhaustive pattern matching
    - Self-documenting code
    """
    X = 'X'
    O = 'O'

    @property
    def opponent(self) -> 'Player':
        """O(1) opponent lookup - avoids conditional branching."""
        return Player.O if self == Player.X else Player.X


class GameState(Enum):
    """
    Explicit terminal states enable clean state machine logic.

    Assumption: Game cannot be "paused" - only terminal or in-progress.
    Trade-off: Adding PAUSED state would require persistence layer.
    """
    IN_PROGRESS = "in_progress"
    X_WINS = "x_wins"
    O_WINS = "o_wins"
    DRAW = "draw"

    @property
    def is_terminal(self) -> bool:
        return self != GameState.IN_PROGRESS


@dataclass(frozen=True)
class Move:
    """
    Immutable move record for history tracking.

    frozen=True ensures moves cannot be modified after creation,
    which is critical for reliable undo operations.
    """
    row: int
    col: int
    player: Player
    timestamp: float = field(default_factory=lambda: __import__('time').time())

    def __post_init__(self):
        if self.row < 0 or self.col < 0:
            raise ValueError("Move coordinates must be non-negative")
```

<div style="background: #f0fdf4; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Key Assumption</h4>
<p style="color: #1e293b;">The board is represented as a 2D array where <code>None</code> indicates an empty cell. This choice enables O(1) cell access but requires O(n^2) space. For sparse boards (large N with few moves), a <strong>dictionary-based representation</strong> <code>{(row, col): Player}</code> would be more memory-efficient.</p>
</div>

### The Command Pattern for Move History

Implementing undo/redo requires the [[Command Pattern]](/topics/design-patterns/command):

```python
@dataclass
class GameSnapshot:
    """
    Complete game state for undo/redo operations.

    Design Choice: Full snapshot vs. incremental delta
    - Snapshot: Simpler, O(n^2) space per move
    - Delta: Complex, O(1) space per move

    For Tic Tac Toe (small board), snapshots are acceptable.
    For Go/Chess, deltas are necessary.
    """
    board: List[List[Optional[Player]]]
    current_player: Player
    state: GameState
    moves_count: int
    # Counter state for O(1) win detection
    rows: dict
    cols: dict
    diag: dict
    anti_diag: dict


class TicTacToe:
    """
    Main game controller implementing state management with O(1) win detection.

    Invariants maintained:
    1. current_player alternates X -> O -> X unless game ends
    2. moves_count == number of non-None cells on board
    3. Counter sums always reflect board state
    """

    def __init__(self, n: int = 3):
        if n < 2:
            raise ValueError("Board size must be at least 2")
        if n > 1000:
            raise ValueError("Board size too large - consider memory constraints")

        self.n = n
        self.board: List[List[Optional[Player]]] = [
            [None for _ in range(n)] for _ in range(n)
        ]
        self.current_player = Player.X
        self.state = GameState.IN_PROGRESS
        self.moves_count = 0
        self.move_history: List[Move] = []

        # O(1) win detection counters - the key optimization
        self._init_counters()

    def _init_counters(self) -> None:
        """
        Initialize win detection counters.

        Each counter tracks how many marks a player has in that line.
        When any counter reaches N, that player wins.

        Space: O(4n) = O(n) for rows + cols + 2 diagonals
        """
        self.rows = {Player.X: [0] * self.n, Player.O: [0] * self.n}
        self.cols = {Player.X: [0] * self.n, Player.O: [0] * self.n}
        self.diag = {Player.X: 0, Player.O: 0}      # Main diagonal
        self.anti_diag = {Player.X: 0, Player.O: 0}  # Anti-diagonal

    def make_move(self, row: int, col: int) -> GameState:
        """
        Execute a move with full validation and state update.

        Time Complexity: O(1) - all operations are constant time

        Raises:
            ValueError: If move is invalid (out of bounds, cell occupied, game over)

        Edge Cases Handled:
        - Game already over
        - Out of bounds coordinates
        - Cell already occupied
        - Last move causing win vs draw
        """
        # Validation phase - fail fast
        self._validate_move(row, col)

        # Execution phase
        player = self.current_player
        self.board[row][col] = player
        self.moves_count += 1
        self.move_history.append(Move(row, col, player))

        # Update counters - O(1)
        self._update_counters(row, col, player, delta=1)

        # State transition - O(1) win check
        if self._check_win(player, row, col):
            self.state = GameState.X_WINS if player == Player.X else GameState.O_WINS
        elif self.moves_count == self.n * self.n:
            self.state = GameState.DRAW
        else:
            self.current_player = player.opponent

        return self.state

    def _validate_move(self, row: int, col: int) -> None:
        """Centralized validation with descriptive error messages."""
        if self.state.is_terminal:
            raise ValueError(f"Game is already over: {self.state.value}")

        if not (0 <= row < self.n and 0 <= col < self.n):
            raise ValueError(
                f"Move ({row}, {col}) out of bounds for {self.n}x{self.n} board"
            )

        if self.board[row][col] is not None:
            raise ValueError(
                f"Cell ({row}, {col}) already occupied by {self.board[row][col].value}"
            )

    def _update_counters(self, row: int, col: int, player: Player, delta: int) -> None:
        """
        Update win detection counters.

        delta = +1 for making a move
        delta = -1 for undoing a move

        Critical insight: A cell (row, col) is on the main diagonal if row == col
        A cell is on the anti-diagonal if row + col == n - 1
        Center cell of odd-sized boards is on BOTH diagonals!
        """
        self.rows[player][row] += delta
        self.cols[player][col] += delta

        if row == col:
            self.diag[player] += delta

        if row + col == self.n - 1:
            self.anti_diag[player] += delta

    def _check_win(self, player: Player, row: int, col: int) -> bool:
        """
        O(1) win detection using counter comparison.

        Only checks lines that pass through the last move position.
        This is sufficient because a win can only occur from the last move.
        """
        n = self.n
        return (
            self.rows[player][row] == n or
            self.cols[player][col] == n or
            (row == col and self.diag[player] == n) or
            (row + col == n - 1 and self.anti_diag[player] == n)
        )

    def undo(self) -> bool:
        """
        Undo the last move, restoring previous state.

        Returns False if no moves to undo.

        Invariant: After undo, game state is exactly as before the undone move.
        This is critical for minimax AI which relies on undo for backtracking.
        """
        if not self.move_history:
            return False

        move = self.move_history.pop()
        self.board[move.row][move.col] = None
        self.moves_count -= 1

        # Reverse counter updates
        self._update_counters(move.row, move.col, move.player, delta=-1)

        # Restore player and state
        self.current_player = move.player
        self.state = GameState.IN_PROGRESS

        return True

    def get_valid_moves(self) -> List[Tuple[int, int]]:
        """
        Return all legal move positions.

        Time: O(n^2) - must scan entire board

        Optimization opportunity: Maintain a set of empty cells
        for O(1) access at cost of O(1) extra maintenance per move.
        """
        if self.state.is_terminal:
            return []

        return [
            (r, c)
            for r in range(self.n)
            for c in range(self.n)
            if self.board[r][c] is None
        ]

    def clone(self) -> 'TicTacToe':
        """
        Create a deep copy for AI simulation.

        Essential for minimax: we need to explore moves without
        modifying the actual game state.
        """
        import copy
        new_game = TicTacToe(self.n)
        new_game.board = copy.deepcopy(self.board)
        new_game.current_player = self.current_player
        new_game.state = self.state
        new_game.moves_count = self.moves_count
        new_game.move_history = copy.deepcopy(self.move_history)
        new_game.rows = copy.deepcopy(self.rows)
        new_game.cols = copy.deepcopy(self.cols)
        new_game.diag = copy.deepcopy(self.diag)
        new_game.anti_diag = copy.deepcopy(self.anti_diag)
        return new_game
```

### Interview Questions - Game State Management

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #c2410c; margin-top: 0;">Level 1: Fundamentals</h4>

**Q1: Why use an Enum for Player instead of strings or integers?**

Enums provide type safety, prevent typos, enable exhaustive pattern matching, and are self-documenting. With strings, `"x"` vs `"X"` could cause bugs. With integers, `3` has no semantic meaning.

**Q2: How would you detect if the game is a draw before the board is full?**

A draw is guaranteed if neither player can complete any line. Track "blocked lines" - a line is blocked if it contains marks from both players. If all 2n+2 lines are blocked, declare a draw early.

```python
def is_guaranteed_draw(self) -> bool:
    """Check if draw is inevitable before board fills."""
    for i in range(self.n):
        # Check if row i is still winnable by either player
        if not (self.rows[Player.X][i] > 0 and self.rows[Player.O][i] > 0):
            return False
        if not (self.cols[Player.X][i] > 0 and self.cols[Player.O][i] > 0):
            return False
    # Check diagonals
    if not (self.diag[Player.X] > 0 and self.diag[Player.O] > 0):
        return False
    if not (self.anti_diag[Player.X] > 0 and self.anti_diag[Player.O] > 0):
        return False
    return True
```
</div>

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #c2410c; margin-top: 0;">Level 2: Design Trade-offs</h4>

**Q3: The current design stores the full board AND counters. Is this redundant? What are the trade-offs?**

Yes, it's redundant - the board alone is sufficient for correctness. However:
- **With counters**: O(1) win check, O(n) extra space
- **Without counters**: O(n) win check per move, O(1) less space

For n=3, difference is negligible. For n=1000, counters save 1000x time per move at cost of ~4000 integers. The trade-off favors counters for any interactive game where move latency matters.

**Q4: How would you implement redo functionality?**

Maintain two stacks: `undo_stack` and `redo_stack`. When undoing, push to redo_stack. When making a new move, clear redo_stack (branch point). When redoing, pop from redo_stack and execute.

```python
def redo(self) -> bool:
    if not self.redo_stack:
        return False
    move = self.redo_stack.pop()
    self.make_move(move.row, move.col)  # This clears redo_stack!
    return True
```

**Gotcha**: The naive implementation above has a bug - `make_move` clears `redo_stack`. Need to either bypass the clear or use a flag.
</div>

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #c2410c; margin-top: 0;">Level 3: Production Scenarios</h4>

**Q5: How would you handle concurrent players in a distributed system?**

This requires [[distributed locking]](/topics/system-design/distributed-locking) and [[optimistic concurrency]](/topics/system-design/optimistic-locking):

1. **Version Vector**: Each game state has a version number
2. **Compare-and-Swap**: Move request includes expected version
3. **Conflict Resolution**: If versions mismatch, reject move and return current state
4. **Event Sourcing**: Store moves as events, rebuild state on demand

```python
@dataclass
class MoveRequest:
    game_id: str
    row: int
    col: int
    player_id: str
    expected_version: int

def apply_move_distributed(request: MoveRequest) -> MoveResult:
    with distributed_lock(request.game_id):
        game = load_game(request.game_id)
        if game.version != request.expected_version:
            return MoveResult(success=False, current_state=game,
                            error="Stale state - another move was made")
        # Apply move...
        game.version += 1
        save_game(game)
```

**Q6: How would you persist game state for crash recovery while maintaining O(1) move performance?**

Use [[event sourcing]](/topics/system-design/event-sourcing):
- Append moves to a Write-Ahead Log (WAL) synchronously
- Periodically snapshot full state asynchronously
- On recovery: Load latest snapshot, replay moves since snapshot

The WAL append is O(1) and doesn't block the game loop. Full state reconstruction happens only on recovery.
</div>

---

## Section 2: Win Detection Algorithms

### The Counter-Based O(1) Approach

The key insight is that we don't need to check the entire board - only the lines affected by the last move.

<div style="background: #f0fdf4; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Win Lines Through Any Cell</h4>
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 16px;">

<div style="background: #eff6ff; border: 1px solid #238636; border-radius: 8px; padding: 16px;">
<div style="color: #22c55e; font-weight: bold; margin-bottom: 8px;">Standard Cell (not on diagonal)</div>
<div style="color: #64748b; font-size: 14px;">
Passes through exactly 2 lines:<br/>
- 1 horizontal row<br/>
- 1 vertical column
</div>
</div>

<div style="background: #eff6ff; border: 1px solid #1f6feb; border-radius: 8px; padding: 16px;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 8px;">Main Diagonal Cell (row == col)</div>
<div style="color: #64748b; font-size: 14px;">
Passes through exactly 3 lines:<br/>
- 1 horizontal row<br/>
- 1 vertical column<br/>
- 1 main diagonal
</div>
</div>

<div style="background: #eff6ff; border: 1px solid #a371f7; border-radius: 8px; padding: 16px;">
<div style="color: #5b21b6; font-weight: bold; margin-bottom: 8px;">Anti-Diagonal Cell (row + col == n-1)</div>
<div style="color: #64748b; font-size: 14px;">
Passes through exactly 3 lines:<br/>
- 1 horizontal row<br/>
- 1 vertical column<br/>
- 1 anti-diagonal
</div>
</div>

<div style="background: #eff6ff; border: 1px solid #f0883e; border-radius: 8px; padding: 16px;">
<div style="color: #c2410c; font-weight: bold; margin-bottom: 8px;">Center Cell (odd n only)</div>
<div style="color: #64748b; font-size: 14px;">
Passes through exactly 4 lines:<br/>
- 1 horizontal row<br/>
- 1 vertical column<br/>
- 1 main diagonal<br/>
- 1 anti-diagonal
</div>
</div>

</div>
</div>

### LeetCode 348 - Optimized Single-Counter Approach

The LeetCode variant uses a clever trick: instead of separate counters per player, use signed integers where Player 1 adds +1 and Player 2 adds -1.

```python
class TicTacToeLeetCode:
    """
    LeetCode 348: Design Tic-Tac-Toe

    Space optimization: Single counter per line instead of per-player-per-line.
    Player 1: +1, Player 2: -1
    Win condition: |counter| == n

    Space: O(n) reduced from O(2n) = O(n) - same asymptotically but half the constants

    Assumption: Moves are always valid (LeetCode guarantee).
    In production, you'd still need validation.
    """

    def __init__(self, n: int):
        self.n = n
        self.rows = [0] * n
        self.cols = [0] * n
        self.diag = 0
        self.anti_diag = 0

    def move(self, row: int, col: int, player: int) -> int:
        """
        Returns:
            0 if no winner yet
            1 if player 1 wins
            2 if player 2 wins

        Time: O(1) - exactly 4 operations regardless of board size
        """
        # Delta: +1 for player 1, -1 for player 2
        delta = 1 if player == 1 else -1
        target = self.n if player == 1 else -self.n

        self.rows[row] += delta
        self.cols[col] += delta

        if row == col:
            self.diag += delta

        if row + col == self.n - 1:
            self.anti_diag += delta

        # Check all four possible winning lines
        if (self.rows[row] == target or
            self.cols[col] == target or
            self.diag == target or
            self.anti_diag == target):
            return player

        return 0
```

<div style="background: #f5f3ff; border-left: 4px solid #a371f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
<h4 style="color: #5b21b6; margin-top: 0;">Trade-off Analysis: Two Counters vs Signed Counter</h4>
<table style="width: 100%; color: #1e293b; border-collapse: collapse;">
<tr style="border-bottom: 1px solid #e2e8f0;">
<th style="text-align: left; padding: 8px;">Aspect</th>
<th style="text-align: left; padding: 8px;">Two Counters</th>
<th style="text-align: left; padding: 8px;">Signed Counter</th>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 8px;">Space</td>
<td style="padding: 8px;">4n + 4 integers</td>
<td style="padding: 8px;">2n + 2 integers</td>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 8px;">Undo Support</td>
<td style="padding: 8px;">Easy (decrement)</td>
<td style="padding: 8px;">Easy (subtract delta)</td>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 8px;">Draw Detection</td>
<td style="padding: 8px;">Check both counters > 0</td>
<td style="padding: 8px;">Cannot detect blocked lines</td>
</tr>
<tr>
<td style="padding: 8px;">Extensibility</td>
<td style="padding: 8px;">Supports 3+ players</td>
<td style="padding: 8px;">Only 2 players</td>
</tr>
</table>
</div>

### Alternative: Direction-Based Win Check (for M-in-a-row)

When win condition differs from board size (e.g., 5-in-a-row on a 15x15 Gomoku board), counters don't work. We need direction scanning:

```python
class MInARowWinDetector:
    """
    Win detection for configurable M-in-a-row on NxN board.

    Use case: Gomoku (15x15 board, 5 in a row wins)

    Time Complexity: O(m) per move - must scan up to m cells in each direction
    Cannot be reduced to O(1) because the position of the winning sequence
    within a line can vary.
    """

    # Direction vectors: (delta_row, delta_col)
    DIRECTIONS = [
        (0, 1),   # Horizontal (right)
        (1, 0),   # Vertical (down)
        (1, 1),   # Diagonal (down-right)
        (1, -1),  # Anti-diagonal (down-left)
    ]

    def __init__(self, n: int, m: int):
        if m > n:
            raise ValueError(f"Win condition {m} cannot exceed board size {n}")
        self.n = n
        self.m = m
        self.board: List[List[Optional[Player]]] = [
            [None] * n for _ in range(n)
        ]

    def check_win_at(self, row: int, col: int, player: Player) -> bool:
        """
        Check if placing at (row, col) creates M-in-a-row.

        Algorithm:
        1. For each of the 4 directions
        2. Count consecutive marks in positive direction
        3. Count consecutive marks in negative direction
        4. Total = 1 (current) + positive + negative
        5. If total >= M, player wins
        """
        for dr, dc in self.DIRECTIONS:
            count = 1  # The piece just placed

            # Count in positive direction
            count += self._count_direction(row, col, dr, dc, player)

            # Count in negative direction
            count += self._count_direction(row, col, -dr, -dc, player)

            if count >= self.m:
                return True

        return False

    def _count_direction(
        self,
        row: int,
        col: int,
        dr: int,
        dc: int,
        player: Player
    ) -> int:
        """Count consecutive marks from (row, col) in direction (dr, dc)."""
        count = 0
        r, c = row + dr, col + dc

        while (0 <= r < self.n and
               0 <= c < self.n and
               self.board[r][c] == player):
            count += 1
            r += dr
            c += dc

            # Optimization: stop early if we've found enough
            if count >= self.m - 1:
                break

        return count
```

### Interview Questions - Win Detection

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #c2410c; margin-top: 0;">Level 1: Fundamentals</h4>

**Q1: Why is the center cell special for win detection?**

The center cell (for odd-sized boards) lies on both diagonals. Position (n//2, n//2) satisfies both:
- `row == col` (main diagonal condition)
- `row + col == n - 1` (anti-diagonal condition when n is odd)

This means a move on the center affects 4 counters instead of 2, making it strategically the most powerful position.

**Q2: Can we achieve O(1) win detection for M-in-a-row where M != N?**

No. The fundamental problem is that the winning sequence can start anywhere along the line. With N-in-a-row, there's only one possible sequence per line. With M < N, there are N - M + 1 possible positions, and we must find which one (if any) is complete.

However, we can optimize to O(M) instead of O(N) by only checking M cells in each direction from the last move.
</div>

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #c2410c; margin-top: 0;">Level 2: Algorithm Optimization</h4>

**Q3: How would you modify the counter approach to detect "three corners" as an alternate win condition?**

Corners are fixed positions: (0,0), (0,n-1), (n-1,0), (n-1,n-1). Add dedicated corner counters:

```python
def __init__(self, n):
    # ... existing counters ...
    self.corners = {Player.X: 0, Player.O: 0}
    self.corner_positions = {(0,0), (0,n-1), (n-1,0), (n-1,n-1)}

def _update_counters(self, row, col, player, delta):
    # ... existing updates ...
    if (row, col) in self.corner_positions:
        self.corners[player] += delta
```

Win condition becomes: `... or self.corners[player] >= 3`

**Q4: The direction-based check visits cells multiple times across moves. How would you add caching?**

Maintain "streak counters" for each cell in each direction:

```python
# streak[row][col][direction] = (player, length)
# Represents the streak ending at (row, col) going in that direction

def update_streaks(self, row, col, player):
    for d, (dr, dc) in enumerate(DIRECTIONS):
        prev_r, prev_c = row - dr, col - dc
        if in_bounds(prev_r, prev_c):
            prev_streak = self.streak[prev_r][prev_c][d]
            if prev_streak[0] == player:
                self.streak[row][col][d] = (player, prev_streak[1] + 1)
            else:
                self.streak[row][col][d] = (player, 1)
```

This achieves O(1) per move at cost of O(n^2 * 4) space.
</div>

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #c2410c; margin-top: 0;">Level 3: System Design Scenarios</h4>

**Q5: You're building a spectator system where millions of users watch a game. Each move must broadcast win status. How do you scale win detection?**

The win check itself is already O(1), so the bottleneck is [[broadcasting]](/topics/system-design/pub-sub). Solutions:

1. **Fan-out on write**: After each move, push to all spectator connections
   - Latency: Excellent
   - Cost: Linear with spectators

2. **Fan-out on read with caching**: Spectators poll; cache the latest move
   - Latency: Depends on poll interval
   - Cost: Constant regardless of spectators

3. **Hierarchical broadcast**: Edge servers cache and distribute regionally
   - Best of both worlds for global scale

The win detection result should be included in the move event, computed once at the source.

**Q6: How would you implement win detection for a 3D Tic Tac Toe (NxNxN cube)?**

In 3D, we have:
- 3N^2 rows (N^2 lines in each of 3 orientations)
- 6N + 4 diagonals (face diagonals + space diagonals)

The counter approach extends naturally but requires more counters:

```python
# 3D counters
self.xy_planes = [[0] * n for _ in range(n)]  # n^2 horizontal lines per z
self.xz_planes = [[0] * n for _ in range(n)]  # n^2 lines per y
self.yz_planes = [[0] * n for _ in range(n)]  # n^2 lines per x

# Face diagonals: 6 faces * 2 diagonals = 12 counters
# Space diagonals: 4 counters (corner to corner through center)
self.space_diagonals = [0] * 4
```

A cell (x, y, z) is on a space diagonal if:
- x == y == z (main space diagonal)
- x == y == n-1-z (etc. for other 3)
</div>

---

## Section 3: NxN Board Extensibility

### Architectural Considerations

<div style="background: #f0fdf4; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Scaling Dimensions</h4>
<table style="width: 100%; color: #1e293b; border-collapse: collapse;">
<tr style="border-bottom: 1px solid #e2e8f0;">
<th style="text-align: left; padding: 12px;">Board Size</th>
<th style="text-align: left; padding: 12px;">Total States</th>
<th style="text-align: left; padding: 12px;">AI Feasibility</th>
<th style="text-align: left; padding: 12px;">Typical Use</th>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 12px;">3x3</td>
<td style="padding: 12px;">~5,500</td>
<td style="padding: 12px; color: #22c55e;">Perfect play (minimax)</td>
<td style="padding: 12px;">Classic game</td>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 12px;">4x4</td>
<td style="padding: 12px;">~6 million</td>
<td style="padding: 12px; color: #22c55e;">Perfect play with pruning</td>
<td style="padding: 12px;">Extended variant</td>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 12px;">5x5 (4 to win)</td>
<td style="padding: 12px;">~10^12</td>
<td style="padding: 12px; color: #c2410c;">Heuristic required</td>
<td style="padding: 12px;">Gomoku variant</td>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 12px;">15x15 (5 to win)</td>
<td style="padding: 12px;">~3^225</td>
<td style="padding: 12px; color: #ef4444;">MCTS or neural nets</td>
<td style="padding: 12px;">Gomoku</td>
</tr>
<tr>
<td style="padding: 12px;">19x19 (5 to win)</td>
<td style="padding: 12px;">~3^361</td>
<td style="padding: 12px; color: #ef4444;">AlphaGo-style</td>
<td style="padding: 12px;">Go (different rules)</td>
</tr>
</table>
</div>

### Configurable Win Conditions

```python
class ConfigurableTicTacToe:
    """
    NxN board with M-in-a-row win condition.

    Design decisions:
    1. M <= N enforced (can't win with more than board allows)
    2. M >= 2 enforced (1-in-a-row is trivially won)
    3. Draws detected when board full OR when no winning lines possible

    Edge case: N=10, M=10 behaves like standard NxN
    Edge case: N=10, M=3 has many overlapping win possibilities
    """

    def __init__(self, n: int = 3, m: Optional[int] = None,
                 players: List[Player] = None):
        """
        Args:
            n: Board size (n x n)
            m: Win condition (m in a row). Defaults to n.
            players: List of players for multi-player support
        """
        if n < 2:
            raise ValueError("Board size must be at least 2x2")

        self.n = n
        self.m = m if m is not None else n

        if self.m > n:
            raise ValueError(f"Win condition {self.m} > board size {n}")
        if self.m < 2:
            raise ValueError("Win condition must be at least 2")

        # Multi-player support
        self.players = players or [Player.X, Player.O]
        self.current_player_idx = 0

        self.board: List[List[Optional[Player]]] = [
            [None] * n for _ in range(n)
        ]
        self.state = GameState.IN_PROGRESS
        self.moves_count = 0

        # Choose appropriate win detector
        if self.m == n:
            self._win_detector = CounterBasedWinDetector(n)
        else:
            self._win_detector = DirectionBasedWinDetector(n, self.m)

    @property
    def current_player(self) -> Player:
        return self.players[self.current_player_idx]

    def _advance_player(self) -> None:
        """Cycle to next player (supports > 2 players)."""
        self.current_player_idx = (
            (self.current_player_idx + 1) % len(self.players)
        )

    def make_move(self, row: int, col: int) -> GameState:
        """Execute move with dynamic win detection strategy."""
        # ... validation ...

        player = self.current_player
        self.board[row][col] = player
        self.moves_count += 1

        # Delegate to appropriate win detector
        if self._win_detector.check_win(self.board, row, col, player):
            self.state = self._get_win_state(player)
        elif self._is_draw():
            self.state = GameState.DRAW
        else:
            self._advance_player()

        return self.state

    def _is_draw(self) -> bool:
        """
        Check for draw condition.

        Simple: Board is full
        Advanced: No winnable lines remain (early draw detection)
        """
        if self.moves_count < self.n * self.n:
            # Board not full - check if any winnable lines exist
            # This is expensive O(n^2 * m) so we only do it periodically
            if self.moves_count > self.n * self.n * 0.7:  # After 70% full
                return not self._has_winnable_line()
            return False
        return True

    def _has_winnable_line(self) -> bool:
        """Check if any player can still win."""
        # Check all possible M-length sequences
        for r in range(self.n):
            for c in range(self.n):
                for dr, dc in [(0,1), (1,0), (1,1), (1,-1)]:
                    if self._is_line_winnable(r, c, dr, dc):
                        return True
        return False

    def _is_line_winnable(self, r: int, c: int, dr: int, dc: int) -> bool:
        """Check if the M-length line starting at (r,c) is winnable."""
        players_in_line = set()
        for i in range(self.m):
            nr, nc = r + dr * i, c + dc * i
            if not (0 <= nr < self.n and 0 <= nc < self.n):
                return False  # Line goes out of bounds
            if self.board[nr][nc] is not None:
                players_in_line.add(self.board[nr][nc])

        # Winnable if at most one player has marks in this line
        return len(players_in_line) <= 1
```

### Strategy Pattern for Win Detection

```python
from abc import ABC, abstractmethod


class WinDetector(ABC):
    """Abstract base for win detection strategies."""

    @abstractmethod
    def check_win(
        self,
        board: List[List[Optional[Player]]],
        row: int,
        col: int,
        player: Player
    ) -> bool:
        """Check if the last move at (row, col) wins for player."""
        pass

    @abstractmethod
    def update(self, row: int, col: int, player: Player, delta: int) -> None:
        """Update internal state for a move (or undo with delta=-1)."""
        pass


class CounterBasedWinDetector(WinDetector):
    """O(1) detection for N-in-a-row on NxN board."""

    def __init__(self, n: int):
        self.n = n
        self.rows = {Player.X: [0]*n, Player.O: [0]*n}
        self.cols = {Player.X: [0]*n, Player.O: [0]*n}
        self.diag = {Player.X: 0, Player.O: 0}
        self.anti_diag = {Player.X: 0, Player.O: 0}

    def check_win(self, board, row, col, player) -> bool:
        n = self.n
        return (
            self.rows[player][row] == n or
            self.cols[player][col] == n or
            (row == col and self.diag[player] == n) or
            (row + col == n - 1 and self.anti_diag[player] == n)
        )

    def update(self, row, col, player, delta) -> None:
        self.rows[player][row] += delta
        self.cols[player][col] += delta
        if row == col:
            self.diag[player] += delta
        if row + col == self.n - 1:
            self.anti_diag[player] += delta


class DirectionBasedWinDetector(WinDetector):
    """O(m) detection for M-in-a-row on NxN board."""

    DIRECTIONS = [(0, 1), (1, 0), (1, 1), (1, -1)]

    def __init__(self, n: int, m: int):
        self.n = n
        self.m = m

    def check_win(self, board, row, col, player) -> bool:
        for dr, dc in self.DIRECTIONS:
            count = 1
            count += self._count_dir(board, row, col, dr, dc, player)
            count += self._count_dir(board, row, col, -dr, -dc, player)
            if count >= self.m:
                return True
        return False

    def _count_dir(self, board, row, col, dr, dc, player) -> int:
        count = 0
        r, c = row + dr, col + dc
        while (0 <= r < self.n and 0 <= c < self.n and
               board[r][c] == player and count < self.m):
            count += 1
            r += dr
            c += dc
        return count

    def update(self, row, col, player, delta) -> None:
        pass  # Stateless - board is source of truth
```

### Interview Questions - NxN Extensibility

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #c2410c; margin-top: 0;">Level 1: Fundamentals</h4>

**Q1: What breaks when you scale from 3x3 to 100x100?**

1. **Memory**: Board alone is 10,000 cells; acceptable
2. **Win check**: O(1) with counters still works
3. **AI (minimax)**: Completely infeasible - game tree explodes
4. **Draw detection**: Scanning all lines becomes O(n^2) per check
5. **Rendering**: Console output becomes impractical

**Q2: For a 10x10 board with 4-in-a-row, what's the maximum number of ways a single move can contribute to a win?**

Each direction can have up to 4 winning sequences passing through a cell:
- Horizontal: cells at positions (col-3, col-2, col-1, col) through (col, col+1, col+2, col+3)
- Same for vertical and two diagonals

Maximum: 4 directions x 4 sequences = 16 potential winning contributions.
For a center cell, it could complete any of these 16.
</div>

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #c2410c; margin-top: 0;">Level 2: Architecture Decisions</h4>

**Q3: How would you implement "Misere" Tic Tac Toe (getting N-in-a-row LOSES)?**

Minimal change - just invert the win detection outcome:

```python
def make_move(self, row, col):
    # ... existing logic ...
    if self._check_win(player, row, col):
        # Player who completed N-in-a-row LOSES
        self.state = GameState.O_WINS if player == Player.X else GameState.X_WINS
```

For AI, also invert the evaluation function - maximize opponent's winning moves.

**Q4: Design the system to support multiple game variants (standard, misere, 3D, hex) with minimal code duplication.**

Use the [[Strategy Pattern]](/topics/design-patterns/strategy) for pluggable components:

```python
class GameEngine:
    def __init__(
        self,
        board: BoardInterface,
        win_detector: WinDetectorInterface,
        move_validator: ValidatorInterface,
        state_evaluator: EvaluatorInterface  # For AI
    ):
        self.board = board
        self.win_detector = win_detector
        self.validator = move_validator
        self.evaluator = state_evaluator
```

Variants only need to provide their own implementations of these interfaces.
</div>

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #c2410c; margin-top: 0;">Level 3: Performance at Scale</h4>

**Q5: You need to support 1000x1000 boards for a massively multiplayer variant. What architectural changes are needed?**

1. **Sparse board representation**: Use `Dict[(row, col), Player]` instead of 2D array
   - 10^6 cells but typically < 1000 occupied

2. **Chunked win detection**: Divide board into regions, only check affected region

3. **Lazy loading**: For networked games, only load visible portion

4. **Distributed state**: Shard board across servers by region

```python
class SparseBoard:
    def __init__(self, n: int):
        self.n = n
        self.cells: Dict[Tuple[int, int], Player] = {}

    def get(self, row: int, col: int) -> Optional[Player]:
        return self.cells.get((row, col))

    def set(self, row: int, col: int, player: Player) -> None:
        self.cells[(row, col)] = player

    def occupied_count(self) -> int:
        return len(self.cells)
```

**Q6: How would you implement "territory" mode where each player starts with pre-placed pieces?**

1. **Initialization hook**: `configure_initial_state(placements: List[Tuple[int, int, Player]])`
2. **Counter synchronization**: After placing initial pieces, update all counters
3. **Turn determination**: First player could be based on piece count parity
4. **Validation update**: Ensure initial placements don't already contain wins

```python
def configure_initial_state(self, placements):
    for row, col, player in placements:
        self.board[row][col] = player
        self._update_counters(row, col, player, delta=1)
        self.moves_count += 1

    # Validate no pre-existing wins
    for row, col, player in placements:
        if self._check_win(player, row, col):
            raise ValueError("Initial configuration contains a win")
```
</div>

---

## Section 4: AI Opponent (Minimax with Alpha-Beta Pruning)

### Game Theory Foundation

Tic Tac Toe is a [[zero-sum game]](/topics/algorithms/game-theory) with [[perfect information]](/topics/algorithms/game-theory). This means:

1. **Zero-sum**: One player's gain is exactly the other's loss
2. **Perfect information**: Both players see the complete game state
3. **Deterministic**: No randomness affects outcomes
4. **Finite**: Game always terminates

These properties guarantee that an optimal strategy exists and can be computed.

<div style="background: #f0fdf4; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
<h4 style="color: #1e40af; margin-top: 0;">Minimax Game Tree Concept</h4>
<div style="display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 16px;">

<div style="background: #238636; color: #fff; padding: 12px 24px; border-radius: 8px; font-weight: bold;">
MAX Layer (AI's turn) - Chooses highest value
</div>

<div style="color: #64748b; font-size: 24px;">|</div>

<div style="display: flex; gap: 40px;">
<div style="background: #1f6feb; color: #fff; padding: 10px 20px; border-radius: 6px;">Score: 0</div>
<div style="background: #1f6feb; color: #fff; padding: 10px 20px; border-radius: 6px;">Score: +10</div>
<div style="background: #1f6feb; color: #fff; padding: 10px 20px; border-radius: 6px;">Score: -10</div>
</div>

<div style="color: #64748b; font-size: 24px;">|</div>

<div style="background: #f85149; color: #fff; padding: 12px 24px; border-radius: 8px; font-weight: bold;">
MIN Layer (Opponent's turn) - Chooses lowest value
</div>

<div style="color: #64748b; font-size: 12px; margin-top: 8px;">
Scores: +10 = AI wins, -10 = Opponent wins, 0 = Draw
</div>

</div>
</div>

### Complete Minimax Implementation

```python
from typing import Optional, Tuple
from functools import lru_cache
import math


class TicTacToeAI:
    """
    Unbeatable AI using Minimax with Alpha-Beta pruning.

    Guaranteed outcomes:
    - AI plays first: AI wins or draws
    - AI plays second: AI draws (cannot force win against perfect play)

    Complexity:
    - Without pruning: O(b^d) where b=branching factor, d=depth
    - With alpha-beta: O(b^(d/2)) in best case (move ordering)
    - For 3x3: Maximum ~5500 states, but pruning reduces to ~150
    """

    def __init__(self, game: TicTacToe, ai_player: Player = Player.O):
        self.game = game
        self.ai_player = ai_player
        self.human_player = ai_player.opponent
        self.nodes_evaluated = 0  # For performance analysis

    def get_best_move(self) -> Optional[Tuple[int, int]]:
        """
        Find the optimal move for the AI player.

        Returns None if game is over or not AI's turn.

        Implementation note: We try center and corners first
        as these are strategically stronger, improving pruning.
        """
        if self.game.state.is_terminal:
            return None

        if self.game.current_player != self.ai_player:
            return None

        self.nodes_evaluated = 0
        best_score = -math.inf
        best_move = None
        alpha = -math.inf
        beta = math.inf

        # Move ordering for better pruning
        moves = self._order_moves(self.game.get_valid_moves())

        for row, col in moves:
            self.game.make_move(row, col)
            score = self._minimax(
                depth=0,
                is_maximizing=False,  # Next move is opponent's
                alpha=alpha,
                beta=beta
            )
            self.game.undo()

            if score > best_score:
                best_score = score
                best_move = (row, col)

            alpha = max(alpha, score)

        return best_move

    def _order_moves(self, moves: List[Tuple[int, int]]) -> List[Tuple[int, int]]:
        """
        Order moves for better alpha-beta pruning.

        Strategic priority:
        1. Center (highest connectivity)
        2. Corners (second highest)
        3. Edges (lowest strategic value)

        This ordering can reduce nodes evaluated by 50%+
        """
        n = self.game.n
        center = n // 2

        def priority(move):
            r, c = move
            if r == center and c == center:
                return 0  # Highest priority
            if (r in (0, n-1)) and (c in (0, n-1)):
                return 1  # Corners
            return 2  # Edges

        return sorted(moves, key=priority)

    def _minimax(
        self,
        depth: int,
        is_maximizing: bool,
        alpha: float,
        beta: float
    ) -> int:
        """
        Minimax algorithm with alpha-beta pruning.

        Args:
            depth: Current search depth (for depth-preferring scores)
            is_maximizing: True if AI's turn (maximize), False if opponent's
            alpha: Best score AI can guarantee (lower bound)
            beta: Best score opponent can guarantee (upper bound)

        Returns:
            Score evaluation: positive favors AI, negative favors opponent

        The depth parameter is crucial: we prefer winning sooner
        and losing later, so we subtract depth from win scores.
        """
        self.nodes_evaluated += 1

        # Terminal state evaluation
        if self.game.state.is_terminal:
            return self._evaluate_terminal(depth)

        if is_maximizing:
            max_score = -math.inf
            for row, col in self._order_moves(self.game.get_valid_moves()):
                self.game.make_move(row, col)
                score = self._minimax(depth + 1, False, alpha, beta)
                self.game.undo()

                max_score = max(max_score, score)
                alpha = max(alpha, score)

                # Beta cutoff - opponent won't allow this branch
                if beta <= alpha:
                    break

            return max_score
        else:
            min_score = math.inf
            for row, col in self._order_moves(self.game.get_valid_moves()):
                self.game.make_move(row, col)
                score = self._minimax(depth + 1, True, alpha, beta)
                self.game.undo()

                min_score = min(min_score, score)
                beta = min(beta, score)

                # Alpha cutoff - AI won't allow this branch
                if beta <= alpha:
                    break

            return min_score

    def _evaluate_terminal(self, depth: int) -> int:
        """
        Evaluate a terminal game state.

        Scoring:
        - AI wins: +10 - depth (prefer faster wins)
        - Opponent wins: -10 + depth (prefer slower losses)
        - Draw: 0

        The depth adjustment ensures the AI:
        1. Takes immediate wins over delayed wins
        2. Delays losses as long as possible (opponent might blunder)
        """
        if self.game.state == GameState.DRAW:
            return 0

        # Determine winner
        winner = (Player.X if self.game.state == GameState.X_WINS
                  else Player.O)

        if winner == self.ai_player:
            return 10 - depth  # Win sooner is better
        else:
            return depth - 10  # Lose later is better

    def analyze_position(self) -> dict:
        """
        Analyze current position for debugging/UI.

        Returns evaluation and best line of play.
        """
        if self.game.state.is_terminal:
            return {"terminal": True, "state": self.game.state}

        move = self.get_best_move()

        return {
            "best_move": move,
            "nodes_evaluated": self.nodes_evaluated,
            "position_score": self._get_position_score(),
        }

    def _get_position_score(self) -> int:
        """Get static position score without full search."""
        self.game.make_move(*self.get_best_move())
        score = self._minimax(0, False, -math.inf, math.inf)
        self.game.undo()
        return score
```

### Advanced: Transposition Tables and Memoization

For larger boards, we need [[memoization]](/topics/algorithms/dynamic-programming) to avoid recomputing identical positions:

```python
class TicTacToeAIWithMemo:
    """
    Enhanced AI with transposition table (memoization).

    Key insight: Many move sequences lead to the same board position.
    Example: X(0,0)->O(1,1)->X(0,1) == X(0,1)->O(1,1)->X(0,0)

    Transposition table stores: board_hash -> (score, depth)
    This can reduce computation by 80%+ for 4x4 boards.
    """

    def __init__(self, game: TicTacToe, ai_player: Player = Player.O):
        self.game = game
        self.ai_player = ai_player
        self.transposition_table: Dict[int, Tuple[int, int, int]] = {}
        # Entry format: (score, depth, flag) where flag indicates bound type
        self.EXACT = 0
        self.LOWER = 1  # Alpha cutoff
        self.UPPER = 2  # Beta cutoff

    def _board_hash(self) -> int:
        """
        Compute hash of current board state.

        Using tuple of tuples for immutability and hashability.
        For larger boards, consider Zobrist hashing for O(1) incremental updates.
        """
        return hash(tuple(
            tuple(cell.value if cell else '.' for cell in row)
            for row in self.game.board
        ))

    def _minimax_with_tt(
        self,
        depth: int,
        is_max: bool,
        alpha: float,
        beta: float
    ) -> int:
        """Minimax with transposition table lookup."""

        # Check transposition table
        board_hash = self._board_hash()
        if board_hash in self.transposition_table:
            tt_score, tt_depth, tt_flag = self.transposition_table[board_hash]

            if tt_depth >= depth:  # Stored result is deep enough
                if tt_flag == self.EXACT:
                    return tt_score
                elif tt_flag == self.LOWER and tt_score > alpha:
                    alpha = tt_score
                elif tt_flag == self.UPPER and tt_score < beta:
                    beta = tt_score

                if alpha >= beta:
                    return tt_score

        # Terminal check
        if self.game.state.is_terminal:
            return self._evaluate_terminal(depth)

        # ... standard minimax logic ...

        # Store result in transposition table
        if best_score <= alpha:
            flag = self.UPPER
        elif best_score >= beta:
            flag = self.LOWER
        else:
            flag = self.EXACT

        self.transposition_table[board_hash] = (best_score, depth, flag)

        return best_score
```

### Zobrist Hashing for Incremental Updates

```python
import random


class ZobristHasher:
    """
    Zobrist hashing for O(1) incremental board hash updates.

    Concept: Each (position, piece) combination has a random number.
    Board hash = XOR of all pieces' random numbers.

    Incremental update: hash ^= zobrist[pos][old_piece] ^ zobrist[pos][new_piece]

    This avoids O(n^2) rehashing after every move.
    """

    def __init__(self, n: int, seed: int = 42):
        random.seed(seed)  # Reproducible for debugging

        # Random values for each (row, col, player) combination
        self.table = {
            Player.X: [[random.getrandbits(64) for _ in range(n)] for _ in range(n)],
            Player.O: [[random.getrandbits(64) for _ in range(n)] for _ in range(n)],
        }

        # Random value for "whose turn" - changes every move
        self.turn_key = random.getrandbits(64)

        self.current_hash = 0

    def make_move(self, row: int, col: int, player: Player) -> int:
        """Update hash for a move. Returns new hash."""
        self.current_hash ^= self.table[player][row][col]
        self.current_hash ^= self.turn_key
        return self.current_hash

    def undo_move(self, row: int, col: int, player: Player) -> int:
        """Undo hash update. XOR is its own inverse."""
        self.current_hash ^= self.table[player][row][col]
        self.current_hash ^= self.turn_key
        return self.current_hash
```

### Interview Questions - AI Opponent

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #c2410c; margin-top: 0;">Level 1: Fundamentals</h4>

**Q1: Why do we subtract depth from the win score?**

Without depth adjustment, the AI treats all wins equally. It might delay a guaranteed win by several moves, which:
1. Gives the opponent more chances to exploit bugs
2. Appears "stupid" to human observers
3. In time-limited games, could run out of time

By preferring `10 - depth` over `10 - (depth + 2)`, the AI takes immediate wins.

**Q2: What happens if we use DFS instead of minimax?**

DFS doesn't consider opponent strategy - it just explores one path. Minimax assumes the opponent plays optimally (worst case for us). DFS might find a winning path that relies on opponent mistakes, which a perfect opponent won't make.
</div>

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #c2410c; margin-top: 0;">Level 2: Algorithm Optimization</h4>

**Q3: Alpha-beta pruning depends on move ordering. How would you learn good move ordering?**

1. **History heuristic**: Track which moves caused cutoffs historically. Moves that frequently cause cutoffs are likely good.

2. **Killer move heuristic**: Store moves that caused cutoffs at each depth. Try them first at the same depth in other branches.

3. **Iterative deepening**: Search to depth 1, then 2, then 3... Use move ordering from depth d-1 for depth d.

```python
def iterative_deepening_search(self, max_depth: int):
    best_move = None
    for depth in range(1, max_depth + 1):
        best_move = self._search_to_depth(depth, best_move_hint=best_move)
    return best_move
```

**Q4: How would you add difficulty levels to the AI?**

Several approaches:

1. **Depth limiting**: Easy mode searches only 2 moves ahead
2. **Epsilon-greedy**: With probability ε, pick a random move instead of optimal
3. **Temperature sampling**: Convert scores to probabilities via softmax, sample

```python
def get_move_with_difficulty(self, difficulty: float) -> Tuple[int, int]:
    """
    difficulty: 0.0 = random, 1.0 = perfect
    """
    if random.random() > difficulty:
        # Random move
        return random.choice(self.game.get_valid_moves())

    # Optimal move
    return self.get_best_move()
```
</div>

<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #c2410c; margin-top: 0;">Level 3: Advanced Techniques</h4>

**Q5: For a 10x10 board (5-in-a-row), minimax is infeasible. What alternatives exist?**

1. **Monte Carlo Tree Search (MCTS)**:
   - Random playouts to estimate position value
   - Scales to huge state spaces (used in AlphaGo)
   - Balances exploration vs exploitation

2. **Heuristic evaluation + limited depth**:
   - Define static evaluation function (material, position, threats)
   - Search only 4-6 moves ahead
   - Evaluate leaf nodes with heuristics

3. **Neural network evaluation**:
   - Train network to predict game outcome from position
   - Use as evaluation function in shallow search

```python
def heuristic_evaluate(self, board) -> float:
    """
    Static evaluation for non-terminal positions.

    Features:
    - Number of open lines (can still win)
    - Threats (3-in-a-row with open ends)
    - Center control
    """
    score = 0

    # Count open lines for each player
    for player in [Player.X, Player.O]:
        multiplier = 1 if player == self.ai_player else -1

        open_fours = self._count_open_n(board, player, 4)
        open_threes = self._count_open_n(board, player, 3)
        open_twos = self._count_open_n(board, player, 2)

        score += multiplier * (open_fours * 100 + open_threes * 10 + open_twos)

    return score
```

**Q6: Explain how you would implement negamax as a simplification of minimax.**

Negamax exploits the zero-sum property: `max(a, b) = -min(-a, -b)`

Instead of separate maximizing and minimizing logic, always maximize but negate the recursive result:

```python
def negamax(self, depth: int, alpha: float, beta: float, sign: int) -> int:
    """
    Negamax: simplified minimax using score negation.

    sign: +1 if current player is AI, -1 if opponent
    """
    if self.game.state.is_terminal:
        return sign * self._evaluate_terminal(depth)

    best = -math.inf
    for move in self.game.get_valid_moves():
        self.game.make_move(*move)
        # Key insight: negate both the result AND swap alpha/beta
        score = -self.negamax(depth + 1, -beta, -alpha, -sign)
        self.game.undo()

        best = max(best, score)
        alpha = max(alpha, score)
        if alpha >= beta:
            break

    return best
```

This halves the code while maintaining identical behavior.
</div>

---

## Complete Implementation - Go

```go
package tictactoe

import (
	"errors"
	"fmt"
	"math"
)

// Player represents a game participant
type Player int

const (
	Empty Player = iota
	PlayerX
	PlayerO
)

func (p Player) String() string {
	switch p {
	case PlayerX:
		return "X"
	case PlayerO:
		return "O"
	default:
		return " "
	}
}

func (p Player) Opponent() Player {
	if p == PlayerX {
		return PlayerO
	}
	return PlayerX
}

// GameState represents the current game status
type GameState int

const (
	InProgress GameState = iota
	XWins
	OWins
	Draw
)

func (s GameState) IsTerminal() bool {
	return s != InProgress
}

// Move represents a single game action
type Move struct {
	Row    int
	Col    int
	Player Player
}

// TicTacToe is the main game controller
type TicTacToe struct {
	N             int
	Board         [][]Player
	CurrentPlayer Player
	State         GameState
	MovesCount    int
	MoveHistory   []Move

	// O(1) win detection counters
	rows     map[Player][]int
	cols     map[Player][]int
	diag     map[Player]int
	antiDiag map[Player]int
}

// NewTicTacToe creates a new game with the specified board size
func NewTicTacToe(n int) (*TicTacToe, error) {
	if n < 2 {
		return nil, errors.New("board size must be at least 2")
	}

	board := make([][]Player, n)
	for i := range board {
		board[i] = make([]Player, n)
	}

	return &TicTacToe{
		N:             n,
		Board:         board,
		CurrentPlayer: PlayerX,
		State:         InProgress,
		rows: map[Player][]int{
			PlayerX: make([]int, n),
			PlayerO: make([]int, n),
		},
		cols: map[Player][]int{
			PlayerX: make([]int, n),
			PlayerO: make([]int, n),
		},
		diag:     map[Player]int{PlayerX: 0, PlayerO: 0},
		antiDiag: map[Player]int{PlayerX: 0, PlayerO: 0},
	}, nil
}

// MakeMove executes a move with full validation
func (g *TicTacToe) MakeMove(row, col int) (GameState, error) {
	if err := g.validateMove(row, col); err != nil {
		return g.State, err
	}

	player := g.CurrentPlayer
	g.Board[row][col] = player
	g.MovesCount++
	g.MoveHistory = append(g.MoveHistory, Move{row, col, player})

	g.updateCounters(row, col, player, 1)

	if g.checkWin(player, row, col) {
		if player == PlayerX {
			g.State = XWins
		} else {
			g.State = OWins
		}
	} else if g.MovesCount == g.N*g.N {
		g.State = Draw
	} else {
		g.CurrentPlayer = player.Opponent()
	}

	return g.State, nil
}

func (g *TicTacToe) validateMove(row, col int) error {
	if g.State.IsTerminal() {
		return fmt.Errorf("game is already over: %v", g.State)
	}
	if row < 0 || row >= g.N || col < 0 || col >= g.N {
		return fmt.Errorf("move (%d, %d) out of bounds", row, col)
	}
	if g.Board[row][col] != Empty {
		return fmt.Errorf("cell (%d, %d) already occupied", row, col)
	}
	return nil
}

func (g *TicTacToe) updateCounters(row, col int, player Player, delta int) {
	g.rows[player][row] += delta
	g.cols[player][col] += delta
	if row == col {
		g.diag[player] += delta
	}
	if row+col == g.N-1 {
		g.antiDiag[player] += delta
	}
}

func (g *TicTacToe) checkWin(player Player, row, col int) bool {
	n := g.N
	return g.rows[player][row] == n ||
		g.cols[player][col] == n ||
		(row == col && g.diag[player] == n) ||
		(row+col == n-1 && g.antiDiag[player] == n)
}

// Undo reverses the last move
func (g *TicTacToe) Undo() bool {
	if len(g.MoveHistory) == 0 {
		return false
	}

	move := g.MoveHistory[len(g.MoveHistory)-1]
	g.MoveHistory = g.MoveHistory[:len(g.MoveHistory)-1]

	g.Board[move.Row][move.Col] = Empty
	g.MovesCount--
	g.updateCounters(move.Row, move.Col, move.Player, -1)
	g.CurrentPlayer = move.Player
	g.State = InProgress

	return true
}

// GetValidMoves returns all legal move positions
func (g *TicTacToe) GetValidMoves() [][2]int {
	if g.State.IsTerminal() {
		return nil
	}

	var moves [][2]int
	for r := 0; r < g.N; r++ {
		for c := 0; c < g.N; c++ {
			if g.Board[r][c] == Empty {
				moves = append(moves, [2]int{r, c})
			}
		}
	}
	return moves
}

// AI implements minimax with alpha-beta pruning
type AI struct {
	game      *TicTacToe
	aiPlayer  Player
	evaluated int
}

// NewAI creates an AI opponent
func NewAI(game *TicTacToe, player Player) *AI {
	return &AI{
		game:     game,
		aiPlayer: player,
	}
}

// GetBestMove returns the optimal move for the AI
func (ai *AI) GetBestMove() (*[2]int, error) {
	if ai.game.State.IsTerminal() {
		return nil, errors.New("game is over")
	}
	if ai.game.CurrentPlayer != ai.aiPlayer {
		return nil, errors.New("not AI's turn")
	}

	ai.evaluated = 0
	bestScore := math.Inf(-1)
	var bestMove *[2]int

	for _, move := range ai.orderMoves(ai.game.GetValidMoves()) {
		ai.game.MakeMove(move[0], move[1])
		score := ai.minimax(0, false, math.Inf(-1), math.Inf(1))
		ai.game.Undo()

		if score > bestScore {
			bestScore = score
			m := move
			bestMove = &m
		}
	}

	return bestMove, nil
}

func (ai *AI) orderMoves(moves [][2]int) [][2]int {
	// Prioritize center and corners for better pruning
	center := ai.game.N / 2
	n := ai.game.N

	priority := func(m [2]int) int {
		r, c := m[0], m[1]
		if r == center && c == center {
			return 0
		}
		if (r == 0 || r == n-1) && (c == 0 || c == n-1) {
			return 1
		}
		return 2
	}

	// Simple bubble sort for small move lists
	for i := 0; i < len(moves)-1; i++ {
		for j := i + 1; j < len(moves); j++ {
			if priority(moves[j]) < priority(moves[i]) {
				moves[i], moves[j] = moves[j], moves[i]
			}
		}
	}

	return moves
}

func (ai *AI) minimax(depth int, isMax bool, alpha, beta float64) float64 {
	ai.evaluated++

	if ai.game.State.IsTerminal() {
		return ai.evaluateTerminal(depth)
	}

	if isMax {
		maxScore := math.Inf(-1)
		for _, move := range ai.orderMoves(ai.game.GetValidMoves()) {
			ai.game.MakeMove(move[0], move[1])
			score := ai.minimax(depth+1, false, alpha, beta)
			ai.game.Undo()

			maxScore = math.Max(maxScore, score)
			alpha = math.Max(alpha, score)
			if beta <= alpha {
				break
			}
		}
		return maxScore
	} else {
		minScore := math.Inf(1)
		for _, move := range ai.orderMoves(ai.game.GetValidMoves()) {
			ai.game.MakeMove(move[0], move[1])
			score := ai.minimax(depth+1, true, alpha, beta)
			ai.game.Undo()

			minScore = math.Min(minScore, score)
			beta = math.Min(beta, score)
			if beta <= alpha {
				break
			}
		}
		return minScore
	}
}

func (ai *AI) evaluateTerminal(depth int) float64 {
	switch ai.game.State {
	case Draw:
		return 0
	case XWins:
		if ai.aiPlayer == PlayerX {
			return 10 - float64(depth)
		}
		return float64(depth) - 10
	case OWins:
		if ai.aiPlayer == PlayerO {
			return 10 - float64(depth)
		}
		return float64(depth) - 10
	}
	return 0
}
```

---

## Complexity Summary

<div style="background: #f0fdf4; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
<table style="width: 100%; color: #1e293b; border-collapse: collapse;">
<tr style="border-bottom: 2px solid #30363d; background: #f8fafc;">
<th style="padding: 12px; text-align: left;">Operation</th>
<th style="padding: 12px; text-align: left;">Naive</th>
<th style="padding: 12px; text-align: left;">Optimized</th>
<th style="padding: 12px; text-align: left;">Notes</th>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 12px;">Make Move</td>
<td style="padding: 12px; color: #c2410c;">O(n)</td>
<td style="padding: 12px; color: #22c55e;">O(1)</td>
<td style="padding: 12px; color: #64748b;">Counter updates</td>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 12px;">Win Check (N-in-a-row)</td>
<td style="padding: 12px; color: #c2410c;">O(n)</td>
<td style="padding: 12px; color: #22c55e;">O(1)</td>
<td style="padding: 12px; color: #64748b;">Counter comparison</td>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 12px;">Win Check (M-in-a-row)</td>
<td style="padding: 12px; color: #ef4444;">O(n)</td>
<td style="padding: 12px; color: #c2410c;">O(m)</td>
<td style="padding: 12px; color: #64748b;">Direction scan</td>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 12px;">Get Valid Moves</td>
<td style="padding: 12px; color: #ef4444;">O(n^2)</td>
<td style="padding: 12px; color: #22c55e;">O(1)*</td>
<td style="padding: 12px; color: #64748b;">*With set maintenance</td>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 12px;">Undo</td>
<td style="padding: 12px; color: #22c55e;">O(1)</td>
<td style="padding: 12px; color: #22c55e;">O(1)</td>
<td style="padding: 12px; color: #64748b;">Pop from history</td>
</tr>
<tr style="border-bottom: 1px solid #21262d;">
<td style="padding: 12px;">AI (3x3)</td>
<td style="padding: 12px; color: #ef4444;">O(9!)</td>
<td style="padding: 12px; color: #22c55e;">~O(150)</td>
<td style="padding: 12px; color: #64748b;">Alpha-beta pruning</td>
</tr>
<tr>
<td style="padding: 12px;">Space</td>
<td style="padding: 12px; color: #c2410c;">O(n^2)</td>
<td style="padding: 12px; color: #c2410c;">O(n^2)</td>
<td style="padding: 12px; color: #64748b;">Board dominates</td>
</tr>
</table>
</div>

---

## Related Topics

- [[Game Theory Fundamentals]](/topics/algorithms/game-theory) - Zero-sum games, Nash equilibrium
- [[State Machine Design]](/topics/system-design/state-machines) - Modeling game states
- [[Minimax and Alpha-Beta]](/topics/algorithms/minimax) - Game tree search
- [[Monte Carlo Tree Search]](/topics/algorithms/mcts) - For larger game spaces
- [[Command Pattern]](/topics/design-patterns/command) - Undo/redo implementation
- [[Strategy Pattern]](/topics/design-patterns/strategy) - Pluggable win detection
- [[Distributed Systems]](/topics/system-design/distributed-locking) - Multiplayer synchronization
