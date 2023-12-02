import React from "react";
import styles from "./Item.module.css";
import { useSelector, useDispatch } from "react-redux";
import { updateDropable } from "../../redux/dashboard/dashboardSlice";

export default function Item({
  card,
  addElements,
  updateElements,
  style,
  elemId,
}) {
  const isDropable = useSelector((state) => state.dashboard.isDropable);
  const dispatch = useDispatch();

  const dragEndHandler = (e, id) => {
    e.preventDefault();
    if (isDropable) {
      const { pageX, pageY } = e;
      const imageWidth = e.target.getBoundingClientRect().width;
      const imageHeight = e.target.getBoundingClientRect().height;

      const x = pageX - imageWidth / 2;
      const y = pageY - imageHeight / 2;
      if (!id) {
        addElements(card, x, y);
      } else {
        updateElements(id, card, x, y);
      }
      dispatch(updateDropable(false));
    }
  };

  return (
    <div className={styles.card} style={style}>
      <img
        draggable="true"
        onDragEnd={(e) => dragEndHandler(e, elemId)}
        className={styles.img}
        src={`img/${card.imgSrc}`}
        alt=""
      />
    </div>
  );
}
