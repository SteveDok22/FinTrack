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
}/**
 * Create category card element
 * @param {Object} category - Category object with spending data
 * @returns {HTMLElement} Category card element
 */
function createCategoryCard(category) {
    const card = document.createElement('div');
    card.className = 'category-card';
    
    const budgetProgress = category.budget > 0 ? 
        Math.min(100, (category.spent / category.budget) * 100) : 0;
    
    const progressClass = budgetProgress > 100 ? 'over-budget' : 
                         budgetProgress > 80 ? 'near-budget' : 'within-budget';
    
    card.innerHTML = `
        <div class="category-info">
            <div class="category-icon">${category.icon}</div>
            <div class="category-details">
                <div class="category-name">${category.name}</div>
                ${category.budget > 0 ? 
                    `<div class="category-budget">
                        <div class="budget-progress ${progressClass}">
                            <div class="progress-bar" style="width: ${Math.min(100, budgetProgress)}%"></div>
                        </div>
                        <div class="budget-text">${formatCurrency(category.spent)} / ${formatCurrency(category.budget)}</div>
                    </div>` 
                    : ''
                }
            </div>
        </div>
        <div class="category-amount">${formatCurrency(category.spent)}</div>
    `;
    
    return card;
}

/**
 * Update recent transactions list
 */
function updateRecentTransactionsList() {
    const container = document.getElementById('recent-transactions-list');
    if (!container) return;
    
    try {
        const recentTransactions = getRecentTransactions(5);
        container.innerHTML = '';
        
        if (recentTransactions.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No transactions yet</p>
                    <button class="btn primary" onclick="openAddTransactionModal()">Add Your First Transaction</button>
                </div>
            `;
            return;
        }
        
        recentTransactions.forEach(transaction => {
            const transactionElement = createTransactionElement(transaction);
            container.appendChild(transactionElement);
        });
        
    } catch (error) {
        console.error('Failed to update recent transactions:', error);
    }
}

/**
 * Create transaction element
 * @param {Object} transaction - Transaction object
 * @returns {HTMLElement} Transaction element
 */
function createTransactionElement(transaction) {
    const element = document.createElement('div');
    element.className = `transaction-item ${transaction.type}`;
    
    const category = getCategoryById(transaction.category);
    const categoryName = category ? category.name : 'Unknown';
    const categoryIcon = category ? category.icon : '📋';
    
    const amountClass = transaction.type === 'income' ? 'income' : 'expense';
    const amountPrefix = transaction.type === 'income' ? '+' : '-';
    
    element.innerHTML = `
        <div class="transaction-details">
            <div class="transaction-header">
                <span class="transaction-icon">${categoryIcon}</span>
                <h4>${transaction.description || categoryName}</h4>
            </div>
            <p class="transaction-meta">${categoryName} • ${getRelativeDate(transaction.date)}</p>
        </div>
        <div class="transaction-amount ${amountClass}">
            ${amountPrefix}${formatCurrency(transaction.amount)}
        </div>
    `;
    
    return element;
}

/**
 * Initialize dashboard chart
 */
function initializeDashboardChart() {
    const chartCanvas = document.getElementById('expense-chart');
    if (!chartCanvas) return;
    
    try {
        // Destroy existing chart if it exists
        if (window.dashboardChart && typeof window.dashboardChart.destroy === 'function') {
    window.dashboardChart.destroy();
    window.dashboardChart = null;
}


        if (window.charts && window.charts.dashboard && typeof window.charts.dashboard.destroy === 'function') {
    window.charts.dashboard.destroy();
    window.charts.dashboard = null;
}
        
        const expensesByCategory = calculateExpensesByCategory('month');
        const categories = getCategoriesByType('expense');
        
        // Filter out categories with no spending
        
      const dataWithSpending = [];
      categories.forEach(cat => {
        const amount = expensesByCategory[cat.id] || 0;
          if (amount > 0) {
            dataWithSpending.push({
              label: cat.name,
              value: amount,
              color: cat.color || getCategoryColor(cat.id)
     });
    }
});
        
        if (dataWithSpending.length === 0) {
    const container = chartCanvas.parentElement;
    container.innerHTML = `
        <div class="empty-chart-state">
            <div class="empty-chart-icon">📊</div>
            <p>No expense data to display</p>
            <p>Add some expense transactions to see your spending breakdown</p>
            <button class="btn primary" onclick="openAddTransactionModal()">Add Transaction</button>
        </div>
    `;
    return;
}
        
        // Create pie chart
        const ctx = chartCanvas.getContext('2d');
        window.charts.dashboard = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: dataWithSpending.map(d => d.label),
                datasets: [{
                    data: dataWithSpending.map(d => d.value),
                    backgroundColor: dataWithSpending.map(d => d.color),
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${context.label}: ${formatCurrency(value)} (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });
        
        window.dashboardChart = window.charts.dashboard; 
        console.log('Dashboard chart created successfully');
        
    } catch (error) {
        console.error('Failed to initialize dashboard chart:', error);
    const container = chartCanvas.parentElement;
    container.innerHTML = `
        <div class="empty-chart-state">
            <div class="empty-chart-icon">⚠️</div>
            <p>Chart failed to load</p>
            <button class="btn primary" onclick="openAddTransactionModal()">Add Transaction</button>
            <button class="btn secondary" onclick="location.reload()" style="margin-top: 10px;">Refresh Page</button>
        </div>
    `;}
}


/**
 * Set up dashboard-specific event listeners
 */
function setupDashboardEventListeners() {
    // Transaction form category change - update type automatically
    const typeSelect = document.getElementById('transaction-type');
    const categorySelect = document.getElementById('transaction-category');
    
    if (typeSelect && categorySelect) {
        typeSelect.addEventListener('change', function() {
            updateCategoryOptions(this.value);
        });
    }
    
    // Quick filter buttons (if they exist)
    const quickFilters = document.querySelectorAll('.quick-filter');
    quickFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const period = this.dataset.period;
            applyDashboardFilters({ period });
        });
    });
}

/**
 * Update category options based on transaction type
 * @param {string} transactionType - 'income' or 'expense'
 */
function updateCategoryOptions(transactionType) {
    const categorySelect = document.getElementById('transaction-category');
    if (!categorySelect) return;
    
    const categories = getCategoriesByType(transactionType);
    
    // Clear existing options except first
    const firstOption = categorySelect.querySelector('option');
    categorySelect.innerHTML = '';
    if (firstOption) {
        categorySelect.appendChild(firstOption);
    }
    
    // Add filtered category options
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = `${category.icon} ${category.name}`;
        categorySelect.appendChild(option);
    });
}

/**
 * Apply filters to dashboard data
 * @param {Object} filters - Filter options
 */
function applyDashboardFilters(filters) {
    // Store current filters
    window.dashboardFilters = filters;
    
    // Refresh dashboard with filters
    refreshDashboard();
    
    console.log('Dashboard filters applied:', filters);
}

/**
 * Calculate last month's balance for trend calculation
 * @returns {number} Last month's balance
 */
function calculateLastMonthBalance() {
    try {
        const now = new Date();
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        
        const startDate = lastMonth.toISOString().split('T')[0];
        const endDate = lastMonthEnd.toISOString().split('T')[0];
        
        const transactions = getTransactions();
        const lastMonthTransactions = filterTransactionsByDateRange(transactions, startDate, endDate);
        
        const income = lastMonthTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
            
        const expenses = lastMonthTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
            
        return income - expenses;
        
    } catch (error) {
        console.error('Failed to calculate last month balance:', error);
        return 0;
    }
}

/**
 * Handle window resize for responsive charts
 */
window.addEventListener('resize', debounce(() => {
    if (window.dashboardChart) {
        window.dashboardChart.resize();
    }
}, 250));

setTimeout(() => {
    if (document.getElementById('expense-chart')) {
        initializeDashboardChart();
    }
}, 1000);