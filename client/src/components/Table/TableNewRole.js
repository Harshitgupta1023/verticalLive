import React, { useEffect, useState } from "react";
import styles from "./TableModified.module.css";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const TableNewRole = ({ headData, data, setData, roleId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editIdx, setEditIdx] = useState(-1);
  const [qualityVal, setQualityVal] = useState("");
  const [weightVal, setWeightVal] = useState("");

  const [sortColumn, setSortColumn] = useState(headData[0]);
  const [ascending, setAscending] = useState(true);

  function compare(a, b) {
    // console.log(a[sortColumn],b[sortColumn])
    let dir = ascending ? 1 : -1;
    return a[sortColumn] > b[sortColumn] ? 1 * dir : -1 * dir;
  }

  const handleSortColumn = (dat) => {
    if (sortColumn === dat) {
      setAscending(!ascending);
    } else {
      setSortColumn(dat);
      setAscending(true);
    }
  };
  const handleSave = (dat) => {
    let temp = data.filter((e) => e.idx != editIdx);
    temp.push({
      idx: editIdx,
      quality: qualityVal === "" ? dat.quality : qualityVal,
      weight: weightVal === "" ? dat.weight : parseFloat(weightVal),
    });
    setData(temp);
    setEditIdx(-1);
    setIsEdit(false);
    setQualityVal("");
    setWeightVal("");
  };

  return (
    <div className={styles.container}>
      <table className={styles.tableContainer}>
        <thead className={styles.tableHeadContainer}>
          <tr className={styles.tableHeadRow}>
            {headData.map((dat) => {
              return (
                <th
                  key={dat}
                  className={styles.tableHeadCell}
                  onClick={() => {
                    handleSortColumn(dat);
                  }}
                >
                  {dat}
                  {sortColumn === dat ? (
                    ascending ? (
                      <span>▴</span>
                    ) : (
                      <span>▾</span>
                    )
                  ) : null}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={styles.tableBodyContainer}>
          {data.sort(compare).map((dat) => {
            return (
              <tr className={styles.tableRow} key={dat.idx}>
                <td className={styles.tableCell}>
                  {isEdit && dat.idx == editIdx && false ? (
                    <input
                      placeholder={dat.quality}
                      className={styles.inputText}
                      type="text"
                      onChange={(e) => {
                        setQualityVal(e.target.value);
                      }}
                    />
                  ) : (
                    <span>{dat.quality}</span>
                  )}
                </td>
                <td className={styles.tableCell}>
                  {isEdit && dat.idx == editIdx ? (
                    <input
                      placeholder={dat.weight}
                      className={styles.inputText}
                      type="number"
                      onChange={(e) => {
                        setWeightVal(e.target.value);
                      }}
                    />
                  ) : (
                    <span>{dat.weight}</span>
                  )}
                </td>
                <td className={styles.tableCell}>
                  {isEdit && dat.idx == editIdx ? (
                    <SaveIcon
                      onClick={() => {
                        handleSave(dat);
                      }}
                    />
                  ) : (
                    <EditIcon
                      onClick={() => {
                        setEditIdx(dat.idx);
                        setIsEdit(true);
                      }}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableNewRole;
