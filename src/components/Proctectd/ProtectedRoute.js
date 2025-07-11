import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import supabase from '../../helper/supabaseClient';

const ProtectedRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const publicRoutes = ['/', '/home', 'about-us'];

    useEffect(() => {
        // Skip auth check for public routes
        if (publicRoutes.includes(location.pathname)) {
            setIsAuthenticated(true);
            setLoading(false);
            return;
        }

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
    }, [location]);

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
    
    if(!isAuthenticated && !publicRoutes.includes(location.pathname)) {
        return <Navigate to="/login" replace />;
    }
    
    return <Outlet/>;
};

export default ProtectedRoute;