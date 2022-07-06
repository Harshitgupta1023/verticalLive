import axios from "axios";

export const fetchRoleData = async (
  setIsLoading,
  category,
  SetRoleList,
  setRole,
  setRoleIDList,
  setRoleID,
  setRoleData
) => {
  setIsLoading(true);
  try {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_IP + `fetchRole?category=${category}`
    );
    let tempList = [];
    let tempID = [];
    if (res.data.length !== 0) {
      res.data.map((dat) => {
        tempList.push(dat["name"]);
        tempID.push(dat["rid"]);
      });
      SetRoleList(tempList);
      setRole(tempList[0]);
      setRoleIDList(tempID);
      setRoleID(tempID[0]);
    } else {
      SetRoleList(["No Role"]);
      setRole("");
      setRoleIDList([""]);
      setRoleID("");
    }
  } catch (err) {
    console.log("Fetch Role Data----->", err);
  }
  setIsLoading(false);
};

export const fetchQualityData = async (
  curId,
  setIsLoading,
  setRoleQualityData
) => {
  setIsLoading(true);
  try {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_IP + `fetchQuality?qrid=${curId}`
    );
    let tempName = res.data[0]["name"].split("$$");
    let tempWeight = res.data[0]["weight"].split("$$");
    let tempData = [];
    for (let i = 0; i < tempName.length; i++) {
      tempData.push({
        idx: i,
        quality: tempName[i],
        weight: parseFloat(tempWeight[i]),
      });
    }
    setRoleQualityData(tempData);
  } catch (err) {
    setRoleQualityData([]);
    console.log("Fetch Quality Data----->", err);
  }
  setIsLoading(false);
};
