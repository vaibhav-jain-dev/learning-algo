#!/usr/bin/env python3
"""
Fix HTML indentation in markdown files.

This script:
1. Reads markdown files
2. Tracks HTML nesting levels
3. Indents nested HTML elements with 2 spaces per level
4. Preserves markdown content outside HTML blocks
5. Keeps top-level HTML elements at column 0
"""

import re
import sys
from pathlib import Path
from typing import List


def fix_html_indentation(content: str) -> str:
    """Fix HTML indentation in markdown content."""
    lines = content.split('\n')
    result = []
    in_html_block = False
    nesting_level = 0

    # Pattern to match opening tags, closing tags, and self-closing tags
    opening_tag_pattern = re.compile(r'<([a-zA-Z][a-zA-Z0-9]*)[^>]*(?<!/)>')
    closing_tag_pattern = re.compile(r'</([a-zA-Z][a-zA-Z0-9]*)>')
    self_closing_pattern = re.compile(r'<[a-zA-Z][a-zA-Z0-9]*[^>]*/>')

    for line in lines:
        stripped = line.strip()

        # Empty lines pass through as-is
        if not stripped:
            result.append('')
            continue

        # Check if line contains HTML
        has_html_tag = bool(
            opening_tag_pattern.search(stripped) or
            closing_tag_pattern.search(stripped) or
            self_closing_pattern.search(stripped)
        )

        # If line starts with HTML tag, we're in an HTML block
        if has_html_tag and stripped[0] == '<':
            in_html_block = True

        if not in_html_block:
            # Not in HTML block, preserve original line
            result.append(line)
            continue

        # We're in an HTML block - process indentation
        # First, check if this line starts with a closing tag
        closing_match = closing_tag_pattern.match(stripped)
        if closing_match:
            # Closing tag: decrease indent before this line
            nesting_level = max(0, nesting_level - 1)

        # Apply current indentation
        indent = '  ' * nesting_level
        indented_line = indent + stripped
        result.append(indented_line)

        # Now count all tags on this line to update nesting level
        # Remove the line from consideration as we process tags
        remaining = stripped

        # Count opening tags (that aren't self-closing)
        opening_tags = opening_tag_pattern.findall(remaining)

        # Count closing tags
        closing_tags = closing_tag_pattern.findall(remaining)

        # Count self-closing tags (they don't affect nesting)
        # Already handled by the patterns above

        # Update nesting level
        # If we started with a closing tag, we already decreased
        # So now we add opening tags and subtract remaining closing tags
        if closing_match:
            # We already decremented for the first closing tag
            # Now handle the rest
            remaining_closing = len(closing_tags) - 1
            nesting_level += len(opening_tags) - remaining_closing
        else:
            # Normal case: add opening, subtract closing
            nesting_level += len(opening_tags) - len(closing_tags)

        # Ensure nesting level doesn't go negative
        nesting_level = max(0, nesting_level)

        # If nesting level is back to 0, we've closed all HTML
        if nesting_level == 0:
            in_html_block = False

    return '\n'.join(result)


def process_file(file_path: Path) -> bool:
    """Process a single markdown file. Returns True if file was modified."""
    try:
        # Read original content
        original_content = file_path.read_text(encoding='utf-8')

        # Fix indentation
        fixed_content = fix_html_indentation(original_content)

        # Check if content changed
        if original_content == fixed_content:
            return False

        # Write fixed content
        file_path.write_text(fixed_content, encoding='utf-8')
        return True

    except Exception as e:
        print(f"Error processing {file_path}: {e}", file=sys.stderr)
        return False


def main():
    """Main entry point."""
    if len(sys.argv) < 2:
        print("Usage: fix_html_indentation.py <file1> [file2] ...", file=sys.stderr)
        sys.exit(1)

    files_to_process = [Path(f) for f in sys.argv[1:]]

    modified_count = 0
    total_count = len(files_to_process)

    for file_path in files_to_process:
        if not file_path.exists():
            print(f"File not found: {file_path}", file=sys.stderr)
            continue

        if file_path.suffix != '.md':
            print(f"Skipping non-markdown file: {file_path}", file=sys.stderr)
            continue

        print(f"Processing: {file_path}")
        if process_file(file_path):
            modified_count += 1
            print(f"  ✓ Fixed")
        else:
            print(f"  - No changes needed")

    print(f"\nSummary: {modified_count}/{total_count} files modified")


if __name__ == '__main__':
    main()
