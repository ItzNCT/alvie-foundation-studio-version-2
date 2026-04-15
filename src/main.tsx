import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./lib/lenis"; // side-effect: starts Lenis RAF loop globally

createRoot(document.getElementById("root")!).render(<App />);
