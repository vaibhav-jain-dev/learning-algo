# Bridge Pattern

## Overview

The Bridge pattern separates an abstraction from its implementation, allowing them to vary independently. It prevents a "Cartesian product" explosion of classes when you have multiple dimensions of variation. Instead of creating every possible combination, you compose abstraction and implementation at runtime.

**Difficulty:** Intermediate-Advanced
**Category:** Structural Pattern
**First Documented:** GoF (1994)

---

## Simple Explanation: The Remote Control Analogy

<div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">
  <h3 style="color: #1e293b; margin-top: 0; font-size: 1.3rem;">Think of Universal Remote Controls</h3>

  <p style="color: #334155; font-size: 1rem; line-height: 1.7;">
    Imagine you have different types of remotes (basic, advanced) and different devices (TV, radio, streaming box). Without the Bridge pattern, you'd need:
  </p>

  <div style="background: #fef2f2; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #ef4444;">
    <strong style="color: #dc2626;">Without Bridge (Class Explosion):</strong>
    <div style="color: #7f1d1d; font-size: 0.9rem; margin-top: 8px;">
      BasicTVRemote, BasicRadioRemote, BasicStreamingRemote,<br>
        AdvancedTVRemote, AdvancedRadioRemote, AdvancedStreamingRemote<br>
          <strong>= 6 classes (2 remotes x 3 devices)</strong>
        </div>
      </div>

      <div style="background: #dcfce7; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #22c55e;">
        <strong style="color: #166534;">With Bridge (Composition):</strong>
        <div style="color: #14532d; font-size: 0.9rem; margin-top: 8px;">
          2 Remote classes + 3 Device classes<br>
            <strong>= 5 classes total, any combination works!</strong>
          </div>
        </div>

        <p style="color: #334155; font-size: 1rem; line-height: 1.7;">
          The <strong>Remote (Abstraction)</strong> doesn't care about the device details. It just calls methods like <code>turnOn()</code>, <code>setVolume()</code>. The <strong>Device (Implementation)</strong> handles the specifics.
        </p>

        <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 16px;">
          <strong style="color: #0f172a;">The Key Insight:</strong>
          <span style="color: #334155;"> Bridge decouples "what you want to do" (abstraction) from "how it's done" (implementation). You can add new remotes or new devices without changing the other side.</span>
        </div>
      </div>

      ---

      ## Real Company Usage

      <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #e2e8f0;">

        | Company | How They Use Bridge Pattern |
        |---------|----------------------------|
        | **JDBC (Java)** | Driver interface (Bridge) connects to different databases (MySQL, PostgreSQL, Oracle) |
        | **Graphics Libraries** | Shapes (abstraction) render through different backends (OpenGL, DirectX, Vulkan) |
        | **Notification Systems** | Notification types (urgent, normal) sent via different channels (email, SMS, push) |
        | **Cloud Providers** | Storage abstraction works with S3, GCS, Azure Blob implementations |
        | **Payment Systems** | Payment methods (card, wallet) process through different gateways (Stripe, PayPal) |
        | **Logging Frameworks** | Logger levels (debug, info) output to different destinations (file, console, remote) |

      </div>

      ---

      ## The Class Explosion Problem

      <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">
        <h4 style="color: #1e293b; margin-top: 0; text-align: center; font-size: 1.1rem;">Why Bridge Matters: Avoiding Class Explosion</h4>

        <p style="color: #334155; text-align: center; margin-bottom: 20px;">
          Imagine shapes that need to be drawn in different colors:
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">

          <!-- Without Bridge -->
          <div style="background: #fef2f2; border-radius: 12px; padding: 20px; border: 1px solid #fecaca;">
            <h5 style="color: #dc2626; margin-top: 0;">Without Bridge (Inheritance)</h5>
            <div style="font-family: monospace; font-size: 0.8rem; color: #7f1d1d; line-height: 1.8;">
              Shape<br>
                ├── RedCircle<br>
                  ├── BlueCircle<br>
                    ├── GreenCircle<br>
                      ├── RedSquare<br>
                        ├── BlueSquare<br>
                          ├── GreenSquare<br>
                            ├── RedTriangle<br>
                              ├── BlueTriangle<br>
                                └── GreenTriangle<br>
                                </div>
                                <div style="background: #fee2e2; padding: 10px; border-radius: 6px; margin-top: 12px; text-align: center; color: #991b1b; font-weight: 600;">
                                  3 shapes x 3 colors = 9 classes
                                </div>
                                <div style="color: #b91c1c; font-size: 0.85rem; margin-top: 8px;">
                                  Add 1 color? +3 classes<br>
                                    Add 1 shape? +3 classes
                                  </div>
                                </div>

                                <!-- With Bridge -->
                                <div style="background: #dcfce7; border-radius: 12px; padding: 20px; border: 1px solid #bbf7d0;">
                                  <h5 style="color: #166534; margin-top: 0;">With Bridge (Composition)</h5>
                                  <div style="font-family: monospace; font-size: 0.8rem; color: #14532d; line-height: 1.8;">
                                    Shape (has Color)<br>
                                      ├── Circle<br>
                                        ├── Square<br>
                                          └── Triangle<br>
                                            <br>
                                              Color (interface)<br>
                                                ├── Red<br>
                                                  ├── Blue<br>
                                                    └── Green<br>
                                                    </div>
                                                    <div style="background: #bbf7d0; padding: 10px; border-radius: 6px; margin-top: 12px; text-align: center; color: #166534; font-weight: 600;">
                                                      3 shapes + 3 colors = 6 classes
                                                    </div>
                                                    <div style="color: #15803d; font-size: 0.85rem; margin-top: 8px;">
                                                      Add 1 color? +1 class<br>
                                                        Add 1 shape? +1 class
                                                      </div>
                                                    </div>

                                                  </div>
                                                </div>

                                                ---

                                                ## Pattern Structure

                                                <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 32px; margin: 24px 0; border: 1px solid #cbd5e1;">
                                                  <h4 style="color: #1e293b; margin-top: 0; text-align: center; font-size: 1.1rem;">Bridge Pattern Structure</h4>

                                                  <div style="display: flex; justify-content: center; gap: 60px; flex-wrap: wrap; margin: 24px 0;">

                                                    <!-- Abstraction Side -->
                                                    <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
                                                      <div style="color: #3b82f6; font-weight: 600; font-size: 0.9rem;">ABSTRACTION</div>

                                                      <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 12px; width: 200px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);">
                                                        <div style="background: #3b82f6; color: white; padding: 12px; font-weight: 700; text-align: center; border-radius: 10px 10px 0 0;">Abstraction</div>
                                                        <div style="padding: 16px; color: #1e3a8a; font-size: 0.85rem;">
                                                          <code>- implementation</code><br>
                                                            <code>+ operation()</code>
                                                          </div>
                                                        </div>

                                                        <div style="color: #3b82f6; font-size: 1.5rem;">&#9651;</div>

                                                        <div style="background: #eff6ff; border: 2px solid #93c5fd; border-radius: 12px; width: 200px;">
                                                          <div style="background: #93c5fd; color: #1e40af; padding: 10px; font-weight: 700; text-align: center; border-radius: 10px 10px 0 0; font-size: 0.9rem;">RefinedAbstraction</div>
                                                          <div style="padding: 12px; color: #1e40af; font-size: 0.85rem;">
                                                            <code>+ extendedOp()</code>
                                                          </div>
                                                        </div>
                                                      </div>

                                                      <!-- Bridge Arrow -->
                                                      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding-top: 40px;">
                                                        <div style="color: #64748b; font-size: 0.8rem; margin-bottom: 4px;">has-a</div>
                                                        <div style="color: #64748b; font-size: 2rem;">&#8594;</div>
                                                        <div style="color: #64748b; font-size: 0.8rem; margin-top: 4px;">(bridge)</div>
                                                      </div>

                                                      <!-- Implementation Side -->
                                                      <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
                                                        <div style="color: #22c55e; font-weight: 600; font-size: 0.9rem;">IMPLEMENTATION</div>

                                                        <div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 12px; width: 200px; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15);">
                                                          <div style="background: #22c55e; color: white; padding: 12px; font-weight: 700; text-align: center; border-radius: 10px 10px 0 0;">Implementor</div>
                                                          <div style="padding: 16px; color: #166534; font-size: 0.85rem;">
                                                            <code>+ operationImpl()</code>
                                                          </div>
                                                        </div>

                                                        <div style="color: #22c55e; font-size: 1.5rem;">&#9651;</div>

                                                        <div style="display: flex; gap: 12px;">
                                                          <div style="background: #f0fdf4; border: 2px solid #86efac; border-radius: 10px; padding: 12px; color: #166534; font-size: 0.8rem; text-align: center;">
                                                            ConcreteImplA
                                                          </div>
                                                          <div style="background: #f0fdf4; border: 2px solid #86efac; border-radius: 10px; padding: 12px; color: #166534; font-size: 0.8rem; text-align: center;">
                                                            ConcreteImplB
                                                          </div>
                                                        </div>
                                                      </div>

                                                    </div>

                                                    <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 16px;">
                                                      <strong style="color: #0f172a;">Flow:</strong>
                                                      <span style="color: #334155;"> Abstraction holds a reference to Implementor. When client calls <code>operation()</code>, Abstraction delegates to <code>implementation.operationImpl()</code>.</span>
                                                    </div>
                                                  </div>

                                                  ---

                                                  ## When to Use Bridge Pattern

                                                  <div style="background: #dcfce7; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">

                                                    ### Good Use Cases

                                                    1. **Two Dimensions of Variation** - When both abstraction and implementation can change
                                                    2. **Avoiding Class Explosion** - M abstractions x N implementations would create M*N classes
                                                    3. **Runtime Binding** - Need to switch implementations at runtime
                                                    4. **Cross-Platform Code** - Same abstraction, different platform implementations
                                                    5. **Database Drivers** - Same query interface, different database backends
                                                    6. **UI Themes** - Same components, different rendering engines

                                                  </div>

                                                  ---

                                                  ## Anti-Patterns: When NOT to Use

                                                  <div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">

                                                    ### Common Mistakes

                                                    1. **Single Dimension** - If only implementation varies, use simple Strategy pattern
                                                    2. **Stable Abstraction** - If abstraction won't change, inheritance might be simpler
                                                    3. **Over-Abstraction** - Adding bridge for hypothetical future flexibility
                                                    4. **Confusion with Adapter** - Adapter makes interfaces compatible; Bridge separates concerns

                                                  </div>

                                                  ```python
                                                  # OVERKILL: Bridge for single implementation
                                                  class ShapeAbstraction:
                                                  def __init__(self, impl):
                                                  self.impl = impl

                                                  class OnlyOneRenderer:  # Only one implementation exists!
                                                  def render(self): pass

                                                  # BETTER: Just use direct implementation
                                                  class Shape:
                                                  def render(self): pass
                                                  ```

                                                  ---

                                                  ## Python Implementation

                                                  ### Classic Bridge: Notification System

                                                  ```python
                                                  from abc import ABC, abstractmethod
                                                  from dataclasses import dataclass
                                                  from typing import List, Optional
                                                  from datetime import datetime
                                                  from enum import Enum


                                                  # Implementation Interface
                                                  class NotificationSender(ABC):
                                                  """
                                                  Implementation hierarchy - HOW to send notifications.
                                                  Each sender knows the details of one delivery channel.
                                                  """

                                                  @abstractmethod
                                                  def send(self, recipient: str, title: str, message: str) -> bool:
                                                  """Send notification through this channel."""
                                                  pass

                                                  @abstractmethod
                                                  def supports_attachments(self) -> bool:
                                                  """Check if this channel supports attachments."""
                                                  pass


                                                  # Concrete Implementations
                                                  class EmailSender(NotificationSender):
                                                  """Send notifications via email."""

                                                  def __init__(self, smtp_host: str, smtp_port: int = 587):
                                                  self.smtp_host = smtp_host
                                                  self.smtp_port = smtp_port

                                                  def send(self, recipient: str, title: str, message: str) -> bool:
                                                  print(f"[EMAIL] To: {recipient}")
                                                  print(f"[EMAIL] Subject: {title}")
                                                  print(f"[EMAIL] Body: {message[:50]}...")
                                                  # In production: actual SMTP sending
                                                  return True

                                                  def supports_attachments(self) -> bool:
                                                  return True


                                                  class SMSSender(NotificationSender):
                                                  """Send notifications via SMS."""

                                                  def __init__(self, api_key: str, from_number: str):
                                                  self.api_key = api_key
                                                  self.from_number = from_number

                                                  def send(self, recipient: str, title: str, message: str) -> bool:
                                                  # SMS combines title and message due to length limits
                                                  sms_text = f"{title}: {message}"[:160]
                                                  print(f"[SMS] To: {recipient}")
                                                  print(f"[SMS] From: {self.from_number}")
                                                  print(f"[SMS] Text: {sms_text}")
                                                  return True

                                                  def supports_attachments(self) -> bool:
                                                  return False  # SMS doesn't support attachments


                                                  class PushNotificationSender(NotificationSender):
                                                  """Send push notifications to mobile devices."""

                                                  def __init__(self, fcm_key: str):
                                                  self.fcm_key = fcm_key

                                                  def send(self, recipient: str, title: str, message: str) -> bool:
                                                  print(f"[PUSH] Device: {recipient}")
                                                  print(f"[PUSH] Title: {title}")
                                                  print(f"[PUSH] Body: {message[:100]}")
                                                  return True

                                                  def supports_attachments(self) -> bool:
                                                  return False


                                                  class SlackSender(NotificationSender):
                                                  """Send notifications to Slack channels."""

                                                  def __init__(self, webhook_url: str):
                                                  self.webhook_url = webhook_url

                                                  def send(self, recipient: str, title: str, message: str) -> bool:
                                                  print(f"[SLACK] Channel: {recipient}")
                                                  print(f"[SLACK] *{title}*")
                                                  print(f"[SLACK] {message}")
                                                  return True

                                                  def supports_attachments(self) -> bool:
                                                  return True


                                                  # Abstraction
                                                  class Notification(ABC):
                                                  """
                                                  Abstraction hierarchy - WHAT kind of notification.
                                                  Knows about notification semantics, not delivery details.
                                                  """

                                                  def __init__(self, sender: NotificationSender):
                                                  self._sender = sender

                                                  @abstractmethod
                                                  def notify(self, recipient: str, **kwargs) -> bool:
                                                  """Send the notification."""
                                                  pass


                                                  # Refined Abstractions
                                                  class AlertNotification(Notification):
                                                  """Urgent alert that requires immediate attention."""

                                                  def __init__(self, sender: NotificationSender, severity: str = "HIGH"):
                                                  super().__init__(sender)
                                                  self.severity = severity

                                                  def notify(self, recipient: str, title: str, message: str,
                                                  error_code: Optional[str] = None) -> bool:
                                                  # Format as alert
                                                  alert_title = f"[{self.severity}] ALERT: {title}"
                                                  alert_message = message
                                                  if error_code:
                                                  alert_message += f"\n\nError Code: {error_code}"
                                                  alert_message += f"\n\nTime: {datetime.now().isoformat()}"

                                                  return self._sender.send(recipient, alert_title, alert_message)


                                                  class ReminderNotification(Notification):
                                                  """Friendly reminder notification."""

                                                  def notify(self, recipient: str, title: str, message: str,
                                                  due_date: Optional[datetime] = None) -> bool:
                                                  reminder_title = f"Reminder: {title}"
                                                  reminder_message = message
                                                  if due_date:
                                                  reminder_message += f"\n\nDue: {due_date.strftime('%Y-%m-%d %H:%M')}"

                                                  return self._sender.send(recipient, reminder_title, reminder_message)


                                                  class PromotionalNotification(Notification):
                                                  """Marketing promotional notification."""

                                                  def __init__(self, sender: NotificationSender, campaign_id: str):
                                                  super().__init__(sender)
                                                  self.campaign_id = campaign_id

                                                  def notify(self, recipient: str, title: str, message: str,
                                                  discount_code: Optional[str] = None) -> bool:
                                                  promo_title = f"Special Offer: {title}"
                                                  promo_message = message
                                                  if discount_code:
                                                  promo_message += f"\n\nUse code: {discount_code}"
                                                  promo_message += f"\n\n[Campaign: {self.campaign_id}]"

                                                  return self._sender.send(recipient, promo_title, promo_message)


                                                  class DigestNotification(Notification):
                                                  """Aggregated digest of multiple items."""

                                                  def notify(self, recipient: str, title: str,
                                                  items: List[str]) -> bool:
                                                  digest_title = f"Daily Digest: {title}"
                                                  digest_message = "Here's your summary:\n\n"
                                                  for i, item in enumerate(items, 1):
                                                  digest_message += f"{i}. {item}\n"

                                                  return self._sender.send(recipient, digest_title, digest_message)


                                                  # Usage - any notification type can use any sender
                                                  print("=== Alert via Email ===")
                                                  email_sender = EmailSender("smtp.company.com")
                                                  alert = AlertNotification(email_sender, severity="CRITICAL")
                                                  alert.notify(
                                                  "ops-team@company.com",
                                                  title="Database Connection Failed",
                                                  message="Primary database is not responding",
                                                  error_code="DB-001"
                                                  )

                                                  print("\n=== Reminder via SMS ===")
                                                  sms_sender = SMSSender("api_key_123", "+1555123456")
                                                  reminder = ReminderNotification(sms_sender)
                                                  reminder.notify(
                                                  "+1555987654",
                                                  title="Team Meeting",
                                                  message="Don't forget the quarterly review",
                                                  due_date=datetime(2024, 3, 15, 14, 0)
                                                  )

                                                  print("\n=== Promotion via Push ===")
                                                  push_sender = PushNotificationSender("fcm_key_abc")
                                                  promo = PromotionalNotification(push_sender, campaign_id="SPRING2024")
                                                  promo.notify(
                                                  "device_token_xyz",
                                                  title="Spring Sale!",
                                                  message="Get 30% off all items this weekend",
                                                  discount_code="SPRING30"
                                                  )

                                                  print("\n=== Digest via Slack ===")
                                                  slack_sender = SlackSender("https://hooks.slack.com/...")
                                                  digest = DigestNotification(slack_sender)
                                                  digest.notify(
                                                  "#daily-updates",
                                                  title="Repository Activity",
                                                  items=["5 new pull requests", "12 issues closed", "3 releases published"]
                                                  )
                                                  ```

                                                  ### Production Example: Database Abstraction

                                                  ```python
                                                  from abc import ABC, abstractmethod
                                                  from typing import Dict, List, Any, Optional
                                                  from dataclasses import dataclass
                                                  import json


                                                  @dataclass
                                                  class QueryResult:
                                                  """Standardized query result."""
                                                  rows: List[Dict[str, Any]]
                                                  affected_count: int
                                                  execution_time_ms: float


                                                  # Implementation Interface
                                                  class DatabaseDriver(ABC):
                                                  """
                                                  Implementation - database-specific operations.
                                                  Each driver knows how to communicate with one database type.
                                                  """

                                                  @abstractmethod
                                                  def connect(self, connection_string: str) -> bool:
                                                  pass

                                                  @abstractmethod
                                                  def disconnect(self) -> None:
                                                  pass

                                                  @abstractmethod
                                                  def execute_query(self, sql: str, params: tuple = ()) -> QueryResult:
                                                  pass

                                                  @abstractmethod
                                                  def execute_many(self, sql: str, params_list: List[tuple]) -> int:
                                                  pass

                                                  @abstractmethod
                                                  def begin_transaction(self) -> None:
                                                  pass

                                                  @abstractmethod
                                                  def commit(self) -> None:
                                                  pass

                                                  @abstractmethod
                                                  def rollback(self) -> None:
                                                  pass


                                                  # Concrete Implementation: PostgreSQL
                                                  class PostgreSQLDriver(DatabaseDriver):
                                                  """PostgreSQL-specific implementation."""

                                                  def __init__(self):
                                                  self._connection = None

                                                  def connect(self, connection_string: str) -> bool:
                                                  print(f"[PostgreSQL] Connecting to {connection_string}")
                                                  # In production: psycopg2.connect(connection_string)
                                                  self._connection = {"type": "postgresql", "connected": True}
                                                  return True

                                                  def disconnect(self) -> None:
                                                  print("[PostgreSQL] Disconnecting")
                                                  self._connection = None

                                                  def execute_query(self, sql: str, params: tuple = ()) -> QueryResult:
                                                  print(f"[PostgreSQL] Executing: {sql}")
                                                  print(f"[PostgreSQL] Params: {params}")
                                                  # Simulated result
                                                  return QueryResult(
                                                  rows=[{"id": 1, "name": "test"}],
                                                  affected_count=1,
                                                  execution_time_ms=5.2
                                                  )

                                                  def execute_many(self, sql: str, params_list: List[tuple]) -> int:
                                                  print(f"[PostgreSQL] Batch executing {len(params_list)} rows")
                                                  return len(params_list)

                                                  def begin_transaction(self) -> None:
                                                  print("[PostgreSQL] BEGIN TRANSACTION")

                                                  def commit(self) -> None:
                                                  print("[PostgreSQL] COMMIT")

                                                  def rollback(self) -> None:
                                                  print("[PostgreSQL] ROLLBACK")


                                                  # Concrete Implementation: SQLite
                                                  class SQLiteDriver(DatabaseDriver):
                                                  """SQLite-specific implementation."""

                                                  def __init__(self):
                                                  self._connection = None

                                                  def connect(self, connection_string: str) -> bool:
                                                  print(f"[SQLite] Opening database: {connection_string}")
                                                  self._connection = {"type": "sqlite", "file": connection_string}
                                                  return True

                                                  def disconnect(self) -> None:
                                                  print("[SQLite] Closing database")
                                                  self._connection = None

                                                  def execute_query(self, sql: str, params: tuple = ()) -> QueryResult:
                                                  print(f"[SQLite] Executing: {sql}")
                                                  return QueryResult(
                                                  rows=[{"id": 1, "value": "sqlite_test"}],
                                                  affected_count=1,
                                                  execution_time_ms=1.0
                                                  )

                                                  def execute_many(self, sql: str, params_list: List[tuple]) -> int:
                                                  print(f"[SQLite] executemany with {len(params_list)} items")
                                                  return len(params_list)

                                                  def begin_transaction(self) -> None:
                                                  print("[SQLite] BEGIN")

                                                  def commit(self) -> None:
                                                  print("[SQLite] COMMIT")

                                                  def rollback(self) -> None:
                                                  print("[SQLite] ROLLBACK")


                                                  # Abstraction
                                                  class Repository(ABC):
                                                  """
                                                  Abstraction - high-level data access patterns.
                                                  Knows about domain concepts, not database specifics.
                                                  """

                                                  def __init__(self, driver: DatabaseDriver, connection_string: str):
                                                  self._driver = driver
                                                  self._connection_string = connection_string
                                                  self._connected = False

                                                  def __enter__(self):
                                                  self._driver.connect(self._connection_string)
                                                  self._connected = True
                                                  return self

                                                  def __exit__(self, exc_type, exc_val, exc_tb):
                                                  if exc_type:
                                                  self._driver.rollback()
                                                  self._driver.disconnect()
                                                  self._connected = False

                                                  @abstractmethod
                                                  def find_by_id(self, id: int) -> Optional[Dict]:
                                                  pass

                                                  @abstractmethod
                                                  def find_all(self, limit: int = 100) -> List[Dict]:
                                                  pass

                                                  @abstractmethod
                                                  def save(self, entity: Dict) -> int:
                                                  pass


                                                  # Refined Abstraction: User Repository
                                                  class UserRepository(Repository):
                                                  """User-specific data access."""

                                                  def find_by_id(self, id: int) -> Optional[Dict]:
                                                  result = self._driver.execute_query(
                                                  "SELECT * FROM users WHERE id = %s",
                                                  (id,)
                                                  )
                                                  return result.rows[0] if result.rows else None

                                                  def find_all(self, limit: int = 100) -> List[Dict]:
                                                  result = self._driver.execute_query(
                                                  "SELECT * FROM users LIMIT %s",
                                                  (limit,)
                                                  )
                                                  return result.rows

                                                  def find_by_email(self, email: str) -> Optional[Dict]:
                                                  result = self._driver.execute_query(
                                                  "SELECT * FROM users WHERE email = %s",
                                                  (email,)
                                                  )
                                                  return result.rows[0] if result.rows else None

                                                  def save(self, entity: Dict) -> int:
                                                  if "id" in entity:
                                                  self._driver.execute_query(
                                                  "UPDATE users SET name=%s, email=%s WHERE id=%s",
                                                  (entity["name"], entity["email"], entity["id"])
                                                  )
                                                  return entity["id"]
                                                  else:
                                                  result = self._driver.execute_query(
                                                  "INSERT INTO users (name, email) VALUES (%s, %s) RETURNING id",
                                                  (entity["name"], entity["email"])
                                                  )
                                                  return result.rows[0]["id"]


                                                  # Refined Abstraction: Audit Log Repository
                                                  class AuditLogRepository(Repository):
                                                  """Audit log data access with specialized methods."""

                                                  def find_by_id(self, id: int) -> Optional[Dict]:
                                                  result = self._driver.execute_query(
                                                  "SELECT * FROM audit_logs WHERE id = %s",
                                                  (id,)
                                                  )
                                                  return result.rows[0] if result.rows else None

                                                  def find_all(self, limit: int = 100) -> List[Dict]:
                                                  result = self._driver.execute_query(
                                                  "SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT %s",
                                                  (limit,)
                                                  )
                                                  return result.rows

                                                  def find_by_user(self, user_id: int, limit: int = 50) -> List[Dict]:
                                                  result = self._driver.execute_query(
                                                  "SELECT * FROM audit_logs WHERE user_id = %s ORDER BY created_at DESC LIMIT %s",
                                                  (user_id, limit)
                                                  )
                                                  return result.rows

                                                  def save(self, entity: Dict) -> int:
                                                  result = self._driver.execute_query(
                                                  "INSERT INTO audit_logs (user_id, action, details) VALUES (%s, %s, %s) RETURNING id",
                                                  (entity["user_id"], entity["action"], json.dumps(entity.get("details", {})))
                                                  )
                                                  return result.rows[0]["id"]


                                                  # Usage - same repository code works with any database
                                                  print("=== PostgreSQL in Production ===")
                                                  pg_driver = PostgreSQLDriver()
                                                  with UserRepository(pg_driver, "postgresql://localhost/myapp") as user_repo:
                                                  user = user_repo.find_by_email("alice@example.com")
                                                  user_repo.save({"name": "Alice", "email": "alice@example.com"})

                                                  print("\n=== SQLite in Testing ===")
                                                  sqlite_driver = SQLiteDriver()
                                                  with UserRepository(sqlite_driver, ":memory:") as user_repo:
                                                  user = user_repo.find_by_id(1)
                                                  user_repo.save({"name": "Test User", "email": "test@example.com"})
                                                  ```

                                                  ---

                                                  ## Bridge vs Related Patterns

                                                  <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 28px; margin: 24px 0; border: 1px solid #cbd5e1;">

                                                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">

                                                      <div style="background: #dbeafe; padding: 20px; border-radius: 12px; border-top: 4px solid #3b82f6;">
                                                        <h4 style="color: #1e40af; margin-top: 0;">Bridge</h4>
                                                        <p style="color: #1e3a8a; font-size: 0.9rem; margin-bottom: 12px;">Separates abstraction from implementation.</p>
                                                        <div style="background: #eff6ff; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
                                                          <strong style="color: #1e40af;">Purpose:</strong> <span style="color: #1e3a8a;">Decouple two hierarchies</span><br>
                                                            <strong style="color: #1e40af;">When:</strong> <span style="color: #1e3a8a;">Both sides vary independently</span>
                                                          </div>
                                                        </div>

                                                        <div style="background: #dcfce7; padding: 20px; border-radius: 12px; border-top: 4px solid #22c55e;">
                                                          <h4 style="color: #166534; margin-top: 0;">Strategy</h4>
                                                          <p style="color: #14532d; font-size: 0.9rem; margin-bottom: 12px;">Swaps algorithms at runtime.</p>
                                                          <div style="background: #f0fdf4; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
                                                            <strong style="color: #166534;">Purpose:</strong> <span style="color: #14532d;">Algorithm variation</span><br>
                                                              <strong style="color: #166534;">When:</strong> <span style="color: #14532d;">Only implementation varies</span>
                                                            </div>
                                                          </div>

                                                          <div style="background: #fef3c7; padding: 20px; border-radius: 12px; border-top: 4px solid #f59e0b;">
                                                            <h4 style="color: #92400e; margin-top: 0;">Adapter</h4>
                                                            <p style="color: #78350f; font-size: 0.9rem; margin-bottom: 12px;">Makes interfaces compatible.</p>
                                                            <div style="background: #fffbeb; padding: 12px; border-radius: 6px; font-size: 0.85rem;">
                                                              <strong style="color: #92400e;">Purpose:</strong> <span style="color: #78350f;">Interface conversion</span><br>
                                                                <strong style="color: #92400e;">When:</strong> <span style="color: #78350f;">After design (retrofit)</span>
                                                              </div>
                                                            </div>

                                                          </div>

                                                          <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 20px;">
                                                            <strong style="color: #0f172a;">Key Distinction:</strong>
                                                            <ul style="color: #334155; margin-bottom: 0;">
                                                              <li><strong>Bridge:</strong> Designed upfront to separate abstraction from implementation</li>
                                                              <li><strong>Adapter:</strong> Applied after the fact to make things work together</li>
                                                              <li><strong>Strategy:</strong> Single hierarchy with swappable algorithms</li>
                                                            </ul>
                                                          </div>
                                                        </div>

                                                        ---

                                                        ## Interview Questions

                                                        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #e2e8f0;">

                                                          ### Conceptual Questions

                                                          <details style="margin-bottom: 12px;">
                                                            <summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q1: What problem does Bridge solve that inheritance cannot?</summary>
                                                            <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
                                                              <strong>The Class Explosion Problem:</strong>
                                                              <br><br>
                                                                  With inheritance, if you have M abstractions and N implementations, you need M x N classes:
                                                                  <ul>
                                                                    <li>3 shapes x 4 colors = 12 classes</li>
                                                                    <li>Add 1 color = 3 more classes</li>
                                                                  </ul>

                                                                  With Bridge (composition), you need M + N classes:
                                                                  <ul>
                                                                    <li>3 shapes + 4 colors = 7 classes</li>
                                                                    <li>Add 1 color = 1 more class</li>
                                                                  </ul>

                                                                  <strong>Additional benefits:</strong>
                                                                  <ul>
                                                                    <li>Can change implementation at runtime</li>
                                                                    <li>Abstraction and implementation can evolve independently</li>
                                                                    <li>Better adherence to Single Responsibility Principle</li>
                                                                  </ul>
                                                                </div>
                                                              </details>

                                                              <details style="margin-bottom: 12px;">
                                                                <summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q2: How is Bridge different from Strategy?</summary>
                                                                <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
                                                                  <strong>Strategy:</strong> Single dimension of variation (just algorithms)
                                                                  <pre style="background: #e2e8f0; padding: 12px; border-radius: 6px; margin: 8px 0;">
                                                                    Context --uses--> Strategy
                                                                    |
                                                                    +------+------+
                                                                    |             |
                                                                    StrategyA     StrategyB
                                                                  </pre>

                                                                  <strong>Bridge:</strong> Two dimensions of variation (abstraction AND implementation)
                                                                  <pre style="background: #e2e8f0; padding: 12px; border-radius: 6px; margin: 8px 0;">
                                                                    Abstraction --has--> Implementor
                                                                    |                    |
                                                                    +-----+-----+        +-----+-----+
                                                                    |                    |
                                                                    RefinedA  RefinedB    ImplA    ImplB
                                                                  </pre>

                                                                  <strong>Rule of thumb:</strong> If your abstraction hierarchy is just Context with no subclasses, you probably want Strategy, not Bridge.
                                                                </div>
                                                              </details>

                                                              <details style="margin-bottom: 12px;">
                                                                <summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q3: When would you choose Bridge over Adapter?</summary>
                                                                <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
                                                                  <strong>Bridge:</strong> Use during initial design
                                                                  <ul>
                                                                    <li>You anticipate multiple abstractions AND implementations</li>
                                                                    <li>You want to decouple two hierarchies from the start</li>
                                                                    <li>Both sides will evolve independently</li>
                                                                  </ul>

                                                                  <strong>Adapter:</strong> Use after the fact
                                                                  <ul>
                                                                    <li>You have existing incompatible interfaces</li>
                                                                    <li>You're integrating legacy code or third-party libraries</li>
                                                                    <li>You want to make something work without modifying it</li>
                                                                  </ul>

                                                                  <strong>Key difference:</strong> Bridge is intentional separation; Adapter is a compatibility fix.
                                                                </div>
                                                              </details>

                                                              ### Coding Questions

                                                              <details style="margin-bottom: 12px;">
                                                                <summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q4: Design a logging system using Bridge</summary>
                                                                <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
                                                                  <pre style="background: #e2e8f0; padding: 12px; border-radius: 6px; overflow-x: auto;">
                                                                    # Implementation - WHERE to log
                                                                    class LogOutput(ABC):
                                                                    @abstractmethod
                                                                    def write(self, message: str): pass

                                                                    class FileOutput(LogOutput):
                                                                    def write(self, message): print(f"[FILE] {message}")

                                                                    class ConsoleOutput(LogOutput):
                                                                    def write(self, message): print(f"[CONSOLE] {message}")

                                                                    class RemoteOutput(LogOutput):
                                                                    def write(self, message): print(f"[REMOTE] {message}")

                                                                    # Abstraction - WHAT to log
                                                                    class Logger(ABC):
                                                                    def __init__(self, output: LogOutput):
                                                                    self._output = output

                                                                    @abstractmethod
                                                                    def log(self, message: str): pass

                                                                    class SimpleLogger(Logger):
                                                                    def log(self, message):
                                                                    self._output.write(message)

                                                                    class TimestampLogger(Logger):
                                                                    def log(self, message):
                                                                    from datetime import datetime
                                                                    self._output.write(f"[{datetime.now()}] {message}")

                                                                    # Usage
                                                                    logger = TimestampLogger(FileOutput())
                                                                    logger.log("Application started")
                                                                  </pre>
                                                                </div>
                                                              </details>

                                                              <details style="margin-bottom: 12px;">
                                                                <summary style="cursor: pointer; font-weight: 600; color: #1e293b; padding: 8px 0;">Q5: How would you test a Bridge implementation?</summary>
                                                                <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 8px; color: #334155;">
                                                                  <strong>Testing strategies:</strong>
                                                                  <ol>
                                                                    <li><strong>Test abstractions with mock implementations:</strong> Verify abstraction calls implementation correctly</li>
                                                                    <li><strong>Test implementations independently:</strong> Unit test each concrete implementation</li>
                                                                    <li><strong>Integration tests:</strong> Test real abstraction + implementation combinations</li>
                                                                  </ol>
                                                                  <pre style="background: #e2e8f0; padding: 12px; border-radius: 6px;">
                                                                    def test_alert_notification_formats_message():
                                                                    mock_sender = Mock(spec=NotificationSender)
                                                                    mock_sender.send.return_value = True

                                                                    alert = AlertNotification(mock_sender, severity="HIGH")
                                                                    alert.notify("user@test.com", "Test", "Message")

                                                                    # Verify abstraction formatted the message
                                                                    call_args = mock_sender.send.call_args
                                                                    assert "[HIGH] ALERT:" in call_args[0][1]

                                                                    def test_email_sender_sends_email():
                                                                    sender = EmailSender("smtp.test.com")
                                                                    result = sender.send("to@test.com", "Subject", "Body")
                                                                    assert result == True
                                                                  </pre>
                                                                </div>
                                                              </details>

                                                            </div>

                                                            ---

                                                            ## Common Mistakes

                                                            <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #fecaca;">

                                                              ### Mistake 1: Bridge Without Two Hierarchies

                                                              ```python
                                                              # BAD: Only implementation varies (use Strategy instead)
                                                              class Report:
                                                              def __init__(self, formatter):
                                                              self.formatter = formatter

                                                              def generate(self, data):
                                                              return self.formatter.format(data)

                                                              # There's no Report hierarchy - just use Strategy!

                                                              # GOOD: Actual Bridge with two hierarchies
                                                              class Report(ABC):  # Abstraction hierarchy
                                                              def __init__(self, formatter):
                                                              self.formatter = formatter

                                                              class SalesReport(Report): pass    # Refined abstraction
                                                              class InventoryReport(Report): pass  # Refined abstraction
                                                              ```

                                                              ### Mistake 2: Leaking Implementation Details

                                                              ```python
                                                              # BAD: Abstraction exposes implementation details
                                                              class Notification:
                                                              def send(self, recipient, message):
                                                              # Exposing SMTP-specific details!
                                                              return self._sender.send_smtp(recipient, message, self.smtp_port)

                                                              # GOOD: Abstraction doesn't know implementation details
                                                              class Notification:
                                                              def send(self, recipient, message):
                                                              return self._sender.send(recipient, message)
                                                              ```

                                                              ### Mistake 3: Tight Coupling in Abstraction

                                                              ```python
                                                              # BAD: Abstraction depends on concrete implementation
                                                              class Notification:
                                                              def __init__(self):
                                                              self._sender = EmailSender()  # Hard-coded!

                                                              # GOOD: Inject the implementation
                                                              class Notification:
                                                              def __init__(self, sender: NotificationSender):
                                                              self._sender = sender
                                                              ```

                                                            </div>

                                                            ---

                                                            ## Key Takeaways

                                                            <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; padding: 24px; margin: 20px 0; border: 1px solid #93c5fd;">

                                                              1. **Bridge = Two Hierarchies** - Abstraction AND Implementation both vary

                                                              2. **Prevents Class Explosion** - M + N classes instead of M x N

                                                              3. **Composition Over Inheritance** - Abstraction holds reference to implementation

                                                              4. **Design-Time Pattern** - Plan for it upfront, unlike Adapter

                                                              5. **Runtime Flexibility** - Can switch implementations without changing abstractions

                                                              6. **Not Always Needed** - If only one dimension varies, use simpler patterns

                                                            </div>

                                                            ---

                                                            ## Related Patterns

                                                            - [Adapter](/topic/design-patterns/adapter) - Makes interfaces compatible (after the fact)
                                                            - [Strategy](/topic/design-patterns/strategy) - Swappable algorithms (single dimension)
                                                            - [Abstract Factory](/topic/design-patterns/abstract-factory) - Can create bridge components
                                                            - [Decorator](/topic/design-patterns/decorator) - Can be combined with Bridge
