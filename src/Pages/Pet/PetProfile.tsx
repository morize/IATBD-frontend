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
  const { id: petId } = useParams();

  const userDetails =
    localStorage.getItem("userDetails") !== null &&
    JSON.parse(localStorage.getItem("userDetails")!);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSitterId, setModalSitterId] = useState<number>();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [modalRequestId, setModalRequestId] = useState<number>();
  const [modalRequestStatus, setModalRequestStatus] = useState("");
  const [modalPetName, setModalPetName] = useState("");
  const [modalSitterName, setModalSitterName] = useState("");
  const [modalSitterRemarks, setModalSitterRemarks] = useState("");

  const { data: petProfileData, isValidating: isPetProfileDataValidating } =
    useSWR(`api/pets/${petId}`, getSpecificPet, { revalidateOnFocus: false });

  const { data: petRequestData, isValidating: isPetRequestDataValidating } =
    useSWR(`api/pets/${petId}/requests`, getPetRequests, {
      revalidateOnFocus: false,
    });

  return !isPetProfileDataValidating && !isPetRequestDataValidating ? (
    <>
      <StH2>{`Huisdier profiel: ${petProfileData?.pet_name}`}</StH2>

      <StProfileParent>
        <figure>
          <img
            alt="Afbeelding van een huisdier"
            src={`${laravelApiUrl}/api/pets/${petId}/image`}
          />
          <figcaption>{petProfileData?.pet_name}</figcaption>
        </figure>

        <PetInfo
          name={petProfileData?.pet_name}
          kind={petProfileData?.pet_kind}
          breed={petProfileData?.pet_breed}
        />
        <SitterInfo
          dstart={petProfileData?.sit_date_start}
          dend={petProfileData?.sit_date_end}
          payment={`${petProfileData?.sit_hourly_prize.toString()} €`}
          remarks={petProfileData?.sit_remarks}
        />

        {window.location.pathname.split("/")[2] === "opasser" && (
          <BaseButton
            label="Aanvraag annuleren"
            variant="secondary"
            //onClick={() => delete request from database}
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
                      setModalSitterId(request.sitter_id);
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
                  reviewer_id={userDetails["uuid"]}
                  sitter_id={modalSitterId}
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
          petProfileData?.owner_id !== userDetails["uuid"] && (
            <BaseButton
              label="Reageeren voor oppas"
              onClick={() => setIsModalOpen(true)}
            />
          )}
          
        {petProfileData && (
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <SitterModal
              pet_name={petProfileData.pet_name}
              sitter_name={userDetails["name"]}
              sit_date_start={petProfileData.sit_date_start}
              sit_date_end={petProfileData.sit_date_end}
              sit_hourly_prize={petProfileData.sit_hourly_prize}
              pet_owner={userDetails["name"]}
              pet_id={petId}
              user_id={userDetails["uuid"]}
            />
          </Modal>
        )}
      </StProfileParent>
    </>
  ) : (
    <LoadingComponent />
  );
};

export default PetProfile;
