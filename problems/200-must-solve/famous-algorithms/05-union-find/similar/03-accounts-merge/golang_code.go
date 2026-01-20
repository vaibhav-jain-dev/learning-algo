/*
Accounts Merge - Go Solution

Time Complexity: O(NK log NK)
Space Complexity: O(NK)
*/

package main

import (
	"fmt"
	"sort"
)

type UnionFind struct {
	parent []int
}

func NewUnionFind(n int) *UnionFind {
	parent := make([]int, n)
	for i := range parent {
		parent[i] = i
	}
	return &UnionFind{parent: parent}
}

func (uf *UnionFind) Find(x int) int {
	if uf.parent[x] != x {
		uf.parent[x] = uf.Find(uf.parent[x])
	}
	return uf.parent[x]
}

func (uf *UnionFind) Union(x, y int) {
	uf.parent[uf.Find(x)] = uf.Find(y)
}

func accountsMerge(accounts [][]string) [][]string {
	n := len(accounts)
	uf := NewUnionFind(n)

	// Map email to first account
	emailToAccount := make(map[string]int)

	for i, account := range accounts {
		for j := 1; j < len(account); j++ {
			email := account[j]
			if prevAccount, exists := emailToAccount[email]; exists {
				uf.Union(i, prevAccount)
			} else {
				emailToAccount[email] = i
			}
		}
	}

	// Group emails by root
	rootToEmails := make(map[int]map[string]bool)
	for email, accountID := range emailToAccount {
		root := uf.Find(accountID)
		if rootToEmails[root] == nil {
			rootToEmails[root] = make(map[string]bool)
		}
		rootToEmails[root][email] = true
	}

	// Build result
	result := [][]string{}
	for root, emailSet := range rootToEmails {
		emails := []string{}
		for email := range emailSet {
			emails = append(emails, email)
		}
		sort.Strings(emails)
		name := accounts[root][0]
		merged := append([]string{name}, emails...)
		result = append(result, merged)
	}

	return result
}

func main() {
	accounts1 := [][]string{{"John", "a@m.co", "b@m.co"}, {"John", "c@m.co"}, {"John", "a@m.co", "d@m.co"}}
	fmt.Printf("Test 1: %v\n", accountsMerge(accounts1))

	accounts2 := [][]string{{"Mary", "m@m.co"}}
	fmt.Printf("Test 2: %v\n", accountsMerge(accounts2))

	fmt.Println("\nAll tests completed!")
}
