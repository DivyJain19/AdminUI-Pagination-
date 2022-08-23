import React from "react";
import classes from "./ArrowButton.module.css";
export default function ArrowButton(props) {
  const handleArrowClick = () => {
    if (props.identifier === "leftArrow") {
      if (+props.displayUser !== 1) {
        props.onClick(+props.displayUser - 1);
      }
    } else if (props.identifier === "rightArrow") {
      console.log(props.lastPage);
      if (+props.displayUser !== +props.lastPage) {
        props.onClick(+props.displayUser + 1);
      }
    } else if (props.identifier === "superLeft") {
      props.onClick(1);
    } else if (props.identifier === "superRight") {
      console.log(props.lastPage);
      props.onClick(+props.lastPage);
    }
  };

  if (
    +props.displayUser === 1 &&
    (props.identifier === "superLeft" || props.identifier === "leftArrow")
  ) {
    return (
      <button onClick={handleArrowClick} className={classes.disabled}>
        <img className={classes.image} src={props.src} />
      </button>
    );
  }
  if (
    +props.displayUser === +props.lastPage &&
    (props.identifier === "superRight" || props.identifier === "rightArrow")
  ) {
    return (
      <button onClick={handleArrowClick} className={classes.disabled}>
        <img className={classes.image} src={props.src} />
      </button>
    );
  } else {
    return (
      <button onClick={handleArrowClick} className={classes.arrowBtn}>
        <img className={classes.image} src={props.src} />
      </button>
    );
  }
}
// import React, { useState } from "react";
// import classes from "./ArrowButton.module.css";
// const ArrowButton = (props) => {
//   function handleArrowClick(iden) {
//     if (iden === "leftArrowArrow") {
//       if (props.displayUser != 1) {
//         props.onClick(+props.displayUser - 1);
//       }
//     } else if (iden === "rightArrowArrow") {
//       console.log(props.props.lastPage);
//       if (+props.displayUser < +props.lastPage) {
//         props.onClick(+props.displayUser + 1);
//       }
//     } else if (iden === "superRight") {
//       props.onClick(props.lastPage);
//     } else if (iden === "superLeft") {
//       props.onClick(1);
//     }
//   }
//   if (props.identifier === "leftArrow" || props.identifier === "superLeft") {
//     return (
//       <button
//         onClick={() => handleArrowClick(props.identifier)}
//         className={classes.arrowBtn}
//       >
//         <img className={classes.image} src={props.src} alt="" />
//       </button>
//     );
//   }
// };

// export default ArrowButton;
