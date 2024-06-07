import React from 'react';
import { IconType } from 'react-icons';

type IconProps = {
  icon: IconType;
  className?: string;
  fontSize?: number;
};

const CustomIcon: React.FC<IconProps> = ({ icon, className, fontSize }) => {
  const Icon = icon;
  return <Icon className={className} fontSize={fontSize} />;
};

export default CustomIcon;
