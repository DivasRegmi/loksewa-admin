import React from "react";
import DisplayPayment from "./DisplayPayment";
import useAdminRestriction from "../../hooks/useAdminRestriction";
import Loading from "../../components/Loading";

const PaymentScreen = () => {
  const isAdmin = useAdminRestriction();

  if (isAdmin === null) {
    return <Loading />;
  }

  return (
    <>
      <DisplayPayment />
    </>
  );
};

export default PaymentScreen;
