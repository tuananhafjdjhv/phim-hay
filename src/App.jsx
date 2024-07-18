import { useEffect, useState } from "react";
import "./App.css";
import { FaArrowCircleUp } from "react-icons/fa";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import PlayVideo from "./components/PlayVideo/PlayVideo";
import SeriesMovie from "./pages/SeriesMovie/SeriesMovie";
import SingleMovie from "./pages/SingleMovie/SingleMovie";
import Detail from "./pages/Detail/Detail";
import { NavbarWithSearch } from "./components/Navbar/NavbarWithSearch";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    
      <main className="mx-10 main">
        <NavbarWithSearch/>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          
          
          <Route path='/phim-bo' element={<SeriesMovie />} />
          <Route path='/detail/:slug' element={<Detail />} />
          <Route/>
          <Route path='/phim-le' element={<SingleMovie />} />
          <Route path='/detail/:slug/xem-phim' element={<PlayVideo />} />
          
        </Routes>
        <div className="back-to-top ">
          {isVisible && (
            <button onClick={scrollToTop} className="back-to-top-icon text-sm rounded-xl py-2 px-4 w-full">
              Back top
            </button>
          )}
        </div>
        <Footer/>
      </main>
    
  );
}

export default App;
