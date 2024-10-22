import React from "react";
import Lottie from "react-lottie";

const Animation = ({ bg }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: bg,
    renderer: "svg",
  };
  return <Lottie options={defaultOptions} height={"100%"} width={"100%"} />;
};

export default Animation;
