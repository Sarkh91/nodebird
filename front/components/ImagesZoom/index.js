import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useRecoilValue } from 'recoil';
import { imagePrefixAtom } from '../../atoms';
import { Overlay, Global, Header, CloseBtn, SliderWrapper, ImageWrapper, Indicator } from './styles';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const IMAGE_PREFIX = useRecoilValue(imagePrefixAtom);

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SliderWrapper>
        <div>
          <Slider
            afterChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
          >
            {images.map((v) => (
              <ImageWrapper key={IMAGE_PREFIX + v.src}>
                <img src={IMAGE_PREFIX + v.src} alt={IMAGE_PREFIX + v.src} />
              </ImageWrapper>
            ))}
          </Slider>
          <Indicator>
            <div>
              {currentSlide + 1}
              {'   '}
              /
              {images.length }
            </div>
          </Indicator>
        </div>
      </SliderWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
