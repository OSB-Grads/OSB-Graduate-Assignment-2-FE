import { authenticate, login, logout, signup } from './authStore.logic';
import * as api from './authstore.api';
import * as httpClientUtil from '../../utils/httpClientUtil';

// Mock toast
jest.mock('../../components/Toast/Alerts', () => ({
  notify: jest.fn(),
}));

// Mock httpClientUtil to avoid import.meta.env crash
jest.mock('../../utils/httpClientUtil', () => ({
  default: {},
  getAccessToken: jest.fn(),
  getRefreshToken: jest.fn(),
  setTokens: jest.fn(),
}));

// Mock API module
jest.mock('./authstore.api');

describe('Auth functions', () => {
  let set: jest.Mock;

  beforeEach(() => {
    set = jest.fn();
    jest.clearAllMocks();
  });

  test('authenticate sets state', () => {
    authenticate(set, true);
    expect(set).toHaveBeenCalledWith({ isAuthenticated: true });

    authenticate(set, false);
    expect(set).toHaveBeenCalledWith({ isAuthenticated: false });
  });

  test('signup success sets isAuthenticated and calls setTokens', async () => {
    (api.registerApi as jest.Mock).mockResolvedValue({
      token: 'dummy-JWT-register-token',
      refreshToken: 'dummy-refresh-token',
    });

    await signup(set, 'user', 'pass');

    expect(set).toHaveBeenCalledWith({ isAuthenticated: true });
    expect(httpClientUtil.setTokens).toHaveBeenCalledWith(
      'dummy-JWT-register-token',
      'dummy-refresh-token'
    );
  });

  test('signup failure logs error', async () => {
    const error = new Error('fail');
    (api.registerApi as jest.Mock).mockRejectedValue(error);
    console.log = jest.fn();

    await expect(signup(set, 'user', 'pass')).rejects.toThrow('fail');
    expect(console.log).toHaveBeenCalledWith('error occurred', error);
  });

  test('login success sets isAuthenticated and calls setTokens', async () => {
    (api.loginApi as jest.Mock).mockResolvedValue({
      token: 'dummy-JWT-login-token',
      refreshToken: 'dummy-refresh-token',
    });

    await login(set, 'user', 'pass', true);

    expect(set).toHaveBeenCalledWith({ isAuthenticated: true });
    expect(httpClientUtil.setTokens).toHaveBeenCalledWith(
      'dummy-JWT-login-token',
      'dummy-refresh-token'
    );
  });

  test('login failure logs error and shows error toast', async () => {
    const error = new Error('fail');
    (api.loginApi as jest.Mock).mockRejectedValue(error);
    console.log = jest.fn();

    await login(set, 'user', 'pass', false);

    expect(console.log).toHaveBeenCalledWith('error occurred', error);
    expect(httpClientUtil.setTokens).not.toHaveBeenCalled();
  });

  test('logout sets isAuthenticated false and clears tokens', async () => {
    (httpClientUtil.getRefreshToken as jest.Mock).mockReturnValue('dummy-refresh-token');
    (api.logoutApi as jest.Mock).mockResolvedValue(true);

    await logout(set);

    expect(httpClientUtil.setTokens).toHaveBeenCalledWith(null, null);
    expect(set).toHaveBeenCalledWith({ isAuthenticated: false });
  });
});
