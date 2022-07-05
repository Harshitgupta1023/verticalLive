import React, { useState } from "react";
import styles from "./NewQuestion.module.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import axios from "axios";
import Button from "../Button/Button";
import { categoryList, questionTypeList } from "../../constant/categories";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
const NewQuestion = ({
  open,
  handleClose,
  uid,
  setMessage,
  setAlertOpen,
  setSeverity,
}) => {
  const [category, setCategory] = useState(categoryList[0]);
  const [answer, setAnswer] = useState("");
  const [description, setDescription] = useState("");
  const [questionType, setQuestionType] = useState("single correct");

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

      setMessage("Question Added Successfully!! ");
      setAlertOpen(true);
      setSeverity("success");
    } catch (err) {
      setMessage(err.response.data.error);
      setAlertOpen(true);
      setSeverity("error");
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
        <Box className={styles.container}>
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
          <div className={styles.selectContainer}>
            <Typography
              variant="h5"
              component="h1"
              fontSize={18}
              className={styles.selectText}
            >
              Choose Question Type
            </Typography>

            <DropDownMenu
              state={questionType}
              setState={setQuestionType}
              listItem={questionTypeList}
            />
          </div>
          <div className={styles.selectContainer}>
            <Typography
              variant="h5"
              component="h1"
              fontSize={18}
              className={styles.selectText}
            >
              Choose Category
            </Typography>
            <DropDownMenu
              state={category}
              setState={setCategory}
              listItem={categoryList}
            />
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

          <div className={styles.buttonContainer}>
            <Button
              disabled={
                description === "" ||
                (questionType !== "short" && answer === "")
              }
              onClick={addQuestion}
              text="Add Question"
            />
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default NewQuestion;
