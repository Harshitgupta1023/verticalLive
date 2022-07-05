import React from "react";
import styles from "./Categories.module.css";
import CategoryCard from "../CategoryCard/CategoryCard";
import {categoryImage} from "../../constant/categories";

const Categories = ({ setCategory }) => {
  return (
    <div className={styles.container}>
      {categoryImage.map((dat, idx) => {
        return (
          <CategoryCard
            key={idx}
            imgName={dat.image}
            categoryText={dat.name}
            setCategory={() => setCategory(dat.name)}
          />
        );
      })}
    </div>
  );
};

export default Categories;
