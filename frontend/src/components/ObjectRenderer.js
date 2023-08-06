import React from 'react';

const renderValue = (value) => {
  if (Array.isArray(value)) {
    return (
      <ol>
        {value.map((item, index) => (
          <li key={index}>{renderValue(item)}</li>
        ))}
      </ol>
    );
  } else if (typeof value === 'object' && value !== null) {
    return (
      <ul style={{listStyleType: 'none'}}>
        {Object.entries(value).map(([key, val]) => (
          <li key={key}>
            <span style={{fontWeight: '700'}}>{`${key}: `}</span>
            {renderValue(val)}
          </li>
        ))}
      </ul>
    );
  } else {
    return <span>{value}</span>;
  }
};

const ObjectRenderer = ({ data }) => {
  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <span style={{fontWeight: '700'}}>{`${key}: `}</span>
          {renderValue(value)}
        </div>
      ))}
    </div>
  );
};

export default ObjectRenderer;
