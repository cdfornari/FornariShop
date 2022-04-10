import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { FC, useReducer, useEffect } from 'react';
import { api } from '../../api';
import { iUser } from '../../interfaces';
import { AuthContext,authReducer } from './';

export interface AuthState {
    isLoggedIn: boolean;
    user?: iUser;
}

const initialState: AuthState = {
    isLoggedIn: false,
    user: undefined
}

export const AuthProvider: FC = ({children}) => {
    const [state,dispatch] = useReducer(authReducer, initialState);
    const {reload} = useRouter();

    const validateToken = async () => {
        if(!Cookies.get('token')) return;
        try {
            const {data} = await api.get('/user/validation')
            const {user,token} = data;
            Cookies.set('token',token,{expires: 7});
            dispatch({type:'[AUTH] Login',payload: user});
        } catch (error) {
            console.log(error);
            Cookies.remove('token');
            dispatch({type:'[AUTH] Logout'});
        }
    }

    useEffect(() => {
        validateToken();
    }, [])

    const login = async(email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await api.post('/user/login', {email, password});
            const { token,user } = data;
            Cookies.set('token', token,{expires: 7});
            dispatch({
                type: '[AUTH] Login',
                payload: user
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const register = async(name: string, email: string, password: string): Promise<{hasError: boolean; message?: string}> => {
        try {
            const { data } = await api.post('/user/register', {name, email, password});
            const { token,user } = data;
            Cookies.set('token', token,{expires: 7});
            dispatch({
                type: '[AUTH] Login',
                payload: user
            });
            return {
                hasError: false,
                message: 'Successfully registered'
            }
         } catch (error) {
            console.log(error)
            if(axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message: 'We could not register you at this time. Please try again later.'
            }
         }
    }

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('cart');
        Cookies.remove('address');
        Cookies.remove('country');
        reload();
    }

    return (
        <AuthContext.Provider value={{...state, login,register,logout}}>
            {children}
        </AuthContext.Provider>
    )
};