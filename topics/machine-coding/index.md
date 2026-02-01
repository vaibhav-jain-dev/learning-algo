# Machine Coding

## Overview

Machine coding rounds test your ability to design and implement real-world systems from scratch within a limited time (typically 60-90 minutes). These problems evaluate object-oriented design, code organization, API design, and the ability to handle edge cases under pressure.

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 24px 0;">
<div style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border-radius: 12px; padding: 20px; text-align: center;">
<div style="font-size: 32px; margin-bottom: 8px;">60-90</div>
<h4 style="color: #991b1b; margin: 0 0 8px 0;">Minutes</h4>
<p style="color: #475569; font-size: 13px; margin: 0;">Typical time limit</p>
</div>
<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 20px; text-align: center;">
<div style="font-size: 32px; margin-bottom: 8px;">OOP</div>
<h4 style="color: #1e40af; margin: 0 0 8px 0;">Design Focus</h4>
<p style="color: #475569; font-size: 13px; margin: 0;">Clean architecture matters</p>
</div>
<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 20px; text-align: center;">
<div style="font-size: 32px; margin-bottom: 8px;">12</div>
<h4 style="color: #166534; margin: 0 0 8px 0;">Problems</h4>
<p style="color: #475569; font-size: 13px; margin: 0;">Core patterns covered</p>
</div>
</div>

---

## Problem Categories

### Data Structure Implementations

Core data structures that appear frequently in interviews.

<div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; padding: 20px; margin: 16px 0; display: flex; flex-direction: column; gap: 8px;">
<a href="/topic/machine-coding/lru-cache" style="color: #1e40af; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>LRU Cache</strong> - HashMap + Doubly Linked List for O(1) cache operations
</a>
<a href="/topic/machine-coding/in-memory-database" style="color: #1e40af; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>In-Memory Database</strong> - Key-value store with indexing and query support
</a>
</div>

### System Components

Building blocks of larger distributed systems.

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 20px; margin: 16px 0; display: flex; flex-direction: column; gap: 8px;">
<a href="/topic/machine-coding/rate-limiter" style="color: #166534; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Rate Limiter</strong> - Token bucket, sliding window, and leaky bucket algorithms
</a>
<a href="/topic/machine-coding/url-shortener" style="color: #166534; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>URL Shortener</strong> - Base62 encoding, collision handling, and analytics
</a>
<a href="/topic/machine-coding/task-scheduler" style="color: #166534; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Task Scheduler</strong> - Priority queues, delayed execution, and cron expressions
</a>
<a href="/topic/machine-coding/pub-sub-system" style="color: #166534; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Pub-Sub System</strong> - Topic-based messaging with subscriber management
</a>
<a href="/topic/machine-coding/logger-library" style="color: #166534; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Logger Library</strong> - Log levels, formatters, handlers, and rotation
</a>
</div>

### Object-Oriented Design Problems

Classic OOD problems testing design principles.

<div style="background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-radius: 12px; padding: 20px; margin: 16px 0; display: flex; flex-direction: column; gap: 8px;">
<a href="/topic/machine-coding/parking-lot" style="color: #7c3aed; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Parking Lot</strong> - Multi-level parking with different vehicle types and pricing
</a>
<a href="/topic/machine-coding/elevator-system" style="color: #7c3aed; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Elevator System</strong> - Multiple elevators with scheduling algorithms
</a>
<a href="/topic/machine-coding/file-system" style="color: #7c3aed; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>File System</strong> - Directory structure, permissions, and file operations
</a>
</div>

### Game Implementations

Games that test state management and game logic.

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; margin: 16px 0; display: flex; flex-direction: column; gap: 8px;">
<a href="/topic/machine-coding/snake-game" style="color: #92400e; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Snake Game</strong> - Classic snake with collision detection and growth mechanics
</a>
<a href="/topic/machine-coding/tic-tac-toe" style="color: #92400e; text-decoration: none; display: block; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.7); transition: background 0.2s;">
<strong>Tic-Tac-Toe</strong> - Game board, win detection, and optional AI opponent
</a>
</div>

---

## Interview Approach

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 32px; margin: 20px 0;">
<h3 style="color: #1e293b; text-align: center; margin: 0 0 24px 0;">MACHINE CODING INTERVIEW FRAMEWORK</h3>

<div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; flex-wrap: wrap;">

<div style="flex: 1; min-width: 200px; background: rgba(35, 134, 54, 0.1); border: 1px solid rgba(35, 134, 54, 0.3); border-radius: 12px; padding: 20px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
<div style="background: #238636; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">1</div>
<h4 style="color: #16a34a; margin: 0;">Clarify (5-10 min)</h4>
</div>
<div style="color: #475569; font-size: 13px;">
<p>Gather requirements</p>
<p>Define core features</p>
<p>Identify edge cases</p>
</div>
</div>

<div style="flex: 1; min-width: 200px; background: rgba(31, 111, 235, 0.1); border: 1px solid rgba(31, 111, 235, 0.3); border-radius: 12px; padding: 20px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
<div style="background: #1f6feb; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">2</div>
<h4 style="color: #1d4ed8; margin: 0;">Design (10-15 min)</h4>
</div>
<div style="color: #475569; font-size: 13px;">
<p>Identify classes/interfaces</p>
<p>Define relationships</p>
<p>Plan data structures</p>
</div>
</div>

<div style="flex: 1; min-width: 200px; background: rgba(137, 87, 229, 0.1); border: 1px solid rgba(137, 87, 229, 0.3); border-radius: 12px; padding: 20px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
<div style="background: #8957e5; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">3</div>
<h4 style="color: #7c3aed; margin: 0;">Implement (40-50 min)</h4>
</div>
<div style="color: #475569; font-size: 13px;">
<p>Start with core logic</p>
<p>Add features incrementally</p>
<p>Handle edge cases</p>
</div>
</div>

<div style="flex: 1; min-width: 200px; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 20px;">
<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
<div style="background: #f59e0b; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">4</div>
<h4 style="color: #d97706; margin: 0;">Test (5-10 min)</h4>
</div>
<div style="color: #475569; font-size: 13px;">
<p>Run through examples</p>
<p>Verify edge cases</p>
<p>Discuss extensions</p>
</div>
</div>

</div>
</div>

---

## Key Skills Evaluated

| Skill | What Interviewers Look For |
|-------|---------------------------|
| **OOP Design** | Proper use of classes, interfaces, inheritance, composition |
| **SOLID Principles** | Single responsibility, open/closed, dependency inversion |
| **Code Organization** | Separation of concerns, modularity, readability |
| **API Design** | Clear interfaces, consistent naming, proper abstractions |
| **Edge Cases** | Null handling, boundary conditions, error scenarios |
| **Time Management** | Prioritizing core features over nice-to-haves |

---

## Content Format

All machine coding documentation uses a hybrid Markdown + inline HTML approach:

- **Problem Statement**: Clear requirements and constraints
- **Solution Architecture**: Visual diagrams and class relationships
- **Implementation**: Clean, production-quality code with comments
- **Interview Questions**: Progressive difficulty from L1 to L3
