/*
Longest String Chain - Go Solution

Find the longest string chain where each word differs from the previous
by exactly one added character.

Time Complexity: O(n * L^2) where n is number of words, L is max word length
Space Complexity: O(n * L)
*/

package main

import (
	"fmt"
	"sort"
)

// LongestStringChain finds the longest string chain using DP with hash map
func LongestStringChain(words []string) int {
	if len(words) == 0 {
		return 0
	}

	// Sort words by length (shorter words first)
	sort.Slice(words, func(i, j int) bool {
		return len(words[i]) < len(words[j])
	})

	// dp[word] = length of longest chain ending with word
	dp := make(map[string]int)

	maxLength := 1

	for _, word := range words {
		dp[word] = 1 // Each word is at least a chain of 1

		// Try removing each character to find predecessor
		for i := 0; i < len(word); i++ {
			predecessor := word[:i] + word[i+1:]

			if predLen, exists := dp[predecessor]; exists {
				if predLen+1 > dp[word] {
					dp[word] = predLen + 1
				}
			}
		}

		if dp[word] > maxLength {
			maxLength = dp[word]
		}
	}

	return maxLength
}

// LongestStringChainWithChain returns both the length and the actual chain
func LongestStringChainWithChain(words []string) (int, []string) {
	if len(words) == 0 {
		return 0, []string{}
	}

	sort.Slice(words, func(i, j int) bool {
		return len(words[i]) < len(words[j])
	})

	dp := make(map[string]int)
	prev := make(map[string]string) // Track predecessor for backtracking

	maxLength := 1
	maxWord := words[0]

	for _, word := range words {
		dp[word] = 1
		prev[word] = ""

		for i := 0; i < len(word); i++ {
			predecessor := word[:i] + word[i+1:]

			if predLen, exists := dp[predecessor]; exists {
				if predLen+1 > dp[word] {
					dp[word] = predLen + 1
					prev[word] = predecessor
				}
			}
		}

		if dp[word] > maxLength {
			maxLength = dp[word]
			maxWord = word
		}
	}

	// Backtrack to build the chain
	var chain []string
	current := maxWord
	for current != "" {
		chain = append(chain, current)
		current = prev[current]
	}

	// Reverse chain
	for left, right := 0, len(chain)-1; left < right; left, right = left+1, right-1 {
		chain[left], chain[right] = chain[right], chain[left]
	}

	return maxLength, chain
}

// LongestStringChainByLength groups words by length first
func LongestStringChainByLength(words []string) int {
	if len(words) == 0 {
		return 0
	}

	// Group words by length
	byLength := make(map[int]map[string]bool)
	for _, word := range words {
		if byLength[len(word)] == nil {
			byLength[len(word)] = make(map[string]bool)
		}
		byLength[len(word)][word] = true
	}

	// dp[word] = length of longest chain ending with word
	dp := make(map[string]int)

	maxLength := 1

	// Get sorted lengths
	var lengths []int
	for length := range byLength {
		lengths = append(lengths, length)
	}
	sort.Ints(lengths)

	// Process from shortest to longest
	for _, length := range lengths {
		for word := range byLength[length] {
			dp[word] = 1

			// Only check if there are words of length-1
			if byLength[length-1] != nil {
				for i := 0; i < len(word); i++ {
					predecessor := word[:i] + word[i+1:]

					if predLen, exists := dp[predecessor]; exists {
						if predLen+1 > dp[word] {
							dp[word] = predLen + 1
						}
					}
				}
			}

			if dp[word] > maxLength {
				maxLength = dp[word]
			}
		}
	}

	return maxLength
}

// LongestStringChainRecursive uses top-down approach with memoization
func LongestStringChainRecursive(words []string) int {
	if len(words) == 0 {
		return 0
	}

	wordSet := make(map[string]bool)
	for _, word := range words {
		wordSet[word] = true
	}

	memo := make(map[string]int)

	var dp func(word string) int
	dp = func(word string) int {
		if val, exists := memo[word]; exists {
			return val
		}

		result := 1

		// Try adding each letter at each position
		for i := 0; i <= len(word); i++ {
			for c := 'a'; c <= 'z'; c++ {
				nextWord := word[:i] + string(c) + word[i:]

				if wordSet[nextWord] {
					if 1+dp(nextWord) > result {
						result = 1 + dp(nextWord)
					}
				}
			}
		}

		memo[word] = result
		return result
	}

	maxLength := 0
	for _, word := range words {
		val := dp(word)
		if val > maxLength {
			maxLength = val
		}
	}

	return maxLength
}

func main() {
	// Test 1: Standard case
	words1 := []string{"a", "b", "ba", "bca", "bda", "bdca"}
	result1 := LongestStringChain(words1)
	fmt.Printf("Test 1: words = %v\n", words1)
	fmt.Printf("  Longest chain length: %d\n", result1)
	// Expected: 4 ("a" -> "ba" -> "bda" -> "bdca")

	// Test 2: Another case
	words2 := []string{"xbc", "pcxbcf", "xb", "cxbc", "pcxbc"}
	result2 := LongestStringChain(words2)
	fmt.Printf("\nTest 2: words = %v\n", words2)
	fmt.Printf("  Longest chain length: %d\n", result2)
	// Expected: 5 ("xb" -> "xbc" -> "cxbc" -> "pcxbc" -> "pcxbcf")

	// Test 3: No chain
	words3 := []string{"abcd", "dbqca"}
	result3 := LongestStringChain(words3)
	fmt.Printf("\nTest 3: words = %v\n", words3)
	fmt.Printf("  Longest chain length: %d\n", result3)
	// Expected: 1

	// Test 4: Single word
	words4 := []string{"hello"}
	result4 := LongestStringChain(words4)
	fmt.Printf("\nTest 4: words = %v\n", words4)
	fmt.Printf("  Longest chain length: %d\n", result4)
	// Expected: 1

	// Test 5: With chain output
	words5 := []string{"a", "b", "ba", "bca", "bda", "bdca"}
	length5, chain5 := LongestStringChainWithChain(words5)
	fmt.Printf("\nTest 5: words = %v\n", words5)
	fmt.Printf("  Longest chain length: %d\n", length5)
	fmt.Printf("  Chain: %v\n", chain5)

	// Test 6: Compare methods
	words6 := []string{"xbc", "pcxbcf", "xb", "cxbc", "pcxbc"}
	fmt.Printf("\nTest 6 - Method comparison for %v:\n", words6)
	fmt.Printf("  Standard DP: %d\n", LongestStringChain(words6))
	fmt.Printf("  By length: %d\n", LongestStringChainByLength(words6))
	fmt.Printf("  Recursive: %d\n", LongestStringChainRecursive(words6))

	// Test 7: Multiple chains
	words7 := []string{"a", "ab", "abc", "b", "bc", "bcd"}
	length7, chain7 := LongestStringChainWithChain(words7)
	fmt.Printf("\nTest 7: words = %v\n", words7)
	fmt.Printf("  Longest chain length: %d\n", length7)
	fmt.Printf("  Chain: %v\n", chain7)
	// Expected: 3 (either "a"->"ab"->"abc" or "b"->"bc"->"bcd")

	// Test 8: Empty list
	words8 := []string{}
	result8 := LongestStringChain(words8)
	fmt.Printf("\nTest 8: words = %v\n", words8)
	fmt.Printf("  Longest chain length: %d\n", result8)
	// Expected: 0

	// Test 9: All same length
	words9 := []string{"abc", "def", "ghi"}
	result9 := LongestStringChain(words9)
	fmt.Printf("\nTest 9: words = %v\n", words9)
	fmt.Printf("  Longest chain length: %d\n", result9)
	// Expected: 1

	fmt.Println("\nAll tests completed!")
}
