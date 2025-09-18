# Personal Finance Dashboard

A modern, responsive financial tracking application built with vanilla HTML, CSS, and JavaScript. Track expenses, manage budgets, and visualize financial data with interactive charts.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Development Process](#development-process)
- [Testing](#testing)
- [Deployment](#deployment)
- [Credits](#credits)

## Project Overview

**Purpose:** Create a comprehensive personal finance management application that helps users track expenses, manage budgets, and make informed financial decisions through intuitive visualizations.

**Live Website:** [See deployed website](https://stevedok22.github.io/FinTrack/)

<div align="center">

![Product Pages Grid](assets/images/sceenshots/)

*FinTrack website displayed across multiple devices - showcasing responsive design*

</div>

**Target Audience:** 
- Young professionals starting their financial journey
- Individuals seeking better expense tracking
- Budget-conscious users wanting financial insights
- Anyone looking to improve their financial health

**Key Goals:**
- Provide simple expense and income tracking
- Offer budget management with visual progress
- Create clear financial analytics with charts
- Ensure responsive design across all devices
- Implement secure local data storage

## Features

### Core Functionality
- **Dashboard Overview:** Real-time financial summary with balance, income, and expenses
- **Transaction Management:** Add, edit, and categorize financial transactions
- **Budget Tracking:** Set monthly budgets and monitor spending progress
- **Data Visualization:** Interactive charts showing spending patterns and trends
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices

### Page Structure
- **Dashboard (index.html):** Main financial overview with charts and quick stats
- **Transactions (pages/transactions.html):** Detailed transaction management with filters
- **Analytics (pages/analytics.html):** Advanced charts and financial insights
- **Settings (pages/settings.html):** Category management and user preferences

### Interactive Elements
- **Add Transaction Modal:** Quick transaction entry form
- **Filter System:** Search and filter transactions by date, category, and amount
- **Chart Interactions:** Interactive financial charts using Chart.js
- **Category Management:** Customizable expense and income categories
- **Responsive Navigation:** Mobile-friendly navigation system

## Technologies Used

- **HTML5:** Semantic markup with accessibility features
- **CSS3:** Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript (ES6+):** Modular architecture with no frameworks
- **Chart.js:** Interactive data visualization library
- **LocalStorage API:** Client-side data persistence
- **Responsive Design:** Mobile-first approach with fluid layouts

## Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Live Server extension (for development)

### Local Development
1. **Clone or download the project files**
2. **Open the project folder in your text editor**
3. **Launch with Live Server or open index.html in your browser**

### Project Structure Setup
```bash
# Create the following folder structure:
personal-finance-dashboard/
├── index.html
├── README.md
├── .gitignore
├── pages/
│   ├── transactions.html
│   ├── analytics.html
│   └── settings.html
├── assets/
│   ├── css/
│   │   ├── styles.css
│   │   ├── components.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── script.js
│   │   ├── dashboard.js
│   │   ├── transactions.js
│   │   ├── charts.js
│   │   ├── storage.js
│   │   └── utils.js
│   └── images/
│       ├── icons/
│       └── screenshots/
```

## Usage

### Getting Started
1. **Open the application** in your web browser
2. **Add your first transaction** using the "Add Transaction" button
3. **Set up categories** in the Settings page for better organization
4. **Create budgets** to track your spending goals
5. **View analytics** to understand your spending patterns

### Navigation
- **Dashboard:** Overview of your financial status
- **Transactions:** Manage all your financial transactions
- **Analytics:** View detailed charts and spending analysis
- **Settings:** Customize categories and preferences

### Data Management
- All data is stored locally in your browser
- Export functionality available in Settings
- No server required - complete privacy

## File Structure

```
personal-finance-dashboard/
├── index.html                 # Main dashboard page
├── README.md                  # Project documentation
├── .gitignore                 # Git ignore rules
│
├── pages/                     # Additional HTML pages
│   ├── transactions.html      # Transaction management
│   ├── analytics.html         # Financial analytics
│   └── settings.html          # User settings
│
└── assets/                    # Static files
    ├── css/                   # Stylesheets
    │   ├── styles.css         # Core styles and variables
    │   ├── components.css     # UI component styles
    │   └── responsive.css     # Mobile responsiveness
    │
    ├── js/                    # JavaScript modules
    │   ├── script.js          # Main app initialization
    │   ├── dashboard.js       # Dashboard functionality
    │   ├── transactions.js    # Transaction management
    │   ├── charts.js          # Chart.js integration
    │   ├── storage.js         # Data persistence
    │   └── utils.js           # Helper functions
    │
    └── images/                # Images and assets
        ├── icons/             # UI and category icons
        └── screenshots/       # Documentation images
```

## Development Process

### Design Decisions
- **T-Bank Inspired Design:** Modern banking interface with green color palette
- **Vanilla JavaScript:** No frameworks for simplicity and performance
- **LocalStorage:** Privacy-first approach with local data storage
- **Mobile-First:** Responsive design starting from mobile screens
- **Modular Architecture:** Separate JavaScript files for maintainability

### Key Features Implementation
- **Real-time Updates:** Dashboard updates automatically when data changes
- **Form Validation:** Input validation with user-friendly error messages
- **Chart Integration:** Financial data visualization using Chart.js
- **Responsive Navigation:** Adaptive navigation for different screen sizes
- **Accessibility:** Semantic HTML and ARIA labels for screen readers

### Challenges & Solutions
[To be updated during development]

## Testing

### Validation
- [ ] HTML validation using W3C validator
- [ ] CSS validation using W3C CSS validator
- [ ] JavaScript linting using JSHint
- [ ] Accessibility testing with WAVE or similar tools

### Functionality Testing
- [ ] All navigation links work correctly
- [ ] Transaction CRUD operations function properly
- [ ] Charts display data accurately
- [ ] Responsive design works on all devices
- [ ] Form validation provides appropriate feedback
- [ ] Data persistence works between sessions

### Cross-Browser Testing
- [ ] Google Chrome (latest)
- [ ] Mozilla Firefox (latest)
- [ ] Safari (if available)
- [ ] Microsoft Edge (latest)
- [ ] Mobile browsers (iOS/Android)

## Deployment

### GitHub Pages (Recommended)
1. Push code to GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually main)
4. Access your live site at `https://username.github.io/repository-name`

### Alternative Hosting Options
- **Netlify:** Drag-and-drop deployment
- **Vercel:** Git-based deployment
- **Traditional Web Hosting:** Upload via FTP

### Pre-Deployment Checklist
- [ ] All functionality tested and working
- [ ] Responsive design verified
- [ ] All external links open in new tabs
- [ ] Performance optimized
- [ ] Cross-browser compatibility confirmed

## Credits

### External Libraries
- **Chart.js:** Data visualization library (https://www.chartjs.org/)
- Licensed under MIT License

### Design Resources & Code Attribution

#### **T-Bank Design System Inspiration**
- **Source:** [T-Bank Official Website](https://www.tbank.ru/)
- **Elements Adapted:**
  - CSS Color Palette: Green gradient scheme adapted for financial trust theme
    ```css
    /* Inspired by T-Bank's professional banking colors */
    --color-light-green: #E8F5E8;
    --color-neon-green: #00FF7F; 
    --color-dark-green: #006B3F;
    ```
  - Card Layout Patterns: Shadow effects and border radius implementations
    ```css
    /* T-Bank inspired card styling in components.css lines 45-62 */
    box-shadow: var(--shadow-xl);
    border-radius: var(--radius-2xl);
    background: linear-gradient(135deg, var(--color-white) 0%, var(--color-light-green) 100%);
    ```
  - Navigation Header: Dark gradient background pattern
    ```css
    /* Header gradient from styles.css lines 78-82 */
    background: linear-gradient(135deg, var(--color-dark-green) 0%, var(--color-black) 100%);
    ```

#### **Dashboard Architecture References**
- **Tabler HTML Dashboard Template:** [GitHub - Tabler](https://github.com/tabler/tabler)
  - **License:** MIT License
  - **Code Adaptations:**
    - Grid Layout System: Responsive dashboard grid implementation
      ```css
      /* Dashboard grid pattern adapted from Tabler in styles.css lines 234-240 */
      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: var(--spacing-xl);
      }
      ```
    - Modal Structure: Base modal HTML structure and overlay patterns
      ```html
      <!-- Modal pattern inspired by Tabler modal components -->
      <div class="modal" id="transaction-modal" role="dialog" aria-hidden="true">
        <div class="modal-overlay"></div>
        <div class="modal-content">
      ```

- **Financial Dashboard GitHub Reference:** [IvanCampos/financial-dashboard](https://github.com/IvanCampos/financial-dashboard)
  - **LocalStorage Patterns:** Data persistence structure adapted for financial transactions
    ```javascript
    // Storage pattern inspired by IvanCampos approach in storage.js lines 15-35
    const STORAGE_KEYS = {
      TRANSACTIONS: 'financeApp_transactions',
      CATEGORIES: 'financeApp_categories',
      SETTINGS: 'financeApp_settings'
    };
    ```
  - **Utility Functions:** Date formatting and currency display helpers
    ```javascript
    // Currency formatting adapted from financial-dashboard in utils.js lines 8-14
    function formatCurrency(amount, currency = '$') {
      return `${currency}${Math.abs(amount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;
    }
    ```

#### **Professional Fintech Template References**
- **AlignUI Finance Components:** [AlignUI Banking Template](https://pro.alignui.com/templates/finance-banking)
  - **Form Validation Patterns:** Transaction form structure and validation approach
    ```javascript
    // Form validation pattern inspired by AlignUI in script.js lines 156-175
    function validateTransaction(transaction) {
      const errors = [];
      if (!transaction.amount || transaction.amount <= 0) {
        errors.push('Please enter a valid amount greater than 0');
      }
      // Additional validation logic...
    }
    ```

- **Banking UI Component Library:** [W3Layouts Banking Templates](https://w3layouts.com/banking/)
  - **Responsive Navigation:** Mobile-first navigation toggle patterns
    ```css
    /* Mobile navigation adapted from W3Layouts in responsive.css lines 25-45 */
    @media (max-width: 768px) {
      .nav { flex-direction: column; gap: var(--spacing-md); }
      .nav-menu { gap: var(--spacing-md); }
    }
    ```

#### **Chart.js Integration & Customization**
- **Chart.js Documentation:** [Chart.js Official Docs](https://www.chartjs.org/docs/latest/)
- **Custom Implementation:**
  ```javascript
  // Chart configuration adapted from Chart.js examples in charts.js lines 45-89
  window.dashboardChart = new Chart(ctx, {
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
      cutout: '60%' // Custom financial dashboard styling
    }
  });
  ```

#### **Open Source Dashboard Templates (Reference)**
- **Fintech Dashboard Templates:** [GitHub Dashboard Templates](https://github.com/topics/dashboard-templates)
  - **Component Structure:** Card-based layout patterns for financial metrics
    ```html
    <!-- Card structure pattern from multiple dashboard templates -->
    <div class="stat-card income">
      <div class="stat-icon">💰</div>
      <div class="stat-content">
        <p class="stat-label">Total Income</p>
        <p class="stat-amount" id="total-income">$0.00</p>
      </div>
    </div>
    ```

- **Modern CSS Patterns:** [CSS Grid and Flexbox Examples](https://css-tricks.com/)
  - **Flexbox Navigation:** Header navigation alignment
    ```css
    /* Flexbox pattern from CSS-Tricks in styles.css lines 65-72 */
    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    ```

### JavaScript Patterns & Code References

#### **Modern JavaScript Patterns**
- **ES6+ Features Implementation:**
  ```javascript
  // Destructuring and arrow functions from modern JS best practices
  const { start, end } = getCurrentMonthRange(); // utils.js line 234
  const incomeTransactions = transactions.filter(t => t.type === 'income'); // storage.js line 156
  ```

- **Async/Await Patterns:** Event handling and data operations
  ```javascript
  // Modern event handling pattern in script.js lines 45-55
  document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
  });
  ```

#### **LocalStorage Implementation Patterns**
- **Web Storage API Best Practices:**
  ```javascript
  // LocalStorage wrapper pattern in storage.js lines 78-95
  function getTransactions() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get transactions:', error);
      return [];
    }
  }
  ```

### CSS Framework Inspirations

#### **Bootstrap Grid Concepts**
- **Responsive Grid System:** Adapted Bootstrap's grid principles without the framework
  ```css
  /* Bootstrap-inspired responsive grid in styles.css lines 180-195 */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-lg);
  }
  ```

#### **Material Design Principles**
- **Card Elevation and Shadows:**
  ```css
  /* Material Design shadow system adapted in styles.css lines 45-50 */
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  ```

### Development Tools

#### **Visual Studio Code Configuration**
- **Extensions Used:**
  - Live Server: Local development server
  - Prettier: Code formatting
  - HTML CSS Support: Enhanced CSS intellisense

#### **Browser Development Tools**
- **Chrome DevTools:** Performance profiling and responsive design testing
- **Firefox Developer Tools:** CSS Grid inspection and accessibility auditing

### Learning Resources & Tutorials

#### **MDN Web Documentation**
- **JavaScript Guide:** [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  - LocalStorage API implementation patterns
  - ES6+ feature usage throughout the application
  - DOM manipulation best practices

#### **CSS-Tricks Articles**
- **Flexbox Guide:** Navigation and layout alignment patterns
- **CSS Grid Guide:** Dashboard layout implementation
- **Custom Properties:** CSS variables usage throughout the stylesheet

#### **YouTube Educational Content**
- **"JavaScript Crash Course"** - Modern JS patterns used in the application
- **"CSS Grid Tutorial"** - Layout techniques implemented in the dashboard
- **"Chart.js Tutorial"** - Data visualization implementation guidance

### Code Attribution Summary

#### **Original vs. Adapted Code**
- **100% Original Implementation:** All JavaScript logic, data structures, and business rules
- **Adapted Design Patterns:** CSS layouts, color schemes, and UI components from referenced sources
- **Modified Library Integration:** Chart.js configuration customized for financial data display
- **Inspired Architecture:** Dashboard structure influenced by professional fintech templates

#### **Specific File Attributions**
- **styles.css:** T-Bank color palette (lines 8-20), Tabler grid system (lines 234-240)
- **components.css:** Material Design shadows (lines 45-50), Bootstrap form patterns (lines 156-200)
- **script.js:** Modern JS event patterns, original application logic
- **storage.js:** LocalStorage patterns inspired by financial-dashboard repository
- **dashboard.js:** 100% original financial calculation and display logic
- **utils.js:** Currency formatting adapted from financial application examples

### Typography & Icons
- **System Fonts:** Platform-native fonts for optimal performance
- **Category Icons:** Unicode emoji standard for financial categories
- **Custom Color Mapping:** Original icon-to-color associations for categories

---

**All external code has been properly attributed, modified for educational purposes, and integrated into an original financial management application. The project serves as a learning tool combining industry best practices with custom implementation.**

---

© 2024 Personal Finance Dashboard. Built with privacy and simplicity in mind.