import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import supabase from '../../helper/supabaseClient';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setIsAuthenticated(!!user);
            } catch (error) {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#121212',
                color: '#ffd29c'
            }}>
                <div>
                    <div style={{ fontSize: '40px', textAlign: 'center',
                        marginBottom: '15px'}}>
                            <i className='fas fa-spinner fa-spin'></i>
                        </div>
                            <p>Checking Authentication...</p>
                    </div>
            </div>
        );
    }
    if(!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet/>;
};
export default ProtectedRoute;