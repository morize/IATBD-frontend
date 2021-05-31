import { forwardRef, useState } from "react";
import styled from "styled-components";
import Rating from "@material-ui/lab/Rating";

import { createSitterReview } from "../../../Api/SitterCalls";
import { updateSitterRequest } from "../../../Api/SitterRequestCalls";
import { StH3, StLabel, StP, StForm } from "../../../Utils/HTMLComponents";
import { StProfileDetailsSitter } from "./PetInfo";
import BaseButton from "../../../Components/Button/BaseButton";
import TextArea from "../../../Components/Input/TextArea";

const StTextArea = styled(TextArea)`
  margin-top: 8px;
`;

const StWhiteLabel = styled(StLabel)`
  margin-bottom: 12px;
  color: #ffff;
`;

const StUserRedirect = styled(StWhiteLabel)`
  display: block;
  margin: 8px 0 24px 0;
  font-size: 1rem;
  text-decoration: underline;
  cursor: pointer;
`;

const StModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: translate(-50%, -50%);
  max-height: 800px;
  width: 600px;
  padding: 40px 60px;
  background: #be8b4e;
  border-radius: 8px;
  box-sizing: border-box;

  & h3 {
    color: #ffff;
  }

  & button {
    margin-bottom: 24px;
  }
`;

const SitterModalInfo = styled(StProfileDetailsSitter)`
  display: flex;
  min-height: 200px;
  height: auto;
  max-height: 300px;
  margin-bottom: 24px;
  border-radius: 8px;
  overflow: auto;
`;

interface IPetProfileModal {
  reviewer_id?: number;
  sitter_request_id?: number;
  sitter_remarks?: string;
  sitter_name?: string;
  pet_name?: string;
  request_status?: string;
}

const SitterRequestModal = forwardRef(
  (
    {
      reviewer_id,
      sitter_request_id,
      sitter_name,
      sitter_remarks,
      pet_name,
      request_status,
    }: IPetProfileModal,
    ref
  ) => {
    const [ratingValue, setRatingValue] = useState<number>(3);
    const [reviewInputValue, setReviewInputValue] = useState("");

    const submitRating = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (ratingValue && reviewInputValue && sitter_request_id && reviewer_id) {
        let fData = new FormData();
        fData.append("sitter_request_id", sitter_request_id.toString());
        fData.append("reviewer_id", reviewer_id?.toString());
        fData.append("sitter_rating", ratingValue.toString());
        fData.append("sitter_review", reviewInputValue);

        createSitterReview(fData);
      }
    };

    return (
      <StModal>
        <StH3>Voor huisdier: {pet_name}</StH3>
        <StUserRedirect>Profiel bekijken van {sitter_name}</StUserRedirect>
        <StWhiteLabel>Aanvraag verzoek:</StWhiteLabel>

        <SitterModalInfo>
          {sitter_name && (
            <div>
              <StLabel>Van opasser:</StLabel>
              <StP>{sitter_name}</StP>
            </div>
          )}

          {sitter_remarks && (
            <div>
              <StLabel>Oppas opmerkingen:</StLabel>
              <StP>{sitter_remarks}</StP>
            </div>
          )}
        </SitterModalInfo>

        {request_status === "accepted" && (
          <StForm onSubmit={submitRating}>
            <StWhiteLabel>Laat een review voor de opasser</StWhiteLabel>
            <Rating
              name="yes"
              value={ratingValue}
              onChange={(e, newValue) => newValue && setRatingValue(newValue)}
            />
            <StTextArea
              value={reviewInputValue}
              onChange={(e) => setReviewInputValue(e.target.value)}
            />
            <BaseButton label="Rate" type="submit" />
          </StForm>
        )}

        {request_status === "pending" && (
          <>
            <BaseButton
              label="Accepteren"
              variant="success"
              onClick={() =>
                sitter_request_id &&
                updateSitterRequest(
                  { requestStatus: "accepted" },
                  sitter_request_id
                )
              }
            />
            <BaseButton
              label="Weigeren"
              variant="secondary"
              onClick={() =>
                sitter_request_id &&
                updateSitterRequest(
                  { requestStatus: "rejected" },
                  sitter_request_id
                )
              }
            />
          </>
        )}
      </StModal>
    );
  }
);

export default SitterRequestModal;
