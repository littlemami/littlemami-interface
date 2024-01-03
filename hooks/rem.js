import { useEffect, useState } from "react";

const useRem = () => {
  const [size, setSize] = useState();
  const setRem = () => {
    const winWid =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const htmlEl = document.documentElement;
    console.log("1asf", winWid);
    if (winWid > 1920) {
      htmlEl.style.fontSize = "16px";
    } else if (winWid < 1200) {
      htmlEl.style.fontSize = "12px";
    } else {
      htmlEl.style.fontSize = `${(winWid / 1200) * 12}px`;
    }
  };
  useEffect(() => {
    setRem();
    window.addEventListener("reset", setRem);
    return () => window.removeEventListener("reset", setRem);
  }, []);

  return [size];
};
export default useRem;
