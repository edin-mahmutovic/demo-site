import React from 'react';
import styles from './TextSlice.module.scss';

const TextSlice = props => {
  //console.log("Text Slice props: ", props)
  return (
    <div
      className={styles.text}
      key={props.index}
      dangerouslySetInnerHTML={{ __html: props.single.content.html }}
    />
  );
};

export default TextSlice;
