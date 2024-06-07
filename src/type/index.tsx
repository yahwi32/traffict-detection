type VehicleType = {
  id: number;
  location: string;
  type: number;
  license: string;
  confidence: string;
  image_origin: string;
  image_detect: string;
  time: string;
  license_fixed: string;
  file_name: string;
  folder_name: string;
};
type ChildImageType = {
  name: string;
};

type FolderImageType = {
  id: number;
  folderName: string;
  listVehicle: VehicleType[];
  setChooseImage: React.Dispatch<React.SetStateAction<VehicleType | undefined>>;
  chooseImage?: VehicleType;
  className?: string;
};

type SizeLiveCamType = {
  width: number;
  height: number;
};

type UserType = {
  username: string;
  password: string;
};

export type { FolderImageType, ChildImageType, VehicleType, SizeLiveCamType, UserType };
