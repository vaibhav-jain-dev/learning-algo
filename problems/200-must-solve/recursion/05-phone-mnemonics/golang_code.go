/*
Phone Number Mnemonics - Go Solution

Generate all possible letter combinations for a phone number.
*/

package main

import (
	"fmt"
	"strings"
)

// digitLetters maps phone digits to their corresponding letters
var digitLetters = map[byte]string{
	'2': "abc",
	'3': "def",
	'4': "ghi",
	'5': "jkl",
	'6': "mno",
	'7': "pqrs",
	'8': "tuv",
	'9': "wxyz",
}

// PhoneMnemonics generates all letter combinations using backtracking.
func PhoneMnemonics(phoneNumber string) []string {
	if len(phoneNumber) == 0 {
		return []string{}
	}

	// Validate all digits have mappings
	for i := 0; i < len(phoneNumber); i++ {
		if _, exists := digitLetters[phoneNumber[i]]; !exists {
			return []string{}
		}
	}

	result := []string{}
	current := make([]byte, 0, len(phoneNumber))

	var backtrack func(index int)
	backtrack = func(index int) {
		if index == len(phoneNumber) {
			result = append(result, string(current))
			return
		}

		digit := phoneNumber[index]
		letters := digitLetters[digit]

		for i := 0; i < len(letters); i++ {
			current = append(current, letters[i])
			backtrack(index + 1)
			current = current[:len(current)-1] // Backtrack
		}
	}

	backtrack(0)
	return result
}

// PhoneMnemonicsIterative generates combinations using iterative approach.
func PhoneMnemonicsIterative(phoneNumber string) []string {
	if len(phoneNumber) == 0 {
		return []string{}
	}

	// Validate all digits have mappings
	for i := 0; i < len(phoneNumber); i++ {
		if _, exists := digitLetters[phoneNumber[i]]; !exists {
			return []string{}
		}
	}

	// Start with empty string
	combinations := []string{""}

	for i := 0; i < len(phoneNumber); i++ {
		digit := phoneNumber[i]
		letters := digitLetters[digit]

		// Create new combinations by appending each letter
		newCombinations := []string{}
		for _, combo := range combinations {
			for j := 0; j < len(letters); j++ {
				newCombinations = append(newCombinations, combo+string(letters[j]))
			}
		}
		combinations = newCombinations
	}

	return combinations
}

// PhoneMnemonicsBuilder uses strings.Builder for efficiency.
func PhoneMnemonicsBuilder(phoneNumber string) []string {
	if len(phoneNumber) == 0 {
		return []string{}
	}

	// Validate and collect letter groups
	letterGroups := make([]string, len(phoneNumber))
	for i := 0; i < len(phoneNumber); i++ {
		letters, exists := digitLetters[phoneNumber[i]]
		if !exists {
			return []string{}
		}
		letterGroups[i] = letters
	}

	// Calculate total combinations
	total := 1
	for _, letters := range letterGroups {
		total *= len(letters)
	}

	result := make([]string, 0, total)
	var builder strings.Builder
	builder.Grow(len(phoneNumber))

	var generate func(index int)
	generate = func(index int) {
		if index == len(letterGroups) {
			result = append(result, builder.String())
			return
		}

		for _, letter := range letterGroups[index] {
			builder.WriteByte(byte(letter))
			generate(index + 1)
			// Remove last character
			str := builder.String()
			builder.Reset()
			builder.WriteString(str[:len(str)-1])
		}
	}

	generate(0)
	return result
}

func main() {
	// Test case 1
	phone1 := "23"
	fmt.Printf("Input: %s\n", phone1)
	fmt.Printf("Backtracking: %v\n", PhoneMnemonics(phone1))
	fmt.Printf("Iterative:    %v\n", PhoneMnemonicsIterative(phone1))

	// Test case 2
	phone2 := "2"
	fmt.Printf("\nInput: %s\n", phone2)
	fmt.Printf("Output: %v\n", PhoneMnemonics(phone2))

	// Test case 3: Empty input
	phone3 := ""
	fmt.Printf("\nInput: '%s'\n", phone3)
	fmt.Printf("Output: %v\n", PhoneMnemonics(phone3))

	// Test case 4: Longer input
	phone4 := "234"
	fmt.Printf("\nInput: %s\n", phone4)
	result := PhoneMnemonics(phone4)
	fmt.Printf("Output: %v\n", result)
	fmt.Printf("Total combinations: %d\n", len(result))
}
