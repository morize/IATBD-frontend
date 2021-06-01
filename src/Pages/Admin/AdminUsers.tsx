import useSWR, { trigger } from "swr";
import styled from "styled-components";
import BlockIcon from "@material-ui/icons/Block";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import { getAllUsers, updateUserStatus } from "../../Api/AdminCalls";
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

const StBlockIcon = styled(BlockIcon)`
  background: #cc3d3d;
  color: white;
`;

const AdminUsers = () => {
  const { data: userIndexData, isValidating: isUserIndexDataLoaded } = useSWR(
    "api/user",
    getAllUsers,
    {
      revalidateOnFocus: false,
    }
  );

  const onStatusClicked = (userId: number, userName: string, status: string) =>
    window.confirm(
      `Gebruiker ${userName} ${
        status === "blocked" ? "blokkeren" : "deblokkeren"
      }?`
    ) && updateUserStatus(userId, status).then(() => trigger(`api/user`));

  return !isUserIndexDataLoaded ? (
    <StAdminTable>
      <tbody>
        <StAdminTableRow>
          <th>ID</th>
          <th>Naam</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Acties</th>
        </StAdminTableRow>

        {userIndexData?.map((user, key) => (
          <StAdminTableRow key={key}>
            <td>{user.uuid}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role === "admin" ? "Admin" : "User"}</td>
            <td>{user.status === "blocked" ? "Geblokkeerd" : "Standaard"}</td>
            <StIconCell>
              {user.status === "blocked" ? (
                <LockOpenIcon
                  onClick={() =>
                    onStatusClicked(user.uuid, user.name, "active")
                  }
                />
              ) : (
                <StBlockIcon
                  onClick={() =>
                    onStatusClicked(user.uuid, user.name, "blocked")
                  }
                />
              )}
            </StIconCell>
          </StAdminTableRow>
        ))}
      </tbody>
    </StAdminTable>
  ) : (
    <LoadingComponent />
  );
};

export default AdminUsers;
