/**
 * Personal Finance Dashboard - Utility Functions
 * Helper functions for formatting, validation, and common operations
 */

/**
 * Format currency amount
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency symbol (default: $)
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, currency = '$') {
    if (isNaN(amount)) return `${currency}0.00`;
    
    return `${currency}${Math.abs(amount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type ('short', 'medium', 'long')
 * @returns {string} Formatted date string
 */
function formatDate(date, format = 'medium') {
    const dateObj = new Date(date);
    
    if (isNaN(dateObj.getTime())) {
        return 'Invalid Date';
    }
    
    const options = {
        short: { month: 'short', day: 'numeric' },
        medium: { month: 'short', day: 'numeric', year: 'numeric' },
        long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
    };
    
    return dateObj.toLocaleDateString('en-US', options[format] || options.medium);
}

/**
 * Get relative date (Today, Yesterday, etc.)
 * @param {string|Date} date - Date to check
 * @returns {string} Relative date string
 */
function getRelativeDate(date) {
    const dateObj = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Set time to midnight for comparison
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    dateObj.setHours(0, 0, 0, 0);
    
    if (dateObj.getTime() === today.getTime()) {
        return 'Today';
    } else if (dateObj.getTime() === yesterday.getTime()) {
        return 'Yesterday';
    } else {
        return formatDate(date, 'short');
    }
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate amount (positive number)
 * @param {string|number} amount - Amount to validate
 * @returns {boolean} True if valid amount
 */
function isValidAmount(amount) {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0 && num < 1000000; // Max 1M
}

/**
 * Validate date string
 * @param {string} dateStr - Date string to validate
 * @returns {boolean} True if valid date
 */
function isValidDate(dateStr) {
    const date = new Date(dateStr);
    return !isNaN(date.getTime()) && dateStr.match(/^\d{4}-\d{2}-\d{2}$/);
}

/**
 * Generate unique ID
 * @returns {string} Unique identifier
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Truncate string with ellipsis
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated string
 */
function truncateString(str, maxLength = 50) {
    if (!str) return '';
    return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
}

/**
 * Calculate percentage
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @returns {number} Percentage (rounded to 1 decimal)
 */
function calculatePercentage(value, total) {
    if (total === 0) return 0;
    return Math.round((value / total) * 100 * 10) / 10;
}

/**
 * Get current month date range
 * @returns {object} Object with start and end dates
 */
function getCurrentMonthRange() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    return {
        start: new Date(year, month, 1).toISOString().split('T')[0],
        end: new Date(year, month + 1, 0).toISOString().split('T')[0]
    };
}

/**
 * Get date range based on period
 * @param {string} period - Period type ('today', 'week', 'month', 'quarter', 'year')
 * @returns {object} Object with start and end dates
 */
function getDateRange(period) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (period) {
        case 'today':
            return {
                start: today.toISOString().split('T')[0],
                end: today.toISOString().split('T')[0]
            };
            
        case 'week':
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            return {
                start: weekStart.toISOString().split('T')[0],
                end: weekEnd.toISOString().split('T')[0]
            };
            
        case 'month':
            return getCurrentMonthRange();
            
        case 'quarter':
            const quarter = Math.floor(now.getMonth() / 3);
            const quarterStart = new Date(now.getFullYear(), quarter * 3, 1);
            const quarterEnd = new Date(now.getFullYear(), quarter * 3 + 3, 0);
            return {
                start: quarterStart.toISOString().split('T')[0],
                end: quarterEnd.toISOString().split('T')[0]
            };
            
        case 'year':
            return {
                start: new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0],
                end: new Date(now.getFullYear(), 11, 31).toISOString().split('T')[0]
            };
            
        default:
            return getCurrentMonthRange();
    }
}

/**
 * Debounce function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Format number with thousand separators
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
    if (isNaN(num)) return '0';
    return num.toLocaleString('en-US');
}

/**
 * Get category icon by category ID
 * @param {string} categoryId - Category identifier
 * @returns {string} Category icon emoji
 */
function getCategoryIcon(categoryId) {
    const icons = {
        food: '🍕',
        transport: '🚗',
        entertainment: '🎬',
        shopping: '🛒',
        utilities: '💡',
        healthcare: '🏥',
        education: '📚',
        salary: '💰',
        freelance: '💻',
        investment: '📈',
        other: '📋'
    };
    
    return icons[categoryId] || icons.other;
}

/**
 * Get category color by category ID
 * @param {string} categoryId - Category identifier
 * @returns {string} Category color hex code
 */
function getCategoryColor(categoryId) {
    const colors = {
        food: '#FF6B6B',
        transport: '#4ECDC4',
        entertainment: '#45B7D1',
        shopping: '#96CEB4',
        utilities: '#FECA57',
        healthcare: '#FF9FF3',
        education: '#54A0FF',
        salary: '#5F27CD',
        freelance: '#00D2D3',
        investment: '#FF9F43',
        other: '#ADADAD'
    };
    
    return colors[categoryId] || colors.other;
}

/**
 * Sort array by property
 * @param {Array} array - Array to sort
 * @param {string} property - Property to sort by
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted array
 */
function sortBy(array, property, order = 'asc') {
    return array.sort((a, b) => {
        let aVal = a[property];
        let bVal = b[property];
        
        // Handle dates
        if (property === 'date') {
            aVal = new Date(aVal);
            bVal = new Date(bVal);
        }
        
        if (order === 'desc') {
            return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
        } else {
            return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        }
    });
}

/**
 * Filter transactions by date range
 * @param {Array} transactions - Array of transactions
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @returns {Array} Filtered transactions
 */
function filterTransactionsByDateRange(transactions, startDate, endDate) {
    return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        return transactionDate >= start && transactionDate <= end;
    });
}

/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string} Today's date
 */
function getTodayString() {
    return new Date().toISOString().split('T')[0];
}

/**
 * Check if two dates are in the same month
 * @param {string|Date} date1 - First date
 * @param {string|Date} date2 - Second date
 * @returns {boolean} True if same month and year
 */
function isSameMonth(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
}