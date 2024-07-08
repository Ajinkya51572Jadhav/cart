
import BannerProduct from '../components/BannerProduct';
import CategoryList from '../components/CategoryList';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VarticalProductCard from '../components/VarticalProductCard';
const Home = () => {
  return (
    <div>
         <CategoryList/>
         <BannerProduct/> 
         <HorizontalCardProduct category={"airpodes"} heading={"Top Airpodes"}/>
         <HorizontalCardProduct category={"earphones"} heading={"Top Earphones"}/>
         <VarticalProductCard category={"mobile"} heading={"Top Mobiles"}/>
         <VarticalProductCard category={"camera"} heading={"Top Camera"}/>
         <VarticalProductCard category={"mouse"} heading={"Top Mouse"}/>
    </div>
  )
}

export default Home;