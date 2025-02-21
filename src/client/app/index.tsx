import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/main";
import { TodoPage } from "./pages/todo";


export const App = () => {
    return (
        <>
            <h2 className="text-3xl bold underline">Task manager app</h2>
            <BrowserRouter>
            <section>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/todo">Todo's</Link></li>
                    </ul>
                </nav>
            </section>
                <Routes>
                    <Route path="/" Component={MainPage} />
                    <Route path="/todo" Component={TodoPage} />
                </Routes>
            </BrowserRouter>
        </>
    );
};