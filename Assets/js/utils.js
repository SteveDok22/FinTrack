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
