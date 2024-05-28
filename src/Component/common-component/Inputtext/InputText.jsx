import { Field } from "formik";
import style from "../Inputtext/controls.module.css";

const InputText = ({ label, name, ...rest }) => {
  const today = new Date().toISOString().split("T")[0];
  const maxDate = name === "dob" ? { max: today } : {};

  return (
    <div className="d-flex flex-column mb-1">
      <label htmlFor={name} className={style.bold}>
        {label}
      </label>
      {/* Hidden input field to prevent autofill in the name field */}
      {name === "name" && (
        <input
          type="text"
          name="fake-name"
          style={{ display: "none" }}
          autoComplete="off"
        />
      )}
      <Field
        id={name}
        className="form-control input"
        name={name}
        {...rest}
        {...maxDate}
        autoComplete="off"
      />
    </div>
  );
};

export default InputText;
