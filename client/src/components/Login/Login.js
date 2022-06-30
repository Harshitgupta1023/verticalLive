import React, { useState } from "react";
import styles from "./Login.module.css";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";

const Login = ({
  open,
  handleClose,
  setUid,
  setIsAdmin,
  setMessage,
  setAlertOpen,
  setSeverity,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isValid,setIsValid] = useState(false)
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


  const userLogin = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_IP + "loginUser",
        {
          email: email,
          password: password,
        }
      );
      setUid(res.data.uid);
      handleClose();
      setIsAdmin(res.data.isAdmin);
    } catch (err) {
      setMessage(err.response.data.error);
      setAlertOpen(true);
      setSeverity("error");
    }
    setIsLoading(false);
  };

  const userSignup = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_IP + "createUser",
        {
          email: email,
          password: password,
        }
      );
      setUid(res.data.uid);
      handleClose();
      setIsAdmin(res.data.isAdmin);

      setMessage("Welcome to Survey APP ");
      setAlertOpen(true);
      setSeverity("success");
    } catch (err) {
      setMessage(err.response.data.error);
      setAlertOpen(true);
      setSeverity("error");
    }
    setIsLoading(false);

  };


  if (isLoading) {
    return (
      <Loading/>
    ); 
  }


  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 50,
      }}
    >
      <Fade in={open}>
        <Box className={styles.container}>
          <Typography
            variant="h2"
            component="h2"
            style={{
              fontFamily: "'Lato', sans-serif",
              marginBottom: "1rem",
            }}
          >
            Login
          </Typography>

          <TextField
            variant="filled"
            label="Email"
            style={{ width: "100%", marginTop: "1rem" }}
            onChange={(dat) => {
              setIsValid(
                dat.target.value !== "" && dat.target.value.match(validRegex)===null
              );
              setEmail(dat.target.value);
            }}
            required={true}
            InputLabelProps={{ style: { fontSize: 18, color: "black" } }}
            inputProps={{ style: { fontSize: 20 } }}
            FormHelperTextProps={{ style: { fontSize: 12 } }}
            error={isValid}
            helperText={isValid ? "Enter Correct Email" : ""}
          />
          <TextField
            label="Password"
            variant="filled"
            style={{ width: "100%", marginTop: "2rem" }}
            onChange={(dat) => {
              setPassword(dat.target.value);
            }}
            required={true}
            InputLabelProps={{ style: { fontSize: 18, color: "black" } }}
            inputProps={{ style: { fontSize: 20 } }}
            type="password"
            autoComplete="on"
          />
          <div className={styles.buttonContainer}>
            <Button onClick={userLogin} text="Login" />
            <Button onClick={userSignup} text="SignUp" />
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Login;
