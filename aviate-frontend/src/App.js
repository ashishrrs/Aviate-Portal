import React from "react";
import "./App.css";

import { Link } from "react-router-dom";
import styles from "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create/Create";
import View from "./components/View/View";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Home /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view/:userId" element={<View />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
