#!/usr/bin/env python3
"""
Remove excessive indentation from markdown files.
Keep HTML at column 0, but also fix markdown content that's indented.
"""

import os
import re

def process_file(filepath):
    """Remove excessive indentation from markdown file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    modified = False
    result_lines = []
    in_code_fence = False
    in_html_block = False

    for i, line in enumerate(lines):
        original_line = line

        # Track code fences
        if line.strip().startswith('```'):
            in_code_fence = not in_code_fence
            result_lines.append(line)
            continue

        # Don't modify code fence content
        if in_code_fence:
            result_lines.append(line)
            continue

        # Check if line has HTML tags
        has_html_tag = bool(re.search(r'</?(?:div|span|h[1-6]|p|ul|ol|li|strong|table|tr|td|th|pre|code|a|details|summary)\b', line))

        # Track HTML blocks
        if has_html_tag:
            if '<div' in line or '<details' in line:
                in_html_block = True
            if '</div>' in line or '</details>' in line:
                # Check if this closes the outermost block
                if line.strip() in ['</div>', '</details>']:
                    in_html_block = False

        # Skip blank lines
        if not line.strip():
            result_lines.append(line)
            continue

        # Remove leading whitespace from:
        # 1. HTML tags (always)
        # 2. Markdown headings
        # 3. Content with excessive indentation (> 4 spaces)

        stripped = line.lstrip()
        leading_spaces = len(line) - len(stripped)

        # HTML always at column 0
        if has_html_tag:
            if stripped != line:
                modified = True
                line = stripped
        # Markdown headings always at column 0
        elif stripped.startswith('#'):
            if leading_spaces > 0:
                modified = True
                line = stripped
        # Bold/italic markdown that's heavily indented
        elif stripped.startswith('**') or stripped.startswith('*'):
            if leading_spaces > 4:
                modified = True
                line = stripped
        # Regular content with excessive indentation (not in lists)
        elif leading_spaces > 4 and not re.match(r'^\s*[-*+]\s', line):
            # Remove excessive indentation but keep up to 2 spaces for lists
            if leading_spaces > 2:
                modified = True
                line = '  ' + stripped if leading_spaces >= 6 else stripped

        result_lines.append(line)

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(result_lines)
        return True
    return False

def main():
    topics_dir = './topics'
    count = 0

    for root, dirs, files in os.walk(topics_dir):
        for file in files:
            if file == 'content.md':
                filepath = os.path.join(root, file)
                if process_file(filepath):
                    count += 1
                    print(f"Fixed: {filepath}")

    print(f"\nTotal files modified: {count}")

if __name__ == '__main__':
    main()
