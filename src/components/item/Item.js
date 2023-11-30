import React from "react";
import styles from "./Item.module.css";

export default function Item({
  card,
  addElements,
  updateElements,
  isDropable,
  handleUpdateDropable,
  style,
  elemId,
}) {
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
        console.log("card before update", card);
        updateElements(id, card, x, y);
      }
      handleUpdateDropable(false);
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
