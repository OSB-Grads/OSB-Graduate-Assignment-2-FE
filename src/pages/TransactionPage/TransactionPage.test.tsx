import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TransactionPage from './TransactionPage';
import transactioStore from '../../store/transactionStore/transactionStore';

// Mock the store
jest.mock('../../store/transactionStore/transactionStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Generate 15 mock transactions for pagination
const mockTransactions = Array.from({ length: 15 }, (_, i) => ({
  fromAccount: `from-${i}`,
  toAccount: `to-${i}`,
  description: i === 5 ? 'Salary' : `desc-${i}`,
  amount: i * 100,
  status: 'PENDING',
  type: 'DEPOSIT',
  createdAt: '2023-01-01',
}));

describe('TransactionPage', () => {
  beforeEach(() => {
    (transactioStore as unknown as jest.Mock).mockReturnValue({
      transactions: mockTransactions,
      loading: false,
      error: null,
      fetchTransactionDetails: jest.fn(),
    });
  });

  it('renders heading and tagline', () => {
    render(<TransactionPage />);
    expect(screen.getByRole('heading', { name: /transactions/i })).toBeInTheDocument();
    expect(screen.getByText(/view and filter your account transactions/i)).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(<TransactionPage />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('calls fetchTransactionDetails on mount', () => {
    const mockFetch = jest.fn();
    (transactioStore as unknown as jest.Mock).mockReturnValue({
      transactions: [],
      loading: false,
      error: null,
      fetchTransactionDetails: mockFetch,
    });

    render(<TransactionPage />);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('filters transactions based on description', async () => {
    render(<TransactionPage />);
    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: 'Salary' } });

    await waitFor(() => {
      expect(screen.getByText(/Salary/i)).toBeInTheDocument();
      expect(screen.queryByText(/desc-0/i)).not.toBeInTheDocument();
    });
  });

  it('handles pagination change', async () => {
    render(<TransactionPage />);

    // First page should show desc-0
    expect(screen.getByText(/desc-0/i)).toBeInTheDocument();

    // Click next page
    const nextButton = screen.getByLabelText(/go to next page/i);
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(/desc-10/i)).toBeInTheDocument();
    });
  });

  it('displays correct number of rows per page', () => {
    render(<TransactionPage />);
    // 10 rows + 1 header row
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeLessThanOrEqual(11);
  });
});