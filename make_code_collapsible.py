#!/usr/bin/env python3
"""
Transform code blocks in HTML files to be collapsible.
Makes code hidden by default and expandable via toggle button.
"""

import re
import sys
from pathlib import Path

# CSS for collapsible code blocks
COLLAPSIBLE_CSS = """<style>
.collapsible-code {
    margin: 16px 0;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    overflow: hidden;
}

.code-header {
    background-color: #f8fafc;
    padding: 12px 16px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e2e8f0;
    user-select: none;
    font-weight: 500;
    color: #334155;
}

.code-header:hover {
    background-color: #f1f5f9;
}

.code-toggle-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease;
    font-size: 14px;
    line-height: 20px;
}

.collapsible-code.collapsed .code-toggle-icon {
    transform: rotate(-90deg);
}

.code-content {
    max-height: 1000px;
    overflow: hidden;
    transition: max-height 0.3s ease, visibility 0.3s ease;
    visibility: visible;
}

.collapsible-code.collapsed .code-content {
    max-height: 0;
    visibility: hidden;
}

.code-content pre {
    margin: 0;
    border-radius: 0;
}

.code-content pre code {
    display: block;
    overflow-x: auto;
}
</style>
"""

# JavaScript for toggle functionality
COLLAPSIBLE_JS = """<script>
document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.code-header');
    headers.forEach(header => {
        header.addEventListener('click', function(e) {
            e.preventDefault();
            const container = this.closest('.collapsible-code');
            container.classList.toggle('collapsed');
        });
    });
});
</script>
"""

def extract_language(code_block):
    """Extract language from class attribute if present."""
    match = re.search(r'class="language-(\w+)"', code_block)
    if match:
        return match.group(1).capitalize()
    return "Code"

def wrap_code_block(match):
    """Wrap a code block in collapsible container."""
    pre_tag = match.group(0)
    language = extract_language(pre_tag)

    wrapped = f'''<div class="collapsible-code collapsed">
    <div class="code-header">
        <span>{language}</span>
        <span class="code-toggle-icon">▶</span>
    </div>
    <div class="code-content">
        {pre_tag}
    </div>
</div>'''

    return wrapped

def process_file(filepath):
    """Process a single HTML file to add collapsible code blocks."""
    print(f"Processing: {filepath}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if already processed
    if 'collapsible-code' in content:
        print(f"  ✓ Already processed, skipping")
        return False

    original_content = content

    # Find the position to insert CSS/JS - after the opening <style> tag if it exists
    style_insert_pos = content.find('</style>')
    if style_insert_pos != -1:
        style_insert_pos += len('</style>')
    else:
        # Insert before first h1/h2/div/p tag
        style_insert_pos = max(
            content.find('<h1'),
            content.find('<h2'),
            content.find('<div'),
            content.find('<p')
        )
        if style_insert_pos > 0:
            style_insert_pos = content.rfind('\n', 0, style_insert_pos) + 1

    # Replace code blocks with collapsible versions
    # Match <pre><code...>...</code></pre>
    pattern = r'<pre><code[^>]*>.*?</code></pre>'
    modified_content = re.sub(pattern, wrap_code_block, content, flags=re.DOTALL)

    # Insert CSS and JS if there are code blocks
    code_count = modified_content.count('class="collapsible-code')
    if code_count > 0:
        # Insert CSS after existing styles
        if '</style>' in modified_content:
            insert_pos = modified_content.find('</style>')
            # Insert styles before </style>
            css_to_insert = COLLAPSIBLE_CSS.replace('<style>', '').replace('</style>', '')
            modified_content = (modified_content[:insert_pos] +
                              css_to_insert +
                              modified_content[insert_pos:])
        else:
            # Insert CSS at the beginning
            modified_content = COLLAPSIBLE_CSS + '\n' + modified_content

        # Insert JS at the end before closing tags or at the end
        js_insert_pos = modified_content.rfind('</body>')
        if js_insert_pos == -1:
            js_insert_pos = len(modified_content)
        modified_content = (modified_content[:js_insert_pos] +
                          COLLAPSIBLE_JS +
                          modified_content[js_insert_pos:])

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(modified_content)

        print(f"  ✓ Updated with {code_count} collapsible code block(s)")
        return True
    else:
        print(f"  ✓ No code blocks found")
        return False

def main():
    """Process all content.html files in target directories."""
    base_path = Path('/home/user/learning-algo/topics')

    # Find all content.html files
    files_to_process = []

    for pattern in ['system-design/*/content.html', 'microservices/*/content.html', 'system-architectures/*/content.html']:
        files_to_process.extend(base_path.glob(pattern))

    # Also include the main microservices and system-architectures if they have content.html
    files_to_process.extend(base_path.glob('microservices/content.html'))

    files_to_process = sorted(set(files_to_process))

    print(f"Found {len(files_to_process)} HTML files to process\n")

    updated_count = 0
    for filepath in files_to_process:
        if process_file(str(filepath)):
            updated_count += 1

    print(f"\n✓ Completed! Updated {updated_count} files out of {len(files_to_process)}")

if __name__ == '__main__':
    main()
