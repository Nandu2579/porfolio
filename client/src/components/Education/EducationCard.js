import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const EducationCard = ({ institution, degree, field, year, description }) => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div 
      className={`${darkMode ? 'text-white' : 'text-gray-900'}`}
      whileHover={{ x: 5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row md:items-start">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <div className="px-4 py-2 bg-blue-100/10 rounded-full inline-block">
            <p className="text-blue-600 font-medium">{year}</p>
          </div>
        </div>
        <div className="md:w-3/4 md:pl-6 border-l-2 border-blue-600 relative">
          {/* Dot at the top of the border */}
          <div className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-blue-600"></div>
          
          <h3 className="text-xl font-bold mb-2">{institution}</h3>
          <p className="text-lg font-medium mb-3 text-blue-500">{degree} in {field}</p>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;