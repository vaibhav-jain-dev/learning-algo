# In-Memory File System Design

## Problem Statement

Design and implement an in-memory file system that supports hierarchical organization, CRUD operations on files and directories, path resolution, permissions, and search capabilities. This problem tests deep understanding of tree data structures, the Composite design pattern, and operating systems fundamentals.

This appears frequently at FAANG companies (LeetCode 588) and can be extended to cover distributed file systems, making it a multi-layered interview topic.

---

## Core Mental Model

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; padding: 24px; margin: 24px 0;">
<div style="color: #ffffff; font-weight: bold; font-size: 18px; margin-bottom: 16px;">The Unified Tree Abstraction</div>
<div style="color: #f0f0f0; font-size: 15px; line-height: 1.8;">

A file system is fundamentally a **rooted tree** where:
- **Every node is either a leaf (file) or an internal node (directory)**
- **Paths are sequences of edge labels from root to target**
- **The tree supports uniform operations on heterogeneous node types**

This abstraction enables the **Composite Pattern**: treating individual objects (files) and compositions (directories) uniformly. The key insight is that both files and directories are "entries" in a parent directory's namespace.

</div>
</div>

---

## Section 1: The Composite Pattern Deep Dive

### 1.1 Pattern Structure and Intent

The Composite Pattern is the architectural backbone of every file system implementation. It allows clients to treat individual objects and compositions uniformly through a common interface.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Composite Pattern Architecture</h4>

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="display: flex; justify-content: center;">
<div style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 12px; padding: 20px 40px; text-align: center; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
<div style="color: #ffffff; font-weight: bold; font-size: 16px;">FileSystemEntry</div>
<div style="color: #bfdbfe; font-size: 12px; margin-top: 8px;">Abstract Component</div>
<div style="color: #e0e7ff; font-size: 11px; margin-top: 12px; font-family: monospace; text-align: left;">
+ getName(): String<br/>
+ getPath(): String<br/>
+ getSize(): Long<br/>
+ getParent(): Entry<br/>
+ isDirectory(): Boolean<br/>
+ accept(Visitor): void
</div>
</div>
</div>

<div style="display: flex; justify-content: center;">
<div style="color: #64748b; font-size: 24px;">|</div>
</div>

<div style="display: flex; justify-content: center; gap: 48px; flex-wrap: wrap;">
<div style="background: linear-gradient(135deg, #22c55e, #16a34a); border-radius: 12px; padding: 20px 32px; text-align: center; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);">
<div style="color: #ffffff; font-weight: bold; font-size: 14px;">File</div>
<div style="color: #bbf7d0; font-size: 11px; margin-top: 4px;">Leaf Component</div>
<div style="color: #dcfce7; font-size: 10px; margin-top: 10px; font-family: monospace; text-align: left;">
- content: byte[]<br/>
- mimeType: String<br/>
+ read(): byte[]<br/>
+ write(data): void<br/>
+ getSize(): contentLen
</div>
</div>

<div style="background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 12px; padding: 20px 32px; text-align: center; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);">
<div style="color: #ffffff; font-weight: bold; font-size: 14px;">Directory</div>
<div style="color: #fef3c7; font-size: 11px; margin-top: 4px;">Composite Component</div>
<div style="color: #fef9c3; font-size: 10px; margin-top: 10px; font-family: monospace; text-align: left;">
- children: Map&lt;String, Entry&gt;<br/>
+ add(Entry): void<br/>
+ remove(name): Entry<br/>
+ getChild(name): Entry<br/>
+ getSize(): sum(children)
</div>
</div>
</div>

</div>
</div>

<div style="background: #fefce8; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #eab308;">
<div style="color: #854d0e; font-weight: bold; margin-bottom: 12px;">Key Insight: Uniform Interface, Polymorphic Behavior</div>
<div style="color: #713f12; font-size: 14px; line-height: 1.8;">

The power of Composite lies in **behavioral polymorphism**:
- `getSize()` on a File returns content length
- `getSize()` on a Directory recursively sums children's sizes
- Client code calls `entry.getSize()` without knowing the concrete type

This enables recursive algorithms to naturally traverse the tree without type-checking.

</div>
</div>

### 1.2 Design Trade-offs in Component Interface

<div style="background: #fff7ed; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #f97316;">
<div style="color: #9a3412; font-weight: bold; margin-bottom: 12px;">Critical Design Decision: Where to Place Child Management</div>
<div style="color: #7c2d12; font-size: 14px; line-height: 1.8;">

**Option A: Methods in Base Class (Transparency)**
```python
class FileSystemEntry:
    def add(self, child): raise NotImplementedError
    def remove(self, name): raise NotImplementedError
```
- Pro: Uniform interface; clients never need to cast
- Con: Files must throw exceptions for child operations (LSP violation)

**Option B: Methods Only in Directory (Safety)**
```python
class Directory(FileSystemEntry):
    def add(self, child): ...  # Only Directory has this
```
- Pro: Type-safe; no invalid operations possible
- Con: Clients must cast to Directory to add children

**Industry Standard**: Most real file systems (POSIX, Windows) use Option B with explicit type checking via `isDirectory()`. The trade-off favors safety over transparency because invalid operations (adding child to file) should be **compile-time errors**, not runtime exceptions.

</div>
</div>

### 1.3 Interview Questions: Composite Pattern

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: bold; margin-bottom: 16px;">Level 1: Fundamentals</div>
<div style="color: #14532d; font-size: 14px; line-height: 1.8;">

**Q1.1**: Why is Composite Pattern preferred over simple inheritance for file systems?

**Expected Answer**: Composite enables **recursive structure handling**. A directory can contain both files and other directories, and operations like `getSize()` or `delete()` naturally recurse through the tree. Simple inheritance would require explicit tree traversal logic at every call site.

</div>
</div>

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 16px;">Level 2: Design Trade-offs</div>
<div style="color: #1e3a8a; font-size: 14px; line-height: 1.8;">

**Q1.2**: How would you handle the case where `addChild()` is called on a File?

**Follow-up**: What are the implications of throwing `UnsupportedOperationException` vs. not having the method at all?

**Expected Answer**:
- **Throwing exception**: Violates Liskov Substitution Principle; base class promises a method that subclass cannot fulfill
- **Not having method**: Requires runtime type checking (`if (entry instanceof Directory)`)
- **Best practice**: Use the **Visitor Pattern** for operations that differ by type, keeping the base interface minimal

**Follow-up 2**: Show how Visitor Pattern solves this.

```python
class FileSystemVisitor:
    def visit_file(self, file): pass
    def visit_directory(self, directory): pass

class SizeCalculator(FileSystemVisitor):
    def visit_file(self, file):
        return len(file.content)
    def visit_directory(self, directory):
        return sum(child.accept(self) for child in directory.children)
```

</div>
</div>

<div style="background: #fdf2f8; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ec4899;">
<div style="color: #9d174d; font-weight: bold; margin-bottom: 16px;">Level 3: System Design Integration</div>
<div style="color: #831843; font-size: 14px; line-height: 1.8;">

**Q1.3**: In a distributed file system like HDFS, how does the Composite pattern manifest differently?

**Follow-up**: How would you modify the pattern to support file blocks distributed across nodes?

**Expected Answer**:
In HDFS, the **NameNode** maintains the Composite tree structure (metadata only), while actual file content is split into **blocks** distributed across **DataNodes**.

The pattern modification:
```python
class DistributedFile(FileSystemEntry):
    def __init__(self, name):
        self.blocks: List[BlockLocation] = []  # (block_id, [datanode_addresses])

    def read(self, offset, length):
        # 1. Determine which blocks contain the range
        # 2. Contact DataNodes in parallel
        # 3. Reconstruct data from block fragments
```

**Key insight**: The Composite pattern handles the **namespace** (tree structure), but a separate **block management layer** handles data distribution. This separation enables:
- NameNode high availability (metadata replication)
- DataNode horizontal scaling (add nodes for capacity)
- Block replication factor independent of directory structure

</div>
</div>

---

## Section 2: File vs. Directory - Internal Mechanisms

### 2.1 Fundamental Differences

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 24px 0; text-align: center; font-size: 18px;">File vs. Directory Comparison</h4>

<div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;">

<div style="background: #ffffff; border: 2px solid #22c55e; border-radius: 12px; padding: 24px; min-width: 280px; flex: 1; max-width: 380px;">
<div style="color: #166534; font-weight: bold; font-size: 16px; margin-bottom: 16px; text-align: center;">File (Leaf Node)</div>
<div style="color: #334155; font-size: 13px; line-height: 2;">
<strong>Purpose:</strong> Store arbitrary byte sequences<br/>
<strong>Children:</strong> None (terminal node)<br/>
<strong>Size semantics:</strong> Content byte length<br/>
<strong>I/O operations:</strong> read(), write(), append(), truncate()<br/>
<strong>Metadata:</strong> mime-type, encoding, checksum<br/>
<strong>Special types:</strong> Regular, symlink, device, socket, pipe
</div>
</div>

<div style="background: #ffffff; border: 2px solid #f59e0b; border-radius: 12px; padding: 24px; min-width: 280px; flex: 1; max-width: 380px;">
<div style="color: #b45309; font-weight: bold; font-size: 16px; margin-bottom: 16px; text-align: center;">Directory (Composite Node)</div>
<div style="color: #334155; font-size: 13px; line-height: 2;">
<strong>Purpose:</strong> Namespace for child entries<br/>
<strong>Children:</strong> Map of name to FileSystemEntry<br/>
<strong>Size semantics:</strong> Entry count or recursive sum<br/>
<strong>Operations:</strong> list(), addChild(), removeChild(), lookup()<br/>
<strong>Metadata:</strong> Entry count, last modified<br/>
<strong>Special entries:</strong> "." (self), ".." (parent)
</div>
</div>

</div>
</div>

### 2.2 The Inode Abstraction

<div style="background: #f0f9ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #0ea5e9;">
<div style="color: #0c4a6e; font-weight: bold; margin-bottom: 12px;">Real-World Insight: Separating Name from Content</div>
<div style="color: #164e63; font-size: 14px; line-height: 1.8;">

In Unix-like systems, files have two distinct components:

1. **Directory Entry (dentry)**: Maps name to inode number within a directory
2. **Inode**: Contains metadata and data block pointers (name-independent)

This separation enables **hard links**: multiple directory entries pointing to the same inode. The file's content persists until the **link count** drops to zero.

```python
class Inode:
    def __init__(self, inode_number):
        self.inode_number = inode_number
        self.link_count = 1
        self.permissions = 0o644
        self.owner_uid = 0
        self.group_gid = 0
        self.size = 0
        self.data_blocks = []  # Block pointers
        self.atime = None  # Last access
        self.mtime = None  # Last modification
        self.ctime = None  # Last status change

class DirectoryEntry:
    def __init__(self, name, inode_number):
        self.name = name
        self.inode_number = inode_number
```

**Design Implication**: For interview purposes, you can simplify by merging name into the node. But mention the inode abstraction to demonstrate deep understanding.

</div>
</div>

### 2.3 Interview Questions: File vs. Directory

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: bold; margin-bottom: 16px;">Level 1: Fundamentals</div>
<div style="color: #14532d; font-size: 14px; line-height: 1.8;">

**Q2.1**: What data structure would you use to store children in a directory, and why?

**Expected Answer**:
- **HashMap/Dictionary**: O(1) lookup by name (most common choice)
- **TreeMap/SortedDict**: O(log n) lookup but maintains sorted order (useful if `ls` must be sorted)
- **Trie**: Efficient prefix matching for glob patterns, but complex

For interviews, HashMap is the standard choice. Mention sorting can be done at query time if needed.

</div>
</div>

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 16px;">Level 2: Edge Cases and Semantics</div>
<div style="color: #1e3a8a; font-size: 14px; line-height: 1.8;">

**Q2.2**: What happens when you delete a file that has hard links? What about when you delete an open file?

**Expected Answer**:
- **Hard links**: Deleting removes one directory entry, decrements link count. File data persists until link_count = 0.
- **Open file deletion**: In Unix, the directory entry is removed immediately, but the inode and data persist until all file descriptors are closed. The file becomes "unlinked but not deleted."

```python
def delete(self, path):
    entry = self.resolve(path)
    parent = entry.parent
    parent.remove_child(entry.name)
    entry.inode.link_count -= 1

    if entry.inode.link_count == 0 and entry.inode.open_count == 0:
        self.free_blocks(entry.inode.data_blocks)
        self.free_inode(entry.inode.inode_number)
```

**Follow-up**: How does this differ in Windows?
Windows uses a "delete pending" state; the file cannot be deleted while open (common source of "file in use" errors).

</div>
</div>

<div style="background: #fdf2f8; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ec4899;">
<div style="color: #9d174d; font-weight: bold; margin-bottom: 16px;">Level 3: System Design</div>
<div style="color: #831843; font-size: 14px; line-height: 1.8;">

**Q2.3**: How would you implement sparse files, and what are the trade-offs?

**Expected Answer**:
A sparse file has "holes" - regions that contain only zeros but don't consume disk space.

```python
class SparseFile:
    def __init__(self):
        self.blocks = {}  # offset -> data_block (only allocated blocks)
        self.logical_size = 0

    def write(self, offset, data):
        block_num = offset // BLOCK_SIZE
        self.blocks[block_num] = data
        self.logical_size = max(self.logical_size, offset + len(data))

    def read(self, offset, length):
        block_num = offset // BLOCK_SIZE
        if block_num in self.blocks:
            return self.blocks[block_num]
        return b'\x00' * BLOCK_SIZE  # Return zeros for holes
```

**Trade-offs**:
- **Pro**: Efficient storage for files with large zero regions (VM images, databases)
- **Con**: Fragmentation; copying sparse files may "expand" them; backup tools must be sparse-aware
- **Implementation detail**: `lseek(SEEK_HOLE)` and `lseek(SEEK_DATA)` allow efficient sparse file traversal

</div>
</div>

---

## Section 3: Path Resolution - The Critical Algorithm

### 3.1 Path Resolution Mechanics

Path resolution is the process of converting a string path like `/home/user/documents/file.txt` into a reference to the actual file system node. This is the **most frequently called operation** in any file system.

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Path Resolution Flow</h4>

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
<div style="background: #dbeafe; border-radius: 8px; padding: 16px 20px; flex: 1; min-width: 140px; text-align: center;">
<div style="color: #1e40af; font-weight: bold; font-size: 13px;">Input Path</div>
<div style="color: #3b82f6; font-size: 11px; font-family: monospace; margin-top: 4px;">/home/user/file.txt</div>
</div>
<div style="color: #94a3b8; font-size: 20px;">-></div>
<div style="background: #fef3c7; border-radius: 8px; padding: 16px 20px; flex: 1; min-width: 140px; text-align: center;">
<div style="color: #b45309; font-weight: bold; font-size: 13px;">Tokenize</div>
<div style="color: #d97706; font-size: 11px; font-family: monospace; margin-top: 4px;">["home", "user", "file.txt"]</div>
</div>
<div style="color: #94a3b8; font-size: 20px;">-></div>
<div style="background: #dcfce7; border-radius: 8px; padding: 16px 20px; flex: 1; min-width: 140px; text-align: center;">
<div style="color: #166534; font-weight: bold; font-size: 13px;">Traverse</div>
<div style="color: #22c55e; font-size: 11px; font-family: monospace; margin-top: 4px;">root->home->user->file</div>
</div>
<div style="color: #94a3b8; font-size: 20px;">-></div>
<div style="background: #fce7f3; border-radius: 8px; padding: 16px 20px; flex: 1; min-width: 140px; text-align: center;">
<div style="color: #9d174d; font-weight: bold; font-size: 13px;">Return Node</div>
<div style="color: #ec4899; font-size: 11px; font-family: monospace; margin-top: 4px;">FileNode @ 0x7f...</div>
</div>
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin-top: 12px;">
<div style="color: #475569; font-size: 13px; font-weight: bold; margin-bottom: 8px;">At Each Step, Check:</div>
<div style="color: #64748b; font-size: 12px; line-height: 1.8;">
1. Does the child exist in current directory? (FileNotFoundError)<br/>
2. Is current node a directory? (NotADirectoryError if traversing through file)<br/>
3. Do we have execute permission on directory? (PermissionError)<br/>
4. Is this a symbolic link? (Follow or return based on flags)
</div>
</div>

</div>
</div>

### 3.2 Implementation with Edge Cases

```python
from typing import Optional, List, Tuple
from enum import Enum, auto

class PathResolutionError(Exception):
    pass

class ResolutionFlags(Enum):
    FOLLOW_SYMLINKS = auto()      # Follow final symlink
    FOLLOW_ALL_SYMLINKS = auto()  # Follow all symlinks in path
    CREATE_PARENTS = auto()       # mkdir -p behavior
    NO_FOLLOW = auto()            # lstat behavior

class PathResolver:
    """
    Resolves string paths to file system nodes.

    Handles: absolute paths, relative paths, "..", ".", symlinks,
    permission checks, and path normalization.
    """

    MAX_SYMLINK_DEPTH = 40  # Prevent infinite symlink loops

    def __init__(self, root: 'Directory', cwd: 'Directory'):
        self.root = root
        self.cwd = cwd

    def resolve(
        self,
        path: str,
        flags: set = None,
        check_permissions: bool = True
    ) -> 'FileSystemEntry':
        """
        Resolve a path to its target node.

        Args:
            path: Absolute or relative path
            flags: Set of ResolutionFlags
            check_permissions: Whether to verify execute permission on directories

        Returns:
            The target FileSystemEntry

        Raises:
            FileNotFoundError: Component doesn't exist
            NotADirectoryError: Non-directory in path prefix
            PermissionError: No execute permission on directory
            OSError: Symlink loop detected
        """
        flags = flags or {ResolutionFlags.FOLLOW_SYMLINKS}

        # Normalize and tokenize
        components = self._normalize_path(path)

        # Start from root or cwd
        current = self.root if path.startswith('/') else self.cwd
        symlink_count = 0

        for i, component in enumerate(components):
            is_last = (i == len(components) - 1)

            # Handle special directories
            if component == '.':
                continue
            elif component == '..':
                current = current.parent if current.parent else current
                continue

            # Must be a directory to traverse
            if not current.is_directory():
                raise NotADirectoryError(
                    f"Not a directory: {'/'.join(components[:i])}"
                )

            # Permission check: need execute to traverse directory
            if check_permissions and not current.can_execute(self._get_current_user()):
                raise PermissionError(
                    f"Permission denied: {current.get_path()}"
                )

            # Lookup child
            child = current.get_child(component)
            if child is None:
                if ResolutionFlags.CREATE_PARENTS in flags and not is_last:
                    child = Directory(component)
                    current.add_child(child)
                else:
                    raise FileNotFoundError(
                        f"No such file or directory: {path}"
                    )

            # Handle symlinks
            if child.is_symlink():
                should_follow = (
                    ResolutionFlags.FOLLOW_ALL_SYMLINKS in flags or
                    (is_last and ResolutionFlags.FOLLOW_SYMLINKS in flags)
                )

                if should_follow:
                    symlink_count += 1
                    if symlink_count > self.MAX_SYMLINK_DEPTH:
                        raise OSError(f"Too many levels of symbolic links: {path}")

                    # Resolve symlink target (may be relative to symlink's parent)
                    target_path = child.target
                    if not target_path.startswith('/'):
                        target_path = current.get_path() + '/' + target_path

                    child = self.resolve(target_path, flags, check_permissions)

            current = child

        return current

    def _normalize_path(self, path: str) -> List[str]:
        """
        Normalize path: handle //, trailing /, etc.

        Does NOT resolve . or .. here - that requires traversal
        to handle symlinks correctly.
        """
        if not path:
            return []

        # Split and filter empty components (handles // and trailing /)
        components = [c for c in path.split('/') if c]

        return components

    def _get_current_user(self):
        """Return current user context for permission checks."""
        # In real implementation, this comes from process credentials
        return self.current_user
```

### 3.3 Critical Edge Cases

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">
<div style="color: #991b1b; font-weight: bold; margin-bottom: 12px;">Edge Cases That Break Naive Implementations</div>
<div style="color: #7f1d1d; font-size: 14px; line-height: 1.8;">

| Case | Input | Correct Behavior |
|------|-------|------------------|
| **Empty path** | `""` | Return cwd (or error) |
| **Root only** | `"/"` | Return root directory |
| **Double slash** | `"/home//user"` | Same as `/home/user` |
| **Trailing slash** | `"/home/user/"` | Same as `/home/user` (for dirs) |
| **Parent of root** | `"/.."` | Return root (can't go above) |
| **Symlink loop** | `a->b, b->a` | Detect and error after N iterations |
| **Dangling symlink** | `link -> /nonexistent` | Error or return symlink node |
| **Relative symlink** | `link -> ../file` | Resolve relative to symlink's parent |
| **Permission in path** | `/secret/file` | Error if no +x on `/secret` |
| **File in path** | `/file.txt/subdir` | NotADirectoryError |

</div>
</div>

<div style="background: #fefce8; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #eab308;">
<div style="color: #854d0e; font-weight: bold; margin-bottom: 12px;">Why "." and ".." Can't Be Pre-normalized</div>
<div style="color: #713f12; font-size: 14px; line-height: 1.8;">

A common mistake is to normalize `a/b/../c` to `a/c` before traversal. This is **incorrect** when symlinks are involved:

```
/dir/link -> /other/path
/dir/link/../file
```

Naive normalization: `/dir/file` (WRONG)
Correct resolution: `/other/file` (follows symlink first, then goes to parent)

**Rule**: Only handle `.` and `..` during traversal, after resolving each component.

</div>
</div>

### 3.4 Interview Questions: Path Resolution

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: bold; margin-bottom: 16px;">Level 1: Fundamentals</div>
<div style="color: #14532d; font-size: 14px; line-height: 1.8;">

**Q3.1**: What is the time complexity of path resolution, and what dominates the cost in practice?

**Expected Answer**:
- **Theoretical**: O(path_length * lookup_time) = O(k * 1) = O(k) with hash maps
- **Practical**: Directory entry lookup is often the bottleneck. In real file systems, this involves disk I/O for directory blocks.
- **Optimization**: **dentry cache** (dcache in Linux) caches resolved path->inode mappings. Most path resolutions hit the cache and avoid traversal entirely.

</div>
</div>

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 16px;">Level 2: Symlinks and Edge Cases</div>
<div style="color: #1e3a8a; font-size: 14px; line-height: 1.8;">

**Q3.2**: How do you detect and prevent symlink loops? What's the standard limit?

**Expected Answer**:
Track symlink resolution count during traversal. POSIX systems typically limit to **40** (SYMLOOP_MAX). When exceeded, return ELOOP.

```python
def resolve_with_loop_detection(self, path):
    return self._resolve(path, symlink_count=0)

def _resolve(self, path, symlink_count):
    if symlink_count > 40:
        raise OSError(errno.ELOOP, "Too many symbolic links")
    # ... resolve, incrementing symlink_count when following
```

**Follow-up**: What if someone creates a very long chain (not a loop) of 100 symlinks?
Same limit applies - prevents both loops and excessive indirection. The limit is about **complexity**, not just cycles.

</div>
</div>

<div style="background: #fdf2f8; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ec4899;">
<div style="color: #9d174d; font-weight: bold; margin-bottom: 16px;">Level 3: Race Conditions (TOCTOU)</div>
<div style="color: #831843; font-size: 14px; line-height: 1.8;">

**Q3.3**: Explain the TOCTOU vulnerability in path resolution and how real file systems mitigate it.

**Expected Answer**:
**TOCTOU** (Time-Of-Check-Time-Of-Use): Between checking a path and using the result, the path could change.

```python
# Vulnerable code
if os.path.exists("/tmp/safe_file"):  # Check
    data = open("/tmp/safe_file").read()  # Use - file might be different!
```

An attacker could replace `/tmp/safe_file` with a symlink to `/etc/passwd` between check and use.

**Mitigations**:
1. **openat()** system calls: Open parent directory, then operate relative to file descriptor (fd doesn't change even if path does)
2. **O_NOFOLLOW**: Refuse to follow symlinks
3. **fstat()** after open: Verify file is what you expect (inode, device)
4. **Atomic operations**: Use rename() for atomic updates

```python
# Safe pattern using openat
dir_fd = os.open("/tmp", os.O_RDONLY | os.O_DIRECTORY)
fd = os.open("safe_file", os.O_RDONLY | os.O_NOFOLLOW, dir_fd=dir_fd)
# fd now refers to exactly the file at /tmp/safe_file, not a symlink target
```

**See also**: [[symlinks]](/topics/machine-coding/file-system/symlinks), [[security-patterns]](/topics/system-design/security)

</div>
</div>

---

## Section 4: Permission Model

### 4.1 Unix Permission Fundamentals

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Permission Bit Layout</h4>

<div style="display: flex; flex-direction: column; gap: 16px;">

<div style="display: flex; justify-content: center; gap: 4px; flex-wrap: wrap;">
<div style="background: #fee2e2; border: 2px solid #ef4444; border-radius: 8px; padding: 12px 16px; text-align: center; min-width: 80px;">
<div style="color: #991b1b; font-weight: bold; font-size: 14px;">Special</div>
<div style="color: #dc2626; font-size: 20px; font-family: monospace; margin-top: 4px;">sst</div>
<div style="color: #f87171; font-size: 10px; margin-top: 4px;">setuid/gid/sticky</div>
</div>
<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 12px 16px; text-align: center; min-width: 80px;">
<div style="color: #1e40af; font-weight: bold; font-size: 14px;">Owner</div>
<div style="color: #2563eb; font-size: 20px; font-family: monospace; margin-top: 4px;">rwx</div>
<div style="color: #60a5fa; font-size: 10px; margin-top: 4px;">7 = 111</div>
</div>
<div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 8px; padding: 12px 16px; text-align: center; min-width: 80px;">
<div style="color: #166534; font-weight: bold; font-size: 14px;">Group</div>
<div style="color: #16a34a; font-size: 20px; font-family: monospace; margin-top: 4px;">rwx</div>
<div style="color: #4ade80; font-size: 10px; margin-top: 4px;">5 = 101</div>
</div>
<div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 12px 16px; text-align: center; min-width: 80px;">
<div style="color: #b45309; font-weight: bold; font-size: 14px;">Other</div>
<div style="color: #d97706; font-size: 20px; font-family: monospace; margin-top: 4px;">rwx</div>
<div style="color: #fbbf24; font-size: 10px; margin-top: 4px;">4 = 100</div>
</div>
</div>

<div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin-top: 8px;">
<div style="color: #334155; font-size: 13px; line-height: 1.8;">
<strong>For Files:</strong> r=read content, w=write content, x=execute as program<br/>
<strong>For Directories:</strong> r=list entries, w=create/delete entries, x=traverse (access children)
</div>
</div>

</div>
</div>

### 4.2 Permission Checking Algorithm

<div style="background: #fff7ed; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #f97316;">
<div style="color: #9a3412; font-weight: bold; margin-bottom: 12px;">Critical: Permission Check Order</div>
<div style="color: #7c2d12; font-size: 14px; line-height: 1.8;">

Permission checking is **not** a simple OR of all applicable bits. The order matters:

1. **Root user (uid 0)**: Bypass all permission checks (except execute without any x bit)
2. **Owner match**: If process uid == file owner uid, use owner bits ONLY
3. **Group match**: If process gid in file's groups, use group bits ONLY
4. **Other**: Use other bits

**Key insight**: If you're the owner but owner has no read permission, you **cannot** read even if group/other have read permission. Owner bits take precedence and **exclude** group/other checks.

</div>
</div>

```python
class Permissions:
    """
    Unix-style permission model.

    Bit layout:
    - Bits 0-2: Other (rwx)
    - Bits 3-5: Group (rwx)
    - Bits 6-8: Owner (rwx)
    - Bits 9-11: Special (sticky, setgid, setuid)
    """

    READ = 0o4
    WRITE = 0o2
    EXECUTE = 0o1

    SETUID = 0o4000
    SETGID = 0o2000
    STICKY = 0o1000

    def __init__(self, mode: int = 0o644):
        self.mode = mode

    def check(
        self,
        required: int,  # e.g., READ, WRITE, or READ | WRITE
        user: 'User',
        entry: 'FileSystemEntry'
    ) -> bool:
        """
        Check if user has required permissions on entry.

        Returns True if access is granted, False otherwise.
        """
        # Root bypasses checks (except execute needs at least one x bit)
        if user.uid == 0:
            if required == self.EXECUTE:
                return (self.mode & 0o111) != 0  # Any execute bit set
            return True

        # Determine which permission class applies
        if user.uid == entry.owner_uid:
            # Owner - use bits 6-8
            applicable = (self.mode >> 6) & 0o7
        elif entry.group_gid in user.groups:
            # Group member - use bits 3-5
            applicable = (self.mode >> 3) & 0o7
        else:
            # Other - use bits 0-2
            applicable = self.mode & 0o7

        # Check if all required bits are present
        return (applicable & required) == required
```

### 4.3 Special Permission Bits

<div style="background: #fef2f2; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ef4444;">
<div style="color: #991b1b; font-weight: bold; margin-bottom: 12px;">Setuid, Setgid, and Sticky Bit</div>
<div style="color: #7f1d1d; font-size: 14px; line-height: 1.8;">

| Bit | On File | On Directory |
|-----|---------|--------------|
| **Setuid (4000)** | Execute as file owner (e.g., `/usr/bin/passwd`) | No effect |
| **Setgid (2000)** | Execute as file group | New files inherit directory's group |
| **Sticky (1000)** | No effect (historically: keep in swap) | Only owner can delete their files (e.g., `/tmp`) |

**Security implications**:
- Setuid root programs are high-value attack targets
- Sticky bit on `/tmp` prevents users from deleting each other's files
- Setgid directories enable team collaboration with shared group ownership

</div>
</div>

### 4.4 Interview Questions: Permissions

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: bold; margin-bottom: 16px;">Level 1: Fundamentals</div>
<div style="color: #14532d; font-size: 14px; line-height: 1.8;">

**Q4.1**: What permission is needed to delete a file?

**Expected Answer**:
You need **write permission on the parent directory**, not on the file itself. Deleting modifies the directory's entry list. The file's own permissions only protect its content.

This is why you can delete a read-only file if you have write permission on its directory.

</div>
</div>

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 16px;">Level 2: Execute Permission Nuances</div>
<div style="color: #1e3a8a; font-size: 14px; line-height: 1.8;">

**Q4.2**: A directory has permissions `rwx------` (700). User A is the owner. User B is not the owner but knows a file `/secret/known.txt` exists. Can User B read it?

**Expected Answer**:
No. User B cannot **traverse** the directory (no execute permission for others). Even with the full path, path resolution fails at `/secret` with PermissionError.

**Follow-up**: What if the directory is `r-x------` (500)?
User B still cannot access. Owner can read and traverse, but group/other have no permissions. The owner bits apply exclusively when uid matches.

**Follow-up 2**: What if `/secret/known.txt` has permissions `777`?
Still no access. Permission checks happen at **every component** of the path. The file's generous permissions are irrelevant if you can't reach it.

</div>
</div>

<div style="background: #fdf2f8; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ec4899;">
<div style="color: #9d174d; font-weight: bold; margin-bottom: 16px;">Level 3: ACLs and Capability-Based Security</div>
<div style="color: #831843; font-size: 14px; line-height: 1.8;">

**Q4.3**: What are the limitations of Unix permissions, and how do ACLs address them?

**Expected Answer**:
**Unix permission limitations**:
- Only 3 categories (owner, one group, others)
- Can't grant access to specific users who aren't owner
- Can't have multiple groups with different permissions

**ACLs (Access Control Lists)** extend this:
```
# setfacl -m u:alice:rw file.txt
user::rw-
user:alice:rw-     # Specific user entry
group::r--
group:devs:rw-     # Specific group entry
mask::rw-          # Maximum permissions for named users/groups
other::---
```

**Trade-offs**:
- ACLs are more expressive but complex
- Performance: ACL checks are slower than bit masking
- Portability: ACL formats vary across systems

**Capability-based alternative** (used in Android, Capsicum):
Instead of checking "who is asking?", grant **capabilities** (unforgeable tokens) that authorize specific operations. No ambient authority - processes only have explicitly delegated powers.

**See also**: [[access-control]](/topics/system-design/security/access-control)

</div>
</div>

---

## Section 5: Search Operations

### 5.1 File System Search Patterns

Search operations in file systems fall into two categories:
1. **Traversal-based**: Walk the tree and filter (find, ls -R)
2. **Index-based**: Precomputed indexes for fast lookup (locate, mdfind)

<div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 32px; margin: 24px 0;">
<h4 style="color: #1e293b; margin: 0 0 24px 0; text-align: center; font-size: 18px;">Search Strategy Comparison</h4>

<div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;">

<div style="background: #ffffff; border: 2px solid #8b5cf6; border-radius: 12px; padding: 24px; min-width: 280px; flex: 1; max-width: 380px;">
<div style="color: #6d28d9; font-weight: bold; font-size: 16px; margin-bottom: 16px; text-align: center;">Traversal (DFS/BFS)</div>
<div style="color: #334155; font-size: 13px; line-height: 1.8;">
<strong>Time:</strong> O(N) where N = total entries<br/>
<strong>Space:</strong> O(depth) for DFS, O(width) for BFS<br/>
<strong>Freshness:</strong> Always current<br/>
<strong>Use when:</strong> Need current state, one-time search<br/>
<strong>Example:</strong> <code>find /home -name "*.log"</code>
</div>
</div>

<div style="background: #ffffff; border: 2px solid #ec4899; border-radius: 12px; padding: 24px; min-width: 280px; flex: 1; max-width: 380px;">
<div style="color: #be185d; font-weight: bold; font-size: 16px; margin-bottom: 16px; text-align: center;">Index-based</div>
<div style="color: #334155; font-size: 13px; line-height: 1.8;">
<strong>Build time:</strong> O(N) initial, O(1) per update<br/>
<strong>Query time:</strong> O(log N) to O(1)<br/>
<strong>Freshness:</strong> May be stale<br/>
<strong>Use when:</strong> Repeated queries, accept staleness<br/>
<strong>Example:</strong> <code>locate myfile</code>
</div>
</div>

</div>
</div>

### 5.2 Implementing Recursive Search

```python
from typing import List, Callable, Generator, Optional
from dataclasses import dataclass
from enum import Enum
import fnmatch
import re

class SearchType(Enum):
    NAME = "name"           # Match file name
    NAME_REGEX = "regex"    # Regex on name
    CONTENT = "content"     # Search file contents
    SIZE = "size"           # Filter by size
    TYPE = "type"           # File or directory
    MODIFIED = "modified"   # Modification time

@dataclass
class SearchCriteria:
    search_type: SearchType
    pattern: str
    value: any = None  # For comparisons (size, time)

class FileSystemSearch:
    """
    Search implementation supporting multiple criteria and traversal strategies.
    """

    def find(
        self,
        root: 'Directory',
        criteria: List[SearchCriteria],
        max_depth: Optional[int] = None,
        follow_symlinks: bool = False
    ) -> Generator['FileSystemEntry', None, None]:
        """
        Find entries matching all criteria using DFS.

        Yields matching entries as they're found (memory efficient).
        """
        yield from self._dfs_search(root, criteria, 0, max_depth, follow_symlinks)

    def _dfs_search(
        self,
        current: 'FileSystemEntry',
        criteria: List[SearchCriteria],
        depth: int,
        max_depth: Optional[int],
        follow_symlinks: bool
    ) -> Generator['FileSystemEntry', None, None]:

        # Check depth limit
        if max_depth is not None and depth > max_depth:
            return

        # Handle symlinks
        if current.is_symlink():
            if follow_symlinks:
                try:
                    current = current.resolve_target()
                except (FileNotFoundError, OSError):
                    return  # Broken or looping symlink
            else:
                # Match against symlink itself, don't traverse
                if self._matches_all(current, criteria):
                    yield current
                return

        # Check if current entry matches
        if self._matches_all(current, criteria):
            yield current

        # Recurse into directories
        if current.is_directory():
            try:
                for child in current.list_children():
                    yield from self._dfs_search(
                        child, criteria, depth + 1, max_depth, follow_symlinks
                    )
            except PermissionError:
                pass  # Skip directories we can't read

    def _matches_all(
        self,
        entry: 'FileSystemEntry',
        criteria: List[SearchCriteria]
    ) -> bool:
        """Check if entry matches ALL criteria."""
        return all(self._matches(entry, c) for c in criteria)

    def _matches(self, entry: 'FileSystemEntry', criterion: SearchCriteria) -> bool:
        if criterion.search_type == SearchType.NAME:
            # Glob pattern matching
            return fnmatch.fnmatch(entry.name, criterion.pattern)

        elif criterion.search_type == SearchType.NAME_REGEX:
            return re.search(criterion.pattern, entry.name) is not None

        elif criterion.search_type == SearchType.TYPE:
            if criterion.pattern == 'f':
                return entry.is_file()
            elif criterion.pattern == 'd':
                return entry.is_directory()
            elif criterion.pattern == 'l':
                return entry.is_symlink()

        elif criterion.search_type == SearchType.SIZE:
            # pattern like "+100M" (larger than 100MB) or "-1K" (smaller than 1KB)
            return self._check_size(entry, criterion.pattern)

        elif criterion.search_type == SearchType.CONTENT:
            # Only search file contents
            if not entry.is_file():
                return False
            try:
                content = entry.read()
                return criterion.pattern in content
            except (PermissionError, IOError):
                return False

        return False

    def _check_size(self, entry: 'FileSystemEntry', pattern: str) -> bool:
        """Parse size pattern like +100M, -1K, 500."""
        size = entry.get_size()

        if pattern.startswith('+'):
            threshold = self._parse_size(pattern[1:])
            return size > threshold
        elif pattern.startswith('-'):
            threshold = self._parse_size(pattern[1:])
            return size < threshold
        else:
            threshold = self._parse_size(pattern)
            return size == threshold

    def _parse_size(self, s: str) -> int:
        """Parse size with optional suffix (K, M, G)."""
        multipliers = {'K': 1024, 'M': 1024**2, 'G': 1024**3}
        if s[-1] in multipliers:
            return int(s[:-1]) * multipliers[s[-1]]
        return int(s)
```

### 5.3 Glob Pattern Matching

<div style="background: #f0f9ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #0ea5e9;">
<div style="color: #0c4a6e; font-weight: bold; margin-bottom: 12px;">Glob vs. Regex: Know the Difference</div>
<div style="color: #164e63; font-size: 14px; line-height: 1.8;">

| Glob | Regex Equivalent | Meaning |
|------|------------------|---------|
| `*` | `.*` | Match any characters (except path separator) |
| `?` | `.` | Match single character |
| `[abc]` | `[abc]` | Match one of the characters |
| `[!abc]` | `[^abc]` | Match any except these characters |
| `**` | N/A | Match across path separators (recursive) |

**Implementation note**: Glob patterns are typically converted to regex or matched with specialized algorithms. The `**` pattern requires special handling for directory recursion.

```python
def glob_to_regex(pattern: str) -> str:
    """Convert glob pattern to regex."""
    regex = ''
    i = 0
    while i < len(pattern):
        c = pattern[i]
        if c == '*':
            if i + 1 < len(pattern) and pattern[i + 1] == '*':
                regex += '.*'  # ** matches everything including /
                i += 1
            else:
                regex += '[^/]*'  # * matches non-slash characters
        elif c == '?':
            regex += '[^/]'
        elif c == '[':
            # Find closing bracket
            j = i + 1
            if j < len(pattern) and pattern[j] == '!':
                regex += '[^'
                j += 1
            else:
                regex += '['
            while j < len(pattern) and pattern[j] != ']':
                regex += pattern[j]
                j += 1
            regex += ']'
            i = j
        elif c in '.^$+{}|()\\':
            regex += '\\' + c  # Escape regex special chars
        else:
            regex += c
        i += 1
    return f'^{regex}$'
```

</div>
</div>

### 5.4 Building Search Indexes

For frequently queried file systems, building indexes dramatically improves performance.

```python
from collections import defaultdict
from typing import Set, Dict

class FileSystemIndex:
    """
    Inverted index for fast file system searches.

    Maintains:
    - Name index: name -> set of paths
    - Extension index: ext -> set of paths
    - Size index: size_bucket -> set of paths
    """

    def __init__(self):
        self.name_index: Dict[str, Set[str]] = defaultdict(set)
        self.extension_index: Dict[str, Set[str]] = defaultdict(set)
        self.name_trigrams: Dict[str, Set[str]] = defaultdict(set)

    def build(self, root: 'Directory'):
        """Build index by traversing entire tree."""
        self._index_entry(root)
        for child in self._traverse(root):
            self._index_entry(child)

    def _index_entry(self, entry: 'FileSystemEntry'):
        path = entry.get_path()
        name = entry.name.lower()

        # Exact name
        self.name_index[name].add(path)

        # Extension
        if '.' in name:
            ext = name.rsplit('.', 1)[1]
            self.extension_index[ext].add(path)

        # Trigrams for fuzzy search
        padded = f"  {name}  "
        for i in range(len(padded) - 2):
            trigram = padded[i:i+3]
            self.name_trigrams[trigram].add(path)

    def search_by_name(self, name: str) -> Set[str]:
        """Exact name lookup."""
        return self.name_index.get(name.lower(), set())

    def search_by_extension(self, ext: str) -> Set[str]:
        """Find all files with given extension."""
        return self.extension_index.get(ext.lower(), set())

    def fuzzy_search(self, query: str, threshold: float = 0.6) -> List[str]:
        """
        Trigram-based fuzzy search.

        Returns paths where trigram overlap exceeds threshold.
        """
        query = query.lower()
        padded = f"  {query}  "
        query_trigrams = {padded[i:i+3] for i in range(len(padded) - 2)}

        # Find candidate paths
        candidates = defaultdict(int)
        for trigram in query_trigrams:
            for path in self.name_trigrams.get(trigram, []):
                candidates[path] += 1

        # Calculate similarity and filter
        results = []
        for path, matches in candidates.items():
            similarity = matches / len(query_trigrams)
            if similarity >= threshold:
                results.append((path, similarity))

        return [path for path, _ in sorted(results, key=lambda x: -x[1])]

    # Index maintenance
    def add_entry(self, entry: 'FileSystemEntry'):
        """Add new entry to index (incremental update)."""
        self._index_entry(entry)

    def remove_entry(self, path: str, name: str):
        """Remove entry from index."""
        self.name_index[name.lower()].discard(path)
        if '.' in name:
            ext = name.rsplit('.', 1)[1]
            self.extension_index[ext.lower()].discard(path)
        # Remove from trigram index...
```

### 5.5 Interview Questions: Search Operations

<div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: bold; margin-bottom: 16px;">Level 1: Fundamentals</div>
<div style="color: #14532d; font-size: 14px; line-height: 1.8;">

**Q5.1**: Why does `find` use DFS rather than BFS?

**Expected Answer**:
1. **Memory efficiency**: DFS uses O(depth) stack space; BFS uses O(branching_factor^depth) queue space. File systems can have millions of files.
2. **Streaming results**: DFS can yield results as found; BFS must explore entire level before deeper files
3. **Depth limits work naturally**: `-maxdepth` is trivial with DFS stack depth tracking
4. **Locality**: DFS tends to read directory blocks sequentially, which can be faster for disk-based systems

</div>
</div>

<div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #3b82f6;">
<div style="color: #1e40af; font-weight: bold; margin-bottom: 16px;">Level 2: Optimization</div>
<div style="color: #1e3a8a; font-size: 14px; line-height: 1.8;">

**Q5.2**: The `locate` command returns results in milliseconds for millions of files. How does it work?

**Expected Answer**:
`locate` uses a precomputed database (`/var/lib/mlocate/mlocate.db`) built by `updatedb`:

1. **Index structure**: Stores full paths with compression (incremental encoding since paths share prefixes)
2. **Updates**: `updatedb` runs periodically (usually daily via cron)
3. **Query**: Binary search or scan through compressed database
4. **Trade-off**: Results may be stale (deleted files still appear, new files missing)

**Follow-up**: How would you design an index that stays fresh?

Use **inotify** (Linux) or **FSEvents** (macOS) to watch for changes:
```python
import inotify.adapters

notifier = inotify.adapters.InotifyTree('/home')
for event in notifier.event_gen():
    if event:
        (_, type_names, path, filename) = event
        if 'IN_CREATE' in type_names:
            index.add_entry(path, filename)
        elif 'IN_DELETE' in type_names:
            index.remove_entry(path, filename)
```

Trade-off: Watch descriptors are limited; may need to re-scan subtrees periodically.

</div>
</div>

<div style="background: #fdf2f8; border-radius: 12px; padding: 20px; margin: 16px 0; border-left: 4px solid #ec4899;">
<div style="color: #9d174d; font-weight: bold; margin-bottom: 16px;">Level 3: Distributed Search</div>
<div style="color: #831843; font-size: 14px; line-height: 1.8;">

**Q5.3**: How would you implement search across a distributed file system with petabytes of data?

**Expected Answer**:

**Architecture**:
1. **Partitioned index**: Each node indexes its local files
2. **Metadata service**: Knows which nodes have which directory subtrees
3. **Query routing**: Broadcast to relevant nodes or use metadata to target

**Search flow**:
```
Client: find /data/logs -name "error*"

1. Query metadata service: "which nodes have /data/logs subtree?"
2. Metadata returns: [node1, node2, node5]
3. Fan-out query to those nodes in parallel
4. Each node searches local index/files
5. Merge results at coordinator
6. Stream to client
```

**Optimizations**:
- **Bloom filters**: Quick negative check before index lookup
- **Caching**: Hot paths cached at multiple levels
- **Locality**: Route queries to nodes closest to client

**At scale** (like Google's search over code):
- Precomputed trigram indexes
- Sharding by path hash or content
- Approximate results acceptable (return top matches fast)

**See also**: [[distributed-systems]](/topics/system-design/distributed-systems), [[indexing]](/topics/databases/indexing)

</div>
</div>

---

## Section 6: Complete Implementation

### 6.1 Production-Ready Code

```python
from __future__ import annotations
from abc import ABC, abstractmethod
from typing import Dict, List, Optional, Generator, Set
from dataclasses import dataclass, field
from datetime import datetime
from enum import IntFlag
from threading import RLock
import re

# ============== Permission System ==============

class Permission(IntFlag):
    NONE = 0
    EXECUTE = 1
    WRITE = 2
    READ = 4

    @classmethod
    def from_octal(cls, mode: int) -> 'PermissionSet':
        return PermissionSet(
            owner=(mode >> 6) & 0o7,
            group=(mode >> 3) & 0o7,
            other=mode & 0o7
        )

@dataclass
class PermissionSet:
    owner: int = 0o7  # rwx
    group: int = 0o5  # r-x
    other: int = 0o5  # r-x
    special: int = 0  # setuid/setgid/sticky

    def to_octal(self) -> int:
        return (self.special << 9) | (self.owner << 6) | (self.group << 3) | self.other

    def check(self, required: Permission, uid: int, gid: int,
              owner_uid: int, owner_gid: int) -> bool:
        # Root bypass
        if uid == 0:
            if required == Permission.EXECUTE:
                return bool((self.owner | self.group | self.other) & Permission.EXECUTE)
            return True

        # Determine applicable permissions
        if uid == owner_uid:
            applicable = self.owner
        elif gid == owner_gid:
            applicable = self.group
        else:
            applicable = self.other

        return (applicable & required) == required

    def __str__(self) -> str:
        def bits_to_str(bits: int, special_char: str = '') -> str:
            r = 'r' if bits & Permission.READ else '-'
            w = 'w' if bits & Permission.WRITE else '-'
            x = 'x' if bits & Permission.EXECUTE else '-'
            return f"{r}{w}{x}"

        return bits_to_str(self.owner) + bits_to_str(self.group) + bits_to_str(self.other)

# ============== File System Entries ==============

@dataclass
class Metadata:
    created_at: datetime = field(default_factory=datetime.now)
    modified_at: datetime = field(default_factory=datetime.now)
    accessed_at: datetime = field(default_factory=datetime.now)
    permissions: PermissionSet = field(default_factory=PermissionSet)
    owner_uid: int = 0
    owner_gid: int = 0

class FileSystemEntry(ABC):
    """
    Abstract base class for file system entries.
    Implements the Component in Composite Pattern.
    """

    def __init__(self, name: str, parent: Optional['Directory'] = None):
        self.name = name
        self.parent = parent
        self.metadata = Metadata()

    @abstractmethod
    def get_size(self) -> int:
        """Return size in bytes."""
        pass

    @abstractmethod
    def is_directory(self) -> bool:
        pass

    def is_file(self) -> bool:
        return not self.is_directory() and not self.is_symlink()

    def is_symlink(self) -> bool:
        return False

    def get_path(self) -> str:
        """Get absolute path to this entry."""
        if self.parent is None:
            return '/'
        parent_path = self.parent.get_path()
        if parent_path == '/':
            return f'/{self.name}'
        return f'{parent_path}/{self.name}'

    def can_read(self, uid: int, gid: int) -> bool:
        return self.metadata.permissions.check(
            Permission.READ, uid, gid,
            self.metadata.owner_uid, self.metadata.owner_gid
        )

    def can_write(self, uid: int, gid: int) -> bool:
        return self.metadata.permissions.check(
            Permission.WRITE, uid, gid,
            self.metadata.owner_uid, self.metadata.owner_gid
        )

    def can_execute(self, uid: int, gid: int) -> bool:
        return self.metadata.permissions.check(
            Permission.EXECUTE, uid, gid,
            self.metadata.owner_uid, self.metadata.owner_gid
        )

    def touch(self):
        """Update modification time."""
        self.metadata.modified_at = datetime.now()

class File(FileSystemEntry):
    """
    Leaf node representing a file with content.
    """

    def __init__(self, name: str, parent: Optional['Directory'] = None):
        super().__init__(name, parent)
        self._content: bytes = b''

    def get_size(self) -> int:
        return len(self._content)

    def is_directory(self) -> bool:
        return False

    def read(self) -> bytes:
        self.metadata.accessed_at = datetime.now()
        return self._content

    def read_text(self, encoding: str = 'utf-8') -> str:
        return self.read().decode(encoding)

    def write(self, content: bytes) -> None:
        self._content = content
        self.touch()

    def write_text(self, content: str, encoding: str = 'utf-8') -> None:
        self.write(content.encode(encoding))

    def append(self, content: bytes) -> None:
        self._content += content
        self.touch()

    def truncate(self, size: int = 0) -> None:
        self._content = self._content[:size]
        self.touch()

class Directory(FileSystemEntry):
    """
    Composite node containing other entries.
    """

    def __init__(self, name: str, parent: Optional['Directory'] = None):
        super().__init__(name, parent)
        self._children: Dict[str, FileSystemEntry] = {}

    def get_size(self) -> int:
        """Return total size of all descendants."""
        return sum(child.get_size() for child in self._children.values())

    def is_directory(self) -> bool:
        return True

    def add_child(self, entry: FileSystemEntry) -> None:
        if entry.name in self._children:
            raise FileExistsError(f"Entry already exists: {entry.name}")
        entry.parent = self
        self._children[entry.name] = entry
        self.touch()

    def remove_child(self, name: str) -> Optional[FileSystemEntry]:
        child = self._children.pop(name, None)
        if child:
            child.parent = None
            self.touch()
        return child

    def get_child(self, name: str) -> Optional[FileSystemEntry]:
        return self._children.get(name)

    def list_children(self) -> List[FileSystemEntry]:
        return list(self._children.values())

    def list_names(self, sorted: bool = True) -> List[str]:
        names = list(self._children.keys())
        return builtins_sorted(names) if sorted else names

    def __contains__(self, name: str) -> bool:
        return name in self._children

    def __iter__(self):
        return iter(self._children.values())

class SymbolicLink(FileSystemEntry):
    """
    Symbolic link pointing to another path.
    """

    def __init__(self, name: str, target: str, parent: Optional['Directory'] = None):
        super().__init__(name, parent)
        self.target = target

    def get_size(self) -> int:
        return len(self.target.encode('utf-8'))

    def is_directory(self) -> bool:
        return False

    def is_symlink(self) -> bool:
        return True

# ============== File System ==============

# Import built-in sorted before it gets shadowed
import builtins
builtins_sorted = builtins.sorted

class FileSystem:
    """
    Thread-safe in-memory file system.

    Supports:
    - Unix-like path operations (ls, mkdir, touch, rm)
    - Permission checking
    - Symbolic links
    - Search operations
    """

    MAX_SYMLINK_DEPTH = 40

    def __init__(self):
        self.root = Directory('')
        self.root.parent = None  # Root's parent is itself conceptually
        self._lock = RLock()
        self._current_uid = 0
        self._current_gid = 0

    def set_user(self, uid: int, gid: int):
        """Set current user context for permission checks."""
        self._current_uid = uid
        self._current_gid = gid

    # ===== Path Resolution =====

    def _parse_path(self, path: str) -> List[str]:
        """Split path into components, handling edge cases."""
        if not path:
            return []
        return [c for c in path.split('/') if c and c != '.']

    def resolve(
        self,
        path: str,
        follow_symlinks: bool = True,
        create_parents: bool = False
    ) -> FileSystemEntry:
        """
        Resolve path to entry.

        Raises:
            FileNotFoundError: Path doesn't exist
            NotADirectoryError: Non-directory in path
            PermissionError: No execute permission on directory
            OSError: Symlink loop
        """
        with self._lock:
            components = self._parse_path(path)

            if not components:
                return self.root

            current = self.root
            symlink_count = 0

            for i, component in enumerate(components):
                is_last = (i == len(components) - 1)

                # Handle parent reference
                if component == '..':
                    current = current.parent if current.parent else current
                    continue

                # Must be directory to traverse
                if not current.is_directory():
                    raise NotADirectoryError(f"Not a directory: {current.get_path()}")

                # Permission check
                if not current.can_execute(self._current_uid, self._current_gid):
                    raise PermissionError(f"Permission denied: {current.get_path()}")

                child = current.get_child(component)

                if child is None:
                    if create_parents and not is_last:
                        child = Directory(component)
                        current.add_child(child)
                    else:
                        raise FileNotFoundError(f"No such file or directory: {path}")

                # Handle symlinks
                if child.is_symlink() and (follow_symlinks or not is_last):
                    symlink_count += 1
                    if symlink_count > self.MAX_SYMLINK_DEPTH:
                        raise OSError(f"Too many levels of symbolic links: {path}")

                    target = child.target
                    if not target.startswith('/'):
                        target = current.get_path().rstrip('/') + '/' + target

                    if is_last:
                        child = self.resolve(target, follow_symlinks)
                    else:
                        remaining = '/'.join(components[i+1:])
                        return self.resolve(f"{target}/{remaining}", follow_symlinks)

                current = child

            return current

    # ===== Core Operations =====

    def ls(self, path: str = '/') -> List[str]:
        """List directory contents or return file name."""
        with self._lock:
            entry = self.resolve(path)

            if not entry.can_read(self._current_uid, self._current_gid):
                raise PermissionError(f"Permission denied: {path}")

            if entry.is_directory():
                return entry.list_names(sorted=True)
            return [entry.name]

    def mkdir(self, path: str, parents: bool = True) -> Directory:
        """Create directory, optionally with parents."""
        with self._lock:
            components = self._parse_path(path)
            if not components:
                raise ValueError("Cannot create root directory")

            current = self.root

            for i, component in enumerate(components):
                is_last = (i == len(components) - 1)

                if not current.is_directory():
                    raise NotADirectoryError(f"Not a directory: {current.get_path()}")

                child = current.get_child(component)

                if child is None:
                    if not current.can_write(self._current_uid, self._current_gid):
                        raise PermissionError(f"Permission denied: {current.get_path()}")

                    if parents or is_last:
                        child = Directory(component)
                        current.add_child(child)
                    else:
                        raise FileNotFoundError(f"Parent doesn't exist: {path}")
                elif child.is_file():
                    raise FileExistsError(f"File exists: {child.get_path()}")

                current = child

            return current

    def touch(self, path: str) -> File:
        """Create empty file or update modification time."""
        with self._lock:
            components = self._parse_path(path)
            if not components:
                raise ValueError("Cannot create file at root")

            parent_path = '/' + '/'.join(components[:-1])
            filename = components[-1]

            try:
                parent = self.resolve(parent_path)
            except FileNotFoundError:
                parent = self.mkdir(parent_path)

            if not parent.is_directory():
                raise NotADirectoryError(f"Not a directory: {parent_path}")

            existing = parent.get_child(filename)

            if existing is None:
                if not parent.can_write(self._current_uid, self._current_gid):
                    raise PermissionError(f"Permission denied: {parent_path}")
                new_file = File(filename)
                parent.add_child(new_file)
                return new_file
            elif existing.is_file():
                existing.touch()
                return existing
            else:
                raise IsADirectoryError(f"Is a directory: {path}")

    def write_file(self, path: str, content: str) -> File:
        """Create or overwrite file with content."""
        with self._lock:
            f = self.touch(path)
            if not f.can_write(self._current_uid, self._current_gid):
                raise PermissionError(f"Permission denied: {path}")
            f.write_text(content)
            return f

    def read_file(self, path: str) -> str:
        """Read file content as string."""
        with self._lock:
            entry = self.resolve(path)

            if entry.is_directory():
                raise IsADirectoryError(f"Is a directory: {path}")

            if not entry.can_read(self._current_uid, self._current_gid):
                raise PermissionError(f"Permission denied: {path}")

            return entry.read_text()

    def rm(self, path: str, recursive: bool = False) -> None:
        """Remove file or directory."""
        with self._lock:
            if path == '/':
                raise PermissionError("Cannot remove root directory")

            entry = self.resolve(path, follow_symlinks=False)
            parent = entry.parent

            if not parent.can_write(self._current_uid, self._current_gid):
                raise PermissionError(f"Permission denied: {parent.get_path()}")

            if entry.is_directory() and entry.list_children():
                if not recursive:
                    raise OSError(f"Directory not empty: {path}")

            parent.remove_child(entry.name)

    def mv(self, src: str, dst: str) -> None:
        """Move/rename file or directory."""
        with self._lock:
            src_entry = self.resolve(src, follow_symlinks=False)
            src_parent = src_entry.parent

            # Check source parent write permission
            if not src_parent.can_write(self._current_uid, self._current_gid):
                raise PermissionError(f"Permission denied: {src_parent.get_path()}")

            dst_components = self._parse_path(dst)
            dst_parent_path = '/' + '/'.join(dst_components[:-1])
            dst_name = dst_components[-1]

            try:
                dst_parent = self.resolve(dst_parent_path)
            except FileNotFoundError:
                raise FileNotFoundError(f"Destination parent doesn't exist: {dst}")

            # Check destination parent write permission
            if not dst_parent.can_write(self._current_uid, self._current_gid):
                raise PermissionError(f"Permission denied: {dst_parent.get_path()}")

            # Check if destination exists
            existing = dst_parent.get_child(dst_name)
            if existing:
                if existing.is_directory():
                    # Move into directory
                    dst_parent = existing
                    dst_name = src_entry.name
                else:
                    dst_parent.remove_child(dst_name)

            # Perform move
            src_parent.remove_child(src_entry.name)
            src_entry.name = dst_name
            dst_parent.add_child(src_entry)

    def symlink(self, target: str, link_path: str) -> SymbolicLink:
        """Create symbolic link."""
        with self._lock:
            components = self._parse_path(link_path)
            if not components:
                raise ValueError("Cannot create symlink at root")

            parent_path = '/' + '/'.join(components[:-1])
            link_name = components[-1]

            parent = self.resolve(parent_path)

            if not parent.can_write(self._current_uid, self._current_gid):
                raise PermissionError(f"Permission denied: {parent_path}")

            link = SymbolicLink(link_name, target)
            parent.add_child(link)
            return link

    # ===== Search Operations =====

    def find(
        self,
        path: str = '/',
        name_pattern: str = None,
        entry_type: str = None,
        max_depth: int = None
    ) -> Generator[FileSystemEntry, None, None]:
        """
        Find entries matching criteria.

        Args:
            path: Starting directory
            name_pattern: Glob pattern for name
            entry_type: 'f' for files, 'd' for directories, 'l' for symlinks
            max_depth: Maximum recursion depth
        """
        import fnmatch

        with self._lock:
            start = self.resolve(path)

            if not start.is_directory():
                if self._matches(start, name_pattern, entry_type):
                    yield start
                return

            yield from self._find_recursive(start, name_pattern, entry_type, 0, max_depth)

    def _find_recursive(
        self,
        current: Directory,
        name_pattern: str,
        entry_type: str,
        depth: int,
        max_depth: int
    ) -> Generator[FileSystemEntry, None, None]:

        if max_depth is not None and depth > max_depth:
            return

        for child in current.list_children():
            if self._matches(child, name_pattern, entry_type):
                yield child

            if child.is_directory():
                yield from self._find_recursive(
                    child, name_pattern, entry_type, depth + 1, max_depth
                )

    def _matches(self, entry: FileSystemEntry, name_pattern: str, entry_type: str) -> bool:
        import fnmatch

        if name_pattern and not fnmatch.fnmatch(entry.name, name_pattern):
            return False

        if entry_type:
            if entry_type == 'f' and not entry.is_file():
                return False
            if entry_type == 'd' and not entry.is_directory():
                return False
            if entry_type == 'l' and not entry.is_symlink():
                return False

        return True


# ============== Usage Example ==============

if __name__ == "__main__":
    fs = FileSystem()

    # Create directory structure
    fs.mkdir("/home/user/documents")
    fs.mkdir("/home/user/downloads")

    # Create files
    fs.write_file("/home/user/documents/notes.txt", "My notes\nLine 2")
    fs.write_file("/home/user/documents/report.md", "# Report\n\nContent here.")

    # Create symlink
    fs.symlink("/home/user/documents", "/home/user/docs")

    # List directory
    print("ls /home/user:", fs.ls("/home/user"))

    # Read file through symlink
    print("cat (via symlink):", fs.read_file("/home/user/docs/notes.txt"))

    # Search
    print("\nFind all .txt files:")
    for entry in fs.find("/", name_pattern="*.txt"):
        print(f"  {entry.get_path()}")

    # Permissions example
    fs.set_user(1000, 1000)  # Switch to non-root user
    try:
        fs.mkdir("/etc/secure")
    except PermissionError as e:
        print(f"\nPermission denied: {e}")
```

---

## Section 7: Common Mistakes and Anti-Patterns

<div style="background: #fef2f2; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #ef4444;">
<div style="color: #991b1b; font-weight: bold; font-size: 16px; margin-bottom: 16px;">Interview Red Flags</div>

| Mistake | Why It's Wrong | Better Approach |
|---------|----------------|-----------------|
| Using `is_file` boolean instead of polymorphism | Forces type checking everywhere | Use abstract `is_directory()` method |
| Pre-normalizing `..` in paths | Breaks with symlinks | Resolve `..` during traversal |
| Single lock for entire file system | Massive contention | Lock per directory or use readers-writer locks |
| Storing full path in each node | O(n^2) space for deep trees | Compute path dynamically via parent pointers |
| Not handling symlink loops | Infinite loop crashes | Track depth counter, fail at limit |
| Returning mutable internal collections | Caller can corrupt state | Return copies or immutable views |

</div>

---

## Section 8: Extension Points

<div style="background: #f0fdf4; border-radius: 12px; padding: 24px; margin: 20px 0; border-left: 4px solid #22c55e;">
<div style="color: #166534; font-weight: bold; font-size: 16px; margin-bottom: 16px;">Follow-up Features to Discuss</div>

| Feature | Key Considerations |
|---------|-------------------|
| **Snapshots/Versioning** | Copy-on-write semantics, version chains |
| **Quotas** | Track space per user/directory, fail writes at limit |
| **Watch/Notify** | Observer pattern for file change notifications |
| **Extended Attributes** | Key-value metadata beyond standard fields |
| **Compression** | Transparent compression, trade CPU for space |
| **Deduplication** | Content-addressable storage, refcounting |
| **FUSE Integration** | Expose as real filesystem via FUSE |

**See also**: [[copy-on-write]](/topics/system-design/storage/cow), [[distributed-file-systems]](/topics/system-design/storage/dfs)

</div>

---

## Complexity Summary

| Operation | Time Complexity | Space Complexity | Notes |
|-----------|-----------------|------------------|-------|
| resolve(path) | O(path_depth) | O(1) | Hash lookup per component |
| ls(path) | O(depth + n log n) | O(n) | Sorting children |
| mkdir(path) | O(depth) | O(depth) | New nodes on path |
| read_file | O(depth + content) | O(content) | Content copied |
| write_file | O(depth + content) | O(content) | Content stored |
| rm(path) | O(depth) | O(1) | Just unlink |
| rm -r (recursive) | O(subtree_size) | O(depth) | Visit all nodes |
| find | O(n) | O(depth) | Visit all matching |
| find (indexed) | O(matches) | O(index_size) | Precomputed index |

---

## Related Topics

- [[composite-pattern]](/topics/design-patterns/structural/composite) - Full pattern deep dive
- [[trie]](/topics/data-structures/trie) - Path prefix optimization
- [[tree-traversal]](/topics/algorithms/tree-traversal) - DFS/BFS algorithms
- [[unix-permissions]](/topics/operating-systems/permissions) - Complete permission model
- [[distributed-file-systems]](/topics/system-design/storage/dfs) - HDFS, GFS architecture
