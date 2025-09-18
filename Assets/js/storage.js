/**
 * Personal Finance Dashboard - Data Storage Management
 * LocalStorage operations and default data
 */

// Storage Keys
const STORAGE_KEYS = {
    TRANSACTIONS: 'financeApp_transactions',
    CATEGORIES: 'financeApp_categories',
    SETTINGS: 'financeApp_settings',
    APP_VERSION: 'financeApp_version'
};

// Default Categories
const DEFAULT_CATEGORIES = [
    { id: 'salary', name: 'Salary', type: 'income', icon: '💰', color: '#10b981' },
    { id: 'freelance', name: 'Freelance', type: 'income', icon: '💻', color: '#06b6d4' },
    { id: 'investment', name: 'Investment', type: 'income', icon: '📈', color: '#8b5cf6' },
    
    { id: 'food', name: 'Food & Dining', type: 'expense', icon: '🍕', color: '#ef4444' },
    { id: 'transport', name: 'Transportation', type: 'expense', icon: '🚗', color: '#f97316' },
    { id: 'entertainment', name: 'Entertainment', type: 'expense', icon: '🎬', color: '#ec4899' },
    { id: 'shopping', name: 'Shopping', type: 'expense', icon: '🛒', color: '#a855f7' },
    { id: 'utilities', name: 'Bills & Utilities', type: 'expense', icon: '💡', color: '#eab308' },
    { id: 'healthcare', name: 'Healthcare', type: 'expense', icon: '🏥', color: '#22c55e' },
    { id: 'education', name: 'Education', type: 'expense', icon: '📚', color: '#3b82f6' }
];

// Default Settings
const DEFAULT_SETTINGS = {
    currency: '$',
    theme: 'light',
    dashboardPeriod: 'month',
    budgets: {
        food: 500,
        transport: 300,
        entertainment: 200,
        shopping: 400,
        utilities: 250,
        healthcare: 150,
        education: 100
    }
};

// Sample Transactions (for demo purposes)
const SAMPLE_TRANSACTIONS = [
    {
        id: 'tx_001',
        type: 'income',
        amount: 3200.00,
        category: 'salary',
        description: 'Monthly Salary',
        date: '2024-09-01'
    },
    {
        id: 'tx_002',
        type: 'expense',
        amount: 85.50,
        category: 'food',
        description: 'Grocery Shopping',
        date: '2024-09-15'
    },
    {
        id: 'tx_003',
        type: 'expense',
        amount: 45.20,
        category: 'transport',
        description: 'Gas Station',
        date: '2024-09-16'
    },
    {
        id: 'tx_004',
        type: 'expense',
        amount: 25.99,
        category: 'entertainment',
        description: 'Netflix Subscription',
        date: '2024-09-14'
    },
    {
        id: 'tx_005',
        type: 'expense',
        amount: 5.45,
        category: 'food',
        description: 'Coffee Shop',
        date: getTodayString()
    },
    {
        id: 'tx_006',
        type: 'income',
        amount: 450.00,
        category: 'freelance',
        description: 'Web Development Project',
        date: '2024-09-12'
    }
];

/**
 * Initialize storage with default data if needed
 */
function initializeStorage() {
    try {
        // Initialize categories if not exists
        if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
            saveCategories(DEFAULT_CATEGORIES);
        }
        
        // Initialize settings if not exists
        if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
            saveSettings(DEFAULT_SETTINGS);
        }
        
        // Initialize with sample transactions if empty (for demo)
        const existingTransactions = getTransactions();
        if (existingTransactions.length === 0) {
            saveTransactions(SAMPLE_TRANSACTIONS);
        }
        
        // Set app version
        localStorage.setItem(STORAGE_KEYS.APP_VERSION, '1.0.0');
        
        console.log('Storage initialized successfully');
        
    } catch (error) {
        console.error('Failed to initialize storage:', error);
        throw new Error('Storage initialization failed');
    }
}

/**
 * Get all transactions from storage
 * @returns {Array} Array of transaction objects
 */
function getTransactions() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Failed to get transactions:', error);
        return [];
    }
}

/**
 * Save transactions to storage
 * @param {Array} transactions - Array of transaction objects
 */
function saveTransactions(transactions) {
    try {
        localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (error) {
        console.error('Failed to save transactions:', error);
        throw new Error('Failed to save transactions');
    }
}

/**
 * Add new transaction
 * @param {Object} transactionData - Transaction object
 * @returns {Object} Added transaction with ID
 */
function addTransaction(transactionData) {
    try {
        const transactions = getTransactions();
        const newTransaction = {
            id: generateId(),
            ...transactionData,
            createdAt: new Date().toISOString()
        };
        
        transactions.push(newTransaction);
        saveTransactions(transactions);
        
        return newTransaction;
    } catch (error) {
        console.error('Failed to add transaction:', error);
        throw new Error('Failed to add transaction');
    }
}

/**
 * Update existing transaction
 * @param {string} id - Transaction ID
 * @param {Object} updates - Updated transaction data
 * @returns {Object|null} Updated transaction or null if not found
 */
function updateTransaction(id, updates) {
    try {
        const transactions = getTransactions();
        const index = transactions.findIndex(t => t.id === id);
        
        if (index === -1) {
            return null;
        }
        
        transactions[index] = { ...transactions[index], ...updates };
        saveTransactions(transactions);
        
        return transactions[index];
    } catch (error) {
        console.error('Failed to update transaction:', error);
        throw new Error('Failed to update transaction');
    }
}

/**
 * Delete transaction
 * @param {string} id - Transaction ID
 * @returns {boolean} True if deleted, false if not found
 */
function deleteTransaction(id) {
    try {
        const transactions = getTransactions();
        const filteredTransactions = transactions.filter(t => t.id !== id);
        
        if (filteredTransactions.length === transactions.length) {
            return false; // Transaction not found
        }
        
        saveTransactions(filteredTransactions);
        return true;
    } catch (error) {
        console.error('Failed to delete transaction:', error);
        throw new Error('Failed to delete transaction');
    }
}

/**
 * Get transactions by type
 * @param {string} type - Transaction type ('income' or 'expense')
 * @returns {Array} Filtered transactions
 */
function getTransactionsByType(type) {
    const transactions = getTransactions();
    return transactions.filter(t => t.type === type);
}

/**
 * Get transactions by category
 * @param {string} categoryId - Category ID
 * @returns {Array} Filtered transactions
 */
function getTransactionsByCategory(categoryId) {
    const transactions = getTransactions();
    return transactions.filter(t => t.category === categoryId);
}

/**
 * Get transactions for current month
 * @returns {Array} Current month transactions
 */
function getCurrentMonthTransactions() {
    const transactions = getTransactions();
    const { start, end } = getCurrentMonthRange();
    
    return filterTransactionsByDateRange(transactions, start, end);
}

/**
 * Get categories from storage
 * @returns {Array} Array of category objects
 */
function getCategories() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
        return data ? JSON.parse(data) : DEFAULT_CATEGORIES;
    } catch (error) {
        console.error('Failed to get categories:', error);
        return DEFAULT_CATEGORIES;
    }
}

/**
 * Save categories to storage
 * @param {Array} categories - Array of category objects
 */
function saveCategories(categories) {
    try {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (error) {
        console.error('Failed to save categories:', error);
        throw new Error('Failed to save categories');
    }
}

/**
 * Get categories by type
 * @param {string} type - Category type ('income' or 'expense')
 * @returns {Array} Filtered categories
 */
function getCategoriesByType(type) {
    const categories = getCategories();
    return categories.filter(c => c.type === type);
}

/**
 * Get category by ID
 * @param {string} id - Category ID
 * @returns {Object|null} Category object or null if not found
 */
function getCategoryById(id) {
    const categories = getCategories();
    return categories.find(c => c.id === id) || null;
}

/**
 * Get settings from storage
 * @returns {Object} Settings object
 */
function getSettings() {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch (error) {
        console.error('Failed to get settings:', error);
        return DEFAULT_SETTINGS;
    }
}

/**
 * Save settings to storage
 * @param {Object} settings - Settings object
 */
function saveSettings(settings) {
    try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
        console.error('Failed to save settings:', error);
        throw new Error('Failed to save settings');
    }
}

/**
 * Get budget for category
 * @param {string} categoryId - Category ID
 * @returns {number} Budget amount
 */
function getBudget(categoryId) {
    const settings = getSettings();
    return settings.budgets[categoryId] || 0;
}

/**
 * Set budget for category
 * @param {string} categoryId - Category ID
 * @param {number} amount - Budget amount
 */
function setBudget(categoryId, amount) {
    const settings = getSettings();
    settings.budgets[categoryId] = amount;
    saveSettings(settings);
}

/**
 * Calculate total income for period
 * @param {string} period - Time period ('month', 'week', 'year', etc.)
 * @returns {number} Total income
 */
function calculateTotalIncome(period = 'month') {
    const { start, end } = getDateRange(period);
    const transactions = getTransactions();
    const incomeTransactions = filterTransactionsByDateRange(transactions, start, end)
        .filter(t => t.type === 'income');
    
    return incomeTransactions.reduce((total, t) => total + t.amount, 0);
}

/**
 * Calculate total expenses for period
 * @param {string} period - Time period ('month', 'week', 'year', etc.)
 * @returns {number} Total expenses
 */
function calculateTotalExpenses(period = 'month') {
    const { start, end } = getDateRange(period);
    const transactions = getTransactions();
    const expenseTransactions = filterTransactionsByDateRange(transactions, start, end)
        .filter(t => t.type === 'expense');
    
    return expenseTransactions.reduce((total, t) => total + t.amount, 0);
}

/**
 * Calculate balance for period
 * @param {string} period - Time period ('month', 'week', 'year', etc.)
 * @returns {number} Balance (income - expenses)
 */
function calculateBalance(period = 'month') {
    const income = calculateTotalIncome(period);
    const expenses = calculateTotalExpenses(period);
    return income - expenses;
}

/**
 * Calculate expenses by category for period
 * @param {string} period - Time period ('month', 'week', 'year', etc.)
 * @returns {Object} Object with category totals
 */
function calculateExpensesByCategory(period = 'month') {
    const { start, end } = getDateRange(period);
    const transactions = getTransactions();
    const expenses = filterTransactionsByDateRange(transactions, start, end)
        .filter(t => t.type === 'expense');
    
    const categoryTotals = {};
    const categories = getCategories();
    
    // Initialize all expense categories with 0
    categories.filter(c => c.type === 'expense').forEach(cat => {
        categoryTotals[cat.id] = 0;
    });
    
    // Sum expenses by category
    expenses.forEach(transaction => {
        if (categoryTotals.hasOwnProperty(transaction.category)) {
            categoryTotals[transaction.category] += transaction.amount;
        }
    });
    
    return categoryTotals;
}

/**
 * Get recent transactions
 * @param {number} limit - Number of transactions to return
 * @returns {Array} Recent transactions
 */
function getRecentTransactions(limit = 5) {
    const transactions = getTransactions();
    return sortBy(transactions, 'date', 'desc')
        .slice(0, limit);
}

/**
 * Clear all data (for reset functionality)
 */
function clearAllData() {
    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        console.log('All data cleared successfully');
    } catch (error) {
        console.error('Failed to clear data:', error);
        throw new Error('Failed to clear data');
    }
}

/**
 * Export data as JSON
 * @returns {string} JSON string of all data
 */
function exportData() {
    try {
        const data = {
            transactions: getTransactions(),
            categories: getCategories(),
            settings: getSettings(),
            exportDate: new Date().toISOString()
        };
        
        return JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Failed to export data:', error);
        throw new Error('Failed to export data');
    }
}

/**
 * Import data from JSON
 * @param {string} jsonData - JSON string containing data
 * @returns {boolean} Success status
 */
function importData(jsonData) {
    try {
        const data = JSON.parse(jsonData);
        
        if (data.transactions) {
            saveTransactions(data.transactions);
        }
        
        if (data.categories) {
            saveCategories(data.categories);
        }
        
        if (data.settings) {
            saveSettings(data.settings);
        }
        
        console.log('Data imported successfully');
        return true;
    } catch (error) {
        console.error('Failed to import data:', error);
        return false;
    }
}