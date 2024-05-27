

// import React from 'react';
// import PropTypes from 'prop-types';
// import '../index.css'; 

// const LoginButton = ({ filled }) => {
//   const buttonClassName = filled ? 'filled' : 'unfilled';

//   return (
//     <button className={`login-button ${buttonClassName}`}>
//       {filled ? 'Log In' : 'Log Out'}
//     </button>
//   );
// };

// LoginButton.propTypes = {
//   filled: PropTypes.bool.isRequired,
// };

// export default LoginButton;

const Button = ({ type = 'submit', className, ...props }) => (
    <button
      type={type}
      className={`${className} btn bg-gradient-to-r from-gradient-1 to-gradient-2 hover:from-gradient-1 hover:to-gradient-5 ...  text-white`}
      {...props}
    />
  )
  
  export default Button
