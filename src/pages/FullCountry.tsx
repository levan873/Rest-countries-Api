import React, { useState, useEffect } from "react";
import { GoArrowLeft } from 'react-icons/go';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

interface Country {
  flag: string;
  name: string;
  nativeName: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  topLevelDomain: string;
  currencies: { code: string }[];
  languages: { name: string }[];
  borders: string[];
}

const FullCountry: React.FC = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const navigate = useNavigate();

  const [country, setCountry] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v2/name/${countryName}`);
        setCountry(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching country:', error);
      }
    };

    fetchCountryData();
  }, [countryName]);

  useEffect(() => {
    if (country?.borders && country.borders.length > 0) {
      const borderAlphaCodes = country.borders.join(',');
      axios
        .get(`https://restcountries.com/v2/alpha?codes=${borderAlphaCodes}`)
        .then(response => setBorderCountries(response.data))
        .catch(error => console.error('Error fetching border countries:', error));
    }
  }, [country]);

  return (
    <div className="min-h-[100vh] dark:bg-gray-900 pb-10">
      <button
        className=' flex items-center gap-3 ml-14 m-10 mb-14 pr-5 pl-3 p-1 shadow-md'
        style={{boxShadow: '1px 1px 5px 1px rgba(0, 0, 0, 0.37)'}}
        onClick={() => navigate(-1)}
      >
        <GoArrowLeft />
        <h6>Back</h6>
      </button>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : country && (
          <div className='countryPage '> 
            <div>
              <img className='max-w-[400px] mb-10' src={country.flag} alt='flag' />
            </div>
            <div>
              <h1 className='text-3xl font-bold mb-5'>{country.name}</h1>
              <div className='countryPageInfo flex gap-20'>
                <div className='flex gap-1 flex-col mb-6'>
                  <p><strong>Native Name:</strong> {country.nativeName}</p>
                  <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                  <p><strong>Region:</strong> {country.region}</p>
                  <p><strong>Sub Region:</strong> {country.subregion}</p>
                  <p><strong>Capital:</strong> {country.capital}</p>
                </div>
                <div className='flex gap-1 flex-col'>
                  <p><strong>Top Level Domain:</strong> {country.topLevelDomain}</p>
                  <p><strong>Currencies:</strong> {country.currencies.map(currency => currency.code)}</p>
                  <p><strong>Languages:</strong> {country.languages.map(language => language.name).join(', ')}</p>
                </div>
              </div>
              <div className='borderInfo flex mb-10'>
                <strong className='BIS pr-10'>Border Countries:</strong>
                <div className='flex flex-wrap gap-4'>
                  {borderCountries.length > 0 ? (
                    borderCountries.map(borderCountry => (
                      <Link
                        className=' dark:bg-gray-800 text-base pr-5 pl-3 p-1 shadow-md'
                        style={{boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.37)'}}
                        key={borderCountry.name}
                        to={`/country/${borderCountry.name}`}
                      >
                        {borderCountry.name}
                      </Link>
                    ))
                  ) : (
                    'No border country found'
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullCountry;
