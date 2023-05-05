import { useState } from "react";
import { Box, Button, Pagination, Typography } from "@mui/material";

const MyPagination = ({ pageNo, totalPages, onChangePage }) => {
  const [displayButtons, setDisplayButtons] = useState(totalPages > 10);

  const handleChange = (event, value) => {
    onChangePage(value - 1);
  };

  const handlePrevClick = () => {
    if (pageNo > 0) {
      onChangePage(pageNo - 1);
    }
  };

  const handleNextClick = () => {
    if (pageNo < totalPages - 1) {
      onChangePage(pageNo + 1);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <Box mr={4}>
        <Typography>
          Page {pageNo + 1} of {totalPages}
        </Typography>
      </Box>
      {displayButtons ? (
        <Box>
          <Button
            variant="contained"
            disabled={pageNo === 0}
            onClick={handlePrevClick}
          >
            Prev
          </Button>
        </Box>
      ) : null}
      <Box ml={2} mr={2}>
        <Pagination
          count={totalPages}
          page={pageNo + 1}
          onChange={handleChange}
        />
      </Box>
      {displayButtons ? (
        <Box>
          <Button
            variant="contained"
            disabled={pageNo === totalPages - 1}
            onClick={handleNextClick}
          >
            Next
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export default MyPagination;
