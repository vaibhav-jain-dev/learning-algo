/**
 * EditorLinter - Real-time syntax checking for Python and Go in Monaco Editor.
 *
 * Provides client-side heuristic linting (bracket matching, missing colons,
 * indentation errors, common typos, string errors, and more) and surfaces
 * diagnostics through Monaco's marker API so squiggly underlines appear in
 * the gutter just like a real IDE.
 *
 * Usage:
 *   EditorLinter.startLinting(editor, 'python');
 *   EditorLinter.stopLinting();
 */
(function () {
    'use strict';

    // ---------------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------------

    var OWNER = 'editorLinter';
    var DEBOUNCE_MS = 500;

    var _timer = null;
    var _disposable = null; // Monaco onDidChangeModelContent disposable
    var _currentLanguage = null;

    /** Severity shortcuts -- resolved lazily because monaco may not be loaded yet. */
    function sev(level) {
        var m = window.monaco;
        if (!m) return 8; // fallback Error
        var map = {
            Error:   m.MarkerSeverity.Error,
            Warning: m.MarkerSeverity.Warning,
            Info:    m.MarkerSeverity.Info,
            Hint:    m.MarkerSeverity.Hint
        };
        return map[level] || m.MarkerSeverity.Error;
    }

    /** Build a single marker object. */
    function marker(startLine, startCol, endLine, endCol, message, severity) {
        return {
            startLineNumber: startLine,
            endLineNumber: endLine,
            startColumn: startCol,
            endColumn: endCol,
            message: message,
            severity: sev(severity)
        };
    }

    /** Convenience: marker spanning an entire line. */
    function lineMarker(lineNum, lineText, message, severity) {
        return marker(
            lineNum, 1,
            lineNum, (lineText || '').length + 1,
            message, severity
        );
    }

    /** Convenience: marker highlighting a specific word on a line. */
    function wordMarker(lineNum, lineText, word, message, severity) {
        var col = lineText.indexOf(word);
        if (col === -1) return lineMarker(lineNum, lineText, message, severity);
        return marker(
            lineNum, col + 1,
            lineNum, col + 1 + word.length,
            message, severity
        );
    }

    /**
     * Strip string literals and comments from a single line so that tokens
     * inside strings/comments are not mis-flagged.  Returns the "cleaned" line
     * with those regions replaced by spaces of equal length (preserving column
     * positions).
     */
    function blankStringsAndComments(line, commentChar) {
        var result = line.split('');
        var i = 0;
        var len = line.length;
        while (i < len) {
            // Single-line comment
            if (line[i] === commentChar && (commentChar !== '/' || line[i + 1] === '/')) {
                var commentStart = i;
                if (commentChar === '/') i++; // skip second /
                while (i < len) { result[i] = ' '; i++; }
                if (commentChar === '/') result[commentStart] = ' ';
                break;
            }
            // Python # comment
            if (commentChar === '#' && line[i] === '#') {
                while (i < len) { result[i] = ' '; i++; }
                break;
            }
            // String literals
            if (line[i] === '"' || line[i] === '\'' || line[i] === '`') {
                var quote = line[i];
                // Check for triple-quote (Python)
                if (commentChar === '#' && line[i + 1] === quote && line[i + 2] === quote) {
                    // triple-quote: blank to end of line (we handle single-line only)
                    result[i] = ' '; result[i + 1] = ' '; result[i + 2] = ' ';
                    i += 3;
                    while (i < len) {
                        if (line[i] === quote && line[i + 1] === quote && line[i + 2] === quote) {
                            result[i] = ' '; result[i + 1] = ' '; result[i + 2] = ' ';
                            i += 3;
                            break;
                        }
                        result[i] = ' ';
                        i++;
                    }
                    continue;
                }
                // Regular string
                result[i] = ' ';
                i++;
                while (i < len && line[i] !== quote) {
                    if (line[i] === '\\') { result[i] = ' '; i++; } // skip escaped char
                    if (i < len) { result[i] = ' '; i++; }
                }
                if (i < len) { result[i] = ' '; i++; } // closing quote
                continue;
            }
            i++;
        }
        return result.join('');
    }

    // ---------------------------------------------------------------------------
    // Python Validation
    // ---------------------------------------------------------------------------

    var PY_COMPOUND_KW = /^(if|elif|else|for|while|def|class|try|except|finally|with)\b/;

    /** Common Python typos: wrong -> right */
    var PY_TYPOS = {
        'pritn':   'print',
        'pirnt':   'print',
        'prnt':    'print',
        'prnit':   'print',
        'ptint':   'print',
        'retrun':  'return',
        'retunr':  'return',
        'reutrn':  'return',
        'reutn':   'return',
        'retrn':   'return',
        'ture':    'True',
        'Ture':    'True',
        'treu':    'True',
        'flase':   'False',
        'Flase':   'False',
        'fasle':   'False',
        'fales':   'False',
        'Noen':    'None',
        'NOen':    'None',
        'Nonn':    'None',
        'none':    'None',    // lowercase none is a common mistake
        'improt':  'import',
        'ipmort':  'import',
        'imoprt':  'import',
        'impor':   'import',
        'imprt':   'import',
        'form':    'from',    // tricky: 'form' is also a valid English word
        'frome':   'from',
        'forM':    'from',
        'whlie':   'while',
        'whiel':   'while',
        'whlile':  'while',
        'breka':   'break',
        'braek':   'break',
        'brek':    'break',
        'contiue': 'continue',
        'contniue':'continue',
        'contineu':'continue',
        'rnage':   'range',
        'rnge':    'range',
        'ragn':    'range',
        'lenght':  'length (use len())',
        'lenth':   'length (use len())',
        'appned':  'append',
        'apend':   'append',
        'appedn':  'append',
        'apped':   'append'
    };

    /**
     * Check if a line looks like it is in a context where 'form' is actually
     * the misspelling of 'from' (e.g. "form os import path").
     */
    function isFormTypo(line) {
        return /^\s*form\s+\S+\s+import\b/.test(line);
    }

    function validatePython(code, monaco, editor) {
        if (!code || !monaco || !editor) return [];
        var markers = [];
        var lines = code.split('\n');

        // ----- State for multi-line tracking -----
        var bracketStack = []; // [{char, line, col}]
        var prevIndent = 0;
        var prevLineBlank = true;
        var inTripleQuote = false;
        var tripleQuoteChar = null;
        var inClass = false;

        var OPEN = { '(': ')', '[': ']', '{': '}' };
        var CLOSE = { ')': '(', ']': '[', '}': '{' };
        var BRACKET_NAME = { '(': 'parenthesis', ')': 'parenthesis', '[': 'bracket', ']': 'bracket', '{': 'brace', '}': 'brace' };

        for (var i = 0; i < lines.length; i++) {
            var raw = lines[i];
            var lineNum = i + 1;

            // --- Triple-quote tracking (skip lines inside multi-line strings) ---
            if (inTripleQuote) {
                var closeIdx = raw.indexOf(tripleQuoteChar === '\'' ? '\'\'\'' : '"""');
                if (closeIdx !== -1) {
                    inTripleQuote = false;
                    tripleQuoteChar = null;
                }
                continue;
            }

            // Check for triple-quote start
            var tripleDouble = raw.indexOf('"""');
            var tripleSingle = raw.indexOf("'''");
            if (tripleDouble !== -1 || tripleSingle !== -1) {
                var tq = (tripleDouble !== -1 && (tripleSingle === -1 || tripleDouble <= tripleSingle)) ? '"' : "'";
                var tqStr = tq === '"' ? '"""' : "'''";
                var firstOccurrence = raw.indexOf(tqStr);
                var secondOccurrence = raw.indexOf(tqStr, firstOccurrence + 3);
                if (secondOccurrence === -1) {
                    // Opens a multi-line string; skip bracket/keyword checks on this line
                    inTripleQuote = true;
                    tripleQuoteChar = tq;
                    continue;
                }
                // Both open and close on same line -- fall through to normal checks
            }

            // Blank / whitespace-only lines
            var trimmed = raw.trim();
            if (trimmed === '' || trimmed.charAt(0) === '#') {
                prevLineBlank = true;
                continue;
            }

            // Clean line (strings & comments blanked)
            var cleaned = blankStringsAndComments(raw, '#');
            var cleanedTrimmed = cleaned.trim();

            // ---- Bracket matching ----
            for (var j = 0; j < cleaned.length; j++) {
                var ch = cleaned[j];
                if (OPEN[ch]) {
                    bracketStack.push({ char: ch, line: lineNum, col: j + 1 });
                } else if (CLOSE[ch]) {
                    if (bracketStack.length === 0) {
                        markers.push(marker(lineNum, j + 1, lineNum, j + 2,
                            'Unmatched closing ' + BRACKET_NAME[ch] + " '" + ch + "'", 'Error'));
                    } else {
                        var top = bracketStack[bracketStack.length - 1];
                        if (top.char !== CLOSE[ch]) {
                            markers.push(marker(lineNum, j + 1, lineNum, j + 2,
                                "Mismatched bracket: expected '" + OPEN[top.char] +
                                "' (opened at line " + top.line + ") but found '" + ch + "'", 'Error'));
                            bracketStack.pop();
                        } else {
                            bracketStack.pop();
                        }
                    }
                }
            }

            // ---- Missing colon on compound statements ----
            // Only check if we are NOT inside an open bracket context (multi-line expr)
            if (bracketStack.length === 0) {
                var kwMatch = cleanedTrimmed.match(PY_COMPOUND_KW);
                if (kwMatch) {
                    // The line should end with ':' (after stripping comments/strings from end)
                    var endChar = cleanedTrimmed.charAt(cleanedTrimmed.length - 1);
                    // Allow lines ending with \ (continuation)
                    if (endChar !== ':' && endChar !== '\\' && endChar !== ',') {
                        // Special: 'else' and 'try' and 'finally' must simply end with ':'
                        // For 'if/elif/for/while/with/except/def/class' the colon follows expression
                        // Be tolerant of decorator lines starting with @
                        if (kwMatch[1] === 'else' || kwMatch[1] === 'try' || kwMatch[1] === 'finally') {
                            // These keywords should be exactly "keyword:" with optional space
                            if (!/^\s*(else|try|finally)\s*:\s*$/.test(cleaned)) {
                                markers.push(lineMarker(lineNum, raw,
                                    "'" + kwMatch[1] + "' statement missing trailing colon ':'", 'Error'));
                            }
                        } else {
                            markers.push(lineMarker(lineNum, raw,
                                "'" + kwMatch[1] + "' statement likely missing trailing colon ':'", 'Warning'));
                        }
                    }

                    // Track class context for self-check
                    if (kwMatch[1] === 'class') {
                        inClass = true;
                    }
                }
            }

            // ---- def without function name ----
            if (/^\s*def\s*\(/.test(raw)) {
                markers.push(wordMarker(lineNum, raw, 'def',
                    "'def' missing function name before '('", 'Error'));
            }
            // def without parens at all
            if (/^\s*def\s+[A-Za-z_]\w*\s*[^:(]/.test(raw) && !/^\s*def\s+[A-Za-z_]\w*\s*\(/.test(raw)) {
                markers.push(lineMarker(lineNum, raw,
                    "Function definition missing parentheses '()'", 'Error'));
            }

            // ---- Missing self in class method ----
            if (inClass && /^\s{4,}def\s+\w+\s*\(\s*\)/.test(raw)) {
                // method has empty parens -- may be missing self
                var methodName = raw.match(/def\s+(\w+)/);
                if (methodName && methodName[1] !== '__new__') {
                    markers.push(lineMarker(lineNum, raw,
                        "Class method '" + methodName[1] + "' may be missing 'self' parameter", 'Warning'));
                }
            }

            // Reset class tracking if we hit a non-indented, non-blank line that isn't a decorator
            if (/^\S/.test(raw) && !/^\s*class\b/.test(raw) && !/^\s*@/.test(raw) && !/^\s*#/.test(raw)) {
                inClass = false;
            }

            // ---- Indentation: mixed tabs and spaces ----
            var leadingWS = raw.match(/^(\s+)/);
            if (leadingWS) {
                var ws = leadingWS[1];
                var hasTabs = ws.indexOf('\t') !== -1;
                var hasSpaces = ws.indexOf(' ') !== -1;
                if (hasTabs && hasSpaces) {
                    markers.push(marker(lineNum, 1, lineNum, ws.length + 1,
                        'Indentation contains mixed tabs and spaces', 'Error'));
                }
            }

            // ---- Indentation: unexpected dedent (heuristic) ----
            var currentIndent = (leadingWS ? leadingWS[1].length : 0);
            if (!prevLineBlank && currentIndent > prevIndent + 8) {
                // Jumped more than two indent levels at once -- likely mistake
                markers.push(marker(lineNum, 1, lineNum, currentIndent + 1,
                    'Unexpected indent: jumped multiple levels from previous line', 'Warning'));
            }
            prevIndent = currentIndent;
            prevLineBlank = false;

            // ---- Common typos ----
            // Tokenize the cleaned line into word-like tokens
            var wordPattern = /\b([A-Za-z_]\w*)\b/g;
            var wm;
            while ((wm = wordPattern.exec(cleaned)) !== null) {
                var word = wm[1];
                // 'form' needs special handling -- only flag when it looks like an import
                if (word === 'form') {
                    if (isFormTypo(raw)) {
                        markers.push(wordMarker(lineNum, raw, 'form',
                            "Did you mean 'from'? ('form' looks like a typo in import statement)", 'Error'));
                    }
                    continue;
                }
                // 'none' lowercase -- only flag at statement level, not attribute
                if (word === 'none') {
                    var colIdx = wm.index;
                    // Check it's not part of .none or _none etc.
                    if (colIdx === 0 || /[\s=,([]/.test(raw[colIdx - 1])) {
                        markers.push(wordMarker(lineNum, raw, 'none',
                            "Did you mean 'None'? (Python's None is capitalized)", 'Warning'));
                    }
                    continue;
                }
                if (PY_TYPOS[word] && word !== 'form' && word !== 'none') {
                    markers.push(wordMarker(lineNum, raw, word,
                        "Possible typo: '" + word + "' -- did you mean '" + PY_TYPOS[word] + "'?", 'Error'));
                }
            }

            // ---- Assignment in if/elif/while condition (warn, not error) ----
            if (/^\s*(if|elif|while)\b/.test(cleaned)) {
                // Extract the part between keyword and colon
                var condMatch = cleaned.match(/^\s*(?:if|elif|while)\s+(.+?):\s*$/);
                if (condMatch) {
                    var cond = condMatch[1];
                    // Look for single '=' that is not ==, !=, <=, >=, :=
                    if (/(?<![=!<>:])=(?!=)/.test(cond)) {
                        markers.push(lineMarker(lineNum, raw,
                            "Using '=' in condition -- did you mean '==' for comparison?", 'Warning'));
                    }
                }
            }

            // ---- Unclosed single-line strings ----
            // Count unescaped quotes on the raw line (excluding triple-quotes already handled)
            var rawForStrCheck = blankStringsAndComments(raw, '#');
            // If blankStringsAndComments left unbalanced quotes, the original raw line has unclosed strings
            // Better approach: count quotes on raw line (outside comments)
            var commentPos = -1;
            for (var ci = 0; ci < raw.length; ci++) {
                if (raw[ci] === '#') {
                    // check not in string
                    var qs = 0;
                    var qd = 0;
                    for (var qi = 0; qi < ci; qi++) {
                        if (raw[qi] === "'" && raw[qi - 1] !== '\\') qs++;
                        if (raw[qi] === '"' && raw[qi - 1] !== '\\') qd++;
                    }
                    if (qs % 2 === 0 && qd % 2 === 0) { commentPos = ci; break; }
                }
            }
            var lineForStringCheck = commentPos !== -1 ? raw.substring(0, commentPos) : raw;
            // Remove triple-quoted strings first
            lineForStringCheck = lineForStringCheck.replace(/"""[^]*?"""/g, '').replace(/'''[^]*?'''/g, '');
            // Count single and double quotes
            var singleCount = 0, doubleCount = 0;
            for (var sq = 0; sq < lineForStringCheck.length; sq++) {
                if (lineForStringCheck[sq] === '\\') { sq++; continue; }
                if (lineForStringCheck[sq] === "'") singleCount++;
                if (lineForStringCheck[sq] === '"') doubleCount++;
            }
            if (singleCount % 2 !== 0) {
                markers.push(lineMarker(lineNum, raw, "Unclosed string literal (unmatched single quote)", 'Error'));
            }
            if (doubleCount % 2 !== 0) {
                markers.push(lineMarker(lineNum, raw, "Unclosed string literal (unmatched double quote)", 'Error'));
            }

            // ---- print used without parentheses (Python 2 style) ----
            // Test against raw line because blanking strings removes the argument text
            if (/^\s*print\s+[^(=\s]/.test(raw)) {
                markers.push(wordMarker(lineNum, raw, 'print',
                    "'print' is a function in Python 3 -- use print(...)", 'Error'));
            }

            // ---- return outside function (top level) ----
            if (/^return\b/.test(trimmed) && currentIndent === 0) {
                markers.push(wordMarker(lineNum, raw, 'return',
                    "'return' outside of function", 'Error'));
            }

            // ---- Comparison to True/False/None using == instead of is ----
            if (/==\s*(True|False|None)\b/.test(cleaned) || /\b(True|False|None)\s*==/.test(cleaned)) {
                markers.push(lineMarker(lineNum, raw,
                    "Use 'is' / 'is not' instead of '==' for comparing to True/False/None", 'Hint'));
            }

            // ---- Mutable default argument ----
            if (/def\s+\w+\s*\([^)]*=\s*(\[\s*\]|\{\s*\})\s*[,)]/.test(raw)) {
                markers.push(lineMarker(lineNum, raw,
                    'Mutable default argument (list/dict). Use None as default and initialize inside the function.', 'Warning'));
            }
        }

        // ---- Remaining unmatched opening brackets ----
        for (var b = 0; b < bracketStack.length; b++) {
            var br = bracketStack[b];
            markers.push(marker(br.line, br.col, br.line, br.col + 1,
                "Unmatched opening " + BRACKET_NAME[br.char] + " '" + br.char +
                "' -- never closed", 'Error'));
        }

        return markers;
    }

    // ---------------------------------------------------------------------------
    // Go Validation
    // ---------------------------------------------------------------------------

    var GO_TYPOS = {
        'funt':     'func',
        'fucn':     'func',
        'fnuc':     'func',
        'func ':    null, // ignore, just the keyword
        'retrun':   'return',
        'retunr':   'return',
        'reutrn':   'return',
        'retrn':    'return',
        'ture':     'true',
        'treu':     'true',
        'flase':    'false',
        'fasle':    'false',
        'fales':    'false',
        'nill':     'nil',
        'niil':     'nil',
        'nli':      'nil',
        'Pringln':  'Println',
        'Pritnln':  'Println',
        'Printlln': 'Println',
        'Prinln':   'Println',
        'Printl':   'Println',
        'PRintln':  'Println',
        'Sprintff': 'Sprintf',
        'Springf':  'Sprintf',
        'Fpritnf':  'Fprintf',
        'Scanln':   null, // valid
        'Stirng':   'String',
        'stirng':   'string',
        'sring':    'string',
        'strng':    'string',
        'srting':   'string',
        'boll':     'bool',
        'boo':      'bool',
        'boool':    'bool',
        'itn':      'int',
        'nit':      'int',
        'flot':     'float',
        'flaot':    'float',
        'float64':  null, // valid
        'maek':     'make',
        'amke':     'make',
        'mak':      'make',
        'apend':    'append',
        'appned':   'append',
        'appedn':   'append',
        'apped':    'append',
        'lne':      'len',
        'leng':     'len',
        'lenght':   'len'
    };

    // Remove null entries (they are valid identifiers we added by mistake above)
    (function () {
        var keys = Object.keys(GO_TYPOS);
        for (var k = 0; k < keys.length; k++) {
            if (GO_TYPOS[keys[k]] === null) delete GO_TYPOS[keys[k]];
        }
    })();

    function validateGo(code, monaco, editor) {
        if (!code || !monaco || !editor) return [];
        var markers = [];
        var lines = code.split('\n');

        // ---- Package declaration ----
        var hasPackage = false;
        var firstNonEmpty = -1;

        // First pass: find package and collect imports
        var importedPackages = {}; // name -> lineNum
        var inImportBlock = false;
        var importBlockParen = false;

        for (var p = 0; p < lines.length; p++) {
            var lt = lines[p].trim();
            if (lt === '' || lt.indexOf('//') === 0) continue;
            if (firstNonEmpty === -1) firstNonEmpty = p + 1;

            if (/^package\s+\w+/.test(lt)) {
                hasPackage = true;
            }

            // Collect imports
            if (/^import\s*\(/.test(lt)) {
                inImportBlock = true;
                importBlockParen = true;
                continue;
            }
            if (inImportBlock) {
                if (lt === ')') {
                    inImportBlock = false;
                    continue;
                }
                // Extract package name from import line like: "fmt" or alias "fmt"
                var impMatch = lt.match(/^\s*(?:(\w+)\s+)?"([^"]+)"\s*$/);
                if (impMatch) {
                    var alias = impMatch[1];
                    var path = impMatch[2];
                    var pkgName = alias || path.split('/').pop();
                    importedPackages[pkgName] = p + 1;
                }
                continue;
            }
            // Single-line import
            var singleImp = lt.match(/^import\s+"([^"]+)"/);
            if (singleImp) {
                var sp = singleImp[1].split('/').pop();
                importedPackages[sp] = p + 1;
            }
        }

        // Note: we don't check for 'package' declaration because the backend
        // wraps user code with 'package main' and imports before execution.
        // Similarly, we skip unused-import checks since the backend manages imports.

        // ---- Unused imports (basic): check if the package name appears in non-import lines ----
        var codeWithoutImports = [];
        var pastImports = false;
        var insideImportBlock = false;
        for (var ci = 0; ci < lines.length; ci++) {
            var clt = lines[ci].trim();
            if (/^import\s*\(/.test(clt)) { insideImportBlock = true; continue; }
            if (insideImportBlock) {
                if (clt === ')') insideImportBlock = false;
                continue;
            }
            if (/^import\s+"/.test(clt)) continue;
            if (/^package\s+/.test(clt)) continue;
            codeWithoutImports.push(lines[ci]);
        }
        var codeBody = codeWithoutImports.join('\n');

        // Unused import check skipped - backend manages imports for user code

        // ---- Per-line checks ----
        var braceStack = []; // [{char, line, col}]
        var inBlockComment = false;

        for (var i = 0; i < lines.length; i++) {
            var raw = lines[i];
            var lineNum = i + 1;
            var trimmed = raw.trim();

            // Block comment tracking
            if (inBlockComment) {
                var endComment = raw.indexOf('*/');
                if (endComment !== -1) {
                    inBlockComment = false;
                    // Process rest of line after */
                    raw = raw.substring(endComment + 2);
                    trimmed = raw.trim();
                    if (trimmed === '') continue;
                } else {
                    continue;
                }
            }
            if (raw.indexOf('/*') !== -1) {
                var bcStart = raw.indexOf('/*');
                var bcEnd = raw.indexOf('*/', bcStart + 2);
                if (bcEnd === -1) {
                    inBlockComment = true;
                    raw = raw.substring(0, bcStart);
                    trimmed = raw.trim();
                    if (trimmed === '') continue;
                }
                // else: inline block comment, handle in cleaned line
            }

            if (trimmed === '' || trimmed.indexOf('//') === 0) continue;

            var cleaned = blankStringsAndComments(raw, '/');
            var cleanedTrimmed = cleaned.trim();

            // ---- Brace matching ----
            for (var j = 0; j < cleaned.length; j++) {
                var ch = cleaned[j];
                if (ch === '{') {
                    braceStack.push({ char: '{', line: lineNum, col: j + 1 });
                } else if (ch === '}') {
                    if (braceStack.length === 0) {
                        markers.push(marker(lineNum, j + 1, lineNum, j + 2,
                            "Unmatched closing brace '}'", 'Error'));
                    } else {
                        braceStack.pop();
                    }
                }
            }

            // Also track parens and brackets for Go
            var parenStack = [];
            for (var pj = 0; pj < cleaned.length; pj++) {
                var pc = cleaned[pj];
                if (pc === '(' || pc === '[') {
                    parenStack.push({ char: pc, col: pj + 1 });
                } else if (pc === ')' || pc === ']') {
                    var expected = pc === ')' ? '(' : '[';
                    if (parenStack.length === 0 || parenStack[parenStack.length - 1].char !== expected) {
                        var bName = pc === ')' ? 'parenthesis' : 'bracket';
                        markers.push(marker(lineNum, pj + 1, lineNum, pj + 2,
                            "Unmatched closing " + bName + " '" + pc + "'", 'Error'));
                    } else {
                        parenStack.pop();
                    }
                }
            }
            // Note: we don't report unclosed parens/brackets per-line because Go expressions
            // can span lines. Brace mismatches are more critical.

            // ---- Unnecessary semicolons ----
            if (/;\s*$/.test(cleanedTrimmed) && !/^\s*for\b/.test(cleaned)) {
                // Allow semicolons in for-loop headers
                markers.push(marker(lineNum, raw.lastIndexOf(';') + 1, lineNum, raw.lastIndexOf(';') + 2,
                    "Unnecessary semicolon (Go does not require semicolons at end of statements)", 'Warning'));
            }

            // ---- Common typos ----
            var wordPattern = /\b([A-Za-z_]\w*)\b/g;
            var wm;
            while ((wm = wordPattern.exec(cleaned)) !== null) {
                var word = wm[1];
                if (GO_TYPOS[word]) {
                    markers.push(wordMarker(lineNum, raw, word,
                        "Possible typo: '" + word + "' -- did you mean '" + GO_TYPOS[word] + "'?", 'Error'));
                }
            }

            // ---- func syntax checks ----
            // 'func' keyword without proper name/parens (but not func literal)
            if (/\bfunc\b/.test(cleaned)) {
                // func followed by nothing useful on the line
                var funcMatch = cleaned.match(/\bfunc\s*$/);
                if (funcMatch) {
                    markers.push(wordMarker(lineNum, raw, 'func',
                        "'func' declaration is incomplete -- missing function name or signature", 'Error'));
                }
                // func with name but no parens
                var namedFunc = cleaned.match(/\bfunc\s+(\w+)\s*$/);
                if (namedFunc) {
                    markers.push(lineMarker(lineNum, raw,
                        "Function '" + namedFunc[1] + "' missing parameter list '()'", 'Error'));
                }
                // func with name and parens but missing opening brace on same or next line
                // (we can only check same line here)
                var funcFullSig = cleaned.match(/\bfunc\s+(?:\([^)]*\)\s*)?\w+\s*\([^)]*\)(?:\s*(?:\([^)]*\)|\w+))?\s*$/);
                if (funcFullSig && i + 1 < lines.length) {
                    var nextTrimmed = lines[i + 1].trim();
                    if (nextTrimmed !== '{' && nextTrimmed.indexOf('{') !== 0) {
                        // Might be missing opening brace -- but only warn if next line doesn't start with {
                        // Only flag if the signature line doesn't end with {
                        if (raw.trim().slice(-1) !== '{') {
                            markers.push(lineMarker(lineNum, raw,
                                "Function signature may be missing opening brace '{'", 'Warning'));
                        }
                    }
                }
            }

            // ---- := in top level (outside function) ----
            if (/^[A-Za-z_]\w*\s*:=/.test(trimmed) && braceStack.length === 0) {
                markers.push(lineMarker(lineNum, raw,
                    "Short variable declaration ':=' cannot be used at package level; use 'var' instead", 'Error'));
            }

            // ---- Common error patterns ----
            // Using 'self' (Python habit)
            if (/\bself\b/.test(cleaned) && !/["'`]/.test(raw)) {
                markers.push(wordMarker(lineNum, raw, 'self',
                    "Go does not use 'self' -- use a receiver name (e.g., the first letter of the type)", 'Hint'));
            }

            // Using 'None' or 'True'/'False' (Python keywords)
            if (/\bNone\b/.test(cleaned)) {
                markers.push(wordMarker(lineNum, raw, 'None',
                    "Did you mean 'nil'? ('None' is Python; Go uses 'nil')", 'Error'));
            }
            if (/\bTrue\b/.test(cleaned)) {
                markers.push(wordMarker(lineNum, raw, 'True',
                    "Did you mean 'true'? (Go booleans are lowercase)", 'Error'));
            }
            if (/\bFalse\b/.test(cleaned)) {
                markers.push(wordMarker(lineNum, raw, 'False',
                    "Did you mean 'false'? (Go booleans are lowercase)", 'Error'));
            }

            // ---- Using 'class' or 'def' (Python habits) ----
            if (/^\s*class\b/.test(cleaned)) {
                markers.push(wordMarker(lineNum, raw, 'class',
                    "Go does not have 'class' -- use 'type ... struct' instead", 'Error'));
            }
            if (/^\s*def\b/.test(cleaned)) {
                markers.push(wordMarker(lineNum, raw, 'def',
                    "Go does not use 'def' -- use 'func' to define functions", 'Error'));
            }

            // ---- Missing error check (very basic: _ used for error) ----
            if (/,\s*_\s*:?=\s*/.test(cleaned) || /\b_\s*:?=\s*\w+\.\w+\(/.test(cleaned)) {
                // Check if the discarded value could be an error (heuristic: last return value)
                // Only hint, not error
                var fnCallMatch = cleaned.match(/(\w+)\s*\(/);
                // Too many false positives, so let's be conservative -- only flag common patterns
                if (/,\s*_\s*:?=\s*(?:os|io|bufio|net|http|json|ioutil|strconv)\.\w+/.test(cleaned)) {
                    markers.push(lineMarker(lineNum, raw,
                        "Discarded error return value -- consider handling the error", 'Hint'));
                }
            }

            // ---- fmt.Println without fmt import ----
            if (/\bfmt\.\w+/.test(cleaned) && !importedPackages['fmt']) {
                markers.push(wordMarker(lineNum, raw, 'fmt',
                    "Package 'fmt' is used but not imported", 'Error'));
            }
        }

        // ---- Remaining unmatched opening braces ----
        for (var b = 0; b < braceStack.length; b++) {
            var br = braceStack[b];
            markers.push(marker(br.line, br.col, br.line, br.col + 1,
                "Unmatched opening brace '{' -- never closed", 'Error'));
        }

        return markers;
    }

    // ---------------------------------------------------------------------------
    // Linting lifecycle
    // ---------------------------------------------------------------------------

    function applyMarkers(monacoInstance, editorInstance, diagnostics) {
        if (!monacoInstance || !editorInstance) return;
        var model = editorInstance.getModel();
        if (!model) return;
        monacoInstance.editor.setModelMarkers(model, OWNER, diagnostics);

        // Update status bar error/warning counts
        var errors = 0;
        var warnings = 0;
        diagnostics.forEach(function(d) {
            if (d.severity === monacoInstance.MarkerSeverity.Error) errors++;
            else if (d.severity === monacoInstance.MarkerSeverity.Warning) warnings++;
        });

        var errCountEl = document.getElementById('statusbar-error-count');
        var warnCountEl = document.getElementById('statusbar-warning-count');
        var errEl = document.getElementById('statusbar-errors');
        var warnEl = document.getElementById('statusbar-warnings');

        if (errCountEl) errCountEl.textContent = errors;
        if (warnCountEl) warnCountEl.textContent = warnings;
        if (errEl) errEl.className = 'statusbar-item statusbar-errors' + (errors > 0 ? ' has-issues' : '');
        if (warnEl) warnEl.className = 'statusbar-item statusbar-warnings' + (warnings > 0 ? ' has-issues' : '');
    }

    function runLint(editorInstance, language) {
        if (!editorInstance || !window.monaco) return;
        var code = editorInstance.getValue();
        var m = window.monaco;
        var diagnostics;

        if (language === 'python') {
            diagnostics = validatePython(code, m, editorInstance);
        } else if (language === 'go') {
            diagnostics = validateGo(code, m, editorInstance);
        } else {
            diagnostics = [];
        }

        applyMarkers(m, editorInstance, diagnostics);
    }

    function startLinting(editorInstance, language) {
        // Stop any previous linting session
        stopLinting();

        if (!editorInstance || !window.monaco) {
            console.warn('EditorLinter.startLinting: editor or monaco not available');
            return;
        }

        _currentLanguage = language;

        // Run once immediately
        runLint(editorInstance, language);

        // Subscribe to content changes with debounce
        _disposable = editorInstance.onDidChangeModelContent(function () {
            if (_timer) clearTimeout(_timer);
            _timer = setTimeout(function () {
                _timer = null;
                runLint(editorInstance, _currentLanguage);
            }, DEBOUNCE_MS);
        });
    }

    function stopLinting() {
        if (_timer) {
            clearTimeout(_timer);
            _timer = null;
        }
        if (_disposable) {
            _disposable.dispose();
            _disposable = null;
        }
        // Clear existing markers
        if (window.monaco && window.editor) {
            var model = window.editor.getModel();
            if (model) {
                window.monaco.editor.setModelMarkers(model, OWNER, []);
            }
        }
        _currentLanguage = null;
    }

    /**
     * Convenience: update the language being linted without tearing down and
     * re-subscribing (useful when the user switches between Python and Go).
     */
    function setLanguage(language) {
        _currentLanguage = language;
        if (window.editor) {
            runLint(window.editor, language);
        }
    }

    // ---------------------------------------------------------------------------
    // Public API
    // ---------------------------------------------------------------------------

    window.EditorLinter = {
        validatePython: validatePython,
        validateGo:     validateGo,
        startLinting:   startLinting,
        stopLinting:    stopLinting,
        setLanguage:    setLanguage
    };
})();
