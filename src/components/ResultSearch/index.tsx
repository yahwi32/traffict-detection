import React from 'react';
type ResultSearchType = {
  src?: string;
  alt?: string;
  label: string;
  time: string;
  location: string;
};

const ResultSearch: React.FC<ResultSearchType> = ({ src, alt, label, time, location }) => {
  return (
    <div className="flex flex-col justify-between">
      <img src={src} alt={alt} className="w-full max-h-96" />
      <div className="text-left mt-6">
        <h5>License plates: {label}</h5>
        <p>Time: {time}</p>
        <p>Location: {location}</p>
      </div>
    </div>
  );
};

export default ResultSearch;
