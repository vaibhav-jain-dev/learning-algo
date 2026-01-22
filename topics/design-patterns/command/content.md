# Command Pattern

## Overview

The Command pattern encapsulates a request as an object, allowing you to parameterize clients with different requests, queue or log requests, and support undoable operations. It transforms a method call into a standalone object that contains all information about the request.

**Difficulty:** Intermediate
**Category:** Behavioral Pattern
**Also Known As:** Action, Transaction

---

## Simple Explanation: The Restaurant Analogy

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #cbd5e1;">
  <div style="font-size: 2.5rem; text-align: center; margin-bottom: 16px;">📝</div>
  <div style="font-size: 1.3rem; font-weight: 700; color: #1e293b; text-align: center; margin-bottom: 12px;">Think of a Restaurant Order</div>
  <div style="color: #334155; font-size: 1rem; line-height: 1.7;">
    When you dine at a restaurant, you don't walk into the kitchen and tell the chef what to cook. Instead, a waiter takes your order (writes it down on paper), carries it to the kitchen, and hands it to the chef. That piece of paper IS the command object - it encapsulates everything about your request: what dish, how cooked, any modifications. The waiter doesn't need to know how to cook; the chef doesn't need to know who ordered. The order slip decouples everyone.
  </div>
  <div style="margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
    <div style="background: #dbeafe; padding: 12px 16px; border-radius: 8px; text-align: center;">
      <div style="color: #1e40af; font-weight: 600;">Customer</div>
      <div style="color: #3b82f6; font-size: 0.85rem;">Client (makes request)</div>
    </div>
    <div style="background: #dcfce7; padding: 12px 16px; border-radius: 8px; text-align: center;">
      <div style="color: #166534; font-weight: 600;">Order Slip</div>
      <div style="color: #22c55e; font-size: 0.85rem;">Command Object</div>
    </div>
    <div style="background: #fef3c7; padding: 12px 16px; border-radius: 8px; text-align: center;">
      <div style="color: #92400e; font-weight: 600;">Waiter</div>
      <div style="color: #f59e0b; font-size: 0.85rem;">Invoker (triggers)</div>
    </div>
    <div style="background: #fce7f3; padding: 12px 16px; border-radius: 8px; text-align: center;">
      <div style="color: #9d174d; font-weight: 600;">Chef</div>
      <div style="color: #ec4899; font-size: 0.85rem;">Receiver (does work)</div>
    </div>
  </div>
</div>

### The Expert Insight

**Novice thinks:** "Command is just wrapping a function call in an object."

**Expert knows:** "Command transforms **imperative code into data**. Once an action becomes data, you can store it, transmit it, queue it, serialize it, replay it, and undo it. This is the foundation of event sourcing, transaction logs, and distributed systems."

---

## Real-World Company Usage

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <div style="font-weight: 700; color: #1e293b; margin-bottom: 12px;">Industry Applications</div>
  <ul style="color: #334155; margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Adobe Photoshop:</strong> Every action (brush stroke, filter, transform) is a command - enabling unlimited undo/redo history</li>
    <li><strong>Git:</strong> Commits are commands that can be reverted, cherry-picked, or rebased</li>
    <li><strong>Redux/Flux:</strong> Actions are commands dispatched to reducers - the entire state history can be replayed</li>
    <li><strong>AWS Lambda:</strong> Each invocation is a command object with payload, enabling retry and dead-letter queues</li>
    <li><strong>Slack:</strong> Slash commands encapsulate user requests that get routed to different handlers</li>
    <li><strong>Database Transactions:</strong> SQL statements are commands that can be committed or rolled back</li>
  </ul>
</div>

---

## Pattern Structure

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <div style="font-weight: 700; color: #1e293b; text-align: center; margin-bottom: 24px; font-size: 1.2rem;">Command Pattern Architecture</div>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
    <!-- Client and Invoker Row -->
    <div style="display: flex; justify-content: center; gap: 60px; flex-wrap: wrap;">
      <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 140px;">
        <div style="font-weight: 700; color: #1e40af; font-size: 1.1rem;">Client</div>
        <div style="font-size: 0.8rem; color: #3b82f6; margin-top: 4px;">Creates commands</div>
      </div>
      <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 140px;">
        <div style="font-weight: 700; color: #92400e; font-size: 1.1rem;">Invoker</div>
        <div style="font-size: 0.8rem; color: #b45309; margin-top: 4px; font-family: monospace;">+ setCommand()<br/>+ invoke()</div>
      </div>
    </div>
    <!-- Arrow down -->
    <div style="color: #64748b; font-size: 1.5rem;">creates / triggers</div>
    <div style="color: #64748b; font-size: 2rem;">&#8595;</div>
    <!-- Command Interface -->
    <div style="background: #f1f5f9; border: 2px dashed #64748b; border-radius: 12px; padding: 16px 32px; text-align: center;">
      <div style="font-weight: 600; color: #475569; font-style: italic;">Command (interface)</div>
      <div style="font-size: 0.85rem; color: #64748b; margin-top: 8px; font-family: monospace;">+ execute()<br/>+ undo()</div>
    </div>
    <!-- Arrow down -->
    <div style="color: #64748b; font-size: 1rem;">implements</div>
    <div style="color: #64748b; font-size: 2rem;">&#8595;</div>
    <!-- Concrete Command -->
    <div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; padding: 16px 32px; text-align: center;">
      <div style="font-weight: 700; color: #166534; font-size: 1.1rem;">ConcreteCommand</div>
      <div style="font-size: 0.8rem; color: #15803d; margin-top: 8px; font-family: monospace;">- receiver<br/>- state<br/>+ execute()<br/>+ undo()</div>
    </div>
    <!-- Arrow down -->
    <div style="color: #64748b; font-size: 1rem;">delegates to</div>
    <div style="color: #64748b; font-size: 2rem;">&#8595;</div>
    <!-- Receiver -->
    <div style="background: #fce7f3; border: 2px solid #ec4899; border-radius: 12px; padding: 16px 32px; text-align: center;">
      <div style="font-weight: 700; color: #9d174d; font-size: 1.1rem;">Receiver</div>
      <div style="font-size: 0.8rem; color: #be185d; margin-top: 8px; font-family: monospace;">+ action()</div>
    </div>
  </div>
</div>

---

## When to Use Command Pattern

<div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <div style="font-weight: 700; color: #166534; margin-bottom: 12px;">Perfect Use Cases</div>
  <ul style="color: #334155; margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Undo/Redo functionality:</strong> Store command history and reverse operations</li>
    <li><strong>Queue operations:</strong> Schedule commands for later execution</li>
    <li><strong>Log and audit:</strong> Record all actions for compliance or debugging</li>
    <li><strong>Transaction systems:</strong> Group commands and rollback on failure</li>
    <li><strong>Macro recording:</strong> Combine multiple commands into composite operations</li>
    <li><strong>Remote procedure calls:</strong> Serialize commands and send over network</li>
    <li><strong>GUI buttons/menus:</strong> Decouple UI elements from business logic</li>
  </ul>
</div>

---

## Anti-Patterns: When NOT to Use

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="font-weight: 700; color: #991b1b; margin-bottom: 12px;">Common Mistakes</div>
  <ul style="color: #334155; margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Over-engineering:</strong> Don't use Command for simple one-off operations without undo needs</li>
    <li><strong>State pollution:</strong> Commands storing too much state become memory hogs</li>
    <li><strong>God command:</strong> Single command doing too many things - violates SRP</li>
    <li><strong>Ignoring failures:</strong> Not handling partial execution in composite commands</li>
    <li><strong>Circular dependencies:</strong> Commands referencing other commands without clear hierarchy</li>
  </ul>
</div>

---

## Python Implementation: Text Editor with Undo/Redo

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import List, Optional
from datetime import datetime
from copy import deepcopy


# ============================================================
# COMMAND INTERFACE
# ============================================================

class Command(ABC):
    """
    Abstract base class for all commands.
    Every command must implement execute() and undo().
    """

    @abstractmethod
    def execute(self) -> None:
        """Execute the command action."""
        pass

    @abstractmethod
    def undo(self) -> None:
        """Reverse the command action."""
        pass

    @abstractmethod
    def description(self) -> str:
        """Human-readable description for logging."""
        pass


# ============================================================
# RECEIVER - The object that performs actual work
# ============================================================

@dataclass
class TextDocument:
    """
    Receiver class - contains the actual business logic.
    Commands delegate work to this class.
    """
    content: str = ""

    def insert(self, position: int, text: str) -> None:
        """Insert text at a specific position."""
        self.content = self.content[:position] + text + self.content[position:]

    def delete(self, position: int, length: int) -> str:
        """Delete text and return what was deleted (for undo)."""
        deleted = self.content[position:position + length]
        self.content = self.content[:position] + self.content[position + length:]
        return deleted

    def replace(self, position: int, length: int, text: str) -> str:
        """Replace text and return what was replaced."""
        old_text = self.content[position:position + length]
        self.content = self.content[:position] + text + self.content[position + length:]
        return old_text


# ============================================================
# CONCRETE COMMANDS
# ============================================================

class InsertCommand(Command):
    """Command to insert text at a position."""

    def __init__(self, document: TextDocument, position: int, text: str):
        self.document = document
        self.position = position
        self.text = text
        self.executed = False

    def execute(self) -> None:
        self.document.insert(self.position, self.text)
        self.executed = True

    def undo(self) -> None:
        if self.executed:
            self.document.delete(self.position, len(self.text))
            self.executed = False

    def description(self) -> str:
        preview = self.text[:20] + "..." if len(self.text) > 20 else self.text
        return f"Insert '{preview}' at position {self.position}"


class DeleteCommand(Command):
    """Command to delete text from a position."""

    def __init__(self, document: TextDocument, position: int, length: int):
        self.document = document
        self.position = position
        self.length = length
        self.deleted_text: str = ""

    def execute(self) -> None:
        self.deleted_text = self.document.delete(self.position, self.length)

    def undo(self) -> None:
        if self.deleted_text:
            self.document.insert(self.position, self.deleted_text)

    def description(self) -> str:
        preview = self.deleted_text[:20] + "..." if len(self.deleted_text) > 20 else self.deleted_text
        return f"Delete '{preview}' from position {self.position}"


class ReplaceCommand(Command):
    """Command to replace text at a position."""

    def __init__(self, document: TextDocument, position: int, length: int, new_text: str):
        self.document = document
        self.position = position
        self.length = length
        self.new_text = new_text
        self.old_text: str = ""

    def execute(self) -> None:
        self.old_text = self.document.replace(self.position, self.length, self.new_text)

    def undo(self) -> None:
        self.document.replace(self.position, len(self.new_text), self.old_text)

    def description(self) -> str:
        return f"Replace '{self.old_text}' with '{self.new_text}'"


# ============================================================
# MACRO COMMAND - Composite Pattern Integration
# ============================================================

class MacroCommand(Command):
    """
    Composite command that executes multiple commands as one unit.
    Useful for "batch" operations or "macros".
    """

    def __init__(self, name: str, commands: List[Command] = None):
        self.name = name
        self.commands = commands or []

    def add(self, command: Command) -> 'MacroCommand':
        """Fluent interface for adding commands."""
        self.commands.append(command)
        return self

    def execute(self) -> None:
        """Execute all commands in order."""
        for command in self.commands:
            command.execute()

    def undo(self) -> None:
        """Undo all commands in reverse order."""
        for command in reversed(self.commands):
            command.undo()

    def description(self) -> str:
        return f"Macro '{self.name}' ({len(self.commands)} commands)"


# ============================================================
# CARETAKER - Manages command history
# ============================================================

@dataclass
class CommandRecord:
    """Record of an executed command with metadata."""
    command: Command
    timestamp: datetime = field(default_factory=datetime.now)


class CommandHistory:
    """
    Caretaker class that manages command history.
    Enables undo/redo functionality.
    """

    def __init__(self, max_size: int = 100):
        self._history: List[CommandRecord] = []
        self._redo_stack: List[CommandRecord] = []
        self._max_size = max_size

    def execute(self, command: Command) -> None:
        """Execute a command and add to history."""
        command.execute()
        record = CommandRecord(command=command)
        self._history.append(record)

        # Clear redo stack when new command is executed
        self._redo_stack.clear()

        # Limit history size
        if len(self._history) > self._max_size:
            self._history.pop(0)

        print(f"Executed: {command.description()}")

    def undo(self) -> bool:
        """Undo the last command."""
        if not self._history:
            print("Nothing to undo")
            return False

        record = self._history.pop()
        record.command.undo()
        self._redo_stack.append(record)
        print(f"Undone: {record.command.description()}")
        return True

    def redo(self) -> bool:
        """Redo the last undone command."""
        if not self._redo_stack:
            print("Nothing to redo")
            return False

        record = self._redo_stack.pop()
        record.command.execute()
        self._history.append(record)
        print(f"Redone: {record.command.description()}")
        return True

    def can_undo(self) -> bool:
        return len(self._history) > 0

    def can_redo(self) -> bool:
        return len(self._redo_stack) > 0

    def show_history(self) -> None:
        """Display command history for debugging."""
        print("\n=== Command History ===")
        for i, record in enumerate(self._history):
            print(f"  [{i}] {record.command.description()} @ {record.timestamp.strftime('%H:%M:%S')}")
        if self._redo_stack:
            print("--- Redo Stack ---")
            for record in self._redo_stack:
                print(f"  [R] {record.command.description()}")


# ============================================================
# INVOKER - Text Editor that uses commands
# ============================================================

class TextEditor:
    """
    Invoker class - provides high-level operations.
    All operations go through the command pattern.
    """

    def __init__(self):
        self.document = TextDocument()
        self.history = CommandHistory()
        self._cursor = 0

    def type_text(self, text: str) -> None:
        """Type text at current cursor position."""
        command = InsertCommand(self.document, self._cursor, text)
        self.history.execute(command)
        self._cursor += len(text)

    def delete_chars(self, count: int = 1) -> None:
        """Delete characters before cursor (like backspace)."""
        if self._cursor > 0:
            start = max(0, self._cursor - count)
            command = DeleteCommand(self.document, start, min(count, self._cursor))
            self.history.execute(command)
            self._cursor = start

    def select_and_replace(self, start: int, end: int, new_text: str) -> None:
        """Select a range and replace with new text."""
        command = ReplaceCommand(self.document, start, end - start, new_text)
        self.history.execute(command)
        self._cursor = start + len(new_text)

    def undo(self) -> None:
        """Undo last action."""
        self.history.undo()

    def redo(self) -> None:
        """Redo last undone action."""
        self.history.redo()

    def get_content(self) -> str:
        return self.document.content

    def __str__(self) -> str:
        return f"'{self.document.content}' (cursor: {self._cursor})"


# ============================================================
# USAGE EXAMPLE
# ============================================================

if __name__ == "__main__":
    editor = TextEditor()

    # Type some text
    editor.type_text("Hello")
    print(f"After typing 'Hello': {editor}")

    editor.type_text(" World")
    print(f"After typing ' World': {editor}")

    editor.type_text("!")
    print(f"After typing '!': {editor}")

    # Undo operations
    print("\n--- Undoing ---")
    editor.undo()  # Remove "!"
    print(f"After undo: {editor}")

    editor.undo()  # Remove " World"
    print(f"After undo: {editor}")

    # Redo
    print("\n--- Redoing ---")
    editor.redo()  # Restore " World"
    print(f"After redo: {editor}")

    # Replace operation
    print("\n--- Replace ---")
    editor.select_and_replace(0, 5, "Hi")
    print(f"After replace 'Hello' with 'Hi': {editor}")

    # Show history
    editor.history.show_history()

    # Macro command example
    print("\n--- Macro Example ---")
    editor2 = TextEditor()

    macro = MacroCommand("Add Greeting")
    macro.add(InsertCommand(editor2.document, 0, "Dear "))
    macro.add(InsertCommand(editor2.document, 5, "Customer"))
    macro.add(InsertCommand(editor2.document, 13, ",\n"))
    macro.add(InsertCommand(editor2.document, 15, "Welcome!"))

    editor2.history.execute(macro)
    print(f"After macro: '{editor2.document.content}'")

    editor2.undo()  # Undoes entire macro
    print(f"After undo macro: '{editor2.document.content}'")
```

---

## Command vs Strategy: Interview Question

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
  <div style="font-weight: 700; color: #1e293b; margin-bottom: 16px;">A Common Interview Question</div>
  <table style="width: 100%; border-collapse: collapse; color: #334155;">
    <thead>
      <tr style="background: #e2e8f0;">
        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Aspect</th>
        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Command</th>
        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Strategy</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Purpose</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Encapsulate a request/action</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Encapsulate an algorithm</td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>State</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Usually has state (parameters)</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Usually stateless</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Undo</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Supports undo/redo</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">No undo concept</td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Lifetime</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Created, executed, stored</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Swapped in/out at runtime</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Example</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">"Delete row 5"</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">"Sort using QuickSort"</td>
      </tr>
    </tbody>
  </table>
</div>

---

## Interview Questions

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q1: How would you implement transaction rollback using Command pattern?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> Use a composite command (MacroCommand) that stores multiple commands. Execute all commands in sequence. If any command fails, iterate through executed commands in reverse order and call undo(). Store previous state in each command to enable reversal.

```python
class Transaction:
    def __init__(self, commands: List[Command]):
        self.commands = commands
        self.executed = []

    def execute(self):
        try:
            for cmd in self.commands:
                cmd.execute()
                self.executed.append(cmd)
        except Exception as e:
            self.rollback()
            raise

    def rollback(self):
        for cmd in reversed(self.executed):
            cmd.undo()
        self.executed.clear()
```
</div>
</details>

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q2: How do you handle commands that cannot be undone?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> Create a marker interface or flag for irreversible commands. Options include:
1. Throw UnsupportedOperationException in undo()
2. Use Memento pattern to snapshot state before execution
3. Warn user before execution of irreversible commands
4. Implement "soft delete" where possible instead of hard delete
</div>
</details>

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q3: How would you serialize commands for distributed execution?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> Design commands to be serializable:
1. Store command type/name as string identifier
2. Store parameters as JSON-serializable data
3. Use a command registry to reconstruct commands
4. Include version numbers for backward compatibility

```python
@dataclass
class SerializableCommand:
    type: str
    params: dict
    version: int = 1

    def to_json(self) -> str:
        return json.dumps(asdict(self))

    @classmethod
    def from_json(cls, json_str: str) -> 'SerializableCommand':
        return cls(**json.loads(json_str))
```
</div>
</details>

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q4: What is the difference between Command and Event Sourcing?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong>
- <strong>Command:</strong> Represents intent ("CreateOrder"). May be rejected. Imperative.
- <strong>Event:</strong> Represents fact ("OrderCreated"). Already happened. Past tense.

Event Sourcing stores events as the source of truth. Commands are validated and if accepted, produce events. Commands can be replayed to rebuild state. Both use similar object structures but serve different purposes in the architecture.
</div>
</details>

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q5: Design a command queue system for a photo editing application.</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Key considerations:</strong>
1. Commands may be CPU-intensive (filters) - use async execution
2. Preview mode - execute temporarily without committing
3. Batch operations - apply same command to multiple images
4. Progressive rendering - show partial results
5. Memory management - large images require efficient state handling
6. Cancellation support - long operations need abort capability
</div>
</details>

---

## Best Practices

<div style="background: #dbeafe; border-radius: 12px; padding: 20px; margin: 20px 0;">
  <div style="font-weight: 700; color: #1e40af; margin-bottom: 12px;">Production Guidelines</div>
  <ol style="color: #334155; margin: 0; padding-left: 20px; line-height: 2;">
    <li><strong>Single Responsibility:</strong> Each command does one thing well</li>
    <li><strong>Store minimal state:</strong> Only what's needed for undo - avoid memory bloat</li>
    <li><strong>Validate before execute:</strong> Check preconditions in a canExecute() method</li>
    <li><strong>Handle failures gracefully:</strong> Partial execution should be recoverable</li>
    <li><strong>Consider serialization:</strong> Design for persistence if commands need to survive restarts</li>
    <li><strong>Add metadata:</strong> Timestamps, user IDs, correlation IDs for debugging</li>
    <li><strong>Limit history size:</strong> Prevent unbounded memory growth</li>
  </ol>
</div>

---

## Related Patterns

- [Memento](/topic/design-patterns/memento) - Store state snapshots for undo instead of reverse operations
- [Strategy](/topic/design-patterns/strategy) - Encapsulate algorithms vs actions
- [Chain of Responsibility](/topic/design-patterns/chain-of-responsibility) - Commands can form processing chains
- [Composite](/topic/design-patterns/composite) - MacroCommand uses Composite pattern
