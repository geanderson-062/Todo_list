import Lottie from "lottie-react";
import animationData from "../../../Animation/animation_llv7ymgd.json";

import { useEffect } from "react";
import ScrollReveal from "scrollreveal";

function LottieAnimation() {
  useEffect(() => {
    ScrollReveal().reveal(".scroll-reveal", {
      duration: 1000, // duração da animação em milissegundos
      distance: "20px", // distância de deslocamento do elemento
      easing: "ease-in-out", // função de easing da animação
      origin: "bottom", // ponto de origem da animação
      delay: 100, // atraso da animação em milissegundos
    });
  }, []);

  return (
    <div
      className="scroll-reveal"
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
