import React, { useState } from "react";
import MyPagination from "../../components/MyPagination";

const Home = () => {
  const [pageNumber, setpageNumber] = useState(0);
  return (
    <div>
      <MyPagination
        pageNo={pageNumber}
        totalPages={100}
        onChangePage={(value) => setpageNumber(value)}
      />
    </div>
  );
};

export default Home;
