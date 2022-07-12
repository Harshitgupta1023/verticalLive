import React, { useEffect, useState } from "react";
import styles from "./RoleDetails.module.css";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import Loading from "../Loading/Loading";
import TableRoleDetails from "../Table/TableRoleDetails";
import { fetchRoleData, fetchQualityData } from "./RoleDetailsUtil";

const RoleDetails = ({ category }) => {
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
  }, []);

  useEffect(() => {
    let curId = roleIDList[roleList.indexOf(role)];
    if (curId !== "") {
      fetchQualityData(curId, setIsLoading, setRoleQualityData);
    }
    setRoleID(curId);
  }, [role]);

  if (isLoading) {
    return <Loading />;
  }
  const headData = ["quality", "weight"];

  return (
    <div className={styles.container}>
      <hr style={{ marginBottom: "15px" }} />

      <div className={styles.menuContainer}>
          <h1 style={{marginRight:"15px"}}>Description of</h1>
          <DropDownMenu
            state={role}
            setState={setRole}
            listItem={roleList}
            classStyle={styles.dropDownStyle2}
            disabled={role === ""}
          />
      </div>
      <div className={styles.tableContainer}>
        {roleQualityData.length === 0 ? null : (
          <TableRoleDetails headData={headData} data={roleQualityData} />
        )}
      </div>
    </div>
  );
};

export default RoleDetails;
