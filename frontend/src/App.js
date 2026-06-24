import React, { useState } from "react";
import axios from "axios";
import ResponseCard from "./ResponseCard";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const arr = input
        .split("\n")
        .map(item => item.trim())
        .filter(item => item !== "");

      const res = await axios.post(
        "http://localhost:3000/bfhl",
        {
          data: arr
        }
      );

      setResponse(res.data);
    } catch (err) {
      alert("Error fetching response");
    }

    setLoading(false);
  };

  return (
    <div className="container">

      <div className="header">
        <h1>Bajaj Hierarchy Visualizer</h1>
        <p>Full Stack Assignment</p>
      </div>

      <div className="card">

        <h2>Input Edges</h2>

        <textarea
          rows="12"
          placeholder="A->B
A->C
B->D"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={handleSubmit}>
          {loading ? "Processing..." : "Generate Hierarchy"}
        </button>

      </div>

      {response && <ResponseCard data={response} />}

    </div>
  );
}

export default App;