import React, { useState } from "react";
import classes from "./PaginationButton.module.css";
const PaginationButton = (props) => {
  function clickHandler(e) {
    props.onClick(e.target.textContent);
  }

  return (
    <button
      onClick={(e) => clickHandler(e)}
      className={
        Number(props.btnText) === Number(props.displayUser)
          ? classes.selected
          : classes.btn
      }
    >
      {props.btnText}
    </button>
  );
};

export default PaginationButton;
