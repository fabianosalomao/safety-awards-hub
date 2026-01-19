import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// TypeScript declaration for loading timeout
declare global {
  interface Window {
    __loadingTimeout?: ReturnType<typeof setTimeout>;
  }
}

// Clear loading timeout and mark app as loaded
if (window.__loadingTimeout) {
  clearTimeout(window.__loadingTimeout);
}
document.body.classList.add('app-loaded');

createRoot(document.getElementById("root")!).render(<App />);
