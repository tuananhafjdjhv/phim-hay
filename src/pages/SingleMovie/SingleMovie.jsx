
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Pagination from '../../components/Pagination/Pagination';
import VideoCard from '../../components/VideoCard/VideoCard';
import { useNavigate } from 'react-router-dom';

const SingleMovie = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const handleCardClick = (slug) => {
      navigate(`/detail/${slug}`);
    };

    // Thông tin số trang
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [posterUrl, setPosterUrl] = useState({});

  
    const fetchData = (page) => {
      try {
        const response = axios
          .get(`https://phimapi.com/v1/api/danh-sach/phim-le?page=${page}`)
          .then((res) => {
            setItems(res.data.data.items);
            // console.log(res.data.data.items);
            setTotalPages(res.data.data.params.pagination.totalPages);
            // setPagination(res.data.pagination);
            // setTotalPages(res.data.data.pagination);
            setPosterUrl(res.data.data.items.poster_url);
            // console.log(posterUrl);
            
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    useEffect(() => {
      fetchData(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
    
  return (
    <>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      
      <div className="flex flex-wrap -mx-4 mt-10">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(item.slug)}
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default SingleMovie