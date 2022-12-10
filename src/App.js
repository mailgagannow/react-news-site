import "./App.css";
import LoadingBar from "react-top-loading-bar";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

function App() {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar color="#f11946" progress={progress} />
        <Routes>
          <Route
            exact
            path="/"
            element={<News setProgress={setProgress} key="general" category="general" />}
          />
          <Route
            exact
            path="/sports"
            element={<News setProgress={setProgress} key="sports" category="sports" />}
          />
          <Route
            exact
            path="/business"
            element={<News setProgress={setProgress} key="business" category="business" />}
          />
          <Route
            exact
            path="/science"
            element={<News setProgress={setProgress} key="science" category="science" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
