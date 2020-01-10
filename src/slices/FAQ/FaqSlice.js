import React from 'react';
import styles from './FaqSlice.module.scss';

const FaqSlice = props => {
  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: props.slice.primary.faq_container.html
        }}
      />
      {props.slice.items.map((single, index) => {
        return (
          <div key={index}>
            <div dangerouslySetInnerHTML={{ __html: single.question.html }} />
            <div dangerouslySetInnerHTML={{ __html: single.answer.html }} />
          </div>
        );
      })}
    </div>
  );
};

export default FaqSlice;
