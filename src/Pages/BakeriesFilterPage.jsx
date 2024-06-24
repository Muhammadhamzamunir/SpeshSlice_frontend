// import React, { useState, useEffect } from "react";
// import ReactPaginate from "react-paginate";
// import BannerCard from "../Components/shopCard";
// import Button from "../Components/Button";
// import Index from "../Components/API";
// import { useUserData } from "../Components/UserAuthentication(ContextApi)";
// import { getDistance } from "geolib";

// const BakeriesFilterPage = () => {
//   const { APIcall } = Index();
//   const { userInfo } = useUserData();
//   const lightColors = ['#f3e8e8', '#f0e8d5', '#e7eaf3', '#f3e8e8', '#f0e8d5'];
//   const [bakeries, setBakeries] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [filters, setFilters] = useState({
//     bakery: "",
//     specialty: "",
//     rating: 0,
//     distance: 0,
//     bakeryOptions: []
//   });
//   const [currentPage, setCurrentPage] = useState(0);
//   const bakeriesPerPage = 9;
//   const [showAllBakeries, setShowAllBakeries] = useState(true);

//   const [userLocation, setUserLocation] = useState({
//     latitude: null,
//     longitude: null,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setIsError(false);
//       try {
//         const response = await APIcall('/bakery', 'GET');
//         console.log("API response:", response); // Log entire response
//         if (response && response.data) {
//           const data = response.data;
//           console.log("Fetched bakery data:", data); // Log fetched data
//           setBakeries(data);
//           const uniqueCategories = [...new Set(data.map(item => item.specialty))];
//           setCategories(uniqueCategories);
//           const uniqueBakeryNames = [...new Set(data.map(item => item.business_name))];
//           setFilters(prevFilters => ({ ...prevFilters, bakeryOptions: uniqueBakeryNames }));
//         } else {
//           throw new Error("Invalid API response structure");
//         }
//       } catch (error) {
//         console.error("Error fetching bakery data:", error);
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const fetchUserAddress = async () => {
//       try {
//         const { address } = userInfo.user;
//         const defaultAddress = address.find(addr => addr.default === true);
//         if (defaultAddress) {
//           const { longitude, latitude } = defaultAddress;
//           setUserLocation({ longitude, latitude });
//         }
//       } catch (error) {
//         console.error("Error fetching user address:", error);
//       }
//     };

//     fetchData();
//     fetchUserAddress();
//   }, [APIcall, userInfo]);

//   const handleFilterChange = (name, value) => {
//     setFilters({ ...filters, [name]: value });
//     setCurrentPage(0);
//     setShowAllBakeries(false);
//   };

//   const handleRatingChange = (rating) => {
//     setFilters({ ...filters, rating });
//     setCurrentPage(0);
//     setShowAllBakeries(false);
//   };

//   const clearAllFilters = () => {
//     setFilters({
//       bakery: "",
//       specialty: "",
//       rating: 0,
//       distance: 0,
//       bakeryOptions: filters.bakeryOptions // Preserve bakeryOptions
//     });
//     setCurrentPage(0);
//     setShowAllBakeries(true);
//   };

//   const filteredBakeries = bakeries
//     .filter(bakery => {
//       console.log("Filtering bakery:", bakery); // Debug filtering logic
//       return (
//         (filters.bakery === "" || bakery.business_name.toLowerCase().includes(filters.bakery.toLowerCase())) &&
//         (filters.specialty === "" || bakery.specialty.toLowerCase().includes(filters.specialty.toLowerCase())) &&
//         (filters.rating === 0 || parseFloat(bakery.averageRating) >= filters.rating)
//       );
//     })
//     .map(bakery => {
//       const distance = userLocation.latitude && userLocation.longitude && bakery.latitude && bakery.longitude
//         ? (getDistance(
//             { latitude: userLocation.latitude, longitude: userLocation.longitude },
//             { latitude: bakery.latitude, longitude: bakery.longitude }
//           ) / 1000).toFixed(2)
//         : null;

//       return {
//         ...bakery,
//         distance
//       };
//     })
//     .filter(bakery => {
//       return (filters.distance === 0 || (filters.distance === 10000 && bakery.distance > 10) || (bakery.distance <= filters.distance));
//     })
//     .sort((a, b) => a.distance - b.distance);

//   console.log("Filtered bakeries:", filteredBakeries); // Log filtered data

//   const displayBakeries = showAllBakeries ? bakeries : filteredBakeries;

//   const startIndex = currentPage * bakeriesPerPage;
//   const endIndex = Math.min(startIndex + bakeriesPerPage, displayBakeries.length);
//   const currentBakeries = displayBakeries.slice(startIndex, endIndex);
//   const pageCount = Math.ceil(displayBakeries.length / bakeriesPerPage);

//   const handlePageChange = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row">
//       <div className="lg:w-1/5 border rounded-md p-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent font-bold">Filters</h2>
//           <Button onClick={clearAllFilters} className=" mb-4">
//             Clear All Filters
//           </Button>
//         </div>
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
//         <div className="mb-4">
//           <label className="block text-gradient-1 font-semibold mb-1">Rating:</label>
//           {[...Array(5)].map((_, index) => (
//             <label key={index} className="inline-block ml-2">
//               <input
//                 type="radio"
//                 checked={filters.rating === index + 1}
//                 onChange={() => handleRatingChange(index + 1)}
//                 className="mr-1"
//               />
//               {[...Array(index + 1)].map((_, starIndex) => (
//                 <span key={starIndex} className="text-yellow-500">&#9733;</span>
//               ))}
//             </label>
//           ))}
//         </div>
//         <div className="mb-4">
//           <label className="block text-gradient-1 font-semibold mb-1">Distance (km):</label>
//           <select
//             value={filters.distance}
//             onChange={e => handleFilterChange("distance", parseInt(e.target.value))}
//             className="border border-gray-300 rounded p-2 w-full"
//           >
//             <option value="0">Any</option>
//             <option value="1">1 km</option>
//             <option value="5">5 km</option>
//             <option value="10">10 km</option>
//             <option value="10000">Above 10 km</option>
//           </select>
//         </div>
//       </div>
//       <div className="lg:w-4/5 p-4">
//         {isLoading ? (
//           <div><h1>We Are Loading Bakeries Please Wait....</h1></div>
//         ) : isError ? (
//           <div>Error loading products</div>
//         ) : (
//           <>
//             {currentBakeries.length > 0 ? (
//               <>
//                 <h2 className="text-2xl bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent font-bold mb-4">Available Bakeries</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {currentBakeries.map(bakery => (
//                     <div key={bakery.id} className="w-full" style={{ backgroundColor: lightColors[bakery.id % lightColors.length] }}>
//                       <BannerCard bakery={bakery} />
//                     </div>
//                   ))}
//                 </div>
//               </>
//             ) : (
//               <p className="font-bold text-red-500 text-3xl">No bakeries match the applied filters.</p>
//             )}
//             {displayBakeries.length > 0 && (
//               <div className="flex justify-center mt-4 md:space-x-6">
//                 <ReactPaginate
//                   previousLabel={"← Previous"}
//                   nextLabel={"Next →"}
//                   breakLabel={"..."}
//                   breakClassName={"break-me"}
//                   pageCount={pageCount}
//                   marginPagesDisplayed={2}
//                   pageRangeDisplayed={5}
//                   onPageChange={handlePageChange}
//                   containerClassName={"pagination flex"}
//                   activeClassName={"bg-pink-500"}
//                   pageLinkClassName={"bg-gray-200 py-1 px-2 md:py-2 md:px-4 hover:bg-pink-500 hover:text-white active:bg-pink-500"}
//                   previousLinkClassName={"bg-gray-200 py-1 px-2 md:py-2 md:px-4 hover:bg-pink-500 hover:text-white"}
//                   nextLinkClassName={"bg-gray-200 py-1 px-2 md:py-2 md:px-4 hover:bg-pink-500 hover:text-white"}
//                 />
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BakeriesFilterPage;




import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import BannerCard from "../Components/shopCard";
import Button from "../Components/Button";
import Index from "../Components/API";
import { useUserData } from "../Components/UserAuthentication(ContextApi)";
import { getDistance } from "geolib";

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
    distance: 0,
    bakeryOptions: []
  });
  const [currentPage, setCurrentPage] = useState(0);
  const bakeriesPerPage = 9;
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await APIcall('/bakery', 'GET');
        console.log("API response:", response); // Log entire response
        if (response && response.data) {
          const data = response.data;
          console.log("Fetched bakery data:", data); // Log fetched data
          setBakeries(data);
          const uniqueCategories = [...new Set(data.map(item => item.specialty))];
          setCategories(uniqueCategories);
          const uniqueBakeryNames = [...new Set(data.map(item => item.business_name))];
          setFilters(prevFilters => ({ ...prevFilters, bakeryOptions: uniqueBakeryNames }));
        } else {
          throw new Error("Invalid API response structure");
        }
      } catch (error) {
        console.error("Error fetching bakery data:", error);
      }
    };

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

    fetchData();
    fetchUserAddress();
  }, [APIcall, userInfo]);

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
    setCurrentPage(0);
  };

  const handleRatingChange = (rating) => {
    setFilters({ ...filters, rating });
    setCurrentPage(0);
  };

  const clearAllFilters = () => {
    setFilters({
      bakery: "",
      specialty: "",
      rating: 0,
      distance: 0,
      bakeryOptions: filters.bakeryOptions // Preserve bakeryOptions
    });
    setCurrentPage(0);
  };

  const filteredBakeries = bakeries
    .filter(bakery => {
      return (
        (filters.bakery === "" || bakery.business_name.toLowerCase().includes(filters.bakery.toLowerCase())) &&
        (filters.specialty === "" || bakery.specialty.toLowerCase().includes(filters.specialty.toLowerCase())) &&
        (filters.rating === 0 || parseFloat(bakery.averageRating) >= filters.rating)
      );
    })
    .map(bakery => {
      const distance = userLocation.latitude && userLocation.longitude && bakery.latitude && bakery.longitude
        ? (getDistance(
            { latitude: userLocation.latitude, longitude: userLocation.longitude },
            { latitude: bakery.latitude, longitude: bakery.longitude }
          ) / 1000).toFixed(2)
        : null;

      return {
        ...bakery,
        distance
      };
    })
    .filter(bakery => {
      return (filters.distance === 0 || (filters.distance === 10000 && bakery.distance > 10) || (bakery.distance <= filters.distance));
    })
    .sort((a, b) => a.distance - b.distance);

  const displayBakeries = filters.bakery || filters.specialty || filters.rating || filters.distance ? filteredBakeries : bakeries;

  const startIndex = currentPage * bakeriesPerPage;
  const endIndex = Math.min(startIndex + bakeriesPerPage, displayBakeries.length);
  const currentBakeries = displayBakeries.slice(startIndex, endIndex);
  const pageCount = Math.ceil(displayBakeries.length / bakeriesPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/5 border rounded-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent font-bold">Filters</h2>
          <Button onClick={clearAllFilters} className=" mb-4">
            Clear All Filters
          </Button>
        </div>
        <div className="flex justify-between mt-4">
          <div>
            {Object.entries(filters).map(([key, value]) => {
              if (value) {
                return (
                  <div key={key} className="flex items-center justify-between text-sm mb-2">
                    <span className="mr-1">{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</span>
                    <button onClick={() => setFilters({ ...filters, [key]: "" })} className="text-pink-600 hover:text-pink-800">
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
        <div className="mb-4">
          <label className="block text-gradient-1 font-semibold mb-1">Rating:</label>
          {[...Array(5)].map((_, index) => (
            <label key={index} className="inline-block ml-2">
              <input
                type="radio"
                checked={filters.rating === index + 1}
                onChange={() => handleRatingChange(index + 1)}
                className="mr-1"
              />
              {[...Array(index + 1)].map((_, starIndex) => (
                <span key={starIndex} className="text-yellow-500">&#9733;</span>
              ))}
            </label>
          ))}
        </div>
        <div className="mb-4">
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
        </div>
      </div>
      <div className="lg:w-4/5 p-4">
        <>
          {currentBakeries.length > 0 ? (
            <>
              <h2 className="text-2xl bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent font-bold mb-4">Available Bakeries</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentBakeries.map(bakery => (
                  <div key={bakery.id} className="w-full" style={{ backgroundColor: lightColors[bakery.id % lightColors.length] }}>
                    <BannerCard bakery={bakery} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="font-bold text-red-500 text-3xl">No bakeries match the applied filters.</p>
          )}
          {displayBakeries.length > 0 && (
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
        </>
      </div>
    </div>
  );
};

export default BakeriesFilterPage;

