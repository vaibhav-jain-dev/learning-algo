# Memento Pattern

## Overview

The Memento pattern captures and externalizes an object's internal state so that the object can be restored to this state later, without violating encapsulation. It enables undo/redo functionality, checkpoints, and transaction rollback by storing snapshots of an object's state.

**Difficulty:** Intermediate
**Category:** Behavioral Pattern
**Also Known As:** Snapshot, Token

---

## Simple Explanation: The Video Game Save Point Analogy

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #cbd5e1;">
  <div style="font-size: 2.5rem; text-align: center; margin-bottom: 16px;">&#127918;</div>
  <div style="font-size: 1.3rem; font-weight: 700; color: #1e293b; text-align: center; margin-bottom: 12px;">Think of a Video Game Save Point</div>
  <div style="color: #334155; font-size: 1rem; line-height: 1.7;">
    When you save a video game, you create a snapshot of everything: your character's position, health, inventory, quest progress, and world state. Later, if you die or want to replay a section, you can load that save and restore the exact game state. The save file doesn't know HOW the game works internally - it just stores the data. The game (originator) creates saves and can restore from them. Your save slot manager (caretaker) holds onto these saves without peeking inside.
  </div>
  <div style="margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
    <div style="background: #dbeafe; padding: 12px 16px; border-radius: 8px; text-align: center;">
      <div style="color: #1e40af; font-weight: 600;">Game State</div>
      <div style="color: #3b82f6; font-size: 0.85rem;">Originator</div>
    </div>
    <div style="background: #dcfce7; padding: 12px 16px; border-radius: 8px; text-align: center;">
      <div style="color: #166534; font-weight: 600;">Save File</div>
      <div style="color: #22c55e; font-size: 0.85rem;">Memento (snapshot)</div>
    </div>
    <div style="background: #fef3c7; padding: 12px 16px; border-radius: 8px; text-align: center;">
      <div style="color: #92400e; font-weight: 600;">Save Slots</div>
      <div style="color: #f59e0b; font-size: 0.85rem;">Caretaker (manager)</div>
    </div>
    <div style="background: #fce7f3; padding: 12px 16px; border-radius: 8px; text-align: center;">
      <div style="color: #9d174d; font-weight: 600;">Load Game</div>
      <div style="color: #ec4899; font-size: 0.85rem;">Restore Operation</div>
    </div>
  </div>
</div>

### The Expert Insight

**Novice thinks:** "Memento is just serialization - save the object to JSON."

**Expert knows:** "Memento preserves **encapsulation**. The caretaker stores state without knowing what's inside. This is crucial for security (you don't expose internal fields), for polymorphism (different originators can have different mementos), and for efficiency (you can store incremental diffs instead of full copies)."

---

## Real-World Company Usage

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <div style="font-weight: 700; color: #1e293b; margin-bottom: 12px;">Industry Applications</div>
  <ul style="color: #334155; margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Microsoft Word / Google Docs:</strong> Document version history and undo</li>
    <li><strong>Git:</strong> Commits are essentially mementos of repository state</li>
    <li><strong>Database Transactions:</strong> Savepoints and rollback use memento-like snapshots</li>
    <li><strong>Adobe Creative Suite:</strong> History panel stores mementos for each action</li>
    <li><strong>Browser DevTools:</strong> State snapshots in Redux DevTools for time-travel debugging</li>
    <li><strong>VMware/VirtualBox:</strong> VM snapshots capture entire machine state</li>
    <li><strong>Figma/Sketch:</strong> Design version history for reverting changes</li>
  </ul>
</div>

---

## Pattern Structure

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <div style="font-weight: 700; color: #1e293b; text-align: center; margin-bottom: 24px; font-size: 1.2rem;">Memento Pattern Architecture</div>
  <div style="display: flex; justify-content: center; align-items: center; gap: 30px; flex-wrap: wrap;">
    <!-- Originator -->
    <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; padding: 20px; text-align: center; min-width: 160px;">
      <div style="font-weight: 700; color: #1e40af; font-size: 1.1rem;">Originator</div>
      <div style="font-size: 0.75rem; color: #3b82f6; margin-top: 8px; font-family: monospace;">
        - state<br/>
        + save(): Memento<br/>
        + restore(m)
      </div>
    </div>
    <!-- Arrows -->
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <div style="color: #22c55e; font-size: 0.9rem;">creates &#8594;</div>
      <div style="color: #ec4899; font-size: 0.9rem;">&#8592; restores from</div>
    </div>
    <!-- Memento -->
    <div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; padding: 20px; text-align: center; min-width: 160px;">
      <div style="font-weight: 700; color: #166534; font-size: 1.1rem;">Memento</div>
      <div style="font-size: 0.75rem; color: #15803d; margin-top: 8px; font-family: monospace;">
        - state (private)<br/>
        + getState() *<br/>
        <span style="font-size: 0.65rem;">* only for originator</span>
      </div>
    </div>
    <!-- Arrow -->
    <div style="color: #64748b; font-size: 0.9rem;">&#8592; stores</div>
    <!-- Caretaker -->
    <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; text-align: center; min-width: 160px;">
      <div style="font-weight: 700; color: #92400e; font-size: 1.1rem;">Caretaker</div>
      <div style="font-size: 0.75rem; color: #b45309; margin-top: 8px; font-family: monospace;">
        - mementos[]<br/>
        + push(m)<br/>
        + pop(): Memento
      </div>
    </div>
  </div>
  <div style="margin-top: 24px; text-align: center; color: #64748b; font-size: 0.9rem;">
    Key: Caretaker never looks inside Memento - preserves encapsulation
  </div>
</div>

---

## When to Use Memento Pattern

<div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <div style="font-weight: 700; color: #166534; margin-bottom: 12px;">Perfect Use Cases</div>
  <ul style="color: #334155; margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Undo/Redo:</strong> Store state before each action to enable reversal</li>
    <li><strong>Checkpoints:</strong> Save progress at specific points for recovery</li>
    <li><strong>Transaction rollback:</strong> Restore state if transaction fails</li>
    <li><strong>Time-travel debugging:</strong> Step through historical states</li>
    <li><strong>Form wizards:</strong> Navigate back to previous steps with data intact</li>
    <li><strong>Game saves:</strong> Persist and restore game progress</li>
    <li><strong>Version control:</strong> Track document/code history</li>
  </ul>
</div>

---

## Anti-Patterns: When NOT to Use

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="font-weight: 700; color: #991b1b; margin-bottom: 12px;">Common Mistakes</div>
  <ul style="color: #334155; margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Memory bloat:</strong> Storing full state on every change - use incremental diffs</li>
    <li><strong>Large objects:</strong> Deep copying large object graphs is expensive</li>
    <li><strong>Breaking encapsulation:</strong> Exposing memento internals to caretaker</li>
    <li><strong>External dependencies:</strong> State that references external resources (files, connections) can't be simply restored</li>
    <li><strong>Ignoring validity:</strong> Old mementos may become invalid if schema changes</li>
  </ul>
</div>

---

## Python Implementation: Text Editor with History

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional
from datetime import datetime
from copy import deepcopy
import json


# ============================================================
# MEMENTO - Stores state snapshot
# ============================================================

@dataclass(frozen=True)  # Immutable snapshot
class EditorMemento:
    """
    Memento storing editor state.
    Frozen dataclass ensures immutability.
    State is private - only originator should access.
    """
    _content: str
    _cursor_position: int
    _selection_start: int
    _selection_end: int
    _timestamp: datetime = field(default_factory=datetime.now)

    def get_timestamp(self) -> datetime:
        """Public metadata that caretaker can access."""
        return self._timestamp

    def get_preview(self, max_length: int = 30) -> str:
        """Public preview for display purposes."""
        preview = self._content[:max_length]
        if len(self._content) > max_length:
            preview += "..."
        return preview

    # Private access for originator only (convention in Python)
    def _get_state(self) -> tuple:
        """Should only be called by originator."""
        return (
            self._content,
            self._cursor_position,
            self._selection_start,
            self._selection_end
        )


# ============================================================
# ORIGINATOR - Creates and restores from mementos
# ============================================================

class TextEditor:
    """
    Originator class - the object whose state we want to save/restore.
    Only the originator knows how to create and restore from mementos.
    """

    def __init__(self):
        self._content: str = ""
        self._cursor_position: int = 0
        self._selection_start: int = 0
        self._selection_end: int = 0

    # ==========================================
    # Business operations
    # ==========================================

    def type_text(self, text: str) -> None:
        """Insert text at cursor position."""
        before = self._content[:self._cursor_position]
        after = self._content[self._cursor_position:]
        self._content = before + text + after
        self._cursor_position += len(text)
        self._clear_selection()

    def delete(self, count: int = 1) -> None:
        """Delete characters before cursor (backspace)."""
        if self._cursor_position > 0:
            start = max(0, self._cursor_position - count)
            self._content = self._content[:start] + self._content[self._cursor_position:]
            self._cursor_position = start
        self._clear_selection()

    def select(self, start: int, end: int) -> None:
        """Select a range of text."""
        self._selection_start = max(0, min(start, len(self._content)))
        self._selection_end = max(0, min(end, len(self._content)))

    def move_cursor(self, position: int) -> None:
        """Move cursor to a specific position."""
        self._cursor_position = max(0, min(position, len(self._content)))
        self._clear_selection()

    def _clear_selection(self) -> None:
        self._selection_start = 0
        self._selection_end = 0

    # ==========================================
    # Memento operations
    # ==========================================

    def save(self) -> EditorMemento:
        """Create a memento of current state."""
        return EditorMemento(
            _content=self._content,
            _cursor_position=self._cursor_position,
            _selection_start=self._selection_start,
            _selection_end=self._selection_end
        )

    def restore(self, memento: EditorMemento) -> None:
        """Restore state from a memento."""
        state = memento._get_state()
        self._content = state[0]
        self._cursor_position = state[1]
        self._selection_start = state[2]
        self._selection_end = state[3]

    # ==========================================
    # Display
    # ==========================================

    @property
    def content(self) -> str:
        return self._content

    def __str__(self) -> str:
        return f"'{self._content}' | cursor: {self._cursor_position}"


# ============================================================
# CARETAKER - Manages memento history
# ============================================================

class EditorHistory:
    """
    Caretaker class - manages mementos without knowing their internals.
    Implements undo/redo with configurable history limit.
    """

    def __init__(self, max_history: int = 100):
        self._history: List[EditorMemento] = []
        self._redo_stack: List[EditorMemento] = []
        self._max_history = max_history
        self._current_index = -1

    def save(self, memento: EditorMemento) -> None:
        """Save a new state - clears redo history."""
        # Remove any redo states
        if self._current_index < len(self._history) - 1:
            self._history = self._history[:self._current_index + 1]

        self._history.append(memento)
        self._current_index = len(self._history) - 1

        # Limit history size
        if len(self._history) > self._max_history:
            self._history.pop(0)
            self._current_index -= 1

    def undo(self) -> Optional[EditorMemento]:
        """Get the previous state (undo)."""
        if self._current_index > 0:
            self._current_index -= 1
            return self._history[self._current_index]
        return None

    def redo(self) -> Optional[EditorMemento]:
        """Get the next state (redo)."""
        if self._current_index < len(self._history) - 1:
            self._current_index += 1
            return self._history[self._current_index]
        return None

    def can_undo(self) -> bool:
        return self._current_index > 0

    def can_redo(self) -> bool:
        return self._current_index < len(self._history) - 1

    def get_history_list(self) -> List[str]:
        """Get list of history previews for display."""
        result = []
        for i, memento in enumerate(self._history):
            marker = " <-- current" if i == self._current_index else ""
            timestamp = memento.get_timestamp().strftime("%H:%M:%S")
            preview = memento.get_preview(20)
            result.append(f"[{i}] {timestamp}: '{preview}'{marker}")
        return result


# ============================================================
# ADVANCED: Game State with Complex Memento
# ============================================================

@dataclass
class GameMemento:
    """
    Complex memento for game state.
    Uses deep copy to capture nested structures.
    """
    _player_health: int
    _player_position: Dict[str, int]
    _inventory: List[str]
    _level: int
    _score: int
    _quest_progress: Dict[str, bool]
    _timestamp: datetime = field(default_factory=datetime.now)

    @classmethod
    def create(cls, game: 'Game') -> 'GameMemento':
        """Factory method to create memento from game."""
        return cls(
            _player_health=game.health,
            _player_position=deepcopy(game.position),
            _inventory=list(game.inventory),
            _level=game.level,
            _score=game.score,
            _quest_progress=deepcopy(game.quest_progress),
        )

    def restore_to(self, game: 'Game') -> None:
        """Restore game state from this memento."""
        game.health = self._player_health
        game.position = deepcopy(self._player_position)
        game.inventory = list(self._inventory)
        game.level = self._level
        game.score = self._score
        game.quest_progress = deepcopy(self._quest_progress)

    def get_summary(self) -> str:
        """Public summary for save slot display."""
        return (f"Level {self._level} | Score: {self._score} | "
                f"Health: {self._player_health} | "
                f"Items: {len(self._inventory)}")


class Game:
    """Game with save/load functionality using Memento."""

    def __init__(self):
        self.health = 100
        self.position = {"x": 0, "y": 0, "z": 0}
        self.inventory: List[str] = []
        self.level = 1
        self.score = 0
        self.quest_progress: Dict[str, bool] = {}

    def move(self, dx: int, dy: int, dz: int = 0) -> None:
        self.position["x"] += dx
        self.position["y"] += dy
        self.position["z"] += dz
        self.score += 10
        print(f"Moved to {self.position}")

    def take_damage(self, amount: int) -> None:
        self.health = max(0, self.health - amount)
        print(f"Took {amount} damage. Health: {self.health}")

    def collect_item(self, item: str) -> None:
        self.inventory.append(item)
        self.score += 25
        print(f"Collected: {item}")

    def complete_quest(self, quest_id: str) -> None:
        self.quest_progress[quest_id] = True
        self.score += 100
        print(f"Completed quest: {quest_id}")

    def level_up(self) -> None:
        self.level += 1
        self.health = 100  # Full heal on level up
        self.score += 500
        print(f"Level up! Now level {self.level}")

    def save(self) -> GameMemento:
        """Create a save point."""
        print(f"Game saved at Level {self.level}")
        return GameMemento.create(self)

    def load(self, memento: GameMemento) -> None:
        """Load from a save point."""
        memento.restore_to(self)
        print(f"Game loaded: {memento.get_summary()}")

    def __str__(self) -> str:
        return (f"Level {self.level} | Health: {self.health} | "
                f"Score: {self.score} | Items: {self.inventory}")


class SaveSlotManager:
    """Caretaker for game saves with named slots."""

    def __init__(self, max_autosaves: int = 5):
        self.slots: Dict[str, GameMemento] = {}
        self.autosaves: List[GameMemento] = []
        self.max_autosaves = max_autosaves

    def save_to_slot(self, name: str, memento: GameMemento) -> None:
        """Save to a named slot."""
        self.slots[name] = memento
        print(f"Saved to slot: {name}")

    def load_from_slot(self, name: str) -> Optional[GameMemento]:
        """Load from a named slot."""
        return self.slots.get(name)

    def autosave(self, memento: GameMemento) -> None:
        """Add an autosave."""
        self.autosaves.append(memento)
        if len(self.autosaves) > self.max_autosaves:
            self.autosaves.pop(0)
        print("Autosaved")

    def get_latest_autosave(self) -> Optional[GameMemento]:
        """Get most recent autosave."""
        return self.autosaves[-1] if self.autosaves else None

    def list_slots(self) -> List[str]:
        """List all save slots."""
        return [f"{name}: {m.get_summary()}" for name, m in self.slots.items()]


# ============================================================
# INCREMENTAL MEMENTO - Memory Efficient
# ============================================================

@dataclass
class IncrementalMemento:
    """
    Memory-efficient memento storing only changes (delta).
    Useful for large objects with small changes.
    """
    _changes: Dict[str, Any]
    _timestamp: datetime = field(default_factory=datetime.now)
    _base_memento: Optional['IncrementalMemento'] = None

    def apply_to(self, base_state: Dict[str, Any]) -> Dict[str, Any]:
        """Apply changes to recreate full state."""
        # Start with base
        if self._base_memento:
            state = self._base_memento.apply_to(base_state.copy())
        else:
            state = base_state.copy()

        # Apply delta
        state.update(self._changes)
        return state


# ============================================================
# USAGE EXAMPLES
# ============================================================

if __name__ == "__main__":
    print("=" * 60)
    print("TEXT EDITOR EXAMPLE")
    print("=" * 60)

    editor = TextEditor()
    history = EditorHistory()

    # Save initial state
    history.save(editor.save())

    # Make changes
    editor.type_text("Hello")
    history.save(editor.save())
    print(f"After 'Hello': {editor}")

    editor.type_text(" World")
    history.save(editor.save())
    print(f"After ' World': {editor}")

    editor.type_text("!")
    history.save(editor.save())
    print(f"After '!': {editor}")

    # Undo operations
    print("\n--- Undo ---")
    if memento := history.undo():
        editor.restore(memento)
        print(f"After undo: {editor}")

    if memento := history.undo():
        editor.restore(memento)
        print(f"After undo: {editor}")

    # Redo
    print("\n--- Redo ---")
    if memento := history.redo():
        editor.restore(memento)
        print(f"After redo: {editor}")

    # Show history
    print("\n--- History ---")
    for entry in history.get_history_list():
        print(f"  {entry}")

    print("\n" + "=" * 60)
    print("GAME SAVE EXAMPLE")
    print("=" * 60)

    game = Game()
    save_manager = SaveSlotManager()

    # Play and autosave
    game.move(10, 5)
    game.collect_item("Sword")
    save_manager.autosave(game.save())

    game.take_damage(30)
    game.collect_item("Shield")
    save_manager.autosave(game.save())

    # Manual save
    save_manager.save_to_slot("before_boss", game.save())

    # Boss fight goes badly
    game.take_damage(50)
    game.take_damage(40)
    print(f"\nAfter boss fight: {game}")

    # Load from save
    print("\n--- Loading Save ---")
    if saved := save_manager.load_from_slot("before_boss"):
        game.load(saved)
        print(f"After loading: {game}")

    # List saves
    print("\n--- Save Slots ---")
    for slot in save_manager.list_slots():
        print(f"  {slot}")
```

---

## Memento vs Command: Interview Comparison

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
  <div style="font-weight: 700; color: #1e293b; margin-bottom: 16px;">Common Interview Question: Choosing the Right Pattern</div>
  <table style="width: 100%; border-collapse: collapse; color: #334155;">
    <thead>
      <tr style="background: #e2e8f0;">
        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Aspect</th>
        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Memento</th>
        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Command</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>What it stores</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Full state snapshot</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Action + params + undo logic</td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Undo approach</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Restore previous state</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Execute reverse operation</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Memory usage</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Higher (full state)</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Lower (only deltas)</td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Complexity</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Simple (just copy state)</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Complex (need inverse operations)</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Best for</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Small state, complex operations</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Large state, simple operations</td>
      </tr>
    </tbody>
  </table>
</div>

---

## Interview Questions

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q1: How do you handle memory concerns with Memento pattern?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> Several strategies:
1. **Limit history size:** Keep only last N mementos
2. **Incremental mementos:** Store only changes (deltas) from previous state
3. **Compression:** Compress memento data before storing
4. **Lazy loading:** Store mementos on disk, load on demand
5. **Checkpointing:** Full snapshot periodically, deltas in between
6. **State filtering:** Only save fields that can change

```python
class IncrementalHistory:
    def __init__(self, checkpoint_interval=10):
        self.checkpoints = []
        self.deltas = []
        self.checkpoint_interval = checkpoint_interval

    def save(self, state):
        if len(self.deltas) >= self.checkpoint_interval:
            self.checkpoints.append(full_snapshot(state))
            self.deltas.clear()
        else:
            self.deltas.append(compute_delta(self.last_state, state))
```
</div>
</details>

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q2: How do you maintain encapsulation when implementing Memento?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> The key is that only the originator should access memento internals:

1. **Private state in memento:** Use naming conventions (_private) or access modifiers
2. **Nested class:** In languages that support it, make Memento a private inner class of Originator
3. **Factory method:** Only Originator can create mementos
4. **Interface segregation:** Caretaker sees narrow interface (timestamp, metadata only)

```python
class Editor:
    class _Memento:  # Nested private class
        def __init__(self, state):
            self._state = state  # Private

        # Public interface for caretaker
        def get_timestamp(self): ...

        # Private interface for originator
        def _get_state(self): return self._state

    def save(self) -> _Memento:
        return self._Memento(self._state)

    def restore(self, m: _Memento):
        self._state = m._get_state()  # Only Editor accesses this
```
</div>
</details>

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q3: How would you implement undo in a distributed system?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> Distributed undo requires additional considerations:
1. **Event Sourcing:** Store events instead of state snapshots. Rebuild state by replaying events up to desired point.
2. **Compensating Transactions:** For each operation, define a compensating operation that reverses it.
3. **Saga Pattern:** Chain of operations with defined rollback for each step.
4. **Versioning:** Optimistic locking with version numbers to detect conflicts.

Key challenge: Concurrent modifications. Solutions include:
- Operational Transformation (Google Docs approach)
- Conflict-free Replicated Data Types (CRDTs)
- Centralized undo server with global ordering
</div>
</details>

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q4: When would you choose Memento over serialization?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong>
**Use Memento when:**
- Need encapsulation (caretaker shouldn't access state)
- In-memory undo/redo is primary use case
- State is complex with polymorphic objects
- Need fine-grained control over what gets saved

**Use Serialization when:**
- Need persistence across sessions
- Need cross-language/cross-system compatibility
- Full object graph needs to be saved
- State structure is simple/flat

**Hybrid approach:** Use Memento pattern internally, but serialize mementos for persistence.
</div>
</details>

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q5: Design a memento system for a collaborative document editor.</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Key considerations:</strong>
1. **Multiple users:** Each user has their own undo stack
2. **Conflict resolution:** What if User A undoes something User B modified?
3. **Selective undo:** Undo only your own changes
4. **History branching:** When undo + new edit creates a branch
5. **Efficiency:** Large documents need incremental mementos

Design:
- Use Operational Transformation or CRDT for real-time sync
- Store operations (like Git commits) not full state
- User-scoped undo that generates compensating operations
- Server validates and orders all operations
</div>
</details>

---

## Best Practices

<div style="background: #dbeafe; border-radius: 12px; padding: 20px; margin: 20px 0;">
  <div style="font-weight: 700; color: #1e40af; margin-bottom: 12px;">Production Guidelines</div>
  <ol style="color: #334155; margin: 0; padding-left: 20px; line-height: 2;">
    <li><strong>Make mementos immutable:</strong> Prevent accidental modification of historical state</li>
    <li><strong>Use deep copy:</strong> Ensure nested objects are properly copied, not referenced</li>
    <li><strong>Limit history:</strong> Prevent unbounded memory growth with max history size</li>
    <li><strong>Add metadata:</strong> Timestamps, descriptions help users understand history</li>
    <li><strong>Consider serialization:</strong> For persistence, mementos may need to be serializable</li>
    <li><strong>Handle invalid mementos:</strong> Schema changes may invalidate old mementos</li>
    <li><strong>Test restore thoroughly:</strong> Ensure all state is properly captured and restored</li>
  </ol>
</div>

---

## Related Patterns

- [Command](/topic/design-patterns/command) - Alternative approach to undo using inverse operations
- [Prototype](/topic/design-patterns/prototype) - Clone objects for memento creation
- [Iterator](/topic/design-patterns/iterator) - Navigate through memento history
- [State](/topic/design-patterns/state) - Memento captures state machine states
