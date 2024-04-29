import { useEffect } from 'react';
import Header from '../components/shared/Header';
import Welcome from '../components/Welcome';
import Features from '../components/Features';
import HomeSearch from '../components/search/HomeSearch';
import Footer from '../components/shared/Footer';

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <div className='mx-auto bg-white'>
      <Header />
      <Welcome />
      <Features />
      <HomeSearch />
      <Footer />
    </div>
  )
}

export default Home;