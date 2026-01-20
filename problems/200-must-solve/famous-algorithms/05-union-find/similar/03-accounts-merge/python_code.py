"""
Accounts Merge - Python Solution

Time Complexity: O(NK log NK)
Space Complexity: O(NK)
"""

from typing import List
from collections import defaultdict


class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        self.parent[self.find(x)] = self.find(y)


def accounts_merge(accounts: List[List[str]]) -> List[List[str]]:
    """
    Merge accounts that share common emails.
    """
    n = len(accounts)
    uf = UnionFind(n)

    # Map email to first account that contains it
    email_to_account = {}

    for i, account in enumerate(accounts):
        for email in account[1:]:
            if email in email_to_account:
                uf.union(i, email_to_account[email])
            else:
                email_to_account[email] = i

    # Group emails by root account
    root_to_emails = defaultdict(set)
    for email, account_id in email_to_account.items():
        root = uf.find(account_id)
        root_to_emails[root].add(email)

    # Build result
    result = []
    for root, emails in root_to_emails.items():
        name = accounts[root][0]
        result.append([name] + sorted(emails))

    return result


# Test cases
if __name__ == "__main__":
    accounts1 = [["John","a@m.co","b@m.co"],["John","c@m.co"],["John","a@m.co","d@m.co"]]
    print(f"Test 1: {accounts_merge(accounts1)}")
    # Expected: [["John","a@m.co","b@m.co","d@m.co"],["John","c@m.co"]]

    accounts2 = [["Mary","m@m.co"]]
    print(f"Test 2: {accounts_merge(accounts2)}")
    # Expected: [["Mary","m@m.co"]]

    print("\nAll tests completed!")
