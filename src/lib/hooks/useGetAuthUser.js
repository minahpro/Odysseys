
import { useAppContext } from "@/context/AppContext";
import { useState, useEffect } from "react";

function useGetAuthUser() {
  const { authUser } = useAppContext();
  const [data, setData] = useState(null);
  const [didSucceed, setDidSucceed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthUser = () => {
      if (authUser) {
        setData(authUser);
        setDidSucceed(true);
      } else {
        setData(null);
        setDidSucceed(false);
      }
      setIsLoading(false);
    };

    fetchAuthUser();
  }, [authUser]);

  return { isLoading, didSucceed, data };
}

export default useGetAuthUser;
