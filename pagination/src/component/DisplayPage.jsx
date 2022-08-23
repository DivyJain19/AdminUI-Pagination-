import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import EditAndDelete from "./EditAndDelete";
import PaginationButton from "./PaginationButton";
import ArrowButton from "./ArrowButton";
import Row from "./Row";
const DisplayPage = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [pageSelected, setPageSelected] = useState(1);
  const [editId, setEditId] = useState("");
  const [boxSelected, setBoxSelected] = useState([]);
  const [mainBox, setMainBox] = useState(false);
  const [allDetails, setAllDetails] = useState([]);
  useEffect(() => {
    getData();
    fillDisplay();
  }, []);

  async function getData() {
    let res = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    let data = res.data;
    data.forEach((item) => {
      item.checked = false;
    });

    // console.log(arrConst);
    setUserDetails(data);
    setAllDetails(data);
    // console.log(userDetails);
    return data;
  }
  function displayPageSelected(val) {
    setPageSelected(val);
    // setMainBox(false);
  }
  function fillDisplay(val = 0) {
    let space;
    if (val === 1) {
      space = 0;
    } else {
      space = (val - 1) * 10;
    }
    // let userArray = userDetails;
    const arry = userDetails.slice(space, space + 10);
    // setDisplayUsers(arry);
    return arry;
  }
  const calcButton = function (length) {
    let numberOfButtons = Math.ceil(length / 10);
    let arr = new Array(numberOfButtons).fill(1);
    return arr;
  };
  function calcLastPage() {
    return Math.ceil(userDetails.length / 10);
  }
  function handleDelete(id) {
    // console.log(id);
    let testArray = [...allDetails];
    let array = [...userDetails];
    userDetails.forEach((item, idx) => {
      if (item.id === id) {
        array.splice(idx, 1);
        testArray.splice(testArray.indexOf(item), 1);
      }
    });
    setUserDetails(array);
    setAllDetails(testArray);

    if (
      +pageSelected === +calcLastPage(userDetails) &&
      +fillDisplay(pageSelected).length - 1 <= 0
    ) {
      console.log("hi");
      setPageSelected(pageSelected - 1);
    }
  }
  function handleEdit(id) {
    setEditId(id);
  }
  function handleInputChange(id, val, name) {
    let arr = [...userDetails];
    arr.forEach((item, idx) => {
      if (item.id === id) {
        item[name] = val;
      }
    });
    setUserDetails(arr);
  }
  function onEnter() {
    setEditId("");
  }
  const handleDisplayPageClick = (e) => {
    if (e.target.localName === "input" || e.target.localName === "select") {
      e.stopPropagation();
    } else {
      if (editId !== "") {
        setEditId("");
      }
    }
  };
  // function userDetailsSetter(id) {}
  function handleBoxChange(id) {
    let arr = [...boxSelected];
    if (id >= 0) {
      arr.push(+id);
      userDetails.forEach((item) => {
        if (+item.id === +id) {
          item.checked = true;
        }
      });
      // setBoxSelected(arr);
      // console.log(arr);
    } else {
      arr.splice(arr.indexOf(Math.abs(id)), 1);
      userDetails.forEach((item) => {
        if (+item.id === Math.abs(id)) {
          item.checked = false;
        }
      });
    }
    // console.log(userDetails);
    // setUserDetails(arr);
    setBoxSelected(arr);
  }

  function deleteSelected() {
    let array = [...userDetails];
    let testArray = [...allDetails];
    userDetails.forEach((item) => {
      if (item.checked === true) {
        array.splice(array.indexOf(item), 1);
        // console.log();
        testArray.splice(testArray.indexOf(item), 1);
      }
    });
    setMainBox(false);
    setUserDetails(array);
    setAllDetails(testArray);
    if (+pageSelected === +calcLastPage(userDetails)) {
      if (array.length % 10 > 0) {
        setPageSelected(pageSelected);
      } else {
        setPageSelected(pageSelected - 1);
      }
    } else if (pageSelected === 1) {
      setPageSelected(1);
    } else {
      if (+fillDisplay(pageSelected).length - 1 === 0) {
        setPageSelected(pageSelected - 1);
      } else {
        setPageSelected(pageSelected);
      }
    }
    // console.log(+calcLastPage(userDetails));
    // console.log(+pageSelected);
    // console.log(+fillDisplay(pageSelected).length);
    // if (+pageSelected === +calcLastPage(userDetails)) {
    //   if (+fillDisplay(pageSelected).length === 0) {
    //     setPageSelected(pageSelected - 1);
    //   } else {
    //     setPageSelected(pageSelected);
    //   }
    // } else if (+pageSelected === 1) {
    //   setPageSelected(1);
    // } else {
    //   if (+fillDisplay(pageSelected).length - 1 === 0) {
    //     setPageSelected(pageSelected - 1);
    //   } else {
    //     setPageSelected(pageSelected - 1);
    //   }
    // }
  }

  // setAllDetails(array);
  // console.log(boxSelected);
  // let array = [...userDetails];
  // boxSelected.forEach((id) => {
  //   array.forEach((item, idx) => {
  //     if (+item.id === +id) {
  //       array.splice(idx, 1);
  //     }
  //   });
  //   // handle(String(item));
  // });
  // setDisplayUsers((prevValue) => +prevValue - 1);

  function handleMainBox(e) {
    let arr = [];
    let currentArray = fillDisplay(+pageSelected);
    if (!mainBox) {
      arr = [...userDetails];
      currentArray.forEach((item) => {
        arr[arr.indexOf(item)].checked = true;
      });
    } else {
      arr = [...userDetails];
      currentArray.forEach((item) => {
        arr[arr.indexOf(item)].checked = false;
      });
    }
    setUserDetails(arr);
    setMainBox(!mainBox);
  }

  function handleSearch(e) {
    let arr = [...allDetails];
    console.log(arr);
    let searchArray = [];
    arr.forEach((item) => {
      if (
        item.name.includes(e.target.value) ||
        item.email.includes(e.target.value) ||
        item.role.includes(e.target.value)
      ) {
        searchArray.push(item);
      }
    });
    setUserDetails(searchArray);
    // setUserDetails([...allDetails]);
  }
  return (
    <div className="main" onClick={handleDisplayPageClick}>
      <input
        className="search"
        placeholder="Search by name,email or role"
        type="text"
        onChange={handleSearch}
      />
      {/* <Search /> */}
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                onChange={handleMainBox}
                type="checkbox"
                id="checkbox"
                name="isSelected"
                checked={mainBox}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userDetails &&
            fillDisplay(pageSelected).map((item) => {
              return (
                <tr key={item.id} className={item.checked ? "highLight" : ""}>
                  <Row
                    name={item.name}
                    role={item.role}
                    email={item.email}
                    id={item.id}
                    editId={editId}
                    handleInputChange={handleInputChange}
                    onEnter={onEnter}
                    onBoxChange={handleBoxChange}
                    // mainBox={mainBox}
                    currentPage={pageSelected}
                    checkOrNot={item.checked}
                  />
                  {/* {<td>
                    <input type="checkbox" id="checkbox" name="isSelected" />
                  </td>
                  <td className={`name`}>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>} */}
                  <td>
                    <EditAndDelete
                      identifier="edit"
                      src="https://cdn-icons-png.flaticon.com/128/1827/1827933.png"
                      id={item.id}
                      handleEdit={handleEdit}
                    />
                    <EditAndDelete
                      identifier="delete"
                      src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
                      id={item.id}
                      handleDelete={handleDelete}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="paginationBtn">
        {/* <div>
          <DeleteSelected />
        </div> */}
        <button className="dltSelected" onClick={deleteSelected}>
          Delete Selected
        </button>
        <div className="pageBtn">
          <ArrowButton
            src="https://img.icons8.com/ios-glyphs/2x/double-left.png"
            identifier="superLeft"
            onClick={displayPageSelected}
            displayUser={pageSelected}
            lastPage={calcLastPage()}
          />

          <ArrowButton
            identifier="leftArrow"
            src="https://img.icons8.com/external-becris-lineal-becris/2x/external-left-arrow-mintab-for-ios-becris-lineal-becris.png"
            onClick={displayPageSelected}
            displayUser={pageSelected}
            lastPage={calcLastPage()}
          />
          {userDetails.length > 0 &&
            calcButton(userDetails.length).map((item, idx) => {
              return (
                <PaginationButton
                  key={idx}
                  onClick={displayPageSelected}
                  btnText={idx + 1}
                  displayUser={pageSelected}
                />
              );
            })}
          <ArrowButton
            identifier="rightArrow"
            src="https://img.icons8.com/ios/2x/forward.png"
            onClick={displayPageSelected}
            displayUser={pageSelected}
            lastPage={calcLastPage()}
          />

          <ArrowButton
            src="https://img.icons8.com/ios-glyphs/2x/double-right.png"
            identifier="superRight"
            onClick={displayPageSelected}
            displayUser={pageSelected}
            lastPage={calcLastPage()}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default DisplayPage;
