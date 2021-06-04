import styled from "styled-components";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import { formatUserMedia } from "../../Api/UserCalls";
import Variants from "../../Utils/Variants";

const StMediaVideo = styled.iframe`
  width: 600px;
  height: 480px;
  margin: 0 auto;

  @media (max-width: 600px) {
    width: clamp(100px, 60%, 600px);
    height: clamp(100px, 60%, 600px);
  }
`;

const StImageGalleryContainer = styled.div`
  margin-bottom: 32px;

  & .image-gallery-image {
    width: clamp(100px, 60%, 600px);
    height: clamp(100px, 60%, 600px);
    border-radius: 8px;
  }

  & .image-gallery-icon {
    color: ${Variants.primary};
  }
`;

const renderVideo = (src: string) => (
  <StMediaVideo src={src} frameBorder="0" allowFullScreen />
);

interface IShowcase {
  image1: string;
  image2: string;
  video: string;
}

const Showcase = ({ image1, image2, video }: IShowcase) => {
  const userMediaValues = formatUserMedia(image1, image2, video);

  const getImages = () => {
    let imageArray = [];
    image1 &&
      imageArray.push({
        original: userMediaValues.image1,
        thumbnail: userMediaValues.image1,
      });

    image2 &&
      imageArray.push({
        original: userMediaValues.image2,
        thumbnail: userMediaValues.image2,
      });

    video &&
      imageArray.push({
        original: "video",
        thumbnail: userMediaValues.youtube.thumbnailUrl,
        renderItem: () =>
          userMediaValues.youtube.videoUrl &&
          renderVideo(userMediaValues.youtube.videoUrl),
      });

    return imageArray;
  };

  return (
    <StImageGalleryContainer>
      <ImageGallery
        showPlayButton={false}
        showFullscreenButton={false}
        showNav={false}
        items={getImages()}
      />
    </StImageGalleryContainer>
  );
};

export default Showcase;
