import { createContext } from 'react';
import { iUser } from '../../interfaces';

interface ContextProps {
    isLoggedIn: boolean;
    user?: iUser;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string }>;
    logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);