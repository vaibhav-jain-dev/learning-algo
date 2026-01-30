# State Pattern

## Overview

The State pattern allows an object to alter its behavior when its internal state changes, making it appear as if the object changed its class. Rather than scattering conditional logic throughout your code, you encapsulate state-specific behavior in separate state classes, delegating all state-dependent operations to the current state object.

**Difficulty:** Intermediate to Advanced
**Category:** Behavioral Pattern
**Also Known As:** Objects for States, Finite State Machine Pattern

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; color: white;">
<div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 0.75rem;">Core Insight</div>
<div style="font-size: 0.95rem; line-height: 1.6;">
    The State pattern transforms conditional behavior into polymorphic behavior. Instead of asking "what state am I in?" before every operation, you delegate to an object that <em>embodies</em> that state. The state object knows exactly what to do because it <em>is</em> the state.
</div>
</div>

---

## Internal Mechanisms and Architecture

### The Delegation Chain

At its core, the State pattern operates through a delegation chain:

1. **Client** calls a method on the **Context**
2. **Context** delegates to its current **State** object
3. **State** executes behavior and potentially triggers a **transition**
4. **Transition** replaces the Context's state reference

<div style="background: #f8fafc; border-radius: 12px; padding: 2rem; margin: 2rem 0; border: 1px solid #e2e8f0;">
<div style="text-align: center; margin-bottom: 1.5rem; color: #1e293b; font-weight: 700; font-size: 1.1rem;">State Pattern Execution Flow</div>
<div style="display: flex; flex-direction: column; gap: 1rem;">
<div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
<div style="background: #dbeafe; padding: 0.75rem 1.25rem; border-radius: 8px; font-weight: 600; color: #1e40af; border: 2px solid #3b82f6; min-width: 100px; text-align: center;">Client</div>
<div style="color: #64748b; font-size: 0.9rem;">--request()--></div>
<div style="background: #dcfce7; padding: 0.75rem 1.25rem; border-radius: 8px; font-weight: 600; color: #166534; border: 2px solid #22c55e; min-width: 100px; text-align: center;">Context</div>
<div style="color: #64748b; font-size: 0.9rem;">--handle()--></div>
<div style="background: #fef3c7; padding: 0.75rem 1.25rem; border-radius: 8px; font-weight: 600; color: #92400e; border: 2px solid #f59e0b; min-width: 100px; text-align: center;">State</div>
</div>
<div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; margin-left: 2rem;">
<div style="color: #64748b; font-size: 0.9rem;">State executes behavior, may call:</div>
<div style="background: #fce7f3; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.85rem; color: #9d174d; border: 1px solid #ec4899;">context.setState(newState)</div>
</div>
</div>
</div>

### Memory Layout and Object Relationships

<div style="background: #1e293b; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; color: #e2e8f0; font-family: monospace; font-size: 0.9rem; line-height: 1.6;">
<div style="color: #94a3b8; margin-bottom: 0.5rem;">// Memory perspective</div>
<div>Context object:</div>
  <div style="margin-left: 1rem;">
  <span style="color: #7dd3fc;">_state</span>: <span style="color: #fde047;">reference</span> --> State object in heap<br>
  <span style="color: #7dd3fc;">data</span>: context-specific data (order details, etc.)
</div>
<div style="margin-top: 1rem;">State objects can be:</div>
<div style="margin-left: 1rem;">
<span style="color: #4ade80;">Flyweight</span>: Shared singleton (stateless states)<br>
<span style="color: #fb923c;">Instance</span>: Per-context (stateful states with state-specific data)
</div>
</div>

<div style="background: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 0 8px 8px 0; padding: 1rem 1.25rem; margin: 1.5rem 0;">
<div style="font-weight: 700; color: #92400e; margin-bottom: 0.5rem;">Critical Design Decision: Stateful vs Stateless States</div>
<div style="color: #78350f; font-size: 0.9rem; line-height: 1.6;">
<strong>Stateless states</strong> contain no instance data and can be shared across contexts (flyweight pattern). This reduces memory but requires all state-specific data to live in the Context.
<br><br>
<strong>Stateful states</strong> carry their own data (e.g., retry count, timeout timestamp). This encapsulates state-specific data but requires creating new state instances on each transition.
</div>
</div>

---

## State vs Strategy Pattern

This is one of the most common interview questions because the patterns are structurally identical but semantically different.

<div style="display: flex; gap: 1.5rem; margin: 1.5rem 0; flex-wrap: wrap;">
<div style="flex: 1; min-width: 300px; background: linear-gradient(180deg, #dbeafe 0%, #eff6ff 100%); border-radius: 12px; padding: 1.5rem; border: 2px solid #3b82f6;">
<div style="font-weight: 700; font-size: 1.1rem; color: #1e40af; margin-bottom: 1rem; text-align: center; border-bottom: 2px solid #3b82f6; padding-bottom: 0.75rem;">STATE PATTERN</div>
<div style="margin-bottom: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.5rem;">Intent:</div>
<div style="color: #1e3a8a; font-size: 0.9rem;">Allow object to change behavior based on internal state changes</div>
</div>
<div style="margin-bottom: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.5rem;">Who Controls Transitions:</div>
<div style="color: #1e3a8a; font-size: 0.9rem;">State objects or Context (internal)</div>
</div>
<div style="margin-bottom: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.5rem;">State Awareness:</div>
<div style="color: #1e3a8a; font-size: 0.9rem;">States often know about other states for transitions</div>
</div>
<div style="margin-bottom: 1rem;">
<div style="font-weight: 600; color: #1e40af; margin-bottom: 0.5rem;">Lifecycle:</div>
<div style="color: #1e3a8a; font-size: 0.9rem;">States change throughout object lifetime automatically</div>
</div>
<div style="background: #bfdbfe; border-radius: 8px; padding: 0.75rem; font-size: 0.85rem; color: #1e40af;">
<strong>Question answered:</strong> "What can I do right now?"
</div>
</div>
<div style="flex: 1; min-width: 300px; background: linear-gradient(180deg, #dcfce7 0%, #f0fdf4 100%); border-radius: 12px; padding: 1.5rem; border: 2px solid #22c55e;">
<div style="font-weight: 700; font-size: 1.1rem; color: #166534; margin-bottom: 1rem; text-align: center; border-bottom: 2px solid #22c55e; padding-bottom: 0.75rem;">STRATEGY PATTERN</div>
<div style="margin-bottom: 1rem;">
<div style="font-weight: 600; color: #166534; margin-bottom: 0.5rem;">Intent:</div>
<div style="color: #14532d; font-size: 0.9rem;">Allow client to choose algorithm at runtime</div>
</div>
<div style="margin-bottom: 1rem;">
<div style="font-weight: 600; color: #166534; margin-bottom: 0.5rem;">Who Controls Selection:</div>
<div style="color: #14532d; font-size: 0.9rem;">Client code (external)</div>
</div>
<div style="margin-bottom: 1rem;">
<div style="font-weight: 600; color: #166534; margin-bottom: 0.5rem;">Strategy Awareness:</div>
<div style="color: #14532d; font-size: 0.9rem;">Strategies are completely independent of each other</div>
</div>
<div style="margin-bottom: 1rem;">
<div style="font-weight: 600; color: #166534; margin-bottom: 0.5rem;">Lifecycle:</div>
<div style="color: #14532d; font-size: 0.9rem;">Strategy typically set once or changed explicitly by client</div>
</div>
<div style="background: #bbf7d0; border-radius: 8px; padding: 0.75rem; font-size: 0.85rem; color: #166534;">
<strong>Question answered:</strong> "How should I do this task?"
</div>
</div>
</div>

### The Litmus Test

```python
# STATE PATTERN - Transitions happen internally
order.pay()  # Order decides: Pending -> Paid
order.ship() # Order decides: Paid -> Shipped
# Client doesn't choose the next state

# STRATEGY PATTERN - Selection is external
payment_processor.set_strategy(CreditCardStrategy())
payment_processor.process(amount)  # Uses credit card
payment_processor.set_strategy(PayPalStrategy())
payment_processor.process(amount)  # Now uses PayPal
# Client explicitly chooses the algorithm
```

<div style="background: #f0fdf4; border-radius: 12px; padding: 1.25rem; margin: 1.5rem 0; border: 1px solid #86efac;">
<div style="font-weight: 700; color: #166534; margin-bottom: 0.75rem;">Key Insight for Interviews</div>
<div style="color: #14532d; font-size: 0.9rem; line-height: 1.6;">
    If you remove the pattern and use conditionals instead:<br>
<strong>State</strong> becomes: <code>if self.status == "pending": ... elif self.status == "shipped": ...</code><br>
<strong>Strategy</strong> becomes: <code>if payment_type == "credit": ... elif payment_type == "paypal": ...</code><br><br>
    The State conditional checks <em>internal object state</em>. The Strategy conditional checks <em>external configuration</em>.
</div>
</div>

### 3-Level Recursive Interview Questions: State vs Strategy

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 1rem; font-size: 1.1rem;">Level 1: Can you explain the difference between State and Strategy patterns?</div>
<div style="color: #334155; font-size: 0.95rem; line-height: 1.7; margin-bottom: 1rem;">
    Both patterns use composition to delegate behavior to interchangeable objects. The difference is in intent and control flow. State pattern manages internal behavior changes driven by the object's lifecycle - the object itself or its states control transitions. Strategy pattern lets external code choose algorithms - the client decides which strategy to use.
</div>

<div style="margin-left: 1.5rem; border-left: 3px solid #3b82f6; padding-left: 1rem; margin-top: 1rem;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 0.75rem;">Level 2: If they're structurally identical, how do you decide which to use when reviewing code or designing a system?</div>
<div style="color: #334155; font-size: 0.95rem; line-height: 1.7; margin-bottom: 1rem;">
      Ask three questions: (1) Who initiates changes - if internal events trigger changes, it's State; if client code sets the algorithm, it's Strategy. (2) Do the classes know about each other - State classes often reference other states for transitions; Strategy classes are isolated. (3) Is there a defined progression - State typically has valid/invalid transitions; Strategy allows arbitrary switching.
</div>

<div style="margin-left: 1.5rem; border-left: 3px solid #8b5cf6; padding-left: 1rem; margin-top: 1rem;">
<div style="font-weight: 700; color: #6d28d9; margin-bottom: 0.75rem;">Level 3: Can you describe a scenario where you might start with Strategy and refactor to State, or vice versa?</div>
<div style="color: #334155; font-size: 0.95rem; line-height: 1.7;">
<strong>Strategy to State:</strong> You build a document editor with rendering strategies (PlainTextRenderer, MarkdownRenderer). Later, you add modes (EditMode, PreviewMode, CommentMode) where the mode determines which renderer to use AND what editing operations are valid. The modes have transitions (Edit->Preview on Ctrl+P). Now you need State pattern because behavior depends on internal mode, not just rendering choice.
<br><br>
<strong>State to Strategy:</strong> You have Order states (Pending, Processing, Shipped) but realize the shipping calculation varies by carrier independently of order state. Extract ShippingStrategy (FedExStrategy, UPSStrategy) - the shipping algorithm is a client choice, not a lifecycle stage.
</div>
</div>
</div>
</div>

---

## State Transitions: The Heart of the Pattern

### Transition Ownership Models

There are three models for who controls state transitions:

<div style="display: flex; flex-direction: column; gap: 1rem; margin: 1.5rem 0;">
<div style="background: #dbeafe; border-radius: 10px; padding: 1.25rem; border-left: 4px solid #3b82f6;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 0.5rem;">Model 1: State-Controlled Transitions</div>
<div style="color: #1e3a8a; font-size: 0.9rem; line-height: 1.6;">
      State objects call <code>context.setState(newState)</code>. States encapsulate transition logic. Used when transitions are complex and state-specific.
</div>
<div style="background: #bfdbfe; border-radius: 6px; padding: 0.5rem 0.75rem; margin-top: 0.75rem; font-size: 0.85rem; color: #1e40af;">
<strong>Trade-off:</strong> States become coupled to each other. Changing transition rules requires modifying state classes.
</div>
</div>

<div style="background: #dcfce7; border-radius: 10px; padding: 1.25rem; border-left: 4px solid #22c55e;">
<div style="font-weight: 700; color: #166534; margin-bottom: 0.5rem;">Model 2: Context-Controlled Transitions</div>
<div style="color: #14532d; font-size: 0.9rem; line-height: 1.6;">
      Context interprets state method return values and decides transitions. States are simpler and independent.
</div>
<div style="background: #bbf7d0; border-radius: 6px; padding: 0.5rem 0.75rem; margin-top: 0.75rem; font-size: 0.85rem; color: #166534;">
<strong>Trade-off:</strong> Transition logic centralized in Context. Adding new states requires modifying Context.
</div>
</div>

<div style="background: #fef3c7; border-radius: 10px; padding: 1.25rem; border-left: 4px solid #f59e0b;">
<div style="font-weight: 700; color: #92400e; margin-bottom: 0.5rem;">Model 3: Transition Table (External)</div>
<div style="color: #78350f; font-size: 0.9rem; line-height: 1.6;">
      A separate transition table/configuration defines valid transitions. States and Context query the table.
</div>
<div style="background: #fde68a; border-radius: 6px; padding: 0.5rem 0.75rem; margin-top: 0.75rem; font-size: 0.85rem; color: #92400e;">
<strong>Trade-off:</strong> Maximum flexibility and auditability. Adds complexity and indirection.
</div>
</div>
</div>

### Implementing Transition Guards

Transitions often have preconditions. Here's how to implement guards:

```python
from abc import ABC, abstractmethod
from typing import Optional, Callable, List
from dataclasses import dataclass
from datetime import datetime


@dataclass
class TransitionResult:
    """Result of a transition attempt."""
    success: bool
    error_message: Optional[str] = None
    previous_state: Optional[str] = None
    new_state: Optional[str] = None


class TransitionGuard:
    """Encapsulates a transition precondition."""

    def __init__(self, predicate: Callable[['Order'], bool], error_message: str):
        self.predicate = predicate
        self.error_message = error_message

    def check(self, context: 'Order') -> Optional[str]:
        """Returns error message if guard fails, None if passes."""
        if not self.predicate(context):
            return self.error_message
        return None


class OrderState(ABC):
    """Abstract base for order states with guarded transitions."""

    @property
    @abstractmethod
    def name(self) -> str:
        pass

    @property
    def allowed_transitions(self) -> List[str]:
        """Override to specify valid target states."""
        return []

    def get_transition_guards(self, target_state: str) -> List[TransitionGuard]:
        """Override to specify guards for specific transitions."""
        return []

    def can_transition_to(self, target_state: str, context: 'Order') -> TransitionResult:
        """Check if transition is valid and all guards pass."""
        if target_state not in self.allowed_transitions:
            return TransitionResult(
                success=False,
                error_message=f"Transition from {self.name} to {target_state} not allowed"
            )

        for guard in self.get_transition_guards(target_state):
            error = guard.check(context)
            if error:
                return TransitionResult(
                    success=False,
                    error_message=error
                )

        return TransitionResult(success=True)

    @abstractmethod
    def process(self, context: 'Order') -> None:
        """Execute state-specific processing."""
        pass


class PendingPaymentState(OrderState):
    """Order awaiting payment."""

    @property
    def name(self) -> str:
        return "pending_payment"

    @property
    def allowed_transitions(self) -> List[str]:
        return ["paid", "cancelled"]

    def get_transition_guards(self, target_state: str) -> List[TransitionGuard]:
        if target_state == "paid":
            return [
                TransitionGuard(
                    lambda o: o.payment_amount >= o.total,
                    "Payment amount insufficient"
                ),
                TransitionGuard(
                    lambda o: o.payment_verified,
                    "Payment not verified by payment processor"
                )
            ]
        elif target_state == "cancelled":
            return [
                TransitionGuard(
                    lambda o: not o.items_reserved,
                    "Cannot cancel: items already reserved in warehouse"
                )
            ]
        return []

    def process(self, context: 'Order') -> None:
        # Send payment reminder if pending > 24 hours
        pass
```

### Entry and Exit Actions

Robust state machines execute actions when entering or leaving states:

```python
class OrderState(ABC):
    """State with entry/exit hooks."""

    def on_enter(self, context: 'Order', previous_state: Optional['OrderState']) -> None:
        """Called immediately after transitioning INTO this state."""
        pass

    def on_exit(self, context: 'Order', next_state: 'OrderState') -> None:
        """Called immediately before transitioning OUT of this state."""
        pass


class ShippedState(OrderState):
    """Order has been shipped."""

    @property
    def name(self) -> str:
        return "shipped"

    def on_enter(self, context: 'Order', previous_state: Optional['OrderState']) -> None:
        # Critical: These actions execute atomically with the transition
        context.shipped_at = datetime.now()
        context.tracking_number = self._generate_tracking()

        # Trigger async notifications (fire-and-forget)
        context.event_bus.publish(OrderShippedEvent(
            order_id=context.id,
            tracking_number=context.tracking_number,
            customer_email=context.customer_email
        ))

    def on_exit(self, context: 'Order', next_state: 'OrderState') -> None:
        if next_state.name == "delivered":
            context.delivery_confirmed_at = datetime.now()
        elif next_state.name == "returned":
            # Initiate return shipping label generation
            context.return_label_requested = True
```

<div style="background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 0 8px 8px 0; padding: 1rem 1.25rem; margin: 1.5rem 0;">
<div style="font-weight: 700; color: #991b1b; margin-bottom: 0.5rem;">Edge Case: Failed Entry Actions</div>
<div style="color: #7f1d1d; font-size: 0.9rem; line-height: 1.6;">
    What if <code>on_enter</code> throws an exception? You have two choices:
<br><br>
<strong>1. Rollback:</strong> Catch exception, revert to previous state, re-throw. Complex because <code>on_exit</code> already ran.
<br>
<strong>2. Compensating state:</strong> Transition to an error/recovery state instead of the target state.
<br><br>
    Most production systems use option 2 with an explicit "FailedTransition" or "Error" state that captures the exception details and allows retry or manual intervention.
</div>
</div>

### 3-Level Recursive Interview Questions: State Transitions

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 1rem; font-size: 1.1rem;">Level 1: How do you decide whether states or the context should control transitions?</div>
<div style="color: #334155; font-size: 0.95rem; line-height: 1.7; margin-bottom: 1rem;">
    State-controlled transitions work well when transition logic is complex and state-specific - the state knows best when it should end. Context-controlled works when transitions follow simple rules or when you need centralized transition validation. External transition tables work for highly configurable systems where business rules change frequently.
</div>

<div style="margin-left: 1.5rem; border-left: 3px solid #3b82f6; padding-left: 1rem; margin-top: 1rem;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 0.75rem;">Level 2: How do you handle transitions that can fail, especially when side effects have already occurred?</div>
<div style="color: #334155; font-size: 0.95rem; line-height: 1.7; margin-bottom: 1rem;">
      Use a two-phase approach: (1) Validation phase - check all guards and preconditions before any side effects. (2) Execution phase - perform side effects only after validation passes. For distributed systems, use the [[Saga pattern]](/topic/system-design/saga-pattern) with compensating transactions. The state machine itself should track whether it's in a "transitioning" meta-state to prevent concurrent modifications.
</div>

<div style="margin-left: 1.5rem; border-left: 3px solid #8b5cf6; padding-left: 1rem; margin-top: 1rem;">
<div style="font-weight: 700; color: #6d28d9; margin-bottom: 0.75rem;">Level 3: In a distributed system with eventual consistency, how do you handle state transitions when the state machine is replicated across services?</div>
<div style="color: #334155; font-size: 0.95rem; line-height: 1.7;">
        This is where [[Event Sourcing]](/topic/system-design/event-sourcing) becomes essential. Instead of storing current state, store the sequence of state transition events. Each service can rebuild the state machine by replaying events. Use [[optimistic locking]](/topic/system-design/distributed-locking) with version numbers - a transition includes the expected version, and conflicts are detected and retried. For strong consistency, use [[distributed consensus]](/topic/system-design/consensus-algorithms) (Raft/Paxos) to agree on transition order. The key insight is that the state machine becomes a projection of the event log rather than the source of truth.
</div>
</div>
</div>
</div>

---

## Finite State Machines: Formal Foundations

A Finite State Machine (FSM) is formally defined as a 5-tuple:

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;">
<div style="font-family: monospace; font-size: 1rem; color: #1e293b; text-align: center; margin-bottom: 1rem;">
    M = (Q, &Sigma;, &delta;, q<sub>0</sub>, F)
</div>
<div style="display: grid; grid-template-columns: auto 1fr; gap: 0.75rem 1.5rem; font-size: 0.9rem;">
<div style="font-weight: 600; color: #3b82f6;">Q</div>
<div style="color: #334155;">Finite set of states</div>
<div style="font-weight: 600; color: #3b82f6;">&Sigma;</div>
<div style="color: #334155;">Finite set of input symbols (events/triggers)</div>
<div style="font-weight: 600; color: #3b82f6;">&delta;</div>
<div style="color: #334155;">Transition function: Q x &Sigma; &rarr; Q</div>
<div style="font-weight: 600; color: #3b82f6;">q<sub>0</sub></div>
<div style="color: #334155;">Initial state (q<sub>0</sub> &isin; Q)</div>
<div style="font-weight: 600; color: #3b82f6;">F</div>
<div style="color: #334155;">Set of accepting/final states (F &sube; Q)</div>
</div>
</div>

### Types of State Machines

<div style="display: flex; gap: 1.5rem; margin: 1.5rem 0; flex-wrap: wrap;">
<div style="flex: 1; min-width: 280px; background: #dbeafe; border-radius: 12px; padding: 1.25rem; border: 1px solid #93c5fd;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 0.75rem;">Moore Machine</div>
<div style="color: #1e3a8a; font-size: 0.9rem; line-height: 1.6; margin-bottom: 0.75rem;">
      Output depends <em>only</em> on current state. Actions are associated with states (entry/exit actions).
</div>
<div style="background: #bfdbfe; border-radius: 6px; padding: 0.5rem; font-size: 0.85rem; color: #1e40af;">
      Example: Vending machine display shows state (Insert Coin, Select Item, Dispensing)
</div>
</div>

<div style="flex: 1; min-width: 280px; background: #dcfce7; border-radius: 12px; padding: 1.25rem; border: 1px solid #86efac;">
<div style="font-weight: 700; color: #166534; margin-bottom: 0.75rem;">Mealy Machine</div>
<div style="color: #14532d; font-size: 0.9rem; line-height: 1.6; margin-bottom: 0.75rem;">
      Output depends on current state <em>and</em> input. Actions are associated with transitions.
</div>
<div style="background: #bbf7d0; border-radius: 6px; padding: 0.5rem; font-size: 0.85rem; color: #166534;">
      Example: Parser that emits tokens during specific transitions, not just at states
</div>
</div>
</div>

### Table-Driven State Machine Implementation

For complex state machines, a table-driven approach is more maintainable:

```python
from dataclasses import dataclass, field
from typing import Dict, Set, Callable, Optional, Any
from enum import Enum, auto


class OrderEvent(Enum):
    """Events that trigger state transitions."""
    PAYMENT_RECEIVED = auto()
    PAYMENT_FAILED = auto()
    INVENTORY_RESERVED = auto()
    INVENTORY_UNAVAILABLE = auto()
    SHIPPED = auto()
    DELIVERED = auto()
    RETURN_REQUESTED = auto()
    RETURN_RECEIVED = auto()
    CANCELLED = auto()
    REFUND_ISSUED = auto()


class OrderStatus(Enum):
    """Possible order states."""
    PENDING_PAYMENT = auto()
    PAYMENT_PROCESSING = auto()
    PAYMENT_FAILED = auto()
    PAID = auto()
    AWAITING_INVENTORY = auto()
    INVENTORY_ALLOCATED = auto()
    SHIPPED = auto()
    DELIVERED = auto()
    RETURN_PENDING = auto()
    RETURNED = auto()
    CANCELLED = auto()
    REFUNDED = auto()


@dataclass
class Transition:
    """Represents a valid state transition."""
    target: OrderStatus
    guard: Optional[Callable[['Order'], bool]] = None
    action: Optional[Callable[['Order'], None]] = None


@dataclass
class StateMachineConfig:
    """Configuration for a table-driven state machine."""
    initial_state: OrderStatus
    final_states: Set[OrderStatus]
    transitions: Dict[OrderStatus, Dict[OrderEvent, Transition]]

    def validate(self) -> None:
        """Validate state machine configuration at startup."""
        # Check all states are reachable from initial
        reachable = {self.initial_state}
        changed = True
        while changed:
            changed = False
            for state in list(reachable):
                if state in self.transitions:
                    for event, transition in self.transitions[state].items():
                        if transition.target not in reachable:
                            reachable.add(transition.target)
                            changed = True

        # Check final states are reachable
        for final in self.final_states:
            if final not in reachable:
                raise ValueError(f"Final state {final} is not reachable")

        # Check for dead ends (non-final states with no outgoing transitions)
        all_states = set(self.transitions.keys())
        for state in all_states:
            if state not in self.final_states:
                if not self.transitions.get(state):
                    raise ValueError(f"Non-final state {state} has no transitions")


# Define the order state machine configuration
ORDER_STATE_MACHINE = StateMachineConfig(
    initial_state=OrderStatus.PENDING_PAYMENT,
    final_states={
        OrderStatus.DELIVERED,
        OrderStatus.RETURNED,
        OrderStatus.CANCELLED,
        OrderStatus.REFUNDED,
    },
    transitions={
        OrderStatus.PENDING_PAYMENT: {
            OrderEvent.PAYMENT_RECEIVED: Transition(
                target=OrderStatus.PAYMENT_PROCESSING,
                action=lambda o: o.initiate_payment_processing()
            ),
            OrderEvent.CANCELLED: Transition(
                target=OrderStatus.CANCELLED,
                guard=lambda o: not o.has_reserved_inventory,
                action=lambda o: o.notify_cancellation()
            ),
        },
        OrderStatus.PAYMENT_PROCESSING: {
            OrderEvent.PAYMENT_RECEIVED: Transition(
                target=OrderStatus.PAID,
                action=lambda o: o.record_payment()
            ),
            OrderEvent.PAYMENT_FAILED: Transition(
                target=OrderStatus.PAYMENT_FAILED,
                action=lambda o: o.notify_payment_failure()
            ),
        },
        OrderStatus.PAYMENT_FAILED: {
            OrderEvent.PAYMENT_RECEIVED: Transition(
                target=OrderStatus.PAYMENT_PROCESSING
            ),
            OrderEvent.CANCELLED: Transition(
                target=OrderStatus.CANCELLED
            ),
        },
        OrderStatus.PAID: {
            OrderEvent.INVENTORY_RESERVED: Transition(
                target=OrderStatus.INVENTORY_ALLOCATED,
                action=lambda o: o.confirm_inventory()
            ),
            OrderEvent.INVENTORY_UNAVAILABLE: Transition(
                target=OrderStatus.AWAITING_INVENTORY,
                action=lambda o: o.backorder_items()
            ),
            OrderEvent.CANCELLED: Transition(
                target=OrderStatus.REFUNDED,
                action=lambda o: o.process_refund()
            ),
        },
        OrderStatus.AWAITING_INVENTORY: {
            OrderEvent.INVENTORY_RESERVED: Transition(
                target=OrderStatus.INVENTORY_ALLOCATED
            ),
            OrderEvent.CANCELLED: Transition(
                target=OrderStatus.REFUNDED,
                action=lambda o: o.process_refund()
            ),
        },
        OrderStatus.INVENTORY_ALLOCATED: {
            OrderEvent.SHIPPED: Transition(
                target=OrderStatus.SHIPPED,
                action=lambda o: o.generate_tracking()
            ),
        },
        OrderStatus.SHIPPED: {
            OrderEvent.DELIVERED: Transition(
                target=OrderStatus.DELIVERED,
                action=lambda o: o.confirm_delivery()
            ),
            OrderEvent.RETURN_REQUESTED: Transition(
                target=OrderStatus.RETURN_PENDING,
                guard=lambda o: o.is_within_return_window,
                action=lambda o: o.initiate_return()
            ),
        },
        OrderStatus.DELIVERED: {
            OrderEvent.RETURN_REQUESTED: Transition(
                target=OrderStatus.RETURN_PENDING,
                guard=lambda o: o.is_within_return_window,
                action=lambda o: o.initiate_return()
            ),
        },
        OrderStatus.RETURN_PENDING: {
            OrderEvent.RETURN_RECEIVED: Transition(
                target=OrderStatus.RETURNED,
                action=lambda o: o.process_return_refund()
            ),
        },
    }
)


class StateMachine:
    """Generic table-driven state machine executor."""

    def __init__(self, config: StateMachineConfig):
        self.config = config
        config.validate()

    def process_event(
        self,
        context: Any,
        current_state: Enum,
        event: Enum
    ) -> tuple[Enum, bool]:
        """
        Process an event and return (new_state, transition_occurred).

        Raises ValueError for invalid transitions.
        """
        state_transitions = self.config.transitions.get(current_state, {})
        transition = state_transitions.get(event)

        if transition is None:
            raise ValueError(
                f"No transition defined for event {event} in state {current_state}"
            )

        # Check guard condition
        if transition.guard and not transition.guard(context):
            return current_state, False

        # Execute action
        if transition.action:
            transition.action(context)

        return transition.target, True
```

### 3-Level Recursive Interview Questions: State Machines

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 1rem; font-size: 1.1rem;">Level 1: What are the advantages of a table-driven state machine over the classic State pattern implementation?</div>
<div style="color: #334155; font-size: 0.95rem; line-height: 1.7; margin-bottom: 1rem;">
    Table-driven machines centralize all transition logic in one place, making it easy to visualize, validate, and modify. You can validate the machine at startup (check reachability, dead ends). It's also easier to serialize/deserialize and to generate from configuration files. The classic pattern distributes logic across many classes, which can make the overall flow harder to understand but keeps state-specific logic encapsulated.
</div>

<div style="margin-left: 1.5rem; border-left: 3px solid #3b82f6; padding-left: 1rem; margin-top: 1rem;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 0.75rem;">Level 2: How would you implement a state machine that needs to support dynamic/runtime-configurable transitions?</div>
<div style="color: #334155; font-size: 0.95rem; line-height: 1.7; margin-bottom: 1rem;">
      Store transition rules in a database or configuration service. The state machine loads rules at startup and can reload on-demand. Use a versioned configuration to handle in-flight entities - an order created under v1 rules continues with v1 rules. Implement rule validation before accepting new configurations. For complex scenarios, use a workflow engine like Temporal or AWS Step Functions that provides this out of the box.
</div>

<div style="margin-left: 1.5rem; border-left: 3px solid #8b5cf6; padding-left: 1rem; margin-top: 1rem;">
<div style="font-weight: 700; color: #6d28d9; margin-bottom: 0.75rem;">Level 3: How do you test a state machine with hundreds of states and thousands of transitions?</div>
<div style="color: #334155; font-size: 0.95rem; line-height: 1.7;">
        Use multiple testing strategies:<br><br>
<strong>1. Model-based testing:</strong> Define the state machine formally and generate test cases automatically. Tools like QuickCheck can generate random event sequences and verify invariants hold.<br><br>
<strong>2. Property-based testing:</strong> Test properties like "final states are always reachable," "no transition leads to undefined state," "cancellation is always possible before shipping."<br><br>
<strong>3. Path coverage:</strong> Use graph algorithms to find all paths from initial to final states. Generate tests for each path. For large machines, use k-path coverage (paths up to length k).<br><br>
<strong>4. Mutation testing:</strong> Systematically remove or alter transitions and verify tests catch the changes.<br><br>
<strong>5. Production traffic replay:</strong> Capture real event sequences and replay them in test environments to catch edge cases.
</div>
</div>
</div>
</div>

---

## Hierarchical State Machines (Statecharts)

Hierarchical State Machines (HSMs), formalized by David Harel as Statecharts, extend FSMs with:

1. **Nested states** (superstates containing substates)
2. **History** (remembering which substate was active)
3. **Parallel regions** (orthogonal states)

<div style="background: #f8fafc; border-radius: 12px; padding: 2rem; margin: 2rem 0; border: 1px solid #e2e8f0;">
<div style="text-align: center; margin-bottom: 1.5rem; color: #1e293b; font-weight: 700; font-size: 1.1rem;">Hierarchical Order State Machine</div>

<div style="background: #dbeafe; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; border: 2px solid #3b82f6;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 1rem; text-align: center;">Processing (Superstate)</div>
<div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
<div style="background: white; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid #93c5fd;">
<div style="font-weight: 600; color: #1e40af;">PaymentProcessing</div>
</div>
<div style="color: #3b82f6; align-self: center;">&rarr;</div>
<div style="background: white; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid #93c5fd;">
<div style="font-weight: 600; color: #1e40af;">InventoryAllocation</div>
</div>
<div style="color: #3b82f6; align-self: center;">&rarr;</div>
<div style="background: white; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid #93c5fd;">
<div style="font-weight: 600; color: #1e40af;">Fulfillment</div>
</div>
</div>
<div style="text-align: center; margin-top: 1rem; font-size: 0.85rem; color: #1e40af;">
      Any substate can transition to <strong>Cancelled</strong> via "cancel" event (inherited transition)
</div>
</div>

<div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
<div style="background: #fef2f2; padding: 0.75rem 1.25rem; border-radius: 8px; border: 2px solid #ef4444;">
<div style="font-weight: 600; color: #991b1b;">Cancelled</div>
</div>
<div style="background: #dcfce7; padding: 0.75rem 1.25rem; border-radius: 8px; border: 2px solid #22c55e;">
<div style="font-weight: 600; color: #166534;">Completed</div>
</div>
</div>
</div>

### Benefits of Hierarchical States

<div style="background: #f0fdf4; border-radius: 12px; padding: 1.25rem; margin: 1.5rem 0; border: 1px solid #86efac;">
<div style="font-weight: 700; color: #166534; margin-bottom: 0.75rem;">Key Benefits</div>
<ul style="margin: 0; padding-left: 1.5rem; color: #14532d; line-height: 1.8;">
<li><strong>Transition inheritance:</strong> Define "cancel" once at the superstate level instead of in every substate</li>
<li><strong>State explosion prevention:</strong> N substates with M common transitions = N + M instead of N * M</li>
<li><strong>Logical grouping:</strong> Related states are visually and logically grouped</li>
<li><strong>History states:</strong> Resume where you left off after returning to a superstate</li>
</ul>
</div>

### Implementation with Nested States

```python
from abc import ABC, abstractmethod
from typing import Optional, Dict, Type
from dataclasses import dataclass, field
from enum import Enum, auto


class StateEventResult(Enum):
    """Result of processing an event in a state."""
    HANDLED = auto()      # Event was handled, no transition
    TRANSITION = auto()   # Transition to another state
    NOT_HANDLED = auto()  # Delegate to parent state


@dataclass
class HierarchicalState(ABC):
    """Base class for hierarchical states."""

    parent: Optional['HierarchicalState'] = None
    _active_substate: Optional['HierarchicalState'] = None

    @property
    @abstractmethod
    def name(self) -> str:
        pass

    def get_substates(self) -> Dict[str, Type['HierarchicalState']]:
        """Override to define nested states."""
        return {}

    def get_initial_substate(self) -> Optional[str]:
        """Override to specify which substate to enter by default."""
        return None

    def handle_event(self, context: 'Order', event: str) -> tuple[StateEventResult, Optional['HierarchicalState']]:
        """
        Process event. Returns (result, new_state_or_none).
        Default implementation delegates to active substate, then to self.
        """
        # First, let active substate handle it
        if self._active_substate:
            result, new_state = self._active_substate.handle_event(context, event)
            if result == StateEventResult.HANDLED:
                return result, None
            elif result == StateEventResult.TRANSITION:
                return result, new_state

        # Substate didn't handle it (or no substate), try handling here
        handler = getattr(self, f'on_{event}', None)
        if handler:
            return handler(context)

        # Event not handled at this level, bubble up
        return StateEventResult.NOT_HANDLED, None

    def enter(self, context: 'Order', history: bool = False) -> None:
        """Called when entering this state."""
        self.on_enter(context)

        # Enter initial substate if this is a composite state
        initial = self.get_initial_substate()
        if initial and not history:
            substates = self.get_substates()
            if initial in substates:
                self._active_substate = substates[initial](parent=self)
                self._active_substate.enter(context)

    def exit(self, context: 'Order') -> None:
        """Called when exiting this state."""
        # Exit active substate first (innermost to outermost)
        if self._active_substate:
            self._active_substate.exit(context)
            self._active_substate = None
        self.on_exit(context)

    def on_enter(self, context: 'Order') -> None:
        """Override for entry actions."""
        pass

    def on_exit(self, context: 'Order') -> None:
        """Override for exit actions."""
        pass


# Concrete implementation
class ProcessingState(HierarchicalState):
    """Composite state containing payment, inventory, and fulfillment substates."""

    @property
    def name(self) -> str:
        return "processing"

    def get_substates(self) -> Dict[str, Type[HierarchicalState]]:
        return {
            "payment": PaymentProcessingSubstate,
            "inventory": InventoryAllocationSubstate,
            "fulfillment": FulfillmentSubstate,
        }

    def get_initial_substate(self) -> str:
        return "payment"

    def on_cancel(self, context: 'Order') -> tuple[StateEventResult, HierarchicalState]:
        """
        Cancel transition defined at superstate level.
        This handles 'cancel' for ALL substates automatically.
        """
        context.cancel_reason = "Customer requested cancellation"
        return StateEventResult.TRANSITION, CancelledState()

    def on_enter(self, context: 'Order') -> None:
        context.processing_started_at = datetime.now()
        print(f"Order {context.id} entering processing")


class PaymentProcessingSubstate(HierarchicalState):
    """Substate handling payment processing."""

    @property
    def name(self) -> str:
        return "processing.payment"

    def on_payment_confirmed(self, context: 'Order') -> tuple[StateEventResult, HierarchicalState]:
        context.paid_at = datetime.now()
        # Transition to sibling substate
        return StateEventResult.TRANSITION, InventoryAllocationSubstate(parent=self.parent)

    def on_payment_failed(self, context: 'Order') -> tuple[StateEventResult, HierarchicalState]:
        return StateEventResult.TRANSITION, PaymentFailedState()


class InventoryAllocationSubstate(HierarchicalState):
    """Substate handling inventory allocation."""

    @property
    def name(self) -> str:
        return "processing.inventory"

    def on_inventory_allocated(self, context: 'Order') -> tuple[StateEventResult, HierarchicalState]:
        context.inventory_reserved = True
        return StateEventResult.TRANSITION, FulfillmentSubstate(parent=self.parent)


class FulfillmentSubstate(HierarchicalState):
    """Substate handling order fulfillment."""

    @property
    def name(self) -> str:
        return "processing.fulfillment"

    def on_shipped(self, context: 'Order') -> tuple[StateEventResult, HierarchicalState]:
        # Transition out of the entire Processing superstate
        return StateEventResult.TRANSITION, ShippedState()
```

### History States

History states remember which substate was active when exiting a composite state:

```python
@dataclass
class CompositeStateWithHistory(HierarchicalState):
    """Composite state that remembers its last active substate."""

    _history: Optional[str] = None  # Name of last active substate

    def exit(self, context: 'Order') -> None:
        # Remember which substate was active
        if self._active_substate:
            self._history = self._active_substate.name.split('.')[-1]
            self._active_substate.exit(context)
            self._active_substate = None
        self.on_exit(context)

    def enter_with_history(self, context: 'Order') -> None:
        """Enter the composite state, resuming at the last active substate."""
        self.on_enter(context)

        target = self._history or self.get_initial_substate()
        if target:
            substates = self.get_substates()
            if target in substates:
                self._active_substate = substates[target](parent=self)
                self._active_substate.enter(context)


# Usage: Order returns from "On Hold" state
class OnHoldState(HierarchicalState):
    """Order is temporarily on hold."""

    @property
    def name(self) -> str:
        return "on_hold"

    def on_resume(self, context: 'Order') -> tuple[StateEventResult, HierarchicalState]:
        # Create processing state and enter with history
        processing = ProcessingStateWithHistory()
        processing._history = context.last_processing_substate
        return StateEventResult.TRANSITION, processing
```

### 3-Level Recursive Interview Questions: Hierarchical States

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 1rem; font-size: 1.1rem;">Level 1: When should you use hierarchical states instead of a flat state machine?</div>
<div style="color: #334155; font-size: 0.95rem; line-height: 1.7; margin-bottom: 1rem;">
    Use HSMs when you have groups of states that share common transitions (like "cancel" available in all processing substates), when your flat state machine would have many duplicated transitions, or when states have natural hierarchical relationships. The rule of thumb: if the same transition appears in 3+ states, consider a superstate.
</div>

<div style="margin-left: 1.5rem; border-left: 3px solid #3b82f6; padding-left: 1rem; margin-top: 1rem;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 0.75rem;">Level 2: How do you handle entry/exit actions in nested states? What's the correct order?</div>
<div style="color: #334155; font-size: 0.95rem; line-height: 1.7; margin-bottom: 1rem;">
      Entry actions execute from outermost to innermost (superstate first, then substate). Exit actions execute from innermost to outermost (substate first, then superstate). This follows the principle that you fully enter a context before entering its contents, and fully exit contents before leaving the context. For a transition from A.a1 to B.b1: exit a1, exit A, enter B, enter b1.
</div>

<div style="margin-left: 1.5rem; border-left: 3px solid #8b5cf6; padding-left: 1rem; margin-top: 1rem;">
<div style="font-weight: 700; color: #6d28d9; margin-bottom: 0.75rem;">Level 3: How would you implement orthogonal regions (parallel states) where an order is simultaneously in "payment processing" and "fraud check" states?</div>
<div style="color: #334155; font-size: 0.95rem; line-height: 1.7;">
        Orthogonal regions represent independent aspects of an entity that evolve in parallel. Implementation approaches:<br><br>
<strong>1. Multiple state references:</strong> The context maintains separate state references for each region. Events are broadcast to all regions. A "join" condition waits for all regions to reach specific states.<br><br>
<strong>2. Composite state tuple:</strong> State is represented as (PaymentState, FraudState). Transitions occur in one region without affecting the other. The state machine handles the cartesian product of possible combinations.<br><br>
<strong>3. Actor model:</strong> Each region becomes a separate actor/process. A coordinator actor manages synchronization points.<br><br>
        The key complexity is synchronization: what happens if payment succeeds but fraud check fails? You need clear semantics for conflicting outcomes and may need compensating actions.
</div>
</div>
</div>
</div>

---

## Complete Order Workflow Implementation

Here's a production-quality order state machine demonstrating all concepts:

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any, Callable
from enum import Enum, auto
import logging

logger = logging.getLogger(__name__)


class OrderEvent(Enum):
    """All possible order events."""
    # Payment events
    PAYMENT_INITIATED = auto()
    PAYMENT_AUTHORIZED = auto()
    PAYMENT_CAPTURED = auto()
    PAYMENT_FAILED = auto()
    PAYMENT_REFUNDED = auto()

    # Inventory events
    ITEMS_RESERVED = auto()
    ITEMS_UNAVAILABLE = auto()
    ITEMS_BACKORDERED = auto()

    # Fulfillment events
    PICKING_STARTED = auto()
    PICKING_COMPLETED = auto()
    PACKED = auto()
    SHIPPED = auto()
    OUT_FOR_DELIVERY = auto()
    DELIVERED = auto()
    DELIVERY_FAILED = auto()

    # Customer events
    CANCELLED_BY_CUSTOMER = auto()
    RETURN_REQUESTED = auto()
    RETURN_RECEIVED = auto()

    # System events
    FRAUD_DETECTED = auto()
    EXPIRED = auto()


@dataclass
class TransitionContext:
    """Context passed to transition handlers."""
    order: 'Order'
    event: OrderEvent
    timestamp: datetime
    metadata: Dict[str, Any] = field(default_factory=dict)


@dataclass
class OrderState(ABC):
    """
    Abstract base for order states.

    Design choices:
    - States are stateless (no instance variables) to allow sharing
    - All order data lives in the Order context
    - States define allowed transitions and guard conditions
    """

    @property
    @abstractmethod
    def name(self) -> str:
        """Canonical state name for persistence and logging."""
        pass

    @property
    def is_terminal(self) -> bool:
        """Terminal states cannot transition further."""
        return False

    @property
    def allowed_events(self) -> List[OrderEvent]:
        """Events that can be processed in this state."""
        return []

    def can_process(self, event: OrderEvent) -> bool:
        """Check if this state can process the given event."""
        return event in self.allowed_events

    @abstractmethod
    def process_event(
        self,
        ctx: TransitionContext
    ) -> tuple[Optional['OrderState'], List[Dict]]:
        """
        Process an event and return (new_state, side_effects).

        Returns:
            - (new_state, effects) if transition occurs
            - (None, []) if event is handled but no transition

        Side effects are returned as data, not executed, enabling:
        - Transaction safety (effects executed after DB commit)
        - Testing (verify effects without executing)
        - Event sourcing (effects become events)
        """
        pass

    def on_enter(self, ctx: TransitionContext) -> List[Dict]:
        """
        Entry actions when transitioning INTO this state.
        Returns side effects to execute.
        """
        return []

    def on_exit(self, ctx: TransitionContext, target: 'OrderState') -> List[Dict]:
        """
        Exit actions when transitioning OUT of this state.
        Returns side effects to execute.
        """
        return []


# === Concrete States ===

class PendingPaymentState(OrderState):
    """
    Initial state: awaiting payment.

    Edge cases handled:
    - Customer cancellation before payment
    - Payment timeout (order expiration)
    - Fraud detection during payment
    """

    @property
    def name(self) -> str:
        return "pending_payment"

    @property
    def allowed_events(self) -> List[OrderEvent]:
        return [
            OrderEvent.PAYMENT_INITIATED,
            OrderEvent.CANCELLED_BY_CUSTOMER,
            OrderEvent.EXPIRED,
            OrderEvent.FRAUD_DETECTED,
        ]

    def process_event(self, ctx: TransitionContext) -> tuple[Optional[OrderState], List[Dict]]:
        if ctx.event == OrderEvent.PAYMENT_INITIATED:
            return PaymentProcessingState(), [
                {"type": "initiate_payment", "amount": ctx.order.total}
            ]

        elif ctx.event == OrderEvent.CANCELLED_BY_CUSTOMER:
            ctx.order.cancelled_at = ctx.timestamp
            ctx.order.cancel_reason = "Customer cancelled before payment"
            return CancelledState(), [
                {"type": "send_email", "template": "order_cancelled", "to": ctx.order.customer_email}
            ]

        elif ctx.event == OrderEvent.EXPIRED:
            ctx.order.expired_at = ctx.timestamp
            return CancelledState(), [
                {"type": "send_email", "template": "order_expired", "to": ctx.order.customer_email}
            ]

        elif ctx.event == OrderEvent.FRAUD_DETECTED:
            ctx.order.fraud_flag = True
            return FraudReviewState(), [
                {"type": "alert_fraud_team", "order_id": ctx.order.id}
            ]

        return None, []

    def on_enter(self, ctx: TransitionContext) -> List[Dict]:
        # Schedule expiration check
        expiry_time = ctx.timestamp + timedelta(hours=24)
        return [
            {"type": "send_email", "template": "order_confirmation", "to": ctx.order.customer_email},
            {"type": "schedule_event", "event": "EXPIRED", "at": expiry_time}
        ]


class PaymentProcessingState(OrderState):
    """
    Payment is being processed by payment gateway.

    This is typically a transient state - we're waiting for
    an async callback from the payment processor.

    Edge cases:
    - Payment processor timeout
    - Partial authorization (auth for less than order total)
    - 3D Secure / SCA challenges
    """

    @property
    def name(self) -> str:
        return "payment_processing"

    @property
    def allowed_events(self) -> List[OrderEvent]:
        return [
            OrderEvent.PAYMENT_AUTHORIZED,
            OrderEvent.PAYMENT_FAILED,
            OrderEvent.FRAUD_DETECTED,
        ]

    def process_event(self, ctx: TransitionContext) -> tuple[Optional[OrderState], List[Dict]]:
        if ctx.event == OrderEvent.PAYMENT_AUTHORIZED:
            ctx.order.payment_authorized_at = ctx.timestamp
            ctx.order.authorization_code = ctx.metadata.get("auth_code")

            # Check for partial authorization
            authorized_amount = ctx.metadata.get("authorized_amount", ctx.order.total)
            if authorized_amount < ctx.order.total:
                # Partial auth - need additional payment or cancel
                ctx.order.partial_auth_amount = authorized_amount
                return PartialPaymentState(), [
                    {"type": "send_email", "template": "partial_payment", "to": ctx.order.customer_email}
                ]

            return PaymentAuthorizedState(), [
                {"type": "capture_payment", "amount": ctx.order.total}
            ]

        elif ctx.event == OrderEvent.PAYMENT_FAILED:
            ctx.order.payment_failed_at = ctx.timestamp
            ctx.order.payment_failure_reason = ctx.metadata.get("reason", "Unknown")

            # Allow retry up to 3 times
            if ctx.order.payment_attempts < 3:
                return PendingPaymentState(), [
                    {"type": "send_email", "template": "payment_failed_retry", "to": ctx.order.customer_email}
                ]
            else:
                return CancelledState(), [
                    {"type": "send_email", "template": "payment_failed_final", "to": ctx.order.customer_email}
                ]

        elif ctx.event == OrderEvent.FRAUD_DETECTED:
            # Void any authorization
            ctx.order.fraud_flag = True
            return FraudReviewState(), [
                {"type": "void_authorization", "auth_code": ctx.order.authorization_code},
                {"type": "alert_fraud_team", "order_id": ctx.order.id}
            ]

        return None, []


class PaymentAuthorizedState(OrderState):
    """
    Payment authorized, attempting capture.

    Authorization != Capture:
    - Authorization: "Can this card pay $X?" (hold on funds)
    - Capture: "Actually charge $X now" (transfer funds)

    Some merchants capture immediately, others wait until shipping.
    """

    @property
    def name(self) -> str:
        return "payment_authorized"

    @property
    def allowed_events(self) -> List[OrderEvent]:
        return [
            OrderEvent.PAYMENT_CAPTURED,
            OrderEvent.PAYMENT_FAILED,
            OrderEvent.CANCELLED_BY_CUSTOMER,
        ]

    def process_event(self, ctx: TransitionContext) -> tuple[Optional[OrderState], List[Dict]]:
        if ctx.event == OrderEvent.PAYMENT_CAPTURED:
            ctx.order.payment_captured_at = ctx.timestamp
            return PaidState(), [
                {"type": "send_email", "template": "payment_received", "to": ctx.order.customer_email},
                {"type": "reserve_inventory", "items": ctx.order.items}
            ]

        elif ctx.event == OrderEvent.PAYMENT_FAILED:
            # Capture failed after auth - rare but possible
            return PendingPaymentState(), [
                {"type": "send_email", "template": "payment_issue", "to": ctx.order.customer_email}
            ]

        elif ctx.event == OrderEvent.CANCELLED_BY_CUSTOMER:
            ctx.order.cancelled_at = ctx.timestamp
            return CancelledState(), [
                {"type": "void_authorization", "auth_code": ctx.order.authorization_code},
                {"type": "send_email", "template": "order_cancelled", "to": ctx.order.customer_email}
            ]

        return None, []


class PaidState(OrderState):
    """
    Payment captured, ready for fulfillment.

    This triggers inventory reservation. If inventory
    is unavailable, order moves to backorder state.
    """

    @property
    def name(self) -> str:
        return "paid"

    @property
    def allowed_events(self) -> List[OrderEvent]:
        return [
            OrderEvent.ITEMS_RESERVED,
            OrderEvent.ITEMS_UNAVAILABLE,
            OrderEvent.ITEMS_BACKORDERED,
            OrderEvent.CANCELLED_BY_CUSTOMER,
        ]

    def process_event(self, ctx: TransitionContext) -> tuple[Optional[OrderState], List[Dict]]:
        if ctx.event == OrderEvent.ITEMS_RESERVED:
            ctx.order.inventory_reserved_at = ctx.timestamp
            return ReadyForFulfillmentState(), [
                {"type": "create_pick_list", "order_id": ctx.order.id}
            ]

        elif ctx.event == OrderEvent.ITEMS_UNAVAILABLE:
            # Complete stockout - refund and cancel
            return CancelledState(), [
                {"type": "refund_payment", "amount": ctx.order.total},
                {"type": "send_email", "template": "out_of_stock_cancelled", "to": ctx.order.customer_email}
            ]

        elif ctx.event == OrderEvent.ITEMS_BACKORDERED:
            ctx.order.backordered_at = ctx.timestamp
            ctx.order.estimated_ship_date = ctx.metadata.get("estimated_date")
            return BackorderedState(), [
                {"type": "send_email", "template": "backordered", "to": ctx.order.customer_email}
            ]

        elif ctx.event == OrderEvent.CANCELLED_BY_CUSTOMER:
            ctx.order.cancelled_at = ctx.timestamp
            return CancelledState(), [
                {"type": "refund_payment", "amount": ctx.order.total},
                {"type": "send_email", "template": "order_cancelled_refunded", "to": ctx.order.customer_email}
            ]

        return None, []


class BackorderedState(OrderState):
    """
    Items on backorder, waiting for inventory.

    Customer can cancel while backordered.
    """

    @property
    def name(self) -> str:
        return "backordered"

    @property
    def allowed_events(self) -> List[OrderEvent]:
        return [
            OrderEvent.ITEMS_RESERVED,
            OrderEvent.CANCELLED_BY_CUSTOMER,
        ]

    def process_event(self, ctx: TransitionContext) -> tuple[Optional[OrderState], List[Dict]]:
        if ctx.event == OrderEvent.ITEMS_RESERVED:
            ctx.order.inventory_reserved_at = ctx.timestamp
            return ReadyForFulfillmentState(), [
                {"type": "send_email", "template": "backorder_filled", "to": ctx.order.customer_email},
                {"type": "create_pick_list", "order_id": ctx.order.id}
            ]

        elif ctx.event == OrderEvent.CANCELLED_BY_CUSTOMER:
            ctx.order.cancelled_at = ctx.timestamp
            return CancelledState(), [
                {"type": "refund_payment", "amount": ctx.order.total},
                {"type": "send_email", "template": "backorder_cancelled", "to": ctx.order.customer_email}
            ]

        return None, []


class ReadyForFulfillmentState(OrderState):
    """
    Inventory reserved, ready for warehouse picking.

    This is where the order enters the physical fulfillment process.
    Cancellation becomes more expensive here (restocking labor).
    """

    @property
    def name(self) -> str:
        return "ready_for_fulfillment"

    @property
    def allowed_events(self) -> List[OrderEvent]:
        return [
            OrderEvent.PICKING_STARTED,
            OrderEvent.CANCELLED_BY_CUSTOMER,
        ]

    def process_event(self, ctx: TransitionContext) -> tuple[Optional[OrderState], List[Dict]]:
        if ctx.event == OrderEvent.PICKING_STARTED:
            ctx.order.picking_started_at = ctx.timestamp
            return PickingState(), []

        elif ctx.event == OrderEvent.CANCELLED_BY_CUSTOMER:
            ctx.order.cancelled_at = ctx.timestamp
            return CancelledState(), [
                {"type": "release_inventory", "items": ctx.order.items},
                {"type": "refund_payment", "amount": ctx.order.total},
                {"type": "send_email", "template": "order_cancelled_refunded", "to": ctx.order.customer_email}
            ]

        return None, []


class PickingState(OrderState):
    """
    Order is being picked in the warehouse.

    Cancellation no longer allowed - too late in process.
    """

    @property
    def name(self) -> str:
        return "picking"

    @property
    def allowed_events(self) -> List[OrderEvent]:
        return [
            OrderEvent.PICKING_COMPLETED,
            OrderEvent.ITEMS_UNAVAILABLE,  # Item damaged/missing during pick
        ]

    def process_event(self, ctx: TransitionContext) -> tuple[Optional[OrderState], List[Dict]]:
        if ctx.event == OrderEvent.PICKING_COMPLETED:
            ctx.order.picking_completed_at = ctx.timestamp
            return PackingState(), []

        elif ctx.event == OrderEvent.ITEMS_UNAVAILABLE:
            # Partial fulfillment scenario
            unavailable_items = ctx.metadata.get("unavailable_items", [])
            if len(unavailable_items) == len(ctx.order.items):
                # Complete failure
                return CancelledState(), [
                    {"type": "refund_payment", "amount": ctx.order.total},
                    {"type": "send_email", "template": "fulfillment_failed", "to": ctx.order.customer_email}
                ]
            else:
                # Partial shipment
                ctx.order.partial_fulfillment = True
                ctx.order.unfulfilled_items = unavailable_items
                return PackingState(), [
                    {"type": "partial_refund", "items": unavailable_items},
                    {"type": "send_email", "template": "partial_shipment", "to": ctx.order.customer_email}
                ]

        return None, []


class PackingState(OrderState):
    """Order is being packed."""

    @property
    def name(self) -> str:
        return "packing"

    @property
    def allowed_events(self) -> List[OrderEvent]:
        return [OrderEvent.PACKED]

    def process_event(self, ctx: TransitionContext) -> tuple[Optional[OrderState], List[Dict]]:
        if ctx.event == OrderEvent.PACKED:
            ctx.order.packed_at = ctx.timestamp
            return AwaitingShipmentState(), [
                {"type": "generate_shipping_label", "order_id": ctx.order.id}
            ]
        return None, []


class AwaitingShipmentState(OrderState):
    """Packed and labeled, waiting for carrier pickup."""

    @property
    def name(self) -> str:
        return "awaiting_shipment"

    @property
    def allowed_events(self) -> List[OrderEvent]:
        return [OrderEvent.SHIPPED]

    def process_event(self, ctx: TransitionContext) -> tuple[Optional[OrderState], List[Dict]]:
        if ctx.event == OrderEvent.SHIPPED:
            ctx.order.shipped_at = ctx.timestamp
            ctx.order.tracking_number = ctx.metadata.get("tracking_number")
            ctx.order.carrier = ctx.metadata.get("carrier")
            return ShippedState(), [
                {"type": "send_email", "template": "shipped", "to": ctx.order.customer_email,
                 "data": {"tracking": ctx.order.tracking_number}}
            ]
        return None, []


class ShippedState(OrderState):
    """
    Order is in transit.

    Now tracking carrier events (out for delivery, delivered, failed).
    """

    @property
    def name(self) -> str:
        return "shipped"

    @property
    def allowed_events(self) -> List[OrderEvent]:
        return [
            OrderEvent.OUT_FOR_DELIVERY,
            OrderEvent.DELIVERED,
            OrderEvent.DELIVERY_FAILED,
        ]

    def process_event(self, ctx: TransitionContext) -> tuple[Optional[OrderState], List[Dict]]:
        if ctx.event == OrderEvent.OUT_FOR_DELIVERY:
            ctx.order.out_for_delivery_at = ctx.timestamp
            return OutForDeliveryState(), [
                {"type": "send_email", "template": "out_for_delivery", "to": ctx.order.customer_email}
            ]

        elif ctx.event == OrderEvent.DELIVERED:
            ctx.order.delivered_at = ctx.timestamp
            return DeliveredState(), [
                {"type": "send_email", "template": "delivered", "to": ctx.order.customer_email}
            ]

        elif ctx.event == OrderEvent.DELIVERY_FAILED:
            ctx.order.delivery_attempts = ctx.order.delivery_attempts + 1
            if ctx.order.delivery_attempts >= 3:
                return ReturnToSenderState(), [
                    {"type": "send_email", "template": "delivery_failed_returning", "to": ctx.order.customer_email}
                ]
            return self, [
                {"type": "send_email", "template": "delivery_failed_retry", "to": ctx.order.customer_email}
            ]

        return None, []


class OutForDeliveryState(OrderState):
    """Order is out for delivery today."""

    @property
    def name(self) -> str:
        return "out_for_delivery"

    @property
    def allowed_events(self) -> List[OrderEvent]:
        return [
            OrderEvent.DELIVERED,
            OrderEvent.DELIVERY_FAILED,
        ]

    def process_event(self, ctx: TransitionContext) -> tuple[Optional[OrderState], List[Dict]]:
        if ctx.event == OrderEvent.DELIVERED:
            ctx.order.delivered_at = ctx.timestamp
            return DeliveredState(), [
                {"type": "send_email", "template": "delivered", "to": ctx.order.customer_email}
            ]

        elif ctx.event == OrderEvent.DELIVERY_FAILED:
            ctx.order.delivery_attempts = ctx.order.delivery_attempts + 1
            return ShippedState(), [
                {"type": "send_email", "template": "delivery_failed_retry", "to": ctx.order.customer_email}
            ]

        return None, []


class DeliveredState(OrderState):
    """
    Order successfully delivered.

    Return window is now open. Customer can request return
    within the return policy period (typically 30 days).
    """

    @property
    def name(self) -> str:
        return "delivered"

    @property
    def allowed_events(self) -> List[OrderEvent]:
        return [OrderEvent.RETURN_REQUESTED]

    def process_event(self, ctx: TransitionContext) -> tuple[Optional[OrderState], List[Dict]]:
        if ctx.event == OrderEvent.RETURN_REQUESTED:
            # Check return window
            days_since_delivery = (ctx.timestamp - ctx.order.delivered_at).days
            if days_since_delivery > 30:
                # Return window closed - stay in delivered state
                logger.info(f"Return rejected for order {ctx.order.id}: outside return window")
                return None, [
                    {"type": "send_email", "template": "return_window_closed", "to": ctx.order.customer_email}
                ]

            ctx.order.return_requested_at = ctx.timestamp
            ctx.order.return_reason = ctx.metadata.get("reason")
            return ReturnRequestedState(), [
                {"type": "generate_return_label", "order_id": ctx.order.id},
                {"type": "send_email", "template": "return_approved", "to": ctx.order.customer_email}
            ]

        return None, []


class ReturnRequestedState(OrderState):
    """Return requested, waiting for item to be received back."""

    @property
    def name(self) -> str:
        return "return_requested"

    @property
    def allowed_events(self) -> List[OrderEvent]:
        return [OrderEvent.RETURN_RECEIVED]

    def process_event(self, ctx: TransitionContext) -> tuple[Optional[OrderState], List[Dict]]:
        if ctx.event == OrderEvent.RETURN_RECEIVED:
            ctx.order.return_received_at = ctx.timestamp
            return ReturnedState(), [
                {"type": "inspect_return", "order_id": ctx.order.id},
                {"type": "refund_payment", "amount": ctx.order.total},
                {"type": "send_email", "template": "return_complete", "to": ctx.order.customer_email}
            ]
        return None, []


# === Terminal States ===

class CancelledState(OrderState):
    """Order has been cancelled. Terminal state."""

    @property
    def name(self) -> str:
        return "cancelled"

    @property
    def is_terminal(self) -> bool:
        return True

    def process_event(self, ctx: TransitionContext) -> tuple[Optional[OrderState], List[Dict]]:
        return None, []  # No transitions from terminal state


class ReturnedState(OrderState):
    """Order has been returned. Terminal state."""

    @property
    def name(self) -> str:
        return "returned"

    @property
    def is_terminal(self) -> bool:
        return True

    def process_event(self, ctx: TransitionContext) -> tuple[Optional[OrderState], List[Dict]]:
        return None, []


class ReturnToSenderState(OrderState):
    """Package returned to sender after delivery failures. Terminal state."""

    @property
    def name(self) -> str:
        return "return_to_sender"

    @property
    def is_terminal(self) -> bool:
        return True

    def process_event(self, ctx: TransitionContext) -> tuple[Optional[OrderState], List[Dict]]:
        return None, []

    def on_enter(self, ctx: TransitionContext) -> List[Dict]:
        return [
            {"type": "refund_payment", "amount": ctx.order.total},
            {"type": "release_inventory", "items": ctx.order.items}
        ]


class FraudReviewState(OrderState):
    """Order flagged for fraud review. Manual intervention required."""

    @property
    def name(self) -> str:
        return "fraud_review"

    @property
    def allowed_events(self) -> List[OrderEvent]:
        # Only manual review events, not modeled here
        return []

    def process_event(self, ctx: TransitionContext) -> tuple[Optional[OrderState], List[Dict]]:
        return None, []


class PartialPaymentState(OrderState):
    """Partial authorization received, needs additional payment."""

    @property
    def name(self) -> str:
        return "partial_payment"

    @property
    def allowed_events(self) -> List[OrderEvent]:
        return [
            OrderEvent.PAYMENT_INITIATED,
            OrderEvent.CANCELLED_BY_CUSTOMER,
        ]

    def process_event(self, ctx: TransitionContext) -> tuple[Optional[OrderState], List[Dict]]:
        if ctx.event == OrderEvent.PAYMENT_INITIATED:
            remaining = ctx.order.total - ctx.order.partial_auth_amount
            return PaymentProcessingState(), [
                {"type": "initiate_payment", "amount": remaining}
            ]

        elif ctx.event == OrderEvent.CANCELLED_BY_CUSTOMER:
            return CancelledState(), [
                {"type": "void_authorization", "auth_code": ctx.order.authorization_code}
            ]

        return None, []


# === State Machine Executor ===

# Registry for deserializing states
STATE_REGISTRY: Dict[str, type] = {
    "pending_payment": PendingPaymentState,
    "payment_processing": PaymentProcessingState,
    "payment_authorized": PaymentAuthorizedState,
    "paid": PaidState,
    "backordered": BackorderedState,
    "ready_for_fulfillment": ReadyForFulfillmentState,
    "picking": PickingState,
    "packing": PackingState,
    "awaiting_shipment": AwaitingShipmentState,
    "shipped": ShippedState,
    "out_for_delivery": OutForDeliveryState,
    "delivered": DeliveredState,
    "return_requested": ReturnRequestedState,
    "cancelled": CancelledState,
    "returned": ReturnedState,
    "return_to_sender": ReturnToSenderState,
    "fraud_review": FraudReviewState,
    "partial_payment": PartialPaymentState,
}


@dataclass
class Order:
    """Order entity with state machine integration."""

    id: str
    customer_email: str
    items: List[Dict]
    total: float

    # State tracking
    _state: OrderState = field(default_factory=PendingPaymentState)
    state_name: str = "pending_payment"  # For persistence

    # Timestamps and metadata
    created_at: datetime = field(default_factory=datetime.now)
    payment_attempts: int = 0
    delivery_attempts: int = 0

    # State-specific data
    authorization_code: Optional[str] = None
    partial_auth_amount: Optional[float] = None
    tracking_number: Optional[str] = None
    carrier: Optional[str] = None
    fraud_flag: bool = False
    partial_fulfillment: bool = False
    unfulfilled_items: List[Dict] = field(default_factory=list)

    # Timestamps
    payment_authorized_at: Optional[datetime] = None
    payment_captured_at: Optional[datetime] = None
    payment_failed_at: Optional[datetime] = None
    inventory_reserved_at: Optional[datetime] = None
    backordered_at: Optional[datetime] = None
    picking_started_at: Optional[datetime] = None
    picking_completed_at: Optional[datetime] = None
    packed_at: Optional[datetime] = None
    shipped_at: Optional[datetime] = None
    out_for_delivery_at: Optional[datetime] = None
    delivered_at: Optional[datetime] = None
    cancelled_at: Optional[datetime] = None
    expired_at: Optional[datetime] = None
    return_requested_at: Optional[datetime] = None
    return_received_at: Optional[datetime] = None

    # Metadata
    cancel_reason: Optional[str] = None
    payment_failure_reason: Optional[str] = None
    return_reason: Optional[str] = None
    estimated_ship_date: Optional[datetime] = None

    def process_event(
        self,
        event: OrderEvent,
        metadata: Optional[Dict] = None
    ) -> tuple[bool, List[Dict]]:
        """
        Process an event and return (success, side_effects).

        This is the main entry point for state transitions.
        """
        if self._state.is_terminal:
            logger.warning(f"Attempted event {event} on terminal state {self.state_name}")
            return False, []

        if not self._state.can_process(event):
            logger.warning(f"Event {event} not allowed in state {self.state_name}")
            return False, []

        ctx = TransitionContext(
            order=self,
            event=event,
            timestamp=datetime.now(),
            metadata=metadata or {}
        )

        # Process event
        new_state, effects = self._state.process_event(ctx)

        if new_state is not None:
            # Execute exit actions
            exit_effects = self._state.on_exit(ctx, new_state)

            # Transition
            old_state_name = self.state_name
            self._state = new_state
            self.state_name = new_state.name

            # Execute entry actions
            entry_effects = new_state.on_enter(ctx)

            logger.info(f"Order {self.id}: {old_state_name} -> {self.state_name} via {event.name}")

            return True, exit_effects + effects + entry_effects

        return True, effects

    @classmethod
    def from_persistence(cls, data: Dict) -> 'Order':
        """Reconstruct order from persisted data."""
        order = cls(**{k: v for k, v in data.items() if k not in ['_state', 'state_name']})
        order.state_name = data.get('state_name', 'pending_payment')
        order._state = STATE_REGISTRY[order.state_name]()
        return order
```

### 3-Level Recursive Interview Questions: Order Workflow

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 1rem; font-size: 1.1rem;">Level 1: How do you handle the case where an order can be cancelled from multiple states (pending, paid, ready for fulfillment)?</div>
<div style="color: #334155; font-size: 0.95rem; line-height: 1.7; margin-bottom: 1rem;">
    Each state handles the CANCELLED_BY_CUSTOMER event with its own logic. PendingPayment just cancels. PaidState refunds payment. ReadyForFulfillment refunds AND releases inventory. This keeps cancellation logic close to the state-specific concerns. Alternatively, use hierarchical states with a "Cancellable" superstate that handles common cancellation logic.
</div>

<div style="margin-left: 1.5rem; border-left: 3px solid #3b82f6; padding-left: 1rem; margin-top: 1rem;">
<div style="font-weight: 700; color: #1e40af; margin-bottom: 0.75rem;">Level 2: How do you ensure that side effects (sending emails, refunding payments) are only executed once, even if the state machine crashes mid-transition?</div>
<div style="color: #334155; font-size: 0.95rem; line-height: 1.7; margin-bottom: 1rem;">
      Return side effects as data, not actions. The state machine returns the list of effects, which the caller executes within a database transaction. If the transaction commits, effects are guaranteed to execute (via outbox pattern or transactional messaging). If it rolls back, effects are discarded. For critical effects, use [[idempotency keys]](/topic/system-design/api-gateway) - if a refund effect has ID "refund-order-123", the payment service ignores duplicate requests with that ID.
</div>

<div style="margin-left: 1.5rem; border-left: 3px solid #8b5cf6; padding-left: 1rem; margin-top: 1rem;">
<div style="font-weight: 700; color: #6d28d9; margin-bottom: 0.75rem;">Level 3: How do you handle time-based transitions (order expiration, return window closing) in a distributed system where you can't rely on local timers?</div>
<div style="color: #334155; font-size: 0.95rem; line-height: 1.7;">
        Several approaches:<br><br>
<strong>1. Delayed message queues:</strong> When entering PendingPayment, publish a message to a delayed queue that fires after 24 hours. If still pending, transition to expired. Use message deduplication to handle duplicate deliveries.<br><br>
<strong>2. Scheduled job polling:</strong> A cron job queries for orders in time-sensitive states past their deadline. Scales horizontally with partitioning.<br><br>
<strong>3. Event scheduling service:</strong> Dedicated service (like AWS EventBridge Scheduler) that fires events at specific times. More reliable than self-managed cron.<br><br>
<strong>4. Lazy evaluation:</strong> Don't transition proactively. When any event arrives, first check if time-based transitions should have occurred. "Order expired" is detected when customer tries to pay.<br><br>
        The choice depends on SLA requirements. Lazy evaluation is simplest but means expired orders appear valid until touched. Scheduled jobs provide eventual consistency within polling interval.
</div>
</div>
</div>
</div>

---

## Trade-offs and Design Decisions

<div style="display: flex; flex-direction: column; gap: 1.5rem; margin: 1.5rem 0;">
<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 1rem; font-size: 1.05rem;">Decision: Stateless vs Stateful State Objects</div>
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
<div style="flex: 1; min-width: 200px;">
<div style="font-weight: 600; color: #166534; margin-bottom: 0.5rem;">Stateless (Flyweight)</div>
<ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; color: #334155; line-height: 1.6;">
<li>States can be singletons</li>
<li>Lower memory footprint</li>
<li>All data in Context</li>
<li>Simpler serialization</li>
</ul>
</div>
<div style="flex: 1; min-width: 200px;">
<div style="font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">Stateful (Per-instance)</div>
<ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; color: #334155; line-height: 1.6;">
<li>State-specific data encapsulated</li>
<li>Cleaner state classes</li>
<li>Must create new instances</li>
<li>Complex serialization</li>
</ul>
</div>
</div>
<div style="background: #f0f9ff; border-radius: 8px; padding: 0.75rem; margin-top: 1rem; font-size: 0.9rem; color: #0369a1;">
<strong>Recommendation:</strong> Start stateless. Move data to states only when it clearly belongs there (e.g., retry count only relevant during RetryingPayment state).
</div>
</div>

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 1rem; font-size: 1.05rem;">Decision: Event-Driven vs Direct Method Calls</div>
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
<div style="flex: 1; min-width: 200px;">
<div style="font-weight: 600; color: #166534; margin-bottom: 0.5rem;">Event-Driven</div>
<ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; color: #334155; line-height: 1.6;">
<li>Decoupled, async-friendly</li>
<li>Natural for distributed systems</li>
<li>Easy to add logging/audit</li>
<li>States handle single event enum</li>
</ul>
</div>
<div style="flex: 1; min-width: 200px;">
<div style="font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">Direct Methods</div>
<ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; color: #334155; line-height: 1.6;">
<li>Compile-time safety</li>
<li>IDE autocomplete</li>
<li>States implement interface</li>
<li>Harder to extend</li>
</ul>
</div>
</div>
<div style="background: #f0f9ff; border-radius: 8px; padding: 0.75rem; margin-top: 1rem; font-size: 0.9rem; color: #0369a1;">
<strong>Recommendation:</strong> Event-driven for systems that process async events (webhooks, message queues). Direct methods for synchronous, API-driven flows.
</div>
</div>

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 1rem; font-size: 1.05rem;">Decision: Centralized vs Distributed State Logic</div>
<div style="display: flex; gap: 1rem; flex-wrap: wrap;">
<div style="flex: 1; min-width: 200px;">
<div style="font-weight: 600; color: #166534; margin-bottom: 0.5rem;">Centralized (Table-driven)</div>
<ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; color: #334155; line-height: 1.6;">
<li>All transitions visible at once</li>
<li>Easy to validate completeness</li>
<li>Configuration-driven</li>
<li>Less OOP encapsulation</li>
</ul>
</div>
<div style="flex: 1; min-width: 200px;">
<div style="font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">Distributed (State classes)</div>
<ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; color: #334155; line-height: 1.6;">
<li>State behavior encapsulated</li>
<li>Complex state-specific logic</li>
<li>Harder to see full picture</li>
<li>Natural for OOP codebases</li>
</ul>
</div>
</div>
<div style="background: #f0f9ff; border-radius: 8px; padding: 0.75rem; margin-top: 1rem; font-size: 0.9rem; color: #0369a1;">
<strong>Recommendation:</strong> Table-driven for simple FSMs with many states but simple transitions. Class-based for fewer states with complex per-state logic.
</div>
</div>
</div>

---

## Common Pitfalls and Edge Cases

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #fecaca;">
<div style="color: #991b1b; font-weight: 700; margin-bottom: 1rem; font-size: 1.1rem;">Critical Edge Cases</div>

<div style="margin-bottom: 1.25rem;">
<div style="font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">1. Race Conditions in State Transitions</div>
<div style="color: #7f1d1d; font-size: 0.9rem; line-height: 1.6;">
      Two events arrive simultaneously: PAYMENT_RECEIVED and CANCELLED_BY_CUSTOMER. Without locking, both could be processed against the same initial state, leading to inconsistent outcomes.
<br><br>
<strong>Solution:</strong> Use optimistic locking (version field) or database-level row locks. The second event will fail and can be retried against the new state.
</div>
</div>

<div style="margin-bottom: 1.25rem;">
<div style="font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">2. Orphaned Transitional States</div>
<div style="color: #7f1d1d; font-size: 0.9rem; line-height: 1.6;">
      Application crashes after entering "PaymentProcessing" but before receiving the webhook. Order is stuck in transitional state forever.
<br><br>
<strong>Solution:</strong> Set timeouts for transitional states. A scheduled job checks for orders stuck in PaymentProcessing > 1 hour and triggers a timeout event.
</div>
</div>

<div style="margin-bottom: 1.25rem;">
<div style="font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">3. Duplicate Events (At-Least-Once Delivery)</div>
<div style="color: #7f1d1d; font-size: 0.9rem; line-height: 1.6;">
      Message queue delivers PAYMENT_RECEIVED twice. First delivery transitions Pending->Paid. Second delivery tries to process PAYMENT_RECEIVED in Paid state.
<br><br>
<strong>Solution:</strong> Track processed event IDs. Or design states to be idempotent - PAYMENT_RECEIVED in Paid state is a no-op, not an error.
</div>
</div>

<div>
  <div style="font-weight: 600; color: #991b1b; margin-bottom: 0.5rem;">4. State Corruption During Partial Failures</div>
  <div style="color: #7f1d1d; font-size: 0.9rem; line-height: 1.6;">
  State transitions but side effect (email, refund) fails. Customer is refunded but email doesn't send, causing confusion and support tickets.
  <br><br>
  <strong>Solution:</strong> Use [[transactional outbox pattern]](/topic/system-design/event-sourcing). Write side effects to database in same transaction as state change. Separate process reads outbox and executes effects with retries.
</div>
</div>
</div>

---

## Testing Strategies

```python
import pytest
from datetime import datetime
from typing import List, Dict


class TestOrderStateMachine:
    """Comprehensive tests for order state machine."""

    def test_happy_path_to_delivery(self):
        """Test the complete successful order flow."""
        order = Order(
            id="ORD-001",
            customer_email="test@example.com",
            items=[{"sku": "ABC123", "qty": 1}],
            total=99.99
        )

        # Process through complete flow
        events = [
            (OrderEvent.PAYMENT_INITIATED, {}),
            (OrderEvent.PAYMENT_AUTHORIZED, {"auth_code": "AUTH123"}),
            (OrderEvent.PAYMENT_CAPTURED, {}),
            (OrderEvent.ITEMS_RESERVED, {}),
            (OrderEvent.PICKING_STARTED, {}),
            (OrderEvent.PICKING_COMPLETED, {}),
            (OrderEvent.PACKED, {}),
            (OrderEvent.SHIPPED, {"tracking_number": "1Z999", "carrier": "UPS"}),
            (OrderEvent.OUT_FOR_DELIVERY, {}),
            (OrderEvent.DELIVERED, {}),
        ]

        for event, metadata in events:
            success, effects = order.process_event(event, metadata)
            assert success, f"Event {event} should succeed"

        assert order.state_name == "delivered"
        assert order.tracking_number == "1Z999"

    def test_cancellation_at_various_states(self):
        """Test that cancellation behaves correctly in each state."""
        cancellable_states_and_effects = [
            ("pending_payment", []),  # No refund needed
            ("paid", ["refund_payment"]),  # Refund required
            ("ready_for_fulfillment", ["release_inventory", "refund_payment"]),
        ]

        for state_name, expected_effect_types in cancellable_states_and_effects:
            order = self._create_order_in_state(state_name)
            success, effects = order.process_event(OrderEvent.CANCELLED_BY_CUSTOMER)

            assert success
            assert order.state_name == "cancelled"

            effect_types = [e["type"] for e in effects]
            for expected in expected_effect_types:
                assert expected in effect_types

    def test_cannot_cancel_after_shipping(self):
        """Orders cannot be cancelled once shipped."""
        order = self._create_order_in_state("shipped")
        success, effects = order.process_event(OrderEvent.CANCELLED_BY_CUSTOMER)

        assert not success
        assert order.state_name == "shipped"  # State unchanged

    def test_invalid_event_in_state(self):
        """Verify invalid events are rejected."""
        order = Order(
            id="ORD-001",
            customer_email="test@example.com",
            items=[],
            total=99.99
        )

        # Can't approve payment when pending payment
        success, effects = order.process_event(OrderEvent.PAYMENT_CAPTURED)
        assert not success
        assert order.state_name == "pending_payment"

    def test_return_window_enforcement(self):
        """Return requests outside window should be rejected."""
        order = self._create_order_in_state("delivered")
        order.delivered_at = datetime.now() - timedelta(days=45)  # 45 days ago

        success, effects = order.process_event(OrderEvent.RETURN_REQUESTED)

        assert success  # Event processed but no transition
        assert order.state_name == "delivered"  # Still delivered
        assert any(e["type"] == "send_email" and "window_closed" in e["template"]
                   for e in effects)

    def test_payment_retry_limit(self):
        """After 3 payment failures, order should be cancelled."""
        order = Order(
            id="ORD-001",
            customer_email="test@example.com",
            items=[],
            total=99.99
        )
        order.payment_attempts = 3  # Already failed 3 times

        # Move to payment processing
        order.process_event(OrderEvent.PAYMENT_INITIATED)

        # Fail payment
        success, effects = order.process_event(
            OrderEvent.PAYMENT_FAILED,
            {"reason": "Insufficient funds"}
        )

        assert order.state_name == "cancelled"  # No more retries

    def _create_order_in_state(self, target_state: str) -> Order:
        """Helper to create order in a specific state for testing."""
        order = Order(
            id=f"ORD-{target_state}",
            customer_email="test@example.com",
            items=[{"sku": "TEST", "qty": 1}],
            total=99.99
        )

        # Define path to each state
        paths = {
            "pending_payment": [],
            "payment_processing": [OrderEvent.PAYMENT_INITIATED],
            "paid": [
                OrderEvent.PAYMENT_INITIATED,
                OrderEvent.PAYMENT_AUTHORIZED,
                OrderEvent.PAYMENT_CAPTURED
            ],
            "ready_for_fulfillment": [
                OrderEvent.PAYMENT_INITIATED,
                OrderEvent.PAYMENT_AUTHORIZED,
                OrderEvent.PAYMENT_CAPTURED,
                OrderEvent.ITEMS_RESERVED
            ],
            "shipped": [
                OrderEvent.PAYMENT_INITIATED,
                OrderEvent.PAYMENT_AUTHORIZED,
                OrderEvent.PAYMENT_CAPTURED,
                OrderEvent.ITEMS_RESERVED,
                OrderEvent.PICKING_STARTED,
                OrderEvent.PICKING_COMPLETED,
                OrderEvent.PACKED,
                OrderEvent.SHIPPED
            ],
            "delivered": [
                OrderEvent.PAYMENT_INITIATED,
                OrderEvent.PAYMENT_AUTHORIZED,
                OrderEvent.PAYMENT_CAPTURED,
                OrderEvent.ITEMS_RESERVED,
                OrderEvent.PICKING_STARTED,
                OrderEvent.PICKING_COMPLETED,
                OrderEvent.PACKED,
                OrderEvent.SHIPPED,
                OrderEvent.DELIVERED
            ],
        }

        for event in paths.get(target_state, []):
            metadata = {}
            if event == OrderEvent.PAYMENT_AUTHORIZED:
                metadata = {"auth_code": "TEST_AUTH"}
            elif event == OrderEvent.SHIPPED:
                metadata = {"tracking_number": "TEST123", "carrier": "UPS"}
            order.process_event(event, metadata)

        return order


class TestStateMachineProperties:
    """Property-based tests for state machine invariants."""

    def test_terminal_states_have_no_transitions(self):
        """Verify terminal states reject all events."""
        terminal_states = [CancelledState(), ReturnedState(), ReturnToSenderState()]

        for state in terminal_states:
            assert state.is_terminal
            assert len(state.allowed_events) == 0

    def test_all_states_reachable_from_initial(self):
        """Verify every state can be reached from initial state."""
        # This would use graph traversal in production
        pass

    def test_no_state_has_transition_to_itself(self):
        """Self-transitions should be explicit, not implicit."""
        # Verify states don't accidentally return themselves
        pass
```

---

## Related Patterns

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
<div style="background: #f8fafc; border-radius: 10px; padding: 1.25rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 0.5rem;">[[Strategy Pattern]](/topic/design-patterns/strategy)</div>
<div style="font-size: 0.9rem; color: #475569; line-height: 1.6;">
      Structurally identical but client selects algorithm. Consider when behavior varies by configuration, not lifecycle.
</div>
</div>

<div style="background: #f8fafc; border-radius: 10px; padding: 1.25rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 0.5rem;">[[Command Pattern]](/topic/design-patterns/command)</div>
<div style="font-size: 0.9rem; color: #475569; line-height: 1.6;">
      Encapsulate state transitions as command objects for undo/redo, queueing, or logging.
</div>
</div>

<div style="background: #f8fafc; border-radius: 10px; padding: 1.25rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 0.5rem;">[[Observer Pattern]](/topic/design-patterns/observer)</div>
<div style="font-size: 0.9rem; color: #475569; line-height: 1.6;">
      Notify external systems of state changes. Often combined with State for event-driven architectures.
</div>
</div>

<div style="background: #f8fafc; border-radius: 10px; padding: 1.25rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 0.5rem;">[[Memento Pattern]](/topic/design-patterns/memento)</div>
<div style="font-size: 0.9rem; color: #475569; line-height: 1.6;">
      Capture and restore state snapshots. Essential for undo functionality or state persistence.
</div>
</div>

<div style="background: #f8fafc; border-radius: 10px; padding: 1.25rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 0.5rem;">[[Saga Pattern]](/topic/system-design/saga-pattern)</div>
<div style="font-size: 0.9rem; color: #475569; line-height: 1.6;">
      Orchestrate distributed transactions as a sequence of local transactions with compensating actions.
</div>
</div>

<div style="background: #f8fafc; border-radius: 10px; padding: 1.25rem; border: 1px solid #e2e8f0;">
<div style="font-weight: 700; color: #1e293b; margin-bottom: 0.5rem;">[[Event Sourcing]](/topic/system-design/event-sourcing)</div>
<div style="font-size: 0.9rem; color: #475569; line-height: 1.6;">
      Store state changes as events. The state machine becomes a projection of the event stream.
</div>
</div>
</div>

---

## Key Interview Takeaways

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 2px solid #e2e8f0;">
<div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem; border-bottom: 2px solid #cbd5e1; padding-bottom: 0.75rem; color: #1e293b;">Summary for Interviews</div>
<ul style="margin: 0; padding-left: 1.5rem; line-height: 2; color: #475569;">
<li><strong>State vs Strategy:</strong> State changes internally based on lifecycle; Strategy is selected externally by client</li>
<li><strong>Transition ownership:</strong> States (encapsulated), Context (centralized), or Table (configurable)</li>
<li><strong>Hierarchical states:</strong> Reduce transition duplication, enable history states for "resume where you left off"</li>
<li><strong>Side effects:</strong> Return as data, execute after persistence, use idempotency keys</li>
<li><strong>Testing:</strong> Test all paths from initial to terminal, verify guards, check race conditions</li>
<li><strong>Production concerns:</strong> Optimistic locking, timeout handling, duplicate event detection</li>
</ul>
</div>
