/**
 * Personal Finance Dashboard - Dashboard Page Logic
 * Functions for displaying and managing dashboard data
 */

/**
 * Initialize dashboard when page loads
 */
function initializeDashboard() {
    try {
        // Load and display dashboard data
        refreshDashboard();
        
        // Set up dashboard-specific event listeners
        setupDashboardEventListeners();
        
        console.log('Dashboard initialized successfully');
        
    } catch (error) {
        console.error('Failed to initialize dashboard:', error);
        showNotification('Failed to load dashboard data', 'error');
    }
}

/**
 * Refresh all dashboard data and displays
 */
function refreshDashboard() {
    updateBalanceCard();
    updateStatsCards();
    updateCategoriesDisplay();
    updateRecentTransactionsList();
    initializeDashboardChart();
}

/**
 * Update balance card with current financial data
 */
function updateBalanceCard() {
    const balanceElement = document.getElementById('current-balance');
    const trendElement = document.getElementById('balance-trend');
    
    if (!balanceElement) return;
    
    try {
        // Calculate current month balance
        const currentBalance = calculateBalance('month');
        const lastMonthBalance = calculateLastMonthBalance();
        
        // Update balance display
        balanceElement.textContent = formatCurrency(currentBalance);
        
        // Calculate and display trend
        if (trendElement && lastMonthBalance !== 0) {
            const trendPercentage = calculatePercentage(
                currentBalance - lastMonthBalance, 
                Math.abs(lastMonthBalance)
            );
            
            const isPositive = currentBalance >= lastMonthBalance;
            trendElement.textContent = `${isPositive ? '+' : ''}${trendPercentage}%`;
            trendElement.className = `trend-indicator ${isPositive ? 'positive' : 'negative'}`;
        }
        
    } catch (error) {
        console.error('Failed to update balance card:', error);
        balanceElement.textContent = formatCurrency(0);
    }
}

/**
 * Update statistics cards (income, expenses, savings rate)
 */
function updateStatsCards() {
    const incomeElement = document.getElementById('total-income');
    const expensesElement = document.getElementById('total-expenses');
    const savingsRateElement = document.getElementById('savings-rate');
    
    try {
        const income = calculateTotalIncome('month');
        const expenses = calculateTotalExpenses('month');
        const savingsRate = income > 0 ? calculatePercentage(income - expenses, income) : 0;
        
        if (incomeElement) {
            incomeElement.textContent = formatCurrency(income);
        }
        
        if (expensesElement) {
            expensesElement.textContent = formatCurrency(expenses);
        }
        
        if (savingsRateElement) {
            savingsRateElement.textContent = `${Math.max(0, savingsRate)}%`;
        }
        
    } catch (error) {
        console.error('Failed to update stats cards:', error);
    }
}

/**
 * Update categories display with spending breakdown
 */
function updateCategoriesDisplay() {
    const container = document.getElementById('categories-container');
    if (!container) return;
    
    try {
        const expensesByCategory = calculateExpensesByCategory('month');
        const categories = getCategoriesByType('expense');
        const settings = getSettings();
        
        container.innerHTML = '';
        
        // Sort categories by spending amount (highest first)
        const sortedCategories = categories
            .map(category => ({
                ...category,
                spent: expensesByCategory[category.id] || 0,
                budget: settings.budgets[category.id] || 0
            }))
            .sort((a, b) => b.spent - a.spent);
        
        sortedCategories.forEach(category => {
            const categoryCard = createCategoryCard(category);
            container.appendChild(categoryCard);
        });
        
    } catch (error) {
        console.error('Failed to update categories display:', error);
    }
}