import React from "react";
import styles from "./Dashboard.module.css";

export default function Dashboard({ isDropable, handleUpdateDropable }) {
  const dragOverHandler = (e) => {
    e.preventDefault();
    handleUpdateDropable(true);
  };
  const dragLeaveHandler = (e) => {
    handleUpdateDropable(false);
  };
  return (
    <div
      onDragOver={(e) => dragOverHandler(e)}
      onDragStart={(e) => dragOverHandler(e)}
      onDragLeave={dragLeaveHandler}
      className={styles.dashboard}
    >
      <div className={isDropable ? styles.wrapper : ""}></div>
    </div>
  );
}
