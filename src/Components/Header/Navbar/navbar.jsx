// Navbar.jsx

import React, { useEffect, useRef, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { ToastContainer } from 'react-toastify';
import Search from "../../Search";
import {
  FaHome,
  FaUtensils,
  FaShoppingBag,
  FaSearch,
  FaInfoCircle,
  FaEnvelope,
  FaFolderOpen,
  FaShopify,
  FaShoppingCart, FaUser
} from "react-icons/fa";
import Dropdown from "../../Dropdown";
import Input from "../../Input";
import "./navbar.css";
import Button from "../../Button";
import { useUserData } from "../../UserAuthentication(ContextApi)";
import { RemoveCookie } from "../../Cookies";
import index from "../../API";
import { Link } from "react-router-dom";
function Navbar() {
  const { loader, APIcall } = index();
  const { userInfo, fetchData } = useUserData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState(window.innerWidth);
  const smallScreenMenu = useRef();
  const [bakeries, setBakeries] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories,setCategories]=  useState([])
  
  useEffect(() => {
    APIcall('/bakery', 'GET')
      .then((data) => {

        setBakeries(data.data);

      })
      APIcall('/category', 'GET')
      .then((data) => {

        setCategories(data.data);

      })
    APIcall('/products', 'GET')
      .then((data) => {

        setProducts(data.data);

      })
    const handleResize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);


  }, []);

  useEffect(() => {

    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size, menuOpen]);

  const menuToggleHandler = () => {
    smallScreenMenu.current.classList.toggle("hidden");
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    APIcall('/logout-user', 'POST').then((data) => {

      if (data.success) {
        RemoveCookie();
        fetchData();
      }else{
        RemoveCookie();
        fetchData();
      }
    })
  }



  return (
    <>
      {size > 768 ? (
        <div className="flex items-center justify-between px-6 py-2 pt-4 border-b border-grey-600 ; ">
          <div className="w-70px">
            <img src="/myLogo.png" alt="" className="h-10" />
          </div>

          <div className="flex-grow flex px-5 items-center justify-center">
            <Search products={products} bakeries={bakeries} />  
            <FaSearch className="nav-icon ml-2" />
          </div>

          <div className="flex  justify-end items-center">
            <ul className="flex space-x-4">
              <li>
                <Link className="nav-link" to="/cart">
                  <FaShoppingCart className="nav-icon" />
                </Link>
              </li>
              {
                userInfo.user.id && (<li>
                  <Link className="nav-link" to="/profile">
                    <FaUser className="nav-icon" />
                  </Link>
                </li>)
              }
            </ul>

            {!(userInfo.token && userInfo.user) ? (
              <>
                <Link to={"/login"} ><button className="btn__login ml-4">Login</button></Link>
                <Link to={"/Signup"} ><Button className="ml-2">Register</Button></Link>
              </>
            ) : (
              <>
                {userInfo.user.isBakeryRegistered ? (
                  <Link to={"/bakery"} ><Button className="ml-2">Store</Button></Link>
                ) : (
                  <Link to={"/register-bakery"} ><Button className="ml-2">Register Bakery</Button></Link>
                )}
                <Button className="ml-2" onClick={handleLogout} >Logout</Button>
              </>
            )}



          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between px-6 py-2 pt-4 border-b border-grey-600 ; ">
          <div className="w-70px">
            <img src="./src/assets/images/myLogo.PNG" alt="" className="h-10" />
          </div>
          <div className="flex gap-2 items-center">
            <a href="#">
              <FaSearch className="nav-icon ml-2  h-16 " />
            </a>
            <Link to="/cart">
              <FaShoppingCart className="nav-icon" />
            </Link>
            <div className="header__content__toggle">
              {!menuOpen ? (
                <BiMenuAltRight onClick={menuToggleHandler} />
              ) : (
                <AiOutlineClose onClick={menuToggleHandler} />
              )}
            </div>
          </div>
        </div>
      )}{" "}
      <div ref={smallScreenMenu} className={` ${size < 768 ? " hidden" : ""}`}>
        <nav className={"header__content__nav"}>
          <ul className="border-b border-grey-600">
            <li>
              <Link to="/" className="nav-link " >
                <FaHome className="nav-icon" />
                Home
              </Link>
            </li>
            <li>
              <Dropdown
                trigger={
                  <a className="nav-link">
                    <FaFolderOpen className="nav-icon" />
                    <div className="flex items-center gap-1">
                      Categories <IoIosArrowDown />
                    </div>
                  </a>
                }
              >
                <div className="py-2 bg-white w-40 text-center">               {categories.slice(0, 5).map((category) => (
                    <Link to={`/products?category=${category.name}`} key={category.id} className=" text-left">
                      {category.name}
                      <hr /></Link>

                  ))}
                  <Link to={`/products`} className=" text-left">
                    View All
                    <hr /></Link>
                </div>
              </Dropdown>
            </li>
            <li>
              <Dropdown
                trigger={
                  <a className="nav-link">
                    <FaShopify className="nav-icon" />
                    <div className="flex items-center gap-1">
                      Bakeries <IoIosArrowDown />
                    </div>
                  </a>
                }
              >
                <div className="py-2  bg-white  w-40 text-center">
                  {bakeries.slice(0, 5).map((bakery) => (
                    <Link to={`/bakery/${bakery.id}`} key={bakery.id} className=" text-left hover:bg-slate-100">
                      {bakery.business_name}
                      <hr /></Link>

                  ))}
                  <Link to={`/bakeries`} className=" text-left hover:bg-slate-100">
                    View All
                    <hr /></Link>
                </div>
              </Dropdown>
            </li>
            <li>
              <a className="nav-link" href="#">
                <FaInfoCircle className="nav-icon" />
                About
              </a>
            </li>
            <li>
              <a className="nav-link" href="#">
                <FaEnvelope className="nav-icon" />
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
        {size < 768 && (
          <div className="flex my-2">
            <Link to={"/login"} ><button onClick={menuToggleHandler} className="btn__login ml-4">Login</button></Link>
            <Link to={"/Signup"} >
              <button onClick={menuToggleHandler}><Button className="ml-2">Register</Button></button></Link>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default Navbar;
