import React, { useEffect, useState } from "react";
import VideoCard from "../VideoCard/VideoCard";
import axios from "axios";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Pagination from "../Pagination/Pagination";
import "./layout.css"

const LayOut = () => {
  // Thông tin về phim
  const [items, setItems] = useState([]);

  // Thông tin số trang
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = (page) => {
    try {
      const response = axios
        .get(`https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${page}`)
        .then((res) => {
          setItems(res.data.items);
          setPagination(res.data.pagination);
          setTotalPages(res.data.pagination.totalPages);
          // setSlug(res.data.items.slug);
          
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  console.log("items ====", items);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div >
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        className="pagination"
      />
      
      <div className="flex flex-wrap -mx-4 mt-10 list-page">
        {items.map((item, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/5 px-4 mb-6"
          >
            <VideoCard
              id={item._id}
              title={item.name}
              imageUrl={item.poster_url}
              description={item._id}
              slug={item.slug}
            />
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default LayOut;
