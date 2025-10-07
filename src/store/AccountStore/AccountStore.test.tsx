import * as api from './accountStore.api';
import { fetchAccount, fetchAllAccounts, CreateAccount } from './accountStore.logic';

jest.mock('./accountStore.api');

describe('Account Store Logic', () => {
  let set: jest.Mock;

  beforeEach(() => {
    set = jest.fn();
    jest.clearAllMocks();
  });

  // ---------------------- fetchAccount ----------------------

  test('fetchAccount success sets account and loading false', async () => {
    const mockAccount = {
      accountNumber: '123',
      accountType: 'SAVINGS',
      balance: 5000,
      accountCreated: '2025-10-07',
      accountUpdated: '2025-10-07',
    };

    (api.getAccount as jest.Mock).mockResolvedValue(mockAccount);

    await fetchAccount(set, '123');

   

    expect(set).toHaveBeenCalledTimes(2);

    // Second call returns updater function

    const updateFn = set.mock.calls[1][0];
    expect(typeof updateFn).toBe('function');

    const resultState = updateFn();

    expect(resultState).toEqual({
      account: mockAccount,
      loadingFetchAccount: false,
      errorFetchAccount: false,
    });
  });

  test('fetchAccount failure sets errorFetchAccount true', async () => {
    (api.getAccount as jest.Mock).mockRejectedValue(new Error('fail'));

    await fetchAccount(set, '999');

    expect(set).toHaveBeenCalledWith({
      errorFetchAccount: true,
      loadingFetchAccount: false,
    });
  });

  // ---------------------- fetchAllAccounts ----------------------

  test('fetchAllAccounts success sets accounts and loading false', async () => {
    const mockAccounts = [
      { accountNumber: '123', accountType: 'SAVINGS', balance: 1000, accountCreated: '2025-10-07', accountUpdated: '2025-10-07' },
      { accountNumber: '456', accountType: 'FIXED_DEPOSIT', balance: 8000, accountCreated: '2025-10-07', accountUpdated: '2025-10-07' },
    ];

    (api.getAllAccounts as jest.Mock).mockResolvedValue(mockAccounts);

    await fetchAllAccounts(set);

    expect(set).toHaveBeenCalledTimes(2);
    const updateFn = set.mock.calls[1][0];
    const newState = updateFn();

    expect(newState).toEqual({
      accounts: mockAccounts,
      accountLoading: false,
    });
  });

  test('fetchAllAccounts failure sets accountError true', async () => {
    (api.getAllAccounts as jest.Mock).mockRejectedValue(new Error('fail'));

    await fetchAllAccounts(set);

    expect(set).toHaveBeenCalledTimes(2);
    const updateFn = set.mock.calls[1][0];
    const result = updateFn();

    expect(result).toEqual({
      accountError: true,
      accountLoading: false,
    });
  });

  // ---------------------- CreateAccount ----------------------
  
  test('CreateAccount success adds new account to state', async () => {
    const mockNewAccount = {
      accountNumber: '999',
      accountType: 'SAVINGS',
      balance: 12000,
      accountCreated: '2025-10-07',
      accountUpdated: '2025-10-07',
    };
    const prevState = { accounts: [] };

    (api.postAccount as jest.Mock).mockResolvedValue(mockNewAccount);
    console.log = jest.fn();

    await CreateAccount(set, '12000', 'SAVINGS', 'P123');

    expect(console.log).toHaveBeenCalledWith(mockNewAccount);

    // Verify new account added
    expect(set).toHaveBeenCalledTimes(2);
    const addFn = set.mock.calls[1][0];
    const resultState = addFn(prevState);

    expect(resultState.accounts).toContain(mockNewAccount);
    expect(resultState.loadingCreateAccount).toBe(false);
  });

  test('CreateAccount failure sets errorCreateAccount', async () => {
    (api.postAccount as jest.Mock).mockRejectedValue(new Error('fail'));

    await CreateAccount(set, '0', 'FIXED_DEPOSIT', 'P999');

    expect(set).toHaveBeenCalledTimes(2);
    const updateFn = set.mock.calls[1][0];
    const result = updateFn();

    expect(result).toEqual({
      errorCreateAccount: 'error in creating the accounts',
      loadingCreateAccount: false,
    });
  });
});
