import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { signOut } from "../api/internal";
import { resetUser } from "../store/UserSlice";
import { useDispatch } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.user.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    dispatch(resetUser());
  };

  return (
    <>
      {/* <nav className=" flex justify-between items-center mx-auto my-10 lg:my-20 w-9/12 bg-slate-500"> */}
      <nav className="flex justify-between items-center  bg-slate-700 p-8 lg:px-36 lg:py-12 lg:text-lg">
        <NavLink className="font-bold text-2xl">Crypto Mine</NavLink>
        <div className="hidden md:flex md:space-x-6 lg:space-x-10">
          <NavLink
            className={({ isActive }) =>
              `hover:text-slate-500 p-1 ${
                isActive ? "font-bold" : "text-slate-300"
              }`
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `hover:text-slate-500 p-1 ${
                isActive ? "font-bold" : "text-slate-300"
              }`
            }
            to="/crypto"
          >
            CryptoCurrencies
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `hover:text-slate-500 p-1 ${
                isActive ? "font-bold" : "text-slate-300"
              }`
            }
            to="/blogs"
          >
            Blogs
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `hover:text-slate-500 p-1 ${
                isActive ? "font-bold" : "text-slate-300"
              }`
            }
            to="/submit"
          >
            Submit a Blog
          </NavLink>

          {(isAuth && (
            <NavLink
              className={({ isActive }) =>
                `hover:text-slate-500 ${
                  isActive ? "font-bold" : "text-slate-300"
                }`
              }
            >
              <button
                className="bg-red-900 px-4 py-1 rounded-lg"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </NavLink>
          )) || (
            <div className="space-x-4">
              <NavLink
                className={({ isActive }) =>
                  `hover:text-slate-500 ${
                    isActive ? "font-bold" : "text-slate-300"
                  }`
                }
                to="/login"
              >
                <button
                  className="bg-red-900 px-4 py-1 rounded-lg"
                  onClick={(event) => console.log("I got clicked")}
                >
                  Log In
                </button>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `hover:text-slate-500 ${
                    isActive ? "font-bold" : "text-slate-300"
                  }`
                }
                to="/signup"
              >
                <button className="bg-slate-900 px-3 py-1 rounded-lg">
                  Sign Up
                </button>
              </NavLink>
            </div>
          )}
        </div>
        <button className="md:hidden" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-4 bg-slate-900   p-5">
          <NavLink
            className={({ isActive }) =>
              `hover:text-slate-500 ${
                isActive ? "font-bold" : "text-slate-300"
              }`
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `hover:text-slate-500 ${
                isActive ? "font-bold" : "text-slate-300"
              }`
            }
            to="/crypto"
          >
            CryptoCurrencies
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `hover:text-slate-500 ${
                isActive ? "font-bold" : "text-slate-300"
              }`
            }
            to="/blogs"
          >
            Blogs
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `hover:text-slate-500 ${
                isActive ? "font-bold" : "text-slate-300"
              }`
            }
            to="/submit"
          >
            Submit a Blog
          </NavLink>
          {(isAuth && (
            <NavLink
              className={({ isActive }) =>
                `hover:text-slate-500 ${
                  isActive ? "font-bold" : "text-slate-300"
                }`
              }
            >
              <button
                className="bg-red-900 px-4 py-1 rounded-lg"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </NavLink>
          )) || (
            <div className="space-x-4">
              <NavLink
                className={({ isActive }) =>
                  `hover:text-slate-500 ${
                    isActive ? "font-bold" : "text-slate-300"
                  }`
                }
                to="/login"
              >
                <button
                  className="bg-red-900 px-4 py-1 rounded-lg"
                  onClick={(event) => console.log("I got clicked")}
                >
                  Log In
                </button>
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  `hover:text-slate-500 ${
                    isActive ? "font-bold" : "text-slate-300"
                  }`
                }
                to="/signup"
              >
                <button className="bg-slate-900 px-3 py-1 rounded-lg">
                  Sign Up
                </button>
              </NavLink>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
