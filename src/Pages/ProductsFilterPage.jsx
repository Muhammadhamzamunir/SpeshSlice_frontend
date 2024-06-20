
import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard2";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Button from "../Components/Button";
import ReactPaginate from "react-paginate";
import { useLocation } from 'react-router-dom';
import Index from "../Components/API";
import { useQuery } from 'react-query';

const fetchProducts = async (APIcall) => {
  const response = await APIcall('/products', 'GET');
  return response.data;
};

const ProductsFilterPage = () => {
  const { APIcall } = Index();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  const [filters, setFilters] = useState({
    price: [0, 100],
    bakery: "",
    category: "",
    minPounds: "",
    maxPounds: "",
    minServings: "",
    maxServings: "",
    availableOnly: false,
    order: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [uniqueBakeries, setUniqueBakeries] = useState([]);
  const productsPerPage = 6;

  const { data: products = [], isLoading, isError } = useQuery('products', () => fetchProducts(APIcall));

  useEffect(() => {
    if (products) {
      
      const categories = Array.from(new Set(products.map(item => item.category.name)));
      const bakeries = Array.from(new Set(products.map(item => item.bakery.business_name)));
      setUniqueCategories(categories);
      setUniqueBakeries(bakeries);
     
    }
   
    if (category) {
      setFilters((prevFilters) => ({ ...prevFilters, category }));
    }
  }, [category,isLoading]);

  const handleFilterChange = (name, value) => {
    if (["minPounds", "maxPounds", "minServings", "maxServings"].includes(name)) {
      value = Math.max(0, parseInt(value, 10));
    }
    setFilters({ ...filters, [name]: value });
    setCurrentPage(0);
  };

  const clearAllFilters = () => {
    setFilters({
      price: [0, 100],
      bakery: "",
      category: "",
      minPounds: "",
      maxPounds: "",
      minServings: "",
      maxServings: "",
      availableOnly: false,
      order: "ascending",
    });
    setCurrentPage(0);
  };

  const filteredProducts = products.filter((product) => {
    
    return (
      
      product.price >= filters.price[0] &&
      product.price <= filters.price[1] &&
      (filters.bakery === "" || product.bakery.business_name.toLowerCase() === filters.bakery.toLowerCase()) &&
      (filters.category === "" || product.category.name.toLowerCase() === filters.category.toLowerCase()) &&
      (filters.minPounds === "" || parseInt(product.no_of_pounds) >= parseInt(filters.minPounds)) &&
      (filters.maxPounds === "" || parseInt(product.no_of_pounds) <= parseInt(filters.maxPounds)) &&
      (filters.minServings === "" || parseInt(product.no_of_serving) >= parseInt(filters.minServings)) &&
      (filters.maxServings === "" || parseInt(product.no_of_serving) <= parseInt(filters.maxServings)) &&
      (!filters.availableOnly || product.is_available)
    );
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (filters.order === "ascending") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const startIndex = currentPage * productsPerPage;
  const endIndex = Math.min(startIndex + productsPerPage, sortedProducts.length);
  const currentProducts = sortedProducts.slice(startIndex, endIndex);
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="flex flex-col lg:flex-row ">
      <div className="lg:w-1/5  border rounded-md p-4">
        <div className="flex  justify-between">
          <h2 className="text-2xl bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent font-bold mb-4">Filters</h2>
          <Button onClick={clearAllFilters} className=" mb-4">Clear All Filters</Button>
        </div>
        <div>
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
        </div>
        <div className="mb-4">
          <label className="block text-gradient-1 font-semibold mb-1">Price:</label>
          <div className="flex items-center justify-between text-black">
            <span className="mr-3">${filters.price[0]}</span>
            <Slider
              range
              min={0}
              max={100}
              value={filters.price}
              onChange={(value) => handleFilterChange("price", value)}
            />
            <span className="ml-3">${filters.price[1]}</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gradient-1 font-semibold mb-1">Bakery:</label>
          <select
            name="bakery"
            value={filters.bakery}
            onChange={(e) => handleFilterChange("bakery", e.target.value)}
            className="border border-gray-300 rounded p-2 w-full text-slate-400"
          >
            <option value="">All</option>
            {uniqueBakeries.map((product) => (
              <option key={product} value={product}>{product}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gradient-1 font-semibold mb-1">Category:</label>
          <select
            name="category"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">All</option>
            {uniqueCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <label className="block text-gradient-1 font-semibold mb-1">Pounds:</label>
        <div className="flex items-center justify-between gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPounds}
            onChange={(e) => handleFilterChange("minPounds", e.target.value)}
            className="border border-gray-300 rounded p-2 w-full "
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPounds}
            onChange={(e) => handleFilterChange("maxPounds", e.target.value)}
            className="border border-gray-300 rounded p-2 w-full "
          />
        </div>
        <label className="block text-gradient-1 font-semibold mb-1 mt-4">Servings:</label>
        <div className="flex items-center justify-between gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minServings}
            onChange={(e) => handleFilterChange("minServings", e.target.value)}
            className="border border-gray-300 rounded p-2 w-full "
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxServings}
            onChange={(e) => handleFilterChange("maxServings", e.target.value)}
            className="border border-gray-300 rounded p-2 w-full "
          />
        </div>
        <div className="mb-4">
          <label className="block text-gradient-1 font-semibold mb-1 mt-4">Availability:</label>
          <input
            type="checkbox"
            name="availableOnly"
            checked={filters.availableOnly}
            onChange={(e) => handleFilterChange("availableOnly", e.target.checked)}
          />
          <label className="ml-2 text-black">Available only</label>
        </div>
        <div className="mb-4">
          <label className="block text-gradient-1 font-semibold mb-1">Order:</label>
          <select
            name="order"
            value={filters.order}
            onChange={(e) => handleFilterChange("order", e.target.value)}
            className="border border-gray-300 rounded p-2 w-full text-slate-400"
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
      </div>
      <div className="lg:w-4/5 mt-6 lg:mt-0">
        {isLoading ? (
          <div><h1>We Are Loading Products Please Wait....</h1></div>
        ) : isError ? (
          <div>Error loading products</div>
        ) : (
          <>
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="mt-5 mx-auto"><h1 >
                No products found</h1></div>
            )}
               {/* Pagination */}
         {currentProducts.length > 0 && (
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
              pageLinkClassName={"bg-gray-200 py-1 px-2 md:py-2 md:px-4 hover:bg-pink-500 hover:text-white"}
              previousLinkClassName={"bg-gray-200 py-1 px-2 md:py-2 md:px-4 hover:bg-pink-500 hover:text-white"}
              nextLinkClassName={"bg-gray-200 py-1 px-2 md:py-2 md:px-4 hover:bg-pink-500 hover:text-white"}
              activeClassName={{ backgroundColor: '#ff007f' }}
              activeLinkStyle={{ backgroundColor: '#ff007f' }} // Pink color
            />
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsFilterPage;


// import React, { useState, useEffect } from "react";
// import ProductCard from "../Components/ProductCard2";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";
// import Button from "../Components/Button";
// import ReactPaginate from "react-paginate";
// import { useLocation } from 'react-router-dom';
// import Index from "../Components/API";
// const ProductsFilterPage = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [bakeries, setBakeries] = useState([]);
//   const [discount, setDiscount] = useState("");
//   const [cities, setCities] = useState([]);
//   const location = useLocation();
//   const { APIcall } = Index();
//   const queryParams = new URLSearchParams(location.search);
//   const category = queryParams.get('category');

//   const [filters, setFilters] = useState({
//     price: [0, 100],
//     bakery: "",
//     category: "",
//     minPounds: "",
//     maxPounds: "",
//     minServings: "",
//     maxServings: "",
//     availableOnly: false,
//     order: "ascending",
//   });
//   const [currentPage, setCurrentPage] = useState(0);
//   const productsPerPage = 6;
//   let sampleProducts = [];
//   useEffect(() => {
//     APIcall('/products', 'GET')
//       .then((data) => {
//         sampleProducts = data.data
//         setProducts(sampleProducts);

//         // Extract unique categories, bakeries, and cities from products
//         const uniqueCategories = [...new Set(sampleProducts.map(product => product.category.name))];
//         const uniqueBakeries = [...new Set(sampleProducts.map(product => product.bakery.business_name))];
//         const uniqueCities = [...new Set(sampleProducts.map(product => product.bakery.city))];

//         setCategories(uniqueCategories);
//         setBakeries(uniqueBakeries);
//         setCities(uniqueCities);
//         if (category) {
//           setFilters({ ...filters, ["category"]: category });
//         }

//       })


//   }, [category]);

//   const handleFilterChange = (name, value) => {
//     // Prevent negative values
//     if (name === "minPounds" || name === "maxPounds" || name === "minServings" || name === "maxServings") {
//       value = Math.max(0, parseInt(value)); // Convert value to integer and ensure it's not negative
//     }
//     setFilters({ ...filters, [name]: value });
//     setCurrentPage(0); // Reset to first page when filters change
//   };

//   const clearAllFilters = () => {
//     setFilters({
//       price: [0, 100],
//       bakery: "",
//       category: "",
//       minPounds: "",
//       maxPounds: "",
//       minServings: "",
//       maxServings: "",
//       availableOnly: false,
//       order: "ascending",
//     });
//     setCurrentPage(0);
//   };

//   // Filter and sort products
//   const filteredProducts = products.filter((product) => {
//     return (
//       (product.price >= filters.price[0]) &&
//       (product.price <= filters.price[1]) &&
//       (filters.bakery === "" || product.bakery.business_name.toLowerCase() === filters.bakery.toLowerCase()) &&
//       (filters.category === "" || product.category.name.toLowerCase() === filters.category.toLowerCase()) &&
//       (filters.minPounds === "" || parseInt(product.no_of_pounds) >= parseInt(filters.minPounds)) &&
//       (filters.maxPounds === "" || parseInt(product.no_of_pounds) <= parseInt(filters.maxPounds)) &&
//       (filters.minServings === "" || parseInt(product.no_of_serving) >= parseInt(filters.minServings)) &&
//       (filters.maxServings === "" || parseInt(product.no_of_serving) <= parseInt(filters.maxServings)) &&
//       (!filters.availableOnly || product.is_available)
//     );
//   });

//   const sortedProducts = filteredProducts.sort((a, b) => {
//     if (filters.order === "ascending") {
//       return a.price - b.price;
//     } else {
//       return b.price - a.price;
//     }
//   });

//   // Pagination logic
//   const startIndex = currentPage * productsPerPage;
//   const endIndex = Math.min(startIndex + productsPerPage, sortedProducts.length);
//   const currentProducts = sortedProducts.slice(startIndex, endIndex);
//   const pageCount = Math.ceil(filteredProducts.length / productsPerPage); // Calculate the number of pages

//   const handlePageChange = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const handleDiscountChange = (e) => {
//     setDiscount(e.target.value);
//   };
//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [])
//   return (
//     <div className="flex flex-col lg:flex-row ">
//       <div className="lg:w-1/5  border rounded-md p-4">
//         <div className="flex  justify-between">
//           {/* Filter section */}
//           <h2 className="text-2xl bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent font-bold mb-4">Filters</h2>
//           <Button onClick={clearAllFilters} className=" mb-4">
//             Clear All Filters
//           </Button>
//         </div>
//         <div>
//           {/* Applied Filters */}
//           <div className="flex justify-between mt-4">
//             <div>
//               {Object.entries(filters).map(([key, value]) => {
//                 if (value) {
//                   return (
//                     <div key={key} className="flex items-center justify-between text-sm mb-2">
//                       <span className="mr-1">{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</span>
//                       <button onClick={() => setFilters({ ...filters, [key]: "" })} className="text-pink-600 hover:text-pink-800">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" viewBox="0 0 20 20" fill="currentColor">
//                           <path fillRule="evenodd" d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5.293 7.293a1 1 0 0 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 1 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 1.414-1.414L10 8.586l4.293-4.293z" clipRule="evenodd" />
//                         </svg>
//                       </button>
//                     </div>
//                   );
//                 }
//                 return null;
//               })}
//             </div>

//           </div>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gradient-1 font-semibold mb-1">Price:</label>
//           <div className="flex items-center justify-between text-black">
//             <span className="mr-3">${filters.price[0]}</span>
//             <Slider
//               range
//               min={0}
//               max={100}
//               value={filters.price}
//               onChange={(value) => handleFilterChange("price", value)}
//             />
//             <span className="ml-3">${filters.price[1]}</span>
//           </div>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gradient-1 font-semibold mb-1">Bakery:</label>
//           <select
//             name="bakery"
//             value={filters.bakery}
//             onChange={(e) => handleFilterChange("bakery", e.target.value)}
//             className="border border-gray-300 rounded p-2 w-full text-slate-400"
//           >
//             <option value="">All</option>
//             {bakeries.map((bakery, index) => (
//               <option key={index} value={bakery}>{bakery}</option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gradient-1 font-semibold mb-1">Category:</label>
//           <select
//             name="category"
//             value={filters.category}
//             onChange={(e) => handleFilterChange("category", e.target.value)}
//             className="border border-gray-300 rounded p-2 w-full text-slate-400"
//           >
//             <option value="">All</option>
//             {categories.map((category, index) => (
//               <option key={index} value={category}>{category}</option>
//             ))}
//           </select>
//         </div>
//         <label className="block text-gradient-1 font-semibold mb-1"> Pounds:</label>
//         <div className="flex items-center justify-between gap-2">
//           <input
//             type="number"
//             placeholder="Min"
//             value={filters.minPounds}
//             onChange={(e) => handleFilterChange("minPounds", e.target.value)}
//             className="border border-gray-300 rounded p-2 w-full "
//           />
//           <input
//             type="number"
//             placeholder="Max"
//             value={filters.maxPounds}
//             onChange={(e) => handleFilterChange("maxPounds", e.target.value)}
//             className="border border-gray-300 rounded p-2 w-full"
//           />
//         </div>
//         <label className="block text-gradient-1 font-semibold mb-1"> Servings:</label>
//         <div className="flex items-center justify-between gap-2">
//           <input
//             type="number"
//             placeholder="Min"
//             value={filters.minServings}
//             onChange={(e) => handleFilterChange("minServings", e.target.value)}
//             className="border border-gray-300 rounded p-2 w-full"
//           />
//           <input
//             type="number"
//             placeholder="Max"
//             value={filters.maxServings}
//             onChange={(e) => handleFilterChange("maxServings", e.target.value)}
//             className="border border-gray-300 rounded p-2 w-full"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gradient-1 font-semibold mb-1">Order:</label>
//           <select
//             name="order"
//             value={filters.order}
//             onChange={(e) => handleFilterChange("order", e.target.value)}
//             className="border border-gray-300 rounded p-2 w-full text-slate-400"
//           >
//             <option value="ascending">Low to High</option>
//             <option value="descending">High to Low</option>
//           </select>
//         </div>
//         {/* <div className="mb-4">
//           <label className="block text-gradient-1 font-semibold mb-1">Discount:</label>
//           <input
//             type="text"
//             value={discount}
//             onChange={handleDiscountChange}
//             className="border border-gray-300 rounded p-2 w-full"
//           />
//         </div> */}
//         <div className="mb-4">
//           <label className="block text-gradient-1 font-semibold mb-1">
//             <input
//               type="checkbox"
//               checked={filters.availableOnly}
//               onChange={(e) => handleFilterChange("availableOnly", e.target.checked)}
//               className="mr-2"
//             />
//             Available Only
//           </label>
//         </div>
//       </div>
//       <div className="lg:w-3/4 p-4">
//         {/* Product cards */}
//         {currentProducts.length > 0 ? (
//           <>
//             <h2 className="text-2xl bg-gradient-to-r from-gradient-1 to-gradient-5 bg-clip-text text-transparent font-bold mb-4">Available Cakes</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:h-[1000px]">
//               {currentProducts.map((product) => (
//                 <div key={product.id} className="w-full">
//                   <ProductCard product={product} />
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <p className="font-bold text-red-500 text-3xl ">No products match the applied filters.</p>
//         )}
//         {/* Pagination */}
//         {currentProducts.length > 0 && (
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
//               pageLinkClassName={"bg-gray-200 py-1 px-2 md:py-2 md:px-4 hover:bg-pink-500 hover:text-white"}
//               previousLinkClassName={"bg-gray-200 py-1 px-2 md:py-2 md:px-4 hover:bg-pink-500 hover:text-white"}
//               nextLinkClassName={"bg-gray-200 py-1 px-2 md:py-2 md:px-4 hover:bg-pink-500 hover:text-white"}
//               activeClassName={"custom-active-class"}
//               activeLinkStyle={{ backgroundColor: '#ff007f' }} // Pink color
//             />
//           </div>
//         )}



//       </div>

//     </div>
//   );
// };

// export default ProductsFilterPage;