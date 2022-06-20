import React from "react";
import styles from "./DisplayResult.module.css"

const DisplayResult = ({ result }) => {
  return (
    <div className={styles.container}>
        <h3>Recommended careers are :-</h3>
      {result.map((dat,idx) => {
        return <li key={idx}> &#10146; {dat}</li>;
      })}
    </div>
  );
};

export default DisplayResult;
