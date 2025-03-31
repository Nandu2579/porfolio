import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import ContactForm from '../components/Contact/ContactForm';

const ContactPage = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <ContactForm />
    </div>
  );
};

export default ContactPage;