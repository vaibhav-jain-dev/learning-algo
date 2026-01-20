"""
Phone Number Mnemonics - Python Solution

Generate all possible letter combinations for a phone number.
"""

from typing import List


# Phone digit to letters mapping
DIGIT_LETTERS = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz",
}


def phone_mnemonics(phone_number: str) -> List[str]:
    """
    Generate all letter combinations using backtracking.

    Args:
        phone_number: String of digits 2-9

    Returns:
        List of all possible letter combinations

    Example:
        >>> phone_mnemonics("23")
        ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']
    """
    if not phone_number:
        return []

    # Filter out digits with no letter mapping (0, 1)
    valid_digits = [d for d in phone_number if d in DIGIT_LETTERS]
    if len(valid_digits) != len(phone_number):
        return []  # Contains invalid digits

    result: List[str] = []
    current: List[str] = []

    def backtrack(index: int) -> None:
        """Generate combinations starting from digit at index."""
        if index == len(phone_number):
            result.append("".join(current))
            return

        digit = phone_number[index]
        for letter in DIGIT_LETTERS[digit]:
            current.append(letter)
            backtrack(index + 1)
            current.pop()  # Backtrack

    backtrack(0)
    return result


def phone_mnemonics_iterative(phone_number: str) -> List[str]:
    """
    Generate all letter combinations using iterative approach.

    Build combinations digit by digit.
    """
    if not phone_number:
        return []

    # Validate all digits have mappings
    for d in phone_number:
        if d not in DIGIT_LETTERS:
            return []

    # Start with empty string
    combinations = [""]

    for digit in phone_number:
        letters = DIGIT_LETTERS[digit]
        # Create new combinations by appending each letter
        new_combinations = []
        for combo in combinations:
            for letter in letters:
                new_combinations.append(combo + letter)
        combinations = new_combinations

    return combinations


def phone_mnemonics_product(phone_number: str) -> List[str]:
    """
    Generate combinations using itertools.product (Pythonic approach).
    """
    from itertools import product

    if not phone_number:
        return []

    # Get letter groups for each digit
    letter_groups = []
    for digit in phone_number:
        if digit not in DIGIT_LETTERS:
            return []
        letter_groups.append(DIGIT_LETTERS[digit])

    # Cartesian product of all letter groups
    return ["".join(combo) for combo in product(*letter_groups)]


if __name__ == "__main__":
    # Test case 1
    phone1 = "23"
    print(f"Input: {phone1}")
    print(f"Backtracking: {phone_mnemonics(phone1)}")
    print(f"Iterative:    {phone_mnemonics_iterative(phone1)}")
    print(f"Product:      {phone_mnemonics_product(phone1)}")

    # Test case 2
    phone2 = "2"
    print(f"\nInput: {phone2}")
    print(f"Output: {phone_mnemonics(phone2)}")

    # Test case 3: Empty input
    phone3 = ""
    print(f"\nInput: '{phone3}'")
    print(f"Output: {phone_mnemonics(phone3)}")

    # Test case 4: Longer input
    phone4 = "234"
    print(f"\nInput: {phone4}")
    print(f"Output: {phone_mnemonics(phone4)}")
    print(f"Total combinations: {len(phone_mnemonics(phone4))}")
