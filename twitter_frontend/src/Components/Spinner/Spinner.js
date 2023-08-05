import * as React from 'react';
import "./Spinner.css"
const Spinner = ({ style }) => {
  return (
    <div className="loader" style={{ ...style }}></div>
  );
}
export default Spinner;