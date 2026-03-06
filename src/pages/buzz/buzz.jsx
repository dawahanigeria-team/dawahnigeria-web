import React from "react";
import { FaLightbulb } from "react-icons/fa";
import Container from "../../components/container/Container";
import { useNavigate } from "react-router-dom";
import HeadMeta from "../../components/head-meta";
import { getBackNavigationConfig } from "../../utils/navigation";

const Buzz = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    const { to, options } = getBackNavigationConfig("/dawahcast");
    navigate(to, options);
  };

  return (
    <Container>
      <HeadMeta title={`Buzz is coming soon on Dawah Nigeria `} />
      <div className="relative w-full h-[100vw] min-[615px]:h-[70vw]">
        <div className="absolute inset-0 m-auto shadow-lg bg-backround py-6 space-y-6 flex-col text-foreground rounded-md w-[80%] min-[615px]:w-[350px] h-fit flex items-center justify-center">
          <div className="min-[615px]:text-3xl text-2xl">Coming soon</div>
          <FaLightbulb className="text-[#ddff2b] text-4xl min-[615px]:text-5xl" />

          <button
            onClick={handleBack}
            className="text-sm text-foreground transform ease hover:text-zinc-700 hover:bg-gray-200 p-2 rounded-md border border-foreground"
          >
            Go Back
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Buzz;
