import useSWR from "swr";

import { getAllUsers } from "../../Api/AdminCalls";


const AdminUsers = () => {
  const { data: userIndexData } = useSWR("api/user", getAllUsers, {
    revalidateOnFocus: false,
  });

  console.log(userIndexData);

  return <h1>hey</h1>;
};

export default AdminUsers;
