import Nav from "./components/Nav";
import Home from "./pages/Home";
import FullCountry from "./pages/FullCountry";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import ToggleDarkMode from "./components/ToggleDarkMode";

const App: React.FC = () => {
  return (
    <Router>
      <div >
        <div className="flex items-center justify-between pt-5 pb-5 pl-14 pr-14 border-b-2 border-gray-200">
        <Nav />
        <ToggleDarkMode / >
        </div>
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/country/:countryName" element={<FullCountry />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
