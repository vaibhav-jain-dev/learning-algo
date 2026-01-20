/*
Reveal Minesweeper - Go Solution

Implement the click/reveal functionality for Minesweeper using recursive flood fill.
*/

package main

import "fmt"

// Direction vectors for 8 neighbors
var directions = [][2]int{
	{-1, -1}, {-1, 0}, {-1, 1},
	{0, -1}, {0, 1},
	{1, -1}, {1, 0}, {1, 1},
}

// RevealMinesweeper updates the board after a click.
// 'M' = mine, 'E' = empty, 'B' = blank revealed,
// '1'-'8' = adjacent mine count, 'X' = revealed mine
func RevealMinesweeper(board [][]byte, click []int) [][]byte {
	rows, cols := len(board), len(board[0])
	row, col := click[0], click[1]

	// Handle mine click - game over
	if board[row][col] == 'M' {
		board[row][col] = 'X'
		return board
	}

	// Start recursive reveal
	reveal(board, row, col, rows, cols)
	return board
}

// countAdjacentMines counts mines in 8-directional neighbors
func countAdjacentMines(board [][]byte, r, c, rows, cols int) int {
	count := 0
	for _, d := range directions {
		nr, nc := r+d[0], c+d[1]
		if nr >= 0 && nr < rows && nc >= 0 && nc < cols {
			if board[nr][nc] == 'M' {
				count++
			}
		}
	}
	return count
}

// reveal recursively reveals cells starting from (r, c)
func reveal(board [][]byte, r, c, rows, cols int) {
	// Out of bounds
	if r < 0 || r >= rows || c < 0 || c >= cols {
		return
	}

	// Only reveal unrevealed empty cells
	if board[r][c] != 'E' {
		return
	}

	// Count adjacent mines
	mineCount := countAdjacentMines(board, r, c, rows, cols)

	if mineCount > 0 {
		// Has adjacent mines - show count and stop
		board[r][c] = byte('0' + mineCount)
	} else {
		// No adjacent mines - mark as blank and flood fill
		board[r][c] = 'B'
		for _, d := range directions {
			reveal(board, r+d[0], c+d[1], rows, cols)
		}
	}
}

// RevealMinesweeperBFS uses BFS iterative solution.
// Avoids deep recursion for large boards.
func RevealMinesweeperBFS(board [][]byte, click []int) [][]byte {
	rows, cols := len(board), len(board[0])
	row, col := click[0], click[1]

	// Handle mine
	if board[row][col] == 'M' {
		board[row][col] = 'X'
		return board
	}

	// BFS queue
	type cell struct{ r, c int }
	queue := []cell{{row, col}}

	for len(queue) > 0 {
		// Dequeue
		curr := queue[0]
		queue = queue[1:]

		r, c := curr.r, curr.c

		if board[r][c] != 'E' {
			continue
		}

		mineCount := countAdjacentMines(board, r, c, rows, cols)

		if mineCount > 0 {
			board[r][c] = byte('0' + mineCount)
		} else {
			board[r][c] = 'B'
			for _, d := range directions {
				nr, nc := r+d[0], c+d[1]
				if nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] == 'E' {
					queue = append(queue, cell{nr, nc})
				}
			}
		}
	}

	return board
}

// printBoard pretty prints the Minesweeper board
func printBoard(board [][]byte) {
	for _, row := range board {
		for j, cell := range row {
			if j > 0 {
				fmt.Print(" ")
			}
			fmt.Printf("%c", cell)
		}
		fmt.Println()
	}
	fmt.Println()
}

// copyBoard creates a deep copy of the board
func copyBoard(board [][]byte) [][]byte {
	result := make([][]byte, len(board))
	for i := range board {
		result[i] = make([]byte, len(board[i]))
		copy(result[i], board[i])
	}
	return result
}

func main() {
	// Test case 1: Click triggers flood fill
	fmt.Println("Test 1: Flood fill around a mine")
	fmt.Println("----------------------------------------")
	board1 := [][]byte{
		{'E', 'E', 'E', 'E', 'E'},
		{'E', 'E', 'M', 'E', 'E'},
		{'E', 'E', 'E', 'E', 'E'},
		{'E', 'E', 'E', 'E', 'E'},
	}
	fmt.Println("Before click at [3, 0]:")
	printBoard(board1)

	RevealMinesweeper(board1, []int{3, 0})
	fmt.Println("After:")
	printBoard(board1)

	// Test case 2: Click on mine
	fmt.Println("Test 2: Click on mine (game over)")
	fmt.Println("----------------------------------------")
	board2 := [][]byte{
		{'E', 'E', 'E'},
		{'E', 'M', 'E'},
		{'E', 'E', 'E'},
	}
	fmt.Println("Before click at [1, 1]:")
	printBoard(board2)

	RevealMinesweeper(board2, []int{1, 1})
	fmt.Println("After:")
	printBoard(board2)

	// Test case 3: No mines - entire board revealed
	fmt.Println("Test 3: No mines - full reveal")
	fmt.Println("----------------------------------------")
	board3 := [][]byte{
		{'E', 'E', 'E'},
		{'E', 'E', 'E'},
		{'E', 'E', 'E'},
	}
	fmt.Println("Before click at [1, 1]:")
	printBoard(board3)

	RevealMinesweeper(board3, []int{1, 1})
	fmt.Println("After:")
	printBoard(board3)

	// Test case 4: Click adjacent to mine
	fmt.Println("Test 4: Click on cell adjacent to mine")
	fmt.Println("----------------------------------------")
	board4 := [][]byte{
		{'E', 'E', 'E'},
		{'E', 'M', 'E'},
		{'E', 'E', 'E'},
	}
	fmt.Println("Before click at [0, 0]:")
	printBoard(board4)

	RevealMinesweeper(board4, []int{0, 0})
	fmt.Println("After:")
	printBoard(board4)

	// Test case 5: BFS version comparison
	fmt.Println("Test 5: BFS version")
	fmt.Println("----------------------------------------")
	board5 := [][]byte{
		{'E', 'E', 'E', 'E'},
		{'E', 'E', 'M', 'E'},
		{'E', 'E', 'E', 'E'},
		{'E', 'E', 'E', 'E'},
	}
	fmt.Println("Before click at [3, 0] using BFS:")
	printBoard(board5)

	RevealMinesweeperBFS(board5, []int{3, 0})
	fmt.Println("After:")
	printBoard(board5)

	fmt.Println("All tests completed!")
}
