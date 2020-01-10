import React from 'react';
import style from './LinkSlice.module.scss';

const LinkSlice = props => {
  const { external_link, link_icon, link_placeholder } = props.slice.primary;
  return (
    <div className={style.wrapper}>
      <img src={link_icon.url} />

      <a href={external_link.url}>
        <span>{link_placeholder.text}</span>
      </a>
    </div>
  );
};

export default LinkSlice;
