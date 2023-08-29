import React from "react";
import { Link } from 'react-router-dom';


const Nav: React.FC = () => {
  return (
    <nav className="">
      <Link to="http://localhost:3000/"> 
         <h1 className="bg-transparent text-3xl font-semibold ">Where in the world?</h1>
          </Link>
    </nav>
  );
};

export default Nav;
