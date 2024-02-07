import React, { useState } from "react";

const PaymentImage = ({ image }) => {
  const [showLargeImage, setShowLargeImage] = useState(false);

  const handleClick = () => {
    setShowLargeImage(true);
  };

  const handleClose = () => {
    setShowLargeImage(false);
  };
  return (
    <>
      <div style={{ cursor: "pointer" }} onClick={handleClick}>
        <img
          src={image}
          alt="Payment Detail"
          style={{
            maxHeight: "720px",
            maxWidth: "500px",
            objectFit: "contain",
            width: "100%",
          }}
        />
      </div>
      {showLargeImage && (
        <div
          style={{
            cursor: "pointer",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999999,
          }}
          className="overlay"
          onClick={handleClose}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "90%",
              maxHeight: "90%",
              overflow: "scroll",
            }}
          >
            <img
              src={image}
              alt="Payment Detail"
              style={{ maxHHeight: "100" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentImage;
