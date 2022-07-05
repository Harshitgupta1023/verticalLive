import React from "react";
import styles from "./DropDownMenu.module.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import cx from "classnames";

const DropDownMenu = ({
  state,
  setState,
  listItem,
  classStyle,
  disabled,
}) => {
  return (
    <Select
      value={disabled ? "No Role" : state}
      onChange={(dat) => {
        setState(dat.target.value);
      }}
      className={cx(
        styles.selectItem,
        classStyle === undefined ? "" : classStyle
      )}
      disabled={disabled}
    >
      {listItem.map((dat) => {
        return (
          <MenuItem value={dat} style={{ fontSize: 17 }} key={dat}>
            {dat}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default DropDownMenu;
