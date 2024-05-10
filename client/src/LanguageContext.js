// LanguageContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getSupportedLanguages } from './api';

const LanguageContext = createContext({
  languages: [] // Initialize languages as an empty array
});

export const LanguageProvider = ({ children }) => {
  
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await getSupportedLanguages();
        const languageList = response.map(([code, details]) => ({
          code: code, // Use the language code as the key
          name: details.name // Use the native name for display
        }));
        setLanguages(languageList);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <LanguageContext.Provider value={{ languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguages = () => useContext(LanguageContext);
