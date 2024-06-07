import { Modal } from 'antd';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { APP_CONTEXT } from '../../App';
import { APP_CONFIG } from '../../constant/config';
import { UserType } from '../../type';
import { toast } from 'react-hot-toast';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

type SignInProps = {
  isOpen: boolean;
  onCancel: () => void;
};
const SignIn = ({ isOpen, onCancel }: SignInProps) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [data, setData] = useState<UserType>({ username: '', password: '' });
  const [isShowPass, setIsShowPass] = useState(false);

  const { setUser } = useContext(APP_CONTEXT);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleOk = () => {
    setConfirmLoading(true);
    timeoutIdRef.current = setTimeout(() => {
      if (APP_CONFIG.username === data.username && APP_CONFIG.password === data.password) {
        toast.success(`Welcome to Admin page!`);
        setUser(data);
        setConfirmLoading(false);
      } else {
        toast.error('Username or password incorrect!');
        setConfirmLoading(false);
      }
    }, 2000);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [timeoutIdRef]);

  return (
    <Modal
      title="Sign In"
      open={isOpen}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      className="relative"
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <div className="flex flex-col gap-1 mt-6">
        <label className="font-semibold" htmlFor="username">
          Username:
        </label>
        <input
          className="px-2 py-1 rounded-md border border-slate-700"
          type="text"
          id="username"
          name="username"
          value={data?.username}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-1 mt-2 mb-8">
        <label className="font-semibold" htmlFor="password">
          Password:
        </label>
        <div className="relative w-full">
          <input
            className="px-2 py-1 w-full rounded-md border border-slate-700"
            type={isShowPass ? 'text' : 'password'}
            id="password"
            name="password"
            value={data?.password}
            onChange={handleChange}
          />
          <button onClick={() => setIsShowPass(!isShowPass)} className=" absolute top-[50%] right-2 -translate-y-2/4">
            {isShowPass ? <IoIosEyeOff /> : <IoIosEye />}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SignIn;
