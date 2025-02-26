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
          src="https://res.cloudinary.com/dgctadcb2/image/upload/f_auto,q_auto/evdzsw3fit6rilixnbvd"
          alt=""
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://res.cloudinary.com/dgctadcb2/image/upload/f_auto,q_auto/pfdjfivc1cimb6jtur0p"
          alt=""
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://res.cloudinary.com/dgctadcb2/image/upload/f_auto,q_auto/vpwpb7yhttyttn6hpwjx"
          alt=""
        />
      </div>
      <div>
        <img
          style={contentStyle}
          src="https://res.cloudinary.com/dgctadcb2/image/upload/f_auto,q_auto/l8pzfzugicu5lsohjaie"
          alt=""
        />
      </div>
    </Carousel>
  );
};

export default Carousol;
