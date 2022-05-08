import React, { useState, useEffect, useRef } from "react";

import styles from "./Table.css";
import TableFooter from "./TableFooter";

const Table = () => {
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [maxPerPage, setMaxPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const isMounted = useRef();
  // total_pages;
  const getTableData = async () => {
    const body = {
      items: maxPerPage,
      pagenum: currPage,
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/candidates/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseResponse = await response.json();
      console.log(parseResponse);
      setTableData(parseResponse.items);
      setTotalPages(tableData.total_pages);
      console.log(tableData);
      console.log(totalPages);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (isMounted.current) return;
    getTableData();
    isMounted.current = true;
  }, [tableData]);

  return (
    <React.Fragment>
      <table className="table">
        <thead className="tableHeader">
          <tr className="tableRowHeader">
            <th className="tableCell">Name</th>
            <th className="tableCell">Email</th>
            <th className="tableCell">Status</th>
            <th className="tableCell">Date</th>
            <th className="tableCell">Details</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => {
            <tr className="tabeRowItems" key={index}>
              <td className="tableCell">{data.name}</td>
              <td className="tableCell">{data.email_id}</td>
              <td className="tableCell">{data.status}</td>
              <td className="tableCell">{data.date}</td>
              <td className="tableCell">
                <button>View</button>
              </td>
            </tr>;
          })}
        </tbody>
      </table>
      <TableFooter
        totalPages={totalPages}
        currPage={currPage}
        setCurrPage={setCurrPage}
        maxPerPage={maxPerPage}
      />
    </React.Fragment>
  );
};

export default Table;
