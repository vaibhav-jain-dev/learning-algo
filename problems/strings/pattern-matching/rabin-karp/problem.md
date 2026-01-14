# Rabin-Karp String Matching Algorithm

## Problem Description

Implement the Rabin-Karp algorithm for string pattern matching. This algorithm uses hashing to find any one of a set of pattern strings in a text.

The key idea is to use a rolling hash function that can be updated in constant time as we slide the window through the text.

## Examples

### Example 1
```
Input: text = "GEEKS FOR GEEKS", pattern = "GEEK"
Output: [0, 10]
Explanation: Pattern "GEEK" is found at indices 0 and 10.
```

### Example 2
```
Input: text = "AABAACAADAABAABA", pattern = "AABA"
Output: [0, 9, 12]
Explanation: Pattern "AABA" is found at indices 0, 9, and 12.
```

### Example 3
```
Input: text = "abcdefgh", pattern = "xyz"
Output: []
Explanation: Pattern not found in text.
```

## Constraints

- 1 <= pattern.length <= text.length <= 10^5
- text and pattern consist of printable ASCII characters
- Implement rolling hash to achieve average O(n + m) complexity

<details>
<summary>Hint 1</summary>
Use polynomial rolling hash: hash(s) = s[0]*d^(m-1) + s[1]*d^(m-2) + ... + s[m-1]*d^0, where d is the number of characters in the alphabet.
</details>

<details>
<summary>Hint 2</summary>
To compute the next hash value in O(1): new_hash = (d * (old_hash - old_char * h) + new_char) % q, where h = d^(m-1) % q.
</details>

<details>
<summary>Hint 3</summary>
Use a large prime number q to minimize hash collisions. When hashes match, verify by comparing actual strings to handle collisions.
</details>

## Approach

### Rolling Hash Concept

1. **Initial Hash Calculation**:
   - Compute hash of pattern and first window of text
   - hash = (c[0] * d^(m-1) + c[1] * d^(m-2) + ... + c[m-1]) % q

2. **Rolling Hash Update**:
   - Remove contribution of outgoing character
   - Add contribution of incoming character
   - new_hash = (d * (old_hash - outgoing * d^(m-1)) + incoming) % q

3. **Matching**:
   - If hash values match, compare strings character by character
   - This handles hash collisions (spurious hits)

### Time Complexity
- **Average Case**: O(n + m)
- **Worst Case**: O(nm) when many hash collisions occur
- Where n = text length, m = pattern length

### Space Complexity
- O(1) extra space

### Hash Function Properties

A good hash function for Rabin-Karp should:
1. Be computed in O(m) time for a string of length m
2. Allow O(1) time updates when sliding the window
3. Distribute hash values uniformly to minimize collisions
