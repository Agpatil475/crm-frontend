import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext(); // Change variable name to be more meaningful

const AuthContextProvider = ({ children }) => {  // Use PascalCase naming
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get('http://localhost:4000/api/auth/verify', {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });
                    console.log(response);

                    if (response.data.success) {
                        setUser(response.data.user);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.log(error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

// Correct export
export const useAuth = () => useContext(UserContext);
export default AuthContextProvider;
