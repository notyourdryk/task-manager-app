import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import "./style.css";
import { Link } from "react-router-dom";

export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const handleUserNameChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setUsername(ev.target.value);
    }
    const handlePasswordChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setPassword(ev.target.value);
    }

    const handleLogin = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
    }

    useEffect(() => {
        setIsDisabled(!(username && password));
    }, [username, password]);
    return (<section>
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
            <label>Username</label>
            <input value={username} onChange={handleUserNameChange} name="username" type="text"/>
            <label>Password</label>
            <input name="password" onChange={handlePasswordChange} type="password"/>
            <button type="submit" disabled={isDisabled}>Login</button>
            <Link to="/register">Create account</Link>
        </form>
    </section>)
}