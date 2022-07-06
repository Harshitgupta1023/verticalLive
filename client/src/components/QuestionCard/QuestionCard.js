import React, { useState } from "react";
import styles from "./QuestionCard.module.css";
import "survey-core/modern.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import Button from "../Button/Button";

import axios from "axios";
import DisplayResult from "../DisplayResult/DisplayResult";
import { updateServerData } from "./QuestionCardUtil";
import Loading from "../Loading/Loading";
import TableRecommendation from "../Table/TableRecommendation";

StylesManager.applyTheme("modern");
var myCss = {
  question: {
    title: `${styles.survey_title}`,
  },
  matrix: {
    cell: `${styles.survey_matrix__cell}`,
  },
};

const QuestionCard = ({
  serverData,
  uid,
  setMessage,
  setAlertOpen,
  setSeverity,
  category,
}) => {
  const [displayResult, setDisplayResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendResult = async (sender) => {
    setIsLoading(true);
    let results = sender.data;
    Object.keys(results).map((dat) => {
      if (typeof results[dat] === "object") {
        if (Array.isArray(results[dat])) {
          results[dat] = results[dat].join("$$");
        } else {
          let tempResult = [];
          results[dat] = Object.keys(results[dat]).map((da) => {
            tempResult.push(`${da}=${results[dat][da]}`);
          });
          results[dat] = tempResult.join("$$");
        }
      }
      return "";
    });
    try {
      const res = await axios.post(process.env.REACT_APP_SERVER_IP + "answer", {
        uid: uid,
        result: results,
        category: category,
      });

      let temp = [];
      res.data[0].split("$$").map((dat, idx) => {
        let x = dat.split(",");
        temp.push({
          idx: idx,
          role: x[0],
          score: parseFloat(x[1]),
        });
      });

      setMessage("Answer Submitted Successfully!! ");
      setAlertOpen(true);
      setSeverity("success");
      setDisplayResult(temp);
    } catch (err) {
      setMessage(err.response.data.error);
      setAlertOpen(true);
      setSeverity("error");
    }
    setIsLoading(false);
  };
  const data = {
    elements: [],
  };

  const headData = ["role", "score"];
  if (serverData.length !== 0) {
    serverData.map((dat) => {
      data["elements"].push(updateServerData((dat = { dat })));
      return "";
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  const survey = new Model(data);

  survey.onComplete.add(sendResult);

  return (
    <div className={styles.container}>
      {serverData.length !== 0 && displayResult.length === 0 ? (
        <Survey model={survey} css={myCss} />
      ) : null}
      {displayResult.length !== 0 ? (
        <TableRecommendation data={displayResult} headData={headData} />
      ) : null}
      {displayResult.length !== 0 ? (
        <div className={styles.buttonContainer}>
          <Button
            onClick={() => {
              setDisplayResult([]);
            }}
            text="Again"
          />
          <Button
            onClick={() => {
              console.log("Display more data")
            }}
            text="Next"
          />
        </div>
      ) : null}
    </div>
  );
};

export default QuestionCard;
