import React from "react";
import SearchDropDown from "../Component/SearchDropDown";

const CustomTitle = (props) => {
  const iconStyles = {
    marginRight: -4,
    height: 31,
    width: 35,
    ...(props.icon && props.icon.props.style),
  };

  const searchOptions = ["Upcoming Appointments", "Completed Appointments", "Rejected Appointments"]

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex justify-content-start align-items-center  mt-1 fs-6 gap-2" style={{ fontWeight: "500" }}>
          {props.icon && React.cloneElement(props.icon, { style: iconStyles })}
          {props.showDropdown ? (
            <div className="search-container">
              <select
                className=" dropdown px-1 py-2"
                style={{border:"2px solid grey" , borderRadius:"4px", fontSize:"14px", color:"grey"}}
              >

                {
                  searchOptions.map((item) => (
                    <option>
                      {item}
                    </option>
                  ))
                }

              </select>
            </div>) : props.title}
        </div>
        <div className="d-flex align-items-center">
          <SearchDropDown
            {...props}
          />
        </div>
      </div>

      {/* <div>
        <hr />
      </div> */}
    </>

  );
};

export default CustomTitle;
