import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../store/userstore/userstore.ts', () => ({
    __esModule: true,
    default: () => ({
        user: { name: 'John Doe' },
        getUser: jest.fn(),
    }),
}));

jest.mock('../../store/transactionStore/transactionStore', () => ({
    __esModule: true,
    default: () => ({
        transactions: [
            {
                amount: 100,
                description: 'Test Transfer',
                fromAccount: '12345',
                toAccount: '67890',
                createdAt: new Date().toISOString(),
            },
        ],
        fetchTransactionDetails: jest.fn(),
        loading: false,
        error: null,
    }),
}));

jest.mock('../../store/AccountStore/accountStore.tsx', () => ({
    __esModule: true,
    default: () => ({
        accounts: [
            {
                accountNumber: '12345678',
                accountType: 'SAVINGS',
                balance: 1000,
                accountCreated: new Date().toISOString(),
                accountUpdated: new Date().toISOString(),
            },
        ],
        fetchAllAccounts: jest.fn(),
        accountLoading: false,
        accountError: null,
    }),
}));


jest.mock('../../components/DashboardAccount/DashBoardAccount', () => ({
    __esModule: true,
    default: ({ AccountType, AccountNumber }: any) => (
        <div data-testid="dashboard-account">
            {AccountType} {AccountNumber}
        </div>
    ),
}));

jest.mock('../../components/QuickActionItem/QuickActionItem', () => ({
    __esModule: true,
    default: ({ label, subLabel }: any) => (
        <div data-testid="quick-action-item">
            <div>{label}</div>
            <div>{subLabel}</div>
        </div>
    ),
}));


jest.mock('../../assets/Latest-notification-transfer-icon.png', () => 'mock-icon');


jest.mock('./Home.css', () => ({}));

describe('Home Component', () => {
    it('renders welcome message', () => {
        render(
            <Router>
                <Home />
            </Router>
        );

        expect(screen.getByText(/Welcome back, John Doe/i)).toBeInTheDocument();
    });

    it('renders account information', () => {
        render(
            <Router>
                <Home />
            </Router>
        );

        expect(screen.getByTestId('dashboard-account')).toHaveTextContent('**5678');
    });

    it('renders transactions', () => {
        render(
            <Router>
                <Home />
            </Router>
        );

        const quickActionItems = screen.getAllByTestId('quick-action-item');

        const transactionItem = quickActionItems.find((item) =>
            item.textContent?.includes('Test Transfer')
        );
        expect(transactionItem).toBeInTheDocument();
    });

    it('renders quick action links', () => {
        render(
            <Router>
                <Home />
            </Router>
        );
        const quickActionItems = screen.getAllByTestId('quick-action-item');
        expect(quickActionItems.length).toBeGreaterThan(0);
    });
});
