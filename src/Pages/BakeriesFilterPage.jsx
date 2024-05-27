
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import BannerCard from "../Components/shopCard";
import Button from "../Components/Button";
import Index from "../Components/API";
import { useUserData } from "../Components/UserAuthentication(ContextApi)";

const BakeriesFilterPage = () => {
  const { APIcall } = Index();
  const { userInfo } = useUserData();
  const lightColors = ['#f3e8e8', '#f0e8d5', '#e7eaf3', '#f3e8e8', '#f0e8d5'];
  const [bakeries, setBakeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    bakery: "",
    specialty: "",
    rating: 0,
    distance: 0, // Added distance filter
  });
  const [currentPage, setCurrentPage] = useState(0);
  const bakeriesPerPage = 9;

  // Add state for user's latitude and longitude
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    // Fetch bakery data
    const fetchData = async () => {
      try {
        const response = await APIcall('/bakery', 'GET');
        const data = response.data;
        setBakeries(data);
        const uniqueCategories = [...new Set(data.map(item => item.specialty))];
        setCategories(uniqueCategories);
        const uniqueBakeryNames = [...new Set(data.map(item => item.business_name))];
        setFilters({ ...filters, bakery: "", bakeryOptions: uniqueBakeryNames });
      } catch (error) {
        console.error("Error fetching bakery data:", error);
      }
    };

    fetchData();

    // Fetch user address
    const fetchUserAddress = async () => {
      try {
        const { address } = userInfo.user;
        const defaultAddress = address.find(addr => addr.default === true);
        if (defaultAddress) {
          const { longitude, latitude } = defaultAddress;
          setUserLocation({ longitude, latitude });
          
        }
      } catch (error) {
        console.error("Error fetching user address:", error);
      }
    };

    fetchUserAddress();

  }, []);

  // Function to calculate distance between two sets of coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
    setCurrentPage(0);
  };

  const clearAllFilters = () => {
    setFilters({
      bakery: "",
      specialty: "",
      rating: 0,
      distance: 0,
    });
    setCurrentPage(0);
  };

  // Filter bakeries
  const filteredBakeries = bakeries.filter(bakery => {
    // Calculate distance between user and bakery
    const distance = calculateDistance(userLocation.latitude, userLocation.longitude, bakery.latitude, bakery.longitude);
    return (
      (filters.bakery === "" || bakery.business_name.toLowerCase().includes(filters.bakery.toLowerCase())) &&
      (filters.specialty === "" || bakery.specialty.toLowerCase().includes(filters.specialty.toLowerCase())) &&
      (filters.rating === 0 || parseFloat(bakery.averageRating) >= filters.rating) &&
      (filters.distance === 0 || (filters.distance === 10000 && distance > 10) || (distance <= filters.distance)) 
    );
  });

  // Pagination logic...
  const startIndex = currentPage * bakeriesPerPage;
  const endIndex = Math.min(startIndex + bakeriesPerPage, filteredBakeries.length);
  const currentBakeries = filteredBakeries.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredBakeries.length / bakeriesPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // UI
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Filter section */}
      <div className="lg:w-1/5 border rounded-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent font-bold">Filters</h2>
          <Button onClick={clearAllFilters} className=" mb-4">
            Clear All Filters
          </Button>
        </div>
        {/* Applied Filters */}
        <div className="flex justify-between mt-4">
          <div>
            {Object.entries(filters).map(([key, value]) => {
              if (value) {
                return (
                  <div key={key} className="flex items-center justify-between text-sm mb-2">
                    <span className="mr-1">{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</span>
                    <button onClick={() => setFilters({...filters, [key]: ""})} className="text-pink-600 hover:text-pink-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5.293 7.293a1 1 0 0 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 1 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 1.414-1.414L10 8.586l4.293-4.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        {/* Bakery Filter */}
        <div className="mb-4">
          <label className="block text-gradient-1 font-semibold mb-1">Bakery:</label>
          <select
            value={filters.bakery}
            onChange={e => handleFilterChange("bakery", e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">All</option>
            {filters.bakeryOptions && filters.bakeryOptions.map((bakeryName, index) => (
              <option key={index} value={bakeryName}>{bakeryName}</option>
            ))}
          </select>
        </div>
        {/* Specialty Filter */}
        <div className="mb-4">
          <label className="block text-gradient-1 font-semibold mb-1">Specialty:</label>
          <select
            value={filters.specialty}
            onChange={e => handleFilterChange("specialty", e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        {/* Rating Filter */}
        <div className="mb-4">
          <label className="block text-gradient-1 font-semibold mb-1">Rating:</label>
          {[...Array(5)].map((_, index) => (
            <label key={index} className="inline-block ml-2">
              <input
                type="checkbox"
                checked={filters.rating >= index + 1}
                onChange={() => handleRatingChange(index + 1)}
                className="mr-1"
              />
              {[...Array(index + 1)].map((_, starIndex) => (
                <span key={starIndex} className="text-yellow-500">&#9733;</span>
              ))}
            </label>
          ))}
        </div>
        {/* Distance Filter */}
        {/* <div className="mb-4">
          <label className="block text-gradient-1 font-semibold mb-1">Distance (km):</label>
          <select
            value={filters.distance}
            onChange={e => handleFilterChange("distance", parseInt(e.target.value))}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="0">Any</option>
            <option value="1">1 km</option>
            <option value="5">5 km</option>
            <option value="10">10 km</option>
            <option value="10000">Above 10 km</option>
            
          </select>
        </div> */}

      </div>


      {/* Bakery display section */}
      <div className="lg:w-3/4 p-4">
        {/* Bakery cards */}
        {currentBakeries.length > 0 ? (
          <>
            <h2 className="text-2xl bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent font-bold mb-4">Available Cakes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {currentBakeries.map(bakery => (
                <div key={bakery.id} className="w-full"  style={{ backgroundColor: lightColors[bakery.id % lightColors.length] }}>
                  <BannerCard bakery={bakery} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="font-bold text-red-500 text-3xl">No bakeries match the applied filters.</p>
        )}

        {/* Pagination */}
        {currentBakeries.length > 0 && (
          <div className="flex justify-center mt-4 md:space-x-6">
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination flex"}
              activeClassName={"bg-pink-500"}
              pageLinkClassName={"bg-gray-200 py-1 px-2 md:py-2 md:px-4 hover:bg-pink-500 hover:text-white active:bg-pink-500"}
              previousLinkClassName={"bg-gray-200 py-1 px-2 md:py-2 md:px-4 hover:bg-pink-500 hover:text-white"}
              nextLinkClassName={"bg-gray-200 py-1 px-2 md:py-2 md:px-4 hover:bg-pink-500 hover:text-white"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BakeriesFilterPage;

// import React, { useEffect, useState } from "react";
// import ReactPaginate from "react-paginate";
// import BannerCard from "../Components/shopCard";
// import Button from "../Components/Button";
// import Index from "../Components/API";
// import { useUserData } from "../Components/UserAuthentication(ContextApi)";
// const BakeriesFilterPage = () => {
//   const lightColors = ['#f3e8e8', '#f0e8d5', '#e7eaf3', '#f3e8e8', '#f0e8d5'];
//   const [bakeries, setBakeries] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const { userInfo } = useUserData();
//   const [userAddress, setUserAddress] = useState();

//   useEffect(() => {
//     // userInfo.user.address.forEach(address => {
//     //   if (address.default === true) {
//     //     setUserAddress(address);
//     //   }
//     // });
//   }, [userInfo]);
  
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Radius of the Earth in kilometers
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c; // Distance in kilometers
//     return distance;
//   };
  

//   const filteredBakeries = bakeries.filter(bakery => {
//     if (!userAddress) return true; // If userAddress is not available, show all bakeries
  
//     const distance = calculateDistance(
//       userAddress.latitude,
//       userAddress.longitude,
//       bakery.latitude,
//       bakery.longitude
//     );

//   const { APIcall } = Index();
//   const [filters, setFilters] = useState({
//     bakery: "",
//     specialty: "",
//     rating: 0,
//   });
//   const [currentPage, setCurrentPage] = useState(0);
//   const bakeriesPerPage = 9;
//   let providedData = [];
//   useEffect(() => {

//     APIcall('/bakery', 'GET')
//       .then((data) => {

//         providedData = data.data
//         setBakeries(providedData);
//         const uniqueCategories = [...new Set(providedData.map(item => item.specialty))];
//         setCategories(uniqueCategories);

//         // Extract unique bakery names
//         const uniqueBakeryNames = [...new Set(providedData.map(item => item.business_name))];
//         setFilters({ ...filters, bakery: "", bakeryOptions: uniqueBakeryNames });

//       })




//   }, []);

//   const handleFilterChange = (name, value) => {
//     setFilters({ ...filters, [name]: value });
//     setCurrentPage(0);
//   };

//   const clearAllFilters = () => {
//     setFilters({
//       bakery: "",
//       specialty: "",
//       rating: 0,
//       distance:0,
//     });
//     setCurrentPage(0);
//   };
//   const handleDistanceChange = (value) => {
//     setFilters({ ...filters, distance: value });
//     setCurrentPage(0);
//   };

//   const distanceOptions = [1, 5, 10, 20, 50];
//   // Filter bakeries
//   const filteredBakeries = bakeries.filter(bakery => {
//     return (
//       (filters.bakery === "" || bakery.business_name.toLowerCase().includes(filters.bakery.toLowerCase())) &&
//       (filters.specialty === "" || bakery.specialty.toLowerCase().includes(filters.specialty.toLowerCase())) &&
//             (filters.rating === 0 || parseFloat(bakery.averageRating) >= filters.rating)&&
//             (filters.distance === 0 || distance <= filters.distance)
//     );
//   });

//   // Pagination logic
//   const startIndex = currentPage * bakeriesPerPage;
//   const endIndex = Math.min(startIndex + bakeriesPerPage, filteredBakeries.length);
//   const currentBakeries = filteredBakeries.slice(startIndex, endIndex);
//   const pageCount = Math.ceil(filteredBakeries.length / bakeriesPerPage);

//   const handlePageChange = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const handleRatingChange = (value) => {
//     setFilters({ ...filters, rating: value });
//   };

//   const removeFilter = (filterName) => {
//     setFilters({ ...filters, [filterName]: "" });
//     setCurrentPage(0);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row">
//       {/* Filter section */}
//       <div className="lg:w-1/5 border rounded-md p-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent font-bold">Filters</h2>
//           <Button onClick={clearAllFilters} className=" mb-4">
//             Clear All Filters
//           </Button>
//         </div>
//         {/* Applied Filters */}
//         <div className="flex justify-between mt-4">
//           <div>
//             {Object.entries(filters).map(([key, value]) => {
//               if (value) {
//                 return (
//                   <div key={key} className="flex items-center justify-between text-sm mb-2">
//                     <span className="mr-1">{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</span>
//                     <button onClick={() => setFilters({ ...filters, [key]: "" })} className="text-pink-600 hover:text-pink-800">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5.293 7.293a1 1 0 0 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 1 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 1.414-1.414L10 8.586l4.293-4.293z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                   </div>
//                 );
//               }
//               return null;
//             })}
//           </div>

//         </div>
//         {/* Bakery Filter */}
//         <div className="mb-4">
//           <label className="block text-gradient-1 font-semibold mb-1">Bakery:</label>
//           <select
//             value={filters.bakery}
//             onChange={e => handleFilterChange("bakery", e.target.value)}
//             className="border border-gray-300 rounded p-2 w-full"
//           >
//             <option value="">All</option>
//             {filters.bakeryOptions && filters.bakeryOptions.map((bakeryName, index) => (
//               <option key={index} value={bakeryName}>{bakeryName}</option>
//             ))}
//           </select>
//         </div>

//         {/* Distance Filter */}
// <div className="mb-4">
//   <label className="block text-gradient-1 font-semibold mb-1">Distance (km):</label>
//   <select
//     value={filters.distance}
//     onChange={(e) => handleDistanceChange(Number(e.target.value))}
//     className="border border-gray-300 rounded p-2 w-full"
//   >
//     <option value={0}>Any</option>
//     {distanceOptions.map((distance, index) => (
//       <option key={index} value={distance}>{distance}</option>
//     ))}
//   </select>
// </div>
//         {/* Specialty Filter */}
//         <div className="mb-4">
//           <label className="block text-gradient-1 font-semibold mb-1">Specialty:</label>
//           <select
//             value={filters.specialty}
//             onChange={e => handleFilterChange("specialty", e.target.value)}
//             className="border border-gray-300 rounded p-2 w-full"
//           >
//             <option value="">All</option>
//             {categories.map((category, index) => (
//               <option key={index} value={category}>{category}</option>
//             ))}
//           </select>
//         </div>
    
//         {/* Rating Filter */}
//         <div className="mb-4">
//           <label className="block text-gradient-1 font-semibold mb-1">Rating:</label>
//           {[...Array(5)].map((_, index) => (
//             <label key={index} className="inline-block ml-2">
//               <input
//                 type="checkbox"
//                 checked={filters.rating >= index + 1}
//                 onChange={() => handleRatingChange(index + 1)}
//                 className="mr-1"
//               />
//               {[...Array(index + 1)].map((_, starIndex) => (
//                 <span key={starIndex} className="text-yellow-500">&#9733;</span>
//               ))}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Bakery display section */}
//       <div className="lg:w-3/4 p-4">
//         {/* Bakery cards */}
//         {currentBakeries.length > 0 ? (
//           <>
//             <h2 className="text-2xl bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent font-bold mb-4">Available Cakes</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
//               {currentBakeries.map(bakery => (
//                 <div key={bakery.id} className="w-full" style={{ backgroundColor: lightColors[bakery.id % lightColors.length] }}>
//                   <BannerCard bakery={bakery} />
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <p className="font-bold text-red-500 text-3xl">No bakeries match the applied filters.</p>
//         )}

//         {/* Pagination */}
//         {currentBakeries.length > 0 && (
//           <div className="flex justify-center mt-4 md:space-x-6">
//             <ReactPaginate
//               previousLabel={"← Previous"}
//               nextLabel={"Next →"}
//               breakLabel={"..."}
//               breakClassName={"break-me"}
//               pageCount={pageCount}
//               marginPagesDisplayed={2}
//               pageRangeDisplayed={5}
//               onPageChange={handlePageChange}
//               containerClassName={"pagination flex"}
//               activeClassName={"bg-pink-500"}
//               pageLinkClassName={"bg-gray-200 py-1 px-2 md:py-2 md:px-4 hover:bg-pink-500 hover:text-white active:bg-pink-500"}
//               previousLinkClassName={"bg-gray-200 py-1 px-2 md:py-2 md:px-4 hover:bg-pink-500 hover:text-white"}
//               nextLinkClassName={"bg-gray-200 py-1 px-2 md:py-2 md:px-4 hover:bg-pink-500 hover:text-white"}
//             />
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default BakeriesFilterPage;









// import React, { useEffect, useState } from "react";
// import ReactPaginate from "react-paginate";
// import BannerCard from "../Components/shopCard";
// import Button from "../Components/Button";
// import { useUserData } from "../Components/UserAuthentication(ContextApi)";
// import Index from "../Components/API";

// const BakeriesFilterPage = () => {
//   const lightColors = ['#f3e8e8', '#f0e8d5', '#e7eaf3', '#f3e8e8', '#f0e8d5'];
//   const { userInfo } = useUserData();
//   const {APIcall}= Index();
//   const [userAddress, setUserAddress] = useState();
//   const [bakeries, setBakeries] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [filters, setFilters] = useState({
//     bakery: "",
//     specialty: "",
//     rating: 0,
//     distance: 0,
//   });
//   const [currentPage, setCurrentPage] = useState(0);
//   const bakeriesPerPage = 9;

//   useEffect(() => {
//     // userInfo.user.address.forEach(address => {
//     //   if (address.default === true) {
//     //     setUserAddress(address);
//     //   }
//     // });
//   }, [userInfo]);
//   const distanceOptions = [1, 5, 10, 20, 50];
//   useEffect(() => {
//     APIcall('/bakery', 'GET')
//       .then((data) => {
//         const providedData = data.data;
//         setBakeries(providedData);
//         const uniqueCategories = [...new Set(providedData.map(item => item.specialty))];
//         setCategories(uniqueCategories);
//         const uniqueBakeryNames = [...new Set(providedData.map(item => item.business_name))];
//         setFilters({ ...filters, bakery: "", bakeryOptions: uniqueBakeryNames });
//       });
//   }, []); // Empty dependency array to run once on mount

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Radius of the Earth in kilometers
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c; // Distance in kilometers
//     return distance;
//   };

//   // Filter bakeries
//   const filteredBakeries = bakeries.filter(bakery => {
//     if (!userAddress) return true; // If userAddress is not available, show all bakeries
//     const distance = calculateDistance(userAddress.latitude, userAddress.longitude, bakery.latitude, bakery.longitude);
//     return (
//       (filters.bakery === "" || bakery.business_name.toLowerCase().includes(filters.bakery.toLowerCase())) &&
//       (filters.specialty === "" || bakery.specialty.toLowerCase().includes(filters.specialty.toLowerCase())) &&
//       (filters.rating === 0 || parseFloat(bakery.averageRating) >= filters.rating) &&
//       (filters.distance === 0 || distance <= filters.distance)
//     );
//   });

//   // Pagination logic
//   const startIndex = currentPage * bakeriesPerPage;
//   const endIndex = Math.min(startIndex + bakeriesPerPage, filteredBakeries.length);
//   const currentBakeries = filteredBakeries.slice(startIndex, endIndex);
//   const pageCount = Math.ceil(filteredBakeries.length / bakeriesPerPage);

//   const handleFilterChange = (name, value) => {
//     setFilters({ ...filters, [name]: value });
//     setCurrentPage(0);
//   };

//   const clearAllFilters = () => {
//     setFilters({
//       bakery: "",
//       specialty: "",
//       rating: 0,
//       distance: 0,
//     });
//     setCurrentPage(0);
//   };

//   const handleDistanceChange = (value) => {
//     setFilters({ ...filters, distance: value });
//     setCurrentPage(0);
//   };

//   const handlePageChange = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const handleRatingChange = (value) => {
//     setFilters({ ...filters, rating: value });
//   };

//   return (
//     <div className="flex flex-col lg:flex-row">
//       {/* Filter section */}
//       <div className="lg:w-1/5 border rounded-md p-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent font-bold">Filters</h2>
//           <Button onClick={clearAllFilters} className=" mb-4">
//             Clear All Filters
//           </Button>
//         </div>
//         {/* Applied Filters */}
//         <div className="flex justify-between mt-4">
//           <div>
//             {Object.entries(filters).map(([key, value]) => {
//               if (value) {
//                 return (
//                   <div key={key} className="flex items-center justify-between text-sm mb-2">
//                     <span className="mr-1">{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</span>
//                     <button onClick={() => setFilters({ ...filters, [key]: "" })} className="text-pink-600 hover:text-pink-800">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5.293 7.293a1 1 0 0 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 1 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 1.414-1.414L10 8.586l4.293-4.293z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                   </div>
//                 );
//               }
//               return null;
//             })}
//           </div>

//         </div>
//         {/* Bakery Filter */}
//         <div className="mb-4">
//           <label className="block text-gradient-1 font-semibold mb-1">Bakery:</label>
//           <select
//             value={filters.bakery}
//             onChange={e => handleFilterChange("bakery", e.target.value)}
//             className="border border-gray-300 rounded p-2 w-full"
//           >
//             <option value="">All</option>
//             {filters.bakeryOptions && filters.bakeryOptions.map((bakeryName, index) => (
//               <option key={index} value={bakeryName}>{bakeryName}</option>
//             ))}
//           </select>
//         </div>

//         {/* Distance Filter */}
// {/* <div className="mb-4">
//   <label className="block text-gradient-1 font-semibold mb-1">Distance (km):</label>
//   <select
//     value={filters.distance}
//     onChange={(e) => handleDistanceChange(Number(e.target.value))}
//     className="border border-gray-300 rounded p-2 w-full"
//   >
//     <option value={0}>Any</option>
//     {distanceOptions.map((distance, index) => (
//       <option key={index} value={distance}>{distance}</option>
//     ))}
//   </select>
// </div> */}
//         {/* Specialty Filter */}
//         <div className="mb-4">
//           <label className="block text-gradient-1 font-semibold mb-1">Specialty:</label>
//           <select
//             value={filters.specialty}
//             onChange={e => handleFilterChange("specialty", e.target.value)}
//             className="border border-gray-300 rounded p-2 w-full"
//           >
//             <option value="">All</option>
//             {categories.map((category, index) => (
//               <option key={index} value={category}>{category}</option>
//             ))}
//           </select>
//         </div>
    
//         {/* Rating Filter */}
//         <div className="mb-4">
//           <label className="block text-gradient-1 font-semibold mb-1">Rating:</label>
//           {[...Array(5)].map((_, index) => (
//             <label key={index} className="inline-block ml-2">
//               <input
//                 type="checkbox"
//                 checked={filters.rating >= index + 1}
//                 onChange={() => handleRatingChange(index + 1)}
//                 className="mr-1"
//               />
//               {[...Array(index + 1)].map((_, starIndex) => (
//                 <span key={starIndex} className="text-yellow-500">&#9733;</span>
//               ))}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Bakery display section */}
//       <div className="lg:w-3/4 p-4">
//         {/* Bakery cards */}
//         {currentBakeries.length > 0 ? (
//           <>
//             <h2 className="text-2xl bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent font-bold mb-4">Available Cakes</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
//               {currentBakeries.map(bakery => (
//                 <div key={bakery.id} className="w-full" style={{ backgroundColor: lightColors[bakery.id % lightColors.length] }}>
//                   <BannerCard bakery={bakery} />
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <p className="font-bold text-red-500 text-3xl">No bakeries match the applied filters.</p>
//         )}

//         {/* Pagination */}
//         {currentBakeries.length > 0 && (
//           <div className="flex justify-center mt-4 md:space-x-6">
//             <ReactPaginate
//               previousLabel={"← Previous"}
//               nextLabel={"Next →"}
//               breakLabel={"..."}
//               breakClassName={"break-me"}
//               pageCount={pageCount}
//               marginPagesDisplayed={2}
//               pageRangeDisplayed={5}
//               onPageChange={handlePageChange}
//               containerClassName={"pagination flex"}
//               activeClassName={"bg-pink-500"}
//               pageLinkClassName={"bg-gray-200 py-1 px-2 md:py-2 md:px-4 hover:bg-pink-500 hover:text-white active:bg-pink-500"}
//               previousLinkClassName={"bg-gray-200 py-1 px-2 md:py-2 md:px-4 hover:bg-pink-500 hover:text-white"}
//               nextLinkClassName={"bg-gray-200 py-1 px-2 md:py-2 md:px-4 hover:bg-pink-500 hover:text-white"}
//             />
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default BakeriesFilterPage;
