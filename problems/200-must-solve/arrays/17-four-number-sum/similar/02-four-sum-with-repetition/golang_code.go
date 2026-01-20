/*
Four Sum with Repetition - Go Solutions
*/

package main

import (
	"fmt"
	"sort"
)

// FourSumWithRepetition finds quadruplets allowing element repetition.
func FourSumWithRepetition(array []int, target int) [][]int {
	if len(array) < 1 {
		return [][]int{}
	}

	pairSums := make(map[int][][2]int)
	resultSet := make(map[[4]int]bool)

	// Store all pair sums
	for _, a := range array {
		for _, b := range array {
			sum := a + b
			pairSums[sum] = append(pairSums[sum], [2]int{a, b})
		}
	}

	// Find complementary pairs
	for pairSum, pairs := range pairSums {
		complement := target - pairSum
		if compPairs, exists := pairSums[complement]; exists {
			for _, p1 := range pairs {
				for _, p2 := range compPairs {
					quad := []int{p1[0], p1[1], p2[0], p2[1]}
					sort.Ints(quad)
					key := [4]int{quad[0], quad[1], quad[2], quad[3]}
					resultSet[key] = true
				}
			}
		}
	}

	result := make([][]int, 0, len(resultSet))
	for quad := range resultSet {
		result = append(result, []int{quad[0], quad[1], quad[2], quad[3]})
	}

	return result
}

func main() {
	fmt.Println("============================================================")
	fmt.Println("FOUR SUM WITH REPETITION - TEST RESULTS")
	fmt.Println("============================================================")

	array := []int{1, 2}
	target := 6
	result := FourSumWithRepetition(array, target)
	fmt.Printf("Array: %v, Target: %d\n", array, target)
	fmt.Printf("Result: %v\n", result)
}
