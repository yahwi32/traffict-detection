import axiosClient from './axiosClient';

const manageAPI = {
  getAllFolder: () => axiosClient.get('list/'),
  detechLicense: () => axiosClient.get('license/'),
  deleteAllLicense: () => axiosClient.delete('delete-all-vehicle/'),
  getAll: () => axiosClient.get('vehicles/'),
  clear: () => axiosClient.get('clear/'),
  getLicense: () => axiosClient.get('license/'),
  deletteAllLicense: () => axiosClient.post('delete-all-vehicle/'),
};

export default manageAPI;
