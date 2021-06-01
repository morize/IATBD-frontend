import useSWR from "swr";

import { getAllUsers, getAllSitterRequests } from "../../Api/AdminCalls";

const Admin = () => {
  const { data: userIndexData } = useSWR("api/user", getAllUsers, {
    revalidateOnFocus: false,
  });

  const { data: sitterRequestIndexData } = useSWR("api/sitter-requests", getAllSitterRequests, {
    revalidateOnFocus: false,
  });

  console.log(userIndexData);
  console.log(sitterRequestIndexData);
  
  return <h1>test</h1>;
};

export default Admin;
