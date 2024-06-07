import React from 'react';
type VehicleInforType = {
  title: string;
  value: string;
  className?: string;
};
const VehicleInfor: React.FC<VehicleInforType> = ({ className, title, value }) => {
  return (
    <div className={className}>
      <h6 className="text-zinc-400">{title}:</h6>
      <h5 className="font-semibold text-xl">{value}</h5>
    </div>
  );
};
export default VehicleInfor;
