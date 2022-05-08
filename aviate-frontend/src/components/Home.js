import React from "react";
import Table from "./Table/Table";

import styles from "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <React.Fragment>
      <div className="create">
        <Link to={"create"}>
          <button>Create New</button>
        </Link>
      </div>
      <div className="table-container">
        <Table />
      </div>
    </React.Fragment>
  );
};

export default Home;
