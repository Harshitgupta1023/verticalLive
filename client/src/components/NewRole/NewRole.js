import React, { useEffect, useState } from "react";
import styles from "./NewRole.module.css";
import { categoryList } from "../../constant/categories";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import Loading from "../Loading/Loading";
import { fetchRoleData, fetchQualityData } from "./NewRoleUtils";
import Button from "../Button/Button";
import TableNewRole from "../Table/TableNewRole";
import axios from "axios";

const NewRole = ({ uid, setMessage, setAlertOpen, setSeverity }) => {
  const [category, setCategory] = useState(categoryList[0]);

  const [roleList, SetRoleList] = useState(["No Role"]);
  const [roleIDList, setRoleIDList] = useState([""]);
  const [role, setRole] = useState(roleList[0]);
  const [roleId, setRoleID] = useState(roleIDList[0]);
  const [roleQualityData, setRoleQualityData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRoleData(
      setIsLoading,
      category,
      SetRoleList,
      setRole,
      setRoleIDList,
      setRoleID
    );
  }, [category]);

  useEffect(() => {
    let curId = roleIDList[roleList.indexOf(role)];
    if (curId !== "") {
      fetchQualityData(curId, setIsLoading, setRoleQualityData);
    }
    setRoleID(curId);
  }, [role]);

  const handleUpdateTable = async () => {
    setIsLoading(true);
    const nameArr = new Array(roleQualityData.length);
    const weightArr = new Array(roleQualityData.length);
    roleQualityData.map((dat) => {
      nameArr[dat.idx] = dat.quality;
      weightArr[dat.idx] = dat.weight.toString();
    });
    try {
      const res = await axios.put(
        process.env.REACT_APP_SERVER_IP + "updateQuality",
        {
          qrid: roleId,
          name: nameArr.join("$$"),
          weight: weightArr.join("$$"),
        }
      );

      setMessage("Update Successfull!!");
      setAlertOpen(true);
      setSeverity("success");
    } catch (err) {
      setMessage(err.response.data.error);
      setAlertOpen(true);
      setSeverity("error");
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }
  const headData = ["quality", "weight", ""];
  return (
    <div className={styles.container}>
      <hr style={{ marginBottom: "15px" }} />

      <div className={styles.menuContainer}>
        <div className={styles.categoryContainer}>
          <DropDownMenu
            state={category}
            setState={setCategory}
            listItem={categoryList}
            classStyle={styles.dropDownStyle1}
          />
        </div>
        <div className={styles.roleContainer}>
          <DropDownMenu
            state={role}
            setState={setRole}
            listItem={roleList}
            classStyle={styles.dropDownStyle2}
            disabled={role === ""}
          />
        </div>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.roleTextContainer}>
          <h1>
            {role === ""
              ? `Feature to be released soon`
              : `Description of ${role}`}
          </h1>
          <Button onClick={handleUpdateTable} text="Update" />
        </div>
        <TableNewRole
          headData={headData}
          data={roleQualityData}
          setData={setRoleQualityData}
          roleId={roleId}
        />
      </div>
    </div>
  );
};

export default NewRole;
