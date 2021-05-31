import { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import styled from "styled-components";

import { laravelApiUrl } from "../../Api/Api";
import {
  getSpecificPet,
  getPetRequests,
  translateStatus,
} from "../../Api/PetCalls";
import { getUserDetails } from "../../Api/UserCalls";
import {
  StH2,
  StH3,
  StSection,
  LoadingComponent,
} from "../../Utils/HTMLComponents";
import BaseButton from "../../Components/Button/BaseButton";
import Modal from "../../Components/Modal/ModalComponent";
import SitterModal from "./PetProfile/SitterModal";
import SitterRequestModal from "./PetProfile/SitterRequestModal";
import { PetRequestCardItem } from "../../Components/Card/PetCard/PetCard";
import { PetInfo, SitterInfo } from "./PetProfile/PetInfo";
import dogPattern from "../../Utils/Images/dog_pattern.jpg";

const StRequestsContainer = styled.div`
  width: 100%;
  margin: 32px 0;
  padding: 40px;
  background: #dfc28b;
  border-radius: 8px;
  box-sizing: border-box;

  & h3 {
    color: #744226;
  }
`;

const StProfileParent = styled(StSection)`
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  padding: 40px;
  background: url(${dogPattern});
  border-radius: 8px;

  & button {
    margin-top: 4%;
  }

  & figure {
    position: relative;
    width: 45%;
    height: 260px;
    margin: 0;
    padding: 0;
    border-radius: 8px;

    & img {
      width: 100%;
      object-fit: cover;
      height: 78%;
      border-radius: 8px 8px 0 0;
    }

    & figcaption {
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 22%;
      background: #be8b4e;
      color: #ffff;
      font-size: 16px;
      border-radius: 0 0 8px 8px;
    }
  }
`;

const PetProfile = () => {
  const { id } = useParams();

  const userId =
    localStorage.getItem("userDetails") !== null &&
    JSON.parse(localStorage.getItem("userDetails")!)["uuid"];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [modalRequestId, setModalRequestId] = useState<number>();
  const [modalRequestStatus, setModalRequestStatus] = useState("");
  const [modalPetName, setModalPetName] = useState("");
  const [modalSitterName, setModalSitterName] = useState("");
  const [modalSitterRemarks, setModalSitterRemarks] = useState("");

  const { data: petProfileData, isValidating: isPetProfileDataLoaded } = useSWR(
    `api/pets/${id}`,
    getSpecificPet,
    { revalidateOnFocus: false }
  );

  const { data: userData, isValidating: isUserDataLoaded } = useSWR(
    `api/user/${petProfileData?.owner_id}`,
    getUserDetails,
    { revalidateOnFocus: false }
  );

  const { data: petRequestData } = useSWR(
    `api/pets/${id}/requests`,
    getPetRequests,
    { revalidateOnFocus: false }
  );

  return !isPetProfileDataLoaded && !isUserDataLoaded ? (
    <>
      <StH2>{`Huisdier profiel: ${
        petProfileData ? petProfileData.pet_name : "-"
      }`}</StH2>

      <StProfileParent>
        <figure>
          <img
            alt="Afbeelding van een huisdier"
            src={`${laravelApiUrl}/api/pets/${id}/image`}
          />
          <figcaption>
            {petProfileData ? petProfileData.pet_name : "-"}
          </figcaption>
        </figure>

        <PetInfo
          name={petProfileData ? petProfileData.pet_name : "-"}
          kind={petProfileData ? petProfileData.pet_kind : "-"}
          breed={petProfileData ? petProfileData.pet_breed : "-"}
        />
        <SitterInfo
          dstart={petProfileData ? petProfileData.sit_date_start : "-"}
          dend={petProfileData ? petProfileData.sit_date_end : "-"}
          payment={
            petProfileData
              ? `${petProfileData.sit_hourly_prize.toString()} €`
              : "-"
          }
          remarks={petProfileData ? petProfileData.sit_remarks : "-"}
        />

        {window.location.pathname.split("/")[2] === "opasser" && (
          <BaseButton
            label="Aanvraag annuleren"
            variant="secondary"
            onClick={() => setIsModalOpen(true)}
          />
        )}

        {window.location.pathname.split("/")[2] === "huisdieren" &&
          petRequestData && (
            <>
              <StRequestsContainer>
                <StH3>Oppas aanvragen</StH3>
                {petRequestData.map((request, key) => (
                  <PetRequestCardItem
                    pet_name={request.pet_name}
                    status={translateStatus(request.request_status)}
                    sitter_name={request.sitter_name}
                    key={key}
                    onClick={() => {
                      setModalRequestId(request.id);
                      setModalPetName(request.pet_name);
                      setModalRequestStatus(request.request_status);
                      setModalSitterName(request.sitter_name);
                      setModalSitterRemarks(request.sitter_remarks);
                      setIsRequestModalOpen(true);
                    }}
                  />
                ))}
              </StRequestsContainer>
              <Modal
                open={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
              >
                <SitterRequestModal
                  reviewer_id={userId}
                  sitter_request_id={modalRequestId}
                  sitter_remarks={modalSitterRemarks}
                  pet_name={modalPetName}
                  sitter_name={modalSitterName}
                  request_status={modalRequestStatus}
                />
              </Modal>
            </>
          )}

        {window.location.pathname.split("/")[2] === "profiel" &&
          petProfileData?.owner_id !== userId && (
            <BaseButton
              label="Reageeren voor oppas"
              onClick={() => setIsModalOpen(true)}
            />
          )}

        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <SitterModal
            pet_name={petProfileData?.pet_name}
            sitter_name={
              JSON.parse(localStorage.getItem("userDetails")!).username
            }
            sit_date_start={petProfileData?.sit_date_start}
            sit_date_end={petProfileData?.sit_date_end}
            sit_hourly_prize={petProfileData?.sit_hourly_prize}
            pet_owner={userData?.name}
            pet_id={id}
            user_id={userId}
          />
        </Modal>
      </StProfileParent>
    </>
  ) : (
    <LoadingComponent />
  );
};

export default PetProfile;
