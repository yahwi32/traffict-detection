import React, { ChangeEvent } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type InputSearchType = {
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
  size?: 'large' | 'small' | 'medium';
};

const InputSearch: React.FC<InputSearchType> = ({ type = 'text', value, onChange, placeholder, className }) => {
  return (
    <div className={`relative ${className} text-black`}>
      <input
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        className="w-full p-2 rounded border "
      />
      <span className="absolute top-2/4 right-2" style={{ transform: 'translateY(-50%)' }}>
        <AiOutlineLoading3Quarters className="animate-spin" />
      </span>
    </div>
  );
};

export default InputSearch;
