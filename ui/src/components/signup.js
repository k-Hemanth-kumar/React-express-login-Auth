import { useState } from 'react';
import { registerAuth } from '../services/authService';

export default function Signup(){
    const [credentials, setCredentials] = useState({});
    const [message, setMessage] = useState({});

    const handleInputChange = (event) => {
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [event.target.name]: event.target.value
        }));
    };

    const handleSignupSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        if (form.checkValidity() === false) {
            console.log('Form is invalid');
            event.stopPropagation();
        } else {
            console.log('Form submitted successfully!');
            // You can call LoginAuth or any other function here
            const response=registerAuth(credentials);
            setMessage(response);
        }
    
        form.classList.add('was-validated');
    };

    return (
        <div className="-flex justify-content-center align-items-center min-vh-100">
            <div className="col-12">
                <div className="card card-container mx-auto" style={{width:'350px'}}>
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card mx-auto mt-5"
                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                    />
                    <div className="card-body">
                        <form onSubmit={handleSignupSubmit} id="signup-validation" noValidate>
                            <div className="form-group mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="form-control"
                                    placeholder="Username"
                                    value={credentials.username || ''} // Avoid uncontrolled input warning
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please enter your Username.
                                </div>
                                {!message.success && message.username && (
                                    <div className="invalid-feedback">
                                        {message.username}
                                    </div>
                                )}
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={credentials.email || ''} // Avoid uncontrolled input warning
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please enter your email.
                                </div>
                                {!message.success && message.email && (
                                    <div className="invalid-feedback">
                                        {message.email}
                                    </div>
                                )}
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={credentials.password || ''} // Avoid uncontrolled input warning
                                    autoComplete="off"
                                    onChange={handleInputChange}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please provide a password.
                                </div>
                                {!message.success && message.password && (
                                    <div className="invalid-feedback">
                                        {message.password}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <button className="btn btn-primary w-100" type="submit">
                                    SignUp
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

