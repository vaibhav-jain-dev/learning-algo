# Memento Pattern

## Overview

The Memento pattern captures and externalizes an object's internal state so that the object can be restored to this state later. It enables undo/redo functionality without violating encapsulation.

## Key Concepts

### When to Use

- Need to save and restore object state
- Implement undo/redo functionality
- Create snapshots/checkpoints
- Preserve encapsulation boundaries

## Implementation

### Python

```python
from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional
from dataclasses import dataclass, field
from datetime import datetime
from copy import deepcopy


# Memento - stores the state
@dataclass
class EditorMemento:
    content: str
    cursor_position: int
    selection: tuple
    timestamp: datetime = field(default_factory=datetime.now)

    def get_description(self) -> str:
        preview = self.content[:30] + "..." if len(self.content) > 30 else self.content
        return f"[{self.timestamp.strftime('%H:%M:%S')}] {preview}"


# Originator - creates and restores mementos
class TextEditor:
    def __init__(self):
        self._content = ""
        self._cursor_position = 0
        self._selection = (0, 0)

    @property
    def content(self) -> str:
        return self._content

    def type_text(self, text: str):
        before = self._content[:self._cursor_position]
        after = self._content[self._cursor_position:]
        self._content = before + text + after
        self._cursor_position += len(text)

    def delete(self, count: int = 1):
        if self._cursor_position > 0:
            before = self._content[:max(0, self._cursor_position - count)]
            after = self._content[self._cursor_position:]
            self._content = before + after
            self._cursor_position = max(0, self._cursor_position - count)

    def move_cursor(self, position: int):
        self._cursor_position = max(0, min(len(self._content), position))

    def select(self, start: int, end: int):
        self._selection = (max(0, start), min(len(self._content), end))

    def save(self) -> EditorMemento:
        return EditorMemento(
            content=self._content,
            cursor_position=self._cursor_position,
            selection=self._selection
        )

    def restore(self, memento: EditorMemento):
        self._content = memento.content
        self._cursor_position = memento.cursor_position
        self._selection = memento.selection

    def __str__(self):
        return f"Content: '{self._content}' | Cursor: {self._cursor_position}"


# Caretaker - manages mementos
class History:
    def __init__(self, max_size: int = 50):
        self._mementos: List[EditorMemento] = []
        self._current_index = -1
        self._max_size = max_size

    def push(self, memento: EditorMemento):
        # Remove any redo history
        self._mementos = self._mementos[:self._current_index + 1]
        self._mementos.append(memento)
        self._current_index = len(self._mementos) - 1

        # Limit history size
        if len(self._mementos) > self._max_size:
            self._mementos.pop(0)
            self._current_index -= 1

    def undo(self) -> Optional[EditorMemento]:
        if self._current_index > 0:
            self._current_index -= 1
            return self._mementos[self._current_index]
        return None

    def redo(self) -> Optional[EditorMemento]:
        if self._current_index < len(self._mementos) - 1:
            self._current_index += 1
            return self._mementos[self._current_index]
        return None

    def can_undo(self) -> bool:
        return self._current_index > 0

    def can_redo(self) -> bool:
        return self._current_index < len(self._mementos) - 1

    def show_history(self):
        print("History:")
        for i, memento in enumerate(self._mementos):
            marker = " <-- current" if i == self._current_index else ""
            print(f"  [{i}] {memento.get_description()}{marker}")


# Complex example: Game state
@dataclass
class GameMemento:
    level: int
    score: int
    health: int
    position: Dict[str, int]
    inventory: List[str]
    timestamp: datetime = field(default_factory=datetime.now)


class Game:
    def __init__(self):
        self.level = 1
        self.score = 0
        self.health = 100
        self.position = {"x": 0, "y": 0}
        self.inventory = []

    def play(self, action: str):
        if action == "move":
            self.position["x"] += 1
            self.score += 10
        elif action == "fight":
            self.health -= 20
            self.score += 50
        elif action == "collect":
            self.inventory.append(f"item_{len(self.inventory)}")
            self.score += 25
        elif action == "level_up":
            self.level += 1
            self.health = 100

    def save(self) -> GameMemento:
        return GameMemento(
            level=self.level,
            score=self.score,
            health=self.health,
            position=deepcopy(self.position),
            inventory=list(self.inventory)
        )

    def restore(self, memento: GameMemento):
        self.level = memento.level
        self.score = memento.score
        self.health = memento.health
        self.position = deepcopy(memento.position)
        self.inventory = list(memento.inventory)

    def __str__(self):
        return (f"Level: {self.level} | Score: {self.score} | "
                f"Health: {self.health} | Pos: {self.position} | "
                f"Items: {len(self.inventory)}")


class GameSaveManager:
    def __init__(self, max_saves: int = 10):
        self.saves: Dict[str, GameMemento] = {}
        self.autosaves: List[GameMemento] = []
        self.max_autosaves = max_saves

    def save(self, name: str, memento: GameMemento):
        self.saves[name] = memento
        print(f"Game saved as '{name}'")

    def autosave(self, memento: GameMemento):
        self.autosaves.append(memento)
        if len(self.autosaves) > self.max_autosaves:
            self.autosaves.pop(0)

    def load(self, name: str) -> Optional[GameMemento]:
        return self.saves.get(name)

    def get_latest_autosave(self) -> Optional[GameMemento]:
        return self.autosaves[-1] if self.autosaves else None

    def list_saves(self):
        print("Saved games:")
        for name, memento in self.saves.items():
            print(f"  {name}: Level {memento.level}, Score {memento.score}")


# Usage
print("=== Text Editor ===")
editor = TextEditor()
history = History()

# Save initial state
history.push(editor.save())

# Make changes
editor.type_text("Hello")
history.push(editor.save())
print(editor)

editor.type_text(" World")
history.push(editor.save())
print(editor)

editor.type_text("!")
history.push(editor.save())
print(editor)

# Undo
print("\n--- Undo ---")
if memento := history.undo():
    editor.restore(memento)
print(editor)

if memento := history.undo():
    editor.restore(memento)
print(editor)

# Redo
print("\n--- Redo ---")
if memento := history.redo():
    editor.restore(memento)
print(editor)

history.show_history()

print("\n=== Game Save ===")
game = Game()
save_manager = GameSaveManager()

# Play and autosave
game.play("move")
save_manager.autosave(game.save())

game.play("fight")
game.play("collect")
save_manager.autosave(game.save())

# Manual save
save_manager.save("checkpoint_1", game.save())

game.play("level_up")
game.play("fight")
print(f"Current: {game}")

# Load save
if saved := save_manager.load("checkpoint_1"):
    game.restore(saved)
    print(f"Loaded: {game}")

save_manager.list_saves()
```

### Go

```go
package main

import (
	"fmt"
	"time"
)

// Memento
type EditorMemento struct {
	Content        string
	CursorPosition int
	Timestamp      time.Time
}

func (m *EditorMemento) GetDescription() string {
	preview := m.Content
	if len(preview) > 30 {
		preview = preview[:30] + "..."
	}
	return fmt.Sprintf("[%s] %s", m.Timestamp.Format("15:04:05"), preview)
}

// Originator
type TextEditor struct {
	content        string
	cursorPosition int
}

func NewTextEditor() *TextEditor {
	return &TextEditor{}
}

func (e *TextEditor) TypeText(text string) {
	before := e.content[:e.cursorPosition]
	after := e.content[e.cursorPosition:]
	e.content = before + text + after
	e.cursorPosition += len(text)
}

func (e *TextEditor) Delete(count int) {
	if e.cursorPosition > 0 {
		start := e.cursorPosition - count
		if start < 0 {
			start = 0
		}
		e.content = e.content[:start] + e.content[e.cursorPosition:]
		e.cursorPosition = start
	}
}

func (e *TextEditor) Save() *EditorMemento {
	return &EditorMemento{
		Content:        e.content,
		CursorPosition: e.cursorPosition,
		Timestamp:      time.Now(),
	}
}

func (e *TextEditor) Restore(m *EditorMemento) {
	e.content = m.Content
	e.cursorPosition = m.CursorPosition
}

func (e *TextEditor) String() string {
	return fmt.Sprintf("Content: '%s' | Cursor: %d", e.content, e.cursorPosition)
}

// Caretaker
type History struct {
	mementos     []*EditorMemento
	currentIndex int
	maxSize      int
}

func NewHistory(maxSize int) *History {
	return &History{
		mementos:     make([]*EditorMemento, 0),
		currentIndex: -1,
		maxSize:      maxSize,
	}
}

func (h *History) Push(m *EditorMemento) {
	// Remove redo history
	h.mementos = h.mementos[:h.currentIndex+1]
	h.mementos = append(h.mementos, m)
	h.currentIndex = len(h.mementos) - 1

	// Limit size
	if len(h.mementos) > h.maxSize {
		h.mementos = h.mementos[1:]
		h.currentIndex--
	}
}

func (h *History) Undo() *EditorMemento {
	if h.currentIndex > 0 {
		h.currentIndex--
		return h.mementos[h.currentIndex]
	}
	return nil
}

func (h *History) Redo() *EditorMemento {
	if h.currentIndex < len(h.mementos)-1 {
		h.currentIndex++
		return h.mementos[h.currentIndex]
	}
	return nil
}

func (h *History) ShowHistory() {
	fmt.Println("History:")
	for i, m := range h.mementos {
		marker := ""
		if i == h.currentIndex {
			marker = " <-- current"
		}
		fmt.Printf("  [%d] %s%s\n", i, m.GetDescription(), marker)
	}
}

func main() {
	editor := NewTextEditor()
	history := NewHistory(50)

	// Save initial state
	history.Push(editor.Save())

	// Make changes
	editor.TypeText("Hello")
	history.Push(editor.Save())
	fmt.Println(editor)

	editor.TypeText(" World")
	history.Push(editor.Save())
	fmt.Println(editor)

	editor.TypeText("!")
	history.Push(editor.Save())
	fmt.Println(editor)

	// Undo
	fmt.Println("\n--- Undo ---")
	if m := history.Undo(); m != nil {
		editor.Restore(m)
	}
	fmt.Println(editor)

	if m := history.Undo(); m != nil {
		editor.Restore(m)
	}
	fmt.Println(editor)

	// Redo
	fmt.Println("\n--- Redo ---")
	if m := history.Redo(); m != nil {
		editor.Restore(m)
	}
	fmt.Println(editor)

	history.ShowHistory()
}
```

## Structure

```
Originator ────creates────> Memento
     │                         │
     │                         │ stored by
     │                         ▼
     └───────restores from─── Caretaker
```

## Best Practices

1. **Encapsulation** - Only originator accesses memento internals
2. **Deep copy** - Ensure state is properly copied
3. **Memory management** - Limit number of mementos
4. **Incremental saves** - Consider storing diffs for large objects

## Related Patterns

- [Command](/topic/design-patterns/command) - Commands can use mementos for undo
- [Iterator](/topic/design-patterns/iterator) - Iterate through history
- [Prototype](/topic/design-patterns/prototype) - Cloning state
