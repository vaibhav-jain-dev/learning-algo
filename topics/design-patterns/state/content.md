# State Pattern

## Overview

The State pattern allows an object to alter its behavior when its internal state changes, making it appear as if the object changed its class. Instead of using complex conditional logic scattered throughout your code, you encapsulate state-specific behavior in separate state classes.

**Difficulty:** Intermediate
**Category:** Behavioral Pattern
**Also Known As:** Objects for States, Finite State Machine

---

## The Coffee Machine Analogy

Imagine a coffee vending machine in your office. This machine behaves completely differently depending on its current state:

**Idle State:** The machine displays "Insert coins" and waits. If you press the coffee button, nothing happens. If you insert money, it transitions to "Has Money" state.

**Has Money State:** Now pressing the coffee button works! The machine starts brewing and transitions to "Dispensing" state. If you press the refund button, it returns your money and goes back to "Idle".

**Dispensing State:** The machine is making coffee. All buttons are disabled. When done, it goes to "Idle" or "Has Money" if there's change.

**Out of Stock State:** No matter what you do, it just displays "Sorry, out of stock". The only way out is when someone refills it.

The coffee machine is the same physical object, but it behaves completely differently based on its internal state. This is exactly what the State pattern models in code.

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;">
  <div style="color: #1e293b; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.75rem;">Coffee Machine State Mapping</div>
  <div style="display: flex; flex-direction: column; gap: 0.75rem;">
    <div style="display: flex; gap: 1rem; align-items: center;">
      <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600; min-width: 140px;">Coffee Machine</span>
      <span style="color: #64748b;">maps to</span>
      <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600;">Context</span>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600; min-width: 140px;">Machine behavior</span>
      <span style="color: #64748b;">maps to</span>
      <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600;">State Interface</span>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600; min-width: 140px;">Idle/Dispensing/etc</span>
      <span style="color: #64748b;">maps to</span>
      <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600;">Concrete States</span>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600; min-width: 140px;">Press button</span>
      <span style="color: #64748b;">maps to</span>
      <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600;">State transition</span>
    </div>
  </div>
</div>

---

## Real-World Company Usage

### Netflix - Video Player States
Netflix's video player uses state patterns extensively. The player can be in Loading, Playing, Paused, Buffering, Error, or Ended states. Each state handles user interactions differently - pressing spacebar in "Playing" pauses, but in "Loading" does nothing.

### Uber - Ride States
A ride goes through: Requested, Driver Assigned, En Route, Arrived, In Progress, Completed, or Cancelled. Each state determines what actions riders and drivers can take and what information is displayed.

### Amazon - Order Processing
Orders flow through: Pending Payment, Payment Confirmed, Processing, Shipped, Out for Delivery, Delivered, or Returned. Each state has specific allowed transitions and triggers different workflows.

### Stripe - Payment States
Payment intents transition through: Created, Processing, Requires Action, Succeeded, Failed, or Cancelled. The state determines what API calls are valid and what webhooks fire.

---

## Pattern Structure

<div style="background: #f8fafc; border-radius: 12px; padding: 2rem; margin: 2rem 0; border: 1px solid #e2e8f0;">
  <div style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
    <div style="background: #dbeafe; border-radius: 10px; padding: 1.25rem 2rem; text-align: center; border: 2px solid #3b82f6;">
      <div style="font-weight: 700; font-size: 1.1rem; color: #1e40af; margin-bottom: 0.5rem;">Context</div>
      <div style="font-size: 0.85rem; color: #1e40af; border-top: 1px solid #93c5fd; padding-top: 0.5rem;">
        - state: State<br>
        + request()<br>
        + setState(state)
      </div>
    </div>
    <div style="color: #3b82f6; font-size: 1.25rem;">|<br>uses<br>v</div>
    <div style="background: #dcfce7; border: 2px dashed #22c55e; border-radius: 10px; padding: 1rem 1.5rem; text-align: center;">
      <div style="font-weight: 600; color: #166534;">State (interface)</div>
      <div style="font-size: 0.8rem; color: #166534; margin-top: 0.25rem;">+ handle(context)</div>
    </div>
    <div style="color: #22c55e; font-size: 1.25rem;">^<br>implements</div>
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center;">
      <div style="background: #fef3c7; border-radius: 8px; padding: 0.75rem 1.25rem; text-align: center; border: 1px solid #f59e0b;">
        <div style="font-weight: 600; color: #92400e;">ConcreteStateA</div>
      </div>
      <div style="background: #fce7f3; border-radius: 8px; padding: 0.75rem 1.25rem; text-align: center; border: 1px solid #ec4899;">
        <div style="font-weight: 600; color: #9d174d;">ConcreteStateB</div>
      </div>
      <div style="background: #e0e7ff; border-radius: 8px; padding: 0.75rem 1.25rem; text-align: center; border: 1px solid #6366f1;">
        <div style="font-weight: 600; color: #3730a3;">ConcreteStateC</div>
      </div>
    </div>
  </div>
</div>

---

## When to Use State Pattern

<div style="background: #dcfce7; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #86efac;">
  <div style="color: #166534; font-weight: 700; margin-bottom: 1rem;">Use State Pattern When:</div>
  <ul style="color: #166534; margin: 0; padding-left: 1.5rem; line-height: 1.8;">
    <li><strong>Object behavior depends on state</strong> - Different actions based on internal state</li>
    <li><strong>Complex conditional logic</strong> - Large switch/if-else statements based on state</li>
    <li><strong>State transitions need to be explicit</strong> - Clear rules about what states can transition to what</li>
    <li><strong>State-specific data</strong> - Each state may have its own data and validation</li>
    <li><strong>Operations valid only in certain states</strong> - Some methods should only work in specific states</li>
  </ul>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #fecaca;">
  <div style="color: #991b1b; font-weight: 700; margin-bottom: 1rem;">Anti-Patterns to Avoid:</div>
  <ul style="color: #991b1b; margin: 0; padding-left: 1.5rem; line-height: 1.8;">
    <li><strong>State explosion</strong> - Too many states (20+) makes the pattern unwieldy</li>
    <li><strong>States that know about each other</strong> - States should only know about the Context</li>
    <li><strong>Forgetting terminal states</strong> - Always handle end states properly</li>
    <li><strong>Not validating transitions</strong> - Any state transitioning to any other state</li>
    <li><strong>Stateful state objects</strong> - States should generally be stateless (use Context for data)</li>
  </ul>
</div>

---

## State vs Strategy Pattern

This is one of the most common interview questions. They look structurally similar but have different intents:

<div style="display: flex; gap: 1.5rem; margin: 1.5rem 0; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 280px; background: #dbeafe; border-radius: 12px; padding: 1.25rem; border: 1px solid #93c5fd;">
    <div style="font-weight: 700; font-size: 1.1rem; color: #1e40af; margin-bottom: 1rem; text-align: center; border-bottom: 1px solid #93c5fd; padding-bottom: 0.75rem;">STATE PATTERN</div>
    <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; line-height: 1.6; color: #1e40af;">
      <li>Object changes its own state</li>
      <li>States transition to each other</li>
      <li>States are part of object lifecycle</li>
      <li>"What can I do now?"</li>
      <li>States often know about transitions</li>
    </ul>
    <div style="background: #bfdbfe; border-radius: 8px; padding: 0.75rem; margin-top: 1rem; font-size: 0.85rem; color: #1e40af;">
      <strong>Example:</strong> Order states<br>
      Pending -> Confirmed -> Shipped -> Delivered
    </div>
  </div>
  <div style="flex: 1; min-width: 280px; background: #dcfce7; border-radius: 12px; padding: 1.25rem; border: 1px solid #86efac;">
    <div style="font-weight: 700; font-size: 1.1rem; color: #166534; margin-bottom: 1rem; text-align: center; border-bottom: 1px solid #86efac; padding-bottom: 0.75rem;">STRATEGY PATTERN</div>
    <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; line-height: 1.6; color: #166534;">
      <li>Client selects the strategy</li>
      <li>Strategies are interchangeable</li>
      <li>Strategies are independent algorithms</li>
      <li>"How should I do this?"</li>
      <li>Strategies don't know about each other</li>
    </ul>
    <div style="background: #bbf7d0; border-radius: 8px; padding: 0.75rem; margin-top: 1rem; font-size: 0.85rem; color: #166534;">
      <strong>Example:</strong> Payment methods<br>
      CreditCard, PayPal, Crypto (user picks)
    </div>
  </div>
</div>

---

## Python Implementation - Document Workflow

```python
from abc import ABC, abstractmethod
from datetime import datetime
from typing import Optional, List
from dataclasses import dataclass, field
from enum import Enum


class DocumentState(ABC):
    """Abstract base class for document states."""

    @property
    @abstractmethod
    def name(self) -> str:
        """Return the state name for display/logging."""
        pass

    @abstractmethod
    def edit(self, document: 'Document', content: str) -> None:
        """Attempt to edit the document."""
        pass

    @abstractmethod
    def submit_for_review(self, document: 'Document') -> None:
        """Submit document for review."""
        pass

    @abstractmethod
    def approve(self, document: 'Document', reviewer: str) -> None:
        """Approve the document."""
        pass

    @abstractmethod
    def reject(self, document: 'Document', reason: str) -> None:
        """Reject the document."""
        pass

    @abstractmethod
    def publish(self, document: 'Document') -> None:
        """Publish the document."""
        pass

    @abstractmethod
    def archive(self, document: 'Document') -> None:
        """Archive the document."""
        pass


class DraftState(DocumentState):
    """Document is being written/edited."""

    @property
    def name(self) -> str:
        return "Draft"

    def edit(self, document: 'Document', content: str) -> None:
        document.content = content
        document.last_modified = datetime.now()
        document.add_history(f"Content edited in draft state")
        print(f"Document '{document.title}' updated.")

    def submit_for_review(self, document: 'Document') -> None:
        if not document.content:
            raise ValueError("Cannot submit empty document for review")
        document.set_state(PendingReviewState())
        document.add_history("Submitted for review")
        print(f"Document '{document.title}' submitted for review.")

    def approve(self, document: 'Document', reviewer: str) -> None:
        print("Cannot approve a draft. Submit for review first.")

    def reject(self, document: 'Document', reason: str) -> None:
        print("Cannot reject a draft. Submit for review first.")

    def publish(self, document: 'Document') -> None:
        print("Cannot publish a draft. Must be approved first.")

    def archive(self, document: 'Document') -> None:
        document.set_state(ArchivedState())
        document.add_history("Draft archived without publishing")
        print(f"Draft '{document.title}' archived.")


class PendingReviewState(DocumentState):
    """Document is waiting for review."""

    @property
    def name(self) -> str:
        return "Pending Review"

    def edit(self, document: 'Document', content: str) -> None:
        print("Cannot edit document while pending review. Reject it first.")

    def submit_for_review(self, document: 'Document') -> None:
        print("Document is already pending review.")

    def approve(self, document: 'Document', reviewer: str) -> None:
        document.reviewer = reviewer
        document.reviewed_at = datetime.now()
        document.set_state(ApprovedState())
        document.add_history(f"Approved by {reviewer}")
        print(f"Document '{document.title}' approved by {reviewer}.")

    def reject(self, document: 'Document', reason: str) -> None:
        document.rejection_reason = reason
        document.set_state(DraftState())
        document.add_history(f"Rejected: {reason}")
        print(f"Document '{document.title}' rejected: {reason}")

    def publish(self, document: 'Document') -> None:
        print("Cannot publish without approval.")

    def archive(self, document: 'Document') -> None:
        print("Cannot archive document pending review. Reject or approve first.")


class ApprovedState(DocumentState):
    """Document has been approved and can be published."""

    @property
    def name(self) -> str:
        return "Approved"

    def edit(self, document: 'Document', content: str) -> None:
        # Editing approved document sends it back to draft
        document.content = content
        document.last_modified = datetime.now()
        document.reviewer = None
        document.reviewed_at = None
        document.set_state(DraftState())
        document.add_history("Edited after approval - returned to draft")
        print(f"Document '{document.title}' edited, returned to draft.")

    def submit_for_review(self, document: 'Document') -> None:
        print("Document is already approved.")

    def approve(self, document: 'Document', reviewer: str) -> None:
        print("Document is already approved.")

    def reject(self, document: 'Document', reason: str) -> None:
        document.rejection_reason = reason
        document.set_state(DraftState())
        document.add_history(f"Approval revoked: {reason}")
        print(f"Approval revoked for '{document.title}': {reason}")

    def publish(self, document: 'Document') -> None:
        document.published_at = datetime.now()
        document.set_state(PublishedState())
        document.add_history("Published")
        print(f"Document '{document.title}' published!")

    def archive(self, document: 'Document') -> None:
        document.set_state(ArchivedState())
        document.add_history("Archived without publishing")
        print(f"Approved document '{document.title}' archived.")


class PublishedState(DocumentState):
    """Document is live and publicly visible."""

    @property
    def name(self) -> str:
        return "Published"

    def edit(self, document: 'Document', content: str) -> None:
        # Create a new draft version
        print("Creating new draft version of published document...")
        document.content = content
        document.last_modified = datetime.now()
        document.version += 1
        document.set_state(DraftState())
        document.add_history(f"New version {document.version} created from published")

    def submit_for_review(self, document: 'Document') -> None:
        print("Published document cannot be submitted. Edit to create new version.")

    def approve(self, document: 'Document', reviewer: str) -> None:
        print("Published document is already approved.")

    def reject(self, document: 'Document', reason: str) -> None:
        print("Cannot reject published document. Archive it instead.")

    def publish(self, document: 'Document') -> None:
        print("Document is already published.")

    def archive(self, document: 'Document') -> None:
        document.archived_at = datetime.now()
        document.set_state(ArchivedState())
        document.add_history("Unpublished and archived")
        print(f"Document '{document.title}' unpublished and archived.")


class ArchivedState(DocumentState):
    """Document is archived and no longer active."""

    @property
    def name(self) -> str:
        return "Archived"

    def edit(self, document: 'Document', content: str) -> None:
        print("Cannot edit archived document. Restore it first.")

    def submit_for_review(self, document: 'Document') -> None:
        print("Cannot submit archived document. Restore it first.")

    def approve(self, document: 'Document', reviewer: str) -> None:
        print("Cannot approve archived document.")

    def reject(self, document: 'Document', reason: str) -> None:
        print("Cannot reject archived document.")

    def publish(self, document: 'Document') -> None:
        print("Cannot publish archived document. Restore it first.")

    def archive(self, document: 'Document') -> None:
        print("Document is already archived.")

    def restore(self, document: 'Document') -> None:
        """Special method only available in archived state."""
        document.set_state(DraftState())
        document.add_history("Restored from archive")
        print(f"Document '{document.title}' restored to draft.")


@dataclass
class Document:
    """Context class that maintains the current state."""

    title: str
    author: str
    content: str = ""
    version: int = 1
    reviewer: Optional[str] = None
    rejection_reason: Optional[str] = None
    created_at: datetime = field(default_factory=datetime.now)
    last_modified: Optional[datetime] = None
    reviewed_at: Optional[datetime] = None
    published_at: Optional[datetime] = None
    archived_at: Optional[datetime] = None
    history: List[str] = field(default_factory=list)
    _state: DocumentState = field(default_factory=DraftState)

    def set_state(self, state: DocumentState) -> None:
        old_state = self._state.name
        self._state = state
        print(f"  [State: {old_state} -> {state.name}]")

    @property
    def state(self) -> str:
        return self._state.name

    def add_history(self, entry: str) -> None:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.history.append(f"[{timestamp}] {entry}")

    # Delegate all actions to the current state
    def edit(self, content: str) -> None:
        self._state.edit(self, content)

    def submit_for_review(self) -> None:
        self._state.submit_for_review(self)

    def approve(self, reviewer: str) -> None:
        self._state.approve(self, reviewer)

    def reject(self, reason: str) -> None:
        self._state.reject(self, reason)

    def publish(self) -> None:
        self._state.publish(self)

    def archive(self) -> None:
        self._state.archive(self)

    def restore(self) -> None:
        if isinstance(self._state, ArchivedState):
            self._state.restore(self)
        else:
            print("Only archived documents can be restored.")

    def print_history(self) -> None:
        print(f"\nHistory for '{self.title}':")
        for entry in self.history:
            print(f"  {entry}")


# Usage demonstration
def main():
    print("=" * 60)
    print("DOCUMENT WORKFLOW STATE MACHINE")
    print("=" * 60)

    # Create a new document
    doc = Document(title="Q4 Report", author="Alice")
    print(f"\nCreated: '{doc.title}' by {doc.author}")
    print(f"Current state: {doc.state}")

    # Try invalid operations
    print("\n--- Attempting invalid operations ---")
    doc.publish()  # Can't publish draft
    doc.approve("Bob")  # Can't approve draft

    # Valid workflow
    print("\n--- Valid workflow ---")
    doc.edit("Initial content for Q4 report...")
    doc.submit_for_review()

    # Reject and revise
    print("\n--- Rejection cycle ---")
    doc.reject("Needs more data in section 3")
    doc.edit("Revised content with more data...")
    doc.submit_for_review()

    # Approve and publish
    print("\n--- Approval and publishing ---")
    doc.approve("Bob")
    doc.publish()

    # Create new version
    print("\n--- Creating new version ---")
    doc.edit("Updated content for version 2...")
    print(f"Current version: {doc.version}")

    # Print full history
    doc.print_history()


if __name__ == "__main__":
    main()
```

---

## State Transition Diagram

<div style="background: #f8fafc; border-radius: 12px; padding: 2rem; margin: 2rem 0; border: 1px solid #e2e8f0;">
  <div style="text-align: center; margin-bottom: 1.5rem; color: #1e293b; font-weight: 700; font-size: 1.1rem;">Document State Transitions</div>
  <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
    <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; justify-content: center;">
      <div style="background: #dbeafe; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600; color: #1e40af; border: 2px solid #3b82f6;">Draft</div>
      <span style="color: #64748b;">--submit--></span>
      <div style="background: #fef3c7; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600; color: #92400e; border: 2px solid #f59e0b;">Pending Review</div>
      <span style="color: #64748b;">--approve--></span>
      <div style="background: #dcfce7; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600; color: #166534; border: 2px solid #22c55e;">Approved</div>
    </div>
    <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; justify-content: center;">
      <div style="background: #dcfce7; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600; color: #166534; border: 2px solid #22c55e;">Approved</div>
      <span style="color: #64748b;">--publish--></span>
      <div style="background: #fce7f3; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600; color: #9d174d; border: 2px solid #ec4899;">Published</div>
      <span style="color: #64748b;">--archive--></span>
      <div style="background: #e2e8f0; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600; color: #475569; border: 2px solid #64748b;">Archived</div>
    </div>
    <div style="color: #64748b; font-size: 0.9rem; margin-top: 0.5rem;">
      <em>Rejection returns to Draft | Editing approved/published creates new Draft</em>
    </div>
  </div>
</div>

---

## Interview Questions

### Basic Level

**Q: What problem does the State pattern solve?**
A: It eliminates complex conditional logic (giant switch/if-else statements) by encapsulating state-specific behavior in separate classes. Instead of checking state everywhere, you delegate to the current state object.

**Q: What are the key components of the State pattern?**
A: Context (maintains current state, delegates to it), State interface (defines all state-dependent operations), Concrete States (implement behavior for each state).

### Intermediate Level

**Q: Who should decide state transitions - Context or State objects?**
A: Both approaches are valid. States deciding transitions (as shown above) makes states self-contained but couples them to other states. Context deciding keeps states simpler but centralizes transition logic. Choose based on whether transitions are complex (use states) or simple (use context).

**Q: How do you persist state in a database?**
A: Store the state name/type as a string or enum. On load, use a factory or mapping to recreate the appropriate state object:
```python
STATE_MAP = {
    "draft": DraftState,
    "pending_review": PendingReviewState,
    # ...
}
document._state = STATE_MAP[saved_state_name]()
```

### Advanced Level

**Q: How would you implement a state machine with parallel states?**
A: Use a Hierarchical State Machine (HSM) where states can contain sub-state machines. The context maintains a stack or tree of active states rather than a single state.

**Q: How do you handle state-specific data that doesn't belong in Context?**
A: Create stateful state objects (not singletons) that carry their own data. Pass relevant data during state transitions. Alternatively, use a state data object that the Context maintains separately.

**Q: What's the relationship between State pattern and the Actor model?**
A: They're complementary. An Actor can use the State pattern internally to manage its behavior. The Actor's message handlers delegate to the current state, which processes the message and potentially transitions.

---

## Common Mistakes

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #fecaca;">
  <div style="color: #991b1b; font-weight: 700; margin-bottom: 1rem;">Common Implementation Mistakes</div>

  <div style="margin-bottom: 1rem;">
    <div style="font-weight: 600; color: #991b1b;">1. States knowing about each other directly</div>
    <div style="color: #7f1d1d; font-size: 0.9rem;">States should create new state objects, not reference existing instances. This allows states to be stateless and potentially shared.</div>
  </div>

  <div style="margin-bottom: 1rem;">
    <div style="font-weight: 600; color: #991b1b;">2. Not handling all operations in all states</div>
    <div style="color: #7f1d1d; font-size: 0.9rem;">Every state must implement every operation (even if just to print an error). Missing handlers cause runtime errors.</div>
  </div>

  <div style="margin-bottom: 1rem;">
    <div style="font-weight: 600; color: #991b1b;">3. Forgetting to validate state transitions</div>
    <div style="color: #7f1d1d; font-size: 0.9rem;">Add guards to prevent invalid transitions. A "Completed" order should never transition back to "Processing".</div>
  </div>

  <div>
    <div style="font-weight: 600; color: #991b1b;">4. Too many states</div>
    <div style="color: #7f1d1d; font-size: 0.9rem;">If you have 15+ states, consider hierarchical states or splitting into multiple state machines.</div>
  </div>
</div>

---

## Best Practices

1. **Single Responsibility** - Each state class handles only one state's behavior
2. **Complete Interface** - All states implement all methods (use default implementations wisely)
3. **Immutable States** - Prefer stateless state objects that can be shared/reused
4. **Clear Transitions** - Document which states can transition to which
5. **Entry/Exit Hooks** - Consider adding `on_enter()` and `on_exit()` methods to states
6. **Null Object Pattern** - Use a NullState or UnknownState for edge cases
7. **Logging** - Log all state transitions for debugging and audit trails

---

## Related Patterns

- **[Strategy](/topic/design-patterns/strategy)** - Similar structure, but client chooses algorithm
- **[Command](/topic/design-patterns/command)** - Can encapsulate state transitions as commands
- **[Memento](/topic/design-patterns/memento)** - Save and restore state snapshots
- **[Observer](/topic/design-patterns/observer)** - Notify listeners of state changes
