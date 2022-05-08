import React from "react";
import { useParams, useLocation } from "react-router-dom";

const View = () => {
  let { userId } = useParams();
  const location = useLocation();
  console.log(location.pathname);
  return (
    <React.Fragment>
      <h1>This is the page for {userId}</h1>
      {/* window.location.pathname */}
    </React.Fragment>
  );
};

export default View;
