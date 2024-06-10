import React from "react";
import SearchDropDown from "../Component/SearchDropDown";

const CustomTitle = (props) => {
  const iconStyles = {
    marginRight: -4,
    height: 31,
    width: 35,
    ...(props.icon && props.icon.props.style),
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex justify-content-start align-items-center  mt-1 fs-6 gap-2" style={{ fontWeight: "500" }}>
          {props.icon && React.cloneElement(props.icon, { style: iconStyles })}
          {props.title}
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
