import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/main";
import { TodoPage } from "./pages/todo";
import { NotePage } from "./pages/note";

import "../style.css";

export const App = () => {
    return (
        <div className="app">
            <h2>Task manager app</h2>
            <BrowserRouter>
                <nav className="nav-list__container">
                    <ul className="nav-list">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/todo">Todo's</Link></li>
                        <li><Link to="/note">Notes</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" Component={ MainPage }/>
                    <Route path="/todo" Component={ TodoPage }/>
                    <Route path="/note" Component={ NotePage }/>
                </Routes>
            </BrowserRouter>
            <footer className="app__footer">
                Footer
            </footer>
        </div>
    );
};