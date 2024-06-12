import React, { useEffect, useState } from 'react';
import { FolderImage, VehicleInfor } from '../../components';
import manageAPI from '../../axios/manageAPI';
import { VehicleType } from '../../type';
import { notification, Modal } from 'antd';
import { createPortal } from 'react-dom';
import { LoadingPage } from '..';

type NotificationType = 'success' | 'info' | 'warning' | 'error';
const convertType = (id: string) => {
  switch (id) {
    case '2':
      return 'Car';
    case '3':
      return 'Motorcycle';
    case '5':
      return 'Bus';
    case '7':
      return 'Truck';
    default:
      return '';
  }
};
const openNotificationWithIcon = (type: NotificationType) => {
  if (type === 'success') {
    notification[type]({
      message: 'Detech license',
      description: 'Server get license successfully!!!',
    });
  }
  if (type === 'error') {
    notification[type]({
      message: 'Detech license',
      description: 'Server get license failed , try again later !!!',
    });
  }
};

type AllFolderType = {
  list: VehicleType[];
  folder_name: string;
};
const ManagePage = () => {
  const [chooseImage, setChooseImage] = useState<VehicleType>();
  const [allFolder, setAllFolder] = useState<AllFolderType[]>();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Are you sure delete all data ?');

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('Wating a  minute ...');
    setConfirmLoading(true);
    const deleteAllLicense = async () => {
      try {
        setIsloading(true);
        const res = await manageAPI.deleteAllLicense();
        if (res.status === 200) {
          setModalText('Detete all license successful !');
        } else {
          setModalText('Detete all license fail !');
        }
      } catch {
        setModalText('Detete all license fail !');
      }
      setIsloading(false);
    };
    setTimeout(() => {
      setOpen(false);
      deleteAllLicense();
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDetechlicense = async () => {
    try {
      setIsloading(true);
      const res = await manageAPI.detechLicense();
      if (res.status === 200) {
        openNotificationWithIcon('success');
        await fetchData();
      } else {
        openNotificationWithIcon('error');
      }
    } catch {
      openNotificationWithIcon('error');
    }
    setIsloading(false);
  };
  const fetchData = async () => {
    try {
      const res = await manageAPI.getAll();
      const result = res.data.data.reduce((acc: { folder_name: string; list: VehicleType[] }[], item: VehicleType) => {
        const folderIndex = acc.findIndex((folder) => folder.folder_name === item.folder_name);
        if (folderIndex === -1) {
          acc.push({
            folder_name: item.folder_name,
            list: [item],
          });
        } else {
          acc[folderIndex].list.push(item);
        }

        return acc;
      }, []);
      setAllFolder(result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setIsloading(true);
    fetchData();
    setIsloading(false);
  }, []);

  return (
    <>
      {isLoading && createPortal(<LoadingPage />, document.body)}
      <div>
        <div className="flex justify-between px-10">
          <div className="w-[20%]">
            <div className="text-left flex flex-col gap-2 justify-between py-3">
              <button
                className="px-4 py-2 bg-cyan-600  text-white font-semibold rounded-md hover:bg-cyan-800"
                onClick={handleDetechlicense}
              >
                Detech license
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white  font-semibold rounded-md hover:bg-red-800"
                onClick={showModal}
              >
                Delete all
              </button>
            </div>
            {allFolder?.map((folder, index) => {
              return (
                <FolderImage
                  id={index}
                  key={index}
                  folderName={folder.folder_name}
                  listVehicle={folder.list}
                  chooseImage={chooseImage}
                  setChooseImage={setChooseImage}
                />
              );
            })}
          </div>
          <div className="ml-6 w-[80%]">
            {chooseImage && (
              <>
                <div className="flex">
                  <div className="w-[65%]">
                    <h4 className="text-xl font-semibold py-4">Image origin</h4>
                    <img
                      className="w-full rounded-lg"
                      src={`${process.env.REACT_APP_API_ENDPOINT}/media/${chooseImage.image_origin}`}
                      alt="fc"
                    />
                  </div>
                  <div className="w-[35%] ml-4">
                    <h4 className="text-xl font-semibold py-4">Image license</h4>
                    <img
                      className="w-full rounded-lg"
                      src={`${process.env.REACT_APP_API_ENDPOINT}/media/${chooseImage.image_detect}`}
                      alt="fc"
                    />
                  </div>
                </div>
                <div className="text-left mt-6">
                  <h4 className="font-semibold text-2xl italic">Vehicle Information</h4>
                  <div className="mt-4 gap-2 flex flex-wrap justify-between">
                    <VehicleInfor
                      className="w-[30%]"
                      title="License"
                      value={chooseImage.license_fixed}
                      image={`${process.env.REACT_APP_API_ENDPOINT}/media/${chooseImage.image_detect}`}
                      chooseImage={chooseImage}
                      fetchData={fetchData}
                      setChooseImage={setChooseImage}
                    />
                    <VehicleInfor className="w-[30%]" title="Time" value={chooseImage.time} />
                    <VehicleInfor className="w-[30%]" title="Location" value={chooseImage.location} />
                    <VehicleInfor className="w-[30%]" title="Color" value={'No'} />
                    <VehicleInfor className="w-[30%]" title="Type" value={convertType('' + chooseImage.type)} />
                    <VehicleInfor className="w-[30%]" title="Owner" value={'No'} />
                    <VehicleInfor className="w-[30%]" title="Branch" value={'No'} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <Modal
          title="Delete all data"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
      </div>
    </>
  );
};

export default ManagePage;
