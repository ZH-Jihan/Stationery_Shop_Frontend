import { Carousel } from "antd";
import React from "react";

const Carousol = () => {
  const contentStyle: React.CSSProperties = {
    height: "500px",
    color: "#fff",
    width: "100%",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <Carousel autoplay={true} autoplaySpeed={2000}>
      <div>
        <img
          style={contentStyle}
          src={"../../../public/carusol-1.jpg"}
          alt=""
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src={"../../../public/carusol-2.jpg"}
          alt=""
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src={"../../../public/carusol-3.jpg"}
          alt=""
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src={"../../../public/carusol-4.jpg"}
          alt=""
        />
      </div>
    </Carousel>
  );
};

export default Carousol;
