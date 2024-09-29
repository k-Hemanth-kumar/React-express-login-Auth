import React, { useState } from "react";
import { LoginAuth } from "../services/authService";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
    
        const form = event.target; // Get the current form element
    
        // Check form validity
        if (form.checkValidity() === false) {
            // If the form is invalid, prevent submission
            event.stopPropagation(); // Stop further propagation of the event
            console.log('Form is invalid');
        } else {
            // If the form is valid, show a success message
            console.log('Form submitted successfully!');
            LoginAuth(email,password);
        }
    
        // Add Bootstrap validation class to trigger validation styling
        form.classList.add('was-validated');
    };
    
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-12">
                <div className="card card-container mx-auto" style={{ width: '350px' }}>
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card mx-auto mt-5"
                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                    />
                    <div className="card-body">
                        <form action="/auth/login" method="POST" onSubmit={handleSubmit} id="login-validation" noValidate>
                            <div className="form-group mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder=" Email"
                                    value={email}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please provide your Username/Email.
                                </div>
                            </div>
    
                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    autoComplete="off"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please provide a password.
                                </div>
                            </div>
    
                            <div className="mb-5">
                                <button className="btn btn-primary w-100" type="submit">Signin</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
    
}