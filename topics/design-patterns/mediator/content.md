# Mediator Pattern

## Overview

The Mediator pattern defines an object that encapsulates how a set of objects interact. It promotes loose coupling by preventing objects from referring to each other explicitly, centralizing complex communication logic in a single place. Instead of objects talking directly to each other (many-to-many), they communicate through a mediator (many-to-one-to-many).

**Difficulty:** Intermediate
**Category:** Behavioral Pattern
**Also Known As:** Controller, Coordinator

---

## Simple Explanation: The Air Traffic Control Analogy

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 2px solid #cbd5e1;">
  <div style="font-size: 2.5rem; text-align: center; margin-bottom: 16px;">&#9992;</div>
  <div style="font-size: 1.3rem; font-weight: 700; color: #1e293b; text-align: center; margin-bottom: 12px;">Think of Air Traffic Control</div>
  <div style="color: #334155; font-size: 1rem; line-height: 1.7;">
    Imagine an airport with 50 planes. If every pilot had to coordinate directly with every other pilot, you'd have 2,450 possible communication channels - pure chaos! Instead, all pilots talk to one Air Traffic Controller (ATC). The ATC receives requests, makes decisions, and coordinates everyone. Pilots don't know about each other; they only know the tower. This is the Mediator pattern - a central coordinator that manages complex interactions.
  </div>
  <div style="margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
    <div style="background: #dbeafe; padding: 12px 16px; border-radius: 8px; text-align: center;">
      <div style="color: #1e40af; font-weight: 600;">Pilots</div>
      <div style="color: #3b82f6; font-size: 0.85rem;">Colleagues (participants)</div>
    </div>
    <div style="background: #dcfce7; padding: 12px 16px; border-radius: 8px; text-align: center;">
      <div style="color: #166534; font-weight: 600;">Control Tower</div>
      <div style="color: #22c55e; font-size: 0.85rem;">Mediator (coordinator)</div>
    </div>
    <div style="background: #fef3c7; padding: 12px 16px; border-radius: 8px; text-align: center;">
      <div style="color: #92400e; font-weight: 600;">Radio Messages</div>
      <div style="color: #f59e0b; font-size: 0.85rem;">Communication Protocol</div>
    </div>
    <div style="background: #fce7f3; padding: 12px 16px; border-radius: 8px; text-align: center;">
      <div style="color: #9d174d; font-weight: 600;">Runways</div>
      <div style="color: #ec4899; font-size: 0.85rem;">Shared Resources</div>
    </div>
  </div>
</div>

### The Expert Insight

**Novice thinks:** "Mediator just centralizes all the logic - it's like a god object!"

**Expert knows:** "Mediator trades **coupling complexity** for **mediator complexity**. The key is knowing when this trade-off is worth it. In UI frameworks, form validation, and workflow orchestration, the centralized control is exactly what you need. But if your mediator grows too large, you need multiple specialized mediators."

---

## Real-World Company Usage

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #3b82f6;">
  <div style="font-weight: 700; color: #1e293b; margin-bottom: 12px;">Industry Applications</div>
  <ul style="color: #334155; margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>React/Redux:</strong> Store acts as mediator between components - they dispatch actions, store coordinates state</li>
    <li><strong>Kubernetes:</strong> API Server mediates between controllers, nodes, and pods</li>
    <li><strong>Message Brokers (RabbitMQ, Kafka):</strong> Mediate between producers and consumers</li>
    <li><strong>Chat Applications (Slack, Discord):</strong> Server mediates all user communications</li>
    <li><strong>Operating Systems:</strong> Kernel mediates between user processes and hardware</li>
    <li><strong>MVC Frameworks:</strong> Controller mediates between Model and View</li>
    <li><strong>Microservices API Gateway:</strong> Mediates requests between clients and services</li>
  </ul>
</div>

---

## Pattern Structure

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #e2e8f0;">
  <div style="font-weight: 700; color: #1e293b; text-align: center; margin-bottom: 24px; font-size: 1.2rem;">Mediator Pattern Architecture</div>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
    <!-- Mediator Interface -->
    <div style="background: #f1f5f9; border: 2px dashed #64748b; border-radius: 12px; padding: 16px 32px; text-align: center;">
      <div style="font-weight: 600; color: #475569; font-style: italic;">Mediator (interface)</div>
      <div style="font-size: 0.85rem; color: #64748b; margin-top: 8px; font-family: monospace;">+ notify(sender, event)</div>
    </div>
    <div style="color: #64748b;">implements</div>
    <div style="color: #64748b; font-size: 1.5rem;">&#8595;</div>
    <!-- Concrete Mediator -->
    <div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; padding: 20px 40px; text-align: center;">
      <div style="font-weight: 700; color: #166534; font-size: 1.1rem;">ConcreteMediator</div>
      <div style="font-size: 0.8rem; color: #15803d; margin-top: 8px; font-family: monospace;">- colleagueA<br/>- colleagueB<br/>- colleagueC<br/>+ notify(sender, event)</div>
    </div>
    <!-- Arrows to colleagues -->
    <div style="display: flex; align-items: center; gap: 8px; color: #64748b;">
      <span>&#8601;</span>
      <span>coordinates</span>
      <span>&#8600;</span>
    </div>
    <!-- Colleagues Row -->
    <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">
      <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 10px; padding: 14px 20px; text-align: center; min-width: 120px;">
        <div style="font-weight: 600; color: #1e40af;">ColleagueA</div>
        <div style="font-size: 0.75rem; color: #3b82f6; margin-top: 4px;">knows mediator</div>
      </div>
      <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 10px; padding: 14px 20px; text-align: center; min-width: 120px;">
        <div style="font-weight: 600; color: #92400e;">ColleagueB</div>
        <div style="font-size: 0.75rem; color: #b45309; margin-top: 4px;">knows mediator</div>
      </div>
      <div style="background: #fce7f3; border: 2px solid #ec4899; border-radius: 10px; padding: 14px 20px; text-align: center; min-width: 120px;">
        <div style="font-weight: 600; color: #9d174d;">ColleagueC</div>
        <div style="font-size: 0.75rem; color: #be185d; margin-top: 4px;">knows mediator</div>
      </div>
    </div>
  </div>
</div>

### Without vs With Mediator

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 24px 0;">
  <div style="background: #fef2f2; border-radius: 12px; padding: 20px; border: 1px solid #fecaca;">
    <div style="font-weight: 700; color: #991b1b; margin-bottom: 12px; text-align: center;">Without Mediator</div>
    <div style="color: #334155; font-size: 0.9rem; text-align: center;">
      <div style="font-family: monospace; background: #fee2e2; padding: 12px; border-radius: 8px; margin-top: 8px;">
        A &harr; B<br/>
        A &harr; C<br/>
        B &harr; C<br/>
        <br/>
        n(n-1)/2 connections
      </div>
    </div>
  </div>
  <div style="background: #dcfce7; border-radius: 12px; padding: 20px; border: 1px solid #bbf7d0;">
    <div style="font-weight: 700; color: #166534; margin-bottom: 12px; text-align: center;">With Mediator</div>
    <div style="color: #334155; font-size: 0.9rem; text-align: center;">
      <div style="font-family: monospace; background: #d1fae5; padding: 12px; border-radius: 8px; margin-top: 8px;">
        A &rarr; M<br/>
        B &rarr; M<br/>
        C &rarr; M<br/>
        <br/>
        n connections
      </div>
    </div>
  </div>
</div>

---

## When to Use Mediator Pattern

<div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #22c55e;">
  <div style="font-weight: 700; color: #166534; margin-bottom: 12px;">Perfect Use Cases</div>
  <ul style="color: #334155; margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>Complex UI interactions:</strong> Form fields that depend on each other's values</li>
    <li><strong>Chat rooms/messaging:</strong> Users communicate through a central server</li>
    <li><strong>Workflow orchestration:</strong> Coordinating multiple steps/services</li>
    <li><strong>Event handling systems:</strong> Central dispatcher for events</li>
    <li><strong>Resource scheduling:</strong> Managing shared resources (runways, meeting rooms)</li>
    <li><strong>Game development:</strong> Game manager coordinating players, enemies, and environment</li>
    <li><strong>IoT systems:</strong> Hub coordinating multiple devices</li>
  </ul>
</div>

---

## Anti-Patterns: When NOT to Use

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #ef4444;">
  <div style="font-weight: 700; color: #991b1b; margin-bottom: 12px;">Common Mistakes</div>
  <ul style="color: #334155; margin: 0; padding-left: 20px; line-height: 1.8;">
    <li><strong>God mediator:</strong> Mediator becomes too complex - split into multiple mediators by domain</li>
    <li><strong>Simple cases:</strong> Two objects communicating don't need a mediator - direct reference is fine</li>
    <li><strong>Performance critical paths:</strong> Extra indirection adds latency</li>
    <li><strong>Hiding necessary coupling:</strong> Sometimes objects SHOULD know about each other</li>
    <li><strong>Single point of failure:</strong> Mediator going down kills entire system</li>
  </ul>
</div>

---

## Python Implementation: Chat Room and Auction System

```python
from abc import ABC, abstractmethod
from typing import Dict, List, Optional, Set
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum, auto


# ============================================================
# MEDIATOR INTERFACE
# ============================================================

class ChatMediator(ABC):
    """
    Abstract mediator interface.
    Defines the contract for communication coordination.
    """

    @abstractmethod
    def send_message(self, message: str, sender: 'User', recipient: 'User' = None) -> None:
        """Send a message from sender to recipient (or broadcast if None)."""
        pass

    @abstractmethod
    def add_user(self, user: 'User') -> None:
        """Add a user to the chat."""
        pass

    @abstractmethod
    def remove_user(self, user: 'User') -> None:
        """Remove a user from the chat."""
        pass


# ============================================================
# COLLEAGUE BASE CLASS
# ============================================================

class User(ABC):
    """
    Abstract colleague class.
    Users communicate only through the mediator.
    """

    def __init__(self, username: str, mediator: ChatMediator = None):
        self.username = username
        self.mediator = mediator
        self.is_online = True

    def set_mediator(self, mediator: ChatMediator) -> None:
        """Connect to a mediator."""
        self.mediator = mediator

    def send(self, message: str, recipient: 'User' = None) -> None:
        """Send a message through the mediator."""
        if self.mediator:
            self.mediator.send_message(message, self, recipient)
        else:
            print(f"[{self.username}] Not connected to any chat!")

    @abstractmethod
    def receive(self, message: str, sender: 'User') -> None:
        """Handle a received message."""
        pass


# ============================================================
# CONCRETE COLLEAGUES
# ============================================================

class RegularUser(User):
    """Regular chat user."""

    def receive(self, message: str, sender: 'User') -> None:
        print(f"[{self.username}] Message from {sender.username}: {message}")


class AdminUser(User):
    """Admin user with special privileges."""

    def receive(self, message: str, sender: 'User') -> None:
        print(f"[ADMIN:{self.username}] Message from {sender.username}: {message}")

    def broadcast_announcement(self, message: str) -> None:
        """Send announcement to all users."""
        print(f"[ADMIN:{self.username}] Broadcasting: {message}")
        self.send(f"[ANNOUNCEMENT] {message}")

    def kick_user(self, user: User) -> None:
        """Kick a user from the chat."""
        if self.mediator:
            self.mediator.remove_user(user)
            print(f"[ADMIN:{self.username}] Kicked {user.username}")


class BotUser(User):
    """Automated bot user."""

    def __init__(self, username: str, auto_responses: Dict[str, str] = None):
        super().__init__(username)
        self.auto_responses = auto_responses or {}

    def receive(self, message: str, sender: 'User') -> None:
        print(f"[BOT:{self.username}] Received from {sender.username}: {message}")

        # Auto-respond based on keywords
        message_lower = message.lower()
        for keyword, response in self.auto_responses.items():
            if keyword in message_lower:
                self.send(response, sender)
                break


# ============================================================
# CONCRETE MEDIATOR - Chat Room
# ============================================================

@dataclass
class MessageLog:
    """Log entry for a message."""
    timestamp: datetime
    sender: str
    recipient: Optional[str]
    message: str


class ChatRoom(ChatMediator):
    """
    Concrete mediator implementing a chat room.
    Manages user connections and message routing.
    """

    def __init__(self, name: str):
        self.name = name
        self.users: Dict[str, User] = {}
        self.message_history: List[MessageLog] = []
        self.blocked_users: Set[str] = set()

    def add_user(self, user: User) -> None:
        """Add user and notify others."""
        if user.username in self.blocked_users:
            print(f"[SYSTEM] {user.username} is blocked from {self.name}")
            return

        self.users[user.username] = user
        user.set_mediator(self)

        # Notify all other users
        self._broadcast_system(f"{user.username} joined the chat")
        print(f"[SYSTEM] {user.username} connected to {self.name}")

    def remove_user(self, user: User) -> None:
        """Remove user and notify others."""
        if user.username in self.users:
            del self.users[user.username]
            self._broadcast_system(f"{user.username} left the chat")
            print(f"[SYSTEM] {user.username} disconnected from {self.name}")

    def send_message(self, message: str, sender: User, recipient: User = None) -> None:
        """Route message to recipient or broadcast."""
        # Log the message
        log = MessageLog(
            timestamp=datetime.now(),
            sender=sender.username,
            recipient=recipient.username if recipient else None,
            message=message
        )
        self.message_history.append(log)

        if recipient:
            # Direct message
            if recipient.username in self.users:
                recipient.receive(message, sender)
            else:
                print(f"[SYSTEM] User {recipient.username} not found")
        else:
            # Broadcast to all except sender
            for username, user in self.users.items():
                if user != sender and user.is_online:
                    user.receive(message, sender)

    def _broadcast_system(self, message: str) -> None:
        """Broadcast a system message."""
        for user in self.users.values():
            if user.is_online:
                print(f"[SYSTEM -> {user.username}] {message}")

    def block_user(self, username: str) -> None:
        """Block a user from joining."""
        self.blocked_users.add(username)
        if username in self.users:
            self.remove_user(self.users[username])

    def get_online_users(self) -> List[str]:
        """Get list of online usernames."""
        return [u.username for u in self.users.values() if u.is_online]

    def get_history(self, limit: int = 10) -> List[MessageLog]:
        """Get recent message history."""
        return self.message_history[-limit:]


# ============================================================
# COMPLEX EXAMPLE: Auction System
# ============================================================

class BidStatus(Enum):
    PENDING = auto()
    ACCEPTED = auto()
    REJECTED = auto()
    OUTBID = auto()


@dataclass
class Bid:
    bidder: str
    amount: float
    timestamp: datetime = field(default_factory=datetime.now)
    status: BidStatus = BidStatus.PENDING


class AuctionMediator(ABC):
    """Abstract mediator for auction system."""

    @abstractmethod
    def place_bid(self, bidder: 'Bidder', amount: float) -> BidStatus:
        pass

    @abstractmethod
    def register_bidder(self, bidder: 'Bidder') -> None:
        pass


class Bidder:
    """Participant in an auction."""

    def __init__(self, name: str, budget: float):
        self.name = name
        self.budget = budget
        self.mediator: Optional[AuctionMediator] = None
        self.won_items: List[str] = []

    def set_mediator(self, mediator: AuctionMediator) -> None:
        self.mediator = mediator

    def bid(self, amount: float) -> BidStatus:
        """Place a bid through the mediator."""
        if not self.mediator:
            print(f"[{self.name}] Not registered with any auction!")
            return BidStatus.REJECTED

        if amount > self.budget:
            print(f"[{self.name}] Cannot bid ${amount} - exceeds budget ${self.budget}")
            return BidStatus.REJECTED

        return self.mediator.place_bid(self, amount)

    def notify_outbid(self, new_amount: float) -> None:
        """Called when someone outbids."""
        print(f"[{self.name}] You've been outbid! New highest: ${new_amount}")

    def notify_won(self, item: str, amount: float) -> None:
        """Called when auction is won."""
        self.won_items.append(item)
        self.budget -= amount
        print(f"[{self.name}] Congratulations! You won '{item}' for ${amount}")


class Auction(AuctionMediator):
    """
    Concrete mediator for auction.
    Coordinates bidding between multiple bidders.
    """

    def __init__(self, item: str, starting_price: float, reserve_price: float = None):
        self.item = item
        self.starting_price = starting_price
        self.reserve_price = reserve_price or starting_price
        self.current_price = starting_price
        self.bidders: Dict[str, Bidder] = {}
        self.bids: List[Bid] = []
        self.highest_bidder: Optional[Bidder] = None
        self.is_active = True

    def register_bidder(self, bidder: Bidder) -> None:
        """Register a bidder for this auction."""
        self.bidders[bidder.name] = bidder
        bidder.set_mediator(self)
        print(f"[AUCTION:{self.item}] {bidder.name} registered (budget: ${bidder.budget})")

    def place_bid(self, bidder: Bidder, amount: float) -> BidStatus:
        """Process a bid and notify relevant parties."""
        if not self.is_active:
            print(f"[AUCTION:{self.item}] Auction has ended")
            return BidStatus.REJECTED

        bid = Bid(bidder=bidder.name, amount=amount)

        # Validate bid
        if amount <= self.current_price:
            bid.status = BidStatus.REJECTED
            print(f"[AUCTION:{self.item}] Bid ${amount} rejected - must exceed ${self.current_price}")
            return BidStatus.REJECTED

        # Accept bid
        bid.status = BidStatus.ACCEPTED
        self.bids.append(bid)

        # Notify previous highest bidder
        if self.highest_bidder and self.highest_bidder != bidder:
            self.highest_bidder.notify_outbid(amount)

        # Update state
        self.current_price = amount
        self.highest_bidder = bidder

        print(f"[AUCTION:{self.item}] New highest bid: ${amount} by {bidder.name}")
        return BidStatus.ACCEPTED

    def end_auction(self) -> Optional[Bidder]:
        """End the auction and determine winner."""
        self.is_active = False

        if not self.highest_bidder:
            print(f"[AUCTION:{self.item}] No bids received - auction failed")
            return None

        if self.current_price < self.reserve_price:
            print(f"[AUCTION:{self.item}] Reserve price ${self.reserve_price} not met")
            return None

        # Notify winner
        self.highest_bidder.notify_won(self.item, self.current_price)

        # Notify losers
        for name, bidder in self.bidders.items():
            if bidder != self.highest_bidder:
                print(f"[{name}] Auction ended. Winner: {self.highest_bidder.name}")

        return self.highest_bidder


# ============================================================
# USAGE EXAMPLES
# ============================================================

if __name__ == "__main__":
    print("=" * 60)
    print("CHAT ROOM EXAMPLE")
    print("=" * 60)

    # Create chat room (mediator)
    chat = ChatRoom("General")

    # Create users (colleagues)
    alice = RegularUser("Alice")
    bob = RegularUser("Bob")
    charlie = RegularUser("Charlie")
    admin = AdminUser("Admin")
    bot = BotUser("HelpBot", {"help": "How can I assist you?", "hello": "Hi there!"})

    # Add users to chat
    chat.add_user(alice)
    chat.add_user(bob)
    chat.add_user(charlie)
    chat.add_user(admin)
    chat.add_user(bot)

    print("\n--- Messages ---")
    alice.send("Hello everyone!")
    bob.send("Hi Alice!", alice)  # Direct message
    charlie.send("help")  # Bot will respond
    admin.broadcast_announcement("Server maintenance at 10 PM")

    print("\n--- Online Users ---")
    print(f"Online: {chat.get_online_users()}")

    print("\n" + "=" * 60)
    print("AUCTION EXAMPLE")
    print("=" * 60)

    # Create auction (mediator)
    auction = Auction("Vintage Watch", starting_price=100, reserve_price=150)

    # Create bidders (colleagues)
    john = Bidder("John", budget=500)
    jane = Bidder("Jane", budget=300)
    jack = Bidder("Jack", budget=200)

    # Register bidders
    auction.register_bidder(john)
    auction.register_bidder(jane)
    auction.register_bidder(jack)

    print("\n--- Bidding ---")
    john.bid(110)
    jane.bid(130)
    jack.bid(150)
    john.bid(200)
    jane.bid(250)
    jack.bid(300)  # Exceeds budget

    print("\n--- End Auction ---")
    winner = auction.end_auction()
    if winner:
        print(f"\nFinal winner: {winner.name} with ${auction.current_price}")
```

---

## Mediator vs Facade vs Observer

<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
  <div style="font-weight: 700; color: #1e293b; margin-bottom: 16px;">Common Interview Question: Pattern Comparison</div>
  <table style="width: 100%; border-collapse: collapse; color: #334155;">
    <thead>
      <tr style="background: #e2e8f0;">
        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Aspect</th>
        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Mediator</th>
        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Facade</th>
        <th style="padding: 12px; text-align: left; border: 1px solid #cbd5e1;">Observer</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Purpose</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Coordinate peer communication</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Simplify complex subsystem</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Notify of state changes</td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Direction</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Bidirectional</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Unidirectional (client to subsystem)</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Unidirectional (subject to observers)</td>
      </tr>
      <tr>
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Awareness</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Colleagues know mediator</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Subsystems don't know facade</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Subject doesn't know observers</td>
      </tr>
      <tr style="background: #f8fafc;">
        <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>Example</strong></td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Chat room</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Home theater remote</td>
        <td style="padding: 12px; border: 1px solid #cbd5e1;">Newsletter subscription</td>
      </tr>
    </tbody>
  </table>
</div>

---

## Interview Questions

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q1: How do you prevent the mediator from becoming a God object?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> Several strategies:
1. **Domain-specific mediators:** Split by business domain (UserMediator, OrderMediator)
2. **Chain of mediators:** Hierarchical mediators that delegate
3. **Use events:** Mediator dispatches events instead of direct calls
4. **Single responsibility:** Mediator only routes, doesn't contain business logic
5. **Composition:** Break into smaller coordinator classes

```python
# Bad: God mediator
class AppMediator:
    def handle(self, event):
        if event.type == "user_login": ...
        elif event.type == "order_placed": ...
        elif event.type == "payment_received": ...
        # 50 more event types...

# Good: Domain-specific mediators
class UserMediator: ...
class OrderMediator: ...
class PaymentMediator: ...
```
</div>
</details>

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q2: When would you use Mediator instead of Observer?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong>
- **Mediator:** When objects need bidirectional communication and coordination logic is complex
- **Observer:** When objects only need one-way notification (subject to observers)

Use Mediator when:
- Multiple objects need to communicate with each other (not just observe)
- Communication logic is complex with conditions and sequencing
- You need centralized control over interactions

Use Observer when:
- One object changes, many need to be notified
- Observers don't interact with each other
- Simple publish-subscribe semantics suffice
</div>
</details>

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q3: How would you make a mediator fault-tolerant?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong>
1. **Replicate mediator:** Primary-secondary setup with failover
2. **Message persistence:** Store messages in durable queue
3. **Idempotent handlers:** Allow safe message replay
4. **Circuit breakers:** Protect against cascading failures
5. **Health checks:** Monitor mediator health
6. **Stateless design:** Keep mediator stateless, store state externally

```python
class FaultTolerantMediator:
    def __init__(self):
        self.message_store = PersistentQueue()
        self.circuit_breaker = CircuitBreaker()

    def send_message(self, msg, sender, recipient):
        # Persist first for durability
        msg_id = self.message_store.persist(msg, sender, recipient)

        try:
            if self.circuit_breaker.is_open:
                raise ServiceUnavailable()
            self._deliver(msg, sender, recipient)
            self.message_store.mark_delivered(msg_id)
        except Exception as e:
            self.circuit_breaker.record_failure()
            # Message will be retried from store
```
</div>
</details>

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q4: How does Redux implement the Mediator pattern?</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Answer:</strong> Redux Store acts as mediator:
- **Colleagues:** React components
- **Mediator:** Redux Store
- **Communication:** Actions dispatched to store
- **Coordination:** Reducers process actions, update state
- **Notification:** Store notifies connected components via connect/useSelector

Key insight: Components never communicate directly. They dispatch actions to the store, and the store coordinates state updates and notifications.

```javascript
// Component A (colleague)
dispatch({ type: 'ADD_TO_CART', item: product });

// Store (mediator) - reducer handles coordination
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Update cart, inventory, recommendations, etc.
      return { ...state, cart: [...state.cart, action.item] };
  }
}

// Component B (colleague) - automatically notified via selector
const cart = useSelector(state => state.cart);
```
</div>
</details>

<details style="margin: 12px 0; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
<summary style="font-weight: 600; color: #1e293b; cursor: pointer;">Q5: Design a mediator for a smart home system.</summary>
<div style="margin-top: 12px; color: #334155;">
<strong>Key considerations:</strong>
1. **Devices:** Lights, thermostat, security, music, blinds
2. **Scenes:** "Movie mode" coordinates multiple devices
3. **Automation rules:** "If motion detected after 10pm, turn on lights"
4. **Conflict resolution:** What if user and automation conflict?
5. **Priority levels:** Safety > User > Automation
6. **Offline resilience:** What if hub loses connectivity?

Design: Central Hub as mediator with event-driven rules engine. Devices register capabilities, hub orchestrates based on rules and priorities.
</div>
</details>

---

## Best Practices

<div style="background: #dbeafe; border-radius: 12px; padding: 20px; margin: 20px 0;">
  <div style="font-weight: 700; color: #1e40af; margin-bottom: 12px;">Production Guidelines</div>
  <ol style="color: #334155; margin: 0; padding-left: 20px; line-height: 2;">
    <li><strong>Keep mediator focused:</strong> Single responsibility - only coordination, not business logic</li>
    <li><strong>Use events/messages:</strong> Loose coupling between mediator and colleagues</li>
    <li><strong>Implement logging:</strong> Track all communications for debugging</li>
    <li><strong>Consider async:</strong> Don't block colleagues waiting for mediator</li>
    <li><strong>Handle failures:</strong> What happens if mediator or colleague fails?</li>
    <li><strong>Test in isolation:</strong> Mock mediator when testing colleagues</li>
    <li><strong>Document protocols:</strong> Clear contract for how colleagues interact</li>
  </ol>
</div>

---

## Related Patterns

- [Observer](/topic/design-patterns/observer) - One-way notification vs bidirectional coordination
- [Facade](/topic/design-patterns/facade) - Simplify subsystem access vs coordinate peers
- [Command](/topic/design-patterns/command) - Mediator can route command objects
- [Chain of Responsibility](/topic/design-patterns/chain-of-responsibility) - Alternative for request handling
