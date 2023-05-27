import React, { useState } from "react";
import MyPagination from "../../components/MyPagination";
import DisplayReferCount from "../Payment/DisplayReferCount";

const Home = () => {
  const [pageNumber, setpageNumber] = useState(0);
  return (
    <div>
      <DisplayReferCount />
    </div>
  );
};

export default Home;
