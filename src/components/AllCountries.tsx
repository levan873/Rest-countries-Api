import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Country {
  flag: string;
  name: string;
  population: number;
  region: string;
  capital: string;
}

interface AllCountriesProps {
  searchTerm: string;
  regionFilter: string;
}

const AllCountries: React.FC<AllCountriesProps> = ({ searchTerm, regionFilter }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Number of items per page
  const pagesToShow = 6; // Number of pages to show in the pagination

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v2/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (regionFilter === 'All' || country.region === regionFilter)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getPageNumbers = () => {
    const totalPageCount = Math.ceil(filteredCountries.length / itemsPerPage);
    const halfPagesToShow = Math.floor(pagesToShow / 2);

    if (totalPageCount <= pagesToShow) {
      return Array.from({ length: totalPageCount }, (_, index) => index + 1);
    } else if (currentPage <= halfPagesToShow) {
      return Array.from({ length: pagesToShow }, (_, index) => index + 1);
    } else if (currentPage >= totalPageCount - halfPagesToShow) {
      return Array.from({ length: pagesToShow }, (_, index) => totalPageCount - pagesToShow + index + 1);
    } else {
      return Array.from({ length: pagesToShow }, (_, index) => currentPage - halfPagesToShow + index);
    }
  };

  return (
    <div>
      <div className='gridContainer gap-10 pl-14 pr-14 '>
        {loading ? (
          <div>Loading...</div>
        ) : (
          currentCountries.map(country => (
            <Link key={country.name} to={`/country/${country.name}`}>
              <div className="min-w-[200px] rounded-t-lg max-w-[375px] dark:bg-gray-800 object-fit mt-10 shadow-md" style={{ boxShadow: '0px 2px 5px 1px rgba(0, 0, 0, 0.37)' }}>
                <img className="rounded-t-lg min-h-[200px] object-cover" src={country.flag} alt="flag" />
                <div className='p-5 pt-3 flex flex-col gap-2'>
                  <p className=' pb-3 pr-2 font-bold text-xl'>{country.name}</p>
                  <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                  <p><strong>Region:</strong> {country.region}</p>
                  <p><strong>Capital:</strong> {country.capital}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      <div className='flex justify-center mt-5'>
        {getPageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => paginate(pageNumber)}
            className={`mx-1 py-1 px-2 text-sm rounded-md ${
              currentPage === pageNumber ? ' bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}
          >
            {pageNumber}
          </button>
        ))}
        {currentPage + Math.floor(pagesToShow / 2) < Math.ceil(filteredCountries.length / itemsPerPage) && (
          <span className="mx-1 text-gray-600">...</span>
        )}
      </div>
    </div>
  );
};

export default AllCountries;
