import React, { useState } from "react";
import styles from "./NewRole.module.css";
import Button from "../Button/Button";

const NewRole = ({
  uid,
  setMessage,
  setAlertOpen,
  setSeverity,
}) => {
  return (
    <div>
      <h1>In snew Role {uid}</h1>
    </div>
  );
};

export default NewRole;
