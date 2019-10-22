import React, { useState } from 'react';
import moment from 'moment';

const Grid = () => {
  const [today, setToday] = useState(moment().format("DD-MM-YYYY"));
  return (
    <div>{today}</div>
  );
}

export default Grid;
