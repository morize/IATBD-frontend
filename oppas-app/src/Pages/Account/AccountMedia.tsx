import { useState, useRef } from "react";
import useSWR from "swr";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import PublishIcon from "@material-ui/icons/Publish";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";

import { laravelApiUrl } from "../../Api/Api";
import {
  submitUserMedia,
  updateUserMedia,
  getUserMedia,
} from "../../Api/UserCalls";
import { StSection, StH2, StH3, StForm } from "../../Utils/HTMLComponents";
import BaseButton from "../../Components/Button/BaseButton";
import BaseInput from "../../Components/Input/BaseInput";

const StMediaVideo = styled.iframe`
  width: 600px;
  height: 480px;
  margin: 0 auto;
`;

const StImageGalleryContainer = styled.div`
  & .image-gallery-image {
    width: 600px;
    height: 480px;
  }
`;

const getYoutubeIdFromUrl = (url: string) => {
  const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  return url.match(regExp)![1];
};

const renderVideo = (src: string) => (
  <StMediaVideo src={src} frameBorder="0" allowFullScreen />
);

const AccountMedia = () => {
  const [formFirstUserImage, setFormFirstUserImage] =
    useState<File | null>(null);
  const [formSecondUserImage, setFormSecondUserImage] =
    useState<File | null>(null);
  const [formYoutubeUrl, setFormYoutubeUrl] = useState("");
  const [formStatus, setFormStatus] = useState("default");

  const { data: mediaData } = useSWR(
    `api/users-media/${
      JSON.parse(localStorage.getItem("userDetails")!)["uuid"]
    }`,
    getUserMedia
  );

  const submitFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formFirstUserImage || formSecondUserImage || formYoutubeUrl) {
      let fData = new FormData();

      formFirstUserImage && fData.append("sitter_image_1", formFirstUserImage);
      formSecondUserImage &&
        fData.append("sitter_image_2", formSecondUserImage);
      formYoutubeUrl && fData.append("sitter_video_link", formYoutubeUrl);

      mediaData
        ? updateUserMedia(fData).then(() => setFormStatus("success"))
        : submitUserMedia(fData).then(() => setFormStatus("success"));
    } else {
      if (formStatus !== "error") setFormStatus("error");
    }
  };
  
  return (
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
                  original: `${laravelApiUrl}/api/users-media/images/${mediaData?.image_1}`,
                  thumbnail: `${laravelApiUrl}/api/users-media/images/${mediaData?.image_1}`,
                },
                {
                  original: `${laravelApiUrl}/api/users-media/images/${mediaData?.image_2}`,
                  thumbnail: `${laravelApiUrl}/api/users-media/images/${mediaData?.image_2}`,
                },
                {
                  original: `video`,
                  thumbnail: `https://img.youtube.com/vi/${getYoutubeIdFromUrl(mediaData?.video_link)}/default.jpg`,
                  renderItem: () =>
                    renderVideo(`https://www.youtube.com/embed/${getYoutubeIdFromUrl(mediaData?.video_link)}`),
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
            onChange={(e) =>
              e.target.files && setFormFirstUserImage(e.target.files[0])
            }
          />
          <BaseInput
            type="file"
            label="Huisfoto 2:"
            icon={<PublishIcon />}
            onChange={(e) =>
              e.target.files && setFormSecondUserImage(e.target.files[0])
            }
          />
          <BaseInput
            label="Youtube video:"
            value={formYoutubeUrl}
            placeholder="eg. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            icon={<VideoLibraryIcon />}
            onChange={(e) => setFormYoutubeUrl(e.target.value)}
          />

          <BaseButton label="Media opslaan" type="submit" />
        </StForm>
      </StSection>
    </>
  );
};

export default AccountMedia;
