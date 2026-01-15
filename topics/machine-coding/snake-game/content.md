# Snake Game

## Problem Statement

Design the classic Snake game where a snake moves around a grid, eats food to grow, and the game ends when the snake collides with walls or itself.

## Requirements

- Snake movement in four directions
- Food spawns randomly
- Snake grows when eating food
- Collision detection (walls and self)
- Score tracking

## Solution

### Python

```python
import random
from enum import Enum
from typing import List, Tuple, Optional
from collections import deque
from dataclasses import dataclass


class Direction(Enum):
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


@dataclass
class Position:
    x: int
    y: int

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __hash__(self):
        return hash((self.x, self.y))

    def move(self, direction: Direction) -> 'Position':
        dx, dy = direction.value
        return Position(self.x + dx, self.y + dy)


class Snake:
    def __init__(self, start_pos: Position, initial_length: int = 3):
        self.body: deque = deque()
        # Initialize snake body
        for i in range(initial_length):
            self.body.append(Position(start_pos.x - i, start_pos.y))
        self.direction = Direction.RIGHT
        self.growing = False

    @property
    def head(self) -> Position:
        return self.body[0]

    @property
    def tail(self) -> Position:
        return self.body[-1]

    def get_body_set(self) -> set:
        return set(self.body)

    def move(self) -> Position:
        """Move snake in current direction, return new head position."""
        new_head = self.head.move(self.direction)
        self.body.appendleft(new_head)

        if not self.growing:
            self.body.pop()
        else:
            self.growing = False

        return new_head

    def grow(self):
        """Mark snake to grow on next move."""
        self.growing = True

    def change_direction(self, new_direction: Direction):
        """Change direction if not opposite to current."""
        if new_direction != self.direction.opposite():
            self.direction = new_direction

    def collides_with_self(self) -> bool:
        """Check if head collides with body."""
        body_without_head = list(self.body)[1:]
        return self.head in body_without_head

    def __len__(self) -> int:
        return len(self.body)


class Food:
    def __init__(self, position: Position, points: int = 10):
        self.position = position
        self.points = points


class GameBoard:
    def __init__(self, width: int, height: int):
        self.width = width
        self.height = height

    def is_within_bounds(self, pos: Position) -> bool:
        return 0 <= pos.x < self.width and 0 <= pos.y < self.height

    def get_random_position(self, excluded: set = None) -> Position:
        """Get random position not in excluded set."""
        excluded = excluded or set()
        available = [
            Position(x, y)
            for x in range(self.width)
            for y in range(self.height)
            if Position(x, y) not in excluded
        ]
        return random.choice(available) if available else None


class SnakeGame:
    def __init__(self, width: int = 20, height: int = 20):
        self.board = GameBoard(width, height)
        start_pos = Position(width // 2, height // 2)
        self.snake = Snake(start_pos)
        self.food: Optional[Food] = None
        self.score = 0
        self.game_over = False
        self.moves = 0
        self._spawn_food()

    def _spawn_food(self):
        """Spawn food at random empty position."""
        pos = self.board.get_random_position(self.snake.get_body_set())
        if pos:
            self.food = Food(pos)
        else:
            # Board is full - player wins!
            self.game_over = True

    def change_direction(self, direction: Direction):
        """Change snake direction."""
        if not self.game_over:
            self.snake.change_direction(direction)

    def update(self) -> bool:
        """Update game state. Returns True if game continues."""
        if self.game_over:
            return False

        # Move snake
        new_head = self.snake.move()
        self.moves += 1

        # Check wall collision
        if not self.board.is_within_bounds(new_head):
            self.game_over = True
            return False

        # Check self collision
        if self.snake.collides_with_self():
            self.game_over = True
            return False

        # Check food collision
        if self.food and new_head == self.food.position:
            self.score += self.food.points
            self.snake.grow()
            self._spawn_food()

        return True

    def get_state(self) -> dict:
        """Get current game state."""
        return {
            'score': self.score,
            'snake_length': len(self.snake),
            'snake_head': (self.snake.head.x, self.snake.head.y),
            'food_position': (self.food.position.x, self.food.position.y) if self.food else None,
            'direction': self.snake.direction.name,
            'game_over': self.game_over,
            'moves': self.moves
        }

    def render(self) -> str:
        """Render game board as string."""
        grid = [['.' for _ in range(self.board.width)] for _ in range(self.board.height)]

        # Draw snake
        for i, pos in enumerate(self.snake.body):
            if 0 <= pos.x < self.board.width and 0 <= pos.y < self.board.height:
                grid[pos.y][pos.x] = 'O' if i == 0 else 'o'

        # Draw food
        if self.food:
            grid[self.food.position.y][self.food.position.x] = '*'

        # Build string
        border = '+' + '-' * self.board.width + '+'
        lines = [border]
        for row in grid:
            lines.append('|' + ''.join(row) + '|')
        lines.append(border)
        lines.append(f"Score: {self.score} | Length: {len(self.snake)} | Moves: {self.moves}")

        return '\n'.join(lines)


# LeetCode-style interface
class SnakeGameLC:
    """
    LeetCode 353: Design Snake Game

    Initialize with width, height, and food positions.
    move() returns score or -1 if game over.
    """

    def __init__(self, width: int, height: int, food: List[List[int]]):
        self.width = width
        self.height = height
        self.food_queue = deque(food)  # [[row, col], ...]
        self.snake = deque([(0, 0)])  # [(row, col), ...]
        self.snake_set = {(0, 0)}
        self.score = 0

    def move(self, direction: str) -> int:
        """Move snake. Returns score or -1 if game over."""
        directions = {
            'U': (-1, 0),
            'D': (1, 0),
            'L': (0, -1),
            'R': (0, 1)
        }

        dr, dc = directions[direction]
        head_r, head_c = self.snake[0]
        new_head = (head_r + dr, head_c + dc)

        # Check wall collision
        if not (0 <= new_head[0] < self.height and 0 <= new_head[1] < self.width):
            return -1

        # Check if eating food
        eating = self.food_queue and list(self.food_queue[0]) == list(new_head)

        # Remove tail first (unless eating)
        if not eating:
            tail = self.snake.pop()
            self.snake_set.remove(tail)

        # Check self collision (after removing tail)
        if new_head in self.snake_set:
            return -1

        # Add new head
        self.snake.appendleft(new_head)
        self.snake_set.add(new_head)

        if eating:
            self.score += 1
            self.food_queue.popleft()

        return self.score


# Demo
if __name__ == "__main__":
    import time

    game = SnakeGame(15, 10)

    # Simulate some moves
    moves = [
        Direction.RIGHT, Direction.RIGHT, Direction.DOWN,
        Direction.DOWN, Direction.LEFT, Direction.LEFT,
        Direction.UP
    ]

    print("Initial state:")
    print(game.render())
    print()

    for direction in moves:
        game.change_direction(direction)
        for _ in range(3):  # Move 3 steps in each direction
            if not game.update():
                print("Game Over!")
                break
            print(game.render())
            print()
            time.sleep(0.3)

    print(f"Final State: {game.get_state()}")
```

### Go

```go
package main

import (
	"fmt"
	"math/rand"
	"strings"
	"time"
)

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

type Position struct {
	X, Y int
}

func (p Position) Move(d Direction) Position {
	dx, dy := d.Delta()
	return Position{p.X + dx, p.Y + dy}
}

type Snake struct {
	Body      []Position
	Direction Direction
	Growing   bool
}

func NewSnake(start Position, length int) *Snake {
	body := make([]Position, length)
	for i := 0; i < length; i++ {
		body[i] = Position{start.X - i, start.Y}
	}
	return &Snake{
		Body:      body,
		Direction: Right,
	}
}

func (s *Snake) Head() Position {
	return s.Body[0]
}

func (s *Snake) Move() Position {
	newHead := s.Head().Move(s.Direction)
	s.Body = append([]Position{newHead}, s.Body...)

	if !s.Growing {
		s.Body = s.Body[:len(s.Body)-1]
	} else {
		s.Growing = false
	}

	return newHead
}

func (s *Snake) Grow() {
	s.Growing = true
}

func (s *Snake) ChangeDirection(newDir Direction) {
	if newDir != s.Direction.Opposite() {
		s.Direction = newDir
	}
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

func (s *Snake) GetBodySet() map[Position]bool {
	set := make(map[Position]bool)
	for _, pos := range s.Body {
		set[pos] = true
	}
	return set
}

type Food struct {
	Position Position
	Points   int
}

type GameBoard struct {
	Width, Height int
}

func (b *GameBoard) IsWithinBounds(pos Position) bool {
	return pos.X >= 0 && pos.X < b.Width && pos.Y >= 0 && pos.Y < b.Height
}

func (b *GameBoard) GetRandomPosition(excluded map[Position]bool) *Position {
	available := make([]Position, 0)
	for x := 0; x < b.Width; x++ {
		for y := 0; y < b.Height; y++ {
			pos := Position{x, y}
			if !excluded[pos] {
				available = append(available, pos)
			}
		}
	}
	if len(available) == 0 {
		return nil
	}
	pos := available[rand.Intn(len(available))]
	return &pos
}

type SnakeGame struct {
	Board    *GameBoard
	Snake    *Snake
	Food     *Food
	Score    int
	GameOver bool
	Moves    int
}

func NewSnakeGame(width, height int) *SnakeGame {
	board := &GameBoard{width, height}
	startPos := Position{width / 2, height / 2}
	snake := NewSnake(startPos, 3)

	game := &SnakeGame{
		Board: board,
		Snake: snake,
		Score: 0,
	}
	game.spawnFood()
	return game
}

func (g *SnakeGame) spawnFood() {
	pos := g.Board.GetRandomPosition(g.Snake.GetBodySet())
	if pos != nil {
		g.Food = &Food{Position: *pos, Points: 10}
	} else {
		g.GameOver = true
	}
}

func (g *SnakeGame) ChangeDirection(dir Direction) {
	if !g.GameOver {
		g.Snake.ChangeDirection(dir)
	}
}

func (g *SnakeGame) Update() bool {
	if g.GameOver {
		return false
	}

	newHead := g.Snake.Move()
	g.Moves++

	// Wall collision
	if !g.Board.IsWithinBounds(newHead) {
		g.GameOver = true
		return false
	}

	// Self collision
	if g.Snake.CollidesWithSelf() {
		g.GameOver = true
		return false
	}

	// Food collision
	if g.Food != nil && newHead == g.Food.Position {
		g.Score += g.Food.Points
		g.Snake.Grow()
		g.spawnFood()
	}

	return true
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

	// Build string
	var sb strings.Builder
	border := "+" + strings.Repeat("-", g.Board.Width) + "+"
	sb.WriteString(border + "\n")
	for _, row := range grid {
		sb.WriteString("|" + string(row) + "|\n")
	}
	sb.WriteString(border + "\n")
	sb.WriteString(fmt.Sprintf("Score: %d | Length: %d | Moves: %d\n",
		g.Score, len(g.Snake.Body), g.Moves))

	return sb.String()
}

// LeetCode-style interface
type SnakeGameLC struct {
	Width, Height int
	FoodQueue     [][]int
	Snake         [][]int
	SnakeSet      map[string]bool
	Score         int
}

func ConstructorLC(width, height int, food [][]int) SnakeGameLC {
	game := SnakeGameLC{
		Width:     width,
		Height:    height,
		FoodQueue: food,
		Snake:     [][]int{{0, 0}},
		SnakeSet:  map[string]bool{"0,0": true},
		Score:     0,
	}
	return game
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

	// Wall collision
	if newHead[0] < 0 || newHead[0] >= g.Height ||
		newHead[1] < 0 || newHead[1] >= g.Width {
		return -1
	}

	eating := len(g.FoodQueue) > 0 &&
		g.FoodQueue[0][0] == newHead[0] &&
		g.FoodQueue[0][1] == newHead[1]

	// Remove tail if not eating
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

	game := NewSnakeGame(15, 10)

	directions := []Direction{Right, Right, Down, Down, Left, Left, Up}

	fmt.Println("Initial state:")
	fmt.Println(game.Render())

	for _, dir := range directions {
		game.ChangeDirection(dir)
		for i := 0; i < 3; i++ {
			if !game.Update() {
				fmt.Println("Game Over!")
				return
			}
			fmt.Println(game.Render())
			time.Sleep(300 * time.Millisecond)
		}
	}
}
```

## Game State Machine

```
RUNNING ─── eat food ───> RUNNING (grow)
    │
    │── hit wall/self ──> GAME_OVER
    │
    │── fill board ────> WIN
```

## Interview Tips

- Discuss data structure for snake body (deque for O(1) head/tail operations)
- Explain collision detection strategy
- Consider food spawning algorithm (avoid snake body)
- Handle edge cases (immediate reverse, boundary conditions)
