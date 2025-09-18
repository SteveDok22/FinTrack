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