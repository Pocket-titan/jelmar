import { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";

const Style = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }
`;

const SmoothScrolling = () => {
  const [enableSmoothScrolling, setEnableSmoothScrolling] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setEnableSmoothScrolling(true), 2500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return enableSmoothScrolling ? <Style /> : null;
};

export default SmoothScrolling;
