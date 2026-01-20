/*
Surrounded Regions - Go Solutions

Capture all 'O' regions that are completely surrounded by 'X'.
*/

package main

import "fmt"

func solve(board [][]byte) {
	if len(board) == 0 || len(board[0]) == 0 {
		return
	}

	rows, cols := len(board), len(board[0])

	var dfs func(r, c int)
	dfs = func(r, c int) {
		if r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] != 'O' {
			return
		}
		board[r][c] = '#'
		dfs(r+1, c)
		dfs(r-1, c)
		dfs(r, c+1)
		dfs(r, c-1)
	}

	// Mark border-connected O's
	for r := 0; r < rows; r++ {
		dfs(r, 0)
		dfs(r, cols-1)
	}
	for c := 0; c < cols; c++ {
		dfs(0, c)
		dfs(rows-1, c)
	}

	// Flip O to X, restore # to O
	for r := 0; r < rows; r++ {
		for c := 0; c < cols; c++ {
			if board[r][c] == 'O' {
				board[r][c] = 'X'
			} else if board[r][c] == '#' {
				board[r][c] = 'O'
			}
		}
	}
}

func main() {
	board := [][]byte{
		{'X', 'X', 'X', 'X'},
		{'X', 'O', 'O', 'X'},
		{'X', 'X', 'O', 'X'},
		{'X', 'O', 'X', 'X'},
	}
	solve(board)
	fmt.Println("Result:")
	for _, row := range board {
		fmt.Printf("  %s\n", string(row))
	}
}
