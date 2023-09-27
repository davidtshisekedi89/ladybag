import MainCarousel from './MainCarousel';
import ShoopingList from './ShoopingList';
import Subscribe from './Subscribe'


const Home = () => {
  return (
    <div className='home'>
      <MainCarousel />
      <ShoopingList /> 
      <Subscribe />
      
    </div>
  )
}

export default Home