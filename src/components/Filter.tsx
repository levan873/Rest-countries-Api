import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

interface Region {
  value: string;
  label: string;
}

interface FilterProps {
  regionFilter: string;
  setRegionFilter: React.Dispatch<React.SetStateAction<string>>;
}

const regions: Region[] = [
  { value: 'All', label: 'Filter by Region' },
  { value: 'Africa', label: 'Africa' },
  { value: 'Americas', label: 'America' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Oceania', label: 'Oceania' },
];

const Filter: React.FC<FilterProps> = ({ regionFilter, setRegionFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (region: string) => {
    setRegionFilter(region);
    setIsOpen(false);
  };

  const selectedRegionLabel = regions.find(region => region.value === regionFilter)?.label;

  return (
    <div className='dark:bg-gray-800 flex items-center cursor-pointer min-h-[50px] min-w-[190px] pl-5 pr-5 relative shadow-md' style={{ boxShadow: '1px 1px 5px 1px rgba(0, 0, 0, 0.37)' }}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <div className=' flex items-center justify-between ' style={{ width: '150px' }}>
          {selectedRegionLabel}
          <IoIosArrowDown />
        </div>
        {isOpen && (
          <ul className='mt-2 dropdown dark:bg-gray-800' style={{ boxShadow: '1px 1px 5px 1px rgba(0, 0, 0, 0.37)' }}>
            {regions.map(region => (
              <li
                key={region.value}
                onClick={() => handleOptionClick(region.value)}
                className='pb-2'
              >
                {region.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filter;
