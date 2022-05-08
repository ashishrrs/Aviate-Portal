import React from "react";
import Table from "./Table/Table";

import styles from "./Home.css";

const Home = () => {
  return (
    <React.Fragment>
      <div className="create">
        <button>Create New</button>
      </div>
      <div className="table-container">
        <Table />
      </div>
    </React.Fragment>
  );
};

export default Home;
