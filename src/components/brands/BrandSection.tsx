import amazon from "../../assets/brand-images/amazon.webp";
import apple from "../../assets/brand-images/apple.webp";
import croma from "../../assets/brand-images/croma.webp";
import Dell from "../../assets/brand-images/Dell.webp";
import Hp from "../../assets/brand-images/Hp.webp";
import jbl from "../../assets/brand-images/jbl.webp";
import lenovo from "../../assets/brand-images/lenovo.webp";
import lg from "../../assets/brand-images/LG.webp";
import mi from "../../assets/brand-images/mi.webp";
import oppo from "../../assets/brand-images/oppo.webp";
import panasonic from "../../assets/brand-images/panasonic.webp";
import philips from "../../assets/brand-images/philips.webp";
import samsung from "../../assets/brand-images/Samsung.webp";
import sony from "../../assets/brand-images/sony.webp";
import vivo from "../../assets/brand-images/vivo.webp";
import Slider from 'react-slick';
import { CarouselContainer, BrandCard, BrandImage, NextArrow, PrevArrow,Container } from './BrandStyle';
import { Grid, Typography } from "@mui/material";
import { useRef, useState } from "react";


const images = [
  { id: 1, src: amazon, alt: 'Amazon' },
  { id: 2, src: apple, alt: 'Apple' },
  { id: 3, src: croma, alt: 'Croma' },
  { id: 4, src: Dell, alt: 'Dell' },
  { id: 5, src: Hp, alt: 'HP' },
  { id: 6, src: jbl, alt: 'JBL' },
  { id: 7, src: lenovo, alt: 'Lenovo' },
  { id: 8, src: lg, alt: 'LG' },
  { id: 9, src: mi, alt: 'Mi' },
  { id: 10, src: oppo, alt: 'Oppo' },
  { id: 11, src: panasonic, alt: 'Panasonic' },
  { id: 12, src: philips, alt: 'Philips' },
  { id: 13, src: samsung, alt: 'Samsung' },
  { id: 14, src: sony, alt: 'Sony' },
  { id: 15, src: vivo, alt: 'Vivo' },
  { id: 16, src: lenovo, alt: 'Lenovo' }
];
const BrandSection = () => {
  const sliderRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    nextArrow: <NextArrow disabled={slideIndex === images.length - 8} />,
    prevArrow: <PrevArrow disabled={slideIndex === 0} />,
    afterChange: (current:any) => setSlideIndex(current),
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
          slidesToShow: 5,
          slidesToScroll: 4,
          arrows: false,
          rows: 2
        },
      },
    ],

  };


  return (
    <Container container >
      <Grid item xs={12}>
        <CarouselContainer>
          <Typography>Top Brands</Typography>

          <Slider {...settings} ref={sliderRef}>
            {images.map((brand) => (
              <BrandCard key={brand.id}>
                <BrandImage src={brand.src} alt={brand.alt} />
              </BrandCard>
            ))}
          </Slider>

        </CarouselContainer>
      </Grid>
    </Container>
  );
};




export default BrandSection;
