import React from "react";
import { PageNumber } from "./buttons";

const Pagination = ({
  totalItems,
  numberOfItemsToDisplayInAPage,
  handleScroll,
  activePage,
  setActivePage,
}) => {
  const totalPages = Math.ceil(totalItems / numberOfItemsToDisplayInAPage);

  let sides = [];
  let middleSideNumbers = [];
  if (totalPages > 5) {
    if (activePage === 1 || activePage === 2 || activePage === 3) {
      middleSideNumbers = [2, 3, 4];
    } else if (activePage === totalPages - 1 || activePage === totalPages) {
      middleSideNumbers = [totalPages - 3, totalPages - 2, totalPages - 1];
    } else {
      middleSideNumbers = [activePage - 1, activePage, activePage + 1];
    }
    sides = [[1], [...middleSideNumbers], [totalPages]];
  } else {
    sides = [...Array(totalPages)].map((a, i) => i + 1);
  }

  const pageNumbers = sides.flat(Infinity);
  let pageNumbersToShow = [pageNumbers[0]];
  for (let i = 1; i < pageNumbers.length; i++) {
    if (pageNumbers[i] - 1 === pageNumbers[i - 1]) {
      pageNumbersToShow.push(pageNumbers[i]);
    } else {
      pageNumbersToShow.push("...", pageNumbers[i]);
    }
  }

  const handleClick = (page) => {
    if (page !== activePage && page <= totalPages && page >= 1) {
      setActivePage(page);
      handleScroll();
    }
  };

  return (
    <div className="space-x-2 flex justify-center">
      <div className="hidden sm:block">
        <PageNumber
          label="Previous"
          value={activePage - 1}
          handleClick={() => handleClick(activePage - 1)}
          isDisabled={activePage - 1 === 0}
        />
      </div>
      {pageNumbersToShow.map((page, i) => {
        return (
          <PageNumber
            key={i}
            label={page}
            value={page}
            handleClick={() => handleClick(page)}
            isActive={activePage === page}
          />
        );
      })}
      <div className="hidden sm:block">
        <PageNumber
          label="Next"
          value={activePage + 1}
          handleClick={() => handleClick(activePage + 1)}
          isDisabled={activePage + 1 > totalPages}
        />
      </div>
    </div>
  );
};

export default Pagination;
