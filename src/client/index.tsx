import "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import React from "react";
import "./style.css";

const mountPoint = document.getElementById("app");
if (!mountPoint)
    throw new Error("Could not find mount point");

const root = createRoot(mountPoint);
root.render(<App />);

