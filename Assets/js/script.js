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

/**
 * Set up global event listeners
 */
function setupEventListeners() {
    // Navigation clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Modal controls
    const addTransactionBtn = document.getElementById('add-transaction-btn');
    if (addTransactionBtn) {
        addTransactionBtn.addEventListener('click', openAddTransactionModal);
    }

    const filterBtn = document.getElementById('filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', openFilterModal);
    }

    // Modal close buttons
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Modal overlay clicks
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', closeModal);
    });

    // Transaction form submission
    const transactionForm = document.getElementById('transaction-form');
    if (transactionForm) {
        transactionForm.addEventListener('submit', handleTransactionSubmit);
    }

    // Filter form submission
    const filterForm = document.getElementById('filter-form');
    if (filterForm) {
        filterForm.addEventListener('submit', handleFilterSubmit);
    }

    // ESC key to close modals
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

/**
 * Initialize modal functionality
 */
function initializeModals() {
    // Populate category dropdowns
    populateCategoryDropdowns();
}

/**
 * Handle navigation between pages
 */
function handleNavigation(event) {
    // Update active navigation state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
}

/**
 * Open add transaction modal
 */
function openAddTransactionModal() {
    const modal = document.getElementById('transaction-modal');
    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');

        // Focus first input
        const firstInput = modal.querySelector('input, select');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

/**
 * Open filter modal
 */
function openFilterModal() {
    const modal = document.getElementById('filter-modal');
    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    }
}

/**
 * Close all modals
 */
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    });

    // Clear form data
    const forms = document.querySelectorAll('.modal form');
    forms.forEach(form => form.reset());
}

/**
 * Handle transaction form submission
 */
 function handleTransactionSubmit(event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton ? submitButton.textContent : '';

    try {
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Adding...';
        }

        const formData = new FormData(event.target);
        const transactionData = {
            type: formData.get('type'),
            amount: parseFloat(formData.get('amount')),
            category: formData.get('category'),
            description: formData.get('description') || '',
            date: formData.get('date')
        };

        // Validate transaction data
        if (validateTransactionData(transactionData, true)) {
            const newTransaction = addTransaction(transactionData);

            if (newTransaction) {
                closeModal();

                if (typeof refreshDashboard === 'function') {
                    refreshDashboard();
                }

                if (typeof loadTransactions === 'function' && typeof applyFilters === 'function') {
                    loadTransactions();
                    applyFilters();
                }

                showNotification('Transaction added successfully!', 'success');
            } else {
                throw new Error('Failed to save transaction');
            }
        }

    } catch (error) {
        console.error('Error adding transaction:', error);
        showNotification('Failed to add transaction. Please try again.', 'error');
    }  finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
 }
}

/**
 * Handle filter form submission
 */
function handleFilterSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const filters = {
        period: formData.get('period'),
        type: formData.get('type'),
        category: formData.get('category')
    };

    // Apply filters (implementation depends on current page)
    applyFilters(filters);

    closeModal();
    showNotification('Filters applied successfully!', 'success');
}

/**
 * Validate transaction data
 */
function validateTransactionData(transaction, showErrors = true) {
    const errors = [];

    if (!transaction.type || !['income', 'expense'].includes(transaction.type)) {
        errors.push('Please select a valid transaction type');
    }

    if (!transaction.amount || isNaN(transaction.amount) || transaction.amount <= 0) {
        errors.push('Please enter a valid amount greater than 0');
    }

    if (!transaction.category) {
        errors.push('Please select a category');
    } else {
        const category = getCategoryById(transaction.category);
        if (!category || category.type !== transaction.type) {
            errors.push('Selected category does not match transaction type');
        }
    }

    if (!transaction.date || !isValidDate(transaction.date)) {
        errors.push('Please select a valid date');
    }

    if (errors.length > 0 && showErrors) {
        showNotification(errors.join('. '), 'error');
        return false;
    }

    return errors.length === 0;
}

function validateTransaction(transaction) {
    return validateTransactionData(transaction, true);
}

/**
 * Apply filters to current view
 */
function applyFilters(filters) {
    // Store current filters
    App.currentFilters = filters;

    // Apply filters based on current page
    if (typeof applyDashboardFilters === 'function') {
        applyDashboardFilters(filters);
    }

    if (typeof applyTransactionFilters === 'function') {
        applyTransactionFilters(filters);
    }
}

/**
 * Populate category dropdowns
 */
function populateCategoryDropdowns() {
    const categorySelects = document.querySelectorAll('select[name="category"], #filter-category');
    const categories = getCategories();

    categorySelects.forEach(select => {
        // Clear existing options (except first)
        const firstOption = select.querySelector('option');
        select.innerHTML = '';
        if (firstOption) {
            select.appendChild(firstOption);
        }

        // Add category options
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
        });
    });
}

/**
 * Show notification to user
 */
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const messageElement = document.getElementById('notification-message');

    if (notification && messageElement) {
        messageElement.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            hideNotification();
        }, 5000);
    } else {
        // Fallback to console if notification element not found
        console.log(`${type.toUpperCase()}: ${message}`);
    }
}

/**
 * Hide notification
 */
function hideNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.style.display = 'none';
    }
}
/**
 * Initialize navigation state
 */
function initializeNavigation() {
    // Set active navigation based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPath.includes(href.replace('./', ''))) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}
/**
 * Handle errors gracefully
 */
window.addEventListener('error', function (e) {
    console.error('Global error:', e.error);
    showNotification('An unexpected error occurred. Please refresh the page.', 'error');
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', function (e) {
    console.error('Unhandled promise rejection:', e.reason);
    showNotification('An error occurred while processing your request.', 'error');
});

// Close notification when clicking the close button
document.addEventListener('click', function (e) {
    if (e.target.id === 'notification-close') {
        hideNotification();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            if (activeModal.id === 'edit-modal' && typeof closeEditModal === 'function') {
                closeEditModal();
            } else {
                closeModal();
            }
        }
    }
    
    if (event.ctrlKey && event.key === 'n' && document.getElementById('transactions-table')) {
        event.preventDefault();
        openAddTransactionModal();
    }
});