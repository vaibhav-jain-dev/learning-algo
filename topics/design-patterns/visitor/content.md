# Visitor Pattern

## Overview

The Visitor pattern lets you separate algorithms from the objects on which they operate. It allows adding new operations to existing object structures without modifying those structures, achieving a form of double dispatch in languages that don't natively support it.

**Difficulty:** Intermediate to Advanced
**Category:** Behavioral Pattern
**Also Known As:** Double Dispatch

---

## The Tax Auditor Analogy

Imagine a tax auditor visiting different types of businesses:

- When visiting a **Restaurant**, they check food permits, health inspections, and tip reporting
- When visiting a **Retail Store**, they verify sales tax collection and inventory valuations
- When visiting a **Tech Startup**, they examine R&D tax credits and stock option accounting

The auditor (Visitor) has different procedures for each business type (Elements). The businesses don't need to know how to audit themselves - they just "accept" the auditor and let them do their specialized work.

Now imagine the IRS adds a new type of audit - an environmental compliance audit. They don't need to modify any business classes. They just create a new auditor (visitor) who knows how to check environmental compliance for each business type.

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;">
  <div style="color: #1e293b; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.75rem;">Tax Auditor Visitor Mapping</div>
  <div style="display: flex; flex-direction: column; gap: 0.75rem;">
    <div style="display: flex; gap: 1rem; align-items: center;">
      <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600; min-width: 160px;">Tax Auditor</span>
      <span style="color: #64748b;">maps to</span>
      <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600;">Visitor</span>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600; min-width: 160px;">Restaurant/Store/etc</span>
      <span style="color: #64748b;">maps to</span>
      <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600;">Concrete Elements</span>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600; min-width: 160px;">business.accept(auditor)</span>
      <span style="color: #64748b;">maps to</span>
      <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600;">Double Dispatch</span>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600; min-width: 160px;">Audit procedure per type</span>
      <span style="color: #64748b;">maps to</span>
      <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600;">visit_X() methods</span>
    </div>
  </div>
</div>

---

## Real-World Company Usage

### Compilers - AST Processing
Compilers like GCC, LLVM, and the TypeScript compiler use Visitor pattern extensively. The AST (Abstract Syntax Tree) elements rarely change, but operations like type checking, optimization, and code generation are separate visitors.

### Static Analysis Tools
SonarQube, ESLint, and Pylint implement code analyzers as visitors. Each rule is a visitor that traverses the code structure. Adding new rules doesn't modify the AST classes.

### Document Processing
PDF libraries, XML processors, and HTML parsers use visitors. Elements represent document structure; visitors handle rendering, validation, and transformation.

### Game Engines
Unity and Unreal use visitor-like patterns for game object operations. Physics calculations, rendering passes, and AI updates visit game objects without modifying entity classes.

### ORM Query Builders
ORMs like SQLAlchemy and Django ORM use visitors to traverse query expressions and generate SQL for different databases (PostgreSQL, MySQL, SQLite visitors).

---

## Pattern Structure

<div style="background: #f8fafc; border-radius: 12px; padding: 2rem; margin: 2rem 0; border: 1px solid #e2e8f0;">
  <div style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
    <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
      <div style="background: #dbeafe; border-radius: 10px; padding: 1.25rem; text-align: center; border: 2px solid #3b82f6; min-width: 180px;">
        <div style="font-weight: 700; font-size: 1rem; color: #1e40af; margin-bottom: 0.5rem;">Visitor (interface)</div>
        <div style="font-size: 0.8rem; color: #1e40af; border-top: 1px solid #93c5fd; padding-top: 0.5rem;">
          visit_element_a(a)<br>visit_element_b(b)
        </div>
      </div>
      <div style="background: #dcfce7; border-radius: 10px; padding: 1.25rem; text-align: center; border: 2px solid #22c55e; min-width: 180px;">
        <div style="font-weight: 700; font-size: 1rem; color: #166534; margin-bottom: 0.5rem;">Element (interface)</div>
        <div style="font-size: 0.8rem; color: #166534; border-top: 1px solid #86efac; padding-top: 0.5rem;">
          accept(visitor)
        </div>
      </div>
    </div>
    <div style="display: flex; gap: 1rem; color: #64748b; font-size: 0.9rem;">
      <span>^ implements</span>
      <span>^ implements</span>
    </div>
    <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
      <div style="display: flex; flex-direction: column; gap: 0.75rem; align-items: center;">
        <div style="background: #fef3c7; border-radius: 8px; padding: 0.75rem 1rem; text-align: center; border: 1px solid #f59e0b;">
          <div style="font-weight: 600; color: #92400e; font-size: 0.9rem;">ConcreteVisitor1</div>
        </div>
        <div style="background: #fce7f3; border-radius: 8px; padding: 0.75rem 1rem; text-align: center; border: 1px solid #ec4899;">
          <div style="font-weight: 600; color: #9d174d; font-size: 0.9rem;">ConcreteVisitor2</div>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.75rem; align-items: center;">
        <div style="background: #e0e7ff; border-radius: 8px; padding: 0.75rem 1rem; text-align: center; border: 1px solid #6366f1;">
          <div style="font-weight: 600; color: #3730a3; font-size: 0.9rem;">ElementA</div>
          <div style="font-size: 0.75rem; color: #3730a3;">accept(v) {v.visit_a(this)}</div>
        </div>
        <div style="background: #ccfbf1; border-radius: 8px; padding: 0.75rem 1rem; text-align: center; border: 1px solid #14b8a6;">
          <div style="font-weight: 600; color: #0f766e; font-size: 0.9rem;">ElementB</div>
          <div style="font-size: 0.75rem; color: #0f766e;">accept(v) {v.visit_b(this)}</div>
        </div>
      </div>
    </div>
  </div>
</div>

---

## Double Dispatch Explained

The Visitor pattern achieves double dispatch - selecting a method based on BOTH the visitor type AND the element type.

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;">
  <div style="color: #1e293b; font-weight: 700; margin-bottom: 1rem;">How Double Dispatch Works:</div>
  <div style="font-family: monospace; font-size: 0.9rem; background: #f1f5f9; padding: 1rem; border-radius: 8px; color: #334155;">
    <div>1. element.accept(visitor)  <span style="color: #64748b;">// First dispatch: element type</span></div>
    <div>2. visitor.visit_X(self)    <span style="color: #64748b;">// Second dispatch: visitor type</span></div>
  </div>
  <div style="margin-top: 1rem; font-size: 0.9rem; color: #475569;">
    The accept() method in each concrete element calls the appropriate visit method, passing itself. This two-step process selects the right behavior for both the element and visitor types.
  </div>
</div>

---

## When to Use Visitor Pattern

<div style="background: #dcfce7; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #86efac;">
  <div style="color: #166534; font-weight: 700; margin-bottom: 1rem;">Use Visitor Pattern When:</div>
  <ul style="color: #166534; margin: 0; padding-left: 1.5rem; line-height: 1.8;">
    <li><strong>Many distinct operations</strong> - Need multiple unrelated operations on object structure</li>
    <li><strong>Stable element classes</strong> - Object structure rarely changes, but operations frequently do</li>
    <li><strong>Collecting information</strong> - Visitor can accumulate state across many elements</li>
    <li><strong>Adding operations externally</strong> - Can't or don't want to modify element classes</li>
    <li><strong>Complex object structures</strong> - Trees, graphs, or composites with heterogeneous types</li>
  </ul>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #fecaca;">
  <div style="color: #991b1b; font-weight: 700; margin-bottom: 1rem;">Anti-Patterns to Avoid:</div>
  <ul style="color: #991b1b; margin: 0; padding-left: 1.5rem; line-height: 1.8;">
    <li><strong>Frequently changing elements</strong> - Adding element types requires updating ALL visitors</li>
    <li><strong>Breaking encapsulation</strong> - Visitors often need access to element internals</li>
    <li><strong>Simple hierarchies</strong> - Overkill for 2-3 element types with 1-2 operations</li>
    <li><strong>Cyclic dependencies</strong> - Visitor depends on all element types</li>
    <li><strong>Performance-critical paths</strong> - Double dispatch adds overhead</li>
  </ul>
</div>

---

## Python Implementation - File System Analyzer

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import List, Dict, Any
from datetime import datetime
from pathlib import Path


# ==================== ELEMENT INTERFACE ====================

class FileSystemElement(ABC):
    """Base class for file system elements."""

    @abstractmethod
    def accept(self, visitor: 'FileSystemVisitor') -> Any:
        """Accept a visitor."""
        pass

    @property
    @abstractmethod
    def name(self) -> str:
        pass

    @property
    @abstractmethod
    def size(self) -> int:
        pass


# ==================== CONCRETE ELEMENTS ====================

@dataclass
class File(FileSystemElement):
    """Represents a file."""
    _name: str
    _size: int
    extension: str
    created_at: datetime = field(default_factory=datetime.now)
    permissions: str = "rw-r--r--"

    @property
    def name(self) -> str:
        return self._name

    @property
    def size(self) -> int:
        return self._size

    def accept(self, visitor: 'FileSystemVisitor') -> Any:
        return visitor.visit_file(self)


@dataclass
class Directory(FileSystemElement):
    """Represents a directory containing files and subdirectories."""
    _name: str
    children: List[FileSystemElement] = field(default_factory=list)
    permissions: str = "rwxr-xr-x"

    @property
    def name(self) -> str:
        return self._name

    @property
    def size(self) -> int:
        """Total size of all contents."""
        return sum(child.size for child in self.children)

    def add(self, element: FileSystemElement) -> None:
        self.children.append(element)

    def accept(self, visitor: 'FileSystemVisitor') -> Any:
        return visitor.visit_directory(self)


@dataclass
class Symlink(FileSystemElement):
    """Represents a symbolic link."""
    _name: str
    target: str
    broken: bool = False

    @property
    def name(self) -> str:
        return self._name

    @property
    def size(self) -> int:
        return len(self.target)  # Size is the path length

    def accept(self, visitor: 'FileSystemVisitor') -> Any:
        return visitor.visit_symlink(self)


# ==================== VISITOR INTERFACE ====================

class FileSystemVisitor(ABC):
    """Visitor interface for file system operations."""

    @abstractmethod
    def visit_file(self, file: File) -> Any:
        pass

    @abstractmethod
    def visit_directory(self, directory: Directory) -> Any:
        pass

    @abstractmethod
    def visit_symlink(self, symlink: Symlink) -> Any:
        pass


# ==================== CONCRETE VISITORS ====================

class SizeCalculator(FileSystemVisitor):
    """Calculates total size of a file system tree."""

    def __init__(self):
        self.total_size = 0
        self.file_count = 0
        self.dir_count = 0

    def visit_file(self, file: File) -> int:
        self.total_size += file.size
        self.file_count += 1
        return file.size

    def visit_directory(self, directory: Directory) -> int:
        self.dir_count += 1
        dir_size = 0
        for child in directory.children:
            dir_size += child.accept(self)
        return dir_size

    def visit_symlink(self, symlink: Symlink) -> int:
        # Symlinks don't contribute to size
        return 0

    def get_summary(self) -> Dict[str, Any]:
        return {
            "total_size": self.total_size,
            "total_size_human": self._human_readable(self.total_size),
            "file_count": self.file_count,
            "directory_count": self.dir_count,
        }

    @staticmethod
    def _human_readable(size: int) -> str:
        for unit in ["B", "KB", "MB", "GB"]:
            if size < 1024:
                return f"{size:.1f} {unit}"
            size /= 1024
        return f"{size:.1f} TB"


class TypeCounter(FileSystemVisitor):
    """Counts files by extension."""

    def __init__(self):
        self.extension_counts: Dict[str, int] = {}
        self.extension_sizes: Dict[str, int] = {}

    def visit_file(self, file: File) -> None:
        ext = file.extension or "(no extension)"
        self.extension_counts[ext] = self.extension_counts.get(ext, 0) + 1
        self.extension_sizes[ext] = self.extension_sizes.get(ext, 0) + file.size

    def visit_directory(self, directory: Directory) -> None:
        for child in directory.children:
            child.accept(self)

    def visit_symlink(self, symlink: Symlink) -> None:
        pass  # Ignore symlinks

    def get_report(self) -> List[Dict[str, Any]]:
        result = []
        for ext, count in sorted(self.extension_counts.items(), key=lambda x: -x[1]):
            result.append({
                "extension": ext,
                "count": count,
                "total_size": self.extension_sizes[ext],
            })
        return result


class TreePrinter(FileSystemVisitor):
    """Prints a visual tree representation."""

    def __init__(self):
        self.output_lines: List[str] = []
        self._prefix = ""
        self._is_last = True

    def visit_file(self, file: File) -> str:
        icon = self._get_icon(file.extension)
        line = f"{self._prefix}{icon} {file.name} ({file.size:,} bytes)"
        self.output_lines.append(line)
        return line

    def visit_directory(self, directory: Directory) -> str:
        line = f"{self._prefix}[DIR] {directory.name}/"
        self.output_lines.append(line)

        # Save current prefix
        old_prefix = self._prefix

        for i, child in enumerate(directory.children):
            is_last = (i == len(directory.children) - 1)
            self._prefix = old_prefix + ("    " if is_last else "|   ")
            self._is_last = is_last
            child.accept(self)

        self._prefix = old_prefix
        return line

    def visit_symlink(self, symlink: Symlink) -> str:
        status = " (broken)" if symlink.broken else ""
        line = f"{self._prefix}@ {symlink.name} -> {symlink.target}{status}"
        self.output_lines.append(line)
        return line

    def get_tree(self) -> str:
        return "\n".join(self.output_lines)

    @staticmethod
    def _get_icon(extension: str) -> str:
        icons = {
            ".py": "[PY]",
            ".js": "[JS]",
            ".json": "[{}]",
            ".md": "[MD]",
            ".txt": "[TX]",
            ".jpg": "[IM]",
            ".png": "[IM]",
            ".pdf": "[PD]",
        }
        return icons.get(extension, "[--]")


class SecurityAuditor(FileSystemVisitor):
    """Audits file system for security issues."""

    def __init__(self):
        self.issues: List[Dict[str, Any]] = []

    def visit_file(self, file: File) -> None:
        # Check for overly permissive files
        if "w" in file.permissions[7:]:  # World-writable
            self.issues.append({
                "type": "world_writable",
                "severity": "HIGH",
                "element": file.name,
                "message": f"File '{file.name}' is world-writable"
            })

        # Check for sensitive file types
        sensitive_extensions = [".key", ".pem", ".env", ".secrets"]
        if file.extension in sensitive_extensions:
            self.issues.append({
                "type": "sensitive_file",
                "severity": "MEDIUM",
                "element": file.name,
                "message": f"Sensitive file found: '{file.name}'"
            })

    def visit_directory(self, directory: Directory) -> None:
        # Check directory permissions
        if "w" in directory.permissions[7:]:
            self.issues.append({
                "type": "world_writable_dir",
                "severity": "CRITICAL",
                "element": directory.name,
                "message": f"Directory '{directory.name}' is world-writable"
            })

        # Continue traversing
        for child in directory.children:
            child.accept(self)

    def visit_symlink(self, symlink: Symlink) -> None:
        if symlink.broken:
            self.issues.append({
                "type": "broken_symlink",
                "severity": "LOW",
                "element": symlink.name,
                "message": f"Broken symlink: '{symlink.name}' -> '{symlink.target}'"
            })

    def get_audit_report(self) -> Dict[str, Any]:
        critical = len([i for i in self.issues if i["severity"] == "CRITICAL"])
        high = len([i for i in self.issues if i["severity"] == "HIGH"])
        medium = len([i for i in self.issues if i["severity"] == "MEDIUM"])
        low = len([i for i in self.issues if i["severity"] == "LOW"])

        return {
            "total_issues": len(self.issues),
            "summary": {"critical": critical, "high": high, "medium": medium, "low": low},
            "issues": self.issues,
        }


class JSONExporter(FileSystemVisitor):
    """Exports file system structure to JSON."""

    def visit_file(self, file: File) -> Dict[str, Any]:
        return {
            "type": "file",
            "name": file.name,
            "size": file.size,
            "extension": file.extension,
            "permissions": file.permissions,
        }

    def visit_directory(self, directory: Directory) -> Dict[str, Any]:
        return {
            "type": "directory",
            "name": directory.name,
            "permissions": directory.permissions,
            "children": [child.accept(self) for child in directory.children],
        }

    def visit_symlink(self, symlink: Symlink) -> Dict[str, Any]:
        return {
            "type": "symlink",
            "name": symlink.name,
            "target": symlink.target,
            "broken": symlink.broken,
        }


# ==================== USAGE ====================

def create_sample_filesystem() -> Directory:
    """Create a sample file system structure."""
    root = Directory("project")

    # Source directory
    src = Directory("src")
    src.add(File("main.py", 1500, ".py"))
    src.add(File("utils.py", 800, ".py"))
    src.add(File("config.json", 200, ".json"))
    root.add(src)

    # Docs directory
    docs = Directory("docs")
    docs.add(File("README.md", 2000, ".md"))
    docs.add(File("API.md", 5000, ".md"))
    root.add(docs)

    # Add some issues for security auditor
    secrets = File(".env", 100, ".env")
    secrets.permissions = "rw-rw-rw-"  # World writable!
    root.add(secrets)

    root.add(Symlink("old_config", "/etc/old.conf", broken=True))

    return root


def main():
    # Create file system
    fs = create_sample_filesystem()

    print("=" * 60)
    print("FILE SYSTEM VISITOR PATTERN DEMO")
    print("=" * 60)

    # Visitor 1: Tree Printer
    print("\n--- Tree Structure ---")
    printer = TreePrinter()
    fs.accept(printer)
    print(printer.get_tree())

    # Visitor 2: Size Calculator
    print("\n--- Size Analysis ---")
    calculator = SizeCalculator()
    fs.accept(calculator)
    summary = calculator.get_summary()
    print(f"Total Size: {summary['total_size_human']}")
    print(f"Files: {summary['file_count']}, Directories: {summary['directory_count']}")

    # Visitor 3: Type Counter
    print("\n--- File Type Distribution ---")
    counter = TypeCounter()
    fs.accept(counter)
    for item in counter.get_report():
        print(f"  {item['extension']}: {item['count']} files, {item['total_size']} bytes")

    # Visitor 4: Security Audit
    print("\n--- Security Audit ---")
    auditor = SecurityAuditor()
    fs.accept(auditor)
    report = auditor.get_audit_report()
    print(f"Total Issues: {report['total_issues']}")
    print(f"Summary: {report['summary']}")
    for issue in report["issues"]:
        print(f"  [{issue['severity']}] {issue['message']}")

    # Visitor 5: JSON Export
    print("\n--- JSON Export ---")
    import json
    exporter = JSONExporter()
    json_data = fs.accept(exporter)
    print(json.dumps(json_data, indent=2))


if __name__ == "__main__":
    main()
```

---

## Python Implementation - Expression Evaluator (AST)

```python
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Any, Dict


# ==================== AST ELEMENTS ====================

class Expression(ABC):
    """Base class for expression AST nodes."""

    @abstractmethod
    def accept(self, visitor: 'ExpressionVisitor') -> Any:
        pass


@dataclass
class Number(Expression):
    value: float

    def accept(self, visitor: 'ExpressionVisitor') -> Any:
        return visitor.visit_number(self)


@dataclass
class Variable(Expression):
    name: str

    def accept(self, visitor: 'ExpressionVisitor') -> Any:
        return visitor.visit_variable(self)


@dataclass
class BinaryOp(Expression):
    operator: str
    left: Expression
    right: Expression

    def accept(self, visitor: 'ExpressionVisitor') -> Any:
        return visitor.visit_binary_op(self)


@dataclass
class UnaryOp(Expression):
    operator: str
    operand: Expression

    def accept(self, visitor: 'ExpressionVisitor') -> Any:
        return visitor.visit_unary_op(self)


@dataclass
class FunctionCall(Expression):
    name: str
    arguments: list

    def accept(self, visitor: 'ExpressionVisitor') -> Any:
        return visitor.visit_function_call(self)


# ==================== VISITOR INTERFACE ====================

class ExpressionVisitor(ABC):
    @abstractmethod
    def visit_number(self, expr: Number) -> Any:
        pass

    @abstractmethod
    def visit_variable(self, expr: Variable) -> Any:
        pass

    @abstractmethod
    def visit_binary_op(self, expr: BinaryOp) -> Any:
        pass

    @abstractmethod
    def visit_unary_op(self, expr: UnaryOp) -> Any:
        pass

    @abstractmethod
    def visit_function_call(self, expr: FunctionCall) -> Any:
        pass


# ==================== CONCRETE VISITORS ====================

class Evaluator(ExpressionVisitor):
    """Evaluates expressions to numeric results."""

    def __init__(self, variables: Dict[str, float] = None):
        self.variables = variables or {}
        self.functions = {
            "abs": abs,
            "min": min,
            "max": max,
            "sqrt": lambda x: x ** 0.5,
        }

    def visit_number(self, expr: Number) -> float:
        return expr.value

    def visit_variable(self, expr: Variable) -> float:
        if expr.name not in self.variables:
            raise NameError(f"Undefined variable: {expr.name}")
        return self.variables[expr.name]

    def visit_binary_op(self, expr: BinaryOp) -> float:
        left = expr.left.accept(self)
        right = expr.right.accept(self)

        ops = {
            "+": lambda a, b: a + b,
            "-": lambda a, b: a - b,
            "*": lambda a, b: a * b,
            "/": lambda a, b: a / b,
            "**": lambda a, b: a ** b,
            "%": lambda a, b: a % b,
        }

        if expr.operator not in ops:
            raise ValueError(f"Unknown operator: {expr.operator}")

        return ops[expr.operator](left, right)

    def visit_unary_op(self, expr: UnaryOp) -> float:
        operand = expr.operand.accept(self)

        if expr.operator == "-":
            return -operand
        elif expr.operator == "+":
            return operand
        else:
            raise ValueError(f"Unknown unary operator: {expr.operator}")

    def visit_function_call(self, expr: FunctionCall) -> float:
        if expr.name not in self.functions:
            raise NameError(f"Unknown function: {expr.name}")

        args = [arg.accept(self) for arg in expr.arguments]
        return self.functions[expr.name](*args)


class PrettyPrinter(ExpressionVisitor):
    """Converts expression to readable string."""

    def visit_number(self, expr: Number) -> str:
        return str(expr.value)

    def visit_variable(self, expr: Variable) -> str:
        return expr.name

    def visit_binary_op(self, expr: BinaryOp) -> str:
        left = expr.left.accept(self)
        right = expr.right.accept(self)
        return f"({left} {expr.operator} {right})"

    def visit_unary_op(self, expr: UnaryOp) -> str:
        operand = expr.operand.accept(self)
        return f"({expr.operator}{operand})"

    def visit_function_call(self, expr: FunctionCall) -> str:
        args = ", ".join(arg.accept(self) for arg in expr.arguments)
        return f"{expr.name}({args})"


class VariableFinder(ExpressionVisitor):
    """Finds all variables in an expression."""

    def __init__(self):
        self.variables = set()

    def visit_number(self, expr: Number) -> None:
        pass

    def visit_variable(self, expr: Variable) -> None:
        self.variables.add(expr.name)

    def visit_binary_op(self, expr: BinaryOp) -> None:
        expr.left.accept(self)
        expr.right.accept(self)

    def visit_unary_op(self, expr: UnaryOp) -> None:
        expr.operand.accept(self)

    def visit_function_call(self, expr: FunctionCall) -> None:
        for arg in expr.arguments:
            arg.accept(self)


# ==================== USAGE ====================

# Build AST for: sqrt(x**2 + y**2)
expr = FunctionCall("sqrt",
    [BinaryOp("+",
        BinaryOp("**", Variable("x"), Number(2)),
        BinaryOp("**", Variable("y"), Number(2))
    )]
)

# Pretty print
printer = PrettyPrinter()
print(f"Expression: {expr.accept(printer)}")

# Find variables
finder = VariableFinder()
expr.accept(finder)
print(f"Variables: {finder.variables}")

# Evaluate with x=3, y=4
evaluator = Evaluator({"x": 3, "y": 4})
result = expr.accept(evaluator)
print(f"Result: {result}")  # Should be 5.0
```

---

## Interview Questions

### Basic Level

**Q: What problem does the Visitor pattern solve?**
A: It allows adding new operations to object structures without modifying the element classes. It's especially useful when you have stable element types but frequently need new operations.

**Q: What is double dispatch?**
A: Selecting a method based on both the receiver type and argument type. In Visitor: `element.accept(visitor)` dispatches on element type, then `visitor.visit_X(this)` dispatches on visitor type.

### Intermediate Level

**Q: What are the tradeoffs of the Visitor pattern?**
A: Pros: Easy to add new operations, keeps related operations together. Cons: Hard to add new element types (must update all visitors), breaks encapsulation (visitors need element internals), adds complexity.

**Q: When would Visitor be a bad choice?**
A: When element types change frequently, when you only need one or two operations, when elements are simple, or when performance is critical (double dispatch overhead).

### Advanced Level

**Q: How do you handle the need to add new element types?**
A: Options: (1) Use a default visit method for unknown types, (2) Use reflection/type checking, (3) Consider if Visitor is the right pattern. The fundamental tension is: Visitor optimizes for adding operations at the cost of adding types.

**Q: How would you implement an acyclic visitor to break the dependency cycle?**
A: Instead of a single visitor interface with all visit methods, create separate interfaces for each element type. Visitors implement only the interfaces they need, and elements check if the visitor supports them.

---

## Common Mistakes

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #fecaca;">
  <div style="color: #991b1b; font-weight: 700; margin-bottom: 1rem;">Common Implementation Mistakes</div>

  <div style="margin-bottom: 1rem;">
    <div style="font-weight: 600; color: #991b1b;">1. Using Visitor when elements change often</div>
    <div style="color: #7f1d1d; font-size: 0.9rem;">Every new element type requires updating all visitors. Use polymorphism instead.</div>
  </div>

  <div style="margin-bottom: 1rem;">
    <div style="font-weight: 600; color: #991b1b;">2. Forgetting to traverse children</div>
    <div style="color: #7f1d1d; font-size: 0.9rem;">In composite structures, visitor must explicitly visit children in container elements.</div>
  </div>

  <div style="margin-bottom: 1rem;">
    <div style="font-weight: 600; color: #991b1b;">3. Visitor accumulating wrong state</div>
    <div style="color: #7f1d1d; font-size: 0.9rem;">State from previous visits can leak. Reset or create new visitor for each traversal.</div>
  </div>

  <div>
    <div style="font-weight: 600; color: #991b1b;">4. Breaking encapsulation excessively</div>
    <div style="color: #7f1d1d; font-size: 0.9rem;">Visitors shouldn't need to access private internals. Provide public accessors.</div>
  </div>
</div>

---

## Best Practices

1. **Stable element hierarchy** - Only use when element types rarely change
2. **One responsibility per visitor** - Each visitor handles one operation/concern
3. **Consider return types** - Visitors can return values through visit methods
4. **Handle traversal consistently** - Either visitor or elements control traversal, not both
5. **Provide default behavior** - Base visitor with no-op methods for optional handling
6. **Document visit order** - If order matters, document expected traversal
7. **Consider alternatives** - Pattern matching, method dispatch maps, or simple polymorphism

---

## Related Patterns

- **[Composite](/topic/design-patterns/composite)** - Often the structure being visited
- **[Iterator](/topic/design-patterns/iterator)** - Alternative for simple traversal
- **[Strategy](/topic/design-patterns/strategy)** - Alternative when only one operation varies
- **[Interpreter](/topic/design-patterns/interpreter)** - Uses Visitor for AST operations
