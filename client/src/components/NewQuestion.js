import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import axios from "axios";

const useStyles = makeStyles(() => ({
  selectContainer: {
    width: "75%",
    marginTop: "2rem",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
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
  width: "35%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow:"auto"
};

const NewQuestion = ({ open, handleClose, uid }) => {
  const classes = useStyles();
  const [category, setCategory] = useState("health");
  const [answer, setAnswer] = useState("");
  const [description, setDescription] = useState("");
  const [questionType, setQuestionType] = useState("single correct");
  const categoryList = ["health", "wealth", "hobbies", "career"];
  const questionTypeList = ["single correct", "multiple correct", "short"];
  const addQuestion = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_SERVER_IP + "createQuestion",
        {
          category: category,
          answer: answer,
          description: description,
          questionType: questionType,
          uid: uid,
        }
      );
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
          <Typography
            variant="h3"
            component="h2"
            style={{
              fontFamily: "'Lato', sans-serif",
            }}
          >
            Create Question
          </Typography>
          <TextField
            id="filled-basic"
            variant="standard"
            label="Question Statement"
            style={{ width: "100%", marginTop: "2rem" }}
            onChange={(dat) => {
              setDescription(dat.target.value);
            }}
            required={true}
            InputLabelProps={{
              style: { fontSize: 15, color: "black", overflow: "auto" },
            }}
            inputProps={{
              style: { fontSize: 18, lineHeight: 1.1, paddingTop: "5px" },
            }}
            multiline={true}
            maxRows={4}
          />
          <div className={classes.selectContainer}>
            <Typography
              variant="h5"
              component="h1"
              fontSize={18}
              style={{ width: "50%" }}
            >
              Choose Question Type
            </Typography>

            <Select
              value={questionType}
              onChange={(dat) => {
                setQuestionType(dat.target.value);
              }}
              style={{ fontSize: 15 }}
            >
              {questionTypeList.map((dat) => {
                return (
                  <MenuItem value={dat} style={{ fontSize: 15 }} key={dat}>
                    {dat}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div className={classes.selectContainer}>
            <Typography
              variant="h5"
              component="h1"
              fontSize={18}
              style={{ width: "50%" }}
            >
              Choose Category
            </Typography>

            <Select
              value={category}
              onChange={(dat) => {
                setCategory(dat.target.value);
              }}
              style={{ fontSize: 15 }}
            >
              {categoryList.map((dat) => {
                return (
                  <MenuItem value={dat} style={{ fontSize: 15 }} key={dat}>
                    {dat}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          {questionType !== "short" ? (
            <TextField
              id="filled-basic"
              variant="standard"
              label="Answer Options"
              style={{ width: "100%" }}
              onChange={(dat) => {
                setAnswer(dat.target.value.split(";").join("$$"));
              }}
              required={true}
              InputLabelProps={{
                style: { fontSize: 15, color: "black", overflow: "auto" },
              }}
              inputProps={{
                style: { fontSize: 18, lineHeight: 1.1, paddingTop: "5px" },
              }}
              multiline={true}
              maxRows={4}
            />
          ) : null}
          {questionType !== "short" ? (
            <Typography
              variant="p"
              component="h2"
              style={{ marginTop: "1rem" }}
            >
              Note: Use semicolon as seprator for different options
            </Typography>
          ) : null}

          <div className={classes.buttonContainer}>
            <button
              onClick={addQuestion}
              className="button"
              disabled={
                description === "" ||
                (questionType !== "short" && answer === "")
              }
            >
              Add Question
            </button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default NewQuestion;
