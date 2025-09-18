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

### Design Resources
- **Color Palette:** Inspired by modern banking applications
- **Icons:** Custom icon set for financial categories
- **Typography:** System fonts for optimal performance

### Development Tools
- **Visual Studio Code:** Code editor
- **Live Server Extension:** Local development server
- **Chrome DevTools:** Testing and debugging

### Learning Resources
- **MDN Web Docs:** Web development reference
- **Chart.js Documentation:** Data visualization guidance
- **A11y Project:** Accessibility best practices

---

**Note:** This application stores all data locally in your browser. No personal financial information is transmitted to external servers, ensuring complete privacy and security of your financial data.

© 2024 Personal Finance Dashboard. Built with privacy and simplicity in mind.