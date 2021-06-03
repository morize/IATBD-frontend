import { useState } from "react";
import useSWR, { trigger } from "swr";
import PublishIcon from "@material-ui/icons/Publish";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";

import {
  submitUserMedia,
  updateUserMedia,
  getUserMedia,
} from "../../Api/UserCalls";
import {
  StSection,
  StH2,
  StH3,
  StForm,
  StErrorMessage,
  LoadingComponent,
} from "../../Utils/HTMLComponents";
import BaseButton from "../../Components/Button/BaseButton";
import BaseInput from "../../Components/Input/BaseInput";
import Showcase from "../../Components/Showcase/Showcase";

const AccountMedia = () => {
  const [formImage1, setFormImage1] = useState<File | null>(null);
  const [formImage2, setFormImage2] = useState<File | null>(null);
  const [formYoutubeUrl, setFormYoutubeUrl] = useState("");
  const [formError, setFormError] = useState(false);

  const userId =
    localStorage.getItem("userDetails") !== null &&
    JSON.parse(localStorage.getItem("userDetails")!)["uuid"];

  const { data: mediaData, isValidating: isMediaDataValidating } = useSWR(
    `api/users-media/${userId}`,
    getUserMedia,
    { revalidateOnFocus: false }
  );

  const submitFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formImage1 || formImage2 || formYoutubeUrl) {
      let fData = new FormData();

      formImage1 && fData.append("sitter_image_1", formImage1);
      formImage2 && fData.append("sitter_image_2", formImage2);
      formYoutubeUrl && fData.append("sitter_video_link", formYoutubeUrl);

      mediaData
        ? updateUserMedia(fData, userId).then(() =>
            trigger(`api/users-media/${userId}`)
          )
        : submitUserMedia(fData).then(() =>
            trigger(`api/users-media/${userId}`)
          );
    } else {
      !formError && setFormError(true);
    }
  };

  return !isMediaDataValidating ? (
    <>
      <StH2>Profiel media</StH2>
      <StSection>
        {mediaData && (
          <Showcase
            image1={mediaData.image_1}
            image2={mediaData.image_2}
            video={mediaData.video_link}
          />
        )}

        {mediaData ? (
          <StH3>Bewerk profiel media</StH3>
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

          {formError && (
            <StErrorMessage>
              U moet minstens een afbeelding of een video link toevoegen
            </StErrorMessage>
          )}

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
