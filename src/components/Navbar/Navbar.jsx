import React, { useState } from "react";
import { TERipple } from "tw-elements-react";
import { CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { GiCoffeeCup } from "react-icons/gi";
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "../../pages/Search/Search";
import "./navbar.css"
import LoginModal from "../Modal/LoginModal";

const Navbar = () => {
  // console.log('Navbar received onSearch:', onSearch); // Thêm dòng này
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const showSide = () => {
    setShowSidebar(!showSidebar);
  };
  const [showCountry, setShowCountry] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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
      const response = await axios
        .get(
          `https://phimapi.com/v1/api/tim-kiem?keyword=${searchTerm}&limit=${12}`
        )
          console.log(response);
          if (response.data.data.items) {
            console.log(response.data.data.items);
            setListSearchData(response.data.data.items);
            setShowSearch(true)
          }
        
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  const [showSearch, setShowSearch] = useState(false);
  const handleMovieClick = () => {
    setShowSearch(false);
  };


  const [loginModal, setLoginModal] = useState(false);
  const openLoginModal = () => {
    setLoginModal(true)
  };

  const closeModalLogin = () => {
    setLoginModal(false); // Hàm đóng modal
  };

  return (
    <>
      <nav className="bg-gray-700  z-10 w-35 rounded-xl nav-container">
      <div className="menu-toggle" onClick={toggleMobileMenu}>
          &#9776;
        </div>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 nav-menu">
          
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-2 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-12 w-auto"
                  src="/src/assets/logo1.png"
                  alt="Your Company"
                />
              </div>
              <div className={`navbar-menu ${isMobileMenuOpen ? "responsive" : ""}`}>
                <div className="flex space-x-3 text-s">
                  <Link
                    to={"/"}
                    className="hover:bg-orange-400 rounded-md hover:bg-gray-700 px-3 py-2 font-medium text-gray-300 hover:text-white"
                    // aria-current="page"
                  >
                    Trang chủ
                  </Link>
                  <div
                    className="relative"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                  >
                    <button
                      // onClick={showListCategory}
                      onMouseEnter={() => setShowDropdown(true)}
                      onMouseLeave={() => setShowDropdown(false)}
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Thể loại
                    </button>
                    {showDropdown && (
                      <div
                        className=" absolute left-[10%] z-10 mt-0 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        // aria-orientation="vertical"
                        // aria-labelledby="user-menu-button"
                        // tabIndex="-1"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                      >
                        <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200">
                          Viễn tưởng
                        </Link>
                        <Link className="block px-4 py-2 text-sm text-red-700 hover:bg-slate-200 ">
                          Phim 18+ <p className="">Phải xác minh</p>
                        </Link>
                        <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200">
                          Hành động
                        </Link>
                        <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200">
                          Kinh dị
                        </Link>
                        <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200">
                          Chiến Tranh
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link
                    onMouseEnter={() => setShowCountry(true)}
                    onMouseLeave={() => setShowCountry(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Quốc gia
                  </Link>
                  {showCountry && (
                    <div
                      className=" absolute left-[20%] z-10 mt-[3%] w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      onMouseEnter={() => setShowCountry(true)}
                      onMouseLeave={() => setShowCountry(false)}
                    >
                      <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200">
                        Việt nam
                      </Link>
                      <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200">
                        Trung quốc
                      </Link>
                      <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200">
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
                  <Link
                    to={"/phim-bo"}
                    className="hover:bg-orange-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Phim bộ
                  </Link>
                  <Link
                    to={"/phim-le"}
                    className="hover:bg-orange-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Phim lẻ
                  </Link>
                  <a
                    href="#"
                    className="hover:bg-orange-400 hover:text-black rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Sắp chiếu
                  </a>
                </div>
              </div>
            </div>

            <div className=" absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="flex space-x-2 relative font-bold rounded-lg bg-orange-300 p-1 text-black hover:bg-orange-500 hover:text-white transition duration-300 ease-in-out transform "
              >
                <GiCoffeeCup
                  color="black"
                  className="w-5 h-6 flex-1 hover:text-white"
                />
                <p>Buy me a coffee</p>
                <FaHeart color="red" className="w-5 h-6 flex-1" />
              </button>

              <div className=" ml-3">
                <div className=" hover-border-red">
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={showSide}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <img
                      className="h-8 w-8 rounded-full "
                      src="https://scontent.fhnd4-2.fna.fbcdn.net/v/t39.30808-6/436425969_1920131778445188_8278204402786003616_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=O1DTESM7VqwQ7kNvgG88IQ6&_nc_ht=scontent.fhnd4-2.fna&oh=00_AYAnfUGYmhR8pO5AfncNISFRf653o91_AGvzQ_gyTv85uw&oe=6693365C"
                      alt=""
                    />
                  </button>
                </div>
                {showSidebar ? (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <button
                      onClick={openLoginModal}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      Đăng nhập/Đăng kí
                    </button>
                    <LoginModal isOpen={loginModal} onClose={closeModalLogin}/>
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
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center sm:items-stretch  items-center">
          <div className="ml-6 block search-form">
            <div className="mb-3 md:w-96 mx-auto ">
              <form
                onSubmit={handleSearchSubmit}
                className="relative mb-4 flex w-full flex-wrap items-stretch "
              >
                <input
                  type="text"
                  className="text-black m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-sm   bg-clip-padding px-3 py-[0.25rem] leading-[1.6]  outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700      "
                  placeholder="Search..."
                  aria-label="Search"
                  aria-describedby="button-addon3"
                  id="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />

                {/* <!--Search button--> */}
                <TERipple>
                  <button
                    className="bg-orange-500 relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-s font-medium uppercase text-white transition duration-150 ease-in-out hover:bg-orange-600  focus:outline-none focus:ring-0"
                    type="submit"
                    id="button-addon3"
                  >
                    <CiSearch size={20} />
                  </button>
                </TERipple>
              </form>
            </div>
          </div>
        </div>
      </nav>
       {showSearch && listSearchData.length > 0 && (
        <Search listSearchData={listSearchData} handleMovieClick={handleMovieClick} />
      )}
      
    </>
  );
};

export default Navbar;
