import { useContext, useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import { APP_CONTEXT } from '../../App';
import manageAPI from '../../axios/manageAPI';
import { SizeLiveCamType } from '../../type';
import SignIn from '../../components/SignIn';
import toast from 'react-hot-toast';
import { APP_CONFIG } from '../../constant/config';
import { LOCATION } from '../../constant/location';
import cameraAPI from '../../axios/cameraAPI';

const HomePage = () => {
  const context = useContext(APP_CONTEXT);
  const [inputService, setInputService] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sizeLiveCam, setSizeLiveCam] = useState<SizeLiveCamType>({
    width: 200,
    height: 300,
  });
  console.log('111');
  const liveRef = useRef<HTMLDivElement>(null);

  const fetchDataCamera = async (location: string) => {
    try {
      console.log('Fetching data', location);
      await cameraAPI.showCamera(location);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClear = async () => {
    try {
      await manageAPI.clear();
      setInputService(false);
      if (context.setAddress) {
        context.setAddress('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    toast.error('You must be logged in to access the admin page');
  };

  useEffect(() => {
    if (liveRef.current) {
      setSizeLiveCam({
        width: liveRef?.current.clientWidth,
        height: liveRef?.current.clientHeight / 3,
      });
    }
  }, []);

  useEffect(() => {
    if (context.user.username === APP_CONFIG.username && context.user.password === APP_CONFIG.password) {
      localStorage.setItem('traffict-user', context.user.username);
      setIsOpenModal(false);
    } else {
      setIsOpenModal(true);
    }
  }, [context.user]);

  useEffect(() => {
    if (context.address === LOCATION.DIEN_BIEN_PHU) {
      fetchDataCamera(LOCATION.DIEN_BIEN_PHU);
      setInputService(true);
    }
    if (context.address === LOCATION.TON_DUC_THANG) {
      fetchDataCamera(LOCATION.TON_DUC_THANG);
      setInputService(true);
    }
  }, [context.address]);

  return (
    <>
      <div className="flex h-full  p-4">
        <div className="flex-1 flex">
          <Box w="70%" className="flex">
            <div className="w-full flex justify-center ">
              <div className="relative w-full">
                <img
                  className="w-full"
                  src={
                    !inputService
                      ? `https://www.skycards.eu/wp-content/uploads/2019/01/No-Input-Signal.jpg`
                      : `${process.env.REACT_APP_API_ENDPOINT}/api/video_feed/${context.address}/`
                  }
                  alt="address"
                />
                {inputService && (
                  <h1 className="font-semibold text-red-500 italic ">{'Warning: Your Internet is not stable'}</h1>
                )}

                <button
                  className="px-4 py-2 border-zinc-600 border hover:bg-zinc-600 absolute top-0 right-0 font-semibold"
                  onClick={handleClear}
                >
                  <FaTimes fill="#ffffff" />
                </button>
              </div>
            </div>
          </Box>
          <div className="w-[30%] flex flex-col gap-6 px-2 overflow-hidden" ref={liveRef}>
            <iframe
              width={sizeLiveCam.width}
              height={sizeLiveCam.height}
              src="https://www.youtube.com/embed/ojcp6BTYHSU?si=fyq2np_gAQOjApJo"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <iframe
              width={sizeLiveCam.width}
              height={sizeLiveCam.height}
              src="https://www.youtube.com/embed/b6fkug3AmH4?si=WtSU9hP534bPtu7W"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <iframe
              width={sizeLiveCam.width}
              height={sizeLiveCam.height}
              src="https://www.youtube.com/embed/40u5_BBHNTY?si=4vM_30_WXofKPhNA"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      {!context.user.username && <SignIn isOpen={isOpenModal} onCancel={handleCancel} />}
    </>
  );
};

export default HomePage;
