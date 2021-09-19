import React from "react";

import HeaderCartButton from "./HeaderCartButton";

import foodImg from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={foodImg} alt="A Full Of Dises" />
      </div>
    </>
  );
};

export default Header;
