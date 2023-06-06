import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styled from 'styled-components';
import { trainApi } from '../../apis/Instance';
import { useState } from 'react';
import { useEffect } from 'react';
const ProfileSlick = () => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    const userId = localStorage.getItem('userId');
    const { data } = await trainApi.getConvers(userId);
    setProfile(data?.userInfo?.images);
  };
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
        {profile.map((item, i) => (
          <Img src={profile?.[i]?.image_url} />
        ))}
      </Slider>
    </Container>
  );
};

export default ProfileSlick;
const Container = styled.div`
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
  transform: scale(1);
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 999px;
  cursor: pointer;

  .rdg-image {
    image-rendering: -moz-crisp-edges; /* Firefox */
    image-rendering: -o-crisp-edges; /* Opera */
    image-rendering: -webkit-optimize-contrast; /* Webkit 표준 X */
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor; /* IE 표준 X */
  }

  .rdg-image {
    -ms-transform: translateZ(0); // ie
    -moz-transform: translateZ(0); // firefox
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
  .rdg-image {
    -moz-backface-visibility: hidden; // firefox
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
`;
