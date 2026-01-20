/*
Solve Sudoku - Go Solution

Solve a 9x9 Sudoku puzzle using backtracking.
*/

package main

import "fmt"

// SolveSudoku solves the puzzle using backtracking.
// Modifies board in-place and returns it.
func SolveSudoku(board [][]int) [][]int {
	solve(board)
	return board
}

// solve recursively fills the board
func solve(board [][]int) bool {
	// Find next empty cell
	for row := 0; row < 9; row++ {
		for col := 0; col < 9; col++ {
			if board[row][col] == 0 {
				// Try digits 1-9
				for num := 1; num <= 9; num++ {
					if isValid(board, row, col, num) {
						board[row][col] = num

						if solve(board) {
							return true
						}

						// Backtrack
						board[row][col] = 0
					}
				}
				return false // No valid digit found
			}
		}
	}
	return true // All cells filled
}

// isValid checks if placing num at (row, col) is valid
func isValid(board [][]int, row, col, num int) bool {
	// Check row
	for c := 0; c < 9; c++ {
		if board[row][c] == num {
			return false
		}
	}

	// Check column
	for r := 0; r < 9; r++ {
		if board[r][col] == num {
			return false
		}
	}

	// Check 3x3 box
	boxRow, boxCol := 3*(row/3), 3*(col/3)
	for r := boxRow; r < boxRow+3; r++ {
		for c := boxCol; c < boxCol+3; c++ {
			if board[r][c] == num {
				return false
			}
		}
	}

	return true
}

// SolveSudokuOptimized uses constraint sets for O(1) validation.
func SolveSudokuOptimized(board [][]int) [][]int {
	// Initialize constraint sets using bitmasks
	rows := make([]int, 9)
	cols := make([]int, 9)
	boxes := make([]int, 9)

	// Collect empty cells and populate constraints
	type cell struct{ row, col int }
	emptyCells := []cell{}

	for r := 0; r < 9; r++ {
		for c := 0; c < 9; c++ {
			num := board[r][c]
			if num == 0 {
				emptyCells = append(emptyCells, cell{r, c})
			} else {
				bit := 1 << num
				rows[r] |= bit
				cols[c] |= bit
				boxes[3*(r/3)+c/3] |= bit
			}
		}
	}

	var solveOptimized func(idx int) bool
	solveOptimized = func(idx int) bool {
		if idx == len(emptyCells) {
			return true
		}

		row, col := emptyCells[idx].row, emptyCells[idx].col
		boxIdx := 3*(row/3) + col/3

		for num := 1; num <= 9; num++ {
			bit := 1 << num

			// Check if num is valid using bitmasks
			if rows[row]&bit == 0 && cols[col]&bit == 0 && boxes[boxIdx]&bit == 0 {
				// Place number
				board[row][col] = num
				rows[row] |= bit
				cols[col] |= bit
				boxes[boxIdx] |= bit

				if solveOptimized(idx + 1) {
					return true
				}

				// Backtrack
				board[row][col] = 0
				rows[row] &^= bit
				cols[col] &^= bit
				boxes[boxIdx] &^= bit
			}
		}

		return false
	}

	solveOptimized(0)
	return board
}

// printBoard pretty prints the Sudoku board
func printBoard(board [][]int) {
	for i, row := range board {
		if i%3 == 0 && i != 0 {
			fmt.Println("---------------------")
		}

		for j, num := range row {
			if j%3 == 0 && j != 0 {
				fmt.Print("| ")
			}
			fmt.Printf("%d ", num)
		}
		fmt.Println()
	}
}

// copyBoard creates a deep copy of the board
func copyBoard(board [][]int) [][]int {
	copy := make([][]int, 9)
	for i := range board {
		copy[i] = make([]int, 9)
		for j := range board[i] {
			copy[i][j] = board[i][j]
		}
	}
	return copy
}

func main() {
	// Test case
	board := [][]int{
		{7, 8, 0, 4, 0, 0, 1, 2, 0},
		{6, 0, 0, 0, 7, 5, 0, 0, 9},
		{0, 0, 0, 6, 0, 1, 0, 7, 8},
		{0, 0, 7, 0, 4, 0, 2, 6, 0},
		{0, 0, 1, 0, 5, 0, 9, 3, 0},
		{9, 0, 4, 0, 6, 0, 0, 0, 5},
		{0, 7, 0, 3, 0, 0, 0, 1, 2},
		{1, 2, 0, 0, 0, 7, 4, 0, 0},
		{0, 4, 9, 2, 0, 6, 0, 0, 7},
	}

	fmt.Println("Input board:")
	printBoard(board)

	// Make a copy for optimized version
	boardCopy := copyBoard(board)

	fmt.Println("\nSolving with basic backtracking...")
	SolveSudoku(board)
	fmt.Println("\nSolved board:")
	printBoard(board)

	fmt.Println("\n========================================")
	fmt.Println("\nSolving with optimized version...")
	SolveSudokuOptimized(boardCopy)
	fmt.Println("\nSolved board (optimized):")
	printBoard(boardCopy)
}
