//AuthState
export interface AuthState {
    isAuthenticated: boolean;
    login: (username: string, password: string, rememberMe: boolean) => Promise<void>;
    logout: () => void;
};