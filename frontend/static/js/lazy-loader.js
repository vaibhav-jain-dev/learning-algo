/**
 * Lazy Script Loader - Load heavy scripts only when needed
 * Reduces initial page load and memory usage
 */

(function() {
    'use strict';

    // Track loaded scripts to avoid duplicates
    const loadedScripts = new Set();
    const loadingPromises = new Map();

    // CDN URLs for lazy-loaded resources
    const CDN = {
        // CodeMirror
        codemirror: {
            css: [
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/theme/eclipse.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/theme/material-darker.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/foldgutter.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/hint/show-hint.min.css'
            ],
            js: [
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js'
            ],
            addons: [
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/python/python.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/go/go.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/sql/sql.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/matchbrackets.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/closebrackets.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/trailingspace.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/selection/active-line.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/comment/comment.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/foldcode.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/foldgutter.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/brace-fold.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/indent-fold.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/search/match-highlighter.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/hint/show-hint.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/hint/sql-hint.min.js'
            ]
        },

        // SQL Formatter
        sqlFormatter: {
            js: ['https://cdn.jsdelivr.net/npm/sql-formatter@14.1.0/lib/index.js']
        },

        // html2pdf for PDF export
        html2pdf: {
            js: ['https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js']
        },

        // Highlight.js (minimal set for code highlighting)
        highlightCore: {
            css: ['https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css'],
            js: ['https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js']
        },

        // Highlight.js language extensions
        highlightLanguages: {
            js: [
                'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/python.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/sql.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/bash.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/json.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/yaml.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/javascript.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/java.min.js'
            ]
        }
    };

    /**
     * Load a single script
     */
    function loadScript(url) {
        if (loadedScripts.has(url)) {
            return Promise.resolve();
        }

        if (loadingPromises.has(url)) {
            return loadingPromises.get(url);
        }

        const promise = new Promise(function(resolve, reject) {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;

            script.onload = function() {
                loadedScripts.add(url);
                loadingPromises.delete(url);
                resolve();
            };

            script.onerror = function() {
                loadingPromises.delete(url);
                reject(new Error('Failed to load script: ' + url));
            };

            document.head.appendChild(script);
        });

        loadingPromises.set(url, promise);
        return promise;
    }

    /**
     * Load a stylesheet
     */
    function loadStylesheet(url) {
        if (loadedScripts.has(url)) {
            return Promise.resolve();
        }

        if (loadingPromises.has(url)) {
            return loadingPromises.get(url);
        }

        const promise = new Promise(function(resolve, reject) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;

            link.onload = function() {
                loadedScripts.add(url);
                loadingPromises.delete(url);
                resolve();
            };

            link.onerror = function() {
                loadingPromises.delete(url);
                reject(new Error('Failed to load stylesheet: ' + url));
            };

            document.head.appendChild(link);
        });

        loadingPromises.set(url, promise);
        return promise;
    }

    /**
     * Load multiple resources in parallel
     */
    function loadResources(urls, type) {
        const loadFn = type === 'css' ? loadStylesheet : loadScript;
        return Promise.all(urls.map(loadFn));
    }

    /**
     * Load multiple scripts sequentially (for dependencies)
     */
    function loadScriptsSequential(urls) {
        return urls.reduce(function(promise, url) {
            return promise.then(function() {
                return loadScript(url);
            });
        }, Promise.resolve());
    }

    /**
     * Load CodeMirror with all addons
     */
    function loadCodeMirror() {
        if (typeof CodeMirror !== 'undefined') {
            return Promise.resolve();
        }

        // Load CSS first, then main script, then addons
        return loadResources(CDN.codemirror.css, 'css')
            .then(function() {
                return loadScriptsSequential(CDN.codemirror.js);
            })
            .then(function() {
                return loadResources(CDN.codemirror.addons, 'js');
            });
    }

    /**
     * Load SQL Formatter
     */
    function loadSqlFormatter() {
        if (typeof sqlFormatter !== 'undefined') {
            return Promise.resolve();
        }
        return loadResources(CDN.sqlFormatter.js, 'js');
    }

    /**
     * Load html2pdf
     */
    function loadHtml2Pdf() {
        if (typeof html2pdf !== 'undefined') {
            return Promise.resolve();
        }
        return loadResources(CDN.html2pdf.js, 'js');
    }

    /**
     * Load Highlight.js core
     */
    function loadHighlightCore() {
        if (typeof hljs !== 'undefined') {
            return Promise.resolve();
        }

        return loadResources(CDN.highlightCore.css, 'css')
            .then(function() {
                return loadScriptsSequential(CDN.highlightCore.js);
            });
    }

    /**
     * Load Highlight.js with all languages
     */
    function loadHighlight() {
        return loadHighlightCore()
            .then(function() {
                return loadResources(CDN.highlightLanguages.js, 'js');
            });
    }

    /**
     * Preload resources (just start loading, don't wait)
     */
    function preload(resourceType) {
        switch (resourceType) {
            case 'codemirror':
                loadCodeMirror().catch(function() {});
                break;
            case 'highlight':
                loadHighlight().catch(function() {});
                break;
            case 'sql-formatter':
                loadSqlFormatter().catch(function() {});
                break;
            case 'html2pdf':
                loadHtml2Pdf().catch(function() {});
                break;
        }
    }

    /**
     * Auto-detect and preload based on page
     */
    function autoPreload() {
        const path = window.location.pathname;

        // Preload highlight.js for all pages (core functionality)
        loadHighlight().then(function() {
            if (typeof hljs !== 'undefined') {
                hljs.highlightAll();
            }
        }).catch(function() {});

        // Preload CodeMirror for practice/SQL/Redis pages
        if (path.includes('/practice') || path.includes('/sql') ||
            path.includes('/redis') || path.includes('/elasticsearch')) {
            preload('codemirror');
        }

        // Preload SQL formatter for SQL pages
        if (path.includes('/sql')) {
            preload('sql-formatter');
        }
    }

    /**
     * Check if a feature is loaded
     */
    function isLoaded(feature) {
        switch (feature) {
            case 'codemirror':
                return typeof CodeMirror !== 'undefined';
            case 'highlight':
                return typeof hljs !== 'undefined';
            case 'sql-formatter':
                return typeof sqlFormatter !== 'undefined';
            case 'html2pdf':
                return typeof html2pdf !== 'undefined';
            default:
                return false;
        }
    }

    // Run auto-preload after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoPreload);
    } else {
        autoPreload();
    }

    // Handle HTMX page navigation
    document.body.addEventListener('htmx:afterSwap', function() {
        autoPreload();
        // Re-highlight code blocks after content swap
        if (typeof hljs !== 'undefined') {
            setTimeout(function() {
                document.querySelectorAll('pre code:not(.hljs)').forEach(function(block) {
                    hljs.highlightElement(block);
                });
            }, 50);
        }
    });

    // Export public API
    window.LazyLoader = {
        loadCodeMirror: loadCodeMirror,
        loadSqlFormatter: loadSqlFormatter,
        loadHtml2Pdf: loadHtml2Pdf,
        loadHighlight: loadHighlight,
        loadScript: loadScript,
        loadStylesheet: loadStylesheet,
        preload: preload,
        isLoaded: isLoaded
    };

})();
