/*
Group Anagrams

Given an array of strings, group the anagrams together.

Multiple approaches implemented:
1. Sorted String as Key - O(n * k * log(k)) time
2. Character Count as Key - O(n * k) time
*/

package main

import (
	"fmt"
	"sort"
	"strings"
)

// groupAnagramsSorted groups anagrams using sorted string as key.
// Time Complexity: O(n * k * log(k)) where n = len(strs), k = max string length
// Space Complexity: O(n * k)
func groupAnagramsSorted(strs []string) [][]string {
	anagramMap := make(map[string][]string)

	for _, s := range strs {
		// Sort the string to create the key
		chars := []rune(s)
		sort.Slice(chars, func(i, j int) bool {
			return chars[i] < chars[j]
		})
		key := string(chars)

		anagramMap[key] = append(anagramMap[key], s)
	}

	// Convert map values to slice
	result := make([][]string, 0, len(anagramMap))
	for _, group := range anagramMap {
		result = append(result, group)
	}

	return result
}

// groupAnagramsCount groups anagrams using character count as key.
// Time Complexity: O(n * k) where n = len(strs), k = max string length
// Space Complexity: O(n * k)
func groupAnagramsCount(strs []string) [][]string {
	anagramMap := make(map[string][]string)

	for _, s := range strs {
		// Count characters (assuming lowercase English letters)
		count := [26]int{}
		for _, char := range s {
			count[char-'a']++
		}

		// Create key from count array
		key := countToKey(count[:])
		anagramMap[key] = append(anagramMap[key], s)
	}

	// Convert map values to slice
	result := make([][]string, 0, len(anagramMap))
	for _, group := range anagramMap {
		result = append(result, group)
	}

	return result
}

// countToKey converts a count array to a string key.
func countToKey(count []int) string {
	var sb strings.Builder
	for i, c := range count {
		if c > 0 {
			sb.WriteByte(byte('a' + i))
			sb.WriteString(fmt.Sprintf("%d", c))
		}
	}
	return sb.String()
}

// groupAnagramsPrime groups anagrams using prime number multiplication.
// Note: This can cause integer overflow for long strings.
// Time Complexity: O(n * k)
// Space Complexity: O(n * k)
func groupAnagramsPrime(strs []string) [][]string {
	// First 26 prime numbers for a-z
	primes := []int{2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41,
		43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101}

	anagramMap := make(map[int][]string)

	for _, s := range strs {
		// Calculate prime product
		product := 1
		for _, char := range s {
			product *= primes[char-'a']
		}

		anagramMap[product] = append(anagramMap[product], s)
	}

	// Convert map values to slice
	result := make([][]string, 0, len(anagramMap))
	for _, group := range anagramMap {
		result = append(result, group)
	}

	return result
}

// groupAnagramsRuneCount uses a rune-based count for Unicode support.
// Time Complexity: O(n * k)
// Space Complexity: O(n * k)
func groupAnagramsRuneCount(strs []string) [][]string {
	anagramMap := make(map[string][]string)

	for _, s := range strs {
		// Count runes
		count := make(map[rune]int)
		for _, r := range s {
			count[r]++
		}

		// Create deterministic key from count
		key := runeCountToKey(count)
		anagramMap[key] = append(anagramMap[key], s)
	}

	// Convert map values to slice
	result := make([][]string, 0, len(anagramMap))
	for _, group := range anagramMap {
		result = append(result, group)
	}

	return result
}

// runeCountToKey creates a deterministic string key from rune count.
func runeCountToKey(count map[rune]int) string {
	// Get sorted runes
	runes := make([]rune, 0, len(count))
	for r := range count {
		runes = append(runes, r)
	}
	sort.Slice(runes, func(i, j int) bool {
		return runes[i] < runes[j]
	})

	// Build key
	var sb strings.Builder
	for _, r := range runes {
		sb.WriteRune(r)
		sb.WriteString(fmt.Sprintf("%d", count[r]))
	}
	return sb.String()
}

// areAnagrams checks if two strings are anagrams.
func areAnagrams(s1, s2 string) bool {
	if len(s1) != len(s2) {
		return false
	}

	count := make(map[rune]int)
	for _, r := range s1 {
		count[r]++
	}
	for _, r := range s2 {
		count[r]--
		if count[r] < 0 {
			return false
		}
	}
	return true
}

// validateGroups validates the grouping result.
func validateGroups(groups [][]string, original []string) bool {
	// Check all strings are present
	allStrings := []string{}
	for _, group := range groups {
		allStrings = append(allStrings, group...)
	}

	if len(allStrings) != len(original) {
		return false
	}

	// Sort both for comparison
	sort.Strings(allStrings)
	sortedOriginal := make([]string, len(original))
	copy(sortedOriginal, original)
	sort.Strings(sortedOriginal)

	for i := range allStrings {
		if allStrings[i] != sortedOriginal[i] {
			return false
		}
	}

	// Check each group contains anagrams
	for _, group := range groups {
		if len(group) > 1 {
			for i := 1; i < len(group); i++ {
				if !areAnagrams(group[0], group[i]) {
					return false
				}
			}
		}
	}

	return true
}

func runTests() {
	fmt.Println("============================================================")
	fmt.Println("Group Anagrams - Test Cases")
	fmt.Println("============================================================")

	testCases := [][]string{
		{"eat", "tea", "tan", "ate", "nat", "bat"},
		{""},
		{"a"},
		{"cab", "tin", "pew", "duh", "may", "ill", "buy", "bar", "max", "doc"},
		{"abc", "bca", "cab", "xyz", "zyx", "yxz"},
		{"", ""},
		{"ab", "ba", "abc", "cba", "bac"},
	}

	type method struct {
		name string
		fn   func([]string) [][]string
	}

	methods := []method{
		{"Sorted String Key", groupAnagramsSorted},
		{"Character Count Key", groupAnagramsCount},
		{"Prime Product Key", groupAnagramsPrime},
		{"Rune Count Key", groupAnagramsRuneCount},
	}

	allPassed := true

	for _, m := range methods {
		fmt.Printf("\n--- Testing %s ---\n", m.name)

		for i, strs := range testCases {
			// Make a copy to avoid mutation
			strsCopy := make([]string, len(strs))
			copy(strsCopy, strs)

			result := m.fn(strsCopy)
			valid := validateGroups(result, strs)

			fmt.Printf("\nTest %d: %v\n", i+1, strs)
			fmt.Printf("Result: %v\n", result)

			if valid {
				fmt.Println("PASSED (valid grouping)")
			} else {
				fmt.Println("FAILED (invalid grouping)")
				allPassed = false
			}
		}
	}

	// Additional demonstration
	fmt.Println("\n============================================================")
	fmt.Println("Demonstration - Character Count Key Generation")
	fmt.Println("============================================================")

	demoWords := []string{"eat", "tea", "ate"}
	fmt.Printf("\nWords: %v\n", demoWords)
	for _, word := range demoWords {
		count := [26]int{}
		for _, char := range word {
			count[char-'a']++
		}
		// Show only non-zero counts
		var nonZero []string
		for i, c := range count {
			if c > 0 {
				nonZero = append(nonZero, fmt.Sprintf("(%c:%d)", 'a'+i, c))
			}
		}
		fmt.Printf("'%s' -> %v\n", word, nonZero)
	}

	fmt.Println("\n============================================================")
	if allPassed {
		fmt.Println("All tests passed!")
	} else {
		fmt.Println("Some tests failed!")
	}
	fmt.Println("============================================================")
}

func main() {
	runTests()
}
