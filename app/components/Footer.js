import React from "react";

function Footer() {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#009c95",
          color: "#fff",
          padding: "6px",
          marginTop: "16px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="leftSideBar"></div>
          <div className="centerScreen">
            <p>CampusFestHub</p>
          </div>
          <div className="rightSideBar"></div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
