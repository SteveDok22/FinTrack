/**
 * Personal Finance Dashboard - Charts Integration
 * Chart.js configuration and data visualization functions
 */

// Global chart instances
window.charts = {
    dashboard: null,
    analytics: null
};

// Chart color palette (matching design system)
const CHART_COLORS = {
    primary: '#00FF7F',
    secondary: '#006B3F',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    gray: '#6b7280',
    light: '#E8F5E8'
};

// Default chart options
const DEFAULT_CHART_OPTIONS = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                padding: 20,
                usePointStyle: true,
                font: {
                    size: 12,
                    family: 'Inter, system-ui, sans-serif'
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: CHART_COLORS.primary,
            borderWidth: 1,
            cornerRadius: 8,
            caretPadding: 10
        }
    },
    animation: {
        duration: 1000,
        easing: 'easeOutQuart'
    }
};

/**
 * Create expense breakdown pie chart
 * @param {string} canvasId - Canvas element ID
 * @param {string} period - Time period for data
 * @returns {Chart} Chart.js instance
 */
function createExpensePieChart(canvasId, period = 'month') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    try {
        // Get expense data by category
        const expensesByCategory = calculateExpensesByCategory(period);
        const categories = getCategoriesByType('expense');
        
        // Filter categories with expenses
        const dataWithExpenses = categories
            .filter(cat => expensesByCategory[cat.id] > 0)
            .map(cat => ({
                label: cat.name,
                value: expensesByCategory[cat.id],
                color: cat.color || getCategoryColor(cat.id)
            }))
            .sort((a, b) => b.value - a.value);

        if (dataWithExpenses.length === 0) {
            return createEmptyChart(canvas, 'No expense data available');
        }

        // Destroy existing chart
        if (window.charts.dashboard) {
            window.charts.dashboard.destroy();
        }

        const ctx = canvas.getContext('2d');
        window.charts.dashboard = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: dataWithExpenses.map(d => d.label),
                datasets: [{
                    data: dataWithExpenses.map(d => d.value),
                    backgroundColor: dataWithExpenses.map(d => d.color),
                    borderColor: '#ffffff',
                    borderWidth: 3
                }]
            },
            options: {
                ...DEFAULT_CHART_OPTIONS,
                cutout: '65%',
                plugins: {
                    ...DEFAULT_CHART_OPTIONS.plugins,
                    tooltip: {
                        ...DEFAULT_CHART_OPTIONS.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${context.label}: ${formatCurrency(value)} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });

        return window.charts.dashboard;

    } catch (error) {
        console.error('Error creating expense pie chart:', error);
        return createEmptyChart(canvas, 'Failed to load chart data');
    }
} 

/**
 * Create income vs expenses line chart
 * @param {string} canvasId - Canvas element ID
 * @param {string} period - Time period for data
 * @returns {Chart} Chart.js instance
 */
function createIncomeExpensesLineChart(canvasId, period = 'year') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    try {
        // Get monthly data for the current year
        const monthlyData = getMonthlyIncomeExpenseData();
        
        if (monthlyData.length === 0) {
            return createEmptyChart(canvas, 'No transaction data available');
        }

        // Destroy existing chart
        if (window.charts.analytics) {
            window.charts.analytics.destroy();
        }

        const ctx = canvas.getContext('2d');
        window.charts.analytics = new Chart(ctx, {
            type: 'line',
            data: {
                labels: monthlyData.map(d => d.month),
                datasets: [
                    {
                        label: 'Income',
                        data: monthlyData.map(d => d.income),
                        borderColor: CHART_COLORS.success,
                        backgroundColor: CHART_COLORS.success + '20',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointBackgroundColor: CHART_COLORS.success,
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Expenses',
                        data: monthlyData.map(d => d.expenses),
                        borderColor: CHART_COLORS.error,
                        backgroundColor: CHART_COLORS.error + '20',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointBackgroundColor: CHART_COLORS.error,
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2
                    }
                ]
            },
            options: {
                ...DEFAULT_CHART_OPTIONS,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return formatCurrency(value);
                            },
                            color: CHART_COLORS.gray,
                            font: {
                                family: 'Inter, system-ui, sans-serif'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: CHART_COLORS.gray,
                            font: {
                                family: 'Inter, system-ui, sans-serif'
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                plugins: {
                    ...DEFAULT_CHART_OPTIONS.plugins,
                    tooltip: {
                        ...DEFAULT_CHART_OPTIONS.plugins.tooltip,
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
                            }
                        }
                    }
                }
            }
        });

        return window.charts.analytics;

    } catch (error) {
        console.error('Error creating income/expenses line chart:', error);
        return createEmptyChart(canvas, 'Failed to load chart data');
    }
}

/**
 * Create spending trends bar chart
 * @param {string} canvasId - Canvas element ID
 * @returns {Chart} Chart.js instance
 */
function createSpendingTrendsChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    try {
        // Get last 6 months spending data
        const trendData = getSpendingTrendsData();
        
        if (trendData.length === 0) {
            return createEmptyChart(canvas, 'No spending data available');
        }

        const ctx = canvas.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: trendData.map(d => d.month),
                datasets: [{
                    label: 'Total Spending',
                    data: trendData.map(d => d.spending),
                    backgroundColor: CHART_COLORS.primary + '80',
                    borderColor: CHART_COLORS.primary,
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                ...DEFAULT_CHART_OPTIONS,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return formatCurrency(value);
                            },
                            color: CHART_COLORS.gray
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: CHART_COLORS.gray
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    ...DEFAULT_CHART_OPTIONS.plugins,
                    tooltip: {
                        ...DEFAULT_CHART_OPTIONS.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `Spending: ${formatCurrency(context.parsed.y)}`;
                            }
                        }
                    }
                }
            }
        });

        return chart;

    } catch (error) {
        console.error('Error creating spending trends chart:', error);
        return createEmptyChart(canvas, 'Failed to load chart data');
    }
}

/**
 * Create empty chart placeholder
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @param {string} message - Message to display
 */
function createEmptyChart(canvas, message) {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.style.display = 'none';
    
     const container = canvas.parentElement;
    container.innerHTML = `
        <div class="empty-chart-state">
            <div class="empty-chart-icon">📊</div>
            <p>${message}</p>
            <button class="btn primary" onclick="openAddTransactionModal()">Add Transaction</button>
        </div>
    `;
}

/**
 * Get monthly income and expense data
 * @returns {Array} Monthly data array
 */

function getMonthlyIncomeExpenseData() {
    const transactions = getTransactions();
    const currentYear = new Date().getFullYear();
    const monthlyData = [];
    
    // Initialize 12 months
    for (let month = 0; month < 12; month++) {
        const monthName = new Date(currentYear, month, 1)
            .toLocaleDateString('en-US', { month: 'short' });

            monthlyData.push({
            month: monthName,
            income: 0,
            expenses: 0
        });
    }

     // Aggregate transactions by month
    transactions.forEach(transaction => {
        const date = new Date(transaction.date);
        if (date.getFullYear() === currentYear) {
            const monthIndex = date.getMonth();
            if (transaction.type === 'income') {
                monthlyData[monthIndex].income += transaction.amount;
            } else {
                monthlyData[monthIndex].expenses += transaction.amount;
            }
        }
    });
    
    return monthlyData;
}

/**
 * Get spending trends data for last 6 months
 * @returns {Array} Spending trends data
 */
function getSpendingTrendsData() {
    const transactions = getTransactions();
    const now = new Date();
    const trendsData = [];

    // Get last 6 months
    for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        
        const monthTransactions = transactions.filter(t => {
            const transactionDate = new Date(t.date);
            return transactionDate >= startDate && 
                   transactionDate <= endDate && 
                   t.type === 'expense';
        });

          const totalSpending = monthTransactions.reduce((sum, t) => sum + t.amount, 0);
        
        trendsData.push({
            month: monthName,
            spending: totalSpending
        });
    }
    
    return trendsData;
}

/**
 * Update all charts on data change
 */
function updateAllCharts() {
    // Update dashboard chart
    const dashboardCanvas = document.getElementById('expense-chart');
    if (dashboardCanvas) {
        createExpensePieChart('expense-chart');
    }
    
    // Update analytics charts
    const analyticsCanvas = document.getElementById('income-expenses-chart');
    if (analyticsCanvas) {
        createIncomeExpensesLineChart('income-expenses-chart');
    }
    
    const trendsCanvas = document.getElementById('spending-trends-chart');
    if (trendsCanvas) {
        createSpendingTrendsChart('spending-trends-chart');
    }
}