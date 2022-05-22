import React from "react";
import { makeStyles } from "@mui/styles";
import CategoryCard from "./CategoryCard";
import health from "../assets/health.jpg"
import wealth from "../assets/wealth.jpg"
import hobbies from "../assets/hobbies.jpg" 
import career from "../assets/career.jpg"
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    // width:"15%",
  },
}));

const Categories = ({setCategory}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CategoryCard imgName={health} categoryText="health" setCategory={setCategory}/>
      <CategoryCard imgName={wealth} categoryText="wealth"setCategory={setCategory}/>
      <CategoryCard imgName={hobbies} categoryText="hobbies"setCategory={setCategory}/>
      <CategoryCard imgName={career} categoryText="career"setCategory={setCategory}/>

    </div>
  );
};

export default Categories;
