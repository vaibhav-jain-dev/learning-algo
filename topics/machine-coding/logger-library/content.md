# Logger Library Design

## Problem Statement

Design a flexible logging library that supports multiple log levels, configurable formatters, multiple output handlers (console, file, network), and filtering capabilities. This should be similar to Python's logging module or Java's Log4j.

This problem tests your understanding of the Strategy pattern, Chain of Responsibility, and designing extensible APIs. It's commonly asked at companies that value clean architecture and system design skills.

---

## Requirements Clarification

### Functional Requirements

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Core Features</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

- **Log Levels**: DEBUG, INFO, WARNING, ERROR, CRITICAL
- **Multiple Handlers**: Console, File, Rotating File, Network
- **Formatters**: Plain text, JSON, custom formats
- **Filtering**: By level, by logger name, by message content
- **Logger Hierarchy**: Child loggers inherit parent configuration
- **Context Support**: Add extra fields to log records

</div>
</div>

### Non-Functional Requirements

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">System Constraints</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

- **Thread Safety**: Safe for concurrent logging
- **Performance**: Minimal overhead when level is disabled
- **Extensibility**: Easy to add new handlers/formatters
- **Configurability**: Programmatic and file-based configuration
- **Async Support**: Non-blocking logging option

</div>
</div>

### Key Questions to Ask

1. Should logging be synchronous or asynchronous?
2. Do we need structured logging (JSON)?
3. What's the expected log volume?
4. Should we support log rotation?
5. Do we need remote logging (syslog, HTTP)?

---

## Architecture Diagram

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Logger Architecture</h4>

<div style="display: flex; flex-direction: column; gap: 24px;">

<!-- Log Flow -->
<div style="background: #ffffff; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px;">
<div style="color: #1e293b; font-weight: bold; font-size: 14px; margin-bottom: 16px; text-align: center;">Log Message Flow</div>
<div style="display: flex; justify-content: center; align-items: center; gap: 12px; flex-wrap: wrap;">
<div style="background: #dbeafe; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: bold; font-size: 11px;">Application</div>
<div style="color: #3b82f6; font-size: 10px;">logger.info()</div>
</div>
<div style="color: #64748b;">-></div>
<div style="background: #dcfce7; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #166534; font-weight: bold; font-size: 11px;">Logger</div>
<div style="color: #22c55e; font-size: 10px;">Level check</div>
</div>
<div style="color: #64748b;">-></div>
<div style="background: #fef3c7; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #92400e; font-weight: bold; font-size: 11px;">Filter</div>
<div style="color: #d97706; font-size: 10px;">Pass/Block</div>
</div>
<div style="color: #64748b;">-></div>
<div style="background: #f3e8ff; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #7c3aed; font-weight: bold; font-size: 11px;">Formatter</div>
<div style="color: #a855f7; font-size: 10px;">Format message</div>
</div>
<div style="color: #64748b;">-></div>
<div style="background: #fee2e2; padding: 12px 16px; border-radius: 8px; text-align: center;">
<div style="color: #991b1b; font-weight: bold; font-size: 11px;">Handler</div>
<div style="color: #dc2626; font-size: 10px;">Output</div>
</div>
</div>
</div>

<!-- Handlers -->
<div style="background: #ffffff; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px;">
<div style="color: #1e293b; font-weight: bold; font-size: 14px; margin-bottom: 16px; text-align: center;">Output Handlers</div>
<div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
<div style="background: #ecfdf5; border: 2px solid #6ee7b7; padding: 14px 20px; border-radius: 8px; text-align: center;">
<div style="color: #166534; font-weight: bold; font-size: 12px;">Console</div>
<div style="color: #22c55e; font-size: 10px;">stdout/stderr</div>
</div>
<div style="background: #eff6ff; border: 2px solid #93c5fd; padding: 14px 20px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: bold; font-size: 12px;">File</div>
<div style="color: #3b82f6; font-size: 10px;">app.log</div>
</div>
<div style="background: #fefce8; border: 2px solid #fcd34d; padding: 14px 20px; border-radius: 8px; text-align: center;">
<div style="color: #854d0e; font-weight: bold; font-size: 12px;">Rotating</div>
<div style="color: #eab308; font-size: 10px;">size/time</div>
</div>
<div style="background: #fdf2f8; border: 2px solid #f9a8d4; padding: 14px 20px; border-radius: 8px; text-align: center;">
<div style="color: #9d174d; font-weight: bold; font-size: 12px;">HTTP</div>
<div style="color: #ec4899; font-size: 10px;">remote</div>
</div>
</div>
</div>

</div>
</div>

---

## Class Design

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 20px 0;">
<h4 style="color: #1e293b; margin: 0 0 20px 0; font-size: 16px;">Class Hierarchy</h4>

```
+------------------+       +------------------+       +------------------+
|    LogLevel      |       |    LogRecord     |       |     Filter       |
+------------------+       +------------------+       +------------------+
| DEBUG = 10       |       | level: LogLevel  |       | + filter(record) |
| INFO = 20        |       | message: str     |       +------------------+
| WARNING = 30     |       | logger_name: str |               ^
| ERROR = 40       |       | timestamp: time  |               |
| CRITICAL = 50    |       | extra: dict      |       +-------+-------+
+------------------+       +------------------+       |               |
                                                  LevelFilter   NameFilter

+------------------+       +------------------+
|    Formatter     |       |     Handler      |
+------------------+       +------------------+
| + format(record) |       | level: LogLevel  |
+------------------+       | formatter: Fmt   |
        ^                  | filters: List    |
        |                  +------------------+
+-------+-------+          | + emit(record)   |
|               |          +------------------+
TextFormatter  JsonFmt             ^
                                   |
                          +--------+--------+
                          |        |        |
                    Console    File    Rotating
```
</div>

### Design Patterns Used

<div style="background: #fefce8; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #eab308;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Applied Patterns</div>

| Pattern | Usage | Benefit |
|---------|-------|---------|
| **Strategy** | Formatters and Handlers | Interchangeable algorithms |
| **Chain of Responsibility** | Filter chain | Flexible filtering |
| **Singleton** | LogManager | Global logger registry |
| **Template Method** | Handler.emit() | Common structure, custom output |
| **Observer** | Logger -> Handlers | Decouple logging from output |

</div>

---

## API Design

### Core Interface

```python
# Getting a logger
logger = LogManager.get_logger("myapp.module")

# Logging methods
logger.debug("Debug message")
logger.info("User %s logged in", username)
logger.warning("Low memory: %d MB", available_mb)
logger.error("Failed to connect", exc_info=True)
logger.critical("System shutdown")

# With extra context
logger.info("Order placed", extra={"order_id": 12345, "user": "alice"})

# Configuration
logger.set_level(LogLevel.DEBUG)
logger.add_handler(FileHandler("app.log"))
logger.add_filter(LevelFilter(LogLevel.WARNING))
```

---

## Code Implementation

### Python Implementation

```python
import sys
import os
import json
import threading
from abc import ABC, abstractmethod
from datetime import datetime
from enum import IntEnum
from typing import Optional, Dict, Any, List, Callable
from dataclasses import dataclass, field


class LogLevel(IntEnum):
    """Log severity levels."""
    DEBUG = 10
    INFO = 20
    WARNING = 30
    ERROR = 40
    CRITICAL = 50


@dataclass
class LogRecord:
    """Represents a single log event."""
    level: LogLevel
    message: str
    logger_name: str
    timestamp: datetime = field(default_factory=datetime.now)
    extra: Dict[str, Any] = field(default_factory=dict)
    exc_info: Optional[tuple] = None

    def to_dict(self) -> dict:
        return {
            "level": self.level.name,
            "message": self.message,
            "logger": self.logger_name,
            "timestamp": self.timestamp.isoformat(),
            **self.extra
        }


# ==================== Filters ====================

class Filter(ABC):
    """Base class for log filters."""

    @abstractmethod
    def filter(self, record: LogRecord) -> bool:
        """Return True if record should be logged."""
        pass


class LevelFilter(Filter):
    """Filter by minimum log level."""

    def __init__(self, min_level: LogLevel):
        self.min_level = min_level

    def filter(self, record: LogRecord) -> bool:
        return record.level >= self.min_level


class NameFilter(Filter):
    """Filter by logger name pattern."""

    def __init__(self, name_pattern: str):
        self.pattern = name_pattern

    def filter(self, record: LogRecord) -> bool:
        return record.logger_name.startswith(self.pattern)


class CallableFilter(Filter):
    """Filter using a custom function."""

    def __init__(self, func: Callable[[LogRecord], bool]):
        self.func = func

    def filter(self, record: LogRecord) -> bool:
        return self.func(record)


# ==================== Formatters ====================

class Formatter(ABC):
    """Base class for log formatters."""

    @abstractmethod
    def format(self, record: LogRecord) -> str:
        pass


class TextFormatter(Formatter):
    """Plain text formatter with customizable template."""

    DEFAULT_FORMAT = "[{timestamp}] {level:8} {logger} - {message}"

    def __init__(self, fmt: str = None):
        self.fmt = fmt or self.DEFAULT_FORMAT

    def format(self, record: LogRecord) -> str:
        return self.fmt.format(
            timestamp=record.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
            level=record.level.name,
            logger=record.logger_name,
            message=record.message,
            **record.extra
        )


class JsonFormatter(Formatter):
    """JSON formatter for structured logging."""

    def __init__(self, indent: int = None):
        self.indent = indent

    def format(self, record: LogRecord) -> str:
        return json.dumps(record.to_dict(), indent=self.indent, default=str)


class ColoredFormatter(Formatter):
    """Colored console output."""

    COLORS = {
        LogLevel.DEBUG: "\033[36m",     # Cyan
        LogLevel.INFO: "\033[32m",      # Green
        LogLevel.WARNING: "\033[33m",   # Yellow
        LogLevel.ERROR: "\033[31m",     # Red
        LogLevel.CRITICAL: "\033[35m",  # Magenta
    }
    RESET = "\033[0m"

    def __init__(self, base_formatter: Formatter = None):
        self.base = base_formatter or TextFormatter()

    def format(self, record: LogRecord) -> str:
        color = self.COLORS.get(record.level, "")
        text = self.base.format(record)
        return f"{color}{text}{self.RESET}"


# ==================== Handlers ====================

class Handler(ABC):
    """Base class for log handlers."""

    def __init__(self, level: LogLevel = LogLevel.DEBUG):
        self.level = level
        self.formatter: Formatter = TextFormatter()
        self.filters: List[Filter] = []
        self.lock = threading.Lock()

    def set_formatter(self, formatter: Formatter) -> 'Handler':
        self.formatter = formatter
        return self

    def add_filter(self, filter_obj: Filter) -> 'Handler':
        self.filters.append(filter_obj)
        return self

    def should_handle(self, record: LogRecord) -> bool:
        """Check if this handler should process the record."""
        if record.level < self.level:
            return False
        return all(f.filter(record) for f in self.filters)

    def handle(self, record: LogRecord) -> None:
        """Process a log record."""
        if self.should_handle(record):
            formatted = self.formatter.format(record)
            with self.lock:
                self.emit(formatted, record)

    @abstractmethod
    def emit(self, formatted: str, record: LogRecord) -> None:
        """Output the formatted log message."""
        pass

    def close(self) -> None:
        """Clean up handler resources."""
        pass


class ConsoleHandler(Handler):
    """Output logs to console (stdout/stderr)."""

    def __init__(self, stream=None, level: LogLevel = LogLevel.DEBUG):
        super().__init__(level)
        self.stream = stream or sys.stdout

    def emit(self, formatted: str, record: LogRecord) -> None:
        # Use stderr for ERROR and above
        stream = sys.stderr if record.level >= LogLevel.ERROR else self.stream
        stream.write(formatted + "\n")
        stream.flush()


class FileHandler(Handler):
    """Output logs to a file."""

    def __init__(self, filename: str, mode: str = "a", level: LogLevel = LogLevel.DEBUG):
        super().__init__(level)
        self.filename = filename
        self.mode = mode
        self.file = None
        self._open()

    def _open(self) -> None:
        os.makedirs(os.path.dirname(self.filename) or ".", exist_ok=True)
        self.file = open(self.filename, self.mode)

    def emit(self, formatted: str, record: LogRecord) -> None:
        if self.file:
            self.file.write(formatted + "\n")
            self.file.flush()

    def close(self) -> None:
        if self.file:
            self.file.close()
            self.file = None


class RotatingFileHandler(Handler):
    """File handler with rotation based on size."""

    def __init__(self, filename: str, max_bytes: int = 10*1024*1024,
                 backup_count: int = 5, level: LogLevel = LogLevel.DEBUG):
        super().__init__(level)
        self.filename = filename
        self.max_bytes = max_bytes
        self.backup_count = backup_count
        self.file = None
        self._open()

    def _open(self) -> None:
        os.makedirs(os.path.dirname(self.filename) or ".", exist_ok=True)
        self.file = open(self.filename, "a")

    def _rotate(self) -> None:
        """Rotate log files."""
        self.file.close()

        # Shift existing backups
        for i in range(self.backup_count - 1, 0, -1):
            src = f"{self.filename}.{i}"
            dst = f"{self.filename}.{i + 1}"
            if os.path.exists(src):
                os.rename(src, dst)

        # Rename current to .1
        if os.path.exists(self.filename):
            os.rename(self.filename, f"{self.filename}.1")

        self._open()

    def emit(self, formatted: str, record: LogRecord) -> None:
        if self.file:
            self.file.write(formatted + "\n")
            self.file.flush()

            # Check if rotation needed
            if self.file.tell() >= self.max_bytes:
                self._rotate()

    def close(self) -> None:
        if self.file:
            self.file.close()
            self.file = None


# ==================== Logger ====================

class Logger:
    """
    Main logger class.

    Supports hierarchical names (e.g., "app.module.submodule"),
    multiple handlers, and filtering.
    """

    def __init__(self, name: str, level: LogLevel = LogLevel.DEBUG):
        self.name = name
        self.level = level
        self.handlers: List[Handler] = []
        self.filters: List[Filter] = []
        self.parent: Optional['Logger'] = None
        self.propagate = True

    def set_level(self, level: LogLevel) -> 'Logger':
        self.level = level
        return self

    def add_handler(self, handler: Handler) -> 'Logger':
        self.handlers.append(handler)
        return self

    def add_filter(self, filter_obj: Filter) -> 'Logger':
        self.filters.append(filter_obj)
        return self

    def _should_log(self, level: LogLevel) -> bool:
        """Check if a message at this level should be logged."""
        return level >= self.level

    def _create_record(self, level: LogLevel, message: str,
                       extra: dict = None, exc_info: tuple = None) -> LogRecord:
        return LogRecord(
            level=level,
            message=message,
            logger_name=self.name,
            extra=extra or {},
            exc_info=exc_info
        )

    def _log(self, level: LogLevel, message: str, *args,
             extra: dict = None, exc_info: bool = False) -> None:
        """Internal logging method."""
        if not self._should_log(level):
            return

        # Format message with args
        if args:
            message = message % args

        # Get exception info if requested
        exc = sys.exc_info() if exc_info else None

        record = self._create_record(level, message, extra, exc)

        # Check filters
        if not all(f.filter(record) for f in self.filters):
            return

        # Handle locally
        for handler in self.handlers:
            handler.handle(record)

        # Propagate to parent
        if self.propagate and self.parent:
            self.parent._log(level, message, extra=extra)

    def debug(self, message: str, *args, **kwargs) -> None:
        self._log(LogLevel.DEBUG, message, *args, **kwargs)

    def info(self, message: str, *args, **kwargs) -> None:
        self._log(LogLevel.INFO, message, *args, **kwargs)

    def warning(self, message: str, *args, **kwargs) -> None:
        self._log(LogLevel.WARNING, message, *args, **kwargs)

    def error(self, message: str, *args, **kwargs) -> None:
        self._log(LogLevel.ERROR, message, *args, **kwargs)

    def critical(self, message: str, *args, **kwargs) -> None:
        self._log(LogLevel.CRITICAL, message, *args, **kwargs)


# ==================== LogManager ====================

class LogManager:
    """
    Global logger registry and factory.

    Manages logger hierarchy and provides get_logger() method.
    """

    _loggers: Dict[str, Logger] = {}
    _root: Logger = None
    _lock = threading.Lock()

    @classmethod
    def get_logger(cls, name: str = "root") -> Logger:
        """Get or create a logger by name."""
        with cls._lock:
            if name in cls._loggers:
                return cls._loggers[name]

            # Create new logger
            logger = Logger(name)

            # Set up hierarchy
            if name != "root":
                parent_name = name.rsplit(".", 1)[0] if "." in name else "root"
                logger.parent = cls.get_logger(parent_name)

            cls._loggers[name] = logger
            return logger

    @classmethod
    def get_root(cls) -> Logger:
        """Get the root logger."""
        return cls.get_logger("root")

    @classmethod
    def configure(cls, config: dict) -> None:
        """Configure logging from a dictionary."""
        root = cls.get_root()
        root.set_level(LogLevel[config.get("level", "DEBUG")])

        for handler_config in config.get("handlers", []):
            handler_type = handler_config.pop("type")
            if handler_type == "console":
                handler = ConsoleHandler(**handler_config)
            elif handler_type == "file":
                handler = FileHandler(**handler_config)
            elif handler_type == "rotating":
                handler = RotatingFileHandler(**handler_config)

            formatter_config = handler_config.get("formatter", {})
            if formatter_config.get("type") == "json":
                handler.set_formatter(JsonFormatter())
            else:
                handler.set_formatter(TextFormatter())

            root.add_handler(handler)


# Example usage
if __name__ == "__main__":
    # Basic setup
    root = LogManager.get_root()
    root.add_handler(
        ConsoleHandler()
        .set_formatter(ColoredFormatter())
    )
    root.add_handler(
        FileHandler("logs/app.log")
        .set_formatter(JsonFormatter())
    )

    # Get module logger
    logger = LogManager.get_logger("myapp.module")
    logger.set_level(LogLevel.DEBUG)

    # Log messages
    logger.debug("Starting application")
    logger.info("User %s logged in", "alice")
    logger.warning("Low memory: %d MB remaining", 512)
    logger.error("Connection failed", exc_info=True)

    # With extra context
    logger.info("Order placed", extra={"order_id": 12345, "total": 99.99})

    print("\n=== Log file content ===")
    with open("logs/app.log") as f:
        print(f.read())
```

---

## Edge Cases

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Critical Edge Cases</div>

| Scenario | Expected Behavior | Implementation |
|----------|-------------------|----------------|
| **Logging before setup** | No crash, message lost | Check handlers before emit |
| **File permission error** | Log to stderr, continue | Try/except in FileHandler |
| **Circular logger reference** | Prevent infinite loop | Check propagate flag |
| **Thread concurrent logging** | No interleaved output | Lock in Handler.handle() |
| **Format string with no args** | Use message as-is | Check args before % |
| **Unicode in message** | Handle encoding | UTF-8 in file handler |

</div>

---

## Testing Approach

### Unit Tests

```python
import unittest
from io import StringIO


class TestLogger(unittest.TestCase):
    def setUp(self):
        self.logger = Logger("test")
        self.output = StringIO()
        handler = ConsoleHandler(stream=self.output)
        handler.set_formatter(TextFormatter("{level}: {message}"))
        self.logger.add_handler(handler)

    def test_log_levels(self):
        self.logger.set_level(LogLevel.WARNING)
        self.logger.info("Should not appear")
        self.logger.warning("Should appear")
        output = self.output.getvalue()
        self.assertNotIn("Should not appear", output)
        self.assertIn("Should appear", output)

    def test_message_formatting(self):
        self.logger.info("User %s has %d items", "Alice", 5)
        self.assertIn("User Alice has 5 items", self.output.getvalue())

    def test_filter(self):
        self.logger.add_filter(LevelFilter(LogLevel.ERROR))
        self.logger.warning("Filtered out")
        self.logger.error("Passes filter")
        output = self.output.getvalue()
        self.assertNotIn("Filtered out", output)
        self.assertIn("Passes filter", output)


if __name__ == "__main__":
    unittest.main()
```

---

## Interview Tips

<div style="background: #f0f9ff; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
<div style="color: #1e293b; font-weight: bold; font-size: 16px; margin-bottom: 16px;">How to Approach This in an Interview</div>

### Time Allocation (45 minutes)

| Phase | Time | Focus |
|-------|------|-------|
| Requirements | 5 min | Levels, handlers, formatters |
| Class Design | 10 min | Logger, Handler, Formatter interfaces |
| Core Implementation | 20 min | Logger, ConsoleHandler, TextFormatter |
| Extensions | 5 min | FileHandler, JsonFormatter |
| Testing | 5 min | Edge cases, thread safety |

### Key Points to Mention

1. **Strategy Pattern**: Handlers and Formatters as strategies
2. **Chain of Responsibility**: Filter chain
3. **Logger Hierarchy**: dot-separated names with propagation
4. **Thread Safety**: Locks in handlers
5. **Lazy Evaluation**: Skip formatting if level disabled

### Common Follow-up Questions

- **Async logging?** Queue + background thread
- **Structured logging?** JsonFormatter with extra fields
- **Log aggregation?** HTTP handler to ELK/Splunk
- **Performance?** Ring buffer, sampling, async I/O

</div>

---

## Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| log() | O(h * f) handlers * filters | O(1) |
| format() | O(m) message length | O(m) |
| emit() | O(1) for console | O(1) |
| rotate() | O(b) backup count | O(1) |
