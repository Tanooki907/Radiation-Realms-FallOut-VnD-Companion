// pages/index.js

import { useEffect } from 'react';
import db from '../db/index'

const IndexPage = () => {
  useEffect(() => {
    // Connect to MongoDB
    db.char.testing();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      <p>Try this.</p>
    </div>
  );
};

export default IndexPage;