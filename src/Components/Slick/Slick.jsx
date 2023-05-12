import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styled from 'styled-components';
import slick from '../../Assets/Slick/slick.svg';
const Slick = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    speed: 500,
    initialSlide: 2,
    cssEase: 'linear',
  };
  return (
    <Container>
      <Slider {...settings}>
        <Img>
          <img src={slick} alt="playstore" />
        </Img>
        <Img>
          {' '}
          <img src={slick} alt="playstore" />
        </Img>
        <Img>
          {' '}
          <img src={slick} alt="playstore" />
        </Img>
      </Slider>
    </Container>
  );
};

export default Slick;
const Container = styled.div`
  margin-top: 18px;
  .slick-dots {
    button::before {
      color: #c1c1c1;
    }
    .slick-active {
      button::before {
        color: #fa3a45;
      }
    }
  }
`;
const Img = styled.div`
  width: 343px;
  height: 100px;
  img {
    object-fit: cover;
  }
`;
