import { useState } from "react";

import PublishIcon from "@material-ui/icons/Publish";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";

import { submitUserMedia } from "../../Api/UserCalls";
import { StSection, StH2, StH3, StForm } from "../../Utils/HTMLComponents";
import BaseButton from "../../Components/Button/BaseButton";
import BaseInput from "../../Components/Input/BaseInput";

const AccountMedia = () => {
  const [formFirstUserImage, setFormFirstUserImage] =
    useState<File | null>(null);
  const [formSecondUserImage, setFormSecondUserImage] =
    useState<File | null>(null);
  const [formYoutubeUrl, setFormYoutubeUrl] = useState("");
  const [formStatus, setFormStatus] = useState("default");

  const submitFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formFirstUserImage || formSecondUserImage || formYoutubeUrl) {
      let fData = new FormData();

      formFirstUserImage && fData.append("sitter_image_1", formFirstUserImage);
      formSecondUserImage &&
        fData.append("sitter_image_2", formSecondUserImage);
      formYoutubeUrl && fData.append("sitter_video_link", formYoutubeUrl);

      // TODO: redirect to account user profile page when there's one if the post is succesful
      // load error indicator if the post fails
      submitUserMedia(fData).then(() => setFormStatus("success"));
    } else {
      if (formStatus !== "error") setFormStatus("error");
    }
  };

  return (
    <>
      <StH2>Media</StH2>
      <StSection>
        <StH3>Bewerk Media</StH3>

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
