import { useParams } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";
import Rating from "@material-ui/lab/Rating";

import { getSitterReviews } from "../../Api/SitterCalls";
import { getUserDetails, getUserMedia } from "../../Api/UserCalls";
import {
  StH1,
  StH2,
  StP,
  StLabel,
  LoadingComponent,
} from "../../Utils/HTMLComponents";
import Showcase from "../../Components/Showcase/Showcase";

const StReviewContainer = styled.div`
  padding: 20px;
  border-radius: 8px;
  background: rgba(189, 228, 237, 0.41);

  & span {
    opacity: 1;
  }
  & p {
    margin-left: 24px;
  }
`;
const StAccountDetails = styled.section`
  display: flex;
  flex-direction: column;
  margin: 24px 0;

  & p {
    margin-top: -22px;
    margin-left: auto;
  }
`;

const StInfoP = styled(StP)`
  margin-top: 0;
  margin-bottom: 24px;
`;

const SitterProfile = () => {
  const { id: sitterId } = useParams();

  const { data: accountData, isValidating: isAccountDataValidating } = useSWR(
    `api/user/${sitterId}`,
    getUserDetails,
    { revalidateOnFocus: false }
  );

  const { data: sitterReviewData, isValidating: isSitterReviewDataValidating } =
    useSWR(`api/sitter-reviews/${sitterId}`, getSitterReviews, {
      revalidateOnFocus: false,
    });

  const { data: mediaData, isValidating: isMediaDataValidating } = useSWR(
    `api/users-media/${sitterId}`,
    getUserMedia,
    { revalidateOnFocus: false }
  );
  
  return !isAccountDataValidating &&
    !isSitterReviewDataValidating &&
    !isMediaDataValidating ? (
    <>
      <StH1>{`Profiel van ${accountData?.name}`}</StH1>

      <StAccountDetails>
        <StH2>Over de opasser</StH2>
        <StLabel>Naam opasser:</StLabel>
        <StP>{accountData?.name}</StP>

        <StLabel>Contact Email:</StLabel>
        <StP>{accountData?.email}</StP>
      </StAccountDetails>

      <StH2>Huisfoto's en video</StH2>
      {mediaData ? (
        <Showcase
          image1={mediaData.image_1}
          image2={mediaData.image_2}
          video={mediaData.video_link}
        />
      ) : (
        <StInfoP>
          Dit gebruiker heeft nog geen foto's of videos in zijn profiel
        </StInfoP>
      )}

      <StH2>Reviews</StH2>
      {sitterReviewData && sitterReviewData.length !== 0 ? (
        sitterReviewData.map((review, index) => (
          <StReviewContainer key={index}>
            <Rating
              name={`rating${index}`}
              value={review.rating}
              disabled={true}
            />
            <StP>{review.review}</StP>
          </StReviewContainer>
        ))
      ) : (
        <StInfoP>
          Dit gebruiker heeft nog geen reviews ontvangen
        </StInfoP>
      )}
    </>
  ) : (
    <LoadingComponent />
  );
};

export default SitterProfile;
