import React from 'react';
import style from './TableSlice.module.scss';

const TableSlice = props => {
  const { primary, items } = props.slice;

  return (
    <div className={style.tableWrapper}>
      <table id={style.tableSlice}>
        <thead>
          <tr>
            <td className={style.left}>{primary.table_heading_1.text}</td>
            <td className={style.right}>{primary.table_heading_2.text}</td>
          </tr>
        </thead>
        <tbody>
          {items.map((single, index) => {
            return (
              <tr key={index}>
                <td className={style.left}>{single.col_1_content.text}</td>
                <td className={style.right}>{single.col_2_content.text}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableSlice;
