# Arrays - Interview Mastery Guide

## Category Overview

Arrays are the most fundamental data structure in computer science, serving as the building blocks for nearly every other data structure and algorithm. An array stores elements in contiguous memory locations, enabling O(1) random access by index. This simple yet powerful structure appears in approximately **40-50% of all coding interview questions**, making it the most frequently tested topic.

Understanding arrays deeply means understanding memory layout, cache efficiency, and how modern CPUs optimize sequential access patterns. Arrays provide the foundation for stacks, queues, heaps, hash tables, and even more complex structures like segment trees and suffix arrays.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Why Arrays Dominate Interviews</h3>
<div style="color: #334155;">
<ul>
<li><strong>Universal Foundation</strong>: Every programmer knows arrays, creating equal footing</li>
<li><strong>Multiple Solutions</strong>: Most problems have brute force to optimal progressions</li>
<li><strong>Pattern Recognition</strong>: Tests ability to identify and apply known techniques</li>
<li><strong>Optimization Skills</strong>: Shows how candidates improve time/space complexity</li>
<li><strong>Edge Case Handling</strong>: Reveals attention to boundary conditions</li>
</ul>
</div>
</div>

**Companies that heavily test arrays**: Google (sliding window, two pointers), Amazon (subarray problems), Meta (optimization), Microsoft (matrix operations), Apple (in-place modifications).

## Key Patterns

Mastering array problems requires recognizing these fundamental patterns:

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Pattern Recognition Guide</h3>

<div style="display: flex; flex-direction: column; gap: 12px;">

<!-- Two Pointers -->
<div style="display: grid; grid-template-columns: 1fr 1.5fr 1.5fr; gap: 12px; background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 16px; border-radius: 10px; border-left: 4px solid #3b82f6;">
<div style="font-weight: 700; color: #1e40af;">Two Pointers</div>
<div style="color: #1e3a8a; font-size: 0.9rem;">Sorted arrays, pairs, partitioning</div>
<div style="color: #1e40af; font-size: 0.85rem;"><span style="background: rgba(59,130,246,0.2); padding: 2px 6px; border-radius: 4px;">Two Sum</span> <span style="background: rgba(59,130,246,0.2); padding: 2px 6px; border-radius: 4px;">Three Sum</span> <span style="background: rgba(59,130,246,0.2); padding: 2px 6px; border-radius: 4px;">Container With Most Water</span></div>
</div>

<!-- Sliding Window -->
<div style="display: grid; grid-template-columns: 1fr 1.5fr 1.5fr; gap: 12px; background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 16px; border-radius: 10px; border-left: 4px solid #22c55e;">
<div style="font-weight: 700; color: #166534;">Sliding Window</div>
<div style="color: #14532d; font-size: 0.9rem;">Contiguous subarrays, fixed/variable window</div>
<div style="color: #166534; font-size: 0.85rem;"><span style="background: rgba(34,197,94,0.2); padding: 2px 6px; border-radius: 4px;">Max Subarray Sum</span> <span style="background: rgba(34,197,94,0.2); padding: 2px 6px; border-radius: 4px;">Longest Substring</span></div>
</div>

<!-- Hash Map/Set -->
<div style="display: grid; grid-template-columns: 1fr 1.5fr 1.5fr; gap: 12px; background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); padding: 16px; border-radius: 10px; border-left: 4px solid #a855f7;">
<div style="font-weight: 700; color: #7c3aed;">Hash Map/Set</div>
<div style="color: #6b21a8; font-size: 0.9rem;">Finding pairs, counting duplicates, lookups</div>
<div style="color: #7c3aed; font-size: 0.85rem;"><span style="background: rgba(168,85,247,0.2); padding: 2px 6px; border-radius: 4px;">Two Sum</span> <span style="background: rgba(168,85,247,0.2); padding: 2px 6px; border-radius: 4px;">First Duplicate</span> <span style="background: rgba(168,85,247,0.2); padding: 2px 6px; border-radius: 4px;">Subarray Sum Equals K</span></div>
</div>

<!-- Prefix Sum -->
<div style="display: grid; grid-template-columns: 1fr 1.5fr 1.5fr; gap: 12px; background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 16px; border-radius: 10px; border-left: 4px solid #f59e0b;">
<div style="font-weight: 700; color: #92400e;">Prefix Sum</div>
<div style="color: #78350f; font-size: 0.9rem;">Range queries, subarray sums, cumulative ops</div>
<div style="color: #92400e; font-size: 0.85rem;"><span style="background: rgba(245,158,11,0.2); padding: 2px 6px; border-radius: 4px;">Zero Sum Subarray</span> <span style="background: rgba(245,158,11,0.2); padding: 2px 6px; border-radius: 4px;">Contiguous Array</span></div>
</div>

<!-- Binary Search -->
<div style="display: grid; grid-template-columns: 1fr 1.5fr 1.5fr; gap: 12px; background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); padding: 16px; border-radius: 10px; border-left: 4px solid #ef4444;">
<div style="font-weight: 700; color: #991b1b;">Binary Search</div>
<div style="color: #7f1d1d; font-size: 0.9rem;">Sorted arrays, finding boundaries, rotated</div>
<div style="color: #991b1b; font-size: 0.85rem;"><span style="background: rgba(239,68,68,0.2); padding: 2px 6px; border-radius: 4px;">Search Insert Position</span> <span style="background: rgba(239,68,68,0.2); padding: 2px 6px; border-radius: 4px;">Find First and Last</span></div>
</div>

<!-- In-Place Modify -->
<div style="display: grid; grid-template-columns: 1fr 1.5fr 1.5fr; gap: 12px; background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%); padding: 16px; border-radius: 10px; border-left: 4px solid #0ea5e9;">
<div style="font-weight: 700; color: #0369a1;">In-Place Modify</div>
<div style="color: #0c4a6e; font-size: 0.9rem;">O(1) space constraint, marking visited</div>
<div style="color: #0369a1; font-size: 0.85rem;"><span style="background: rgba(14,165,233,0.2); padding: 2px 6px; border-radius: 4px;">Move Zeroes</span> <span style="background: rgba(14,165,233,0.2); padding: 2px 6px; border-radius: 4px;">Dutch Flag</span> <span style="background: rgba(14,165,233,0.2); padding: 2px 6px; border-radius: 4px;">First Duplicate Value</span></div>
</div>

</div>
</div>

### Pattern 1: Two Pointers
The two-pointer technique uses two indices that move toward each other or in the same direction. It transforms O(n^2) brute force into O(n) solutions.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Two Pointers Visualization</h4>
<div style="color: #64748b; margin-bottom: 16px;">Finding pair with target sum = <span style="background: #22c55e; color: white; padding: 2px 8px; border-radius: 4px; font-weight: 600;">13</span> in sorted array:</div>

<!-- Step 1 -->
<div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<span style="background: #3b82f6; color: white; padding: 2px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">Step 1</span>
</div>
<div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap; font-family: monospace;">
<span style="background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px;">L:1</span>
<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px;">2</span>
<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px;">3</span>
<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px;">4</span>
<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px;">6</span>
<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px;">8</span>
<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px;">9</span>
<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px;">14</span>
<span style="background: #ef4444; color: white; padding: 4px 8px; border-radius: 4px;">R:15</span>
</div>
<div style="color: #64748b; font-size: 0.9rem; margin-top: 8px;">Sum = 1 + 15 = <span style="color: #ef4444; font-weight: 600;">16 &gt; 13</span>, move R left</div>
</div>

<!-- Step 3 -->
<div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<span style="background: #a855f7; color: white; padding: 2px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">Step 3</span>
</div>
<div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap; font-family: monospace;">
<span style="background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px;">L:1</span>
<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px;">2</span>
<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px;">3</span>
<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px;">4</span>
<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px;">6</span>
<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px;">8</span>
<span style="background: #ef4444; color: white; padding: 4px 8px; border-radius: 4px;">R:9</span>
<span style="background: #94a3b8; color: white; padding: 4px 8px; border-radius: 4px; text-decoration: line-through;">14</span>
<span style="background: #94a3b8; color: white; padding: 4px 8px; border-radius: 4px; text-decoration: line-through;">15</span>
</div>
<div style="color: #64748b; font-size: 0.9rem; margin-top: 8px;">Sum = 1 + 9 = <span style="color: #3b82f6; font-weight: 600;">10 &lt; 13</span>, move L right</div>
</div>

<!-- Step 6 - FOUND -->
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border: 2px solid #22c55e; border-radius: 8px; padding: 12px;">
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<span style="background: #22c55e; color: white; padding: 2px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">Step 6 - FOUND!</span>
</div>
<div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap; font-family: monospace;">
<span style="background: #94a3b8; color: white; padding: 4px 8px; border-radius: 4px; text-decoration: line-through;">1</span>
<span style="background: #94a3b8; color: white; padding: 4px 8px; border-radius: 4px; text-decoration: line-through;">2</span>
<span style="background: #94a3b8; color: white; padding: 4px 8px; border-radius: 4px; text-decoration: line-through;">3</span>
<span style="background: #22c55e; color: white; padding: 4px 8px; border-radius: 4px; font-weight: 700;">L:4</span>
<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px;">6</span>
<span style="background: #e2e8f0; padding: 4px 8px; border-radius: 4px;">8</span>
<span style="background: #22c55e; color: white; padding: 4px 8px; border-radius: 4px; font-weight: 700;">R:9</span>
<span style="background: #94a3b8; color: white; padding: 4px 8px; border-radius: 4px; text-decoration: line-through;">14</span>
<span style="background: #94a3b8; color: white; padding: 4px 8px; border-radius: 4px; text-decoration: line-through;">15</span>
</div>
<div style="color: #166534; font-size: 0.9rem; margin-top: 8px; font-weight: 600;">Sum = 4 + 9 = 13 = target!</div>
</div>

<!-- Key Insight -->
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-left: 4px solid #3b82f6; padding: 12px 16px; margin-top: 16px; border-radius: 0 8px 8px 0;">
<strong style="color: #1e40af;">Key Insight:</strong>
<span style="color: #1e3a8a;"> Each step eliminates either the smallest or largest remaining element, guaranteeing O(n) time complexity.</span>
</div>
</div>

### Pattern 2: Sliding Window
Sliding window maintains a contiguous subset of elements, expanding or shrinking based on conditions. It's optimal for substring and subarray problems.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Sliding Window Visualization</h4>
<div style="color: #64748b; margin-bottom: 16px;">Find maximum sum of subarray with size <span style="background: #a855f7; color: white; padding: 2px 8px; border-radius: 4px; font-weight: 600;">k=3</span></div>

<div style="display: flex; flex-direction: column; gap: 12px;">

<!-- Window 1 -->
<div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<span style="background: #3b82f6; color: white; padding: 2px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">Window 1</span>
<span style="background: #e2e8f0; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem;">Sum = 8</span>
</div>
<div style="display: flex; gap: 4px; align-items: center; font-family: monospace;">
<span style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 6px 10px; border-radius: 4px; border: 2px solid #1d4ed8;">2</span>
<span style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 6px 10px; border-radius: 4px; border: 2px solid #1d4ed8;">1</span>
<span style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 6px 10px; border-radius: 4px; border: 2px solid #1d4ed8;">5</span>
<span style="background: #f1f5f9; padding: 6px 10px; border-radius: 4px; color: #64748b;">1</span>
<span style="background: #f1f5f9; padding: 6px 10px; border-radius: 4px; color: #64748b;">3</span>
<span style="background: #f1f5f9; padding: 6px 10px; border-radius: 4px; color: #64748b;">2</span>
</div>
</div>

<!-- Window 2 -->
<div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<span style="background: #a855f7; color: white; padding: 2px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">Window 2</span>
<span style="background: #e2e8f0; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem;">Sum = 7</span>
<span style="color: #64748b; font-size: 0.8rem;">(remove 2, add 1)</span>
</div>
<div style="display: flex; gap: 4px; align-items: center; font-family: monospace;">
<span style="background: #fee2e2; padding: 6px 10px; border-radius: 4px; color: #ef4444; text-decoration: line-through;">2</span>
<span style="background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); color: white; padding: 6px 10px; border-radius: 4px; border: 2px solid #7c3aed;">1</span>
<span style="background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); color: white; padding: 6px 10px; border-radius: 4px; border: 2px solid #7c3aed;">5</span>
<span style="background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); color: white; padding: 6px 10px; border-radius: 4px; border: 2px solid #7c3aed;">1</span>
<span style="background: #f1f5f9; padding: 6px 10px; border-radius: 4px; color: #64748b;">3</span>
<span style="background: #f1f5f9; padding: 6px 10px; border-radius: 4px; color: #64748b;">2</span>
</div>
</div>

<!-- Window 3 - MAX -->
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border: 2px solid #22c55e; border-radius: 8px; padding: 12px;">
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<span style="background: #22c55e; color: white; padding: 2px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">Window 3 - MAX!</span>
<span style="background: #22c55e; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem; font-weight: 700;">Sum = 9</span>
<span style="color: #166534; font-size: 0.8rem;">(remove 1, add 3)</span>
</div>
<div style="display: flex; gap: 4px; align-items: center; font-family: monospace;">
<span style="background: #f1f5f9; padding: 6px 10px; border-radius: 4px; color: #94a3b8;">2</span>
<span style="background: #fee2e2; padding: 6px 10px; border-radius: 4px; color: #ef4444; text-decoration: line-through;">1</span>
<span style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 6px 10px; border-radius: 4px; border: 2px solid #16a34a; font-weight: 700;">5</span>
<span style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 6px 10px; border-radius: 4px; border: 2px solid #16a34a; font-weight: 700;">1</span>
<span style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; padding: 6px 10px; border-radius: 4px; border: 2px solid #16a34a; font-weight: 700;">3</span>
<span style="background: #f1f5f9; padding: 6px 10px; border-radius: 4px; color: #64748b;">2</span>
</div>
</div>

<!-- Window 4 -->
<div style="background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px;">
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<span style="background: #f59e0b; color: white; padding: 2px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">Window 4</span>
<span style="background: #e2e8f0; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem;">Sum = 6</span>
<span style="color: #64748b; font-size: 0.8rem;">(remove 5, add 2)</span>
</div>
<div style="display: flex; gap: 4px; align-items: center; font-family: monospace;">
<span style="background: #f1f5f9; padding: 6px 10px; border-radius: 4px; color: #94a3b8;">2</span>
<span style="background: #f1f5f9; padding: 6px 10px; border-radius: 4px; color: #94a3b8;">1</span>
<span style="background: #fee2e2; padding: 6px 10px; border-radius: 4px; color: #ef4444; text-decoration: line-through;">5</span>
<span style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 6px 10px; border-radius: 4px; border: 2px solid #d97706;">1</span>
<span style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 6px 10px; border-radius: 4px; border: 2px solid #d97706;">3</span>
<span style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 6px 10px; border-radius: 4px; border: 2px solid #d97706;">2</span>
</div>
</div>

</div>

<!-- Answer and Optimization -->
<div style="display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); padding: 12px 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
<strong style="color: #166534;">Answer: 9</strong>
</div>
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 12px 16px; border-radius: 8px; border-left: 4px solid #3b82f6; flex: 1; min-width: 200px;">
<strong style="color: #1e40af;">Optimization:</strong>
<span style="color: #1e3a8a;"> Slide window by subtracting left, adding right O(1). Total: O(n) instead of O(n*k)</span>
</div>
</div>
</div>

### Pattern 3: Prefix Sum
Prefix sums precompute cumulative totals, enabling O(1) range sum queries after O(n) preprocessing.

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Prefix Sum Visualization</h4>

<!-- Original Array -->
<div style="margin-bottom: 20px;">
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<span style="font-weight: 600; color: #64748b; width: 100px;">Original:</span>
<div style="display: flex; gap: 4px; font-family: monospace;">
<span style="background: #e2e8f0; padding: 8px 14px; border-radius: 4px; min-width: 32px; text-align: center;">3</span>
<span style="background: #e2e8f0; padding: 8px 14px; border-radius: 4px; min-width: 32px; text-align: center;">1</span>
<span style="background: #e2e8f0; padding: 8px 14px; border-radius: 4px; min-width: 32px; text-align: center;">2</span>
<span style="background: #e2e8f0; padding: 8px 14px; border-radius: 4px; min-width: 32px; text-align: center;">5</span>
<span style="background: #e2e8f0; padding: 8px 14px; border-radius: 4px; min-width: 32px; text-align: center;">4</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<span style="font-weight: 600; color: #64748b; width: 100px;">Index:</span>
<div style="display: flex; gap: 4px; font-family: monospace; color: #94a3b8; font-size: 0.85rem;">
<span style="padding: 8px 14px; min-width: 32px; text-align: center;">0</span>
<span style="padding: 8px 14px; min-width: 32px; text-align: center;">1</span>
<span style="padding: 8px 14px; min-width: 32px; text-align: center;">2</span>
<span style="padding: 8px 14px; min-width: 32px; text-align: center;">3</span>
<span style="padding: 8px 14px; min-width: 32px; text-align: center;">4</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 8px;">
<span style="font-weight: 600; color: #f59e0b; width: 100px;">Prefix Sum:</span>
<div style="display: flex; gap: 4px; font-family: monospace;">
<span style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 8px 14px; border-radius: 4px; min-width: 32px; text-align: center; border: 2px solid #f59e0b; color: #92400e; font-weight: 600;">3</span>
<span style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 8px 14px; border-radius: 4px; min-width: 32px; text-align: center; border: 2px solid #f59e0b; color: #92400e; font-weight: 600;">4</span>
<span style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 8px 14px; border-radius: 4px; min-width: 32px; text-align: center; border: 2px solid #f59e0b; color: #92400e; font-weight: 600;">6</span>
<span style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 8px 14px; border-radius: 4px; min-width: 32px; text-align: center; border: 2px solid #f59e0b; color: #92400e; font-weight: 600;">11</span>
<span style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 8px 14px; border-radius: 4px; min-width: 32px; text-align: center; border: 2px solid #f59e0b; color: #92400e; font-weight: 600;">15</span>
</div>
</div>
</div>

<!-- Range Sum Query -->
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 2px solid #3b82f6; border-radius: 10px; padding: 16px; margin-bottom: 16px;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 12px;">Range Sum Query: sum(index 1 to 3)</div>
<div style="display: flex; flex-direction: column; gap: 8px; font-family: monospace; color: #1e3a8a;">
<div>= prefix[3] - prefix[0]</div>
<div>= <span style="background: #3b82f6; color: white; padding: 2px 8px; border-radius: 4px;">11</span> - <span style="background: #3b82f6; color: white; padding: 2px 8px; border-radius: 4px;">3</span> = <span style="background: #22c55e; color: white; padding: 2px 8px; border-radius: 4px; font-weight: 700;">8</span></div>
<div style="color: #166534;">Verify: 1 + 2 + 5 = 8 &#10003;</div>
</div>
</div>

<!-- Zero-Sum Subarray Detection -->
<div style="background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%); border: 2px solid #a855f7; border-radius: 10px; padding: 16px; margin-bottom: 16px;">
<div style="font-weight: 700; color: #7c3aed; margin-bottom: 12px;">Zero-Sum Subarray Detection:</div>
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
<span style="font-weight: 600; color: #64748b; width: 100px;">Array:</span>
<div style="display: flex; gap: 4px; font-family: monospace;">
<span style="background: #e2e8f0; padding: 6px 10px; border-radius: 4px;">4</span>
<span style="background: #a855f7; color: white; padding: 6px 10px; border-radius: 4px;">2</span>
<span style="background: #a855f7; color: white; padding: 6px 10px; border-radius: 4px;">-3</span>
<span style="background: #a855f7; color: white; padding: 6px 10px; border-radius: 4px;">1</span>
<span style="background: #e2e8f0; padding: 6px 10px; border-radius: 4px;">6</span>
</div>
</div>
<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
<span style="font-weight: 600; color: #7c3aed; width: 100px;">Prefix Sum:</span>
<div style="display: flex; gap: 4px; font-family: monospace;">
<span style="background: #22c55e; color: white; padding: 6px 10px; border-radius: 4px; font-weight: 700; border: 2px solid #16a34a;">4</span>
<span style="background: #f3e8ff; padding: 6px 10px; border-radius: 4px; color: #6b21a8;">6</span>
<span style="background: #f3e8ff; padding: 6px 10px; border-radius: 4px; color: #6b21a8;">3</span>
<span style="background: #22c55e; color: white; padding: 6px 10px; border-radius: 4px; font-weight: 700; border: 2px solid #16a34a;">4</span>
<span style="background: #f3e8ff; padding: 6px 10px; border-radius: 4px; color: #6b21a8;">10</span>
</div>
</div>
<div style="color: #6b21a8;">Same prefix sum (<span style="font-weight: 700;">4</span>) at index 0 and 3!</div>
<div style="color: #6b21a8;">Subarray <span style="background: #a855f7; color: white; padding: 2px 6px; border-radius: 4px;">[2, -3, 1]</span> between indices 1-3 sums to 0.</div>
</div>

<!-- Key Insight -->
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-left: 4px solid #22c55e; padding: 12px 16px; border-radius: 0 8px 8px 0;">
<strong style="color: #166534;">Key Insight:</strong>
<span style="color: #14532d;"> If prefix[i] == prefix[j], then sum(i+1, j) = 0</span>
</div>
</div>

## Must-Know Problems with Solutions

### Problem 1: Two Number Sum

**Problem**: Find two numbers in an array that add up to a target sum.

**Approaches**:
1. **Brute Force**: Check all pairs - O(n^2) time, O(1) space
2. **Hash Set**: Store complements - O(n) time, O(n) space
3. **Two Pointers**: If sorted - O(n log n) time, O(1) space

```python
def two_number_sum(array, target_sum):
    """
    Hash Set Approach
    Time: O(n) | Space: O(n)
    """
    seen = set()
    for num in array:
        complement = target_sum - num
        if complement in seen:
            return [complement, num]
        seen.add(num)
    return []

def two_number_sum_sorted(array, target_sum):
    """
    Two Pointers (requires sorted array)
    Time: O(n) | Space: O(1)
    """
    array.sort()  # O(n log n) if not already sorted
    left, right = 0, len(array) - 1

    while left < right:
        current_sum = array[left] + array[right]
        if current_sum == target_sum:
            return [array[left], array[right]]
        elif current_sum < target_sum:
            left += 1
        else:
            right -= 1
    return []

# Example
array = [3, 5, -4, 8, 11, 1, -1, 6]
print(two_number_sum(array, 10))  # [-1, 11]
```

---

### Problem 2: Three Number Sum

**Problem**: Find all unique triplets that sum to a target value.

**Approach**: Sort array, fix first element, use two pointers for remaining two.

```python
def three_number_sum(array, target_sum):
    """
    Time: O(n^2) | Space: O(n) for output
    """
    array.sort()
    triplets = []

    for i in range(len(array) - 2):
        # Skip duplicates for first element
        if i > 0 and array[i] == array[i-1]:
            continue

        left = i + 1
        right = len(array) - 1

        while left < right:
            current_sum = array[i] + array[left] + array[right]

            if current_sum == target_sum:
                triplets.append([array[i], array[left], array[right]])
                # Skip duplicates
                while left < right and array[left] == array[left + 1]:
                    left += 1
                while left < right and array[right] == array[right - 1]:
                    right -= 1
                left += 1
                right -= 1
            elif current_sum < target_sum:
                left += 1
            else:
                right -= 1

    return triplets

# Example
array = [12, 3, 1, 2, -6, 5, -8, 6]
print(three_number_sum(array, 0))  # [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]
```

---

### Problem 3: Maximum Subarray (Kadane's Algorithm)

**Problem**: Find the contiguous subarray with the largest sum.

**Approach**: Track running sum, reset when it becomes negative.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Kadane's Algorithm Visualization</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]

Index:   0   1   2   3   4   5   6   7   8
Value:  -2   1  -3   4  -1   2   1  -5   4
Current:-2   1  -2   4   3   5   6   1   5
MaxSum: -2   1   1   4   4   5   6   6   6
  ↑           ↑
  Reset to 4    Maximum found!

Decision at each step:
- Current = max(array[i], current + array[i])
- "Should I extend the previous subarray or start fresh?"

Answer: 6 (subarray [4, -1, 2, 1])
</pre>
</div>

```python
def max_subarray_sum(array):
    """
    Kadane's Algorithm
    Time: O(n) | Space: O(1)
    """
    if not array:
        return 0

    max_sum = array[0]
    current_sum = array[0]

    for i in range(1, len(array)):
        # Either extend current subarray or start new one
        current_sum = max(array[i], current_sum + array[i])
        max_sum = max(max_sum, current_sum)

    return max_sum

def max_subarray_with_indices(array):
    """Extended version that returns the subarray indices"""
    max_sum = array[0]
    current_sum = array[0]
    start = end = 0
    temp_start = 0

    for i in range(1, len(array)):
        if array[i] > current_sum + array[i]:
            current_sum = array[i]
            temp_start = i
        else:
            current_sum += array[i]

        if current_sum > max_sum:
            max_sum = current_sum
            start = temp_start
            end = i

    return max_sum, start, end

# Example
array = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
print(max_subarray_sum(array))  # 6
```

---

### Problem 4: Merge Overlapping Intervals

**Problem**: Given a collection of intervals, merge all overlapping intervals.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Interval Merging Visualization</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Input intervals (sorted by start):
[1,2]  [3,5]  [4,7]  [6,8]  [9,10]

Timeline:
1---2     No overlap with previous
    3-----5
  4--------7  Overlaps! Merge [3,5] + [4,7] = [3,7]
  6--------8  Overlaps! Merge [3,7] + [6,8] = [3,8]
  9---10  No overlap

Result: [1,2], [3,8], [9,10]

Merge Logic:
- Sort by start time
- If current.start <= last.end: extend last.end
- Otherwise: add new interval
</pre>
</div>

```python
def merge_overlapping_intervals(intervals):
    """
    Time: O(n log n) | Space: O(n)
    """
    if not intervals:
        return []

    # Sort by start time
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for current in intervals[1:]:
        last = merged[-1]

        if current[0] <= last[1]:  # Overlapping
            last[1] = max(last[1], current[1])
        else:
            merged.append(current)

    return merged

# Example
intervals = [[1, 2], [3, 5], [4, 7], [6, 8], [9, 10]]
print(merge_overlapping_intervals(intervals))  # [[1, 2], [3, 8], [9, 10]]
```

---

### Problem 5: First Duplicate Value

**Problem**: Find the first duplicate value in an array containing integers 1 to n.

**Approach**: Use array values as indices, negate to mark visited.

```python
def first_duplicate_value(array):
    """
    Time: O(n) | Space: O(1)
    Uses the array itself as a hash map
    """
    for value in array:
        abs_value = abs(value)
        index = abs_value - 1  # Convert 1-indexed to 0-indexed

        if array[index] < 0:  # Already visited
            return abs_value

        array[index] *= -1  # Mark as visited

    return -1

# Example
array = [2, 1, 5, 2, 3, 3, 4]
print(first_duplicate_value(array))  # 2
```

---

### Problem 6: Spiral Matrix Traversal

**Problem**: Return all elements of a matrix in spiral order.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">Spiral Traversal Pattern</h4>
<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px;">
<p style="color: #1e293b; font-weight: 600; margin: 0 0 12px 0;">Matrix with Spiral Direction:</p>
<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 16px;">
<div style="display: flex; flex-direction: column; align-items: center;">
<div style="display: flex; align-items: center; margin-bottom: 4px;">
<span style="color: #3b82f6; font-size: 14px; margin-right: 4px;">START</span>
<span style="color: #3b82f6;">&#8594;&#8594;&#8594;</span>
</div>
<div style="display: grid; grid-template-columns: repeat(4, 40px); gap: 2px;">
<div style="background: #eff6ff; border: 1px solid #3b82f6; padding: 8px; text-align: center; color: #1e293b; font-weight: 500;">1</div>
<div style="background: #eff6ff; border: 1px solid #3b82f6; padding: 8px; text-align: center; color: #1e293b; font-weight: 500;">2</div>
<div style="background: #eff6ff; border: 1px solid #3b82f6; padding: 8px; text-align: center; color: #1e293b; font-weight: 500;">3</div>
<div style="background: #eff6ff; border: 1px solid #3b82f6; padding: 8px; text-align: center; color: #1e293b; font-weight: 500;">4</div>
<div style="background: #f0fdf4; border: 1px solid #22c55e; padding: 8px; text-align: center; color: #1e293b; font-weight: 500;">12</div>
<div style="background: #fefce8; border: 1px solid #eab308; padding: 8px; text-align: center; color: #1e293b; font-weight: 500;">13</div>
<div style="background: #fefce8; border: 1px solid #eab308; padding: 8px; text-align: center; color: #1e293b; font-weight: 500;">14</div>
<div style="background: #eff6ff; border: 1px solid #3b82f6; padding: 8px; text-align: center; color: #1e293b; font-weight: 500;">5</div>
<div style="background: #f0fdf4; border: 1px solid #22c55e; padding: 8px; text-align: center; color: #1e293b; font-weight: 500;">11</div>
<div style="background: #fefce8; border: 1px solid #eab308; padding: 8px; text-align: center; color: #1e293b; font-weight: 500;">16</div>
<div style="background: #fefce8; border: 1px solid #eab308; padding: 8px; text-align: center; color: #1e293b; font-weight: 500;">15</div>
<div style="background: #eff6ff; border: 1px solid #3b82f6; padding: 8px; text-align: center; color: #1e293b; font-weight: 500;">6</div>
<div style="background: #f0fdf4; border: 1px solid #22c55e; padding: 8px; text-align: center; color: #1e293b; font-weight: 500;">10</div>
<div style="background: #f0fdf4; border: 1px solid #22c55e; padding: 8px; text-align: center; color: #1e293b; font-weight: 500;">9</div>
<div style="background: #f0fdf4; border: 1px solid #22c55e; padding: 8px; text-align: center; color: #1e293b; font-weight: 500;">8</div>
<div style="background: #eff6ff; border: 1px solid #3b82f6; padding: 8px; text-align: center; color: #1e293b; font-weight: 500;">7</div>
</div>
<div style="display: flex; align-items: center; margin-top: 4px;">
<span style="color: #22c55e;">&#8592;&#8592;&#8592;</span>
</div>
</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; justify-content: center;">
<div style="display: flex; align-items: center; gap: 4px;"><span style="display: inline-block; width: 16px; height: 16px; background: #eff6ff; border: 1px solid #3b82f6;"></span><span style="color: #1e293b; font-size: 13px;">Outer spiral</span></div>
<div style="display: flex; align-items: center; gap: 4px;"><span style="display: inline-block; width: 16px; height: 16px; background: #f0fdf4; border: 1px solid #22c55e;"></span><span style="color: #1e293b; font-size: 13px;">Left/Bottom</span></div>
<div style="display: flex; align-items: center; gap: 4px;"><span style="display: inline-block; width: 16px; height: 16px; background: #fefce8; border: 1px solid #eab308;"></span><span style="color: #1e293b; font-size: 13px;">Inner spiral</span></div>
</div>
<p style="color: #1e293b; margin: 0 0 8px 0;"><strong>Order:</strong> 1 &#8594; 2 &#8594; 3 &#8594; 4 &#8594; 5 &#8594; 6 &#8594; 7 &#8594; 8 &#8594; 9 &#8594; 10 &#8594; 11 &#8594; 12 &#8594; 13 &#8594; 14 &#8594; 15 &#8594; 16</p>
<p style="color: #1e293b; margin: 0 0 8px 0;"><strong>Boundaries:</strong> top (row), bottom (row), left (col), right (col)</p>
<p style="color: #1e293b; margin: 0;"><strong>After each direction:</strong> Right: top++ | Down: right-- | Left: bottom-- | Up: left++</p>
</div>
</div>

```python
def spiral_traverse(matrix):
    """
    Time: O(n) | Space: O(n)
    """
    if not matrix:
        return []

    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while top <= bottom and left <= right:
        # Traverse right
        for col in range(left, right + 1):
            result.append(matrix[top][col])
        top += 1

        # Traverse down
        for row in range(top, bottom + 1):
            result.append(matrix[row][right])
        right -= 1

        # Traverse left (check if rows remain)
        if top <= bottom:
            for col in range(right, left - 1, -1):
                result.append(matrix[bottom][col])
            bottom -= 1

        # Traverse up (check if columns remain)
        if left <= right:
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][left])
            left += 1

    return result

# Example
matrix = [
    [1, 2, 3, 4],
    [12, 13, 14, 5],
    [11, 16, 15, 6],
    [10, 9, 8, 7]
]
print(spiral_traverse(matrix))  # [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
```

## Complexity Analysis Summary

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Time and Space Complexity Reference</h3>
<table style="width: 100%; border-collapse: collapse; color: #334155;">
<tr style="background: #e2e8f0;">
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Problem</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Time</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Space</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Key Technique</th>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Two Sum</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Hash Set</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Three Sum</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n^2)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Sort + Two Pointers</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Max Subarray</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(1)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Kadane's Algorithm</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Merge Intervals</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n log n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Sort + Greedy Merge</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">First Duplicate</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(1)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Index as Hash</td>
</tr>
<tr>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Spiral Matrix</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(m*n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">O(m*n)</td>
<td style="padding: 10px; border: 1px solid #e2e8f0;">Boundary Tracking</td>
</tr>
</table>
</div>

## Common Mistakes

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Pitfalls to Avoid</h3>
<div style="color: #334155;">

1. **Off-by-One Errors**: Arrays are 0-indexed; `array[len(array)]` causes IndexError
2. **Empty Array Handling**: Always check `if not array` before accessing elements
3. **Modifying While Iterating**: Use indices or iterate over a copy
4. **Integer Overflow**: Large sums may overflow in languages without arbitrary precision
5. **Forgetting to Sort**: Two-pointer on unsorted arrays doesn't work correctly
6. **Negative Numbers**: Affects min/max logic, especially in Kadane's algorithm
7. **Wrong Comparison Operators**: `<=` vs `<` in boundary conditions changes behavior
8. **Not Handling Duplicates**: Three Sum needs duplicate skipping for unique triplets

</div>
</div>

## Interview Tips

### Problem-Solving Framework

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin-top: 0;">The UMPIRE Method</h4>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
U - Understand the problem (ask clarifying questions)
M - Match to known patterns (two pointers? sliding window?)
P - Plan your approach (pseudocode)
I - Implement the solution
R - Review and test with examples
E - Evaluate complexity (time and space)

Time Allocation (45-minute interview):
0-5 min:  Understand problem, ask questions
5-10 min: Discuss approaches, identify pattern
10-35 min: Implement solution
35-45 min: Test with examples, optimize if time
</pre>
</div>

### Communication Phrases

- "Let me start with the brute force approach to establish a baseline..."
- "I notice the array is sorted, so two pointers might optimize this..."
- "To improve from O(n^2) to O(n), I can trade space for time with a hash map..."
- "Let me trace through this example to verify my logic..."
- "The edge cases I need to handle are: empty array, single element, all duplicates..."

## Practice Problems

### Easy
1. Two Number Sum
2. Validate Subsequence
3. Sorted Squared Array
4. Tournament Winner
5. Non-Constructible Change

### Medium
6. Three Number Sum
7. Smallest Difference
8. Move Element To End
9. Monotonic Array
10. Spiral Traverse
11. Longest Peak
12. Array Of Products
13. First Duplicate Value
14. Merge Overlapping Intervals
15. Zero Sum Subarray

### Hard
16. Four Number Sum
17. Subarray Sort
18. Largest Range
19. Min Rewards
20. Zigzag Traverse
21. Longest Subarray With Sum

### Very Hard
22. Apartment Hunting
23. Calendar Matching
24. Waterfall Streams
25. Minimum Area Rectangle

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h3 style="color: #1e293b; margin-top: 0;">Quick Reference Formulas</h3>
<pre style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #334155;">
Kadane's Algorithm:
  current = max(arr[i], current + arr[i])

Prefix Sum:
  prefix[i] = prefix[i-1] + arr[i]

Range Sum Query:
  sum(i, j) = prefix[j] - prefix[i-1]

Two Pointers (sorted):
  if sum < target: left++
  if sum > target: right--

Sliding Window (fixed size k):
  window_sum = window_sum - arr[i-k] + arr[i]
</pre>
</div>
