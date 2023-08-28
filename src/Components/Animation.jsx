import Lottie from "lottie-react";
import animationData from "../Animation/animation_llv7ymgd.json";

function LottieAnimation() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "45vh",
      }}
    >
      <Lottie animationData={animationData} />
    </div>
  );
}

export default LottieAnimation;
