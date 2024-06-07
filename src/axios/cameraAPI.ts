import axiosClient from './axiosClient';

const cameraAPI = {
  showCamera: (location: string) => axiosClient.get(`video_feed/${location}/`),
};

export default cameraAPI;
