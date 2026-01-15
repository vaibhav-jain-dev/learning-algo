#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

log_error() {
    echo -e "${RED}ERROR:${NC} $1"
    ((ERRORS++))
}

log_warning() {
    echo -e "${YELLOW}WARNING:${NC} $1"
    ((WARNINGS++))
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

# Validate DS/Algo problem.md
validate_dsalgo_problem() {
    local file="$1"
    local dir=$(dirname "$file")
    local errors=0

    echo "Validating DS/Algo problem: $file"

    # Check required sections
    if ! grep -q "^# " "$file"; then
        log_error "$file: Missing H1 title"
        ((errors++))
    fi

    if ! grep -q "^## Description" "$file" && ! grep -q "^## Problem" "$file"; then
        log_error "$file: Missing Description section"
        ((errors++))
    fi

    if ! grep -q "^## Example" "$file" && ! grep -q "^### Example" "$file"; then
        log_error "$file: Missing Examples section"
        ((errors++))
    fi

    if ! grep -q "^## Constraint" "$file"; then
        log_error "$file: Missing Constraints section"
        ((errors++))
    fi

    if ! grep -q "^## Approach" "$file" && ! grep -q "^## Solution" "$file"; then
        log_warning "$file: Missing Approach section (recommended)"
    fi

    # Check for code files
    if [[ ! -f "$dir/python_code.py" ]]; then
        log_error "$dir: Missing python_code.py"
        ((errors++))
    fi

    if [[ ! -f "$dir/golang_code.go" ]]; then
        log_error "$dir: Missing golang_code.go"
        ((errors++))
    fi

    if [[ $errors -eq 0 ]]; then
        log_success "$file"
    fi

    return $errors
}

# Validate Python code file
validate_python_code() {
    local file="$1"
    local errors=0

    echo "Validating Python code: $file"

    # Check for main() function
    if ! grep -q "^def main():" "$file"; then
        log_error "$file: Missing main() function"
        ((errors++))
    fi

    # Check for return in main (basic check)
    if ! grep -A 50 "^def main():" "$file" | grep -q "return"; then
        log_warning "$file: main() should return a value"
    fi

    # Check syntax
    if ! python3 -m py_compile "$file" 2>/dev/null; then
        log_error "$file: Python syntax error"
        ((errors++))
    fi

    if [[ $errors -eq 0 ]]; then
        log_success "$file"
    fi

    return $errors
}

# Validate Go code file
validate_go_code() {
    local file="$1"
    local errors=0

    echo "Validating Go code: $file"

    # Check for package main
    if ! grep -q "^package main" "$file"; then
        log_error "$file: Missing 'package main'"
        ((errors++))
    fi

    # Check for main function
    if ! grep -q "^func main()" "$file"; then
        log_error "$file: Missing main() function"
        ((errors++))
    fi

    # Check syntax (if go is available)
    if command -v go &> /dev/null; then
        if ! go build -o /dev/null "$file" 2>/dev/null; then
            # Try with a temp directory for proper module context
            tmpdir=$(mktemp -d)
            cp "$file" "$tmpdir/main.go"
            cd "$tmpdir"
            go mod init temp 2>/dev/null || true
            if ! go build -o /dev/null main.go 2>/dev/null; then
                log_warning "$file: Go syntax check failed (may need dependencies)"
            fi
            cd - > /dev/null
            rm -rf "$tmpdir"
        fi
    fi

    if [[ $errors -eq 0 ]]; then
        log_success "$file"
    fi

    return $errors
}

# Validate Machine Coding problem
validate_machine_coding() {
    local file="$1"
    local dir=$(dirname "$file")
    local errors=0

    echo "Validating Machine Coding problem: $file"

    # Check required sections
    if ! grep -q "^# " "$file"; then
        log_error "$file: Missing H1 title"
        ((errors++))
    fi

    if ! grep -q "^## Problem Statement" "$file" && ! grep -q "^## Problem" "$file"; then
        log_error "$file: Missing Problem Statement section"
        ((errors++))
    fi

    if ! grep -q "^## Requirement" "$file"; then
        log_error "$file: Missing Requirements section"
        ((errors++))
    fi

    if ! grep -q "^## Interface" "$file" && ! grep -q "^## API" "$file"; then
        log_warning "$file: Missing Interface section (recommended)"
    fi

    if [[ $errors -eq 0 ]]; then
        log_success "$file"
    fi

    return $errors
}

# Validate System Design topic
validate_system_design() {
    local file="$1"
    local errors=0

    echo "Validating System Design topic: $file"

    # Check required sections
    if ! grep -q "^# " "$file"; then
        log_error "$file: Missing H1 title"
        ((errors++))
    fi

    if ! grep -q "^## TL;DR" "$file" && ! grep -q "^## Summary" "$file"; then
        log_warning "$file: Missing TL;DR section (recommended)"
    fi

    if [[ $errors -eq 0 ]]; then
        log_success "$file"
    fi

    return $errors
}

# Validate directory naming
validate_directory_names() {
    echo "Checking directory naming conventions..."

    find problems -type d | while read -r dir; do
        name=$(basename "$dir")
        if [[ "$name" =~ [A-Z] ]]; then
            log_warning "$dir: Directory name should be kebab-case (lowercase)"
        fi
        if [[ "$name" =~ " " ]]; then
            log_error "$dir: Directory name contains spaces"
        fi
    done
}

# Main validation logic
main() {
    echo "=========================================="
    echo "  Markdown Standards Validation"
    echo "=========================================="
    echo ""

    # If specific file provided, validate only that
    if [[ -n "$1" ]]; then
        if [[ -f "$1" ]]; then
            case "$1" in
                */problem.md)
                    if [[ "$1" == *machine-coding* ]]; then
                        validate_machine_coding "$1"
                    elif [[ "$1" == *system-design* ]]; then
                        validate_system_design "$1"
                    else
                        validate_dsalgo_problem "$1"
                    fi
                    ;;
                */topic.md)
                    validate_system_design "$1"
                    ;;
                *.py)
                    validate_python_code "$1"
                    ;;
                *.go)
                    validate_go_code "$1"
                    ;;
                *)
                    echo "Unknown file type: $1"
                    ;;
            esac
        else
            echo "File not found: $1"
            exit 1
        fi
    else
        # Validate all files
        validate_directory_names

        echo ""
        echo "Validating DS/Algo problems..."
        echo "-------------------------------------------"

        # Find all problem.md files (excluding machine-coding and system-design)
        find problems -name "problem.md" -not -path "*machine-coding*" -not -path "*system-design*" | sort | while read -r file; do
            validate_dsalgo_problem "$file" || true
        done

        echo ""
        echo "Validating Python code files..."
        echo "-------------------------------------------"

        find problems -name "python_code.py" | sort | while read -r file; do
            validate_python_code "$file" || true
        done

        echo ""
        echo "Validating Go code files..."
        echo "-------------------------------------------"

        find problems -name "golang_code.go" | sort | while read -r file; do
            validate_go_code "$file" || true
        done

        echo ""
        echo "Validating Machine Coding problems..."
        echo "-------------------------------------------"

        find problems -path "*machine-coding*" -name "problem.md" | sort | while read -r file; do
            validate_machine_coding "$file" || true
        done

        echo ""
        echo "Validating System Design topics..."
        echo "-------------------------------------------"

        find problems -path "*system-design*" -name "*.md" | sort | while read -r file; do
            validate_system_design "$file" || true
        done
    fi

    echo ""
    echo "=========================================="
    echo "  Validation Summary"
    echo "=========================================="
    echo "  Errors:   $ERRORS"
    echo "  Warnings: $WARNINGS"
    echo "=========================================="

    if [[ $ERRORS -gt 0 ]]; then
        echo -e "${RED}Validation failed with $ERRORS error(s)${NC}"
        exit 1
    else
        echo -e "${GREEN}Validation passed!${NC}"
        exit 0
    fi
}

main "$@"
