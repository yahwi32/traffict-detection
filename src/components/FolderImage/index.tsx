import React, { useState } from 'react';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import { FolderImageType } from '../../type';
import { FaRegImage } from 'react-icons/fa6';

const FolderImage: React.FC<FolderImageType> = ({
  id,
  folderName,
  listVehicle,
  className,
  chooseImage,
  setChooseImage,
}) => {
  const [openFolder, setOpenFolder] = useState(false);

  return (
    <div className={`${className} mt-4`}>
      <button
        onClick={() => setOpenFolder((prevExpanded) => !prevExpanded)}
        className={`flex items-center ${openFolder ? 'text-yellow-400' : ''}`}
      >
        {openFolder ? (
          <>
            <FaFolderOpen className="text-yellow-400 mr-2" fontSize={20} />{' '}
            {folderName.split('_')[0].charAt(0).toUpperCase() +
              folderName.split('_')[0].slice(1) +
              ' ' +
              folderName.split('_')[1] +
              '/' +
              folderName.split('_')[2] +
              '/' +
              folderName.split('_')[3]}
          </>
        ) : (
          <>
            <FaFolder className="text-yellow-400 mr-2" fontSize={20} />{' '}
            {folderName.split('_')[0].charAt(0).toUpperCase() +
              folderName.split('_')[0].slice(1) +
              ' ' +
              folderName.split('_')[1] +
              '/' +
              folderName.split('_')[2] +
              '/' +
              folderName.split('_')[3]}
          </>
        )}
      </button>
      {openFolder && (
        <div className="w-full flex">
          <div className="w-[20%]"></div>
          <div className="w-[80%] max-h-[500px] overflow-y-auto">
            {listVehicle?.map((childFile, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    console.log(childFile);
                    setChooseImage(childFile);
                  }}
                  className={`${
                    chooseImage?.file_name === childFile.file_name ? 'text-yellow-400' : ''
                  } hover:cursor-pointer hover:bg-slate-100 py-1.5 border-b border-slate-300 flex items-center`}
                >
                  <FaRegImage className="mr-4" />
                  {childFile.file_name.split('-')[1]?.replaceAll('_', ':') + '-' + childFile.file_name.split('-')[2]}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderImage;
