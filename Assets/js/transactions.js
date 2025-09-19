/**
 * Personal Finance Dashboard - Transaction Management
 * Functions for managing transactions page functionality
 */

// Page state for transactions
const TransactionsPage = {
    currentTransactions: [],
    filteredTransactions: [],
    currentSort: { field: 'date', order: 'desc' },
    currentFilters: { type: 'all', category: 'all', period: 'month', search: '' },
    currentPage: 1,
    itemsPerPage: 20,
    editingTransaction: null
};

/**
 * Initialize transactions page
 */
function initializeTransactionsPage() {
    try {
        // Load all transactions
        loadTransactions();
        
        // Set up event listeners
        setupTransactionsEventListeners();
        
        // Populate filter dropdowns
        populateFilterDropdowns();
        
        // Apply default filters
        applyFilters();
        
        console.log('Transactions page initialized successfully');
        
    } catch (error) {
        console.error('Failed to initialize transactions page:', error);
        showNotification('Failed to load transactions page', 'error');
    }
}

/**
 * Set up event listeners for transactions page
 */
function setupTransactionsEventListeners() {
    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearchChange, 300));
    }
    
    // Clear search
    const clearSearch = document.getElementById('clear-search');
    if (clearSearch) {
        clearSearch.addEventListener('click', clearSearch);
    }
    
    // Filter dropdowns
    const typeFilter = document.getElementById('type-filter');
    const categoryFilter = document.getElementById('category-filter');
    const periodFilter = document.getElementById('period-filter');
    
    if (typeFilter) typeFilter.addEventListener('change', handleFilterChange);
    if (categoryFilter) categoryFilter.addEventListener('change', handleFilterChange);
    if (periodFilter) periodFilter.addEventListener('change', handleFilterChange);
    
    // Reset filters
    const resetFilters = document.getElementById('reset-filters');
    if (resetFilters) {
        resetFilters.addEventListener('click', resetAllFilters);
    }
    
    // Sort dropdown
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSortChange);
    }
    
    // Export button
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportTransactions);
    }
    
    // Edit form submission
    const editForm = document.getElementById('edit-form');
    if (editForm) {
        editForm.addEventListener('submit', handleEditSubmit);
    }
    
    // Table header sorting
    const sortableHeaders = document.querySelectorAll('.sortable');
    sortableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            handleHeaderSort(this.dataset.sort);
        });
    });
    
    // Pagination
    const prevPage = document.getElementById('prev-page');
    const nextPage = document.getElementById('next-page');
    if (prevPage) prevPage.addEventListener('click', () => changePage(-1));
    if (nextPage) nextPage.addEventListener('click', () => changePage(1));
}

/**
 * Populate filter dropdown options
 */
function populateFilterDropdowns() {
    const categoryFilter = document.getElementById('category-filter');
    const editCategorySelect = document.getElementById('edit-transaction-category');
    
    if (categoryFilter) {
        const categories = getCategories();
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = `${category.icon} ${category.name}`;
            categoryFilter.appendChild(option);
        });
    }
    
    // Populate edit form categories
    if (editCategorySelect) {
        const categories = getCategories();
        editCategorySelect.innerHTML = '';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = `${category.icon} ${category.name}`;
            editCategorySelect.appendChild(option);
        });
    }
}

/**
 * Handle search input change
 */
function handleSearchChange(event) {
    TransactionsPage.currentFilters.search = event.target.value.toLowerCase();
    TransactionsPage.currentPage = 1;
    applyFilters();
}

/**
 * Handle filter dropdown changes
 */
function handleFilterChange(event) {
    const filterType = event.target.id.replace('-filter', '');
    TransactionsPage.currentFilters[filterType] = event.target.value;
    TransactionsPage.currentPage = 1;
    applyFilters();
}

/**
 * Handle sort dropdown change
 */
function handleSortChange(event) {
    const [field, order] = event.target.value.split('-');
    TransactionsPage.currentSort = { field, order };
    applyFilters();
}

/**
 * Update sort header indicators
 */
function updateSortHeaders() {
    const headers = document.querySelectorAll('.sortable');
    headers.forEach(header => {
        const icon = header.querySelector('.sort-icon');
        header.classList.remove('sort-asc', 'sort-desc');
        
        if (header.dataset.sort === TransactionsPage.currentSort.field) {
            header.classList.add(`sort-${TransactionsPage.currentSort.order}`);
            icon.textContent = TransactionsPage.currentSort.order === 'asc' ? '↑' : '↓';
        } else {
            icon.textContent = '';
        }
    });
}

/**
 * Apply all filters and update display
 */
function applyFilters() {
    let filtered = [...TransactionsPage.currentTransactions];
    const filters = TransactionsPage.currentFilters;
    
    // Apply search filter
    if (filters.search) {
        filtered = filtered.filter(transaction => {
            const category = getCategoryById(transaction.category);
            const categoryName = category ? category.name.toLowerCase() : '';
            const description = (transaction.description || '').toLowerCase();
            
            return description.includes(filters.search) || 
                   categoryName.includes(filters.search);
        });
    }
    
    // Apply type filter
    if (filters.type !== 'all') {
        filtered = filtered.filter(t => t.type === filters.type);
    }
    
    // Apply category filter
    if (filters.category !== 'all') {
        filtered = filtered.filter(t => t.category === filters.category);
    }
    
    // Apply period filter
    if (filters.period !== 'all') {
        const dateRange = getDateRange(filters.period);
        filtered = filterTransactionsByDateRange(filtered, dateRange.start, dateRange.end);
    }
    
    // Apply sorting
    const { field, order } = TransactionsPage.currentSort;
    filtered = sortBy(filtered, field, order);
    
    TransactionsPage.filteredTransactions = filtered;
    
    // Update display
    updateTransactionsSummary();
    updateTransactionsTable();
    updatePagination();
    updateSortHeaders();
}

/**
 * Update transactions summary cards
 */
function updateTransactionsSummary() {
    const transactions = TransactionsPage.filteredTransactions;
    
    const totalCount = transactions.length;
    const totalIncome = transactions.filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpenses;
    
    // Update summary cards
    const elements = {
        'total-count': totalCount.toString(),
        'filtered-income': formatCurrency(totalIncome),
        'filtered-expenses': formatCurrency(totalExpenses),
        'filtered-balance': formatCurrency(balance)
    };
    
    // Update showing results text
    const showingResults = document.getElementById('showing-results');
    if (showingResults) {
        const total = TransactionsPage.currentTransactions.length;
        if (totalCount === total) {
            showingResults.textContent = `Showing all ${total} transactions`;
        } else {
            showingResults.textContent = `Showing ${totalCount} of ${total} transactions`;
        }
    }
}

/**
 * Update transactions table
 */
function updateTransactionsTable() {
    const tbody = document.getElementById('transactions-tbody');
    const emptyState = document.getElementById('empty-state');
    const tableContainer = document.querySelector('.table-container');
    
    if (!tbody) return;
    
    const transactions = TransactionsPage.filteredTransactions;
    
    if (transactions.length === 0) {
        tbody.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        if (tableContainer) tableContainer.style.display = 'none';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    if (tableContainer) tableContainer.style.display = 'block';
    
    // Calculate pagination
    const startIndex = (TransactionsPage.currentPage - 1) * TransactionsPage.itemsPerPage;
    const endIndex = startIndex + TransactionsPage.itemsPerPage;
    const pageTransactions = transactions.slice(startIndex, endIndex);
    
    // Generate table rows
    tbody.innerHTML = '';
    pageTransactions.forEach(transaction => {
        const row = createTransactionRow(transaction);
        tbody.appendChild(row);
    });
}

/**
 * Create transaction table row
 */
function createTransactionRow(transaction) {
    const row = document.createElement('tr');
    row.className = `transaction-row ${transaction.type}`;
    row.dataset.id = transaction.id;
    
    const category = getCategoryById(transaction.category);
    const categoryName = category ? category.name : 'Unknown';
    const categoryIcon = category ? category.icon : '📋';
    
    const amountClass = transaction.type === 'income' ? 'positive' : 'negative';
    const amountPrefix = transaction.type === 'income' ? '+' : '-';
    
    row.innerHTML = `
        <td class="date-cell">${formatDate(transaction.date)}</td>
        <td class="description-cell">
            <div class="transaction-description">
                <span class="category-icon">${categoryIcon}</span>
                <span class="description-text">${transaction.description || categoryName}</span>
            </div>
        </td>
        <td class="type-cell">
            <span class="type-badge ${transaction.type}">${capitalize(transaction.type)}</span>
        </td>
        <td class="amount-cell ${amountClass}">
            ${amountPrefix}${formatCurrency(transaction.amount)}
        </td>
        <td class="actions-cell">
            <button class="btn small secondary" onclick="editTransaction('${transaction.id}')" 
                    aria-label="Edit transaction">
                ✏️
            </button>
        </td>
    `;
    
    return row;
}

/**
 * Update pagination controls
 */
function updatePagination() {
    const paginationContainer = document.getElementById('pagination-container');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    
    const totalItems = TransactionsPage.filteredTransactions.length;
    const totalPages = Math.ceil(totalItems / TransactionsPage.itemsPerPage);
    
    if (totalPages <= 1) {
        if (paginationContainer) paginationContainer.style.display = 'none';
        return;
    }
    
    if (paginationContainer) paginationContainer.style.display = 'flex';
    
    if (prevBtn) {
        prevBtn.disabled = TransactionsPage.currentPage === 1;
    }
    
    if (nextBtn) {
        nextBtn.disabled = TransactionsPage.currentPage === totalPages;
    }
    
    if (pageInfo) {
        pageInfo.textContent = `Page ${TransactionsPage.currentPage} of ${totalPages}`;
    }
}

/**
 * Change pagination page
 */
function changePage(direction) {
    const totalPages = Math.ceil(
        TransactionsPage.filteredTransactions.length / TransactionsPage.itemsPerPage
    );
    
    const newPage = TransactionsPage.currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        TransactionsPage.currentPage = newPage;
        updateTransactionsTable();
        updatePagination();
    }
}

/**
 * Reset all filters
 */
function resetAllFilters() {
    // Reset filter values
    TransactionsPage.currentFilters = { 
        type: 'all', 
        category: 'all', 
        period: 'all', 
        search: '' 
    };
    TransactionsPage.currentPage = 1;
    
    // Reset UI elements
    const searchInput = document.getElementById('search-input');
    const typeFilter = document.getElementById('type-filter');
    const categoryFilter = document.getElementById('category-filter');
    const periodFilter = document.getElementById('period-filter');
    
    if (searchInput) searchInput.value = '';
    if (typeFilter) typeFilter.value = 'all';
    if (categoryFilter) categoryFilter.value = 'all';
    if (periodFilter) periodFilter.value = 'all';
    
    applyFilters();
    showNotification('Filters reset successfully', 'success');
}

/**
 * Clear search input
 */
function clearSearchInput() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = '';
        TransactionsPage.currentFilters.search = '';
        applyFilters();
    }
}

/**
 * Edit transaction
 */
function editTransaction(transactionId) {
    const transaction = TransactionsPage.currentTransactions.find(t => t.id === transactionId);
    if (!transaction) return;
    
    TransactionsPage.editingTransaction = transaction;
    
    // Populate edit form
    document.getElementById('edit-transaction-id').value = transaction.id;
    document.getElementById('edit-transaction-type').value = transaction.type;
    document.getElementById('edit-transaction-amount').value = transaction.amount;
    document.getElementById('edit-transaction-category').value = transaction.category;
    document.getElementById('edit-transaction-description').value = transaction.description || '';
    document.getElementById('edit-transaction-date').value = transaction.date;
    
    // Update category options based on type
    updateEditCategoryOptions(transaction.type);
    
    // Show modal
    const modal = document.getElementById('edit-modal');
    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    }
}