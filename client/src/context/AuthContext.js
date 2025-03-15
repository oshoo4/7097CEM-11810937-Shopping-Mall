import React, { createContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token });
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await apiService.login(username, password);
            localStorage.setItem('token', response.token);
            setUser({ token: response.token });
            setError(null);
            return true;
        } catch (err) {
            setError(err);
            return false;
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await apiService.register(username, email, password);
            localStorage.setItem('token', response.token);
            setUser({ token: response.token });
            setError(null);
            return true;

        } catch (err) {
            setError(err);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setShouldRedirect(true);
    };

    const resetShouldRedirect = () => {
      setShouldRedirect(false);
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, error, shouldRedirect, resetShouldRedirect }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };