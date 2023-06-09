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
          <a
            href="https://docs.google.com/forms/d/1hoBUJrI2Y90C3vdjEylpsJ2LCxJhf3dVIzjmtmX1yjU/edit?ts=64798dbe"
            target="_unblank"
          >
            <img src={slick} alt="playstore" />
          </a>
        </Img>
        <Img>
          {' '}
          <a
            href="https://docs.google.com/forms/d/1hoBUJrI2Y90C3vdjEylpsJ2LCxJhf3dVIzjmtmX1yjU/edit?ts=64798dbe"
            target="_unblank"
          >
            <img src={slick} alt="playstore" />
          </a>
        </Img>
        <Img>
          {' '}
          <a
            href="https://docs.google.com/forms/d/1hoBUJrI2Y90C3vdjEylpsJ2LCxJhf3dVIzjmtmX1yjU/edit?ts=64798dbe"
            target="_unblank"
          >
            <img src={slick} alt="playstore" />
          </a>
        </Img>
      </Slider>
    </Container>
  );
};

export default Slick;
const Container = styled.div`
  outline: none;
  margin-left: 16px;
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
  outline: none;
  width: 343px;
  height: 100px;
  img {
    outline: none;
    object-fit: cover;
  }
  a {
    outline: none;
  }
`;
