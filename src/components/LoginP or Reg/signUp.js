import React, { useState } from "react";
import "./loginPage.css";
import supabase from "../../helper/supabaseClient";
import {Link} from 'react-router-dom';

// for the register functionality

const SignUp = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword:'',
      role:'user'
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage('');
      setError('');

      // Validate passwords match
      if(formData.password !== formData.confirmPassword){
        setError('Passwords do not match');
        return;
      }

      try {
        // Call Supabase auth signup
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password
        });

        if (error) {
          setError(error.message);
          return;
        }

        // Success message
        setMessage('Sign up successful! Please check your email for verification.');
        console.log('User registered:', data);
        
        // Reset form after successful signup
        setFormData({
          email: '',
          password: '',
          confirmPassword: ''
        });
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
        console.error('Signup error:', err);
      }
    }
    try {
      // Insert user profile into the profiles table
      const { error } =  supabase
        .from('profiles')
        .insert([
          { 
            full_name: formData.fullName,
            role: formData.role
          }
        ]);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Profile insert error:', err);
    }


    return (
    <section className="section">
        <div className="super">
            <h1>Sign Up</h1>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Email Address" 
                  required
                />
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  placeholder="Password" 
                  minLength={8}
                  required
                />
                <input 
                  type="password" 
                  name="confirmPassword" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  placeholder="Confirm Password" 
                  required
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="user">User</option>
                  <option value="guide">Guide</option>
                  <option value="admin">Admin</option>
                </select>
                <button type="submit" className="login-btn">
                    Sign Up <i className="fas fa-user-plus"></i>
                </button>
                <span className="Already-hv-Acc">Already have an account?
                  <Link to="/login" className="login-link"> Log in</Link>
                </span> 
            </form>
        </div>
    </section>
    );
}

export default SignUp;