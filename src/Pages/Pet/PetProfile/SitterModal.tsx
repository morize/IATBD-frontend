import { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import styled from "styled-components";

import { createSitterRequest } from "../../../Api/SitterRequestCalls";
import { getSitter } from "../../../Api/SitterCalls";
import {
  LoadingComponent,
  StH3,
  StLabel,
  StForm,
} from "../../../Utils/HTMLComponents";
import TextArea from "../../../Components/Input/TextArea";
import BaseButton from "../../../Components/Button/BaseButton";

const StModalLabel = styled(StLabel)`
  margin-bottom: 12px;
  color: #ffff;
`;
const StModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: translate(-50%, -50%);
  height: clamp(200px, 50vh, 600px);
  width: clamp(240px, 80vw, 600px);
  padding: 2% 4%;
  background: #be8b4e;
  border-radius: 8px;
  box-sizing: border-box;

  & h3 {
    color: #ffff;
  }

  @media (max-width: 600px) {
    padding: 6% 8%;
  }
`;

interface IPetProfileModal {
  pet_id: string;
  pet_name?: string;
  user_id?: number;
  pet_owner?: string;
  sitter_name?: string;
}

const SitterModal = forwardRef(
  (
    {
      pet_name,
      pet_owner,
      pet_id,
      user_id,
      sitter_name,
    }: IPetProfileModal,
    ref
  ) => {
    const [sitterRemarks, setSitterRemarks] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { data: sitterData } = useSWR(`api/sitters/${user_id}`, getSitter, {
      revalidateOnFocus: false,
    });

    const submitFormData = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (sitterData && pet_owner && pet_name && sitter_name) {
        setIsLoading(true);
        let fData = new FormData();
        fData.append("sitter_id", sitterData.id);
        fData.append("pet_id", pet_id);
        fData.append("owner_name", pet_owner);
        fData.append("pet_name", pet_name);
        fData.append("sitter_name", sitter_name);
        sitterRemarks && fData.append("sitter_remarks", sitterRemarks);

        createSitterRequest(fData)
          .then(() => navigate("../../../account/opasser"))
          .catch(() => setIsLoading(false));
      }
    };

    return (
      <StModal>
        {!isLoading ? (
          <>
            <StH3>Reageer voor oppas</StH3>

            <StForm onSubmit={submitFormData}>
              <StModalLabel>Uw opmerkingen:</StModalLabel>
              <TextArea
                value={sitterRemarks}
                onChange={(e) => setSitterRemarks(e.target.value)}
              />

              <BaseButton label="Stuur verzoek" type="submit" />
            </StForm>
          </>
        ) : (
          <LoadingComponent />
        )}
      </StModal>
    );
  }
);

export default SitterModal;
