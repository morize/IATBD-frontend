import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSWR from "swr";
import styled from "styled-components";

import { laravelApiUrl } from "../../Api/Api";
import {
  getSpecificPet,
  getPetRequests,
  translateStatus,
} from "../../Api/PetCalls";
import { deleteSitterRequest } from "../../Api/AdminCalls";
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
  padding: 8%;
  background: #dfc28b;
  border-radius: 8px;
  box-sizing: border-box;
  
  & h3 {
    margin-bottom: 6%;
    color: #744226;

    @media (max-width: 600px) {
      text-align: center;
     
    }
  }
`;

const StProfileParent = styled(StSection)`
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  padding: 8%;
  background: url(${dogPattern});
  border-radius: 8px;

  @media (max-width: 600px) {
    flex-direction: column;
  }

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
      border-radius: 0 0 8px 8px;
    }

    @media (max-width: 600px) {
      width: 100%;
      height: clamp(200px, 20vh, 220px);
    }
  }
`;

const PetProfile = () => {
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

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: petProfileData, isValidating: isPetProfileDataValidating } =
    useSWR(`api/pets/${id}`, getSpecificPet, { revalidateOnFocus: false });

  const { data: petRequestData, isValidating: isPetRequestDataValidating } =
    useSWR(`api/pets/${id}/requests`, getPetRequests, {
      revalidateOnFocus: false,
    });

  return !isPetProfileDataValidating && !isPetRequestDataValidating ? (
    <>
      <StH2>{`Huisdier profiel: ${petProfileData?.pet_name}`}</StH2>

      <StProfileParent>
        <figure>
          <img
            alt="Afbeelding van een huisdier"
            src={`${laravelApiUrl}/api/pets/${id}/image`}
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
            onClick={() =>
              deleteSitterRequest(parseInt(id)).then(() => navigate("../.."))
            }
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
                  reviewer_id={userDetails.uuid}
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
          petProfileData?.owner_id !== userDetails.uuid && (
            <BaseButton
              label="Reageeren voor oppas"
              onClick={() => setIsModalOpen(true)}
            />
          )}

        {petProfileData && (
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <SitterModal
              pet_name={petProfileData.pet_name}
              sitter_name={userDetails.username}
              sit_date_start={petProfileData.sit_date_start}
              sit_date_end={petProfileData.sit_date_end}
              sit_hourly_prize={petProfileData.sit_hourly_prize}
              pet_owner={petProfileData.owner_name}
              pet_id={id}
              user_id={userDetails.uuid}
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
