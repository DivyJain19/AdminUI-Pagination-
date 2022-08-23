import React from "react";
import classes from "./Row.module.css";
const Row = (props) => {
  function handleChange(e) {
    props.handleInputChange(props.id, e.target.value, e.target.name);
  }
  function handleBoxChange(e) {
    if (e.target.checked) {
      props.onBoxChange(props.id);
    } else {
      props.onBoxChange(-props.id);
    }
  }

  if (props.id !== props.editId) {
    return (
      <>
        <td>
          <input
            onChange={handleBoxChange}
            type="checkbox"
            id="checkbox"
            name="isSelected"
            checked={props.checkOrNot}
          />
        </td>
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.role}</td>
      </>
    );
  } else {
    return (
      <>
        <td>
          <input
            onChange={handleBoxChange}
            type="checkbox"
            id="checkbox"
            name="isSelected"
            checked={props.checkOrNot}
          />
        </td>
        <td>
          <input
            onChange={handleChange}
            className={classes.inpChange}
            type="text"
            value={props.name}
            name="name"
          />
        </td>
        <td>
          <input
            onChange={handleChange}
            className={classes.inpChange}
            name="email"
            type="text"
            value={props.email}
          />
        </td>
        <td>
          <select
            className={classes.inpChange}
            name="role"
            value={props.role}
            onChange={handleChange}
          >
            <option value="admin">admin</option>
            <option value="member">member</option>
          </select>
          {/* <input
            onChange={handleChange}
            className={classes.inpChange}
            type="text"
            value={props.role}
            name="role"
          /> */}
        </td>
      </>
    );
  }
};

export default Row;
// function test() {
//     if (props.mainBox === true && +props.id <= +props.currentPage * 10) {
//       console.log(+props.id);
//       console.log(+props.currentPage * 10);
//       console.log(true);
//       return true;
//     } else {
//       console.log(false);
//       return false;
//     }
//   }
