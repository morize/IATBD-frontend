import { useState } from "react";

import { StSection, StH2, StH3, StForm } from "../../Utils/HTMLComponents";
import PublishIcon from "@material-ui/icons/Publish";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";

import { submitSitterMedia } from "../../Hooks/Api";
import BaseButton from "../../Components/Button/BaseButton";
import BaseInput from "../../Components/Input/BaseInput";

const AccountMedia = () => {
  const [fSitterImage, setFSiterImage] = useState<File | null>(null);
  const [sSitterImage, setSSiterImage] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [status, setStatus] = useState("default");

  const handleFImageInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.files && setFSiterImage(e.target.files[0]);

  const handleSImageInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.files && setSSiterImage(e.target.files[0]);

  const submitFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fSitterImage || sSitterImage || youtubeUrl) {
      let fData = new FormData();

      fSitterImage && fData.append("sitter_image_1", fSitterImage);
      sSitterImage && fData.append("sitter_image_2", sSitterImage);
      youtubeUrl && fData.append("sitter_video_link", youtubeUrl);

      submitSitterMedia(fData).then(() => setStatus("success"));
    } else {
      if (status !== "error") setStatus("error");
    }
  };

  return (
    <>
      <StH2>Media</StH2>
      <StSection>
        <StH3>Bewerk Media</StH3>

        <StForm onSubmit={(e) => submitFormData(e)}>
          <BaseInput
            type="file"
            label="Huisfoto 1:"
            icon={<PublishIcon />}
            onChange={handleFImageInput}
          />
          <BaseInput
            type="file"
            label="Huisfoto 2:"
            icon={<PublishIcon />}
            onChange={handleSImageInput}
          />
          <BaseInput
            label="Youtube video:"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="eg. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            icon={<VideoLibraryIcon />}
          />

          <BaseButton label="Media opslaan" type="submit" />
        </StForm>
      </StSection>
    </>
  );
};

export default AccountMedia;
