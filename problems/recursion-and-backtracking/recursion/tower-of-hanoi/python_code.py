"""
Tower of Hanoi

This module demonstrates the Tower of Hanoi puzzle solution using recursion.
Includes visualization of disk movements and state tracking.
"""

from typing import List, Tuple


def tower_of_hanoi(n: int, source: str, destination: str, auxiliary: str,
                   moves: List[str] = None) -> List[str]:
    """
    Solve the Tower of Hanoi puzzle and return all moves.

    Time Complexity: O(2^n)
    Space Complexity: O(n) for recursion stack + O(2^n) for storing moves

    Args:
        n: Number of disks
        source: Name of the source rod
        destination: Name of the destination rod
        auxiliary: Name of the auxiliary rod
        moves: List to store the moves (used internally)

    Returns:
        List of move descriptions
    """
    if moves is None:
        moves = []

    if n == 1:
        # Base case: move the single disk directly
        moves.append(f"Move disk 1 from {source} to {destination}")
        return moves

    # Step 1: Move n-1 disks from source to auxiliary
    tower_of_hanoi(n - 1, source, auxiliary, destination, moves)

    # Step 2: Move the largest disk from source to destination
    moves.append(f"Move disk {n} from {source} to {destination}")

    # Step 3: Move n-1 disks from auxiliary to destination
    tower_of_hanoi(n - 1, auxiliary, destination, source, moves)

    return moves


def tower_of_hanoi_with_state(n: int) -> List[Tuple[str, dict]]:
    """
    Solve Tower of Hanoi and track the state after each move.

    Returns:
        List of tuples (move_description, state_dict)
    """
    # Initialize state: all disks on rod A
    state = {
        'A': list(range(n, 0, -1)),  # [n, n-1, ..., 2, 1]
        'B': [],
        'C': []
    }

    history = [("Initial state", {k: v.copy() for k, v in state.items()})]

    def move_disk(source: str, destination: str, disk: int):
        state[source].pop()
        state[destination].append(disk)
        description = f"Move disk {disk} from {source} to {destination}"
        history.append((description, {k: v.copy() for k, v in state.items()}))

    def solve(num_disks: int, source: str, dest: str, aux: str):
        if num_disks == 0:
            return

        # Move n-1 disks to auxiliary
        solve(num_disks - 1, source, aux, dest)

        # Move largest disk to destination
        move_disk(source, dest, num_disks)

        # Move n-1 disks from auxiliary to destination
        solve(num_disks - 1, aux, dest, source)

    solve(n, 'A', 'C', 'B')

    return history


def visualize_state(state: dict, n: int) -> str:
    """Create a visual representation of the current state."""
    lines = []

    # Find the maximum height needed
    max_height = n

    for level in range(max_height, 0, -1):
        row = []
        for rod in ['A', 'B', 'C']:
            disks = state[rod]
            if len(disks) >= level:
                disk = disks[level - 1]
                # Create disk representation
                disk_str = '[' + str(disk) + ']'
                padding = ' ' * (n - disk)
                row.append(padding + disk_str + padding)
            else:
                # Empty space with rod
                padding = ' ' * n
                row.append(padding + '|' + padding)

        lines.append('  '.join(row))

    # Add base
    base = '-' * (2 * n + 1)
    lines.append('  '.join([base] * 3))

    # Add labels
    label_padding = ' ' * n
    lines.append('  '.join([label_padding + rod + label_padding for rod in ['A', 'B', 'C']]))

    return '\n'.join(lines)


def tower_of_hanoi_with_trace(n: int, source: str, destination: str,
                              auxiliary: str, depth: int = 0) -> int:
    """
    Solve Tower of Hanoi with detailed trace output.

    Returns:
        Total number of moves made
    """
    indent = "  " * depth

    if n == 0:
        return 0

    print(f"{indent}hanoi({n}, {source}->{destination}, aux={auxiliary})")

    # Step 1: Move n-1 disks to auxiliary
    moves1 = tower_of_hanoi_with_trace(n - 1, source, auxiliary, destination, depth + 1)

    # Step 2: Move largest disk
    print(f"{indent}  >> MOVE disk {n}: {source} -> {destination}")

    # Step 3: Move n-1 disks from auxiliary to destination
    moves2 = tower_of_hanoi_with_trace(n - 1, auxiliary, destination, source, depth + 1)

    return moves1 + 1 + moves2


def count_moves(n: int) -> int:
    """Calculate the number of moves required for n disks."""
    return (2 ** n) - 1


def test_tower_of_hanoi():
    """Run comprehensive tests for Tower of Hanoi."""

    print("=" * 70)
    print("TOWER OF HANOI")
    print("=" * 70)

    # Test basic solution
    print("\n1. Solution for n=3 disks:")
    print("-" * 50)
    moves = tower_of_hanoi(3, 'A', 'C', 'B')
    for i, move in enumerate(moves, 1):
        print(f"   Step {i}: {move}")
    print(f"\n   Total moves: {len(moves)} (expected: {count_moves(3)})")

    # Test with state tracking
    print("\n2. Visual Solution for n=3 disks:")
    print("-" * 50)
    history = tower_of_hanoi_with_state(3)

    for description, state in history[:4]:  # Show first 4 states
        print(f"\n   {description}:")
        print(visualize_state(state, 3))

    print("\n   ... (showing final state)")
    description, state = history[-1]
    print(f"\n   After Step {len(history)-1}: {description}")
    print(visualize_state(state, 3))

    # Trace output
    print("\n3. Recursive Trace for n=3:")
    print("-" * 50)
    total = tower_of_hanoi_with_trace(3, 'A', 'C', 'B')
    print(f"\n   Total moves: {total}")

    # Test move counts
    print("\n4. Move Count Formula (2^n - 1):")
    print("-" * 50)
    for n in range(1, 11):
        moves = tower_of_hanoi(n, 'A', 'C', 'B')
        expected = count_moves(n)
        status = "PASS" if len(moves) == expected else "FAIL"
        print(f"   n={n:2d}: moves={len(moves):4d}, expected={expected:4d} [{status}]")

    # Small example with full visualization
    print("\n5. Complete Visualization for n=2:")
    print("-" * 50)
    history = tower_of_hanoi_with_state(2)

    for i, (description, state) in enumerate(history):
        if i == 0:
            print(f"\n   {description}:")
        else:
            print(f"\n   Step {i}: {description}")
        print(visualize_state(state, 2))

    # Verify final state
    print("\n6. Verification Tests:")
    print("-" * 50)
    test_cases = [1, 2, 3, 4, 5]

    for n in test_cases:
        history = tower_of_hanoi_with_state(n)
        final_state = history[-1][1]

        # All disks should be on rod C
        all_on_c = (final_state['A'] == [] and
                    final_state['B'] == [] and
                    final_state['C'] == list(range(n, 0, -1)))

        # Correct number of moves
        correct_moves = len(history) - 1 == count_moves(n)

        status = "PASS" if all_on_c and correct_moves else "FAIL"
        print(f"   n={n}: All disks on C={all_on_c}, Moves correct={correct_moves} [{status}]")

    print("\n" + "=" * 70)
    print("ALL TESTS COMPLETED!")
    print("=" * 70)


if __name__ == "__main__":
    test_tower_of_hanoi()
