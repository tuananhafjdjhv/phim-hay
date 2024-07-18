import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ title, imageUrl, description, id ,slug }) => {

  

  return (
    <Link
    to={`/detail/${slug}`}
      className="mt-0 block bg-black relative group"
    >
      <div className="relative w-full h-60 overflow-hidden">
        <img
          className="object-cover w-full h-full transition-transform transform group-hover:scale-110 group-hover:blur-sm duration-300 ease-in-out"
          src={imageUrl}
          alt={title}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <div className="bg-white rounded-full p-2 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-orange-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M10 8.64L15.27 12 10 15.36V8.64M9 5v14l11-7L9 5z"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="p-1">
        <p className="cursor-pointer mb-2 text-s font-semibold leading-tight text-white dark:text-neutral-50 line-clamp-2">
          {title}
        </p>
      </div>
    </Link>
  );
};

export default VideoCard;
