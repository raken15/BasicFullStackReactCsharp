import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // Existing state for the counter
  const [countUI, setCount] = useState(0);

  // New state for managing backend data
  const [dataUI, setData] = useState<any>(null);
  const [loadingUI, setLoading] = useState(false);
  const [errorUI, setError] = useState("");

  // Function to fetch data when the button is clicked
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      // Make the GET request to your C# backend endpoint
      const response = await fetch("http://localhost:5194/api/messages");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Raviv's Vite + React + Typescript Frontend</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {countUI}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* Button to trigger the GET request */}
      {/* Disable the button if fetch is in progress */}
      {/* to prevent multiple simultaneous requests */}
      <button onClick={fetchData} disabled={loadingUI}>
        {loadingUI ? "Processing request..." : "Fetch Data from Backend"}
      </button>

      {/* Display data or error message */}
      <div>
        {loadingUI ? (
          <div>Loading...</div>
        ) : errorUI ? (
          <div>Error: {errorUI}</div>
        ) : dataUI ? (
          <pre>{JSON.stringify(dataUI, null, 2)}</pre>
        ) : (
          <div>No data loaded. Click the button to fetch data.</div>
        )}
      </div>
    </>
  );
}

export default App;