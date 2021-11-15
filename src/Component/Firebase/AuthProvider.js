import React, { createContext } from 'react';
import useFirebase from './useFirebase';

export const AuthContex = createContext();
const AuthProvider = ({ children }) => {
    const auth = useFirebase();
    return <AuthContex.Provider value={auth}>
        {children}
    </AuthContex.Provider>
};

export default AuthProvider;