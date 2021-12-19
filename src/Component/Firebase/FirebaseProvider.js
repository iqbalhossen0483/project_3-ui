import React, { createContext } from 'react';
import Firebase from './Firebase';

export const AuthContex = createContext();

const FiebaseProvider = ({ children }) => {
    const auth = Firebase();
    return <AuthContex.Provider value={auth}>
        {children}
    </AuthContex.Provider>
};

export default FiebaseProvider;