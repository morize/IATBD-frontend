import { useParams } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";

import { getSitter } from "../../Api/SitterCalls";
import {
  getUserDetails,
  getUserMedia,
  formatUserMedia,
} from "../../Api/UserCalls";
import {
  StH1,
  StH2,
  StP,
  StLabel,
  LoadingComponent,
} from "../../Utils/HTMLComponents";
import Showcase from "../../Components/Showcase/Showcase";

const StAccountDetails = styled.section`
  display: flex;
  flex-direction: column;
  margin: 24px 0;

  & p {
    margin-top: -22px;
    margin-left: auto;
  }
`;

const AccountProfile = () => {
  const { id } = useParams();

  const { data: accountData, isValidating: isAccountDataLoaded } = useSWR(
    `api/user/${id}`,
    getUserDetails,
    { revalidateOnFocus: false }
  );

  const { data: sitterData, isValidating: isSitterDataLoaded } = useSWR(
    `api/sitters/${id}`,
    getSitter,
    {
      revalidateOnFocus: false,
    }
  );

  const { data: mediaData, isValidating: isMediaDataLoaded } = useSWR(
    `api/users-media/${id}`,
    getUserMedia,
    { revalidateOnFocus: false }
  );
  const userMediaValues = formatUserMedia(
    mediaData?.image_1,
    mediaData?.image_2,
    mediaData?.video_link
  );

  return !isAccountDataLoaded && !isSitterDataLoaded && !isMediaDataLoaded ? (
    <>
      <StH1>{`Profiel van ${accountData?.name}`}</StH1>

      <StH2>Huisfoto's en video</StH2>
      {mediaData && (
        <Showcase
          image1={userMediaValues.image1}
          image2={userMediaValues.image2}
          video={userMediaValues.youtube}
        />
      )}

      <StAccountDetails>
        <StH2>Over de opasser</StH2>
        <StLabel>Naam opasser:</StLabel>
        <StP>{accountData?.name ? accountData.name : "-"}</StP>

        <StLabel>Contact Email:</StLabel>
        <StP>{accountData?.email ? accountData.email : "-"}</StP>

        <StLabel>Account Soort:</StLabel>
        <StP>{sitterData?.sit_status ? "Opasser" : "-"}</StP>
      </StAccountDetails>
    </>
  ) : (
    <LoadingComponent />
  );
};

export default AccountProfile;
