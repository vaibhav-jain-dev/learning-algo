<div id="viz-config" style="display:none">
{"name":"Airport Connections","algorithm":"graph-connections","complexity":{"time":"O(A * (A + R))","space":"O(A + R)"},"examples":[{"input":{"airports":["BGI","CDG","DEL","DOH","DSM","EWR","EYW","HND","ICN","JFK","LGA","LHR","ORD","SAN","SFO","SIN","TLV","BUD"],"routes":[["DSM","ORD"],["ORD","BGI"],["BGI","LGA"],["SIN","CDG"],["CDG","SIN"],["CDG","BUD"],["DEL","DOH"],["DEL","CDG"],["TLV","DEL"],["EWR","HND"],["HND","ICN"],["HND","JFK"],["ICN","JFK"],["JFK","LGA"],["EYW","LHR"],["LHR","SFO"],["SFO","SAN"],["SFO","DSM"],["SAN","EYW"]],"startingAirport":"LGA"},"output":3,"inputRaw":"18 airports, 19 routes, starting from LGA","outputRaw":"3"}]}
</div>

# Airport Connections

**Difficulty:** Very Hard (Red)

## Problem Statement

You're given a list of airports (represented as three-letter codes), a list of one-way flight routes connecting these airports, and a starting airport.

Write a function that returns the minimum number of additional one-way routes that need to be added so that you can reach any airport from the starting airport.

Note that routes are one-way (directed), so just because you can fly from airport A to airport B doesn't mean you can fly from B to A.

## Examples

**Example 1:**
```
Input:
airports = ["BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW", "HND", "ICN", "JFK", "LGA", "LHR", "ORD", "SAN", "SFO", "SIN", "TLV", "BUD"]

routes = [
    ["DSM", "ORD"], ["ORD", "BGI"], ["BGI", "LGA"], ["SIN", "CDG"],
    ["CDG", "SIN"], ["CDG", "BUD"], ["DEL", "DOH"], ["DEL", "CDG"],
    ["TLV", "DEL"], ["EWR", "HND"], ["HND", "ICN"], ["HND", "JFK"],
    ["ICN", "JFK"], ["JFK", "LGA"], ["EYW", "LHR"], ["LHR", "SFO"],
    ["SFO", "SAN"], ["SFO", "DSM"], ["SAN", "EYW"]
]

startingAirport = "LGA"

Output: 3

Explanation:
- From LGA, we can't reach: TLV, DEL, DOH, CDG, SIN, BUD, EWR, HND, ICN, JFK, EYW, LHR, SFO, SAN, DSM, ORD, BGI
- However, these form connected components. Adding routes to:
  1. One airport in the TLV component covers: TLV->DEL->DOH and TLV->DEL->CDG->SIN->CDG->BUD
  2. One airport in the EWR component covers: EWR->HND->ICN->JFK and EWR->HND->JFK
  3. One airport in the EYW component covers: EYW->LHR->SFO->SAN->EYW and SFO->DSM->ORD->BGI
```

## Constraints

- All airport codes are unique three-letter strings
- Routes are directed (one-way)
- There are no duplicate routes
- The starting airport is guaranteed to be in the airports list

## Hints

<details>
<summary>Hint 1</summary>
First, find all airports reachable from the starting airport. The unreachable airports form the problem space.
</details>

<details>
<summary>Hint 2</summary>
Find strongly connected components (SCCs) among unreachable airports. Each SCC can be reached with one route.
</details>

<details>
<summary>Hint 3</summary>
Build a graph of SCCs and find ones with no incoming edges from other unreachable SCCs. These need direct routes.
</details>

<details>
<summary>Hint 4</summary>
Score each unreachable SCC by how many airports it can reach. Greedily add routes to SCCs with highest scores.
</details>

## Approach

### Algorithm Overview
1. Build an adjacency list from the routes
2. Find all airports reachable from the starting airport using DFS
3. Identify unreachable airports
4. Find strongly connected components (SCCs) among unreachable airports
5. Build a graph of SCCs and find SCCs with no incoming edges
6. Score SCCs by number of reachable airports
7. Greedily select SCCs to minimize number of routes needed

### Detailed Steps
1. DFS from starting airport to find reachable airports
2. Use Tarjan's or Kosaraju's algorithm for SCCs
3. Create DAG of SCCs
4. Identify "root" SCCs (no incoming edges from other unreachable SCCs)
5. Each root SCC needs one route

**Time Complexity:** O(A * (A + R) + A + R + A * log(A)) where A is airports, R is routes
**Space Complexity:** O(A + R)

---

## Similar Problems (Harder)

### 1. Minimum Cost Airport Connections
**Difficulty:** Very Hard

Each route has a cost to add. Find the minimum total cost to make all airports reachable.

### 2. Bi-directional Airport Connections
**Difficulty:** Hard

Find minimum routes to add so you can travel from any airport to any other airport (both directions).

### 3. Airport Connections with Capacity
**Difficulty:** Very Hard

Each route has a maximum number of flights per day. Find minimum routes such that K flights can reach any airport.
