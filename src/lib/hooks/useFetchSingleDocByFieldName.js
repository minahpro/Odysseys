
import { getSingleDocByFieldName } from "@/firebase/databaseOperations";
import { useState, useEffect } from "react";


function useFetchSingleDocByFieldName(cln, userFilters) {
  const [data, setData] = useState(null);
  const [didSucceed, setDidSucceed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const rs = await getSingleDocByFieldName(cln, userFilters);
      if (rs.didSucceed) {
        setData(rs.document);
        setDidSucceed(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { isLoading, didSucceed, data };
}



export default useFetchSingleDocByFieldName;
