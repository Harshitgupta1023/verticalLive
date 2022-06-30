import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor :"rgba(0,0,0,0.1)",
        bottom:0
      }}
    >
      <CircularProgress size="50px"/>
    </Box>
  );
};

export default Loading;
