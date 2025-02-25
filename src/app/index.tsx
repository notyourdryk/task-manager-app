import React, { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { MainPage, TodoPage, NotePage, LoginPage, RegistrationPage } from "./pages";

import "../style.css";
import { fetchNotesEx, fetchTodosEx } from "./model";
import { ProtectedRoute } from "./pages/components";

const basePath = window.location.pathname.replace(/(\/[^/]+)$/, "");

export const App = () => {
    useEffect(() => {
        void fetchTodosEx();
        void fetchNotesEx();
    }, []);

    return (
        <div className="app">
            <h2>Task manager app</h2>
            <BrowserRouter basename={basePath}>
                <nav className="nav-list__container">
                    <ul className="nav-list">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/todo">Todo's</Link></li>
                        <li><Link to="/note">Note's</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/login" Component={ LoginPage }/>
                    <Route path="/register" Component={ RegistrationPage } />
                    <Route element={<ProtectedRoute />}>
                        <Route index path="/" Component={ MainPage }/>
                        <Route path="/todo" Component={ TodoPage }/>
                        <Route path="/note" Component={ NotePage }/>
                    </Route>
                </Routes>
            </BrowserRouter>
            <footer className="app__footer">
                Footer
            </footer>
        </div>
    );
};