import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
export const AccountSettingSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const bankDetailsSchema = Yup.object().shape({
  accountNumber: Yup.string()
    .required("Account Number is required")
    .matches(/^[0-9]+$/, 'Account Number must contain only digits')
    .min(11, "Account Number must be at least 11 digits")
    .max(16, "Account Number must not exceed 16 digits"),
  accountHolderName: Yup.string()
    .required('Account Holder Name is required')
    .matches(/^[A-Z\s]+$/, 'Account Holder Name must be in capital letters.')
    .min(3, 'Account Holder Name must have at least 3 letters.')
    .max(30, 'Account Holder Name must have at most 30 letters.'),
  bankName: Yup.string()
    .required('Bank Name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Bank Name must contain only letters and spaces')
    .min(3, 'Bank Name must be at least 3 characters long')
    .max(50, 'Bank Name must not exceed 50 characters'),
  ifscCode: Yup.string()
    .required("IFSC Code is required")
    .matches(/^[A-Z0-9]+$/, 'IFSC Code must contain only uppercase alphabets and digits')
    .min(11, "IFSC Code must be at least 11 characters")
});

export const salonDetailsSchema = Yup.object().shape({
  companyName: Yup.string()
    .required('Company Name is required')
    .min(3, 'Company Name must be at least 3 characters long')
    .matches(/^[A-Z][a-zA-Z ]*$/, 'Salon Name must start with a capital letter and contain only letters and spaces'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  gstNumber: Yup.string()
    .required('GST Number is required')
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}$/,
      'Invalid GST Number'
    ),
  address: Yup.string().required('Address is required'),
  pincode: Yup.string()
    .required('Pincode is required')
    .matches(/^\d{6}$/, 'Pincode must be 6 digits long'),
  state: Yup.string().required('State is required'),
  serviceType: Yup.string().required('Service Type is required'),
});

export const serviceDetailsSchema = Yup.object().shape({
  // serviceDuration: Yup.string()
  //   .required('Duration is required')
  //   .matches(/^[a-zA-Z0-9\s]+$/, 'Duration must consist only of letters, digits, and spaces'),
  // servicePrice: Yup.string()
  //   .required('Price is required')
  //   .matches(/^\d+$/, 'Price must contain only digits'),
  serviceDuration: Yup.string()
    .required('Duration is required')
    .matches(/^\d+$/, 'Duration must contain only digits'),
  servicePrice: Yup.string()
    .required('Price is required')
    .matches(/^\d+$/, 'Price must contain only digits'),
  type: Yup.string()
    .required('Service Type is required')
    .min(4, 'Service Type must be at least four characters long')
    .matches(/^[^\d\s]{4,}$/, 'Service Type must contain only letters and be at least four characters long')
});


