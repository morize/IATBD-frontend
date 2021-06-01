import useSWR from "swr";

import { getAllSitterRequests } from "../../Api/AdminCalls";

const AdminRequests = () => {
  const { data: sitterRequestIndexData } = useSWR(
    "api/sitter-requests",
    getAllSitterRequests,
    {
      revalidateOnFocus: false,
    }
  );

  console.log(sitterRequestIndexData);

  return <h1>wat</h1>;
};

export default AdminRequests;
