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