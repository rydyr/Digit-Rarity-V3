import React from 'react';
import './featured.css';

const FeaturedNames = ({ names }) => {
  return (
    <div className="featured-names-container">
      <div className="marquee">
        <div className="marquee-content">
          {names.map((name, index) => (
            <a key={index} href={`https://vision.io/name/ens/${name}.eth`} target="_blank" rel="noopener noreferrer" className="featured-name">
              {name}.eth
            </a>
          ))}
          {names.map((name, index) => (
            <a key={index} href={`https://vision.io/name/ens/${name}.eth`} target="_blank" rel="noopener noreferrer" className="featured-name">
              {name}.eth
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedNames;
