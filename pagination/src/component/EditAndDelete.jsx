import React from "react";
import classes from "./EditAndDelete.module.css";
const EditAndDelete = (props) => {
  function handleClick(id) {
    if (props.identifier === "delete") {
      props.handleDelete(id);
    }
    if (props.identifier === "edit") {
      props.handleEdit(id);
    }
  }

  return (
    <button onClick={() => handleClick(props.id)} className={classes.dlt}>
      <img src={props.src} alt="" className={classes.image} />
    </button>
  );
};

export default EditAndDelete;
// https://cdn-icons-png.flaticon.com/128/6861/6861362.png
