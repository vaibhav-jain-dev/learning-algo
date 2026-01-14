#!/usr/bin/env python3
"""
DS/Algo Learning Platform - Backend Server
Serves the UI and executes Python/Go code safely
"""

import os
import json
import subprocess
import tempfile
import shutil
from pathlib import Path
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import markdown

app = Flask(__name__, static_folder='../frontend', static_url_path='')
CORS(app)

PROBLEMS_DIR = Path('/app/problems')
EXECUTION_TIMEOUT = 10  # seconds


def get_problem_tree():
    """Build a tree structure of all problems"""
    tree = {}

    if not PROBLEMS_DIR.exists():
        return tree

    for problem_dir in PROBLEMS_DIR.rglob('problem.md'):
        rel_path = problem_dir.parent.relative_to(PROBLEMS_DIR)
        parts = rel_path.parts

        current = tree
        for i, part in enumerate(parts[:-1]):
            if part not in current:
                current[part] = {'_children': {}, '_is_category': True}
            current = current[part]['_children']

        # Last part is the problem slug
        problem_slug = parts[-1]
        problem_path = str(rel_path)

        # Read problem.md to get title
        title = problem_slug.replace('-', ' ').title()
        try:
            with open(problem_dir, 'r') as f:
                first_line = f.readline().strip()
                if first_line.startswith('#'):
                    title = first_line.lstrip('#').strip()
        except:
            pass

        current[problem_slug] = {
            '_is_category': False,
            '_path': problem_path,
            '_title': title
        }

    return tree


def tree_to_list(tree, prefix=''):
    """Convert tree to flat list for frontend"""
    items = []

    for key, value in sorted(tree.items()):
        if key.startswith('_'):
            continue

        if value.get('_is_category'):
            items.append({
                'type': 'category',
                'name': key.replace('-', ' ').title(),
                'slug': key,
                'path': f"{prefix}/{key}" if prefix else key,
                'children': tree_to_list(value['_children'], f"{prefix}/{key}" if prefix else key)
            })
        else:
            items.append({
                'type': 'problem',
                'name': value.get('_title', key.replace('-', ' ').title()),
                'slug': key,
                'path': value['_path']
            })

    return items


@app.route('/')
def index():
    """Serve the main page"""
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/problems')
def list_problems():
    """List all problems in a tree structure"""
    tree = get_problem_tree()
    return jsonify(tree_to_list(tree))


@app.route('/api/problem/<path:problem_path>')
def get_problem(problem_path):
    """Get a specific problem's content"""
    problem_dir = PROBLEMS_DIR / problem_path

    if not problem_dir.exists():
        return jsonify({'error': 'Problem not found'}), 404

    result = {
        'path': problem_path,
        'content': '',
        'python_code': '',
        'golang_code': '',
        'has_python': False,
        'has_golang': False
    }

    # Read problem.md
    problem_md = problem_dir / 'problem.md'
    if problem_md.exists():
        with open(problem_md, 'r') as f:
            content = f.read()
            result['content'] = content
            result['content_html'] = markdown.markdown(
                content,
                extensions=['fenced_code', 'tables', 'toc']
            )

    # Read Python code
    python_file = problem_dir / 'python_code.py'
    if python_file.exists():
        with open(python_file, 'r') as f:
            result['python_code'] = f.read()
            result['has_python'] = True

    # Read Go code
    golang_file = problem_dir / 'golang_code.go'
    if golang_file.exists():
        with open(golang_file, 'r') as f:
            result['golang_code'] = f.read()
            result['has_golang'] = True

    return jsonify(result)


@app.route('/api/run', methods=['POST'])
def run_code():
    """Execute code and return output"""
    data = request.json
    code = data.get('code', '')
    language = data.get('language', 'python')

    if not code.strip():
        return jsonify({'error': 'No code provided'}), 400

    try:
        if language == 'python':
            result = run_python(code)
        elif language == 'golang':
            result = run_golang(code)
        else:
            return jsonify({'error': f'Unsupported language: {language}'}), 400

        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e), 'output': '', 'success': False})


def run_python(code):
    """Run Python code safely"""
    with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
        f.write(code)
        temp_file = f.name

    try:
        result = subprocess.run(
            ['python3', temp_file],
            capture_output=True,
            text=True,
            timeout=EXECUTION_TIMEOUT,
            cwd='/tmp'
        )

        output = result.stdout
        if result.stderr:
            output += '\n' + result.stderr if output else result.stderr

        return {
            'output': output,
            'success': result.returncode == 0,
            'return_code': result.returncode
        }
    except subprocess.TimeoutExpired:
        return {
            'output': f'Execution timed out after {EXECUTION_TIMEOUT} seconds',
            'success': False,
            'return_code': -1
        }
    finally:
        os.unlink(temp_file)


def run_golang(code):
    """Run Go code safely"""
    temp_dir = tempfile.mkdtemp()
    temp_file = os.path.join(temp_dir, 'main.go')

    try:
        with open(temp_file, 'w') as f:
            f.write(code)

        # Build the Go program
        build_result = subprocess.run(
            ['go', 'build', '-o', 'program', 'main.go'],
            capture_output=True,
            text=True,
            timeout=EXECUTION_TIMEOUT,
            cwd=temp_dir
        )

        if build_result.returncode != 0:
            return {
                'output': f'Build error:\n{build_result.stderr}',
                'success': False,
                'return_code': build_result.returncode
            }

        # Run the compiled program
        run_result = subprocess.run(
            ['./program'],
            capture_output=True,
            text=True,
            timeout=EXECUTION_TIMEOUT,
            cwd=temp_dir
        )

        output = run_result.stdout
        if run_result.stderr:
            output += '\n' + run_result.stderr if output else run_result.stderr

        return {
            'output': output,
            'success': run_result.returncode == 0,
            'return_code': run_result.returncode
        }
    except subprocess.TimeoutExpired:
        return {
            'output': f'Execution timed out after {EXECUTION_TIMEOUT} seconds',
            'success': False,
            'return_code': -1
        }
    finally:
        shutil.rmtree(temp_dir, ignore_errors=True)


@app.route('/<path:path>')
def serve_static(path):
    """Serve static files"""
    return send_from_directory(app.static_folder, path)


if __name__ == '__main__':
    print("Starting DS/Algo Learning Platform...")
    print(f"Problems directory: {PROBLEMS_DIR}")
    app.run(host='0.0.0.0', port=8080, debug=True)
