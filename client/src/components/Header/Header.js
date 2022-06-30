import React, { useState } from "react";
import styles from "./Header.module.css";

import cx from "classnames";
import logo from "../../assets/logo.jpg";
import Login from "../Login/Login";
import NewQuestion from "../NewQuestion/NewQuestion";

const HamBurgerMenu = ({ hamBurger, setHamBurger }) => {
  return (
    <div className={styles.hamburger} onClick={() => setHamBurger(!hamBurger)}>
      <div className={cx(styles.line, hamBurger ? styles["line-1"] : "")}></div>
      <div className={cx(styles.line, hamBurger ? styles["line-2"] : "")}></div>
      <div className={cx(styles.line, hamBurger ? styles["line-3"] : "")}></div>
    </div>
  );
};

const Header = ({
  setUid,
  uid,
  setMessage,
  setAlertOpen,
  setSeverity,
  newRoleOpen,
  setNewRoleOpen,
  isAdmin,
  setIsAdmin,
}) => {
  const [hamBurger, setHamBurger] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const handleLogin = () => setLoginOpen(!loginOpen);

  const [newQuestionOpen, setNewQuestionOpen] = useState(false);
  const handleNewQuestion = () => setNewQuestionOpen(!newQuestionOpen);

  const handleNewRole = () => setNewRoleOpen(!newRoleOpen);

  const handleLogout = () => {
    setUid("");
    setIsAdmin(false);
  };

  return (
    <div>
      <div
        className={hamBurger ? styles.clickableContainer : ""}
        onClick={() => {
          setHamBurger(!hamBurger);
        }}
      ></div>
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
          <HamBurgerMenu hamBurger={hamBurger} setHamBurger={setHamBurger} />
          {isAdmin ? (
            <p
              className={cx(styles.styledButton, styles.list_item2)}
              onClick={handleNewRole}
            >
              New Role
            </p>
          ) : null}

          {isAdmin ? (
            <p
              className={cx(styles.styledButton, styles.list_item2)}
              onClick={handleNewQuestion}
            >
              New Question
            </p>
          ) : null}

          <p
            id="list_item1"
            className={cx(styles.styledButton, styles.list_item1)}
            onClick={uid === "" ? handleLogin : handleLogout}
          >
            {uid === "" ? "Login" : "Logout"}
          </p>
        </div>
        {loginOpen ? (
          <Login
            open={loginOpen}
            handleClose={handleLogin}
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
            handleClose={handleNewQuestion}
            uid={uid}
            setMessage={setMessage}
            setAlertOpen={setAlertOpen}
            setSeverity={setSeverity}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Header;
