# Memento Pattern

## Overview

The Memento pattern captures and externalizes an object's internal state so that the object can be restored to this state later, without violating encapsulation. This seemingly simple definition conceals significant architectural depth: the pattern establishes a **trust boundary** between the object that owns state (Originator), the opaque container that holds state (Memento), and the manager that orchestrates state transitions (Caretaker).

**Difficulty:** Intermediate to Advanced
**Category:** Behavioral Pattern
**Also Known As:** Snapshot, Token, Checkpoint

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 20px; margin: 24px 0; border-left: 4px solid #f59e0b;">
  <div style="font-weight: 700; color: #92400e; margin-bottom: 8px;">Critical Insight</div>
  <div style="color: #78350f;">The Memento pattern is NOT just "save and restore." It is a carefully designed encapsulation-preserving protocol where the Caretaker can hold state it cannot inspect, the Memento exposes different interfaces to different clients (narrow to Caretaker, wide to Originator), and the Originator maintains sole authority over its internal representation.</div>
</div>

---

## Conceptual Foundation: The Video Game Save Point

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #cbd5e1;">
  <div style="font-size: 2.5rem; text-align: center; margin-bottom: 16px;">&#127918;</div>
  <div style="font-size: 1.3rem; font-weight: 700; color: #1e293b; text-align: center; margin-bottom: 12px;">The Video Game Save Point Analogy</div>
  <div style="color: #334155; font-size: 1rem; line-height: 1.7;">
    When you save a video game, you create a snapshot capturing everything: character position, health, inventory, quest progress, and world state. The save file does not understand the game's internal logic; it merely stores opaque data. The game engine (Originator) creates these save files and can later restore from them. Your save slot manager (Caretaker) holds these files without interpreting their contents. This separation is fundamental: the save slot manager works identically whether you are playing an RPG or a racing game because it never needs to understand what is inside.
  </div>
  <div style="margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
    <div style="background: #dbeafe; padding: 16px; border-radius: 8px; text-align: center;">
      <div style="color: #1e40af; font-weight: 600;">Game State</div>
      <div style="color: #3b82f6; font-size: 0.85rem;">Originator</div>
      <div style="color: #64748b; font-size: 0.75rem; margin-top: 4px;">Owns and understands state</div>
    </div>
    <div style="background: #dcfce7; padding: 16px; border-radius: 8px; text-align: center;">
      <div style="color: #166534; font-weight: 600;">Save File</div>
      <div style="color: #22c55e; font-size: 0.85rem;">Memento</div>
      <div style="color: #64748b; font-size: 0.75rem; margin-top: 4px;">Opaque state container</div>
    </div>
    <div style="background: #fef3c7; padding: 16px; border-radius: 8px; text-align: center;">
      <div style="color: #92400e; font-weight: 600;">Save Slots</div>
      <div style="color: #f59e0b; font-size: 0.85rem;">Caretaker</div>
      <div style="color: #64748b; font-size: 0.75rem; margin-top: 4px;">Stores without inspecting</div>
    </div>
    <div style="background: #fce7f3; padding: 16px; border-radius: 8px; text-align: center;">
      <div style="color: #9d174d; font-weight: 600;">Load Game</div>
      <div style="color: #ec4899; font-size: 0.85rem;">Restore Operation</div>
      <div style="color: #64748b; font-size: 0.75rem; margin-top: 4px;">State reconstitution</div>
    </div>
  </div>
</div>

### Expert vs Novice Understanding

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 24px 0;">
  <div style="background: #fef2f2; border-radius: 12px; padding: 20px; border: 2px solid #fecaca;">
    <div style="font-weight: 700; color: #991b1b; margin-bottom: 12px;">Novice Misconception</div>
    <div style="color: #7f1d1d;">"Memento is just serialization - save the object to JSON and load it back."</div>
    <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #fecaca; color: #b91c1c; font-size: 0.9rem;">
      This misses the encapsulation guarantee, polymorphic memento support, and the critical separation of concerns between components.
    </div>
  </div>
  <div style="background: #dcfce7; border-radius: 12px; padding: 20px; border: 2px solid #bbf7d0;">
    <div style="font-weight: 700; color: #166534; margin-bottom: 12px;">Expert Understanding</div>
    <div style="color: #14532d;">"Memento preserves encapsulation through interface segregation. The Caretaker stores state without knowing what is inside. This enables polymorphism, security, and incremental storage strategies."</div>
    <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #bbf7d0; color: #15803d; font-size: 0.9rem;">
      Different Originators can have different Memento structures. The Caretaker code remains unchanged.
    </div>
  </div>
</div>

---

## Internal Mechanism Deep Dive

### The Three Participants and Their Contracts

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <div style="font-weight: 700; color: #1e293b; text-align: center; margin-bottom: 24px; font-size: 1.2rem;">Memento Pattern Architecture</div>
  <div style="display: flex; justify-content: center; align-items: stretch; gap: 20px; flex-wrap: wrap;">
    <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; padding: 20px; text-align: center; min-width: 200px; flex: 1;">
      <div style="font-weight: 700; color: #1e40af; font-size: 1.1rem;">Originator</div>
      <div style="font-size: 0.8rem; color: #3b82f6; margin-top: 12px; font-family: monospace; text-align: left;">
        - internalState<br/>
        - privateData<br/>
        + createMemento(): Memento<br/>
        + restore(m: Memento): void<br/>
        + businessOperation(): void
      </div>
      <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #93c5fd; font-size: 0.75rem; color: #1e40af;">
        Sole authority over state semantics
      </div>
    </div>
    <div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; padding: 20px; text-align: center; min-width: 200px; flex: 1;">
      <div style="font-weight: 700; color: #166534; font-size: 1.1rem;">Memento</div>
      <div style="font-size: 0.8rem; color: #15803d; margin-top: 12px; font-family: monospace; text-align: left;">
        - state (private/frozen)<br/>
        + getMetadata(): info<br/>
        # getState(): state *<br/>
        <span style="font-size: 0.7rem;">* package-private or friend</span>
      </div>
      <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #86efac; font-size: 0.75rem; color: #166534;">
        Dual interface: narrow (public), wide (to Originator)
      </div>
    </div>
    <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; text-align: center; min-width: 200px; flex: 1;">
      <div style="font-weight: 700; color: #92400e; font-size: 1.1rem;">Caretaker</div>
      <div style="font-size: 0.8rem; color: #b45309; margin-top: 12px; font-family: monospace; text-align: left;">
        - mementoHistory: List<br/>
        - currentIndex: int<br/>
        + save(m: Memento): void<br/>
        + undo(): Memento<br/>
        + redo(): Memento
      </div>
      <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #fcd34d; font-size: 0.75rem; color: #92400e;">
        Never inspects memento contents
      </div>
    </div>
  </div>
  <div style="margin-top: 24px; background: #e0e7ff; border-radius: 8px; padding: 16px;">
    <div style="font-weight: 600; color: #3730a3; margin-bottom: 8px;">Information Flow</div>
    <div style="color: #4338ca; font-size: 0.9rem;">
      Originator --[creates]--> Memento --[stores in]--> Caretaker<br/>
      Caretaker --[returns]--> Memento --[restored by]--> Originator<br/>
      <strong>Key invariant:</strong> Caretaker never calls Memento.getState()
    </div>
  </div>
</div>

### Encapsulation Preservation Mechanisms

The pattern preserves encapsulation through several language-specific techniques:

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
  <div style="font-weight: 700; color: #1e293b; margin-bottom: 16px;">Language-Specific Encapsulation Strategies</div>
  <div style="display: grid; gap: 16px;">
    <div style="background: #fff; border-radius: 8px; padding: 16px; border-left: 4px solid #3b82f6;">
      <div style="font-weight: 600; color: #1e40af;">Java / C#: Nested Classes</div>
      <div style="color: #334155; margin-top: 8px; font-size: 0.9rem;">
        Memento as private inner class of Originator. The Caretaker receives the Memento through an interface that exposes only metadata methods. The actual state accessor is package-private or internal.
      </div>
    </div>
    <div style="background: #fff; border-radius: 8px; padding: 16px; border-left: 4px solid #22c55e;">
      <div style="font-weight: 600; color: #166534;">C++: Friend Classes</div>
      <div style="color: #334155; margin-top: 8px; font-size: 0.9rem;">
        Originator declared as friend of Memento. Only the Originator can access private state retrieval methods. External code sees only public metadata interface.
      </div>
    </div>
    <div style="background: #fff; border-radius: 8px; padding: 16px; border-left: 4px solid #f59e0b;">
      <div style="font-weight: 600; color: #92400e;">Python: Convention + Module Privacy</div>
      <div style="color: #334155; margin-top: 8px; font-size: 0.9rem;">
        Underscore prefix convention (_getState) signals private access. Module-level organization can enforce that only Originator imports the private accessor. Frozen dataclasses ensure immutability.
      </div>
    </div>
    <div style="background: #fff; border-radius: 8px; padding: 16px; border-left: 4px solid #8b5cf6;">
      <div style="font-weight: 600; color: #6d28d9;">TypeScript: Symbol Keys</div>
      <div style="color: #334155; margin-top: 8px; font-size: 0.9rem;">
        Use Symbol() as property key for internal state. Only code with reference to the symbol can access the state. The symbol is shared only between Originator and Memento through module closure.
      </div>
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border: 2px solid #fecaca;">
  <div style="font-weight: 700; color: #991b1b; margin-bottom: 12px;">Critical Assumption</div>
  <div style="color: #7f1d1d;">
    The Memento pattern assumes that <strong>state can be fully captured</strong> as a value. This breaks down when:
    <ul style="margin-top: 12px; padding-left: 20px;">
      <li>State includes external resource handles (file descriptors, network connections)</li>
      <li>State references objects with identity semantics (restoring creates a different object)</li>
      <li>State involves time-sensitive data (timestamps, TTLs that expire)</li>
      <li>State has invariants with external systems (database foreign keys, distributed locks)</li>
    </ul>
  </div>
</div>

---

## State Snapshots: Copy Semantics and Strategies

### Deep Copy vs Shallow Copy

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
  <div style="font-weight: 700; color: #1e293b; margin-bottom: 16px;">Copy Strategy Trade-offs</div>
  <table style="width: 100%; border-collapse: collapse; color: #334155;">
    <thead>
      <tr style="background: #e2e8f0;">
        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Strategy</th>
        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Mechanism</th>
        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">When Safe</th>
        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Danger Zone</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Shallow Copy</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Copy references only</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Immutable nested objects</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Mutable objects shared between memento and originator</td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Deep Copy</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Recursively copy entire graph</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Mutable nested objects</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Circular references, resource handles</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Copy-on-Write</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Share until mutation</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Read-heavy workloads</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Complex mutation tracking overhead</td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Structural Sharing</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Immutable data structures</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Functional paradigm</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Performance overhead on small objects</td>
      </tr>
    </tbody>
  </table>
</div>

### Incremental Snapshots (Delta Encoding)

For large state objects, storing complete snapshots becomes prohibitively expensive. Incremental snapshots store only changes:

```python
from dataclasses import dataclass, field
from typing import Dict, Any, Optional, List
from datetime import datetime
from copy import deepcopy
import hashlib
import json


@dataclass(frozen=True)
class DeltaMemento:
    """
    Memory-efficient memento storing only state changes.

    Design Decision: We store forward deltas (what changed TO this state)
    rather than backward deltas (what to undo). Forward deltas allow
    reconstruction from any checkpoint by replaying. Backward deltas
    would require the current state to compute previous states.
    """
    _changes: Dict[str, Any]
    _deleted_keys: frozenset
    _timestamp: datetime = field(default_factory=datetime.now)
    _checksum: str = field(default="")

    def __post_init__(self):
        # Compute checksum for integrity verification
        if not self._checksum:
            content = json.dumps(
                {"changes": self._changes, "deleted": list(self._deleted_keys)},
                sort_keys=True
            )
            object.__setattr__(
                self, '_checksum',
                hashlib.sha256(content.encode()).hexdigest()[:16]
            )

    def apply_to(self, base_state: Dict[str, Any]) -> Dict[str, Any]:
        """Apply delta to reconstruct state."""
        result = base_state.copy()
        for key in self._deleted_keys:
            result.pop(key, None)
        result.update(self._changes)
        return result

    @property
    def size_bytes(self) -> int:
        """Approximate memory footprint."""
        return len(json.dumps(self._changes))


class DeltaManager:
    """
    Manages incremental snapshots with periodic full checkpoints.

    Trade-off: Checkpoint frequency balances memory (more checkpoints =
    more storage) against reconstruction time (fewer checkpoints =
    longer delta chains to replay).
    """

    def __init__(self, checkpoint_interval: int = 20):
        self._checkpoints: List[Dict[str, Any]] = []
        self._deltas: List[DeltaMemento] = []
        self._checkpoint_interval = checkpoint_interval
        self._last_state: Optional[Dict[str, Any]] = None

    def save(self, current_state: Dict[str, Any]) -> None:
        """Save state, choosing checkpoint vs delta automatically."""
        if self._last_state is None or len(self._deltas) >= self._checkpoint_interval:
            # Create full checkpoint
            self._checkpoints.append(deepcopy(current_state))
            self._deltas.clear()
        else:
            # Compute and store delta
            changes = {}
            deleted = set()

            for key, value in current_state.items():
                if key not in self._last_state or self._last_state[key] != value:
                    changes[key] = deepcopy(value)

            for key in self._last_state:
                if key not in current_state:
                    deleted.add(key)

            delta = DeltaMemento(
                _changes=changes,
                _deleted_keys=frozenset(deleted)
            )
            self._deltas.append(delta)

        self._last_state = deepcopy(current_state)

    def restore(self, steps_back: int) -> Optional[Dict[str, Any]]:
        """Restore state from N steps ago."""
        total_steps = len(self._deltas)

        if steps_back > total_steps:
            # Need to go back to checkpoint
            checkpoint_idx = len(self._checkpoints) - 1 - (
                (steps_back - total_steps) // self._checkpoint_interval
            )
            if checkpoint_idx < 0:
                return None
            return deepcopy(self._checkpoints[checkpoint_idx])

        # Replay from last checkpoint through deltas
        state = deepcopy(self._checkpoints[-1]) if self._checkpoints else {}
        replay_count = total_steps - steps_back

        for delta in self._deltas[:replay_count]:
            state = delta.apply_to(state)

        return state
```

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border: 2px solid #3b82f6;">
  <div style="font-weight: 700; color: #1e40af; margin-bottom: 12px;">Design Trade-off: Checkpoint Frequency</div>
  <div style="color: #1e3a8a;">
    <strong>More frequent checkpoints:</strong> Faster restoration (shorter delta chains), higher memory usage<br/>
    <strong>Less frequent checkpoints:</strong> Lower memory usage, slower restoration (longer replay)<br/><br/>
    <strong>Optimal strategy:</strong> Adaptive checkpointing based on delta size. When cumulative delta size exceeds threshold (e.g., 50% of full state size), create a new checkpoint.
  </div>
</div>

---

## Undo/Redo Implementation

### Linear Undo Stack Model

<div style="background: #f8fafc; border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <div style="font-weight: 700; color: #1e293b; text-align: center; margin-bottom: 24px; font-size: 1.2rem;">Linear Undo/Redo State Machine</div>
  <div style="display: flex; justify-content: center; align-items: center; gap: 16px; flex-wrap: wrap; margin-bottom: 20px;">
    <div style="background: #e0e7ff; border: 2px solid #6366f1; border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #4338ca;">S0</div>
    <div style="color: #6366f1; font-size: 1.2rem;">--edit--></div>
    <div style="background: #e0e7ff; border: 2px solid #6366f1; border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #4338ca;">S1</div>
    <div style="color: #6366f1; font-size: 1.2rem;">--edit--></div>
    <div style="background: #dbeafe; border: 3px solid #3b82f6; border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #1e40af;">S2*</div>
    <div style="color: #94a3b8; font-size: 1.2rem;">- - - -></div>
    <div style="background: #f1f5f9; border: 2px dashed #94a3b8; border-radius: 50%; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #64748b;">S3?</div>
  </div>
  <div style="text-align: center; color: #64748b; font-size: 0.9rem; margin-bottom: 16px;">
    * = current state | dashed = potential redo state
  </div>
  <div style="background: #fff; border-radius: 8px; padding: 16px; border: 1px solid #e2e8f0;">
    <div style="font-weight: 600; color: #1e293b; margin-bottom: 8px;">State Transition Rules</div>
    <ul style="color: #334155; margin: 0; padding-left: 20px; line-height: 1.8;">
      <li><strong>Edit:</strong> Push current state to undo stack, clear redo stack, apply edit</li>
      <li><strong>Undo:</strong> Push current state to redo stack, pop and restore from undo stack</li>
      <li><strong>Redo:</strong> Push current state to undo stack, pop and restore from redo stack</li>
    </ul>
  </div>
</div>

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Generic, TypeVar, Optional, List, Callable
from datetime import datetime
from copy import deepcopy

T = TypeVar('T')


@dataclass(frozen=True)
class Memento(Generic[T]):
    """
    Generic immutable memento.

    Frozen dataclass guarantees:
    1. Hash stability (can be used in sets/dicts)
    2. No accidental mutation of historical state
    3. Thread-safe reads without synchronization
    """
    _state: T
    _timestamp: datetime = field(default_factory=datetime.now)
    _description: str = ""

    def get_description(self) -> str:
        return self._description or f"State at {self._timestamp.isoformat()}"

    def _get_state(self) -> T:
        """Package-private: only Originator should call this."""
        return self._state


class UndoRedoManager(Generic[T]):
    """
    Caretaker implementing standard undo/redo with linear history.

    Key behaviors:
    - New edits after undo discard redo history (linear, not branching)
    - Memory bounded by max_history
    - Thread-unsafe: caller must synchronize for concurrent access
    """

    def __init__(self, max_history: int = 100):
        self._undo_stack: List[Memento[T]] = []
        self._redo_stack: List[Memento[T]] = []
        self._max_history = max_history

    def save(self, memento: Memento[T]) -> None:
        """
        Save state after an edit operation.

        IMPORTANT: This clears redo stack. After save(), redo() returns None
        until the next undo(). This matches user expectations in editors.
        """
        self._undo_stack.append(memento)
        self._redo_stack.clear()  # New edit invalidates redo history

        # Enforce memory limit by dropping oldest
        if len(self._undo_stack) > self._max_history:
            self._undo_stack.pop(0)

    def undo(self) -> Optional[Memento[T]]:
        """
        Get previous state for undo.

        Returns None if at beginning of history.
        Caller must: 1) save current state to redo, 2) restore returned memento

        NOTE: We return the memento, not automatically restore, because:
        - Originator may need to do cleanup before restore
        - Allows atomic undo across multiple originators
        - Caller can inspect before committing to restore
        """
        if len(self._undo_stack) <= 1:
            return None

        # Move current to redo stack
        current = self._undo_stack.pop()
        self._redo_stack.append(current)

        # Return previous state (don't pop - it becomes current)
        return self._undo_stack[-1] if self._undo_stack else None

    def redo(self) -> Optional[Memento[T]]:
        """Get next state for redo."""
        if not self._redo_stack:
            return None

        memento = self._redo_stack.pop()
        self._undo_stack.append(memento)
        return memento

    def can_undo(self) -> bool:
        return len(self._undo_stack) > 1

    def can_redo(self) -> bool:
        return len(self._redo_stack) > 0

    @property
    def history_depth(self) -> int:
        return len(self._undo_stack)

    def get_undo_descriptions(self) -> List[str]:
        """Get descriptions for UI display (most recent first)."""
        return [m.get_description() for m in reversed(self._undo_stack)]


class TextEditor:
    """
    Originator: Document editor with undo/redo support.
    """

    def __init__(self):
        self._content: str = ""
        self._cursor: int = 0
        self._selection: tuple = (0, 0)
        self._history = UndoRedoManager[tuple]()

        # Save initial state
        self._history.save(self._create_memento("Initial"))

    def _create_memento(self, description: str = "") -> Memento[tuple]:
        """Create memento of current state."""
        state = (self._content, self._cursor, self._selection)
        return Memento(_state=deepcopy(state), _description=description)

    def _restore_from(self, memento: Memento[tuple]) -> None:
        """Restore state from memento."""
        state = memento._get_state()
        self._content, self._cursor, self._selection = state

    def type_text(self, text: str) -> None:
        """Insert text at cursor, creating undo point."""
        before = self._content[:self._cursor]
        after = self._content[self._cursor:]
        self._content = before + text + after
        self._cursor += len(text)

        # Create meaningful description
        preview = text[:20] + "..." if len(text) > 20 else text
        self._history.save(self._create_memento(f"Type: '{preview}'"))

    def delete(self, count: int = 1) -> None:
        """Delete characters before cursor."""
        if self._cursor > 0:
            start = max(0, self._cursor - count)
            deleted = self._content[start:self._cursor]
            self._content = self._content[:start] + self._content[self._cursor:]
            self._cursor = start
            self._history.save(self._create_memento(f"Delete: '{deleted}'"))

    def undo(self) -> bool:
        """Undo last edit. Returns True if undo was performed."""
        memento = self._history.undo()
        if memento:
            self._restore_from(memento)
            return True
        return False

    def redo(self) -> bool:
        """Redo previously undone edit."""
        memento = self._history.redo()
        if memento:
            self._restore_from(memento)
            return True
        return False

    @property
    def content(self) -> str:
        return self._content

    def __repr__(self) -> str:
        return f"TextEditor('{self._content[:50]}...')" if len(self._content) > 50 else f"TextEditor('{self._content}')"
```

### Branching Undo (Tree History)

Linear undo discards redo states on new edits. Some applications (e.g., Emacs, Vim) preserve all states in a tree structure:

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #22c55e;">
  <div style="font-weight: 700; color: #166534; text-align: center; margin-bottom: 24px; font-size: 1.2rem;">Branching History Tree</div>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
    <div style="background: #bbf7d0; border: 2px solid #22c55e; border-radius: 8px; padding: 8px 16px; font-weight: 600; color: #166534;">S0 (root)</div>
    <div style="color: #22c55e;">|</div>
    <div style="background: #bbf7d0; border: 2px solid #22c55e; border-radius: 8px; padding: 8px 16px; font-weight: 600; color: #166534;">S1</div>
    <div style="display: flex; gap: 40px; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; align-items: center;">
        <div style="color: #22c55e;">/</div>
        <div style="background: #bbf7d0; border: 2px solid #22c55e; border-radius: 8px; padding: 8px 16px; font-weight: 600; color: #166534;">S2a</div>
        <div style="color: #22c55e;">|</div>
        <div style="background: #86efac; border: 3px solid #16a34a; border-radius: 8px; padding: 8px 16px; font-weight: 700; color: #166534;">S3a *</div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center;">
        <div style="color: #22c55e;">\</div>
        <div style="background: #d1fae5; border: 2px dashed #22c55e; border-radius: 8px; padding: 8px 16px; font-weight: 600; color: #166534;">S2b</div>
      </div>
    </div>
  </div>
  <div style="margin-top: 20px; text-align: center; color: #15803d; font-size: 0.9rem;">
    * = current position | Branching preserves S2b even after navigating to S3a
  </div>
</div>

<div style="background: #fef3c7; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #f59e0b;">
  <div style="font-weight: 700; color: #92400e; margin-bottom: 12px;">Trade-off Analysis</div>
  <div style="color: #78350f;">
    <strong>Linear undo:</strong> Simple mental model, lower memory, matches user expectations in most apps<br/>
    <strong>Branching undo:</strong> Never lose work, complex navigation UI needed, higher memory, better for exploratory tasks (art, code experimentation)
  </div>
</div>

---

## The Caretaker Role: Beyond Simple Storage

### Responsibility Boundaries

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
  <div style="font-weight: 700; color: #1e293b; margin-bottom: 16px;">Caretaker Responsibilities</div>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
    <div style="background: #dcfce7; border-radius: 8px; padding: 16px;">
      <div style="font-weight: 600; color: #166534; margin-bottom: 8px;">Should Do</div>
      <ul style="color: #15803d; margin: 0; padding-left: 16px; font-size: 0.9rem;">
        <li>Store and retrieve mementos</li>
        <li>Manage history size limits</li>
        <li>Provide navigation (undo/redo)</li>
        <li>Read metadata (timestamps, descriptions)</li>
        <li>Serialize mementos for persistence</li>
        <li>Handle memory pressure (eviction)</li>
      </ul>
    </div>
    <div style="background: #fef2f2; border-radius: 8px; padding: 16px;">
      <div style="font-weight: 600; color: #991b1b; margin-bottom: 8px;">Must Not Do</div>
      <ul style="color: #b91c1c; margin: 0; padding-left: 16px; font-size: 0.9rem;">
        <li>Inspect memento state contents</li>
        <li>Modify memento state</li>
        <li>Make decisions based on state values</li>
        <li>Validate state contents</li>
        <li>Merge or transform mementos</li>
        <li>Know Originator's internal structure</li>
      </ul>
    </div>
  </div>
</div>

### Advanced Caretaker Patterns

```python
from abc import ABC, abstractmethod
from typing import Generic, TypeVar, Dict, List, Optional, Callable
from datetime import datetime, timedelta
from dataclasses import dataclass
import threading
import weakref

T = TypeVar('T')


class MementoEvictionPolicy(ABC):
    """Strategy for deciding which mementos to evict under memory pressure."""

    @abstractmethod
    def select_for_eviction(self, mementos: List['MementoEntry']) -> List[int]:
        """Return indices of mementos to evict."""
        pass


class LRUEvictionPolicy(MementoEvictionPolicy):
    """Evict least recently accessed mementos."""

    def __init__(self, keep_count: int):
        self._keep_count = keep_count

    def select_for_eviction(self, mementos: List['MementoEntry']) -> List[int]:
        if len(mementos) <= self._keep_count:
            return []

        # Sort by last access time, evict oldest
        sorted_indices = sorted(
            range(len(mementos)),
            key=lambda i: mementos[i].last_accessed
        )
        return sorted_indices[:len(mementos) - self._keep_count]


class TimeBasedEvictionPolicy(MementoEvictionPolicy):
    """Evict mementos older than threshold."""

    def __init__(self, max_age: timedelta):
        self._max_age = max_age

    def select_for_eviction(self, mementos: List['MementoEntry']) -> List[int]:
        cutoff = datetime.now() - self._max_age
        return [i for i, m in enumerate(mementos) if m.created < cutoff]


@dataclass
class MementoEntry(Generic[T]):
    """Wrapper adding metadata for caretaker management."""
    memento: T
    created: datetime
    last_accessed: datetime
    size_bytes: int
    description: str

    def touch(self) -> None:
        """Update last access time."""
        self.last_accessed = datetime.now()


class AdvancedCaretaker(Generic[T]):
    """
    Production-grade caretaker with eviction, persistence hooks, and threading.

    Design Decisions:
    - Weak reference to originator prevents memory leaks in long-lived apps
    - Pluggable eviction policy allows customization without subclassing
    - Persistence callback enables async saving without blocking
    - Lock granularity: single lock for simplicity (optimize if profiling shows contention)
    """

    def __init__(
        self,
        eviction_policy: Optional[MementoEvictionPolicy] = None,
        persistence_callback: Optional[Callable[[T, str], None]] = None,
        max_memory_bytes: int = 100 * 1024 * 1024  # 100MB default
    ):
        self._entries: List[MementoEntry[T]] = []
        self._current_index: int = -1
        self._eviction_policy = eviction_policy or LRUEvictionPolicy(keep_count=50)
        self._persistence_callback = persistence_callback
        self._max_memory = max_memory_bytes
        self._current_memory = 0
        self._lock = threading.RLock()
        self._named_snapshots: Dict[str, MementoEntry[T]] = {}

    def save(
        self,
        memento: T,
        description: str = "",
        size_bytes: int = 0
    ) -> None:
        """Save memento with automatic eviction if needed."""
        with self._lock:
            # Truncate redo history (linear model)
            if self._current_index < len(self._entries) - 1:
                evicted = self._entries[self._current_index + 1:]
                self._entries = self._entries[:self._current_index + 1]
                self._current_memory -= sum(e.size_bytes for e in evicted)

            # Create entry
            entry = MementoEntry(
                memento=memento,
                created=datetime.now(),
                last_accessed=datetime.now(),
                size_bytes=size_bytes,
                description=description
            )

            # Check memory and evict if needed
            self._current_memory += size_bytes
            if self._current_memory > self._max_memory:
                self._evict()

            self._entries.append(entry)
            self._current_index = len(self._entries) - 1

            # Async persistence
            if self._persistence_callback:
                self._persistence_callback(memento, description)

    def _evict(self) -> None:
        """Run eviction policy to free memory."""
        to_evict = self._eviction_policy.select_for_eviction(self._entries)

        # Sort descending to remove from end first (stable indices)
        for idx in sorted(to_evict, reverse=True):
            if idx < self._current_index:
                self._current_index -= 1
            self._current_memory -= self._entries[idx].size_bytes
            del self._entries[idx]

    def undo(self) -> Optional[T]:
        """Navigate backward in history."""
        with self._lock:
            if self._current_index > 0:
                self._current_index -= 1
                entry = self._entries[self._current_index]
                entry.touch()
                return entry.memento
            return None

    def redo(self) -> Optional[T]:
        """Navigate forward in history."""
        with self._lock:
            if self._current_index < len(self._entries) - 1:
                self._current_index += 1
                entry = self._entries[self._current_index]
                entry.touch()
                return entry.memento
            return None

    def save_named(self, name: str, memento: T, description: str = "") -> None:
        """Save a named snapshot (bookmark) that survives eviction."""
        with self._lock:
            self._named_snapshots[name] = MementoEntry(
                memento=memento,
                created=datetime.now(),
                last_accessed=datetime.now(),
                size_bytes=0,  # Named snapshots not counted toward limit
                description=description or name
            )

    def load_named(self, name: str) -> Optional[T]:
        """Load a named snapshot."""
        with self._lock:
            entry = self._named_snapshots.get(name)
            if entry:
                entry.touch()
                return entry.memento
            return None

    def get_history_info(self) -> List[Dict]:
        """Get metadata for UI display (does not expose state)."""
        with self._lock:
            return [
                {
                    "index": i,
                    "description": e.description,
                    "created": e.created.isoformat(),
                    "is_current": i == self._current_index
                }
                for i, e in enumerate(self._entries)
            ]
```

---

## Real-World Applications and Implications

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <div style="font-weight: 700; color: #1e293b; margin-bottom: 12px;">Industry Applications</div>
  <ul style="color: #334155; margin: 0; padding-left: 20px; line-height: 2;">
    <li><strong>Microsoft Word / Google Docs:</strong> Document version history with collaborative conflict resolution</li>
    <li><strong>Git:</strong> Commits as mementos; branches as parallel history lines</li>
    <li><strong>Database Transactions:</strong> Savepoints and rollback using write-ahead log entries as mementos</li>
    <li><strong>Adobe Creative Suite:</strong> History panel stores mementos; smart objects preserve source state</li>
    <li><strong>Redux DevTools:</strong> Time-travel debugging via immutable state snapshots</li>
    <li><strong>VMware/Docker:</strong> VM/container snapshots capture entire machine state for rollback</li>
    <li><strong>Figma/Sketch:</strong> Design version history with named versions and auto-save</li>
    <li><strong>Gaming (Braid, Prince of Persia):</strong> Time-rewind mechanics using frame-by-frame mementos</li>
  </ul>
</div>

### Cross-References to Related Patterns

- [[Command Pattern]](/topics/design-patterns/command) - Alternative undo via inverse operations; compare memory vs complexity trade-offs
- [[Prototype Pattern]](/topics/design-patterns/prototype) - Clone mechanism often used for deep-copying state into mementos
- [[Iterator Pattern]](/topics/design-patterns/iterator) - Navigate through memento history collections
- [[State Pattern]](/topics/design-patterns/state) - Memento can capture state machine snapshots for restoration
- [[Event Sourcing]](/topics/system-design/event-sourcing) - Store events instead of snapshots; rebuild state by replay

---

## Memento vs Command: Deep Comparison

<div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">
  <div style="font-weight: 700; color: #1e293b; margin-bottom: 16px;">Architectural Comparison</div>
  <table style="width: 100%; border-collapse: collapse; color: #334155;">
    <thead>
      <tr style="background: #e2e8f0;">
        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Dimension</th>
        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Memento</th>
        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Command</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>What is stored</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Complete state snapshot</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Operation + parameters + undo logic</td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Undo mechanism</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Restore previous snapshot</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Execute inverse operation</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Memory cost</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">O(state_size) per snapshot</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">O(params_size) per command</td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Implementation complexity</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Simple: just copy state</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Complex: must implement unexecute()</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Undo correctness</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Guaranteed (snapshot is truth)</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Depends on inverse correctness</td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Best fit</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Small state, complex operations</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Large state, simple invertible operations</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Time-travel capability</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Jump to any snapshot directly</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Must replay/unreplay sequentially</td>
      </tr>
    </tbody>
  </table>
</div>

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 20px; margin: 20px 0; border: 2px solid #3b82f6;">
  <div style="font-weight: 700; color: #1e40af; margin-bottom: 12px;">Hybrid Approach: Command + Memento</div>
  <div style="color: #1e3a8a;">
    Production systems often combine both patterns: Commands store operations with Mementos of affected state subsets. This enables efficient undo (only restore what changed) while maintaining correctness (guaranteed snapshot for affected portion).
  </div>
</div>

---

## 3-Level Recursive Interview Questions

### Section 1: Encapsulation Preservation

<details style="margin: 12px 0; padding: 16px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 8px; border: 1px solid #e2e8f0;">
  <summary style="font-weight: 700; color: #1e293b; cursor: pointer;">L1: How does the Memento pattern preserve encapsulation?</summary>
  <div style="margin-top: 16px; color: #334155; padding: 16px; background: #fff; border-radius: 8px;">
    <strong>Answer:</strong> The pattern uses dual interfaces - a narrow interface exposed to the Caretaker (metadata only: timestamp, description, size) and a wide interface accessible only to the Originator (actual state retrieval). The Caretaker stores mementos without knowing their contents. Language mechanisms enforce this: nested classes in Java/C#, friend declarations in C++, module-private symbols in TypeScript, naming conventions in Python.

    <details style="margin: 16px 0; padding: 12px; background: #f8fafc; border-radius: 6px; border-left: 3px solid #3b82f6;">
      <summary style="font-weight: 600; color: #1e40af; cursor: pointer;">L2: What happens if encapsulation is violated? Give a concrete failure scenario.</summary>
      <div style="margin-top: 12px; color: #334155;">
        <strong>Answer:</strong> Consider a document editor where the Caretaker inspects memento contents to implement "smart" features like "show changes preview." If the Originator changes its internal representation (e.g., switches from string content to block-based storage), the Caretaker breaks because it assumed a specific structure. Worse, the Caretaker might corrupt state by making "helpful" modifications to mementos it does not understand. Encapsulation violation creates tight coupling that defeats the pattern's purpose.

        <details style="margin: 12px 0; padding: 10px; background: #fff; border-radius: 4px; border-left: 3px solid #22c55e;">
          <summary style="font-weight: 600; color: #166534; cursor: pointer;">L3: Design a memento system where state MUST be partially inspectable by the Caretaker for legitimate reasons. How do you preserve encapsulation?</summary>
          <div style="margin-top: 10px; color: #334155;">
            <strong>Answer:</strong> Use explicit projection interfaces. Define a MementoMetadata interface with sanctioned inspectable fields (file size, word count, thumbnail) that the Originator populates. The Caretaker depends only on this interface, not the concrete Memento. The Originator can change internal state representation freely as long as it maintains the metadata contract. This is Separated Interface pattern combined with Memento.

            ```python
            class MementoMetadata(Protocol):
            """What Caretaker is allowed to know."""
            def get_preview_thumbnail(self) -> bytes: ...
            def get_byte_size(self) -> int: ...
            def get_summary(self) -> str: ...

            class DocumentMemento(MementoMetadata):
            """Concrete memento with hidden state."""
            _internal_state: Any  # Originator-only

            def get_preview_thumbnail(self) -> bytes:
            return self._generate_thumbnail()  # Derived from state
            ```

            The key insight is that inspectable metadata is computed/derived, not raw internal state exposure.
          </div>
        </details>
      </div>
    </details>
  </div>
</details>

### Section 2: State Snapshots

<details style="margin: 12px 0; padding: 16px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 8px; border: 1px solid #e2e8f0;">
  <summary style="font-weight: 700; color: #1e293b; cursor: pointer;">L1: Why must mementos typically use deep copy? When is shallow copy safe?</summary>
  <div style="margin-top: 16px; color: #334155; padding: 16px; background: #fff; border-radius: 8px;">
    <strong>Answer:</strong> Shallow copy creates references to the same objects. If the Originator mutates those objects, the memento changes retroactively, corrupting history. Deep copy creates independent object graphs. Shallow copy is safe only when: (1) all nested objects are immutable, or (2) you use copy-on-write semantics, or (3) you accept structural sharing with immutable updates (functional approach).

    <details style="margin: 16px 0; padding: 12px; background: #f8fafc; border-radius: 6px; border-left: 3px solid #3b82f6;">
      <summary style="font-weight: 600; color: #1e40af; cursor: pointer;">L2: Deep copy has O(n) cost. How would you implement efficient snapshots for a large document (100MB+)?</summary>
      <div style="margin-top: 12px; color: #334155;">
        <strong>Answer:</strong> Use incremental snapshots with periodic checkpoints. Store only deltas (changes) between states. Every N operations, take a full checkpoint. To restore state K, load nearest checkpoint before K, then replay deltas forward. Trade-off: restoration time increases with delta chain length.

        Alternative: Persistent data structures with structural sharing. Each "mutation" creates a new root but shares unchanged subtrees. Libraries like Immer (JS) or pyrsistent (Python) provide this. Memory is O(change_size), not O(total_size).

        For very large state: Copy-on-write at block level. Mark blocks read-only after snapshot; on mutation, copy only the affected block. This is how ZFS snapshots work.

        <details style="margin: 12px 0; padding: 10px; background: #fff; border-radius: 4px; border-left: 3px solid #22c55e;">
          <summary style="font-weight: 600; color: #166534; cursor: pointer;">L3: Your incremental snapshot system has a bug: after restoring an old state and making new edits, delta chains become corrupted. Diagnose and fix.</summary>
          <div style="margin-top: 10px; color: #334155;">
            <strong>Answer:</strong> The bug occurs because deltas are computed relative to a linear history assumption. When you restore and branch, new deltas are computed relative to the restored state, but old forward deltas still reference the original timeline.

            Fix: Track delta parent pointers explicitly. Each delta stores its parent delta/checkpoint ID. On restore + new edit:
            1. Mark current position as branch point
            2. New deltas link to restored state as parent
            3. History becomes a tree, not a list

            ```python
            @dataclass
            class Delta:
            parent_id: str  # UUID of parent delta or checkpoint
            changes: Dict[str, Any]

            class BranchingDeltaManager:
            def restore_and_edit(self, target_id: str, new_state: Dict):
            parent = self.find_delta(target_id)
            new_delta = Delta(
            parent_id=target_id,  # Branch from restored state
            changes=compute_diff(parent.full_state, new_state)
            )
            self.deltas[new_delta.id] = new_delta
            ```

            This converts linear undo to tree-structured undo, preserving all history branches.
          </div>
        </details>
      </div>
    </details>
  </div>
</details>

### Section 3: Undo/Redo Implementation

<details style="margin: 12px 0; padding: 16px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 8px; border: 1px solid #e2e8f0;">
  <summary style="font-weight: 700; color: #1e293b; cursor: pointer;">L1: Explain the standard undo/redo state transitions.</summary>
  <div style="margin-top: 16px; color: #334155; padding: 16px; background: #fff; border-radius: 8px;">
    <strong>Answer:</strong>

    **Edit:** Current state pushed to undo stack. Redo stack cleared. New state becomes current.

    **Undo:** Current state pushed to redo stack. Previous state popped from undo stack and restored.

    **Redo:** Current state pushed to undo stack. State popped from redo stack and restored.

    Key invariant: undo_stack.top + redo_stack = complete linear history. Clearing redo on edit creates linear history; branching history preserves redo stack.

    <details style="margin: 16px 0; padding: 12px; background: #f8fafc; border-radius: 6px; border-left: 3px solid #3b82f6;">
      <summary style="font-weight: 600; color: #1e40af; cursor: pointer;">L2: Design undo for a collaborative editor where multiple users edit simultaneously.</summary>
      <div style="margin-top: 12px; color: #334155;">
        <strong>Answer:</strong> Traditional undo breaks in collaboration because undoing MY change might conflict with YOUR concurrent changes. Three approaches:

        1. **Local undo only:** Each user has personal undo stack. Undo generates compensating operation (not memento restore) that is broadcast like any edit. Does not truly "restore" past state.

        2. **Selective undo:** Track which user made which changes. Undo removes specific user's operation using operational transformation (OT) or CRDT to maintain consistency. Complex but intuitive to users.

        3. **Global undo:** Single shared history. Anyone can undo anything. Last writer wins conflicts. Simple but confusing user experience.

        Industry standard (Google Docs, Figma) uses local selective undo: you can only undo your own actions, implemented via compensating operations.

        <details style="margin: 12px 0; padding: 10px; background: #fff; border-radius: 4px; border-left: 3px solid #22c55e;">
          <summary style="font-weight: 600; color: #166534; cursor: pointer;">L3: In your selective undo system, User A deletes paragraph P, User B modifies word W inside P, User A undoes. What happens to User B's edit?</summary>
          <div style="margin-top: 10px; color: #334155;">
            <strong>Answer:</strong> This is the "resurrection conflict" problem. Options:

            1. **Discard B's edit:** Undo "wins." B's work is lost. Simple but user-hostile.

            2. **Resurrect with B's edit:** Restore paragraph P with B's modification included. Requires tracking that B's operation targeted content within P. When P is restored, transform B's operation to apply to restored content.

            3. **Conflict marker:** Restore P but flag conflict zone. Notify B their edit location was restored. Let B resolve manually.

            4. **Prevent undo:** Block A's undo because dependent edits exist. Require A to coordinate with B first.

            Production systems typically use option 2 (resurrection with transforms) via OT/CRDT. The insight is that undo is not "restore memento" but "generate inverse operation and apply through normal collaborative pipeline."

            ```python
            def selective_undo(user_id: str, operation_id: str):
            original_op = history.find(operation_id)
            inverse_op = original_op.compute_inverse()

            # Transform inverse against all operations that happened after original
            for subsequent_op in history.after(operation_id):
            inverse_op = OT.transform(inverse_op, subsequent_op)

            # Apply transformed inverse as new operation
            apply_and_broadcast(inverse_op, user_id)
            ```

            This maintains the invariant that all users converge to same state despite concurrent undos.
          </div>
        </details>
      </div>
    </details>
  </div>
</details>

### Section 4: Caretaker Role

<details style="margin: 12px 0; padding: 16px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 8px; border: 1px solid #e2e8f0;">
  <summary style="font-weight: 700; color: #1e293b; cursor: pointer;">L1: What are the Caretaker's responsibilities and constraints?</summary>
  <div style="margin-top: 16px; color: #334155; padding: 16px; background: #fff; border-radius: 8px;">
    <strong>Answer:</strong>

    **Responsibilities:** Store mementos, manage history (size limits, eviction), provide navigation (undo/redo/goto), support persistence (serialize for storage), track metadata (timestamps, descriptions).

    **Constraints:** Must NOT inspect memento state contents, must NOT modify mementos, must NOT make decisions based on state values, must NOT assume memento internal structure.

    The Caretaker treats mementos as opaque tokens. This enables polymorphism: same Caretaker code works with different Originator types.

    <details style="margin: 16px 0; padding: 12px; background: #f8fafc; border-radius: 6px; border-left: 3px solid #3b82f6;">
      <summary style="font-weight: 600; color: #1e40af; cursor: pointer;">L2: How should the Caretaker handle memory pressure? Design an eviction strategy.</summary>
      <div style="margin-top: 12px; color: #334155;">
        <strong>Answer:</strong> Eviction strategies depend on access patterns:

        **LRU (Least Recently Used):** Evict mementos not accessed recently. Good for temporal locality.

        **Size-weighted LRU:** Evict large mementos first to free more space. Good when memento sizes vary significantly.

        **Keep boundaries:** Never evict first/last N mementos (oldest for audit, newest for immediate undo). Evict from middle.

        **Checkpoint preservation:** Evict deltas but keep full checkpoints. Allows restoration at reduced granularity.

        **Age-based:** Evict mementos older than threshold. Good for compliance requirements.

        **Named protection:** User-bookmarked mementos never evicted.

        Production systems combine: LRU for automatic history, protected set for user bookmarks, age-based for compliance.

        <details style="margin: 12px 0; padding: 10px; background: #fff; border-radius: 4px; border-left: 3px solid #22c55e;">
          <summary style="font-weight: 600; color: #166534; cursor: pointer;">L3: Your eviction system runs in a multi-threaded environment. Users report "phantom undos" where undo restores unexpected states. Debug this.</summary>
          <div style="margin-top: 10px; color: #334155;">
            <strong>Answer:</strong> Race condition between eviction and undo operations. Scenario:

            1. Thread A: User triggers undo, reads current_index = 5
            2. Thread B: Memory pressure triggers eviction, removes index 3
            3. Thread B: Adjusts indices, now old index 5 is index 4
            4. Thread A: Restores memento at index 5 (now different state!)

            Fix: Use proper synchronization.

            ```python
            class ThreadSafeCaretaker:
            def __init__(self):
            self._lock = threading.RLock()
            self._mementos: List[Memento] = []
            self._current_index: int = -1

            def undo(self) -> Optional[Memento]:
            with self._lock:  # Hold lock for entire operation
            if self._current_index > 0:
            self._current_index -= 1
            return self._mementos[self._current_index]
            return None

            def _evict(self):
            with self._lock:  # Same lock - eviction waits for undo
            # Perform eviction, adjust indices atomically
            pass
            ```

            Alternative: Lock-free design using immutable snapshots of the memento list. Each operation creates new list reference; eviction and access never conflict because they work on different list instances.

            ```python
            def undo(self) -> Optional[Memento]:
            while True:
            snapshot = self._mementos  # Atomic read
            new_index = self._current_index - 1
            if new_index < 0:
            return None
            if self._cas_index(self._current_index, new_index):
            return snapshot[new_index]
            # CAS failed, retry with new snapshot
            ```

            The key insight: phantom undos come from non-atomic read-then-act sequences. Solution is either blocking locks or lock-free atomic operations.
          </div>
        </details>
      </div>
    </details>
  </div>
</details>

### Section 5: Edge Cases and Failure Modes

<details style="margin: 12px 0; padding: 16px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 8px; border: 1px solid #e2e8f0;">
  <summary style="font-weight: 700; color: #1e293b; cursor: pointer;">L1: What are common failure modes when implementing Memento?</summary>
  <div style="margin-top: 16px; color: #334155; padding: 16px; background: #fff; border-radius: 8px;">
    <strong>Answer:</strong>

    1. **Shallow copy bugs:** Originator mutation corrupts historical mementos
    2. **Memory exhaustion:** Unbounded history growth
    3. **Stale mementos:** Schema evolution invalidates old mementos
    4. **External reference corruption:** Memento contains handles to external resources that no longer exist
    5. **Circular reference issues:** Deep copy fails on cyclic object graphs
    6. **Time-sensitive state:** Restored state contains expired timestamps, tokens
    7. **Invariant violations:** Restored state valid in isolation but inconsistent with external systems

    <details style="margin: 16px 0; padding: 12px; background: #f8fafc; border-radius: 6px; border-left: 3px solid #3b82f6;">
      <summary style="font-weight: 600; color: #1e40af; cursor: pointer;">L2: Your application stores mementos to disk. After deployment, you change the Originator's internal structure. How do you handle old mementos?</summary>
      <div style="margin-top: 12px; color: #334155;">
        <strong>Answer:</strong> Schema migration for mementos. Options:

        1. **Version field:** Each memento stores schema version. On restore, check version and run migration function if needed.

        2. **Forward-compatible format:** Use extensible serialization (protobuf, JSON with ignored fields). New fields have defaults; old mementos still work.

        3. **Explicit migration:** On startup, batch-migrate all stored mementos to current schema. Downside: slow startup, complex migration code.

        4. **Lazy migration:** Migrate individual mementos when accessed. Store migrated version. Amortizes cost.

        5. **Discard old:** After major version change, invalidate all old mementos. Simple but loses user history.

        ```python
        class VersionedMemento:
        VERSION = 3

        @classmethod
        def restore(cls, data: dict) -> 'VersionedMemento':
        version = data.get('_version', 1)

        # Migration chain
        if version < 2:
        data = cls._migrate_v1_to_v2(data)
        if version < 3:
        data = cls._migrate_v2_to_v3(data)

        data['_version'] = cls.VERSION
        return cls(**data)
        ```

        <details style="margin: 12px 0; padding: 10px; background: #fff; border-radius: 4px; border-left: 3px solid #22c55e;">
          <summary style="font-weight: 600; color: #166534; cursor: pointer;">L3: Your migrated mementos work for restore, but users report "undo behaves differently after upgrade." The state looks correct but application behavior changed. Diagnose.</summary>
          <div style="margin-top: 10px; color: #334155;">
            <strong>Answer:</strong> State is necessary but not sufficient for behavioral equivalence. The bug is that memento captures data but not behavioral context:

            1. **Configuration drift:** Application behavior depends on config values that changed between memento creation and restore. Memento has old data + new config = different behavior.

            2. **Code behavior change:** A bug fix changed how the Originator interprets state. Old state + new code = different results than old state + old code.

            3. **External dependency change:** State references external entity (user ID, API version). External entity's behavior changed; restored state now triggers different external behavior.

            **Solutions:**

            - Include behavioral version in memento; warn user when restoring across behavior changes
            - Store relevant configuration snapshot with memento
            - For critical operations, log expected outcomes; on restore, verify or warn on divergence
            - Implement "behavioral fingerprinting" - compute hash of behavior for test inputs, detect when behavior changes for same state

            ```python
            class BehaviorAwareMemento:
            state: Dict
            config_snapshot: Dict
            behavior_version: str
            expected_behaviors: Dict[str, Any]  # input -> expected output samples

            def validate_on_restore(self, current_behavior_version: str) -> List[str]:
            warnings = []
            if self.behavior_version != current_behavior_version:
            warnings.append(f"Behavior changed: {self.behavior_version} -> {current_behavior_version}")

            # Test samples
            for input_key, expected in self.expected_behaviors.items():
            actual = compute_behavior(self.state, input_key)
            if actual != expected:
            warnings.append(f"Behavior divergence for {input_key}")

            return warnings
            ```

            The key insight: Memento captures state, not behavior. Schema migration preserves data fidelity but not behavioral fidelity. True time-travel requires versioned code + versioned data.
          </div>
        </details>
      </div>
    </details>
  </div>
</details>

---

## Production Implementation Patterns

### Complete TypeScript Implementation with Symbol-Based Privacy

```typescript
/**
 * Production Memento implementation using Symbol for true privacy.
 * The state access symbol is shared only between Originator and Memento
 * through module closure - Caretaker cannot access it.
 */

// Module-private symbol - only accessible within this module
const STATE_ACCESS = Symbol('memento-state');

interface MementoMetadata {
  readonly timestamp: Date;
  readonly description: string;
  readonly sizeBytes: number;
}

interface Memento<T> extends MementoMetadata {
  // State access is hidden behind symbol key
  [STATE_ACCESS]: T;
}

function createMemento<T>(
  state: T,
  description: string = ''
): Memento<T> {
  const frozen = structuredClone(state); // Deep copy + freeze

  return Object.freeze({
    timestamp: new Date(),
    description,
    sizeBytes: JSON.stringify(frozen).length,
    [STATE_ACCESS]: frozen
  });
}

function extractState<T>(memento: Memento<T>): T {
  return structuredClone(memento[STATE_ACCESS]);
}

// Caretaker only sees MementoMetadata interface
class UndoManager<T> {
  private history: MementoMetadata[] = [];
  private redoStack: MementoMetadata[] = [];
  private currentIndex = -1;
  private maxHistory: number;

  constructor(maxHistory = 100) {
    this.maxHistory = maxHistory;
  }

  save(memento: MementoMetadata): void {
    // Clear redo history on new save
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.redoStack = [];

    this.history.push(memento);
    this.currentIndex = this.history.length - 1;

    // Enforce limit
    if (this.history.length > this.maxHistory) {
      this.history.shift();
      this.currentIndex--;
    }
  }

  undo(): MementoMetadata | null {
    if (this.currentIndex > 0) {
      this.redoStack.push(this.history[this.currentIndex]);
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  redo(): MementoMetadata | null {
    if (this.redoStack.length > 0) {
      this.currentIndex++;
      const memento = this.redoStack.pop()!;
      return memento;
    }
    return null;
  }

  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  getHistoryDescriptions(): string[] {
    return this.history.map((m, i) =>
      `${i === this.currentIndex ? '> ' : '  '}${m.description} (${m.timestamp.toISOString()})`
    );
  }
}

// Originator - document editor
interface DocumentState {
  content: string;
  cursor: number;
  selection: [number, number];
  formatting: Map<string, string>;
}

class DocumentEditor {
  private state: DocumentState = {
    content: '',
    cursor: 0,
    selection: [0, 0],
    formatting: new Map()
  };

  private history = new UndoManager<DocumentState>();

  constructor() {
    // Save initial state
    this.saveSnapshot('Initial');
  }

  private saveSnapshot(description: string): void {
    const memento = createMemento(this.state, description);
    this.history.save(memento);
  }

  typeText(text: string): void {
    const before = this.state.content.slice(0, this.state.cursor);
    const after = this.state.content.slice(this.state.cursor);
    this.state.content = before + text + after;
    this.state.cursor += text.length;
    this.saveSnapshot(`Type: "${text.slice(0, 20)}${text.length > 20 ? '...' : ''}"`);
  }

  deleteBackward(count = 1): void {
    const deleteStart = Math.max(0, this.state.cursor - count);
    const deleted = this.state.content.slice(deleteStart, this.state.cursor);
    this.state.content =
      this.state.content.slice(0, deleteStart) +
      this.state.content.slice(this.state.cursor);
    this.state.cursor = deleteStart;
    this.saveSnapshot(`Delete: "${deleted}"`);
  }

  undo(): boolean {
    const memento = this.history.undo() as Memento<DocumentState> | null;
    if (memento) {
      this.state = extractState(memento);
      return true;
    }
    return false;
  }

  redo(): boolean {
    const memento = this.history.redo() as Memento<DocumentState> | null;
    if (memento) {
      this.state = extractState(memento);
      return true;
    }
    return false;
  }

  get content(): string {
    return this.state.content;
  }

  get canUndo(): boolean {
    return this.history.canUndo();
  }

  get canRedo(): boolean {
    return this.history.canRedo();
  }
}
```

---

## Best Practices Summary

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 2px solid #3b82f6;">
  <div style="font-weight: 700; color: #1e40af; margin-bottom: 16px; font-size: 1.1rem;">Production Checklist</div>
  <div style="display: grid; gap: 12px;">
    <div style="display: flex; align-items: flex-start; gap: 12px;">
      <div style="background: #1e40af; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0;">1</div>
      <div><strong>Immutable mementos:</strong> Use frozen dataclasses, Object.freeze(), or immutable data structures</div>
    </div>
    <div style="display: flex; align-items: flex-start; gap: 12px;">
      <div style="background: #1e40af; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0;">2</div>
      <div><strong>Deep copy verification:</strong> Test with nested mutable objects to ensure isolation</div>
    </div>
    <div style="display: flex; align-items: flex-start; gap: 12px;">
      <div style="background: #1e40af; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0;">3</div>
      <div><strong>Bounded history:</strong> Always set max_history limit; implement eviction policy</div>
    </div>
    <div style="display: flex; align-items: flex-start; gap: 12px;">
      <div style="background: #1e40af; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0;">4</div>
      <div><strong>Metadata for UX:</strong> Timestamps and descriptions enable meaningful history display</div>
    </div>
    <div style="display: flex; align-items: flex-start; gap: 12px;">
      <div style="background: #1e40af; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0;">5</div>
      <div><strong>Version for persistence:</strong> Schema versioning enables forward-compatible storage</div>
    </div>
    <div style="display: flex; align-items: flex-start; gap: 12px;">
      <div style="background: #1e40af; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0;">6</div>
      <div><strong>External resource handling:</strong> Document how to handle file handles, connections, etc.</div>
    </div>
    <div style="display: flex; align-items: flex-start; gap: 12px;">
      <div style="background: #1e40af; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0;">7</div>
      <div><strong>Thread safety:</strong> Document synchronization requirements; implement if needed</div>
    </div>
    <div style="display: flex; align-items: flex-start; gap: 12px;">
      <div style="background: #1e40af; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0;">8</div>
      <div><strong>Restore validation:</strong> Verify state integrity after restore; handle corrupt mementos gracefully</div>
    </div>
  </div>
</div>

---

## Related Patterns

- [[Command Pattern]](/topics/design-patterns/command) - Alternative undo approach using inverse operations
- [[Prototype Pattern]](/topics/design-patterns/prototype) - Clone mechanism for deep copying state
- [[Iterator Pattern]](/topics/design-patterns/iterator) - Navigate through memento collections
- [[State Pattern]](/topics/design-patterns/state) - Memento captures state machine configurations
- [[Event Sourcing]](/topics/system-design/event-sourcing) - Store events instead of snapshots; rebuild by replay
- [[CQRS]](/topics/system-design/cqrs) - Separate read/write models; mementos for read-side snapshots
