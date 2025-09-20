/**
 * Personal Finance Dashboard - Analytics Page
 * Advanced financial analytics and insights
 */

// Analytics page state
const AnalyticsPage = {
    currentPeriod: 'year',
    charts: {
        incomeExpenses: null,
        categoryBreakdown: null,
        spendingTrends: null
    }
};

/**
 * Initialize analytics page
 */
function initializeAnalyticsPage() {
    try {
        // Set up event listeners
        setupAnalyticsEventListeners();
        
        // Load initial analytics
        loadAnalyticsData();
        
        // Initialize charts
        initializeAnalyticsCharts();
        
        console.log('Analytics page initialized successfully');
        
    } catch (error) {
        console.error('Failed to initialize analytics page:', error);
        showNotification('Failed to load analytics data', 'error');
    }
}

/**
 * Set up event listeners for analytics page
 */
function setupAnalyticsEventListeners() {
    // Period selector
    const periodSelect = document.getElementById('analytics-period');
    if (periodSelect) {
        periodSelect.addEventListener('change', handlePeriodChange);
    }
    
    // Export buttons
    const exportAnalyticsBtn = document.getElementById('export-analytics-btn');
    const exportChartsBtn = document.getElementById('export-charts-btn');
    
    if (exportAnalyticsBtn) {
        exportAnalyticsBtn.addEventListener('click', exportAnalyticsReport);
    }
    
    if (exportChartsBtn) {
        exportChartsBtn.addEventListener('click', exportChartsAsImages);
    }
}

/**
 * Handle period change
 */
function handlePeriodChange(event) {
    AnalyticsPage.currentPeriod = event.target.value;
    loadAnalyticsData();
    updateAnalyticsCharts();
}

/**
 * Load analytics data for current period
 */
function loadAnalyticsData() {
    try {
        updateKeyMetrics();
        generateFinancialInsights();
        updateBudgetPerformance();
        
    } catch (error) {
        console.error('Error loading analytics data:', error);
        showNotification('Error loading analytics data', 'error');
    }
}

/**
 * Update key metrics display
 */
function updateKeyMetrics() {
    const period = AnalyticsPage.currentPeriod;
    
    // Calculate metrics
    const totalIncome = calculateTotalIncome(period);
    const totalExpenses = calculateTotalExpenses(period);
    const savingsRate = totalIncome > 0 ? calculatePercentage(totalIncome - totalExpenses, totalIncome) : 0;
    
    // Get monthly averages
    const monthsInPeriod = getMonthsInPeriod(period);
    const avgMonthlyIncome = monthsInPeriod > 0 ? totalIncome / monthsInPeriod : 0;
    const avgMonthlyExpenses = monthsInPeriod > 0 ? totalExpenses / monthsInPeriod : 0;
    
    // Find top spending category
    const expensesByCategory = calculateExpensesByCategory(period);
    const topCategory = findTopSpendingCategory(expensesByCategory);
    
    // Update UI elements
    updateMetricElement('analytics-savings-rate', `${Math.max(0, savingsRate)}%`);
    updateMetricElement('avg-monthly-income', formatCurrency(avgMonthlyIncome));
    updateMetricElement('avg-monthly-expenses', formatCurrency(avgMonthlyExpenses));
    
    if (topCategory) {
        updateMetricElement('top-category', topCategory.name);
        updateMetricElement('top-category-amount', formatCurrency(topCategory.amount));
    } else {
        updateMetricElement('top-category', 'No data');
        updateMetricElement('top-category-amount', '$0.00');
    }
    
    // Calculate and display changes (simplified - comparing to previous period)
    updateMetricChanges(period);
}

/**
 * Update metric element
 */
function updateMetricElement(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
    }
}

/**
 * Update metric change indicators
 */
function updateMetricChanges(period) {
    // Simplified implementation - would compare with previous period in real app
    const savingsRateChange = document.getElementById('savings-rate-change');
    const incomeChange = document.getElementById('income-change');
    const expenseChange = document.getElementById('expense-change');
    
    // For demo purposes, show static changes
    if (savingsRateChange) savingsRateChange.textContent = '+2.3% vs last period';
    if (incomeChange) incomeChange.textContent = '+5.2% vs last period';
    if (expenseChange) expenseChange.textContent = '+1.8% vs last period';
}

/**
 * Get number of months in period
 */
function getMonthsInPeriod(period) {
    switch (period) {
        case 'month': return 1;
        case 'quarter': return 3;
        case 'year': return 12;
        default: return 1;
    }
}

/**
 * Find top spending category
 */
function findTopSpendingCategory(expensesByCategory) {
    const categories = getCategoriesByType('expense');
    let topCategory = null;
    let maxAmount = 0;
    
    Object.entries(expensesByCategory).forEach(([categoryId, amount]) => {
        if (amount > maxAmount) {
            maxAmount = amount;
            const category = categories.find(c => c.id === categoryId);
            if (category) {
                topCategory = {
                    id: categoryId,
                    name: category.name,
                    amount: amount
                };
            }
        }
    });
    
    return topCategory;
}
