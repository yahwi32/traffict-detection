import { IconType } from 'react-icons';
import { IoIosSearch } from 'react-icons/io';
import { MdManageSearch } from 'react-icons/md';
import { VscDeviceCameraVideo } from 'react-icons/vsc';
import { IoReloadCircleOutline } from 'react-icons/io5';
interface OptionInterface {
  id: number;
  label: string;
  value: string;
}

interface SidebarType {
  id: number;
  label: string;
  url: string;
  icon: IconType;
}

const sideBar: SidebarType[] = [
  {
    id: 1,
    label: 'Camera',
    url: '/',
    icon: VscDeviceCameraVideo,
  },
  {
    id: 2,
    label: 'Manage',
    url: '/manage',
    icon: MdManageSearch,
  },
  {
    id: 3,
    label: 'Search',
    url: '/search',
    icon: IoIosSearch,
  },
  {
    id: 4,
    label: 'Retrain',
    url: '/retrain',
    icon: IoReloadCircleOutline,
  },
];
const options: OptionInterface[] = [
  {
    id: 0,
    label: 'TonDucThang',
    value: 'tonducthang',
  },
  {
    id: 1,
    label: 'DienBienPhu',
    value: 'dienbienphu',
  },
  // {
  //   id: 2,
  //   label: 'SaiGon',
  //   value: 'SaiGon',
  // },
  // {
  //   id: 3,
  //   label: 'Hue',
  //   value: 'Hue',
  // },
];
export type { OptionInterface, SidebarType };
export { options, sideBar };
