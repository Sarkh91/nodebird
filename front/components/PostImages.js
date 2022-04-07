import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import ImagesZoom from './ImagesZoom';
import { imagePrefixAtom } from '../atoms';

const MultiImagesWrap = styled.div`
  display: inline-block;
  width: 50%;
  text-align: center;
  vertical-align: middle;
`;

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const IMAGE_PREFIX = useRecoilValue(imagePrefixAtom);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img role="presentation" src={IMAGE_PREFIX + images[0].src} alt={IMAGE_PREFIX + images[0].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <div>
          <img role="presentation" width="50%" src={IMAGE_PREFIX + images[0].src} alt={IMAGE_PREFIX + images[0].src} onClick={onZoom} />
          <img role="presentation" width="50%" src={IMAGE_PREFIX + images[1].src} alt={IMAGE_PREFIX + images[1].src} onClick={onZoom} />
          {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <img role="presentation" width="50%" src={IMAGE_PREFIX + images[0].src} alt={IMAGE_PREFIX + images[0].src} onClick={onZoom} />
        <MultiImagesWrap
          role="presentation"
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}개의 사진 더보기
        </MultiImagesWrap>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </div>
    </>
  );
};

export default PostImages;

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

PostImages.defaultProps = {
  images: [],
};
