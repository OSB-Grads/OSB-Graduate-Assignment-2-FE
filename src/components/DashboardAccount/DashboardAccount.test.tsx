// DashboardAccount.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom'; 
import DashboardAccount from './DashBoardAccount';


describe('DashboardAccount component', () => {
  const mockProps = {
    AccountType: 'Savings',
    AccountNumber: '123456789',
  };

  it('renders account type with label', () => {
    render(<DashboardAccount {...mockProps} />);
    const accountTypeText = screen.getByText(/Savings Account/i);
    expect(accountTypeText).toBeInTheDocument();
  });

  it('renders account number', () => {
    render(<DashboardAccount {...mockProps} />);
    const accountNumberText = screen.getByText(/123456789/);
    expect(accountNumberText).toBeInTheDocument();
  });

  it('renders the container with correct class', () => {
    const { container } = render(<DashboardAccount {...mockProps} />);
    const div = container.querySelector('.dashboard-account-info');
    expect(div).toBeInTheDocument();
  });

  it('renders an image', () => {
    render(<DashboardAccount {...mockProps} />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });

  it('renders account icon image', () => {
  render(<DashboardAccount {...mockProps} />);
  const image = screen.getByAltText('Account icon');
  expect(image).toBeInTheDocument();
  });
});
