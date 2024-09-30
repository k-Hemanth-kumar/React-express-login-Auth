import React, { useState } from 'react';
import { LoginAuth } from '../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ success: true });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
        if (form.checkValidity() === false || password.length<6) {
            console.log('Form is invalid');
            event.stopPropagation();
        } else {
            console.log('Form submitted successfully!');
            // You can call LoginAuth or any other function here
            const response=LoginAuth(email,password);
            setMessage(response);
        }
    
        form.classList.add('was-validated');
  };

  return (
    <div className="position-fixed top-50 start-50 translate-middle" style={{ zIndex: 1050 }}>
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
              <form method="POST" onSubmit={handleSubmit} id="login-validation" noValidate>
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
                  {!message.success && message.email && (
                    <div className="alert alert-danger" role='alert' style={{ '--bs-alert-padding': '.3rem' }}>
                      {message.email}
                    </div>
                  )}
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
                  {!message.success && message.password && (
                    <div className="alert alert-danger" role='alert' style={{ '--bs-alert-padding': '.3rem' }}>
                      {message.password}
                    </div>
                  )}
                </div>

                <div className="mb-5">
                  <button className="btn btn-primary w-100" type="submit">Signin</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
