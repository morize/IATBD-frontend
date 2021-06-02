import { laravelApi, laravelApiUrl } from "./Api";

const getYoutubeIdFromUrl = (url: string) =>
  url.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#]*).*/)![1];

export const formatUserMedia = (
  image1?: string,
  image2?: string,
  videoUrl?: string
) => ({
  image1: `${laravelApiUrl}/api/users-media/images/${image1}`,
  image2: `${laravelApiUrl}/api/users-media/images/${image2}`,
  youtube: {
    thumbnailUrl:
      videoUrl &&
      `https://img.youtube.com/vi/${getYoutubeIdFromUrl(videoUrl)}/default.jpg`,
    videoUrl:
      videoUrl &&
      `https://www.youtube.com/embed/${getYoutubeIdFromUrl(videoUrl)}`,
  },
});

export interface UserResponseType {
  uuid: number;
  name: string;
  email: string;
  email_verified_at: string;
  role: string;
  status: string;
}

export const getUserDetails = async (url: string): Promise<UserResponseType> =>
  await laravelApi.get(url).then((response) => response.data);

export const submitUserMedia = async (fData: FormData) =>
  await laravelApi
    .post("api/users-media", fData)
    .then((response) => response.data);

export const updateUserMedia = async (fData: FormData, userId: string) =>
  await laravelApi
    .post(`api/users-media/${userId}`, fData)
    .then((response) => response.data);

export const getUserMedia = async (
  url: string
): Promise<{
  image_1: string;
  image_2: string;
  video_link: string;
}> => await laravelApi.get(url).then((response) => response.data);
