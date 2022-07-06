import React, { useEffect, useState } from "react";
import styles from "./TableModified.module.css";

const TableRecommendation = ({ headData, data }) => {
  const [sortColumn, setSortColumn] = useState(headData[1]);
  const [ascending, setAscending] = useState(false);

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
                <td className={styles.tableCell}>{dat.role}</td>
                <td className={styles.tableCell}>{dat.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableRecommendation;
