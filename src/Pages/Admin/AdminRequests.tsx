import styled from "styled-components";
import useSWR, { trigger } from "swr";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  getAllSitterRequests,
  deleteSitterRequest,
} from "../../Api/AdminCalls";
import { LoadingComponent } from "../../Utils/HTMLComponents";

const StAdminTable = styled.table`
  width: 100%;
  border-spacing: 0;
`;

const StAdminTableRow = styled.tr`
  display: flex;
  justify-content: space-around;
  padding: 0 6%;
  height: 80px;
  align-items: center;

  &:first-child {
    position: sticky;
    top: 0;
    background: #ad7145;
  }

  & th,
  td {
    width: 200px;
    text-align: left;
    font-weight: 500;

    &:first-child {
      width: 100px;
    }
  }

  & th {
    color: #fff;
  }

  & td {
    font-size: 0.9rem;
  }
`;

const StIconCell = styled.td`
  & svg {
    padding: 10px;
    cursor: pointer;
    border-radius: 50%;
  }
`;

const StDeleteIcon = styled(DeleteIcon)`
  background: #cc3d3d;
  color: white;
`;

const AdminRequests = () => {
  const {
    data: sitterRequestIndexData,
    isValidating: isSitterRequestIndexDataLoaded,
  } = useSWR("api/sitter-requests", getAllSitterRequests, {
    revalidateOnFocus: false,
  });

  const onDeleteClicked = (requestId: number) =>
    window.confirm(`Aanvraag met id:${requestId} verwijderen?`) &&
    deleteSitterRequest(requestId).then(() => trigger("api/sitter-requests"));

  const formatStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "In afwachting";
      case "accepted":
        return "Geaccepteerd";
      case "rejected":
        return "Afgewezen";
      default:
        return "Default";
    }
  };

  return !isSitterRequestIndexDataLoaded ? (
    <StAdminTable>
      <tbody>
        <StAdminTableRow>
          <th>ID</th>
          <th>Opasser</th>
          <th>Eigenaar</th>
          <th>Huisdier</th>
          <th>Status</th>
          <th>Acties</th>
        </StAdminTableRow>

        {sitterRequestIndexData?.map((request, key) => (
          <StAdminTableRow key={key}>
            <td>{request.id}</td>
            <td>{request.sitter_name}</td>
            <td>{request.owner_name}</td>
            <td>{request.pet_name}</td>
            <td>{formatStatus(request.request_status)}</td>
            <StIconCell>
              <StDeleteIcon onClick={() => onDeleteClicked(request.id)} />
            </StIconCell>
          </StAdminTableRow>
        ))}
      </tbody>
    </StAdminTable>
  ) : (
    <LoadingComponent />
  );
};

export default AdminRequests;
