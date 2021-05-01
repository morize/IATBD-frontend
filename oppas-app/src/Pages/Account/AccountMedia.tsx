import { StSection } from "../../Utils/HTMLComponents";
import { StH2, StForm } from "../../Utils/HTMLComponents";
import PublishIcon from "@material-ui/icons/Publish";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";

import BaseButton from "../../Components/Button/BaseButton";
import BaseInput from "../../Components/Input/BaseInput";

const AccountMedia = () => {
  return (
    <StSection>
      <StH2>Profiel Media</StH2>

      <StForm>
        <BaseInput type="file" label="Huisfoto 1:" icon={<PublishIcon />} />
        <BaseInput type="file" label="Huisfoto 2:" icon={<PublishIcon />} />
        <BaseInput
          label="Youtube video:"
          placeholder="eg. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          icon={<VideoLibraryIcon />}
        />

        <BaseButton label="Media opslaan" />
      </StForm>
    </StSection>
  );
};

export default AccountMedia;
