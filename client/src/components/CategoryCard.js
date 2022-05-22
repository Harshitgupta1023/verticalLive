import React from "react";

const CategoryCard = ({ imgName, categoryText ,setCategory}) => {
  return (
    <section id="category">
      <div
        className="category__card"
        onClick={() => {
          setCategory(categoryText);
        }}
      >
        <div className="category__card--img">
          <img src={imgName} className="image" alt="hey" />
        </div>
        <div className="category__card--content">
          <h3 className="category__card--content__title">{categoryText}</h3>
        </div>
      </div>
    </section>
  );
};

export default CategoryCard;
