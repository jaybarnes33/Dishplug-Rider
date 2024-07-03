import React, { useEffect, useState } from "react";
import { RiderDetails } from "../context/auth/AuthContext";
import { makeSecuredRequest } from "../utils/makeSecuredRequest";

const useUser = () => {
  const [user, setUser] = useState<RiderDetails | null>(null);

  useEffect(() => {
    (async () => {
      const data = await makeSecuredRequest("/api/auth/");
      setUser(data);
    })();
  }, []);
  return {
    user,
  };
};

export default useUser;
