import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// TypeScript declaration for loading timeout
declare global {
  interface Window {
    __loadingTimeout?: ReturnType<typeof setTimeout>;
  }
}

// Clear fallback timeout and mark app as loaded
if ((window as any).__fallbackTimeout) {
  clearTimeout((window as any).__fallbackTimeout);
}
document.body.classList.add('app-loaded');

createRoot(document.getElementById("root")!).render(<App />);
