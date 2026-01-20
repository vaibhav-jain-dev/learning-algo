/*
Count Quadruplets with Sum - Go Solutions
*/

package main

import "fmt"

// CountQuadruplets counts quadruplets (i<j<k<l) summing to target.
func CountQuadruplets(array []int, target int) int {
	n := len(array)
	if n < 4 {
		return 0
	}

	count := 0
	pairSumCount := make(map[int]int)

	for k := 0; k < n-1; k++ {
		// Check pairs (k, l) against stored pairs
		for l := k + 1; l < n; l++ {
			complement := target - array[k] - array[l]
			count += pairSumCount[complement]
		}

		// Add pairs (i, k) for future
		for i := 0; i < k; i++ {
			pairSumCount[array[i]+array[k]]++
		}
	}

	return count
}

// CountQuadrupletsBrute is O(n^4) brute force.
func CountQuadrupletsBrute(array []int, target int) int {
	n := len(array)
	count := 0
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			for k := j + 1; k < n; k++ {
				for l := k + 1; l < n; l++ {
					if array[i]+array[j]+array[k]+array[l] == target {
						count++
					}
				}
			}
		}
	}
	return count
}

func main() {
	fmt.Println("============================================================")
	fmt.Println("COUNT QUADRUPLETS - TEST RESULTS")
	fmt.Println("============================================================")

	array := []int{1, 2, 3, 4, 5}
	target := 10
	fmt.Printf("Array: %v, Target: %d\n", array, target)
	fmt.Printf("Optimized: %d\n", CountQuadruplets(array, target))
	fmt.Printf("Brute force: %d\n", CountQuadrupletsBrute(array, target))
}
