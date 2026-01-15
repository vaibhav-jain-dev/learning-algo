# Logger Library

## Problem Statement

Design a flexible logging library that supports multiple log levels, formatters, handlers (console, file, network), and filtering. Similar to Python's logging module or Log4j.

## Requirements

- Multiple log levels (DEBUG, INFO, WARNING, ERROR, CRITICAL)
- Configurable formatters
- Multiple output handlers (console, file, rotating file)
- Log filtering and context
- Thread-safe operations

## Solution

### Python

```python
import os
import sys
import threading
import json
from abc import ABC, abstractmethod
from datetime import datetime
from enum import IntEnum
from typing import Optional, Dict, Any, List, Callable
from dataclasses import dataclass, field
from collections import deque


class LogLevel(IntEnum):
    DEBUG = 10
    INFO = 20
    WARNING = 30
    ERROR = 40
    CRITICAL = 50


@dataclass
class LogRecord:
    level: LogLevel
    message: str
    logger_name: str
    timestamp: datetime = field(default_factory=datetime.now)
    extra: Dict[str, Any] = field(default_factory=dict)
    exc_info: Optional[tuple] = None

    def to_dict(self) -> dict:
        return {
            'level': self.level.name,
            'message': self.message,
            'logger': self.logger_name,
            'timestamp': self.timestamp.isoformat(),
            'extra': self.extra
        }


class Formatter(ABC):
    @abstractmethod
    def format(self, record: LogRecord) -> str:
        pass


class SimpleFormatter(Formatter):
    def __init__(self, fmt: str = "%(timestamp)s [%(level)s] %(name)s: %(message)s"):
        self.fmt = fmt

    def format(self, record: LogRecord) -> str:
        values = {
            'timestamp': record.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            'level': record.level.name,
            'name': record.logger_name,
            'message': record.message
        }
        values.update(record.extra)

        result = self.fmt
        for key, value in values.items():
            result = result.replace(f'%({key})s', str(value))

        return result


class JsonFormatter(Formatter):
    def format(self, record: LogRecord) -> str:
        return json.dumps(record.to_dict())


class Handler(ABC):
    def __init__(self, level: LogLevel = LogLevel.DEBUG):
        self.level = level
        self.formatter: Formatter = SimpleFormatter()
        self.filters: List[Callable[[LogRecord], bool]] = []
        self.lock = threading.Lock()

    def set_formatter(self, formatter: Formatter):
        self.formatter = formatter

    def add_filter(self, filter_func: Callable[[LogRecord], bool]):
        self.filters.append(filter_func)

    def should_handle(self, record: LogRecord) -> bool:
        if record.level < self.level:
            return False
        return all(f(record) for f in self.filters)

    @abstractmethod
    def emit(self, record: LogRecord):
        pass

    def handle(self, record: LogRecord):
        if self.should_handle(record):
            with self.lock:
                self.emit(record)


class ConsoleHandler(Handler):
    def __init__(self, level: LogLevel = LogLevel.DEBUG, stream=None):
        super().__init__(level)
        self.stream = stream or sys.stdout

    def emit(self, record: LogRecord):
        message = self.formatter.format(record)
        self.stream.write(message + '\n')
        self.stream.flush()


class FileHandler(Handler):
    def __init__(self, filename: str, level: LogLevel = LogLevel.DEBUG, mode: str = 'a'):
        super().__init__(level)
        self.filename = filename
        self.mode = mode
        self.file = None

    def _open(self):
        if self.file is None:
            self.file = open(self.filename, self.mode)

    def emit(self, record: LogRecord):
        self._open()
        message = self.formatter.format(record)
        self.file.write(message + '\n')
        self.file.flush()

    def close(self):
        if self.file:
            self.file.close()
            self.file = None


class RotatingFileHandler(Handler):
    def __init__(self, filename: str, max_bytes: int = 10*1024*1024,
                 backup_count: int = 5, level: LogLevel = LogLevel.DEBUG):
        super().__init__(level)
        self.filename = filename
        self.max_bytes = max_bytes
        self.backup_count = backup_count
        self.file = None
        self.current_size = 0

    def _open(self):
        if self.file is None:
            self.file = open(self.filename, 'a')
            self.current_size = os.path.getsize(self.filename) if os.path.exists(self.filename) else 0

    def _rotate(self):
        if self.file:
            self.file.close()

        # Rotate existing files
        for i in range(self.backup_count - 1, 0, -1):
            src = f"{self.filename}.{i}"
            dst = f"{self.filename}.{i + 1}"
            if os.path.exists(src):
                if os.path.exists(dst):
                    os.remove(dst)
                os.rename(src, dst)

        # Rename current file
        if os.path.exists(self.filename):
            os.rename(self.filename, f"{self.filename}.1")

        self.file = open(self.filename, 'w')
        self.current_size = 0

    def emit(self, record: LogRecord):
        self._open()
        message = self.formatter.format(record)
        message_bytes = len(message.encode('utf-8')) + 1

        if self.current_size + message_bytes > self.max_bytes:
            self._rotate()

        self.file.write(message + '\n')
        self.file.flush()
        self.current_size += message_bytes


class MemoryHandler(Handler):
    """Handler that stores logs in memory for testing."""
    def __init__(self, capacity: int = 1000, level: LogLevel = LogLevel.DEBUG):
        super().__init__(level)
        self.records: deque = deque(maxlen=capacity)

    def emit(self, record: LogRecord):
        self.records.append(record)

    def get_records(self) -> List[LogRecord]:
        return list(self.records)

    def clear(self):
        self.records.clear()


class Logger:
    _loggers: Dict[str, 'Logger'] = {}
    _lock = threading.Lock()

    def __init__(self, name: str, level: LogLevel = LogLevel.DEBUG):
        self.name = name
        self.level = level
        self.handlers: List[Handler] = []
        self.parent: Optional[Logger] = None
        self.propagate = True
        self.context: Dict[str, Any] = {}

    @classmethod
    def get_logger(cls, name: str) -> 'Logger':
        with cls._lock:
            if name not in cls._loggers:
                logger = Logger(name)
                cls._loggers[name] = logger

                # Set parent logger
                if '.' in name:
                    parent_name = name.rsplit('.', 1)[0]
                    logger.parent = cls.get_logger(parent_name)

            return cls._loggers[name]

    def add_handler(self, handler: Handler):
        self.handlers.append(handler)

    def remove_handler(self, handler: Handler):
        self.handlers.remove(handler)

    def set_level(self, level: LogLevel):
        self.level = level

    def add_context(self, **kwargs):
        self.context.update(kwargs)

    def _log(self, level: LogLevel, message: str, *args, exc_info=None, **kwargs):
        if level < self.level:
            return

        # Format message with args
        if args:
            message = message % args

        # Create record
        extra = {**self.context, **kwargs}
        record = LogRecord(
            level=level,
            message=message,
            logger_name=self.name,
            extra=extra,
            exc_info=exc_info
        )

        # Handle in this logger and propagate to parents
        self._handle(record)

    def _handle(self, record: LogRecord):
        for handler in self.handlers:
            handler.handle(record)

        if self.propagate and self.parent:
            self.parent._handle(record)

    def debug(self, message: str, *args, **kwargs):
        self._log(LogLevel.DEBUG, message, *args, **kwargs)

    def info(self, message: str, *args, **kwargs):
        self._log(LogLevel.INFO, message, *args, **kwargs)

    def warning(self, message: str, *args, **kwargs):
        self._log(LogLevel.WARNING, message, *args, **kwargs)

    def error(self, message: str, *args, **kwargs):
        self._log(LogLevel.ERROR, message, *args, **kwargs)

    def critical(self, message: str, *args, **kwargs):
        self._log(LogLevel.CRITICAL, message, *args, **kwargs)

    def exception(self, message: str, *args, **kwargs):
        self._log(LogLevel.ERROR, message, *args, exc_info=sys.exc_info(), **kwargs)


# Convenience function
def get_logger(name: str) -> Logger:
    return Logger.get_logger(name)


# Usage
# Configure root logger
root_logger = get_logger('app')
root_logger.set_level(LogLevel.DEBUG)

# Add console handler
console_handler = ConsoleHandler(LogLevel.INFO)
console_handler.set_formatter(SimpleFormatter(
    "%(timestamp)s [%(level)s] %(name)s: %(message)s"
))
root_logger.add_handler(console_handler)

# Add file handler with rotation
file_handler = RotatingFileHandler(
    'app.log',
    max_bytes=1024*1024,  # 1MB
    backup_count=3
)
file_handler.set_formatter(JsonFormatter())
file_handler.level = LogLevel.DEBUG
root_logger.add_handler(file_handler)

# Create child logger
db_logger = get_logger('app.database')
db_logger.add_context(component='database')

# Log messages
root_logger.info("Application started")
root_logger.debug("Debug message - won't show in console")

db_logger.info("Connected to database", host='localhost', port=5432)
db_logger.warning("Slow query detected", query_time=2.5)

try:
    raise ValueError("Something went wrong")
except:
    db_logger.exception("An error occurred")
```

### Go

```go
package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"sync"
	"time"
)

type LogLevel int

const (
	DEBUG LogLevel = iota * 10
	INFO
	WARNING
	ERROR
	CRITICAL
)

func (l LogLevel) String() string {
	names := map[LogLevel]string{
		DEBUG:    "DEBUG",
		INFO:     "INFO",
		WARNING:  "WARNING",
		ERROR:    "ERROR",
		CRITICAL: "CRITICAL",
	}
	return names[l]
}

type LogRecord struct {
	Level      LogLevel
	Message    string
	LoggerName string
	Timestamp  time.Time
	Extra      map[string]interface{}
}

type Formatter interface {
	Format(record *LogRecord) string
}

type SimpleFormatter struct {
	Pattern string
}

func NewSimpleFormatter(pattern string) *SimpleFormatter {
	if pattern == "" {
		pattern = "%s [%s] %s: %s"
	}
	return &SimpleFormatter{Pattern: pattern}
}

func (f *SimpleFormatter) Format(record *LogRecord) string {
	return fmt.Sprintf(f.Pattern,
		record.Timestamp.Format("2006-01-02 15:04:05"),
		record.Level.String(),
		record.LoggerName,
		record.Message,
	)
}

type JsonFormatter struct{}

func (f *JsonFormatter) Format(record *LogRecord) string {
	data := map[string]interface{}{
		"level":     record.Level.String(),
		"message":   record.Message,
		"logger":    record.LoggerName,
		"timestamp": record.Timestamp.Format(time.RFC3339),
		"extra":     record.Extra,
	}
	bytes, _ := json.Marshal(data)
	return string(bytes)
}

type Handler interface {
	Handle(record *LogRecord)
	SetLevel(level LogLevel)
	SetFormatter(formatter Formatter)
}

type BaseHandler struct {
	Level     LogLevel
	Formatter Formatter
	mu        sync.Mutex
}

func (h *BaseHandler) SetLevel(level LogLevel) {
	h.Level = level
}

func (h *BaseHandler) SetFormatter(formatter Formatter) {
	h.Formatter = formatter
}

func (h *BaseHandler) ShouldHandle(record *LogRecord) bool {
	return record.Level >= h.Level
}

type ConsoleHandler struct {
	BaseHandler
	Writer io.Writer
}

func NewConsoleHandler(level LogLevel) *ConsoleHandler {
	return &ConsoleHandler{
		BaseHandler: BaseHandler{
			Level:     level,
			Formatter: NewSimpleFormatter(""),
		},
		Writer: os.Stdout,
	}
}

func (h *ConsoleHandler) Handle(record *LogRecord) {
	if !h.ShouldHandle(record) {
		return
	}
	h.mu.Lock()
	defer h.mu.Unlock()
	fmt.Fprintln(h.Writer, h.Formatter.Format(record))
}

type FileHandler struct {
	BaseHandler
	Filename string
	file     *os.File
}

func NewFileHandler(filename string, level LogLevel) *FileHandler {
	return &FileHandler{
		BaseHandler: BaseHandler{
			Level:     level,
			Formatter: NewSimpleFormatter(""),
		},
		Filename: filename,
	}
}

func (h *FileHandler) open() error {
	if h.file == nil {
		f, err := os.OpenFile(h.Filename, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
		if err != nil {
			return err
		}
		h.file = f
	}
	return nil
}

func (h *FileHandler) Handle(record *LogRecord) {
	if !h.ShouldHandle(record) {
		return
	}
	h.mu.Lock()
	defer h.mu.Unlock()

	if err := h.open(); err != nil {
		return
	}
	fmt.Fprintln(h.file, h.Formatter.Format(record))
}

func (h *FileHandler) Close() {
	if h.file != nil {
		h.file.Close()
		h.file = nil
	}
}

type RotatingFileHandler struct {
	BaseHandler
	Filename    string
	MaxBytes    int64
	BackupCount int
	file        *os.File
	currentSize int64
}

func NewRotatingFileHandler(filename string, maxBytes int64, backupCount int, level LogLevel) *RotatingFileHandler {
	return &RotatingFileHandler{
		BaseHandler: BaseHandler{
			Level:     level,
			Formatter: NewSimpleFormatter(""),
		},
		Filename:    filename,
		MaxBytes:    maxBytes,
		BackupCount: backupCount,
	}
}

func (h *RotatingFileHandler) open() error {
	if h.file == nil {
		f, err := os.OpenFile(h.Filename, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
		if err != nil {
			return err
		}
		h.file = f

		info, err := f.Stat()
		if err == nil {
			h.currentSize = info.Size()
		}
	}
	return nil
}

func (h *RotatingFileHandler) rotate() error {
	if h.file != nil {
		h.file.Close()
		h.file = nil
	}

	// Rotate files
	for i := h.BackupCount - 1; i > 0; i-- {
		src := fmt.Sprintf("%s.%d", h.Filename, i)
		dst := fmt.Sprintf("%s.%d", h.Filename, i+1)
		os.Rename(src, dst)
	}

	if _, err := os.Stat(h.Filename); err == nil {
		os.Rename(h.Filename, h.Filename+".1")
	}

	h.currentSize = 0
	return h.open()
}

func (h *RotatingFileHandler) Handle(record *LogRecord) {
	if !h.ShouldHandle(record) {
		return
	}
	h.mu.Lock()
	defer h.mu.Unlock()

	if err := h.open(); err != nil {
		return
	}

	message := h.Formatter.Format(record)
	messageSize := int64(len(message) + 1)

	if h.currentSize+messageSize > h.MaxBytes {
		h.rotate()
	}

	fmt.Fprintln(h.file, message)
	h.currentSize += messageSize
}

type Logger struct {
	Name      string
	Level     LogLevel
	Handlers  []Handler
	Parent    *Logger
	Propagate bool
	Context   map[string]interface{}
	mu        sync.RWMutex
}

var (
	loggers = make(map[string]*Logger)
	loggerMu sync.RWMutex
)

func GetLogger(name string) *Logger {
	loggerMu.Lock()
	defer loggerMu.Unlock()

	if logger, exists := loggers[name]; exists {
		return logger
	}

	logger := &Logger{
		Name:      name,
		Level:     DEBUG,
		Handlers:  make([]Handler, 0),
		Propagate: true,
		Context:   make(map[string]interface{}),
	}

	// Set parent
	if dir := filepath.Dir(name); dir != "." && dir != name {
		logger.Parent = GetLogger(dir)
	}

	loggers[name] = logger
	return logger
}

func (l *Logger) AddHandler(handler Handler) {
	l.mu.Lock()
	defer l.mu.Unlock()
	l.Handlers = append(l.Handlers, handler)
}

func (l *Logger) SetLevel(level LogLevel) {
	l.mu.Lock()
	defer l.mu.Unlock()
	l.Level = level
}

func (l *Logger) AddContext(key string, value interface{}) {
	l.mu.Lock()
	defer l.mu.Unlock()
	l.Context[key] = value
}

func (l *Logger) log(level LogLevel, message string, extra map[string]interface{}) {
	l.mu.RLock()
	if level < l.Level {
		l.mu.RUnlock()
		return
	}

	// Merge context
	allExtra := make(map[string]interface{})
	for k, v := range l.Context {
		allExtra[k] = v
	}
	for k, v := range extra {
		allExtra[k] = v
	}
	l.mu.RUnlock()

	record := &LogRecord{
		Level:      level,
		Message:    message,
		LoggerName: l.Name,
		Timestamp:  time.Now(),
		Extra:      allExtra,
	}

	l.handle(record)
}

func (l *Logger) handle(record *LogRecord) {
	l.mu.RLock()
	handlers := l.Handlers
	propagate := l.Propagate
	parent := l.Parent
	l.mu.RUnlock()

	for _, handler := range handlers {
		handler.Handle(record)
	}

	if propagate && parent != nil {
		parent.handle(record)
	}
}

func (l *Logger) Debug(message string, extra ...map[string]interface{}) {
	e := mergeExtra(extra)
	l.log(DEBUG, message, e)
}

func (l *Logger) Info(message string, extra ...map[string]interface{}) {
	e := mergeExtra(extra)
	l.log(INFO, message, e)
}

func (l *Logger) Warning(message string, extra ...map[string]interface{}) {
	e := mergeExtra(extra)
	l.log(WARNING, message, e)
}

func (l *Logger) Error(message string, extra ...map[string]interface{}) {
	e := mergeExtra(extra)
	l.log(ERROR, message, e)
}

func (l *Logger) Critical(message string, extra ...map[string]interface{}) {
	e := mergeExtra(extra)
	l.log(CRITICAL, message, e)
}

func mergeExtra(extra []map[string]interface{}) map[string]interface{} {
	result := make(map[string]interface{})
	for _, m := range extra {
		for k, v := range m {
			result[k] = v
		}
	}
	return result
}

func main() {
	// Configure logger
	logger := GetLogger("app")
	logger.SetLevel(DEBUG)

	// Console handler
	consoleHandler := NewConsoleHandler(INFO)
	logger.AddHandler(consoleHandler)

	// File handler
	fileHandler := NewRotatingFileHandler("app.log", 1024*1024, 3, DEBUG)
	fileHandler.SetFormatter(&JsonFormatter{})
	logger.AddHandler(fileHandler)

	// Child logger
	dbLogger := GetLogger("app/database")
	dbLogger.AddContext("component", "database")

	// Log messages
	logger.Info("Application started")
	logger.Debug("Debug message")

	dbLogger.Info("Connected to database", map[string]interface{}{
		"host": "localhost",
		"port": 5432,
	})
	dbLogger.Warning("Slow query", map[string]interface{}{
		"query_time": 2.5,
	})
}
```

## Key Components

| Component | Purpose |
|-----------|---------|
| LogRecord | Contains log data |
| Formatter | Converts record to string |
| Handler | Outputs formatted log |
| Logger | API for logging calls |
| Filter | Decides if record is logged |

## Interview Tips

- Explain the handler hierarchy and propagation
- Discuss thread-safety requirements
- Consider performance (buffered writing, async handlers)
- Mention structured logging benefits
