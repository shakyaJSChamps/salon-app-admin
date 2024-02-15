import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
export const AccountSettingSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
