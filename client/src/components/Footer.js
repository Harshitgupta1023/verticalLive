import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    padding: "1rem",
    alignItems: "center",
    boxShadow: "1px 1px rgba(0,0,0,1)",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1>This is Footer Screen</h1>
    </div>
  );
};

export default Footer;
