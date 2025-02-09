import { useState } from "react";
import reactLogo from "./assets/react.svg";
import appLogo from "/favicon.svg";
import PWABadge from "./PWABadge.tsx";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/example">Example</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div>
                <a href="https://vite.dev" target="_blank">
                  <img src={appLogo} className="logo" alt="app logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                  <img
                    src={reactLogo}
                    className="logo react"
                    alt="React logo"
                  />
                </a>
              </div>
              <h1>app</h1>
              <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </button>
                <p>
                  Edit <code>src/App.tsx</code> and save to test HMR
                </p>
              </div>
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>
              <PWABadge />
            </>
          }
        />
        <Route path="/example" element={<Example />} />
      </Routes>
    </Router>
  );
}

function Example() {
  return <h2>Example Page</h2>;
}

export default App;
