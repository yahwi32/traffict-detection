import React from 'react';
import { ColorInterface } from '../../constant/colors';
import { BsCheckLg } from 'react-icons/bs';
interface ColorType {
  color: ColorInterface;
  status?: 'checked' | 'unchecked';
}

const Color: React.FC<ColorType> = ({ color, status = 'unchecked' }) => {
  return (
    <div
      className="w-6 h-6 rounded-full border flex justify-center items-center"
      style={{ borderColor: `${color.boderCode}` }}
    >
      <div
        className="w-4 h-4 rounded-full flex justify-center items-center"
        style={{ backgroundColor: `${color.code}` }}
      >
        {status === 'checked' && <BsCheckLg fontSize={10} color={`${color.boderCode}`} />}
      </div>
    </div>
  );
};

export default Color;
