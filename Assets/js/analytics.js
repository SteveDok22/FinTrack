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