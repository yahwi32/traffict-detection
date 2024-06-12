import { Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaEdit } from 'react-icons/fa';
import { LoadingPage } from '../../pages';
import manageAPI from '../../axios/manageAPI';
import { VehicleType } from '../../type';
import toast from 'react-hot-toast';
type VehicleInforType = {
  title: string;
  value: string;
  className?: string;
  image?: string;
  chooseImage?: VehicleType;
  fetchData?: () => Promise<void>;
  setChooseImage?: React.Dispatch<React.SetStateAction<VehicleType | undefined>>;
};
const VehicleInfor: React.FC<VehicleInforType> = ({
  className,
  title,
  value,
  image,
  chooseImage,
  fetchData,
  setChooseImage,
}) => {
  const [data, setData] = useState(chooseImage?.license_fixed);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const handleUpdate = async () => {
    try {
      if (chooseImage) {
        setIsloading(true);

        const res = await manageAPI.updateVehicle(chooseImage.id.toString(), {
          ...chooseImage,
          license_fixed: data,
        });
        if (res.status === 200) {
          toast.success('Send Feedback successfully');
          if (fetchData && setChooseImage) {
            const newValue = {
              ...chooseImage,
              license_fixed: data,
            } as VehicleType;
            setChooseImage(newValue);
            await fetchData();
          }
        }
      }
    } catch (_) {
      toast.success('Send Feedback fails');
    } finally {
      setIsloading(false);
      setIsModalOpen(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (chooseImage) {
      setData(chooseImage?.license_fixed);
    }
  }, [chooseImage]);
  if (title === 'License') {
    return (
      <>
        {isLoading && createPortal(<LoadingPage />, document.body)}
        <div className={`${className} `}>
          <h6 className="text-zinc-400">{title}:</h6>
          <div className=" relative">
            <h5 className="font-semibold text-xl">{value}</h5>
            <button
              onClick={showModal}
              className="p-1  absolute top-[50%] right-2 -translate-y-2/4 hover:text-slate-500"
            >
              <FaEdit />
            </button>
          </div>
        </div>
        <Modal title="Feedback" open={isModalOpen} onOk={handleUpdate} onCancel={handleCancel}>
          <div>
            <div className="flex justify-center">
              <img className="w-[250px] rounded-lg" src={image} alt="fc" />
            </div>
            <Input className="mt-6" placeholder="Edit license" value={data} onChange={(e) => setData(e.target.value)} />
          </div>
        </Modal>
      </>
    );
  }
  return (
    <div className={className}>
      <h6 className="text-zinc-400">{title}:</h6>
      <h5 className="font-semibold text-xl">{value}</h5>
    </div>
  );
};
export default VehicleInfor;
