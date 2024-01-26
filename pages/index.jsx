// pages/index.js

import { useEffect } from 'react';
import db from '../db/index'

const IndexPage = () => {
  useEffect(() => {
    const testing = async () => {
        try {
          const response = await fetch('/api/add-char', {
            method: 'POST',
          })

          if (response.ok) {

          } else {
            console.error('Failed');
          }
        } catch (error) {
          console.error('Error:', error);
        }
        };

        testing();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      <p>Try this.</p>
    </div>
  );
};

export default IndexPage;