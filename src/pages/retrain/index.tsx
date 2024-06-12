import { useEffect, useState } from 'react';
import manageAPI from '../../axios/manageAPI';
import { Select } from 'antd';
import { FaRegImages } from 'react-icons/fa6';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { IoReloadCircleOutline } from 'react-icons/io5';
import { IoIosSend } from 'react-icons/io';
import { LoadingPage } from '..';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';

type OptionType = { value: string; label: string };

const RetrainPage = () => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [model, setModel] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handldChangeOption = (value: string) => {
    setModel(value);
  };

  const handleRetrain = async () => {
    try {
      setIsloading(true);
      const res = await manageAPI.retrain();
      if (res.status === 200) {
        await fetchData();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  };
  const handleSend = async () => {
    try {
      if (file && model) {
        setIsloading(true);
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            const imageBase64 = reader.result?.toString();
            const res = await manageAPI.testImage({
              image: imageBase64,
            });
            if (res.status === 200) {
              setResult(res.data.data);
            }
          } catch (err) {
            console.log(err);
          } finally {
            setIsloading(false);
          }
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Please select model');
      }
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };
  const handleRemove = () => {
    setFile(null);
    setImagePreview(null);
  };

  const fetchData = async () => {
    try {
      setIsloading(true);
      const res = await manageAPI.getAllFileRetrain();
      if (res.status === 200) {
        const listOptions = res.data.data.map((item: any) => ({
          value: item,
          label: item,
        }));
        setOptions(listOptions);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setImagePreview(previewUrl);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex-1 bg-slate-100 h-full">
        <div className="flex justify-between p-4">
          <Select
            className="w-[40%]"
            onChange={handldChangeOption}
            defaultValue={options.length > 0 ? options[0].value : undefined}
            options={options}
          />
          <button
            onClick={handleRetrain}
            className="flex items-center gap-2 bg-red-400 text-white font-semibold px-6 py-1 rounded-lg hover:bg-red-500"
          >
            <IoReloadCircleOutline />
            Retrain
          </button>
        </div>
        <div className="flex justify-center">
          <div className="w-2/3 flex">
            <div className="w-[60%]">
              {file && imagePreview ? (
                <div className="w-full h-[350px] rounded-lg overflow-hidden relative">
                  <img src={imagePreview} alt="preview" className="w-full h-[350px]" />
                  <button onClick={handleRemove} className="p-1 hover:text-slate-300 absolute top-2 right-2 text-white">
                    <IoCloseCircleOutline fontSize={20} />
                  </button>
                </div>
              ) : (
                <>
                  <label htmlFor="image" className="w-full">
                    <div className="w-full h-[350px] bg-white rounded-lg border justify-center items-center flex flex-col">
                      <FaRegImages fontSize={40} />
                      <h1>Select image to test</h1>
                    </div>
                  </label>

                  <input type="file" className="hidden" id="image" onChange={handleChangeFile} />
                </>
              )}
              {file && imagePreview && (
                <div className="flex justify-center py-6">
                  <button
                    onClick={handleSend}
                    className="min-w-[140px] py-2 text-center flex justify-center bg-sky-500 hover:bg-sky-600 rounded-lg"
                  >
                    <IoIosSend fontSize={26} fill="#ffffff" />
                  </button>
                </div>
              )}
            </div>
            <div className="w-[40%]">
              <h1>Model selected: {model}</h1>
              <h1 className="font-semibold">Result: {result}</h1>
            </div>
          </div>
        </div>
      </div>
      {isLoading && createPortal(<LoadingPage />, document.body)}
    </>
  );
};

export default RetrainPage;
