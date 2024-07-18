import React, { useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../../pages/Search/Search";
import LoginModal from "../Modal/LoginModal";

export const NavbarWithSearch = () => {
  const [showAccount, setShowAccount] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handelShowAccount = () => {
    setShowAccount(!showAccount);
  };
  const [showCountry, setShowCountry] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleShowCountry = () => {
    setShowCountry(!showCountry);
  };
  // Tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setListSearchData([]);
    }
  };

  const [listSearchData, setListSearchData] = useState([]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://phimapi.com/v1/api/tim-kiem?keyword=${searchTerm}&limit=${30}`
      );
      console.log(response);
      if (response.data.data.items) {
        console.log(response.data.data.items);
        setListSearchData(response.data.data.items);
        setShowSearch(true);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  const [showSearch, setShowSearch] = useState(false);
  const handleMovieClick = () => {
    setShowSearch(false);
  };
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 640 && setOpenNav(false)
    );
  }, []);
  const [loginModal, setLoginModal] = useState(false);
  const openLoginModal = () => {
    setLoginModal(!loginModal)
    console.log("vào ko");
  };

  const closeModalLogin = () => {
    setLoginModal(false); // Hàm đóng modal
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to={"/"} className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to={"/phim-bo"} className="flex items-center">
          Phim bộ
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link to={"/phim-le"} className="flex items-center">
          Phim lẻ
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <a href="#" className="flex items-center">
          Thể loại
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <button
          onClick={toggleShowCountry}
          className=" flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white"
        >
          Quốc gia
        </button>
        {showCountry && (
          <div
            className="absolute right-[43%] z-1 mt-[21%] w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <Link className="block  px-4 py-2 text-sm text-gray-700 hover:bg-slate-200">
              Việt nam
            </Link>
            <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200">
              Trung quốc
            </Link>
            <Link className="block  px-4 py-2 text-sm text-gray-700 hover:bg-slate-200">
              Mỹ
            </Link>
            <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200">
              Nhật Bản
            </Link>
            <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200">
              Hàn Quốc
            </Link>
            <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200">
              Thái Lan
            </Link>
          </div>
        )}
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium cursor-pointer"
        onClick={handelShowAccount}
      >
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 8.5C16 10.6217 15.1571 12.6566 13.6569 14.1569C12.1566 15.6571 10.1217 16.5 8 16.5C5.87827 16.5 3.84344 15.6571 2.34315 14.1569C0.842855 12.6566 0 10.6217 0 8.5C0 6.37827 0.842855 4.34344 2.34315 2.84315C3.84344 1.34285 5.87827 0.5 8 0.5C10.1217 0.5 12.1566 1.34285 13.6569 2.84315C15.1571 4.34344 16 6.37827 16 8.5ZM10 5.5C10 6.03043 9.78929 6.53914 9.41421 6.91421C9.03914 7.28929 8.53043 7.5 8 7.5C7.46957 7.5 6.96086 7.28929 6.58579 6.91421C6.21071 6.53914 6 6.03043 6 5.5C6 4.96957 6.21071 4.46086 6.58579 4.08579C6.96086 3.71071 7.46957 3.5 8 3.5C8.53043 3.5 9.03914 3.71071 9.41421 4.08579C9.78929 4.46086 10 4.96957 10 5.5ZM8 9.5C7.0426 9.49981 6.10528 9.77449 5.29942 10.2914C4.49356 10.8083 3.85304 11.5457 3.454 12.416C4.01668 13.0706 4.71427 13.5958 5.49894 13.9555C6.28362 14.3152 7.13681 14.5009 8 14.5C8.86319 14.5009 9.71638 14.3152 10.5011 13.9555C11.2857 13.5958 11.9833 13.0706 12.546 12.416C12.147 11.5457 11.5064 10.8083 10.7006 10.2914C9.89472 9.77449 8.9574 9.49981 8 9.5Z"
            fill="#90A4AE"
          />
        </svg>
        <a  className="flex items-center ">
          Account
        </a>
        {showAccount ? (
          <div
            className="absolute right-[32%] z-10 mt-[13%] w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabIndex="-1"
          >
            <a
               onClick={openLoginModal}
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-0"
            >
              Đăng nhập/Đăng kí
            </a>
            
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-1"
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-2"
            >
              Sign out
            </a>
          </div>
        ) : null}
      </Typography>
    </ul>
  );

  return (
    <>
      <Navbar className="mx-auto bg-gray-700 max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between text-blue-gray-900 ">
          <Link to={"/"} className="">
          <img
            className="h-10 w-auto"
            src="/src/assets/logo1.png"
            alt="Pro phim"
          />
          </Link>
          <div className="hidden lg:block">{navList}</div>
          <form
            onSubmit={handleSearchSubmit}
            className="hidden items-center gap-x-2 lg:flex "
          >
            <div className="relative flex w-full gap-2 md:w-max ">
              <Input
                value={searchTerm}
                onChange={handleSearchChange}
                type="search"
                placeholder="Search . . ."
                containerProps={{
                  className: "min-w-[288px] text-white",
                }}
                className=" !border-t-blue-gray-300 pl-9 placeholder:text-white-500 focus:!border-blue-gray-300"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className="!absolute left-3 top-[13px]"></div>
            </div>
            <Button type="submit" size="md" className="rounded-lg ">
              Search
            </Button>
          </form>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <MobileNav open={openNav}>
          <div className="container mx-auto">
            {navList}
            <div className="flex flex-col gap-x-2 sm:flex-row sm:items-center">
              <div className="relative w-full gap-2 md:w-max">
                <Input
                  type="search"
                  placeholder="Search"
                  containerProps={{
                    className: "min-w-[288px]",
                  }}
                  className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <div className="!absolute left-3 top-[13px]">
                  <svg
                    width="13"
                    height="14"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                      fill="#CFD8DC"
                    />
                    <path
                      d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                      stroke="#CFD8DC"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <Button size="md" className="mt-1 rounded-lg sm:mt-0">
                Search
              </Button>
            </div>
          </div>
        </MobileNav>
      </Navbar>
      {showSearch && listSearchData.length > 0 && (
        <Search
          listSearchData={listSearchData}
          handleMovieClick={handleMovieClick}
        />
      )}
      <LoginModal isOpen={loginModal} onClose={closeModalLogin}/>
    </>
  );
};
