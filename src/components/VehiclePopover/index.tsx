import { Popover } from 'antd';
import React, { useRef } from 'react';
import { VehicleType } from '../../type';
type VehiclePopoverType = {
  data: VehicleType;
};

const VehiclePopover: React.FC<VehiclePopoverType> = ({ data }) => {
  const zoomRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: any) => {
    const onX = e.pageX - e.target.offsetLeft;
    const onY = e.pageY - e.target.offsetTop;
    const h = e.target.height;
    const w = e.target.width;
    const bg = '' + (onX - w / 2 / 5) * -4 + 'px ' + (onY - h / 2 / 5) * -6 + 'px';
    if (zoomRef.current) {
      zoomRef.current.style.backgroundPosition = bg;
    }
  };
  const content = (
    <div
      className="overflow-hidden w-[450px] h-[350px] bg-no-repeat"
      style={{
        background: `url('${process.env.REACT_APP_API_ENDPOINT}/media/${data.image_origin}')`,
      }}
      ref={zoomRef}
    ></div>
  );
  return (
    <div className="w-[32%] mr-3 border rounded-lg p-2 mb-4">
      <Popover content={content} title={`${data.license_fixed} - ${data.location} `}>
        <img
          onMouseMove={handleMouseMove}
          className="w-full rounded-lg"
          src={`${process.env.REACT_APP_API_ENDPOINT}/media/${data.image_origin}`}
          alt={data.image_origin}
        />
      </Popover>
      <h4>{data.license_fixed}</h4>
      <h5>{data.time}</h5>
    </div>
  );
};

export default VehiclePopover;
