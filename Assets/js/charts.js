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