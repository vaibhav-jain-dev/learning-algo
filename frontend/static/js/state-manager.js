/**
 * User State Manager - Client-side caching for user progress
 * Persists: current section, scroll position, topic, sidebar state
 */

(function() {
    'use strict';

    const STATE_KEY = 'dsalgo_user_state';
    const SCROLL_DEBOUNCE_MS = 150;
    const STATE_VERSION = 1;

    // State structure
    const defaultState = {
        version: STATE_VERSION,
        lastVisit: null,
        currentPage: null,
        pages: {}, // Per-page state: { scrollY, selectedProblem, sidebarCollapsed, expandedFolders, activeTab }
        recentTopics: [], // Last 10 visited topics
        preferences: {
            language: 'python',
            theme: 'light'
        }
    };

    let state = null;
    let saveTimeout = null;

    /**
     * Load state from localStorage
     */
    function loadState() {
        try {
            const stored = localStorage.getItem(STATE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Migrate if version mismatch
                if (parsed.version !== STATE_VERSION) {
                    state = migrateState(parsed);
                } else {
                    state = { ...defaultState, ...parsed };
                }
            } else {
                state = { ...defaultState };
            }
        } catch (e) {
            console.warn('Failed to load user state:', e);
            state = { ...defaultState };
        }
        return state;
    }

    /**
     * Migrate old state versions
     */
    function migrateState(oldState) {
        // For now, just reset to default with preserved preferences
        return {
            ...defaultState,
            preferences: oldState.preferences || defaultState.preferences,
            recentTopics: oldState.recentTopics || []
        };
    }

    /**
     * Save state to localStorage (debounced)
     */
    function saveState() {
        if (saveTimeout) {
            clearTimeout(saveTimeout);
        }
        saveTimeout = setTimeout(function() {
            try {
                state.lastVisit = Date.now();
                localStorage.setItem(STATE_KEY, JSON.stringify(state));
            } catch (e) {
                console.warn('Failed to save user state:', e);
            }
        }, 100);
    }

    /**
     * Force immediate save
     */
    function saveStateNow() {
        if (saveTimeout) {
            clearTimeout(saveTimeout);
        }
        try {
            state.lastVisit = Date.now();
            localStorage.setItem(STATE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('Failed to save user state:', e);
        }
    }

    /**
     * Get current page identifier
     */
    function getPageId() {
        return window.location.pathname + window.location.search;
    }

    /**
     * Get or create page state
     */
    function getPageState(pageId) {
        pageId = pageId || getPageId();
        if (!state.pages[pageId]) {
            state.pages[pageId] = {
                scrollY: 0,
                scrollPositions: {}, // For specific scrollable elements
                selectedProblem: null,
                activeTab: null,
                expandedFolders: [],
                sidebarCollapsed: false,
                lastVisit: Date.now()
            };
        }
        return state.pages[pageId];
    }

    /**
     * Update page state
     */
    function updatePageState(updates, pageId) {
        pageId = pageId || getPageId();
        const pageState = getPageState(pageId);
        Object.assign(pageState, updates, { lastVisit: Date.now() });
        state.currentPage = pageId;
        saveState();
    }

    /**
     * Track scroll position with debouncing
     */
    let scrollTimeout = null;
    function trackScrollPosition(element, elementId) {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            const pageState = getPageState();
            if (element === window || element === document.documentElement) {
                pageState.scrollY = window.scrollY || document.documentElement.scrollTop;
            } else if (elementId) {
                if (!pageState.scrollPositions) {
                    pageState.scrollPositions = {};
                }
                pageState.scrollPositions[elementId] = element.scrollTop;
            }
            saveState();
        }, SCROLL_DEBOUNCE_MS);
    }

    /**
     * Restore scroll position
     */
    function restoreScrollPosition(element, elementId) {
        const pageState = getPageState();

        if (element === window || element === document.documentElement) {
            if (pageState.scrollY > 0) {
                // Use requestAnimationFrame for smoother restoration
                requestAnimationFrame(function() {
                    window.scrollTo(0, pageState.scrollY);
                });
            }
        } else if (elementId && pageState.scrollPositions && pageState.scrollPositions[elementId]) {
            requestAnimationFrame(function() {
                element.scrollTop = pageState.scrollPositions[elementId];
            });
        }
    }

    /**
     * Track selected problem
     */
    function setSelectedProblem(problemPath) {
        updatePageState({ selectedProblem: problemPath });
    }

    /**
     * Get selected problem
     */
    function getSelectedProblem() {
        return getPageState().selectedProblem;
    }

    /**
     * Track active tab
     */
    function setActiveTab(tabName) {
        updatePageState({ activeTab: tabName });
    }

    /**
     * Get active tab
     */
    function getActiveTab() {
        return getPageState().activeTab;
    }

    /**
     * Track expanded folders in sidebar
     */
    function setExpandedFolders(folders) {
        updatePageState({ expandedFolders: folders });
    }

    /**
     * Get expanded folders
     */
    function getExpandedFolders() {
        return getPageState().expandedFolders || [];
    }

    /**
     * Toggle folder expansion
     */
    function toggleFolder(folderId) {
        const folders = getExpandedFolders();
        const index = folders.indexOf(folderId);
        if (index === -1) {
            folders.push(folderId);
        } else {
            folders.splice(index, 1);
        }
        setExpandedFolders(folders);
    }

    /**
     * Add topic to recent list
     */
    function addRecentTopic(topic) {
        if (!topic || !topic.path) return;

        // Remove if already exists
        state.recentTopics = state.recentTopics.filter(function(t) {
            return t.path !== topic.path;
        });

        // Add to front
        state.recentTopics.unshift({
            path: topic.path,
            title: topic.title || topic.path,
            category: topic.category,
            timestamp: Date.now()
        });

        // Keep only last 10
        state.recentTopics = state.recentTopics.slice(0, 10);
        saveState();
    }

    /**
     * Get recent topics
     */
    function getRecentTopics() {
        return state.recentTopics || [];
    }

    /**
     * Set user preference
     */
    function setPreference(key, value) {
        state.preferences[key] = value;
        saveState();
    }

    /**
     * Get user preference
     */
    function getPreference(key) {
        return state.preferences[key];
    }

    /**
     * Setup scroll tracking for main window and scrollable elements
     */
    function setupScrollTracking() {
        // Track main window scroll
        window.addEventListener('scroll', function() {
            trackScrollPosition(window);
        }, { passive: true });

        // Track specific scrollable elements
        const scrollableSelectors = [
            '#problem-tree',
            '.sidebar',
            '.topic-content',
            '.problem-description',
            '#description-tab',
            '.content'
        ];

        scrollableSelectors.forEach(function(selector) {
            const elements = document.querySelectorAll(selector);
            elements.forEach(function(el) {
                const elementId = el.id || selector.replace(/[^a-zA-Z0-9]/g, '_');
                el.addEventListener('scroll', function() {
                    trackScrollPosition(el, elementId);
                }, { passive: true });
            });
        });
    }

    /**
     * Restore all scroll positions
     */
    function restoreAllScrollPositions() {
        // Restore main window scroll
        restoreScrollPosition(window);

        // Restore specific elements
        const pageState = getPageState();
        if (pageState.scrollPositions) {
            Object.keys(pageState.scrollPositions).forEach(function(elementId) {
                // Try to find by ID first
                let el = document.getElementById(elementId);
                if (!el) {
                    // Try as selector
                    const selector = elementId.replace(/_/g, '');
                    el = document.querySelector('.' + selector) || document.querySelector('#' + selector);
                }
                if (el) {
                    restoreScrollPosition(el, elementId);
                }
            });
        }
    }

    /**
     * Setup sidebar folder tracking
     */
    function setupFolderTracking() {
        // Restore expanded folders
        const expandedFolders = getExpandedFolders();
        expandedFolders.forEach(function(folderId) {
            const folder = document.querySelector('[data-folder="' + folderId + '"]');
            if (folder) {
                folder.classList.add('expanded');
                const content = folder.querySelector('.folder-content, .tree-items');
                if (content) {
                    content.style.display = '';
                }
            }
        });

        // Track folder clicks
        document.addEventListener('click', function(e) {
            const folderHeader = e.target.closest('.tree-folder-header, .folder-header');
            if (folderHeader) {
                const folder = folderHeader.closest('.tree-folder, [data-folder]');
                if (folder) {
                    const folderId = folder.dataset.folder || folder.dataset.category ||
                                     folderHeader.textContent.trim().toLowerCase().replace(/[^a-z0-9]/g, '-');
                    toggleFolder(folderId);
                }
            }
        });
    }

    /**
     * Setup problem selection tracking
     */
    function setupProblemTracking() {
        // Restore selected problem
        const selectedProblem = getSelectedProblem();
        if (selectedProblem) {
            // Highlight the selected problem in sidebar
            const problemLinks = document.querySelectorAll('.tree-item a, .problem-link');
            problemLinks.forEach(function(link) {
                if (link.href && link.href.includes(selectedProblem)) {
                    link.classList.add('active');
                    // Scroll the sidebar to show this problem
                    const sidebar = link.closest('.sidebar, #problem-tree');
                    if (sidebar) {
                        setTimeout(function() {
                            link.scrollIntoView({ block: 'center', behavior: 'smooth' });
                        }, 100);
                    }
                }
            });
        }

        // Track problem clicks
        document.addEventListener('click', function(e) {
            const problemLink = e.target.closest('.tree-item a, .problem-link');
            if (problemLink && problemLink.href) {
                const path = new URL(problemLink.href).searchParams.get('problem') ||
                            problemLink.dataset.problem ||
                            problemLink.getAttribute('onclick')?.match(/loadProblem\(['"](.+?)['"]\)/)?.[1];
                if (path) {
                    setSelectedProblem(path);
                }
            }
        });
    }

    /**
     * Setup tab tracking
     */
    function setupTabTracking() {
        // Restore active tab
        const activeTab = getActiveTab();
        if (activeTab) {
            const tabBtn = document.querySelector('.tab[onclick*="' + activeTab + '"], .tab[data-tab="' + activeTab + '"]');
            if (tabBtn && typeof window.showTab === 'function') {
                setTimeout(function() {
                    window.showTab(activeTab);
                }, 50);
            }
        }

        // Track tab clicks
        document.addEventListener('click', function(e) {
            const tab = e.target.closest('.tab');
            if (tab) {
                const tabName = tab.dataset.tab ||
                               tab.getAttribute('onclick')?.match(/showTab\(['"](.+?)['"]\)/)?.[1];
                if (tabName) {
                    setActiveTab(tabName);
                }
            }
        });
    }

    /**
     * Track topic visits
     */
    function setupTopicTracking() {
        // Check if we're on a topic page
        const path = window.location.pathname;
        const topicMatch = path.match(/^\/topic\/([^\/]+)\/([^\/]+)/);
        if (topicMatch) {
            const category = topicMatch[1];
            const topic = topicMatch[2];
            const titleEl = document.querySelector('h1, .topic-title');
            addRecentTopic({
                path: path,
                title: titleEl ? titleEl.textContent.trim() : topic,
                category: category
            });
        }
    }

    /**
     * Clean old page states (keep last 50 pages)
     */
    function cleanOldStates() {
        const pages = Object.entries(state.pages);
        if (pages.length > 50) {
            // Sort by lastVisit and keep newest 50
            pages.sort(function(a, b) {
                return (b[1].lastVisit || 0) - (a[1].lastVisit || 0);
            });
            state.pages = {};
            pages.slice(0, 50).forEach(function(entry) {
                state.pages[entry[0]] = entry[1];
            });
            saveState();
        }
    }

    /**
     * Initialize state manager
     */
    function init() {
        loadState();
        cleanOldStates();

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', onDOMReady);
        } else {
            onDOMReady();
        }

        // Save state before page unload
        window.addEventListener('beforeunload', saveStateNow);

        // Handle HTMX page swaps
        document.body.addEventListener('htmx:afterSwap', function() {
            setTimeout(function() {
                restoreAllScrollPositions();
                setupFolderTracking();
                setupProblemTracking();
                setupTabTracking();
            }, 50);
        });

        // Handle HTMX settle (after all animations)
        document.body.addEventListener('htmx:afterSettle', function() {
            setTimeout(restoreAllScrollPositions, 100);
        });
    }

    /**
     * Called when DOM is ready
     */
    function onDOMReady() {
        setupScrollTracking();
        setupFolderTracking();
        setupProblemTracking();
        setupTabTracking();
        setupTopicTracking();

        // Restore scroll positions after a short delay to allow content to render
        setTimeout(restoreAllScrollPositions, 100);
    }

    // Initialize
    init();

    // Export public API
    window.UserStateManager = {
        getState: function() { return state; },
        getPageState: getPageState,
        updatePageState: updatePageState,
        setSelectedProblem: setSelectedProblem,
        getSelectedProblem: getSelectedProblem,
        setActiveTab: setActiveTab,
        getActiveTab: getActiveTab,
        setExpandedFolders: setExpandedFolders,
        getExpandedFolders: getExpandedFolders,
        toggleFolder: toggleFolder,
        addRecentTopic: addRecentTopic,
        getRecentTopics: getRecentTopics,
        setPreference: setPreference,
        getPreference: getPreference,
        restoreScrollPosition: restoreScrollPosition,
        saveStateNow: saveStateNow
    };

})();
