import React, { useEffect, useState } from "react";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import Categories from "../../components/Categories/Categories";
import axios from "axios";
import styles from "./Home.module.css";
import Button from "../../components/Button/Button";
import NewRole from "../../components/NewRole/NewRole";

const Home = ({
  uid,
  setMessage,
  setAlertOpen,
  setSeverity,
  newRoleOpen,
  setNewRoleOpen,
  isAdmin,
}) => {
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
      <div className={styles.loginContainer}>
        <div className={styles.loginSubContainer}>
          <h1>Please Login To Continue !!!</h1>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.extraContainer}></div>
      {newRoleOpen && isAdmin ? (
        <div className={styles.questionContainer}>
          <div className={styles.roleTextContainer}>
            <h1>New Role</h1>
            <Button
              onClick={() => {
                setNewRoleOpen(!newRoleOpen && isAdmin);
              }}
              text="Back"
            />
          </div>

          <NewRole
            uid={uid}
            setMessage={setMessage}
            setAlertOpen={setAlertOpen}
            setSeverity={setSeverity}
          />
        </div>
      ) : (
        <div className={styles.questionContainer}>
          <div
            className={styles.textContainer}
            style={{
              justifyContent: category === "" ? "center" : "space-between",
            }}
          >
            <h1>
              {category === "" ? "Select Category" : `Questions on ${category}`}
            </h1>
            {category !== "" ? (
              <Button
                onClick={() => {
                  setCategory("");
                  setData([]);
                }}
                text="Back"
              />
            ) : null}
          </div>
          {category === "" && data.length === 0 ? (
            <Categories setCategory={setCategory} />
          ) : (
            <QuestionCard
              serverData={data}
              uid={uid}
              setMessage={setMessage}
              setAlertOpen={setAlertOpen}
              setSeverity={setSeverity}
            />
          )}
        </div>
      )}

      <div className={styles.extraContainer}></div>
    </div>
  );
};

export default Home;
