import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../Hooks/useLogout";
import { useAuthContext } from "../Hooks/useAuthContext";


function Navbar() {
  
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }
  
  return (
    <div>
      <header className="bg-[#fff]">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-6">
          <Link to="/">
            <h1 className="font-bold text-3xl">Gym Partner</h1>
          </Link>
          <nav className="mt-4 md:mt-0">
            { user && (
            <div className="flex items-center space-x-4">
              <span className="text-blue-600">{user.email}</span>
              <button className="bg-red-600 text-white p-2 rounded-lg"
               onClick={handleClick}> Logout</button>
            </div>
            )}


            {!user && (
            <div className="flex space-x-5">
              <Link to='/login' className="bg-[#1aac83] text-white px-2 py-1 border-1 rounded-md hover:bg-[#37a082]">Login </Link>
              <Link to='/signup' className="bg-[#1aac83] text-white px-2 py-1 border-1 rounded-md hover:bg-[#37a082]">Signup</Link>
            </div> 
           )}
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Navbar;

