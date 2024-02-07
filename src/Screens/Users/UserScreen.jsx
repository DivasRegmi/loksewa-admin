import React from "react";
import FindUserScreen from "./FindUserScreen";
import useAdminRestriction from "../../hooks/useAdminRestriction";
import Loading from "../../components/Loading";

const UserScreen = () => {
  const isAdmin = useAdminRestriction();

  if (isAdmin === null) {
    return <Loading />;
  }

  return (
    <>
      <FindUserScreen />
    </>
  );
};

export default UserScreen;
