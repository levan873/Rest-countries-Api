import Nav from "./components/Nav";
import Home from "./pages/Home";
import FullCountry from "./pages/FullCountry";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import useDarkSide from "./Hook/useDarkSide"; 
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";

const App: React.FC = () => {
  const [darkSide, toggleTheme] = useDarkSide();

  return (
    <Router>
      <div className={`dark:bg-gray-900 dark:text-white min-w-[560px] wrapper`}>
        <div className="dark:bg-gray-800 dark:border-none flex items-center justify-between pt-3 pb-3 pl-14 pr-14 border-b-2 border-gray-200">
          <Nav />
          <button onClick={toggleTheme} className="flex items-center gap-1">
            {darkSide ? <MdDarkMode /> : <MdOutlineDarkMode />}
            <span className="font-medium">Dark Mode</span>
          </button>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:countryName" element={<FullCountry />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
