import React from "react";
import "./loginPage.css";
import { Link } from "react-router-dom";

const loginPage = () => {
    return (
    <section className="section">
        <div className="super">
            <h1>Login</h1>
            <form>
                <input type="email" placeholder="Email Address" required/>
                <input type="password" placeholder="Password" required/>
                <button type="submit" className="login-btn">
                    Login <i className="fas fa-sign-in-alt"></i>
                </button>
            </form>
            <span className="Already-hv-Acc">Don't have an account? Create an account
                <Link to="/signUp" className="login-link"> Sign Up</Link>
            </span> 
        </div>
    </section>
    );
}

export default loginPage;