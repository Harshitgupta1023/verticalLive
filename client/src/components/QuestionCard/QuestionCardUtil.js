export const updateServerData = ({ dat }) => {
  if (dat === undefined) {
    return {};
  }
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
  } else if (dat["questiontype"] === "short") {
    tempObj = {
      name: dat["qid"],
      type: "text",
      title: dat["description"],
      isRequired: true,
      placeHolder: "Enter Text",
    };
  } else if (dat["questiontype"] === "matrix") {
    tempObj = {
      name: dat["qid"],
      type: "matrix",
      title:
        "Please indicate if you agree or disagree with the following statements",
      columns: [
        { value: 1, text: "Strongly Agree" },
        { value: 0.5, text: "Agree"},
        { value: 0, text: "Neutral" },
        { value: -0.5, text: "Disagree" },
        { value: -1, text: "Strongly Disagree" },
      ],
      rows: [],
    };
    dat["description"].split("$$").map((dat) => {
      var [a, b] = dat.split("=");
      tempObj.rows.push({ name:a,value: a, text: b });
    });
  }
  return tempObj;
};
