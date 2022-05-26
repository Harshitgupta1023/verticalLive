import React, { useState } from "react";
import styles from "./Header.module.css";

import cx from "classnames";
import logo from "../../assets/logo.jpg";
import Login from "../Login/Login";
import NewQuestion from "../NewQuestion/NewQuestion";

const Header = ({ setUid, uid, setMessage, setAlertOpen, setSeverity }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [hamBurger, setHamBurger] = useState(false);
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
    <div className={styles.container}>
      {/* <div className={styles.logoContainer}>
        <img style={{ width: "100%", height: "100%" }} src={logo} alt="Logo" />
      </div> */}
      <div className={styles.nameContainer}>
        <p>Survey App</p>
      </div>
      <div
        className={cx(styles.linkContainer, hamBurger ? styles.clicked : "")}
      >
        <div
          className={styles.hamburger}
          onClick={() => {
            setHamBurger(!hamBurger);
          }}
        >
          <div
            className={cx(styles.line, hamBurger ? styles["line-1"] : "")}
          ></div>
          <div
            className={cx(styles.line, hamBurger ? styles["line-2"] : "")}
          ></div>
          <div
            className={cx(styles.line, hamBurger ? styles["line-3"] : "")}
          ></div>
        </div>

        {isAdmin ? (
          <p
            className={cx(styles.styledButton, styles.list_item2)}
            onClick={handleNewQuestionOpen}
          >
            New Question
          </p>
        ) : null}

        <p
          id="list_item1"
          className={cx(styles.styledButton, styles.list_item1)}
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
