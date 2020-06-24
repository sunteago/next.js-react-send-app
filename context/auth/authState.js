import React, {useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import axiosClient from '../../config/axios';

import {AUTH_USER} from '../../types';

const initialState = {
    token: '',
    authenticated: null,
    user: null,
    message: null
};

const AuthState = ({children}) => {

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const createUser = async signupData => {
        console.log(signupData);
        try {
            const response = await axiosClient.post('/api/users', signupData);
            // dispatch({
            //     type: CREATE_USER
            // })
        } catch (err) {
            console.log(err)
        }
    }

    const authUser = name => {
        dispatch({
            type: AUTH_USER,
            payload: name
        })
    }

    return (
        <AuthContext.Provider value={{
            token: state.token,
            authenticated: state.authenticated,
            user: state.user,
            message: state.message,
            authUser,
            createUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthState;