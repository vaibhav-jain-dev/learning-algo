#!/usr/bin/env python3
"""
Remove ALL indentation from HTML elements in markdown files.
This ensures Goldmark/CommonMark treats them as HTML blocks, not code.
"""

import os
import sys
import re

def process_file(filepath):
    """Remove indentation from all HTML lines in a markdown file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    modified = False
    result_lines = []
    in_html_block = False

    for line in lines:
        # Check if line contains HTML tags
        has_html = bool(re.search(r'</?(?:div|span|h[1-6]|p|ul|ol|li|strong|table|tr|td|th|pre|code|a)\b', line))

        # If line starts with HTML tag at any position
        if has_html:
            # Remove ALL leading whitespace from HTML lines
            stripped = line.lstrip()
            if stripped != line:
                modified = True
                line = stripped
            in_html_block = True
        elif in_html_block and line.strip() == '':
            # Blank line ends HTML block
            in_html_block = False

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
