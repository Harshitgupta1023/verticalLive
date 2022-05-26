import React from "react";
import styles from "./CategoryCard.module.css";

const CategoryCard = ({ imgName, categoryText, setCategory }) => {
  return (
    <section id={styles.category}>
      <div
        className={styles.category__card}
        onClick={() => {
          setCategory(categoryText);
        }}
      >
        <div className={styles["category__card--img"]}>
          <img src={imgName} className={styles.image} alt="hey" />
        </div>
        <div className={styles["category__card--content"]}>
          <h3 className={styles["category__card--content__title"]}>
            {categoryText}
          </h3>
        </div>
      </div>
    </section>
  );
};

export default CategoryCard;
