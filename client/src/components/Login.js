import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import axios from "axios";

const useStyles = makeStyles(() => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "3rem",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Login = ({ open, handleClose, setUid, setIsAdmin }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userLogin = async () => {
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
      console.log(err);
    }
  };

  const userSignup = async () => {
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
    } catch (err) {
      console.log(err);
    }
  };

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
        <Box sx={style}>
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
              setEmail(dat.target.value);
            }}
            required={true}
            InputLabelProps={{ style: { fontSize: 18, color: "black" } }}
            inputProps={{ style: { fontSize: 20 } }}
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
          />
          <div className={classes.buttonContainer}>
            <button onClick={userLogin} className="button">
              LogIn
            </button>
            <button onClick={userSignup} className="button">
              SignUp
            </button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Login;
