import { useEffect, useState } from "react";
import useSWR, { trigger } from "swr";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";
import PublishIcon from "@material-ui/icons/Publish";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import "react-image-gallery/styles/css/image-gallery.css";

import { laravelApiUrl } from "../../Api/Api";
import {
  submitUserMedia,
  updateUserMedia,
  getUserMedia,
} from "../../Api/UserCalls";
import Variants from "../../Utils/Variants";
import {
  StSection,
  StH2,
  StH3,
  StForm,
  LoadingComponent,
} from "../../Utils/HTMLComponents";
import BaseButton from "../../Components/Button/BaseButton";
import BaseInput from "../../Components/Input/BaseInput";

const StMediaVideo = styled.iframe`
  width: 600px;
  height: 480px;
  margin: 0 auto;
`;

const StImageGalleryContainer = styled.div`
  margin-bottom: 32px;

  & .image-gallery-image {
    width: 600px;
    height: 480px;
    border-radius: 8px;
  }

  & .image-gallery-icon {
    color: ${Variants.primary};
  }
`;

const getYoutubeIdFromUrl = (url: string) =>
  url.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#]*).*/)![1];

const renderVideo = (src: string) => (
  <StMediaVideo src={src} frameBorder="0" allowFullScreen />
);

const AccountMedia = () => {
  const [formImage1, setFormImage1] = useState<File | null>(null);
  const [formImage2, setFormImage2] = useState<File | null>(null);
  const [formYoutubeUrl, setFormYoutubeUrl] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const userId = JSON.parse(localStorage.getItem("userDetails")!)["uuid"];

  const { data: mediaData, isValidating } = useSWR(
    `api/users-media/${userId}`,
    getUserMedia
  );

  const submitFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formImage1 || formImage2 || formYoutubeUrl) {
      let fData = new FormData();

      formImage1 && fData.append("sitter_image_1", formImage1);
      formImage2 && fData.append("sitter_image_2", formImage2);
      formYoutubeUrl && fData.append("sitter_video_link", formYoutubeUrl);

      mediaData ? updateUserMedia(fData) : submitUserMedia(fData);
    }

    trigger(`api/users-media/${userId}`);
  };

  const userMediaValues = {
    image1: `${laravelApiUrl}/api/users-media/images/${mediaData?.image_1}`,
    image2: `${laravelApiUrl}/api/users-media/images/${mediaData?.image_2}`,
    youtube: {
      thumbnailUrl:
        mediaData?.video_link &&
        `https://img.youtube.com/vi/${getYoutubeIdFromUrl(
          mediaData.video_link
        )}/default.jpg`,
      videoUrl:
        mediaData?.video_link &&
        `https://www.youtube.com/embed/${getYoutubeIdFromUrl(
          mediaData.video_link
        )}`,
    },
  };

  useEffect(() => {
    !isDataLoaded && !isValidating && setIsDataLoaded(true);
  }, [isValidating, isDataLoaded]);

  return isDataLoaded ? (
    <>
      <StH2>Media</StH2>
      <StSection>
        {mediaData && (
          <StImageGalleryContainer>
            <ImageGallery
              showPlayButton={false}
              showFullscreenButton={false}
              items={[
                {
                  original: userMediaValues.image1,
                  thumbnail: userMediaValues.image1,
                },
                {
                  original: userMediaValues.image2,
                  thumbnail: userMediaValues.image2,
                },
                {
                  original: `video`,
                  thumbnail:
                    userMediaValues.youtube.thumbnailUrl &&
                    userMediaValues.youtube.thumbnailUrl,
                  renderItem: () =>
                    userMediaValues.youtube.videoUrl &&
                    renderVideo(userMediaValues.youtube.videoUrl),
                },
              ]}
            />
          </StImageGalleryContainer>
        )}

        {mediaData ? (
          <StH3>Bewerk Media</StH3>
        ) : (
          <StH3>Voeg fotos en youtube filmpjes van uw huis!</StH3>
        )}

        <StForm onSubmit={submitFormData}>
          <BaseInput
            type="file"
            label="Huisfoto 1:"
            icon={<PublishIcon />}
            onChange={(e) => e.target.files && setFormImage1(e.target.files[0])}
          />
          <BaseInput
            type="file"
            label="Huisfoto 2:"
            icon={<PublishIcon />}
            onChange={(e) => e.target.files && setFormImage2(e.target.files[0])}
          />
          <BaseInput
            label="Youtube video:"
            value={formYoutubeUrl}
            placeholder={
              mediaData?.video_link
                ? mediaData.video_link
                : "eg. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            }
            icon={<VideoLibraryIcon />}
            onChange={(e) => setFormYoutubeUrl(e.target.value)}
          />

          <BaseButton
            label={mediaData ? "Aanpassigen opslaan" : "Media opslaan"}
            type="submit"
          />
        </StForm>
      </StSection>
    </>
  ) : (
    <LoadingComponent />
  );
};

export default AccountMedia;
