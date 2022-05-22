import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import axios from "axios";

const useStyles = makeStyles(() => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "3rem",
  },
  button: {
    width: "50%",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Signup = ({ open, handleClose, setUid }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <Typography variant="h2" component="h2">
            Login
          </Typography>

          <TextField
            id="filled-basic"
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
            id="filled-basic"
            label="Password"
            variant="filled"
            style={{ width: "100%", marginTop: "2rem" }}
            onChange={(dat) => {
              setPassword(dat.target.value);
            }}
            required={true}
            InputLabelProps={{ style: { fontSize: 18, color: "black" } }}
            inputProps={{ style: { fontSize: 20 } }}
          />
          <div className={classes.buttonContainer}>
            <Button
              onClick={userSignup}
              className={classes.button}
              variant="contained"
            >
              Sign Up
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Signup;
