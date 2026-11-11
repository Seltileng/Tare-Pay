# Tare-pay

Tare-pay is a next-generation cooperative finance platform designed for modern Nigerian professionals and organizations. It provides features such as savings, collateral-free credit, dividends, and automated governance, all within a calm and trustworthy interface.

## Features

### Member Features
- **Savings & Share Capital**: Automate monthly contributions and acquire cooperative shares to build wealth.
- **Loans**: Access up to 3x your savings and share capital with fair interest rates and flexible repayment terms.
- **Dividends**: Earn annual surplus dividends based on your share capital holdings.
- **Notifications**: Stay updated with real-time notifications for transactions, obligations, and governance updates.
- **Financial Health Insights**: Track your savings progress, loan utilization, and overall financial health.

### Admin Features
- **Member Management**: Manage cooperative members, including bulk imports and profile updates.
- **Loan Approvals**: Review and approve loan applications with detailed insights.
- **Governance Tools**: Facilitate voting, resolutions, and meeting management.
- **Finance Oversight**: Monitor cooperative finances, including contributions, withdrawals, and loan portfolios.

### Security
- **Biometric Lock**: Secure the app with biometric authentication.
- **Session Timeout**: Automatic session locking for enhanced security.
- **Data Protection**: Adheres to NDPR standards with AES-256 encryption for data at rest and TLS 1.3 for data in transit.

## Tech Stack
- **Frontend**: React, Next.js, TailwindCSS
- **State Management**: Zustand
- **Charts**: Recharts
- **Type Checking**: TypeScript
- **UI Components**: Custom-built with TailwindCSS and Lucide Icons

## Folder Structure
- **`/app`**: Contains the Next.js pages and layouts for different user roles (e.g., member, admin, auth).
- **`/components`**: Reusable UI components such as modals, charts, and layouts.
- **`/stores`**: Zustand stores for managing application state.
- **`/mocks`**: Mock data and API simulation for development and testing.
- **`/lib`**: Utility functions and constants (e.g., Nigerian states and banks).

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/tare-pay.git
   cd tare-pay