//AuthState
export interface AuthState {
    isAuthenticated: boolean;
    authenticate: (toAuthenticate: boolean) => void;
    login: (username: string, password: string, rememberMe: boolean) => Promise<void>;
    signup: (username: string, password: string) => Promise<void>;
    logout: () => void;
};