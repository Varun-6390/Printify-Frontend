import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

const SmoothScroll = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      multiplier: 1,   // scrolling speed
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
    });

    // Recalculate on page resize
    setTimeout(() => {
      scroll.update();
    }, 1000);

    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div data-scroll-container ref={containerRef}>
      {children}
    </div>
  );
};

export default SmoothScroll;
