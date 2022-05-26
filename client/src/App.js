import "./App.css";
import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home";
import { makeStyles } from "@mui/styles";
import Footer from "./components/Footer";
import { useState } from "react";
import AlertModified from "./components/AlertModified/AlertModified";

const useStyles = makeStyles(() => ({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  headerContainer: {
    height: "7rem",
    marginBottom:"0.3rem",

  },
  homeContainer: {
    height: "100%",
  },
  footerContaienr: {
    height: "10%",
  },
}));

const App = () => {
  const classes = useStyles();
  const [uid, setUid] = useState("");
  const [message, setMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [severity, setSeverity] = useState("success");

  return (
    <div className={classes.container}>
      <AlertModified
        message={message}
        severity={severity}
        open={alertOpen}
        setOpen={setAlertOpen}
      />

      <div className={classes.headerContainer}>
        <Header
          setUid={setUid}
          uid={uid}
          setMessage={setMessage}
          setAlertOpen={setAlertOpen}
          setSeverity={setSeverity}
        />
      </div>
      <div className={classes.homeContainer}>
        <Home
          uid={uid}
          setMessage={setMessage}
          setAlertOpen={setAlertOpen}
          setSeverity={setSeverity}
        />
      </div>
      {/* <div className={classes.footerContaienr}>
        <Footer/>
      </div> */}
    </div>
  );
};

export default App;
