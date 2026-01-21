#!/usr/bin/env python3
"""
Migrate problem.md files to problem.js files.

This script converts all 200 must-solve problems from markdown format
to JavaScript format for the new visualization system.
"""

import os
import re
import json
from pathlib import Path

PROBLEMS_DIR = Path("/home/user/learning-algo/problems/200-must-solve")
OUTPUT_DIR = Path("/home/user/learning-algo/frontend/static/js/problems")

def extract_viz_config(content):
    """Extract viz-config JSON from markdown content."""
    match = re.search(r'<div id="viz-config"[^>]*>(.*?)</div>', content, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(1).strip())
        except json.JSONDecodeError:
            return None
    return None

def extract_difficulty(content):
    """Extract difficulty from markdown."""
    match = re.search(r'\*\*Difficulty:\*\*\s*(\w+)', content)
    if match:
        return match.group(1)
    return "Medium"

def extract_description(content):
    """Extract problem description from markdown."""
    # Look for Problem Statement section
    match = re.search(r'## Problem Statement\s+(.*?)(?=\n##|\n---|\Z)', content, re.DOTALL)
    if match:
        desc = match.group(1).strip()
        # Clean up markdown
        desc = re.sub(r'\n+', ' ', desc)
        desc = re.sub(r'`([^`]+)`', r'\1', desc)
        desc = desc[:500]  # Truncate if too long
        return desc
    return "No description available."

def extract_examples_with_explanations(content, viz_config):
    """Extract examples and add input-to-output explanations."""
    examples = []

    if viz_config and 'examples' in viz_config:
        for ex in viz_config['examples']:
            example = {
                'input': ex.get('input', {}),
                'output': ex.get('output', None),
            }

            # Generate explanation based on input -> output
            explanation = generate_explanation(
                ex.get('input', {}),
                ex.get('output', None),
                viz_config.get('name', 'Problem'),
                viz_config.get('algorithm', '')
            )
            example['explanation'] = explanation
            examples.append(example)

    # If no examples from viz_config, try to parse from markdown
    if not examples:
        example_matches = re.findall(
            r'\*\*Example \d+:\*\*\s*```\s*Input:\s*(.*?)\s*Output:\s*(.*?)\s*```',
            content,
            re.DOTALL
        )
        for inp, out in example_matches:
            examples.append({
                'input': {'raw': inp.strip()},
                'output': out.strip(),
                'explanation': f'Given the input, the algorithm processes it to produce {out.strip()}'
            })

    return examples if examples else [{'input': {}, 'output': None, 'explanation': 'See problem description'}]

def generate_explanation(input_data, output, problem_name, algorithm):
    """Generate input-to-output explanation based on problem type."""

    # Common algorithm patterns and their explanations
    explanations = {
        'two-pointer': 'Using two pointers, we traverse the data structure to find the solution efficiently.',
        'hash': 'Using a hash table, we store seen values for O(1) lookup to find the answer.',
        'sort': 'After sorting the input, we can apply an efficient algorithm to find the result.',
        'dfs': 'Using depth-first search, we explore all paths to find the solution.',
        'bfs': 'Using breadth-first search, we explore level by level to find the optimal solution.',
        'dp': 'Using dynamic programming, we build up the solution from smaller subproblems.',
        'greedy': 'Using a greedy approach, we make locally optimal choices at each step.',
        'binary': 'Using binary search, we efficiently narrow down the search space.',
        'recursion': 'Using recursion, we break down the problem into smaller subproblems.',
        'tree': 'Traversing the tree structure, we process nodes to compute the result.',
        'graph': 'Exploring the graph structure, we find the required path or value.',
    }

    # Determine algorithm type from the algorithm string
    algo_lower = algorithm.lower()
    explanation_base = 'Processing the input data produces the output.'

    for key, exp in explanations.items():
        if key in algo_lower:
            explanation_base = exp
            break

    # Format input description
    input_desc = ''
    if isinstance(input_data, dict):
        parts = []
        for k, v in input_data.items():
            if isinstance(v, list):
                if len(v) <= 5:
                    parts.append(f'{k}=[{", ".join(map(str, v))}]')
                else:
                    parts.append(f'{k}=[{v[0]}, {v[1]}, ..., {v[-1]}] (length {len(v)})')
            else:
                parts.append(f'{k}={v}')
        input_desc = ', '.join(parts)

    # Format output description
    output_desc = ''
    if isinstance(output, bool):
        output_desc = 'true' if output else 'false'
    elif isinstance(output, list):
        if len(output) <= 5:
            output_desc = str(output)
        else:
            output_desc = f'[{output[0]}, ..., {output[-1]}] (length {len(output)})'
    else:
        output_desc = str(output)

    return f'{explanation_base} For input {input_desc}, the result is {output_desc}.'

def extract_similar_problems(content, problem_path):
    """Extract similar problems from the similar/ subdirectory."""
    similar = []
    similar_dir = problem_path.parent / 'similar'

    if similar_dir.exists():
        for sim_problem in sorted(similar_dir.iterdir()):
            if sim_problem.is_dir():
                sim_md = sim_problem / 'problem.md'
                if sim_md.exists():
                    sim_content = sim_md.read_text()
                    sim_config = extract_viz_config(sim_content)
                    sim_name = sim_config.get('name', sim_problem.name) if sim_config else sim_problem.name
                    sim_difficulty = extract_difficulty(sim_content)

                    similar.append({
                        'id': sim_problem.name,
                        'name': sim_name.replace('-', ' ').title() if not sim_config else sim_name,
                        'difficulty': sim_difficulty
                    })

    return similar

def problem_id_to_name(problem_id):
    """Convert problem ID to display name."""
    # Remove leading number and convert dashes to spaces
    name = re.sub(r'^\d+-', '', problem_id)
    return name.replace('-', ' ').title()

def generate_js_content(category, problem_id, config):
    """Generate JavaScript file content for a problem."""

    # Escape quotes in strings
    def escape_str(s):
        if isinstance(s, str):
            return s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n')
        return s

    examples_js = []
    for ex in config['examples']:
        ex_parts = []

        # Format input
        input_json = json.dumps(ex['input'], indent=8)
        ex_parts.append(f'        input: {input_json}')

        # Format output
        output_json = json.dumps(ex['output'])
        ex_parts.append(f'        output: {output_json}')

        # Format explanation
        explanation = escape_str(ex.get('explanation', ''))
        ex_parts.append(f"        explanation: '{explanation}'")

        examples_js.append('    {\n' + ',\n'.join(ex_parts) + '\n    }')

    similar_js = []
    for sim in config.get('similar', []):
        similar_js.append(f"    {{ id: '{sim['id']}', name: '{escape_str(sim['name'])}', difficulty: '{sim['difficulty']}' }}")

    # Join arrays outside f-string to avoid backslash issues
    examples_joined = ',\n'.join(examples_js)
    similar_joined = ',\n'.join(similar_js)

    js_content = f'''/**
 * {config['name']}
 * Category: {category}
 * Difficulty: {config['difficulty']}
 * Algorithm: {config['algorithm']}
 */
(function() {{
    'use strict';

    const problem = {{
        name: '{escape_str(config['name'])}',
        difficulty: '{config['difficulty']}',
        algorithm: '{config['algorithm']}',
        description: '{escape_str(config['description'])}',
        complexity: {{
            time: '{config['complexity']['time']}',
            space: '{config['complexity']['space']}'
        }},
        examples: [
{examples_joined}
        ],
        similar: [
{similar_joined}
        ]
    }};

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {{
        window.ProblemRenderer.register('{category}', '{problem_id}', problem);
    }}

    // Export for direct access
    window.Problems = window.Problems || {{}};
    window.Problems['{category}/{problem_id}'] = problem;

}})();
'''
    return js_content

def migrate_problem(md_path, category):
    """Migrate a single problem.md to problem.js."""
    content = md_path.read_text()
    problem_id = md_path.parent.name

    # Extract data
    viz_config = extract_viz_config(content)

    if not viz_config:
        print(f"  WARNING: No viz-config found in {md_path}")
        viz_config = {
            'name': problem_id_to_name(problem_id),
            'algorithm': 'general',
            'complexity': {'time': 'O(n)', 'space': 'O(1)'},
            'examples': []
        }

    config = {
        'name': viz_config.get('name', problem_id_to_name(problem_id)),
        'difficulty': extract_difficulty(content),
        'algorithm': viz_config.get('algorithm', 'general'),
        'description': extract_description(content),
        'complexity': viz_config.get('complexity', {'time': 'O(n)', 'space': 'O(1)'}),
        'examples': extract_examples_with_explanations(content, viz_config),
        'similar': extract_similar_problems(content, md_path)
    }

    # Generate JS content
    js_content = generate_js_content(category, problem_id, config)

    # Write to output directory
    output_dir = OUTPUT_DIR / category
    output_dir.mkdir(parents=True, exist_ok=True)

    output_file = output_dir / f'{problem_id}.js'
    output_file.write_text(js_content)

    return problem_id, config['name'], len(config.get('similar', []))

def create_category_loader(category, problems):
    """Create a loader JS file for a category."""
    problems_list = '\n'.join(f"        '{p}'," for p in problems)
    category_title = category.replace('-', ' ').title()
    problem_count = len(problems)

    loader_content = f'''/**
 * {category_title} Problems Loader
 * Auto-generated - loads all problems in this category
 */
(function() {{
    'use strict';

    const PROBLEMS = [
{problems_list}
    ];

    // Category info
    window.CategoryInfo = window.CategoryInfo || {{}};
    window.CategoryInfo['{category}'] = {{
        name: '{category_title}',
        count: {problem_count},
        problems: PROBLEMS
    }};

    console.log('[{category}] Loaded {problem_count} problems');

}})();
'''

    output_file = OUTPUT_DIR / category / '_loader.js'
    output_file.write_text(loader_content)

def main():
    """Main migration function."""
    print("=" * 60)
    print("MIGRATING 200 MUST-SOLVE PROBLEMS FROM MD TO JS")
    print("=" * 60)

    # Track statistics
    stats = {
        'total_main': 0,
        'total_similar': 0,
        'categories': {},
        'files_created': []
    }

    # Process each category
    categories = [d for d in sorted(PROBLEMS_DIR.iterdir()) if d.is_dir()]

    for category_dir in categories:
        category = category_dir.name
        print(f"\n[{category.upper()}]")
        stats['categories'][category] = {'main': 0, 'similar': 0}

        category_problems = []

        # Find all main problems (direct children with problem.md)
        for problem_dir in sorted(category_dir.iterdir()):
            if problem_dir.is_dir():
                md_path = problem_dir / 'problem.md'
                if md_path.exists():
                    problem_id, name, similar_count = migrate_problem(md_path, category)
                    print(f"  + {problem_id}: {name} ({similar_count} similar)")

                    category_problems.append(problem_id)
                    stats['total_main'] += 1
                    stats['categories'][category]['main'] += 1
                    stats['files_created'].append(f'{category}/{problem_id}.js')

                    # Process similar problems
                    similar_dir = problem_dir / 'similar'
                    if similar_dir.exists():
                        for sim_dir in sorted(similar_dir.iterdir()):
                            if sim_dir.is_dir():
                                sim_md = sim_dir / 'problem.md'
                                if sim_md.exists():
                                    sim_id, sim_name, _ = migrate_problem(sim_md, category)
                                    print(f"    - {sim_id}: {sim_name}")

                                    category_problems.append(sim_id)
                                    stats['total_similar'] += 1
                                    stats['categories'][category]['similar'] += 1
                                    stats['files_created'].append(f'{category}/{sim_id}.js')

        # Create category loader
        create_category_loader(category, category_problems)
        print(f"  Created _loader.js for {len(category_problems)} problems")

    # Create main loader that loads all categories
    create_main_loader(stats['categories'])

    # Print summary
    print("\n" + "=" * 60)
    print("MIGRATION SUMMARY")
    print("=" * 60)
    print(f"\nTotal Main Problems:   {stats['total_main']}")
    print(f"Total Similar Problems: {stats['total_similar']}")
    print(f"Total JS Files Created: {len(stats['files_created'])}")
    print(f"\nBy Category:")
    for cat, counts in stats['categories'].items():
        print(f"  {cat}: {counts['main']} main + {counts['similar']} similar = {counts['main'] + counts['similar']} total")

    # Save summary to file
    summary_file = OUTPUT_DIR / 'migration_summary.json'
    summary_file.write_text(json.dumps(stats, indent=2))
    print(f"\nSummary saved to: {summary_file}")

    return stats

def create_main_loader(categories):
    """Create the main loader that loads all category loaders."""
    loader_content = '''/**
 * 200 Must-Solve Problems - Main Loader
 * Auto-generated - loads all problem categories
 */
(function() {
    'use strict';

    const CATEGORIES = [
'''
    for cat in categories:
        loader_content += f"        '{cat}',\n"

    loader_content += '''    ];

    // Export category list
    window.AllCategories = CATEGORIES;

    console.log('[Problems] Main loader ready with ' + CATEGORIES.length + ' categories');

})();
'''

    output_file = OUTPUT_DIR / '_main-loader.js'
    output_file.write_text(loader_content)

if __name__ == '__main__':
    main()
