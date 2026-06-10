import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constants";
import { toast } from "react-toastify";
import { setUser } from "../../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (result.data.success) {
        toast.success("Logged Out")
        dispatch(setUser(null))
        navigate('/login')
      }
    } catch (error) {
      console.error("Logout Error:", error);

      toast.error(
        error?.response?.data?.message || "Logout failed"
      );
    }
  }

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-lg">
            L
          </div>
          <span className="text-xl font-semibold">Logo</span>
        </div>

        <div className="flex items-center gap-6">
          <ul className="hidden md:flex items-center gap-6 text-gray-300">
            {user && user?.role === "student" ? (
              <>
                <li className="hover:text-white cursor-pointer">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-white cursor-pointer">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-white cursor-pointer">
                  Browse
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-white cursor-pointer">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-white cursor-pointer">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-4">
              <Link to='/login'><button className="px-4 py-1 border border-gray-600 rounded-lg hover:bg-gray-800">
                Login
              </button></Link>
              <Link to='/signup'><button className="px-4 py-1 bg-indigo-600 rounded-lg hover:bg-indigo-700">
                Signup
              </button></Link>
            </div>
          ) : (
            <div className="relative">
              <img
                src={user?.profile?.profilePhoto}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setOpen(!open)}
              />

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg py-2">
                  {
                    user && user?.role==='student' && (<p className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                    <Link to='/profile'>View Profile</Link>
                  </p>)
                  }
                  <p onClick={logoutHandler} className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                    Logout
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;