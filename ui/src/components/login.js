import React, { useState } from "react";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="col-12">
            <div className="card card-container mx-auto" style={{ width: '350px' }}>
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card mx-auto mt-5"
                    style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
                <div className="card-body">
                    <form action="/" method="POST" onSubmit={() => { }}>

                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Username/Email</label>
                            <input type="text" className="form-control" id="email" name="email" placeholder="Username or Email" value={email} autoComplete="off" onChange={(e) => { setEmail(e.target.value) }} required />
                        </div>
                        <div className="form-group mb-4">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={password} autoComplete="off" onChange={(e)=>setPassword(e.target.value)} required />
                        </div>
                        <div className="mb-5">
                            <button className="btn btn-primary w-100" type="submit">Signin</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}