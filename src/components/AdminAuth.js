import React from 'react';
import './AdminAuth.css';

function AdminAuth({ onLogin }) {
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginSuccessful = onLogin(password);
        if (!loginSuccessful) {
            setError('Incorrect Password. Please try again.');
            setPassword('');
        } else {
            setError('');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="btn-submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default AdminAuth;