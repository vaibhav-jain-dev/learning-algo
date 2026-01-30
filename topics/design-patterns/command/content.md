# Command Pattern

## Overview

The Command pattern encapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations. At its core, Command transforms method invocations into first-class objects that can be passed, stored, serialized, and manipulated independently of their execution context.

**Difficulty:** Intermediate to Advanced
**Category:** Behavioral Pattern
**Also Known As:** Action, Transaction, Operation

---

## Mental Model: The Restaurant Analogy

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #cbd5e1;">
<div style="font-size: 1.3rem; font-weight: 700; color: #1e293b; text-align: center; margin-bottom: 16px;">The Restaurant Order System</div>
<div style="color: #334155; font-size: 1rem; line-height: 1.7;">
    When you dine at a restaurant, you do not walk into the kitchen and instruct the chef directly. Instead, a waiter captures your request on an order slip, carries it to the kitchen, and hands it to the appropriate cook. That order slip IS the command object - it encapsulates everything about your request: what dish, how cooked, modifications. The waiter does not need culinary skills; the chef does not need to know who ordered. The order slip decouples the request from execution.
</div>
<div style="margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px;">
<div style="background: #dbeafe; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: 600;">Customer</div>
<div style="color: #3b82f6; font-size: 0.85rem;">Client (creates request)</div>
</div>
<div style="background: #dcfce7; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #166534; font-weight: 600;">Order Slip</div>
<div style="color: #22c55e; font-size: 0.85rem;">Command Object</div>
</div>
<div style="background: #fef3c7; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #92400e; font-weight: 600;">Waiter</div>
<div style="color: #f59e0b; font-size: 0.85rem;">Invoker (triggers execution)</div>
</div>
<div style="background: #fce7f3; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #9d174d; font-weight: 600;">Chef</div>
<div style="color: #ec4899; font-size: 0.85rem;">Receiver (does work)</div>
</div>
</div>
</div>

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0;">
<div style="font-weight: 700; color: #92400e; margin-bottom: 8px;">Expert Insight</div>
<div style="color: #78350f;">
<strong>Novice thinks:</strong> "Command is just wrapping a function call in an object."<br/><br/>
<strong>Expert knows:</strong> "Command transforms <em>imperative code into data</em>. Once an action becomes data, you can store it, transmit it, queue it, serialize it, replay it, and undo it. This is the foundation of event sourcing, transaction logs, CQRS, and distributed systems. The real power emerges when you realize commands become auditable, recoverable, and reproducible."
</div>
</div>

---

## Core Components Deep Dive

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; text-align: center; margin-bottom: 24px; font-size: 1.2rem;">Command Pattern Architecture</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
<div style="display: flex; justify-content: center; gap: 40px; flex-wrap: wrap;">
<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 160px;">
<div style="font-weight: 700; color: #1e40af; font-size: 1.1rem;">Client</div>
<div style="font-size: 0.8rem; color: #3b82f6; margin-top: 4px;">Creates and configures<br/>concrete commands</div>
</div>
<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 160px;">
<div style="font-weight: 700; color: #92400e; font-size: 1.1rem;">Invoker</div>
<div style="font-size: 0.8rem; color: #b45309; margin-top: 4px; font-family: monospace;">+ setCommand()<br/>+ invoke()<br/>+ history: Command[]</div>
</div>
</div>
<div style="color: #64748b; font-size: 1.5rem;">triggers</div>
<div style="background: #f1f5f9; border: 2px dashed #64748b; border-radius: 12px; padding: 16px 32px; text-align: center;">
<div style="font-weight: 600; color: #475569; font-style: italic;">Command (interface)</div>
<div style="font-size: 0.85rem; color: #64748b; margin-top: 8px; font-family: monospace;">+ execute(): void<br/>+ undo(): void<br/>+ canExecute(): bool</div>
</div>
<div style="color: #64748b; font-size: 1rem;">implements</div>
<div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; padding: 16px 32px; text-align: center;">
<div style="font-weight: 700; color: #166534; font-size: 1.1rem;">ConcreteCommand</div>
<div style="font-size: 0.8rem; color: #15803d; margin-top: 8px; font-family: monospace;">- receiver: Receiver<br/>- previousState: State<br/>+ execute() / undo()</div>
</div>
<div style="color: #64748b; font-size: 1rem;">delegates to</div>
<div style="background: #fce7f3; border: 2px solid #ec4899; border-radius: 12px; padding: 16px 32px; text-align: center;">
<div style="font-weight: 700; color: #9d174d; font-size: 1.1rem;">Receiver</div>
<div style="font-size: 0.8rem; color: #be185d; margin-top: 8px; font-family: monospace;">+ action()<br/>+ businessLogic()</div>
</div>
</div>
</div>

### Component Responsibilities

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
<table style="width: 100%; border-collapse: collapse; color: #334155;">
    <thead>
<tr style="background: #e2e8f0;">
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Component</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Responsibility</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Key Design Decisions</th>
</tr>
    </thead>
    <tbody>
<tr>
<td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Command</strong></td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Declares execution interface</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Should undo() be required? Should canExecute() exist?</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>ConcreteCommand</strong></td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Binds receiver to action, stores state for undo</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">How much state to capture? Snapshot vs delta?</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Invoker</strong></td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Manages command lifecycle, maintains history</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Queue vs stack? History limit? Persistence?</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Receiver</strong></td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Contains actual business logic</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Should it know about commands? Coupling trade-offs</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Client</strong></td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Creates and configures commands</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Factory pattern for command creation?</td>
</tr>
    </tbody>
</table>
</div>

---

## Critical Assumption Analysis

<div style="background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 8px; padding: 20px; margin: 20px 0;">
<div style="font-weight: 700; color: #991b1b; margin-bottom: 12px;">Hidden Assumptions That Can Break Your System</div>
<div style="color: #7f1d1d; line-height: 1.8;">
<strong>1. Reversibility Assumption:</strong> Not all operations are reversible. Sending an email, making an API call to a third party, or triggering a physical action cannot be undone. Your design must distinguish between reversible and irreversible commands.<br/><br/>
<strong>2. Idempotency Assumption:</strong> Commands may be retried (network failures, crashes). If execute() is called twice, will your system be in a valid state? Non-idempotent commands require careful deduplication logic.<br/><br/>
<strong>3. State Isolation Assumption:</strong> Commands assume they capture sufficient state for undo. But if external state changes between execute() and undo() (concurrent modifications), your undo may corrupt data.<br/><br/>
<strong>4. Atomicity Assumption:</strong> A single command is assumed to be atomic. But what if execute() partially completes before throwing? Without careful design, you leave the system in an inconsistent state.
</div>
</div>

---

## Undo/Redo Implementation Deep Dive

### The Two Approaches to Undo

<div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 16px; font-size: 1.1rem;">Approach 1: Reverse Operation (Delta-Based)</div>
<div style="color: #1e3a8a; line-height: 1.7;">
    Each command stores the minimal delta required to reverse itself. For example, a DeleteCommand stores the deleted text and its position. Undo re-inserts that text at that position.<br/><br/>
<strong>Pros:</strong> Memory efficient, fast undo/redo<br/>
<strong>Cons:</strong> Complex for operations with side effects, requires careful implementation<br/>
<strong>Best for:</strong> Text editors, drawing applications, simple CRUD operations
</div>
</div>

<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 24px; margin: 20px 0;">
<div style="font-weight: 700; color: #166534; margin-bottom: 16px; font-size: 1.1rem;">Approach 2: State Snapshot (Memento-Based)</div>
<div style="color: #14532d; line-height: 1.7;">
    Each command stores a complete snapshot of the affected state before execution. Undo restores the snapshot. Often implemented using the [[Memento Pattern]](/topics/design-patterns/memento).<br/><br/>
<strong>Pros:</strong> Simple to implement, handles complex state changes<br/>
<strong>Cons:</strong> Memory intensive, slow for large states<br/>
<strong>Best for:</strong> Game save states, complex document editing, database transactions
</div>
</div>

### Undo/Redo Stack Mechanics

```python
class UndoRedoManager:
    """
    Manages command history with proper undo/redo semantics.

    Key invariant: undo_stack contains executed commands,
    redo_stack contains undone commands waiting to be redone.

    CRITICAL EDGE CASE: When a new command is executed after undo,
    the redo stack must be cleared - you cannot redo operations
    that would conflict with the new state.
    """

    def __init__(self, max_history: int = 100):
        self._undo_stack: List[Command] = []
        self._redo_stack: List[Command] = []
        self._max_history = max_history
        self._is_undoing = False  # Prevents recursive history modification

    def execute(self, command: Command) -> bool:
        """
        Execute command and add to history.
        Returns False if command cannot be executed.
        """
        if not command.can_execute():
            return False

        try:
            command.execute()
        except CommandExecutionError as e:
            # Command failed - do not add to history
            self._handle_execution_failure(command, e)
            return False

        self._undo_stack.append(command)

        # CRITICAL: Clear redo stack on new action
        # This is the "branching timeline" problem - once you
        # take a new action after undo, the old future is lost
        self._redo_stack.clear()

        # Enforce history limit (prevent memory leak)
        while len(self._undo_stack) > self._max_history:
            discarded = self._undo_stack.pop(0)
            self._on_command_discarded(discarded)

        return True

    def undo(self) -> bool:
        """
        Undo the most recent command.

        Returns False if nothing to undo or undo fails.
        """
        if not self._undo_stack:
            return False

        command = self._undo_stack.pop()

        try:
            self._is_undoing = True
            command.undo()
        except UndoFailureError as e:
            # Undo failed - this is a serious problem
            # The system may be in an inconsistent state
            self._handle_undo_failure(command, e)
            # Re-add to undo stack since undo failed
            self._undo_stack.append(command)
            return False
        finally:
            self._is_undoing = False

        self._redo_stack.append(command)
        return True

    def redo(self) -> bool:
        """
        Redo the most recently undone command.

        IMPORTANT: redo() re-executes the command, which means
        any validation in execute() runs again. The command might
        fail if the system state has changed.
        """
        if not self._redo_stack:
            return False

        command = self._redo_stack.pop()

        # Re-check if command can still execute in current state
        if not command.can_execute():
            # State has changed - cannot redo
            return False

        try:
            command.execute()
        except CommandExecutionError:
            return False

        self._undo_stack.append(command)
        return True

    def _on_command_discarded(self, command: Command) -> None:
        """
        Called when a command is removed from history due to limit.
        Override to release resources held by the command.
        """
        if hasattr(command, 'release_resources'):
            command.release_resources()
```

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0;">
<div style="font-weight: 700; color: #92400e; margin-bottom: 8px;">Interview Trap: The Redo Invalidation Problem</div>
<div style="color: #78350f;">
    When you undo command A, then execute new command B, then try to redo A - what happens? The naive answer is "redo A". The correct answer is "A is no longer in the redo stack because B invalidated it." Executing B after undoing A creates a new timeline branch, and the old redo history must be discarded. This is why most applications clear the redo stack on any new action.
</div>
</div>

### Interview Questions: Undo/Redo

<details style="margin: 12px 0; padding: 16px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 8px; border: 1px solid #cbd5e1;">
  <summary style="font-weight: 700; color: #1e293b; cursor: pointer; font-size: 1.05rem;">Level 1: How do you implement undo/redo using the Command pattern?</summary>
<div style="margin-top: 16px; color: #334155; line-height: 1.8;">
<strong>Answer:</strong> Maintain two stacks - an undo stack for executed commands and a redo stack for undone commands. Each command implements execute() and undo() methods. On execute(), push to undo stack and clear redo stack. On undo(), pop from undo stack, call undo(), push to redo stack. On redo(), pop from redo stack, call execute(), push to undo stack.

    <details style="margin: 12px 0; padding: 12px; background: #f1f5f9; border-radius: 6px;">
      <summary style="font-weight: 600; color: #475569; cursor: pointer;">Level 2: What happens when undo() fails partway through? How do you maintain consistency?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> This is the "partial undo" problem. Solutions include:

        1. **Transactional undo**: Wrap undo in a try-catch, and if it fails, attempt to re-execute to restore state
        2. **Snapshot before undo**: Take a memento before undo, restore on failure
        3. **Two-phase undo**: First validate undo is possible (dry run), then execute
        4. **Compensation commands**: Generate a compensating command that will fix any partial state

        The safest approach is making undo operations atomic - design them so they either fully complete or fully fail without side effects.

        <details style="margin: 12px 0; padding: 12px; background: #e2e8f0; border-radius: 6px;">
          <summary style="font-weight: 600; color: #475569; cursor: pointer;">Level 3: How would you implement collaborative undo in a multi-user real-time editor where User A and User B can both undo their own actions?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> This requires Operational Transformation (OT) or Conflict-free Replicated Data Types (CRDTs). Key challenges:

            1. **Per-user undo stacks**: Each user has their own undo history, but all modify shared state
            2. **Transform on undo**: When User A undoes their action, the undo must be transformed against all operations User B made after A's original action
            3. **Causality tracking**: Use vector clocks or Lamport timestamps to establish happened-before relationships
            4. **Conflict resolution**: Define merge policies when undoing creates conflicts with concurrent edits

            Example: User A types "Hello" at position 0, User B types "World" at position 5. If A undoes, you must adjust B's operation to account for the removed text. Google Docs uses OT, while Figma uses CRDTs for this problem.

            Implementation requires:
            - Each command includes author ID and logical timestamp
            - Undo transforms the inverse operation against all subsequent operations from other users
            - The transformed undo is broadcast to all clients
</div>
        </details>
</div>
    </details>
</div>
</details>

<details style="margin: 12px 0; padding: 16px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 8px; border: 1px solid #cbd5e1;">
  <summary style="font-weight: 700; color: #1e293b; cursor: pointer; font-size: 1.05rem;">Level 1: How do you handle commands that cannot be undone?</summary>
<div style="margin-top: 16px; color: #334155; line-height: 1.8;">
<strong>Answer:</strong> Mark commands as irreversible and handle them specially:

    ```python
    class Command(ABC):
    @property
    def is_reversible(self) -> bool:
    return True  # Override to return False for irreversible commands
    ```

    For irreversible commands: warn user before execution, do not add to undo stack, or implement "soft" alternatives (soft delete instead of hard delete).

    <details style="margin: 12px 0; padding: 12px; background: #f1f5f9; border-radius: 6px;">
      <summary style="font-weight: 600; color: #475569; cursor: pointer;">Level 2: What if an irreversible command is in the middle of a macro? How do you undo the macro?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> Several strategies:

        1. **Block macro creation**: Prevent irreversible commands from being added to macros
        2. **Partial undo**: Undo everything before the irreversible command, mark the rest as "cannot undo"
        3. **Checkpoint macros**: Split macro at irreversible boundaries, warn user that undo will only go back to the checkpoint
        4. **Compensating actions**: For some "irreversible" operations, provide a compensating action (e.g., "unsend" email within time window)

        <details style="margin: 12px 0; padding: 12px; background: #e2e8f0; border-radius: 6px;">
          <summary style="font-weight: 600; color: #475569; cursor: pointer;">Level 3: Design an undo system for a payment processing application where some commands trigger external API calls</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> This requires the [[Saga Pattern]](/topics/design-patterns/saga) combined with Command:

            1. **Two-phase commands**: Separate "prepare" (reversible, local) from "commit" (irreversible, external)
            2. **Compensation over reversal**: Instead of undoing a payment, issue a refund command
            3. **Eventual consistency**: Accept that undo may not be immediate - use async compensation
            4. **Audit trail**: Log all commands and their compensation status for reconciliation

            Architecture:
            ```
            PaymentCommand:
            - execute(): create local pending record, call payment API
            - undo(): if pending, cancel; if completed, queue RefundCommand
            - compensation: RefundCommand with correlation ID

            RefundCommand:
            - execute(): call refund API, mark original as refunded
            - undo(): cannot undo a refund (business rule)
            ```

            Critical considerations:
            - Idempotency keys for API calls
            - Timeout handling (what if API call hangs?)
            - State machine for payment lifecycle (pending -> completed -> refunding -> refunded)
            - Dead letter queue for failed compensations
</div>
        </details>
</div>
    </details>
</div>
</details>

---

## Macro Commands (Composite Commands)

Macro commands combine multiple commands into a single unit that can be executed, undone, and redone atomically. This implements the [[Composite Pattern]](/topics/design-patterns/composite) within the Command pattern.

### Macro Command Architecture

```python
from typing import List, Optional, Callable
from enum import Enum, auto


class ExecutionPolicy(Enum):
    """Defines how macro handles failures"""
    STOP_ON_FAILURE = auto()      # Stop and rollback on first failure
    CONTINUE_ON_FAILURE = auto()  # Skip failed commands, continue others
    ALL_OR_NOTHING = auto()       # Validate all first, then execute


class MacroCommand(Command):
    """
    Composite command that executes multiple commands as one unit.

    Design decisions:
    - Commands execute in order (use PriorityMacro for priority-based)
    - Undo happens in reverse order
    - Failure policy determines rollback behavior
    """

    def __init__(
        self,
        name: str,
        commands: Optional[List[Command]] = None,
        execution_policy: ExecutionPolicy = ExecutionPolicy.STOP_ON_FAILURE
    ):
        self.name = name
        self._commands: List[Command] = commands or []
        self._executed: List[Command] = []
        self._policy = execution_policy

    def add(self, command: Command) -> 'MacroCommand':
        """Fluent interface for building macros"""
        self._commands.append(command)
        return self

    def can_execute(self) -> bool:
        """
        Check if macro can execute.
        For ALL_OR_NOTHING policy, all commands must be executable.
        """
        if self._policy == ExecutionPolicy.ALL_OR_NOTHING:
            return all(cmd.can_execute() for cmd in self._commands)
        return len(self._commands) > 0

    def execute(self) -> None:
        """
        Execute all commands according to policy.

        CRITICAL: Track which commands were executed for proper undo.
        """
        self._executed.clear()

        for command in self._commands:
            try:
                if not command.can_execute():
                    if self._policy == ExecutionPolicy.STOP_ON_FAILURE:
                        raise MacroExecutionError(f"Command cannot execute: {command}")
                    continue

                command.execute()
                self._executed.append(command)

            except Exception as e:
                if self._policy == ExecutionPolicy.STOP_ON_FAILURE:
                    # Rollback all executed commands
                    self._rollback()
                    raise MacroExecutionError(f"Macro failed: {e}") from e
                elif self._policy == ExecutionPolicy.ALL_OR_NOTHING:
                    self._rollback()
                    raise
                # CONTINUE_ON_FAILURE: log and continue

    def undo(self) -> None:
        """
        Undo executed commands in reverse order.

        IMPORTANT: Only undo commands that were actually executed,
        not all commands in the macro definition.
        """
        for command in reversed(self._executed):
            try:
                command.undo()
            except UndoFailureError:
                # Log but continue - best effort undo
                pass
        self._executed.clear()

    def _rollback(self) -> None:
        """Internal rollback for failure recovery"""
        for command in reversed(self._executed):
            try:
                command.undo()
            except:
                pass  # Best effort during rollback
        self._executed.clear()


class RecordingMacro(MacroCommand):
    """
    Macro that records commands as they are executed elsewhere.
    Used for "record macro" functionality in editors.
    """

    def __init__(self, name: str):
        super().__init__(name)
        self._is_recording = False

    def start_recording(self) -> None:
        self._is_recording = True
        self._commands.clear()

    def stop_recording(self) -> None:
        self._is_recording = False

    def record(self, command: Command) -> None:
        """Called by invoker after each command execution during recording"""
        if self._is_recording:
            # Store a copy/clone if command is mutable
            self._commands.append(command.clone() if hasattr(command, 'clone') else command)
```

### Interview Questions: Macro Commands

<details style="margin: 12px 0; padding: 16px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 8px; border: 1px solid #cbd5e1;">
  <summary style="font-weight: 700; color: #1e293b; cursor: pointer; font-size: 1.05rem;">Level 1: How does a MacroCommand differ from simply calling multiple commands in sequence?</summary>
<div style="margin-top: 16px; color: #334155; line-height: 1.8;">
<strong>Answer:</strong> A MacroCommand provides:

    1. **Atomic undo**: All commands undo as one unit
    2. **Single history entry**: One undo step instead of many
    3. **Encapsulation**: Client sees one command, not implementation details
    4. **Reusability**: Save and replay the macro
    5. **Failure handling**: Coordinated rollback on failure

    Without MacroCommand, undoing 10 sequential commands requires 10 undo operations, and partial failure handling is ad-hoc.

    <details style="margin: 12px 0; padding: 12px; background: #f1f5f9; border-radius: 6px;">
      <summary style="font-weight: 600; color: #475569; cursor: pointer;">Level 2: How do you handle commands in a macro that depend on the results of previous commands?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> Several approaches:

        1. **Lazy parameter resolution**: Commands take suppliers/callbacks instead of values
        ```python
        class DependentCommand(Command):
        def __init__(self, value_supplier: Callable[[], Any]):
        self._get_value = value_supplier

        def execute(self):
        value = self._get_value()  # Resolved at execution time
        ```

        2. **Shared context object**: Commands read/write to a shared context
        ```python
        class MacroContext:
        def __init__(self):
        self.results = {}

        # Commands access context.results["previous_command_key"]
        ```

        3. **Command chaining**: Commands explicitly link to predecessors

        <details style="margin: 12px 0; padding: 12px; background: #e2e8f0; border-radius: 6px;">
          <summary style="font-weight: 600; color: #475569; cursor: pointer;">Level 3: Design a macro system that supports conditional execution, loops, and branching based on command results</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> This essentially becomes a domain-specific workflow engine:

            ```python
            class ConditionalCommand(Command):
            def __init__(self, condition: Callable[[], bool],
            if_true: Command, if_false: Optional[Command] = None):
            self._condition = condition
            self._if_true = if_true
            self._if_false = if_false
            self._executed_branch: Optional[Command] = None

            def execute(self):
            if self._condition():
            self._if_true.execute()
            self._executed_branch = self._if_true
            elif self._if_false:
            self._if_false.execute()
            self._executed_branch = self._if_false

            def undo(self):
            if self._executed_branch:
            self._executed_branch.undo()


            class LoopCommand(Command):
            def __init__(self, condition: Callable[[], bool],
            body: Command, max_iterations: int = 1000):
            self._condition = condition
            self._body = body
            self._max_iterations = max_iterations
            self._iterations_executed: List[Command] = []

            def execute(self):
            iterations = 0
            while self._condition() and iterations < self._max_iterations:
            # Clone body for each iteration to preserve undo state
            iteration_cmd = self._body.clone()
            iteration_cmd.execute()
            self._iterations_executed.append(iteration_cmd)
            iterations += 1

            def undo(self):
            for cmd in reversed(self._iterations_executed):
            cmd.undo()
            self._iterations_executed.clear()
            ```

            Key design considerations:
            - **Undo complexity**: Each loop iteration needs independent undo state
            - **Infinite loop protection**: Max iteration limit
            - **Early exit**: Support break/continue semantics
            - **State isolation**: Each iteration may need its own context
            - **Memory**: Long loops create many command objects

            This pattern is used in workflow engines like Temporal, Cadence, and business process automation tools.
</div>
        </details>
</div>
    </details>
</div>
</details>

---

## Command Queuing and Scheduling

Command queuing decouples command creation from execution, enabling deferred processing, rate limiting, prioritization, and retry logic.

### Queue Architecture

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; text-align: center; margin-bottom: 20px; font-size: 1.1rem;">Command Queue Flow</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
<div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; align-items: center;">
<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="font-weight: 600; color: #1e40af;">Producer</div>
<div style="font-size: 0.75rem; color: #3b82f6;">Creates commands</div>
</div>
<div style="color: #64748b; font-size: 1.5rem;">enqueue</div>
<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 12px 20px; text-align: center; min-width: 120px;">
<div style="font-weight: 600; color: #92400e;">Queue</div>
<div style="font-size: 0.75rem; color: #b45309;">Priority + Scheduling</div>
</div>
<div style="color: #64748b; font-size: 1.5rem;">dequeue</div>
<div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 8px; padding: 12px 20px; text-align: center;">
<div style="font-weight: 600; color: #166534;">Worker</div>
<div style="font-size: 0.75rem; color: #15803d;">Executes commands</div>
</div>
</div>
<div style="display: flex; gap: 60px; margin-top: 12px; flex-wrap: wrap; justify-content: center;">
<div style="background: #fee2e2; border: 1px solid #fca5a5; border-radius: 6px; padding: 8px 12px; font-size: 0.8rem; color: #991b1b;">Dead Letter Queue</div>
<div style="background: #e0e7ff; border: 1px solid #a5b4fc; border-radius: 6px; padding: 8px 12px; font-size: 0.8rem; color: #3730a3;">Retry Queue</div>
<div style="background: #f3e8ff; border: 1px solid #d8b4fe; border-radius: 6px; padding: 8px 12px; font-size: 0.8rem; color: #6b21a8;">Scheduled Queue</div>
</div>
</div>
</div>

```python
import heapq
import threading
import time
from dataclasses import dataclass, field
from typing import Optional, Callable
from datetime import datetime, timedelta
from enum import IntEnum


class Priority(IntEnum):
    LOW = 30
    NORMAL = 20
    HIGH = 10
    CRITICAL = 0


@dataclass(order=True)
class QueuedCommand:
    """Wrapper for queued commands with metadata"""
    priority: int
    scheduled_time: float
    command: Command = field(compare=False)
    retry_count: int = field(default=0, compare=False)
    max_retries: int = field(default=3, compare=False)
    created_at: datetime = field(default_factory=datetime.now, compare=False)
    correlation_id: str = field(default="", compare=False)


class CommandQueue:
    """
    Priority queue with scheduling, retry, and dead letter support.

    Thread-safe implementation for concurrent producers/consumers.

    Design decisions:
    - Priority queue (heapq) for O(log n) insert/remove
    - Scheduled commands wait until their time
    - Failed commands go to retry queue with exponential backoff
    - Commands exceeding max retries go to dead letter queue
    """

    def __init__(
        self,
        max_size: int = 10000,
        on_dead_letter: Optional[Callable[[QueuedCommand, Exception], None]] = None
    ):
        self._queue: List[QueuedCommand] = []
        self._dead_letter: List[tuple[QueuedCommand, Exception]] = []
        self._lock = threading.RLock()
        self._not_empty = threading.Condition(self._lock)
        self._max_size = max_size
        self._on_dead_letter = on_dead_letter
        self._running = True

    def enqueue(
        self,
        command: Command,
        priority: Priority = Priority.NORMAL,
        delay: Optional[timedelta] = None,
        correlation_id: str = ""
    ) -> bool:
        """
        Add command to queue.

        Returns False if queue is full.
        """
        with self._lock:
            if len(self._queue) >= self._max_size:
                return False

            scheduled_time = time.time()
            if delay:
                scheduled_time += delay.total_seconds()

            queued = QueuedCommand(
                priority=priority,
                scheduled_time=scheduled_time,
                command=command,
                correlation_id=correlation_id
            )

            heapq.heappush(self._queue, queued)
            self._not_empty.notify()
            return True

    def dequeue(self, timeout: Optional[float] = None) -> Optional[QueuedCommand]:
        """
        Get next command to execute.

        Blocks until a command is available and its scheduled time has passed.
        Returns None on timeout or shutdown.
        """
        deadline = time.time() + timeout if timeout else None

        with self._not_empty:
            while self._running:
                if not self._queue:
                    # Wait for commands
                    remaining = deadline - time.time() if deadline else None
                    if remaining is not None and remaining <= 0:
                        return None
                    self._not_empty.wait(remaining)
                    continue

                # Peek at highest priority command
                queued = self._queue[0]
                now = time.time()

                if queued.scheduled_time <= now:
                    # Ready to execute
                    return heapq.heappop(self._queue)

                # Wait until scheduled time or timeout
                wait_time = queued.scheduled_time - now
                if deadline:
                    wait_time = min(wait_time, deadline - now)

                if wait_time > 0:
                    self._not_empty.wait(wait_time)

            return None

    def retry(self, queued: QueuedCommand, error: Exception) -> bool:
        """
        Retry a failed command with exponential backoff.

        Returns False if max retries exceeded (sent to dead letter).
        """
        queued.retry_count += 1

        if queued.retry_count > queued.max_retries:
            self._send_to_dead_letter(queued, error)
            return False

        # Exponential backoff: 1s, 2s, 4s, 8s...
        backoff = 2 ** (queued.retry_count - 1)
        queued.scheduled_time = time.time() + backoff

        with self._lock:
            heapq.heappush(self._queue, queued)
            self._not_empty.notify()

        return True

    def _send_to_dead_letter(self, queued: QueuedCommand, error: Exception) -> None:
        """Handle commands that have exhausted retries"""
        with self._lock:
            self._dead_letter.append((queued, error))

        if self._on_dead_letter:
            self._on_dead_letter(queued, error)


class CommandWorker:
    """
    Worker that processes commands from queue.

    Can run multiple workers for parallel processing.
    """

    def __init__(self, queue: CommandQueue, worker_id: str = "worker-1"):
        self._queue = queue
        self._worker_id = worker_id
        self._running = False
        self._thread: Optional[threading.Thread] = None

    def start(self) -> None:
        self._running = True
        self._thread = threading.Thread(target=self._process_loop, daemon=True)
        self._thread.start()

    def stop(self) -> None:
        self._running = False

    def _process_loop(self) -> None:
        while self._running:
            queued = self._queue.dequeue(timeout=1.0)
            if queued is None:
                continue

            try:
                queued.command.execute()
            except Exception as e:
                self._queue.retry(queued, e)
```

### Interview Questions: Command Queuing

<details style="margin: 12px 0; padding: 16px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 8px; border: 1px solid #cbd5e1;">
  <summary style="font-weight: 700; color: #1e293b; cursor: pointer; font-size: 1.05rem;">Level 1: Why use a command queue instead of executing commands immediately?</summary>
<div style="margin-top: 16px; color: #334155; line-height: 1.8;">
<strong>Answer:</strong> Command queuing provides:

    1. **Decoupling**: Producers and consumers work independently
    2. **Load leveling**: Smooth out traffic spikes
    3. **Retry logic**: Automatic retry with backoff on failure
    4. **Scheduling**: Execute commands at specific times
    5. **Prioritization**: Critical commands execute first
    6. **Scalability**: Add more workers without changing producers
    7. **Resilience**: Commands survive process restarts (if persisted)

    <details style="margin: 12px 0; padding: 12px; background: #f1f5f9; border-radius: 6px;">
      <summary style="font-weight: 600; color: #475569; cursor: pointer;">Level 2: How do you ensure exactly-once execution of queued commands in a distributed system?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> Exactly-once is impossible in distributed systems, but you can achieve effectively-once through:

        1. **Idempotency keys**: Each command has a unique ID; receivers track processed IDs
        2. **Deduplication window**: Store recent command IDs in cache (Redis) for deduplication
        3. **Transactional outbox**: Write command to database in same transaction as business logic, separate process publishes
        4. **At-least-once + idempotent handlers**: Accept duplicates but make handlers idempotent

        ```python
        class IdempotentCommandHandler:
        def __init__(self, dedup_cache: Redis):
        self._cache = dedup_cache

        def handle(self, command: Command) -> bool:
        # Check if already processed
        if self._cache.exists(command.idempotency_key):
        return False  # Already processed

        # Process command
        command.execute()

        # Mark as processed (with TTL for cache cleanup)
        self._cache.setex(command.idempotency_key, 86400, "processed")
        return True
        ```

        <details style="margin: 12px 0; padding: 12px; background: #e2e8f0; border-radius: 6px;">
          <summary style="font-weight: 600; color: #475569; cursor: pointer;">Level 3: Design a command queue system that maintains ordering guarantees while allowing parallel processing for unrelated commands</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> This requires partitioned ordering - order within a partition, parallelism across partitions:

            ```python
            class PartitionedCommandQueue:
            """
            Commands with same partition key execute in order.
            Commands with different keys can execute in parallel.

            Example: Order commands for same customer_id must be ordered,
            but orders for different customers can be parallel.
            """

            def __init__(self, num_partitions: int = 16):
            self._partitions: Dict[int, Queue] = {
            i: Queue() for i in range(num_partitions)
            }
            self._workers: List[PartitionWorker] = []

            def enqueue(self, command: Command, partition_key: str) -> None:
            # Consistent hash to partition
            partition_id = hash(partition_key) % len(self._partitions)
            self._partitions[partition_id].put(command)

            def start_workers(self, workers_per_partition: int = 1) -> None:
            # Each partition has dedicated workers
            # Workers within same partition process sequentially
            for partition_id, queue in self._partitions.items():
            worker = PartitionWorker(queue, partition_id)
            worker.start()
            self._workers.append(worker)
            ```

            Advanced considerations:
            - **Sticky sessions**: Route related commands to same partition
            - **Partition rebalancing**: Handle worker failures without losing ordering
            - **Head-of-line blocking**: One slow command blocks entire partition
            - **Dynamic partitioning**: Adjust partitions based on load

            This pattern is used by Kafka (partition ordering), SQS FIFO (message group ID), and Azure Service Bus (sessions).
</div>
        </details>
</div>
    </details>
</div>
</details>

---

## Transaction Scripts with Command Pattern

Transaction scripts combine the Command pattern with [[ACID properties]](/topics/databases/acid) to provide database-like transaction semantics for business operations.

### Transaction Command Architecture

```python
from contextlib import contextmanager
from typing import TypeVar, Generic
from enum import Enum, auto


class TransactionState(Enum):
    PENDING = auto()
    EXECUTING = auto()
    COMMITTED = auto()
    ROLLED_BACK = auto()
    FAILED = auto()


T = TypeVar('T')


class TransactionCommand(Command, Generic[T]):
    """
    Command with explicit transaction lifecycle.

    Implements two-phase commit pattern:
    1. prepare(): Validate and acquire resources
    2. execute(): Perform the operation
    3. commit(): Make changes permanent
    4. rollback(): Revert on failure

    This separates validation from execution, allowing
    pre-flight checks before any state changes.
    """

    def __init__(self):
        self._state = TransactionState.PENDING
        self._result: Optional[T] = None
        self._savepoint: Optional[Any] = None

    @property
    def state(self) -> TransactionState:
        return self._state

    def prepare(self) -> bool:
        """
        Validate command can execute and acquire necessary locks.

        Returns False if command cannot proceed.
        No state changes should occur here.
        """
        raise NotImplementedError

    def execute(self) -> T:
        """
        Perform the operation. May be called only after prepare().

        State changes happen here but are not yet permanent.
        """
        raise NotImplementedError

    def commit(self) -> None:
        """
        Make changes permanent. Called after successful execute().

        After commit, rollback is no longer possible.
        """
        raise NotImplementedError

    def rollback(self) -> None:
        """
        Revert any changes made during execute().

        Must restore system to pre-execute state.
        """
        raise NotImplementedError

    def undo(self) -> None:
        """Alias for rollback in Command interface"""
        self.rollback()


class TransactionManager:
    """
    Coordinates transaction lifecycle for multiple commands.

    Implements the Saga pattern for distributed transactions
    where commands may affect different services/databases.
    """

    def __init__(self):
        self._commands: List[TransactionCommand] = []
        self._executed: List[TransactionCommand] = []

    @contextmanager
    def transaction(self):
        """
        Context manager for transaction scope.

        Usage:
            with manager.transaction():
                manager.add(command1)
                manager.add(command2)
            # Auto-commits on success, rollbacks on exception
        """
        try:
            yield self
            self.commit_all()
        except Exception as e:
            self.rollback_all()
            raise TransactionError(f"Transaction failed: {e}") from e
        finally:
            self._commands.clear()
            self._executed.clear()

    def add(self, command: TransactionCommand) -> None:
        """Add command to current transaction"""
        self._commands.append(command)

    def commit_all(self) -> None:
        """
        Two-phase commit across all commands.

        Phase 1: Prepare all (vote)
        Phase 2: Execute and commit all

        If any prepare fails, no commands execute.
        If any execute fails, all executed commands rollback.
        """
        # Phase 1: Prepare
        for command in self._commands:
            if not command.prepare():
                raise TransactionError(f"Prepare failed for {command}")

        # Phase 2: Execute
        try:
            for command in self._commands:
                command.execute()
                self._executed.append(command)

            # Phase 3: Commit
            for command in self._executed:
                command.commit()

        except Exception as e:
            self.rollback_all()
            raise

    def rollback_all(self) -> None:
        """Rollback all executed commands in reverse order"""
        for command in reversed(self._executed):
            try:
                command.rollback()
            except Exception as rollback_error:
                # Log but continue - best effort rollback
                pass
        self._executed.clear()


# Practical example: Bank transfer transaction
class TransferFundsCommand(TransactionCommand[str]):
    """
    Transfer funds between accounts with full transaction support.

    Demonstrates:
    - Prepare phase validates balances and acquires locks
    - Execute phase performs the transfer
    - Commit phase releases locks and confirms
    - Rollback phase reverses the transfer
    """

    def __init__(
        self,
        from_account: BankAccount,
        to_account: BankAccount,
        amount: Decimal,
        lock_manager: LockManager
    ):
        super().__init__()
        self._from = from_account
        self._to = to_account
        self._amount = amount
        self._lock_manager = lock_manager
        self._locks_held: List[Lock] = []
        self._transfer_id: Optional[str] = None

    def prepare(self) -> bool:
        """
        Validate and acquire locks.

        IMPORTANT: Acquire locks in consistent order (by account ID)
        to prevent deadlocks when multiple transfers run concurrently.
        """
        # Order accounts to prevent deadlock
        accounts = sorted([self._from, self._to], key=lambda a: a.id)

        # Acquire locks
        for account in accounts:
            lock = self._lock_manager.acquire(account.id, timeout=5.0)
            if not lock:
                self._release_locks()
                return False
            self._locks_held.append(lock)

        # Validate balance
        if self._from.balance < self._amount:
            self._release_locks()
            return False

        self._state = TransactionState.EXECUTING
        return True

    def execute(self) -> str:
        """Perform the transfer"""
        self._from.balance -= self._amount
        self._to.balance += self._amount
        self._transfer_id = generate_transfer_id()
        self._result = self._transfer_id
        return self._transfer_id

    def commit(self) -> None:
        """Finalize and release locks"""
        self._from.save()
        self._to.save()
        self._release_locks()
        self._state = TransactionState.COMMITTED

    def rollback(self) -> None:
        """Reverse the transfer"""
        if self._state == TransactionState.EXECUTING:
            self._from.balance += self._amount
            self._to.balance -= self._amount
        self._release_locks()
        self._state = TransactionState.ROLLED_BACK

    def _release_locks(self) -> None:
        for lock in self._locks_held:
            lock.release()
        self._locks_held.clear()
```

### Interview Questions: Transaction Scripts

<details style="margin: 12px 0; padding: 16px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 8px; border: 1px solid #cbd5e1;">
  <summary style="font-weight: 700; color: #1e293b; cursor: pointer; font-size: 1.05rem;">Level 1: How does the Command pattern enable transaction-like behavior without a database?</summary>
<div style="margin-top: 16px; color: #334155; line-height: 1.8;">
<strong>Answer:</strong> Command pattern provides transaction semantics through:

    1. **Atomicity**: MacroCommand groups operations; all succeed or all fail via rollback
    2. **Consistency**: canExecute() validates invariants before execution
    3. **Isolation**: Lock acquisition in prepare() prevents concurrent modifications
    4. **Durability**: Command serialization allows persistence and recovery

    The key is that each command captures enough state to reverse itself, and the transaction manager coordinates multiple commands.

    <details style="margin: 12px 0; padding: 12px; background: #f1f5f9; border-radius: 6px;">
      <summary style="font-weight: 600; color: #475569; cursor: pointer;">Level 2: How do you handle long-running transactions that span multiple services?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> Use the [[Saga Pattern]](/topics/design-patterns/saga) instead of traditional transactions:

        1. **Choreography**: Each service publishes events, others react
        2. **Orchestration**: Central coordinator tells each service what to do

        Each step has a compensating action. If step N fails, execute compensations for steps N-1 to 1 in reverse.

        ```python
        class SagaStep:
        def __init__(self, action: Command, compensation: Command):
        self.action = action
        self.compensation = compensation


        class Saga:
        def __init__(self, steps: List[SagaStep]):
        self._steps = steps
        self._completed_steps: List[SagaStep] = []

        async def execute(self) -> None:
        for step in self._steps:
        try:
        await step.action.execute()
        self._completed_steps.append(step)
        except Exception:
        await self._compensate()
        raise

        async def _compensate(self) -> None:
        for step in reversed(self._completed_steps):
        await step.compensation.execute()
        ```

        <details style="margin: 12px 0; padding: 12px; background: #e2e8f0; border-radius: 6px;">
          <summary style="font-weight: 600; color: #475569; cursor: pointer;">Level 3: Design a transaction system that handles the case where compensation itself fails</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> This is the "compensation failure" problem, one of the hardest distributed systems challenges:

            **Strategy 1: Retry with exponential backoff**
            ```python
            async def compensate_with_retry(step: SagaStep, max_retries: int = 5):
            for attempt in range(max_retries):
            try:
            await step.compensation.execute()
            return
            except Exception:
            await asyncio.sleep(2 ** attempt)

            # Exhausted retries - escalate
            await send_to_manual_resolution_queue(step)
            ```

            **Strategy 2: Idempotent compensations with state machine**
            ```python
            class CompensationState(Enum):
            PENDING = auto()
            COMPENSATING = auto()
            COMPENSATED = auto()
            FAILED = auto()

            # Store compensation state in durable storage
            # Background worker retries PENDING/COMPENSATING indefinitely
            ```

            **Strategy 3: Human-in-the-loop escalation**
            - After N retries, create a ticket for manual resolution
            - Provide operator with context and suggested actions
            - Log everything for forensics

            **Strategy 4: Semantic locking**
            - Mark the affected resource as "in-compensation"
            - Block other operations until compensation succeeds
            - Eventually consistent - system heals itself

            Critical requirements:
            - All compensations must be idempotent
            - Persistent state tracking for compensations
            - Alerting and monitoring for stuck compensations
            - Clear SLA for manual resolution

            This is why companies like Uber built custom saga frameworks (Cadence, now Temporal) with built-in compensation handling.
</div>
        </details>
</div>
    </details>
</div>
</details>

---

## Command Pattern vs Related Patterns

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
<table style="width: 100%; border-collapse: collapse; color: #334155; font-size: 0.95rem;">
    <thead>
<tr style="background: #e2e8f0;">
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Aspect</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Command</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">[[Strategy]](/topics/design-patterns/strategy)</th>
<th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">[[Memento]](/topics/design-patterns/memento)</th>
</tr>
    </thead>
    <tbody>
<tr>
<td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Purpose</strong></td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Encapsulate request as object</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Encapsulate algorithm</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Capture and restore state</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>State</strong></td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Contains parameters + receiver</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Usually stateless</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Contains full state snapshot</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Undo</strong></td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Via reverse operation</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">No undo concept</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Via state restoration</td>
</tr>
<tr style="background: #f8fafc;">
<td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Lifetime</strong></td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Created, executed, potentially stored</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Swapped at runtime</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Created, stored, restored</td>
</tr>
<tr>
<td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Use with</strong></td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Undo, queuing, logging</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Algorithm selection</td>
<td style="padding: 12px; border: 1px solid #cbd5e1;">Checkpoints, save/load</td>
</tr>
    </tbody>
</table>
</div>

<div style="background: #dbeafe; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 20px; margin: 20px 0;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 8px;">Command + Memento Hybrid</div>
<div style="color: #1e3a8a; line-height: 1.7;">
    For complex undo scenarios, combine both patterns: Command defines <em>what</em> to do and <em>how</em> to reverse it, while Memento captures the <em>before state</em> for when reverse operations are too complex or risky. This is common in game engines where "undo" restores a checkpoint rather than reversing each action.
</div>
</div>

---

## Real-World Implementation: Full Text Editor

```python
"""
Production-ready text editor implementation demonstrating:
- Undo/redo with history limit
- Macro recording and playback
- Command serialization for persistence
- Selection-aware commands
- Clipboard integration
"""

from abc import ABC, abstractmethod
from dataclasses import dataclass, field, asdict
from typing import List, Optional, Tuple, Dict, Any
from datetime import datetime
import json
from copy import deepcopy


# ============================================================
# DOCUMENT MODEL
# ============================================================

@dataclass
class Selection:
    """Represents a text selection (cursor position if start == end)"""
    start: int
    end: int

    @property
    def is_cursor(self) -> bool:
        return self.start == self.end

    @property
    def length(self) -> int:
        return self.end - self.start

    def normalize(self) -> 'Selection':
        """Ensure start <= end"""
        return Selection(min(self.start, self.end), max(self.start, self.end))


@dataclass
class Document:
    """
    Text document with selection tracking.
    This is the Receiver in Command pattern terminology.
    """
    content: str = ""
    selection: Selection = field(default_factory=lambda: Selection(0, 0))

    def insert_at(self, position: int, text: str) -> None:
        self.content = self.content[:position] + text + self.content[position:]

    def delete_range(self, start: int, end: int) -> str:
        deleted = self.content[start:end]
        self.content = self.content[:start] + self.content[end:]
        return deleted

    def get_range(self, start: int, end: int) -> str:
        return self.content[start:end]


# ============================================================
# COMMAND INTERFACE
# ============================================================

class EditorCommand(ABC):
    """
    Base command for editor operations.

    Design decisions:
    - Commands are immutable after creation (parameters fixed)
    - Undo state is captured during execute(), not at creation
    - Serializable for persistence and replay
    """

    @abstractmethod
    def execute(self, doc: Document) -> None:
        """Execute the command on the document"""
        pass

    @abstractmethod
    def undo(self, doc: Document) -> None:
        """Reverse the command effect"""
        pass

    @property
    @abstractmethod
    def description(self) -> str:
        """Human-readable description for UI"""
        pass

    @property
    def is_mergeable(self) -> bool:
        """Can this command be merged with the previous one?"""
        return False

    def merge_with(self, previous: 'EditorCommand') -> Optional['EditorCommand']:
        """Attempt to merge with previous command. Return merged or None."""
        return None

    def to_dict(self) -> Dict[str, Any]:
        """Serialize for persistence"""
        return {
            'type': self.__class__.__name__,
            'data': self._serialize_data()
        }

    @abstractmethod
    def _serialize_data(self) -> Dict[str, Any]:
        pass


# ============================================================
# CONCRETE COMMANDS
# ============================================================

class InsertTextCommand(EditorCommand):
    """
    Insert text at current selection.

    If there's a selection, it's replaced (delete + insert).
    Supports merging consecutive character insertions into one undo step.
    """

    def __init__(self, text: str, position: Optional[int] = None):
        self._text = text
        self._position = position  # None means use current selection
        self._deleted_text: str = ""
        self._original_selection: Optional[Selection] = None
        self._executed_position: int = 0

    def execute(self, doc: Document) -> None:
        self._original_selection = deepcopy(doc.selection)
        sel = doc.selection.normalize()

        # Determine insertion position
        self._executed_position = self._position if self._position is not None else sel.start

        # Delete selected text first (if any)
        if sel.length > 0:
            self._deleted_text = doc.delete_range(sel.start, sel.end)
            self._executed_position = sel.start

        # Insert new text
        doc.insert_at(self._executed_position, self._text)

        # Move cursor to end of inserted text
        new_pos = self._executed_position + len(self._text)
        doc.selection = Selection(new_pos, new_pos)

    def undo(self, doc: Document) -> None:
        # Remove inserted text
        doc.delete_range(self._executed_position,
                        self._executed_position + len(self._text))

        # Restore deleted text (if any)
        if self._deleted_text:
            doc.insert_at(self._executed_position, self._deleted_text)

        # Restore original selection
        if self._original_selection:
            doc.selection = self._original_selection

    @property
    def description(self) -> str:
        preview = self._text[:20] + "..." if len(self._text) > 20 else self._text
        return f'Type "{preview}"'

    @property
    def is_mergeable(self) -> bool:
        # Single characters can be merged for better undo experience
        return len(self._text) == 1 and self._text not in ' \n\t'

    def merge_with(self, previous: EditorCommand) -> Optional[EditorCommand]:
        if not isinstance(previous, InsertTextCommand):
            return None
        if not previous.is_mergeable:
            return None

        # Check if positions are consecutive
        expected_pos = previous._executed_position + len(previous._text)
        if self._executed_position != expected_pos:
            return None

        # Create merged command
        merged = InsertTextCommand(previous._text + self._text)
        merged._executed_position = previous._executed_position
        merged._original_selection = previous._original_selection
        merged._deleted_text = previous._deleted_text
        return merged

    def _serialize_data(self) -> Dict[str, Any]:
        return {'text': self._text, 'position': self._position}


class DeleteCommand(EditorCommand):
    """
    Delete text at current selection or single character.

    direction: -1 for backspace (delete before cursor)
               +1 for delete key (delete after cursor)
    """

    def __init__(self, direction: int = -1, count: int = 1):
        self._direction = direction
        self._count = count
        self._deleted_text: str = ""
        self._delete_position: int = 0
        self._original_selection: Optional[Selection] = None

    def execute(self, doc: Document) -> None:
        self._original_selection = deepcopy(doc.selection)
        sel = doc.selection.normalize()

        if sel.length > 0:
            # Delete selection
            self._delete_position = sel.start
            self._deleted_text = doc.delete_range(sel.start, sel.end)
        else:
            # Delete based on direction
            if self._direction < 0:  # Backspace
                start = max(0, sel.start - self._count)
                self._delete_position = start
                self._deleted_text = doc.delete_range(start, sel.start)
            else:  # Delete key
                self._delete_position = sel.start
                end = min(len(doc.content), sel.start + self._count)
                self._deleted_text = doc.delete_range(sel.start, end)

        doc.selection = Selection(self._delete_position, self._delete_position)

    def undo(self, doc: Document) -> None:
        doc.insert_at(self._delete_position, self._deleted_text)
        if self._original_selection:
            doc.selection = self._original_selection

    @property
    def description(self) -> str:
        action = "Backspace" if self._direction < 0 else "Delete"
        preview = self._deleted_text[:20] if self._deleted_text else ""
        return f'{action} "{preview}"'

    def _serialize_data(self) -> Dict[str, Any]:
        return {'direction': self._direction, 'count': self._count}


class ClipboardCommand(EditorCommand):
    """Cut or copy selected text to clipboard"""

    def __init__(self, clipboard: 'Clipboard', cut: bool = False):
        self._clipboard = clipboard
        self._cut = cut
        self._copied_text: str = ""
        self._original_selection: Optional[Selection] = None
        self._cut_position: int = 0

    def execute(self, doc: Document) -> None:
        self._original_selection = deepcopy(doc.selection)
        sel = doc.selection.normalize()

        self._copied_text = doc.get_range(sel.start, sel.end)
        self._clipboard.content = self._copied_text

        if self._cut and sel.length > 0:
            self._cut_position = sel.start
            doc.delete_range(sel.start, sel.end)
            doc.selection = Selection(sel.start, sel.start)

    def undo(self, doc: Document) -> None:
        if self._cut and self._copied_text:
            doc.insert_at(self._cut_position, self._copied_text)
            if self._original_selection:
                doc.selection = self._original_selection

    @property
    def description(self) -> str:
        action = "Cut" if self._cut else "Copy"
        return f'{action} "{self._copied_text[:20]}"'

    def _serialize_data(self) -> Dict[str, Any]:
        return {'cut': self._cut}


class PasteCommand(EditorCommand):
    """Paste from clipboard at current selection"""

    def __init__(self, clipboard: 'Clipboard'):
        self._clipboard = clipboard
        self._insert_command: Optional[InsertTextCommand] = None

    def execute(self, doc: Document) -> None:
        if self._clipboard.content:
            self._insert_command = InsertTextCommand(self._clipboard.content)
            self._insert_command.execute(doc)

    def undo(self, doc: Document) -> None:
        if self._insert_command:
            self._insert_command.undo(doc)

    @property
    def description(self) -> str:
        return f'Paste "{self._clipboard.content[:20]}"'

    def _serialize_data(self) -> Dict[str, Any]:
        return {}


# ============================================================
# MACRO COMMAND
# ============================================================

class MacroCommand(EditorCommand):
    """
    Composite command that groups multiple commands.

    Supports:
    - Atomic execution (all or nothing)
    - Single undo step for entire macro
    - Nested macros
    """

    def __init__(self, name: str, commands: Optional[List[EditorCommand]] = None):
        self._name = name
        self._commands: List[EditorCommand] = commands or []
        self._executed_commands: List[EditorCommand] = []

    def add(self, command: EditorCommand) -> 'MacroCommand':
        self._commands.append(command)
        return self

    def execute(self, doc: Document) -> None:
        self._executed_commands.clear()

        for command in self._commands:
            try:
                command.execute(doc)
                self._executed_commands.append(command)
            except Exception as e:
                # Rollback on failure
                self._rollback(doc)
                raise MacroExecutionError(f"Macro '{self._name}' failed: {e}") from e

    def undo(self, doc: Document) -> None:
        self._rollback(doc)

    def _rollback(self, doc: Document) -> None:
        for command in reversed(self._executed_commands):
            try:
                command.undo(doc)
            except Exception:
                pass  # Best effort
        self._executed_commands.clear()

    @property
    def description(self) -> str:
        return f'Macro: {self._name} ({len(self._commands)} steps)'

    def _serialize_data(self) -> Dict[str, Any]:
        return {
            'name': self._name,
            'commands': [cmd.to_dict() for cmd in self._commands]
        }


# ============================================================
# HISTORY MANAGER (INVOKER)
# ============================================================

@dataclass
class Clipboard:
    content: str = ""


class HistoryManager:
    """
    Manages command execution and history.

    Features:
    - Undo/redo stacks
    - Command merging for better UX
    - History persistence
    - Memory limit management
    """

    def __init__(self, document: Document, max_history: int = 100):
        self._document = document
        self._undo_stack: List[EditorCommand] = []
        self._redo_stack: List[EditorCommand] = []
        self._max_history = max_history
        self._is_recording = False
        self._recorded_commands: List[EditorCommand] = []

    def execute(self, command: EditorCommand) -> None:
        """Execute command and manage history"""
        command.execute(self._document)

        # Try to merge with previous command
        if self._undo_stack and command.is_mergeable:
            merged = command.merge_with(self._undo_stack[-1])
            if merged:
                self._undo_stack[-1] = merged
            else:
                self._undo_stack.append(command)
        else:
            self._undo_stack.append(command)

        # Clear redo stack (new action invalidates redo history)
        self._redo_stack.clear()

        # Enforce history limit
        while len(self._undo_stack) > self._max_history:
            self._undo_stack.pop(0)

        # Record for macro
        if self._is_recording:
            self._recorded_commands.append(command)

    def undo(self) -> bool:
        """Undo last command"""
        if not self._undo_stack:
            return False

        command = self._undo_stack.pop()
        command.undo(self._document)
        self._redo_stack.append(command)
        return True

    def redo(self) -> bool:
        """Redo last undone command"""
        if not self._redo_stack:
            return False

        command = self._redo_stack.pop()
        command.execute(self._document)
        self._undo_stack.append(command)
        return True

    def start_recording(self) -> None:
        """Start recording commands for a macro"""
        self._is_recording = True
        self._recorded_commands.clear()

    def stop_recording(self, name: str) -> MacroCommand:
        """Stop recording and return the macro"""
        self._is_recording = False
        macro = MacroCommand(name, self._recorded_commands.copy())
        self._recorded_commands.clear()
        return macro

    def can_undo(self) -> bool:
        return len(self._undo_stack) > 0

    def can_redo(self) -> bool:
        return len(self._redo_stack) > 0

    def get_undo_description(self) -> Optional[str]:
        if self._undo_stack:
            return self._undo_stack[-1].description
        return None

    def get_redo_description(self) -> Optional[str]:
        if self._redo_stack:
            return self._redo_stack[-1].description
        return None


# ============================================================
# TEXT EDITOR (CLIENT)
# ============================================================

class TextEditor:
    """
    High-level editor API.

    Provides intuitive methods that internally use commands.
    """

    def __init__(self):
        self.document = Document()
        self.clipboard = Clipboard()
        self.history = HistoryManager(self.document)
        self._macros: Dict[str, MacroCommand] = {}

    def type(self, text: str) -> None:
        self.history.execute(InsertTextCommand(text))

    def backspace(self, count: int = 1) -> None:
        self.history.execute(DeleteCommand(-1, count))

    def delete(self, count: int = 1) -> None:
        self.history.execute(DeleteCommand(+1, count))

    def select(self, start: int, end: int) -> None:
        self.document.selection = Selection(start, end)

    def select_all(self) -> None:
        self.select(0, len(self.document.content))

    def copy(self) -> None:
        self.history.execute(ClipboardCommand(self.clipboard, cut=False))

    def cut(self) -> None:
        self.history.execute(ClipboardCommand(self.clipboard, cut=True))

    def paste(self) -> None:
        self.history.execute(PasteCommand(self.clipboard))

    def undo(self) -> bool:
        return self.history.undo()

    def redo(self) -> bool:
        return self.history.redo()

    def start_macro_recording(self) -> None:
        self.history.start_recording()

    def stop_macro_recording(self, name: str) -> None:
        macro = self.history.stop_recording(name)
        self._macros[name] = macro

    def play_macro(self, name: str) -> None:
        if name in self._macros:
            self.history.execute(self._macros[name])

    @property
    def text(self) -> str:
        return self.document.content


# ============================================================
# USAGE EXAMPLE
# ============================================================

if __name__ == "__main__":
    editor = TextEditor()

    # Type some text
    editor.type("Hello, World!")
    print(f"After typing: '{editor.text}'")

    # Select and cut
    editor.select(0, 7)
    editor.cut()
    print(f"After cut: '{editor.text}'")

    # Paste twice
    editor.select(0, 0)
    editor.paste()
    editor.paste()
    print(f"After paste x2: '{editor.text}'")

    # Undo multiple times
    editor.undo()
    editor.undo()
    print(f"After 2 undos: '{editor.text}'")

    # Redo
    editor.redo()
    print(f"After redo: '{editor.text}'")

    # Macro example
    editor2 = TextEditor()
    editor2.start_macro_recording()
    editor2.type("BEGIN\n")
    editor2.type("// Your code here\n")
    editor2.type("END\n")
    editor2.stop_macro_recording("code-block")

    editor2.document.content = ""  # Clear
    editor2.play_macro("code-block")
    print(f"After macro: '{editor2.text}'")

    editor2.undo()  # Undoes entire macro
    print(f"After undo macro: '{editor2.text}'")
```

---

## Advanced Design Trade-offs

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #f59e0b;">
<div style="font-weight: 700; color: #92400e; margin-bottom: 16px; font-size: 1.1rem;">Key Design Decisions and Their Trade-offs</div>
<div style="color: #78350f; line-height: 1.8;">
<strong>1. Command granularity:</strong> Should each keystroke be a command, or group related actions?<br/>
<span style="margin-left: 20px; display: block; margin-top: 4px;">Fine-grained = more undo flexibility, more memory. Coarse-grained = less memory, less flexibility.</span><br/>

<strong>2. State storage location:</strong> Should commands store state internally or reference external storage?<br/>
<span style="margin-left: 20px; display: block; margin-top: 4px;">Internal = self-contained, larger commands. External = smaller commands, coordination complexity.</span><br/>

<strong>3. Receiver coupling:</strong> Should commands know about receivers or use indirection?<br/>
<span style="margin-left: 20px; display: block; margin-top: 4px;">Direct reference = simpler, tighter coupling. Indirection (locator) = flexible, more complexity.</span><br/>

<strong>4. Validation timing:</strong> Validate at creation time, execution time, or both?<br/>
<span style="margin-left: 20px; display: block; margin-top: 4px;">Creation = fail fast, stale validation. Execution = current state, delayed feedback.</span>
</div>
</div>

---

## Related Patterns

- [[Memento]](/topics/design-patterns/memento) - Capture state snapshots for complex undo scenarios
- [[Strategy]](/topics/design-patterns/strategy) - Encapsulate algorithms (stateless) vs actions (stateful)
- [[Composite]](/topics/design-patterns/composite) - Structure for MacroCommand implementation
- [[Chain of Responsibility]](/topics/design-patterns/chain-of-responsibility) - Commands can form processing pipelines
- [[Observer]](/topics/design-patterns/observer) - Notify on command execution for logging/audit
- [[Factory Method]](/topics/design-patterns/factory-method) - Create commands based on input type
- [[Saga]](/topics/design-patterns/saga) - Distributed transactions using compensating commands
- [[Event Sourcing]](/topics/system-design/event-sourcing) - Commands become the source of truth
