//AuthState
export interface AuthState {
    isAuthenticated: boolean;
    authenticate: (toAuthenticate: boolean) => void;
    login: (username: string, password: string, rememberMe: boolean) => Promise<void>;
    logout: () => void;
};