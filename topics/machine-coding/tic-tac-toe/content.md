# Tic Tac Toe

## Problem Statement

Design a Tic Tac Toe game for two players on an NxN board. Support move validation, win detection, and optionally extend to NxN boards with configurable win conditions.

## Requirements

- NxN board (default 3x3)
- Two players (X and O)
- Move validation
- Win/draw detection
- O(1) win checking (optimized)

## Solution

### Python

```python
from enum import Enum
from typing import Optional, List, Tuple
from dataclasses import dataclass


class Player(Enum):
    X = 'X'
    O = 'O'


class GameState(Enum):
    IN_PROGRESS = "in_progress"
    X_WINS = "x_wins"
    O_WINS = "o_wins"
    DRAW = "draw"


@dataclass
class Move:
    row: int
    col: int
    player: Player


class TicTacToe:
    def __init__(self, n: int = 3):
        self.n = n
        self.board = [[None for _ in range(n)] for _ in range(n)]
        self.current_player = Player.X
        self.state = GameState.IN_PROGRESS
        self.moves_count = 0
        self.move_history: List[Move] = []

        # For O(1) win checking
        self.rows = {Player.X: [0] * n, Player.O: [0] * n}
        self.cols = {Player.X: [0] * n, Player.O: [0] * n}
        self.diag = {Player.X: 0, Player.O: 0}
        self.anti_diag = {Player.X: 0, Player.O: 0}

    def make_move(self, row: int, col: int) -> GameState:
        """Make a move. Returns game state after move."""
        # Validate move
        if self.state != GameState.IN_PROGRESS:
            raise ValueError("Game is already over")

        if not (0 <= row < self.n and 0 <= col < self.n):
            raise ValueError("Move out of bounds")

        if self.board[row][col] is not None:
            raise ValueError("Cell already occupied")

        # Make move
        player = self.current_player
        self.board[row][col] = player
        self.moves_count += 1
        self.move_history.append(Move(row, col, player))

        # Update counters for O(1) win check
        self.rows[player][row] += 1
        self.cols[player][col] += 1
        if row == col:
            self.diag[player] += 1
        if row + col == self.n - 1:
            self.anti_diag[player] += 1

        # Check win
        if self._check_win(player, row, col):
            self.state = GameState.X_WINS if player == Player.X else GameState.O_WINS
        elif self.moves_count == self.n * self.n:
            self.state = GameState.DRAW
        else:
            # Switch player
            self.current_player = Player.O if player == Player.X else Player.X

        return self.state

    def _check_win(self, player: Player, row: int, col: int) -> bool:
        """O(1) win check using counters."""
        n = self.n
        return (
            self.rows[player][row] == n or
            self.cols[player][col] == n or
            self.diag[player] == n or
            self.anti_diag[player] == n
        )

    def undo(self) -> bool:
        """Undo the last move."""
        if not self.move_history:
            return False

        move = self.move_history.pop()
        self.board[move.row][move.col] = None
        self.moves_count -= 1

        # Update counters
        self.rows[move.player][move.row] -= 1
        self.cols[move.player][move.col] -= 1
        if move.row == move.col:
            self.diag[move.player] -= 1
        if move.row + move.col == self.n - 1:
            self.anti_diag[move.player] -= 1

        self.current_player = move.player
        self.state = GameState.IN_PROGRESS
        return True

    def get_valid_moves(self) -> List[Tuple[int, int]]:
        """Get all valid moves."""
        if self.state != GameState.IN_PROGRESS:
            return []
        return [
            (r, c)
            for r in range(self.n)
            for c in range(self.n)
            if self.board[r][c] is None
        ]

    def render(self) -> str:
        """Render board as string."""
        lines = []
        for i, row in enumerate(self.board):
            cells = [cell.value if cell else ' ' for cell in row]
            lines.append(' ' + ' | '.join(cells) + ' ')
            if i < self.n - 1:
                lines.append('-' * (self.n * 4 - 1))

        status = f"\nState: {self.state.value}"
        if self.state == GameState.IN_PROGRESS:
            status += f" | Current: {self.current_player.value}"

        return '\n'.join(lines) + status


# LeetCode 348: Design Tic-Tac-Toe
class TicTacToeLC:
    """
    Optimized for O(1) move operation.
    Player 1 uses +1, Player 2 uses -1.
    """

    def __init__(self, n: int):
        self.n = n
        self.rows = [0] * n
        self.cols = [0] * n
        self.diag = 0
        self.anti_diag = 0

    def move(self, row: int, col: int, player: int) -> int:
        """
        Player makes a move.
        Returns 0 if no winner, 1 if player 1 wins, 2 if player 2 wins.
        """
        delta = 1 if player == 1 else -1
        target = self.n if player == 1 else -self.n

        self.rows[row] += delta
        self.cols[col] += delta
        if row == col:
            self.diag += delta
        if row + col == self.n - 1:
            self.anti_diag += delta

        if (self.rows[row] == target or
            self.cols[col] == target or
            self.diag == target or
            self.anti_diag == target):
            return player

        return 0


# Extended: NxN with M-in-a-row win condition
class TicTacToeNM:
    """NxN board where M in a row wins."""

    def __init__(self, n: int, m: int):
        if m > n:
            raise ValueError("M cannot be greater than N")
        self.n = n
        self.m = m
        self.board = [[None for _ in range(n)] for _ in range(n)]
        self.current_player = Player.X
        self.state = GameState.IN_PROGRESS
        self.moves_count = 0

    def make_move(self, row: int, col: int) -> GameState:
        if self.state != GameState.IN_PROGRESS:
            raise ValueError("Game is already over")

        if not (0 <= row < self.n and 0 <= col < self.n):
            raise ValueError("Move out of bounds")

        if self.board[row][col] is not None:
            raise ValueError("Cell already occupied")

        player = self.current_player
        self.board[row][col] = player
        self.moves_count += 1

        if self._check_win(row, col, player):
            self.state = GameState.X_WINS if player == Player.X else GameState.O_WINS
        elif self.moves_count == self.n * self.n:
            self.state = GameState.DRAW
        else:
            self.current_player = Player.O if player == Player.X else Player.X

        return self.state

    def _check_win(self, row: int, col: int, player: Player) -> bool:
        """Check if the move creates M in a row."""
        directions = [
            (0, 1),   # Horizontal
            (1, 0),   # Vertical
            (1, 1),   # Diagonal
            (1, -1)   # Anti-diagonal
        ]

        for dr, dc in directions:
            count = 1
            # Check positive direction
            count += self._count_direction(row, col, dr, dc, player)
            # Check negative direction
            count += self._count_direction(row, col, -dr, -dc, player)

            if count >= self.m:
                return True

        return False

    def _count_direction(self, row: int, col: int, dr: int, dc: int, player: Player) -> int:
        count = 0
        r, c = row + dr, col + dc
        while 0 <= r < self.n and 0 <= c < self.n and self.board[r][c] == player:
            count += 1
            r += dr
            c += dc
        return count


# AI Player using Minimax
class TicTacToeAI:
    def __init__(self, game: TicTacToe, ai_player: Player = Player.O):
        self.game = game
        self.ai_player = ai_player
        self.human_player = Player.O if ai_player == Player.X else Player.X

    def get_best_move(self) -> Optional[Tuple[int, int]]:
        """Get best move using minimax with alpha-beta pruning."""
        if self.game.state != GameState.IN_PROGRESS:
            return None

        best_score = float('-inf')
        best_move = None

        for row, col in self.game.get_valid_moves():
            self.game.make_move(row, col)
            score = self._minimax(0, False, float('-inf'), float('inf'))
            self.game.undo()

            if score > best_score:
                best_score = score
                best_move = (row, col)

        return best_move

    def _minimax(self, depth: int, is_maximizing: bool, alpha: float, beta: float) -> int:
        # Terminal conditions
        if self.game.state == GameState.X_WINS:
            return 10 - depth if self.ai_player == Player.X else depth - 10
        if self.game.state == GameState.O_WINS:
            return 10 - depth if self.ai_player == Player.O else depth - 10
        if self.game.state == GameState.DRAW:
            return 0

        if is_maximizing:
            best_score = float('-inf')
            for row, col in self.game.get_valid_moves():
                self.game.make_move(row, col)
                score = self._minimax(depth + 1, False, alpha, beta)
                self.game.undo()
                best_score = max(best_score, score)
                alpha = max(alpha, score)
                if beta <= alpha:
                    break
            return best_score
        else:
            best_score = float('inf')
            for row, col in self.game.get_valid_moves():
                self.game.make_move(row, col)
                score = self._minimax(depth + 1, True, alpha, beta)
                self.game.undo()
                best_score = min(best_score, score)
                beta = min(beta, score)
                if beta <= alpha:
                    break
            return best_score


# Usage
game = TicTacToe()

moves = [(0, 0), (1, 1), (0, 1), (0, 2), (2, 2), (1, 0), (1, 2), (2, 1), (2, 0)]

for row, col in moves:
    print(f"Player {game.current_player.value} plays ({row}, {col})")
    state = game.make_move(row, col)
    print(game.render())
    print()
    if state != GameState.IN_PROGRESS:
        break

# AI Demo
print("\n=== AI Game ===")
game2 = TicTacToe()
ai = TicTacToeAI(game2, Player.O)

while game2.state == GameState.IN_PROGRESS:
    print(game2.render())
    print()

    if game2.current_player == Player.X:
        # Human move (simulated)
        valid_moves = game2.get_valid_moves()
        if valid_moves:
            game2.make_move(*valid_moves[0])
    else:
        # AI move
        move = ai.get_best_move()
        if move:
            print(f"AI plays: {move}")
            game2.make_move(*move)

print("Final:")
print(game2.render())
```

### Go

```go
package main

import (
	"errors"
	"fmt"
	"strings"
)

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

type GameState int

const (
	InProgress GameState = iota
	XWins
	OWins
	Draw
)

type TicTacToe struct {
	N             int
	Board         [][]Player
	CurrentPlayer Player
	State         GameState
	MovesCount    int
	rows          map[Player][]int
	cols          map[Player][]int
	diag          map[Player]int
	antiDiag      map[Player]int
}

func NewTicTacToe(n int) *TicTacToe {
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
	}
}

func (g *TicTacToe) MakeMove(row, col int) (GameState, error) {
	if g.State != InProgress {
		return g.State, errors.New("game is already over")
	}

	if row < 0 || row >= g.N || col < 0 || col >= g.N {
		return g.State, errors.New("move out of bounds")
	}

	if g.Board[row][col] != Empty {
		return g.State, errors.New("cell already occupied")
	}

	player := g.CurrentPlayer
	g.Board[row][col] = player
	g.MovesCount++

	// Update counters
	g.rows[player][row]++
	g.cols[player][col]++
	if row == col {
		g.diag[player]++
	}
	if row+col == g.N-1 {
		g.antiDiag[player]++
	}

	// Check win
	if g.checkWin(player, row, col) {
		if player == PlayerX {
			g.State = XWins
		} else {
			g.State = OWins
		}
	} else if g.MovesCount == g.N*g.N {
		g.State = Draw
	} else {
		if player == PlayerX {
			g.CurrentPlayer = PlayerO
		} else {
			g.CurrentPlayer = PlayerX
		}
	}

	return g.State, nil
}

func (g *TicTacToe) checkWin(player Player, row, col int) bool {
	n := g.N
	return g.rows[player][row] == n ||
		g.cols[player][col] == n ||
		g.diag[player] == n ||
		g.antiDiag[player] == n
}

func (g *TicTacToe) GetValidMoves() [][2]int {
	if g.State != InProgress {
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

func (g *TicTacToe) Render() string {
	var sb strings.Builder

	for i, row := range g.Board {
		cells := make([]string, len(row))
		for j, cell := range row {
			cells[j] = cell.String()
		}
		sb.WriteString(" " + strings.Join(cells, " | ") + " \n")
		if i < g.N-1 {
			sb.WriteString(strings.Repeat("-", g.N*4-1) + "\n")
		}
	}

	sb.WriteString(fmt.Sprintf("\nState: %d | Current: %s\n", g.State, g.CurrentPlayer))
	return sb.String()
}

// LeetCode 348: Design Tic-Tac-Toe
type TicTacToeLC struct {
	n        int
	rows     []int
	cols     []int
	diag     int
	antiDiag int
}

func ConstructorLC(n int) TicTacToeLC {
	return TicTacToeLC{
		n:    n,
		rows: make([]int, n),
		cols: make([]int, n),
	}
}

func (t *TicTacToeLC) Move(row int, col int, player int) int {
	delta := 1
	if player == 2 {
		delta = -1
	}

	target := t.n
	if player == 2 {
		target = -t.n
	}

	t.rows[row] += delta
	t.cols[col] += delta
	if row == col {
		t.diag += delta
	}
	if row+col == t.n-1 {
		t.antiDiag += delta
	}

	if t.rows[row] == target || t.cols[col] == target ||
		t.diag == target || t.antiDiag == target {
		return player
	}
	return 0
}

func main() {
	game := NewTicTacToe(3)

	moves := [][2]int{{0, 0}, {1, 1}, {0, 1}, {0, 2}, {2, 2}, {1, 0}, {1, 2}}

	for _, move := range moves {
		fmt.Printf("Player %s plays (%d, %d)\n", game.CurrentPlayer, move[0], move[1])
		state, err := game.MakeMove(move[0], move[1])
		if err != nil {
			fmt.Println("Error:", err)
			continue
		}
		fmt.Println(game.Render())
		if state != InProgress {
			break
		}
	}
}
```

## Complexity Analysis

| Operation | Naive | Optimized |
|-----------|-------|-----------|
| Make Move | O(n) | O(1) |
| Check Win | O(n) | O(1) |
| Space | O(n²) | O(n²) |

## Interview Tips

- Explain O(1) win checking using row/col/diagonal counters
- Discuss minimax algorithm for AI
- Handle board size flexibility
- Consider draw detection optimization
