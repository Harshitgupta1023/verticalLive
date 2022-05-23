import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import QuestionCard from "../components/QuestionCard";
import Categories from "../components/Categories";
import axios from "axios";
import { color } from "../constant/colors";
const useStyles = makeStyles(() => ({
  container: {
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: color.tertiary,
  },
  questionContainer: {
    position: "relative",
    width: "60%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
  },
  textContainer: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    fontFamily: "",
    fontStyle: "italic",
    fontSize: 15,
    marginLeft: "2rem",
  },
  loginContainer: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    backgroundColor: color.tertiary,
    height: "100%",
    width: "100%",
    paddingTop: "100px",
  },
  loginSubContainer: {
    display: "flex",
    height: "50%",
    padding: "2rem",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 15,
    fontFamily: "",
  },
}));

const Home = ({ uid, setMessage, setAlertOpen, setSeverity }) => {
  const classes = useStyles();
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (uid !== "" && category !== "") {
          const res = await axios.get(
            process.env.REACT_APP_SERVER_IP + `fetch?category=${category}`
          );
          setData(res.data);
        }
      } catch (err) {
        console.log("Fetch Data----->", err);
      }
    };
    fetchData();
  }, [uid, category]);
  if (uid === "") {
    return (
      <div className={classes.loginContainer}>
        <div className={classes.loginSubContainer}>
          <h1>Please Login To Continue !!!</h1>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <div style={{ width: "20%", height: "100%" }}></div>
      <div className={classes.questionContainer}>
        <div
          className={classes.textContainer}
          style={{
            justifyContent: category === "" ? "center" : "space-between",
          }}
        >
          <h1>
            {category === "" ? "Select Category" : `Questions on ${category}`}
          </h1>
          {category !== "" ? (
            <button
              className="button"
              onClick={() => {
                setCategory("");
                setData([]);
              }}
            >
              Back
            </button>
          ) : null}
        </div>
        {category === "" && data.length === 0 ? (
          <Categories setCategory={setCategory} />
        ) : (
          <QuestionCard
            uid={uid}
            serverData={data}
            setMessage={setMessage}
            setAlertOpen={setAlertOpen}
            setSeverity={setSeverity}
          />
        )}
      </div>

      <div style={{ width: "20%", height: "100%" }}></div>
    </div>
  );
};

export default Home;
