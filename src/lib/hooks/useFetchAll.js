import { fetchDocuments } from '@/firebase/databaseOperations';
import { useState, useEffect } from 'react';

function useFetchAll(cln) {
  const [data, setData] = useState([]);
  const [didSucceed, setDidSucceed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { didSucceed, items } = await fetchDocuments(cln);
     
      if (didSucceed) {
          setData(items);
          setDidSucceed(true);
        }

        setIsLoading(false);
    };
    fetchData();
    return () => {
      const controller = new AbortController();
      controller.abort();
    };
  }, [cln]);

  return { isLoading, didSucceed, data };
}

export default useFetchAll;
