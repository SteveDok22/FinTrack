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

/**
 * Initialize all analytics charts
 */
function initializeAnalyticsCharts() {
    setTimeout(() => {
        createIncomeExpensesLineChart('income-expenses-chart', AnalyticsPage.currentPeriod);
        createExpensePieChart('category-pie-chart', AnalyticsPage.currentPeriod);
        createSpendingTrendsChart('spending-trends-chart');
    }, 500);
}

/**
 * Update all analytics charts
 */
function updateAnalyticsCharts() {
    // Destroy existing charts
    Object.keys(AnalyticsPage.charts).forEach(key => {
        if (AnalyticsPage.charts[key]) {
            AnalyticsPage.charts[key].destroy();
            AnalyticsPage.charts[key] = null;
        }
    });

    // Recreate charts with new data
    initializeAnalyticsCharts();
}

/**
 * Generate financial insights
 */
function generateFinancialInsights() {
    const container = document.getElementById('insights-container');
    if (!container) return;

    const insights = calculateFinancialInsights();
    container.innerHTML = '';

    insights.forEach(insight => {
        const insightCard = createInsightCard(insight);
        container.appendChild(insightCard);
    });
}

/**
 * Calculate financial insights
 */
function calculateFinancialInsights() {
    const insights = [];
    const period = AnalyticsPage.currentPeriod;

    // Income vs Expenses insight
    const income = calculateTotalIncome(period);
    const expenses = calculateTotalExpenses(period);
    const balance = income - expenses;

    if (balance > 0) {
        insights.push({
            type: 'positive',
            title: 'Positive Cash Flow',
            message: `You saved ${formatCurrency(balance)} this ${period}. Great job maintaining a positive balance!`,
            icon: '💚'
        });
    } else if (balance < 0) {
        insights.push({
            type: 'warning',
            title: 'Negative Cash Flow',
            message: `You spent ${formatCurrency(Math.abs(balance))} more than you earned this ${period}. Consider reviewing your expenses.`,
            icon: '⚠️'
        });
    }

    // Savings Rate insight
    const savingsRate = income > 0 ? (balance / income) * 100 : 0;
    if (savingsRate >= 20) {
        insights.push({
            type: 'positive',
            title: 'Excellent Savings Rate',
            message: `Your savings rate of ${savingsRate.toFixed(1)}% is excellent! Keep up the good financial habits.`,
            icon: '🎯'
        });
    } else if (savingsRate >= 10) {
        insights.push({
            type: 'neutral',
            title: 'Good Savings Rate',
            message: `Your savings rate of ${savingsRate.toFixed(1)}% is good. Consider increasing it to 20% for optimal financial health.`,
            icon: '📈'
        });
    } else if (income > 0) {
        insights.push({
            type: 'warning',
            title: 'Low Savings Rate',
            message: `Your savings rate of ${savingsRate.toFixed(1)}% could be improved. Try to save at least 10% of your income.`,
            icon: '📊'
        });
    }

    // Top spending category insight
    const expensesByCategory = calculateExpensesByCategory(period);
    const topCategory = findTopSpendingCategory(expensesByCategory);

    if (topCategory && expenses > 0) {
        const percentage = (topCategory.amount / expenses) * 100;
        if (percentage > 40) {
            insights.push({
                type: 'warning',
                title: 'High Category Spending',
                message: `${topCategory.name} accounts for ${percentage.toFixed(1)}% of your spending. Consider if this allocation aligns with your goals.`,
                icon: '🏷️'
            });
        }
    }

    // Budget performance insight
    const budgetInsight = analyzeBudgetPerformance();
    if (budgetInsight) {
        insights.push(budgetInsight);
    }

    return insights;
}

/**
 * Analyze budget performance
 */
function analyzeBudgetPerformance() {
    const expensesByCategory = calculateExpensesByCategory('month');
    const settings = getSettings();
    const categories = getCategoriesByType('expense');

    let overBudgetCategories = 0;
    let totalBudgetVariance = 0;

    categories.forEach(category => {
        const budget = settings.budgets[category.id] || 0;
        const spent = expensesByCategory[category.id] || 0;

        if (budget > 0 && spent > budget) {
            overBudgetCategories++;
            totalBudgetVariance += (spent - budget);
        }
    });

    if (overBudgetCategories > 0) {
        return {
            type: 'warning',
            title: 'Budget Overruns',
            message: `You're over budget in ${overBudgetCategories} categories, exceeding by ${formatCurrency(totalBudgetVariance)} total.`,
            icon: '📋'
        };
    } else if (Object.keys(settings.budgets).length > 0) {
        return {
            type: 'positive',
            title: 'Budget On Track',
            message: 'You\'re staying within your budgets across all categories. Excellent discipline!',
            icon: '✅'
        };
    }

    return null;
}

/**
 * Create insight card element
 */
function createInsightCard(insight) {
    const card = document.createElement('div');
    card.className = `insight-card ${insight.type}`;

    card.innerHTML = `
        <div class="insight-icon">${insight.icon}</div>
        <div class="insight-content">
            <h3 class="insight-title">${insight.title}</h3>
            <p class="insight-message">${insight.message}</p>
        </div>
    `;

    return card;
}

/**
 * Update budget performance display
 */
function updateBudgetPerformance() {
    const container = document.getElementById('budget-performance-container');
    if (!container) return;
    
    const expensesByCategory = calculateExpensesByCategory('month');
    const settings = getSettings();
    const categories = getCategoriesByType('expense');
    
    container.innerHTML = '';
    
    // Filter categories with budgets
    const budgetCategories = categories.filter(cat => settings.budgets[cat.id] > 0);
    
    if (budgetCategories.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>No budgets set</p>
                <a href="settings.html" class="btn primary">Set Up Budgets</a>
            </div>
        `;
        return;
    }
    
    budgetCategories.forEach(category => {
        const budget = settings.budgets[category.id];
        const spent = expensesByCategory[category.id] || 0;
        const percentage = Math.min((spent / budget) * 100, 100);
        const isOverBudget = spent > budget;
        
        const budgetBar = document.createElement('div');
        budgetBar.className = 'budget-bar';
        
        budgetBar.innerHTML = `
            <div class="budget-header">
                <div class="budget-category">
                    <span class="category-icon">${category.icon}</span>
                    <span class="category-name">${category.name}</span>
                </div>
                <div class="budget-amounts">
                    <span class="spent-amount ${isOverBudget ? 'over-budget' : ''}">${formatCurrency(spent)}</span>
                    <span class="budget-separator">/</span>
                    <span class="budget-amount">${formatCurrency(budget)}</span>
                </div>
            </div>
            <div class="budget-progress">
                <div class="progress-track">
                    <div class="progress-fill ${isOverBudget ? 'over-budget' : ''}" 
                         style="width: ${percentage}%"></div>
                </div>
                <div class="budget-percentage">${percentage.toFixed(1)}%</div>
            </div>
            ${isOverBudget ? `<div class="over-budget-warning">Over budget by ${formatCurrency(spent - budget)}</div>` : ''}
        `;
        
        container.appendChild(budgetBar);
    });
}
