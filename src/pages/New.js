import React from 'react';
import { motion } from 'framer-motion';
import './Style.css';

const App = () => {
  return (
    <div className="container">
      <div className="fixed-background"></div>
      
   
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="heading"
      >
        Legal Minds
      </motion.h1>

    
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="chat-box"
      >
        <textarea placeholder="Type the detail here..." />
      </motion.div>

     
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="analyze-button"
      >
        Analyze
      </motion.button>
    </div>
  );
};

export default App;
