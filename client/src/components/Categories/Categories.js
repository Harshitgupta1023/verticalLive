import React from "react";
import styles from "./Categories.module.css"

import CategoryCard from "../CategoryCard/CategoryCard";
import health from "../../assets/health.jpg"
import wealth from "../../assets/wealth.jpg"
import hobbies from "../../assets/hobbies.jpg" 
import career from "../../assets/career.jpg"

const Categories = ({setCategory}) => {

  return (
    <div className={styles.container}>
      <CategoryCard imgName={health} categoryText="health" setCategory={setCategory}/>
      <CategoryCard imgName={wealth} categoryText="wealth"setCategory={setCategory}/>
      <CategoryCard imgName={hobbies} categoryText="hobbies"setCategory={setCategory}/>
      <CategoryCard imgName={career} categoryText="career"setCategory={setCategory}/>

    </div>
  );
};

export default Categories;
