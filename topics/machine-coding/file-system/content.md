# In-Memory File System

## Problem Statement

Design an in-memory file system that supports creating files and directories, reading/writing file contents, and navigating the directory structure.

## Requirements

- Create directories and files
- Read and write file contents
- List directory contents
- Support path navigation (absolute and relative)
- Handle file metadata (size, timestamps)

## Solution

### Python

```python
from typing import Optional, List, Dict
from datetime import datetime
from abc import ABC, abstractmethod


class FileSystemNode(ABC):
    def __init__(self, name: str, parent: 'Directory' = None):
        self.name = name
        self.parent = parent
        self.created_at = datetime.now()
        self.modified_at = datetime.now()

    @abstractmethod
    def is_directory(self) -> bool:
        pass

    def get_path(self) -> str:
        if self.parent is None:
            return "/"
        parent_path = self.parent.get_path()
        if parent_path == "/":
            return f"/{self.name}"
        return f"{parent_path}/{self.name}"


class File(FileSystemNode):
    def __init__(self, name: str, parent: 'Directory' = None):
        super().__init__(name, parent)
        self._content = ""

    def is_directory(self) -> bool:
        return False

    def read(self) -> str:
        return self._content

    def write(self, content: str) -> None:
        self._content = content
        self.modified_at = datetime.now()

    def append(self, content: str) -> None:
        self._content += content
        self.modified_at = datetime.now()

    @property
    def size(self) -> int:
        return len(self._content)


class Directory(FileSystemNode):
    def __init__(self, name: str, parent: 'Directory' = None):
        super().__init__(name, parent)
        self.children: Dict[str, FileSystemNode] = {}

    def is_directory(self) -> bool:
        return True

    def add_child(self, node: FileSystemNode) -> None:
        self.children[node.name] = node
        node.parent = self
        self.modified_at = datetime.now()

    def remove_child(self, name: str) -> Optional[FileSystemNode]:
        if name in self.children:
            node = self.children.pop(name)
            node.parent = None
            self.modified_at = datetime.now()
            return node
        return None

    def get_child(self, name: str) -> Optional[FileSystemNode]:
        return self.children.get(name)

    def list_children(self) -> List[str]:
        return sorted(self.children.keys())


class FileSystem:
    def __init__(self):
        self.root = Directory("")
        self.current_dir = self.root

    def _resolve_path(self, path: str) -> Optional[FileSystemNode]:
        """Resolve a path to a FileSystemNode."""
        if not path:
            return self.current_dir

        # Absolute vs relative path
        if path.startswith("/"):
            node = self.root
            parts = path.strip("/").split("/") if path != "/" else []
        else:
            node = self.current_dir
            parts = path.split("/")

        for part in parts:
            if not part or part == ".":
                continue
            elif part == "..":
                if node.parent:
                    node = node.parent
            elif isinstance(node, Directory):
                child = node.get_child(part)
                if child is None:
                    return None
                node = child
            else:
                return None

        return node

    def _get_parent_and_name(self, path: str) -> tuple:
        """Split path into parent directory and name."""
        path = path.rstrip("/")
        if "/" not in path:
            return self.current_dir, path

        parts = path.rsplit("/", 1)
        parent_path = parts[0] if parts[0] else "/"
        name = parts[1]

        parent = self._resolve_path(parent_path)
        return parent, name

    def mkdir(self, path: str) -> bool:
        """Create a directory."""
        parent, name = self._get_parent_and_name(path)

        if not isinstance(parent, Directory):
            print(f"Error: Parent path is not a directory")
            return False

        if parent.get_child(name):
            print(f"Error: '{name}' already exists")
            return False

        new_dir = Directory(name, parent)
        parent.add_child(new_dir)
        return True

    def mkdirp(self, path: str) -> bool:
        """Create directory and all parent directories."""
        if path.startswith("/"):
            current = self.root
            parts = path.strip("/").split("/")
        else:
            current = self.current_dir
            parts = path.split("/")

        for part in parts:
            if not part:
                continue
            child = current.get_child(part)
            if child is None:
                new_dir = Directory(part, current)
                current.add_child(new_dir)
                current = new_dir
            elif isinstance(child, Directory):
                current = child
            else:
                print(f"Error: '{part}' is a file")
                return False

        return True

    def touch(self, path: str) -> bool:
        """Create an empty file."""
        parent, name = self._get_parent_and_name(path)

        if not isinstance(parent, Directory):
            print(f"Error: Parent path is not a directory")
            return False

        if parent.get_child(name):
            print(f"Error: '{name}' already exists")
            return False

        new_file = File(name, parent)
        parent.add_child(new_file)
        return True

    def write_file(self, path: str, content: str) -> bool:
        """Write content to a file (creates if doesn't exist)."""
        node = self._resolve_path(path)

        if node is None:
            # Create new file
            parent, name = self._get_parent_and_name(path)
            if not isinstance(parent, Directory):
                print(f"Error: Parent path is not a directory")
                return False
            new_file = File(name, parent)
            new_file.write(content)
            parent.add_child(new_file)
            return True
        elif isinstance(node, File):
            node.write(content)
            return True
        else:
            print(f"Error: '{path}' is a directory")
            return False

    def read_file(self, path: str) -> Optional[str]:
        """Read content from a file."""
        node = self._resolve_path(path)

        if node is None:
            print(f"Error: File not found")
            return None
        elif isinstance(node, File):
            return node.read()
        else:
            print(f"Error: '{path}' is a directory")
            return None

    def rm(self, path: str) -> bool:
        """Remove a file."""
        parent, name = self._get_parent_and_name(path)

        if not isinstance(parent, Directory):
            return False

        node = parent.get_child(name)
        if node is None:
            print(f"Error: '{path}' not found")
            return False

        if isinstance(node, Directory) and node.children:
            print(f"Error: Directory not empty")
            return False

        parent.remove_child(name)
        return True

    def rmrf(self, path: str) -> bool:
        """Remove file or directory recursively."""
        parent, name = self._get_parent_and_name(path)

        if not isinstance(parent, Directory):
            return False

        if parent.get_child(name):
            parent.remove_child(name)
            return True
        return False

    def ls(self, path: str = "") -> List[str]:
        """List directory contents."""
        node = self._resolve_path(path) if path else self.current_dir

        if isinstance(node, Directory):
            return node.list_children()
        elif isinstance(node, File):
            return [node.name]
        return []

    def cd(self, path: str) -> bool:
        """Change current directory."""
        node = self._resolve_path(path)

        if isinstance(node, Directory):
            self.current_dir = node
            return True

        print(f"Error: Not a directory")
        return False

    def pwd(self) -> str:
        """Print working directory."""
        return self.current_dir.get_path()

    def find(self, path: str, name: str) -> List[str]:
        """Find files/directories by name."""
        start = self._resolve_path(path)
        if not isinstance(start, Directory):
            return []

        results = []
        self._find_recursive(start, name, results)
        return results

    def _find_recursive(self, directory: Directory, name: str, results: List[str]):
        for child_name, child in directory.children.items():
            if name in child_name:
                results.append(child.get_path())
            if isinstance(child, Directory):
                self._find_recursive(child, name, results)

    def tree(self, path: str = "", indent: str = "") -> str:
        """Display directory tree."""
        node = self._resolve_path(path) if path else self.current_dir
        if not isinstance(node, Directory):
            return node.name

        lines = [node.name + "/"]
        children = list(node.children.values())
        for i, child in enumerate(children):
            is_last = i == len(children) - 1
            prefix = "└── " if is_last else "├── "
            if isinstance(child, Directory):
                subtree = self._tree_recursive(child, "    " if is_last else "│   ")
                lines.append(indent + prefix + subtree)
            else:
                lines.append(indent + prefix + child.name)

        return "\n".join(lines)

    def _tree_recursive(self, directory: Directory, indent: str) -> str:
        lines = [directory.name + "/"]
        children = list(directory.children.values())
        for i, child in enumerate(children):
            is_last = i == len(children) - 1
            prefix = "└── " if is_last else "├── "
            if isinstance(child, Directory):
                subtree = self._tree_recursive(child, indent + ("    " if is_last else "│   "))
                lines.append(indent + prefix + subtree)
            else:
                lines.append(indent + prefix + child.name)
        return "\n".join(lines)


# Usage
fs = FileSystem()

# Create directories
fs.mkdir("/home")
fs.mkdir("/home/user")
fs.mkdirp("/var/log/app")

# Create and write files
fs.touch("/home/user/notes.txt")
fs.write_file("/home/user/notes.txt", "Hello, World!")
fs.write_file("/var/log/app/server.log", "Server started\n")

# Navigate
fs.cd("/home/user")
print(f"PWD: {fs.pwd()}")

# Read file
content = fs.read_file("notes.txt")
print(f"Content: {content}")

# List contents
print(f"Root contents: {fs.ls('/')}")

# Display tree
fs.cd("/")
print("\nDirectory Tree:")
print(fs.tree())
```

### Go

```go
package main

import (
	"errors"
	"fmt"
	"sort"
	"strings"
	"sync"
	"time"
)

type FileSystemNode interface {
	Name() string
	Path() string
	IsDirectory() bool
	Parent() *Directory
	SetParent(d *Directory)
	CreatedAt() time.Time
	ModifiedAt() time.Time
}

type baseNode struct {
	name       string
	parent     *Directory
	createdAt  time.Time
	modifiedAt time.Time
}

func (n *baseNode) Name() string          { return n.name }
func (n *baseNode) Parent() *Directory    { return n.parent }
func (n *baseNode) SetParent(d *Directory) { n.parent = d }
func (n *baseNode) CreatedAt() time.Time  { return n.createdAt }
func (n *baseNode) ModifiedAt() time.Time { return n.modifiedAt }

func (n *baseNode) Path() string {
	if n.parent == nil {
		return "/"
	}
	parentPath := n.parent.Path()
	if parentPath == "/" {
		return "/" + n.name
	}
	return parentPath + "/" + n.name
}

type File struct {
	baseNode
	content string
}

func NewFile(name string) *File {
	now := time.Now()
	return &File{
		baseNode: baseNode{
			name:       name,
			createdAt:  now,
			modifiedAt: now,
		},
	}
}

func (f *File) IsDirectory() bool { return false }
func (f *File) Read() string      { return f.content }
func (f *File) Size() int         { return len(f.content) }

func (f *File) Write(content string) {
	f.content = content
	f.modifiedAt = time.Now()
}

func (f *File) Append(content string) {
	f.content += content
	f.modifiedAt = time.Now()
}

type Directory struct {
	baseNode
	children map[string]FileSystemNode
	mu       sync.RWMutex
}

func NewDirectory(name string) *Directory {
	now := time.Now()
	return &Directory{
		baseNode: baseNode{
			name:       name,
			createdAt:  now,
			modifiedAt: now,
		},
		children: make(map[string]FileSystemNode),
	}
}

func (d *Directory) IsDirectory() bool { return true }

func (d *Directory) AddChild(node FileSystemNode) {
	d.mu.Lock()
	defer d.mu.Unlock()
	d.children[node.Name()] = node
	node.SetParent(d)
	d.modifiedAt = time.Now()
}

func (d *Directory) RemoveChild(name string) FileSystemNode {
	d.mu.Lock()
	defer d.mu.Unlock()
	if node, exists := d.children[name]; exists {
		delete(d.children, name)
		node.SetParent(nil)
		d.modifiedAt = time.Now()
		return node
	}
	return nil
}

func (d *Directory) GetChild(name string) FileSystemNode {
	d.mu.RLock()
	defer d.mu.RUnlock()
	return d.children[name]
}

func (d *Directory) ListChildren() []string {
	d.mu.RLock()
	defer d.mu.RUnlock()
	names := make([]string, 0, len(d.children))
	for name := range d.children {
		names = append(names, name)
	}
	sort.Strings(names)
	return names
}

func (d *Directory) IsEmpty() bool {
	d.mu.RLock()
	defer d.mu.RUnlock()
	return len(d.children) == 0
}

type FileSystem struct {
	root       *Directory
	currentDir *Directory
}

func NewFileSystem() *FileSystem {
	root := NewDirectory("")
	return &FileSystem{
		root:       root,
		currentDir: root,
	}
}

func (fs *FileSystem) resolvePath(path string) FileSystemNode {
	if path == "" {
		return fs.currentDir
	}

	var node FileSystemNode
	var parts []string

	if strings.HasPrefix(path, "/") {
		node = fs.root
		path = strings.Trim(path, "/")
		if path == "" {
			return fs.root
		}
		parts = strings.Split(path, "/")
	} else {
		node = fs.currentDir
		parts = strings.Split(path, "/")
	}

	for _, part := range parts {
		if part == "" || part == "." {
			continue
		}
		if part == ".." {
			if dir, ok := node.(*Directory); ok && dir.Parent() != nil {
				node = dir.Parent()
			}
			continue
		}

		if dir, ok := node.(*Directory); ok {
			child := dir.GetChild(part)
			if child == nil {
				return nil
			}
			node = child
		} else {
			return nil
		}
	}

	return node
}

func (fs *FileSystem) getParentAndName(path string) (*Directory, string) {
	path = strings.TrimRight(path, "/")
	lastSlash := strings.LastIndex(path, "/")

	if lastSlash == -1 {
		return fs.currentDir, path
	}

	parentPath := path[:lastSlash]
	if parentPath == "" {
		parentPath = "/"
	}
	name := path[lastSlash+1:]

	parent := fs.resolvePath(parentPath)
	if dir, ok := parent.(*Directory); ok {
		return dir, name
	}
	return nil, name
}

func (fs *FileSystem) Mkdir(path string) error {
	parent, name := fs.getParentAndName(path)
	if parent == nil {
		return errors.New("parent path is not a directory")
	}
	if parent.GetChild(name) != nil {
		return errors.New("already exists")
	}

	newDir := NewDirectory(name)
	parent.AddChild(newDir)
	return nil
}

func (fs *FileSystem) MkdirP(path string) error {
	var current *Directory
	var parts []string

	if strings.HasPrefix(path, "/") {
		current = fs.root
		parts = strings.Split(strings.Trim(path, "/"), "/")
	} else {
		current = fs.currentDir
		parts = strings.Split(path, "/")
	}

	for _, part := range parts {
		if part == "" {
			continue
		}
		child := current.GetChild(part)
		if child == nil {
			newDir := NewDirectory(part)
			current.AddChild(newDir)
			current = newDir
		} else if dir, ok := child.(*Directory); ok {
			current = dir
		} else {
			return errors.New("path component is a file")
		}
	}
	return nil
}

func (fs *FileSystem) WriteFile(path, content string) error {
	node := fs.resolvePath(path)

	if node == nil {
		parent, name := fs.getParentAndName(path)
		if parent == nil {
			return errors.New("parent directory doesn't exist")
		}
		newFile := NewFile(name)
		newFile.Write(content)
		parent.AddChild(newFile)
		return nil
	}

	if file, ok := node.(*File); ok {
		file.Write(content)
		return nil
	}

	return errors.New("path is a directory")
}

func (fs *FileSystem) ReadFile(path string) (string, error) {
	node := fs.resolvePath(path)
	if node == nil {
		return "", errors.New("file not found")
	}
	if file, ok := node.(*File); ok {
		return file.Read(), nil
	}
	return "", errors.New("path is a directory")
}

func (fs *FileSystem) Rm(path string) error {
	parent, name := fs.getParentAndName(path)
	if parent == nil {
		return errors.New("parent not found")
	}

	node := parent.GetChild(name)
	if node == nil {
		return errors.New("not found")
	}

	if dir, ok := node.(*Directory); ok && !dir.IsEmpty() {
		return errors.New("directory not empty")
	}

	parent.RemoveChild(name)
	return nil
}

func (fs *FileSystem) Ls(path string) []string {
	var node FileSystemNode
	if path == "" {
		node = fs.currentDir
	} else {
		node = fs.resolvePath(path)
	}

	if dir, ok := node.(*Directory); ok {
		return dir.ListChildren()
	}
	if node != nil {
		return []string{node.Name()}
	}
	return nil
}

func (fs *FileSystem) Cd(path string) error {
	node := fs.resolvePath(path)
	if dir, ok := node.(*Directory); ok {
		fs.currentDir = dir
		return nil
	}
	return errors.New("not a directory")
}

func (fs *FileSystem) Pwd() string {
	return fs.currentDir.Path()
}

func main() {
	fs := NewFileSystem()

	// Create directories
	fs.Mkdir("/home")
	fs.Mkdir("/home/user")
	fs.MkdirP("/var/log/app")

	// Create and write files
	fs.WriteFile("/home/user/notes.txt", "Hello, World!")
	fs.WriteFile("/var/log/app/server.log", "Server started\n")

	// Navigate
	fs.Cd("/home/user")
	fmt.Println("PWD:", fs.Pwd())

	// Read file
	content, _ := fs.ReadFile("notes.txt")
	fmt.Println("Content:", content)

	// List contents
	fmt.Println("Root contents:", fs.Ls("/"))
	fmt.Println("/home/user contents:", fs.Ls("/home/user"))
}
```

## Design Patterns Used

- **Composite Pattern**: Files and Directories share FileSystemNode interface
- **Iterator Pattern**: Tree traversal for find/tree operations

## Interview Tips

- Explain the composite pattern for file/directory hierarchy
- Discuss thread-safety for concurrent access
- Consider path resolution (absolute vs relative)
- Handle edge cases (symlinks, permissions)
