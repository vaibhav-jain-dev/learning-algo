"""
Lowest Common Manager - Python Solution

Find the lowest common manager of two employees in an organizational hierarchy.
"""

from typing import List, Optional, Tuple
from dataclasses import dataclass, field


@dataclass(eq=False)
class Employee:
    """Represents an employee in the organization.

    Note: eq=False makes this hashable and uses identity comparison,
    which is appropriate for tree node comparisons.
    """
    name: str
    direct_reports: List['Employee'] = field(default_factory=list)

    def __repr__(self) -> str:
        return f"Employee({self.name})"


def get_lowest_common_manager(
    top_manager: Employee,
    employee1: Employee,
    employee2: Employee
) -> Employee:
    """
    Find the lowest common manager of two employees.

    The lowest common manager is the deepest manager in the org chart
    that has both employees as subordinates (directly or indirectly).
    An employee is considered a subordinate of themselves.

    Args:
        top_manager: Root of the organization chart
        employee1: First target employee
        employee2: Second target employee

    Returns:
        The lowest common manager of employee1 and employee2

    Example:
        >>> a = Employee("A")
        >>> b = Employee("B")
        >>> c = Employee("C")
        >>> a.direct_reports = [b, c]
        >>> get_lowest_common_manager(a, b, c).name
        'A'
    """

    def dfs(current: Employee) -> Tuple[int, Optional[Employee]]:
        """
        DFS helper that returns (count of targets found, LCM if found).

        Returns:
            Tuple of (number of target employees found in subtree, LCM or None)
        """
        num_found = 0
        lcm = None

        # Check all direct reports
        for report in current.direct_reports:
            child_count, child_lcm = dfs(report)

            # If LCM was found in subtree, propagate it up
            if child_lcm is not None:
                return (2, child_lcm)

            num_found += child_count

        # Check if current employee is one of the targets
        if current is employee1:
            num_found += 1
        if current is employee2:
            num_found += 1

        # If we've found both employees, current is the LCM
        if num_found == 2:
            lcm = current

        return (num_found, lcm)

    _, result = dfs(top_manager)
    return result


def get_lowest_common_manager_path(
    top_manager: Employee,
    employee1: Employee,
    employee2: Employee
) -> Employee:
    """
    Alternative solution using path finding.

    Find paths from root to both employees, then find last common node.
    """

    def find_path(current: Employee, target: Employee, path: List[Employee]) -> bool:
        """Find path from current to target, storing in path list."""
        path.append(current)

        if current == target:
            return True

        for report in current.direct_reports:
            if find_path(report, target, path):
                return True

        path.pop()
        return False

    # Find paths to both employees
    path1: List[Employee] = []
    path2: List[Employee] = []

    find_path(top_manager, employee1, path1)
    find_path(top_manager, employee2, path2)

    # Find last common node in both paths
    lcm = top_manager
    for i in range(min(len(path1), len(path2))):
        if path1[i] == path2[i]:
            lcm = path1[i]
        else:
            break

    return lcm


def get_lowest_common_manager_iterative(
    top_manager: Employee,
    employee1: Employee,
    employee2: Employee
) -> Employee:
    """
    Iterative solution using parent pointers built during traversal.
    """
    # Build parent map and find both employees
    parent = {top_manager: None}
    stack = [top_manager]

    # BFS/DFS to build parent map
    while stack:
        current = stack.pop()
        for report in current.direct_reports:
            parent[report] = current
            stack.append(report)

    # Get ancestors of employee1
    ancestors1 = set()
    current = employee1
    while current is not None:
        ancestors1.add(current)
        current = parent[current]

    # Find first ancestor of employee2 that's also ancestor of employee1
    current = employee2
    while current not in ancestors1:
        current = parent[current]

    return current


def build_org_chart() -> Tuple[Employee, dict]:
    """Build sample organization chart for testing."""
    #           A
    #         / | \
    #        B  C  D
    #       /|     |
    #      E F     G
    #     /
    #    H

    h = Employee("H")
    e = Employee("E", [h])
    f = Employee("F")
    b = Employee("B", [e, f])
    c = Employee("C")
    g = Employee("G")
    d = Employee("D", [g])
    a = Employee("A", [b, c, d])

    employees = {emp.name: emp for emp in [a, b, c, d, e, f, g, h]}
    return a, employees


if __name__ == "__main__":
    # Build test organization
    top, emps = build_org_chart()

    # Test cases
    test_cases = [
        ("E", "G", "A"),  # Different branches
        ("E", "F", "B"),  # Same parent
        ("H", "E", "E"),  # One is ancestor of other
        ("B", "B", "B"),  # Same employee
        ("H", "F", "B"),  # Cousins
        ("H", "G", "A"),  # Deep nodes, different branches
        ("A", "H", "A"),  # One is root
    ]

    print("Lowest Common Manager Tests")
    print("=" * 60)
    print("\nOrganization Chart:")
    print("          A")
    print("        / | \\")
    print("       B  C  D")
    print("      /|     |")
    print("     E F     G")
    print("    /")
    print("   H")
    print()

    for emp1_name, emp2_name, expected_name in test_cases:
        emp1 = emps[emp1_name]
        emp2 = emps[emp2_name]
        expected = emps[expected_name]

        # Test all three implementations
        result1 = get_lowest_common_manager(top, emp1, emp2)
        result2 = get_lowest_common_manager_path(top, emp1, emp2)
        result3 = get_lowest_common_manager_iterative(top, emp1, emp2)

        status = "PASS" if result1 == result2 == result3 == expected else "FAIL"
        print(f"LCM({emp1_name}, {emp2_name}) = {result1.name:<5} "
              f"(expected: {expected_name:<5}) [{status}]")

        if result1 != expected:
            print(f"  ERROR: DFS returned {result1.name}")
        if result2 != expected:
            print(f"  ERROR: Path returned {result2.name}")
        if result3 != expected:
            print(f"  ERROR: Iterative returned {result3.name}")

    print("\n" + "=" * 60)
    print("All tests completed!")
