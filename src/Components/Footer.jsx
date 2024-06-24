// import React from 'react'

// function Footer() {
//   return (
//     <div className='mt-16' >

//       {/* <svg className="w-full rotate-180 mx-0 border-none" height="80px" viewBox="0 0 1440 181" preserveAspectRatio="none">
//         <path d="M0 96l60-10.7C120 75 240 53 360 74.7 480 96 600 160 720 176s240-16 360-42.7c120-26.3 240-48.3 300-58.6l60-10.7V0H0v96z" fill="black" fillRule="nonzero" stroke="none" strokeWidth="1"></path>
//       </svg> */}
//       {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#000000"  d="M0,128L20,117.3C40,107,80,85,120,69.3C160,53,200,43,240,53.3C280,64,320,96,360,138.7C400,181,440,235,480,240C520,245,560,203,600,160C640,117,680,75,720,96C760,117,800,203,840,208C880,213,920,139,960,112C1000,85,1040,107,1080,117.3C1120,128,1160,128,1200,122.7C1240,117,1280,107,1320,101.3C1360,96,1400,96,1420,96L1440,96L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"></path></svg> */}
//       <svg id="wave" viewBox="0 0 1440 180" version="1.1" xmlns="http://www.w3.org/2000/svg">
//         <defs>
//           <linearGradient id="sw-gradient-0" x1="0" y1="1" x2="0" y2="0">
//             <stop stopColor="white" offset="0%"></stop>
//             <stop stopColor="#FF579A" offset="100%"></stop>
//           </linearGradient>
//         </defs>
//         <path fill="url(#sw-gradient-0)" d="M0,72L11.4,87C22.9,102,46,132,69,144C91.4,156,114,150,137,123C160,96,183,48,206,36C228.6,24,251,48,274,51C297.1,54,320,36,343,42C365.7,48,389,78,411,102C434.3,126,457,144,480,132C502.9,120,526,78,549,69C571.4,60,594,84,617,96C640,108,663,108,686,93C708.6,78,731,48,754,36C777.1,24,800,30,823,39C845.7,48,869,60,891,57C914.3,54,937,36,960,33C982.9,30,1006,42,1029,42C1051.4,42,1074,30,1097,48C1120,66,1143,114,1166,111C1188.6,108,1211,54,1234,54C1257.1,54,1280,108,1303,129C1325.7,150,1349,138,1371,111C1394.3,84,1417,42,1440,42C1462.9,42,1486,84,1509,102C1531.4,120,1554,114,1577,93C1600,72,1623,36,1634,18L1645.7,0L1645.7,180L1634.3,180C1622.9,180,1600,180,1577,180C1554.3,180,1531,180,1509,180C1485.7,180,1463,180,1440,180C1417.1,180,1394,180,1371,180C1348.6,180,1326,180,1303,180C1280,180,1257,180,1234,180C1211.4,180,1189,180,1166,180C1142.9,180,1120,180,1097,180C1074.3,180,1051,180,1029,180C1005.7,180,983,180,960,180C937.1,180,914,180,891,180C868.6,180,846,180,823,180C800,180,777,180,754,180C731.4,180,709,180,686,180C662.9,180,640,180,617,180C594.3,180,571,180,549,180C525.7,180,503,180,480,180C457.1,180,434,180,411,180C388.6,180,366,180,343,180C320,180,297,180,274,180C251.4,180,229,180,206,180C182.9,180,160,180,137,180C114.3,180,91,180,69,180C45.7,180,23,180,11,180L0,180Z"></path>
//       </svg>

//       <footer className="footer  to-white text-slate-400 px-10 py-4 border-t border-none  "
//       // style={{
//       //   background: 'linear-gradient(219deg, rgba(75, 53, 118, 1) 33%, rgba(248, 177, 60, 1) 100%)',marginTop:"3%"
//       // }}
//       >
//         <nav  >
//           <header className="footer-title text-pink-500">Services</header>
//           <a className="link link-hover text-black">Branding</a>
//           <a className="link link-hover text-black">Design</a>
//           <a className="link link-hover text-black">Marketing</a>
//           <a className="link link-hover text-black">Advertisement</a>
//         </nav>
//         <nav>
//           <header className="footer-title text-pink-500">Company</header>
//           <a className="link link-hover">About us</a>
//           <a className="link link-hover">Contact</a>
//           <a className="link link-hover">Jobs</a>
//           <a className="link link-hover">Press kit</a>
//         </nav>
//         <nav>
//           <header className="footer-title text-pink-500">Legal</header>
//           <a className="link link-hover">Terms of use</a>
//           <a className="link link-hover">Privacy policy</a>
//           <a className="link link-hover">Cookie policy</a>
//         </nav>
//         <aside className="items-center grid-flow-col">
//           <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current">
//             <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
//           </svg>
//           <p>ACME Industries Ltd. <br />Providing reliable tech since 1992</p>
//         </aside>
//         <nav className="md:place-self-center md:justify-self-end">
//           <div className="grid grid-flow-col gap-4">
//             <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
//             <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
//             <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
//           </div>
//         </nav>
//       </footer>

//     </div >
//   )
// }

// export default Footer

import React from "react";
import { useUserData } from "./UserAuthentication(ContextApi)";
import { Link } from "react-router-dom";
import Button from "../Components/Button"

const Footer = () => {
  const { userInfo } = useUserData();
  return (
    <div>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f3f4f6" fill-opacity="1" d="M0,192L21.8,170.7C43.6,149,87,107,131,85.3C174.5,64,218,64,262,85.3C305.5,107,349,149,393,181.3C436.4,213,480,235,524,208C567.3,181,611,107,655,112C698.2,117,742,203,785,208C829.1,213,873,139,916,138.7C960,139,1004,213,1047,224C1090.9,235,1135,181,1178,144C1221.8,107,1265,85,1309,96C1352.7,107,1396,149,1418,170.7L1440,192L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path></svg>
   
    <footer className="bg-gray-100 text-gray-800 py-8">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
          <h2 className="text-2xl font-bold mb-2 text-pink-500">SpeshSlice</h2>
          <div className="flex space-x-4">
            <a href="#" aria-label="Twitter" className="text-pink-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.95.555-2.005.959-3.127 1.184-.897-.957-2.173-1.555-3.591-1.555-2.717 0-4.917 2.201-4.917 4.917 0 .39.045.765.127 1.124-4.083-.205-7.702-2.16-10.126-5.134-.422.722-.664 1.561-.664 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.247-2.229-.616v.061c0 2.386 1.697 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 0-.626-.031-.928-.088.627 1.956 2.444 3.377 4.6 3.417-1.68 1.319-3.809 2.107-6.115 2.107-.397 0-.788-.023-1.175-.069 2.188 1.402 4.768 2.22 7.557 2.22 9.054 0 14-7.497 14-14 0-.213-.005-.425-.015-.636.961-.695 1.796-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="text-pink-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.317 3.608 1.292.975.975 1.23 2.242 1.292 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.317 2.633-1.292 3.608-.975.975-2.242 1.23-3.608 1.292-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.317-3.608-1.292-.975-.975-1.23-2.242-1.292-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.317-2.633 1.292-3.608.975-.975 2.242-1.23 3.608-1.292 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.667.014-4.947.072-1.419.062-2.722.325-3.78 1.383-1.058 1.058-1.321 2.361-1.383 3.78-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.062 1.419.325 2.722 1.383 3.78 1.058 1.058 2.361 1.321 3.78 1.383 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.419-.062 2.722-.325 3.78-1.383 1.058-1.058 1.321-2.361 1.383-3.78.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.062-1.419-.325-2.722-1.383-3.78-1.058-1.058-2.361-1.321-3.78-1.383-1.28-.058-1.688-.072-4.947-.072z" />
                <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.164c-2.206 0-4.002-1.796-4.002-4.002s1.796-4.002 4.002-4.002 4.002 1.796 4.002 4.002-1.796 4.002-4.002 4.002zm6.406-11.845c-.796 0-1.44.644-1.44 1.44s.644 1.44 1.44 1.44 1.44-.644 1.44-1.44-.644-1.44-1.44-1.44z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="text-pink-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-4.147-.256-8.292-.256-12.438 0-1.936.12-3.52 1.704-3.64 3.64-.256 4.147-.256 8.292 0 12.438.12 1.936 1.704 3.52 3.64 3.64 4.147.256 8.292.256 12.438 0 1.936-.12 3.52-1.704 3.64-3.64.256-4.147.256-8.292 0-12.438-.12-1.936-1.704-3.52-3.64-3.64zm-10.615 14.645v-10.18l8.225 5.09-8.225 5.09z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
          <h2 className="text-xl font-bold mb-2 text-pink-500">About</h2>
          <p className="mb-1">PO BOX Collins Street West</p>
          <p className="mb-1">+xxx xxxx xxxx</p>
          <p>Mon - Sun: 8AM - 8PM</p>
        </div>
        <div className="flex flex-col items-center lg:items-start mb-6 lg:mb-0">
          <h2 className="text-xl font-bold mb-2 text-pink-500">Quick Links</h2>
          {userInfo.user.isBakeryRegistered ? (
            <Link to="/bakery">Go To Your Store</Link>
          ) : (
            <Link to="/register-bakery">Register Your Bakery Now</Link>
          )}
          <Link to="/customize-cake">Customize Cake</Link>

          {userInfo.user.id && (
            <Link className="nav-link" to="/profile">
              User Profile
            </Link>
          )}
          {/* <a href="#" className="mb-1">Register Your Bakery</a>
          <a href="#" className="mb-1">Customize Your Cake</a>
          <a href="#">User Profile</a> */}
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <h2 className="text-xl font-bold mb-2 text-pink-500">Add Your Address</h2>
        
          {userInfo.user.id && (
            <Link className="nav-link" to="/profile">
             <Button
             
              className="w-full"
            >
              Add Address
            </Button>
            </Link>
          )}
            
         
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
