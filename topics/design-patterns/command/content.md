# Command Pattern

## Overview

The Command pattern encapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.

## Key Concepts

### When to Use

- Parameterize objects with operations
- Queue, schedule, or log operations
- Implement undo/redo functionality
- Decouple sender from receiver
- Support transactional operations

### Structure

```
┌─────────────────┐         ┌─────────────────┐
│     Invoker     │────────→│    Command      │
├─────────────────┤         ├─────────────────┤
│ + setCommand()  │         │ + execute()     │
│ + invoke()      │         │ + undo()        │
└─────────────────┘         └────────┬────────┘
                                     │
                            ┌────────┴────────┐
                            │ConcreteCommand  │
                            ├─────────────────┤
                            │ - receiver      │
                            │ - state         │
                            │ + execute()     │
                            │ + undo()        │
                            └────────┬────────┘
                                     │
                            ┌────────┴────────┐
                            │    Receiver     │
                            │ + action()      │
                            └─────────────────┘
```

## Implementation

### Python - Text Editor with Undo/Redo

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List, Optional

class Command(ABC):
    @abstractmethod
    def execute(self) -> None:
        pass

    @abstractmethod
    def undo(self) -> None:
        pass


@dataclass
class TextDocument:
    content: str = ""

    def insert(self, position: int, text: str) -> None:
        self.content = self.content[:position] + text + self.content[position:]

    def delete(self, position: int, length: int) -> str:
        deleted = self.content[position:position + length]
        self.content = self.content[:position] + self.content[position + length:]
        return deleted

    def replace(self, position: int, length: int, text: str) -> str:
        old_text = self.content[position:position + length]
        self.content = self.content[:position] + text + self.content[position + length:]
        return old_text


class InsertCommand(Command):
    def __init__(self, document: TextDocument, position: int, text: str):
        self.document = document
        self.position = position
        self.text = text

    def execute(self) -> None:
        self.document.insert(self.position, self.text)

    def undo(self) -> None:
        self.document.delete(self.position, len(self.text))


class DeleteCommand(Command):
    def __init__(self, document: TextDocument, position: int, length: int):
        self.document = document
        self.position = position
        self.length = length
        self.deleted_text: str = ""

    def execute(self) -> None:
        self.deleted_text = self.document.delete(self.position, self.length)

    def undo(self) -> None:
        self.document.insert(self.position, self.deleted_text)


class ReplaceCommand(Command):
    def __init__(self, document: TextDocument, position: int, length: int, text: str):
        self.document = document
        self.position = position
        self.length = length
        self.new_text = text
        self.old_text: str = ""

    def execute(self) -> None:
        self.old_text = self.document.replace(self.position, self.length, self.new_text)

    def undo(self) -> None:
        self.document.replace(self.position, len(self.new_text), self.old_text)


class MacroCommand(Command):
    """Composite command that executes multiple commands"""
    def __init__(self, commands: List[Command] = None):
        self.commands = commands or []

    def add(self, command: Command) -> None:
        self.commands.append(command)

    def execute(self) -> None:
        for command in self.commands:
            command.execute()

    def undo(self) -> None:
        for command in reversed(self.commands):
            command.undo()


class CommandHistory:
    def __init__(self, max_size: int = 100):
        self.history: List[Command] = []
        self.redo_stack: List[Command] = []
        self.max_size = max_size

    def execute(self, command: Command) -> None:
        command.execute()
        self.history.append(command)
        self.redo_stack.clear()  # Clear redo on new command

        if len(self.history) > self.max_size:
            self.history.pop(0)

    def undo(self) -> bool:
        if not self.history:
            return False

        command = self.history.pop()
        command.undo()
        self.redo_stack.append(command)
        return True

    def redo(self) -> bool:
        if not self.redo_stack:
            return False

        command = self.redo_stack.pop()
        command.execute()
        self.history.append(command)
        return True


class TextEditor:
    def __init__(self):
        self.document = TextDocument()
        self.history = CommandHistory()

    def type_text(self, text: str) -> None:
        position = len(self.document.content)
        command = InsertCommand(self.document, position, text)
        self.history.execute(command)

    def insert_at(self, position: int, text: str) -> None:
        command = InsertCommand(self.document, position, text)
        self.history.execute(command)

    def delete(self, position: int, length: int) -> None:
        command = DeleteCommand(self.document, position, length)
        self.history.execute(command)

    def replace(self, position: int, length: int, text: str) -> None:
        command = ReplaceCommand(self.document, position, length, text)
        self.history.execute(command)

    def undo(self) -> None:
        self.history.undo()

    def redo(self) -> None:
        self.history.redo()

    def get_content(self) -> str:
        return self.document.content


# Usage
editor = TextEditor()

editor.type_text("Hello")
print(editor.get_content())  # Hello

editor.type_text(" World")
print(editor.get_content())  # Hello World

editor.insert_at(5, ",")
print(editor.get_content())  # Hello, World

editor.undo()
print(editor.get_content())  # Hello World

editor.undo()
print(editor.get_content())  # Hello

editor.redo()
print(editor.get_content())  # Hello World

editor.replace(0, 5, "Hi")
print(editor.get_content())  # Hi World
```

### Go - Task Queue with Commands

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

// Command interface
type Command interface {
	Execute() error
	Undo() error
	Description() string
}

// Receiver
type FileSystem struct {
	files map[string]string
	mu    sync.RWMutex
}

func NewFileSystem() *FileSystem {
	return &FileSystem{
		files: make(map[string]string),
	}
}

func (fs *FileSystem) CreateFile(name, content string) {
	fs.mu.Lock()
	defer fs.mu.Unlock()
	fs.files[name] = content
}

func (fs *FileSystem) DeleteFile(name string) string {
	fs.mu.Lock()
	defer fs.mu.Unlock()
	content := fs.files[name]
	delete(fs.files, name)
	return content
}

func (fs *FileSystem) ReadFile(name string) string {
	fs.mu.RLock()
	defer fs.mu.RUnlock()
	return fs.files[name]
}

func (fs *FileSystem) ListFiles() []string {
	fs.mu.RLock()
	defer fs.mu.RUnlock()
	files := make([]string, 0, len(fs.files))
	for name := range fs.files {
		files = append(files, name)
	}
	return files
}

// Concrete Commands
type CreateFileCommand struct {
	fs      *FileSystem
	name    string
	content string
}

func NewCreateFileCommand(fs *FileSystem, name, content string) *CreateFileCommand {
	return &CreateFileCommand{fs: fs, name: name, content: content}
}

func (c *CreateFileCommand) Execute() error {
	c.fs.CreateFile(c.name, c.content)
	return nil
}

func (c *CreateFileCommand) Undo() error {
	c.fs.DeleteFile(c.name)
	return nil
}

func (c *CreateFileCommand) Description() string {
	return fmt.Sprintf("Create file: %s", c.name)
}

type DeleteFileCommand struct {
	fs             *FileSystem
	name           string
	deletedContent string
}

func NewDeleteFileCommand(fs *FileSystem, name string) *DeleteFileCommand {
	return &DeleteFileCommand{fs: fs, name: name}
}

func (c *DeleteFileCommand) Execute() error {
	c.deletedContent = c.fs.DeleteFile(c.name)
	return nil
}

func (c *DeleteFileCommand) Undo() error {
	c.fs.CreateFile(c.name, c.deletedContent)
	return nil
}

func (c *DeleteFileCommand) Description() string {
	return fmt.Sprintf("Delete file: %s", c.name)
}

// Command Invoker with queue
type CommandQueue struct {
	mu       sync.Mutex
	queue    []Command
	history  []Command
	workers  int
	stopChan chan struct{}
}

func NewCommandQueue(workers int) *CommandQueue {
	return &CommandQueue{
		queue:    make([]Command, 0),
		history:  make([]Command, 0),
		workers:  workers,
		stopChan: make(chan struct{}),
	}
}

func (q *CommandQueue) Enqueue(cmd Command) {
	q.mu.Lock()
	defer q.mu.Unlock()
	q.queue = append(q.queue, cmd)
}

func (q *CommandQueue) Start() {
	for i := 0; i < q.workers; i++ {
		go q.worker(i)
	}
}

func (q *CommandQueue) Stop() {
	close(q.stopChan)
}

func (q *CommandQueue) worker(id int) {
	for {
		select {
		case <-q.stopChan:
			return
		default:
			cmd := q.dequeue()
			if cmd != nil {
				fmt.Printf("Worker %d executing: %s\n", id, cmd.Description())
				if err := cmd.Execute(); err != nil {
					fmt.Printf("Error: %v\n", err)
				} else {
					q.mu.Lock()
					q.history = append(q.history, cmd)
					q.mu.Unlock()
				}
			} else {
				time.Sleep(100 * time.Millisecond)
			}
		}
	}
}

func (q *CommandQueue) dequeue() Command {
	q.mu.Lock()
	defer q.mu.Unlock()

	if len(q.queue) == 0 {
		return nil
	}

	cmd := q.queue[0]
	q.queue = q.queue[1:]
	return cmd
}

func (q *CommandQueue) UndoLast() error {
	q.mu.Lock()
	defer q.mu.Unlock()

	if len(q.history) == 0 {
		return fmt.Errorf("nothing to undo")
	}

	cmd := q.history[len(q.history)-1]
	q.history = q.history[:len(q.history)-1]

	fmt.Printf("Undoing: %s\n", cmd.Description())
	return cmd.Undo()
}

func main() {
	fs := NewFileSystem()
	queue := NewCommandQueue(2)
	queue.Start()

	// Queue commands
	queue.Enqueue(NewCreateFileCommand(fs, "file1.txt", "Hello World"))
	queue.Enqueue(NewCreateFileCommand(fs, "file2.txt", "Go is awesome"))
	queue.Enqueue(NewCreateFileCommand(fs, "file3.txt", "Command pattern"))

	time.Sleep(500 * time.Millisecond)

	fmt.Println("Files:", fs.ListFiles())

	// Undo last operation
	queue.UndoLast()
	fmt.Println("After undo:", fs.ListFiles())

	queue.Stop()
}
```

### Python - Smart Home Automation

```python
from abc import ABC, abstractmethod
from typing import List, Dict, Any
from datetime import datetime, time

class SmartDevice(ABC):
    def __init__(self, name: str):
        self.name = name
        self._is_on = False

    @abstractmethod
    def turn_on(self) -> None:
        pass

    @abstractmethod
    def turn_off(self) -> None:
        pass


class Light(SmartDevice):
    def __init__(self, name: str):
        super().__init__(name)
        self.brightness = 100

    def turn_on(self) -> None:
        self._is_on = True
        print(f"{self.name} light is ON at {self.brightness}%")

    def turn_off(self) -> None:
        self._is_on = False
        print(f"{self.name} light is OFF")

    def set_brightness(self, level: int) -> None:
        self.brightness = level
        print(f"{self.name} brightness set to {level}%")


class Thermostat(SmartDevice):
    def __init__(self, name: str):
        super().__init__(name)
        self.temperature = 72

    def turn_on(self) -> None:
        self._is_on = True
        print(f"{self.name} is ON, set to {self.temperature}°F")

    def turn_off(self) -> None:
        self._is_on = False
        print(f"{self.name} is OFF")

    def set_temperature(self, temp: int) -> None:
        old_temp = self.temperature
        self.temperature = temp
        print(f"{self.name} temperature changed from {old_temp}°F to {temp}°F")
        return old_temp


class SmartCommand(ABC):
    @abstractmethod
    def execute(self) -> None:
        pass

    @abstractmethod
    def undo(self) -> None:
        pass


class TurnOnCommand(SmartCommand):
    def __init__(self, device: SmartDevice):
        self.device = device

    def execute(self) -> None:
        self.device.turn_on()

    def undo(self) -> None:
        self.device.turn_off()


class TurnOffCommand(SmartCommand):
    def __init__(self, device: SmartDevice):
        self.device = device

    def execute(self) -> None:
        self.device.turn_off()

    def undo(self) -> None:
        self.device.turn_on()


class SetTemperatureCommand(SmartCommand):
    def __init__(self, thermostat: Thermostat, temperature: int):
        self.thermostat = thermostat
        self.new_temp = temperature
        self.old_temp = thermostat.temperature

    def execute(self) -> None:
        self.old_temp = self.thermostat.set_temperature(self.new_temp)

    def undo(self) -> None:
        self.thermostat.set_temperature(self.old_temp)


class MacroCommand(SmartCommand):
    def __init__(self, name: str, commands: List[SmartCommand]):
        self.name = name
        self.commands = commands

    def execute(self) -> None:
        print(f"Executing macro: {self.name}")
        for cmd in self.commands:
            cmd.execute()

    def undo(self) -> None:
        print(f"Undoing macro: {self.name}")
        for cmd in reversed(self.commands):
            cmd.undo()


class SmartHomeController:
    def __init__(self):
        self.history: List[SmartCommand] = []

    def execute(self, command: SmartCommand) -> None:
        command.execute()
        self.history.append(command)

    def undo(self) -> None:
        if self.history:
            command = self.history.pop()
            command.undo()


# Usage
living_room_light = Light("Living Room")
bedroom_light = Light("Bedroom")
thermostat = Thermostat("Main")

controller = SmartHomeController()

# Individual commands
controller.execute(TurnOnCommand(living_room_light))
controller.execute(SetTemperatureCommand(thermostat, 68))

# Undo last command
controller.undo()

# Create "Good Night" macro
good_night = MacroCommand("Good Night", [
    TurnOffCommand(living_room_light),
    TurnOffCommand(bedroom_light),
    SetTemperatureCommand(thermostat, 65)
])

controller.execute(good_night)

# Undo entire macro
controller.undo()
```

## Common Interview Questions

1. **Command vs Strategy?**
   - Command: Encapsulates action/request
   - Strategy: Encapsulates algorithm

2. **How to implement transaction rollback?**
   - Store undo commands
   - Execute in reverse on rollback

3. **When to use Macro Command?**
   - Batch operations
   - Complex workflows
   - Atomic transactions

## Best Practices

1. **Keep commands simple** - Single responsibility
2. **Store state for undo** - Save before modifying
3. **Use command history** - Enable undo/redo
4. **Consider serialization** - For persistence/logging
5. **Handle failures** - Rollback partial execution

## Related Patterns

- [Memento](/topic/design-patterns/memento) - State snapshots
- [Strategy](/topic/design-patterns/strategy) - Interchangeable algorithms
- [Chain of Responsibility](/topic/design-patterns/chain-of-responsibility) - Request handling chain
