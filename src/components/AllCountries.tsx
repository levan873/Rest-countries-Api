import { useEffect, useState } from 'react';
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

  return (
    <div className='pl-14 pr-14 flex flex-wrap gap-20 justify-center'>
      {loading ? (
        <div>Loading...</div>
      ) : (
        filteredCountries.map(country => (
          <Link key={country.name} to={`/country/${country.name}`}>
            <div className="h-[340px] mt-10 w-56 shadow-md" style={{ boxShadow: '0px 2px 5px 1px rgba(0, 0, 0, 0.37)' }}>
              <img className="w-full h-32 rounded-t object-cover" src={country.flag} alt="flag" />
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
  );
};

export default AllCountries;
