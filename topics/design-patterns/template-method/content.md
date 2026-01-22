# Template Method Pattern

## Overview

The Template Method pattern defines the skeleton of an algorithm in a base class, letting subclasses override specific steps without changing the algorithm's overall structure. It's the foundation of the "Hollywood Principle" - "Don't call us, we'll call you."

**Difficulty:** Beginner to Intermediate
**Category:** Behavioral Pattern
**Also Known As:** Template Pattern

---

## The Recipe Analogy

Imagine a cooking class where the instructor teaches everyone to make sandwiches using a standard process:

1. Get bread
2. **Add protein** (varies: turkey, ham, tuna, veggie patty)
3. **Add toppings** (varies: lettuce, tomato, pickles, cheese)
4. **Add sauce** (varies: mayo, mustard, ranch, none)
5. Close sandwich
6. Serve on plate

The instructor defines the overall process (template), but each student customizes certain steps. Everyone follows the same sequence, but the specific ingredients differ.

<div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #e2e8f0;">
  <div style="color: #1e293b; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.75rem;">Sandwich Recipe Template Mapping</div>
  <div style="display: flex; flex-direction: column; gap: 0.75rem;">
    <div style="display: flex; gap: 1rem; align-items: center;">
      <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600; min-width: 160px;">Recipe Steps (1-6)</span>
      <span style="color: #64748b;">maps to</span>
      <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600;">Template Method</span>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600; min-width: 160px;">Get bread, Serve</span>
      <span style="color: #64748b;">maps to</span>
      <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600;">Concrete Steps</span>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600; min-width: 160px;">Add protein/toppings</span>
      <span style="color: #64748b;">maps to</span>
      <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600;">Abstract Steps</span>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <span style="background: #dbeafe; color: #1e40af; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600; min-width: 160px;">Add sauce (optional)</span>
      <span style="color: #64748b;">maps to</span>
      <span style="background: #dcfce7; color: #166534; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 600;">Hook Methods</span>
    </div>
  </div>
</div>

---

## Real-World Company Usage

### React - Component Lifecycle
React class components use Template Method for lifecycle. React defines the order (constructor, render, componentDidMount, etc.) and developers implement specific methods. The framework calls your methods at the right time.

### Django - Class-Based Views
Django's CBVs like `ListView` and `CreateView` define the HTTP handling skeleton. You override `get_queryset()`, `get_context_data()`, or `form_valid()` to customize behavior while Django handles routing, request parsing, and response rendering.

### JUnit/pytest - Test Lifecycle
Testing frameworks use Template Method: setUp(), test methods, tearDown(). The framework controls execution order and handles setup/teardown around your test code.

### Spark - MapReduce Jobs
Apache Spark defines the distributed processing template. You implement map and reduce functions; Spark handles partitioning, shuffling, and fault tolerance.

### Spring Boot - Request Handling
Spring's `OncePerRequestFilter` and other filter classes define processing templates. You override `doFilterInternal()` while Spring handles the rest of the filter chain.

---

## Pattern Structure

<div style="background: #f8fafc; border-radius: 12px; padding: 2rem; margin: 2rem 0; border: 1px solid #e2e8f0;">
  <div style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
    <div style="background: #dbeafe; border-radius: 10px; padding: 1.25rem 2rem; text-align: center; border: 2px solid #3b82f6;">
      <div style="font-weight: 700; font-size: 1.1rem; color: #1e40af; margin-bottom: 0.5rem;">AbstractClass</div>
      <div style="font-size: 0.85rem; color: #1e40af; border-top: 1px solid #93c5fd; padding-top: 0.5rem; text-align: left;">
        + templateMethod() <span style="opacity: 0.7; font-style: italic;">// final - defines skeleton</span><br>
        # primitiveOp1() <span style="opacity: 0.7; font-style: italic;">// abstract</span><br>
        # primitiveOp2() <span style="opacity: 0.7; font-style: italic;">// abstract</span><br>
        # hook() <span style="opacity: 0.7; font-style: italic;">// optional override</span>
      </div>
    </div>
    <div style="color: #3b82f6; font-size: 1.25rem;">^<br>extends</div>
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center;">
      <div style="background: #dcfce7; border-radius: 8px; padding: 0.75rem 1.25rem; text-align: center; border: 1px solid #22c55e;">
        <div style="font-weight: 600; color: #166534;">ConcreteClassA</div>
        <div style="font-size: 0.8rem; color: #166534; margin-top: 0.25rem;">primitiveOp1()<br>primitiveOp2()</div>
      </div>
      <div style="background: #fef3c7; border-radius: 8px; padding: 0.75rem 1.25rem; text-align: center; border: 1px solid #f59e0b;">
        <div style="font-weight: 600; color: #92400e;">ConcreteClassB</div>
        <div style="font-size: 0.8rem; color: #92400e; margin-top: 0.25rem;">primitiveOp1()<br>primitiveOp2()<br>hook()</div>
      </div>
    </div>
  </div>
</div>

---

## Types of Methods in Template Method

<div style="display: flex; gap: 1rem; margin: 1.5rem 0; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 200px; background: #dbeafe; border-radius: 10px; padding: 1rem; border: 1px solid #93c5fd;">
    <div style="font-weight: 700; color: #1e40af; margin-bottom: 0.5rem;">Template Method</div>
    <div style="font-size: 0.9rem; color: #1e40af;">
      The algorithm skeleton. Should be <strong>final/non-overridable</strong> to preserve the structure.
    </div>
  </div>
  <div style="flex: 1; min-width: 200px; background: #dcfce7; border-radius: 10px; padding: 1rem; border: 1px solid #86efac;">
    <div style="font-weight: 700; color: #166534; margin-bottom: 0.5rem;">Abstract Operations</div>
    <div style="font-size: 0.9rem; color: #166534;">
      Steps that <strong>must</strong> be implemented by subclasses. No default behavior.
    </div>
  </div>
  <div style="flex: 1; min-width: 200px; background: #fef3c7; border-radius: 10px; padding: 1rem; border: 1px solid #fcd34d;">
    <div style="font-weight: 700; color: #92400e; margin-bottom: 0.5rem;">Hook Methods</div>
    <div style="font-size: 0.9rem; color: #92400e;">
      <strong>Optional</strong> steps with default (often empty) implementation. Override if needed.
    </div>
  </div>
  <div style="flex: 1; min-width: 200px; background: #fce7f3; border-radius: 10px; padding: 1rem; border: 1px solid #f9a8d4;">
    <div style="font-weight: 700; color: #9d174d; margin-bottom: 0.5rem;">Concrete Operations</div>
    <div style="font-size: 0.9rem; color: #9d174d;">
      Steps with <strong>fixed</strong> implementation. Not meant to be overridden.
    </div>
  </div>
</div>

---

## When to Use Template Method

<div style="background: #dcfce7; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #86efac;">
  <div style="color: #166534; font-weight: 700; margin-bottom: 1rem;">Use Template Method When:</div>
  <ul style="color: #166534; margin: 0; padding-left: 1.5rem; line-height: 1.8;">
    <li><strong>Common algorithm structure</strong> - Multiple classes share the same steps in same order</li>
    <li><strong>Controlled extension points</strong> - You want to let subclasses customize specific steps only</li>
    <li><strong>Avoiding code duplication</strong> - Common parts centralized in base class</li>
    <li><strong>Framework design</strong> - Define how client code plugs into your framework</li>
    <li><strong>Hollywood Principle</strong> - Framework calls user code, not vice versa</li>
  </ul>
</div>

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #fecaca;">
  <div style="color: #991b1b; font-weight: 700; margin-bottom: 1rem;">Anti-Patterns to Avoid:</div>
  <ul style="color: #991b1b; margin: 0; padding-left: 1.5rem; line-height: 1.8;">
    <li><strong>Too many abstract methods</strong> - Forces subclasses to implement everything</li>
    <li><strong>Rigid inheritance</strong> - Composition (Strategy) is often more flexible</li>
    <li><strong>Deep inheritance hierarchies</strong> - Keep it shallow (1-2 levels)</li>
    <li><strong>Template method that's too complex</strong> - Should be clear and focused</li>
    <li><strong>Breaking Liskov Substitution</strong> - Subclasses must honor the contract</li>
  </ul>
</div>

---

## Template Method vs Strategy

<div style="display: flex; gap: 1.5rem; margin: 1.5rem 0; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 280px; background: #dbeafe; border-radius: 12px; padding: 1.25rem; border: 1px solid #93c5fd;">
    <div style="font-weight: 700; font-size: 1.1rem; color: #1e40af; margin-bottom: 1rem; text-align: center; border-bottom: 1px solid #93c5fd; padding-bottom: 0.75rem;">TEMPLATE METHOD</div>
    <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; line-height: 1.6; color: #1e40af;">
      <li>Uses <strong>inheritance</strong></li>
      <li>Algorithm structure is <strong>fixed</strong></li>
      <li>Subclasses customize <strong>steps</strong></li>
      <li>Compile-time binding</li>
      <li>Base class <strong>controls</strong> flow</li>
    </ul>
    <div style="background: #bfdbfe; border-radius: 8px; padding: 0.75rem; margin-top: 1rem; font-size: 0.85rem; color: #1e40af;">
      <strong>Use when:</strong> Algorithm skeleton is fixed, only specific steps vary
    </div>
  </div>
  <div style="flex: 1; min-width: 280px; background: #dcfce7; border-radius: 12px; padding: 1.25rem; border: 1px solid #86efac;">
    <div style="font-weight: 700; font-size: 1.1rem; color: #166534; margin-bottom: 1rem; text-align: center; border-bottom: 1px solid #86efac; padding-bottom: 0.75rem;">STRATEGY</div>
    <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.9rem; line-height: 1.6; color: #166534;">
      <li>Uses <strong>composition</strong></li>
      <li>Entire algorithm is <strong>swapped</strong></li>
      <li>Different objects provide algorithms</li>
      <li>Runtime binding</li>
      <li>Client <strong>selects</strong> algorithm</li>
    </ul>
    <div style="background: #bbf7d0; border-radius: 8px; padding: 0.75rem; margin-top: 1rem; font-size: 0.85rem; color: #166534;">
      <strong>Use when:</strong> Whole algorithms vary and need runtime swapping
    </div>
  </div>
</div>

---

## Python Implementation - Report Generator

```python
from abc import ABC, abstractmethod
from datetime import datetime
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
import json


@dataclass
class ReportData:
    """Data container for report generation."""
    title: str
    author: str
    data: List[Dict[str, Any]]
    metadata: Dict[str, Any] = None


class ReportGenerator(ABC):
    """
    Template Method pattern for generating reports.

    The generate() method defines the algorithm skeleton.
    Subclasses implement specific steps for different formats.
    """

    def generate(self, report_data: ReportData) -> str:
        """
        Template method - defines the report generation algorithm.
        This method should not be overridden.
        """
        # Step 1: Initialize (hook - optional customization)
        self._initialize(report_data)

        # Step 2: Build header (abstract - must implement)
        header = self._build_header(report_data)

        # Step 3: Pre-process data (hook)
        processed_data = self._preprocess_data(report_data.data)

        # Step 4: Build body (abstract - must implement)
        body = self._build_body(processed_data)

        # Step 5: Build footer (abstract - must implement)
        footer = self._build_footer(report_data)

        # Step 6: Assemble report (concrete - fixed implementation)
        report = self._assemble(header, body, footer)

        # Step 7: Post-process (hook)
        report = self._postprocess(report)

        # Step 8: Cleanup (hook)
        self._cleanup()

        return report

    # ==================== HOOKS (optional override) ====================

    def _initialize(self, report_data: ReportData) -> None:
        """Hook: Called before report generation. Override for setup."""
        pass

    def _preprocess_data(self, data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Hook: Transform data before building body. Override to filter/sort."""
        return data

    def _postprocess(self, report: str) -> str:
        """Hook: Final transformation of report. Override for compression, etc."""
        return report

    def _cleanup(self) -> None:
        """Hook: Called after report generation. Override for cleanup."""
        pass

    # ==================== ABSTRACT (must override) ====================

    @abstractmethod
    def _build_header(self, report_data: ReportData) -> str:
        """Build report header. Must be implemented."""
        pass

    @abstractmethod
    def _build_body(self, data: List[Dict[str, Any]]) -> str:
        """Build report body from data. Must be implemented."""
        pass

    @abstractmethod
    def _build_footer(self, report_data: ReportData) -> str:
        """Build report footer. Must be implemented."""
        pass

    # ==================== CONCRETE (fixed implementation) ====================

    def _assemble(self, header: str, body: str, footer: str) -> str:
        """Assemble report parts. Fixed implementation."""
        return f"{header}\n{body}\n{footer}"


class PlainTextReport(ReportGenerator):
    """Generates plain text reports."""

    def __init__(self, line_width: int = 60):
        self.line_width = line_width

    def _build_header(self, report_data: ReportData) -> str:
        separator = "=" * self.line_width
        title_line = report_data.title.center(self.line_width)
        author_line = f"Author: {report_data.author}".center(self.line_width)
        date_line = f"Generated: {datetime.now():%Y-%m-%d %H:%M}".center(self.line_width)

        return f"{separator}\n{title_line}\n{author_line}\n{date_line}\n{separator}"

    def _build_body(self, data: List[Dict[str, Any]]) -> str:
        lines = []
        for i, row in enumerate(data, 1):
            lines.append(f"\nRecord {i}:")
            for key, value in row.items():
                lines.append(f"  {key}: {value}")
        return "\n".join(lines)

    def _build_footer(self, report_data: ReportData) -> str:
        separator = "-" * self.line_width
        total = f"Total Records: {len(report_data.data)}"
        return f"{separator}\n{total}\n{'END OF REPORT'.center(self.line_width)}"


class HTMLReport(ReportGenerator):
    """Generates HTML reports with styling."""

    def __init__(self, css_class: str = "report"):
        self.css_class = css_class

    def _initialize(self, report_data: ReportData) -> None:
        """Hook: Log that we're generating HTML."""
        print(f"Generating HTML report: {report_data.title}")

    def _build_header(self, report_data: ReportData) -> str:
        return f"""<!DOCTYPE html>
<html>
<head>
    <title>{report_data.title}</title>
    <style>
        .{self.css_class} {{ font-family: Arial, sans-serif; margin: 20px; }}
        .{self.css_class} table {{ border-collapse: collapse; width: 100%; }}
        .{self.css_class} th, .{self.css_class} td {{ border: 1px solid #ddd; padding: 8px; text-align: left; }}
        .{self.css_class} th {{ background-color: #4CAF50; color: white; }}
        .{self.css_class} tr:nth-child(even) {{ background-color: #f2f2f2; }}
    </style>
</head>
<body>
<div class="{self.css_class}">
    <h1>{report_data.title}</h1>
    <p><strong>Author:</strong> {report_data.author}</p>
    <p><strong>Generated:</strong> {datetime.now():%Y-%m-%d %H:%M:%S}</p>
"""

    def _build_body(self, data: List[Dict[str, Any]]) -> str:
        if not data:
            return "<p>No data available</p>"

        # Build table from data
        headers = list(data[0].keys())
        header_row = "".join(f"<th>{h}</th>" for h in headers)

        rows = []
        for row in data:
            cells = "".join(f"<td>{row.get(h, '')}</td>" for h in headers)
            rows.append(f"<tr>{cells}</tr>")

        return f"""<table>
    <thead><tr>{header_row}</tr></thead>
    <tbody>{"".join(rows)}</tbody>
</table>"""

    def _build_footer(self, report_data: ReportData) -> str:
        return f"""    <p><em>Total Records: {len(report_data.data)}</em></p>
</div>
</body>
</html>"""

    def _assemble(self, header: str, body: str, footer: str) -> str:
        """Override to handle HTML structure properly."""
        return f"{header}\n{body}\n{footer}"


class MarkdownReport(ReportGenerator):
    """Generates Markdown reports."""

    def _build_header(self, report_data: ReportData) -> str:
        return f"""# {report_data.title}

**Author:** {report_data.author}
**Generated:** {datetime.now():%Y-%m-%d %H:%M}

---
"""

    def _preprocess_data(self, data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Hook: Sort data by first column for consistency."""
        if data and len(data) > 0:
            first_key = list(data[0].keys())[0]
            return sorted(data, key=lambda x: str(x.get(first_key, "")))
        return data

    def _build_body(self, data: List[Dict[str, Any]]) -> str:
        if not data:
            return "*No data available*"

        headers = list(data[0].keys())

        # Build markdown table
        header_row = "| " + " | ".join(headers) + " |"
        separator = "| " + " | ".join(["---"] * len(headers)) + " |"

        rows = []
        for row in data:
            values = [str(row.get(h, "")) for h in headers]
            rows.append("| " + " | ".join(values) + " |")

        return f"{header_row}\n{separator}\n" + "\n".join(rows)

    def _build_footer(self, report_data: ReportData) -> str:
        return f"""
---

*Total Records: {len(report_data.data)}*
"""


class JSONReport(ReportGenerator):
    """Generates JSON reports."""

    def __init__(self, pretty: bool = True):
        self.pretty = pretty
        self._report_dict = {}

    def _initialize(self, report_data: ReportData) -> None:
        self._report_dict = {
            "generated_at": datetime.now().isoformat(),
            "metadata": report_data.metadata or {}
        }

    def _build_header(self, report_data: ReportData) -> str:
        self._report_dict.update({
            "title": report_data.title,
            "author": report_data.author,
        })
        return ""  # JSON doesn't have separate header

    def _build_body(self, data: List[Dict[str, Any]]) -> str:
        self._report_dict["data"] = data
        self._report_dict["record_count"] = len(data)
        return ""  # JSON doesn't have separate body

    def _build_footer(self, report_data: ReportData) -> str:
        return ""  # JSON doesn't have separate footer

    def _assemble(self, header: str, body: str, footer: str) -> str:
        """Override: Return JSON string."""
        indent = 2 if self.pretty else None
        return json.dumps(self._report_dict, indent=indent, default=str)


# Usage demonstration
def main():
    # Sample data
    data = ReportData(
        title="Q4 Sales Report",
        author="Analytics Team",
        data=[
            {"product": "Widget A", "sales": 1500, "revenue": 45000},
            {"product": "Widget B", "sales": 2300, "revenue": 69000},
            {"product": "Widget C", "sales": 890, "revenue": 26700},
        ],
        metadata={"department": "Sales", "quarter": "Q4"}
    )

    # Generate in different formats
    generators = [
        ("Plain Text", PlainTextReport()),
        ("HTML", HTMLReport()),
        ("Markdown", MarkdownReport()),
        ("JSON", JSONReport()),
    ]

    for name, generator in generators:
        print(f"\n{'='*60}")
        print(f" {name} Report")
        print(f"{'='*60}\n")
        report = generator.generate(data)
        print(report)


if __name__ == "__main__":
    main()
```

---

## Python Implementation - ETL Pipeline

```python
from abc import ABC, abstractmethod
from typing import List, Dict, Any, Iterator
from datetime import datetime
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class ETLPipeline(ABC):
    """
    Template Method for ETL (Extract, Transform, Load) operations.

    Defines the standard ETL flow with hooks for customization.
    """

    def run(self, source: str, destination: str) -> Dict[str, Any]:
        """
        Template method - defines the ETL algorithm.
        """
        start_time = datetime.now()
        stats = {"source": source, "destination": destination}

        try:
            # Step 1: Validate configuration
            self._validate_config(source, destination)

            # Step 2: Connect to source
            self._connect_source(source)

            # Step 3: Connect to destination
            self._connect_destination(destination)

            # Step 4: Extract data
            logger.info(f"Extracting from {source}")
            raw_data = self._extract(source)
            stats["extracted_count"] = len(list(raw_data)) if hasattr(raw_data, '__iter__') else 0

            # Re-extract for actual processing (iterator consumed)
            raw_data = self._extract(source)

            # Step 5: Transform data
            logger.info("Transforming data")
            transformed_data = self._transform(raw_data)

            # Step 6: Validate transformed data (hook)
            if self._should_validate():
                self._validate_data(transformed_data)

            # Step 7: Load data
            logger.info(f"Loading to {destination}")
            loaded_count = self._load(destination, transformed_data)
            stats["loaded_count"] = loaded_count

            # Step 8: Verify load (hook)
            if self._should_verify():
                self._verify_load(destination, loaded_count)

            stats["status"] = "success"

        except Exception as e:
            logger.error(f"ETL failed: {e}")
            stats["status"] = "failed"
            stats["error"] = str(e)
            self._on_error(e)

        finally:
            # Step 9: Cleanup
            self._cleanup()
            stats["duration_seconds"] = (datetime.now() - start_time).total_seconds()

        return stats

    # ==================== ABSTRACT (must implement) ====================

    @abstractmethod
    def _extract(self, source: str) -> Iterator[Dict[str, Any]]:
        """Extract data from source. Must be implemented."""
        pass

    @abstractmethod
    def _transform(self, data: Iterator[Dict[str, Any]]) -> Iterator[Dict[str, Any]]:
        """Transform extracted data. Must be implemented."""
        pass

    @abstractmethod
    def _load(self, destination: str, data: Iterator[Dict[str, Any]]) -> int:
        """Load data to destination. Returns count. Must be implemented."""
        pass

    # ==================== HOOKS (optional override) ====================

    def _validate_config(self, source: str, destination: str) -> None:
        """Hook: Validate configuration before starting."""
        if not source or not destination:
            raise ValueError("Source and destination are required")

    def _connect_source(self, source: str) -> None:
        """Hook: Establish connection to source system."""
        logger.info(f"Connecting to source: {source}")

    def _connect_destination(self, destination: str) -> None:
        """Hook: Establish connection to destination system."""
        logger.info(f"Connecting to destination: {destination}")

    def _should_validate(self) -> bool:
        """Hook: Whether to validate transformed data."""
        return True

    def _validate_data(self, data: Iterator[Dict[str, Any]]) -> None:
        """Hook: Validate transformed data quality."""
        pass

    def _should_verify(self) -> bool:
        """Hook: Whether to verify load completion."""
        return True

    def _verify_load(self, destination: str, expected_count: int) -> None:
        """Hook: Verify data was loaded correctly."""
        logger.info(f"Verified {expected_count} records in {destination}")

    def _on_error(self, error: Exception) -> None:
        """Hook: Handle errors (alerting, rollback, etc.)."""
        pass

    def _cleanup(self) -> None:
        """Hook: Cleanup resources."""
        logger.info("Cleanup completed")


class CSVToJSONPipeline(ETLPipeline):
    """ETL pipeline from CSV files to JSON files."""

    def _extract(self, source: str) -> Iterator[Dict[str, Any]]:
        """Read CSV file and yield rows as dictionaries."""
        # Simulated CSV data
        csv_data = [
            {"id": "1", "name": "Alice", "email": "alice@example.com"},
            {"id": "2", "name": "Bob", "email": "bob@example.com"},
            {"id": "3", "name": "Charlie", "email": "charlie@example.com"},
        ]
        for row in csv_data:
            yield row

    def _transform(self, data: Iterator[Dict[str, Any]]) -> Iterator[Dict[str, Any]]:
        """Transform: normalize emails, add timestamps."""
        for row in data:
            yield {
                "id": int(row["id"]),
                "name": row["name"].strip().title(),
                "email": row["email"].lower().strip(),
                "processed_at": datetime.now().isoformat()
            }

    def _load(self, destination: str, data: Iterator[Dict[str, Any]]) -> int:
        """Write to JSON file."""
        records = list(data)
        # In real implementation: write to file
        logger.info(f"Would write {len(records)} records to {destination}")
        return len(records)


class DatabaseMigrationPipeline(ETLPipeline):
    """ETL pipeline for database-to-database migration."""

    def __init__(self, batch_size: int = 1000):
        self.batch_size = batch_size
        self._source_conn = None
        self._dest_conn = None

    def _connect_source(self, source: str) -> None:
        """Establish database connection to source."""
        logger.info(f"Establishing database connection to {source}")
        # In real implementation: create connection
        self._source_conn = {"host": source, "connected": True}

    def _connect_destination(self, destination: str) -> None:
        """Establish database connection to destination."""
        logger.info(f"Establishing database connection to {destination}")
        self._dest_conn = {"host": destination, "connected": True}

    def _extract(self, source: str) -> Iterator[Dict[str, Any]]:
        """Extract from source database."""
        # Simulated database records
        for i in range(100):
            yield {"id": i, "value": f"record_{i}", "source": source}

    def _transform(self, data: Iterator[Dict[str, Any]]) -> Iterator[Dict[str, Any]]:
        """Transform: add migration metadata."""
        for row in data:
            row["migrated_at"] = datetime.now().isoformat()
            row["migration_version"] = "2.0"
            yield row

    def _load(self, destination: str, data: Iterator[Dict[str, Any]]) -> int:
        """Load in batches to destination database."""
        total = 0
        batch = []

        for row in data:
            batch.append(row)
            if len(batch) >= self.batch_size:
                # In real implementation: batch insert
                logger.info(f"Inserting batch of {len(batch)} records")
                total += len(batch)
                batch = []

        if batch:
            total += len(batch)

        return total

    def _should_validate(self) -> bool:
        """Enable strict validation for database migration."""
        return True

    def _validate_data(self, data: Iterator[Dict[str, Any]]) -> None:
        """Validate required fields exist."""
        # Note: In real code, you'd validate without consuming the iterator
        logger.info("Validating data schema")

    def _on_error(self, error: Exception) -> None:
        """Rollback on error."""
        logger.error("Rolling back transaction due to error")
        # In real implementation: rollback

    def _cleanup(self) -> None:
        """Close database connections."""
        if self._source_conn:
            logger.info("Closing source connection")
        if self._dest_conn:
            logger.info("Closing destination connection")


# Usage
if __name__ == "__main__":
    # CSV to JSON pipeline
    csv_pipeline = CSVToJSONPipeline()
    result = csv_pipeline.run("data/users.csv", "output/users.json")
    print(f"CSV Pipeline result: {result}")

    print("\n" + "=" * 60 + "\n")

    # Database migration pipeline
    db_pipeline = DatabaseMigrationPipeline(batch_size=50)
    result = db_pipeline.run("postgres://source", "postgres://destination")
    print(f"DB Pipeline result: {result}")
```

---

## Interview Questions

### Basic Level

**Q: What is the Template Method pattern?**
A: Template Method defines an algorithm's skeleton in a base class, letting subclasses override specific steps without changing the overall structure. The base class controls the flow and calls subclass methods at appropriate points.

**Q: What's the difference between abstract methods and hooks?**
A: Abstract methods MUST be implemented by subclasses (mandatory customization). Hooks CAN be overridden but have default implementations (optional customization).

### Intermediate Level

**Q: How does Template Method implement the Hollywood Principle?**
A: "Don't call us, we'll call you." The framework (base class) calls subclass methods, not vice versa. Subclasses don't control flow - they just provide implementations that the template method calls.

**Q: When would you choose Template Method over Strategy?**
A: Template Method when: algorithm structure is fixed and only steps vary, you want to enforce a specific sequence, using inheritance is appropriate. Strategy when: entire algorithms differ and need runtime swapping, you prefer composition.

### Advanced Level

**Q: How do you prevent subclasses from breaking the template method?**
A: Make the template method `final` (Java) or use conventions (Python `_` prefix). Document invariants clearly. Use hooks sparingly. Consider adding validation in the template method to check subclass behavior.

**Q: How do you test classes using Template Method?**
A: Create test subclasses that implement abstract methods with known behavior. Test the template method with these test implementations. For hooks, test both default behavior and overridden behavior.

---

## Common Mistakes

<div style="background: #fef2f2; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0; border: 1px solid #fecaca;">
  <div style="color: #991b1b; font-weight: 700; margin-bottom: 1rem;">Common Implementation Mistakes</div>

  <div style="margin-bottom: 1rem;">
    <div style="font-weight: 600; color: #991b1b;">1. Too many abstract methods</div>
    <div style="color: #7f1d1d; font-size: 0.9rem;">Subclasses shouldn't implement 10+ methods. Use hooks with defaults instead.</div>
  </div>

  <div style="margin-bottom: 1rem;">
    <div style="font-weight: 600; color: #991b1b;">2. Template method is not final</div>
    <div style="color: #7f1d1d; font-size: 0.9rem;">If subclasses can override the template method, they can break the algorithm structure.</div>
  </div>

  <div style="margin-bottom: 1rem;">
    <div style="font-weight: 600; color: #991b1b;">3. Calling abstract methods in constructor</div>
    <div style="color: #7f1d1d; font-size: 0.9rem;">Subclass may not be initialized yet. Use lazy initialization or factory methods.</div>
  </div>

  <div>
    <div style="font-weight: 600; color: #991b1b;">4. Deep inheritance hierarchies</div>
    <div style="color: #7f1d1d; font-size: 0.9rem;">Keep to 2 levels max. Consider Strategy for additional flexibility.</div>
  </div>
</div>

---

## Best Practices

1. **Minimize abstract methods** - Fewer things to implement = easier to use
2. **Use hooks liberally** - Provide sensible defaults, let subclasses customize
3. **Make template method final** - Protect the algorithm structure
4. **Document extension points** - Clear what should/shouldn't be overridden
5. **Keep template method focused** - One algorithm per template
6. **Consider composition** - If inheritance feels wrong, use Strategy instead
7. **Validate subclass behavior** - Add guards in template if needed

---

## Related Patterns

- **[Strategy](/topic/design-patterns/strategy)** - Composition-based alternative
- **[Factory Method](/topic/design-patterns/factory-method)** - Often used within template methods
- **[Hook](/topic/design-patterns/observer)** - Similar concept of extension points
- **[Builder](/topic/design-patterns/builder)** - Can use template method for build steps
