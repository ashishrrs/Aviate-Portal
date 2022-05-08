import React, { useEffect } from "react";

import styles from "./TableFooter.css";

const TableFooter = ({ totalPages, currPage, maxPerPage, setCurrPage }) => {
  useEffect(() => {
    if (maxPerPage < 1 && currPage !== 1) {
      setCurrPage(currPage - 1);
    }
  }, [maxPerPage, currPage, setCurrPage]);
  return (
    <div className="tableFooter">
      {/* <button
        key={index}
        className={`paginated-button ${
          currPage === index ? "activeButton" : "inactiveButton"
        }`}
        onClick={() => setCurrPage(index)}
      ></button> */}
    </div>
  );
};

export default TableFooter;
