import React from 'react';
import styles from './ImageSlice.module.scss';

const ImageSlice = props => {
  return (
    <div className={styles.image} key={props.index}>
      <img src={props.single.image.url} />
      <div
        dangerouslySetInnerHTML={{
          __html: props.single.image_caption.html
        }}
      />
    </div>
  );
};

export default ImageSlice;
