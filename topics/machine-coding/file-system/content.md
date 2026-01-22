# In-Memory File System Design

## Problem Statement

Design and implement an in-memory file system that supports common operations like creating directories, creating files, reading file contents, and navigating the file system hierarchy. This simulates a Unix-like file system with paths, permissions, and hierarchical organization.

This problem tests your understanding of tree data structures, path parsing, object-oriented design, and system design fundamentals. It appears frequently at companies like Google, Amazon, and Microsoft (LeetCode 588).

---

## Requirements Clarification

### Functional Requirements

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Core Operations</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

- **ls(path)**: List contents of a directory or return file name if path is a file
- **mkdir(path)**: Create a new directory (and parent directories if needed)
- **addContentToFile(path, content)**: Create or append content to a file
- **readContentFromFile(path)**: Read the content of a file
- **rm(path)**: Remove a file or directory (optional)
- **mv(src, dst)**: Move or rename a file/directory (optional)

</div>
</div>

### Non-Functional Requirements

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">System Constraints</div>
<div style="color: #334155; font-size: 14px; line-height: 1.8;">

- **In-memory storage**: All data resides in RAM
- **Thread safety**: Handle concurrent access (optional)
- **Path validation**: Handle invalid paths gracefully
- **Case sensitivity**: Paths are case-sensitive (Unix-like)
- **Special characters**: Handle paths with spaces, dots, etc.

</div>
</div>

### Key Questions to Ask

1. Should we support symbolic links?
2. Do we need file permissions (read/write/execute)?
3. What's the maximum path depth and file size?
4. Should mkdir create parent directories automatically?
5. How should we handle edge cases like root directory operations?

---

## Architecture Diagram

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 24px 0; text-align: center; font-size: 18px;">File System Tree Structure</h4>

<div style="display: flex; flex-direction: column; gap: 20px;">

<!-- Root Level -->
<div style="display: flex; justify-content: center;">
<div style="background: #dbeafe; border: 2px solid #3b82f6; padding: 16px 28px; border-radius: 8px; text-align: center;">
<div style="color: #1e40af; font-weight: bold; font-size: 16px;">/</div>
<div style="color: #3b82f6; font-size: 11px;">Root Directory</div>
</div>
</div>

<!-- Connector -->
<div style="display: flex; justify-content: center; gap: 100px;">
<div style="color: #94a3b8; font-size: 20px;">|</div>
</div>

<!-- Level 1 -->
<div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;">
<div style="background: #dcfce7; border: 2px solid #22c55e; padding: 14px 24px; border-radius: 8px; text-align: center;">
<div style="color: #166534; font-weight: bold;">home/</div>
<div style="color: #22c55e; font-size: 10px;">Directory</div>
</div>
<div style="background: #dcfce7; border: 2px solid #22c55e; padding: 14px 24px; border-radius: 8px; text-align: center;">
<div style="color: #166534; font-weight: bold;">etc/</div>
<div style="color: #22c55e; font-size: 10px;">Directory</div>
</div>
<div style="background: #dcfce7; border: 2px solid #22c55e; padding: 14px 24px; border-radius: 8px; text-align: center;">
<div style="color: #166534; font-weight: bold;">var/</div>
<div style="color: #22c55e; font-size: 10px;">Directory</div>
</div>
</div>

<!-- Node Detail -->
<div style="background: #ffffff; border: 2px solid #cbd5e1; border-radius: 12px; padding: 20px; margin-top: 16px;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px; text-align: center;">Node Structure</div>
<div style="display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;">
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; min-width: 200px;">
<div style="color: #475569; font-weight: bold; font-size: 12px;">Directory Node</div>
<div style="color: #64748b; font-size: 11px; margin-top: 8px; font-family: monospace;">
name: string<br>
is_file: False<br>
children: Dict[str, Node]<br>
parent: Node
</div>
</div>
<div style="background: #f1f5f9; padding: 16px; border-radius: 8px; min-width: 200px;">
<div style="color: #475569; font-weight: bold; font-size: 12px;">File Node</div>
<div style="color: #64748b; font-size: 11px; margin-top: 8px; font-family: monospace;">
name: string<br>
is_file: True<br>
content: string<br>
parent: Node
</div>
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
+------------------+          +------------------+
|   FileSystemNode |          |    FileSystem    |
+------------------+          +------------------+
| - name: str      |<-------->| - root: Node     |
| - is_file: bool  |          +------------------+
| - parent: Node   |          | + ls(path)       |
+------------------+          | + mkdir(path)    |
        ^                     | + addContent()   |
        |                     | + readContent()  |
+-------+-------+             | + rm(path)       |
|               |             +------------------+
v               v
+-----------+  +-----------+
| Directory |  |   File    |
+-----------+  +-----------+
| children: |  | content:  |
| Dict[Node]|  | str       |
+-----------+  +-----------+
```
</div>

### Design Patterns Used

<div style="background: #fefce8; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #eab308;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Applied Patterns</div>

| Pattern | Usage | Benefit |
|---------|-------|---------|
| **Composite** | Files and directories share interface | Uniform tree traversal |
| **Trie-like Structure** | Path components as trie levels | O(path_length) access |
| **Factory** | Create files vs directories | Clean object creation |

</div>

---

## API Design

### Core Interface

```python
class FileSystem:
    def ls(self, path: str) -> List[str]:
        """
        List directory contents or return file name.

        Args:
            path: Absolute path starting with '/'

        Returns:
            Sorted list of names if directory, [filename] if file

        Raises:
            FileNotFoundError: If path doesn't exist
        """

    def mkdir(self, path: str) -> None:
        """
        Create directory, including intermediate directories.

        Args:
            path: Absolute path for new directory

        Raises:
            FileExistsError: If file exists at path
        """

    def addContentToFile(self, path: str, content: str) -> None:
        """
        Create file or append content to existing file.

        Args:
            path: Absolute path to file
            content: Content to write/append
        """

    def readContentFromFile(self, path: str) -> str:
        """
        Read file contents.

        Args:
            path: Absolute path to file

        Returns:
            File contents as string

        Raises:
            FileNotFoundError: If file doesn't exist
            IsADirectoryError: If path is a directory
        """
```

---

## Code Implementation

### Python Implementation

```python
from typing import List, Dict, Optional
import threading


class FileSystemNode:
    """Base class for file system nodes."""

    def __init__(self, name: str, is_file: bool = False):
        self.name = name
        self.is_file = is_file
        self.parent: Optional['FileSystemNode'] = None


class File(FileSystemNode):
    """Represents a file with content."""

    def __init__(self, name: str):
        super().__init__(name, is_file=True)
        self.content = ""

    def append(self, content: str) -> None:
        self.content += content

    def read(self) -> str:
        return self.content


class Directory(FileSystemNode):
    """Represents a directory containing other nodes."""

    def __init__(self, name: str):
        super().__init__(name, is_file=False)
        self.children: Dict[str, FileSystemNode] = {}

    def add_child(self, node: FileSystemNode) -> None:
        node.parent = self
        self.children[node.name] = node

    def get_child(self, name: str) -> Optional[FileSystemNode]:
        return self.children.get(name)

    def remove_child(self, name: str) -> Optional[FileSystemNode]:
        return self.children.pop(name, None)

    def list_children(self) -> List[str]:
        return sorted(self.children.keys())


class FileSystem:
    """
    In-memory file system implementation.

    Supports Unix-like operations: ls, mkdir, cat, rm.
    Uses a tree structure with directories and files as nodes.
    """

    def __init__(self):
        self.root = Directory("")
        self.lock = threading.RLock()

    def _parse_path(self, path: str) -> List[str]:
        """Parse path string into components."""
        if not path or path == "/":
            return []
        return [p for p in path.split("/") if p]

    def _traverse(self, path: str, create_dirs: bool = False) -> Optional[FileSystemNode]:
        """Traverse path and return the node."""
        components = self._parse_path(path)
        current = self.root

        for i, component in enumerate(components):
            if current.is_file:
                return None

            child = current.get_child(component)

            if child is None:
                if create_dirs and i < len(components) - 1:
                    new_dir = Directory(component)
                    current.add_child(new_dir)
                    child = new_dir
                else:
                    return None

            current = child

        return current

    def ls(self, path: str) -> List[str]:
        """List directory contents or return file name."""
        with self.lock:
            node = self._traverse(path)

            if node is None:
                raise FileNotFoundError(f"Path not found: {path}")

            if node.is_file:
                return [node.name]
            return node.list_children()

    def mkdir(self, path: str) -> None:
        """Create directory and all intermediate directories."""
        with self.lock:
            components = self._parse_path(path)
            current = self.root

            for component in components:
                if current.is_file:
                    raise NotADirectoryError(f"Not a directory: {current.name}")

                child = current.get_child(component)

                if child is None:
                    new_dir = Directory(component)
                    current.add_child(new_dir)
                    current = new_dir
                elif child.is_file:
                    raise FileExistsError(f"File exists: {component}")
                else:
                    current = child

    def addContentToFile(self, path: str, content: str) -> None:
        """Create file or append content to existing file."""
        with self.lock:
            components = self._parse_path(path)
            if not components:
                raise ValueError("Cannot create file at root")

            # Ensure parent directories exist
            parent_path = "/" + "/".join(components[:-1])
            if parent_path != "/":
                self.mkdir(parent_path)

            parent = self._traverse(parent_path) or self.root
            filename = components[-1]

            existing = parent.get_child(filename)

            if existing is None:
                new_file = File(filename)
                new_file.append(content)
                parent.add_child(new_file)
            elif existing.is_file:
                existing.append(content)
            else:
                raise IsADirectoryError(f"Is a directory: {path}")

    def readContentFromFile(self, path: str) -> str:
        """Read content from a file."""
        with self.lock:
            node = self._traverse(path)

            if node is None:
                raise FileNotFoundError(f"File not found: {path}")

            if not node.is_file:
                raise IsADirectoryError(f"Is a directory: {path}")

            return node.read()

    def rm(self, path: str, recursive: bool = False) -> bool:
        """Remove a file or directory."""
        with self.lock:
            if path == "/":
                raise PermissionError("Cannot remove root directory")

            components = self._parse_path(path)
            parent_path = "/" + "/".join(components[:-1])
            parent = self._traverse(parent_path) or self.root
            name = components[-1]

            if name not in parent.children:
                raise FileNotFoundError(f"Path not found: {path}")

            node = parent.get_child(name)

            if not node.is_file and node.children and not recursive:
                raise OSError(f"Directory not empty: {path}")

            parent.remove_child(name)
            return True


# Example usage
if __name__ == "__main__":
    fs = FileSystem()

    # Create directory structure
    fs.mkdir("/home/user/documents")
    fs.mkdir("/home/user/downloads")

    # Create files
    fs.addContentToFile("/home/user/documents/readme.txt", "Hello, World!\n")
    fs.addContentToFile("/home/user/documents/readme.txt", "Line 2\n")

    # List and read
    print("ls /home/user:", fs.ls("/home/user"))
    print("cat readme.txt:", fs.readContentFromFile("/home/user/documents/readme.txt"))
```

---

## Edge Cases

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">
<div style="color: #1e293b; font-weight: bold; margin-bottom: 12px;">Critical Edge Cases</div>

| Scenario | Expected Behavior | Implementation |
|----------|-------------------|----------------|
| **Empty path or "/"** | Return root contents | Handle in _parse_path |
| **Double slashes "//"** | Treat as single "/" | Filter empty components |
| **Path with trailing slash** | Same as without slash | Strip trailing slashes |
| **File as intermediate path** | Error - can't traverse | Check is_file in traverse |
| **Creating file at root** | Should fail | Validate path components |
| **Deleting non-empty directory** | Fail unless recursive | Check children before delete |

</div>

---

## Testing Approach

### Unit Tests

```python
import unittest


class TestFileSystem(unittest.TestCase):
    def setUp(self):
        self.fs = FileSystem()

    def test_mkdir_and_ls(self):
        self.fs.mkdir("/a/b/c")
        self.assertEqual(self.fs.ls("/"), ["a"])
        self.assertEqual(self.fs.ls("/a/b"), ["c"])

    def test_create_and_read_file(self):
        self.fs.addContentToFile("/test.txt", "Hello")
        self.assertEqual(self.fs.readContentFromFile("/test.txt"), "Hello")

    def test_append_to_file(self):
        self.fs.addContentToFile("/file.txt", "First ")
        self.fs.addContentToFile("/file.txt", "Second")
        self.assertEqual(self.fs.readContentFromFile("/file.txt"), "First Second")

    def test_ls_returns_sorted(self):
        self.fs.mkdir("/z")
        self.fs.mkdir("/a")
        self.assertEqual(self.fs.ls("/"), ["a", "z"])

    def test_read_nonexistent_file(self):
        with self.assertRaises(FileNotFoundError):
            self.fs.readContentFromFile("/nonexistent.txt")


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
| Requirements | 5 min | File vs directory, operations needed |
| Data Structure | 10 min | Tree structure, node design |
| API Design | 5 min | Define method signatures |
| Core Implementation | 20 min | ls, mkdir, file operations |
| Edge Cases | 5 min | Path parsing, error handling |

### Key Points to Mention

1. **Tree vs Trie**: Explain why tree structure (Trie-like for paths)
2. **Composite Pattern**: Files and directories share base interface
3. **Path Parsing**: Split on "/" handle edge cases
4. **Thread Safety**: Mention locks for concurrent access
5. **Error Handling**: Specific exceptions for different errors

### Common Follow-up Questions

- **How to add permissions?** Add permission bits to nodes, check on access
- **How to implement symlinks?** Add SymLink node type with target path
- **How to support wildcards?** Add glob pattern matching
- **Persistence?** Serialize tree to JSON, load on startup

### LeetCode Connection

This is **LeetCode 588: Design In-Memory File System**.

</div>

---

## Complexity Analysis

| Operation | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| ls | O(path_length + children) | O(1) |
| mkdir | O(path_length) | O(path_length) |
| addContentToFile | O(path_length + content) | O(content) |
| readContentFromFile | O(path_length) | O(content) |
| rm | O(path_length) | O(1) |
