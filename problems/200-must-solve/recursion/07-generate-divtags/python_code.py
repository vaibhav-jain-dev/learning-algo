"""
Generate Div Tags - Python Solution

Generate all valid combinations of matched <div></div> tags.
"""

from typing import List


def generate_div_tags(number_of_tags: int) -> List[str]:
    """
    Generate all valid div tag combinations using backtracking.

    Args:
        number_of_tags: Number of div tag pairs to generate

    Returns:
        List of all valid div tag strings

    Example:
        >>> generate_div_tags(2)
        ['<div><div></div></div>', '<div></div><div></div>']
    """
    result: List[str] = []

    def backtrack(current: List[str], opening: int, closing: int) -> None:
        """
        Generate combinations recursively.

        Args:
            current: Current list of tags being built
            opening: Number of opening tags used
            closing: Number of closing tags used
        """
        # Base case: all tags used
        if opening == closing == number_of_tags:
            result.append("".join(current))
            return

        # Can add opening tag if we haven't used all
        if opening < number_of_tags:
            current.append("<div>")
            backtrack(current, opening + 1, closing)
            current.pop()

        # Can add closing tag if there are unclosed opening tags
        if closing < opening:
            current.append("</div>")
            backtrack(current, opening, closing + 1)
            current.pop()

    backtrack([], 0, 0)
    return result


def generate_div_tags_string(number_of_tags: int) -> List[str]:
    """
    Generate combinations using string concatenation (simpler but less efficient).
    """
    result: List[str] = []

    def generate(current: str, opening: int, closing: int) -> None:
        if opening == closing == number_of_tags:
            result.append(current)
            return

        if opening < number_of_tags:
            generate(current + "<div>", opening + 1, closing)

        if closing < opening:
            generate(current + "</div>", opening, closing + 1)

    generate("", 0, 0)
    return result


def generate_div_tags_iterative(number_of_tags: int) -> List[str]:
    """
    Generate combinations using iterative BFS-like approach.

    State: (current_string, opening_count, closing_count)
    """
    if number_of_tags == 0:
        return []

    # Stack of (current_string, opening_used, closing_used)
    stack = [("", 0, 0)]
    result = []

    while stack:
        current, opening, closing = stack.pop()

        if opening == closing == number_of_tags:
            result.append(current)
            continue

        # Add closing tag option first (will be processed after opening)
        if closing < opening:
            stack.append((current + "</div>", opening, closing + 1))

        # Add opening tag option
        if opening < number_of_tags:
            stack.append((current + "<div>", opening + 1, closing))

    return result


if __name__ == "__main__":
    # Test case 1
    n1 = 2
    print(f"Number of tags: {n1}")
    print(f"Backtracking: {generate_div_tags(n1)}")
    print(f"Iterative:    {generate_div_tags_iterative(n1)}")

    # Test case 2
    n2 = 1
    print(f"\nNumber of tags: {n2}")
    print(f"Output: {generate_div_tags(n2)}")

    # Test case 3
    n3 = 3
    print(f"\nNumber of tags: {n3}")
    result = generate_div_tags(n3)
    for combo in result:
        print(f"  {combo}")
    print(f"Total: {len(result)} combinations")

    # Test case 4: Catalan numbers
    print("\nCatalan number sequence (number of valid combinations):")
    for i in range(1, 6):
        print(f"  n={i}: {len(generate_div_tags(i))} combinations")
