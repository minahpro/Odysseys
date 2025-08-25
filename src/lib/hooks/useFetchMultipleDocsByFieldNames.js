import { useState, useEffect } from "react";
import { getMultipleDocsByFieldNames, } from "@/firebase/databaseOperations";

function useFetchMultipleDocsByFieldNames(cln, userFilters, orderByData) {
  
  const [data, setData] = useState(null);
  const [didSucceed, setDidSucceed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const rs = await getMultipleDocsByFieldNames(cln, userFilters, orderByData);
      if (rs.didSucceed) {
        setData(rs.documents);
        setDidSucceed(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [cln, userFilters, orderByData]);

  return { isLoading, didSucceed, data };
}

export default useFetchMultipleDocsByFieldNames;
