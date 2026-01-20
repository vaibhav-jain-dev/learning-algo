<div id="viz-config" style="display:none">
{"name":"Detect Arbitrage","algorithm":"graph-arbitrage","complexity":{"time":"O(N^3)","space":"O(N^2)"},"examples":[{"input":{"exchangeRates":[[1.0,0.8631,0.5903],[1.1586,1.0,0.6849],[1.6939,1.46,1.0]]},"output":true,"inputRaw":"3x3 exchange rates (USD, EUR, GBP)","outputRaw":"true"},{"input":{"exchangeRates":[[1.0,0.5,0.25],[2.0,1.0,0.5],[4.0,2.0,1.0]]},"output":false,"inputRaw":"3x3 consistent exchange rates","outputRaw":"false"}]}
</div>

# Detect Arbitrage

**Difficulty:** Very Hard (Red)

## Problem Statement

You're given a two-dimensional array that represents an exchange rates table. The array contains rates for converting one currency into another. For example, `exchangeRates[i][j]` represents the rate for converting currency `i` into currency `j`.

Write a function that returns a boolean indicating whether or not an arbitrage opportunity exists with these exchange rates.

An arbitrage occurs when you can start with one currency, exchange it for others through a series of transactions, and end up with more of the original currency than you started with.

## Examples

**Example 1:**
```
Input: exchangeRates = [
    [1.0, 0.8631, 0.5903],
    [1.1586, 1.0, 0.6849],
    [1.6939, 1.46, 1.0]
]

(Currency 0 = USD, Currency 1 = EUR, Currency 2 = GBP)

Output: true

Explanation:
Starting with 1 USD:
- 1 USD -> 0.8631 EUR (rate: 0.8631)
- 0.8631 EUR -> 0.5912 GBP (rate: 0.6849)
- 0.5912 GBP -> 1.0015 USD (rate: 1.6939)

We end up with 1.0015 USD, which is more than we started with!
```

**Example 2:**
```
Input: exchangeRates = [
    [1.0, 0.5, 0.25],
    [2.0, 1.0, 0.5],
    [4.0, 2.0, 1.0]
]

Output: false

Explanation: No sequence of exchanges yields more than the starting amount.
These are consistent exchange rates with no arbitrage opportunity.
```

## Constraints

- exchangeRates is a square matrix (n x n)
- exchangeRates[i][i] = 1.0 (rate of currency to itself is 1)
- All rates are positive
- There's at least one currency

## Hints

<details>
<summary>Hint 1</summary>
Think of currencies as nodes in a graph and exchange rates as edge weights.
</details>

<details>
<summary>Hint 2</summary>
Arbitrage exists if you can find a cycle where the product of rates > 1.
</details>

<details>
<summary>Hint 3</summary>
Convert multiplication to addition using logarithms: log(a*b) = log(a) + log(b).
Arbitrage exists if sum of log(rates) > 0, or equivalently, sum of -log(rates) < 0.
</details>

<details>
<summary>Hint 4</summary>
Use Bellman-Ford algorithm to detect negative cycles in the graph with -log(rate) as edge weights.
</details>

## Approach

### Key Insight
- Arbitrage: product of rates in a cycle > 1
- Taking log: sum of log(rates) > 0
- Negating: sum of -log(rates) < 0
- This is equivalent to finding a negative cycle in a graph!

### Algorithm (Bellman-Ford)
1. Create a graph where edge weight from i to j is -log(exchangeRates[i][j])
2. Initialize distances from source (any node) to all nodes
3. Relax all edges V-1 times
4. Check for negative cycle: if any edge can still be relaxed, arbitrage exists

### Alternative: V iterations starting from each vertex

**Time Complexity:** O(N^3) where N is the number of currencies
**Space Complexity:** O(N^2) for the graph or O(N) for distances

---

## Similar Problems (Harder)

### 1. Maximum Arbitrage Profit
**Difficulty:** Very Hard

Find the maximum profit percentage possible from arbitrage in a single cycle of exchanges.

### 2. Arbitrage with Transaction Fees
**Difficulty:** Very Hard

Detect arbitrage when each exchange has a transaction fee that reduces the amount exchanged.

### 3. K-Currency Arbitrage
**Difficulty:** Hard

Find if arbitrage exists using at most K currency exchanges (limited cycle length).
