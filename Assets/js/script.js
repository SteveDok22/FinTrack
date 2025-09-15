/**
 * Personal Finance Dashboard - Main Application
 * Entry point and global application management
 */

// Application State
const App = {
    isInitialized: false,
    currentPage: 'dashboard',
    transactions: [],
    categories: [],
    settings: {}
};

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

/**
 * Main application initialization
 */
function initializeApp() {
    try {
        // Initialize storage and load data
        initializeStorage();

        // Load user data
        loadApplicationData();

        // Initialize UI components
        initializeUI();

        // Set up event listeners
        setupEventListeners();

        // Mark app as initialized
        App.isInitialized = true;

        console.log('Personal Finance Dashboard initialized successfully');

    } catch (error) {
        console.error('Failed to initialize application:', error);
        showNotification('Failed to load application. Please refresh the page.', 'error');
    }
}

/**
 * Load application data from storage
 */
function loadApplicationData() {
    // Load transactions from storage
    App.transactions = getTransactions();

    // Load categories from storage
    App.categories = getCategories();

    // Load user settings
    App.settings = getSettings();
}
/**
 * Initialize UI components and modals
 */
function initializeUI() {
    // Initialize modals
    initializeModals();

    // Initialize navigation
    initializeNavigation();

    // Initialize dashboard if on main page
    if (document.getElementById('current-balance')) {
        initializeDashboard();
    }

    // Set today's date as default for transaction forms
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        if (!input.value) {
            input.value = today;
        }
    });
}