import React from 'react';
import SvgLogo from '../../assets/svg/SVGLogo';

const Header: React.FC = () => {
  return (
    <div className="w-full flex border-b border-zinc-600 justify-between items-center">
      <div className="w-2/12 flex items-center py-2">
        <SvgLogo className="w-fit ml-4 mr-2" width={40} height={40} />
        <h3 className="text-2xl font-semibold text-blue-600">Traffic - Detect</h3>
      </div>
      <div className="w-8/12 flex items-center justify-end">
        <div className="px-10">
          <input placeholder="Search" className="px-4 py-2 rounded-md text-zinc-800" />
        </div>
      </div>
    </div>
  );
};
export default Header;
