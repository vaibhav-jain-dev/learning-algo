<div id="viz-config" style="display:none">
{"name":"Accounts Merge","algorithm":"union-find","complexity":{"time":"O(NK log NK)","space":"O(NK)"},"examples":[{"input":{"accounts":[["John","a@m.co","b@m.co"],["John","c@m.co"],["John","a@m.co","d@m.co"]]},"output":[["John","a@m.co","b@m.co","d@m.co"],["John","c@m.co"]],"inputRaw":"accounts = [[\"John\",\"a@m.co\",\"b@m.co\"],[\"John\",\"c@m.co\"],[\"John\",\"a@m.co\",\"d@m.co\"]]","outputRaw":"[[\"John\",\"a@m.co\",\"b@m.co\",\"d@m.co\"],[\"John\",\"c@m.co\"]]"}]}
</div>

# Accounts Merge

**Difficulty:** Medium

## Problem Statement

Given a list of accounts where each element is a list of strings, where the first element is a name and the rest are emails. Merge accounts that share at least one email. Return accounts in sorted order.

## Examples

**Example 1:**
```
Input: accounts = [["John","a@m.co","b@m.co"],["John","c@m.co"],["John","a@m.co","d@m.co"]]
Output: [["John","a@m.co","b@m.co","d@m.co"],["John","c@m.co"]]
```

## Visual Explanation

<table style="border-collapse: collapse; margin: 15px 0; font-family: monospace;">
<tr style="background: #f8f9fa;">
<th style="border: 1px solid #ddd; padding: 10px;">Account</th>
<th style="border: 1px solid #ddd; padding: 10px;">Emails</th>
<th style="border: 1px solid #ddd; padding: 10px;">Common Email</th>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">0</td>
<td style="border: 1px solid #ddd; padding: 10px;">a@, b@</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">a@ with account 2</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">1</td>
<td style="border: 1px solid #ddd; padding: 10px;">c@</td>
<td style="border: 1px solid #ddd; padding: 10px;">None</td>
</tr>
<tr>
<td style="border: 1px solid #ddd; padding: 10px;">2</td>
<td style="border: 1px solid #ddd; padding: 10px;">a@, d@</td>
<td style="border: 1px solid #ddd; padding: 10px; background: #d4edda;">a@ with account 0</td>
</tr>
</table>

## Approach

Map emails to account indices, use Union-Find to group accounts, then collect and sort emails.

**Time Complexity:** O(NK log NK) where N is accounts, K is max emails
**Space Complexity:** O(NK)
