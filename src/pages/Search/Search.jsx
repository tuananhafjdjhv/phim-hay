import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import VideoCard from "../../components/VideoCard/VideoCard";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Search = ({ listSearchData,handleMovieClick }) => {

  const navigate = useNavigate()
  const handleXemPhimClick = (slug) => {
    handleMovieClick()
    navigate(`/detail/${slug}`);
  };
  console.log("results ==== ", listSearchData);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}
      <div className="text-xl pt-10 ">Kết quả tìm kiếm</div>
      <div className="flex flex-wrap -mx-4 mt-10">
        {/* <div>Kết quả tìm kiếm</div> */}
        {listSearchData.map((item, index) => (  
          <div
            key={index}
            onClick={()=>handleXemPhimClick(item.slug)}
            className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/5 px-4 mb-6"
          >
            <VideoCard
              id={item._id}
              title={item.name}
              imageUrl={`https://img.phimapi.com/${item.poster_url}`}
              description={item._id}
            />
          </div>
        ))}
      </div>
      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}
    </>
  );
};

export default Search;
