import  {useState, useEffect } from "react";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";

const ToggleDarkMode = () => {
  const [dark, setDark] = useState(false);
  const divboxElement = document.querySelector(".outline-none");
  const dropdownFilter = document.querySelector(".dropdown");
  const toggleDarkMode = () => {
    setDark(prevDark => !prevDark);
  };

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark-mode");
      divboxElement.classList.add("transparent");
      dropdownFilter.classList.add("styledDropdown");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [dark]);

  return (
    <div>
      <button onClick={toggleDarkMode} className="flex items-center gap-3">
        {dark ? <MdDarkMode /> : <MdOutlineDarkMode />}
        <span className="font-medium">Dark Mode</span>
      </button>
    </div>
  );
};

export default ToggleDarkMode;
