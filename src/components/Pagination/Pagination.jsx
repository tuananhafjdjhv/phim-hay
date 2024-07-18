import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import "./pagination.css"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [pageButtons, setPageButtons] = React.useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    const newButtons = [];
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      newButtons.push(i);
    }
    setPageButtons(newButtons);
  }, [currentPage, totalPages]);

  const goToPage = (page) => {
    onPageChange(page);
  };

  const next = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  return (
    <div className=" flex flex-col items-center gap-1 bg-gray justify-center py-1 px-1 sm:flex-row sm:items-center sm:gap-1">
        <Button
          variant="text"
          className="flex items-center gap-2 text-black bg-orange-300 hover:bg-orange-500"
          onClick={prev}
          disabled={currentPage === 1}
        >
          <ArrowLeftIcon strokeWidth={1} className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          {pageButtons.map((page) => (
            <IconButton
              key={page}
              onClick={() => goToPage(page)}
              variant={currentPage === page ? "filled" : "text"}
              color="orange"
              backgroundColor="orange"
            >
              {page}
            </IconButton>
          ))}
          <p className="text-orange"> . . . . {"   "}</p>
        </div>
        <Button
          variant="text"
          className="flex items-center gap- text-black bg-orange-300 hover:bg-orange-500"
          // onClick={next}
          // disabled={currentPage === totalPages}
        >
          {/* <p strokeWidth={2} className="h-4 w-4" >{totalPages}</p> */}
          <p className="h-4 w-4">{totalPages}</p>
        </Button>
        <Button
          variant="text"
          className="flex items-center gap-2 text-black bg-orange-300 hover:bg-orange-500"
          onClick={next}
          disabled={currentPage === totalPages}
        >
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
  );
};

export default Pagination;
