import React, { useState } from 'react'
import logo from '../assets/logos/logo tranparent.png'
import { useSelector } from 'react-redux'; 
import { Link, NavLink, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux'; 
import { logout } from '../store/authSlice';
import authService from '../appwrite/auth';
import { Tooltip } from '@mui/material';
import SideBar from './SideBar';
import CircleProgress from './CircleProgress';
import BtnDialog from './BtnDialog';

import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
function Navbar() {
  const status = useSelector((state) => state.auth.status);
  const [loading,setLoading]=useState(false)
  const [isFocus, setisFocus] = useState(false)
  const navigate = useNavigate()
  const [searchText,setSearchText]=useState('')

  const dispatch = useDispatch();
  const handleLogout = () => {
    setLoading(true)
    authService.logout().then(() => {
      dispatch(logout());
      setLoading(false)
      navigate('/')
      navigate(0);
    });
  }

  const handleSearch = () => {
    console.log("loading")
    if (searchText) {
      navigate(`/search/${searchText}`)
      setSearchText('')
    }
  }
  
  return (
    <>
      <nav className="w-svw max-md:pt-0 max-md:pl-4 px-5  border lg:px-0 lg:pl-0">
        {/* upper layer */}
        <div className="w-full h-16 mt-1 pb-12  px-3 flex justify-between max-md:pr-0 max-md:justify-between lg:gap-5 ">
          <img
            src={logo}
            onClick={() => {
              navigate("/");
            }}
            alt="logo"
            className=" h-16 max-md:h-10 max-md:mt-2 cursor-pointer"
          />

          <div
            className={`outline  ${
              isFocus
                ? `outline-indigo-600 outline-2`
                : `outline-slate-400 outline-1`
            }  mt-1 h-fit px-2.5 w-96 py-1 max-md:mt-2 rounded-md outline-1 outline-offset-1 flex justify-between align-middle hover:outline-2 hover:outline-indigo-600 hover:outline-offset-1 max-md:outline-1 max-md:p-1  max-md:w-3/5 max-md:ml-3 `}
          >
            <svg
              onClick={handleSearch}
              className=" size-6 max-lg:hidden  mt-0.5 mr-2 fill-slate-400 cursor-pointer hover:fill-slate-500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z"></path>
            </svg>

            <input
              id="searchbar"
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch;
                }
              }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onSubmit={handleSearch}
              className={
                "max-md:text-sm  w-full rounded text-xl outline-offset-1 font-normal text-slate-600 bg-transparent focus:outline-none "
              }
              placeholder="Search   "
              onFocus={() => setisFocus(true)}
              onBlur={() => setisFocus(false)}
            ></input>
            <button  >
              <svg
                onClick={handleSearch}
                className=" size-6 lg:hidden  mt-0.5  fill-slate-400 cursor-pointer hover:fill-slate-500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z"></path>
              </svg>
            </button>
          </div>
          <div className="flex align-middle justify-center gap-2 ">
            <div className="p-0.5">
              {status ? (
                <div>
                  <div className="flex align-middle justify-center gap-2 max-lg:hidden">
                    <NavLink
                      to="/upload-post"
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "bg-indigo-500 rounded-md"
                            : "bg-indigo-600 rounded-md"
                        } `
                      }
                    >
                      <button className="bg-indigo-600  rounded-md  text-md font-semibold text-white h-fit py-2 px-3 gap-0.5  flex justify-between align-middle hover:bg-indigo-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          className="size-6 pt-[1px]"
                        >
                          <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"></path>
                        </svg>
                        Swap
                      </button>
                    </NavLink>
                    <NavLink
                      to="/my-posts"
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "bg-indigo-500 rounded-md "
                            : "bg-indigo-600 rounded-md"
                        } `
                      }
                    >
                      <Tooltip title="My Posts">
                        <button className="bg-indigo-600 inline-flex rounded-xl text-md font-semibold text-white h-fit py-2 px-3 gap-0.5  justify-between align-middle hover:bg-indigo-500">
                          <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="size-5 "
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M4 3H17L20.7071 6.70711C20.8946 6.89464 21 7.149 21 7.41421V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM12 18C13.6569 18 15 16.6569 15 15C15 13.3431 13.6569 12 12 12C10.3431 12 9 13.3431 9 15C9 16.6569 10.3431 18 12 18ZM5 5V9H15V5H5Z"></path>
                          </svg>
                        </button>
                      </Tooltip>
                    </NavLink>
                    <Link to="/">
                      <BtnDialog
                        color={1}
                        title="Log out"
                        btnIcon={
                          <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="size-6 pt-[1px]"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        }
                        icon={
                          <ExclamationCircleIcon
                            aria-hidden="true"
                            className="size-6 text-red-600"
                          />
                        }
                        btnTooltip="Log out"
                        classes="bg-red-600 hover:text text-md font-semibold text-white h-fit py-2 px-3 gap-1 rounded-md flex align-middle hover:bg-red-500"
                        confirmBtn="Log out"
                        btnText=""
                        description="Are you sure you want to log out? You will be signed out of your account, and any unsaved progress will be lost."
                        method={handleLogout}
                      />
                    </Link>
                    {loading ? <CircleProgress /> : null}
                  </div>
                  <div className=" lg:hidden justify-self-end ">
                    {/* sidebar  */}
                    <SideBar />
                  </div>
                </div>
              ) : (
                <Link to="login">
                  <Tooltip title="Log in">
                    <button className="bg-indigo-600 text-md font-semibold text-white h-fit py-2 px-5 gap-0.5 rounded-md flex justify-between align-middle max-sm:lg max-sm:mt-1 max-sm:ml-10 max-sm:px-2 hover:bg-indigo-500">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-5 pt-1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                        <polyline points="10 17 15 12 10 7"></polyline>
                        <line x1="15" y1="12" x2="3" y2="12"></line>
                      </svg>
                    </button>
                  </Tooltip>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* bottom layer */}

        <div className="w-full h-12 max-md:text-sm flex align-middle justify-start pt-1 pl-2 gap-2 text-md border-t overflow-x-auto hide-scrollbar">
          <li className="list-none">
            <NavLink
              to="/category/:cloth"
              className={({ isActive }) =>
                `${isActive ? "bg-gray-200" : "bg-white"} `
              }
            >
              <div className="h-fit w-fit bg-white font-semibold p-1.5 rounded-md hover:bg-gray-200 cursor-pointer">
                Cloth
              </div>
            </NavLink>
          </li>
          <li className="list-none">
            <NavLink
              to="category/:accessories"
              className={({ isActive }) =>
                `${isActive ? "bg-gray-200" : "bg-white"} `
              }
            >
              <div className="h-fit w-fit bg-white font-semibold p-1.5 rounded-md hover:bg-gray-200 cursor-pointer">
                Accessories
              </div>
            </NavLink>
          </li>
          <li className="list-none">
            <NavLink
              to="category/:home-&-kitchen"
              className={({ isActive }) =>
                `${isActive ? "bg-gray-200" : "bg-white"} `
              }
            >
              <div className="h-fit w-fit bg-white font-semibold p-1.5 rounded-md hover:bg-gray-200 cursor-pointer text-nowrap">
                Home & Kitchen
              </div>
            </NavLink>
          </li>
          <li className="list-none">
            <NavLink
              to="category/:electronics"
              className={({ isActive }) =>
                `${isActive ? "bg-gray-200" : "bg-white"} `
              }
            >
              <div className="h-fit w-fit bg-white font-semibold p-1.5 rounded-md hover:bg-gray-200 cursor-pointer text-nowrap">
                Electronics
              </div>
            </NavLink>
          </li>
          <li className="list-none">
            <NavLink
              to="category/:furniture"
              className={({ isActive }) =>
                `${isActive ? "bg-gray-200" : "bg-white"} `
              }
            >
              <div className="h-fit w-fit bg-white font-semibold p-1.5 rounded-md hover:bg-gray-200 cursor-pointer text-nowrap">
                Furniture
              </div>
            </NavLink>
          </li>
          <li className="list-none">
            <NavLink
              to="category/:books-&-stationery"
              className={({ isActive }) =>
                `${isActive ? "bg-gray-200" : "bg-white"} `
              }
            >
              <div className="h-fit w-fit bg-white font-semibold p-1.5 rounded-md hover:bg-gray-200 cursor-pointer text-nowrap">
                Books & Stationery
              </div>
            </NavLink>
          </li>
          <li className="list-none">
            <NavLink
              to="category/:toys-&-games"
              className={({ isActive }) =>
                `${isActive ? "bg-gray-200" : "bg-white"} `
              }
            >
              <div className="h-fit w-fit bg-white font-semibold p-1.5 rounded-md hover:bg-gray-200 cursor-pointer text-nowrap">
                Toys & Games
              </div>
            </NavLink>
          </li>
        </div>
      </nav>
    </>
  );
}

export default Navbar