import axiosClient from './axiosClient';

const manageAPI = {
  getAllFolder: () => axiosClient.get('list/'),
  detechLicense: () => axiosClient.get('license/'),
  deleteAllLicense: () => axiosClient.delete('delete-all-vehicle/'),
  getAll: () => axiosClient.get('vehicles/'),
  clear: () => axiosClient.get('clear/'),
  getLicense: () => axiosClient.get('license/'),
  deletteAllLicense: () => axiosClient.post('delete-all-vehicle/'),
  updateVehicle: (id: string, payload: any) => axiosClient.put(`update-vehicle/${id}/`, payload),
  getAllFileRetrain: () => axiosClient.get(`all-file-retrain/`),
  retrain: () => axiosClient.get(`retrain/`),
  testImage: (payload: any) => axiosClient.post(`result/`, payload),
};

export default manageAPI;
