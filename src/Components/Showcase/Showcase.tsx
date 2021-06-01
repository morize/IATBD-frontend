import styled from "styled-components";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import Variants from "../../Utils/Variants";

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

const renderVideo = (src: string) => (
  <StMediaVideo src={src} frameBorder="0" allowFullScreen />
);

interface IShowcase {
  image1: string;
  image2: string;
  video: { thumbnailUrl: string | undefined; videoUrl: string | undefined };
}

const Showcase = ({ image1, image2, video }: IShowcase) => (
  <StImageGalleryContainer>
    <ImageGallery
      showPlayButton={false}
      showFullscreenButton={false}
      items={[
        {
          original: image1,
          thumbnail: image1,
        },
        {
          original: image2,
          thumbnail: image2,
        },
        {
          original: `video`,
          thumbnail: video.thumbnailUrl && video.thumbnailUrl,
          renderItem: () => video.videoUrl && renderVideo(video.videoUrl),
        },
      ]}
    />
  </StImageGalleryContainer>
);

export default Showcase;
