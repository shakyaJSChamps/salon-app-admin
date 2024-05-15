import * as Yup from "yup";

const MIN_AGE = 18;
const getMinDOBDate = () => {
  const currentDate = new Date();
  return new Date(currentDate.getFullYear() - MIN_AGE, currentDate.getMonth(), currentDate.getDate());

}

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
    .max(30, 'Company Name must be at least 30 characters long'),

  email: Yup.string().email('Invalid email').required('Email is required'),
  gstNumber: Yup.string()
    .required('GST Number is required'),
  address: Yup.string().required('Address is required'),
  pincode: Yup.string()
    .required('Pincode is required')
    .matches(/^\d{6}$/, 'Pincode must be 6 digits long'),
  state: Yup.string().required('State is required'),
  serviceType: Yup.string().required('Service Type is required'),
});

export const serviceDetailsSchema = Yup.object().shape({
  services: Yup.array().of(
    Yup.object().shape({
      // categoryId: Yup.number().required('Category ID is required').positive('Category ID must be a positive number'),
      serviceName: Yup.string().required('Service name is required'),
      serviceDuration: Yup.number().required('Service duration is required').positive('Service duration must be a positive number'),
      servicePrice: Yup.number().required('Service price is required').positive('Service price must be a positive number'),
      type: Yup.string().required('Service type is required'),
    })
  ),
});

export const salonOwnerDetailsSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  dateOfBirth: Yup.date().required('Date of Birth is required'),
  firstName: Yup.string().required('First Name is required'),
  gender: Yup.string().required('Gender is required'),
  lastName: Yup.string().required('Last Name is required'),
  middleName: Yup.string().required('Middle Name is required'),
})


export const salesDetailsSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^\d+$/, 'Phone number must contain only digits')
    .max(10, 'Phone number cannot exceed 10 digits')
    .required('Phone number is required'),
  countryCode: Yup.string()
    .required('Country code is required'),
  firstName: Yup.string()
    .required('First Name is required')
    .min(3, 'First Name must be at least 3 characters long')
    .max(30, 'First Name must be at least 30 characters long'),
  lastName: Yup.string()
    .required('Last Name is required')
    .min(3, 'Last Name must be at least 3 characters long')
    .max(30, 'Last Name must be at least 30 characters long'),
  dob: Yup.date()
    .max(getMinDOBDate(), `You must be at least ${MIN_AGE} years old`)
    .required("Date of birth is required"),
  gender: Yup.string().required('Gender is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  accountNumber: Yup.string()
    .required("Account Number is required")
    .matches(/^[0-9]+$/, 'Account Number must contain only digits'),
  accountHolderName: Yup.string()
    .required('Account Holder Name is required')
    .min(3, 'Account Holder Name must have at least 3 letters.')
    .max(30, 'Account Holder Name must have at most 30 letters.'),
  bankName: Yup.string()
    .required('Bank Name is required')
    .min(3, 'Bank Name must be at least 3 characters long')
    .max(50, 'Bank Name must not exceed 50 characters'),
  ifscCode: Yup.string()
    .required("IFSC Code is required")
    .min(11, "IFSC Code must be at least 11 characters"),
  address: Yup.string().required('Address is required'),
  bankdocumentImageUrl: Yup.string()
    .url('Bank document image must be a valid URL')
    .matches(/\.(jpg|jpeg|png|gif|bmp|tiff|heic|heif)$/i, 'Bank document image must be in a supported image format (JPG, JPEG, PNG, GIF, BMP, TIFF, HEIC, HEIF)')
    .required('Bank document image is required'),
  panCardImageUrl: Yup.string()
    .url('Pancard document image must be a valid URL')
    .matches(/\.(jpg|jpeg|png|gif|bmp|tiff|heic|heif)$/i, 'Bank document image must be in a supported image format (JPG, JPEG, PNG, GIF, BMP, TIFF, HEIC, HEIF)')
    .required('Pancard document image is required'),
  aadharFrontImageUrl: Yup.string()
    .url('Aadhar Front document image must be a valid URL')
    .matches(/\.(jpg|jpeg|png|gif|bmp|tiff|heic|heif)$/i, 'Bank document image must be in a supported image format (JPG, JPEG, PNG, GIF, BMP, TIFF, HEIC, HEIF)')
    .required('Aadhar Front document image is required'),
  aadharBackImageUrl: Yup.string()
    .url('Aadhar Back document image must be a valid URL')
    .matches(/\.(jpg|jpeg|png|gif|bmp|tiff|heic|heif)$/i, 'Bank document image must be in a supported image format (JPG, JPEG, PNG, GIF, BMP, TIFF, HEIC, HEIF)')
    .required('Aadhar Back document image is required'),
  profileImageUrl: Yup.string()
    .url('Profile document image must be a valid URL')
    .matches(/\.(jpg|jpeg|png|gif|bmp|tiff|heic|heif)$/i, 'Bank document image must be in a supported image format (JPG, JPEG, PNG, GIF, BMP, TIFF, HEIC, HEIF)')
    .required('Profile document image is required'),
})

export const salonTimeSchema = Yup.object().shape({
  // Define the shape of the form fields
  days: Yup.array().of(
      Yup.object().shape({
          // isOpen should be a boolean and is required
          isOpen: Yup.boolean().required('Please specify if the salon is open or closed'),

          // openTime should be a string and is required
          openTime: Yup.string().when('isOpen', {
              is: true,
              then: Yup.string().required('Please specify the opening time'),
          }),

          // closeTime should be a string and is required when isOpen is true
          closeTime: Yup.string().when('isOpen', {
              is: true,
              then: Yup.string().required('Please specify the closing time'),
          }),
      })
  ),
});