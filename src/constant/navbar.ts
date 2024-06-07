import { MdManageHistory } from 'react-icons/md';
import { GoHome } from 'react-icons/go';
import { RiContactsLine } from 'react-icons/ri';
import { FaSearchLocation } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface NavItemInterface {
  id: number;
  label: string;
  url: string;
  icon: IconType;
}

const navbar: NavItemInterface[] = [
  {
    id: 0,
    label: 'Home',
    url: '/',
    icon: GoHome,
  },
  {
    id: 1,
    label: 'Manage',
    url: '/manage',
    icon: MdManageHistory,
  },
  {
    id: 2,
    label: 'Search',
    url: '/search',
    icon: FaSearchLocation,
  },
  {
    id: 3,
    label: 'Contact',
    url: '/contact',
    icon: RiContactsLine,
  },
];

export type { NavItemInterface };
export { navbar };
