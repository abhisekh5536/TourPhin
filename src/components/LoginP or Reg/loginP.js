import React, { useState } from 'react';
import "./loginPage.css";
import supabase from "../../helper/supabaseClient";
import {Link, useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false); // Add error state

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        setError(false); // Reset error state

        const{ data, error: supabaseError } = await supabase.auth.signInWithPassword({
            email:email,
            password:password,
        });

        if(supabaseError){
            setMessage(supabaseError.message);
            setError(true); // Set error state to true
            setEmail("");
            setPassword("");
            return;
        }
        if(data) {
            navigate("/profile");
            return null;
        }
    };
    return (
        <section className="section">
            <div className="super">
                <h1>Login</h1>
                {message && <div className={error ? "error-message" : "success-message"}>{message}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                        type="email"
                        placeholder='Email'
                        required
                    />
                    <input
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        type="password"
                        placeholder='Password'
                        required
                    />
                    <button type='submit' className="login-btn">
                        Login <i className="fas fa-sign-in-alt"></i>
                    </button>
                    <span className="Already-hv-Acc">Don't have an account?
                        <Link to="/signUp" className="login-link"> Sign up</Link>
                    </span>
                </form>
            </div>
        </section>
    );
}

export default LoginPage;