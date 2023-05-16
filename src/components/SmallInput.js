import React from 'react';
import './SmallInput.css'; // Create this CSS file

const SmallInput = ({ value, onChange, label, ...props }) => (
  <div className="custom-input-container">
    <input 
      className="custom-input-field"
      value={value} 
      onChange={onChange} 
      placeholder={label}  // Assign label to placeholder
      {...props}
    />
  </div>
);

export default SmallInput;
