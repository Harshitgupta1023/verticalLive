import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import logo from "../assets/logo.jpg";
import Login from "./Login";
import NewQuestion from "./NewQuestion";
import { color } from "../constant/colors";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    boxShadow: "1px 1px rgba(0,0,0,1)",
    marginBottom: "0.3rem",
    padding: "1rem",
    backgroundColor: color.primary,
    justifyContent: "space-between",
  },
  logoContainer: {
    width: "5%",
  },
  nameContainer: {
    textAlign: "center",
    fontSize: "3rem",
    alignSelf: "center",
    color: "white",
    marginLeft: "2rem",
  },
  linkContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginRight: "5rem",
  },
}));

const Header = ({ setUid, uid, setMessage, setAlertOpen, setSeverity }) => {
  const classes = useStyles();
  const [isAdmin, setIsAdmin] = useState(false);

  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const [newQuestionOpen, setNewQuestionOpen] = useState(false);
  const handleNewQuestionOpen = () => setNewQuestionOpen(true);
  const handleNewQuestionClose = () => setNewQuestionOpen(false);

  const handleLogout = () => {
    setUid("");
    setIsAdmin(false);
  };
  return (
    <div className={classes.container}>
      {/* <div className={classes.logoContainer}>
        <img style={{ width: "100%", height: "100%" }} src={logo} alt="Logo" />
      </div> */}
      <div className={classes.nameContainer}>
        <p>Survey App</p>
      </div>
      <div className={classes.linkContainer}>
        {isAdmin ? (
          <p className="styledButton" onClick={handleNewQuestionOpen}>
            New Question
          </p>
        ) : null}

        <p
          className="styledButton"
          onClick={uid === "" ? handleLoginOpen : handleLogout}
        >
          {uid === "" ? "Login" : "Logout"}
        </p>
      </div>
      {loginOpen ? (
        <Login
          open={loginOpen}
          handleClose={handleLoginClose}
          setUid={setUid}
          setIsAdmin={setIsAdmin}
          setMessage={setMessage}
          setAlertOpen={setAlertOpen}
          setSeverity={setSeverity}
        />
      ) : null}
      {isAdmin && newQuestionOpen ? (
        <NewQuestion
          open={newQuestionOpen}
          handleClose={handleNewQuestionClose}
          uid={uid}
          setMessage={setMessage}
          setAlertOpen={setAlertOpen}
          setSeverity={setSeverity}
        />
      ) : null}
    </div>
  );
};

export default Header;
