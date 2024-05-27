import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import DealCard from './DealCard';
import FilteredBakeryCard from './FilteredBakeryCard';

const Search = ({ products, bakeries }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase().trim();
    setSearchTerm(term);
    setShowDropdown(term.length > 0);

    // Filter products based on name or category
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(term) || 
      product.category.name.toLowerCase().includes(term)
    );
    setFilteredProducts(filteredProducts);
  };

  const filteredBakeries = bakeries.filter(bakery =>
    bakery.business_name.toLowerCase().includes(searchTerm)
  );

  const handleCloseDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        placeholder="Search for products or bakeries..."
        value={searchTerm}
        onChange={handleSearch}
        className="px-4 py-2 w-[900px] border rounded-md focus:outline-none focus:border-pink-500"
      />
      {showDropdown && (
        <div 
          className="absolute left-0 mt-1 w-full max-h-80 overflow-y-auto bg-white shadow-md rounded-md z-10"
          style={{ maxHeight: "calc(100vh - 150px)" }} // Adjust max height based on your layout
        >
          <style>
            {`
              /* CSS for scrollbar */
              ::-webkit-scrollbar {
                width: 8px; /* Set scrollbar width */
              }

              /* Track */
              ::-webkit-scrollbar-track {
                background: transparent; /* Set track color */
              }

              /* Handle */
              ::-webkit-scrollbar-thumb {
                background: pink; /* Set handle color */
                border-radius: 4px; /* Round the handle corners */
              }

              /* Handle on hover */
              ::-webkit-scrollbar-thumb:hover {
                background: #ff579a; /* Change handle color on hover */
              }
            `}
          </style>
          {filteredProducts.length > 0 && (
            <div>
              <h3 className="text-gray-800 font-semibold px-4 ">Products</h3>
              <div>
                {filteredProducts.map((product, index) => (
                  <Link key={product.id} to={`/product/${product.id}`} onClick={handleCloseDropdown}>
                    <div className="px-4  hover:bg-gray-100">
                      <DealCard
                        key={index}
                        name={product.name}
                        imgSrc={product.image_url}
                        price={product.price}
                        category={product.category.name}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {filteredBakeries.length > 0 && (
            <div>
              <h3 className="text-gray-800 font-semibold px-4 py-2">Bakeries</h3>
              <div>
                {filteredBakeries.map(bakery => (
                  <Link key={bakery.id} to={`/bakery/${bakery.id}`} onClick={handleCloseDropdown}>
                    <div className="px-4 py-2 hover:bg-gray-100">
                      <FilteredBakeryCard key={bakery.id} name={bakery.business_name}
                        imgSrc={bakery.logo_url}
                        rating={bakery.averageRating}
                        rating_count={bakery.rating_count}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
