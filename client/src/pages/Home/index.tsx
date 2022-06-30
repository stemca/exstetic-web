import { useEffect } from 'react';

import Navbar from '../../components/Navbar';

const Home = () => {
  useEffect(() => {
    console.log('hello world');
  }, []);

  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
};

export default Home;
