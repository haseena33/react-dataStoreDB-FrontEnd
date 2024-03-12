import Slider from 'react-slick';
import { CarouselContainer, Cart, CardsImage, NextArrow, PrevArrow,Container } from './CardStyles'
import frock from '../../assets/card-images/frock.webp';
import bibotop from '../../assets/card-images/bibatop.webp';
import shirt from '../../assets/card-images/shirt.webp';
import shoes from '../../assets/card-images/shoes.webp';
import item from "../../assets/card-images/item.jpg";
import item1 from "../../assets/card-images/item1.webp";
import item2 from "../../assets/card-images/item2.webp";
import item3 from "../../assets/card-images/item3.webp";

const Images = [
  { id: 1, image: frock, alt: 'Frock' },
  { id: 2, image: bibotop, alt: 'Bibotop' },
  { id: 3, image: shirt, alt: 'Shirt' },
  { id: 4, image: shoes, alt: 'Shoes' },
  { id: 5, image: item, alt: 'item' },
  { id: 6, image: item1, alt: 'item1' },
  { id: 7, image: item2, alt: 'item2' },
  { id: 8, image: item3, alt: 'item3' },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: false,
      },
    },
  ],
};

const Cards = () => {
  return (
    <>
      <Container >
      <CarouselContainer>
      <Slider {...settings}>
          {Images.map((Card) => (
            <Cart key={Card.id}>
              <CardsImage src={Card.image} alt={"image"} />
            </Cart>
          ))}
        </Slider>
  
      </CarouselContainer>
      </Container>
    </>
  )
};

export default Cards;
 