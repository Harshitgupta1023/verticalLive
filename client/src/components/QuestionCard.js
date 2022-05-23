import React from "react";
import "survey-core/modern.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import axios from "axios";

StylesManager.applyTheme("modern");

const QuestionCard = ({ serverData, uid }) => {
  const sendResult = async (sender) => {
    let results = sender.data;
    Object.keys(results).map((dat) => {
      if (typeof results[dat] === "object") {
        results[dat] = results[dat].join("$$");
      }
      return "";
    });
    try {
      const res = await axios.post(process.env.REACT_APP_SERVER_IP + "answer", {
        uid: uid,
        result: results,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const data = {
    elements: [],
  };
  if (serverData.length !== 0) {
    serverData.map((dat) => {
      let tempObj = {};
      if (dat["questiontype"] === "single correct") {
        tempObj = {
          name: dat["qid"],
          type: "radiogroup",
          title: dat["description"],
          isRequired: true,
          colCount: 1,
          choices: dat["answer"].split("$$"),
        };
      } else if (dat["questiontype"] === "multiple correct") {
        tempObj = {
          name: dat["qid"],
          type: "checkbox",
          title: dat["description"],
          isRequired: true,
          colCount: 1,
          choices: dat["answer"].split("$$").filter((x) => x !== ""),
        };
      } else {
        tempObj = {
          name: dat["qid"],
          type: "text",
          title: dat["description"],
          isRequired: true,
          placeHolder: "Enter Text",
        };
      }
      data["elements"].push(tempObj);
      return "";
    });
  }

  const survey = new Model(data);

  survey.onComplete.add(sendResult);

  return (
    <div style={{marginBottom:"5rem"}}>
      {serverData.length !== 0 ? <Survey model={survey} /> : null}
    </div>
  );
};

export default QuestionCard;
