/*
Lowest Common Manager - Go Solution

Find the lowest common manager of two employees in an organizational hierarchy.
*/

package main

import "fmt"

// Employee represents a person in the organization
type Employee struct {
	Name          string
	DirectReports []*Employee
}

// NewEmployee creates a new employee with given name
func NewEmployee(name string) *Employee {
	return &Employee{
		Name:          name,
		DirectReports: []*Employee{},
	}
}

// dfsResult holds the result of DFS traversal
type dfsResult struct {
	numFound int
	lcm      *Employee
}

// GetLowestCommonManager finds the lowest common manager of two employees.
// The lowest common manager is the deepest manager that has both employees
// as subordinates (directly or indirectly).
// An employee is considered a subordinate of themselves.
func GetLowestCommonManager(topManager, employee1, employee2 *Employee) *Employee {
	result := dfs(topManager, employee1, employee2)
	return result.lcm
}

// dfs performs depth-first search to find LCM
// Returns (count of targets found in subtree, LCM if found)
func dfs(current, emp1, emp2 *Employee) dfsResult {
	numFound := 0
	var lcm *Employee

	// Check all direct reports
	for _, report := range current.DirectReports {
		childResult := dfs(report, emp1, emp2)

		// If LCM was found in subtree, propagate it up
		if childResult.lcm != nil {
			return dfsResult{numFound: 2, lcm: childResult.lcm}
		}

		numFound += childResult.numFound
	}

	// Check if current employee is one of the targets
	if current == emp1 {
		numFound++
	}
	if current == emp2 {
		numFound++
	}

	// If we've found both employees, current is the LCM
	if numFound == 2 {
		lcm = current
	}

	return dfsResult{numFound: numFound, lcm: lcm}
}

// GetLowestCommonManagerPath finds LCM using path finding approach.
// Find paths from root to both employees, then find last common node.
func GetLowestCommonManagerPath(topManager, employee1, employee2 *Employee) *Employee {
	// Find paths to both employees
	path1 := []*Employee{}
	path2 := []*Employee{}

	findPath(topManager, employee1, &path1)
	findPath(topManager, employee2, &path2)

	// Find last common node in both paths
	lcm := topManager
	minLen := len(path1)
	if len(path2) < minLen {
		minLen = len(path2)
	}

	for i := 0; i < minLen; i++ {
		if path1[i] == path2[i] {
			lcm = path1[i]
		} else {
			break
		}
	}

	return lcm
}

// findPath finds path from current to target, storing in path slice
func findPath(current, target *Employee, path *[]*Employee) bool {
	*path = append(*path, current)

	if current == target {
		return true
	}

	for _, report := range current.DirectReports {
		if findPath(report, target, path) {
			return true
		}
	}

	// Backtrack
	*path = (*path)[:len(*path)-1]
	return false
}

// GetLowestCommonManagerIterative finds LCM using parent pointers
func GetLowestCommonManagerIterative(topManager, employee1, employee2 *Employee) *Employee {
	// Build parent map using BFS/DFS
	parent := make(map[*Employee]*Employee)
	parent[topManager] = nil

	stack := []*Employee{topManager}
	for len(stack) > 0 {
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		for _, report := range current.DirectReports {
			parent[report] = current
			stack = append(stack, report)
		}
	}

	// Get ancestors of employee1
	ancestors1 := make(map[*Employee]bool)
	current := employee1
	for current != nil {
		ancestors1[current] = true
		current = parent[current]
	}

	// Find first ancestor of employee2 that's also ancestor of employee1
	current = employee2
	for !ancestors1[current] {
		current = parent[current]
	}

	return current
}

// buildOrgChart creates sample organization for testing
func buildOrgChart() (*Employee, map[string]*Employee) {
	//           A
	//         / | \
	//        B  C  D
	//       /|     |
	//      E F     G
	//     /
	//    H

	h := NewEmployee("H")
	e := NewEmployee("E")
	e.DirectReports = []*Employee{h}
	f := NewEmployee("F")
	b := NewEmployee("B")
	b.DirectReports = []*Employee{e, f}
	c := NewEmployee("C")
	g := NewEmployee("G")
	d := NewEmployee("D")
	d.DirectReports = []*Employee{g}
	a := NewEmployee("A")
	a.DirectReports = []*Employee{b, c, d}

	employees := map[string]*Employee{
		"A": a, "B": b, "C": c, "D": d,
		"E": e, "F": f, "G": g, "H": h,
	}

	return a, employees
}

func main() {
	// Build test organization
	top, emps := buildOrgChart()

	// Test cases: (emp1, emp2, expected LCM)
	testCases := []struct {
		emp1, emp2, expected string
	}{
		{"E", "G", "A"}, // Different branches
		{"E", "F", "B"}, // Same parent
		{"H", "E", "E"}, // One is ancestor of other
		{"B", "B", "B"}, // Same employee
		{"H", "F", "B"}, // Cousins
		{"H", "G", "A"}, // Deep nodes, different branches
		{"A", "H", "A"}, // One is root
	}

	fmt.Println("Lowest Common Manager Tests")
	fmt.Println("============================================================")
	fmt.Println("\nOrganization Chart:")
	fmt.Println("          A")
	fmt.Println("        / | \\")
	fmt.Println("       B  C  D")
	fmt.Println("      /|     |")
	fmt.Println("     E F     G")
	fmt.Println("    /")
	fmt.Println("   H")
	fmt.Println()

	allPassed := true
	for _, tc := range testCases {
		emp1 := emps[tc.emp1]
		emp2 := emps[tc.emp2]
		expected := emps[tc.expected]

		// Test all three implementations
		result1 := GetLowestCommonManager(top, emp1, emp2)
		result2 := GetLowestCommonManagerPath(top, emp1, emp2)
		result3 := GetLowestCommonManagerIterative(top, emp1, emp2)

		passed := result1 == expected && result2 == expected && result3 == expected
		status := "PASS"
		if !passed {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("LCM(%s, %s) = %-5s (expected: %-5s) [%s]\n",
			tc.emp1, tc.emp2, result1.Name, tc.expected, status)

		if result1 != expected {
			fmt.Printf("  ERROR: DFS returned %s\n", result1.Name)
		}
		if result2 != expected {
			fmt.Printf("  ERROR: Path returned %s\n", result2.Name)
		}
		if result3 != expected {
			fmt.Printf("  ERROR: Iterative returned %s\n", result3.Name)
		}
	}

	fmt.Println("\n============================================================")
	if allPassed {
		fmt.Println("All tests passed!")
	} else {
		fmt.Println("Some tests failed!")
	}
}
