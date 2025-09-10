import * as httpClientUtil from '../utils/httpClientUtil';
import { authenticate, login, logout, signup } from './authStore.logic'; // adjust path
import * as api from './authstore.api';

jest.mock('./authstore.api');
jest.mock('../utils/httpClientUtil');

describe('Auth functions', () => {
    let set: jest.Mock;

    beforeEach(() => {
        set = jest.fn();
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('authenticate sets  state', () => {
        authenticate(set, true);
        expect(set).toHaveBeenCalledWith({ authenticate: true });

        authenticate(set, false);
        expect(set).toHaveBeenCalledWith({ authenticate: false });
    });

    test('signup success sets isAuthenticated and calls setToken', async () => {
        const Token = 'dummy-JWT-register-token';
        (api.registerApi as jest.Mock).mockResolvedValue(Token);

        await signup(set, 'user', 'pass');

        expect(set).toHaveBeenCalledWith({ isAuthenticated: true });
        expect(httpClientUtil.setToken).toHaveBeenCalledWith(Token);
    });

    test('signup failure  error', async () => {
        const error = new Error('fail');
        (api.registerApi as jest.Mock).mockRejectedValue(error);
        console.log = jest.fn();

        await signup(set, 'user', 'pass');

        expect(console.log).toHaveBeenCalledWith('error occurred', error);
        expect(set).not.toHaveBeenCalled();
        expect(httpClientUtil.setToken).not.toHaveBeenCalled();
    });

    test('login success sets isAuthenticated, calls setToken and stores token if rememberMe', async () => {
        const Token = 'dummy-JWT-login-token';
        (api.loginApi as jest.Mock).mockResolvedValue(Token);

        await login(set, 'user', 'pass', true);

        expect(set).toHaveBeenCalledWith({ isAuthenticated: true });
        expect(httpClientUtil.setToken).toHaveBeenCalledWith(Token);
        expect(localStorage.getItem('token')).toBe(Token);
    });

    test('login success without rememberMe does not store token in localStorage', async () => {
        const Token = 'dummy-JWT-login-token';
        (api.loginApi as jest.Mock).mockResolvedValue(Token);

        await login(set, 'user', 'pass', false);

        expect(set).toHaveBeenCalledWith({ isAuthenticated: true });
        expect(httpClientUtil.setToken).toHaveBeenCalledWith(Token);
        expect(localStorage.getItem('token')).toBe(null);
    });

    test('login failure  error', async () => {
        const error = new Error('fail');
        (api.loginApi as jest.Mock).mockRejectedValue(error);
        console.log = jest.fn();

        await login(set, 'user', 'pass', false);

        expect(console.log).toHaveBeenCalledWith('error occurred', error);
        expect(set).not.toHaveBeenCalled();
        expect(httpClientUtil.setToken).not.toHaveBeenCalled();
    });

    test('logout sets isAuthenticated false and clears token', () => {
        localStorage.setItem('token', 'some-token');
        logout(set);

        expect(set).toHaveBeenCalledWith({ isAuthenticated: false });
        expect(localStorage.getItem('token')).toBe(null);
        expect(httpClientUtil.setToken).toHaveBeenCalledWith(null);
    });
});
