import WidgetCards from '../../components/widges/WidgetCards';
import Carousel from '../../components/carousel/Carousel';
import BrandSection from '../../components/brands/BrandSection';
import Cards from "../../components/cards-images/Cards";

const Dashboard = () => {
  return (
    <div>
      <Carousel />
      <WidgetCards />
      <BrandSection />
      <Cards />
    </div>
  )
}

export default Dashboard