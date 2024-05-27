import * as Yup from 'yup';

let SignupSchema = Yup.object({
  username: Yup.string().min(2).required("Username is required").matches(
    /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
    'Name can only contain Latin letters.'
  ),
  email: Yup.string().email().required("Email is required").matches(/@[^.]*\./),
  phone: Yup.string().min(10).max(11).required("Phone Number is required"),
  password: Yup.string().min(8).required("Please enter your password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password must match"),
  securityCode: Yup.number().required("Required")
})

let loginSchema = Yup.object({
  email: Yup.string().email().required("Email is required").matches(/@[^.]*\./),
  password: Yup.string().required("Password is required"),
  securityCode: Yup.number().required("Required")
})
const RegisterBakerySchema = Yup.object({
  owner_name: Yup.string().required('Owner Name is required').matches(
    /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
    'Name can only contain Latin letters.'
  ),
  business_name: Yup.string().required('Business Name is required').matches(
    /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
    'Name can only contain Latin letters.'
  ),
  specialty: Yup.string().required('Specialty is required'),
  timing: Yup.string().required('Timing is required'),
  email: Yup.string().email('Invalid email address').required('Email Address is required').matches(/@[^.]*\./),
  phone: Yup.string().required('Phone Number is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  street: Yup.string().required('Street is required'),
  longitude: Yup.string().required('Longitude is required'),
  latitude: Yup.string().required('Latitude is required'),
  price_per_pound: Yup.number().required('Price Per Pound is required'),
  price_per_decoration: Yup.number().required('Price Per Decoration is required'),
  price_per_tier: Yup.number().required('Price Per Tier is required'),
  price_for_shape: Yup.number().required('Price For Shape is required'),
  tax: Yup.number().required('Tax is required'),
  description: Yup.string().required('Description is required'),
});
const addProductSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").matches(
    /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
    'Name can only contain Latin letters.'
  ),
  description: Yup.string().required("Description is required"),
  price: Yup.number().min(1).required("Price is required"),
  category: Yup.number().required("Category is required"),
  no_of_pounds: Yup.number().min(1),
  no_of_serving: Yup.number().min(1),
  quantity: Yup.number().min(0).required("Quantity is required"),
  is_available: Yup.boolean().required("Availability is required"),
  // discount_percentage: Yup.number().nullable(),
  // start_date: Yup.date()
  //   .nullable()
  //   .test('start-date', 'Start date must not be later than current date', function(value) {
  //     const currentDate = new Date();
  //     return !value || value <= currentDate;
  //   }),
  // end_date: Yup.date()
  //   .nullable()
  //   .when("start_date", (start_date, schema) => {
  //     return start_date && schema.min(start_date, "End date must be after start date");
  //   }),
});


const addCategorySchema = Yup.object().shape({
  name: Yup.string().required('Category name is required').matches(
    /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
    'Name can only contain Latin letters.'
  ),

});
export { SignupSchema, loginSchema, RegisterBakerySchema, addProductSchema, addCategorySchema }