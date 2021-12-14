import { MutableRefObject, useEffect, useState } from "react";

export const useElementDimensions = (
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  const getDimensions = () => ({
    width: ref.current?.offsetWidth ?? 0,
    height: ref.current?.offsetHeight ?? 0,
  });

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (ref?.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return dimensions;
};
