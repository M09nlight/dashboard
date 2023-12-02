import React from "react";
import styles from "./Dashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import { updateDropable } from "../../redux/dashboard/dashboardSlice";

export default function Dashboard() {
  const isDropable = useSelector((state) => state.dashboard.isDropable);
  const dispatch = useDispatch();
  const dragOverHandler = (e) => {
    e.preventDefault();
    dispatch(updateDropable(true));
  };
  const dragLeaveHandler = (e) => {
    e.preventDefault();
    dispatch(updateDropable(false));
  };
  console.log(isDropable);
  return (
    <div
      onDragOver={(e) => dragOverHandler(e)}
      onDragEnter={(e) => dragOverHandler(e)}
      onDragLeave={dragLeaveHandler}
      className={styles.dashboard}
    >
      <div
        className={
          isDropable ? `${styles.wrapperBg} ${styles.wrapper}` : styles.wrapper
        }
      ></div>
    </div>
  );
}
