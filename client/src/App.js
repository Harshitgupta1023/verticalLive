import "./App.css";
import Header from "./components/Header";
import Home from "./Pages/Home";
import { makeStyles } from "@mui/styles";
import Footer from "./components/Footer";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  container: {
    width: "98.9vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  headerContainer: {
    // height: "10%",
  },
  homeContainer: {
    height: "90%",
  },
  footerContaienr: {
    height: "10%",
  },
}));

const App = () => {
  const classes = useStyles();
  const [uid, setUid] = useState("");
  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <Header setUid={setUid} uid={uid} />
      </div>
      <div className={classes.homeContainer}>
        <Home uid={uid} />
      </div>
      {/* <div className={classes.footerContaienr}>
        <Footer/>
      </div> */}
    </div>
  );
};

export default App;
