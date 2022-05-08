import React, { useState, useEffect } from "react";

import styles from "./Table.css";
import TableFooter from "./TableFooter";

const Table = () => {
  const [tableData, setTableData] = useState();
  const getTableData = async () => {
    const body = {
      items: 10,
      pagenumber: 1,
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/candidates/pages", {
        mode: "no-cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseResponse = await response.json();
      console.log(parseResponse);
      setTableData(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);
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
          <tr className="tabeRowItems">
            <td className="tableCell">Hello</td>
            <td className="tableCell">123@example.com</td>
            <td className="tableCell">Rejected</td>
            <td className="tableCell">24-02-2020</td>
            <td className="tableCell">
              <button>View</button>
            </td>
          </tr>
        </tbody>
      </table>
      <TableFooter />
    </React.Fragment>
  );
};

export default Table;
