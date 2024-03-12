import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cookies from "../../assets/carousel-images/cookies.webp";
import favour from "../../assets/carousel-images/favour.webp";
import rice from "../../assets/carousel-images/rice.webp";
import salt from "../../assets/carousel-images/salty.webp";
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import { Box } from "@mui/material";
import {


} from "./CaroselStyles";

interface Image {
  id: number;
  src: string;
  alt: string;
}

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <Box className="custom-arrow next" onClick={onClick} >
      <ArrowCircleRightRoundedIcon />
    </Box>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  console.log('Rendering PrevArrow');
  return (
    <Box className="custom-arrow prev" onClick={onClick} >
      <ArrowCircleLeftRoundedIcon />
    </Box>
  );
};

const Carousel: React.FC = () => {
  const [currentslide, setcurrentslide] = useState(0);
  const images: Image[] = [
    { id: 1, src: cookies, alt: 'Image 1' },
    { id: 2, src: favour, alt: 'Image 2' },
    { id: 3, src: rice, alt: 'Image 3' },
    { id: 4, src: salt, alt: 'Image 4' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i: number) => (
      <Box
        key={i}
        style={{
          width: '8px',
          left: '5px',
          position: 'relative',
          top: '5px',
          height: '8px',
          background: currentslide === i ? '#fff' : '#fff',
          borderRadius: '50%',
          transition: 'background-color 0.3s ease',
          transform: currentslide === i ? 'scale(1.5)' : 'scale(1)',
        }}
      />
    ),
    appendDots: (dots: any) => (
      <Box
        style={{
          position: 'absolute',
          bottom: '5px',
          left: '50%',
          transform: 'translateX(-50%)',
          height: '1.125rem',
          textAlign: 'center',
          background: '#3b3c36',
          width: 'auto',
          borderRadius: '25px',

        }}>
        {dots}
      </Box>
    ),
    beforeChange: (next: number) => {
      setcurrentslide(next);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box margin="auto" width="90%" marginTop="10px">
      <Slider {...settings} >
        {images.map((item, index) => (
          <Box className="img" key={index} >
            <img
              src={item.src}
              alt={`slide ${index + 1}`}
              style={{ width: "100%", height: "400px", borderRadius: '5px' }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
